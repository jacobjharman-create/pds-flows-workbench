#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function argValues(name) {
  const prefix = `${name}=`;
  return process.argv
    .slice(2)
    .filter((arg) => arg.startsWith(prefix))
    .map((arg) => arg.slice(prefix.length));
}

function argValue(name, fallback = undefined) {
  const prefix = `${name}=`;
  const hit = process.argv.slice(2).find((arg) => arg === name || arg.startsWith(prefix));
  if (!hit) return fallback;
  if (hit === name) return true;
  return hit.slice(prefix.length);
}

function getKeyFromKeychain() {
  try {
    return execFileSync('security', ['find-generic-password', '-a', process.env.USER || '', '-s', 'openai_api_key', '-w'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

async function getPrompt() {
  const promptFile = argValue('--prompt-file');
  const prompt = argValue('--prompt');
  if (promptFile) return readFile(promptFile, 'utf8');
  if (prompt) return prompt;
  const stdin = await new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => resolve(data));
  });
  return String(stdin).trim();
}

const apiKey = process.env.OPENAI_API_KEY || getKeyFromKeychain();
if (!apiKey) {
  console.error('Missing OpenAI API key. Expected OPENAI_API_KEY or Keychain service openai_api_key.');
  process.exit(1);
}

const imagePaths = argValues('--image');
if (!imagePaths.length) {
  console.error('Missing source images. Use one or more --image=path/to/input.png values.');
  process.exit(1);
}

const prompt = (await getPrompt()).trim();
if (!prompt) {
  console.error('Missing prompt. Use --prompt="...", --prompt-file=path, or pipe text via stdin.');
  process.exit(1);
}

const out = argValue('--out', 'output/gpt-image-2/edit.png');
const size = argValue('--size', '1024x1536');
const quality = argValue('--quality', 'high');
const outputFormat = argValue('--format', 'png');
const model = argValue('--model', 'gpt-image-2');

const form = new FormData();
form.append('model', model);
form.append('prompt', prompt);
form.append('size', size);
form.append('quality', quality);
form.append('output_format', outputFormat);

for (const imagePath of imagePaths) {
  form.append('image[]', new Blob([await readFile(imagePath)], { type: 'image/png' }), path.basename(imagePath));
}

const response = await fetch('https://api.openai.com/v1/images/edits', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
  body: form,
});

const json = await response.json().catch(() => ({}));
if (!response.ok) {
  console.error(JSON.stringify(json, null, 2));
  process.exit(1);
}

const image = json?.data?.[0];
let bytes;
if (image?.b64_json) {
  bytes = Buffer.from(image.b64_json, 'base64');
} else if (image?.url) {
  const imageResponse = await fetch(image.url);
  if (!imageResponse.ok) {
    console.error(`Image URL fetch failed: ${imageResponse.status} ${imageResponse.statusText}`);
    process.exit(1);
  }
  bytes = Buffer.from(await imageResponse.arrayBuffer());
} else {
  console.error(`No image payload found: ${JSON.stringify(json, null, 2)}`);
  process.exit(1);
}

const outPath = path.resolve(out);
await mkdir(path.dirname(outPath), { recursive: true });
await writeFile(outPath, bytes);
console.log(outPath);

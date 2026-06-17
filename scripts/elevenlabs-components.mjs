#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const manifestPath = path.join(root, "component-build-manifest.json");
const outDir = path.join(root, "generated", "audio");
const apiBase = process.env.ELEVENLABS_API_BASE || "https://api.elevenlabs.io";

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const manifest = fs.existsSync(manifestPath) ? readJson(manifestPath) : null;

const stamp = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    "-",
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join("");
};

const usage = () => {
  console.log(`PDS Flows ElevenLabs component runner

Usage:
  node scripts/elevenlabs-components.mjs status
  node scripts/elevenlabs-components.mjs voices [filter]
  node scripts/elevenlabs-components.mjs tts [--only S1,S2]
  node scripts/elevenlabs-components.mjs music [--count 3]
  node scripts/elevenlabs-components.mjs cli-help

Required for API actions:
  ELEVENLABS_API_KEY must be set in the shell or process environment.

Notes:
  The official ElevenLabs CLI is used for Agents as Code.
  This script uses the ElevenLabs API for TTS, music candidates, and voice discovery.
`);
};

const requireManifest = () => {
  if (!manifest) {
    throw new Error(`Missing ${manifestPath}`);
  }
  return manifest;
};

const requireApiKey = () => {
  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    throw new Error("ELEVENLABS_API_KEY is not set. Do not store it in this repo; export it for this shell or use Keychain-backed shell setup.");
  }
  return key;
};

const apiFetch = async (urlPath, options = {}) => {
  const key = requireApiKey();
  const res = await fetch(`${apiBase}${urlPath}`, {
    ...options,
    headers: {
      "xi-api-key": key,
      ...(options.body ? { "content-type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${options.method || "GET"} ${urlPath} failed: ${res.status} ${res.statusText}${text ? `\n${text}` : ""}`);
  }
  return res;
};

const writeBinary = async (file, res) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(file, buffer);
  return buffer.length;
};

const runCli = (args) => {
  const result = spawnSync("npx", ["-y", "@elevenlabs/cli", ...args], {
    cwd: root,
    encoding: "utf8",
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
  return result.status ?? 1;
};

const getVoices = async () => {
  const res = await apiFetch("/v1/voices");
  const body = await res.json();
  return body.voices || [];
};

const normalize = (value) => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const resolveVoiceId = async (character, voicesCache) => {
  if (character.voice?.voiceId) return character.voice.voiceId;
  const label = character.voice?.label || "";
  const firstName = label.split("-")[0]?.trim();
  const wanted = normalize(firstName || label);
  const voices = voicesCache ?? (await getVoices());
  const match = voices.find((voice) => normalize(voice.name) === wanted)
    || voices.find((voice) => normalize(voice.name).includes(wanted));
  if (!match) {
    throw new Error(`No voiceId set for ${character.id}, and no matching ElevenLabs voice was found for "${label}". Run "node scripts/elevenlabs-components.mjs voices ${firstName || ""}" and add the voiceId to component-build-manifest.json.`);
  }
  return match.voice_id;
};

const command = process.argv[2] || "help";
const args = process.argv.slice(3);

try {
  if (command === "help" || command === "--help" || command === "-h") {
    usage();
  } else if (command === "cli-help") {
    process.exitCode = runCli(["--help"]);
  } else if (command === "status") {
    const cli = spawnSync("npx", ["-y", "@elevenlabs/cli", "--help"], { cwd: root, encoding: "utf8" });
    const cliOk = cli.status === 0;
    console.log(`ElevenLabs CLI reachable: ${cliOk ? "yes" : "no"}`);
    if (cliOk) {
      const firstLine = cli.stdout.split("\n").find(Boolean);
      console.log(firstLine);
    }
    console.log(`ELEVENLABS_API_KEY present: ${process.env.ELEVENLABS_API_KEY ? "yes" : "no"}`);
    console.log(`Manifest present: ${manifest ? "yes" : "no"}`);
    if (manifest) {
      console.log(`Client: ${manifest.client}`);
      console.log(`TTS lines: ${manifest.tts?.lines?.length || 0}`);
      console.log(`Selected music: ${manifest.music?.selectedBed?.title || "none"}`);
    }
  } else if (command === "voices") {
    const filter = normalize(args.join(" "));
    const voices = await getVoices();
    const rows = voices
      .filter((voice) => !filter || normalize(voice.name).includes(filter))
      .map((voice) => ({
        name: voice.name,
        voice_id: voice.voice_id,
        category: voice.category || "",
      }));
    console.table(rows);
  } else if (command === "tts") {
    const data = requireManifest();
    const onlyArg = args.find((arg) => arg.startsWith("--only=")) || "";
    const only = onlyArg ? new Set(onlyArg.replace("--only=", "").split(",").map((item) => item.trim().toUpperCase())) : null;
    const voices = await getVoices();
    const characters = new Map(data.characters.map((character) => [character.id, character]));
    const runStamp = stamp();
    const outputs = [];
    for (const line of data.tts.lines) {
      if (only && !only.has(String(line.scene).toUpperCase())) continue;
      const character = characters.get(line.characterId);
      if (!character) throw new Error(`Unknown characterId for ${line.scene}: ${line.characterId}`);
      const voiceId = await resolveVoiceId(character, voices);
      const output = path.join(outDir, `${line.slug}-${runStamp}.mp3`);
      const res = await apiFetch(`/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=${encodeURIComponent(data.tts.outputFormat || "mp3_44100_128")}`, {
        method: "POST",
        body: JSON.stringify({
          text: line.text,
          model_id: data.tts.modelId || "eleven_v3",
          voice_settings: data.tts.voiceSettings || undefined,
        }),
      });
      const bytes = await writeBinary(output, res);
      outputs.push({
        scene: line.scene,
        characterId: line.characterId,
        voiceLabel: character.voice?.label,
        voiceId,
        text: line.text,
        file: path.relative(root, output),
        bytes,
      });
      console.log(`Wrote ${path.relative(root, output)} (${bytes} bytes)`);
    }
    const runFile = path.join(outDir, `elevenlabs-tts-run-${runStamp}.json`);
    fs.writeFileSync(runFile, JSON.stringify({ createdAt: new Date().toISOString(), outputs }, null, 2));
    console.log(`Wrote ${path.relative(root, runFile)}`);
  } else if (command === "music") {
    const data = requireManifest();
    const countArg = args.find((arg) => arg.startsWith("--count="));
    const count = Number(countArg?.replace("--count=", "") || data.music?.generationDefaults?.count || 3);
    const durationSeconds = Number(data.music?.generationDefaults?.durationSeconds || 28);
    const runStamp = stamp();
    const outputs = [];
    for (let index = 0; index < count; index += 1) {
      const prompt = `${data.music.promptAnchor} Candidate ${index + 1}: make it distinct while staying premium, conversational-ad friendly, and clean under dialogue.`;
      const output = path.join(outDir, `music-candidate-api-${index + 1}-${runStamp}.mp3`);
      const res = await apiFetch(data.music?.generationDefaults?.endpoint || "/v1/music", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          music_length_ms: durationSeconds * 1000,
          duration_seconds: durationSeconds,
          make_instrumental: data.music?.generationDefaults?.instrumental !== false,
        }),
      });
      const bytes = await writeBinary(output, res);
      outputs.push({ index: index + 1, prompt, file: path.relative(root, output), bytes });
      console.log(`Wrote ${path.relative(root, output)} (${bytes} bytes)`);
    }
    const runFile = path.join(outDir, `elevenlabs-music-run-${runStamp}.json`);
    fs.writeFileSync(runFile, JSON.stringify({ createdAt: new Date().toISOString(), outputs }, null, 2));
    console.log(`Wrote ${path.relative(root, runFile)}`);
  } else {
    usage();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}

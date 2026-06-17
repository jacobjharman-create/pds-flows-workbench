#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifest = JSON.parse(fs.readFileSync(path.join(root, "component-build-manifest.json"), "utf8"));
const plan = JSON.parse(fs.readFileSync(path.join(root, "video-render-plan-20260616-224431.json"), "utf8"));
const locks = JSON.parse(fs.readFileSync(path.join(root, "production-locks.json"), "utf8"));
const outDir = path.join(root, "generated", "flow-import");

const stamp = () => {
  const now = new Date();
  const pad = (value) => String(value).padStart(2, "0");
  return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
};

const exists = (file) => fs.existsSync(path.join(root, file));
const rel = (file) => file ? file : "";
const current = locks.mealPrepRevolution?.currentVisualReview || {};

const packet = {
  createdAt: new Date().toISOString(),
  client: manifest.client,
  flowUrl: manifest.flowUrl,
  videoModel: manifest.flowsImport.videoModel,
  proofModel: manifest.flowsImport.proofModel,
  fallbackModel: manifest.flowsImport.fallbackModel,
  lockedAssets: {
    characterA: current.characterFiles?.[0],
    characterB: current.characterFiles?.[1],
    cameraA: current.cameraFiles?.[0],
    cameraB: current.cameraFiles?.[1],
    ctaVisual: manifest.flowsImport.ctaVisual,
    musicBed: manifest.music.selectedBed.file,
  },
  assetCheck: [],
  scenes: plan.scenes.map((scene) => ({
    scene: scene.scene,
    nodeTitle: scene.nodeTitle,
    speaker: scene.speaker,
    cameraFile: scene.cameraFile,
    audioFile: scene.audioFile,
    dialogue: scene.dialogue,
    prompt: scene.prompt,
  })),
};

for (const [label, file] of Object.entries(packet.lockedAssets)) {
  packet.assetCheck.push({ label, file: rel(file), exists: exists(file) });
}
for (const scene of packet.scenes) {
  packet.assetCheck.push({ label: `${scene.scene} camera`, file: rel(scene.cameraFile), exists: exists(scene.cameraFile) });
  packet.assetCheck.push({ label: `${scene.scene} audio`, file: rel(scene.audioFile), exists: exists(scene.audioFile) });
}

const lines = [
  `# PDS Flows Import Packet`,
  ``,
  `Client: ${packet.client}`,
  `Flow: ${packet.flowUrl}`,
  `Video model: ${packet.videoModel}`,
  `Proof model only: ${packet.proofModel}`,
  `Fallback model: ${packet.fallbackModel}`,
  ``,
  `## Locked Import Assets`,
  ``,
  ...Object.entries(packet.lockedAssets).map(([label, file]) => `- ${label}: ${file}`),
  ``,
  `## Asset Check`,
  ``,
  ...packet.assetCheck.map((item) => `- ${item.exists ? "OK" : "MISSING"} ${item.label}: ${item.file}`),
  ``,
  `## Flows Assembly Rule`,
  ``,
  `Import only approved locked images, approved audio, and scene prompts.`,
  `Hard continuity check: this is an invalid scene if Character A or B changes sides, seats, or bike assignment, including any character-face swap between bikes or crossed bike seating logic.`,
  `Do not let Flows redesign either character. Do not render old direct-to-camera nodes.`,
  `Run S1 and S2 only first as the proof pass, then update sandbox before full sequence generation.`,
  ``,
  `## Scene Node Prompts`,
  ``,
  ...packet.scenes.flatMap((scene) => [
    `### ${scene.nodeTitle}`,
    ``,
    `Speaker: ${scene.speaker}`,
    `Camera/source: ${scene.cameraFile}`,
    `Audio: ${scene.audioFile}`,
    `Dialogue: "${scene.dialogue}"`,
    ``,
    "```text",
    scene.prompt,
    "```",
    ``,
  ]),
];

fs.mkdirSync(outDir, { recursive: true });
const id = stamp();
const jsonPath = path.join(outDir, `flow-import-packet-${id}.json`);
const mdPath = path.join(outDir, `flow-import-packet-${id}.md`);
fs.writeFileSync(jsonPath, JSON.stringify(packet, null, 2));
fs.writeFileSync(mdPath, lines.join("\n"));
console.log(`Wrote ${path.relative(root, jsonPath)}`);
console.log(`Wrote ${path.relative(root, mdPath)}`);

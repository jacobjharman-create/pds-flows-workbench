import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const indexPath = path.join(root, "index.html");
const nodesPath = path.join(root, "nodes.json");
const audioBedsPath = path.join(root, "audio-beds.json");
const shotBoardPath = path.join(root, "shot-direction-board.json");

const required = [indexPath, nodesPath];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const nodes = JSON.parse(fs.readFileSync(nodesPath, "utf8")).nodes ?? [];
const audioBeds = fs.existsSync(audioBedsPath)
  ? JSON.parse(fs.readFileSync(audioBedsPath, "utf8")).beds ?? []
  : [];
const shotBoard = fs.existsSync(shotBoardPath)
  ? JSON.parse(fs.readFileSync(shotBoardPath, "utf8")).shots ?? []
  : [];
const localAssets = [
  ...nodes.flatMap((node) =>
    (node.media ?? [])
      .map((media) => media.local)
      .filter(Boolean)
  ),
  ...audioBeds.map((bed) => bed.file).filter(Boolean),
  ...shotBoard.map((shot) => shot.file).filter(Boolean),
];

const missing = localAssets.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Missing local assets:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexPath, "utf8");
if (indexHtml.includes("blob:")) {
  console.error("index.html contains non-portable blob URLs.");
  process.exit(1);
}

const imageSrcs = [...indexHtml.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]);
const allowedImages = new Set(shotBoard.map((shot) => shot.file));
const unexpectedImages = imageSrcs.filter((src) => !allowedImages.has(src));
if (unexpectedImages.length) {
  console.error("Unexpected image tags:");
  for (const src of unexpectedImages) console.error(`- ${src}`);
  process.exit(1);
}

const audioSrcs = [...indexHtml.matchAll(/<audio[^>]+src="([^"]+)"/g)].map((match) => match[1]);
const allowedAudio = new Set(audioBeds.map((bed) => bed.file));
const unexpectedAudio = audioSrcs.filter((src) => !allowedAudio.has(src));
if (unexpectedAudio.length) {
  console.error("Unexpected audio tags:");
  for (const src of unexpectedAudio) console.error(`- ${src}`);
  process.exit(1);
}

const videoTags = [...indexHtml.matchAll(/<video\b[^>]*>/g)].map((match) => match[0]);
const videoPosters = videoTags
  .map((tag) => tag.match(/\bposter="([^"]+)"/)?.[1])
  .filter(Boolean);
if (videoPosters.length !== videoTags.length) {
  console.error(`Expected every video to have a poster; found ${videoPosters.length}/${videoTags.length}.`);
  process.exit(1);
}

const missingPosters = videoPosters.filter((file) => !fs.existsSync(path.join(root, file)));
if (missingPosters.length) {
  console.error("Missing video poster assets:");
  for (const file of missingPosters) console.error(`- ${file}`);
  process.exit(1);
}

const mp4Count = localAssets.filter((file) => file.endsWith(".mp4")).length;
const imageCount =
  localAssets.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)).length + videoPosters.length;
const audioCount = localAssets.filter((file) => /\.(mp3|m4a|wav|ogg)$/i.test(file)).length;

console.log(`Verified ${localAssets.length + videoPosters.length} assets (${imageCount} images, ${mp4Count} videos, ${audioCount} audio).`);

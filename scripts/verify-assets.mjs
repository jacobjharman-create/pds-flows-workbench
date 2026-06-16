import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const indexPath = path.join(root, "index.html");
const nodesPath = path.join(root, "nodes.json");

const required = [indexPath, nodesPath];
for (const file of required) {
  if (!fs.existsSync(file)) {
    console.error(`Missing required file: ${file}`);
    process.exit(1);
  }
}

const nodes = JSON.parse(fs.readFileSync(nodesPath, "utf8")).nodes ?? [];
const localAssets = nodes.flatMap((node) =>
  (node.media ?? [])
    .map((media) => media.local)
    .filter(Boolean)
);

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

const mp4Count = localAssets.filter((file) => file.endsWith(".mp4")).length;
const imageCount = localAssets.filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file)).length;
const audioCount = localAssets.filter((file) => /\.(mp3|m4a|wav|ogg)$/i.test(file)).length;

console.log(`Verified ${localAssets.length} assets (${imageCount} images, ${mp4Count} videos, ${audioCount} audio).`);

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nodesPath = path.join(root, "nodes.json");
const indexPath = path.join(root, "index.html");
const data = JSON.parse(fs.readFileSync(nodesPath, "utf8"));
const nodes = data.nodes ?? [];

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const attr = (value = "") => escapeHtml(value);

const sceneNodes = new Map(
  nodes
    .filter((node) => /^S\d+ — CAM/.test(node.title))
    .map((node) => {
      const scene = node.title.match(/^S(\d+)/)?.[1];
      return [Number(scene), node];
    })
);

const endCardNode = nodes.find((node) => node.title === "END CARD — Animated Hold");

const videoFor = (node) => (node?.media ?? []).find((media) => media.tag === "VIDEO" && media.local);

const timeline = [
  ...Array.from({ length: 9 }, (_, index) => {
    const scene = index + 1;
    const node = sceneNodes.get(scene);
    return {
      key: `S${scene}`,
      node,
      video: videoFor(node),
    };
  }),
  {
    key: "END",
    node: endCardNode,
    video: videoFor(endCardNode),
  },
];

const available = timeline.filter((item) => item.video);
const waiting = timeline.filter((item) => !item.video);

const renderVideo = (item) => `
<section class="stage-item" id="${attr(item.key)}">
  <video controls playsinline preload="metadata" src="${attr(item.video.local)}"></video>
</section>`;

const waitingMarkup = waiting.length
  ? `<section class="waiting">
      <span>Waiting for video</span>
      <strong>${escapeHtml(waiting.map((item) => item.key).join(" / "))}</strong>
    </section>`
  : "";

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PDS Flows Video Stage</title>
  <style>
    *{box-sizing:border-box}
    html{scroll-snap-type:y proximity;background:#05070a}
    body{margin:0;background:#05070a;color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{min-height:100svh}
    .stage-item{position:relative;min-height:100svh;display:grid;place-items:center;padding:0;scroll-snap-align:start}
    .stage-item video{width:min(100vw,calc(100svh * 9 / 16));height:min(100svh,calc(100vw * 16 / 9));max-width:100vw;max-height:100svh;aspect-ratio:9/16;object-fit:contain;background:#000}
    .waiting{min-height:32svh;display:grid;place-items:center;text-align:center;padding:40px 18px;color:#cbd5e1;border-top:1px solid #111827}
    .waiting span{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8}
    .waiting strong{display:block;margin-top:6px;font-size:20px;color:#f8fafc}
  </style>
</head>
<body>
  <main>
    ${available.map(renderVideo).join("\n")}
    ${waitingMarkup}
  </main>
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`Rebuilt ${indexPath} with ${available.length} video-stage clips.`);

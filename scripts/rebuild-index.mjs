import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const nodesPath = path.join(root, "nodes.json");
const indexPath = path.join(root, "index.html");
const flowUrl = "https://elevenlabs.io/app/flows/FmHLp335MCn04VGz1Ndz";

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

const labelFor = (node, fallback) =>
  node?.title
    ?.replace(/"/g, "")
    .replace(/^S(\d+) — CAM ([AB]) — /, "Scene $1 / Camera $2 / ")
    .replace(/^END CARD — /, "End Card / ") ?? fallback;

const timeline = [
  ...Array.from({ length: 9 }, (_, index) => {
    const scene = index + 1;
    const node = sceneNodes.get(scene);
    return {
      key: `S${scene}`,
      label: labelFor(node, `Scene ${scene}`),
      node,
      video: videoFor(node),
    };
  }),
  {
    key: "END",
    label: labelFor(endCardNode, "End Card"),
    node: endCardNode,
    video: videoFor(endCardNode),
  },
];

const available = timeline.filter((item) => item.video);
const waiting = timeline.filter((item) => !item.video);

const renderVideo = (item, index) => `
<section class="stage-item" id="${attr(item.key)}">
  <div class="stage-label">
    <span>${String(index + 1).padStart(2, "0")}</span>
    <strong>${escapeHtml(item.label)}</strong>
  </div>
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
    a{color:#bfdbfe}
    .topbar{position:fixed;top:0;left:0;right:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:10px 14px;background:linear-gradient(180deg,#05070ad9,#05070a8a 72%,transparent);backdrop-filter:blur(10px)}
    .title{min-width:0}
    h1{margin:0;font-size:15px;line-height:1.1}
    .meta{margin-top:3px;color:#cbd5e1;font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .nav{display:flex;align-items:center;gap:6px;overflow-x:auto;max-width:52vw;padding-bottom:2px}
    .nav a{flex:0 0 auto;text-decoration:none;font-size:11px;color:#dbeafe;background:#111827cc;border:1px solid #334155;border-radius:5px;padding:5px 7px}
    .stage-item{position:relative;min-height:100svh;display:grid;place-items:center;padding:54px 14px 18px;scroll-snap-align:start}
    .stage-item video{width:min(100%,calc(100svh * 9 / 16));height:min(calc(100svh - 88px),calc(100vw * 16 / 9));max-height:calc(100svh - 88px);aspect-ratio:9/16;object-fit:contain;background:#000;border:1px solid #1f2937;border-radius:8px;box-shadow:0 20px 80px #000a}
    .stage-label{position:absolute;left:14px;bottom:14px;display:flex;align-items:center;gap:8px;max-width:calc(100% - 28px);padding:8px 10px;background:#05070acc;border:1px solid #1f2937;border-radius:7px;backdrop-filter:blur(10px)}
    .stage-label span{font-size:11px;color:#94a3b8}
    .stage-label strong{font-size:12px;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .waiting{min-height:32svh;display:grid;place-items:center;text-align:center;padding:40px 18px;color:#cbd5e1;border-top:1px solid #111827}
    .waiting span{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8}
    .waiting strong{display:block;margin-top:6px;font-size:20px;color:#f8fafc}
    @media (max-width:700px){
      .topbar{align-items:flex-start;flex-direction:column;gap:7px}
      .nav{max-width:100%;width:100%}
      .stage-item{padding-top:86px}
      .stage-item video{max-height:calc(100svh - 122px)}
    }
  </style>
</head>
<body>
  <header class="topbar">
    <div class="title">
      <h1>PDS Flows / Video Stage</h1>
      <div class="meta">${available.length} videos in final-order review · ${waiting.length} slots waiting · <a href="${flowUrl}">Open ElevenLabs Flow</a></div>
    </div>
    <nav class="nav" aria-label="Video timeline">
      ${timeline
        .map((item) => item.video ? `<a href="#${attr(item.key)}">${escapeHtml(item.key)}</a>` : "")
        .join("")}
    </nav>
  </header>
  <main>
    ${available.map(renderVideo).join("\n")}
    ${waitingMarkup}
  </main>
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`Rebuilt ${indexPath} with ${available.length} video-stage clips.`);

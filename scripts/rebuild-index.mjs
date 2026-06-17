import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.cwd();
const nodesPath = path.join(root, "nodes.json");
const indexPath = path.join(root, "index.html");
const audioBedsPath = path.join(root, "audio-beds.json");
const shotBoardPath = path.join(root, "shot-direction-board.json");
const reviewStagePath = path.join(root, "review-stage.json");
const data = JSON.parse(fs.readFileSync(nodesPath, "utf8"));
const nodes = data.nodes ?? [];
const audioBeds = fs.existsSync(audioBedsPath)
  ? JSON.parse(fs.readFileSync(audioBedsPath, "utf8")).beds ?? []
  : [];
const shotBoard = fs.existsSync(shotBoardPath)
  ? JSON.parse(fs.readFileSync(shotBoardPath, "utf8")).shots ?? []
  : [];
const reviewStage = fs.existsSync(reviewStagePath)
  ? JSON.parse(fs.readFileSync(reviewStagePath, "utf8"))
  : { currentStage: "video", label: "Current review stage" };

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
const posterFor = (video) => {
  if (!video?.local) return "";
  const parsed = path.parse(video.local);
  const poster = `${parsed.name}-poster.jpg`;
  const videoPath = path.join(root, video.local);
  const posterPath = path.join(root, poster);
  if (!fs.existsSync(videoPath)) return "";
  const shouldCreate =
    !fs.existsSync(posterPath) ||
    fs.statSync(posterPath).mtimeMs < fs.statSync(videoPath).mtimeMs;
  if (shouldCreate) {
    execFileSync("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      "0.12",
      "-i",
      videoPath,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      posterPath,
    ]);
  }
  return poster;
};

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

const renderVideo = (item) => {
  const poster = posterFor(item.video);
  return `
<section class="stage-item" id="${attr(item.key)}">
  <video controls playsinline preload="metadata"${poster ? ` poster="${attr(poster)}"` : ""} src="${attr(item.video.local)}"></video>
</section>`;
};

const renderAudioBed = (bed) => `
<section class="audio-bed">
  <div>
    <strong>${escapeHtml(bed.title)}</strong>
    <p>${escapeHtml(bed.note)}</p>
    ${bed.source ? `<a href="${attr(bed.source)}" rel="noreferrer">Source</a>` : ""}
  </div>
  <audio controls preload="metadata" src="${attr(bed.file)}"></audio>
</section>`;

const renderShot = (shot) => `
<section class="shot-card">
  ${shot.file ? `<img src="${attr(shot.file)}" alt="${attr(shot.title)}" loading="lazy">` : ""}
  <div>
    <strong>${escapeHtml(shot.title)}</strong>
    <p>${escapeHtml(shot.note)}</p>
  </div>
</section>`;

const waitingMarkup = waiting.length
  ? `<section class="waiting">
      <span>Waiting for video</span>
      <strong>${escapeHtml(waiting.map((item) => item.key).join(" / "))}</strong>
    </section>`
  : "";

const shotSection = shotBoard.length ? `<section class="shot-review" aria-label="Candid camera direction board">
      ${reviewStage.currentStage === "photo" ? `<div class="stage-label">${escapeHtml(reviewStage.label)}</div>` : ""}
      <h1>Candid Camera Direction Board</h1>
      ${shotBoard.map(renderShot).join("\n")}
    </section>` : "";

const videoSection = `<section class="video-review" aria-label="Existing video reference strip">
      ${reviewStage.currentStage === "video" ? `<div class="stage-label">${escapeHtml(reviewStage.label)}</div>` : ""}
      <h1>Existing Video Reference Strip</h1>
      ${available.map(renderVideo).join("\n")}
      ${waitingMarkup}
    </section>`;

const audioSection = audioBeds.length ? `<section class="audio-review" aria-label="Audio beds for approval">
      ${reviewStage.currentStage === "audio" ? `<div class="stage-label">${escapeHtml(reviewStage.label)}</div>` : ""}
      <h1>Audio Beds For Approval</h1>
      ${audioBeds.map(renderAudioBed).join("\n")}
    </section>` : "";

const sectionsByStage = {
  audio: [audioSection, shotSection, videoSection],
  photo: [shotSection, videoSection, audioSection],
  video: [videoSection, shotSection, audioSection],
};

const currentSectionOnly = {
  audio: [audioSection],
  photo: [shotSection],
  video: [videoSection],
};

const orderedSections = (reviewStage.onlyCurrentStage
  ? currentSectionOnly[reviewStage.currentStage]
  : sectionsByStage[reviewStage.currentStage] ?? sectionsByStage.video)
  .filter(Boolean)
  .join("\n");

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <title>PDS Flows Review Stage</title>
  <style>
    *{box-sizing:border-box}
    html{scroll-snap-type:y proximity;background:#05070a}
    body{margin:0;background:#05070a;color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    main{min-height:100svh}
    .stage-label{max-width:880px;margin:0 auto 16px;color:#94a3b8;font-size:12px;line-height:1.35;text-transform:uppercase;letter-spacing:.08em}
    .stage-item{position:relative;min-height:100svh;display:grid;place-items:center;padding:0;scroll-snap-align:start}
    .stage-item video{width:min(100vw,calc(100svh * 9 / 16));height:min(100svh,calc(100vw * 16 / 9));max-width:100vw;max-height:100svh;aspect-ratio:9/16;object-fit:contain;background:#000}
    .video-review{background:#05070a;border-top:1px solid #1f2937}
    .video-review h1{position:absolute;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;clip:rect(0,0,0,0);border:0}
    .waiting{min-height:32svh;display:grid;place-items:center;text-align:center;padding:40px 18px;color:#cbd5e1;border-top:1px solid #111827}
    .waiting span{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#94a3b8}
    .waiting strong{display:block;margin-top:6px;font-size:20px;color:#f8fafc}
    .audio-review{padding:28px 16px 40px;background:#080b11;border-top:1px solid #1f2937}
    .audio-review h1{margin:0 auto 16px;max-width:880px;font-size:18px;font-weight:700;line-height:1.15}
    .audio-bed{max-width:880px;margin:0 auto 12px;padding:14px;background:#111827;border:1px solid #263244;border-radius:8px}
    .audio-bed strong{display:block;font-size:14px;line-height:1.2}
    .audio-bed p{margin:5px 0 12px;color:#cbd5e1;font-size:12px;line-height:1.35}
    .audio-bed a{display:inline-block;margin:-4px 0 12px;color:#8dd7ff;font-size:12px}
    .audio-bed audio{display:block;width:100%}
    .shot-review{padding:28px 16px 40px;background:#05070a;border-top:1px solid #1f2937}
    .shot-review h1{margin:0 auto 16px;max-width:880px;font-size:18px;font-weight:700;line-height:1.15}
    .shot-card{max-width:880px;margin:0 auto 18px;background:#0b111c;border:1px solid #263244;border-radius:8px;overflow:hidden}
    .shot-card img{display:block;width:100%;height:auto;background:#000}
    .shot-card div{padding:14px}
    .shot-card strong{display:block;font-size:14px;line-height:1.2}
    .shot-card p{margin:5px 0 0;color:#cbd5e1;font-size:12px;line-height:1.35}
  </style>
</head>
<body>
  <main>
    ${orderedSections}
  </main>
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`Rebuilt ${indexPath} with ${available.length} video-stage clips.`);

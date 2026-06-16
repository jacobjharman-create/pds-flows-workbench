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

const groups = [
  ["Character References", (node) => /^REF — Character/.test(node.title)],
  ["Environment / End Card", (node) => /^(REF — Gym|END CARD|Image$)/.test(node.title)],
  ["Dialogue Audio", (node) => /(?:TTS|Music)/.test(node.title)],
  ["Scene Video Outputs / Lip-Sync QA", (node) => /^S\d+ — CAM/.test(node.title)],
  ["Compositions", (node) => /^FINAL/.test(node.title)],
];

const classify = (node) => {
  if (/Generation failed/.test(node.text ?? "")) return "failed";
  if (/Your (?:generation|audio) will appear here/.test(node.text ?? "")) return "not-generated";
  if ((node.media ?? []).some((media) => media.local)) return "preview-available";
  return "not-generated";
};

const statusLabel = (node) => {
  const cls = classify(node);
  if (cls === "failed") return "failed";
  if (cls === "not-generated") return "not generated";
  return "preview available";
};

const statusShort = (node) => {
  const cls = classify(node);
  if (cls === "failed") return "fail";
  if (cls === "not-generated") return "wait";
  return "ready";
};

const mediaTypes = (node) => {
  const types = new Set(
    (node.media ?? [])
      .filter((media) => media.local)
      .map((media) => media.tag)
  );
  return ["IMG", "VIDEO", "AUDIO"].filter((type) => types.has(type));
};

const compactTitle = (title = "") =>
  title
    .replace(/^REF — /, "")
    .replace(/^END CARD — /, "End — ")
    .replace(/^FINAL DRAFT — /, "Draft — ")
    .replace(/^FINAL — /, "Final — ")
    .replace(/TTS — /, "")
    .replace(/CAM /, "")
    .replaceAll('"', "")
    .slice(0, 58);

const firstPortablePreview = (node) =>
  (node.media ?? []).find((media) => media.local && (media.tag === "IMG" || media.tag === "VIDEO"));

const mediaMarkup = (node) => {
  const media = node.media ?? [];
  const html = [];
  for (const item of media) {
    if (item.local) {
      const src = attr(item.local);
      const alt = attr(item.alt || node.title);
      if (item.tag === "AUDIO") {
        html.push(`<audio controls preload="metadata" src="${src}"></audio>`);
      } else if (item.tag === "VIDEO") {
        html.push(`<video controls playsinline preload="metadata" src="${src}"></video>`);
      } else if (item.tag === "IMG") {
        html.push(`<img loading="lazy" src="${src}" alt="${alt}">`);
      }
      continue;
    }

    if (item.tag === "AUDIO") {
      const unavailable = /Your audio will appear here/.test(node.text ?? "")
        ? "Audio has not been generated in ElevenLabs yet."
        : "Audio exists only as a temporary ElevenLabs browser preview and is not portable yet.";
      html.push(`<p class="muted media-note">${escapeHtml(unavailable)}</p>`);
    }
  }

  if (!html.length) {
    html.push(`<p class="muted">No portable preview media found for this node yet.</p>`);
  }
  return html.join("");
};

const summarize = (text = "") =>
  escapeHtml(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join(" / ")
  );

const renderCard = (node) => `
<article id="${attr(node.id)}" class="card ${classify(node)}">
  <h3>${escapeHtml(node.title)}</h3>
  <div class="meta">
    <span>${escapeHtml(statusLabel(node))}</span>
    <span>${escapeHtml(node.id)}</span>
  </div>
  ${mediaMarkup(node)}
  <details class="summary-details">
    <summary>Prompt / node details</summary>
    <p class="summary">${summarize(node.text)}</p>
  </details>
  <a class="node" href="${flowUrl}">Open Flow</a>
</article>`;

const renderMiniCard = (node) => {
  const media = firstPortablePreview(node);
  const mediaPreview = media
    ? media.tag === "VIDEO"
      ? `<video muted playsinline preload="metadata" src="${attr(media.local)}"></video>`
      : `<img loading="lazy" src="${attr(media.local)}" alt="${attr(node.title)}">`
    : `<div class="empty-thumb">${escapeHtml(statusShort(node))}</div>`;
  const chips =
    mediaTypes(node)
      .map((type) => `<span>${type === "VIDEO" ? "V" : type === "AUDIO" ? "A" : "I"}</span>`)
      .join("") || "<span>-</span>";

  return `
<a class="mini-card ${classify(node)}" href="#${attr(node.id)}" aria-label="${attr(node.title)}">
  <div class="thumb">${mediaPreview}</div>
  <div class="mini-copy">
    <strong>${escapeHtml(compactTitle(node.title))}</strong>
    <span>${escapeHtml(statusShort(node))}</span>
  </div>
  <div class="type-chips">${chips}</div>
</a>`;
};

const rendered = new Set();
const sections = groups
  .map(([heading, predicate]) => {
    const groupNodes = nodes.filter((node) => predicate(node));
    groupNodes.forEach((node) => rendered.add(node));
    if (!groupNodes.length) return "";
    return `<h2>${escapeHtml(heading)}</h2><section class="grid">${groupNodes.map(renderCard).join("\n")}</section>`;
  })
  .join("\n");

const remaining = nodes.filter((node) => !rendered.has(node));
const otherSection = remaining.length
  ? `<h2>Other Nodes</h2><section class="grid">${remaining.map(renderCard).join("\n")}</section>`
  : "";

const counts = nodes.reduce(
  (acc, node) => {
    acc.total += 1;
    acc[classify(node)] += 1;
    for (const type of mediaTypes(node)) acc[type] += 1;
    return acc;
  },
  { total: 0, "preview-available": 0, "not-generated": 0, failed: 0, IMG: 0, VIDEO: 0, AUDIO: 0 }
);

const overview = `
<section class="overview" aria-label="PDS Flows node overview">
  <div class="status-strip">
    <div><strong>${counts.total}</strong><span>nodes</span></div>
    <div><strong>${counts["preview-available"]}</strong><span>ready</span></div>
    <div><strong>${counts.AUDIO}</strong><span>audio</span></div>
    <div><strong>${counts.VIDEO}</strong><span>video</span></div>
    <div><strong>${counts["not-generated"]}</strong><span>waiting</span></div>
    <div><strong>${counts.failed}</strong><span>failed</span></div>
  </div>
  <div class="mini-grid">${nodes.map(renderMiniCard).join("\n")}</div>
</section>`;

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PDS Flows Progress Preview</title>
  <style>
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;background:#0f1115;color:#f5f1e8;overflow-x:hidden}
    a{color:#93c5fd}
    header{position:sticky;top:0;background:#0f1115f2;backdrop-filter:blur(12px);padding:10px 14px;border-bottom:1px solid #282d35;z-index:3}
    h1{font-size:18px;line-height:1.1;margin:0 0 2px}
    h2{font-size:14px;margin:18px 14px 8px;color:#e5e7eb}
    .flow{color:#93c5fd}
    .portable{font-size:11px;color:#b8c1cc;margin-top:4px}
    .campaign-line{font-size:14px;line-height:1.2;overflow-wrap:anywhere}
    .overview{padding:10px 14px 6px;border-bottom:1px solid #202734;background:#10141b}
    .status-strip{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;margin-bottom:8px}
    .status-strip div{min-width:0;background:#171b22;border:1px solid #2c3340;border-radius:7px;padding:7px 8px}
    .status-strip strong{display:block;font-size:18px;line-height:1;color:#fff}
    .status-strip span{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8;margin-top:3px}
    .mini-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(116px,1fr));gap:7px}
    .mini-card{position:relative;display:grid;grid-template-columns:34px minmax(0,1fr);gap:7px;min-width:0;min-height:48px;overflow:hidden;text-decoration:none;color:#e5e7eb;background:#171b22;border:1px solid #2c3340;border-radius:7px;padding:6px}
    .mini-card:hover,.mini-card:focus{border-color:#93c5fd;outline:none}
    .thumb{width:34px;height:34px;border-radius:5px;overflow:hidden;background:#0a0d12;display:grid;place-items:center}
    .thumb img,.thumb video{width:100%;height:100%;object-fit:cover;border-radius:0;background:#0a0d12}
    .empty-thumb{font-size:9px;text-transform:uppercase;color:#94a3b8}
    .mini-copy{min-width:0}
    .mini-copy strong{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:11px;line-height:1.2}
    .mini-copy span{display:inline-block;margin-top:3px;font-size:9px;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8}
    .type-chips{position:absolute;right:5px;bottom:5px;display:flex;gap:2px}
    .type-chips span{font-size:8px;line-height:1;color:#cbd5e1;background:#243044;border-radius:3px;padding:2px 3px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;padding:0 14px 18px}
    .card{background:#171b22;border:1px solid #2c3340;border-radius:8px;padding:10px;scroll-margin-top:78px}
    .card h3{font-size:13px;line-height:1.2;margin:0 0 6px}
    .meta{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:7px}
    .meta span{font-size:10px;color:#b8c1cc;background:#222936;padding:2px 5px;border-radius:4px;word-break:break-word}
    .failed{border-color:#7f1d1d}
    .not-generated{border-color:#7c5f16}
    .preview-available{border-color:#31523e}
    img,video{width:100%;max-height:180px;object-fit:contain;background:#0a0d12;border-radius:6px}
    audio{width:100%;min-height:34px}
    .summary-details{margin-top:7px}
    .summary-details summary{cursor:pointer;font-size:11px;color:#93c5fd}
    .summary{font-size:12px;line-height:1.45;color:#cbd5e1}
    .muted{color:#94a3b8;font-size:12px}
    .media-note{padding:8px;border:1px solid #334155;border-radius:6px;background:#111827}
    .node{display:inline-block;color:#93c5fd;font-size:11px;margin-top:6px}
    @media (min-width:1200px){
      .mini-grid{grid-template-columns:repeat(auto-fill,minmax(128px,1fr))}
      .overview{min-height:calc(100vh - 74px)}
    }
    @media (max-width:700px){
      header{position:relative}
      h1{font-size:17px}
      .campaign-line{font-size:13px}
      .status-strip{grid-template-columns:repeat(2,minmax(0,1fr))}
      .mini-grid{grid-template-columns:1fr}
      .grid{grid-template-columns:1fr}
      img,video{max-height:150px}
    }
  </style>
</head>
<body>
  <header>
    <h1>PDS Flows Progress Preview</h1>
    <div class="campaign-line">Meal Prep Revolution draft pass · <a class="flow" href="${flowUrl}">Open ElevenLabs Flow</a></div>
    <div class="portable">Compact phone-safe review board. Tap a node to jump to its media and collapsed details.</div>
  </header>
  ${overview}
  ${sections}
  ${otherSection}
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`Rebuilt ${indexPath}`);

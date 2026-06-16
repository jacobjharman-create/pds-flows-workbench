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
<article class="card ${classify(node)}">
  <h3>${escapeHtml(node.title)}</h3>
  <div class="meta">
    <span>${escapeHtml(statusLabel(node))}</span>
    <span>${escapeHtml(node.id)}</span>
  </div>
  ${mediaMarkup(node)}
  <p class="summary">${summarize(node.text)}</p>
  <a class="node" href="${flowUrl}">Open Flow</a>
</article>`;

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

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>PDS Flows Progress Preview</title>
  <style>
    *{box-sizing:border-box}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;margin:0;background:#0f1115;color:#f5f1e8}
    a{color:#93c5fd}
    header{position:sticky;top:0;background:#0f1115f2;backdrop-filter:blur(12px);padding:18px 24px;border-bottom:1px solid #282d35;z-index:3}
    h1{font-size:22px;line-height:1.15;margin:0 0 4px}
    h2{font-size:18px;margin:28px 24px 12px}
    .flow{color:#93c5fd}
    .portable{font-size:12px;color:#b8c1cc;margin-top:7px}
    .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;padding:0 24px 24px}
    .card{background:#171b22;border:1px solid #2c3340;border-radius:8px;padding:14px}
    .card h3{font-size:15px;line-height:1.25;margin:0 0 8px}
    .meta{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}
    .meta span{font-size:11px;color:#b8c1cc;background:#222936;padding:3px 6px;border-radius:4px;word-break:break-word}
    .failed{border-color:#7f1d1d}
    .not-generated{border-color:#7c5f16}
    img,video{width:100%;max-height:520px;object-fit:contain;background:#0a0d12;border-radius:6px}
    audio{width:100%;min-height:40px}
    .summary{font-size:12px;line-height:1.45;color:#cbd5e1}
    .muted{color:#94a3b8;font-size:12px}
    .media-note{padding:10px;border:1px solid #334155;border-radius:6px;background:#111827}
    .node{display:inline-block;color:#93c5fd;font-size:12px;margin-top:6px}
  </style>
</head>
<body>
  <header>
    <h1>PDS Flows Progress Preview</h1>
    <div>Meal Prep Revolution draft pass · <a class="flow" href="${flowUrl}">Open ElevenLabs Flow</a></div>
    <div class="portable">Phone-safe preview: this page only embeds portable hosted files. Temporary ElevenLabs blob previews are hidden until captured.</div>
  </header>
  ${sections}
  ${otherSection}
</body>
</html>
`;

fs.writeFileSync(indexPath, html);
console.log(`Rebuilt ${indexPath}`);

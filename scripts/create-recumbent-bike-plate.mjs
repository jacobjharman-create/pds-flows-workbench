import fs from "node:fs";

const out = process.argv[2] ?? "recumbent-bike-3d-prop-plate-20260617-0150.svg";

const bike = (id, x, y, mirrored = false) => {
  const mirror = mirrored ? `translate(${x + 720} ${y}) scale(-1 1)` : `translate(${x} ${y})`;
  return `
  <g id="${id}" transform="${mirror}">
    <ellipse cx="360" cy="590" rx="340" ry="42" fill="url(#floorShadow)" opacity=".52"/>

    <path d="M88 536 C150 466 250 430 390 426 L630 420 C684 418 718 454 704 500 C692 538 646 558 574 564 L218 594 C142 600 90 574 74 544 C70 536 78 530 88 536Z" fill="url(#frameSide)" stroke="#0b1120" stroke-width="5"/>
    <path d="M132 568 C270 548 462 546 642 548 C672 548 696 532 708 502" fill="none" stroke="url(#champagneTrim)" stroke-width="9" stroke-linecap="round" opacity=".72"/>
    <path d="M128 548 C270 530 442 528 620 530" fill="none" stroke="#05070a" stroke-width="12" stroke-linecap="round"/>

    <circle cx="152" cy="498" r="90" fill="url(#flywheel)" stroke="#020617" stroke-width="8"/>
    <circle cx="152" cy="498" r="58" fill="none" stroke="#334155" stroke-width="8" stroke-dasharray="3 10" opacity=".66"/>
    <circle cx="152" cy="498" r="16" fill="#94a3b8" stroke="#111827" stroke-width="5"/>
    <path d="M152 498 L86 462" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
    <path d="M152 498 L218 536" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
    <rect x="54" y="436" width="76" height="26" rx="9" fill="#111827" stroke="#64748b" stroke-width="5"/>
    <rect x="200" y="526" width="76" height="26" rx="9" fill="#111827" stroke="#64748b" stroke-width="5"/>

    <path d="M286 432 C326 356 394 330 492 336 L572 342 C592 344 604 358 600 376 L590 414 C586 430 570 440 552 438 L424 424 C370 418 334 432 304 458 Z" fill="url(#seat)" stroke="#020617" stroke-width="7"/>
    <path d="M398 326 C430 244 488 192 560 170 C586 162 608 180 604 208 L590 318 C586 342 568 356 544 352 L424 338 C406 336 392 330 398 326Z" fill="url(#seatBack)" stroke="#020617" stroke-width="7"/>
    <path d="M388 448 C462 442 536 452 600 472" fill="none" stroke="url(#champagneTrim)" stroke-width="8" stroke-linecap="round" opacity=".82"/>
    <path d="M540 444 C570 444 592 454 604 474" fill="none" stroke="#0f172a" stroke-width="14" stroke-linecap="round"/>
    <path d="M394 438 C360 456 342 480 336 514" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>

    <path d="M244 456 C298 374 374 332 474 328" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>
    <path d="M592 438 L662 438 C682 438 696 454 696 474" fill="none" stroke="#0f172a" stroke-width="12" stroke-linecap="round"/>

    <path d="M300 432 C318 402 344 382 380 370" fill="none" stroke="#0f172a" stroke-width="13" stroke-linecap="round"/>
    <path d="M338 398 L408 398" fill="none" stroke="#111827" stroke-width="8" stroke-linecap="round"/>
    <path d="M318 420 L412 420" fill="none" stroke="#334155" stroke-width="6" stroke-linecap="round" opacity=".72"/>
    <rect x="386" y="338" width="122" height="78" rx="17" transform="rotate(-4 447 377)" fill="url(#screenBezel)" stroke="#020617" stroke-width="6"/>
    <rect x="402" y="354" width="90" height="48" rx="9" transform="rotate(-4 447 377)" fill="url(#screen)" stroke="#64748b" stroke-width="3"/>
    <circle cx="447" cy="402" r="5" fill="#94a3b8"/>

    <path d="M304 466 C268 484 240 514 222 556" fill="none" stroke="#94a3b8" stroke-width="7" stroke-linecap="round" opacity=".55"/>
    <path d="M432 428 C492 432 550 442 608 462" fill="none" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" opacity=".5"/>

    <path d="M92 608 L688 608" stroke="#111827" stroke-width="12" stroke-linecap="round"/>
    <path d="M136 608 L102 640" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
    <path d="M642 608 L686 640" stroke="#111827" stroke-width="10" stroke-linecap="round"/>
  </g>`;
};

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1536" height="1536" viewBox="0 0 1536 1536" role="img" aria-label="Locked 2026 premium recumbent bike prop plate">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#07111f"/>
      <stop offset=".55" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="frameSide" x1="0" x2="1">
      <stop offset="0" stop-color="#020617"/>
      <stop offset=".48" stop-color="#111827"/>
      <stop offset=".75" stop-color="#334155"/>
      <stop offset="1" stop-color="#05070a"/>
    </linearGradient>
    <linearGradient id="champagneTrim" x1="0" x2="1">
      <stop offset="0" stop-color="#475569"/>
      <stop offset=".5" stop-color="#d6c7a1"/>
      <stop offset="1" stop-color="#64748b"/>
    </linearGradient>
    <linearGradient id="seat" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#1f2937"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="seatBack" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0" stop-color="#334155"/>
      <stop offset="1" stop-color="#020617"/>
    </linearGradient>
    <radialGradient id="flywheel" cx=".42" cy=".35" r=".72">
      <stop offset="0" stop-color="#334155"/>
      <stop offset=".62" stop-color="#111827"/>
      <stop offset="1" stop-color="#020617"/>
    </radialGradient>
    <linearGradient id="screenBezel" x1="0" x2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#dbeafe"/>
      <stop offset=".35" stop-color="#64748b"/>
      <stop offset="1" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="floorShadow">
      <stop offset="0" stop-color="#020617"/>
      <stop offset="1" stop-color="#020617" stop-opacity="0"/>
    </radialGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10Z" fill="#22c55e"/>
    </marker>
  </defs>

  <rect width="1536" height="1536" fill="url(#bg)"/>
  <path d="M0 1124 C260 1064 512 1050 768 1082 C1038 1116 1288 1098 1536 1028 L1536 1536 L0 1536Z" fill="#0b1120"/>
  <g opacity=".16" stroke="#94a3b8" stroke-width="2">
    <path d="M120 1190 H1416"/>
    <path d="M210 1290 H1326"/>
    <path d="M320 1392 H1216"/>
    <path d="M340 1030 L180 1536"/>
    <path d="M762 1030 L720 1536"/>
    <path d="M1194 1030 L1358 1536"/>
  </g>

  <text x="96" y="90" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="700">PDS Flows Prop Plate — 2027 Premium Open-Cockpit Recumbent Bike</text>
  <text x="96" y="136" fill="#94a3b8" font-family="Inter, Arial, sans-serif" font-size="21">One deterministic bike model. Same geometry duplicated. Bike-only mirror creates the opposite-side view.</text>
  <text x="96" y="170" fill="#94a3b8" font-family="Inter, Arial, sans-serif" font-size="21">Scene placement stays parallel: Bike A and Bike B face the same physical direction.</text>

  <g transform="translate(84 180)">
    ${bike("bike-side-a", 0, 0, false)}
  </g>
  <g transform="translate(684 180)">
    ${bike("bike-side-b-mirrored-only", 0, 0, true)}
  </g>
  <text x="196" y="806" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">Shot 1 side / source bike geometry</text>
  <text x="874" y="806" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">Opposite side / mirrored bike only</text>

  <line x1="230" y1="968" x2="620" y2="968" stroke="#22c55e" stroke-width="8" marker-end="url(#arrow)"/>
  <line x1="910" y1="968" x2="1300" y2="968" stroke="#22c55e" stroke-width="8" marker-end="url(#arrow)"/>
  <text x="228" y="1016" fill="#bbf7d0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">same physical forward direction</text>
  <text x="906" y="1016" fill="#bbf7d0" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="700">same physical forward direction</text>

  <g transform="translate(96 1100)">
    <rect x="0" y="0" width="1344" height="292" rx="28" fill="#0f172a" stroke="#334155" stroke-width="2"/>
    <text x="34" y="54" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">Locked Bike Specification</text>
    <text x="34" y="96" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="19">Same sleek black satin frame, champagne trim, open cockpit, low compact touchscreen, side/base handles,</text>
    <text x="34" y="128" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="19">vented flywheel housing, foot straps, and logical crank/pedal path in every frame.</text>
    <text x="34" y="172" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="19">No bulky upright handlebars. No 1990s gym equipment. No floating screens. No crossed feet.</text>
    <text x="34" y="204" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="19">No missing pedals. No bike style changes between Camera A and Camera B.</text>
    <text x="34" y="252" fill="#f8fafc" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="700">Scene Placement Rule</text>
    <text x="374" y="252" fill="#cbd5e1" font-family="Inter, Arial, sans-serif" font-size="19">Bike A and Bike B stay parallel and face the same direction. Camera can move; bike model cannot.</text>
  </g>
</svg>
`;

fs.writeFileSync(out, svg);
console.log(out);

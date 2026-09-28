import QRCode from "qrcode";
import fs from "fs";

async function run() {
  const url = "https://hazardous9hub.github.io/reactivity-arena/";
  const qrSvgInner = await QRCode.toString(url, { type: "svg", margin: 1, errorCorrectionLevel: "H" });

  const pathMatch = qrSvgInner.match(/<path[^>]+>/);
  const qrPath = pathMatch ? pathMatch[0] : "";
  const viewBoxMatch = qrSvgInner.match(/viewBox="([^"]+)"/);
  const qrViewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 37 37";

  const posterSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1600" viewBox="0 0 1200 1600">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#080d1a" />
      <stop offset="50%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#070b14" />
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="50%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="1600" fill="url(#bgGrad)" />

  <!-- Borders -->
  <rect x="30" y="30" width="1140" height="1540" rx="24" fill="none" stroke="#00f2fe" stroke-width="4" />
  <rect x="44" y="44" width="1112" height="1512" rx="16" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="2" />

  <!-- Top Badge -->
  <g transform="translate(350, 75)">
    <rect width="500" height="48" rx="24" fill="rgba(0, 242, 254, 0.12)" stroke="#00f2fe" stroke-width="2" />
    <text x="250" y="31" fill="#00f2fe" font-family="-apple-system, sans-serif" font-size="19" font-weight="bold" text-anchor="middle" letter-spacing="2">CBSE CLASS 10 SCIENCE • CHAPTER 3</text>
  </g>

  <!-- Title and Subtitle -->
  <text x="600" y="185" fill="url(#titleGrad)" font-family="-apple-system, sans-serif" font-size="56" font-weight="900" text-anchor="middle" letter-spacing="3">REACTIVITY ARENA</text>
  <text x="600" y="230" fill="#f59e0b" font-family="-apple-system, sans-serif" font-size="24" font-weight="bold" text-anchor="middle">Metals and Non-Metals 3D Arcade and Board Exam Hub</text>

  <!-- QR Outer Glow & White Card -->
  <rect x="365" y="275" width="470" height="470" rx="28" fill="rgba(0, 242, 254, 0.2)" />
  <rect x="375" y="285" width="450" height="450" rx="24" fill="#ffffff" stroke="#00f2fe" stroke-width="3" />

  <!-- Embedded QR Code -->
  <g transform="translate(400, 310)">
    <svg width="400" height="400" viewBox="${qrViewBox}">
      ${qrPath}
    </svg>
  </g>

  <!-- Call to action -->
  <text x="600" y="800" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="30" font-weight="bold" text-anchor="middle">📱 Scan with Phone Camera or Google Lens</text>
  <text x="600" y="845" fill="#00f2fe" font-family="monospace" font-size="22" text-anchor="middle">${url}</text>
  <text x="600" y="885" fill="#94a3b8" font-family="-apple-system, sans-serif" font-size="18" text-anchor="middle">Permanent QR Code • Never Expires • Zero Login Required</text>

  <!-- Divider -->
  <line x1="120" y1="925" x2="1080" y2="925" stroke="rgba(255,255,255,0.15)" stroke-width="2" />

  <!-- Feature Grid (2x2) -->
  <g transform="translate(110, 960)">
    <!-- Card 1 -->
    <rect x="0" y="0" width="460" height="135" rx="14" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(0, 242, 254, 0.35)" stroke-width="1.5" />
    <text x="24" y="42" fill="#00f2fe" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold">🧗 Crossclimb Puzzles</text>
    <text x="24" y="78" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">Climb the Reactivity Series ladder using</text>
    <text x="24" y="104" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">step-by-step displacement reaction clues.</text>

    <!-- Card 2 -->
    <rect x="520" y="0" width="460" height="135" rx="14" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(0, 242, 254, 0.35)" stroke-width="1.5" />
    <text x="544" y="42" fill="#00f2fe" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold">🎯 Pinpoint Challenges</text>
    <text x="544" y="78" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">Deduce mystery elements from 5 progressive</text>
    <text x="544" y="104" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">chemical, electronic and physical clues.</text>

    <!-- Card 3 -->
    <rect x="0" y="160" width="460" height="135" rx="14" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(0, 242, 254, 0.35)" stroke-width="1.5" />
    <text x="24" y="202" fill="#00f2fe" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold">⚛️ 3D WebGL Labs</text>
    <text x="24" y="238" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">Interactive 3D simulations of NaCl ionic</text>
    <text x="24" y="264" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">lattices, copper refining cell and thermite.</text>

    <!-- Card 4 -->
    <rect x="520" y="160" width="460" height="135" rx="14" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(0, 242, 254, 0.35)" stroke-width="1.5" />
    <text x="544" y="202" fill="#00f2fe" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold">📋 CBSE Board Exam Secrets</text>
    <text x="544" y="238" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">Top 8 high-yield past board traps and tips</text>
    <text x="544" y="264" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16">from 7+ years of official NCERT marking schemes.</text>
  </g>

  <!-- Dedication Card -->
  <g transform="translate(110, 1310)">
    <rect width="980" height="155" rx="18" fill="rgba(236, 72, 153, 0.12)" stroke="rgba(236, 72, 153, 0.4)" stroke-width="2" />
    <text x="490" y="42" fill="#f472b6" font-family="-apple-system, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="1.5">💖 SPECIAL CLASSROOM DEDICATION</text>
    <text x="490" y="78" fill="#ffffff" font-family="-apple-system, sans-serif" font-size="22" font-weight="bold" text-anchor="middle">Dedicated with Love to Pooja and Her Students</text>
    <text x="490" y="110" fill="#cbd5e1" font-family="-apple-system, sans-serif" font-size="16" font-style="italic" text-anchor="middle">"Turning Class 10 Science &amp; Reactions into an Adventure of Curiosity &amp; Board Confidence!"</text>
    <text x="490" y="136" fill="#f59e0b" font-family="-apple-system, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">🌟 Reactivity Arena • Class 10 Science Interactive Learning Arcade 🌟</text>
  </g>

  <!-- Footer -->
  <text x="600" y="1520" fill="#64748b" font-family="-apple-system, sans-serif" font-size="13" text-anchor="middle">Free &amp; Open Educational Resource • Compatible with all Android, iOS and Desktop Browsers</text>
</svg>`;

  fs.writeFileSync("./public/Reactivity-Arena-Classroom-Poster.svg", posterSvg, "utf8");
  fs.writeFileSync("./Reactivity-Arena-Classroom-Poster.svg", posterSvg, "utf8");
  console.log("✓ Reactivity-Arena-Classroom-Poster.svg successfully written!");
}

run().catch(console.error);

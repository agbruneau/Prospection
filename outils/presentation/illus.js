// Illustrations SVG -> PNG pour la présentation « À l'image de Christ-Jésus ».
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const gi = require("react-icons/gi");
const fa = require("react-icons/fa6");

const OUT = path.join(__dirname, "img");
fs.mkdirSync(OUT, { recursive: true });

const OR = "#CC5500", OR_LT = "#E8742A", OR_DK = "#7A3310", CARD = "#1A1411", INK = "#F4EDE4", ASH = "#6E5A4C";

// Icône react-icons imbriquée dans une composition SVG.
function icon(Comp, x, y, size, color) {
  const m = renderToStaticMarkup(React.createElement(Comp));
  const vb = m.match(/viewBox="([^"]+)"/)[1];
  const inner = m.slice(m.indexOf(">") + 1, m.lastIndexOf("</svg>"));
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${vb}" fill="${color}" stroke="${color}" stroke-width="0">${inner}</svg>`;
}

const glow = (id, op = 0.45) => `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
  <stop offset="0" stop-color="${OR}" stop-opacity="${op}"/><stop offset="0.55" stop-color="${OR}" stop-opacity="${op / 5}"/>
  <stop offset="1" stop-color="${OR}" stop-opacity="0"/></radialGradient>`;
const metal = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${OR_LT}"/><stop offset="1" stop-color="#8E3A08"/></linearGradient>`;

// Pièce : disque, grènetis, anneau intérieur. (cx, cy, r)
function coin(cx, cy, r, { stroke = OR, dots = true, fill = CARD } = {}) {
  let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${r * 0.035}"/>`;
  if (dots) {
    const n = 64, rr = r * 0.9;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 2 * Math.PI;
      s += `<circle cx="${(cx + rr * Math.cos(a)).toFixed(1)}" cy="${(cy + rr * Math.sin(a)).toFixed(1)}" r="${(r * 0.018).toFixed(1)}" fill="${stroke}"/>`;
    }
  }
  return s + `<circle cx="${cx}" cy="${cy}" r="${r * 0.82}" fill="none" stroke="${stroke}" stroke-opacity="0.45" stroke-width="${r * 0.012}"/>`;
}

// Silhouette tête-épaules, découpée dans le cercle intérieur.
function person(cx, cy, r, fill, clipId) {
  const ri = r * 0.8;
  return `<clipPath id="${clipId}"><circle cx="${cx}" cy="${cy}" r="${ri}"/></clipPath>
  <g clip-path="url(#${clipId})">
    <circle cx="${cx}" cy="${cy - r * 0.2}" r="${r * 0.25}" fill="${fill}"/>
    <path d="M ${cx - r * 0.55} ${cy + r * 0.85} Q ${cx - r * 0.55} ${cy + r * 0.12} ${cx} ${cy + r * 0.12} Q ${cx + r * 0.55} ${cy + r * 0.12} ${cx + r * 0.55} ${cy + r * 0.85} Z" fill="${fill}"/>
  </g>`;
}

function rays(cx, cy, r1, r2, n, color, width, op = 0.8) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 2 * Math.PI, long = i % 2 === 0 ? r2 : r1 + (r2 - r1) * 0.55;
    s += `<line x1="${(cx + r1 * Math.cos(a)).toFixed(1)}" y1="${(cy + r1 * Math.sin(a)).toFixed(1)}" x2="${(cx + long * Math.cos(a)).toFixed(1)}" y2="${(cy + long * Math.sin(a)).toFixed(1)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-opacity="${op}"/>`;
  }
  return s;
}

const arrow = (x1, y1, x2, y2, color, w) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = w * 3.2;
  const p1 = [x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5)], p2 = [x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5)];
  return `<line x1="${x1}" y1="${y1}" x2="${x2 - h * 0.6 * Math.cos(a)}" y2="${y2 - h * 0.6 * Math.sin(a)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>
  <polygon points="${x2},${y2} ${p1[0].toFixed(1)},${p1[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}" fill="${color}"/>`;
};

const svg = (w, h, defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs>${defs}</defs>${body}</svg>`;
const save = (name, s, w) => sharp(Buffer.from(s)).resize({ width: w }).png().toFile(path.join(OUT, name + ".png"));

const jobs = [];

// 1. Médaillon-titre : une personne frappée comme une effigie, avec rayons.
jobs.push(save("medaillon", svg(1000, 1000, glow("g") + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${rays(500, 500, 350, 470, 36, OR, 6, 0.55)}
   ${coin(500, 500, 330)}${person(500, 500, 330, "url(#m)", "c1")}`), 1000));

// 2. Le roi, « image » du dieu, puis tout être humain (Genèse 1.27).
jobs.push(save("deux-images", svg(1600, 800, glow("g") + metal("m"),
  `<circle cx="400" cy="400" r="400" fill="url(#g)"/><circle cx="1200" cy="400" r="400" fill="url(#g)"/>
   ${coin(400, 400, 320, { stroke: ASH })}${icon(gi.GiEgyptianProfile, 400 - 210, 400 - 210, 420, ASH)}
   ${coin(1200, 400, 320)}${person(1200, 400, 320, "url(#m)", "c2")}
   ${arrow(740, 400, 860, 400, OR_LT, 14)}`), 1400));

// 3. Livre ouvert et souffle (theopneustos).
const breath = [[-70, 0], [0, -25], [70, 0]].map(([dx, dy], i) =>
  `<path d="M ${500 + dx} ${560 + dy} C ${470 + dx} ${470 + dy}, ${560 + dx} ${420 + dy}, ${520 + dx} ${330 + dy} S ${540 + dx} ${230 + dy}, ${510 + dx} ${190 + dy}" fill="none" stroke="${i === 1 ? OR_LT : OR}" stroke-width="16" stroke-linecap="round" stroke-opacity="${i === 1 ? 1 : 0.7}"/>`).join("");
jobs.push(save("souffle", svg(1000, 1000, glow("g") + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${coin(500, 500, 400, { dots: false })}
   ${breath}${icon(gi.GiOpenBook, 280, 480, 440, "url(#m)")}`), 900));

// 4. « Faisons » : trois personnes, un seul Dieu, en communion.
const P = [[500, 250, "Père"], [280, 640, "Fils"], [720, 640, "Esprit"]];
let tri = "";
for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) if (i !== j) {
  const [x1, y1] = P[i], [x2, y2] = P[j], a = Math.atan2(y2 - y1, x2 - x1), off = 16;
  const ox = -Math.sin(a) * off, oy = Math.cos(a) * off;
  tri += arrow(x1 + 125 * Math.cos(a) + ox, y1 + 125 * Math.sin(a) + oy, x2 - 125 * Math.cos(a) + ox, y2 - 125 * Math.sin(a) + oy, OR, 9);
}
for (const [x, y, t] of P) tri += `<circle cx="${x}" cy="${y}" r="112" fill="${CARD}" stroke="${OR_LT}" stroke-width="10"/>
  <text x="${x}" y="${y + 17}" font-family="Calibri, Arial, sans-serif" font-weight="bold" font-size="50" fill="${INK}" text-anchor="middle">${t}</text>`;
jobs.push(save("trinite", svg(1000, 900, glow("g", 0.35),
  `<circle cx="500" cy="500" r="480" fill="url(#g)"/>${tri}
   <circle cx="500" cy="510" r="62" fill="${OR}"/><text x="500" y="526" font-family="Calibri, Arial, sans-serif" font-weight="bold" font-size="42" fill="#FFFFFF" text-anchor="middle">Dieu</text>`), 900));

// 5. Image ternie : pièce fêlée, ternie.
const crack = `<path d="M 470 140 L 520 300 L 455 390 L 560 520 L 490 620 L 540 860" fill="none" stroke="#0D0B0A" stroke-width="22" stroke-linejoin="round"/>
  <path d="M 520 300 L 640 330 M 560 520 L 690 500 M 455 390 L 340 430 M 490 620 L 380 700" fill="none" stroke="#0D0B0A" stroke-width="12" stroke-linejoin="round"/>`;
jobs.push(save("ternie", svg(1000, 1000, "",
  `<g opacity="0.85">${coin(500, 500, 400, { stroke: ASH })}${person(500, 500, 400, ASH, "c3")}</g>${crack}`), 800));

// 6. Image parfaite : couronne rayonnante (aucune représentation du visage de Christ).
jobs.push(save("parfaite", svg(1000, 1000, glow("g", 0.6) + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${rays(500, 500, 420, 495, 48, OR_LT, 7, 0.9)}
   ${coin(500, 500, 400, { stroke: OR_LT })}${icon(gi.GiCrown, 250, 230, 500, "url(#m)")}`), 800));

// 7. « Premier-né de beaucoup de frères » : le Fils au centre, ses frères autour.
let fr = "";
for (const [n, rr, s] of [[10, 300, 82], [16, 430, 70]]) for (let i = 0; i < n; i++) {
  const a = (i / n) * 2 * Math.PI + (n === 16 ? 0.2 : 0);
  fr += icon(fa.FaPerson, 600 + rr * Math.cos(a) - s / 2, 500 + rr * Math.sin(a) - s / 2, s, n === 10 ? OR_LT : OR);
}
jobs.push(save("freres", svg(1200, 1000, glow("g", 0.5) + metal("m"),
  `<circle cx="600" cy="500" r="500" fill="url(#g)"/>${fr}
   <circle cx="600" cy="500" r="175" fill="${CARD}" stroke="${OR_LT}" stroke-width="12"/>${icon(gi.GiCrown, 600 - 115, 500 - 125, 230, "url(#m)")}`), 900));

// 8. Le miroir : l'Écriture, où l'on contemple la gloire.
jobs.push(save("miroir", svg(900, 1100, glow("g", 0.5) + metal("m") +
  `<radialGradient id="verre" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#5A2A0E"/><stop offset="1" stop-color="#140E0B"/></radialGradient>`,
  `<circle cx="450" cy="400" r="440" fill="url(#g)"/>
   <path d="M 425 730 L 475 730 L 492 1000 Q 450 1060 408 1000 Z" fill="url(#m)"/>
   <circle cx="450" cy="1030" r="34" fill="url(#m)"/>
   <rect x="400" y="700" width="100" height="60" rx="18" fill="url(#m)"/>
   <ellipse cx="450" cy="390" rx="265" ry="345" fill="url(#m)"/>
   <ellipse cx="450" cy="390" rx="228" ry="306" fill="url(#verre)"/>
   ${rays(450, 330, 130, 215, 20, OR_LT, 6, 0.8)}
   ${icon(gi.GiOpenBook, 290, 250, 320, OR_LT)}
   <path d="M 290 230 Q 320 150 390 120" fill="none" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="16" stroke-linecap="round"/>`), 800));

// 9. De la pierre au cœur (Jérémie 31.33).
const heart = (cx, cy, s) => `M ${cx} ${cy + 330 * s} C ${cx - 250 * s} ${cy + 150 * s}, ${cx - 320 * s} ${cy + 10 * s}, ${cx - 240 * s} ${cy - 110 * s}
  C ${cx - 160 * s} ${cy - 220 * s}, ${cx - 40 * s} ${cy - 190 * s}, ${cx} ${cy - 110 * s} C ${cx + 40 * s} ${cy - 190 * s}, ${cx + 160 * s} ${cy - 220 * s}, ${cx + 240 * s} ${cy - 110 * s}
  C ${cx + 320 * s} ${cy + 10 * s}, ${cx + 250 * s} ${cy + 150 * s}, ${cx} ${cy + 330 * s} Z`;
let lines = "";
for (const [y, w] of [[-40, 300], [20, 360], [80, 320], [140, 230], [200, 130]]) lines += `<line x1="${1150 - w / 2}" y1="${400 + y}" x2="${1150 + w / 2}" y2="${400 + y}" stroke="#FFFFFF" stroke-opacity="0.75" stroke-width="14" stroke-linecap="round"/>`;
jobs.push(save("pierre-coeur", svg(1500, 800, glow("g", 0.45) + metal("m"),
  `<circle cx="1150" cy="420" r="420" fill="url(#g)"/>
   ${[40, 300].map(x => `<path d="M ${x} 670 L ${x} 270 A 120 120 0 0 1 ${x + 240} 270 L ${x + 240} 670 Z" fill="${ASH}"/>` +
     [0, 1, 2, 3, 4].map(k => `<line x1="${x + 45}" y1="${300 + k * 75}" x2="${x + 195}" y2="${300 + k * 75}" stroke="#3A2E26" stroke-width="16" stroke-linecap="round"/>`).join("")).join("")}
   ${arrow(620, 420, 820, 420, OR_LT, 18)}
   <path d="${heart(1150, 400, 1.05)}" fill="url(#m)"/>${lines}`), 1300));

// 10. Envoyés vers toutes les nations.
let out = "";
for (let i = 0; i < 8; i++) {
  const a = (i / 8) * 2 * Math.PI + Math.PI / 8;
  out += arrow(500 + 300 * Math.cos(a), 500 + 300 * Math.sin(a), 500 + 470 * Math.cos(a), 500 + 470 * Math.sin(a), OR_LT, 14);
}
jobs.push(save("nations", svg(1000, 1000, glow("g", 0.5) + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${out}
   <circle cx="500" cy="500" r="265" fill="${CARD}" stroke="${OR}" stroke-width="12"/>${icon(gi.GiEarthAmerica, 290, 290, 420, "url(#m)")}`), 900));

// Petites icônes pour les cartes.
const small = { cerveau: gi.GiBrain, balance: gi.GiScales, relation: gi.GiHearts, couronne: gi.GiCrown,
  croix: fa.FaCross, colombe: gi.GiDove, oeil: fa.FaEye, livre: gi.GiOpenBook, marche: fa.FaPersonWalking,
  eau: fa.FaDroplet, enseigner: fa.FaChalkboardUser, main: fa.FaHandHoldingHeart, enfant: fa.FaChild };
for (const [n, C] of Object.entries(small))
  jobs.push(save("i-" + n, svg(256, 256, "", icon(C, 16, 16, 224, OR_LT)), 256));
jobs.push(save("i-couple", svg(256, 256, "", icon(fa.FaPerson, -10, 16, 224, OR_LT) + icon(fa.FaPersonDress, 42, 16, 224, OR_LT)), 256));

// Fonds : lueur orange brûlé sur noir.
const bg = (name, cx, cy, r, op) => save(name, svg(1920, 1080,
  `<radialGradient id="b" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${OR}" stop-opacity="${op}"/><stop offset="1" stop-color="${OR}" stop-opacity="0"/></radialGradient>`,
  `<rect width="1920" height="1080" fill="#0D0B0A"/><rect width="1920" height="1080" fill="url(#b)"/>`), 1920);
jobs.push(bg("bg-titre", 1380, 540, 900, 0.32), bg("bg-conclusion", 960, 1150, 1100, 0.3));

Promise.all(jobs).then(() => console.log("ok", fs.readdirSync(OUT).length, "images"));

// Illustrations SVG -> PNG pour la présentation « Du ciel qui parle à la Parole qui suffit » (Psaume 19).
// Gabarit Black Dark Orange Brûlée : fond noir, orange brûlé, encre ivoire.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const gi = require("react-icons/gi");
const fa = require("react-icons/fa6");

const OUT = path.join(__dirname, "img");
fs.mkdirSync(OUT, { recursive: true });

const OR = "#CC5500", OR_LT = "#E8742A", OR_DK = "#7A3310", CARD = "#1A1411", INK = "#F4EDE4", ASH = "#6E5A4C", STONE = "#2A211B";

// Icône react-icons imbriquée dans une composition SVG.
function icon(Comp, x, y, size, color) {
  if (!Comp) throw new Error("icône absente");
  const m = renderToStaticMarkup(React.createElement(Comp));
  const vb = m.match(/viewBox="([^"]+)"/)[1];
  const inner = m.slice(m.indexOf(">") + 1, m.lastIndexOf("</svg>"));
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${vb}" fill="${color}" stroke="${color}" stroke-width="0">${inner}</svg>`;
}

const glow = (id, op = 0.45, color = OR) => `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">
  <stop offset="0" stop-color="${color}" stop-opacity="${op}"/><stop offset="0.55" stop-color="${color}" stop-opacity="${op / 5}"/>
  <stop offset="1" stop-color="${color}" stop-opacity="0"/></radialGradient>`;
const metal = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="${OR_LT}"/><stop offset="1" stop-color="#8E3A08"/></linearGradient>`;
const goldGrad = (id) => `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1">
  <stop offset="0" stop-color="#F2B544"/><stop offset="1" stop-color="#B87512"/></linearGradient>`;

// Médaillon : disque, grènetis, anneau intérieur.
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

function rays(cx, cy, r1, r2, n, color, width, op = 0.8, from = 0, to = 2 * Math.PI) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = from + (i / n) * (to - from), long = i % 2 === 0 ? r2 : r1 + (r2 - r1) * 0.55;
    s += `<line x1="${(cx + r1 * Math.cos(a)).toFixed(1)}" y1="${(cy + r1 * Math.sin(a)).toFixed(1)}" x2="${(cx + long * Math.cos(a)).toFixed(1)}" y2="${(cy + long * Math.sin(a)).toFixed(1)}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-opacity="${op}"/>`;
  }
  return s;
}

// Étoiles à quatre branches, positions pseudo-aléatoires mais reproductibles.
function rng(seed) { let x = seed; return () => (x = (x * 16807) % 2147483647) / 2147483647; }
// x, y, r numériques : une chaîne ferait concaténer « x + r » au lieu de l'additionner.
const star = (x, y, r, color, op) => `<path d="M ${x} ${y - r} L ${x + r * 0.28} ${y - r * 0.28} L ${x + r} ${y} L ${x + r * 0.28} ${y + r * 0.28} L ${x} ${y + r} L ${x - r * 0.28} ${y + r * 0.28} L ${x - r} ${y} L ${x - r * 0.28} ${y - r * 0.28} Z" fill="${color}" fill-opacity="${op}"/>`;
function stars(n, seed, inside, rmin, rmax, color = INK) {
  const r = rng(seed); let s = "", k = 0;
  while (k < n) {
    const x = r() * 2000, y = r() * 2000, rr = rmin + r() * (rmax - rmin);
    if (!inside(x, y)) continue;
    s += star(Math.round(x), Math.round(y), Math.round(rr * 10) / 10, color, (0.45 + r() * 0.55).toFixed(2)); k++;
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

// 1. Médaillon-titre : le ciel étoilé et le soleil au-dessus du livre ouvert.
const inDisc = (cx, cy, r) => (x, y) => (x - cx) ** 2 + (y - cy) ** 2 < r * r;
jobs.push(save("medaillon", svg(1000, 1000, glow("g") + metal("m") + `<clipPath id="c"><circle cx="500" cy="500" r="268"/></clipPath>`,
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${rays(500, 500, 350, 470, 36, OR, 6, 0.55)}
   ${coin(500, 500, 330)}
   <g clip-path="url(#c)">
     ${stars(34, 7, (x, y) => inDisc(500, 500, 260)(x, y) && y < 520 && (x - 610) ** 2 + (y - 360) ** 2 > 110 ** 2, 5, 13)}
     <circle cx="610" cy="360" r="48" fill="url(#m)"/>${rays(610, 360, 62, 92, 16, OR_LT, 6, 0.9)}
   </g>
   ${rays(500, 640, 150, 200, 14, OR_LT, 6, 0.7, Math.PI * 1.08, Math.PI * 1.92)}
   ${icon(gi.GiOpenBook, 345, 515, 310, "url(#m)")}`), 1000));

// 2. Livre ouvert et souffle (theopneustos), pour le Rappel.
const breath = [[-70, 0], [0, -25], [70, 0]].map(([dx, dy], i) =>
  `<path d="M ${500 + dx} ${560 + dy} C ${470 + dx} ${470 + dy}, ${560 + dx} ${420 + dy}, ${520 + dx} ${330 + dy} S ${540 + dx} ${230 + dy}, ${510 + dx} ${190 + dy}" fill="none" stroke="${i === 1 ? OR_LT : OR}" stroke-width="16" stroke-linecap="round" stroke-opacity="${i === 1 ? 1 : 0.7}"/>`).join("");
jobs.push(save("souffle", svg(1000, 1000, glow("g") + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${coin(500, 500, 400, { dots: false })}
   ${breath}${icon(gi.GiOpenBook, 280, 480, 440, "url(#m)")}`), 900));

// 3. Stèle de Hammurabi, stylisée : le roi devant le dieu-soleil, puis les lignes du code.
let cunei = "";
{
  const r = rng(11);
  for (let row = 0; row < 11; row++) {
    let x = 195;
    const y = 445 + row * 42;
    while (x < 505) {
      const w = 10 + r() * 26;
      cunei += `<path d="M ${x.toFixed(0)} ${y} L ${(x + w).toFixed(0)} ${y - 7} L ${(x + w).toFixed(0)} ${y + 7} Z" fill="${ASH}" fill-opacity="0.85"/>`;
      x += w + 9 + r() * 10;
    }
  }
}
jobs.push(save("stele", svg(700, 1000, glow("g", 0.25, ASH),
  `<ellipse cx="350" cy="520" rx="340" ry="480" fill="url(#g)"/>
   <path d="M 160 950 L 160 270 Q 160 70 350 70 Q 540 70 540 270 L 540 950 Z" fill="${STONE}" stroke="${ASH}" stroke-width="8"/>
   <circle cx="425" cy="215" r="44" fill="none" stroke="${ASH}" stroke-width="10"/>${rays(425, 215, 58, 92, 12, ASH, 7, 0.9)}
   <rect x="380" y="300" width="95" height="70" rx="8" fill="${ASH}" fill-opacity="0.7"/>
   ${icon(fa.FaPerson, 200, 190, 170, ASH)}
   <line x1="185" y1="395" x2="515" y2="395" stroke="${ASH}" stroke-width="6"/>${cunei}`), 600));

// 4. Psaume 19 : le soleil sous la tente que Dieu dresse, la loi au-dessus, entre les mains de l'Éternel.
jobs.push(save("tente-loi", svg(1000, 1000, glow("g", 0.5) + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${coin(500, 500, 420, { dots: false })}
   ${rays(500, 300, 150, 205, 18, OR_LT, 6, 0.75, Math.PI, 2 * Math.PI)}
   ${icon(gi.GiOpenBook, 365, 180, 270, "url(#m)")}
   <circle cx="500" cy="640" r="62" fill="${OR_LT}"/>${rays(500, 640, 78, 110, 14, OR_LT, 6, 0.8, Math.PI, 2 * Math.PI)}
   ${icon(gi.GiCampingTent, 355, 560, 290, "url(#m)")}`), 900));

// 5. Le ciel qui parle : la course du soleil, d'une extrémité des cieux à l'autre (19.5-7).
const P0 = [250, 690], P1 = [815, -350], P2 = [1380, 690];
const bez = (t) => [0, 1].map((k) => (1 - t) ** 2 * P0[k] + 2 * (1 - t) * t * P1[k] + t ** 2 * P2[k]);
const ghosts = [0.18, 0.34, 0.66, 0.82].map((t) => { const [x, y] = bez(t); return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="26" fill="${OR}" fill-opacity="${t < 0.5 ? 0.25 + t : 1.25 - t}"/>`; }).join("");
jobs.push(save("ciel", svg(1600, 900, glow("g", 0.55) + metal("m") +
  `<radialGradient id="sol" cx="50%" cy="100%" r="60%"><stop offset="0" stop-color="${OR}" stop-opacity="0.45"/><stop offset="1" stop-color="${OR}" stop-opacity="0"/></radialGradient>`,
  `${stars(70, 3, (x, y) => x > 40 && x < 1560 && y > 40 && y < 640 && (x - 815) ** 2 + (y - 170) ** 2 > 230 ** 2 && Math.abs(y - bez(Math.min(1, Math.max(0, (x - 250) / 1130)))[1]) > 40, 4, 12)}
   <ellipse cx="815" cy="700" rx="760" ry="230" fill="url(#sol)"/>
   <path d="M ${P0[0]} ${P0[1]} Q ${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]}" fill="none" stroke="${OR}" stroke-width="7" stroke-dasharray="4 26" stroke-linecap="round"/>
   ${ghosts}
   <circle cx="815" cy="170" r="210" fill="url(#g)"/>
   <circle cx="815" cy="170" r="72" fill="url(#m)"/>${rays(815, 170, 92, 150, 24, OR_LT, 8, 0.95)}
   <line x1="70" y1="700" x2="1530" y2="700" stroke="${OR_DK}" stroke-width="6" stroke-linecap="round"/>
   ${icon(gi.GiCampingTent, 120, 520, 200, "url(#m)")}`), 1600));

// 6. La balance : l'or et le miel ne pèsent pas autant que la Parole (19.11).
const th = (9 * Math.PI) / 180, piv = [600, 250], L = 390;
const le = [piv[0] - L * Math.cos(th), piv[1] - L * Math.sin(th)], re = [piv[0] + L * Math.cos(th), piv[1] + L * Math.sin(th)];
const pan = (cx, cy) => `<line x1="${cx - 150}" y1="${cy}" x2="${cx}" y2="${cy - 250}" stroke="${OR}" stroke-width="5"/>
  <line x1="${cx + 150}" y1="${cy}" x2="${cx}" y2="${cy - 250}" stroke="${OR}" stroke-width="5"/>
  <path d="M ${cx - 165} ${cy} L ${cx + 165} ${cy} Q ${cx + 140} ${cy + 70} ${cx} ${cy + 72} Q ${cx - 140} ${cy + 70} ${cx - 165} ${cy} Z" fill="url(#m)"/>`;
const lp = [le[0], le[1] + 250], rp = [re[0], re[1] + 250];
jobs.push(save("balance", svg(1200, 1000, glow("g", 0.5) + metal("m") + goldGrad("or"),
  `<circle cx="${rp[0]}" cy="${rp[1] - 110}" r="260" fill="url(#g)"/>
   <rect x="585" y="250" width="30" height="630" rx="10" fill="url(#m)"/>
   <path d="M 430 940 L 770 940 L 700 875 L 500 875 Z" fill="url(#m)"/>
   <line x1="${le[0]}" y1="${le[1]}" x2="${re[0]}" y2="${re[1]}" stroke="url(#m)" stroke-width="24" stroke-linecap="round"/>
   <circle cx="600" cy="250" r="30" fill="${CARD}" stroke="${OR_LT}" stroke-width="8"/>
   ${pan(lp[0], lp[1])}${pan(rp[0], rp[1])}
   ${icon(gi.GiGoldBar, lp[0] - 150, lp[1] - 150, 170, "url(#or)")}
   ${icon(gi.GiHoneycomb, lp[0] + 15, lp[1] - 120, 125, "#E8A33A")}
   ${rays(rp[0], rp[1] - 120, 140, 185, 16, OR_LT, 6, 0.8, Math.PI * 1.05, Math.PI * 1.95)}
   ${icon(gi.GiOpenBook, rp[0] - 125, rp[1] - 235, 250, "url(#m)")}`), 1100));

// 7. L'autel : les paroles de la bouche et les sentiments du cœur offerts comme un sacrifice (19.15).
let pierres = "";
[[630, [300, 420, 560]], [705, [250, 390, 530, 650]], [780, [300, 440, 580]], [855, [250, 380, 520, 650]]].forEach(([y, xs]) =>
  xs.forEach((x, i) => { pierres += `<rect x="${x}" y="${y}" width="${i === xs.length - 1 && xs.length === 4 ? 100 : 128}" height="66" rx="18" fill="${i % 2 ? "#3A2E26" : STONE}" stroke="${ASH}" stroke-width="5"/>`; }));
const heart = (cx, cy, s) => `M ${cx} ${cy + 330 * s} C ${cx - 250 * s} ${cy + 150 * s}, ${cx - 320 * s} ${cy + 10 * s}, ${cx - 240 * s} ${cy - 110 * s}
  C ${cx - 160 * s} ${cy - 220 * s}, ${cx - 40 * s} ${cy - 190 * s}, ${cx} ${cy - 110 * s} C ${cx + 40 * s} ${cy - 190 * s}, ${cx + 160 * s} ${cy - 220 * s}, ${cx + 240 * s} ${cy - 110 * s}
  C ${cx + 320 * s} ${cy + 10 * s}, ${cx + 250 * s} ${cy + 150 * s}, ${cx} ${cy + 330 * s} Z`;
const fumee = (x) => `<path d="M ${x} 440 C ${x - 40} 390, ${x + 40} 350, ${x} 300 S ${x + 30} 230, ${x} 200" fill="none" stroke="${OR}" stroke-width="10" stroke-linecap="round" stroke-opacity="0.6"/>`;
jobs.push(save("autel", svg(1000, 1000, glow("g", 0.55) + metal("m"),
  `<circle cx="500" cy="470" r="470" fill="url(#g)"/>${pierres}
   ${icon(gi.GiFire, 375, 390, 250, "url(#m)")}
   ${fumee(410)}${fumee(590)}
   <path d="${heart(370, 170, 0.33)}" fill="url(#m)"/>
   ${icon(fa.FaCommentDots, 555, 70, 150, OR_LT)}`), 900));

// 8. La Parole au centre : livre rayonnant.
jobs.push(save("livre", svg(1000, 1000, glow("g", 0.6) + metal("m"),
  `<circle cx="500" cy="500" r="500" fill="url(#g)"/>${rays(500, 500, 420, 495, 48, OR_LT, 7, 0.9)}
   ${coin(500, 500, 400, { stroke: OR_LT })}${icon(gi.GiOpenBook, 260, 260, 480, "url(#m)")}`), 800));

// Petites icônes : orange pour la Parole, cendre pour ce qui en tient lieu.
const small = {
  soleil: gi.GiSun, etoiles: gi.GiStarsStack, livre: gi.GiOpenBook, tente: gi.GiCampingTent, or: gi.GiGoldBar, miel: gi.GiHoneycomb,
  coeur: fa.FaHeart, croix: fa.FaCross, oeilbarre: fa.FaEyeSlash, cible: fa.FaBullseye, porte: fa.FaPersonWalkingArrowRight,
  flamme: gi.GiFire, rocher: gi.GiStoneBlock, // GiRock est un poing fermé : contresens colombe: gi.GiDove, loupe: fa.FaMagnifyingGlass, chaine: fa.FaLink,
  parchemin: gi.GiScrollUnfurled, ampoule: fa.FaLightbulb, oeil: fa.FaEye, infini: fa.FaInfinity, balance: fa.FaScaleBalanced,
  joie: gi.GiSparkles, avert: fa.FaTriangleExclamation, drapeau: fa.FaFlagCheckered, poids: fa.FaWeightHanging, globe: fa.FaEarthAmericas,
  mains: fa.FaHandsPraying, boussole: fa.FaCompass, plume: fa.FaFeather, jour: fa.FaCircleHalfStroke,
};
const dim = { gestion: fa.FaChartLine, divertissement: fa.FaMasksTheater, mysticisme: gi.GiCrystalBall, psychologie: fa.FaBrain,
  visualisation: gi.GiThirdEye, confession: fa.FaBullhorn };
for (const [n, C] of Object.entries(small)) jobs.push(save("i-" + n, svg(256, 256, "", icon(C, 16, 16, 224, OR_LT)), 256));
for (const [n, C] of Object.entries(dim)) jobs.push(save("d-" + n, svg(256, 256, "", icon(C, 16, 16, 224, "#A89A8C")), 256));

// Fonds : lueur orange brûlé sur noir.
const bg = (name, cx, cy, r, op) => save(name, svg(1920, 1080,
  `<radialGradient id="b" cx="${cx}" cy="${cy}" r="${r}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${OR}" stop-opacity="${op}"/><stop offset="1" stop-color="${OR}" stop-opacity="0"/></radialGradient>`,
  `<rect width="1920" height="1080" fill="#0D0B0A"/><rect width="1920" height="1080" fill="url(#b)"/>`), 1920);
jobs.push(bg("bg-titre", 1380, 540, 900, 0.32), bg("bg-conclusion", 960, 1150, 1100, 0.3));

Promise.all(jobs).then(() => console.log("ok", fs.readdirSync(OUT).length, "images"));

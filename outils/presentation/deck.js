// Présentation du Psaume 94 : « Jusqu'à quand? Le Dieu qui voit, qui instruit et qui rendra ».
// Thème noir et orange brûlé, schémas en formes natives (modifiables dans PowerPoint).
// Usage : node outils/presentation/deck.js   →   Presentation-Psaume-94.pptx à la racine du dépôt.
// Contenu : Plan-Predication-Psaume-94.md et Recherche-MacArthur-Psaume-94.json (versets NEG79).
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));

const SORTIE = path.join(__dirname, "..", "..", "Presentation-Psaume-94.pptx");
const THEME = {
  name: "Noir et orange brûlé",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "0E0D0C", lt1: "F5EFE6", dk2: "1F1C1A", lt2: "A69C91",
    accent1: "CC5500", accent2: "E8833A", accent3: "8A3A0E", accent4: "2C2724",
    accent5: "F4B783", accent6: "5C534C", hlink: "E8833A", folHlink: "A69C91",
  },
};

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13,333 × 7,5 po
pres.author = "André-Guy Bruneau";
pres.title = "Psaume 94 : Jusqu'à quand? Le Dieu qui voit, qui instruit et qui rendra";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const S = pres.shapes;
const NOIR = C.text1, FOND2 = C.text2, CLAIR = C.background1, GRIS = C.background2;
const ORANGE = C.accent1, AMBRE = C.accent2, ROUILLE = C.accent3, CARTE = C.accent4, PECHE = C.accent5, TRAIT = C.accent6;
const PIED = "Psaume 94 · Jusqu'à quand? Le Dieu qui voit, qui instruit et qui rendra";
const COUL = [ORANGE, AMBRE, ROUILLE, PECHE]; // les quatre points
const SUR = [NOIR, NOIR, CLAIR, NOIR]; // couleur du texte posé sur chaque point

// --- Dispositions (layouts) ---

pres.defineSlideMaster({
  title: "TITRE",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.3, w: 6.8, h: 1.9, fontFace: "Cambria", fontSize: 56, bold: true, color: CLAIR, align: "left", valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.4, w: 6.4, h: 1.2, fontFace: "Cambria", fontSize: 26, color: AMBRE, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.8, y: 4.6, w: 6.4, h: 0.5, fontSize: 14, color: GRIS, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "SECTION",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.0, w: 3, h: 1.1, fontFace: "Cambria", fontSize: 66, bold: true, color: ORANGE, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 7.0, h: 1.6, fontFace: "Cambria", fontSize: 40, bold: true, color: CLAIR, align: "left", valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.0, w: 7.0, h: 1.6, fontFace: "Cambria", fontSize: 22, italic: true, color: CLAIR, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "ref", type: "body", x: 0.8, y: 5.85, w: 7.0, h: 0.45, fontSize: 16, color: AMBRE, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENU",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.35, w: 11, h: 0.35, fontSize: 13, bold: true, color: AMBRE, charSpacing: 1, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.72, w: 12.1, h: 0.8, fontFace: "Cambria", fontSize: 30, bold: true, color: CLAIR, align: "left", valign: "middle", margin: 0 }, text: "" } },
    { text: { text: PIED, options: { x: 0.6, y: 7.0, w: 9, h: 0.3, fontSize: 10, color: GRIS, margin: 0 } } },
  ],
  slideNumber: { x: 12.1, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: GRIS, align: "right" },
});

pres.defineSlideMaster({
  title: "CITATION",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "body", type: "body", x: 1.2, y: 1.0, w: 10.9, h: 3.1, fontFace: "Cambria", fontSize: 36, italic: true, color: CLAIR, align: "center", valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "ref", type: "body", x: 1.2, y: 4.2, w: 10.9, h: 0.5, fontSize: 18, color: AMBRE, align: "center", margin: 0 }, text: "" } },
  ],
});

// --- Éléments réutilisés ---

function carte(s, x, y, w, h, nom, couleur = FOND2, ligne) {
  s.addShape(S.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: couleur }, line: ligne || { type: "none" }, objectName: nom });
}

function texte(s, t, o) {
  s.addText(t, { isTextBox: true, margin: 0, color: CLAIR, fontSize: 16, valign: "top", ...o });
}

// Pastille numérotée : le disque orange du motif, en petit.
function pastille(s, n, x, y, d = 0.55, couleur = ORANGE, texteCouleur = NOIR) {
  s.addText(String(n), { shape: S.OVAL, x, y, w: d, h: d, fill: { color: couleur }, line: { type: "none" }, color: texteCouleur, bold: true, fontSize: 16, align: "center", valign: "middle", margin: 0, objectName: "Pastille " + n });
}

// Étiquette arrondie portant un texte.
function etiquette(s, t, x, y, w, h, o = {}) {
  s.addText(t, { shape: S.ROUNDED_RECTANGLE, x, y, w, h, rectRadius: o.rayon ?? 0.08, fill: { color: o.fond || CARTE }, line: o.ligne || { type: "none" }, color: o.couleur || CLAIR, fontSize: o.taille || 15, bold: o.gras, italic: o.italique, fontFace: o.police, align: o.align || "center", valign: "middle", margin: o.marge ?? 0.12, objectName: o.nom || "Étiquette" });
}

// Trait ou flèche d'un point à un autre.
function trait(s, x1, y1, x2, y2, o = {}) {
  s.addShape(S.LINE, {
    x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.abs(x2 - x1), h: Math.abs(y2 - y1), flipH: x2 < x1, flipV: y2 < y1,
    line: { color: o.couleur || ORANGE, width: o.largeur || 2.25, dashType: o.tirets, endArrowType: o.fleche === false ? undefined : "triangle" },
    objectName: o.nom || "Flèche",
  });
}

// Courbe ouverte (arc de liaison) : de (x1,y) à (x2,y), le point de contrôle à cy.
function arc(s, x1, x2, y, cy, o = {}) {
  const h = Math.abs(cy - y) + 0.2, haut = cy < y;
  const ymin = haut ? cy - 0.0 : y - 0.0;
  const top = Math.min(cy, y);
  s.addShape(S.CUSTOM_GEOMETRY, {
    x: x1, y: top, w: x2 - x1, h: Math.max(Math.abs(cy - y), 0.2), fill: { type: "none" },
    line: { color: o.couleur || AMBRE, width: o.largeur || 2, dashType: o.tirets, endArrowType: o.fleche === false ? undefined : "triangle" },
    points: [
      { x: 0, y: y - top },
      { x: x2 - x1, y: y - top, curve: { type: "quadratic", x1: (x2 - x1) / 2, y1: cy - top } },
    ],
    objectName: o.nom || "Arc",
  });
}

function coche(s, x, y, d, nom = "Coche") {
  s.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: ORANGE }, line: { type: "none" }, objectName: nom + " disque" });
  s.addShape(S.CUSTOM_GEOMETRY, { x: x + d * 0.2, y: y + d * 0.25, w: d * 0.6, h: d * 0.5, fill: { type: "none" }, line: { color: NOIR, width: 3 },
    points: [{ x: 0, y: d * 0.28 }, { x: d * 0.2, y: d * 0.48 }, { x: d * 0.6, y: 0 }], objectName: nom + " trait" });
}

function croix(s, x, y, d, nom = "Croix") {
  s.addShape(S.OVAL, { x, y, w: d, h: d, fill: { color: ROUILLE }, line: { type: "none" }, objectName: nom + " disque" });
  trait(s, x + d * 0.3, y + d * 0.3, x + d * 0.7, y + d * 0.7, { couleur: CLAIR, largeur: 3, fleche: false, nom: nom + " a" });
  trait(s, x + d * 0.7, y + d * 0.3, x + d * 0.3, y + d * 0.7, { couleur: CLAIR, largeur: 3, fleche: false, nom: nom + " b" });
}

// Motif : l'œil (amande, iris, pupille, reflet) : « Celui qui a formé l'œil ne verrait-il pas? ».
function oeil(s, cx, cy, w, nom, anneaux = false) {
  const h = w * 0.5, x = cx - w / 2, y = cy - h / 2;
  if (anneaux) {
    s.addShape(S.OVAL, { x: cx - w * 0.78, y: cy - h * 1.2, w: w * 1.56, h: h * 2.4, line: { color: TRAIT, width: 1 }, objectName: nom + " anneau externe" });
    s.addShape(S.OVAL, { x: cx - w * 0.64, y: cy - h * 0.98, w: w * 1.28, h: h * 1.96, line: { color: ROUILLE, width: 1.5 }, objectName: nom + " anneau" });
  }
  s.addShape(S.CUSTOM_GEOMETRY, { x, y, w, h, fill: { color: NOIR }, line: { color: ORANGE, width: 2.5 },
    points: [{ x: 0, y: h / 2 }, { x: w, y: h / 2, curve: { type: "quadratic", x1: w / 2, y1: -h / 2 } }, { x: 0, y: h / 2, curve: { type: "quadratic", x1: w / 2, y1: 1.5 * h } }, { close: true }],
    objectName: nom + " contour" });
  const di = h * 0.8, dp = h * 0.36;
  s.addShape(S.OVAL, { x: cx - di / 2, y: cy - di / 2, w: di, h: di, fill: { color: ORANGE }, line: { color: ROUILLE, width: 1.5 }, objectName: nom + " iris" });
  s.addShape(S.OVAL, { x: cx - dp / 2, y: cy - dp / 2, w: dp, h: dp, fill: { color: NOIR }, line: { type: "none" }, objectName: nom + " pupille" });
  s.addShape(S.OVAL, { x: cx + dp * 0.15, y: cy - dp * 0.45, w: dp * 0.28, h: dp * 0.28, fill: { color: CLAIR }, line: { type: "none" }, objectName: nom + " reflet" });
}

// Livre ouvert : deux pages arrondies et une reliure.
function livre(s, x, y, w, nom) {
  const h = w * 0.62;
  s.addShape(S.ROUNDED_RECTANGLE, { x, y, w: w / 2 - 0.03, h, rectRadius: 0.05, fill: { color: CLAIR }, line: { type: "none" }, objectName: nom + " page gauche" });
  s.addShape(S.ROUNDED_RECTANGLE, { x: x + w / 2 + 0.03, y, w: w / 2 - 0.03, h, rectRadius: 0.05, fill: { color: CLAIR }, line: { type: "none" }, objectName: nom + " page droite" });
  for (let i = 1; i <= 3; i++) {
    const ly = y + (h * i) / 4.2;
    s.addShape(S.LINE, { x: x + w * 0.07, y: ly, w: w * 0.34, h: 0, line: { color: TRAIT, width: 1 }, objectName: nom + " ligne g" + i });
    s.addShape(S.LINE, { x: x + w * 0.59, y: ly, w: w * 0.34, h: 0, line: { color: TRAIT, width: 1 }, objectName: nom + " ligne d" + i });
  }
  s.addShape(S.RECTANGLE, { x: x + w / 2 - 0.03, y: y - 0.04, w: 0.06, h: h + 0.08, fill: { color: ORANGE }, line: { type: "none" }, objectName: nom + " reliure" });
}

// Balance : mât, fléau, deux plateaux. w = largeur du fléau, y = haut du mât.
function balance(s, cx, y, w, nom) {
  const h = w * 0.9, pan = y + h * 0.46;
  s.addShape(S.RECTANGLE, { x: cx - 0.06, y, w: 0.12, h: h * 0.82, fill: { color: CLAIR }, line: { type: "none" }, objectName: nom + " mât" });
  s.addShape(S.TRAPEZOID, { x: cx - w * 0.2, y: y + h * 0.82, w: w * 0.4, h: 0.26, fill: { color: ORANGE }, line: { type: "none" }, objectName: nom + " socle" });
  s.addShape(S.LINE, { x: cx - w / 2, y, w, h: 0, line: { color: CLAIR, width: 5 }, objectName: nom + " fléau" });
  [-1, 1].forEach((sg) => {
    const ex = cx + (sg * w) / 2, bw = w * 0.4;
    trait(s, ex, y, ex - w * 0.17, pan, { couleur: TRAIT, largeur: 1.5, fleche: false, nom: nom + " chaîne" });
    trait(s, ex, y, ex + w * 0.17, pan, { couleur: TRAIT, largeur: 1.5, fleche: false, nom: nom + " chaîne" });
    s.addShape(S.CUSTOM_GEOMETRY, { x: ex - bw / 2, y: pan, w: bw, h: 0.42, fill: { color: ORANGE }, line: { type: "none" },
      points: [{ x: 0, y: 0 }, { x: bw, y: 0 }, { x: 0, y: 0, curve: { type: "quadratic", x1: bw / 2, y1: 0.84 } }, { close: true }], objectName: nom + " plateau" });
  });
  s.addShape(S.OVAL, { x: cx - 0.15, y: y - 0.15, w: 0.3, h: 0.3, fill: { color: ORANGE }, line: { color: CLAIR, width: 1 }, objectName: nom + " pivot" });
}

// Rocher : deux triangles superposés.
function rocher(s, cx, base, w, nom) {
  s.addShape(S.ISOSCELES_TRIANGLE, { x: cx - w * 0.5, y: base - w * 0.62, w: w * 0.7, h: w * 0.62, fill: { color: ROUILLE }, line: { type: "none" }, objectName: nom + " grand" });
  s.addShape(S.ISOSCELES_TRIANGLE, { x: cx - w * 0.05, y: base - w * 0.42, w: w * 0.55, h: w * 0.42, fill: { color: ORANGE }, line: { type: "none" }, objectName: nom + " petit" });
}

// Silhouette : tête et buste.
function personne(s, cx, y, h, couleur, nom) {
  const d = h * 0.34;
  s.addShape(S.OVAL, { x: cx - d / 2, y, w: d, h: d, fill: { color: couleur }, line: { type: "none" }, objectName: nom + " tête" });
  s.addShape(S.ROUND_2_SAME_RECTANGLE, { x: cx - h * 0.3, y: y + d + 0.06, w: h * 0.6, h: h - d - 0.06, fill: { color: couleur }, line: { type: "none" }, objectName: nom + " buste" });
}

// Typographie : espace insécable dans les guillemets et devant le deux-points (pas de « » orphelin).
const insecable = (t) => t.replace(/« /g, "« ").replace(/ »/g, " »").replace(/ :/g, " :");
const typo = (t) => (typeof t === "string" ? insecable(t) : t.map((r) => ({ ...r, text: insecable(r.text) })));

function nouvelle(section, layout) {
  const slide = pres.addSlide({ masterName: layout, sectionTitle: section });
  const addText = slide.addText.bind(slide);
  slide.addText = (t, o) => addText(typo(t), o);
  return slide;
}

const SEC_I = "I. Le Dieu à qui l'on crie", SEC_II = "II. Le Dieu qui voit", SEC_III = "III. Le Dieu qui instruit dans l'attente", SEC_IV = "IV. Le Dieu qui soutient et qui rendra";

// --- 1. Titre ---

pres.addSection({ title: "Introduction" });
let s = nouvelle("Introduction", "TITRE");
oeil(s, 10.3, 3.75, 3.5, "Œil", true);
s.addText("Jusqu'à quand?", { placeholder: "title" });
s.addText("Le Dieu qui voit, qui instruit et qui rendra", { placeholder: "body" });
s.addText("Psaume 94 · André-Guy Bruneau · Prédication expositive · NEG79", { placeholder: "meta" });
s.addNotes("Lecture publique du Psaume 94 en entier avant l'introduction (environ 2 min), avec une courte pause avant les versets 8, 12 et 16. Durée visée : 42 minutes. Phrase à faire retenir : Dieu voit, Dieu instruit, Dieu rendra. Les gloses de BDB citées sont traduites de l'anglais.");

// --- 2. Quatre mouvements ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Lecture du Psaume 94", { placeholder: "kicker" });
s.addText("Un psaume, quatre mouvements", { placeholder: "title" });
const cw = 12.13 / 23, sy = 2.55, sh = 0.55;
const bornes = [[1, 7], [8, 11], [12, 15], [16, 23]];
for (let v = 1; v <= 23; v++) {
  const m = bornes.findIndex(([a, b]) => v >= a && v <= b);
  s.addText(String(v), { shape: S.RECTANGLE, x: 0.6 + (v - 1) * cw, y: sy, w: cw - 0.03, h: sh, fill: { color: COUL[m] }, line: { type: "none" }, color: SUR[m], fontSize: 14, bold: true, align: "center", valign: "middle", margin: 0, objectName: "Verset " + v });
}
bornes.forEach(([a, b], m) => {
  s.addShape(S.LINE, { x: 0.6 + (a - 1) * cw, y: sy + sh + 0.1, w: (b - a + 1) * cw - 0.03, h: 0, line: { color: COUL[m], width: 4 }, objectName: "Bande " + (m + 1) });
});
arc(s, 0.6 + 1.5 * cw, 0.6 + 22.5 * cw, sy - 0.1, 1.55, { nom: "Inclusion 94.2 et 94.23", tirets: "dash" });
texte(s, "« Rends » (94.2)  →  « Il fera retomber » (94.23)", { x: 4.4, y: 2.13, w: 4.9, h: 0.32, fontSize: 14, color: AMBRE, align: "center", bold: true });
texte(s, "« ton peuple » (94.5)", { x: 0.6 + 4.5 * cw - 1.1, y: 3.32, w: 2.2, h: 0.3, fontSize: 13, color: AMBRE, align: "center" });
texte(s, "« pour moi » (94.16)", { x: 0.6 + 15.5 * cw - 1.1, y: 3.32, w: 2.2, h: 0.3, fontSize: 13, color: AMBRE, align: "center" });
const quatre = [
  ["94.1-7", "Le Dieu à qui l'on crie", "La plainte portée au juge de la terre"],
  ["94.8-11", "Le Dieu qui voit", "Celui qui a formé l'œil voit et connaît"],
  ["94.12-15", "Le Dieu qui instruit dans l'attente", "Sa loi et le calme, jusqu'à la fosse"],
  ["94.16-23", "Le Dieu qui soutient et qui rendra", "Son secours aujourd'hui, son verdict à la fin"],
];
quatre.forEach(([ref, titre, desc], i) => {
  const x = 0.6 + i * 3.095;
  carte(s, x, 3.85, 2.845, 2.8, "Mouvement " + (i + 1));
  pastille(s, i + 1, x + 0.25, 4.05, 0.55, COUL[i], SUR[i]);
  texte(s, ref, { x: x + 0.95, y: 4.12, w: 1.7, h: 0.4, fontSize: 15, bold: true, color: AMBRE, valign: "middle" });
  texte(s, titre, { x: x + 0.25, y: 4.8, w: 2.4, h: 0.95, fontFace: "Cambria", fontSize: 19, bold: true });
  texte(s, desc, { x: x + 0.25, y: 5.8, w: 2.4, h: 0.75, fontSize: 14, color: PECHE });
});
s.addNotes("Une complainte : collective d'abord (« ton peuple », 94.5), personnelle ensuite (« pour moi », 94.16). Le même verbe hébreu, šûb, ouvre et ferme le psaume : « Rends » (hāšēb, 94.2), « Il fera retomber » (wayyāšeb, 94.23). Les quatre mouvements du sermon : le Dieu à qui l'on crie, qui voit, qui instruit dans l'attente, qui soutient et qui rendra. Genre : complainte traversée de sagesse; prière imprécatoire.");

// --- 3. Accroche ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Introduction · 94.1", { placeholder: "kicker" });
s.addText("Peu d'assemblées osent prier ainsi", { placeholder: "title" });
carte(s, 0.6, 1.8, 6.2, 4.85, "Cri du verset 1");
texte(s, "« Dieu des vengeances, Eternel! Dieu des vengeances, parais! »", { x: 0.95, y: 2.1, w: 5.5, h: 2.3, fontFace: "Cambria", fontSize: 32, italic: true, valign: "middle" });
texte(s, "Psaume 94.1", { x: 0.95, y: 4.45, w: 5.5, h: 0.4, fontSize: 18, bold: true, color: AMBRE });
oeil(s, 3.7, 5.7, 1.9, "Œil accroche");
texte(s, "Dans la louange du Temple", { x: 7.2, y: 1.8, w: 5.53, h: 0.5, fontFace: "Cambria", fontSize: 22, bold: true, color: AMBRE });
carte(s, 7.2, 2.4, 5.53, 1.75, "Troisième jour");
texte(s, "3e jour · Psaume 82", { x: 7.45, y: 2.55, w: 5.0, h: 0.35, fontSize: 17, bold: true, color: AMBRE });
texte(s, "« Jusqu'à quand jugerez-vous avec iniquité, Et aurez-vous égard à la personne des méchants? » (82.2)", { x: 7.45, y: 2.95, w: 5.0, h: 1.1, fontSize: 15, italic: true });
s.addShape(S.DOWN_ARROW, { x: 9.7, y: 4.22, w: 0.55, h: 0.45, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Flèche des jours" });
carte(s, 7.2, 4.75, 5.53, 1.2, "Quatrième jour", ROUILLE);
texte(s, "4e jour · Psaume 94", { x: 7.45, y: 4.88, w: 5.0, h: 0.35, fontSize: 17, bold: true, color: PECHE });
texte(s, "le psaume qui commence par « Dieu des vengeances »", { x: 7.45, y: 5.3, w: 5.0, h: 0.5, fontSize: 15, italic: true });
texte(s, "Selon la Mishna (Tamid 7.4), du moins à l'époque qu'elle décrit.", { x: 7.2, y: 6.1, w: 5.53, h: 0.55, fontSize: 13, italic: true, color: GRIS });
s.addNotes("« Dieu des vengeances, Eternel! Dieu des vengeances, parais! » (94.1). Peu d'assemblées osent prier ainsi. Pourtant, selon la Mishna (traité Tamid 7.4), on récitait au Temple le troisième jour le Psaume 82, où Dieu reprend ceux qui jugent, et le quatrième, le psaume qui commence par « Dieu des vengeances ». Réserve à garder : du moins à l'époque que décrit la Mishna. La Septante porte aussi un titre : « pour le quatrième jour de la semaine »; l'hébreu n'en a pas.");

// --- 4. Où va votre plainte ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Introduction", { placeholder: "kicker" });
s.addText("Quand le mal triomphe, où va votre plainte?", { placeholder: "title" });
etiquette(s, "Le mal triomphe", 0.6, 3.5, 2.7, 1.1, { fond: ROUILLE, taille: 22, gras: true, police: "Cambria", nom: "Racine" });
const voies = [
  ["Vers l'amertume", "« Jusqu'à quand » dit à Dieu, non à la rancune"],
  ["Vers la revanche", "La vengeance appartient à Dieu (Deutéronome 32.35)"],
  ["Vers le doute qui conclut « L'Eternel ne regarde pas »", "C'est le credo des méchants (94.7)"],
  ["Vers Dieu lui-même", "Le chemin du psaume : « ô Eternel! » (94.3)"],
];
voies.forEach(([voie, issue], i) => {
  const y = 1.85 + i * 1.2, dernier = i === 3;
  trait(s, 3.3, 4.05, 4.1, y + 0.47, { couleur: dernier ? ORANGE : TRAIT, nom: "Voie " + (i + 1) });
  etiquette(s, voie, 4.1, y, 4.4, 0.95, { fond: dernier ? ORANGE : CARTE, ligne: dernier ? undefined : { color: TRAIT, width: 1 }, couleur: dernier ? NOIR : CLAIR, taille: 17, gras: true, nom: "Destination " + (i + 1) });
  texte(s, issue, { x: 8.8, y, w: 3.93, h: 0.95, fontSize: 15, valign: "middle", bold: dernier, color: dernier ? AMBRE : CLAIR });
});
s.addNotes("Pensez à une injustice réelle : une veuve dépouillée par ceux qui devaient la protéger, un employé écarté pour avoir refusé de mentir (situations types, sans désigner personne). Quand le mal triomphe, où va votre plainte : vers l'amertume, vers la revanche, vers le doute qui conclut « L'Eternel ne regarde pas » (94.7), ou vers Dieu lui-même? La note d'introduction de MacArthur nomme le souci du psaume : « le constat que les méchants prospèrent et que les justes sont opprimés, avec l'impression désagréable que Dieu se désintéresse de tout cela ».");

// --- 5. Plan de MacArthur et plan du sermon ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Le plan", { placeholder: "kicker" });
s.addText("Cinq temps de MacArthur, quatre points", { placeholder: "title" });
texte(s, "La note de La Bible d'étude MacArthur", { x: 0.6, y: 1.72, w: 8, h: 0.3, fontSize: 14, bold: true, color: GRIS });
const cinq = [["94.1-2", "Appel lancé à Dieu"], ["94.3-7", "Arrogance des méchants"], ["94.8-11", "Avertissement aux insensés"], ["94.12-15", "Assurance des justes"], ["94.16-23", "Défense des justes par Dieu"]];
const bw5 = 2.33, g5 = 0.12;
cinq.forEach(([ref, t], i) => {
  const x = 0.6 + i * (bw5 + g5);
  carte(s, x, 2.08, bw5, 1.2, "Temps " + (i + 1), CARTE, { color: TRAIT, width: 1 });
  texte(s, ref, { x: x + 0.15, y: 2.18, w: bw5 - 0.3, h: 0.3, fontSize: 14, bold: true, color: AMBRE });
  texte(s, t, { x: x + 0.15, y: 2.5, w: bw5 - 0.3, h: 0.7, fontSize: 15 });
});
const pts = [[0, "I · Le Dieu à qui l'on crie", "94.1-7", 4.78], [2, "II · Le Dieu qui voit", "94.8-11", 2.33], [3, "III · Le Dieu qui instruit dans l'attente", "94.12-15", 2.33], [4, "IV · Le Dieu qui soutient et qui rendra", "94.16-23", 2.33]];
const x2 = [0.6, 0.6 + 4.78 + g5, 0.6 + 4.78 + g5 + 2.45, 0.6 + 4.78 + g5 + 4.9];
const haut = [[0, 1], [2], [3], [4]];
pts.forEach(([, t, ref, w], i) => {
  haut[i].forEach((k) => trait(s, 0.6 + k * (bw5 + g5) + bw5 / 2, 3.3, x2[i] + w / 2 + (haut[i].length === 2 ? (k === 0 ? -0.6 : 0.6) : 0), 4.4, { couleur: COUL[i], largeur: 2, nom: "Lien " + (i + 1) + "-" + k }));
});
texte(s, "Les points de la prédication", { x: 0.6, y: 6.02, w: 8, h: 0.28, fontSize: 14, bold: true, color: GRIS });
pts.forEach(([, t, ref, w], i) => {
  s.addText([{ text: t, options: { bold: true, fontFace: "Cambria", fontSize: 17, breakLine: true } }, { text: ref, options: { fontSize: 15, bold: true } }], { shape: S.ROUNDED_RECTANGLE, x: x2[i], y: 4.45, w, h: 1.55, rectRadius: 0.08, fill: { color: COUL[i] }, line: { type: "none" }, color: SUR[i], align: "left", valign: "middle", margin: 0.15, objectName: "Point " + (i + 1) });
});
texte(s, "Seule la fusion des deux premiers temps sépare le plan du sermon de celui de la note.", { x: 0.6, y: 6.4, w: 12.1, h: 0.4, fontSize: 16, italic: true, color: PECHE, align: "center" });
s.addNotes("La note de MacArthur découpe le psaume en cinq temps : appel lancé à Dieu (94.1-2), arrogance des méchants (94.3-7), avertissement aux insensés (94.8-11), assurance des justes (94.12-15), défense des justes par Dieu (94.16-23). Le sermon réunit les deux premiers. Source : La Sainte Bible avec commentaires de John MacArthur (Société Biblique de Genève, 2006). La note couvre les versets 1, 7, 11, 12, 14, 17, 18, 20 et 23; les autres versets se prêchent au texte seul, et le plan le signale.");

// --- 6. Section I ---

pres.addSection({ title: SEC_I });
s = nouvelle(SEC_I, "SECTION");
balance(s, 10.6, 2.45, 3.2, "Balance section I");
s.addText("I", { placeholder: "kicker" });
s.addText("Le Dieu à qui l'on crie", { placeholder: "title" });
s.addText("La foi ne tait pas l'injustice; elle la remet au juge.", { placeholder: "body" });
s.addText("Psaume 94.1-7 · 8 min", { placeholder: "ref" });
s.addNotes("Premier point : la plainte portée au juge. Le psalmiste ne se fait pas justice et ne se tait pas.");

// --- 7. Quelle vengeance ---

s = nouvelle(SEC_I, "CONTENU");
s.addText("I · Le Dieu à qui l'on crie · 94.1-2", { placeholder: "kicker" });
s.addText("Quelle vengeance?", { placeholder: "title" });
carte(s, 0.6, 1.85, 3.0, 3.35, "Pas ceci");
croix(s, 0.85, 2.05, 0.6, "Refus");
texte(s, "Pas ceci", { x: 1.6, y: 2.1, w: 1.9, h: 0.5, fontSize: 18, bold: true, color: AMBRE, valign: "middle" });
texte(s, "Une agressivité incontrôlée", { x: 0.85, y: 2.95, w: 2.5, h: 1.2, fontFace: "Cambria", fontSize: 22, bold: true });
texte(s, "La vengeance du psaume n'est pas un emportement.", { x: 0.85, y: 4.2, w: 2.5, h: 0.9, fontSize: 14, color: GRIS });
balance(s, 6.67, 2.2, 3.2, "Balance");
texte(s, "Infractions contre la loi divine", { x: 3.7, y: 5.25, w: 2.3, h: 0.7, fontSize: 14, bold: true, align: "center", color: AMBRE });
texte(s, "Juste rétribution", { x: 7.35, y: 5.25, w: 2.3, h: 0.7, fontSize: 14, bold: true, align: "center", color: AMBRE });
carte(s, 9.75, 1.85, 2.98, 3.35, "Mais ceci", ROUILLE);
coche(s, 10.0, 2.05, 0.6, "Accord");
texte(s, "Mais ceci", { x: 10.75, y: 2.1, w: 1.8, h: 0.5, fontSize: 18, bold: true, color: PECHE, valign: "middle" });
texte(s, "« une juste rétribution appliquée en proportion des infractions commises contre la loi divine »", { x: 10.0, y: 2.9, w: 2.5, h: 2.2, fontFace: "Cambria", fontSize: 16, italic: true });
texte(s, "MacArthur, note sur 94.1", { x: 10.0, y: 4.8, w: 2.5, h: 0.3, fontSize: 12, color: PECHE });
carte(s, 0.6, 6.05, 12.13, 0.72, "Appuis du texte");
texte(s, "Le texte appuie : « juge de la terre » et « selon leurs œuvres » (94.2); à la fin, c'est « leur iniquité » qui retombe (94.23). La proportion va au-delà du lexique : décision d'interprétation.", { x: 0.85, y: 6.1, w: 11.65, h: 0.62, fontSize: 14, valign: "middle" });
s.addNotes("MacArthur (note sur 94.1) : la vengeance divine « ne se manifeste pas par une agressivité incontrôlée, mais par une juste rétribution appliquée en proportion des infractions commises contre la loi divine ». Le lexique dit « vengeance » (BDB : la vengeance de Dieu, premier sens); la proportion et la référence à la loi divine vont au-delà du lexique : c'est une décision d'interprétation, que le texte appuie. BDB relève le pluriel nĕqāmôt sans en commenter la valeur : ne pas bâtir sur le pluriel.");

// --- 8. Trois impératifs ---

s = nouvelle(SEC_I, "CONTENU");
s.addText("I · Le Dieu à qui l'on crie · 94.1-2", { placeholder: "kicker" });
s.addText("Trois impératifs adressés à Dieu", { placeholder: "title" });
const imper = [
  ["Parais", "hôpîaʿ", "« Pt-ê. s'agit-il ici d'une demande de théophanie (cf. 50.2; 80.2) » Au Psaume 80.2 : « Parais dans ta splendeur ».", 2.3],
  ["Lève-toi", "hinnāśēʾ", "Le Dieu des vengeances est le « juge de la terre » (94.2). Texte seul.", 2.65],
  ["Rends", "hāšēb", "« aux orgueilleux selon leurs œuvres! » La réponse viendra au verset 23. Texte seul.", 3.0],
];
imper.forEach(([verbe, heb, det, h], i) => {
  const x = 0.6 + i * 4.1, top = 4.9 - h;
  carte(s, x, top, 3.93, h, "Marche " + (i + 1), i === 2 ? ROUILLE : FOND2);
  pastille(s, i + 1, x + 0.25, top + 0.2);
  texte(s, verbe, { x: x + 1.0, y: top + 0.2, w: 2.8, h: 0.55, fontFace: "Cambria", fontSize: 28, bold: true, valign: "middle" });
  texte(s, heb, { x: x + 0.25, y: top + 0.9, w: 3.4, h: 0.3, fontSize: 14, italic: true, color: AMBRE });
  texte(s, det, { x: x + 0.25, y: top + 1.28, w: 3.45, h: h - 1.35, fontSize: 15 });
});
carte(s, 0.6, 5.15, 12.13, 1.6, "Droit réservé");
etiquette(s, "Me faire justice moi-même", 0.9, 5.45, 3.0, 0.75, { fond: NOIR, ligne: { color: TRAIT, width: 1 }, taille: 15, nom: "Refus" });
croix(s, 4.0, 5.5, 0.65, "Refus 1");
etiquette(s, "Remettre la cause au juge", 4.95, 5.45, 3.3, 0.75, { fond: ORANGE, couleur: NOIR, taille: 15, gras: true, nom: "Voie du psaume" });
coche(s, 8.35, 5.5, 0.65, "Voie 1");
texte(s, "« A moi la vengeance et la rétribution, Quand leur pied chancellera! »", { x: 9.2, y: 5.3, w: 3.35, h: 0.95, fontSize: 15, italic: true });
texte(s, "Deutéronome 32.35", { x: 9.2, y: 6.28, w: 3.35, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
texte(s, "Il ne réclame pas un droit qu'il exercerait lui-même : il demande à l'Éternel d'exercer celui qu'il s'est réservé.", { x: 0.9, y: 6.28, w: 8.0, h: 0.4, fontSize: 13, color: GRIS });
s.addNotes("Un nom dit deux fois, « Dieu des vengeances », puis trois impératifs adressés à Dieu : « parais », « Lève-toi », « Rends ». Pour « parais », la note de MacArthur avance avec prudence « Pt-ê. s'agit-il ici d'une demande de théophanie (cf. 50.2; 80.2) » : garder cette prudence. Le même verbe (yāpaʿ) a Dieu pour sujet aux Psaumes 50.2 (au parfait) et 80.2 (à l'impératif, la demande la plus proche). Le psalmiste ne réclame pas un droit qu'il exercerait lui-même; il demande à l'Éternel d'exercer celui qu'il s'est réservé (Deutéronome 32.35).");

// --- 9. Jusqu'à quand : les victimes ---

s = nouvelle(SEC_I, "CONTENU");
s.addText("I · Le Dieu à qui l'on crie · 94.3-6 · texte seul", { placeholder: "kicker" });
s.addText("« Jusqu'à quand » : ceux que la loi protégeait", { placeholder: "title" });
carte(s, 0.6, 1.75, 12.13, 0.8, "Question du verset 3");
texte(s, "« Jusqu'à quand les méchants, ô Eternel! Jusqu'à quand les méchants triompheront-ils? » (94.3)", { x: 0.85, y: 1.75, w: 11.6, h: 0.8, fontFace: "Cambria", fontSize: 20, italic: true, align: "center", valign: "middle" });
etiquette(s, "Les méchants : « ils parlent avec arrogance » (94.4)", 0.6, 2.8, 6.5, 0.6, { fond: ROUILLE, taille: 16, gras: true, nom: "Les méchants" });
const vict = [["la veuve", 1.85], ["l'étranger", 3.85], ["les orphelins", 5.85]];
vict.forEach(([nom, cx]) => {
  s.addShape(S.DOWN_ARROW, { x: cx - 0.22, y: 3.5, w: 0.44, h: 0.6, fill: { color: ROUILLE }, line: { type: "none" }, objectName: "Écrasement " + nom });
  personne(s, cx, 4.2, 1.3, GRIS, "Victime " + nom);
  texte(s, nom, { x: cx - 0.95, y: 5.58, w: 1.9, h: 0.35, fontSize: 15, bold: true, align: "center" });
});
s.addShape(S.LINE, { x: 0.9, y: 6.08, w: 6.0, h: 0, line: { color: AMBRE, width: 2 }, objectName: "Accolade ton peuple" });
texte(s, "« ils écrasent ton peuple, Ils oppriment ton héritage » (94.5) : le psalmiste dit « ton ».", { x: 0.6, y: 6.18, w: 6.5, h: 0.55, fontSize: 14, color: AMBRE, align: "center" });
carte(s, 7.45, 2.8, 5.28, 3.95, "La garde de l'Éternel");
texte(s, "La loi les plaçait sous la garde de l'Éternel", { x: 7.75, y: 3.0, w: 4.7, h: 0.75, fontFace: "Cambria", fontSize: 19, bold: true, color: AMBRE });
[["« Tu ne maltraiteras point l'étranger »", "Exode 22.21"], ["« Tu n'affligeras point la veuve, ni l'orphelin »", "Exode 22.22"], ["avec la promesse : « j'entendrai leurs cris »", "Exode 22.23"]].forEach(([q, ref], i) => {
  const y = 3.85 + i * 0.95;
  texte(s, q, { x: 7.75, y, w: 4.7, h: 0.6, fontSize: 16, italic: true });
  texte(s, ref, { x: 7.75, y: y + 0.55, w: 4.7, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
});
s.addNotes("Les méchants se reconnaissent à leur bouche (94.4), puis à leurs actes : « ils écrasent ton peuple, Ils oppriment ton héritage » (94.5). Le psalmiste dit « ton » : ce qu'on écrase appartient à Dieu. « Ils égorgent la veuve et l'étranger, Ils assassinent les orphelins » (94.6) : les trois que la loi plaçait sous la garde de l'Éternel (Exode 22.21-23). La question « Jusqu'à quand » est adressée à l'Éternel : elle est déjà dans la Bible.");

// --- 10. Le credo des méchants ---

s = nouvelle(SEC_I, "CONTENU");
s.addText("I · Le Dieu à qui l'on crie · 94.7", { placeholder: "kicker" });
s.addText("Dit de Dieu, ou dit à Dieu", { placeholder: "title" });
[[0.6, "Les méchants le disent DE Dieu", ROUILLE], [6.83, "Le psalmiste le dit À Dieu", ORANGE]].forEach(([x, titre, coul], i) => {
  carte(s, x, 1.8, 5.9, 3.5, "Voie " + (i + 1));
  texte(s, titre, { x: x + 0.3, y: 1.95, w: 5.3, h: 0.5, fontFace: "Cambria", fontSize: 21, bold: true, color: AMBRE });
  personne(s, x + 0.85, 2.75, 1.4, i === 0 ? GRIS : CLAIR, "Personnage " + (i + 1));
  s.addShape(S.ISOSCELES_TRIANGLE, { x: x + 1.55, y: 3.2, w: 0.3, h: 0.35, rotate: 270, fill: { color: coul }, line: { type: "none" }, objectName: "Pointe de bulle " + (i + 1) });
  etiquette(s, i === 0 ? "« Et ils disent: L'Eternel ne regarde pas, Le Dieu de Jacob ne fait pas attention! » (94.7)" : "« Jusqu'à quand les méchants, ô Eternel! » (94.3)  « Eternel! ils écrasent ton peuple » (94.5)", x + 1.85, 2.65, 3.85, 1.6, { fond: coul, couleur: i === 0 ? CLAIR : NOIR, taille: 15, italique: true, align: "left", rayon: 0.12, nom: "Bulle " + (i + 1) });
  etiquette(s, i === 0 ? "Conclusion : ils peuvent tout" : "Sa plainte reste une prière", x + 0.3, 4.5, 5.3, 0.55, { fond: NOIR, ligne: { color: coul === ORANGE ? ORANGE : TRAIT, width: 1.25 }, taille: 16, gras: true, nom: "Issue " + (i + 1) });
});
carte(s, 0.6, 5.55, 7.5, 1.2, "Note sur 94.7");
texte(s, "« Attitude caractéristique d'un homme qui refuse de dépendre de Dieu ou ne croit pas en son existence »", { x: 0.85, y: 5.62, w: 7.0, h: 0.75, fontFace: "Cambria", fontSize: 16, italic: true });
texte(s, "MacArthur, note sur 94.7", { x: 0.85, y: 6.4, w: 7.0, h: 0.3, fontSize: 12, color: GRIS });
carte(s, 8.33, 5.55, 4.4, 1.2, "Principe", ROUILLE);
texte(s, [{ text: "Principe", options: { bold: true, color: PECHE, breakLine: true } }, { text: "la plainte est permise; la rétribution appartient au juge." }], { x: 8.58, y: 5.62, w: 3.9, h: 1.05, fontSize: 15, valign: "middle" });
s.addNotes("« Et ils disent: L'Eternel ne regarde pas, Le Dieu de Jacob ne fait pas attention! » (94.7). MacArthur : « Attitude caractéristique d'un homme qui refuse de dépendre de Dieu ou ne croit pas en son existence » (note sur 94.7, qui renvoie à une note sur 59.8, non fournie). Dire cela, c'est nier la promesse même de la loi : « j'entendrai leurs cris ». Le psalmiste aussi éprouve le silence de Dieu, mais il le dit À Dieu (« ô Eternel! », 94.3); les méchants le disent DE Dieu, et en concluent qu'ils peuvent tout. « Ne fait pas attention » traduit « il ne discerne pas » (lōʾ yābîn). Application : « Jusqu'à quand » n'est pas un manque de foi; les martyrs le redisent (Apocalypse 6.10). Ce n'est pas la maîtrise de soi qui retient la main du croyant, c'est l'assurance, que l'Esprit affermit en celui qui est uni à Christ, que la cause est entre les mains du juge.");

// --- 11. Section II ---

pres.addSection({ title: SEC_II });
s = nouvelle(SEC_II, "SECTION");
oeil(s, 10.4, 3.5, 3.6, "Œil section II", true);
s.addText("II", { placeholder: "kicker" });
s.addText("Le Dieu qui voit", { placeholder: "title" });
s.addText("Ce n'est pas Dieu qui ne discerne pas; c'est l'insensé.", { placeholder: "body" });
s.addText("Psaume 94.8-11 · 7 min", { placeholder: "ref" });
s.addNotes("Deuxième point : le psalmiste se tourne vers les insensés et leur renvoie leur mot.");

// --- 12. Le mot retourné ---

s = nouvelle(SEC_II, "CONTENU");
s.addText("II · Le Dieu qui voit · 94.8 · texte seul", { placeholder: "kicker" });
s.addText("Le psalmiste renvoie aux insensés leur mot", { placeholder: "title" });
[
  ["94.7 · le credo", "« ne fait pas attention »", "lōʾ yābîn : « il ne discerne pas »", "94.8 · la réplique", "« Prenez-y garde »", "bînû : « discernez »"],
  ["94.3 · la plainte à Dieu", "« Jusqu'à quand »", "ʿad-mātay, dit deux fois", "94.8 · la question aux insensés", "« quand serez-vous sages? »", "mātay : le même « quand »"],
].forEach(([e1, t1, h1, e2, t2, h2], i) => {
  const y = 1.85 + i * 1.95;
  carte(s, 0.6, y, 5.3, 1.7, "Source " + (i + 1));
  texte(s, e1, { x: 0.85, y: y + 0.15, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
  texte(s, t1, { x: 0.85, y: y + 0.5, w: 4.8, h: 0.55, fontFace: "Cambria", fontSize: 22, bold: true });
  texte(s, h1, { x: 0.85, y: y + 1.12, w: 4.8, h: 0.4, fontSize: 15, italic: true, color: PECHE });
  trait(s, 6.0, y + 0.85, 7.3, y + 0.85, { nom: "Renvoi " + (i + 1) });
  texte(s, "renvoyé", { x: 5.95, y: y + 0.5, w: 1.4, h: 0.3, fontSize: 14, italic: true, color: AMBRE, align: "center" });
  carte(s, 7.4, y, 5.33, 1.7, "Réplique " + (i + 1), ROUILLE);
  texte(s, e2, { x: 7.65, y: y + 0.15, w: 4.8, h: 0.3, fontSize: 13, bold: true, color: PECHE });
  texte(s, t2, { x: 7.65, y: y + 0.5, w: 4.8, h: 0.55, fontFace: "Cambria", fontSize: 22, bold: true });
  texte(s, h2, { x: 7.65, y: y + 1.12, w: 4.8, h: 0.4, fontSize: 15, italic: true, color: PECHE });
});
etiquette(s, "bōʿărîm, « hommes stupides » : un participe, en parallèle avec « insensés » (BDB)", 0.6, 5.85, 5.95, 0.75, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 14, nom: "Participe" });
etiquette(s, "bāʿām, « parmi le peuple » : l'insensé n'est pas forcément au loin", 6.78, 5.85, 5.95, 0.75, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 14, nom: "Parmi le peuple" });
texte(s, "Reprise de mātay et nature de bōʿărîm : observations de Kidner, vérifiées au texte hébreu.", { x: 0.6, y: 6.68, w: 12.13, h: 0.28, fontSize: 12, italic: true, color: GRIS });
s.addNotes("Le français cache un mot-crochet : « ne fait pas attention » (94.7) est lōʾ yābîn, « il ne discerne pas »; « Prenez-y garde » (94.8) est bînû, « discernez ». Ils disaient que Dieu ne discerne pas; c'est à eux de discerner. Le « quand » (mātay) reprend l'interrogatif du verset 3 : le « jusqu'à quand » adressé à Dieu devient un « quand » adressé aux insensés (observation de Kidner, vérifiée au texte hébreu). « Hommes stupides » (bōʿărîm) est un participe, que BDB rattache au verbe « être stupide, obtus, réfractaire » (trad.), en parallèle avec « insensés » (kĕsîlîm). L'hébreu les interpelle « parmi le peuple » (bāʿām; Darby : « les stupides d'entre le peuple ») : le texte l'appuie sans le trancher. Préparer une phrase simple, sans cours d'hébreu.");

// --- 13. L'argument du Créateur ---

s = nouvelle(SEC_II, "CONTENU");
s.addText("II · Le Dieu qui voit · 94.9-10 · texte seul", { placeholder: "kicker" });
s.addText("L'argument du Créateur", { placeholder: "title" });
[
  ["Celui qui a planté l'oreille", "nōṭaʿ", "n'entendrait-il pas?", "94.9"],
  ["Celui qui a formé l'œil", "yōṣēr", "ne verrait-il pas?", "94.9"],
  ["Celui qui châtie les nations", "yōsēr", "ne punirait-il point?", "94.10"],
  ["Lui qui donne à l'homme l'intelligence", "mĕlammēd : celui qui enseigne", "reviendra au verset 12", "94.10"],
].forEach(([q, heb, r, ref], i) => {
  const y = 1.8 + i * 0.97, dernier = i === 3;
  carte(s, 0.6, y, 6.6, 0.82, "Question " + (i + 1), dernier ? CARTE : FOND2, dernier ? { color: TRAIT, width: 1, dashType: "dash" } : undefined);
  s.addText([{ text: q + "   ", options: { bold: true, fontSize: 18, color: CLAIR } }, { text: heb, options: { italic: true, fontSize: 14, color: AMBRE } }], { isTextBox: true, x: 0.85, y, w: 6.2, h: 0.82, valign: "middle", margin: 0 });
  trait(s, 7.3, y + 0.41, 8.1, y + 0.41, { tirets: dernier ? "dash" : undefined, nom: "Conséquence " + (i + 1) });
  etiquette(s, r, 8.2, y, 4.53, 0.82, { fond: dernier ? CARTE : ORANGE, ligne: dernier ? { color: TRAIT, width: 1, dashType: "dash" } : undefined, couleur: dernier ? CLAIR : NOIR, taille: 18, gras: true, nom: "Réponse " + (i + 1) });
  texte(s, ref, { x: 11.75, y: y + 0.04, w: 0.9, h: 0.25, fontSize: 12, bold: true, color: dernier ? AMBRE : NOIR, align: "right" });
});
oeil(s, 1.85, 6.15, 2.0, "Œil créateur");
texte(s, "Ce n'est pas Dieu qui ne discerne pas; c'est l'insensé.", { x: 3.3, y: 5.75, w: 9.4, h: 0.55, fontFace: "Cambria", fontSize: 24, italic: true, bold: true });
texte(s, "Le texte réfute le credo par la création avant la menace.", { x: 3.3, y: 6.35, w: 9.4, h: 0.35, fontSize: 15, color: AMBRE });
s.addNotes("« Celui qui a planté l'oreille n'entendrait-il pas? Celui qui a formé l'œil ne verrait-il pas? » (94.9) : deux images pour une même vérité; les questions (hă-, « ne… pas? ») attendent un oui. Dieu est nommé par ce qu'il fait : celui qui plante (nōṭaʿ), qui forme (yōṣēr), qui discipline (yōsēr), qui enseigne (mĕlammēd). « Celui qui châtie les nations ne punirait-il point, Lui qui donne à l'homme l'intelligence? » (94.10). Le second membre du verset 10 n'a pas de verbe principal en hébreu : la NEG79 et la NBS le rattachent au premier. Retenir les deux verbes, discipliner et enseigner : ils reviennent au verset 12.");

// --- 14. Les pensées ---

s = nouvelle(SEC_II, "CONTENU");
s.addText("II · Le Dieu qui voit · 94.11", { placeholder: "kicker" });
s.addText("Il connaît les pensées de l'homme", { placeholder: "title" });
carte(s, 0.6, 1.8, 5.9, 2.9, "Pensées de Dieu");
texte(s, "Les pensées de Dieu", { x: 0.9, y: 1.95, w: 5.3, h: 0.5, fontFace: "Cambria", fontSize: 21, bold: true, color: AMBRE });
s.addShape(S.ROUNDED_RECTANGLE, { x: 1.0, y: 2.6, w: 0.95, h: 1.85, rectRadius: 0.1, fill: { color: ROUILLE }, line: { type: "none" }, objectName: "Abîme" });
s.addShape(S.DOWN_ARROW, { x: 1.2, y: 2.8, w: 0.55, h: 1.4, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Profondeur" });
texte(s, "« Que tes pensées sont profondes! »", { x: 2.25, y: 2.65, w: 4.0, h: 1.0, fontFace: "Cambria", fontSize: 21, italic: true });
texte(s, "Psaume 92.6", { x: 2.25, y: 3.7, w: 4.0, h: 0.3, fontSize: 14, bold: true, color: AMBRE });
carte(s, 6.83, 1.8, 5.9, 2.9, "Pensées de l'homme");
texte(s, "Les pensées de l'homme", { x: 7.13, y: 1.95, w: 5.3, h: 0.5, fontFace: "Cambria", fontSize: 21, bold: true, color: AMBRE });
s.addShape(S.CLOUD, { x: 7.1, y: 2.6, w: 1.9, h: 1.2, fill: { color: TRAIT }, line: { type: "none" }, objectName: "Vapeur" });
texte(s, "hebel : « vanité » (BDB)", { x: 7.0, y: 3.85, w: 2.2, h: 0.5, fontSize: 13, italic: true, color: GRIS, align: "center" });
texte(s, "« Il sait qu'elles sont vaines. »", { x: 9.3, y: 2.65, w: 3.2, h: 1.0, fontFace: "Cambria", fontSize: 21, italic: true });
texte(s, "Psaume 94.11", { x: 9.3, y: 3.7, w: 3.2, h: 0.3, fontSize: 14, bold: true, color: AMBRE });
etiquette(s, "même mot hébreu : maḥăšābāh", 4.85, 4.45, 3.63, 0.55, { fond: ORANGE, couleur: NOIR, taille: 15, gras: true, rayon: 0.3, nom: "Même mot" });
[
  ["La note de MacArthur", "« Les projets conçus par l'esprit des méchants ne sont que vanité »", CARTE],
  ["Décision d'interprétation", "BDB range le mot sous « pensée, de l'homme »; la note y lit les méchants, et le contexte l'appuie (94.8-10).", CARTE],
  ["Paul, d'après la Septante", "« Le Seigneur connaît les pensées des sages, Il sait qu'elles sont vaines » (1 Corinthiens 3.20)", ROUILLE],
].forEach(([t, d, f], i) => {
  const x = 0.6 + i * 4.1;
  carte(s, x, 5.3, 3.93, 1.5, "Appui " + (i + 1), f, f === CARTE ? { color: TRAIT, width: 1 } : undefined);
  texte(s, t, { x: x + 0.2, y: 5.38, w: 3.55, h: 0.3, fontSize: 14, bold: true, color: i === 2 ? PECHE : AMBRE });
  texte(s, d, { x: x + 0.2, y: 5.72, w: 3.55, h: 1.05, fontSize: 14, italic: i !== 1 });
});
s.addNotes("« L'Eternel connaît les pensées de l'homme, Il sait qu'elles sont vaines » (94.11). MacArthur (note sur 94.11, avec renvoi à 92.6 et 1 Corinthiens 3.20) : « Les projets conçus par l'esprit des méchants ne sont que vanité ». La note va au-delà du lexique, qui range maḥăšābāh sous « pensée, de l'homme » et non sous « dessein », et au-delà du texte, qui dit « l'homme » : décision d'interprétation, que le contexte appuie, puisque les versets 8 à 10 s'adressent aux insensés. Contraste : le même mot dit les pensées de Dieu au Psaume 92.6 (« Que tes pensées sont profondes! »); celles de l'homme sont une vapeur (hebel, que BDB range sous « vanité »). Paul cite le verset d'après la Septante, « des sages » au lieu de « des hommes », et l'applique à la sagesse de ce monde (1 Corinthiens 3.19-20). Application : le Créateur voit tout, et la même vérité qui avertit l'insensé console le juste.");

// --- 15. Section III ---

pres.addSection({ title: SEC_III });
s = nouvelle(SEC_III, "SECTION");
livre(s, 8.9, 2.7, 3.6, "Livre section III");
s.addText("III", { placeholder: "kicker" });
s.addText("Le Dieu qui instruit dans l'attente", { placeholder: "title" });
s.addText("Dieu ne donne pas toujours la date; il donne sa loi et le calme.", { placeholder: "body" });
s.addText("Psaume 94.12-15 · 10 min", { placeholder: "ref" });
s.addNotes("Troisième point : la béatitude de l'homme que Dieu instruit, le calme, et les deux « car ». C'est le point le plus long : il porte le verset-clé de la recherche (94.12-13).");

// --- 16. Heureux ---

s = nouvelle(SEC_III, "CONTENU");
s.addText("III · Le Dieu qui instruit dans l'attente · 94.12", { placeholder: "kicker" });
s.addText("Heureux l'homme que Dieu forme", { placeholder: "title" });
carte(s, 0.6, 1.8, 5.7, 2.55, "Verset 12");
texte(s, "« Heureux l'homme que tu châties, ô Eternel! Et que tu instruis par ta loi, »", { x: 0.9, y: 1.95, w: 5.1, h: 1.9, fontFace: "Cambria", fontSize: 25, italic: true, valign: "middle" });
texte(s, "Psaume 94.12 · ʾašrê : « ô bonheur de… » (BDB)", { x: 0.9, y: 3.9, w: 5.1, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
carte(s, 6.53, 1.8, 6.2, 2.55, "Note de MacArthur", ROUILLE);
texte(s, "La note de MacArthur", { x: 6.83, y: 1.92, w: 5.6, h: 0.3, fontSize: 14, bold: true, color: PECHE });
texte(s, "« Etre «heureux» signifie être sage et prospère dans la vie, grâce à l'instruction reçue de Dieu (cf. 84.6, 13) »", { x: 6.83, y: 2.3, w: 5.6, h: 1.9, fontFace: "Cambria", fontSize: 20, italic: true });
etiquette(s, "« Sage » répond à l'apostrophe du verset 8 : « Insensés, quand serez-vous sages? »", 0.6, 4.55, 5.95, 0.95, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 14, nom: "Sage" });
etiquette(s, "« Prospère » va au-delà du lexique et du verset : on garde l'accent du verset, l'instruction « par ta loi ».", 6.78, 4.55, 5.95, 0.95, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 14, nom: "Prospère" });
texte(s, "yāsar : « châtie », sur l'échelle de BDB", { x: 0.6, y: 5.68, w: 6, h: 0.3, fontSize: 13, bold: true, color: GRIS });
etiquette(s, "discipliner, corriger (formation morale)", 0.6, 6.2, 6.5, 0.5, { fond: ORANGE, couleur: NOIR, taille: 14, gras: true, rayon: 0.05, nom: "Sens 1" });
etiquette(s, "plus sévèrement, châtier", 7.15, 6.2, 5.58, 0.5, { fond: ROUILLE, taille: 14, rayon: 0.05, nom: "Sens 2" });
s.addShape(S.ISOSCELES_TRIANGLE, { x: 3.65, y: 5.95, w: 0.4, h: 0.24, flipV: true, fill: { color: CLAIR }, line: { type: "none" }, objectName: "Repère 94.12" });
texte(s, "Psaume 94.12", { x: 4.15, y: 5.92, w: 2.5, h: 0.28, fontSize: 13, bold: true, color: CLAIR });
s.addNotes("« Heureux l'homme que tu châties, ô Eternel! Et que tu instruis par ta loi » (94.12). La béatitude s'adresse à Dieu : « tu châties », « tu instruis ». Les deux verbes du verset 10 reviennent : celui qui discipline les nations forme les siens. MacArthur : « Etre «heureux» signifie être sage et prospère dans la vie, grâce à l'instruction reçue de Dieu (cf. 84.6, 13) ». « Sage » répond au verset 8. « Prospère » va au-delà du lexique et du verset : ne pas en faire une promesse de réussite, le verset 13 situe ce bonheur « aux jours du malheur ». La note ne commente pas « châties » : au lexique seul, BDB range le verset sous « discipliner, corriger », non sous le sens plus sévère. L'épître aux Hébreux, qui cite Proverbes 3 et non le psaume, emploie le verbe grec de la Septante du verset 12 : « Car le Seigneur châtie celui qu'il aime » (12.6).");

// --- 17. Oppression et discipline ---

s = nouvelle(SEC_III, "CONTENU");
s.addText("III · Le Dieu qui instruit dans l'attente · 94.10-12", { placeholder: "kicker" });
s.addText("L'oppression n'est pas la discipline", { placeholder: "title" });
[[0.6, "yāsar", "« Celui qui châtie les nations »", "« l'homme que tu châties »"], [6.78, "lāmad", "« Lui qui donne à l'homme l'intelligence »", "« que tu instruis par ta loi »"]].forEach(([x, mot, a, b], i) => {
  carte(s, x, 1.75, 5.95, 1.25, "Écho " + (i + 1));
  texte(s, mot, { x: x + 0.2, y: 1.82, w: 1.2, h: 0.3, fontSize: 13, italic: true, bold: true, color: AMBRE });
  etiquette(s, a + "  94.10", x + 0.2, 2.15, 2.6, 0.7, { fond: NOIR, ligne: { color: TRAIT, width: 1 }, taille: 12, italique: true, marge: 0.06, nom: "Verset 10 " + mot });
  trait(s, x + 2.85, 2.5, x + 3.2, 2.5, { nom: "Écho " + mot });
  etiquette(s, b + "  94.12", x + 3.25, 2.15, 2.55, 0.7, { fond: ORANGE, couleur: NOIR, taille: 12, italique: true, gras: true, marge: 0.06, nom: "Verset 12 " + mot });
});
personne(s, 6.67, 3.55, 1.75, CLAIR, "Le croyant");
s.addShape(S.LINE, { x: 3.6, y: 5.35, w: 6.15, h: 0, line: { color: TRAIT, width: 2 }, objectName: "Sol" });
texte(s, "le croyant, aux jours du malheur (94.13)", { x: 3.6, y: 5.4, w: 6.15, h: 0.3, fontSize: 13, align: "center", color: GRIS });
etiquette(s, "Les méchants : « ils écrasent ton peuple » (94.5)", 0.6, 3.75, 3.5, 1.1, { fond: ROUILLE, taille: 15, gras: true, nom: "Oppression" });
trait(s, 4.2, 4.3, 5.75, 4.3, { couleur: ROUILLE, largeur: 3.5, nom: "Pression" });
etiquette(s, "L'Éternel : « tu instruis par ta loi » (94.12)", 9.23, 3.75, 3.5, 1.1, { fond: ORANGE, couleur: NOIR, taille: 15, gras: true, nom: "Discipline" });
trait(s, 9.13, 4.3, 7.6, 4.3, { couleur: ORANGE, largeur: 3.5, nom: "Instruction" });
carte(s, 0.6, 5.95, 12.13, 0.85, "Phrase clé", FOND2);
texte(s, "L'oppression n'est pas la discipline; mais dans les jours de l'oppression, Dieu instruit.", { x: 0.85, y: 5.95, w: 11.65, h: 0.85, fontFace: "Cambria", fontSize: 23, italic: true, bold: true, align: "center", valign: "middle" });
s.addNotes("Les deux verbes reviennent du verset 10 au verset 12 : celui qui discipline les nations et donne à l'homme l'intelligence forme les siens. Le texte relie et distingue : les méchants « écrasent » le peuple (94.5); Dieu instruit « par ta loi » (94.12). L'oppression vient des méchants; la discipline vient de Dieu et passe par sa loi. Ne pas confondre l'injustice subie avec la discipline de Dieu, ni promettre la fin de l'épreuve.");

// --- 18. Le calme, jusqu'à la fosse ---

s = nouvelle(SEC_III, "CONTENU");
s.addText("III · Le Dieu qui instruit dans l'attente · 94.13 · texte seul", { placeholder: "kicker" });
s.addText("Le calme, jusqu'à la fosse", { placeholder: "title" });
texte(s, "lĕhašqîṭ : BDB « causer la tranquillité », avec Dieu pour sujet", { x: 2.2, y: 1.75, w: 7.6, h: 0.4, fontSize: 16, color: AMBRE, align: "center", bold: true });
s.addText("?", { shape: S.OVAL, x: 0.6, y: 2.85, w: 1.25, h: 1.25, fill: { color: CARTE }, line: { color: AMBRE, width: 2 }, color: AMBRE, fontFace: "Cambria", fontSize: 54, bold: true, align: "center", valign: "middle", margin: 0, objectName: "Question" });
trait(s, 1.9, 3.48, 2.3, 3.48, { nom: "Départ" });
etiquette(s, "les jours du malheur : le calme que Dieu donne", 2.35, 2.85, 7.4, 1.25, { fond: ROUILLE, taille: 22, gras: true, police: "Cambria", rayon: 0.12, nom: "Bande du calme" });
trait(s, 9.8, 3.48, 10.55, 3.48, { nom: "Arrivée" });
s.addShape(S.TRAPEZOID, { x: 10.6, y: 2.85, w: 2.1, h: 1.25, flipV: true, fill: { color: NOIR }, line: { color: TRAIT, width: 2 }, objectName: "Fosse" });
trait(s, 10.17, 2.55, 10.17, 4.35, { couleur: AMBRE, largeur: 2, tirets: "dash", fleche: false, nom: "Borne" });
texte(s, "Jusqu'à ce que (ʿad)", { x: 8.6, y: 4.4, w: 2.9, h: 0.3, fontSize: 14, bold: true, color: AMBRE, align: "center" });
texte(s, "Jusqu'à quand?", { x: 0.3, y: 4.22, w: 1.85, h: 0.3, fontSize: 14, bold: true, align: "center" });
texte(s, "pas de date (94.3)", { x: 0.3, y: 4.52, w: 1.85, h: 0.3, fontSize: 13, color: GRIS, align: "center" });
texte(s, "la fosse creusée pour le méchant", { x: 10.4, y: 4.22, w: 2.5, h: 0.55, fontSize: 14, bold: true, align: "center" });
etiquette(s, "Le verset ne promet pas la fin immédiate de l'épreuve", 1.4, 5.05, 5.15, 0.8, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 16, nom: "Pas promis" });
croix(s, 0.65, 5.15, 0.6, "Non promis");
etiquette(s, "Il promet le calme dans l'épreuve, et une fin", 7.58, 5.05, 5.15, 0.8, { fond: ORANGE, couleur: NOIR, taille: 16, gras: true, nom: "Promis" });
coche(s, 6.83, 5.15, 0.6, "Promis");
carte(s, 0.6, 6.0, 12.13, 0.82, "Rapprochement");
texte(s, "Rapprochement propre à ce plan : le même mot hébreu (ʿad) ouvre « Jusqu'à quand » (94.3) et « Jusqu'à ce que » (94.13). La question ne reçoit pas de date; elle reçoit une borne.", { x: 0.85, y: 6.0, w: 11.65, h: 0.82, fontSize: 15, italic: true, valign: "middle", align: "center" });
s.addNotes("« Pour le calmer aux jours du malheur, Jusqu'à ce que la fosse soit creusée pour le méchant! » (94.13). L'infinitif lĕhašqîṭ dit probablement le but de l'instruction, et BDB le range sous « causer la tranquillité », avec Dieu pour sujet : c'est Dieu qui donne le calme; le croyant ne le fabrique pas. « Jusqu'à ce que » (ʿad) borne ce calme dans le temps : le verset ne promet pas la fin immédiate de l'épreuve, mais le calme dans l'épreuve, et une fin. Le rapprochement avec le « Jusqu'à quand » du verset 3 (même mot hébreu ʿad) est propre à ce plan. La fosse est une image, celle de la ruine du méchant, à ne pas littéraliser. Ce verset n'a pas de note de MacArthur.");

// --- 19. Son peuple, son héritage ---

s = nouvelle(SEC_III, "CONTENU");
s.addText("III · Le Dieu qui instruit dans l'attente · 94.14-15", { placeholder: "kicker" });
s.addText("« Son peuple », « son héritage »", { placeholder: "title" });
carte(s, 0.6, 1.8, 5.5, 1.65, "Plainte");
texte(s, "94.5 · la plainte", { x: 0.85, y: 1.9, w: 5.0, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
texte(s, "« Eternel! ils écrasent ton peuple, Ils oppriment ton héritage »", { x: 0.85, y: 2.25, w: 5.0, h: 1.1, fontFace: "Cambria", fontSize: 18, italic: true });
trait(s, 6.2, 2.65, 7.15, 2.65, { nom: "Réponse" });
texte(s, "répond", { x: 6.1, y: 2.28, w: 1.15, h: 0.3, fontSize: 14, italic: true, color: AMBRE, align: "center" });
carte(s, 7.23, 1.8, 5.5, 1.65, "Réponse", ROUILLE);
texte(s, "94.14 · la réponse", { x: 7.48, y: 1.9, w: 5.0, h: 0.3, fontSize: 13, bold: true, color: PECHE });
texte(s, "« Car l'Eternel ne délaisse pas son peuple, Il n'abandonne pas son héritage »", { x: 7.48, y: 2.25, w: 5.0, h: 1.1, fontFace: "Cambria", fontSize: 18, italic: true });
etiquette(s, "naḥălāh, « héritage » : BDB le range sous Israël, propriété de l'Éternel", 2.4, 3.6, 8.5, 0.5, { fond: NOIR, ligne: { color: AMBRE, width: 1.25, dashType: "dash" }, couleur: AMBRE, taille: 14, rayon: 0.25, nom: "Héritage" });
[
  ["L'alliance · Genèse 15.18", "« En ce jour-là, l'Eternel fit alliance avec Abram »", CARTE],
  ["La miséricorde · Michée 7.18", "« Car il prend plaisir à la miséricorde »", CARTE],
  ["Le verset · Psaume 94.14", "Le fondement doctrinal des Psaumes 93 à 100 (note de MacArthur)", ORANGE],
  ["Paul · Romains 11.2, 26", "« Dieu n'a point rejeté son peuple, qu'il a connu d'avance » · « Et ainsi tout Israël sera sauvé »", ROUILLE],
].forEach(([t, d, f], i) => {
  const x = 0.6 + i * 3.11;
  carte(s, x, 4.3, 2.8, 1.85, "Chaîne " + (i + 1), f, f === CARTE ? { color: TRAIT, width: 1 } : undefined);
  texte(s, t, { x: x + 0.15, y: 4.38, w: 2.55, h: 0.3, fontSize: 13, bold: true, color: f === ORANGE ? NOIR : AMBRE });
  texte(s, d, { x: x + 0.15, y: 4.72, w: 2.55, h: 1.4, fontSize: 14, italic: i !== 2, bold: i === 2, color: f === ORANGE ? NOIR : CLAIR });
  if (i < 3) s.addShape(S.CHEVRON, { x: x + 2.83, y: 5.0, w: 0.24, h: 0.4, fill: { color: AMBRE }, line: { type: "none" }, objectName: "Chevron " + (i + 1) });
});
texte(s, "« L'engagement de Dieu envers son peuple, Israël, est indéfectible; il repose sur l'alliance conclue avec lui et sur son amour éternel » (note de MacArthur sur 94.14)", { x: 0.6, y: 6.3, w: 12.13, h: 0.55, fontSize: 14, italic: true, color: PECHE, align: "center" });
s.addNotes("Les deux mots de la plainte, « ton peuple » et « ton héritage » (94.5), reviennent au verset 14, rapportés cette fois à l'Éternel. MacArthur (note sur 94.14, avec renvoi à Genèse 15, Jérémie 12.15 et Michée 7.18) : « L'engagement de Dieu envers son peuple, Israël, est indéfectible; il repose sur l'alliance conclue avec lui et sur son amour éternel ». La note en fait le fondement doctrinal des Psaumes 93 à 100, une vérité « destinée à encourager la nation dans une période difficile », et ajoute que « Paul y fait allusion en Rm 11.1 en parlant du salut à venir d'Israël ». Paul reprend, sans nommer sa source, la formule de la Septante du verset 14 en changeant le sujet (« Dieu » au lieu du « Seigneur ») et le verbe (l'aoriste apōsato) (Romains 11.2), lui qui précise « Car moi aussi je suis Israélite » (11.1); son argument aboutit à « Et ainsi tout Israël sera sauvé » (11.26). Verset 15 (texte seul) : le jugement « reviendra » à la justice (ṣedeq); la seconde ligne n'a pas de verbe en hébreu, « l'approuveront » (NEG79) est suppléé (observation de Kidner, vérifiée).");

// --- 20. Sens, principe, application ---

s = nouvelle(SEC_III, "CONTENU");
s.addText("III · Le Dieu qui instruit dans l'attente · 94.14", { placeholder: "kicker" });
s.addText("Du sens à l'application, sans substitution", { placeholder: "title" });
[
  ["Sens", "Israël, propriété de l'Éternel, n'est pas abandonné; Paul y rattache le salut à venir d'Israël (Romains 11.1, 26).", FOND2],
  ["Principe", "Dieu n'abandonne pas ce qui lui appartient, et dans l'attente il forme les siens par sa Parole.", ROUILLE],
  ["Application", "L'assemblée en reçoit le principe : elle apprend qui est Dieu et s'appuie en Christ sur ce Dieu fidèle.", ORANGE],
].forEach(([t, d, f], i) => {
  const x = 0.6 + i * 4.15;
  carte(s, x, 1.85, 3.85, 2.6, "Étape " + (i + 1), f);
  pastille(s, i + 1, x + 0.25, 2.05, 0.55, i === 2 ? NOIR : ORANGE, i === 2 ? ORANGE : NOIR);
  texte(s, t, { x: x + 1.0, y: 2.05, w: 2.6, h: 0.55, fontFace: "Cambria", fontSize: 24, bold: true, valign: "middle", color: i === 2 ? NOIR : CLAIR });
  texte(s, d, { x: x + 0.25, y: 2.8, w: 3.4, h: 1.6, fontSize: 16, color: i === 2 ? NOIR : CLAIR });
  if (i < 2) s.addShape(S.CHEVRON, { x: x + 3.88, y: 2.95, w: 0.25, h: 0.5, fill: { color: AMBRE }, line: { type: "none" }, objectName: "Chevron " + (i + 1) });
});
croix(s, 0.6, 4.75, 0.6, "Substitution");
texte(s, "Pas de substitution : l'Église ne prend pas la place d'Israël dans cette promesse.", { x: 1.4, y: 4.7, w: 11.3, h: 0.7, fontFace: "Cambria", fontSize: 21, bold: true, valign: "middle" });
carte(s, 0.6, 5.6, 12.13, 1.2, "Concrètement");
texte(s, "Concrètement", { x: 0.85, y: 5.66, w: 3, h: 0.3, fontSize: 14, bold: true, color: AMBRE });
["Ouvrir l'Écriture précisément les jours où l'on voudrait la fermer.", "Ne pas se promettre la fin de l'épreuve pour demain : le calme « jusqu'à ce que ».", "Recevoir le calme « par ta loi » : l'Esprit l'applique, le croyant ne le fabrique pas."].forEach((t, i) => {
  texte(s, t, { x: 0.85 + i * 3.95, y: 6.0, w: 3.7, h: 0.75, fontSize: 14 });
});
s.addNotes("Sens : Israël, propriété de l'Éternel, n'est pas abandonné, et Paul y rattache le salut à venir d'Israël. Principe : Dieu n'abandonne pas ce qui lui appartient, et dans l'attente il forme les siens par sa Parole. Application : l'assemblée ne prend pas la place d'Israël dans cette promesse; elle y apprend qui est Dieu, et s'appuie en Christ sur ce Dieu fidèle. Le croyant éprouvé ne fabrique pas son calme : Dieu le donne « par ta loi », que l'Esprit applique. Prévoir une phrase de réponse sur Israël et l'Église, si la question vient.");

// --- 21. Section IV ---

pres.addSection({ title: SEC_IV });
s = nouvelle(SEC_IV, "SECTION");
rocher(s, 10.6, 5.2, 4.2, "Rocher section IV");
s.addText("IV", { placeholder: "kicker" });
s.addText("Le Dieu qui soutient et qui rendra", { placeholder: "title" });
s.addText("Quand mon pied chancelle, sa bonté me soutient; et le juge aura le dernier mot.", { placeholder: "body" });
s.addText("Psaume 94.16-23 · 10 min", { placeholder: "ref" });
s.addNotes("Quatrième point : le psalmiste passe au « je ». Le secours présent, le tribunal qui pervertit la loi, le rocher et le verdict.");

// --- 22. Sans l'Éternel, le silence ---

s = nouvelle(SEC_IV, "CONTENU");
s.addText("IV · Le Dieu qui soutient et qui rendra · 94.16-17 (94.16 : texte seul)", { placeholder: "kicker" });
s.addText("Sans l'Éternel, la demeure du silence", { placeholder: "title" });
carte(s, 0.6, 1.75, 12.13, 0.85, "Questions");
texte(s, "« Qui se lèvera pour moi contre les méchants? Qui me soutiendra contre ceux qui font le mal? » (94.16)", { x: 0.85, y: 1.75, w: 11.65, h: 0.85, fontFace: "Cambria", fontSize: 20, italic: true, align: "center", valign: "middle" });
etiquette(s, "« Si l'Eternel n'était pas mon secours » (94.17)", 3.9, 2.95, 5.5, 0.85, { fond: ORANGE, couleur: NOIR, taille: 18, gras: true, nom: "Condition" });
texte(s, "condition irréelle : lûlê, « si… ne… pas »", { x: 9.6, y: 3.0, w: 3.1, h: 0.75, fontSize: 14, italic: true, color: AMBRE, valign: "middle" });
trait(s, 5.4, 3.8, 3.45, 4.5, { couleur: TRAIT, nom: "Sans le secours" });
trait(s, 7.9, 3.8, 9.9, 4.5, { nom: "Avec le secours" });
carte(s, 0.6, 4.5, 5.7, 2.25, "Le silence", NOIR, { color: TRAIT, width: 1.5 });
texte(s, "Sans lui : « la demeure du silence »", { x: 0.85, y: 4.6, w: 5.2, h: 0.45, fontFace: "Cambria", fontSize: 19, bold: true, color: AMBRE });
texte(s, "« Le «silence» désigne ici le séjour des morts (cf. 31.18) »", { x: 0.85, y: 5.12, w: 5.2, h: 0.75, fontSize: 15, italic: true });
texte(s, "Psaume 31.18 : « Qu'ils descendent en silence au séjour des morts! »", { x: 0.85, y: 5.9, w: 5.2, h: 0.75, fontSize: 14, color: GRIS });
carte(s, 7.03, 4.5, 5.7, 2.25, "Le secours", ROUILLE);
texte(s, "Avec lui : l'Éternel est mon secours", { x: 7.28, y: 4.6, w: 5.2, h: 0.45, fontFace: "Cambria", fontSize: 19, bold: true, color: PECHE });
texte(s, "Le double « qui? » n'a pas de réponse humaine; la réponse est au verset 17 : l'Éternel est le secours du psalmiste.", { x: 7.28, y: 5.12, w: 5.2, h: 1.0, fontSize: 15 });
texte(s, "Note de MacArthur sur 94.17 · BDB : dûmāh = le šĕʾôl", { x: 7.28, y: 6.35, w: 5.2, h: 0.3, fontSize: 12, color: PECHE });
s.addNotes("« Qui se lèvera pour moi contre les méchants? Qui me soutiendra contre ceux qui font le mal? » (94.16, texte seul) : aucune réponse humaine. « Si l'Eternel n'était pas mon secours, Mon âme serait bien vite dans la demeure du silence » (94.17) : une condition irréelle; sans ce secours, il serait mort. MacArthur : « Le «silence» désigne ici le séjour des morts (cf. 31.18) »; BDB identifie de même dûmāh au šĕʾôl. Attention : « la demeure du silence » (dûmāh, 94.17) et « les réduira au silence » (yaṣmîtēm, 94.23) rendent deux mots hébreux différents : ne pas bâtir de lien sur le français.");

// --- 23. Le pied qui chancelle ---

s = nouvelle(SEC_IV, "CONTENU");
s.addText("IV · Le Dieu qui soutient et qui rendra · 94.18-19", { placeholder: "kicker" });
s.addText("Le pied qui chancelle, l'âme consolée", { placeholder: "title" });
carte(s, 0.6, 1.8, 6.3, 4.95, "Le pied");
trait(s, 1.0, 2.6, 6.4, 4.85, { couleur: TRAIT, largeur: 4, fleche: false, nom: "Pente" });
s.addShape(S.ROUNDED_RECTANGLE, { x: 2.6, y: 3.0, w: 0.8, h: 0.4, rotate: 22, rectRadius: 0.1, fill: { color: CLAIR }, line: { type: "none" }, objectName: "Pied" });
trait(s, 3.6, 3.35, 5.7, 4.2, { couleur: ROUILLE, largeur: 2.5, tirets: "dash", nom: "Glissade" });
s.addShape(S.RECTANGLE, { x: 1.0, y: 5.5, w: 5.4, h: 0.08, fill: { color: TRAIT }, line: { type: "none" }, objectName: "Sol" });
trait(s, 3.0, 5.5, 3.0, 3.6, { couleur: ORANGE, largeur: 7, fleche: false, nom: "Appui" });
texte(s, "« Mon pied chancelle! »", { x: 3.6, y: 2.65, w: 2.9, h: 0.35, fontSize: 15, bold: true, color: AMBRE });
texte(s, "« Ta bonté, ô Eternel! me sert d'appui »", { x: 0.8, y: 4.3, w: 2.1, h: 1.05, fontSize: 15, bold: true, color: ORANGE, align: "right" });
texte(s, "Deutéronome 32.35 : le pied des ennemis chancellera. Ici, c'est le pied du juste, et la bonté de Dieu le soutient.", { x: 0.85, y: 5.75, w: 5.8, h: 0.9, fontSize: 14, color: GRIS });
carte(s, 7.15, 1.8, 5.58, 4.95, "Les pensées");
const pts23 = [[0.2, 0.3], [0.7, 0.1], [1.2, 0.5], [0.5, 0.75], [1.0, 1.0], [1.6, 0.2], [0.1, 1.1], [1.7, 0.8], [0.6, 1.4], [1.3, 1.45], [0.25, 1.8], [1.8, 1.3], [0.9, 1.85], [1.55, 1.8]];
pts23.forEach(([dx, dy], i) => s.addShape(S.OVAL, { x: 7.5 + dx, y: 2.2 + dy, w: 0.22, h: 0.22, fill: { color: i % 3 === 0 ? ROUILLE : TRAIT }, line: { type: "none" }, objectName: "Pensée " + (i + 1) }));
texte(s, "les pensées s'agitent en foule", { x: 7.35, y: 4.2, w: 2.2, h: 0.55, fontSize: 13, italic: true, color: GRIS, align: "center" });
s.addShape(S.OVAL, { x: 9.85, y: 1.95, w: 2.75, h: 2.75, line: { color: TRAIT, width: 1 }, objectName: "Halo externe" });
s.addText("Tes consolations", { shape: S.OVAL, x: 10.1, y: 2.2, w: 2.25, h: 2.25, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, fontFace: "Cambria", fontSize: 15, bold: true, align: "center", valign: "middle", margin: 0, objectName: "Consolations" });
trait(s, 9.85, 3.32, 9.45, 3.32, { couleur: AMBRE, nom: "Réjouissent" });
texte(s, "« Quand les pensées s'agitent en foule au-dedans de moi, Tes consolations réjouissent mon âme » (94.19, texte seul)", { x: 7.4, y: 4.95, w: 5.1, h: 1.0, fontSize: 15, italic: true });
texte(s, "Le réconfort vient de Dieu, non de la stabilité du psalmiste.", { x: 7.4, y: 6.05, w: 5.1, h: 0.6, fontSize: 14, bold: true, color: AMBRE });
s.addNotes("« Quand je dis: Mon pied chancelle! Ta bonté, ô Eternel! me sert d'appui » (94.18). En hébreu, « quand j'ai dit » est au parfait, « elle me soutient » (yisʿādēnî) à l'inaccompli : l'expérience passée fonde une assurance présente. « Ta bonté » (ḥesed) : la note de MacArthur renvoie à une note sur 85.8, non fournie; au lexique seul, BDB range le verset sous la bienveillance de Dieu « dans la délivrance des ennemis et des détresses ». Le cantique de Moïse annonçait que le pied des ennemis chancellerait (Deutéronome 32.35, même verbe, même nom); ici, c'est le pied du juste. Le Psaume 73, que la note d'introduction rapproche, connaît la même vacillation : « Toutefois, mon pied allait fléchir » (73.2). Verset 19 (texte seul) : BDB lit les « pensées » (śarʿappîm) comme des pensées qui troublent; « Tes consolations » : ne pas en faire une technique contre l'anxiété.");

// --- 24. Le tribunal ---

s = nouvelle(SEC_IV, "CONTENU");
s.addText("IV · Le Dieu qui soutient et qui rendra · 94.20-21", { placeholder: "kicker" });
s.addText("Le trône des ruines", { placeholder: "title" });
etiquette(s, "La loi", 0.6, 1.85, 2.2, 1.0, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 20, gras: true, police: "Cambria", nom: "Loi A" });
trait(s, 2.9, 2.35, 3.3, 2.35, { nom: "Rôle de la loi" });
etiquette(s, "Faire régner le bien", 3.4, 1.85, 5.25, 1.0, { fond: ORANGE, couleur: NOIR, taille: 20, gras: true, nom: "Le bien" });
etiquette(s, "La loi", 0.6, 3.15, 2.2, 1.0, { fond: CARTE, ligne: { color: TRAIT, width: 1 }, taille: 20, gras: true, police: "Cambria", nom: "Loi B" });
trait(s, 2.9, 3.65, 3.3, 3.65, { couleur: ROUILLE, nom: "Loi détournée" });
etiquette(s, "Le trône des ruines", 3.4, 3.15, 2.45, 1.0, { fond: ROUILLE, taille: 17, gras: true, nom: "Trône" });
trait(s, 5.9, 3.65, 6.3, 3.65, { couleur: ROUILLE, nom: "Vers l'injustice" });
etiquette(s, "Un instrument d'injustice", 6.4, 3.15, 2.25, 1.0, { fond: NOIR, ligne: { color: AMBRE, width: 1.5 }, taille: 16, gras: true, nom: "Injustice" });
etiquette(s, "Dieu", 0.6, 4.45, 2.2, 1.0, { fond: ORANGE, couleur: NOIR, taille: 22, gras: true, police: "Cambria", nom: "Dieu" });
croix(s, 3.4, 4.65, 0.6, "Alliance refusée");
texte(s, "allié ?", { x: 4.1, y: 4.65, w: 1.4, h: 0.6, fontSize: 20, bold: true, color: AMBRE, valign: "middle" });
etiquette(s, "ce tribunal", 6.4, 4.45, 2.25, 1.0, { fond: ROUILLE, taille: 18, gras: true, nom: "Ce tribunal" });
trait(s, 2.9, 4.95, 3.3, 4.95, { tirets: "dash", fleche: false, nom: "Lien 1" });
trait(s, 5.5, 4.95, 6.3, 4.95, { tirets: "dash", fleche: false, nom: "Lien 2" });
texte(s, "« Les méchants te feraient-ils siéger sur leur trône, Eux qui forment des desseins iniques en dépit de la loi? » (94.20)", { x: 0.6, y: 5.75, w: 8.05, h: 0.95, fontSize: 16, italic: true });
carte(s, 8.95, 1.85, 3.78, 2.7, "Note sur 94.20");
texte(s, "La note de MacArthur (94.20)", { x: 9.15, y: 1.95, w: 3.4, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
texte(s, [{ text: "« Allusion à des juges ou des dirigeants corrompus »", options: { breakLine: true } }, { text: "« en faisant de la loi un instrument d'injustice au lieu de l'utiliser pour faire régner le bien »" }], { x: 9.15, y: 2.3, w: 3.4, h: 2.2, fontSize: 14, italic: true });
carte(s, 8.95, 4.7, 3.78, 2.05, "Verdict", ROUILLE);
texte(s, "Le verdict (94.21 · texte seul)", { x: 9.15, y: 4.8, w: 3.4, h: 0.3, fontSize: 13, bold: true, color: PECHE });
texte(s, "« Ils se rassemblent contre la vie du juste, Et ils condamnent le sang innocent »", { x: 9.15, y: 5.15, w: 3.4, h: 1.5, fontSize: 14, italic: true });
s.addNotes("« Les méchants te feraient-ils siéger sur leur trône, Eux qui forment des desseins iniques en dépit de la loi? » (94.20). MacArthur : « Allusion à des juges ou des dirigeants corrompus »; pour « en dépit de la loi », il donne le littéral, « sur la loi » : ces juges et dirigeants « vont à l'encontre de l'ordre moral de l'univers en faisant de la loi un instrument d'injustice au lieu de l'utiliser pour faire régner le bien ». BDB concorde : un tribunal « qui ruine l'innocent par l'injustice »; le participe yōṣēr « qui façonne » est celui du verset 9 (Dieu « a formé l'œil »). La question attend un non. Verset 21 (texte seul) : un verdict de tribunal (BDB : « condamner comme coupable »); la loi maudissait déjà « celui qui reçoit un présent pour répandre le sang de l'innocent » (Deutéronome 27.25). Garde-fou : dire que des juges ou des dirigeants font de la loi un instrument d'injustice, sans désigner un parti ni une personne, et sans le taire.");

// --- 25. Le juge rend ---

s = nouvelle(SEC_IV, "CONTENU");
s.addText("IV · Le Dieu qui soutient et qui rendra · 94.2, 22-23", { placeholder: "kicker" });
s.addText("Ce que le psalmiste demande, le juge le fait", { placeholder: "title" });
carte(s, 0.6, 1.85, 3.6, 1.55, "Demande", CARTE, { color: AMBRE, width: 1.5 });
texte(s, "94.2 · la demande", { x: 0.85, y: 1.95, w: 3.1, h: 0.3, fontSize: 13, bold: true, color: AMBRE });
texte(s, "« Rends »", { x: 0.85, y: 2.3, w: 3.1, h: 0.6, fontFace: "Cambria", fontSize: 30, bold: true });
texte(s, "hāšēb : hiphil de šûb", { x: 0.85, y: 2.95, w: 3.1, h: 0.3, fontSize: 14, italic: true, color: PECHE });
trait(s, 4.25, 2.62, 4.82, 2.62, { nom: "Vers le juge" });
etiquette(s, "Le juge de la terre", 4.87, 1.85, 3.6, 1.55, { fond: ORANGE, couleur: NOIR, taille: 24, gras: true, police: "Cambria", nom: "Juge" });
trait(s, 8.52, 2.62, 9.08, 2.62, { nom: "Vers la réponse" });
carte(s, 9.13, 1.85, 3.6, 1.55, "Réponse", ROUILLE);
texte(s, "94.23 · la réponse", { x: 9.38, y: 1.95, w: 3.1, h: 0.3, fontSize: 13, bold: true, color: PECHE });
texte(s, "« Il fera retomber »", { x: 9.38, y: 2.3, w: 3.2, h: 0.6, fontFace: "Cambria", fontSize: 25, bold: true });
texte(s, "wayyāšeb : hiphil de šûb", { x: 9.38, y: 2.95, w: 3.1, h: 0.3, fontSize: 14, italic: true, color: PECHE });
arc(s, 2.4, 10.93, 3.5, 5.0, { nom: "Boucle du verbe šûb" });
texte(s, "Le même verbe ouvre et ferme le psaume", { x: 3.6, y: 4.35, w: 7.4, h: 0.45, fontFace: "Cambria", fontSize: 20, italic: true, align: "center", color: AMBRE });
[
  ["Proportion", "« Il fera retomber sur eux leur iniquité » : leur iniquité, pas davantage.", CARTE],
  ["Lecture de MacArthur (94.23)", "« Décrit la destruction qui frappera les méchants alors même qu'ils sont en train de pécher ». « Par » ou « dans » : décision d'interprétation.", CARTE],
  ["De « mon Dieu » à « notre Dieu »", "« Mon Dieu est le rocher de mon refuge » (94.22, texte seul) devient « L'Eternel, notre Dieu » (94.23).", ROUILLE],
].forEach(([t, d, f], i) => {
  const x = 0.6 + i * 4.1;
  carte(s, x, 5.05, 3.93, 1.75, "Appui " + (i + 1), f, f === CARTE ? { color: TRAIT, width: 1 } : undefined);
  texte(s, t, { x: x + 0.2, y: 5.12, w: 3.55, h: 0.3, fontSize: 13, bold: true, color: i === 2 ? PECHE : AMBRE });
  texte(s, d, { x: x + 0.2, y: 5.45, w: 3.55, h: 1.3, fontSize: 14, italic: true });
});
s.addNotes("« Mais l'Eternel est ma retraite, Mon Dieu est le rocher de mon refuge » (94.22, texte seul) : l'hébreu emploie la forme du récit, « l'Éternel a été pour moi une retraite », qui présente probablement la réponse comme acquise. « Il fera retomber sur eux leur iniquité, Il les réduira au silence par leur méchanceté; L'Eternel, notre Dieu, les réduira au silence » (94.23). « Fera retomber » est le verbe de « Rends » (94.2) : ce que le psalmiste demandait au juge de rendre, le juge le fait retomber. MacArthur : le verset « Décrit la destruction qui frappera les méchants alors même qu'ils sont en train de pécher »; la préposition permet ce sens (« dans leur méchanceté », glose de Bible Hub) comme celui de la NEG79 (« par leur méchanceté ») : décision d'interprétation. Le croyant n'a pas à faire retomber lui-même l'iniquité sur ceux qui le blessent : le juge le fera, et avec exactitude.");

// --- 26. Synthèse ---

pres.addSection({ title: "Conclusion" });
s = nouvelle("Conclusion", "CONTENU");
s.addText("Synthèse", { placeholder: "kicker" });
s.addText("Dieu voit, Dieu instruit, Dieu rendra", { placeholder: "title" });
[
  ["Dieu voit", "94.9", "« Celui qui a formé l'œil ne verrait-il pas? »"],
  ["Dieu instruit", "94.12", "« Et que tu instruis par ta loi »"],
  ["Dieu rendra", "94.2 · 94.23", "« Il fera retomber sur eux leur iniquité »"],
].forEach(([t, ref, q], i) => {
  const x = 0.6 + i * 4.15;
  carte(s, x, 1.8, 3.85, 4.1, "Colonne " + (i + 1), i === 2 ? ROUILLE : FOND2);
  const cx = x + 1.925;
  if (i === 0) oeil(s, cx, 3.0, 2.3, "Œil synthèse");
  if (i === 1) livre(s, cx - 0.9, 2.55, 1.8, "Livre synthèse");
  if (i === 2) balance(s, cx, 2.15, 2.0, "Balance synthèse");
  texte(s, t, { x: x + 0.2, y: 4.2, w: 3.45, h: 0.6, fontFace: "Cambria", fontSize: 28, bold: true, align: "center" });
  texte(s, q, { x: x + 0.25, y: 4.85, w: 3.35, h: 0.7, fontSize: 14, italic: true, align: "center" });
  texte(s, ref, { x: x + 0.2, y: 5.55, w: 3.45, h: 0.3, fontSize: 13, bold: true, color: i === 2 ? PECHE : AMBRE, align: "center" });
});
carte(s, 0.6, 6.05, 12.13, 0.75, "Soutien");
texte(s, "Et il soutient celui qui chancelle : « Ta bonté, ô Eternel! me sert d'appui » (94.18) · Il n'abandonne pas « son peuple » (94.14)", { x: 0.85, y: 6.05, w: 11.65, h: 0.75, fontSize: 16, valign: "middle", align: "center" });
s.addNotes("« Jusqu'à quand? » Le psaume ne donne pas de date; il donne un Dieu. Il voit : il a formé l'œil (94.9). Il instruit : heureux l'homme qu'il forme par sa loi, lui qui n'abandonne pas ce qui lui appartient (94.12, 14). Il soutient et il rendra : le « Rends » du verset 2 devient « Il fera retomber » au verset 23.");

// --- 27. Conclusion et appel ---

s = nouvelle("Conclusion", "CONTENU");
s.addText("Conclusion et appel", { placeholder: "kicker" });
s.addText("Ce qu'il faut retenir", { placeholder: "title" });
oeil(s, 1.55, 2.5, 1.7, "Œil conclusion");
balance(s, 11.7, 1.85, 1.3, "Balance conclusion");
texte(s, [{ text: "Dieu voit, Dieu instruit,", options: { breakLine: true } }, { text: "Dieu rendra.", options: { color: AMBRE } }], { x: 2.9, y: 1.85, w: 7.0, h: 1.4, fontFace: "Cambria", fontSize: 38, bold: true, align: "center", valign: "middle" });
[[0.6, "À l'incroyant", "Vous vivez peut-être comme si « L'Eternel ne regarde pas ». Celui qui a formé l'œil voit, et il connaît « les pensées de l'homme », les vôtres comprises. Mais le juge est aussi « ma retraite » : ce refuge, Dieu l'ouvre aujourd'hui en Christ à quiconque se repent et croit. « Insensés, quand serez-vous sages? » Aujourd'hui, devenez sage."],
 [6.8, "Au croyant", "Portez votre « Jusqu'à quand » à Dieu, non à la rancune; laissez-lui la rétribution. Ouvrez sa Parole dans les jours du malheur : c'est par elle qu'il donne le calme. Quand votre pied chancelle, ce n'est pas votre force qui vous tient, c'est sa bonté : vous êtes à lui, en Christ."]].forEach(([x, t, d]) => {
  carte(s, x, 3.5, 5.93, 3.3, "Appel " + t);
  texte(s, t, { x: x + 0.3, y: 3.65, w: 5.3, h: 0.45, fontSize: 21, bold: true, color: AMBRE });
  texte(s, d, { x: x + 0.3, y: 4.2, w: 5.35, h: 2.5, fontSize: 17 });
});
s.addNotes("À l'incroyant : le credo « L'Eternel ne regarde pas » est faux; celui qui a formé l'œil voit. Le juge est aussi celui que le psalmiste appelle « ma retraite » (94.22) : ce refuge, Dieu l'ouvre en Christ à quiconque se repent et croit. Au croyant : portez votre « Jusqu'à quand » à Dieu, laissez-lui la rétribution; ouvrez sa Parole dans les jours du malheur; quand votre pied chancelle, c'est sa bonté qui vous tient. Garder la conclusion à 3 minutes : l'appel vaut plus que la récapitulation.");

// --- 28. Prière finale ---

s = nouvelle("Conclusion", "CITATION");
rocher(s, 6.67, 7.5, 4.2, "Rocher de refuge");
s.addText("« Mais l'Eternel est ma retraite,\nMon Dieu est le rocher de mon refuge. »", { placeholder: "body" });
s.addText("Psaume 94.22", { placeholder: "ref" });
s.addNotes("Prière finale : lire ensemble le Psaume 94.22. Prier pour les opprimés, la veuve, l'étranger et l'orphelin; remettre au juge de la terre les injustices que portent des membres de l'assemblée, en lui demandant le calme du verset 13.");

// --- Écriture, puis couleurs du thème ---

// pptxgenjs écrit la palette Office dans theme1.xml : la remplacer par celle du thème.
async function appliquerTheme(fichier) {
  const zip = await JSZip.loadAsync(fs.readFileSync(fichier));
  const part = "ppt/theme/theme1.xml";
  let xml = await zip.file(part).async("string");
  const c = THEME.colors;
  const slot = (k) => `<a:${k}><a:srgbClr val="${c[k]}"/></a:${k}>`;
  const schema = `<a:clrScheme name="${THEME.name}">` + Object.keys(c).map(slot).join("") + `</a:clrScheme>`;
  if (!/<a:clrScheme[\s\S]*?<\/a:clrScheme>/.test(xml)) throw new Error("clrScheme introuvable dans " + part);
  xml = xml.replace(/<a:clrScheme[\s\S]*?<\/a:clrScheme>/, schema).replace(/(<a:theme[^>]*name=")[^"]*"/, `$1${THEME.name}"`);
  zip.file(part, xml);
  fs.writeFileSync(fichier, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
}

(async () => {
  await pres.writeFile({ fileName: SORTIE });
  await appliquerTheme(SORTIE);
  console.log("écrit :", SORTIE);
})();

// Présentation du Psaume 19 : « Les cieux parlent, la Parole transforme ».
// Thème noir et orange brûlé, schémas en formes natives (modifiables dans PowerPoint).
// Usage : node outils/presentation/deck.js   →   Presentation-Psaume-19.pptx à la racine du dépôt.
// Contenu : Plan-Predication-Psaume-19.md et Recherche-MacArthur-Psaume-19.json (versets NEG79).
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const JSZip = require(require.resolve("jszip", { paths: [require.resolve("pptxgenjs")] }));

const SORTIE = path.join(__dirname, "..", "..", "Presentation-Psaume-19.pptx");
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
pres.title = "Psaume 19 : Les cieux parlent, la Parole transforme";
pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
const C = pres.SchemeColor;
const S = pres.shapes;
const NOIR = C.text1, FOND2 = C.text2, CLAIR = C.background1, GRIS = C.background2;
const ORANGE = C.accent1, AMBRE = C.accent2, ROUILLE = C.accent3, CARTE = C.accent4, TRAIT = C.accent6;
const PIED = "Psaume 19 · Les cieux parlent, la Parole transforme";

// --- Dispositions (layouts) ---

pres.defineSlideMaster({
  title: "TITRE",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 1.6, w: 6.4, h: 2.7, fontFace: "Cambria", fontSize: 44, bold: true, color: CLAIR, align: "left", valign: "bottom", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.5, w: 6.4, h: 0.6, fontSize: 24, color: AMBRE, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "meta", type: "body", x: 0.8, y: 5.2, w: 6.4, h: 0.5, fontSize: 14, color: GRIS, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "SECTION",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.8, y: 1.2, w: 3, h: 1.1, fontFace: "Cambria", fontSize: 66, bold: true, color: ORANGE, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.35, w: 7.2, h: 1.1, fontFace: "Cambria", fontSize: 40, bold: true, color: CLAIR, align: "left", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 3.7, w: 7.0, h: 1.9, fontFace: "Cambria", fontSize: 20, italic: true, color: CLAIR, valign: "top", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "ref", type: "body", x: 0.8, y: 5.75, w: 7.0, h: 0.45, fontSize: 16, color: AMBRE, margin: 0 }, text: "" } },
  ],
});

pres.defineSlideMaster({
  title: "CONTENU",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "kicker", type: "body", x: 0.6, y: 0.35, w: 10, h: 0.35, fontSize: 13, bold: true, color: AMBRE, charSpacing: 1, margin: 0 }, text: "" } },
    { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.72, w: 12.1, h: 0.8, fontFace: "Cambria", fontSize: 30, bold: true, color: CLAIR, align: "left", valign: "middle", margin: 0 }, text: "" } },
    { text: { text: PIED, options: { x: 0.6, y: 7.0, w: 9, h: 0.3, fontSize: 10, color: GRIS, margin: 0 } } },
  ],
  slideNumber: { x: 12.1, y: 7.0, w: 0.6, h: 0.3, fontSize: 10, color: GRIS, align: "right" },
});

pres.defineSlideMaster({
  title: "CITATION",
  background: { color: NOIR },
  objects: [
    { placeholder: { options: { name: "body", type: "body", x: 1.2, y: 1.5, w: 10.9, h: 3.6, fontFace: "Cambria", fontSize: 32, italic: true, color: CLAIR, align: "center", valign: "middle", margin: 0 }, text: "" } },
    { placeholder: { options: { name: "ref", type: "body", x: 1.2, y: 5.3, w: 10.9, h: 0.5, fontSize: 18, color: AMBRE, align: "center", margin: 0 }, text: "" } },
  ],
});

// --- Éléments réutilisés ---

// Motif : le soleil (anneaux concentriques autour d'un disque orange).
function soleil(s, cx, cy, r, nom) {
  s.addShape(S.OVAL, { x: cx - r * 2.1, y: cy - r * 2.1, w: r * 4.2, h: r * 4.2, line: { color: TRAIT, width: 1 }, objectName: nom + " anneau externe" });
  s.addShape(S.OVAL, { x: cx - r * 1.55, y: cy - r * 1.55, w: r * 3.1, h: r * 3.1, line: { color: ROUILLE, width: 1.5 }, objectName: nom + " anneau" });
  s.addShape(S.OVAL, { x: cx - r, y: cy - r, w: r * 2, h: r * 2, fill: { color: ORANGE }, line: { type: "none" }, objectName: nom });
}

// Pastille numérotée : le disque orange du motif, en petit.
function pastille(s, n, x, y, d = 0.55) {
  s.addText(String(n), { shape: S.OVAL, x, y, w: d, h: d, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, bold: true, fontSize: 16, align: "center", valign: "middle", margin: 0, objectName: "Pastille " + n });
}

function carte(s, x, y, w, h, nom, couleur = FOND2) {
  s.addShape(S.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.08, fill: { color: couleur }, line: { type: "none" }, objectName: nom });
}

function texte(s, t, o) {
  s.addText(t, { isTextBox: true, margin: 0, color: CLAIR, fontSize: 16, valign: "top", ...o });
}

function fleche(s, x, y, w, h, o = {}) {
  s.addShape(S.LINE, { x, y, w, h, line: { color: ORANGE, width: 2.25, endArrowType: "triangle", ...(o.line || {}) }, flipH: o.flipH, flipV: o.flipV, objectName: o.nom || "Flèche" });
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

// Typographie : espace insécable dans les guillemets et devant le deux-points (pas de « » orphelin).
const insecable = (t) => t.replace(/« /g, "« ").replace(/ »/g, " »").replace(/ :/g, " :");
const typo = (t) => (typeof t === "string" ? insecable(t) : t.map((r) => ({ ...r, text: insecable(r.text) })));

function nouvelle(section, layout) {
  const slide = pres.addSlide({ masterName: layout, sectionTitle: section });
  const addText = slide.addText.bind(slide);
  slide.addText = (t, o) => addText(typo(t), o);
  return slide;
}

// --- 1. Titre ---

pres.addSection({ title: "Introduction" });
let s = nouvelle("Introduction", "TITRE");
soleil(s, 10.3, 3.75, 1.35, "Soleil");
s.addText("Les cieux parlent, la Parole transforme", { placeholder: "title" });
s.addText("Psaume 19", { placeholder: "body" });
s.addText("André-Guy Bruneau · Prédication expositive · NEG79", { placeholder: "meta" });
s.addNotes("Lecture publique du Psaume 19 en entier avant l'introduction (environ 2 min), avec à l'écran le schéma des trois mouvements (diapositive 2).");

// --- 2. Trois mouvements ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Lecture du Psaume 19", { placeholder: "kicker" });
s.addText("Un psaume, trois mouvements", { placeholder: "title" });
const mouvements = [
  ["19.2-7", "Le cosmos", "Dieu parle sans paroles : assez pour rendre tout homme inexcusable."],
  ["19.8-12", "L'Écriture", "Dieu parle avec des paroles : assez pour restaurer l'âme."],
  ["19.13-15", "Le cœur", "Le serviteur sondé par la Parole répond et s'offre à Dieu."],
];
mouvements.forEach(([ref, titre, desc], i) => {
  const x = 0.6 + i * 4.2;
  carte(s, x, 1.8, 3.7, 2.95, "Mouvement " + (i + 1));
  pastille(s, i + 1, x + 0.3, 2.05);
  texte(s, ref, { x: x + 1.05, y: 2.12, w: 2.4, h: 0.4, fontSize: 15, bold: true, color: AMBRE, valign: "middle" });
  texte(s, titre, { x: x + 0.3, y: 2.8, w: 3.1, h: 0.5, fontFace: "Cambria", fontSize: 24, bold: true });
  texte(s, desc, { x: x + 0.3, y: 3.4, w: 3.1, h: 1.2, fontSize: 16 });
  if (i < 2) fleche(s, x + 3.77, 3.27, 0.36, 0, { nom: "Flèche " + (i + 1) });
});
s.addText("Dieu nommé une fois : El", { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 4.95, w: 3.7, h: 0.55, rectRadius: 0.08, fill: { color: CARTE }, line: { color: TRAIT, width: 1 }, color: CLAIR, fontSize: 15, align: "center", valign: "middle", objectName: "Nom El" });
s.addText("« l'Éternel » nommé sept fois : le nom de l'alliance", { shape: S.ROUNDED_RECTANGLE, x: 4.8, y: 4.95, w: 7.9, h: 0.55, rectRadius: 0.08, fill: { color: ROUILLE }, line: { type: "none" }, color: CLAIR, fontSize: 15, bold: true, align: "center", valign: "middle", objectName: "Nom YHWH" });
s.addText("Mot-crochet : « rien ne se dérobe » (nistār, 19.7)  ↔  « ceux que j'ignore » (nistārôt, 19.13)", { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 5.75, w: 12.1, h: 0.6, rectRadius: 0.3, fill: { color: NOIR }, line: { color: AMBRE, width: 1.25, dashType: "dash" }, color: AMBRE, fontSize: 16, align: "center", valign: "middle", objectName: "Mot-crochet" });
s.addNotes("Un seul hymne en trois mouvements. Dans la première partie, Dieu n'est nommé qu'une fois, El (19.2); dans la seconde, sept fois l'Éternel, le nom de l'alliance (Kidner). La création fait connaître le Créateur; la loi fait connaître le Dieu qui se lie à son peuple. Le mot « caché » relie le soleil (19.7) et les fautes cachées (19.13) : on y reviendra au point IV.");

// --- 3. Accroche ---

s = nouvelle("Introduction", "CONTENU");
s.addText("Introduction", { placeholder: "kicker" });
s.addText("Où cherchez-vous la vérité qui gouverne votre vie?", { placeholder: "title" });
const sources = [
  ["Ce que je vois", "le ciel, la nature, les astres", false],
  ["Ce que je ressens", "le cœur, l'intuition, l'expérience", false],
  ["Ce que Dieu a dit", "sa Parole écrite (19.8)", true],
];
sources.forEach(([t, sous, choisi], i) => {
  const x = 1.25 + i * 3.9;
  s.addText(t, { shape: S.OVAL, x, y: 1.85, w: 2.6, h: 2.6, fill: { color: choisi ? ORANGE : CARTE }, line: { color: choisi ? ORANGE : TRAIT, width: 1.5 }, color: choisi ? NOIR : CLAIR, fontFace: "Cambria", fontSize: 20, bold: true, align: "center", valign: "middle", objectName: "Source " + (i + 1) });
  texte(s, sous, { x: x - 0.4, y: 4.6, w: 3.4, h: 0.4, fontSize: 15, color: GRIS, align: "center" });
});
carte(s, 0.6, 5.35, 12.1, 1.3, "Accroche");
soleil(s, 1.25, 6.0, 0.18, "Petit soleil");
texte(s, "Des rois de Juda avaient consacré au soleil des chevaux et des chars; Josias dut brûler « les chars du soleil » (2 Rois 23.11). David chante le même soleil, mais il l'installe sous une tente que Dieu a dressée (19.5) et garde son plus grand chant pour la loi de l'Éternel (19.8).", { x: 1.95, y: 5.5, w: 10.5, h: 1.0, fontSize: 15, valign: "middle" });
s.addNotes("Accroche : 2 Rois 23.11. Question : quand l'angoisse monte ou qu'une décision presse, où cherchez-vous la vérité : dans ce que vous voyez, dans ce que vous ressentez, ou dans ce que Dieu a dit? Parcours : le ciel qui parle, la Parole qui transforme, la Parole qu'on désire, le cœur sondé et offert.");

// --- 4. Section I ---

pres.addSection({ title: "I. Le ciel qui parle" });
s = nouvelle("I. Le ciel qui parle", "SECTION");
// Ciel nocturne : étoiles autour du soleil.
soleil(s, 10.6, 3.5, 1.0, "Soleil section I");
[[8.3, 1.2], [9.4, 0.7], [12.3, 1.1], [12.6, 5.6], [8.0, 5.9], [11.5, 6.6], [8.7, 3.0], [12.4, 3.4]].forEach(([x, y], i) =>
  s.addShape(S.OVAL, { x, y, w: 0.09, h: 0.09, fill: { color: CLAIR }, line: { type: "none" }, objectName: "Étoile " + (i + 1) }));
s.addText("I", { placeholder: "kicker" });
s.addText("Le ciel qui parle", { placeholder: "title" });
s.addText("« Les cieux racontent la gloire de Dieu,\nEt l'étendue manifeste l'œuvre de ses mains. »", { placeholder: "body" });
s.addText("Psaume 19.2 · Assez pour condamner", { placeholder: "ref" });
s.addNotes("Phrase clé : la création vous a parlé de Dieu chaque jour de votre vie. Psaume 19.2-7; Romains 1.18-20. Environ 10 minutes.");

// --- 5. Un discours sans paroles ---

s = nouvelle("I. Le ciel qui parle", "CONTENU");
s.addText("I · Le ciel qui parle · 19.2-7", { placeholder: "kicker" });
s.addText("Un discours sans relâche et sans paroles", { placeholder: "title" });
const traits = [
  ["Incessant", "« Le jour en instruit un autre jour, La nuit en donne connaissance à une autre nuit. »", "19.3"],
  ["Sans mots", "« Ce n'est pas un langage, ce ne sont pas des paroles »", "19.4"],
  ["Universel", "« Leur retentissement parcourt toute la terre »", "19.5"],
  ["Inévitable", "« Rien ne se dérobe à sa chaleur. »", "19.7"],
];
traits.forEach(([t, cit, ref], i) => {
  const x = 0.6 + i * 3.1;
  carte(s, x, 1.8, 2.8, 3.25, "Trait " + (i + 1));
  pastille(s, i + 1, x + 0.25, 2.05);
  texte(s, t, { x: x + 0.25, y: 2.8, w: 2.35, h: 0.45, fontFace: "Cambria", fontSize: 21, bold: true });
  texte(s, cit, { x: x + 0.25, y: 3.35, w: 2.35, h: 1.25, fontSize: 15, italic: true });
  texte(s, ref, { x: x + 0.25, y: 4.6, w: 2.35, h: 0.3, fontSize: 14, bold: true, color: AMBRE });
});
texte(s, "« Qui ne conclurait pas que Dieu est tout glorieux en regardant les cieux? »", { x: 0.6, y: 5.35, w: 12.1, h: 0.6, fontFace: "Cambria", fontSize: 22, italic: true, align: "center" });
texte(s, "John MacArthur, sermon 90-340 (trad.)", { x: 0.6, y: 6.0, w: 12.1, h: 0.35, fontSize: 13, color: GRIS, align: "center" });
s.addNotes("Deux participes, « racontent », « manifeste », présentent l'action comme en cours; le jour « fait jaillir » le message comme une source (BDB). Dieu se déclare dans sa création « chaque jour et chaque nuit, sans relâche » (80-308). La « gloire » : la splendeur de Dieu qui se manifeste; ne pas s'appuyer sur l'étymologie du « poids ». Le paradoxe : pas de paroles, et pourtant toute la terre l'entend. Paul reprendra ces mots d'après le grec, « leur voix » (Romains 10.18).");

// --- 6. La course du soleil ---

s = nouvelle("I. Le ciel qui parle", "CONTENU");
s.addText("I · Le ciel qui parle · 19.5-7", { placeholder: "kicker" });
s.addText("Le soleil : une créature qui obéit", { placeholder: "title" });
s.addShape(S.LINE, { x: 0.9, y: 5.45, w: 11.5, h: 0, line: { color: TRAIT, width: 1.5 }, objectName: "Horizon" });
s.addShape(S.ARC, { x: 1.9, y: 2.25, w: 9.5, h: 6.4, angleRange: [180, 360], line: { color: ORANGE, width: 2, dashType: "dash" }, objectName: "Course du soleil" });
s.addShape(S.OVAL, { x: 6.2, y: 1.8, w: 0.9, h: 0.9, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Soleil au zénith" });
s.addShape(S.ISOSCELES_TRIANGLE, { x: 1.45, y: 4.75, w: 0.9, h: 0.7, fill: { color: ROUILLE }, line: { type: "none" }, objectName: "Tente" });
texte(s, "« une tente pour le soleil » (19.5)", { x: 2.5, y: 4.75, w: 1.8, h: 0.65, fontSize: 13, color: AMBRE, valign: "bottom" });
texte(s, [{ text: "Comme un époux", options: { bold: true, fontSize: 18, breakLine: true } }, { text: "qui sort de sa chambre : l'éclat et la joie des noces (19.6)", options: { fontSize: 14 } }], { x: 3.6, y: 3.15, w: 2.75, h: 1.2 });
texte(s, [{ text: "Comme un héros", options: { bold: true, fontSize: 18, breakLine: true } }, { text: "qui s'élance dans la carrière : la force, la course (19.6)", options: { fontSize: 14 } }], { x: 7.0, y: 3.15, w: 2.75, h: 1.2 });
texte(s, "D'une extrémité des cieux à l'autre : « Rien ne se dérobe à sa chaleur » (19.7)", { x: 4.45, y: 4.5, w: 4.45, h: 0.8, fontSize: 15, italic: true, align: "center" });
carte(s, 0.6, 5.75, 12.1, 0.95, "Créature, non dieu");
texte(s, "Une créature qui obéit, non un dieu qu'on adore : Israël ne devait pas se prosterner devant « le soleil, la lune et les étoiles » (Deutéronome 4.19).", { x: 0.9, y: 5.85, w: 11.5, h: 0.75, fontSize: 15, valign: "middle" });
s.addNotes("Dieu lui a « dressé une tente » : le soleil a un logis qu'il n'a pas choisi. L'époux : l'éclat d'un jour de noces (Joël 2.16 emploie le même mot pour la chambre nuptiale). Le héros : la force que rien n'arrête. Il ne choisit pas sa route; il obéit. Retenir le mot « dérobe » (caché) : il reviendra au point IV. Ne pas allégoriser l'époux ni le héros.");

// --- 7. Création et Parole ---

s = nouvelle("I. Le ciel qui parle", "CONTENU");
s.addText("I · Le ciel qui parle · Romains 1.18-20", { placeholder: "kicker" });
s.addText("Assez pour condamner, jamais pour sauver", { placeholder: "title" });
soleil(s, 3.35, 2.05, 0.17, "Icône création");
texte(s, "La création (19.2-7)", { x: 3.85, y: 1.85, w: 3.8, h: 0.45, fontFace: "Cambria", fontSize: 20, bold: true, valign: "middle" });
livre(s, 8.0, 1.88, 0.55, "Icône Parole");
texte(s, "La Parole (19.8-15)", { x: 8.75, y: 1.85, w: 3.9, h: 0.45, fontFace: "Cambria", fontSize: 20, bold: true, valign: "middle" });
const lignes = [
  ["Langage", "« Ce n'est pas un langage » (19.4)", "« Il rend sage l'ignorant » (19.8)"],
  ["Nom de Dieu", "El, une fois", "l'Éternel, sept fois"],
  ["Portée", "toute la terre (19.5)", "« ton serviteur » (19.12)"],
  ["Effet", "rend inexcusable (Romains 1.20)", "« elle restaure l'âme » (19.8)"],
];
lignes.forEach(([lab, a, b], i) => {
  const y = 2.5 + i * 0.68;
  carte(s, 0.6, y, 12.1, 0.6, "Ligne " + (i + 1), i % 2 ? CARTE : FOND2);
  texte(s, lab, { x: 0.85, y, w: 2.2, h: 0.6, fontSize: 15, bold: true, color: AMBRE, valign: "middle" });
  texte(s, a, { x: 3.15, y, w: 4.6, h: 0.6, fontSize: 15, valign: "middle" });
  texte(s, b, { x: 8.0, y, w: 4.6, h: 0.6, fontSize: 15, bold: true, valign: "middle" });
});
s.addText([{ text: "« La révélation de Dieu dans le monde suffit à condamner, suffit à damner. La révélation dans la Parole suffit à sauver. »", options: { fontFace: "Cambria", italic: true, fontSize: 19, color: CLAIR, breakLine: true } }, { text: "John MacArthur, sermon 80-420 (trad.)", options: { fontSize: 13, color: C.accent5 } }], { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 5.35, w: 12.1, h: 1.35, rectRadius: 0.08, fill: { color: ROUILLE }, line: { type: "none" }, align: "center", valign: "middle", margin: 0.15, objectName: "Citation 80-420" });
s.addNotes("« Les perfections invisibles de Dieu […] se voient comme à l'œil nu […] Ils sont donc inexcusables » (Romains 1.20). Mais l'homme retient « injustement la vérité captive » (Romains 1.18). Application : personne n'est un incroyant innocent; « je trouve Dieu dans la nature » ne suffit pas, car la nature ne dit ni le péché, ni le pardon, ni le Rédempteur. Transition : Kant s'émerveillait du ciel étoilé et de la loi morale en lui; David regarde le même ciel, mais il reçoit la loi de l'Éternel (Kidner). Au verset 8, le psaume passe de la révélation naturelle à la révélation verbale (80-249).");

// --- 8. Section II ---

pres.addSection({ title: "II. La Parole qui transforme" });
s = nouvelle("II. La Parole qui transforme", "SECTION");
soleil(s, 10.6, 3.6, 1.2, "Halo section II");
livre(s, 9.5, 2.92, 2.2, "Livre section II");
s.addText("II", { placeholder: "kicker" });
s.addText("La Parole qui transforme", { placeholder: "title" });
s.addText("« La loi de l'Éternel est parfaite, elle restaure l'âme;\nLe témoignage de l'Éternel est véritable, il rend sage l'ignorant. »", { placeholder: "body" });
s.addText("Psaume 19.8 · Assez pour sauver", { placeholder: "ref" });
s.addNotes("Phrase clé : ce que la création ne peut pas faire, la Parole le fait. Psaume 19.8-10. Environ 12 minutes.");

// --- 9. Six énoncés ---

s = nouvelle("II. La Parole qui transforme", "CONTENU");
s.addText("II · La Parole qui transforme · 19.8-10", { placeholder: "kicker" });
s.addText("Six énoncés, un seul auteur", { placeholder: "title" });
[["Nom de la Parole", 0.85], ["de l'Éternel", 4.25], ["Qualité", 6.35], ["Ce qu'elle fait", 8.75]].forEach(([t, x]) =>
  texte(s, t, { x, y: 1.7, w: 3, h: 0.4, fontSize: 14, bold: true, color: GRIS }));
const enonces = [
  ["La loi", "tôrâ", "parfaite", "restaure l'âme"],
  ["Le témoignage", "ʿēdût", "véritable", "rend sage l'ignorant"],
  ["Les ordonnances", "piqqûdîm", "droites", "réjouissent le cœur"],
  ["Les commandements", "miṣwâ", "purs", "éclairent les yeux"],
  ["La crainte", "yirʾâ", "pure", "subsiste à toujours"],
  ["Les jugements", "mišpāṭîm", "vrais", "sont tous justes"],
];
enonces.forEach(([nom, heb, qual, effet], i) => {
  const y = 2.15 + i * 0.7;
  carte(s, 0.6, y, 12.1, 0.62, "Énoncé " + (i + 1), i % 2 ? CARTE : FOND2);
  texte(s, [{ text: nom + "  ", options: { bold: true, fontSize: 17 } }, { text: heb, options: { italic: true, fontSize: 14, color: GRIS } }], { x: 0.85, y, w: 3.3, h: 0.62, valign: "middle" });
  s.addText("de l'Éternel", { shape: S.ROUNDED_RECTANGLE, x: 4.2, y: y + 0.11, w: 1.75, h: 0.4, rectRadius: 0.2, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, bold: true, fontSize: 13, align: "center", valign: "middle", margin: 0, objectName: "de l'Éternel " + (i + 1) });
  texte(s, qual, { x: 6.35, y, w: 2.2, h: 0.62, fontSize: 17, bold: true, color: AMBRE, valign: "middle" });
  texte(s, effet, { x: 8.75, y, w: 3.8, h: 0.62, fontSize: 17, valign: "middle" });
});
texte(s, "Six fois « de l'Éternel » : nul ne peut se tromper sur l'auteur (MacArthur, 90-340).", { x: 0.6, y: 6.45, w: 12.1, h: 0.35, fontSize: 13, color: GRIS });
s.addNotes("Chaque ligne suit le même moule : un nom de la Parole, « de l'Éternel », une qualité, un effet. MacArthur y lit « le témoignage de Dieu lui-même sur sa propre révélation », sur la suffisance de sa Parole (90-340). Lire le tableau ligne par ligne.");

// --- 10. Toute la personne ---

s = nouvelle("II. La Parole qui transforme", "CONTENU");
s.addText("II · La Parole qui transforme · 19.8-10", { placeholder: "kicker" });
s.addText("Une Parole pour toute la personne", { placeholder: "title" });
s.addText([{ text: "La loi de l'Éternel est parfaite", options: { bold: true, fontSize: 17, breakLine: true } }, { text: "complète", options: { fontSize: 14, italic: true } }], { shape: S.OVAL, x: 5.52, y: 3.0, w: 2.3, h: 2.3, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, fontFace: "Cambria", align: "center", valign: "middle", margin: 0.1, objectName: "Moyeu" });
const rayons = [
  ["L'âme", "« elle restaure »", 0.6, 1.85], ["Le simple", "« il rend sage »", 0.6, 3.65], ["Le cœur", "« elles réjouissent »", 0.6, 5.45],
  ["Les yeux", "« ils éclairent »", 9.53, 1.85], ["L'adoration", "« elle subsiste à toujours »", 9.53, 3.65], ["La justice", "« ils sont tous justes »", 9.53, 5.45],
];
rayons.forEach(([t, cit, x, y], i) => {
  carte(s, x, y, 3.2, 1.0, "Rayon " + (i + 1));
  texte(s, t, { x: x + 0.25, y: y + 0.1, w: 2.8, h: 0.4, fontSize: 18, bold: true, color: AMBRE });
  texte(s, cit, { x: x + 0.25, y: y + 0.52, w: 2.8, h: 0.38, fontSize: 15, italic: true });
});
// Rayons du moyeu (centre 6,67 ; 4,15) vers les cartes.
const L = { color: TRAIT, width: 1.5 };
s.addShape(S.LINE, { x: 3.8, y: 2.35, w: 1.95, h: 1.15, line: L, objectName: "Lien âme" });
s.addShape(S.LINE, { x: 3.8, y: 4.15, w: 1.72, h: 0, line: L, objectName: "Lien simple" });
s.addShape(S.LINE, { x: 3.8, y: 4.8, w: 1.95, h: 1.15, line: L, flipV: true, objectName: "Lien cœur" });
s.addShape(S.LINE, { x: 7.6, y: 2.35, w: 1.93, h: 1.15, line: L, flipH: true, objectName: "Lien yeux" });
s.addShape(S.LINE, { x: 7.82, y: 4.15, w: 1.71, h: 0, line: L, objectName: "Lien adoration" });
s.addShape(S.LINE, { x: 7.6, y: 4.8, w: 1.93, h: 1.15, line: L, flipH: true, flipV: true, objectName: "Lien justice" });
texte(s, "« Ce qui signifie donc que l'Écriture couvre toutes choses. Il ne lui échappe rien. »", { x: 4.55, y: 5.55, w: 4.25, h: 0.7, fontSize: 13, italic: true, align: "center" });
texte(s, "MacArthur, FRA-80-19", { x: 4.55, y: 6.25, w: 4.25, h: 0.3, fontSize: 12, color: GRIS, align: "center" });
s.addNotes("Le texte touche toute la personne : l'âme, le simple, le cœur, les yeux, l'adoration (la crainte de l'Éternel, l'Écriture nommée par ce qu'elle produit), la justice. Le simple : celui qui « manque de discernement », qui « ne sait pas quand fermer la porte » (FRA-80-19). Ordonnances droites : « Elles indiquent le bon chemin ». Commandements purs : « la meilleure traduction est « clairs » ». Crainte : « l'Écriture nous instruit pour que nous sachions qui adorer et comment l'adorer ». Jugements : « Elle est totalement juste » (FRA-80-19).");

// --- 11. Deux mots ---

s = nouvelle("II. La Parole qui transforme", "CONTENU");
s.addText("II · La Parole qui transforme · 19.8", { placeholder: "kicker" });
s.addText("Deux mots qui portent le verset 8", { placeholder: "title" });
carte(s, 0.6, 1.8, 5.9, 4.9, "Mot parfaite");
texte(s, "parfaite", { x: 0.95, y: 2.0, w: 3.5, h: 0.65, fontFace: "Cambria", fontSize: 34, bold: true, color: AMBRE });
texte(s, "temîmâ (tāmîm) : complète, entière, intègre (BDB)", { x: 0.95, y: 2.7, w: 5.3, h: 0.4, fontSize: 15, color: GRIS });
// Jauge : de l'incomplet au complet.
s.addShape(S.ROUNDED_RECTANGLE, { x: 0.95, y: 3.45, w: 5.2, h: 0.45, rectRadius: 0.22, fill: { color: CARTE }, line: { color: TRAIT, width: 1 }, objectName: "Jauge vide" });
s.addShape(S.ROUNDED_RECTANGLE, { x: 0.95, y: 3.45, w: 5.2, h: 0.45, rectRadius: 0.22, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Jauge pleine" });
texte(s, "incomplet", { x: 0.95, y: 3.98, w: 2, h: 0.3, fontSize: 13, color: GRIS });
texte(s, "complet : rien n'y manque", { x: 3.15, y: 3.98, w: 3.0, h: 0.3, fontSize: 13, bold: true, color: AMBRE, align: "right" });
texte(s, "« parfait non par opposition à imparfait, mais par opposition à incomplet »", { x: 0.95, y: 4.55, w: 5.2, h: 1.0, fontSize: 17, italic: true });
texte(s, "MacArthur, sermon 90-340 (trad.)", { x: 0.95, y: 5.65, w: 5.2, h: 0.3, fontSize: 13, color: GRIS });

carte(s, 6.8, 1.8, 5.9, 4.9, "Mot restaure");
texte(s, "restaure", { x: 7.15, y: 2.0, w: 3.5, h: 0.65, fontFace: "Cambria", fontSize: 34, bold: true, color: AMBRE });
texte(s, "mešîbat (šûb) : faire revenir; avec « âme », ranimer (BDB)", { x: 7.15, y: 2.7, w: 5.3, h: 0.4, fontSize: 15, color: GRIS });
s.addShape(S.CIRCULAR_ARROW, { x: 7.2, y: 3.3, w: 1.3, h: 1.3, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Flèche de retour" });
texte(s, "L'âme ramenée, ranimée, transformée", { x: 8.7, y: 3.55, w: 3.75, h: 0.8, fontSize: 17, bold: true, valign: "middle" });
texte(s, "« La Parole est donc si complète qu'elle peut totalement transformer votre être intérieur, votre personne dans son entier. »", { x: 7.15, y: 4.55, w: 5.25, h: 1.0, fontSize: 16, italic: true });
texte(s, "MacArthur, FRA-80-19", { x: 7.15, y: 5.65, w: 5.2, h: 0.3, fontSize: 13, color: GRIS });
s.addNotes("« Parfaite » : complète. « Ce qui signifie donc que l'Écriture couvre toutes choses » (FRA-80-19). « Restaure » : BDB donne, pour ce verset, ranimer, rafraîchir; MacArthur en dégage la transformation de toute la personne, décision d'interprétation que la largeur du verbe (revenir, se convertir) rend possible. Application : avant de chercher la solution d'un problème de l'âme dans un livre, un balado ou une thérapie, ouvrir le Livre qui restaure l'âme (Street). Ne pas promettre un changement instantané.");

// --- 12. Plus précieux que l'or ---

pres.addSection({ title: "III. La Parole qu'on désire" });
s = nouvelle("III. La Parole qu'on désire", "CONTENU");
s.addText("III · La Parole qu'on désire · 19.11-12", { placeholder: "kicker" });
s.addText("Plus précieux que l'or, plus doux que le miel", { placeholder: "title" });
// Balance : la Parole pèse plus que l'or et le miel.
s.addShape(S.ISOSCELES_TRIANGLE, { x: 2.75, y: 5.05, w: 0.8, h: 0.6, fill: { color: TRAIT }, line: { type: "none" }, objectName: "Socle" });
s.addShape(S.RECTANGLE, { x: 3.1, y: 2.75, w: 0.1, h: 2.35, fill: { color: TRAIT }, line: { type: "none" }, objectName: "Pilier" });
s.addShape(S.LINE, { x: 1.3, y: 2.4, w: 3.7, h: 0.7, line: { color: CLAIR, width: 3 }, objectName: "Fléau" });
s.addShape(S.OVAL, { x: 3.03, y: 2.65, w: 0.24, h: 0.24, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Pivot" });
s.addShape(S.LINE, { x: 1.3, y: 2.4, w: 0, h: 1.2, line: { color: TRAIT, width: 1.25 }, objectName: "Fil gauche" });
s.addShape(S.LINE, { x: 5.0, y: 3.1, w: 0, h: 1.2, line: { color: TRAIT, width: 1.25 }, objectName: "Fil droit" });
s.addText("or fin · miel", { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 3.6, w: 1.4, h: 0.55, rectRadius: 0.1, fill: { color: CARTE }, line: { color: AMBRE, width: 1 }, color: CLAIR, fontSize: 14, align: "center", valign: "middle", margin: 0, objectName: "Plateau or" });
s.addText("la Parole", { shape: S.ROUNDED_RECTANGLE, x: 4.3, y: 4.3, w: 1.4, h: 0.55, rectRadius: 0.1, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, bold: true, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Plateau Parole" });
texte(s, "« Ils sont plus précieux que l'or, que beaucoup d'or fin;\nIls sont plus doux que le miel, que celui qui coule des rayons. » (19.11)", { x: 0.6, y: 5.85, w: 5.2, h: 0.9, fontSize: 14, italic: true });
const valeurs = [
  ["La possession la plus précieuse", "« plus précieux que l'or, que beaucoup d'or fin » (19.11)"],
  ["Le plus grand plaisir", "« plus doux que le miel » (19.11)"],
  ["La plus grande protection", "« Ton serviteur aussi en reçoit instruction » (19.12)"],
  ["Le plus grand profit", "« Pour qui les observe la récompense est grande » (19.12)"],
];
valeurs.forEach(([t, cit], i) => {
  const y = 1.8 + i * 1.15;
  carte(s, 6.2, y, 6.5, 1.0, "Valeur " + (i + 1));
  pastille(s, i + 1, 6.42, y + 0.22);
  texte(s, t, { x: 7.2, y: y + 0.1, w: 5.3, h: 0.4, fontSize: 18, bold: true, color: AMBRE });
  texte(s, cit, { x: 7.2, y: y + 0.52, w: 5.3, h: 0.4, fontSize: 14, italic: true });
});
texte(s, "D'après MacArthur, FRA-80-19", { x: 6.2, y: 6.45, w: 6.5, h: 0.3, fontSize: 12, color: GRIS });
s.addNotes("Phrase clé : on reconnaît ce qu'on aime à ce qu'on est prêt à lâcher pour l'avoir. L'or fin le plus pur, le miel le plus doux que l'auditoire connaissait. La protection : « face à la tentation, au péché et à l'ignorance » (FRA-80-19). « Ton serviteur » (19.12) : le psaume passe du « il » au « je ». Application : la question n'est pas combien de minutes vous lisez la Bible, mais si vous la désirez plus que ce que vous désirez le plus. Un roi devait lire la loi « tous les jours de sa vie » (Deutéronome 17.18-19).");

// --- 13. Section IV ---

pres.addSection({ title: "IV. Le cœur sondé et offert" });
s = nouvelle("IV. Le cœur sondé et offert", "SECTION");
soleil(s, 10.6, 3.6, 1.2, "Halo section IV");
s.addShape(S.HEART, { x: 9.75, y: 2.85, w: 1.7, h: 1.55, fill: { color: NOIR }, line: { color: CLAIR, width: 2 }, objectName: "Cœur" });
s.addText("IV", { placeholder: "kicker" });
s.addText("Le cœur sondé et offert", { placeholder: "title" });
s.addText("« Qui connaît ses égarements?\nPardonne-moi ceux que j'ignore. »", { placeholder: "body" });
s.addText("Psaume 19.13", { placeholder: "ref" });
s.addNotes("Phrase clé : rien ne se dérobe au soleil; rien ne se dérobe à la Parole. Psaume 19.13-15; Nombres 15.27-31. Environ 8 minutes.");

// --- 14. Rien ne se dérobe ---

s = nouvelle("IV. Le cœur sondé et offert", "CONTENU");
s.addText("IV · Le cœur sondé et offert · 19.7 et 19.13", { placeholder: "kicker" });
s.addText("Rien ne se dérobe", { placeholder: "title" });
carte(s, 0.6, 1.8, 5.4, 3.55, "Panneau soleil");
s.addShape(S.OVAL, { x: 0.95, y: 2.1, w: 0.75, h: 0.75, fill: { color: ORANGE }, line: { type: "none" }, objectName: "Icône soleil" });
texte(s, "Le soleil (19.7)", { x: 1.9, y: 2.15, w: 3.9, h: 0.65, fontFace: "Cambria", fontSize: 22, bold: true, valign: "middle" });
texte(s, "« Rien ne se dérobe à sa chaleur »", { x: 0.95, y: 3.1, w: 4.8, h: 0.9, fontSize: 20, italic: true });
s.addText("nistār : caché", { shape: S.ROUNDED_RECTANGLE, x: 0.95, y: 4.3, w: 2.6, h: 0.5, rectRadius: 0.25, fill: { color: ROUILLE }, line: { type: "none" }, color: CLAIR, bold: true, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Pastille nistar" });
carte(s, 7.3, 1.8, 5.4, 3.55, "Panneau Parole");
livre(s, 7.65, 2.2, 0.9, "Icône livre");
texte(s, "La Parole (19.13)", { x: 8.75, y: 2.15, w: 3.8, h: 0.65, fontFace: "Cambria", fontSize: 22, bold: true, valign: "middle" });
texte(s, "« Pardonne-moi ceux que j'ignore »", { x: 7.65, y: 3.1, w: 4.8, h: 0.9, fontSize: 20, italic: true });
s.addText("nistārôt : les fautes cachées", { shape: S.ROUNDED_RECTANGLE, x: 7.65, y: 4.3, w: 3.6, h: 0.5, rectRadius: 0.25, fill: { color: ROUILLE }, line: { type: "none" }, color: CLAIR, bold: true, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Pastille nistarot" });
texte(s, "même mot", { x: 6.0, y: 3.05, w: 1.3, h: 0.35, fontSize: 14, bold: true, color: AMBRE, align: "center" });
s.addShape(S.LINE, { x: 6.12, y: 3.55, w: 1.06, h: 0, line: { color: ORANGE, width: 2.5, beginArrowType: "triangle", endArrowType: "triangle" }, objectName: "Lien même mot" });
texte(s, "Ce que le soleil fait au monde, la Parole le fait au cœur.", { x: 0.6, y: 5.6, w: 12.1, h: 0.55, fontFace: "Cambria", fontSize: 24, bold: true, align: "center" });
texte(s, "« C'est ta Parole qui me purifie, qui me convainc » (MacArthur, sermon 90-341, trad.)", { x: 0.6, y: 6.2, w: 12.1, h: 0.4, fontSize: 15, italic: true, color: GRIS, align: "center" });
s.addNotes("Même verbe, même mode : nistār (19.7) et nistārôt (19.13). Ce que le soleil fait au monde, la Parole le fait au cœur (Kidner). « Qui connaît ses égarements? » : personne. « Je ne connais pas mes propres fautes secrètes […] C'est ta Parole qui me purifie, qui me convainc » (90-341).");

// --- 15. Deux sortes de péchés ---

s = nouvelle("IV. Le cœur sondé et offert", "CONTENU");
s.addText("IV · Le cœur sondé et offert · 19.13-14", { placeholder: "kicker" });
s.addText("Deux sortes de péchés, une même Parole", { placeholder: "title" });
const peches = [
  [0.6, "Les fautes cachées", "« Pardonne-moi ceux que j'ignore » (19.13)", "ignorées : « que je n'ai pas prémédités » (MacArthur)", "La loi : le péché « involontaire » (Nombres 15.27)", "Prière : « Pardonne-moi »"],
  [6.9, "Les péchés d'orgueil", "« Qu'ils ne dominent point sur moi! » (19.14)", "connus : « que je vois et prémédite » (MacArthur)", "La loi : le péché « la main levée » (Nombres 15.30)", "Prière : « Préserve ton serviteur »"],
];
peches.forEach(([x, t, cit, a, b, priere], i) => {
  carte(s, x, 1.75, 5.8, 2.95, "Péché " + (i + 1));
  texte(s, t, { x: x + 0.3, y: 1.9, w: 5.2, h: 0.5, fontFace: "Cambria", fontSize: 22, bold: true, color: AMBRE });
  texte(s, cit, { x: x + 0.3, y: 2.45, w: 5.2, h: 0.45, fontSize: 16, italic: true });
  texte(s, [{ text: a, options: { bullet: true, breakLine: true } }, { text: b, options: { bullet: true } }], { x: x + 0.3, y: 2.95, w: 5.2, h: 0.95, fontSize: 15, paraSpaceAfter: 4 });
  s.addText(priere, { shape: S.ROUNDED_RECTANGLE, x: x + 0.3, y: 4.0, w: 5.2, h: 0.5, rectRadius: 0.1, fill: { color: CARTE }, line: { color: TRAIT, width: 1 }, color: CLAIR, bold: true, fontSize: 15, align: "center", valign: "middle", margin: 0, objectName: "Prière " + (i + 1) });
});
fleche(s, 3.5, 4.72, 1.4, 0.6, { nom: "Vers intègre 1" });
fleche(s, 8.43, 4.72, 1.4, 0.6, { flipH: true, nom: "Vers intègre 2" });
s.addText([{ text: "« Alors je serai intègre »  (êtām, 19.14)", options: { fontFace: "Cambria", bold: true, fontSize: 20, breakLine: true } }, { text: "même famille que « parfaite » (temîmâ, 19.8) : la loi parfaite rend le serviteur intègre", options: { fontSize: 14 } }], { shape: S.ROUNDED_RECTANGLE, x: 2.6, y: 5.35, w: 8.1, h: 1.3, rectRadius: 0.1, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, align: "center", valign: "middle", margin: 0.1, objectName: "Intègre" });
s.addNotes("Fautes cachées : « ceux que je ne prévois pas, que je n'ai pas prémédités » (FRA-80-19). Péchés d'orgueil : « des péchés que je vois et prémédite, je les planifie et je les connais » (FRA-80-19). La loi faisait déjà cette distinction (Nombres 15.27, 30); aucun des deux n'est toléré. Si la question vient : BDB penche pour des hommes présomptueux; MacArthur et la KJF lisent des péchés; le contexte (19.13 parle de fautes, 19.14 conclut sur « grands péchés ») appuie la lecture retenue. Application : pour le péché qui domine, la prière n'est pas « je vais me surveiller », mais « préserve ton serviteur ».");

// --- 16. L'offrande ---

s = nouvelle("IV. Le cœur sondé et offert", "CONTENU");
s.addText("IV · Le cœur sondé et offert · 19.15", { placeholder: "kicker" });
s.addText("Une prière offerte comme un sacrifice", { placeholder: "title" });
s.addText("Les paroles de ma bouche", { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 1.85, w: 3.3, h: 0.95, rectRadius: 0.08, fill: { color: FOND2 }, line: { color: TRAIT, width: 1 }, color: CLAIR, fontSize: 17, bold: true, align: "center", valign: "middle", objectName: "Paroles" });
s.addText("Les sentiments de mon cœur", { shape: S.ROUNDED_RECTANGLE, x: 0.6, y: 3.25, w: 3.3, h: 0.95, rectRadius: 0.08, fill: { color: FOND2 }, line: { color: TRAIT, width: 1 }, color: CLAIR, fontSize: 17, bold: true, align: "center", valign: "middle", objectName: "Sentiments" });
fleche(s, 3.95, 2.33, 0.75, 0.5, { nom: "Paroles vers offrande" });
fleche(s, 3.95, 3.23, 0.75, 0.5, { flipV: true, nom: "Sentiments vers offrande" });
s.addText([{ text: "« Reçois favorablement »", options: { fontFace: "Cambria", bold: true, fontSize: 19, breakLine: true } }, { text: "lerāṣôn : l'agrément d'un sacrifice (BDB; Exode 28.38)", options: { fontSize: 14 } }], { shape: S.ROUNDED_RECTANGLE, x: 4.75, y: 2.0, w: 3.7, h: 2.05, rectRadius: 0.08, fill: { color: ROUILLE }, line: { type: "none" }, color: CLAIR, align: "center", valign: "middle", margin: 0.15, objectName: "Offrande" });
fleche(s, 8.5, 3.02, 0.5, 0, { nom: "Offrande vers l'Éternel" });
s.addText([{ text: "Ô Éternel", options: { fontFace: "Cambria", bold: true, fontSize: 22, breakLine: true } }, { text: "mon rocher", options: { fontSize: 18, breakLine: true } }, { text: "mon rédempteur", options: { fontSize: 18 } }], { shape: S.OVAL, x: 9.15, y: 1.65, w: 3.0, h: 2.75, fill: { color: ORANGE }, line: { type: "none" }, color: NOIR, align: "center", valign: "middle", objectName: "L'Éternel" });
carte(s, 0.6, 4.75, 5.9, 1.95, "Josué 1.8");
texte(s, "Josué 1.8", { x: 0.9, y: 4.9, w: 5.3, h: 0.4, fontSize: 18, bold: true, color: AMBRE });
texte(s, "« Que ce livre de la loi ne s'éloigne point de ta bouche; médite-le jour et nuit » : les paroles et les pensées agréées sont celles que nourrit la loi (MacArthur, 90-341).", { x: 0.9, y: 5.35, w: 5.35, h: 1.25, fontSize: 15 });
carte(s, 6.8, 4.75, 5.9, 1.95, "Rédempteur");
texte(s, "Le rédempteur (gōʾēl)", { x: 7.1, y: 4.9, w: 5.3, h: 0.4, fontSize: 18, bold: true, color: AMBRE });
texte(s, "Le proche parent qui rachète ce que son frère a perdu (Lévitique 25.25). Dieu est nommé refuge et défenseur, non accusateur ni juge (Kidner).", { x: 7.1, y: 5.35, w: 5.35, h: 1.25, fontSize: 15 });
s.addNotes("« Reçois favorablement » : le mot de l'agrément des sacrifices (BDB, Exode 28.38), appliqué ici à des paroles. Quelles paroles et quelles pensées sont agréables à Dieu? MacArthur renvoie à Josué 1.8, que tout Israël connaissait (90-341). « Mon rocher et mon rédempteur » : le gōʾēl rachète ce que son frère a perdu (Lévitique 25.25). Application : demandez à Dieu de vous montrer par sa Parole ce que vous ne voyez pas, et de vous retenir de ce que vous voyez trop bien.");

// --- 17. Conclusion ---

pres.addSection({ title: "Conclusion" });
s = nouvelle("Conclusion", "CONTENU");
s.addText("Conclusion et appel", { placeholder: "kicker" });
s.addText("Ce qu'il faut retenir", { placeholder: "title" });
soleil(s, 1.35, 2.85, 0.32, "Soleil conclusion");
livre(s, 11.15, 2.55, 0.95, "Livre conclusion");
texte(s, [{ text: "Les cieux suffisent à condamner;", options: { breakLine: true } }, { text: "la Parole suffit à sauver.", options: { color: AMBRE } }], { x: 2.4, y: 1.9, w: 8.5, h: 1.9, fontFace: "Cambria", fontSize: 36, bold: true, align: "center", valign: "middle" });
[[0.6, "À l'incroyant", "Le ciel vous a déjà parlé, et vous a laissé sans excuse. Dieu a donné plus qu'un ciel : une Parole, et en elle un Rédempteur. Écoutez la Parole qui restaure l'âme."],
 [6.8, "Au croyant", "Cessez de chercher ailleurs ce que la Parole vous donne. Désirez-la plus que l'or, laissez-la sonder vos fautes cachées, offrez à Dieu vos paroles et vos pensées."]].forEach(([x, t, d], i) => {
  carte(s, x, 4.15, 5.9, 2.3, "Appel " + (i + 1));
  texte(s, t, { x: x + 0.3, y: 4.35, w: 5.3, h: 0.45, fontSize: 20, bold: true, color: AMBRE });
  texte(s, d, { x: x + 0.3, y: 4.9, w: 5.3, h: 1.4, fontSize: 18 });
});
s.addNotes("Synthèse : les cieux parlent à tous, assez pour condamner; la Parole parle à qui l'écoute, assez pour transformer; elle vaut plus que l'or et conduit le serviteur à Dieu, son rocher et son rédempteur. Le gōʾēl de Lévitique 25 rachetait ce que son frère avait perdu; la révélation ultérieure montre en Christ celui qui rachète son peuple. Garder la conclusion à 3 minutes.");

// --- 18. Prière finale ---

s = nouvelle("Conclusion", "CITATION");
soleil(s, 6.67, 7.6, 0.75, "Soleil levant");
s.addText("« Reçois favorablement les paroles de ma bouche\nEt les sentiments de mon cœur,\nÔ Éternel, mon rocher et mon rédempteur! »", { placeholder: "body" });
s.addText("Psaume 19.15", { placeholder: "ref" });
s.addNotes("Prière finale : lire ensemble le Psaume 19.15.");

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

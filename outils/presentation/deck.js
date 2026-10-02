// Présentation « Du ciel qui parle à la Parole qui suffit » (Psaume 19) : gabarit Black Dark Orange Brûlée.
// npm ci, puis node illus.js (images dans img/), puis node deck.js [sortie.pptx].
// Vérifier le rendu : powershell -File render.ps1 <chemin absolu du .pptx> <dossier des PNG>.
// Source du contenu : Plan-Predication-Psaume-19.md (le plan prime; reporter ici toute modification du plan).
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");
const pptxgen = require("pptxgenjs");

const BG = "0D0B0A", CARD = "1A1411", DISC = "2A1A10", OR = "CC5500", OR_LT = "E8742A", OR_DK = "7A3310", INK = "F4EDE4", MUTED = "A89A8C", DIM = "968A80", ASH = "6E5A4C", TRACK = "3A312C";
const THEME = {
  name: "Black Dark Orange Brûlée", headFontFace: "Cambria", bodyFontFace: "Calibri",
  colors: { dk1: BG, lt1: INK, dk2: CARD, lt2: MUTED, accent1: OR, accent2: OR_LT, accent3: OR_DK, accent4: ASH, accent5: DISC, accent6: DIM, hlink: OR_LT, folHlink: MUTED },
};
const HEAD = THEME.headFontFace, BODY = THEME.bodyFontFace;

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 po
pres.author = "André-Guy Bruneau";
pres.title = "Du ciel qui parle à la Parole qui suffit";
pres.subject = "Prédication sur le Psaume 19";
pres.theme = { headFontFace: HEAD, bodyFontFace: BODY };

const img = (n) => path.join(__dirname, "img", n + ".png");
const NBSP = "\u00A0";
// Espaces et traits d'union insécables : « 80-420 », « 19.2-7 » et « Hébreux 1.1-2 » ne se coupent pas en fin de ligne.
const nb = (s) => s.replace(/« /g, "«" + NBSP).replace(/ »/g, NBSP + "»").replace(/ :/g, NBSP + ":")
  .replace(/\b([1-3]) ([A-ZÉ][a-zé]{0,3})\b/g, "$1" + NBSP + "$2").replace(/([A-ZÉ][a-zéèêëû]*) (\d+\.\d+)/g, "$1" + NBSP + "$2")
  .replace(/(\d)-(\d)/g, "$1‑$2");

// Mises en page : le fond vit sur la mise en page, non sur chaque diapositive.
pres.defineSlideMaster({ title: "TITRE", background: { path: img("bg-titre") } });
pres.defineSlideMaster({ title: "CONTENU", background: { color: BG } });
pres.defineSlideMaster({ title: "CONCLUSION", background: { path: img("bg-conclusion") } });

// Sur les diapositives, ni code de sermon ni « BEM » (réservés aux notes) : seule une citation directe garde son auteur,
// « (MacArthur) » ou « (Bible d'étude) »; une référence biblique voisine (« Romains 10.18 ») est conservée.
const SOURCE = /^(?:BEM\b|(?:80|55|90)-\d+|TM\d+-\d+|GTY\d+)/;
function vis(s) {
  return s.replace(/(\s?)\(([^()]*)\)/g, (m, sp, inner, off, str) => {
    const toks = inner.split(/\s*;\s*/);
    if (!toks.some((t) => SOURCE.test(t))) return m;
    const bem = toks.some((t) => /^BEM\b/.test(t)), sermon = toks.some((t) => SOURCE.test(t) && !/^BEM\b/.test(t));
    const citation = /»[\s ]*$/.test(str.slice(0, off));
    const reste = toks.filter((t) => !SOURCE.test(t));
    const garde = [citation ? (sermon ? "MacArthur" : bem ? "Bible d'étude" : "") : "", ...reste].filter(Boolean);
    return garde.length ? `${sp}(${garde.join("; ")})` : "";
  });
}
function text(slide, t, x, y, w, h, o = {}) {
  const runs = Array.isArray(t) ? t.map((r) => ({ ...r, text: nb(vis(r.text)) })) : nb(vis(t));
  slide.addText(runs, { x, y, w, h, fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "top", isTextBox: true, lang: "fr-CA", ...o });
}
function card(slide, x, y, w, h, accent, o = {}) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: o.fill || CARD },
    line: accent ? { color: o.line || OR, width: o.width || 1.5 } : { color: "2E211A", width: 0.75 }, objectName: o.name });
}
const ICONES = {
  soleil: "soleil", etoiles: "étoiles", livre: "livre ouvert", tente: "tente", or: "lingots d'or", miel: "rayon de miel", coeur: "cœur",
  croix: "croix", oeilbarre: "œil barré", cible: "cible", porte: "personne qui s'éloigne", flamme: "flamme", rocher: "sommet rocheux",
  colombe: "colombe", loupe: "loupe", chaine: "chaîne", rocher: "rocher", parchemin: "parchemin", ampoule: "ampoule", oeil: "œil", infini: "infini",
  balance: "balance", joie: "étincelles", avert: "panneau d'avertissement", drapeau: "drapeau d'arrivée", poids: "poids", globe: "globe terrestre",
  mains: "mains jointes", boussole: "boussole", plume: "plume", jour: "disque moitié clair, moitié sombre : le jour et la nuit",
  gestion: "graphique", divertissement: "masques de théâtre", mysticisme: "boule de cristal", psychologie: "cerveau", visualisation: "troisième œil", confession: "porte-voix",
};
function disc(slide, name, x, y, d, terne = false) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: terne ? "1F1915" : DISC }, line: { color: terne ? ASH : OR, width: 1 } });
  slide.addImage({ path: img((terne ? "d-" : "i-") + name), x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6, altText: "Icône : " + ICONES[name] });
}
// Icône dans un disque, titre en gras, description en sourdine.
function ligne(slide, ic, titre, desc, x, y, w, h = 1.0, o = {}) {
  disc(slide, ic, x, y, o.d || 0.62);
  text(slide, [{ text: titre, options: { bold: true, fontSize: o.fs1 || 18, color: o.c1 || INK, breakLine: true } }, { text: desc, options: { color: MUTED } }],
    x + (o.d || 0.62) + 0.2, y - 0.03, w - (o.d || 0.62) - 0.2, h, { fontSize: o.fs2 || 15, paraSpaceBefore: 2 });
}

// Barre de progression : un segment par diapositive, de 43 à 917 pt, 6 pt d'écart; n segments allumés (regroupés par retouche()).
const NB_DIAPOS = 14;
const pt = (v) => v / 72;
function barre(slide, n) {
  const w = (874 - (NB_DIAPOS - 1) * 6) / NB_DIAPOS;
  for (let i = 0; i < NB_DIAPOS; i++)
    slide.addShape(pres.shapes.RECTANGLE, { x: pt(43 + i * (w + 6)), y: pt(514), w: pt(w), h: pt(5), fill: { color: i < n ? OR_LT : TRACK }, line: { type: "none" }, objectName: `Progression ${i + 1}` });
}

// Navigation : les quatre étapes du parcours, en haut à droite.
const STEPS = [["le ciel", 0.85], ["la Parole", 1.1], ["le désir", 0.95], ["le cœur", 0.9]];
function header(slide, kicker, title, phrase, step) {
  text(slide, kicker, 0.6, 0.42, step === undefined ? 12.1 : 7.4, 0.32, { fontSize: 14, bold: true, color: OR_LT, charSpacing: 3, objectName: "Repère de section" });
  text(slide, title, 0.6, 0.74, 12.1, 0.75, { fontFace: HEAD, fontSize: 38, bold: true, align: "left", objectName: "Titre" });
  if (phrase) text(slide, phrase, 0.6, 1.5, 12.1, 0.42, { fontSize: 19, italic: true, color: OR_LT, objectName: "Sous-titre" });
  if (step !== undefined) {
    let x = 12.733 - STEPS.reduce((a, [, w]) => a + w, 0) - 0.15 * (STEPS.length - 1);
    STEPS.forEach(([t, w], i) => {
      text(slide, t, x, 0.42, w, 0.32, { fontSize: 14, align: "center", bold: i === step, color: i === step ? OR_LT : DIM, objectName: "Navigation : " + t });
      x += w + 0.15;
    });
  }
}
const add = (masterName, sectionTitle) => pres.addSlide({ masterName, sectionTitle });

// Notes en balisage léger, mises en forme par retouche() : « # » ligne-titre en gras, « - » puce, « ␣␣- » sous-puce, « **amorce** » en gras.

// ───────────── Ouverture ─────────────
pres.addSection({ title: "Ouverture" });

// 1. Titre
{
  const s = add("TITRE", "Ouverture");
  s.addImage({ path: img("medaillon"), x: 7.35, y: 0.9, w: 5.7, h: 5.7, altText: "Médaillon rayonnant : le ciel étoilé et le soleil au-dessus d'un livre ouvert", objectName: "Illustration" });
  text(s, "PRÉDICATION · PSAUME 19", 0.8, 1.35, 6.5, 0.35, { fontSize: 14, bold: true, color: OR_LT, charSpacing: 3, objectName: "Repère" });
  text(s, "Du ciel qui parle\nà la Parole\nqui suffit", 0.8, 1.8, 6.6, 2.45, { fontFace: HEAD, fontSize: 48, bold: true, lineSpacingMultiple: 0.95, align: "left", objectName: "Titre" });
  text(s, "Psaume 19", 0.8, 4.35, 6, 0.5, { fontSize: 26, color: OR_LT, objectName: "Passage" });
  text(s, [
    { text: "« La loi de l'Éternel est parfaite, elle restaure l'âme; le témoignage de l'Éternel est véritable, il rend sage l'ignorant. »", options: { italic: true, color: "C9BCAD", breakLine: true } },
    { text: "Psaume 19.8", options: { fontSize: 14, color: DIM, paraSpaceBefore: 6 } },
  ], 0.8, 4.95, 6.4, 1.6, { fontSize: 18, paraSpaceAfter: 4, objectName: "Verset" });
  text(s, "André-Guy Bruneau", 0.8, 6.694, 5, 0.35, { fontSize: 16, color: MUTED, objectName: "Prédicateur" });
  barre(s, 1);
  s.addNotes(`# Avant de commencer
- **Lecture publique :** Psaume 19 (en entier).
- **Durée visée :** 45 minutes.
- **Phrase à faire retenir :** Les cieux suffisent à condamner; la Parole suffit à sauver.
- **But :** que l'incroyant comprenne que la création le rend inexcusable sans pouvoir le sauver, et qu'il écoute la Parole qui convertit l'âme; que le croyant cesse de chercher ailleurs ce que la Parole lui donne, la désire plus que l'or, la laisse sonder son cœur et offre à Dieu ses paroles et ses pensées.
- **Citations :** NEG79. Les sermons de MacArthur comptent la suscription hors des versets : leurs « versets 7 à 9 » sont les versets 8 à 10 de la NEG79.
# À éviter
- Attribuer à MacArthur les propos de Street : les citer sous son nom.
- Numérotation : les « versets 7 à 9 » des sermons de MacArthur sont les versets 8 à 10 de la NEG79.
# Avant de monter en chaire
- Relire à voix haute les citations bibliques dans votre Bible NEG79.
- Les citations de MacArthur sont des traductions de passages relus dans les transcriptions de gty.org. Avant de les prononcer, réécouter ou relire au moins 80-420, 80-308 et TM19-6.
- Le tableau du point II affiche les mots de la NEG79; MacArthur lit « claire » et « nette » : le dire à voix haute.
- Préparer à l'écran le tableau des six lignes (diapositive 7) et, pour l'accroche, une image de la stèle de Hammurabi : la diapositive 3 en propose un dessin, à remplacer par une photo au besoin.
- Chronométrer une répétition : le point II est le plus long; les sous-points I.A et III sont les plus faciles à raccourcir.
- Imprimer la version PDF de ce plan.
- **Sur les diapositives :** aucun code de sermon; les sources sont dans ces notes.`);
}

// 2. Rappel
{
  const s = add("CONTENU", "Ouverture");
  header(s, "RAPPEL · 2 TIMOTHÉE 3.16-17", "Toute l'Écriture est soufflée par Dieu", "« Ce que l'Écriture dit, Dieu le dit. »  (55-17)");
  s.addImage({ path: img("souffle"), x: 0.7, y: 2.15, w: 2.75, h: 2.75, altText: "Bible ouverte d'où s'élève un souffle : l'Écriture soufflée par Dieu" });
  text(s, [{ text: "theopneustos", options: { italic: true, bold: true, color: OR_LT, breakLine: true } }, { text: "« soufflée par Dieu »" }], 0.5, 5.0, 3.15, 0.7, { fontSize: 17, align: "center" });
  const rows = [["Enseigner", "donne la vérité qui fait vivre selon Dieu"], ["Convaincre", "met le péché et l'erreur en lumière"],
    ["Corriger", "relève et redresse"], ["Instruire dans la justice", "fait grandir jusqu'à la maturité"]];
  rows.forEach(([t, d], i) => {
    const y = 2.15 + i * 0.8;
    s.addShape(pres.shapes.OVAL, { x: 3.95, y, w: 0.56, h: 0.56, fill: { color: OR }, line: { color: OR } });
    text(s, String(i + 1), 3.95, y, 0.56, 0.56, { fontSize: 19, bold: true, align: "center", valign: "middle", color: "FFFFFF" });
    text(s, [{ text: t, options: { bold: true, fontSize: 19, breakLine: true } }, { text: d, options: { color: MUTED } }], 4.7, y - 0.04, 4.0, 0.8, { fontSize: 15 });
  });
  card(s, 8.95, 2.15, 3.78, 3.2);
  disc(s, "livre", 9.2, 2.38, 0.62);
  text(s, "LECTURE RECOMMANDÉE", 9.97, 2.45, 2.6, 0.5, { fontSize: 13, bold: true, color: OR_LT, charSpacing: 2 });
  text(s, [{ text: "Introduction au counseling biblique", options: { bold: true, italic: true, fontSize: 18, breakLine: true } },
    { text: "Éditions Impact, 2021", options: { color: MUTED, breakLine: true } },
    { text: "Chapitre de John Street : « Pourquoi parler de counseling biblique et non de psychologie? », sur le Psaume 19.", options: { color: MUTED, paraSpaceBefore: 8 } }],
    9.2, 3.2, 3.3, 2.0, { fontSize: 15 });
  card(s, 0.6, 5.75, 12.13, 1.1, true);
  text(s, [{ text: "But : ", options: { bold: true, color: OR_LT } }, { text: "que l'homme de Dieu soit propre, non à la plupart, mais à toutes les bonnes œuvres (55-19).", options: { breakLine: true } },
    { text: "Un psaume de David le disait déjà, dix siècles plus tôt.", options: { italic: true, color: MUTED } }],
    0.9, 5.75, 11.6, 1.1, { fontSize: 17, valign: "middle", paraSpaceAfter: 2 });
  barre(s, 2);
  s.addNotes(`# 2 min · 2 Timothée 3.16-17
- **Lire** 2 Timothée 3.16-17.
- **Theopneustos :** « soufflée par Dieu ». « Ce que l'Écriture dit, Dieu le dit » (55-17).
- **Quatre œuvres :** enseigner, convaincre, corriger, instruire dans la justice; pour que l'homme de Dieu soit propre non à la plupart des bonnes œuvres, mais à toutes (55-19).
- **Pont :** un psaume de David dit la même chose dix siècles plus tôt; c'est le texte que MacArthur tient pour le plus grand sur la suffisance de l'Écriture.
- **Lecture recommandée :** Introduction au counseling biblique (Éditions Impact, 2021), chapitre de John Street sur le Psaume 19.`);
}

// 3. Introduction : d'où vient la loi?
{
  const s = add("CONTENU", "Ouverture");
  header(s, "INTRODUCTION · PSAUME 19.5, 8", "D'où vient la loi?", "Babylone la fait se réclamer du dieu-soleil; le Psaume 19 la remet entre les mains de l'Éternel");
  s.addImage({ path: img("stele"), x: 1.25, y: 2.1, w: 2.45, h: 3.5, altText: "Stèle stylisée : en haut, un roi debout devant le dieu-soleil; en dessous, des lignes d'écriture cunéiforme" });
  text(s, [{ text: "Stèle de Hammurabi (Louvre)", options: { bold: true, breakLine: true } }, { text: "le roi devant Shamash, dieu-soleil et dieu de la justice", options: { color: MUTED } }],
    0.3, 5.68, 4.35, 0.8, { fontSize: 15, align: "center" });
  ligne(s, "soleil", "Autour d'Israël", "Shamash, dieu-soleil et dieu de la justice : la loi du roi se réclame de lui.", 4.75, 2.45, 4.0, 1.25);
  ligne(s, "livre", "Psaume 19", "Le soleil loge sous une tente que Dieu a dressée (19.5); la loi est celle de l'Éternel (19.8).", 4.75, 3.95, 4.0, 1.25, { c1: OR_LT });
  s.addImage({ path: img("tente-loi"), x: 9.2, y: 2.1, w: 3.4, h: 3.4, altText: "Médaillon : le soleil sous une tente, et au-dessus un livre ouvert rayonnant" });
  text(s, [{ text: "Le soleil, une créature", options: { bold: true, color: OR_LT, breakLine: true } }, { text: "la loi, entre les mains de l'Éternel", options: { color: MUTED } }],
    8.95, 5.72, 3.9, 0.8, { fontSize: 15, align: "center" });
  text(s, "Où allez-vous chercher la vérité qui gouverne votre vie?", 0.6, 6.55, 12.1, 0.45, { fontSize: 21, italic: true, align: "center" });
  barre(s, 3);
  s.addNotes(`# 4 min · Psaume 19.5, 8
# Accroche
- Au Louvre, la stèle du code de Hammurabi montre le roi debout devant Shamash, le dieu-soleil et dieu de la justice, qui lui remet les insignes du pouvoir : la loi du roi se réclame du soleil.
- Le Psaume 19 parle lui aussi du soleil et de la loi; mais il loge le soleil sous une tente que Dieu a dressée (19.5), et il ne place la loi qu'entre les mains de l'Éternel (19.8).
# Question
- Où allez-vous chercher la vérité qui gouverne votre vie, quand l'angoisse monte ou qu'une décision presse?`);
}

// 4. Le texte : un seul hymne, deux révélations
{
  const s = add("CONTENU", "Ouverture");
  header(s, "LE TEXTE · PSAUME 19", "Un seul hymne, deux révélations", "Le même Dieu parle sans paroles, puis par des paroles qui suffisent");
  const band = (x, w, accent, kick, titre, desc, nom, n) => {
    card(s, x, 2.1, w, 1.75, true, { line: accent ? OR_LT : ASH, width: accent ? 2 : 1, fill: accent ? DISC : CARD });
    text(s, kick, x + 0.3, 2.28, w - 0.6, 0.3, { fontSize: 13, bold: true, color: accent ? OR_LT : DIM, charSpacing: 2 });
    text(s, [{ text: titre, options: { bold: true, fontSize: 21, breakLine: true } }, { text: desc, options: { color: MUTED } }], x + 0.3, 2.62, w - (n > 1 ? 2.4 : 1.35), 1.15, { fontSize: 15 });
    for (let i = 0; i < n; i++)
      s.addShape(pres.shapes.OVAL, { x: x + w - 0.45 - (n - 1 - i) * 0.27, y: 2.75, w: 0.18, h: 0.18, fill: { color: accent ? OR_LT : ASH }, line: { type: "none" }, objectName: nom + " " + (i + 1) });
    text(s, nom + " × " + n, x + w - 2.1, 3.05, 1.8, 0.4, { fontSize: 15, bold: true, color: accent ? OR_LT : MUTED, align: "right" });
  };
  band(0.6, 4.6, false, "PSAUME 19.2-7", "Révélation générale", "le monde · El, Dieu de puissance", "El", 1);
  band(5.45, 7.28, true, "PSAUME 19.8-15", "Révélation spéciale", "la Parole · l'Éternel, le Dieu de l'alliance", "l'Éternel", 7);
  const etape = (x, w, ic, num, titre, ref, bem) => {
    card(s, x, 4.1, w, 2.35);
    disc(s, ic, x + 0.25, 4.3, 0.62);
    text(s, num, x + 1.02, 4.38, w - 1.2, 0.45, { fontSize: 16, bold: true, color: OR_LT });
    text(s, [{ text: titre, options: { bold: true, fontSize: 18, breakLine: true } }, { text: ref, options: { color: OR_LT, breakLine: true } }, { text: bem, options: { color: MUTED, fontSize: 14 } }],
      x + 0.25, 5.05, w - 0.45, 1.35, { fontSize: 15 });
  };
  etape(0.6, 4.6, "soleil", "I", "Le ciel qui parle", "Psaume 19.2-7", "Proclamation des cieux (19.2-5b), importance du soleil (19.5c-7)");
  etape(5.45, 2.27, "livre", "II", "La Parole qui suffit", "Psaume 19.8-10", "Attributs de la Parole");
  etape(7.955, 2.27, "or", "III", "La Parole qu'on désire", "Psaume 19.11-12", "Appréciation");
  etape(10.46, 2.27, "coeur", "IV", "Le cœur qui s'offre", "Psaume 19.13-15", "Application");
  text(s, "« Je pense que c'est le plus grand passage, à lui seul, sur la suffisance de l'Écriture dans toute la Bible »  (80-18)", 0.6, 6.6, 12.1, 0.38, { fontSize: 14, italic: true, color: MUTED, align: "center" });
  barre(s, 4);
  s.addNotes(`# Le texte et le parcours
- « Je pense que c'est le plus grand passage, à lui seul, sur la suffisance de l'Écriture dans toute la Bible » (80-18).
- **Un seul hymne, deux révélations :** le nom court El, la puissance du Créateur (19.2); puis l'Éternel, le Dieu de l'alliance (19.8-15) (BEM, 19.1-15).
- « Six fois, nous avons le nom de l'alliance, l'Éternel, comme source de la Parole de Dieu » (TM19-6); une septième fois en 19.15.
- **Plan de la BEM :** I. Révélation générale (19.2-7) : proclamation des cieux, importance du soleil. II. Révélation spéciale (19.8-15) : attributs, appréciation, application.
- **Parcours :** le ciel qui parle, la Parole qui suffit, la Parole qu'on désire, le cœur qui s'offre.`);
}

// ───────────── I. Le ciel qui parle ─────────────
pres.addSection({ title: "I. Le ciel qui parle" });

// 5. I.A-B
{
  const s = add("CONTENU", "I. Le ciel qui parle");
  header(s, "I · PSAUME 19.2-7", "Le ciel qui parle", "La création vous a parlé de Dieu chaque jour de votre vie", 0);
  s.addImage({ path: img("ciel"), x: 0.45, y: 2.05, w: 7.0, h: 3.94, altText: "La course du soleil dans le ciel étoilé, d'une tente à l'horizon jusqu'à l'autre extrémité des cieux" });
  let cx = 0.6;
  [["L'époux et le héros", "19.6", 2.0], ["Ni dieu ni législateur", "19.5c-7", 2.1], ["Rien ne se dérobe à sa chaleur", "19.7", 2.75]].forEach(([t, r, w]) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: cx, y: 6.1, w, h: 0.8, rectRadius: 0.2, fill: { color: DISC }, line: { color: OR, width: 1 } });
    text(s, [{ text: t, options: { bold: true, breakLine: true } }, { text: r, options: { color: OR_LT, fontSize: 13 } }], cx + 0.1, 6.1, w - 0.2, 0.8, { fontSize: 14, align: "center", valign: "middle" });
    cx += w + 0.1;
  });
  ligne(s, "etoiles", "Une proclamation incessante", "« Racontent », « manifeste » : la révélation ne s'interrompt jamais (BEM, 19.2).", 7.8, 2.15, 4.93, 1.1);
  ligne(s, "poids", "La gloire, c'est le poids", "Kavod : le ciel nocturne fait sentir le poids de Dieu (Street).", 7.8, 3.35, 4.93, 1.1);
  ligne(s, "jour", "Le jour en instruit un autre", "Le verbe veut dire bouillonner : la révélation jaillit (Street).", 7.8, 4.55, 4.93, 1.1);
  ligne(s, "globe", "Sans paroles, et partout", "Pas de mots au sens littéral, mais un message qui atteint toute la terre (BEM; Romains 10.18).", 7.8, 5.75, 4.93, 1.2);
  barre(s, 5);
  s.addNotes(`# 9 min (avec la diapositive suivante) · Psaume 19.2-7
- **Phrase clé :** la création vous a parlé de Dieu chaque jour de votre vie.
# A. Une proclamation incessante (19.2-5b)
- Les cieux et l'étendue, deux éléments décisifs de la création de Genèse 1 (BEM, 19.2). « Racontent », « manifeste » : la révélation ne s'interrompt jamais (BEM, 19.2); Street y voit une action en cours.
- **Kavod :** la « gloire », c'est d'abord le poids; le ciel nocturne fait sentir le poids de Dieu (Street).
- **Bouillonner :** le jour « en instruit » un autre; le verbe veut dire bouillonner, la révélation jaillit (Street).
- **Sans paroles, et pourtant partout (19.4-5) :** la contradiction n'est qu'apparente, le message ne passe pas par des mots au sens littéral (BEM, 19.3-4). Paul cite le verset 5 en Romains 10.18.
# B. Un soleil qui n'est pas un dieu (19.5c-7)
- L'époux qui sort de sa chambre, le héros qui court sa carrière : régularité, puissance, détermination (Street).
- Ni le soleil ni les cieux ne sont divinisés, comme dans les religions païennes : Dieu est le créateur et le chef de toute la création (BEM, 19.5c-7). Retour à l'accroche.
- « Rien ne se dérobe à sa chaleur » (19.7) : nul ne peut fuir ce message (Street).`);
}

// 6. I.C Assez pour condamner
{
  const s = add("CONTENU", "I. Le ciel qui parle");
  header(s, "I · PSAUME 19.2-7 / ROMAINS 1.18-20", "Assez pour condamner, jamais pour sauver", "« Ce qu'on ne peut pas connaître, c'est la sagesse qui sauve »  (TM19-6)", 0);
  const col = (x, accent, ic, titre, sous, rows) => {
    card(s, x, 2.1, 5.9, 3.0, true, { line: accent ? OR_LT : ASH, width: accent ? 2 : 1, fill: accent ? DISC : CARD });
    disc(s, ic, x + 0.35, 2.32, 0.7);
    text(s, [{ text: titre, options: { bold: true, fontSize: 22, color: accent ? OR_LT : INK, breakLine: true } }, { text: sous, options: { color: MUTED } }], x + 1.25, 2.3, 4.4, 0.8, { fontSize: 15 });
    rows.forEach(([l, v], i) => {
      const y = 3.3 + i * 0.58;
      text(s, l.toUpperCase(), x + 0.35, y + 0.05, 1.95, 0.4, { fontSize: 13, bold: true, color: accent ? OR_LT : DIM, charSpacing: 1 });
      text(s, v, x + 2.4, y, 3.3, 0.5, { fontSize: 17 });
    });
  };
  col(0.6, false, "soleil", "Le monde", "révélation générale", [["Fait connaître", "sa puissance et sa divinité"], ["Effet", "rend l'homme inexcusable"], ["Limite", "le cœur retient la vérité captive"]]);
  col(6.83, true, "livre", "La Parole", "révélation spéciale", [["Fait connaître", "la sagesse qui sauve"], ["Effet", "sauve et transforme"], ["Moyen", "l'Esprit applique la Parole (BEM)"]]);
  card(s, 0.6, 5.35, 12.13, 1.6, true);
  text(s, [{ text: "Les cieux suffisent à condamner; la Parole suffit à sauver.", options: { fontFace: HEAD, fontSize: 28, bold: true, italic: true, color: OR_LT, breakLine: true } },
    { text: "« La révélation de Dieu dans le monde : assez pour condamner, assez pour damner. La révélation dans la Parole : suffisante pour sauver, suffisante pour sauver » (80-420)", options: { fontSize: 14, color: MUTED } }],
    0.9, 5.35, 11.53, 1.6, { align: "center", valign: "middle", paraSpaceAfter: 4 });
  barre(s, 6);
  s.addNotes(`# I.C · Assez pour condamner, jamais pour sauver (Romains 1.18-20)
- Le témoignage est clair et cohérent, mais l'humanité pécheresse lui résiste; il ne peut donc pas convertir, mais il rend entièrement responsable (BEM, 19.2-7).
- « Quand ils étouffent la vérité de Dieu, ils sont sans excuse, et cette révélation suffit à condamner le monde à l'enfer » (80-420).
- « Selon Romains 1, on peut connaître sa divinité et sa puissance en regardant la création. Ce qu'on ne peut pas connaître, c'est la sagesse qui sauve » (TM19-6).
- « La révélation de Dieu dans le monde : assez pour condamner, assez pour damner. La révélation dans la Parole : suffisante pour sauver, suffisante pour sauver » (80-420).
# Application
- Personne n'est un incroyant innocent : les cieux ont parlé à chacun. « Je trouve Dieu dans la nature » ne suffit pas, car le cœur retient la vérité captive (Romains 1.18).
- Le croyant adore devant le ciel étoilé, mais ne lui demande ni le salut ni la direction de son âme.
# Transition
- « Le psalmiste passe du monde à la Parole au verset 7 » (80-420; verset 8 de la NEG79), et El devient l'Éternel. Où entendre la sagesse qui sauve?
# À éviter
- Traiter les versets 2 à 7 comme une simple introduction poétique, ou, à l'inverse, comme une révélation qui sauve : elle rend inexcusable, sans convertir (BEM, 19.2-7).
- Oublier la résistance du cœur pécheur : le problème n'est pas que la création soit obscure, mais que l'homme retient la vérité captive.`);
}

// ───────────── II. La Parole qui suffit ─────────────
pres.addSection({ title: "II. La Parole qui suffit" });

// 7. Les six lignes
{
  const s = add("CONTENU", "II. La Parole qui suffit");
  header(s, "II · PSAUME 19.8-10", "La Parole qui suffit", "Six titres, six qualités, six bienfaits : six fois « l'Éternel »  (TM19-6)", 1);
  [["TITRE", 0.85], ["QUALITÉ · NEG79 / MACARTHUR", 4.55], ["BIENFAIT", 8.35]].forEach(([t, x]) =>
    text(s, t, x, 2.0, 3.6, 0.3, { fontSize: 13, bold: true, color: DIM, charSpacing: 1 }));
  const L = [
    ["la loi", "parfaite", "complète", "coeur", "restaure l'âme"],
    ["le témoignage", "véritable", "sûr", "ampoule", "rend sage l'ignorant"],
    ["les ordonnances", "droites", "le droit chemin", "joie", "réjouissent le cœur"],
    ["les commandements", "purs", "clairs", "oeil", "éclairent les yeux"],
    ["la crainte", "pure", "nette", "infini", "subsiste à toujours"],
    ["les jugements", "vrais", "absolument vrais", "balance", "tous justes"],
  ];
  L.forEach(([t, q, m, ic, b], i) => {
    const y = 2.4 + i * 0.74;
    card(s, 0.6, y, 12.13, 0.64, i === 0, { name: "Ligne " + (i + 1) });
    text(s, [{ text: t, options: { bold: true, fontSize: 19 } }, { text: " de l'Éternel", options: { color: MUTED, fontSize: 15 } }], 0.85, y, 3.6, 0.64, { valign: "middle" });
    text(s, [{ text: q, options: { bold: true, italic: true, color: OR_LT, fontSize: 19 } }, { text: "  · " + m, options: { color: MUTED, fontSize: 15 } }], 4.55, y, 3.0, 0.64, { valign: "middle" });
    s.addShape(pres.shapes.LINE, { x: 7.6, y: y + 0.32, w: 0.55, h: 0, line: { color: OR, width: 2, endArrowType: "triangle" } });
    disc(s, ic, 8.35, y + 0.08, 0.48);
    text(s, b, 9.0, y, 3.6, 0.64, { fontSize: 18, valign: "middle" });
  });
  barre(s, 7);
  s.addNotes(`# 13 min (avec les deux diapositives suivantes) · Psaume 19.8-10
- **Phrase clé :** il ne manque rien à la Parole, et il ne manque rien à celui qu'elle instruit.
- **Le cadre :** six titres, six qualités, six bienfaits (80-19; 80-308); « six fois, nous avons le nom de l'alliance, l'Éternel, comme source de la Parole de Dieu » (TM19-6).
- **Lecture de MacArthur :** parfaite, sûre, droite, claire, nette, vraie (80-308). Le tableau affiche les mots de la NEG79; dire à voix haute « claire » et « nette ».
- **Montrer** que le bienfait découle chaque fois de la qualité : parce qu'elle est complète, elle restaure; parce qu'elle est sûre, elle rend sage; et ainsi de suite.`);
}

// 8. II.A-C
{
  const s = add("CONTENU", "II. La Parole qui suffit");
  header(s, "II · PSAUME 19.8-10 / 2 PIERRE 1.16-19", "Complète, sûre, pure", "« On ne peut rien lui retrancher; on ne peut rien lui ajouter »  (80-420)", 1);
  const col = (x, ic, titre, ref, items) => {
    card(s, x, 2.1, 3.88, 4.85, ic === "livre");
    disc(s, ic, x + 0.28, 2.32, 0.66);
    text(s, [{ text: titre, options: { bold: true, fontSize: 20, breakLine: true } }, { text: ref, options: { color: OR_LT } }], x + 1.12, 2.3, 2.6, 0.8, { fontSize: 15 });
    text(s, items.map((it, i) => ({ text: it, options: { bullet: { indent: 14 }, breakLine: i < items.length - 1 } })), x + 0.28, 3.3, 3.35, 3.5, { fontSize: 15, paraSpaceAfter: 9, color: INK });
  };
  col(0.6, "livre", "Complète", "Psaume 19.8a", [
    "« Loi » : mieux rendue par « enseignement » (BEM).",
    "« Parfaite » : au sens de complétude, non seulement d'irréprochable (80-308).",
    "« Restaure l'âme » : convertir, transformer, régénérer par l'œuvre de l'Esprit (80-308).",
    "La S21 dit « donne du réconfort » : la Parole fait bien plus que consoler."]);
  col(4.725, "boussole", "Sûre et claire", "Psaume 19.8b-9", [
    "Plus sûre que l'expérience : Pierre, témoin de la transfiguration (2 Pierre 1.16-19; 80-250).",
    "L'« ignorant » : le naïf, sans discernement; l'Écriture lui apporte la sagesse (80-19).",
    "« Sage » : maîtriser l'art de vivre (80-250).",
    "« La Parole est le sentier » (80-250).",
    "« Purs » : clairs, ils éclairent les yeux (80-308)."]);
  col(8.85, "mains", "Pure et vraie", "Psaume 19.10", [
    "« Crainte » : l'Écriture, guide pour l'adoration (BEM); « un manuel du culte » (80-308).",
    "Nette, « sans tache, sans défaut » (80-308) : jamais de mise à jour (80-19).",
    "« Absolument, sans équivoque, vrai » (80-308)."]);
  barre(s, 8);
  s.addNotes(`# A. Elle est complète et transforme (19.8a)
- La « loi » serait mieux rendue par « enseignement » (BEM, 19.8; cf. Psaume 1.2).
- « Parfaite » (tamim) : « non pas au sens d'irréprochable, bien que ce soit absolument vrai, mais au sens de complétude » (80-308). « On ne peut rien lui retrancher; on ne peut rien lui ajouter » (80-420).
- « La Bible est complète, elle est parfaite en ce qu'elle fournit tout ce qu'il faut pour connaître la loi de Dieu, ce qui produit le bienfait de transformer totalement l'âme » (80-250).
- « Restaure l'âme » : « une instruction divine si complète qu'elle peut transformer totalement l'homme intérieur tout entier » (80-420); « une déclaration d'une portée immense sur le pouvoir de la Bible de convertir, de transformer, de régénérer par l'œuvre de l'Esprit de Dieu au moyen de son propre témoignage » (80-308).
- La S21 dit « donne du réconfort » : la Parole fait bien plus que consoler. Street rapproche Hébreux 4.12.
# B. Elle est sûre et claire (19.8b-9)
- Le « témoignage » témoigne de son auteur divin (BEM, 19.8). « Il est fiable, digne de confiance. Et il y a beaucoup de livres dans le monde auxquels on ne peut pas se fier » (80-308).
- Pierre, témoin de la transfiguration, tient la Parole pour plus sûre que ce qu'il a vu (2 Pierre 1.16-19; 80-250).
- « L'Écriture prend le naïf, l'inexpérimenté, l'homme sans discernement, le mal informé, et lui apporte la sagesse » (80-19). « Sage » (chakam) : « maîtriser l'art de vivre, vivre en parfait accord avec la connaissance de Dieu » (80-250).
- Les « ordonnances », moyens par lesquels Dieu gouverne (BEM, 19.9) : « La Parole n'est pas seulement une lampe à nos pieds qui éclaire le sentier, la Parole est le sentier » (80-250).
- Les « commandements » lient; MacArthur les lit « clairs » (S21 : « clairs »; NEG79 : « purs ») (80-308; TM19-6).
# C. Elle est pure et vraie (19.10)
- La « crainte » : l'Écriture comme « guide pour l'adoration de Dieu » (BEM, 19.10); « La Bible est un manuel du culte; elle vous dit comment adorer le Seigneur en esprit et en vérité » (80-308).
- Nette, « sans tache, sans défaut » (80-308), elle « subsiste à toujours » : jamais besoin de mise à jour (80-19).
- Les « jugements », verdicts de Dieu (BEM, 19.10) : « Il est vrai. Je ne saurais trop insister. Dans un monde de mensonges, dans un monde de tromperie, il est vrai; il est absolument, sans équivoque, vrai » (80-308).
# Synthèse
- La Parole « fournit tout ce qu'il faut » (80-250) : toute l'Écriture rend l'homme de Dieu accompli (2 Timothée 3.16-17). Retour au Rappel.
# À éviter
- Affaiblir « restaure l'âme » en simple réconfort : c'est la conversion et la transformation de la personne entière (80-308).
- Réduire « parfaite » à « sans défaut » : MacArthur y entend d'abord la complétude (80-308).
- Isoler la « crainte » de la liste : c'est l'Écriture comme guide de l'adoration.`);
}

// 9. II. Application : ce qui tient lieu de Parole
{
  const s = add("CONTENU", "II. La Parole qui suffit");
  header(s, "II · APPLICATION", "Ce qui tient lieu de Parole", "Vers quoi vous tournez-vous en premier quand votre âme est troublée?", 1);
  s.addImage({ path: img("livre"), x: 5.12, y: 2.05, w: 3.1, h: 3.1, altText: "Livre ouvert rayonnant au centre : la Parole qui suffit" });
  const subs = [["gestion", "Techniques de gestion"], ["divertissement", "Divertissement"], ["mysticisme", "Mysticisme"],
    ["psychologie", "Psychologie"], ["visualisation", "Visualisation"], ["confession", "Confession positive"]];
  subs.forEach(([ic, t], i) => {
    const x = i < 3 ? 0.6 : 8.63, y = 2.15 + (i % 3) * 1.0;
    card(s, x, y, 4.1, 0.82, false, { fill: "15110E" });
    disc(s, ic, x + 0.17, y + 0.11, 0.6, true);
    text(s, t, x + 0.95, y, 3.0, 0.82, { fontSize: 18, color: MUTED, valign: "middle" });
  });
  text(s, "Ce qui, dans l'Église, prend la place de la Parole : MacArthur, 1985 (80-18)", 0.6, 5.3, 12.13, 0.35, { fontSize: 14, italic: true, color: DIM, align: "center" });
  card(s, 0.6, 5.85, 12.13, 1.1, true);
  text(s, [{ text: "Street : ", options: { bold: true, color: OR_LT } },
    { text: "la révélation générale n'autorise pas à chercher hors de l'Écriture l'autorité sur les problèmes de l'âme; ce serait ajouter à la Parole (Proverbes 30.5-6)." }],
    0.9, 5.85, 11.53, 1.1, { fontSize: 17, valign: "middle" });
  barre(s, 9);
  s.addNotes(`# Application
- En 1985, MacArthur passait en revue ce qui tient lieu de Parole dans l'Église : techniques de gestion, divertissement, mysticisme, psychologie, visualisation, confession positive (80-18).
- **Street :** la révélation générale n'autorise pas à chercher hors de l'Écriture l'autorité sur les problèmes de l'âme; ce serait ajouter à la Parole (Proverbes 30.5-6).
- **Question :** vers quoi vous tournez-vous en premier quand votre âme est troublée?
# À éviter
- Faire de la suffisance un mépris des sciences : Street reconnaît les bienfaits de la révélation naturelle en sciences et en médecine; la suffisance vise le domaine de l'âme.
# Transition
- Si la Parole est tout cela, que vaut-elle à nos yeux?`);
}

// ───────────── III. La Parole qu'on désire ─────────────
pres.addSection({ title: "III. La Parole qu'on désire" });

// 10. III
{
  const s = add("CONTENU", "III. La Parole qu'on désire");
  header(s, "III · PSAUME 19.11-12", "Plus précieuse que l'or", "Ce que vous désirez le plus révèle ce que vous estimez le plus", 2);
  s.addImage({ path: img("balance"), x: 0.45, y: 2.0, w: 5.7, h: 4.75, altText: "Balance : l'or et le miel d'un côté, plus légers que le livre ouvert de l'autre" });
  ligne(s, "or", "L'or, le bien suprême d'ici-bas", "Plus précieuse que beaucoup d'or fin, l'or affiné (80-251).", 6.6, 2.15, 6.13, 1.0);
  ligne(s, "miel", "Le miel, le délice des délices", "Plus douce que celui qui coule des rayons (80-251).", 6.6, 3.2, 6.13, 1.0);
  ligne(s, "avert", "Elle avertit (19.12)", "« La Parole de Dieu est pleine d'avertissements » (80-251).", 6.6, 4.25, 6.13, 1.0);
  ligne(s, "drapeau", "Une grande récompense", "« En les gardant, il y a la fin » : non ici et maintenant, mais la gloire à venir (80-19; 80-251).", 6.6, 5.3, 6.13, 1.05);
  text(s, "Votre agenda dit ce qui est votre or.", 6.6, 6.5, 6.13, 0.45, { fontSize: 20, italic: true, color: OR_LT });
  barre(s, 10);
  s.addNotes(`# 5 min · Psaume 19.11-12
- **Phrase clé :** ce que vous désirez le plus révèle ce que vous estimez le plus.
- **Plus précieuse que l'or affiné (paz), plus douce que le miel des rayons (19.11) :** « L'or, dans l'Antiquité, était le bien suprême d'ici-bas »; « le délice des délices, en ce temps-là, c'était le miel » (80-251). Le plus grand bien qu'on puisse posséder, le plus grand plaisir qu'on puisse goûter (80-19; TM19-6).
- **Elle avertit (19.12) :** « La Parole de Dieu est pleine d'avertissements. Et celui qui la connaît est dûment averti » (80-251). La KJF dit « est averti ».
- **Une récompense grande :** « La vraie récompense n'est pas ici et maintenant », ni la confession positive ni la visualisation de ce qu'on veut tout de suite (80-19). « L'hébreu se lit littéralement ainsi : en les gardant, il y a la fin. La fin » (80-251).
- **La douceur se goûte dans le respect :** les noms mêmes de la Parole commandent de l'aborder avec le plus grand respect, non avec désinvolture (Street).
# Application
- Votre agenda dit ce qui est votre or. Si la Parole vous paraît fade, le diagnostic porte sur le cœur, non sur la Bible : demandez à Dieu de vous la rendre douce.
# À éviter
- Lire « la récompense est grande » comme une prospérité terrestre (80-19; 80-251).
# Transition
- La Parole qui éclaire les yeux tourne alors sa lumière vers le cœur du psalmiste.`);
}

// ───────────── IV. Le cœur qui s'offre ─────────────
pres.addSection({ title: "IV. Le cœur qui s'offre" });

// 11. IV.A-B : trois degrés
{
  const s = add("CONTENU", "IV. Le cœur qui s'offre");
  header(s, "IV · PSAUME 19.13-14 / NOMBRES 15.22-31", "Le cœur sondé et gardé", "« Qui connaît ses égarements? » Réponse : personne, sans la Parole (Street)", 3);
  const D = [
    ["oeilbarre", "Égarements", "Péchés d'ignorance, non intentionnels (TM19-6; BEM).", "Lévitique 4 : un sacrifice prévu", "« Pardonne-moi » : acquitte-moi", ASH, 1, CARD],
    ["cible", "Péchés présomptueux", "Délibérés : ceux que je vois, prémédite et planifie (80-19).", "Nombres 15.30-31 : aucun sacrifice", "« Préserve aussi ton serviteur »", OR, 1.5, "22150F"],
    ["porte", "Grande transgression", "La rébellion ouverte (TM19-6) : se détourner du Seigneur (80-251).", "Le terme de la pente", "« Innocent de grands péchés »", OR_LT, 2.5, DISC],
  ];
  D.forEach(([ic, t, d, tag, priere, line, width, fill], i) => {
    const x = 0.6 + i * 4.125;
    card(s, x, 2.1, 3.83, 3.35, true, { line, width, fill });
    disc(s, ic, x + 0.28, 2.32, 0.66);
    text(s, String(i + 1), x + 3.1, 2.3, 0.5, 0.5, { fontSize: 26, bold: true, fontFace: HEAD, color: i === 0 ? DIM : line, align: "right" });
    text(s, [{ text: t, options: { bold: true, fontSize: 20, breakLine: true } }, { text: d, options: { color: MUTED } }], x + 0.28, 3.12, 3.3, 1.35, { fontSize: 15 });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.28, y: 4.42, w: 3.27, h: 0.42, rectRadius: 0.2, fill: { color: BG }, line: { color: line, width: 1 } });
    text(s, tag, x + 0.28, 4.42, 3.27, 0.42, { fontSize: 13, color: INK, align: "center", valign: "middle", wrap: false });
    text(s, priere, x + 0.28, 4.93, 3.3, 0.4, { fontSize: 15, italic: true, color: OR_LT });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 3.86, y: 3.75, w: 0.24, h: 0, line: { color: OR_LT, width: 2, endArrowType: "triangle" } });
  });
  card(s, 0.6, 5.7, 5.95, 1.25);
  ligne(s, "chaine", "« Qu'ils ne dominent point sur moi! »", "Les péchés connus asservissent (Street).", 0.85, 5.92, 5.5, 0.95, { fs1: 17 });
  card(s, 6.78, 5.7, 5.95, 1.25, true);
  ligne(s, "colombe", "Un disciple mûr", "que la grâce et les ressources de Dieu amènent à reconnaître et à combattre ses péchés (BEM).", 7.03, 5.92, 5.5, 0.95, { fs1: 17, c1: OR_LT });
  barre(s, 11);
  s.addNotes(`# 8 min (avec la diapositive suivante) · Psaume 19.13-15
- **Phrase clé :** la Parole qui me montre mon péché me conduit à mon Rédempteur.
# A. Les fautes que je ne vois pas (19.13)
- « Qui connaît ses égarements? » Réponse : personne, sans la Parole (Street).
- **Égarements :** péchés d'ignorance (TM19-6), non intentionnels, ceux pour lesquels la loi prévoyait un sacrifice (BEM, 19.13-14; Lévitique 4).
- MacArthur lit « acquitte-moi des fautes cachées » (80-251; 80-308); la NEG79 dit « pardonne-moi », la KJF « nettoie-moi ».
# B. Les fautes que je vois (19.14)
- « Les égarements sont des péchés d'ignorance. Les péchés présomptueux sont des péchés délibérés. La grande transgression est la rébellion ouverte » (TM19-6). David prie de ne jamais aller jusqu'à se détourner du Seigneur (80-251).
- La NEG79 dit « des orgueilleux »; la KJF, « des péchés présomptueux » : ceux que je vois, prémédite et planifie (80-19).
- La loi distinguait le péché par inadvertance, qui avait son sacrifice, et le péché commis par défi, qui n'en avait pas (Nombres 15.30-31); la BEM renvoie à Nombres 15.22ss (19.13-14).
- « Qu'ils ne dominent point sur moi! » : les péchés connus asservissent celui qui les commet en sachant que ce sont des péchés (Street).
- Ce n'est pas du scrupule : c'est l'attitude d'un disciple mûr que la grâce et les ressources de Dieu amènent à reconnaître et à combattre ses péchés (BEM, 19.13-14).
# À éviter
- Lire « des orgueilleux » (NEG79) comme des ennemis extérieurs, au détriment des péchés présomptueux.`);
}

// 12. IV.C : le cœur offert
{
  const s = add("CONTENU", "IV. Le cœur qui s'offre");
  header(s, "IV · PSAUME 19.15", "Le cœur qui s'offre", "« Reçois favorablement les paroles de ma bouche et les sentiments de mon cœur »", 3);
  s.addImage({ path: img("autel"), x: 0.5, y: 2.05, w: 4.75, h: 4.75, altText: "Autel de pierres où brûle une flamme; au-dessus s'élèvent un cœur et une bulle de parole" });
  ligne(s, "flamme", "Reçois favorablement", "Le vocabulaire des sacrifices agréés : David dépose sur l'autel ses lèvres et sa vie (BEM).", 5.6, 2.15, 7.13, 1.0);
  ligne(s, "parchemin", "Bouche et méditation", "L'écho de Josué 1.8 : la loi méditée jour et nuit (BEM; TM19-6).", 5.6, 3.25, 7.13, 1.0);
  ligne(s, "rocher", "Mon rocher et mon rédempteur", "Le goel : le parent proche qui paie pour racheter (Lévitique 25.25).", 5.6, 4.35, 7.13, 1.0);
  ligne(s, "croix", "Le Rédempteur a un nom", "Christ s'est donné pour nous racheter (Tite 2.14); par lui, le sacrifice de louange (Hébreux 13.15).", 5.6, 5.45, 7.13, 1.0, { c1: OR_LT });
  text(s, "Demandez à Dieu de vous sonder (Psaume 139.23-24).", 5.6, 6.55, 7.13, 0.42, { fontSize: 19, italic: true, color: OR_LT });
  barre(s, 12);
  s.addNotes(`# C. Les paroles et le cœur offerts (19.15)
- **Reçois favorablement :** un terme souvent associé à l'acceptation des sacrifices; David dépose sur l'autel le sacrifice de ses lèvres et de sa vie (BEM, 19.15).
- **Bouche et méditation :** l'écho de Josué 1.8, la loi méditée jour et nuit (BEM, 19.15; TM19-6; 80-251).
- **Mon rocher et mon rédempteur :** le goel, le parent proche qui paie pour racheter (Lévitique 25.25). Il conduit à Christ, qui s'est donné pour nous racheter de toute iniquité (Tite 2.14); par lui, nous offrons à Dieu le sacrifice de louange, le fruit de nos lèvres (Hébreux 13.15).
# Application
- Demandez à Dieu de vous sonder (Psaume 139.23-24), confessez les fautes qu'il vous montre et nommez le péché qui vous domine.
- Le péché est le problème principal, non le seul : les faiblesses du corps et le péché des autres pèsent aussi (Street).
- Quand la Parole fait son œuvre, on marche sans culpabilité, « intègre » (19.14).
# À éviter
- Prêcher les versets 13 et 14 comme un appel à l'introspection anxieuse ou à l'effort moral : c'est la grâce qui rend le disciple lucide et combatif.
- Finir sur le péché sans le Rédempteur : le psaume s'achève sur la grâce.`);
}

// ───────────── Conclusion ─────────────
pres.addSection({ title: "Conclusion" });

// 13. Conclusion et appel
{
  const s = add("CONCLUSION", "Conclusion");
  header(s, "CONCLUSION ET APPEL · ROMAINS 10.17", "La Parole qui conduit au Rédempteur", "Les cieux suffisent à condamner; la Parole suffit à sauver");
  const pas = [["soleil", "le ciel qui parle"], ["livre", "la Parole qui suffit"], ["or", "la Parole qu'on désire"], ["coeur", "le cœur qui s'offre"]];
  s.addShape(pres.shapes.LINE, { x: 1.7, y: 2.55, w: 9.3, h: 0, line: { color: OR, width: 2, dashType: "dash" } });
  pas.forEach(([ic, t], i) => {
    const x = 1.3 + i * 2.45;
    disc(s, ic, x, 2.12, 0.85);
    text(s, t, x + 0.425 - 1.1, 3.22, 2.2, 0.4, { fontSize: 15, align: "center", color: MUTED });
  });
  s.addShape(pres.shapes.OVAL, { x: 11.0, y: 1.98, w: 1.15, h: 1.15, fill: { color: OR }, line: { color: OR_LT, width: 2 } });
  s.addImage({ path: img("i-croix"), x: 11.25, y: 2.23, w: 0.65, h: 0.65, altText: "Icône : croix" });
  text(s, "le Rédempteur", 10.475, 3.22, 2.2, 0.4, { fontSize: 16, bold: true, align: "center", color: OR_LT });
  const bloc = (x, titre, runs, accent) => {
    card(s, x, 3.85, 3.88, 3.1, accent);
    text(s, titre, x + 0.3, 4.0, 3.3, 0.45, { fontSize: 19, bold: true, color: OR_LT });
    text(s, runs, x + 0.3, 4.5, 3.3, 2.35, { fontSize: 15 });
  };
  bloc(0.6, "Le Rédempteur a un nom", [{ text: "Dieu nous a parlé en son Fils (Hébreux 1.1-2).", options: { breakLine: true } },
    { text: "« Personne ne peut être sauvé, régénéré, né de nouveau sans comprendre la Parole de Dieu, en particulier la Parole de Dieu concernant la personne de Jésus-Christ » (GTY143).", options: { color: MUTED, paraSpaceBefore: 6 } }], true);
  bloc(4.725, "À l'incroyant", [{ text: "Les cieux vous ont parlé toute votre vie : vous êtes sans excuse. Aujourd'hui, la Parole vous parle du Rédempteur.", options: { breakLine: true } },
    { text: "Repentez-vous, croyez en Christ et soumettez-vous à lui comme Seigneur.", options: { bold: true, paraSpaceBefore: 6 } }]);
  bloc(8.85, "Au croyant", [{ text: "Ne cherchez pas ailleurs ce que la Parole vous donne. Désirez-la, laissez-la vous sonder, offrez-vous à Dieu.", options: { breakLine: true } },
    { text: "« Dans votre cœur, en ce moment, pouvez-vous prendre devant le Seigneur un engagement renouvelé à vous vouer à sa Parole? » (80-19)", options: { color: MUTED, paraSpaceBefore: 6 } }]);
  barre(s, 13);
  s.addNotes(`# 4 min · Romains 10.17; Psaume 19.15
- **Récapitulation :** le ciel qui parle, assez pour condamner; la Parole qui suffit, assez pour sauver; la Parole qu'on désire plus que l'or; le cœur qui s'offre à son Rédempteur.
- **Le Rédempteur a un nom :** Dieu qui a parlé autrefois par les prophètes nous a parlé en son Fils (Hébreux 1.1-2). « Personne ne peut être sauvé, régénéré, né de nouveau sans comprendre la Parole de Dieu, en particulier la Parole de Dieu concernant la personne de Jésus-Christ » (GTY143; Romains 10.17).
- **À l'incroyant :** les cieux vous ont parlé toute votre vie, et vous êtes sans excuse. Aujourd'hui, la Parole vous parle du Rédempteur : repentez-vous, croyez en Christ et soumettez-vous à lui comme Seigneur.
- **Au croyant :** ne cherchez pas ailleurs ce que la Parole vous donne. Désirez-la, laissez-la vous sonder, offrez-vous à Dieu. « Dans votre cœur, en ce moment, pouvez-vous prendre devant le Seigneur un engagement renouvelé à vous vouer à sa Parole? » (80-19).`);
}

// 14. Prière
{
  const s = add("CONCLUSION", "Conclusion");
  header(s, "PRIÈRE · PSAUME 19.15", "Prions ensemble");
  card(s, 0.6, 2.05, 7.9, 4.9, true);
  text(s, [
    ...["Reçois favorablement", "les paroles de ma bouche", "Et les sentiments de mon cœur,", "Ô Éternel, mon rocher", "et mon rédempteur!"].map((l, i) =>
      ({ text: l, options: { breakLine: true, color: i >= 3 ? OR_LT : INK } })),
    { text: "Psaume 19.15", options: { fontFace: BODY, italic: false, fontSize: 15, color: DIM, paraSpaceBefore: 14 } },
  ], 1.0, 2.05, 7.1, 4.9, { fontFace: HEAD, fontSize: 32, italic: true, valign: "middle", lineSpacingMultiple: 1.05, objectName: "Prière" });
  s.addImage({ path: img("medaillon"), x: 8.9, y: 2.2, w: 3.85, h: 3.85, altText: "Médaillon rayonnant : le ciel étoilé et le soleil au-dessus d'un livre ouvert", objectName: "Illustration" });
  text(s, "Du ciel qui parle à la Parole qui suffit", 8.6, 6.2, 4.4, 0.5, { fontSize: 15, italic: true, color: MUTED, align: "center" });
  barre(s, 14);
  s.addNotes(`# Prière · Psaume 19.15
- Prier ensemble le verset 15, lentement, à voix haute.
- **Échos du message :** les paroles de la bouche et les sentiments du cœur offerts comme un sacrifice (IV); l'Éternel, rocher et rédempteur, que le Nouveau Testament nomme en Christ (Tite 2.14).`);
}

// pptxgenjs ne sait ni faire du titre un espace réservé (plan, lecteurs d'écran), ni grouper des objets, ni mettre en forme
// les notes : on retouche le XML produit.
let idGroupe = 1000;
function grouper(xml, nom, membres) {
  const els = [...xml.matchAll(/<p:(sp|pic)>[\s\S]*?<\/p:\1>/g)].filter((m) => membres.test(m[0].match(/name="([^"]*)"/)[1]));
  if (!els.length) return xml;
  const debut = els[0].index, fin = els.at(-1).index + els.at(-1)[0].length, bloc = xml.slice(debut, fin);
  if (bloc !== els.map((m) => m[0]).join("")) throw new Error(`${nom} : objets non contigus`);
  const b = els.map((m) => m[0].match(/<a:off x="(\d+)" y="(\d+)"\/>\s*<a:ext cx="(\d+)" cy="(\d+)"\/>/).slice(1).map(Number));
  const x = Math.min(...b.map((r) => r[0])), y = Math.min(...b.map((r) => r[1]));
  const cx = Math.max(...b.map((r) => r[0] + r[2])) - x, cy = Math.max(...b.map((r) => r[1] + r[3])) - y;
  const xf = `<a:off x="${x}" y="${y}"/><a:ext cx="${cx}" cy="${cy}"/><a:chOff x="${x}" y="${y}"/><a:chExt cx="${cx}" cy="${cy}"/>`;
  return xml.slice(0, debut) + `<p:grpSp><p:nvGrpSpPr><p:cNvPr id="${idGroupe++}" name="${nom}"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>` +
    `<p:grpSpPr><a:xfrm>${xf}</a:xfrm></p:grpSpPr>${bloc}</p:grpSp>` + xml.slice(fin);
}
const PUCE = '<a:buFont typeface="Arial"/><a:buChar char="•"/>';
const PPR = {
  "#": '<a:pPr marL="0" indent="0"><a:spcBef><a:spcPts val="600"/></a:spcBef><a:buNone/></a:pPr>',
  "-": `<a:pPr marL="228600" indent="-228600"><a:spcBef><a:spcPts val="300"/></a:spcBef>${PUCE}</a:pPr>`,
  "  -": `<a:pPr marL="457200" indent="-228600">${PUCE}</a:pPr>`,
};
const run = (t, gras) => `<a:r><a:rPr lang="fr-CA" sz="1400"${gras ? ' b="1"' : ""} dirty="0"/><a:t>${t}</a:t></a:r>`;
function paragraphe(ligne) {
  const m = ligne.match(/^(#|-|  -) (.+)$/);
  if (!m) throw new Error("Ligne de notes mal formée : " + ligne);
  const a = m[2].match(/^\*\*(.+?)\*\*(?: (.+))?$/);
  const runs = m[1] === "#" ? run(m[2], true) : a ? run(a[1] + (a[2] ? " " : ""), true) + (a[2] ? run(a[2]) : "") : run(m[2]);
  return `<a:p>${PPR[m[1]]}${runs}</a:p>`;
}
async function retouche(buf) {
  const zip = await JSZip.loadAsync(buf);
  for (const f of Object.keys(zip.files)) {
    if (/^ppt\/slides\/slide\d+\.xml$/.test(f)) {
      let xml = await zip.file(f).async("string");
      const titre = 'name="Titre"></p:cNvPr><p:cNvSpPr txBox="1"/><p:nvPr></p:nvPr>';
      if (!xml.includes(titre)) throw new Error(f + " : titre introuvable");
      xml = xml.replace(titre, 'name="Titre"></p:cNvPr><p:cNvSpPr><a:spLocks noGrp="1"/></p:cNvSpPr><p:nvPr><p:ph type="title"/></p:nvPr>');
      xml = grouper(xml, "Barre de progression", /^Progression \d+$/);
      zip.file(f, xml);
    } else if (f === "ppt/theme/theme1.xml") {
      // pptxgenjs écrit les polices du thème, mais garde la palette Office : on y met celle du gabarit et son nom.
      const SLOTS = ["dk1", "lt1", "dk2", "lt2", "accent1", "accent2", "accent3", "accent4", "accent5", "accent6", "hlink", "folHlink"];
      const scheme = `<a:clrScheme name="${THEME.name}">` + SLOTS.map((k) => `<a:${k}><a:srgbClr val="${THEME.colors[k]}"/></a:${k}>`).join("") + "</a:clrScheme>";
      const xml = (await zip.file(f).async("string")).replace(/<a:clrScheme\b[\s\S]*?<\/a:clrScheme>/, () => scheme)
        .replace(/(<a:(?:theme|fontScheme)\b[^>]*?\bname=")[^"]*"/g, (_, head) => `${head}${THEME.name}"`);
      if (!xml.includes(scheme)) throw new Error("thème : <a:clrScheme> introuvable");
      zip.file(f, xml);
    } else if (/^ppt\/notesSlides\/notesSlide\d+\.xml$/.test(f)) {
      const xml = await zip.file(f).async("string");
      const notes = /<a:p><a:r><a:rPr lang="en-US" dirty="0"\/><a:t>([\s\S]*?)<\/a:t><\/a:r><a:endParaRPr lang="en-US" dirty="0"\/><\/a:p>/;
      if (!notes.test(xml)) throw new Error(f + " : notes introuvables");
      zip.file(f, xml.replace(notes, (_, t) => t.split(/\r?\n/).map(paragraphe).join("")));
    }
  }
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}

const out = process.argv[2] || path.join(__dirname, "..", "..", "Presentation-Psaume-19.pptx");
pres.write({ outputType: "nodebuffer" }).then(retouche).then((buf) => { fs.writeFileSync(out, buf); console.log("écrit :", out); });

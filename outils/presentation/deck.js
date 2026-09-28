// Présentation « À l'image de Christ-Jésus » : gabarit noir, orange brûlé.
// npm ci, puis node illus.js (images dans img/), puis node deck.js [sortie.pptx].
// Vérifier le rendu : powershell -File render.ps1 <chemin absolu du .pptx> <dossier des PNG>.
const path = require("path");
const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5 po
pres.author = "André-Guy Bruneau";
pres.title = "À l'image de Christ-Jésus";

const BG = "0D0B0A", CARD = "1A1411", DISC = "2A1A10", OR = "CC5500", OR_LT = "E8742A", INK = "F4EDE4", MUTED = "A89A8C", DIM = "6E625A", ASH = "6E5A4C";
const HEAD = "Cambria", BODY = "Calibri";
const img = (n) => path.join(__dirname, "img", n + ".png");
const NBSP = "\u00A0";
const nb = (s) => s.replace(/« /g, "«" + NBSP).replace(/ »/g, NBSP + "»").replace(/ :/g, NBSP + ":")
  .replace(/\b([1-3]) ([A-ZÉ][a-zé]{0,3})\b/g, "$1" + NBSP + "$2").replace(/\b([A-ZÉ][a-zé]{0,3}) (\d+\.\d+)/g, "$1" + NBSP + "$2");

function text(slide, t, x, y, w, h, o = {}) {
  const runs = Array.isArray(t) ? t.map((r) => ({ ...r, text: nb(r.text) })) : nb(t);
  slide.addText(runs, { x, y, w, h, fontFace: BODY, fontSize: 16, color: INK, margin: 0, valign: "top", isTextBox: true, ...o });
}
function card(slide, x, y, w, h, accent) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.12, fill: { color: CARD },
    line: accent ? { color: OR, width: 1.5 } : { color: "2E211A", width: 0.75 } });
}
function disc(slide, name, x, y, d) {
  slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: DISC }, line: { color: OR, width: 1 } });
  slide.addImage({ path: img("i-" + name), x: x + d * 0.2, y: y + d * 0.2, w: d * 0.6, h: d * 0.6, altText: name });
}

const STEPS = ["créée", "parfaite", "promise", "transformée", "qui aime", "envoyée"];
function header(slide, kicker, title, phrase, step) {
  slide.background = { color: BG };
  text(slide, kicker, 0.6, 0.42, 6.8, 0.32, { fontSize: 13, bold: true, color: OR_LT, charSpacing: 3 });
  text(slide, title, 0.6, 0.74, 12.1, 0.75, { fontFace: HEAD, fontSize: 38, bold: true });
  if (phrase) text(slide, phrase, 0.6, 1.5, 12.1, 0.42, { fontSize: 19, italic: true, color: OR_LT });
  if (step !== undefined) {
    const ws = STEPS.map((t) => 0.1 * t.length + 0.3);
    let x = 12.73 - ws.reduce((a, b) => a + b, 0);
    STEPS.forEach((t, i) => { text(slide, t, x, 0.42, ws[i], 0.32, { fontSize: 12, align: "center", bold: i === step, color: i === step ? OR_LT : DIM }); x += ws[i]; });
  }
}

// 1. Titre
{
  const s = pres.addSlide();
  s.background = { path: img("bg-titre") };
  s.addImage({ path: img("medaillon"), x: 7.35, y: 0.9, w: 5.7, h: 5.7, altText: "Une personne frappée comme l'effigie d'une pièce" });
  text(s, "PRÉDICATION · 30 SEPTEMBRE 2026", 0.8, 1.6, 6.5, 0.35, { fontSize: 14, bold: true, color: OR_LT, charSpacing: 3 });
  text(s, "À l'image de\nChrist-Jésus", 0.8, 2.05, 6.6, 2.0, { fontFace: HEAD, fontSize: 56, bold: true, lineSpacingMultiple: 0.95 });
  text(s, "Genèse 1.26-27", 0.8, 4.2, 6, 0.5, { fontSize: 26, color: OR_LT });
  text(s, [
    { text: "« Dieu créa l'homme à son image, il le créa à l'image de Dieu, il créa l'homme et la femme. »", options: { italic: true, breakLine: true } },
    { text: "Genèse 1.27", options: { fontSize: 13, color: DIM } },
  ], 0.8, 4.95, 6.1, 1.1, { fontSize: 17, color: MUTED, paraSpaceAfter: 4 });
  text(s, "André-Guy Bruneau", 0.8, 6.55, 5, 0.35, { fontSize: 14, color: MUTED });
  s.addNotes("Lecture publique : Genèse 1.26-28 et Romains 8.28-30. Durée visée : 45 minutes.");
}

// 2. Rappel
{
  const s = pres.addSlide();
  header(s, "RAPPEL · 2 TIMOTHÉE 3.16-17", "Toute l'Écriture est soufflée par Dieu", "« Ce que l'Écriture dit, Dieu le dit. »  (MacArthur)");
  s.addImage({ path: img("souffle"), x: 0.85, y: 2.2, w: 3.8, h: 3.8, altText: "Un livre ouvert d'où monte un souffle" });
  text(s, [{ text: "theopneustos", options: { italic: true, bold: true, color: OR_LT } }, { text: " = « soufflée par Dieu »" }],
    0.6, 6.2, 4.3, 0.45, { fontSize: 18, align: "center" });
  const rows = [
    ["Enseigner", "donne la vérité qui fait vivre selon Dieu"],
    ["Convaincre", "met le péché et l'erreur en lumière"],
    ["Corriger", "relève et redresse"],
    ["Instruire dans la justice", "fait grandir jusqu'à la maturité"],
  ];
  s.addShape(pres.shapes.LINE, { x: 5.6, y: 2.4, w: 0, h: 2.7, line: { color: OR, width: 2 } });
  rows.forEach(([t, d], i) => {
    const y = 2.1 + i * 0.9;
    s.addShape(pres.shapes.OVAL, { x: 5.3, y, w: 0.6, h: 0.6, fill: { color: OR }, line: { color: OR } });
    text(s, String(i + 1), 5.3, y, 0.6, 0.6, { fontSize: 20, bold: true, align: "center", valign: "middle", color: "FFFFFF" });
    text(s, [{ text: t, options: { bold: true, fontSize: 21, breakLine: true } }, { text: d, options: { color: MUTED } }], 6.15, y - 0.04, 6.5, 0.8, { fontSize: 17 });
  });
  card(s, 5.3, 5.85, 7.43, 0.8, true);
  text(s, [{ text: "But : ", options: { bold: true, color: OR_LT } }, { text: "que l'homme de Dieu soit propre, non à la plupart, mais à toutes les bonnes œuvres." }],
    5.55, 5.85, 7.0, 0.8, { fontSize: 17, valign: "middle" });
  s.addNotes("2 min. Lire 2 Timothée 3.16-17. Theopneustos : « soufflée par Dieu ». « Ce que l'Écriture dit, Dieu le dit » (55-17). Enseigner, convaincre, corriger, instruire dans la justice (55-19). Pierre d'attente : au point IV, l'Écriture est le miroir.");
}

// 3. Introduction : l'image du roi
{
  const s = pres.addSlide();
  header(s, "INTRODUCTION · GENÈSE 1.27", "Qui porte l'image de Dieu?", "L'image représentait, et rendait présent, celui qu'elle figurait.");
  s.addImage({ path: img("deux-images"), x: 0.5, y: 2.0, w: 7.2, h: 3.6, altText: "Le pharaon, « image vivante » du dieu, puis une personne à l'image de Dieu" });
  text(s, [{ text: "Autour d'Israël : le roi seul", options: { bold: true, color: INK, breakLine: true } }, { text: "le pharaon, « image vivante » du dieu", options: { color: MUTED } }],
    0.4, 5.6, 3.8, 0.75, { align: "center" });
  text(s, [{ text: "Genèse 1.27 : tout être humain", options: { bold: true, color: OR_LT, breakLine: true } }, { text: "homme et femme, sans rang ni lignée", options: { color: MUTED } }],
    4.0, 5.6, 3.8, 0.75, { align: "center" });
  text(s, "Vous aussi, vous portez une image. Laquelle?", 0.6, 6.5, 7.1, 0.45, { fontSize: 21, italic: true, align: "center" });
  card(s, 8.15, 2.0, 4.58, 4.95);
  text(s, [{ text: "tselem", options: { italic: true, bold: true, color: OR_LT } }, { text: " : image, effigie", options: { color: MUTED } }], 8.45, 2.2, 4.0, 0.4, { fontSize: 17 });
  text(s, "UN SEUL PARCOURS", 8.45, 2.75, 4.0, 0.3, { fontSize: 12, bold: true, color: DIM, charSpacing: 3 });
  ["I", "II", "III", "IV", "V", "VI"].forEach((r, i) => {
    const y = 3.15 + i * 0.6;
    s.addShape(pres.shapes.OVAL, { x: 8.45, y, w: 0.46, h: 0.46, fill: { color: DISC }, line: { color: OR, width: 1 } });
    text(s, r, 8.45, y, 0.46, 0.46, { fontSize: 12, bold: true, align: "center", valign: "middle", color: OR_LT });
    text(s, "L'image " + STEPS[i], 9.1, y, 3.4, 0.46, { fontSize: 19, valign: "middle" });
  });
  s.addNotes("3 min. Dans l'Antiquité, l'« image » d'un dieu, c'était le roi : Toutânkhamon signifie « image vivante d'Amon »; en Mésopotamie, le roi dressait son effigie aux confins de ses territoires. Genèse 1.27 accorde ce titre à l'être humain comme tel, homme et femme, sans rang ni lignée. Tselem désigne ailleurs les statues cultuelles. Question : vous aussi, vous portez une image. Laquelle? Qu'est-il arrivé à cette image, et que Dieu en fait-il?");
}

// 4. I. L'image créée
{
  const s = pres.addSlide();
  header(s, "I · GENÈSE 1.26-27", "L'image créée", "L'homme est fait à l'image d'un Dieu qui n'a jamais été seul.", 0);
  s.addImage({ path: img("trinite"), x: 0.5, y: 2.05, w: 4.3, h: 3.87, altText: "Père, Fils et Esprit en communion : un seul Dieu" });
  text(s, [{ text: "« Faisons » (Périchorèse) : ", options: { bold: true, color: OR_LT } },
    { text: "pour la première fois, Dieu parle au pluriel. Un seul Dieu, trois personnes en communion." }], 0.6, 5.95, 4.2, 0.95, { fontSize: 16 });
  text(s, [{ text: "Ce qu'est l'image  " , options: { bold: true } }, { text: "tselem = demuth : image = ressemblance", options: { italic: true, color: OR_LT, fontSize: 16 } }],
    5.2, 2.05, 7.5, 0.4, { fontSize: 19 });
  [["cerveau", "Raison", "Il est comme Dieu : il pense, veut, ressent."],
   ["balance", "Morale", "Il était comme Dieu : bon, sans péché."],
   ["relation", "Relation", "Le cœur de l'image : connaître Dieu personnellement."]].forEach(([ic, t, d], i) => {
    const x = 5.2 + i * 2.6;
    card(s, x, 2.6, 2.35, 2.35, i === 2);
    disc(s, ic, x + 0.2, 2.8, 0.7);
    text(s, t, x + 0.2, 3.62, 2.0, 0.4, { fontSize: 20, bold: true });
    text(s, d, x + 0.2, 4.02, 2.0, 0.85, { fontSize: 15, color: MUTED });
  });
  text(s, "Sa vocation", 5.2, 5.1, 7.5, 0.4, { fontSize: 19, bold: true });
  [["couronne", "Représenter Dieu et gérer la terre"], ["couple", "Homme et femme : même dignité, rôles distincts"], ["enfant", "Toute vie humaine porte l'image"]].forEach(([ic, t], i) => {
    const x = 5.2 + i * 2.6;
    disc(s, ic, x, 5.6, 0.6);
    text(s, t, x + 0.75, 5.55, 1.75, 0.95, { fontSize: 15 });
  });
  s.addNotes("8 min. A. « Faisons » : jusqu'au verset 24, Dieu commande; au verset 26, « jamais Dieu n'a parlé au pluriel » (90-218). Première indication claire de la Trinité (3.22; 11.7). Périchorèse (Jn 14.10-11; 17.21) : le mot nomme, il ne spécule pas. Ce conseil exécute un dessein arrêté avant la fondation du monde (Ép 1.4) : pierre d'attente du point III. B. Tselem et demuth sont synonymes (90-218). Par la raison, l'homme est comme Dieu; moralement, il était comme Dieu. Centre : « la capacité de relations personnelles et, par-dessus tout, d'une relation personnelle avec Dieu » (90-218) : pierre d'attente du point V. Bara' trois fois au verset 27 : Dieu seul crée, et l'homme est le seul être vivant fait sur le modèle divin (90-219). C. Domination : roi de la terre, chargé de la cultiver et de la garder (90-219; Ps 8.7-9). Homme et femme égaux en dignité, rôles distincts (Gn 2.18-23; 1 Tm 2.13); montrer le pluriel « qu'ils dominent » que la NEG79 efface. Application : la dignité repose sur l'acte créateur, non sur l'utilité. Transition, l'image ternie : Adam déchu engendre « à sa ressemblance » (Gn 5.3); l'image demeure (Gn 9.6; Jc 3.9), mais la ressemblance morale est perdue et l'homme ne peut la restaurer. Où voir encore l'image telle que Dieu l'a voulue?");
}

// 5. II. L'image parfaite
{
  const s = pres.addSlide();
  header(s, "II · COLOSSIENS 1.15", "L'image parfaite", [{ text: "Christ est ce que l'homme n'est plus. " },
    { text: "(Kénose - Philippiens 2)", options: { color: MUTED } }], 1);
  s.addImage({ path: img("ternie"), x: 1.95, y: 2.05, w: 2.6, h: 2.6, altText: "Une pièce à l'effigie humaine, fêlée et ternie" });
  s.addImage({ path: img("parfaite"), x: 8.75, y: 2.05, w: 2.6, h: 2.6, altText: "Une couronne rayonnante : Christ, l'image parfaite" });
  s.addShape(pres.shapes.LINE, { x: 5.2, y: 3.35, w: 2.95, h: 0, line: { color: OR_LT, width: 3, endArrowType: "triangle" } });
  text(s, "Où voir l'image voulue par Dieu?", 4.9, 2.8, 3.55, 0.4, { fontSize: 15, italic: true, color: MUTED, align: "center" });
  text(s, [{ text: "L'homme : l'image ternie", options: { bold: true, fontSize: 21, color: INK, breakLine: true } },
    { text: "Adam engendre « à sa ressemblance » (Gn 5.3).", options: { breakLine: true } },
    { text: "Image gardée (Gn 9.6), ressemblance morale perdue." }], 0.6, 4.8, 5.3, 1.3, { fontSize: 16, color: MUTED, align: "center", paraSpaceAfter: 3 });
  text(s, [{ text: "Christ : l'Image parfaite", options: { bold: true, fontSize: 21, color: OR_LT, breakLine: true } },
    { text: "Reproduction exacte du Dieu invisible (Hé 1.3).", options: { breakLine: true } },
    { text: "Premier-né = l'héritier, non une créature (1.16-18)." }], 7.4, 4.8, 5.3, 1.3, { fontSize: 16, color: MUTED, align: "center", paraSpaceAfter: 3 });
  const chips = [["tselem", "hébreu, Genèse 1.27"], ["eikôn", "grec, la Septante"], ["eikôn", "Christ, Colossiens 1.15"]];
  chips.forEach(([w, d], i) => {
    const x = 1.1 + i * 3.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 6.25, w: 3.2, h: 0.6, rectRadius: 0.3, fill: { color: DISC }, line: { color: i === 2 ? OR_LT : OR, width: i === 2 ? 2 : 1 } });
    text(s, [{ text: w, options: { italic: true, bold: true, color: OR_LT } }, { text: "  " + d, options: { fontSize: 14, color: MUTED } }], x, 6.25, 3.2, 0.6, { fontSize: 18, align: "center", valign: "middle" });
    if (i < 2) s.addShape(pres.shapes.LINE, { x: x + 3.28, y: 6.55, w: 0.6, h: 0, line: { color: OR, width: 2, endArrowType: "triangle" } });
  });
  s.addNotes("6 min. La Septante rend l'image de Gn 1.27 par eikôn, le mot que Paul applique à Christ (aussi 2 Co 4.4). Mais en un autre sens : l'homme porte l'image comme créature; Christ est, de toute éternité, la ressemblance parfaite de Dieu, une reproduction exacte, sans rien de manquant ni d'altéré (2135; Hé 1.3; Ph 2.6; Jn 14.9). Premier-né : le rang d'héritier, non la naissance (Ex 4.22; Jr 31.9, Éphraïm avant Manassé). Il a créé toutes choses (1.16). Application : qui veut savoir ce qu'est l'homme tel que Dieu l'a voulu regarde Christ; qui veut connaître Dieu le voit en Christ, sans intermédiaire. Transition : si Christ est l'image parfaite, que Dieu fait-il de ceux qu'il sauve?");
}

// 6. III. L'image promise
{
  const s = pres.addSlide();
  header(s, "III · ROMAINS 8.29", "L'image promise", "Dieu a décidé d'avance la fin de votre salut, et cette fin, c'est Christ en vous.", 2);
  ["Connus d'avance", "Prédestinés", "Appelés", "Justifiés", "Glorifiés"].forEach((t, i) => {
    const x = 0.79 + i * 2.3, hi = i === 1;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 2.15, w: 2.55, h: 0.95, rectRadius: 0.47,
      fill: hi ? { color: OR } : { color: BG, transparency: 100 }, line: { color: hi ? OR : OR_LT, width: 4 } });
    text(s, t, x + 0.2, 2.15, 2.15, 0.95, { fontSize: 18, bold: true, align: "center", valign: "middle", color: hi ? "FFFFFF" : INK });
  });
  text(s, "Aucun maillon ne manque : ce que Dieu a décrété, il l'achèvera (8.30).", 0.6, 3.25, 12.1, 0.4, { fontSize: 16, italic: true, color: MUTED, align: "center" });
  s.addImage({ path: img("freres"), x: 0.8, y: 3.85, w: 3.5, h: 2.92, altText: "Le Fils couronné au centre, entouré de beaucoup de frères" });
  [["Connus d'avance", "Non une simple prévision : le choix d'aimer, l'élection."],
   ["Semblables à l'image de son Fils", "La sainteté maintenant, un corps glorifié à la fin (Ph 3.21)."],
   ["Premier-né de beaucoup de frères", "Ils lui ressemblent, sans jamais être ses égaux."]].forEach(([t, d], i) => {
    const y = 3.9 + i * 0.98;
    card(s, 4.9, y, 7.83, 0.86, i === 1);
    text(s, [{ text: t, options: { bold: true, color: OR_LT, breakLine: true } }, { text: d }], 5.15, y, 7.4, 0.86, { fontSize: 17, valign: "middle" });
  });
  s.addNotes("5 min. « Connus d'avance » : non une simple prévision de qui croirait, mais le choix d'aimer, l'élection (Ac 2.23; 1 P 1.2, 20). Le même conseil éternel que le « Faisons ». « Le but de votre salut était que vous soyez rendus semblables à l'image de son Fils » (90-180). Premier-né de beaucoup de frères : la fin dernière est la gloire du Fils. Application : ce que Dieu a décrété, il l'achèvera (8.30); les épreuves de 8.28 servent ce but. Transition : nous ne voyons pas encore cette ressemblance achevée. Comment Dieu nous y conduit-il, aujourd'hui?");
}

// 7. IV. L'image transformée
{
  const s = pres.addSlide();
  header(s, "IV · 2 CORINTHIENS 3.18", "L'image transformée", "On devient semblable à ce que l'on contemple.", 3);
  s.addImage({ path: img("miroir"), x: 0.75, y: 2.0, w: 3.36, h: 4.1, altText: "Un miroir à main où brille un livre ouvert : l'Écriture" });
  text(s, "Le miroir, c'est l'Écriture", 0.5, 6.2, 3.9, 0.45, { fontSize: 18, bold: true, color: OR_LT, align: "center" });
  text(s, "Nous ne nous transformons pas :\nnous sommes transformés.", 4.6, 2.35, 5.2, 0.9, { fontSize: 21, italic: true });
  [["oeil", "Le visage découvert", "Moïse se voilait; en Christ, le voile est ôté (3.14-16)."],
   ["livre", "Contempler", "Regarder Christ dans l'Écriture, comme dans un miroir. On ne reflète que ce qu'on contemple."],
   ["colombe", "Être transformé", "Metamorphoô : un changement continu, que l'Esprit accomplit."]].forEach(([ic, t, d], i) => {
    const x = 4.6 + i * 2.73, y = 4.45 - i * 1.0;
    card(s, x, y, 2.55, 2.3, i === 2);
    disc(s, ic, x + 0.2, y + 0.2, 0.62);
    text(s, t, x + 0.2, y + 0.92, 2.2, 0.4, { fontSize: 18, bold: true });
    text(s, d, x + 0.2, y + 1.32, 2.2, 0.95, { fontSize: 14, color: MUTED });
  });
  text(s, [{ text: "de gloire en gloire", options: { italic: true, bold: true, fontSize: 21, color: OR_LT, breakLine: true } },
    { text: "jusqu'à lui être semblables (1 Jn 3.2)", options: { color: MUTED } }], 10.06, 5.05, 2.7, 1.2, { fontSize: 15 });
  s.addNotes("6 min. A. Moïse voilait son visage (Ex 34.29-35); en Christ, le voile est ôté. « Nous tous » : tous les croyants (47-22). B. La NEG79 dit « reflète »; le grec, avec la S21, la LSG, Darby et la KJF, dit contempler comme dans un miroir. Le miroir, c'est l'Écriture, où la gloire de Dieu se voit sur la face de Jésus-Christ (90-75; 4.6). Relier au Rappel. C. Metamorphoô, présent passif : « une action de transformation continue et progressive » (47-21). « C'est là toute la sanctification progressive » (90-75). Le terme : « Le dessein salvateur de Dieu était de créer une humanité rachetée qui serait semblable à son Fils » (47-21). Application : contempler Christ dans sa Parole, et l'Esprit fait l'œuvre; celui qui délaisse l'Écriture se prive du miroir. Transition : à quoi reconnaît-on cette image qui grandit? À ce que Dieu avait mis au centre : le cœur qui aime.");
}

// 8. V. L'image qui aime
{
  const s = pres.addSlide();
  header(s, "V · MATTHIEU 22.37-40 · JÉRÉMIE 31.33", "L'image qui aime", "La loi que je ne peux accomplir, Dieu l'écrit sur mon cœur.", 4);
  s.addImage({ path: img("pierre-coeur"), x: 0.5, y: 2.05, w: 6.4, h: 3.41, altText: "Les tables de pierre, puis un cœur où la loi est écrite" });
  text(s, [{ text: "Sur la pierre, la loi accuse", options: { bold: true, color: INK, breakLine: true } }, { text: "Personne n'a aimé Dieu de tout son cœur." }],
    0.5, 5.55, 2.9, 1.1, { fontSize: 16, color: MUTED, align: "center" });
  text(s, [{ text: "Sur le cœur, elle transforme", options: { bold: true, color: OR_LT, breakLine: true } }, { text: "Le pardon, puis une capacité nouvelle d'aimer." }],
    3.75, 5.55, 3.3, 1.1, { fontSize: 16, color: MUTED, align: "center" });
  text(s, "Le cœur, c'est la personne intérieure", 7.4, 2.05, 5.33, 0.4, { fontSize: 19, bold: true });
  text(s, "les trois dimensions de l'image, renouvelées", 7.4, 2.45, 5.33, 0.35, { fontSize: 15, italic: true, color: MUTED });
  [["cerveau", "Rationnel : il pense", "Dieu parle en Christ, la Parole, et renouvelle la pensée (Jn 1.1)."],
   ["balance", "Moral : il juge", "Dieu seul crée un cœur pur (Ps 51.12)."],
   ["relation", "Relationnel : il aime", "Dieu répand son amour dans nos cœurs (Rm 5.5)."]].forEach(([ic, t, d], i) => {
    const y = 2.95 + i * 1.28;
    card(s, 7.4, y, 5.33, 1.12, i === 2);
    disc(s, ic, 7.6, y + 0.21, 0.7);
    text(s, [{ text: t, options: { bold: true, fontSize: 18, breakLine: true } }, { text: d, options: { color: MUTED } }], 8.5, y + 0.08, 4.1, 0.96, { fontSize: 15, valign: "middle" });
  });
  s.addNotes("7 min. A. Le piège des 613 commandements; Jésus répond par le Shema (Dt 6.5) et Lv 19.18 (2358). « Quand vous aimez Dieu comme il faut, vous aimez les gens comme il faut » (2358). B. « Parce que nous n'avons pas aimé ainsi, nous avons besoin du pardon, et parce que nous ne pouvons pas aimer ainsi, nous avons besoin d'une capacité nouvelle » (2358). C. Lire Jérémie 31.33 (NBS). La nouvelle alliance : « le pardon de tous nos péchés et l'écriture de la loi de Dieu sur nos cœurs » (80-286). Le cœur (1 Ch 28.9) : rationnel, moral, relationnel. Application : nous l'aimons parce qu'il nous a aimés le premier (1 Jn 4.19), et cet amour se prouve par l'obéissance (Jn 14.15). Transition : et le prochain que nous aimons, que lui devons-nous d'abord?");
}

// 9. VI. L'image envoyée
{
  const s = pres.addSlide();
  header(s, "VI · MATTHIEU 28.19-20", "L'image envoyée", "Ceux que Dieu restaure à son image, il les envoie.", 5);
  s.addImage({ path: img("nations"), x: 0.6, y: 2.1, w: 4.2, h: 4.2, altText: "La terre, avec des flèches vers toutes les nations" });
  text(s, "Toutes les nations", 0.6, 6.35, 4.2, 0.4, { fontSize: 18, bold: true, color: OR_LT, align: "center" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.4, y: 2.1, w: 7.33, h: 0.85, rectRadius: 0.12, fill: { color: OR }, line: { color: OR } });
  text(s, "Faites des disciples", 5.4, 2.1, 7.33, 0.85, { fontFace: HEAD, fontSize: 28, bold: true, color: "FFFFFF", align: "center", valign: "middle" });
  text(s, "Le seul impératif. Les trois autres verbes en décrivent le chemin.", 5.4, 3.02, 7.33, 0.35, { fontSize: 14, italic: true, color: MUTED, align: "center" });
  [["marche", "Aller", "vers toutes les nations"],
   ["eau", "Baptiser", "au nom, un seul nom, du Père, du Fils et du Saint-Esprit"],
   ["enseigner", "Enseigner", "à observer tout ce que Christ a prescrit"]].forEach(([ic, t, d], i) => {
    const x = 5.4 + i * 2.51;
    card(s, x, 3.5, 2.31, 1.75);
    disc(s, ic, x + 0.18, 3.66, 0.55);
    text(s, t, x + 0.85, 3.66, 1.4, 0.55, { fontSize: 19, bold: true, valign: "middle" });
    text(s, d, x + 0.18, 4.32, 2.0, 0.9, { fontSize: 15, color: MUTED });
  });
  card(s, 5.4, 5.42, 7.33, 0.72);
  disc(s, "main", 5.55, 5.5, 0.56);
  text(s, "« Je suis avec vous tous les jours, jusqu'à la fin du monde. »", 6.3, 5.42, 6.3, 0.72, { fontSize: 17, italic: true, valign: "middle" });
  text(s, "Qui, cette semaine, entendra de vous l'Évangile?", 5.4, 6.35, 7.33, 0.45, { fontSize: 21, bold: true, color: OR_LT, align: "center" });
  s.addNotes("5 min. Un seul impératif : « faites des disciples »; aller, baptiser, enseigner en décrivent le chemin (2405). Le disciple : « un croyant qui apprend »; « on ne peut être disciple de Christ sans un cœur obéissant » (2405); la foi salvatrice se soumet à Christ comme Seigneur. « Au nom » : « un seul nom et trois personnes » (2405); le Dieu du « Faisons ». Le baptême, signe extérieur d'une foi déjà reçue. « Tout ce que je vous ai prescrit » inclut le grand commandement : faire des disciples, c'est former d'autres porteurs de l'image restaurée. « Je suis avec vous tous les jours » : jusqu'à son retour (2405). Application : aimer son prochain, c'est d'abord lui annoncer Christ.");
}

// 10. Conclusion et appel
{
  const s = pres.addSlide();
  s.background = { path: img("bg-conclusion") };
  text(s, "CONCLUSION ET APPEL", 0.6, 0.42, 8, 0.32, { fontSize: 13, bold: true, color: OR_LT, charSpacing: 3 });
  text(s, "Créés à son image, restaurés en Christ,\ntransformés par l'Esprit, envoyés en son nom.", 0.6, 0.8, 12.1, 1.15, { fontFace: HEAD, fontSize: 30, bold: true });
  const nodes = [["Créés", "Gn 1.27", 2.45], ["Ternis", "Gn 5.3", 3.75], ["Restaurés en Christ", "Col 1.15", 3.4], ["Promis", "Rm 8.29", 3.1],
    ["Transformés", "", 2.8], ["Renouvelés au cœur", "Jr 31.33", 2.5], ["Envoyés", "Mt 28.19", 2.2]];
  const cx = (i) => 1.25 + i * 1.8, D = 0.4;
  nodes.slice(1).forEach((n, k) => {
    const [x1, y1, x2, y2] = [cx(k), nodes[k][2], cx(k + 1), n[2]];
    s.addShape(pres.shapes.LINE, { x: x1, y: Math.min(y1, y2), w: x2 - x1, h: Math.abs(y2 - y1), flipV: y2 < y1,
      line: { color: k === 0 ? ASH : OR, width: 3, dashType: k === 0 ? "dash" : "solid" } });
  });
  nodes.forEach(([t, r, y], i) => {
    const fall = i === 1, last = i === 6;
    s.addShape(pres.shapes.OVAL, { x: cx(i) - D / 2, y: y - D / 2, w: D, h: D, fill: { color: fall ? ASH : last ? OR_LT : BG }, line: { color: fall ? ASH : OR_LT, width: 3 } });
    text(s, [{ text: t, options: { bold: true, breakLine: !!r, color: fall ? MUTED : INK } }, ...(r ? [{ text: r, options: { fontSize: 13, color: MUTED } }] : [])],
      cx(i) - 0.85, y + 0.3, 1.7, 0.75, { fontSize: 16, align: "center" });
  });
  [["À l'incroyant", "Vous portez l'image de Dieu, et vous ne l'avez jamais aimé de tout votre cœur. Christ seul pardonne et restaure : repentez-vous, croyez en lui, soumettez-vous à lui comme Seigneur."],
   ["Au croyant", "Dieu achèvera ce qu'il a décidé avant la fondation du monde : nous serons semblables à lui (1 Jn 3.2). Contemplez Christ dans sa Parole; ainsi l'Esprit vous transforme. Et allez : faites des disciples."]].forEach(([t, d], i) => {
    const x = 0.6 + i * 6.2;
    card(s, x, 4.95, 5.93, 1.75, true);
    text(s, [{ text: t, options: { bold: true, fontSize: 19, color: OR_LT, breakLine: true } }, { text: d }], x + 0.25, 5.1, 5.45, 1.5, { fontSize: 15, valign: "top" });
  });
  s.addNotes("3 min. Récapitulation : créés à son image, ternis par le péché, restaurés en Christ, promis à sa ressemblance, transformés par l'Esprit, renouvelés au cœur, envoyés en son nom. Appel à l'incroyant, puis au croyant.");
}

const out = process.argv[2] || path.join(__dirname, "..", "..", "Presentation-A-l-image-de-Christ.pptx");
pres.writeFile({ fileName: out }).then((f) => console.log("écrit :", f));

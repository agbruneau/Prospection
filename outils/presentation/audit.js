// Contrôle de la présentation contre son plan de prédication.
// Usage : node audit.js [presentation.pptx] [plan.md]    (code de sortie 1 s'il y a des écarts)
// Vérifie : citations « … » et références bibliques retrouvées dans le plan (ou la recherche), codes de sermon connus,
// phrases clés et pièges du plan présents dans les notes, durées, barre de progression, titres, notes, textes alternatifs,
// tailles de police, objets hors de la diapositive.
const fs = require("fs");
const path = require("path");
const JSZip = require("jszip");

const pptx = process.argv[2] || path.join(__dirname, "..", "..", "Presentation-Psaume-19.pptx");
const planPath = process.argv[3] || path.join(__dirname, "..", "..", "Plan-Predication-Psaume-19.md");
const recherchePath = planPath.replace("Plan-Predication-", "Recherche-MacArthur-").replace(/\.md$/, ".json");
const TAILLE_MIN = 13; // pt

const decode = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
const paras = (xml) => [...xml.matchAll(/<a:p>[\s\S]*?<\/a:p>/g)].map((m) => decode([...m[0].matchAll(/<a:t>([^<]*)<\/a:t>/g)].map((r) => r[1]).join("")));
const plat = (s) => s.replace(/[ ‑]/g, (c) => (c === " " ? " " : "-"));
const norm = (s) => plat(s).normalize("NFD").replace(/\p{M}/gu, "").replace(/<\/?[ib]>/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const chaines = (o) => (typeof o === "string" ? [o] : o && typeof o === "object" ? Object.values(o).flatMap(chaines) : []);

const plan = fs.readFileSync(planPath, "utf8");
const recherche = fs.existsSync(recherchePath) ? chaines(JSON.parse(fs.readFileSync(recherchePath, "utf8"))).join(" ") : "";
// Textes de référence supplémentaires : tout fichier « *-neg79.txt » du dossier (versets vérifiés dans la version NEG79).
const versets = fs.readdirSync(__dirname).filter((f) => f.endsWith("-neg79.txt")).map((f) => fs.readFileSync(path.join(__dirname, f), "utf8")).join(" ");
const corpus = norm(plan + " " + recherche + " " + versets);
const corpusPlan = norm(plan);

const erreurs = [];
let controles = 0;
const ok = (cond, msg) => { controles++; if (!cond) erreurs.push(msg); };

(async () => {
  const zip = await JSZip.loadAsync(fs.readFileSync(pptx));
  const sz = (await zip.file("ppt/presentation.xml").async("string")).match(/<p:sldSz cx="(\d+)" cy="(\d+)"/);
  const [LARG, HAUT] = [Number(sz[1]), Number(sz[2])];
  const n = Object.keys(zip.files).filter((f) => /^ppt\/slides\/slide\d+\.xml$/.test(f)).length;
  const notesTous = [];
  let minutes = 0;

  for (let i = 1; i <= n; i++) {
    const xml = await zip.file(`ppt/slides/slide${i}.xml`).async("string");
    const nx = await zip.file(`ppt/notesSlides/notesSlide${i}.xml`).async("string");
    const lignesNotes = paras(nx);
    notesTous.push(...lignesNotes);
    const texte = [...paras(xml), ...lignesNotes];
    const at = (m) => `diapo ${i} : ${m}`;

    ok(xml.includes('<p:ph type="title"/>'), at("pas de titre en espace réservé"));
    ok(lignesNotes.join("").trim().length > 0, at("notes de l'orateur vides"));
    for (const p of xml.matchAll(/<p:pic>[\s\S]*?<\/p:pic>/g)) ok(/descr="[^"]+"/.test(p[0]), at("image sans texte alternatif"));
    const petits = [...xml.matchAll(/ sz="(\d+)"/g)].map((m) => Number(m[1]) / 100).filter((v) => v < TAILLE_MIN);
    ok(!petits.length, at(`${petits.length} texte(s) sous ${TAILLE_MIN} pt (min ${Math.min(...petits)} pt)`));
    for (const m of xml.matchAll(/<a:off x="(-?\d+)" y="(-?\d+)"\/>\s*<a:ext cx="(\d+)" cy="(\d+)"\/>/g)) {
      const [x, y, cx, cy] = m.slice(1).map(Number);
      ok(x >= 0 && y >= 0 && x + cx <= LARG + 1 && y + cy <= HAUT + 1, at(`objet hors de la diapositive (x=${x}, y=${y}, w=${cx}, h=${cy})`));
    }
    const seg = [...xml.matchAll(/<p:sp>(?:(?!<\/p:sp>)[\s\S])*?name="Progression (\d+)"[\s\S]*?<\/p:sp>/g)];
    ok(seg.length === n, at(`barre de progression : ${seg.length} segments pour ${n} diapositives`));
    ok(seg.filter((m) => /<a:srgbClr val="E8742A"/.test(m[0])).length === i, at(`barre de progression : devrait allumer ${i} segment(s)`));

    const m = lignesNotes[0] && lignesNotes[0].match(/^(\d+) min/);
    if (m) minutes += Number(m[1]);

    // Les codes de sermon et « BEM » restent dans les notes : l'assemblée ne les voit pas.
    for (const t of paras(xml)) ok(!/\b(?:80|55|90)-\d+\b|\bTM\d+-\d+\b|\bGTY\d+\b|\bBEM\b/.test(plat(t)), at(`code de source visible sur la diapositive : ${t.slice(0, 70)}`));

    for (const t of texte) {
      for (const q of t.matchAll(/« ?([^»]+?) ?»/g)) {
        const nq = norm(q[1]);
        if (nq.length >= 20) ok(corpus.includes(nq), at(`citation absente du plan : « ${q[1].slice(0, 70)}… »`));
      }
      for (const c of plat(t).matchAll(/\b(80-\d+|55-\d+|90-\d+|GTY\d+|TM19-6|TM\d+-\d+)\b/g))
        ok(corpusPlan.includes(norm(c[1])), at(`code de sermon inconnu du plan : ${c[1]}`));
      for (const r of plat(t).matchAll(/([A-Za-zÉéèêëûô]{3,})[  ](\d+\.\d+[a-c]?(?:-\d+[a-c]?)?)/gi)) {
        if (/^(et|des|les|aux|que|par|sur|dans)$/i.test(r[1])) continue;
        ok(corpus.includes(norm(r[2])) && corpus.includes(norm(r[1])), at(`référence absente du plan : ${r[1]} ${r[2]}`));
      }
    }
  }

  // Durées : la somme des durées annoncées dans les notes égale celle du tableau du plan.
  const duree = [...plan.matchAll(/\|\s*(\d+) min\s*\|/g)].reduce((a, m) => a + Number(m[1]), 0);
  ok(minutes === duree, `durées : ${minutes} min dans les notes, ${duree} min dans le plan`);

  // Contenu du plan retrouvé dans les notes.
  const notes = norm(notesTous.join(" "));
  for (const m of plan.matchAll(/\*Phrase clé : (.+?)\*/g)) ok(notes.includes(norm(m[1])), `phrase clé du plan absente des notes : ${m[1].slice(0, 60)}`);
  const retenir = plan.match(/\*Phrase à faire retenir :\*\s*\*(.+?)\*/) || plan.match(/Phrase à faire retenir :\*\* \*(.+?)\*/);
  if (retenir) ok(notes.includes(norm(retenir[1])), "phrase à faire retenir absente des notes");
  const section = (titre) => (plan.split(new RegExp(`^## ${titre}.*$`, "m"))[1] || "").split(/^## /m)[0];
  for (const m of section("Pièges à éviter").matchAll(/^\d+\. (.+)$/gm)) ok(notes.includes(norm(m[1]).slice(0, 55)), `piège du plan absent des notes : ${m[1].slice(0, 60)}`);
  for (const m of section("Avant de monter en chaire").matchAll(/^- (.+)$/gm)) ok(notes.includes(norm(m[1]).slice(0, 45)), `consigne « Avant de monter en chaire » absente des notes : ${m[1].slice(0, 60)}`);

  console.log(`${n} diapositives, ${controles} contrôles, ${erreurs.length} écart(s)`);
  for (const e of erreurs) console.log("  ✗ " + e);
  process.exit(erreurs.length ? 1 : 0);
})();

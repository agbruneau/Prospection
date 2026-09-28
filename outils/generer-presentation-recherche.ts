// Page de présentation épurée d'une recherche exégétique : reprend tel quel le balisage de
// Recherche-MacArthur-<passage>.html (même gabarit) dans la coquille de Presentation-Recherche-<passage>.html,
// qui porte son propre style et son propre script. Relancer après toute retouche de la recherche.
// Usage : node outils/generer-presentation-recherche.ts Recherche-MacArthur-<passage>.html [coquille.html]
// Sans coquille, la page de présentation existante sert de coquille; pour un nouveau passage, passer celle d'un autre.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";

const [source, coquilleArg] = process.argv.slice(2);
if (!source || !existsSync(source) || !basename(source).startsWith("Recherche-MacArthur-") || !source.endsWith(".html"))
  throw new Error("Usage : node outils/generer-presentation-recherche.ts Recherche-MacArthur-<passage>.html [coquille.html]");
const sortie = join(dirname(source), basename(source).replace("Recherche-MacArthur-", "Presentation-Recherche-"));
const coquilleChemin = coquilleArg ?? sortie;
if (!existsSync(coquilleChemin)) throw new Error("Coquille introuvable : " + coquilleChemin + " (passer une page de présentation existante)");

const recherche = readFileSync(source, "utf8");
const coquille = readFileSync(coquilleChemin, "utf8");
function extraire(texte: string, motif: RegExp, quoi: string): string {
  const m = texte.match(motif);
  if (!m) throw new Error(quoi + " introuvable");
  return m[1];
}

const titre = extraire(recherche, /<title>([\s\S]*?)<\/title>/, "<title> de la recherche");
const description = extraire(recherche, /<meta name="description" content="([^"]*)">/, "Description de la recherche");
// Corps de la recherche sans son script, moins les ornements que la page épurée n'emploie pas.
const ORNEMENTS = /^[ \t]*<div class="(?:grain|vignette|divider|hero__frame|ornament|scrollcue|nav__progress)"[^>]*>.*?<\/div>[ \t]*\r?\n/gm;
const corps = extraire(recherche, /<body[^>]*>([\s\S]*?)<script>/, "Corps de la recherche").replace(ORNEMENTS, "").trim();

const DEBUT = /(<!-- contenu :[^>]*-->)[\s\S]*?(<!-- \/contenu -->)/;
if (!DEBUT.test(coquille)) throw new Error("Marqueurs <!-- contenu : … --> et <!-- /contenu --> absents de " + coquilleChemin);
// Remplacements par fonction : le contenu peut contenir des « $ » que String.replace interpréterait.
const page = coquille
  .replace(/<title>[\s\S]*?<\/title>/, () => `<title>${titre}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, () => `<meta name="description" content="${description}">`)
  .replace(DEBUT, (_, debut, fin) => `${debut}\n${corps}\n${fin}`);

// Contrôles : rien d'essentiel perdu en route, aucun ornement resté.
const compter = (texte: string, motif: RegExp) => (texte.match(motif) ?? []).length;
for (const [quoi, motif] of [["sections", /<article class="section/g], ["versets", /class="verse"/g], ["intertitres", /class="intertitre"/g],
  ["mots", /class="mot"/g], ["renvois", /class="renvoi"/g], ["thèmes", /class="theme"/g]] as const)
  if (compter(page, motif) !== compter(recherche, motif)) throw new Error(`Nombre de ${quoi} différent de la recherche`);
if (/class="(?:grain|vignette|divider|ornament|scrollcue)"/.test(page)) throw new Error("Ornement resté dans la page");
if (!/id="nav"/.test(page) || !/id="hero"/.test(page) || !/class="nav__links"/.test(page)) throw new Error("Navigation ou héros absents");

writeFileSync(sortie, page);
console.log("écrit :", sortie);

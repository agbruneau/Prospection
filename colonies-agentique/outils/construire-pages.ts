// Construit une page autonome (D1 page statique; D2 worker blob:) : `npm run build:pages -- pages/<id>.json`.
// Données injectées au build : définition, résumé de la cible (UC-006), version. Deux builds donnent le même hachage.
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'
import { validerDefinition, type DonneesPage, type PageDefinition, type Resume } from '../src/browser/contrat.ts'
import { CORE_VERSION } from '../src/core/manifest.ts'

const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sha = (s: string) => createHash('sha256').update(s).digest('hex')

async function bundle(entree: string, define: Record<string, string> = {}) {
  const r = await build({ entryPoints: [path.join(RACINE, 'src/browser', entree)], bundle: true, format: 'iife', minify: true, target: 'es2022', write: false, define, legalComments: 'none' })
  return r.outputFiles[0]!.text
}

// Jetons de la charte (07 §6) : texte neutre, couleurs d'identité réservées aux marques, mode sombre, gouttière de 16 px.
const STYLES = `
:root{--fond:#fff;--texte:#111;--doux:#555;--trait:#767676;--fourmi:#D55E00;--abeille:#0072B2;--agent:#CC79A7;--accent:#0b57d0;color-scheme:light dark}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--fond:#121212;--texte:#eee;--doux:#bbb;--trait:#8a8a8a;--accent:#8ab4f8}}
:root[data-theme="dark"]{--fond:#121212;--texte:#eee;--doux:#bbb;--trait:#8a8a8a;--accent:#8ab4f8}
*{box-sizing:border-box}body{margin:0;padding:0 16px 32px;background:var(--fond);color:var(--texte);font:1rem/1.5 system-ui,-apple-system,"Segoe UI",sans-serif;max-width:60rem;margin-inline:auto}
h1{font-size:1.6rem;margin:1rem 0 .25rem}h2{font-size:1.3rem}h3{font-size:1.1rem}a{color:var(--accent)}
nav{display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0}
button{min-height:44px;min-width:44px;padding:.4rem .9rem;font:inherit;border:1px solid var(--trait);border-radius:6px;background:var(--fond);color:var(--texte);cursor:pointer}
button[aria-pressed="true"]{border-width:2px;font-weight:600}button:disabled{opacity:.6;cursor:default}
:focus-visible{outline:3px solid var(--accent);outline-offset:2px}
.boutons{display:flex;gap:.5rem;flex-wrap:wrap;margin:.5rem 0}.controle{display:flex;flex-wrap:wrap;align-items:center;gap:.5rem;margin:.5rem 0}
input[type=range]{min-height:44px;flex:1 1 12rem}
.badge{display:inline-flex;align-items:center;gap:.3rem;font-weight:600;color:var(--texte)}
.enonce{border-left:4px solid var(--trait);padding:.3rem .6rem;margin:.6rem 0}.mention{color:var(--doux)}
.nepas{border:1px solid var(--trait);border-radius:6px;padding:.5rem .8rem;margin:.6rem 0}
figure{margin:.6rem 0}svg{max-width:100%;height:auto}.axe{stroke:var(--trait)}.point{fill:var(--fourmi)}
.courante{stroke:var(--texte);stroke-width:2}.serie{fill:none;stroke:var(--fourmi);stroke-width:2}
canvas{max-width:100%;height:auto;border:1px solid var(--trait)}.manifeste{white-space:pre-wrap;font-size:.85rem;overflow-wrap:anywhere}
.multiples{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem}
.annonce{min-height:1.5em;color:var(--doux)}table{border-collapse:collapse}td,th{padding:.15rem .5rem;border-bottom:1px solid var(--trait)}
`

export async function construirePage(donnees: DonneesPage): Promise<string> {
  const erreurs = validerDefinition(donnees.definition, donnees.resume)
  if (erreurs.length) throw new Error(`Définition refusée :\n${erreurs.join('\n')}`)
  const worker = await bundle('sim-worker.ts')
  const page = await bundle('page.ts', { __SOURCE_WORKER__: JSON.stringify(worker) })
  const json = JSON.stringify(donnees).replace(/</g, '\\u003c')
  return `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${donnees.definition.titre.replace(/</g, '&lt;')}</title><link rel="icon" href="data:,"><style>${STYLES}</style></head>
<body><script type="application/json" id="donnees">${json}</script>
<script>${page.replace(/<\/script/gi, '<\\/script')}</script></body></html>
`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const fichier = process.argv[2]
  if (!fichier) { console.error('Usage : npm run build:pages -- pages/<id>.json'); process.exit(2) }
  const definition = JSON.parse(fs.readFileSync(fichier, 'utf8')) as PageDefinition
  const projet = definition.cible.startsWith('T0.') ? 'S0' : `P${definition.cible.match(/^T(\d+)\./)?.[1]}`
  const chemin = path.join(RACINE, 'data/results', projet, `${definition.cible}.summary.json`)
  if (!fs.existsSync(chemin)) { console.error(`Résumé absent : ${path.relative(RACINE, chemin)} (npm run summarize -- ${definition.cible}, UC-006)`); process.exit(1) }
  const resume = JSON.parse(fs.readFileSync(chemin, 'utf8')) as Resume
  const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: RACINE, encoding: 'utf8' }).trim()
  const donnees: DonneesPage = { definition, resume, version: { coreVersion: CORE_VERSION, commit } }
  try {
    const un = await construirePage(donnees), deux = await construirePage(donnees)
    const sortie = path.join(RACINE, 'pages/dist', `${definition.id}.html`)
    fs.mkdirSync(path.dirname(sortie), { recursive: true })
    fs.writeFileSync(sortie, un)
    console.log(`${path.relative(RACINE, sortie)} : ${Buffer.byteLength(un)} octets, SHA-256 ${sha(un)}; deux builds ${sha(un) === sha(deux) ? 'identiques' : 'DIFFÉRENTS'}`)
    if (sha(un) !== sha(deux)) process.exit(1)
  } catch (e) {
    console.error((e as Error).message)
    process.exit(1)
  }
}

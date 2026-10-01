import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { RACINE } from '../src/cli/run.ts'

// Contrôles de 05 §7.2 (motifs interdits) et §2.2 (imports autorisés).
type Zone = 'core' | 'models' | 'models/reference' | 'models/choreography' | 'policies' | 'analysis' | 'sweep' | 'cli' | 'browser'
const TOUTES: Zone[] = ['core', 'models', 'models/reference', 'models/choreography', 'policies', 'analysis', 'sweep', 'cli', 'browser']
const PERMIS: Record<Zone, Zone[]> = {
  core: ['core'],
  'models/reference': ['core', 'models/reference'],
  'models/choreography': ['core', 'models/reference', 'models/choreography', 'policies'],
  models: ['core', 'models/reference', 'models/choreography'],   // registre src/models/index.ts
  policies: ['core', 'policies'],
  analysis: ['core', 'analysis'],
  sweep: TOUTES.filter(z => z !== 'browser'),
  cli: TOUTES.filter(z => z !== 'browser'),
  browser: ['core', 'models', 'models/reference', 'models/choreography', 'policies', 'analysis', 'browser'],
}
const PARTOUT: [RegExp, string][] = [
  [/\bMath\.random\b/, 'Math.random'], [/\bDate\.now\b/, 'Date.now'], [/\bperformance\.now\b/, 'performance.now'], [/\bnew Date\b/, 'new Date'],
  [/\.sort\(\s*\)/, '.sort() sans comparateur'], [/\bfor\s*\(\s*(?:const|let|var)\s+\w+\s+in\b/, 'for … in'],
]
const NOYAU: [RegExp, string][] = [
  [/\b(?:requestAnimationFrame|setTimeout|setInterval)\b/, 'cadence murale'], [/\bprocess\./, 'process.'], [/from\s+['"]node:/, 'import node:'],
]

const zone = (rel: string): Zone | undefined => {
  const m = rel.match(/^src\/(core|models\/reference|models\/choreography|models|policies|analysis|sweep|cli|browser)\//)
  return m?.[1] as Zone | undefined
}
const sansCommentaires = (s: string) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"`])\/\/.*$/gm, '$1')

/** Violations d'un fichier source situé à `rel` (chemin relatif à la racine du programme). */
export function violations(rel: string, texte: string): string[] {
  const z = zone(rel)
  if (!z) return []
  const code = sansCommentaires(texte), v: string[] = []
  if (['core', 'models', 'models/reference', 'models/choreography', 'policies', 'analysis'].includes(z))
    for (const [re, nom] of PARTOUT) if (re.test(code)) v.push(`${rel} : ${nom}`)
  if (z === 'core' || z.startsWith('models'))
    for (const [re, nom] of NOYAU) if (re.test(code)) v.push(`${rel} : ${nom}`)
  for (const m of code.matchAll(/(?:from|import)\s+['"](\.[^'"]+)['"]/g)) {
    const cible = zone(path.posix.normalize(path.posix.join(path.posix.dirname(rel), m[1]!)))
    if (cible && !PERMIS[z].includes(cible)) v.push(`${rel} : import interdit de ${cible} depuis ${z}`)
  }
  return v
}

const sources = (d: string): string[] => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
  e.isDirectory() ? sources(path.join(d, e.name)) : e.name.endsWith('.ts') ? [path.join(d, e.name)] : [])

test('UC-008 nominal : T0.21 aucun motif interdit ni import hors du tableau des dépendances dans src/', () => {
  const v = sources(path.join(RACINE, 'src')).flatMap(f => violations(path.relative(RACINE, f).split(path.sep).join('/'), fs.readFileSync(f, 'utf8')))
  assert.deepEqual(v, [])
})

test('UC-008 nominal : T0.21 le contrôle détecte chaque motif interdit et chaque import interdit (témoin positif)', () => {
  assert.deepEqual(violations('src/core/x.ts', 'const a = Math.random(); Date.now(); performance.now(); new Date(); b.sort(); for (const k in o) {}'),
    ['src/core/x.ts : Math.random', 'src/core/x.ts : Date.now', 'src/core/x.ts : performance.now', 'src/core/x.ts : new Date', 'src/core/x.ts : .sort() sans comparateur', 'src/core/x.ts : for … in'])
  assert.deepEqual(violations('src/models/reference/m/model.ts', "import fs from 'node:fs'; setTimeout(f); process.exit()"),
    ['src/models/reference/m/model.ts : cadence murale', 'src/models/reference/m/model.ts : process.', 'src/models/reference/m/model.ts : import node:'])
  assert.deepEqual(violations('src/core/x.ts', "import { a } from '../models/index.ts'"), ['src/core/x.ts : import interdit de models depuis core'])
  assert.deepEqual(violations('src/core/x.ts', '// Math.random est interdit\nconst ok = 1'), [])
  assert.deepEqual(violations('src/cli/run.ts', 'const d = new Date()'), [])
})

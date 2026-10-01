// Pilote de mesure du spike (protocole §3) : référence Node, puis cible A dans Chromium, Firefox et WebKit (Playwright).
// Usage : node spikes/phase0/build.ts && node spikes/phase0/mesurer.ts [chromium|firefox|webkit ...]
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, firefox, webkit, type Browser, type Page } from 'playwright'
import { splitMix64, xoshiro128 } from '../../src/core/random.ts'
import { creerJouet, empreintesBlocs, FONCTIONS, sortiesMath } from './jouet.ts'
import { servir } from './serveur.ts'

const ICI = path.dirname(fileURLToPath(import.meta.url))
const SORTIE = path.join(ICI, 'resultats')
const DUREE = Number(process.env.DUREE_MS ?? 10000)   // 10 s par cellule (protocole §3); réduite seulement pour un essai à blanc
fs.mkdirSync(SORTIE, { recursive: true })
const ecrire = (nom: string, v: unknown) => fs.writeFileSync(path.join(SORTIE, nom), JSON.stringify(v, null, 2) + '\n')
const quantile = (v: number[], q: number) => { const s = [...v].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(q * s.length))]! }

// ---------- Référence Node ----------
function reference() {
  const g = xoshiro128(new Uint32Array([1, 2, 3, 4])), s = splitMix64(1477776061723855037n)
  const j = creerJouet(400, 20261001n), empreintes: string[] = []
  for (let k = 0; k < 1000; k++) { j.pas(); empreintes.push(j.empreinte()) }
  const pas: Record<string, { mediane: number; p95: number }> = {}
  for (const [n, k] of [[1e4, 1000], [1e5, 200]] as const) {
    const jj = creerJouet(n, 20261001n), d: number[] = []
    for (let i = 0; i < k; i++) { const t0 = performance.now(); jj.pas(); d.push(performance.now() - t0) }
    pas[String(n)] = { mediane: quantile(d, 0.5), p95: quantile(d, 0.95) }
  }
  return {
    moteur: `Node ${process.version} (V8 ${process.versions.v8})`, t01: Array.from({ length: 10 }, () => g.u32()), t03: [s(), s(), s()].map(String),
    empreintes, e05: Object.fromEntries(FONCTIONS.map(f => [f, empreintesBlocs(sortiesMath(f))])), pas,
  }
}

// ---------- Navigateurs ----------
const MOTEURS: Record<string, () => Promise<Browser>> = {
  chromium: () => chromium.launch({ channel: 'chrome' }),
  firefox: () => firefox.launch(),
  webkit: () => webkit.launch(),
}

async function mesurer(nom: string, url: string, ref: ReturnType<typeof reference>) {
  const navigateur = await MOTEURS[nom]!()
  const contexte = await navigateur.newContext({ acceptDownloads: true, viewport: { width: 800, height: 900 } })
  const page = await contexte.newPage()
  const erreurs: string[] = []
  page.on('console', m => { if (m.type() === 'error') erreurs.push(m.text()) })
  page.on('pageerror', e => erreurs.push(e.message))
  await page.goto(url)
  await page.waitForSelector('body[data-pret="oui"]')
  const ev = <T>(f: string, ...a: unknown[]) => page.evaluate(([f, a]) => (globalThis as any).spike[f as string](...(a as unknown[])), [f, a] as const) as Promise<T>
  const r: Record<string, unknown> = { moteur: `${nom} ${navigateur.version()}` }

  // SPK8 et SPK1
  r.t01 = await ev<number[]>('t01')
  r.t03 = await ev<string[]>('t03')
  r.t01Identique = JSON.stringify(r.t01) === JSON.stringify(ref.t01)
  r.t03Identique = JSON.stringify(r.t03) === JSON.stringify(ref.t03)
  const e1 = await ev<string[]>('empreintesJouet', 400, 1000), e2 = await ev<string[]>('empreintesJouet', 400, 1000)
  r.spk1MemeNavigateur = JSON.stringify(e1) === JSON.stringify(e2)
  const premier = e1.findIndex((e, k) => e !== ref.empreintes[k])
  r.jouetPremierPasDivergent = premier < 0 ? null : premier + 1
  r.jouetEmpreinte1000 = e1.at(-1)

  // E0.5 : blocs qui diffèrent de Node, puis décompte exact des sorties différentes
  const e05: Record<string, { blocsDifferents: number; sortiesDifferentes: number }> = {}
  for (const f of FONCTIONS) {
    const blocs = await ev<string[]>('e05Blocs', f)
    const diff = blocs.map((b, k) => (b === ref.e05[f]![k] ? -1 : k)).filter(k => k >= 0)
    let sorties = 0
    const nodeSorties = sortiesMath(f)
    for (let i = 0; i < diff.length; i += 50) {
      const lot = diff.slice(i, i + 50), valeurs = await ev<number[][]>('e05Valeurs', f, lot)
      lot.forEach((b, k) => valeurs[k]!.forEach((v, m) => { if (!Object.is(v, nodeSorties[b * 1000 + m])) sorties++ }))
    }
    e05[f] = { blocsDifferents: diff.length, sortiesDifferentes: sorties }
  }
  r.e05 = e05

  // SPK2, SPK3
  r.workers = await ev('workers')
  r.transfert = await ev('transfert')

  // SPK4, SPK5 (E0.4) : 10 s par cellule
  const perf: Record<string, unknown> = {}
  for (const n of [1e4, 1e5]) {
    for (const fil of ['principal', 'worker'])
      for (const dessin of ['pixels', 'chemin'])
        perf[`${n}/${fil}/${dessin}`] = await ev('perf', n, fil, dessin, DUREE)
    perf[`${n}/offscreen`] = await ev('offscreen', n, DUREE)
  }
  r.perf = perf

  // SPK6 : cadence de rendu, puis page masquée par une seconde page au premier plan
  const cadence: Record<string, unknown> = {}
  for (const rendu of ['aucun', 'chaque', 'quart']) cadence[rendu] = await ev('cadence', rendu)
  const devant = await contexte.newPage()
  await devant.goto('about:blank')
  await devant.bringToFront()
  cadence.masquee = await ev('cadence', 'chaque')
  await devant.close()
  r.cadence = cadence
  const empreintesCadence = ['aucun', 'chaque', 'quart', 'masquee'].map(k => (cadence[k] as { empreinte: string }).empreinte)
  r.spk6Identiques = new Set(empreintesCadence).size === 1

  // SPK7 : fichiers reçus par le pilote, hachés dans Node
  await page.bringToFront()
  const recus: Record<string, string> = {}
  const telechargements = new Promise<void>(ok => {
    let k = 0
    page.on('download', async d => {
      const f = await d.path()
      recus[d.suggestedFilename()] = createHash('sha256').update(fs.readFileSync(f)).digest('hex')
      if (++k === 2) ok()
    })
  })
  const exp = await ev<{ sha: Record<string, string> }>('exporter')
  await Promise.race([telechargements, new Promise(ok => setTimeout(ok, 15000))])
  r.export = { page: exp.sha, recus, identiques: Object.keys(exp.sha).every(k => recus[k] === exp.sha[k]) }

  r.erreursConsole = erreurs
  await navigateur.close()
  return r
}

const choisis = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(MOTEURS)
const ref = reference()
ecrire('node.json', { ...ref, empreintes: { pas1: ref.empreintes[0], pas1000: ref.empreintes.at(-1) } })
ecrire('environnement.json', { date: new Date().toISOString(), os: `${os.type()} ${os.release()}`, cpu: os.cpus()[0]?.model, coeurs: os.cpus().length, memoireGo: Math.round(os.totalmem() / 2 ** 30), node: process.version })
const { url, fermer } = await servir(path.join(ICI, 'dist'))
for (const nom of choisis) {
  console.log(`mesure : ${nom}`)
  try { ecrire(`${nom}.json`, await mesurer(nom, url, ref)) } catch (e) { ecrire(`${nom}.json`, { echec: (e as Error).stack }) ; console.log(`échec : ${nom} : ${(e as Error).message}`) }
}
fermer()

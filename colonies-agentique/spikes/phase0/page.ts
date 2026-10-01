// Page du spike (cible A : page statique; cible B : artifact). Expose window.spike au pilote de mesure.
// Aucun calcul de simulation ici : le jouet et le noyau font tout; la page mesure, dessine et exporte.
import { empreinte } from '../../src/core/fingerprint.ts'
import { splitMix64, xoshiro128 } from '../../src/core/random.ts'
import { creerJouet, empreintesBlocs, FONCTIONS, sortiesMath, type Fonction } from './jouet.ts'

declare const __SOURCE_WORKER__: string
const GRAINE = '20261001'
const journal = (l: string) => { document.getElementById('journal')!.textContent += l + '\n' }
const canvas = () => document.getElementById('scene') as HTMLCanvasElement
const violations: string[] = []
document.addEventListener('securitypolicyviolation', e => violations.push(`${e.violatedDirective} ${e.blockedURI}`))

const quantile = (v: number[], q: number) => { const s = [...v].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(q * s.length))]! : NaN }
const prochaineImage = () => new Promise<number>(r => requestAnimationFrame(r))
const attendre = (w: Worker, type: string, delai = 20000) => new Promise<any>((ok, ko) => {
  const t = setTimeout(() => ko(new Error(`délai dépassé : ${type}`)), delai)
  const f = (e: MessageEvent) => { if (e.data.type === type) { clearTimeout(t); w.removeEventListener('message', f); ok(e.data) } }
  w.addEventListener('message', f)
})
const creerWorker = (mode: 'blob' | 'fichier') =>
  mode === 'blob' ? new Worker(URL.createObjectURL(new Blob([__SOURCE_WORKER__], { type: 'text/javascript' }))) : new Worker('worker.js')

function dessinateur(mode: 'pixels' | 'chemin', L: number) {
  const c = canvas(), ctx = c.getContext('2d')!, w = c.width, h = c.height
  const image = ctx.createImageData(w, h), u32 = new Uint32Array(image.data.buffer)
  return (x: Float32Array, y: Float32Array) => {
    if (mode === 'pixels') {
      u32.fill(0xffffffff)
      for (let i = 0; i < x.length; i++) u32[Math.floor(y[i]! / L * h) * w + Math.floor(x[i]! / L * w)] = 0xff000000
      ctx.putImageData(image, 0, 0)
    } else {
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, w, h)
      ctx.beginPath()
      for (let i = 0; i < x.length; i++) ctx.rect(x[i]! / L * w, y[i]! / L * h, 1, 1)
      ctx.fillStyle = '#000'
      ctx.fill()
    }
  }
}

const spike = {
  t01: () => { const g = xoshiro128(new Uint32Array([1, 2, 3, 4])); return Array.from({ length: 10 }, () => g.u32()) },
  t03: () => { const s = splitMix64(1477776061723855037n); return [s(), s(), s()].map(String) },

  /** SPK1, SPK8 : empreinte du jouet après chaque pas, sur le fil principal. */
  empreintesJouet(n = 400, pas = 1000) {
    const j = creerJouet(n, BigInt(GRAINE)), e: string[] = []
    dessinateur('pixels', j.L)(j.x, j.y)
    for (let k = 0; k < pas; k++) { j.pas(); e.push(j.empreinte()) }
    return e
  },

  /** E0.5 */
  e05Blocs: (f: Fonction) => empreintesBlocs(sortiesMath(f)),
  e05Valeurs: (f: Fonction, blocs: number[]) => { const s = sortiesMath(f); return blocs.map(b => Array.from(s.subarray(b * 1000, b * 1000 + 1000))) },
  fonctions: () => [...FONCTIONS],

  /** SPK2 : worker depuis une URL blob: et depuis un fichier publié avec la page. */
  async workers() {
    const r: Record<string, string> = {}
    for (const mode of ['blob', 'fichier'] as const) {
      try {
        const w = creerWorker(mode)
        const erreur = new Promise<never>((_, ko) => { w.onerror = e => ko(new Error(e.message || 'erreur de worker')) })
        w.postMessage({ type: 'ping' })
        await Promise.race([attendre(w, 'pong', 5000), erreur])
        r[mode] = 'ok'
        w.terminate()
      } catch (e) { r[mode] = `échec : ${(e as Error).message}` }
    }
    return { ...r, violations }
  },

  /** SPK3 : aller-retour de 4 Float32Array de 10⁵ éléments par transfert. */
  async transfert(tours = 50) {
    const w = creerWorker('blob')
    let bufs = Array.from({ length: 4 }, () => new Float32Array(1e5).buffer)
    const durees: number[] = []
    let detache = false
    for (let i = 0; i < tours; i++) {
      const t0 = performance.now()
      w.postMessage({ type: 'transfert', bufs }, bufs)
      if (i === 0) detache = bufs.every(b => b.byteLength === 0)
      bufs = (await attendre(w, 'transfert')).bufs
      durees.push(performance.now() - t0)
    }
    w.terminate()
    return { mediane: quantile(durees, 0.5), p95: quantile(durees, 0.95), detache, crossOriginIsolated: globalThis.crossOriginIsolated === true, octets: 4 * 4e5 }
  },

  /** SPK4, SPK5 : boucle d'images pendant `duree` ms, un pas par image. */
  async perf(n: number, fil: 'principal' | 'worker', dessin: 'pixels' | 'chemin', duree = 10000) {
    const images: number[] = [], pas: number[] = []
    let precedente = await prochaineImage()
    const debut = precedente
    if (fil === 'principal') {
      const j = creerJouet(n, BigInt(GRAINE)), dessiner = dessinateur(dessin, j.L)
      while (precedente - debut < duree) {
        const t0 = performance.now(); j.pas(); pas.push(performance.now() - t0)
        dessiner(j.x, j.y)
        const t = await prochaineImage(); images.push(t - precedente); precedente = t
      }
      return { images: images.length, medianeImage: quantile(images, 0.5), p95Image: quantile(images, 0.95), medianePas: quantile(pas, 0.5), p95Pas: quantile(pas, 0.95), pasParSeconde: pas.length / (duree / 1000) }
    }
    const w = creerWorker('blob')
    w.postMessage({ type: 'init', n, graine: GRAINE }); await attendre(w, 'pret')
    const L = Math.sqrt(n / 4), dessiner = dessinateur(dessin, L)
    let dernier: { x: Float32Array; y: Float32Array } | undefined, enCours = false
    const demander = (x: ArrayBuffer, y: ArrayBuffer) => { enCours = true; w.postMessage({ type: 'pas', k: 1, x, y }, [x, y]) }
    w.onmessage = e => { if (e.data.type === 'etat') { pas.push(e.data.dt); dernier = { x: new Float32Array(e.data.x), y: new Float32Array(e.data.y) }; enCours = false } }
    demander(new Float32Array(n).buffer, new Float32Array(n).buffer)
    while (precedente - debut < duree) {
      if (dernier && !enCours) { dessiner(dernier.x, dernier.y); demander(dernier.x.buffer as ArrayBuffer, dernier.y.buffer as ArrayBuffer); dernier = undefined }
      const t = await prochaineImage(); images.push(t - precedente); precedente = t
    }
    w.terminate()
    return { images: images.length, medianeImage: quantile(images, 0.5), p95Image: quantile(images, 0.95), medianePas: quantile(pas, 0.5), p95Pas: quantile(pas, 0.95), pasParSeconde: pas.length / (duree / 1000) }
  },

  /** SPK5 c : calcul et dessin dans le worker (OffscreenCanvas), images pilotées par la page. */
  async offscreen(n: number, duree = 10000) {
    const c = document.createElement('canvas')
    c.width = c.height = 600
    if (!('transferControlToOffscreen' in c)) return { disponible: false }
    const w = creerWorker('blob'), off = c.transferControlToOffscreen()
    w.postMessage({ type: 'init', n, graine: GRAINE }); await attendre(w, 'pret')
    w.postMessage({ type: 'offscreen', canvas: off }, [off]); await attendre(w, 'pret')
    const images: number[] = [], pas: number[] = []
    let precedente = await prochaineImage()
    const debut = precedente
    while (precedente - debut < duree) {
      w.postMessage({ type: 'image' })
      pas.push((await attendre(w, 'fait')).dt)
      const t = await prochaineImage(); images.push(t - precedente); precedente = t
    }
    w.terminate()
    return { disponible: true, images: images.length, medianeImage: quantile(images, 0.5), p95Image: quantile(images, 0.95), medianePas: quantile(pas, 0.5) }
  },

  /** SPK6 : le worker calcule par paquets, pilotés par messages; le rendu lit le dernier état à sa cadence. */
  async cadence(rendu: 'aucun' | 'chaque' | 'quart', n = 400, cible = 1000) {
    const w = creerWorker('blob')
    w.postMessage({ type: 'init', n, graine: GRAINE }); await attendre(w, 'pret')
    const dessiner = dessinateur('pixels', Math.sqrt(n / 4))
    let dernier = { x: new Float32Array(n), y: new Float32Array(n) }, compteur = 0, images = 0, actif = rendu !== 'aucun'
    const boucle = async () => { while (actif) { images++; if (rendu === 'chaque' || images % 4 === 0) dessiner(dernier.x, dernier.y); await prochaineImage() } }
    const rendus = boucle()
    while (compteur < cible) {
      w.postMessage({ type: 'pas', k: 10, jusqua: cible, x: dernier.x.buffer, y: dernier.y.buffer }, [dernier.x.buffer, dernier.y.buffer])
      const e = await attendre(w, 'etat')
      dernier = { x: new Float32Array(e.x), y: new Float32Array(e.y) }
      compteur = e.compteur
    }
    w.postMessage({ type: 'empreinte' })
    const { valeur } = await attendre(w, 'empreinte')
    actif = false
    await Promise.race([rendus, new Promise(r => setTimeout(r, 100))])
    w.terminate()
    return { empreinte: valeur, compteur, images, visibilite: document.visibilityState }
  },

  /** SPK7 : export d'un CSV d'environ 1 Mo et d'un manifeste par Blob et <a download>. */
  async exporter() {
    const j = creerJouet(400, BigInt(GRAINE)), lignes = ['pas,i,x,y,theta']
    for (let k = 0; k < 60; k++) { j.pas(); for (let i = 0; i < j.n; i++) lignes.push(`${k},${i},${j.x[i]},${j.y[i]},${j.theta[i]}`) }
    const csv = lignes.join('\n') + '\n'
    const manifeste = JSON.stringify({ schema: 1, empreinte: j.empreinte(), graine: GRAINE, pas: j.compteur() }, null, 2) + '\n'
    const sha: Record<string, string> = {}
    for (const [nom, texte, type] of [['spike.series.csv', csv, 'text/csv'], ['spike.manifest.json', manifeste, 'application/json']] as const) {
      const blob = new Blob([texte], { type })
      const octets = new Uint8Array(await crypto.subtle.digest('SHA-256', await blob.arrayBuffer()))
      sha[nom] = Array.from(octets, b => b.toString(16).padStart(2, '0')).join('')
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = nom
      document.body.append(a)
      a.click()
      a.remove()
    }
    return { sha, octets: csv.length }
  },

  empreinteVide: () => empreinte([]),
}
Object.assign(globalThis, { spike })

// État initial affiché dès le chargement (SPK1)
const initial = creerJouet(400, BigInt(GRAINE))
dessinateur('pixels', initial.L)(initial.x, initial.y)
journal(`Spike de la phase 0 : jouet de Vicsek, N = 400, empreinte initiale ${initial.empreinte()}`)
journal(`T0.1 : ${spike.t01().join(', ')}`)
journal(`T0.3 : ${spike.t03().join(', ')}`)
document.body.dataset.pret = 'oui'

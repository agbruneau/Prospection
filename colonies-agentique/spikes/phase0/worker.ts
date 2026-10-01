// Worker du spike : calcule le jouet, renvoie les positions par transfert, dessine dans un OffscreenCanvas (SPK5 c).
// performance.now() ne sert qu'à mesurer, jamais à cadencer la simulation.
import { creerJouet, type Jouet } from './jouet.ts'

interface Portee { postMessage(m: unknown, t?: Transferable[]): void; onmessage: ((e: MessageEvent) => void) | null }
const portee = self as unknown as Portee
let jouet: Jouet | undefined
let ecran: { ctx: OffscreenCanvasRenderingContext2D; image: ImageData; u32: Uint32Array; w: number; h: number } | undefined

function etat(x: ArrayBuffer, y: ArrayBuffer, dt: number) {
  const bx = new Float32Array(x), by = new Float32Array(y)
  bx.set(jouet!.x)
  by.set(jouet!.y)
  portee.postMessage({ type: 'etat', x: bx.buffer, y: by.buffer, dt, compteur: jouet!.compteur() }, [bx.buffer, by.buffer])
}

portee.onmessage = e => {
  const m = e.data
  switch (m.type) {
    case 'ping': portee.postMessage({ type: 'pong' }); break
    case 'init': jouet = creerJouet(m.n, BigInt(m.graine)); portee.postMessage({ type: 'pret' }); break
    case 'pas': {                                       // k pas, puis positions par transfert dans les tampons reçus
      const t0 = performance.now()
      for (let i = 0; i < m.k && jouet!.compteur() < (m.jusqua ?? Infinity); i++) jouet!.pas()
      etat(m.x, m.y, performance.now() - t0)
      break
    }
    case 'empreinte': portee.postMessage({ type: 'empreinte', valeur: jouet!.empreinte(), compteur: jouet!.compteur() }); break
    case 'transfert': portee.postMessage({ type: 'transfert', bufs: m.bufs }, m.bufs); break
    case 'offscreen': {
      const ctx = (m.canvas as OffscreenCanvas).getContext('2d')!
      const image = ctx.createImageData(m.canvas.width, m.canvas.height)
      ecran = { ctx, image, u32: new Uint32Array(image.data.buffer), w: m.canvas.width, h: m.canvas.height }
      portee.postMessage({ type: 'pret' })
      break
    }
    case 'image': {                                     // un pas, puis dessin par pixels dans l'OffscreenCanvas
      const t0 = performance.now()
      jouet!.pas()
      const dt = performance.now() - t0
      const { ctx, image, u32, w, h } = ecran!
      u32.fill(0xffffffff)
      for (let i = 0; i < jouet!.n; i++) u32[Math.floor(jouet!.y[i]! / jouet!.L * h) * w + Math.floor(jouet!.x[i]! / jouet!.L * w)] = 0xff000000
      ctx.putImageData(image, 0, 0)
      portee.postMessage({ type: 'fait', dt })
      break
    }
  }
}

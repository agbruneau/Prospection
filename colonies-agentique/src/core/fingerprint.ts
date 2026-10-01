// FNV-1a 64 bits (identification, non cryptographique), en deux moitiés de 32 bits pour éviter BigInt sur les gros tampons.
// Premier facteur 0x100000001b3 = 2^40 + 0x1b3 : produit modulo 2^64 exact en doubles (05 §4.7).

if (new Uint8Array(new Uint32Array([1]).buffer)[0] !== 1) throw new Error('plateforme gros-boutiste : empreintes non comparables')

export interface Fnv { hi: number; lo: number }

export function fnvDebut(): Fnv { return { hi: 0xcbf29ce4, lo: 0x84222325 } }

export function fnvAjouter(h: Fnv, octets: Uint8Array): void {
  let { hi, lo } = h
  for (let i = 0; i < octets.length; i++) {
    lo = (lo ^ octets[i]!) >>> 0
    const bas = lo * 0x1b3
    hi = (hi * 0x1b3 + lo * 0x100 + Math.floor(bas / 4294967296)) >>> 0
    lo = bas >>> 0
  }
  h.hi = hi
  h.lo = lo
}

export function fnvHex(h: Fnv): string {
  return h.hi.toString(16).padStart(8, '0') + h.lo.toString(16).padStart(8, '0')
}

export function fnv1a64Texte(texte: string): string {
  const h = fnvDebut()
  fnvAjouter(h, new TextEncoder().encode(texte))
  return fnvHex(h)
}

/** Empreinte d'état : FNV-1a 64 sur les octets de tous les tampons, dans l'ordre (flux compris). */
export function empreinte(tampons: readonly ArrayBufferView[]): string {
  const h = fnvDebut()
  for (const t of tampons) fnvAjouter(h, new Uint8Array(t.buffer, t.byteOffset, t.byteLength))
  return fnvHex(h)
}

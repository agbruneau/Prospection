// Aléa contrôlé (05 §4.1) : xoshiro128** [Blackman et Vigna 2021], initialisé par SplitMix64; flux nommés.
import { fnv1a64Texte } from './fingerprint.ts'

export interface Prng {
  u32(): number
  uniform(): number                 // [0, 1), 53 bits
  uniformOpen(): number             // (0, 1)
  int(boundExclusive: number): number
  normal(): number                  // polaire, sans mémoire
  exponential(rate: number): number
  poisson(lambda: number): number   // lève une erreur au-delà de LAMBDA_MAX
  shuffle(a: Int32Array): void
  state(): Uint32Array              // copie, pour le manifeste
  buffer(): Uint32Array             // état vivant, pour l'empreinte
  derive(name: string): Prng
}

const MASQUE64 = (1n << 64n) - 1n

/** SplitMix64 (vecteur T0.3). Renvoie la fonction « sortie suivante ». */
export function splitMix64(graine: bigint): () => bigint {
  let s = graine & MASQUE64
  return () => {
    s = (s + 0x9e3779b97f4a7c15n) & MASQUE64
    let z = s
    z = ((z ^ (z >> 30n)) * 0xbf58476d1ce4e5b9n) & MASQUE64
    z = ((z ^ (z >> 27n)) * 0x94d049bb133111ebn) & MASQUE64
    return z ^ (z >> 31n)
  }
}

// Borne de l'inversion séquentielle de Poisson [à confirmer par le test du khi-deux de 05 §9.6] :
// au-delà, exp(-λ) et la somme cumulée perdent trop de précision.
export const LAMBDA_MAX = 30

const rotl = (x: number, k: number) => ((x << k) | (x >>> (32 - k))) >>> 0
const DEUX_26 = 67108864
const DEUX_53 = 9007199254740992

/** Générateur à partir d'un état explicite de quatre mots (vecteur T0.1); `derive` exige un flux nommé. */
export function xoshiro128(etat: Uint32Array, derive: (name: string) => Prng = () => { throw new Error('derive : générateur sans graine maîtresse') }): Prng {
  if (etat.length !== 4 || etat.every(x => x === 0)) throw new Error('état xoshiro128** invalide (quatre mots, pas tous nuls)')
  const s = Uint32Array.from(etat)
  const u32 = () => {
    const s0 = s[0]!, s1 = s[1]!, s2 = s[2]! ^ s0, s3 = s[3]! ^ s1
    const r = Math.imul(rotl(Math.imul(s1, 5) >>> 0, 7), 9) >>> 0
    s[0] = s0 ^ s3
    s[1] = s1 ^ s2
    s[2] = s2 ^ (s1 << 9)
    s[3] = rotl(s3 >>> 0, 11)
    return r
  }
  const bits53 = () => (u32() >>> 5) * DEUX_26 + (u32() >>> 6)
  const uniform = () => bits53() / DEUX_53
  const uniformOpen = () => (bits53() + 0.5) / DEUX_53
  const int = (n: number) => {
    if (!Number.isInteger(n) || n < 1 || n > 4294967296) throw new Error(`int : borne invalide ${n}`)
    return Math.floor(uniform() * n)
  }
  return {
    u32, uniform, uniformOpen, int, derive,
    normal() {
      for (;;) {
        const u = 2 * uniform() - 1
        const v = 2 * uniform() - 1
        const q = u * u + v * v
        if (q > 0 && q < 1) return u * Math.sqrt(-2 * Math.log(q) / q)
      }
    },
    exponential(rate) {
      if (!(rate > 0)) throw new Error(`exponential : taux invalide ${rate}`)
      return -Math.log(uniformOpen()) / rate
    },
    poisson(lambda) {
      if (!(lambda >= 0) || lambda > LAMBDA_MAX) throw new Error(`poisson : λ = ${lambda} hors de [0, ${LAMBDA_MAX}]`)
      const u = uniform()
      let p = Math.exp(-lambda), cumul = p, k = 0
      while (u >= cumul && p > 0) { k++; p *= lambda / k; cumul += p }
      return k
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = int(i + 1)
        const x = a[i]!
        a[i] = a[j]!
        a[j] = x
      }
    },
    state: () => Uint32Array.from(s),
    buffer: () => s,
  }
}

/** Flux nommé : SplitMix64 de (graine maîtresse XOR FNV-1a-64(nom)); deux sorties = quatre mots, bas puis haut.
 *  `derive(n)` est le flux nommé `<nom>/<n>` : il ne dépend ni de l'état du parent ni des autres dérivés. */
export function createStream(masterSeed: bigint, name: string): Prng {
  const suivant = splitMix64(masterSeed ^ BigInt('0x' + fnv1a64Texte(name)))
  const a = suivant(), b = suivant()
  const etat = new Uint32Array([Number(a & 0xffffffffn), Number(a >> 32n), Number(b & 0xffffffffn), Number(b >> 32n)])
  return xoshiro128(etat, sous => createStream(masterSeed, `${name}/${sous}`))
}

/** Graine de la répétition i d'une graine maîtresse (05 §7.4, pairage by-repetition) : chaîne décimale de 64 bits. */
export function graineDeRepetition(masterSeed: bigint, i: number): string {
  return splitMix64(masterSeed ^ BigInt('0x' + fnv1a64Texte(`run/${i}`)))().toString()
}

/** Graine du couple (point, répétition) d'un balayage au pairage by-cell (05 §7.4) : graines indépendantes entre points. */
export function graineDeCellule(masterSeed: bigint, point: number, i: number): string {
  return splitMix64(masterSeed ^ BigInt('0x' + fnv1a64Texte(`run/${point}/${i}`)))().toString()
}

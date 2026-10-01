// Événements discrets (05 §4.5) : tas binaire sur la clé (temps, numéro d'insertion). Deux événements au même temps sortent dans
// l'ordre d'insertion. Annulation paresseuse : compteur de génération par agent. Stockage en tableaux typés.

export interface Evenement { time: number; kind: number; agent: number }

export function createEventQueue(capaciteInitiale = 64) {
  let cap = capaciteInitiale, n = 0, sequence = 0
  let temps = new Float64Array(cap), seq = new Float64Array(cap), genre = new Int32Array(cap), agent = new Int32Array(cap), gen = new Int32Array(cap)
  let generations = new Int32Array(16)
  const avant = (i: number, j: number) => temps[i]! < temps[j]! || (temps[i] === temps[j] && seq[i]! < seq[j]!)
  const echanger = (i: number, j: number) => {
    for (const t of [temps, seq] as Float64Array[]) { const x = t[i]!; t[i] = t[j]!; t[j] = x }
    for (const t of [genre, agent, gen] as Int32Array[]) { const x = t[i]!; t[i] = t[j]!; t[j] = x }
  }
  const agrandir = () => {
    cap *= 2
    const f = (a: Float64Array) => { const b = new Float64Array(cap); b.set(a); return b }, g = (a: Int32Array) => { const b = new Int32Array(cap); b.set(a); return b }
    temps = f(temps); seq = f(seq); genre = g(genre); agent = g(agent); gen = g(gen)
  }
  const generation = (a: number) => {
    if (a >= generations.length) { const b = new Int32Array(Math.max(a + 1, generations.length * 2)); b.set(generations); generations = b }
    return generations[a]!
  }
  return {
    get size() { return n },
    /** Planifie un événement; `agent` sert à l'annulation (−1 : aucun agent). */
    push(time: number, kind: number, agentId = -1) {
      if (!Number.isFinite(time)) throw new Error(`événement à un temps non fini : ${time}`)
      if (n === cap) agrandir()
      temps[n] = time; seq[n] = sequence++; genre[n] = kind; agent[n] = agentId; gen[n] = agentId < 0 ? 0 : generation(agentId)
      for (let i = n++; i > 0;) { const p = (i - 1) >> 1; if (!avant(i, p)) break; echanger(i, p); i = p }
    },
    /** Annule tous les événements déjà planifiés pour cet agent. */
    invalidate(agentId: number) { generation(agentId); generations[agentId]!++ },
    /** Prochain événement valide, ou null. */
    pop(): Evenement | null {
      while (n > 0) {
        const e = { time: temps[0]!, kind: genre[0]!, agent: agent[0]! }, g = gen[0]!
        echanger(0, --n)
        for (let i = 0; ;) {
          const l = 2 * i + 1, r = l + 1
          let m = i
          if (l < n && avant(l, m)) m = l
          if (r < n && avant(r, m)) m = r
          if (m === i) break
          echanger(i, m); i = m
        }
        if (e.agent < 0 || g === generations[e.agent]) return e
      }
      return null
    },
  }
}

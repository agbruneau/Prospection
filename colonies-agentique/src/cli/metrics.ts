// UC-007 Calculer les métriques R et G : npm run metrics -- <id>. Plan : metrics/<id>.json; rapport : data/metrics/<id>.metrics.json.
// Scores au format long `seed,arm,score`; journal du canal `seed,W,M,readers,addressed` (06 §2.1); issues individuelles
// `seed,agent,success` pour le contrôle « précision du vote ≤ 1 − β » (06 §4.5).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { icPercentile, reechantillonner } from '../analysis/bootstrap.ts'
import { gainApparie, rAdr, rEff, rNom, rPers, rPort, type ResultatGain, type ValeurG } from '../analysis/metrics.ts'
import { createStream } from '../core/random.ts'
import { RACINE } from './run.ts'

type Reference = 'ind' | 'vote' | 'fort' | 'regles'
export interface PlanMetriques {
  id: string
  runs: string
  arm: string
  references: readonly Reference[]
  pMax: number
  epsilon: number
  bootstrap: { B: number; seed: string }
  journal?: string
  channel?: { alphabet?: number; N?: number; persistence?: Parameters<typeof rPers>[0] }
  individuals?: string
}

export class MetriquesImpossibles extends Error {}
const lireCsv = (f: string) => fs.readFileSync(f, 'utf8').trim().split('\n').slice(1).map(l => l.split(','))
const fmt = (x: number) => Number(x.toPrecision(4))
const texteG = (g: ValeurG, ic?: readonly number[], raison?: string) => (typeof g === 'number' ? `${fmt(g)} [${fmt(ic![0]!)} ; ${fmt(ic![1]!)}]` : `${g}${raison ? ` (${raison})` : ''}`)

/** Étapes 1 à 9 et flots A1 à A4, E1; renvoie le code de sortie. */
export function calculer(id: string, options: { racine?: string; journal?: (l: string) => void } = {}): number {
  const { racine = RACINE, journal: afficher = console.log } = options
  try {
    let plan: PlanMetriques
    try { plan = JSON.parse(fs.readFileSync(path.join(racine, 'metrics', `${id}.json`), 'utf8')) as PlanMetriques } catch (e) { throw new MetriquesImpossibles(`Plan de métriques illisible : ${(e as Error).message}`) }
    if (plan.id !== id || !(plan.pMax > 0) || !(plan.epsilon >= 0) || !(plan.bootstrap?.B > 0) || !plan.references?.includes('ind'))
      throw new MetriquesImpossibles('Plan de métriques invalide : id, pMax, epsilon, bootstrap et la référence ind sont requis')

    // Étape 2, E1 : une exécution par graine et par bras, mêmes graines dans tous les bras.
    const parBras = new Map<string, Map<string, number>>()
    for (const [seed, bras, score] of lireCsv(path.join(racine, plan.runs))) {
      const m = parBras.get(bras!) ?? new Map<string, number>()
      if (m.has(seed!)) throw new MetriquesImpossibles(`Métriques impossibles : bras ${bras}, graine ${seed} en double`)
      m.set(seed!, Number(score)); parBras.set(bras!, m)
    }
    const graines = [...(parBras.get(plan.arm)?.keys() ?? [])]
    for (const bras of [plan.arm, ...plan.references]) {
      const m = parBras.get(bras)
      if (!m) throw new MetriquesImpossibles(`Métriques impossibles : bras ${bras}, graine ${graines[0] ?? '—'} absente`)
      for (const g of graines) if (!m.has(g)) throw new MetriquesImpossibles(`Métriques impossibles : bras ${bras}, graine ${g} absente`)
      for (const g of m.keys()) if (!parBras.get(plan.arm)!.has(g)) throw new MetriquesImpossibles(`Métriques impossibles : bras ${plan.arm}, graine ${g} absente`)
    }
    const scores = (bras: string) => graines.map(g => parBras.get(bras)!.get(g)!)
    const flux = (nom: string) => createStream(BigInt(plan.bootstrap.seed), nom)
    afficher(`Métriques ${id} : bras ${plan.arm}, ${graines.length} exécutions appariées, P_max = ${plan.pMax}, ε = ${plan.epsilon}`)

    // Étapes 3 et 4, A1, A2
    const a = scores(plan.arm)
    const gains = Object.fromEntries(plan.references.map(k => [k, gainApparie(a, scores(k), plan.pMax, plan.epsilon, flux(`bootstrap/${k}`), plan.bootstrap.B)])) as Record<Reference, ResultatGain>
    for (const k of plan.references) {
      const r = gains[k]
      afficher(`  ${k} : P_${k} = ${fmt(r.Pk)}, Δ = ${fmt(r.delta)} [${fmt(r.icDelta[0])} ; ${fmt(r.icDelta[1])}], G = ${texteG(r.G, r.icG, r.raison)}`)
    }

    // Étape 5, A3 (BR-039 : dénominateur commun P_max − P_ind)
    const ind = gains.ind
    let decomposition: Record<string, unknown>
    if (plan.references.includes('vote')) {
      const agg = gainApparie(scores('vote'), scores('ind'), plan.pMax, plan.epsilon, flux('bootstrap/agg'), plan.bootstrap.B)
      const com = gainApparie(a, scores('vote'), plan.pMax, plan.epsilon, flux('bootstrap/com'), plan.bootstrap.B)
      const defini = typeof ind.G === 'number', d = plan.pMax - ind.Pk
      decomposition = {
        deltaAgg: agg.delta, icDeltaAgg: agg.icDelta, deltaCom: com.delta, icDeltaCom: com.icDelta,
        Gagg: defini ? agg.delta / d : ind.G, Gcom: defini ? com.delta / d : ind.G,
      }
      afficher(`  agrégation : Δ_agg = ${fmt(agg.delta)}, Δ_com = ${fmt(com.delta)}; G_agg = ${defini ? fmt(agg.delta / d) : ind.G}, G_com = ${defini ? fmt(com.delta / d) : ind.G}`)
    } else {
      decomposition = { Gagg: 'non défini', deltaCom: ind.delta, raison: 'aucune référence vote (06 §4.3)' }
      afficher(`  agrégation : G_agg non défini (aucune référence vote), Δ_com = Δ_ind = ${fmt(ind.delta)}`)
    }

    // Contrôle d'implantation : un vote ne réussit jamais quand tous les agents échouent (T0.31 c).
    let controleVote: { violations: number; beta: number } | undefined
    if (plan.individuals && plan.references.includes('vote')) {
      const succes = new Map<string, number>()
      for (const [seed, , s] of lireCsv(path.join(racine, plan.individuals))) succes.set(seed!, (succes.get(seed!) ?? 0) + Number(s))
      const vote = parBras.get('vote')!
      controleVote = { violations: graines.filter(g => vote.get(g) === 1 && (succes.get(g) ?? 0) === 0).length, beta: graines.filter(g => (succes.get(g) ?? 0) === 0).length / graines.length }
      afficher(`  contrôle 1 − β : β = ${fmt(controleVote.beta)}, ${controleVote.violations} violation(s)`)
    }

    // Étape 6, A4 (BR-037 : cinq composantes, jamais agrégées)
    let R: Record<string, unknown>
    if (!plan.journal) {
      R = { calcule: false, raison: 'journal absent' }
      afficher('  R non calculé : journal absent')
    } else {
      const lignes = lireCsv(path.join(racine, plan.journal)).map(([seed, W, M, readers, addressed]) => ({ seed: seed!, W: W!, M: M!, readers: Number(readers), addressed: addressed === '1' }))
      const parGraine = new Map<string, typeof lignes>()
      for (const l of lignes) parGraine.set(l.seed, [...(parGraine.get(l.seed) ?? []), l])
      const unites = [...parGraine.keys()], fe = flux('bootstrap/R_eff')
      const eff = rEff(lignes.map(l => l.M), lignes.map(l => l.W), fe)
      const stats = reechantillonner(unites.length, Math.min(plan.bootstrap.B, 200), fe, idx => {
        const s = Array.from(idx, i => parGraine.get(unites[i]!)!).flat()
        return rEff(s.map(l => l.M), s.map(l => l.W), fe, 5).valeur
      })
      const N = plan.channel?.N
      R = {
        R_nom: plan.channel?.alphabet ? rNom(plan.channel.alphabet) : null,
        R_eff: { valeur: eff.valeur, ic95: icPercentile(stats), biaisCorrige: eff.biais },
        R_pers: plan.channel?.persistence ? rPers(plan.channel.persistence) : null,
        R_port: N ? rPort(lignes.map(l => l.readers), N) : null,
        R_adr: rAdr(lignes.map(l => l.addressed)),
      }
      const ic = icPercentile(stats)
      afficher(`  R : R_nom = ${R.R_nom === null ? '—' : `${fmt(R.R_nom as number)} bits`}; R_eff = ${fmt(eff.valeur)} [${fmt(ic[0])} ; ${fmt(ic[1])}]; R_pers = ${R.R_pers === null ? '—' : fmt(R.R_pers as number)}; R_port = ${R.R_port === null ? '—' : fmt(R.R_port as number)}; R_adr = ${fmt(R.R_adr as number)}`)
    }

    // Étape 7
    const sortie = path.join(racine, 'data', 'metrics', `${id}.metrics.json`)
    fs.mkdirSync(path.dirname(sortie), { recursive: true })
    fs.writeFileSync(sortie, JSON.stringify({ schema: 1, plan, n: graines.length, seeds: graines, gains, decomposition, ...(controleVote ? { controleVote } : {}), R }, null, 2) + '\n')
    afficher(`Rapport : ${path.relative(racine, sortie).replaceAll('\\', '/')}`)
    return 0
  } catch (e) {
    if (!(e instanceof MetriquesImpossibles)) throw e
    afficher(e.message)
    return 1
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2)
  if (args.length !== 1) {
    console.error('Usage : npm run metrics -- <id>')
    process.exit(2)
  }
  process.exit(calculer(args[0]!))
}

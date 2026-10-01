# Estimation de coût du plan factoriel P7 (hypothèses explicites, prix claude-api skill, cache 2026-09-25)
P = {  # $/MTok: input, output, cache read
 'haiku-4-5': (1.00, 5.00, 0.10),
 'sonnet-5-5': (2.00, 10.00, 0.20),
 'opus-5-5': (4.00, 20.00, 0.20),
 'fable-5-1': (10.00, 50.00, 0.25),
}
THINK = {'haiku-4-5': 0, 'sonnet-5-5': 0, 'opus-5-5': 300, 'fable-5-1': 500}  # jetons de raisonnement / appel (hypothèse)
CACHED = 1200  # prompt système + règles (lecture cache)
# niveaux de richesse : (entrée non cachée, sortie visible)
L = {'L0': (400, 20), 'L1': (600, 50), 'L2': (800, 150), 'L3': (2000, 400)}

def call(m, lvl='L2'):
    pi, po, pc = P[m]; unc, out = L[lvl]
    return (CACHED*pc + unc*pi + (out+THINK[m])*po) / 1e6

N_AG, T = 10, 30
CALLS = N_AG*T            # 300 appels / run
ORCH = 1 + 1/N_AG         # +1 appel coordinateur par tour
REPS = 30

def run(m, lvl='L2', orch=False):
    return call(m, lvl)*CALLS*(ORCH if orch else 1)

tot = {}
# Phase 1 : archi (piste, danse, orchestrateur) x modèle (3 LLM) x scénario (3), L2
p1 = sum(run(m, 'L2', a == 'orch')*REPS for m in ['haiku-4-5','sonnet-5-5','opus-5-5'] for a in ['piste','danse','orch'] for s in range(3))
# Contrôle « indépendants + vote » (sans interaction) : 3 modèles x 3 scénarios
p1 += sum(run(m, 'L0')*REPS for m in ['haiku-4-5','sonnet-5-5','opus-5-5'] for s in range(3))
tot['Phase 1 (36 cellules LLM)'] = p1
# Phase 2 : échelle de richesse L0-L3 x (piste, danse) x 3 scénarios, Sonnet 5.5
tot['Phase 2 (24 cellules, Sonnet)'] = sum(run('sonnet-5-5', l)*REPS for l in L for a in range(2) for s in range(3))
# Phase 3 : homogène vs hétérogène (mélange 3 modèles) x (piste, danse) x S3,S5
mix = sum(run(m) for m in ['haiku-4-5','sonnet-5-5','opus-5-5'])/3
tot['Phase 3 (8 cellules, diversité)'] = (run('sonnet-5-5') + mix)*2*2*REPS
# Ancrages : naming game (N=24, ~15 rondes de population = 180 interactions x 2 appels) x 20 runs, Haiku + Sonnet
ng = lambda m: call(m, 'L1')*180*2*20
tot['Ancrage naming game (Haiku+Sonnet, 20 runs)'] = ng('haiku-4-5') + ng('sonnet-5-5')
# Option Fable 5.1 : 3 scénarios x danse x 10 runs
tot['Option Fable 5.1 (3 cellules x 10 runs)'] = run('fable-5-1')*3*10

for m in P:
    print(f"{m:12s} appel L2 = ${call(m):.5f}  run(300 appels) = ${run(m):.2f}")
s = 0
for k, v in tot.items():
    s += v; print(f"{k:45s} standard ${v:8.0f}  batch ${v/2:8.0f}")
print(f"{'TOTAL':45s} standard ${s:8.0f}  batch ${s/2:8.0f}  (+30 % imprévus: ${s*1.3:.0f} / ${s/2*1.3:.0f})")
# puissance : n par cellule pour d (test t bilatéral, alpha .05, puissance .8)
from statistics import NormalDist
z = NormalDist().inv_cdf
for d in (0.5, 0.74, 0.8, 1.0):
    n = 2*(z(0.975)+z(0.8))**2/d**2
    print(f"d={d}: n/cellule = {n:.1f}")
assert abs(call('haiku-4-5') - 0.00167) < 1e-6

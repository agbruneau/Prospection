"""Pilote : Ant System ant-cycle (Dorigo, Maniezzo, Colorni 1996) sur Oliver30.
Paramètres publiés (Table I) : alpha=1, beta=5, rho=0.5 (PERSISTANCE : tau <- rho*tau + dtau), Q=100, m=n=30,
NCmax=5000, 10 essais. tau0 = c « petite constante positive » (valeur non publiée -> testée).
Option elitist e (Sec. V-C) : + e*Q/L* sur les arêtes du meilleur tour.
Usage : python p2_as_oliver30_pilote.py <c> <e> <runs> <ncmax>
"""
import sys, math, numpy as np
C = np.array([(54,67),(54,62),(37,84),(41,94),(2,99),(7,64),(25,62),(22,60),(18,54),(4,50),(13,40),(18,40),(24,42),(25,38),(44,35),
              (41,26),(45,21),(58,35),(62,32),(82,7),(91,38),(83,46),(71,44),(64,60),(68,58),(83,69),(87,76),(74,78),(71,71),(58,69)], float)
n = len(C); D = np.sqrt(((C[:, None] - C[None]) ** 2).sum(-1)); np.fill_diagonal(D, np.inf)
ETA = 1.0 / D; np.fill_diagonal(ETA, 0.0)
if len(sys.argv) != 5: sys.exit(__doc__)
c, e, runs, ncmax = float(sys.argv[1]), int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4])
alpha, beta, rho, Q, m = 1.0, 5.0, 0.5, 100.0, n
OPT = 423.741

def run(seed):
    rng = np.random.default_rng(seed)
    tau = np.full((n, n), c); etab = ETA ** beta
    best_L, best_t, hit = np.inf, None, None
    for nc in range(1, ncmax + 1):
        tours = np.empty((m, n), int); tours[:, 0] = np.arange(m) % n  # répartition uniforme : une fourmi par ville
        visited = np.zeros((m, n), bool); visited[np.arange(m), tours[:, 0]] = True
        for s in range(1, n):
            cur = tours[:, s - 1]
            w = (tau[cur] ** alpha) * etab[cur]; w[visited] = 0.0
            r = rng.random(m)[:, None] * w.sum(1, keepdims=True)
            nxt = np.minimum((np.cumsum(w, 1) < r).sum(1), n - 1)
            tours[:, s] = nxt; visited[np.arange(m), nxt] = True
        nxt_all = np.roll(tours, -1, 1)
        L = D[tours, nxt_all].sum(1)
        k = L.argmin()
        if L[k] < best_L - 1e-9: best_L, best_t = L[k], tours[k].copy()
        if hit is None and best_L < OPT + 1e-3: hit = nc
        dtau = np.zeros((n, n))
        np.add.at(dtau, (tours.ravel(), nxt_all.ravel()), np.repeat(Q / L, n))
        if e:
            bt = best_t; bn = np.roll(bt, -1); np.add.at(dtau, (bt, bn), e * Q / best_L)
        dtau = dtau + dtau.T  # TSP symétrique
        tau = rho * tau + dtau
    return best_L, hit

res = [run(s) for s in range(runs)]
Ls = np.array([r[0] for r in res]); hits = [r[1] for r in res]
print(f"c={c} e={e} runs={runs} NCmax={ncmax}")
print("best per run:", np.round(Ls, 3).tolist())
print(f"mean={Ls.mean():.3f} best={Ls.min():.3f} sd={Ls.std(ddof=1):.3f} hit423.741={sum(h is not None for h in hits)}/{runs} cycles_to_hit={hits}")

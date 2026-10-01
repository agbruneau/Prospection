"""Pilote : ABC (Karaboga & Basturk 2008, ASOC 8:687-697, Tables 1-3) en D=50.
Colonie 100 (SN=50 sources), limit = ne*D, au plus 1 éclaireuse/cycle, MCN=5000, 30 essais; valeurs < 1e-12 -> 0.
Recherche locale v_j = x_j + phi*(x_j - x_kj), phi~U[-1,1], une dimension (implémentation de référence de l'auteur).
fit = 1/(1+f) si f>=0 sinon 1+|f|. Sélection des observatrices : roulette P_i = fit_i/sum fit (Eq. 1 du texte 2008)
ou variante du code de référence 0.9*fit/maxfit+0.1 (arg 'ref').
Usage : python abc_pilot.py <func> <runs> <mcn> <sel: roulette|ref>
"""
import sys, numpy as np
FUN = {
    "griewank": (lambda x: ((x - 100) ** 2).sum() / 4000 - np.prod(np.cos((x - 100) / np.sqrt(np.arange(1, x.size + 1)))) + 1, -600, 600),
    "rastrigin": (lambda x: (x ** 2 - 10 * np.cos(2 * np.pi * x) + 10).sum(), -5.12, 5.12),
    "rosenbrock": (lambda x: (100 * (x[1:] - x[:-1] ** 2) ** 2 + (x[:-1] - 1) ** 2).sum(), -50, 50),
}
name, runs, mcn, sel = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
f, lo, hi = FUN[name]; Dm, SN = 50, 50; limit = SN * Dm
fitf = lambda v: 1 / (1 + v) if v >= 0 else 1 + abs(v)

def run(seed):
    rng = np.random.default_rng(seed)
    X = lo + rng.random((SN, Dm)) * (hi - lo); F = np.array([f(x) for x in X]); trial = np.zeros(SN, int)
    best = F.min(); evals = SN
    def try_move(i):
        nonlocal best, evals
        k = rng.integers(SN - 1); k += k >= i; j = rng.integers(Dm)
        v = X[i].copy(); v[j] = np.clip(v[j] + rng.uniform(-1, 1) * (v[j] - X[k, j]), lo, hi)
        fv = f(v); evals += 1
        if fitf(fv) > fitf(F[i]): X[i], F[i], trial[i] = v, fv, 0
        else: trial[i] += 1
    for _ in range(mcn):
        for i in range(SN): try_move(i)                      # ouvrières
        fit = np.array([fitf(v) for v in F])
        if sel == "roulette":
            for i in rng.choice(SN, SN, p=fit / fit.sum()): try_move(i)   # observatrices
        else:
            p = 0.9 * fit / fit.max() + 0.1; i = t = 0
            while t < SN:
                if rng.random() < p[i]: try_move(i); t += 1
                i = (i + 1) % SN
        best = min(best, F.min())
        i = trial.argmax()                                    # au plus une éclaireuse
        if trial[i] > limit:
            X[i] = lo + rng.random(Dm) * (hi - lo); F[i] = f(X[i]); trial[i] = 0; evals += 1
    best = min(best, F.min())
    return (0.0 if best < 1e-12 else best), evals

res = [run(s) for s in range(runs)]
b = np.array([r[0] for r in res])
print(f"{name} sel={sel} runs={runs} MCN={mcn} evals/run~{res[0][1]} mean={b.mean():.6g} sd={b.std(ddof=1):.6g} min={b.min():.3g} max={b.max():.3g}")

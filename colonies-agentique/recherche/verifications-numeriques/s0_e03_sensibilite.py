"""E0.3 (exploratoire, fiche S0 §6) : OFAT étendue, criblage de Morris et indices de Sobol' sur M1c ([Seeley et al. 2012], SOM).
Sortie déterministe : |Ψ_A − Ψ_B| à t = 200 (RK4, h = 0,05; y0 = (0,0101 ; 0,01)). Paramètres k = 4 : γ, α, ρ, σ, sur des plages
qui encadrent σ* = 4αγρ/(ρ − α)² [I]. N (taille finie) n'a pas d'objet pour l'EDO : écart au plan de la fiche (D-0-003).
Critère de lecture : accord des deux premiers rangs entre méthodes; coût en exécutions.
Usage : python s0_e03_sensibilite.py > ../../data/sensibilite/e03-m1c.json"""
import json
import numpy as np

NOMS = ["gamma", "alpha", "rho", "sigma"]
BORNES = np.array([[1.5, 4.5], [0.2, 0.5], [1.5, 4.5], [0.5, 3.0]])
NOMINAL = np.array([3.0, 1 / 3, 3.0, 1.75])        # σ juste au-dessus de σ* = 1,6875 aux valeurs de la Fig. S3


def sortie(P):
    """P : (n, 4) valeurs physiques; RK4 vectorisé sur les n exécutions."""
    g, a, r, s = (P[:, i] for i in range(4))
    A, B = np.full(len(P), 0.0101), np.full(len(P), 0.01)
    def f(A, B):
        U = 1 - A - B
        return g * U - A * (a - r * U + s * B), g * U - B * (a - r * U + s * A)
    h = 0.05
    for _ in range(int(round(200 / h))):
        k1 = f(A, B); k2 = f(A + h / 2 * k1[0], B + h / 2 * k1[1]); k3 = f(A + h / 2 * k2[0], B + h / 2 * k2[1]); k4 = f(A + h * k3[0], B + h * k3[1])
        A = A + h / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0])
        B = B + h / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])
    return np.abs(A - B)


def physique(U):
    return BORNES[:, 0] + U * (BORNES[:, 1] - BORNES[:, 0])


rng = np.random.default_rng(20261003)
k = 4

# OFAT étendue : 10 niveaux par paramètre, les autres au nominal; effet = étendue de la sortie.
ofat = {}
for i, nom in enumerate(NOMS):
    P = np.tile(NOMINAL, (10, 1))
    P[:, i] = np.linspace(*BORNES[i], 10)
    y = sortie(P)
    ofat[nom] = float(y.max() - y.min())

# Morris : r = 10 trajectoires, p = 4 niveaux, Δ = p / (2(p − 1)) = 2/3 (espace unité).
r, delta = 10, 2 / 3
ee = {nom: [] for nom in NOMS}
for _ in range(r):
    x = rng.choice([0.0, 1 / 3], size=k)
    pts, ordre = [x.copy()], rng.permutation(k)
    for i in ordre:
        x = x.copy(); x[i] += delta; pts.append(x)
    y = sortie(physique(np.array(pts)))
    for j, i in enumerate(ordre):
        ee[NOMS[i]].append((y[j + 1] - y[j]) / delta)
morris = {nom: {"mu_star": float(np.mean(np.abs(v))), "sigma": float(np.std(v, ddof=1))} for nom, v in ee.items()}

# Sobol' : N = 1 000, matrices A et B, A_B^(i); estimateurs de Saltelli (premier ordre) et de Jansen (total).
N = 1000
UA, UB = rng.random((N, k)), rng.random((N, k))
fA, fB = sortie(physique(UA)), sortie(physique(UB))
fAB = []
for i in range(k):
    U = UA.copy(); U[:, i] = UB[:, i]
    fAB.append(sortie(physique(U)))
def indices(idx):
    a, b = fA[idx], fB[idx]
    v = np.var(np.concatenate([a, b]), ddof=1)
    S = [float(np.mean(b * (fAB[i][idx] - a)) / v) for i in range(k)]
    ST = [float(0.5 * np.mean((a - fAB[i][idx]) ** 2) / v) for i in range(k)]
    return S, ST
S, ST = indices(np.arange(N))
boot = [indices(rng.integers(0, N, N)) for _ in range(500)]
ic = lambda vals: [float(np.percentile(vals, 2.5)), float(np.percentile(vals, 97.5))]
sobol = {nom: {"S": S[i], "S_ic95": ic([bb[0][i] for bb in boot]), "ST": ST[i], "ST_ic95": ic([bb[1][i] for bb in boot])} for i, nom in enumerate(NOMS)}

rangs = lambda d: sorted(d, key=d.get, reverse=True)
top = {"ofat": rangs(ofat)[:2], "morris": rangs({n: morris[n]["mu_star"] for n in NOMS})[:2], "sobol_total": rangs({n: sobol[n]["ST"] for n in NOMS})[:2]}
print(json.dumps({
    "experience": "E0.3 (exploratoire)", "modele": "M1c en EDO (Seeley et al. 2012, SOM)", "sortie": "|Ψ_A − Ψ_B| à t = 200",
    "bornes": dict(zip(NOMS, BORNES.tolist())), "nominal": dict(zip(NOMS, NOMINAL.tolist())), "graine": 20261003,
    "cout": {"ofat": 10 * k, "morris": r * (k + 1), "sobol": N * (k + 2)},
    "ofat": ofat, "morris": morris, "sobol": sobol, "deux_premiers": top,
    "accord_deux_premiers": {"ofat_morris": set(top["ofat"]) == set(top["morris"]), "morris_sobol": set(top["morris"]) == set(top["sobol_total"]), "ofat_sobol": set(top["ofat"]) == set(top["sobol_total"])},
}, indent=2, ensure_ascii=False))

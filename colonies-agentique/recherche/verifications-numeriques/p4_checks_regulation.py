"""Vérifications numériques du dossier p4-regulation (exploratoire).

1. Prabhakar, Dektar & Gordon 2012, éq. (3)-(4) : gain stationnaire E[D]/E[A] = c/q
   (dérivation du dossier, pas un résultat publié) et expérience de retrait 240-420 s (Fig. 2).
   Hypothèse : créneau de 1 s (non précisé dans l'article).
2. Edwards & Myerscough 2011, éq. (7), Tableau 1 : S(t) -> S* = mS (fr Q^j / (fs mQ^j))^(1/k) (éq. 10).
Exécution : python p4_checks.py  (numpy seulement)
"""
import numpy as np

rng = np.random.default_rng(1)


def prabhakar(A, c, q=0.05, d=0.0, abar=0.01):
    """Éq. (3)-(4) : alpha_n = max(alpha_{n-1} - q D_{n-1} + c A_n - d, abar), D_n ~ Poisson(alpha_n)."""
    alpha, D_prev = 0.0, 0
    D = np.empty(len(A), dtype=int)
    for n, a in enumerate(A):
        alpha = max(alpha - q * D_prev + c * a - d, abar)
        D_prev = D[n] = rng.poisson(alpha)
    return D


# 1a. gain stationnaire
for lam in (0.169, 0.807):
    for c in (0.025, 0.05, 0.10):
        A = rng.poisson(lam, 200_000)
        D = prabhakar(A, c)
        g = D[20_000:].mean() / A[20_000:].mean()
        print(f"lambda={lam:5.3f} c={c:5.3f}  E[D]/E[A]={g:5.3f}  c/q={c/0.05:4.2f}")
        assert abs(g - c / 0.05) / (c / 0.05) < 0.10, "gain stationnaire hors tolérance"

# 1b. retrait 240-420 s (Fig. 2a : 0,807 fourmis/s), 200 répétitions
lam, c, T = 0.807, 0.05, 1100
pre, during, lag = [], [], []
for _ in range(200):
    A = rng.poisson(lam, T)
    A[240:420] = 0
    D = prabhakar(A, c)
    sm = np.convolve(D, np.ones(51) / 51, mode="same")  # filtre rect. rayon 25 créneaux
    pre.append(D[60:240].mean())
    during.append(D[300:420].mean())
    rec = np.argmax(sm[420:] >= 0.8 * D[60:240].mean())
    lag.append(rec)
print(f"retrait : sortie avant={np.mean(pre):.3f}/s pendant={np.mean(during):.3f}/s "
      f"délai de reprise à 80 % ~ {np.median(lag):.0f} s (médiane)")
assert np.mean(during) < 0.2 * np.mean(pre)

# 2. Edwards & Myerscough 2011, Tableau 1 (secondes)
ss, fr, fs, mS, k, mQ, j, fa, rs = 5.0, 0.0010, 0.0002, 10.0, 4, 1.5, 4, 900.0, 1200.0


def em_run(Q, R0, hours=8, dt=0.5):
    F, Fp, Rp = 1.0, 0.0, float(R0)
    for _ in range(int(hours * 3600 / dt)):
        S = ss * (Fp + Rp) / Rp
        hS, hQ = mS**k / (S**k + mS**k), Q**j / (Q**j + mQ**j)
        dF = fr * F * hS * hQ - fs * F * (1 - hS) * (1 - hQ)
        dFp = (F - Fp) / fa - Fp / S
        dRp = (R0 - Rp) / rs - Fp / S
        F, Fp, Rp = F + dt * dF, Fp + dt * dFp, Rp + dt * dRp
    return F, ss * (Fp + Rp) / Rp


for Q in (2.0, 3.0):
    Sstar = mS * (fr * Q**j / (fs * mQ**j)) ** (1 / k)
    F, S = em_run(Q, 100, hours=24)
    print(f"Q={Q}: S(24 h)={S:5.1f} s  S*={Sstar:5.1f} s  F={F:6.1f}")
    assert abs(S - Sstar) / Sstar < 0.05
F100, _ = em_run(0.9, 100)
F50, _ = em_run(0.9, 50)
print(f"Q=0.9 : F(8 h) R=100 -> {F100:.2f}, R=50 -> {F50:.2f}")
print("OK")

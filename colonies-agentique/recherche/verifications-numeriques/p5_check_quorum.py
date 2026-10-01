"""Verifications rapides pour le dossier p5-quorum (exploratoire)."""
import random, math, statistics as st

# 1) Seeley et al. 2012 SOM: sigma* = 4 a g r / (r - a)^2 ; params Fig. S3 (g=3, a=1/3, r=3)
def sigma_star(g, a, r): return 4 * a * g * r / (r - a) ** 2
g, a, r = 3.0, 1 / 3, 3.0
ss = sigma_star(g, a, r)
print("sigma* Fig S3 =", round(ss, 4))

def rhs(A, B, sA, sB, g=g, a=a, r=r):
    U = 1 - A - B
    return g * U - A * (a - r * U + sB * B), g * U - B * (a - r * U + sA * A)

def integrate(sig, A=0.01, B=0.0101, dt=1e-3, T=200):
    for _ in range(int(T / dt)):
        dA, dB = rhs(A, B, sig, sig)
        A, B = A + dt * dA, B + dt * dB
    return A, B

for sig in (1.0, ss * 0.95, ss * 1.05, 10.0):
    print("sigma", round(sig, 3), "->", [round(x, 4) for x in integrate(sig)])
# fixed point analytique post-bifurcation (sigma=10): U=a/r, A+B=1-a/r, AB=g a/(r sigma)
S, P = 1 - a / r, g * a / (r * 10)
d = math.sqrt(S * S - 4 * P)
print("analytique sigma=10:", round((S + d) / 2, 4), round((S - d) / 2, 4))
# pre-bifurcation symetrique (sigma=1)
k = r - a - 2 * g
print("analytique sigma=1:", round((k + math.sqrt(k * k + 4 * g * (2 * r + 1))) / (2 * (2 * r + 1)), 4))

# 2) Pais et al. 2013 eq. 4: sigma*(v) = 4 v^3 / (v^2 - 1)^2 ; coherence avec 1)
for v in (2, 4, 10):
    assert abs(4 * v**3 / (v * v - 1) ** 2 - sigma_star(v, 1 / v, v)) < 1e-12
    print("v", v, "sigma*", round(4 * v**3 / (v * v - 1) ** 2, 4), "~4/v", 4 / v)

# 3) Sumpter & Pratt 2009, section 4(b): n=40, r=0.02, px=1, py=0.5, T=10, a=0.1, m=0.9
def run(kk, n=40, rr=0.02, px=1.0, py=0.5, T=10, aa=0.1, m=0.9, rng=random, per_option=False):
    # per_option=False : r = proba de trouver UNE des deux options (puis 50/50)
    # per_option=True  : r = proba de trouver chaque option (2r au total) -- lecture alternative
    cx = cy = 0; unc = n; t = 0
    while unc:
        t += 1
        for _ in range(unc):  # ponytail: mise a jour sequentielle dans le pas de temps (ordre non precise dans l'article)
            u = rng.random()
            if u < (2 * rr if per_option else rr):
                if rng.random() < 0.5:
                    p = px * (aa + (m - aa) * cx**kk / (T**kk + cx**kk))
                    if rng.random() < p: cx += 1; unc -= 1
                else:
                    p = py * (aa + (m - aa) * cy**kk / (T**kk + cy**kk))
                    if rng.random() < p: cy += 1; unc -= 1
    return cx / n, t

random.seed(1)
for po in (False, True):
    for kk, pub in ((1, (75.5, 253.7, 64.0)), (9, (83.3, 307.8, 71.0))):
        res = [run(kk, per_option=po) for _ in range(1000)]
        print("per_option", po, "k", kk, "frac X %.1f%%" % (100 * st.mean(x for x, _ in res)),
              "t %.1f+-%.1f" % (st.mean(t for _, t in res), st.stdev(t for _, t in res)), "publie", pub)

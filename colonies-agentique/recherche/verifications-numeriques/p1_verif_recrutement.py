"""Vérification préliminaire des deux modèles du Projet 1 (exploratoire).

1. Modèle à compartiments de Seeley, Camazine & Sneyd 1991 (annexe + tableau 2),
   intégré en RK4; compare aux valeurs du texte (p. 286) : à midi, 119 abeilles
   engagées sur la source riche simulée et 3 sur la pauvre; après l'inversion,
   pente max +18 abeilles/30 min (nord) et -30 abeilles/30 min (sud).
2. Monte Carlo du pont de Goss et al. 1989 (éq. 1-3, Phi = 0,5 fourmi/s,
   k = 20, n = 2, sans évaporation), histogrammes de la fig. 2a-d.

3. Queues binomiales du tableau de probabilités (section 4 du dossier).

Usage : python p1_verif_recrutement.py
"""
import random
from math import comb

# ---------- 1. Seeley, Camazine & Sneyd 1991 ----------
T = dict(T1=1.0, T2=1.5, T3=2.5, T4=60.0, T5=3.0, T6=2.0, T7=3.5)  # min, tableau 2
p1, p2, p3, p4, p5, p6, p7 = (1 / T[k] for k in ("T1", "T2", "T3", "T4", "T5", "T6", "T7"))
fxA, fxB, fdA, fdB = 0.00, 0.04, 1.00, 0.15  # tableau 2 (A = 2,50 M; B = 0,75 M)
tauA, tauB = 0.38, 0.02  # p. 286


def deriv(s):
    A, DA, HA, B, DB, HB, F = s
    den = tauA * DA + tauB * DB
    flA = tauA * DA / den if den > 0 else 0.5
    flB = 1 - flA
    return (
        (1 - fdA) * (1 - fxA) * p1 * HA + p2 * DA + flA * p4 * F - p3 * A,
        fdA * (1 - fxA) * p1 * HA - p2 * DA,
        p3 * A - p1 * HA,
        (1 - fdB) * (1 - fxB) * p5 * HB + p6 * DB + flB * p4 * F - p7 * B,
        fdB * (1 - fxB) * p5 * HB - p6 * DB,
        p7 * B - p5 * HB,
        fxA * p1 * HA + fxB * p5 * HB - p4 * F,
    )


def rk4(s, dt):
    k1 = deriv(s)
    k2 = deriv([x + dt / 2 * k for x, k in zip(s, k1)])
    k3 = deriv([x + dt / 2 * k for x, k in zip(s, k2)])
    k4 = deriv([x + dt * k for x, k in zip(s, k3)])
    return [x + dt / 6 * (a + 2 * b + 2 * c + d) for x, a, b, c, d in zip(s, k1, k2, k3, k4)]


def seeley():
    dt = 0.01
    s = [11, 1, 0, 11, 1, 0, 101]  # A, DA, HA, B, DB, HB, F (p. 286)
    south, north = [], []  # taille de groupe = A + D + H (légende fig. 5)
    for i in range(48001):  # 8 h -> 16 h, t en min
        t = i * dt
        if i == 24000:  # midi : inversion; le sud (A, riche) devient B (pauvre)
            s = s[3:6] + s[0:3] + [s[6]]
        rich, poor = s[0] + s[1] + s[2], s[3] + s[4] + s[5]
        if i < 24000:
            south.append(rich); north.append(poor)
        else:
            north.append(rich); south.append(poor)
        if i % 3000 == 0:
            print(f"t={8 + t / 60:5.2f} h  nord={north[-1]:6.1f}  sud={south[-1]:6.1f}  F={s[6]:6.1f}")
        if i < 48000:
            s = rk4(s, dt)
    noon = 24000
    w = 3000  # 30 min
    dn = max(north[j + w] - north[j] for j in range(noon, 48001 - w))
    ds = min(south[j + w] - south[j] for j in range(noon, 48001 - w))
    cross = next(j for j in range(noon, 48001) if north[j] >= south[j])
    print(f"midi : sud={south[noon]:.1f} (publié 119), nord={north[noon]:.1f} (publié 3)")
    print(f"pente max nord = {dn:+.1f}/30 min (publié +18); sud = {ds:+.1f}/30 min (publié -30)")
    print(f"croisement nord/sud {(cross - noon) * dt:.0f} min après l'inversion")
    return south[noon], north[noon], dn, ds


# ---------- 2. Goss et al. 1989 ----------
def goss_run(r, rng, phi=0.5, k=20.0, n=2, late=False):
    """Un module du pont. late=True : seule la branche longue existe jusqu'au
    1000e passage, puis la courte est ajoutée; compte du 1501e au 2000e."""
    S = [0.0, 0.0]; L = [0.0, 0.0]  # phéromone aux points de choix 1 (nid) et 2 (nourriture)
    pending = []  # (temps d'arrivée, point opposé, branche)
    crossings = short = 0
    lo, hi = (1500, 2000) if late else (500, 1000)
    short_open = not late
    t = 0
    while crossings < hi:
        t += 1
        for (ta, j2, br) in [p for p in pending if p[0] <= t]:
            (S if br == "s" else L)[j2] += 1
        pending = [p for p in pending if p[0] > t]
        for j in (0, 1):
            if rng.random() < phi:
                crossings += 1
                if late and crossings == 1001:
                    short_open = True
                if short_open:
                    a, b = (k + S[j]) ** n, (k + L[j]) ** n
                    br = "s" if rng.random() < a / (a + b) else "l"
                else:
                    br = "l"
                (S if br == "s" else L)[j] += 1
                pending.append((t + (20 if br == "s" else round(20 * r)), 1 - j, br))
                if crossings > lo and br == "s":
                    short += 1
    return short / (hi - lo)


def goss(nruns=1000, seed=1):
    rng = random.Random(seed)
    res = {}
    for label, r, late in (("a r=1", 1.0, False), ("b r=1.4", 1.4, False), ("c r=2", 2.0, False), ("d r=2 tardive", 2.0, True)):
        bins = [0] * 5
        for _ in range(nruns):
            f = goss_run(r, rng, late=late)
            bins[min(int(f * 5), 4)] += 1
        res[label] = [b / nruns for b in bins]
        print(label, "  % de simulations par classe 0-20..80-100 % court :", [round(100 * b) for b in res[label]])
    return res


def tail_up(k, n, p):
    """P(X >= k) pour X ~ Binomiale(n, p)."""
    return sum(comb(n, i) * p**i * (1 - p) ** (n - i) for i in range(k, n + 1))


if __name__ == "__main__":
    s_noon, n_noon, dn, ds = seeley()
    # critère C4 du dossier : riche 119 ± 3, pauvre 3 ± 1
    assert abs(s_noon - 119) <= 3 and abs(n_noon - 3) <= 1, "écart à midi > tolérance de C4"
    # tableau de probabilités (section 4) : observé 12/26 (r = 1), 15/18 (r = 1,4), 14/14 (r = 2)
    assert abs(tail_up(12, 26, 0.52) - 0.786) < 0.001  # queue supérieure, r = 1 (observé sous l'espérance 13,5)
    assert abs(1 - tail_up(13, 26, 0.52) - 0.344) < 0.001  # queue inférieure P(X <= 12), r = 1
    assert abs(tail_up(15, 18, 0.62) - 0.047) < 0.001
    assert abs(0.75**14 - 0.018) < 0.001
    res = goss(nruns=400)
    assert res["d r=2 tardive"][0] > 0.9, "la branche tardive devrait être ignorée"
    assert res["c r=2"][4] > res["a r=1"][4], "r=2 devrait favoriser le court plus que r=1"
    print("OK")

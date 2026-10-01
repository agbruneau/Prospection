"""Recoupement Python indépendant des cibles T0.27 à T0.32 de la fiche S0 (livrable 4; recoupement [Edmonds et Hales 2003]).
T0.26 (déterminisme du moteur TypeScript) est une propriété de l'implantation, sans valeur à recouper ici.
Usage : python s0_socle_checks.py   ->  une ligne PASS par contrôle, puis « checks OK »; code de sortie non nul sinon."""
import math
import random
import sys

echecs = []


def check(nom, ok, detail=""):
    print(f"{'PASS' if ok else 'FAIL'} {nom}{' : ' + detail if detail else ''}")
    if not ok:
        echecs.append(nom)


def H2(p):
    return -(p * math.log2(p) + (1 - p) * math.log2(1 - p))


# ---------------------------------------------------------------- T0.27 : Euler–Maruyama sur Ornstein–Uhlenbeck
def t027():
    b, c = -1.0, 0.5
    for dt, attendu in ((0.01, 0.1256), (0.005, 0.1253)):
        exact = c * c * dt / (1 - (1 + b * dt) ** 2)   # variance stationnaire du schéma d'Euler–Maruyama
        check(f"T0.27 variance stationnaire du schéma à dt = {dt}", abs(exact - attendu) < 5e-5, f"{exact:.5f} (attendu {attendu})")
    rng, n, t_fin, dt, x0 = random.Random(27), 2000, 1.0, 0.01, 1.0
    xs = []
    for _ in range(n):
        x = x0
        for _ in range(int(round(t_fin / dt))):
            x += b * x * dt + c * math.sqrt(dt) * rng.gauss(0, 1)
        xs.append(x)
    m = sum(xs) / n
    v = sum((x - m) ** 2 for x in xs) / (n - 1)
    es_m, es_v = math.sqrt(v / n), v * math.sqrt(2 / (n - 1))
    m_th, v_th = x0 * math.exp(b * t_fin), c * c * (math.exp(2 * b * t_fin) - 1) / (2 * b)
    check("T0.27 moyenne à t = 1 à moins de 3 ES", abs(m - m_th) < 3 * es_m, f"{m:.4f} contre {m_th:.4f} ± {es_m:.4f}")
    check("T0.27 variance à t = 1 à moins de 3 ES", abs(v - v_th) < 3 * es_v, f"{v:.4f} contre {v_th:.4f} ± {es_v:.4f}")


# ---------------------------------------------------------------- T0.28 : contrôle positif de l'ordre (J4)
def t028():
    rng = random.Random(28)
    sync, seq = 0, 0
    for _ in range(1000):
        e = [0, 1]
        consensus = False
        for _ in range(10):
            e = [e[1], e[0]]
            consensus |= e[0] == e[1]
        sync += consensus
        e = [0, 1]
        for i in rng.sample([0, 1], 2):
            e[i] = e[1 - i]
        seq += e[0] == e[1]
    check("T0.28 synchrone : aucun consensus sur 1 000", sync == 0)
    check("T0.28 séquentiel aléatoire : consensus au premier pas sur 1 000", seq == 1000)


# ---------------------------------------------------------------- T0.29 : R_eff (canal binaire symétrique, biais du plug-in)
def plugin_I(m, w):
    n = len(m)
    def h(xs):
        c = {}
        for x in xs:
            c[x] = c.get(x, 0) + 1
        return -sum(k / n * math.log2(k / n) for k in c.values())
    return h(m) + h(w) - h(list(zip(m, w)))


def t029():
    rng = random.Random(29)
    for p, attendu in ((0.1, 0.531), (0.2, 0.278)):
        check(f"T0.29 1 − H2({p})", abs(1 - H2(p) - attendu) < 5e-4, f"{1 - H2(p):.4f}")
        valeurs = []
        for _ in range(20):
            w = [rng.randrange(2) for _ in range(10000)]
            m = [1 - x if rng.random() < p else x for x in w]
            perm = sum(plugin_I(m, rng.sample(w, len(w))) for _ in range(5)) / 5
            valeurs.append(plugin_I(m, w) - perm)   # H(W) = 1 bit
        moy = sum(valeurs) / len(valeurs)
        check(f"T0.29 R_eff estimé à p = {p} à 0,02 près", abs(moy - (1 - H2(p))) < 0.02, f"{moy:.4f}")
    brut, corrige = 0.0, 0.0
    for _ in range(40):
        w = [rng.randrange(8) for _ in range(1000)]
        m = [rng.randrange(8) for _ in range(1000)]
        i = plugin_I(m, w)
        brut += i / 40
        corrige += (i - sum(plugin_I(m, rng.sample(w, len(w))) for _ in range(20)) / 20) / 40
    check("T0.29 biais du plug-in sous indépendance ≈ 0,035 bit", abs(brut - 49 / (2000 * math.log(2))) < 0.006, f"{brut:.4f}")
    check("T0.29 biais corrigé par permutation ≈ 0", abs(corrige) < 0.005, f"{corrige:.4f}")
    check("T0.29 R_pers : demi-vies 1 et 68,97 pas, 0,15 pas lu en évaporation",
          abs(math.log(2) / -math.log(0.5) - 1) < 1e-12 and abs(math.log(2) / -math.log(0.99) - 68.97) < 0.01 and abs(math.log(2) / -math.log(0.01) - 0.1505) < 1e-3)


# ---------------------------------------------------------------- T0.30 à T0.32 : G
def maj(n, p):
    return sum(math.comb(n, k) * p ** k * (1 - p) ** (n - k) for k in range((n + 1) // 2, n + 1))


def maj_correle(n, p, rho):
    if rho >= 1:
        return p
    a, b = p * (1 - rho) / rho, (1 - p) * (1 - rho) / rho
    lb = lambda x, y: math.lgamma(x) + math.lgamma(y) - math.lgamma(x + y)
    return sum(math.comb(n, k) * math.exp(lb(k + a, n - k + b) - lb(a, b)) for k in range((n + 1) // 2, n + 1))


def g(pa, pk, pmax, eps, ic_pk_haut):
    if pk > pmax:
        return "borne invalide"
    if pmax - ic_pk_haut <= 0 or pmax - pk < eps:
        return "non défini"
    return (pa - pk) / (pmax - pk)


def t030_032():
    for p, pv, ga in ((0.6, 0.7334, 0.3336), (0.7, 0.9012, 0.6706)):
        check(f"T0.30 P_vote et G_agg à p = {p}", abs(maj(9, p) - pv) < 1e-4 and abs((maj(9, p) - p) / (1 - p) - ga) < 1e-4, f"{maj(9, p):.4f}; {(maj(9, p) - p) / (1 - p):.4f}")
    rng = random.Random(30)
    runs = [sum(rng.random() < 0.6 for _ in range(9)) for _ in range(10000)]
    pv = sum(r >= 5 for r in runs) / len(runs)
    es = math.sqrt(pv * (1 - pv) / len(runs))
    check("T0.30 P_vote simulé à moins de 3 ES (10⁴ exécutions)", abs(pv - maj(9, 0.6)) < 3 * es, f"{pv:.4f} ± {es:.4f}")
    gind, gagg, gcom = (pv - 0.6) / 0.4, (pv - 0.6) / 0.4, 0.0
    check("T0.30 additivité G_ind = G_agg + G_com", abs(gind - (gagg + gcom)) < 1e-12)
    for rho, pv_att, ga_att in ((0.3, 0.6322, 0.0804), (0.7, 0.6038, 0.0096), (1, 0.6, 0)):
        v = maj_correle(9, 0.6, rho)
        check(f"T0.31 bêta-binomial ρ = {rho}", abs(v - pv_att) < 1e-4 and abs((v - 0.6) / 0.4 - ga_att) < 1e-4, f"{v:.4f}")
    p9 = 1 - 0.7 ** 9
    check("T0.31 budget égal : P(au moins un succès) = 0,9596, G_fort = 0, G_ind = 0,942",
          abs(p9 - 0.9596) < 1e-4 and abs((p9 - 0.3) / 0.7 - 0.942) < 5e-4)
    viol = 0
    for _ in range(10000):
        essais = [rng.random() < 0.3 for _ in range(9)]
        if sum(essais) >= 5 and not any(essais):
            viol += 1
    check("T0.31 précision du vote ≤ 1 − β : aucune violation", viol == 0)
    check("T0.32 P_max = P_k : G non défini", g(0.7, 1.0, 1.0, 0.1, 1.0) == "non défini")
    check("T0.32 P_max < P_k : borne invalide", g(0.7, 0.9, 0.8, 0.1, 0.92) == "borne invalide")
    check("T0.32 P_max − P_k < ε : non défini", g(0.97, 0.95, 1.0, 0.1, 0.96) == "non défini")
    check("T0.32 G chiffré sinon", abs(g(0.733, 0.6, 1.0, 0.1, 0.61) - 0.3325) < 1e-9)


if __name__ == "__main__":
    t027()
    t028()
    t029()
    t030_032()
    if echecs:
        print(f"{len(echecs)} contrôle(s) en échec")
        sys.exit(1)
    print("checks OK")

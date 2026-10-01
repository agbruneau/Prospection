"""Pre-tests numeriques P8 (exploratoire). Python 3 + numpy, sans scipy.
Usage : python p8_check.py [partie ...]   parties : condorcet chen chen_tables chen_thm4 diversity sasaki neff hp (defaut : toutes sauf hp, moins de 1 s; hp = 24 fonctions aleatoires, environ 3 min)
Chaque partie imprime des valeurs [I] (calculs de l'auteur du dossier), pas des valeurs publiees.
"""
import math, sys, random
import numpy as np

# ---------- Partie 1 : Condorcet independant et correle ----------
def maj_prob(n, p, tie=0.5):
    """P(majorite correcte), votes independants. n pair : egalite comptee 'tie'."""
    s = 0.0
    for k in range(n + 1):
        pk = math.comb(n, k) * p**k * (1 - p)**(n - k)
        if 2 * k > n:
            s += pk
        elif 2 * k == n:
            s += tie * pk
    return s

def lbeta(a, b):
    return math.lgamma(a) + math.lgamma(b) - math.lgamma(a + b)

def maj_prob_corr(n, p, rho):
    """Beta-binomiale : votes echangeables, moyenne p, correlation intra-classe rho."""
    if rho <= 0:
        return maj_prob(n, p)
    a = p * (1 - rho) / rho
    b = (1 - p) * (1 - rho) / rho
    s = 0.0
    for k in range(n + 1):
        if 2 * k > n:
            lp = math.lgamma(n + 1) - math.lgamma(k + 1) - math.lgamma(n - k + 1) + lbeta(k + a, n - k + b) - lbeta(a, b)
            s += math.exp(lp)
    return s

def beta_sf_half(a, b, N=400000):
    """P(Beta(a,b) > 1/2) par integration trapezoidale de la densite (limite n -> infini)."""
    x = np.linspace(0.5, 1.0, N + 1)[1:-1]
    logpdf = (a - 1) * np.log(x) + (b - 1) * np.log1p(-x) - lbeta(a, b)
    return float(np.trapezoid(np.exp(logpdf), x) if hasattr(np, 'trapezoid') else np.trapz(np.exp(logpdf), x))

def part_condorcet():
    print("== Condorcet independant (p = P(individu correct)) ==")
    for p in (0.51, 0.6, 2 / 3, 0.75):
        print(f"p={p:.4f}", {n: round(maj_prob(n, p), 4) for n in (1, 3, 5, 11, 21, 41, 101, 1001)})
    # Sumpter & Pratt 2009 : 40 votants, erreur 1/3
    print("n=40, p=2/3 : P(erreur strict)=", round(1 - sum(math.comb(40, k) * (2 / 3)**k * (1 / 3)**(40 - k) for k in range(21, 41)), 5),
          " P(erreur, egalite 1/2)=", round(1 - maj_prob(40, 2 / 3), 5))
    print("== Condorcet correle (beta-binomial), p=0.6 ==")
    for rho in (0.0, 0.05, 0.1, 0.2, 0.3, 0.5):
        row = {n: round(maj_prob_corr(n, 0.6, rho), 4) for n in (1, 5, 11, 101, 1001)}
        lim = 1.0 if rho == 0 else round(beta_sf_half(0.6 * (1 - rho) / rho, 0.4 * (1 - rho) / rho), 4)
        print(f"rho={rho}", row, "limite n->inf =", lim)

# ---------- Partie 2 : Chen et al. 2024, melange facile/difficile ----------
def F_mix(K, alpha, p1, p2):
    return alpha * maj_prob(K, p1) + (1 - alpha) * maj_prob(K, p2)

def part_chen():
    print("== Chen et al. 2024 : F(K) = alpha*Maj(p1,K) + (1-alpha)*Maj(p2,K), K impair ==")
    Ks = list(range(1, 202, 2))
    bad = 0
    for p1 in (0.85, 0.75, 0.65):
        for p2 in (0.4, 0.3, 0.1):
            t = p2 * (1 - p2) * (0.5 - p2) / (p1 * (1 - p1) * (p1 - 0.5)) + 1
            for alpha in (0.4, 0.5, 0.6):
                F = [F_mix(K, alpha, p1, p2) for K in Ks]
                kmax = Ks[int(np.argmax(F))]
                kmin = Ks[int(np.argmin(F))]
                d = np.diff(F)
                if np.all(d >= -1e-12): shape = "croissant"
                elif np.all(d <= 1e-12): shape = "decroissant"
                elif kmax not in (Ks[0], Ks[-1]) and kmin in (Ks[0], Ks[-1]): shape = "U inverse"
                elif kmin not in (Ks[0], Ks[-1]): shape = "U"
                else: shape = "autre"
                # regle du theoreme 2 (lecture de l'extraction PDF) : p1+p2>1 et alpha<1-1/t -> U inverse
                pred = None
                if p1 + p2 > 1:
                    pred = "U inverse" if alpha < 1 - 1 / t else "croissant"
                elif p1 + p2 < 1:
                    pred = "U" if alpha > 1 - 1 / t else "decroissant"
                flag = "" if pred in (None, shape) else "  <-- ECART avec la regle lue"
                if flag: bad += 1
                print(f"p1={p1} p2={p2} alpha={alpha} t={t:.3f} seuil 1-1/t={1-1/t:.3f} | F(1)={F[0]:.3f} F(3)={F[1]:.3f} Fmax={max(F):.3f}@K={kmax} F(201)={F[-1]:.3f} | forme={shape} regle={pred}{flag}")
    print("ecarts avec la regle du theoreme 2 :", bad)

# ---------- Partie 3 : identite du theoreme de prediction de la diversite ----------
def part_diversity():
    rng = np.random.default_rng(1)
    worst = 0.0
    for _ in range(1000):
        n = int(rng.integers(2, 50)); s = rng.normal(0, 3, n) + rng.normal(5, 2); theta = rng.normal(5, 4)
        c = s.mean()
        lhs = (c - theta)**2
        rhs = np.mean((s - theta)**2) - np.mean((s - c)**2)
        worst = max(worst, abs(lhs - rhs))
    print("== Prediction de la diversite : max |erreur collective - (erreur moyenne - diversite)| sur 1000 tirages =", worst)

# ---------- Partie 4 : modele individuel de Sasaki et al. 2013 (Eq. 2) ----------
def indiv_correct(qA, qB, mode):
    r = 2 * qB / (qB + qA)
    pA = lambda i: qA
    pB = lambda i: qB * r**i
    if mode == "alt":      # alternance stricte A/B/A/..., i = indice de visite ; depart A ou B (1/2)
        tot = 0.0
        for start in ("A", "B"):
            surv, got = 1.0, 0.0
            site = start
            for i in range(0, 4000):
                p = pA(i) if site == "A" else pB(i)
                if site == "A": got += surv * p
                surv *= (1 - p)
                site = "B" if site == "A" else "A"
            tot += 0.5 * got
        return tot
    if mode == "rand":     # apres refus, nouvelle rencontre au hasard (1/2 A, 1/2 B) ; i = nb de visites passees
        # etat = (i) ; P(accepter A au pas i) = 0.5*pA, P(accepter B)=0.5*pB(i)
        surv, got = 1.0, 0.0
        for i in range(0, 4000):
            a = 0.5 * pA(i); b = 0.5 * pB(i)
            got += surv * a
            surv *= (1 - a - b)
        return got / (1 - surv) if surv < 1 else got
    if mode == "alt_c":    # alternance, i = nb de comparaisons = (visites - 1) (premiere visite i=0, seconde i=1...) idem 'alt' mais A vu d'abord avec prob 1/2 sans i pour B si B vu en premier
        tot = 0.0
        for start in ("A", "B"):
            surv, got, site, cmp_ = 1.0, 0.0, start, 0
            for k in range(0, 4000):
                if k > 0: cmp_ += 1
                p = pA(cmp_) if site == "A" else pB(cmp_)
                if site == "A": got += surv * p
                surv *= (1 - p)
                site = "B" if site == "A" else "A"
            tot += 0.5 * got
        return tot

def part_sasaki():
    print("== Sasaki et al. 2013, individu (Eq. 2) : P(correct) selon la difference de qualite (qA=0,20) ==")
    print("lecture visuelle de la Fig. 3 (individus) [I] : 5%->0,59 ; 20%->0,66 ; 40%->0,77 ; 60%->0,89 ; 80%->0,97 ; 100%->1,00")
    qA = 0.20
    for mode in ("alt", "rand"):
        row = []
        for d in (5, 20, 40, 60, 80, 99.5):
            qB = qA * (1 - d / 100)
            row.append(f"{d}%->{indiv_correct(qA, qB, mode):.3f}")
        print(mode, " ; ".join(row))

# ---------- Partie 5 : replication Hong & Page 2004 ----------
def make_search(V, n, k):
    def search(c0, heur):
        c = c0.copy(); j = np.zeros(len(c), dtype=np.int64); fails = np.zeros(len(c), dtype=np.int64)
        active = np.ones(len(c), dtype=bool)
        h = np.asarray(heur)
        while active.any():
            idx = np.nonzero(active)[0]
            cand = (c[idx] + h[j[idx] % k]) % n
            better = V[cand] > V[c[idx]]
            c[idx[better]] = cand[better]
            fails[idx[better]] = 0
            fails[idx[~better]] += 1
            j[idx] += 1
            active[idx[fails[idx] >= k]] = False
        return c
    return search

def hp_once(seed, l, team_size, n_random_teams, n=2000, k=3):
    rng = np.random.default_rng(seed)
    V = rng.uniform(0, 100, n)
    search = make_search(V, n, k)
    starts = np.arange(n)
    pool = [(a, b, c) for a in range(1, l + 1) for b in range(1, l + 1) for c in range(1, l + 1) if len({a, b, c}) == 3]
    ev = np.array([V[search(starts, h)].mean() for h in pool])
    def team_perf(team):
        c = starts.copy()
        while True:
            c0 = c
            for h in team:
                c = search(c, h)
            if np.array_equal(c, c0):
                break
        return V[c].mean()
    best = [pool[i] for i in np.argsort(-ev)[:team_size]]
    perf_best = team_perf(best)
    perf_rand = [team_perf([pool[i] for i in rng.choice(len(pool), team_size, replace=False)]) for _ in range(n_random_teams)]
    return len(pool), perf_best, float(np.mean(perf_rand)), ev.mean(), ev.max()

def part_hp(reps=3):
    print("== Hong & Page 2004 (n=2000, k=3) : equipe des meilleurs vs equipes aleatoires ==")
    from multiprocessing import Pool
    for l, ts in ((12, 20), (20, 10)):
        with Pool(min(reps, 24)) as P:
            res = P.starmap(hp_once, [(s, l, ts, 20) for s in range(reps)])
        for r in res:
            print(f"l={l} equipe={ts} pool={r[0]} meilleurs={r[1]:.2f} aleatoires(moy de 20 equipes)={r[2]:.2f} ; valeur moyenne d'un agent={r[3]:.2f}, max={r[4]:.2f}")
        print(f"  moyennes sur {reps} fonctions : meilleurs={np.mean([r[1] for r in res]):.2f} ; aleatoires={np.mean([r[2] for r in res]):.2f}")

# ---------- Partie 6 : colonie de Sasaki 2013 (lecture numerisee de la Fig. 3) vs jury de n votants independants ----------
SASAKI_FIG3 = {  # difference de qualite (%) : (individus, colonies), lecture par numerisation de l'image [I], +-0,01
    5: (0.590, 0.651), 10: (0.610, 0.673), 20: (0.661, 0.720), 30: (0.719, 0.767), 40: (0.778, 0.813),
    50: (0.839, 0.855), 60: (0.894, 0.890), 70: (0.937, 0.920), 80: (0.972, 0.940), 90: (0.993, 0.953), 99: (1.000, 0.957)}

def part_neff():
    print("== Fig. 3 de Sasaki 2013 (numerisee) : G du cadre et nombre equivalent de votants independants ==")
    print("d%   P_ind  P_col  dP     G=(Pc-Pi)/(1-Pi)   n_eff (plus petit n impair tel que Maj_n(P_ind) >= P_col)")
    for d, (pi, pc) in SASAKI_FIG3.items():
        G = (pc - pi) / (1 - pi) if pi < 1 else float('nan')
        n_eff = None
        if pc > pi:
            for n in range(1, 2002, 2):
                if maj_prob(n, pi) >= pc:
                    n_eff = n; break
        print(f"{d:>3}  {pi:.3f}  {pc:.3f}  {pc-pi:+.3f}  {G:+.3f}              {n_eff if n_eff else ('<1 (colonie sous un individu)' if pc <= pi else '>2001')}")
    print("Jury de n=101 independants avec p=P_ind :", {d: round(maj_prob(101, pi), 3) for d, (pi, pc) in SASAKI_FIG3.items()})

def part_chen_tables():
    print("== Chen et al. : F(K) exact pour quelques triplets (alpha, p1, p2) ==")
    for (a, p1, p2) in ((0.5, 0.85, 0.4), (0.6, 0.85, 0.4), (0.6, 0.75, 0.4), (0.5, 0.65, 0.4), (0.4, 0.85, 0.1), (0.6, 0.85, 0.1)):
        print((a, p1, p2), {K: round(F_mix(K, a, p1, p2), 4) for K in (1, 3, 5, 7, 11, 21, 51, 101, 201)})


_LF = np.concatenate(([0.0], np.cumsum(np.log(np.arange(1, 2001)))))
def maj_fast(K, p):
    """Majorite binomiale (K impair) en log-espace, vectorisee : meme valeur que maj_prob a 1e-12 pres."""
    k = np.arange(0, K + 1)
    lp = _LF[K] - _LF[k] - _LF[K - k] + k * math.log(p) + (K - k) * math.log1p(-p)
    return float(np.exp(lp[k > K / 2]).sum())

def F_fast(K, a, p1, p2):
    return a * maj_fast(K, p1) + (1 - a) * maj_fast(K, p2)

def part_chen_thm4():
    """Theoreme 4 de Chen et al. 2024 : K* = 2 log(a/(1-a) * (2p1-1)/(1-2p2)) / log(p2(1-p2)/(p1(1-p1))).
    Compare a l'optimum exact (K impair <= 801) selon le signe de alpha - (1 - 1/t)."""
    Ks = list(range(1, 802, 2))
    res = {"alpha > 1-1/t": [0, 0], "alpha < 1-1/t": [0, 0]}   # [n_cas, n_ok]
    for p1 in (0.6, 0.7, 0.8, 0.85, 0.9):
        for p2 in (0.1, 0.2, 0.3, 0.4, 0.45):
            if p1 + p2 <= 1: continue
            t = p2 * (1 - p2) * (0.5 - p2) / (p1 * (1 - p1) * (p1 - 0.5)) + 1
            thr = 1 - 1 / t
            for a in (0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9):
                F = [F_fast(K, a, p1, p2) for K in Ks]
                Ke = Ks[int(np.argmax(F))]
                arg = a / (1 - a) * (2 * p1 - 1) / (1 - 2 * p2)
                Kf = 2 * math.log(arg) / math.log(p2 * (1 - p2) / (p1 * (1 - p1))) if arg > 0 else float("nan")
                if a > thr and 1 < Ke < Ks[-1]:
                    res["alpha > 1-1/t"][0] += 1; res["alpha > 1-1/t"][1] += int(abs(Kf - Ke) <= 2)
                elif a < thr:
                    res["alpha < 1-1/t"][0] += 1; res["alpha < 1-1/t"][1] += int(Ke == 1)
    print("== Theoreme 4 (Chen 2024) : [n cas, n conformes] ==")
    print("alpha > 1-1/t (optimum interieur) : |K*formule - K*exact| <= 2 :", res["alpha > 1-1/t"])
    print("alpha < 1-1/t : K*exact = 1 :", res["alpha < 1-1/t"])


if __name__ == "__main__":
    parts = {"condorcet": part_condorcet, "chen": part_chen, "chen_tables": part_chen_tables, "chen_thm4": part_chen_thm4, "diversity": part_diversity,
             "sasaki": part_sasaki, "neff": part_neff, "hp": part_hp}
    for w in (sys.argv[1:] or [k for k in parts if k != "hp"]):
        parts[w]()

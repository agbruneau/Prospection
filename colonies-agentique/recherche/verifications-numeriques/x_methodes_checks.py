"""Verifications numeriques du dossier x-methodes (exploratoire, stdlib seulement).

Usage : python x_methodes_checks.py [section ...]   (sections : prng stats rk4 ssa order tost ntable mcse ; defaut = toutes)
Chaque section imprime des lignes PASS/FAIL ou des valeurs a comparer aux sources citees dans le dossier.
"""
import math, random, statistics as st, sys
from statistics import NormalDist

M32 = 0xFFFFFFFF
M64 = (1 << 64) - 1
Z = NormalDist().inv_cdf


def check(name, ok, detail=""):
    print(("PASS " if ok else "FAIL ") + name + (" : " + detail if detail else ""))


# ---------------------------------------------------------------- PRNG
def rotl32(x, k): return ((x << k) | (x >> (32 - k))) & M32


class Xoshiro128ss:
    """xoshiro128** (Blackman & Vigna), operations 32 bits."""
    def __init__(self, s): self.s = [x & M32 for x in s]
    def next(self):
        s = self.s
        result = (rotl32((s[1] * 5) & M32, 7) * 9) & M32
        t = (s[1] << 9) & M32
        s[2] ^= s[0]; s[3] ^= s[1]; s[1] ^= s[2]; s[0] ^= s[3]; s[2] ^= t
        s[3] = rotl32(s[3], 11)
        return result


class Pcg32:
    """PCG-XSH-RR 64/32 (O'Neill 2014), constantes de la caisse rand_pcg : MULT, ROTATE=59, XSHIFT=18, SPARE=27."""
    MULT = 6364136223846793005
    def __init__(self, state, stream):
        self.inc = ((stream << 1) | 1) & M64
        self.state = 0
        self._step(); self.state = (self.state + state) & M64; self._step()
    def _step(self): self.state = (self.state * self.MULT + self.inc) & M64
    def next(self):
        old = self.state; self._step()
        xsh = (((old >> 18) ^ old) >> 27) & M32
        rot = old >> 59
        return ((xsh >> rot) | (xsh << ((-rot) & 31))) & M32


class SplitMix64:
    """SplitMix64 (Steele, Lea, Flood 2014) ; constantes lues dans rand_xoshiro (PHI, 0xbf58476d1ce4e5b9, 0x94d049bb133111eb, decalages 30/27/31)."""
    def __init__(self, seed): self.x = seed & M64
    def next(self):
        self.x = (self.x + 0x9e3779b97f4a7c15) & M64
        z = self.x
        z = ((z ^ (z >> 30)) * 0xbf58476d1ce4e5b9) & M64
        z = ((z ^ (z >> 27)) * 0x94d049bb133111eb) & M64
        return z ^ (z >> 31)


def xoshiro128ss_from_seed(seed64):
    """Graine 64 bits -> etat 4 x 32 bits par SplitMix64 (recommandation de Blackman et Vigna, section 5.3)."""
    sm = SplitMix64(seed64)
    a, b = sm.next(), sm.next()
    return Xoshiro128ss([a & M32, a >> 32, b & M32, b >> 32])


def sec_prng():
    sm = SplitMix64(1477776061723855037)
    out_sm = [sm.next() for _ in range(3)]
    check("SplitMix64 graine 1477776061723855037 = vecteur de rand_xoshiro (3 premiers)", out_sm == [1985237415132408290, 2979275885539914483, 13511426838097143398], str(out_sm))
    g1, g2 = xoshiro128ss_from_seed(1), xoshiro128ss_from_seed(2)
    a, b = [g1.next() for _ in range(5)], [g2.next() for _ in range(5)]
    check("graines voisines (1, 2) via SplitMix -> sorties differentes", all(x != y for x, y in zip(a, b)) and Xoshiro128ss([1, 0, 0, 0]).s != Xoshiro128ss([2, 0, 0, 0]).s)
    ref_x = [11520, 0, 5927040, 70819200, 2031721883, 1637235492, 1287239034, 3734860849, 3729100597, 4258142804]
    g = Xoshiro128ss([1, 2, 3, 4])
    out = [g.next() for _ in range(10)]
    check("xoshiro128** graine [1,2,3,4] = vecteur de rand_xoshiro", out == ref_x, str(out[:4]) + "...")
    ref_p = [0xa15c02b7, 0x7b47f409, 0xba1d3330, 0x83d2f293, 0xbfa4784b, 0xcbed606e]
    p = Pcg32(42, 54)
    outp = [p.next() for _ in range(6)]
    check("PCG32 (42,54) = vecteur de rand_pcg", outp == ref_p, str([hex(x) for x in outp[:3]]) + "...")


# ---------------------------------------------------------------- statistiques
def sec_stats():
    # Miller 2024, Eq. 9-10
    z = Z
    n = (z(1 - .05 / 2) + z(1 - .2)) ** 2 * (1 / 9) / 0.03 ** 2
    check("Miller Eq.9 exemple n=969", round(n) == 969, f"n={n:.1f}")
    def mde(K, n=198, w2=1 / 9, s2=1 / 6):
        return (z(1 - .025) + z(1 - .2)) * math.sqrt((w2 + s2 / K + s2 / K) / n)
    check("Miller Eq.10 MDE 13,2 % -> 7,5 % (K=1 -> 10), valeurs publiees tronquees",
          math.floor(mde(1) * 1000) / 10 == 13.2 and math.floor(mde(10) * 1000) / 10 == 7.5,
          f"{mde(1)*100:.2f} % -> {mde(10)*100:.2f} % (arrondi : 13,3 -> 7,6)")
    # Miller sec. 3.1 : Var(mu|K) = Var(mu|K=1) * (1 + 2/K)/3 pour x ~ U[0,1], score binaire
    vx, e_sig2 = 1 / 12, 1 / 6
    r = [(vx + e_sig2 / K) / (vx + e_sig2) for K in (1, 2, 4, 6)]
    check("Miller sec.3.1 facteur (1+2/K)/3 : K=2 -> 2/3, K=4 -> 1/2, K=6 -> 4/9",
          all(abs(a - b) < 1e-12 for a, b in zip(r, [1, 2 / 3, 1 / 2, 4 / 9])), str([round(x, 4) for x in r]))
    # Miller sec. 4.2 : correlation 0.5, scores U[0,1] -> variance de la difference 1/6 -> 1/9
    # Miller sec. 4.2 : Var(sA)=Var(sB)=1/12, correlation 0,5 -> Cov = 1/24. Le texte conclut 1/6 -> 1/9 (-1/3) ;
    # le recalcul donne 1/6 - 2/24 = 1/12 (-1/2). 1/9 correspondrait a une correlation de 1/3.
    unp = 1 / 12 + 1 / 12
    par = unp - 2 * (0.5 * (1 / 12))
    rho_for_19 = (unp - 1 / 9) / (2 * (1 / 12))
    check("Miller sec.4.2 recalcul : variance appariee = 1/12 (pas 1/9) pour rho=0,5", abs(par - 1 / 12) < 1e-12 and abs(rho_for_19 - 1 / 3) < 1e-12,
          f"non apparie {unp:.4f}, apparie {par:.4f} ; rho donnant 1/9 = {rho_for_19:.3f}")
    # Morris et al. 2019 : n_sim
    check("Morris n_sim couverture 95 %, MCSE 0,5 % = 1900", round(95 * 5 / 0.5 ** 2) == 1900)
    check("Morris n_sim pire cas 50 %, MCSE 0,5 % = 10000", round(50 * 50 / 0.5 ** 2) == 10000)
    check("MCSE proportion n=400 p=.5 = 0,025", abs(math.sqrt(.25 / 400) - 0.025) < 1e-12)
    # Lakens 2017 : n par groupe TOST (approx normale, puissance 80 %, alpha .05, effet vrai 0)
    for d, pub in ((0.5, 70), (0.3, 191), (0.2, 429)):
        n_z = 2 * (z(1 - .05) + z(1 - (1 - .8) / 2)) ** 2 / d ** 2
        print(f"     TOST d={d}: approx normale n={n_z:.1f} (Lakens Tab.1 : {pub})")
    # Axtell 1996 : valeurs critiques
    print(f"     K-S bilateral 5 pct, n=m=40 : {1.358 * math.sqrt(80 / 1600):.3f} (Axtell 1996 : 0,304)")
    # Gelman : SE interaction = 2 x SE effet principal (2x2 equilibre), n x16 si interaction = moitie
    n_cell, s = 100, 1.0
    se_main = s * math.sqrt(1 / (2 * n_cell) + 1 / (2 * n_cell))
    se_int = s * math.sqrt(4 / n_cell)
    check("Gelman : SE(interaction)/SE(principal) = 2, n x16 si effet/2", abs(se_int / se_main - 2) < 1e-12 and abs((2 / 0.5) ** 2 - 16) < 1e-12)
    # puissances de l'audit methodologie, Annexe A
    def n_prop(p1, p2, a=.05, pw=.8):
        pb = (p1 + p2) / 2
        return ((z(1 - a / 2) * (2 * pb * (1 - pb)) ** .5 + z(pw) * (p1 * (1 - p1) + p2 * (1 - p2)) ** .5) ** 2) / (p1 - p2) ** 2
    print("     n_prop(.5,.7)=%.0f  n_prop(.7,.9)=%.0f (audit methodologie : 93 / 62)" % (n_prop(.5, .7), n_prop(.7, .9)))


# ---------------------------------------------------------------- RK4
def seeley_rhs(y, sig, g=3.0, a=1 / 3, r=3.0):
    A, B = y; U = 1 - A - B
    return (g * U - A * (a - r * U + sig * B), g * U - B * (a - r * U + sig * A))


def rk4(f, y, h, n, *args):
    for _ in range(n):
        k1 = f(y, *args)
        k2 = f([y[i] + h / 2 * k1[i] for i in range(2)], *args)
        k3 = f([y[i] + h / 2 * k2[i] for i in range(2)], *args)
        k4 = f([y[i] + h * k3[i] for i in range(2)], *args)
        y = [y[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) for i in range(2)]
    return y


def euler(f, y, h, n, *args):
    for _ in range(n):
        k = f(y, *args); y = [y[i] + h * k[i] for i in range(2)]
    return y


def sec_rk4():
    T, sig, y0 = 4.0, 10.0, [0.01, 0.0101]
    ref = rk4(seeley_rhs, y0, T / 64000, 64000, sig)
    for name, scheme in (("Euler", euler), ("RK4", rk4)):
        errs = []
        for n in (40, 80, 160, 320):
            y = scheme(seeley_rhs, y0, T / n, n, sig)
            errs.append(max(abs(y[0] - ref[0]), abs(y[1] - ref[1])))
        ratios = [errs[i] / errs[i + 1] for i in range(3)]
        print(f"     {name}: erreurs {['%.2e' % e for e in errs]}; rapports par raffinement x2 {['%.1f' % r for r in ratios]}")
    e4 = [max(abs(a - b) for a, b in zip(rk4(seeley_rhs, y0, T / n, n, sig), ref)) for n in (40, 80)]
    check("RK4 ordre ~4 sur M1c (Seeley 2012 SOM, sigma=10) : rapport ~16", 12 < e4[0] / e4[1] < 20, f"{e4[0]/e4[1]:.1f}")
    # fixed point analytique post-bifurcation
    g, a, r = 3.0, 1 / 3, 3.0
    S, P = 1 - a / r, g * a / (r * 10)
    d = math.sqrt(S * S - 4 * P)
    y = rk4(seeley_rhs, [0.01, 0.0101], 0.01, 20000, 10.0)
    hi, lo = max(y), min(y)  # A0 < B0 : B gagne ; on compare sans ordre
    check("RK4 equilibre sigma=10 = (0.8497, 0.0392)", abs(hi - (S + d) / 2) < 1e-3 and abs(lo - (S - d) / 2) < 1e-3, str([round(v, 4) for v in y]))


# ---------------------------------------------------------------- SSA
def ssa_seeley(N, sig, T, rng, g=3.0, a=1 / 3, r=3.0):
    """Gillespie direct (Gillespie 2007, Eq. 10) sur M1c : U->A, A->U, U+A->A+A, A+B->U+B (A inhibe par B)."""
    A = B = 0; t = 0.0
    while t < T:
        U = N - A - B
        p = [g * U, g * U, a * A, a * B, r * A * U / N, r * B * U / N, sig * A * B / N, sig * A * B / N]
        # reactions : 0 U->A, 1 U->B, 2 A->U, 3 B->U, 4 U+A->2A, 5 U+B->2B, 6 A+B->U+B (A inhibe), 7 A+B->A+U (B inhibe)
        a0 = sum(p)
        if a0 <= 0: break
        t += math.log(1 / (1 - rng.random())) / a0
        x = rng.random() * a0; j = 0; acc = p[0]
        while acc < x: j += 1; acc += p[j]
        if j in (0, 4): A += 1
        elif j in (1, 5): B += 1
        elif j in (2, 6): A -= 1
        else: B -= 1
    return A / N, B / N


def sec_ssa():
    rng = random.Random(20261001)
    # test lineaire exact : birth U->A seul, E[A](t) = N (1 - exp(-g t)) (verifie la methode directe)
    N, g, t_end, runs = 200, 0.5, 2.0, 2000
    res = []
    for _ in range(runs):
        A = 0; t = 0.0
        while True:
            a0 = g * (N - A)
            if a0 <= 0: break
            t += math.log(1 / (1 - rng.random())) / a0
            if t > t_end: break
            A += 1
        res.append(A)
    m, se = st.mean(res), st.stdev(res) / math.sqrt(runs)
    exact = N * (1 - math.exp(-g * t_end))
    check("SSA direct : E[A](t=2) = N(1-exp(-g t)) a +-3 ES de Monte Carlo", abs(m - exact) < 3 * se, f"SSA {m:.2f} +- {se:.2f} ; exact {exact:.2f}")
    # Seeley M1c N fini : sigma* = 1,6875
    for N in (50, 200):
        for sig in (1.0, 10.0):
            n_runs = 200
            diffs = [abs(a - b) for a, b in (ssa_seeley(N, sig, 40.0, rng) for _ in range(n_runs))]
            frac = sum(d > 0.3 for d in diffs) / n_runs
            print(f"     N={N:4d} sigma={sig:4.1f} (sigma*=1.6875) : P(|A-B|/N>0,3 a t=40) = {frac:.3f} +- {math.sqrt(frac*(1-frac)/n_runs):.3f} ; ODE : {'0' if sig < 1.6875 else '1'}")


# ---------------------------------------------------------------- ordre de mise a jour (modele M6 de Sumpter & Pratt 2009, voir dossier p5)
def run_m6(kk, rng, sync, n=40, rr=0.02, px=1.0, py=0.5, T=10, aa=0.1, m=0.9):
    cx = cy = 0; unc = n; t = 0
    def P(c, p): return p * (aa + (m - aa) * c ** kk / (T ** kk + c ** kk))
    while unc:
        t += 1
        cx0, cy0 = cx, cy  # etat au debut du pas (synchrone)
        order = unc
        for _ in range(order):
            if rng.random() < 2 * rr:  # lecture "r par option" (dossier p5)
                if rng.random() < 0.5:
                    if rng.random() < P(cx0 if sync else cx, px): cx += 1; unc -= 1
                else:
                    if rng.random() < P(cy0 if sync else cy, py): cy += 1; unc -= 1
    return cx / n, t


def sec_order():
    rng = random.Random(7)
    pub = {1: (75.5, 253.7, 64.0), 9: (83.3, 307.8, 71.0)}
    for sync in (False, True):
        for kk in (1, 9):
            res = [run_m6(kk, rng, sync) for _ in range(1000)]
            fx = [x for x, _ in res]; ts = [t for _, t in res]
            print(f"     {'synchrone' if sync else 'asynchrone'} k={kk}: X {100*st.mean(fx):.1f} % (MCSE {100*math.sqrt(st.mean(fx)*(1-st.mean(fx))/1000):.2f}), t {st.mean(ts):.1f} +- {st.stdev(ts):.1f} ; publie {pub[kk]}")


def tost_z(diff, se, delta, alpha=0.05):
    """TOST normal (Schuirmann 1987 ; Lakens 2017) : IC a 90 % (1-2 alpha) inclus dans (-delta, +delta) ?"""
    lo, hi = diff - Z(1 - alpha) * se, diff + Z(1 - alpha) * se
    return lo > -delta and hi < delta, (lo, hi)


def sec_mcse():
    """Verifie par simulation les ES de Monte Carlo de Morris et al. 2019 (Tab. 6) : biais, ES empirique, EQM, couverture/puissance."""
    rng = random.Random(3)
    n_sim, reps, theta = 200, 3000, 0.0
    def one():
        est = [rng.gauss(theta, 1.0) for _ in range(n_sim)]
        m = sum(est) / n_sim
        emp = math.sqrt(sum((e - m) ** 2 for e in est) / (n_sim - 1))
        bias = m - theta
        mse = sum((e - theta) ** 2 for e in est) / n_sim
        cov = sum(abs(e) < 1.0 for e in est) / n_sim  # "couverture" arbitraire = P(|e|<1)
        mc = {"bias": math.sqrt(sum((e - m) ** 2 for e in est) / (n_sim * (n_sim - 1))),
              "emp": emp / math.sqrt(2 * (n_sim - 1)),
              "mse": math.sqrt(sum(((e - theta) ** 2 - mse) ** 2 for e in est) / (n_sim * (n_sim - 1))),
              "cov": math.sqrt(cov * (1 - cov) / n_sim)}
        return (bias, emp, mse, cov), mc
    vals, mcs = zip(*(one() for _ in range(reps)))
    for i, name in enumerate(("bias", "emp", "mse", "cov")):
        sd = st.pstdev([v[i] for v in vals]); mean_mc = st.mean(m[name] for m in mcs)
        check(f"ES de MC ({name}) : formule {mean_mc:.4f} vs ecart-type observe {sd:.4f} (rapport {mean_mc/sd:.3f})", abs(mean_mc / sd - 1) < 0.06)
    wrong = st.mean(m["emp"] for m in mcs) * math.sqrt(1.0)  # EmpSE ~ 1 ici : EmpSE^2/sqrt(...) = EmpSE/sqrt(...) quand EmpSE=1 -> ne discrimine pas ; test avec sigma=3 ci-dessous
    rng2 = random.Random(5); sig = 3.0
    emps = []
    for _ in range(3000):
        est = [rng2.gauss(0, sig) for _ in range(n_sim)]; m = sum(est) / n_sim
        emps.append(math.sqrt(sum((e - m) ** 2 for e in est) / (n_sim - 1)))
    sd_obs = st.pstdev(emps); emp_mean = st.mean(emps)
    print(f"     sigma=3 : ecart-type observe de l'ES empirique {sd_obs:.4f} ; EmpSE/sqrt(2(n-1)) = {emp_mean/math.sqrt(2*(n_sim-1)):.4f} ; EmpSE^2/sqrt(2(n-1)) = {emp_mean**2/math.sqrt(2*(n_sim-1)):.4f}")


def sec_ntable():
    """Tailles d'echantillon : TOST sur deux proportions (par bras, puissance 80 %, alpha 5 %, difference vraie 0) et n_sim selon l'ES de Monte Carlo."""
    c = (Z(1 - .05) + Z(1 - .10)) ** 2
    print("     TOST, n par bras = 2 p (1-p) (z_.95 + z_.90)^2 / delta^2 ; (z_.95 + z_.90)^2 = %.3f" % c)
    for p in (0.5, 0.7, 0.9):
        print("     p=%.1f : " % p + " ; ".join(f"delta={d:.2f} -> {math.ceil(2*p*(1-p)*c/d**2)}" for d in (0.05, 0.10, 0.15)))
    for p in (0.5, 0.9):
        print("     n_sim pour ES de MC d'une proportion (p=%.1f) : " % p + " ; ".join(f"ES={e} -> {math.ceil(p*(1-p)/e**2)}" for e in (0.01, 0.005, 0.0025)))
    print("     TOST, d de Cohen, par groupe (normale) : " + " ; ".join(f"d={d} -> {2*c/d**2:.1f}" for d in (0.5, 0.3, 0.2)))


def sec_tost():
    """Exemple d'application de TOST aux cibles G1 du dossier p5 (M6, k=1). Publie : 75,5 % ; 253,7 +- 64,0 (1000 runs, +- lu comme ecart-type [I])."""
    rng = random.Random(11)
    res = [run_m6(1, rng, False) for _ in range(1000)]
    fx = [x for x, _ in res]; ts = [t for _, t in res]
    n = 1000
    # fraction vers X : diff en points, deux echantillons de n=1000
    p1, p0 = st.mean(fx), 0.755
    se_p = math.sqrt(p1 * (1 - p1) / n + p0 * (1 - p0) / n)
    for dl in (0.02, 0.04):
        ok, ci = tost_z(p1 - p0, se_p, dl)
        print(f"     fraction X : diff {100*(p1-p0):+.2f} pts, IC90 [{100*ci[0]:+.2f}; {100*ci[1]:+.2f}] vs +-{100*dl:.0f} pts -> equivalence {'etablie' if ok else 'NON etablie'}")
    # n requis par bras pour une puissance de 80 % a diff vraie = 0 (formule de Lakens 2017, normale)
    for dl in (0.02, 0.04):
        pb = 0.755
        n_req = 2 * pb * (1 - pb) * (Z(1 - .05) + Z(1 - .1)) ** 2 / dl ** 2
        print(f"     n requis par bras (TOST, puissance 80 %, diff vraie 0, marge +-{100*dl:.0f} pts) = {n_req:.0f}")
    # duree : marge relative a la moyenne publiee
    m1, s1 = st.mean(ts), st.stdev(ts); m0, s0 = 253.7, 64.0
    se_t = math.sqrt(s1 ** 2 / n + s0 ** 2 / n)
    for rel in (0.10, 0.15):
        ok, ci = tost_z(m1 - m0, se_t, rel * m0)
        print(f"     duree : diff {m1-m0:+.1f}, IC90 [{ci[0]:+.1f}; {ci[1]:+.1f}] vs +-{100*rel:.0f} % ({rel*m0:.1f}) -> equivalence {'etablie' if ok else 'NON etablie'}")


if __name__ == "__main__":
    secs = sys.argv[1:] or ["prng", "stats", "rk4", "ssa", "order", "tost", "ntable", "mcse"]
    for s in secs:
        print(f"== {s}")
        {"prng": sec_prng, "stats": sec_stats, "rk4": sec_rk4, "ssa": sec_ssa, "order": sec_order, "tost": sec_tost, "ntable": sec_ntable, "mcse": sec_mcse}[s]()

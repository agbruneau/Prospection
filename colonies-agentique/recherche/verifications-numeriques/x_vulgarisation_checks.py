"""Verifications numeriques du dossier x-vulgarisation (exploratoire, stdlib seulement).

Usage : python x_vulgarisation_checks.py [section ...]   (sections : couleur gain taille entrevue ; defaut = toutes)
Chaque section imprime des lignes PASS/FAIL (valeur recalculee contre valeur publiee ou attendue) ou des tableaux
cites dans le dossier. Les valeurs "publiees" viennent des sources lues (voir dossier, section 2).
"""
import math
import sys
from itertools import combinations
from statistics import NormalDist

Z = NormalDist().inv_cdf


def check(name, ok, detail=""):
    print(("PASS " if ok else "FAIL ") + name + (" : " + detail if detail else ""))


# ------------------------------------------------------------------ couleur
OI = {'noir': '#000000', 'orange': '#E69F00', 'bleu_ciel': '#56B4E9', 'vert_bleute': '#009E73',
      'jaune': '#F0E442', 'bleu': '#0072B2', 'vermillon': '#D55E00', 'pourpre': '#CC79A7'}
CHARTE = {'fourmi': OI['vermillon'], 'abeille': OI['bleu'], 'agent': OI['pourpre']}
# Machado, Oliveira, Fernandes 2009 (IEEE TVCG 15(6):1291-1298), severite 1,0, appliquee en RGB lineaire
MACHADO = {
    'protan': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    'deutan': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    'tritan': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
}


def rgb(h): return [int(h[i:i + 2], 16) / 255 for i in (1, 3, 5)]
def lin(c): return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4  # seuil 0,04045 (erratum WCAG)
def delin(c):
    c = min(max(c, 0.0), 1.0)
    return 12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055
def lum(h):
    r, g, b = map(lin, rgb(h))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b          # WCAG 2.x, luminance relative
def contraste(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True)
    return (la + 0.05) / (lb + 0.05)                        # WCAG 2.x, rapport de contraste
def sim(c, m):
    v = [lin(x) for x in c]
    return [delin(sum(m[i][j] * v[j] for j in range(3))) for i in range(3)]
def lab(c):
    r, g, b = [lin(x) for x in c]
    X = (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047
    Y = 0.2126 * r + 0.7152 * g + 0.0722 * b
    Z_ = (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883
    f = lambda t: t ** (1 / 3) if t > 0.008856 else 7.787 * t + 16 / 116
    return 116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z_))
def de76(a, b): return math.dist(lab(a), lab(b))


def de00_lab(l1, l2):
    """CIEDE2000 (Sharma, Wu, Dalal 2005) entre deux triplets Lab."""
    L1, a1, b1 = l1; L2, a2, b2 = l2
    C1, C2 = math.hypot(a1, b1), math.hypot(a2, b2)
    Cb = (C1 + C2) / 2
    G = 0.5 * (1 - math.sqrt(Cb ** 7 / (Cb ** 7 + 25 ** 7)))
    a1p, a2p = (1 + G) * a1, (1 + G) * a2
    C1p, C2p = math.hypot(a1p, b1), math.hypot(a2p, b2)
    h1p, h2p = math.degrees(math.atan2(b1, a1p)) % 360, math.degrees(math.atan2(b2, a2p)) % 360
    dLp, dCp = L2 - L1, C2p - C1p
    if C1p * C2p == 0:
        dhp = 0
    else:
        dhp = h2p - h1p
        dhp = dhp - 360 if dhp > 180 else dhp + 360 if dhp < -180 else dhp
    dHp = 2 * math.sqrt(C1p * C2p) * math.sin(math.radians(dhp / 2))
    Lbp, Cbp = (L1 + L2) / 2, (C1p + C2p) / 2
    if C1p * C2p == 0: hbp = h1p + h2p
    elif abs(h1p - h2p) <= 180: hbp = (h1p + h2p) / 2
    elif h1p + h2p < 360: hbp = (h1p + h2p + 360) / 2
    else: hbp = (h1p + h2p - 360) / 2
    T = (1 - 0.17 * math.cos(math.radians(hbp - 30)) + 0.24 * math.cos(math.radians(2 * hbp))
         + 0.32 * math.cos(math.radians(3 * hbp + 6)) - 0.20 * math.cos(math.radians(4 * hbp - 63)))
    dth = 30 * math.exp(-(((hbp - 275) / 25) ** 2))
    Rc = 2 * math.sqrt(Cbp ** 7 / (Cbp ** 7 + 25 ** 7))
    Sl = 1 + 0.015 * (Lbp - 50) ** 2 / math.sqrt(20 + (Lbp - 50) ** 2)
    Sc, Sh = 1 + 0.045 * Cbp, 1 + 0.015 * Cbp * T
    Rt = -math.sin(math.radians(2 * dth)) * Rc
    return math.sqrt((dLp / Sl) ** 2 + (dCp / Sc) ** 2 + (dHp / Sh) ** 2 + Rt * (dCp / Sc) * (dHp / Sh))


def de00(a, b): return de00_lab(lab(a), lab(b))


def section_couleur():
    print('== couleur : contraste WCAG et distances sous simulation CVD (charte V0)')
    # auto-test de l'implantation CIEDE2000 sur deux paires du jeu de test de Sharma et al. 2005
    check('CIEDE2000 test Sharma paire 1', abs(de00_lab((50, 2.6772, -79.7751), (50, 0, -82.7485)) - 2.0425) < 5e-4)
    check('CIEDE2000 test Sharma paire 7', abs(de00_lab((50, 2.5, 0), (73, 25, -18)) - 27.1492) < 5e-4)
    check('Contraste noir/blanc = 21', abs(contraste('#000000', '#FFFFFF') - 21) < 1e-9)
    attendu = {'fourmi': (3.87, 4.84), 'abeille': (5.19, 3.61), 'agent': (3.06, 6.12)}
    for k, h in CHARTE.items():
        cb, cn = contraste(h, '#FFFFFF'), contraste(h, '#121212')
        ok = abs(cb - attendu[k][0]) < 0.01 and abs(cn - attendu[k][1]) < 0.01
        check(f'contraste {k} {h} : {cb:.2f} (blanc) / {cn:.2f} (#121212)', ok,
              'graphique >= 3:1 ' + ('OK' if min(cb, cn) >= 3 else 'NON') + ' ; texte >= 4,5:1 ' +
              ('OK' if cb >= 4.5 else 'NON sur blanc'))
    print('  paire              normal  protan  deutan  tritan   (dE76 | dE2000)')
    for (ka, ha), (kb, hb) in combinations(CHARTE.items(), 2):
        a, b = rgb(ha), rgb(hb)
        v76 = [de76(a, b)] + [de76(sim(a, m), sim(b, m)) for m in MACHADO.values()]
        v00 = [de00(a, b)] + [de00(sim(a, m), sim(b, m)) for m in MACHADO.values()]
        print(f'  {ka + "-" + kb:18s} ' + ' '.join(f'{x:6.1f}' for x in v76) + '  | ' + ' '.join(f'{x:5.1f}' for x in v00))
    a, b = rgb(OI['vermillon']), rgb(OI['orange'])
    ref = de00(sim(a, MACHADO['deutan']), sim(b, MACHADO['deutan']))
    print(f'  repere fragile vermillon-orange en deuteranopie : dE2000 = {ref:.1f} (dE76 = '
          f'{de76(sim(a, MACHADO["deutan"]), sim(b, MACHADO["deutan"])):.1f})')


# --------------------------------------------------------------------- gain
def g_hake(pre, post): return (post - pre) / (100 - pre)


def section_gain():
    print('== gain normalise et tailles d\'effet (Hake 1998/2002)')
    check('g = 19/56 (exemple Hake 2002, Sec. II-B)', abs(g_hake(44, 63) - 0.34) < 0.005, f'{g_hake(44, 63):.3f}')
    check('g = 0,69 (pre 32 %, gain 47 points; Hake 2002, Sec. II-B)', abs(g_hake(32, 79) - 0.69) < 0.005,
          f'{g_hake(32, 79):.3f}')
    d = (0.48 - 0.23) / math.sqrt((0.14 ** 2 + 0.04 ** 2) / 2)
    check('d(Hake, Eq. 9) = 2,43', abs(d - 2.43) < 0.01, f'{d:.3f}')
    se = (0.33 - 0.12) / (2 * 1.96)
    print(f'  Berney et Betrancourt 2016 : g = 0,226, IC95 [0,12 ; 0,33] -> ES approx. = {se:.3f} [inference, IC symetrique]')
    print(f'  Hake : ecart (IE - T) = 0,25 = {0.25 / 0.14:.2f} sd(IE) = {0.25 / 0.04:.2f} sd(T)  (publie : "almost two sd" / "over 6 sd")')


# ------------------------------------------------------------------- taille
def n_two_means(d, alpha=0.05, power=0.80):
    za, zb = Z(1 - alpha / 2), Z(power)
    return 2 * ((za + zb) / d) ** 2 + za ** 2 / 4


def n_ancova(d, rho, **kw): return n_two_means(d, **kw) * (1 - rho ** 2)


def n_props(p1, p2, alpha=0.05, power=0.80):
    za, zb = Z(1 - alpha / 2), Z(power)
    pb = (p1 + p2) / 2
    return ((za * math.sqrt(2 * pb * (1 - pb)) + zb * math.sqrt(p1 * (1 - p1) + p2 * (1 - p2))) ** 2) / (p1 - p2) ** 2


def deff(m, icc): return 1 + (m - 1) * icc


def section_taille():
    print('== tailles d\'echantillon (alpha 0,05 bilateral ; hypotheses : voir dossier, section 3)')
    check('n(d=0,5 ; 80 %) = 64 par groupe', math.ceil(n_two_means(0.5)) == 64)
    check('n(d=0,226) ~ 307 (audit vulgarisation, +-3)', abs(n_two_means(0.226) - 307) <= 3, f'{n_two_means(0.226):.1f}')
    check('n(d=0,37) ~ 115 (audit, +-2)', abs(n_two_means(0.37) - 115) <= 2, f'{n_two_means(0.37):.1f}')
    print('   d     80 %   90 %   ANCOVA r=0,5   r=0,7   (par groupe)')
    for d in (0.20, 0.226, 0.30, 0.37, 0.50, 0.80):
        print(f'  {d:5.3f} {math.ceil(n_two_means(d)):6d} {math.ceil(n_two_means(d, power=0.9)):6d} '
              f'{math.ceil(n_ancova(d, 0.5)):11d} {math.ceil(n_ancova(d, 0.7)):8d}')
    print('  avec 30 % d\'attrition (post-test differe), ANCOVA r=0,5, 80 % :',
          {d: math.ceil(n_ancova(d, 0.5) / 0.7) for d in (0.226, 0.30, 0.37, 0.50)})
    print('  randomisation par classe (m=25) : DEFF =', {icc: round(deff(25, icc), 2) for icc in (0.05, 0.10, 0.20)},
          '; d=0,37, ANCOVA r=0,5 -> classes par bras :',
          {icc: math.ceil(n_ancova(0.37, 0.5) * deff(25, icc) / 25) for icc in (0.05, 0.10, 0.20)})
    print('  item de conception erronee (bonnes reponses) :',
          {f'{a}->{b}': math.ceil(n_props(a, b)) for a, b in ((0.3, 0.5), (0.3, 0.6), (0.4, 0.6), (0.2, 0.5))})


# ----------------------------------------------------------------- entrevue
def section_entrevue():
    print('== entrevues a voix haute : 1-(1-L)^n (Nielsen et Landauer 1993, formule rapportee par sources secondaires)')
    check('L=0,31, n=5 -> 85 % (rapporte ~85 %, +-1 point)', abs((1 - (1 - 0.31) ** 5) - 0.85) < 0.01,
          f'{1 - (1 - 0.31) ** 5:.3f}')
    for L in (0.31, 0.15):
        print(f'  L={L} :', {n: round(1 - (1 - L) ** n, 3) for n in (3, 5, 6, 8, 10, 15)},
              '; n pour 85/90/95 % :', [math.ceil(math.log(1 - t) / math.log(1 - L)) for t in (0.85, 0.90, 0.95)])


if __name__ == '__main__':
    secs = {'couleur': section_couleur, 'gain': section_gain, 'taille': section_taille, 'entrevue': section_entrevue}
    for s in (sys.argv[1:] or list(secs)):
        secs[s]()

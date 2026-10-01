"""Vérifications numériques exploratoires du dossier P9 (régime exploratoire).

Usage : python p9_checks.py     (numpy requis; environ 4 min, dont presque tout pour Vicsek)

1. Reid et al. 2015 (PNAS 112:15113), éq. 1-5 : géométrie L_A, D_max et distance optimale d*
   du pont, avec les paramètres publiés (Materials and Methods).
2. Vicsek et al. 1995 (arXiv cond-mat/0611743) : paramètre d'ordre v_a(eta) pour rho = 4 et
   rho = 0.4 (la figure 2 et le texte de l'article donnent des densités différentes).
3. Contrôles d'arithmétique sur des formules publiées (Mlot 2011, Burd 2002 via Peters 2006,
   Peters 2006 éq. 15, Gelblum 2016, Khuong 2016, Vicsek 1995).
Les valeurs imprimées sont des calculs de l'auteur du dossier [I], pas des valeurs publiées.
"""
import math
import numpy as np

# ---------- 1. Reid et al. 2015 ----------
L0, wA, LT = 22.04, 3.3, 100.0           # cm (Materials and Methods)
ln, wn = 0.691, 0.107                    # cm, dimensions d'une fourmi
dens = 0.42                              # fourmis / cm sur l'appareil
A = 17.02                                # paramètre libre ajusté (IC95 % 15,22-18,82)
slope = {12: 1.25, 20: 0.96, 40: 0.59, 60: 0.52}      # pentes largeur/longueur (Fig. S1)
pub_LA = {12: 13.95, 20: 25.36, 40: 35.01, 60: 35.36}
pub_Dmax = {12: 6.93, 20: 12.49, 40: 16.45, 60: 16.61}


def reid(theta_deg, w_theta, A=A, LA_override=None):
    th = math.radians(theta_deg)
    LA = (2 * L0 - wA / math.tan(th / 2)) if LA_override is None else LA_override
    Dmax = LA * math.cos(th / 2) / 2
    N = dens * (LT + LA)
    t2, s2 = math.tan(th / 2), math.sin(th / 2)
    inner = (LT + LA) ** 2 - A * N * ln * wn * (1 - s2) ** 2 / (w_theta * (1 - w_theta * t2) * s2 ** 2)
    if inner < 0:
        return LA, Dmax, N, float("nan")
    d = math.cos(th / 2) / (2 * (1 - s2)) * ((LT + LA) - math.sqrt(inner))
    return LA, Dmax, N, d


def check_reid():
    print("== Reid 2015, éq. 4-5 (A = %.2f) ==" % A)
    print("theta  L_A formule (publié)   D_max formule (publié)   d* [L_A formule]  d* [L_A publié]  (borne D_max publié)")
    for th in (12, 20, 40, 60):
        LA, Dm, N, d = reid(th, slope[th])
        d_pub = reid(th, slope[th], LA_override=pub_LA[th])[3]
        print("%4d   %6.2f (%5.2f)        %6.2f (%5.2f)          %6.2f            %6.2f          %5.2f" %
              (th, LA, pub_LA[th], Dm, pub_Dmax[th], d, d_pub, pub_Dmax[th]))
    # D_max publié à 60 deg est cohérent avec L_A = 38,36, pas 35,36
    th = 60
    print("D_max(60 deg) avec L_A = 38,36 :", round(38.36 * math.cos(math.radians(th / 2)) / 2, 2), "(publié 16,61)")
    print("(w_theta = 4,799 theta^-0,5014, theta en degrés :)")
    for th in (12, 20, 40, 60):
        w = 4.799 * th ** -0.5014
        print("%4d  w=%.3f  d*=%.2f" % (th, w, reid(th, w)[3]))


# ---------- 2. Vicsek 1995 ----------
def vicsek_va(N, L, eta, v=0.03, steps=3000, burn=1500, seed=0):
    rng = np.random.default_rng(seed)
    x = rng.random((N, 2)) * L
    th = rng.random(N) * 2 * np.pi
    acc = []
    for t in range(steps):
        d = x[:, None, :] - x[None, :, :]
        d -= L * np.round(d / L)                       # conditions périodiques
        nb = (d ** 2).sum(-1) <= 1.0                   # rayon d'interaction r = 1 (inclut i)
        s = nb @ np.sin(th)
        c = nb @ np.cos(th)
        th = np.arctan2(s, c) + (rng.random(N) - 0.5) * eta
        x = (x + v * np.stack([np.cos(th), np.sin(th)], 1)) % L
        if t >= burn:
            acc.append(math.hypot(np.cos(th).mean(), np.sin(th).mean()))
    return float(np.mean(acc))


def check_vicsek():
    print("== Vicsek 1995 : v_a(eta), v = 0,03, r = 1, N = 400 ==")
    for L, label in ((20.0, "rho = 1"), (10.0, "rho = 4 (densité de la Fig. 2)")):
        row = [(eta, vicsek_va(400, L, eta)) for eta in (0.5, 1.5, 2.5, 3.0, 3.5, 4.5)]
        print(label, " ".join("eta=%.1f:%.2f" % r for r in row))
    print("rho = 0.4 (densité écrite dans le texte), N = 40, L = 10 :")
    row = [(eta, vicsek_va(40, 10.0, eta)) for eta in (0.5, 1.5, 2.5, 3.0, 3.5, 4.5)]
    print(" ".join("eta=%.1f:%.2f" % r for r in row))


def check_misc():
    print("== Contrôles d'arithmétique ==")
    # Mlot 2011 : Cassie-Baxter, cos(theta*) = phi (1 + cos(theta_e)) - 1
    for phi in (0.35, (0.2) ** (2 / 3)):
        th = math.degrees(math.acos(phi * (1 + math.cos(math.radians(102))) - 1))
        print("Mlot : phi=%.3f, theta_e=102 deg -> theta*=%.1f deg (publié 136, mesuré 133 +/- 12)" % (phi, th))
    # Burd 2002 : Phi = w rho Vm [1 - (w rho/km)^n] -> V/Vm au débit maximal = n/(n+1)
    n = 0.64
    print("Burd (via Peters 2006) : n=%.2f -> V/Vm au débit max = %.3f (publié 0,39)" % (n, n / (n + 1)))
    # Peters 2006, éq. 15 avec gamma = 0 : D^2 = (q phi/nu)^2 - k^2 > 0 <=> phi > k nu / q
    q, k, nu = 1.0, 6.0, 1 / 40
    print("Peters : seuil d'asymétrie à gamma=0 : phi > k nu/q = %.3f fourmis/min (q=1, k=6, nu=1/40 min^-1)" % (k * nu / q))
    # Gelblum 2016 : F_ind^c = N f0 / 2 ; Gelblum 2015 : F_c = 4,3 (unité : force d'une fourmi, f0 = 1 [I])
    print("Gelblum : F_c = 4,3 avec f0 = 1 -> N = %.1f fourmis (si F_c = N f0/2 s'applique à 2015 [I])" % (2 * 4.3))
    # Khuong 2016 : taux de dépôt et probabilité par pas de 1 s
    eta_d = lambda n: 0.025 + 0.11 * n
    print("Khuong : eta_d(0..3) =", [round(eta_d(n), 3) for n in range(4)], "s^-1 ; P(drop|n=0, sans phéromone) = %.3f" % (1 - math.exp(-eta_d(0))))
    # Vicsek 1995 : bruit uniforme sur [-eta/2, eta/2] -> écart-type eta/sqrt(12)
    print("Vicsek : eta_c = 2,9 <-> ecart-type %.2f rad ; Couzin 2002 explore sigma de 0 à 0,2 rad" % (2.9 / math.sqrt(12)))


if __name__ == "__main__":
    check_reid()
    check_misc()
    check_vicsek()

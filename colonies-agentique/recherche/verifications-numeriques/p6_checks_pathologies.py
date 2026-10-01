"""Vérifications numériques des cibles P6 (dossier p6-pathologies). Exécuter : python p6_checks.py"""
import math
import numpy as np

# --- Beekman, Sumpter & Ratnieks 2001 (PNAS 98:9703), éq. 1 et cubique d'équilibre (M2.gif)
def beekman_roots(n, a, b=0.00015, s=10.0):
    c = [b, b*s + a - b*n, s*(1 + a - b*n) - a*n, -a*n*s]
    r = np.roots(c)
    return sorted(x.real for x in r if abs(x.imag) < 1e-9 and 0 <= x.real <= n)

def bistable_range(a):
    ns = [n for n in range(50, 3001) if len(beekman_roots(n, a)) == 3]
    return (min(ns), max(ns)) if ns else None

# --- Pais et al. 2013 (PLoS ONE 8:e73216), éq. 1 avec k=0, gamma=rho=v, alpha=1/v
def pais_sigma_star(v):
    return 4*v**3/(v**2 - 1)**2

def pais_run(vA, vB, sigma, T=200.0, dt=1e-3, psiA=0.0, psiB=0.0):
    for _ in range(int(T/dt)):
        U = 1 - psiA - psiB
        dA = vA*U - psiA/vA + vA*U*psiA - sigma*psiA*psiB
        dB = vB*U - psiB/vB + vB*U*psiB - sigma*psiA*psiB
        psiA += dt*dA; psiB += dt*dB
    return psiA, psiB

# --- Erhard, Franco & Reis 2022 (J Stat Phys), Prop. 2.1 : vitesse limite sur Z
def ant_rw_speed(beta):
    return (1 - math.exp(-beta))/(1 + math.exp(-beta))

# --- Gu et al. 2024 (Agent Smith, ICML), éq. 5-7 : équilibre 1 - 2*gamma/beta
def smith_iter(beta, gamma, c0, T):
    c = c0
    for _ in range(T):
        c = (1 - gamma)*c + beta*c*(1 - c)/2
    return c

if __name__ == "__main__":
    print("Beekman bistable n-range, alpha=0.0045:", bistable_range(0.0045))
    print("Beekman bistable n-range, alpha=0.021 :", bistable_range(0.021))
    for v in (1.5, 2.0, 3.0, 4.0):
        print(f"Pais sigma*(v={v}) = {pais_sigma_star(v):.4f}")
    v = 2.0; s_star = pais_sigma_star(v)
    a, b = pais_run(v, v, 0.0, psiA=0.01, psiB=0.0)
    assert abs(a - b) < 1e-3, (a, b)                     # sigma=0 : interblocage
    a, b = pais_run(v, v, 0.8*s_star, psiA=0.01, psiB=0.0)
    assert abs(a - b) < 1e-3, (a, b)                     # sous sigma* : interblocage
    a, b = pais_run(v, v, 1.5*s_star, psiA=0.01, psiB=0.0)
    assert abs(a - b) > 0.1, (a, b)                      # au-dessus : symétrie brisée
    print(f"Pais v=2, sigma=1.5*sigma*: psiA={a:.3f} psiB={b:.3f}")
    print("Ant RW speed beta=1:", round(ant_rw_speed(1.0), 4))
    assert abs(smith_iter(0.6, 0.1, 1e-3, 2000) - (1 - 2*0.1/0.6)) < 1e-6
    print("checks OK")

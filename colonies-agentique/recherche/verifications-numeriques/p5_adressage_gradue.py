"""Calcul préliminaire de H5.4 / E5.5 (fiche P5) : adressage gradué p des signaux d’rrêt.
Valeur propre lambda = rho*Psi_U - alpha - sigma*(1-p)*Psi_s au point symétrique, et intégration
RK4 ponctuelle pour (gamma, alpha, rho) = (3, 1/3, 3). Exploratoire [I] : à revérifier à la porte A de P5.
Usage : python p5_adressage_gradue.py
"""
import math
g,a,r=3.0,1/3,3.0
def sym(sig,p):
    # symmetric fp: g*U = s*(a - r*U + sig*s), U=1-2s ; solve for s in (0,.5) by bisection
    f=lambda s: g*(1-2*s)-s*(a-r*(1-2*s)+sig*s)
    lo,hi=0.0,0.5
    for _ in range(200):
        m=(lo+hi)/2
        if f(lo)*f(m)<=0: hi=m
        else: lo=m
    return (lo+hi)/2
def lam(sig,p):
    s=sym(sig,p);U=1-2*s
    return r*U-a-sig*(1-p)*s
def rhs(A,B,sig,p):
    U=1-A-B
    IA=sig*(p*B+(1-p)*0.5*(A+B)); IB=sig*(p*A+(1-p)*0.5*(A+B))
    return g*U-A*(a-r*U+IA), g*U-B*(a-r*U+IB)
def integ(sig,p,T=400,dt=0.002):
    A,B=0.01,0.0101
    for _ in range(int(T/dt)):
        k1=rhs(A,B,sig,p);k2=rhs(A+dt/2*k1[0],B+dt/2*k1[1],sig,p)
        k3=rhs(A+dt/2*k2[0],B+dt/2*k2[1],sig,p);k4=rhs(A+dt*k3[0],B+dt*k3[1],sig,p)
        A+=dt/6*(k1[0]+2*k2[0]+2*k3[0]+k4[0]);B+=dt/6*(k1[1]+2*k2[1]+2*k3[1]+k4[1])
    return A,B
print("sigma*(p=1)=",4*a*g*r/(r-a)**2)
for p in (0,0.25,0.5,0.75,0.9,1.0):
    unst=[sg/10 for sg in range(0,2001) if lam(sg/10,p)>0]
    print("p",p,"unstable sigma window:", (min(unst),max(unst)) if unst else None, "n=",len(unst))
# spot-check by integration
for p,sg in ((0.75,2.0),(0.75,10.0),(0.75,50.0),(0.5,5.0),(0.9,10.0),(0.9,100.0)):
    A,B=integ(sg,p)
    print("p",p,"sigma",sg,"lam",round(lam(sg,p),4),"A,B",round(A,4),round(B,4),"|d|",round(abs(A-B),4))

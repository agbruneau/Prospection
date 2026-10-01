# Verification independante: Oliver30 (numerotation Dorigo, coordonnees de stevedower.id.au)
import math, random
P=[(54,67),(54,62),(37,84),(41,94),(2,99),(7,64),(25,62),(22,60),(18,54),(4,50),(13,40),(18,40),(24,42),(25,38),(44,35),(41,26),(45,21),(58,35),(62,32),(82,7),(91,38),(83,46),(71,44),(64,60),(68,58),(83,69),(87,76),(74,78),(71,71),(58,69)]
n=len(P); D=[[math.dist(a,b) for b in P] for a in P]; DI=[[int(d+0.5) for d in r] for r in D]
L=lambda t,M: sum(M[t[i]][t[(i+1)%n]] for i in range(n))
def two_opt(t):
    imp=True
    while imp:
        imp=False
        for i in range(n-1):
            for j in range(i+2,n if i else n-1):
                a,b,c,d=t[i],t[i+1],t[j],t[(j+1)%n]
                if D[a][c]+D[b][d] < D[a][b]+D[c][d]-1e-12:
                    t[i+1:j+1]=reversed(t[i+1:j+1]); imp=True
    return t
random.seed(1); best=None
for _ in range(2000):
    t=list(range(n)); random.shuffle(t); t=two_opt(t)
    if best is None or L(t,D)<L(best,D): best=t[:]
ident=list(range(n))
print('identite reel %.3f entier %d'%(L(ident,D),L(ident,DI)))
print('meilleur 2-opt reel %.3f entier %d'%(L(best,D),L(best,DI)))
assert abs(L(best,D)-423.741)<1e-3 and abs(L(ident,D)-424.635)<1e-3

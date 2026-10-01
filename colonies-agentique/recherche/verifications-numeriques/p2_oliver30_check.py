"""Vérifie la longueur optimale publiée d'Oliver30 (423.741 réelle / 420 entière) par 2-opt multi-départs."""
import math, random
C = [(54,67),(54,62),(37,84),(41,94),(2,99),(7,64),(25,62),(22,60),(18,54),(4,50),(13,40),(18,40),(24,42),(25,38),(44,35),
     (41,26),(45,21),(58,35),(62,32),(82,7),(91,38),(83,46),(71,44),(64,60),(68,58),(83,69),(87,76),(74,78),(71,71),(58,69)]
n = len(C)
D = [[math.dist(a, b) for b in C] for a in C]
DI = [[int(d + 0.5) for d in row] for row in D]  # nint TSPLIB

def length(t, M=D):
    return sum(M[t[i]][t[(i + 1) % n]] for i in range(n))

def two_opt(t):
    improved = True
    while improved:
        improved = False
        for i in range(n - 1):
            for j in range(i + 2, n if i else n - 1):
                a, b, c, d = t[i], t[i + 1], t[j], t[(j + 1) % n]
                if D[a][c] + D[b][d] < D[a][b] + D[c][d] - 1e-12:
                    t[i + 1:j + 1] = reversed(t[i + 1:j + 1]); improved = True
    return t

random.seed(1)
best = None
for _ in range(3000):
    t = list(range(n)); random.shuffle(t)
    t = two_opt(t)
    if best is None or length(t) < length(best):
        best = t[:]
print("best real length", round(length(best), 3), "integer (nint) length of same tour", length(best, DI))
print("tour (1-based)", [c + 1 for c in best])
print("identity order length", round(length(list(range(n))), 3))
assert abs(length(best) - 423.741) < 1e-3, "optimum réel attendu 423.741"

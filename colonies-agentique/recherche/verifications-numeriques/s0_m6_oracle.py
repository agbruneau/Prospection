"""Oracle Python de M6 (Sumpter et Pratt 2009) pour le docking TypeScript contre Python (UC-005, fiche S0 §4.1).
Réutilise run_m6 de x_methodes_checks.py (lecture « r par option »); 1 000 exécutions par cellule, random.Random(7).
Usage : python s0_m6_oracle.py > ../../data/oracles/x-methodes-m6.json"""
import json, math, random, statistics as st
from x_methodes_checks import run_m6

rng = random.Random(7)
cellules = {}
for sync in (False, True):
    for kk in (1, 9):
        res = [run_m6(kk, rng, sync) for _ in range(1000)]
        fx, ts = [x for x, _ in res], [t for _, t in res]
        cellules[f"{'synchrone' if sync else 'sequentiel'}-k{kk}"] = {
            "fractionX": {"estimate": st.mean(fx), "se": st.stdev(fx) / math.sqrt(len(fx))},
            "duree": {"estimate": st.mean(ts), "se": st.stdev(ts) / math.sqrt(len(ts))},
        }
print(json.dumps({"source": "recherche/verifications-numeriques/s0_m6_oracle.py (run_m6 de x_methodes_checks.py)", "runs": 1000, "seed": 7, "cells": cellules}, indent=2, ensure_ascii=False))

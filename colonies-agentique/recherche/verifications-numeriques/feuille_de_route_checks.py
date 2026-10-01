"""Contrôle arithmétique de docs/09-feuille-de-route.md (bibliothèque standard seulement).

Vérifie : sommes de lots des fiches (sections « Effort et dépendances »), cumuls par phase, voie courte,
chaîne amont du bloc Haiku, dates indicatives, écart entre les heures de V0 et les lots « visuels » des fiches.
Les efforts sont des estimations à confirmer, reprises des fiches; ce script ne les valide pas, il recalcule ce que le document en tire.
Exécution : python feuille_de_route_checks.py
"""
import datetime as d
import math

# lots par fiche, en semaines-personne (bas, haut) ; une seule liste quand bas = haut
LOTS = {
    "S0": ([.5, .5, 3.5, 2.5, 1, 1.5, 1, 1, .5], None, 12.0),
    "P1": ([3, 3, 3, 2, 3, 4, 2, 5, 1.5, 2], None, 28.5),
    "P5": ([2, .5, 2, 2.5, 3, 2.5, 3, 3, 4, 1.5, 3], None, 27.0),
    "P8": ([1, 1.5, 1.5, .5, 1, 2, 1, 3.5, 2, 4, 2], None, 20.0),
    "P3": ([2.5, 3, 2, 3, 3, 1, 3.5, 1.5, 1.5], None, 21.0),
    "P4": ([3, 2.5, 3.5, .5, 2.5, 4, 4, 2, 1], None, 23.0),
    "P6": ([2.5, 4, 2, 5, 4, 4, 3, .5], [3.5, 5, 3, 7, 6, 5, 4, 1], (25.0, 34.5)),
    "P9": ([2, 2, 3, 1, 2, 4, 2, 4, 6, 5, 3], None, 34.0),
    "P7": ([5, 5, 5, 2, 2, 2, 5, 4, 4], None, 34.0),
    "P2": ([1.5, 1, 2, 2, 1.5, 1, 2, 1.5, 3, 1, 1.5, 3, 2], None, 23.0),
}
for k, (lo, hi, tot) in LOTS.items():
    got = (sum(lo), sum(hi or lo))
    exp = tot if isinstance(tot, tuple) else (tot, tot)
    assert got == exp, f"{k}: {got} != {exp}"
print("PASS sommes de lots des fiches")

# phases (volets LLM de P6 et de P9 déplacés en phase 3 : efforts des fiches, seulement déplacés)
P6_LLM, P9_AGENT, P9_CONSTR = (4.0, 6.0), 5.0, 5.0
ph0 = 12.0
ph1 = 28.5 + 27.0 + 20.0
ph2 = (21.0 + (34.0 - P9_AGENT) + (25.0 - P6_LLM[0]) + 23.0, 21.0 + (34.0 - P9_AGENT) + (34.5 - P6_LLM[1]) + 23.0)
ph3 = (34.0 + P6_LLM[0] + P9_AGENT + P9_CONSTR, 34.0 + P6_LLM[1] + P9_AGENT + P9_CONSTR)
assert ph1 == 75.5 and ph2 == (94.0, 101.5) and ph3 == (48.0, 50.0)
end2 = (ph0 + ph1 + ph2[0], ph0 + ph1 + ph2[1])
end3 = (end2[0] + ph3[0], end2[1] + ph3[1])
assert ph0 + ph1 == 87.5 and end2 == (181.5, 189.0) and end3 == (229.5, 239.0)
assert (end3[0] + 23.0, end3[1] + 23.0) == (252.5, 262.0)
assert round(end3[0] / 52, 1) == 4.4 and round(end3[1] / 52, 1) == 4.6
print("PASS phases et cumuls")

# voie courte et chaîne amont du bloc Haiku
prerequis = 9.0 + 7.0 + 5.5 + 4.0  # P1 blocs 0-2, P5 tâches 1-4, P3 L0-L1, P8 lots A-C
assert prerequis == 25.5 and 12.0 + prerequis + 34.0 == 71.5 and 12.0 + prerequis + 19.0 == 56.5
assert 12.0 + 9.0 + 7.0 + 5.5 + 4.0 + 14.0 == 51.5
assert sum(LOTS["P1"][0][:3]) == 9.0 and sum(LOTS["P5"][0][:4]) == 7.0
assert sum(LOTS["P3"][0][:2]) == 5.5 and sum(LOTS["P8"][0][:3]) == 4.0 and sum(LOTS["P7"][0][:5]) == 19.0
print("PASS voie courte et chaîne Haiku")

# dates indicatives : 1 sem.-pers. par semaine calendaire, départ le lundi 2026-10-05, fin de semaine le vendredi
debut = d.date(2026, 10, 5)
def fin(c):
    return debut + d.timedelta(days=(math.ceil(c) - 1) * 7 + 4)
for c, iso in [(1, "2026-10-09"), (12, "2026-12-25"), (40.5, "2027-07-16"), (47.5, "2027-09-03"), (67.5, "2028-01-21"),
               (87.5, "2028-06-09"), (108.5, "2028-11-03"), (137.5, "2029-05-25"), (158.5, "2029-10-19"), (166, "2029-12-07"),
               (181.5, "2030-03-29"), (189, "2030-05-17"), (200.5, "2030-08-09"), (208, "2030-09-27"), (215.5, "2030-11-22"),
               (223, "2031-01-10"), (229.5, "2031-02-28"), (239, "2031-05-02"), (252.5, "2031-08-08"), (262, "2031-10-10")]:
    assert fin(c).isoformat() == iso, (c, fin(c))
t0 = d.date(2026, 10, 1)
assert round((d.date(2027, 9, 22) - t0).days / 7) == 51 and round((d.date(2027, 9, 28) - t0).days / 7) == 52
print("PASS dates indicatives")

# V0 : heures par parcours = 24..45 + n pages x 20..36 ; comparaison aux lots « visuels » des fiches (40 h par semaine-personne)
pages = {"P1": 8, "P2": 9, "P3": 10, "P4": 6, "P5": 11, "P6": 8, "P8": 13, "P9": 15}
h = {k: (24 + n * 20, 45 + n * 36) for k, n in pages.items()}
assert sum(n for n in pages.values()) == 80
assert (sum(v[0] for v in h.values()), sum(v[1] for v in h.values())) == (1792, 3240)
visuels = (5 + 3 + 3.5 + 4 + 4 + 4 + 4 + 6, 5 + 3 + 3.5 + 4 + 4 + 5 + 4 + 6)
assert visuels == (33.5, 34.5)
bas, haut = 1792 / 40, 3240 / 40
assert (round(bas - visuels[1], 1), round(haut - visuels[0], 1)) == (10.3, 47.5)
assert (1792 - visuels[1] * 40, 3240 - visuels[0] * 40) == (412, 1900)
print("PASS heures de vulgarisation")
print("checks OK")

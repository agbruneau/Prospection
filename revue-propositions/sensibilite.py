#!/usr/bin/env python3
"""Audit mathématique et analyse de sensibilité de la matrice §2.

Recalcule les scores pondérés des six candidats (A à F) de
`RECOMMANDATION-PROCHAIN-LIVRABLE.md` (§ 2, L85-L92), évalue huit jeux
de poids (dont les six scénarios de référence), calcule les seuils
d'inversion de la 1re place et du duel 2e/3e, et mesure les corrélations
inter-critères (Pearson, p-value exacte à df=4 et Spearman).
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP
import math
import sys
from typing import Sequence

CRITERIA: tuple[str, ...] = ("C1", "C2", "C3", "C4", "C5")

# Notes extraites littéralement de RECOMMANDATION-PROCHAIN-LIVRABLE.md (L87-L92).
CANDIDATE_SCORES: dict[str, tuple[Decimal, ...]] = {
    "A": (Decimal("9.5"), Decimal("9.5"), Decimal("8.8"), Decimal("10.0"), Decimal("9.5")),
    "C": (Decimal("9.2"), Decimal("8.5"), Decimal("7.4"), Decimal("8.0"), Decimal("7.5")),
    "B": (Decimal("8.5"), Decimal("6.8"), Decimal("9.5"), Decimal("8.3"), Decimal("9.2")),
    "D": (Decimal("8.0"), Decimal("7.2"), Decimal("8.0"), Decimal("7.5"), Decimal("7.5")),
    "E": (Decimal("6.5"), Decimal("8.0"), Decimal("7.0"), Decimal("8.5"), Decimal("7.5")),
    "F": (Decimal("8.5"), Decimal("5.5"), Decimal("7.0"), Decimal("6.5"), Decimal("6.0")),
}

PUBLISHED_SCORES: dict[str, Decimal] = {
    "A": Decimal("9.44"),
    "C": Decimal("8.28"),
    "B": Decimal("8.23"),
    "D": Decimal("7.64"),
    "E": Decimal("7.45"),
    "F": Decimal("6.75"),
}

ORIGINAL_WEIGHTS: tuple[Decimal, ...] = (
    Decimal("0.25"),
    Decimal("0.30"),
    Decimal("0.20"),
    Decimal("0.15"),
    Decimal("0.10"),
)


@dataclass(frozen=True)
class WeightScenario:
    """Jeu de poids nommé et normalisé (somme = 1)."""

    code: str
    label: str
    weights: tuple[Decimal, ...]


def round_half_up(value: Decimal, places: str = "0.01") -> Decimal:
    """Arrondit un Decimal selon la règle arithmétique standard (ROUND_HALF_UP)."""
    return value.quantize(Decimal(places), rounding=ROUND_HALF_UP)


def renormalize_with_fixed(
    base_weights: Sequence[Decimal],
    fixed_index: int,
    new_weight: Decimal,
) -> tuple[Decimal, ...]:
    """Fixe un critère à `new_weight` et renormalise les autres proportionnellement."""
    remaining_base = sum(w for i, w in enumerate(base_weights) if i != fixed_index)
    remaining_target = Decimal("1") - new_weight
    return tuple(
        new_weight if i == fixed_index else w * remaining_target / remaining_base
        for i, w in enumerate(base_weights)
    )


def build_scenarios() -> list[WeightScenario]:
    """Construit les 6 scénarios de référence plus 3 stress-tests complémentaires."""
    s_sans_c2_c4 = tuple(
        Decimal("0") if i in (1, 3) else w / Decimal("0.55")
        for i, w in enumerate(ORIGINAL_WEIGHTS)
    )
    # Anti-biais code : C2=15 %, C4=0 %, C3=35 %, C1 et C5 renormalisés (ratio 25:10).
    s_anti_code = (
        Decimal("0.50") * Decimal("0.25") / Decimal("0.35"),
        Decimal("0.15"),
        Decimal("0.35"),
        Decimal("0.00"),
        Decimal("0.50") * Decimal("0.10") / Decimal("0.35"),
    )
    return [
        WeightScenario("S1", "Poids d'origine (25/30/20/15/10)", ORIGINAL_WEIGHTS),
        WeightScenario("S2", "Poids égaux (20/20/20/20/20)", (Decimal("0.20"),) * 5),
        WeightScenario(
            "S3",
            "Urgence 2027 (C3=35%, renorm.)",
            renormalize_with_fixed(ORIGINAL_WEIGHTS, 2, Decimal("0.35")),
        ),
        WeightScenario(
            "S4",
            "Non-redondance (C1=40%, renorm.)",
            renormalize_with_fixed(ORIGINAL_WEIGHTS, 0, Decimal("0.40")),
        ),
        WeightScenario(
            "S5",
            "Faisabilité minimale (C2=15%, renorm.)",
            renormalize_with_fixed(ORIGINAL_WEIGHTS, 1, Decimal("0.15")),
        ),
        WeightScenario(
            "S6",
            "Sans C4 (C4=0%, renorm.)",
            renormalize_with_fixed(ORIGINAL_WEIGHTS, 3, Decimal("0.00")),
        ),
        WeightScenario("S7", "Anti-biais code (C2=15%, C4=0%, C3=35%)", s_anti_code),
        WeightScenario("S8", "Noyau non technique (C2=0%, C4=0%)", s_sans_c2_c4),
        WeightScenario(
            "S9",
            "Stress-test C3=71% (bascule B > A)",
            renormalize_with_fixed(ORIGINAL_WEIGHTS, 2, Decimal("0.71")),
        ),
    ]


def weighted_score(notes: Sequence[Decimal], weights: Sequence[Decimal]) -> Decimal:
    """Calcule la somme pondérée exacte en arithmétique décimale."""
    return sum((n * w for n, w in zip(notes, weights)), start=Decimal("0"))


def rank_candidates(weights: Sequence[Decimal]) -> list[tuple[str, Decimal, Decimal]]:
    """Retourne les candidats triés par score exact décroissant."""
    rows = []
    for name, notes in CANDIDATE_SCORES.items():
        exact = weighted_score(notes, weights)
        rows.append((name, exact, round_half_up(exact, "0.01")))
    rows.sort(key=lambda item: (-item[1], item[0]))
    return rows


def average_ranks(values: Sequence[float]) -> list[float]:
    """Calcule les rangs moyens (gestion des ex aequo pour Spearman)."""
    indexed = sorted((val, idx) for idx, val in enumerate(values))
    result = [0.0] * len(values)
    i = 0
    while i < len(indexed):
        j = i
        while j + 1 < len(indexed) and indexed[j + 1][0] == indexed[i][0]:
            j += 1
        avg_rank = (i + j) / 2.0 + 1.0
        for k in range(i, j + 1):
            result[indexed[k][1]] = avg_rank
        i = j + 1
    return result


def pearson_r(xs: Sequence[float], ys: Sequence[float]) -> float:
    """Coefficient de corrélation linéaire de Pearson."""
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    den = math.sqrt(sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
    return num / den if den > 0 else 0.0


def two_tailed_t_pvalue(r: float, n: int) -> tuple[float, float]:
    """Calcule la statistique t et la p-value bilatérale exacte par Simpson."""
    df = n - 2
    if abs(r) >= 1.0:
        return math.inf, 0.0
    t_stat = r * math.sqrt(df / (1.0 - r * r))
    const = math.gamma((df + 1) / 2.0) / (
        math.sqrt(df * math.pi) * math.gamma(df / 2.0)
    )

    def pdf(x: float) -> float:
        return const * (1.0 + (x * x) / df) ** (-(df + 1) / 2.0)

    steps = 10000
    a, b = -abs(t_stat), abs(t_stat)
    h = (b - a) / steps
    acc = pdf(a) + pdf(b)
    for k in range(1, steps):
        acc += (4.0 if k % 2 == 1 else 2.0) * pdf(a + k * h)
    central_prob = acc * h / 3.0
    return t_stat, max(0.0, 1.0 - central_prob)


def weight_threshold_equalize(
    cand_leader: str,
    cand_challenger: str,
    criterion_idx: int,
) -> Decimal | None:
    """Retourne le poids critique w_k dans [0, 1] égalisant deux candidats."""
    notes_l = CANDIDATE_SCORES[cand_leader]
    notes_c = CANDIDATE_SCORES[cand_challenger]
    d_k = notes_l[criterion_idx] - notes_c[criterion_idx]
    rest_orig = Decimal("1") - ORIGINAL_WEIGHTS[criterion_idx]
    diff_rest_avg = (
        sum(
            ORIGINAL_WEIGHTS[i] * (notes_l[i] - notes_c[i])
            for i in range(5)
            if i != criterion_idx
        )
        / rest_orig
    )
    denom = diff_rest_avg - d_k
    if denom == 0:
        return None
    w_crit = diff_rest_avg / denom
    if Decimal("0") <= w_crit <= Decimal("1"):
        return w_crit
    return None


def print_header(title: str) -> None:
    print()
    print("=" * 78)
    print(title)
    print("=" * 78)


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    # 1. Recalcul exact des 6 scores d'origine
    print_header("1. RECALCUL EXACT DES SCORES D'ORIGINE (POIDS 25/30/20/15/10 %)")
    print(f"{'Cand.':<6} {'C1':>5} {'C2':>5} {'C3':>5} {'C4':>5} {'C5':>5} | {'Exact':>7} {'Arr.2d':>7} {'Publié':>7} {'Écart':>7}")
    print("-" * 78)
    orig_ranked = rank_candidates(ORIGINAL_WEIGHTS)
    for name, exact, rounded in orig_ranked:
        n = CANDIDATE_SCORES[name]
        pub = PUBLISHED_SCORES[name]
        diff = rounded - pub
        print(
            f"{name:<6} {n[0]:>5} {n[1]:>5} {n[2]:>5} {n[3]:>5} {n[4]:>5} | "
            f"{exact:>7.3f} {rounded:>7.2f} {pub:>7.2f} {diff:>+7.2f}"
        )
    gap_ac_exact = orig_ranked[0][1] - orig_ranked[1][1]
    gap_ac_pub = PUBLISHED_SCORES["A"] - PUBLISHED_SCORES["C"]
    gap_cb_exact = orig_ranked[1][1] - orig_ranked[2][1]
    print(f"\nÉcart 1er vs 2e (A - C) : exact = {gap_ac_exact:.3f} pt | publié = {gap_ac_pub:.2f} pt")
    print(f"Écart 2e vs 3e (C - B) : exact = {gap_cb_exact:.3f} pt (inférieur au bruit de 0,1 pt)")

    # 2. Analyse de sensibilité multi-scénarios
    print_header("2. SENSIBILITÉ DES SCORES ET DES RANGS (9 JEUX DE POIDS)")
    scenarios = build_scenarios()
    for sc in scenarios:
        w_pct = " / ".join(f"{(w * 100):.1f}%" for w in sc.weights)
        ranked = rank_candidates(sc.weights)
        order_str = " > ".join(f"{c}({r:.2f})" for c, _, r in ranked)
        gap12 = ranked[0][1] - ranked[1][1]
        print(f"[{sc.code}] {sc.label:<42} | Poids: [{w_pct}]")
        print(f"     Classement : {order_str} | Marge 1er-2e : +{gap12:.3f}")

    # Vérification variante entière d'Urgence 2027 (20/25/35/10/10)
    w_urg_int = (Decimal("0.20"), Decimal("0.25"), Decimal("0.35"), Decimal("0.10"), Decimal("0.10"))
    r_urg_int = rank_candidates(w_urg_int)
    print("[S3-int] Variante entière Urgence 2027 [20/25/35/10/10] => "
          + " > ".join(f"{c}({r:.2f})" for c, _, r in r_urg_int))

    # 3. Analyse de seuil (notes et poids)
    print_header("3. ANALYSE DE SEUIL : PERTE DE LA 1re PLACE PAR A (ET BASCULE 2e/3e)")
    score_a = weighted_score(CANDIDATE_SCORES["A"], ORIGINAL_WEIGHTS)
    score_c = weighted_score(CANDIDATE_SCORES["C"], ORIGINAL_WEIGHTS)
    score_b = weighted_score(CANDIDATE_SCORES["B"], ORIGINAL_WEIGHTS)
    gap_ac = score_a - score_c
    gap_ab = score_a - score_b

    print("A. Seuils sur les NOTES (poids d'origine 25/30/20/15/10 % constants) :")
    drop_c2_a = gap_ac / ORIGINAL_WEIGHTS[1]
    new_c2_a = CANDIDATE_SCORES["A"][1] - drop_c2_a
    print(f"  - Baisse requise de la note C2(A) seule pour égaler C (8,280) : "
          f"-{drop_c2_a:.3f} pt (de 9,50 à {new_c2_a:.3f}/10)")

    drop_c2_a_vs_b = gap_ab / ORIGINAL_WEIGHTS[1]
    print(f"  - Baisse requise de la note C2(A) seule pour égaler B (8,230) : "
          f"-{drop_c2_a_vs_b:.3f} pt (de 9,50 à {CANDIDATE_SCORES['A'][1] - drop_c2_a_vs_b:.3f}/10)")

    rise_c3_b = gap_ab / ORIGINAL_WEIGHTS[2]
    req_c3_b = CANDIDATE_SCORES["B"][2] + rise_c3_b
    max_b_c3_10 = score_b + (Decimal("10.0") - CANDIDATE_SCORES["B"][2]) * ORIGINAL_WEIGHTS[2]
    rise_c3_c = gap_ac / ORIGINAL_WEIGHTS[2]
    req_c3_c = CANDIDATE_SCORES["C"][2] + rise_c3_c
    max_c_c3_10 = score_c + (Decimal("10.0") - CANDIDATE_SCORES["C"][2]) * ORIGINAL_WEIGHTS[2]
    print(f"  - Hausse requise de la note C3(B) seule pour égaler A : "
          f"+{rise_c3_b:.3f} pt (exigerait {req_c3_b:.3f}/10 > plafond 10 ; "
          f"à 10,0/10, B plafonne à {max_b_c3_10:.3f})")
    print(f"  - Hausse requise de la note C3(C) seule pour égaler A : "
          f"+{rise_c3_c:.3f} pt (exigerait {req_c3_c:.3f}/10 > plafond 10 ; "
          f"à 10,0/10, C plafonne à {max_c_c3_10:.3f})")

    drop_c2_c4_a = gap_ac / (ORIGINAL_WEIGHTS[1] + ORIGINAL_WEIGHTS[3])
    print(f"  - Baisse uniforme simultanée de C2(A) et C4(A) (45 % du poids) pour égaler C : "
          f"-{drop_c2_c4_a:.3f} pt chacun (C2 -> {Decimal('9.5') - drop_c2_c4_a:.2f}, "
          f"C4 -> {Decimal('10.0') - drop_c2_c4_a:.2f})")

    drop_c2_c_for_b = (score_c - score_b) / ORIGINAL_WEIGHTS[1]
    rise_c3_b_for_c = (score_c - score_b) / ORIGINAL_WEIGHTS[2]
    print(f"  - Seuil 2e vs 3e : C perd la 2e place si C2(C) baisse de -{drop_c2_c_for_b:.3f} pt "
          f"OU si C3(B) monte de +{rise_c3_b_for_c:.3f} pt.")

    print("\nB. Seuils sur les POIDS (notes d'origine constantes, renormalisation proportionnelle) :")
    w2_ab = weight_threshold_equalize("A", "B", 1)
    w2_ac = weight_threshold_equalize("A", "C", 1)
    w3_ab = weight_threshold_equalize("A", "B", 2)
    w3_ac = weight_threshold_equalize("A", "C", 2)
    w3_cb = weight_threshold_equalize("C", "B", 2)
    w2_cb = weight_threshold_equalize("C", "B", 1)

    print(f"  - Baisse du poids w_C2 seul (0 % à 100 %) : A vs B -> {w2_ab}, A vs C -> {w2_ac} "
          "(aucune baisse de w_C2 ne déloge A ; à w_C2=0%, A=9,407 > B=8,843)")
    if w3_ab is not None:
        delta_w3 = (w3_ab - ORIGINAL_WEIGHTS[2]) * 100
        print(f"  - Hausse du poids w_C3 seul pour que B égale A : "
              f"w_C3 = {w3_ab * 100:.2f}% (+{delta_w3:.2f} pp vs 20,00%) ; A vs C -> {w3_ac}")
    if w3_cb is not None and w2_cb is not None:
        print(f"  - Bascule 2e/3e (B dépasse C) : dès w_C3 > {w3_cb * 100:.2f}% "
              f"(+{(w3_cb - ORIGINAL_WEIGHTS[2]) * 100:.2f} pp) "
              f"OU w_C2 < {w2_cb * 100:.2f}% ({(w2_cb - ORIGINAL_WEIGHTS[1]) * 100:.2f} pp)")

    # 4. Corrélations inter-critères et dominance
    print_header("4. CORRÉLATIONS INTER-CRITÈRES ET STRUCTURE DE DOMINANCE (n = 6)")
    keys = ["A", "C", "B", "D", "E", "F"]
    cols = [[float(CANDIDATE_SCORES[k][i]) for k in keys] for i in range(5)]

    print("Statistiques descriptives et contribution à la variance du score :")
    scores_orig = [float(weighted_score(CANDIDATE_SCORES[k], ORIGINAL_WEIGHTS)) for k in keys]
    mean_s = sum(scores_orig) / len(scores_orig)
    var_s = sum((s - mean_s) ** 2 for s in scores_orig) / (len(scores_orig) - 1)
    for i, crit in enumerate(CRITERIA):
        w_f = float(ORIGINAL_WEIGHTS[i])
        mean_v = sum(cols[i]) / len(cols[i])
        std_v = math.sqrt(sum((x - mean_v) ** 2 for x in cols[i]) / (len(cols[i]) - 1))
        cov_cs = sum((cols[i][j] - mean_v) * (scores_orig[j] - mean_s) for j in range(len(keys))) / (len(keys) - 1)
        var_share = (w_f * cov_cs / var_s) * 100.0
        print(
            f"  {crit} (w={int(w_f*100):>2}%) : min={min(cols[i]):.1f}, max={max(cols[i]):.1f}, "
            f"moy={mean_v:.2f}, std={std_v:.2f}, w*std={w_f*std_v:.3f}, part_var={var_share:5.1f}%"
        )

    print("\nCorrélations (Pearson r, R², t(df=4), p-value bilatérale, Spearman rho) :")
    pairs = []
    for i in range(5):
        for j in range(i + 1, 5):
            r = pearson_r(cols[i], cols[j])
            t_val, p_val = two_tailed_t_pvalue(r, len(keys))
            rho = pearson_r(average_ranks(cols[i]), average_ranks(cols[j]))
            pairs.append((abs(r), CRITERIA[i], CRITERIA[j], r, r * r, t_val, p_val, rho))
    pairs.sort(reverse=True)
    for _, ci, cj, r, r2, t_val, p_val, rho in pairs:
        flag = " <-- PLUS FORTE CORRÉLATION" if {ci, cj} == {"C2", "C4"} else ""
        print(f"  {ci}-{cj} : r = {r:+.4f}, R² = {r2*100:5.2f}%, t = {t_val:+.3f}, "
              f"p = {p_val:.4f}, rho = {rho:+.4f}{flag}")

    print("\nDominance de Pareto de A sur les autres candidats :")
    for other in ["C", "B", "D", "E", "F"]:
        diffs = [CANDIDATE_SCORES["A"][i] - CANDIDATE_SCORES[other][i] for i in range(5)]
        dominated = all(d >= 0 for d in diffs)
        diff_str = ", ".join(f"{CRITERIA[i]}:{d:+.1f}" for i, d in enumerate(diffs))
        status = "PARETO-DOMINÉ par A" if dominated else "non dominé (bat A sur C3)"
        print(f"  A vs {other} [{diff_str}] => {status}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())

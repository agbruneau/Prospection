#!/usr/bin/env python3
"""Agrégation quantitative des jurys aveugles et analyse de robustesse (Phase 3).

Lit directement ``notation-jury-1.md`` et ``notation-jury-2.md`` dans le même
répertoire, extrait les notes demi-points M1–M5 des huit options évaluées
(A', A'+, B', C', D', E', F', G') et calcule de façon reproductible
(arithmétique décimale ``Decimal`` ``ROUND_HALF_UP`` et rationnelle ``Fraction``) :
  1. L'accord inter-juges J1 vs J2 (MAE par critère et par candidat, cellules
     avec |J1 - J2| >= 2,0, Spearman rho, Pearson r et Kappa pondéré quadratique).
  2. La matrice consensus (moyenne J1/J2) et les scores/rangs sous les 7
     scénarios P1 à P7.
  3. Les corrélations inter-critères (Pearson r, t, p-value, Spearman rho) avec
     comparaison à r(C2, C4) = +0,8774 de la Phase 1, et la décomposition exacte
     de la variance par critère.
  4. Les seuils exacts (en points et en poids) pour renverser le 1er et le 2e
     rang, ainsi que la comparaison directe A' strict vs A'+ intégré.
"""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction
import math
from pathlib import Path
import re
import sys
from typing import Sequence

CRITERIA: tuple[str, ...] = ("M1", "M2", "M3", "M4", "M5")
CRITERIA_LABELS: dict[str, str] = {
    "M1": "Non-redondance & angle mort",
    "M2": "Faisabilité L+ & bornage (hors CI)",
    "M3": "Impact, urgence 2027 & lectorat",
    "M4": "Vérifiabilité & preuve (neutre)",
    "M5": "Levier corpus & outils Vol. 7",
}
CANDIDATE_ORDER: tuple[str, ...] = ("A'", "A'+", "B'", "C'", "D'", "E'", "F'", "G'")

P1_WEIGHTS: tuple[Decimal, ...] = (
    Decimal("0.25"),
    Decimal("0.25"),
    Decimal("0.25"),
    Decimal("0.15"),
    Decimal("0.10"),
)
P2_WEIGHTS: tuple[Decimal, ...] = (
    Decimal("0.25"),
    Decimal("0.30"),
    Decimal("0.20"),
    Decimal("0.15"),
    Decimal("0.10"),
)
PHASE1_R_C2_C4 = 0.8774
PHASE1_VAR_C2_C4 = 55.3


@dataclass(frozen=True)
class WeightScenario:
    """Jeu de pondérations normalisé (somme exacte = 1)."""

    code: str
    label: str
    weights: tuple[Fraction, ...]


def round_half_up(value: Decimal | Fraction, places: str = "0.01") -> Decimal:
    """Arrondit selon la règle arithmétique standard ``ROUND_HALF_UP``."""
    dec = fraction_to_decimal(value) if isinstance(value, Fraction) else value
    return dec.quantize(Decimal(places), rounding=ROUND_HALF_UP)


def fraction_to_decimal(value: Fraction, prec_digits: int = 18) -> Decimal:
    """Convertit une ``Fraction`` exacte en ``Decimal`` haute précision."""
    scale = 10**prec_digits
    num = (value.numerator * scale) // value.denominator
    rem = (value.numerator * scale) % value.denominator
    if rem * 2 >= value.denominator:
        num += 1
    return Decimal(num) / Decimal(scale)


def decimal_to_fraction(value: Decimal) -> Fraction:
    """Convertit un ``Decimal`` en ``Fraction`` exacte."""
    return Fraction(str(value))


def parse_fr_decimal(raw: str) -> Decimal:
    """Nettoie une cellule Markdown (gras, backticks, virgule) et retourne un Decimal."""
    cleaned = raw.replace("*", "").replace("`", "").strip().replace(",", ".")
    return Decimal(cleaned)


def parse_jury_table(
    path: Path,
    expect_indicative_p1: bool = False,
) -> tuple[dict[str, tuple[Decimal, ...]], dict[str, Decimal]]:
    """Extrait les notes M1–M5 des 8 options depuis un fichier de notation Markdown."""
    text = path.read_text(encoding="utf-8")
    scores: dict[str, tuple[Decimal, ...]] = {}
    indicative_p1: dict[str, Decimal] = {}
    row_re = re.compile(r"^\|\s*\*\*`?(A'\+|A'|B'|C'|D'|E'|F'|G')`?[^|]*\|(.+)$")

    for line in text.splitlines():
        match = row_re.match(line.strip())
        if not match:
            continue
        cand = match.group(1)
        cells = [c.strip() for c in match.group(2).split("|") if c.strip()]
        if expect_indicative_p1:
            if len(cells) < 6:
                raise ValueError(f"{path.name}: ligne {cand} incomplète ({cells})")
            notes = tuple(parse_fr_decimal(cells[i]) for i in range(5))
            indicative_p1[cand] = parse_fr_decimal(cells[5])
        else:
            if len(cells) < 5:
                raise ValueError(f"{path.name}: ligne {cand} incomplète ({cells})")
            notes = tuple(parse_fr_decimal(cells[i]) for i in range(5))

        for idx, note in enumerate(notes):
            if not (Decimal("0.0") <= note <= Decimal("10.0")):
                raise ValueError(f"{path.name}: note hors bornes {cand} M{idx+1}={note}")
            if (note * 2) != int(note * 2):
                raise ValueError(f"{path.name}: note non demi-point {cand} M{idx+1}={note}")

        scores[cand] = notes

    missing = [c for c in CANDIDATE_ORDER if c not in scores]
    if missing:
        raise ValueError(f"{path.name}: candidats manquants {missing}")
    return scores, indicative_p1


def weighted_fraction(
    notes: Sequence[Decimal | Fraction],
    weights: Sequence[Decimal | Fraction],
) -> Fraction:
    """Calcule la somme pondérée exacte en arithmétique rationnelle."""
    total = Fraction(0, 1)
    for note, weight in zip(notes, weights):
        n_f = note if isinstance(note, Fraction) else decimal_to_fraction(note)
        w_f = weight if isinstance(weight, Fraction) else decimal_to_fraction(weight)
        total += n_f * w_f
    return total


def renormalize_with_fixed(
    base_weights: Sequence[Decimal],
    fixed_index: int,
    new_weight: Fraction,
) -> tuple[Fraction, ...]:
    """Fixe ``fixed_index`` à ``new_weight`` et renormalise les autres proportionnellement."""
    base_f = [decimal_to_fraction(w) for w in base_weights]
    remaining_base = sum(w for i, w in enumerate(base_f) if i != fixed_index)
    remaining_target = Fraction(1, 1) - new_weight
    return tuple(
        new_weight if i == fixed_index else w * remaining_target / remaining_base
        for i, w in enumerate(base_f)
    )


def build_weight_scenarios() -> list[WeightScenario]:
    """Construit les scénarios P1 à P6 (P7 compare J1 et J2 séparément sous P1)."""
    to_f = lambda seq: tuple(decimal_to_fraction(w) for w in seq)
    return [
        WeightScenario("P1", "Équilibré révisé (25/25/25/15/10)", to_f(P1_WEIGHTS)),
        WeightScenario("P2", "Poids Phase 1 (25/30/20/15/10)", to_f(P2_WEIGHTS)),
        WeightScenario("P3", "Poids égaux (20/20/20/20/20)", (Fraction(1, 5),) * 5),
        WeightScenario(
            "P4",
            "Urgence 2027 (20/20/35/15/10)",
            to_f((Decimal("0.20"), Decimal("0.20"), Decimal("0.35"), Decimal("0.15"), Decimal("0.10"))),
        ),
        WeightScenario(
            "P5",
            "Non-redondance (40/20/20/10/10)",
            to_f((Decimal("0.40"), Decimal("0.20"), Decimal("0.20"), Decimal("0.10"), Decimal("0.10"))),
        ),
        WeightScenario(
            "P6",
            "Sans M4 renorm. depuis P1 (M4=0%)",
            renormalize_with_fixed(P1_WEIGHTS, 3, Fraction(0, 1)),
        ),
    ]


def rank_matrix(
    matrix: dict[str, tuple[Decimal, ...]] | dict[str, tuple[Fraction, ...]],
    weights: Sequence[Fraction],
) -> list[tuple[str, Fraction, Decimal]]:
    """Retourne les candidats triés par score exact décroissant."""
    rows: list[tuple[str, Fraction, Decimal]] = []
    for cand in CANDIDATE_ORDER:
        exact = weighted_fraction(matrix[cand], weights)
        rows.append((cand, exact, round_half_up(exact, "0.01")))
    rows.sort(key=lambda item: (-item[1], CANDIDATE_ORDER.index(item[0])))
    return rows


def average_ranks(values: Sequence[float]) -> list[float]:
    """Attribue les rangs moyens en cas d'ex aequo (calcul de Spearman)."""
    indexed = sorted((val, idx) for idx, val in enumerate(values))
    ranks = [0.0] * len(values)
    i = 0
    while i < len(indexed):
        j = i
        while j + 1 < len(indexed) and indexed[j + 1][0] == indexed[i][0]:
            j += 1
        avg_rank = (i + j) / 2.0 + 1.0
        for k in range(i, j + 1):
            ranks[indexed[k][1]] = avg_rank
        i = j + 1
    return ranks


def pearson_r(xs: Sequence[float], ys: Sequence[float]) -> float:
    """Coefficient de corrélation linéaire de Pearson."""
    mx = sum(xs) / len(xs)
    my = sum(ys) / len(ys)
    num = sum((x - mx) * (y - my) for x, y in zip(xs, ys))
    den = math.sqrt(sum((x - mx) ** 2 for x in xs) * sum((y - my) ** 2 for y in ys))
    return num / den if den > 0.0 else 0.0


def spearman_rho(xs: Sequence[float], ys: Sequence[float]) -> float:
    """Corrélation de rang de Spearman (rangs moyens pour les ex aequo)."""
    return pearson_r(average_ranks(xs), average_ranks(ys))


def two_tailed_t_pvalue(r: float, n: int) -> tuple[float, float]:
    """Statistique t de Student et p-value bilatérale exacte par règle de Simpson."""
    df = n - 2
    if df <= 0:
        return 0.0, 1.0
    if abs(r) >= 1.0:
        return math.inf if r > 0 else -math.inf, 0.0
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
    central = acc * h / 3.0
    return t_stat, max(0.0, 1.0 - central)


def quadratic_weighted_kappa(
    xs: Sequence[Decimal],
    ys: Sequence[Decimal],
) -> tuple[float, float]:
    """Calcule le Kappa pondéré quadratique (grille 0,0..10,0 pas 0,5) et Lin CCC.

    Sur des échelons équidistants, le Kappa quadratique est algébriquement
    identique au coefficient de concordance de Lin (variances de population) ;
    les deux calculs indépendants sont croisés par assertion.
    """
    n = len(xs)
    levels = 21  # 0.0, 0.5, ..., 10.0
    idx_x = [int(x * 2) for x in xs]
    idx_y = [int(y * 2) for y in ys]

    hist_x = [0] * levels
    hist_y = [0] * levels
    obs = [[0] * levels for _ in range(levels)]
    for ix, iy in zip(idx_x, idx_y):
        hist_x[ix] += 1
        hist_y[iy] += 1
        obs[ix][iy] += 1

    max_dist_sq = (levels - 1) ** 2
    num = 0.0
    den = 0.0
    for i in range(levels):
        for j in range(levels):
            w_dis = ((i - j) ** 2) / max_dist_sq
            o_ij = obs[i][j] / n
            e_ij = (hist_x[i] * hist_y[j]) / (n * n)
            num += w_dis * o_ij
            den += w_dis * e_ij
    qwk = 1.0 - (num / den) if den > 0.0 else 1.0

    fx = [float(x) for x in xs]
    fy = [float(y) for y in ys]
    mx = sum(fx) / n
    my = sum(fy) / n
    vx = sum((x - mx) ** 2 for x in fx) / n
    vy = sum((y - my) ** 2 for y in fy) / n
    cov = sum((x - mx) * (y - my) for x, y in zip(fx, fy)) / n
    ccc = (2.0 * cov) / (vx + vy + (mx - my) ** 2)
    assert abs(qwk - ccc) < 1e-12, f"Divergence QWK={qwk} vs CCC={ccc}"
    return qwk, ccc


def weight_threshold_equalize(
    matrix: dict[str, tuple[Fraction, ...]],
    base_weights: Sequence[Decimal],
    cand_a: str,
    cand_b: str,
    criterion_idx: int,
) -> tuple[Fraction | None, str]:
    """Retourne le poids critique w_k dans [0, 1] égalisant ``cand_a`` et ``cand_b``.

    Renormalise les autres poids proportionnellement à ``base_weights``. Indique
    si ``cand_b`` dépasse ``cand_a`` au-dessus (``>``) ou au-dessous (``<``) du seuil.
    """
    base_f = [decimal_to_fraction(w) for w in base_weights]
    notes_a = matrix[cand_a]
    notes_b = matrix[cand_b]
    d_k = notes_a[criterion_idx] - notes_b[criterion_idx]
    rest_base = Fraction(1, 1) - base_f[criterion_idx]
    diff_rest = (
        sum(
            (base_f[i] * (notes_a[i] - notes_b[i]) for i in range(5) if i != criterion_idx),
            start=Fraction(0, 1),
        )
        / rest_base
    )
    # Différence score_A(w_k) - score_B(w_k) = w_k * d_k + (1 - w_k) * diff_rest
    slope = d_k - diff_rest
    if slope == 0:
        return None, "pente nulle"
    w_crit = -diff_rest / slope
    if Fraction(0, 1) <= w_crit <= Fraction(1, 1):
        w_test = renormalize_with_fixed(base_weights, criterion_idx, w_crit)
        assert weighted_fraction(notes_a, w_test) == weighted_fraction(notes_b, w_test)
        direction = f"{cand_b} > {cand_a} si w <" if slope > 0 else f"{cand_b} > {cand_a} si w >"
        return w_crit, direction
    return None, "hors [0, 1]"


def format_ranked_order(ranked: Sequence[tuple[str, Fraction, Decimal]]) -> str:
    """Formate l'ordre complet des candidats en marquant ``=`` en cas d'ex aequo exact."""
    parts: list[str] = []
    for idx, (cand, exact, rounded) in enumerate(ranked):
        token = f"{cand}({rounded:.2f})"
        if idx == 0:
            parts.append(token)
        else:
            sep = " = " if exact == ranked[idx - 1][1] else " > "
            parts.append(sep + token)
    return "".join(parts)


def dense_rank_labels(ranked: Sequence[tuple[str, Fraction, Decimal]]) -> dict[str, str]:
    """Retourne le rang de chaque candidat (avec suffixe ``=`` si ex aequo exact)."""
    counts: dict[Fraction, int] = {}
    for _, exact, _ in ranked:
        counts[exact] = counts.get(exact, 0) + 1
    ranks: dict[str, str] = {}
    current_pos = 1
    for idx, (cand, exact, _) in enumerate(ranked):
        if idx > 0 and exact != ranked[idx - 1][1]:
            current_pos = idx + 1
        ranks[cand] = f"{current_pos}=" if counts[exact] > 1 else str(current_pos)
    return ranks


def print_header(title: str) -> None:
    print()
    print("=" * 84)
    print(title)
    print("=" * 84)


def run_analysis(base_dir: Path | None = None) -> int:
    """Exécute l'analyse complète et affiche le rapport structuré sur stdout."""
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")

    root = base_dir or Path(__file__).resolve().parent
    j1_path = root / "notation-jury-1.md"
    j2_path = root / "notation-jury-2.md"

    j1_scores, _ = parse_jury_table(j1_path, expect_indicative_p1=False)
    j2_scores, j2_indicative_p1 = parse_jury_table(j2_path, expect_indicative_p1=True)

    # Contrôle d'intégrité sur la colonne P1 indicative de notation-jury-2.md
    p1_frac = tuple(decimal_to_fraction(w) for w in P1_WEIGHTS)
    for cand in CANDIDATE_ORDER:
        recalc_j2 = round_half_up(weighted_fraction(j2_scores[cand], p1_frac), "0.001")
        if recalc_j2 != j2_indicative_p1[cand]:
            raise AssertionError(
                f"Écart P1 J2 pour {cand}: calculé {recalc_j2} != publié {j2_indicative_p1[cand]}"
            )

    consensus_frac: dict[str, tuple[Fraction, ...]] = {
        cand: tuple(
            (decimal_to_fraction(j1_scores[cand][i]) + decimal_to_fraction(j2_scores[cand][i])) / 2
            for i in range(5)
        )
        for cand in CANDIDATE_ORDER
    }

    # ------------------------------------------------------------------
    # 0. EXTRACTION ET MATRICE CONSENSUS
    # ------------------------------------------------------------------
    print_header("0. EXTRACTION VERIFIEE (J1, J2) ET MATRICE CONSENSUS (MOYENNE J1/J2)")
    print("Sources : notation-jury-1.md (J1) & notation-jury-2.md (J2) | 8 options x 5 critères = 40 cellules/jury")
    print("Contrôle J2 P1 indicatif (colonne publiee vs recalcul exact 3 dec.) : 8/8 concordances exactes.")
    print()
    print(f"{'Option':<6} | {'J1 (M1..M5)':<27} | {'J2 (M1..M5)':<27} | {'Consensus (M1..M5)':<32}")
    print("-" * 102)
    for cand in CANDIDATE_ORDER:
        j1_s = " ".join(f"{v:4.1f}" for v in j1_scores[cand])
        j2_s = " ".join(f"{v:4.1f}" for v in j2_scores[cand])
        c_s = " ".join(f"{fraction_to_decimal(v):5.2f}" for v in consensus_frac[cand])
        print(f"{cand:<6} | {j1_s}   | {j2_s}   | {c_s}")

    # ------------------------------------------------------------------
    # 1. ACCORD INTER-JUGES J1 VS J2
    # ------------------------------------------------------------------
    print_header("1. ACCORD INTER-JUGES J1 VS J2 (40 CELLULES & SCORES P1)")
    all_j1: list[Decimal] = []
    all_j2: list[Decimal] = []
    diffs_abs: list[Decimal] = []
    diffs_signed: list[Decimal] = []
    large_diffs: list[tuple[str, str, Decimal, Decimal, Decimal]] = []

    for cand in CANDIDATE_ORDER:
        for i, crit in enumerate(CRITERIA):
            v1 = j1_scores[cand][i]
            v2 = j2_scores[cand][i]
            all_j1.append(v1)
            all_j2.append(v2)
            diff = v1 - v2
            adiff = abs(diff)
            diffs_signed.append(diff)
            diffs_abs.append(adiff)
            if adiff >= Decimal("2.0"):
                large_diffs.append((cand, crit, v1, v2, diff))

    mae_global = sum(diffs_abs) / Decimal(len(diffs_abs))
    bias_global = sum(diffs_signed) / Decimal(len(diffs_signed))
    rmse_global = math.sqrt(sum(float(d) ** 2 for d in diffs_signed) / len(diffs_signed))
    exact_eq = sum(1 for d in diffs_abs if d == 0)
    within_half = sum(1 for d in diffs_abs if d <= Decimal("0.5"))
    within_one = sum(1 for d in diffs_abs if d <= Decimal("1.0"))
    max_adiff = max(diffs_abs)

    print("Synthese globale sur 40 cellules :")
    print(f"  - MAE global (|J1 - J2|)        = {mae_global:.4f} pt (arr. {round_half_up(mae_global, '0.01')})")
    print(f"  - Biais moyen signe (J1 - J2)   = {bias_global:+.4f} pt")
    print(f"  - RMSE                          = {rmse_global:.4f} pt | Ecart max = {max_adiff:.1f} pt")
    print(f"  - Distribution |J1 - J2|        : 0,0={exact_eq}/40 ({exact_eq*100/40:.1f}%), "
          f"<=0,5={within_half}/40 ({within_half*100/40:.1f}%), "
          f"<=1,0={within_one}/40 ({within_one*100/40:.1f}%), >=2,0={len(large_diffs)}/40")

    print("\nMAE par critere (sur 8 candidats) :")
    for i, crit in enumerate(CRITERIA):
        c_diffs = [j1_scores[c][i] - j2_scores[c][i] for c in CANDIDATE_ORDER]
        c_mae = sum(abs(d) for d in c_diffs) / Decimal(len(CANDIDATE_ORDER))
        c_bias = sum(c_diffs) / Decimal(len(CANDIDATE_ORDER))
        c_max = max(abs(d) for d in c_diffs)
        c_rho = spearman_rho(
            [float(j1_scores[c][i]) for c in CANDIDATE_ORDER],
            [float(j2_scores[c][i]) for c in CANDIDATE_ORDER],
        )
        print(f"  - {crit} ({CRITERIA_LABELS[crit]:<32}) : MAE = {c_mae:.4f} | biais = {c_bias:+.4f} | max = {c_max:.1f} | rho_rang = {c_rho:+.4f}")

    print("\nMAE par candidat (sur 5 criteres) :")
    for cand in CANDIDATE_ORDER:
        k_diffs = [j1_scores[cand][i] - j2_scores[cand][i] for i in range(5)]
        k_mae = sum(abs(d) for d in k_diffs) / Decimal(5)
        k_bias = sum(k_diffs) / Decimal(5)
        k_max = max(abs(d) for d in k_diffs)
        print(f"  - {cand:<4} : MAE = {k_mae:.4f} | biais = {k_bias:+.4f} | max = {k_max:.1f}")

    print("\nCellules avec |J1 - J2| >= 2,0 :")
    if large_diffs:
        for cand, crit, v1, v2, diff in large_diffs:
            print(f"  - ({cand}, {crit}) : J1={v1:.1f}, J2={v2:.1f}, J1-J2={diff:+.1f} (|ecart|={abs(diff):.1f})")
    else:
        print("  - Aucune.")

    # Corrélations et accord quadratique pondéré
    f_j1_cells = [float(x) for x in all_j1]
    f_j2_cells = [float(x) for x in all_j2]
    r_cells = pearson_r(f_j1_cells, f_j2_cells)
    t_rc, p_rc = two_tailed_t_pvalue(r_cells, len(f_j1_cells))
    rho_cells = spearman_rho(f_j1_cells, f_j2_cells)
    qwk, ccc = quadratic_weighted_kappa(all_j1, all_j2)

    j1_p1_scores = [float(fraction_to_decimal(weighted_fraction(j1_scores[c], p1_frac))) for c in CANDIDATE_ORDER]
    j2_p1_scores = [float(fraction_to_decimal(weighted_fraction(j2_scores[c], p1_frac))) for c in CANDIDATE_ORDER]
    rho_p1 = spearman_rho(j1_p1_scores, j2_p1_scores)
    r_p1 = pearson_r(j1_p1_scores, j2_p1_scores)
    t_rp1, p_rp1 = two_tailed_t_pvalue(r_p1, len(CANDIDATE_ORDER))

    print("\nCorrelations et accord quadratique pondere J1 vs J2 :")
    print(f"  - Sur 40 notes cellulaires : Pearson r = {r_cells:+.4f} (t={t_rc:+.3f}, p={p_rc:.6f}), Spearman rho = {rho_cells:+.4f}")
    print(f"  - Accord quadratique pondere (40 cellules, echelle 0..10 pas 0,5) : Kappa_w = {qwk:+.4f} (Lin CCC = {ccc:+.4f})")
    print(f"  - Sur 8 scores P1 (25/25/25/15/10) : Spearman rho = {rho_p1:+.4f}, Pearson r = {r_p1:+.4f} (t={t_rp1:+.3f}, p={p_rp1:.6f})")

    # ------------------------------------------------------------------
    # 2. MATRICE CONSENSUS ET 7 SCÉNARIOS P1–P7
    # ------------------------------------------------------------------
    print_header("2. MATRICE CONSENSUS ET SCORES/RANGS SOUS 7 SCENARIOS (P1–P7)")
    scenarios = build_weight_scenarios()

    print("Scores detailles sous P1 (25/25/25/15/10) :")
    print(f"{'Rang':<4} {'Opt.':<5} {'M1':>5} {'M2':>5} {'M3':>5} {'M4':>5} {'M5':>5} | {'Cons.Exact':>10} {'Arr.2d':>7} | {'J1 P1':>7} {'J2 P1':>7} {'J1-J2':>7}")
    print("-" * 92)
    p1_ranked = rank_matrix(consensus_frac, scenarios[0].weights)
    for pos, (cand, exact, rounded) in enumerate(p1_ranked, start=1):
        notes_c = " ".join(f"{fraction_to_decimal(v):5.2f}" for v in consensus_frac[cand])
        s_j1 = fraction_to_decimal(weighted_fraction(j1_scores[cand], p1_frac))
        s_j2 = fraction_to_decimal(weighted_fraction(j2_scores[cand], p1_frac))
        print(
            f"{pos:<4} {cand:<5} {notes_c} | "
            f"{fraction_to_decimal(exact):>10.4f} {rounded:>7.2f} | "
            f"{s_j1:>7.3f} {s_j2:>7.3f} {s_j1 - s_j2:>+7.3f}"
        )

    print("\nTableau synthetique P1–P7 (scores arrondis 2 dec., ordres complets et marges exactes) :")
    scenario_runs: list[tuple[str, str, list[tuple[str, Fraction, Decimal]]]] = []
    for sc in scenarios:
        ranked = rank_matrix(consensus_frac, sc.weights)
        scenario_runs.append((sc.code, sc.label, ranked))
    j1_only_ranked = rank_matrix({c: tuple(decimal_to_fraction(x) for x in j1_scores[c]) for c in CANDIDATE_ORDER}, p1_frac)
    j2_only_ranked = rank_matrix({c: tuple(decimal_to_fraction(x) for x in j2_scores[c]) for c in CANDIDATE_ORDER}, p1_frac)
    scenario_runs.append(("P7-J1", "Jury 1 seul sous P1 (25/25/25/15/10)", j1_only_ranked))
    scenario_runs.append(("P7-J2", "Jury 2 seul sous P1 (25/25/25/15/10)", j2_only_ranked))

    scenario_weights_str: dict[str, str] = {}
    for sc in scenarios:
        scenario_weights_str[sc.code] = " / ".join(
            f"{fraction_to_decimal(w) * 100:.1f}%" for w in sc.weights
        )
    p1_w_str = scenario_weights_str["P1"]
    scenario_weights_str["P7-J1"] = p1_w_str
    scenario_weights_str["P7-J2"] = p1_w_str

    for code, label, ranked in scenario_runs:
        score_map = {c: exact for c, exact, _ in ranked}
        order_str = format_ranked_order(ranked)
        gap_12 = fraction_to_decimal(ranked[0][1] - ranked[1][1])
        a_min_vs_b = fraction_to_decimal(min(score_map["A'"], score_map["A'+"]) - score_map["B'"])
        b_vs_c = fraction_to_decimal(score_map["B'"] - score_map["C'"])
        print(f"[{code:<5}] {label:<38} | Poids: [{scenario_weights_str[code]}]")
        print(f"        Ordre : {order_str}")
        print(f"        Marges : 1er-2e = +{gap_12:.4f} | min(A',A'+)-B' = +{a_min_vs_b:.4f} | B'-C' = +{b_vs_c:.4f}")

    print("\nSynthese des rangs (1..8) a travers les 8 lectures P1–P7 :")
    rank_maps = [(code, dense_rank_labels(ranked)) for code, _, ranked in scenario_runs]
    header_ranks = " ".join(f"{code:>6}" for code, _ in rank_maps)
    print(f"{'Opt.':<5} | {header_ranks}")
    print("-" * (8 + 7 * len(rank_maps)))
    for cand in [c for c, _, _ in p1_ranked]:
        row_r = " ".join(f"{rmap[cand]:>6}" for _, rmap in rank_maps)
        print(f"{cand:<5} | {row_r}")

    # ------------------------------------------------------------------
    # 3. CORRÉLATIONS M1–M5 ET DÉCOMPOSITION DE VARIANCE
    # ------------------------------------------------------------------
    print_header("3. CORRELATIONS INTER-CRITERES M1–M5 ET DECOMPOSITION DE VARIANCE")
    cons_float_cols = [
        [float(fraction_to_decimal(consensus_frac[c][i])) for c in CANDIDATE_ORDER]
        for i in range(5)
    ]

    for sc_name, w_vec in [("P1 (25/25/25/15/10)", P1_WEIGHTS), ("P2 Phase 1 (25/30/20/15/10)", P2_WEIGHTS)]:
        w_f_vec = [decimal_to_fraction(w) for w in w_vec]
        scores_vec = [float(fraction_to_decimal(weighted_fraction(consensus_frac[c], w_f_vec))) for c in CANDIDATE_ORDER]
        mean_s = sum(scores_vec) / len(scores_vec)
        var_s = sum((s - mean_s) ** 2 for s in scores_vec) / (len(scores_vec) - 1)
        print(f"\nDecomposition de variance sous {sc_name} (n = 8, var(S) = {var_s:.5f}) :")
        var_shares: dict[str, float] = {}
        for i, crit in enumerate(CRITERIA):
            w_float = float(w_vec[i])
            col = cons_float_cols[i]
            mean_v = sum(col) / len(col)
            std_v = math.sqrt(sum((x - mean_v) ** 2 for x in col) / (len(col) - 1))
            cov_cs = sum((col[j] - mean_v) * (scores_vec[j] - mean_s) for j in range(len(CANDIDATE_ORDER))) / (len(CANDIDATE_ORDER) - 1)
            part_var = (w_float * cov_cs / var_s) * 100.0
            var_shares[crit] = part_var
            print(
                f"  {crit} (w={int(w_float*100):>2}%) : min={min(col):.2f}, max={max(col):.2f}, "
                f"moy={mean_v:.3f}, std={std_v:.3f}, w*std={w_float*std_v:.4f}, part_var={part_var:5.1f}%"
            )
        assert abs(sum(var_shares.values()) - 100.0) < 1e-9
        print(f"  -> Somme bloc (M2+M4) = {var_shares['M2'] + var_shares['M4']:.1f}% (vs Phase 1 : {PHASE1_VAR_C2_C4:.1f}%)")

    print("\nCorrelations inter-criteres sur matrice consensus (n = 8, df = 6) :")
    pairs = []
    for i in range(5):
        for j in range(i + 1, 5):
            r = pearson_r(cons_float_cols[i], cons_float_cols[j])
            t_val, p_val = two_tailed_t_pvalue(r, len(CANDIDATE_ORDER))
            rho = spearman_rho(cons_float_cols[i], cons_float_cols[j])
            pairs.append((abs(r), CRITERIA[i], CRITERIA[j], r, r * r, t_val, p_val, rho))
    pairs.sort(reverse=True)
    for _, ci, cj, r, r2, t_val, p_val, rho in pairs:
        if {ci, cj} == {"M2", "M4"}:
            tag = f" <-- vs Phase 1 r(C2,C4)=+{PHASE1_R_C2_C4:.4f} (ecart {r - PHASE1_R_C2_C4:+.4f})"
        else:
            tag = ""
        print(f"  {ci}-{cj} : r = {r:+.4f}, R2 = {r2*100:5.2f}%, t = {t_val:+.3f}, p = {p_val:.4f}, rho = {rho:+.4f}{tag}")

    # Vérification de sensibilité sur les 7 propositions distinctes (hors A'+)
    distinct_7 = [c for c in CANDIDATE_ORDER if c != "A'+"]
    col_m2_7 = [float(fraction_to_decimal(consensus_frac[c][1])) for c in distinct_7]
    col_m4_7 = [float(fraction_to_decimal(consensus_frac[c][3])) for c in distinct_7]
    r_m2_m4_7 = pearson_r(col_m2_7, col_m4_7)
    t_7, p_7 = two_tailed_t_pvalue(r_m2_m4_7, 7)
    rho_7 = spearman_rho(col_m2_7, col_m4_7)
    print(f"  [Controle n=7 propositions distinctes hors A'+] M2-M4 : r = {r_m2_m4_7:+.4f}, t(df=5) = {t_7:+.3f}, p = {p_7:.4f}, rho = {rho_7:+.4f}")

    print("\nStructure de dominance de Pareto de A' et A'+ (consensus) :")
    for leader in ("A'", "A'+"):
        for other in CANDIDATE_ORDER:
            if other == leader:
                continue
            diffs = [consensus_frac[leader][i] - consensus_frac[other][i] for i in range(5)]
            dom = all(d >= 0 for d in diffs)
            diff_str = ", ".join(f"{CRITERIA[i]}:{float(fraction_to_decimal(d)):+.2f}" for i, d in enumerate(diffs))
            status = f"PARETO-DOMINE par {leader}" if dom else "non domine"
            print(f"  {leader:<3} vs {other:<3} [{diff_str}] => {status}")

    # ------------------------------------------------------------------
    # 4. SEUILS EXACTS ET COMPARAISON DIRECTE A' STRICT VS A'+ INTÉGRÉ
    # ------------------------------------------------------------------
    print_header("4. SEUILS EXACTS (POIDS & POINTS) ET COMPARAISON A' VS A'+")
    p1_scores = {c: weighted_fraction(consensus_frac[c], p1_frac) for c in CANDIDATE_ORDER}

    duels = [
        ("A'", "A'+", "1er vs 2e (8 options — arbitrage interne A' vs A'+)"),
        ("A'", "B'", "1er rang A' vs 1er challenger externe B'"),
        ("A'+", "B'", "2e rang A'+ (ou 1er si A'+ retenu) vs challenger B'"),
        ("B'", "C'", "3e vs 4e (2e vs 3e proposition distincte)"),
    ]

    print("A. Seuils exacts en POINTS sur la matrice consensus (poids P1 = 25/25/25/15/10 constants) :")
    for leader, challenger, desc in duels:
        gap = p1_scores[leader] - p1_scores[challenger]
        gap_dec = fraction_to_decimal(gap)
        print(f"\n  [{desc}] : {leader} ({fraction_to_decimal(p1_scores[leader]):.4f}) - {challenger} ({fraction_to_decimal(p1_scores[challenger]):.4f}) = +{gap_dec:.4f} pt")
        for i, crit in enumerate(CRITERIA):
            w_i = decimal_to_fraction(P1_WEIGHTS[i])
            delta_pts = gap / w_i
            new_l = consensus_frac[leader][i] - delta_pts
            new_c = consensus_frac[challenger][i] + delta_pts
            feas_l = "possible" if Fraction(0, 1) <= new_l <= Fraction(10, 1) else "> borne 0"
            feas_c = "possible" if Fraction(0, 1) <= new_c <= Fraction(10, 1) else "> plafond 10"
            print(
                f"    - {crit} (w={int(P1_WEIGHTS[i]*100):>2}%) : seuil = {fraction_to_decimal(delta_pts):.4f} pt | "
                f"{leader}->{fraction_to_decimal(new_l):.3f} ({feas_l}) ou {challenger}->{fraction_to_decimal(new_c):.3f} ({feas_c})"
            )
        w_m2_m4 = decimal_to_fraction(P1_WEIGHTS[1] + P1_WEIGHTS[3])
        drop_24 = gap / w_m2_m4
        print(
            f"    - Bloc (M2+M4, 40%) uniforme sur {leader} : -{fraction_to_decimal(drop_24):.4f} pt chacun "
            f"(M2->{fraction_to_decimal(consensus_frac[leader][1] - drop_24):.3f}, M4->{fraction_to_decimal(consensus_frac[leader][3] - drop_24):.3f})"
        )

    print("\nB. Seuils exacts en POIDS depuis P1 (notes consensus constantes, renormalisation proportionnelle) :")
    for leader, challenger, desc in duels:
        print(f"\n  [{desc}] :")
        for i, crit in enumerate(CRITERIA):
            w_crit, direction = weight_threshold_equalize(consensus_frac, P1_WEIGHTS, leader, challenger, i)
            if w_crit is not None:
                pp = (fraction_to_decimal(w_crit) - P1_WEIGHTS[i]) * 100
                print(
                    f"    - {crit} (base {P1_WEIGHTS[i]*100:.1f}%) : seuil exact = {w_crit} = "
                    f"{fraction_to_decimal(w_crit)*100:.2f}% ({pp:+.2f} pp) => {direction}"
                )
            else:
                print(f"    - {crit} (base {P1_WEIGHTS[i]*100:.1f}%) : aucun seuil dans [0%, 100%] ({direction})")

    print("\nC. Comparaison directe critere par critere : A' (MVP strict) vs A'+ (MVP enrichi 2027) :")
    header_c = (
        f"{'Crit.':<5} {'Poids P1':>8} | "
        " A' J1  A' J2 A' Cons | A'+ J1 A'+ J2 A'+ Cons | Delta(A'-A'+) Contrib. P1"
    )
    print(header_c)
    print("-" * 102)
    gain_a_strict = Fraction(0, 1)
    gain_a_plus = Fraction(0, 1)
    for i, crit in enumerate(CRITERIA):
        c_a = consensus_frac["A'"][i]
        c_ap = consensus_frac["A'+"][i]
        j1_a = j1_scores["A'"][i]
        j2_a = j2_scores["A'"][i]
        j1_ap = j1_scores["A'+"][i]
        j2_ap = j2_scores["A'+"][i]
        delta = c_a - c_ap
        contrib = delta * p1_frac[i]
        if contrib > 0:
            gain_a_strict += contrib
        elif contrib < 0:
            gain_a_plus += -contrib
        print(
            f"{crit:<5} {P1_WEIGHTS[i]*100:>7.0f}% | "
            f"{j1_a:>6.1f} {j2_a:>6.1f} {fraction_to_decimal(c_a):>7.2f} | "
            f"{j1_ap:>6.1f} {j2_ap:>6.1f} {fraction_to_decimal(c_ap):>8.2f} | "
            f"{fraction_to_decimal(delta):>+13.2f} {fraction_to_decimal(contrib):>+11.4f}"
        )
    net_a = gain_a_strict - gain_a_plus
    print("-" * 102)
    print(f"Bilan P1 : avantage A' (M2+M4) = +{fraction_to_decimal(gain_a_strict):.4f} pt | "
          f"avantage A'+ (M1+M3+M5) = +{fraction_to_decimal(gain_a_plus):.4f} pt | "
          f"Solde net (A' - A'+) = {fraction_to_decimal(net_a):+.4f} pt")

    print("\nVictoires par scenario entre A' et A'+ :")
    for code, _, ranked in scenario_runs:
        smap = {c: exact for c, exact, _ in ranked}
        sa = fraction_to_decimal(smap["A'"])
        sap = fraction_to_decimal(smap["A'+"])
        diff = smap["A'"] - smap["A'+"]
        winner = "A'" if diff > 0 else ("A'+" if diff < 0 else "ex aequo")
        print(f"  - {code:<5} : A'={sa:.4f} vs A'+={sap:.4f} => vainqueur {winner:<3} (ecart {fraction_to_decimal(diff):+.4f})")

    return 0


def main() -> int:
    return run_analysis()


if __name__ == "__main__":
    raise SystemExit(main())

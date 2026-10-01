// Plans et seuils : quantiles de la loi normale, formules de [Miller 2024] (T0.8 à T0.11), interaction (T0.15),
// seuils de docking de [Axtell et al. 1996] (T0.14). Recoupé par recherche/verifications-numeriques/x_methodes_checks.py.

/** Quantile de la loi normale centrée réduite (algorithme d'Acklam, erreur relative < 1,2e-9). */
export function quantileNormal(p: number): number {
  if (!(p > 0 && p < 1)) throw new Error(`quantileNormal : p dans ]0, 1[ (${p})`)
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.383577518672690e2, -3.066479806614716e1, 2.506628277459239]
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416]
  const bas = 0.02425
  const queue = (q: number) => (((((c[0]! * q + c[1]!) * q + c[2]!) * q + c[3]!) * q + c[4]!) * q + c[5]!) / ((((d[0]! * q + d[1]!) * q + d[2]!) * q + d[3]!) * q + 1)
  if (p < bas) return queue(Math.sqrt(-2 * Math.log(p)))
  if (p > 1 - bas) return -queue(Math.sqrt(-2 * Math.log(1 - p)))
  const q = p - 0.5, r = q * q
  return (((((a[0]! * r + a[1]!) * r + a[2]!) * r + a[3]!) * r + a[4]!) * r + a[5]!) * q / (((((b[0]! * r + b[1]!) * r + b[2]!) * r + b[3]!) * r + b[4]!) * r + 1)
}

const zz = (alpha: number, puissance: number) => quantileNormal(1 - alpha / 2) + quantileNormal(puissance)

/** [Miller 2024], éq. 9 : nombre de questions pour détecter une différence δ, variance des différences ω² (T0.8). */
export const nMiller = (omega2: number, delta: number, alpha = 0.05, puissance = 0.8) => zz(alpha, puissance) ** 2 * omega2 / delta ** 2

/** [Miller 2024], éq. 10 : effet minimal détectable à n questions, K rééchantillonnages par question (T0.9). */
export const mdeMiller = (n: number, K: number, omega2: number, varA: number, varB: number, alpha = 0.05, puissance = 0.8) =>
  zz(alpha, puissance) * Math.sqrt((omega2 + varA / K + varB / K) / n)

/** [Miller 2024], §3.1 : variance de la moyenne à K rééchantillonnages, rapportée à K = 1 (T0.10). */
export const facteurReechantillonnage = (K: number, varEntre: number, varIntra: number) => (varEntre + varIntra / K) / (varEntre + varIntra)

/** Variance d'une différence de deux scores corrélés (ρ) : celle d'une comparaison appariée (T0.11, [Miller 2024] §4.2). */
export const varianceDifference = (varA: number, varB: number, rho: number) => varA + varB - 2 * rho * Math.sqrt(varA * varB)

/** Plan 2 × 2 équilibré, n par cellule, écart-type σ : erreurs-types d'un effet principal et de l'interaction (T0.15, [Gelman 2018]). */
export const seEffetPrincipal = (sigma: number, nCellule: number) => sigma * Math.sqrt(1 / nCellule)
export const seInteraction = (sigma: number, nCellule: number) => sigma * Math.sqrt(4 / nCellule)
/** Facteur sur n pour détecter une interaction égale à `rapport` × l'effet principal, à puissance égale. */
export const facteurNInteraction = (rapport: number) => (2 / rapport) ** 2

/** Seuil de Kolmogorov-Smirnov bilatéral à deux échantillons, approximation asymptotique c(α)·√((n + m)/(nm)) (T0.14). */
export const seuilKS = (n: number, m: number, alpha = 0.05) => Math.sqrt(-Math.log(alpha / 2) / 2) * Math.sqrt((n + m) / (n * m))

/** Valeur critique exacte de U de Mann-Whitney, bilatérale : plus grand u avec P(U ≤ u) ≤ α/2 sous H0 (T0.14). */
export function uCritique(n: number, m: number, alpha = 0.05): number {
  // Nombre d'arrangements de n éléments parmi n + m dont la statistique U vaut u : récurrence sur (n, m).
  const memo = new Map<string, Float64Array>()
  const compte = (a: number, b: number): Float64Array => {
    const cle = `${a},${b}`
    const deja = memo.get(cle)
    if (deja) return deja
    const t = new Float64Array(a * b + 1)
    if (a === 0 || b === 0) t[0] = 1
    else {
      const avec = compte(a - 1, b), sans = compte(a, b - 1)   // le plus grand élément vient du premier échantillon, ou non
      for (let u = 0; u < avec.length; u++) t[u + b] = t[u + b]! + avec[u]!
      for (let u = 0; u < sans.length; u++) t[u] = t[u]! + sans[u]!
    }
    memo.set(cle, t)
    return t
  }
  const t = compte(n, m), total = t.reduce((x, y) => x + y, 0)
  let cumul = 0, u = -1
  while (u + 1 < t.length && (cumul + t[u + 1]!) / total <= alpha / 2) cumul += t[++u]!
  return u
}

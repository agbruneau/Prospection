// Contrôles numériques du document docs/06-metriques-et-typologie.md (régime : production, exemples chiffrés).
// Exécution : node s0_metriques_checks.ts   (Node >= 23.6 exécute le .ts directement; sans dépendance)
// Sortie attendue : une ligne par contrôle, puis « checks OK ». Toute violation lève une exception (code de sortie != 0).
// Les valeurs de p8 (table Sasaki et al. 2013) sont des lectures de figure [I], ±0,01 : on ne contrôle que le calcul.
import assert from "node:assert/strict";

const log2 = (x: number) => Math.log(x) / Math.LN2;
const close = (a: number, b: number, tol: number, msg: string) =>
  assert.ok(Math.abs(a - b) <= tol, `${msg} : ${a} contre ${b} (tol ${tol})`);
const ok = (msg: string, v: string) => console.log(`ok  ${msg} = ${v}`);

// PRNG à graine (mulberry32) : aucune dépendance à Math.random (non semable).
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- fonctions de base ----------
const H = (p: number[]) => -p.filter((x) => x > 0).reduce((s, x) => s + x * log2(x), 0);
const h2 = (e: number) => H([e, 1 - e]);
function erf(x: number) { // Abramowitz-Stegun 7.1.26, erreur < 1,5e-7
  const s = Math.sign(x), t = 1 / (1 + 0.3275911 * Math.abs(x));
  const y = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return s * y;
}
const Phi = (x: number) => 0.5 * (1 + erf(x / Math.SQRT2));
const choose = (n: number, k: number) => { let c = 1; for (let i = 1; i <= k; i++) c = (c * (n - k + i)) / i; return c; };
const maj = (n: number, p: number) => { // majorité stricte, n impair
  let s = 0; for (let k = (n + 1) / 2; k <= n; k++) s += choose(n, k) * p ** k * (1 - p) ** (n - k); return s;
};
function lgamma(x: number): number { // Lanczos (g = 7)
  const c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059,
    12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < 0.5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x);
  x -= 1; let a = c[0]; const t = x + 7.5;
  for (let i = 1; i < 9; i++) a += c[i] / (x + i);
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a);
}

// ---------- 3. R : richesse du signal ----------
// Capacité nominale : L0 (entier 0-9) et L1 (8 secteurs x 4 distances x 4 qualités).
close(log2(10), 3.3219, 1e-4, "L0 bits nominaux");
close(log2(8 * 4 * 4), 7, 1e-12, "L1 bits nominaux");
ok("R_nom L0 / L1", `${log2(10).toFixed(2)} / ${log2(128).toFixed(0)} bits`);
// Borne R_eff <= R_nom / H(W) : L0 face à 8 sites (3 bits) ne contraint pas; face à 16 sites (4 bits) plafonne à 0,83.
close(log2(10) / 3, 1.107, 1e-3, "borne L0 sur 8 sites (non contraignante, > 1)");
close(log2(10) / 4, 0.830, 1e-3, "borne L0 sur 16 sites");
ok("plafond R_eff, L0, 16 sites", (log2(10) / 4).toFixed(3));

// Canal symétrique : secteur correct avec prob. 1-eps, sinon uniforme sur les 7 autres.
const I_sym = (m: number, eps: number) => log2(m) - (h2(eps) + eps * log2(m - 1));
close(I_sym(8, 0.25), 1.4869, 1e-3, "I(M;W) canal symétrique eps=0,25");
close(I_sym(8, 0.25) / 3, 0.4956, 1e-3, "R_eff canal symétrique");
ok("canal symétrique 8 secteurs, eps = 0,25 : I ; R_eff", `${I_sym(8, 0.25).toFixed(3)} bit ; ${(I_sym(8, 0.25) / 3).toFixed(3)}`);

// Erreur angulaire gaussienne (sigma = 15 deg, dans la plage 10-15 deg d'Okada et al. 2014), 8 secteurs de 45 deg.
function sectorDist(sigmaDeg: number) {
  const p = new Array(8).fill(0);
  for (let j = 0; j < 8; j++)
    for (let m = -3; m <= 3; m++) {
      const lo = ((j + 8 * m) - 0.5) * 45, hi = ((j + 8 * m) + 0.5) * 45;
      p[j] += Phi(hi / sigmaDeg) - Phi(lo / sigmaDeg);
    }
  return p;
}
const pd = sectorDist(15);
close(pd.reduce((a, b) => a + b, 0), 1, 1e-6, "somme des secteurs");
close(pd[0], 0.8664, 1e-3, "P(secteur correct), sigma = 15 deg");
const I_dance = log2(8) - H(pd); // canal symétrique par rotation : H(W|M) = H(erreur)
close(I_dance, 2.30, 0.01, "I direction danse (8 secteurs, 15 deg)");
ok("danse 8 secteurs, sigma = 15 deg : P0 ; I ; R_eff", `${pd[0].toFixed(4)} ; ${I_dance.toFixed(3)} bit ; ${(I_dance / 3).toFixed(3)}`);

// Estimateur : information mutuelle « plug-in » et correction par permutation (biais soustrait).
function miPlugin(m: number[], w: number[], km: number, kw: number) {
  const n = m.length, c = new Array(km * kw).fill(0), cm = new Array(km).fill(0), cw = new Array(kw).fill(0);
  for (let i = 0; i < n; i++) { c[m[i] * kw + w[i]]++; cm[m[i]]++; cw[w[i]]++; }
  let I = 0;
  for (let a = 0; a < km; a++) for (let b = 0; b < kw; b++) {
    const x = c[a * kw + b]; if (x > 0) I += (x / n) * log2((x * n) / (cm[a] * cw[b]));
  }
  return I;
}
function miCorrected(m: number[], w: number[], km: number, kw: number, B: number, r: () => number) {
  const raw = miPlugin(m, w, km, kw); let nul = 0; const wp = w.slice();
  for (let b = 0; b < B; b++) {
    for (let i = wp.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [wp[i], wp[j]] = [wp[j], wp[i]]; }
    nul += miPlugin(m, wp, km, kw);
  }
  return { raw, corr: raw - nul / B };
}
{
  const r = rng(20261001), N = 1000, reps = 40;
  let rawInd = 0, corrInd = 0, corrDep = 0;
  for (let k = 0; k < reps; k++) {
    const wI = Array.from({ length: N }, () => Math.floor(r() * 8));
    const mI = Array.from({ length: N }, () => Math.floor(r() * 8)); // indépendant de W : I vraie = 0
    const a = miCorrected(mI, wI, 8, 8, 100, r); rawInd += a.raw; corrInd += a.corr;
    const wD = Array.from({ length: N }, () => Math.floor(r() * 8));
    const mD = wD.map((w) => (r() < 0.75 ? w : (w + 1 + Math.floor(r() * 7)) % 8)); // eps = 0,25
    corrDep += miCorrected(mD, wD, 8, 8, 100, r).corr;
  }
  rawInd /= reps; corrInd /= reps; corrDep /= reps;
  close(rawInd, 49 / (2 * N * Math.LN2), 0.01, "biais plug-in (|M|-1)(|W|-1)/(2N ln2)");
  close(corrInd, 0, 0.01, "biais résiduel sous indépendance");
  close(corrDep, I_sym(8, 0.25), 0.05, "estimation corrigée sous canal bruité (N = 1000)");
  ok("N = 1000, |M| = |W| = 8 : biais plug-in ; biais corrigé ; Î(eps = 0,25)", `${rawInd.toFixed(3)} ; ${corrInd.toFixed(3)} ; ${corrDep.toFixed(3)} (vrai ${I_sym(8, 0.25).toFixed(3)})`);
}

// ---------- 2. Indicateurs C_* ----------
type Act = { actor: string; trig: Record<string, number> }; // trig : part de déclenchement attribuée à chaque émetteur adressé
function cCtrl(acts: Act[]) {
  const s: Record<string, number> = {};
  for (const a of acts) for (const [b, w] of Object.entries(a.trig)) s[b] = (s[b] ?? 0) + w;
  const [who, v] = Object.entries(s).sort((x, y) => y[1] - x[1])[0];
  return { who, c: v / acts.length };
}
{ // orchestré : 1 orchestrateur (o) + 9 ouvriers, 30 tours
  const acts: Act[] = [];
  for (let t = 0; t < 30; t++) {
    acts.push({ actor: "o", trig: Object.fromEntries(Array.from({ length: 9 }, (_, i) => [`w${i}`, 1 / 9])) });
    for (let i = 0; i < 9; i++) acts.push({ actor: `w${i}`, trig: { o: 1 } });
  }
  const r = cCtrl(acts); assert.equal(acts.length, 300); assert.equal(r.who, "o"); close(r.c, 0.9, 1e-12, "C_ctrl orchestré");
  ok("C_ctrl orchestré (1+9 agents, 30 tours)", r.c.toFixed(2));
  // chorégraphie 3 rôles, 5 messages : B->S commande, S->H expédie, H->B livré, B->S paie, S->B reçu
  const ch: Act[] = [{ actor: "S", trig: { B: 1 } }, { actor: "H", trig: { S: 1 } }, { actor: "B", trig: { H: 1 } }, { actor: "S", trig: { B: 1 } }, { actor: "B", trig: { S: 1 } }];
  const c2 = cCtrl(ch); close(c2.c, 0.4, 1e-12, "C_ctrl chorégraphie 3 rôles"); ok("C_ctrl chorégraphie (3 rôles, 5 messages)", c2.c.toFixed(2));
  // rôle-pivot d'une chorégraphie : même trace que l'orchestrateur (1 pivot, 9 satellites, 30 tours) -> même C_ctrl; seul A1 (C_spec) les distingue
  const c3 = cCtrl(acts); assert.equal(c3.c, r.c); ok("C_ctrl pivot de chorégraphie (même trace)", c3.c.toFixed(2));
}

// C_spec : saga à n = 3 transactions; formes admises T1..Tn ou T1..Tj Cj..C1 (0 <= j < n) [borne de j à confirmer].
function admitted(tr: string[], n: number) {
  const forms: string[] = [Array.from({ length: n }, (_, i) => `T${i + 1}`).join(",")];
  for (let j = 0; j < n; j++) {
    const up = Array.from({ length: j }, (_, i) => `T${i + 1}`), down = Array.from({ length: j }, (_, i) => `C${j - i}`);
    forms.push([...up, ...down].join(","));
  }
  return forms.includes(tr.join(","));
}
function run(n: number, failAt: number | null, badOrder: boolean) { // failAt : indice (1-based) de la transaction qui échoue
  const done = failAt === null ? n : failAt - 1, tr: string[] = [];
  for (let i = 1; i <= done; i++) tr.push(`T${i}`);
  if (failAt !== null) { const comp = Array.from({ length: done }, (_, i) => `C${done - i}`); tr.push(...(badOrder && done === 2 ? comp.reverse() : comp)); }
  return tr;
}
{
  const cases: (number | null)[] = [null, 1, 2, 3];
  const good = cases.filter((f) => admitted(run(3, f, false), 3)).length / 4;
  const bad = cases.filter((f) => admitted(run(3, f, true), 3)).length / 4;
  assert.equal(good, 1); assert.equal(bad, 0.75); ok("C_spec saga (implémentation correcte ; compensation C1,C2 inversée si échec en T3)", `${good} ; ${bad}`);
}

// C_stig : fonction de choix de Deneubourg (n = 2; k = 20 [à confirmer]); A, B passages cumulés.
const pChoice = (A: number, B: number, k = 20, n = 2) => (k + A) ** n / ((k + A) ** n + (k + B) ** n);
close(pChoice(20, 0) / pChoice(0, 0), 1.6, 1e-12, "C_stig A=20, B=0");
close(pChoice(40, 0) / pChoice(0, 0), 1.8, 1e-12, "C_stig A=40, B=0");
ok("C_stig (k=20, n=2) A=20,B=0 ; A=40,B=0 ; plafond 1/P(a)", `${(pChoice(20, 0) / 0.5).toFixed(2)} ; ${(pChoice(40, 0) / 0.5).toFixed(2)} ; 2`);

// C_mem : demi-vie d'une trace. Deux conventions pour rho (Ant System : persistance; convention postérieure : évaporation).
const halfPers = (rho: number) => Math.log(0.5) / Math.log(rho);       // tau <- rho * tau + dtau : reste rho par pas
const halfEvap = (rho: number) => Math.log(0.5) / Math.log(1 - rho);   // tau <- (1-rho) * tau + dtau : reste (1-rho) par pas
close(halfPers(0.9), 6.579, 1e-3, "demi-vie, rho = 0,9, persistance"); close(halfEvap(0.9), 0.301, 1e-3, "demi-vie, rho = 0,9, évaporation");
ok("demi-vie en pas (rho = 0,9) : convention persistance ; convention évaporation", `${halfPers(0.9).toFixed(2)} ; ${halfEvap(0.9).toFixed(2)}`);
{ // Dussutour et al. 2009 : rho = 0,00085, unité non énoncée [à confirmer]; durée de tâche >= 250 min
  const t = Math.LN2 / 0.00085; // 815,4 unités
  const cmS = (t / 60) / 250, cmMin = t / 250; // si s^-1 : t en s -> min ; si min^-1 : t en min
  close(t, 815.4, 0.1, "ln2 / rho"); ok("C_mem Dussutour (rho = 0,00085) : si s^-1 ; si min^-1", `${cmS.toFixed(3)} ; ${cmMin.toFixed(2)}`);
  assert.ok(cmS < 1 && cmMin > 1);
}

// C_amp : vote indépendant, n = 5, p = 0,6 : P(Y = x_1) sans aucune interaction.
{
  let s = 0; const n = 5, p = 0.6;
  for (let m = 0; m < 1 << n; m++) { // bit = 1 : correct
    let k = 0; for (let i = 0; i < n; i++) k += (m >> i) & 1;
    const pr = p ** k * (1 - p) ** (n - k), y = k > n / 2 ? 1 : 0, x1 = m & 1;
    if (y === x1) s += pr;
  }
  close(s, 0.7024, 1e-12, "C_amp du vote indépendant"); ok("C_amp, vote indépendant (n = 5, p = 0,6)", s.toFixed(4));
}

// ---------- 4. G ----------
const G = (pc: number, pr: number, pmax = 1) => (pc - pr) / (pmax - pr);
const rows: [number, number, number, number][] = [ // d (%), P_ind, P_col, G attendu (p8, table numérisée [I])
  [5, 0.590, 0.651, 0.149], [10, 0.610, 0.673, 0.162], [20, 0.661, 0.720, 0.174], [40, 0.778, 0.813, 0.158],
  [50, 0.839, 0.855, 0.099], [60, 0.894, 0.890, -0.038], [80, 0.972, 0.940, -1.143], [90, 0.993, 0.953, -5.714]];
for (const [d, pi, pc, g] of rows) close(G(pc, pi), g, 0.0015, `G à d = ${d} %`);
assert.ok(!Number.isFinite(G(0.957, 1.000)), "G indéfini quand P_ref = P_max");
ok("G(d = 5 ; 60 ; 80 ; 90 %) ; G(99 %)", `${G(0.651, 0.590).toFixed(3)} ; ${G(0.890, 0.894).toFixed(3)} ; ${G(0.940, 0.972).toFixed(3)} ; ${G(0.953, 0.993).toFixed(3)} ; non fini (division par zéro)`);
{ // décomposition à d = 5 % : jury de 7 individus indépendants (P_ind = 0,590)
  const pv = maj(7, 0.590), den = 1 - 0.590;
  const dAgg = pv - 0.590, dCom = 0.651 - pv;                     // différences : Delta_agg, Delta_com
  const gAgg = dAgg / den, gCom = dCom / den;                      // normalisées, même dénominateur P_max - P_ind
  close(pv, 0.691, 0.002, "P_vote(7) à d = 5 %"); close(dAgg + dCom, 0.651 - 0.590, 1e-12, "Delta_ind = Delta_agg + Delta_com");
  close(gAgg + gCom, G(0.651, 0.590), 1e-12, "G_ind = G_agg + G_com (même dénominateur)");
  close(dCom, -0.040, 0.002, "Delta_com = P_col - P_vote(7) (p8 : -0,04)");
  ok("d = 5 % : P_vote(7) ; Delta_agg ; Delta_com ; G_agg ; G_com ; G_ind", `${pv.toFixed(3)} ; ${dAgg.toFixed(3)} ; ${dCom.toFixed(3)} ; ${gAgg.toFixed(3)} ; ${gCom.toFixed(3)} ; ${(gAgg + gCom).toFixed(3)}`);
  // n_eff : plus petit n impair tel que Maj_n(P_ind) >= P_col
  const neff = (pi: number, pc: number) => { for (let n = 1; n <= 101; n += 2) if (maj(n, pi) >= pc) return n; return Infinity; };
  assert.equal(neff(0.590, 0.651), 5); assert.equal(neff(0.661, 0.720), 3); ok("n_eff (d = 5 % ; 20 %)", `${neff(0.590, 0.651)} ; ${neff(0.661, 0.720)}`);
}
// Budget égal : majorité de 3 appels à p = 0,6 (p8, E8.5) ; plafond de co-échec 1 - beta (Chen 2026) sous erreurs corrélées.
close(maj(3, 0.6), 0.648, 1e-12, "Maj_3(0,6)"); close(maj(7, 0.6), 0.7102, 1e-3, "Maj_7(0,6)");
{
  // items à difficulté latente p_i ~ Beta(5,4 ; 3,6) : moyenne 0,6, corrélation intra-classe 0,1 (modèle bêta-binomial de p8, M2)
  const a = 5.4, b = 3.6, lB = lgamma(a) + lgamma(b) - lgamma(a + b), M = 4000, n = 5;
  let tot = 0, acc5 = 0, acc101 = 0, lim = 0, beta5 = 0, mean = 0;
  for (let i = 0; i < M; i++) { // intégration par points milieux de la densité bêta
    const x = (i + 0.5) / M, d = Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - lB) / M;
    tot += d; mean += d * x; acc5 += d * maj(n, x); acc101 += d * maj(101, x); beta5 += d * (1 - x) ** n; if (x > 0.5) lim += d;
  }
  const betaExact = Math.exp(lgamma(a) + lgamma(b + n) - lgamma(a + b + n) - lB); // E[(1-p)^n]
  close(tot, 1, 1e-4, "densité normalisée"); close(mean, 0.6, 1e-4, "moyenne des p_i"); close(beta5, betaExact, 1e-4, "beta par intégration contre formule");
  close(acc101, 0.728, 0.002, "vote n = 101 (p8, T8.4)"); close(lim, 0.736, 0.002, "plafond P(p_i > 1/2) (p8, T8.4)");
  assert.ok(acc5 <= 1 - betaExact, "identité de Chen 2026 : précision du vote <= 1 - beta");
  assert.ok(acc5 < maj(5, 0.6), "la corrélation réduit le gain du vote");
  ok("p = 0,6, ICC = 0,1 : vote n = 5 ; n = 101 ; plafond P(p_i > 1/2) ; indépendant n = 5", `${acc5.toFixed(3)} ; ${acc101.toFixed(3)} ; ${lim.toFixed(3)} ; ${maj(5, 0.6).toFixed(3)}`);
  ok("n = 5 : beta = E[(1-p)^5] ; borne 1 - beta (indépendant : 0,4^5 = 0,010)", `${betaExact.toFixed(3)} ; ${(1 - betaExact).toFixed(3)}`);
}

// ---------- 5. Robustesse et coût ----------
{ // retrait de 30 % : N = 10 -> 7 agents; majorité de 10 avec égalité tranchée au hasard
  const maj10 = (() => { let s = 0; for (let k = 6; k <= 10; k++) s += choose(10, k) * 0.6 ** k * 0.4 ** (10 - k); s += 0.5 * choose(10, 5) * 0.6 ** 5 * 0.4 ** 5; return s; })();
  ok("vote p = 0,6 : N = 10 (égalité au hasard) ; après retrait de 3 (n = 7) ; variation", `${maj10.toFixed(4)} ; ${maj(7, 0.6).toFixed(4)} ; ${(maj(7, 0.6) - maj10).toFixed(4)}`);
}
{ // modèle de coût de p7 (dossier p7-agents-llm, section 8.1) : 300 appels L2; 1200 jetons de cache, 800 d'entrée, 150 de sortie (+ raisonnement)
  const price: Record<string, [number, number, number, number]> = { haiku: [1, 5, 0.10, 0], sonnet: [2, 10, 0.20, 0], opus: [4, 20, 0.20, 300] };
  const per = (m: string) => { const [pin, pout, pc, rs] = price[m]; return (1200 * pc + 800 * pin + (150 + rs) * pout) / 1e6; };
  const run = (m: string) => 300 * per(m);
  close(run("haiku"), 0.50, 0.01, "coût Haiku"); close(run("sonnet"), 1.00, 0.01, "coût Sonnet"); close(run("opus"), 3.73, 0.01, "coût Opus");
  ok("coût par exécution L2 (Haiku ; Sonnet ; Opus), $", `${run("haiku").toFixed(2)} ; ${run("sonnet").toFixed(2)} ; ${run("opus").toFixed(2)}`);
  ok("appels Haiku par appel Opus : rapport de prix ; rapport du modèle de coût (raisonnement compris)", `4 ; ${(per("opus") / per("haiku")).toFixed(2)}`);
  assert.ok(per("opus") / per("haiku") > 7);
}
console.log("checks OK");

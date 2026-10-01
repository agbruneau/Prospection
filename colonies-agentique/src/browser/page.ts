// Gabarit de page à trois niveaux (07 §4; UC-010 Voir, UC-011 Explorer, UC-012 Vérifier).
// Aucun calcul de simulation ni de statistique ici : le worker exécute le noyau, src/analysis résume (05 §14).
import { intervalle95, mediane, moyenne } from '../analysis/descriptif.ts'
import { gainCollectif } from '../analysis/gain.ts'
import { CORE_VERSION } from '../core/manifest.ts'
import { graineDeRepetition } from '../core/random.ts'
import type { Intervention } from '../core/scenario.ts'
import { LIBELLES_STATUT, type Cellule, type DonneesPage, type Niveau, type Statut } from './contrat.ts'
import type { Demande, Execution } from './sim-worker.ts'

declare const __SOURCE_WORKER__: string
type Regime = 'confirmatoire' | 'exploratoire'
const donnees = JSON.parse(document.getElementById('donnees')!.textContent!) as DonneesPage
const { definition: D, resume: R } = donnees
const reduit = matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- Outils DOM ----------
type Enfant = Node | string | null | undefined | false
function el<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Record<string, string | number | boolean> = {}, ...enfants: Enfant[]): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag)
  for (const [k, v] of Object.entries(attrs)) if (v !== false) e.setAttribute(k, v === true ? '' : String(v))
  for (const c of enfants) if (c) e.append(c)
  return e
}
const svg = (balisage: string) => { const t = document.createElement('template'); t.innerHTML = balisage.trim(); return t.content.firstChild as SVGElement }
const fmt = (x: number | null | undefined, chiffres = 3) => (x == null || !Number.isFinite(x) ? '—' : x.toLocaleString('fr-CA', { maximumFractionDigits: chiffres }))
const etat = el('p', { role: 'status', class: 'annonce' })
const annoncer = (t: string) => { etat.textContent = t }
const unite = (nom: string) => { const u = (R.cells[0]!.source.parameters as Record<string, { unit?: string }>)[nom]?.unit ?? ''; return u === '1' ? '' : u }   // « 1 » : sans dimension
const aConfirmer = (nom: string) => (R.toConfirm.includes(nom) ? ' (valeur à confirmer)' : '')   // BR-026

// ---------- Statut épistémique (07 §5) ----------
const FORMES: Record<Statut, string> = {
  reproduit: '<rect x="2" y="2" width="12" height="12" fill="currentColor"/>',
  simplifie: '<path d="M2 2h8l4 4v8H2z" fill="currentColor"/>',
  publie: '<rect x="2.5" y="2.5" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.5"/>',
  hypothese: '<circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2 2"/>',
  analogie: '<path d="M1 8h14M4 5 1 8l3 3M12 5l3 3-3 3" fill="none" stroke="currentColor" stroke-width="1.5"/>',
}
const badge = (s: Statut) => el('span', { class: 'badge' }, svg(`<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">${FORMES[s]}</svg>`), LIBELLES_STATUT[s])
function enonce(texte: string, statut: Statut, regime: Regime, ...plus: Enfant[]) {
  return el('div', { class: 'enonce', 'data-statut': statut, 'data-regime': regime }, badge(statut), ' ', el('span', {}, texte),
    statut === 'reproduit' && el('span', { class: 'mention' }, ' Réplication d’un modèle publié, non validation empirique.'), ...plus)   // BR-025
}

// ---------- Worker (D2) ----------
const worker = new Worker(URL.createObjectURL(new Blob([__SOURCE_WORKER__], { type: 'text/javascript' })))
let numero = 0
function simuler(d: Omit<Demande, 'id'>, surExecution: (i: number, e: Execution) => void): Promise<void> {
  const id = ++numero
  return new Promise((ok, ko) => {
    const f = (m: MessageEvent) => {
      if (m.data.id !== id) return
      if (m.data.erreur) { worker.removeEventListener('message', f); ko(new Error(m.data.erreur)) } else if (m.data.fin) { worker.removeEventListener('message', f); ok() } else surExecution(m.data.i, m.data.execution)
    }
    worker.addEventListener('message', f)
    worker.postMessage({ ...d, id })
  })
}
const mesuresRegles = [...new Set((D.explorer?.individus ?? []).flatMap(i => [...i.regle.matchAll(/\{(\w+)\}/g)].map(m => m[1]!)))]
const MESURES = [...new Set([D.mesure.nom, D.graphe.nom, ...mesuresRegles])]
const echantillonnage = (c: Cellule) => { const t = c.source.time as { horizon: number; dt: number }; return Math.max(t.dt, Math.round(t.horizon / 100 / t.dt) * t.dt) }

// ---------- Z3 Distribution (07 §4.8; BR-017) ----------
function distribution(valeurs: number[], courante: number | null, o: { N: number; regime: Regime; statut: Statut; complete: boolean; titre: string; graines?: string }) {
  const [a, b] = intervalle95(valeurs), med = mediane(valeurs)
  const w = 320, h = o.complete ? 90 : 46, x = (v: number) => 8 + (v - Math.min(0, a)) / ((Math.max(1, b) - Math.min(0, a)) || 1) * (w - 16)
  const points = valeurs.map((v, i) => `<circle cx="${x(v).toFixed(1)}" cy="${(h - 14 - ((i * 37) % (h - 24))).toFixed(1)}" r="2" class="point"/>`).join('')
  const marque = courante == null ? '' : `<line x1="${x(courante)}" x2="${x(courante)}" y1="2" y2="${h - 10}" class="courante"/>`
  const resume = `${courante == null ? '' : `Exécution typique : ${fmt(courante)} · `}médiane : ${fmt(med)} · intervalle à 95 % des exécutions : [${fmt(a)} ; ${fmt(b)}] · n = ${valeurs.length} sur N = ${o.N}`
  return el('figure', { class: 'distribution', 'data-statut': o.statut, 'data-regime': o.regime },
    svg(`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${o.titre} : ${resume}"><line x1="8" x2="${w - 8}" y1="${h - 8}" y2="${h - 8}" class="axe"/>${points}${marque}</svg>`),
    el('figcaption', {}, badge(o.statut), ` ${o.titre}. ${resume}${o.graines ? ` · ${o.graines}` : ''}`),
    o.complete && el('details', {}, el('summary', {}, 'Données'), el('table', {}, el('caption', {}, `${o.titre} (${D.mesure.etiquette})`),
      el('thead', {}, el('tr', {}, el('th', { scope: 'col' }, 'Exécution'), el('th', { scope: 'col' }, `${D.mesure.etiquette} (${D.mesure.unite})`))),
      el('tbody', {}, ...valeurs.slice(0, 200).map((v, i) => el('tr', {}, el('td', {}, String(i)), el('td', {}, fmt(v))))))))
}

// ---------- Z1 Scène et Z2 Graphe ----------
// ponytail: une seule scène (pont à deux branches, p1-goss-1989); un registre de scènes par modèle viendra avec la deuxième page.
function scene() {
  const canvas = el('canvas', { width: 480, height: 200, role: 'img', 'aria-label': 'Scène de la simulation' })
  const texte = el('p', { class: 'repli' })
  const ctx = canvas.getContext('2d')
  const couleur = getComputedStyle(document.documentElement)
  const dessiner = (o: Record<string, number | null>, individu?: number) => {
    const fourmi = couleur.getPropertyValue('--fourmi').trim() || '#D55E00', neutre = couleur.getPropertyValue('--texte').trim() || '#111'
    if (ctx) {
      ctx.clearRect(0, 0, 480, 200)
      const branche = (y: number, largeur: number, dim: boolean) => { ctx.globalAlpha = dim ? 0.25 : 1; ctx.strokeStyle = fourmi; ctx.lineWidth = largeur; ctx.beginPath(); ctx.moveTo(60, 100); ctx.quadraticCurveTo(240, y, 420, 100); ctx.stroke() }
      const total = (o.S0 ?? 0) + (o.L0 ?? 0) + 1
      branche(30, 1 + 12 * (o.S0 ?? 0) / total, false)
      branche(190, 1 + 12 * (o.L0 ?? 0) / total, false)
      for (const [j, xj] of [[0, 60], [1, 420]] as const) {
        ctx.globalAlpha = individu == null || individu === j ? 1 : 0.2   // hors du rayon de perception : estompé (UC-011 A1)
        ctx.fillStyle = neutre; ctx.beginPath(); ctx.arc(xj, 100, individu === j ? 12 : 8, 0, 2 * Math.PI); ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    texte.textContent = `Phéromone : courte ${fmt(o.S0, 0)} au nid, ${fmt(o.S1, 0)} à la nourriture; longue ${fmt(o.L0, 0)} et ${fmt(o.L1, 0)}. Passages : ${fmt(o.crossings, 0)}.`
  }
  return { element: el('div', { class: 'scene' }, canvas, texte), dessiner }
}
function graphe(ex: Execution, jusqua: number) {
  const ys = ex.series[D.graphe.nom] ?? [], w = 320, h = 100, n = Math.max(1, ex.t.length - 1)
  const finies = ys.filter((y): y is number => y != null), bas = Math.min(0, ...finies), haut = Math.max(1, ...finies)
  const pts = ys.slice(0, jusqua + 1).map((y, i) => `${(8 + i / n * (w - 16)).toFixed(1)},${(h - 8 - ((y ?? bas) - bas) / (haut - bas) * (h - 16)).toFixed(1)}`).join(' ')
  return el('figure', { class: 'graphe', 'data-statut': 'simplifie', 'data-regime': 'exploratoire' },
    svg(`<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${D.graphe.etiquette} en fonction du temps"><line x1="8" x2="${w - 8}" y1="${h - 8}" y2="${h - 8}" class="axe"/><polyline points="${pts}" class="serie"/></svg>`),
    el('figcaption', {}, badge('simplifie'), ` ${D.graphe.etiquette} (${D.graphe.unite}) en fonction du temps (s); dernière valeur : ${fmt(ys[jusqua])}.`))
}

/** Lecture animée d'une exécution, avec pause (UC-010 A2); instantanée en mouvement réduit. */
function lecture(ex: Execution, z: { scene: ReturnType<typeof scene>; zoneGraphe: HTMLElement }, boutonPause: HTMLButtonElement): Promise<void> {
  return new Promise(fin => {
    const n = ex.t.length - 1
    let ecoule = 0, avant: number | null = null, enPause = false
    const montrer = (k: number) => {
      z.scene.dessiner(Object.fromEntries(Object.entries(ex.series).map(([m, v]) => [m, v[k] ?? null])))
      z.zoneGraphe.replaceChildren(graphe(ex, k))
    }
    boutonPause.hidden = reduit
    boutonPause.onclick = () => { enPause = !enPause; boutonPause.textContent = enPause ? 'Lecture' : 'Pause'; boutonPause.setAttribute('aria-pressed', String(enPause)); annoncer(enPause ? 'Lecture en pause.' : 'Lecture reprise.') }
    const image = (t: number) => {
      if (avant !== null && !enPause) ecoule += t - avant
      avant = t
      const k = reduit ? n : Math.min(n, Math.floor(ecoule / D.rythmeMs * n))
      montrer(k)
      boutonPause.dataset.progression = String(k / n)
      if (k >= n) { boutonPause.hidden = true; fin() } else requestAnimationFrame(image)
    }
    requestAnimationFrame(image)
  })
}

// ---------- Z0 Bandeau et sélecteur de niveau ----------
const niveaux: Record<Niveau, string> = { voir: 'Voir', explorer: 'Explorer', verifier: 'Vérifier' }
const sections = {} as Record<Niveau, HTMLElement>
const selecteur = el('nav', { 'aria-label': 'Niveau de lecture' })
function choisir(n: Niveau) {
  for (const [k, s] of Object.entries(sections)) s.hidden = k !== n
  for (const b of selecteur.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.niveau === n))
  annoncer(`Niveau ${niveaux[n]}.`)
}
for (const n of D.niveaux) selecteur.append(el('button', { type: 'button', 'data-niveau': n, 'aria-pressed': 'false' }, niveaux[n]))
selecteur.addEventListener('click', e => { const n = (e.target as HTMLElement).dataset.niveau as Niveau | undefined; if (n) choisir(n) })

const carte = () => enonce(`${D.carte.relation} — où l’analogie casse : ${D.carte.ouCasse} (source : ${D.carte.source})`, D.carte.statut, 'exploratoire')

// ---------- Niveau Voir (UC-010) ----------
function niveauVoir() {
  const zone = el('section', { 'aria-labelledby': 'titre-voir' }, el('h2', { id: 'titre-voir' }, 'Voir'))
  const etapes = D.voir!.etapes
  const z = { scene: scene(), zoneGraphe: el('div') }
  const corps = el('div'), resultat = el('div', { class: 'resultat' })
  zone.append(corps, z.scene.element, z.zoneGraphe, resultat)   // Z5 consignes, Z1 scène, Z2 graphe, puis le résultat
  const afficher = (i: number) => {
    const s = etapes[i]!, c = R.cells[s.cellule]!
    const champ = el('input', { type: 'range', id: 'prediction', min: s.prediction.min, max: s.prediction.max, step: s.prediction.pas, value: (s.prediction.min + s.prediction.max) / 2 })
    const valeur = el('output', { for: 'prediction' }, fmt(Number(champ.value)))
    champ.addEventListener('input', () => { valeur.textContent = fmt(Number(champ.value)) })
    const lancer = el('button', { type: 'button' }, 'Lancer'), passer = el('button', { type: 'button' }, 'Passer'), pause = el('button', { type: 'button', hidden: true, 'aria-pressed': 'false' }, 'Pause')
    resultat.replaceChildren()
    corps.replaceChildren(
      el('h3', {}, `Étape ${i + 1} sur ${etapes.length}`), el('p', {}, s.question),
      el('p', {}, `Variable de l’étape : ${s.variable} = ${fmt(c.params[s.variable] as number)} ${unite(s.variable)}${aConfirmer(s.variable)}`),
      el('div', { class: 'controle' }, el('label', { for: 'prediction' }, `Votre prédiction (${D.mesure.etiquette}, ${D.mesure.unite})`), champ, valeur),
      el('div', { class: 'boutons' }, lancer, passer, pause))
    const jouer = async (prediction: number | null) => {
      lancer.disabled = passer.disabled = champ.disabled = true
      annoncer('Exécution typique en cours.')
      let ex: Execution | undefined
      z.scene.element.dataset.graine = c.replay.seed   // BR-018
      await simuler({ scenario: c.source, graines: [c.replay.seed], interventions: [], echantillonnage: echantillonnage(c), mesures: MESURES }, (_, e) => { ex = e })
      await lecture(ex!, z, pause)
      const x = ex!.finales[D.mesure.nom] ?? null
      resultat.replaceChildren(
        el('p', { class: 'comparaison' }, prediction == null ? 'Prédiction passée. ' : `Votre prédiction : ${fmt(prediction)}. `, `Résultat de l’exécution typique (annoncée comme telle) : ${fmt(x)} ${D.mesure.unite}.`),
        distribution(c.values, x, { N: R.preregisteredN, regime: 'exploratoire', statut: 'simplifie', complete: false, titre: `Distribution sur ${R.preregisteredN} graines` }),
        enonce(s.conclusion.texte, s.conclusion.statut, 'exploratoire'),
        el('aside', { class: 'nepas' }, el('h4', {}, 'Ce que ça ne veut pas dire'), el('p', {}, s.nePasConfondre)),
        i + 1 < etapes.length ? el('button', { type: 'button', class: 'suivante' }, 'Étape suivante') : el('div', { class: 'carte' }, el('h4', {}, 'Carte agentique'), carte()))
      resultat.querySelector('.suivante')?.addEventListener('click', () => afficher(i + 1))
      annoncer('Résultat affiché.')
    }
    lancer.addEventListener('click', () => jouer(Number(champ.value)))
    passer.addEventListener('click', () => jouer(null))   // A1
  }
  afficher(0)
  return zone
}

// ---------- Niveau Explorer (UC-011) ----------
function niveauExplorer() {
  const X = D.explorer!, c = R.cells[X.cellule]!
  const zone = el('section', { 'aria-labelledby': 'titre-explorer' }, el('h2', { id: 'titre-explorer' }, 'Explorer'))
  const z = { scene: scene(), zoneGraphe: el('div') }
  const valeurs = new Map(X.parametres.map(p => [p.nom, (c.source.parameters as Record<string, { value: number }>)[p.nom]!.value]))
  const defauts = new Map(valeurs)
  const zoneDistribution = el('div'), zoneDefi = el('p', { class: 'defi' }), zoneGain = el('div'), zoneLeurre = el('div'), zoneIndividu = el('div', { class: 'individu' })
  const manifeste = el('pre', { class: 'manifeste' })
  let derniere: Execution | undefined, individu: number | null = null, generation = 0
  const controles = X.parametres.map(p => {
    const id = `param-${p.nom}`, champ = el('input', { type: 'range', id, min: p.min, max: p.max, step: p.pas, value: valeurs.get(p.nom)!, 'data-parametre': p.nom })
    const sortie = el('output', { for: id }, `${fmt(valeurs.get(p.nom))} ${unite(p.nom)}${aConfirmer(p.nom)}`)
    champ.addEventListener('input', () => { sortie.textContent = `${fmt(Number(champ.value))} ${unite(p.nom)}${aConfirmer(p.nom)}` })
    champ.addEventListener('change', () => { valeurs.set(p.nom, Number(champ.value)); void relancer() })
    return el('div', { class: 'controle' }, el('label', { for: id }, p.etiquette), champ, sortie)
  })
  if (X.leurre) {
    const L = X.leurre, champ = el('input', { type: 'range', id: 'leurre', min: L.min, max: L.max, step: L.pas, value: L.min, 'data-leurre': true })
    champ.addEventListener('change', () => {   // A2, BR-024 : aucun effet sur le modèle, révélé dès l'usage
      zoneLeurre.replaceChildren(enonce(L.revelation, 'simplifie', 'exploratoire'))
      void relancer()
    })
    controles.push(el('div', { class: 'controle' }, el('label', { for: 'leurre' }, `${L.etiquette} (${L.unite})`), champ))
  }
  const suivre = el('button', { type: 'button', 'aria-pressed': 'false' }, 'Suivre un individu')
  const montrerIndividu = () => {
    if (individu == null || !derniere || !X.individus) { zoneIndividu.replaceChildren(); return }
    const I = X.individus[individu]!, k = derniere.t.length - 1
    const regle = I.regle.replace(/\{(\w+)\}/g, (_, m: string) => fmt(derniere!.series[m]?.[k], 3))
    z.scene.dessiner(Object.fromEntries(Object.entries(derniere.series).map(([m, v]) => [m, v[k] ?? null])), individu)
    const prec = el('button', { type: 'button' }, 'Individu précédent'), suiv = el('button', { type: 'button' }, 'Individu suivant')
    prec.onclick = () => { individu = (individu! + X.individus!.length - 1) % X.individus!.length; montrerIndividu() }
    suiv.onclick = () => { individu = (individu! + 1) % X.individus!.length; montrerIndividu() }
    zoneIndividu.replaceChildren(el('h3', {}, `Vue de l’agent : ${I.etiquette}`), enonce(regle, 'simplifie', 'exploratoire'), el('div', { class: 'boutons' }, prec, suiv))
  }
  suivre.onclick = () => { individu = individu == null ? 0 : null; suivre.setAttribute('aria-pressed', String(individu != null)); montrerIndividu() }
  async function relancer() {
    const g = ++generation
    // BR-023 : chaque réglage est une intervention datée (t = 0), inscrite au manifeste de l'exécution affichée.
    const interventions: Intervention[] = [...valeurs].filter(([k, v]) => v !== defauts.get(k)).map(([type, value]) => ({ time: 0, type, value }))
    const graines = Array.from({ length: X.repetitions }, (_, i) => graineDeRepetition(BigInt(R.provenance.masterSeed), i))
    const finales: number[] = []
    annoncer('Calcul en cours.')
    await simuler({ scenario: c.source, graines, interventions, echantillonnage: echantillonnage(c), mesures: MESURES }, (i, e) => {
      if (g !== generation) return
      if (i === 0) {
        derniere = e
        const k = e.t.length - 1
        z.scene.dessiner(Object.fromEntries(Object.entries(e.series).map(([m, v]) => [m, v[k] ?? null])), individu ?? undefined)
        z.zoneGraphe.replaceChildren(graphe(e, k))
        manifeste.textContent = JSON.stringify({ scenarioHash: e.scenarioHash, graine: e.graine, interventions: e.interventions, moteur: { kind: 'browser', version: navigator.userAgent }, noyau: CORE_VERSION, empreinte: e.empreinte }, null, 2)
        montrerIndividu()
      }
      const v = e.finales[D.mesure.nom]
      if (v != null) finales.push(v)
      zoneDistribution.replaceChildren(el('p', { class: 'etiquette-calcul' }, `calcul navigateur, non confirmatoire · ${finales.length} sur ${X.repetitions}`),   // BR-021
        distribution(finales, derniere?.finales[D.mesure.nom] ?? null, { N: X.repetitions, regime: 'exploratoire', statut: 'simplifie', complete: true, titre: 'Distribution des exécutions calculées dans le navigateur' }))
    })
    if (g !== generation) return
    const m = mediane(finales), atteint = X.defi.sens === '>=' ? m >= X.defi.seuil : m <= X.defi.seuil
    zoneDefi.textContent = atteint ? `Défi réussi : médiane ${fmt(m)} ${D.mesure.unite}.` : `Défi : ${X.defi.texte} (médiane actuelle ${fmt(m)}).`
    if (X.gain) {   // A3, BR-022
      const { G, delta } = gainCollectif(moyenne(finales), X.gain.pRef, X.gain.pMax, X.gain.seuil)
      zoneGain.replaceChildren(enonce(`Gain collectif G : ${G == null ? 'indéfini' : fmt(G)} · différence appariée Δ = ${fmt(delta)}`, 'hypothese', 'exploratoire'))
    }
    annoncer(atteint ? 'Défi réussi.' : 'Calcul terminé.')
  }
  zone.append(el('p', { class: 'defi-texte' }, `Défi : ${X.defi.texte}`), ...controles, zoneLeurre, el('div', { class: 'boutons' }, suivre), zoneIndividu,
    z.scene.element, z.zoneGraphe, zoneDistribution, zoneDefi, zoneGain, el('details', {}, el('summary', {}, 'Manifeste de l’exécution affichée'), manifeste), el('div', { class: 'carte' }, el('h3', {}, 'Carte agentique'), carte()))
  sections.explorer = zone
  return { zone, relancer }
}

// ---------- Niveau Vérifier (UC-012) ----------
function niveauVerifier() {
  const zone = el('section', { 'aria-labelledby': 'titre-verifier' }, el('h2', { id: 'titre-verifier' }, 'Vérifier'))
  const v = R.verdict, regime: Regime = R.regime === 'confirmatory' ? 'confirmatoire' : 'exploratoire'
  const reproduit = R.state === 'frozen' && v.outcome === 'satisfied'   // BR-025
  const raison = R.state === 'blocked' ? `bloqué : ${R.blockedReason ?? 'raison non consignée'}`
    : R.state === 'provisional' ? `non reproduit : cible provisoire, issue ${v.outcome} sous réserve` : `non reproduit : issue ${v.outcome}`
  zone.append(el('h3', {}, 'Cible de reproduction'),
    el('dl', {}, el('dt', {}, 'Cible'), el('dd', {}, el('a', { href: `../projets/reproduction/${R.target}.md` }, R.target)),
      el('dt', {}, 'Niveau d’accord visé'), el('dd', {}, R.level), el('dt', {}, 'Marge'), el('dd', {}, R.margin ? `±${R.margin.delta} ${R.margin.scale}` : 'sans marge'),
      el('dt', {}, 'Verdict'), el('dd', {}, `${v.outcome}${v.provisional ? ' (sous réserve)' : ''}, n = ${v.n}`),
      el('dt', {}, 'Déviations'), el('dd', {}, v.deviations.length ? v.deviations.join(', ') : 'aucune')),
    reproduit ? enonce(`${R.target} : critère d’acceptation atteint.`, 'reproduit', regime) : enonce(`${R.target} : ${raison}.`, 'publie', regime))   // A1
  const P = R.provenance, graines = `graines : répétitions 0 à ${R.preregisteredN - 1} de la graine maîtresse ${P.masterSeed} · moteur ${P.engine.kind} ${P.engine.version} (${P.engine.platform}, ${P.engine.arch}), noyau ${P.coreVersion}`
  const statutResultats: Statut = reproduit ? 'reproduit' : 'publie'
  zone.append(el('h3', {}, 'Distribution et balayage en petits multiples'))
  const multiples = el('div', { class: 'multiples' })
  R.cells.forEach((c, i) => {
    const rejeu = el('div', { class: 'rejeu', 'aria-live': 'polite' }), bouton = el('button', { type: 'button', 'data-cellule': i }, 'Rejouer cette exécution')
    const params = Object.entries(c.params).map(([k, x]) => `${k} = ${fmt(x as number)} ${unite(k)}${aConfirmer(k)}`).join(' · ')   // BR-026
    bouton.addEventListener('click', async () => {
      bouton.disabled = true
      try {
        let ex: Execution | undefined
        await simuler({ scenario: c.source, graines: [c.replay.seed], interventions: [], mesures: [D.mesure.nom] }, (_, e) => { ex = e })
        const egale = ex!.empreinte === c.replay.fnv1a64
        rejeu.replaceChildren(el('pre', { class: 'manifeste' }, JSON.stringify({ moteur: { kind: 'browser', version: navigator.userAgent }, noyau: CORE_VERSION, graine: ex!.graine, empreinte: ex!.empreinte, empreinteConsignee: c.replay.fnv1a64 }, null, 2)),
          // BR-007 : la page n'est jamais le moteur du manifeste (Node) : identité non affirmée.
          el('p', { class: 'verdict-rejeu' }, `Autre moteur : trajectoire non garantie identique, distributions équivalentes. Empreinte finale ${egale ? 'égale' : 'différente'} de celle du manifeste.`))
      } catch (e) {
        rejeu.replaceChildren(el('p', {}, `Rejeu impossible : ${(e as Error).message}`))
      }
      bouton.disabled = false
    })
    multiples.append(el('div', { class: 'cellule' }, el('h4', {}, params),
      distribution(c.values, c.values[c.replay.rep] ?? null, { N: R.preregisteredN, regime, statut: statutResultats, complete: true, titre: `Distribution sur ${R.preregisteredN} graines`, graines }), bouton, rejeu))
  })
  zone.append(multiples, el('h3', {}, 'Carte agentique'), carte())
  return zone
}

// ---------- Assemblage ----------
document.title = D.titre
const principal = el('main', { id: 'contenu' })
document.body.append(
  el('header', {}, el('h1', {}, D.titre),
    el('p', { class: 'identite' }, `Public : ${D.public} · `, el('i', { lang: 'la' }, D.taxon.latin), ` (préréglage ${D.taxon.preset}) · durée : ${D.duree} · noyau ${donnees.version.coreVersion}, commit ${donnees.version.commit.slice(0, 7)} · français`),
    selecteur),
  etat, principal,
  el('footer', {}, el('h2', {}, 'Limites'), el('p', {}, D.limites),
    el('p', {}, `Version : noyau ${donnees.version.coreVersion}, commit ${donnees.version.commit}. DOI : à venir. Licence : en cours de décision.`)))
if (D.niveaux.includes('voir')) sections.voir = niveauVoir()
const explorer = D.niveaux.includes('explorer') ? niveauExplorer() : undefined
if (D.niveaux.includes('verifier')) sections.verifier = niveauVerifier()
principal.append(...D.niveaux.map(n => sections[n]))
choisir(D.niveaux[0]!)
selecteur.addEventListener('click', e => { if ((e.target as HTMLElement).dataset.niveau === 'explorer' && explorer) void explorer.relancer() }, { once: true })
document.body.dataset.pret = 'oui'

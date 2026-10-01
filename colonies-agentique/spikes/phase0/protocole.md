# Protocole du spike de la phase 0

**Statut :** fixé le 2026-10-01, **avant la première mesure** ([05](../../docs/05-spec-simulation.md) §12 : les seuils marqués [à confirmer] se fixent ici avant toute mesure). Ce fichier est commité seul; le rapport (`rapport.md`) vient dans un commit ultérieur. Il couvre E0.4 (spike navigateur) et E0.5 (divergence des fonctions `Math`) de la [fiche S0](../../projets/S0-socle.md).

## 1. Montage

- **Modèle jouet** (`jouet.ts`) : type Vicsek, domaine périodique L × L, densité ρ = 4, rayon r = 1, vitesse 0,03, bruit η = 0,5 [I]; structure de tableaux `Float32Array` (x, y, θ) et listes de cellules; mise à jour synchrone; bruit tiré du flux `noise` du noyau (`src/core/random.ts`). Charges : N = 400 (empreintes), 10⁴ et 10⁵ (performance).
- **Page** (`page.ts`, `worker.ts`, `index.html`) : construite par esbuild (`build.ts`, IIFE minifiée, JavaScript injecté dans le HTML; un second bundle pour le worker). Aucun calcul de simulation hors du noyau et du modèle jouet.
- **Cible A** : page statique servie par `serveur.ts` (HTTP local, sans en-tête de sécurité particulier, comme un hébergement statique de type GitHub Pages [I]).
- **Cible B** : artifact privé. Mesurée si l'outillage le permet; son échec ou son absence ne bloque pas (05 §12).
- **Moteurs** : Node 24.19.0; Chromium (Chrome installé, canal `chrome`), Firefox et WebKit pilotés par Playwright (`mesurer.ts`), sans affichage. Les cadences mesurées sans affichage sont indicatives : elles sont rapportées comme telles.
- **Poste** : Windows 11, processeur et mémoire consignés dans le manifeste d'environnement du rapport.

## 2. Seuils (fixés avant mesure)

| ID | Grandeur | Seuil | Origine |
|---|---|---|---|
| SPK3 | aller-retour médian de 4 `Float32Array` de 10⁵ éléments (1,6 Mo) par transfert | ≤ 16 ms; tampon source détaché après envoi | [I] |
| SPK4 | temps médian d'un pas du jouet | ≤ 8 ms à 10⁴ agents; 10⁵ rapporté | fiche S0 (budget navigateur) et 05 §11 [à confirmer] |
| SPK5 | temps par image (intervalle entre deux `requestAnimationFrame`, un pas par image) | médiane ≤ 33 ms et p95 ≤ 50 ms à 10⁴ agents, sur chaque moteur; 10⁵ rapporté | E0.4 (go : médiane ≤ 33 ms) ; p95 [I] |
| SPK9 | taille | bundle de la page (noyau, jouet, worker) ≤ 500 Ko [I]; page complète ≤ 16 Mo pour la cible B | [I]; outil Artifact |
| SPK10 | durée estimée d'un balayage complet de chaque projet (charges de 05 §11) | ≤ 24 h sur le poste, `worker_threads` compris | [I] |

Les critères sans seuil numérique sont ceux de 05 §12 : SPK1 (aucune erreur de console, empreintes égales sur un même navigateur), SPK2 (un des deux workers démarre sans violation de politique de sécurité), SPK6 (empreintes identiques), SPK7 (SHA-256 du fichier reçu égal à celui calculé dans la page), SPK8 (identité de T0.1 et T0.3), SPK11 (même SHA-256 de `results.csv`), SPK12 (tout passe; deux builds au même hachage).

## 3. Plans de mesure

- **E0.4 (SPK4, SPK5)** : cellules moteur (3) × agents (10⁴ ; 10⁵) × fil de calcul (principal ; worker, positions renvoyées par transfert) × dessin (écriture de pixels et `putImageData` ; chemin Canvas 2D unique); 10 s de mesure par cellule; médiane et p95. Variante OffscreenCanvas (dessin dans le worker) mesurée à part si le moteur l'offre.
- **SPK6** : empreinte du jouet (N = 400) au pas 1 000 dans quatre conditions : calcul seul; un pas par image; un pas toutes les quatre images; page masquée (seconde page au premier plan) pendant l'exécution.
- **SPK8** : T0.1 et T0.3 dans chaque moteur; empreinte du jouet (N = 400, graine 20261001) à chaque pas jusqu'à 1 000; on consigne le premier pas où elle diffère de Node (mesure, pas critère).
- **E0.5** : 10⁶ entrées par fonction, tirées du flux `measure` (graine 20261001) : `exp` sur [−50 ; 50]; `log` sur ]0 ; 10⁶]; `pow` à exposant entier (base [0,5 ; 2], exposant entier de −10 à 10) et non entier (base ]0 ; 10], exposant [−5 ; 5]); `sin` et `cos` sur [−100 ; 100]. Sorties comparées bit à bit à celles de Node, par blocs de 1 000 (empreinte par bloc, puis décompte exact dans les blocs qui diffèrent).
- **SPK7** : export d'un CSV d'environ 1 Mo et d'un manifeste par `Blob` et `<a download>`; le fichier reçu par le pilote est haché dans Node et comparé au SHA-256 calculé dans la page.
- **SPK10** : micro-bancs headless, médiane de 5 répétitions : déplacements élémentaires sur treillis 3D (noyau de type [Khuong et al. 2016]); réactions par seconde du SSA (système de T0.6); paires par seconde d'un voisinage en O(N²) (type [Couzin et al. 2002]); lectures de sondes et mises à jour de grille par seconde (type [Aswale et al. 2022]).
- **SPK11** : balayage jouet (4 valeurs de η × 8 répétitions, N = 400, 200 pas) avec 1, 2 et 4 `worker_threads`; SHA-256 de `results.csv` et débit.

## 4. Décisions à rendre (05 §12)

D1 hébergement (A confirmée, B rapportée); D2 worker (`blob:` ou fichier); D3 méthode de rendu; D4 WASM oui ou non, par noyau; D5 N maximal interactif par projet. Le rapport les propose à partir des mesures; le chercheur les rend.

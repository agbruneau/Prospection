# Rapport du spike de la phase 0

**Date :** 2026-10-01. **Protocole :** [protocole.md](protocole.md), commité seul (`de7de82`) avant la première mesure. **Résultats bruts :** `resultats/*.json`. **Portée :** E0.4 (spike navigateur) et E0.5 (fonctions `Math`) de la [fiche S0](../../projets/S0-socle.md); spikes SPK1 à SPK12 de [05](../../docs/05-spec-simulation.md) §12. Les décisions D1 à D5 de la section 7 sont des **propositions** : le chercheur les rend.

**Reproduire :** `npm ci`, `npx playwright install firefox webkit`, puis `node spikes/phase0/build.ts`, `node spikes/phase0/mesurer.ts`, `node spikes/phase0/bancs.ts` et `node spikes/phase0/balayage.ts`.

## 1. Manifeste d'environnement

| Élément | Valeur |
|---|---|
| Poste | Windows 11 Pro 10.0.26220 (build Insider); Intel Core Ultra 9 275HX, 24 cœurs; 63 Go |
| Node | v24.19.0 (V8 13.6.233.17) |
| Chromium | Chrome 154.0.8037.93 piloté par Playwright 1.63.0 (canal `chrome`), sans affichage |
| WebKit | WebKit 26.6 (build Playwright pour Windows), sans affichage |
| Chromium avec affichage | navigateur intégré de l'application Claude, Chrome 152.0.7977.130 : condition « page masquée » de SPK6 et vérifications ponctuelles |
| Firefox | Firefox 155.0 (build Playwright) : **ne démarre pas** (section 5) |
| Outillage | esbuild 0.28.2, TypeScript 7.0.2 |

## 2. Synthèse

| Spike | Critère | Chromium 154 | WebKit 26.6 | Verdict |
|---|---|---|---|---|
| SPK1 hébergement (A) | état initial affiché, 1 000 pas sans erreur de console, empreintes égales sur un même navigateur | oui; 0 erreur | oui; 0 erreur | réussi sur A |
| SPK2 worker | `blob:` ou fichier, sans violation de politique de sécurité | `blob:` et fichier démarrent | idem | réussi sur A |
| SPK3 transfert | médiane ≤ 16 ms, tampon détaché | ≈ 0 ms (p95 0,1 ms), détaché | 15 ms (p95 16 ms), détaché | réussi (WebKit au seuil) |
| SPK4 calcul par pas, 10⁴ agents | médiane ≤ 8 ms | fil principal 8,2 ms; worker 7,2 ms | 5,0 ms | réussi en worker; fil principal de Chromium juste au-dessus |
| SPK5 rendu, 10⁴ agents | image médiane ≤ 33 ms, p95 ≤ 50 ms | 4,2 à 8,3 ms; p95 ≤ 12,6 ms | 15 à 16 ms; p95 16 ms | réussi (cadences sans affichage : indicatives) |
| SPK6 découplage de la cadence | empreintes identiques au pas 1 000 | identiques (4 conditions) | identiques (3 conditions) | réussi (bloquant) |
| SPK7 téléchargements (A) | SHA-256 reçu = SHA-256 calculé dans la page | identiques (CSV d'environ 1 Mo, manifeste) | identiques | réussi sur A |
| SPK8 déterminisme inter-moteurs | T0.1 et T0.3 identiques | identiques | identiques | réussi sur Node, Chromium et WebKit; **Firefox non testé** |
| SPK9 taille | bundle ≤ 500 Ko; page ≤ 16 Mo | page 14,7 Ko (JavaScript inclus), worker 4,6 Ko | — | réussi |
| SPK10 noyaux headless | balayage complet ≤ 24 h par projet | — | — | réussi sous hypothèses (section 4) |
| SPK11 balayage parallèle | même SHA-256 de `results.csv` avec 1, 2, 4 travailleurs | — | — | réussi (bloquant) |
| SPK12 chaîne de build | tout passe; deux builds au même hachage | — | — | réussi (bloquant) |

**Porte 0 (05 §12).** (i) Spikes bloquants : SPK6, SPK11 et SPK12 réussis; SPK8 réussi sur T0.1 et T0.3 pour trois moteurs (Node, Chromium, WebKit), mais seulement deux moteurs de navigateur sur trois : la fiche S0 (CS0.2) admet alors une **entrée au registre et une clause limitée aux moteurs testés**. (ii) SPK1, SPK2, SPK3 et SPK7 réussis sur la cible A. (iii) D1 à D5 : propositions en section 7. La cible B n'est pas mesurée (section 5).

## 3. E0.4 : calcul et rendu (10 s par cellule)

Temps par image (médiane / p95), temps de pas médian et pas par seconde. Sans affichage, Chromium cadence `requestAnimationFrame` vers 240 Hz (4,2 ms) et WebKit à 60 Hz (16 ms) : seules les cellules où le fil principal calcule mesurent un coût réel par image.

| Cellule | Chromium 154 : image (ms) | pas (ms) | pas/s | WebKit 26.6 : image (ms) | pas (ms) | pas/s |
|---|---|---|---|---|---|---|
| 10⁴, principal, pixels | 8,3 / 12,5 | 8,2 | 127 | 16 / 16 | 5 | 64 |
| 10⁴, principal, chemin | 8,3 / 12,5 | 8,2 | 121 | 16 / 16 | 5 | 64 |
| 10⁴, worker, pixels | 4,2 / 4,3 | 7,2 | 116 | 15 / 16 | 5 | 66 |
| 10⁴, worker, chemin | 4,2 / 4,3 | 7,2 | 111 | 16 / 16 | 5 | 64 |
| 10⁴, OffscreenCanvas | 4,3 / 12,6 | 7,2 | — | indisponible | — | — |
| 10⁵, principal, pixels | 58 / 67 | 56 | 17,5 | 62 / 64 | 47 | 17,6 |
| 10⁵, principal, chemin | 63 / 75 | 53 | 15,6 | 122 / 126 | 42 | 8,3 |
| 10⁵, worker, pixels | 4,2 / 4,3 | 53 | 17,4 | 15 / 16 | 40 | 19,9 |
| 10⁵, worker, chemin | 4,2 / 62 | 51 | 15,2 | 80 / 89 | 39 | 12,4 |
| 10⁵, OffscreenCanvas | 50 / 58 | 49 | — | indisponible | — | — |

Lecture :
- À 10⁴ agents, toutes les combinaisons tiennent le critère de rendu sur les deux moteurs.
- À 10⁵ agents, seul le calcul en worker avec dessin par pixels garde un affichage fluide, mais la simulation n'avance qu'à 17 à 20 pas par seconde. Le chemin Canvas 2D s'effondre dans WebKit.
- **Variabilité :** le pas médian du jouet à 10⁴ agents vaut 4,2 à 4,6 ms au repos (essai à blanc, bancs Node), contre 7,3 à 8,2 ms pendant la mesure longue. Le seuil de 8 ms est donc sensible à l'état d'alimentation du poste.
- Résolution des horloges : 0,1 ms dans Chromium, 1 ms dans WebKit (sans isolation cross-origin).

## 4. SPK10 : noyaux headless et balayages estimés

Médiane de 5 essais sous Node, un fil. Les noyaux sont des gabarits de coût (`bancs.ts`), pas les modèles publiés. Les estimations supposent 23 travailleurs à efficacité parfaite et des nombres de combinaisons marqués « supposés » quand la source ne les fixe pas : ce sont des ordres de grandeur, pas des engagements.

| Noyau (projet) | Débit mesuré | Balayage estimé | ≤ 24 h |
|---|---|---|---|
| Treillis 3D, type [Khuong et al. 2016] (P9) | 5,1×10⁷ déplacements/s | 3,1 h (2,6×10¹¹ déplacements × 10 simulations × 5 durées de vie supposées) | oui |
| SSA de M1c, N = 200 (P5) | 1,6×10⁷ réactions/s | < 1 s (200 runs × 20 cellules supposées) | oui |
| Voisinage en O(N²), type [Couzin et al. 2002] (P6) | 6,9×10⁸ paires/s (borne basse du coût réel) | 9 s (100 combinaisons supposées) | oui |
| Grille et sondes, type [Aswale et al. 2022] (P6) | 2,1×10⁹ mises à jour/s; 3,6×10⁷ lectures bilinéaires/s | 7 min (200 runs) | oui |
| Vicsek, N = 10⁴ (P9) | 239 pas/s | 4 min (20 graines × 20 valeurs de η supposées) | oui |

Le seul noyau qui se compte en heures est celui de Khuong; il reste précalculé (05 §11).

## 5. Ce que le spike n'a pas pu mesurer

- **Firefox.** Le build Playwright (Firefox 155.0) ne démarre pas. Windows renvoie « configuration côte-à-côte incorrecte » et le journal des applications nomme l'assembly dépendant `mozglue` introuvable, alors que `mozglue.dll` est présent. Ce n'est pas un contrôle de sécurité : Smart App Control est désactivé, et WebKit, tout aussi non signé, démarre. WSL (Ubuntu 24.04) n'a ni Node Linux ni les bibliothèques de Firefox, et les installer demande `sudo`. Trois voies de rattrapage, au choix du chercheur :
  1. installer Firefox officiel et lui faire charger la page, qui renverrait ses résultats au serveur local;
  2. installer Node et les dépendances de Firefox dans WSL;
  3. réessayer sur une build stable de Windows.
- **Cible B (artifact).** Elle n'a pas été publiée : il aurait fallu lire ses résultats dans le bac à sable de claude.ai et employer la capacité `downloads`, ce que ce spike n'a pas monté. Ce qu'on sait : la page fait 14,7 Ko (worker compris), très loin de la limite de 16 Mo, et le worker `blob:` ne dépend d'aucun fichier de support. B reste à mesurer avant la première page publiée en artifact; son échec ne bloque pas (05 §12).
- **Politique de sécurité de contenu.** La cible A est servie sans en-tête CSP, comme un hébergement statique ordinaire. Un hébergeur qui interdirait `blob:` dans `worker-src` ferait basculer D2 sur le fichier de support, qui fonctionne aussi.
- **Page masquée sans affichage.** Une seconde page au premier plan ne masque pas la première dans un navigateur sans affichage (`visibilityState` reste `visible`). La condition « page masquée » de SPK6 a donc été mesurée dans le navigateur intégré, réellement masqué : une seule image rendue, mais le pas 1 000 est atteint en 0,36 s avec la même empreinte (`cb3d388e73a2449d`).

## 6. E0.5 : fonctions `Math` entre moteurs

Sorties différentes de Node, bit à bit, sur 10⁶ entrées par fonction (protocole §3) :

| Fonction | Chromium 154 | WebKit 26.6 |
|---|---|---|
| `exp` | 97 391 | 94 729 |
| `log` | 9 307 | 9 277 |
| `pow`, exposant entier | 0 | 231 527 |
| `pow`, exposant réel | 0 | 323 |
| `sin` | 34 057 | 23 132 |
| `cos` | 33 601 | 23 339 |

Lecture :
- **V8 n'est pas V8.** Chrome 154 et Node 24 n'ont pas la même version de V8 et diffèrent sur `exp`, `log`, `sin` et `cos`. Vérification ponctuelle : `Math.exp(-7.89)` vaut 0.00037446957498607833 dans Chrome 152 et 0.0003744695749860784 dans Node, un ulp d'écart. L'identité N1 exige donc la même version du moteur, pas seulement la même famille, ce que 05 §7.1 dit déjà.
- **WebKit diffère aussi sur `pow`**, même à exposant entier. La règle de 05 §7.1 (exposant entier écrit en multiplications) est confirmée nécessaire.
- **Le jouet n'est pas touché :** son empreinte reste identique à celle de Node à chacun des 1 000 pas sur Chromium 154 et WebKit 26.6, et au pas 1 000 sur Chromium 152 (seul pas vérifié). Son état en `Float32Array` arrondit ces écarts d'un ulp en double. Un modèle à état `Float64Array` qui emploie ces fonctions divergera entre moteurs : c'est le régime N2 attendu.
- La règle de la fiche S0 s'applique (E0.5 : sorties différentes > 0) : les constantes dérivées se précalculent sous Node et s'écrivent en littéraux dans le scénario compilé.

## 7. Décisions proposées (D1 à D5)

| Décision | Proposition | Fondement |
|---|---|---|
| D1 Hébergement | Cible A retenue (page statique). Cible B : à mesurer avant la première page publiée en artifact | SPK1, SPK2, SPK3, SPK7 réussis sur A; SPK9 (14,7 Ko) |
| D2 Worker | Worker créé depuis une URL `blob:` (bundle injecté dans la page), repli sur un fichier publié à côté de la page; transfert de tampons, sans `SharedArrayBuffer` | SPK2, SPK3 (pas d'isolation cross-origin) |
| D3 Rendu | Calcul dans le worker, dessin par écriture de pixels et `putImageData` sur le fil principal. Le chemin Canvas 2D convient à 10⁴ agents, pas à 10⁵ dans WebKit; OffscreenCanvas est absent du WebKit testé | SPK5, section 3 |
| D4 WASM | Non, pour tous les noyaux mesurés | aucun budget dépassé à 10⁴; balayages sous 24 h (SPK10); à 10⁵, le coût vient de l'algorithme, et la page peut déclarer une vitesse réduite |
| D5 N interactif | 10⁴ agents en direct pour les modèles à agents de type Vicsek (P9) et pour P6 (Couzin et al. 2002 : N = 100; Aswale et al. 2022 : n = 1 024). 10⁵ seulement en worker, avec une vitesse de simulation réduite affichée (≈ 15 à 20 pas/s), ou en précalculé. Khuong et al. 2016 précalculé. P1, P5 et P8 : charges négligeables, en direct | SPK4, SPK5, SPK10 |

## 8. Suites

1. **Registre des déviations.** Entrée pour SPK8 : Firefox absent, clause limitée à Node, Chromium et WebKit (CS0.2). Elle s'inscrira quand le chemin du registre de S0 sera fixé (tâche G-01 du [suivi](../../notes/suivi-feuille-de-route.md)).
2. Rattraper Firefox par l'une des voies de la section 5, puis relancer `node spikes/phase0/mesurer.ts firefox`.
3. Mesurer la cible B avant la première page publiée en artifact.
4. Écrire le gabarit de page (UC-010 à UC-012) sur les choix D2 et D3 une fois rendus.

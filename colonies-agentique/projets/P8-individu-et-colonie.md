# P8 — Individu et colonie : intelligence individuelle contre intelligence collective

**Fiche de projet** · phase 1 · régime **production** (le chercheur va agir sur ce document) · 2026-10-01 · français canadien (termes techniques et identifiants en anglais).

Cette fiche se conforme au [cadre de recherche](../docs/00-cadre.md), qui prime; les tensions relevées sont listées à la fin de la section « Risques et réserves ». Sources : le [dossier de recherche P8](../recherche/dossiers/p8-individu-colonie.md) (« le dossier » : équations, paramètres, cibles chiffrées, réserves; modèles désignés M1 à M14 comme dans le dossier) et les audits [lacunes](../docs/annexes/audit/lacunes.md), [bio-fourmis](../docs/annexes/audit/bio-fourmis.md) et [bio-abeilles](../docs/annexes/audit/bio-abeilles.md), qui ne sont jamais modifiés. Bibliographie : [bibliographie consolidée](../docs/11-bibliographie.md).

**Légende.** Lecture dans le dossier : **[T]** texte intégral, **[R]** résumé, **[M]** métadonnées, **[S]** source secondaire, **[I]** inférence ou calcul de l'auteur du dossier (toute valeur lue sur une figure en fait partie). **[à confirmer]** : valeur non confirmée dans un texte. **[non vérifiée]** : référence non confirmée. Statuts épistémiques (cadre) : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. Les identifiants H8.1 à H8.9, T8.1 à T8.15 et E8.1 à E8.5 reprennent ceux du dossier sans changement. **T8.16** et les risques **R8.k** sont créés par cette fiche (R8.k plutôt que R<n> pour éviter une collision de numéros entre fiches; le plan de recherche renumérotera).

**Démarrage.** Prêt sans accès supplémentaire : T8.3 à T8.7, T8.10, T8.14 et E8.1. **Bloqué (porte no-go)** : T8.2, donc aussi la simulation de T8.1, H8.1 à H8.3 et E8.2, tant que le matériel supplémentaire (SI) de [Sasaki et al. 2013] n'est pas lu. Les portes sont consolidées dans la section « Livrables et critères d'achèvement ».

---

## 1. Objet et questions de recherche

**Questions du cadre servies.**

| QR du cadre | Rôle de P8 |
|---|---|
| **QR1** : à quelle difficulté de tâche un collectif de règles simples dépasse-t-il un individu fort? | Question propre à P8 (avec P7). P8 reproduit le seul résultat de fourmi qui oppose colonie et individu isolé ([Sasaki et al. 2013]), établit la théorie de l'agrégation (Condorcet, corrélation des erreurs) et livre à P7 les hypothèses H8.4 à H8.8 et la définition de « difficile » (D1 à D5). |
| QR0 : richesse du signal, selon l'environnement | Volet abeille : la valeur de l'information sociale dépend de l'habitat ([I'Anson Price et al. 2019], [Okada et al. 2014], [Beekman et Lew 2008]). On reproduit d'abord (T8.8, T8.9), on cartographie ensuite (E8.4). |
| QR3 : un orchestrateur bat-il l'émergence? | Chaque volet agentique inclut un témoin orchestré (E8.5, exécuté dans P7; version synthétique dans E8.1). |
| QR4 : diversité | Identité de prédiction de la diversité (T8.5), expérience de Hong et Page (T8.6), qualité contre diversité (H8.8). |
| QR2 : échecs | Verrouillage par rétroaction positive sur tâche facile ([Sasaki et al. 2013]) et conformité; la taxonomie des échecs reste à P6. |

**Rôle dans le programme.** P8 est le seul projet qui traite directement l'intelligence **individuelle** (absente de la v3 : constat L01, critique, dans l'audit [lacunes](../docs/annexes/audit/lacunes.md)). Il est de phase 1 et alimente P7, qui dépend de ses résultats reproduits (cadre, section « Architecture du programme »). Il fournit aussi la décomposition de G en agrégation et interaction (cadre, section « Construits mesurables »).

**Questions du projet.** (a) À quelle difficulté, au sens D1 à D5 ci-dessous, un collectif dépasse-t-il un individu? (b) Quelle part du gain collectif tient à l'agrégation (effet du vote) et quelle part à l'interaction (effet de la communication)? (c) Quand l'information privée l'emporte-t-elle sur l'information sociale, chez la fourmi et chez l'abeille, et à quel coût en flexibilité? (d) Que transpose-t-on aux agents LLM, à budget égal, avec témoin orchestré?

**Définitions de travail** (dossier, hypothèses pour QR1). *Individu fort* : un agent qui traite seul toute la tâche avec le budget B. *Collectif* : N agents à règles locales, budget total B. *Budget* : jetons, appels et latence rapportés pour les agents LLM. *Difficulté* : D1 à D5, toujours déclarée. Dans [Sasaki et al. 2013], l'« individu » est une ouvrière présélectionnée (elle rapporte du couvain) opposée à une colonie de 20 à 250 ouvrières [T] : ce résultat **n'est pas à budget égal** et ne tranche donc pas QR1 tel que le cadre la pose.

**Cinq sens de « difficile »** (typologie du dossier, M13; **[I]** : c'est un classement de l'auteur du dossier, pas un résultat publié).

| Code | Définition | Sources | Effet observé du collectif |
|---|---|---|---|
| D1 | Discriminabilité : petite différence entre options, bruit non biaisé | [Sasaki et al. 2013] | La colonie dépasse l'individu |
| D2 | Biais systématique : le mode de la réponse est faux (précision par item inférieure à 1/2) | [Chen et al. 2024] | Le vote nuit |
| D3 | Capacité relative : précision de l'agent seul | [Kim et al. 2025a] (seuil ≈ 45 %), [Snell et al. 2024], [Li et al. 2024] | Coordination utile sous le seuil, nuisible au-dessus; calcul au test préférable sur les questions faciles et intermédiaires |
| D4 | Structure et horizon : étapes séquentielles, dépendances | [Kim et al. 2025a] (−39 % à −70 % en planification), [Li et al. 2024] (gain croissant avec le nombre d'étapes) | Multi-agents nuisible en séquentiel; gain croissant sur tâche décomposable |
| D5 | Surcharge : nombre d'options à évaluer | [Sasaki et Pratt 2012], [Nicolis et al. 2011] | Colonie robuste (≈ 90 % avec 2 ou 8 nids [S]); optimum de la rétroaction dépendant du nombre d'options |

**Hors périmètre.** Aucune validation contre des données empiriques (la réplication d'un modèle n'est pas sa validation : cadre, section « Principes de rigueur »); aucun appel d'API dans P8 lui-même (c'est P7, via E8.5); aucune expérience nouvelle sur des insectes ou des humains; aucune cible chiffrée sur l'odomètre de l'abeille (controverse non tranchée).

---

## 2. Positionnement

| Axe | Existant publié | P8 reproduit | P8 ajoute |
|---|---|---|---|
| **Colonie contre individu isolé (fourmi)** | [Sasaki et al. 2013] (*Temnothorax rugatulus*, luminosité des nids; chaîne de Markov); [Sasaki et Pratt 2011]; [Sasaki et Pratt 2012] (2 contre 8 nids); [Sasaki et al. 2018] (évaluation parallèle ou comparative); [Edwards et Pratt 2009]; [Nicolis et al. 2011]; synthèses [Sasaki et Pratt 2018] et [Feinerman et Korman 2017] | T8.1 (ajustement psychométrique) et T8.2 (courbes de la Fig. 3) : **bloquée** | Décomposition agrégation/interaction (n_eff; H8.3, E8.2); test de la cause de l'échec colonial aux grandes différences (H8.2); borne de G |
| **Information privée contre sociale (fourmi, abeille)** | [Grüter et al. 2011] (*Lasius niger*); [Grüter et al. 2008] (abeille); [Czaczkes et al. 2015]; [Grüter et al. 2010] [non vérifiée] | T8.7 | Poids adaptatifs et indicateur de cascade en environnement dynamique (E8.3); lien avec [P1](P1-recrutement-verrouillage.md) |
| **Valeur de la danse selon l'habitat (abeille)** | [I'Anson Price et al. 2019]; [Okada et al. 2014]; [Beekman et Lew 2008]; [Sherman et Visscher 2002]; [Donaldson-Matasci et Dornhaus 2012]; [Dornhaus et Chittka 2004] | T8.8, T8.9 (relationnel) | Grille densité × durée de vie × erreur angulaire (E8.4); H8.9 |
| **Décision d'essaim : indépendance et interdépendance (abeille)** | [List et al. 2009]; [Marshall et al. 2009] (borne séquentielle); [Seeley 2010] et [Seeley et Buhrman 2001] (non lus dans le dossier) | T8.16 (créée par cette fiche) | Pont avec le jury corrélé (E8.1) et la cascade par imitation pure |
| **Cognition individuelle de l'abeille** | [Esch et al. 2001]; [Menzel et al. 2005]; [Giurfa et al. 2001]; [Dong et al. 2023]; [Tautz et al. 2004], mis en cause par [Luebbert et Pachter 2024] | T8.15 (non chiffrée); **aucune** cible d'odomètre | Individu « riche » paramétré par des curseurs étiquetés « débattu » ou « contesté », jamais par une valeur de calibration |
| **Agrégation de jugements (théorie)** | [Condorcet 1785]; [Dietrich et Spiekermann 2021]; [Dietrich et Spiekermann 2013]; [Ladha 1992]; [Krogh et Vedelsby 1995]; [Page 2007]; [Hong et Page 2004]; [Thompson 2014]; [Grim et al. 2019]; [Romaniega 2023]; [Galton 1907]; [Wallis 2014]; [Lorenz et al. 2011] | T8.3 à T8.6, T8.14 | Plafond du jury sous corrélation des erreurs (T8.4, **[I]**); critère complémentaire de [Thompson 2014]; corrections de citations (section « Risques et réserves ») |
| **Collectif faible contre agent fort (LLM)** | [Li et al. 2024]; [Wang et al. 2023]; [Wang et al. 2024a]; [Chen et al. 2024]; [Li et al. 2025a]; [Kim et al. 2025a]; [Kim et al. 2025b]; [Snell et al. 2024]; [Kapoor et al. 2025]; [Brown et al. 2024]; [Wu et al. 2024a]; [Hadfield et al. 2025]; [Choi et al. 2025a]; [Chen 2026] | T8.10 (P8); T8.11 à T8.13 (différées à P7) | Carte (p_w, ρ, K) du jury à coût égal (E8.1); réconciliation des cinq sens de « difficile » (**[I]**, à tester); E8.5 avec témoin orchestré |

**Asymétrie fourmi/abeille (cadre : parité à justifier).** Le dossier n'a trouvé, chez l'abeille, aucun plan « colonie contre individu isolé » équivalent à celui de [Sasaki et al. 2013] (recherche non exhaustive; **[I]**). Les comparables sont [I'Anson Price et al. 2019] (colonie avec ou sans information de danse), [Grüter et al. 2008] (individu devant une danse) et [List et al. 2009] (modèle d'essaim). Le contraste « avec ou sans canal » n'est pas le contraste « un contre N » : la parité porte donc sur le niveau d'exigence (modèle nommé, cible chiffrée ou relationnelle, visuel), pas sur le plan expérimental. À lever par la lecture de [Seeley et Buhrman 2001] et de [Seeley 2010] (R8.14).

---

## 3. Hypothèses falsifiables

Les énoncés, effets minimaux et critères de réfutation viennent du dossier (section des hypothèses pour QR1). Les colonnes « variables » et « statut » sont ajoutées par cette fiche. d = différence de qualité en % = (q_A − q_B)/q_A (**[I]** : lecture de l'axe de la Fig. 3). ΔP = différence de probabilités de bon choix.

| ID | Énoncé (direction) | Variables indépendantes → dépendantes | Effet minimal | Critère de réfutation | Statut |
|---|---|---|---|---|---|
| **H8.1** | Dans le modèle de [Sasaki et al. 2013] (Éq. 2–3, c = 1,1, N = 100), ΔP = P_col − P_ind est positif aux petites différences et négatif aux grandes, avec **un seul** croisement d* dans [50 ; 70] % | d ∈ [5 ; 99] %, type d'agent (individu, colonie) → ΔP(d), d* | ΔP ≥ +0,04 pour d ≤ 20 % et ≤ −0,02 pour d ≥ 80 % (publié : +0,06 et −0,03 à −0,04, **[I]**) | Aucun changement de signe sur d ∈ [5 ; 99] %, ou d* hors de [40 ; 80] %, avec ≥ 2 000 colonies et ≥ 20 000 individus par d | Confirmatoire préenregistré, **conditionné à la levée de la porte de T8.2** (sinon exploratoire sur modèle ajusté, R8.1) |
| **H8.2** | Le déficit colonial aux grandes différences vient de la rétroaction positive : ΔP(d = 90 %) décroît de façon monotone quand c passe de 0 à 2 et vaut ≥ −0,01 à c = 0 (la colonie se réduit alors à un vote d'individus indépendants, donc ≥ 0 par Condorcet) | c ∈ [0 ; 2] → ΔP(90 %) | ΔP(90 %) ≤ −0,03 à c = 2 | ΔP(90 %) ≤ −0,02 à c = 0 (déficit sans rétroaction), ou non-monotonie | Idem H8.1 |
| **H8.3** | **Agrégation contre interaction** : à N = 7 votants, le vote d'individus indépendants du modèle de l'Éq. 2 bat la colonie à quorum, soit G_int = P_col − P_vote(7) ≤ −0,03 à tout d ∈ [5 ; 99] % (attendu de −0,04 à −0,14 d'après la Fig. 3 numérisée; n_eff de 3 à 5, **[I]**) | d, type d'agent (colonie, jury de 7) → G_int | Valeur absolue de G_int ≥ 0,03 | G_int ≥ −0,01 pour un d quelconque à N = 7 (le quorum apporterait alors de l'information au-delà du vote). Dépend de T8.2 | Idem H8.1. G_int est ici une **différence de probabilités**, non le G normalisé du cadre (voir R8.6) |
| **H8.4** | Pour des agents faibles, le gain du vote de K = 5 appels est positif pour les items dont la précision estimée p̂_i est dans (0,5 ; 0,9) et négatif pour p̂_i < 0,5 ([Chen et al. 2024]) | p̂_i (estimée sur 20 échantillons distincts de ceux du vote) → gain = P_vote(5) − P_1 | Gain moyen ≥ +0,03 pour p̂ dans (0,5 ; 0,9); ≤ −0,02 pour p̂ < 0,5 | Gain moyen < +0,01 pour p̂ dans (0,5 ; 0,9) (échantillons non conditionnellement indépendants), ou gain ≥ 0 pour p̂ < 0,5; ≥ 500 items stratifiés | Confirmatoire préenregistré; exécuté dans P7 (E8.5); la version synthétique (E8.1) est exploratoire |
| **H8.5** | **Faible contre fort à budget égal** : avec K = rapport de coût, le jury de K agents faibles bat l'agent fort si et seulement si Maj_K(p_w) > p_s au niveau de l'item; ΔP est en **U inversé** selon la précision moyenne de l'agent faible : nul ou négatif pour p_w < 0,5, maximal pour p_w dans [0,55 ; 0,75], nul quand p_s tend vers 1 | p_w, p_s, K → ΔP = P_jury(K) − P_s à budget égal | ΔP maximal ≥ +0,03 pour au moins une paire (faible, fort) avec K ≥ 5 | ΔP ≤ +0,01 pour toutes les paires et tous les K ≤ 20, ou ΔP monotone en p_w | Idem H8.4 |
| **H8.6** | **Seuil de coordination** : à jetons égaux, ΔP = P_MAS − P_SAS décroît avec la précision de base p_SAS; ΔP = 0 pour p_SAS dans [0,35 ; 0,55] (publié : 0,45, [Kim et al. 2025a]) | p_SAS, architecture (agent seul, multi-agents) → ΔP | Valeur absolue de ΔP ≥ 0,05 aux extrémités de la plage observée de p_SAS | Pente ≥ 0 ou IC à 95 % contenant 0 sur ≥ 60 configurations et ≥ 6 tâches | Idem H8.4 |
| **H8.7** | **Interaction sans gain pour des agents homogènes** : P_débat − P_vote est dans [−0,02 ; +0,02] à jetons égaux (propriété de martingale, [Choi et al. 2025a]) | protocole (débat, vote) → P_débat − P_vote | Prédiction d'équivalence (marge ±0,02); écart d'intérêt ≥ 0,03 | ≥ +0,03 (IC excluant 0) sur ≥ 3 tâches, ou ≤ −0,03 (conformité nuisible) | Idem H8.4 |
| **H8.8** | **Qualité contre diversité** : à budget égal, N échantillons du meilleur modèle battent un mélange de N modèles dont l'écart de qualité moyen est ≥ 10 points ([Li et al. 2025a] : +6,6 points sur AlpacaEval 2.0, +3,8 en moyenne) | composition (auto-ensemble, mélange) → précision (points) | ≥ +2 points | Mélange ≥ auto-ensemble − 1 point sur ≥ 3 bancs | Idem H8.4 |
| **H8.9** | **Valeur conditionnelle de l'information sociale (abeille)** : ΔE = E_danse − E_éclaireuses est négatif à densité de parcelles 0,1 et positif à 0,01 ([I'Anson Price et al. 2019]) | densité (0,1 ; 0,01), durée de vie (5 ; 15 jours), variation (écart-type = moyenne/4 ; moyenne/10) → ΔE | Valeur absolue de ΔE ≥ 10 % de l'énergie du bras de référence, aux deux extrémités | Même signe dans les 8 cellules, ou signe inversé; ≥ 100 répétitions par cellule | Confirmatoire préenregistré, après acceptation relationnelle de T8.8 |

**Remarques.**
- **Séparation confirmatoire/exploratoire** (cadre, principe 4) : les pages interactives sont exploratoires; le préenregistrement de chaque hypothèse confirmatoire est déposé avant toute exécution qui la teste (dépôt : [science ouverte et éthique](../docs/08-science-ouverte-ethique.md)).
- **H8.1 à H8.3** : la bande prédite de d* ([50 ; 70] %) est plus étroite que la bande de réfutation ([40 ; 80] %); le publié est à 58,5 % (T8.2, **[I]**). La règle « réplication avant extension » interdit de préenregistrer H8.1 à H8.3 sur un modèle non reproduit.
- **H8.7** est une prédiction d'**équivalence** : elle se teste par TOST (voir le [protocole de reproduction](../docs/04-protocole-reproduction.md)), la zone entre 0,02 et 0,03 étant indécise.
- Les plans de H8.4 à H8.8 à jetons égaux reposent sur la contrainte de coût décrite dans E8.5; la définition de G (agrégation et interaction) se fixe dans le [plan de recherche](../docs/03-plan-de-recherche.md) et dans la fiche [P7](P7-synthese-agentique.md).

## 4. Modèles de référence

Un modèle de référence par article, validé contre la figure ou le tableau publié, avant toute extension (cadre, principe 1). Les « préréglages » sont des identifiants proposés par cette fiche; leur format final relève de la [spécification de simulation](../docs/05-spec-simulation.md).

### 4.1 Vue d'ensemble (parité de taxons)

| Modèle (dossier) | Taxon ou objet | Préréglage | Type | Intégration | Cibles | Lecture |
|---|---|---|---|---|---|---|
| M1 | *Temnothorax rugatulus* (fourmi) | `tem-rug-sasaki2013` | Chaîne de Markov à états finis; règle de quorum (Hill, exposant 2) | Probablement temps continu (le texte parle de taux) **[I]** : SSA de Gillespie du noyau; sinon pas fixe. **SI non lu** | T8.1, T8.2 | [T] sauf SI |
| M11 | *Lasius niger* (fourmi) | `las-nig-grueter2011` | Agent-décision à choix binaire (modèle **original**, calibré sur les proportions publiées; la source ne publie pas de modèle) | Une décision par agent; tirage de Bernoulli | T8.7 | [T] (plan et statistiques) |
| M10 (a) | *Apis mellifera* (abeille, butinage) | `api-mel-ansonprice2019` | Modèle à agents, adapté de [Schürch et Grüter 2014] (code non lu) | Pas de temps journalier **[à confirmer]**, 18 jours simulés | T8.8 | [T] texte; code non lu |
| M10 (b) | *Apis mellifera* (butinage) | `api-mel-okada2014` | Simulation d'une journée de butinage avec erreur angulaire de la danse | **[à confirmer]** (texte intégral requis) | T8.9 | [R] |
| M10 (c) | *Apis mellifera* (apprentissage de la danse) | `api-mel-dong2023` | Encodage appris par exposition (modèle à créer) | — | T8.15 | [R] |
| M9 | *Apis mellifera* (essaim) | `api-mel-list2009` | Modèle à agents d'éclaireuses | Tours discrets **[à confirmer]** | T8.16 | [T] |
| M2 | Théorie (aucun taxon) | `jury-condorcet`, `jury-betabinomial` | Analytique + Monte Carlo | Formule exacte; tirages indépendants | T8.3, T8.4 | [S]; énoncé lu dans [Dietrich et Spiekermann 2021] [T] |
| M3 | Théorie | `identite-diversite` | Identité algébrique | Exact | T8.5 | [T] |
| M4 | Problème-jouet de [Hong et Page 2004] | `hong-page-anneau` | Recherche locale sur anneau, équipes en relais | Déterministe pour V donné | T8.6 | [T] |
| M5 | Agents LLM (abstrait) | `vote-mixte-chen2024` | Analytique + Monte Carlo | F(K) exact (fonction bêta incomplète) | T8.10 | [T] |
| M6, M7 | Agents LLM | `vote-li2024`, `echelle-kim2025` | Appels d'API (P7) | — | T8.11, T8.12 | [T] |
| (sans M) | Humains (données historiques) | `galton1907` | Simulateur d'estimations à deux composantes | Monte Carlo | T8.14 | [T] |

### 4.2 Fourmi

#### M1 — *Temnothorax rugatulus* : [Sasaki et al. 2013] (préréglage `tem-rug-sasaki2013`)

**Dispositif** [T] (Méthodes) : nid de référence constant à 1 lux (très préféré); nid de comparaison plus clair, donc moins bon, à 7, 14, 20, 28, 39, 56 ou 112 lux; cavité de 38 mm, entrée de 2 mm, balsa de 2,4 mm entre deux lames de verre, filtres neutres. *Individu* : 12 h d'acclimatation, toit retiré, choix lu à 12 h (nid contenant le couvain). *Colonie* : choix lu quand plus de 90 % des membres sont dans un nid. Chaque sujet est testé aux 7 niveaux (4 ordres). Effectifs rapportés : 106 essais individuels et 112 essais coloniaux, après exclusion de 12 essais individuels (échec à rejoindre un nid cible) et de 10 essais coloniaux (9 scissions, 1 colonie sans déplacement). Colonies de 20 à 80 ouvrières (petites) et de 150 à 250 (grandes); individus **présélectionnés** parmi les ouvrières qui rapportent du couvain, issus de colonies de 100 à 130 ouvrières. Incohérence de l'article : 32 colonies pour les tests coloniaux, mais aussi 16 colonies testées chacune aux 7 niveaux (16 × 7 = 112 essais); effectif exact de colonies **[à confirmer]** (SI).

**Équations telles qu'imprimées** (Résultats; [T], lues en image).

```
Éq. 1  P(choix correct) = 0,5 + 0,5 · λ / (1 + exp(−(x − α)/β))        (courbe ajustée aux données)
Éq. 2  p_A(i) = q_A                                                      (fourmi isolée, q_A > q_B)
       p_B(i) = q_B · ( 2 q_B / (q_B + q_A) )^i
Éq. 3  p_A(i) = q_A + c · N_A² / (N_A² + T²)                             (colonie, quorum)
       p_B(i) = q_B · ( 2 q_B / (q_B + q_A) )^i + c · N_B² / (N_B² + T²)
```

x = différence de luminosité (lux); i = nombre de comparaisons déjà faites entre A et B (chacune réduit l'acceptation du nid inférieur et laisse inchangée celle du meilleur); N_A, N_B = population au site (fourmis engagées + 20 % des fourmis en évaluation); T = seuil de quorum; c = poids de l'information sociale (c = 0 : fourmi isolée). La forme de Hill d'exposant 2 est cohérente avec le critère k ≥ 2 de [Sumpter et Pratt 2009] (voir [P5](P5-decision-par-quorum.md)).

| Paramètre | Valeur publiée | Unité | Localisation | Lecture |
|---|---|---|---|---|
| q_A | 0,20 | sans dimension (probabilité d'accepter le site, Éq. 2) | Légende de la Fig. 3 | [T] |
| q_B | de 0,19 à 0,001 | sans dimension | Légende de la Fig. 3 | [T] |
| d = (q_A − q_B)/q_A | de 5 % (q_B = 0,19) à 99,5 % (q_B = 0,001) | % | Axe de la Fig. 3 | **[I]** |
| c | 1,1 (non optimisé) | sans dimension | Légende de la Fig. 3; limites | [T] |
| Population simulée | 100 | fourmis | Légende de la Fig. 3 | [T] |
| Critère de décision du modèle | plus de 50 % des fourmis dans les états a ou b | — | Légende de la Fig. 3 | [T] |
| T (seuil de quorum) | **non lu** | fourmis **[à confirmer]** | SI, Tables S2 à S4 | — |
| Taux de transition (états Exploring, A, B, CA_i, CB_i, a, b) | **non lus** | par unité de temps **[à confirmer]** | SI, Tables S2 à S4 | — |
| α_col ; α_ind | 7,4 ; 32,3 (puis 6,6 ; 30,9 avec données ajoutées près du croisement) | lux | Résultats, Éq. 1 | [T] |
| λ_col ; λ_ind | 0,80 ; 0,93 (puis 0,78 ; 0,89) | sans dimension | Résultats, Éq. 1 | [T] |
| β | non relevé dans le dossier | lux | Éq. 1 | **[à confirmer]** |
| Asymptotes lues sur la Fig. 2A | ≈ 0,80 (colonies) ; ≈ 0,915 (individus) | probabilité | Fig. 2A | **[I]** |

**Limites déclarées** [T] : c n'est pas optimisé; une part du déficit colonial aux tâches faciles tient au compromis vitesse-précision; l'effet de la taille de colonie est **non significatif** (SI, Fig. S2). Le texte ne déclare pas que individu et colonie sont comparés à échelle inégale : c'est une observation du dossier (**[I]**), non un aveu des auteurs.

**Incohérence de l'Éq. 1 : confirmée et non tranchée.** L'équation imprimée donne une asymptote 0,5 + 0,5·λ, soit 0,90 (colonies) et 0,965 (individus) pour les λ rapportés; la Fig. 2A montre ≈ 0,80 et ≈ 0,915. Soit λ désigne l'asymptote elle-même et l'équation est typographiée autrement (lecture a), soit λ est bien un facteur appliqué à 0,5 et la Fig. 2A s'en écarte (lecture b). Les valeurs de λ sont, elles, confirmées dans le texte. Le SI (Table S1) tranche; en attendant, les deux lectures restent ouvertes dans le code (R8.2).

**Conséquences pour le plan.**
1. **T8.2 est bloquée (porte no-go)** : sans T ni taux de transition, la chaîne ne peut pas être codée. Le pré-test du dossier montre que l'Éq. 2 seule, avec alternance A/B simple, ne reproduit pas la courbe individuelle (écart jusqu'à 0,06 à d = 40 %) : la structure de la chaîne se trouve dans le SI et ne se devine pas.
2. **Dépendances** : la simulation de T8.1 (la correspondance entre lux et q n'apparaît pas dans le texte lu **[I]**), H8.1 à H8.3, E8.2 et les visuels 1 et 2 attendent la levée de la porte. T8.1 peut avancer en deux temps : ajustement de l'Éq. 1 sur les points numérisés de la Fig. 2A, sous les lectures (a) et (b) (sans simulation); simulation du protocole après le SI.
3. **Les deux lectures ne se départagent pas par le critère d'asymptote de T8.1** : l'écart d'asymptotes est 0,13 sous (a) et 0,065 sous (b) (**[I]**, calcul de cette fiche sur les valeurs ci-dessus), tous deux dans la bande [0,05 ; 0,20]. Seules la Table S1 ou une numérisation de la Fig. 2A, ajustée sous chaque lecture, les départagent.
4. **Autre point à vérifier dans le SI** : le critère de décision du modèle (plus de 50 %) diffère de celui de l'expérience (plus de 90 %) (**[I]**).
5. **Plan B** (R8.1) : un modèle aux taux ajustés sur les courbes numérisées serait un *ajustement*, non une réplication; H8.1 à H8.3 passeraient en exploratoire et les visuels porteraient « Modèle simplifié, paramètres ajustés ».

#### M11 — *Lasius niger* : [Grüter et al. 2011] (préréglage `las-nig-grueter2011`)

Aucun modèle publié : plan et statistiques seulement [T]. Carrefour en T (tronc de 15 cm, branches de 11 cm); colonies sans reine de 700 à 1 500 ouvrières. Exp. 1 : 6 colonies, 0 à 4 visites antérieures. Exp. 2 : 8 colonies, 1, 5 ou 20 passages de piste. Exp. 3 : 7 colonies, 176 fourmis, quatre combinaisons mémoire-piste (conflit). Exp. 4 : contrôle de la communication dans le nid. Exp. 5 : temps de décision. Statistiques : GLMM binomial avec la colonie en effet aléatoire, tests de Wald. **Modèle de P8 (original)** : agent à poids mémoire w_p(visites) et poids social w_s(passages); la forme fonctionnelle qui combine les deux n'est pas publiée et se fixe dans la fiche de reproduction, avant le code (cadre, principe 2), puis se calibre sur les proportions de T8.7. Statut : *Modèle simplifié*.

### 4.3 Abeille

**Parité.** Chaque projet traite les deux espèces au même niveau d'exigence; les écarts de lecture ci-dessous sont déclarés, pas masqués.

#### M10 (a) — *Apis mellifera* : [I'Anson Price et al. 2019] (préréglage `api-mel-ansonprice2019`)

[T] (texte HTML; chiffres retrouvés à la vérification indépendante). Expériences : E1, 12 colonies (15 000 à 20 000 ouvrières), de juin à août 2014; E2, 4 ruches d'observation (≈ 3 000 ouvrières), 2016; E3, 8 colonies, 2017 (contrôle verticales/lumière); Université de Lausanne (27,9 % bâti, 23,6 % agricole, 9,2 % bois, 39,3 % improductif). Danses désorientées par cadres horizontaux et filtres rouges : 58,5 % de danses désorientées (n = 74) contre 98,3 % de danses orientées (n = 67) (groupes comparés **[à confirmer]** dans l'article). Résultat empirique : perte de poids de −0,134 kg/j (colonies à danses orientées) contre −0,101 kg/j (désorientées), χ² = 24,22, p < 0,0001. Le résultat est propre à un habitat tempéré pauvre; les auteurs jugent la danse probablement utile au printemps : ne jamais écrire « la danse nuit ».

| Paramètre du modèle à agents (Résultats « model »; Fig. 4) | Valeur publiée | Unité |
|---|---|---|
| Stratégie | SI (information sociale) contre NI (éclaireuses sans information sociale) | — |
| Densité de parcelles | 0,01 ou 0,1 | unité de densité **[à confirmer]** |
| Âge moyen des parcelles | 5 ou 15 | jours |
| Concentration du nectar | 0,5 | M |
| Rendement | 25 | µl **[à confirmer : par visite]** |
| Écart-type | moyenne/10 ou moyenne/4 | de la moyenne |
| Durée simulée | 18 | jours |
| Répétitions publiées | 10 par combinaison | — |
| Variable de sortie | énergie totale récoltée | unité d'énergie **[à confirmer]** |

Le code de [Schürch et Grüter 2014] (origine du modèle) n'a pas été lu : le modèle est à **réécrire** d'après l'article (R8.7).

#### M10 (b) — *Apis mellifera* : [Okada et al. 2014] et [Beekman et Lew 2008]

[R] seulement. [Okada et al. 2014] : simulation d'une journée de butinage; erreur angulaire de la danse de 10° à 15° en bordure inférieure des erreurs réelles; à 30° et plus, la danse n'est pas bénéfique; à 15°, bénéfique si les sources sont rares; à 10° et moins, bénéfique dans toutes les conditions testées; 0° à 5° maximise la découverte des sources connues mais fait échouer celle des nouvelles. [Beekman et Lew 2008] : la danse paie quand la probabilité de découverte indépendante est faible (parcelles petites ou lointaines); son principal avantage est de ne butiner que les meilleures parcelles. Paramètres des deux modèles : **non lus**, texte intégral requis (T8.9 en porte no-go).

#### M10 (c) — *Apis mellifera* : [Dong et al. 2023]

[R] seulement : des abeilles sans suivi préalable de danses dansent avec plus de désordre et d'erreurs d'angle et encodent la distance de façon fausse; l'angle s'améliore avec l'expérience, la distance reste « fixée pour la vie ». Aucun paramètre chiffré lu; le modèle d'encodage appris est **à créer** (statut *Hypothèse de l'auteur*), T8.15 étant non chiffrée.

#### M9 — *Apis mellifera* (essaim) : [List et al. 2009] (préréglage `api-mel-list2009`)

[T] (texte HTML; chiffres retrouvés à la vérification indépendante). Modèle à agents : 200 éclaireuses; 5 sites de qualités 3, 5, 7, 9 et 10 (délibérément proches; échelle de qualité sans unité **[à confirmer]**); fiabilité individuelle σ (0,2 haute; 1,0 basse); poids d'interdépendance λ (de 0 à 1); probabilité d'imitation sans inspection μ (de 0 à 1); 250 essais par condition. Les règles de mise à jour détaillées ne sont pas reprises dans le dossier : relire la section Méthodes avant de coder (R8.7). Texte : le modèle étend Condorcet à une interaction qui crée de la dépendance.

#### Individu « riche » de l'abeille (aucune cible chiffrée)

| Capacité | Source (lecture) | Usage dans P8 | Étiquette obligatoire dans les visuels |
|---|---|---|---|
| Odométrie par flux optique, transmise par la danse | [Esch et al. 2001] [R] (en tunnel étroit, distance exagérée); [Tautz et al. 2004] [T]; [Srinivasan et al. 2000] [M] | Curseur « bruit d'odométrie », **sans valeur par défaut empirique** (valeur de démonstration marquée « illustrative ») | « Contesté » : [Luebbert et Pachter 2024] (prépublication non évaluée par les pairs) contre [Srinivasan et al. 2024] [R], [Srinivasan 2025] et [Stuart 2025] [M] |
| Mémoire spatiale de type carte | [Menzel et al. 2005] [R]; [Cheeseman et al. 2014] [R]; [Cheung et al. 2014] [M] | Curseur « navigation », sans valeur chiffrée | « Débattu » |
| Concepts « pareil » et « différent » | [Giurfa et al. 2001] [R] | Mentionné au niveau Vérifier; non modélisé | Chiffres à lire dans le texte intégral avant tout usage |
| Apprentissage social de la danse | [Dong et al. 2023] [R] | M10 (c), T8.15 | « Résumé seulement » |

### 4.4 Théorie, problème-jouet et agents

#### M2 — Condorcet, indépendant et corrélé (T8.3, T8.4)

```
P_n(p) = Σ_{k=(n+1)/2..n} C(n,k) p^k (1−p)^(n−k)          n impair, votes indépendants, p > 1/2
Bêta-binomial [I] : a = p(1−ρ)/ρ ; b = (1−p)(1−ρ)/ρ
P_n = Σ_{k>n/2} C(n,k) B(k+a, n−k+b) / B(a,b) ;  limite n → ∞ : P(Beta(a,b) > 1/2)
```

Théorème : [Dietrich et Spiekermann 2021] [T] (indépendance et compétence p > 1/2; la fiabilité tend vers 1). Sous causes communes, la limite est inférieure à 1 ([Dietrich et Spiekermann 2013] [S]; [Dietrich 2008] [M] : les prémisses ne sont pas justifiées simultanément; [Ladha 1992] [R] : votes corrélés). Le modèle bêta-binomial est un choix de l'auteur du dossier (**[I]**), un modèle de corrélation parmi d'autres. Taille de groupe optimale finie sous hétérogénéité : [Boland 1989] et [Karotkin et Paroush 2003] [M]. Paramètres : p (précision individuelle, sans dimension), ρ (corrélation intra-classe, sans dimension), n (votants).

#### M3 — Identité de prédiction de la diversité (T8.5)

[Krogh et Vedelsby 1995] [T] (Éq. 5, 6 et 10) : pour V̄ = Σ w_a V_a (poids positifs de somme 1), ambiguïté a(x) = Σ w_a (V_a − V̄)² et erreur e(x) = (f − V̄)² :

```
e(x) = ē(x) − a(x)        puis, moyenné sur la distribution des entrées :  E = Ē − A
```

[Page 2007] [S] la nomme « diversity prediction theorem ». C'est une **identité algébrique** : elle n'établit ni qu'une équipe diverse est meilleure ni que la diversité en est la cause.

#### M4 — [Hong et Page 2004] (T8.6)

[T] (« A Computational Experiment », Table 1; « A Mathematical Theorem »). Anneau de n = 2 000 positions, valeurs V uniformes sur [0 ; 100]. Agent = liste ordonnée (φ₁, φ₂, φ₃) d'entiers distincts de {1..l}, avec k = 3 et l = 12 (pool de 1 320) ou l = 20 (pool de 6 840). Recherche : à partir de la position i, on teste les décalages φ dans l'ordre cyclique; on avance si V augmente; arrêt après k contrôles sans amélioration. Performance d'un agent = valeur moyenne des points d'arrêt sur tous les départs. Équipe : les agents travaillent à tour de rôle jusqu'à stabilité. Résultats publiés (Table 1, 50 réplications) : l = 12, 20 agents, meilleurs 93,78 contre aléatoires 94,72; l = 20, 10 agents, meilleurs 93,52 contre aléatoires 96,08. Le théorème est trivial et sans lien avec l'expérience; l'expérience illustre l'**aléa**, non la diversité ([Thompson 2014] [T]; [Grim et al. 2019] [R]; [Romaniega 2023] [R]).

#### M5 — [Chen et al. 2024] : vote et difficulté des requêtes (T8.10)

[T] (§3, §4, §5). Notations : K appels; α fraction de requêtes faciles; p₁ > 1/2 probabilité d'un appel correct sur une requête facile; p₂ < 1/2 sur une requête difficile; |A| = 2.

```
Théorème 3 : F(K, x) = I_{(1−d_V(x))/2}((K+1)/2, (K+1)/2)  (bêta incomplète régularisée) = majorité binomiale exacte
             F(K, D_{α,p1,p2}) = α·Maj_K(p₁) + (1−α)·Maj_K(p₂)
Théorème 4 : K* = 2 · log( α/(1−α) · (2p₁−1)/(1−2p₂) ) / log( p₂(1−p₂) / (p₁(1−p₁)) )
             t = p₂(1−p₂)(½−p₂) / (p₁(1−p₁)(p₁−½)) + 1
Modèle d'échelle (§4.2) : G(K,x) = exp(−c₁K − c₂√K + c₃) si d(x) > 0 ; 1 − exp(−c₁K − c₂√K + c₃) si d(x) < 0 ; c₁ > 0, c₂ > 0, c₃ non contraint
```

**Corrections par calcul exact** (**[I]**, refaites par un code indépendant). La condition du Théorème 4 imprimée (« α < 1 − 1/t ») est **inversée**; la classification du Théorème 2 est contredite par le calcul exact pour 27 combinaisons sur 27 de la grille de la Fig. 5 (en lisant la deuxième puce « p₁ + p₂ < 1 **et** α ≤ 1 − 1/t »); contre-exemple à « F croît monotonement si p₁ + p₂ > 1 et α ≥ 1 − 1/t » : (α, p₁, p₂) = (0,6 ; 0,85 ; 0,4) donne F(3) = 0,7043 > F(∞) = 0,6. Pour p₁ + p₂ > 1 : F(3) − F(1) ≥ 0 si et seulement si α ≥ 1 − 1/t. La formule de K* est exacte à ±2 de l'optimum impair dans 79 cas sur 79 quand α > 1 − 1/t; quand α < 1 − 1/t, l'optimum est K = 1 (60 cas sur 60). Théorèmes 2 et 4 inchangés dans la version camera-ready de NeurIPS. Résultats empiriques : GPT-3.5-turbo-0125; 1 000 exécutions; MMLU Physique, TruthfulQA, GPQA, AVeriTeC; performance non monotone; requêtes « faciles » 53 % et « difficiles » 47 % sur MMLU Physique (Fig. 2). Le coût des appels n'est pas modélisé.

#### M6, M7 — [Li et al. 2024] et [Kim et al. 2025a] (P7)

*M6* [T] : N échantillons s_i = M(x); vote par similarité cumulée V(s_i) = Σ_{j≠i} sim(s_i, s_j) (fréquence d'occurrence pour les choix fermés, BLEU pour le code); A = argmax V; taille d'ensemble jusqu'à 40, moyenne de 10 exécutions (avec Debate : taille limitée à 10); Llama2-13B-Chat, Llama2-70B-Chat, GPT-3.5-Turbo, GPT-4 (seul). Tableau 2 (seul → K = 40) : GSM8K 13B 0,35 ± 0,03 → 0,59; 70B 0,54 → 0,74; GPT-3.5 0,73 → 0,85; GPT-4 0,88. Gain relatif (Tableau 6) : GSM8K 69 / 37 / 16 % et MATH 200 / 120 / 34 % pour 13B / 70B / GPT-3.5. Tâche synthétique d'isolation (§6.1) : Propriété 1 (le gain relatif croît puis décroît avec la difficulté inhérente I; il s'amenuise à I = 400), Propriété 2 (croît avec le nombre d'étapes S), Propriété 3 (la performance absolue croît avec 1/K). Aucun appariement de budget : 40 échantillons d'un modèle de 13 G contre un de 70 G ≈ 7,4 fois le coût (**[I]**).
*M7* [T] : 260 configurations; 6 bancs agentiques; 5 architectures (agent unique, indépendant, centralisé, décentralisé, hybride); 3 familles de LLM; jetons de raisonnement totaux appariés (moyenne 4 800 par essai); régression à effets mixtes, R² validé croisé 0,373; terme de capacité plafond β = −0,236 (p = 0,004), frontière à SA = 0,45; 94 % de concordance sur 16 couples modèle-banc; amplification d'erreur 17,2 × (indépendant), 7,8 × (décentralisé), 5,1 × (hybride), 4,4 × (centralisé); changement relatif de +80,8 % (finance décomposable, centralisé) à −70,0 % (planification séquentielle, indépendant); planification : −39 % à −70 % pour toute variante multi-agents.

#### M8 — Borne séquentielle ([Marshall et al. 2009])

[T] partiel. Le test séquentiel du rapport de vraisemblance (SPRT) minimise le temps de décision pour un taux d'erreur donné; le modèle de [Marshall et al. 2009] à commutation directe (k = 0) est asymptotiquement optimal (équations complètes dans le dossier P5). Pour P8 : la colonie est bornée par le DDM ou SPRT optimal d'un individu disposant des mêmes indices; cette borne ne donne pas de cible chiffrée ici.

### 4.5 Résumé ODD (format de [Grimm et al. 2020])

| Modèle | Objet | Entités et variables d'état | Échelles | Ordonnancement et stochasticité | Initialisation et entrées | Sous-modèles |
|---|---|---|---|---|---|---|
| M1 | Comparer la discrimination de l'individu et de la colonie entre deux sites | Fourmi (états Exploring, A, B, CA_i, CB_i, a, b); site (N_A, N_B) | Temps et espace : **SI non lu** | Transitions markoviennes; ordre de mise à jour **[à confirmer]** (SI); tirages des transitions | q_A, q_B, c, T, N = 100; état initial **[à confirmer]** | Éq. 2 (individu); Éq. 3 (quorum de Hill); règle de décision (plus de 50 %) |
| M11 | Choix d'une fourmi entre mémoire et piste | Agent (visites v, passages n) | Une décision, sans dimension spatiale explicite | Tirage de Bernoulli par agent; aucune interaction | Visites, passages, conflit ou non | Combinaison de w_p et w_s (à spécifier) |
| M10 (a) | Énergie récoltée selon la stratégie SI ou NI | Butineuses (éclaireuses, recrues), parcelles (densité, âge), colonie | 18 jours; pas **[à confirmer]** | **[à confirmer]** (code non lu); l'ordre de mise à jour sera testé en sensibilité (voir [Caron-Lormier et al. 2008]) | Densité, âge moyen, écart-type, stratégie | Découverte, danse et suivi, récolte |
| M9 | Choix du meilleur site par un essaim | 200 éclaireuses; 5 sites | Tours discrets **[à confirmer]** | **[à confirmer]** (règles à relire) | σ, λ, μ; qualités 3, 5, 7, 9, 10 | Inspection individuelle; interdépendance (λ); imitation (μ) |
| M4 | Performance d'équipes de chercheurs locaux | Anneau de 2 000 positions; agents (φ₁, φ₂, φ₃) | Un pas = un contrôle de décalage | Équipes en relais; V tiré au hasard, déterministe ensuite | l, taille d'équipe, 50 réplications | Recherche locale; relais |
| M2, M3, M5 | Modèles analytiques | Sans objet (aucune entité simulée) | Sans objet | Monte Carlo à tirages indépendants (vérification) | p, ρ, n, K, α, p₁, p₂ | Formules du texte |

---

## 5. Cibles de reproduction

Convention : « répétitions » = runs indépendants à graines différentes; IC = intervalle à 95 %. *Alignement relationnel* = signes et ordre des effets; *équivalence distributionnelle* = marge d'équivalence fixée d'avance (TOST, selon le [protocole de reproduction](../docs/04-protocole-reproduction.md)); *vérification exacte* = formule ou identité, hors réplication proprement dite. Les marges ci-dessous sont celles du dossier, à décliner en TOST par le protocole; toute valeur marquée **[I]** et numérisée est incertaine à ±0,01 **[à confirmer]**. Une réplication de modèle n'est pas une validation contre des données (cadre, principe 1). Les écarts au critère s'inscrivent au registre des déviations du protocole.

### 5.1 Fourmi

| ID | Taxon | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Répétitions | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| **T8.1** | *T. rugatulus* | P(correct) selon la différence de luminosité (7 niveaux); ajustement de l'Éq. 1 | α_col ; α_ind : 7,4 ; 32,3 lux (P = 0,0047), puis 6,6 ; 30,9 (P = 0,0020); λ_col ; λ_ind : 0,80 ; 0,93 (P = 0,050), puis 0,78 ; 0,89 (P = 0,052); asymptotes lues ≈ 0,80 ; ≈ 0,915; croisement ≈ 35 à 40 lux | Relationnel et ordre de grandeur; **les trois conditions requises** | P_col > P_ind aux deux plus faibles différences et P_col < P_ind aux deux plus fortes; α_col/α_ind dans [0,10 ; 0,40] (publié 0,21 à 0,23); écart d'asymptotes dans [0,05 ; 0,20] (publié ≈ 0,12) | 1 000 répétitions du protocole complet | [Sasaki et al. 2013], Résultats, Éq. 1, Fig. 2A | [T, I] | **Partiel** : ajustement de l'Éq. 1 aux points numérisés de la Fig. 2A (lectures a et b) : go. Simulation du protocole : no-go (SI) |
| **T8.2** | *T. rugatulus* | Modèle, Éq. 2–3 : P(choix du meilleur) selon d, courbes de la Fig. 3 (q_A = 0,20; c = 1,1; N = 100) | d = 5 / 10 / 20 / 40 / 60 / 80 / 99 % : individus 0,59 / 0,61 / 0,66 / 0,78 / 0,89 / 0,97 / 1,00; colonies 0,65 / 0,67 / 0,72 / 0,81 / 0,89 / 0,94 / 0,96; croisement à 58,5 % (≈ 59 à 60 % à la relecture indépendante, à l'œil) | Équivalence distributionnelle | Écart absolu ≤ 0,03 aux 7 points, deux courbes; croisement 58,5 ± 5 % | ≥ 2 000 colonies et ≥ 20 000 individus par point (erreurs-types ≤ 0,011 et ≤ 0,0035) | [Sasaki et al. 2013], Fig. 3 (numérisée) | **[I]**, ±0,01 **[à confirmer]** | **NO-GO** : ne pas coder avant lecture du SI (T, taux de transition). Pré-test : l'Éq. 2 seule ne suffit pas (écart jusqu'à 0,06 à d = 40 %) |
| **T8.7** | *L. niger* | Proportion choisissant la branche mémorisée ou marquée | Visites 0 / 1 / 2 / 3 / 4 : 50,5 % (N = 98) / 74,6 % (71) / 86,7 % (45) / 95,3 % (43) / 94,1 % (34) (le texte écrit 52 % pour les naïves; 50,5 % lu sur la Fig. 2a, **[I]**); piste seule 1 / 5 / 20 passages : 62 % (125) / 64,6 % (178) / 70,2 % (208); conflit : 3 visites contre piste forte 100 % (34), contre piste faible 94,2 % (49); 1 visite contre piste forte 82 % (41), contre piste faible 87,2 % (34); contrôle (Exp. 4) 90,5 % (19 sur 21); temps de décision médian 5,9 s (conflit) contre 5,7 s (sans piste) (z = −0,6; p = 0,55) | Équivalence distributionnelle | Chaque proportion dans l'IC de Wilson à 95 % de la valeur publiée, avec le N publié; aucun effet de la force de piste sur le conflit (p > 0,05) | 10 000 agents par cellule | [Grüter et al. 2011], Fig. 2–3, Résultats | [T] (Fig. 2a : **[I]**) | **Go** après la fiche de reproduction (forme de l'agent à fixer avant le code) |

### 5.2 Abeille

| ID | Taxon | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Répétitions | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| **T8.8** | *A. mellifera* | ΔE = E_danse − E_éclaireuses; signe par cellule | Habitat éphémère (5 j), densité 0,1, forte variation (écart-type = moyenne/4) : éclaireuses +22,59 ± 11,1 % d'énergie; densité 0,01 : éclaireuses à 12,9 ± 20,8 % de l'énergie des danseuses; habitat persistant (15 j), densité 0,1 : +17,5 ± 9,7 %; densité 0,01 : 18,96 ± 16,7 % (forte variation) et 24,88 ± 43,6 % (faible variation); empirique : −0,134 contre −0,101 kg/j, χ² = 24,22, p < 0,0001 | Relationnel | Signe de ΔE conforme dans ≥ 7 des 8 cellules (faible densité : la danse gagne; haute densité : les éclaireuses gagnent) **[à confirmer]** : le texte ne chiffre que 5 des 8 cellules, le signe des 3 autres vient de la discussion et de la Fig. 4, non lue en image | ≥ 100 par cellule (publié : 10) | [I'Anson Price et al. 2019], Résultats « model », Fig. 4 | [T] (3 cellules sur 8 : **[à confirmer]**) | **Go relationnel**; équivalence quantitative : no-go (code de [Schürch et Grüter 2014] non lu; modèle à réécrire) |
| **T8.9** | *A. mellifera* | Signe de ΔE selon l'erreur angulaire (0, 5, 10, 15, 30, 45°) × habitat (rare, abondant) | Erreur ≥ 30° : danse non bénéfique; 15° : bénéfique si sources rares; ≤ 10° : bénéfique partout; 0° à 5° : succès aux sources connues, échecs aux nouvelles | Relationnel | Signes conformes sur ≥ 5 des 6 erreurs en habitat rare, et ordre des seuils respecté | ≥ 200 | [Okada et al. 2014] | [R] | **NO-GO** : paramètres non lus; texte intégral requis |
| **T8.15** | *A. mellifera* | Désordre et erreurs d'encodage selon l'exposition à la danse | Apprentissage social requis; distance « fixée pour la vie » | Relationnel | Non chiffrée : un modèle d'encodage appris sans exposition produit plus de désordre et une distance biaisée persistante | À fixer **[à confirmer]** | [Dong et al. 2023] | [R] | **NO-GO** : texte intégral requis (divergence d'angle, erreur de distance, effectifs) |
| **T8.16** *(créée par cette fiche)* | *A. mellifera* (essaim) | Fréquence du meilleur site selon σ, λ, μ; critère de consensus fort | σ = 0,2 et λ = 0,8 : 246 sur 250 (98,4 %, critère fort; 250 sur 250 au critère faible); σ = 1,0 et λ = 0,8 : 199 sur 250 (79,6 %; 237 sur 250 au critère faible); λ = 0,5 : 104 sur 250 (41,6 %); λ = 0,2 : 11 sur 250 (4,4 %) (σ = 1,0 pour ces deux dernières lignes **[à confirmer]**); μ = 1 : cascade illustrative, non un taux | Équivalence distributionnelle (proportions) | Chaque proportion dans l'IC de Wilson à 95 % de la valeur publiée avec N = 250; μ = 1 : relationnel (cascade vers un site inférieur) | N = 250 pour la comparaison; ≥ 2 500 pour estimer la proportion simulée **[à confirmer]** | [List et al. 2009], Résultats, Fig. 8 (illustrative) | [T] | **Go** après relecture des règles de l'ABM (non reprises dans le dossier). Cible non prévue au dossier : à dédoublonner avec [P5](P5-decision-par-quorum.md) |

### 5.3 Théorie et humains

| ID | Taxon | Grandeur | Valeur publiée ou calculée | Niveau | Tolérance ou marge | Répétitions | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| **T8.3** | Théorie | P(majorité correcte), votes indépendants | p = 0,6 : n = 3 → 0,6480; n = 11 → 0,7535; n = 101 → 0,9791; p = 0,51, n = 1 001 → 0,7366; p = 2/3, n = 11 → 0,8779 | Vérification exacte | Implantation = formule à 10⁻¹²; Monte Carlo à ≤ 3 erreurs-types (≈ 0,0015) | 10⁶ tirages par point | [Dietrich et Spiekermann 2021], formule de P_n | [T, I] | **Go** |
| **T8.4** | Théorie | P(majorité) bêta-binomiale; limite n → ∞ | p = 0,6 : ρ = 0,05 → n = 101 : 0,795, limite 0,8145; ρ = 0,1 → 0,728, limite 0,736; ρ = 0,2 → 0,670, limite 0,672 | Vérification exacte | Écart Monte Carlo/exact ≤ 0,002; limite par n = 10⁴ à ≤ 0,005 de l'intégrale; ρ = 0 doit retrouver T8.3 | 10⁶ tirages | Modèle de l'auteur du dossier (**[I]**) sur [Dietrich et Spiekermann 2013] | [I] | **Go** |
| **T8.5** | Théorie | (c − θ)² contre moyenne(s_i − θ)² − moyenne(s_i − c)² | Identité : écart nul | Vérification exacte | Écart **absolu** ≤ 10⁻¹² (pas de critère relatif seul : il peut atteindre 1,8 × 10⁻⁹ sans bogue quand (c − θ)² ≈ 0); obtenu en Python : 5,7 × 10⁻¹⁴ sur 10³ tirages, 5,7 × 10⁻¹³ sur 10⁴ | 10⁴ tirages | [Krogh et Vedelsby 1995], Éq. 6 et 10; [Page 2007] | [T] | **Go** |
| **T8.6** | Problème-jouet | Valeur moyenne d'équipe | l = 12, 20 agents : 93,78 (meilleurs) contre 94,72 (aléatoires); l = 20, 10 agents : 93,52 contre 96,08; 50 réplications. Réplication du dossier (24 fonctions) : 93,56 contre 94,55 et 93,64 contre 95,90 (**[I]**) | Relationnel et ordre de grandeur | Aléatoires − meilleurs ≥ +0,5 (l = 12) et ≥ +1,0 (l = 20); aléatoires dans 94,72 ± 0,5 et 96,08 ± 0,5; test des signes p < 0,01. **Complémentaire** ([Thompson 2014], p. 1028) : une équipe de diversité Δ maximale < médiane de 200 équipes aléatoires | ≥ 50 fonctions | [Hong et Page 2004], Table 1 | [T] | **Go** |
| **T8.14** | Humains (historique) | Erreur de la médiane et de la moyenne contre erreur individuelle | N = 787; médiane 1 207 lb contre 1 198 lb (écart 0,8 %); erreur probable individuelle 37 lb (3,1 %); quartiles +45 / −29 lb. [Wallis 2014] [R] : après correction d'erreurs, la **moyenne** coïncide exactement avec le poids réel | Garde-fou pédagogique | Simulateur à deux composantes calibré sur les quartiles : médiane de 787 estimations à ≤ 1 % du vrai; erreur probable individuelle 37 ± 3 lb | 1 000 répétitions | [Galton 1907] | [T] | **Go** |

### 5.4 Agents LLM

| ID | Taxon | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Répétitions | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| **T8.10** | Agents (abstrait) | F(K) exact et K* | (α, p₁, p₂) = (0,5 ; 0,85 ; 0,4) : F(1) = 0,625; F(3) = 0,6456; F(5) = 0,6454; F(21) = 0,5872; F(201) = 0,501; K* = 3. (0,6 ; 0,85 ; 0,4) : F(1) = 0,670; K* = 5, F = 0,711; F(201) = 0,6008. (0,4 ; 0,85 ; 0,1) : F(1) = 0,400; F(3) = 0,3925; creux puis retour à 0,400 | Vérification exacte (Théorème 3) | Monte Carlo à ≤ 3 erreurs-types de l'exact; K* simulé = K* exact; formule du Théorème 4 à ±2 de K* **si α > 1 − 1/t** | 10⁵ requêtes | [Chen et al. 2024], Théorème 3, Fig. 5 | [T, I] | **Go** (implanter l'exact, jamais les théorèmes 2 et 4 imprimés; R8.12) |
| **T8.11** *(P7)* | Agents | Précision selon K; gain relatif | Llama2-13B, GSM8K 0,35 ± 0,03 → 0,59 (K = 40, 10 exécutions); gains relatifs GSM8K 69 / 37 / 16 %, MATH 200 / 120 / 34 % (13B / 70B / GPT-3.5) | Relationnel (les modèles de 2023 ne sont plus disponibles à l'identique) | (i) précision croissante jusqu'à K = 40 sur GSM8K pour un modèle faible, ≥ +10 points; (ii) gain relatif MATH > GSM8K pour chaque modèle; (iii) gain relatif décroissant avec la capacité | ≥ 10 exécutions; budget en jetons rapporté | [Li et al. 2024], Tableaux 2 et 6 | [T] | **Différée** : API (identifiants et tarifs à revérifier). Recoupe la cible « vote selon N » de [P7](P7-synthese-agentique.md) |
| **T8.12** *(P7)* | Agents | Pente de ΔP selon p_SAS; amplification | Seuil ≈ 0,45; β = −0,236 (p = 0,004); amplification 17,2 × (indépendant) contre 4,4 × (centralisé) | Relationnel | Pente négative (IC excluant 0) sur ≥ 6 tâches et ≥ 60 configurations; zéro de ΔP dans [0,35 ; 0,55]; rapport d'amplification indépendant/centralisé ≥ 2 | Idem | [Kim et al. 2025a] | [T] | **Différée** |
| **T8.13** *(P7)* | Agents | Précision et coût; front de Pareto convexe | HumanEval (164 tâches, 5 exécutions) : GPT-4 seul 89,6 % (87,8 à 90,9) à 1,93 $; « warming » 93,2 % (92,1 à 93,9) à 2,45 $; « retry » 92,0 % à 2,51 $; escalade 85,0 % à 0,27 $; LATS (GPT-4) 88,0 % à 134,50 $; LDB (GPT-4) 93,3 % à 6,36 $; Reflexion 87,8 % à 3,90 $ | Reproduire le **plan**, non les nombres (modèles retirés) | Aucun agent complexe ne domine strictement « warming » sur le front, 5 exécutions et IC rapportés | 5 exécutions | [Kapoor et al. 2025], Tableau A1 | [T] | **Différée** |

**Cibles sans valeur chiffrée retenue.** Odomètre de l'abeille : aucune cible, la controverse n'étant pas tranchée (R8.9). Carte cognitive : « débattu », sans cible.

---

## 6. Expériences originales

Elles ne démarrent qu'après la reproduction du modèle sur lequel elles reposent (cadre, principe 1). Les niveaux de facteurs tirés d'un dossier sont repris tels quels; tout niveau ajouté est marqué **[à confirmer]** et fixé au préenregistrement.

### E8.1 — Carte (p_w, ρ, K) du jury à coût égal et réconciliation de D1 et D2

- **Plan.** Calcul analytique exact dans le modèle bêta-binomial (M2), vérifié par Monte Carlo; pas d'appel d'API. Variante exploratoire à **témoin orchestré synthétique** : un coordinateur qui sélectionne parmi K propositions avec un vérificateur de fiabilité v (coût d'un appel de plus); aucune valeur de v n'est tirée de la littérature (**[à confirmer]**, *Hypothèse de l'auteur*).
- **Facteurs.** p_w (précision de l'agent faible, sous et sur 1/2); ρ dans {0 ; 0,05 ; 0,1 ; 0,2} (valeurs de T8.4); K impair dans {3, 5, 11, 21, 101} (valeurs de T8.3 et T8.10); p_s (précision de l'agent fort) **[niveaux à confirmer]**; mélange d'items (α, p₁, p₂) dont (0,5 ; 0,85 ; 0,4) (T8.10); K = 2 et 4 correspondent aux rapports de prix de E8.5.
- **Répétitions.** Exact; vérification Monte Carlo à 10⁶ tirages par point (critère de T8.4).
- **Critère de lecture.** (i) À ρ = 0, la frontière ΔP = 0 coïncide avec Maj_K(p_w) = p_s. (ii) Pour p_w > 1/2, la frontière se déplace vers des p_w plus élevés quand ρ croît (**[I]**; cohérent avec T8.4, à vérifier par la carte). (iii) Pour les items de précision inférieure à 1/2 (D2), ΔP < 0 pour tout K ≥ 3. (iv) La « réconciliation » de D1 et D2 (même mécanisme, signe décidé par p_i et ρ) n'est pas un résultat : la carte exacte la rend calculable, et ce sont H8.4 et H8.5, sur items réels (P7), qui la mettent à l'épreuve.

### E8.2 — n_eff(d ; c, T) : combien d'individus indépendants vaut la colonie

- **Plan.** Sur les courbes simulées de T8.2 après acceptation : n_eff = plus petit n impair tel que Maj_n(P_ind) ≥ P_col; IC par bootstrap sur les graines.
- **Facteurs.** d (grille de T8.2, plus 50 et 90 %); c de 0 à 2 (H8.2); T autour de la valeur du SI **[à confirmer]**.
- **Répétitions.** Celles de T8.2.
- **Critère de lecture.** n_eff défini seulement tant que P_col dépasse P_ind (sinon « — »). Valeur numérisée du dossier (**[I]**, à confirmer) : n_eff de 3 à 5 pour d ≤ 50 %, à comparer au simulé; alimente H8.3.
- **Dépend de** T8.2 (porte no-go).

### E8.3 — Information privée contre sociale en environnement dynamique

- **Plan.** Agent à poids (w_p, w_s) calibré sur T8.7 (fourmi); environnement à inversion de qualité entre deux options (protocole commun avec [P1](P1-recrutement-verrouillage.md)); comparaison de poids fixes et de poids adaptatifs qui apprennent la fiabilité du canal partagé. Variante abeille : [Grüter et al. 2008] est lu en résumé seulement (93 % des cas relèvent de l'information privée devant une danse [R]); un seul pourcentage ne calibre pas deux poids, donc la variante abeille reste qualitative tant que le texte intégral n'est pas lu.
- **Facteurs.** Régime de poids (fixes, adaptatifs); fiabilité du canal social; fréquence et instant de l'inversion; N d'agents. **Niveaux à fixer au préenregistrement [à confirmer]** (aucune valeur publiée).
- **Répétitions.** ≥ 10 000 agents par cellule (reprise de T8.7), graines en distribution.
- **Critère de lecture.** Latence d'adaptation après inversion; erreur à l'état stationnaire; indicateur de cascade (fraction de décisions copiées malgré une information privée contraire), si adopté par les [métriques et typologie](../docs/06-metriques-et-typologie.md). Un régime adaptatif est retenu s'il réduit la latence sans dégrader l'erreur stationnaire au-delà d'une marge fixée au préenregistrement.

### E8.4 — Valeur de la danse : grille densité × durée de vie × erreur angulaire

- **Plan.** Cartographie de ΔE dans le modèle d'abeille réécrit (T8.8 et T8.9 acceptées d'abord), avec des zones « la danse aide » et « l'éclaireuse seule suffit ».
- **Facteurs.** Densité de parcelles (0,01 ; 0,1; niveaux intermédiaires **[à confirmer]**); durée de vie (5 ; 15 jours; intermédiaires **[à confirmer]**); erreur angulaire (0, 5, 10, 15, 30, 45°); variation (écart-type = moyenne/10 ou moyenne/4).
- **Répétitions.** ≥ 100 par cellule (T8.8) et ≥ 200 (T8.9).
- **Critère de lecture.** Les signes de H8.9 et l'ordre des seuils de T8.9; carte de ΔE en pourcentage de l'énergie du bras de référence. Statut : exploratoire jusqu'au préenregistrement de H8.9.

### E8.5 — Collectif faible contre agent fort, avec témoin orchestré (P7)

- **Plan.** H8.4 à H8.8 sur items réels, à **jetons égaux**, avec quatre bras : (1) agent fort seul; (2) K agents faibles indépendants + vote (agents indépendants sans canal); (3) K agents faibles avec canal (débat ou état partagé); (4) **témoin orchestré** : un orchestrateur et des sous-agents au même budget total, comme architecture « centralisée » de [Kim et al. 2025a]. Facteurs croisés : difficulté (D3, via p_SAS) et structure de tâche (décomposable ou séquentielle).
- **Contrainte de coût** (**[I]**). Aux tarifs relevés par l'audit méthodologique et confirmés sur la page des tarifs de l'API Claude le 2026-10-01 ([Anthropic 2026a]) : 1 / 2 / 4 $ par million de jetons d'entrée et 5 / 10 / 20 $ en sortie pour Haiku 4.5 / Sonnet 5.5 / Opus 5.5. Le budget égal ne permet alors que K = 2 ou 4 appels faibles par appel fort; avec p = 0,6, K = 3 ne gagne que +4,8 points (0,648). Une « colonie » de N ≥ 10 exige des modèles à poids ouverts. Les identifiants et tarifs se revérifient avant toute exécution, un retrait de Haiku 4.5 étant possible dès le 2026-10-15 et `temperature` n'étant plus réglable sur les modèles récents (cadre, section « Corrections factuelles »).
- **Répétitions.** Celles de H8.4 à H8.8 (≥ 500 items stratifiés pour H8.4; ≥ 60 configurations et ≥ 6 tâches pour H8.6); budget rapporté en jetons et en appels.
- **Critère de lecture.** Les critères de réfutation de H8.4 à H8.8. Le préenregistrement précède tout appel d'API; l'opérationnalisation finale de G est celle de la fiche [P7](P7-synthese-agentique.md).

## 7. Parallèle agentique

On transpose des **relations**, pas des termes : « colonie » et « agent » ne sont pas des synonymes. Chaque énoncé sépare ce que dit la source de ce qui est inféré, et porte un statut épistémique (cadre, principe 7). Les relations sont celles du dossier (section « Parallèles agentiques appuyés par des sources »).

### 7.1 Relations, transpositions, statuts

| Relation | Source (lecture) | Transposition agentique | Statut épistémique | Où l'analogie casse |
|---|---|---|---|---|
| **L'avantage du collectif dépend de la difficulté**, au sens D1 à D5 | [Sasaki et al. 2013] (D1 : la colonie gagne); [Chen et al. 2024] (D2 : le vote nuit si p < 1/2); [Kim et al. 2025a] (D3); [Snell et al. 2024]; [Li et al. 2024] (gain non monotone) | La précision item par item de l'agent seul et la corrélation des erreurs décident du signe du gain (E8.1; H8.4, H8.5). C'est la **réconciliation** des cinq sens, **[I]** | Hypothèse de l'auteur | Les cinq sens ne se mesurent pas par un même indice; la réconciliation reste à tester |
| **Le quorum sert la tâche difficile et verrouille un choix inférieur sur la tâche facile** | [Sasaki et al. 2013]; [Nicolis et al. 2011]; [Choi et al. 2025a] (le débat est une martingale; le vote explique l'essentiel du gain [R]); [Weng et al. 2025] [M]; [Lorenz et al. 2011] [R]; [List et al. 2009] (imitation pure : cascade, simulation illustrative) | Un agrégateur à seuil sans vérification indépendante amplifie l'erreur commune; exiger une inspection propre avant tout endossement | Hypothèse de l'auteur (*Modèle simplifié* si H8.2 tient) | Les LLM d'une même famille partagent des biais; un « quorum » d'agents n'a pas de coût de comptage local |
| **Individu riche + collectif : amplifier, sonder, affiner** | [Feinerman et Korman 2017] [T] (hypothèses de l'article, non résultats); [Hadfield et al. 2025]; [Kim et al. 2025a] (vérification centralisée : amplification d'erreur 4,4 × contre 17,2 × en indépendant) | L'orchestrateur joue le rôle de l'amplificateur conditionnel | Analogie | Ce n'est **pas** de la chorégraphie : plan global explicite et contrôle central (orchestration, cadre) |
| **Information privée contre sociale** | [Grüter et al. 2011] (95,3 % après 3 visites contre 62 à 70 % pour une piste seule); [Grüter et al. 2008] (93 % d'information privée devant une danse [R]); [I'Anson Price et al. 2019] (suiveuses exposées à des danses non informatives : 20 % de suiveuses en moins en fin d'essai); [Czaczkes et al. 2015] | Un agent apprend la **fiabilité du canal partagé** (poids adaptatif) et protège son contexte propre contre l'écrasement par l'état partagé (E8.3) | Hypothèse de l'auteur | Un contexte LLM n'est pas une mémoire de route; l'« écrasement » n'a pas d'équivalent chez la fourmi |
| **Évaluer en parallèle plutôt que comparer** | [Sasaki et al. 2018] [R] (comparaison directe chez l'individu, choix séquentiel chez la colonie); [Robinson et al. 2011] [R] (un seuil individuel suffit) | N plans évalués indépendamment avec un critère d'acceptation (best-of-N avec vérificateur) plutôt qu'un agent qui compare tout | Analogie | Le vérificateur est un élément central que la colonie n'a pas |
| **Surcharge cognitive** | [Sasaki et Pratt 2012] [S] (individus moins précis à 8 options qu'à 2; colonies ≈ 90 % dans les deux cas); [Hadfield et al. 2025] (sous-agents aux fenêtres de contexte séparées) | Répartir l'inspection de nombreuses options entre sous-agents, chacun n'en voyant qu'un petit sous-ensemble | Hypothèse de l'auteur | La limite de l'agent LLM est la fenêtre de contexte et le coût, non une mémoire de travail |
| **Budget égal d'abord** | [Kapoor et al. 2025]; [Kim et al. 2025a]; [Snell et al. 2024]; [Brown et al. 2024] (couverture log-linéaire en échantillons; le vote plafonne sans vérificateur); [Wu et al. 2024a] (petit modèle avec algorithme avancé peut battre un grand modèle à calcul égal) | Toute mesure de G rapporte jetons et appels; sans cela, l'effet de budget et l'effet de coordination se confondent | Hypothèse de l'auteur (règle de mesure) | Un appel LLM n'est pas une ouvrière : le rapport de coût entre niveaux de modèles est de 2 ou 4 (E8.5) |
| **Corrélation des erreurs, qualité et diversité** | [Kim et al. 2025b] (accord de 60 % quand deux modèles se trompent [R]); [Chen 2026] (précision ≤ 1 − β; β observé 0,052 contre 0,023 prédit [R]); [Li et al. 2025a] (auto-ensemble > mélange de +6,6 points); [Douven 2026] (contamination : écart de capacité de 35,8 % à 8,9 % [R]); [Schoenegger et al. 2024] (12 LLM face à 925 humains sur 31 questions [R]) | La diversité d'une population de LLM est plafonnée; la sagesse des foules ne se transfère pas sans mesure de la corrélation (T8.4 donne le plafond de la théorie) | Hypothèse de l'auteur (la partie théorique : *Résultat reproduit* si T8.4 est accepté) | ρ n'est pas mesuré directement dans ces sources (mesures indirectes) |
| **Erreur collective = erreur moyenne − diversité** | [Krogh et Vedelsby 1995]; [Page 2007] [S] | Identité sur la moyenne quadratique d'un ensemble | *Résultat reproduit* (identité, T8.5) | Elle ne dit ni que la diversité cause une meilleure équipe ([Thompson 2014]) ni quoi que ce soit sur la **stabilité** (cadre : « agents identiques oscillent », sans acquis) |
| **Apprentissage social du protocole** | [Dong et al. 2023] [R] | Un agent qui apprend un format de message par exposition à des pairs peut hériter de leurs biais | Hypothèse de l'auteur (faible, **[I]**) | Aucune donnée sur des agents LLM |
| **Le groupe n'est pas toujours plus sage** | [Galton 1907]; [Wallis 2014]; [Lorenz et al. 2011] (l'influence sociale rétrécit la diversité des opinions et érode l'effet [R]) | « Chacun voit la moyenne » rétrécit la dispersion et fait perdre l'effet de l'agrégation | *Résultat reproduit* (Galton, T8.14) + Analogie | Les estimations de Galton sont humaines et indépendantes; les agents ne le sont pas |

**Précisions de transposition.**
- Les transferts de la colonie vers les agents sont bornés par la corrélation : l'indépendance exigée par Condorcet n'est établie ni entre ouvrières d'une même colonie ni entre LLM d'une même famille (**[I]**).
- Le « chorégraphe » de la colonie est la sélection naturelle; celui du système d'agents est le concepteur du prompt et des protocoles (cadre). Aucune relation de ce tableau n'est une prescription d'architecture.
- Résultat daté : modèles, tarifs et paramètres LLM changent; toute valeur issue d'une étude de 2023 à 2025 est relue avant exécution (cadre, section « Corrections factuelles »).

### 7.2 Ce que « budget égal » veut dire dans les sources

| Étude | Budget apparié? |
|---|---|
| [Sasaki et al. 2013] | Non : une fourmi contre 20 à 250 ouvrières |
| [Li et al. 2024] | Non : K = 40 échantillons contre 1 (≈ 7,4 × le coût pour 13 G contre 70 G, **[I]**) |
| [Wang et al. 2024a] (Mixture-of-Agents) | Non : 6 propositeurs × 3 couches; analyse coût-qualité séparée |
| [Hadfield et al. 2025] | Non : ≈ 15 × les jetons d'un dialogue (≈ 4 × pour un agent seul); le +90,2 % est mesuré contre un agent unique, soit ≈ 3,75 × ses jetons (**[I]**); l'usage de jetons explique 80 % de la variance de BrowseComp |
| [Kim et al. 2025a] | Oui : jetons de raisonnement totaux appariés (moyenne 4 800) |
| [Snell et al. 2024] | Oui : FLOPs appariés (modèle de 14 × plus de paramètres) |
| [Kapoor et al. 2025] | Oui : coût en dollars, front de Pareto convexe |
| [Chen et al. 2024] | Le coût n'est pas modélisé |

### 7.3 Témoin orchestré

Le cadre exige un **témoin orchestré** dans chaque volet agentique (QR3). Dans P8 (E8.5, avec une version synthétique dans E8.1), les quatre bras sont les trois références préenregistrées du cadre plus le témoin :

| Bras | Correspondance avec le cadre | Régime (typologie du cadre) |
|---|---|---|
| 1. Agent fort seul, budget B | Agent unique à budget égal | — |
| 2. K agents faibles indépendants + vote | Agents indépendants sans canal | Aucun médium : agrégation seule |
| 3. K agents faibles avec canal (débat, état partagé) | Colonie à règles | Auto-organisation (stigmergique ou par signaux directs) |
| 4. Orchestrateur + sous-agents, budget total B | **Témoin orchestré** | Orchestration (plan global explicite et contrôle central à l'exécution) |

La différence entre les bras 2 et 3 mesure l'**interaction**; la différence entre le bras 2 et le bras 1 (à budget égal) mesure ce que l'**agrégation** apporte. L'orchestrateur n'est pas de la « chorégraphie » : l'écart entre le bras 4 et les bras 2 et 3 répond à QR3, selon la structure de tâche.

### 7.4 Structure de tâche : décomposable ou séquentielle

Classement des tâches du projet (**[I]** : classement de cette fiche, appuyé par les sources) :

| Tâche | Structure | Prédiction pour le collectif | Source |
|---|---|---|---|
| Choix de nid entre deux options, jugements d'ouvrières agrégeables | Décomposable (jugements parallèles) | Aide si D1 (petite différence); verrouille si facile | [Sasaki et al. 2013] |
| Vote de K échantillons indépendants | Décomposable | Gain non monotone en difficulté; plafond sans vérificateur | [Li et al. 2024], [Brown et al. 2024] |
| Tâche à S étapes (isolation d'un intervalle) | Décomposable en étapes | Gain relatif croissant avec S | [Li et al. 2024], Propriété 2 |
| Finance | Décomposable | Centralisé : jusqu'à +80,8 % | [Kim et al. 2025a] |
| Planification | **Séquentielle** | Multi-agents : de −39 % à −70 % | [Kim et al. 2025a] |
| Navigation web dynamique | Dynamique | Décentralisé : +9,2 % | [Kim et al. 2025a] |
| Recherche locale en relais (Hong et Page) | Séquentielle (agents à tour de rôle) | L'avantage tient à l'aléa, pas à la diversité | [Hong et Page 2004], [Thompson 2014] |

### 7.5 Lien avec P7

P7 (synthèse agentique, voir [P7](P7-synthese-agentique.md)) dépend des résultats reproduits de P8 (cadre, section « Architecture du programme ») : T8.10 en tout premier, puis T8.11 à T8.13 qui se jouent dans P7 (API). P8 livre à P7 : les hypothèses H8.4 à H8.8; la définition de « difficile » (D1 à D5); la carte exacte de E8.1 comme prédiction à confronter aux items réels; le plan à quatre bras de E8.5. P7 livre à P8 : l'infrastructure d'API, la vérification des identifiants et tarifs, et l'opérationnalisation finale de G. P8 ne dépend pas de P7 pour ses reproductions non agentiques.

---

## 8. Visuels et trois niveaux

Gabarit, charte, évaluation et accessibilité communs : [vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md) et cadre (section « Vulgarisation (V0) »); ne sont pas répétés ici. Chaque page déclare son public principal (grand public et étudiants, sauf mention). Pictogrammes obligatoires avec les couleurs de la charte (fourmi #D55E00, abeille #0072B2, agent #CC79A7).

### 8.1 Catalogue des visuels (numérotation du dossier, plus le visuel 13)

| N° | Visuel | Taxon | Niveaux | Public | Statut épistémique | Dépend de |
|---|---|---|---|---|---|---|
| 1 | **Courbes qui se croisent** : P(correct) selon d pour une fourmi isolée et pour la colonie, curseurs c et T, zone grisée « la colonie plafonne à ≈ 0,96 »; variante Voir : nid « sombre contre un peu moins sombre » | Fourmi | Voir, Explorer, Vérifier | Grand public, étudiants | *Modèle simplifié* | **T8.2 (porte no-go)** |
| 2 | **Combien de fourmis indépendantes vaut la colonie?** : barre n_eff(d) (3 à 5, **[I]**) à côté d'un jury de 101 individus indépendants (0,966 à d = 5 %, **[I]**; le dossier écrit « 100 »). Message : l'interaction ajoute peu à l'agrégation | Fourmi | Explorer, Vérifier | Étudiants | *Hypothèse de l'auteur* | E8.2 |
| 3 | **Jury de Condorcet interactif** : curseurs p, n, ρ; carte de chaleur de la fiabilité; la ligne de **plafond** (0,736 pour p = 0,6 et ρ = 0,1) apparaît quand ρ monte | Théorie | Voir, Explorer, Vérifier | Étudiants | *Résultat reproduit* (théorie) | T8.3, T8.4 |
| 4 | **Galton à 787 voix** : nuage d'estimations (médiane 1 207 lb, réel 1 198 lb, erreur probable 37 lb); bouton « chacun voit la moyenne » qui rétrécit la dispersion | Humains (historique) | Voir, Vérifier | Grand public | *Résultat reproduit* + Analogie | T8.14 |
| 5 | **Équipe des meilleurs contre équipe au hasard** (anneau de 2 000 positions, 3 chiffres par agent) : 93,6 contre 95,9; encart « ce n'est pas la diversité, c'est l'aléa » | Problème-jouet | Explorer, Vérifier | Étudiants | *Résultat reproduit*; limite signalée | T8.6 |
| 6 | **Identité de la diversité** : trois estimations, une moyenne; barres « erreur moyenne », « diversité », « erreur du groupe » qui s'additionnent exactement | Théorie | Explorer, Vérifier | Étudiants | *Résultat reproduit* (identité) | T8.5 |
| 7 | **Le carrefour en T** : une fourmi arrive; 0, 1 ou 3 visites antérieures; barres 50,5 / 74,6 / 95,3 % contre piste seule 62 à 70 %; mode conflit (82 % à 100 % suivent la mémoire). Explorer : curseurs w_p et w_s | Fourmi (*L. niger*) | Voir, Explorer, Vérifier | Grand public, étudiants | *Résultat reproduit* (T8.7) | T8.7 |
| 8 | **La danse, utile ou non?** : carte densité × durée de vie des sources, zones « la danse aide » et « l'éclaireuse seule suffit », curseur d'erreur angulaire (0° à 45°); encart « Lausanne, habitat tempéré pauvre : −0,101 contre −0,134 kg/j » | Abeille | Voir, Explorer, Vérifier | Grand public, étudiants | *Modèle simplifié* + résultat empirique | T8.8, T8.9 |
| 9 | **Courbe en U inversé du vote** : précision selon K pour un mélange de requêtes faciles et difficiles (curseurs α, p₁, p₂; K* marqué) | Agents (abstrait) | Explorer, Vérifier | Étudiants, praticiens | *Résultat reproduit* (T8.10) | T8.10 |
| 10 | **Seuil de coordination à ≈ 45 %** : précision de l'agent seul contre gain du collectif à jetons égaux, droite qui coupe zéro | Agents | Vérifier | Praticiens | *Hypothèse de l'auteur* (résultat publié de [Kim et al. 2025a], non reproduit) | T8.12 (P7) |
| 11 | **Front de Pareto coût-précision** (HumanEval) : LATS à 134,50 $ contre « warming » à 2,45 $ | Agents | Vérifier | Praticiens | *Hypothèse de l'auteur* (résultat publié de [Kapoor et al. 2025], non reproduit) | T8.13 (P7) |
| 12 | **Cartes de la difficulté (D1 à D5)** : page « quand un groupe aide-t-il? » qui explique pourquoi les résultats semblent se contredire. Le dossier écrit « quatre cartes » pour cinq sens : une carte par sens, D5 incluse, à trancher au gabarit | Transversal | Voir, Explorer | Grand public, étudiants | *Hypothèse de l'auteur* | E8.1 |
| 13 *(ajouté pour la parité)* | **L'éclaireuse devant une danse** : suivre la danse ou revenir à sa source connue; contrepartie abeille du visuel 7 | Abeille | Voir seulement tant que le texte intégral n'est pas lu | Grand public | *Hypothèse de l'auteur* (résultat de [Grüter et al. 2008] en résumé : 93 %) | Lecture de [Grüter et al. 2008] |

### 8.2 Niveau Voir : récit guidé, avec prédiction

| Aspect | Contenu |
|---|---|
| **Montré et manipulé** | Récits des visuels 1 (variante), 3, 4, 7, 8, 13. Le lecteur **prédit avant la révélation**; un seul curseur imposé. Encart « Ce que fait vraiment la reine » sur toute page « colonie » (cadre : garde-fou) |
| **Vue de l'agent** | Un seul individu mis en évidence (une fourmi au carrefour, une butineuse devant une danse), sans paramètre à régler |
| **Modifier la règle** | Sans objet à ce niveau (introduit en Explorer); seul varie le scénario guidé (petite ou grande différence) |
| **Objectifs d'apprentissage (mesurables, pré-test et post-test, condition témoin statique selon V0)** | (1) Prédire, avant la révélation, qui discrimine mieux entre l'individu et la colonie à petite et à grande différence. (2) Énoncer que la colonie n'est pas « plus intelligente en général ». (3) Citer un cas où la mémoire privée l'emporte sur la piste ([Grüter et al. 2011]) |
| **Accessibilité propre au projet** | Récit lisible sans animation (`prefers-reduced-motion` : images fixes et texte); prédiction par boutons au clavier; résumé textuel de chaque courbe (position du croisement) et table de données équivalente; aucune information portée par la seule couleur (pictogrammes) |
| **Erreurs de compréhension à prévenir** | « La foule est toujours plus sage » (visuel 4 avec l'effet de l'influence sociale de [Lorenz et al. 2011]); « la colonie est un cerveau »; « la fourmi seule est stupide » (elle fait mieux que la colonie aux grandes différences); « la reine commande »; « la fourmi suit aveuglément la piste » (la mémoire l'emporte). Les représentations erronées sur les processus émergents sont documentées ([Chi et al. 2012]) |

### 8.3 Niveau Explorer : bac à sable étayé

| Aspect | Contenu |
|---|---|
| **Montré et manipulé** | Visuels 1, 2, 3, 5, 6, 7, 8, 9, 12. Curseurs : c (et T après le SI), p, n, ρ, w_p, w_s, densité, durée de vie, erreur angulaire, α, p₁, p₂, K. Sorties : P(correct), n_eff, plafond du jury, K*, ΔE |
| **Vue de l'agent** | Panneau de la règle locale et de l'état d'un agent, pas à pas et ralenti : fourmi (Exploring, A, B, acceptation), votant (tirage de précision p avec corrélation ρ), butineuse (suit ou éclaire), appel de modèle (échantillon) |
| **Modifier la règle** | c = 0 (la colonie devient un vote d'indépendants); T; ρ; (w_p, w_s); erreur angulaire; K. Bouton « restaurer le publié »; hors de la plage publiée, avertissement « Hypothèse de l'auteur » |
| **Objectifs d'apprentissage** | (1) Avec le curseur ρ, repérer le plafond du jury et expliquer pourquoi il est inférieur à 1. (2) Avec le curseur c, identifier la rétroaction positive comme cause du déficit colonial aux grandes différences. (3) Prédire le signe de ΔE selon la densité et la durée de vie. (4) Distinguer agrégation (n_eff) et interaction |
| **Accessibilité propre au projet** | Curseurs au clavier, valeur et résultat annoncés (P(correct), n_eff); cartes de chaleur en viridis ou cividis avec table équivalente; sur mobile, un curseur à la fois et grandes cibles; simulation pas à pas manuelle à la place de l'animation continue; description textuelle de l'anneau de 2 000 positions du visuel 5 |
| **Erreurs de compréhension à prévenir** | « Plus d'agents = toujours mieux » ([Li et al. 2024] : gain non monotone; [Chen et al. 2024] : pic puis déclin); « la diversité l'emporte sur la capacité » (visuel 5 : c'est l'aléa, [Thompson 2014]); confondre p et ρ; croire que c = 1,1 est une mesure biologique (valeur non optimisée dans [Sasaki et al. 2013]); lire n_eff comme « la colonie vaut n fourmis » en général |

### 8.4 Niveau Vérifier : reproduction, distribution, code, limites

| Aspect | Contenu |
|---|---|
| **Montré et manipulé** | Pour chaque cible T : valeur publiée, valeur simulée, marge, décision (TOST), **distribution sur N graines**, registre des déviations, code, manifeste de run, limites. Visuels 10 et 11 pour les praticiens. Manipulable : nombre de graines; la décision confirmatoire est en lecture seule |
| **Vue de l'agent** | Journal exportable d'un run (états d'un agent) et lien vers le code de la règle |
| **Modifier la règle** | La règle publiée est verrouillée; toute variante est lancée comme extension exploratoire avec l'écart au publié affiché |
| **Objectifs d'apprentissage** | (1) Distinguer réplication et validation. (2) Lire une distribution sur N graines et décider si l'équivalence tient. (3) Repérer ce qui n'est pas à budget égal (Sasaki, Li). (4) Reconnaître les marqueurs « [à confirmer] », « contesté », « débattu » |
| **Accessibilité propre au projet** | Tableaux de données complets en HTML et export CSV; description textuelle de chaque distribution; code et manifestes téléchargeables; structure par titres |
| **Erreurs de compréhension à prévenir** | « Reproduit = validé »; « la colonie surpasse l'individu à budget égal » (faux : comparaison non appariée); « G est stable » (il est indéfini près du plafond; voir R8.6); « valeur numérisée = valeur publiée » (±0,01); « l'odomètre est calibré » (contesté) |

---

## 9. Plan de simulation

Architecture en trois couches, un moteur headless Node et une couche navigateur, TypeScript partout (cadre, section « Architecture de simulation »). Détails communs dans la [spécification de simulation](../docs/05-spec-simulation.md); ici, ce qui est propre à P8.

### 9.1 Couches

| Couche | Contenu pour P8 |
|---|---|
| **1. Noyau commun (S0)** | PRNG à graine; horloge à pas fixe (M10, M9; M1 si pas fixe); SSA de Gillespie (M1 si temps continu); événements discrets; enregistreur; scénario; manifeste de run. RK4 et grille : non utilisés par P8 (aucun modèle EDO; l'anneau de M4 est un tableau à une dimension) (**[I]**) |
| **2. Modèles de référence** | Un par article : M1, M11, M10 (a), M10 (b), M10 (c), M9, M2, M3, M4, M5, Galton; M6 et M7 par appels d'API dans P7 |
| **3. Modèle chorégraphique commun** | Seul le canal est interchangeable (persistance, portée, adressage, format). Canaux de P8 (**[I]**, qualitatif; valeurs de R fixées dans les [métriques et typologie](../docs/06-metriques-et-typologie.md)) : quorum local (M1; instantané, local au site, diffusion aux fourmis du site, compte); piste (M11; persistante); danse (M10; éphémère, vecteur bruité); aucun canal (vote d'indépendants, bras 2 d'E8.5) |

**Docking** (cadre, principe 6; méthode d'alignement de modèles : [Axtell et al. 1996]). Après la réplication de chaque modèle de référence, le modèle chorégraphique commun est rejoué avec le seul canal changé et doit satisfaire les mêmes critères : M1 contre T8.2 (après la porte), M11 contre T8.7, M10 (a) contre T8.8.

### 9.2 Pas de temps, effectifs, répétitions

| Modèle | Pas de temps | N d'agents | Graines et répétitions |
|---|---|---|---|
| M1 | SSA (temps continu probable) ou pas fixe, **SI non lu** | 100 par colonie; 1 individu | ≥ 2 000 colonies et ≥ 20 000 individus par point (T8.2); 1 000 répétitions du protocole (T8.1) |
| M11 | Aucun (une décision) | 10 000 agents par cellule | Distribution sur graines; IC de Wilson |
| M10 (a) | Jour **[à confirmer]**, 18 jours simulés | **[à confirmer]** (colonie simulée) | ≥ 100 par cellule (publié : 10) |
| M10 (b) | Journée de butinage **[à confirmer]** | **[à confirmer]** | ≥ 200 |
| M9 | Tours discrets **[à confirmer]** | 200 éclaireuses | 250 essais (publié); ≥ 2 500 **[à confirmer]** |
| M2, M3 | Sans temps | n jusqu'à 10⁴ | 10⁶ tirages (M2); 10⁴ (M3) |
| M4 | Un pas = un contrôle de décalage | 20 ou 10 agents; anneau de 2 000 positions | ≥ 50 fonctions; 200 équipes aléatoires pour le critère complémentaire |
| M5 | Sans temps | K jusqu'à 201 | 10⁵ requêtes |
| Galton | Sans temps | 787 estimations | 1 000 répétitions |

**Graines.** Une graine maîtresse par scénario; graines de run dérivées de façon déterministe et consignées au manifeste; la plage de graines de chaque cible s'inscrit avec la cible. Les résultats sont des **distributions sur graines**, jamais un run unique. **Ordre de mise à jour** déclaré par modèle (synchrone ou asynchrone) et testé en sensibilité pour M10 (a) et M9 ([Caron-Lormier et al. 2008]). Les paramètres non publiés (T, taux de M1; forme de M11) font l'objet d'une analyse de sensibilité selon le [protocole de reproduction](../docs/04-protocole-reproduction.md).

### 9.3 Budgets de performance

- **Référence** : le pré-test du dossier ([p8_check.py](../recherche/verifications-numeriques/p8_check.py), Python 3 et numpy) s'exécute en moins d'une seconde (toutes parties sauf `hp`); la partie `hp` (24 fonctions de Hong et Page) prend environ 3 minutes. Budget TypeScript : ne pas dépasser le temps Python pour les mêmes parties **[estimation, à confirmer]**.
- **T8.2** : temps du balayage complet mesuré au premier run, puis inscrit dans la fiche de reproduction **[à confirmer]**.
- **Navigateur** : le Monte Carlo lourd s'exécute en headless et se sert en tables précalculées; le navigateur ne simule en direct que les modèles analytiques (M2, M3, M5) et M1 ou M11 à petit N. Budget d'affichage : spécification de simulation. WASM seulement si une mesure l'impose (cadre).

### 9.4 Sorties

Tables de résultats par cible (distribution sur graines, IC); figures simulées superposées aux figures numérisées; **fichier de numérisation** (points, calibration d'axes, opérateur, date) pour toute valeur lue sur figure; manifeste de run (version du code, graines, paramètres, empreinte); registre des déviations; données des visuels; journaux d'agent pour « Vue de l'agent »; tests. Le script Python du dossier sert d'**oracle de valeurs** pour les tests TypeScript; il n'entre pas dans le build (aucune frontière de langage au départ).

## 10. Livrables et critères d'achèvement

### 10.1 Portes go/no-go

| Porte | Condition de levée | Débloque | État au 2026-10-01 |
|---|---|---|---|
| **G1** | SI de [Sasaki et al. 2013] lu et consigné dans la fiche de reproduction de M1 : T, taux de transition (Tables S2 à S4), Table S1 (λ de l'Éq. 1), effectif exact de colonies, Fig. S1 à S8 | T8.2; simulation de T8.1; H8.1 à H8.3; E8.2; visuels 1 et 2 | **Fermée** |
| G2 | Texte intégral de [Okada et al. 2014] (paramètres du modèle) | T8.9 | Fermée |
| G3 | Texte intégral de [Dong et al. 2023] (divergence d'angle, erreur de distance, effectifs) | T8.15; M10 (c) | Fermée |
| G4 | Texte intégral de [I'Anson Price et al. 2019] : Fig. 4 (3 cellules sur 8) et méthodes du modèle | Préenregistrement de H8.9 | Partiellement ouverte |
| G5 | Règles de l'ABM de [List et al. 2009] relues | T8.16 | À faire (texte lu pour le dossier) |
| G6 | Texte intégral de [Grüter et al. 2008] | Variante abeille d'E8.3; visuel 13 au-delà du niveau Voir | Fermée |
| G7 | Identifiants, tarifs et versions des modèles LLM revérifiés (cadre, section « Corrections factuelles ») | E8.5; T8.11 à T8.13 | À faire avant toute exécution |
| G8 | Fiche de reproduction écrite et datée **avant** le code du modèle (cadre, principe 2) | Tout codage | À faire |
| G9 | Préenregistrement déposé | Toute exécution confirmatoire | À faire |

### 10.2 Livrables (cochables)

- [ ] **Note de recherche P8** (français, académique) : reproductions T8.1 à T8.16 avec registre des déviations; décisions sur H8.1 à H8.9; corrections de citations (R8.5, R8.12, R8.16, R8.17); limites. Critère : chaque valeur numérique porte une source ou **[à confirmer]**; `node outils/verifier-docs.ts` (depuis la racine du dépôt) sans erreur.
- [ ] **Fiches de reproduction** (M1, M2 et M3, M4, M5, M9, M10 a et b, M11) : équations, paramètres, unités, protocole, figure cible numérisée, critère chiffré, écrits avant le code (vérifiable dans l'historique git).
- [ ] **Code** TypeScript du moteur et des modèles de P8 : `tsc --noEmit` sans erreur; exécutable par Node.
- [ ] **Tests** : un test automatisé par cible T qui échoue si le critère du tableau n'est pas satisfait, avec le script Python du dossier comme oracle de valeurs; tests de propriété : (i) P_n(p) croît avec n impair pour p > 1/2 et ρ = 0 retrouve la binomiale; (ii) identité de Krogh et Vedelsby à l'écart absolu près; (iii) G renvoie « indéfini » quand P_ref ≥ P_max; (iv) F(1) = α·p₁ + (1 − α)·p₂; (v) K* n'est rendu que si α > 1 − 1/t; (vi) tailles de pool de M4 : 1 320 et 6 840.
- [ ] **Données** : sorties de balayage (distributions sur graines), fichiers de numérisation, manifestes de run, archivés selon la [science ouverte et éthique](../docs/08-science-ouverte-ethique.md).
- [ ] **Préenregistrement** (principe des rapports enregistrés, [Chambers 2013] et [Chambers et Tzavella 2022]) : H8.4 à H8.8 avant tout appel d'API; H8.1 à H8.3 après acceptation de T8.2; H8.9 après acceptation de T8.8.
- [ ] **Pages** : visuels 1 à 13 aux trois niveaux, conformes à la charte et à WCAG 2.2 AA (audit réalisé), avec l'encart « Ce que fait vraiment la reine » et les marqueurs « contesté » et « débattu ».
- [ ] **Évaluation** (V0) : pré-test et post-test avec condition témoin statique sur « le groupe est-il toujours plus sage? », objectifs d'apprentissage des tableaux de la section précédente.
- [ ] **Transmission à P7** : H8.4 à H8.8, définition de D1 à D5, carte d'E8.1, plan d'E8.5.

### 10.3 Jalons et critères

Une cible est **acceptée** quand son test automatisé passe et que la décision (relationnelle ou TOST) est consignée avec la plage de graines; **refusée** quand une déviation est consignée avec sa cause; **bloquée** quand une porte est fermée.

| Jalon | Contenu | Critère d'achèvement |
|---|---|---|
| J1 (sans accès supplémentaire) | T8.3, T8.4, T8.5, T8.6, T8.7, T8.10, T8.14; E8.1 | Sept cibles acceptées ou refusées avec déviation; carte d'E8.1 publiée avec les tests (i) à (vi) |
| J2 (G1 levée) | T8.1, T8.2; H8.1 à H8.3; E8.2 | T8.1 et T8.2 acceptées; préenregistrement daté avant l'exécution de H8.1 à H8.3; n_eff publié avec IC |
| J3 (abeille) | T8.8, T8.16, puis T8.9 (G2); H8.9; E8.4 | T8.8 et T8.16 acceptées; carte de ΔE; préenregistrement de H8.9 daté |
| J4 | E8.3; visuels 1 à 13; évaluation V0 | Visuels livrés avec audit d'accessibilité; résultats pré-test et post-test consignés |
| J5 (P7) | E8.5; T8.11 à T8.13 | G7 levée; préenregistrement daté; quatre bras exécutés à jetons égaux |

---

## 11. Risques et réserves

### 11.1 Risques

| ID | Risque ou réserve | Source ou déclencheur | Parade, plan B |
|---|---|---|---|
| **R8.1** | **SI de [Sasaki et al. 2013] non lu** : T, taux de transition, Table S1, effectifs, Fig. S1 à S8 (accès refusé par reCAPTCHA pour le dossier). **T8.2 est en porte no-go** | Dossier, réserves restantes | (1) Obtenir l'article avec SI (accès institutionnel ou laboratoire de Pratt). (2) Plan B : un modèle aux taux ajustés sur les courbes numérisées est un **ajustement**, non une réplication; H8.1 à H8.3 passent en exploratoire, visuels 1 et 2 portent « Modèle simplifié, paramètres ajustés ». Réserve : l'ajustement est sous-déterminé (l'Éq. 2 seule s'écarte jusqu'à 0,06) |
| **R8.2** | **λ de l'Éq. 1 ambigu** (asymptote imprimée 0,5 + 0,5·λ contre Fig. 2A) : incohérence confirmée, non tranchée | Dossier, M1 | Coder les lectures (a) et (b); le critère d'asymptote de T8.1 ne les départage pas; trancher par la Table S1 |
| **R8.3** | **Effectifs de colonies** : 32 colonies d'un côté, 16 testées aux 7 niveaux (16 × 7 = 112) de l'autre; 106 et 112 essais retenus après exclusions de 12 et 10 | Dossier, M1 | Paramétrer le nombre de colonies; ne pas fonder d'erreur-type sur ce nombre avant le SI **[à confirmer]** |
| **R8.4** | **Valeurs numérisées** de la Fig. 3 : ±0,01 **[à confirmer]**, relues à l'œil par la vérification; croisement 58,5 % contre ≈ 59 à 60 % à la relecture | Dossier, pré-tests | Seconde numérisation indépendante; fichier de numérisation; recalculer la marge de T8.2 avec l'incertitude inter-opérateurs |
| **R8.5** | **Comparateur non à budget égal** : une ouvrière présélectionnée contre 20 à 250 ouvrières; effet de taille de colonie non significatif; résultats propres à *T. rugatulus* et au choix de nid | [Sasaki et al. 2013] [T] | Ne pas répondre à QR1 « à budget égal » par T8.1 et T8.2; la réponse vient d'E8.5. Ne pas propager la phrase « la précision croît avec la taille du groupe » de [Feinerman et Korman 2017], qui surinterprète l'effet non significatif |
| **R8.6** | **G du cadre indéfini quand P_ref = P_max** et instable près du plafond : −1,14 à d = 80 %, −5,7 à 90 %, indéfini à 99 % (courbes numérisées, **[I]**) | Dossier, pré-tests | Rapporter ΔP et son IC, plus n_eff ou la différence en log-cote; ne calculer G que si P_ref ≤ 0,9; test (iii). Tension avec le cadre (voir 11.2) |
| **R8.7** | **Modèles d'abeille sans code** : code de [Schürch et Grüter 2014] et paramètres d'[Okada et al. 2014] non lus; règles de [List et al. 2009] à relire; T8.8 : 3 cellules sur 8 **[à confirmer]** | Dossier, 8.4 | Acceptation **relationnelle** seulement; demander le code aux auteurs ou chercher un dépôt; consigner chaque choix de réécriture au registre des déviations |
| **R8.8** | **Résultat propre à un habitat** (Lausanne, habitat tempéré pauvre; les auteurs jugent la danse probablement utile au printemps) | [I'Anson Price et al. 2019] | Ne jamais écrire « la danse nuit »; E8.4 donne la carte selon l'habitat |
| **R8.9** | **Controverse de l'odomètre non tranchée** : [Luebbert et Pachter 2024] (prépublication non évaluée par les pairs) contre [Srinivasan et al. 2024]; réponses de [Srinivasan 2025] et [Stuart 2025] non lues (éditeur) | Dossier | **Aucune cible** et aucune valeur de calibration; étiquette « contesté »; lire les réponses et, si possible, les données brutes avant tout usage; ne pas prendre parti |
| **R8.10** | **Carte cognitive** de [Menzel et al. 2005] : conclusion débattue ([Cheeseman et al. 2014] contre [Cheung et al. 2014]) | Dossier | Étiquette « débattu »; aucun paramètre |
| **R8.11** | **Références non vérifiées ou non lues** : [Grüter et al. 2010] **[non vérifiée]** (l'attribution « copier quand c'est incertain » n'est pas retrouvée dans le résumé; elle n'est pas utilisée ici); contenu « apprentissage contre patrons émergents » de [Beckers et al. 1989] **[non vérifiée]** (seul est vérifié le lien taille de colonie et mode de recrutement, via [Planqué et al. 2010]); [Seeley 2010] (existence vérifiée par la bibliographie, contenu non lu par le dossier); [Condorcet 1785] et [Page 2007] non lus; versions éditeur non comparées pour [Kapoor et al. 2025] et [Feinerman et Korman 2017]; [Kim et al. 2025a] sans version éditeur | Dossier, réserves restantes | Ne citer aucune valeur issue de ces sources sans **[à confirmer]**; lire avant toute valeur chiffrée |
| **R8.12** | **Théorèmes 2 et 4 de [Chen et al. 2024]** : condition inversée et classification contredite par le calcul exact (**[I]**); inchangés dans la version camera-ready | Dossier, M5 | Implanter l'exact (Théorème 3), jamais les énoncés imprimés; n'utiliser la formule de K* que si α > 1 − 1/t; documenter la déviation |
| **R8.13** | **Budget égal avec des LLM** : K = 2 ou 4 seulement aux tarifs relevés; N ≥ 10 exige des poids ouverts; identifiants et tarifs à revérifier; retrait possible de Haiku 4.5 dès le 2026-10-15; `temperature` non réglable sur les modèles récents, donc indépendance des échantillons plus difficile à contrôler; non-déterminisme même à réglage « déterministe » ([Atil et al. 2024]) | Cadre; dossier | Poids ouverts pour N ≥ 10; consigner les versions de modèles; mesurer la corrélation d'erreurs observée plutôt que la supposer |
| **R8.14** | **Parité abeille** : aucun plan « colonie contre individu isolé » trouvé (recherche non exhaustive) | Dossier | Lire [Seeley et Buhrman 2001] et [Seeley 2010] avant d'accepter l'asymétrie; sinon la déclarer dans la note |
| **R8.15** | **Chevauchements avec d'autres fiches** : T8.16 (modèle de [List et al. 2009]) avec [P5](P5-decision-par-quorum.md); T8.11 avec la cible « vote selon N de Li et al. » de [P7](P7-synthese-agentique.md); information privée contre sociale et cascade avec [P1](P1-recrutement-verrouillage.md) et [P6](P6-defaillances-et-defenses.md) | Cette fiche | Le plan de recherche dédoublonne; les T et H de P8 font foi pour leurs chiffres |
| **R8.16** | **Mésusages de résultats à ne pas reproduire** : « la foule converge vers la vérité » (exige indépendance et p > 1/2; limite < 1 sous causes communes, [Dietrich et Spiekermann 2013]); [Hong et Page 2004] ne prouve pas « diversité > capacité » (l'aléa en est la cause); « more agents » de [Li et al. 2024] est un vote indépendant sans communication, non à calcul égal; Self-MoA contredit l'idée que mélanger aide ([Li et al. 2025a]); le +90,2 % de [Hadfield et al. 2025] n'est pas à budget égal | Dossier, corrections | Encarts dans les visuels; critère complémentaire de [Thompson 2014] dans T8.6 |
| **R8.17** | **Chiffre de 3,33 %** (Condorcet, 40 votants d'erreur 1/3) du dossier P5 : présent dans [Sumpter et Pratt 2009], mais non reproductible par calcul exact (0,96 %, 2,14 % ou 1,55 % selon le traitement de l'égalité) | Dossier, pré-tests | P8 n'utilise pas ce chiffre; le signaler à [P5](P5-decision-par-quorum.md) |

### 11.2 Tensions avec le cadre (à arbitrer; le cadre prime)

1. **Taxon.** Le tableau des taxons du cadre nomme *T. albipennis* pour « tandem et quorum »; [Sasaki et al. 2013] et [Sasaki et al. 2018] utilisent *T. rugatulus*. P8 nomme *T. rugatulus* (le cadre exige que chaque simulation nomme son taxon); le tableau du cadre est à compléter.
2. **G.** La définition du cadre est indéfinie quand P_ref = P_max (R8.6). P8 propose ΔP avec IC, n_eff ou log-cote, et G seulement si P_ref ≤ 0,9; l'opérationnalisation finale revient au plan de recherche et à la fiche P7.
3. **« À budget égal ».** QR1 et la définition de G l'exigent; le seul résultat fourmi de P8 ne l'est pas (R8.5).
4. **Statuts épistémiques.** Les visuels 10 et 11 présentent un résultat publié non reproduit, cas absent de la liste fermée du cadre; il est rattaché à *Hypothèse de l'auteur*.
5. **Parité.** Asymétrie fourmi/abeille déclarée en Positionnement et en R8.14.
6. **Numérotation des risques.** R8.k plutôt que R<n> pour éviter les collisions entre fiches.

---

## 12. Effort et dépendances

### 12.1 Prérequis

| Prérequis | Pour quoi |
|---|---|
| **S0** ([S0](S0-socle.md)) : noyau (PRNG, horloge, SSA, enregistreur, scénario, manifeste), harnais de reproduction (TOST, registre des déviations), typologie, glossaire, métriques R et G | Tout le code; forme finale de G |
| **V0** : gabarit de page, charte, évaluation | Section « Visuels et trois niveaux » |
| **P1** ([P1](P1-recrutement-verrouillage.md)) | Protocole d'inversion de qualité et indicateur de cascade (E8.3) |
| **P5** ([P5](P5-decision-par-quorum.md)) | Modèle de quorum et forme de Hill (M1); T8.16 à dédoublonner |
| **P7** ([P7](P7-synthese-agentique.md)) | API, tarifs et identifiants; exécution d'E8.5 et de T8.11 à T8.13 |
| **Accès** | SI de [Sasaki et al. 2013]; textes intégraux d'[Okada et al. 2014], [Dong et al. 2023], [Grüter et al. 2008], Fig. 4 de [I'Anson Price et al. 2019]; réponses [Srinivasan 2025] et [Stuart 2025]; poids ouverts et budget d'API **[à confirmer]** |

### 12.2 Lots de travail

Estimations en **semaines-personne [estimation, à confirmer]** (aucune n'est issue d'une source).

| Lot | Tâche | Semaines-personne | Prérequis | Cibles et livrables |
|---|---|---|---|---|
| A | Accès et lectures bloquantes (G1 à G6) | 1 | — | Portes levées ou documentées |
| B | Fiches de reproduction avant le code | 1,5 | A (partiellement) | G8 |
| C | Théorie et agents abstraits : T8.3, T8.4, T8.5, T8.10, T8.14 | 1,5 | S0, B | J1 |
| D | Hong et Page : T8.6 | 0,5 | S0, B | J1 |
| E | *L. niger* : T8.7 | 1 | S0, B | J1 |
| F | Sasaki : T8.1, T8.2 | 2 | S0, G1, B | J2 |
| G | H8.1 à H8.3, E8.2 | 1 | F | J2 |
| H | Abeille : T8.8, T8.9, T8.16, H8.9, E8.4 | 3,5 | S0, G2, G4, G5, B | J3 |
| I | E8.1 (analytique, début dès C) et E8.3 | 2 | C, E, P1 | J1, J4 |
| J | Visuels 1 à 13, trois niveaux | 4 | V0; lots C à H selon le visuel | J4 |
| K | Note de recherche, préenregistrements, liaison avec l'évaluation V0 | 2 | Tous | J1 à J4 |
| **Total (hors P7)** | | **20** | | |
| L | E8.5 et T8.11 à T8.13 (comptés dans le budget de P7) | Compté dans P7 **[estimation, à confirmer]** | G7, P7, C, I | J5 |

### 12.3 Ordre des tâches

1. **Lot A** en parallèle de tout le reste (le délai d'accès au SI est inconnu).
2. **S0 prêt**, puis **lot B** (fiches) pour M2, M3, M4, M5, M11.
3. **Lots C, D, E, puis E8.1** : tout le jalon J1, sans dépendre d'aucune porte. Les visuels 3, 4, 5, 6, 7 et 9 peuvent commencer ici.
4. **Dès que G1 est levée** : fiche de M1, **lot F**, puis **lot G**. Chemin critique : G1, T8.2, H8.1 à H8.3, visuels 1 et 2.
5. **Lot H** (abeille) après G2, G4, G5, dans l'ordre T8.8, T8.16, T8.9, puis H8.9 et E8.4.
6. **E8.3**, puis fin des visuels et évaluation V0.
7. **Lot K** (note, préenregistrements) en continu; **lot L** avec P7 quand G7 est levée.

---

## 13. Références clés

Étiquettes issues de la [bibliographie consolidée](../docs/11-bibliographie.md). **Statut** : celui de la bibliographie (vérifiée, corrigée, non vérifiée). **Lecture** : celle du dossier P8 ([T] texte intégral, [R] résumé, [M] métadonnées, [S] source secondaire). Étiquettes ambiguës suffixées comme le prescrit la bibliographie : [Choi et al. 2025a], [Kim et al. 2025a], [Kim et al. 2025b], [Li et al. 2025a], [Wu et al. 2024a], [Anthropic 2026a].

**Fourmis**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Sasaki et al. 2013] | corrigée | [T] texte principal; SI non lu |
| [Sasaki et Pratt 2012] | vérifiée | [R] et [S] |
| [Sasaki et Pratt 2011] | vérifiée | [R] |
| [Sasaki et Pratt 2018] | vérifiée | [R] |
| [Sasaki et al. 2018] | vérifiée | [R] |
| [Feinerman et Korman 2017] | vérifiée | [T] (arXiv; texte éditeur non comparé) |
| [Czaczkes et al. 2015] | vérifiée | [R] |
| [Grüter et al. 2011] | vérifiée | [T] |
| [Edwards et Pratt 2009] | vérifiée | [R] |
| [Nicolis et al. 2011] | vérifiée | [R] |
| [Robinson et al. 2011] | vérifiée | [R] |
| [Beckers et al. 1989] | vérifiée (métadonnées); contenu **non vérifiée** | [S] via [Planqué et al. 2010] |
| [Planqué et al. 2010] | corrigée | [T] |
| [Sumpter et Pratt 2009] | vérifiée | [T] |

**Abeilles**

| Étiquette | Statut | Lecture |
|---|---|---|
| [I'Anson Price et al. 2019] | corrigée | [T] |
| [Grüter et al. 2008] | vérifiée | [R] |
| [Grüter et al. 2010] | **non vérifiée** | [R] (résumé court) |
| [Schürch et Grüter 2014] | vérifiée | [M]; code non lu |
| [Okada et al. 2014] | corrigée | [R] |
| [Beekman et Lew 2008] | vérifiée | [R] |
| [Sherman et Visscher 2002] | vérifiée | [R] |
| [Donaldson-Matasci et Dornhaus 2012] | vérifiée | [S] |
| [Dornhaus et Chittka 2004] | vérifiée | [R] |
| [Dong et al. 2023] | vérifiée | [R] |
| [List et al. 2009] | corrigée | [T] |
| [Marshall et al. 2009] | corrigée | [T] partiel |
| [Seeley 2010] | vérifiée (bibliographie) | Contenu non lu |
| [Seeley et Buhrman 2001] | vérifiée | [M] |
| [Esch et al. 2001] | vérifiée | [R] |
| [Menzel et al. 2005] | vérifiée | [R] |
| [Giurfa et al. 2001] | vérifiée | [R] |
| [Cheeseman et al. 2014] | vérifiée | [R] |
| [Cheung et al. 2014] | corrigée | [M] |
| [Tautz et al. 2004] | vérifiée | [T]; mis en cause par [Luebbert et Pachter 2024] |
| [Srinivasan et al. 2000] | vérifiée | [M] |
| [Luebbert et Pachter 2024] | vérifiée | [T]; prépublication non évaluée par les pairs |
| [Srinivasan et al. 2024] | vérifiée | [R] |
| [Srinivasan 2025] | vérifiée | [M] |
| [Stuart 2025] | vérifiée | [M] |

**Théorie de l'agrégation**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Condorcet 1785] | vérifiée | [M]; texte non lu |
| [Dietrich et Spiekermann 2021] | vérifiée | [T] |
| [Dietrich et Spiekermann 2013] | vérifiée | [R] et [S] |
| [Dietrich 2008] | vérifiée | [M] |
| [Ladha 1992] | vérifiée | [R] |
| [Boland 1989] | vérifiée | [M] |
| [Karotkin et Paroush 2003] | vérifiée | [M] |
| [Hong et Page 2004] | corrigée | [T] |
| [Page 2007] | vérifiée | [S]; livre non lu |
| [Krogh et Vedelsby 1995] | vérifiée | [T] |
| [Thompson 2014] | vérifiée | [T] |
| [Grim et al. 2019] | vérifiée | [R] |
| [Romaniega 2023] | vérifiée | [R] |
| [Galton 1907] | vérifiée | [T] |
| [Wallis 2014] | vérifiée | [R] |
| [Lorenz et al. 2011] | vérifiée | [R] |

**Agents**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Li et al. 2024] | vérifiée | [T] |
| [Wang et al. 2023] | vérifiée | [R] |
| [Wang et al. 2024a] | vérifiée | [T] partiel |
| [Li et al. 2025a] | vérifiée | [T] partiel |
| [Chen et al. 2024] | corrigée | [T] |
| [Kapoor et al. 2025] | corrigée | [T] (arXiv; version TMLR non comparée) |
| [Kim et al. 2025a] | vérifiée | [T] |
| [Kim et al. 2025b] | vérifiée | [R] |
| [Snell et al. 2024] | vérifiée | [T] partiel |
| [Brown et al. 2024] | vérifiée | [R] |
| [Wu et al. 2024a] | vérifiée | [R] |
| [Choi et al. 2025a] | vérifiée | [R] |
| [Weng et al. 2025] | vérifiée | [M] |
| [Chen 2026] | vérifiée | [R] |
| [Douven 2026] | vérifiée | [R] |
| [Schoenegger et al. 2024] | vérifiée | [R] |
| [Hadfield et al. 2025] | corrigée | [T] (billet) |
| [Atil et al. 2024] | vérifiée | Hors dossier P8 |
| [Anthropic 2026a] | vérifiée | Tarifs relevés par l'audit méthodologique, à revérifier |

**Méthode**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Grimm et al. 2020] | corrigée | Hors dossier P8 |
| [Axtell et al. 1996] | vérifiée | Hors dossier P8 |
| [Caron-Lormier et al. 2008] | corrigée | Hors dossier P8 |
| [Chambers 2013] | vérifiée | Hors dossier P8 |
| [Chambers et Tzavella 2022] | vérifiée | Hors dossier P8 |
| [Chi et al. 2012] | vérifiée | Hors dossier P8 |


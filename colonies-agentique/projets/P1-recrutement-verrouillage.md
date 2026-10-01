# P1 — Recrutement et verrouillage

**Statut :** fiche de projet, phase 1 du cadre v4 ([00-cadre.md](../docs/00-cadre.md) prime sur cette fiche). **Régime :** production. **Date :** 2026-10-01.
**Sources propres :** dossier [p1-recrutement.md](../recherche/dossiers/p1-recrutement.md); audits [bio-fourmis.md](../docs/annexes/audit/bio-fourmis.md) et [bio-abeilles.md](../docs/annexes/audit/bio-abeilles.md); vérification préliminaire : script [p1_verif_recrutement.py](../recherche/verifications-numeriques/p1_verif_recrutement.py) (Python, bibliothèque standard) et [rapport de vérification](../recherche/verifications/p1-recrutement.md).

**Lecture de la fiche.**
- Niveaux de lecture, repris du dossier : [T] texte intégral lu; [R] résumé lu; [M] métadonnées seulement; [S] source secondaire; [I] inférence ou calcul de cette fiche. Une valeur lue sur une figure est une « lecture de figure » (±3 points de pourcentage).
- Marques : [à confirmer] (valeur non confirmée à la source), [non vérifiée] (référence), [estimation, à confirmer] (effort et budgets).
- Statuts épistémiques d'un énoncé de transposition : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. Aucune cible n'est un *Résultat reproduit* avant le passage de ses critères dans le moteur TypeScript; la réplication du dossier (Python) est préliminaire et exploratoire.
- Identifiants définis ici : cibles T1.1 à T1.9 (T1.k reprend Ck du dossier; C10 du dossier n'est pas une cible, c'est E1.1); hypothèses H1.1 à H1.9; expériences E1.1 à E1.7; risques R1.1 à R1.14 (préfixés par le numéro du projet, pour éviter les collisions entre fiches).
- Documents transversaux : [04-protocole-reproduction.md](../docs/04-protocole-reproduction.md) (gabarit des fiches de reproduction), [05-spec-simulation.md](../docs/05-spec-simulation.md), [06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md), [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md), [08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md), [10-glossaire.md](../docs/10-glossaire.md). Le [plan de recherche](../docs/03-plan-de-recherche.md) consolide les H et les T de cette fiche, qui font foi.

## 1. Objet et questions de recherche

**Questions du cadre servies.**

| QR | Contribution de P1 |
|---|---|
| QR0 (centrale) | Reproduire d'abord, transposer ensuite. P1 reproduit les deux modèles publiés de recrutement (pont à deux branches de [Goss et al. 1989]; sept compartiments de [Seeley et al. 1991]) et l'erreur de danse de [Okada et al. 2014]. Il sépare le « canal » en leviers mesurables (persistance, non-linéarité, rétroaction négative, bruit, taille de colonie) et teste en contrefactuel que le canal, pas le taxon, porte l'effet (E1.6). La réponse apicole conditionnelle à l'habitat existe déjà ([Sherman et Visscher 2002], [Beekman et Lew 2008], [Donaldson-Matasci et Dornhaus 2012]) : P1 ne la redécouvre pas. |
| QR2 (échecs) | Le verrouillage (blocage sur une option devenue mauvaise, cascade) est un mode d'échec. P1 établit quand il survient et quand il ne survient pas : il n'est pas général (cadre, corrections factuelles, point 11). P6 reprend les pathologies et les défenses. |
| QR3 (contrôle) | Volet agentique à règles avec **témoin orchestré** (E1.7, H1.9); l'instanciation LLM relève de P7. |
| QR1, QR4 | Non servies directement (P8; P3 et P7). |

**Questions propres au projet.**
- (a) **Leviers.** Le compromis « canal persistant = rigide, canal éphémère = flexible » se décompose-t-il en leviers indépendants (évaporation ρ, non-linéarité n, rétroaction négative locale, bruit, taille de colonie)? Le dossier l'infère [I]; P1 le teste.
- (b) **Appariement.** Sous la même manipulation (inversion de qualité de source) et la même mesure, comment les dynamiques fourmi et abeille diffèrent-elles? Le raccourci tardif, propre au pont des fourmis, est traité à part (E1.2).
- (c) **Individu vers collectif.** Une réponse individuelle de type Weber, plus du bruit, produit-elle le sigmoïde collectif de la fonction de Deneubourg (E1.5)?
- (d) **Transposition.** Quelles relations (et non quels termes) passent aux agents, avec quel statut, et que gagne ou perd un orchestrateur (E1.7)?

**Rôle dans le programme.** P1 ouvre la phase 1 (aucune dépendance amont hors S0 et le gabarit de V0). Il livre : des paires de modèles reproduits (base du docking du modèle chorégraphique commun); les paramètres de canal (persistance, portée, non-linéarité) qui alimentent le vecteur R; le scénario de recrutement et ses mesures pour P7 (voir section 7); huit visuels à trois niveaux.

**Hors périmètre.** Quorum et tandem (P5, [P5-decision-par-quorum.md](P5-decision-par-quorum.md)); régulation par taux de contact, loi de Little (P4); seuils et castes (P3); pathologies adversariales (P6); mémoire individuelle (P8); construction et transport (P9); exécutions LLM (P7). **Test d'habitat sur la danse** (valeur de la danse selon la densité et la durée de vie des sources) : sa reproduction est portée par [P8](P8-individu-et-colonie.md) (T8.8, T8.9, E8.4). P1 y contribue par l'erreur de danse d'Okada (T1.7, qui recoupe T8.9) et par l'axe d'environnement de E1.6; P5 et P7 attendent aussi une contribution de P1 : l'arbitrage revient au plan de recherche (R1.11).

**Corrections de la v3 appliquées sans rediscussion** (cadre, section des corrections factuelles) : fonction de Deneubourg avec n = 2, k à confirmer, A et B cumulés, réponse individuelle de type Weber (point 3); signal fourmi « scalaire » = simplification de modèle, danse = échantillonnage aléatoire local (point 10); blocage non général (point 11); trois formes d'oubli (point 14); « piste = chemin, danse = lieu » reformulé en granularité de la mémoire partagée (point 15).

## 2. Positionnement

| Source | Existant (niveau de lecture) | Reproduit par P1 | Apport de P1 |
|---|---|---|---|
| [Goss et al. 1989] | Pont à deux modules en série, r ∈ {1 ; 1,4 ; 2}; 3 équations à retards; Monte Carlo à 1 000 simulations (fig. 2a-d); 11 colonies de *Linepithema humile* (publiée *Iridomyrmex humilis*) : 12/26, 15/18, 14/14, 2/18; trois prédictions [T] | T1.1, T1.2, T1.3 | Leviers séparés (H1.1, H1.2), dépôt aller-retour contre retour seul (H1.4), taille (H1.5), mode Weber (E1.5); distributions sur N graines plutôt qu'une trajectoire |
| [Deneubourg et al. 1990], [Deneubourg et al. 1986], [Deneubourg et al. 1983] | Origine de P_A, k = 20, n = 2 (branches égales, recrutement exploratoire), établie par [Goss et al. 1989] [T, réf. 5]; textes de 1990 [M], 1986 [S], 1983 [M] non lus | Aucune (non lu) | Sensibilité à k et n; lecture de 1990 avant de figer k (R1.2) |
| Perna et al. 2012 (étiquette absente de la bibliographie) | Réponse individuelle de type Weber; sigmoïde collectif obtenu avec du bruit directionnel [R, selon l'audit bio-fourmis, constat 7] | Différée (lecture intégrale requise) | E1.5, H1.8 |
| [Seeley et al. 1991], [Camazine et Sneyd 1991] | 7 compartiments; équations en annexe, tableau 2; 119 et 3 abeilles à midi; pentes simulées +18/−30, terrain +34/−19 [T]; version détaillée du modèle [R] | T1.4, T1.5 (provisoire), T1.6 | Écart des pentes documenté (réintégration : +12,2/−18,2); E1.1 |
| [Seeley et Towne 1992], [Seeley 1994] | Les suiveuses ne comparent pas les danses; la part des recrues suit la part des circuits (11 essais); danses mélangées, échantillon aléatoire [R] | Hypothèse du modèle (règle de suivi) | Règle de suivi modifiable (niveau Explorer); corrige le « pub/sub » de la v3 |
| [Beckers et al. 1990] | *L. niger* ne bascule pas vers 1 M si la piste vers 0,1 M est déjà développée; *T. caespitum* bascule [R] | Non (chiffres non lus) | Ancre qualitative du côté fourmi pour E1.1 |
| [Dussutour et al. 2009] | SDE à deux concentrations; *Pheidole megacephala*; 21 réplicats; le bruit améliore le suivi des changements [T via outil]; bibliographie : non vérifiée | T1.9 | H1.6, E1.3 |
| [Grüter et al. 2012] | *L. niger*; encombrement : bascule ≈ 10 min (1 contre 3 accès), pas de bascule (9 contre 27) [T via outil] | T1.8 | H1.3 (dose-réponse), E1.3 |
| [Okada et al. 2014], [Weidenmüller et Seeley 1999], [Gardner et al. 2007], [Esch et al. 2001], [Schürch et al. 2016], [Kohl et Rutschmann 2021] | Bruit et encodage de la danse : erreur typique 10-15°, calibration individuelle et non linéaire, flux optique [T via outil ou R] | T1.7 (seuils d'erreur) | Incertitude de décodage (V5, V6); l'« indice de bascule maximal pour σ ∈ [10 ; 15]° » est une extension, pas une reproduction |
| [Sherman et Visscher 2002], [Beekman et Lew 2008], [Donaldson-Matasci et Dornhaus 2012], [I'Anson Price et al. 2019], [Seeley 2012] | Valeur de la danse selon l'habitat [R] ou [S] | Non (reproduction portée par P8 : T8.8, T8.9) | Cadre de lecture de QR0; volatilité de l'environnement et rareté des sources en E1.6 |
| [Beckers et al. 1989], [Planqué et al. 2010], [Lanan 2014], [Beekman et al. 2001], [Nicolis et Deneubourg 1999] | Stratégies de recrutement selon la taille de colonie (98 espèces, six stratégies; tandem ou groupe pour les petites et moyennes colonies, pistes pour les grandes); 402 espèces; transition de phase avec hystérésis; multistabilité sans changement du comportement individuel [R] | Non (qualitatif, modèles non lus) | E1.4 |
| [Sumpter et Pratt 2003], [Detrain et Deneubourg 2008] | Cadre unifié des fonctions de taux (piste et danse) [R]; comparaison fourmis-abeilles [M] | Non | Lecture préalable : l'originalité de E1.1 n'est établie qu'ensuite (R1.9) |
| Nieh 2004 (étiquette absente de la bibliographie) | Pistes odorantes chez des abeilles sans dard (Meliponini) [S, selon l'audit lacunes] | Non | Témoin de contrefactuel (E1.6) |
| [Jimenez-Romero et al. 2025], [Han et Zhang 2025], [Han et al. 2026], [Choi et al. 2025b] | Modèle Ants de NetLogo piloté par un LLM; tableau noir; conformité et topologie; conformité de groupe [T via outil ou R] | Non (P7) | Version à règles (E1.7); estimateur de « n effectif » |

## 3. Hypothèses falsifiables

Toutes sont directionnelles. Les tailles d'effet minimales sont des propositions [I; à confirmer], à figer au préenregistrement après un pilote. Unité d'analyse : le run. Famille confirmatoire (correction de Holm, α = 0,05) : H1.1 à H1.4; les autres sont exploratoires (Benjamini-Hochberg, q = 0,10, ou aucune correction, mais étiquetées), selon le dossier [x-methodes](../recherche/dossiers/x-methodes.md). Les intervalles sont des IC à 95 % par bootstrap.

| H | Énoncé dirigé | Variables | Effet minimal | Critère de réfutation | Statut |
|---|---|---|---|---|---|
| H1.1 | Pont de Goss avec branche courte ajoutée tard : la probabilité que la courte soit adoptée croît avec l'évaporation ρ | VI : ρ ∈ {0 ; 0,1 ; 0,3 ; 1 ; 3} × (1/30 min⁻¹) [à confirmer], r = 2, k = 20, n = 2, dépôt aller-retour. VD : P_late = part des simulations où la courte porte plus de 50 % du trafic aux passages 1501-2000 | P_late(ρ max) − P_late(0) ≥ 0,30 [I; à confirmer] | Borne supérieure de l'IC de l'écart < 0,30, ou rang de P_late non croissant avec ρ | Confirmatoire préenregistré |
| H1.2 | À r = 1 et ρ = 0, la part de simulations verrouillées décroît quand n passe de 2 à 1 | VI : n ∈ {1 ; 2 ; 3}, k ∈ {5 ; 20 ; 50}. VD : L = part des simulations avec au moins 80 % du trafic (passages 501-1000) sur une même branche; référence publiée à n = 2, k = 20 : ≈ 76 % (lecture de figure : 37 + 39) | L(2) − L(1) ≥ 0,30 [I; à confirmer] | Borne supérieure de l'IC de l'écart < 0,30, ou L non croissante en n sur {1 ; 2 ; 3} | Confirmatoire préenregistré |
| H1.3 | Modèle à deux sources, une meilleure source offerte tard, ρ = 0, n = 2 : le temps de bascule médian décroît quand la capacité de la source établie diminue (rétroaction négative par encombrement) | VI : capacité de la source établie (accès), incluant les deux extrêmes de T1.8. VD : t_switch médian, censuré à 60 min | t_switch(strict) ≤ 0,5 × t_switch(lâche) [I; à confirmer], monotone | Rapport dont la borne inférieure de l'IC dépasse 0,5, ou non-monotonie | Confirmatoire préenregistré (après la porte C) |
| H1.4 | Prédiction 3 de [Goss et al. 1989] : si les fourmis ne marquent qu'au retour, la colonie ne sélectionne pas la courte plus souvent que la longue | VI : dépôt ∈ {aller-retour ; retour seul}, r = 2. VD : P_court = probabilité que la courte porte plus de 50 % du trafic (passages 501-1000) | P_court(aller-retour) − P_court(retour seul) ≥ 0,25 [I; à confirmer], et P_court(retour seul) ≤ 0,50 | Borne inférieure de l'IC de P_court(retour seul) > 0,55 [à confirmer] | Confirmatoire préenregistré. Prédiction de modèle (« en cours de test » en 1989), pas un résultat expérimental |
| H1.5 | À r = 2 sans branche tardive, P_court croît avec le flux Φ (taille de colonie) | VI : Φ ∈ {0,25 ; 0,5 ; 1 ; 2} fourmi/s par direction [à confirmer]. VD : P_court | P_court(Φ max) − P_court(0,5) ≥ 0,10 [I; à confirmer] | Borne supérieure de l'IC < 0,10 | Exploratoire (ouvre R1.5) |
| H1.6 | SDE de Dussutour : la fraction de réplicats qui reviennent à la courte après déblocage croît avec le bruit σ | VI : σ de 0 à la valeur étalonnée sur T1.9. VD : fraction en phase 3 (16/21 observés) | +0,20 [I; à confirmer] | Borne supérieure de l'IC < 0,20 | Exploratoire (σ à étalonner; unité de ρ à confirmer) |
| H1.7 | À manipulation et règles individuelles identiques, la variation de t½ due au canal (ρ, n, rétroaction négative, portée) dépasse d'au moins un facteur 2 celle due au taxon | VI : canal ∈ {piste ; danse ; piste portée par l'abeille (témoin Meliponini) ; signal éphémère porté par la fourmi}, taxon ∈ {fourmi ; abeille}. VD : t½, variance expliquée | Rapport ≥ 2 [I; à confirmer] | Rapport ≤ 1 (IC) | Exploratoire (dépend du docking de la couche 3) |
| H1.8 | Des individus à réponse de type Weber avec bruit directionnel η produisent une réponse collective que la fonction de Deneubourg ajuste avec un exposant n_fit croissant en η | VI : η. VD : n_fit (moindres carrés de P(A) selon A et B) | n_fit(η max) − n_fit(0) ≥ 0,5 [I; à confirmer] | n_fit non croissant ou écart < 0,5 | Exploratoire; porte F (lecture de Perna et al. 2012) |
| H1.9 | Tâche décomposable (allocation entre sources indépendantes) : un orchestrateur à information exacte réalloue au moins aussi vite (t½) que la coordination émergente par tableau partagé; l'écart se referme quand l'information de l'orchestrateur est retardée de d pas | VI : coordination ∈ {émergente ; orchestrée(d)}. VD : t½, p_best, coût en messages | Existence de d* dans [0, d_max] tel que t½ orchestré(d*) ≥ t½ émergent; d_max au pilote [à confirmer] | Orchestrateur plus lent à d = 0, ou aucun croisement sur [0, d_max] | Exploratoire; *Hypothèse de l'auteur*; instanciation LLM en P7 |

## 4. Modèles de référence

### 4.1 Préréglages (taxon nommé; le canal est une variable du modèle, jamais un attribut du taxon)

| Préréglage | Taxon | Mécanisme et canal | Type de modèle | Intégration | Lecture |
|---|---|---|---|---|---|
| pont-Goss | *Linepithema humile* (publiée *Iridomyrmex humilis* [S]) | Piste de masse, dépôt aller-retour, évaporation négligée | Équations moyennes à retard (1)-(3) et Monte Carlo à temps discret | Pas de 1 s [I, réimplantation du dossier]; RK4 avec tampon d'historique réservé à l'analyse déterministe [I]. La méthode exacte du Monte Carlo publié n'est pas documentée dans le dossier [à confirmer] | [Goss et al. 1989] [T] |
| dyn-Dussutour | *Pheidole megacephala* | Piste de masse, flux décroissant, bruit | SDE d'Itô à deux variables | Euler-Maruyama, convergence vérifiée à dt/2 [I] | [Dussutour et al. 2009] [T via outil] |
| encombrement-Grüter | *Lasius niger* | Piste persistante (≥ 40-60 min), rétroaction négative par encombrement | Modèle **construit par P1** (plafond de débit par source), à valider sur la fig. 3A et 3C; le dossier ne donne aucune équation | À définir dans la fiche de reproduction | [Grüter et al. 2012] [T via outil] (données, pas d'équation lue) |
| ruche-Seeley | *Apis mellifera* | Danse; recrutement et abandon; les suiveuses tirent une danseuse au hasard | EDO non linéaires à 7 compartiments; version agent stochastique (N = 125) | RK4, pas fixe de 0,01 min (dossier); algorithme de Gillespie pour la version agent | [Seeley et al. 1991] [T] |
| danse-Okada | *Apis mellifera* | Danse avec erreur angulaire et d'odomètre | Modèle à agents (simulation d'une journée de butinage) | À lire [à confirmer] | [Okada et al. 2014] [T via outil, partiel] |
| témoin-Meliponini | Meliponini | Piste chez une abeille (contrefactuel) | Aucun modèle publié lu : configuration de canal du modèle commun | Celle du modèle commun | Nieh 2004 (étiquette absente de la bibliographie) [S] |

### 4.2 Pont à deux branches — [Goss et al. 1989] [T]

Emplacement : p. 579-580, éq. (1)-(3); fig. 1 (dispositif) et fig. 2 (résultats). Chaque module a une branche courte et une branche longue, chacune à 30° de l'axe, et mesure 12,5 cm (fig. 1a). r est le rapport longueur longue sur longueur courte. S_j et L_j : phéromone sur la courte et la longue au point de choix j (j = 1 côté nid, j = 2 côté nourriture; j′ le point opposé).

```
dS_j/dt = Φ·p_{s,j'}(t − 20) + Φ·p_{s,j}(t)            (1)
dL_j/dt = Φ·p_{l,j'}(t − 20r) + Φ·p_{l,j}(t)           (2)
p_{s,j} = (k + S_j)^n / [(k + S_j)^n + (k + L_j)^n]     (3)   p_{s,j} + p_{l,j} = 1
```

| Paramètre | Valeur | Emplacement |
|---|---|---|
| Φ | 0,5 fourmi/s par direction (Monte Carlo) | légende fig. 2 |
| Temps de traversée | ≈ 20 s (courte), 20r s (longue) | p. 580 |
| k, n | 20 ; 2 (k à confirmer, voir 4.3) | éq. 3 |
| Dépôt | 1 unité par fourmi, dans les deux sens | p. 579 |
| Évaporation | négligée; durée de vie ≈ 30 min, du même ordre que l'expérience [S, d'après Van Vorhis Key et Baker 1982, bibliographie : non vérifiée] | p. 580 |
| Comptage | passages 501-1000 (ΣΦ = 500); 1 000 simulations par condition | légende fig. 2 |
| Branche tardive | courte ajoutée après le 1000e passage; comptage 1501-2000 | fig. 2d |
| Expériences réelles | courte ajoutée 30 min après le début, mesure 20-30 min plus tard; ΣΦ de 407 à 912 en 10 min pour r = 2 | p. 581, légende fig. 2 |

Le « 20 » des retards (secondes) et k = 20 (unités de phéromone) sont deux grandeurs distinctes; leur égalité est une coïncidence. A et B sont des passages cumulés. Trois prédictions publiées : (1) P(courte) croît avec r; (2) une courte ajoutée après l'établissement de la piste n'est pas adoptée; (3) si les ouvrières ne marquent qu'au retour, la colonie ne peut pas sélectionner la courte plus souvent que la longue.

### 4.3 Fonction de choix de Deneubourg

`P_A = (k + A)^n / [(k + A)^n + (k + B)^n]`. La forme et les valeurs k = 20, n = 2 viennent d'un choix entre deux branches **égales** en recrutement exploratoire ([Deneubourg et al. 1990], réf. 5 de [Goss et al. 1989] [T]); le texte de 1990 n'a pas été lu : **k = 20 [à confirmer]**, de même que la méthode d'estimation de k et n. Lecture [I] : k fixe le seuil de phéromone sous lequel le choix reste presque aléatoire; n > 1 rend le choix plus que proportionnel et crée la bistabilité. n = 2 est un ajustement **collectif**; à l'échelle individuelle, la réponse est de type Weber (Perna et al. 2012, étiquette absente de la bibliographie [R]; cadre, point 3). Traitement dans P1 : k est un paramètre du dispositif avec analyse de sensibilité (H1.2), n = 2 n'est pas une règle individuelle (E1.5).

Variante à ne pas confondre : [Dussutour et al. 2009] emploient `p_i = c_i^α / (k + c_1^α + c_2^α)`, α = 2, k = 12 (placement exact de k à reconfirmer [à confirmer]).

### 4.4 Sept compartiments — [Seeley et al. 1991] [T]

Emplacement : p. 283-286 (structure), fig. 4 (schéma), tableau 2 (paramètres), annexe p. 290 (équations); [Camazine et Sneyd 1991] en donne la discussion détaillée [R, non lu]. H_A, H_B : en déchargement; D_A, D_B : danse (temps de retour inclus); A, B : à la source; F : suiveuses. A = source à 2,50 mol/l, B = 0,75 mol/l.

```
dA/dt   = (1 − f_d^A)(1 − f_x^A) p1 H_A + p2 D_A + f_l^A p4 F − p3 A
dD_A/dt = f_d^A (1 − f_x^A) p1 H_A − p2 D_A
dH_A/dt = p3 A − p1 H_A
dF/dt   = f_x^A p1 H_A + f_x^B p5 H_B − p4 F
dB/dt   = (1 − f_d^B)(1 − f_x^B) p5 H_B + p6 D_B + f_l^B p4 F − p7 B
dD_B/dt = f_d^B (1 − f_x^B) p5 H_B − p6 D_B
dH_B/dt = p7 B − p5 H_B
```

Fonction de suivi (texte p. 285-286; formalisation [I]) : `f_l^A = τ_A·D_A / (τ_A·D_A + τ_B·D_B)`, `f_l^B = 1 − f_l^A`. Seule l'**intensité** (τ·D) pilote la répartition : le vecteur direction-distance de la danse n'entre pas dans le modèle, qui ne peut donc pas répondre à QR0 sur le contenu (c'est le rôle de danse-Okada).

| Paramètre (p_i = 1/T_i, min⁻¹) | Valeur | Source citée |
|---|---|---|
| T1, T2, T3 (A) | 1,0 ; 1,5 ; 2,5 min | tableau 1 |
| T5, T6, T7 (B) | 3,0 ; 2,0 ; 3,5 min | tableau 1 |
| T4 (suivi de danses vers butinage) | 60 min | [Seeley et Visscher 1988] (121 min pour des sources à 1 600 m; 60 car mangeoires à 400 m); bibliographie : non vérifiée |
| f_x^A ; f_x^B (abandon par voyage) | 0,00 ; 0,04 | tableau 1; (1 − p)^5 = 0,80 en 30 min |
| f_d^A ; f_d^B (probabilité de danser) | 1,00 (extrapolé) ; 0,15 | tableau 1 |
| τ_A ; τ_B | 0,38 ; 0,02 | 14 et 1 circuits × 2,4 s, divisés par T2 = 90 s et T6 = 120 s |
| Conditions initiales | A = B = 11, D_A = D_B = 1, H_A = H_B = 0, F = 101 (total 125) | p. 286 |

Hypothèses du modèle : effectif de butineuses fixe, départ simultané, deux sources, seuils de réponse fixes (p. 284-285). Données individuelles utiles pour une fonction qualité-comportement continue (tableau 1, mangeoire de la colonie expérimentale) :

| Sucrose (mol/l) | 2,00 | 1,50 | 1,00 | 0,50 |
|---|---|---|---|---|
| Probabilité de revenir | 1,00 | 1,00 | 1,00 | 0,60 |
| Tempo (voyages/abeille/30 min) | 6,1 | 6,2 | 6,0 | 3,9 |
| Probabilité de danser | 0,80 | 0,59 | 0,26 | 0,00 |
| Circuits par retour | 9,8 ± 15,4 | 5,4 ± 4,9 | 1,6 ± 3,9 | 0,0 |
| Recrues par 15 min | 10,3 ± 5,4 | 5,6 ± 4,0 | 2,2 ± 1,6 | 0,0 |

Mécanisme revendiqué : « sélection naturelle entre sources » (abandon et recrutement), sans comparaison : 2 abeilles sur 117 ont visité les deux mangeoires. Détail expérimental à reporter : le matin du 19 juin, la mangeoire nord était à 1,00 M sur le terrain, à 0,75 M dans la simulation; mangeoires à 400 m; 4 000 abeilles marquées pour une population d'environ 4 200; environ 125 abeilles ont visité les mangeoires.

### 4.5 Flexibilité des fourmis, erreur et encodage de la danse

- **Convention.** Dans cette fiche, ρ est le taux de décroissance continu (dc/dt = −ρc, demi-vie τ½ = ln 2/ρ); ce n'est pas la persistance ρ de l'Ant System (cadre, point 4).
- **SDE de [Dussutour et al. 2009]** [T via outil] : `dc_i/dt = p_i·Φ·q_i − ρ·c_i`; forme d'Itô `dc_i = [p_i Φ q_i − ρ c_i] dt + σ dW_i`. Valeurs : k = 12, q_1 = 0,09, q_2 = 0,13, ρ = 0,00085, α = 2 (confirmées à la vérification indépendante). Φ diminue linéairement de 100 % à 50 % entre t = 60 et 120 min (borne supérieure donnée par le texte). **Unité de temps de ρ, affectation de q_1 et q_2 aux branches, méthode d'ajustement (grille, moindres carrés) et σ : [à confirmer].**
- **Encombrement** [Grüter et al. 2012] [T via outil] : *L. niger*; 1 contre 3 accès : bascule en ≈ 10 min en moyenne (fig. 3A); 9 contre 27 : pas de bascule (fig. 3C); phéromone persistante au moins 40-60 min. Aucune équation lue.
- **Erreur de danse** [Okada et al. 2014] [T via outil, partiel] : erreur typique de 10-15°; ≈ 85 % des courses à moins de 15° (304 sur 358), erreur décroissante avec la distance (fig. 2e); protocole publié : 20 simulations par condition, 1 000 abeilles, 2, 5, 7 ou 10 mangeoires de 400 à 2 000 m. Le protocole iMoAD-f exact est à relire.
- **Encodage** : direction = angle de la course frétillante par rapport à la verticale ([Frisch 1967] [M]); distance = flux optique cumulé ([Esch et al. 2001] [R]); calibration individuelle, écart de compréhension jusqu'à ≈ 50 % ([Schürch et al. 2016] [R]); calibration non linéaire ([Kohl et Rutschmann 2021], tableau 2, *A. m. carnica*, 0,1-1,7 km, t_w en s, d en km) :

```
t_w = 0,1993 + (2,0018/0,6717)·(1 − e^(−0,6717·d))            (non linéaire)
t_w = 0,2917 + 1,4282·d  (d ≤ 1,0328 km);  t_w = 1,0767 + 0,6683·d  (au-delà)   (segmenté)
t_r = 1,3712 + 0,5238·d                                          (retour, linéaire)
```

### 4.6 Types de recrutement et taille de colonie (cartographie)

| Type | Taxon de référence | Où dans le programme | Lecture |
|---|---|---|---|
| Piste de masse | *L. humile*, *L. niger*, *P. megacephala* | P1 (pont-Goss, dyn-Dussutour, encombrement-Grüter) | [T] ou [T via outil] |
| Danse | *Apis mellifera* | P1 (ruche-Seeley, danse-Okada) | [T] |
| Piste chez l'abeille (contrefactuel) | Meliponini | P1 (E1.6) | [S] |
| Tandem ou groupe (petites et moyennes colonies) | *Temnothorax* | P5 | [R] ([Planqué et al. 2010]) |
| Fourragement sans piste, réglé par les contacts | *Pogonomyrmex barbatus* | P4 | cadre |

Les stratégies de recrutement s'associent à la taille de colonie ([Beckers et al. 1989] [R], [Planqué et al. 2010] [R]) et à la distribution des ressources ([Lanan 2014] [R]). La taille est un facteur de P1 (H1.5, E1.4).

### 4.7 Résumé ODD (format de [Grimm et al. 2020]; ODD complet par modèle dans les fiches de reproduction)

| Élément | pont-Goss | ruche-Seeley | dyn-Dussutour |
|---|---|---|---|
| But et patrons | Distribution du % de trafic sur la courte (fig. 2); non-adoption de la courte tardive | État à midi (119 et 3); réallocation après inversion; part de la riche à 16 h | Suivi des changements (21/21, 18/21, 16/21) |
| Entités, variables, échelles | Fourmis anonymes (flux Φ); S_j, L_j en passages cumulés; t en s | 7 compartiments en nombre d'abeilles; t en min, de 8 h à 16 h | c_1, c_2; t : unité à confirmer |
| Ordonnancement | Pas de 1 s; arrivées de Bernoulli (Φ) par côté; dépôt à l'entrée puis au point opposé à l'arrivée (retard 20 ou 20r s); ordre des deux côtés testé (synchrone ou asynchrone) | Pas fixe RK4; version agent : événements de Gillespie | Euler-Maruyama |
| Concepts de conception | Émergence (verrouillage); interaction indirecte; stochasticité (arrivées, tirage de branche); observation (distribution sur N graines) | Émergence de la répartition; stochasticité en version agent | Bruit fonctionnel |
| Initialisation | S = L = 0; courte ouverte après le 1000e passage (variante) | A = B = 11, D = 1, H = 0, F = 101 | c(0) non lu [à confirmer] |
| Données d'entrée | Aucune | Terrain (fig. 1, 5) pour comparaison | Φ(t) décroissant |

### 4.8 Parité fourmi-abeille et asymétries déclarées

- Côté fourmi : trois modèles de référence (dont un construit); côté abeille : deux (dont un à lire). Chaque taxon a son expérience propre; la comparaison passe par le protocole commun d'inversion de qualité (E1.1).
- Le pont n'a pas de sens chez l'abeille, qui vole en ligne droite vers la source codée [I, audit bio-abeilles] : le raccourci tardif reste une expérience propre à la fourmi (E1.2), signalée comme asymétrique.
- Côté fourmi, aucune manipulation de qualité n'a ses chiffres lus ([Beckers et al. 1990] [R]) : l'inversion fourmi de E1.1 s'appuie sur le modèle de [Dussutour et al. 2009] (q_i) et reste une prédiction.
- La valeur de la danse selon l'habitat est portée par P8 (T8.8, T8.9, E8.4); P1 n'en reprend que l'erreur de danse et l'axe d'environnement de E1.6.
- Le freinage actif (signal d'arrêt chez l'abeille) n'est pas modélisé dans P1; chez la fourmi, la rétroaction négative par encombrement l'est (E1.3).

## 5. Cibles de reproduction

Correspondance avec le dossier : T1.k = Ck pour k = 1 à 9. C10 (aucun résultat publié) devient l'expérience E1.1, car ce n'est pas une reproduction. Chaque cible exige une fiche de reproduction **avant** le code (équations, paramètres, unités, figure cible numérisée, critère chiffré), selon le [protocole de reproduction](../docs/04-protocole-reproduction.md). Les valeurs d'histogramme sont des lectures de figure (±3 points).

| T | Espèce (préréglage) | Grandeur | Valeur publiée | Niveau d'acceptation | Tolérance ou marge | Rép. | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| T1.1 | *L. humile* (pont-Goss) | % du trafic sur la courte, passages 501-1000; classes 0-20, 20-40, 40-60, 60-80, 80-100 | r = 1 : ≈ 37/9/8/7/39; r = 1,4 : ≈ 23/10/8/10/49; r = 2 : ≈ 15/6/6/7/66 | Équivalence distributionnelle | Chaque classe à ±5 points de la lecture (lecture ±3, ES de Monte Carlo ≈ 1,5); TOST δ = 5 points à préenregistrer (note 1) | 1 000 par r | [Goss et al. 1989], fig. 2a-c, éq. 1-3 | [T]; lecture de figure | Go si 15 classes sur 15 dans la tolérance. Préliminaire (Python) : atteint (37/10/7/7/39; 23/8/5/14/50; 17/5/6/7/64). No-go : bloque la porte A |
| T1.2 | *L. humile* (pont-Goss) | Même grandeur, courte ajoutée après le 1000e passage; comptage 1501-2000 | r = 2 : ≈ 100/0/0/0/0 | Équivalence distributionnelle (seuil) | Au moins 95 % des simulations dans la classe 0-20 %; ρ = 0 (ou ρ ≪ 1/30 min⁻¹) | 1 000 | [Goss et al. 1989], fig. 2d | [T]; lecture de figure | Go si atteint (préliminaire : 100 %). No-go : bloque H1.1 |
| T1.3 | *L. humile* (colonies réelles) | Colonies avec courte majoritaire sur le total, 11 colonies | r = 1 : 12/26; r = 1,4 : 15/18; r = 2 : 14/14; branche tardive : 2/18 | Alignement relationnel (ordinal) | P(courte majoritaire) croissante en r; P(tardive) < 0,2 × P(r = 2); critère statistique strict écarté (note 2) | ≥ 1 000 simulations | [Goss et al. 1989], p. 581 et légende fig. 2 | [T] | Informative, non bloquante : alimente R1.5 et H1.5 |
| T1.4 | *A. mellifera* (ruche-Seeley) | Effectif (A + D + H) de la source riche et de la pauvre à t = 240 min | 119 et 3 | Identité numérique à tolérance (déterministe) | Riche 119 ± 3; pauvre 3 ± 1; dt ≤ 0,05 min et stabilité à dt/2 | 1 | [Seeley et al. 1991], annexe, tableau 2, p. 286 | [T] | Go si atteint (préliminaire : 118,7 et 3,0). No-go : bloque le modèle (porte B) |
| T1.5 | *A. mellifera* (ruche-Seeley) | Réallocation après l'inversion de midi (fig. 5) | Pentes simulées +18 et −30 abeilles/30 min (terrain +34 et −19) | Alignement relationnel, **provisoire**; critère définitif suspendu | Provisoire : la nouvelle riche dépasse l'ancienne en moins de 180 min et le rapport riche/pauvre à 16 h est d'au moins 2,5. Définitif (pentes ±20 %) suspendu | 1 | [Seeley et al. 1991] (fig. 5); [Camazine et Sneyd 1991] | [T] pour les valeurs; modèle de 1991 [R] | Provisoire atteint (147 min; 80,4/29,5 ≈ 2,7 [I]); définitif no-go jusqu'à la lecture du J. Theor. Biol. (R1.1, note 3) |
| T1.6 | *A. mellifera* (ruche-Seeley, version agent) | Part de la source riche parmi les engagées à 16 h | Terrain (fig. 1), nord/sud : 19 juin, midi 12/91, 16 h 121/10; 20 juin, midi 92/24, 16 h 13/107 | Alignement relationnel | À 16 h, la riche porte au moins 70 % des engagées dans au moins 95 % des répétitions; effectifs absolus non ciblés (≈ 4 200 abeilles, recrutement non simultané, nord à 1,00 M le matin) | 100 (dossier); 1 000 recommandé [I] | [Seeley et al. 1991], fig. 1 | [T] (le texte, p. 286, donne 90 au sud à midi, la fig. 1 donne 91 : on retient la fig. 1) | Go si atteint; requiert T1.4 et la version agent |
| T1.7 | *A. mellifera* (danse-Okada) | Gain d'une colonie avec danse (erreur σ) sur une colonie sans danse, selon σ et le nombre de mangeoires | σ ≤ 10° : bénéfique dans toutes les conditions testées; 15° : bénéfique seulement si les sources sont rares; ≥ 30° : aucun bénéfice; 0-5° : grand succès sur les mangeoires connues, échecs sur les nouvelles | Alignement relationnel (signes, ordre des seuils) | σ ∈ {0 ; 5 ; 10 ; 15 ; 30 ; 60}°; 1 000 abeilles; 2, 5, 7 ou 10 mangeoires à 400-2 000 m; signe conforme dans chaque condition | ≥ 50 par σ (20 par condition publiés) | [Okada et al. 2014] | [T via outil, partiel] | No-go pour les seuils numériques tant que le protocole iMoAD-f n'est pas relu (R1.7, note 4); porte E |
| T1.8 | *L. niger* (encombrement-Grüter) | Temps de bascule vers la nouvelle source selon la capacité de la source établie | 1 contre 3 accès : ≈ 10 min (fig. 3A); 9 contre 27 : pas de bascule (fig. 3C) | Alignement relationnel | Plafond de débit par source : t_switch médian ≤ 20 min en forte contrainte; moins de 50 % sur la nouvelle source après 60 min en faible contrainte | ≥ 100 | [Grüter et al. 2012], fig. 3 | [T via outil] | Go si atteint; modèle à construire, fiche avant code (porte C) |
| T1.9 | *P. megacephala* (dyn-Dussutour) | Comptes sur 21 réplicats : courte en phase 1; repli sur la longue (courte bloquée); retour sur la courte (30 dernières min) | 21/21; 18/21; 16/21 | Équivalence distributionnelle | Les trois comptes dans l'IC à 95 % du modèle; k = 12, q_1 = 0,09, q_2 = 0,13, ρ = 0,00085 [unité à confirmer], α = 2, σ à étalonner | 21 réplicats × 100 lots | [Dussutour et al. 2009] | [T via outil]; bibliographie : non vérifiée | No-go tant que l'unité de ρ n'est pas confirmée (R1.4); porte D |

**Notes.**
1. **T1.1, marge.** À 1 000 simulations, l'ES de Monte Carlo d'une classe vaut au plus ≈ 1,6 point (√(0,25/1 000) [I]). Un écart observé de 4 points (r = 1,4, classe 60-80 % : 14 obtenu contre 10 lu) ne passe un TOST à δ = 5 points qu'avec ≈ 3 300 simulations pour cette classe [I, calcul]. Le critère d'acceptation reste celui du dossier (±5 points); le n du TOST se fixe au préenregistrement.
2. **T1.3.** Les vraies colonies sont plus fiables que le modèle à Φ = 0,5 : P(courte majoritaire sous le modèle) = 0,62 pour r = 1,4 (observé 15/18, P = 0,047, unilatéral, à la limite) et 0,75 pour r = 2 (observé 14/14, P = 0,018); un critère « observé dans l'IC du modèle » échoue donc au sens unilatéral et ne sert pas de critère d'acceptation (bilatéral à 95 %, seul r = 2 échouerait [I]). La valeur non arrondie p ≈ 0,615 donnerait 0,043, non reproductible dans le script [à confirmer]. Le rapport de vérification relève, sous lumière rouge, 11 essais sur 14 (r = 2) au-dessus de 80 % sur la courte, donnée absente du dossier [à confirmer].
3. **T1.5.** Avec le tableau 2, la réintégration donne +12,2 et −18,2 abeilles/30 min (contre +18 et −30), un croisement à 147 min et 80,4 et 29,5 abeilles à 16 h; f_x^B ≈ 0,07-0,08 retrouve les pentes mais ramène l'état de midi à ≈ 1 abeille au nord au lieu de 3 : aucun réglage unique de f_x^B ne satisfait les deux contraintes. Trois explications restent ouvertes : fonction d'abandon différente, définition de la pente (comptage par demi-heure comme sur le terrain), paramètres de l'après-midi. Ne pas écrire « modèle de Camazine et Sneyd reproduit ».
4. **T1.7.** L'« indice de bascule maximal pour σ ∈ [10 ; 15]° » n'est pas un résultat publié : extension, présentée comme contribution. La fiche P8 réutilise la même source (voir R1.11).

**Portes (locales à P1; le plan de recherche les consolide).**

| Porte | Condition | Débloque |
|---|---|---|
| A | T1.1 et T1.2 atteintes dans le moteur TypeScript, accord avec l'implémentation Python à moins de 3 ES de Monte Carlo | E1.2, volet fourmi de E1.4; H1.1, H1.2, H1.4, H1.5 |
| B | T1.4 atteinte; T1.5 provisoire atteint | E1.1 (exploratoire), volet abeille de E1.4, E1.6 |
| B′ | T1.5 définitif (lecture du J. Theor. Biol.) | E1.1 confirmatoire; énoncé « reproduit » pour la dynamique après inversion |
| C | T1.8 atteinte | E1.3 (a); H1.3 |
| D | Unité de ρ confirmée et T1.9 atteinte | E1.3 (b); H1.6 |
| E | Protocole d'Okada relu et T1.7 atteinte | Seuils numériques de V5; volet erreur de danse de E1.6 |
| F | Perna et al. 2012 lu en texte intégral | E1.5; H1.8; mode Weber des pages |
| G | Lecture de Sumpter et Pratt 2003, Detrain et Deneubourg 2008 et Nieh 2004 | Revendication d'originalité de E1.1; énoncés sur les Meliponini |

## 6. Expériences originales

Ce sont des prédictions ou des extensions, jamais des reproductions. Répétitions : n = p(1−p)/ES\*² (dossier x-methodes, rubrique « Plan d'étude de simulation ») : ES de Monte Carlo ≤ 0,005 pour le confirmatoire (10 000 au pire cas), ≤ 0,01 pour l'exploratoire (2 500) [I].

**E1.1 — Inversion de qualité appariée, fourmi et abeille** (C10 du dossier).
- *Plan.* Même manipulation à t_c (permutation des qualités des deux sources) et même mesure pour deux préréglages : ruche-Seeley (permutation des états à midi, comme dans le script du dossier) et dyn-Dussutour (permutation de q_1 et q_2). t_c : midi (240 min) côté abeille; côté fourmi, l'instant où au moins 90 % de l'effort est sur la meilleure option [I; à confirmer]. Perturbation secondaire : retrait de 30 % des agents à t_c (cadre, robustesse).
- *Facteurs.* Préréglage (2) × ρ (grille de H1.1, côté fourmi) × perturbation (2).
- *Mesures.* p_best(t) normalisée (part de l'effort sur la meilleure option selon le temps depuis le changement); t½ (temps pour réallouer 50 % de l'effort); taux de verrouillage sur l'option devenue mauvaise (indicateur de cascade); G_int avec la référence « agents indépendants sans canal » (f_l = 1/2 côté abeille, n = 0 côté fourmi [I]).
- *Répétitions.* 2 500 (plancher du dossier : 100).
- *Critère de lecture.* Courbes sur le même axe (V4), t½ médian avec IC; lecture **descriptive** : aucun test d'espèce confirmatoire, l'espèce étant confondue avec la structure du modèle. Ancre qualitative : [Beckers et al. 1990] [R].
- *Statut.* Exploratoire; porte B; confirmatoire seulement après les portes B′ et G.

**E1.2 — Raccourci tardif et leviers du verrouillage côté fourmi, présenté à part** (C10 du dossier pour le raccourci tardif).
- *Plan.* Pont-Goss en trois blocs. (a) r = 2, courte ajoutée après le 1000e passage, comptage 1501-2000 (T1.2) : montrer le blocage **et** sa levée par évaporation (H1.1). (b) r = 1, sans branche tardive, passages 501-1000 : part verrouillée selon n (H1.2). (c) r = 2, sans branche tardive, passages 501-1000 : dépôt aller-retour ou retour seul (H1.4). La levée par bruit relève de E1.3; demi-tours ([Beckers et al. 1992], non lu) et phéromone d'exploration (audit bio-fourmis, constat 6) ne sont pas modélisés (R1.12).
- *Facteurs.* (a) ρ (grille de H1.1) × n ∈ {1 ; 2 ; 3} × k ∈ {5 ; 20 ; 50} (sensibilité) × instant d'ajout (1000e passage; variantes [à confirmer]); (b) n × k; (c) dépôt {aller-retour ; retour seul}. Le marquage « au retour seulement » est à définir dans la fiche de reproduction [I] : le dossier ne le décrit pas.
- *Mesures.* P_late (a), L (b), P_court (c); classes de % de trafic, temps de bascule; carte de phase ρ × n (V7) tirée de (a).
- *Répétitions.* 10 000 par cellule pour les cellules de H1.1, H1.2 et H1.4; 2 500 pour la grille exploratoire.
- *Critère de lecture.* Tests de H1.1, H1.2 et H1.4 sous correction de Holm; le reste est descriptif.
- *Statut.* Confirmatoire (H1.1, H1.2, H1.4); porte A.

**E1.3 — Rétroaction négative et bruit : la levée du blocage.**
- *Plan.* (a) Modèle à deux sources encombrement-Grüter, capacité de la source établie variable (H1.3). (b) dyn-Dussutour, σ variable (H1.6). (c) Variante « no entry » ([Robinson et al. 2005]; une réplication [S] n'a pas retrouvé la phéromone répulsive selon l'audit lacunes; aucune valeur lue) : exploratoire, sans paramètre tant qu'elle n'est pas lue.
- *Facteurs.* Capacité (au moins 4 niveaux [à confirmer], dont les extrêmes de T1.8); σ (au moins 5 niveaux [à confirmer]); ρ = 0 et n = 2 en (a).
- *Mesures.* t_switch (censuré à 60 min), fraction de réplicats en phase 3.
- *Répétitions.* (a) 2 500 (≥ 100 pour T1.8); (b) 21 réplicats × 100 lots pour T1.9, puis 2 500.
- *Statut.* (a) confirmatoire, porte C; (b) exploratoire, porte D; (c) exploratoire.

**E1.4 — Taille de colonie et type de recrutement.**
- *Plan.* Faire varier la taille pour deux types : piste de masse (pont-Goss, par Φ) et danse (ruche-Seeley en version agent, par N), en balayage croissant puis décroissant pour chercher un seuil et une hystérésis, sans prétendre reproduire [Beekman et al. 2001] dont le modèle n'est pas lu.
- *Facteurs.* Φ ∈ {0,25 ; 0,5 ; 1 ; 2} fourmi/s [à confirmer]; N ∈ {25 ; 125 ; 500 ; 1 000} [à confirmer]; type (2).
- *Mesures.* P_court (H1.5), part de la meilleure option, t½, largeur de l'hystérésis (écart entre balayages).
- *Répétitions.* 2 500.
- *Critère de lecture.* Alignement qualitatif avec les stratégies selon la taille ([Beckers et al. 1989], [Planqué et al. 2010]); aucune valeur publiée n'est ciblée.
- *Statut.* Exploratoire; portes A et B.

**E1.5 — Individu de Weber, bruit, sigmoïde collectif.**
- *Plan.* Après lecture de Perna et al. 2012 : reprendre sa règle individuelle (réponse de type Weber) et son bruit directionnel; simuler des fourmis isolées à un embranchement pour des couples (A, B) fixés; agréger; ajuster la fonction de Deneubourg (k, n_fit) par moindres carrés; comparer à n ≈ 2 ([Deneubourg et al. 1990], via [Goss et al. 1989]). Les équations de Perna et al. ne sont dans aucun dossier : ne rien en écrire avant lecture.
- *Facteurs.* η (au moins 5 niveaux [à confirmer], dont 0); grille de (A, B); k libre.
- *Mesures.* n_fit(η), k_fit(η), qualité d'ajustement.
- *Répétitions.* Suffisantes pour ES(n_fit) ≤ 0,05 [à confirmer au pilote].
- *Statut.* Exploratoire; *Modèle simplifié*; porte F; plan B en R1.8.

**E1.6 — Canal × environnement, témoin Meliponini.**
- *Plan.* Modèle commun (couche 3) où le canal est une variable (persistance, portée, adressage, format). Quatre configurations de canal × deux préréglages individuels, dans un environnement à deux sources avec inversions périodiques. Témoin Meliponini : individus de type abeille avec canal « piste » (dépôt et lecture spatiale persistants). Symétrique : individus de type fourmi avec canal éphémère.
- *Facteurs.* Canal (4) × taxon (2) × volatilité (durée entre inversions, au moins 3 niveaux [à fixer au pilote]) × taille N. Variante danse-Okada (après la porte E) : nombre de mangeoires (2, 5, 7, 10, conditions de T1.7) comme axe de rareté des sources.
- *Mesures.* G_int (références du cadre; « agents indépendants sans canal » d'abord), t½, p_best, coût (signaux écrits et lus), vecteur R du canal (persistance τ½ = ln 2/ρ, portée, adressage, format).
- *Répétitions.* 2 500 par cellule.
- *Critère de lecture.* Partition de variance canal contre taxon par modèle mixte (le run comme unité); H1.7. Aucun énoncé numérique sur les Meliponini (aucune valeur lue).
- *Statut.* Exploratoire; *Analogie* pour la configuration Meliponini; portes B, E (volet erreur de danse) et G; docking préalable (section 9).

**E1.7 — Version à règles du parallèle agentique : tableau partagé, « n effectif », témoin orchestré.**
- *Plan.* Agents à règle `decide(observation) → action`, sans LLM. Observation : une annonce tirée au hasard sur un tableau partagé, pondérée par sa « vigueur » (répétitions proportionnelles à la valeur), plus une mémoire propre; expiration par TTL. Deux sources, inversion de qualité à t_c.
- *Facteurs.* TTL × poids de la majorité w_m (V8) × coordination {émergente ; orchestrée à information exacte ; orchestrée avec délai d}.
- *Mesures.* p_best, t½, taux de cascade erronée, coût (messages lus et écrits, appels de l'orchestrateur), « n effectif » (n_fit de la fonction de Deneubourg ajustée sur P(choix) selon les parts observées).
- *Répétitions.* 2 500 par cellule (plancher de 1 000 du dossier p7 pour les agents à règle).
- *Critère de lecture.* H1.9; carte V8; le même estimateur de n effectif est réutilisé en P7.
- *Statut.* Exploratoire; *Hypothèse de l'auteur* et *Analogie*.

## 7. Parallèle agentique

### 7.1 Relations conservées

On compare des relations, pas des termes. Le statut épistémique de chaque énoncé figure dans la colonne dédiée.

| Relation | Fourmi | Abeille | Agent | Statut épistémique | Appui |
|---|---|---|---|---|---|
| Une réponse non linéaire à un signal partagé persistant amplifie un écart initial et verrouille | n = 2, ρ ≈ 0, pas de rétroaction négative (pont-Goss) | Réponse linéaire dans le modèle publié (f_l proportionnel au temps de danse [I]) | Majorité pondérée sur un état partagé : alignement sur les groupes dominants; plus de connectivité accélère la convergence et les cascades « wrong-but-sure » | *Modèle simplifié* (fourmi, réplication préliminaire); *Analogie* (agent) | [Goss et al. 1989], [Seeley et al. 1991], [Choi et al. 2025b], [Han et al. 2026] |
| La flexibilité dépend de la demi-vie du signal rapportée à la durée de la tâche | Évaporation (≈ 30 min chez *L. humile*; au moins 40-60 min chez *L. niger*) | Abandon individuel conditionné à la qualité (f_x, f_d); pas d'évaporation | TTL du tableau, compaction du contexte | *Hypothèse de l'auteur* (relation); H1.1 | Dossier p1, rubrique « Signal persistant ou éphémère »; [Grüter et al. 2012] |
| Une rétroaction négative locale restaure la flexibilité malgré un signal persistant | Encombrement (*L. niger*) | Abandon, signal d'arrêt (P4, P5) | Disjoncteur local, contre-pression | *Résultat reproduit* après T1.8 (fourmi); *Analogie* (agent) | [Grüter et al. 2012] |
| Le bruit sert d'exploration | Bruit de [Dussutour et al. 2009] | Erreur angulaire de la danse [Okada et al. 2014] | Échantillonnage, diversité des prompts (la `temperature` n'est pas réglable sur les modèles récents) | *Hypothèse de l'auteur*, à tester en P7 | Cadre, point 16 |
| Information privée contre signal social | Mémoire de route contre piste | Inspectrices contre danse; 75 à 88 % des suivis de danse sont une réactivation ou une confirmation | Contexte propre contre état partagé | *Analogie* (traitée par P8) | [Granovskiy et al. 2012], [Biesmeijer et Seeley 2005], [Czaczkes et al. 2015] |
| Une annonce tirée au hasard, pondérée par sa vigueur, avec expiration | Sans objet (la piste est lue par tout passant) | La suiveuse tire une danseuse au hasard; danses mélangées | Agents inactifs qui tirent une annonce | *Hypothèse de l'auteur* (corrige le « pub/sub » de la v3) | [Seeley et al. 1991], [Seeley 1994] |
| Granularité de la mémoire partagée | Piste : champ spatial, lecture locale | Danse : vecteur et intensité, sans persistance | Tableau noir, journal d'événements | *Analogie* | [Heylighen 2016], [Han et Zhang 2025] |

### 7.2 Classement typologique des scénarios (axes A1 à A3 du cadre)

| Scénario | A1 plan global | A2 contrôle central | A3 médium | Régime |
|---|---|---|---|---|
| pont-Goss | non | non | état partagé persistant (piste) | Auto-organisation stigmergique |
| ruche-Seeley | non | non | diffusion éphémère (danse) | Auto-organisation par signaux directs |
| témoin-Meliponini | non | non | état partagé persistant (piste portée par une abeille) | Stigmergique (contrefactuel) |
| Tableau partagé à règles (E1.7) | non | non | état partagé persistant avec TTL | Stigmergique |
| Témoin orchestré (E1.7) | oui | oui | messages dirigés | Orchestration |

### 7.3 Où l'analogie casse

- **Identité et adressage.** Les agents sont identifiés et leur topologie est souvent fixe; les insectes sont anonymes ([Feinerman et Korman 2017]). L'adressage est une composante de R, pas un détail.
- **Oubli.** L'évaporation est continue et physique; la fenêtre de contexte et le TTL sont abrupts [I]. Chez l'abeille, l'oubli est du côté de l'émetteur (abandon, attrition), non du message (cadre, point 14).
- **Signal.** « Scalaire » est une simplification de modèle (cadre, point 10) : la piste a une géométrie, plusieurs phéromones et une mémoire privée ([Czaczkes et al. 2015]); les modèles reproduits portent l'intensité seule, sans équivalent du contenu textuel d'un LLM.
- **n nominal et n effectif.** Neuf juges LLM valent environ deux votes ([Kohli 2026], [R]); les erreurs sont corrélées ([Kim et al. 2025b]) : l'amplification amplifie aussi les erreurs communes.
- **Coopération.** Chez les insectes, c'est un acquis évolutif, non une hypothèse de protocole [I, dossier x-choregraphie]. Les systèmes LLM ont presque toujours un orchestrateur caché (harnais, utilisateur) [I].
- **Réplication contre validation.** Le modèle reproduit n'est pas la colonie réelle : les colonies du pont sont plus fiables que le modèle (R1.5).

### 7.4 Témoin orchestré (QR3)

Allocateur central (A1 oui, A2 oui) qui reçoit la qualité des deux sources, exacte ou retardée de d pas, et affecte chaque agent. Mêmes agents, mêmes sources, mêmes graines (comparaison appariée); coût en messages et en appels de l'orchestrateur compté (cadre, section Construits mesurables). Statut : *Hypothèse de l'auteur* (H1.9). Version à règles dans P1; version LLM dans P7. Limite : l'orchestrateur est un témoin, sans équivalent biologique (le « chorégraphe » de la colonie est la sélection naturelle, cadre).

### 7.5 Structure de tâche

L'allocation entre deux sources indépendantes est **décomposable** : chaque agent exécute sa part sans dépendance d'ordre et les résultats s'additionnent. C'est le cas favorable à un orchestrateur à information fiable. H1.9 prédit qu'il l'emporte quand l'information est exacte et immédiate, et que la coordination émergente rattrape quand elle est retardée [*Hypothèse de l'auteur*]. La contrepartie séquentielle (dépendances d'ordre entre étapes) est hors de P1 et revient à P7.

### 7.6 Lien avec P7

- P7 dépend de P1 (cadre) : au minimum T1.1, T1.2 et T1.4 atteintes avant son lancement ([P7-synthese-agentique.md](P7-synthese-agentique.md)).
- P1 livre à P7 : (i) le scénario à deux sources avec inversion de qualité et ses mesures (p_best, t½); (ii) les paramètres de canal (τ½ = ln 2/ρ, portée, adressage, format); (iii) l'estimateur de n effectif; (iv) l'interface `decide(observation) → action`; (v) la spécification du témoin orchestré.
- **Alignement avec la fiche P7.** Le scénario S1 et ses mesures (p_best, t½) sont ceux de [P7](P7-synthese-agentique.md); l'hypothèse de persistance de P7 (H7.7 : t½ du dépôt persistant supérieur à t½ de la diffusion) oppose deux canaux qui diffèrent par la persistance **et** la portée. P1 mesure les leviers séparément : le signe de H7.7 dépend de (ρ, n, rétroaction négative), la persistance ne suffit pas à rendre un canal rigide (cadre, point 11).
- Précédents LLM : [Jimenez-Romero et al. 2025] (modèle Ants de NetLogo; GPT-4o à température 0, 10 fourmis, 3 sources, 1 000 pas, 5 répétitions; collecte ≈ 85 unités pour le LLM comme pour les règles, écarts-types ≈ 7 contre ≈ 20; ≈ 95 pour l'hybride 50/50; 9 itérations de prompt) [T via outil]; [Rahman et al. 2025] (voir le dossier p7); [Han et Zhang 2025] (tableau noir) [R].
- Aucune exécution LLM dans P1. Avant P7, revérifier paramètres et modèles disponibles (cadre, point 16).

## 8. Visuels et trois niveaux

Inventaire (dossier p1, rubrique « Visuels de vulgarisation »). Chaque graphe porte son statut épistémique; V1 affiche *Modèle simplifié* tant que T1.1 et T1.2 ne sont pas atteintes dans le moteur TypeScript, puis *Résultat reproduit*.

| V | Visuel | Niveaux | Statut affiché |
|---|---|---|---|
| V1 | « Le pont qui se souvient » : pont animé; histogramme Monte Carlo qui se remplit par-dessus les barres publiées (fig. 2a-d); curseurs r, k, n, Φ, ρ; interrupteur marquage aller-retour ou retour seul; bouton « ajouter la branche courte maintenant » | Voir, Explorer, Vérifier | *Modèle simplifié* |
| V2 | « La loupe de la fonction de choix » : P_A selon A à B fixe; n ∈ {1 ; 2 ; 3}, k ∈ {5 ; 20 ; 50} | Explorer | *Modèle simplifié* |
| V3 | « La ruche en compartiments » : schéma animé, horloge de 8 h à 16 h, inversion à midi, points du terrain et courbe publiée | Explorer, Vérifier | *Modèle simplifié*; *Résultat reproduit* pour l'état de midi après T1.4 |
| V4 | « Réaction à un changement » : écran partagé, part de l'effort sur la meilleure option selon le temps depuis le changement, même axe et même mesure pour les deux taxons | Voir, Explorer | *Hypothèse de l'auteur* (prédiction E1.1) |
| V5 | « L'éventail de la danse » : rose des directions, recrues dispersées au sol; curseur d'erreur de 0 à 60° avec compteurs « exploitation » et « découvertes » | Explorer | *Modèle simplifié* (seuils d'Okada) |
| V6 | « Ce que dit la danse » : angle vers azimut, durée vers distance, bande d'incertitude | Explorer, Vérifier | Calibrations publiées |
| V7 | Carte de phase persistance × non-linéarité (ρ, n), colorée par le temps de bascule ou « verrouillé »; positions de *L. humile*, *P. megacephala* et de l'abeille (n = 1) | Explorer, Vérifier | *Hypothèse de l'auteur* (calcul original) |
| V8 | Même carte pour des agents : TTL du tableau × poids de la majorité | Explorer (praticiens) | *Analogie* |

### Voir — récit guidé avec prédiction (grand public, étudiants)

- **Montré et manipulé.** Parcours de V1 en cinq étapes : (1) prédire, avant simulation, quelle branche domine à longueurs égales; (2) voir la distribution, non une trajectoire; (3) r = 2 : la courte gagne le plus souvent; (4) « ajouter la courte maintenant » : elle n'est pas adoptée (2 colonies sur 18 chez *L. humile*); (5) V4 : la ruche réalloue après l'inversion. Encart final : piste ou danse n'est pas un attribut du taxon (Meliponini; *P. megacephala* suit les changements). Un seul geste manipulable : prédire, puis le bouton.
- **Vue de l'agent.** Sans objet (récit à pas fixes); une vignette montre ce que lit une fourmi au point de choix (S_j, L_j), sans interaction.
- **Modifier la règle.** Sans objet; la seule modification est le bouton guidé.
- **Objectifs d'apprentissage.** O1 : prédire que deux branches égales ne donnent pas, dans la plupart des simulations, un partage 50/50. O2 : expliquer en une phrase pourquoi la courte tardive n'est pas adoptée (rétroaction positive sans oubli). O3 : énoncer que le canal n'est pas un attribut du taxon.
- **Accessibilité propre.** Histogramme avec tableau de données et description équivalents (état final statique); branches distinguées par motif et épaisseur, pas par la couleur seule; couleurs de la charte (fourmi #D55E00, abeille #0072B2, agent #CC79A7) doublées de pictogrammes; mises à jour du compteur par région vive sans prise de focus; tout mouvement de plus de 5 s avec pause, et `prefers-reduced-motion` remplace l'animation par le jumeau statique en petits multiples; mobile à 375 px sans défilement horizontal.
- **Erreurs à prévenir.** Téléologie (« la fourmi sait quel chemin est le plus court »); « la fourmi est bloquée parce qu'elle est moins intelligente que l'abeille »; essentialisme (piste = fourmi, danse = abeille); prendre un essai pour le résultat.

### Explorer — bac à sable étayé (étudiants, praticiens)

- **Montré et manipulé.** V1 complet (r, k, n, Φ, ρ, dépôt, ajout tardif), V2, V3, V5, V6, V7, V8; distribution sur N graines avec l'exécution courante marquée; graine et état dans l'URL.
- **Vue de l'agent.** On suit une fourmi au point de choix : S_j et L_j locaux, probabilité P_s, tirage. On suit une suiveuse : tirage d'une danseuse au hasard parmi les danses mélangées. Rien n'est affiché hors du rayon de perception.
- **Modifier la règle.** Règle de choix (n, k; réponse de type Weber avec bruit après la porte F); dépôt aller-retour ou retour seul; règle de suivi de l'abeille (première danseuse rencontrée, selon [Seeley et Towne 1992], contre « comparer les danses », contrefactuel); remplacement par `decide(observation) → action` (E1.7). Curseur leurre « autorité de la reine » sans effet sur le choix de la source, avec l'encart « Ce que fait vraiment la reine » (la reine régule la reproduction, cadre) : *Hypothèse de l'auteur*, à faire valider par un myrmécologue et un apidologue.
- **Objectifs d'apprentissage.** O4 : prédire le sens de l'effet de n, de ρ et d'un plafond de débit sur le verrouillage. O5 : distinguer réponse individuelle (Weber) et réponse collective (sigmoïde), après la porte F. O6 : énoncer que la danse est un tirage aléatoire et que, dans les modèles publiés, l'intensité et non le vecteur pilote la répartition. O7 : lire une carte de phase (ρ, n).
- **Accessibilité propre.** Curseurs au clavier avec alternative sans glisser; focus visible; canevas avec contenu de repli équivalent et zones focalisables en correspondance avec les régions interactives; carte de phase en viridis ou cividis, doublée d'un tableau de valeurs; sélecteur synchronisé fourmi/abeille sur mobile; pause hors écran.
- **Erreurs à prévenir.** Le sigmoïde serait la règle de chaque fourmi; la danse serait diffusée à toutes; la suiveuse compare les danses; la reine décide de la source; « persistant = rigide » (trois leviers, pas un).

### Vérifier — reproduction, distribution, code, limites (chercheurs, praticiens)

- **Montré.** Tableau des cibles T1.1 à T1.9 (statut, critère, valeur obtenue, IC); histogrammes sur N graines superposés aux valeurs publiées (lecture de figure ±3), classes et TOST; courbe de la ruche contre la fig. 5 avec l'écart des pentes affiché (+12,2/−18,2 contre +18/−30); code, manifeste de run, paramètres; limites : k [à confirmer], unité de ρ, réplication distincte de la validation, colonies réelles plus fiables que le modèle.
- **Manipulé.** Panneau multivers (graine, ordre de mise à jour, k, pas de temps) avec la robustesse visible; rejeu d'un run depuis son manifeste.
- **Vue de l'agent.** Trace d'un run : journal des décisions d'un agent donné.
- **Modifier la règle.** Édition des paramètres et variantes d'un scénario, sans toucher au noyau; export du scénario.
- **Objectifs d'apprentissage.** O8 : distinguer réplication et validation. O9 : lire une distribution et un écart modèle-expérience (T1.3). O10 : retrouver, depuis une cible, sa fiche de reproduction, sa figure numérisée et son code.
- **Accessibilité propre.** Tableaux de données comme alternative à chaque graphique, résumé textuel de chaque graphe, export CSV.
- **Erreurs à prévenir.** Confondre un résultat du modèle et un résultat sur des colonies réelles; lire « reproduit » pour la dynamique après inversion (T1.5 définitif suspendu); lire le ±3 points d'une lecture de figure comme une barre d'erreur du publié.

Les seuils d'acceptation de l'évaluation (pré-test, post-test, condition témoin statique) sont ceux de [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md); P1 fournit les items correspondant à O1 à O10.

## 9. Plan de simulation

Trois couches (cadre, architecture de simulation); un moteur unique « fourmi ou abeille » est écarté. Deux sorties : moteur headless Node (balayages, tests, rejeu) et couche navigateur (visuels). TypeScript partout; Node exécute le `.ts`, `tsc --noEmit` vérifie les types. Le noyau est défini par [S0-socle.md](S0-socle.md); la [spécification de simulation](../docs/05-spec-simulation.md) prime sur ce qui suit en cas d'écart.

| Couche | Contenu pour P1 |
|---|---|
| 1. Noyau commun | PRNG à graine (recommandation du dossier x-methodes [I] : `xoshiro128**`, graine de 64 bits étendue par SplitMix64, un flux par sous-système); horloge à pas fixe; RK4 (ruche-Seeley); algorithme de Gillespie (ruche en version agent); Euler-Maruyama (dyn-Dussutour); tampon d'historique pour les retards (pont-Goss); enregistreur; scénario; manifeste de run. `Math.random` et `Date.now` sont interdits dans la logique de simulation |
| 2. Modèles de référence | pont-Goss, dyn-Dussutour, encombrement-Grüter, ruche-Seeley (EDO et agent), danse-Okada; chacun validé contre sa figure ou son tableau (T1.1 à T1.9) |
| 3. Modèle chorégraphique commun | Agents à règle; seul le canal est interchangeable (persistance ρ, portée, adressage, format); sert E1.6 et E1.7. Unité de temps commune à fixer dans la fiche de docking; chaque préréglage y convertit ses constantes [I] |

**Pas de temps, effectifs, graines.**

| Modèle | Pas de temps | N d'agents | Répétitions et graines |
|---|---|---|---|
| pont-Goss | 1 s; ≈ 1 000 passages par run (≈ 2 000 pour la variante tardive) | Anonymes; Φ = 0,5 fourmi/s par direction; balayage de Φ en E1.4 | 1 000 (T1.1, T1.2); 10 000 (confirmatoire); 2 500 (exploratoire) |
| ruche-Seeley (EDO) | RK4, 0,01 min; de 8 h à 16 h (480 min); T1.4 : dt ≤ 0,05 min, stable à dt/2 | 125 abeilles en compartiments | Déterministe |
| ruche-Seeley (agent) | Temps continu (Gillespie) | 125; balayage de 25 à 1 000 en E1.4 [à confirmer] | 100 à 2 500 |
| danse-Okada | À lire [à confirmer] | 1 000 abeilles | ≥ 50 par σ |
| dyn-Dussutour | À fixer avec test dt/2 (unité de ρ inconnue) | Flux Φ(t) | 21 réplicats × 100 lots |
| Modèle commun (E1.6, E1.7) | Pas fixe, unité commune | 25 à 1 000 [à confirmer] | 2 500 par cellule |

Politique de graines : une graine de scénario consignée au manifeste; graine par run dérivée de (graine de scénario, indice de run); jeux de graines distincts pour le pilote, le confirmatoire et les visuels. L'ordre de mise à jour (synchrone à double tampon, asynchrone par permutation tirée du PRNG) est un facteur, testé une fois par modèle à agents : « sans effet » si l'écart est inférieur à 3 ES de Monte Carlo (dossier x-methodes).

**Budgets de performance** [estimation, à confirmer] : 10 000 runs d'une cellule du pont en moins de 60 s sur un cœur; histogramme de 1 000 runs en moins de 5 s sur un mobile de milieu de gamme (sinon, distribution précalculée et un seul run animé); 60 images/s jusqu'à 1 000 agents. N ≤ 1 000 : Canvas suffit, aucun WASM; mesure à l'appui avant de réviser cette décision (cadre).

**Docking** (cadre, principe 6).

| Cas | Configuration du modèle commun | Modèle de référence | Critère |
|---|---|---|---|
| D1 | Canal piste persistante, n = 2, sans rétroaction négative | pont-Goss | T1.1 et T1.2, avec leurs marges |
| D2 | Canal danse (tirage aléatoire d'une danseuse, abandon par f_x) | ruche-Seeley | Limite déterministe : T1.4; version agent : T1.6 |
| D3 | Canal piste avec bruit | dyn-Dussutour | T1.9 |
| D4 | Canal piste avec plafond de débit | encombrement-Grüter | T1.8 |

Équivalence distributionnelle par TOST à la marge de la cible correspondante ([Lakens 2017]); niveaux d'alignement d'après [Axtell et al. 1996]; deux implémentations indépendantes (Python du dossier et TypeScript) pour la porte A et T1.4.

**Sensibilité.** OFAT étendue (au moins 10 niveaux et 10 répétitions par paramètre) pour toute figure de mécanisme; Sobol' pour (Φ, k, n, ρ, r, bruit, instant d'ajout) avec N ≥ 1 000 et IC bootstrap (dossier x-methodes). Les sorties de P1 sont bimodales : on rapporte la probabilité de chaque mode, pas un indice de variance seul.

**Plan ADEMP du volet confirmatoire** ([Morris et al. 2019], [Siepe et al. 2024]).

| Élément | Contenu |
|---|---|
| Aims | Tester H1.1 à H1.4; reproduire T1.1 et T1.2 avant toute extension |
| Data-generating mechanisms | pont-Goss (r = 1 pour H1.2; r = 2 pour H1.1 et H1.4) et encombrement-Grüter à ρ = 0, n = 2 (H1.3); facteurs ρ, n, dépôt, k (sensibilité), instant d'ajout |
| Estimands | P_late, L, P_court, t_switch médian |
| Methods | Deux implémentations; IC par bootstrap des écarts; correction de Holm (α = 0,05) sur H1.1 à H1.4 |
| Performance measures | Écart à la valeur publiée (T1.1, T1.2); ES de Monte Carlo de chaque estimation; taux de rejet |

**Sorties.** Distributions complètes par cellule (JSON ou CSV), non la seule moyenne; manifeste de run (SHA du dépôt, graine, version du PRNG, paramètres, modèle); figures SVG superposées aux valeurs publiées numérisées, avec leur incertitude de lecture; fiches de reproduction et valeurs numérisées de la fig. 2 de [Goss et al. 1989] et des fig. 1 et 5 de [Seeley et al. 1991] (CSV); tableau d'atteinte T1.1 à T1.9; journaux de messages de E1.7; registre des déviations (fichier versionné).

## 10. Livrables et critères d'achèvement

| # | Livrable | Critère d'achèvement vérifiable |
|---|---|---|
| L1 | Fiches de reproduction T1.1 à T1.9 | Une fiche par cible (équations, paramètres, unités, figure cible numérisée avec incertitude de lecture, critère chiffré, porte), relue par un second lecteur; l'historique git montre la fiche avant le premier commit du code du modèle |
| L2 | Lectures manquantes | Pour chaque source ci-après, note de lecture datée avec le niveau [T] atteint et les marques [à confirmer] levées ou maintenues avec motif : Camazine et Sneyd 1991; Deneubourg et al. 1990 (k, n, méthode d'estimation); Dussutour et al. 2009 (unité de ρ, placement de k, affectation de q_1 et q_2, σ); protocole d'Okada et al. 2014; Perna et al. 2012; Beckers et al. 1990; Sumpter et Pratt 2003; Detrain et Deneubourg 2008; Nieh 2004 |
| L3 | Code | Modèles pont-Goss, ruche-Seeley (EDO et agent), danse-Okada, dyn-Dussutour, encombrement-Grüter et modèle commun; `tsc --noEmit` sans erreur; un test par cible T1.k qui échoue si le critère n'est pas atteint; implémentation Python indépendante pour la porte A et T1.4, accord à moins de 3 ES; vecteurs de test du PRNG passés; aucun `Math.random` ni `Date.now` dans la logique de simulation (contrôle par grep) |
| L4 | Rapport de docking | D1 à D4 atteints au critère TOST de la cible, ou écart consigné au registre des déviations |
| L5 | Préenregistrement | Enregistrement horodaté avant la première exécution confirmatoire ([OSF 2026]) : H1.1 à H1.4, SHA du dépôt et des scénarios, politique de graines, δ, n_sim, script d'analyse, règles d'exclusion; registre des déviations versionné (motif, catégorie de [Lakens 2024], effet sur la sévérité et la validité; format de [Willroth et Atherton 2024]) |
| L6 | Données | Archive des runs avec manifeste et DOI de version; le rejeu d'un run depuis son manifeste redonne une sortie identique sous Node; `CITATION.cff`; licences selon le [document de science ouverte](../docs/08-science-ouverte-ethique.md) |
| L7 | Pages V1 à V8 | Trois niveaux; graine et état dans l'URL; jumeau statique; critères d'accessibilité et de lexique du document de vulgarisation tous passés (contrastes, reflow à 320 px, cibles de 24 px, mouvement, clavier, règles automatiques plus liste manuelle, statut épistémique sur 100 % des énoncés); graphes superposés aux valeurs publiées |
| L8 | Évaluation | Items pour O1 à O10; avis éthique écrit (ou exemption) avant toute collecte; protocole (pré-test, post-test, témoin statique) exécutable; la collecte et l'analyse relèvent de V0 |
| L9 | Note de recherche | Résumé ODD; tableau T1.1 à T1.9 avec statut d'atteinte; résultats de E1.1 à E1.7 étiquetés confirmatoire ou exploratoire; déviations; limites (R1.1 à R1.14 encore ouverts); énoncé « réplication, non validation »; code et données citables avant soumission; cibles : [JRSI 2026] (code dès la soumission) ou [PLOS CB 2021] (code public à la publication) |
| L10 | Passage à P7 | Dossier remis : modèles reproduits, scénario et mesures, paramètres de canal, estimateur de n effectif, interface `decide`, spécification du témoin orchestré; relu par le responsable de P7 |
| L11 | Carte comparative en relations | Une page « relation conservée, où l'analogie casse, statut » tirée de la section 7, lue par un représentant du public « praticiens » |

## 11. Risques et réserves

| R | Risque ou réserve | Conséquence | Plan B |
|---|---|---|---|
| R1.1 | [Camazine et Sneyd 1991] non lu : l'écart de pentes (+12,2/−18,2 contre +18/−30) est réel dans le modèle reconstitué et non résolu | T1.5 définitif suspendu; « reproduit » interdit pour la dynamique après inversion | Critère provisoire; sensibilité de f_x documentée; si l'article reste inaccessible, consigner une réplication partielle, sans ajuster un paramètre pour faire disparaître l'écart |
| R1.2 | k = 20 [à confirmer] ([Deneubourg et al. 1990] non lu); n = 2 est un ajustement collectif | Résultats sensibles à k; attribution de n à l'individu fausse | Sensibilité sur k ∈ {5 ; 20 ; 50}; k traité comme paramètre du dispositif; lecture de 1990 avant de figer |
| R1.3 | Sources lues au niveau [M], [R] ou [S] seulement (voir L2); [Czaczkes et al. 2015] : « persistances différentes » [non vérifiée] | Valeurs et énoncés non fiables | Aucune valeur issue de ces sources sans [à confirmer]; lecture avant la porte concernée |
| R1.4 | Unité de ρ de [Dussutour et al. 2009] non énoncée; référence « non vérifiée » en bibliographie; affectation de q_1, q_2 et σ inconnues | T1.9 et H1.6 bloquées | Tester s⁻¹ et min⁻¹; si une seule unité reproduit les trois comptes, l'inférer et la marquer [I]; sinon T1.9 reste no-go |
| R1.5 | Les vraies colonies sont plus fiables que le modèle (r = 1,4 et r = 2) | Critère statistique strict inapplicable; T1.3 seulement relationnelle | H1.5 (taille), demi-tours (non lus), données à lumière rouge [à confirmer]; ne pas durcir le critère sans mécanisme |
| R1.6 | Lectures de figure à ±3 points, une seule lecture | Faux « atteint » ou faux « échec » | Seconde numérisation indépendante; marge δ de 5 points englobant la lecture; n du TOST au préenregistrement |
| R1.7 | Protocole d'[Okada et al. 2014] non lu en entier [T partiel] | T1.7 limitée aux signes | Porte E; si le protocole reste indisponible, T1.7 reste relationnelle |
| R1.8 | Perna et al. 2012 absente de la bibliographie, résumé seul | E1.5 et H1.8 bloquées | Ajouter la référence; porte F; plan B : réponse proportionnelle générique étiquetée *Modèle simplifié*, sans l'attribuer à Perna |
| R1.9 | Originalité de E1.1 non établie ([Sumpter et Pratt 2003], [Detrain et Deneubourg 2008] non lus); espèce confondue avec la structure du modèle | Revendication de nouveauté fausse | Porte G; lecture descriptive seulement; reformuler en « application » si la comparaison existe déjà |
| R1.10 | Meliponini : source (Nieh 2004) absente de la bibliographie, aucune valeur lue | Contrefactuel pris pour un fait | *Analogie* explicite, aucun chiffre; lecture avant publication |
| R1.11 | Recoupements : P8 (T8.9 porte la même source que T1.7; E8.3 réutilise l'inversion de qualité de E1.1; valeur de la danse), P5 et P7 (qui attendent de P1 une part du test d'habitat), P6 (verrouillage comme pathologie, module de [Dussutour et al. 2009] possiblement partagé) | Double travail, résultats divergents | Code unique du modèle d'Okada et du module de Dussutour; propriétaire fixé au plan de recherche; P1 s'en tient au périmètre de la section 1 |
| R1.12 | Mécanismes de levée non modélisés : demi-tours ([Beckers et al. 1992] non lu), phéromone d'exploration, « no entry » ([Robinson et al. 2005]; réplication non retrouvée [S]) | Blocage montré possiblement plus fort que dans la nature | Déclarer l'omission dans V1 et dans la note; E1.3 (c) exploratoire; lire avant d'ajouter |
| R1.13 | Divergences d'implémentation (Python, TypeScript, PRNG, ordre de mise à jour); Monte Carlo publié non documenté [à confirmer] | Écarts attribués à tort au modèle | Deux implémentations; accord à 3 ES; ordre de mise à jour testé; registre des déviations |
| R1.14 | Surinterprétation : réplication confondue avec validation; tailles d'effet minimales [I] posées avant pilote | Énoncés indéfendables | Statuts épistémiques; pilote avant préenregistrement; tailles révisées une seule fois, avant la première exécution confirmatoire, avec trace au registre |

Portes no-go : voir le tableau des portes de la section 5. Aucune exécution LLM n'est prévue dans P1; la réserve sur les paramètres LLM (cadre, point 16) se lève en P7.

## 12. Effort et dépendances

**Estimation** [estimation, à confirmer], en semaines-personne :

| Bloc | Tâches | Sem.-pers. |
|---|---|---|
| 0 | Lectures manquantes (L2) et fiches de reproduction T1.1 à T1.9 | 3 |
| 1 | Pont : T1.1 à T1.3, docking D1, préenregistrement, E1.2 | 3 |
| 2 | Ruche : T1.4 à T1.6, docking D2, E1.1 | 3 |
| 3 | T1.7 (Okada) | 2 |
| 4 | T1.8, T1.9, docking D3 et D4, E1.3 | 3 |
| 5 | E1.4, E1.5, E1.6 | 4 |
| 6 | E1.7 et passage à P7 | 2 |
| 7 | Visuels V1 à V8, trois niveaux, accessibilité | 5 |
| 8 | Items d'évaluation, avis éthique, pilote | 1,5 |
| 9 | Note de recherche, données, dépôt | 2 |
| | **Total** | **28,5** |

**Prérequis.**
- S0 ([S0-socle.md](S0-socle.md)) : noyau (PRNG, horloge, RK4, Gillespie, enregistreur, scénario, manifeste), harnais de tests, typologie, glossaire, métriques R et G.
- V0 : gabarit de page, charte, grille d'évaluation, avant les visuels ([07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)).
- Accès aux textes intégraux listés en L2.
- Outils : Node (TypeScript exécuté directement, `tsc --noEmit`), Python pour l'implémentation indépendante.
- Avis éthique avant toute collecte auprès de personnes.
- Aucun accès à un modèle LLM.

**Dépendances sortantes.** P7 (T1.1, T1.2, T1.4 et le passage de L10); P6 (point de départ du verrouillage); P8 (partage du modèle d'Okada); le plan de recherche, qui consolide les H et les T.

**Ordre des tâches.**
1. Lectures prioritaires : Camazine et Sneyd 1991, Deneubourg et al. 1990, Dussutour et al. 2009 (unité de ρ), protocole d'Okada, Perna et al. 2012, Beckers et al. 1990, Nieh 2004, Sumpter et Pratt 2003, Detrain et Deneubourg 2008.
2. Fiches de reproduction T1.1 à T1.9, avant tout code.
3. Pont-Goss en TypeScript, T1.1 et T1.2 (porte A), préenregistrement de H1.1 à H1.4, E1.2.
4. Ruche-Seeley en TypeScript, T1.4 et T1.5 provisoire (porte B), T1.6.
5. Modèle commun et docking D1, D2, puis E1.1 et E1.6.
6. T1.8 et T1.9 (portes C et D), E1.3.
7. T1.7 (porte E).
8. E1.4 et E1.5 (porte F).
9. E1.7 et passage à P7.
10. Visuels : V1 et V2 dès la porte A; les autres après leurs portes; évaluation.
11. Note de recherche.

Les étapes 3, 4 et 7 sont indépendantes entre elles une fois les fiches écrites.

## 13. Références clés

Statut de la colonne « Bibliographie » : celui de [11-bibliographie.md](../docs/11-bibliographie.md). Niveau de lecture : celui du dossier p1, sauf mention.

| Étiquette | Rôle dans P1 | Bibliographie | Lecture |
|---|---|---|---|
| [Goss et al. 1989] | Pont à deux branches; T1.1 à T1.3 | vérifiée | [T] |
| [Deneubourg et al. 1990] | Origine de n = 2 et k = 20 | vérifiée | [M]; k [à confirmer] |
| [Deneubourg et al. 1986], [Deneubourg et al. 1983] | Hasard individuel et nombre de participants | corrigée; vérifiée | [S]; [M] |
| [Seeley et al. 1991] | Sept compartiments; T1.4 à T1.6 | corrigée | [T] |
| [Camazine et Sneyd 1991] | Version détaillée du modèle | corrigée | [R] |
| [Seeley et Towne 1992], [Seeley 1994] | Danse : tirage aléatoire, intensité | corrigée | [R] |
| [Seeley et Visscher 1988] | Origine de T4 = 60 min | non vérifiée | [S] |
| [Beckers et al. 1989], [Planqué et al. 2010], [Lanan 2014] | Types de recrutement, taille de colonie | vérifiée; corrigée; corrigée | [R] |
| [Beckers et al. 1990] | *L. niger* ne bascule pas | vérifiée | [R] |
| [Beckers et al. 1992] | Demi-tours | vérifiée | [M] |
| [Dussutour et al. 2009] | SDE; T1.9; bruit | **non vérifiée** | [T via outil]; unité de ρ [à confirmer] |
| [Grüter et al. 2012] | Encombrement; T1.8 | vérifiée | [T via outil] |
| [Okada et al. 2014] | Erreur de danse; T1.7 | corrigée | [T via outil, partiel] |
| [Kohl et Rutschmann 2021], [Esch et al. 2001], [Schürch et al. 2016] | Encodage de la danse | vérifiée | [T via outil]; [R]; [R] |
| [Weidenmüller et Seeley 1999], [Gardner et al. 2007] | Bruit accordé | corrigée | [R] |
| [Frisch 1967] | Principe de la danse | vérifiée | [M] |
| [Granovskiy et al. 2012], [Biesmeijer et Seeley 2005], [Czaczkes et al. 2015] | Information privée et sociale | vérifiée; corrigée; vérifiée | [T via outil]; [R]; [R] |
| [Sherman et Visscher 2002], [Beekman et Lew 2008], [Donaldson-Matasci et Dornhaus 2012], [I'Anson Price et al. 2019], [Seeley 2012] | Valeur de la danse selon l'habitat (cadre de QR0) | vérifiée; vérifiée; vérifiée; corrigée; corrigée | [R]; [R]; [S]; [R]; [R] |
| [Beekman et al. 2001], [Nicolis et Deneubourg 1999] | Hystérésis; multistabilité | vérifiée | [R] |
| [Sumpter et Pratt 2003], [Detrain et Deneubourg 2008] | Comparaisons existantes | vérifiée | [R]; [M] |
| [Robinson et al. 2005] | Phéromone « no entry » (non utilisée) | vérifiée | résumé (audit) |
| [Heylighen 2016] | Stigmergie | vérifiée | [M] |
| [Jimenez-Romero et al. 2025], [Han et Zhang 2025], [Han et al. 2026], [Choi et al. 2025b], [Rahman et al. 2025] | Précédents agentiques | vérifiée; corrigée; vérifiée; vérifiée; corrigée | [T via outil]; [R]; [R]; [R]; dossier p7 |
| [Feinerman et Korman 2017], [Kohli 2026], [Kim et al. 2025b] | Limites de l'analogie | vérifiée | dossiers p8, x-choregraphie |
| [Grimm et al. 2020], [Axtell et al. 1996], [Lakens 2017], [Morris et al. 2019], [Siepe et al. 2024] | ODD, docking, TOST, plan de simulation | corrigée; vérifiée; vérifiée; vérifiée; vérifiée | dossier x-methodes |
| [OSF 2026], [Lakens 2024], [Willroth et Atherton 2024], [JRSI 2026], [PLOS CB 2021] | Préenregistrement, déviations, revues cibles | vérifiée | dossier x-methodes |
| Van Vorhis Key et Baker 1982 (étiquette sans crochets : citée de seconde main) | Durée de vie de la phéromone ≈ 30 min | non vérifiée | [S] |
| Perna et al. 2012; Nieh 2004 | Réponse de Weber; pistes chez les Meliponini | **absentes de la bibliographie** (la première est citée par le cadre); à ajouter | [R] et [S] via les audits bio-fourmis et lacunes |

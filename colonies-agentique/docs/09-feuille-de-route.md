# Feuille de route : coordination sans contrôle central (fourmilières, ruches et systèmes d'agents)

**Statut :** document de programme, régime **production** : le chercheur agit sur ce document; chaque jalon et chaque porte porte un critère vérifiable. Le [cadre](00-cadre.md) prime; les tensions sont à la fin. **Date :** 2026-10-01. **Langue :** français canadien; termes techniques et identifiants en anglais.
**Sources :** les dix fiches de [projets](../projets/) (sections « Livrables et critères d'achèvement », « Risques et réserves » et « Effort et dépendances » de chacune); [vulgarisation et évaluation](07-vulgarisation-evaluation.md), [science ouverte et éthique](08-science-ouverte-ethique.md), [spécification de simulation](05-spec-simulation.md), [protocole de reproduction](04-protocole-reproduction.md). Les dossiers de recherche ne sont pas relus : toute valeur vient d'une fiche ou de l'un de ces documents. Étiquettes `[Nom année]` : [bibliographie](11-bibliographie.md).

**Marques.** [estimation, à confirmer] : effort ou coût repris d'une fiche. [I, calcul] : calcul de ce document (sommes, dates et écarts recalculés en Python le 2026-10-01; script non versionné). [P, à confirmer] : proposition de ce document (ordre, seuil, hypothèse). [à confirmer] et [non vérifiée] : conservés tels que dans les fiches. Aucun énoncé de transposition ici, donc aucun statut épistémique à porter. Abréviations : CER, comité d'éthique de la recherche; RPRP, responsable de la protection des renseignements personnels; EFVP, évaluation des facteurs relatifs à la vie privée; SI, matériel supplémentaire d'un article; DC, décision du chercheur (science ouverte et éthique); COL, ORC, CHS, bras de P7 (colonie à règles, orchestrateur, chorégraphie spécifiée).

**Conventions de calcul** [P, à confirmer]. Un chercheur à temps plein; 1 sem.-pers. = 1 semaine calendaire de travail à partir du lundi 2026-10-05; 40 h par sem.-pers. (seule conversion vers les heures de V0, qui ne définit pas la semaine). Les dates sont **indicatives** : elles glissent d'autant que le rythme réel s'écarte de 1. Séries d'identifiants définies ici : jalons `JF1` à `JF14`, portes `GF1` à `GF15`, risques `R200` à `R218` (plage libre : les autres plages occupées sont R0.n, R1 à R17 locales aux fiches, R20 à R28, R30 à R41, R41 à R56, R60 à R69, R71 à R90, R8.n, R100 à R112).

---

## 1. Vue d'ensemble

| Phase | Contenu | Sem.-pers. [estimation, à confirmer] | Cumul [I, calcul] | Sortie |
|---|---|---|---|---|
| 0 | S0 (socle) | 12,0 | 12,0 | GF4 |
| 1 | P1 28,5; P5 27,0; P8 20,0 | 75,5 | 87,5 | GF8 |
| 2 | P3 21,0; P9 sans son volet agentique 29,0; P6 sans son volet LLM 21,0 à 28,5; P4 23,0 | 94,0 à 101,5 | 181,5 à 189,0 | GF9 |
| 3 | P7 34,0; volet LLM de P6 4,0 à 6,0; volet agentique de P9 5,0; construction de P9 5,0 | 48,0 à 50,0 | 229,5 à 239,0 | fin du programme obligatoire |
| Annexe | P2, seulement si GF13 | 18,0 à 23,0 | 252,5 à 262,0 | |

Le cumul exclut : le coût fixe de V0 et son évaluation hors des lots des fiches, E8.5 et T8.12 et T8.13 (orphelines, section 6.1), le coût d'API (section 6.3) et l'accès aux sources. Les volets LLM de P6 et de P9 passent en phase 3 parce qu'ils consomment le harnais de P7 (fiches P6 et P9, « Effort et dépendances »; plan B des deux); les efforts sont ceux des fiches, seulement déplacés.

**Ce que la table implique** [I, calcul]
- **Charge.** 229,5 à 239,0 sem.-pers. sans P2, soit 4,4 à 4,6 années-personne à 52 semaines par an. C'est le fait structurant : les portes, l'ordre de coupe (section 6.5) et les risques R204 et R205 en découlent.
- **Modèles LLM.** À 1 sem.-pers. par semaine, P7 commence au cumul 181,5 à 189,0 (2030), alors que les retraits au plus tôt d'Opus 5.5 et de Sonnet 5.5 tombent à environ 51 semaines du 2026-10-01 : 2027-09-22 et 2027-09-28 [Anthropic 2026a]. Même la voie courte (section 2.5) place la collecte (cumul 56,5 au plus tôt) après ces dates. Les identifiants et tarifs de la fiche P7 sont donc des instantanés à refaire à son démarrage (cadre, point sur les paramètres LLM) : R201.
- **Publication.** Au 2027-07-16, seuls S0 et P1 sont achevés (cumul 40,5) : les cibles ALIFE 2027 de P3, P4 et P6 [ALIFE 2027] (19 au 23 juillet 2027, échéances non publiées) ne sont pas atteignables au rythme de référence : R217.

**Paquet commun de livrables (PC)** : défini ici une fois; chaque projet y ajoute ses livrables propres (section 2). Critères repris des fiches.
1. Fiches de reproduction, une par cible, commitées **avant** le premier commit du code du modèle (`git log`).
2. Code TypeScript : `tsc --noEmit` sans erreur, `node --test` vert, aucun `Math.random` ni `Date.now` dans la logique de simulation, un test par cible qui échoue si le critère n'est pas atteint.
3. Données : manifestes de run; rejeu identique d'un run à graine fixe; DOI de version (seulement après GF2).
4. Préenregistrement OSF horodaté avant la première exécution confirmatoire [OSF 2026]; registre des déviations versionné.
5. Note de recherche : tableau des cibles avec verdict (satisfaite; non satisfaite avec déviation; bloquée avec raison), ODD résumé, statut épistémique de chaque énoncé; `node outils/verifier-docs.ts` sans erreur.
6. Pages aux trois niveaux : WCAG 2.2 AA (outil et liste manuelle), TV0.1 à TV0.8 et TV0.12 à TV0.17, statut épistémique et public déclarés.
7. Évaluation : pré-test, post-test, condition témoin statique; avis du CER avant toute collecte (GF3).

---

## 2. Phases, lots et livrables

Toutes les semaines-personne par lot sont des [estimation, à confirmer] reprises des fiches (« Effort et dépendances »); les cumuls sont des [I, calcul]. Livrables : PC (section 1) plus les livrables propres de chaque ligne.

Dépendances entre projets (cadre et fiches; `→` = « fournit à ») :

```
S0 → P1, P5, P8, P3, P4, P9, P7           (S0 précède tout; V0 fournit le gabarit avant P1)
P1 → P8 (protocole d'inversion, E8.3)      P5 → P8 (forme de Hill), P6 (module B1)
P9 → P6 (T6.3 à T6.5)                      P1, P5, P8, P3 → P7 (résultats reproduits)
P4 ··> P7 (optionnel)                      P7 → volets LLM de P6, de P9 et E2.3 de P2 (harnais)
phases 1 et 2 achevées → P2 (G0)
```

### 2.1 Phase 0 : socle (S0)

| Lot (fiche S0) | Contenu | Sem.-pers. | Cumul | Livrable et critère |
|---|---|---|---|---|
| D | Spike navigateur (E0.4, E0.5) | 0,5 | 0,5 | rapport du spike, décisions D1 à D5 de la spécification (CS0.2, CS0.11) |
| H | Dépôt dédié et répétition Zenodo (E0.6) | 0,5 | 1,0 | E0.6 réussi : DOI de version et de concept sur dépôt jetable (CS0.15) |
| C | Noyau et harnais : T0.1 à T0.16, T0.21, T0.22, T0.26 à T0.28; recoupement Python | 3,5 | 4,5 | CS0.1 à CS0.6 et CS0.8 |
| B | Métriques R et G : T0.29 à T0.32, T0.36; E0.2, E0.7, E0.8 | 2,5 | 7,0 | CS0.7; H0.3 à H0.5 (CS0.16 différée) |
| E | Gabarit de page | 1,0 | 8,0 | page-pilote, deux builds au même hachage (CS0.12) |
| A | Typologie : jeu de données, cas d'école, E0.1, T0.33, T0.34, page | 1,5 | 9,5 | CS0.9 et CS0.10 (différées, avant la page de typologie) |
| F | Matrice concept × espèce × modèle × source × cible | 1,0 | 10,5 | validateur sans erreur (CS0.13) |
| G | Préenregistrements (H0.1 à H0.5) et registre des déviations | 1,0 | 11,5 | horodatage OSF antérieur au premier manifeste confirmatoire (CS0.14) |
| I | Porte de sortie | 0,5 | 12,0 | `notes/S0-porte-de-sortie.md` daté (GF4) |

Le dépôt OSF de H0.1 à H0.5 (lot G) précède les exécutions confirmatoires de E0.1, E0.2, E0.7, E0.8 et de H0.1 : il se fait en milieu de lot B, non à la fin. Livrables propres à S0 : note de recherche, page de typologie, recoupement indépendant (`x_methodes_checks.py`), `donnees/typologie.csv` (au moins 20 entrées) et `donnees/matrice.csv`, entrées du glossaire, `LICENSE` et `CITATION.cff`. **Prérequis constatés le 2026-10-01** : Node v24.19.0, Python 3.14.7 et `tsc` 7.0.2 (lu par `tsc --version` pour ce document; la fiche S0 disait TypeScript absent, la spécification de simulation le disait présent : écart levé); esbuild à installer et trois moteurs de navigateur à nommer (WebKit sous Windows : [à confirmer]) selon la spécification.

### 2.2 Phase 1 : P1, P5, P8 (ordre de référence P1, P5, P8)

| Projet | Sem.-pers. (cumul) | Lots (sem.-pers.) | Livrables propres | Portes internes |
|---|---|---|---|---|
| [P1](../projets/P1-recrutement-verrouillage.md) | 28,5 (40,5) | 0 lectures et fiches T1.1 à T1.9 (3,0); 1 pont T1.1 à T1.3, docking D1, préenregistrement, E1.2 (3,0); 2 ruche T1.4 à T1.6, docking D2, E1.1 (3,0); 3 T1.7 (2,0); 4 T1.8, T1.9, docking D3 et D4, E1.3 (3,0); 5 E1.4 à E1.6 (4,0); 6 E1.7 et passage à P7 (2,0); 7 visuels V1 à V8 (5,0); 8 évaluation, avis éthique, pilote (1,5); 9 note, données, dépôt (2,0) | rapport de docking D1 à D4; préenregistrement H1.1 à H1.4; dossier remis à P7 (modèles reproduits, interface `decide`, témoin orchestré) relu par le porteur de P7; carte comparative en relations | A (T1.1, T1.2), B (T1.4, T1.5 provisoire), B′, C, D, E, F, G |
| [P5](../projets/P5-decision-par-quorum.md) | 27,0 (67,5) | 1 lectures et 24 fiches (2,0); 2 préenregistrement H5.1 à H5.3 (0,5); 3 M1, M2, M9, T5.1 à T5.7 (2,0); 4 M3 à M6, T5.8, T5.18, T5.22 à T5.24 (2,5); 5 M7, M8, T5.14 à T5.16, T5.19 à T5.21 (3,0, conditionnel à l'accès à Pratt et al. 2005); 6 cibles empiriques T5.9 à T5.13, modèle commun, docking (2,5); 7 E5.1, E5.2, E5.4, E5.5 (3,0); 8 E5.3, E5.6 (3,0); 9 visuels (4,0); 10 évaluation (1,5); 11 note, ODD, dépôt (3,0) | passation **minimale** à P7 = porte A + T5.23, atteinte après la tâche 4 (cumul 47,5); passation à P6 (M1, M2); item de HV0.2 et encart sur la reine | A (bloquante), B (conditionnelle), C (garde-fou), docking (i) à (v) |
| [P8](../projets/P8-individu-et-colonie.md) | 20,0 (87,5) | A accès et lectures G1 à G6 (1,0); B fiches (1,5); C théorie et agents abstraits T8.3 à T8.5, T8.10, T8.14 (1,5); D T8.6 (0,5); E T8.7 (1,0); F T8.1, T8.2 (2,0); G H8.1 à H8.3, E8.2 (1,0); H abeille T8.8, T8.9, T8.16, H8.9, E8.4 (3,5); I E8.1 et E8.3 (2,0); J visuels 1 à 13 (4,0); K note, préenregistrements, liaison V0 (2,0) | jalons J1 à J4 de la fiche; transmission à P7 (H8.4 à H8.8, définitions D1 à D5, carte d'E8.1, plan d'E8.5) | G1 à G9 (T8.2 : GF6) |
| V0 | non estimé | avant la première page de P1 : gabarit (S0, lot E), instrument EV0.5, entrevues, dossier CER, préenregistrement de l'évaluation; ensuite EV0.1 (pilote), EV0.2 (essai contrôlé, parcours P1 et P5), post-test différé à 2 à 4 semaines (HV0.3) | pages de la phase 1 publiées et évaluées | GF3, GF5, GF8 |

Sortie : GF8. Le lot E de P8 clôt les cibles du jalon J1 de la fiche qui ne demandent aucun accès (E8.1 suit au lot I) : c'est le point de bascule vers le repli de GF6.

### 2.3 Phase 2 : P3, P9, P6, P4 (ordre de référence)

| Projet | Sem.-pers. (cumul) | Lots (sem.-pers.) | Livrables propres | Portes internes |
|---|---|---|---|---|
| [P3](../projets/P3-division-du-travail.md) | 21,0 (108,5) | L0 lectures et fiches T3.1 à T3.14 (2,5); L1 T3.1 à T3.6, docking, seconde implémentation (3,0); L2 T3.7, T3.8, T3.14 (2,0); L3 abeille T3.9 à T3.13 (3,0); L4 E3.1 à E3.8, préenregistrement H3.1 à H3.4 (3,0); L5 banc S3 et E3.9 (1,0); L6 dix visuels (3,5); L7 évaluation (1,5); L8 note, registre (1,5) | banc S3 versionné pour P7 (P7 retrouve les valeurs de contrôle de T3.1 avec la même politique); dix visuels et quatorze pages de vérification | T3.1 bloquante pour T3.2 à T3.8; T3.2 « calibré » sans Bonabeau et al. 1996; T3.11 et T3.12 non figées avant lecture |
| [P9](../projets/P9-mouvement-collectif-et-construction.md) (phase 2) | 29,0 (137,5) | WP0 lectures bloquantes et numérisation (2,0); WP1 ajouts spatiaux au noyau (2,0); WP2 moulin, tore, voies, T9.1, T9.2, T9.9, T9.33, E9.4 (3,0); WP3 Vicsek, T9.8, T9.19, E9.5 (1,0); WP4 trafic T9.5, T9.6 (2,0); WP5 transport T9.10 à T9.14 (4,0); WP6 minorité informée T9.16 à T9.18, après lecture (2,0); WP7 auto-assemblage T9.20 à T9.23 (4,0); WP8 pages de rang 1 et 2 (6,0); WP10 préenregistrement, note, évaluation (3,0) | LIV-1 à LIV-11 sur le périmètre de la phase 2; T9.1, T9.2 et T9.33 acceptées, qui valent T6.3 à T6.5 pour P6 | PR-0 à PR-4 |
| [P6](../projets/P6-defaillances-et-defenses.md) (sans volet LLM) | 21,0 à 28,5 (158,5 à 166,0) | lectures bloquantes et fiches T6.6 à T6.14 (2,5 à 3,5); implantation et docking (4,0 à 5,0); reproductions T6.6 à T6.14 (2,0 à 3,0); E6.1 à E6.8 à règle, préenregistrement, analyse (5,0 à 7,0); visuels V6.1 à V6.8 (4,0 à 5,0); note, évaluation, CER (3,0 à 4,0); politique défensive, revue (0,5 à 1,0) | taxonomie P6; script `p6_checks` recréé affichant « checks OK »; balayage de conformité défensive et revue signée; journal de divulgation | T6.8 (immédiate), T6.5 prérequis de E6.1, T6.6 et T6.7 no-go avant relecture du PDF; porte D de science ouverte |
| [P4](../projets/P4-regulation-sans-vue-densemble.md) | 23,0 (181,5 à 189,0) | 1 fiches (12) et numérisations (3,0); 2 fourmi T4.1 à T4.5 (2,5); 3 abeille T4.6 à T4.11 (3,5); 4 moniteur de Little, T4.12 (0,5); 5 couche 3 et docking (2,5); 6 E4.1 à E4.8 (4,0); 7 visuels Vis1 à Vis6 (4,0); 8 note, préenregistrement (2,0); 9 évaluation (1,0) | registre des corrections de la v3 retrouvé dans la note et la page; six visuels | code (T4.12, T4.1), Rép-F, Rép-A, docking, extension; T4.4 et T4.7 bloquées |
| V0 | non estimé | pages de P3, P4, P6, P9 : publication seulement après GF8 (section 3) | pages de phase 2 publiées; pré-post exploratoire et entrevues | GF8, GF9 |

Sortie : GF9. Total de la phase : 94,0 à 101,5.

### 2.4 Phase 3 : P7, volets agentiques, construction, P2

| Projet | Sem.-pers. (cumul) | Lots (sem.-pers.) | Livrables propres | Portes internes |
|---|---|---|---|---|
| [P7](../projets/P7-synthese-agentique.md) | 34,0 (215,5 à 223,0) | 1 harnais S0 étendu : adaptateur LLM, journal, cassette, lots, MCP et A2A (5,0); 2 environnements S1, S3, S5, agents à règle, docking T7.15 à T7.20 (5,0); 3 ancrages et outils T7.1 à T7.14 (5,0); 4 pilote à 1 %, pilote de variance, difficulté, invites figées (2,0); 5 Registered Report, étape 1 (2,0); 6 collecte, Haiku 4.5 en premier (2,0; 3 à 4 semaines calendaires); 7 annotation MAST et analyses (5,0); 8 pages et évaluation (4,0); 9 note, étape 2, dépôts (4,0) | verdict de H7.1 à H7.11 (avec IC pour H7.1 à H7.10); journal complet rejoué à 100 %; dépenses sous les plafonds (section 6.3); DOI de version | outils, docking, ancrage (GF11); porte C et étape 1 (GF12) |
| Volet LLM de [P6](../projets/P6-defaillances-et-defenses.md) | 4,0 à 6,0 (219,5 à 229,0) | pilote; E6.1-L, E6.3, E6.5, E6.6, E6.7; codage E6.9 | verdict de H6.1 à H6.10 sur les cellules LLM | règles de P7 reprises; repli : volet à règle seul |
| Volet agentique de [P9](../projets/P9-mouvement-collectif-et-construction.md) | 5,0 (224,5 à 234,0) | WP9 : T9.30 à T9.32, E9.1, E9.2, E9.6, avec témoin orchestré et trois références | LIV-11 | PR-3, PR-6 |
| Construction de P9 | 5,0 (229,5 à 239,0) | WP11 : T9.25, T9.26, T9.29, E9.3, pages 8, 10 et 11, docking D5 | LIV-12 | PR-5 (GF10) |
| [P2](../projets/P2-memoire-partagee-metaheuristiques.md) (annexe) | 18,0 à 23,0 (252,5 à 262,0) | noyau 18,0 (T2.1 à T2.11, E2.1, E2.2); agentique 3,0 (E2.3); allocation 2,0 (T2.12, E2.4) | note par périmètre atteint | G0 à G3 (GF13) |

### 2.5 Chemin critique

**Séquence de référence (un chercheur).** Tout le travail obligatoire est sur le chemin critique : durée = cumul. Ordre retenu [P, à confirmer], avec ses raisons tirées des fiches :
1. S0 d'abord : le cadre fait précéder tout par S0; aucun code de P1 avant GF4.
2. P1, P5, P8 : le pont de Goss de P1 est la tranche verticale que la spécification de simulation exige du socle (section 10, point 14); EV0.2 porte sur P1 et P5; P8 réutilise le protocole d'inversion de P1 (E8.3) et la forme de Hill de P5 (M1; T8.16 à dédoublonner), et vient en dernier pour laisser du temps à l'accès au SI de Sasaki et al. 2013 (GF6).
3. P3 en tête de la phase 2 : seul projet de la phase 2 dont les résultats reproduits sont prérequis de P7.
4. P9 avant P6 : T6.3 à T6.5 sont prérequis de E6.1; sinon P6 les exécute (environ 0,5 sem.-pers., fiche P6).
5. P4 en dernier de la phase 2 : entrée optionnelle de P7; ses extensions E4.7 et E4.8 sont les premières coupes de la fiche.
6. P7, puis les volets LLM de P6 et de P9 (ils consomment son harnais), puis la construction de P9; P2 en dernier, seulement si GF13.

**Voie courte vers P7 (option, hors séquence de référence).** Prérequis réellement exigés avant les tâches 2 à 5 de P7 : P1 blocs 0 à 2 (9,0), P5 tâches 1 à 4 (7,0), P3 L0 et L1 (5,5), P8 lots A à C (4,0), soit 25,5 sem.-pers. Chaîne : 12,0 + 25,5 + 34,0 = 71,5 jusqu'à la fin de P7, et 56,5 jusqu'au préenregistrement (12,0 + 25,5 + tâches 1 à 5 de P7, 19,0) [I, calcul], contre un début de P7 à 181,5 ou 189,0 dans la séquence de référence. Elle ne contredit pas le cadre (P7 dépend de résultats reproduits, non de l'achèvement des phases) mais fait passer P3 devant la fin de la phase 1 : décision du chercheur (section 10).

**Chaînes de latence** (attentes sans effort, à lancer en semaine 1) :
- CER → GF5 → première page de P1 → EV0.1 et EV0.2 → post-test différé (2 à 4 semaines) → GF8.
- Accès au SI de Sasaki et al. 2013 → T8.2 → H8.1 à H8.3 → visuels 1 et 2 de P8 → GF8.
- Lectures bloquantes de P1, P5, P3, P9 et P6 (section 8.3).
- Étape 1 du Registered Report de P7 : délais d'évaluation inconnus (science ouverte et éthique, risque sur le retrait de modèles) → collecte.
- Webhook Zenodo → première release.

---

## 3. Règle de séquence

**Énoncé** (vulgarisation et évaluation, règle de séquence; tableau des phases du cadre). Les pages de la phase 1 (P1, P8, P5) sont publiées **et évaluées** avant la première page de la phase 2; celles de la phase 3 viennent après la phase 2. « Évaluée » : tous les critères TV0.n applicables passés **et** les résultats d'EV0.2 rapportés au registre préenregistré, quel qu'en soit le verdict (GF8, GF9).

**Portée.** La règle porte sur la **publication des pages**, non sur le travail de simulation, que les dépendances du cadre ordonnent déjà (vulgarisation et évaluation). Le cadre ne l'énonce pas en toutes lettres : V0 le relève et la feuille de route la reprend telle quelle.

| Activité | Régime |
|---|---|
| Demandes d'accès, lectures, fiches de reproduction (documents, sans code) de tout projet | libre en tout temps, car la latence d'accès est inconnue (arbitrage demandé par la fiche P3 : L0 dès la phase 0) |
| Code et reproductions des projets de phase 2 (P3, P4, P9, P6) | après GF4, sans page publiée; au rythme de référence ce code suit la phase 1; avec un renfort, il se fait en parallèle (section 9) |
| Publication d'une page de P3, P4, P6 ou P9 (mouvement) | interdite avant GF8 |
| Publication d'une page de P7, P2 ou P9 (construction) | interdite avant GF9 |
| Lancement de P7 et de P2 | règles du cadre, indépendantes de la précédente : P7 après les résultats reproduits de P1, P3, P5 et P8; P2 seulement si les phases 1 et 2 sont achevées (GF13) |
| Dérogation | consignée au registre des déviations avec sa raison; la page publiée porte « non évaluée » |

Deux effets à budgéter. Si HV0.1 ou HV0.2 est **réfutée**, V0 impose de réviser le gabarit avant la phase 2 (travail non chiffré : R205). Sans avis du CER, ni pilote ni entrevue : « évaluée » n'est pas satisfaisable; la dérogation est alors la voie normale (R206).

---

## 4. Jalons et échéances

### 4.1 Jalons

Cumuls et dates [I, calcul] selon les conventions de calcul; deux valeurs quand P6 est une fourchette. Un jalon est atteint quand son critère est vrai, non quand la date passe.

| Jalon | Cumul | Date indicative | Critère d'achèvement (vérifiable) | Porte |
|---|---|---|---|---|
| JF1 | 1,0 | 2026-10-09 | rapport du spike et E0.6 consignés; D1 à D5 rendues; DOI de version et de concept émis sur dépôt jetable | GF2 |
| JF2 | 12,0 | 2026-12-25 | `notes/S0-porte-de-sortie.md` : issue go ou go conditionnel; `npm run verify` sort à 0; deux builds de la page-pilote au même hachage | GF4 |
| JF3 | 40,5 | 2027-07-16 | P1 : T1.1 à T1.9 chacune dans un état terminal; note de recherche; dossier remis à P7; pages V1 à V8 prêtes | portes de P1; GF5 |
| JF4 | 47,5 | 2027-09-03 | P5 : porte A et T5.23 passées (passation minimale à P7) | porte A de P5 |
| JF5 | 67,5 | 2028-01-21 | P5 achevé : 24 cibles avec issue, E5.1 à E5.6 exécutées ou écartées par décision écrite, passation à P6 et P7 | portes de P5 |
| JF6 | 87,5 | 2028-06-09 | phase 1 achevée : notes de P1, P5, P8; EV0.2 rapporté; pages de la phase 1 publiées | GF8 |
| JF7 | 108,5 | 2028-11-03 | P3 achevé : verdict par cible et par expérience; banc S3 versionné remis à P7 | portes de P3 |
| JF8 | 137,5 | 2029-05-25 | P9 (phase 2, sans volet agentique) : PR-1 à PR-4 passées; T9.1, T9.2, T9.33 acceptées; cibles bloquées lues ou déclarées « non reproduites : source inaccessible » | PR-0 à PR-4 |
| JF9 | 158,5 à 166,0 | 2029-10-19 à 2029-12-07 | P6 (sans volet LLM) : chaque cible dans un état terminal, chaque hypothèse à règle avec verdict; revue défensive signée | GF14 (porte D) |
| JF10 | 181,5 à 189,0 | 2030-03-29 à 2030-05-17 | P4 achevé; phase 2 publiée et évaluée; revue de G0 de P2 consignée | GF9, GF13 |
| JF11 | 200,5 à 208,0 | 2030-08-09 à 2030-09-27 | P7 : harnais, docking, ancrages, pilotes et étape 1 du Registered Report déposés | GF11, GF12 |
| JF12 | 215,5 à 223,0 | 2030-11-22 à 2031-01-10 | P7 achevé : H7.1 à H7.10 chacune avec verdict et IC; dépense sous les plafonds; journal rejoué à 100 %; dépôts à DOI | portes de P7 |
| JF13 | 229,5 à 239,0 | 2031-02-28 à 2031-05-02 | volets LLM de P6 et de P9 et construction de P9 terminés (ou coupés par décision écrite) : fin du programme obligatoire | GF10 |
| JF14 | 252,5 à 262,0 | 2031-08-08 à 2031-10-10 | P2, sur le périmètre fixé par G0 | GF13 |

### 4.2 Échéances externes (dates de la source; à relire sur le site officiel le jour de la décision)

| Date | Événement | Source | Effet |
|---|---|---|---|
| 2026-10-15 | retrait au plus tôt de Haiku 4.5 | [Anthropic 2026a] | GF1 |
| 2026-10-29 | AAMAS 2027 : propositions d'ateliers (notification le 2026-12-21), pour mémoire | [AAMAS 2027] | aucun |
| 2026-11-12 | AAMAS 2027, piste Blue Sky Ideas | [AAMAS 2027] | GF15 |
| 2026-11-30 | retrait de Sonnet 4.5 (déprécié le 2026-09-30) | [Anthropic 2026a] | aucune dépendance du plan |
| 2027-01-19 et 2027-01-26 | GECCO 2027 : résumé et soumission (P2 seulement) | [GECCO 2027] [à confirmer; source non vérifiée] | GF13 |
| 3 au 7 mai 2027 | AAMAS 2027 (Hanoï) : hors de portée | [AAMAS 2027] | R217 |
| 19 au 23 juillet 2027 | ALIFE 2027 (Prague) : échéances non publiées | [ALIFE 2027] | R217 |
| 2027-09-01, 2027-09-22, 2027-09-28 | retrait au plus tôt de Fable 5.1, d'Opus 5.5, de Sonnet 5.5 | [Anthropic 2026a] | R201 |

### 4.3 Décisions du chercheur à dater (science ouverte et éthique)

| Décision | À trancher avant | Porte |
|---|---|---|
| DC1 dépôt dédié (nom), DC3 identité des auteurs (nom, ORCID, affiliation) | E0.6, semaine 1 | GF2 |
| DC6 CER (instance, contact) | semaine 1 | GF3 |
| DC2 licences (défaut : code MIT; textes, figures et données CC BY 4.0) | première release | GF2 |
| DC9 cibles de publication | 2026-11-12 pour Blue Sky Ideas | GF15 |
| DC10 financement (déclaration) | dossier du CER et première note | GF3, GF14 |
| DC4 journaux LLM, DC5 ancre à poids ouverts, DC7 Registered Report | étape 1 du Registered Report de P7 (DC5 aussi pour GF1) | GF12 |
| DC8 divulgation en P6 (délai à fixer [à confirmer]) | toute diffusion issue de P6 | GF14 |

---

## 5. Portes go/no-go

Le **décideur** est le chercheur, sauf le CER pour son avis (GF3). Chaque porte a un critère vérifiable et un repli; un échec se consigne au registre des déviations, jamais en silence.

### 5.1 Portes du programme

| Porte | Moment | Critère | Décideur | Repli |
|---|---|---|---|---|
| **GF1** Haiku 4.5 (P7; tension du cadre) | avant 2026-10-15 | décision écrite au registre. Contrôles : page des dépréciations relue le jour 1 (date de retrait effective; préavis d'au moins 60 jours selon la page [Anthropic 2026a]); chaîne amont d'un bloc Haiku confirmatoire = S0 12,0 + P1 9,0 + P5 7,0 + P3 5,5 + P8 lots A à C 4,0 + amont P7 de la fiche 14,0 = 51,5 sem.-pers. au moins [I, calcul]. Go « bloc Haiku confirmatoire » seulement si la date effective laisse cette durée | chercheur | par défaut [P, à confirmer] : perte déclarée, H7.1 devient Sonnet 5.5 contre Opus 5.5 (plan B de P7). Autres voies : bloc exploratoire (pilote à 1 % et pilote de variance, environ 43 $ et 80 $ [I, fiche P7]) si un harnais minimal est prêt; ancre à poids ouverts (DC5) |
| **GF2** Dépôt, Zenodo, première release (porte A; CS0.15) | répétition en semaine 1; avant toute release et toute publicité du dépôt | dépôt dédié, public, sous licence (DC1, DC2); `CITATION.cff` sans `.zenodo.json`; balayage de secrets de l'historique; **webhook Zenodo présent** (GitHub, Settings, Webhooks) avant la release; E0.6 réussi : DOI de version et de concept sur dépôt jetable, comportement des brouillons et pré-versions consigné; notice conforme à `CITATION.cff` [GitHub et Zenodo 2026] [CFF 2026] | chercheur | aucune release : travail sur GitHub et archive Software Heritage [SWH 2026], DOI différé. Jamais de release depuis le dépôt actuel (public, sans licence, historique mixte); les commits courants ne sont pas des releases |
| **GF3** CER (porte E; TV0.11) | dépôt du dossier en semaine 1 ou 2; avis avant toute collecte, pilotes et entrevues compris | avis écrit ou attestation d'exemption (numéro et date au registre des déclarations); décision écrite du CER sur les entrevues de conception; loi applicable précisée par le responsable de la protection des renseignements personnels; information préalable si analytique [CRSH et al. 2018] | CER (avis); chercheur (dépôt) | V0 se limite à des pages sans collecte (ni HV0.n ni EV0.n); pages « non évaluées », dérogation consignée |
| **GF4** Sortie de la phase 0 (S0; porte 0 de la spécification) | fin du lot I | classes bloquantes satisfaites (CS0.1 à CS0.8, CS0.11, CS0.12, CS0.14 et la structure de CS0.13); classes différées avec échéance nommée (CS0.9, CS0.10, CS0.15, CS0.16); spikes bloquants SPK6, SPK8 (sur T0.1 et T0.3), SPK11, SPK12 réussis; D1 à D5 rendues; fiche de décision datée avec hachage du dépôt | chercheur | go conditionnel : un critère bloquant non satisfait lié à une entrée de registre de type « source » ou « plan » acceptée. No-go : échec de type « résultat » sans explication indépendante; liste des critères à lever et date de la nouvelle porte. Aucun code de P1 avant go ou go conditionnel; lectures et fiches de P1 continuent |
| **GF5** Publication du premier parcours (G0 de V0) | avant la première page de P1 | gabarit implanté; TV0.1 à TV0.8 et TV0.12 à TV0.17 passés sur la page pilote; instrument EV0.5 validé; entrevues faites (TV0.9, TV0.10); avis du CER (TV0.11); préenregistrement déposé; webhook Zenodo testé | chercheur (avis du CER) | page non publiée, ou pages sans collecte avec mention « non évaluée » |
| **GF6** T8.2 bloquée (G1 de P8) | demande d'accès en semaine 1; bascule au lot E de P8 (cumul 73,0) si le SI manque [P, à confirmer] | SI de [Sasaki et al. 2013] lu et consigné dans la fiche de reproduction de M1 : T, taux de transition (Tables S2 à S4), Table S1 (λ de l'Éq. 1), effectif exact de colonies, Fig. S1 à S8. Débloque T8.2, la simulation de T8.1, H8.1 à H8.3, E8.2, visuels 1 et 2 | chercheur | un modèle aux taux ajustés sur les courbes numérisées est un **ajustement**, non une réplication : H8.1 à H8.3 exploratoires; visuels 1 et 2 « Modèle simplifié, paramètres ajustés »; T8.2 reste no-go (l'Éq. 2 seule s'écarte jusqu'à 0,06) |
| **GF7** Portes de lecture, de code, de réplication et de docking des projets | en cours de projet | selon les fiches; correspondance en 5.2 | chercheur | cible dégradée au niveau relationnel avec déviation au registre, jamais retouchée en silence; « Modèle simplifié »; verdict « non reproduite : source inaccessible » |
| **GF8** Fin de la phase 1 (G1 de V0) | cumul 87,5, puis évaluation | P1, P8, P5 publiées **et évaluées** (TV0.n applicables passés; pilote EV0.1 fait; EV0.2 rapporté). Règle : HV0.1 ou HV0.2 supportée, gabarit inchangé; non concluante, la phase 2 procède et l'évaluation se poursuit; réfutée, réviser le gabarit avant la phase 2 | chercheur | dérogation consignée; pages de la phase 2 « non évaluées » |
| **GF9** Fin de la phase 2 (G2 de V0; prérequis de P7) | cumul 181,5 à 189,0 | phase 2 publiée et évaluée (pré-post exploratoire, entrevues, TV0.n); pour P7, résultats reproduits de P1, P3, P5, P8 | chercheur | P7 commence sur les résultats reproduits (hors pages); pages de P7 en attente |
| **GF10** P9, construction (PR-5) | avant le lot WP11 | PR-1 et PR-4 passées; décision de lancement prise dans le [plan de recherche](03-plan-de-recherche.md) | chercheur | phase 3 de P9 reportée; E9.3 non lancée (elle exige T9.25); limiter à T9.25, T9.26 et E9.3 |
| **GF11** P7 : outils, docking, ancrage (porte d'extension) | avant toute donnée de la grille de P7 | outils : T7.10 à T7.13 passent; docking : T7.15 à T7.20 passent; ancrage : au moins 4 des 6 ancrages T7.1, T7.2, T7.4, T7.5, T7.6, T7.8 pour au moins un modèle [P, à confirmer] et aucun écart de signe inexpliqué sur T7.6 | chercheur | docking échoué : retrait de l'environnement ou de la comparaison à COL; ancrage échoué : P7 exploratoire, plan revu avec P8; sans T7.11, H7.3 suspendue; sans T7.13, CHS et H7.11 suspendues |
| **GF12** P7 : porte C, plateforme du jour, Registered Report étape 1 (porte B) | avant la première exécution confirmatoire | conditions d'utilisation et politique d'usage lues et consignées (date, version); règle d'attrition préenregistrée; replis serveur désactivés; cellule sentinelle définie; schéma de journal validé au pilote; contrôle de plateforme du jour signé (identifiants, tarifs, paramètres); enveloppe d'API approuvée; DC4, DC5, DC7 tranchées; étape 1 horodatée avant toute exécution confirmatoire | chercheur (et revue, si le format est retenu) | préenregistrement OSF seul (DC7); dérivés publics (scores, condensats) sans journaux bruts; remplacement d'un modèle retiré préenregistré |
| **GF13** P2, annexe (G0 à G3) | G0 à JF10; G1 avant E2.1 et E2.2; G2 avant E2.3; G3 avant T2.12 et E2.4 | **G0** : phase 1 achevée (S0, V0, P1, P8, P5 : chaque cible avec verdict au registre, note livrée, hypothèses confirmatoires préenregistrées) et phase 2 achevée (P3, P4, P6, P9 hors construction); noyau de S0 validé; décision écrite fixant le périmètre (noyau, agentique, allocation). **G1** : T2.1, T2.2(a) ou T2.6, T2.8, T2.11 satisfaites. **G2** : G1 franchie, E2.1 terminée, harnais de P7 disponible, identifiants et tarifs revérifiés. **G3** : textes de Nakrani et Tovey 2004 et de Di Caro et Dorigo 1998 lus (absents de la bibliographie) | chercheur | P2 non lancé, aucun livrable obligatoire perdu, revue à chaque fin de phase; périmètre réduit au noyau si G2 échoue |
| **GF14** Diffusion et soumission (portes D et F) | avant toute diffusion issue de P6 (D); avant toute soumission (F) | **D** : revue de double usage signée (charge exécutable? produit nommé? vecteur nouveau? reproductible avec le seul dépôt?). **F** : déclarations complétées, DOI de version, aucune valeur [à confirmer] ni référence non vérifiée comme appui d'une conclusion, énoncés de transposition étiquetés, `node outils/verifier-docs.ts` sans erreur, dates de la cible relues sur le site officiel | chercheur | D : publier seulement les modèles abstraits et les mesures agrégées; F : soumission retenue |
| **GF15** Blue Sky Ideas d'AAMAS 2027 (DC9) | avant 2026-11-12 | décision datée : soumettre ou non la typologie à trois axes, sans résultat de simulation [AAMAS 2027]; échéance relue sur le site officiel (fin du jour indiqué, UTC−12) | chercheur | ALIFE 2027, article de position (date non publiée), ou aucune soumission |

### 5.2 Correspondance des portes par type (nomenclature du protocole de reproduction)

| Type | Portes des fiches et des documents | Dans cette feuille de route |
|---|---|---|
| Lecture | P1 B′, D, E, F, G; P3 L0; P4 « lecture » (T4.4, T4.7 bloquées); P5 B (sources non lues); P6 registre de lecture; P8 G1 à G6 et G8; P9 PR-0 et lecture de Couzin et al. 2005 (PR-3); P2 G3 | GF6, GF7 |
| Code | S0 sortie et porte 0 (SPK bloquants); P3 T3.1; P4 T4.12 et T4.1; P5 A; P6 T6.8; P7 porte d'outils | GF4, GF7, GF11 |
| Réplication | P1 A à E; P3 T3.3 à T3.8; P4 Rép-F et Rép-A; P5 B et C; P8 J1 à J3; P9 PR-1, PR-2, PR-4; P7 porte d'ancrage; P2 G1 | GF7, GF11 |
| Docking | P1 D1 à D4; P4 docking; P5 (i) à (v); P6 cinq configurations; P7 porte de docking; P9 D1 à D5 | GF7, GF11 |
| Extension | P2 G0 et G2; P5 « expériences après la porte A »; P7 porte d'extension (outils, docking, ancrage); P9 PR-5 et PR-6 | GF10, GF11, GF13 |
| Gouvernance (autre sens) | science ouverte A (release), B (première exécution confirmatoire), C (campagne LLM), D (diffusion de P6), E (collecte auprès de personnes), F (soumission); V0 G0 à G2 | GF2, GF3, GF5, GF8, GF9, GF12, GF14 |

---

## 6. Budget

### 6.1 Effort : ce que le cumul ne contient pas

Cumul : 229,5 à 239,0 sem.-pers. hors P2 (section 1). Hors cumul :
- **Coût fixe de V0** (gabarit, bibliothèque de composants, charte, harnais TV0) : non réparti, à estimer après P1 [estimation, à confirmer]. **Évaluation** (recrutement, analyses, CER) : à estimer avec le pilote EV0.1.
- **E8.5, T8.12, T8.13, orphelines** : la fiche P8 les dit « comptées dans P7 »; la fiche P7 les dit « non comptées dans l'effort » et hors budget d'API. Aucun total ne les contient : à ajouter au lot de P7 après le pilote [à estimer].
- **Révision du gabarit** si HV0.1 ou HV0.2 est réfutée; **relectures d'experts** (myrmécologue, apidologue, praticien) prévues par V0 et non chiffrées.
- **Accès aux sources**, délais compris (latence inconnue : R200).

### 6.2 Heures de vulgarisation par page

Source : vulgarisation et évaluation (« Budget d'heures de vulgarisation par page »), 2026-10-01, toutes les heures [estimation, à confirmer] : aucune source ne fournit de budget mesuré; point de départ, 40 à 80 h par page complète d'après l'audit. **Formule : heures d'un parcours = 24 à 45 + n pages × 20 à 36.** Une page seule coûte donc 44 à 81 h. Par page : Explorer (Vue de l'agent, Modifier la règle, défis) 10 à 18 h; graphes synchronisés et jumeau statique 5 à 9 h; accessibilité 3 à 5 h; textes 2 à 4 h. Par parcours (une fois) : récit de Voir 5 à 8 h; panneau Vérifier 4 à 8 h; textes, lexique, experts 4 à 8 h; entrevues et codage 6 à 12 h; audit manuel d'accessibilité 3 à 5 h; version anglaise 2 à 4 h.

| Parcours | Pages | Heures de V0 | Lot « visuels » de la fiche, sem.-pers. | Équivalent à 40 h [I, calcul] |
|---|---|---|---|---|
| P1 | 8 | 184 à 333 | 5,0 | 200 h |
| P2 (conditionnel) | 9 | 204 à 369 | 3,0 | 120 h |
| P3 | 10 | 224 à 405 | 3,5 | 140 h |
| P4 | 6 | 144 à 261 | 4,0 | 160 h |
| P5 | 11 | 244 à 441 | 4,0 | 160 h |
| P6 | 8 | 184 à 333 | 4,0 à 5,0 | 160 à 200 h |
| P8 | 13 | 284 à 513 | 4,0 | 160 h |
| P9 | 15 | 324 à 585 | 6,0 (pages de rang 1 et 2) | 240 h |
| **Huit parcours** | **80** | **1 792 à 3 240** | **33,5 à 34,5** | **1 340 à 1 380 h** |

À 40 h par sem.-pers., V0 vaut 44,8 à 81,0 sem.-pers. contre 33,5 à 34,5 dans les fiches : **écart de 10,3 à 47,5 sem.-pers.** (412 à 1 900 h) [I, calcul], donc R205. L'écart est une borne : les lots d'évaluation des fiches (6,5 sem.-pers. pour P1 à P5) couvrent en partie les entrevues et le codage que V0 compte, et les trois pages de construction de P9 sont dans WP11, non dans WP8. S0 (une page de typologie, 44 à 81 h par la formule) et P7 (catalogue non arrêté) s'ajoutent. **Règle de recalibrage** : les heures réelles de P1 corrigent toutes les lignes; sortie de la fourchette 184 à 333 h = signal de R205. **Priorité** : pages de Voir et de Vérifier des cibles reproduites avant les pages d'Explorer.

### 6.3 Coût d'API de P7

Source : fiche P7 (« Plan de simulation », budget en dollars). Dollars US. **Calculs [I]** à partir des hypothèses du dossier P7 (par appel : 1 200 jetons en lecture de cache, 800 non cachés, 150 en sortie visible; raisonnement 0, 0, 300 et 500 jetons selon le modèle), **à calibrer au pilote à 1 %**.

| Élément | Valeur | Date et statut |
|---|---|---|
| Tarifs, entrée / sortie / lecture de cache, par million de jetons | Haiku 4.5 : 1 / 5 / 0,10; Sonnet 5.5 : 2 / 10 / 0,20; Opus 5.5 : 4 / 20 / 0,20; Fable 5.1 (option) : 10 / 50 / 0,25 | cache du 2026-09-25 [Anthropic 2026b], contrôlé contre le skill local seulement; lecture de cache de Haiku 4.5 [à confirmer]. La fiche P8 rapporte les tarifs d'entrée et de sortie de Haiku 4.5, Sonnet 5.5 et Opus 5.5 confirmés sur la page des tarifs le 2026-10-01 [Anthropic 2026a]. **À revérifier avant tout appel** (GF12) |
| Base du dossier P7 | ≈ 3 370 $ standard et ≈ 1 690 $ en lot; avec 30 % d'imprévus ≈ 4 380 $ et ≈ 2 200 $ | estimation du dossier |
| Plan recompté de la fiche P7 | ≈ 4 304 $ standard, plafond ×1,30 ≈ 5 595 $; en lot ≈ 2 152 $, plafond ≈ 2 798 $ (rabais de lot et cache cumulés : [à confirmer]); dépasse la base d'environ 930 $ | [I] |
| Grille centrale E7.1 (58 cellules × 30 runs) | ≈ 2 013 $ | [I] |
| Autres blocs | extension d'interaction ≈ 593 $; rehausses à 40 runs ≈ 81 $; échelle de richesse ≈ 617 $; diversité ≈ 330 $; LLM-RÈGLE ≈ 134 $; information redondante ≈ 82 $; découplage ≈ 60 $; hybride ≈ 45 $; ordre de mise à jour ≈ 30 $; contamination ≈ 30 $; ancrages ≈ 210 $ (dont T7.8 ≈ 145 $ [à confirmer]); pilote de variance ≈ 80 $; pilote à 1 % ≈ 43 $, prélevé sur l'enveloppe | [I] |
| Par modèle (cellules de grille et d'extension) | Haiku 4.5 ≈ 472 $; Sonnet 5.5 ≈ 1 766 $; Opus 5.5 ≈ 1 567 $; mélanges ≈ 209 $ | [I] |
| Options non comptées | Fable 5.1 (E7.11) ≈ 367 $; Opus 5.5 pour E7.4 ≈ 593 $ | [I] |
| Charge | ≈ 3 750 runs × 300 appels ≈ 1,1 million d'appels | [I] |
| Non budgété | juge MAST, ancrages T7.7 et T7.9 (en partie), décodeur de E7.12, énergie; E8.5, T8.12, T8.13 de P8 | fiche P7 |
| Règles de plafond | plafond par bras = coût planifié × 1,30 avec interrupteur automatique; arrêt et replanification si un bloc dépasse de plus de 30 % le coût planifié (pilote à 1 % d'abord) | fiche P7 |

Enveloppe non approuvée et financement des appels non déclaré (registre des déclarations de science ouverte et éthique) : GF12.

### 6.4 Autres coûts

| Poste | État | Source |
|---|---|---|
| Temps du chercheur | 229,5 à 239,0 sem.-pers. hors P2; 18,0 à 23,0 de plus avec P2 | fiches |
| Évaluation pédagogique | pilote EV0.1 de 30 à 60 participants par bras; HV0.1 : 132 par bras visés et 188 à recruter [I, V0]; coût du recrutement, des analyses et du CER non estimé | vulgarisation et évaluation |
| Coût fixe de V0 | non estimé; après P1 | vulgarisation et évaluation |
| Calcul local (balayages headless) | durées à mesurer (SPK10); noyau le plus lourd : Khuong et al. 2016 (≈ 2,6 × 10¹¹ déplacements [I]); coût monétaire non estimé | spécification de simulation |
| API des volets hébergés (E8.5, T8.12, T8.13; volet LLM de P6; WP9 de P9; E2.3 de P2) | non budgétés; à estimer au pilote | P7 (R83), P6, P9, P2 |
| Énergie | non estimée | P7; science ouverte et éthique |
| Accès aux articles, relectures d'experts | non chiffrés | fiches; vulgarisation et évaluation |
| Hébergement, DOI, archivage (GitHub Pages candidat [I], Zenodo, OSF, Software Heritage) | aucun coût chiffré dans les sources | vulgarisation et évaluation; science ouverte et éthique |

### 6.5 Ordre de coupe consolidé [P, à confirmer]

Chaque coupe vient d'une fiche; l'ordre entre fiches est de ce document. À appliquer quand le cumul réel dépasse le cumul de référence (R204).
1. **P2** : non lancé (G0); aucun livrable obligatoire perdu; 18,0 à 23,0 sem.-pers.
2. **Options de P7** : Fable 5.1 (E7.11), puis E7.9 et E7.10, puis E7.8.
3. **Extensions de P4** : E4.7, puis E4.8 (exploratoires).
4. **Construction de P9** (5,0) : limiter à T9.25, T9.26 et E9.3, ou ne pas lancer (GF10).
5. **Volets LLM de P6** (4,0 à 6,0) et de **P9** (5,0) : agents à règle et témoin orchestré à règle seulement.
6. **Pages d'Explorer** des phases 2 et 3 (priorité aux pages de Voir et de Vérifier).
7. **Reste de P7** selon son plan B : Opus 5.5 dans E7.1 (S5-D d'abord, puis S1), E7.2 plafonné, E7.3 sans L3 (le plateau de H7.8 est perdu).

**Protégés** : les classes bloquantes de S0; « réplication avant extension »; la famille primaire de P7 (H7.1 à H7.6); le témoin orchestré dans chaque volet agentique (cadre).

---

## 7. Registre des risques

Probabilité et impact : faible, moyenne, élevée [I, jugement de ce document]. « Locaux » : identifiants des fiches et des documents, qui gardent leur numérotation (plages en collision : R41 de science ouverte et éthique contre R41 de P4; R100 à R105 de métriques et typologie contre R100 à R112 de V0). Responsable : le chercheur, par le porteur de la fiche; le CER pour son avis.

| R | Risque (locaux) | Prob. | Impact | Signal d'alerte | Parade | Resp. |
|---|---|---|---|---|---|---|
| **R200** | **Sources non lues**, valeurs [à confirmer], accès fermé. *S0 R0.4; P1 R1.1 à R1.4; P3 R1, R4; P4 R41; P5 R1; P6 R1; P7 R82; P8 R8.1; P9 R1 à R4; protocole R60* | élevée | élevée : cibles bloquées (T8.2, T1.9, T4.7, T6.6, T9.16) | cible « bloquée » ou « provisoire » au gel de sa fiche; demande d'accès sans réponse [P, à confirmer : deux semaines] | demandes en semaine 1 par déblocage (section 8.3); registre de lecture (niveau [T] atteint); replis par fiche (relationnel, « Modèle simplifié », « calibré »); aucune valeur sans [à confirmer] | chercheur; chaque fiche |
| **R201** | **Retrait, dépréciation ou dérive des modèles LLM** : Haiku 4.5 dès 2026-10-15; Sonnet 5.5 et Opus 5.5 dès 2027-09, avant tout début de P7 au rythme de référence. *P7 R71, R72, R75, R90; S0 R0.10; science ouverte R33; protocole R64; P9 R13; P6 R7; P2 R10; P8 R8.13; P5 R11* | élevée | élevée : perte de H7.1 contre Haiku 4.5; tables de modèles de P7 périmées; « rejouable, non ré-exécutable » | avis de dépréciation [Anthropic 2026a]; `response.model` différent de l'identifiant demandé; sentinelle hors de l'IC à 95 % du pilote | GF1; identifiants et tarifs revérifiés au démarrage de P7 et avant GF12; fenêtre courte, cellules entrelacées; remplacement préenregistré; DC5; cassette et rejeu; modèle le plus menacé collecté en premier | P7 |
| **R202** | **Quotas et limites** : (a) limites de débit et paliers de l'API [Anthropic 2026c] (lots limités à 100 000 requêtes ou 256 Mo, expiration à 24 h); (b) quotas des outils de recherche littéraire (outil de recherche scientifique indisponible jusqu'au 1er novembre selon vulgarisation et évaluation). *P7 « Exécution et budgets de performance »; cadre, réserves ouvertes* | moyenne | moyenne : collecte retardée; recherches incomplètes | erreurs de limite ou lots expirés; refus de l'outil de recherche | palier vérifié avant GF12; API standard avec limiteur (perte du rabais de lot); collecte par blocs; recherches refaites après la remise à zéro, « non exhaustive » d'ici là | P7; dossiers |
| **R203** | **Coût d'API dépassé ou non budgété** : le plan recompté dépasse la base d'environ 930 $; volets hébergés sans estimation. *P7 R76, R83; science ouverte, déclaration du financement* | moyenne à élevée | moyenne | coût mesuré d'un bloc au-dessus du plan de plus de 30 %; volet sans estimation | pilote à 1 %; plafonds par bras et interrupteur; ordre de coupe (section 6.5); enveloppe approuvée avant GF12 | P7 |
| **R204** | **Dérive de portée** : 229,5 à 239,0 sem.-pers., soit 4,4 à 4,6 années-personne. *S0 R0.9; P4 R51; P9 R17; P2 R1* | élevée | élevée | cumul réel au-dessus du cumul de référence d'un jalon de plus de 15 % [P, à confirmer]; extension lancée avant la porte de réplication | portes GF; classes bloquante, différée et non bloquante de S0; ordre de coupe; P2 hors du chemin; revue du cumul à chaque jalon | chercheur |
| **R205** | **Effort de vulgarisation sous-estimé** : écart de 10,3 à 47,5 sem.-pers. entre V0 et les fiches; coût fixe de V0 non estimé; gabarit à réviser si HV0.1 ou HV0.2 est réfutée. *V0 R102* | élevée | élevée | heures réelles de P1 hors de 184 à 333 h; HV0.1 ou HV0.2 réfutée | gabarit et charte uniques; recalibrage sur P1; Voir et Vérifier avant Explorer; page différée plutôt que bâclée (« non évaluée ») | V0; chaque fiche |
| **R206** | **Comité d'éthique** : délai, loi applicable, absence de CER. *V0 R103; science ouverte R36, R37* | moyenne | élevée : GF5 et GF8 non satisfaisables; ni pilote ni entrevue | aucune réponse du CER à la date prévue de la première page de P1; décision écrite sur les entrevues manquante | dossier déposé en semaine 1 ou 2; question au RPRP (loi, EFVP); repli : pages sans collecte, « non évaluée », dérogation consignée | chercheur (dépôt); CER (avis) |
| **R207** | **Dépôt, Zenodo, première release** : webhook absent (cas déjà rencontré par le chercheur selon l'audit méthodologique), historique mixte, secrets, licence non commerciale. *S0 R0.12; science ouverte R30, R31, R38, R39* | moyenne | moyenne | webhook absent; aucun DOI sur le dépôt jetable; secret trouvé par le balayage | E0.6 en semaine 1; dépôt dédié (DC1); balayage de secrets; GF2; repères NetLogo sans reprise de code | S0 (lot H) |
| **R208** | **Échec de reproduction ou de docking.** *P1 R1.1, R1.13; P3 R3; P5 R14; P7 R82; protocole R66* | moyenne | moyenne à élevée : extensions suspendues; environnement de P7 retiré | cible « non satisfaite »; écart entre implémentations au-dessus de 3 ES; docking hors critère | diagnostic du protocole et registre des déviations; jamais d'ajustement pour faire disparaître l'écart; deux implémentations; docking avant tout usage de COL | porteur du projet |
| **R209** | **Plans sous-puissants, marges invérifiables.** *protocole R61, R67; S0 R0.7; P5 R13; P7 R80* | moyenne | moyenne | n requis au-dessus de n_max; TOST à marge étroite avec 1 000 répétitions | garde de puissance du harnais (refus automatique); plan séquentiel de P7 puis « indéterminé »; marge ±4 points (1 980 répétitions) ou niveau relationnel | S0; P7 |
| **R210** | **Chevauchements et incohérences entre fiches** : propriétaires doubles (T1.7 et T8.9; module de Dussutour; B1; T6.3 à T6.5 et T9.1, T9.2, T9.33; T8.16; T8.11 et T7.6); effort orphelin (E8.5, T8.12, T8.13); collisions d'identifiants. *P1 R1.11; P6 R11; P8 R8.15; P7 R83* | élevée (constatée) | moyenne : double travail, résultats divergents, effort non planifié | deux tests pour une même cible; effort compté deux fois ou aucune; `verifier-docs.ts` en erreur | propriétaires uniques (section 10); plan de recherche qui consolide; risques consolidés ici | chercheur |
| **R211** | **Réplication lue comme validation; valeur ou référence non vérifiée propagée.** *science ouverte R40; V0 R109; protocole R69; P1 R1.14; P4 R47* | moyenne | élevée : crédibilité | énoncé sans statut épistémique; marque [à confirmer] absente d'une page; erreur de `verifier-docs.ts` | statuts épistémiques; TV0.13; GF14; relecture des sources primaires avant soumission; « réplication, non validation » dans chaque note | chercheur; chaque fiche |
| **R212** | **Non-déterminisme, refus de classifieurs, non-stationnarité des API.** *P7 R73, R74, R75; science ouverte R34* | élevée | moyenne : données manquantes différentielles; variance | taux de refus par cellule; sentinelle hors IC; échecs d'analyse | refus et échecs d'analyse codés comme issues (attrition préenregistrée); K répétitions et cassette, jamais la température; replis serveur désactivés; seuil de non-comparabilité fixé au pilote | P7 |
| **R213** | **Conditions d'utilisation de l'API** (republication des journaux). *P7 R85; science ouverte R32* | moyenne | moyenne | restriction relevée à la lecture (porte C) | lecture et consignation avant la première campagne; dérivés publics et accès sur demande; cassette privée | chercheur |
| **R214** | **Double usage de P6 et divulgation.** *P6 R8; science ouverte R35* | faible | élevée | artefact avec charge exécutable, produit nommé ou vecteur nouveau | GF14 (porte D); marqueurs inertes; politique de divulgation (DC8); modèles abstraits et mesures agrégées seulement en cas de doute | P6 |
| **R215** | **Dépendance à un seul chercheur** [I] : les efforts des fiches sont chiffrés pour un chercheur. *aucun local* | moyenne | élevée | jalon manqué de plus de 15 % [P, à confirmer]; indisponibilité | dépôt public; fiches de reproduction et registre des déviations qui rendent le travail reprenable; rejeu depuis les manifestes; renfort (section 9) | chercheur |
| **R216** | **Plateforme technique** : divergence entre moteurs, chaîne TypeScript, budget headless, WASM. *S0 R0.1, R0.2, R0.13; spécification R20 à R28* | moyenne | moyenne | échec d'un spike bloquant (SPK6, SPK8, SPK11, SPK12); trace dorée périmée après une mise à jour de Node ou de TypeScript | spike et E0.5 en semaine 1; constantes en littéraux; `.node-version` et version dans le manifeste; WASM seulement par la règle de la spécification | S0 |
| **R217** | **Échéances de publication manquées ou incompatibles avec le rythme** : AAMAS 2027 hors de portée; ALIFE 2027 non atteignable pour P3, P4, P6 au rythme de référence. *science ouverte R41* | élevée | moyenne | échéance relue sur le site officiel avant GF14 ou GF15; cumul en retard à un jalon | décision datée (DC9); revues sans échéance pour P1, P5, P8 [JRSI 2026] [PLOS CB 2021]; préimpression et DOI de version; recibler ALIFE ou son édition suivante | chercheur |
| **R218** | **Asymétrie documentaire fourmi et abeille masquée.** *P8 R8.14; P9 R10; P3 R10; V0 R110* | élevée (déclarée) | moyenne | page ou note sans bandeau « asymétrie documentaire »; ligne de la matrice sans jumelle ni justification | bandeau et justification dans la fiche; lectures ciblées; validateur de la matrice (parité) | chaque fiche |

---

## 8. Première semaine

### 8.1 Ordre de lecture

1. Le [cadre](00-cadre.md) : corrections factuelles, principes de rigueur, réserves ouvertes.
2. Cette feuille de route : règle de séquence, portes, première semaine.
3. La fiche [S0](../projets/S0-socle.md) : critères de réussite, livrables, effort et dépendances; puis « Spike de la phase 0 » de la [spécification de simulation](05-spec-simulation.md).
4. [Science ouverte et éthique](08-science-ouverte-ethique.md) : décisions du chercheur et portes; séquence GitHub, Zenodo, Software Heritage.
5. [Vulgarisation et évaluation](07-vulgarisation-evaluation.md) : « Éthique et vie privée », « Séquence, portes et risques ».
6. [Protocole de reproduction](04-protocole-reproduction.md) : fiche de reproduction et portes, avant d'écrire la première fiche.
7. La fiche [P7](../projets/P7-synthese-agentique.md) : « Modèles LLM : identifiants, tarifs, paramètres » et « Tensions avec le cadre et décisions à prendre » (GF1).
8. La fiche [P1](../projets/P1-recrutement-verrouillage.md), premier projet : cibles de reproduction, livrables, effort.
9. Ensuite : [audit de la v3](01-audit-v3.md), [architecture du programme](02-architecture-programme.md), [plan de recherche](03-plan-de-recherche.md).

### 8.2 Démarrage (1,0 sem.-pers. : S0 lots D et H). Découpage par jour [P, à confirmer]

| Jour | Action | Produit |
|---|---|---|
| 1 | Contrôles du jour : page des dépréciations [Anthropic 2026a] (Haiku 4.5 : date effective, préavis); `node --version` (v24.19.0 vue), `tsc --version` (7.0.2 vue), `python --version` (3.14.7 vue) | note datée au registre |
| 1 | Trancher et inscrire : GF1 (Haiku); DC1 (nom du dépôt dédié); DC3 (nom, ORCID, affiliation); DC6 (CER : instance, contact); DC2 par défaut | registre des décisions |
| 1 à 2 | Envois à latence inconnue : dossier du CER (plan, instruments, consentement, recrutement, gestion des données; décision écrite sur les entrevues; question au RPRP sur la loi applicable); demandes d'accès (8.3); courriels aux auteurs et laboratoires | accusés d'envoi datés |
| 2 à 3 | Spike (S0 lot D) : protocole et seuils fixés **avant** la première mesure (`spikes/phase0/protocole.md`); installer esbuild; E0.4 et E0.5 | rapport; D1 à D5 |
| 4 à 5 | Dépôt jetable et E0.6 (S0 lot H) : comptes GitHub, Zenodo, OSF; balayage de secrets; webhook; release, pré-version, brouillon | DOI de version et de concept (JF1) |
| 5 | Revue de fin de semaine : écart au cumul de référence (1,0); début du lot C (T0.1, T0.3) | JF1 consigné |

### 8.3 Demandes d'accès à envoyer en semaine 1 (par déblocage)

| Source (statut dans la bibliographie) | Ce qui manque | Débloque |
|---|---|---|
| [Sasaki et al. 2013] (corrigée) | matériel supplémentaire : T, taux de transition, Table S1, effectifs | T8.2, simulation de T8.1, H8.1 à H8.3, E8.2, visuels 1 et 2 de P8 (GF6) |
| [Dussutour et al. 2009] (non vérifiée) | unité de ρ, placement de k, q₁, q₂, σ | T1.9 et H1.6 (P1); T6.7 (P6); docking de P7 (R82) |
| [Camazine et Sneyd 1991] (corrigée) | texte intégral (écart de pentes) | T1.5 définitif et E1.1 confirmatoire (porte B′ de P1) |
| [Deneubourg et al. 1990] (vérifiée) | k, n, méthode d'estimation | S1 de P1 et de P7; k de P9 |
| [Okada et al. 2014] (corrigée) | protocole et paramètres | T1.7 (P1); T8.9 (P8) |
| Perna et al. 2012 et Nieh 2004 (absentes de la bibliographie) | références à ajouter, puis lecture | E1.5 et H1.8 (porte F de P1); énoncés sur les Meliponini (porte G) |
| [Pratt et al. 2005] (non vérifiée) et la notice de 2006 | 44 paramètres, 19 états | M7 de P5 : T5.14, T5.15, T5.19 à T5.21 |
| [Pais et al. 2013] (corrigée) | Texte S1 et code (libres selon P5) | T5.5 (P5); T6.9 (P6) |
| [Marshall et al. 2009] (corrigée) | matériel supplémentaire | T5.24 |
| [Sumpter et Pratt 2009] (vérifiée) | code des auteurs ou courriel : lecture de r, sens du « ± » | durée de T5.23; H0.1; T0.17 à T0.19; T7.19 |
| [Bonabeau et al. 1996] (non vérifiée), [Wilson 1984] (vérifiée) | textes intégraux | T3.2 (« calibré » sinon); T7.17 |
| [Jones et al. 2004], [Graham et al. 2006] (vérifiées) | texte, matériel supplémentaire, équations | T3.11, T3.12; T7.18 |
| [Seeley 1992], [Seeley 1989] (non vérifiées); [Pinter-Wollman et al. 2013] (vérifiée; libre selon P4) | figure à numériser; texte intégral | T4.7 et T4.4 (P4) |
| données du laboratoire Gordon (cible [Prabhakar et al. 2012], corrigée) | créneau, c_P, séries brutes | T4.2, T4.3 (non bloquant) |
| [Couzin et al. 2005], SI de [Gelblum et al. 2015], [Bonabeau et al. 1998a] (vérifiées) | textes intégraux; équations en image; valeurs ajustées | PR-0 de P9 : T9.16, T9.27 et d'autres cibles bloquées; T9.12(b) |
| [Beekman et al. 2001] (vérifiée), [Seeley 2003] (corrigée) | textes intégraux | T6.6, T6.14 (P6) |
| [Kohli 2026] (vérifiée) et conditions d'utilisation de l'API | lecture | T7.14; porte C (GF12) |
| Nakrani et Tovey 2004, Di Caro et Dorigo 1998 (absents de la bibliographie) | P2 seulement | G3 de P2 (T2.12, E2.4) |

---

## 9. Parallélisation avec un renfort

Après GF4, un renfort peut prendre P3, P4 ou P9 (dépendance : S0 seulement) et le harnais de P7 (tâche 1) en parallèle de P1 et de P5, puis la production des pages de V0, la règle de séquence ne retenant que leur publication.

---

## 10. Identifiants, propriétaires, points ouverts et tensions

### 10.1 Identifiants définis ici

Jalons JF1 à JF14 (section 4.1); portes GF1 à GF15 (section 5.1); risques R200 à R218 (section 7). Aucune hypothèse H, cible T ni expérience E n'est définie ici : toutes viennent des fiches.

### 10.2 Propriétaires uniques proposés [P, à confirmer]

Parade de R210; le [plan de recherche](03-plan-de-recherche.md) tranche.

| Objet partagé | Propriétaire proposé | Consommateurs |
|---|---|---|
| Modèle d'Okada (T1.7 = T8.9) et module de Dussutour (T1.9, T6.7) | P1, premier construit | P8, P6, P7 |
| Module B1 de Pais et al. 2013 (T5.4 = T6.8) et forme de Hill de M1 | P5 | P6, P8 |
| T6.3 à T6.5 (acceptées par T9.1, T9.2, T9.33) | P9 | P6 (qui les exécute, environ 0,5 sem.-pers., si P9 ne les a pas acceptées) |
| T7.6 = T8.11 | P7 (exécute), P8 (définit) | |
| E8.5, T8.12, T8.13 | P8 (définit), P7 (exécute et budgète) | |
| T8.16 (List et al. 2009) | à dédoublonner avec P5 par le plan de recherche | |

### 10.3 Points ouverts et tensions avec le cadre (le cadre prime; aucune n'est une contradiction)

1. **P7 en phase 3 et modèles LLM.** Le cadre place P7 en phase 3 et demande de collecter Haiku 4.5 en premier. À un chercheur, aucune séquence ne place la collecte avant le retrait au plus tôt de Haiku 4.5, de Sonnet 5.5 ou d'Opus 5.5 (cumul d'au moins 51,5 pour un bloc Haiku, d'au moins 56,5 même par la voie courte). Trancheraient : la date de retrait effective de Haiku 4.5, DC5, et le choix entre la séquence de référence et la voie courte (GF1).
2. **Règle de séquence.** Formulée par V0 d'après le tableau de phases; le cadre ne l'énonce pas en toutes lettres. Ce document la lit comme une règle de **publication**, conformément à V0.
3. **Volets LLM de P6 et de P9 en phase 3.** Le cadre place P6 et P9 en phase 2; leurs volets LLM sont déplacés parce qu'ils consomment le harnais de P7 (plans B des deux fiches). La dépendance de P9 envers P7 que propose la fiche P9 n'est pas au cadre : à arbitrer par le plan de recherche.
4. **Effort orphelin** (E8.5, T8.12, T8.13) : aucune fiche ne le compte (section 6.1).
5. **Écart V0 et fiches** : 10,3 à 47,5 sem.-pers. pour les pages (section 6.2); la conversion à 40 h par semaine est une hypothèse de ce document.
6. **Identifiants de risques.** Collisions R41 (science ouverte et éthique contre P4) et R100 à R105 (métriques et typologie contre V0); les numéros R1 à R17 sont locaux à plusieurs fiches. Ce document consolide sous R200 à R218 et renvoie aux identifiants locaux; le plan de recherche peut renuméroter en une passe.
7. **Nomenclature des portes.** Harmonisée en 5.2 (demande du protocole de reproduction); les lettres A à E, PR-0 à PR-6, G0 à G3 de P2, G1 à G9 de P8, « porte C » et « porte D » de science ouverte (autre sens) subsistent dans leurs documents.
8. **Tarifs LLM.** La fiche P7 les tient pour à vérifier; la fiche P8 rapporte une confirmation partielle le 2026-10-01. Traitement conservateur : à vérifier (GF12).
9. **Cibles de publication.** Les cibles ALIFE 2027 de science ouverte et éthique pour P3, P4, P6 ne sont pas atteignables au rythme de référence; GECCO 2027 reste [non vérifiée] (P2).
10. **TypeScript.** Écart entre la fiche S0 (absent) et la spécification (présent) levé : `tsc` 7.0.2 lu le 2026-10-01.
11. **Voie courte vers P7** (section 2.5) : décision du chercheur; elle déplace P3 devant la fin de la phase 1 et ne résout pas à elle seule le retrait de Sonnet 5.5 et d'Opus 5.5.
12. **Dates.** Toutes les dates de jalons sont indicatives (1 sem.-pers. par semaine calendaire, départ le 2026-10-05); seules les échéances externes de 4.2 sont des dates de source, à relire sur le site officiel.
13. **Documents attendus.** Les liens vers l'audit de la v3, l'architecture du programme et le plan de recherche pointent vers des documents rédigés en parallèle; `node outils/verifier-docs.ts` les signale tant qu'ils sont absents.
14. **Tranche verticale de S0.** La spécification de simulation compte parmi les critères d'achèvement du socle l'exécution du pont de Goss de P1 (headless, export, rejeu, verdict du critère d'histogramme); la fiche S0, qui fait foi pour la porte de sortie, ne l'exige pas. Ce document retient la fiche pour GF4 et place cette tranche au bloc 1 de P1 (3,0 sem.-pers., déjà compté dans P1).

**Contrôle de ce document :** `node outils/verifier-docs.ts` : aucun lien cassé hors documents attendus, aucune étiquette absente de la bibliographie, identifiants H, T et E tous définis dans une fiche.

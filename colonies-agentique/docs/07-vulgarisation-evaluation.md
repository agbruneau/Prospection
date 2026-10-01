# V0 — Vulgarisation et évaluation (volet transversal)

**Statut :** document de programme, conforme à [00-cadre.md](00-cadre.md), qui prime en cas de conflit. **Date :** 2026-10-01. **Régime :** production : le chercheur agit sur ce document pour concevoir, publier et évaluer les pages.
**Sources :** dossier [x-vulgarisation](../recherche/dossiers/x-vulgarisation.md) (vérifié : valeurs, formules, réserves); audits [vulgarisation](annexes/audit/vulgarisation.md) et [méthodologie](annexes/audit/methodologie.md) (éthique, publication). Calculs rejouables : [x_vulgarisation_checks.py](../recherche/verifications-numeriques/x_vulgarisation_checks.py) (toutes les lignes PASS, relancé le 2026-10-01 pour ce document).

**Marques.** [I] : inférence ou calcul du dossier ou de ce document. [à confirmer] : valeur non confirmée à la source. [non vérifiée] : référence non consultée. [estimation, à confirmer] : estimation d'effort. Niveaux de lecture repris du dossier quand ils conditionnent une valeur : [T] texte intégral lu, [R] résumé lu, [S] source secondaire. Statuts épistémiques (cadre) : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.

**Nature de V0.** V0 ne reproduit aucun résultat publié. Ses « cibles » sont des critères d'acceptation des pages (TV0.n); ses hypothèses (HV0.n) portent sur l'apprentissage; ses expériences (EV0.n) l'évaluent; ses risques sont R100 à R112 (plage réservée à ce document). Tout choix de conception ci-dessous est une *Hypothèse de l'auteur* tant que l'évaluation (voir « Protocole d'évaluation pédagogique ») ne l'a pas testé, sauf source indiquée. Les documents voisins : [02-architecture-programme.md](02-architecture-programme.md), [03-plan-de-recherche.md](03-plan-de-recherche.md), [04-protocole-reproduction.md](04-protocole-reproduction.md), [05-spec-simulation.md](05-spec-simulation.md), [06-metriques-et-typologie.md](06-metriques-et-typologie.md), [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md), [09-feuille-de-route.md](09-feuille-de-route.md), [10-glossaire.md](10-glossaire.md), [11-bibliographie.md](11-bibliographie.md).

---

## 1. Portée et règles qui gouvernent V0

| Livrable | Section | Prêt quand |
|---|---|---|
| Fiches de publics; rattachement des pages | 2 | validé avant le premier parcours (P1) |
| Objectifs d'apprentissage (Bloom révisé) | 3 | chaque objectif a un item de mesure |
| Gabarit de page à trois niveaux | 4 | gabarit implanté et TV0.1 à TV0.8 passés sur P1 |
| Étiquettes de statut épistémique | 5 | TV0.13 passé |
| Charte graphique | 6 | TV0.1 à TV0.3 passés |
| Lexique contrôlé, encart « Ce que fait vraiment la reine » | 7 | validé par un myrmécologue et un apidologue |
| Liste de contrôle WCAG 2.2 AA | 8 | cochée par page et par version |
| Version statique (petits multiples) | 9 | TV0.17 passé |
| Protocole d'évaluation; éthique | 10 et 11 | avis du CER reçu **avant** toute collecte |
| Ressources, budget, version anglaise, hébergement | 13 à 16 | avant la publication de P1 |

Trois règles s'appliquent à toutes les pages.

1. **Séquence.** Le tableau « Architecture du programme » du cadre place V0 en phase 0 puis en continu, avec le gabarit livré avant P1; la phase 1 regroupe P1, P8 et P5; la phase 2, P3, P4, P6 et P9 (mouvement); la phase 3, P7, P2 et P9 (construction). **Règle V0 : les pages de la phase 1 sont publiées et évaluées avant que la première page de la phase 2 soit publiée; celles de la phase 3 viennent après la phase 2.** La règle vient de l'audit (« publier et évaluer 1 → 3 → 5 complètement avant d'ouvrir 2, 4, 6 », avec la numérotation de la v3) et du tableau de phases du cadre. Elle porte sur la **publication** des pages, non sur le travail de simulation, que les dépendances du cadre ordonnent déjà. « Évaluée » est défini dans « Séquence, portes et risques ».
2. **Séparation.** Toute page interactive est *exploratoire*. Seul le panneau Vérifier affiche des résultats *confirmatoires*, issus des runs préenregistrés du moteur headless (cadre, principe de séparation).
3. **Parité.** Chaque page traite la fourmi et l'abeille au même niveau d'exigence. Une asymétrie de la littérature (côté abeille plus mince pour P8 et P9 selon les dossiers) est affichée dans le bandeau de la page (« asymétrie documentaire ») et justifiée dans la fiche du projet.

---

## 2. Publics et rattachement des pages

### 2.1 Fiches des quatre publics

Durées et points d'entrée : dossier x-vulgarisation, tableau « Application par public » [I]; ce sont des cibles de conception, à mesurer aux entrevues (TV0.9).

| | Grand public (15 ans et plus) | Étudiants (cégep, université : biologie, génie, informatique) | Praticiens de l'agentique | Chercheurs |
|---|---|---|---|---|
| **Contexte** | mobile ou ordinateur, lecture libre, sans guidage extérieur | ordinateur, en classe ou en devoir; recrutement souvent par un enseignant | ordinateur, lecture ciblée, souvent en anglais | ordinateur, lecture approfondie |
| **Durée cible** | 3 à 5 min | 20 à 50 min | 10 à 20 min | non bornée (lecture de la note) |
| **Point d'entrée** | Voir (obligatoire) | Explorer, puis Modifier la règle; Voir à la carte | carte comparative et Vue de l'agent, sans passer par Voir | Vérifier et note de recherche |
| **Prérequis** | aucun (ni biologie, ni informatique, ni probabilités) | aucun en biologie des insectes; lecture de graphes et notion de probabilité au niveau du cours hôte | pratique des systèmes multi-agents ou des agents LLM (orchestrateur, outils, contexte); aucune biologie | lecture d'un modèle au format ODD; statistique de base (intervalles, équivalence) |
| **Objectif principal** | comprendre qu'un comportement collectif peut émerger sans chef ni plan global; savoir ce que la reine fait et ne fait pas | prédire et expliquer l'effet d'un paramètre; relier règle locale et motif global | choisir un mécanisme de coordination (canal, oubli, freinage, quorum) et anticiper ses modes d'échec | juger la fidélité de la reproduction et la solidité de l'extension agentique |
| **Canal** | page publique, vulgarisation scientifique, musée, réseaux | cours de systèmes multi-agents, d'éthologie, de génie des systèmes | billet technique en français et en anglais, conférence | note de recherche, dépôt de code, préimpression |
| **Mesure** | item « Qui choisit le nouveau site de l'essaim ? » (HV0.2); entrevues | HV0.1 (ANCOVA), HV0.3 (différé); instrument de systèmes complexes en secondaire | entrevues (TV0.9); pas de gain normalisé; EV0.8 en phase 3 | revue des critères d'acceptation de chaque projet; TV0.13 et TV0.14 |

**Règles d'entrée.** *Voir* est obligatoire pour le grand public et optionnel pour les trois autres : le guidage aide surtout les novices (guidage et résultats d'apprentissage : d = 0,50, IC95 0,37 à 0,62, 72 études [T] [Lazonder et Harmsen 2016]) et perd son avantage quand les connaissances préalables sont élevées [R] [Kirschner et al. 2006] [S] [Kalyuga et al. 2003]. Le sélecteur de niveau est donc toujours visible, et chaque niveau a un lien direct (voir « Graine et état dans l'URL »). La synthèse « explorer, mais avec étayage » vient de [Alfieri et al. 2011] (découverte non assistée : d = −0,38 [R]; la valeur de la découverte guidée, 0,50, est [S; à confirmer]).

### 2.2 Pages, parcours et public principal

**Deux unités.** Une **page** est une vue publiée (un visuel V<n>, ou une page numérotée d'une fiche) : elle a un titre, une question de prédiction, ses niveaux (tous, ou le sous-ensemble que la fiche déclare : Explorer seul, Vérifier seul) et **un public principal**. Un **parcours** est l'ensemble des pages d'un projet. La page est l'unité du gabarit, du public principal, de la production et des contrôles TV0.1 à TV0.8 et TV0.13 à TV0.17. Le parcours est l'unité des portes, de l'évaluation pédagogique (HV0.n, sur les pages que la fiche désigne) et des entrevues (TV0.9). Le catalogue des pages de chaque projet est dans la section « Visuels et trois niveaux » de sa fiche; V0 ne le duplique pas.

**Règle d'attribution du public principal d'une page** [Hypothèse de l'auteur]. Le premier public cité est le principal, les suivants sont secondaires.

1. La page exige des notions d'agentique (orchestrateur, jetons, appels, contexte, coût) : **praticiens**.
2. Sinon, son entrée est Voir (aucun prérequis, une variable à la fois) : **grand public**.
3. Sinon, son entrée est Explorer (curseurs, lecture de graphes, notion de probabilité) : **étudiants**.
4. Sinon, elle n'existe qu'au niveau Vérifier (tableaux de cibles, distributions, critères) : **chercheurs**, ou praticiens quand elle porte sur l'évaluation d'agents.

Une page qui n'existe qu'au niveau Vérifier n'a donc jamais le grand public pour public principal.

**Publics déclarés par les fiches, et décision de V0.** État à la date de rédaction; plusieurs fiches demandent à V0 de confirmer ou de valider leur proposition.

| Parcours (fiche) | Phase | Publics déclarés par la fiche | Entrée par défaut | Décision de V0 |
|---|---|---|---|---|
| S0 : typologie à trois axes ([fiche](../projets/S0-socle.md)) | 0 | page de typologie (jeu de données et visuel interactif); coquille de page = gabarit de V0 | typologie | praticiens; chercheurs en secondaire |
| P1 ([fiche](../projets/P1-recrutement-verrouillage.md)) | 1 | par niveau : Voir, grand public et étudiants; Explorer, étudiants et praticiens; Vérifier, chercheurs et praticiens | Voir, puis Explorer | conforme à la règle; page de l'essai contrôlé (EV0.2) |
| P8 ([fiche](../projets/P8-individu-et-colonie.md)) | 1 | par page : grand public ou étudiants pour la plupart; praticiens pour les pages de coût et de budget | Voir, puis Explorer | conforme à la règle |
| P5 ([fiche](../projets/P5-decision-par-quorum.md)) | 1 | par niveau : Voir, grand public; Explorer, étudiants et praticiens; Vérifier, chercheurs | Voir | conforme; porte l'encart sur la reine et l'item de HV0.2 |
| P3 ([fiche](../projets/P3-division-du-travail.md)) | 2 | étudiants et grand public; praticiens pour le panneau agentique (visuel 10) | Voir, puis Explorer | **confirmé** (demande de la fiche) |
| P4 ([fiche](../projets/P4-regulation-sans-vue-densemble.md)) | 2 | proposé : praticiens et étudiants en ingénierie, Voir ouvert au grand public | Explorer | **ajusté** : pages sur les mécanismes de fourmi et d'abeille (V1 à V5), étudiants, avec Voir ouvert au grand public; page agentique (V6), praticiens. La fiche est à mettre à jour |
| P6 ([fiche](../projets/P6-defaillances-et-defenses.md)) | 2 | V6.1 à V6.5, grand public et étudiants; V6.6 à V6.8, praticiens et chercheurs | Voir (V6.1 à V6.5), Explorer (V6.6 à V6.8) | confirmé |
| P9 ([fiche](../projets/P9-mouvement-collectif-et-construction.md)) | 2; construction 3 | par page : grand public (4, 6, 7, 15); étudiants (1, 2, 3, 5, 8, 10, 11, 12); étudiants et praticiens (9); praticiens (13, 14) | Voir | **validé** par la règle (demande de la fiche); pages 8, 10 et 11 en phase 3 |
| P7 ([fiche](../projets/P7-synthese-agentique.md)) | 3 | praticiens, puis chercheurs | Explorer, puis Vérifier | confirmé |
| P2 ([fiche](../projets/P2-memoire-partagee-metaheuristiques.md)) | 3, go/no-go | étudiants et praticiens; chercheurs pour Vérifier | Explorer | confirmé; publié seulement si P2 est lancé |

En cas d'écart entre une fiche et ce tableau, la fiche prévaut pour le public d'une page qu'elle déclare page par page; V0 prévaut pour la règle d'attribution, pour les propositions de parcours que les fiches lui soumettent et pour les pages nouvelles. Les parcours de la phase 1 (P1, P8, P5) couvrent les quatre publics : TV0.9 y recrute des participants des quatre publics avant la porte G1.

---

## 3. Objectifs d'apprentissage mesurables (taxonomie de Bloom révisée)

**Règles de formulation.** Chaque objectif commence par « la personne peut » suivi d'un verbe d'action observable de la dimension des processus cognitifs de la taxonomie de Bloom révisée (mémoriser, comprendre, appliquer, analyser, évaluer, créer; Krathwohl 2002, citée par l'audit vulgarisation, **non encore inscrite dans [11-bibliographie.md](11-bibliographie.md) : à ajouter**). Les verbes non observables (« savoir », « apprécier ») sont proscrits. Chaque objectif a au moins un item de mesure dont le type est nommé. Pour le grand public, le plafond de conception est *Comprendre* et *Appliquer*, à cause de la durée cible [I]. Les identifiants OA-<parcours>.<n> sont locaux à V0.

**Articulation avec les fiches.** Chaque fiche fixe, dans « Visuels et trois niveaux », des objectifs au grain du niveau et du visuel, sous des identifiants propres (O<n> ou OA<n>). Les objectifs ci-dessous sont les **objectifs-cadre** de chaque parcours. Règle : tout objectif de fiche (a) porte un verbe et un niveau de la taxonomie, (b) dit quel objectif-cadre il précise, (c) a un item de mesure nommé. La fiche prévaut pour le contenu (ce qu'on prédit, ce qu'on explique); V0 prévaut pour le niveau, le type d'item et les seuils d'évaluation.

**Instrument.** Items à choix multiple avec justification écrite, codée selon *explication directe* ou *explication émergente* [Chi et al. 2012] [Resnick 1996]; dont quelques items de conceptions erronées (« Qui choisit le site de l'essaim ? », « La colonie veut… » vrai ou faux). L'audit propose 10 à 15 items dont 3 à 4 de conceptions erronées [à confirmer]. L'instrument de [Khodr et al. 2022] (cinq scénarios, 37 répondants à la validation, aucun scénario d'insectes sociaux [T]) sert en mesure secondaire; les items « qui décide ? » sont à écrire et à valider (EV0.5).

### 3.1 Objectifs transversaux

| ID | Niveau | La personne peut… | Item de mesure | Appui |
|---|---|---|---|---|
| OA-T.1 | Analyser | distinguer une explication par contrôleur d'une explication émergente d'un même motif | choix de l'explication + justification codée | [Chi et al. 2012], [Resnick 1996] |
| OA-T.2 | Comprendre | expliquer qu'on ne lit pas le niveau du groupe à partir de celui de l'individu (un vol n'est pas un gros oiseau) | question ouverte codée | [Resnick 1996], [Wilensky et Resnick 1999] |
| OA-T.3 | Évaluer | juger si une conclusion tirée d'une seule exécution est soutenue par la distribution sur N graines | vrai/faux justifié sur une exécution atypique | [Adams et al. 2008c] (les étudiants prennent l'animation pour un fait) |
| OA-T.4 | Évaluer | lire une étiquette de statut épistémique et dire ce qu'elle autorise (reproduit n'est pas validé) | item sur une figure étiquetée | cadre, principe de rigueur 1 |
| OA-T.5 | Comprendre | expliquer que fourmis et abeilles ne sont pas deux étapes d'une échelle (groupes frères) | vrai/faux justifié | [Johnson et al. 2013], [Omland et al. 2008] |

### 3.2 Objectifs-cadre par parcours

Les valeurs et mécanismes viennent des dossiers de projet; les fiches de projet fixent les cibles chiffrées. Aucun seuil de réussite n'est fixé ici : l'effet est jugé au niveau du groupe (HV0.1 à HV0.3).

| ID | Niveau | La personne peut… | Public | Item de mesure | Appui |
|---|---|---|---|---|---|
| OA-S0.1 | Appliquer | classer quatre architectures données dans les quatre régimes selon les trois axes (plan global explicite, contrôle central à l'exécution, médium) | praticiens | classement + justification | cadre, typologie à trois axes |
| OA-S0.2 | Analyser | trouver, dans une ligne de la carte comparative, la relation conservée et l'endroit où l'analogie casse | praticiens | repérage sur une ligne fournie | audit vulgarisation (M1) |
| OA-P1.1 | Appliquer | prédire, avant de lancer, quelle branche domine quand la courte s'ajoute tard, puis situer sa prédiction dans la distribution | étudiants, grand public | prédiction tracée + écart à la distribution | [Goss et al. 1989], [Kim et al. 2017] [R] |
| OA-P1.2 | Analyser | isoler, en changeant un paramètre à la fois, ce qui produit le verrouillage (non-linéarité, absence d'évaporation à l'échelle de l'expérience, absence de rétroaction négative) et ce que la persistance seule n'explique pas | étudiants | tâche de balayage + explication codée | dossier p1-recrutement; [Grüter et al. 2012] |
| OA-P1.3 | Comprendre | expliquer que le canal (piste ou danse) est une variable du modèle, non un attribut du taxon; que l'intensité du signal pilote l'allocation dans les modèles publiés; et qu'une suiveuse de danse tire une danseuse au hasard (pas de diffusion pub/sub) | étudiants | question ouverte codée | [Seeley et al. 1991], cadre (taxons et corrections factuelles) |
| OA-P1.4 | Créer | modifier la règle de choix pour éviter le verrouillage (bruit ou rétroaction négative) et le démontrer sur N graines | étudiants | règle modifiée + résultat sur N graines | [Resnick 1996] (construire des modèles) |
| OA-P8.1 | Appliquer, Comprendre | prédire, avant la révélation, qui discrimine mieux de l'individu ou de la colonie à petite et à grande différence, puis expliquer que la réponse dépend de la difficulté et de la corrélation des erreurs (proposition du dossier, [I]) | étudiants, grand public | prédiction + question à choix justifiée | [Sasaki et al. 2013], dossier p8-individu-colonie |
| OA-P8.2 | Analyser | décomposer un gain collectif en agrégation (vote) et interaction (communication) | étudiants, praticiens | décomposition d'un cas fourni | cadre, construits mesurables |
| OA-P8.3 | Évaluer | critiquer une comparaison collectif contre individu qui ne contrôle pas le budget | praticiens, chercheurs | critique d'un énoncé | dossier p8 (comparateur de Sasaki non apparié); [Kim et al. 2025a] |
| OA-P5.1 | Comprendre | expliquer qu'un choix de site résulte d'un seuil de quorum atteint par des recrutements concurrents, sans qu'une éclaireuse ni la reine ordonne | grand public | item « Qui choisit le nouveau site ? » (HV0.2) | [Franks et al. 2003], [Seeley et Visscher 2004] |
| OA-P5.2 | Analyser | décrire l'effet du seuil de quorum sur la vitesse et la justesse | étudiants | lecture d'un nuage vitesse-justesse | [Franks et al. 2003] |
| OA-P5.3 | Appliquer | prédire l'issue entre deux sites égaux avec et sans signaux d'arrêt (inhibition croisée) | étudiants | prédiction + vérification | [Pais et al. 2013] |
| OA-P5.4 | Évaluer | distinguer un interblocage adaptatif (options faibles) d'un interblocage pathologique | étudiants, chercheurs | classement de deux cas | [Pais et al. 2013] |
| OA-P3.1 | Comprendre | expliquer comment des seuils de réponse différents répartissent les tâches sans assignation centrale | étudiants | question ouverte codée | [Theraulaz et al. 1998], [Bonabeau et al. 1998b] |
| OA-P3.2 | Appliquer | prédire, après le retrait d'une caste, laquelle élargit son répertoire et son activité (chez *Pheidole*, ce sont les majors après retrait des minors) | étudiants | prédiction + vérification | [Wilson 1984] |
| OA-P3.3 | Analyser | séparer l'effet de la diversité des seuils de celui de l'ordre de mise à jour (synchrone, asynchrone) | étudiants | balayage à deux facteurs | [Caron-Lormier et al. 2008] |
| OA-P3.4 | Évaluer | juger l'énoncé « la diversité stabilise » appliqué aux agents (hypothèse sans acquis, contre-preuves publiées) | praticiens | critique d'un énoncé étiqueté | cadre (corrections factuelles) |
| OA-P4.1 | Appliquer | prédire l'effet d'un changement de λ ou de W sur L dans un document réactif; la page rappelle ce que Little relie (trois moyennes) et ce qu'elle n'explique pas | étudiants, praticiens | tâche de calcul guidé | [Victor 2011a], [Anderson et Ratnieks 1999a] |
| OA-P4.2 | Analyser | distinguer ce que mesure la fourmi (un débit sur la boucle de terrain) de ce que mesure l'abeille (un délai dans une file d'appariement) | étudiants, praticiens | appariement + justification | cadre (corrections factuelles), [Prabhakar et al. 2012] |
| OA-P4.3 | Évaluer | dire d'où vient l'analogie TCP et ce que l'article de référence ne dit pas | praticiens | vrai/faux justifié | [Carey 2012], [Gordon 2014] |
| OA-P4.4 | Appliquer | prédire que le blocage des retours fait chuter les sorties, puis les reprend avec retard (proposition de la fiche P4, intégrée) | étudiants, grand public | prédiction + vérification | [Prabhakar et al. 2012] |
| OA-P4.5 | Appliquer | classer un exemple d'ingénierie (réponse 429 avec `retry-after`, latence croissante, crédits `request(n)`) comme signal explicite ou indice implicite (proposition de la fiche P4, intégrée) | praticiens | classement d'exemples | dossier p4-regulation |
| OA-P4.6 | Évaluer | lire une distribution sur N graines et décider si une cible est atteinte selon son critère (proposition de la fiche P4, intégrée; voir aussi OA-T.3) | chercheurs, praticiens | décision sur une distribution fournie | cadre, critère d'acceptation |
| OA-P6.1 | Comprendre | présenter le moulin comme l'échec d'une règle habituellement efficace (suivre la piste) | grand public, praticiens | question ouverte codée | [Couzin et Franks 2003]; audit vulgarisation (m7) |
| OA-P6.2 | Analyser | distinguer scission (deux décisions), interblocage (aucune décision) et verrouillage (mauvaise décision figée) | praticiens | classement de trois cas | cadre (corrections factuelles) |
| OA-P6.3 | Appliquer | associer un mode d'échec agentique à son analogue de colonie, avec l'étiquette *Analogie* et l'endroit où elle casse | praticiens | appariement étiqueté | [Cemri et al. 2025] |
| OA-P9.1 | Comprendre | expliquer que la formation de voies n'est pas générale (trois régimes de trafic selon le taxon) | grand public, étudiants | vrai/faux justifié | [Couzin et Franks 2003]; dossier p9 |
| OA-P9.2 | Analyser | repérer, dans le transport collectif, le rôle des individus informés transitoires et non d'un meneur persistant | étudiants | Vue de l'agent + question codée | [Gelblum et al. 2015] |
| OA-P9.3 | Appliquer | prédire l'effet de la fraction d'individus informés sur la direction du groupe | étudiants | prédiction + vérification | [Couzin et al. 2005] ([à confirmer] : contenu non lu en texte intégral) |
| OA-P9.4 | Analyser | expliquer pourquoi la phéromone de construction est nécessaire à l'apparition des piliers, et pourquoi un modèle classique de motifs sur les rayons relève désormais du *Modèle simplifié* non robuste ([à confirmer] : figure citée par le dossier) | chercheurs | question ouverte codée | [Khuong et al. 2016], [Camazine 1991], [Johnson 2009] |
| OA-P7.1 | Appliquer | situer une architecture agentique dans les quatre régimes (orchestration, chorégraphie spécifiée, auto-organisation stigmergique, signaux directs) | praticiens | classement | cadre, typologie |
| OA-P7.2 | Analyser | lire, pour chaque cellule d'une grille d'agents, la distribution sur N exécutions, le coût et l'intervalle | praticiens, chercheurs | lecture d'une grille fournie | [Miller 2024], [Kapoor et al. 2024] |
| OA-P7.3 | Évaluer | critiquer un résultat multi-agents sans budget ni intervalle | praticiens | critique d'un énoncé | [Kapoor et al. 2024] |
| OA-P7.4 | Créer | écrire une politique `decide(observation) → action` (règle, puis rejeu d'un journal d'agent LLM) et la comparer au témoin orchestré | praticiens | politique + comparaison | dossier x-vulgarisation (parallèles agentiques, [I]) |
| OA-P2.1 | Comprendre | expliquer que ρ désigne la persistance dans l'Ant System de 1996 et que d'autres conventions l'ont inversée | chercheurs | question à choix | [Dorigo et al. 1996] |
| OA-P2.2 | Analyser | comparer ACO et ABC par la granularité de la mémoire partagée plutôt que par « chemin contre lieu » | chercheurs | comparaison guidée | dossier p2-optimisation |
| OA-P2.3 | Évaluer | juger une affirmation de supériorité d'une métaheuristique à métaphore sans budget égal ni référence non bio-inspirée | chercheurs | critique d'un énoncé | [Sörensen 2015], [Camacho-Villalón et al. 2023] |

---

## 4. Gabarit de page à trois niveaux

### 4.1 Principe

Le gabarit suit le « verre à martini » : une tige conduite par l'auteur (Voir), puis l'ouverture à l'exploration (Explorer), puis la lecture libre des données (Vérifier) [T] [Segel et Heer 2010]. L'ordre est celui du cadre, inversé par rapport à la v3 : l'animation sans interactivité a une valeur éducative limitée [Adams et al. 2008a] (phrase lue dans le manuscrit d'auteur de la partie I; version éditeur non lue, [à confirmer]), mais « apporte peu » ne veut pas dire « nuit » : l'effet moyen de l'animation sur l'image fixe est faible et positif (g = 0,226, IC95 0,12 à 0,33, 61 études, I² = 78 % [R/T] [Berney et Bétrancourt 2016]; d = 0,37 [R] [Höffler et Leutner 2007]). Le défaut à éviter est l'absence de prédiction et d'exploration engagée. Les explorables n'ont aucune preuve d'efficacité propre [T] [Victor 2011a] [Hohman et al. 2020] : d'où l'évaluation.

### 4.2 Zones de la page

Toutes les pages ont les mêmes zones, aux mêmes endroits, avec les mêmes contrôles (invariant de disposition). Une page qui n'existe qu'à certains niveaux (voir la fiche) n'a pas les zones des autres niveaux : elles sont absentes, jamais vides.

| Zone | Rôle | Contenu | Contrôles | Accès non visuel |
|---|---|---|---|---|
| Z0 Bandeau | identité | titre; public principal; taxon en latin et préréglage (source du modèle); durée; version du moteur; langue; « asymétrie documentaire » si elle existe; lien « Version statique » | sélecteur de niveau (Voir, Explorer, Vérifier); langue | repères ARIA, titre de niveau |
| Z1 Scène | simulation | canevas; légende à pictogrammes; **barre d'échelle et horloge propres à chaque espèce**, avec la mention « échelles différentes »; marqueur d'événement (perturbation) | Lecture, Pause, Pas-à-pas, Réinitialiser, vitesse; choix de l'individu à suivre | contenu de repli du canevas; résumé textuel vivant |
| Z2 Graphes | vue analytique | série temporelle synchronisée avec la scène (curseur temporel commun); courbes des deux espèces superposées sur un axe commun normalisé (fraction de la colonie, temps en unités naturelles) | curseur temporel au clavier | tableau de données équivalent (bouton « Données ») |
| Z3 Distribution | N graines | nuage ou histogramme des N exécutions, exécution courante marquée; N, plage de graines, version du moteur; règle de choix de l'exécution typique | « Rejouer cette exécution »; choix de la graine | tableau + résumé (médiane, intervalle, rang de l'exécution courante) |
| Z4 Paramètres | contrôles | curseurs natifs `<input type="range">` étiquetés, avec valeur et unité; préréglages | curseurs, préréglages, réinitialiser | étiquettes, valeur annoncée |
| Z5 Récit et consignes | texte | étapes guidées; question de prédiction; encadré « Ce que ça ne veut pas dire » | prédire, valider, passer | texte |
| Z6 Vue de l'agent | niveau individuel | suivi d'un individu : ce qu'il perçoit, la règle en cours, son action | précédent, suivant (individu) | texte de la règle en clair |
| Z7 Règle | Modifier la règle | règle publiée, variantes prédéfinies, éditeur | éditer, appliquer, restaurer la règle publiée | erreurs annoncées par `role="status"` |
| Z8 Carte agentique | pont vers l'agentique | une ligne (Voir), carte en relations (Explorer), tableau complet (Vérifier) | filtre par relation | tableau |
| Z9 Vérifier | reproduction | cible de la fiche, critère d'acceptation, verdict, registre des déviations, balayage en petits multiples, manifeste de run, export, code, références | export (paramètres et résultats), liens | tableaux, liens |
| Z10 Pied | pérennité | limites; statut global; version; citation et DOI; licence | — | — |

### 4.3 Ce qui est visible à chaque niveau

| Zone | Voir | Explorer | Vérifier |
|---|---|---|---|
| Z0 Bandeau | oui | oui | oui |
| Z1 Scène | une exécution typique, rythme imposé par étape, avec pause | exécution libre, tous les contrôles | exécutions publiées, rejeu |
| Z2 Graphes | un graphe, après la prédiction | synchronisés à la scène | tous, avec intervalles |
| Z3 Distribution | dès qu'une exécution est montrée, en forme compacte (exécution typique, médiane, intervalle) | complète | complète, plage de graines exposée |
| Z4 Paramètres | **une seule variable** manipulée par étape | paramètres pertinents seulement (étayage implicite [Podolefsky et al. 2013]), dont un curseur leurre | tous les paramètres du manifeste, en lecture et en balayage |
| Z5 Récit | oui (prédiction avant chaque lancement) | défis courts | notes, limites |
| Z6 Vue de l'agent | vignette non interactive : un individu mis en évidence, sans paramètre à régler | oui, interactive | trace d'un run : journal exportable des décisions d'un agent |
| Z7 Règle | non | oui (variantes, puis éditeur) | règle publiée verrouillée; toute variante est lancée comme extension exploratoire, avec l'écart au publié affiché |
| Z8 Carte | **une ligne** | carte en relations | tableau complet avec sources |
| Z9 Vérifier | non | lien | oui |
| Z10 Pied | oui | oui | oui |

**Fiches de projet.** La section « Visuels et trois niveaux » de chaque fiche spécialise ce cadre : pour chaque niveau, ce qui est montré et manipulé, la Vue de l'agent, Modifier la règle, les objectifs, l'accessibilité propre au projet et les erreurs de compréhension à prévenir. Une fiche peut préciser, jamais affaiblir, les invariants de cette section.

**Invariant : aucune exécution n'est montrée sans sa distribution.** La distribution sur N graines n'est jamais masquable; sur petit écran elle peut se réduire à sa forme compacte, jamais disparaître. Le cadre place la distribution dans Vérifier; V0 l'affiche à tous les niveaux (audit vulgarisation, M8 : sans elle, une exécution atypique contredit le récit ou un seul essai paraît « démontrer »).

### 4.4 Niveau Voir : récit guidé avec prédiction

Un petit nombre d'étapes (3 à 5 [à confirmer], audit §3.2); un récit peut enchaîner plusieurs pages d'un même parcours, sans dépasser la durée cible du public. Chaque étape :

1. une question, une seule variable manipulée;
2. **prédiction obligatoire avant « Lancer »** (choix, curseur ou tracé); le bouton « Passer » existe, la page le consigne pour l'étude seulement (avec consentement);
3. exécution **typique** : la graine est annoncée comme telle et choisie une fois, avant publication, par une règle consignée (exécution dont le résultat principal est le plus proche de la médiane; pour une part entre deux options, la part de l'option majoritaire, afin qu'une distribution bimodale ne fasse pas montrer l'issue rare; `replaySeed` du résumé précalculé de [05-spec-simulation.md](05-spec-simulation.md)), jamais à la main;
4. comparaison prédiction/résultat avec la distribution (écart visible, prédire puis voir l'écart améliore le rappel [R] [Kim et al. 2017]; réflexion et rétroaction [R] [Moreno et Mayer 2007]) puis auto-explication en une phrase;
5. conclusion mécaniste en une phrase, portant son étiquette de statut;
6. encadré « Ce que ça ne veut pas dire » (portée de l'analogie) et, pour le grand public, l'arbre sans échelle (voir « Carte agentique »).

Le rythme imposé par étape est cohérent avec la littérature (animations à rythme imposé : g = 0,309 [R/T] [Berney et Bétrancourt 2016]); la pause reste obligatoire (WCAG 2.2.2).

### 4.5 Niveau Explorer : bac à sable étayé

- **Défis courts** (« trouve un réglage où… ») plutôt que curseurs libres seuls [Alfieri et al. 2011] [Lazonder et Harmsen 2016].
- **Curseur leurre.** Un paramètre que la personne croit influent et qui ne l'est pas dans le modèle publié (par exemple l'« autorité de la reine » sur le choix d'un site), pour que la simulation corrige la conception : PhET recommande de laisser ajuster des paramètres jugés pertinents même sans effet [T] [Adams et al. 2008c]. Garde-fous : (a) la reine **régule** bel et bien la reproduction; le leurre ne vaut que pour le choix d'un site ou d'une source [I]; (b) après usage, la page **révèle** que le paramètre n'existe pas dans le modèle (étiquette *Modèle simplifié*) : le leurre ne reste jamais présenté comme réel.
- **Vue de l'agent** (niveau individuel, pont vers la fenêtre de contexte). On suit un individu; tout ce qui est hors de son rayon de perception est masqué; la règle en cours s'affiche en clair avec les quantités réelles de l'instant, par exemple « signal perçu à gauche : x_g; à droite : x_d → probabilité de tourner à gauche : p = f(x_g, x_d) ». Appui : « un vol n'est pas un gros oiseau » [T] [Resnick 1996]; confusion des niveaux [T] [Wilensky et Resnick 1999]; modélisation incarnée [S] [Wilensky et Reisman 2006]. Pour l'abeille, la vue montre le tirage de la danseuse suivie (pas de diffusion). Pour un agent LLM, elle montre l'observation sérialisée exacte (la fenêtre de contexte), la sortie brute et le coût en jetons : le parallèle s'appuie sur le Transformer Explainer (90 participants, avantages en compréhension et en engagement [R] [Cho et al. 2024]); l'inférence « Vue de l'agent = fenêtre de contexte » est une *Analogie* [I].
- **Modifier la règle.** Panneau avec la règle publiée, des variantes prédéfinies puis un éditeur (formule ou quelques lignes de TypeScript), retour immédiat. Appui : les heuristiques de pensée décentralisée émergent quand les élèves construisent des modèles [T] [Resnick 1996]. Contraintes de sécurité : l'éditeur s'exécute dans un contexte isolé (Web Worker, sans réseau, avec quota de pas et de temps); **le code modifié n'est jamais encodé dans l'URL** (sinon un lien partagé exécuterait du code étranger); le partage se fait par fichier exporté; tout résultat issu d'une règle modifiée porte automatiquement l'étiquette « Règle modifiée : hors des résultats reproduits » (*Hypothèse de l'auteur*). Pour les praticiens, « remplacer la règle par un appel LLM » se fait par **rejeu de journaux archivés** (cassettes du moteur), non par appel direct : aucune clé d'API n'est saisie dans une page publique et le non-déterminisme des appels ne contamine pas la page (voir [05-spec-simulation.md](05-spec-simulation.md) pour l'interface `decide`).
- **Cas limite du gain G.** Quand la référence égale le maximum (P_ref = P_max), G est indéfini; la page affiche « indéfini », jamais un nombre (dossier p8-individu-colonie, corrections).

### 4.6 Niveau Vérifier : lecture libre

Z9 affiche, pour chaque résultat confirmatoire : l'identifiant de la cible et son lien vers la fiche; le niveau d'accord visé et la marge d'équivalence ([04-protocole-reproduction.md](04-protocole-reproduction.md)); le verdict; le registre des déviations; la distribution complète sur N graines; un **balayage de paramètres en petits multiples** dont chaque cellule ouvre l'exécution correspondante (échelle d'abstraction, monter et redescendre [T] [Victor 2011b]); le manifeste de run (version du moteur, graine, empreinte); l'export des paramètres et des résultats; le lien vers le code, la note et les références, avec le statut de chacune. Un panneau « multivers » parcourt les balayages précalculés (graine, paramètre, ordre de mise à jour) pour montrer la robustesse; hors de la grille précalculée, il renvoie à Explorer (idée d'[S] [Dragicevic et al. 2019]; *Hypothèse de l'auteur*). Les valeurs marquées [à confirmer] dans les fiches restent marquées à l'écran.

### 4.7 Carte agentique : dès le niveau 1

Une seule ligne au niveau Voir, la carte en relations à Explorer, le tableau complet à Vérifier. Format d'une ligne : **relation conservée / où l'analogie casse / statut épistémique / source**. On aligne des relations, non des termes. Règles : pas de ligne « Délégation » côté recrutement (la délégation décrit l'orchestration; elle n'apparaît qu'en contre-exemple); la fourmi a un signal de freinage (phéromone « no entry » de *Monomorium pharaonis* [Robinson et al. 2005]); aucune flèche fourmi → abeille → agent. L'**arbre sans échelle** montre fourmis et Apoidea comme groupes frères [R] [Johnson et al. 2013], pour éviter la lecture en échelle de progrès [R] [Omland et al. 2008]; le « signal plus riche » est une dimension de conception, non un échelon. Chaque carte est à valider par un myrmécologue, un apidologue et un praticien de l'agentique (audit vulgarisation, M1). **Le contenu des lignes est celui de la table de correspondance révisée de [06-metriques-et-typologie.md](06-metriques-et-typologie.md)** (colonnes « Où l'analogie casse » et « Statut »); V0 n'en fixe que le format et l'affichage. Les trois lignes ci-dessous illustrent le format (contenu à valider, *Analogie* sauf mention) :

| Relation conservée | Fourmi | Abeille | Agent | Où l'analogie casse |
|---|---|---|---|---|
| rétroaction positive proportionnelle au succès | dépôt de piste proportionnel au flux | recrutement proportionnel à la qualité perçue | annonce sur un canal partagé, auto-sélection | la suiveuse de danse tire une danseuse au hasard : ce n'est pas un pub/sub |
| freinage local | « no entry »; inhibition par encombrement | signal d'arrêt (inhibition, non veto) | limiteur de débit (backpressure) | le freinage par simple absence de signal n'est pas général : des fourmis freinent activement |
| oubli | évaporation | abandon; attrition des danses | expiration de messages ou purge de l'état partagé | trois formes distinctes; l'attrition des danses n'est pas le mécanisme général |

### 4.8 Distribution sur N graines

- **Forme.** Un résultat unique : nuage statique des N exécutions avec l'exécution courante marquée. Deux ou trois résultats : nuage statique, avec en option les tirages animés (« hypothetical outcome plots », HOP) pour comparer. **Pas de HOP seul pour une quantité unique à forte variance** : les HOP y donnent plus d'erreurs que barres d'erreur et violons [T partiel] [Hullman et al. 2015]; ils aident à juger une tendance [R] [Kale et al. 2019].
- **Calcul.** Voir et Vérifier lisent des résumés précalculés par le moteur headless; Explorer calcule dans le navigateur pour les paramètres modifiés, avec un compteur « n sur N » et l'étiquette « calcul navigateur, non confirmatoire ». N est le N préenregistré du résumé précalculé ([05-spec-simulation.md](05-spec-simulation.md)); la page n'affiche jamais moins que ce N sous l'étiquette *Résultat reproduit*.
- **Agents LLM.** Chaque cellule affiche la distribution **et** le coût avec intervalle, non le seul taux de réussite [R] [Miller 2024] [Kapoor et al. 2024]. Les paliers sont nommés « petit, moyen, grand modèle »; les identifiants exacts et la date figurent dans Vérifier et dans la note (à revérifier avant exécution, cadre, réserves; [Anthropic 2026b]).

### 4.9 Graine et état dans l'URL

Format (exemple de forme, valeurs symboliques) : `#p=<page>&niv=<voir|explorer|verifier>&esp=<fourmi|abeille|agent>&graine=<entier>&N=<entier>&v=<version>&par=<nom>:<valeur>,…`

1. **Fragment, non requête** : il n'est pas envoyé au serveur et fonctionne sur un hébergement statique.
2. **Liste blanche** tirée du manifeste du scénario (noms, types, bornes). Clé inconnue ou valeur hors bornes : ignorée, avec message `role="status"`.
3. **Ni code, ni texte libre, ni donnée personnelle** dans l'URL (une URL partagée est un vecteur d'injection et de fuite).
4. **Version** : si `v` diffère de la version du moteur chargé, bandeau « calculé avec une autre version; les résultats peuvent différer ».
5. **Graine absente** : graine typique du scénario. **Graine invalide** : retour à la graine typique, avec message.
6. **Historique** : `replaceState` pendant le glissement d'un curseur, `pushState` au changement de niveau [I].
7. **Fidélité du rejeu** : même version du moteur et même graine redonnent la même trajectoire dans un même navigateur; l'identité bit à bit entre navigateurs n'est pas garantie (précision de fonctions `Math` dépendante de l'implantation, audit méthodologie, C7). Les résultats de référence viennent du moteur headless; la page rejoue des traces pour les graines publiées.
8. Bouton « Copier le lien »; critère TV0.15.

### 4.10 Disposition, échelles et mobile

Fourmi à gauche ou en haut, abeille à droite ou en bas, carte agentique dessous (audit vulgarisation, §3.4). Chaque panneau a sa barre d'échelle et son horloge : un cadre et un chronomètre communs feraient croire que les deux espèces opèrent aux mêmes distances et durées (audit M7). Les résultats se superposent sur un axe commun normalisé; deux graphes aux axes indépendants côte à côte ne servent pas à comparer (tout dispositif de comparaison combine juxtaposition, superposition et encodage explicite [R] [Gleicher et al. 2011]; la position sur une échelle commune est jugée le plus précisément [S] [Cleveland et McGill 1984]). À 320 px CSS, l'écran partagé est remplacé par un **sélecteur fourmi/abeille à état synchronisé**; le critère de reflow exempte les contenus exigeant une disposition à deux dimensions, mais l'alternative textuelle reste obligatoire [T] [W3C 2023]. Test à 375 × 812 [I]. Le nombre d'agents est plafonné selon l'appareil et la scène se met en pause hors écran ou onglet masqué (Page Visibility, Intersection Observer [T] [MDN s. d.]). Aucun raccourci à touche unique.

---

## 5. Statut épistémique : modèle d'affichage

Chaque énoncé et chaque graphe porte une étiquette de statut et une étiquette de régime. Les statuts sont affichés par une **forme et un texte**, en nuances neutres : jamais en couleur d'identité (fourmi, abeille, agent), pour ne pas confondre statut et taxon.

| Étiquette | Sens (cadre) | Forme (proposition) | Ce que l'affichage doit montrer |
|---|---|---|---|
| *Résultat reproduit* | modèle publié réimplanté, cible chiffrée atteinte selon le critère d'acceptation | carré plein | l'identifiant de la cible, le niveau d'accord, le verdict, les déviations; mention « réplication d'un modèle publié, non validation empirique » |
| *Modèle simplifié* | réduction ou abstraction à écarts documentés | carré à coin coupé | ce qui est omis ou fixé; en particulier le curseur leurre révélé |
| *Résultat publié (non reproduit)* | résultat d’une source, non encore reproduit par le programme (cadre 4.1, principe 7) | carré vide | la source et la raison : cible bloquée, non satisfaite ou pas encore exécutée |
| *Hypothèse de l'auteur* | énoncé non testé, ou règle modifiée par l'utilisateur | cercle pointillé | ce qui la réfuterait |
| *Analogie* | rapprochement fourmi, abeille, agent | double flèche | relation conservée et endroit où elle casse; si validée par les trois experts |

Régime : « confirmatoire » (runs préenregistrés, Vérifier seulement) ou « exploratoire » (tout le reste). Marques de réserve affichées telles quelles : « valeur à confirmer », « référence non vérifiée ». Une valeur issue d'une source marquée [à confirmer] dans le dossier ne s'affiche jamais sans cette marque.

**Contrôle automatique.** Chaque bloc d'énoncé et chaque `<figure>` porte `data-statut="reproduit|publie|simplifie|hypothese|analogie"` et `data-regime="confirmatoire|exploratoire"`; le harnais refuse la version si un bloc en manque (TV0.13).

**Lien avec le texte.** « Résultat reproduit » ne s'emploie que si la fiche de reproduction a un verdict acquis; une cible en échec ou bloquée s'affiche « non reproduit » ou « bloqué » avec la raison. Une extension agentique qui n'a pas de référence publiée s'affiche *Hypothèse de l'auteur*.

---

## 6. Charte graphique

### 6.1 Couleurs d'identité

Fourmi vermillon, abeille bleu, agent pourpre, tirés de la palette Okabe-Ito (codes confirmés par la figure 16 de la page d'origine, RVB concordants [R] [Okabe et Ito 2002]). Contrastes calculés avec la formule WCAG et le seuil sRGB 0,04045 [T] [W3C 2023] [I] :

| Identité | Code | Contraste sur blanc | Contraste sur #121212 | Texte à 4,5:1 sur blanc |
|---|---|---|---|---|
| fourmi | #D55E00 | 3,87 | 4,84 | non |
| abeille | #0072B2 | 5,19 | 3,61 | oui |
| agent | #CC79A7 | 3,06 | 6,12 | non |

- **Marques graphiques** (traits, remplissages, pictogrammes) : au moins 3:1 sur fond clair **et** sombre (WCAG 1.4.11). Les trois passent; la marge la plus faible est agent sur blanc (0,06). Toute modification d'opacité, de lissage ou d'état de survol est retestée (R106).
- **Aucune couleur d'identité en couleur de texte** : fourmi et agent échouent sur blanc, abeille échoue sur #121212. Le texte est neutre (TV0.2).
- **À éviter comme trait sur blanc** : l'orange #E69F00 (2,25:1) et le jaune #F0E442 (1,32:1) échouent le seuil de 3:1. Les catégories supplémentaires (castes, tâches de P3) se distinguent d'abord par la forme ou la lettre, puis par une couleur Okabe-Ito en remplissage à contour neutre.
- **Lacune du dossier.** Le contraste des couleurs d'identité contre les extrémités des rampes continues (voir plus bas) n'est calculé que contre le blanc et #121212. À ajouter au harnais (TV0.1); en attendant, les glyphes portent un contour neutre.

### 6.2 Distinguabilité sous dichromatie

Simulation de Machado et al. 2009 (sévérité 1,0, RGB linéaire) [T] [Machado et al. 2009]; distance CIEDE2000, implantation reproduisant deux paires du jeu de test publié à 4 décimales [I] [Sharma et al. 2005] :

| Paire | ΔE2000 normal | protanopie | déutéranopie | tritanopie |
|---|---|---|---|---|
| fourmi–abeille | 49,6 | 50,0 | 56,6 | 65,7 |
| fourmi–agent | 37,0 | 40,9 | 34,0 | 13,9 |
| abeille–agent | 41,1 | **12,2** | 25,2 | 56,2 |

Seuil provisoire : ΔE2000 ≥ 10 [I], à confirmer par épreuve visuelle (EV0.6). Le minimum (12,2) est du même ordre que la paire jugée fragile, vermillon contre orange en déutéranopie (12,5) [I] : le **doublage non chromatique est obligatoire**, non conseillé. Prévalence de la déficience rouge-vert : environ 8 % des hommes et 0,5 % des femmes dans le monde [T] [Crameri et al. 2020]; 8 %, 5 % et 4 % des hommes caucasiens, asiatiques et africains selon [R] [Okabe et Ito 2002].

### 6.3 Pictogrammes et doublage

Chaque couleur est toujours doublée d'un pictogramme, d'une étiquette textuelle et, dans les graphes, d'un marqueur et d'un type de trait (WCAG 1.4.1 [T] [W3C 2023]). Proposition de conception [Hypothèse de l'auteur], à tester (TV0.3, EV0.3, EV0.6) :

| Identité | Pictogramme (sans visage) | Marqueur de série | Trait |
|---|---|---|---|
| fourmi | silhouette de profil à trois segments | cercle | plein |
| abeille | silhouette à ailes et abdomen rayé | carré | tirets |
| agent | carré arrondi avec flèche d'entrée et de sortie (observation, action) | triangle | pointillé |

Au niveau Voir, silhouettes sans visage ni yeux expressifs; à Explorer et Vérifier, points ou flèches, avec une transition explicite (audit vulgarisation, m9). **Visage ou silhouette : on teste, on ne suppose pas.** Les preuves sont partagées : le design émotionnel améliore rétention et compréhension (g⁺ de 0,29 à 0,35 [R] [Wong et Adesope 2021]), de même que l'anthropomorphisme facial (de 0,28 à 0,46 [R] [Liu et Su 2024]); un texte anthropomorphe ne dégrade pas la compréhension [R] [McGellin et al. 2021]; en sens inverse, des explications téléologiques injustifiées sont plus souvent acceptées sous contrainte de temps [R] [Kelemen et Rosset 2009], ce qui menace la lecture rapide du grand public [I]. D'où HV0.4.

### 6.4 Palettes continues

Phéromone, soutien, température et autres grandeurs continues : **viridis par défaut**; **cividis** en mode « daltonisme », optimisée pour la déutéranomalie et jugée proche de l'optimale pour la protanomalie et la tritanomalie [T] [Nuñez et al. 2018] (ne pas la présenter comme inadaptée à la tritanopie). Interdits : l'arc-en-ciel et le rouge-vert à luminosité semblable; autres cartes admises : magma, plasma, inferno, batlow, CMOcean [R] [Crameri et al. 2020]. La rampe doit rester lisible en niveaux de gris (audit vulgarisation, M5). La phéromone n'emploie pas le vermillon, pour ne pas la confondre avec la fourmi.

### 6.5 Typographie

- Pile système sans empattement, ou police auto-hébergée : **aucune requête vers un service de polices tiers** (TV0.12).
- Tailles en unités relatives, pour respecter le zoom et le reflow à 320 px CSS (TV0.4).
- Texte courant neutre à 4,5:1 au moins (TV0.2). Valeurs en chiffres tabulaires, avec leur unité. Noms de taxons en italique (binomial), avec l'attribut de langue approprié.
- Aucun texte en image; tout texte dessiné dans le canevas est doublé dans le DOM.
- Étiquettes d'axes complètes (grandeur, unité); jamais « série 1 ».
- Langue de la page et des passages en anglais déclarées (critères 3.1.1 et 3.1.2 de WCAG 2.2 [I; non extraits par le dossier, à vérifier dans [W3C 2023]]).

### 6.6 Animation et mouvement

- Rien ne démarre seul : la scène démarre à l'action « Lancer ».
- Pause, arrêt et pas-à-pas toujours visibles. Tout mouvement automatique de plus de 5 s présenté en parallèle offre pause, arrêt ou masquage (2.2.2, niveau A [T] [W3C 2023]); aucune mise à jour automatique sans contrôle de fréquence.
- `prefers-reduced-motion: reduce` (disponible partout depuis janvier 2020 [T] [MDN s. d.]) : aucune animation automatique, la scène cède la place au jumeau statique, les transitions sont instantanées, le pas-à-pas manuel reste. Ce critère relève de 2.3.3, de niveau **AAA** : c'est une bonne pratique retenue, non une exigence du niveau AA; le niveau AA exige 2.2.2, 2.5.7, 2.5.8, 1.4.10, 1.4.11 et 2.4.11 [T] [W3C 2023].
- Pas plus de trois flashs par seconde (2.3.1).
- Pause automatique hors écran et onglet masqué.
- Rythme contrôlé par la personne (pause, pas-à-pas, ralenti) (audit vulgarisation, M6).

---

## 7. Lexique contrôlé et garde-fous (anthropomorphisme, téléologie)

### 7.1 Portée de la règle

Ce qui est robuste côté conceptions erronées, c'est l'attribution **causale** à un agent de contrôle ou à un but : le « chef » ou le « germe » [T] [Resnick 1996], les agents de contrôle intentionnels [R] [Chi et al. 2012], la téléologie injustifiée sous contrainte de temps [R] [Kelemen et Rosset 2009]. En revanche, accepter une formulation anthropomorphe n'implique pas raisonner de façon anthropomorphe (28 élèves [R] [Tamir et Zohar 1991]) et un texte anthropomorphe ne change pas la compréhension (174 adultes [R] [McGellin et al. 2021]). Lecture opératoire du garde-fou du cadre (« pas d'anthropomorphisme ni de téléologie ») :

1. **Dans l'explication causale** : ni agent de contrôle, ni finalité (« pour que la colonie… »). Une fonction sélective peut être énoncée comme telle (« cette règle est retenue par la sélection parce que… »), avec le statut *Hypothèse de l'auteur*.
2. **Métaphore** admise si elle est étiquetée et définie au glossaire ([10-glossaire.md](10-glossaire.md)).
3. **L'effet est mesuré** par items (OA-T.1, items « La colonie veut… »), non présumé.

### 7.2 Lexique contrôlé du programme

C'est le lexique complet auquel renvoie [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md). Les termes définis sont dans [10-glossaire.md](10-glossaire.md). **Les homonymies de la liste fermée de [06-metriques-et-typologie.md](06-metriques-et-typologie.md)** (chorégraphie, orchestration, essaim, stigmergie, signal, quorum, consensus, inhibition, mémoire, oubli, persistance, richesse, diversité, indépendance, gain, émergence, file d'attente, réplication, déterministe, budget, agent) s'appliquent à toutes les pages : un terme homonyme est qualifié, jamais employé seul pour une colonie ou un agent, et sa règle d'emploi est celle de 06.

| À éviter seul | Formulation mécaniste | Métaphore permise, avec étiquette |
|---|---|---|
| La reine commande, ne commande pas | Les tâches et les déplacements émergent de règles locales et de signaux partagés; la reine signale sa présence et sa fécondité | aucune. « La reine ne commande pas » n'apparaît jamais seul : toujours avec le mécanisme positif et la précision sur la reproduction. « La reine donne les ordres » n'apparaît que comme mythe cité une fois, dans l'encart |
| La colonie décide, veut, choisit | Le choix résulte d'un seuil de quorum atteint | « décision collective » (terme technique défini) |
| Chorégraphie, employé seul pour une colonie | « chorégraphie spécifiée » (plan global explicite) ou « coordination émergente » | aucune |
| Essaim, swarm, employé seul | « essaim d'abeilles » ou « intelligence en essaim » | aucune |
| Consensus, employé seul | agrégation à seuil, accord ou convergence de débat | aucune |
| La colonie est plus intelligente (en général) | La colonie surpasse l'individu pour telle tâche, à tel budget, selon la difficulté | aucune |
| Les abeilles débattent, votent | Les éclaireuses recrutent proportionnellement à la qualité perçue; les signaux d'arrêt inhibent les recrutements concurrents | « démocratie » [Seeley 2010], entre guillemets, avec ses limites |
| Le signal d'arrêt est un veto | Le signal d'arrêt est une inhibition | aucune |
| La fourmi enseigne | Course en tandem : la meneuse règle son allure sur le contact de la suiveuse | aucune |
| La fourmi sait, calcule, compte, choisit le plus court | La fourmi suit une règle locale : sa probabilité de tourner dépend des signaux qu'elle perçoit | aucune |
| Chef, meneur, leader | individu informé; guide transitoire | aucune |
| Cerveau collectif, mémoire de la colonie | état partagé persistant (piste, tableau noir) | « mémoire partagée » (terme technique défini) |
| Fourmis stupides; fourmi moins intelligente que l'abeille | règle locale efficace dans un environnement, mode d'échec dans un autre | aucune |
| Plus évolué, plus avancé, primitif | autre solution, autre compromis | aucune (arbre sans échelle) |
| Piste égale fourmi, danse égale abeille | le canal est une variable du modèle, non un attribut du taxon; nommer le taxon et le préréglage | aucune |
| Délégation (agentique) | annonce sur un canal partagé, puis auto-sélection | « délégation » réservée à l'orchestration, en contre-exemple |
| Les agents débattent; essaim d'agents | échange sur plusieurs tours, gain mesuré à budget égal en séparant vote et échange [Choi et al. 2025a]; description par composants [Sörensen 2015] | métaphore après la description, étiquetée |
| L'agent veut, sait, croit, pense | la politique de l'agent produit l'action *a* pour l'observation *o* | seulement étiquetée; mêmes pièges que pour les colonies [R] [Shanahan 2022] |
| Modèle « validé » (pour une réplication) | modèle reproduit; la réplication n'est pas une validation empirique | aucune |
| Noms de produits dans les visuels publics | palier de capacité (petit, moyen, grand modèle) | identifiants exacts et date dans Vérifier et dans la note |

### 7.3 Encart « Ce que fait vraiment la reine »

Structure : fait, avertissement, mythe cité **une seule fois**, explication de la faille, fait [T] [Lewandowsky et al. 2020] : le manuel juge rares les effets boomerang de familiarité, de surcharge et de vision du monde, déconseille de s'abstenir de corriger par crainte d'un boomerang, et juge une simple négation insuffisante. L'argument selon lequel nier un mythe l'installe (cadre, thèse reformulée) est donc affaibli par cette source; la reformulation positive du cadre reste justifiée par l'exactitude biologique, et la structure ci-dessous la met en œuvre. Emplacement : texte canonique unique, inclus par référence sur toute page où la question « qui commande ? » peut se poser (au minimum P1, P3, P5 et P8; la fiche P4 n'y ajoute aucune affirmation); sur P5, il ouvre le niveau Voir. L'item « Qui choisit le nouveau site de l'essaim ? » le mesure (HV0.2).

Ossature, **à faire valider par un myrmécologue et un apidologue** [Hypothèse de l'auteur] :

> **Fait.** Les déplacements et les choix de travail d'une colonie résultent de règles locales et de signaux partagés; aucun individu ne les coordonne depuis le centre pendant l'exécution.
> **Avertissement.** On entend souvent un mythe à ce sujet.
> **Mythe (une seule fois).** « La reine donne les ordres. »
> **Faille.** La reine signale sa présence et sa fécondité par des phéromones : cela règle la reproduction, non le choix d'une source de nourriture ni du site d'un nouveau nid. Chez l'abeille domestique, des composés de la reine ont été décrits à propos de la réponse de cour [S] [Slessor et al. 1988] (cinq composés : [à confirmer]). Chez d'autres espèces, des hydrocarbures de fécondité servent de signal, mais le caractère général de ce résultat est contesté [R] [Oystaeyen et al. 2014] [Amsalem et al. 2015].
> **Fait.** Ces choix émergent des interactions entre individus.

Portée : ce constat est borné aux colonies d'insectes. Il ne dit pas qu'un système d'agents doit se passer d'orchestrateur : cette question est QR3 du cadre (témoin orchestré).

### 7.4 Contrôle

Un fichier de motifs proscrits seuls (français et anglais, versionné) est vérifié à chaque version : « la reine commande », « la colonie veut », « plus évolué », « cerveau collectif », « débattent », les homonymies de 06 employées seules (chorégraphie, essaim, consensus, richesse, mémoire) et les formes équivalentes. TV0.13 : zéro occurrence hors contexte autorisé (blocs `data-mythe`, entrées du glossaire, citations de sources). Les motifs ne couvrent pas la téléologie implicite : une relecture humaine suit. Côté agents : l'architecture à orchestrateur central rejoue l'intuition « chef » de Resnick 1996 [I]; le lexique s'applique aux pages sur les agents, avec l'équivalent « L'agent veut… ».

---

## 8. Liste de contrôle d'accessibilité (WCAG 2.2 AA)

WCAG 2.2 : Recommandation du W3C du 5 octobre 2023, mise à jour le 12 décembre 2024; norme ISO/IEC 40500:2025 depuis le 21 octobre 2025 [T] [W3C 2023] [W3C 2025]. L'automatisation ne trouve qu'environ 57 % des problèmes en volume (étude de fournisseur [R] [Deque 2021]) : la liste manuelle est obligatoire, à chaque page et à chaque version (TV0.8).

| Critère | Niveau | Exigence pour V0 | Test | Critère V0 |
|---|---|---|---|---|
| 1.1.1 Contenu non textuel | A | contenu de repli du canevas, résumé textuel vivant | lecteur d'écran | TV0.7 |
| 1.3.1 Information et relations | A | tableau de données équivalent à chaque graphe | manuel + axe | TV0.8 |
| 1.3.4 Orientation | AA | aucune restriction d'orientation | manuel | TV0.4 |
| 1.4.1 Utilisation de la couleur | A | couleur doublée de pictogramme, étiquette, marqueur, trait | manuel + émulation | TV0.3 |
| 1.4.3 Contraste (minimum) | AA | texte 4,5:1; grand texte 3:1 | calcul | TV0.2 |
| 1.4.10 Reflow | AA | sans défilement bidimensionnel à 320 px CSS (vertical) ou 256 px (horizontal), soit 1 280 px à 400 % de zoom; l'exception pour les contenus à disposition bidimensionnelle vise le canevas, non les contrôles ni le texte [I] | manuel + règles | TV0.4 |
| 1.4.11 Contraste non textuel | AA | composants et objets graphiques à 3:1 au moins | calcul | TV0.1 |
| 2.1.1 Clavier | A | toute fonction au clavier, y compris la sélection d'un individu | clavier seul | TV0.7 |
| 2.2.2 Pause, arrêt, masquage | A | mouvement de plus de 5 s : pause, arrêt ou masquage | émulation | TV0.6 |
| 2.3.1 Trois flashs | A | au plus 3 flashs par seconde | revue | TV0.6 |
| 2.3.3 Animation issue des interactions | AAA, souhaité | `prefers-reduced-motion` | émulation à deux états | TV0.6 |
| 2.4.11 Focus non masqué (minimum) | AA | le composant focalisé n'est pas masqué par du contenu de l'auteur | clavier seul | TV0.7 |
| 2.5.7 Mouvements de glissement | AA | déplacer une source ou un site : alternative par clic ou clavier; curseurs : clic sur la piste | manuel | TV0.7 |
| 2.5.8 Taille de cible (minimum) | AA | au moins 24 × 24 px CSS, sauf exceptions documentées | mesure du DOM | TV0.5 |
| 4.1.2 Nom, rôle, valeur | A | curseurs natifs étiquetés, avec valeur et unité | axe + lecteur d'écran | TV0.8 |
| 4.1.3 Messages d'état | AA | `role="status"`, débit limité, sans prise de focus | lecteur d'écran | TV0.7 |

**Canevas.** Contenu de repli qui remplit essentiellement la même fonction que le bitmap; `drawFocusIfNeeded()` pour un focus visible; correspondance un-à-un entre régions interactives et zones focalisables du contenu de repli [T] [MDN s. d.]. **Tests** : clavier seul; NVDA ou VoiceOver; zoom à 400 %; émulation des déficiences visuelles; émulation de `prefers-reduced-motion` aux deux états; mobile à 375 × 812 [I]. **Précédent** : initiative d'accessibilité de PhET lancée en 2014 [R] [Perkins et Moore 2017]. **Hébergement public québécois** : si une page est hébergée par un organisme public, vérifier le standard SGQRI 008 3.0 (en vigueur le 2024-04-29 selon des tiers) [Québec 2024] [non vérifiée].

---

## 9. Version statique en petits multiples

Le **jumeau statique** est une page HTML sans JavaScript, **générée** par le moteur headless (jamais dessinée à la main), qui reprend la page en petits multiples. Quatre usages : (1) mode mouvement réduit; (2) affiches, notes de recherche, matériel de classe et impression (audit vulgarisation, m12); (3) **condition témoin** de l'évaluation; (4) lecture sans JavaScript et copie d'archive.

Contenu : les instants clés (au minimum l'état initial, la perturbation et l'état final) en panneaux de même échelle et mêmes axes; la distribution sur N graines; **le même texte** que la page interactive; le même texte alternatif; les mêmes étiquettes de statut; la graine et la version dans la légende. La seule différence entre les deux versions est l'absence d'interactivité et de prédiction; EV0.4 sépare les deux.

Appui : l'animation est la forme la moins efficace pour l'analyse, les petits multiples sont plus exacts et plus rapides pour l'analyse [R] [Robertson et al. 2008]; les petits multiples relèvent des principes de [M] [Tufte 1983] [Tufte 1990] (définition non lue dans les livres). Condition de validité de la comparaison : à contenu équivalent, car l'inéquivalence de contenu est la faille des comparaisons animation contre statique [S] [Tversky et al. 2002]. Critère : TV0.17.

---

## 10. Protocole d'évaluation pédagogique

### 10.1 Régime et hypothèses

HV0.1 à HV0.4 sont **confirmatoires** : préenregistrées sur OSF avant la collecte (version horodatée, en lecture seule [OSF 2026]). Tout le reste est exploratoire et étiqueté. Les hypothèses sont directionnelles, avec taille d'effet minimale d'intérêt et critère de réfutation (cadre, questions de recherche).

| ID | Hypothèse | Test et taille minimale | Succès | Réfutation |
|---|---|---|---|---|
| HV0.1 | À contenu textuel identique, la page interactive avec phase de prédiction (Voir et Explorer) améliore, au post-test immédiat, le score aux items de conceptions erronées par rapport à la version statique | ANCOVA, post ~ pré + condition; d ajusté ≥ 0,30 [I] | estimation ≥ 0,30 et borne inférieure de l'IC95 > 0 | borne supérieure de l'IC95 < 0,30 |
| HV0.2 | Sur l'item « Qui choisit le nouveau site de l'essaim ? » (parcours P5, avec l'encart), la proportion de bonnes réponses passe de 0,30 à au moins 0,50 [I; point de départ supposé] | test de deux proportions; 93 par groupe | différence ≥ 0,20 et borne inférieure de l'IC95 > 0 [I] | borne supérieure de l'IC95 < 0,20 [I] |
| HV0.3 | L'effet de HV0.1 persiste au post-test différé (2 à 4 semaines) | même modèle que HV0.1; intention de traiter; attrition rapportée | même règle que HV0.1 [I] | même règle que HV0.1 [I] |
| HV0.4 | Le pictogramme à visage augmente, par rapport à la silhouette sans visage, la proportion d'attributions causales à un agent de contrôle sur l'item « Qui décide ? » (preuves partagées, voir « Pictogrammes et doublage ») | test de deux proportions; différence minimale 0,20 [I]; 93 par groupe pour 0,30 → 0,50, à ajuster au pilote | différence ≥ 0,20, IC95 > 0 [I] | borne supérieure de l'IC95 < 0,20 [I] |

Toutes quatre ont le statut *Hypothèse de l'auteur* : aucune étude n'a comparé un explorable guidé à un équivalent statique; la transposition depuis les animations et les simulations est une inférence (dossier x-vulgarisation).

### 10.2 Plan

- **Participants.** Adultes d'abord : étudiants en classe pour HV0.1 et HV0.3 (parcours P1), grand public adulte pour HV0.2 et HV0.4 (parcours P5 et P1). L'inclusion de mineurs de 14 ans et plus est une question au CER, non une décision de V0 (voir « Éthique et vie privée »).
- **Assignation.** Aléatoire **au sein** des classes quand c'est possible (le coefficient de corrélation intra-classe n'agit plus); sinon par classe, avec analyse multiniveau et facteur de plan (voir « Tailles d'échantillon »).
- **Séquence.** Pré-test; exposition à la version assignée pendant la durée cible du public; post-test immédiat; post-test différé à 2 à 4 semaines.
- **Conditions.** A : page interactive avec prédiction. B : jumeau statique, texte identique, sans interactivité ni prédiction (**condition témoin**). Options exploratoires : C, sans phase de prédiction (EV0.4); D, modèle NetLogo existant comme témoin actif (EV0.7).
- **Insu.** Les personnes qui codent les justifications ignorent la condition [I].
- **Analyse** en intention de traiter; règles d'exclusion préenregistrées; rapport de l'attrition.
- **Instrument** : les items s'usent s'ils sont publiés; l'instrument est publié après la fin des collectes ([08-science-ouverte-ethique.md](08-science-ouverte-ethique.md)).

### 10.3 Analyses

- **Primaire : ANCOVA**, post ~ pré + condition, d ajusté. Raison : le gain normalisé est biaisé en faveur des prétests élevés (r(g, d) = 0,75; d, moyenne et écart-type du prétest expliquent 92 % de la variance de g [T] [Nissen et al. 2018]). Cet article recommande d et des analyses des post-tests individuels qui contrôlent le prétest; **il n'emploie pas le mot ANCOVA : le choix de l'ANCOVA est une proposition de V0 [I]**. La réplique voit dans ce biais l'effet de variables omises [R] [Coletta et Steinert 2020].
- **Secondaire : gain normalisé de classe** ⟨g⟩ = (post − pré) / (100 − pré), calculé sur les moyennes de classe [T] [Hake 2002], avec intervalle par rééchantillonnage (2 000 tirages au moins). La moyenne des g individuels diffère de ce calcul [R] [Bao 2006]. **Aucun seuil d'acceptation** : les repères de Hake (0,23 en cours traditionnels, 0,48 en cours interactifs) viennent d'un inventaire de mécanique et ne se transposent pas à la coordination décentralisée [T] [Hake 1998].
- **Tertiaire** : proportions de bonnes réponses sur les items de conceptions erronées; instrument de [Khodr et al. 2022] par concept, sans seuil.
- **Multiplicité.** La famille d'hypothèses est celle d'un même préenregistrement. Confirmatoire : Holm à α = 0,05. Exploratoire : Benjamini-Hochberg à q = 0,10, ou rien, mais étiqueté (valeurs recommandées par le dossier x-methodes [I]) [Holm 1979] [Benjamini et Hochberg 1995].
- **Parcours des phases 2 et 3.** Pré-test et post-test sans témoin, **exploratoire** : il ne sépare pas l'effet de la page de celui du prétest. Tailles : 90, 34 ou 15 sujets pour un d intra-sujet de 0,3, 0,5 ou 0,8 [I].

### 10.4 Tailles d'effet publiées utiles à la planification

| Source | Contraste | Valeur | Lu |
|---|---|---|---|
| [Berney et Bétrancourt 2016] | animation contre graphique fixe | g = 0,226 (IC95 0,12 à 0,33); 61 études, N = 7 036; I² = 78,38 % | R/T |
| [Höffler et Leutner 2007] | animation contre image fixe | d = 0,37 (IC95 0,25 à 0,49); 26 études | R |
| [Lazonder et Harmsen 2016] | guidage, résultats d'apprentissage | 0,50 (IC95 0,37 à 0,62); 72 études | T |
| [Alfieri et al. 2011] | découverte non assistée; guidée | −0,38 [R]; 0,50 [S; à confirmer] | R/S |
| [Koyunlu Ünlü 2024] | prédire, observer, expliquer | g = 0,979 (IC95 0,771 à 1,188); 35 études dont 6 thèses | R |
| [Kraft 2020] | essais randomisés d'éducation | médiane 0,10 écart-type (747 essais); 0,24 pour 100 sujets ou moins, 0,03 pour plus de 2 000; mesures étroites 0,17, larges 0,10; repères : moins de 0,05 petit, 0,05 à moins de 0,20 moyen, 0,20 et plus grand | T (version de travail d'août 2019; pagination publiée [à confirmer]) |

Lecture [I] : (a) l'hétérogénéité est forte (I² de 78 %) : 0,226 est une moyenne de contextes disparates, non un effet attendu; (b) les items de conceptions erronées sont des mesures étroites, conçues par le chercheur, qui donnent des effets plus élevés que des mesures larges; (c) 0,979 est à traiter comme **borne haute** (qualité et biais de publication non détaillés dans le résumé lu); (d) aucune étude ne compare un explorable guidé à un équivalent statique. D'où l'effet minimal d'intérêt de 0,30 [I] : **ne pas fonder la puissance sur g = 0,226 seul.**

### 10.5 Tailles d'échantillon (α = 0,05 bilatéral)

Par bras, deux groupes, d standardisé [I; script du dossier, section `taille`] :

| d | puissance 80 % | puissance 90 % | ANCOVA, ρ = 0,5 | ANCOVA, ρ = 0,7 |
|---|---|---|---|---|
| 0,20 | 394 | 527 | 296 | 201 |
| 0,226 | 309 | 413 | 232 | 158 |
| 0,30 | 176 | 235 | 132 | 90 |
| 0,37 | 116 | 155 | 87 | 59 |
| 0,50 | 64 | 86 | 48 | 33 |
| 0,80 | 26 | 34 | 20 | 13 |

- **Cible de HV0.1 : 132 par bras** (d = 0,30, ANCOVA, ρ = 0,5, puissance 0,80); **188 à recruter par bras** avec 30 % d'attrition au post-test différé [I].
- À recruter par bras avec 30 % d'attrition (ANCOVA, ρ = 0,5) : 331 pour d = 0,226; 124 pour 0,37; 69 pour 0,50 [I].
- **Classes de 25** (si l'assignation ne se fait pas au sein des classes) : facteur de plan 2,20, 3,40 et 5,80 pour des corrélations intra-classe de 0,05, 0,10 et 0,20; avec d = 0,37 (ANCOVA, ρ = 0,5) : 8, 12 et 21 classes par bras [I]. Ces corrélations sont des **hypothèses de planification** : [Hedges et Hedberg 2007] en compile pour l'éducation, mais le PDF était illisible, valeurs non lues [M].
- Items de proportion (HV0.2, HV0.4) : 0,30 → 0,50 : 93 par groupe; 0,30 → 0,60 : 42; 0,40 → 0,60 : 97; 0,20 → 0,50 : 39 [I].
- Hypothèses : ρ de 0,5 à 0,7 entre prétest et post-test, attrition de 30 %, puissance de 0,80, toutes [I] à ajuster au pilote (EV0.1).

### 10.6 Entrevues à voix haute

Méthode de PhET [T] [Adams et al. 2008c] (plus de 200 entrevues, 89 étudiants, 52 simulations sur 60; 4 à 6 étudiants par simulation).

- **Effectif.** Six entrevues par public et par parcours; on s'arrête quand deux entrevues consécutives ne révèlent aucun problème majeur nouveau, sinon on en ajoute deux (TV0.9). Le dossier x-vulgarisation écrit « par public et par page »; avec les catalogues des fiches (plusieurs dizaines de pages), l'application littérale n'est pas tenable. V0 l'applique donc par parcours, en répartissant les pages destinées à ce public entre les participants pour que chaque page soit vue au moins une fois, et en réservant des entrevues propres aux pages qui introduisent un patron d'interaction nouveau [I; décision du chercheur]. Avec six étudiants, les deux dernières entrevues ont très rarement apporté d'information d'interface nouvelle [T]. Selon le modèle 1 − (1 − L)ⁿ, six entrevues couvrent 85 % des problèmes si L = 0,31, mais il en faut douze si L = 0,15 [I] (formule rapportée par sources secondaires; L = 0,31 [à confirmer] [Nielsen et Landauer 1993] [Faulkner 2003]).
- **Deux modes.** (1) Questions de prédiction posées avant, révisées pendant ou après l'interaction; (2) exploration libre sans question.
- **Participants.** Personnes n'ayant pas reçu l'enseignement visé, genres à parts égales, minorités représentées, rendement varié. **Nouveaux volontaires à chaque série de révisions importantes** : l'interaction change après un premier contact.
- **Verbalisation concurrente** [R] [Ericsson et Simon 1980]; vidéo de toutes les entrevues (les gestes sur la simulation font partie de la communication); **résumés** par entrevue plutôt que transcriptions complètes.
- **Intervieweur** maîtrisant le contenu, de préférence au niveau de la maîtrise et avec expérience d'enseignement : les interprétations divergent sinon.
- **Codage.** Double codage de 20 % des entrevues; accord brut de 90 % au moins au premier passage, de 95 % après révision de la grille (valeur publiée : 95 % puis environ 100 %) (TV0.10).
- **Praticiens** : entrée directe par la carte et la Vue de l'agent, sans Voir.

### 10.7 Règles de décision

| Résultat | Action |
|---|---|
| HV0.1 ou HV0.2 supportée | gabarit inchangé pour la phase 2 |
| non concluante | la phase 2 procède; évaluation poursuivie (pré-post exploratoire; essai contrôlé si les ressources le permettent) |
| **réfutée** | **réviser le gabarit avant la phase 2** (par exemple, faire du jumeau statique le format principal et alléger Explorer); publier le résultat dans tous les cas |
| HV0.3 non supportée | afficher la mention « effet non durable mesuré »; réviser la conclusion de la page, non le gabarit |
| HV0.4 supportée ou non | silhouettes par défaut dans les deux cas; la décision sur les visages est réexaminée seulement si HV0.4 est réfutée **et** que le rappel s'améliore |

### 10.8 Expériences originales

| ID | Expérience | Statut | Teste ou prépare |
|---|---|---|---|
| EV0.1 | Pilote de planification : 30 à 60 participants par bras pour estimer écart-type, corrélation prétest-post-test, attrition et corrélation intra-classe; recalcul avec le script du dossier (section `taille`) | exploratoire | taille de HV0.1 à HV0.4 |
| EV0.2 | Essai contrôlé de la phase 1 (parcours P1 et P5) | confirmatoire | HV0.1, HV0.2, HV0.3 |
| EV0.3 | Test A/B silhouette contre visage sur l'item « Qui décide ? » | confirmatoire | HV0.4 |
| EV0.4 | Page interactive avec et sans phase de prédiction (pilote ciblé) : l'appui direct de la prédiction vient de visualisations de données, et la méta-analyse du cycle prédire-observer-expliquer est de qualité hétérogène [R] [Kim et al. 2017] [Koyunlu Ünlü 2024] | exploratoire | séparer prédiction et interactivité |
| EV0.5 | Écriture et validation de 3 à 4 items « qui décide ? » par entretiens cognitifs (3 novices, 3 experts) avant le prétest; l'instrument de [Khodr et al. 2022] n'a aucun scénario d'insectes | exploratoire | validité de l'instrument |
| EV0.6 | Épreuve visuelle de distinguabilité sous émulation avec au moins 3 relecteurs ayant une déficience réelle | exploratoire | TV0.3 |
| EV0.7 | Témoin actif : modèle NetLogo existant (*Ants* pour P1, *BeeSmart* pour P5), licence à respecter (voir « Ressources existantes ») | exploratoire | ce qu'apportent Vue de l'agent, étiquettes et Vérifier |
| EV0.8 | Adaptation de deux scénarios de l'instrument de systèmes complexes (décision de groupe sans chef; orchestrateur contre auto-sélection) pour mesurer le glissement « chef » chez les praticiens [I] | exploratoire, phase 3 | parcours P7 |

---

## 11. Éthique et vie privée

### 11.1 Ce qui exige l'avis d'un comité avant de commencer

**Aucune collecte, aucun pilote, aucune entrevue avant l'avis écrit du comité d'éthique de la recherche (CER) ou l'attestation d'exemption (TV0.11).** Les pilotes sont de la recherche : l'intention ou la capacité de publier n'est pas un critère (EPTC 2, art. 2.1 [T] [CRSH et al. 2018]).

| Activité | Avis requis avant de commencer | Base |
|---|---|---|
| Page publique sans collecte de données de participants | aucun avis du CER; Loi 25 si une collecte ou une analytique s'ajoute | art. 2.1 (pas de participants); Loi 25 |
| Pilote (EV0.1) | **oui** | art. 2.1, note sur les études pilotes |
| Essai contrôlé : pré-test, post-test, différé (EV0.2) | **oui**; consentement; recrutement par un enseignant : influence indue possible, crédits alternatifs si l'on refuse | art. 3.1 |
| Test A/B en ligne (EV0.3) | **oui** | art. 2.1 |
| Entrevues à voix haute de conception | **décision écrite du CER** : probablement oui si les résultats nourrissent une publication; l'exemption de l'art. 2.5 ne vaut que pour l'usage exclusivement interne d'amélioration, et les données destinées ensuite à la recherche sont une utilisation secondaire | art. 2.1 et 2.5 |
| Entretiens cognitifs de validation de l'instrument (EV0.5) | **oui** | art. 2.1 |
| Journal d'interactions (prédiction faite, curseurs touchés, durée) | **oui** et Loi 25 : peut constituer du profilage | art. 8.1 ou 65.0.1 de la Loi 25 |
| Réutilisation des données d'évaluation pour la recherche | **oui** (utilisation secondaire) | art. 2.5, note d'application |
| Participants de moins de 14 ans | hors du public de l'étude; le consentement relève du titulaire de l'autorité parentale | Loi 25, art. 14 |
| Mineurs de 14 ans et plus (public de 15 ans et plus, cégep) | **question au CER** | Loi 25, art. 14; [I] |
| Relecture du contenu par des experts (carte, encart) | à faire confirmer par le CER : relecture de contenu, sans collecte de données sur les experts [I] | — |

Dossier à déposer : plan et préenregistrement, instruments, formulaires de consentement, plan de recrutement, gestion des données, description de toute analytique. Déposer **tôt** : le délai du CER conditionne la date de P1 (R103). Le dossier x-vulgarisation signale aussi les art. 6.11 et 10.1 de l'EPTC 2 (phase exploratoire initiale : contacts préliminaires sans évaluation du CER, mais l'information recueillie ne peut servir à la recherche que si l'intention est déclarée et le consentement prévu) : **non lus dans cette synthèse [à confirmer]**, à examiner avant le dépôt.

### 11.2 EPTC 2 : articles retenus

| Article | Contenu pertinent [T] [CRSH et al. 2018] |
|---|---|
| 2.1 (note d'application) | La recherche est une démarche visant le développement des connaissances par une étude structurée ou une investigation systématique. Méthode et intention de publier ne sont pas des critères. Les études pilotes relèvent d'un CER. Les activités de recherche intégrées à un cours sont couvertes. |
| 2.5 | Les études d'amélioration de la qualité, l'évaluation de programmes et les examens d'un programme d'enseignement qui servent **exclusivement** à l'évaluation ou à l'amélioration ne sont pas de la recherche. Si les données sont ensuite destinées à la recherche : utilisation secondaire. |
| 3.1 | Consentement volontaire; retrait en tout temps, avec demande de retrait des données; influence indue quand le recruteur est en situation d'autorité; crédits alternatifs pour les refus. |

Édition 2018 lue en entier par le dossier (français); édition 2022 (publiée le 30 janvier 2023 [S]) : articles 2.1, 2.5 et 3.1 inchangés (lecture indépendante); numérotation des autres articles non comparée [à confirmer].

### 11.3 Loi 25 (Québec 2021, L.Q. 2021, c. 25) [T] [Québec 2021]

| Disposition | Exigence | Conséquence pour V0 |
|---|---|---|
| art. 8.1 (secteur privé), 65.0.1 (organismes publics) | informer au préalable de toute technologie d'identification, de localisation ou de profilage et des moyens de l'activer; le profilage est la collecte et l'utilisation de renseignements pour évaluer rendement, préférences, intérêts ou comportement | aucune analytique active par défaut; journal d'interactions dans l'étude seulement, avec consentement. La formule « désactivées par défaut » est celle de Québec.ca [R] [CAI s. d.], non du texte de loi |
| art. 9.1 | paramètres de confidentialité au plus haut niveau par défaut pour un produit ou service technologique offert au public; exception : témoins de connexion | aucun témoin; préférences d'affichage locales seulement |
| art. 14 | consentement manifeste, libre, éclairé, pour des fins précises; moins de 14 ans : titulaire de l'autorité parentale ou tuteur; 14 ans et plus : le mineur, le titulaire ou le tuteur | public de l'étude : adultes d'abord |
| art. 3.1 à 3.3 (secteur privé) | responsable de la protection des renseignements personnels (RPRP); politiques publiées; **évaluation des facteurs relatifs à la vie privée (EFVP)** pour tout projet de système d'information impliquant des renseignements personnels | EFVP si une collecte est en ligne; à demander au RPRP |
| art. 8.2 | politique de confidentialité en termes simples, publiée si la collecte est technologique | page « confidentialité » liée au pied de page |
| art. 21 et 21.0.1 | communication sans consentement à des fins de recherche si une EFVP conclut à cinq conditions; décision documentée d'un CER | non utilisée par défaut |

Sanctions : sanction administrative jusqu'à 50 000 $ (personne physique) ou 10 M$ ou 2 % du chiffre d'affaires mondial; amende pénale de 5 000 à 100 000 $ (personne physique) ou de 15 000 à 25 M$ ou 4 % du chiffre d'affaires mondial (autres cas) [T] [Québec 2021]. **Quelle loi s'applique à ces pages** (secteur privé, ou organisme public pour un établissement d'enseignement, art. 65.0.1) : question pour le RPRP de l'établissement [I].

### 11.4 Règles de conception retenues (TV0.12)

- Aucun témoin ni identifiant; préférences d'affichage (thème, mouvement réduit, langue) conservées localement seulement, avec repli si le stockage échoue.
- **Aucune requête tierce non déclarée**, vérifiée à chaque version par l'onglet Réseau du navigateur (polices, CDN, mesure d'audience compris). Une analytique agrégée, sans identifiant ni requête tierce, reste admise tant que TV0.12 est vrai.
- Aucune clé d'API saisie dans une page; aucun renseignement personnel dans l'URL.
- **Données de participants** : pseudonymisées, sur un stockage approuvé par le CER, jamais sur GitHub ni Zenodo, sans licence ouverte; durée de conservation fixée par le CER [à confirmer]. Instruments et analyses agrégées déposés après avis du CER (inventaire des objets de [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md)).
- **Repli** : si aucun CER n'est accessible, V0 se limite à des pages sans collecte, donc sans HV0.n ni EV0.n (R37).
- Aucune expérimentation animale (simulation pure) et cadrage de la recherche défensive de P6 (pas de charges réutilisables publiées) : voir [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md).

---

## 12. Critères d'acceptation de V0 (cibles TV0.n)

V0 ne reproduit aucun résultat; ses cibles sont des critères d'acceptation, vérifiés **à chaque version publiée** de chaque page. Correspondance avec le dossier x-vulgarisation (« Critères d'acceptation de V0 ») dans la dernière colonne. TV0.15 à TV0.17 sont créés ici [I].

| ID | Grandeur | Cible et règle de décision | Méthode | Dossier |
|---|---|---|---|---|
| TV0.1 | contraste des marques graphiques (1.4.11) | au moins 3:1 sur #FFFFFF **et** #121212 pour chaque couleur d'identité; tolérance 0; contre les extrémités des rampes continues aussi [I] | formule WCAG, seuil sRGB 0,04045 | VA1 |
| TV0.2 | contraste du texte (1.4.3) | au moins 4,5:1; aucune couleur d'identité en couleur de texte; 0 exception | idem | VA2 |
| TV0.3 | distinguabilité sous dichromatie | ΔE2000 d'au moins 10 pour chaque paire, sous protanopie, déutéranopie et tritanopie, **et** doublage par pictogramme ou motif; seuil provisoire [I]; minimum actuel 12,2 | script + épreuve avec au moins 3 relecteurs ayant une déficience réelle (EV0.6) | VA3 |
| TV0.4 | reflow | aucune perte de contenu ni de fonction à 320 × 256 px CSS et 400 % de zoom, hors canevas; 0 écart | manuel + règles automatiques | VA4 |
| TV0.5 | cibles | tout composant interactif d'au moins 24 × 24 px CSS ou exception documentée; 100 % des composants | script de mesure du DOM | VA5 |
| TV0.6 | mouvement | tout mouvement automatique de plus de 5 s offre pause, arrêt ou masquage; `prefers-reduced-motion: reduce` supprime les animations automatiques; 0 écart, aux deux états | émulation du navigateur | VA6 |
| TV0.7 | clavier et focus | 100 % des fonctions au clavier; focus visible et non masqué; alternative sans glisser; lecteur d'écran | manuel (clavier seul; NVDA ou VoiceOver) | VA7 |
| TV0.8 | règles automatisées | 0 violation WCAG 2.2 AA détectée par axe-core ou équivalent **et** liste manuelle complète cochée | outil + liste | VA8 |
| TV0.9 | problèmes d'utilisabilité | 6 entrevues par public et par **parcours** (adaptation : le dossier dit « par page », voir « Entrevues à voix haute »); une page au patron d'interaction inédit a ses propres entrevues; arrêt quand 2 entrevues consécutives ne révèlent aucun problème majeur nouveau, sinon 2 de plus; couverture visée d'au moins 85 % (6 entrevues si L = 0,31, 12 si L = 0,15 [I]) | voix haute, deux modes | VU1 |
| TV0.10 | fiabilité du codage | accord brut de 90 % au moins au premier double codage (20 % des entrevues), de 95 % après révision | deux codeurs | VU2 |
| TV0.11 | autorisation éthique | avis écrit du CER ou attestation d'exemption **avant** toute collecte, pilotes et entrevues compris; 100 % | dossier CER | VE1 |
| TV0.12 | analytique et témoins | aucune identification, localisation ni profilage actif par défaut; audit réseau sans requête tierce non déclarée; 0 écart par version | onglet Réseau | VE2 |
| TV0.13 | lexique et statut épistémique | 0 occurrence des formulations proscrites seules; étiquette de statut et de régime sur 100 % des énoncés et graphes | contrôle automatique + relecture | VC1 |
| TV0.14 | garde-fous de calcul | d(Hake) = 2,43 à ± 0,01; contrastes à ± 0,01; CIEDE2000 égale aux valeurs du jeu de test publié à 5·10⁻⁴; n(d = 0,5) = 64 | `x_vulgarisation_checks.py` | VC2 |
| TV0.15 | état dans l'URL | aller-retour état → URL → état identique pour 100 % des scénarios; clé inconnue ou hors bornes ignorée avec message; aucun code exécuté depuis l'URL | test automatisé | nouveau |
| TV0.16 | distribution toujours affichée | zone Z3 présente à chaque niveau dès qu'une exécution est montrée; G indéfini affiché « indéfini » | contrôle du DOM | nouveau |
| TV0.17 | jumeau statique | texte identique à la version interactive (hors consignes d'interaction), mêmes graines et mêmes étiquettes; lisible sans JavaScript | comparaison de chaînes + chargement sans script | nouveau |

Les critères d'effet du dossier passent dans le protocole : VL1 est HV0.1, VL2 est HV0.2, VL4 est HV0.3; VL3 (gain normalisé, secondaire) et VL5 (instrument de [Khodr et al. 2022], secondaire) sont décrits dans « Analyses ». Le harnais qui exécute TV0.1 à TV0.8 et TV0.12 à TV0.17 se place avec celui de S0 ([05-spec-simulation.md](05-spec-simulation.md)); la cohérence documentaire (liens, étiquettes, identifiants) est contrôlée par [verifier-docs.ts](../outils/verifier-docs.ts).

---

## 13. Ressources existantes et valeur ajoutée

| Ressource | Ce que la source dit | Limite | Usage dans le programme |
|---|---|---|---|
| NetLogo *Ants* [Wilensky 1997] | curseurs de population, d'évaporation et de diffusion; aucune espèce nommée; CC BY-NC-SA 3.0 [R] | pas de distribution sur N graines, pas de taxon | repère de validation croisée de P1; témoin actif possible (EV0.7); **ne pas reprendre le code** (clause non commerciale) |
| NetLogo *BeeSmart Hive Finding* [Guo et Wilensky 2014] | quorum réglable [R] | idem | repère de P5; témoin actif possible (EV0.7) |
| StarLogo [Resnick 1996] | trois projets d'élèves; cinq heuristiques de pensée décentralisée [T] | échantillon d'une douzaine d'élèves | fondement de Modifier la règle |
| PhET [Adams et al. 2008a] [Podolefsky et al. 2013] | méthode d'entrevue; étayage implicite; paramètres leurres | physique | méthode d'entrevue, étayage de Z4 |
| Explorables de Nicky Case [Case s. d.] | récits interactifs; aucune évaluation d'efficacité mentionnée [R] | pas de données | modèle narratif de Voir |
| Complexity Explorables [Complexity Explorables s. d.] | 11 explorables « comportement collectif », aucun sur les insectes sociaux [R] | — | confirme la lacune |
| Explorable Explanations et échelle d'abstraction [Victor 2011a] [Victor 2011b] | documents réactifs; monter et descendre entre niveaux [T] | aucune donnée d'efficacité | structure Explorer vers Vérifier |
| Articles interactifs et suspension de Distill [Hohman et al. 2020] [Distill 2021] | l'évaluation empirique est limitée [T]; l'effort de production est lourd | — | budget d'effort |
| Transformer Explainer [Cho et al. 2024] | 90 participants; niveaux d'abstraction | autre sujet | modèle de la Vue de l'agent pour P7 |
| Gordon [Gordon 2003] [Gordon 2010] | conférence TED; livre | — | lectures complémentaires |
| *Honeybee Democracy* [Seeley 2010] | vulgarisation de la décision collective de l'essaim | emploie la métaphore « démocratie » | lecture complémentaire; métaphore encadrée |
| Essai de vulgarisation portant déjà le slogan « la reine ne donne pas d'ordres », sans les abeilles (Bits & Quarks, 2026) | identifié par l'audit méthodologie (C10) | absent de la bibliographie | le slogan n'est pas original |

**Valeur ajoutée du programme** (dossier x-vulgarisation) : comparaison fourmi et abeille sur un noyau commun; Vue de l'agent; étiquetage épistémique; niveau Vérifier; pont agentique; évaluation mesurée. **Ce que le programme n'ajoute pas** : une simulation de fourragement de plus (audit vulgarisation, M13).

---

## 14. Budget d'heures de vulgarisation par page

Aucune source ne fournit de budget mesuré. Point de départ : l'audit estime « au moins 40 à 80 h par page complète, accessibilité et tests compris » [à confirmer; inférence de l'auditeur], pour une vue interactive à trois niveaux. Distill rapporte que ses éditeurs y passaient parfois plus de 50 h par article [à confirmer; lu par l'auditeur dans [Distill 2021], non repris au dossier], et produire un article interactif s'apparente plus à bâtir un site web qu'à écrire un billet [T] [Hohman et al. 2020].

Les fiches catalogue des dizaines de pages et les entrevues se font par parcours : le budget se compose donc de deux niveaux. **Toutes les heures sont des [estimation, à confirmer].**

| Poste | Heures [estimation, à confirmer] |
|---|---|
| **Par parcours (une fois)** | |
| Récit de Voir et questions de prédiction | 5 à 8 |
| Panneau Vérifier (cibles, tableaux, export, manifeste) | 4 à 8 |
| Textes en français, lexique, validation par experts | 4 à 8 |
| Entrevues à voix haute (6 par public) et codage | 6 à 12 |
| Audit manuel d'accessibilité du parcours | 3 à 5 |
| Version anglaise (relecture, lexique) | 2 à 4 |
| *Sous-total par parcours* | *24 à 45* |
| **Par page** | |
| Explorer : Vue de l'agent, Modifier la règle, défis | 10 à 18 |
| Graphes synchronisés et jumeau statique | 5 à 9 |
| Accessibilité de la page (alternative textuelle, tableau, clavier) | 3 à 5 |
| Textes et descriptions de la page | 2 à 4 |
| *Sous-total par page* | *20 à 36* |

**Formule : heures d'un parcours = 24 à 45, plus n pages × 20 à 36.** Pour un parcours à une seule page, on retrouve 44 à 81 h [estimation, à confirmer], soit la fourchette de l'audit. Une page à niveaux partiels coûte la part des lignes de ses niveaux : la formule donne alors une borne haute.

**Application aux catalogues des fiches** (nombre de pages à la date de rédaction, susceptible de changer; les pages de vérification de P3 ne sont pas comptées) :

| Parcours | Pages | Heures [estimation, à confirmer] |
|---|---|---|
| P1 | 8 | 184 à 333 |
| P2 | 9 | 204 à 369 |
| P3 | 10 | 224 à 405 |
| P4 | 6 | 144 à 261 |
| P5 | 11 | 244 à 441 |
| P6 | 8 | 184 à 333 |
| P8 | 13 | 284 à 513 |
| P9 | 15 | 324 à 585 |
| **Huit parcours** | **80** | **1 792 à 3 240** |

S0 et P7 s'ajoutent quand leur catalogue est arrêté. Ordre de grandeur : plusieurs milliers d'heures pour l'ensemble de la vulgarisation (calcul à partir du tableau). D'où la règle de séquence par phases et la priorité donnée aux pages de Voir et de Vérifier des cibles reproduites, avant les pages d'Explorer (R102).

**Hors budget** : le coût fixe de V0 (gabarit, bibliothèque de composants, charte, harnais), non réparti et à estimer après P1 [estimation, à confirmer]; l'évaluation (recrutement, analyses, CER), à estimer avec le pilote (EV0.1). P2 et les pages de construction de P9 sont conditionnelles. Les heures réelles de P1 recalibrent toutes les lignes.

---

## 15. Version anglaise et glossaire

- **Chaînes externalisées dès le départ** : catalogues français canadien et anglais; aucune chaîne en dur dans les composants, figures comprises. Chemins distincts par langue; les paramètres d'état dans le fragment sont identiques d'une langue à l'autre.
- **Ordre de traduction** : d'abord les pages dont le public principal est celui des praticiens (selon la règle d'attribution), qui lisent surtout l'anglais (audit vulgarisation, m2), puis les autres.
- **Le lexique contrôlé et ses motifs proscrits existent en deux langues** (par exemple, en anglais, « the queen commands », « the colony decides », « more evolved »); TV0.13 s'applique aux deux versions.
- **Terminologie** : danse frétillante, danse de trémulation, course en tandem, stigmergie et leurs équivalents à valider avec le Grand dictionnaire terminologique de l'OQLF [I; non consulté]. « Chorégraphie » est un faux ami : en services web et en types de session, c'est un plan global explicite; le glossaire renvoie à la typologie à trois axes du cadre.
- **Glossaire** : le contenu est tenu dans [10-glossaire.md](10-glossaire.md); V0 en fixe la présentation. Chaque terme est lié depuis le texte, avec une définition accessible au clavier et au lecteur d'écran (pas seulement au survol). Une entrée comporte : terme en français et en anglais, définition mécaniste en une phrase, **nature** (terme technique défini ou métaphore étiquetée), source, pages où il apparaît. Minimum : stigmergie, quorum, rétroaction positive et négative, seuil de réponse, inhibition croisée. Fil structurant : les cinq heuristiques de pensée décentralisée (rétroaction positive, hasard créateur d'ordre, niveaux, objets émergents, environnement actif) [T] [Resnick 1996].

---

## 16. Hébergement, archivage et publication

| Élément | Règle |
|---|---|
| Source de vérité | dépôt Git public; les pages sont des sorties de build; le jumeau statique est inclus dans chaque copie archivée |
| Hébergement | site statique public (GitHub Pages comme candidat [I]); HTTPS; aucune dépendance à un service tiers au chargement (TV0.12); pages utilisables sans JavaScript grâce au jumeau statique |
| Adresses | chemin par langue, par page et par version, plus un alias « version courante »; les anciennes versions restent accessibles; le paramètre `v` de l'URL d'état signale une version différente |
| Citation et DOI | une build archivée par projet; une *release* GitHub par version publiée, qui produit un DOI de version et un DOI de concept par Zenodo [GitHub et Zenodo 2026]; SWHID du répertoire de la version citée [SWH 2026]; `CITATION.cff` [CFF 2026]. **Tester le webhook Zenodo sur un dépôt jetable avant la première release** : un dépôt antérieur du chercheur a eu un webhook absent (réserve du dossier x-methodes) (R30 de [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md)) |
| Licences | propositions de [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md), décision du chercheur (code MIT; textes et figures CC BY 4.0); chaque page affiche sa licence, sa version et sa citation. Aucune reprise du code de NetLogo *Ants* ni de *BeeSmart* (clause non commerciale) |
| Artifacts claude.ai | privés par défaut, partagés par lien : prototypes seulement; ni référencement, ni diffusion grand public, ni archivage (audit vulgarisation, m10) |
| Données d'évaluation | hors du dépôt public; plateforme approuvée par le CER; préenregistrement OSF [OSF 2026] |
| Impression | le jumeau statique sert d'affiche, de figure de note et de PDF |
| Organisme public québécois | vérifier SGQRI 008 si la page y est hébergée [Québec 2024] [non vérifiée] |

---

## 17. Séquence, portes et risques

### 17.1 Portes

« Évaluée » veut dire : tous les critères TV0.n applicables passés **et** les résultats d'EV0.2 rapportés dans le registre préenregistré, quel qu'en soit le verdict.

| Porte | Avant | Condition |
|---|---|---|
| G0 | publication du premier parcours (P1) | gabarit implanté; TV0.1 à TV0.8 et TV0.12 à TV0.17 passés sur la page pilote; instrument validé (EV0.5); entrevues faites (TV0.9, TV0.10); avis du CER reçu (TV0.11); préenregistrement déposé; webhook Zenodo testé |
| G1 | première page de la phase 2 (parcours P3, P4, P6, P9 mouvement) | phase 1 (P1, P8, P5) publiée **et évaluée** (pilote EV0.1 fait; EV0.2 rapporté); décision selon « Règles de décision » |
| G2 | pages de la phase 3 (parcours P7, P2, P9 construction) | phase 2 publiée et évaluée (pré-post exploratoire, entrevues, TV0.n); P7 dépend en outre des résultats reproduits de P1, P3, P5 et P8, et P2 d'un go/no-go (cadre, dépendances) |

Une dérogation est consignée au registre des déviations avec sa raison ([09-feuille-de-route.md](09-feuille-de-route.md)); une page publiée avant son évaluation porte la mention « non évaluée » [I].

### 17.2 Risques

Plage R100 à R112 réservée à ce document, à fusionner dans le registre de [09-feuille-de-route.md](09-feuille-de-route.md). Déjà portés par [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md) et non répétés ici : R30 (Zenodo sans webhook), R36 et R37 (collecte sans avis du CER; aucun CER accessible), R39 (reprise de code sous licence non commerciale), R40 (valeur à confirmer propagée dans un manuscrit).

| ID | Risque | Preuve | Parade | Signal d'alerte |
|---|---|---|---|---|
| R100 | aucun effet mesurable de l'interactif sur le statique | aucune preuve d'efficacité propre aux explorables [T] [Victor 2011a] [Hohman et al. 2020]; effet d'animation faible et hétérogène (I² = 78 %) [Berney et Bétrancourt 2016] | évaluation préenregistrée; cas « réfutée » prévu (statique comme format principal) | borne supérieure de l'IC95 de HV0.1 sous 0,30 |
| R101 | échantillon visé (132 par bras; 188 à recruter) inatteignable | calcul [I] | assignation au sein des classes; pilote pour affiner ρ et l'attrition; à défaut, présenter une estimation avec intervalle plutôt qu'un test | recrutement très en deçà de la cible à mi-parcours |
| R102 | charge de production sous-estimée | suspension de Distill [T] [Distill 2021]; audit vulgarisation, M12 | gabarit et charte uniques; séquence par phases; recalibrage sur P1 | heures de P1 hors de la fourchette du budget |
| R103 | délai du CER ou loi applicable indéterminée retardant P1 (voir aussi R36 et R37) | dossier x-vulgarisation (questions ouvertes) | dépôt tôt; décision écrite sur les entrevues; question au RPRP; repli : pages sans collecte | pas de réponse avant la date prévue de P1 |
| R104 | l'encart installe le mythe | argument du cadre; affaibli par [T] [Lewandowsky et al. 2020] | structure fait, mythe une fois, faille, fait; mesure par HV0.2 | HV0.2 non supportée |
| R105 | dérive anthropomorphique ou téléologique (textes ajoutés, version anglaise) | [T] [Resnick 1996]; [R] [Chi et al. 2012]; [R] [Kelemen et Rosset 2009] | lexique FR et EN versionné; TV0.13; relecture humaine | occurrences détectées |
| R106 | contraste agent sur blanc à 0,06 de la limite | calcul du dossier (3,06 contre 3) | test à chaque version, états de survol et opacité compris | échec de TV0.1 |
| R107 | accessibilité mal couverte par l'automatisation | environ 57 % des problèmes [R] [Deque 2021] | liste manuelle obligatoire (TV0.8) | écart relevé à TV0.7 |
| R108 | surinterprétation d'une exécution unique ou d'une « courbe de gain » | audit vulgarisation, M8 et M14 | Z3 toujours affichée; intervalle et coût | — |
| R109 | valeur ou référence [à confirmer] affichée comme acquise sur une page (R40 couvre les manuscrits) | réserves des dossiers | marque conservée à l'écran; TV0.13 | marque absente d'une valeur marquée |
| R110 | asymétrie documentaire fourmi et abeille masquée | cadre, parité; dossiers p8 et p9 | bandeau « asymétrie documentaire »; justification dans la fiche | — |
| R111 | injection par code partagé ou par URL | conception de Z7 et de l'URL d'état | contexte isolé; code jamais dans l'URL; TV0.15 | échec de TV0.15 |
| R112 | originalité du message surévaluée | audit méthodologie, C10 | valeur ajoutée fondée sur la rigueur, l'abeille et l'évaluation | — |

---

## 18. Réserves et points ouverts

**Ce qui permettrait de trancher** (dossier x-vulgarisation, questions ouvertes) :

1. **Hake 1998** : seule la version ERIC (OCR) a été lue; vérifier numérotation et figures avant toute citation formelle (PDF de l'*American Journal of Physics*).
2. **EPTC 2, édition 2022** : texte officiel illisible dans l'environnement du dossier; articles 2.1, 2.5 et 3.1 inchangés à la lecture indépendante; numérotation des autres articles et art. 6.11 et 10.1 à lire (PDF du CER de l'établissement).
3. **Loi applicable** (secteur privé ou organisme public) et obligation d'EFVP : le RPRP de l'établissement.
4. **Entrevues de conception** : relèvent-elles du CER ? décision écrite du CER.
5. **Taille d'effet d'un explorable guidé contre un équivalent statique** : inconnue; pilote de 30 à 60 participants par bras (EV0.1).
6. **Corrélations intra-classe** : non lues; assignation au sein des classes, ou estimation au pilote.
7. **Instrument « qui décide ? »** : à écrire et à valider (EV0.5) avant le prétest.
8. **Études sur la conception « la reine commande » chez les élèves** : non trouvées, **sans conclure à leur absence** (l'outil de recherche scientifique était indisponible jusqu'au 1er novembre); chercher dans ERIC et les bases d'éducation (*ant colony*, *queen*, *leader*, *misconception*, *emergence*).
9. **Visages ou silhouettes** : preuves partagées; test préenregistré (EV0.3).
10. **Seuil de distinguabilité** de ΔE2000 : 10 est provisoire; épreuve visuelle (EV0.6).
11. **Sources non lisibles à la source** : [Tversky et al. 2002], [Kim et al. 2017], [Boy et al. 2015], [Schneider et al. 2018], valeurs d'[Alfieri et al. 2011], [Mayer s. d.] [non vérifiée], [Tufte 1983], [Tufte 1990], [Munzner 2014], [Wieman et al. 2008]. Ce document n'emploie aucun chiffre de ces sources sans la marque [à confirmer] ou le niveau de lecture que leur donne le dossier.
12. **Krathwohl 2002** (taxonomie de Bloom révisée) : à ajouter à [11-bibliographie.md](11-bibliographie.md); l'audit vulgarisation l'a lue sur notice seulement.
13. **SGQRI 008 3.0** [Québec 2024] : [non vérifiée]; page du Conseil du trésor en erreur 404 lors de la vérification indépendante.

**Tensions avec le cadre** (le cadre prime; aucune n'est une contradiction, toutes demandent une décision du chercheur) :

- **Garde-fou « pas d'anthropomorphisme ni de téléologie »** : appliqué ici comme règle de l'explication causale, avec métaphore étiquetée et mesure par items, parce que le dossier juge la formule absolue trop large et non mesurable [Tamir et Zohar 1991] [McGellin et al. 2021]. Même tension que celle signalée par [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md); à entériner dans le cadre.
- **Argument « la négation installe le mythe »** : affaibli par [Lewandowsky et al. 2020]; la reformulation du cadre est conservée, son argument n'est pas repris.
- **`prefers-reduced-motion`** : relève de 2.3.3 (AAA), retenu comme bonne pratique, non comme exigence AA.
- **Distribution sur N graines** : le cadre la place dans Vérifier; V0 l'affiche à tous les niveaux.
- **Évaluation** : le cadre prévoit pré-test, post-test et condition témoin statique; V0 ajoute le post-test différé, le critère primaire par ANCOVA, l'effet minimal d'intérêt (0,30 [I]), les tailles d'échantillon et le volet éthique.
- **Règle de séquence** : formulée ici d'après le tableau de phases du cadre et l'audit; le texte du cadre ne l'énonce pas en toutes lettres.
- **Unités, public et entrevues** : les fiches catalogue plusieurs dizaines de pages; V0 distingue la page (public principal, production) et le parcours (portes, évaluation, entrevues), et applique VU1 par parcours plutôt que par page. P4 est ajustée (voir « Pages, parcours et public principal »). Décision du chercheur.
- **Objectifs** : les fiches portent des objectifs locaux (O<n>, OL<n>, OA<n>) plus fins que les objectifs-cadre de V0; la règle d'articulation est dans « Objectifs d'apprentissage ». La fiche P4 reprend OA-P4.1 à OA-P4.3 de V0 et propose OA-P4.4 à OA-P4.6 : ils sont intégrés ici (identifiants stables).

**Alignements à faire avec les autres documents** : liste des pages avec [02-architecture-programme.md](02-architecture-programme.md); manifeste de run (N, graine typique) avec [05-spec-simulation.md](05-spec-simulation.md); niveaux d'accord avec [04-protocole-reproduction.md](04-protocole-reproduction.md); registre global des risques avec [09-feuille-de-route.md](09-feuille-de-route.md) (plage R100 à R112 réservée ici, à fusionner); licences avec [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md), qui renvoie à ce document pour le lexique complet; objectifs et visuels de chaque fiche de projet (voir « Objectifs d'apprentissage »).



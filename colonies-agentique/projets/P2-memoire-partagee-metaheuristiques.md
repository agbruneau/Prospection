# P2 — Mémoire partagée et métaheuristiques

**Statut :** fiche de projet. Annexe du programme, **soumise à go/no-go** (porte G0, section 1). Phase 3. Régime : production (le chercheur agit sur ce document). Le [cadre](../docs/00-cadre.md) prime.
**Date :** 2026-10-01. **Dossier source :** [p2-optimisation.md](../recherche/dossiers/p2-optimisation.md) (rapport de vérification : [p2-optimisation.md](../recherche/verifications/p2-optimisation.md)). **Pilotes numériques du dossier :** `../recherche/verifications-numeriques/p2_oliver30_check.py`, `p2_as_oliver30_pilote.py`, `p2_abc_pilote.py`.

**Marques de lecture** (celles du dossier) : [T] texte intégral lu; [R] résumé lu; [M] métadonnées seulement; [S] source secondaire; [I] inférence; [PILOTE] résultat d'une simulation exploratoire du dossier, non relancée par la vérification indépendante; [à confirmer] valeur ou référence non confirmée. Toute marge, taille d'effet ou estimation de cette fiche qui ne vient pas du dossier est une proposition [I] marquée [à confirmer] : elle est figée au préenregistrement, avant les runs confirmatoires.

## 1. Objet et questions de recherche

**Objet.** Mesurer, sur des problèmes d'optimisation et à budget égal, ce que la mémoire partagée d'une colonie apporte selon sa **granularité**, et mettre à l'épreuve la thèse « piste = chemin, danse = lieu » de la v3. Cette thèse est **remplacée** (cadre, correction 15) : la différence opérante entre ACO et ABC n'est pas « combinatoire contre continu », mais la granularité de la mémoire partagée et le mode de génération des solutions, soit des statistiques par composant construites incrémentalement (ACO) contre des solutions complètes diffusées puis perturbées (ABC) [I; dossier, section 5]. Le projet fait deux choses : reproduire des algorithmes publiés (AS, ACS, ACO_R, ABC), puis comparer à budget égal en appliquant la critique de Sörensen, avec un pont vers la répartition de charge agentique.

**Rôle.** Annexe de phase 3. Toutes ses cibles sont **algorithmiques** : aucun résultat biologique n'est reproduit, et la réplication d'un algorithme n'est pas la validation d'un modèle du vivant (cadre, principe 1). Les énoncés biologiques de la fiche se limitent donc à ce que disent les sources. P7 ne dépend pas de P2 (cadre, section 5).

| QR du cadre | Contribution de P2 | Hypothèses |
|---|---|---|
| QR0 (richesse du signal, environnements) | Deux composantes du vecteur R varient à budget égal : **persistance** (ρ ; `limit`) et **adressage** (composant ; solution complète). L'« environnement » est la classe de problème (TSP, continu séparable, continu non séparable, instance qui change). | H2.1, H2.2, H2.4 |
| QR3 (témoin orchestré) | Un contrôle central est comparé à la mémoire partagée sur une tâche couplée (TSP). | H2.6 |
| QR2 (échecs, secondaire) | Stagnation et verrouillage (classe ∅ de la carte α–β de [Dorigo et al. 1996]). | H2.4 |
| Hors QR | Critique des métaheuristiques à métaphore appliquée à la thèse du chercheur. | H2.3 |

**Questions propres au projet.**
- Q-a : la différence de performance entre mémoire par composants et mémoire par solutions complètes tient-elle à la famille (piste, danse) ou à la structure du problème (granularité, séparabilité)? (H2.1, H2.2)
- Q-b : que reste-t-il de l'avantage d'une méthode bio-inspirée décrite par composants, à budget égal, face à des références non bio-inspirées? (H2.3)
- Q-c : quel rôle jouent l'oubli par évaporation (ρ) et l'abandon (`limit`) quand l'instance change en cours d'exécution? (H2.4)
- Q-d : la granularité de la mémoire se transpose-t-elle à des agents LLM, à budget de jetons égal, face à un témoin orchestré? (H2.5, H2.6)

### Portes go/no-go

| Porte | Moment | Critères (tous requis) | Si non satisfaite |
|---|---|---|---|
| **G0** | Lancement de P2 | (1) **Phase 1 achevée** : S0, V0 (gabarit), P1, P8 et P5 ont chacun toutes leurs cibles T avec un verdict au registre des déviations (acceptée, ou refusée avec déviation documentée), leur note de recherche livrée et leurs hypothèses confirmatoires préenregistrées. (2) **Phase 2 achevée** : même exigence pour P3, P4, P6 et P9 (le volet construction de P9, rattaché à la phase 3, n'est pas exigé). (3) Noyau de S0 (PRNG à graine, horloge à pas fixe, enregistreur, manifeste de run) validé; protocole de reproduction et spécification de simulation stables ([protocole](../docs/04-protocole-reproduction.md), [spécification](../docs/05-spec-simulation.md)). (4) Décision écrite du chercheur qui fixe le périmètre : noyau (E2.1, E2.2), plus agentique (E2.3), plus allocation (E2.4). | P2 n'est pas lancé. Aucun livrable obligatoire du programme n'est perdu. La fiche reste valable; revue à chaque fin de phase ([feuille de route](../docs/09-feuille-de-route.md)). |
| **G1** | Avant E2.1 et E2.2 | T2.1 satisfaite; T2.2(a) ou T2.6 satisfaite (ACO sur TSP); T2.8 satisfaite (ABC); T2.11 satisfaite (ACO_R); chaque écart restant est inscrit au registre des déviations. | Réplication avant extension : aucune expérience originale. Corriger le modèle ou documenter la non-reproductibilité. |
| **G2** | Avant E2.3 | G1 franchie; E2.1 terminée; harnais de P7 disponible (budget en jetons, journaux, témoin orchestré); identifiants, tarifs et paramètres des modèles LLM re-vérifiés le jour du lancement (cadre, correction 16). | E2.3 non lancée; le périmètre se réduit au noyau. |
| **G3** | Avant T2.12 et E2.4 | Les textes de Nakrani et Tovey 2004 et de Di Caro et Dorigo 1998 sont obtenus et lus; instances, mesures et marges de T2.12 sont fixées. | T2.12 et E2.4 ne sont pas lancées. |

## 2. Positionnement

| Existant (publié) | Reproduit par P2 | Apport de P2 |
|---|---|---|
| **AS** : [Dorigo et al. 1996] publie les équations, la Table I et les courbes sur Oliver30. τ0, l'élitisme de la Table I et le nombre d'essais de l'affirmation « toujours < 400 cycles » ne sont pas publiés. | T2.1 à T2.5 | Recalcul indépendant de l'instance; τ0 traité comme paramètre de sensibilité; résultat négatif attendu sur T2.3 (non reproduit par le pilote); convention de ρ déclarée (persistance). |
| **ACS** : [Dorigo et Gambardella 1997], Tables I et III. | T2.6, T2.7 | Ablations (Δτ = 0, sans mise à jour locale) lues comme tests d'un composant de mémoire. |
| **ACO_R** : [Socha et Dorigo 2008] étend ACO au continu par une archive de solutions complètes. | T2.11 | Version « croisée » de la grille E2.1 (mémoire par composants, domaine continu). |
| **ABC** : [Karaboga 2005] (rapport technique, sans équation algorithmique), [Karaboga et Basturk 2008], code de référence [Sahin 2020]. [Karaboga et Basturk 2007] et [Karaboga et Akay 2009] **non lus**. | T2.8, T2.9, T2.10 | Sélection par roulette comparée à la règle du code (0,9·fit/max + 0,1); versions décalées des fonctions; DE réimplanté au lieu de repris de seconde main. |
| **ABC combinatoire et binaire** : [Karaboga et Gorkemli 2011] ([M]), [Karaboga et Gorkemli 2019] ([R]), [Kashan et al. 2012] ([M]). Opérateurs non lus. | Aucune | Cellule croisée (ABC sur TSP) de E2.1, construite par composants si les opérateurs restent non lus (R9). |
| **Bees Algorithm** : [Pham et al. 2006], [Pham et Castellani 2009] ([M] seulement). Distinct d'ABC. | Aucune (cible gelée) | Signalé pour éviter la confusion avec ABC; aucune cible tant que le texte n'est pas obtenu. |
| **Critique des métaphores** : [Sörensen 2015] ([R]), [Sörensen et al. 2018] ([T]), [Camacho-Villalón et al. 2023], [Aranha et al. 2022], [Mernik et al. 2015] (comparer en itérations trompe, ABC en particulier). | Aucune | Application de la critique à la thèse du chercheur (tableau ci-dessous). |
| **Stigmergie et état partagé des agents** : [Dorigo et al. 2000] (variables stigmergiques), [Heylighen 2016], tableaux noirs LLM ([Han et Zhang 2025], [Salemi et al. 2025]), surface d'attaque ([Nakamura et al. 2025]), stigmergie entre agents LLM ([Pal et al. 2026]). | Aucune | La granularité de la mémoire devient la variable manipulée (E2.3). |
| **LLM et métaheuristiques** : [Yang et al. 2023] (OPRO), [Ye et al. 2024] (ReEvo, le LLM fournit les mesures heuristiques d'ACO), [Liu et al. 2024] (EoH); coût des essaims LLM dans [Rahman et al. 2025]. | Aucune | Comparaison à budget de jetons égal de deux régimes de mémoire, avec témoin orchestré et références non agentiques (E2.3). |
| **Allocation dynamique** : Nakrani et Tovey 2004 (algorithme apicole d'allocation de serveurs) et Di Caro et Dorigo 1998 (AntNet), connus par l'audit ([lacunes](../docs/annexes/audit/lacunes.md), [bio-abeilles](../docs/annexes/audit/bio-abeilles.md)) : [M] ou [R]. **Absentes de la bibliographie du programme** (section 13). | T2.12 (relationnelle) | Flux de requêtes commun aux deux mécanismes (E2.4). |
| **Dépendance à l'environnement du signal** : [Sherman et Visscher 2002], [Donaldson-Matasci et Dornhaus 2012], [Beekman et Lew 2008] (reproduits dans P1 et P8, pas ici). | Aucune | P2 en reprend la forme de la question (quand la richesse du signal paie-t-elle?) pour des algorithmes, sans prétendre à la biologie. |

### Thèse remplacée : granularité de la mémoire partagée [I]

Appui : [Socha et Dorigo 2008] (ACO_R conserve une archive de solutions complètes; le critère définitoire d'ACO est la construction incrémentale, Sec. 3 et 4.1) et [Karaboga et Basturk 2008] (ABC est une mutation de type DE avec sélection gloutonne, Sec. 5).

| Axe | ACO (AS, ACS, ACO_R) | ABC |
|---|---|---|
| Unité mémorisée | Statistiques par **composant** (arête, valeur de variable), agrégées sur la population; ACO_R : archive pondérée par rang | **Solution complète** attachée à une ouvrière, avec compteur `trial` |
| Génération | **Construction incrémentale**, composant par composant | **Perturbation** d'une solution existante (une dimension, différence avec une autre source) |
| Diffusion | Implicite : chaque fourmi lit l'état agrégé | Explicite et sélective : les observatrices choisissent une source annoncée, proportionnellement à sa qualité |
| Oubli | Évaporation continue; remplacement des pires (ACO_R) | Abandon discret après `limit` échecs, puis redémarrage aléatoire (éclaireuse) |

Le contraste biologique reste (piste : trace agrégée et persistante; danse : message individuel, éphémère, localisé), mais **il n'est pas dans l'algorithme** : la « danse » d'ABC ne code ni direction ni distance, et la table des sources y persiste jusqu'à l'abandon [T; dossier, section 5]. La question testable devient : état partagé décomposé contre propositions complètes diffusées (H2.1, H2.2, H2.5).

### Critique de Sörensen : règles appliquées

| Règle | Application dans P2 | Vérifiée où |
|---|---|---|
| Décrire chaque algorithme **par composants** (ODD) | ACO = construction probabiliste + mémoire de composants + évaporation; ABC = perturbation différentielle sur une dimension + sélection proportionnelle + redémarrage sur échec. Aucune métaphore dans le code, les tests ni la note de recherche. | Section 4 (résumé ODD); livrable L1 |
| **Budget égal en évaluations** (FE ou tours construits, jamais en cycles; [Mernik et al. 2015]) | Compteur de FE commun; décompte documenté (une évaluation par ouvrière, par observatrice et par éclaireuse; une par fourmi et par tour). Budget de réglage des paramètres égal pour toutes les méthodes (R7). | E2.1; tests de budget |
| **Références non bio-inspirées** | TSP : 2-opt multi-départs, Lin-Kernighan (LK); continu : DE, CMA-ES; recherche aléatoire au même budget. | H2.3 |
| **Métaphore réservée à la vulgarisation** | Les pages Voir peuvent employer fourmis et abeilles; le bouton « retirer la métaphore » (V7) montre les opérateurs. La note de recherche, elle, décrit sans métaphore. | Section 8; livrable L1 |
| **Publier les résultats négatifs** | T2.3 (non reproduite par le pilote) et toute réfutation de H2.1 ou H2.3 sont rapportées. | Livrable L9 |

### Corrections de la v3 appliquées (cadre, section 2.4, et dossier, section 9)

- ρ est la **persistance** en 1996 : τ(t+n) = ρ·τ(t) + Δτ. La forme τ ← (1−ρ)τ + Δτ est une convention postérieure et n'apparaît ni dans [Dorigo et Gambardella 1997] ni dans [Socha et Dorigo 2008]; son origine reste à établir ([Dorigo et Stützle 2004] non lu) [à confirmer].
- La règle de transition inclut la liste tabou, η = 1/d et le dépôt Δτ = Q/L_k en fin de tour (ant-cycle).
- « ACO sur Oliver30 » exige de choisir la variante (AS ant-cycle ou ACS) et les distances (réelles : 423,741; entières : 420).
- [Karaboga 2005] est un rapport technique sans équation algorithmique; les équations viennent de [Karaboga et Basturk 2008] et du code [Sahin 2020].
- La danse d'ABC ne porte ni direction ni distance; le contraste « scalaire contre symbole » ne vaut pas pour l'algorithme.
- Rôles d'ABC : ouvrières et observatrices à 50 % de la colonie chacune, au plus une éclaireuse par cycle, `limit` = n_e·D.
- Le visuel « arêtes épaissies par la phéromone » existe déjà (Fig. 6 de [Dorigo et al. 1996]) : il est cité comme source.
- Le Bees Algorithm est absent de la v3 et distinct d'ABC.
- Asymétrie : les sources d'ACO sont plus solides et plus anciennes que celles d'ABC; [Karaboga et Basturk 2008] compare à des résultats repris d'un autre article (Krink et al. 2004) et ses Tables 4 et 5 sont incohérentes entre elles (T2.9).
- « Toujours < 400 cycles » avec e = 8 n'est pas reproduit par le pilote (T2.3).

## 3. Hypothèses falsifiables

**Mesures communes.** Budget : FE (TSP : tours construits), jamais cycles seuls. Erreur : excès relatif (L − L*)/L* en TSP; erreur absolue f − f* en continu, analysée en log₁₀ (échelle recommandée pour les erreurs d'optimisation, [dossier x-methodes](../recherche/dossiers/x-methodes.md), M6) [I]. Effet comparatif sans échelle : A12 de Vargha et Delaney (probabilité qu'un run de A batte un run de B), recommandé avec le test de Mann-Whitney par [Arcuri et Briand 2011] [I; à vérifier dans le texte]. Intervalles bootstrap à 95 % (10 000 rééchantillonnages, dossier, section 4). Tests non paramétriques ([Derrac et al. 2011]); dimensionnement des répétitions sur algorithmes × instances avec correction de Holm ([Campelo et Wanner 2019]); bonnes pratiques de benchmarking ([Bartz-Beielstein et al. 2020]). Un non-rejet n'est pas une équivalence : les équivalences se testent par TOST (cadre, principe 3; protocole : [protocole de reproduction](../docs/04-protocole-reproduction.md)).

**H2.1 — Frontière famille × classe (thèse v3 rendue falsifiable). Statut : confirmatoire préenregistré.**
- Énoncé dirigé : à budget égal en FE, l'avantage de la famille ACO (mémoire par composants : ACS ou AS sur TSP, ACO_R en continu) sur la famille ABC (mémoire par solutions complètes : ABC combinatoire ou par composants sur TSP, ABC en continu) est positif sur TSP et négatif en continu (croisement). C'est la formulation du dossier (critère C12), à réfuter comme régularité de performance après l'avoir été comme frontière algorithmique.
- Variables indépendantes : famille {ACO, ABC}; classe {TSP, continu}; checkpoints de FE. Dépendante : A12 par cellule sur l'erreur finale, et courbe erreur contre FE.
- Taille d'effet minimale : A12 ≥ 0,64 sur TSP et ≤ 0,36 en continu [à confirmer].
- Réfutation : l'IC95 % de l'un des deux A12 inclut 0,5 ou porte le signe opposé, ou l'IC95 % de leur différence inclut 0.
- Le dossier réfute la thèse comme frontière **algorithmique** (ACO_R, CABC), pas comme régularité de **performance** : H2.1 teste ce second volet, sans réponse attendue.

**H2.2 — La séparabilité module l'avantage de la mémoire par composants. Statut : exploratoire.**
- Énoncé dirigé : en continu, à budget égal, l'avantage d'ACO_R sur ABC est plus grand sur un problème séparable (Rastrigin décalée) que sur un problème non séparable (Rosenbrock décalée, et Rastrigin pivotée qui isole la séparabilité de la multimodalité).
- Variables : séparabilité {séparable, non séparable}; algorithme {ACO_R, ABC}. Dépendante : A12 par problème.
- Taille d'effet minimale : différence d'A12 entre problèmes ≥ 0,14 [à confirmer].
- Réfutation : l'IC95 % de la différence inclut 0 ou porte le signe opposé.
- La direction n'est appuyée par aucune source [I] : ACO_R tire chaque variable à partir de l'archive (éq. 5 à 9 de [Socha et Dorigo 2008]) et ABC ne modifie qu'une dimension à la fois, deux traitements par coordonnée.

**H2.3 — Les références non bio-inspirées ne perdent pas. Statut : confirmatoire préenregistré.**
- Énoncé dirigé : à budget égal en FE, la meilleure référence non bio-inspirée (2-opt ou LK en TSP; DE ou CMA-ES en continu) atteint une erreur finale médiane inférieure ou égale à celle de la meilleure variante bio-inspirée sur chaque problème de la grille E2.1.
- Appui : sur Oliver30, l'AS ant-cycle (420) est à au plus une unité entière de la meilleure heuristique de construction avec 2-opt (421) et de LK (420 ou 421) (Table III de [Dorigo et al. 1996]); les auteurs reconnaissent que l'AS n'est pas compétitif face aux heuristiques spécialisées (note 4 et Sec. VI-A). ABC est une mutation de type DE avec sélection gloutonne ([Karaboga et Basturk 2008], Sec. 5).
- Variables : algorithme {meilleur ACO, meilleur ABC, références, recherche aléatoire}; problème. Dépendante : erreur finale au budget (A12).
- Taille d'effet minimale : A12 de la référence contre le meilleur bio-inspiré ≥ 0,5, sans cas où l'avantage bio-inspiré atteint 0,64 [à confirmer].
- Réfutation : sur au moins un problème, le meilleur bio-inspiré bat la meilleure référence (A12 ≥ 0,64, IC95 % excluant 0,5, après Holm). Une réfutation est un résultat positif sur la méthode bio-inspirée.

**H2.4 — L'oubli optimal est intermédiaire quand l'instance change. Statut : exploratoire.**
- Énoncé dirigé : après un changement d'instance (déplacement d'une fraction des villes en TSP; déplacement de l'optimum en continu), le nombre de FE de rétablissement (retour à une erreur donnée du nouvel optimum) est minimal pour un oubli intermédiaire et croît aux deux extrêmes (courbe en U), pour ρ comme pour `limit`.
- Variables : persistance ρ ∈ {0,3; 0,5; 0,7; 0,9; 0,999} (valeurs testées par [Dorigo et al. 1996], Sec. IV); `limit` ∈ {0,1·n_e·D; 0,5·n_e·D; n_e·D; sans éclaireuse} ([Karaboga et Basturk 2008], Table 5); amplitude du changement [à confirmer]. Dépendante : FE de rétablissement.
- Taille d'effet minimale : écart médian entre l'intérieur et chaque extrême ≥ [à confirmer] % des FE.
- Réfutation : courbe monotone, ou aucun point intérieur significativement meilleur que les deux extrêmes (IC95 % bootstrap).
- Appui partiel en environnement **statique** : `limit` trop bas ou absent d'éclaireuses est pire que n_e·D sur les fonctions multimodales (Table 5), et α élevé produit une stagnation (Fig. 7 et 8 de [Dorigo et al. 1996]).

**H2.5 — Granularité de la mémoire chez des agents LLM. Statut : exploratoire (Hypothèse de l'auteur [I]).**
- Énoncé dirigé : à budget de jetons égal sur un TSP, le régime (b) « tableau de solutions complètes avec scores et compteurs d'échecs » atteint un excès relatif médian inférieur à celui du régime (a) « mémoire d'arêtes partagée à décroissance ».
- Appui indirect [I] : l'invite d'OPRO contient les solutions précédentes et leurs valeurs ([Yang et al. 2023], [R]); dans ReEvo le LLM fournit les mesures heuristiques et ne lit pas une phéromone ([Ye et al. 2024], [R]).
- Variables : régime {a, b}; nombre d'agents N [à confirmer]; décroissance de (a) {faible, forte} [à confirmer]. Dépendante : excès relatif au budget de jetons.
- Taille d'effet minimale : A12 ≥ 0,64 [à confirmer].
- Réfutation : IC95 % de l'A12 incluant 0,5 ou signe opposé.

**H2.6 — Témoin orchestré et mémoire partagée sur une tâche couplée. Statut : exploratoire (Hypothèse de l'auteur [I]).**
- Énoncé dirigé : à budget de jetons égal, le témoin orchestré atteint un excès relatif médian inférieur ou égal à celui du meilleur des régimes (a) et (b) sur le TSP (raffinement d'un tour : tâche couplée, section 7).
- Appui : aucune source agentique directe; c'est la réponse par défaut de QR3 sur une tâche séquentielle, à tester, non à affirmer.
- Variables : régime {a, b, orchestré, sans canal, agent unique}; N [à confirmer]. Dépendante : excès relatif; coût (jetons, appels, latence).
- Taille d'effet minimale : A12 ≥ 0,64 en faveur du régime partagé pour réfuter [à confirmer].
- Réfutation : un régime partagé bat le témoin orchestré (A12 ≥ 0,64, IC95 % excluant 0,5).

## 4. Modèles de référence

**Type de modèle.** Métaheuristiques stochastiques à temps discret (cycles ou itérations); pas d'EDO ni de Gillespie : le RK4 et le SSA du noyau commun ne servent pas ici. Les modèles se décrivent par leurs opérateurs (résumé ODD, section 4.7). Les équations ci-dessous sont transcrites du dossier ([section 3](../recherche/dossiers/p2-optimisation.md)), avec leur emplacement dans la source.

### 4.1 Parité fourmi/abeille et asymétrie signalée

| | Fourmi (mémoire par piste) | Abeille (mémoire par sources) |
|---|---|---|
| Mécanisme et taxon | Piste de masse. Taxon de référence du cadre : *Linepithema humile*, via les expériences de pont double ([Goss et al. 1989]) [I : le dossier P2 ne nomme pas de taxon pour l'AS] | Butinage : ouvrières, observatrices, éclaireuses. Taxon : *Apis mellifera* [I : le titre de [Karaboga 2005] parle de « honey bee swarm »] |
| Lu en texte intégral [T] | AS ([Dorigo et al. 1996]), ACS ([Dorigo et Gambardella 1997]), ACO_R ([Socha et Dorigo 2008]) | [Karaboga 2005], [Karaboga et Basturk 2008], code [Sahin 2020] |
| Non lu | AntNet (Di Caro et Dorigo 1998) [M] | [Karaboga et Basturk 2007], [Karaboga et Akay 2009], Bees Algorithm ([Pham et al. 2006], [Pham et Castellani 2009]), Nakrani et Tovey 2004, CABC, DisABC |
| Fidélité biologique | Ant-density et ant-quantity déposent en marchant (éq. 5, 6); **ant-cycle, la meilleure variante, dépose en fin de tour (éq. 3), ce qui n'est pas biologique** [I] | La danse n'encode ni direction ni distance (sélection proportionnelle); l'abandon par `limit` est déterministe, alors que l'abandon d'une source est probabiliste chez l'abeille ([Seeley et al. 1991], [Camazine et Sneyd 1991]; résumés [S]) |
| Niveau individuel | Une fourmi choisit la ville suivante avec p_ij (éq. 4); mémoire privée : liste tabou | Une abeille perturbe une dimension d'une source et accepte si le nectar augmente; mémoire privée : compteur `trial` |
| Niveau collectif | Matrice τ ou archive : état partagé persistant, granularité **composant** | Table de sources : état partagé persistant, granularité **solution complète** |

**Asymétrie (cadre, section 5 : à justifier).** ACO suit de près les expériences de pont double; ABC est une métaphore lâche et ses sources sont moins solides (article de 2007 non lu, comparateurs repris de seconde main). La parité de **niveau d'exigence** est tenue (même protocole, mêmes budgets, mêmes références non bio-inspirées), pas la parité de **fidélité biologique**. La paire d'allocation dynamique (AntNet, Nakrani et Tovey 2004), plus fidèle des deux côtés selon l'audit, est le pendant prévu (E2.4), mais ses deux sources sont non lues. Le contre-exemple des Meliponini (pistes chez l'abeille, cadre section 2.3) relève de P1.

### 4.2 Préréglage du canal (modèle chorégraphique commun)

| Composante de R | ACO | ABC |
|---|---|---|
| Persistance | ρ (AS : fraction conservée par cycle); ACS : α (global) et ρ (local); ACO_R : remplacement des pires | Jusqu'au remplacement (sélection gloutonne) ou à l'abandon après `limit` |
| Portée | Globale (toute fourmi lit τ) | Globale (toute observatrice choisit parmi les sources) |
| Adressage | Par composant (arête; variable) | Par solution complète |
| Format | Un scalaire par composant; ACO_R : archive de k vecteurs triés par rang | Vecteur complet, qualité, compteur d'échecs |
| Bits par message, I(M;W)/H(W) | Non mesurés dans P2 ([métriques et typologie](../docs/06-metriques-et-typologie.md)) | Idem |

Typologie du cadre (axe A3) : les deux algorithmes ont un **état partagé persistant**. Le canal éphémère de la danse biologique n'est pas modélisé dans ABC [I]; c'est une raison de plus pour laquelle « piste contre danse » n'est pas la frontière algorithmique.

### 4.3 Convention de ρ

| Source | Écriture | Sens du paramètre |
|---|---|---|
| [Dorigo et al. 1996], éq. (1), p. 5 du postprint | τ_ij(t+n) = ρ·τ_ij(t) + Δτ_ij, 0 ≤ ρ < 1 | **Persistance** (« trail persistence », Sec. IV); 1−ρ = évaporation |
| [Dorigo et Gambardella 1997], éq. (2), (4), (5) | AS réécrit : τ ← (1−α)τ + ΣΔτ_k; global : τ ← (1−α)τ + αΔτ; local : τ ← (1−ρ)τ + ρΔτ | α = décroissance; ρ local pondère Δτ |
| [Socha et Dorigo 2008], éq. (2), p. 1157 | τ_ij ← (1−ρ)τ_ij + ρΔτ | ρ ∈ (0,1] = taux d'évaporation, pondère Δτ |
| v3 | τ ← (1−ρ)τ + Δτ | Absente des trois sources; origine à établir [à confirmer] |

Conséquences : la Table I utilise ρ = 0,5 (ant-cycle) et ρ = 0,99 (ant-density, ant-quantity) **au sens de 1996** (persistance : ρ = 0,99 signifie une évaporation de 0,01). Les deux conventions coïncident à ρ = 0,5 et divergent ailleurs. Le code nomme le paramètre `persistance`, définit `evaporation = 1 − persistance`, et un test unitaire vérifie la divergence à 0,99.

### 4.4 Ant System, variante ant-cycle ([Dorigo et al. 1996]) [T]

```
(1) τ_ij(t+n) = ρ·τ_ij(t) + Δτ_ij                      [p. 5 ; ρ = persistance]
(2) Δτ_ij = Σ_{k=1..m} Δτ_ij^k
(3) Δτ_ij^k = Q / L_k si la fourmi k emprunte (i,j) dans son tour, 0 sinon     [ant-cycle ; dépôt en fin de tour]
    η_ij = 1 / d_ij (constante)
(4) p_ij^k(t) = [τ_ij(t)]^α·[η_ij]^β / Σ_{l ∈ allowed_k} [τ_il(t)]^α·[η_il]^β   si j ∈ allowed_k, sinon 0   [p. 6]
    allowed_k = N − tabu_k  (liste tabou des villes déjà visitées)
(5) ant-density : dépôt Q à chaque pas            (6) ant-quantity : dépôt Q/d_ij à chaque pas     [p. 8]
Élitisme (Sec. V-C) : chaque arête du meilleur tour reçoit en plus e·Q/L*, L* = meilleur tour trouvé
Initialisation : τ_ij(0) = c, « petite constante positive ». La valeur de c n'est PAS publiée.
Arrêt : NC_MAX cycles, ou stagnation (toutes les fourmis font le même tour)       Complexité : O(NC·n²·m)
```

| Paramètre (sans dimension; distances en unités de coordonnées) | Valeur publiée | Emplacement |
|---|---|---|
| α (poids de la piste) | 1 (meilleur pour ant-cycle) | Sec. IV; Table I |
| β (poids de la visibilité) | 5 (meilleur pour ant-cycle) | Sec. IV; Table I |
| ρ (persistance) | 0,5 (ant-cycle); 0,99 (ant-density, ant-quantity) | Table I |
| Q | 100 (influence jugée négligeable pour Q ∈ {1, 100, 10 000}); absent de la Table I | Sec. IV; Fig. 9 |
| m | n (30 pour Oliver30); optimum de synergie m ≈ n | Sec. IV, V-A |
| NC_MAX | 5000 (étude des paramètres); 2500 (carte α–β, élitisme) | Sec. IV; Fig. 8, Sec. V-C |
| Essais | 10 par réglage | Sec. IV |
| Répartition initiale | Uniforme (même nombre de fourmis par ville) | Sec. V-B, note 5 |
| e (élitistes) | e = 8 cité en exemple (« for instance »); plage optimale en Fig. 14 | Sec. VI-A; Fig. 14 |
| Valeurs testées | α ∈ {0; 0,5; 1; 2; 5}, β ∈ {0; 1; 2; 5}, ρ ∈ {0,3; 0,5; 0,7; 0,9; 0,999} | Sec. IV |

**Instance Oliver30 (valeurs et état du contrôle).** Longueur optimale publiée : **423,741** en distances réelles, **420** en distances entières; le tour de l'algorithme génétique de [Whitley et al. 1989] mesure 424,635 (Fig. 9–10, note 3 de [Dorigo et al. 1996]). Les coordonnées ne figurent pas dans l'article : elles viennent de [Dower s.d.] (numérotation de Dorigo) et seront fixées dans le dépôt avec leur somme de contrôle. **Contrôle fait [PILOTE]** : une recherche 2-opt multi-départs (3000 départs) retrouve 423,741 et 420, et l'ordre identité donne 424,635. **Non fait** : certificat d'optimalité (solveur exact Concorde); tant qu'il manque, « optimum » signifie « meilleure valeur connue, publiée et recalculée ».

### 4.5 Ant Colony System ([Dorigo et Gambardella 1997]) [T]

Équations lues sur l'image des p. 55–56 (le texte extrait est illisible).

```
(3) s = argmax_{u ∈ J_k(r)} {[τ(r,u)]·[η(r,u)]^β} si q ≤ q0 ; sinon S tiré selon (1) (règle de l'AS sans exposant α) ; q ~ U[0,1]
(4) mise à jour globale : τ(r,s) ← (1−α)·τ(r,s) + α·Δτ(r,s), Δτ = (L_gb)^−1 sur les arêtes du meilleur tour global, 0 sinon
(5) mise à jour locale  : τ(r,s) ← (1−ρ)·τ(r,s) + ρ·Δτ(r,s), Δτ = τ0   (Ant-Q : Δτ = γ·max τ(s,z))
```

Paramètres (Sec. III-D, p. 56) : β = 2; q0 = 0,9; α = ρ = 0,1; τ0 = (n·L_nn)^−1 (L_nn : tour du plus proche voisin); m = 10; fourmis placées au hasard, au plus une par ville. La mise à jour locale rend une arête moins attirante à chaque passage : les fourmis ne convergent pas vers un chemin commun (Sec. IV-A). **Ordre de mise à jour des fourmis dans un cycle : non établi dans le dossier** [à lire, Sec. III]; à déclarer et à tester comme facteur (synchrone à double tampon contre asynchrone séquentiel avec permutation tirée du PRNG; [Caron-Lormier et al. 2008]; [dossier x-methodes](../recherche/dossiers/x-methodes.md), M10d).

### 4.6 ACO_R ([Socha et Dorigo 2008]) [T]

```
(2) τ_ij ← (1−ρ)·τ_ij + ρ·Δτ si τ_ij ∈ solution choisie ; (1−ρ)·τ_ij sinon      [p. 1157 ; ACO générique]
(5) G^i(x) = Σ_{l=1..k} ω_l · 1/(σ_l^i·√(2π)) · exp(−(x−μ_l^i)² / (2·(σ_l^i)²))     [noyau gaussien, dimension i]
(6) μ^i = (s_1^i, …, s_k^i)       (7) ω_l = 1/(q·k·√(2π)) · exp(−(l−1)² / (2·q²·k²))
(8) p_l = ω_l / Σ_r ω_r   (noyau choisi une fois par fourmi et par itération)
(9) σ_l^i = ξ · Σ_{e=1..k} |s_e^i − s_l^i| / (k−1)
(10) arrêt : |f − f*| < ε1·f + ε2, ε1 = ε2 = 1e−4
Mise à jour : ajouter les m nouvelles solutions à l'archive, retirer les m pires
```

La phéromone devient une **archive de k solutions complètes** triées par qualité (Sec. 3, Fig. 3). Paramètres : m = 2, ξ = 0,85, k = 50; q = 10⁻⁴ à la Table 2 (p. 1166), mais **q = 0,1 pour toutes les fonctions de la série** (Sec. 5.2). Initialisation sans biais (*skewed*) recommandée (Sec. 5.1), non appliquée systématiquement par l'article.

### 4.7 Artificial Bee Colony ([Karaboga et Basturk 2008], [Karaboga 2005], [Sahin 2020]) [T]

```
(1) P_i = F(θ_i) / Σ_{k=1..S} F(θ_k)        [Karaboga et Basturk 2008, p. 690 ; roulette ; F = nectar, S = nombre de sources]
(2) θ_i(c+1) = θ_i(c) ± φ_i(c) : pas aléatoire fondé sur la différence avec une source k tirée au hasard ; sélection gloutonne
Forme explicite (code de Sahin 2020 ; attribution aux articles de 2007 et 2009 NON vérifiée) :
    init   x_ij = l_j + rand(0,1)·(u_j − l_j)
    voisin v_ij = x_ij + φ_ij·(x_ij − x_kj), φ ~ U[−1,1], UNE dimension j, k ≠ i tiré au hasard
    fitness fit = 1/(1+f) si f ≥ 0 ; 1 + |f| sinon
    observatrices (code) : p_i = 0,9·fit_i/max fit + 0,1, balayage circulaire, tirage r < p_i      (≠ roulette fit_i/Σfit)
    éclaireuse : au plus une par cycle, sur la source de `trial` maximal si trial ≥ limit
    arrêt : nombre maximal d'évaluations
```

| Réglage | [Karaboga et Basturk 2008] (Table 2, p. 691) | [Karaboga 2005] (Table 2) | Code [Sahin 2020] |
|---|---|---|---|
| Colonie | 100 (n_o = n_e = 50 %, n_s = 1) | 20 (50 % observatrices, 50 % ouvrières, 1 éclaireuse) | NumberOfPopulation = 50 = colonie; SN = 25 |
| `limit` | n_e·D | observatrices × D | 1500 = 2·SN·D (le double de la règle de 2008) |
| Budget | MCN 1000 (f1, f2) et 5000 (f3 à f5), soit 100 000 et 500 000 FE (≈ 100 FE par cycle) | MCN 2000 | 500 000 évaluations |
| Essais | 30 | 30 | 30 (D = 30) |

Fonctions de la Table 1 de 2008 : Schaffer F6 (D = 2, [−100, 100]); Sphère (D = 5, [−100, 100]); **Griewank décalée** (D = 50, [−600, 600], f3 = (1/4000)·Σ(x_i−100)² − Π cos((x_i−100)/√i) + 1, optimum en x = 100); Rastrigin (D = 50, [−5,12; 5,12]); Rosenbrock (D = 50, [−50, 50]). **Réserves** : (i) DE, PSO et EA de la Table 3 viennent de Krink et al. 2004 (réf. [27] de l'article; la Table 3 cite à tort [26], qui renvoie à Goldberg 1989 [S]); (ii) les Tables 4 et 5 sont incohérentes (Rastrigin 50D, colonie de 100 : 4,37E−16 contre 5,096; cause non établie [à confirmer]); (iii) les auteurs reconnaissent la parenté avec DE (Sec. 5); (iv) [Karaboga 2005] ne contient aucune équation algorithmique et donne pour Rastrigin le domaine atypique [−600, 600]; l'identité de son PDF en ligne (régénéré en 2010) avec l'original est inconnue [à confirmer]; (v) la formule exacte de Rosenbrock se transcrit de la Table 1 de 2008 avant le codage [à confirmer].

### 4.8 Modèles non lus, gelés

Aucun de ces modèles n'est codé avant lecture : Bees Algorithm (la terminologie n et m, e, nep, nsp, ngh ne vient que d'une source non primaire; ne pas l'employer comme cible), CABC et qCABC, DisABC, l'algorithme d'allocation de Nakrani et Tovey 2004, AntNet, [Karaboga et Basturk 2007] et [Karaboga et Akay 2009] (dont l'attribution des équations canoniques d'ABC reste non vérifiée), MMAS (cité par le dossier, sans entrée dans la bibliographie).

### 4.9 Résumé ODD ([Grimm et al. 2020])

| Élément | AS et ACS | ACO_R | ABC |
|---|---|---|---|
| Objet | Minimiser la longueur d'un tour sur un graphe complet de n villes | Minimiser f(x) sur un domaine continu | Minimiser f(x) sur un domaine numérique |
| Entités et variables | m fourmis (position, liste tabou, longueur L_k); arêtes (τ_ij, η_ij = 1/d_ij) | m fourmis; archive de k solutions (vecteur, f, rang, poids ω_l) | SN sources (x_i, f, fit, trial); SN ouvrières, SN observatrices, au plus une éclaireuse par cycle |
| Échelles | 1 pas = une transition; 1 cycle = n pas; budget NC_MAX ou FE | 1 itération = m tirages; budget FE | 1 cycle = trois phases; budget MCN ou FE |
| Ordonnancement | AS : construction des m tours avec τ constant, puis mise à jour globale (éq. 1 à 3) et élitisme. ACS : mise à jour locale à chaque transition, globale sur le meilleur tour. **Ordre des fourmis à déclarer** | Choix du noyau (éq. 8), tirage (éq. 5), ajout à l'archive, retrait des m pires | Phase ouvrières (voisin, sélection gloutonne), phase observatrices (choix par éq. 1 ou règle du code), phase éclaireuse |
| Concepts | Interaction indirecte par τ; stochasticité : tirage selon p_ij; observation : meilleur tour, longueur moyenne, arborescence moyenne des nœuds | Interaction indirecte par l'archive; stochasticité : choix du noyau et tirage gaussien | Interaction par la table des sources; stochasticité : φ, k, tirage des observatrices |
| Initialisation | τ0 = c (AS, **non publié**); τ0 = (n·L_nn)^−1 (ACS); répartition initiale des fourmis | k solutions tirées dans l'intervalle d'initialisation (*skewed* recommandé) | x_ij = l_j + rand(0,1)·(u_j − l_j) |
| Entrées | Coordonnées d'Oliver30 ([Dower s.d.]); instances TSPLIB | Fonctions de la Table 6 (Sec. 5) | Fonctions de la Table 1 de 2008 |
| Sous-modèles | Éq. (1) à (6) (AS); (3) à (5) (ACS) | Éq. (5) à (10) | Éq. (1), (2) et forme du code |

## 5. Cibles de reproduction

Correspondance avec le dossier : **T2.k = Ck pour k = 1 à 11**; C12 (grille 2×2) devient l'expérience E2.1; **T2.12 est nouvelle** (relationnelle, lecture [R]). Niveaux d'acceptation (cadre, principe 3; [Axtell et al. 1996]; [Wilensky et Rand 2007]) : *alignement relationnel* (ordre, signe, classe), *équivalence distributionnelle* (TOST). Le critère du dossier « la valeur publiée tombe dans l'IC95 % reproduit » est un non-rejet : il est rapporté, mais la décision d'équivalence repose sur un TOST dont la marge est fixée avant les runs ([protocole de reproduction](../docs/04-protocole-reproduction.md)). Les valeurs publiées sans écart-type sont traitées comme des points; leur incertitude n'est pas publiée (Table I de 1996 : moyenne et meilleur seulement) [I].

| ID | Espèce, modèle | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|---|---|
| **T2.1** | Instance (neutre) | Longueur du meilleur tour d'Oliver30; tour de l'AG | 423,741 (réel); 420 (entier); tour de l'AG : 424,635 | Vérification déterministe | ±0,001; certificat Concorde à produire | 1 | [Dorigo et al. 1996], Table I, Fig. 9–10, note 3; coordonnées [Dower s.d.] | [T]; pilote fait [PILOTE]; certificat non fait | Bloquante : sans T2.1, T2.2 à T2.7 ne démarrent pas |
| **T2.2** | Fourmi, AS (ant-cycle, ant-density, ant-quantity) | Longueur moyenne et meilleure sur Oliver30 | ant-cycle 424,250 et 423,741; ant-density 426,740 et 424,635; ant-quantity 427,315 et 426,255 | Équivalence (moyenne ant-cycle); alignement relationnel (classement) | (a) moyenne ant-cycle ≤ 424,25 × 1,002 ≈ 425,10 (dossier), soit TOST bilatéral ±0,2 % [I, à confirmer]; (b) ≥ 1 essai sur 30 à 423,741; (c) ant-cycle < ant-density < ant-quantity | 30 (10 dans l'article) | [Dorigo et al. 1996], Table I, p. 9 (α = 1, β = 5, ρ = 0,5 ou 0,99, m = 30, NC_MAX = 5000, 10 essais) | [T]; τ0 non publié; Q = 100 absent de la Table I; pilote : 424,516 (σ 0,77) et 0/10 à l'optimum avec τ0 = 1e−6; 424,684 (σ 0,85) et 1/10 avec τ0 = 0,06 [PILOTE] | (a) et (c) requis (G1). (b) fragile : un échec de (b) seul est inscrit comme déviation, pas un no-go |
| **T2.3** | Fourmi, AS élitiste (e = 8) | Cycles avant 423,741; cycles avant < 430 | 423,741 trouvé « à chaque fois » en moins de 400 cycles; < 430 en ≈ 100 cycles (nombre d'essais non précisé) | Alignement relationnel | (a) succès ≥ 90 % en 5000 cycles; (b) médiane des cycles avant succès ≤ 400; (c) médiane avant < 430 ≤ 150 | 30 | [Dorigo et al. 1996], Sec. VI-A, p. 17; Fig. 14 | [T]; pilote : 9/10 et 10/10 à l'optimum mais seulement 3/10 et 5/10 en moins de 400 cycles (médianes 665 et 526) : (b) non reproduit [PILOTE] | Non bloquante. Résultat négatif attendu, publié (L9) |
| **T2.4** | Fourmi, AS : carte α–β | Arborescence moyenne des nœuds; longueur moyenne | Classes G (bon, sans stagnation), ∞ (mauvais, α faible), ∅ (mauvais, stagnation, α élevé); α = 5, β = 2 : arborescence → 2 vers 2500 cycles. G cités : (1;1), (1;2), (1;5), (0,5;5) | Alignement relationnel | Classe reproduite dans ≥ 80 % des cellules; pour (5;2) : arborescence ≤ 2,05 avant 3000 cycles dans ≥ 7 essais sur 10. Seuil ε de l'arborescence non publié : le fixer (p. ex. τ < 1e−6·τ_max) et le déclarer | 10 par cellule (grille 5×4, 20 cellules) | [Dorigo et al. 1996], Fig. 7 et 8 (2500 cycles, 10 essais) | [T]; figure à numériser; classes hors G cités à lire sur la figure [à confirmer] | Non bloquante. Si Fig. 8 inexploitable : restreindre aux 5 cellules citées dans le texte [I, à confirmer] |
| **T2.5** | Fourmi, AS : synergie | « One-ant cycles » = cycles avant l'optimum × m | m ≈ n optimal (grilles r×r, r = 4 à 8); optimum atteint avec 8 à 16 fourmis sur le graphe aléatoire de 16 villes; α = 1 meilleur que α = 0; grille 4×4 : optimum 160 | Alignement relationnel | Optimum toujours trouvé pour m ≥ 4; minimum des one-ant cycles pour m ∈ {8, 16} [à confirmer : la phrase « 8 à 16 » concerne le graphe aléatoire; le minimum de la Fig. 13 (grille 4×4) ne se lit que sur le graphique]; α = 1 meilleur que α = 0 | 5 par m (comme l'article); 20 recommandés | [Dorigo et al. 1996], Fig. 12–13, Sec. V-A | [T] | Non bloquante. Fournit l'ablation « sans canal » (α = 0) de G |
| **T2.6** | Fourmi, ACS | Longueur du tour sur Oliver30 | ACS : moyenne 424,74, σ 2,83, meilleur 423,74; Ant-Q 424,70; Δτ = 0 : 427,52; sans mise à jour locale : 427,31 (meilleur 423,91) | Équivalence (moyenne) et alignement relationnel (ablations) | Moyenne 424,74 ± 1,1 (dossier : ± 2σ/√25); meilleur = 423,741 dans ≥ 1 essai; sans mise à jour locale : moyenne supérieure à celle de l'ACS | 25 (comme l'article); ≈ 57 pour une puissance de 80 % du TOST à ±1,1 [I; calcul à refaire] | [Dorigo et Gambardella 1997], Table I (m = 10, β = 2, q0 = 0,9, α = ρ = 0,1, 2500 itérations, 25 essais) | [T] (équations lues sur image) | Non bloquante; ordre de mise à jour déclaré. Requise par G1 si T2.2(a) échoue |
| **T2.7** | Fourmi, ACS | Meilleur tour entier; tours avant le meilleur | Eil50 : 425 en 1830 tours (réel 427,96); Eil75 : 535 en 3480 (réel 542,37); KroA100 : 21 282 en 4820 (réel 21 285,44) | Alignement relationnel | Meilleur sur 15 essais = valeur publiée; tours médians ≤ 2 × la valeur publiée | 15 | [Dorigo et Gambardella 1997], Table III (20 fourmis, 1250 itérations, 15 essais) | [T]; Eil50 et Eil75 = Eil51 et Eil76 de TSPLIB moins une ville : à reconstituer [dossier] | Non bloquante. Si non reconstituables : déclarer et garder KroA100 |
| **T2.8** | Abeille, ABC (*Apis mellifera*) | Meilleure f par essai (seuil 1e−12 : valeur notée 0) | Griewank décalée 50D : 0 ± 0; Rastrigin 50D : 0 ± 0; Rosenbrock 50D : 0,133109389824 ± 0,262242170275 | Seuil (Griewank, Rastrigin); équivalence (Rosenbrock) | Griewank et Rastrigin : ≥ 90 % des essais < 1e−12. Rosenbrock : moyenne dans [0,01; 0,5] (dossier) et TOST sur l'erreur en log₁₀, marge ±0,5 décade [I, à confirmer]; Mann-Whitney impossible sans données brutes (non publiées) | 30 | [Karaboga et Basturk 2008], Table 3 (colonie 100, limit = n_e·D, MCN 5000, 30 essais) | [T]; pilote : 30/30 et 30/30 < 1e−12; Rosenbrock 0,147 ± 0,172; règle du code : 10/10, 10/10, 0,105 ± 0,103 [PILOTE] | Bloquante pour E2.1 (G1) |
| **T2.9** | Abeille, ABC : effet de `limit` | Moyenne de f, Rastrigin 50D, colonie 20, 100 000 FE | 0,1283 (limit = 0,1·n_e·D); 0,00257 (0,5·n_e·D); 3,58E−14 (n_e·D); 0,0995 (sans éclaireuse) | Alignement relationnel | Moyenne(n_e·D) < moyenne(0,1·n_e·D) et < moyenne(sans éclaireuse); Mann-Whitney, p < 0,05 | 30 | [Karaboga et Basturk 2008], Table 5 et sa note (100 000 FE; 5000 cycles pour une colonie de 20 [I]) | [S : rapport de vérification indépendante]; incohérence avec la Table 4 non expliquée [à confirmer] | Non bloquante. Lancer aussi le réglage de la Table 4 pour documenter l'écart |
| **T2.10** | Abeille, ABC (rapport TR06) | Meilleure f, Rosenbrock 2D | 0,002234 ± 0,002645 (Sphère 5D : 4,45E−17 ± 1,13E−17; Rastrigin 10D : 4,68E−17 ± 2,64E−17, domaine [−600, 600]) | Alignement relationnel | Moyenne dans [0,0005; 0,01] (dossier). Sphère et Rastrigin : critère non défini dans le dossier, non retenus [à confirmer] | 30 | [Karaboga 2005], Table 3 (essaim 20, MCN 2000, 30 essais) | [T]; identité du PDF avec l'original [à confirmer] | Non bloquante; priorité basse |
| **T2.11** | Fourmi, ACO_R | FE moyennes avant le critère (10); taux de succès | Rosenbrock R2 : 820 FE (100 %); Sphère n = 6 : 781 (100 %); Griewangk GR10 : 1390 (61 %); Rosenbrock R5 : 2487 (97 %) | Équivalence (FE) et taux de succès | FE à ± 25 % de la valeur publiée; succès sur GR10 dans [50 %; 72 %] (IC binomial à 95 %, n = 100) | 100 | [Socha et Dorigo 2008], Table 6 (m = 2, ξ = 0,85, q = 0,1, k = 50; ε1 = ε2 = 1e−4) | [T] | Non bloquante; requise par G1 (cellule continue d'ACO) |
| **T2.12** | Abeille, allocation par annonces (*Apis mellifera*) | Performance relative contre l'allocation gloutonne selon la variabilité de la charge | Meilleure que la gloutonne quand la charge est très variable, pas quand elle l'est peu; aucune valeur numérique lue | Alignement relationnel (signes) | Signe selon deux régimes de charge; marges fixées après lecture [à confirmer] | À fixer après lecture [à confirmer] | Nakrani et Tovey 2004 (hors bibliographie; [lacunes](../docs/annexes/audit/lacunes.md), L17; [bio-abeilles](../docs/annexes/audit/bio-abeilles.md), M7) | [R] (résumé relayé par l'audit); texte non lu | G3 : texte lu avant tout code, sinon T2.12 et E2.4 non lancées |

**Cible gelée.** Bees Algorithm ([Pham et al. 2006], [Pham et Castellani 2009], [M] seulement) : aucune cible tant que le texte n'est pas obtenu. **Hors cible** : Tables II et IV de [Dorigo et al. 1996] et la ligne ry48p de la Table I de [Dorigo et Gambardella 1997], sans intérêt pour les hypothèses.

**Déviations connues, à inscrire d'avance au registre.** (i) τ0 de l'AS non publié : paramètre de sensibilité, deux valeurs au moins. (ii) Seuil ε de l'arborescence fixé par nous (T2.4). (iii) q = 0,1 (Sec. 5.2) et non 10⁻⁴ (Table 2) pour ACO_R. (iv) Sélection d'ABC : roulette fit/Σfit et règle du code 0,9·fit/max + 0,1, les deux exécutées (T2.8). (v) Élitisme éventuel de la Table I de 1996, non indiqué [I] : le pilote sans élitisme donne une moyenne plus haute que la valeur publiée de 0,27 à 0,43, et avec e = 8 elle tombe à 423,741. (vi) Eil50 et Eil75 reconstitués (T2.7). (vii) Domaine [−600, 600] de Rastrigin dans [Karaboga 2005], conservé tel que publié pour T2.10. (viii) Budget d'ABC compté en FE (~100 par cycle) : le « MCN » de l'article se convertit en FE.

## 6. Expériences originales

**Gain collectif G dans P2 (Modèle simplifié [I]).** G = (P_coll − P_ref)/(P_max − P_ref), à budget de calcul égal (cadre, section 4), avec P = −erreur normalisée par instance et P_max = l'optimum. Trois références préenregistrées : (1) **agents indépendants sans canal** : AS avec α = 0 (la piste n'influence plus la décision; valeur testée en 1996, T2.5) ou ABC sans phase d'observatrices (aucune sélection partagée); (2) **agent unique à budget égal** : une seule fourmi ou une seule source, tout le budget en série; (3) **colonie à règles** : l'algorithme. Décomposition : *agrégation* = meilleur de m runs indépendants contre l'agent unique; *interaction* = colonie contre meilleur de m indépendants. Robustesse : retrait de 30 % des agents (cadre, section 4) et changement d'environnement (E2.2). Coût : FE, jetons, appels. Opérationnalisation finale : [métriques et typologie](../docs/06-metriques-et-typologie.md) et [plan de recherche](../docs/03-plan-de-recherche.md).

### E2.1 — Grille famille × classe à budget égal (critère C12 du dossier; teste H2.1, H2.2, H2.3)

| Classe | ACO (mémoire par composants) | ABC (solutions complètes) | Références non bio-inspirées |
|---|---|---|---|
| TSP (Oliver30; Eil51 de TSPLIB, dont la citation reste à ajouter à la bibliographie) | ACS et AS élitiste (reproduits : T2.2, T2.3, T2.6, T2.7) | ABC combinatoire (CABC, [Karaboga et Gorkemli 2011]) si ses opérateurs sont lus; sinon ABC **par composants** (voisinage 2-opt, sélection proportionnelle, abandon `limit`), déclaré Modèle simplifié (R9) | 2-opt multi-départs; LK; recherche aléatoire |
| Continu, D = 10 : Rastrigin et Rosenbrock décalées; Rastrigin pivotée | ACO_R (T2.11) | ABC (T2.8) | DE; CMA-ES; recherche aléatoire |

- **Décalage et initialisation.** Optimum non centré pour Rastrigin et Rosenbrock (la Griewank de [Karaboga et Basturk 2008] l'est déjà); initialisation asymétrique (*skewed*, [Socha et Dorigo 2008], Sec. 5.1). Vecteur de décalage et rotation tirés de la graine d'instance. L'effet d'un optimum décentré sur ABC ([Diwold et al. 2011]) n'est pas vérifié : ne pas s'y appuyer.
- **Budget.** FE égal pour toutes les méthodes, décompte documenté (une évaluation par ouvrière, par observatrice et par éclaireuse; une par fourmi et par tour). Checkpoints de FE [à confirmer]. Budget de réglage des paramètres égal (R7); par défaut, valeurs publiées pour ACO et ABC, valeurs par défaut documentées pour les références.
- **Répétitions.** 30 par cellule (dossier), confirmées ou relevées par simulation de la puissance sur algorithmes × instances ([Campelo et Wanner 2019]); au moins 2 instances par classe [I, à confirmer].
- **Analyse.** A12, tests non paramétriques, Holm, IC bootstrap à 95 %. Mesure G (agrégation et interaction) pour les cellules ACO et ABC.
- **Critère de lecture.** H2.1 : interaction des deux A12; H2.2 : différence des A12 entre problème séparable et non séparable; H2.3 : A12 de la référence contre le meilleur bio-inspiré, par problème. Les résultats négatifs sont rapportés. **Préalable : G1.**

### E2.2 — Oubli sous changement d'environnement (teste H2.4)

- **Scénario.** Budget fixe; à FE_c [à confirmer] l'instance change : en TSP, une fraction des villes d'Oliver30 est déplacée; en continu, l'optimum est déplacé (nouveau vecteur de décalage). Amplitude et fraction [à confirmer].
- **Facteurs.** Oubli : ρ ∈ {0,3; 0,5; 0,7; 0,9; 0,999} pour AS (valeurs testées en 1996); `limit` ∈ {0,1·n_e·D; 0,5·n_e·D; n_e·D; sans éclaireuse} pour ABC (valeurs de la Table 5); ξ pour ACO_R (rôle analogue à l'évaporation, [Socha et Dorigo 2008]), niveaux [à confirmer]. Amplitude du changement {petite, grande} [à confirmer].
- **Mesures.** FE de rétablissement (retour à une erreur donnée du nouvel optimum); indice de stagnation (arborescence moyenne des nœuds pour l'AS, T2.4; dispersion des sources pour ABC [I]).
- **Répétitions.** 30 par cellule (dossier, par défaut).
- **Critère de lecture.** H2.4 : courbe en U ou monotone, sur ρ et sur `limit`. Des trois formes d'oubli du cadre (évaporation, abandon, attrition des danses), seules les deux premières sont testées; l'attrition est absente d'ABC.
- **Préalable : G1**, T2.4 (stagnation) et T2.9 (`limit`).

### E2.3 — Agents LLM sur un TSP (extension vers P7; teste H2.5, H2.6)

- **Tâche.** N agents LLM améliorent un tour d'Oliver30 (et d'Eil51 si le budget le permet). La longueur est calculée par le harnais, jamais par le LLM; chaque proposition est validée (permutation) avant d'être chiffrée [I].
- **Régimes.** (a) mémoire d'arêtes partagée : table de scores par arête avec décroissance (granularité composant); (b) tableau de solutions complètes avec scores et compteurs d'échecs (granularité solution; `limit` analogue); (c) sans canal; (d) **témoin orchestré** : orchestrateur central qui reçoit les propositions, retient la meilleure et la redistribue (A1 oui, A2 oui); (e) agent unique à budget égal. Références non agentiques : 2-opt ou LKH, et ACS reproduit, au même nombre de tours évalués.
- **Budget.** Jetons égaux; nombre d'appels = FE. La conversion jetons → FE reste une question ouverte du dossier (question 7); unité provisoire : « tour évalué ».
- **Facteurs.** Régime (5 niveaux) × N [à confirmer] × décroissance de (a) {faible, forte} [à confirmer]; format du signal (scalaire, tuple symbolique, texte plafonné; cadre, section 4) à modèle fixe si le budget le permet.
- **Modèle LLM.** Un seul. Identifiants, tarifs et paramètres re-vérifiés à la porte G2 (`temperature` non réglable sur les modèles récents; effort variable; retrait possible de Haiku 4.5 dès le 2026-10-15; cadre, correction 16). Variabilité mesurée, non contrôlée; le non-déterminisme des réglages « déterministes » est documenté ([Atil et al. 2024]) : journaux complets des échanges, rejeu de l'analyse depuis les journaux (pas des sorties).
- **Répétitions.** n par cellule fixé par un pilote [à confirmer]; pas d'approximation normale à petit n ([Bowyer et al. 2025]) : bootstrap et tests de rangs.
- **Mesures.** Excès relatif au budget; G décomposé; coût (jetons, appels, latence); échecs (taxonomie MAST, [Cemri et al. 2025]). Repère de coût : [Rahman et al. 2025] rapportent un calcul environ 300 fois plus long pour des Boids LLM (aucun chiffre analogue pour l'ACO).
- **Critère de lecture.** H2.5, H2.6; si la référence non agentique domine tous les régimes agentiques, c'est rapporté tel quel (H2.3 étendue). **Préalable : G2.**

### E2.4 — Allocation dynamique distribuée, pont vers la répartition de charge (exploratoire)

- **Plan.** Un flux de requêtes unique est présenté à trois politiques : (i) allocation par annonces et abandon (type Nakrani et Tovey 2004); (ii) allocation stigmergique distribuée (type AntNet, Di Caro et Dorigo 1998); (iii) allocation gloutonne centrale (témoin orchestré). Facteur : variabilité de la charge, au moins deux régimes (très variable, peu variable, comme en T2.12) [à confirmer]. Mesure de performance : celle de l'article, fixée après lecture (G3).
- **Pont agentique [I].** Requêtes envoyées à des agents de capacité limitée; annonces de capacité (i) ou état partagé à décroissance (ii) contre répartiteur central (iii).
- **Critère de lecture.** Pour (i) contre (iii) : le signe de T2.12. Pour (ii) : descriptif, aucune attente publiée (AntNet non lu). Une hypothèse dirigée sera formulée **après lecture et avant le code**; aucun numéro n'est réservé. Le modèle de file d'attente de P4 peut servir pour la charge, à confirmer avec la fiche P4.
- **Statut.** Exploratoire tant que T2.12 n'est pas satisfaite. **Préalable : G3.**

## 7. Parallèle agentique

### 7.1 Relations transposées

Les énoncés portent sur des **relations**, pas sur des termes. Statuts : *Résultat reproduit* (seulement si la cible citée est satisfaite), *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.

| Relation (côté agents) | Mécanisme de colonie | Statut | Appui | Mode d'échec partagé |
|---|---|---|---|---|
| Plus la persistance d'une entrée de l'état partagé est élevée, plus la décision se verrouille sur l'entrée dominante; plus elle est faible, plus l'information accumulée se perd | ρ (persistance) | Analogie. Côté algorithme : Résultat reproduit si T2.4 est satisfaite | Fig. 7 et 8 de [Dorigo et al. 1996] | Verrouillage sur une vieille solution (stagnation, classe ∅) |
| Plus l'état partagé pèse face à l'a priori propre de l'agent, plus les agents copient l'entrée dominante | α et β | Analogie | Classe ∅; dans ReEvo le LLM fournit η ([Ye et al. 2024], [R]) | Grégarité |
| Marquer ce qu'un agent explore le rend moins attirant pour les autres et réduit le travail dupliqué | Mise à jour locale de l'ACS | Analogie. Côté algorithme : Résultat reproduit si T2.6 (ablation) est satisfaite | [Dorigo et Gambardella 1997], Sec. IV-A | Travail redondant sans marquage |
| Un budget borné de réessais avant de repartir de zéro stabilise l'exploration; trop bas, instabilité; absent, acharnement | `limit` | Analogie. Côté algorithme : Résultat reproduit si T2.9 est satisfaite | Table 5 de [Karaboga et Basturk 2008] | Instabilité ou acharnement |
| Allouer la capacité proportionnellement au score affiché des propositions concentre le travail; une proposition surévaluée attire toute la capacité [I] | Roulette des observatrices (≠ danse) | Analogie | Éq. (1) de [Karaboga et Basturk 2008] | Surévaluation |
| Un quota d'exploration forcé préserve la diversité des propositions sur un problème multimodal | Éclaireuses | Hypothèse de l'auteur | Table 5 (colonies de 20) | Perte de diversité |
| L'unité de mémoire partagée (composant ou proposition complète) détermine ce que la décroissance et la sélection peuvent amplifier ou oublier | Granularité | Hypothèse de l'auteur [I] | H2.1, H2.2, H2.5 | À établir |
| Les variables stigmergiques sont les champs d'un état partagé; un tableau noir en est l'environnement et une surface d'attaque | Stigmergie | Analogie appuyée | [Dorigo et al. 2000], p. 853–854; [Nii 1986]; [Han et Zhang 2025]; [Nakamura et al. 2025] (pont vers P6); [Pal et al. 2026] | Empoisonnement de l'état partagé |

### 7.2 Où l'analogie casse

1. **Contrôle central dans la boucle.** L'ACS met à jour globalement avec (L_gb)^−1 sur le meilleur tour global (éq. 4) et l'AS élitiste utilise L*; le choix de l'éclaireuse (source de `trial` maximal) est central; les cycles sont synchrones et l'évaluateur est un oracle. Au niveau de la boucle, ces métaheuristiques sont donc **plus proches de l'orchestration que d'une auto-organisation sans contrôle central** : la typologie du cadre ne s'applique qu'au niveau des règles des agents [I].
2. **Danse sans vecteur.** La « danse » d'ABC ne code ni direction ni distance (sélection proportionnelle) et la table des sources persiste : le canal éphémère de la danse n'est pas modélisé.
3. **Oubli.** `limit` est un abandon déterministe; l'abandon d'une source est probabiliste chez l'abeille. L'« attrition des danses » est un autre mécanisme (cadre, correction 14).
4. **Dépôt en fin de tour.** L'ant-cycle n'est pas biologique; la meilleure variante est la moins fidèle (performance n'est pas fidélité).
5. **Problème statique.** Optimum fixe, évaluation peu coûteuse et déterministe, contre des colonies en environnement changeant et des LLM à évaluation coûteuse et non déterministe ([Atil et al. 2024]). E2.2 corrige une partie de l'écart.
6. **Un agent LLM n'est pas une fourmi.** Il lit du texte et planifie; l'état partagé n'est pas lu par une règle fixe : la correspondance α et β perd son sens quantitatif.
7. **Budget.** FE contre jetons : conversion non établie (question 7 du dossier).
8. **Taxon et fidélité.** Aucune donnée biologique n'est reproduite (section 1) : P2 ne dit rien de la fourmi ni de l'abeille réelles au-delà de ses sources.

### 7.3 Témoin orchestré

- **E2.3 :** orchestrateur central (régime d), même modèle, même budget de jetons, mêmes références non agentiques. Régime de la typologie : orchestration (A1 oui, A2 oui); les régimes (a) et (b) relèvent de l'auto-organisation stigmergique (A1 non, A2 non, état partagé persistant) au niveau des agents.
- **E2.1 :** les références à contrôle central (2-opt, LK, DE, CMA-ES) jouent le rôle de contrôles au sens de Sörensen (H2.3), non de témoin au sens de QR3.
- **E2.4 :** l'allocation gloutonne centrale tient lieu de témoin; sa définition exacte exige la lecture de l'article [à confirmer].

### 7.4 Structure de tâche (QR3) [I]

| Tâche | Structure | Conséquence attendue pour QR3 (à tester) |
|---|---|---|
| TSP, amélioration d'un tour | Longueur additive sur les arêtes, mais contrainte hamiltonienne globale : **couplée**; l'amélioration locale (2-opt) est séquentielle | Avantage possible à l'orchestration (H2.6) |
| Rastrigin décalée | **Séparable** : décomposable coordonnée par coordonnée | Avantage possible à la mémoire par composants (H2.2) |
| Rosenbrock, Rastrigin pivotée | **Non séparable** (couplage en chaîne pour Rosenbrock; formule à transcrire de la Table 1 de 2008 [à confirmer]) | Pas d'avantage attendu pour la mémoire par composants |
| Allocation de requêtes | Requêtes indépendantes, couplées par la capacité : **décomposable** avec couplage faible | Politique distribuée plausible; à lire dans les articles (T2.12) |

### 7.5 Lien avec P7

E2.3 réutilise le harnais de P7 (budget en jetons, journaux, témoin orchestré, taxonomie MAST) et alimente sa grille (architecture, capacité, N, coût). P7 ne dépend d'aucun résultat de P2 (cadre, section 5) : si P2 n'est pas lancé, E2.3 est déclarée non faite. P2 offre à P7 un cadre où deux composantes de R, persistance et adressage, varient à budget égal avec une référence non agentique.

## 8. Visuels et trois niveaux

**Public principal** : étudiants et praticiens de l'agentique; chercheurs pour *Vérifier*. Chaque page le déclare, ainsi que le statut épistémique de chaque graphe ([évaluation de la vulgarisation](../docs/07-vulgarisation-evaluation.md)). Charte : fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues. L'encart « Ce que fait vraiment la reine » ne s'applique pas : ACO et ABC n'ont aucun rôle de reine. Visuels du dossier : V1 carte des pistes d'Oliver30 (reprend la Fig. 6 de [Dorigo et al. 1996]); V2 arborescence moyenne des nœuds; V3 carte de phase α–β cliquable; V4 familles d'arêtes de l'ACS (Fig. 4 à 6 de [Dorigo et Gambardella 1997]); V5 champ de fleurs ABC; V6 archive d'ACO_R (éq. 5 à 9); V7 « retirer la métaphore »; V8 « ce que la colonie retient »; V9 budget juste.

### 8.1 Voir (récit guidé, avec prédiction)

- **Montré et manipulé.** V1 (arêtes d'épaisseur proportionnelle à τ, meilleur tour en surimpression, compteur 423,741 et 420, cycle par cycle); V5 en 2D (contours de Rastrigin, sources, halos proportionnels à `trial`, éclair d'éclaireuse); V8 (écran partagé sur le même problème : matrice de phéromone contre liste de solutions complètes). L'utilisateur avance, recule, met en pause, et **prédit** avant la révélation (par exemple : quelles arêtes s'épaissiront?).
- **Vue de l'agent.** Lecture seule : une fourmi choisie, ses villes permises et leurs p_ij (barres); une abeille choisie, sa source, son voisin et la décision d'acceptation.
- **Modifier la règle.** Non proposé à ce niveau (récit guidé); réservé à *Explorer*.
- **Objectifs d'apprentissage.** OA1 : prédire, avant révélation, que les arêtes du meilleur tour s'épaississent plus vite que les autres, et expliquer qu'aucun agent ne voit la carte entière. OA2 : décrire, avec V8, ce que chaque algorithme garde en mémoire.
- **Accessibilité propre.** L'épaisseur n'est jamais le seul canal : valeur de τ au survol et au focus clavier, et tableau triable des arêtes les plus fortes; description textuelle du tour (ordre des villes); animation remplacée par un pas-à-pas si `prefers-reduced-motion`; halos de V5 doublés d'un nombre.
- **Erreurs de compréhension à prévenir.** « La fourmi cherche le plus court chemin » ou « voit la carte »; « la colonie décide »; « le contour 2D est le problème de dimension 50 » (V5 est un Modèle simplifié, à déclarer sur la page).

### 8.2 Explorer (bac à sable étayé)

- **Montré et manipulé.** V2 (courbe de l'arborescence moyenne, ligne à 2 de stagnation, curseurs α, β, ρ); V3 (carte de phase α–β remplie à mesure que l'utilisateur lance des essais); V4 (barres BE, TE, UE; une arête « pâlit » à chaque passage); V6 (k cloches de poids ω_l et de largeur σ; curseurs q et ξ); V7 (bascule fourmis et abeilles contre opérateurs neutres).
- **Vue de l'agent.** Sélection d'une fourmi ou d'une abeille avec ses entrées locales (τ, η; source, voisin) et la probabilité de son choix.
- **Modifier la règle.** Persistance ρ (libellé « persistance », avec l'évaporation déduite affichée), α, β, q0; activer ou couper la mise à jour locale; `limit` et éclaireuses; sélection par roulette ou règle du code; ordre de mise à jour; α = 0 (« sans canal »). Chaque modification est étiquetée « hors réplication ».
- **Objectifs d'apprentissage.** OA3 : prévoir l'effet d'une persistance élevée sur la stagnation et reconnaître la classe ∅. OA4 : distinguer mémoire par composants et mémoire par solutions complètes sur un même problème. OA5 : expliquer ce que le bouton « retirer la métaphore » change et ce qu'il ne change pas.
- **Accessibilité propre.** Curseurs au clavier (flèches), valeur numérique visible, focus visible; carte de phase navigable comme une grille; région d'annonce vocale pour la meilleure longueur, à débit limité; l'interface mobile place les curseurs sous la carte.
- **Erreurs de compréhension à prévenir.** « ρ est l'évaporation » (en 1996, persistance); « le dépôt se fait en marchant » (ant-cycle : en fin de tour); « la danse d'ABC code la direction »; « piste = chemin, danse = lieu »; « plus de cycles, plus de travail ».

### 8.3 Vérifier (reproduction, distributions, code, limites)

- **Montré et manipulé.** V9 (abscisse en FE, trois courbes : ACO, ABC, référence non bio-inspirée); distribution sur N graines (ECDF) avec IC; tableau des cibles T2.1 à T2.12 avec verdict (équivalence : IC90 % et marge TOST) et registre des déviations; code et manifeste de run; limites (« l'AS n'était pas compétitif face aux heuristiques spécialisées », note 4 et Sec. VI-A; T2.3 non reproduite; certificat d'optimalité absent).
- **Vue de l'agent.** Trace par agent tirée du journal d'un run (graine choisie).
- **Modifier la règle.** Reconfigurer exactement les paramètres publiés et rejouer une graine; aucune modification libre, pour ne pas confondre réplication et exploration.
- **Objectifs d'apprentissage.** OA6 : expliquer pourquoi comparer en cycles trompe ([Mernik et al. 2015]). OA7 : lire un verdict d'équivalence et distinguer non-rejet et équivalence. OA8 : citer un cas où une référence non bio-inspirée égale ou bat la méthode bio-inspirée.
- **Accessibilité propre.** Courbes accompagnées d'un tableau de données; ECDF lisibles sans couleur (styles de trait et marqueurs); verdicts en texte, pas en couleur seule.
- **Erreurs de compréhension à prévenir.** « bio-inspiré = meilleur »; « 423,741 est un optimum prouvé » (confirmé par 2-opt multi-départs; certificat à produire); « reproduire l'algorithme valide le modèle du vivant ».

Les seuils de réussite des objectifs d'apprentissage et la condition témoin statique relèvent du [document d'évaluation](../docs/07-vulgarisation-evaluation.md); cette fiche n'en fixe aucun.

## 9. Plan de simulation

**Couches ([cadre](../docs/00-cadre.md), section 7).**

| Couche | Contenu pour P2 |
|---|---|
| 1. Noyau commun | PRNG à graine, horloge à pas fixe (1 pas = 1 cycle ou 1 itération), compteur de FE indépendant, enregistreur, scénario, manifeste de run ([spécification](../docs/05-spec-simulation.md)). Non utilisés : RK4, SSA, grille. |
| 2. Modèles de référence | AS, ACS, ACO_R, ABC, chacun validé contre sa cible T; références DE, 2-opt multi-départs et recherche aléatoire; CMA-ES et LK selon R8. Interface commune « problème + budget ». |
| 3. Modèle chorégraphique commun | Seul le canal est interchangeable. P2 l'emploie pour le préréglage de canal (section 4.2) et le docking D2; E2.1 s'exécute sur les modèles de référence. |

**N d'agents.** AS : m = n = 30 sur Oliver30 (T2.2 à T2.5). ACS : m = 10 (T2.6), 20 (T2.7). ACO_R : m = 2, archive k = 50. ABC : colonie 100 (T2.8), 20 (T2.9, T2.10); code de [Sahin 2020] : colonie 50. E2.1 : valeurs publiées par défaut; ajustements fixés au préenregistrement [à confirmer].

**Graines.** 30 par cellule par défaut (les nombres propres à chaque cible sont ceux de la section 5), dérivées d'une graine maîtresse consignée au préenregistrement; mêmes indices de graine et mêmes instances pour tous les algorithmes (comparaison appariée). Le manifeste consigne version du code, graines, paramètres, somme de contrôle des instances, version de Node.

**Budgets de performance.** Coût de l'AS par cycle : n²·m = 27 000 opérations élémentaires pour n = m = 30; T2.2 complète : NC_MAX × n² × m × 30 essais ≈ 4,05·10⁹ opérations [I; calcul]. ABC : ≈ 500 050 FE par essai (pilote, dossier, section 4.1), soit ≈ 1,5·10⁷ évaluations pour 30 essais [I]. Le moteur headless mesure et consigne le temps de T2.2 et de T2.8; seuils d'acceptation [à confirmer]. La couche navigateur (Canvas, 30 villes) fixe sa cible d'images par seconde par mesure sur un appareil de référence [à confirmer].

**Docking.**
- **D1** : le moteur TypeScript contre les implémentations Python indépendantes des pilotes (`../recherche/verifications-numeriques/p2_*.py`), par TOST sur les distributions de 30 graines; marge [à confirmer].
- **D2** : le modèle chorégraphique commun configuré en canal « composants à persistance » et en canal « solutions complètes à abandon » doit redonner les verdicts de T2.2(a) et T2.8. S'il ne peut pas exprimer ces canaux, le docking est déclaré non applicable et justifié. Décision à prendre avec S0 (R11).
- Ordre de mise à jour : facteur testé une fois par modèle (cadre, section 6; [Caron-Lormier et al. 2008]).

**Sorties.** Tableau des runs (identifiant, algorithme, hachage des paramètres, graine, FE, meilleure valeur, courbe aux checkpoints); manifestes; tours et meilleures solutions en JSON; figures de la page *Vérifier*; registre des déviations; journaux complets d'E2.3. Emplacement et formats : [spécification](../docs/05-spec-simulation.md).

## 10. Livrables et critères d'achèvement

Périmètres : **P2-noyau** (T2.1 à T2.11, E2.1, E2.2, H2.1 à H2.4), **P2-agentique** (E2.3, H2.5, H2.6), **P2-allocation** (T2.12, E2.4). P2 est déclaré achevé sur son périmètre si les portes des périmètres suivants ne sont pas franchies (R10, R2); le périmètre atteint est alors écrit dans la note de recherche.

| # | Livrable | Critère d'achèvement vérifiable |
|---|---|---|
| L1 | **Note de recherche** (français; algorithmes décrits par composants, sans métaphore; thèse remplacée; limites) | Chaque cible T du périmètre porte un verdict (acceptée; refusée avec déviation; non lancée avec la porte citée). Chaque H du périmètre porte un verdict (confirmée, réfutée, non concluante). Chaque étiquette existe dans la bibliographie; chaque valeur numérique a une source ou la marque [à confirmer]. `node outils/verifier-docs.ts` ne signale aucune erreur sur la note. |
| L2 | **Fiches de reproduction**, une par cible T | Équations, paramètres, unités, figure cible numérisée (T2.4, T2.5), critère chiffré et marge TOST, écrits **avant** le code : chaque fiche est committée avant le premier commit du code du modèle (historique git). |
| L3 | **Code** TypeScript : moteur headless Node, modèles, références, couche navigateur | `tsc --noEmit` sans erreur; exécution directe du `.ts` par Node; aucune frontière de langage (hors R8, avec justification). |
| L4 | **Tests** | Un test à assertions par cible : T2.1 (423,741 ± 0,001 en réel, 420 en entier, ordre identité 424,635), conversion persistance/évaporation (divergence à 0,99), compteur de FE égal au nombre d'appels de f, même graine donne même sortie, verdicts de T2.2 à T2.11, docking D1. Tous passent (`node --test`); une exécution complète est liée au manifeste. |
| L5 | **Données** | Tableaux de runs, manifestes, instances (Oliver30 depuis [Dower s.d.], avec somme de contrôle et provenance; TSPLIB), journaux d'E2.3. Chaque figure de la note se régénère depuis les données par une commande documentée. Licence et dépôt selon la [note de science ouverte et d'éthique](../docs/08-science-ouverte-ethique.md). |
| L6 | **Préenregistrement** | Plan ADEMP ([Siepe et al. 2024]) d'E2.1 (H2.1 et H2.3 confirmatoires), déposé ([OSF 2026]) avant les runs confirmatoires, avec marges, SESOI, graines, budgets et tests figés; déviations consignées ([Willroth et Atherton 2024]; [Lakens 2024]). L'horodatage du dépôt précède le premier run confirmatoire; H2.2 et H2.4 à H2.6 sont déclarées exploratoires. |
| L7 | **Pages** V1 à V9, trois niveaux | Chaque page déclare son public principal et le statut épistémique de chaque graphe; contrôles d'accessibilité de la liste du [document d'évaluation](../docs/07-vulgarisation-evaluation.md) (WCAG 2.2 AA, `prefers-reduced-motion`, clavier, mobile, daltonisme); V5 déclaré Modèle simplifié; bouton « retirer la métaphore » présent. |
| L8 | **Évaluation** des pages | Pré-test, post-test et condition témoin statique pour OA1 à OA8, selon le document d'évaluation; résultat rapporté, ou page marquée « non évaluée ». |
| L9 | **Registre des déviations et résultats négatifs** | Les déviations (i) à (viii) de la section 5 y figurent; T2.3 est rapportée; toute réfutation de H2.1 ou H2.3 l'est aussi. |
| L10 | Diffusion (facultative) | Cibles possibles : ANTS ([ANTS 2026] : édition 2028 annoncée, lieu non trouvé), GECCO ([GECCO 2027], échéances 2027 [à confirmer]), *Swarm Intelligence* ([Swarm Intelligence 2026]; aucun format Registered Report trouvé). Description sans métaphore. |

## 11. Risques et réserves

La numérotation R1 à R13 est locale à cette fiche; le [plan de recherche](../docs/03-plan-de-recherche.md) la consolide.

| R | Risque ou réserve | Plan B ou porte |
|---|---|---|
| R1 | **G0 non atteinte** (phases 1 et 2 en retard) | P2 n'est pas lancé; aucun livrable obligatoire perdu; revue à chaque fin de phase |
| R2 | **Sources non lues** : [Karaboga et Basturk 2007] et [Karaboga et Akay 2009] (non vérifiées), [Diwold et al. 2011], Bees Algorithm, Nakrani et Tovey 2004, Di Caro et Dorigo 1998, [Dorigo et Stützle 2004], texte intégral de [Sörensen 2015] (accès refusé). Les équations canoniques d'ABC reposent sur [Sahin 2020] et l'éq. (1)–(2) de 2008, non sur ces articles; la cible T2.12 et E2.4 dépendent de deux articles non lus | N'implémenter que ce qui est lu (section 4.8); cibler la Table 3 de 2008 plutôt que l'article de 2007; accès aux éditeurs; porte G3 |
| R3 | **Pilotes non relancés** par la vérification indépendante : les « satisfait » [PILOTE] ne sont pas des verdicts | Tout est rejoué dans le moteur TypeScript, avec le docking D1 |
| R4 | **τ0 non publié** et élitisme de la Table I non indiqué : T2.2(b) fragile, T2.3(b) non reproduit | Sensibilité à τ0 (au moins 2 valeurs); déviations (i) et (v); consulter la thèse de Dorigo (1992) et [Dorigo et Stützle 2004] (question 2 du dossier) |
| R5 | **Valeurs [à confirmer]** : minimum de la Fig. 13 (T2.5); ε de l'arborescence (T2.4); cause de l'écart entre les Tables 4 et 5 (T2.9); identité du PDF de [Karaboga 2005]; pagination de [Whitley et al. 1989]; certificat d'optimalité d'Oliver30; version 4.0 de [Aranha et al. 2022]; formule de Rosenbrock; origine de la forme (1−ρ) de la v3; toutes les marges et SESOI de la fiche | Figer au préenregistrement; déclarer au registre |
| R6 | **Puissance et marges** : le critère du dossier (valeur dans l'IC95 %) est un non-rejet; le n du dossier peut être insuffisant (T2.6 : ≈ 57 contre 25) [I] | Simuler la puissance ([Campelo et Wanner 2019]) avant les runs; relever n (runs peu coûteux); marge justifiée avant; issue « indéterminée » rapportée telle quelle |
| R7 | **Comparaison inéquitable** (réglage, implémentation, comptage de FE) : risque de supériorité spurieuse ([Pawel et al. 2024]) | Budget de réglage égal, comptage unique des FE, mêmes graines et instances, préenregistrement, revue du code des références |
| R8 | **Références lourdes** : LK et CMA-ES à écrire ou importer; OR-Tools imposerait une frontière de langage (cadre, section 7) | DE, 2-opt multi-départs (déjà recalculé par le pilote) et recherche aléatoire; absence de LK ou CMA-ES déclarée; pas de pont de langage sans mesure |
| R9 | **Cellules croisées non fidèles** : opérateurs de CABC non lus; pas de version TSP d'ACO_R | ABC par composants déclaré Modèle simplifié, jamais nommé CABC; H2.1 conclue sous cette réserve |
| R10 | **Agentique** : non-déterminisme ([Atil et al. 2024]), paramètres et identifiants LLM changeants (cadre, correction 16), coût, conversion jetons → FE non établie | Pilote avant dimensionnement; journaux complets; évaluation des tours par le harnais; réduire à un pilote ou renvoyer à P7; porte G2 |
| R11 | **Docking D2** partiel ou inapplicable : le modèle chorégraphique commun est conçu autour de modèles spatiaux, P2 est une optimisation à état partagé | D2 déclaré non applicable avec justification; D1 conservé; décision avec S0 |
| R12 | **Vulgarisation** : métaphore (Sörensen), anthropomorphisme, confusion réplication/validation | V7, libellés neutres, statut épistémique sur chaque graphe, limites affichées (note 4 de [Dorigo et al. 1996]) |
| R13 | **Typologie** : au niveau de la boucle, ACO et ABC ne sont pas « sans contrôle central » (section 7.2), ce qui nuance leur classement dans la typologie du cadre | Nuance écrite dans la note; à remonter dans [métriques et typologie](../docs/06-metriques-et-typologie.md) |

## 12. Effort et dépendances

**Estimation en semaines-personne [estimation, à confirmer].**

| # | Tâche | sem.-pers. | Préalable |
|---|---|---|---|
| 1 | Fiches de reproduction T2.1 à T2.12 (numérisation des Fig. 7, 8, 12 et 13 incluse) | 1,5 | G0 |
| 2 | Instances, compteur de FE, certificat Concorde | 1 | S0 |
| 3 | AS et ACS, tests T2.1 à T2.7 | 2 | 1, 2 |
| 4 | ABC et ACO_R, tests T2.8 à T2.11 | 2 | 1, 2 |
| 5 | Références (DE, 2-opt, recherche aléatoire; LK et CMA-ES selon R8) | 1,5 | 2 |
| 6 | Préenregistrement ADEMP et dimensionnement de la puissance | 1 | 3, 4, 5 |
| 7 | E2.1 (runs, analyse) | 2 | G1 |
| 8 | E2.2 | 1,5 | G1 |
| 9 | Visuels V1 à V9, trois niveaux | 3 | gabarit V0; 3, 4 |
| 10 | Évaluation des pages | 1 | 9 |
| 11 | Note de recherche | 1,5 | 7, 8 |
| | **Sous-total P2-noyau** | **18,0** | |
| 12 | E2.3 (agentique) | 3 | G2 |
| 13 | T2.12 et E2.4 (lecture, code, runs) | 2 | G3 |
| | **Total, périmètre complet** | **23,0** | |

**Prérequis.** S0 (noyau, harnais, manifeste); V0 (gabarit, charte, évaluation); phases 1 et 2 achevées (G0); pour E2.3, le harnais de P7; pour T2.12 et E2.4, l'accès aux deux articles non lus (R2). Documents transversaux : [protocole de reproduction](../docs/04-protocole-reproduction.md), [spécification de simulation](../docs/05-spec-simulation.md), [métriques et typologie](../docs/06-metriques-et-typologie.md), [évaluation de la vulgarisation](../docs/07-vulgarisation-evaluation.md), [science ouverte et éthique](../docs/08-science-ouverte-ethique.md), [glossaire](../docs/10-glossaire.md). Aucun projet ne dépend de P2.

**Ordre.** G0, puis 1, 2; 3, 4 et 5 en parallèle si la capacité le permet; 6; porte G1; 7 et 8; 9 et 10; 11; porte G2, puis 12; porte G3, puis 13.

## 13. Références clés

Statut : celui de la [bibliographie](../docs/11-bibliographie.md). Lecture : niveau atteint dans le dossier.

| Étiquette | Rôle dans P2 | Statut | Lecture |
|---|---|---|---|
| [Dorigo et al. 1996] | AS; T2.1 à T2.5 | vérifiée | [T] postprint |
| [Dorigo et Gambardella 1997] | ACS; T2.6, T2.7 | vérifiée | [T] |
| [Socha et Dorigo 2008] | ACO_R; T2.11; définition d'ACO | corrigée | [T] |
| [Karaboga 2005] | ABC (rapport TR06); T2.10 | corrigée | [T]; identité du PDF [à confirmer] |
| [Karaboga et Basturk 2008] | ABC; T2.8, T2.9 | vérifiée | [T] |
| [Karaboga et Basturk 2007] | ABC (article de revue) | **non vérifiée** | [M] |
| [Karaboga et Akay 2009] | Étude comparative d'ABC | **non vérifiée** | [M] |
| [Sahin 2020] | Code de référence d'ABC | corrigée | [T] (code) |
| [Karaboga et Gorkemli 2011], [Karaboga et Gorkemli 2019], [Kashan et al. 2012] | ABC combinatoire et binaire | vérifiée | [M], [R], [M] |
| [Pham et al. 2006], [Pham et Castellani 2009] | Bees Algorithm (cible gelée) | vérifiée | [M] |
| [Whitley et al. 1989], [Dower s.d.] | Source d'Oliver30 et coordonnées | vérifiée | [M] (pagination [à confirmer]), [T] |
| [Dorigo et Stützle 2004] | Livre ACO (origine de la forme de la v3 à établir) | vérifiée | [M], non lu |
| [Sörensen 2015], [Sörensen et al. 2018] | Critique des métaphores | vérifiée, corrigée | [R], [T] |
| [Camacho-Villalón et al. 2023], [Aranha et al. 2022], [Mernik et al. 2015] | Critique par composants; appel à l'action; budget en FE | vérifiée | [R], [M], [R] |
| [Diwold et al. 2011] | Optimum décentré et ABC | **non vérifiée** | [M] |
| [Dorigo et al. 2000], [Heylighen 2016], [Nii 1986] | Stigmergie, tableau noir | vérifiée, vérifiée, corrigée | [T], [M], non précisé |
| [Han et Zhang 2025], [Salemi et al. 2025], [Nakamura et al. 2025], [Pal et al. 2026] | Tableaux noirs LLM, surface d'attaque, stigmergie entre agents | corrigée, vérifiée, vérifiée, vérifiée | [R] (Pal : prépublication non évaluée) |
| [Yang et al. 2023], [Ye et al. 2024], [Liu et al. 2024] | LLM et métaheuristiques | vérifiée, vérifiée, corrigée | [R] |
| [Rahman et al. 2025], [Atil et al. 2024], [Cemri et al. 2025], [Bowyer et al. 2025] | Coût des essaims LLM; non-déterminisme; taxonomie MAST; statistique à petit n | corrigée, vérifiée, corrigée, vérifiée | [R] |
| [Sherman et Visscher 2002], [Donaldson-Matasci et Dornhaus 2012], [Beekman et Lew 2008] | Dépendance du signal à l'environnement (QR0), traitée dans P1 et P8 | vérifiée | non reprises ici |
| [Goss et al. 1989], [Seeley et al. 1991], [Camazine et Sneyd 1991] | Pont double; abandon probabiliste de la source | vérifiée, corrigée, corrigée | [S] (résumés) |
| [Axtell et al. 1996], [Wilensky et Rand 2007], [Grimm et al. 2020], [Caron-Lormier et al. 2008] | Niveaux d'équivalence, ODD, ordre de mise à jour | vérifiée, vérifiée, corrigée, corrigée | voir [dossier x-methodes](../recherche/dossiers/x-methodes.md) |
| [Campelo et Wanner 2019], [Derrac et al. 2011], [Arcuri et Briand 2011], [Bartz-Beielstein et al. 2020], [Pawel et al. 2024] | Statistique et benchmarking d'algorithmes | vérifiée | [R], [M], [M] et [R], [R], non précisé |
| [Siepe et al. 2024], [OSF 2026], [Willroth et Atherton 2024], [Lakens 2024] | Préenregistrement et déviations | vérifiée | voir dossier x-methodes |
| [ANTS 2026], [GECCO 2027], [Swarm Intelligence 2026] | Diffusion | vérifiée, **non vérifiée**, vérifiée | [S] |

**Références absentes de la bibliographie du programme, à y ajouter** (elles ne sont pas citées entre crochets dans cette fiche) :

| Œuvre | Citation (d'après l'audit) | Lecture |
|---|---|---|
| Nakrani et Tovey 2004 | Nakrani, S., Tovey, C. (2004). On honey bees and dynamic server allocation in Internet hosting centers. *Adaptive Behavior*, 12. <https://doi.org/10.1177/105971230401200308> | [M] [R] (audit lacunes et bio-abeilles); texte non lu |
| Di Caro et Dorigo 1998 | Di Caro, G., Dorigo, M. (1998). AntNet: distributed stigmergetic control for communications networks. *JAIR*. <https://doi.org/10.1613/jair.530> | [M] (audit lacunes); texte non lu |

S'y ajoutent, sans entrée propre : Krink et al. 2004 et Goldberg 1989 (citées par la Table 3 de [Karaboga et Basturk 2008], non lues), TSPLIB (instances Eil), MMAS (cité par le dossier, non lu).

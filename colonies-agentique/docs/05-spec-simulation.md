# Spécification de la simulation (S0)

**Statut :** spécification technique du socle S0. Elle applique [00-cadre.md](00-cadre.md) (section sur l'architecture de simulation), qui prime en cas de conflit.
**Date :** 2026-10-01. **Régime :** production. Le chercheur va construire le noyau, les modèles de référence et les pages à partir de ce document.

**Ce que le document fixe :** les couches, la méthode d'intégration par type de modèle, le contenu du noyau, les interfaces de principe, l'arborescence, les formats d'export, le déterminisme, la stratégie de tests, les balayages, les budgets de performance, le spike de la phase 0, les limites de la couche navigateur et la rejouabilité.
**Ce qu'il ne fixe pas :** équations, paramètres et cibles d'un projet (fiches dans `../projets/`); seuils de décision statistique et registre des déviations ([04-protocole-reproduction.md](04-protocole-reproduction.md)); construits R et G et typologie ([06-metriques-et-typologie.md](06-metriques-et-typologie.md)); appels d'API, journaux et cassettes de P7 ([fiche P7](../projets/P7-synthese-agentique.md)); charte et évaluation des pages ([07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md)); licences, DOI, éthique ([08-science-ouverte-ethique.md](08-science-ouverte-ethique.md)).

**Sources.** Audit [simulation-technique](annexes/audit/simulation-technique.md); dossiers [x-methodes](../recherche/dossiers/x-methodes.md), [x-choregraphie](../recherche/dossiers/x-choregraphie.md), [p1-recrutement](../recherche/dossiers/p1-recrutement.md), [p4-regulation](../recherche/dossiers/p4-regulation.md), [p5-quorum](../recherche/dossiers/p5-quorum.md), [p9-mouvement-collectif](../recherche/dossiers/p9-mouvement-collectif.md); pour les modèles des autres projets, les dossiers [p2](../recherche/dossiers/p2-optimisation.md), [p3](../recherche/dossiers/p3-division-travail.md), [p6](../recherche/dossiers/p6-pathologies.md), [p7](../recherche/dossiers/p7-agents-llm.md) et [p8](../recherche/dossiers/p8-individu-colonie.md), lus seulement pour la nature des modèles et leurs charges.

**Légende.** Une valeur numérique porte sa source (étiquette de [11-bibliographie.md](11-bibliographie.md) ou dossier). **[I]** : inférence ou calcul de ce document, ou choix de conception. **[à confirmer]** : valeur dont une mesure ou une lecture doit trancher; interdite dans un run confirmatoire. Les noms de fichiers, de types et de fonctions, et les valeurs de conception propres à ce document (tailles de tests, nombres de travailleurs, durées visées), sont des propositions [I]. Les cibles de vérification du socle sont les `T0.n` : `T0.n` reprend `X<n>` du dossier x-methodes, selon le protocole de reproduction, et la section 9.6 les liste avec leur correspondance.

**Contrôles faits en rédigeant** (2026-10-01, Node v24.19.0, TypeScript 7.0.2, Windows 11) : (a) les vecteurs T0.1 et T0.3 passent sous `node --test` sur des fichiers `.ts`, sans tsconfig ni build; (b) les interfaces de la section 5 passent `tsc --noEmit` avec `strict`, `erasableSyntaxOnly` et `verbatimModuleSyntax`; (c) un `enum` est refusé par `tsc` et par Node. Rien d'autre n'a été exécuté : aucune mesure de performance, aucun essai en navigateur. Tout ce qui touche la performance et l'hébergement reste donc à mesurer (section 12).

---

## 1. Règles directrices

| # | Règle | Contrôle |
|---|---|---|
| 1 | Un calcul de simulation vit dans `core/` ou `models/`, nulle part ailleurs. | `tests/conformance.test.ts` (imports, motifs interdits) |
| 2 | Même scénario, même graine, même moteur JavaScript, même version du noyau : même empreinte d'état, au bit près. | T0.26 |
| 3 | Un modèle de référence fidèle par article, dans la forme publiée (EDO, Monte Carlo, SSA, agents, métaheuristique). Aucun moteur unique « fourmi ou abeille ». | fiche de projet, `T<projet>.<n>` du projet |
| 4 | Le modèle chorégraphique commun n'est utilisé qu'après docking sur la référence concernée. | porte de la fiche; section 2.4 |
| 5 | Aucun run confirmatoire ne s'appuie sur un paramètre `to-confirm`. | `compileScenario` refuse |
| 6 | TypeScript partout. WASM seulement si une mesure l'exige (section 11). | SPK10 |
| 7 | On mesure avant d'optimiser; un budget sans mesure est une hypothèse. | section 12 |
| 8 | Toute page qui affiche un résultat peut le rejouer (scénario, graine, interventions) ou dit qu'elle ne le peut pas. | section 15 |
| 9 | Tout résultat confirmatoire sort du moteur headless Node, version figée; la page rejoue ou explore, et un calcul de page porte l'étiquette « calcul navigateur, non confirmatoire » (cf. [04-protocole-reproduction.md](04-protocole-reproduction.md), section sur le déterminisme entre moteurs). | `regime` du manifeste; section 14 |

---

## 2. Architecture : trois couches, deux sorties

### 2.1 Vue d'ensemble

```
 Sorties   moteur headless Node (src/cli, src/sweep)        couche navigateur (src/browser)
           balayages, tests, rejeu, export                   worker + rendu + export, aucun calcul propre
                      \                                         /
 Couche 3   modèle chorégraphique commun (src/models/choreography)
            agents + environnement + CANAL interchangeable
                      |  aligné par docking sur chaque référence
 Couche 2   modèles de référence, un par article (src/models/reference/<projet>-<article>)
                      |  utilisent
 Couche 1   noyau commun (src/core) : PRNG, horloge, RK4, Euler–Maruyama, SSA,
            événements discrets, grille, enregistreur, scénario, manifeste
```

Le noyau est mince (quelques centaines de lignes visées [I]; l'audit [simulation-technique](annexes/audit/simulation-technique.md) l'estime ainsi, sans ECS ni bibliothèque physique). Les deux sorties exécutent le **même code** : la page est un bundle de `core/` et `models/`, pas une réécriture.

### 2.2 Dépendances autorisées

| Dossier | Peut importer | Ne peut pas importer |
|---|---|---|
| `core/` | rien (aucune API Node, aucune API navigateur) | tout le reste |
| `models/reference/` | `core/` | `models/choreography/`, `policies/`, `browser/`, `cli/` |
| `models/choreography/` | `core/`, `models/reference/` (pour le docking seulement), `policies/` | `browser/`, `cli/` |
| `policies/` | `core/` | `browser/` (les appels réseau vivent dans `cli/`) |
| `analysis/` | `core/` | `models/`, `browser/` |
| `sweep/`, `cli/` | tout sauf `browser/` | `browser/` |
| `browser/` | `core/`, `models/`, `policies/` (règles seulement), `analysis/` | `cli/`, `sweep/`, API Node |

Le contrôle est un test de conformité (section 9.1) : balayage des `import` et des motifs interdits (section 7.2). Le dossier `core/` doit compiler sous les deux configurations TypeScript de la section 13, ce qui interdit à `core/` toute API Node.

### 2.3 Le canal, seul composant interchangeable de la couche 3

Le cadre fixe que, dans le modèle chorégraphique commun, seul le canal change : persistance, portée, adressage, format. Ce sont les composantes du vecteur R de [00-cadre.md](00-cadre.md); l'information effective I(M;W)/H(W) est une **mesure** faite par l'enregistreur sur le journal du canal (définition dans [06-metriques-et-typologie.md](06-metriques-et-typologie.md)), pas un réglage.

| Implémentation | Persistance τ | Portée | Adressage | Format | Visée | Statut épistémique |
|---|---|---|---|---|---|---|
| `field` (champ de piste) | évaporation exacte : demi-vie ou facteur par pas | locale (capteurs sur grille) | diffusion locale | scalaire | piste de masse [Goss et al. 1989] | Modèle simplifié (le signal réduit à un scalaire est une simplification de modèle, cadre) |
| `dance-floor` (piste de danse) | expiration des danses | locale (surface de contact) | diffusion éphémère; la suiveuse **tire une danseuse au hasard** | tuple (direction, durée croissante avec la qualité) | danse [Seeley et al. 1991] | Modèle simplifié |
| `blackboard` (tableau noir) | TTL ou compaction | globale ou par sujet | lecture par contenu | tuple ou texte plafonné | état partagé d'un système d'agents [Han et Zhang 2025] | Analogie |
| `messages` | aucune | destinataire | dirigé | texte plafonné | messages adressés; support du témoin orchestré | Analogie |

L'oubli a trois formes distinctes (cadre) : l'évaporation et l'expiration relèvent du canal (`persistence`); **l'abandon est une règle de la politique**, pas du canal. Le code ne les confond pas.

Chaque composante a une **valeur neutre** (persistance `none`, portée `global`, adressage `broadcast`, format `scalar`). Elle permet de réduire le modèle commun à la référence, puis d'ajouter **un composant à la fois** pendant le docking (procédure de [04-protocole-reproduction.md](04-protocole-reproduction.md), section Docking).

### 2.4 Docking

Le docking aligne deux modèles; la **validation** compare à des données empiriques, et le programme ne confond jamais les deux (principe 1 du cadre). Pour chaque référence qui a une extension spatiale :

1. mêmes observables dans les deux modèles, choisies avant le code; table de correspondance des paramètres (delta-ODD du canal);
2. niveau d'accord déclaré (équivalence distributionnelle ou relationnelle, [Axtell et al. 1996]; « alignement relationnel » chez [Wilensky et Rand 2007]) et marge δ fixée avant les runs;
3. n répétitions calculé pour la marge (section 9.3), mêmes graines maîtres dans les deux modèles, analyse appariée par graine (les deux modèles ne consomment pas leurs tirages dans le même ordre : le pairage est une convention d'analyse, pas une corrélation attendue des trajectoires) [I];
4. verdict et manifeste archivés; échec = déviation au registre, et la couche 3 reste fermée pour cette référence.

Procédure complète (réduire le modèle commun à la référence, ajouter un composant à la fois, critère d'achèvement) : [04-protocole-reproduction.md](04-protocole-reproduction.md), section Docking. Ce document ne fixe que ce que le moteur doit permettre.

Les modèles du socle (les étalons M1c et M6 du dossier P5, qui servent aussi de banc d'essai) sont implantés deux fois, par deux voies indépendantes : TypeScript (moteur) et le script Python de `recherche/verifications-numeriques/` (oracle), selon la recommandation de [x-methodes](../recherche/dossiers/x-methodes.md) (M3, [Edmonds et Hales 2003]).

---

## 3. Méthode d'intégration selon le type de modèle

Les résultats publiés viennent de modèles de natures différentes. Chaque modèle de référence garde sa forme publiée et le noyau fournit la méthode qui lui correspond.

### 3.1 Tableau par projet

Types : **EDO** (équations différentielles ordinaires, champ moyen déterministe), **EDS** (équations différentielles stochastiques), **MC** (Monte Carlo à temps discret), **SSA** (algorithme de Gillespie), **PTD** (Poisson à temps discret), **DES** (événements discrets), **AGT** (agents), **META** (métaheuristique), **FERMÉ** (formules fermées). Une cellule « fiche » signifie que la fiche du projet fixe la valeur à la lecture de la source.

| Projet | Modèle de référence (source) | Type | Méthode (module du noyau) | Pas ou horloge |
|---|---|---|---|---|
| S0 | Équations moyennes M1c de [Seeley et al. 2012], banc d'essai | EDO | RK4 (`rk4`) | h fixé par test d'ordre (T0.4) |
| S0 | M1c à N fini | SSA | méthode directe de [Gillespie 2007] (`ssa`) | temps continu |
| S0 | Processus d'Ornstein–Uhlenbeck (éq. 3 de [Pais et al. 2013], a = 0) | EDS | Euler–Maruyama (`euler-maruyama`) | dt ≤ 0,01 (x-choregraphie), vérifié à dt/2 |
| P1 | Pont à deux branches, éq. (1)–(3), retards de 20 s et de 20r s [Goss et al. 1989] | MC avec retards | boucle à pas fixe; retards en tampon circulaire | 1 s [I, pas de la réimplantation du dossier P1] |
| P1 | Sept compartiments [Seeley et al. 1991]; version détaillée [Camazine et Sneyd 1991] | EDO | RK4 | h = 0,01 min dans la réimplantation du dossier; critère du dossier : h ≤ 0,05 min et stabilité à h/2 |
| P1 | EDS d'Itô de [Dussutour et al. 2009] [non vérifiée] (σ à étalonner; unité de ρ [à confirmer]) | EDS | Euler–Maruyama | fiche |
| P1 | Danse bruitée, version agents de [Okada et al. 2014] (protocole à relire) | AGT | boucle à pas fixe, ordre déclaré | fiche |
| P1 | Rétroaction par encombrement [Grüter et al. 2012] (plafond de débit par source) | MC / AGT | boucle à pas fixe | fiche |
| P2 | Ant System ant-cycle [Dorigo et al. 1996]; ACS [Dorigo et Gambardella 1997]; ACO_R [Socha et Dorigo 2008] | META | boucle de cycles; budget compté en évaluations de fonction [Mernik et al. 2015]; ρ = persistance (convention de 1996) | cycle ou évaluation, sans temps physique |
| P2 | ABC [Karaboga et Basturk 2008]; rapport [Karaboga 2005] sans équation algorithmique | META | idem | idem |
| P3 | Seuils fixes [Bonabeau et al. 1996] [non vérifiée], forme canonique de [Theraulaz et al. 1998] (éq. 1); seuils renforcés [Theraulaz et al. 1998] | AGT à temps discret (probabilité par pas) | boucle à pas fixe, ordre déclaré; champ moyen par caste comme contrôle analytique | un pas; 20 000 pas dans le pré-test du dossier P3 |
| P3 | Thermorégulation [Graham et al. 2006] avec compartiment de température (reconstruction [I], aucune équation publiée lue) | AGT + compartiment | boucle à pas fixe | fiche |
| P3 | Polyéthisme d'âge [Beshers et al. 2001] (équations non lues) | à fixer | fiche, après lecture | fiche |
| P4 | Éq. 3–4 de [Prabhakar et al. 2012] | PTD | tirage `poisson` par créneau | créneau; durée non précisée par la source [à confirmer] |
| P4 | Boucle excitable (FitzHugh–Nagumo + intégrateur à fuite) de [Pagliara et al. 2018] et file M/G/∞ | EDO à deux échelles + file | RK4 si h est compatible avec ε₁ε₂ = 0,01 (produit de ε₁ = 0,2 et ε₂ = 0,05 du dossier P4 [I]); sinon schéma adapté, décision de la fiche | fiche |
| P4 | Dérive-diffusion individuelle avec impulsions [Davidson et al. 2016] | EDS à sauts | Euler–Maruyama + événements | fiche |
| P4 | Files butineuses-receveuses [Anderson et Ratnieks 1999a]; [Seeley et Tovey 1994] | DES | tas d'événements (`events`) | temps continu |
| P4 | [Edwards et Myerscough 2011] et extension de trémulation (terme en échelon) | EDO | RK4; franchissement de seuil traité en événement | fiche |
| P5 | M1c [Seeley et al. 2012]; [Pais et al. 2013] avec k = 0; [Britton et al. 2002]; forme de [Franks et al. 2002] pour [Pratt et al. 2002] | EDO (champ moyen) | RK4 jusqu'à l'équilibre; balayage de σ pour la bifurcation | h = 0,01; t jusqu'à 500; ralentissement critique près de σ\* (dossier P5) |
| P5 | Bruit sensoriel de [Pais et al. 2013] (k > 0); versions stochastiques de [Marshall et al. 2009] | EDS | Euler–Maruyama | dt ≤ 0,01 |
| P5 | M1c à N fini (dossier x-methodes, X7) | SSA | direct | temps continu |
| P5 | Réponse de quorum [Sumpter et Pratt 2009] (n = 40, 1 000 simulations) | MC à temps discret | boucle à pas fixe | un pas; durées de 250 à 310 pas environ |
| P5 | [Passino et Seeley 2006]; [Pratt et al. 2005] [non vérifiée]; [Pratt et Sumpter 2006] (19 états, 44 paramètres) | AGT à temps discret | boucle à pas fixe | un pas |
| P6 | [Couzin et al. 2002] (3D, zones, N = 100); [Couzin et Franks 2003] (piste et évitement, N = 50) | AGT, espace continu | pas fixe; Couzin et Franks : directions mises à jour en parallèle puis positions | 0,1 s; 0,02 s |
| P6 | [Erhard et al. 2022] (marche aléatoire renforcée) | MC sur graphe | tirage catégoriel | un pas |
| P6 | [Beekman et al. 2001] (éq. 1 [à confirmer]) | EDO 1D, équilibres d'un polynôme cubique | RK4 ou racines; balayage de la taille de colonie | fiche |
| P6 | [Aswale et al. 2022] (n = 1 024, 50 000 pas, monde de 1 920 × 1 080, cellules de 4) | AGT + champ | pas fixe + `grid`; évaporation linéaire de 1 unité/s | Δt = 0,016 |
| P6 | Interblocage et scission : [Pais et al. 2013] | voir P5 | voir P5 | voir P5 |
| P7 | Environnements procéduraux déterministes pour une graine; agents à règles et agents LLM derrière la même `Policy` | AGT à pas discret (tour) | pas fixe; barrière par tour pour les décisions asynchrones | un tour; 10 agents × 30 tours = 300 appels par exécution (dossier P7) |
| P8 | [Sasaki et al. 2013] (états Exploring, A, B, CA_i, CB_i, a, b; population 100) | chaîne de Markov (AGT) | boucle à pas fixe; tirage catégoriel | fiche (SI non lu) |
| P8 | Condorcet, bêta-binomial, identité de diversité, vote et difficulté | FERMÉ + MC de contrôle | évaluation directe (`analysis`) | sans objet |
| P8 | [Hong et Page 2004] (anneau de 2 000 positions, 50 réplications) | AGT (recherche) | boucle à pas fixe | sans objet |
| P8 | Diffusion et SPRT de [Marshall et al. 2009] | EDS | Euler–Maruyama | dt ≤ 0,01 |
| P9 | [Vicsek et al. 1995] (éq. 1–2, domaine périodique) | AGT à temps discret | listes de cellules; mise à jour synchrone | Δt = 1 |
| P9 | Voies et sens collectif [Couzin et Franks 2003] | AGT | voir P6 | 0,02 s |
| P9 | Pont double [Peters et al. 2006] (reprend [Dussutour et al. 2004]) | EDO à retards (état stationnaire) + microsimulation | RK4 avec file de retards; agents | fiche |
| P9 | [Gelblum et al. 2015] (Gillespie sur anneau de sites; Ising de champ moyen); [Gelblum et al. 2016] (éq. 1–5, bifurcation de Hopf) | SSA + champ moyen; EDO | direct; RK4 | temps continu; h par la fiche |
| P9 | Ponts vivants [Reid et al. 2015] (éq. 1–5) | FERMÉ + optimisation 1D | évaluation directe | sans objet |
| P9 | [Garnier et al. 2013] (arrivées de Poisson) | AGT + PTD | pas de 1 s; `poisson` | 1 s |
| P9 | Radeaux [Mlot et al. 2011] (trajectoires rectilignes; éq. en image) | AGT | pas fixe | fiche |
| P9 | Grappe [Peleg et al. 2018] (réseau de ressorts 2D; équations en image; version v1 [à confirmer]) | particules + ressorts | intégrateur choisi à la lecture | fiche |
| P9 | Piliers [Khuong et al. 2016] (treillis 200³, 500 agents) | AGT sur treillis | pas fixe + `grid` 3D (`Uint8Array`) | 1 s |
| P9 | Rayon [Johnson 2009] (14 025 cellules) | AGT sur grille | pas fixe | 1 min |
| P9 | Motifs du rayon [Camazine et al. 1990] (équations non lues, forme EDO [à confirmer]) | EDO ou EDP, à confirmer | fiche, après lecture | fiche |
| P9 | SwarmBench [Ruan et al. 2025] (grille discrète, vue locale, messages de 120 caractères) | AGT LLM | comme P7 | une ronde |

### 3.2 Règles par type

- **EDO.** Pas fixe, intégration en place avec tampons préalloués. On choisit h par un test d'ordre (rapport des erreurs ∈ [12; 20] quand h est divisé par 2, T0.4), jamais « à l'œil ». Le second membre reste continu : un seuil de quorum ou un échelon (terme U(S − m_T) chez [Edwards et Myerscough 2011]) est traité comme un **événement** de franchissement, localisé par bissection sur le pas, et non écrit dans la fonction. Un système à deux échelles (P4, [Pagliara et al. 2018]) exige de vérifier la raideur avant de retenir un schéma explicite.
- **Champ moyen.** Intégration jusqu'à l'équilibre, puis balayage du paramètre. Près d'une bifurcation, la convergence ralentit (dossier P5, section 5) : l'horizon est une donnée du scénario, pas une constante du code. L'hystérésis se teste par balayage montant puis descendant avec reprise de l'état (section 10).
- **EDS.** Euler–Maruyama, dt ≤ 0,01 en unités du modèle, sensibilité vérifiée à dt/2 (x-choregraphie, section 5). Bruit multiplicatif possible (le bruit sensoriel de [Pais et al. 2013] dépend de l'état). Un flux nommé `noise`.
- **SSA.** Méthode directe : τ = (1/a₀) ln(1/r₁); j = plus petit entier tel que la somme des a_j' dépasse r₂a₀ [Gillespie 2007], éq. 10a,b. Les modèles dont la taille finie compte (P5, P9) justifient la méthode; la méthode de la première réaction n'est pas implantée tant qu'aucun modèle ne l'exige.
- **MC et PTD.** Boucle à pas fixe; un retard de d secondes est un décalage de d/dt pas dans un tampon circulaire, pas un événement. Le nombre de tirages par pas est constant et déclaré.
- **DES.** Un tas binaire; temps continu; les égalités de temps se départagent par ordre d'insertion (section 4.5).
- **AGT.** Pas fixe; ordre de mise à jour déclaré dans le scénario (section 7.3); structure de tableaux (un tampon par attribut), pas un objet par agent [I, audit]; voisinage par listes de cellules dès que N dépasse l'ordre de la centaine [à confirmer, SPK10].
- **META.** Le budget se compte en évaluations de fonction ou en tours construits, jamais en cycles seuls [Mernik et al. 2015]. La convention de ρ est déclarée (persistance chez [Dorigo et al. 1996]). Une instance est validée par recalcul de sa valeur publiée avant tout usage (dossier P2).
- **FERMÉ.** Évaluation directe dans `analysis/`; test unitaire contre la valeur publiée; les incohérences internes des sources (par exemple, deux valeurs de L_A de [Reid et al. 2015] qui ne suivent pas la formule du même article) vont au registre des déviations, pas en correction silencieuse.

---

## 4. Noyau commun : contenu exact

### 4.1 Aléatoire (`core/random.ts`)

- **Générateur :** xoshiro128\*\* (état de 128 bits, opérations 32 bits, `Math.imul`), premier choix 32 bits de [Blackman et Vigna 2021]. Vecteur de contrôle T0.1. PCG32 n'est pas retenu : le choix est neutre pour le programme et la page d'opinion de [Vigna 2026] en conteste les flux (dossier x-methodes, M10c).
- **Initialisation :** graine maître de 64 bits, écrite en chaîne décimale dans les fichiers (JSON ne porte pas 64 bits); étendue par SplitMix64, un générateur de nature différente, comme le demande [Blackman et Vigna 2021] (voir aussi [Steele et al. 2014], [Matsumoto et al. 2007]). Convention du programme [I] : les quatre mots d'état sont les moitiés basse puis haute de deux sorties successives; l'état entièrement nul est interdit. Vecteur T0.3.
- **Flux nommés :** `createStream(masterSeed, name)` dérive la graine du flux par SplitMix64 de `masterSeed XOR FNV-1a-64(name)` [I]. Un flux par sous-système : `environment`, `agents`, `order`, `channel`, `policy`, `noise`, `measure`. Ajouter un flux ne décale aucun tirage des autres (test d'indépendance de T0.26). `derive(name)` donne un sous-flux, utilisé par agent seulement sur demande du scénario.
- **Distributions :** `uniform()` dans [0, 1) sur 53 bits (deux sorties); `uniformOpen()` dans (0, 1) pour les logarithmes; `int(n)` = ⌊uniform() · n⌋ pour n ≤ 2³²; `exponential(rate)`; `normal()` par méthode polaire, **sans mémoire de la seconde valeur** (l'état du flux reste les seuls 128 bits); `poisson(lambda)` par inversion séquentielle, avec une borne λ_max fixée par le test de Poisson de la section 9.6 [à confirmer] et une erreur explicite au-delà (pas de dérive silencieuse); `shuffle` de Fisher–Yates.
- **Interdits dans la logique de simulation :** `Math.random` (graine non choisissable, [MDN 2026]), `Date.now`, `performance.now`, `new Date`, l'ordre d'itération d'objets à clés numériques.

### 4.2 Horloge (`core/clock.ts`)

Pas fixe `dt` dans l'unité du scénario (`s`, `min`, `h`, `cycle`, `evaluation`). Le temps se calcule `t = n · dt` (produit), jamais par cumul, pour éviter la dérive. L'horloge ignore l'écran : elle n'a ni `requestAnimationFrame` ni temps mural. Pour les modèles à temps continu (SSA, DES), le temps vit dans l'état du modèle et l'horloge ne sert qu'à l'échantillonnage régulier.

### 4.3 Intégrateurs (`core/rk4.ts`, `core/euler-maruyama.ts`)

RK4 classique : y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄), erreur locale O(h⁵) et globale O(h⁴) [Wikipedia 2026]. Euler–Maruyama pour les EDS, avec bruit diagonal. Les deux écrivent en place dans des `Float64Array` et allouent leurs tampons à la création. La localisation d'un franchissement de seuil se fait par bissection sur le pas, avec une tolérance déclarée dans le scénario.

### 4.4 SSA (`core/ssa.ts`)

Méthode directe. Propensités dans un `Float64Array`, stœchiométrie dans un `Int32Array` (réactions × espèces), état entier. `uniformOpen()` fournit r₁ et r₂. Si a₀ = 0, l'état est absorbant : le pas renvoie un temps infini et aucune réaction.

### 4.5 Événements discrets (`core/events.ts`)

Tas binaire minimal (de l'ordre de 50 lignes, audit simulation-technique M14) sur la clé (temps, numéro de séquence). Le numéro de séquence est un compteur monotone : **deux événements au même temps sortent dans l'ordre d'insertion**, jamais dans un ordre dépendant du moteur. Annulation par invalidation paresseuse (compteur de génération par agent) [I]. Stockage en tableaux typés pour éviter un objet par événement [I].

### 4.6 Grille (`core/grid.ts`)

Grille à 2 ou 3 dimensions sur tampon typé, `Float64Array` par défaut. `Float32Array` seulement après un test de convergence, car de petits dépôts sont absorbés par un champ élevé et une évaporation répétée fait apparaître des sous-normaux (audit m4 [I]).

- **Évaporation :** facteur constant par pas, `exp(−ln2 · dt / t_half)`, calculé **une fois** à la compilation du scénario; remise à zéro sous un seuil ε déclaré. Une évaporation paresseuse (horodatage par cellule) est permise pour les grandes grilles, à condition de passer le test d'équivalence à la version immédiate (test de grille de la section 9.6).
- **Diffusion :** schéma explicite FTCS, **refusé à la compilation** si r = DΔt/Δx² > 1/4 en 2D (critère classique, source secondaire dans l'audit M3 [I]).
- **Dépôt et lecture :** bilinéaires, pour éviter l'anisotropie d'un dépôt au plus proche voisin.
- **Mise à jour synchrone :** double tampon et `swap()`.
- **Voisinages :** décalages précalculés (Moore, von Neumann; 26 voisins en 3D pour [Khuong et al. 2016]).
- **Convergence :** Δx et Δx/2 donnent la même statistique de colonie à la tolérance près (test de grille de la section 9.6).

### 4.7 Enregistreur (`core/recorder.ts`)

- **Séries :** colonnes typées préallouées, échantillonnage à intervalles réguliers de temps (dernier état avant l'instant), sans interpolation. Jamais de `NaN` : une valeur manquante est une cellule vide plus une entrée `missing` du manifeste avec sa cause (bonne pratique de [Morris et al. 2019]).
- **Journal d'événements typés** (activable) : écriture de trace, lecture de trace, message adressé, décision. C'est la matière des indicateurs de typologie (C_ctrl, C_med, C_stig… du dossier x-choregraphie, section 2.3), dont la définition appartient à [06-metriques-et-typologie.md](06-metriques-et-typologie.md).
- **Empreinte d'état :** FNV-1a 64 bits sur les octets de tous les tampons rendus par `Simulation.buffers()`, **y compris l'état des flux** (sinon deux états égaux pourraient avoir des futurs différents). L'ordre d'octets little-endian est vérifié au démarrage (`new Uint8Array(new Uint32Array([1]).buffer)[0] === 1`) et la valeur `NaN` est interdite dans l'état.
- **Exports :** section 8.

### 4.8 Scénario (`core/scenario.ts`)

Un scénario est un JSON versionné qui contient tout ce qu'il faut pour rejouer un run. `compileScenario` le valide et produit un `CompiledScenario`; il lève une erreur explicite au premier manquement.

| Champ | Contenu | Contrôle à la compilation |
|---|---|---|
| `schema`, `regime` | version; `confirmatory` ou `exploratory` | `confirmatory` refuse tout paramètre `to-confirm` |
| `model` | identifiant, version, étiquette de l'article | l'étiquette existe dans [11-bibliographie.md](11-bibliographie.md) (test de cohérence) |
| `time` | unité, `dt`, horizon, intervalle d'échantillonnage | `dt` > 0; `horizon` multiple de `dt` |
| `order` | `synchronous`, `sequential-random` ou `sequential-fixed` | obligatoire pour tout modèle à agents |
| `seed`, `streams` | graine maître (chaîne décimale); flux déclarés | flux inconnu = erreur |
| `parameters` | par paramètre : valeur, unité, source (étiquette et emplacement), statut `published`, `estimated` ou `to-confirm` | unités compatibles; borne r ≤ 1/4 pour la diffusion; λ ≤ λ_max pour Poisson |
| `initial` | état initial | cohérence avec le modèle |
| `measures` | observables enregistrées | noms connus du modèle |
| `interventions` | actions datées en temps de simulation (mode Explorer) | triées, dans l'horizon |
| `constants` (sortie) | constantes dérivées, écrites comme **littéraux** : facteurs d'évaporation, de décroissance par pas | calculées une fois sous Node |
| `hash` (sortie) | FNV-1a 64 bits du JSON canonique (clés triées, nombres au format le plus court de l'ECMAScript) [I] | non cryptographique; identification seulement |

Le statut d'un paramètre reprend les marques des dossiers : une valeur marquée **[à confirmer]** dans le dossier devient `to-confirm` dans le scénario, et ne peut alimenter qu'un run `exploratory`. Le manifeste consigne le régime et les statuts, de sorte qu'un résultat exploratoire ne se confond jamais avec un résultat confirmatoire (principe 4 du cadre).

### 4.9 Manifeste de run (`core/manifest.ts`)

Un manifeste par run, en JSON, qui sert de provenance (principe R1.2 de [FAIR4RS 2022]). Manifeste plus graine = rejeu complet d'un modèle déterministe sur le même moteur; on ne stocke une trajectoire que pour les runs LLM.

| Champ | Contenu |
|---|---|
| `schema`, `runId` | version; identifiant = empreinte de (hash du scénario, graine, commit) |
| `regime` | `confirmatory` ou `exploratory` |
| `model` | identifiant, version, étiquette de l'article, cible visée |
| `code` | commit git, arbre propre ou non, version du noyau, versions de Node, de TypeScript et des dépendances |
| `scenario` | hash et scénario compilé complet |
| `prng` | algorithme, initialisation, graine maître, état initial de chaque flux |
| `time` | unité, `dt`, horizon, ordre de mise à jour, nombre de pas |
| `interventions` | actions datées appliquées (vide hors mode Explorer) |
| `engine` | `node`, `browser` ou `worker`; version; plateforme; architecture |
| `timestamps` | début, fin, durée murale (mesurées hors de la logique de simulation) |
| `outputs` | par fichier : nom, format, SHA-256, lignes, colonnes avec unités |
| `fingerprints` | empreintes d'état à des temps déclarés |
| `summary`, `missing` | statistiques de résumé; valeurs manquantes avec cause |
| `verdict`, `deviations` | verdict de la cible (section 9.2) et identifiants du registre des déviations |
| `llmLog` | P7 seulement : chemin, SHA-256 et nombre d'appels du journal; les noms de champs du journal sont fixés à la section 8.6 |
| `license` | licence des sorties |

Aucun secret (clé d'API) ni donnée personnelle n'entre dans un manifeste. Le **manifeste de campagne** de P7 (fenêtre d'exécution, ordre randomisé des cellules, condensats de tous les fichiers) agrège ces manifestes de run; son contenu est décrit dans [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md) et la [fiche P7](../projets/P7-synthese-agentique.md).

---

## 5. Interfaces TypeScript de principe

Signatures seulement. Elles passent `tsc --noEmit` sous `strict`, `erasableSyntaxOnly` et `verbatimModuleSyntax` (contrôle fait, section « Contrôles »). Un fichier réel sépare ces blocs par module; ils sont concaténés ici.

```ts
// core/random.ts
export interface Prng {
  u32(): number
  uniform(): number                 // [0, 1), 53 bits
  uniformOpen(): number             // (0, 1)
  int(boundExclusive: number): number
  normal(): number                  // polaire, sans mémoire
  exponential(rate: number): number
  poisson(lambda: number): number   // lève une erreur au-delà de lambda_max
  shuffle(a: Int32Array): void
  state(): Uint32Array              // copie, pour le manifeste
  derive(name: string): Prng
}
export declare function createStream(masterSeed: bigint, name: string): Prng

// core/clock.ts
export type TimeUnit = 's' | 'min' | 'h' | 'cycle' | 'evaluation'
export interface Clock {
  readonly dt: number
  readonly unit: TimeUnit
  step(): number
  time(): number                    // n * dt
  advance(): void
}

// core/rk4.ts, core/euler-maruyama.ts
export type Derivative = (t: number, y: Float64Array, dy: Float64Array) => void
export interface Rk4 { step(f: Derivative, t: number, y: Float64Array, h: number): void }
export declare function createRk4(dimension: number): Rk4
export type NoiseCoefficient = (t: number, y: Float64Array, g: Float64Array) => void
export interface EulerMaruyama {
  step(drift: Derivative, noise: NoiseCoefficient, t: number, y: Float64Array, h: number, rng: Prng): void
}
export declare function createEulerMaruyama(dimension: number): EulerMaruyama

// core/ssa.ts
export interface ReactionSystem {
  readonly nReactions: number
  readonly stoichiometry: Int32Array          // nReactions x nSpecies
  propensities(x: Int32Array, a: Float64Array): void
}
export interface Ssa {
  step(x: Int32Array, t: number): { t: number; reaction: number }   // reaction = -1 si a0 = 0
}
export declare function createDirectSsa(system: ReactionSystem, rng: Prng): Ssa

// core/events.ts
export interface SimEvent { time: number; type: number; agent: number; payload: number }
export interface EventQueue {
  schedule(time: number, type: number, agent: number, payload?: number): void
  next(): SimEvent | undefined      // ordre (time, sequence)
  size(): number
}

// core/grid.ts
export type TypedBuffer = Float32Array | Float64Array | Uint8Array | Int32Array
export interface Grid<T extends TypedBuffer> {
  readonly dims: readonly number[]
  readonly data: T
  index(...coord: number[]): number
  evaporate(factor: number, epsilon: number): void
  diffuse(r: number): void          // FTCS; refuse r > 1/4 en 2D
  depositBilinear(x: number, y: number, q: number): void
  sampleBilinear(x: number, y: number): number
  swap(): void
}

// core/scenario.ts
export type UpdateOrder = 'synchronous' | 'sequential-random' | 'sequential-fixed'
export type Regime = 'confirmatory' | 'exploratory'
export interface ParameterSource {
  value: number | string | boolean
  unit: string
  source: string                    // étiquette de bibliographie et emplacement
  status: 'published' | 'estimated' | 'to-confirm'
}
export interface Intervention { time: number; type: string; value: number | string }
export interface Scenario {
  schema: 1
  regime: Regime
  model: { id: string; version: string; article: string }
  time: { unit: TimeUnit; dt: number; horizon: number; sampling: number; eventTolerance?: number }
  order: UpdateOrder
  seed: string
  streams: readonly string[]
  parameters: Readonly<Record<string, ParameterSource>>
  initial: Readonly<Record<string, unknown>>
  measures: readonly string[]
  interventions: readonly Intervention[]
  preset?: { repetitions: number; replaySeed: string }   // pages : N préenregistré et graine rejouée en direct
  displayTimeScale?: number         // facteur d'affichage du temps (écran partagé), montré à l'écran
}
export interface CompiledScenario extends Scenario {
  constants: Readonly<Record<string, number>>
  hash: string
}
export declare function compileScenario(raw: unknown): CompiledScenario

// models/*  (une interface unique pour des modèles de natures différentes)
export interface Simulation<O> {
  advance(): void                   // un pas, un événement, une réaction ou un cycle, selon le modèle
  time(): number
  done(): boolean
  observe(): O                      // lecture sans effet de bord
  buffers(): readonly ArrayBufferView[]   // état complet, flux compris, pour l'empreinte
  apply(i: Intervention): void      // intervention datée (mode Explorer)
}
export interface StreamFactory { stream(name: string): Prng }
export interface ReferenceModel<O> {
  readonly id: string
  create(s: CompiledScenario, f: StreamFactory): Simulation<O>
}

// policies/ et models/choreography (couche 3)
export interface DecisionContext { agent: number; step: number; rng: Prng }
export interface Policy<O, A> {     // règle simple et LLM : même interface, même observation sérialisée
  decide(obs: O, ctx: DecisionContext): A | Promise<A>
}
export interface ChannelConfig {
  type: 'field' | 'dance-floor' | 'blackboard' | 'messages'
  persistence: { halfLife: number } | { ttl: number } | 'none'
  reach: { radius: number } | 'global'
  addressing: 'broadcast' | 'directed'
  format: { kind: 'scalar' | 'tuple' | 'text'; nominalBits: number; maxChars?: number }
}
export interface Channel<M> {
  write(sender: number, message: M, t: number): void
  read(reader: number, t: number): readonly M[]
  advance(dt: number): void         // évaporation, expiration
  buffers(): readonly ArrayBufferView[]
}

// harnais de tests : extrait exécutable d'une fiche de reproduction (gabarit de 04-protocole-reproduction.md)
// src/analysis/equivalence.ts et src/cli/reproduce.ts (UC-003)
export type Reading = 'T' | 'T*' | 'R' | 'M' | 'S' | 'I'
export interface Margin { delta: number; scale: 'points' | 'relative' | 'log10' | 'standardized'; justification: string }   // points : points de pourcentage pour une proportion
export interface Seuil { op: '>' | '>=' | '<' | '<='; value: number }
export interface Criterion {
  quantity: string
  statistic: { measure: string; threshold?: Seuil | readonly Seuil[] }   // valeur finale par exécution; seuils (tous vrais) → proportion
  scenario?: string                 // condition propre au critère (p. ex. une valeur de r); sinon le scénario de la cible
  test: 'equal' | 'TOST' | 'order' | 'range' | 'fit'   // implantés : equal (identité à tolérance), TOST, range (IC à 95 % dans la plage)
  value: number | readonly [number, number]
  margin?: Margin                   // héritée de la cible si absente
  dispersion?: { kind: 'sd' | 'se' | 'ci' | 'unknown'; value: number }
  publishedN?: number               // avec la dispersion : TOST de Welch; sinon valeur publiée traitée comme constante (04 §5.5)
}
export interface ReproductionTarget {
  id: string                        // T<projet>.<n>
  project: string                   // P<k> ou S0
  state: 'blocked' | 'provisional' | 'frozen'   // avant exécution; blocked = todo, provisional = exploratoire seulement
  frozenAt?: string                 // commit de gel de la fiche
  blockedReason?: string
  source: string                    // étiquette de bibliographie
  location: string                  // figure, tableau, équation
  level: 'identity' | 'relational' | 'distributional'
  margin?: Margin
  repetitions: number
  maxRepetitions?: number           // n_max préenregistré pour l'issue indéterminée
  seeds: { master: string; pairing: 'by-repetition' | 'by-cell' }
  rule: string                      // règle de décision écrite avant le code
  gates: readonly string[]
  reading: Readonly<Record<'equations' | 'parameters' | 'protocol' | 'figure' | 'dispersion', Reading>>
  scenario?: string                 // scénario de base (chemin relatif à la racine); requis sauf cible bloquée
  criteria?: readonly Criterion[]   // conjonctifs; requis sauf cible bloquée
  deviations?: readonly string[]    // D-<projet>-<nnn>
}
export interface Verdict {
  id: string
  outcome: 'satisfied' | 'unsatisfied' | 'inconclusive'
  provisional: boolean              // « sous réserve » : la fiche était provisoire
  measured: number                  // measured, ci90, mcStandardError : ceux du premier critère
  ci90?: readonly [number, number]
  mcStandardError: number
  n: number
  deviations: readonly string[]     // identifiants du registre : D-<projet>-<nnn>
  criteria: readonly { quantity: string; outcome: Verdict['outcome']; measured: number; mcStandardError: number; ci90?: readonly [number, number]; n: number }[]
}
export declare function requiredNTost(p: number, delta: number): number          // α = 0,05, puissance 80 %
export declare function verifierCible(id: string): { cible: string; etat: string; issue: string; n: number; code: number }

// core/manifest.ts
export interface RunManifest {
  schema: 1
  runId: string
  regime: Regime
  model: { id: string; version: string; article: string; target?: string }
  code: { commit: string; cleanTree: boolean; coreVersion: string; node: string; typescript: string; dependencies: Record<string, string> }
  scenario: { hash: string; compiled: CompiledScenario }
  prng: { algorithm: 'xoshiro128**'; seeding: 'splitmix64'; masterSeed: string; streams: { name: string; initialState: string }[] }
  time: { unit: TimeUnit; dt: number; horizon: number; order: UpdateOrder; steps: number }
  interventions: readonly Intervention[]
  engine: { kind: 'node' | 'browser' | 'worker'; version: string; platform: string; arch: string }
  timestamps: { start: string; end: string; wallMs: number }
  outputs: { file: string; format: 'csv' | 'json'; sha256: string; rows: number; columns: { name: string; unit: string }[] }[]
  fingerprints: { time: number; fnv1a64: string }[]
  summary: Record<string, number>
  missing: { quantity: string; cause: string }[]
  verdict?: Verdict
  deviations: readonly string[]
  llmLog?: { path: string; sha256: string; calls: number }
  license: string
}

// policies/llm-log.ts : une ligne JSONL par appel (noms de champs fixés ici; le reste est dans la fiche P7)
export interface LlmCallRecord {
  schema: 1
  runId: string
  scenarioHash: string
  seed: string
  step: number
  agentId: number
  requestedModel: string
  responseModel: string             // response.model
  effort?: string
  thinking?: unknown                // configuration de réflexion telle qu'envoyée
  request: unknown                  // corps complet de la requête
  requestHash: string               // clé de cassette avec (runId, step, agentId)
  response: { content: unknown; stopReason: string; usage: Record<string, number> }
  latencyMs: number
  costUsd: number
  region?: string
  requestId?: string
  sdkVersion: string
  timestamp: string
  permutationSeed?: string          // graine de la permutation de l'ordre des agents
}

// sweep/
export interface SweepAxis { parameter: string; values: readonly number[]; direction?: 'up' | 'down' }
export interface SweepPlan {
  base: CompiledScenario
  axes: readonly SweepAxis[]
  repetitions: number
  observables: readonly { name: string; window?: readonly [number, number] }[]
  masterSeed: string
  pairing: 'by-repetition' | 'by-cell'   // by-repetition : graine du run = f(graine maître, répétition) seulement
  carryState: boolean               // reprise de l'état d'un point au suivant (hystérésis)
}
```

Deux remarques de conception [I]. Le type `Policy` est asynchrone pour les LLM; le moteur attend **toutes** les décisions d'un pas (barrière) et les applique dans l'ordre des indices d'agents, jamais dans l'ordre d'arrivée des réponses; les noms de champs du journal sont à la section 8.6, et les détails (adaptateur d'API, paramètres de requête, cassette, plafond de jetons) dans la [fiche P7](../projets/P7-synthese-agentique.md). Le type `Simulation` ne dit pas ce qu'est un « pas » : c'est le modèle qui le définit, et le temps rendu par `time()` est celui de l'unité du scénario.

---

## 6. Arborescence de code proposée

Le code vit dans `colonies-agentique/`, à côté de `docs/`, `projets/` et `recherche/`. `outils/verifier-docs.ts` existe déjà.

```
colonies-agentique/
  package.json              scripts : typecheck, test, reproduce, verify, build:pages, sweep, replay
  tsconfig.json             core, models, policies, analysis, sweep, cli, tests (types: node)
  tsconfig.browser.json     core, models, policies (règles), analysis, browser (lib: dom, sans types node)
  .node-version             version de Node épinglée (traces dorées)
  src/
    core/                   random.ts clock.ts rk4.ts euler-maruyama.ts ssa.ts events.ts grid.ts
                            recorder.ts scenario.ts manifest.ts fingerprint.ts index.ts
    models/
      reference/            un dossier par article : p1-goss-1989/, p1-seeley-1991/, p5-seeley-2012/ (model.ts : EDO; ssa.ts : N fini), …
                            (model.ts, scenario.json, README = ODD du modèle)
      choreography/         model.ts, channels/ (field.ts dance-floor.ts blackboard.ts messages.ts)
    policies/               policy.ts rule.ts llm.ts cassette.ts llm-log.ts     (llm et cassette : voir fiche P7)
    analysis/               equivalence.ts (TOST, n requis, quantiles de t, règles de décision) bootstrap.ts sensitivity.ts (OFAT, Morris, Sobol) power.ts holm.ts
                            mc-error.ts miller.ts (formules d'évaluation des LLM)
    sweep/                  plan.ts executor.ts (worker_threads) worker.ts aggregate.ts
    cli/                    run.ts replay.ts reproduce.ts sweep.ts export.ts
    browser/                contrat.ts (définition et résumé d'une page) sim-worker.ts page.ts (gabarit à trois niveaux, UC-010 à UC-012)    (aucun calcul de simulation)
  scenarios/                <modèle>/<nom>.json (sources) et compiled/ (littéraux calculés sous Node)
  targets/                  <projet>/T<projet>.<n>.json : extrait exécutable de la fiche de reproduction, une cible par fichier
  tests/
    core/                   random, rk4, euler-maruyama, ssa, events, grid, analysis (T0.1, T0.3 à T0.16, T0.27 et les tests de grille, d'événements et de Poisson)
    cli/                    run et replay (UC-001, UC-002)
    determinism.test.ts     T0.26 et test d'agrégation
    verify.test.ts          chaîne de vérification (UC-008)
    conformance.test.ts     interdits et imports (T0.21)
    reproduction/<projet>/  un fichier par cible, piloté par targets/
    docking/<projet>.test.ts
    pages/                  UC-010 à UC-012 et critères TV0.n (Playwright, Chrome installé; axe-core), même exécuteur (section 13)
    __snapshots__/          traces dorées (section 9.4)
  data/
    figures/                figures publiées numérisées (CSV) + erreur de lecture
    oracles/                valeurs des scripts Python de recherche/verifications-numeriques/
    results/<projet>/       résultats précalculés (JSON, CSV) et manifestes
  pages/                    définitions <id>.json; dist/ : HTML générés par `npm run build:pages` (esbuild; hors git)
  spikes/phase0/            protocole, code du spike, rapport (section 12)
  outils/                   verifier-docs.ts, verifier-specs.ts, verifier-cibles.ts, verify.ts (chaîne de npm run verify); compile-scenarios.ts à venir
```

---

## 7. Déterminisme et ordre de mise à jour

### 7.1 Ce que le moteur garantit

| Niveau | Garantie | Condition | Vérifié par |
|---|---|---|---|
| **N1** identité binaire | même empreinte d'état à tout instant échantillonné | même scénario, même graine, même version du noyau, **même moteur JavaScript, même version et même plateforme** (système et architecture) | T0.26 |
| **N2** équivalence statistique | mêmes distributions, trajectoires non garanties identiques | autre moteur ou autre plateforme | T0.1 et T0.3 (identité sur les entiers du PRNG), docking et cibles (distributions) |
| **N3** cassette | rejeu des réponses journalisées | runs LLM : un modèle retiré ne se ré-exécute plus | fiche P7 |

La raison de N2 : plusieurs fonctions de `Math` dépendent de l'implémentation, y compris entre systèmes ou architectures pour un même moteur ([MDN 2026], cité par l'audit [simulation-technique](annexes/audit/simulation-technique.md), M1). Une trace calculée sous Node peut donc diverger dans Firefox ou Safari dès qu'un `exp`, un `pow` ou un `sin` décide d'une comparaison. Parades en vigueur : constantes dérivées écrites en littéraux dans le scénario compilé (section 4.8); exposant entier écrit en multiplications (`x * x`, pas `Math.pow`); aucun `Math.exp` sur le chemin d'une comparaison quand on peut l'éviter. Si un jour une exigence de trajectoire identique entre moteurs apparaît (aucune à ce jour), on ajoutera un `core/strict-math.ts` (exp, ln, sin, cos par additions, soustractions, multiplications et divisions seulement); il n'est pas implanté (YAGNI) et SPK8 mesure ce qu'il y aurait à corriger.

### 7.2 Interdits et contrôle

`tests/conformance.test.ts` parcourt `src/core`, `src/models`, `src/policies` et `src/analysis` et échoue sur :

- `Math.random`, `Date.now`, `performance.now`, `new Date` (contrôle X21 du dossier x-methodes);
- `requestAnimationFrame`, `setTimeout`, `setInterval`, tout `process.` et tout import `node:` dans `core/` et `models/`;
- `.sort()` sans fonction de comparaison; `for … in` sur un objet;
- un `import` qui sort du tableau de la section 2.2.

L'horodatage et la durée murale sont mesurés dans `cli/`, `sweep/` et `browser/`, hors de la logique de simulation, et n'entrent que dans le manifeste.

### 7.3 Ordre de mise à jour

L'ordre est un **paramètre du modèle**, pas un détail d'implémentation : il peut changer fortement les sorties ([Grimm et al. 2010]), les résultats d'un modèle spatial diffèrent entre temps discret et temps continu ([Huberman et Glance 1993]), la mise à jour synchrone et l'asynchrone diffèrent surtout aux fortes densités ([Caron-Lormier et al. 2008]), et l'ordre « mélangé ou non » a décidé du résultat d'une réplication ([Wilensky et Rand 2007]). Le scénario le déclare (`order`) et l'ODD du modèle le décrit.

- `synchronous` : toutes les décisions lisent l'état du début de pas; les écritures vont dans le tampon suivant; `swap()` en fin de pas.
- `sequential-random` : une permutation des indices est tirée du flux `order` à chaque pas (c'est l'« asynchrone » du protocole de reproduction).
- `sequential-fixed` : indices croissants; réservé aux cas où la source l'impose.

Un modèle de référence suit **l'ordre de sa source** : par exemple, [Couzin et Franks 2003] mettent à jour en parallèle les directions, puis les positions. Pour la couche 3, les phases d'un pas sont, dans cet ordre : (1) interventions datées dont le temps est échu, dans l'ordre de leur déclaration; (2) perception; (3) décision (`Policy.decide`, flux `policy`); (4) action, écrite dans l'environnement et le canal; (5) dynamique de l'environnement et du canal (`channel.advance`); (6) `swap()`, avancement de l'horloge, échantillonnage.

**Test de sensibilité :** chaque modèle à agents est exécuté une fois sous les deux ordres, avec les mêmes graines maîtres. On conclut « sans effet » seulement si l'écart est inférieur à 3 erreurs-types de Monte Carlo (dossier x-methodes, M10d; résultat sur M6 de [Sumpter et Pratt 2009] : aucun effet). Un effet constaté devient un facteur catégoriel de toute analyse du modèle.

### 7.4 Flux et ordre des tirages

- Un flux par sous-système (section 4.1), ou `agents:<taxon>` quand plusieurs taxons coexistent. Au sein d'un flux, l'ordre des tirages suit l'ordre de mise à jour : changer l'ordre change donc les nombres reçus par chaque agent. Pour tester l'ordre **sans** changer ces nombres, le scénario peut demander un flux par agent (`derive`).
- **Pairage des graines.** Le plan de balayage déclare `pairing`. `by-repetition` (défaut pour comparer des cellules d'un même modèle) : la graine du run vaut `createStream(masterSeed, "run/" + repetition)`, donc **les mêmes graines dans toutes les cellules** (nombres aléatoires communs, plan apparié du protocole de reproduction). `by-cell` : `"run/" + point + "/" + repetition`, graines indépendantes. Entre deux modèles différents, les graines maîtres sont les mêmes pour le pairage d'analyse (section 2.4), sans corrélation de trajectoires attendue.
- La graine est fixée une seule fois, l'état initial de chaque flux est rangé dans le manifeste, et les exécutions parallèles n'ont jamais de flux partagé (pratiques recommandées par [Morris et al. 2019]).
- La graine maîtresse d'une cible confirmatoire est inscrite dans la fiche et dans `targets/` avant la première exécution; aucune sélection de graines après coup.

### 7.5 Précision numérique

`Float64Array` par défaut pour l'état et les champs. `NaN` interdit dans l'état (vérifié à l'échantillonnage). Les comptages sont des `Int32Array`. Les entiers 32 bits non signés passent par `>>> 0` avant toute comparaison ou tout hachage.

---

## 8. Formats d'export

### 8.1 Séries (CSV)

- UTF-8 sans BOM, fins de ligne LF, séparateur virgule, point décimal, guillemets au sens de la RFC 4180 si nécessaire.
- Première ligne : `t` puis les observables. Les unités vivent dans le manifeste (`outputs[].columns`), pas dans l'en-tête.
- Une ligne par instant d'échantillonnage. Nombres écrits au format ECMAScript le plus court qui se relit à l'identique (`String(x)`). Jamais de `NaN` ni d'infini : cellule vide et entrée `missing` avec sa cause.
- Nom : `<modèle>__<hash8>__s<graine>.series.csv`, où `hash8` est le début du hash du scénario.

### 8.2 Balayages

- `results.csv`, format long : `point,rep,seed,<paramètres>,<observables>`; une ligne par run, valeur brute par run (jamais seulement la moyenne, pour permettre TOST et bootstrap après coup).
- `summary.csv`, une ligne par point : n, moyenne, écart-type, erreur-type de Monte Carlo, IC à 95 % par bootstrap.
- `sweep-manifest.json` : plan (axes, valeurs, répétitions), hash, nombre de runs, nombre de travailleurs, durée, SHA-256 des fichiers.

### 8.3 Résumés précalculés pour les pages

JSON rangé dans `data/results/<projet>/<cible>.summary.json` (UC-006) : `{schema, target, targetHash, verdict, regime, provenance, preregisteredN, measure, cells: [{scenario, scenarioHash, source, params, n, mean, se, interval95, values, missing, replay: {rep, seed, fnv1a64}}]}`; une cellule par scénario de la cible. `source` est le scénario de base, pour que la page puisse rejouer la répétition typique. `preregisteredN` est le N que la page affiche dans son compteur « n sur N »; La graine rejouée (`replay.seed`) est choisie **une fois, avant publication**, comme celle dont l'observable principale est la plus proche de la médiane de la distribution, la plus petite par rang en cas d'égalité (choix de conception [I]; UC-006, BR-027), et consignée. Une page doit tenir dans la limite de 16 Mo d'un artifact (audit simulation-technique, m8; description de l'outil Artifact); au-delà, agrégats ou capacité `assets`. La condition témoin statique de V0 se fabrique à partir de ces mêmes JSON ([07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md)).

### 8.4 Figures publiées numérisées

`data/figures/<étiquette>-<figure>.csv` : colonnes `x,y,yLow,yHigh`; l'incertitude de lecture est consignée dans l'en-tête de fichier (le dossier P1 retient environ ±3 points de pourcentage pour une lecture de figure). Chaque fichier cite l'étiquette de bibliographie et l'emplacement de la figure. L'erreur de reproduction est un RMSE ou une distance de forme, calculée par `analysis/`.

### 8.5 Export depuis une page

Bouton « exporter » : sous artifact, via la capacité `downloads` (le visiteur peut refuser; le refus n'est pas une erreur); sur page statique, `Blob` et `<a download>`. Le bouton est masqué si aucune voie n'est disponible. Le fichier exporté provient de l'enregistreur du noyau, jamais d'une reconstruction à partir de l'affichage; le manifeste est exporté avec lui (SPK7).

### 8.6 Journal LLM : noms de champs

Un appel égale une ligne JSONL, compressée (gzip) et archivée hors git, dans le jeu de données à DOI ([08-science-ouverte-ethique.md](08-science-ouverte-ethique.md)). Le type `LlmCallRecord` (section 5) fixe les noms de champs, selon la liste de l'audit (M17) et les compléments que demande 08 (région, `request-id`, graine de permutation de l'ordre des agents). `requestHash` est le SHA-256 du JSON canonique de la requête.

- **Cassette :** la clé de rejeu est (`runId`, `step`, `agentId`, `requestHash`). Un hachage de requête différent signale une divergence du moteur : c'est aussi un test de non-régression.
- **Jamais d'appel d'API depuis une page** : les pages rejouent des journaux (audit M17).
- Aucun secret n'entre dans le journal; le corps de requête est conservé tel qu'envoyé, sans clé.
- Ce document ne fixe pas : les paramètres de requête (effort, réflexion, sorties structurées, `fallbacks` désactivés), les plafonds de jetons, le mode lot, le budget, le pilote. Tout cela est dans la [fiche P7](../projets/P7-synthese-agentique.md) et dans le protocole de reproduction (section sur les expériences LLM).

---

## 9. Stratégie de tests

### 9.1 Niveaux

Exécuteur : `node:test` (stable depuis Node v20.0.0; ramasse `**/*.test.ts` quand le type stripping est actif; snapshots stables depuis v23.4.0, audit M13). Commande unique : `npm run verify` = `tsc --noEmit` (deux configurations) → `node --test tests/core tests/determinism.test.ts tests/conformance.test.ts` → `node outils/verifier-docs.ts` → `node outils/verifier-cibles.ts` → `node outils/verifier-specs.ts` (traçabilité du noyau de spécification `specs/`, cas UC-008).

| Niveau | Contenu | Cadence |
|---|---|---|
| Noyau | T0.1, T0.3 à T0.16, T0.27; tests de grille, d'événements et de Poisson | à chaque commit |
| Conformité et déterminisme | T0.21, T0.26; test d'agrégation | à chaque commit |
| Reproduction | une cible par fichier, pilotée par `targets/`; `npm run reproduce` | avant une release et à la demande |
| Docking | `tests/docking/<projet>.test.ts` | avant d'ouvrir la couche 3 pour une référence |
| Traces dorées | snapshots d'empreintes (9.4) | à chaque commit sur la plateforme épinglée |
| Cohérence documentaire | `verifier-docs.ts`, `verifier-cibles.ts` | à chaque commit |

La durée cible du niveau « à chaque commit » est de [à confirmer] secondes; les réplications lourdes ne s'y trouvent pas.

### 9.2 Tests de reproduction pilotés par les fiches

Le gabarit de la **fiche de reproduction** (un fichier Markdown par cible, quinze champs) est fixé par [04-protocole-reproduction.md](04-protocole-reproduction.md); la fiche reste la source de lecture et de gel. `targets/<projet>/T<projet>.<n>.json` en est l'**extrait exécutable** : source et emplacement (champs 1 et 2), paramètres (4), protocole (5), niveau (7), critère et marge (8 et 9), répétitions (10), graines (11), règle de décision (12), statut de lecture (13), portes (14). Le type `ReproductionTarget` (section 5) en est le contrat. Les états d'une cible avant exécution sont ceux du protocole : `blocked`, `provisional`, `frozen`.

- **Correspondance fiche ↔ cible :** un projet est contrôlé dès que son dossier `targets/<projet>/` existe (ouverture de sa phase). `outils/verifier-cibles.ts` vérifie que chaque identifiant `T<projet>.<n>` défini dans une fiche de projet a exactement un fichier dans `targets/`, avec le même niveau, le même n et la même marge, et réciproquement. Toute différence est une erreur.
- **Cible bloquée ou provisoire :** une cible `blocked` (source non lue; paramètres issus d'un résumé, d'une notice ou d'une source secondaire) est exécutée en `todo` : aucun code de modèle n'est requis, elle est listée dans le rapport. Une cible `provisional` (valeur marquée **[à confirmer]**) ne produit que des runs `exploratory` et, au mieux, un verdict « sous réserve ». Ni l'une ni l'autre n'est jamais comptée comme réussie. Un run `confirmatory` exige une cible `frozen`, exécutée **une fois** sur la liste de graines gelée (aucun ajustement de paramètre pour franchir la cible : calage sur une cible distincte, protocole de reproduction).
- **Garde de puissance :** à la création du test, si le niveau est distributionnel (`TOST`), le harnais calcule `requiredNTost` et **échoue** si le n prévu est inférieur. Sans cette garde, une marge trop étroite passerait en silence. C'est la règle que le protocole de reproduction (section sur le choix de n) confie à ce harnais.
- **Issues :** `satisfied`, `unsatisfied` ou `inconclusive` (issue indéterminée : le harnais passe en un seul palier à `maxRepetitions`, sinon la cible le reste; des paliers intermédiaires viendront avec le préenregistrement, 04 §5.4), selon les quatre cas du protocole. Les critères d'une même cible sont conjonctifs. Chaque critère calcule une statistique par exécution (valeur finale d'une mesure, ou indicatrice d'un seuil pour une proportion), puis applique son test : `equal` (identité à tolérance), `TOST` (IC à 90 % dans ±δ; Welch si la source donne n et dispersion) ou `range` (IC à 95 % dans la plage, disjoint = non satisfaite). `order` et `fit` ne sont pas encore implantés; une cible qui les emploie est refusée.
- **Rapport :** chaque cible produit `data/results/<projet>/<id>.verdict.json` (cible, hachage de la cible, régime, `Verdict`) et `<id>.runs.csv` (une ligne par répétition : scénario, rang, graine, `runId`, empreinte finale, valeur brute des mesures visées), tous deux versionnés, et un manifeste par répétition, `data/results/<projet>/<id>/<scénario>-rep-<i>.manifest.json`, sans fichier de séries et hors de git (régénérable depuis le scénario et la graine). Un critère peut porter son propre scénario (une condition expérimentale, p. ex. une valeur de r); chaque scénario reçoit alors la même liste de graines. La graine de la répétition i est `graineDeRepetition(graine maîtresse, i)` (section 7.4). Toute déviation reçoit un identifiant `D-<projet>-<nnn>` du registre du protocole, jamais une correction silencieuse.
- **Réplication, pas validation :** un test qui compare le modèle à ses propres figures est une réplication. La validation exige des données non utilisées pour l'ajustement; la fiche le dit cible par cible.

### 9.3 Tolérances

| Niveau d'accord | Critère | Règle |
|---|---|---|
| Identité numérique | égalité exacte | entiers du PRNG, formules fermées déterministes à la tolérance déclarée |
| Équivalence distributionnelle | TOST : l'IC à 90 % de la différence tient dans [−δ, +δ], marge fixée **avant** les runs | le non-rejet d'un test de différence ne prouve pas l'équivalence ([Axtell et al. 1996] concluent ainsi; [Schuirmann 1987] et [Lakens 2017] montrent la voie correcte) |
| Équivalence relationnelle | signe, ordre, plage, monotonie | quand la source ne donne que des tendances |

Taille d'échantillon d'un TOST sur proportions : n par bras = 2p(1−p)(z₀,₉₅ + z₀,₉₀)²/δ², avec (z₀,₉₅ + z₀,₉₀)² = 8,564 (dossier x-methodes, M6 [I]). Pour p = 0,7 : 1 439 (δ = 0,05), 360 (δ = 0,10), 160 (δ = 0,15); pour p = 0,5 : 1 713, 429, 191. Appliqué à la fraction finale de la réponse de quorum de [Sumpter et Pratt 2009] (environ 75 %), une marge de ±2 points exige environ 7 920 répétitions par bras et ±4 points environ 1 980 (X18 du dossier x-methodes) : **avec 1 000 répétitions par bras, ±2 points n'est pas testable**.

Erreur-type de Monte Carlo à viser : confirmatoire ≤ 0,005 pour une proportion (10 000 répétitions au pire cas, 3 600 si p = 0,9); exploratoire ≤ 0,01 (2 500; 900) [I, dossier x-methodes, M5]. Le seuil de 1 000 répétitions est un plancher, pas une garantie : [Hauke et al. 2020] jugent 5 000 répétitions suffisantes pour un modèle publié avec 100. Formules d'erreur-type par statistique : [Morris et al. 2019], dont l'erreur-type de l'écart-type empirique, EmpSE/√(2(n−1)). Échelle de la marge : relative pour les durées (de ±10 à ±15 %), en points pour les proportions (de ±4 à ±10 selon n), en log₁₀ pour les erreurs d'optimisation (±0,5 décade) [I, dossier x-methodes, M6].

### 9.4 Traces dorées

Empreinte d'état à t = 100 et t = 1 000 pas pour quelques graines, en snapshot (audit M13). Valide pour la version de Node épinglée (`.node-version`) et la plateforme du poste. Le test compare d'abord la version du moteur et saute (avec message) si elle diffère; la régénération d'un snapshot est un commit dédié, avec sa raison. La trace dorée détecte une régression; elle ne prouve rien sur les moteurs autres.

### 9.5 Docking

`tests/docking/<projet>.test.ts` exécute, avec les mêmes graines maîtres, la référence et le modèle chorégraphique réglé sur le canal correspondant, puis compare les observables déclarées au niveau déclaré (section 2.4). Il échoue si le n prévu est inférieur au n requis par la marge. Les modèles du socle sont d'abord alignés sur leur oracle Python (section 2.4). Le test part d'une référence dont la cible est `satisfied` : sans cela, il se met en `todo`.

### 9.6 Cibles de vérification du socle

La colonne « Dossier » donne l'identifiant du dossier x-methodes. `T0.n` reprend `Xn` (correspondance posée par le protocole de reproduction, reprise par la fiche S0). X2 (PCG32) n'est pas retenu et n'a pas de cible : la numérotation saute de T0.1 à T0.3. T0.26 et T0.27 sont les identifiants que la fiche S0 réserve au déterminisme et à Euler–Maruyama (critères CS0.3 et CS0.5 de la fiche); leur critère technique est précisé ici [I]. Le protocole écrit quelque part `TS0.n` pour les mêmes tests (voir les points ouverts). **La porte de code du protocole est franchie quand T0.1 et T0.3 à T0.6 passent, avec T0.21, et que `tsc --noEmit` et `node --test` sortent à 0** (critère CS0.1 de la fiche S0).

| ID | Cible | Critère | Dossier |
|---|---|---|---|
| T0.1 | xoshiro128**, état [1, 2, 3, 4] | les 10 premières sorties (11520, 0, 5927040, 70819200, 2031721883, 1637235492, 1287239034, 3734860849, 3729100597, 4258142804) à l'identité, sous Node et trois navigateurs | X1 |
| T0.3 | SplitMix64, graine 1477776061723855037 | les 3 premières sorties (1985237415132408290, 2979275885539914483, 13511426838097143398) à l'identité | X3 |
| T0.4 | ordre de RK4 sur M1c (σ = 10, γ = 3, α = 1/3, ρ = 3, T = 4, y₀ = (0,01; 0,0101)) | rapport des erreurs maximales quand h → h/2 ∈ [12; 20] (référence h = T/64 000) | X4 |
| T0.5 | équilibre de M1c à σ = 10 | (Ψ_A, Ψ_B) = (0,8497; 0,0392) à ±10⁻³, t = 200, h = 0,01, y₀ = (0,0101; 0,01) (A favorisée; avec le y₀ de T0.4, B l'emporte et l'ordre s'inverse) | X5 |
| T0.6 | SSA direct, U→A seul | moyenne de A(t = 2), N = 200, γ = 0,5, sur 2 000 runs, à moins de 3 erreurs-types de 126,42 (mesuré dans le dossier : 126,16 ± 0,15) | X6 |
| T0.7 | docking EDO ↔ SSA de M1c (exploratoire, aucune valeur publiée) | P(|A−B|/N > 0,3 à t = 40) sur 200 runs : à σ < σ* (1,6875), décroît avec N (0,445 ± 0,035 à N = 50; 0,105 ± 0,022 à N = 200); à σ = 10, tend vers 1 (0,950 ± 0,015; 1,000) | X7 |
| T0.8 à T0.16 | `analysis/` : formules statistiques reprises par le protocole | retrouve : n = 969 et MDE 13,27 % et 7,57 % de [Miller 2024] (X8, X9); facteur (1 + 2/K)/3 (X10); exemple du §4.2 à 1/12 et non 1/9 (X11); n_sim = 1 900 (couverture 95 %, ES = 0,5 %) et 10 000 au pire cas (X12); n par groupe de TOST 70, 191, 429 à ±2 (X13); seuil K-S 0,3037 pour n = 40 (X14); interaction ×2 et ×16 (X15); erreur-type de l'écart-type empirique EmpSE/√(2(n−1)) (X16) | X8 à X16 |
| T0.21 | conformité | aucun motif interdit (7.2) ni import hors tableau (2.2); aucun appel à `Math.random` dans la logique de simulation | X21 |
| T0.26 | déterminisme N1 | deux exécutions du même scénario et de la même graine donnent les mêmes empreintes à t = 100 et t = 1 000 pas; ajouter un flux n'altère pas les tirages des autres; le flux de `derive('a')` est inchangé si `derive('b')` est consommé | fiche S0 (CS0.3), critère technique précisé ici [I] |
| T0.27 | Euler–Maruyama sur un processus d'Ornstein–Uhlenbeck, dx = bx dt + c dW | moyenne x₀e^{bt} et variance c²(e^{2bt} − 1)/(2b) à moins de 3 erreurs-types sur [à confirmer] runs, à dt et à dt/2 | fiche S0 (CS0.5), critère technique précisé ici [I] |

**Tests propres au moteur** (sans identifiant de cible; tests unitaires qui ne reproduisent aucun résultat publié, et que le chercheur peut promouvoir en cibles de la fiche S0) :

| Test | Critère |
|---|---|
| agrégation des balayages (`tests/determinism.test.ts`) | un balayage jouet donne le même `results.csv` (SHA-256) avec 1, 2 et 4 travailleurs |
| ordre des événements (`tests/core/events.test.ts`) | 10⁴ événements aléatoires dont des égalités forcées sortent dans l'ordre (temps, insertion) |
| grille (`tests/core/grid.test.ts`) | évaporation = formule fermée à la tolérance déclarée; refus de r > 1/4; Δx et Δx/2 donnent la même statistique de colonie; évaporation paresseuse = immédiate |
| Poisson (`tests/core/random.test.ts`) | test du khi-deux contre la loi pour λ ∈ {0,169; 0,807} (valeurs d'entrée de la cible T-F1 du dossier P4) et sur la plage de λ déclarée; erreur au-delà de λ_max |

---

## 10. Balayages paramétriques et diagrammes de phases

### 10.1 Exécution

`SweepPlan` (section 5) définit le produit cartésien des axes, le nombre de répétitions et les observables. Chaque tâche est un couple (point, répétition) indépendant, de graine dérivée (7.4). `sweep/executor.ts` distribue les tâches à un groupe de `worker_threads`; chaque travailleur renvoie un petit tampon typé; le fil principal **réordonne par (point, répétition) avant d'écrire** : le résultat ne dépend ni du nombre de travailleurs ni de l'ordre d'arrivée (test d'agrégation de la section 9.6). Une exécution interrompue reprend (`--resume`) en sautant les tâches dont la ligne existe et dont le hash de scénario correspond. Les balayages sont **toujours headless**; les pages reçoivent des résumés (8.3).

### 10.2 Observables

Une observable est une statistique d'un run sur une fenêtre après rodage (moyenne sur la fenêtre, [Broeke et al. 2016]), déclarée dans le plan. Pour une sortie bimodale (décision A ou B, extinction), les indices de variance se lisent mal : on rapporte la probabilité de chaque mode.

### 10.3 Diagrammes de phases et de bifurcation

- Carte 2D : deux axes, valeur ± erreur-type de Monte Carlo par cellule. Exemples déjà identifiés : la carte de persistance et de non-linéarité de P1; les largeurs de zones de [Couzin et al. 2002] (plages du tableau 1 de la source; 30 répétitions par combinaison); σ et v de P5.
- Hystérésis : `direction: 'up'` puis `'down'` avec `carryState` (l'état d'un point devient l'état initial du suivant). Protocole publié pour le tore : 2 000 pas par valeur de r_o, 15 répétitions (dossier P6, M1). Une transition se repère par un seuil sur l'observable; on la raffine par un second balayage plus fin, déclaré explicitement, jamais par un raffinement automatique caché.
- Près d'une bifurcation, l'horizon doit croître (ralentissement critique); le plan déclare l'horizon par axe.

### 10.4 Analyse de sensibilité

Selon [x-methodes](../recherche/dossiers/x-methodes.md) (M4), sans trancher à la place de la fiche : OFAT étendue (au moins 10 niveaux par paramètre et 10 répétitions) pour toute figure de mécanisme [Broeke et al. 2016]; méthode globale (Sobol', [Sobol' 2001]) quand le nombre de paramètres k ne dépasse pas une quinzaine, avec N ≥ 1 000, N(k+2) exécutions (k = 8 : 10 000 runs) et IC par bootstrap; criblage de Morris au-delà ([Morris 1991], [Campolongo et al. 2007]); l'ordre de mise à jour est un facteur catégoriel de toute analyse. [Saltelli et al. 2019] jugent faux les travaux qui n'explorent que des couloirs à une dimension : l'OFAT sert à lire un mécanisme, et attribuer la variance entre paramètres exige l'analyse globale.

---

## 11. Budgets de performance par projet

Les budgets viennent des charges **publiées** dans les dossiers; les coûts sont des calculs de ce document [I], à confirmer par SPK10. Aucun n'est une mesure.

| Projet | Charge de référence (source) | Coût par run [I] | Exécution prévue |
|---|---|---|---|
| P1 | Goss : au plus 2 000 passages, 1 000 simulations par condition; Seeley : sept compartiments, 240 min; version agents : 125 abeilles, 100 répétitions; Okada : 1 000 abeilles, au moins 50 répétitions par σ (dossier P1) | RK4 : 240 min / 0,01 min = 2,4×10⁴ pas | headless et page en direct |
| P2 | Ant System : n = m = 30, 5 000 cycles, 10 essais (30 recommandés); ABC : environ 500 050 évaluations par essai, 30 essais (dossier P2) | O(NC·n²·m) = 1,35×10⁸ opérations de base par essai (Ant System) | headless; la page montre une exécution |
| P3 | N = 1 000, 20 000 pas, 5 graines dans le pré-test (dossier P3) | 2×10⁷ pas-agents | headless et page |
| P4 | Prabhakar : 2×10⁵ créneaux par run; files : 3×10⁴ événements de rodage puis 2×10⁴ à 5×10⁴ de mesure, de 10 à 10 000 ouvrières, 10 répétitions (2 au-delà de 4 000) (dossier P4) | au plus 8×10⁴ événements, tas en O(log n) | headless et page |
| P5 | M1c : t = 500, h = 0,01; SSA : N = 50 à 200, 200 runs; quorum : n = 40, 1 000 runs, 250 à 310 pas (dossier P5) | 5×10⁴ pas RK4 par intégration | headless et page |
| P6 | [Couzin et al. 2002] : N = 100, au plus 5 000 pas, 30 répétitions par combinaison; [Couzin et Franks 2003] : N = 50, 5 000 pas, 100 répétitions; [Aswale et al. 2022] : n = 1 024, 50 000 pas, 20 simulations par configuration (dossier P6) | zones : N² × 5 000 = 5×10⁷ paires par run, 1,5×10⁹ par combinaison (voisinage en O(N²)); Aswale : 1 024 × 32 sondes × 50 000 = 1,6×10⁹ lectures, plus 129 600 cellules (1 920/4 × 1 080/4, en lisant « cellules de 4 » comme une taille de 4 unités) × 50 000 pas = 6,5×10⁹ mises à jour si l'évaporation n'est pas paresseuse | balayages headless; page : une exécution |
| P7 | 10 agents × 30 tours = 300 appels par exécution; 30 exécutions par cellule LLM, 1 000 par cellule à règles (dossier P7) | le moteur est négligeable; le coût est celui des appels (fiche P7) | headless avec API; pages : rejeu seulement |
| P8 | [Sasaki et al. 2013] : population de 100; [Hong et Page 2004] : 2 000 positions, 50 réplications; formules (dossier P8) | négligeable | headless et page |
| P9 | [Vicsek et al. 1995] : N jusqu'à 10 000, 3 000 pas dont 1 500 de chauffe, au moins 20 graines; [Garnier et al. 2013] : 1 000 répétitions par combinaison, 100 périodes; [Mlot et al. 2011] : N de 1 000 à 7 000; [Khuong et al. 2016] : 500 agents, treillis 200³, 1 500 déplacements élémentaires par agent et par Δt = 1 s, 10 simulations par durée de vie de la phéromone (dossier P9) | Vicsek N = 10⁴, ρ = 4, r = 1 : environ 10⁴ × πρ ≈ 1,3×10⁵ paires par pas avec listes de cellules; Khuong : 7,5×10⁵ déplacements par pas, soit 2,6×10¹¹ pour 96 h simulées (si l'horizon est celui de la cible de distance au plus proche voisin) | headless; page en direct pour Vicsek, Mlot, Garnier; Khuong précalculé |

Deux cas dominent : le noyau de [Khuong et al. 2016] et les balayages de [Couzin et al. 2002] et de [Aswale et al. 2022]. Ce sont eux que mesure SPK10. Le pas de temps de chaque modèle est celui de la section 3.1.

**Navigateur.** Les charges interactives visées sont celles du spike : 10⁴ agents (taille maximale de [Vicsek et al. 1995], ordre de grandeur de la grappe de [Peleg et al. 2018] [à confirmer]) et 10⁵ agents (colonie de 100 000 fourmis dans l'estimation du SI de [Reid et al. 2015] : un cas de visuel, pas un effectif de modèle publié [I]). Les seuils de temps par pas et d'images par seconde sont fixés **avant** les mesures (section 12); la valeur de départ proposée pour le pas est la moitié d'une image à 60 Hz, soit 8 ms [à confirmer, audit M11].

**Règle de décision pour WASM.** WASM n'entre que si : (i) SPK4, SPK5 ou SPK10 montre un noyau au-dessus du budget fixé d'avance; (ii) les améliorations algorithmiques documentées ne suffisent pas (listes de voisins, évaporation paresseuse, tampons typés, `worker_threads`); (iii) la version WASM passe les mêmes cibles, avec équivalence TOST sur les observables face à la version TypeScript; (iv) la déviation est inscrite au registre; (v) la frontière est un module unique, au pont minimal et au build documenté (compétence « polyglotte » du chercheur).

---

## 12. Spike de la phase 0

**But :** lever les inconnues d'hébergement, de worker, de transfert de tampons, de rendu à 10⁴ et 10⁵ agents et de téléchargement avant P1, et mesurer les noyaux lourds. Durée visée : une demi-journée [I, audit M11], à ajuster à la pratique. **Sortie :** `spikes/phase0/rapport.md` (tableau de mesures, manifeste d'environnement, décisions D1 à D5).

**Deux cibles d'hébergement** (celles de la fiche S0, critère CS0.11) : **A**, page statique, doit réussir; **B**, artifact, est mesurée et rapportée, et son échec ne bloque pas. La colonne « Cible » ci-dessous dit où chaque spike s'applique. Correspondance proposée avec les expériences de la fiche S0 [I] : E0.4 = SPK1 à SPK7 et SPK9; E0.5 = SPK8; la fiche numérote ses contrôles (i) à (vi) et la correspondance avec SPK1 à SPK12 s'établit quand elle est complète.

**Prérequis :** Node ≥ 24.12 (poste : v24.19.0); TypeScript 7.0.2 installé globalement (contrôle du 2026-10-01; la fiche S0 le disait absent : à revérifier sur le poste); esbuild à installer (absent); Chromium, Firefox et WebKit (WebKit sous Windows : [à confirmer]; à défaut, un poste macOS); avant d'écrire la page du spike, **charger la documentation des capacités d'artifact** (`downloads`, `assets`, `db`), qui fixe leurs signatures et quotas; ce document ne les reprend pas. Les seuils marqués [à confirmer] se fixent dans `spikes/phase0/protocole.md` **avant** la première mesure.

**Charges :** 10⁴ et 10⁵ agents; modèle jouet de type Vicsek à N = 400 pour les empreintes; structure de tableaux (`Float32Array` x, y, θ, plus un tampon d'état).

| ID | Question | Cible | Procédure | Critère de réussite | En cas d'échec |
|---|---|---|---|---|---|
| SPK1 | Hébergement | A et B | servir la page du spike comme page statique (par exemple GitHub Pages [à confirmer]) et la publier comme artifact privé; exécuter 1 000 pas | les deux affichent l'état initial et exécutent sans erreur de console; empreintes égales sur un même navigateur | décision D1; échec sur B : rapporté |
| SPK2 | Worker | A et B | créer un worker (a) depuis `blob:`, (b) depuis un fichier de support publié avec la page (l'outil Artifact accepte des fichiers de support, description de l'outil au 2026-10-01; l'audit M10 supposait un fichier unique) | (a) ou (b) démarre sans violation de la politique de sécurité de contenu, reçoit un scénario, répond | calcul par tranches sur le fil principal, budget par tranche [à confirmer]; repli mesuré |
| SPK3 | Transfert de tampons | A et B | aller-retour de deux `ArrayBuffer` avec liste de transfert, 10⁵ agents × 4 `Float32Array` (environ 1,6 Mo [I]); lire `crossOriginIsolated` | tampon source détaché (`byteLength` nul); aller-retour médian ≤ [à confirmer] ms; aucun `SharedArrayBuffer` requis | rester sur le transfert (déjà le plan) |
| SPK4 | Calcul par pas | A | 10⁴ puis 10⁵ agents; 1 000 pas; médiane et p95 du temps par pas | médiane ≤ [à confirmer] ms à 10⁴; ≤ [à confirmer] ms à 10⁵ | plafonner N interactif; appliquer la règle WASM |
| SPK5 | Rendu | A | (a) Canvas 2D en un seul chemin; (b) écriture directe de pixels et `putImageData`; (c) `OffscreenCanvas` dans le worker; (d) WebGL si (a) à (c) échouent | images/s médiane ≥ [à confirmer] à 10⁴ et à 10⁵; p95 de la durée d'image ≤ [à confirmer] ms | retenir la méthode la moins coûteuse qui passe; sinon décimation d'affichage déclarée (le calcul garde tous les agents) |
| SPK6 | Découplage de la cadence | A | empreinte à t = 1 000 pas sous : cadence d'écran nominale, cadence limitée, onglet masqué (`requestAnimationFrame` suspendu, audit M2) | empreintes identiques | **bloquant** : défaut de conception |
| SPK7 | Téléchargements | A (`Blob` et `<a download>`), B (`downloads.save`) | exporter un CSV de 1 Mo [I] et un manifeste | SHA-256 du fichier reçu égal à celui calculé dans la page; le refus du visiteur n'est pas une erreur | bouton masqué (audit M12) |
| SPK8 | Déterminisme inter-moteurs | poste | T0.1 et T0.3 sous Node et trois navigateurs; puis le modèle jouet (N = 400, 1 000 pas, graine fixe) : comparer les empreintes | identité sur T0.1 et T0.3 (critère); l'identité des empreintes du modèle jouet est une **mesure** (consigner le pas de première divergence) | si T0.1 ou T0.3 échoue : **bloquant** (si un moteur manque : entrée au registre, clause limitée aux moteurs testés, comme CS0.2); sinon la mesure confirme ou infirme N2 |
| SPK9 | Taille | A et B | bundle minifié du noyau, d'un modèle et du worker; page complète | page ≤ 16 Mo sur B (outil Artifact); bundle ≤ [à confirmer] ko | fichiers de support; capacité `assets` |
| SPK10 | Noyaux headless | headless | micro-bancs, médiane de 5 : déplacements élémentaires par seconde du noyau de [Khuong et al. 2016]; événements par seconde du SSA (T0.6); paires par seconde de [Couzin et al. 2002]; lectures de sondes et évaporation de grille de [Aswale et al. 2022] | pour chaque projet de la section 11, durée estimée d'un balayage complet ≤ [à confirmer] h sur le poste | optimisation algorithmique, puis règle WASM |
| SPK11 | Balayage parallèle | headless | `worker_threads` avec 1, 2 et 4 travailleurs sur un balayage jouet | `results.csv` identique (SHA-256); gain de débit consigné | **bloquant** : corriger l'ordre d'agrégation (test d'agrégation, section 9.6) |
| SPK12 | Chaîne TypeScript et build | poste | `node src/cli/run.ts` sans build; `tsc --noEmit` sous les deux configurations; bundle esbuild IIFE; worker construit depuis le bundle; `node --test`; **deux builds de la page au même hachage** (critère CS0.12 de la fiche S0) | tout passe sur Node ≥ 24.12; hachages de build égaux | **bloquant** |

**Décisions consignées :** D1 hébergement, cible A confirmée et cible B rapportée (SPK1, SPK2, SPK9); D2 worker (SPK2, SPK3); D3 méthode de rendu (SPK5); D4 WASM oui ou non, par noyau (SPK4, SPK5, SPK10); D5 N maximal interactif par projet (SPK4, SPK5). **Porte 0 (sortie de la phase 0) :** (i) les quatre spikes bloquants (SPK6, SPK8 sur T0.1 et T0.3, SPK11, SPK12) sont réussis; (ii) SPK1, SPK2, SPK3 et SPK7 réussissent sur la cible A, ou leur repli est mesuré (critère CS0.11 de la fiche S0); (iii) D1 à D5 sont rendues. SPK4, SPK5 et SPK10 ne bloquent pas : ils plafonnent N ou décident de l'optimisation. Cette porte est distincte des portes fonctionnelles du protocole de reproduction (lecture, code, réplication, docking, extension) : la porte de code de ce protocole ne dépend que de T0.1 et T0.3 à T0.6, avec T0.21 (section 9.6).

---

## 13. Outillage minimal

- **Node :** version ≥ 24.12 (type stripping stable : v24.12.0 et v25.2.0, audit M10); poste du chercheur : v24.19.0. Node exécute le `.ts` sans build; son `tsconfig.json` est ignoré. Contraintes du stripping : pas d'`enum`, pas de `namespace` avec code, pas de *parameter properties*, pas de décorateurs; extensions `.ts` dans les imports; `import type` pour les types.
- **TypeScript :** `tsc --noEmit` vérifie les types (poste : 7.0.2). Options : `strict`, `erasableSyntaxOnly`, `verbatimModuleSyntax`, `allowImportingTsExtensions`, `noUncheckedIndexedAccess`. **Deux configurations** : `tsconfig.json` (types Node, pour `cli/`, `sweep/` et les tests) et `tsconfig.browser.json` (`lib: dom`, sans types Node, pour `browser/`); `core/` et `models/` compilent sous les deux, ce qui interdit toute API Node dans le noyau.
- **Bundle navigateur :** esbuild `--bundle --format=iife --minify`, puis injection du JavaScript dans le HTML; un second bundle pour le worker. esbuild ne vérifie pas les types : `tsc --noEmit` reste obligatoire. C'est une frontière d'**outillage**, non de langage.
- **Dépendances :** aucune à l'exécution. En développement : `typescript`, `@types/node`, `esbuild`, et pour `tests/pages/` un pilote de navigateur et un vérificateur d'accessibilité. Pas de framework ECS, pas de bibliothèque physique.
- **Langages :** TypeScript partout. Les scripts Python de `recherche/verifications-numeriques/` sont des **secondes implémentations** (oracles, bibliothèque standard seulement); leurs sorties sont versionnées dans `data/oracles/`, ils ne sont pas dans le build et aucun pont ne les relie au moteur à l'exécution.
- **Statistiques :** TOST, bootstrap, Holm, erreur-type de Monte Carlo, formules d'évaluation des LLM de [Miller 2024] et plans de sensibilité sont en TypeScript dans `analysis/` (T0.8 à T0.16). Les modèles mixtes (lme4, simr) recommandés pour P7 sont hors du moteur et lisent les exports CSV; leur place dans la chaîne relève de [03-plan-de-recherche.md](03-plan-de-recherche.md).
- **Tests de pages :** les critères d'acceptation des pages de V0 (TV0.n de [07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md) : contraste, cibles, mouvement, règles automatisées, attributs `data-statut` et `data-regime`) se placent dans `tests/pages/`, sur le même exécuteur `node:test`. Ils exigent un pilote de navigateur et un vérificateur d'accessibilité en dépendances de **développement** (choix de l'outil [à confirmer]); rien de cela n'entre dans `core/` ni dans les bundles de pages.
- **WASM :** seulement selon la règle de la section 11.

---

## 14. Ce que la couche navigateur ne doit jamais faire

| Interdit | Raison | Contrôle |
|---|---|---|
| Calculer quoi que ce soit de la simulation (équation, règle, tirage, évaporation) hors de `core/` et `models/` | un seul lieu de calcul, donc un seul lieu à vérifier | conformité (2.2, 7.2); `tsconfig.browser.json` |
| Cadencer la simulation sur `requestAnimationFrame` ou sur le temps mural | l'animation irait plus vite sur un écran à haute fréquence et s'arrêterait dans un onglet masqué (audit M2) | SPK6 |
| Appeler `Math.random`, `Date.now`, `performance.now` dans le chemin de simulation | graine non choisissable; non-rejouable | T0.21 |
| Recalculer des constantes dérivées critiques en mode Voir ou Vérifier | N1 repose sur des littéraux calculés une fois sous Node | revue de `compile-scenarios.ts` |
| Contourner `compileScenario` quand l'utilisateur change un paramètre (mode Explorer) | validation de r ≤ 1/4, des unités, des bornes | test d'intégration de la page |
| Appeler une API de LLM, le réseau, ou la capacité `sample` pour produire des données | les pages rejouent des journaux et ne les produisent pas; `sample` ne fixe pas le modèle (audit m7) | revue; politique de contenu |
| Exécuter du code fourni par l'utilisateur ailleurs que dans un worker isolé | « Modifier la règle » (V0) s'exécute dans un worker sans réseau, avec quota de pas et de temps, jamais sur le fil principal et jamais encodé dans l'URL; le code passe par l'interface `Policy.decide` et le résultat est `exploratory`, étiqueté « Règle modifiée : hors des résultats reproduits » | revue; `regime` du manifeste |
| Muter l'état du modèle depuis l'interface | toute action de l'utilisateur est une **intervention datée en temps de simulation**, inscrite au manifeste, sans quoi un run Explorer ne se rejoue pas | `Simulation.apply`; `interventions` du manifeste |
| Réduire en silence le nombre d'agents affichés | une décimation d'affichage est étiquetée; le calcul garde tous les agents | revue |
| Calculer des statistiques d'inférence à l'affichage (TOST, erreur-type) hors de `analysis/` | une seule implémentation, testée (T0.8 à T0.16) | conformité |
| Normaliser le temps d'un écran partagé par un calcul ad hoc | l'échelle est un facteur d'affichage (`displayTimeScale`) déclaré dans le scénario et montré à l'écran, jamais un calcul de simulation (audit m5) | revue |
| Laisser le stockage du navigateur influencer un résultat | `localStorage` ne sert qu'à des commodités d'interface (onglet, panneau replié) | revue |

Mapping des niveaux de V0 ([07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md)) : **Voir** et **Vérifier** utilisent des scénarios compilés (littéraux) et des résultats précalculés; **Explorer** appelle `compileScenario` du noyau dans la page. Un run Explorer est donc de niveau N2 par rapport à Node et ne peut pas être confirmatoire : la page l'étiquette « calcul navigateur, non confirmatoire », affiche un compteur « n sur N » où N est le `preregisteredN` du résumé (section 8.3), et n'affiche jamais moins que ce N sous l'étiquette « Résultat reproduit ». Chaque bloc d'énoncé et chaque figure porte les attributs `data-statut` et `data-regime`, dont la valeur découle du `regime` du manifeste (`confirmatory` donne `confirmatoire`, `exploratory` donne `exploratoire`).

---

## 15. Rejouabilité

- **Rejeu exact (N1).** `node src/cli/replay.ts <manifeste>` recompile le scénario, relance les flux à partir du manifeste, applique les interventions et compare les empreintes. Code de sortie non nul si l'une diffère **et** que le moteur, sa version et la plateforme sont ceux du manifeste; sinon la commande affiche « moteur différent : équivalence statistique seulement ».
- **Rejeu en page.** La page charge un manifeste, rejoue dans son worker, compare l'empreinte finale à celle du manifeste et affiche l'un de deux états : « identique » (même moteur) ou « autre moteur : trajectoire non garantie identique, distributions équivalentes ». Elle n'affirme jamais mieux que ce que N1 permet.
- **Une exécution = un manifeste.** Pour un modèle déterministe, manifeste plus graine suffisent; on ne stocke pas la trajectoire. Le mode Explorer inscrit ses interventions (section 14).
- **Runs LLM (N3).** L'environnement est déterministe pour une graine, mais les réponses du modèle ne se reproduisent pas (aucun paramètre `seed` visible, `temperature` non réglable sur les modèles récents, [Anthropic 2026a]; non-déterminisme documenté par [Atil et al. 2024]). Le rejeu se fait donc **par cassette** : l'adaptateur sert la réponse journalisée; un hachage de requête différent signale une divergence du moteur. L'expérience est **rejouable, non ré-exécutable** après le retrait d'un modèle. Noms de champs du journal : section 8.6; adaptateur, paramètres de requête et plafonds : [fiche P7](../projets/P7-synthese-agentique.md).
- **Archivage.** Manifestes, `results.csv` et journaux vont dans l'archive de données; licences, DOI et SWHID : [08-science-ouverte-ethique.md](08-science-ouverte-ethique.md).

---

## 16. Prérequis, risques et critères d'achèvement

### 16.1 Prérequis

Node ≥ 24.12; TypeScript ≥ 5.8 (pour `erasableSyntaxOnly`; poste : 7.0.2); esbuild; trois navigateurs pour SPK8; l'oracle Python de chaque modèle du socle (déjà présent pour P1 à P5 dans `recherche/verifications-numeriques/`); la documentation des capacités d'artifact avant d'écrire la page du spike; les fiches de projet et leurs tableaux de cibles avant `targets/`.

### 16.2 Risques techniques

Les numéros R20 à R28 sont réservés à ce document; les autres documents évitent cette plage. La fiche S0 tient son propre registre (R0.1 à R0.13); le plan de recherche et la feuille de route renumérotent en une passe.

| ID | Risque | Parade | Vérifié par |
|---|---|---|---|
| R20 | divergence numérique entre moteurs : un rejeu en page n'est pas la trajectoire de Node | niveaux N1 et N2, constantes littérales, affichage honnête | SPK8 |
| R21 | worker `blob:` refusé par la politique de sécurité de contenu de l'hébergement | fichier de support, tranches sur le fil principal, page statique | SPK2 |
| R22 | budget headless dépassé (noyau de Khuong et al., balayages de Couzin et al., Aswale et al.) | optimisation algorithmique, `worker_threads`, puis WASM selon la règle | SPK10 |
| R23 | paramètre **[à confirmer]** pris pour un fait dans un run confirmatoire | régime et statut dans le scénario; refus à la compilation | T0.21 et test de compilation |
| R24 | cible non testable au n prévu (marge trop étroite) | garde de puissance dans `verifierCible` (`nRequis`, UC-003 A3) | 9.2 |
| R25 | dérive entre la fiche (Markdown) et `targets/` | `verifier-cibles.ts` | `npm run verify` |
| R26 | artefact d'ordre de mise à jour | facteur `order`, test de sensibilité par modèle à agents | 7.3 |
| R27 | modèle LLM retiré : run non ré-exécutable | cassette; dire « rejouable, non ré-exécutable » | fiche P7 |
| R28 | dérive de version de Node ou de TypeScript : traces dorées périmées | `.node-version`, version dans le manifeste, snapshots régénérés sur décision | 9.4 |

### 16.3 Critères d'achèvement de S0 (simulation)

Le socle de simulation est achevé quand les six points suivants sont vrais :

1. `npm run verify` passe sur Node ≥ 24.12 (deux configurations `tsc`, tests rapides, `verifier-docs.ts`, `verifier-cibles.ts`).
2. Les cibles T0.1, T0.3 à T0.16, T0.21, T0.26 et T0.27 et les quatre tests propres au moteur passent, et T0.1 et T0.3 sont identiques sous Node et trois navigateurs.
3. Le rapport du spike est remis avec D1 à D5 et un manifeste d'environnement; la porte 0 de la section 12 est franchie, et deux builds de la page-pilote donnent le même hachage.
4. **Tranche verticale :** le pont de [Goss et al. 1989] (P1) s'exécute en headless (1 000 simulations par condition), s'exporte (CSV et manifeste), se rejoue dans une page avec une empreinte identique sur le même moteur, et le harnais rend le verdict du critère d'histogramme du dossier P1 (chaque classe à ±5 points de la lecture publiée).
5. Chaque modèle du socle a ses deux implémentations (TypeScript et oracle Python) alignées au niveau déclaré.
6. Le registre des déviations ne contient aucune déviation ouverte sur le noyau.

Ces critères alimentent les critères de réussite CS0.1 à CS0.3, CS0.5, CS0.11 et CS0.12 de la [fiche S0](../projets/S0-socle.md), qui fait foi pour la porte de sortie de la phase 0.

---

## 17. Points ouverts et tensions avec le cadre

1. **Euler–Maruyama dans le noyau.** Le cadre (architecture de simulation) nomme RK4 et Gillespie; Euler–Maruyama y est ajouté parce que les EDS de P1, P4, P5 et P8 l'exigent (x-choregraphie, section 5). À reporter dans le cadre.
2. **WASM.** Le cadre le lie à N en navigateur; la règle de la section 11 l'étend aux noyaux headless (cas de [Khuong et al. 2016]). À trancher une fois SPK10 mesuré.
3. **« Validé contre » et docking.** Le cadre (principe 6) écrit que le modèle chorégraphique est « validé contre » chaque référence; le principe 1 réserve « validation » aux données empiriques. Ce document écrit « aligné par docking », selon la correction recommandée dans x-methodes (section sur les corrections au cadre).
4. **Précisions au cadre, sans contradiction :** xoshiro128\*\* initialisé par SplitMix64, méthode directe de Gillespie, interdiction de `Math.random`, relevés dans x-methodes; à reporter dans le cadre.
5. **Fichier unique d'artifact.** L'audit M10 supposait un fichier HTML unique; l'outil Artifact accepte des fichiers de support. SPK2 tranche si un worker peut en être chargé.
6. **Identifiants.** Ce document ne crée aucune cible `T0.n` : T0.26 et T0.27 sont sa lecture des critères CS0.3 et CS0.5 de la fiche S0, à confirmer quand la section des cibles de la fiche sera écrite; les quatre tests propres au moteur (section 9.6) n'ont pas d'identifiant et peuvent être promus en cibles par la fiche. Le protocole de reproduction écrit `T0.n = Xn` dans sa section sur les vérifications de code mais `TS0.n` ailleurs (références à TS0.5 et TS0.6, et renvoi à ce document pour les définir) : l'écriture retenue ici est `T0.n`, qui est celle de la fiche S0 et que contrôle `verifier-docs.ts`.
7. **Risques R20 à R28.** Plage réservée; si la feuille de route ([09-feuille-de-route.md](09-feuille-de-route.md)) tient son propre registre, elle reprend ces identifiants ou les renumérote en une passe. Les plages déjà prises par d'autres documents (R30 à R41, R41 à R56, R50 à R62, R60 à R69) ne recoupent pas R20 à R28, mais se recoupent entre elles.
8. **WebKit sous Windows.** Non testable sur le poste actuel sans outil supplémentaire [à confirmer]; SPK8 le demande.
9. **lme4 et « aucune frontière entre langages ».** L'analyse par modèles mixtes de P7 sort du moteur et suppose R; le cadre ne dit rien de l'analyse. À trancher dans [03-plan-de-recherche.md](03-plan-de-recherche.md).
10. **Valeurs [à confirmer] de ce document.** Seuils de temps, d'images par seconde, de taille de bundle, durée du niveau rapide, λ_max de Poisson, nombre de runs de T0.27 : fixés dans le protocole du spike ou par le test correspondant, avant toute mesure confirmatoire.
11. **Données de P4 et de P9 non lues.** Cibles bloquées dans les dossiers (par exemple les SI de [Gelblum et al. 2015]) : leurs modèles ne s'implantent pas avant lecture; `blocked` les rend visibles dans le rapport.
12. **Schéma du journal LLM.** Le protocole de reproduction (section sur le périmètre) et le document de science ouverte renvoient à celui-ci pour le schéma du journal; la fiche P7 n'en donne pas à ce jour. Les noms de champs sont fixés en section 8.6; si la fiche P7 en définit d'autres, ce document prime pour les noms et la fiche pour le reste.
13. **« Modifier la règle » (V0).** Le document de vulgarisation prévoit un éditeur de règle exécuté dans un worker isolé; la section 14 l'admet à cette condition (sans réseau, avec quota, jamais dans l'URL, résultat exploratoire). Le quota de pas et de temps reste à fixer [à confirmer].
14. **TypeScript sur le poste.** La fiche S0 le dit absent; ce document l'a trouvé en version 7.0.2 installé globalement. À revérifier sur le poste avant d'écrire `package.json`.
15. **Contrôles de la cible A (fiche S0).** La fiche numérote ses contrôles de spike (i) à (vi) dans une section non encore écrite; la correspondance avec SPK1 à SPK12 (section 12) s'établit quand elle l'est.
16. **Tests de pages.** Les critères TV0.n de V0 se placent dans `tests/pages/`. Pilote de navigateur : Playwright (Chrome installé; Firefox et WebKit téléchargés pour le spike; [rapport du spike](../spikes/phase0/rapport.md)). Vérificateur d'accessibilité : axe-core 4.13, règles WCAG 2.0 à 2.2, niveaux A et AA (gabarit de page, 2026-10-01). La liste manuelle de 07 §8 reste à remplir par une personne (CS0.12).


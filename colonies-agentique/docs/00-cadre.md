# Cadre de recherche v4 — Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents

**Statut :** cadre arrêté après audit de la proposition v3 (7 audits indépendants, 12 dossiers de recherche vérifiés). Tous les documents du programme s'y conforment. En cas de conflit, ce document prime, puis on corrige l'autre.
**Date :** 2026-10-01. **Révision 4.1** (même jour, validation finale) : entérine les précisions demandées par les rédacteurs des documents et des fiches; la section 11 en donne la liste. **Langue :** français canadien; termes techniques et identifiants en anglais.

## 1. Intention

Étudier la dynamique de la fourmilière **et** de la ruche, au même titre, aux niveaux individuel et collectif, pour en tirer un parallèle rigoureux avec l'agentique (systèmes multi-agents, dont les agents LLM). Le programme livre :
- des **notes de recherche** de nature académique;
- des **simulations** qui reproduisent des résultats publiés avant toute extension;
- des **supports visuels** de vulgarisation, évalués.

## 2. Ce que l'audit a changé

### 2.1 Thèse reformulée
La v3 disait « la reine ne commande pas ». Le slogan est trop général (la reine régule la reproduction par phéromones) et il installe le mythe qu'il veut défaire. Thèse retenue :

> Chez les insectes sociaux, les décisions de travail et de déplacement émergent de règles locales et de signaux partagés, sans contrôle central à l'exécution. Le programme mesure dans quels environnements et pour quelles structures de tâche cette coordination est avantageuse, et ce qu'on peut en transposer aux systèmes d'agents.

« La reine ne commande pas » reste un constat biologique borné, jamais une prescription d'architecture.

### 2.2 « Chorégraphie » : trois axes, pas un mot
En informatique (WS-CDL, BPMN 2.0, programmation chorégraphique de Montesi, types de session multipartites), une **chorégraphie est un plan global explicite**, projeté sur les participants. Une colonie n'a aucun plan global. La v3 confondait l'absence de coordinateur à l'exécution et l'absence de plan. Typologie retenue, à trois axes :

| Axe | Valeurs |
|---|---|
| A1. Plan global explicite | oui / non |
| A2. Contrôle central à l'exécution | oui / non |
| A3. Médium de coordination | aucun (messages dirigés) / état partagé persistant / diffusion éphémère |

Quatre régimes en découlent :
- **Orchestration** : A1 oui, A2 oui (BPMN exécuté par un moteur, orchestrateur LLM).
- **Chorégraphie spécifiée** : A1 oui, A2 non (WS-CDL, types de session, Choral).
- **Auto-organisation stigmergique** : A1 non, A2 non, état partagé persistant (piste, tableau noir).
- **Auto-organisation par signaux directs** : A1 non, A2 non, diffusion éphémère ou messages dirigés locaux (danse, quorum, tandem, signal d'arrêt par contact).

Les régimes hybrides (p. ex. tableau noir à focus d'attention central) et la référence nulle (aucun canal) ne forment pas de régime supplémentaire : ils se classent par les indicateurs de `06-metriques-et-typologie.md`, qui fait foi pour la typologie. Le classement se fait au niveau du mécanisme étudié : au niveau de la boucle algorithmique, ACO et ABC comportent des éléments centraux (mise à jour globale, évaluateur), ce que la fiche P2 déclare.

Le « chorégraphe » de la colonie est la sélection naturelle; celui du système d'agents est le concepteur du prompt et des protocoles. Le **problème inverse** (spécifier des règles locales qui garantissent une propriété globale) est une question de recherche du programme (P7).

### 2.3 Fourmi et abeille : taxons nommés, pas archétypes
« La fourmi » et « l'abeille » ne sont pas des mécanismes. Chaque simulation nomme son taxon et son préréglage :

| Mécanisme | Taxon de référence |
|---|---|
| Recrutement par piste de masse | *Linepithema humile*, *Lasius niger* |
| Castes et seuils de réponse | *Pheidole* |
| Fourragement réglé par les contacts, sans piste | *Pogonomyrmex barbatus* |
| Tandem et quorum | *Temnothorax albipennis*; variantes publiées : *T. curvispinosus* (P5), *T. rugatulus* (P8) |
| Raids et moulin | *Eciton*, *Labidus* |
| Transport coopératif | *Paratrechina longicornis* |
| Auto-assemblage | *Eciton* (ponts), *Solenopsis invicta* (radeaux) |
| Construction stigmergique | *Lasius niger* (les modèles de termites et de guêpes servent de contrepoint, hors couple fourmi-abeille) |
| Danse, essaim, polyéthisme d'âge | *Apis mellifera* |
| Contre-exemple (pistes chez l'abeille) | Meliponini |

Le canal (« piste » ou « danse ») est une **variable du modèle**, jamais un attribut du taxon. Une fiche peut ajouter un taxon : elle le nomme, le justifie et l'inscrit dans son préréglage.

### 2.4 Corrections factuelles de la v3 (liste fermée)
Ces corrections s'imposent à tous les documents.

1. **Wilson 1984 :** après retrait des minors, ce sont les **majors** qui prennent le relais (répertoire ×1,4 à 4,5, activité ×15 à 30). La v3 disait l'inverse.
2. **Moulin :** le modèle fourmi est Couzin et Franks 2003 (suivi de piste). Couzin et al. 2002 est un modèle 3D de poissons et d'oiseaux, sans phéromone : contrepoint, pas modèle.
3. **Fonction de choix de Deneubourg :** n = 2; k ≈ 20 à confirmer dans le texte de 1990; A et B sont des passages cumulés. La réponse individuelle est de type Weber; le sigmoïde est un ajustement collectif (Perna et al. 2012).
4. **Ant System (1996) :** ρ est la *persistance* (τ ← ρτ + Δτ). La forme τ ← (1−ρ)τ + Δτ est une convention postérieure.
5. **Analogie TCP :** absente de Prabhakar et al. 2012; elle vient du communiqué de Stanford (Carey 2012) et de Gordon (2014).
6. **Loi de Little :** déjà appliquée à ce contexte (Anderson et Ratnieks 1999, annexe C). « Deux lectures de la même file » est inexact : la fourmi lit un débit sur la boucle de terrain, l'abeille un délai sur une file d'appariement.
7. **Signal d'arrêt :** une inhibition, pas un veto.
8. **Interblocage ≠ scission :** Lindauer 1955 décrit une scission (deux décisions); l'interblocage est l'absence de décision.
9. **Freinage chez la fourmi :** il existe (phéromone « no entry » de *Monomorium pharaonis*, inhibition par encombrement chez *Lasius niger*).
10. **Signal fourmi :** « scalaire » est une simplification de modèle. La danse est un échantillonnage aléatoire local, pas un pub/sub.
11. **Blocage sur la branche longue :** pas général (*Pheidole megacephala* suit les changements; *Linepithema humile* s'adapte par la phéromone d'exploration et les demi-tours).
12. **Projet 7 :** il a des résultats publiés à reproduire en premier (naming game d'Ashery et al. 2025, débat de Du et al. contre vote de Choi et al., vote selon N de Li et al. 2024, Rahman et al. 2025, Jimenez-Romero et al. 2025).
13. **« Agents LLM identiques oscillent » :** hypothèse sans acquis; contre-preuves publiées. À tester, jamais à affirmer.
14. **Oubli :** trois formes distinctes (évaporation, abandon, attrition des danses); « attrition des danses » n'est pas le mécanisme général.
15. **« Piste = chemin, danse = lieu » :** réfuté comme frontière algorithmique (ACO_R, ABC combinatoire). Reformulé en **granularité de la mémoire partagée**.
16. **Paramètres LLM :** `temperature` non réglable sur les modèles récents; la réflexion et l'effort varient avec le modèle; retrait possible de Haiku 4.5 dès le 2026-10-15; Sonnet 4.5 déprécié le 2026-09-30, retrait le 2026-11-30 [Anthropic 2026a]. À vérifier de nouveau avant toute exécution.

## 3. Questions de recherche

- **QR0 (centrale).** Dans quels environnements et pour quelles structures de tâche la richesse du signal améliore-t-elle le gain collectif, et quand nuit-elle à l'exploration? La littérature apicole répond déjà que cela dépend de l'habitat (Sherman et Visscher 2002; Donaldson-Matasci et Dornhaus 2012; Beekman et Lew 2008) : on reproduit d'abord, puis on transpose.
- **QR1 (individu et collectif).** À quelle difficulté de tâche un collectif de règles simples dépasse-t-il un individu fort? (P8, P7)
- **QR2 (échecs).** Quels modes d'échec la coordination sans contrôle central produit-elle, et lesquels se transposent aux agents? (P6)
- **QR3 (contrôle).** Un orchestrateur bat-il la coordination émergente, et selon quelle structure de tâche (décomposable ou séquentielle)? Chaque volet agentique inclut un **témoin orchestré**. (P7)
- **QR4 (diversité).** La diversité des seuils ou des modèles stabilise-t-elle le collectif? (P3, P7)

Chaque projet traduit ces questions en **hypothèses directionnelles falsifiables**, avec taille d'effet minimale et critère de réfutation.

## 4. Construits mesurables

- **R, richesse du signal** : un **vecteur**, jamais une échelle. Composantes : bits par message (nominal), information effective I(M;W)/H(W), **persistance** τ, **portée** (localité), **adressage**. Pour les LLM, on fait varier le format (scalaire, tuple symbolique, texte plafonné) à modèle fixe. On ne confond pas R avec le taxon.
- **G, gain collectif** : gain d'interaction apparié, G = (P_coll − P_ref)/(P_max − P_ref), à **budget de calcul égal**, avec trois références préenregistrées : agents indépendants sans canal, agent unique à budget égal, colonie à règles. Décomposé en **agrégation** (effet du vote) et **interaction** (effet de la communication). Le rapport est instable quand P_max − P_ref est petit : on rapporte **toujours d'abord la différence appariée** Δ = P_coll − P_ref avec son intervalle, et G seulement si l'écart P_max − P_ref dépasse le seuil fixé au plan de recherche. La définition de P_max par type de score et ce seuil sont fixés dans `03-plan-de-recherche.md`; la notation (Δ_k, G_agg, G_com) suit `06-metriques-et-typologie.md`.
- **Robustesse** : variation de G après perturbation (retrait de 30 % des agents, changement d'environnement).
- **Coût** : jetons, appels, latence; messages échangés.
- **Échecs** : taxonomie MAST pour les agents; taxonomie propre à P6 pour les colonies.

Les opérationnalisations finales sont fixées dans `03-plan-de-recherche.md` et dans la fiche P7.

## 5. Architecture du programme

La numérotation P1 à P7 de la v3 est conservée. Deux projets s'ajoutent (P8, P9), un socle (S0) et un volet transversal (V0).

| ID | Projet | Rôle | Phase | Dossier source |
|---|---|---|---|---|
| S0 | Socle : typologie, glossaire, métriques R et G, noyau de simulation, harnais | Prérequis de tous | 0 | x-choregraphie, x-methodes |
| V0 | Vulgarisation et évaluation (transversal) | Gabarit, charte, évaluation | 0 puis continu | x-vulgarisation |
| P1 | Recrutement et verrouillage | Piste contre danse, manipulations appariées | 1 | p1-recrutement |
| P8 | Individu et colonie *(nouveau)* | Intelligence individuelle contre collective | 1 | p8-individu-colonie |
| P5 | Décision collective par quorum | Vitesse, justesse, inhibition | 1 | p5-quorum |
| P3 | Division du travail | Seuils, castes, polyéthisme, diversité | 2 | p3-division-travail |
| P4 | Régulation sans vue d'ensemble | Débit, délai, backpressure | 2 | p4-regulation |
| P6 | Défaillances et défenses | Verrouillage, interblocage, parasites, injection | 2 | p6-pathologies |
| P9 | Mouvement collectif et construction *(nouveau)* | Moulin, transport, minorité informée, stigmergie constructive | 2 (construction : 3) | p9-mouvement-collectif |
| P7 | Synthèse agentique | Fourmi, abeille, agent LLM; témoin orchestré | 3 | p7-agents-llm |
| P2 | Mémoire partagée et métaheuristiques *(annexe, go/no-go)* | ACO, ABC, allocation dynamique | 3 | p2-optimisation |

Dépendances : S0 précède tout. V0 fournit le gabarit éditorial avant P1 : S0 livre la coquille technique de page (build reproductible, accessibilité de base), V0 la charte, les composants et l'évaluation. P7 dépend de P1, P3, P5 et P8 (résultats reproduits) et de la typologie de S0. P2 n'est lancé que si les phases 1 et 2 sont achevées. Les dépendances fines ajoutées par les fiches (P8 ← P1, P5; P6 ← P1, P5, P9) et les volets LLM de P6, P8 et P9, qui exigent le harnais de P7 et passent donc en phase 3, sont tenus dans `02-architecture-programme.md` (graphe) et `09-feuille-de-route.md` (séquence), qui font foi sur ces points.

**Parité :** chaque projet traite les deux espèces avec le même niveau d'exigence (modèle, cible, visuel). Une asymétrie est signalée et justifiée dans la fiche.

## 6. Principes de rigueur

1. **Réplication avant extension.** Chaque modèle reproduit un résultat publié avant toute extension. La **réplication** d'un modèle n'est pas la **validation** contre des données empiriques; on ne confond jamais les deux.
2. **Fiche de reproduction avant le code.** Équations, paramètres, unités, protocole, figure cible numérisée, critère d'acceptation chiffré, écrits avant de coder.
3. **Critère d'acceptation explicite.** Niveau visé (identité numérique à tolérance pour les modèles déterministes, alignement relationnel ou équivalence distributionnelle), marge d'équivalence (TOST), nombre de répétitions, règle de décision, porte go/no-go, registre des déviations. Le détail est dans `04-protocole-reproduction.md`.
4. **Séparation.** Le **confirmatoire** (préenregistré) se distingue de l'**exploratoire** (pages interactives).
5. **Description des modèles** au format ODD (Grimm et al. 2020), ordre de mise à jour et stochasticité explicites.
6. **Docking.** Le modèle chorégraphique commun est **aligné par docking** sur chaque modèle de référence. Le docking est un alignement entre modèles, pas une validation : la validation est réservée à la comparaison avec des données empiriques (principe 1).
7. **Statut épistémique** sur chaque énoncé et chaque graphe : *Résultat reproduit*, *Résultat publié (non reproduit)*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.
8. **Références vérifiées.** Toute référence porte son statut (*vérifiée*, *corrigée*, *non vérifiée*). Aucune valeur numérique n'apparaît sans source ou sans la marque **[à confirmer]**.

## 7. Architecture de simulation

Un moteur unique « fourmi ou abeille » est abandonné : les résultats publiés viennent de modèles de natures différentes (EDO, Monte Carlo, Poisson à temps discret, champ moyen, modèles à agents, métaheuristiques). Trois couches :

1. **Noyau commun** : PRNG à graine, horloge à pas fixe, intégrateurs RK4 et Euler–Maruyama (équations stochastiques de P1, P3 à P6 et P8), algorithme de Gillespie (SSA), événements discrets, grille, enregistreur, scénario, manifeste de run. Le choix des algorithmes (générateur, méthode de Gillespie) est fixé dans `05-spec-simulation.md`.
2. **Modèles de référence** : un par article, répliqué contre la figure ou le tableau publié.
3. **Modèle chorégraphique commun** : seul le canal est interchangeable (persistance, portée, adressage, format); aligné par docking sur les modèles de référence.

Deux sorties : un moteur **headless Node** (balayages, tests, rejeu) et une **couche navigateur** (visuels). Langage : TypeScript pour le moteur et les pages. Node exécute le `.ts` directement; `tsc --noEmit` vérifie les types. Hors du moteur, Python (oracles de vérification, deuxième implémentation) et R (modèles mixtes de P7) sont admis : la frontière passe par des fichiers CSV ou JSON, jamais par une liaison en mémoire. WASM seulement si une mesure du spike de la phase 0 l'exige, en navigateur ou pour un noyau headless lourd.

## 8. Vulgarisation (V0)

- **Trois niveaux, réordonnés :** *Voir* (récit guidé, avec prédiction), *Explorer* (bac à sable étayé, « Vue de l'agent », « Modifier la règle »), *Vérifier* (reproduction, distribution sur N graines, code, limites).
- **Publics :** grand public, étudiants, praticiens de l'agentique, chercheurs. Chaque page déclare son public principal.
- **Évaluation :** objectifs d'apprentissage mesurables, pré-test et post-test, condition témoin statique.
- **Accessibilité :** WCAG 2.2 AA, daltonisme, clavier, mobile; `prefers-reduced-motion` (critère AAA 2.3.3) retenu comme bonne pratique.
- **Charte :** fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues.
- **Garde-fous :** aucune explication causale anthropomorphe ou téléologique; les termes imagés de la littérature (« décision », « vote ») sont admis comme vocabulaire étiqueté et leur effet sur la compréhension est mesuré. Encart « Ce que fait vraiment la reine », à valider par un myrmécologue et un apidologue.
- **Règle de séquence :** les pages de la phase 1 sont publiées et évaluées avant celles de la phase 2. C'est une règle de publication, pas un verrou sur le travail de simulation.

Science ouverte, licences, archivage, éthique et limites de portée : `08-science-ouverte-ethique.md` fait foi.

## 9. Conventions de documentation

- **Identifiants :** projets `S0`, `V0`, `P1`…`P9`; hypothèses `H<projet>.<n>`; cibles de reproduction `T<projet>.<n>`; expériences originales `E<projet>.<n>` (S0 utilise `H0.n`, `T0.n`, `E0.n`; V0 utilise `HV0.n`, `TV0.n`, `EV0.n`). Seuls H, T et E sont uniques dans tout le programme. Les autres identifiants (risques `R`, décisions `D`, portes, visuels, objectifs) sont **locaux** au document qui les définit et se citent avec lui (« R7 de P6 », « D3 de 02 », « D1 à D5 du spike de 05 »). Font foi pour le programme : le registre consolidé des risques (`R200` et suivants) et les portes `GF<n>` de `09-feuille-de-route.md`, les décisions d'architecture `D<n>` de `02-architecture-programme.md`, les décisions de science ouverte `DC<n>` de `08-science-ouverte-ethique.md`.
- **Citations :** `[Auteur et al. année]`, ou `[Auteur année]` pour un ou deux auteurs, avec suffixe `a`, `b` en cas de conflit. Chaque étiquette a une entrée dans `docs/11-bibliographie.md`.
- **Chemins :** fiches de projet dans `projets/`; dossiers de recherche dans `recherche/dossiers/`; rapports d'audit dans `docs/annexes/audit/`.
- **Longueur :** celle que la tâche exige, sans remplissage ni résumé redondant.
- **Incertitude :** distinguer ce qui est lu dans une source de ce qui est inféré; nommer ce qui permettrait de trancher.

## 10. Réserves ouvertes

- Des sources primaires n'ont pas pu être lues en texte intégral (accès fermé, quotas de recherche épuisés). Les dossiers les signalent référence par référence.
- Les valeurs de k (Deneubourg et al. 1990), de paramètres de Bonabeau et al. 1996, de Camazine et Sneyd 1991 et de Pratt et al. 2005 restent à confirmer dans les textes.
- Les identifiants et tarifs des modèles LLM, et les versions A2A et MCP, se vérifient de nouveau avant toute exécution de P7.
- Les décisions qui reviennent au chercheur (collecte de Haiku 4.5 avant son retrait, enveloppe de P7, dépôt dédié et licences, échéances de publication, budget égal) sont datées dans `09-feuille-de-route.md` (jalons, portes GF, décisions à dater).

## 11. Révision 4.1 : précisions entérinées

Tensions relevées par les rédacteurs et tranchées dans ce cadre : Euler–Maruyama au noyau (section 7); « aligné par docking » au lieu de « validé » (principe 6, section 7); niveau « identité numérique à tolérance » (principe 3); statut *Résultat publié (non reproduit)* (principe 7); garde de G et renvoi de P_max au plan de recherche (section 4); régime « signaux directs » étendu aux messages dirigés locaux, hybrides et référence nulle classés par `06` (section 2.2); taxons ajoutés (section 2.3); retrait de Sonnet 4.5 (correction 16); frontière S0/V0 et dépendances fines (section 5); Python et R hors moteur (section 7); garde-fous de vulgarisation, règle de séquence et renvoi à `08` (section 8); identifiants locaux (risques, décisions, portes) et documents qui font foi (section 9).

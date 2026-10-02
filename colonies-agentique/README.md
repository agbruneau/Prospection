# Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents

Programme de recherche en ingénierie des systèmes : étudier la fourmilière **et** la ruche au même titre, aux niveaux individuel et collectif, pour un parallèle rigoureux avec les systèmes multi-agents, dont les agents LLM. **Thèse** (cadre arrêté) : chez les insectes sociaux, les décisions de travail et de déplacement émergent de règles locales et de signaux partagés, sans contrôle central à l'exécution. Le programme mesure dans quels environnements et pour quelles structures de tâche cette coordination est avantageuse, et ce qu'on peut en transposer aux agents; « chorégraphie » y désigne une typologie à trois axes, pas un synonyme d'auto-organisation. Il livre des notes de recherche, des simulations qui **reproduisent des résultats publiés avant toute extension**, et des supports visuels de vulgarisation évalués.

## Livrable final

À la fin du programme obligatoire (jalon JF13 de la [feuille de route](docs/09-feuille-de-route.md) : phases 0 à 3, soit 229,5 à 239,0 semaines-personne; dates indicatives du 2031-02-28 au 2031-05-02 au rythme de référence d'un chercheur à temps plein), le programme remet une **version archivée et citable** de son dépôt : une release qui produit un DOI de version et un DOI de concept (Zenodo), avec SWHID, `LICENSE` et `CITATION.cff`. Elle part du dépôt dédié que propose [science ouverte et éthique](docs/08-science-ouverte-ethique.md) (DC1; décision D-02 du suivi), non de `Prospection`.

| Composant | Contenu | Critère de remise |
|---|---|---|
| Logiciel | Moteur headless Node et couche navigateur en TypeScript : noyau commun, un modèle de référence par article reproduit, modèle chorégraphique commun, harnais agentique de P7, outils de contrôle | `npm run verify` sort à 0; rejeu identique d'un run à graine fixe |
| Reproductions | Une fiche par cible T, commitée avant le code de son modèle; un verdict par cible au registre des déviations (satisfaite, non satisfaite avec déviation, bloquée avec raison) | chaque cible dans un état terminal |
| Données | Manifestes de run, sorties et balayages (CSV, JSON), valeurs numérisées des figures cibles (jamais l'image), journaux LLM de P7 si la porte C le permet | un DOI par campagne |
| Notes de recherche | Une par projet : ODD résumé, tableau des cibles et de leurs verdicts, statut épistémique de chaque énoncé de transposition; préenregistrements OSF horodatés; P7 en Registered Report | `node outils/verifier-docs.ts` sans erreur; porte F avant toute soumission |
| Synthèse agentique (P7) | Fourmi, abeille et agents LLM comparés à budget égal, avec un témoin orchestré : verdict de H7.1 à H7.11 (avec intervalle de confiance pour H7.1 à H7.10), coût, annotation des échecs (MAST) | journal rejoué à 100 %; dépense sous les plafonds |
| Site de vulgarisation | Pages à trois niveaux (Voir, Explorer, Vérifier) par projet, page de typologie, carte comparative; site statique public, une build archivée par version, jumeau statique imprimable | WCAG 2.2 AA; pages évaluées (pré-test, post-test, témoin statique) ou dérogation au registre |
| Évaluation pédagogique | Instruments et analyses agrégées; les données de participants restent hors du dépôt public | avis du comité d'éthique avant toute collecte |

Le paquet s'accumule : chaque projet remet sa part (paquet commun de la feuille de route) à sa sortie, et la phase 3 ajoute P7 ainsi que les volets agentiques de P6 et de P9. P2 est une annexe (porte GF13, jalon JF14) : sans elle, aucun livrable obligatoire ne manque. Le livrable ne prescrit pas d'architecture d'agents : ses conclusions valent pour le scénario, le budget, le modèle et la date mesurés (conclusions exclues : « Ce que le programme ne peut pas conclure », dans [science ouverte et éthique](docs/08-science-ouverte-ethique.md)).

## État

Au 2026-10-02, l'essentiel du socle S0 (phase 0) est fait; ce qui reste attend surtout une décision ou une vérification humaine. La [fiche de porte de sortie](notes/S0-porte-de-sortie.md) propose un go conditionnel; la décision revient au chercheur. `npm run verify` sort à 0 (165 tests). Détail par tâche et décisions `D-##` : [`notes/suivi-feuille-de-route.md`](notes/suivi-feuille-de-route.md); avancement des cas : [tableau de bord](specs/tableau-de-bord.md).

- **Logiciel** : 11 cas d'utilisation sur 12 sont `Implemented` (UC-001 à UC-008, UC-010 à UC-012); UC-009 (classer le régime de coordination) est en revue. Aucun n'est encore `Verified` : la revue des tests revient au chercheur (D-04).
- **Noyau et commandes** : PRNG à flux nommés, empreinte d'état, scénario, manifeste, `run` et `replay`, RK4, SSA direct, Euler–Maruyama, commutateur d'ordre, grille, événements discrets, traces dorées; bibliothèque statistique (T0.8 à T0.16, TOST, garde de puissance); `npm run reproduce`, `sweep`, `dock`, `metrics` (R et G) et `summarize`.
- **Modèles** : M1c de [Seeley et al. 2012] en EDO et à N fini, Ornstein–Uhlenbeck, étalon fourmi M6, jouets J4 et J6, pont de [Goss et al. 1989]. Les dockings TypeScript contre Python sont `aligned`.
- **Données et protocole** : `data/typologie.csv` (21 entrées), `data/matrice.csv`, gabarits, registre des déviations; préenregistrement de S0 en brouillon (dépôt OSF : D-15).
- **Pages** : gabarit à trois niveaux et page-pilote du pont de Goss, « Le pont à mémoire » (`npm run build:pages`); 0 violation axe-core, 13 critères d'accessibilité sur 16 vérifiés automatiquement. Rien n'est publié.
- **Phase 1, amorcée** : fiche de T1.1 en brouillon (gel : D-05), pilote exploratoire satisfait sous réserve; T1.2 à faire.

**Reste en phase 0** : expériences confirmatoires E0.1, E0.2, E0.7 et E0.8 (après le dépôt OSF); cas d'école et indicateurs C_* de la typologie (UC-009), puis la page de typologie; Firefox et la cible B du [spike navigateur](spikes/phase0/rapport.md); écoute au lecteur d'écran; dépôt dédié et répétition Zenodo (bloqués par D-02). Les scripts de `recherche/verifications-numeriques/` restent des recoupements exploratoires, hors du moteur.

## Carte des documents

Le cadre prime sur tout : en cas de conflit, on corrige l'autre document.

| Fichier | À quoi il sert | Pour qui |
|---|---|---|
| [`docs/00-cadre.md`](docs/00-cadre.md) | Cadre arrêté : thèse, typologie à trois axes, taxons, corrections factuelles de la v3, questions de recherche, construits R et G, principes de rigueur | Tous |
| [`docs/01-audit-v3.md`](docs/01-audit-v3.md) | Synthèse de l'audit de la proposition v3 : décomptes des dispositions, erreurs corrigées, ajouts, restes ouverts (le détail par constat est dans `docs/annexes/audit/constats-*.md`) | Relecteur |
| [`docs/02-architecture-programme.md`](docs/02-architecture-programme.md) | Projets, rôles, dépendances, phases, parité fourmi/abeille | Implante, relecteur |
| [`docs/03-plan-de-recherche.md`](docs/03-plan-de-recherche.md) | Questions de recherche traduites en hypothèses; opérationnalisation finale de R et G | Implante, relecteur |
| [`docs/04-protocole-reproduction.md`](docs/04-protocole-reproduction.md) | Réplication avant extension : critères d'acceptation, TOST, registre des déviations, portes | Implante, relecteur |
| [`docs/05-spec-simulation.md`](docs/05-spec-simulation.md) | Spécification technique de S0 : couches, intégrateurs, déterminisme, tests, spike de la phase 0 | Implante |
| [`docs/06-metriques-et-typologie.md`](docs/06-metriques-et-typologie.md) | Définitions qui font foi : typologie, R (richesse du signal), G (gain collectif) | Implante, relecteur |
| [`docs/07-vulgarisation-evaluation.md`](docs/07-vulgarisation-evaluation.md) | V0 : trois niveaux de lecture, charte, accessibilité, évaluation des apprentissages | Implante, curieux |
| [`docs/08-science-ouverte-ethique.md`](docs/08-science-ouverte-ethique.md) | Plan de gestion des données et du logiciel, éthique, limites | Relecteur |
| [`docs/09-feuille-de-route.md`](docs/09-feuille-de-route.md) | Séquence des phases, portes, effort | Implante |
| [`docs/10-glossaire.md`](docs/10-glossaire.md) | Termes FR/EN, homonymies biologie/informatique | Tous |
| [`docs/11-bibliographie.md`](docs/11-bibliographie.md) | Une entrée par étiquette de citation, avec statut (*vérifiée*, *corrigée*, *non vérifiée*) et étiquettes ambiguës | Tous |
| [`specs/`](specs/README.md) | Noyau de spécification du logiciel (AI Unified Process) : vision, exigences FR/NFR/C, modèle d’entités, cas d’utilisation `UC-###`, tableau de bord généré. Fait foi pour le comportement du logiciel | Implante, relecteur |
| [`notes/suivi-feuille-de-route.md`](notes/suivi-feuille-de-route.md) | Suivi d'avancement : décisions du chercheur par échéance, tâches de la phase en cours, jalons (cumul réel, écart) | Chercheur |
| [`CLAUDE.md`](CLAUDE.md) | Consignes pour les agents qui modifient le code : spécification d’abord, synchronisation, tests dérivés des cas | Agents |
| [`projets/`](projets/) | Une fiche par projet (S0, P1 à P9), treize sections numérotées : hypothèses, cibles T, expériences E, risques, livrables, critères d'achèvement | Implante |
| [`recherche/dossiers/`](recherche/dossiers/) | Dossiers vérifiés, source des équations, paramètres, cibles chiffrées et réserves | Implante, relecteur |
| [`recherche/verifications/`](recherche/verifications/) | Rapport de vérification indépendante de chaque dossier | Relecteur |
| [`recherche/verifications-numeriques/`](recherche/verifications-numeriques/) | Scripts Python, JS et TS qui recalculent des valeurs des dossiers (exploratoire, pas du code de simulation) | Relecteur |
| [`docs/annexes/audit/`](docs/annexes/audit/) | Rapports d'audit de la v3, un par angle, et `constats-*.md` (disposition de chaque constat) | Relecteur |
| [`docs/annexes/proposition-v3.md`](docs/annexes/proposition-v3.md) | Proposition v3 auditée, conservée pour mémoire : elle contient les erreurs que le cadre corrige, ne pas s'en servir comme source | Relecteur |

Dossiers, vérifications et audits sont des sources de référence : on y renvoie par chemin relatif, on n'en recopie pas une valeur sans sa marque.

## Arborescence

```
colonies-agentique/
├── README.md
├── docs/            00-cadre.md … 11-bibliographie.md
│   └── annexes/     proposition-v3.md, audit/ (rapports et constats-*.md)
├── CLAUDE.md        consignes d’agent
├── specs/           vision, catalogue-exigences, modele-entites, cas-utilisation.puml, cas-utilisation/, tableau-de-bord
├── projets/         S0-socle.md, P1-… à P9-…; reproduction/ (fiches de reproduction T<k>.<n>)
├── notes/           suivi-feuille-de-route.md
├── targets/         extraits exécutables des fiches de reproduction (P1/)
├── data/            oracles/ (valeurs Python), results/ (verdicts)
├── pages/           définitions de pages (<id>.json); dist/ : pages construites, hors git
├── spikes/phase0/   spike navigateur : protocole, code, résultats, rapport
├── recherche/
│   ├── dossiers/    p1… p9, x-choregraphie, x-methodes, x-vulgarisation (+ p9_checks.py)
│   ├── verifications/
│   └── verifications-numeriques/
├── src/             core/ (noyau), models/ (modèles de référence), cli/ (run, replay)
├── scenarios/       scénarios JSON par modèle
├── tests/           core/, cli/, determinism, conformance, verify (noms de tests = identifiants UC)
└── outils/          verify.ts, verifier-docs.ts, verifier-specs.ts, verifier-cibles.ts, verifier-architecture.ts, compter-dispositions.ts
```

## Par où commencer

- **Chercheur qui implante :** [`specs/README.md`](specs/README.md) (processus et cas d’utilisation à approuver), `docs/00-cadre.md`, puis `docs/02-architecture-programme.md`, la fiche [`S0`](projets/S0-socle.md) avec `docs/05-spec-simulation.md` et `docs/04-protocole-reproduction.md`, enfin la fiche et le dossier du projet de la phase en cours. Règle : la fiche de reproduction s'écrit avant le code.
- **Lecteur curieux :** `docs/00-cadre.md` (thèse, taxons, corrections factuelles), `docs/07-vulgarisation-evaluation.md`, `docs/10-glossaire.md`. Aucune page interactive n'existe encore.
- **Relecteur méthodologique :** `docs/04-protocole-reproduction.md`, `docs/03-plan-de-recherche.md`, `docs/01-audit-v3.md` avec les `constats-*.md`, `recherche/verifications/`, puis `docs/08-science-ouverte-ethique.md`.

## Conventions

1. **Identifiants :** `S0`, `V0`, `P1` à `P9`; hypothèses `H<projet>.<n>`; cibles de reproduction `T<projet>.<n>`; expériences originales `E<projet>.<n>`; risques `R<n>`. Les dossiers numérotent leurs cibles à leur façon : la correspondance est écrite dans chaque fiche.
2. **Citations :** `[Auteur et al. année]`, ou `[Auteur année]` pour un ou deux auteurs. Chaque étiquette existe dans la bibliographie; les étiquettes ambiguës portent le suffixe `a`, `b` ou `c` que la bibliographie attribue selon le dossier d'origine.
3. **Marques :** aucune valeur numérique sans source dans un dossier, sinon **[à confirmer]**; **[non vérifiée]** reste attachée à la référence; **[I]** marque une inférence, jamais une lecture.
4. **Statut épistémique** de chaque énoncé de transposition : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. La réplication d'un modèle n'est pas sa validation empirique.
5. **Liens :** relatifs; un document renvoie à un autre par son nom, jamais par un numéro de section. Termes techniques et identifiants en anglais, texte en français canadien.

## Prochaines étapes (phase 0)

Prérequis : Node 24.12 ou plus récent ([`docs/05-spec-simulation.md`](docs/05-spec-simulation.md); exécute le `.ts` directement), `npm ci` (TypeScript, `@types/node`, esbuild, Playwright et axe-core en dépendances de développement; Chrome installé pour les tests de pages), Python 3 avec numpy pour les scripts de recoupement. Exemple : `node src/cli/run.ts scenarios/p5-seeley-2012/m1c-sigma10.json`, puis `node src/cli/replay.ts <manifeste>`.

**Décisions du chercheur à dater d'abord** ([`docs/09-feuille-de-route.md`](docs/09-feuille-de-route.md), jalons et portes GF) : la plus urgente est la porte GF1, à trancher avant le 2026-10-15 (retrait possible de Haiku 4.5; par défaut, perte déclarée du point historique de P7). Suivent l'enveloppe d'API de P7, le dépôt dédié et les licences (`docs/08-science-ouverte-ethique.md`), et les échéances de publication.

1. S0 : écrire les gabarits (fiche de reproduction, ODD, préenregistrement) et le registre des déviations; préenregistrer les hypothèses du socle avant tout run confirmatoire.
2. Spike navigateur (fait, [rapport](spikes/phase0/rapport.md)) : rendre les décisions D1 à D5 proposées (`docs/05-spec-simulation.md`; à ne pas confondre avec les décisions d’architecture D1 à D18 de `docs/02-architecture-programme.md`).
3. Noyau (fait : PRNG, scénario, manifeste, RK4, SSA, Euler–Maruyama, run, replay, harnais de cibles), puis le reste de la bibliothèque statistique (T0.8 à T0.16), métriques R et G et tests; gel de la fiche T1.1 par le chercheur, puis T1.2 (même modèle); recoupement par les scripts existants. Critère : `npm run verify` sort à 0.
4. V0 : gabarit de page (implanté), page-pilote après UC-006, charte et page de typologie; aucune collecte d'évaluation avant l'avis du comité d'éthique.
5. Décision de la porte de sortie de la phase 0 (go, go conditionnel, no-go; critères dans la fiche S0), puis phase 1 : P1, P8, P5.

## Vérifier le dépôt

`npm run verify` (cas UC-008) enchaîne la vérification des types sous les deux configurations, les tests (`npm test`), puis les trois contrôles ci-dessous, et s'arrête à la première étape en échec. Les outils se lancent aussi seuls.

`node outils/verifier-docs.ts` contrôle les liens relatifs et les ancres, les étiquettes de citation contre la bibliographie, les identifiants H, T et E contre les fiches, le gabarit à treize sections des fiches, la présence des documents attendus et le renseignement de chaque disposition d'audit (`constats-*.md`). Code de sortie 1 s'il reste une erreur; les avertissements n'échouent pas. 

`node outils/verifier-specs.ts` vérifie la traçabilité du noyau de spécification (exigences, entités, cas, règles BR, noms de tests) et que le tableau de bord est à jour (`--ecrire` le régénère). `node outils/verifier-architecture.ts` vérifie que chaque cible T des fiches figure une et une seule fois dans la matrice de traçabilité de `docs/02-architecture-programme.md`. `node outils/compter-dispositions.ts` recompte les dispositions d'audit et les compare à la ligne de contrôle de `docs/01-audit-v3.md`. Les trois outils sortent à 0 quand tout concorde; ils se lancent avant chaque commit de documentation.

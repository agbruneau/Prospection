# Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents

Programme de recherche en ingénierie des systèmes : étudier la fourmilière **et** la ruche au même titre, aux niveaux individuel et collectif, pour un parallèle rigoureux avec les systèmes multi-agents, dont les agents LLM. **Thèse** (cadre arrêté) : chez les insectes sociaux, les décisions de travail et de déplacement émergent de règles locales et de signaux partagés, sans contrôle central à l'exécution. Le programme mesure dans quels environnements et pour quelles structures de tâche cette coordination est avantageuse, et ce qu'on peut en transposer aux agents; « chorégraphie » y désigne une typologie à trois axes, pas un synonyme d'auto-organisation. Il livre des notes de recherche, des simulations qui **reproduisent des résultats publiés avant toute extension**, et des supports visuels de vulgarisation évalués.

## État

Documentation et recherche prêtes. **Aucun code de simulation n'est encore écrit** : ni noyau, ni modèle de référence, ni page interactive, ni harnais. Le seul code présent sert à contrôler le reste : des scripts de recoupement numérique exploratoires (`recherche/verifications-numeriques/`, plus `recherche/dossiers/p9_checks.py`) et `outils/verifier-docs.ts`.

## Carte des documents

Le cadre prime sur tout : en cas de conflit, on corrige l'autre document.

| Fichier | À quoi il sert | Pour qui |
|---|---|---|
| [`docs/00-cadre.md`](docs/00-cadre.md) | Cadre arrêté : thèse, typologie à trois axes, taxons, corrections factuelles de la v3, questions de recherche, construits R et G, principes de rigueur | Tous |
| [`docs/01-audit-v3.md`](docs/01-audit-v3.md) | Ce que l'audit de la proposition v3 a changé, constat par constat | Relecteur |
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
├── projets/         S0-socle.md, P1-… à P9-…
├── recherche/
│   ├── dossiers/    p1… p9, x-choregraphie, x-methodes, x-vulgarisation (+ p9_checks.py)
│   ├── verifications/
│   └── verifications-numeriques/
└── outils/          verifier-docs.ts
```

## Par où commencer

- **Chercheur qui implante :** `docs/00-cadre.md`, puis `docs/02-architecture-programme.md`, la fiche [`S0`](projets/S0-socle.md) avec `docs/05-spec-simulation.md` et `docs/04-protocole-reproduction.md`, enfin la fiche et le dossier du projet de la phase en cours. Règle : la fiche de reproduction s'écrit avant le code.
- **Lecteur curieux :** `docs/00-cadre.md` (thèse, taxons, corrections factuelles), `docs/07-vulgarisation-evaluation.md`, `docs/10-glossaire.md`. Aucune page interactive n'existe encore.
- **Relecteur méthodologique :** `docs/04-protocole-reproduction.md`, `docs/03-plan-de-recherche.md`, `docs/01-audit-v3.md` avec les `constats-*.md`, `recherche/verifications/`, puis `docs/08-science-ouverte-ethique.md`.

## Conventions

1. **Identifiants :** `S0`, `V0`, `P1` à `P9`; hypothèses `H<projet>.<n>`; cibles de reproduction `T<projet>.<n>`; expériences originales `E<projet>.<n>`; risques `R<n>`. Les dossiers numérotent leurs cibles à leur façon : la correspondance est écrite dans chaque fiche.
2. **Citations :** `[Auteur et al. année]`, ou `[Auteur année]` pour un ou deux auteurs. Chaque étiquette existe dans la bibliographie; les étiquettes ambiguës portent le suffixe `a`, `b` ou `c` que la bibliographie attribue selon le dossier d'origine.
3. **Marques :** aucune valeur numérique sans source dans un dossier, sinon **[à confirmer]**; **[non vérifiée]** reste attachée à la référence; **[I]** marque une inférence, jamais une lecture.
4. **Statut épistémique** de chaque énoncé de transposition : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. La réplication d'un modèle n'est pas sa validation empirique.
5. **Liens :** relatifs; un document renvoie à un autre par son nom, jamais par un numéro de section. Termes techniques et identifiants en anglais, texte en français canadien.

## Prochaines étapes (phase 0)

Prérequis : Node 24.12 ou plus récent ([`docs/05-spec-simulation.md`](docs/05-spec-simulation.md); exécute le `.ts` directement), TypeScript pour `tsc --noEmit`, Python 3 avec numpy pour les scripts de recoupement.

1. S0 : écrire les gabarits (fiche de reproduction, ODD, préenregistrement) et le registre des déviations; préenregistrer les hypothèses du socle avant tout run confirmatoire.
2. Spike navigateur : mesurer hébergement, worker et rendu à grand N, puis consigner les décisions D1 à D5 (`docs/05-spec-simulation.md`).
3. Noyau, métriques R et G, harnais et tests; recoupement par les scripts existants. Critère : `tsc --noEmit` puis `node --test` sortent à 0.
4. V0 : gabarit de page, charte et page de typologie; aucune collecte d'évaluation avant l'avis du comité d'éthique.
5. Décision de la porte de sortie de la phase 0 (go, go conditionnel, no-go; critères dans la fiche S0), puis phase 1 : P1, P8, P5.

## Vérifier les liens et les identifiants

`node outils/verifier-docs.ts` contrôle les liens relatifs et les ancres, les étiquettes de citation contre la bibliographie, les identifiants H, T et E contre les fiches, le gabarit à treize sections des fiches, la présence des documents attendus et le renseignement de chaque disposition d'audit (`constats-*.md`). Code de sortie 1 s'il reste une erreur; les avertissements n'échouent pas. À lancer avant chaque commit de documentation.

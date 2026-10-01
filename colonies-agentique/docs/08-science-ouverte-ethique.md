# Science ouverte, éthique et limites : plan de gestion des données et du logiciel

**Statut :** production; le chercheur agit sur ce plan. **Date :** 2026-10-01. Conforme à [00-cadre.md](00-cadre.md), qui prime. Ce plan n'est pas un avis juridique.
**Sources :** [x-methodes](../recherche/dossiers/x-methodes.md) (science ouverte, plateforme, échéances), [p6-pathologies](../recherche/dossiers/p6-pathologies.md), [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md), audits [méthodologie](annexes/audit/methodologie.md) et [vulgarisation](annexes/audit/vulgarisation.md); [x-vulgarisation](../recherche/dossiers/x-vulgarisation.md) pour l'EPTC 2 et la Loi 25.

**Marques.** Sans marque : repris d'une source citée. **[I]** : inférence ou constat de l'auteur de ce document. **[à confirmer]** : non établi. *Décision du chercheur* : le choix lui appartient; la valeur proposée est un défaut, pas une décision. Les règles prescriptives sont des propositions de l'auteur.

---

## 1. Décisions du chercheur et portes

**Constat de départ** (vérifié le 2026-10-01 par `gh repo view` et `git log --all`). Le dépôt `agbruneau/Prospection` est public, sans licence, et son historique contient des travaux étrangers au programme; le contenu du programme y est encore en grande partie non versionné (`git status`). Une release Zenodo archive l'état du dépôt; Software Heritage archive tout le code qu'il obtient et collecte régulièrement les grandes forges [SWH 2026], donc très probablement l'historique public déjà en place [I; à vérifier sur archive.softwareheritage.org]. Isoler le programme dans un dépôt neuf coûte le moins cher maintenant.

| Décision | Défaut proposé | Alternative et conséquence |
|---|---|---|
| DC1. Dépôt | Nouveau dépôt public dédié au programme (nom à choisir), `LICENSE` et `CITATION.cff` dès le premier commit; aucune release depuis `Prospection` | Garder `Prospection` : le DOI et l'archive Software Heritage restent rattachés à un dépôt à historique mixte |
| DC2. Licences | Code MIT; textes, figures et données CC BY 4.0 (section 3) | Apache-2.0 pour le code; CC0 pour des données sans attribution |
| DC3. Identité des auteurs | Nom, ORCID, affiliation dans `CITATION.cff` | Le nom du gabarit vient de la configuration git [I] |
| DC4. Journaux LLM | Dépôt des journaux bruts si les conditions du fournisseur le permettent (porte C) | Sinon dérivés (scores, condensats, invites) et accès sur demande |
| DC5. Ancre à poids ouverts pour P7 | À trancher avant le préenregistrement de P7 | Sans ancre, aucune ré-exécution possible après retrait des modèles (section 6.5) |
| DC6. Comité d'éthique de la recherche (CER) | Celui de l'établissement du chercheur | Sans CER accessible : aucune collecte auprès de personnes (porte E) |
| DC7. Registered Report pour P7 | Format visé; revue à choisir (section 5) | Préenregistrement OSF seul |
| DC8. Divulgation en P6 | Canal de sécurité du fournisseur; délai de divulgation coordonnée à fixer [à confirmer] | — |
| DC9. Cibles de publication | Section 9 | La piste Blue Sky Ideas d'AAMAS 2027 exige une décision avant le 2026-11-12 [à confirmer] |
| DC10. Financement | À déclarer (section 8) | Détermine si la politique des trois organismes s'applique [Tri-Agence 2025] |

**Portes.** Une porte bloque l'action nommée tant que sa preuve n'existe pas.

| Porte | Bloque | Condition | Preuve vérifiable |
|---|---|---|---|
| A | Première release | Dépôt dédié, public, sous licence; `CITATION.cff` sans `.zenodo.json`; webhook Zenodo vérifié; répétition sur dépôt jetable réussie; balayage de secrets de l'historique | Notice Zenodo avec DOI de version et de concept; bouton « citer ce dépôt » visible sur GitHub |
| B | Première exécution confirmatoire d'un projet | Préenregistrement OSF horodaté (P7 : Registered Report, étape 1); SHA du dépôt et des scénarios consigné; registre des déviations ouvert | Horodatage OSF antérieur au premier manifeste de run confirmatoire |
| C | Première campagne LLM et tout dépôt de journaux | Conditions d'utilisation et politique d'usage du fournisseur lues et consignées; règle d'attrition préenregistrée; *fallbacks* désactivés; cellule sentinelle définie; schéma de journal validé au pilote | Note de lecture datée au registre des déclarations; journal du pilote conforme au schéma |
| D | Toute diffusion issue de P6 | Revue de double usage (section 7.2) signée par le chercheur | Fiche de revue datée, versionnée |
| E | Toute collecte auprès de personnes, pilotes et entretiens compris | Avis écrit du CER ou attestation d'exemption; si analytique : information préalable (Loi 25) | Numéro et date de l'avis au registre des déclarations |
| F | Toute soumission | Déclarations complétées; DOI de version; aucune valeur [à confirmer] ni référence non vérifiée comme appui d'une conclusion; énoncés de transposition étiquetés; `node outils/verifier-docs.ts` sans erreur; dates de la cible relues sur le site officiel | Liste de contrôle de la section 11 cochée |

---

## 2. Inventaire des objets produits

| # | Objet (projets) | Format | Licence proposée (décision du chercheur) | Archivage | Identifiant |
|---|---|---|---|---|---|
| 1 | Code : noyau, moteur headless Node, couche navigateur, modèles de référence, harnais, outils de contrôle (S0, P1 à P9) | TypeScript; scripts Python limités au recoupement numérique | MIT | GitHub (travail), Zenodo (release), Software Heritage | DOI de version et de concept; SWHID du répertoire |
| 2 | Documents du programme : docs, fiches, dossiers, glossaire, bibliographie (615 œuvres) | Markdown; export BibTeX avec statut par entrée à produire [I] | CC BY 4.0 | Dépôt; Zenodo (release) | DOI du dépôt |
| 3 | Fiches de reproduction, ODD et delta-ODD par modèle (S0, P1 à P9) | Markdown | CC BY 4.0 | Dépôt; annexe de chaque note | DOI du dépôt |
| 4 | Valeurs numérisées des figures cibles | CSV (valeurs et source, jamais l'image) | CC BY 4.0 avec citation de la source | Dépôt | DOI du dépôt |
| 5 | Données de simulation : manifestes de run, sorties, distributions sur N graines, balayages | CSV, JSON | CC BY 4.0 | Zenodo, un jeu par campagne | DOI par campagne |
| 6 | Journaux LLM (P7; P6 si agents LLM) | JSONL, manifeste, invites par condensat | Aucune avant la porte C; cible CC BY 4.0 | Zenodo, un jeu par campagne | DOI par campagne |
| 7 | Préenregistrements, protocole de Registered Report, registres des déviations et des refus | Texte OSF; Markdown | CC BY 4.0 | OSF (version horodatée, lecture seule) [OSF 2026]; dépôt | Identifiant OSF |
| 8 | Notes de recherche, préimpressions | PDF et source | CC BY 4.0, sous réserve de la politique de la revue | Serveur de préimpressions au choix; Zenodo | DOI Zenodo; DOI de la revue |
| 9 | Pages interactives, visuels statiques, pictogrammes (V0) | HTML, CSS, TypeScript; SVG, PNG, PDF | Code MIT; textes et figures CC BY 4.0 | Hébergement statique public, build archivée par projet; les artifacts claude.ai servent aux prototypes (privés par défaut, ni archivés ni référencés) | DOI de version de la build |
| 10 | Jeux d'évaluation pédagogique (V0) : (a) instruments; (b) données de participants; (c) analyses agrégées | (a) Markdown, CSV; (b) CSV pseudonymisé; (c) CSV | (a) et (c) CC BY 4.0 après avis du CER; (b) aucune licence ouverte | (a) et (c) Zenodo; (b) stockage approuvé par le CER, jamais GitHub | (a) et (c) DOI; (b) aucun |

Les données de la ligne 4 sont des faits publiés (valeurs lues sur une figure) : on dépose les valeurs et la référence, pas la reproduction de la figure, protégée par le droit d'auteur de l'éditeur [I; vérifier la politique de chaque éditeur].

---

## 3. Licences proposées

Toutes ces propositions relèvent de la *décision du chercheur* (DC2).

| Catégorie | Proposition | Justification | Alternative |
|---|---|---|---|
| Code | MIT | Permissive et courte; seule condition : conserver les avis de droit d'auteur et de licence [choosealicense et CC 2026] | Apache-2.0 : ajoute une concession expresse de brevets et l'obligation d'indiquer les modifications [choosealicense et CC 2026]; utile si des contributions industrielles sont attendues [I] |
| Textes, figures, notes, ODD | CC BY 4.0 | Partage et adaptation, même commerciaux, avec crédit et mention des modifications [choosealicense et CC 2026]; ODD 2020 fournit un cadre de licence pour la réutilisation d'un ODD [Grimm et al. 2020] | — |
| Données de simulation, valeurs numérisées | CC BY 4.0 | La version 4.0 couvre les droits sui generis sur les bases de données [choosealicense et CC 2026]; le crédit alimente la citation [I] | CC0 si aucune attribution n'est voulue |
| Logiciel sous licence CC | Éviter | CC recommande de ne pas utiliser ses licences pour du logiciel (CC0 est acceptable) [choosealicense et CC 2026] | — |
| Journaux LLM | Aucune licence publique avant la porte C; cible CC BY 4.0 | Les conditions du fournisseur sur la republication des réponses de l'API ne sont pas lues (voir les questions ouvertes de [x-methodes](../recherche/dossiers/x-methodes.md)) | Dérivés publics et accès sur demande |
| Données de participants | Aucune licence ouverte | Le consentement et l'avis du CER fixent ce qui se partage (section 7.4) | Analyses agrégées sous CC BY 4.0 |
| Matériel tiers non commercial | Non incorporé | NetLogo *Ants* est sous CC BY-NC-SA 3.0 [Wilensky 1997]; *BeeSmart* serait sous la même licence selon l'[audit de vulgarisation](annexes/audit/vulgarisation.md) [Guo et Wilensky 2014] [à confirmer sur la page du modèle]. Un code ou un texte NC-SA ne se mêle pas à du MIT ni à du CC BY [I]. On s'en sert comme repères de validation croisée et lectures complémentaires, sans en reprendre le code | — |

---

## 4. Logiciel : FAIR4RS, citation, archivage

### 4.1 Correspondance avec FAIR4RS

FAIR4RS v1.0 compte 17 principes (F1 à R3) et s'applique quelle que soit la licence [FAIR4RS 2022]; l'article de présentation est [Barker et al. 2022] (non lu : les principes sont lus dans FAIR4RS 2022). Les principes pour les données restent ceux de [Wilkinson et al. 2016].

| Principe | Mise en œuvre |
|---|---|
| F1 identifiant unique et pérenne | DOI de concept (toutes versions) et SWHID |
| F1.1 identifiants par niveau de granularité | Un SWHID de répertoire par composant citable (noyau, chaque modèle de référence, couche navigateur) [I]; un DOI par composant seulement s'il a son propre dépôt |
| F1.2 identifiants par version | Une release et un DOI de version à chaque porte de reproduction franchie |
| F2 métadonnées riches | `CITATION.cff`, README, ODD par modèle; `codemeta.json` seulement si un dépôt CoMSES ou Software Heritage l'exige |
| F3 métadonnées portant l'identifiant | Clé `identifiers` de `CITATION.cff`, ajoutée après la première release (le DOI de concept n'existe qu'après) [I] |
| F4 métadonnées FAIR, indexables | Notice Zenodo; archive Software Heritage |
| A1, A1.1 accès par identifiant, protocole ouvert | Résolution du DOI et du SWHID; HTTPS et git |
| A1.2 authentification si nécessaire | Seulement pour les données de participants (stockage approuvé par le CER); le code est public |
| A2 métadonnées accessibles sans le logiciel | Notice Zenodo; métadonnées de Software Heritage |
| I1 formats conformes aux normes du domaine | ODD pour la description; JSON, JSONL, CSV pour les données; manifeste de run |
| I2 références qualifiées à d'autres objets | Clé `references` de `CITATION.cff`; manifeste de run vers les DOI des jeux de données; fiches vers les étiquettes de la bibliographie |
| R1 attributs multiples et exacts | README, ODD, fiche de reproduction |
| R1.1 licence claire et accessible | `LICENSE` (code) et table des licences par type dans le README |
| R1.2 provenance détaillée | Manifeste de run (graine, SHA, versions), registres des déviations et des refus |
| R2 références qualifiées à d'autres logiciels | Versions de Node et des dépendances figées; modèles NetLogo cités, non repris |
| R3 conformité aux normes communautaires | ODD en sept éléments [Grimm et al. 2020]; normes CoMSES (ODD, codemeta, DataCite) [CoMSES 2026]; lignes directrices de [Sauro et al. 2025] |

### 4.2 CITATION.cff

- Fichier à la racine de la branche par défaut : GitHub en tire un lien « citer ce dépôt » (APA, BibTeX); Zotero et Zenodo le lisent. Version 1.2.0; clés obligatoires `cff-version`, `message`, `title`, `authors` [CFF 2026].
- **Pas de `.zenodo.json`** : Zenodo n'applique qu'un sous-ensemble de `CITATION.cff` et l'ignore entièrement si un `.zenodo.json` existe [CFF 2026]. Une seule source de métadonnées.
- Citer le DOI de version dans les notes, le DOI de concept dans la bibliographie générale, et le SWHID du répertoire de la version citée en pied de note [x-methodes](../recherche/dossiers/x-methodes.md); principes de citation du logiciel : [Smith et al. 2016].

```yaml
cff-version: 1.2.0
message: "Si vous utilisez ce logiciel ou ces données, citez-les ainsi."
title: "Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents"
type: software
authors:
  - family-names: Bruneau            # d'après la configuration git; à confirmer
    given-names: André-Guy
    orcid: "https://orcid.org/____"  # à compléter
    affiliation: "____"              # à compléter
version: "X.Y.Z"                     # à chaque release
date-released: "AAAA-MM-JJ"          # à chaque release
license: MIT                         # code seulement; autres licences : README
repository-code: "https://github.com/____/____"
keywords: [stigmergie, quorum, systèmes multi-agents, ODD, reproduction]
# identifiers: ajouter le DOI de concept Zenodo après la première release
```

### 4.3 Séquence GitHub, Zenodo, Software Heritage (porte A)

1. Dépôt dédié, public, avec `LICENSE`. Exigence de la documentation GitHub; l'approbation d'un propriétaire d'organisation peut être requise si le dépôt appartient à une organisation. Les pages Zenodo lues ne l'énoncent pas [GitHub et Zenodo 2026].
2. Balayage de secrets de l'historique avant toute publicité du dépôt (clés d'API) [I].
3. Ajouter `CITATION.cff`; vérifier l'absence de `.zenodo.json`.
4. Autoriser l'application Zenodo et activer le dépôt dans Zenodo [GitHub et Zenodo 2026].
5. **Vérifier le webhook** : GitHub, Settings, Webhooks. La documentation Zenodo lue ne le décrit pas; un cas de dépôt lié sans webhook est rapporté (issue Zenodo n° 2281, source secondaire) et le chercheur l'a déjà rencontré, selon l'[audit méthodologique](annexes/audit/methodologie.md).
6. Répéter les étapes 1 à 5 sur un dépôt jetable : release, pré-version, brouillon. La documentation lue ne dit pas comment Zenodo traite brouillons et pré-versions : l'essai tranche.
7. Publier la première release **seulement après** 4 à 6; vérifier que titre, auteurs et licence de la notice correspondent à `CITATION.cff`.
8. Reporter le DOI de concept dans `CITATION.cff` et le README. Zenodo distingue DOI de version et DOI de concept (toutes versions) [GitHub et Zenodo 2026].
9. Software Heritage : « Save Code Now » après chaque release; il archive le code source, non les binaires; son SWHID est une norme ISO/IEC 18670 depuis 2025-04-23; il prend en charge `codemeta.json`, et la FAQ lue ne mentionne pas `CITATION.cff` [SWH 2026]. Motif de préservation : [Di Cosmo et Zacchiroli 2017]. Les données et journaux vont à Zenodo, pas à Software Heritage.

---

## 5. Préenregistrements et Registered Report

Le cadre sépare le confirmatoire (préenregistré) de l'exploratoire (pages interactives, étiquetées comme tel). Sans plan figé, les comparaisons de simulation sont exposées aux pratiques douteuses documentées par [Pawel et al. 2024].

| Projet | Enregistrement | Moment |
|---|---|---|
| P1, P8, P5 (phase 1); P3, P4, P6, P9 (phase 2) | Un enregistrement OSF par projet, gabarit ADEMP-PreReg pour études de simulation [Siepe et al. 2024] | Avant la première exécution confirmatoire du projet (porte B) |
| P2 | Idem, seulement si la porte go/no-go de P2 est franchie | Idem |
| P7 | Registered Report : étape 1 = protocole et pilote (variance, coût, refus, échecs d'analyse); étape 2 = résultats; analyses non prévues dans une section exploratoire [Chambers 2013] [Chambers et Tzavella 2022]; modèle OSF « Registered Report Protocol » [OSF 2026] | Étape 1 acceptée avant la phase des ancrages et la grille centrale |
| V0 (évaluation) | Enregistrement OSF de l'évaluation, après l'avis du CER | Avant la collecte |

**Contenu minimal d'un enregistrement** [I, d'après [Siepe et al. 2024] et [x-methodes](../recherche/dossiers/x-methodes.md)] : hypothèses et direction attendue, critère de réfutation; variables et plan; paramètres et plages; nombre de répétitions et erreur standard de Monte Carlo visée; marges d'équivalence; tests, corrections multiples, script d'analyse; politique de graines; SHA du dépôt et des fichiers de scénario; règles d'exclusion; pour P7, en plus : règle d'attrition des refus (section 6.3), plafond budgétaire, fenêtre d'exécution, cellule sentinelle, plan de remplacement d'un modèle retiré.

**Mise à jour.** Un enregistrement OSF est une version horodatée en lecture seule; une mise à jour est un processus transparent distinct; embargo possible jusqu'à quatre ans [OSF 2026].

**Registre des déviations.** Le registre de [04-protocole-reproduction.md](04-protocole-reproduction.md) couvre aussi les écarts au préenregistrement; fichier versionné, et 04 prime si ses champs diffèrent. Champs minimaux : identifiant, date, section du plan, plan d'origine, déviation, raison, catégorie, effet sur la sévérité du test, effet sur la validité de l'inférence, décision. Cinq catégories de [Lakens 2024] : événement imprévu, erreur de préenregistrement, information manquante, hypothèse non testée violée, hypothèse auxiliaire falsifiée. Une déviation peut accroître la sévérité du test [à confirmer : chapitre de Lakens non recoupé]; elle se déclare, ne se corrige jamais en silence. Cadre de rapport : [Willroth et Atherton 2024].

**Revue pour le Registered Report.** *Royal Society Open Science* (depuis 2015 [à confirmer]) et *PLOS ONE* offrent le format (source secondaire). Non trouvé pour *J R Soc Interface*, *PLOS Comput Biol*, *JASSS*, *Swarm Intelligence* (absence non démontrée) [x-methodes](../recherche/dossiers/x-methodes.md). La portée de ces revues pour un sujet d'agents LLM reste à confirmer (DC7). Les délais d'évaluation de l'étape 1 sont inconnus; voir R33.

---

## 6. Journaux LLM (P7) : archivage

### 6.1 Contenu d'un enregistrement

Un appel égale une ligne JSONL. Le schéma exact du journal est fixé dans [05-spec-simulation.md](05-spec-simulation.md), qui prime pour les noms de champs; l'archive exige au minimum, selon [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md) et [x-methodes](../recherche/dossiers/x-methodes.md) : requête, réponse brute, identifiant `model` renvoyé, `usage`, `stop_reason`, latence, horodatage, région, `request-id`, effort et paramètres de requête, graine de permutation de l'ordre des agents.

```json
{"campagne":"…","cellule":"…","run":"…","tour":0,"agent":0,
 "t_utc":"…","region":"…","request_id":"…",
 "model_demande":"…","response_model":"…",
 "params":{"effort":"…","max_tokens":0,"schema_sortie":"…"},
 "prompt_sha":"…","ordre_perm":[],"graine_env":0,
 "requete":"…","reponse_brute":"…","usage":{},
 "stop_reason":"…","latence_ms":0,"analyse_ok":true}
```

- L'invite système, identique dans toute une cellule, se range une fois par condensat (`prompt_sha`) dans un répertoire d'invites.
- Un manifeste par campagne : SHA du dépôt, versions de Node et des dépendances, fichiers de scénario, graines, fenêtre d'exécution, ordre randomisé des cellules, condensats de tous les fichiers.
- On ne journalise jamais les en-têtes HTTP (la clé d'API y passe) [I].

### 6.2 Taille

Le dossier P7 chiffre environ 2 300 exécutions et environ 700 000 appels pour la campagne complète. Ses hypothèses de coût : une exécution type de 300 appels, et par appel de niveau L2 environ 800 jetons non cachés et 150 de sortie. Avec environ 4 caractères par jeton (hypothèse de ce document), cela donne de l'ordre de quelques Go de texte brut avant compression pour la campagne [I] [à confirmer]. On mesure l'octet par appel au pilote (phase 0 : 60 exécutions), puis on extrapole : appels × octets par appel. Les limites de taille de Zenodo ne sont pas lues dans les dossiers; à vérifier avant le dépôt.

### 6.3 Confidentialité et conditions

| Sujet | Règle |
|---|---|
| Données personnelles | Aucune attendue : environnements synthétiques et sorties de modèle. À vérifier par balayage avant dépôt [I] |
| Secrets | Aucun en-tête journalisé; balayage avant dépôt |
| Rétention chez le fournisseur | Fable 5.1 impose une rétention de 30 jours, incompatible avec une organisation à rétention nulle [Anthropic 2026b]; ne l'inclure que comme option descriptive hors comparaison principale. Les autres modèles : à vérifier |
| Conditions d'utilisation et politique d'usage | **Non lues dans les dossiers** : à lire avant la première campagne et avant tout dépôt (porte C). Points à y chercher [I] : republication des réponses, usage en évaluation comparative, recherche de sécurité (P6), rétention |
| Si la republication est restreinte | Publier les dérivés (scores, métriques, condensats, invites, schémas) et offrir un accès sur demande; ne rien déposer de brut |
| Journaux P6 | Revue de double usage avant dépôt (porte D) |
| Publication différée | Embargo OSF jusqu'à quatre ans pour le protocole [OSF 2026]; embargo Zenodo à vérifier |

**Refus de classifieurs : attrition, jamais donnée manquante silencieuse.** Les classifieurs de sécurité de Opus 5.5, Sonnet 5.5 et Fable 5.1 peuvent renvoyer `stop_reason: "refusal"` (catégories `cyber`, `bio`, `reasoning_extraction` relevées sur Opus 5.5 dans l'audit méthodologique) [Anthropic 2026b]. Des refus différents selon le modèle créent des données manquantes différentielles. Règle à préenregistrer :
- chaque refus est codé comme issue (le dossier P7 le prévoit : scission, absence de décision, refus) et consigné dans le registre des refus : cellule, run, tour, agent, `response_model`, `stop_reason`, catégorie si exposée, horodatage, condensat de la requête;
- aucun *fallback* serveur ou client (il change de modèle en cours d'expérience); aucune reformulation d'invite pour contourner un classifieur;
- on rapporte le taux de refus par cellule et par modèle; analyse principale sur les runs sans refus, analyse de sensibilité où le refus compte comme échec [I];
- une cellule dont le taux de refus dépasse un seuil est déclarée non comparable; seuil à fixer au pilote avant le préenregistrement [à confirmer].

### 6.4 Rejouable n'est pas ré-exécutable

| Niveau | Garanti ? | Ce que cela veut dire | Raison |
|---|---|---|---|
| Rejeu | Oui, par conception | L'environnement déterministe est relancé à partir des sorties journalisées, sans appel à l'API : mêmes trajectoires, mêmes métriques et figures; sert aux réanalyses, à l'annotation des échecs et aux visuels | Journal complet et SHA du dépôt |
| Ré-exécution | Non | Régénérer des sorties comparables en rappelant l'API | Pas de paramètre `seed` visible; `temperature` non réglable sur les modèles postérieurs à Opus 4.6; résultats jamais entièrement déterministes [Anthropic 2026a]; variation d'exactitude jusqu'à 15 % entre exécutions [Atil et al. 2024]; dérive d'un service en trois mois [Chen et al. 2023]; retraits de modèles |

Le README de chaque jeu de journaux porte cet énoncé, avec l'identifiant exact des modèles et les dates de la campagne. Le journal permet le rejeu, non la régénération : la v3 ne le disait pas.

### 6.5 Versions de modèles

| Modèle | Statut (consulté le 2026-10-01) [Anthropic 2026a] |
|---|---|
| Haiku 4.5 | Actif; retrait pas avant 2026-10-15 |
| Sonnet 4.5 | Déprécié le 2026-09-30; retrait le 2026-11-30 |
| Sonnet 5.5 | Retrait pas avant 2027-09-28 |
| Opus 5.5 | Retrait pas avant 2027-09-22 |
| Fable 5.1 | Retrait pas avant 2027-09-01 |

Préavis d'au moins 60 jours; la page reconnaît que les chercheurs perdent l'accès aux modèles pour les études en cours et comparatives. Règles : consigner `response.model` à chaque appel; exécuter la campagne dans une fenêtre courte, cellules randomisées dans le temps; tâches sentinelles répétées avant, pendant et après; collecter d'abord le modèle qui part en premier; les identifiants sont des instantanés figés selon la documentation, mais l'absence de dérive silencieuse n'est pas vérifiée de façon indépendante. Une ancre à poids ouverts (DC5) garderait une ré-exécution possible après retrait; elle est absente du plan chiffré du dossier P7 [I].

---

## 7. Éthique

### 7.1 Simulation pure

Aucune expérimentation animale; aucune collecte de terrain; toutes les entrées biologiques viennent de publications ([audit méthodologique](annexes/audit/methodologie.md)). Aucune personne n'est sujet de recherche, sauf dans l'évaluation pédagogique de V0 (section 7.4). Les agents LLM sont des logiciels, non des participants. Si l'établissement exige un avis pour une recherche sans sujet vivant, c'est à confirmer auprès de lui [I].

### 7.2 Recherche défensive en P6

But : comprendre les modes d'échec de la coordination sans contrôle central et leurs défenses. Le programme ne cherche pas à améliorer des attaques.

| Permis | Sous conditions | Interdit |
|---|---|---|
| Réplication en agents à règles de la phéromone trompeuse d'[Aswale et al. 2022]; récurrences de propagation de [Gu et al. 2024] et de [Lee et Tiwari 2024] (modèles calés sur des expériences publiées); discussion des travaux publics [Greshake et al. 2023], [Cohen et al. 2024], [Triedman et al. 2025], [Hammond et al. 2025] au niveau des mécanismes | Agents LLM réels, seulement dans l'environnement synthétique de P7 : sorties structurées, aucun outil, aucun accès réseau; charge de test = marqueur inerte (jeton témoin), dont on mesure la propagation [I]; journaux revus avant dépôt | Code ou charges utiles opérationnels, c'est-à-dire réutilisables contre un système tiers (invites d'injection fonctionnelles, invites autoréplicantes en état de marche); essais contre un produit ou un service tiers en production; contournement de classifieurs |

Le cadrage « recherche défensive, sans charges réutilisables contre des systèmes tiers, divulgation responsable si un produit réel est touché » vient de l'[audit méthodologique](annexes/audit/methodologie.md).

**Politique de divulgation.**
1. Si un essai révèle une faille d'un produit ou d'un modèle réel : arrêter, ne rien publier des détails, consigner au registre.
2. Notifier le fournisseur par son canal de sécurité; délai de divulgation coordonnée à fixer (DC8) [à confirmer].
3. Publier au niveau des mécanismes (taxonomie, dynamiques, courbes) seulement; les détails après correction ou après le délai.
4. Aucune publication d'un vecteur nouveau avant la fin de ces étapes.

**Revue de double usage (porte D).** Avant toute diffusion issue de P6 : l'artefact contient-il une charge exécutable ? nomme-t-il un produit ? décrit-il un vecteur nouveau ? un tiers pourrait-il reproduire l'attaque avec le seul dépôt ? Une réponse positive à l'une d'elles retient la diffusion. Les correspondances entre pathologies biologiques et modes d'échec d'agents (moulin et répétition d'étapes, par exemple) restent des *Analogie* [Cemri et al. 2025] [I].

### 7.3 Conditions d'utilisation des API

Les conditions et la politique d'usage du fournisseur n'ont pas été lues dans les dossiers : lecture obligatoire avant la première campagne (porte C), avec consignation de la date et de la version lue. Les refus de classifieurs suivent la règle d'attrition de la section 6.3. En P6, des scénarios d'injection peuvent déclencher les classifieurs : on le consigne comme résultat, on ne le contourne pas.

### 7.4 Évaluation pédagogique : CER et Loi 25

Le protocole est dans [07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md); ce plan fixe les conditions éthiques et de données.

- **Avis du CER avant toute collecte, pilotes et entretiens compris.** Les études pilotes relèvent d'un CER; l'intention ou la capacité de publier n'est pas un critère (EPTC 2, art. 2.1). L'exemption de l'art. 2.5 ne vaut que pour un usage exclusivement évaluatif ou d'amélioration; des données ensuite destinées à la recherche sont une utilisation secondaire [CRSH et al. 2018]. Déclarer l'intention de recherche dès la demande (art. 6.11 et 10.1 relevés à la vérification, non repris dans le dossier [à confirmer]).
- **Consentement.** Volontaire, retrait possible en tout temps; un recrutement par un enseignant peut créer une influence indue; offrir les crédits autrement à qui refuse (art. 3.1, inchangé dans l'édition 2022 [CRSH et al. 2018]).
- **Loi 25.** Informer au préalable de toute technologie d'identification, de localisation ou de profilage et des moyens de l'activer (art. 8.1 et 65.0.1); consentement manifeste, libre et éclairé; sous 14 ans, c'est le titulaire de l'autorité parentale (art. 14); évaluation des facteurs relatifs à la vie privée (art. 3.1 à 3.3) [Québec 2021] [CAI s. d.]. Le grand public visé a 15 ans et plus : aucune collecte sur les moins de 14 ans. La loi applicable (secteur privé ou organismes publics) et l'obligation d'évaluation dépendent du statut du chercheur : question pour le responsable de la protection des renseignements personnels de l'établissement [x-vulgarisation](../recherche/dossiers/x-vulgarisation.md).
- **Analytique.** Agrégée, sans identifiant, sans requête tierce non déclarée (polices, CDN, traceurs); toute fonction de profilage exige information préalable et consentement.
- **Données.** Pseudonymisation; stockage approuvé par le CER; aucune donnée de participant sur GitHub ni Zenodo; seules des analyses agrégées ou anonymisées se partagent, selon le consentement; durée de conservation fixée par le CER [à confirmer]. Les items d'un instrument s'usent s'ils sont publiés : publier l'instrument après la fin des collectes [I].
- **Entretiens de conception à voix haute.** Relèvent du CER si leurs résultats nourrissent une publication; la décision écrite du CER tranche [x-vulgarisation](../recherche/dossiers/x-vulgarisation.md).
- Sans CER accessible (DC6), V0 se limite à des pages sans collecte.

### 7.5 Charte anti-anthropomorphisme

La règle du cadre (pas d'anthropomorphisme ni de téléologie) s'applique à l'**explication causale** sans exception : aucun agent de contrôle, aucun but. Les termes de la littérature (« décision collective », « quorum », « vote », « démocratie » chez [Seeley 2010]) sont du vocabulaire technique : définis, entre guillemets à la première occurrence, étiquetés *Analogie* si la métaphore porte l'argument. Le lexique complet est dans [07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md).

| Règle | Appui |
|---|---|
| Énoncer d'abord le mécanisme positif; « la reine ne commande pas » n'apparaît jamais seul. La reine règle la reproduction par phéromones; l'encart « Ce que fait vraiment la reine » est obligatoire où le sujet apparaît | [Resnick 1996]; [Slessor et al. 1988]; [Oystaeyen et al. 2014]; [Amsalem et al. 2015]; structure d'encart : [Lewandowsky et al. 2020] |
| Nommer le taxon et le préréglage; pas de « la fourmi » ni de « l'abeille » comme archétype | Cadre, section sur les taxons |
| Fourmi, abeille, agent : trois solutions, pas trois étapes; aucune flèche fourmi vers abeille vers LLM; la richesse du signal est une dimension de conception | Les fourmis sont le groupe frère des Apoidea [Johnson et al. 2013]; [Chi et al. 2012] |
| Aucun verbe mental pour un modèle de langage (« sait », « croit », « pense »); décrire par la fonction et le contenu du contexte | [Shanahan 2022] |
| Pas d'« essaim d'agents » sans mesure du gain à budget égal; décrire les algorithmes par composants, la métaphore après | [Sörensen 2015]; [Camacho-Villalón et al. 2023]; [Aranha et al. 2022] |
| Une exécution unique ne prouve rien : distribution sur N graines à côté de l'exécution vivante, graine typique déclarée | [audit de vulgarisation](annexes/audit/vulgarisation.md) |
| Statut épistémique sur chaque énoncé et chaque graphe : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie* | Cadre |
| Produits commerciaux : paliers de capacité dans les visuels publics; identifiants exacts et dates dans les notes | [audit de vulgarisation](annexes/audit/vulgarisation.md) |
| Pictogrammes sans visage par défaut; le test A/B silhouette contre visage se fait dans l'évaluation | [Kelemen et Rosset 2009]; [Tamir et Zohar 1991]; [McGellin et al. 2021] |

La preuve sur le tort des formulations anthropomorphes est mitigée : [Tamir et Zohar 1991] et [McGellin et al. 2021] ne montrent pas d'effet délétère; ce qui est robuste est l'attribution causale à un contrôleur ou à un but [Resnick 1996] [Chi et al. 2012] (voir la tension signalée à la section 10).

### 7.6 Coût et empreinte

Les coûts se rapportent avec la performance [Kapoor et al. 2025] : jetons, appels, latence, dollars par cellule. L'empreinte énergétique n'est pas mesurée; jetons et appels servent d'indicateur [I]. Le plafond budgétaire du dossier P7 est fixé au pilote et préenregistré.

---

## 8. Registre des déclarations (à compléter)

Rien n'est prérempli : seul le chercheur connaît ces faits.

| Rubrique | À déclarer | Statut | Où le reporter |
|---|---|---|---|
| Financement de la recherche | Source, numéro, rôle du bailleur; si l'un des trois organismes finance, la politique de gestion des données s'applique (stratégies institutionnelles exigées depuis 2023-03-01; plan de gestion pour un ensemble de concours) [Tri-Agence 2025] | À compléter | Notes, `CITATION.cff`, préenregistrements |
| Financement des appels d'API | Source, crédits éventuels du fournisseur | À compléter | Notes de P7 |
| Affiliation et établissement | Nom, CER, responsable de la protection des renseignements personnels | À compléter | `CITATION.cff`, dossier CER |
| Conflits d'intérêts | Liens avec les fournisseurs de modèles évalués (emploi, actions, crédits, accès anticipé), avec revues et conférences visées. P7 évalue des modèles d'un fournisseur dont un outil assiste aussi la rédaction du programme [I] : le déclarer | À compléter | Notes, soumissions |
| Usage d'IA générative | Les documents du programme sont rédigés avec l'assistance de modèles de langage (Claude); décrire le rôle de chaque outil et la vérification humaine; rappeler que la bibliographie contient 51 références non vérifiées sur 615 (451 vérifiées, 113 corrigées) | À compléter par le chercheur | Notes, README |
| Validations d'experts | Myrmécologue, apidologue, praticien de l'agentique : noms, dates, périmètre (cartes comparatives, lexique) | À compléter | Notes de V0 |
| Approbations | CER (numéro, date) ou exemption; évaluation des facteurs relatifs à la vie privée | À compléter | Porte E |
| Préenregistrements | Identifiant OSF, date, écarts | Par projet | Notes |
| Divulgations P6 | Incidents, notifications, dates, statut | À compléter | Registre privé; résumé dans les notes |
| Disponibilité du code et des données | DOI, SWHID, licences par objet, restrictions et raison | À générer à chaque release | Note, README |

Modèle de déclaration pour une note :

> *Financement :* ____. *Conflits d'intérêts :* ____. *IA générative :* ____. *Éthique :* ____. *Préenregistrement :* ____. *Code :* DOI ____, SWHID ____, licence ____. *Données :* DOI ____, licence ____, restrictions ____.

---

## 9. Plan de publication par projet

**Toutes les dates sont à confirmer** sur le site officiel de chaque lieu, le jour de la décision. Les échéances d'AAMAS 2027 se comptent à la fin du jour indiqué, UTC−12 [AAMAS 2027]. Format commun : article ou note avec ODD en annexe, préenregistrement, code et données à DOI avant la soumission (porte F).

| Projet | Cible principale | Repli | Exigences d'ouverture et format | Dates connues (à confirmer) |
|---|---|---|---|---|
| S0, typologie du cadre | AAMAS 2027, piste Blue Sky Ideas, sans résultat de simulation [I] | ALIFE 2027, article de position [I] | Article court; liste de reproductibilité non décrite sur la page lue [AAMAS 2027] | Blue Sky Ideas : 2026-11-12 [AAMAS 2027] |
| S0, moteur et protocole de reproduction | *JASSS* : ODD recommandé, code recommandé, évaluation CoMSES facultative [JASSS 2026] | *SoftwareX* [I] | Article méthodologique; ODD complet; dépôt à DOI | Aucune |
| P1, P5 | *J R Soc Interface* ou *PLOS Comput Biol* | *Behav. Ecol. Sociobiol.*, *Insectes Sociaux* [I] | *J R Soc Interface* : données et code publics à la publication, code et matériel dès la soumission [JRSI 2026]; *PLOS Comput Biol* : code public à la publication (politique du 2021-03-30), dépôt à DOI recommandé [PLOS CB 2021] | Aucune |
| P8 | *J R Soc Interface* ou *PLOS Comput Biol* [I] | *Swarm Intelligence*, *JAAMAS* [I] | Idem P1 | Aucune |
| P3, P4, P6 | ALIFE 2027 (Prague, 19 au 23 juillet 2027) [ALIFE 2027], puis la revue *Artificial Life* [I] | *JASSS* pour l'apport méthodologique | Article de conférence; échéances, formats et éditeur non publiés. P6 : porte D avant diffusion | Non publiées |
| P9 | ALIFE 2027 ou *Swarm Intelligence* [I] | *JASSS* [I] | Idem P3; phase 2, construction en phase 3 | Non publiées |
| P2 (si go) | *Swarm Intelligence* [Swarm Intelligence 2026] : décrire les algorithmes par composants, sans métaphore | ANTS 2028 (annoncée; lieu et dates non trouvés) [ANTS 2026]; GECCO 2027 (Cracovie, 12 au 16 juillet 2027) [GECCO 2027] | Même classe de problèmes, même budget d'évaluations, référence non bio-inspirée | GECCO 2027 : résumé 2027-01-19, soumission 2027-01-26 [à confirmer; source non vérifiée] |
| P7 | Registered Report (DC7) | *JAAMAS* : un article accepté dans les 12 mois précédant AAMAS peut y être présenté [JAAMAS 2026] | Étape 1 avant la collecte; journaux à DOI; identifiants de modèles et dates dans la note | AAMAS 2027 (Hanoï, 3 au 7 mai 2027) hors de portée : résumé 2026-10-01, article 2026-10-08 [AAMAS 2027]; AAMAS 2028 inconnu |
| V0, évaluation | Non documenté dans les dossiers | — | Format et revue à définir après l'avis du CER | — |

Autres échéances d'AAMAS 2027, pour mémoire : propositions d'ateliers 2026-10-29, notification 2026-12-21 [AAMAS 2027].

---

## 10. Limites de portée et tensions avec le cadre

### 10.1 Ce que le programme ne peut pas conclure

| Le programme ne conclut pas… | Parce que | Formulation permise |
|---|---|---|
| Qu'un modèle reproduit décrit une colonie réelle | La réplication d'un modèle n'est pas la validation contre des données empiriques (cadre); l'identité numérique n'est pas atteignable pour un modèle stochastique [Axtell et al. 1996] | « Le modèle M reproduit le résultat publié R au niveau relationnel (ou distributionnel) » : *Résultat reproduit* |
| Que « la fourmi » ou « l'abeille » fait X | Le canal est une variable du modèle, non un attribut du taxon (cadre) | Nommer le taxon et le préréglage |
| Qu'un signal plus riche améliore toujours le gain collectif (QR0) | Cela dépend de l'habitat [Sherman et Visscher 2002] [Donaldson-Matasci et Dornhaus 2012] [Beekman et Lew 2008]; le débat n'ajoute pas au vote dans certains cadres [Choi et al. 2025a] | « Dans le scénario S, à budget égal, G varie ainsi avec R » |
| Qu'un orchestrateur bat toujours l'émergence, ou l'inverse (QR3) | Dépend de la structure de tâche; c'est une interaction, qui exige de 4 à 16 fois les runs d'un effet principal [x-methodes](../recherche/dossiers/x-methodes.md) | Conclure seulement sur les interactions que le budget permet de détecter |
| Que le résultat tient pour d'autres modèles, fournisseurs ou dates | Retraits, absence de `seed`, dérive; la grille du dossier P7 ne couvre que des modèles d'un seul fournisseur [I] | « Pour le modèle X, à la date D » |
| Qu'un résultat à 10 ou 25 agents LLM se transpose à 10³ à 10⁶ individus ou à un système industriel | Écart d'échelle; outils, latence et coûts absents des simulations [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md) | « Mécanisme de canal à N agents » |
| Qu'il n'y a « pas d'effet » | Le non-rejet n'est pas l'équivalence [Lakens 2017] | « Équivalent » seulement avec un TOST à marge préenregistrée |
| Que les modèles de langage appliquent l'information locale et non un savoir de manuel | Ils connaissent le pont double et la danse; l'habillage neutre réduit le risque sans l'exclure [I] | Résultat sous scénario à habillage neutre |
| Qu'une défense de P6 fonctionne en pratique | Résultats de modèles abstraits et d'environnements synthétiques; la « phéromone de prudence » est un remède proposé par les auteurs, non observé chez la fourmi [Aswale et al. 2022]; les correspondances biologie-agents sont des *Analogie* | « Dans le modèle, la défense réduit… » |
| Un effet pédagogique hors de la population testée | Les tailles d'effet viennent de méta-analyses animation contre image statique; leur transposition aux explorables est une inférence [audit de vulgarisation](annexes/audit/vulgarisation.md) | « Chez les participants de l'étude » |
| Quoi que ce soit qui repose sur une valeur [à confirmer] ou une source non vérifiée | 51 références non vérifiées; réserves ouvertes du cadre | Garder la marque; aucune valeur chiffrée sans elle |

### 10.2 Tensions et lacunes à arbitrer

1. **Charte anti-anthropomorphisme.** Le cadre pose « pas d'anthropomorphisme ni de téléologie » en termes absolus. Le dossier [x-vulgarisation](../recherche/dossiers/x-vulgarisation.md) juge la règle trop absolue et non mesurable. La section 7.5 l'applique sans exception à l'explication causale et traite les termes de la littérature comme vocabulaire étiqueté. Arbitrage du chercheur : amender le cadre ou maintenir cette lecture.
2. **Le cadre ne contient aucune règle de science ouverte** (licences, DOI, plan de gestion, publication des journaux) : ce document les ajoute; le cadre devrait y renvoyer.

---

## 11. Risques et contrôles d'achèvement

### 11.1 Risques

Plage R30 à R41 réservée à ce document, à fusionner dans le registre de [09-feuille-de-route.md](09-feuille-de-route.md).

| ID | Risque | Parade | Porte |
|---|---|---|---|
| R30 | Zenodo sans webhook : pas de DOI à la première release (cas déjà rapporté par le chercheur, selon l'[audit méthodologique](annexes/audit/methodologie.md)) | Répétition sur dépôt jetable; vérifier Settings, Webhooks | A |
| R31 | Dépôt actuel public sans licence, historique étranger au programme, probablement déjà archivé par Software Heritage [I] | Dépôt dédié (DC1); `LICENSE` avant toute publicité | A |
| R32 | Les conditions du fournisseur restreignent la republication des journaux | Lecture avant la campagne; dérivés et accès sur demande | C |
| R33 | Retrait de modèles avant la fin de la campagne ou de l'évaluation de l'étape 1 d'un Registered Report (Haiku 4.5 pas avant 2026-10-15; Sonnet 4.5 le 2026-11-30) [Anthropic 2026a] | Fenêtre courte; modèle le plus menacé collecté en premier; remplacement préenregistré; ancre à poids ouverts (DC5) | B, C |
| R34 | Refus différentiels des classifieurs : données manquantes différentielles | Règle d'attrition préenregistrée; refus codés; aucun *fallback* | B, C |
| R35 | Diffusion involontaire d'un contenu à double usage (P6) | Marqueurs inertes; revue de double usage | D |
| R36 | Collecte sans avis du CER, ou analytique non conforme à la Loi 25 | Aucune collecte avant l'avis; audit réseau de chaque version publiée | E |
| R37 | Aucun CER accessible, ou régime de la Loi 25 indéterminé | DC6; question au responsable de la protection des renseignements personnels; V0 sans collecte | E |
| R38 | Clé d'API dans un dépôt public ou un journal | Balayage de secrets; aucun en-tête journalisé; variables d'environnement | A, C |
| R39 | Reprise de code ou de texte sous licence non commerciale (NetLogo *Ants*) | Revue de provenance; usage comme repère seulement | A |
| R40 | Valeur [à confirmer] ou référence non vérifiée propagée dans un manuscrit | Porte F; relecture des sources primaires avant soumission | F |
| R41 | Échéance manquée ou mal lue (AAMAS 2027 : résumé le 2026-10-01) [AAMAS 2027] | Relecture sur le site officiel; décision datée (DC9) | F |

### 11.2 Liste de contrôle

| Contrôle | Comment | Attendu |
|---|---|---|
| Dépôt public et licencié | `gh repo view --json visibility,licenseInfo` | `PUBLIC`; `licenseInfo` non nul |
| Pas de `.zenodo.json` | Lister la racine du dépôt | Absent |
| Citation | Page GitHub du dépôt | Bouton « citer ce dépôt » (APA, BibTeX) [CFF 2026] |
| Webhook Zenodo | GitHub, Settings, Webhooks, avant la release | Crochet Zenodo présent |
| Release archivée | Notice Zenodo | DOI de version et DOI de concept; métadonnées conformes à `CITATION.cff` |
| Software Heritage | « Save Code Now », puis recherche du SWHID | SWHID du répertoire de la release noté dans la note |
| Préenregistrement antérieur aux données | Comparer l'horodatage OSF au premier manifeste de run confirmatoire | OSF antérieur |
| Rejeu hors ligne | Relancer l'environnement depuis les journaux, réseau coupé; comparer les condensats des métriques | Condensats identiques |
| Registre des refus complet | Compter les `stop_reason` égaux à `refusal` dans les journaux | Égal au nombre de lignes du registre |
| Aucun secret | Balayage de secrets sur l'historique et sur les journaux | Aucune trouvaille |
| Avis éthique | Dossier CER | Avis ou exemption avant la première collecte |
| Cohérence documentaire | `node outils/verifier-docs.ts` | Aucune erreur |

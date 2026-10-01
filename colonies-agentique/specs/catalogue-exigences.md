# Catalogue des exigences

Exigences de la [plateforme](vision.md). Chaque identifiant est stable et ne se réutilise jamais. Les exigences fonctionnelles (FR) expriment une intention sous forme de récit utilisateur; les cas d'utilisation de [`cas-utilisation/`](cas-utilisation/) les transforment en comportement vérifiable et listent les identifiants qu'ils servent. La colonne « Origine » renvoie au document de recherche d'où vient l'exigence.

Acteurs : **Chercheur** (exécute, vérifie, publie), **Lecteur** (visiteur d'une page), **Pipeline CI** (vérification automatique à chaque commit), **API LLM** (fournisseur externe, acteur secondaire).

## Exigences fonctionnelles

| ID | Titre | Récit utilisateur | Contexte | Origine |
|---|---|---|---|---|
| FR-001 | Exécuter un scénario | En tant que chercheur, je veux exécuter un scénario (modèle, paramètres, graine) sans interface graphique afin d'obtenir des séries et un manifeste qui permettent de rejouer l'exécution. | SIM | [05](../docs/05-spec-simulation.md) §4.8, §4.9; S0 CS0.3 |
| FR-002 | Rejouer une exécution | En tant que chercheur, je veux rejouer une exécution à partir de son manifeste afin de vérifier qu'elle redonne les mêmes empreintes d'état. | SIM | 05 §15; T0.26 |
| FR-003 | Vérifier une cible de reproduction | En tant que chercheur, je veux exécuter une cible de reproduction et obtenir un verdict afin de savoir si le modèle de référence reproduit le résultat publié. | SIM | [04](../docs/04-protocole-reproduction.md); 05 §9.2 |
| FR-004 | Balayer des paramètres | En tant que chercheur, je veux balayer un ou plusieurs paramètres sur plusieurs graines afin de tracer des diagrammes de phases et d'analyser la sensibilité. | SIM | 05 §10 |
| FR-005 | Aligner par docking | En tant que chercheur, je veux comparer le modèle chorégraphique commun à un modèle de référence afin de savoir s'il peut servir d'extension pour cette référence. | SIM | 05 §2.4; 04 (docking) |
| FR-006 | Préparer les résumés d'une page | En tant que chercheur, je veux précalculer les résultats d'un scénario sur N graines afin qu'une page affiche une distribution sans calcul confirmatoire dans le navigateur. | SIM | 05 §8.3 |
| FR-007 | Calculer les métriques R et G | En tant que chercheur, je veux calculer la richesse du signal R et le gain collectif G sur des résultats afin de comparer des architectures de coordination. | SIM | [06](../docs/06-metriques-et-typologie.md); S0 lot B |
| FR-008 | Vérifier le dépôt | En tant que chercheur, je veux qu'une commande unique vérifie types, tests, conformité et documentation afin de savoir à chaque commit si le comportement spécifié tient. | SIM | 05 §9.1 |
| FR-010 | Suivre un récit guidé | En tant que lecteur, je veux suivre un récit qui me demande une prédiction avant de montrer le résultat afin de comprendre le mécanisme. | PAGES | [07](../docs/07-vulgarisation-evaluation.md) §4.4 |
| FR-011 | Explorer un modèle | En tant que lecteur, je veux changer les paramètres d'un modèle et voir l'effet afin de construire mon intuition. | PAGES | 07 §4.5 |
| FR-012 | Vérifier une reproduction | En tant que lecteur exigeant, je veux voir la cible, le verdict, la distribution, le manifeste et les limites d'un résultat afin de juger sa solidité. | PAGES | 07 §4.6 |
| FR-013 | Partager l'état d'une page | En tant que lecteur, je veux copier un lien qui rouvre la page au même niveau, avec la même graine et les mêmes paramètres, afin qu'une autre personne voie la même chose. | PAGES | 07 §4.9 |
| FR-014 | Suivre un individu | En tant que lecteur, je veux suivre un individu et voir ce qu'il perçoit et la règle qu'il applique afin de relier le niveau individuel au niveau collectif. | PAGES | 07 §4.5 (Vue de l'agent) |
| FR-015 | Modifier la règle d'un agent | En tant que lecteur, je veux modifier la règle des agents et voir l'effet afin de tester une idée, sans que mon résultat se confonde avec un résultat reproduit. | PAGES | 07 §4.5; 05 §14 |
| FR-016 | Télécharger les données d'une page | En tant que lecteur, je veux télécharger les données affichées avec leur manifeste afin de les analyser moi-même. | PAGES | 05 §8.5 |
| FR-017 | Lire le statut épistémique | En tant que lecteur, je veux voir le statut de chaque énoncé et de chaque graphe afin de distinguer un résultat reproduit d'une analogie. | PAGES | 07 §5; [cadre](../docs/00-cadre.md) principe 7 |
| FR-020 | Exécuter une campagne d'agents LLM | En tant que chercheur, je veux exécuter une campagne selon un plan préenregistré (cellules, modèles, effort, répétitions) afin de tester les hypothèses de P7. | LLM | [P7](../projets/P7-synthese-agentique.md) |
| FR-021 | Plafonner le coût | En tant que chercheur, je veux qu'une campagne s'arrête avant de dépasser le budget fixé pour chaque bras afin de ne jamais dépenser plus que prévu. | LLM | P7; [09](../docs/09-feuille-de-route.md) §6.3 |
| FR-022 | Rejouer une campagne | En tant que chercheur, je veux rejouer une campagne à partir de ses cassettes, sans appel d'API, afin de vérifier les analyses après le retrait d'un modèle. | LLM | 05 §8.6, §15 |
| FR-023 | Journaliser chaque appel | En tant que chercheur, je veux que chaque appel d'API soit journalisé avec sa requête, sa réponse, son modèle et son coût afin de pouvoir l'auditer et le rejouer. | LLM | 05 §8.6; [08](../docs/08-science-ouverte-ethique.md) |

## Exigences non fonctionnelles

| ID | Titre | Description | Origine |
|---|---|---|---|
| NFR-001 | Déterminisme | Même scénario, même graine, même version du noyau, même moteur JavaScript et même plateforme : mêmes empreintes d'état, au bit près (niveau N1). | 05 §7.1; T0.26 |
| NFR-002 | PRNG identique entre moteurs | Les sorties du générateur pseudo-aléatoire sont identiques sous Node et sous trois navigateurs de moteurs différents (T0.1, T0.3). | 05 §7.1; S0 CS0.2 |
| NFR-003 | Accessibilité | Chaque page est conforme à WCAG 2.2 AA; le contrôle automatisé ne relève aucune erreur. | 07 §8 |
| NFR-004 | Build reproductible | Deux builds d'une même page donnent le même hachage. | S0 CS0.12; 05 SPK12 |
| NFR-005 | Fluidité interactive | Le temps médian d'un pas de simulation dans une page reste sous le seuil fixé pour 10⁴ agents. Seuil [à confirmer], fixé dans le protocole du spike avant toute mesure. | 05 §11, §12 (SPK4) |
| NFR-006 | Durée de vérification | `npm run verify` termine sous la durée cible du niveau « à chaque commit ». Durée [à confirmer]. | 05 §9.1 |
| NFR-007 | Taille de page | Une page publiée pèse au plus 16 Mo. | 05 §8.3 |
| NFR-008 | Rejouabilité des campagnes | Toute campagne LLM se rejoue hors ligne à partir de ses cassettes (niveau N3). | 05 §15 |
| NFR-009 | Confidentialité | Aucune page ne collecte de donnée personnelle; aucun secret (clé d'API) n'entre dans un manifeste, un journal ou une URL. | 05 §4.9, §8.6; 07 §4.9 |
| NFR-010 | Traçabilité des tests | Chaque test nomme le cas d'utilisation qu'il vérifie, et la cible T quand il en vérifie une. | [README](README.md) des specs |

## Contraintes

| ID | Titre | Description | Origine |
|---|---|---|---|
| C-001 | TypeScript | Moteur et pages en TypeScript; Node ≥ 24.12 exécute le `.ts` directement; `tsc --noEmit` vérifie les types sous deux configurations; aucune dépendance à l'exécution. | cadre §7; 05 §13 |
| C-002 | Aléa contrôlé | Toute source d'aléa de la simulation vient du générateur à graine (xoshiro128** semé par SplitMix64). `Math.random`, `Date.now`, `performance.now` et `new Date` restent hors de la logique de simulation. | 05 §4.1, §7.2 |
| C-003 | Langages hors moteur | Python et R servent seulement hors du moteur (oracles, modèles mixtes); la frontière passe par des fichiers CSV ou JSON. | cadre §7 |
| C-004 | Pages statiques | Les pages sont statiques et rejouent des données; elles n'appellent ni API LLM, ni réseau, ni capacité `sample`. | 05 §14 |
| C-005 | Réplication avant extension | La couche chorégraphique s'ouvre pour une référence seulement après un docking réussi sur une cible satisfaite. | cadre principes 1 et 6; 05 §2.4 |
| C-006 | Exécution confirmatoire | Une exécution confirmatoire exige une cible gelée et aucun paramètre au statut `to-confirm`. | 05 §4.8, §9.2 |
| C-007 | Lieu du calcul | Tout calcul de simulation vit dans `src/core/` ou `src/models/`, selon le tableau des dépendances autorisées. | 05 §2.2 |
| C-008 | Charte et statuts | Couleurs d'identité fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; statuts épistémiques de la liste fermée du cadre. | cadre §8; 07 §5, §6 |
| C-009 | Modèles LLM revérifiés | Identifiants, tarifs et paramètres des modèles LLM sont revérifiés le jour de l'exécution; effort fixé et consigné; aucun repli automatique vers un autre modèle. | cadre correction 16; P7 |
| C-010 | Science ouverte | Licences, `CITATION.cff` et DOI par version, selon le plan de gestion des données. | 08 |

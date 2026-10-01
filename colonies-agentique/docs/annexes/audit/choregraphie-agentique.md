# Audit de la proposition v3 — angle « chorégraphie-agentique »

Date : 2026-10-01. Objet : `proposition-v3.md` (lu en entier). Portée : cadrage chorégraphie/orchestration, stigmergie et tableaux noirs, protocoles agentiques (A2A, MCP), littérature 2023-2026 sur la coordination d'agents LLM, tableau de correspondance ligne par ligne, points de rupture de l'analogie.

## Légende de preuve

- **[lu]** : vérifié pendant l'audit dans la source (page de l'éditeur, résumé arXiv, résumé Europe PMC ou texte intégral). L'outil de lecture passe par un modèle de synthèse : les citations courtes sont fidèles au sens, pas garanties au mot près.
- **[méta]** : seules les métadonnées bibliographiques ont été vérifiées (Crossref, ACM, Europe PMC); le contenu est résumé de mémoire.
- **[secondaire]** : vérifié par une source qui cite l'original, pas par l'original.
- **[inféré]** : raisonnement de l'auditeur, sans source directe.
- **[non vérifié]** : de mémoire, à confirmer.

Limites de l'audit : le quota WebSearch de la session et celui de l'outil Consensus se sont épuisés en cours de route; PubMed, Springer, ACM DL et la presse de Stanford ont refusé l'accès. Les vérifications ont continué par Europe PMC, Crossref et arXiv. Ce qui reste non vérifié est marqué.

## Verdict

L'intuition centrale tient : piste chimique contre danse, c'est bien stigmergie contre signal direct. Les colonies offrent des mécanismes de coordination sans contrôle central documentés et modélisés. Trois défauts de fond empêchent toutefois v3 de supporter un programme académique tel quel :

1. Le mot « chorégraphie » est pris dans un sens que l'informatique ne lui donne pas. En SOA comme en programmation chorégraphique, une chorégraphie est un **plan global explicite**, projeté sur les participants. Une colonie n'a aucun plan global : elle s'auto-organise.
2. Aucune condition orchestrée ne sert de témoin. Or la littérature agentique récente montre que la coordination centralisée gagne souvent, et que le résultat dépend de la structure de la tâche.
3. La moitié du tableau de correspondance est à nuancer, et deux équivalences sont abusives (« délégation », « veto »). La question transversale (richesse du signal) confond deux facteurs.

Les protocoles actuels (A2A v1.0, MCP 2026-07-28) et la littérature sur les tableaux noirs LLM sont absents, alors qu'ils fournissent l'outillage pour rendre le volet agentique concret et reproductible.

---

## 1. Cadrage chorégraphie contre orchestration

### C1 — Critique : chorégraphie (informatique) ≠ auto-organisation (biologie)

**Constat.**
- WS-CDL (W3C Candidate Recommendation, 9 novembre 2005, jamais devenue Recommendation) décrit une collaboration pair-à-pair d'un « global viewpoint » **[lu]**.
- Peltz (2003) oppose l'orchestration, processus exécutable contrôlé par une partie, à la chorégraphie, qui suit les échanges publics entre parties **[secondaire]**.
- Les diagrammes de chorégraphie de BPMN 2.0 (OMG formal/2011-01-03) expriment des contraintes globales sur les interactions **[secondaire]**.
- Montesi définit une chorégraphie comme un « coordination plan » et précise qu'elle ne requiert pas de contrôle central **[lu]**. Son livre (Cambridge UP, 2023) consacre un chapitre à l'*endpoint projection* **[lu]**.
- Les types de session multipartites (Honda, Yoshida, Carbone, POPL 2008; JACM 63(1), 2016) abstraient l'interaction en « global scenario » projeté en types locaux **[lu]**.
- La stigmergie, à l'inverse, coordonne « sans planification, contrôle, communication » (Heylighen 2016) **[lu]**.

En informatique, la chorégraphie est donc **top-down** : spécification globale → projection locale. Le problème de réalisabilité (toute chorégraphie n'est pas réalisable par des pairs; Basu, Bultan, Ouederni, POPL 2012 **[méta]**) en est la marque. La colonie va dans l'autre sens, **bottom-up** : des règles locales produisent un motif global, sans spécification.

La formule « chorégraphies sans chorégraphe » le reconnaît implicitement. Mais le tableau et la thèse mettent dans le même sac :
- (a) l'absence de coordinateur à l'exécution;
- (b) l'absence de plan global.

**Recommandation.** Adopter une typologie explicite, à placer en tête de chaque note de recherche et de chaque visuel :

| | Plan global explicite | Contrôle central à l'exécution | Médium partagé |
|---|---|---|---|
| Orchestration (agent superviseur, orchestrator-worker) | oui | oui | facultatif |
| Chorégraphie (WS-CDL, BPMN, MPST, sagas chorégraphiées) | oui | non | non (messages) |
| Auto-organisation stigmergique (piste, tableau noir sans ordonnanceur) | non | non | oui |
| Auto-organisation par signaux directs (danse, quorum) | non | non | non (local) |

Nommer le « chorégraphe » de chaque côté **[inféré]** : la sélection naturelle règle les paramètres des règles locales chez l'insecte; le concepteur du prompt et de l'outillage les règle chez l'agent. On en tire une question de recherche forte : peut-on réaliser une chorégraphie spécifiée (type global) par des règles stigmergiques locales, et à quel coût ? C'est le problème inverse de la projection.

### C2 — Critique : aucune condition orchestrée, alors que la question empirique est ouverte

**Constat.** Le programme se définit « par opposition à l'orchestration », mais aucune expérience (projet 7 compris) n'inclut d'orchestrateur témoin. La littérature 2025-2026 est partagée.

Résultats favorables à la centralisation :
- Kim et al. (arXiv 2512.08296, déc. 2025, rév. avr. 2026) : 260 configurations, 5 architectures **[lu]**.
  - Amplification d'erreurs : 17,2× (indépendant), 7,8× (décentralisé), 4,4× (centralisé), 5,1× (hybride).
  - Le centralisé domine en finance (+80,8 %); le décentralisé gagne sur BrowseComp-Plus (+9,2 %) et Workbench (+5,6 %).
  - En planification séquentielle, toutes les architectures multi-agents dégradent (jusqu'à −70 %).
- Le système de recherche multi-agent d'Anthropic suit le patron orchestrator-worker. Il consomme environ 15× les jetons d'un clavardage et convient mal aux tâches à contexte partagé ou à forte dépendance **[lu]**.
- Cognition déconseille les multi-agents parallèles : décisions trop dispersées, contexte mal partagé (Yan, 12 juin 2025) **[lu]**.

Résultats favorables à la décentralisation :
- Salemi et al. (arXiv 2510.01285) : un tableau noir où les agents se portent volontaires bat le maître-esclave de 13 à 57 % en succès de bout en bout **[lu]**.
- DeLM (Mao, Mirhoseini, arXiv 2606.10662, juin 2026) : contexte partagé vérifié et file de tâches, sans contrôleur central. Gain jusqu'à +10,5 points sur SWE-bench Verified, coût par tâche réduit d'environ 50 % **[lu]**.

**Recommandation.**
- Ajouter à chaque scénario agentique une **condition orchestrée** (superviseur qui assigne).
- Croiser l'architecture avec la **structure de la tâche** (décomposable contre séquentielle).
- Énoncer des hypothèses réfutables où l'orchestration peut gagner.
- Reformuler « la reine ne commande pas » comme constat biologique, pas comme prescription d'ingénierie.

### C3 — Majeur : pas de traitement de l'irréversibilité (sagas)

**Constat.** Une colonie tolère la perte : une butineuse égarée ne coûte presque rien. Un système agentique chorégraphié qui produit des effets de bord (paiement, écriture) doit les compenser.
- Sagas : Garcia-Molina et Salem (SIGMOD 1987) **[secondaire]**.
- Sagas par chorégraphie ou par orchestration (microservices.io) **[lu]**.
- SagaLLM (arXiv 2503.11951) transpose les sagas aux agents LLM **[lu]**.
- Fowler souligne qu'un flux par notifications d'événements « n'est explicite dans aucun texte de programme », ce qui pose un problème d'observabilité **[lu]**.

**Recommandation.** Ajouter une ligne « réversibilité » au tableau et un mode d'échec « action irréversible sans compensation » au projet 6. C'est l'un des points où l'analogie casse le plus nettement.

### C4 — Mineur : piège terminologique « swarm »

**Constat.** OpenAI Swarm se présente comme une ressource éducative sur l'« orchestration » multi-agent (handoffs), remplacée par l'Agents SDK **[lu]**. Rahman, Schranz et Hayat (arXiv 2506.14496) évaluent les principes d'intelligence en essaim **à l'aide de ce cadre** **[lu]**.

**Recommandation.** Ajouter un glossaire (orchestration, chorégraphie, stigmergie, essaim, quorum, consensus) et signaler les homonymies.

---

## 2. Tableau de correspondance, ligne par ligne

### Synthèse

| Ligne | Verdict | Motif principal |
|---|---|---|
| Canal | À nuancer | Journal d'événements ≠ champ de phéromone; pub/sub ≠ danse (découplages inversés) |
| Contenu du signal | À nuancer | Fourmi pas seulement scalaire; danse analogique plutôt que « symbolique »; messages agentiques aussi structurés |
| Oubli | À nuancer | « TTL vs expiration » est une tautologie; le vrai contraste est côté environnement contre côté émetteur |
| Recrutement | **Abusive** (« délégation ») | Le recrutement est volontaire (pull); la délégation assigne (push), c'est du vocabulaire d'orchestration |
| Freinage | À nuancer; « veto » **abusif** | Fourmis : signal négatif explicite omis; le signal d'arrêt est gradué et cumulatif; la trémulation recrute surtout |
| Décision | À nuancer (homonymie) | Quorum biologique = seuil local, pas quorum d'intersection ni consensus tolérant aux fautes |

### T1 — Canal (à nuancer, majeur)

Ce qui est valide :
- La piste est une stigmergie par marqueurs, quantitative (Theraulaz et Bonabeau, *Artificial Life* 5(2), 1999 **[lu]**; Grassé 1959 **[secondaire]**).
- La danse est un signal direct, localisé sur la piste de danse.

Ce qui est abusif dans la colonne agentique :
- **Un journal d'événements n'est pas un champ de phéromone.** Un journal est en ajout seul, ordonné, rejouable, sans agrégation ni décroissance. Dans les phéromones numériques (Parunak, Brueckner, Sauter, AAMAS 2002), c'est l'environnement qui **agrège, évapore et diffuse** les dépôts **[lu]**. Les meilleurs analogues :
  - un espace de tuples (Linda; Gelernter, TOPLAS 7(1), 1985 **[lu]**) ou un tableau noir (Hearsay-II; Erman et al., *ACM Computing Surveys* 12(2), 1980 **[lu]**), munis d'une décroissance;
  - l'environnement comme abstraction de premier ordre (Weyns, Omicini, Odell, JAAMAS 2007 **[lu]**; artefacts CArtAgO, Ricci et al. 2011 **[lu]**).
- **Le pub/sub n'est pas la danse.** Eugster et al. (ACM CSUR 35(2), 2003) caractérisent le pub/sub par un découplage en temps, en espace et en synchronisation **[lu]**. La piste est découplée en temps et en espace; la danse est couplée en temps (la suiveuse doit être présente) et en espace (la piste de danse) **[inféré]**. L'association de v3 est donc à l'envers. L'analogue de la danse serait plutôt une diffusion locale éphémère, sans rétention, à auditoire auto-sélectionné.
- **La colonne « fourmi » n'est pas une espèce.** La régulation du fourragement chez *Pogonomyrmex* passe par le **taux de contacts antennaires** dans le nid, pas par une piste : l'article précise que l'espèce n'utilise pas de pistes pour recruter (Prabhakar, Dektar, Gordon, *PLoS Comp Biol* 8, 2012) **[lu]**. *Temnothorax* recrute par tandem et transport.
- **Nuance sur les tableaux noirs.** Les architectures classiques comportent un composant de contrôle (ordonnanceur) (Nii 1986 **[secondaire]**). Le système de Salemi et al. conserve un agent central qui affiche les requêtes **[lu]**. La plupart des systèmes LLM dits « décentralisés » sont des hybrides; les classer comme tels.

**Recommandation.** Ajouter une ligne « découplage (temps, espace, synchronisation) » selon Eugster, et nommer l'espèce pour chaque cellule « fourmi ».

### T2 — Contenu du signal (à nuancer, majeur)

**Fourmi, « intensité (scalaire) » : réducteur.**
- Le pharaon (*Monomorium pharaonis*) dépose une phéromone **répulsive** « no entry » sur les branches non récompensées (Robinson et al., *Nature* 438:442, 2005) **[lu]**.
- La géométrie des bifurcations (environ 60°) donne la polarité de la piste (Jackson, Holcombe, Ratnieks, *Nature* 432:907, 2004) **[lu]**.
- Une revue de 2026 décrit la piste comme une composante d'un système de navigation multimodal (Freas, Buehlmann, Spetch, *Learning & Behavior* 54:23) **[lu]**.
- En cas de conflit, l'information privée l'emporte (Cronin, *PLoS One* 2013) **[lu]**.

**Abeille, « symbolique » : surqualifié.**
- La danse code un vecteur de manière analogique : l'angle donne la direction, la durée la distance. Seule la transposition soleil → gravité est conventionnelle **[inféré, sémiotique]**.
- La précision s'acquiert socialement (Dong et al., *Science* 379, 2023) **[lu]**.
- Elle varie avec la taille de l'auditoire (Lin et al., *PNAS* 123, 2026) **[lu]**.
- Les butineuses expérimentées ignorent souvent l'information de la danse au profit de leur mémoire (Kennedy et al., *Mol Ecol* 2021) **[lu]**.

**Agentique, « langage naturel » : partiel.** Les parties d'un message A2A peuvent être du texte, des fichiers ou des données structurées (spécification A2A 1.0) **[lu]**.

**Recommandation.** Remplacer « scalaire / symbolique / langage » par trois axes :
- codage (analogique, discret, compositionnel);
- débit d'information mesuré en bits par signal (à estimer dans les simulations);
- vérifiabilité par le récepteur.

### T3 — Oubli (à nuancer, mineur)

« TTL vs expiration des messages » oppose deux noms de la même chose. Le contraste utile porte sur **qui oublie** :
- **L'environnement** : évaporation continue. Équivalents agentiques : décroissance des poids dans un magasin partagé, ou score de récence exponentiel. Generative Agents utilise un facteur de décroissance de 0,995 par heure de jeu (Park et al., arXiv 2304.03442) **[lu]**.
- **L'émetteur** : attrition des danses, chaque éclaireuse réannonçant de moins en moins (Seeley, BES 53:417-424, 2003, « expiration of dissent » **[méta]**; mécanisme résumé de mémoire). Équivalent : republication à intensité ou fréquence décroissante.
- **Le récepteur** : troncature ou compaction de la fenêtre de contexte **[inféré]**.

Un préprint (Banu, arXiv 2605.15225, 2026, auteur unique) rapporte qu'un signal continu à décroissance temporelle filtre mieux qu'un vote majoritaire quand une partie des agents est compromise **[lu]**. La preuve est faible : à citer comme hypothèse.

### T4 — Recrutement → « Délégation » (abusive, majeur)

La délégation est une assignation poussée par un mandant. C'est le modèle de tâche d'A2A, dont la spécification parle d'agents qui « délèguent des tâches » **[lu]**, et celui de l'orchestrator-worker. Le recrutement biologique est **tiré** : la recrue choisit de suivre, de façon probabiliste, et réévalue elle-même la source.

Analogues corrects :
- annonce plus auto-sélection : agents « volontaires » sur un tableau noir (Salemi et al. **[lu]**), file de tâches partagée (DeLM **[lu]**), consommateurs concurrents, vol de tâches **[inféré]**;
- pour le **tandem**, transfert 1:1 en boucle fermée avec rétroaction bidirectionnelle (Franks et Richardson, *Nature* 439:153, 2006 **[lu]**), soit l'équivalent d'une poignée de main acquittée **[inféré]**.

### T5 — Freinage (à nuancer; « veto » abusif, majeur)

- **Fourmi.** « Absence de retours » vaut pour *Pogonomyrmex*, par le taux de contacts (Prabhakar et al. 2012 **[lu]**). Cela omet le signal négatif explicite (Robinson et al. 2005 **[lu]**).
- **Signal d'arrêt.** Il est **ciblé** : chaque éclaireuse vise les danseuses d'autres sites que le sien (Seeley et al., *Science* 335:108-111, 2012 **[lu]**). Il est aussi **gradué** selon la menace (Tan et al., *PLoS Biol* 2016 **[lu]**). C'est une inhibition croisée cumulative, pas un veto, au sens d'un blocage unilatéral et décisif.
- **Danse de trémulation.** Après une longue attente au déchargement, elle sert surtout à **recruter des receveuses** (Thom, *J Exp Biol* 2003 **[lu]**; Lam et al., *Biol Open* 2017 **[lu]**). Son équivalent agentique est la mise à l'échelle des consommateurs, pas le backpressure sur les producteurs **[inféré]**.
- **Backpressure.** Le signal de demande émis par le consommateur correspond bien au choix entre danse frétillante et trémulation selon le délai de déchargement (projet 4).
- **Analogues d'ingénierie à ajouter.** Limitation de débit, accusés négatifs, disjoncteur (circuit breaker) **[inféré]**, backoff avec gigue (Brooker, AWS, 2015 **[lu]**).

### T6 — Décision → « Consensus sans coordinateur » (à nuancer, majeur)

- **Quorum biologique.** C'est un seuil sur une population perçue localement, à réponse fortement non linéaire et réglable entre vitesse et justesse (Sumpter et Pratt, *Phil Trans B* 364:743, 2009 **[lu]**; Franks et al., *Proc B* 270:2457, 2003 **[lu]**; Pratt et Sumpter, *PNAS* 2006 **[lu]**). Il admet des décisions scindées.
- **Consensus distribué.** Il exige accord, validité et terminaison sous un modèle de fautes. Il est impossible en asynchrone avec une seule panne (Fischer, Lynch, Paterson, JACM 32:374, 1985 **[méta]**). Le « quorum » y désigne des majorités qui s'intersectent.
- **Ponts formels existants, absents de v3** :
  - Ghaffari, Musco, Radeva, Lynch (PODC 2015) : borne inférieure Ω(log n) **[lu]**;
  - Zhao, Lynch, Pratt (*J Comput Biol* 2022) **[lu]**;
  - Feinerman et Korman (2013) **[méta]**;
  - Navlakha et Bar-Joseph (*CACM* 58, 2015) **[méta]**.
- **Inhibition croisée en robotique.** Elle donne des décisions plus rapides et plus robustes qu'un mécanisme de bascule directe (Zakir et al., *Nat Commun* 17, 2026) **[lu]**.

**Recommandation.** Ne jamais écrire « consensus » sans préciser le sens. Pour les agents, parler d'« agrégation à seuil » et la comparer explicitement au vote majoritaire (voir R3).

---

## 3. Où l'analogie casse

| Rupture | Biologie | Agents LLM | Gravité | Preuve |
|---|---|---|---|---|
| **Indépendance et erreurs corrélées** | Les éclaireuses inspectent elles-mêmes le site (List, Elsholtz, Seeley, *Phil Trans B* 2009 : « interplay of independence and interdependence ») | Les modèles s'accordent sur 60 % de leurs erreurs quand les deux se trompent, même d'un fournisseur à l'autre (Kim et al., ICML 2025); conformité (BenchForm, ICLR 2025); le débat induit une martingale, le vote fait l'essentiel du gain (Choi et al., NeurIPS 2025) | Majeur | [lu] |
| **Homogénéité** | Diversité génétique des seuils, d'où la stabilité thermique (Jones et al., *Science* 305:402, 2004) | « Même modèle, même prompt »; la température n'équivaut pas à une diversité de seuils; diversité inter-fournisseurs plus faible qu'on le croit (Kim et al. 2025) | Majeur | [lu] + [inféré] |
| **Coût par individu** | Individu bon marché, redondance massive | Multi-agent ≈ 15× les jetons (Anthropic); essaims LLM ≈ 300× le temps de calcul de leur version classique (Rahman et al.) | Majeur | [lu] |
| **Échelle** | 10² à 10⁶ ouvrières selon l'espèce [non vérifié dans cette session]; le délai d'attente baisse et la qualité de l'information monte avec la taille (Anderson et Ratnieks; Ratnieks et Anderson, *Am Nat* 154, 1999) | Bancs habituels de 2 à 5 agents; performance qui chute avec la taille du réseau jusqu'à 100 (AgentsNet, 2025) | Majeur | [lu] |
| **Apparentement et conflit** | Même les colonies ont besoin de coercition : l'altruisme extrême exige parenté **et** police (Ratnieks et Helanterä, *Phil Trans B* 364:3169, 2009) | Agents de mandants différents (A2A inter-organisations) : ni parenté ni police par défaut | Majeur | [lu] |
| **Adversarialité** | Mimétisme chimique; « substances de propagande » qui poussent les hôtes à s'attaquer entre eux (Regnier et Wilson, *Science* 1971; Allies et al., *J Chem Ecol* 1986) | Injection de prompt qui se propage d'agent en agent (Prompt Infection, arXiv 2410.07283); usurpation de capacités dans A2A (A2ABreak, arXiv 2609.10871) | Majeur | [lu] |
| **Environnement textuel** | Champ physique : localité spatiale, décroissance imposée par la physique, lecture bornée | Texte : aucune localité si on ne l'impose pas, coût de lecture qui croît avec le contenu, tout agent lit tout; même canal pour données et instructions | Majeur | [inféré]; SwarmBench impose la perception locale [lu] |
| **Réversibilité** | Pertes tolérées | Effets de bord à compenser (sagas) | Majeur | [lu] |
| **Rôle de la reine** | La reine n'assigne pas les tâches, mais ses phéromones influent sur la division du travail (revue Gryboś et al., *Molecules* 2025) | L'analogue serait le prompt système partagé : une contrainte diffusée, pas un ordre | Mineur | [lu] + [inféré] |
| **Gain collectif conditionnel** | Les colonies ne battent les individus que sur les tâches difficiles (Sasaki et al., *PNAS* 110, 2013) | Gains multi-agents « souvent minimes » (MAST, Cemri et al. 2025); effet de saturation de la capacité (Kim et al. 2025) | Majeur | [lu] |

**Recommandation transversale.** Ajouter au tableau une ligne « vérification indépendante avant amplification ». C'est le mécanisme qui rend l'essaim juste, et celui qui manque le plus aux agents LLM. DeLM parle justement de contexte partagé « vérifié » **[lu]**.

---

## 4. Protocoles agentiques actuels (absents de v3, majeur)

- **A2A.**
  - v1.0 publiée le 12 mars 2026, première version stable; cartes d'agent signées.
  - Projet de la Linux Foundation depuis juin 2025; accepté à l'Agentic AI Foundation le 27 août 2026 **[lu]**.
  - Modèle client/serveur point à point, agents opaques, cycle de vie des tâches à 8 états, streaming et notifications push. Pas de diffusion ni de pub/sub natifs **[lu]**.
  - A2A sert donc naturellement la délégation et la chorégraphie par paires, pas la stigmergie.
- **MCP.**
  - Version 2026-07-28 : cœur sans état, requêtes multi-allers-retours, tâches déplacées dans une extension **[lu]**.
  - Donné à l'Agentic AI Foundation le 9 décembre 2025 **[lu]**.
  - Modèle hôte/client/serveur pour les outils et le contexte, pas d'agent à agent **[lu]**.

**Recommandation [inféré].** Rendre les deux canaux concrets :
- la **piste** devient un serveur MCP qui expose un champ à décroissance (ressource à lire, outils `deposit` et `sense`), avec perception locale imposée;
- la **danse** devient un message A2A ou un bus sans rétention, à auditoire auto-sélectionné;
- l'**orchestration témoin** devient un client A2A superviseur.

Figer les versions de spécification (A2A 1.0.0, MCP 2026-07-28) dans chaque note de recherche.

## 5. Littérature agentique 2023-2026 à intégrer

- **Échecs et architectures** : MAST, 14 modes d'échec en 3 catégories, plus de 1 600 traces, 7 cadres (Cemri et al., arXiv 2503.13657) **[lu]**; Kim et al. 2025 **[lu]**.
- **Débat et vote** : Du et al. 2023 (le débat améliore la factualité) **[lu]**; Smit et al. 2024 (le débat ne bat pas systématiquement l'auto-cohérence) **[lu]**; Choi et al. 2025 **[lu]**.
- **Conformité et corrélation** : Weng et al. (ICLR 2025) **[lu]**; Kim, Garg, Peng, Garg (ICML 2025) **[lu]**; monoculture (Kleinberg et Raghavan, *PNAS* 118, 2021) **[lu]**.
- **Coordination décentralisée et essaims** :
  - SwarmBench (poursuite, synchronisation, fourragement, flocking, transport, perception locale) **[lu]**;
  - AgentsNet (jusqu'à 100 agents) **[lu]**;
  - Riedl (émergence mesurée par décomposition d'information; les personas et la théorie de l'esprit produisent de la complémentarité) **[lu]**;
  - SwarmWorld (arXiv 2608.26081 : la stigmergie physique suffit; l'innovation se diffuse surtout par observation) **[lu]**;
  - RAPS (pub/sub avec réputation bayésienne, arXiv 2602.08009) **[lu]**.
- **Tableaux noirs et journaux partagés** : Salemi et al. **[lu]**; DeLM **[lu]**; LogAct (arXiv 2604.07988 : actions visibles dans un journal partagé avant exécution, arrêtables par des votants) **[lu]**.
- **Sécurité** : Prompt Infection **[lu]**; A2ABreak **[lu]**.

## 6. Constats par projet (angle chorégraphie-agentique)

| Projet | Gravité | Constat | Recommandation |
|---|---|---|---|
| 1 | Majeur | « État partagé persistant (rigide mais robuste) contre diffusion (adaptable mais bavarde) » : énoncé sans source, et les découplages sont inversés (T1) | Formuler en hypothèse; ajouter un témoin orchestré; mesurer le coût en messages ou en jetons |
| 3 | Majeur | « Des agents identiques oscillent; la diversité stabilise » est affirmé comme un fait | Tester; référence d'ingénierie : gigue (Brooker 2015); contrôler la corrélation des erreurs |
| 4 | Majeur | « Loi de Little; rapprochement non publié » : l'analyse en files d'attente des délais de transfert est publiée (Anderson et Ratnieks 1999; Ratnieks et Anderson 1999, **[lu]**). Je n'ai pas vérifié si la loi de Little elle-même a été appliquée | Retirer « non publié » ou le restreindre à la loi de Little après recherche |
| 4 | Mineur | « Analogue à TCP (Prabhakar et al. 2012) » : le texte intégral ne contient ni « TCP », ni « congestion », ni « Internet » **[lu]**; il parle seulement de réseaux informatiques en général. L'analogie TCP (« Anternet ») viendrait de la couverture de presse **[non vérifié]** | Réattribuer; contrôle de congestion par débit ou par délai comme lecture de l'auteur |
| 5 | Majeur | « Signaux d'arrêt comme veto » : abusif (T5) | « Inhibition croisée graduée et ciblée » |
| 5 | Mineur | « Seeley et Visscher 2004 » est ambigu : BES 56:594-601 (quorum) ou *Apidologie* 35:101-116 **[méta]** | Préciser |
| 6 | Majeur | Prompt injection ≈ mimétisme chimique : le mimétisme usurpe une **identité**, alors que l'injection détourne l'**action** | Mimétisme ↔ usurpation de carte d'agent ou de capacité; propagande ↔ injection; propagation ↔ Prompt Infection |
| 7 | Majeur | « Seul projet sans résultat publié à reproduire » : faux. SwarmBench, AgentsNet et Kim et al. offrent des points de référence | Reproduire d'abord une tâche SwarmBench (fourragement) ou un résultat de Kim et al. |
| 7 | Majeur | La grille Haiku, Sonnet, Opus confond capacité, coût et latence, dans une seule famille (erreurs corrélées) | Ajouter un modèle d'un autre fournisseur et un modèle à poids ouverts; figer les identifiants; normaliser par jetons; témoin orchestré |
| 7 | Majeur | La question transversale confond richesse du signal et capacité de l'agent | Plan factoriel : agents LLM restreints à un canal scalaire, vectoriel ou textuel, et agents à règle simple sur ces mêmes canaux |
| Tous | Majeur | La colonne « fourmi » agrège plusieurs genres (*Linepithema*/*Lasius*, *Pogonomyrmex*, *Temnothorax*, *Pheidole*, fourmis légionnaires) contre une seule espèce d'abeille | Nommer l'espèce par cellule; c'est la condition d'un « au même titre » honnête |

## 7. Tableau révisé proposé

| Mécanisme | Fourmilière (espèce) | Ruche (*A. mellifera*) | Équivalent agentique |
|---|---|---|---|
| Canal | Stigmergie par marqueurs (*Lasius*, *Monomorium*); contacts antennaires (*Pogonomyrmex*); tandem (*Temnothorax*) | Signal direct sur la piste de danse; signaux vibratoires | Environnement actif partagé (tableau noir ou ressource MCP avec décroissance) contre diffusion locale éphémère (A2A ou bus sans rétention) |
| Découplage (Eugster) | Piste : temps et espace découplés | Danse : temps et espace couplés | Magasin persistant contre canal synchrone |
| Codage du signal | Multicomposante (attractif, répulsif, géométrie), modulé par la qualité | Vecteur analogique plus qualité; précision apprise | Texte ou données structurées (A2A Parts); vérifiabilité faible |
| Oubli | Côté environnement (évaporation) | Côté émetteur (attrition) | Décroissance des poids; republication décroissante; compaction de contexte |
| Recrutement | Masse (piste); 1:1 avec rétroaction (tandem) | 1:n, suivi volontaire | Annonce plus volontariat; file de tâches; poignée de main acquittée |
| Freinage | Phéromone répulsive; baisse du taux de contacts | Signal d'arrêt gradué et ciblé; trémulation pour recruter des receveuses | Backpressure côté consommateur; backoff avec gigue; NACK; mise à l'échelle des consommateurs |
| Décision | Seuil de quorum local (*Temnothorax*) | Quorum plus inhibition croisée | Agrégation à seuil contre vote majoritaire contre consensus tolérant aux fautes (à distinguer) |
| Vérification | Information privée prioritaire en cas de conflit | Inspection indépendante du site | Contexte partagé vérifié; vérificateur indépendant |
| Identité | Hydrocarbures cuticulaires; mimétisme | Odeur de colonie | Cartes d'agent signées (A2A 1.0) |
| Réversibilité | Pertes tolérées | Pertes tolérées | Compensations (sagas) |

## 8. Ajouts recommandés au programme

1. **Projet 0, « Typologie »** : visuel interactif sur les trois axes (plan global, contrôle à l'exécution, médium partagé), qui place orchestration, chorégraphie, sagas, tableau noir, piste, danse, A2A et MCP.
2. **Projet « Projection contre émergence »** : spécifier une petite chorégraphie (type global multipartite ou langage chorégraphique) et comparer sa réalisation projetée à une réalisation stigmergique (taux de réussite, messages, robustesse à la perte d'agents).
3. **Témoin orchestré systématique** et facteur « structure de la tâche » dans chaque volet agentique.
4. **Banc « indépendance »** : agents qui lisent ou ne lisent pas les sorties des autres avant de s'engager; mesurer les cascades; comparer quorum à seuil, vote majoritaire et débat.
5. **Implantation par protocoles réels** : champ de phéromone en serveur MCP, danse et orchestration en A2A, versions figées.
6. **Volet sécurité (projet 6)** : propagande, mimétisme et propagation épidémique, rattachés à EscapeBench et LeakLab.
7. **Bibliographie de pont** : Lynch et al., Feinerman et Korman, Navlakha et Bar-Joseph, Marshall et al. 2009 (décision optimale dans les cerveaux et les colonies, *J R Soc Interface* 6:1065 **[lu]**).

## 9. Sources consultées

**Chorégraphie et orchestration**
- W3C WS-CDL 1.0 (CR 2005) : https://www.w3.org/TR/ws-cdl-10/ [lu]
- Peltz 2003, IEEE Computer 36(8) : https://www.bibsonomy.org/bibtex/2a7a11a79fbeddcffc7630b6c23d404b5/neilernst [secondaire]
- Montesi, « Choreography » : https://www.fabriziomontesi.com/bliki/Choreography [lu]; *Introduction to Choreographies* (CUP 2023) : https://www.fabriziomontesi.com/publication/introduction-to-choreographies [lu]
- Honda, Yoshida, Carbone, JACM 2016 : https://dl.acm.org/doi/10.1145/2827695 [lu]
- Carbone et Montesi, POPL 2013 : https://doi.org/10.1145/2429069.2429101 [méta]
- Basu, Bultan, Ouederni, POPL 2012 : https://doi.org/10.1145/2103656.2103680 [méta]
- BPMN 2.0 : https://www.omg.org/spec/BPMN/2.0 [secondaire]
- Sagas : https://dl.acm.org/doi/10.1145/38713.38742 [secondaire]; https://microservices.io/patterns/data/saga.html [lu]
- Fowler 2017 : https://martinfowler.com/articles/201701-event-driven.html [lu]
- Eugster et al. 2003 : https://dl.acm.org/doi/10.1145/857076.857078 [lu, résumé]

**Stigmergie, environnement et tableaux noirs**
- Theraulaz et Bonabeau 1999 : https://direct.mit.edu/artl/issue/5/2 [lu, résumé]
- Heylighen 2016 : https://pespmc1.vub.ac.be/Papers/StigmergyICognSystems.pdf [lu, résumé]
- Parunak et al. 2002 : https://dl.acm.org/doi/10.1145/544741.544843 [lu, résumé]
- Weyns et al. 2007 : https://consensus.app/papers/details/503d22c7221c5b90977ea04c4f087431/ [lu]
- Ricci et al. 2011 : https://consensus.app/papers/details/b4cf751d01b65cf2aaaaae01ae0481fa/ [lu]
- Hearsay-II : https://mas.cs.umass.edu/Documents/Erman_Hearsay80.pdf [lu, résumé]
- Nii 1986 : https://dl.acm.org/doi/10.1609/aimag.v7i2.537 [secondaire]
- Linda : https://www.semanticscholar.org/paper/Generative-communication-in-Linda-Gelernter/9c1201d36d70672a80659a169fd17035574c0b50 [lu, résumé]

**Protocoles**
- Spécification A2A : https://a2a-protocol.org/latest/specification/ [lu]
- Blogue A2A 2026 : https://a2a-protocol.org/latest/blog/archive/2026/ [lu]
- Linux Foundation, avril 2026 : https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations-lands-in-major-cloud-platforms-and-sees-enterprise-production-use-in-first-year [lu]
- MCP 2026-07-28 : https://blog.modelcontextprotocol.io/posts/2026-07-28/ [lu]
- MCP et AAIF : https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ [secondaire]
- A2ABreak : https://arxiv.org/abs/2609.10871 [lu]
- Panorama des protocoles : https://arxiv.org/abs/2504.16736 [lu]

**Agents LLM**
- Kim et al. 2025 : https://arxiv.org/abs/2512.08296 et https://arxiv.org/html/2512.08296 [lu]
- MAST : https://arxiv.org/abs/2503.13657 [lu]
- Anthropic : https://www.anthropic.com/engineering/multi-agent-research-system [lu]
- Cognition : https://cognition.com/blog/dont-build-multi-agents [lu]
- Salemi et al. : https://arxiv.org/abs/2510.01285 [lu]
- DeLM : https://arxiv.org/abs/2606.10662 [lu]
- LogAct : https://arxiv.org/abs/2604.07988 [lu]
- SagaLLM : https://arxiv.org/abs/2503.11951 [lu]
- Erreurs corrélées : https://arxiv.org/abs/2506.07962 [lu]
- BenchForm : https://arxiv.org/abs/2501.13381 [lu]
- Debate or Vote : https://arxiv.org/abs/2508.17536 [lu]
- MAD : https://arxiv.org/abs/2311.17371 [lu]
- Du et al. : https://arxiv.org/abs/2305.14325 [lu]
- Prompt Infection : https://arxiv.org/abs/2410.07283 [lu]
- SwarmBench : https://arxiv.org/abs/2505.04364 [lu]
- AgentsNet : https://arxiv.org/abs/2507.08616 [lu]
- Riedl : https://arxiv.org/abs/2510.05174 [lu]
- SwarmWorld : https://arxiv.org/abs/2608.26081 [lu]
- RAPS : https://arxiv.org/abs/2602.08009 [lu]
- LLM-Powered Swarms : https://arxiv.org/abs/2506.14496 [lu]
- Banu 2026 : https://arxiv.org/abs/2605.15225 [lu]
- Generative Agents : https://ar5iv.labs.arxiv.org/html/2304.03442 [lu]
- OpenAI Swarm : https://github.com/openai/swarm [lu]
- Brooker 2015 : https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ [lu]
- Kleinberg et Raghavan 2021 : https://doi.org/10.1073/pnas.2018340118 [lu, résumé]

**Biologie (lignes du tableau)** — résumés lus via Europe PMC (https://www.ebi.ac.uk/europepmc/), sauf mention :
- Seeley et al. 2012 : https://doi.org/10.1126/science.1210361 [lu]
- Robinson et al. 2005 : https://doi.org/10.1038/438442a [lu]
- Jackson et al. 2004 : https://doi.org/10.1038/nature03105 [lu]
- Freas et al. 2026 : https://doi.org/10.3758/s13420-025-00697-w [lu]
- Cronin 2013 : https://doi.org/10.1371/journal.pone.0064668 [lu]
- Kennedy et al. 2021 : https://doi.org/10.1111/mec.15893 [lu]
- Dong et al. 2023 : https://doi.org/10.1126/science.ade1702 [lu]
- Lin et al. 2026 : https://doi.org/10.1073/pnas.2518687123 [lu]
- Prabhakar et al. 2012 : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 [lu, texte intégral PMC3426560]
- Thom 2003 : https://doi.org/10.1242/jeb.00398 [lu]
- Lam et al. 2017 : https://doi.org/10.1242/bio.025445 [lu]
- Tan et al. 2016 : https://doi.org/10.1371/journal.pbio.1002423 [lu]
- Anderson et Ratnieks 1999 : https://doi.org/10.1086/303255 [lu]
- Ratnieks et Anderson 1999 : https://doi.org/10.1086/303256 [lu]
- Franks et al. 2002 : https://doi.org/10.1098/rstb.2002.1066 [lu]
- Franks et al. 2003 : https://doi.org/10.1098/rspb.2003.2527 [lu]
- Sumpter et Pratt 2009 : https://doi.org/10.1098/rstb.2008.0204 [lu]
- Pratt et Sumpter 2006 : https://doi.org/10.1073/pnas.0604801103 [lu]
- Sasaki et al. 2013 : https://doi.org/10.1073/pnas.1304917110 [lu]
- List et al. 2009 : https://doi.org/10.1098/rstb.2008.0277 [lu]
- Marshall et al. 2009 : https://doi.org/10.1098/rsif.2008.0511 [lu]
- Jones et al. 2004 : https://doi.org/10.1126/science.1096340 [lu]
- Franks et Richardson 2006 : https://doi.org/10.1038/439153a [lu]
- Regnier et Wilson 1971 : https://doi.org/10.1126/science.172.3980.267 [lu]
- Allies et al. 1986 : https://doi.org/10.1007/bf01012348 [lu]
- Ratnieks et Helanterä 2009 : https://doi.org/10.1098/rstb.2009.0129 [lu]
- Gryboś et al. 2025 : https://doi.org/10.3390/molecules30112369 [lu]
- Zakir et al. 2026 : https://doi.org/10.1038/s41467-026-76408-4 [lu]
- Ghaffari et al. 2015 : https://arxiv.org/abs/1505.03799 [lu]
- Zhao, Lynch, Pratt 2022 : https://doi.org/10.1089/cmb.2021.0369 [lu]
- Seeley 2003 : https://doi.org/10.1007/s00265-003-0598-z [méta]
- Seeley et Visscher 2004 (BES) : https://doi.org/10.1007/s00265-004-0814-5 [méta]
- Seeley et Visscher 2004 (*Apidologie*) : https://doi.org/10.1051/apido:2004004 [méta]
- Seeley 1992 (trémulation) : https://doi.org/10.1007/bf00170604 [méta]
- FLP 1985 : https://doi.org/10.1145/3149.214121 [méta]
- Feinerman et Korman 2013 : https://doi.org/10.1007/978-3-642-36071-8_1 [méta]
- Navlakha et Bar-Joseph 2015 : https://doi.org/10.1145/2678280 [méta]

**Non vérifié dans cette session** : origine de l'analogie TCP (« Anternet », presse de Stanford, 2012); usage publié de la loi de Little pour la ruche; tailles de colonies chiffrées; contenu détaillé de Seeley 2003 et de Seeley et Visscher 2004; les « cinq habitudes » de *Honeybee Democracy* (non citées pour cette raison).

# Dossier x-choregraphie — Cadre théorique transversal

Chorégraphie vs orchestration, stigmergie, tableaux noirs, auto-organisation, cognition individuelle vs collective, et correspondance fourmi / abeille / agentique.

Date : 2026-10-01. Portée : cadre théorique commun aux sept projets de la proposition v3.

**Statut :** consolidé après vérification indépendante, 2026-10-01. Les corrections du rapport `recherche/verifications/x-choregraphie.md` sont appliquées en place (voir « Historique de vérification », section 12). Les références sont désignées par leur étiquette normalisée « Nom année » (liste complète en section 11).

## 0. Méthode et légende

Chaque affirmation porte un statut :

- **[L]** lu dans la source primaire (texte intégral ou passage cité, emplacement donné);
- **[R]** résumé, métadonnées ou page éditeur seulement : le contenu détaillé n'a pas été lu;
- **[NV]** non vérifié (mémoire ou source secondaire), à confirmer avant usage;
- **[I]** inférence ou construction de l'auteur du dossier, pas d'une source.

Une valeur que la vérification indépendante n'a pas confirmée porte « [à confirmer] »; une référence non vérifiable porte « [non vérifiée] » là où elle est citée.

Accès : textes intégraux lus pour Garcia-Molina et Salem 1987 (scan Cornell), OMG 2013 (BPMN 2.0.2, PDF OMG), Heylighen 2016a et Heylighen 2016b (prépublications VUB), Nii 1986 partie 1 (scan AAAI, pages rendues en image), Feinerman et Korman 2017 (arXiv), Couzin 2009 (copie d'auteur, ICTS), Marshall et al. 2009 (version en ligne anticipée, pages 1-8, équations vérifiées visuellement). Les autres références : résumé (Semantic Scholar, OpenAlex, Europe PMC, arXiv) ou métadonnées seulement. IEEE, ACM, MIT Press et Royal Society ont bloqué l'accès direct (403). Les quotas de WebSearch et de l'outil Consensus ont été épuisés en cours de travail (Consensus : 30 recherches/mois, renouvellement le 1er novembre); le reste a été vérifié par WebFetch sur les API Crossref, OpenAlex, Semantic Scholar, Europe PMC et arXiv.

## 1. Synthèse

1. La v3 utilise « chorégraphie » au sens large (coordination sans coordinateur central) sans distinguer deux objets que la littérature sépare nettement : la **chorégraphie spécifiée** de l'informatique (une description globale écrite d'avance, d'où l'on dérive ou vérifie les comportements locaux : WS-CDL, BPMN, types de session multipartites, programmation chorégraphique) et la **chorégraphie émergente** des insectes sociaux (aucune description globale n'existe nulle part; le motif global naît d'interactions locales, souvent stigmergiques). C'est le principal risque conceptuel du programme, et la section 2 en donne des définitions opérationnelles.
2. Montesi formule lui-même le pont : les chorégraphies « peuvent être vues comme des descriptions de comportements émergents désirés » (Montesi 2023, résumé du ch. 4) [R]. La chorégraphie spécifiée *prescrit* une émergence; la chorégraphie émergente *n'en prescrit aucune*.
3. Le tableau noir (Nii 1986) est la charnière : le *modèle* est stigmergique (« la communication et l'interaction entre sources de connaissance passent uniquement par le tableau noir », p. 39) [L], mais le *cadre* opérationnel ajoute des modules de contrôle qui choisissent le « focus d'attention » (p. 44) [L], donc une orchestration de l'activation. Les systèmes LLM « tableau noir » de 2025 reprennent ce compromis (Han et Zhang 2025; Salemi et al. 2025) [R].
4. Côté biologie, Feinerman et Korman 2017 [L] placent la cognition collective sur un spectre allant de l'*amplification de la cognition individuelle* jusqu'à l'*émergence*, et font l'hypothèse que les mécanismes fondés sur l'individu dominent parce que les individus sont déjà cognitivement capables. Pour des agents LLM, très capables individuellement, cette hypothèse prédit (inférence [I]) que la valeur collective viendra surtout de l'amplification, du vote et du filtrage, plus que d'une émergence au sens fort.
5. Marshall et al. 2009 [L] fournissent le seul cadre formel commun neurones / fourmis / abeilles du périmètre : quatre modèles à équations différentielles stochastiques, dont un seul (abeille, « direct switching », sans décroissance, k = 0) converge vers le modèle de diffusion statistiquement optimal. Ils fournissent deux résultats cibles reproductibles (§5).
6. La sagesse des foules suppose des erreurs indépendantes (Couzin 2009, p. 39) [L]. Or les LLM ont des erreurs fortement corrélées (Kim et al. 2025 : accord de 60 % quand deux modèles se trompent) [R]; un jury de 9 LLM vaut environ 2 votes indépendants (Kohli 2026) [R]. C'est la limite centrale de toute transposition « quorum d'insectes → quorum d'agents ».
7. Plusieurs affirmations de la v3 sont à corriger (§9) : « Délégation » comme analogue du recrutement (c'est de l'orchestration), « veto » pour le signal d'arrêt (c'est une inhibition probabiliste), l'asymétrie « quorum seul chez la fourmi / quorum + inhibition croisée chez l'abeille » (Marshall et al. 2009 montrent un basculement par recrutement chez *Temnothorax* aussi), le signal de fourmi réduit à un scalaire (plusieurs phéromones de volatilités différentes, Couzin 2009 p. 41), et le projet 7 présenté comme « sans résultat publié » (il existe désormais des références LLM : Pal et al. 2026 [SwarmWorld], Han et Zhang 2025 et Salemi et al. 2025 [tableaux noirs LLM], Gopinathan et al. 2026 [Pact]).

## 2. Définitions

### 2.1 Socle documenté

- **Orchestration (BPMN)** : un processus standard, ou « Orchestration Process », définit le flux d'activités d'une entité partenaire précise; la chorégraphie, elle, formalise la façon dont les participants coordonnent leurs interactions (OMG 2013, §11.1, p. 315) [L].
- **Chorégraphie (BPMN)** : « contrat procédural » entre participants; contrairement à un processus, « il n'y a ni contrôleur central, ni entité responsable, ni observateur » (OMG 2013, §7.2.1, p. 23, et glossaire) [L]. Aucune donnée centrale : les seules données utilisables dans une passerelle sont celles transmises par un message (OMG 2013, §11.3) [L].
- **Chorégraphie (WS-CDL)** : décrit des collaborations pair-à-pair « d'un point de vue global », par leur comportement observable commun et complémentaire (Kavantzas et al. 2005, §1); WS-CDL « n'est pas un langage exécutable de description de processus » (§1.5) [L, via WebFetch]. Statut : Candidate Recommendation du 9 novembre 2005, jamais promue Recommendation; groupe de travail fermé le 10 juillet 2009 [L].
- **Chorégraphie (Montesi)** : description d'un système distribué où le développeur donne une vue globale des échanges de messages entre nœuds, au lieu de définir séparément chaque nœud (Montesi 2013, résumé) [R]; la projection (*endpoint projection*, EPP) traduit la chorégraphie en processus locaux dont la correspondance avec la source est prouvée (Montesi 2023, ch. 4, p. 76-90) [R]; *deadlock-freedom-by-design* (Carbone et Montesi 2013) [R].
- **Type global (MPST)** : un type global est un accord partagé entre pairs, projeté sur chacun pour la vérification de types; propriétés établies : sûreté de communication, progrès, fidélité de session (Honda et al. 2008, résumé) [R]. Les preuves de sûreté de la théorie classique avaient des failles, corrigées par Scalas et Yoshida 2019 [R].
- **Stigmergie (Heylighen)** : « mécanisme indirect et médié de coordination entre actions, dans lequel la trace d'une action laissée sur un médium stimule l'exécution d'une action subséquente » (Heylighen 2016a, §2, p. 6) [L]. Stimulation formalisée par P(action | condition) > P(action) (§2, p. 7) [L]. Composantes : action, agent, médium, trace, coordination (§3) [L].
- **Auto-organisation (Camazine et al.)** : le motif global émerge uniquement des interactions entre composants de bas niveau, qui n'utilisent que de l'information locale (Camazine et al. 2001, page éditeur Princeton) [R].

### 2.2 Trois régimes de coordination [I, construit sur les sources ci-dessus]

Soit un système S = (A, M, R) : un ensemble d'agents A, un ensemble de canaux ou médiums M (messages adressés, diffusion, traces persistantes), et des règles locales R = {r_a}, où r_a fait passer l'agent a d'une observation locale à une action. On note Tr(S) l'ensemble des traces d'exécution.

**Définition 1 — Orchestration.** S est orchestré s'il existe un agent o ∈ A tel que (i) o détient une représentation explicite du plan global P, (ii) toute action d'un agent a ≠ o qui fait progresser P est déclenchée par un message adressé émis par o, ou s'y rattache causalement, et (iii) o observe l'état d'avancement de P. Exemple : saga avec composant d'exécution central (SEC, Garcia-Molina et Salem 1987, §3-6) [L]; système de recherche d'Anthropic à agent principal et sous-agents (Hadfield et al. 2025) [L via WebFetch].

**Définition 2 — Chorégraphie spécifiée.** S est une chorégraphie spécifiée s'il existe un artefact global G (chorégraphie, type global, diagramme de chorégraphie BPMN) tel que :
- (i) G existe avant l'exécution et hors de tout agent : aucun participant ne l'exécute comme chef d'orchestre (OMG 2013 : « pas de contrôleur central »);
- (ii) chaque règle locale r_a est obtenue par projection, r_a = proj(G, a), ou vérifiée conforme à proj(G, a);
- (iii) la correction est logique : un théorème relie Tr(S) aux traces de G (correspondance d'EPP, absence d'interblocage par construction);
- (iv) G satisfait une condition de réalisabilité locale, par exemple la règle BPMN selon laquelle l'initiateur d'une activité de chorégraphie doit avoir participé à l'activité précédente (OMG 2013, §11.5.6, p. 335) [L].

**Définition 3 — Chorégraphie émergente.** S est une chorégraphie émergente si :
- (i) aucun artefact global prescriptif n'existe, ni dans un agent, ni dans le médium, ni chez le concepteur sous une forme projetable : le motif global n'est défini que par un observateur, comme attracteur ou statistique de Tr(S);
- (ii) les règles r_a ne lisent que de l'information locale (Camazine et al. 2001), souvent une trace dans un médium partagé, avec P(action | trace) > P(action) (Heylighen 2016a);
- (iii) la correction est statistique et dynamique : probabilité d'un bon résultat, temps de décision, robustesse aux perturbations, et jamais garantie par construction.

**Définition 4 — Régimes hybrides** (les plus fréquents en pratique) :
- **Tableau noir contrôlé** : médium stigmergique et modules de contrôle qui choisissent le focus d'attention (Nii 1986, p. 44) [L]. Orchestration de l'activation sur une coordination stigmergique des contenus.
- **Annonce et auto-sélection** : un agent central publie une demande sur un médium partagé, et des agents autonomes se portent volontaires selon leurs capacités (Salemi et al. 2025) [R]. Le but est orchestré, l'affectation chorégraphiée. C'est l'analogue le plus proche du recrutement par danse : la danseuse ne désigne aucune suiveuse [I].
- **Amplification individuelle** (Feinerman et Korman 2017) [L] : un individu informé propose une solution, le groupe l'amplifie, la vérifie ou la filtre (piste de recrutement renforcée seulement si la source est jugée rentable au retour). Aucun plan global, mais un contenu global porté par un individu.

### 2.3 Critères opérationnels de classement en simulation [I]

Ces indicateurs permettent de classer chaque scénario simulé (fourmi, abeille, agents LLM) sur le spectre de la section 2.2, à partir des journaux d'exécution.

| Indicateur | Définition mesurable | Orchestration | Chor. spécifiée | Chor. émergente |
|---|---|---|---|---|
| C_ctrl (centralité de contrôle) | max_a part des actions déclenchées par un message adressé de a | ≈ 1 pour o | < 1/2, répartie selon G | ≈ 0 (aucun message adressé dominant) |
| C_spec (spécification) | existence d'un G vérifié à l'exécution; taux de conformité des traces à G | plan dans o | G externe, conformité 100 % attendue | pas de G |
| C_med (médiation) | part des interactions passant par un médium (écriture puis lecture d'une trace) plutôt que par un message adressé | faible | faible (messages) | élevée |
| C_stig (stimulation) | rapport P(action \| trace) / P(action), estimé avec intervalle de confiance | — | — | > 1 significatif |
| C_mem (persistance) | demi-vie des traces / durée caractéristique de la tâche | — | — | < 1 : transitoire; > 1 : persistant (Heylighen 2016b, §4) |
| C_amp (amplification) | part des issues collectives identiques à la proposition initiale d'un seul individu | — | — | élevée : amplification; faible : émergence forte (Feinerman et Korman 2017) |

## 3. Fiches de concepts par source

### 3.1 Chorégraphie et orchestration en génie logiciel

- **Peltz 2003** [R] : seul le début du résumé est lisible (OpenAlex). Combiner des services Web en processus inter-organisationnels exige des standards pour modéliser les interactions. Les définitions qu'on lui attribue habituellement (orchestration = contrôle du point de vue d'une seule partie; chorégraphie = suivi des séquences de messages entre plusieurs parties) n'ont **pas** été lues dans le texte [NV]. Avant de citer Peltz 2003 pour une définition, lire l'article (IEEE Computer 36(10):46-52).
- **OMG 2013 (BPMN 2.0.2)** [L] : section 11 (p. 315-365). Points utiles :
  - absence de données centrales (§11.3);
  - règle de séquencement : l'initiateur d'une activité de chorégraphie doit avoir été impliqué dans l'activité précédente, faute de quoi un participant devrait « deviner » quand c'est son tour (§11.5.6, p. 335-336). C'est une condition de réalisabilité;
  - les passerelles exclusives à conditions en langue naturelle donnent des chorégraphies « sous-spécifiées et non exécutoires » : il faut des expressions formelles (§11.7.1, p. 344). Utile pour les agents LLM, dont les conditions sont précisément en langue naturelle [I];
  - « La compensation est gérée à l'intérieur d'un seul participant (un processus d'orchestration) » (tableau 11.6, p. 340);
  - un événement Signal n'a pas de destinataire précis et tous les participants doivent pouvoir le voir (tableau 11.6). C'est l'analogue BPMN le plus proche d'une diffusion de type phéromone d'alarme [I].
- **Kavantzas et al. 2005 (WS-CDL)** [L partiel] : voir §2.1.

### 3.2 Programmation chorégraphique et types de session

- **Montesi 2013** (thèse, ITU Copenhague, ISBN 9788779492998) [R] : modèle formel avec asynchronie et mobilité, Linear Connection Logic, prototype Chor compilant vers Jolie.
- **Carbone et Montesi 2013** (POPL, p. 263-274) [R] : modèle de programmation purement global, système de types vérifiant les chorégraphies contre des spécifications de protocole fondées sur les sessions multipartites, EPP vers le π-calcul, absence d'interblocage par construction.
- **Montesi 2023** (Cambridge UP, 244 p., DOI 10.1017/9781108981491) [R] : manuel. Les chorégraphies apportent des propriétés de sûreté et de vivacité; ch. 4 sur l'EPP.
- **Choral** (Giallorenzo et al. 2024, TOPLAS 46(1), p. 1-59) [R] : premier langage chorégraphique fondé sur des abstractions courantes (objets Java), avec des données distribuées sur des rôles; le compilateur produit une bibliothèque Java par rôle.
- **Honda et al. 2008 / Honda et al. 2016** [R] : voir §2.1. Honda et al. 2008 : POPL '08, p. 273-284. La version longue (Honda et al. 2016) est parue dans JACM 63(1), p. 1-67 (2016); son numéro d'article n'a pas pu être vérifié (voir §12). **Scalas et Yoshida 2019** [R] : corrige des « preuves de sûreté de types erronées » de la théorie classique; à citer avec Honda et al. 2008 pour tout argument de rigueur. Leur théorie se passe des types globaux (vérification indépendante), ce qui est utile pour M3.
- **Pact** (Gopinathan et al. 2026, arXiv 2605.03143) [R] : la programmation chorégraphique suppose des participants coopératifs; Pact y ajoute des choix et des préférences d'agents, chaque protocole correspondant à un jeu formel. Source : résumé d'une présentation (« In this talk »), avec une implémentation préliminaire; à citer comme telle. C'est le pont direct entre chorégraphie spécifiée et agents LLM intéressés.

### 3.3 Sagas et architectures événementielles

- **Garcia-Molina et Salem 1987** [L] : garantie formelle en §1 (voir M2). Point critique : faute de place, les auteurs ne traitent que le cas d'un système centralisé, tout en notant qu'une mise en œuvre dans un SGBD réparti est clairement possible (§1) : la restriction est éditoriale, pas conceptuelle. Le texte décrit un composant d'exécution des sagas (SEC) au sein du SGBD (§3-6). Les sagas d'origine sont donc **décrites en mode orchestré**, sans que les auteurs les y limitent. La « saga chorégraphiée » vient plus tard, du monde des microservices.
- **Richardson s.d.** [L] : une saga est une suite de transactions locales. Deux coordinations : en chorégraphie, chaque transaction publie des événements qui déclenchent les suivantes; en orchestration, un orchestrateur dit aux participants quoi exécuter. Inconvénients : compensations à écrire à la main, pas d'isolation.
- **Fowler 2017** [L] : quatre motifs (notification d'événement, transfert d'état porté par l'événement, event sourcing, CQRS). Avertissement : le flux d'une notification d'événements « n'est explicite dans aucun texte de programme », d'où la perte de vue du processus global. C'est la face cachée de la chorégraphie émergente en logiciel [I].

### 3.4 Stigmergie

- **Grassé 1959** [R : métadonnées seulement; texte en français non lu] : *Insectes Sociaux* 6(1):41-80. La formule anglaise « stimulation des ouvriers par les performances mêmes qu'ils ont accomplies » est citée par Heylighen 2016a (p. 6), donc de seconde main.
- **Theraulaz et Bonabeau 1999** [R, résumé Europe PMC] : la stigmergie explique le paradoxe selon lequel des individus travaillent comme s'ils étaient seuls alors que leurs activités collectives semblent coordonnées. L'article distingue stigmergie quantitative et qualitative.
- **Heylighen 2016a** [L] :
  - stigmergie sans besoin de planification, de mémoire, de communication, de conscience mutuelle, de présence simultanée, d'engagement ni de contrôle centralisé (§5);
  - limite reconnue : aucune garantie d'usage optimal de la main-d'œuvre (§5);
  - la stigmergie n'exige pas d'agent : une réaction chimique suffit (§2).
- **Heylighen 2016b** [L] : quatre axes continus.
  - individuelle vs collective (§2);
  - sématectonique (le travail lui-même stimule) vs à marqueurs (signal produit exprès, comme une phéromone) (§3);
  - transitoire vs persistante : une trace persistante permet une stigmergie *asynchrone*, une trace transitoire une stigmergie *synchrone* (§4);
  - quantitative vs qualitative (§5).
  
  Le taux d'« oubli » optimal dépend de la vitesse d'obsolescence de l'information (§4).
- **Parunak 1997, Parunak 2006** [R : métadonnées et résumé automatique seulement] : principes d'ingénierie tirés des systèmes multi-agents naturels (1997); schéma d'analyse de la stigmergie humaine (2006). Heylighen 2016b (§3, seconde main) attribue le terme « sématectonique » à Wilson 1975 [non vérifiée] et seulement le terme « stigmergie à marqueurs » (*marker-based*) à Parunak 2006 : ce n'est pas toute la distinction. La liste des principes de « Go to the ant » n'a pas été lue [NV].

### 3.5 Tableaux noirs

- **Erman et al. 1980** [R] : Hearsay-II est à la fois une solution et « un cadre général pour coordonner des processus indépendants », avec un mécanisme de *focus-of-control* qui identifie les actions de plus grande valeur (résumé).
- **Nii 1986, partie 1** [L] :
  - trois composantes : sources de connaissance indépendantes, structure de données « tableau noir », contrôle (p. 39);
  - légende de la fig. 1 : « il n'y a pas de flux de contrôle; les sources de connaissance s'activent elles-mêmes »;
  - note 6 : le modèle ne spécifie aucune composante de contrôle, dont le lieu peut être dans les sources, sur le tableau, dans un module séparé, ou une combinaison;
  - cadre opérationnel (p. 43-44) : seules les sources modifient le tableau, et des modules de contrôle choisissent le focus d'attention selon un cycle en quatre étapes (voir M4).

### 3.6 Auto-organisation et intelligence en essaim

- **Camazine et al. 2001** [R] : voir §2.1. Six auteurs, Princeton Studies in Complexity, 562 p.
- **Bonabeau et al. 1999** [R : métadonnées Crossref] : OUP, DOI 10.1093/oso/9780195131581.001.0001. Contenu non lu.

### 3.7 Cognition individuelle vs collective

- **Feinerman et Korman 2017** [L] :
  - signaux classés par localité : locaux en espace et en temps (contact), locaux en temps seulement (phéromone d'alarme volatile), locaux en espace seulement (stigmergie);
  - réseaux d'interaction quasi bien mélangés et anonymes à long terme, structurés en grappes spatiales;
  - catégories d'exemples : amplification inconditionnelle (alarme), conditionnée (piste renforcée seulement au retour d'une source rentable), à régulation précoce (fourmis du désert), sondage par quorum (déménagement des fourmis et des abeilles), amplification en contexte dynamique (transport coopératif de *Paratrechina longicornis* : un meneur informé tire environ 10 s puis perd l'orientation), auto-organisation sans plan (construction du nid);
  - hypothèse : les mécanismes fondés sur l'individu prédominent; les solutions distribuées qui les surpassent seraient complexes et difficiles à faire évoluer;
  - contraintes sur l'émergence : mobilité, anonymat, bruit de communication; la diffusion de rumeurs devient difficile dans ces conditions.
- **Couzin 2009** [L] :
  - contrôle distribué, robustesse, multistabilité, hystérésis (« mémoire collective »);
  - rétroactions positive et négative, cascades informationnelles;
  - sagesse des foules valide seulement si chacun accède à la même information bruitée (p. 39);
  - plusieurs phéromones de volatilités différentes servent de « mémoire de travail » et d'« attention sélective » (p. 41);
  - *Temnothorax* : colonies de 50 à 200 individus, environ 30 % d'éclaireuses, transport environ 3 fois plus rapide que le tandem après le quorum, abaissement du quorum en urgence;
  - abeilles : durée de danse proportionnelle à la qualité perçue, taux de décroissance constant de la danse, quorum au site (p. 41);
  - encadré 2 : rythme d'activité spontané d'environ 20 min chez la fourmi, 70 % du temps inactif;
  - encadré 3 : les rétroactions peuvent être codées *explicitement* dans les règles individuelles et/ou *émerger* des interactions. Cette question ouverte recoupe exactement la distinction spécifiée / émergente.
- **Marshall et al. 2009** [L] : voir M5-M8 et les cibles T1-T4. Discussion (§8) : le signal d'arrêt inhibe les danses frétillantes (Nieh 1993 [non vérifiée], cité) et pourrait jouer le rôle de l'inhibition du modèle neuronal (Visscher 2007 [non vérifiée], cité); l'inhibition suivie d'un recrutement équivaut fonctionnellement à un basculement direct. Chez *T. albipennis*, 14 % des changements d'engagement du mauvais vers le bon nid passent par un recrutement, contre 3,8 % dans l'autre sens (réanalyse de Pratt et al. 2002). Chez l'abeille, la décision est séparée de son exécution (vol de l'essaim); chez la fourmi, les deux sont intriquées.

### 3.8 Superorganisme

- **Hölldobler et Wilson 2009** [R : métadonnées OpenLibrary (Norton, ISBN 9780393067040) et existence de comptes rendus de 2009] : définition du superorganisme non lue [NV]. Feinerman et Korman 2017 (intro) et Couzin 2009 (p. 40) l'emploient comme cadre [L].

## 4. Modèles et équations

### M1 — Stigmergie (Heylighen 2016a, §2, p. 7) [L]

Règle de production `condition → action`; stimulation : P(action | condition) > P(action). Une inhibition se ramène à la stimulation par la négation de la condition. Usage en simulation : estimer le rapport C_stig de §2.3.

### M2 — Garantie d'une saga (Garcia-Molina et Salem 1987, §1) [L]

Saga T1, T2, …, Tn; compensations C1, …, C(n−1). Le système garantit l'exécution de l'une des deux suites :

- `T1, T2, …, Tn` (la préférable);
- `T1, T2, …, Tj, Cj, …, C2, C1` pour un certain j avec 0 ≤ j < n.

Le scan rend la borne de j peu lisible (« 0 < J < 12~111 »). Elle est lue comme 0 ≤ j < n [à confirmer]. Les autres transactions peuvent voir les effets partiels; une compensation n'avertit pas les transactions qui ont lu les résultats de Tj. Reprise arrière (§4), reprise avant avec points de sauvegarde (§5), et combinaison arrière/avant (« backward/forward recovery ») après panne.

### M3 — Réalisabilité d'une chorégraphie (OMG 2013, §11.5.6) [L] et projection (MPST) [R + I]

Règle BPMN : pour deux activités consécutives A_k → A_(k+1), on exige initiateur(A_(k+1)) ∈ {initiateur(A_k), récepteur(A_k)}. Projection MPST, en esquisse [I] : un type global G = p→q : ℓ(T). G′ se projette sur p en envoi `q!ℓ(T).proj(G′, p)`, sur q en réception `p?ℓ(T).proj(G′, q)`, et sur tout autre rôle r en `proj(G′, r)`. Les branchements ne sont projetables que si les rôles non impliqués ont des projections fusionnables. Les définitions exactes sont à prendre dans Honda et al. 2016 (JACM) et Scalas et Yoshida 2019, non lus.

### M4 — Cycle de contrôle d'un tableau noir (Nii 1986, p. 44) [L]

1. Une source de connaissance modifie des objets du tableau, et l'on enregistre ces changements dans une structure de contrôle globale.
2. Chaque source indique la contribution qu'elle peut apporter au nouvel état.
3. Un module de contrôle choisit un focus d'attention.
4. Selon le focus (une source, un objet, ou les deux), le contrôle prépare l'exécution : ordonnancement par source ou par événement.

L'arrêt est décidé par une source, quand une solution est acceptable ou que les connaissances sont épuisées.

### M5 — Usher-McClelland (Usher et McClelland 2001 [non vérifiée]; Marshall et al. 2009, §4, éq. 4.1-4.2) [L]

```
dy1/dt = I1 + c·η1 − k·y1 − w·y2
dy2/dt = I2 + c·η2 − k·y2 − w·y1                                   (4.1)
x1 = (y1 − y2)/√2 ,  x2 = (y1 + y2)/√2
dx1/dt = (w − k)·x1 + (I1 − I2)/√2 + c·η1′
dx2/dt = (−k − w)·x2 + (I1 + I2)/√2 + c·η2′ ,  c·η1′ = (c·η1 − c·η2)/√2   (4.2)
```

y_i : activité de la population i; I_i : force du signal d'entrée; η_i : processus de Wiener (moyenne 0, écart-type proportionnel à c); w : inhibition; k : fuite. On décide quand une population atteint un seuil. Si w = k, x1 suit une marche aléatoire biaisée; avec w = k grands, x2 converge (fig. 3) et le modèle approxime le DDM optimal.

### M6 — Fourmi *T. albipennis*, modèle simplifié de Pratt et al. 2002 (Marshall et al. 2009, §6.1, éq. 6.1-6.2) [L]

```
r′_i(s) = r′_i + c·η_{r′i}  si s > 0 ;  0 sinon                                  (6.1)
dy1/dt = (n − y1 − y2)(q1 + c·η_q1) + y1·r′1(s) + y2(r2 + c·η_r2) − y1(r1 + c·η_r1) − y1(k1 + c·η_k1)
dy2/dt = (n − y1 − y2)(q2 + c·η_q2) + y2·r′2(s) + y1(r1 + c·η_r1) − y2(r2 + c·η_r2) − y2(k2 + c·η_k2)   (6.2)
s = n − y1 − y2
```

Paramètres :
- q_i : découverte, proportionnelle à la qualité et à la facilité de découverte;
- r′_i : recrutement par tandem, dépendant de la qualité;
- r_i : passage spontané vers l'autre site;
- k_i : retour à l'état non engagé;
- n : population.

Recrutement *linéaire* en nombre de recruteurs. La paramétrisation optimale exigerait une connaissance globale des deux qualités, ce qui est jugé biologiquement irréaliste.

### M7 — Abeille, basculement indirect (Marshall et al. 2009, §6.2, éq. 6.3; d'après Britton et al. 2002) [L]

```
dy1/dt = (n − y1 − y2)(q1 + c·η_q1) − y1(k1 + c·η_k1) + y1(n − y1 − y2)(r′1 + c·η_r′1)
dy2/dt = (n − y1 − y2)(q2 + c·η_q2) − y2(k2 + c·η_k2) + y2(n − y1 − y2)(r′2 + c·η_r′2)   (6.3)
```

q_i est indépendant de la qualité du site. Le modèle n'est ni réductible ni asymptotiquement équivalent au DDM : il n'est pas statistiquement optimal.

### M8 — Abeille, basculement direct (Marshall et al. 2009, §6.3, éq. 6.4-6.6) [L, vérifié sur l'image de la page]

```
dy1/dt = (n − y1 − y2)(q1 + c·η_q1) + y1(n − y1 − y2)(r′1 + c·η_r′1) − y1·k + y1·y2·(r1 − r2 + c·η_r1 − c·η_r2)
dy2/dt = (n − y1 − y2)(q2 + c·η_q2) + y2(n − y1 − y2)(r′2 + c·η_r′2) − y2·k − y1·y2·(r1 − r2 + c·η_r1 − c·η_r2)   (6.4)
avec k = 0, x2 → n/√2 :
dx1/dt = (n²/2 − x1²)·((r1 − r2)/√2 + c·η_r)                                         (6.5)
dx/dt = (dx/dx1)(dx1/dt) = A + c·η ,  A = (r1 − r2)/√2                                (6.6)
```

Recrutement *quadratique* : la rencontre exige à la fois des recruteuses et des recrues non informées. Le modèle est asymptotiquement optimal quand k = 0.

Paramètres publiés (§7, fig. 5) :
- r1 − r2 = 2;
- k ∈ [0, 1];
- q1 − q2 et r′1 − r′2 « simultaneously varied » (variés simultanément, de façon à favoriser ou défavoriser le meilleur site) : le texte n'énonce pas l'égalité q1 − q2 = r′1 − r′2, et la plage [−1, 1] se lit seulement sur les axes de la fig. 5 [I] [à confirmer].

Les autres valeurs (n, c, q_i, r′_i, seuil) sont dans le matériel supplémentaire, **non consulté** (la page Royal Society renvoie 403).

### M9 — Modèle de diffusion (Marshall et al. 2009, §2, fig. 1) [L] et relations analytiques [I]

Marche aléatoire à dérive constante A et variance proportionnelle à c², seuils ±z, équivalente au SPRT (Wald et Wolfowitz 1948 [non vérifiée], cités).

Relations classiques :
- taux d'erreur ER = 1/(1 + exp(2Az/c²));
- temps de décision moyen DT = (z/A)·tanh(Az/c²).

Ces formules sont exactes : la vérification indépendante les a dérivées (fonction d'échelle) et vérifiées par Monte-Carlo (A = 0,5, c = 1, z = 1 : ER 0,263 simulé contre 0,269 théorique; DT 0,95 contre 0,92, biais de discrétisation attendu) [I]. Leur attribution à Bogacz et al. 2006 (dont seul le résumé a été lu) n'est pas vérifiée dans le texte [non vérifiée].

## 5. Résultats cibles et critères d'acceptation

Convention : chaque cible se teste dans le moteur commun (TypeScript), avec graine fixée et intégration d'Euler-Maruyama (pas dt ≤ 0,01 en unités du modèle, sensibilité à vérifier avec dt/2). Tolérances proposées [I].

| # | Espèce | Résultat publié (emplacement) | Critère d'acceptation | Statut source |
|---|---|---|---|---|
| T1 | abeille | Modèle 6.4 avec r1 − r2 = 2 et k ∈ [0, 1] : k = 0 minimise le temps de décision moyen sur l'ensemble des scénarios; encart de la fig. 5 : environ 0,72-0,73 à k = 0, environ 0,85 à k = 1 (lecture graphique [I]) (Marshall et al. 2009 §7, fig. 5) | Balayage de k sur {0; 0,1; …; 1}, 21 valeurs de q1 − q2 = r′1 − r′2 sur [−1, 1] (égalité non énoncée par le texte, qui dit « simultaneously varied »; plage lue sur les axes de la fig. 5 [I]) [à confirmer], 1000 répétitions par point. Accepter si argmin_k ⟨DT⟩ = 0, si ⟨DT⟩ croît de façon monotone (à 1 IC95 près), et si le rapport ⟨DT⟩(k=1)/⟨DT⟩(k=0) vaut 1,17 ± 0,05 (lecture graphique, 0,85/0,725; le texte ne le donne pas) [I] [à confirmer]. Les valeurs absolues exigent le matériel supplémentaire. | [L] pour r1 − r2 = 2, k ∈ [0, 1] et k = 0 optimal (§7); [I] (lecture graphique) pour la plage de q1 − q2 et r′1 − r′2 et pour le rapport 1,17 [à confirmer] |
| T2 | neurones (référence commune) | Usher-McClelland avec w = k grands → DDM (Marshall et al. 2009 §4, fig. 3) | Pour w = k ∈ {1, 5, 20} et 10⁴ essais : écart relatif de la précision et du temps moyen par rapport au DDM de dérive (I1 − I2)/√2 de moins de 5 % à w = k = 20, l'écart diminuant avec w = k. Écart-type de x2 autour de (I1 + I2)/(√2·(k + w)) inférieur à 5 % de sa moyenne. | [L] (« grands » non chiffré : seuils [I]) |
| T3 | abeille | Modèle 6.3 (indirect) : x1 non réductible au DDM (Marshall et al. 2009 §6.2) | Avec les mêmes moyennes de paramètres que T1 et des qualités inversées en cours de route : corrélation des incréments dx1 et dx2 significativement non nulle (p < 0,01, 10³ trajectoires). Contrôle : la même corrélation est ≈ 0 pour M5 avec w = k. | [L] (la preuve est dans le matériel supplémentaire, non consulté; critère [I]) |
| T4 | fourmi | Réanalyse de Pratt et al. 2002 : 14 % des changements mauvais → bon nid par recrutement, contre 3,8 % de bon → mauvais (Marshall et al. 2009 §8) | Dans un modèle individu-centré binaire calibré sur Pratt et al. 2002 : part des changements par recrutement de 14 ± 4 % (mauvais → bon) et 3,8 ± 2 % (bon → mauvais), sur 200 émigrations, avec des nids distants de 10 cm (condition de calibration; Marshall et al. 2009, note 2). Le dénominateur (« des changements d'engagement ») doit être confirmé dans Pratt et al. 2002 avant calibration [à confirmer]. | [L] (via Marshall et al. 2009; source primaire non lue) |
| T5 | fourmi | *T. albipennis* : 50-200 ouvrières, ≈ 30 % d'éclaireuses, transport ≈ 3 fois plus rapide que le tandem après le quorum (Couzin 2009, p. 41, citant Pratt et al. 2002) | Paramètres d'entrée, pas cibles émergentes : vitesse d'émigration après le quorum / avant le quorum = 3 ± 0,5 dans le modèle de référence. Sert de test de calibration. | [L] (seconde main) |
| T6 | fourmi | Rythme d'activité spontané de période ≈ 20 min, 70 % du temps inactif (Couzin 2009, encadré 2, fig. I, citant les réf. 71-74) | Modèle de fourmis excitables (activation par contact, période réfractaire) : pic d'autocorrélation à 20 ± 4 min et fraction inactive de 0,70 ± 0,05, sur 50 colonies × 6 h simulées. Sources primaires (Cole; Boi et al.) à lire avant de figer les règles. | [L] (seconde main) |
| T7 | transversal | Groupe de 100 individus, deux sous-groupes informés de 5 : moyenne des directions sous un écart angulaire critique, consensus sur une direction au-dessus (Couzin 2009, fig. 1a, d'après Couzin et al. 2005) | Bimodalité de la direction finale (test de dip de Hartigan, p < 0,01) au-dessus de l'angle critique; unimodalité centrée sur la moyenne en dessous; 500 répétitions par angle. Angle critique à lire dans Couzin et al. 2005 (non lu). | [L] partiel |
| T8 | agentique | Garantie des sagas (M2) | 10⁴ exécutions avec panne injectée à une étape aléatoire, en version orchestrée (SEC) et chorégraphiée (événements) : 0 trace hors des deux formes admises. Mesures comparatives : nombre de messages et temps jusqu'au repos. | [L] |
| T9 | agentique | Absence d'interblocage par construction de l'EPP (Carbone et Montesi 2013; Honda et al. 2008) | Pour 100 chorégraphies aléatoires bien formées : 0 interblocage sur 10⁴ ordonnancements aléatoires des processus projetés. Contrôle négatif : processus écrits à la main avec une mutation (inversion d'un envoi et d'une réception) → taux d'interblocage > 0, à rapporter. | [R] (théorème; critère [I]) |
| T10 | agentique | Règle de séquencement BPMN (OMG 2013, §11.5.6) | Avec délais aléatoires : chorégraphies conformes à la règle → 0 violation d'ordre sur 10⁴ exécutions; non conformes → violations > 0, à mesurer. | [L] |
| T11 | agentique | Erreurs corrélées entre LLM : accord de 60 % quand les deux modèles se trompent, sur un jeu de classement (Kim et al. 2025) | Sur au moins 500 items à réponse fermée, avec les modèles du projet 7 : P(même réponse \| deux erreurs) à rapporter avec IC95. La valeur est spécifique à leurs données, donc la comparaison ne porte que sur l'ordre de grandeur. | [R] |
| T12 | agentique | 9 juges LLM ≈ 2 votes effectifs (Kish n_eff) (Kohli 2026) | Panel de k modèles : n_eff de Kish dans [1,5; 3] pour k = 9, sur ≥ 300 items annotés. À utiliser comme analogue du quorum d'éclaireuses corrélées. | [R] |
| T13 | transversal | Marcheurs aléatoires sans communication partant d'un même point sur une grille : accélération négligeable du temps de couverture (Feinerman et Korman 2017, citant Alon et al. 2011) | S(N) = E[C1]/E[C_N] pour N ∈ {1, 2, 4, …, 256} sur un tore 2D : S(N) ≪ N. Comparer à la loi d'Alon et al. 2011 (non lue) avant d'en faire une cible chiffrée. | [L] (seconde main); passage de la grille au tore 2D : [I] |

## 6. Tableau de correspondance fourmi / abeille / agentique

| Concept | Fourmilière | Ruche | Agentique (LLM) | Sources | Limite de l'analogie |
|---|---|---|---|---|---|
| Contrôle | Aucun contrôle central | Aucun contrôle central | Chorégraphie : « pas de contrôleur central » (OMG 2013). En pratique, souvent orchestrateur-travailleurs (Hadfield et al. 2025) | Marshall et al. 2009 §5; Couzin 2009; OMG 2013 §7.2.1 | Les systèmes LLM ont presque toujours un orchestrateur caché (harnais, utilisateur) [I] |
| Description globale | Aucune (émergence) | Aucune (émergence) | Spécifiée (type global, BPMN, Pact) ou absente (SwarmWorld) | Camazine et al. 2001; Honda et al. 2008; Gopinathan et al. 2026; Pal et al. 2026 | Les insectes n'ont pas d'équivalent de G : comparer l'émergence à l'émergence, pas à un protocole projeté [I] |
| Médium | Piste chimique : marqueurs, persistance moyenne, quantitative, plusieurs phéromones | Danse sur le rayon : transitoire, locale, contact; vecteur + durée ∝ qualité | Journal d'événements / tableau noir (persistant), pub/sub (transitoire), messages A2A (adressés) | Heylighen 2016b §3-5; Couzin 2009 p. 41; A2A 2026 §1.2 | Messages LLM adressés et sémantiques; les insectes sont anonymes (Feinerman et Korman 2017) |
| Anonymat | Interactions anonymes, quasi bien mélangées | Idem | Agents identifiés (Agent Card A2A), topologie souvent fixe | Feinerman et Korman 2017; A2A 2026 | Identité et routage changent la dynamique (pas de mélange) [I] |
| Oubli | Évaporation; volatilités multiples (mémoire de travail vs attention) | Décroissance constante des danses | TTL, compaction de journal, fenêtre de contexte | Couzin 2009 p. 41; Heylighen 2016b §4 | L'oubli par fenêtre de contexte est abrupt et non paramétrable de façon continue [I] |
| Rétroaction positive | Dépôt dépendant de la qualité; recrutement en tandem linéaire (M6) | Recrutement quadratique (rencontre, M8) | Vote, auto-cohérence, échantillonnage et vote (Li et al. 2024) | Marshall et al. 2009 §6.3; Couzin 2009 | Erreurs corrélées : l'amplification amplifie aussi les erreurs communes (Kim et al. 2025) |
| Rétroaction négative / inhibition | Décroissance de la piste; bassin limité d'éclaireuses; basculement par recrutement (14 % vs 3,8 %) | Signal d'arrêt qui inhibe la danse; décroissance d'engagement | Contre-pression, annulation (état CANCELED d'A2A), compensation (sagas) | Marshall et al. 2009 §8; Couzin 2009 | La compensation n'a pas d'analogue biologique vérifié (question ouverte) |
| Quorum | Quorum au nid → transport (≈ 3 fois plus rapide); quorum abaissé en urgence | Quorum au site | k sur n, juges LLM, seuils de consensus | Couzin 2009 p. 41; Kohli 2026 | Un n nominal n'est pas un n effectif (≈ 2 sur 9) |
| Vitesse / justesse | Réglée par le seuil de quorum | Réglée par le seuil; optimale si k = 0 (M8) | Budget de jetons, seuil de vote | Marshall et al. 2009 §7; Hadfield et al. 2025 (jetons = 80 % de la variance sur BrowseComp) | Pour les LLM, le coût est en jetons, pas en temps d'exposition [I] |
| Décision et exécution | Intriquées (logistique du transport) | Séparées (vol de l'essaim guidé par une minorité) | Généralement séparées (plan, puis appels d'outils) | Marshall et al. 2009 §5, §8 | — |
| Intérêts | Conflit génétique minimal, intérêts alignés | Idem | Agents potentiellement intéressés dans les écosystèmes ouverts | Feinerman et Korman 2017; Gopinathan et al. 2026 | Limite majeure : la coopération des insectes est un acquis évolutif, pas une hypothèse de protocole |
| Cognition individuelle | Capable (navigation, évaluation multicritère du nid) | Capable | Très capable | Feinerman et Korman 2017; Marshall et al. 2009 §8 | L'hypothèse de Feinerman et Korman 2017 prédit une dominance de l'amplification individuelle [I] |
| Pathologies | Cascades informationnelles; blocages locaux en transport coopératif | Indécision (à documenter par le dossier abeille) | 14 modes d'échec MAST, dont désalignement inter-agents | Couzin 2009; Feinerman et Korman 2017; Cemri et al. 2025 | Correspondance à établir mode par mode, pas en bloc |
| Garantie | Statistique | Statistique | Logique (EPP, sagas) pour le protocole; statistique pour le contenu | Carbone et Montesi 2013; Garcia-Molina et Salem 1987 | Une chorégraphie spécifiée garantit l'ordre des messages, jamais la justesse d'un contenu généré [I] |

## 7. Parallèles agentiques appuyés par des sources

1. **Tableaux noirs LLM.**
   - Han et Zhang 2025 : agents choisis selon le contenu du tableau, tours répétés jusqu'au consensus; performances compétitives avec moins de jetons [R].
   - Salemi et al. 2025 : agent central qui publie des demandes, sous-agents volontaires; gains relatifs de 13 à 57 % de succès de bout en bout [R].
   
   Ces deux systèmes réalisent le régime hybride de Nii 1986.
2. **Stigmergie LLM** : Pal et al. 2026 (SwarmWorld) [R]. Des agents LLM homogènes, sans rôles assignés, se différencient en exploration, construction, maintenance et coordination. La réutilisation commence surtout par l'observation physique plutôt que par la communication. « La stigmergie physique seule soutient des sociétés capables. » La recherche isolée best-of-N reste compétitive pour le meilleur artefact. C'est la meilleure référence publiée pour le projet 7.
3. **Chorégraphie spécifiée pour agents** : Gopinathan et al. 2026 (Pact) [R], résumé d'une présentation; Giallorenzo et al. 2024 (Choral) [R]. Piste concrète : projeter une chorégraphie entre agents LLM et vérifier la conformité des traces (cible T9).
4. **Orchestration comme contre-exemple** : Hadfield et al. 2025 [L via WebFetch]. Agent principal et sous-agents en parallèle; +90,2 % sur une évaluation interne; environ 15 fois plus de jetons que le clavardage. Échecs : trop de sous-agents, travail dupliqué par des consignes vagues. Résultat non reproductible (évaluation interne).
5. **Échecs multi-agents** : Cemri et al. 2025 (MAST) [R]. 1600+ traces, 7 cadriciels, 14 modes en 3 catégories (conception, désalignement inter-agents, vérification), κ = 0,88.
6. **Indépendance des erreurs** : Kim et al. 2025 [R] (acceptée à ICML 2025); Kohli 2026 [R]; Wu et al. 2024, monoculture générative [R]. Côté théorique, Fokoué et al. 2026 [R] proposent un isomorphisme colonies / forêts aléatoires par décorrélation; c'est une prépublication à traiter avec prudence.
7. **Observabilité** : Fowler 2017 [L]. Une chorégraphie par événements rend le flux global implicite; il faut instrumenter les traces (lien avec C_spec et C_ctrl).
8. **Protocoles réels** : A2A 2026 (version 1.0.0) [L, page de spécification]. Exécution opaque : les agents ne partagent ni pensées, ni plans, ni outils (§1.2). 8 états de tâche opérationnels (9 valeurs d'énumération, dont UNSPECIFIED); transports par sondage, flux SSE et notifications push. La spécification ne mentionne ni orchestration ni chorégraphie dans le contenu rendu (page possiblement tronquée) [à confirmer] : c'est un protocole d'interaction, pas un modèle de coordination.

## 8. Visuels de vulgarisation

1. **Le curseur des trois régimes.** Une même tâche (achat à trois parties, ou recherche documentaire) exécutée par un orchestrateur, puis par une chorégraphie projetée, puis par un tableau noir stigmergique. Messages animés et panneau « qui sait quoi ». Affichage en direct des indicateurs C_ctrl, C_med et C_spec (§2.3).
2. **Le cube de Heylighen 2016b.** Trois axes (sématectonique/marqueurs × transitoire/persistant × quantitatif/qualitatif) avec, placés dedans : piste de fourmi, danse frétillante, termitière, Wikipédia, journal d'événements, pub/sub, tableau noir LLM. Un clic montre la source de chaque placement.
3. **Carte de localité des signaux** (Feinerman et Korman 2017). Grille 2 × 2 (local en espace × local en temps) : contact (tandem, danse, signal d'arrêt), alarme volatile, stigmergie (piste), et leurs analogues agentiques (appel direct, diffusion, journal).
4. **Plan de phase de Marshall et al. 2009.** y1 en fonction de y2 avec la droite attractive (fig. 3), en trois panneaux synchronisés : neurones (M5), fourmi (M6), abeille (M8). Curseurs k, w et seuil; histogramme des temps de décision. Reproduit T1-T3.
5. **Spectre amplification ↔ émergence.** Barre horizontale avec les exemples de Feinerman et Korman 2017 (alarme → piste → déménagement → transport coopératif → construction du nid) et, en regard, leurs analogues LLM (relais d'alerte → vote → débat → tableau noir → SwarmWorld).
6. **Saga en ligne du temps.** T1…Tj, panne, puis Cj…C1, en versions orchestrée (SEC) et chorégraphiée (événements), avec compteur de messages (T8).
7. **De la chorégraphie aux rôles.** Un type global se projette en trois rôles; les violations de la règle BPMN (OMG 2013, §11.5.6) clignotent (T9-T10).
8. **« 9 juges, 2 votes ».** Barres n nominal vs n effectif; analogie avec un quorum d'éclaireuses qui auraient toutes visité le même site (T11-T12).

## 9. Corrections et approximations de la v3

1. **Cadre absent.** La v3 emploie « chorégraphie » sans définition et sans aucune référence de génie logiciel. Il faut ajouter les définitions de §2 et ne jamais comparer une émergence biologique à un protocole spécifié sans le dire.
2. **Tableau, ligne « Recrutement » → « Délégation ».** Déléguer, c'est adresser une tâche : c'est de l'orchestration (Déf. 1). L'analogue correct est l'**annonce et l'auto-sélection** (volontariat, Salemi et al. 2025) : la danseuse ne choisit pas ses suiveuses.
3. **Ligne « Freinage » : « veto ».** Le signal d'arrêt *inhibe* la production de danses (Marshall et al. 2009 §8, citant Nieh 1993 [non vérifiée]). C'est une inhibition probabiliste, pas un veto. Remplacer par « inhibition (diminution de probabilité) ».
4. **Ligne « Freinage », fourmi : « absence de retours ».** C'est incomplet. Il faut ajouter la décroissance de la piste, le bassin limité d'éclaireuses (Couzin 2009 p. 41) et le basculement par recrutement (Marshall et al. 2009 §8). Phéromones répulsives chez certaines espèces : [NV], à vérifier par le dossier fourmi.
5. **Ligne « Décision ».** L'asymétrie « quorum (fourmi) / quorum + inhibition croisée (abeille) » est trompeuse. Les deux espèces utilisent un quorum (Couzin 2009). L'inhibition croisée chez l'abeille reste une hypothèse : Seeley 2003 [non vérifiée], cité par Marshall et al. 2009, suggère plutôt une décroissance d'engagement, et le signal d'arrêt comme inhibition est une proposition (Visscher 2007 [non vérifiée], cité). Chez *Temnothorax*, un basculement par recrutement est observé (14 % vs 3,8 %).
6. **Ligne « Contenu du signal ».**
   - Fourmi = « intensité (scalaire) » : approximation. Plusieurs phéromones de volatilités différentes coexistent, et la piste est un champ spatial (Couzin 2009 p. 41).
   - Abeille = « direction et distance (symbolique) » : incomplet. La durée de danse code aussi la qualité (Couzin 2009 p. 41). « Symbolique » au sens de Peirce n'est pas établi [I]. Préférer « vecteur codé + intensité ».
7. **Question transversale « richesse du signal ».** Elle est à reformuler sur deux axes au moins : richesse du signal × capacité individuelle (Feinerman et Korman 2017), plus un troisième, l'indépendance des erreurs (Kim et al. 2025). L'ordre fourmi < abeille < LLM est une hypothèse, pas un constat.
8. **Projet 3, agentique.** « Des agents identiques réagissent en même temps et oscillent; la diversité stabilise » est présenté comme un fait. Aucune source ne montre d'oscillation d'agents LLM. La corrélation des erreurs est documentée (Kim et al. 2025; Kohli 2026); l'oscillation est une hypothèse à tester.
9. **Projet 7 « seul projet sans résultat publié ».** C'est devenu inexact : Pal et al. 2026 (SwarmWorld), les tableaux noirs LLM (Han et Zhang 2025; Salemi et al. 2025), Cemri et al. 2025 (MAST) et Kim et al. 2025 donnent des points de référence partiels (cibles T11-T12).
10. **Sagas.** Si elles sont introduites (comme le demande le périmètre), ne pas citer Garcia-Molina et Salem 1987 pour la « saga chorégraphiée » : l'article décrit la saga dans un système centralisé (§1), mais par économie de place seulement, les auteurs précisant qu'une mise en œuvre dans un SGBD réparti est clairement possible. La forme chorégraphiée vient de la littérature microservices (Richardson s.d.). OMG 2013 place d'ailleurs la compensation dans un seul participant (tableau 11.6).
11. **WS-CDL** : à citer comme Candidate Recommendation (Kavantzas et al. 2005), pas comme « standard W3C ».
12. **Thèse « la reine ne commande pas ».** Elle est compatible avec le contrôle distribué décrit par Couzin 2009 et Marshall et al. 2009 (§5 : « sans contrôle central »), mais aucune source lue ici ne traite spécifiquement de la reine. Il faut une source primaire (dossiers fourmi et abeille).
13. **Couzin 2009, Marshall et al. 2009, Feinerman et Korman 2017, Hölldobler et Wilson 2009** : absents de la v3 alors qu'ils fondent le cadre. Les ajouter.

## 10. Questions ouvertes

1. La danse frétillante est-elle de la stigmergie (marqueur transitoire « libéré dans le médium », Heylighen 2016b §4) ou de la communication directe ? Aucune source lue ne tranche. Il faudrait une source d'éthologie qui classe explicitement la danse (Seeley; von Frisch).
2. Quelles sont les valeurs de n, c, q_i, r′_i et du seuil dans le matériel supplémentaire de Marshall et al. 2009, et quelle est la relation exacte entre q1 − q2 et r′1 − r′2 dans la fig. 5 ? Sans elles, T1 ne se reproduit qu'en forme et non en valeur absolue.
3. Quel est le dénominateur exact des 14 % / 3,8 % (Pratt et al. 2002) ?
4. Existe-t-il un analogue biologique de la *compensation* (annulation d'un effet déjà engagé) ? Candidats à chercher : rejet d'un nid après quorum, retour des transportées chez *Temnothorax*.
5. Les indicateurs C_ctrl, C_med et C_amp séparent-ils effectivement les régimes sur les scénarios simulés ? À valider sur un cas d'école par régime avant de les publier.
6. La correspondance « quorum ↔ k-sur-n LLM » tient-elle une fois n remplacé par n_eff ? Prédiction [I] : le compromis vitesse/justesse d'un quorum de LLM sature plus tôt que celui des insectes, faute d'indépendance.
7. Peltz 2003 et Parunak 1997 doivent être lus en texte intégral avant d'être cités pour une définition.
8. Les définitions exactes de projection et de fusion (MPST) sont à prendre dans Honda et al. 2016 et Scalas et Yoshida 2019, non lus ici.

## 11. Références

**Étiquette** : « Nom année » (nom de famille du premier auteur sans particule; deux auteurs « X et Y année »; trois auteurs ou plus « X et al. année »; organisation en sigle; suffixe a, b seulement en cas de collision dans le dossier). **Statut** après vérification indépendante (2026-10-01) : **vérifiée** = métadonnées exactes et affirmations retrouvées; **corrigée** = la source existe, mais le dossier contenait une erreur, une omission ou une imprécision, corrigée en place; **non vérifiée** = non tranché (la référence porte « [non vérifiée] » là où elle est citée). Colonne « Lu » : ce qui a été lu réellement (légende en section 0).

### 11.1 Chorégraphie, orchestration, sagas, événements

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Peltz 2003 | Peltz, C. (2003). Web services orchestration and choreography. *Computer*, 36(10), 46-52. | https://doi.org/10.1109/MC.2003.1236471 | vérifiée | [R] (deux phrases du résumé, OpenAlex); définitions attribuées à Peltz non lues [NV] |
| Kavantzas et al. 2005 | Kavantzas, N., Burdett, D., Ritzinger, G., Fletcher, T., Lafon, Y., & Barreto, C. (2005). *Web Services Choreography Description Language Version 1.0*. W3C Candidate Recommendation, 9 novembre 2005. | https://www.w3.org/TR/ws-cdl-10/ ; statut du groupe : https://www.w3.org/2002/ws/chor/ | vérifiée | [L partiel] (§1, §1.5) |
| OMG 2013 | Object Management Group (2013). *Business Process Model and Notation (BPMN) Version 2.0.2*, formal/2013-12-09 (couverture : décembre 2013; la page OMG indique janvier 2014). Version 2.0 : formal/11-01-03, décembre 2010. | https://www.omg.org/spec/BPMN/2.0.2/PDF ; version 2.0 : https://www.omg.org/spec/BPMN/2.0/ | corrigée (règle des passerelles : §11.7.1, p. 344) | [L] (§7.2.1, §11); version 2.0 : [R] |
| Montesi 2013 | Montesi, F. (2013). *Choreographic Programming*. Thèse de doctorat, IT University of Copenhagen, août 2013 (publication ITU-DS n° 104, 2014). ISBN 9788779492998. | https://www.fabriziomontesi.com/files/choreographic-programming.pdf ; https://researcher.itu.dk/en/publications/choreographic-programming | vérifiée | [R] (pages liminaires lues à la vérification) |
| Carbone et Montesi 2013 | Carbone, M., & Montesi, F. (2013). Deadlock-freedom-by-design: multiparty asynchronous global programming. *POPL '13*, 263-274. | https://doi.org/10.1145/2429069.2429101 | vérifiée | [R] |
| Montesi 2023 | Montesi, F. (2023). *Introduction to Choreographies*. Cambridge University Press, 244 p. (en ligne le 11 mai 2023). Ch. 4 « Endpoint Projection », p. 76-90. | https://doi.org/10.1017/9781108981491 ; ch. 4 : https://doi.org/10.1017/9781108981491.006 | corrigée (244 p., non 253) | [R] |
| Giallorenzo et al. 2024 | Giallorenzo, S., Montesi, F., & Peressotti, M. (2024). Choral: Object-oriented choreographic programming. *ACM TOPLAS*, 46(1), 1-59. | https://doi.org/10.1145/3632398 ; arXiv:2005.09520 | corrigée (pages ajoutées) | [R] |
| Honda et al. 2008 | Honda, K., Yoshida, N., & Carbone, M. (2008). Multiparty asynchronous session types. *POPL '08*, 273-284. | https://doi.org/10.1145/1328438.1328472 | corrigée (pages ajoutées) | [R] |
| Honda et al. 2016 | Honda, K., Yoshida, N., & Carbone, M. (2016). Multiparty asynchronous session types. *Journal of the ACM*, 63(1), 1-67 (3 mars 2016). | https://doi.org/10.1145/2827695 | corrigée (« art. 9 » retiré : numéro d'article non vérifiable) | [R] |
| Scalas et Yoshida 2019 | Scalas, A., & Yoshida, N. (2019). Less is more: multiparty session types revisited. *Proc. ACM Program. Lang.*, 3(POPL), 1-29. | https://doi.org/10.1145/3290343 | vérifiée | [R] |
| Gopinathan et al. 2026 | Gopinathan, K., Feser, J., Naim, M., Tavares, Z., & Bingham, E. (2026, 4 mai). Pact: A choreographic language for agentic ecosystems. arXiv:2605.03143 (résumé d'une présentation, implémentation préliminaire). | https://arxiv.org/abs/2605.03143 | corrigée (nature de la source précisée) | [R] |
| Garcia-Molina et Salem 1987 | Garcia-Molina, H., & Salem, K. (1987). Sagas. *SIGMOD '87*, 249-259. | https://doi.org/10.1145/38713.38742 ; scan : https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf | corrigée (portée : restriction au cas centralisé éditoriale) | [L] |
| Richardson s.d. | Richardson, C. (s.d.). Pattern: Saga. microservices.io (page non datée; consultée le 2026-10-01). | https://microservices.io/patterns/data/saga.html | vérifiée | [L] |
| Fowler 2017 | Fowler, M. (2017, 7 février). What do you mean by "Event-Driven"? | https://martinfowler.com/articles/201701-event-driven.html | vérifiée | [L] |

### 11.2 Stigmergie, tableaux noirs, auto-organisation

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Grassé 1959 | Grassé, P.-P. (1959). La reconstruction du nid et les coordinations interindividuelles chez *Bellicositermes natalensis* et *Cubitermes* sp. La théorie de la stigmergie : essai d'interprétation du comportement des termites constructeurs. *Insectes Sociaux*, 6(1), 41-80. | https://doi.org/10.1007/BF02223791 | vérifiée | [R] (métadonnées) |
| Theraulaz et Bonabeau 1999 | Theraulaz, G., & Bonabeau, E. (1999). A brief history of stigmergy. *Artificial Life*, 5(2), 97-116. | https://doi.org/10.1162/106454699568700 (PMID 10633572) | vérifiée | [R] (résumé) |
| Heylighen 2016a | Heylighen, F. (2016). Stigmergy as a universal coordination mechanism I: Definition and components. *Cognitive Systems Research*, 38, 4-13 (en ligne en décembre 2015). | https://doi.org/10.1016/j.cogsys.2015.12.002 ; prépublication : https://pespmc1.vub.ac.be/Papers/StigmergyICognSystems.pdf | vérifiée | [L] |
| Heylighen 2016b | Heylighen, F. (2016). Stigmergy as a universal coordination mechanism II: Varieties and evolution. *Cognitive Systems Research*, 38, 50-59. | https://doi.org/10.1016/j.cogsys.2015.12.007 ; prépublication : https://pespmc1.vub.ac.be/Papers/StigmergyIICognSystems.pdf | corrigée (DOI ajouté) | [L] |
| Parunak 1997 | Parunak, H. V. D. (1997). "Go to the ant": Engineering principles from natural multi-agent systems. *Annals of Operations Research*, 75, 69-101. | https://doi.org/10.1023/A:1018980001403 | vérifiée | [R] (métadonnées) |
| Parunak 2006 | Parunak, H. V. D. (2006). A survey of environments and mechanisms for human-human stigmergy. In *E4MAS 2005*, LNCS 3830, 163-186. | https://doi.org/10.1007/11678809_10 | corrigée (attribution de « marker-based » : §3.4) | [R] (métadonnées) |
| Erman et al. 1980 | Erman, L. D., Hayes-Roth, F., Lesser, V. R., & Reddy, D. R. (1980). The Hearsay-II speech-understanding system: Integrating knowledge to resolve uncertainty. *ACM Computing Surveys*, 12(2), 213-253. | https://doi.org/10.1145/356810.356816 | vérifiée | [R] |
| Nii 1986 | Nii, H. P. (1986). The blackboard model of problem solving and the evolution of blackboard architectures (Part one). *AI Magazine*, 7(2), 38-53. | https://doi.org/10.1609/aimag.v7i2.537 | corrigée (titre : sans le préfixe « Blackboard systems: ») | [L] (p. 39, 43-44, 53). La partie 2 (AI Magazine 7(3)) n'a pas été consultée |
| Camazine et al. 2001 | Camazine, S., Deneubourg, J.-L., Franks, N. R., Sneyd, J., Theraulaz, G., & Bonabeau, E. (2001). *Self-Organization in Biological Systems*. Princeton University Press (Princeton Studies in Complexity; broché 2003, 562 p., ISBN 9780691116242). | https://press.princeton.edu/books/paperback/9780691116242/self-organization-in-biological-systems | vérifiée | [R] |
| Bonabeau et al. 1999 | Bonabeau, E., Dorigo, M., & Theraulaz, G. (1999). *Swarm Intelligence: From Natural to Artificial Systems*. Oxford University Press. | https://doi.org/10.1093/oso/9780195131581.001.0001 | vérifiée | [R] (Crossref) |

### 11.3 Cognition individuelle et collective, superorganisme

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Feinerman et Korman 2017 | Feinerman, O., & Korman, A. (2017). Individual versus collective cognition in social insects. *Journal of Experimental Biology*, 220(1), 73-82. | https://doi.org/10.1242/jeb.143891 ; arXiv:1701.05080 | vérifiée | [L] |
| Couzin 2009 | Couzin, I. D. (2009). Collective cognition in animal groups. *Trends in Cognitive Sciences*, 13(1), 36-43 (en ligne le 6 décembre 2008). | https://doi.org/10.1016/j.tics.2008.10.002 ; copie d'auteur : https://www.icts.res.in/sites/default/files/Couzin_2009_Cognition.pdf | corrigée (« super-organisms » : p. 40, non p. 41) | [L] |
| Marshall et al. 2009 | Marshall, J. A. R., Bogacz, R., Dornhaus, A., Planqué, R., Kovacs, T., & Franks, N. R. (2009). On optimal decision-making in brains and social insect colonies. *Journal of the Royal Society Interface*, 6(40), 1065-1074. | https://doi.org/10.1098/rsif.2008.0511 (PMC2827444) ; copie lue : https://www.cs.unm.edu/~wjust/CS523/S2018/Readings/Marshall2009.pdf | corrigée (T1 : paramètres de la fig. 5 marqués [à confirmer]; T4 : condition des nids à 10 cm) | [L] (version anticipée; matériel supplémentaire non consulté) |
| Bogacz et al. 2006 | Bogacz, R., Brown, E., Moehlis, J., Holmes, P., & Cohen, J. D. (2006). The physics of optimal decision making: A formal analysis of models of performance in two-alternative forced-choice tasks. *Psychological Review*, 113(4), 700-765. | https://doi.org/10.1037/0033-295X.113.4.700 | corrigée (sous-titre ajouté) | [R] |
| Hölldobler et Wilson 2009 | Hölldobler, B., & Wilson, E. O. (2009). *The Superorganism: The Beauty, Elegance, and Strangeness of Insect Societies*. W. W. Norton, 522 p. ISBN 9780393067040 (OpenLibrary date la parution de 2008; l'usage courant cite 2009, année du copyright). | https://openlibrary.org/isbn/9780393067040.json | vérifiée | [NV] (métadonnées OpenLibrary seulement; contenu non lu) |

### 11.4 Agentique

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| A2A 2026 | A2A Project (2026). *Agent2Agent (A2A) Protocol Specification*, version 1.0.0 (publiée le 2026-03-12 selon les versions GitHub; la page de spécification n'est pas datée; consultée le 2026-10-01). | https://a2a-protocol.org/latest/specification/ | corrigée (états de tâche : 8 opérationnels, 9 valeurs) | [L partiel] |
| Hadfield et al. 2025 | Hadfield, J., Zhang, B., Lien, K., Scholz, F., Fox, J., & Ford, D. (2025, 13 juin). How we built our multi-agent research system. Anthropic Engineering. | https://www.anthropic.com/engineering/multi-agent-research-system | corrigée (« 80 % de la variance » : BrowseComp; statut de lecture harmonisé) | [L via WebFetch] |
| Han et Zhang 2025 | Han, B., & Zhang, S. (2025). Exploring advanced LLM multi-agent systems based on blackboard architecture. arXiv:2507.01701. | https://arxiv.org/abs/2507.01701 | vérifiée | [R] |
| Salemi et al. 2025 | Salemi, A., Parmar, M., Goyal, P., Song, Y., Yoon, J., Zamani, H., Pfister, T., & Palangi, H. (2025). LLM-based multi-agent blackboard system for information discovery in data science. arXiv:2510.01285. | https://arxiv.org/abs/2510.01285 | vérifiée | [R] |
| Cemri et al. 2025 | Cemri, M., Pan, M. Z., Yang, S., Agrawal, L. A., Chopra, B., Tiwari, R., Keutzer, K., Parameswaran, A., Klein, D., Ramchandran, K., Zaharia, M., Gonzalez, J. E., & Stoica, I. (2025). Why do multi-agent LLM systems fail? arXiv:2503.13657 (v3, 26 octobre 2025). | https://arxiv.org/abs/2503.13657 | vérifiée | [R] |
| Kim et al. 2025 | Kim, E., Garg, A., Peng, K., & Garg, N. (2025). Correlated errors in large language models. arXiv:2506.07962 (acceptée à ICML 2025). | https://arxiv.org/abs/2506.07962 | corrigée (venue ajoutée) | [R] |
| Kohli 2026 | Kohli, G. (2026). Nine judges, two effective votes: Correlated errors undermine LLM evaluation panels. arXiv:2605.29800. | https://arxiv.org/abs/2605.29800 | vérifiée | [R] |
| Wu et al. 2024 | Wu, F., Black, E., & Chandrasekaran, V. (2024). Generative monoculture in large language models. arXiv:2407.02209. | https://arxiv.org/abs/2407.02209 | vérifiée | [R] |
| Li et al. 2024 | Li, J., Zhang, Q., Yu, Y., Fu, Q., & Ye, D. (2024). More agents is all you need. arXiv:2402.05120. | https://arxiv.org/abs/2402.05120 | vérifiée | [R] |
| Du et al. 2023 | Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., & Mordatch, I. (2023). Improving factuality and reasoning in language models through multiagent debate. arXiv:2305.14325. | https://arxiv.org/abs/2305.14325 | vérifiée | [R] |
| Pal et al. 2026 | Pal, S., Wang, F. Y., & Buehler, M. J. (2026). SwarmWorld: Stigmergic technological evolution in societies of language-model agents. arXiv:2608.26081. | https://arxiv.org/abs/2608.26081 | vérifiée | [R] |
| Fokoué et al. 2026 | Fokoué, E., Babbitt, G., & Levental, Y. (2026). Decorrelation, diversity, and emergent intelligence: The isomorphism between social insect colonies and ensemble machine learning. arXiv:2603.20328 (prépublication, v2). | https://arxiv.org/abs/2603.20328 | vérifiée | [R] |
| Gorinevski 2026 | Gorinevski, D. (2026). Nidus: Externalized reasoning for AI-assisted engineering. arXiv:2604.05080. | https://arxiv.org/abs/2604.05080 | vérifiée | [R] (citée ici, jamais utilisée dans le texte) |

### 11.5 Citées de seconde main, à lire avant usage [NV]

Citations transcrites des listes de références de Marshall et al. 2009, de Heylighen 2016b, de Couzin 2009 et de Feinerman et Korman 2017, puis, pour les quatre premières, recoupées avec Crossref et OpenAlex (métadonnées seulement; contenu non lu).

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Pratt et al. 2002 | Pratt, S. C., Mallon, E. B., Sumpter, D. J. T., & Franks, N. R. (2002). Quorum sensing, recruitment, and collective decision-making during colony emigration by the ant *Leptothorax albipennis*. *Behavioral Ecology and Sociobiology*, 52(2), 117-127. | https://doi.org/10.1007/s00265-002-0487-x | vérifiée (métadonnées) | [NV] contenu non lu (dénominateur des 14 % / 3,8 % à confirmer) |
| Britton et al. 2002 | Britton, N. F., Franks, N. R., Pratt, S. C., & Seeley, T. D. (2002). Deciding on a new home: how do honeybees agree? *Proceedings of the Royal Society B*, 269(1498), 1383-1388. | https://doi.org/10.1098/rspb.2002.2001 | vérifiée (métadonnées) | [NV] contenu non lu |
| Couzin et al. 2005 | Couzin, I. D., Krause, J., Franks, N. R., & Levin, S. A. (2005). Effective leadership and decision-making in animal groups on the move. *Nature*, 433(7025), 513-516. | https://doi.org/10.1038/nature03236 | vérifiée (métadonnées) | [NV] contenu non lu (angle critique de T7 à lire) |
| Alon et al. 2011 | Alon, N., Avin, C., Koucký, M., Kozma, G., Lotker, Z., & Tuttle, M. R. (2011). Many random walks are faster than one. *Combinatorics, Probability and Computing*, 20(4), 481-502. | https://doi.org/10.1017/S0963548311000125 | vérifiée (métadonnées) | [NV] contenu non lu (loi de T13 à lire) |
| Nieh 1993 | Nieh, J. C. (1993). The stop signal of honey bees: reconsidering its message. *Behavioral Ecology and Sociobiology*, 33, 51-56. | — | non vérifiée | [NV] (citation de la liste de Marshall et al. 2009) |
| Visscher 2007 | Visscher, P. K. (2007). Group decision making in nest-site selection among social insects. *Annual Review of Entomology*, 52, 255-275. | — | non vérifiée | [NV] (citation de la liste de Marshall et al. 2009) |
| Seeley 2003 | Seeley, T. D. (2003). Consensus building during nest-site selection in honey bee swarms: the expiration of dissent. *Behavioral Ecology and Sociobiology*, 53, 417-424. | — | non vérifiée | [NV] (citation de la liste de Marshall et al. 2009) |
| Usher et McClelland 2001 | Usher, M., & McClelland, J. L. (2001). The time course of perceptual choice: the leaky, competing accumulator model. *Psychological Review*, 108, 550-592. | — | non vérifiée | [NV] (citation de la liste de Marshall et al. 2009) |
| Wald et Wolfowitz 1948 | Wald, A., & Wolfowitz, J. (1948). Optimum character of the sequential probability ratio test. *Annals of Mathematical Statistics*, 19, 326-339. | — | non vérifiée | [NV] (citation de la liste de Marshall et al. 2009) |
| Wilson 1975 | Wilson, E. (1975). *Sociobiology: The new synthesis*. Cambridge, MA: Harvard University Press. | — | non vérifiée | [NV] (citation de la liste de Heylighen 2016b; ajoutée à la consolidation pour l'attribution de « sématectonique ») |

## 12. Historique de vérification

Vérification indépendante du 2026-10-01 (rapport `recherche/verifications/x-choregraphie.md`) : les 42 références de la liste principale existent et leurs métadonnées sont exactes pour l'essentiel; aucune n'est fausse ni inventée. Les résultats cibles T1 à T13 figurent dans les sources citées (deux réserves sur T1). Consolidation du 2026-10-01 : corrections appliquées en place, étiquettes normalisées, statuts reportés en section 11. Aucune conclusion du dossier n'a changé, sauf celle de §3.3 (voir 12.1, point 13).

### 12.1 Corrections appliquées

**Références (métadonnées, versions publiées, statuts)**

1. Nii 1986 : titre rétabli « The blackboard model of problem solving and the evolution of blackboard architectures (Part one) » (le préfixe « Blackboard systems: » ne figure pas sur l'article).
2. Bogacz et al. 2006 : sous-titre ajouté (« A formal analysis of models of performance in two-alternative forced-choice tasks »).
3. Heylighen 2016b : DOI ajouté (10.1016/j.cogsys.2015.12.007).
4. Honda et al. 2008 : pages 273-284 ajoutées; Giallorenzo et al. 2024 (Choral) : pages 1-59 ajoutées; Honda et al. 2016 : « art. 9 » retiré (numéro d'article non vérifiable; la consultation de Crossref lors de la consolidation confirme l'absence de numéro d'article).
5. Montesi 2023 : 244 p., non 253 (§3.2).
6. Gopinathan et al. 2026 (Pact) : source précisée comme résumé d'une présentation, avec une implémentation préliminaire; Kim et al. 2025 : acceptée à ICML 2025.
7. OMG 2013 : précision de date de couverture (décembre 2013; la page OMG indique janvier 2014). Montesi 2013 : publication ITU-DS n° 104 (2014). Hölldobler et Wilson 2009 : note sur la date de parution (OpenLibrary 2008; copyright 2009).
8. Étiquettes normalisées dans tout le dossier : BPMN devient OMG 2013; WS-CDL devient Kavantzas et al. 2005; « Anthropic 2025 » devient Hadfield et al. 2025 (le billet nomme ses auteurs, comme dans les dossiers P7 et P8); A2A 1.0.0 devient A2A 2026 (version 1.0.0 publiée le 2026-03-12 selon les versions GitHub, la page de spécification n'étant pas datée); Richardson devient Richardson s.d. (page non datée; la convention ne couvre pas ce cas). Pact, Choral, SwarmWorld et MAST restent des noms de systèmes, toujours suivis de l'étiquette. Kim et al. 2025 sans suffixe (une seule œuvre de ce nom dans le dossier).
9. Cemri et al. 2025 : liste complète des 13 auteurs (API arXiv), à la place de « Cemri, M., et al. ».
10. Wilson 1975 ajoutée à la liste (citée au §3.4 pour « sématectonique », de seconde main via Heylighen 2016b; non vérifiée). Section 11.5 : citations complètes des références de seconde main (liste de références de Marshall et al. 2009 pour Nieh 1993, Visscher 2007, Seeley 2003, Usher et McClelland 2001, Wald et Wolfowitz 1948, Britton et al. 2002, Pratt et al. 2002; Crossref et OpenAlex pour Pratt et al. 2002, Britton et al. 2002, Couzin et al. 2005, Alon et al. 2011).

**Contenu, paramètres et résultats cibles**

11. §3.1 : la règle sur les conditions de passerelle en langue naturelle est au §11.7.1, p. 344 d'OMG 2013, non au §11.6.
12. §3.4 : Heylighen 2016b §3 attribue « sématectonique » à Wilson 1975 et seulement « marker-based » à Parunak 2006; ce n'est pas toute la distinction. §3.8 : « super-organisms » est à la p. 40 de Couzin 2009, non à la p. 41.
13. §3.3 et §9.10 : la clause de Garcia-Molina et Salem 1987 (§1) est citée : la saga est décrite en mode centralisé faute de place, et les auteurs notent qu'une mise en œuvre dans un SGBD réparti est clairement possible. **Conclusion mise à jour** : les sagas d'origine sont « décrites en mode orchestré, sans que les auteurs les y limitent » (au lieu de « orchestrées »).
14. M8 et T1 : l'égalité q1 − q2 = r′1 − r′2 et la plage [−1, 1] ne sont pas dans le texte de Marshall et al. 2009 (« simultaneously varied »; plage lue sur les axes de la fig. 5) : marquées [I] [à confirmer]. Le rapport 1,17 est une lecture graphique (0,85/0,725) : [I] [à confirmer].
15. T4 : condition des nids distants de 10 cm ajoutée (note 2 de Marshall et al. 2009).
16. §6 (vitesse et justesse) : les 80 % de variance expliqués par les jetons concernent BrowseComp. Statut de Hadfield et al. 2025 harmonisé : « [L via WebFetch] » dans tout le dossier (le §7 portait [R], la liste [L via WebFetch]); le billet a été lu par WebFetch, qui restitue les faits et non le texte mot à mot.
17. §7.8 : « 8 états opérationnels (9 valeurs d'énumération, dont UNSPECIFIED) »; l'absence de mention d'orchestration ou de chorégraphie dans A2A est limitée au contenu rendu (page possiblement tronquée) : [à confirmer].
18. Précisions de statut reportées du rapport, sans changement de valeur : M2 (borne de j : [à confirmer]); M9 (formules exactes par dérivation et Monte-Carlo, attribution à Bogacz et al. 2006 non vérifiée); T3 (preuve dans le matériel supplémentaire); T4 (dénominateur : [à confirmer]); T13 (passage au tore 2D : [I]); Scalas et Yoshida 2019 (théorie sans types globaux, utile pour M3); §10, question 2 (relation q1 − q2 / r′1 − r′2 ajoutée aux valeurs à chercher dans le matériel supplémentaire).

### 12.2 Réserves restantes

- **Honda et al. 2016** : numéro d'article non vérifiable (Crossref, OpenAlex et Semantic Scholar ne donnent que les pages; ACM DL et DBLP bloqués).
- **Marshall et al. 2009** : paramètres de T1 (relation q1 − q2 / r′1 − r′2, plage [−1, 1], rapport 1,17) [à confirmer]; valeurs de n, c, q_i, r′_i et du seuil dans le matériel supplémentaire, non consulté.
- **Garcia-Molina et Salem 1987** : borne de j illisible dans le scan (« 0 ≤ j < n » [à confirmer]).
- **Références non vérifiées** : Nieh 1993, Visscher 2007, Seeley 2003, Usher et McClelland 2001, Wald et Wolfowitz 1948, Wilson 1975 (citations transcrites de listes de références, jamais consultées).
- **Références de seconde main dont seules les métadonnées sont confirmées** : Pratt et al. 2002 (dénominateur des 14 % / 3,8 % non confirmé), Britton et al. 2002, Couzin et al. 2005 (angle critique de T7), Alon et al. 2011 (loi de T13).
- **Contenus non lus** : définitions de Peltz 2003; principes de Parunak 1997; définition du superorganisme (Hölldobler et Wilson 2009); texte de Grassé 1959; définitions de projection et de fusion (Honda et al. 2016; Scalas et Yoshida 2019); attribution des formules de M9 à Bogacz et al. 2006.
- **A2A 2026** : page de spécification possiblement tronquée; l'absence de mention d'orchestration ou de chorégraphie reste [à confirmer].
- **Tolérances et seuils des cibles T1 à T13** : propositions de l'auteur du dossier [I], à fixer dans les fiches de reproduction.
- **Sources primaires citées sans référence complète** : « Cole; Boi et al. » (T6) et « Seeley; von Frisch » (§10, question 1) n'ont ni année ni citation; à identifier avant usage.

# 06 — Métriques et typologie (socle S0)

**Statut :** socle S0, régime production. Ce document **fait foi** pour les définitions de la typologie, de R et de G; la fiche [S0](../projets/S0-socle.md) en fixe les critères de test. Le cadre ([00-cadre.md](00-cadre.md)) prime; les tensions sont consignées en section 9. Les seuils, tailles d'échantillon et règles d'exclusion définitifs sont arrêtés dans [03-plan-de-recherche.md](03-plan-de-recherche.md) et dans [../projets/P7-synthese-agentique.md](../projets/P7-synthese-agentique.md), qui reprennent ce qui suit.
**Date :** 2026-10-01. **Langue :** français canadien; termes techniques et identifiants en anglais.
**Sources :** dossiers [x-choregraphie](../recherche/dossiers/x-choregraphie.md) et [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md); audits [choregraphie-agentique](annexes/audit/choregraphie-agentique.md), [methodologie](annexes/audit/methodologie.md), [lacunes](annexes/audit/lacunes.md), [bio-abeilles](annexes/audit/bio-abeilles.md); valeurs reprises (non réécrites) de p1-recrutement, p4-regulation, p5-quorum, p6-pathologies et p8-individu-colonie, dans le même dossier. Alignement final sur la fiche S0, la fiche P6 (taxonomie), la fiche P7 (notations de G), [05-spec-simulation.md](05-spec-simulation.md) (journal) et [10-glossaire.md](10-glossaire.md) (homonymies).
**Contrôle numérique :** [../recherche/verifications-numeriques/s0_metriques_checks.ts](../recherche/verifications-numeriques/s0_metriques_checks.ts). `node s0_metriques_checks.ts` doit afficher `checks OK`; chaque exemple marqué [I, calcul] y est recalculé.

## 0. Lecture du document

**Marques.** Sans marque : lu dans la source par le dossier cité (texte intégral ou passage cité). **[R]** : source lue au niveau du résumé seulement. **[I]** : inférence ou construction (de ce document ou du dossier cité). **[I, calcul]** : calcul refait par le script de contrôle à partir d'entrées sourcées ou déclarées « valeur d'exemple ». **[à confirmer]**, **[non vérifiée]** : marques du cadre, conservées telles quelles.

**Statuts de transposition** (cadre §6.7) : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. Le programme n'a encore rien reproduit : aucune ligne ne porte *Résultat reproduit*; la colonne « Statut » donne la cible qui la promouvrait.

**Citations.** Étiquettes de [11-bibliographie.md](11-bibliographie.md). Suffixes retenus selon le dossier d'origine : [Choi et al. 2025a] (débat contre vote), [Wu et al. 2024b] (monoculture générative), [Anthropic 2026b] (modèles, tarifs, contraintes d'API), [Anthropic 2026c] (limites de débit). [Kim et al. 2025] désigne les erreurs corrélées (arXiv:2506.07962); [Kim et al. 2025a] désigne les lois d'échelle des systèmes d'agents (arXiv:2512.08296).

**Prérequis.**
1. [00-cadre.md](00-cadre.md) et [11-bibliographie.md](11-bibliographie.md) lus.
2. Le journal d'événements typés de l'enregistreur, portant les contenus du tableau 2.1 (format : [05-spec-simulation.md](05-spec-simulation.md), section « Enregistreur »).
3. Graine journalisée, PRNG semable, horloge à pas fixe (noyau S0, cadre §7). Sans graine, aucun appariement (section 4).
4. Node ≥ 23.6 pour exécuter le `.ts` sans transpilation; `tsc --noEmit` pour les types.
5. Avant toute exécution de LLM : reconfirmer identifiants, tarifs, retraits de modèles (Haiku 4.5 dès le 2026-10-15) et versions A2A et MCP (cadre §2.4 point 16 et §10).

---

## 1. Typologie à trois axes

### 1.1 Axes et précisions opérationnelles

Les axes sont ceux du cadre (§2.2). Les précisions ci-dessous les rendent mesurables sans les modifier.

| Axe | Valeurs (cadre) | Précision opérationnelle |
|---|---|---|
| A1. Plan global explicite | oui / non | Une description des interactions, ordonnée globalement, existe. On note sa **localisation** : (a) artefact externe antérieur à l'exécution (type global, diagramme de chorégraphie); (b) détenu par un agent (plan de l'orchestrateur); (c) absent. (a) et (b) valent « oui ». |
| A2. Contrôle central à l'exécution | oui / non | Un agent désigne, à l'exécution, l'acteur ou l'action suivante d'autres agents et observe l'avancement. Un séquenceur de simulation qui ne choisit pas le contenu (ordre tiré au hasard, graine journalisée) n'est pas un contrôle central; il est déclaré (section 2.1). |
| A3. Médium | aucun (messages dirigés) / état partagé persistant / diffusion éphémère | Messages à destinataire désigné; traces lisibles après coup dans un état partagé (demi-vie ≥ durée de la tâche); signaux perçus localement qui s'effacent (demi-vie < durée de la tâche). |

Quatre régimes en découlent (cadre §2.2) : **orchestration** (A1 oui, A2 oui), **chorégraphie spécifiée** (A1 oui, A2 non), **auto-organisation stigmergique** (A1 non, A2 non, état partagé persistant), **auto-organisation par signaux directs** (A1 non, A2 non, diffusion éphémère). Trois **régimes hybrides** (Déf. 4) et une **référence nulle** (aucun canal) complètent la grille; on ne les force pas dans les quatre cases.

### 1.2 Définitions

Soit S = (A, M, 𝓡) : agents A, médiums M (messages adressés, diffusions, traces persistantes), règles locales 𝓡 = {r_a}, où r_a fait passer l'agent a d'une observation locale à une action. Tr(S) désigne l'ensemble des traces d'exécution. Les définitions 1 à 4 sont une construction du dossier x-choregraphie [I], appuyée par les sources citées.

**Définition 1. Orchestration.** Il existe un agent o ∈ A tel que (i) o détient une représentation explicite du plan global P; (ii) toute action d'un agent a ≠ o qui fait progresser P est déclenchée par un message adressé de o, ou s'y rattache causalement; (iii) o observe l'avancement de P. Exemples : saga à composant d'exécution central [Garcia-Molina et Salem 1987], §3-6; processus d'orchestration BPMN [OMG 2013], §11.1, p. 315; agent principal et sous-agents [Hadfield et al. 2025].

**Définition 2. Chorégraphie spécifiée.** Il existe un artefact global G (chorégraphie, type global, diagramme de chorégraphie) tel que : (i) G préexiste à l'exécution et réside hors de tout agent (la spécification exclut tout contrôleur central, toute entité responsable et tout observateur [OMG 2013], §7.2.1, p. 23); (ii) chaque règle locale est obtenue par projection, r_a = proj(G, a), ou vérifiée conforme à proj(G, a); (iii) la correction est **logique** : un théorème relie Tr(S) aux traces de G (correspondance de la projection de points d'extrémité, absence d'interblocage par construction) [Carbone et Montesi 2013]; [Honda et al. 2008] [R]; (iv) G satisfait une condition de réalisabilité locale (BPMN : l'initiateur d'une activité de chorégraphie doit avoir participé à l'activité précédente [OMG 2013], §11.5.6, p. 335). La garantie porte sur l'ordre des messages, jamais sur la justesse d'un contenu généré [I]. Des conditions de passerelle écrites en langue naturelle donnent des chorégraphies sous-spécifiées et non exécutables [OMG 2013], §11.7.1, p. 344 : c'est le cas par défaut des agents LLM [I].

**Définition 3. Chorégraphie émergente.** (i) Aucun artefact global prescriptif n'existe, ni dans un agent, ni dans le médium, ni chez le concepteur sous une forme projetable; le motif global n'est défini que par un observateur, comme attracteur ou statistique de Tr(S); (ii) les r_a ne lisent que de l'information locale [Camazine et al. 2001] [R], souvent une trace dans un médium, avec P(action ∣ trace) > P(action) [Heylighen 2016a], §2, p. 7; (iii) la correction est **statistique et dynamique** (probabilité d'un bon résultat, temps de décision, robustesse), jamais garantie par construction. Le « chorégraphe » est la sélection naturelle chez l'insecte et le concepteur du prompt et des protocoles chez l'agent (cadre §2.2). Une chorégraphie spécifiée *prescrit* une émergence (les chorégraphies se lisent comme des descriptions de comportements émergents souhaités [Montesi 2023], ch. 4 [R]); l'émergente n'en prescrit aucune.

**Définition 4. Régimes hybrides.** (a) *Tableau noir contrôlé* : médium stigmergique et modules de contrôle qui choisissent le focus d'attention [Nii 1986], p. 44. (b) *Annonce et auto-sélection* : un agent publie une demande sur un médium, des agents autonomes se portent volontaires [Salemi et al. 2025] [R]; le but est orchestré, l'affectation est émergente. (c) *Amplification individuelle* : un individu informé propose, le groupe amplifie, vérifie ou filtre [Feinerman et Korman 2017].

### 1.3 Placement sourcé

Les protocoles (A2A, MCP) ne sont pas des régimes : on place leurs primitives natives et on classe la **configuration d'usage** avec les indicateurs de la section 2. Cette table amorce le jeu de données de typologie de la fiche S0 (critère CS0.10 : au moins 20 entrées, dont 3 par régime principal, chacune avec A1, A2, A3, étiquette, niveau de lecture et justification).

| Objet | A1 plan | A2 contrôle central | A3 médium | Régime | Source |
|---|---|---|---|---|---|
| Processus d'orchestration BPMN | oui (b) | oui (moteur) | messages dirigés | Orchestration | [OMG 2013], §11.1 |
| Diagramme de chorégraphie BPMN | oui (a) | non | messages dirigés; aucune donnée centrale | Chorégraphie spécifiée | [OMG 2013], §7.2.1, §11.3, §11.5.6 |
| WS-CDL | oui (a) | non | messages dirigés | Chorégraphie spécifiée | [Kavantzas et al. 2005], §1, §1.5 : Candidate Recommendation du 2005-11-09, jamais promue; n'est pas un langage exécutable |
| Types de session multipartites | oui (a : type global) | non | messages dirigés | Chorégraphie spécifiée | [Honda et al. 2008] [R]; preuves de sûreté corrigées par [Scalas et Yoshida 2019] [R] |
| Programmation chorégraphique (Chor, Choral, Pact) | oui (a) | non | messages dirigés | Chorégraphie spécifiée | [Montesi 2013]; [Carbone et Montesi 2013]; [Giallorenzo et al. 2024]; Pact ajoute choix et préférences d'agents [Gopinathan et al. 2026] (résumé de présentation) |
| Saga avec composant d'exécution | oui (b : suites T₁…Tₙ ou T₁…Tⱼ Cⱼ…C₁, détenues par le composant d'exécution) | oui (composant central) | messages dirigés | Orchestration | [Garcia-Molina et Salem 1987], §3-6 : décrite en mode centralisé par économie de place, non par restriction conceptuelle; borne de j [à confirmer] |
| Saga chorégraphiée par événements | non en artefact : le flux n'est écrit dans aucun texte de programme [I] | non | diffusion d'événements (journal ou pub/sub) | **Chorégraphie implicite** : se classe par C_spec | [Richardson s.d.]; [Fowler 2017]; compensation gérée à l'intérieur d'un seul participant [OMG 2013], tableau 11.6, p. 340 |
| Tableau noir de Nii (modèle) | non | non (aucun flux de contrôle : les sources s'activent d'elles-mêmes) | état partagé persistant | Stigmergique | [Nii 1986], p. 39 et fig. 1 |
| Tableau noir de Nii (cadre opérationnel) | non | oui, sur l'activation (cycle de contrôle en quatre étapes) | état partagé persistant | Hybride (tableau noir contrôlé) | [Nii 1986], p. 43-44; focus-of-control de Hearsay-II [Erman et al. 1980] [R] |
| Piste de fourmi | non | non | état partagé persistant (champ spatial de marqueurs; durée de vie ≈ 30 min, de l'ordre de l'expérience) | Stigmergique | [Heylighen 2016a], §2-3; [Heylighen 2016b], §3-5; [Goss et al. 1989], p. 580 |
| Danse frétillante | non | non | diffusion éphémère (la suiveuse tire une danseuse au hasard) | Signaux directs | classement du cadre §2.2; [Seeley et al. 1991]; stigmergie transitoire ou communication directe : non tranché (section 9) |
| Signal d'arrêt (*Apis*) | non | non | diffusion éphémère (contact vibratoire, ciblé sur les danseuses d'autres sites à l'essaimage) | Signaux directs | [Seeley et al. 2012]; [Marshall et al. 2009], §8 |
| Contacts antennaires (*Pogonomyrmex*) | non | non | diffusion éphémère (taux de contacts dans le nid, sans piste) | Signaux directs | [Prabhakar et al. 2012] |
| Quorum (*Temnothorax*, *Apis*) | non | non | diffusion éphémère (perception locale de densité); le quorum est une **règle de seuil**, non un médium | Signaux directs | [Pratt 2005a]; [Seeley et Visscher 2004]; [Marshall et al. 2009], §5 |
| Tandem (*Temnothorax*) | non | non | messages dirigés (1:1, boucle fermée) | Auto-organisation (A3 « messages » n'est pas propre aux chorégraphies spécifiées) | [Franks et Richardson 2006] |
| A2A 1.0 | non imposé | non imposé; modèle de tâche client → agent distant, agents opaques | messages dirigés (sondage, flux, notifications) | Protocole | [A2A 2026], §1.2; [A2A 2026b] (v1.0.0 du 2026-03-12; v1.0.1 du 2026-05-28) |
| MCP (2026-07-28) | non imposé | non imposé; client → serveurs d'outils et de ressources, noyau sans état | messages client-serveur; ressource partagée possible (`subscriptions/listen`, `ttlMs`) | Protocole; un tableau noir s'y construit par-dessus [I] | [MCP 2026] |
| Orchestrateur LLM (agent principal et sous-agents) | oui (b : plan élaboré en cours d'exécution) | oui | messages dirigés | Orchestration | [Hadfield et al. 2025] |
| Tableau noir LLM | non | variable : central pour le but chez [Salemi et al. 2025] [R]; sélection selon le contenu chez [Han et Zhang 2025] [R]; file de tâches sans contrôleur central chez [Mao et Mirhoseini 2026] [R] | état partagé persistant | Hybride (annonce et auto-sélection; tableau noir contrôlé) | citées; les trois systèmes réalisent le régime hybride de Nii [I] |
| Stigmergie entre agents LLM | non | non | état partagé persistant (environnement) | Stigmergique | [Pal et al. 2026] [R] |
| Agents indépendants + vote final, sans canal | non | non (agrégation finale seulement) | aucun | **Référence nulle** de G | [Li et al. 2024] : vote indépendant sans communication |

### 1.4 Règle de classement à partir des journaux

La classification combine l'architecture **déclarée** (qui détient un plan, quel artefact G existe) et le journal : A1 ne se lit pas dans un journal seul.

| Ordre | Condition | Régime |
|---|---|---|
| 1 | ∃ o : C_ctrl(o) ≥ 0,5 **et** plan détenu par o | Orchestration |
| 2 | G externe vérifiable (C_spec : e = 1) **et** χ = 1 | Chorégraphie spécifiée |
| 3 | pas de G; C_ctrl < 0,5; C_med ≥ 0,5; C_mem ≥ 1 | Auto-organisation stigmergique |
| 4 | comme 3, avec C_mem < 1 | Auto-organisation par signaux directs |
| 5 | C_med ≥ 0,5 et un module sélectionne l'acteur, ou le but est publié par un agent et l'affectation se fait par auto-sélection | Hybride |
| — | aucun canal; score = agrégat des actions isolées | Référence nulle |

Les seuils de 0,5 sont des propositions [I] tirées du tableau d'indicateurs de x-choregraphie; H0.2 de la fiche S0 les met à l'épreuve. C_stig confirme le mécanisme de stimulation mais ne départage pas les régimes 3 et 4 : la danse stimule aussi.

Exemples (section 2.2) [I, calcul] : le run orchestré (C_ctrl = 0,90, plan détenu par o) tombe à l'étape 1; la chorégraphie à 3 rôles (C_ctrl = 0,40, χ = 1) à l'étape 2. Le pont de [Goss et al. 1989] a C_med = 1, mais C_mem ≈ 1 : la durée de vie de la piste (≈ 30 min) est de l'ordre de celle de l'expérience; le classement entre les étapes 3 et 4 dépend de T_tâche, fixé d'avance.

### 1.5 Problème inverse : projection contre émergence

Soit Φ une propriété globale : **logique** (sûreté ou vivacité : « aucun interblocage », « ordre conforme à G ») ou **statistique** (P(Tr ∈ E) ≥ 1 − δ, p. ex. « le meilleur site est choisi avant T »). Soit 𝓡_loc(M) la classe des familles de règles locales : chaque r_a lit seulement son état et ce que le médium M lui donne à portée (R_port, section 3), mémoire bornée, anonymat optionnel. Soit Π une classe de perturbations (retrait de 30 % des agents, changement d'environnement, bruit de canal).

- **Problème direct (projection).** Donné G bien formé : calculer r_a = proj(G, a) tel que Tr(S) ⊆ Tr(G) et que le progrès soit garanti. Résolu pour les types de session multipartites et la projection de points d'extrémité sous condition de réalisabilité [Carbone et Montesi 2013]; [Honda et al. 2016]; [Scalas et Yoshida 2019] [R]. Le coût est la restriction de G aux chorégraphies réalisables.
- **Problème inverse.** Donné (Φ, 𝓡_loc(M), Π, δ) : trouver R ∈ 𝓡_loc(M) tel que, pour tout π ∈ Π, P_{S(R),π}(Φ) ≥ 1 − δ, éventuellement en minimisant un coût C. Aucun G n'est donné; il n'existe pas de théorème r_a = proj(G, a); la correction s'établit par simulation et, quand il existe, par le modèle de champ moyen. Trois niveaux de réponse : (n1) *existence* (la classe contient-elle un R?); (n2) *synthèse* (construire R à partir de Φ); (n3) *écart de réalisation*. Des bornes formelles existent pour des Φ précises : borne inférieure Ω(log n) et algorithme optimal O(log n) pour le consensus de déménagement [Ghaffari et al. 2015] (p5-quorum, §7 point 8).
- **Écart de réalisation.** À instance d'environnement e et budget B égaux : Δ_PE(Φ) = P(Φ ∣ S_proj) − P(Φ ∣ S_émerg), accompagné du rapport de coûts κ_PE = C(S_émerg)/C(S_proj) et de l'écart de robustesse ΔRob_PE (section 5.1). C'est la grandeur d'un des compléments proposés à la fiche S0 (section 8.2).

Le programme ne vise pas la solution générale du problème inverse (question de recherche de P7, cadre §2.2); il en fixe l'énoncé et les trois grandeurs à rapporter. Statut : *Hypothèse de l'auteur*.

---

## 2. Indicateurs de régime

Les C_* sont des **diagnostics lus dans les journaux** : ils décrivent le régime réalisé. Les composantes de R (section 3) sont des **paramètres de canal** : on les manipule, puis on les mesure.

### 2.1 Journal minimal

L'enregistreur du noyau produit un journal d'événements typés : **écriture de trace**, **lecture de trace**, **message adressé**, **décision**; les appels LLM ont leur propre journal (`LlmCallRecord`) ([05-spec-simulation.md](05-spec-simulation.md), sections « Enregistreur » et journal d'appels). Les indicateurs exigent au minimum les contenus suivants (noms indicatifs) :

| Événement | Contenu minimal | Sert à |
|---|---|---|
| tous | `runId`, `seed`, `t`, `agent` | appariement; tout |
| décision | `actionId`; `counted` (l'action fait-elle progresser la tâche?); `triggerKind` ∈ {addressed, medium, spontaneous}; `triggerFrom` : liste (agent, poids), ou clé de la trace lue; `designatedBy` (nul si auto-sélection) | C_ctrl (K), C_med |
| message adressé | `msgId`, `sender`, `recipient`; `readers` | R_adr, R_port, C_med |
| écriture de trace | `key`, valeur, `ttl` ou demi-vie d'évaporation, `readers` à l'émission | C_mem, R_pers, R_port |
| lecture de trace | `key`, auteur de l'écriture lue, âge de la trace | C_med, C_stig |
| mesure du canal | `W` (état caché pertinent), `decoded` (message décodé D(M)) | R_eff |
| appel LLM | `responseModel`, `response.stopReason`, `response.usage`, `latencyMs`, `costUsd` | coût, issues, non-stationnarité; désactiver les *fallbacks*, qui changent de modèle [Anthropic 2026b] |
| fin de run | `outcome` (issue codée, section 5.3) | G, échecs |

Règle d'attribution : une action est **déclenchée par b** si l'événement qui la rend possible est la réception d'un message adressé de b; plusieurs messages se partagent le déclenchement à parts égales. L'écriture d'une consigne adressée dans un médium (assignation par tableau) compte comme message adressé; l'auto-sélection d'une tâche affichée ne compte pas.

### 2.2 Les six indicateurs

**C_ctrl, centralité de contrôle.**
- *Définition.* C_ctrl = max_b (1/K) Σ_k w_{k,b}, où w_{k,b} ∈ [0, 1] est la part du déclenchement de l'action k attribuée à b et K le nombre d'actions comptées. Attendu (x-choregraphie, §2.3) : ≈ 1 pour l'orchestrateur; < 1/2 pour une chorégraphie spécifiée; ≈ 0 pour une émergente.
- *Estimateur.* Lecture de `triggerFrom`; IC à 95 % par bootstrap sur les runs (l'unité statistique est le run, section 4.5).
- *Exemple* [I, calcul]. Orchestré (1 orchestrateur, 9 ouvriers, 30 tours; 300 actions) : 270 actions d'ouvriers sont déclenchées par o; les 30 actions de o le sont par les 9 retours (1/9 chacun) : C_ctrl = 270/300 = 0,90. Chorégraphie à 3 rôles et 5 messages (B→S commande, S→H expédie, H→B livré, B→S paie, S→B reçu) : 0,40. Un rôle-pivot de chorégraphie qui rejoue la même trace (1 pivot, 9 satellites, 30 tours) obtient aussi 0,90 : seule la localisation du plan (A1, lue dans C_spec) le distingue de l'orchestrateur.
- *Limite.* C_ctrl mesure la centralité, non le plan : un rôle-pivot d'une chorégraphie atteint la même valeur sans orchestrer. La règle « < 1/2 » est donc une propriété attendue, non un critère suffisant; on lit C_ctrl avec C_spec. Un **orchestrateur caché** (boucle d'appel, utilisateur) n'est pas un agent du journal : le déclarer, sinon C_ctrl est sous-estimé (x-choregraphie, §6, ligne « Contrôle ») [I].

**C_spec, spécification.**
- *Définition.* C_spec = (e, χ) : e ∈ {0, 1} vaut 1 seulement si un artefact global G, **externe aux agents**, est vérifiable à l'exécution (un plan détenu par un agent, celui d'un orchestrateur, donne e = 0 et se lit par l'architecture déclarée); χ est la fraction de traces conformes à G (défini seulement si e = 1).
- *Estimateur.* Moniteur (automate ou type global projeté) qui accepte ou rejette chaque trace; χ̂ = conformes/total, IC de Wilson. Pour une chorégraphie spécifiée, χ = 1 est attendu : toute violation est un bogue d'implantation ou un G non réalisable.
- *Exemple* [I, calcul]. Saga à n = 3, quatre exécutions équiprobables (aucune panne; panne en T₁, T₂ ou T₃); formes admises : T₁T₂T₃, ∅, T₁C₁, T₁T₂C₂C₁ (borne de j : 0 ≤ j < n [à confirmer], [Garcia-Molina et Salem 1987], §1). Implantation correcte : χ = 1. Si la compensation après une panne en T₃ s'exécute C₁ puis C₂ : χ = 3/4 = 0,75.
- *Limite.* χ mesure la conformité à G, pas la justesse du contenu (x-choregraphie, §6, ligne « Garantie »).

**C_med, médiation.**
- *Définition.* C_med = N_méd / (N_méd + N_msg) : N_méd compte les dépendances causales écriture → lecture sur un médium (a écrit une trace, b l'a lue puis a agi); N_msg compte les dépendances par message adressé.
- *Estimateur.* Appariement des écritures et des lectures de trace et des `msgId`; IC par bootstrap sur les runs.
- *Exemple* [I]. Pont de [Goss et al. 1989] (dépôts de phéromone seulement) : C_med = 1. Orchestré : 0. Tandem : 0.
- *Limite.* Le médium se définit par modèle (champ de phéromone, tableau, bus). Un contrôle central exercé par le médium se lit par la règle d'attribution de 2.1 et par C_spec.

**C_stig, stimulation.**
- *Définition.* C_stig = P(action ∣ trace) / P(action) [Heylighen 2016a], §2, p. 7, « trace » étant la condition de lecture locale (intensité ≥ seuil) et P(action) la fréquence de base à occasion égale, sans trace.
- *Estimateur.* Rapport de proportions sur les occasions d'agir, IC à 95 % par bootstrap. En simulation, version **causale** par intervention, graines communes : P(action ∣ trace présente) / P(action ∣ trace effacée).
- *Exemple* [I, calcul]. Fonction de choix de Deneubourg, P_A = (k + A)ⁿ / [(k + A)ⁿ + (k + B)ⁿ], n = 2, k = 20 [à confirmer], A et B passages cumulés (cadre §2.4 point 3). Sans trace : P = 1/2. Avec A = 20, B = 0 : P = 0,80, C_stig = 1,6. Avec A = 40, B = 0 : 0,90, C_stig = 1,8. Borne : 1/P(action) = 2.
- *Limite.* Une cause commune (environnement partagé) peut fabriquer C_stig > 1 : exiger l'intervention. L'indicateur est borné par 1/P(action) et ne distingue pas piste et danse.

**C_mem, persistance.**
- *Définition.* C_mem = τ½ / T_tâche, où τ½ est la demi-vie d'une trace (temps médian de lisibilité) et T_tâche la durée caractéristique de la tâche, déclarée avant l'analyse. C_mem < 1 : transitoire; > 1 : persistant [Heylighen 2016b], §4.
- *Estimateur.* Ajustement exponentiel de l'intensité déposée (τ½ = ln 2 / ρ̂) ou, pour un TTL, durée médiane de lisibilité.
- *Exemple 1 : convention de ρ* [I, calcul]. Ant System : τ ← ρτ + Δτ, ρ est la **persistance** [Dorigo et al. 1996]; la forme τ ← (1 − ρ)τ + Δτ est une convention postérieure (cadre §2.4 point 4). Pour ρ = 0,9, τ½ = 6,58 pas dans le premier cas, 0,30 pas dans le second : rapport ≈ 22 pour le même symbole.
- *Exemple 2 : unité de ρ* [I, calcul]. [Dussutour et al. 2009] [non vérifiée] : dc/dt = pΦq − ρc avec ρ = 0,00085, unité non énoncée [à confirmer] (dossier p1-recrutement). τ½ = ln 2 / ρ = 815 unités. Avec T_tâche ≥ 250 min [à confirmer] : si ρ est en s⁻¹, τ½ = 13,6 min et C_mem = 0,054 (transitoire); si en min⁻¹, τ½ = 13,6 h et C_mem = 3,3 (persistant). L'unité décide du régime : à confirmer avant tout calcul de C_mem sur ce cas.
- *Limite.* Le choix de T_tâche est arbitraire; il se préenregistre.

**C_amp, amplification.**
- *Définition.* C_amp = P(Y = x₍₁₎), où Y est l'issue collective et x₍₁₎ la première proposition complète émise par un individu (ordre du journal). Élevé : amplification; faible : émergence forte [Feinerman et Korman 2017].
- *Estimateur.* Fréquence sur les runs, IC de Wilson. **Se lit contre la référence « vote indépendant »** : C_amp,int = C_amp(a) − C_amp(vote sans canal).
- *Exemple* [I, calcul]. Vote majoritaire de 5 agents indépendants, p = 0,6 : P(Y = x₁) = 0,7024 sans aucune interaction. Un C_amp de 0,70 ne dit donc rien de l'amplification : c'est de l'agrégation.
- *Limite.* Exige des propositions initiales identifiables; pour une issue continue, définir un seuil de distance avant l'analyse.

### 2.3 Validation

Le dossier x-choregraphie (question ouverte 5) demande de valider C_ctrl, C_med et C_amp sur un cas d'école par régime avant de les publier. La fiche S0 porte ce test : hypothèse H0.2, expérience E0.1 (six cas d'école), cibles T0.33 et T0.34, critère CS0.9. Cas attendus : saga orchestrée et saga chorégraphiée par événements, chorégraphie projetée à 3 rôles, pont de Goss (stigmergique), modèle de danse et de quorum (signaux directs), tableau noir contrôlé (hybride). Le **rôle-pivot** de chorégraphie (section 2.2, C_ctrl) doit en faire partie : H0.2 pose que C_ctrl ordonne les régimes, ce que le pivot met en défaut (section 9).

---

## 3. R, la richesse du signal : un vecteur

R n'est ni une échelle ni un attribut du taxon (cadre §4). On ne classe jamais fourmi < abeille < LLM : cet ordre est une hypothèse, non un constat (x-choregraphie, §9 point 7).

### 3.1 Les cinq composantes

| Composante | Définition | Estimateur | Exemple |
|---|---|---|---|
| **R_nom** (nominale) | capacité du message : log₂ ∣M∣ bits; pour le texte, plafond de jetons (les bits nominaux d'un texte dépendent du vocabulaire et ne sont pas définis ici) | par conception : alphabet, schéma, plafond | L0 : entier 0 à 9 = 3,32 bits; L1 : (8 secteurs × 4 distances × 4 qualités) = 7 bits; L2 : texte ≤ 30 jetons; L3 : ≤ 300 jetons (dossier p7-agents-llm, §6.2) |
| **R_eff** (effective) | I(M ; W) / H(W) ∈ [0, 1], W l'état caché pertinent pour la décision (identité ou position du meilleur site) | comptage « plug-in » avec correction de biais par permutation (soustraire la moyenne de Î sur W permuté), IC par bootstrap sur les runs; pour un décodeur D, Î(D(M) ; W) ≤ I(M ; W) (traitement des données) : borne inférieure | section 3.2 |
| **R_pers** (persistance) | temps médian de lisibilité d'un signal (piste : ln 2 / ρ par pas; danse : durée de l'épisode; LLM : TTL du tableau) | ajustement exponentiel ou lecture du TTL; normalisé : C_mem | piste ≈ 30 min [Goss et al. 1989], p. 580, au moins 40 à 60 min chez *Lasius niger* [Grüter et al. 2012]; danse : 1,5 à 2 min dans le compartiment « danse » [Seeley et al. 1991], tableau 2, T2 et T6, ce qui n'est pas la durée de vie du signal; rapport ≈ 15 à 20 [I] |
| **R_port** (portée) | fraction des agents qui peuvent percevoir un signal **au moment de son émission** (dossier p7-agents-llm, §6.2) | moyenne de ∣`readers`∣/(N − 1) sur les émissions | N = 10 : tandem 1/9 = 0,11; diffusion à tous : 1; piste : quiconque passe [I] |
| **R_adr** (adressage) | fraction des messages dont le destinataire est désigné par l'émetteur | N_adressés / N_messages | piste 0; danse 0 (auditoire auto-sélectionné); tandem 1; message A2A 1 [I] |

R_port est séparée de R_pers : l'audience cumulée sur la vie d'un signal dépend des deux et n'est pas une composante. La classification de la localité (contact : local en espace et en temps; phéromone volatile : en temps seulement; stigmergie : en espace seulement) est celle de [Feinerman et Korman 2017].

Pour une variable cachée continue (position, distance), W se discrétise en classes fixées d'avance; le biais de Î croît avec le nombre de classes : la sensibilité s'y rapporte.

### 3.2 Exemples chiffrés de R_eff

Valeurs d'exemple déclarées; calculs dans le script de contrôle [I, calcul].

1. **Canal à 8 secteurs bruité.** Le secteur transmis est correct avec probabilité 0,75, sinon uniforme sur les 7 autres : I = 3 − [h(0,25) + 0,25 log₂ 7] = 1,487 bit, R_eff = 0,496. R_nom du format L1 vaut 7 bits : R_nom ≠ R_eff.
2. **Direction de la danse.** 8 secteurs de 45°, erreur angulaire gaussienne d'écart-type 15°, valeur d'exemple prise dans la plage de 10 à 15° rapportée par [Okada et al. 2014] [R] : P(secteur correct) = 0,866, I = 2,30 bits, R_eff = 0,77 pour un W uniforme sur 8 secteurs. Des mesures en bits existent pour la danse : environ 2,0 bits de direction [Haldane et Spurway 1954] [à confirmer : contenu non lu], et, selon une estimation plus récente absente de la bibliographie, 2,9 bits de direction et 4,5 bits de distance [à confirmer] (audit lacunes, L02).
3. **Plafond de capacité.** R_eff ≤ R_nom / H(W) : L0 face à 8 sites (3 bits) ne contraint pas (3,32/3 > 1); face à 16 sites (4 bits) il plafonne à 0,83.
4. **Biais d'estimation.** Avec ∣M∣ = ∣W∣ = 8 et N = 1000, le « plug-in » surestime I de 0,036 bit sous indépendance (théorie : (∣M∣ − 1)(∣W∣ − 1)/(2N ln 2) = 0,035); la correction par permutation ramène ce biais à ≈ 0 et estime 1,494 bit pour une valeur vraie de 1,487 (moyenne de 40 répétitions).

Pour le texte libre (L2, L3), D est un analyseur déterministe ou un juge LLM figé validé contre annotation humaine (κ ≥ 0,7) [dossier p7-agents-llm, §6.2]. Un décodeur LLM introduit son propre biais : question ouverte (compléments proposés, section 8.2).

### 3.3 Manipuler chaque composante séparément

| Composante | Insectes (modèles) | Agents LLM | À tenir constant |
|---|---|---|---|
| R_nom | nombre de niveaux d'intensité ou de classes de direction | format à modèle fixe : L0 scalaire, L1 tuple, L2 ≤ 30 jetons, L3 ≤ 300 jetons (cadre §4) | R_eff, R_pers, R_port |
| R_eff | bruit de canal injecté : dispersion angulaire σ de la danse (0 à 60° dans le plan de p1-recrutement, cible C7), probabilité de corruption ε | corruption du message par l'**environnement** avec la probabilité ε, identique pour tous les formats; non par la température, non réglable sur les modèles récents (cadre §2.4 point 16; [Anthropic 2026b]) | R_nom |
| R_pers | évaporation (dc/dt = pΦq − ρc [Dussutour et al. 2009] [non vérifiée]; dans le noyau, demi-vie `t_half`); durée de danse et abandon de la source [Seeley et al. 1991] | TTL du tableau; décroissance de poids (facteur 0,995 par heure de jeu pour la récence [Park et al. 2023]); `ttlMs` de [MCP 2026] est un indice de fraîcheur, non une décroissance d'intensité | règles de réponse (ci-dessous) |
| R_port | rayon de perception, densité de contacts, nombre de danseuses échantillonnées par une suiveuse | visibilité : tous, ou sous-ensemble tiré avec graine journalisée | R_adr |
| R_adr | dépôt anonyme contre transfert 1:1 acquitté (tandem) | tableau contre message adressé (A2A) | R_port |

**Règles de réponse, hors de R.** L'exposant n de la fonction de choix, l'abandon individuel f_x et l'encombrement sont des règles de réponse, non des composantes du canal : le verrouillage des fourmis ne vient pas de la seule persistance (dossier p1-recrutement, §6) et l'encombrement rétablit la flexibilité malgré une piste persistante [Grüter et al. 2012]. On les tient fixes ou on les croise comme facteur distinct.

**Contrôles propres aux LLM.** Plafonner les jetons ou imposer un schéma (la verbosité fait croître la richesse avec le modèle); mesurer longueur et entropie par message; au moins trois paraphrases d'invite comme facteur aléatoire (audit methodologie, P7-d).

**Contrôle de découplage** (complément proposé, section 8.2). On manipule un levier, on mesure les cinq composantes, et la matrice d'effets doit être quasi diagonale. R_eff n'est pas un réglage : c'est une mesure de l'enregistreur sur le journal du canal ([05-spec-simulation.md](05-spec-simulation.md)); les réglages sont le bruit de canal, le format, la persistance, la portée et l'adressage.

### 3.4 Usage dans QR0

QR0 devient : comment G_int varie-t-il avec R_eff, à R_pers, R_port et modèle fixés, selon l'environnement. La littérature apicole répond déjà que le bénéfice dépend de l'habitat : [Sherman et Visscher 2002]; [Donaldson-Matasci et Dornhaus 2012]; [Beekman et Lew 2008]; [Okada et al. 2014]; [I'Anson Price et al. 2019]. On reproduit d'abord, puis on transpose. Plus de signal n'implique pas plus de gain : le débat est une martingale et le vote explique l'essentiel du gain attribué au débat [Choi et al. 2025a]; le gain n'est pas monotone en nombre d'appels [Chen et al. 2024a]. La comparaison entre fourmi, abeille et LLM reste descriptive (dossier p7-agents-llm, §6.2).

---

## 4. G, le gain collectif

### 4.1 Définition

Pour une instance d'environnement e (graine; mêmes sources, mêmes perturbations, nombres aléatoires communs) et un score S(e) orienté « plus haut = mieux », avec P_x = E_e[S_x(e)] sur les instances appariées et P_max la borne théorique du score, déclarée par scénario [à confirmer] (fiche P7) :

- **Différence appariée** Δ_k(a) = P_a − P_k. La fiche P7 la note **G_int** pour k = ind (gain d'interaction primaire, S_a − S_ind) et **G_fort** pour k = fort (S_a − S_best).
- **G du cadre** (§4) : **G_k(a) = Δ_k(a) / (P_max − P_k)**.

**Budget égal.** Toutes les architectures comparées partagent le même budget B de calcul. B se définit avant les runs (jetons totaux, appels ou dollars) et se préenregistre [OSF 2026]. Chaque cellule rapporte appels, jetons (entrée non cachée, lecture de cache, sortie, raisonnement), latence et dollars (section 5.2).

### 4.2 Trois références préenregistrées

| k | Référence | Ce que Δ_k et G_k mesurent |
|---|---|---|
| ind | Mêmes agents, **sans canal** : chaque agent agit seul, le score est l'agrégat de ses actions (récolte totale; vote non interactif pour une décision) | ce que la communication ajoute à la juxtaposition (G_int de la fiche P7, primaire) |
| fort | **Agent unique à budget égal** : le modèle le plus fort seul, ou auto-cohérence à k tirages avec k = B / coût d'un tirage | la synergie forte (G_fort) : le groupe bat-il son meilleur membre à budget égal? |
| règles | **Colonie à règles** : le modèle biologique publié du scénario (fonction de choix, seuils de réponse, quorum), exécuté dans le même environnement, à N = 10 apparié **et** à N biologique | l'agent LLM apporte-t-il quelque chose de plus que la règle publiée? |

Sources : dossier p7-agents-llm, §6.1 et corrections C11 et C12; cadre §4. Le **témoin orchestré** (QR3) est un bras, non une référence : on le compare par la différence P_chorégraphie − P_orchestré à budget égal.

### 4.3 Décomposition agrégation / interaction

Pour une issue qui est une décision agrégeable, soit P_vote le score des mêmes agents indépendants avec vote final (cadre de [Choi et al. 2025a] transposé [I]) :

- Δ_ind = Δ_agg + Δ_com, avec Δ_agg = P_vote − P_ind (effet de l'agrégation) et Δ_com = P_a − P_vote (effet de la communication, l'« interaction » du cadre §4);
- G_agg = Δ_agg / (P_max − P_ind) et G_com = Δ_com / (P_max − P_ind);
- **G_ind = G_agg + G_com exactement, si les deux termes partagent le dénominateur P_max − P_ind.** Normaliser G_com par (P_max − P_vote) casse l'additivité.

Pour l'allocation de l'effort (P1, P3), le vote n'a pas d'équivalent : G_agg est déclaré non défini et Δ_com = Δ_ind. Le terme Δ_com n'est pas le « G_int » de la fiche P7, qui désigne le gain total contre la référence sans canal (section 7, entrée « gain »).

### 4.4 Exemple chiffré

Valeurs de la Fig. 3 de [Sasaki et al. 2013] numérisées par le dossier p8-individu-colonie (lecture de figure, ±0,01 [à confirmer]); *Modèle simplifié*, **non apparié en budget** (une fourmi contre une colonie). À une différence de qualité d = 5 % : P_ind = 0,590, P_col = 0,651. Un jury de 7 individus indépendants atteint P_vote = 0,691. D'où [I, calcul] :

- différences : Δ_ind = +0,061 = Δ_agg +0,101 + Δ_com −0,040;
- normalisées : G_ind = (0,651 − 0,590) / (1 − 0,590) = **+0,149** = G_agg **+0,245** + G_com **−0,097**.

Lecture : le gain apparent de la colonie sur l'individu vient entièrement de l'agrégation; la communication (quorum et rétroaction positive) retire 0,040 (0,097 normalisé). Le nombre de votants indépendants équivalents à la colonie est n_eff = 5 (plus petit n impair tel que Maj_n(P_ind) ≥ P_col).

### 4.5 Propriétés

1. G = 0 si P_a = P_k; G = 1 si P_a = P_max; G < 0 si le collectif fait pire que la référence. Borné par 1 au-dessus, **non borné au-dessous**.
2. Invariant par transformation affine du score (S → αS + β, α > 0); non invariant par transformation monotone non linéaire (log-cote).
3. **Rapport de moyennes** par défaut, avec IC par rééchantillonnage apparié des instances e. La version par instance n'est admise que si P_max(e) − P_k(e) ≥ ε, fixé d'avance. La moyenne de classe et la moyenne des gains individuels diffèrent en général [Bao 2006] [R].
4. Additivité de la décomposition : G_ind = G_agg + G_com (voir 4.3).
5. **Plafond sous erreurs corrélées.** Toute politique qui renvoie la réponse d'un membre (vote, routeur, cascade) a une précision ≤ 1 − β, β = P(tous les agents échouent) [Chen 2026] [R]. Pour le vote majoritaire à grand n le plafond est plus bas : P(p_i > 1/2). Exemple bêta-binomial (p moyen 0,6, corrélation intra-classe 0,1; modèle de p8-individu-colonie, M2) [I, calcul] : vote à n = 5 : 0,655 contre 0,683 en indépendance; n = 101 : 0,728; limite 0,736; β = 0,030 à n = 5 (borne 1 − β = 0,970 non contraignante). Contrôle d'implantation : précision du vote ≤ 1 − β dans tout run; une violation signale un bogue.
6. Appariement : erreur type de la différence appariée [Miller 2024], éq. 7; erreur type groupée sur le run [Miller 2024], éq. 4; unité statistique : le run, 30 par cellule LLM, 1000 par cellule à règles; correction de Holm [Holm 1979] sur les contrastes primaires (dossier p7-agents-llm, §7.1).
7. Toute affirmation de gain nul (Δ_com ≈ 0, G_int ≈ 0) exige un test d'équivalence avec marge préenregistrée [Lakens 2017], non l'absence de significativité.

### 4.6 Pièges

1. **Plafond.** G est indéfini quand P_ref = P_max et explose près du plafond. Mêmes données que 4.4 [I, calcul] : G = −0,038 à d = 60 %; −1,143 à d = 80 % (Δ = −0,032); −5,714 à d = 90 % (Δ = −0,040); non fini à d = 99 % (P_ind = 1,000). De d = 80 % à 99 %, Δ passe de −0,032 à −0,043 alors que G passe de −1,143 à non fini. **Règle.** On rapporte toujours Δ_k avec son IC. G est déclaré **non défini et jamais chiffré** si l'IC à 95 % de P_max − P_k contient 0 (fiche S0, H0.3); il n'est affiché que si P_max − P_k ≥ 0,1 de l'étendue du score, soit P_ref ≤ 0,9 pour un score sur [0, 1] (fiche P7; p8-individu-colonie, correction du cadre §4) [à confirmer]. On calibre la difficulté pour que l'agent seul soit entre 40 et 80 % (dossier p7-agents-llm, §7.3).
2. **Budget non apparié.** La plupart des résultats favorables aux collectifs ne le sont pas : une fourmi contre 20 à 250 ouvrières [Sasaki et al. 2013]; K = 40 échantillons contre 1, soit ≈ 7,4 × le calcul pour un modèle de 13 G contre un de 70 G [Li et al. 2024] [I]; ≈ 15 × les jetons d'un dialogue, l'usage de jetons expliquant 80 % de la variance de performance sur BrowseComp [Hadfield et al. 2025]. Seuls [Kim et al. 2025a], [Kapoor et al. 2025] et [Snell et al. 2024] contrôlent le budget. Reproduire ces résultats ne valide donc pas G. L'orchestrateur ajoute un appel par tour : compter ses appels.
3. **n nominal ≠ n effectif.** Accord d'environ 60 % entre deux modèles quand ils se trompent tous deux, contre 33 % au hasard (HELM) [Kim et al. 2025]; 9 juges ≈ 2 votes effectifs [Kohli 2026] [R]; monoculture générative [Wu et al. 2024b] [R]. Avec des causes communes la limite de Condorcet est inférieure à 1 [Dietrich et Spiekermann 2013]. Rapporter n_eff et β mesurés; ne jamais lire G_agg comme un jury indépendant.
4. **Difficulté.** Les résultats pointent dans des directions opposées selon le sens de « difficile » : la colonie gagne aux petites différences [Sasaki et al. 2013]; le vote nuit quand la réponse modale est fausse [Chen et al. 2024a]; la coordination aide sous ≈ 45 % de précision de base et nuit au-delà, à jetons appariés [Kim et al. 2025a]. Un G de signe changeant est attendu : déclarer la difficulté et la précision de l'agent seul.
5. **Forme du gain normalisé.** G a la forme du gain normalisé de Hake, g = (post − pré)/(100 − pré) [Hake 2002]; [Hake 1998]. Sa critique (biais lié au prétest, [Nissen et al. 2018]) et sa défense ([Coletta et Steinert 2020] [R]) se transposent : rapporter la corrélation de G avec P_ref sur les cellules. [Marx et Cummings 2007] [R] proposent un « changement normalisé » qui traite les pertes.
6. **Diversité.** Pour une perte quadratique, l'erreur de l'ensemble égale l'erreur moyenne moins l'ambiguïté [Krogh et Vedelsby 1995] : identité algébrique qui n'établit ni qu'une équipe diverse est meilleure ni que la diversité en est la cause (p8-individu-colonie, M3).
7. **Échelle et non-stationnarité.** N = 10 agents LLM contre 10³ à 10⁶ individus : exécuter les agents à règles aux deux N (dossier p7-agents-llm, C12). Aucun réglage n'est supposé déterministe [Atil et al. 2024] [R]; cellule sentinelle rejouée chaque semaine; cellules entrelacées dans le temps (dossier p7-agents-llm, §7.4).
8. **Données manquantes.** Refus (`stop_reason: "refusal"`) et échecs d'analyse sont des **issues codées**, jamais des valeurs manquantes silencieuses (dossier p7-agents-llm, §7.3).

### 4.7 Déclaration obligatoire

Tout G publié ou affiché porte : la référence k; B et sa composition; N; la difficulté (D1 à D5 de p8-individu-colonie) et P_ref; Δ_k avec IC; G_agg et G_com si définis; n_eff et β; appels, jetons, dollars; nombre de runs, unité statistique, graines; identifiants de modèles et dates; statut confirmatoire ou exploratoire (cadre §6.4).

---

## 5. Robustesse, coût, échecs

### 5.1 Robustesse

**ΔG_π = G^π − G**, où G^π se calcule sous la perturbation π appliquée **de façon identique** à l'architecture et à sa référence, sur les mêmes instances e. Perturbations du cadre (§4) : retrait de 30 % des agents; changement d'environnement (inversion des qualités; ajout tardif d'une meilleure option, p1-recrutement, cible C10; faux signal). On distingue le retrait **aléatoire** du retrait des **informés** (éclaireuses), qui sont deux perturbations. Compléments : temps de récupération t½ (pas nécessaires pour réallouer 50 % de l'effort après inversion) et fraction de G conservée G^π/G (si G > 0 et défini). Quand G n'est pas défini (section 4.6), on rapporte la variation de Δ_k.

*Exemple* [I, calcul]. Vote de N = 10 agents indépendants (p = 0,6, égalité tirée au hasard) : 0,7334; après retrait de 3 agents (n = 7) : 0,7102; variation de la précision : −0,023.

### 5.2 Coût

Le coût est un vecteur : jetons (entrée non cachée, lecture de cache, sortie, raisonnement), appels, latence (médiane et 95e centile), messages échangés (adressés contre écritures de médium), dollars. Efficacité économique : G_$ = G_int / (C_a − C_ind), avec front de Pareto exactitude-coût [Kapoor et al. 2025].

*Modèle de coût du dossier p7-agents-llm* (§8.1) : 300 appels (10 agents, 30 tours), 1200 jetons de cache, 800 d'entrée non cachée, 150 de sortie, plus 300 jetons de raisonnement pour Opus 5.5. Aux tarifs d'[Anthropic 2026b] [à reconfirmer avant exécution] : 0,50 $ (Haiku 4.5), 1,00 $ (Sonnet 5.5), 3,73 $ (Opus 5.5) par exécution [I, calcul]. **Budget égal : à fixer avant les runs.** Le rapport Opus/Haiku par appel vaut 4 si l'on compte seulement les prix (p8-individu-colonie, E8.5 : K = 2 à 4 appels faibles par appel fort), mais 7,45 si le raisonnement facturé compte. L'écart décide du nombre d'appels « faibles » à budget égal.

### 5.3 Échecs

**Issues codées** (communes à G et aux échecs) : succès; erreur de décision; **absence de décision** (interblocage); **décision multiple** (scission); refus; échec d'analyse; boucle sans terminaison; action irréversible sans compensation. L'interblocage n'est pas la scission (cadre §2.4 point 8) : une même dynamique donne l'un ou l'autre selon le quorum par rapport au niveau d'interblocage (≈ 0,46 à v = 2 sans inhibition croisée, [Pais et al. 2013]; dossier p6-pathologies, §4.4) [I].

**Agents : taxonomie MAST** [Cemri et al. 2025] : 14 modes en 3 catégories, 1 642 traces, 7 systèmes, κ = 0,88 entre humains (κ = 0,77 pour le juge LLM). Catégories : FC1 conception (≈ 44 %), FC2 désalignement inter-agents (≈ 32 %), FC3 vérification (≈ 24 %) [I : sommes des prévalences par mode]. Modes de référence : FM-1.3 répétition d'étapes 15,7 %; FM-1.5 conditions d'arrêt ignorées 12,4 %; FM-2.6 décalage raisonnement-action 13,2 %; FM-3.3 vérification incorrecte 9,10 %. On exige κ ≥ 0,70 entre deux annotateurs sur 30 traces avant d'employer un juge LLM (dossier p7-agents-llm, cible R11).

**Colonies : taxonomie P6.** Elle est définie dans [../projets/P6-defaillances-et-defenses.md](../projets/P6-defaillances-et-defenses.md) (section « Taxonomie P6 et relations »), en trois couches : **D** dynamique, **I** identité, **C** canal, plus **X** (mode propre aux agents, sans analogue biologique vérifié). MAST ne couvre que la couche D (même fiche). Ce document fixe le codage minimal des issues ci-dessus et sa correspondance :

| Issue codée | Code P6 | Pathologie de colonie | Instrument |
|---|---|---|---|
| boucle sans terminaison | D1 | moulin [Schneirla 1944], [Erhard et al. 2022] | C_mem; compteur de blocage |
| erreur de décision par cascade | D2 | verrouillage [Goss et al. 1989], [Sasaki et al. 2013] | C_amp,int; C_stig; n_eff |
| absence de décision | D3 | interblocage [Seeley et al. 2012], [Pais et al. 2013] (σ* = 4v³/(v² − 1)²) | taux d'issue |
| décision multiple | D4 | scission [Lindauer 1955] [non vérifiée] | taux d'issue |
| décision détournée (identité) | I1 à I3 | mimétisme [Akino et al. 1999], [Barbero et al. 2009]; pseudo-reine | contrôle d'identité |
| décision détournée (canal) | C1, C2 | faux signal persistant [Aswale et al. 2022]; propagation | taux d'infection; expiration des traces |
| action irréversible sans compensation | X1 | aucun analogue biologique vérifié; sagas [Garcia-Molina et Salem 1987] | C_spec (conformité des compensations) |

Les correspondances MAST mode par mode se testent dans P6 (question QR2d).

**Correspondance des instruments aux catégories MAST** (*Hypothèse de l'auteur*) : FC1 ↔ C_spec (spécification ignorée : χ < 1); FC2 ↔ R_eff et C_stig (information émise mais non utilisée : R_eff bas ou rapport ≈ 1); FC3 ↔ vérification indépendante (section 6, ligne « Vérification ») et n_eff.

---

## 6. Correspondance fourmi / abeille / agentique, révisée

Chaque ligne décrit une **relation** (une fonction dans la coordination), non un terme. Les taxons sont nommés; le canal est une variable du modèle (cadre §2.3). « Où l'analogie casse » est une colonne de plein droit. La colonne « Statut » donne celui de la transposition et, quand elle existe, la cible qui le promouvrait.

### 6.1 Coordination

| Relation | Fourmi (taxon) | Abeille (*A. mellifera*) | Agentique | Où l'analogie casse | Statut |
|---|---|---|---|---|---|
| **Plan et contrôle** | aucun plan global ni contrôle central à l'exécution [Camazine et al. 2001] [R]; [Marshall et al. 2009], §5 | idem; l'essaim a décollé avec la reine en cage (audit bio-abeilles, M6, d'après [Seeley et Visscher 2003]) | spécifiée (type global, BPMN), émergente (tableau noir, stigmergie) ou orchestrée; souvent un orchestrateur [Hadfield et al. 2025] | le « chorégraphe » est la sélection naturelle chez l'insecte, le concepteur chez l'agent; **orchestrateur caché** (harnais, utilisateur) [I] | Analogie (cadre §2.2); H0.2 de la fiche S0 pour les définitions |
| **Médium et portée** | piste de marqueurs persistante (*Linepithema*, *Lasius*; cadre §2.3), plusieurs phéromones de volatilités différentes [Couzin 2009], p. 41; taux de contacts sans piste (*Pogonomyrmex*) [Prabhakar et al. 2012]; tandem 1:1 et transport (*Temnothorax*) | danse : signal local éphémère; la suiveuse tire une danseuse au hasard [Seeley et al. 1991]; contre-exemple à la dichotomie : pistes des Meliponini (cadre §2.3; référence à ajouter à la bibliographie) | tableau noir ou ressource MCP persistant; bus pub/sub transitoire; messages A2A adressés [A2A 2026]; [MCP 2026] | les messages LLM sont adressés, sémantiques, identifiés; les insectes sont anonymes [Feinerman et Korman 2017]; un tableau textuel n'impose aucune localité (tout agent lit tout) [I]; un journal est en ajout seul, sans agrégation ni décroissance : ce n'est pas un champ de phéromone [I, audit choregraphie-agentique] | Modèle simplifié (canal = variable); essai de découplage (section 8.2) |
| **Découplage** (temps, espace, synchronisation) | piste : découplée en temps et en espace [I] | danse : couplée en temps (suiveuse présente) et en espace (piste de danse) [I] | magasin persistant : découplé; appel direct ou canal synchrone : couplé; pub/sub : découplé en temps, en espace et en synchronisation (Eugster et al. 2003, audit choregraphie-agentique; absent de la bibliographie) | l'association « danse = pub/sub » est **inversée** : l'analogue de la danse est une diffusion locale éphémère à auditoire auto-sélectionné [I] | Hypothèse de l'auteur; testée par (R_pers, R_port, R_adr) |
| **Codage du signal** | champ spatial multicomposante : attractif; répulsif (« no entry », *Monomorium pharaonis* [Robinson et al. 2005] [R], réplication non concluante rapportée par l'audit lacunes [à confirmer]); géométrie des bifurcations qui donne la polarité [Jackson et al. 2004]; « scalaire » est une simplification de modèle (cadre §2.4 point 10) | vecteur analogique bruité (angle → azimut, durée → distance) plus qualité par le nombre de circuits [Seeley et al. 1991]; [Frisch 1967]; erreur de 10 à 15° [Okada et al. 2014]; calibration individuelle et non linéaire [Schürch et al. 2016]; [Kohl et Rutschmann 2021]; apprentissage social [Dong et al. 2023]; « symbolique » non établi : écrire « vecteur codé + intensité » | scalaire, tuple, texte plafonné : format manipulé (R_nom); parties A2A : texte, fichiers ou données (audit choregraphie-agentique) [I] | le sens d'un message LLM vit dans la langue; la vérifiabilité par le récepteur est faible; dans les modèles publiés, seule l'intensité pilote l'allocation (p1-recrutement, §6) | Modèle simplifié (bio) / Hypothèse de l'auteur (agents) |
| **Recrutement : annonce et auto-sélection** | masse (*Linepithema humile*) : la recrue suit de façon probabiliste [Goss et al. 1989]; tandem 1:1 en boucle fermée (*Temnothorax*) [Franks et Richardson 2006] | danse 1:n; chaque suiveuse tire une danseuse au hasard; aucune comparaison de sources (2 abeilles sur 117 ont visité les deux mangeoires) [Seeley et al. 1991] | annonce sur un tableau et volontariat [Salemi et al. 2025] [R]; file de tâches partagée [Mao et Mirhoseini 2026] [R] | le recrutement est **tiré** (la recrue choisit et réévalue); une assignation par un mandant est de l'orchestration, c'est le modèle de tâche d'A2A [A2A 2026]; la danseuse ne désigne aucune suiveuse [I] | Analogie appuyée (Salemi); aucune cible T encore |
| **Rétroaction positive** | dépôt dépendant de la qualité; fonction de choix non linéaire n = 2 (*Linepithema humile*) [Goss et al. 1989]; réponse individuelle de type Weber, sigmoïde collectif = ajustement (cadre §2.4 point 3) | recrutement quadratique en rencontres (basculement direct) [Marshall et al. 2009], §6.3; suivi linéaire en temps de danse dans le modèle à 7 compartiments [Seeley et al. 1991] | vote, auto-cohérence, échantillonnage [Li et al. 2024]; débat = martingale [Choi et al. 2025a]; conformité [Weng et al. 2025] | erreurs corrélées : l'amplification amplifie les erreurs communes [Kim et al. 2025]; l'amplification de la fourmi est conditionnée à une source jugée rentable au retour [Feinerman et Korman 2017]; n_eff ≪ n | Modèle simplifié (bio) / Analogie (agents); cibles T1 à T3 du dossier x-choregraphie (fiches P5 et P8) |
| **Décision : quorum, vote, consensus** | seuil sur la densité perçue (rencontres) puis transport ≈ 3 fois plus rapide que le tandem [Couzin 2009], p. 41; basculement par recrutement de 14 % (mauvais → bon nid) contre 3,8 % (inverse), dénominateur à confirmer [Marshall et al. 2009], §8 | quorum au site; décision séparée de l'exécution (vol de l'essaim) [Marshall et al. 2009], §5, §8; signaux d'arrêt ciblés sur les danseuses d'autres sites [Seeley et al. 2012] | k sur n, juges LLM, vote majoritaire, seuil de consensus | le quorum biologique est un seuil local, réglable entre vitesse et justesse [Franks et al. 2003], qui admet la scission; le consensus distribué exige accord, validité et terminaison sous fautes (quorums qui s'intersectent) [I]; n nominal ≠ n effectif (≈ 2 sur 9, [Kohli 2026] [R]); l'asymétrie « quorum seul chez la fourmi » est fausse : les deux espèces ont un quorum [Couzin 2009] | Modèle simplifié; cibles T1 à T4 du dossier x-choregraphie |
| **Modulation globale** | phéromones de reine qui bloquent la reproduction des ouvrières, classe conservée [Oystaeyen et al. 2014] [R] (taxons non relevés), généralité discutée [Amsalem et al. 2015] [R] | phéromones de reine (réponse de cour, [Slessor et al. 1988], source secondaire); inhibition sociale entre ouvrières qui règle la maturation [Huang et Robinson 1992]; [Beshers et al. 2001] [R] | invite système partagée ou configuration diffusée à tous : une contrainte diffusée, non un ordre [I] | l'invite système définit aussi les règles locales r_a : elle est le « chorégraphe » plus qu'une phéromone; une phéromone modulatrice déplace des seuils, elle ne code pas de tâche [I]; « la reine ne commande pas » reste un constat biologique borné, jamais une prescription (cadre §2.1) | Hypothèse de l'auteur |

### 6.2 Dynamique, robustesse, sécurité

| Relation | Fourmi (taxon) | Abeille (*A. mellifera*) | Agentique | Où l'analogie casse | Statut |
|---|---|---|---|---|---|
| **Freinage (inhibition)** | phéromone « no entry » (*M. pharaonis*) [Robinson et al. 2005] [R]; inhibition par encombrement aux sources : bascule en ≈ 10 min malgré une piste persistante d'au moins 40 à 60 min (*L. niger*) [Grüter et al. 2012]; baisse du taux de contacts (*Pogonomyrmex*) [Prabhakar et al. 2012]; décroissance de la piste; bassin limité d'éclaireuses [Couzin 2009], p. 41 | signal d'arrêt : inhibition probabiliste, ciblée sur les danseuses d'autres sites à l'essaimage [Seeley et al. 2012]; au butinage, déclenché par le danger [Nieh 1993] [non vérifiée]; trémulation : recrute des receveuses (de 17 % à 30-50 % de l'effectif mesuré [Seeley et al. 1996]) et freine le recrutement [Seeley 1992] [non vérifiée] | contre-pression pilotée par la demande [Reactive Streams 2026]; limite de concurrence [Netflix 2026]; 429 avec `retry-after` [Anthropic 2026c]; annulation (état CANCELED d'A2A) [A2A 2026]; compensation [Garcia-Molina et Salem 1987] | le signal d'arrêt **baisse une probabilité** (graduel, cumulatif); ce n'est pas un blocage unilatéral; la trémulation a deux publics (+ receveuses, − recrutement); le refus individuel d'A2A (`REJECTED`) n'est pas un signal adressé aux autres (dossier p7-agents-llm, §9); la compensation n'a pas d'analogue biologique vérifié (x-choregraphie, question 4) | Analogie (p4-regulation : l'analogie avec CoDel est une proposition du dossier [I]) |
| **Régulation de la charge** | *Pogonomyrmex barbatus* : lit un **débit** (retours, contacts) sur la boucle de terrain, file M/G/∞ [Prabhakar et al. 2012]; [Pagliara et al. 2018] | lit un **délai** (temps de recherche d'une receveuse) sur une file d'appariement entre deux castes [Seeley et Tovey 1994]; [Anderson et Ratnieks 1999a] | limite = débit moyen × latence moyenne [Netflix 2026]; auto-cadencement par accusés de réception [Jacobson et Karels 1988] | « deux lectures de la même file » est inexact : **deux files**; la loi de Little est une identité valide, déjà appliquée à ce contexte [Anderson et Ratnieks 1999a], mais n'explique pas pourquoi le délai renseigne sur la charge [Little 1961]; l'analogie TCP vient du communiqué de Stanford [Carey 2012] et de [Gordon 2014], non de [Prabhakar et al. 2012] (cadre §2.4 points 5 et 6) | Analogie; contrôle d'intégrité L = λW à ±2 % (cible T-L de p4-regulation) |
| **Oubli, en trois formes** | **évaporation**, côté environnement (*Linepithema*, *Lasius*); volatilités multiples [Couzin 2009], p. 41; ρ selon [Dorigo et al. 1996] | **abandon** probabiliste de la source selon sa qualité, côté émetteur [Seeley et al. 1991] (butinage); **attrition des danses** : décroissance quasi linéaire du nombre de circuits par retour, propre à la décision de nid [Seeley 2003] [non vérifiée]; la danse n'a aucune persistance | TTL d'un état partagé (`ttlMs`, indice de fraîcheur de cache [MCP 2026]); décroissance de poids (récence 0,995 par heure de jeu [Park et al. 2023]); republication décroissante [I]; troncature ou compaction du contexte, côté récepteur [I] | la fenêtre de contexte est abrupte et non paramétrable en continu [I]; « attrition des danses » n'est pas le mécanisme général d'oubli (cadre §2.4 point 14); le contraste utile porte sur **qui oublie** (environnement, émetteur, récepteur) | Modèle simplifié (ODE) / Analogie |
| **Mémoire** | externe (piste) [Czaczkes et al. 2015]; individuelle : la mémoire de route l'emporte sur la piste (*L. niger* : 95,3 % de bons choix après 3 visites contre ≈ 62 à 70 % pour la piste seule) [Grüter et al. 2011]; d'état de groupe (hystérésis) [Beekman et al. 2001] [non vérifiée] | individuelle : 75 à 88 % des suivis de danse servent à réactiver ou confirmer [Biesmeijer et Seeley 2005] [R]; carte spatiale débattue [Menzel et al. 2005]; [Cheung et al. 2014]; aucune mémoire externe | contexte propre (privé), tableau ou journal (externe), poids du modèle (fixes pendant l'exécution) [I]; récence, importance, pertinence [Park et al. 2023] | l'individu LLM n'est pas un suiveur naïf non plus, mais l'état partagé peut écraser son contexte propre [I]; l'hystérésis collective n'a pas d'équivalent mesuré chez les agents [I]; « piste = chemin, danse = lieu » est réfuté comme frontière algorithmique (ACO continu, ABC combinatoire) : on parle de granularité de la mémoire partagée (cadre §2.4 point 15) | Hypothèse de l'auteur |
| **Vérification indépendante** | l'information privée l'emporte en cas de conflit (*L. niger*) : 82 à 100 % suivent la mémoire [Grüter et al. 2011] | les éclaireuses inspectent elles-mêmes : indépendance avant interdépendance [List et al. 2009]; inspectrices pour la réponse rapide [Granovskiy et al. 2012] | contexte partagé vérifié [Mao et Mirhoseini 2026] [R]; la vérification centralisée réduit l'amplification d'erreurs (4,4 × contre 17,2 × en indépendant) [Kim et al. 2025a]; catégorie FC3 de MAST | un vérificateur LLM partage les erreurs du modèle (n_eff); la vérification coûte des jetons; c'est le mécanisme qui manque le plus aux agents (audit choregraphie-agentique) | Hypothèse de l'auteur |
| **Identité** | hydrocarbures cuticulaires; mimétisme chimique et acoustique [Akino et al. 1999]; [Barbero et al. 2009]; reconnaissance collective par plusieurs gardiens [Johnson et al. 2011] | odeur de colonie; camouflage chimique du sphinx [Moritz et al. 1991] [à confirmer : contenu non lu] | carte d'agent [A2A 2026] (signature : à confirmer); marquage de provenance [Lee et Tiwari 2024] | le mimétisme usurpe une **identité**, l'injection de prompt détourne l'**action** [I] : mimétisme ↔ usurpation de carte; propagande ↔ injection indirecte [Greshake et al. 2023]; propagation ↔ [Lee et Tiwari 2024] | Analogie |
| **Réversibilité** | pertes tolérées (une butineuse égarée coûte peu) [I] | pertes tolérées [I] | effets de bord à compenser : sagas [Garcia-Molina et Salem 1987]; [Richardson s.d.]; compensation gérée à l'intérieur d'un seul participant [OMG 2013], tableau 11.6 | la compensation n'a pas d'analogue biologique vérifié; la saga d'origine est décrite en mode orchestré; la forme chorégraphiée vient des microservices [Richardson s.d.]; une compensation n'avertit pas les transactions qui ont lu Tⱼ | Hypothèse de l'auteur (rupture d'analogie) |
| **Division du travail et diversité** | *Pheidole* : après retrait des minors, ce sont les **majors** qui prennent le relais (répertoire ×1,4 à 4,5; activité ×15 à 30) [Wilson 1984]; ouvrières inactives en réserve [Charbonneau et al. 2017] | polyéthisme d'âge plastique; inhibition sociale entre ouvrières [Huang et Robinson 1992]; diversité génétique des seuils : température du couvain qui tend à être plus stable [Jones et al. 2004] | personas, hétérogénéité de modèles; la diversité des erreurs est faible par construction [Kim et al. 2025]; [Kim 2026] | diversité de seuils = temporelle; diversité visée chez les LLM = épistémique; [Jones et al. 2004] porte sur la diversité génétique des patrilignes; « agents identiques oscillent » : hypothèse sans acquis, contre-preuves publiées (cadre §2.4 point 13) | Hypothèse de l'auteur; à tester en P3 et P7 |
| **Échelle et coût par individu** | 10³ à 10⁶ individus (dossier p7-agents-llm, C12); individu bon marché | idem | 10 à 25 agents; ≈ 15 × les jetons d'un dialogue [Hadfield et al. 2025]; les Boids LLM ≈ 300 fois plus lents [Rahman et al. 2025] | pas de redondance massive; l'effet d'échelle se sépare de l'effet de mécanisme en exécutant les règles à N = 10 et à N biologique | Analogie |

Lignes **retirées** par rapport à la v3, parce qu'abusives : l'assignation de tâche comme analogue du recrutement (c'est de l'orchestration) et le blocage unilatéral comme analogue du signal d'arrêt (c'est une inhibition). Voir cadre §2.4 point 7 et x-choregraphie, §9 points 2 et 3.

---

## 7. Homonymies à lever (liste fermée)

Un mot qui a deux sens ne s'emploie jamais seul sans que le sens soit fixé. Cette liste est **fermée** : toute nouvelle homonymie s'y ajoute avant d'être employée. Elle reprend les dix entrées de [10-glossaire.md](10-glossaire.md), avec les mêmes sens retenus, et en ajoute quinze; le glossaire s'aligne sur elle.

| # | Terme | Sens en informatique et en agentique | Sens en biologie ou ailleurs | Règle d'emploi |
|---|---|---|---|---|
| 1 | chorégraphie | plan global explicite projeté sur les participants, sans contrôleur central [OMG 2013], [Kavantzas et al. 2005], [Honda et al. 2008] | usage figuré de la v3 : motif collectif sans plan (« chorégraphies sans chorégraphe ») | sans qualificatif : sens informatique (chorégraphie spécifiée); pour une colonie : auto-organisation; « chorégraphie émergente » seulement avec son qualificatif; une orchestration n'est jamais une chorégraphie |
| 2 | orchestration | processus exécuté pour un partenaire [OMG 2013]; agent principal [Hadfield et al. 2025]; certains cadriciels dits « swarm » en relèvent (audit choregraphie-agentique; source absente de la bibliographie) | — | orchestration = A2 oui (Déf. 1); on ne suppose jamais décentralisé un système qui se dit « swarm » |
| 3 | essaim, *swarm* | intelligence en essaim [Bonabeau et al. 1999]; noms de cadriciels et de bancs LLM [Ruan et al. 2025], [Gao et al. 2026], [Pal et al. 2026] | essaim d'abeilles : groupe qui quitte la colonie et choisit un nid [Seeley et Visscher 2003] | « essaim » seul = sens biologique; un nom de cadriciel ou de banc est suivi de son identifiant (arXiv) |
| 4 | stigmergie | trace dans un médium qui stimule l'action suivante, sans agent requis; marqueurs transitoires admis [Heylighen 2016a], [Heylighen 2016b] | construction chez les termites [Grassé 1959], [Theraulaz et Bonabeau 1999] | « stigmergie » = C_stig > 1; **régime stigmergique** = stigmergie persistante (C_mem ≥ 1); la danse n'est classée par aucune source lue : le programme la place en « diffusion éphémère » (cadre §2.2) |
| 5 | signal | événement BPMN sans destinataire précis [OMG 2013] | stimulus émis exprès (danse, phéromone, signal d'arrêt), distinct de l'indice [Feinerman et Korman 2017] | signal = émis exprès, décrit par les composantes de R; indice, message et trace restent distingués |
| 6 | quorum | majorités qui s'intersectent pour garantir l'accord sous fautes (audit choregraphie-agentique) [I]; « k sur n » chez les LLM | seuil local sur une densité perçue, réglable entre vitesse et justesse [Sumpter et Pratt 2009], [Franks et al. 2003] | quorum = seuil local biologique; pour les agents : « agrégation à seuil », exprimée en n effectif [Kohli 2026] |
| 7 | consensus | accord, validité et terminaison sous fautes [Ghaffari et al. 2015], [Zhao et al. 2021]; convergence d'un débat [Du et al. 2024] | accord des éclaireuses sur un site [Seeley 2003]; le départ est déclenché par le quorum, non par le consensus [Seeley et Visscher 2003] | jamais « consensus » seul : décision collective (colonie), agrégation à seuil (agents), consensus tolérant aux fautes (informatique répartie), convergence de débat |
| 8 | délégation | assignation poussée par un mandant vers un exécutant (agent principal et sous-agents; tâches d'A2A) [Hadfield et al. 2025], [A2A 2026] | aucun sens propre; la v3 traduisait « recrutement » par ce mot, ce qui est abusif | réservé à l'orchestration, en contre-exemple; l'analogue du recrutement est « annonce et auto-sélection » [Salemi et al. 2025] |
| 9 | inhibition, freinage, contre-pression, annulation | contre-pression : le consommateur ralentit le producteur [Reactive Streams 2026]; annulation (état CANCELED d'A2A); compensation (sagas) | inhibition : baisse de probabilité d'une action des pairs [Marshall et al. 2009] | quatre mots, quatre mécanismes; aucun n'est un blocage unilatéral |
| 10 | mémoire | contexte, poids du modèle, état persistant partagé (tableau noir, journal, ressource MCP) | externe (piste), individuelle (route apprise), d'état du groupe (hystérésis, dite « collective » [Couzin et al. 2002]) | toujours qualifier; « mémoire partagée » = état persistant du médium, décrit par sa persistance et sa granularité (chemin, lieu, solution complète; cadre §2.4 point 15) |
| 11 | oubli | TTL, décroissance de poids, troncature du contexte | évaporation, abandon, attrition des danses (cadre §2.4 point 14) | nommer la forme et **qui** oublie |
| 12 | ρ, persistance | — | ρ = persistance (τ ← ρτ + Δτ) [Dorigo et al. 1996] contre ρ = taux d'évaporation (convention postérieure) | écrire τ½; nommer la convention de la source à chaque emprunt (ρ = 0,9 : 6,58 contre 0,30 pas) |
| 13 | richesse | richesse du signal R (vecteur du canal) | richesse florale de l'habitat [Donaldson-Matasci et Dornhaus 2012] | « R » désigne le vecteur du canal; « richesse florale » une variable d'environnement; jamais « richesse » seul |
| 14 | diversité | hétérogénéité de modèles, de personas, de prompts; diversité épistémique (erreurs) | diversité génétique des patrilignes [Jones et al. 2004]; diversité des seuils (temporelle) | nommer le type; mesurer par n_eff et corrélation d'erreurs |
| 15 | indépendance | « agents indépendants » : bras sans canal (référence de G) | erreurs indépendantes (Condorcet) [Dietrich et Spiekermann 2013] | bras = « sans canal »; propriété = « erreurs indépendantes »; autonomie = absence d'A2 |
| 16 | gain | G apparié à budget égal; Δ_k; G_int de la fiche P7 (gain total contre la référence sans canal); « G_int » de p8-individu-colonie (P_col − P_vote) | gain normalisé de Hake [Hake 2002]; gain relatif de [Li et al. 2024] | écrire Δ_k, G_k, G_agg, G_com; « G_int » seulement au sens de la fiche P7 |
| 17 | émergence | « capacité d'émergence » mesurée par décomposition de l'information [Riedl 2026] | motif global issu d'interactions locales [Camazine et al. 2001]; émergence forte contre amplification [Feinerman et Korman 2017] | ne pas assimiler l'indicateur de Riedl au concept biologique |
| 18 | file d'attente | limite = débit × latence [Netflix 2026] | boucle de terrain M/G/∞ (fourmi) contre file d'appariement (abeille) : **deux files** | nommer la file |
| 19 | réplication, reproduction, validation, rejeu | rejeu : réexécuter l'environnement à partir des sorties journalisées d'un LLM, sans rappeler l'API | réplication d'un modèle publié ≠ validation contre des données empiriques (cadre §6.1) | quatre mots, quatre sens; un LLM se reproduit en **relations**, non en valeurs absolues (modèles retirés) |
| 20 | déterministe | « température 0 » | — | aucun réglage n'est supposé déterministe [Atil et al. 2024] [R] |
| 21 | budget | jetons, appels, dollars, temps d'horloge | — | B se définit avant les runs (section 4.1) |
| 22 | agent | agent LLM (boucle modèle et outils); agent à règle; agent A2A « opaque » | individu insecte | préciser le type; un agent LLM n'est pas une fourmi |
| 23 | seuil | seuil d'alerte, limite de débit ou de latence, seuil de vote; en statistique : α et marge d'équivalence δ | seuil de réponse θ; seuil de quorum; seuil de décision ±z du modèle de diffusion | jamais « seuil » seul |
| 24 | apprentissage | apprentissage automatique : mise à jour de paramètres à partir de données [I] | individuel (seuils renforcés) [Theraulaz et al. 1998]; social (copie d'une danse) [Dong et al. 2023] | toujours qualifié; chez les agents LLM, l'adaptation passe par le contexte et l'état partagé, non par une mise à jour de poids [I] |
| 25 | bruit | terme stochastique d'un modèle (processus de Wiener) [Marshall et al. 2009]; variance entre exécutions de LLM [Atil et al. 2024]; **bruit de canal** injecté par l'environnement (réglage de R_eff) | variabilité comportementale, parfois utile [Deneubourg et al. 1983], [Dussutour et al. 2009] [non vérifiée] | toujours qualifié : bruit comportemental, bruit d'intégration, bruit de canal, variance entre exécutions |

---

## 8. Tests, compléments proposés, risques, critères d'achèvement

### 8.1 Où ces définitions sont testées

Ce document ne crée **aucun identifiant H, T ou E** : la fiche [S0](../projets/S0-socle.md) les porte, comme elle le déclare pour R, G et la typologie. Correspondances :

| Définition | Critère ou test | Où |
|---|---|---|
| Indicateurs C_* (section 2), règle de classement (1.4) | H0.2; E0.1; T0.33 et T0.34; CS0.9 | fiche S0 |
| Jeu de données de typologie (table 1.3) | CS0.10 | fiche S0 |
| R et G sur cas jouets; aucune agrégation de R en scalaire | T0.29 à T0.32; CS0.7 | fiche S0 |
| Couverture de l'IC de G; G « non défini » | H0.3; E0.2 | fiche S0 |
| Accord conditionnel aux erreurs entre modèles (T11 du dossier x-choregraphie); identité 1 − β; accord d'annotation MAST | T7.9; T7.10; T7.11 | fiche P7 |
| Cas d'école de régime : sagas, absence d'interblocage, règle de séquencement BPMN (T8 à T10 du dossier x-choregraphie) | reprises par la fiche S0 (T0.33, T0.34; correspondance à confirmer) | fiche S0 |
| n_eff d'un panel de juges (T12 du dossier x-choregraphie) | reprise non repérée dans les fiches [à confirmer] | — |
| Contenus du journal et mesure de R_eff | enregistreur | [05-spec-simulation.md](05-spec-simulation.md) |
| Exemples chiffrés de ce document | `s0_metriques_checks.ts` affiche `checks OK` | [../recherche/verifications-numeriques/s0_metriques_checks.ts](../recherche/verifications-numeriques/s0_metriques_checks.ts) |

Le script de contrôle n'est pas une cible de reproduction : il recalcule des exemples et des identités (G = G_agg + G_com; R_eff ∈ [0, 1] et borne R_nom/H(W); précision du vote ≤ 1 − β; biais de l'estimateur de R_eff; coûts).

### 8.2 Compléments proposés à la fiche S0

Sans identifiant : à intégrer par la fiche S0 ou par le plan de recherche, qui leur en attribueront un.

| Complément | Énoncé (direction) | Effet minimal | Critère de réfutation |
|---|---|---|---|
| Sensibilité de R_eff au bruit | À R_nom égal, R_eff décroît avec le bruit de canal ε (3 formats × 6 niveaux de ε) | corrélation de rang de Spearman < −0,9 [I] | IC à 95 % contenant 0 : l'estimateur ne voit pas le bruit injecté |
| Décodeur LLM contre analyseur déterministe | Pour L2 (≤ 30 jetons) sous schéma contraint, R_eff estimé par un décodeur LLM figé (κ ≥ 0,70) concorde avec celui d'un analyseur déterministe | écart absolu ≤ 0,05 sur 300 messages [I] | écart > 0,10 [I] |
| Découplage des leviers de R | Chaque levier agit sur sa seule composante : la matrice d'effets est quasi diagonale | effets croisés ≤ 0,1 × l'effet direct [I] | un effet croisé > 0,3 × l'effet direct [I] |
| Projection contre émergence (exécution : P7) | Une Φ statistique de décision à deux sites est réalisée par projection d'un type global, puis par quorum et signal d'arrêt [Pais et al. 2013] : on rapporte Δ_PE, κ_PE et ΔRob_PE (section 1.5) | descriptif | — |
| Banc des régimes sur tâche commune | Une tâche commune (achat à trois parties ou recherche documentaire, x-choregraphie §8) exécutée en orchestration, en chorégraphie projetée, en tableau noir stigmergique et par signaux directs : C_*, G_k, coût | descriptif; prolonge E0.1; matériau du curseur des régimes de V0 | — |

### 8.3 Risques

Numérotation provisoire (bloc R100 à R105, hors des plages déjà occupées par d'autres documents); le plan de recherche et la feuille de route renumérotent.

| ID | Risque | Signal d'alerte | Parade |
|---|---|---|---|
| R100 | Orchestrateur caché : C_ctrl sous-estimé | classement « émergent » d'un système dont un harnais choisit l'acteur | déclarer le harnais; journaliser `triggerFrom` et `designatedBy`; ordre des agents tiré avec graine |
| R101 | G instable près du plafond | P_ref > 0,9; G de signe et de taille erratiques | Δ_k primaire; G « non défini » selon H0.3; difficulté calibrée à 40-80 % |
| R102 | Budget égal indéfini ou irréalisable; retrait de modèles | K = 4 ou 7,45 selon la règle de compte; Haiku 4.5 dès le 2026-10-15 | préenregistrer B; modèles à poids ouverts pour K ≥ 10 (p8-individu-colonie, E8.5); journaliser `responseModel` |
| R103 | Biais d'estimation de R_eff (petit N, décodeur LLM) | Î non nul sous indépendance; κ < 0,70 | permutation, IC par bootstrap, borne inférieure, κ ≥ 0,70 |
| R104 | Erreurs corrélées : n nominal trompeur | n_eff ≪ n; accord conditionnel aux erreurs ≫ 33 % | mesurer n_eff et β; hétérogénéiser; ne jamais lire G_agg comme un jury indépendant |
| R105 | Essentialisme (taxon ou canal) et transposition abusive | « la fourmi fait X » sans taxon; ligne du tableau sans colonne « casse » | taxon nommé, canal = variable, statut épistémique par ligne |

### 8.4 Critères d'achèvement de ce document

1. `node s0_metriques_checks.ts` affiche `checks OK` (fait à la rédaction).
2. Chaque placement de 1.3 porte une étiquette de [11-bibliographie.md](11-bibliographie.md) ou la marque [I] (fait); le contrôle `node outils/verifier-docs.ts` ne signale aucune étiquette absente pour ce fichier.
3. Un journal d'essai porte les contenus de 2.1 (schéma validé par script, à écrire avec [05-spec-simulation.md](05-spec-simulation.md)).
4. H0.2 et H0.3 satisfaites, T0.29 à T0.34 passent (fiche S0).
5. Les cinq composantes de R se lisent sur un journal d'essai.
6. Tout G affiché passe la déclaration de 4.7.
7. [10-glossaire.md](10-glossaire.md) reprend la section 7.

---

## 9. Points ouverts et tensions avec le cadre

1. **G (cadre §4) et plafond.** Le cadre définit G comme un rapport, sans garde. Quatre formulations coexistent : le cadre (aucune), p8-individu-colonie (ne chiffrer que si P_ref ≤ 0,9), la fiche S0 (non défini si l'IC de P_max − P_ref contient 0, H0.3) et la fiche P7 (afficher si P_max − P_ref ≥ 0,1 de l'étendue [à confirmer]). Ce document retient les deux dernières; à entériner dans [03-plan-de-recherche.md](03-plan-de-recherche.md).
2. **Régimes hybrides.** Le cadre (§2.2) en pose quatre; trois régimes hybrides (x-choregraphie, Déf. 4) et une référence nulle ne tiennent pas dans ces cases. Ils sont traités comme règle de classement, non comme contradiction; le cadre devrait les nommer.
3. **Stigmergie.** Chez [Heylighen 2016b], une trace transitoire reste de la stigmergie (synchrone); le cadre réserve le régime stigmergique à l'état persistant. La frontière retenue ici est C_mem ≥ 1. Que la danse relève de la stigmergie transitoire ou de la communication directe n'est tranché par aucune source lue (x-choregraphie, question 1).
4. **Seuils de C_ctrl et H0.2.** Les valeurs « ≈ 1 », « < 1/2 » et « ≈ 0 » sont des propositions du dossier [I]. Un rôle-pivot de chorégraphie qui rejoue la trace d'un orchestrateur obtient le même C_ctrl (section 2.2) : l'ordre « orchestration > chorégraphie spécifiée » de H0.2 ne tient pas pour un pivot, et C_spec doit alors porter la séparation.
5. **Budget égal : K = 4 ou 7,45.** Le modèle de coût du dossier p7 (raisonnement facturé) et le raisonnement de p8 (rapport de prix seulement) divergent. À trancher avant le préenregistrement.
6. **Références hors bibliographie** citées par le cadre ou les audits, sans étiquette utilisable : Schürch et Ratnieks 2015 (bits de la danse), Eugster et al. 2003 (découplage), Nieh 2004 (pistes des Meliponini), Nieh 2010, Perry et al. 2015 et Khoury et al. 2011 (effondrement par maturation précoce), Leoncini et al. 2004, Perna et al. 2012, Fischer, Lynch et Paterson 1985, OpenAI Swarm. À ajouter à [11-bibliographie.md](11-bibliographie.md) ou à écarter (le glossaire en recense déjà quatre).
7. **Étiquettes dupliquées.** La bibliographie porte trois entrées pour Kim et al. 2025 (« Kim et al. 2025 », « 2025a », « 2025b »; la première et la troisième sont la même œuvre), deux pour Chen et al. 2024 (« 2024 » et « 2024a ») et deux pour Heylighen 2016 (« 2016 » et « 2016a »). Ce document emploie 2025 (erreurs corrélées), 2025a (lois d'échelle), 2024a et 2016a.
8. **Totaux MAST par catégorie.** La fiche P6 et le dossier p6 donnent 44,2 / 32,3 / 23,5 %, le dossier p7 ≈ 44,2 / 32,4 / 23,5 % (sommes des modes [I]). L'écart est d'arrondi; ce document écrit ≈ 44 / 32 / 24 %.
9. **Forme des identifiants.** Les documents 04 et 05 emploient `TS0.n`, `HS0.n` et `ES0.n` (cibles dans 05; HS0.1, ES0.1 et ES0.2 dans 04), la fiche S0 emploie `T0.n`, `H0.n` et `E0.n` : deux séries qui se recouvrent sans coïncider (ES0.1 de 04 et E0.1 de la fiche S0 sont deux objets différents). Ce document n'en crée aucun; à unifier par le plan de recherche. Les plages de risques R se chevauchent déjà entre documents (R20 à R28 dans 05; R30 à R62 dans 07 et 08; R41 à R54 dans P4; R60 à R69 dans 04; R71 à R87 dans P7), d'où le bloc R100 à R105 ici.
10. **Valeurs à lire dans les sources avant usage.** k = 20 de [Deneubourg et al. 1990] [à confirmer]; unité de ρ chez [Dussutour et al. 2009] [à confirmer]; bornes de j des sagas [à confirmer]; dénominateur des 14 % et 3,8 % [à confirmer]; bits de la danse ([Haldane et Spurway 1954]) [à confirmer]; définition de n_eff chez [Kohli 2026] (non lue); tarifs et identifiants de modèles (à reconfirmer avant toute exécution).
11. **Glossaire.** [10-glossaire.md](10-glossaire.md) contient dix homonymies, ce document vingt-cinq : le glossaire s'aligne sur la section 7, et [07-vulgarisation-evaluation.md](07-vulgarisation-evaluation.md) reprend la colonne « Où l'analogie casse » pour que les visuels ne contredisent pas ce document.

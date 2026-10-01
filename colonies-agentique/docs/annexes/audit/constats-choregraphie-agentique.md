# Constats — Chorégraphie et agentique

Source : [rapport complet](choregraphie-agentique.md). 26 constats (2 critiques, 18 majeurs, 6 mineurs) et 10 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** L'intuition centrale tient : piste contre danse, c'est bien stigmergie contre signal direct. Mais v3 emploie « chorégraphie » dans un sens que l'informatique ne lui donne pas : en WS-CDL, BPMN, programmation chorégraphique et types de session multipartites, une chorégraphie est un plan global explicite projeté sur les participants, alors qu'une colonie s'auto-organise sans aucun plan global. Aucune expérience n'inclut d'orchestrateur témoin. Or la littérature 2025-2026 est partagée : Kim et al. mesurent 4,4× d'amplification d'erreurs en centralisé contre 17,2× en indépendant, tandis que les tableaux noirs LLM et DeLM battent le maître-esclave sur certaines tâches. Le résultat dépend donc de la structure de la tâche. Dans le tableau de correspondance, quatre lignes sont à nuancer et deux équivalences sont abusives (recrutement → « délégation », freinage → « veto »). La question transversale confond richesse du signal et capacité de l'agent. A2A v1.0, MCP 2026-07-28, la littérature sur la stigmergie et les tableaux noirs, et les bancs LLM existants (SwarmBench, AgentsNet) sont absents, alors qu'ils rendraient le volet agentique concret et reproductible.

## Constats

### CA-01 · critique · Thèse et titre; tableau « Deux chorégraphies naturelles »

**Constat.** Le cadrage confond l'absence de coordinateur à l'exécution avec l'absence de plan global. En informatique (WS-CDL « global viewpoint », Montesi « coordination plan », global types projetés en MPST), la chorégraphie va du haut vers le bas, avec une spécification globale; la colonie va du bas vers le haut, par émergence de règles locales (Heylighen 2016 : coordination sans planification ni contrôle).

**Preuve.** https://www.w3.org/TR/ws-cdl-10/ ; https://www.fabriziomontesi.com/bliki/Choreography ; https://dl.acm.org/doi/10.1145/2827695 ; https://pespmc1.vub.ac.be/Papers/StigmergyICognSystems.pdf ; https://doi.org/10.1145/2103656.2103680 (méta)

**Recommandation.** Adopter une typologie à trois axes (plan global explicite, contrôle central à l'exécution, médium partagé) qui distingue orchestration, chorégraphie et auto-organisation stigmergique ou par signaux directs. Nommer le « chorégraphe » de chaque côté : sélection naturelle d'un côté, concepteur du prompt de l'autre. Poser le problème inverse de la projection comme question de recherche.

**Disposition.** Accepté — Typologie à trois axes (A1 plan global, A2 contrôle central, A3 médium) et quatre régimes, avec hybrides et référence nulle; le « chorégraphe » est nommé de chaque côté (sélection naturelle, concepteur du prompt et des protocoles) et le problème inverse est posé comme question de recherche (énoncé, trois niveaux de réponse, grandeurs Δ_PE, κ_PE, ΔRob_PE). — Traité dans : ../../00-cadre.md §2.2; ../../06-metriques-et-typologie.md §1.1 à §1.5; ../../10-glossaire.md (chorégraphie, orchestration, plan global, contrôle central, médium de coordination)

### CA-02 · critique · Projets 1, 3, 5 (volet agentique) et projet 7

**Constat.** Aucune condition orchestrée ne sert de témoin, alors que le programme se définit « par opposition à l'orchestration ». La littérature est partagée : Kim et al. 2025 (amplification d'erreurs 17,2× en indépendant, 7,8× en décentralisé, 4,4× en centralisé; +80,8 % en centralisé sur la finance, +9,2 % en décentralisé sur BrowseComp-Plus); Anthropic emploie l'orchestrator-worker; Salemi et al. (tableau noir, +13 à 57 % sur le maître-esclave) et DeLM (+10,5 points sur SWE-bench Verified) favorisent la décentralisation.

**Preuve.** https://arxiv.org/html/2512.08296 ; https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2510.01285 ; https://arxiv.org/abs/2606.10662 ; https://cognition.com/blog/dont-build-multi-agents

**Recommandation.** Ajouter un témoin orchestré à chaque volet agentique, croiser l'architecture avec la structure de la tâche (décomposable contre séquentielle) et formuler des hypothèses réfutables où l'orchestration peut gagner. Garder « la reine ne commande pas » comme constat biologique, pas comme prescription.

**Disposition.** Accepté — Chaque volet agentique inclut un témoin orchestré à budget égal (QR3, décision D4; bras ORC de P7; E1.7, E3.8, E4.5-E4.6, E5.6, E6.x, E8.5, E9.x), croisé avec la structure de tâche (champ `structure_tache`) et des hypothèses où l'orchestrateur gagne ou perd (H1.9, H3.8, H4.5, H5.9, H7.5, H9.20); « la reine ne commande pas » est borné au constat biologique. — Traité dans : ../../00-cadre.md §2.1, §3 (QR3); ../../03-plan-de-recherche.md §2.4, §5.1 (structure de tâche, témoin orchestré); ../../02-architecture-programme.md §7 (D4); ../../../projets/P7-synthese-agentique.md §7.1, §7.4; ../../../projets/P1-recrutement-verrouillage.md E1.7; ../../../projets/P3-division-du-travail.md H3.8

### CA-03 · majeur · Question transversale; projet 7

**Constat.** La question transversale confond deux facteurs : la richesse du signal (scalaire, symbole, langage) et la capacité de l'agent (fourmi, abeille, LLM). En plus, l'ordre de richesse n'est pas établi : la fourmi émet des signaux multicomposantes et l'abeille un vecteur analogique.

**Preuve.** inféré; https://doi.org/10.1038/438442a ; https://doi.org/10.1038/nature03105

**Recommandation.** Plan factoriel : agents LLM restreints à un canal scalaire, vectoriel ou textuel, et agents à règle simple sur des canaux riches. Mesurer la richesse en bits par signal et en coût par signal.

**Disposition.** Modifié — Richesse du signal et capacité de l'agent sont séparées : R est un vecteur (R_nom en bits, R_eff, R_pers, R_port, R_adr), l'ordre fourmi < abeille < LLM est déclaré hypothèse, P7 croise les formats L0 (scalaire), L1 (tuple), L2-L3 (texte plafonné) à modèle fixe avec le coût en panneaux alignés (E7.3), et P1 croise canal × taxon (E1.6). Adaptation : les agents à règle ne sont pas croisés avec des canaux riches (LLM-RÈGLE reste à L0, E7.4). — Traité dans : ../../00-cadre.md §3 (QR0), §4; ../../06-metriques-et-typologie.md §3.1 à §3.4; ../../../projets/P7-synthese-agentique.md §3.1 (vecteur R), §6.3 (E7.3, E7.4); ../../../projets/P1-recrutement-verrouillage.md E1.6

### CA-04 · majeur · Tableau, ligne Canal

**Constat.** Un journal d'événements (ajout seul, ordonné, sans agrégation ni décroissance) n'est pas un champ de phéromone, que l'environnement agrège, évapore et diffuse (Parunak 2002). Le pub/sub découple temps, espace et synchronisation (Eugster 2003), ce qui ressemble à la piste et non à la danse, couplée en temps et en espace : l'association est inversée. Enfin, chez Pogonomyrmex, la régulation passe par les contacts antennaires et non par une piste.

**Preuve.** https://dl.acm.org/doi/10.1145/544741.544843 ; https://dl.acm.org/doi/10.1145/857076.857078 ; https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670

**Recommandation.** Équivalents proposés : tableau noir, espace de tuples ou ressource MCP avec décroissance pour la piste; diffusion locale éphémère sans rétention pour la danse. Ajouter une ligne « découplage » (Eugster) et nommer l'espèce par cellule.

**Disposition.** Accepté — Le tableau 06 distingue le journal (ajout seul, sans agrégation ni décroissance) du champ de phéromone, nomme l'espèce par cellule (*Pogonomyrmex* régulé par contacts antennaires, sans piste) et ajoute la ligne « Découplage » (Eugster : « danse = pub/sub » est déclaré inversé); la piste s'implante en serveur MCP à décroissance ajoutée et la danse en bus sans rétention, via les canaux `field`, `dance-floor`, `blackboard`, `messages`. — Traité dans : ../../06-metriques-et-typologie.md §6.1 (lignes Médium et portée, Découplage); ../../05-spec-simulation.md §2.3; ../../../projets/P7-synthese-agentique.md §7.1; ../../00-cadre.md §2.4 (points 9, 10)

### CA-05 · majeur · Tableau, ligne Contenu du signal

**Constat.** « Fourmi = scalaire » est réducteur : phéromone répulsive « no entry », polarité donnée par la géométrie, système multimodal, information privée prioritaire. « Abeille = symbolique » est surqualifié : codage analogique d'un vecteur, précision apprise socialement et dépendante de l'auditoire, information souvent ignorée par les butineuses expérimentées. « Agent = langage naturel » est partiel : les messages A2A contiennent aussi des données structurées.

**Preuve.** https://doi.org/10.1038/438442a ; https://doi.org/10.1038/nature03105 ; https://doi.org/10.3758/s13420-025-00697-w ; https://doi.org/10.1371/journal.pone.0064668 ; https://doi.org/10.1126/science.ade1702 ; https://doi.org/10.1073/pnas.2518687123 ; https://doi.org/10.1111/mec.15893 ; https://a2a-protocol.org/latest/specification/

**Recommandation.** Remplacer par trois axes : codage (analogique, discret, compositionnel), débit en bits par signal, vérifiabilité par le récepteur.

**Disposition.** Modifié — « Scalaire, symbolique, langage » est remplacé : le codage devient une ligne de 06 (champ multicomposante avec « no entry » et polarité par la géométrie; vecteur analogique appris socialement; parties A2A en texte, fichiers ou données; « symbolique » déclaré non établi) et le débit se mesure par R_nom et R_eff. Adaptation : codage et vérifiabilité par le récepteur restent qualitatifs dans le tableau, seuls les bits sont mesurés. — Traité dans : ../../06-metriques-et-typologie.md §3.1, §3.2, §6.1 (ligne Codage du signal); ../../00-cadre.md §2.4 (point 10), §4; ../../10-glossaire.md (piste, danse frétillante)

### CA-06 · mineur · Tableau, ligne Oubli

**Constat.** « TTL vs expiration des messages » est une tautologie. Le contraste réel porte sur qui oublie : l'environnement (évaporation) ou l'émetteur (attrition des danses, Seeley 2003).

**Preuve.** https://ar5iv.labs.arxiv.org/html/2304.03442 ; https://doi.org/10.1007/s00265-003-0598-z (méta) ; https://arxiv.org/abs/2605.15225 (préprint, preuve faible)

**Recommandation.** Distinguer l'oubli côté environnement (décroissance des poids; récence exponentielle, p. ex. 0,995 par heure de jeu dans Generative Agents), côté émetteur (republication décroissante) et côté récepteur (compaction de contexte).

**Disposition.** Accepté — 06 distingue trois formes d'oubli selon qui oublie : l'environnement (évaporation, TTL, décroissance de poids avec récence de 0,995 par heure de jeu), l'émetteur (abandon, attrition des danses, republication décroissante) et le récepteur (troncature ou compaction du contexte); la tautologie « TTL contre expiration » disparaît. — Traité dans : ../../06-metriques-et-typologie.md §3.3, §6.2 (ligne Oubli, en trois formes); ../../00-cadre.md §2.4 (point 14); ../../10-glossaire.md (oubli, attrition des danses); ../../05-spec-simulation.md §2.3

### CA-07 · majeur · Tableau, ligne Recrutement (« Délégation »)

**Constat.** Équivalence abusive. La délégation est une assignation poussée par un mandant (modèle de tâche A2A, orchestrator-worker), donc du vocabulaire d'orchestration. Le recrutement biologique est tiré : la recrue choisit de suivre et réévalue elle-même. Le tandem est un transfert 1:1 avec rétroaction bidirectionnelle.

**Preuve.** https://arxiv.org/abs/2510.01285 ; https://arxiv.org/abs/2606.10662 ; https://doi.org/10.1038/439153a ; https://a2a-protocol.org/latest/specification/

**Recommandation.** Remplacer par « annonce + volontariat » (agents volontaires sur tableau noir, file de tâches, consommateurs concurrents). Pour le tandem : poignée de main acquittée.

**Disposition.** Accepté — La ligne « Recrutement » devient « annonce et auto-sélection » (tableau noir avec volontariat, file de tâches partagée), la recrue étant tirée et réévaluant elle-même; « délégation » est réservée à l'orchestration en contre-exemple et le tandem est rapproché d'une poignée de main acquittée. — Traité dans : ../../06-metriques-et-typologie.md §6.1 (ligne Recrutement), §7 (homonymie 8); ../../10-glossaire.md (délégation, recrutement, tandem); ../../07-vulgarisation-evaluation.md §4.7, §7.2; ../../../projets/P7-synthese-agentique.md §7.2

### CA-08 · majeur · Tableau, ligne Freinage; projet 5 (« signaux d'arrêt comme veto »)

**Constat.** « Veto » est abusif : le signal d'arrêt est ciblé sur les danseuses d'autres sites (Seeley 2012), gradué selon la menace (Tan 2016) et cumulatif. La trémulation sert surtout à recruter des receveuses, ce qui correspond à une mise à l'échelle des consommateurs plutôt qu'à un freinage. Côté fourmi, « absence de retours » omet la phéromone répulsive explicite.

**Preuve.** https://doi.org/10.1126/science.1210361 ; https://doi.org/10.1371/journal.pbio.1002423 ; https://doi.org/10.1242/jeb.00398 ; https://doi.org/10.1242/bio.025445 ; https://doi.org/10.1038/438442a ; https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

**Recommandation.** Parler d'inhibition croisée graduée et ciblée. Équivalents : backpressure côté consommateur, limitation de débit, backoff avec gigue, NACK; trémulation = mise à l'échelle des consommateurs. Ajouter la phéromone « no entry » (Monomorium).

**Disposition.** Modifié — Le « veto » est remplacé par une inhibition probabiliste, ciblée, graduelle et cumulative (H5.1 à H5.4 : ciblage et adressage gradué), la trémulation est rapprochée de la mise à l'échelle des consommateurs plus contre-pression (Ctl4, E4.5) et la phéromone « no entry » est ajoutée côté fourmi; équivalents retenus : backpressure, 429 avec `retry-after`. Écart : le backoff exponentiel avec gigue et le NACK ne figurent nulle part. — Traité dans : ../../00-cadre.md §2.4 (points 7, 9); ../../06-metriques-et-typologie.md §6.2 (ligne Freinage); ../../10-glossaire.md (freinage, inhibition croisée, signal d'arrêt, trémulation); ../../../projets/P5-decision-par-quorum.md §3 (H5.4), §7.1; ../../../projets/P4-regulation-sans-vue-densemble.md §6 (E4.5), §7.2 (Rel5)

### CA-09 · majeur · Tableau, ligne Décision (« Consensus sans coordinateur »)

**Constat.** Homonymie. Le quorum biologique est un seuil local non linéaire, réglable entre vitesse et justesse, qui admet des décisions scindées. Le consensus distribué exige accord, validité et terminaison sous un modèle de fautes (FLP 1985), et le quorum y désigne des majorités qui s'intersectent. Les ponts formels existent mais sont absents de v3.

**Preuve.** https://doi.org/10.1098/rstb.2008.0204 ; https://doi.org/10.1098/rspb.2003.2527 ; https://arxiv.org/abs/1505.03799 ; https://doi.org/10.1089/cmb.2021.0369 ; https://doi.org/10.1145/3149.214121 (méta)

**Recommandation.** Parler d'« agrégation à seuil ». La comparer au vote majoritaire et au consensus tolérant aux fautes. Citer Ghaffari et al. (PODC 2015), Zhao, Lynch et Pratt (2022), Feinerman et Korman (2013), Navlakha et Bar-Joseph (2015).

**Disposition.** Modifié — Le quorum biologique est nommé « agrégation à seuil » pour les agents (en n effectif) et distingué du consensus tolérant aux fautes (homonymies 6 et 7); P5 compare quorum local, vote indépendant, agent unique et témoin orchestré à erreurs corrélées (E5.6) et cite Ghaffari et al. 2015 comme borne de coût. Écart : pas de comparaison formelle au consensus tolérant aux fautes, et Zhao, Lynch et Pratt 2022, Feinerman et Korman 2013, Navlakha et Bar-Joseph 2015 sont absents de la bibliographie (Zhao et al. 2021 y figure). — Traité dans : ../../06-metriques-et-typologie.md §1.5, §7 (lignes 6 et 7); ../../10-glossaire.md (quorum, consensus, Homonymies à lever); ../../../projets/P5-decision-par-quorum.md §6 (E5.6), §7.1 (Formalisations algorithmiques), §7.2 (Primitives); ../../11-bibliographie.md

### CA-10 · majeur · Ruptures de l'analogie (absentes de v3) : indépendance et erreurs corrélées

**Constat.** L'essaim tire sa justesse de l'indépendance des évaluations (List, Elsholtz, Seeley 2009). Les agents LLM partagent leurs erreurs (60 % d'accord sur les erreurs, même d'un fournisseur à l'autre), se conforment (BenchForm), et le débat induit une martingale où le vote fait l'essentiel du gain.

**Preuve.** https://doi.org/10.1098/rstb.2008.0277 ; https://arxiv.org/abs/2506.07962 ; https://arxiv.org/abs/2501.13381 ; https://arxiv.org/abs/2508.17536

**Recommandation.** Ajouter une ligne « vérification indépendante avant amplification » et un banc qui mesure les cascades d'information (agents qui lisent ou non les sorties des autres).

**Disposition.** Accepté — 06 ajoute la ligne « Vérification indépendante » (information privée, inspection avant interdépendance, erreurs corrélées des LLM, n_eff) et le banc E6.3 mesure les cascades (réponses visibles ou masquées, corrélation des erreurs, vérificateur indépendant), prolongé par H5.8, T7.9, T7.14 et l'indicateur de cascade de P8. — Traité dans : ../../06-metriques-et-typologie.md §4.6 (point 3), §6.2 (ligne Vérification indépendante); ../../../projets/P6-defaillances-et-defenses.md §3 (H6.3), §6 (E6.3); ../../../projets/P5-decision-par-quorum.md §3 (H5.8), §6 (E5.6); ../../../projets/P7-synthese-agentique.md §5 (T7.9, T7.14); ../../../projets/P8-individu-et-colonie.md §6 (E8.3)

### CA-11 · majeur · Projet 3, volet agentique

**Constat.** « Des agents identiques oscillent; la diversité stabilise » est affirmé sans preuve côté LLM. La température n'équivaut pas à une diversité de seuils, et la diversité entre modèles est plus faible qu'on le suppose.

**Preuve.** https://doi.org/10.1126/science.1096340 ; https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ ; https://arxiv.org/abs/2506.07962

**Recommandation.** Formuler en hypothèse. Prendre la gigue de backoff comme référence d'ingénierie (thundering herd) et contrôler la corrélation des erreurs entre modèles.

**Disposition.** Modifié — « Des agents identiques oscillent » devient une hypothèse sans acquis (cadre, point 13), exploratoire en P3 (H3.9, E3.9) et P4 (H4.6) et confirmatoire en P7 (H7.9, E7.7, diversité par personas et mélange de modèles, non par la température), avec corrélation des erreurs entre modèles mesurée (T7.9, T7.14, H7.10). Écart : la gigue de backoff (thundering herd) n'est pas retenue comme référence d'ingénierie. — Traité dans : ../../00-cadre.md §2.4 (points 13, 16); ../../10-glossaire.md (diversité); ../../03-plan-de-recherche.md §3.4 (H3.9), §3.8 (H7.9); ../../../projets/P3-division-du-travail.md H3.9, E3.9; ../../../projets/P7-synthese-agentique.md §6.3 (E7.7); ../../../projets/P4-regulation-sans-vue-densemble.md §6 (E4.7)

### CA-12 · majeur · Ruptures de l'analogie : coût, échelle, environnement textuel

**Constat.** Coût : multi-agent ≈ 15× les jetons, essaims LLM ≈ 300× le temps de calcul. Échelle : bancs habituels de 2 à 5 agents, performance qui chute avec la taille alors que les mécanismes biologiques profitent d'un grand N. Environnement textuel : pas de localité, coût de lecture croissant, même canal pour données et instructions.

**Preuve.** https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2506.14496 ; https://arxiv.org/abs/2507.08616 ; https://doi.org/10.1086/303255 ; https://doi.org/10.1086/303256 ; inféré

**Recommandation.** Normaliser toutes les comparaisons par le coût en jetons. Faire varier N. Imposer une perception locale aux agents, comme dans SwarmBench.

**Disposition.** Modifié — Les comparaisons se font à budget égal, les coûts de ≈ 15 × et ≈ 300 × sont consignés comme ruptures de l'analogie, N varie (agents à règle à N = 10 et N biologique, hybride à N = 100, E9.1 jusqu'à N = 500) et la portée R_port impose une perception locale (SwarmBench : vue k × k). Adaptation : le budget primaire est en dollars facturés (jetons et appels en sensibilité) et les agents LLM de P7 restent à N = 10. — Traité dans : ../../06-metriques-et-typologie.md §4.1, §4.6 (points 2, 7), §6.2 (ligne Échelle et coût par individu); ../../03-plan-de-recherche.md §5.1 (budget égal B); ../../../projets/P7-synthese-agentique.md §6.3 (E7.8), §7.3; ../../../projets/P9-mouvement-collectif-et-construction.md §5 (T9.30), E9.1

### CA-13 · majeur · Ruptures de l'analogie : apparentement et adversarialité

**Constat.** Même les colonies ont besoin de coercition : l'altruisme extrême exige parenté et police (Ratnieks et Helanterä 2009). Des agents de mandants différents (A2A inter-organisations) n'ont ni l'une ni l'autre par défaut.

**Preuve.** https://doi.org/10.1098/rstb.2009.0129 ; https://arxiv.org/abs/2602.08009

**Recommandation.** Faire de l'alignement des intérêts une variable expérimentale. Ajouter des mécanismes de police : réputation (RAPS), vérificateurs.

**Disposition.** Modifié — La rupture est consignée (coopération acquise par l'évolution et non hypothèse de protocole; ni parenté ni police par défaut entre mandants différents) et la police est abordée par des vérificateurs indépendants ou corrélés (H6.6, E6.6) et par l'expiration et la réputation des entrées (E6.7). Écart : l'alignement des intérêts n'est pas une variable expérimentale (P7 le déclare hors périmètre) et RAPS n'est pas cité. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md §7.2 (point 3), §6 (E6.6, E6.7); ../../../projets/P7-synthese-agentique.md §7.3 (ligne Intérêts); ../../../projets/P5-decision-par-quorum.md §7.2 (Intérêts)

### CA-14 · majeur · Projet 6 (Pathologies)

**Constat.** L'association prompt injection ≈ mimétisme chimique est imprécise : le mimétisme usurpe une identité, alors que l'injection détourne l'action. L'analogue biologique de l'injection est la « substance de propagande » des fourmis esclavagistes, qui pousse les hôtes à s'attaquer entre eux.

**Preuve.** https://doi.org/10.1126/science.172.3980.267 ; https://doi.org/10.1007/bf01012348 ; https://arxiv.org/abs/2410.07283 ; https://arxiv.org/abs/2609.10871

**Recommandation.** Mimétisme ↔ usurpation de carte d'agent ou de capacité (A2ABreak; cartes signées dans A2A 1.0). Propagande ↔ injection. Propagation ↔ Prompt Infection.

**Disposition.** Accepté — P6 pose mimétisme ↔ usurpation d'identité ou de capacité (carte d'agent usurpée; registre à signature en témoin), propagande ↔ injection indirecte et propagation ↔ Prompt Infection, et corrige la v3 (le mimétisme usurpe une identité, l'injection détourne une action); A2ABreak (arXiv:2609.10871) n'est que signalée, hors bibliographie. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md §2 (corrections de la v3), §7.1 (codes I1 à I3, C1, C2), §7.2 (point 1), §6 (E6.6); ../../06-metriques-et-typologie.md §6.2 (ligne Identité)

### CA-15 · majeur · Technique et parcours; volet agentique

**Constat.** A2A (v1.0 du 12 mars 2026, Linux Foundation, à l'Agentic AI Foundation depuis le 27 août 2026 : point à point, agents opaques, pas de pub/sub natif) et MCP (spécification 2026-07-28 sans état : hôte/client/serveur pour outils et contexte) ne sont pas mentionnés.

**Preuve.** https://a2a-protocol.org/latest/specification/ ; https://a2a-protocol.org/latest/blog/archive/2026/ ; https://blog.modelcontextprotocol.io/posts/2026-07-28/

**Recommandation.** Implanter la piste en serveur MCP exposant un champ à décroissance, la danse en messages A2A ou sur un bus sans rétention, et l'orchestration témoin en client A2A superviseur. Figer les versions de spécification.

**Disposition.** Accepté — P7 implante PER en serveur MCP (ressource lue, outils `deposit` et `sense`, décroissance ajoutée par le serveur), DIF en bus sans rétention propre au harnais (A2A et MCP n'ont pas de pub/sub entre pairs), ORC en client A2A superviseur et CHS en messages A2A typés; MCP 2026-07-28 et A2A 1.0.0 (v1.0.1 signalée) sont consignés au manifeste et à revérifier avant exécution (R84). — Traité dans : ../../../projets/P7-synthese-agentique.md §7.1, §9.5, §11.1 (R84); ../../06-metriques-et-typologie.md §1.3 (lignes A2A 1.0, MCP); ../../10-glossaire.md (A2A, MCP)

### CA-16 · majeur · Bibliographie, volet stigmergie et tableaux noirs

**Constat.** Les fondements sont absents : Grassé 1959, Theraulaz et Bonabeau 1999, Heylighen 2016, Parunak 2002, Weyns et al. 2007, CArtAgO, Hearsay-II, Nii 1986, Linda. Les tableaux noirs LLM récents aussi : Salemi 2025, DeLM 2026, LogAct 2026, SwarmWorld 2026. Nuance à ajouter : les tableaux noirs classiques ont un ordonnanceur, et beaucoup de systèmes LLM « décentralisés » sont des hybrides.

**Preuve.** https://direct.mit.edu/artl/issue/5/2 ; https://dl.acm.org/doi/10.1145/544741.544843 ; https://mas.cs.umass.edu/Documents/Erman_Hearsay80.pdf ; https://arxiv.org/abs/2604.07988 ; https://arxiv.org/abs/2608.26081

**Recommandation.** Ajouter un état de l'art « environnement comme médium de coordination » et classer chaque système cité comme orchestré, chorégraphié, stigmergique ou hybride.

**Disposition.** Modifié — Les systèmes cités sont classés par régime (orchestré, chorégraphié, stigmergique, hybride) dans le placement sourcé de 06 (Nii en deux lectures, tableaux noirs LLM hybrides, SwarmWorld stigmergique), dans S0 et dans P7, avec Grassé, Theraulaz et Bonabeau, Heylighen, Hearsay-II, Nii, Salemi et Mao et Mirhoseini en bibliographie. Écart : aucun état de l'art dédié (matière répartie entre 06, S0, P7 et la revue du plan) et plusieurs fondements manquent à la bibliographie. — Traité dans : ../../06-metriques-et-typologie.md §1.3; ../../../projets/S0-socle.md §2, §8.1; ../../../projets/P7-synthese-agentique.md §2; ../../03-plan-de-recherche.md §8.2; ../../11-bibliographie.md

### CA-17 · majeur · Ligne Réversibilité (absente)

**Constat.** La colonie tolère la perte, alors qu'une chorégraphie agentique avec effets de bord exige des compensations (sagas). Fowler signale aussi que les flux par événements sont difficiles à observer.

**Preuve.** https://microservices.io/patterns/data/saga.html ; https://arxiv.org/abs/2503.11951 ; https://martinfowler.com/articles/201701-event-driven.html

**Recommandation.** Ajouter une ligne « réversibilité » et un mode d'échec « action irréversible sans compensation » au projet 6. Prévoir des traces rejouables.

**Disposition.** Accepté — 06 ajoute la ligne « Réversibilité » (pertes tolérées chez l'insecte, effets de bord à compenser chez l'agent, sagas), l'issue codée « action irréversible sans compensation » (code X1 de la taxonomie P6) et les cas d'école de sagas (CE1, CE6, T0.33); les traces rejouables viennent du journal et de la cassette. — Traité dans : ../../06-metriques-et-typologie.md §5.3, §6.2 (ligne Réversibilité); ../../../projets/P6-defaillances-et-defenses.md §7.1 (code X1); ../../../projets/S0-socle.md §4.3 (CE1, CE6); ../../../projets/P7-synthese-agentique.md §9.4

### CA-18 · majeur · Projet 7 (« seul projet sans résultat publié à reproduire »)

**Constat.** C'est inexact : SwarmBench (fourragement, flocking, etc. avec perception locale), AgentsNet (jusqu'à 100 agents) et Kim et al. fournissent des résultats à reproduire. L'affirmation contredit le critère de rigueur du programme.

**Preuve.** https://arxiv.org/abs/2505.04364 ; https://arxiv.org/abs/2507.08616 ; https://arxiv.org/abs/2512.08296

**Recommandation.** Reproduire d'abord une tâche SwarmBench ou un résultat de Kim et al., puis étendre.

**Disposition.** Modifié — L'affirmation est retirée (cadre, correction 12) et P7 débute par des ancrages publiés avec porte d'ancrage (jeu de nommage, débat contre vote, vote selon N, LLM-ACO, fourmis LLM de NetLogo); SwarmBench et Kim et al. 2025a sont repris ailleurs (T9.30 à T9.32 en P9, T8.12 en P8 exécutée dans P7) sans conditionner P7, et AgentsNet n'est pas retenu. — Traité dans : ../../00-cadre.md §2.4 (point 12); ../../../projets/P7-synthese-agentique.md §1 (Séquence imposée), §5 (tableau A, portes); ../../../projets/P9-mouvement-collectif-et-construction.md §5 (T9.30 à T9.32), PR-6; ../../../projets/P8-individu-et-colonie.md §5.4 (T8.12)

### CA-19 · majeur · Projet 7 (grille Haiku/Sonnet/Opus)

**Constat.** La grille confond capacité, coût et latence au sein d'une seule famille, aux erreurs corrélées. Chez Anthropic, l'usage de jetons explique à lui seul 80 % de la variance sur BrowseComp.

**Preuve.** https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2506.07962

**Recommandation.** Ajouter un modèle d'un autre fournisseur et un modèle à poids ouverts, figer les identifiants et la température, normaliser par jetons et inclure un témoin orchestré.

**Disposition.** Modifié — « Capacité » est traitée comme facteur catégoriel (paquet modèle, génération, raisonnement), les identifiants complets sont figés avec `response.model` consigné et replis désactivés, et la comparaison se fait à budget égal avec un témoin orchestré dans chaque scénario. Écart : la grille reste dans une seule famille (Haiku 4.5, Sonnet 5.5, Opus 5.5), l'ancre à poids ouverts n'est qu'optionnelle et la température, non réglable, est remplacée par K répétitions et une cassette. — Traité dans : ../../../projets/P7-synthese-agentique.md §6.1, §9.3, §11.1 (R71, R87), §11.4; ../../00-cadre.md §2.4 (point 16); ../../06-metriques-et-typologie.md §4.2, §5.2

### CA-20 · majeur · Colonne Fourmilière (tous projets)

**Constat.** La colonne agrège plusieurs genres (Linepithema/Lasius, Pogonomyrmex, Temnothorax, Pheidole, fourmis légionnaires) face à une seule espèce d'abeille. L'équivalent agentique change selon le mécanisme réellement en jeu.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 ; https://doi.org/10.1098/rstb.2002.1066

**Recommandation.** Nommer l'espèce et le mécanisme dans chaque cellule « fourmi ».

**Disposition.** Accepté — Chaque mécanisme est lié à un taxon nommé avec préréglage (*Linepithema humile*, *Lasius niger*, *Pheidole*, *Pogonomyrmex barbatus*, *Temnothorax*, *Eciton*) et le canal est une variable du modèle; les cellules « fourmi » des tables de correspondance et la parité par projet nomment espèce et mécanisme. — Traité dans : ../../00-cadre.md §2.3; ../../06-metriques-et-typologie.md §6.1, §6.2; ../../02-architecture-programme.md §1 (tableau des projets), §5; ../../../projets/P7-synthese-agentique.md §4.2

### CA-21 · majeur · Projet 4 (« loi de Little; rapprochement non publié, de l'auteur »)

**Constat.** L'analyse en files d'attente des délais de transfert chez les insectes sociaux est publiée (Anderson et Ratnieks 1999; Ratnieks et Anderson 1999, « use of queueing delay information in recruitment »). Je n'ai pas vérifié si la loi de Little elle-même a été appliquée.

**Preuve.** https://doi.org/10.1086/303255 ; https://doi.org/10.1086/303256

**Recommandation.** Retirer « non publié », ou le restreindre à l'usage explicite de la loi de Little après une recherche ciblée, en citant ces deux articles.

**Disposition.** Accepté — « Non publié » est retiré : la loi de Little est déclarée déjà appliquée (Anderson et Ratnieks 1999a, Ratnieks et Anderson 1999a, Pagliara et al. 2018) et la fiche P4 ne revendique aucune nouveauté sur Little, seulement la mise en regard de ce que chaque boucle lit (deux files). — Traité dans : ../../00-cadre.md §2.4 (point 6); ../../../projets/P4-regulation-sans-vue-densemble.md §2, §4.9; ../../03-plan-de-recherche.md §8.2 (ligne P4); ../../06-metriques-et-typologie.md §6.2 (ligne Régulation de la charge)

### CA-22 · mineur · Projet 4 (« analogue à TCP (Prabhakar, Dektar, Gordon 2012) »)

**Constat.** Le texte intégral (PMC3426560) ne contient ni « TCP », ni « congestion », ni « Internet »; il ne parle que de réseaux informatiques en général. L'analogie TCP (« Anternet ») viendrait de la presse, ce qui reste non vérifié.

**Preuve.** https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3426560/fullTextXML

**Recommandation.** Réattribuer l'analogie, ou la présenter comme lecture de l'auteur (contrôle de congestion par débit ou par délai).

**Disposition.** Accepté — L'analogie TCP est réattribuée au communiqué de Stanford (Carey 2012) et à Gordon 2014, déclarée absente de Prabhakar et al. 2012 et portée comme *Analogie* d'auto-cadencement. — Traité dans : ../../00-cadre.md §2.4 (point 5); ../../../projets/P4-regulation-sans-vue-densemble.md §2, §7.2 (Rel1); ../../10-glossaire.md (analogie TCP)

### CA-23 · mineur · Projet 5 (« Seeley et Visscher 2004 »)

**Constat.** Référence ambiguë : deux articles de 2004, BES 56:594-601 (quorum sensing) et Apidologie 35:101-116 (group decision making).

**Preuve.** https://doi.org/10.1007/s00265-004-0814-5 (méta) ; https://doi.org/10.1051/apido:2004004 (méta)

**Recommandation.** Préciser lequel est cité.

**Disposition.** Accepté — L'étiquette « Seeley et Visscher 2004 » désigne l'article de *Behav. Ecol. Sociobiol.* 56:594-601 (quorum sensing), distingué de l'article d'*Apidologie* 35:101-116, noté comme référence à ajouter. — Traité dans : ../../11-bibliographie.md (entrée Seeley et Visscher 2004); ../../../projets/P5-decision-par-quorum.md §13 (À ajouter à la bibliographie)

### CA-24 · mineur · Thèse « la reine ne commande pas »

**Constat.** Vrai pour l'allocation des tâches, mais les phéromones royales influent sur la division du travail : c'est une diffusion centrale, sans être un ordre.

**Preuve.** https://doi.org/10.3390/molecules30112369 ; inféré

**Recommandation.** Nuancer, et proposer comme analogue le prompt système partagé (contrainte diffusée, pas commande).

**Disposition.** Accepté — La thèse est reformulée et la reine nuancée (elle régule la reproduction par phéromones sans assigner de tâche; encart « Ce que fait vraiment la reine »), la ligne « Modulation globale » pose le prompt système partagé comme contrainte diffusée et non comme ordre, et P7 impose un prompt système commun à chaque cellule. — Traité dans : ../../00-cadre.md §2.1, §8; ../../06-metriques-et-typologie.md §6.1 (ligne Modulation globale); ../../07-vulgarisation-evaluation.md §7.3; ../../10-glossaire.md (modulation); ../../../projets/P7-synthese-agentique.md §7.3 (ligne Rôle de la reine)

### CA-25 · mineur · Glossaire (absent)

**Constat.** Le mot « swarm » piège : OpenAI Swarm est un cadre d'orchestration par handoffs, et une étude sur les « essaims LLM » s'en sert pour évaluer l'intelligence en essaim.

**Preuve.** https://github.com/openai/swarm ; https://arxiv.org/abs/2506.14496

**Recommandation.** Ajouter un glossaire : orchestration, chorégraphie, stigmergie, essaim, quorum, consensus.

**Disposition.** Accepté — Le glossaire définit orchestration, chorégraphie, stigmergie, essaim et swarm, quorum et consensus, et sa table des homonymies signale OpenAI Swarm (orchestration par transferts), les deux « SwarmBench » et l'étude d'essaims LLM de Rahman et al. 2025. — Traité dans : ../../10-glossaire.md (entrées; Homonymies à lever, ligne swarm); ../../06-metriques-et-typologie.md §7 (homonymie 3)

### CA-26 · mineur · Question transversale (gain collectif)

**Constat.** Le gain collectif est conditionnel : les colonies ne battent les individus que sur les tâches difficiles (Sasaki 2013), et les gains multi-agents LLM sont souvent minimes (MAST) ou saturent avec la capacité (Kim 2025).

**Preuve.** https://doi.org/10.1073/pnas.1304917110 ; https://arxiv.org/abs/2503.13657 ; https://arxiv.org/abs/2512.08296

**Recommandation.** Ajouter la difficulté de la tâche comme facteur expérimental.

**Disposition.** Accepté — La difficulté est un facteur déclaré (D1 à D5 de P8; p_w, ρ, K dans E8.1; p_SAS dans H8.6 et E8.5) et 06 exige de rapporter la difficulté et la précision de l'agent seul (G de signe changeant attendu); P7 la calibre (SOLO entre 40 et 80 %) plutôt que de la faire varier. — Traité dans : ../../00-cadre.md §3 (QR1); ../../03-plan-de-recherche.md §2.2; ../../06-metriques-et-typologie.md §4.6 (point 4), §4.7; ../../../projets/P8-individu-et-colonie.md §3 (H8.1, H8.6), §6 (E8.1, E8.5), §7.1

## Ajouts recommandés

### CA-A01 · ajout

Projet 0 « Typologie » : visuel interactif à trois axes (plan global, contrôle à l'exécution, médium partagé) qui place orchestration, chorégraphie, sagas, tableau noir, piste, danse, A2A et MCP.

**Disposition.** Modifié — S0 livre la page de typologie interactive (jeu de données de 21 entrées, grille des trois axes, indicateurs C_*) qui place orchestrations, chorégraphies, sagas, tableaux noirs, piste, danse et A2A; c'est un livrable de S0 en phase 0 et non un « Projet 0 », et MCP figure au placement de 06 mais pas dans les 21 entrées de S0. — Traité dans : ../../../projets/S0-socle.md §8.1, §8.2; ../../06-metriques-et-typologie.md §1.3; ../../07-vulgarisation-evaluation.md §2.2 (ligne S0); ../../00-cadre.md §5

### CA-A02 · ajout

Projet « Projection contre émergence » : spécifier une chorégraphie (type global multipartite ou langage chorégraphique) et comparer sa réalisation projetée à une réalisation stigmergique (réussite, messages, robustesse à la perte d'agents).

**Disposition.** Modifié — Intégré à P7 plutôt que projet autonome : bras CHS (type global projeté, conformité vérifiée) contre PER et DIF en S5-D, H7.11 (exploratoire) et écart de réalisation Δ_PE, rapport de coûts κ_PE et robustesse ΔRob_PE (retrait de 30 % des agents) définis en 06, avec T7.13 comme outil. — Traité dans : ../../06-metriques-et-typologie.md §1.5, §8.2; ../../../projets/P7-synthese-agentique.md §3.2 (H7.11), §5 (T7.13), §7.1 (bras CHS); ../../../projets/S0-socle.md §4.3 (CE2)

### CA-A03 · ajout

Témoin orchestré systématique et facteur « structure de la tâche » (décomposable contre séquentielle) dans chaque volet agentique.

**Disposition.** Accepté — Témoin orchestré dans chaque volet agentique et champ obligatoire `structure_tache` (décomposable ou séquentielle, classification préenregistrée), avec mesure commune Δ_orc et lecture par cadre d'étude des prédictions de signes divergents. — Traité dans : ../../00-cadre.md §3 (QR3); ../../03-plan-de-recherche.md §5.1, §11.1 (IN1); ../../02-architecture-programme.md §7 (D4); ../../../projets/S0-socle.md §7 (Témoin orchestré, Structure de tâche)

### CA-A04 · ajout

Banc « indépendance et cascades » : agents qui lisent ou non les sorties des autres; comparer agrégation à seuil, vote majoritaire et débat.

**Disposition.** Modifié — Le banc n'est pas unique : E6.3 mesure la cascade selon que les agents voient ou non les réponses précédentes (avec vérificateur indépendant), E5.6 compare vote indépendant, quorum local k-sur-n (agrégation à seuil) et témoin orchestré à erreurs corrélées, et T7.4, T7.5 et H8.7 opposent débat et vote. Écart : aucun plan ne croise lecture des sorties d'autrui, agrégation à seuil, vote et débat. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md §6 (E6.3); ../../../projets/P5-decision-par-quorum.md §6 (E5.6); ../../../projets/P7-synthese-agentique.md §5 (T7.4, T7.5); ../../../projets/P8-individu-et-colonie.md §3 (H8.7); ../../06-metriques-et-typologie.md §4.3

### CA-A05 · ajout

Implantation par protocoles réels, versions figées : champ de phéromone en serveur MCP (A2A 1.0.0, MCP 2026-07-28), danse en A2A ou sur bus sans rétention, superviseur A2A comme témoin.

**Disposition.** Accepté — Même implantation que CA-15 : PER en serveur MCP à décroissance, DIF sur bus sans rétention, ORC en client A2A superviseur, avec MCP 2026-07-28 et A2A 1.0.0 consignés au manifeste et à revérifier avant exécution. — Traité dans : ../../../projets/P7-synthese-agentique.md §9.5, §7.1, §11.1 (R84); ../../06-metriques-et-typologie.md §1.3

### CA-A06 · ajout

Reproduire d'abord un résultat LLM publié (tâche SwarmBench ou Kim et al. 2025) avant le projet 7.

**Disposition.** Modifié — P7 reproduit d'abord des résultats LLM publiés (T7.1 à T7.8, porte d'ancrage) avant la grille, mais ce ne sont pas ceux proposés : SwarmBench est repris en P9 (T9.30 à T9.32, porte PR-6) et Kim et al. 2025a en T8.12 (P8, exécutée dans le harnais de P7), sans condition d'entrée pour P7. — Traité dans : ../../../projets/P7-synthese-agentique.md §1 (Séquence imposée), §5 (portes); ../../../projets/P9-mouvement-collectif-et-construction.md §5 (T9.30 à T9.32); ../../../projets/P8-individu-et-colonie.md §5.4 (T8.12); ../../00-cadre.md §2.4 (point 12)

### CA-A07 · ajout

Nouvelles lignes au tableau : découplage (Eugster), vérification indépendante, identité/reconnaissance, réversibilité (sagas).

**Disposition.** Accepté — Les quatre lignes sont au tableau de correspondance de 06 : « Découplage » (Eugster), « Vérification indépendante », « Identité » (hydrocarbures cuticulaires, cartes d'agent) et « Réversibilité » (sagas), chacune avec sa colonne « Où l'analogie casse » et son statut. — Traité dans : ../../06-metriques-et-typologie.md §6.1 (ligne Découplage), §6.2 (lignes Vérification indépendante, Identité, Réversibilité)

### CA-A08 · ajout

Volet sécurité du projet 6 : propagande ↔ injection, mimétisme ↔ usurpation de carte d'agent, propagation épidémique (Prompt Infection), rattaché à EscapeBench et LeakLab.

**Disposition.** Accepté — P6 reprend les trois correspondances (propagande ↔ injection indirecte, mimétisme ↔ usurpation de carte d'agent, propagation ↔ Prompt Infection) dans sa taxonomie D, I, C, X et un volet sécurité défensif (marqueur inerte, sans charge) rattaché méthodologiquement à EscapeBench et LeakLab. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md §7.1, §7.5 (Lien avec EscapeBench et LeakLab), §6 (E6.6, E6.7)

### CA-A09 · ajout

Bibliographie de pont : Ghaffari et al. 2015, Zhao, Lynch et Pratt 2022, Feinerman et Korman 2013, Navlakha et Bar-Joseph 2015, Marshall et al. 2009, Sumpter et Pratt 2009.

**Disposition.** Modifié — Ghaffari et al. 2015, Marshall et al. 2009 et Sumpter et Pratt 2009 sont en bibliographie et mobilisés (P5, S0, 06), avec Zhao et al. 2021 (SSS 2021) à la place de la référence 2022 de l'audit. Écart : Feinerman et Korman 2013 et Navlakha et Bar-Joseph 2015 sont absents de la bibliographie et des documents. — Traité dans : ../../11-bibliographie.md (Ghaffari et al. 2015, Zhao et al. 2021, Marshall et al. 2009, Sumpter et Pratt 2009); ../../06-metriques-et-typologie.md §1.5, §7; ../../../projets/P5-decision-par-quorum.md §7.1 (Formalisations algorithmiques)

### CA-A10 · ajout

Glossaire des homonymies : chorégraphie, quorum, consensus, swarm, délégation.

**Disposition.** Accepté — Le glossaire consigne les homonymies chorégraphie, quorum, consensus, swarm et délégation (avec seuil, mémoire, apprentissage, signal et bruit) et 06 en fixe la liste fermée de 25 entrées, appliquée par le lexique contrôlé de V0. — Traité dans : ../../10-glossaire.md (Homonymies à lever); ../../06-metriques-et-typologie.md §7; ../../07-vulgarisation-evaluation.md §7.2


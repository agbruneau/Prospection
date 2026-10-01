# Constats — Chorégraphie et agentique

Source : [rapport complet](choregraphie-agentique.md). 26 constats (2 critiques, 18 majeurs, 6 mineurs) et 10 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** L'intuition centrale tient : piste contre danse, c'est bien stigmergie contre signal direct. Mais v3 emploie « chorégraphie » dans un sens que l'informatique ne lui donne pas : en WS-CDL, BPMN, programmation chorégraphique et types de session multipartites, une chorégraphie est un plan global explicite projeté sur les participants, alors qu'une colonie s'auto-organise sans aucun plan global. Aucune expérience n'inclut d'orchestrateur témoin. Or la littérature 2025-2026 est partagée : Kim et al. mesurent 4,4× d'amplification d'erreurs en centralisé contre 17,2× en indépendant, tandis que les tableaux noirs LLM et DeLM battent le maître-esclave sur certaines tâches. Le résultat dépend donc de la structure de la tâche. Dans le tableau de correspondance, quatre lignes sont à nuancer et deux équivalences sont abusives (recrutement → « délégation », freinage → « veto »). La question transversale confond richesse du signal et capacité de l'agent. A2A v1.0, MCP 2026-07-28, la littérature sur la stigmergie et les tableaux noirs, et les bancs LLM existants (SwarmBench, AgentsNet) sont absents, alors qu'ils rendraient le volet agentique concret et reproductible.

## Constats

### CA-01 · critique · Thèse et titre; tableau « Deux chorégraphies naturelles »

**Constat.** Le cadrage confond l'absence de coordinateur à l'exécution avec l'absence de plan global. En informatique (WS-CDL « global viewpoint », Montesi « coordination plan », global types projetés en MPST), la chorégraphie va du haut vers le bas, avec une spécification globale; la colonie va du bas vers le haut, par émergence de règles locales (Heylighen 2016 : coordination sans planification ni contrôle).

**Preuve.** https://www.w3.org/TR/ws-cdl-10/ ; https://www.fabriziomontesi.com/bliki/Choreography ; https://dl.acm.org/doi/10.1145/2827695 ; https://pespmc1.vub.ac.be/Papers/StigmergyICognSystems.pdf ; https://doi.org/10.1145/2103656.2103680 (méta)

**Recommandation.** Adopter une typologie à trois axes (plan global explicite, contrôle central à l'exécution, médium partagé) qui distingue orchestration, chorégraphie et auto-organisation stigmergique ou par signaux directs. Nommer le « chorégraphe » de chaque côté : sélection naturelle d'un côté, concepteur du prompt de l'autre. Poser le problème inverse de la projection comme question de recherche.

**Disposition.** _à renseigner_

### CA-02 · critique · Projets 1, 3, 5 (volet agentique) et projet 7

**Constat.** Aucune condition orchestrée ne sert de témoin, alors que le programme se définit « par opposition à l'orchestration ». La littérature est partagée : Kim et al. 2025 (amplification d'erreurs 17,2× en indépendant, 7,8× en décentralisé, 4,4× en centralisé; +80,8 % en centralisé sur la finance, +9,2 % en décentralisé sur BrowseComp-Plus); Anthropic emploie l'orchestrator-worker; Salemi et al. (tableau noir, +13 à 57 % sur le maître-esclave) et DeLM (+10,5 points sur SWE-bench Verified) favorisent la décentralisation.

**Preuve.** https://arxiv.org/html/2512.08296 ; https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2510.01285 ; https://arxiv.org/abs/2606.10662 ; https://cognition.com/blog/dont-build-multi-agents

**Recommandation.** Ajouter un témoin orchestré à chaque volet agentique, croiser l'architecture avec la structure de la tâche (décomposable contre séquentielle) et formuler des hypothèses réfutables où l'orchestration peut gagner. Garder « la reine ne commande pas » comme constat biologique, pas comme prescription.

**Disposition.** _à renseigner_

### CA-03 · majeur · Question transversale; projet 7

**Constat.** La question transversale confond deux facteurs : la richesse du signal (scalaire, symbole, langage) et la capacité de l'agent (fourmi, abeille, LLM). En plus, l'ordre de richesse n'est pas établi : la fourmi émet des signaux multicomposantes et l'abeille un vecteur analogique.

**Preuve.** inféré; https://doi.org/10.1038/438442a ; https://doi.org/10.1038/nature03105

**Recommandation.** Plan factoriel : agents LLM restreints à un canal scalaire, vectoriel ou textuel, et agents à règle simple sur des canaux riches. Mesurer la richesse en bits par signal et en coût par signal.

**Disposition.** _à renseigner_

### CA-04 · majeur · Tableau, ligne Canal

**Constat.** Un journal d'événements (ajout seul, ordonné, sans agrégation ni décroissance) n'est pas un champ de phéromone, que l'environnement agrège, évapore et diffuse (Parunak 2002). Le pub/sub découple temps, espace et synchronisation (Eugster 2003), ce qui ressemble à la piste et non à la danse, couplée en temps et en espace : l'association est inversée. Enfin, chez Pogonomyrmex, la régulation passe par les contacts antennaires et non par une piste.

**Preuve.** https://dl.acm.org/doi/10.1145/544741.544843 ; https://dl.acm.org/doi/10.1145/857076.857078 ; https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670

**Recommandation.** Équivalents proposés : tableau noir, espace de tuples ou ressource MCP avec décroissance pour la piste; diffusion locale éphémère sans rétention pour la danse. Ajouter une ligne « découplage » (Eugster) et nommer l'espèce par cellule.

**Disposition.** _à renseigner_

### CA-05 · majeur · Tableau, ligne Contenu du signal

**Constat.** « Fourmi = scalaire » est réducteur : phéromone répulsive « no entry », polarité donnée par la géométrie, système multimodal, information privée prioritaire. « Abeille = symbolique » est surqualifié : codage analogique d'un vecteur, précision apprise socialement et dépendante de l'auditoire, information souvent ignorée par les butineuses expérimentées. « Agent = langage naturel » est partiel : les messages A2A contiennent aussi des données structurées.

**Preuve.** https://doi.org/10.1038/438442a ; https://doi.org/10.1038/nature03105 ; https://doi.org/10.3758/s13420-025-00697-w ; https://doi.org/10.1371/journal.pone.0064668 ; https://doi.org/10.1126/science.ade1702 ; https://doi.org/10.1073/pnas.2518687123 ; https://doi.org/10.1111/mec.15893 ; https://a2a-protocol.org/latest/specification/

**Recommandation.** Remplacer par trois axes : codage (analogique, discret, compositionnel), débit en bits par signal, vérifiabilité par le récepteur.

**Disposition.** _à renseigner_

### CA-06 · mineur · Tableau, ligne Oubli

**Constat.** « TTL vs expiration des messages » est une tautologie. Le contraste réel porte sur qui oublie : l'environnement (évaporation) ou l'émetteur (attrition des danses, Seeley 2003).

**Preuve.** https://ar5iv.labs.arxiv.org/html/2304.03442 ; https://doi.org/10.1007/s00265-003-0598-z (méta) ; https://arxiv.org/abs/2605.15225 (préprint, preuve faible)

**Recommandation.** Distinguer l'oubli côté environnement (décroissance des poids; récence exponentielle, p. ex. 0,995 par heure de jeu dans Generative Agents), côté émetteur (republication décroissante) et côté récepteur (compaction de contexte).

**Disposition.** _à renseigner_

### CA-07 · majeur · Tableau, ligne Recrutement (« Délégation »)

**Constat.** Équivalence abusive. La délégation est une assignation poussée par un mandant (modèle de tâche A2A, orchestrator-worker), donc du vocabulaire d'orchestration. Le recrutement biologique est tiré : la recrue choisit de suivre et réévalue elle-même. Le tandem est un transfert 1:1 avec rétroaction bidirectionnelle.

**Preuve.** https://arxiv.org/abs/2510.01285 ; https://arxiv.org/abs/2606.10662 ; https://doi.org/10.1038/439153a ; https://a2a-protocol.org/latest/specification/

**Recommandation.** Remplacer par « annonce + volontariat » (agents volontaires sur tableau noir, file de tâches, consommateurs concurrents). Pour le tandem : poignée de main acquittée.

**Disposition.** _à renseigner_

### CA-08 · majeur · Tableau, ligne Freinage; projet 5 (« signaux d'arrêt comme veto »)

**Constat.** « Veto » est abusif : le signal d'arrêt est ciblé sur les danseuses d'autres sites (Seeley 2012), gradué selon la menace (Tan 2016) et cumulatif. La trémulation sert surtout à recruter des receveuses, ce qui correspond à une mise à l'échelle des consommateurs plutôt qu'à un freinage. Côté fourmi, « absence de retours » omet la phéromone répulsive explicite.

**Preuve.** https://doi.org/10.1126/science.1210361 ; https://doi.org/10.1371/journal.pbio.1002423 ; https://doi.org/10.1242/jeb.00398 ; https://doi.org/10.1242/bio.025445 ; https://doi.org/10.1038/438442a ; https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/

**Recommandation.** Parler d'inhibition croisée graduée et ciblée. Équivalents : backpressure côté consommateur, limitation de débit, backoff avec gigue, NACK; trémulation = mise à l'échelle des consommateurs. Ajouter la phéromone « no entry » (Monomorium).

**Disposition.** _à renseigner_

### CA-09 · majeur · Tableau, ligne Décision (« Consensus sans coordinateur »)

**Constat.** Homonymie. Le quorum biologique est un seuil local non linéaire, réglable entre vitesse et justesse, qui admet des décisions scindées. Le consensus distribué exige accord, validité et terminaison sous un modèle de fautes (FLP 1985), et le quorum y désigne des majorités qui s'intersectent. Les ponts formels existent mais sont absents de v3.

**Preuve.** https://doi.org/10.1098/rstb.2008.0204 ; https://doi.org/10.1098/rspb.2003.2527 ; https://arxiv.org/abs/1505.03799 ; https://doi.org/10.1089/cmb.2021.0369 ; https://doi.org/10.1145/3149.214121 (méta)

**Recommandation.** Parler d'« agrégation à seuil ». La comparer au vote majoritaire et au consensus tolérant aux fautes. Citer Ghaffari et al. (PODC 2015), Zhao, Lynch et Pratt (2022), Feinerman et Korman (2013), Navlakha et Bar-Joseph (2015).

**Disposition.** _à renseigner_

### CA-10 · majeur · Ruptures de l'analogie (absentes de v3) : indépendance et erreurs corrélées

**Constat.** L'essaim tire sa justesse de l'indépendance des évaluations (List, Elsholtz, Seeley 2009). Les agents LLM partagent leurs erreurs (60 % d'accord sur les erreurs, même d'un fournisseur à l'autre), se conforment (BenchForm), et le débat induit une martingale où le vote fait l'essentiel du gain.

**Preuve.** https://doi.org/10.1098/rstb.2008.0277 ; https://arxiv.org/abs/2506.07962 ; https://arxiv.org/abs/2501.13381 ; https://arxiv.org/abs/2508.17536

**Recommandation.** Ajouter une ligne « vérification indépendante avant amplification » et un banc qui mesure les cascades d'information (agents qui lisent ou non les sorties des autres).

**Disposition.** _à renseigner_

### CA-11 · majeur · Projet 3, volet agentique

**Constat.** « Des agents identiques oscillent; la diversité stabilise » est affirmé sans preuve côté LLM. La température n'équivaut pas à une diversité de seuils, et la diversité entre modèles est plus faible qu'on le suppose.

**Preuve.** https://doi.org/10.1126/science.1096340 ; https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ ; https://arxiv.org/abs/2506.07962

**Recommandation.** Formuler en hypothèse. Prendre la gigue de backoff comme référence d'ingénierie (thundering herd) et contrôler la corrélation des erreurs entre modèles.

**Disposition.** _à renseigner_

### CA-12 · majeur · Ruptures de l'analogie : coût, échelle, environnement textuel

**Constat.** Coût : multi-agent ≈ 15× les jetons, essaims LLM ≈ 300× le temps de calcul. Échelle : bancs habituels de 2 à 5 agents, performance qui chute avec la taille alors que les mécanismes biologiques profitent d'un grand N. Environnement textuel : pas de localité, coût de lecture croissant, même canal pour données et instructions.

**Preuve.** https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2506.14496 ; https://arxiv.org/abs/2507.08616 ; https://doi.org/10.1086/303255 ; https://doi.org/10.1086/303256 ; inféré

**Recommandation.** Normaliser toutes les comparaisons par le coût en jetons. Faire varier N. Imposer une perception locale aux agents, comme dans SwarmBench.

**Disposition.** _à renseigner_

### CA-13 · majeur · Ruptures de l'analogie : apparentement et adversarialité

**Constat.** Même les colonies ont besoin de coercition : l'altruisme extrême exige parenté et police (Ratnieks et Helanterä 2009). Des agents de mandants différents (A2A inter-organisations) n'ont ni l'une ni l'autre par défaut.

**Preuve.** https://doi.org/10.1098/rstb.2009.0129 ; https://arxiv.org/abs/2602.08009

**Recommandation.** Faire de l'alignement des intérêts une variable expérimentale. Ajouter des mécanismes de police : réputation (RAPS), vérificateurs.

**Disposition.** _à renseigner_

### CA-14 · majeur · Projet 6 (Pathologies)

**Constat.** L'association prompt injection ≈ mimétisme chimique est imprécise : le mimétisme usurpe une identité, alors que l'injection détourne l'action. L'analogue biologique de l'injection est la « substance de propagande » des fourmis esclavagistes, qui pousse les hôtes à s'attaquer entre eux.

**Preuve.** https://doi.org/10.1126/science.172.3980.267 ; https://doi.org/10.1007/bf01012348 ; https://arxiv.org/abs/2410.07283 ; https://arxiv.org/abs/2609.10871

**Recommandation.** Mimétisme ↔ usurpation de carte d'agent ou de capacité (A2ABreak; cartes signées dans A2A 1.0). Propagande ↔ injection. Propagation ↔ Prompt Infection.

**Disposition.** _à renseigner_

### CA-15 · majeur · Technique et parcours; volet agentique

**Constat.** A2A (v1.0 du 12 mars 2026, Linux Foundation, à l'Agentic AI Foundation depuis le 27 août 2026 : point à point, agents opaques, pas de pub/sub natif) et MCP (spécification 2026-07-28 sans état : hôte/client/serveur pour outils et contexte) ne sont pas mentionnés.

**Preuve.** https://a2a-protocol.org/latest/specification/ ; https://a2a-protocol.org/latest/blog/archive/2026/ ; https://blog.modelcontextprotocol.io/posts/2026-07-28/

**Recommandation.** Implanter la piste en serveur MCP exposant un champ à décroissance, la danse en messages A2A ou sur un bus sans rétention, et l'orchestration témoin en client A2A superviseur. Figer les versions de spécification.

**Disposition.** _à renseigner_

### CA-16 · majeur · Bibliographie, volet stigmergie et tableaux noirs

**Constat.** Les fondements sont absents : Grassé 1959, Theraulaz et Bonabeau 1999, Heylighen 2016, Parunak 2002, Weyns et al. 2007, CArtAgO, Hearsay-II, Nii 1986, Linda. Les tableaux noirs LLM récents aussi : Salemi 2025, DeLM 2026, LogAct 2026, SwarmWorld 2026. Nuance à ajouter : les tableaux noirs classiques ont un ordonnanceur, et beaucoup de systèmes LLM « décentralisés » sont des hybrides.

**Preuve.** https://direct.mit.edu/artl/issue/5/2 ; https://dl.acm.org/doi/10.1145/544741.544843 ; https://mas.cs.umass.edu/Documents/Erman_Hearsay80.pdf ; https://arxiv.org/abs/2604.07988 ; https://arxiv.org/abs/2608.26081

**Recommandation.** Ajouter un état de l'art « environnement comme médium de coordination » et classer chaque système cité comme orchestré, chorégraphié, stigmergique ou hybride.

**Disposition.** _à renseigner_

### CA-17 · majeur · Ligne Réversibilité (absente)

**Constat.** La colonie tolère la perte, alors qu'une chorégraphie agentique avec effets de bord exige des compensations (sagas). Fowler signale aussi que les flux par événements sont difficiles à observer.

**Preuve.** https://microservices.io/patterns/data/saga.html ; https://arxiv.org/abs/2503.11951 ; https://martinfowler.com/articles/201701-event-driven.html

**Recommandation.** Ajouter une ligne « réversibilité » et un mode d'échec « action irréversible sans compensation » au projet 6. Prévoir des traces rejouables.

**Disposition.** _à renseigner_

### CA-18 · majeur · Projet 7 (« seul projet sans résultat publié à reproduire »)

**Constat.** C'est inexact : SwarmBench (fourragement, flocking, etc. avec perception locale), AgentsNet (jusqu'à 100 agents) et Kim et al. fournissent des résultats à reproduire. L'affirmation contredit le critère de rigueur du programme.

**Preuve.** https://arxiv.org/abs/2505.04364 ; https://arxiv.org/abs/2507.08616 ; https://arxiv.org/abs/2512.08296

**Recommandation.** Reproduire d'abord une tâche SwarmBench ou un résultat de Kim et al., puis étendre.

**Disposition.** _à renseigner_

### CA-19 · majeur · Projet 7 (grille Haiku/Sonnet/Opus)

**Constat.** La grille confond capacité, coût et latence au sein d'une seule famille, aux erreurs corrélées. Chez Anthropic, l'usage de jetons explique à lui seul 80 % de la variance sur BrowseComp.

**Preuve.** https://www.anthropic.com/engineering/multi-agent-research-system ; https://arxiv.org/abs/2506.07962

**Recommandation.** Ajouter un modèle d'un autre fournisseur et un modèle à poids ouverts, figer les identifiants et la température, normaliser par jetons et inclure un témoin orchestré.

**Disposition.** _à renseigner_

### CA-20 · majeur · Colonne Fourmilière (tous projets)

**Constat.** La colonne agrège plusieurs genres (Linepithema/Lasius, Pogonomyrmex, Temnothorax, Pheidole, fourmis légionnaires) face à une seule espèce d'abeille. L'équivalent agentique change selon le mécanisme réellement en jeu.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 ; https://doi.org/10.1098/rstb.2002.1066

**Recommandation.** Nommer l'espèce et le mécanisme dans chaque cellule « fourmi ».

**Disposition.** _à renseigner_

### CA-21 · majeur · Projet 4 (« loi de Little; rapprochement non publié, de l'auteur »)

**Constat.** L'analyse en files d'attente des délais de transfert chez les insectes sociaux est publiée (Anderson et Ratnieks 1999; Ratnieks et Anderson 1999, « use of queueing delay information in recruitment »). Je n'ai pas vérifié si la loi de Little elle-même a été appliquée.

**Preuve.** https://doi.org/10.1086/303255 ; https://doi.org/10.1086/303256

**Recommandation.** Retirer « non publié », ou le restreindre à l'usage explicite de la loi de Little après une recherche ciblée, en citant ces deux articles.

**Disposition.** _à renseigner_

### CA-22 · mineur · Projet 4 (« analogue à TCP (Prabhakar, Dektar, Gordon 2012) »)

**Constat.** Le texte intégral (PMC3426560) ne contient ni « TCP », ni « congestion », ni « Internet »; il ne parle que de réseaux informatiques en général. L'analogie TCP (« Anternet ») viendrait de la presse, ce qui reste non vérifié.

**Preuve.** https://www.ebi.ac.uk/europepmc/webservices/rest/PMC3426560/fullTextXML

**Recommandation.** Réattribuer l'analogie, ou la présenter comme lecture de l'auteur (contrôle de congestion par débit ou par délai).

**Disposition.** _à renseigner_

### CA-23 · mineur · Projet 5 (« Seeley et Visscher 2004 »)

**Constat.** Référence ambiguë : deux articles de 2004, BES 56:594-601 (quorum sensing) et Apidologie 35:101-116 (group decision making).

**Preuve.** https://doi.org/10.1007/s00265-004-0814-5 (méta) ; https://doi.org/10.1051/apido:2004004 (méta)

**Recommandation.** Préciser lequel est cité.

**Disposition.** _à renseigner_

### CA-24 · mineur · Thèse « la reine ne commande pas »

**Constat.** Vrai pour l'allocation des tâches, mais les phéromones royales influent sur la division du travail : c'est une diffusion centrale, sans être un ordre.

**Preuve.** https://doi.org/10.3390/molecules30112369 ; inféré

**Recommandation.** Nuancer, et proposer comme analogue le prompt système partagé (contrainte diffusée, pas commande).

**Disposition.** _à renseigner_

### CA-25 · mineur · Glossaire (absent)

**Constat.** Le mot « swarm » piège : OpenAI Swarm est un cadre d'orchestration par handoffs, et une étude sur les « essaims LLM » s'en sert pour évaluer l'intelligence en essaim.

**Preuve.** https://github.com/openai/swarm ; https://arxiv.org/abs/2506.14496

**Recommandation.** Ajouter un glossaire : orchestration, chorégraphie, stigmergie, essaim, quorum, consensus.

**Disposition.** _à renseigner_

### CA-26 · mineur · Question transversale (gain collectif)

**Constat.** Le gain collectif est conditionnel : les colonies ne battent les individus que sur les tâches difficiles (Sasaki 2013), et les gains multi-agents LLM sont souvent minimes (MAST) ou saturent avec la capacité (Kim 2025).

**Preuve.** https://doi.org/10.1073/pnas.1304917110 ; https://arxiv.org/abs/2503.13657 ; https://arxiv.org/abs/2512.08296

**Recommandation.** Ajouter la difficulté de la tâche comme facteur expérimental.

**Disposition.** _à renseigner_

## Ajouts recommandés

### CA-A01 · ajout

Projet 0 « Typologie » : visuel interactif à trois axes (plan global, contrôle à l'exécution, médium partagé) qui place orchestration, chorégraphie, sagas, tableau noir, piste, danse, A2A et MCP.

**Disposition.** _à renseigner_

### CA-A02 · ajout

Projet « Projection contre émergence » : spécifier une chorégraphie (type global multipartite ou langage chorégraphique) et comparer sa réalisation projetée à une réalisation stigmergique (réussite, messages, robustesse à la perte d'agents).

**Disposition.** _à renseigner_

### CA-A03 · ajout

Témoin orchestré systématique et facteur « structure de la tâche » (décomposable contre séquentielle) dans chaque volet agentique.

**Disposition.** _à renseigner_

### CA-A04 · ajout

Banc « indépendance et cascades » : agents qui lisent ou non les sorties des autres; comparer agrégation à seuil, vote majoritaire et débat.

**Disposition.** _à renseigner_

### CA-A05 · ajout

Implantation par protocoles réels, versions figées : champ de phéromone en serveur MCP (A2A 1.0.0, MCP 2026-07-28), danse en A2A ou sur bus sans rétention, superviseur A2A comme témoin.

**Disposition.** _à renseigner_

### CA-A06 · ajout

Reproduire d'abord un résultat LLM publié (tâche SwarmBench ou Kim et al. 2025) avant le projet 7.

**Disposition.** _à renseigner_

### CA-A07 · ajout

Nouvelles lignes au tableau : découplage (Eugster), vérification indépendante, identité/reconnaissance, réversibilité (sagas).

**Disposition.** _à renseigner_

### CA-A08 · ajout

Volet sécurité du projet 6 : propagande ↔ injection, mimétisme ↔ usurpation de carte d'agent, propagation épidémique (Prompt Infection), rattaché à EscapeBench et LeakLab.

**Disposition.** _à renseigner_

### CA-A09 · ajout

Bibliographie de pont : Ghaffari et al. 2015, Zhao, Lynch et Pratt 2022, Feinerman et Korman 2013, Navlakha et Bar-Joseph 2015, Marshall et al. 2009, Sumpter et Pratt 2009.

**Disposition.** _à renseigner_

### CA-A10 · ajout

Glossaire des homonymies : chorégraphie, quorum, consensus, swarm, délégation.

**Disposition.** _à renseigner_


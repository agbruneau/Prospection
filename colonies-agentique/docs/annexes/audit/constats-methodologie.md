# Constats — Méthodologie

Source : [rapport complet](methodologie.md). 37 constats (7 critiques, 19 majeurs, 11 mineurs) et 14 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 est une bonne intuition de programme, mais ce n'est pas encore un protocole de recherche. Aucune question testable n'y est posée. Les deux construits centraux, « richesse du signal » et « gain collectif », n'ont pas de définition opérationnelle; le premier est confondu avec l'espèce, la persistance du canal et la localité. Le critère « reproduire un résultat publié » ne fixe ni tolérance, ni nombre de répétitions, ni règle de décision. Le projet 7, seule contribution originale, fait varier sous le nom de « capacité » plusieurs choses à la fois : génération du modèle, mode de réflexion, réglage de la température (impossible sur Sonnet 5.5 et Opus 5.5), date de coupure des connaissances et classifieurs de sécurité. Son plan réel compte 24 cellules, pas 2 × 4, et il n'a ni coût, ni puissance, ni parade au retrait des modèles : Haiku 4.5 n'est garanti que jusqu'au 15 octobre 2026. Deux affirmations sont contredites par les sources primaires : la nouveauté du rapprochement avec la loi de Little (Anderson et Ratnieks 1999 citent Little 1961) et la cible du projet 3 (chez Pheidole, ce sont les majors qui prennent la relève). Tout est corrigeable avec les gabarits du rapport.

## Constats

### ME-01 · critique · Global (Question transversale, projets 1-7)

**Constat.** Aucune question de recherche ni hypothèse falsifiable. La seule question est ouverte, et les colonnes « Agentique » sont des analogies, pas des prédictions.

**Preuve.** inféré (lecture de la v3)

**Recommandation.** Matrice de traçabilité par projet : QR → hypothèse dirigée avec taille d'effet minimale → VI/VD/contrôles → plan → critère de réfutation → analyse. Séparer le confirmatoire (préenregistré) de l'exploratoire (pages interactives).

**Disposition.** Modifié — Chaque projet pose des hypothèses directionnelles avec effet minimal, VI → VD et critère de réfutation, reliées aux QR par une matrice de traçabilité, et le confirmatoire préenregistré est séparé de l'exploratoire (pages interactives). Seules QR2d et la réactivité de QR4a restent sans hypothèse falsifiable (IN19). — Traité dans : ../../03-plan-de-recherche.md (§2 Questions de recherche et traduction en hypothèses; §3 Registre des hypothèses; §4 Matrice de traçabilité; §7 Séparation du confirmatoire et de l'exploratoire; §11 IN19); ../../00-cadre.md (§3 Questions de recherche; §6 principe 4)

### ME-02 · critique · Tableau « Deux chorégraphies », Question transversale, projet 7

**Constat.** La « richesse du signal » (scalaire → symbole → langage) n'est pas opérationnalisée et elle est confondue. Les pistes de fourmis ont une polarité et plusieurs phéromones à décroissance différente, dont des signaux répulsifs. Plusieurs fourmis étudiées n'utilisent pas de piste (Pogonomyrmex, Temnothorax). La richesse varie en même temps que la persistance et la localité. Côté LLM, un canal d'un seul mot suffit à faire passer la coopération de 0 % à 96,7 %.

**Preuve.** Prabhakar et al. 2012 (lu, p4src/prab2012.txt); Jackson et al. 2004 doi:10.1038/nature03105; Robinson et al. 2005 doi:10.1038/438442a; Robinson et al. 2008 doi:10.1007/s00040-008-0994-5; https://arxiv.org/abs/2510.05748; Haldane et Spurway 1954 doi:10.1007/bf02222949

**Recommandation.** Définir la richesse par des propriétés de canal manipulées indépendamment : bits par message (entropie), persistance τ, localité, adressage. Pour les LLM, faire varier le format (scalaire, tuple symbolique, texte plafonné) à modèle fixe.

**Disposition.** Accepté — R devient un vecteur de propriétés de canal manipulables séparément (R_nom, R_eff, R_pers, R_port, R_adr), jamais confondu avec le taxon; chez les LLM, le format varie à modèle fixe (L0 scalaire, L1 tuple, L2 et L3 texte plafonné). — Traité dans : ../../00-cadre.md (§4 Construits mesurables; §2.3); ../../06-metriques-et-typologie.md (§3 R, la richesse du signal : un vecteur); ../../../projets/P7-synthese-agentique.md (§3.1 Construits et opérationnalisation; E7.3 en §6.3)

### ME-03 · critique · Question transversale, projet 7 (courbe du gain collectif)

**Constat.** Le « gain collectif » n'a pas de référence. Un agent unique bien instruit égale presque une discussion multi-agents, et les gains des systèmes multi-agents LLM sont souvent minimes; le gain mesuré risque donc de refléter le budget de calcul plutôt que la coordination.

**Preuve.** https://arxiv.org/abs/2402.18272; https://arxiv.org/abs/2503.13657; https://arxiv.org/abs/2510.05174

**Recommandation.** G = (P_coll − P_ref)/(P_max − P_ref) à budget de jetons égal, avec trois références préenregistrées : agents sans canal, agent unique à budget égal, colonie à règles. Rapporter aussi le coût, la robustesse après perturbation et les modes d'échec selon MAST; mesure d'émergence par PID/TDMI en option.

**Disposition.** Modifié — G est conservé avec trois références préenregistrées (sans canal, agent unique à budget égal, colonie à règles), coût, robustesse et modes d'échec MAST; adaptation : la différence appariée Δ_k est rapportée d'abord et G n'est chiffré que si P_max − P_ref le permet (garde, P_max par type de score). La mesure d'émergence par décomposition de l'information est un outil facultatif (T7.12). — Traité dans : ../../00-cadre.md (§4); ../../06-metriques-et-typologie.md (§4 G, le gain collectif; §5 Robustesse, coût, échecs); ../../03-plan-de-recherche.md (§5.1 Décisions; §5.1.1 P_max par type de score); ../../../projets/P7-synthese-agentique.md (§3.1; T7.12 en §5)

### ME-04 · critique · Critère de rigueur; rubriques « À reproduire »

**Constat.** La v3 ne distingue pas la réplication d'un modèle publié de la validation contre des données empiriques. Elle n'a ni tolérance, ni n, ni règle de décision, ni conduite à tenir en cas d'échec.

**Preuve.** Axtell et al. 1996 doi:10.1007/bf01299065; Wilensky et Rand 2007 (secondaire); Grimm et al. 2005 doi:10.1126/science.1116681; Lakens 2017 doi:10.1177/1948550617697177

**Recommandation.** Par cible, préenregistrer le niveau visé (alignement relationnel ou équivalence distributionnelle), la marge TOST, le n et des patrons multiples (POM). Instaurer une porte go/no-go et un registre des déviations. Exemples chiffrés en section 7.3 du rapport.

**Disposition.** Accepté — Réplication, docking et validation sont distingués; chaque cible porte un niveau d'acceptation (identité à tolérance, relationnel à trois patrons, TOST), une marge, un n relié à la marge, une règle de décision, des portes go/no-go et un registre des déviations, avec exemples chiffrés. — Traité dans : ../../04-protocole-reproduction.md (§2 Réplication contre validation; §3 Fiche de reproduction; §4 Niveaux d'acceptation; §5 Équivalence : TOST; §7 Portes go/no-go, calage et registre des déviations); ../../00-cadre.md (§6 principes 1 à 3)

### ME-05 · critique · Projet 7 (question)

**Constat.** Le projet 7 n'a aucune hypothèse, seulement un croisement de facteurs.

**Preuve.** inféré

**Recommandation.** Préenregistrer H7a (interaction canal × modèle), H7b (équivalence au format scalaire avec la colonie à règles, ±δ), H7c (le texte libre augmente les échecs MAST) et H7d (gain contre l'agent unique à budget égal).

**Disposition.** Accepté — H7a à H7d de l'audit sont H7.1 (interaction canal × modèle), H7.2 (équivalence LLM-RÈGLE et colonie à règles, ±0,5σ), H7.3 (texte libre et modes MAST) et H7.4 (G_fort contre l'agent unique à budget égal), préenregistrées en famille primaire avec effet minimal et critère de réfutation. — Traité dans : ../../../projets/P7-synthese-agentique.md (§3.2 Hypothèses; §6.2 Contrastes planifiés); ../../03-plan-de-recherche.md (§3.8 P7; §7.2 Familles par projet)

### ME-06 · critique · Projet 7 (plan factoriel)

**Constat.** La « grille 2 × 4 » omet le facteur scénario : le plan réel compte 2 × 4 × 3 = 24 cellules, dont 18 avec LLM. De plus, « piste vs danse » n'a pas d'instanciation au scénario 3 (le stimulus de tâche n'est ni une piste ni une danse) ni au scénario 5 (Temnothorax procède par tandem et quorum, sans piste).

**Preuve.** inféré; Prabhakar et al. 2012 (lu)

**Recommandation.** Remplacer « piste vs danse » par des facteurs de canal formels applicables à tous les scénarios (persistance, adressage, format), avec un plan fractionnaire ou des contrastes planifiés.

**Disposition.** Modifié — Le plan est recompté (24 cellules réelles dont 18 LLM, retenu en plan fractionnaire de 107 cellules) et « piste contre danse » est remplacé par des canaux formels valables en S1, S3 et S5 (persistance et portée découplées en E7.6, format en E7.3). L'adressage reste confondu avec l'architecture (déclaré). — Traité dans : ../../../projets/P7-synthese-agentique.md (§6.1 Espace factoriel recompté; §6.3 E7.3 et E7.6; §4.3 Modèle chorégraphique commun)

### ME-07 · critique · Projet 7 (facteur capacité)

**Constat.** « Règle, Haiku, Sonnet, Opus » fait varier à la fois la génération, la réflexion (étendue / adaptative / toujours active), l'effort par défaut (n/a, high, medium), la température (réglable seulement sur Haiku 4.5), la coupure des connaissances (févr. 2025 contre juin 2026), le tokeniseur, la latence et les classifieurs de sécurité.

**Preuve.** https://platform.claude.com/docs/en/about-claude/models/overview.md; https://platform.claude.com/docs/en/api/messages.md

**Recommandation.** Traiter le facteur comme catégoriel (« modèle »). Fixer explicitement l'effort et la sortie maximale, et consigner les jetons de réflexion. Ajouter une condition « LLM exécutant la règle explicite » pour séparer suivi d'instructions et jugement.

**Disposition.** Accepté — « Capacité » est un paquet traité en facteur catégoriel « modèle »; effort, sortie maximale et configuration de réflexion sont fixés et journalisés, et la condition LLM-RÈGLE (E7.4) sépare suivi d'instructions et jugement. — Traité dans : ../../../projets/P7-synthese-agentique.md (§9.3 Modèles LLM : identifiants, tarifs, paramètres; §9.4 Journal JSONL, cassette, rejeu; E7.4 en §6.3); ../../03-plan-de-recherche.md (§6 Plan statistique général, ligne LLM)

### ME-08 · majeur · Thèse (« au même titre », « même moteur »)

**Constat.** Côté fourmi, cinq genres (Linepithema, Pheidole, Pogonomyrmex, Temnothorax, fourmis légionnaires); côté abeille, Apis mellifera seule. Les paramètres ne sont pas commensurables, et un choix de point dans l'espace des paramètres peut fabriquer un gagnant, comme le documentent les pratiques douteuses des simulations comparatives.

**Preuve.** Pawel, Kook et Reeve 2024 doi:10.1002/bimj.202200091; Prabhakar et al. 2012 (lu)

**Recommandation.** Nommer l'espèce par projet et parler de mécanisme « de type piste / de type danse ». Calibrer chaque mécanisme sur ses données, comparer sur une grille ou un front de Pareto (vitesse × justesse × coût), faire une analyse de sensibilité globale (Morris puis Sobol) préenregistrée et normaliser l'environnement.

**Disposition.** Modifié — Chaque projet nomme son taxon et son préréglage, le canal est une variable du modèle, chaque modèle est calé sur sa source et le docking normalise l'environnement; la sensibilité (OFAT puis Sobol') est prévue. Le front de Pareto n'existe que pour coût-précision (P7, P8) et le visuel vitesse-justesse de P5, et la sensibilité globale n'est pas exigée au préenregistrement. — Traité dans : ../../00-cadre.md (§2.3 Fourmi et abeille : taxons nommés, pas archétypes); ../../04-protocole-reproduction.md (§10.3 Sensibilité; §12 Docking); ../../03-plan-de-recherche.md (§6 Plan statistique général, ligne Sensibilité); ../../../projets/P1-recrutement-verrouillage.md (§9 Plan de simulation, Sensibilité)

### ME-09 · majeur · Absent (plan statistique)

**Constat.** Ni nombre de répétitions, ni erreur standard Monte Carlo, ni puissance, ni politique de graines; Math.random n'est pas semable.

**Preuve.** Lee et al. 2015 https://www.jasss.org/18/4/4.html; Morris et al. 2019 doi:10.1002/sim.8086; MDN Math; calculs inférés (annexe A)

**Recommandation.** Planifier avec ADEMP; fixer n par la MCSE visée ou par la stabilisation du coefficient de variation, et par la puissance (0,5 vs 0,7 → 93 runs par groupe; d = 0,5 → 63). Pour les modèles à règles, n ≥ 1000. PRNG semé, une graine consignée par run.

**Disposition.** Modifié — Le plan statistique fixe l'erreur standard de Monte Carlo visée, n relié à la marge et à la puissance (63 par groupe en détection, 70 en équivalence pour d = 0,5), un plancher de 1 000 pour les modèles à règles et un PRNG semé avec graine consignée par run. Plusieurs fiches restent sous le plancher (IN6, R128). — Traité dans : ../../04-protocole-reproduction.md (§5.3 Choix de n; §6 Répétitions, graines, erreur standard de Monte Carlo, puissance); ../../03-plan-de-recherche.md (§6 Plan statistique général; §11 IN6); ../../05-spec-simulation.md (§4.1 Aléatoire; §7.4 Flux et ordre des tirages)

### ME-10 · majeur · Technique (TypeScript/Canvas), projet 3

**Constat.** Artefacts non contrôlés : la mise à jour synchrone peut créer des motifs (les oscillations du projet 3 pourraient en être un), la précision des fonctions Math varie selon le navigateur et la plateforme, et le pas de temps comme le rodage ne sont pas spécifiés.

**Preuve.** Huberman et Glance 1993 https://www.pnas.org/doi/pdf/10.1073/pnas.90.16.7716; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math; https://www.jasss.org/23/2/7.html

**Recommandation.** Moteur de référence Node sans affichage, versions figées et PRNG semé pour tous les résultats confirmatoires; le navigateur ne fait que rejouer des traces. Facteur « ordre de mise à jour » (synchrone / asynchrone aléatoire), étude de convergence du pas de temps, documentation ODD (Grimm et al. 2020).

**Disposition.** Modifié — Le moteur headless Node à version figée et PRNG semé produit tout résultat confirmatoire; l'ordre de mise à jour est un facteur testé par modèle, la convergence à dt/2 est exigée et chaque modèle a un ODD. Adaptation : la page peut aussi calculer en mode Explorer, étiquetée « calcul navigateur, non confirmatoire », au lieu de seulement rejouer des traces. — Traité dans : ../../05-spec-simulation.md (§1 Règles directrices; §7 Déterminisme et ordre de mise à jour; §14 Ce que la couche navigateur ne doit jamais faire); ../../04-protocole-reproduction.md (§6.7 Déterminisme entre moteurs; §6.8 Ordre de mise à jour; §10 ODD; §12.3 Critère d'achèvement)

### ME-11 · majeur · Absent (préenregistrement)

**Constat.** Aucun préenregistrement. Les pages interactives à curseurs invitent à chercher le réglage qui « marche » (jardin des sentiers).

**Preuve.** Pawel et al. 2024 doi:10.1002/bimj.202200091

**Recommandation.** Préenregistrement OSF par projet avant les runs confirmatoires (hypothèses, VI/VD, n, tolérances, exclusions, règle pour les refus). Format Registered Report pour le projet 7. Pages interactives déclarées exploratoires.

**Disposition.** Accepté — Un préenregistrement OSF (ADEMP-PreReg) par projet précède toute exécution confirmatoire, P7 suit le format Registered Report avec règle d'attrition préenregistrée pour les refus, et les pages interactives sont déclarées exploratoires. — Traité dans : ../../08-science-ouverte-ethique.md (§5 Préenregistrements et Registered Report; porte B en §1); ../../04-protocole-reproduction.md (§11 Confirmatoire et exploratoire; préenregistrement); ../../03-plan-de-recherche.md (§7 Séparation du confirmatoire et de l'exploratoire)

### ME-12 · majeur · Technique (« publiable comme artifact »)

**Constat.** Ni DOI, ni licence, ni archivage pérenne, ni plan de gestion des données. PLoS Comput Biol exige depuis le 30 mars 2021 que le code soit public sans restriction.

**Preuve.** https://journals.plos.org/ploscompbiol/s/code-availability; https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content

**Recommandation.** Dépôt Git public, licences MIT/Apache-2.0 et CC BY 4.0, CITATION.cff, intégration Zenodo activée avant la première release (un DOI par release, dépôt public), Software Heritage, PGD, journaux LLM complets en JSONL.

**Disposition.** Accepté — Dépôt dédié public, licences MIT et CC BY 4.0, CITATION.cff sans .zenodo.json, webhook Zenodo vérifié avant la première release (porte A, répétition sur dépôt jetable), Software Heritage, plan de gestion des données et journaux LLM archivés en JSONL. — Traité dans : ../../08-science-ouverte-ethique.md (§1 Décisions du chercheur et portes; §3 Licences proposées; §4 Logiciel : FAIR4RS, citation, archivage; §6 Journaux LLM (P7) : archivage); ../../09-feuille-de-route.md (§5.1 GF2)

### ME-13 · majeur · Global, projet 7 (« seul projet sans résultat publié »)

**Constat.** État de l'art absent. La comparaison fourmi/abeille du fourragement existe (Detrain et Deneubourg 2008), et l'inversion des sources est déjà modélisée (de Vries et Biesmeijer 1998). Côté LLM : fourmis GPT-4o à phéromones dans NetLogo (5 runs), SwarmBench, SwarmWorld (stigmergie seule suffisante, août 2026), champs de pression à décroissance temporelle, LLM-Foraging. Le slogan « the queen gives no orders » a été publié sur Substack le 8 juin 2026. L'opposition orchestration/chorégraphie (Peltz 2003) n'est pas citée.

**Preuve.** doi:10.1016/s0065-2806(08)00002-7; https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1593017/full; https://arxiv.org/abs/2505.04364; https://arxiv.org/abs/2608.26081; https://arxiv.org/abs/2601.08129; https://arxiv.org/abs/2605.01461; https://bitsquarks.substack.com/p/the-queen-gives-no-orders; doi:10.1109/MC.2003.1236471

**Recommandation.** Revue systématique courte avant le projet 1, avec un tableau « existant / apport » par projet. Pour le projet 7, revendiquer la manipulation contrôlée du canal à modèle fixe, les références à budget égal et la puissance planifiée.

**Disposition.** Modifié — Une revue systématique courte est protocolée (bases, équations, critères) et conditionne toute revendication d'originalité, avec un tableau existant/apport par projet (Detrain et Deneubourg 2008, Jimenez-Romero 2025, SwarmBench, SwarmWorld, Peltz 2003) et l'apport de P7 reformulé (canal contrôlé à modèle fixe, budget égal, puissance). La revue n'est pas exécutée, de Vries et Biesmeijer 1998, les champs de pression (arXiv:2601.08129), LLM-Foraging (arXiv:2605.01461) et le billet Substack ne sont ni sourcés ni cités. — Traité dans : ../../03-plan-de-recherche.md (§8 Revue de littérature systématique courte; §8.2 Existant et apport, par projet; §8.3 Positionnement spécifique); ../../../projets/P7-synthese-agentique.md (§1 Contribution défendable; §2 Positionnement); ../../../projets/P1-recrutement-verrouillage.md (§2 Positionnement; porte G en §5)

### ME-14 · majeur · Absent (éthique et limites)

**Constat.** Ni section éthique ni section limites : anthropomorphisme de la vulgarisation, critique des métaphores en métaheuristiques, injection de faux signaux (projet 6), refus différentiels des classifieurs (attrition), coût énergétique, et évaluation pédagogique éventuelle avec des humains.

**Preuve.** Sörensen doi:10.1111/itor.12001; docs Anthropic (classifieurs); EPTC 2 non vérifié

**Recommandation.** Déclarer « simulation pure, aucun animal ». Encadré « limites de l'analogie » sur chaque page. Recherche défensive et divulgation responsable au projet 6. Règle préenregistrée pour les refus. CER/EPTC 2 si l'on évalue des apprenants.

**Disposition.** Accepté — Le plan déclare la simulation pure, la recherche défensive en P6 (divulgation, revue de double usage), l'attrition préenregistrée des refus, le CER et la Loi 25 pour l'évaluation pédagogique, la charte anti-anthropomorphisme, la critique de Sörensen et un encadré de portée de l'analogie; l'énergie est déclarée non mesurée (jetons et appels en indicateur). — Traité dans : ../../08-science-ouverte-ethique.md (§6.3 Confidentialité et conditions; §7 Éthique; §10 Limites de portée et tensions avec le cadre); ../../07-vulgarisation-evaluation.md (§4.4 Niveau Voir; §7 Lexique contrôlé et garde-fous); ../../../projets/P2-memoire-partagee-metaheuristiques.md (§2 Critique de Sörensen : règles appliquées)

### ME-15 · majeur · Projet 1 (positionnement)

**Constat.** La revue comparative de Detrain et Deneubourg 2008 et le modèle de de Vries et Biesmeijer 1998 (qui simule déjà l'inversion des sources de Seeley) ne sont pas cités.

**Preuve.** doi:10.1016/s0065-2806(08)00002-7; résultats Consensus (secondaire)

**Recommandation.** Citer la revue comme cadre et prendre de Vries et Biesmeijer comme comparateur d'amarrage (docking).

**Disposition.** Modifié — Detrain et Deneubourg 2008 est cité comme cadre comparatif dans P1 et le plan mais lu au niveau [M] seulement (porte G), et de Vries et Biesmeijer 1998 est nommé comparateur d'amarrage sans être sourcé ni versé à la bibliographie. Le docking D1 à D4 de P1 ne l'emploie pas. — Traité dans : ../../03-plan-de-recherche.md (§8.3 Positionnement spécifique; §11 IN18); ../../../projets/P1-recrutement-verrouillage.md (§2 Positionnement; §5 Cibles de reproduction, porte G; §9 Plan de simulation, Docking)

### ME-16 · majeur · Projet 1 (cible du pont double)

**Constat.** Le verrouillage sur la branche longue n'est pas chiffré (délai d'ajout de 30 min vérifié en source secondaire seulement). Les paramètres k ≈ 20, n ≈ 2 ne sont pas vérifiés.

**Preuve.** Goss et al. 1989 Naturwissenschaften 76:579 (métadonnées); délai 30 min (secondaire)

**Recommandation.** Extraire du texte intégral le nombre d'expériences et la proportion verrouillée; tolérance = intervalle binomial autour de la proportion publiée.

**Disposition.** Modifié — Les effectifs de Goss et al. 1989 sont extraits du texte intégral (12/26, 15/18, 14/14, 2/18; courte ajoutée 30 min après le début; histogrammes de la fig. 2) et la tolérance est un TOST de ±5 points par classe (T1.1), un seuil de 95 % (T1.2) et un critère ordinal pour T1.3, le critère binomial strict échouant avec le modèle publié. k = 20 reste [à confirmer]. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§4.2 Pont à deux branches; §4.3 Fonction de choix de Deneubourg; §5 Cibles de reproduction, T1.1 à T1.3 et notes 1-2); ../../04-protocole-reproduction.md (§2 Réplication contre validation; §8 Cas limites)

### ME-17 · majeur · Projet 1 (variables dépendantes)

**Constat.** Aucune VD n'est définie.

**Preuve.** inféré

**Recommandation.** Latence d'adaptation (temps jusqu'à 80 % de réallocation), probabilité de verrouillage avant T_max, coût en messages ou dépôts par unité de ressource.

**Disposition.** Modifié — Les VD sont définies : t½ (temps pour réallouer 50 % de l'effort après inversion, au lieu de 80 %), p_best, probabilité et taux de verrouillage (P_late, L, t_switch censuré) et coût en messages ou en signaux écrits et lus. — Traité dans : ../../03-plan-de-recherche.md (§5.1 Décisions, ligne Inversion de qualité; §3.2 H1.1 à H1.4 et H1.9); ../../../projets/P1-recrutement-verrouillage.md (§3 Hypothèses falsifiables; §6 E1.1, E1.6, E1.7)

### ME-18 · majeur · Projet 2 (contraste ACO/ABC)

**Constat.** ACO est évalué en combinatoire (Oliver30), ABC en continu (Rastrigin, Rosenbrock) : l'effet du mécanisme est confondu avec le type de problème.

**Preuve.** Socha et Dorigo 2008 (lu, p2src/acor2008.txt); doi:10.1111/itor.12001

**Recommandation.** Comparer sur les mêmes problèmes (ACO_R de Socha et Dorigo 2008 contre ABC en continu), à budget d'évaluations égal, avec une référence non bio-inspirée; citer la critique de Sörensen.

**Disposition.** Accepté — ACO_R et ABC sont comparés sur les mêmes problèmes continus (et ACO contre ABC sur le TSP) à budget égal en évaluations de fonction, avec références non bio-inspirées (2-opt, LK, DE, CMA-ES) et la critique de Sörensen appliquée règle par règle. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§2 Critique de Sörensen : règles appliquées; §3 H2.1 à H2.3; §6 E2.1)

### ME-19 · majeur · Projet 2 (tolérance Oliver30)

**Constat.** Dorigo et al. 1996 rapportent 423,741 en distances réelles, mais 420 en distances entières arrondies (moyennes sur 10 runs, NCMAX = 5000, α=1, β=5, ρ=0,5, Q=100, e=8). La cible dépend donc de la convention de distance.

**Preuve.** Dorigo, Maniezzo et Colorni 1996 doi:10.1109/3477.484436 (lu, dorigo96.txt)

**Recommandation.** Fixer la convention et le budget; critère du type « ≥ 9 runs sur 10 atteignent 423,741 ± 10^-3 ».

**Disposition.** Modifié — La convention est fixée (T2.1 : 423,741 en distances réelles, 420 en entières; NC_MAX = 5000, 30 essais) et le critère est reformulé : moyenne de l'ant-cycle dans un TOST de ±0,2 % et au moins un essai à 423,741. Le critère « 9 essais sur 10 à l'optimum » n'est pas retenu, le pilote atteignant l'optimum 0 à 1 fois sur 10 (τ0 non publié). — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§5 Cibles de reproduction, T2.1 et T2.2; §2 Corrections de la v3 appliquées; §4.3 Convention de ρ)

### ME-20 · majeur · Projet 3 (cible Wilson 1984)

**Constat.** Cible inversée : quand les minors sont retirés, ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5) et leur activité (×15 à 30). La v3 dit que « les petites ouvrières prennent la relève ».

**Preuve.** https://link.springer.com/article/10.1007/BF00293108 (résumé, secondaire)

**Recommandation.** Corriger la cible et l'exprimer en alignement relationnel : hausse du répertoire et de l'activité des majors après retrait des minors.

**Disposition.** Modifié — La cible est corrigée (les majors prennent le relais) et exprimée en relationnel : activité par major ×15 à ×30 pour une même valeur de θ_maj/θ_min sur deux chemins de composition (H3.1, T3.2 « calibré », non reproduit faute de Bonabeau et al. 1996). Le répertoire ×1,4 à ×4,5 n'est pas modélisé. — Traité dans : ../../00-cadre.md (§2.4 point 1); ../../../projets/P3-division-du-travail.md (§1 Corrections de v3 appliquées ici; §3 H3.1; §5 T3.2); ../../03-plan-de-recherche.md (§3.4 H3.1)

### ME-21 · majeur · Projet 3 (oscillations des agents identiques)

**Constat.** L'oscillation d'agents homogènes peut être un artefact de la mise à jour synchrone.

**Preuve.** Huberman et Glance 1993 (secondaire)

**Recommandation.** Tester sous mise à jour asynchrone aléatoire. VD = écart-type et puissance spectrale de la température après rodage; VI = σ_θ.

**Disposition.** Modifié — L'oscillation d'agents identiques devient H3.5 (gain de boucle et lecture synchrone, exploratoire), testée sous lecture synchrone et séquentielle avec σ_log en VI; adaptation : la VD est l'écart-type de la fraction active et du stimulus, l'autocorrélation et le pic spectral (A_osc), non la température. Le test confirmatoire avec LLM est H7.9. — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.5; §6 E3.5); ../../03-plan-de-recherche.md (§5.1 Décisions, ligne Oscillation); ../../00-cadre.md (§2.4 point 13)

### ME-22 · majeur · Projet 4 (loi de Little)

**Constat.** La v3 dit le rapprochement « non publié, de l'auteur ». Or Anderson et Ratnieks 1999 (Am Nat 154:521) invoquent explicitement Little 1961 (L = λW) pour les files d'attente des abeilles, en précisant qu'il ne s'applique pas tel quel (corrélation entre arrivées et file). Seeley et Tovey 1994 traitent déjà du lien entre temps d'attente et taux relatifs.

**Preuve.** Anderson et Ratnieks 1999 (lu, p4src/ar1999I.txt; https://eprints.whiterose.ac.uk/id/eprint/1304/); Seeley et Tovey 1994 doi:10.1006/anbe.1994.1044

**Recommandation.** Restreindre la revendication au cadrage comparatif « débit (fourmi) vs attente (abeille) », citer les deux articles et tester la mise en garde comme hypothèse.

**Disposition.** Modifié — Aucune nouveauté n'est revendiquée sur la loi de Little : Anderson et Ratnieks 1999 et Seeley et Tovey 1994 sont cités, le cadrage est « deux files » (débit fourmi, délai abeille) et L = λW est vérifiée comme identité (T4.12). La mise en garde d'Anderson et Ratnieks est renvoyée à une relecture (R44), non formulée comme hypothèse. — Traité dans : ../../00-cadre.md (§2.4 point 6); ../../../projets/P4-regulation-sans-vue-densemble.md (§2 Positionnement; §4.9 Deux files, une identité (Little); R44 en §11); ../../03-plan-de-recherche.md (§8.2 Existant et apport, ligne P4)

### ME-23 · majeur · Projets 5 et 7 (Temnothorax)

**Constat.** Temnothorax recrute par tandem et transport, sans piste persistante : l'architecture « piste » n'existe pas dans ce scénario.

**Preuve.** Pratt et al. 2005 doi:10.1016/j.anbehav.2005.01.022 (métadonnées); inféré

**Recommandation.** Décrire le mécanisme réel (tandem, quorum, transport) et l'encoder par les facteurs de canal formels du projet 7.

**Disposition.** Accepté — Le mécanisme réel de Temnothorax (tandem, quorum, transport) est décrit et modélisé sans piste (M4, M6, E5.3) et codé par les composantes formelles de canal (tandem : R_adr = 1, portée réduite) dans la typologie et dans le scénario S5 de P7. — Traité dans : ../../00-cadre.md (§2.3); ../../../projets/P5-decision-par-quorum.md (§4 Modèles de référence, M4 et M6; E5.3 en §6); ../../06-metriques-et-typologie.md (§1.3 Placement sourcé; §3.1 Les cinq composantes); ../../../projets/P7-synthese-agentique.md (§4.2 Modèles de colonie, S5 fourmi)

### ME-24 · majeur · Projet 7 (confondants)

**Constat.** La verbosité croît avec le modèle, ce qui enrichit le signal en même temps que la capacité. Une invite unique n'est pas généralisable (jusqu'à 76 points d'écart selon le format). Les modèles connaissent le pont double et la danse (contamination des connaissances).

**Preuve.** Sclar et al. ICLR 2024 https://proceedings.iclr.cc/paper_files/paper/2024/hash/6c0e99d736da621403018ca7b32b1a4d-Abstract-Conference.html

**Recommandation.** Plafonner les messages ou imposer un schéma, et mesurer longueur et entropie. Au moins 3 paraphrases d'invite en facteur aléatoire, invites figées et hachées. Scénarios isomorphes à habillage neutre et sonde de reconnaissance.

**Disposition.** Accepté — Messages plafonnés ou à schéma (L0 à L3, sorties structurées, un max_tokens par niveau), R_eff et longueur mesurés, trois paraphrases en facteur aléatoire, invites figées et hachées, environnements procéduraux à habillage neutre avec sonde de reconnaissance (E7.10). — Traité dans : ../../../projets/P7-synthese-agentique.md (§6.3 Expériences; §4.3; §9.3; R78 et R79 en §11.1); ../../06-metriques-et-typologie.md (§3.3 Manipuler chaque composante séparément)

### ME-25 · majeur · Projet 7 (non-stationnarité)

**Constat.** Les identifiants sont des instantanés figés, mais les modèles sont retirés : Haiku 4.5 n'est garanti que jusqu'au 15 oct. 2026, Sonnet 4.5 est retiré le 30 nov. 2026, avec un préavis minimal de 60 jours. L'API n'a pas de seed, la température 0 n'est pas déterministe, et la température n'est plus réglable au-delà d'Opus 4.6. Variation jusqu'à 15 % entre runs « déterministes »; dérive mesurée de 84 % à 51 % en trois mois.

**Preuve.** https://platform.claude.com/docs/en/about-claude/model-deprecations.md; https://platform.claude.com/docs/en/api/messages.md; https://arxiv.org/abs/2408.04667; https://arxiv.org/abs/2307.09009

**Recommandation.** Traiter chaque run comme un tirage stochastique. Exécuter dans une fenêtre courte, ordre des cellules randomisé, en consignant date, ID, request-id et usage. Archiver les journaux (le rejeu permet la réanalyse, pas la régénération). Plan B pour Haiku. Ancre à poids ouverts figés.

**Disposition.** Modifié — Chaque run est un tirage (K répétitions, jamais la température) exécuté en fenêtre courte, cellules entrelacées, sentinelle, journal complet (date, response.model, request-id, usage), rejeu par cassette et plan B pour Haiku 4.5 (GF1). L'ancre à poids ouverts reste une option non tranchée (DC5), absente du plan chiffré. — Traité dans : ../../04-protocole-reproduction.md (§13.1 Règles; §13.3 Contrôle de plateforme; §13.5 Journal et rejeu); ../../08-science-ouverte-ethique.md (§6.4 Rejouable n'est pas ré-exécutable; §6.5 Versions de modèles; DC5 en §1); ../../../projets/P7-synthese-agentique.md (§9.4; §9.6; §11.4 Plan B et ordre de coupe); ../../09-feuille-de-route.md (§5.1 GF1)

### ME-26 · majeur · Projet 7 (coût, puissance, unité d'analyse)

**Constat.** Ni coût ni puissance. Estimation de l'auditeur (20 agents × 100 décisions, 1 500 jetons d'entrée) : environ 8 400 $ à 30 runs par cellule, 26 000 $ à 93 runs, jusqu'à 78 000 $ avec 3 paraphrases d'invite. L'interaction visée demande environ 4 fois plus de runs qu'un effet principal (16 fois si elle vaut la moitié de l'effet). Les agents d'un même run ne sont pas indépendants.

**Preuve.** Tarifs : https://platform.claude.com/docs/en/about-claude/models/overview.md; calculs inférés (annexe A)

**Recommandation.** Pilote pour mesurer variance et coût réels, puissance par simulation, plan séquentiel avec règle d'arrêt préenregistrée, plafond budgétaire. Unité d'analyse = run; modèles mixtes (effets aléatoires run et paraphrase). Cache d'invite (10 %, 5 % pour Opus 5.5); Batch −50 % seulement si l'on regroupe un même pas sur toutes les répétitions.

**Disposition.** Accepté — Pilote à 1 % et pilote de variance, puissance planifiée (interaction ×4 à ×16, plan séquentiel à plafond préenregistré), plafonds par bras avec interrupteur, plan recompté à ≈ 4 304 $, run comme unité d'analyse avec modèles mixtes (run et paraphrase), cache d'invite et lots synchronisés par tour. — Traité dans : ../../../projets/P7-synthese-agentique.md (§3.3 Plan d'analyse; §9.6 Exécution et budgets de performance; §9.7 Budget en dollars, plafonds, pilote à 1 %); ../../03-plan-de-recherche.md (§6 Plan statistique général); ../../09-feuille-de-route.md (§6.3 Coût d'API de P7)

### ME-27 · mineur · Absent (plan de publication)

**Constat.** Aucune revue ni conférence désignée. ANTS 2026 a eu lieu du 8 au 10 juin 2026; ALIFE 2027 se tiendra à Prague du 19 au 23 juillet 2027 (échéance non publiée); AAMAS 2027 non vérifié.

**Preuve.** https://alife.org/conference/; https://iridia.ulb.ac.be/ants/

**Recommandation.** Correspondance projet → lieu : J R Soc Interface / PLoS CB pour les projets 1 et 5; Swarm Intelligence pour le 2; ALIFE 2027 et Artificial Life pour les 3, 4 et 6; AAMAS/JAAMAS ou Registered Report pour le 7; JASSS pour la méthode.

**Disposition.** Accepté — La correspondance projet-lieu est écrite avec replis et dates à reconfirmer : J R Soc Interface ou PLoS CB (P1, P5), Swarm Intelligence (P2), ALIFE 2027 puis Artificial Life (P3, P4, P6), Registered Report puis JAAMAS (P7), JASSS (méthode). — Traité dans : ../../08-science-ouverte-ethique.md (§9 Plan de publication par projet); ../../03-plan-de-recherche.md (§10 Plan de publication par projet)

### ME-28 · mineur · Parcours (« citées de mémoire »)

**Constat.** La bibliographie n'est pas vérifiée. Plusieurs références sont toutefois exactes au plan bibliographique (Dorigo 1996, Pratt 2005, Franks 2003, Couzin 2002, Seeley et Tovey 1994, Karaboga et Basturk 2007, etc.).

**Preuve.** Crossref (métadonnées)

**Recommandation.** Bibliothèque Zotero/BibTeX avec DOI et statut de vérification par entrée; citer la figure, le tableau ou la page de chaque cible chiffrée.

**Disposition.** Modifié — La bibliographie consolidée donne un statut de vérification par entrée et un DOI ou une URL le plus souvent, et chaque fiche cite la figure, le tableau ou l'équation de ses cibles. L'export Zotero/BibTeX reste à produire. — Traité dans : ../../11-bibliographie.md; ../../04-protocole-reproduction.md (§3.2 Gabarit, champs 1 et 2); ../../08-science-ouverte-ethique.md (§2 Inventaire des objets produits, ligne 2)

### ME-29 · mineur · Parcours

**Constat.** Ni jalons, ni critères de passage, ni registre des risques; gabarit de « note de recherche » absent.

**Preuve.** inféré

**Recommandation.** Calendrier à portes go/no-go (une porte = reproduction réussie), registre des risques (retrait de modèles, données indisponibles, coût) et gabarit de note ADEMP + ODD + écarts + limites.

**Disposition.** Accepté — Calendrier à jalons JF1 à JF14, portes go/no-go GF1 à GF15 et portes de reproduction, registre de risques R200 à R218 (retrait de modèles, sources inaccessibles, coût) et gabarit de note de recherche (ADEMP, ODD, écarts, limites, DOI). — Traité dans : ../../09-feuille-de-route.md (§4 Jalons et échéances; §5 Portes go/no-go; §7 Registre des risques); ../../04-protocole-reproduction.md (§7.2 Portes; §14.2 Gabarit)

### ME-30 · mineur · Projet 1 (analogie agentique)

**Constat.** « Rigide mais robuste / adaptable mais bavarde » est présenté comme un constat alors que c'est une hypothèse.

**Preuve.** inféré

**Recommandation.** Reformuler en H1 (la latence d'adaptation croît avec la persistance τ à débit d'information égal).

**Disposition.** Modifié — Le slogan est reformulé en question puis en hypothèses testables (persistance en H1.1, canal contre taxon en H1.7, t½ du dépôt persistant contre la diffusion en H7.7) au lieu d'un constat. La condition « à débit d'information égal » n'est pas posée et H7.7 confond persistance et portée jusqu'à E7.6. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§1 Questions propres au projet; §3 H1.1 et H1.7); ../../../projets/P7-synthese-agentique.md (§3.2 H7.7; E7.6 en §6.3); ../../03-plan-de-recherche.md (§2.1 QR0b)

### ME-31 · mineur · Projet 2 (source ABC)

**Constat.** « Karaboga 2005 » désigne le rapport technique TR06, non évalué par les pairs (5D Sphere, 2D Rosenbrock, 10D Rastrigin, 30 runs). Karaboga et Basturk 2008 utilisent Rastrigin et Rosenbrock en 50 dimensions : les cibles sont incompatibles. Les valeurs de l'ordre de 1e-17 sont sous la résolution utile.

**Preuve.** lu (p2src/abc_tr06.txt, p2src/abc2008.txt)

**Recommandation.** Choisir une source et copier son protocole exactement. Tester l'équivalence sur log10 de l'erreur, ou par taux de succès sous un seuil (p. ex. 1e-12).

**Disposition.** Modifié — Le protocole de Karaboga et Basturk 2008 est copié exactement (T2.8 : colonie 100, limit = n_e·D, 30 essais, 50D) avec succès sous 1e-12 et TOST sur log10 pour Rosenbrock; le rapport technique de 2005 est gardé comme cible séparée de faible priorité (T2.10) plutôt qu'écarté. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§4.7 Artificial Bee Colony; §5 Cibles de reproduction, T2.8 et T2.10); ../../04-protocole-reproduction.md (§4.3 Équivalence distributionnelle)

### ME-32 · mineur · Projet 3 (Jones et al. 2004)

**Constat.** L'étude compare des colonies génétiquement diverses et uniformes; le mécanisme par seuils est une explication proposée. L'« oscillation » de la ruche homogène n'a pas été lue dans la source.

**Preuve.** Jones et al. 2004 Science 305:402 (secondaire)

**Recommandation.** Présenter les seuils comme hypothèse de mécanisme; VD = écart-type et spectre de la température.

**Disposition.** Modifié — Les seuils sont présentés comme mécanisme proposé (H3.7 exploratoire jusqu'à la lecture de Jones 2004 et Graham 2006; l'oscillation de la ruche homogène est corrigée en inférence) avec l'écart-type de la température du couvain en VD. Le spectre de la température n'est pas retenu. — Traité dans : ../../../projets/P3-division-du-travail.md (§1 Corrections de v3 appliquées ici; §3 H3.7; §4.5 Thermorégulation par seuils variés)

### ME-33 · mineur · Projet 4 (données Prabhakar)

**Constat.** Le modèle est ajusté sur un paramètre (c) à partir de 39 essais de terrain; la disponibilité des données brutes n'est pas vérifiée.

**Preuve.** Prabhakar et al. 2012 (lu, p4src/prab2012.txt)

**Recommandation.** Vérifier l'accès aux données; sinon, viser la réplication du modèle plutôt que des données.

**Disposition.** Accepté — La disponibilité des séries brutes de Prabhakar et al. est déclarée inconnue et leur demande au laboratoire Gordon est planifiée en semaine 1; à défaut, T4.2 et T4.3 restent qualitatives et le projet vise la réplication du modèle (éq. 3-4, T4.1). — Traité dans : ../../../projets/P4-regulation-sans-vue-densemble.md (§4 Modèles de référence, Prabhakar et al. 2012 : « Ce qui n'est PAS publié »; R42 en §11); ../../09-feuille-de-route.md (§8.3 Demandes d'accès à envoyer en semaine 1)

### ME-34 · mineur · Projet 5 (variables dépendantes)

**Constat.** Vitesse et justesse ne sont pas définies.

**Preuve.** Franks et al. 2003 doi:10.1098/rspb.2003.2527 (métadonnées)

**Recommandation.** Temps jusqu'au quorum et jusqu'à l'engagement complet; proportion de runs qui choisissent le meilleur site; courbe vitesse-justesse en fonction de Q.

**Disposition.** Modifié — Vitesse et justesse sont définies par taxon (fourmi : délai découverte → premier transport et erreurs transitoires; abeille : délai jusqu'au quorum et probabilité de choisir le meilleur site), la fraction finale et la durée jusqu'à l'engagement de tous sont ciblées (T5.23) et la frontière vitesse-justesse selon le seuil de quorum est un visuel (T5.12). — Traité dans : ../../../projets/P5-decision-par-quorum.md (§1 Objet et questions de recherche, définitions opérationnelles; §5 Cibles de reproduction, T5.12 et T5.23; §8 Visuels et trois niveaux)

### ME-35 · mineur · Projet 6 (interblocage)

**Constat.** L'interblocage n'est pas toujours une pathologie : pour des options égales de faible valeur, il est adaptatif. L'inhibition croisée le rompt au-delà de s* = 4v³/(v²−1)².

**Preuve.** Pais et al. 2013 https://pmc.ncbi.nlm.nih.gov/articles/PMC3759446/ (lu, pais2013.txt)

**Recommandation.** Distinguer interblocage adaptatif et pathologique, et utiliser la bifurcation s* comme cible quantitative (±2 %).

**Disposition.** Accepté — L'interblocage adaptatif (options médiocres) est distingué de l'interblocage pathologique et de la scission, et la bifurcation σ* est une cible quantitative à ±2 % (T5.1, H5.1), reprise par T6.8 et par la carte (σ, q) de P6. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§1 définitions; §3 H5.1; §5 T5.1); ../../../projets/P6-defaillances-et-defenses.md (§7.1 Taxonomie P6 et relations, D3 et D4; §5 T6.8); ../../03-plan-de-recherche.md (§3.6 H5.1)

### ME-36 · mineur · Projet 6 (moulin)

**Constat.** Couzin et al. 2002 portent sur des groupes animaux génériques, pas sur des fourmis à pistes.

**Preuve.** doi:10.1006/jtbi.2002.3065 (métadonnées)

**Recommandation.** Soit cibler explicitement la phase tore de Couzin (polarisation et moment angulaire), soit trouver un modèle de moulin propre aux fourmis légionnaires.

**Disposition.** Accepté — Le moulin est modélisé avec Couzin et Franks 2003 (suivi de piste, Eciton) et Couzin et al. 2002 est gardé comme contrepoint ciblant la phase tore (polarisation et moment angulaire); l'exécution est confiée à P9. — Traité dans : ../../00-cadre.md (§2.4 point 2); ../../../projets/P6-defaillances-et-defenses.md (§2 Positionnement; §4 Modèles de référence, F1 et F2); ../../../projets/P9-mouvement-collectif-et-construction.md (§5 Cibles de reproduction, T9.1, T9.2, T9.9)

### ME-37 · mineur · Projet 7 (validité externe)

**Constat.** Une colonie de 20 agents LLM ne représente ni une fourmilière ni un système agentique industriel.

**Preuve.** inféré

**Recommandation.** Ajouter une section « portée des conclusions » : ce que le résultat dit des mécanismes de canal, et ce qu'il ne dit ni des insectes ni des produits.

**Disposition.** Accepté — La portée des conclusions est bornée (dix agents LLM ne sont ni une colonie ni un système industriel; formulation « mécanisme de canal à N agents, modèle X, date D ») et la section « Limites et portée » figure au gabarit de note. — Traité dans : ../../08-science-ouverte-ethique.md (§10.1 Ce que le programme ne peut pas conclure); ../../04-protocole-reproduction.md (§14.2 Gabarit, section 9); ../../../projets/P7-synthese-agentique.md (§7.3 Où l'analogie casse; R87 en §11.1; livrable L6 en §10)

## Ajouts recommandés

### ME-A01 · ajout

Plan de recherche avec matrice de traçabilité QR → hypothèse → VI/VD → plan → critère de réfutation → analyse, par projet

**Disposition.** Accepté — Matrice de traçabilité QR → hypothèses → cibles préalables → expériences → critère de réfutation, avec registre de 99 hypothèses (VI → VD, effet minimal, réfutation, nature) et plan statistique commun. — Traité dans : ../../03-plan-de-recherche.md (§3 Registre des hypothèses; §4 Matrice de traçabilité; §6 Plan statistique général); ../../02-architecture-programme.md (§4 Matrice de traçabilité)

### ME-A02 · ajout

Revue de littérature systématique courte (protocole, équations de recherche, critères) et tableau « existant / apport » par projet, incluant Detrain et Deneubourg 2008, de Vries et Biesmeijer 1998, Jimenez-Romero et al. 2025, SwarmBench, SwarmWorld

**Disposition.** Accepté — Protocole de revue (bases, équations B1 à B6, critères d'inclusion, d'exclusion et d'arrêt) et tableau existant/apport par projet, avec Detrain et Deneubourg 2008, de Vries et Biesmeijer 1998 (non sourcée), Jimenez-Romero 2025 et SwarmBench; SwarmWorld est positionné dans la fiche P7. — Traité dans : ../../03-plan-de-recherche.md (§8.1 Protocole; §8.2 Existant et apport, par projet; §8.3 Positionnement spécifique); ../../../projets/P7-synthese-agentique.md (§2 Positionnement)

### ME-A03 · ajout

Protocole ODD (Grimm et al. 2020) pour chaque modèle fourmi et abeille, avec ordre de mise à jour et stochasticité explicites

**Disposition.** Accepté — Un ODD complet par modèle de référence et par modèle commun, un delta-ODD par variante de canal, ordre de mise à jour et stochasticité explicites, avec gabarit et résumé ODD dans chaque fiche. — Traité dans : ../../04-protocole-reproduction.md (§10 ODD, 10.1 Règles et 10.2 Gabarit); ../../../projets/P1-recrutement-verrouillage.md (§4.7 Résumé ODD); ../../../projets/P5-decision-par-quorum.md (§4.5 Résumé ODD)

### ME-A04 · ajout

Protocole de reproduction : cible exacte (figure/tableau), niveau (relationnel ou distributionnel), marge TOST, n, portes go/no-go, registre des déviations

**Disposition.** Accepté — Fiche de reproduction en 15 champs par cible (figure ou tableau exact, niveau, marge TOST, n, graines, règle de décision), portes de lecture, de code, de réplication, de docking et d'extension, et registre des déviations versionné. — Traité dans : ../../04-protocole-reproduction.md (§3 Fiche de reproduction; §4; §5; §7 Portes go/no-go, calage et registre des déviations)

### ME-A05 · ajout

Préenregistrements OSF par projet; format Registered Report pour le projet 7

**Disposition.** Accepté — Un enregistrement OSF par projet (ADEMP-PreReg) avant la première exécution confirmatoire, avec amendements horodatés, et Registered Report pour P7. — Traité dans : ../../08-science-ouverte-ethique.md (§5 Préenregistrements et Registered Report); ../../04-protocole-reproduction.md (§11.2 Quand et comment; §11.3 Gabarit de préenregistrement); ../../../projets/P7-synthese-agentique.md (§10, livrable L4)

### ME-A06 · ajout

Plan d'analyse statistique : ADEMP, erreur standard Monte Carlo, puissance par simulation, modèles mixtes (unité = run), corrections multiples

**Disposition.** Accepté — Plan d'analyse : ADEMP, erreur standard de Monte Carlo, puissance par simulation, modèles mixtes avec le run pour unité (R et lme4, plan B en TypeScript), Holm en confirmatoire et Benjamini-Hochberg en exploratoire. — Traité dans : ../../03-plan-de-recherche.md (§6 Plan statistique général); ../../04-protocole-reproduction.md (§5; §6; §9 ADEMP); ../../../projets/P7-synthese-agentique.md (§3.3 Plan d'analyse)

### ME-A07 · ajout

Moteur de référence Node sans affichage, avec PRNG semé et versions figées, distinct de la couche de vulgarisation navigateur

**Disposition.** Accepté — Moteur headless Node à version figée (.node-version), PRNG xoshiro128** semé, flux nommés et manifeste de run, distinct d'une couche navigateur qui rejoue ou explore sans valeur confirmatoire. — Traité dans : ../../05-spec-simulation.md (§1 Règles directrices; §2 Architecture : trois couches, deux sorties; §4.1 Aléatoire; §7; §14); ../../00-cadre.md (§7 Architecture de simulation)

### ME-A08 · ajout

Spécification du projet 7 : facteurs de canal formels (persistance, adressage, format), références à budget égal (sans canal, agent unique, règles), condition « LLM exécutant la règle », 3 paraphrases d'invite, effort fixé, schéma de journalisation, budget plafonné, fenêtre d'exécution, plan B en cas de retrait de Haiku 4.5

**Disposition.** Modifié — La fiche P7 spécifie les références à budget égal (IND, SOLO, COL), la condition LLM-RÈGLE, trois paraphrases, l'effort et la sortie maximale fixés, le journal JSONL, le budget plafonné, la fenêtre d'exécution et le plan B Haiku. Persistance et portée sont découplées (E7.6) et le format varie (E7.3), mais l'adressage reste confondu avec l'architecture. — Traité dans : ../../../projets/P7-synthese-agentique.md (§6 Expériences originales; §9 Plan de simulation; §11.4 Plan B et ordre de coupe)

### ME-A09 · ajout

Opérationnalisation écrite de la « richesse du signal » (bits par message, persistance, localité, adressage) et du « gain collectif » (G normalisé, coût, robustesse, modes d'échec MAST)

**Disposition.** Accepté — « Richesse » est opérationnalisée en vecteur (bits nominaux, information effective, persistance, portée, adressage) avec estimateurs et exemples chiffrés, et « gain collectif » en Δ_k et G apparié à budget égal, décomposé en agrégation et interaction, avec coût, robustesse et modes d'échec MAST. — Traité dans : ../../06-metriques-et-typologie.md (§3 R; §4 G; §5 Robustesse, coût, échecs); ../../00-cadre.md (§4 Construits mesurables)

### ME-A10 · ajout

Plan de gestion des données et du logiciel : licences, CITATION.cff, intégration Zenodo activée avant la 1re release, Software Heritage, archivage des journaux LLM

**Disposition.** Accepté — Plan de gestion des données et du logiciel : inventaire des objets, licences, CITATION.cff, séquence GitHub, Zenodo et Software Heritage sous la porte A, archivage des journaux LLM et règles de rejeu. — Traité dans : ../../08-science-ouverte-ethique.md (§2 Inventaire des objets produits; §3 Licences proposées; §4 Logiciel : FAIR4RS, citation, archivage; §6 Journaux LLM (P7) : archivage)

### ME-A11 · ajout

Section éthique et limites : simulation pure, recherche défensive au projet 6, refus des classifieurs traités comme attrition, CER si évaluation pédagogique, charte anti-anthropomorphisme

**Disposition.** Accepté — Section éthique et limites : simulation pure, recherche défensive en P6 (divulgation, double usage), refus de classifieurs traités comme attrition, CER et Loi 25 pour l'évaluation pédagogique, charte anti-anthropomorphisme et tableau des conclusions interdites. — Traité dans : ../../08-science-ouverte-ethique.md (§6.3; §7 Éthique; §10 Limites de portée et tensions avec le cadre); ../../07-vulgarisation-evaluation.md (§7 Lexique contrôlé et garde-fous; §11 Éthique et vie privée)

### ME-A12 · ajout

Plan de publication par projet (J R Soc Interface, PLoS CB, Swarm Intelligence, ALIFE 2027 Prague, JASSS, AAMAS/JAAMAS)

**Disposition.** Accepté — Plan de publication par projet avec cible, repli, exigences d'ouverture et dates connues à reconfirmer (J R Soc Interface, PLoS CB, Swarm Intelligence, ALIFE 2027 à Prague, JASSS, AAMAS et JAAMAS). — Traité dans : ../../08-science-ouverte-ethique.md (§9 Plan de publication par projet); ../../03-plan-de-recherche.md (§10 Plan de publication par projet)

### ME-A13 · ajout

Calendrier à jalons, registre des risques et gabarit de note de recherche (ADEMP + ODD + résultats + écarts + limites + DOI)

**Disposition.** Accepté — Calendrier à jalons, registre des risques et gabarit de note de recherche (ADEMP, ODD, résultats, écarts, limites, DOI). — Traité dans : ../../09-feuille-de-route.md (§4 Jalons et échéances; §7 Registre des risques); ../../04-protocole-reproduction.md (§14.2 Gabarit)

### ME-A14 · ajout

Bibliothèque bibliographique vérifiée (DOI, statut de vérification par entrée)

**Disposition.** Accepté — La bibliographie consolidée (626 œuvres) porte un statut de vérification et un DOI ou une URL le plus souvent par entrée; l'export BibTeX reste à produire (voir ME-28). — Traité dans : ../../11-bibliographie.md; ../../08-science-ouverte-ethique.md (§2 Inventaire des objets produits, ligne 2)


# Constats — Méthodologie

Source : [rapport complet](methodologie.md). 37 constats (7 critiques, 19 majeurs, 11 mineurs) et 14 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 est une bonne intuition de programme, mais ce n'est pas encore un protocole de recherche. Aucune question testable n'y est posée. Les deux construits centraux, « richesse du signal » et « gain collectif », n'ont pas de définition opérationnelle; le premier est confondu avec l'espèce, la persistance du canal et la localité. Le critère « reproduire un résultat publié » ne fixe ni tolérance, ni nombre de répétitions, ni règle de décision. Le projet 7, seule contribution originale, fait varier sous le nom de « capacité » plusieurs choses à la fois : génération du modèle, mode de réflexion, réglage de la température (impossible sur Sonnet 5.5 et Opus 5.5), date de coupure des connaissances et classifieurs de sécurité. Son plan réel compte 24 cellules, pas 2 × 4, et il n'a ni coût, ni puissance, ni parade au retrait des modèles : Haiku 4.5 n'est garanti que jusqu'au 15 octobre 2026. Deux affirmations sont contredites par les sources primaires : la nouveauté du rapprochement avec la loi de Little (Anderson et Ratnieks 1999 citent Little 1961) et la cible du projet 3 (chez Pheidole, ce sont les majors qui prennent la relève). Tout est corrigeable avec les gabarits du rapport.

## Constats

### ME-01 · critique · Global (Question transversale, projets 1-7)

**Constat.** Aucune question de recherche ni hypothèse falsifiable. La seule question est ouverte, et les colonnes « Agentique » sont des analogies, pas des prédictions.

**Preuve.** inféré (lecture de la v3)

**Recommandation.** Matrice de traçabilité par projet : QR → hypothèse dirigée avec taille d'effet minimale → VI/VD/contrôles → plan → critère de réfutation → analyse. Séparer le confirmatoire (préenregistré) de l'exploratoire (pages interactives).

**Disposition.** _à renseigner_

### ME-02 · critique · Tableau « Deux chorégraphies », Question transversale, projet 7

**Constat.** La « richesse du signal » (scalaire → symbole → langage) n'est pas opérationnalisée et elle est confondue. Les pistes de fourmis ont une polarité et plusieurs phéromones à décroissance différente, dont des signaux répulsifs. Plusieurs fourmis étudiées n'utilisent pas de piste (Pogonomyrmex, Temnothorax). La richesse varie en même temps que la persistance et la localité. Côté LLM, un canal d'un seul mot suffit à faire passer la coopération de 0 % à 96,7 %.

**Preuve.** Prabhakar et al. 2012 (lu, p4src/prab2012.txt); Jackson et al. 2004 doi:10.1038/nature03105; Robinson et al. 2005 doi:10.1038/438442a; Robinson et al. 2008 doi:10.1007/s00040-008-0994-5; https://arxiv.org/abs/2510.05748; Haldane et Spurway 1954 doi:10.1007/bf02222949

**Recommandation.** Définir la richesse par des propriétés de canal manipulées indépendamment : bits par message (entropie), persistance τ, localité, adressage. Pour les LLM, faire varier le format (scalaire, tuple symbolique, texte plafonné) à modèle fixe.

**Disposition.** _à renseigner_

### ME-03 · critique · Question transversale, projet 7 (courbe du gain collectif)

**Constat.** Le « gain collectif » n'a pas de référence. Un agent unique bien instruit égale presque une discussion multi-agents, et les gains des systèmes multi-agents LLM sont souvent minimes; le gain mesuré risque donc de refléter le budget de calcul plutôt que la coordination.

**Preuve.** https://arxiv.org/abs/2402.18272; https://arxiv.org/abs/2503.13657; https://arxiv.org/abs/2510.05174

**Recommandation.** G = (P_coll − P_ref)/(P_max − P_ref) à budget de jetons égal, avec trois références préenregistrées : agents sans canal, agent unique à budget égal, colonie à règles. Rapporter aussi le coût, la robustesse après perturbation et les modes d'échec selon MAST; mesure d'émergence par PID/TDMI en option.

**Disposition.** _à renseigner_

### ME-04 · critique · Critère de rigueur; rubriques « À reproduire »

**Constat.** La v3 ne distingue pas la réplication d'un modèle publié de la validation contre des données empiriques. Elle n'a ni tolérance, ni n, ni règle de décision, ni conduite à tenir en cas d'échec.

**Preuve.** Axtell et al. 1996 doi:10.1007/bf01299065; Wilensky et Rand 2007 (secondaire); Grimm et al. 2005 doi:10.1126/science.1116681; Lakens 2017 doi:10.1177/1948550617697177

**Recommandation.** Par cible, préenregistrer le niveau visé (alignement relationnel ou équivalence distributionnelle), la marge TOST, le n et des patrons multiples (POM). Instaurer une porte go/no-go et un registre des déviations. Exemples chiffrés en section 7.3 du rapport.

**Disposition.** _à renseigner_

### ME-05 · critique · Projet 7 (question)

**Constat.** Le projet 7 n'a aucune hypothèse, seulement un croisement de facteurs.

**Preuve.** inféré

**Recommandation.** Préenregistrer H7a (interaction canal × modèle), H7b (équivalence au format scalaire avec la colonie à règles, ±δ), H7c (le texte libre augmente les échecs MAST) et H7d (gain contre l'agent unique à budget égal).

**Disposition.** _à renseigner_

### ME-06 · critique · Projet 7 (plan factoriel)

**Constat.** La « grille 2 × 4 » omet le facteur scénario : le plan réel compte 2 × 4 × 3 = 24 cellules, dont 18 avec LLM. De plus, « piste vs danse » n'a pas d'instanciation au scénario 3 (le stimulus de tâche n'est ni une piste ni une danse) ni au scénario 5 (Temnothorax procède par tandem et quorum, sans piste).

**Preuve.** inféré; Prabhakar et al. 2012 (lu)

**Recommandation.** Remplacer « piste vs danse » par des facteurs de canal formels applicables à tous les scénarios (persistance, adressage, format), avec un plan fractionnaire ou des contrastes planifiés.

**Disposition.** _à renseigner_

### ME-07 · critique · Projet 7 (facteur capacité)

**Constat.** « Règle, Haiku, Sonnet, Opus » fait varier à la fois la génération, la réflexion (étendue / adaptative / toujours active), l'effort par défaut (n/a, high, medium), la température (réglable seulement sur Haiku 4.5), la coupure des connaissances (févr. 2025 contre juin 2026), le tokeniseur, la latence et les classifieurs de sécurité.

**Preuve.** https://platform.claude.com/docs/en/about-claude/models/overview.md; https://platform.claude.com/docs/en/api/messages.md

**Recommandation.** Traiter le facteur comme catégoriel (« modèle »). Fixer explicitement l'effort et la sortie maximale, et consigner les jetons de réflexion. Ajouter une condition « LLM exécutant la règle explicite » pour séparer suivi d'instructions et jugement.

**Disposition.** _à renseigner_

### ME-08 · majeur · Thèse (« au même titre », « même moteur »)

**Constat.** Côté fourmi, cinq genres (Linepithema, Pheidole, Pogonomyrmex, Temnothorax, fourmis légionnaires); côté abeille, Apis mellifera seule. Les paramètres ne sont pas commensurables, et un choix de point dans l'espace des paramètres peut fabriquer un gagnant, comme le documentent les pratiques douteuses des simulations comparatives.

**Preuve.** Pawel, Kook et Reeve 2024 doi:10.1002/bimj.202200091; Prabhakar et al. 2012 (lu)

**Recommandation.** Nommer l'espèce par projet et parler de mécanisme « de type piste / de type danse ». Calibrer chaque mécanisme sur ses données, comparer sur une grille ou un front de Pareto (vitesse × justesse × coût), faire une analyse de sensibilité globale (Morris puis Sobol) préenregistrée et normaliser l'environnement.

**Disposition.** _à renseigner_

### ME-09 · majeur · Absent (plan statistique)

**Constat.** Ni nombre de répétitions, ni erreur standard Monte Carlo, ni puissance, ni politique de graines; Math.random n'est pas semable.

**Preuve.** Lee et al. 2015 https://www.jasss.org/18/4/4.html; Morris et al. 2019 doi:10.1002/sim.8086; MDN Math; calculs inférés (annexe A)

**Recommandation.** Planifier avec ADEMP; fixer n par la MCSE visée ou par la stabilisation du coefficient de variation, et par la puissance (0,5 vs 0,7 → 93 runs par groupe; d = 0,5 → 63). Pour les modèles à règles, n ≥ 1000. PRNG semé, une graine consignée par run.

**Disposition.** _à renseigner_

### ME-10 · majeur · Technique (TypeScript/Canvas), projet 3

**Constat.** Artefacts non contrôlés : la mise à jour synchrone peut créer des motifs (les oscillations du projet 3 pourraient en être un), la précision des fonctions Math varie selon le navigateur et la plateforme, et le pas de temps comme le rodage ne sont pas spécifiés.

**Preuve.** Huberman et Glance 1993 https://www.pnas.org/doi/pdf/10.1073/pnas.90.16.7716; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math; https://www.jasss.org/23/2/7.html

**Recommandation.** Moteur de référence Node sans affichage, versions figées et PRNG semé pour tous les résultats confirmatoires; le navigateur ne fait que rejouer des traces. Facteur « ordre de mise à jour » (synchrone / asynchrone aléatoire), étude de convergence du pas de temps, documentation ODD (Grimm et al. 2020).

**Disposition.** _à renseigner_

### ME-11 · majeur · Absent (préenregistrement)

**Constat.** Aucun préenregistrement. Les pages interactives à curseurs invitent à chercher le réglage qui « marche » (jardin des sentiers).

**Preuve.** Pawel et al. 2024 doi:10.1002/bimj.202200091

**Recommandation.** Préenregistrement OSF par projet avant les runs confirmatoires (hypothèses, VI/VD, n, tolérances, exclusions, règle pour les refus). Format Registered Report pour le projet 7. Pages interactives déclarées exploratoires.

**Disposition.** _à renseigner_

### ME-12 · majeur · Technique (« publiable comme artifact »)

**Constat.** Ni DOI, ni licence, ni archivage pérenne, ni plan de gestion des données. PLoS Comput Biol exige depuis le 30 mars 2021 que le code soit public sans restriction.

**Preuve.** https://journals.plos.org/ploscompbiol/s/code-availability; https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content

**Recommandation.** Dépôt Git public, licences MIT/Apache-2.0 et CC BY 4.0, CITATION.cff, intégration Zenodo activée avant la première release (un DOI par release, dépôt public), Software Heritage, PGD, journaux LLM complets en JSONL.

**Disposition.** _à renseigner_

### ME-13 · majeur · Global, projet 7 (« seul projet sans résultat publié »)

**Constat.** État de l'art absent. La comparaison fourmi/abeille du fourragement existe (Detrain et Deneubourg 2008), et l'inversion des sources est déjà modélisée (de Vries et Biesmeijer 1998). Côté LLM : fourmis GPT-4o à phéromones dans NetLogo (5 runs), SwarmBench, SwarmWorld (stigmergie seule suffisante, août 2026), champs de pression à décroissance temporelle, LLM-Foraging. Le slogan « the queen gives no orders » a été publié sur Substack le 8 juin 2026. L'opposition orchestration/chorégraphie (Peltz 2003) n'est pas citée.

**Preuve.** doi:10.1016/s0065-2806(08)00002-7; https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1593017/full; https://arxiv.org/abs/2505.04364; https://arxiv.org/abs/2608.26081; https://arxiv.org/abs/2601.08129; https://arxiv.org/abs/2605.01461; https://bitsquarks.substack.com/p/the-queen-gives-no-orders; doi:10.1109/MC.2003.1236471

**Recommandation.** Revue systématique courte avant le projet 1, avec un tableau « existant / apport » par projet. Pour le projet 7, revendiquer la manipulation contrôlée du canal à modèle fixe, les références à budget égal et la puissance planifiée.

**Disposition.** _à renseigner_

### ME-14 · majeur · Absent (éthique et limites)

**Constat.** Ni section éthique ni section limites : anthropomorphisme de la vulgarisation, critique des métaphores en métaheuristiques, injection de faux signaux (projet 6), refus différentiels des classifieurs (attrition), coût énergétique, et évaluation pédagogique éventuelle avec des humains.

**Preuve.** Sörensen doi:10.1111/itor.12001; docs Anthropic (classifieurs); EPTC 2 non vérifié

**Recommandation.** Déclarer « simulation pure, aucun animal ». Encadré « limites de l'analogie » sur chaque page. Recherche défensive et divulgation responsable au projet 6. Règle préenregistrée pour les refus. CER/EPTC 2 si l'on évalue des apprenants.

**Disposition.** _à renseigner_

### ME-15 · majeur · Projet 1 (positionnement)

**Constat.** La revue comparative de Detrain et Deneubourg 2008 et le modèle de de Vries et Biesmeijer 1998 (qui simule déjà l'inversion des sources de Seeley) ne sont pas cités.

**Preuve.** doi:10.1016/s0065-2806(08)00002-7; résultats Consensus (secondaire)

**Recommandation.** Citer la revue comme cadre et prendre de Vries et Biesmeijer comme comparateur d'amarrage (docking).

**Disposition.** _à renseigner_

### ME-16 · majeur · Projet 1 (cible du pont double)

**Constat.** Le verrouillage sur la branche longue n'est pas chiffré (délai d'ajout de 30 min vérifié en source secondaire seulement). Les paramètres k ≈ 20, n ≈ 2 ne sont pas vérifiés.

**Preuve.** Goss et al. 1989 Naturwissenschaften 76:579 (métadonnées); délai 30 min (secondaire)

**Recommandation.** Extraire du texte intégral le nombre d'expériences et la proportion verrouillée; tolérance = intervalle binomial autour de la proportion publiée.

**Disposition.** _à renseigner_

### ME-17 · majeur · Projet 1 (variables dépendantes)

**Constat.** Aucune VD n'est définie.

**Preuve.** inféré

**Recommandation.** Latence d'adaptation (temps jusqu'à 80 % de réallocation), probabilité de verrouillage avant T_max, coût en messages ou dépôts par unité de ressource.

**Disposition.** _à renseigner_

### ME-18 · majeur · Projet 2 (contraste ACO/ABC)

**Constat.** ACO est évalué en combinatoire (Oliver30), ABC en continu (Rastrigin, Rosenbrock) : l'effet du mécanisme est confondu avec le type de problème.

**Preuve.** Socha et Dorigo 2008 (lu, p2src/acor2008.txt); doi:10.1111/itor.12001

**Recommandation.** Comparer sur les mêmes problèmes (ACO_R de Socha et Dorigo 2008 contre ABC en continu), à budget d'évaluations égal, avec une référence non bio-inspirée; citer la critique de Sörensen.

**Disposition.** _à renseigner_

### ME-19 · majeur · Projet 2 (tolérance Oliver30)

**Constat.** Dorigo et al. 1996 rapportent 423,741 en distances réelles, mais 420 en distances entières arrondies (moyennes sur 10 runs, NCMAX = 5000, α=1, β=5, ρ=0,5, Q=100, e=8). La cible dépend donc de la convention de distance.

**Preuve.** Dorigo, Maniezzo et Colorni 1996 doi:10.1109/3477.484436 (lu, dorigo96.txt)

**Recommandation.** Fixer la convention et le budget; critère du type « ≥ 9 runs sur 10 atteignent 423,741 ± 10^-3 ».

**Disposition.** _à renseigner_

### ME-20 · majeur · Projet 3 (cible Wilson 1984)

**Constat.** Cible inversée : quand les minors sont retirés, ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5) et leur activité (×15 à 30). La v3 dit que « les petites ouvrières prennent la relève ».

**Preuve.** https://link.springer.com/article/10.1007/BF00293108 (résumé, secondaire)

**Recommandation.** Corriger la cible et l'exprimer en alignement relationnel : hausse du répertoire et de l'activité des majors après retrait des minors.

**Disposition.** _à renseigner_

### ME-21 · majeur · Projet 3 (oscillations des agents identiques)

**Constat.** L'oscillation d'agents homogènes peut être un artefact de la mise à jour synchrone.

**Preuve.** Huberman et Glance 1993 (secondaire)

**Recommandation.** Tester sous mise à jour asynchrone aléatoire. VD = écart-type et puissance spectrale de la température après rodage; VI = σ_θ.

**Disposition.** _à renseigner_

### ME-22 · majeur · Projet 4 (loi de Little)

**Constat.** La v3 dit le rapprochement « non publié, de l'auteur ». Or Anderson et Ratnieks 1999 (Am Nat 154:521) invoquent explicitement Little 1961 (L = λW) pour les files d'attente des abeilles, en précisant qu'il ne s'applique pas tel quel (corrélation entre arrivées et file). Seeley et Tovey 1994 traitent déjà du lien entre temps d'attente et taux relatifs.

**Preuve.** Anderson et Ratnieks 1999 (lu, p4src/ar1999I.txt; https://eprints.whiterose.ac.uk/id/eprint/1304/); Seeley et Tovey 1994 doi:10.1006/anbe.1994.1044

**Recommandation.** Restreindre la revendication au cadrage comparatif « débit (fourmi) vs attente (abeille) », citer les deux articles et tester la mise en garde comme hypothèse.

**Disposition.** _à renseigner_

### ME-23 · majeur · Projets 5 et 7 (Temnothorax)

**Constat.** Temnothorax recrute par tandem et transport, sans piste persistante : l'architecture « piste » n'existe pas dans ce scénario.

**Preuve.** Pratt et al. 2005 doi:10.1016/j.anbehav.2005.01.022 (métadonnées); inféré

**Recommandation.** Décrire le mécanisme réel (tandem, quorum, transport) et l'encoder par les facteurs de canal formels du projet 7.

**Disposition.** _à renseigner_

### ME-24 · majeur · Projet 7 (confondants)

**Constat.** La verbosité croît avec le modèle, ce qui enrichit le signal en même temps que la capacité. Une invite unique n'est pas généralisable (jusqu'à 76 points d'écart selon le format). Les modèles connaissent le pont double et la danse (contamination des connaissances).

**Preuve.** Sclar et al. ICLR 2024 https://proceedings.iclr.cc/paper_files/paper/2024/hash/6c0e99d736da621403018ca7b32b1a4d-Abstract-Conference.html

**Recommandation.** Plafonner les messages ou imposer un schéma, et mesurer longueur et entropie. Au moins 3 paraphrases d'invite en facteur aléatoire, invites figées et hachées. Scénarios isomorphes à habillage neutre et sonde de reconnaissance.

**Disposition.** _à renseigner_

### ME-25 · majeur · Projet 7 (non-stationnarité)

**Constat.** Les identifiants sont des instantanés figés, mais les modèles sont retirés : Haiku 4.5 n'est garanti que jusqu'au 15 oct. 2026, Sonnet 4.5 est retiré le 30 nov. 2026, avec un préavis minimal de 60 jours. L'API n'a pas de seed, la température 0 n'est pas déterministe, et la température n'est plus réglable au-delà d'Opus 4.6. Variation jusqu'à 15 % entre runs « déterministes »; dérive mesurée de 84 % à 51 % en trois mois.

**Preuve.** https://platform.claude.com/docs/en/about-claude/model-deprecations.md; https://platform.claude.com/docs/en/api/messages.md; https://arxiv.org/abs/2408.04667; https://arxiv.org/abs/2307.09009

**Recommandation.** Traiter chaque run comme un tirage stochastique. Exécuter dans une fenêtre courte, ordre des cellules randomisé, en consignant date, ID, request-id et usage. Archiver les journaux (le rejeu permet la réanalyse, pas la régénération). Plan B pour Haiku. Ancre à poids ouverts figés.

**Disposition.** _à renseigner_

### ME-26 · majeur · Projet 7 (coût, puissance, unité d'analyse)

**Constat.** Ni coût ni puissance. Estimation de l'auditeur (20 agents × 100 décisions, 1 500 jetons d'entrée) : environ 8 400 $ à 30 runs par cellule, 26 000 $ à 93 runs, jusqu'à 78 000 $ avec 3 paraphrases d'invite. L'interaction visée demande environ 4 fois plus de runs qu'un effet principal (16 fois si elle vaut la moitié de l'effet). Les agents d'un même run ne sont pas indépendants.

**Preuve.** Tarifs : https://platform.claude.com/docs/en/about-claude/models/overview.md; calculs inférés (annexe A)

**Recommandation.** Pilote pour mesurer variance et coût réels, puissance par simulation, plan séquentiel avec règle d'arrêt préenregistrée, plafond budgétaire. Unité d'analyse = run; modèles mixtes (effets aléatoires run et paraphrase). Cache d'invite (10 %, 5 % pour Opus 5.5); Batch −50 % seulement si l'on regroupe un même pas sur toutes les répétitions.

**Disposition.** _à renseigner_

### ME-27 · mineur · Absent (plan de publication)

**Constat.** Aucune revue ni conférence désignée. ANTS 2026 a eu lieu du 8 au 10 juin 2026; ALIFE 2027 se tiendra à Prague du 19 au 23 juillet 2027 (échéance non publiée); AAMAS 2027 non vérifié.

**Preuve.** https://alife.org/conference/; https://iridia.ulb.ac.be/ants/

**Recommandation.** Correspondance projet → lieu : J R Soc Interface / PLoS CB pour les projets 1 et 5; Swarm Intelligence pour le 2; ALIFE 2027 et Artificial Life pour les 3, 4 et 6; AAMAS/JAAMAS ou Registered Report pour le 7; JASSS pour la méthode.

**Disposition.** _à renseigner_

### ME-28 · mineur · Parcours (« citées de mémoire »)

**Constat.** La bibliographie n'est pas vérifiée. Plusieurs références sont toutefois exactes au plan bibliographique (Dorigo 1996, Pratt 2005, Franks 2003, Couzin 2002, Seeley et Tovey 1994, Karaboga et Basturk 2007, etc.).

**Preuve.** Crossref (métadonnées)

**Recommandation.** Bibliothèque Zotero/BibTeX avec DOI et statut de vérification par entrée; citer la figure, le tableau ou la page de chaque cible chiffrée.

**Disposition.** _à renseigner_

### ME-29 · mineur · Parcours

**Constat.** Ni jalons, ni critères de passage, ni registre des risques; gabarit de « note de recherche » absent.

**Preuve.** inféré

**Recommandation.** Calendrier à portes go/no-go (une porte = reproduction réussie), registre des risques (retrait de modèles, données indisponibles, coût) et gabarit de note ADEMP + ODD + écarts + limites.

**Disposition.** _à renseigner_

### ME-30 · mineur · Projet 1 (analogie agentique)

**Constat.** « Rigide mais robuste / adaptable mais bavarde » est présenté comme un constat alors que c'est une hypothèse.

**Preuve.** inféré

**Recommandation.** Reformuler en H1 (la latence d'adaptation croît avec la persistance τ à débit d'information égal).

**Disposition.** _à renseigner_

### ME-31 · mineur · Projet 2 (source ABC)

**Constat.** « Karaboga 2005 » désigne le rapport technique TR06, non évalué par les pairs (5D Sphere, 2D Rosenbrock, 10D Rastrigin, 30 runs). Karaboga et Basturk 2008 utilisent Rastrigin et Rosenbrock en 50 dimensions : les cibles sont incompatibles. Les valeurs de l'ordre de 1e-17 sont sous la résolution utile.

**Preuve.** lu (p2src/abc_tr06.txt, p2src/abc2008.txt)

**Recommandation.** Choisir une source et copier son protocole exactement. Tester l'équivalence sur log10 de l'erreur, ou par taux de succès sous un seuil (p. ex. 1e-12).

**Disposition.** _à renseigner_

### ME-32 · mineur · Projet 3 (Jones et al. 2004)

**Constat.** L'étude compare des colonies génétiquement diverses et uniformes; le mécanisme par seuils est une explication proposée. L'« oscillation » de la ruche homogène n'a pas été lue dans la source.

**Preuve.** Jones et al. 2004 Science 305:402 (secondaire)

**Recommandation.** Présenter les seuils comme hypothèse de mécanisme; VD = écart-type et spectre de la température.

**Disposition.** _à renseigner_

### ME-33 · mineur · Projet 4 (données Prabhakar)

**Constat.** Le modèle est ajusté sur un paramètre (c) à partir de 39 essais de terrain; la disponibilité des données brutes n'est pas vérifiée.

**Preuve.** Prabhakar et al. 2012 (lu, p4src/prab2012.txt)

**Recommandation.** Vérifier l'accès aux données; sinon, viser la réplication du modèle plutôt que des données.

**Disposition.** _à renseigner_

### ME-34 · mineur · Projet 5 (variables dépendantes)

**Constat.** Vitesse et justesse ne sont pas définies.

**Preuve.** Franks et al. 2003 doi:10.1098/rspb.2003.2527 (métadonnées)

**Recommandation.** Temps jusqu'au quorum et jusqu'à l'engagement complet; proportion de runs qui choisissent le meilleur site; courbe vitesse-justesse en fonction de Q.

**Disposition.** _à renseigner_

### ME-35 · mineur · Projet 6 (interblocage)

**Constat.** L'interblocage n'est pas toujours une pathologie : pour des options égales de faible valeur, il est adaptatif. L'inhibition croisée le rompt au-delà de s* = 4v³/(v²−1)².

**Preuve.** Pais et al. 2013 https://pmc.ncbi.nlm.nih.gov/articles/PMC3759446/ (lu, pais2013.txt)

**Recommandation.** Distinguer interblocage adaptatif et pathologique, et utiliser la bifurcation s* comme cible quantitative (±2 %).

**Disposition.** _à renseigner_

### ME-36 · mineur · Projet 6 (moulin)

**Constat.** Couzin et al. 2002 portent sur des groupes animaux génériques, pas sur des fourmis à pistes.

**Preuve.** doi:10.1006/jtbi.2002.3065 (métadonnées)

**Recommandation.** Soit cibler explicitement la phase tore de Couzin (polarisation et moment angulaire), soit trouver un modèle de moulin propre aux fourmis légionnaires.

**Disposition.** _à renseigner_

### ME-37 · mineur · Projet 7 (validité externe)

**Constat.** Une colonie de 20 agents LLM ne représente ni une fourmilière ni un système agentique industriel.

**Preuve.** inféré

**Recommandation.** Ajouter une section « portée des conclusions » : ce que le résultat dit des mécanismes de canal, et ce qu'il ne dit ni des insectes ni des produits.

**Disposition.** _à renseigner_

## Ajouts recommandés

### ME-A01 · ajout

Plan de recherche avec matrice de traçabilité QR → hypothèse → VI/VD → plan → critère de réfutation → analyse, par projet

**Disposition.** _à renseigner_

### ME-A02 · ajout

Revue de littérature systématique courte (protocole, équations de recherche, critères) et tableau « existant / apport » par projet, incluant Detrain et Deneubourg 2008, de Vries et Biesmeijer 1998, Jimenez-Romero et al. 2025, SwarmBench, SwarmWorld

**Disposition.** _à renseigner_

### ME-A03 · ajout

Protocole ODD (Grimm et al. 2020) pour chaque modèle fourmi et abeille, avec ordre de mise à jour et stochasticité explicites

**Disposition.** _à renseigner_

### ME-A04 · ajout

Protocole de reproduction : cible exacte (figure/tableau), niveau (relationnel ou distributionnel), marge TOST, n, portes go/no-go, registre des déviations

**Disposition.** _à renseigner_

### ME-A05 · ajout

Préenregistrements OSF par projet; format Registered Report pour le projet 7

**Disposition.** _à renseigner_

### ME-A06 · ajout

Plan d'analyse statistique : ADEMP, erreur standard Monte Carlo, puissance par simulation, modèles mixtes (unité = run), corrections multiples

**Disposition.** _à renseigner_

### ME-A07 · ajout

Moteur de référence Node sans affichage, avec PRNG semé et versions figées, distinct de la couche de vulgarisation navigateur

**Disposition.** _à renseigner_

### ME-A08 · ajout

Spécification du projet 7 : facteurs de canal formels (persistance, adressage, format), références à budget égal (sans canal, agent unique, règles), condition « LLM exécutant la règle », 3 paraphrases d'invite, effort fixé, schéma de journalisation, budget plafonné, fenêtre d'exécution, plan B en cas de retrait de Haiku 4.5

**Disposition.** _à renseigner_

### ME-A09 · ajout

Opérationnalisation écrite de la « richesse du signal » (bits par message, persistance, localité, adressage) et du « gain collectif » (G normalisé, coût, robustesse, modes d'échec MAST)

**Disposition.** _à renseigner_

### ME-A10 · ajout

Plan de gestion des données et du logiciel : licences, CITATION.cff, intégration Zenodo activée avant la 1re release, Software Heritage, archivage des journaux LLM

**Disposition.** _à renseigner_

### ME-A11 · ajout

Section éthique et limites : simulation pure, recherche défensive au projet 6, refus des classifieurs traités comme attrition, CER si évaluation pédagogique, charte anti-anthropomorphisme

**Disposition.** _à renseigner_

### ME-A12 · ajout

Plan de publication par projet (J R Soc Interface, PLoS CB, Swarm Intelligence, ALIFE 2027 Prague, JASSS, AAMAS/JAAMAS)

**Disposition.** _à renseigner_

### ME-A13 · ajout

Calendrier à jalons, registre des risques et gabarit de note de recherche (ADEMP + ODD + résultats + écarts + limites + DOI)

**Disposition.** _à renseigner_

### ME-A14 · ajout

Bibliothèque bibliographique vérifiée (DOI, statut de vérification par entrée)

**Disposition.** _à renseigner_


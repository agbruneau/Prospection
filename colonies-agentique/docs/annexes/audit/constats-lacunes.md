# Constats — Lacunes et architecture

Source : [rapport complet](lacunes.md). 26 constats (3 critiques, 15 majeurs, 8 mineurs) et 13 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 couvre bien le noyau classique (piste contre danse, seuils, quorum), mais aucun projet ne traite l'intelligence individuelle, pourtant explicitement visée par l'intention. La question transversale (scalaire → symbole → langage) repose sur une dichotomie que les sources contredisent : les abeilles sans dard tracent des pistes, les fourmis font du tandem et stridulent, et la piste encode plus qu'un scalaire. Cette question n'a de plus aucune métrique opérationnelle, ce qui rend P7 infalsifiable. Six familles de concepts documentés manquent : mouvement collectif et transport, auto-assemblage et construction, trophallaxie, signaux vibratoires et modulateurs, effets de taille et types de recrutement, bruit et exploration. La parité est biaisée (une fourmi générique tirée de six genres contre la seule Apis mellifera, sans paramètre écologique) et l'agentique est confinée à P7, dont la prétention de nouveauté est contredite par des travaux de 2025. Je propose une architecture en cinq axes avec un socle de métriques communes, trois projets ajoutés (Individu et colonie, Minorité informée, Construire sans plan), P2 recentré sur l'allocation dynamique ou mis en annexe, et P6 recentré sur défaillances et défenses.

## Constats

### LA-01 · critique · Intention; tous projets

**Constat.** Aucun projet sur l'intelligence individuelle (navigation, apprentissage, mémoire privée) ni sur la relation individu → colonie, alors que l'intention vise les deux niveaux.

**Preuve.** https://www.pnas.org/doi/10.1073/pnas.1304917110 ; https://doi.org/10.1155/1989/94279 (résumé lu) ; https://doi.org/10.1242/jeb.143891 ; https://www.science.org/doi/10.1126/science.ade1702

**Recommandation.** Ajouter un projet A2 « Individu et colonie » : reproduire Sasaki et al. 2013 (la colonie ne bat l'individu que si la tâche est difficile) et, pour les abeilles, Grüter et al. 2008 / I'Anson Price et al. 2019. Volet agentique : un collectif faible contre un agent fort, selon la difficulté.

**Disposition.** Accepté — Projet P8 « Individu et colonie » ajouté en phase 1 : Sasaki et al. 2013 (T8.1, T8.2), I'Anson Price et al. 2019 (T8.8) et un volet agentique collectif faible contre agent fort à jetons égaux, selon la difficulté D1 à D5 (E8.1, E8.5, H8.4 à H8.8). — Traité dans : ../../../projets/P8-individu-et-colonie.md (§1 Objet et questions de recherche; §3 Hypothèses falsifiables; §6 E8.3 et E8.5); ../../00-cadre.md (§3 Questions de recherche, QR1; §5 Architecture du programme)

### LA-02 · critique · Tableau (Canal, Contenu du signal); question transversale

**Constat.** L'axe « fourmi = scalaire persistant, abeille = symbole éphémère » confond taxon et canal : les Meliponini ont des pistes, les fourmis font du tandem et stridulent, la géométrie des pistes encode la polarité.

**Preuve.** https://www.apidologie.org/articles/apido/abs/2004/02/M4207/M4207.html ; https://www.nature.com/articles/439153a ; https://www.nature.com/articles/nature03105 ; https://link.springer.com/article/10.1007/BF01140810

**Recommandation.** Reformuler la question autour de propriétés mesurables du canal (persistance, localisation, bits, coût). Faire du canal une variable indépendante du moteur, avec des contre-factuels, et ajouter un encadré de contre-exemples.

**Disposition.** Accepté — Le canal est une variable du modèle, jamais un attribut du taxon (couche 3 à canal interchangeable, contre-factuel Meliponini en E1.6 et H1.7), et la question passe par des composantes mesurables du canal (R_nom en bits, R_eff, persistance, portée, adressage; coût à part). Les contre-exemples vivent dans la colonne « Où l'analogie casse » et l'encart final du niveau Voir de P1. — Traité dans : ../../00-cadre.md (§2.3 Fourmi et abeille : taxons nommés, pas archétypes; §2.4 points 10 et 15; §4 Construits mesurables); ../../06-metriques-et-typologie.md (§3 R; §6.1 Médium et portée, Codage du signal); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.6; §3 H1.7; §8 Voir)

### LA-03 · critique · Question transversale; P7

**Constat.** « Gain collectif » et « richesse du signal » ne sont pas définis : P7 n'a pas de variable dépendante falsifiable.

**Preuve.** https://www.frontiersin.org/articles/10.3389/fevo.2015.00022/full (lu) ; https://doi.org/10.1007/BF02222949

**Recommandation.** Définir dans un socle commun G (collectif / meilleur individu isolé, et / N individus indépendants), R (information mutuelle en bits, cf. 2,9 + 4,5 bits pour la danse), la robustesse et le coût.

**Disposition.** Modifié — G et R sont définis dans le socle S0 : G à budget égal avec trois références (agents indépendants sans canal, agent unique, colonie à règles) et décomposition agrégation/interaction, plus robustesse et coût. Adaptation : R est un vecteur à cinq composantes (R_nom en bits, R_eff = I(M;W)/H(W); 2,9 + 4,5 bits de la danse marqués [à confirmer]) et non une grandeur unique, et Δ_k est rapporté avant G. — Traité dans : ../../00-cadre.md (§4 Construits mesurables); ../../06-metriques-et-typologie.md (§3 R, la richesse du signal; §4 G; §5.1 Robustesse; §5.2 Coût); ../../03-plan-de-recherche.md (§5.1 Décisions); ../../../projets/S0-socle.md (§1 lot B; §5 T0.29 à T0.32; §3 H0.3 à H0.5)

### LA-04 · majeur · Lignes « Agentique » de P1 à P6; Technique

**Constat.** Agentique réduite à des analogies, sans état de l'art (définition orchestration/chorégraphie, stigmergie, échecs des systèmes multi-agents LLM, conformité, loi d'échelle).

**Preuve.** https://doi.org/10.1109/MC.2003.1236471 ; https://doi.org/10.1016/j.cogsys.2015.12.002 ; https://doi.org/10.52202/085713-4082 ; arXiv:2406.07155 ; arXiv:2410.12428

**Recommandation.** Donner à chaque projet un volet expérimental agentique avec les métriques communes. Ajouter un glossaire ancré sur Peltz 2003, Heylighen 2016 et Malone et Crowston 1994.

**Disposition.** Modifié — Chaque fiche porte un parallèle agentique avec témoin orchestré et un volet expérimental (à règles dans P1 à P6, P8 et P9; LLM exécutés par P7 avec les mêmes G, R et coût), et le glossaire définit orchestration, chorégraphie et stigmergie. Adaptation : l'ancrage est OMG 2013, Montesi et Heylighen 2016a; Peltz 2003 n'est cité qu'en [R] par S0 et Malone et Crowston 1994 est absent. — Traité dans : ../../10-glossaire.md (orchestration; chorégraphie; stigmergie; conformité); ../../06-metriques-et-typologie.md (§1 Typologie à trois axes; §5.3 Échecs); ../../02-architecture-programme.md (§7 D4); ../../../projets/P7-synthese-agentique.md (§1 Séquence imposée)

### LA-05 · majeur · P7

**Constat.** « Seul projet sans résultat publié » est faux : des LLM pilotent déjà des simulations de fourragement de fourmis (NetLogo), et le Boids LLM coûte environ 300 fois plus de temps de calcul.

**Preuve.** https://arxiv.org/abs/2503.03800 ; https://arxiv.org/abs/2506.14496

**Recommandation.** Reproduire d'abord Jimenez-Romero et al. 2025, puis l'étendre. Ajouter les axes coût et taille du collectif. Décrire la capacité des modèles par une mesure plutôt que par un nom de produit.

**Disposition.** Modifié — La correction est faite (« seul projet sans résultat publié » est retiré) et P7 reproduit d'abord Jimenez-Romero et al. 2025 (T7.8), puis étend avec le coût en dollars (G_$), la taille N (agents à règles à N = 10 et N biologique, hybride : E7.8) et le surcoût de calcul de Rahman et al. 2025. Adaptation : la capacité reste un facteur catégoriel par modèle nommé (une échelle de capacité est refusée). — Traité dans : ../../00-cadre.md (§2.4 point 12); ../../../projets/P7-synthese-agentique.md (§1 Séquence imposée; §5 tableau A, T7.8; §6.3 E7.8; §7.3); ../../03-plan-de-recherche.md (§6 Plan statistique général, ligne LLM; §8.3 Positionnement spécifique)

### LA-06 · majeur · Tableau (Freinage : « absence de retours »); P1

**Constat.** Rétroaction négative chez les fourmis ignorée : l'encombrement aux sources permet à Lasius niger de se réallouer malgré la piste, et le bruit aide en environnement changeant.

**Preuve.** https://doi.org/10.1371/journal.pone.0044501 (résumé lu) ; https://research.monash.edu/en/publications/noise-improves-collective-decision-making-by-ants-in-dynamic-envi/

**Recommandation.** Dans P1, reproduire chez les fourmis le verrouillage ET la réallocation (Grüter et al. 2012); corriger le tableau.

**Disposition.** Accepté — P1 reproduit côté fourmi le verrouillage (pont de Goss : T1.1, T1.2) et la réallocation par encombrement de Grüter et al. 2012 (T1.8, H1.3, E1.3), et le tableau est corrigé : le freinage existe (phéromone « no entry », inhibition par encombrement). — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§5 T1.8; §6 E1.3); ../../00-cadre.md (§2.4 points 9 et 11); ../../06-metriques-et-typologie.md (§6.2 Freinage (inhibition))

### LA-07 · majeur · P1; P7

**Constat.** Types de recrutement (individuel, tandem, groupe, masse, piste-tronc, légionnaire) et effets de taille absents, alors que la transition de phase et les seuils de taille sont documentés chez les deux taxons.

**Preuve.** https://doi.org/10.1155/1989/94279 ; https://www.pnas.org/doi/10.1073/pnas.161285298 ; https://doi.org/10.1007/s00114-014-1215-x (résumé lu) ; https://doi.org/10.1093/beheco/arp070

**Recommandation.** Faire de N un curseur de P1 (reproduire Beekman et al. 2001) et un axe de P7.

**Disposition.** Modifié — La taille de colonie est un facteur de P1 (flux Φ en H1.5; taille × type de recrutement en E1.4; table des types en §4.6) et un axe exploratoire de P7 (E7.8). Adaptation : Beekman et al. 2001 n'est pas reproduit dans P1 (modèle non lu; cible T6.6 de P6, bloquée) et la table ne couvre ni le recrutement individuel ni le légionnaire. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§4.6 Types de recrutement et taille de colonie; §3 H1.5; §6 E1.4); ../../../projets/P6-defaillances-et-defenses.md (§5 T6.6); ../../../projets/P7-synthese-agentique.md (§6.3 E7.8)

### LA-08 · majeur · P1; P2

**Constat.** Bruit bénéfique et exploration/exploitation absents (erreur stratégique chez les fourmis, imprécision de la danse, éclaireuses).

**Preuve.** https://link.springer.com/article/10.1007/s002650050609 ; https://doi.org/10.1007/s10905-010-9204-1 ; https://doi.org/10.1007/BF00290778 ; https://doi.org/10.1126/science.1213962

**Recommandation.** Ajouter un curseur « bruit » à P1 et reproduire Dussutour et al. 2009. Présenter l'hypothèse de l'erreur ajustée comme débattue (Tanner et Visscher 2010). Analogue agentique : la température d'échantillonnage.

**Disposition.** Modifié — Le bruit est un levier de P1 : SDE de Dussutour et al. 2009 (T1.9, H1.6, E1.3b), bruit directionnel de type Weber (H1.8, E1.5) et erreur de danse d'Okada (T1.7); T1.9 reste bloquée (unité de ρ). Adaptations : l'hypothèse de l'erreur ajustée (Tanner et Visscher 2010) n'est pas présentée comme débattue, et la « température d'échantillonnage » est remplacée par la répétition des appels, la diversité de prompts et un bruit de canal injecté, `temperature` n'étant plus réglable. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§5 T1.7 et T1.9; §6 E1.3 et E1.5; §7.1 ligne « Le bruit sert d'exploration »); ../../06-metriques-et-typologie.md (§3.3 R_eff; §7 homonymie 25); ../../00-cadre.md (§2.4 point 16)

### LA-09 · majeur · P1; P5; P7

**Constat.** Cascades d'information et conformité non nommées, alors que le verrouillage de P1 en est une et que les LLM se conforment à la majorité.

**Preuve.** https://doi.org/10.1098/rstb.2010.0325 ; arXiv:2410.12428 ; https://www.pnas.org/doi/10.1073/pnas.1304917110

**Recommandation.** Ajouter un indicateur de cascade commun et une expérience agentique de conformité.

**Disposition.** Modifié — « Cascade d'information » et « conformité » sont nommées au glossaire (indicateur : fraction de décisions copiées malgré une information privée contraire [I]) et testées chez des agents à règles puis LLM (E1.7, E6.3, H8.7, E9.1). Adaptation : l'indicateur n'est pas fixé une fois dans les métriques communes (P1 : taux de verrouillage; P8 : fraction copiée « si adopté »; 06 : C_amp,int). — Traité dans : ../../10-glossaire.md (cascade d'information; conformité); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.1 et E1.7); ../../../projets/P6-defaillances-et-defenses.md (§3 H6.3; §6 E6.3); ../../../projets/P8-individu-et-colonie.md (§3 H8.7; §6 E8.3); ../../../projets/P9-mouvement-collectif-et-construction.md (§6 E9.1)

### LA-10 · majeur · Nouveau projet

**Constat.** Mouvement collectif et transport coopératif absents : la minorité informée qui guide sans chef (Paratrechina; essaim où moins de 5 % des abeilles connaissent le site) est le cas pur de chorégraphie.

**Preuve.** https://www.nature.com/articles/ncomms8729 ; https://doi.org/10.1242/jeb.018994 (résumé lu) ; https://doi.org/10.1038/nature03236 ; https://doi.org/10.1038/s41567-018-0107-y

**Recommandation.** Projet C2 « Minorité informée » : reproduire Gelblum et al. 2015 et Schultz et al. 2008, et y rapatrier le moulin de P6.

**Disposition.** Accepté — P9 reprend Gelblum et al. 2015 et 2016 (T9.10 à T9.14, transport coopératif), Schultz et al. 2008 (T9.17 : streakers contre guides subtils, moins de 5 % d'informés) et héberge le moulin cédé par P6 (T9.1, T9.2, T9.9, T9.33); le projet est fusionné avec la construction (LA-11) plutôt que séparé. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§1 Objet; §4.1 et §4.5 moulin; §4.6 Paratrechina; §4.7 Minorité informée; §5.2 et §5.3); ../../00-cadre.md (§5 Architecture du programme)

### LA-11 · majeur · Nouveau projet (phase 3)

**Constat.** Auto-assemblage et construction stigmergique absents (radeaux, ponts vivants, nid de Lasius; grappe d'essaim, rayons).

**Preuve.** https://researchers.mq.edu.au/en/publications/army-ants-dynamically-adjust-living-bridges-in-response-to-a-cost/ ; https://pubmed.ncbi.nlm.nih.gov/26787857/ ; https://www.nature.com/articles/s41567-018-0262-1 ; https://doi.org/10.1038/srep28341

**Recommandation.** Projet C3 « Construire sans plan » : reproduire Reid et al. 2015 (compromis coût-bénéfice) et Peleg et al. 2018 (auteur Peleg, 2018). Analogie : coordination par artefacts partagés.

**Disposition.** Modifié — Auto-assemblage et construction sont dans P9, non dans un projet distinct : Reid et al. 2015, Garnier, Mlot et Peleg 2018 en phase 2 (T9.20 à T9.23), puis construction stigmergique en phase 3 (Khuong et al. 2016 : T9.25; Johnson 2009 : T9.26) et durée de vie d'un artefact partagé (E9.3). — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.8 Auto-assemblage; §4.9 Construction (phase 3); §5.4 et §5.5; §6 E9.2 et E9.3); ../../09-feuille-de-route.md (§2.4 Phase 3)

### LA-12 · majeur · P4

**Constat.** Trophallaxie absente chez les deux espèces; chez l'abeille, elle n'est qu'implicite dans le déchargement du nectar.

**Preuve.** https://elifesciences.org/articles/20375 ; https://doi.org/10.1038/srep12496 ; https://doi.org/10.1038/s41598-019-52019-6

**Recommandation.** Ajouter à P4 un module « réseau trophallactique » pour les deux espèces (analogue : protocoles de rumeur). La source abeille reste à vérifier.

**Disposition.** Hors portée — Traité à la validation finale : la trophallaxie est déclarée hors portée de P4 faute de modèle de référence lu dans les dossiers, avec une référence d’appui ajoutée à la bibliographie (Greenwald et al. 2015); reportée comme extension possible de P4 après la phase 2. — Traité dans : ../../../projets/P4-regulation-sans-vue-densemble.md (1. Objet et questions de recherche, Hors portée), ../../11-bibliographie.md

### LA-13 · majeur · P5; P4

**Constat.** Signaux vibratoires et modulateurs (shaking, piping, buzz-run) et passage de la décision à l'action absents; la stridulation des fourmis aussi.

**Preuve.** Seeley et Tautz 2001, J Comp Physiol A 187:667–676 ; Rittschof et Seeley 2008, Anim Behav 75:189–197 ; Schneider et Lewis 2004, Apidologie 35:117–131 ; https://doi.org/10.1007/s00265-022-03218-1

**Recommandation.** Étendre P5 à « quorum → préparation → départ », avec l'analogie de la validation en deux phases.

**Disposition.** Modifié — La chaîne quorum → préparation → départ est modélisée (piping, échauffement, buzz-run côté abeille; basculement tandem → transport côté fourmi : §4.4, E5.3, H5.6), avec l'analogie de l'engagement en deux phases à annulation possible. Adaptation : les signaux modulateurs (shaking; Seeley et Tautz 2001, Rittschof et Seeley 2008) restent des références « à ajouter après lecture » et la stridulation des fourmis n'apparaît nulle part. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.4 Chaîne décision → action; §6 E5.3; §7.1 « Décision puis action, en deux temps »; §13 Références clés, à ajouter à la bibliographie)

### LA-14 · majeur · Thèse; Tableau

**Constat.** « La reine ne commande pas » ignore un troisième mode, la modulation chimique globale (phéromone royale, phéromone d'amorçage des ouvrières), qui n'est ni orchestration ni chorégraphie pair à pair.

**Preuve.** https://doi.org/10.1038/332354a0 ; https://doi.org/10.1073/pnas.0407652101

**Recommandation.** Ajouter une ligne « Modulation globale » au tableau et au glossaire (analogue : prompt système ou configuration diffusée).

**Disposition.** Accepté — Une ligne « Modulation globale » est ajoutée au tableau comparatif (phéromones de reine, inhibition sociale; analogue : invite système ou configuration diffusée, « une contrainte, non un ordre ») et une entrée « modulation » au glossaire; la thèse est reformulée et l'encart « Ce que fait vraiment la reine » la rend lisible au public. — Traité dans : ../../06-metriques-et-typologie.md (§6.1 Modulation globale); ../../10-glossaire.md (modulation); ../../00-cadre.md (§2.1 Thèse reformulée); ../../07-vulgarisation-evaluation.md (§7.3 Encart « Ce que fait vraiment la reine »)

### LA-15 · majeur · P3 (abeilles)

**Constat.** Division du travail de l'abeille réduite au polyéthisme d'âge, sans inhibition sociale (oléate d'éthyle) ni réserve d'ouvrières inactives.

**Preuve.** https://doi.org/10.1073/pnas.89.24.11726 ; https://doi.org/10.1007/s00265-009-0874-7 ; https://doi.org/10.1371/journal.pone.0184074

**Recommandation.** Ajouter l'inhibition sociale (analogue de Gordon) et une expérience « réserve ».

**Disposition.** Modifié — L'inhibition sociale de l'abeille est modélisée en reconstruction (Huang et Robinson 1992 : H3.6, E3.6, T3.9, T3.10) et la réserve d'ouvrières inactives l'est chez *Temnothorax* (Charbonneau et al. 2017 : T3.7, H3.2, H3.3, E3.2, E3.3). Adaptation : l'oléate d'éthyle (Leoncini et al. 2004) n'est ni modélisé ni cité (R14), et la réserve côté abeille n'a ni cible ni expérience. — Traité dans : ../../../projets/P3-division-du-travail.md (§2 Positionnement; §4.3 Fourmi, réserve et fatigue; §4.4 Abeille, inhibition sociale; §6 E3.2, E3.3 et E3.6; §11 R10 et R14)

### LA-16 · majeur · Ensemble; Technique

**Constat.** Parité biaisée : six genres de fourmis contre une seule espèce d'abeille, et aucun paramètre écologique, alors que la valeur de la danse et les stratégies des fourmis dépendent de l'environnement.

**Preuve.** https://doi.org/10.1146/annurev-ento-011118-111923 ; https://doi.org/10.1007/s00265-003-0726-9 ; https://www.science.org/doi/10.1126/sciadv.aat0450 ; https://doi.org/10.3389/fevo.2015.00011

**Recommandation.** Nommer l'espèce modèle par volet; paramétrer l'environnement (dispersion, distance, volatilité, 2D/3D); ajouter un tiers témoin (Meliponini).

**Disposition.** Modifié — Chaque fiche nomme son taxon et son préréglage (cadre §2.3), la parité est tabulée avec asymétries justifiées, le témoin Meliponini est en E1.6 et l'environnement est paramétré (volatilité en E1.6, densité × durée de vie des parcelles en E8.4, nombre de mangeoires en T1.7). Adaptation : la dimension 2D/3D n'est pas un paramètre d'environnement commun, et la parité reste fortement asymétrique en P9 et P6. — Traité dans : ../../00-cadre.md (§2.3; §5 Architecture du programme, paragraphe Parité); ../../02-architecture-programme.md (§5 Parité fourmi et abeille par projet, tableaux A et B); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.6); ../../../projets/P8-individu-et-colonie.md (§6 E8.4)

### LA-17 · majeur · P2

**Constat.** ACO sur un TSP et ABC sur des fonctions continues ne sont pas comparables, et l'optimisation statique s'éloigne de la chorégraphie.

**Preuve.** https://doi.org/10.1613/jair.530 ; https://doi.org/10.1177/105971230401200308 (résumé lu)

**Recommandation.** Recentrer sur l'allocation dynamique distribuée avec le même flux de requêtes (AntNet contre Nakrani et Tovey, où l'algorithme abeille bat le glouton seulement quand la charge est très variable), ou reléguer en annexe.

**Disposition.** Modifié — P2 devient une annexe de phase 3 soumise à go/no-go (porte G0), à cibles algorithmiques et à budget égal en évaluations; l'allocation dynamique distribuée (AntNet contre l'algorithme apicole de Nakrani et Tovey, même flux de requêtes) est un périmètre emboîté sous la porte G3 (T2.12, E2.4). Adaptation : le noyau ACO/ABC est conservé (E2.1) au lieu d'un recentrage complet. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Portes go/no-go; §5 T2.12; §6 E2.1 et E2.4); ../../00-cadre.md (§5 Architecture du programme); ../../02-architecture-programme.md (§7 D14)

### LA-18 · majeur · P6

**Constat.** Trois moteurs hétérogènes (mouvement, reconnaissance chimique, décision) et aucun volet défense, alors que P6 vise l'injection de prompt.

**Preuve.** https://doi.org/10.1126/science.aat4793 ; https://doi.org/10.1098/rsif.2015.1022

**Recommandation.** « Défaillances et défenses » : garder l'interblocage et le mimétisme, ajouter la modularité du réseau comme pare-feu, céder le moulin à C2.

**Disposition.** Accepté — P6 devient « Défaillances et défenses » : interblocage et mimétisme sont conservés, la modularité du réseau comme pare-feu est ajoutée (H6.8, E6.7) et le moulin est cédé à P9 (T6.1 à T6.5 gardées pour la traçabilité seulement). — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§1 Répartition avec les projets voisins; §3 H6.8; §6 E6.7; §7.1 Taxonomie P6 et relations); ../../../projets/P9-mouvement-collectif-et-construction.md (§4.1; §4.5)

### LA-19 · mineur · Tableau (Oubli)

**Constat.** Mémoire collective non thématisée, alors que l'article cité pour la phase tore s'intitule « Collective Memory and Spatial Sorting ».

**Preuve.** https://doi.org/10.1006/jtbi.2002.3065 ; https://doi.org/10.1146/annurev-ento-010814-020627

**Recommandation.** Remplacer la ligne « Oubli » par « Mémoire » (externe, individuelle, hystérésis du groupe).

**Disposition.** Modifié — Une ligne « Mémoire » (externe, individuelle, d'état du groupe par hystérésis) est ajoutée au tableau comparatif et au glossaire. Adaptation : elle s'ajoute à la ligne « Oubli » au lieu de la remplacer, l'oubli étant conservé en trois formes (évaporation, abandon, attrition des danses). — Traité dans : ../../06-metriques-et-typologie.md (§6.2 lignes Mémoire et Oubli, en trois formes; §7 homonymie 10); ../../10-glossaire.md (mémoire); ../../00-cadre.md (§2.4 points 14 et 15)

### LA-20 · mineur · P5

**Constat.** Décision d'essaimer (reproduction de la colonie) absente.

**Preuve.** https://link.springer.com/article/10.1007/s13592-013-0253-2 ; https://doi.org/10.1007/s00114-014-1215-x

**Recommandation.** La mentionner en prologue de P5 ou la déclarer hors périmètre.

**Disposition.** Hors portée — Traité à la validation finale : la décision d’essaimer est déclarée hors portée de P5, qui commence une fois l’essaim sorti. — Traité dans : ../../../projets/P5-decision-par-quorum.md (1. Objet et questions de recherche, Hors portée)

### LA-21 · mineur · Thèse

**Constat.** Superorganisme et cognition distribuée non cadrés.

**Preuve.** https://doi.org/10.1002/jmor.1050220206 ; https://doi.org/10.1098/rsif.2008.0511 ; https://doi.org/10.1146/annurev-ento-020117-043249

**Recommandation.** Ajouter un chapitre théorique au socle (Wheeler 1911, Hölldobler et Wilson 2009, Marshall et al. 2009, Sasaki et Pratt 2018).

**Disposition.** Modifié — Aucun chapitre théorique n'est ajouté au socle; le sujet est réduit aux entrées de glossaire « superorganisme » (Hölldobler et Wilson 2009 non lu, limites de l'analogie à cadrer) et « cognition collective », au positionnement de S0 (Couzin 2009, Feinerman et Korman 2017) et à Marshall et al. 2009 et Sasaki et Pratt 2018 dans P5 et P8. Wheeler 1911 est absent. — Traité dans : ../../10-glossaire.md (superorganisme; cognition collective); ../../../projets/S0-socle.md (§2 Positionnement); ../../../projets/P8-individu-et-colonie.md (§2 Positionnement)

### LA-22 · mineur · P5

**Constat.** Aucun modèle cité pour « l'inhibition croisée débloque une égalité ».

**Preuve.** https://doi.org/10.1371/journal.pone.0073216

**Recommandation.** Implémenter Pais et al. 2013 (décision sensible à la valeur) comme cible.

**Disposition.** Accepté — Pais et al. 2013 est une cible de reproduction centrale de P5 (modèle M2, EDS sensible à la valeur : T5.4 à T5.7), qui fonde l'énoncé : l'inhibition ciblée brise l'égalité à partir de σ*, l'inhibition non ciblée ne le fait pas (H5.1, H5.2). — Traité dans : ../../../projets/P5-decision-par-quorum.md (§3 H5.1 et H5.2; §4.3 M2; §5 T5.4 à T5.7)

### LA-23 · mineur · Tableau (Recrutement)

**Constat.** « Délégation » renvoie à un délégant, donc à l'orchestration; le recrutement est une annonce que le receveur choisit de suivre.

**Preuve.** inféré, avec la définition de Peltz 2003 : https://doi.org/10.1109/MC.2003.1236471

**Recommandation.** Remplacer par « annonce et abonnement (pull) ».

**Disposition.** Modifié — « Délégation » est réservée à l'orchestration, en contre-exemple, et le recrutement devient « annonce et auto-sélection » (tiré, la recrue choisit de suivre). Adaptation : « abonnement » est écarté, la danse étant un échantillonnage aléatoire local et non un pub/sub. — Traité dans : ../../06-metriques-et-typologie.md (§6.1 Recrutement : annonce et auto-sélection; §7 homonymie 8); ../../10-glossaire.md (délégation; recrutement); ../../00-cadre.md (§2.4 point 10)

### LA-24 · mineur · Parcours

**Constat.** Dépendances non déclarées : P4 abeille dépend du butinage de P1; P6 dépend de P5 et d'un moteur de mouvement inexistant; P7 dépend de métriques absentes.

**Preuve.** inféré

**Recommandation.** Adopter le graphe de dépendances et le phasage en trois temps du rapport.

**Disposition.** Modifié — Le graphe de dépendances est complété (P5 → P6, P9 → P6, P1 → P8, harnais de P7 vers les volets LLM) et P7 dépend de la typologie et des métriques de S0. Adaptation : P4 se déclare indépendante de P1 (écart IC25, paramètres partagés sans dépendance de calendrier), et P9 ne déclare P6 que comme consommatrice « s'il les reprend ». — Traité dans : ../../02-architecture-programme.md (§2 Graphe des dépendances; §8 IC4 et IC25); ../../09-feuille-de-route.md (§2 Phases, lots et livrables, schéma des dépendances); ../../00-cadre.md (§5 Architecture du programme, Dépendances)

### LA-25 · mineur · P3 (Agentique)

**Constat.** L'affirmation « des agents identiques oscillent, la diversité stabilise » n'a pas d'appui agentique.

**Preuve.** https://doi.org/10.1073/pnas.2018340118 (lien inféré)

**Recommandation.** La poser comme hypothèse à tester; la monoculture algorithmique n'est qu'un ancrage partiel.

**Disposition.** Accepté — « Des agents identiques oscillent » est posée comme hypothèse sans acquis (H3.9, exploratoire en P3, test confirmatoire en P7 par H7.9), la monoculture algorithmique étant traitée comme ancrage indirect et les contre-preuves comme scénarios de réfutation. — Traité dans : ../../00-cadre.md (§2.4 point 13); ../../../projets/P3-division-du-travail.md (§3 H3.9); ../../../projets/P7-synthese-agentique.md (§3.2 H7.9)

### LA-26 · mineur · P1 (abeilles)

**Constat.** Règle individuelle de choix des sources et conflits entre information privée et danse absents.

**Preuve.** Grüter, Balbuena, Farina 2008, Proc R Soc B 275:1321–1327 ; https://doi.org/10.1016/j.tree.2008.12.007

**Recommandation.** La rattacher au projet A2.

**Disposition.** Modifié — La règle de choix entre information privée et danse est rattachée à P8 (T8.7 chez *Lasius niger*, E8.3 à poids privé/social adaptatifs, M10a). Adaptation : la variante abeille reste qualitative, Grüter et al. 2008 n'étant lu qu'en résumé. — Traité dans : ../../../projets/P8-individu-et-colonie.md (§5.1 T8.7; §6 E8.3; §7.1 ligne « Information privée contre sociale »)

## Ajouts recommandés

### LA-A01 · ajout

Socle 0 : glossaire (orchestration, chorégraphie, stigmergie, modulation), métriques communes (gain G, richesse R en bits, robustesse, coût), protocole agentique commun, moteur à canal et environnement paramétrables

**Disposition.** Modifié — S0 livre le glossaire (orchestration, chorégraphie, stigmergie, modulation globale), les métriques R et G, le noyau de simulation et l'interface de politique commune `decide(observation) → action`. Adaptation : le moteur unique à canal paramétrable devient trois couches où seul le canal du modèle commun est interchangeable, et le protocole agentique commun (harnais LLM) est hébergé par P7 en phase 3. — Traité dans : ../../00-cadre.md (§7 Architecture de simulation); ../../05-spec-simulation.md (§2.3 Le canal, seul composant interchangeable de la couche 3); ../../../projets/S0-socle.md (§1 lots A à I; §7 Parallèle agentique; §10 Livrables); ../../../projets/P7-synthese-agentique.md (§9 Plan de simulation)

### LA-A02 · ajout

A2 Individu et colonie : Sasaki et al. 2013 (fourmis) / Grüter et al. 2008 et Dong et al. 2023 (abeilles); agent fort seul contre collectif faible

**Disposition.** Modifié — P8 reprend Sasaki et al. 2013 (T8.1, T8.2) et le volet agent fort contre collectif faible (E8.5). Adaptation : Grüter et al. 2008 reste qualitatif (E8.3, résumé seul) et Dong et al. 2023 est une cible non chiffrée et bloquée (T8.15, modèle à créer). — Traité dans : ../../../projets/P8-individu-et-colonie.md (§5 T8.1, T8.2 et T8.15; §6 E8.3 et E8.5)

### LA-A03 · ajout

C2 Mouvement collectif, minorité informée : Gelblum et al. 2015 (transport coopératif) / Schultz et al. 2008 (streakers); absorbe le moulin de P6

**Disposition.** Accepté — P9 reprend Gelblum et al. 2015 (T9.10 à T9.13) et Schultz et al. 2008 (T9.17) et absorbe le moulin de P6 (T9.1, T9.2, T9.9, T9.33). — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.6; §4.7; §5.1 à §5.3)

### LA-A04 · ajout

C3 Construire sans plan (phase 3) : Reid et al. 2015 ou Khuong et al. 2016 / Peleg et al. 2018 ou Nazzi 2016

**Disposition.** Modifié — C3 n'est pas un projet distinct : la construction est le volet de phase 3 de P9 (Khuong et al. 2016 : T9.25; Johnson 2009 : T9.26; E9.3), tandis que Reid et al. 2015 et Peleg et al. 2018 sont reproduits dès la phase 2 (T9.20, T9.23); Nazzi 2016 n'est pas repris. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.8; §4.9; §5.4 et §5.5; §5.7 porte PR-5)

### LA-A05 · ajout

A1 (ex-P1) enrichi : types de recrutement et taille de colonie (Beckers 1989, Beekman 2001), rétroaction négative (Grüter 2012), bruit (Dussutour 2009), témoin Meliponini (Nieh 2004), indicateur de cascade

**Disposition.** Modifié — P1 intègre la rétroaction négative (T1.8, H1.3), le bruit (T1.9, H1.6), la taille et les types de recrutement (Beckers 1989 en §4.6; H1.5, E1.4), le témoin Meliponini (E1.6) et un taux de verrouillage (E1.1). Adaptation : Beekman et al. 2001 n'est pas reproduit en P1 (T6.6 de P6, bloquée) et l'indicateur de cascade n'est pas unifié. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§4.6; §5 T1.8 et T1.9; §6 E1.1, E1.3, E1.4 et E1.6)

### LA-A06 · ajout

B1 (ex-P3) : inhibition sociale chez l'abeille (Huang et Robinson 1992; Leoncini 2004) et réserve d'ouvrières (Charbonneau 2017)

**Disposition.** Modifié — P3 couvre l'inhibition sociale de l'abeille (Huang et Robinson 1992 : H3.6, E3.6, T3.10) et la réserve d'ouvrières (Charbonneau et al. 2017 : T3.7, E3.2). Adaptation : Leoncini et al. 2004 n'est pas repris (R14) et la réserve n'est modélisée que chez *Temnothorax*. — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.2 et H3.6; §5 T3.7 et T3.10; §6 E3.2 et E3.6)

### LA-A07 · ajout

B2 (ex-P4) : réseaux trophallactiques (Greenwald 2015) et signal vibratoire modulateur (Schneider et Lewis 2004)

**Disposition.** Modifié — Le seul signal modulateur couvert est la trémulation de l'abeille (T4.6, T4.7, H4.7, E4.8), avec le piping dans P5; ni les réseaux trophallactiques (Greenwald 2015) ni Schneider et Lewis 2004 ne figurent dans P4 ou ailleurs. — Traité dans : ../../../projets/P4-regulation-sans-vue-densemble.md (§3 H4.7; §4.6; §4.8; §5 T4.6 et T4.7); ../../../projets/P5-decision-par-quorum.md (§4.4)

### LA-A08 · ajout

C1 (ex-P5) : de la décision à l'action (piping, buzz-run), modèle de Pais 2013, stridulation des fourmis en parité

**Disposition.** Modifié — P5 couvre la chaîne décision → action (piping, échauffement, buzz-run : §4.4, E5.3, H5.6) et le modèle de Pais et al. 2013 (M2, T5.4 à T5.7). Adaptation : la stridulation des fourmis n'est pas modélisée en parité. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.3 M2; §4.4; §6 E5.3)

### LA-A09 · ajout

D1 (ex-P6) Défaillances et défenses : modularité du réseau comme pare-feu (Stroeymeyt 2018) contre la propagation d'injections

**Disposition.** Accepté — P6 teste la modularité du réseau comme pare-feu contre la propagation (H6.8, E6.7, T6.12, T6.13), avec Stroeymeyt et al. 2018 comme appui biologique [M] et un marqueur inerte en bac à sable pour l'injection, sous périmètre défensif. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§2 Positionnement, ligne Défenses collectives; §3 H6.8; §6 E6.7; §7.5 Volet sécurité : périmètre défensif)

### LA-A10 · ajout

E1 (ex-P7) : reproduire d'abord Jimenez-Romero et al. 2025; grille architecture × capacité × N × coût

**Disposition.** Modifié — P7 reproduit d'abord Jimenez-Romero et al. 2025 (T7.8). Adaptation : la grille est architecture × modèle × environnement × niveau de richesse; la taille N n'apparaît qu'en E7.8 exploratoire, le coût est une mesure (G_$, plafond en dollars) et la capacité un facteur catégoriel. — Traité dans : ../../../projets/P7-synthese-agentique.md (§1 Séquence imposée; §5 tableau A, T7.8; §6.1 Espace factoriel recompté; §6.3 E7.1 et E7.8)

### LA-A11 · ajout

Annexe (ex-P2) : allocation dynamique distribuée, AntNet contre l'algorithme abeille de Nakrani et Tovey 2004, ou retrait

**Disposition.** Accepté — P2 est une annexe soumise à go/no-go qui compare, sur un flux de requêtes commun, l'allocation par annonces (type Nakrani et Tovey 2004), l'allocation stigmergique (type AntNet) et l'allocation gloutonne centrale (T2.12, E2.4; porte G3 : textes à obtenir et lire). — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Portes go/no-go; §5 T2.12; §6 E2.4)

### LA-A12 · ajout

Ligne « Modulation globale » (phéromone royale, prompt système) et ligne « Mémoire » dans le tableau comparatif

**Disposition.** Accepté — Les lignes « Modulation globale » et « Mémoire » figurent au tableau comparatif révisé. — Traité dans : ../../06-metriques-et-typologie.md (§6.1 Modulation globale; §6.2 Mémoire)

### LA-A13 · ajout

Phasage : phase 1 (0, A1, A2, C1); phase 2 (B1, B2, C2, D1); phase 3 (E1, C3, annexe)

**Disposition.** Modifié — Phasage adopté (P3, P4, P6, P9 en phase 2; P7, construction de P9 et annexe P2 en phase 3) avec deux écarts : S0 et V0 forment une phase 0 distincte, et les volets LLM de P6 et de P9 passent en phase 3 parce qu'ils consomment le harnais de P7. — Traité dans : ../../00-cadre.md (§5 Architecture du programme); ../../09-feuille-de-route.md (§1 Vue d'ensemble; §2 Phases, lots et livrables); ../../02-architecture-programme.md (§1 Vue d'ensemble)


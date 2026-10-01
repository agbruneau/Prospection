# Constats — Lacunes et architecture

Source : [rapport complet](lacunes.md). 26 constats (3 critiques, 15 majeurs, 8 mineurs) et 13 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 couvre bien le noyau classique (piste contre danse, seuils, quorum), mais aucun projet ne traite l'intelligence individuelle, pourtant explicitement visée par l'intention. La question transversale (scalaire → symbole → langage) repose sur une dichotomie que les sources contredisent : les abeilles sans dard tracent des pistes, les fourmis font du tandem et stridulent, et la piste encode plus qu'un scalaire. Cette question n'a de plus aucune métrique opérationnelle, ce qui rend P7 infalsifiable. Six familles de concepts documentés manquent : mouvement collectif et transport, auto-assemblage et construction, trophallaxie, signaux vibratoires et modulateurs, effets de taille et types de recrutement, bruit et exploration. La parité est biaisée (une fourmi générique tirée de six genres contre la seule Apis mellifera, sans paramètre écologique) et l'agentique est confinée à P7, dont la prétention de nouveauté est contredite par des travaux de 2025. Je propose une architecture en cinq axes avec un socle de métriques communes, trois projets ajoutés (Individu et colonie, Minorité informée, Construire sans plan), P2 recentré sur l'allocation dynamique ou mis en annexe, et P6 recentré sur défaillances et défenses.

## Constats

### LA-01 · critique · Intention; tous projets

**Constat.** Aucun projet sur l'intelligence individuelle (navigation, apprentissage, mémoire privée) ni sur la relation individu → colonie, alors que l'intention vise les deux niveaux.

**Preuve.** https://www.pnas.org/doi/10.1073/pnas.1304917110 ; https://doi.org/10.1155/1989/94279 (résumé lu) ; https://doi.org/10.1242/jeb.143891 ; https://www.science.org/doi/10.1126/science.ade1702

**Recommandation.** Ajouter un projet A2 « Individu et colonie » : reproduire Sasaki et al. 2013 (la colonie ne bat l'individu que si la tâche est difficile) et, pour les abeilles, Grüter et al. 2008 / I'Anson Price et al. 2019. Volet agentique : un collectif faible contre un agent fort, selon la difficulté.

**Disposition.** _à renseigner_

### LA-02 · critique · Tableau (Canal, Contenu du signal); question transversale

**Constat.** L'axe « fourmi = scalaire persistant, abeille = symbole éphémère » confond taxon et canal : les Meliponini ont des pistes, les fourmis font du tandem et stridulent, la géométrie des pistes encode la polarité.

**Preuve.** https://www.apidologie.org/articles/apido/abs/2004/02/M4207/M4207.html ; https://www.nature.com/articles/439153a ; https://www.nature.com/articles/nature03105 ; https://link.springer.com/article/10.1007/BF01140810

**Recommandation.** Reformuler la question autour de propriétés mesurables du canal (persistance, localisation, bits, coût). Faire du canal une variable indépendante du moteur, avec des contre-factuels, et ajouter un encadré de contre-exemples.

**Disposition.** _à renseigner_

### LA-03 · critique · Question transversale; P7

**Constat.** « Gain collectif » et « richesse du signal » ne sont pas définis : P7 n'a pas de variable dépendante falsifiable.

**Preuve.** https://www.frontiersin.org/articles/10.3389/fevo.2015.00022/full (lu) ; https://doi.org/10.1007/BF02222949

**Recommandation.** Définir dans un socle commun G (collectif / meilleur individu isolé, et / N individus indépendants), R (information mutuelle en bits, cf. 2,9 + 4,5 bits pour la danse), la robustesse et le coût.

**Disposition.** _à renseigner_

### LA-04 · majeur · Lignes « Agentique » de P1 à P6; Technique

**Constat.** Agentique réduite à des analogies, sans état de l'art (définition orchestration/chorégraphie, stigmergie, échecs des systèmes multi-agents LLM, conformité, loi d'échelle).

**Preuve.** https://doi.org/10.1109/MC.2003.1236471 ; https://doi.org/10.1016/j.cogsys.2015.12.002 ; https://doi.org/10.52202/085713-4082 ; arXiv:2406.07155 ; arXiv:2410.12428

**Recommandation.** Donner à chaque projet un volet expérimental agentique avec les métriques communes. Ajouter un glossaire ancré sur Peltz 2003, Heylighen 2016 et Malone et Crowston 1994.

**Disposition.** _à renseigner_

### LA-05 · majeur · P7

**Constat.** « Seul projet sans résultat publié » est faux : des LLM pilotent déjà des simulations de fourragement de fourmis (NetLogo), et le Boids LLM coûte environ 300 fois plus de temps de calcul.

**Preuve.** https://arxiv.org/abs/2503.03800 ; https://arxiv.org/abs/2506.14496

**Recommandation.** Reproduire d'abord Jimenez-Romero et al. 2025, puis l'étendre. Ajouter les axes coût et taille du collectif. Décrire la capacité des modèles par une mesure plutôt que par un nom de produit.

**Disposition.** _à renseigner_

### LA-06 · majeur · Tableau (Freinage : « absence de retours »); P1

**Constat.** Rétroaction négative chez les fourmis ignorée : l'encombrement aux sources permet à Lasius niger de se réallouer malgré la piste, et le bruit aide en environnement changeant.

**Preuve.** https://doi.org/10.1371/journal.pone.0044501 (résumé lu) ; https://research.monash.edu/en/publications/noise-improves-collective-decision-making-by-ants-in-dynamic-envi/

**Recommandation.** Dans P1, reproduire chez les fourmis le verrouillage ET la réallocation (Grüter et al. 2012); corriger le tableau.

**Disposition.** _à renseigner_

### LA-07 · majeur · P1; P7

**Constat.** Types de recrutement (individuel, tandem, groupe, masse, piste-tronc, légionnaire) et effets de taille absents, alors que la transition de phase et les seuils de taille sont documentés chez les deux taxons.

**Preuve.** https://doi.org/10.1155/1989/94279 ; https://www.pnas.org/doi/10.1073/pnas.161285298 ; https://doi.org/10.1007/s00114-014-1215-x (résumé lu) ; https://doi.org/10.1093/beheco/arp070

**Recommandation.** Faire de N un curseur de P1 (reproduire Beekman et al. 2001) et un axe de P7.

**Disposition.** _à renseigner_

### LA-08 · majeur · P1; P2

**Constat.** Bruit bénéfique et exploration/exploitation absents (erreur stratégique chez les fourmis, imprécision de la danse, éclaireuses).

**Preuve.** https://link.springer.com/article/10.1007/s002650050609 ; https://doi.org/10.1007/s10905-010-9204-1 ; https://doi.org/10.1007/BF00290778 ; https://doi.org/10.1126/science.1213962

**Recommandation.** Ajouter un curseur « bruit » à P1 et reproduire Dussutour et al. 2009. Présenter l'hypothèse de l'erreur ajustée comme débattue (Tanner et Visscher 2010). Analogue agentique : la température d'échantillonnage.

**Disposition.** _à renseigner_

### LA-09 · majeur · P1; P5; P7

**Constat.** Cascades d'information et conformité non nommées, alors que le verrouillage de P1 en est une et que les LLM se conforment à la majorité.

**Preuve.** https://doi.org/10.1098/rstb.2010.0325 ; arXiv:2410.12428 ; https://www.pnas.org/doi/10.1073/pnas.1304917110

**Recommandation.** Ajouter un indicateur de cascade commun et une expérience agentique de conformité.

**Disposition.** _à renseigner_

### LA-10 · majeur · Nouveau projet

**Constat.** Mouvement collectif et transport coopératif absents : la minorité informée qui guide sans chef (Paratrechina; essaim où moins de 5 % des abeilles connaissent le site) est le cas pur de chorégraphie.

**Preuve.** https://www.nature.com/articles/ncomms8729 ; https://doi.org/10.1242/jeb.018994 (résumé lu) ; https://doi.org/10.1038/nature03236 ; https://doi.org/10.1038/s41567-018-0107-y

**Recommandation.** Projet C2 « Minorité informée » : reproduire Gelblum et al. 2015 et Schultz et al. 2008, et y rapatrier le moulin de P6.

**Disposition.** _à renseigner_

### LA-11 · majeur · Nouveau projet (phase 3)

**Constat.** Auto-assemblage et construction stigmergique absents (radeaux, ponts vivants, nid de Lasius; grappe d'essaim, rayons).

**Preuve.** https://researchers.mq.edu.au/en/publications/army-ants-dynamically-adjust-living-bridges-in-response-to-a-cost/ ; https://pubmed.ncbi.nlm.nih.gov/26787857/ ; https://www.nature.com/articles/s41567-018-0262-1 ; https://doi.org/10.1038/srep28341

**Recommandation.** Projet C3 « Construire sans plan » : reproduire Reid et al. 2015 (compromis coût-bénéfice) et Peleg et al. 2018 (auteur Peleg, 2018). Analogie : coordination par artefacts partagés.

**Disposition.** _à renseigner_

### LA-12 · majeur · P4

**Constat.** Trophallaxie absente chez les deux espèces; chez l'abeille, elle n'est qu'implicite dans le déchargement du nectar.

**Preuve.** https://elifesciences.org/articles/20375 ; https://doi.org/10.1038/srep12496 ; https://doi.org/10.1038/s41598-019-52019-6

**Recommandation.** Ajouter à P4 un module « réseau trophallactique » pour les deux espèces (analogue : protocoles de rumeur). La source abeille reste à vérifier.

**Disposition.** _à renseigner_

### LA-13 · majeur · P5; P4

**Constat.** Signaux vibratoires et modulateurs (shaking, piping, buzz-run) et passage de la décision à l'action absents; la stridulation des fourmis aussi.

**Preuve.** Seeley et Tautz 2001, J Comp Physiol A 187:667–676 ; Rittschof et Seeley 2008, Anim Behav 75:189–197 ; Schneider et Lewis 2004, Apidologie 35:117–131 ; https://doi.org/10.1007/s00265-022-03218-1

**Recommandation.** Étendre P5 à « quorum → préparation → départ », avec l'analogie de la validation en deux phases.

**Disposition.** _à renseigner_

### LA-14 · majeur · Thèse; Tableau

**Constat.** « La reine ne commande pas » ignore un troisième mode, la modulation chimique globale (phéromone royale, phéromone d'amorçage des ouvrières), qui n'est ni orchestration ni chorégraphie pair à pair.

**Preuve.** https://doi.org/10.1038/332354a0 ; https://doi.org/10.1073/pnas.0407652101

**Recommandation.** Ajouter une ligne « Modulation globale » au tableau et au glossaire (analogue : prompt système ou configuration diffusée).

**Disposition.** _à renseigner_

### LA-15 · majeur · P3 (abeilles)

**Constat.** Division du travail de l'abeille réduite au polyéthisme d'âge, sans inhibition sociale (oléate d'éthyle) ni réserve d'ouvrières inactives.

**Preuve.** https://doi.org/10.1073/pnas.89.24.11726 ; https://doi.org/10.1007/s00265-009-0874-7 ; https://doi.org/10.1371/journal.pone.0184074

**Recommandation.** Ajouter l'inhibition sociale (analogue de Gordon) et une expérience « réserve ».

**Disposition.** _à renseigner_

### LA-16 · majeur · Ensemble; Technique

**Constat.** Parité biaisée : six genres de fourmis contre une seule espèce d'abeille, et aucun paramètre écologique, alors que la valeur de la danse et les stratégies des fourmis dépendent de l'environnement.

**Preuve.** https://doi.org/10.1146/annurev-ento-011118-111923 ; https://doi.org/10.1007/s00265-003-0726-9 ; https://www.science.org/doi/10.1126/sciadv.aat0450 ; https://doi.org/10.3389/fevo.2015.00011

**Recommandation.** Nommer l'espèce modèle par volet; paramétrer l'environnement (dispersion, distance, volatilité, 2D/3D); ajouter un tiers témoin (Meliponini).

**Disposition.** _à renseigner_

### LA-17 · majeur · P2

**Constat.** ACO sur un TSP et ABC sur des fonctions continues ne sont pas comparables, et l'optimisation statique s'éloigne de la chorégraphie.

**Preuve.** https://doi.org/10.1613/jair.530 ; https://doi.org/10.1177/105971230401200308 (résumé lu)

**Recommandation.** Recentrer sur l'allocation dynamique distribuée avec le même flux de requêtes (AntNet contre Nakrani et Tovey, où l'algorithme abeille bat le glouton seulement quand la charge est très variable), ou reléguer en annexe.

**Disposition.** _à renseigner_

### LA-18 · majeur · P6

**Constat.** Trois moteurs hétérogènes (mouvement, reconnaissance chimique, décision) et aucun volet défense, alors que P6 vise l'injection de prompt.

**Preuve.** https://doi.org/10.1126/science.aat4793 ; https://doi.org/10.1098/rsif.2015.1022

**Recommandation.** « Défaillances et défenses » : garder l'interblocage et le mimétisme, ajouter la modularité du réseau comme pare-feu, céder le moulin à C2.

**Disposition.** _à renseigner_

### LA-19 · mineur · Tableau (Oubli)

**Constat.** Mémoire collective non thématisée, alors que l'article cité pour la phase tore s'intitule « Collective Memory and Spatial Sorting ».

**Preuve.** https://doi.org/10.1006/jtbi.2002.3065 ; https://doi.org/10.1146/annurev-ento-010814-020627

**Recommandation.** Remplacer la ligne « Oubli » par « Mémoire » (externe, individuelle, hystérésis du groupe).

**Disposition.** _à renseigner_

### LA-20 · mineur · P5

**Constat.** Décision d'essaimer (reproduction de la colonie) absente.

**Preuve.** https://link.springer.com/article/10.1007/s13592-013-0253-2 ; https://doi.org/10.1007/s00114-014-1215-x

**Recommandation.** La mentionner en prologue de P5 ou la déclarer hors périmètre.

**Disposition.** _à renseigner_

### LA-21 · mineur · Thèse

**Constat.** Superorganisme et cognition distribuée non cadrés.

**Preuve.** https://doi.org/10.1002/jmor.1050220206 ; https://doi.org/10.1098/rsif.2008.0511 ; https://doi.org/10.1146/annurev-ento-020117-043249

**Recommandation.** Ajouter un chapitre théorique au socle (Wheeler 1911, Hölldobler et Wilson 2009, Marshall et al. 2009, Sasaki et Pratt 2018).

**Disposition.** _à renseigner_

### LA-22 · mineur · P5

**Constat.** Aucun modèle cité pour « l'inhibition croisée débloque une égalité ».

**Preuve.** https://doi.org/10.1371/journal.pone.0073216

**Recommandation.** Implémenter Pais et al. 2013 (décision sensible à la valeur) comme cible.

**Disposition.** _à renseigner_

### LA-23 · mineur · Tableau (Recrutement)

**Constat.** « Délégation » renvoie à un délégant, donc à l'orchestration; le recrutement est une annonce que le receveur choisit de suivre.

**Preuve.** inféré, avec la définition de Peltz 2003 : https://doi.org/10.1109/MC.2003.1236471

**Recommandation.** Remplacer par « annonce et abonnement (pull) ».

**Disposition.** _à renseigner_

### LA-24 · mineur · Parcours

**Constat.** Dépendances non déclarées : P4 abeille dépend du butinage de P1; P6 dépend de P5 et d'un moteur de mouvement inexistant; P7 dépend de métriques absentes.

**Preuve.** inféré

**Recommandation.** Adopter le graphe de dépendances et le phasage en trois temps du rapport.

**Disposition.** _à renseigner_

### LA-25 · mineur · P3 (Agentique)

**Constat.** L'affirmation « des agents identiques oscillent, la diversité stabilise » n'a pas d'appui agentique.

**Preuve.** https://doi.org/10.1073/pnas.2018340118 (lien inféré)

**Recommandation.** La poser comme hypothèse à tester; la monoculture algorithmique n'est qu'un ancrage partiel.

**Disposition.** _à renseigner_

### LA-26 · mineur · P1 (abeilles)

**Constat.** Règle individuelle de choix des sources et conflits entre information privée et danse absents.

**Preuve.** Grüter, Balbuena, Farina 2008, Proc R Soc B 275:1321–1327 ; https://doi.org/10.1016/j.tree.2008.12.007

**Recommandation.** La rattacher au projet A2.

**Disposition.** _à renseigner_

## Ajouts recommandés

### LA-A01 · ajout

Socle 0 : glossaire (orchestration, chorégraphie, stigmergie, modulation), métriques communes (gain G, richesse R en bits, robustesse, coût), protocole agentique commun, moteur à canal et environnement paramétrables

**Disposition.** _à renseigner_

### LA-A02 · ajout

A2 Individu et colonie : Sasaki et al. 2013 (fourmis) / Grüter et al. 2008 et Dong et al. 2023 (abeilles); agent fort seul contre collectif faible

**Disposition.** _à renseigner_

### LA-A03 · ajout

C2 Mouvement collectif, minorité informée : Gelblum et al. 2015 (transport coopératif) / Schultz et al. 2008 (streakers); absorbe le moulin de P6

**Disposition.** _à renseigner_

### LA-A04 · ajout

C3 Construire sans plan (phase 3) : Reid et al. 2015 ou Khuong et al. 2016 / Peleg et al. 2018 ou Nazzi 2016

**Disposition.** _à renseigner_

### LA-A05 · ajout

A1 (ex-P1) enrichi : types de recrutement et taille de colonie (Beckers 1989, Beekman 2001), rétroaction négative (Grüter 2012), bruit (Dussutour 2009), témoin Meliponini (Nieh 2004), indicateur de cascade

**Disposition.** _à renseigner_

### LA-A06 · ajout

B1 (ex-P3) : inhibition sociale chez l'abeille (Huang et Robinson 1992; Leoncini 2004) et réserve d'ouvrières (Charbonneau 2017)

**Disposition.** _à renseigner_

### LA-A07 · ajout

B2 (ex-P4) : réseaux trophallactiques (Greenwald 2015) et signal vibratoire modulateur (Schneider et Lewis 2004)

**Disposition.** _à renseigner_

### LA-A08 · ajout

C1 (ex-P5) : de la décision à l'action (piping, buzz-run), modèle de Pais 2013, stridulation des fourmis en parité

**Disposition.** _à renseigner_

### LA-A09 · ajout

D1 (ex-P6) Défaillances et défenses : modularité du réseau comme pare-feu (Stroeymeyt 2018) contre la propagation d'injections

**Disposition.** _à renseigner_

### LA-A10 · ajout

E1 (ex-P7) : reproduire d'abord Jimenez-Romero et al. 2025; grille architecture × capacité × N × coût

**Disposition.** _à renseigner_

### LA-A11 · ajout

Annexe (ex-P2) : allocation dynamique distribuée, AntNet contre l'algorithme abeille de Nakrani et Tovey 2004, ou retrait

**Disposition.** _à renseigner_

### LA-A12 · ajout

Ligne « Modulation globale » (phéromone royale, prompt système) et ligne « Mémoire » dans le tableau comparatif

**Disposition.** _à renseigner_

### LA-A13 · ajout

Phasage : phase 1 (0, A1, A2, C1); phase 2 (B1, B2, C2, D1); phase 3 (E1, C3, annexe)

**Disposition.** _à renseigner_


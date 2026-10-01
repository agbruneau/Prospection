# Constats — Biologie des abeilles

Source : [rapport complet](bio-abeilles.md). 23 constats (1 critiques, 13 majeurs, 9 mineurs) et 12 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** Le volet abeilles de v3 est juste dans ses grandes lignes, et toutes les références existent avec les bons auteurs et la bonne année. Quatre affirmations sont toutefois fausses ou mal attribuées : l'« attrition des danses » présentée comme mécanisme général d'oubli, l'« essaim scindé sans signaux d'arrêt », le « rapprochement non publié » de la file d'attente et le « seul projet sans résultat publié » du projet 7. La question transversale (richesse du signal → gain collectif) ignore une littérature apicole publiée qui y répond déjà, et la réponse dépend de l'habitat (Sherman & Visscher 2002; Donaldson-Matasci & Dornhaus 2012; Beekman & Lew 2008). La parité « au même titre » est inégale : les projets 2 et 3 sont nettement déséquilibrés, et le projet 1 utilise des protocoles différents selon l'espèce. Il manque des mécanismes apicoles majeurs : piping et buzz-run, inhibition sociale par l'éthyl oléate, effondrement par maturation précoce, cognition individuelle. Le quota WebSearch et le quota Consensus se sont épuisés en cours d'audit. Quelques contenus ne sont vérifiés qu'au niveau des métadonnées (Gardner 2008, Dornhaus & Chittka 2004, Ellis 2002, Beckers 1990), et le rapport les signale comme tels.

## Constats

### BA-01 · critique · Question transversale + Projet 7 (« seul projet sans résultat publié »)

**Constat.** Des études publiées testent déjà la valeur de l'information de la danse. Résultat : le gain dépend de l'environnement, et une précision accrue peut nuire à l'exploration. Sherman & Visscher 2002 : danses désorientées moins efficaces vers des nourrisseurs; sur sources naturelles, effet tantôt positif, tantôt nul. Donaldson-Matasci & Dornhaus 2012 : bénéfice dans les habitats riches à grandes parcelles. Beekman & Lew 2008 : bénéfice quand les sources sont rares ou lointaines. Okada et al. 2014 : une erreur d'environ 15° aide quand les sources sont rares. Grüter & Farina 2009 : l'information de localisation sert souvent de secours. L'hypothèse implicite « plus riche = meilleur » est donc démentie chez l'abeille, et le projet 7 a bel et bien un résultat publié à reproduire.

**Preuve.** Lu dans les résumés : Europe PMC (Sherman & Visscher 2002, Nature 419:920-922; Donaldson-Matasci & Dornhaus 2012, BES 66:583-592; Grüter & Farina 2009, TREE 24:242-247); OpenAlex (Beekman & Lew, doi 10.1093/beheco/arm117; Okada 2014, doi 10.1038/srep04175). Conclusion sur la portée pour v3 : inférée.

**Recommandation.** Reformuler la question : « dans quels environnements la richesse du signal paie-t-elle, et quand nuit-elle à l'exploration ? » Reproduire Sherman & Visscher 2002 (danses orientées vs désorientées) et le modèle de Beekman & Lew. Faire varier l'habitat (sources uniformes vs rares et riches). Transposer ce plan factoriel aux agents LLM.

**Disposition.** _à renseigner_

### BA-02 · majeur · Tableau, ligne « Oubli » (Attrition des danses / TTL vs expiration des messages)

**Constat.** L'attrition est le bon concept, mais seulement pour la recherche de nid. Seeley 2003 mesure −15,7 circuits par retour, Seeley & Visscher 2008 −17,2, et l'origine est interne à l'émetteur. Selon un résumé secondaire de Seeley 2003, les danses de butinage ne déclinent pas au fil des visites; l'oubli y passe par l'abandon probabiliste et la modulation des circuits selon la rentabilité. Enfin, la danse n'a aucune persistance : ce qui décroît, c'est l'engagement de l'émetteur, pas le message. La correspondance avec un TTL ou l'expiration des messages est donc fausse.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral (https://bees.ucr.edu/sites/default/files/2020-06/bes54.pdf, « steady attritional process »). Résumé : Seeley & Visscher 2008 (https://journals.biologists.com/jeb/article/211/23/3691/17956). Spécificité au contexte du nid : lue dans un résumé secondaire de Seeley 2003, non confirmée dans le texte intégral.

**Recommandation.** Scinder la ligne. Fourmi : évaporation (côté canal). Abeille, butinage : abandon de la source + modulation des danses. Abeille, essaim : attrition (engagement de l'émetteur). Agentique : TTL côté canal vs décroissance de l'engagement de l'agent.

**Disposition.** _à renseigner_

### BA-03 · majeur · Projet 6 et tableau (« indécision et essaim scindé sans signaux d'arrêt »; « interblocage quand on supprime l'inhibition croisée »)

**Constat.** Deux phénomènes sont confondus. Les scissions en vol sont réelles mais rares : 2 essaims sur 19 chez Lindauer 1955, plus un essaim chez Seeley & Visscher 2003. Elles sont attribuées à un décollage déclenché par quorum alors que les danseuses restaient divisées, et non à l'absence de signaux d'arrêt. L'interblocage sans inhibition croisée est, lui, un résultat de modèle analytique (Seeley et al. 2012). Selon Pais et al. 2013, cet interblocage est adaptatif quand les deux options sont médiocres. Je n'ai trouvé aucune expérience de suppression des signaux d'arrêt dans un essaim réel.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral, p. 518-519. Résumés : Seeley et al. 2012 (https://research-information.bris.ac.uk/en/publications/stop-signals-provide-cross-inhibition-in-collective-decision-maki); Pais et al. 2013 (https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0073216).

**Recommandation.** Reformuler en deux modes. Interblocage : prédit par modèle, adaptatif si les options sont médiocres. Scission : observée quand un quorum est atteint sans consensus. Simuler les deux séparément en faisant varier δ (inhibition croisée) et le seuil de quorum. Rattacher le veto agentique à l'inhibition croisée seulement.

**Disposition.** _à renseigner_

### BA-04 · majeur · Projet 4 (« loi de Little; rapprochement non publié, de l'auteur »)

**Constat.** La lecture du déchargement du nectar comme une file d'attente est déjà publiée : Seeley & Tovey 1994, Anderson & Ratnieks 1999 (BES 46:73-81), Ratnieks & Anderson 1999 (Am Nat, « Use of queueing delay information in recruitment »). De plus, le temps de recherche de l'abeille est un temps d'appariement dans une file à deux côtés, pas directement le W de la loi de Little.

**Preuve.** Résumé : OpenAlex, Ratnieks & Anderson 1999 (doi 10.1086/303256). Métadonnées : Crossref, Anderson & Ratnieks 1999 (doi 10.1007/s002650050595). Lu : Seeley et al. 1996, PDF intégral (https://kops.uni-konstanz.de/server/api/core/bitstreams/b639f436-eab0-4b3c-869d-c50dea0f2f6a/content).

**Recommandation.** Citer ces trois travaux et restreindre l'originalité revendiquée à la comparaison fourmi/abeille. Modéliser une file d'appariement butineuses-receveuses. Paramètres vérifiés : trémulation au-delà d'environ 40 s de recherche; receveuses de 17 % à 30-50 % de la colonie en moins de 9 h.

**Disposition.** _à renseigner_

### BA-05 · majeur · Projet 3 (« une ruche homogène oscille »; Jones et al. 2004)

**Constat.** Le résumé de Jones et al. 2004 dit « tend to be more stable », pas « oscille ». La diversité en cause est génétique (patrilignes, colonies d'un seul mâle vs de plusieurs) et porte sur les seuils de ventilation. Simone-Finstrom et al. 2014 concluent que la diversité génétique attendue en conditions normales n'est pas prédictive de la stabilité thermique.

**Preuve.** Résumés : Europe PMC, Jones 2004 (https://pubmed.ncbi.nlm.nih.gov/15218093/); Simone-Finstrom 2014 (doi 10.1007/s10905-014-9447-3); Mattila & Seeley 2007, Science 317:362-364.

**Recommandation.** Écrire « moins stable » et préciser « diversité génétique des seuils ». Reproduire le modèle de Graham et al. 2006 (Insectes Soc 53:226-232). Mentionner la réplication partielle négative. Ajouter Mattila & Seeley 2007 comme appui sur la diversité génétique.

**Disposition.** _à renseigner_

### BA-06 · majeur · Projet 3 – parité (retrait de caste chez Pheidole sans équivalent apicole)

**Constat.** La fourmi a trois résultats reproductibles, l'abeille un seul. L'expérience de perturbation apicole existe pourtant : après retrait des butineuses, des ouvrières deviennent butineuses précoces, jusqu'à 2 semaines plus tôt (Huang & Robinson 1992). Le mécanisme est une inhibition sociale par l'éthyl oléate transmis par trophallaxie (Leoncini et al. 2004). Le polyéthisme d'âge est d'ailleurs plastique (Seeley & Kolmes 1991, « illusion or reality? »).

**Preuve.** Résumés : Europe PMC, Huang & Robinson 1992 (PNAS 89:11726-11729); Leoncini et al. 2004 (PNAS 101:17559-17564). Seeley & Kolmes 1991 : seules les métadonnées sont vérifiées, via la bibliographie de Seeley et al. 1996.

**Recommandation.** Ajouter « retrait des butineuses → maturation précoce » comme pendant du retrait de caste chez Pheidole, et modéliser l'inhibition sociale par contact. Pendant agentique : pool d'agents de réserve et promotion réglée par la densité des agents seniors (inféré).

**Disposition.** _à renseigner_

### BA-07 · majeur · Projet 5 (quorum chez l'abeille)

**Constat.** La transition de la décision à l'action manque, alors qu'elle est le pendant exact du passage tandem → transport chez Temnothorax. Le quorum (10-15 éclaireuses ou plus au site) déclenche le worker piping, puis l'échauffement à 35 °C ou plus, les buzz-runs et le décollage. Le consensus des danseuses n'est ni nécessaire ni suffisant, et la météo peut interrompre le piping. Seeley & Visscher 2003, source première du seuil, n'est pas cité.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral. Métadonnées Crossref : Seeley & Tautz 2001 (doi 10.1007/s00359-001-0243-0); Rittschof & Seeley 2008 (doi 10.1016/j.anbehav.2007.04.026).

**Recommandation.** Modéliser une chaîne symétrique pour les deux espèces : quorum → changement de mode. Citer Seeley & Visscher 2003, Seeley & Tautz 2001 et Rittschof & Seeley 2008. Pendant agentique : engagement en deux phases avec annulation possible. Signaler que la décision a été prise avec la reine en cage, ce qui appuie la thèse.

**Disposition.** _à renseigner_

### BA-08 · majeur · Projet 2 (ACO contre ABC)

**Constat.** Dans ABC, la danse se réduit à une roulette proportionnelle à la qualité : aucune direction ni distance. Le rapport TR06 donne pour Rastrigin un intervalle anormal ([−600, 600]). Comparer ACO sur Oliver30 (combinatoire) à ABC sur Rastrigin (continu) ne permet de rien attribuer au mécanisme. Aucun résultat biologique n'est reproduit, ce qui déroge au critère de rigueur de v3.

**Preuve.** Lu : Karaboga 2005 TR06, PDF intégral (https://abc.erciyes.edu.tr/pub/tr06_2005.pdf). Métadonnées : Karaboga & Basturk 2007 (doi 10.1007/s10898-007-9149-x). Résumé : Nakrani & Tovey 2004 (doi 10.1177/105971230401200308).

**Recommandation.** Reproduire Karaboga & Basturk 2007 plutôt que TR06. Faire tourner les deux familles sur un même problème. Ajouter le Honey Bee Algorithm de Nakrani & Tovey 2004 (allocation dynamique de serveurs), plus fidèle à la biologie et pont direct vers l'agentique.

**Disposition.** _à renseigner_

### BA-09 · majeur · Tableau, lignes « Canal » et « Contenu du signal » (et « Freinage » côté fourmi)

**Constat.** La dichotomie « fourmi = chimie / abeille = danse » est trop nette. Les danseuses émettent des hydrocarbures qui augmentent les sorties (Thom et al. 2007), la danse porte l'odeur florale, la communication phéromonale de l'abeille est riche (Slessor et al. 2005), et le contenu inclut la qualité de la source (nombre de circuits). Côté fourmi, « absence de retours » oublie le signal négatif actif décrit par Robinson et al. 2005 (phéromone « no entry »).

**Preuve.** Résumés : Europe PMC, Thom et al. 2007 (PLoS Biol 5:e228); Slessor, Winston & Le Conte 2005 (J Chem Ecol 31:2731-2745); Robinson et al. 2005 (Nature 438:442); Grüter & Farina 2009.

**Recommandation.** Présenter la danse comme un signal multicomposante : vecteur, qualité, odeur, éveil. Signaler à l'audit fourmis l'existence de signaux négatifs actifs chez la fourmi.

**Disposition.** _à renseigner_

### BA-10 · majeur · Tableau, ligne « Freinage » (danse de trémulation, signal d'arrêt)

**Constat.** Trois motifs distincts sont confondus. (1) Trémulation : recrute des receveuses et inhibe les danses frétillantes (Kirchner 1993; Nieh 1993). (2) Signal d'arrêt au butinage : déclenché par le danger et dirigé vers les abeilles de la même source (Nieh 2010; ×43 après attaque). (3) Signal d'arrêt à l'essaim : inhibition croisée dirigée vers les danseuses des autres sites (Seeley et al. 2012).

**Preuve.** Résumé : Europe PMC, Nieh 2010 (Curr Biol 20:310-315). Lu : Seeley et al. 1996, PDF intégral, p. 425. Résumé : Seeley et al. 2012.

**Recommandation.** Faire trois entrées : rééquilibrage + inhibition (trémulation); disjoncteur par source (butinage); veto entre coalitions (essaim). Chacune a son pendant agentique (inféré).

**Disposition.** _à renseigner_

### BA-11 · majeur · Portée générale (« intelligence individuelle » de l'abeille)

**Constat.** La cognition individuelle de l'abeille est absente alors que l'intention du chercheur l'inclut : mémoire spatiale de type carte (Menzel et al. 2005), concepts de pareil/différent (Giurfa et al. 2001), odomètre visuel par flux optique (Esch et al. 2001), confirmation par radar du suivi du vecteur de danse (Riley et al. 2005). Or seuls 12-25 % des suivis de danse mènent à une source nouvelle (Biesmeijer & Seeley 2005), ce qui pèse directement sur l'axe capacité des agents × architecture.

**Preuve.** Résumés : Europe PMC (Menzel 2005, PNAS 102:3040-3045; Giurfa 2001, Nature 410:930-933; Esch 2001, Nature 411:581-583; Riley 2005, Nature 435:205-207). Biesmeijer & Seeley 2005 : chiffre lu dans Hasenjager et al. 2022 (https://link.springer.com/article/10.1007/s00265-022-03218-1).

**Recommandation.** Ajouter un axe « capacité individuelle × architecture » pour les deux espèces, ou l'intégrer au projet 7. Dans le moteur : odomètre bruité et dispersion angulaire de la danse (Tanner & Visscher 2010).

**Disposition.** _à renseigner_

### BA-12 · majeur · Tableau, ligne « Recrutement → Délégation »

**Constat.** La danse est une annonce que les recrues choisissent de suivre (mode « pull »); chaque butineuse évalue sa source sans rien comparer. La « délégation » suppose un délégant qui assigne, ce qui relève de l'orchestration et va à l'encontre de l'angle chorégraphique.

**Preuve.** Résumé : Seeley et al. 1991 (aucune comparaison entre sources). Le reste est inféré.

**Recommandation.** Remplacer par « annonce / pull (tableau d'offres) », métaphore employée par Nakrani & Tovey 2004. Garder « délégation » comme contre-exemple d'orchestration.

**Disposition.** _à renseigner_

### BA-13 · majeur · Projet 6 (Acherontia ↔ prompt injection; pathologies apicoles)

**Constat.** Acherontia contourne la reconnaissance des nids-mates par camouflage chimique : c'est une usurpation d'identité, pas une injection de faux signaux dans le canal de coordination. Des pathologies apicoles plus parlantes manquent : l'effondrement par maturation précoce (Khoury et al. 2011; Perry et al. 2015), le parasite social clonal A. m. capensis (Oldroyd 2002) et le mimétisme comportemental d'Aethina tumida (Ellis et al. 2002).

**Preuve.** Lu dans un résumé secondaire de la notice Springer (Moritz 1991, https://link.springer.com/article/10.1007/BF01136209). Résumés : Europe PMC, Khoury 2011 (PLoS ONE 6:e18491) et Perry 2015 (PNAS 112:3427-3432). Métadonnées seulement : Oldroyd 2002 (doi 10.1016/S0169-5347(02)02479-5) et Ellis 2002 (doi 10.1007/s00114-002-0326-y); le contenu d'Ellis vient de ma mémoire.

**Recommandation.** Classer les pathologies par couche (identité, canal, dynamique). Associer Acherontia et Phengaris à l'usurpation d'identité. Ajouter Perry et al. 2015 comme résultat empirique reproductible : promotion prématurée d'agents sous charge, puis cascade.

**Disposition.** _à renseigner_

### BA-14 · majeur · Projet 1 – parité (À reproduire)

**Constat.** Les expériences diffèrent selon l'espèce : verrouillage sur la branche longue pour la fourmi, réallocation après inversion de qualité pour l'abeille. Le pont double n'a pas de sens pour une abeille, qui vole droit vers la source. On ne peut donc pas comparer.

**Preuve.** Résumé : Seeley et al. 1991. Beckers et al. 1990 : référence lue dans la bibliographie de Seeley & Visscher 2003, contenu de mémoire.

**Recommandation.** Adopter un protocole commun : deux sources, inversion de qualité à t, pour les deux espèces. Opposer Beckers et al. 1990 (fourmi, à vérifier) à Seeley et al. 1991 (abeille). Garder le pont double comme expérience propre à la fourmi, en le disant.

**Disposition.** _à renseigner_

### BA-15 · mineur · Projet 3 (polyéthisme : nourrice → bâtisseuse → butineuse; Seeley 1982)

**Constat.** Seeley 1982 porte sur la valeur adaptative du calendrier (groupes de tâches réunies dans l'espace; nettoyage des cellules de 0 à 2 jours), pas sur la séquence. La séquence de v3 omet le nettoyage, le stockage et la garde.

**Preuve.** Résumé : https://link.springer.com/article/10.1007/BF00299306

**Recommandation.** Citer une synthèse pour la séquence (Seeley 1995) et Seeley 1982 pour sa logique spatiale. Indiquer que la séquence est plastique.

**Disposition.** _à renseigner_

### BA-16 · mineur · Projet 5 (Seeley et Visscher 2004)

**Constat.** La référence est ambiguë : deux articles en 2004 (BES 56:594-601 et Apidologie 35:101-116).

**Preuve.** Résumé et métadonnées : Springer (s00265-004-0814-5); OpenAlex (doi 10.1051/apido:2004004).

**Recommandation.** Préciser lequel est visé et ajouter Seeley & Visscher 2003 (BES 54:511-520).

**Disposition.** _à renseigner_

### BA-17 · mineur · Projet 1 / tableau (von Frisch, encodage)

**Constat.** von Frisch est cité sans date ni détail de l'encodage, et l'odomètre visuel n'est pas mentionné.

**Preuve.** Lu dans Hasenjager et al. 2022 (qui cite von Frisch 1967). Métadonnées OpenAlex : doi 10.4159/harvard.9780674418776.

**Recommandation.** Citer von Frisch 1967 (Harvard UP). Préciser : angle par rapport à la gravité ↔ direction par rapport au soleil; durée de la course ↔ distance; distance mesurée par flux optique (Esch et al. 2001).

**Disposition.** _à renseigner_

### BA-18 · mineur · Tableau, « Direction et distance (symbolique) »

**Constat.** « Symbolique » se défend (Sherman & Visscher 2002; Donaldson-Matasci & Dornhaus 2012), mais l'encodage est continu et analogique. La danse en rond n'est probablement pas une danse distincte (Gardner et al. 2008), point que je n'ai pas pu vérifier.

**Preuve.** Résumés : Europe PMC. Gardner 2008 et Griffin 2012 : métadonnées seulement (doi 10.1016/j.anbehav.2007.09.032; doi 10.1016/j.anbehav.2012.03.003).

**Recommandation.** Dans les visuels et le moteur, représenter un vecteur continu avec dispersion angulaire, pas un code discret, et ne pas modéliser la danse en rond comme une danse à part.

**Disposition.** _à renseigner_

### BA-19 · mineur · Tableau, « piste de danse du nid »

**Constat.** Ne vaut que pour le butinage. Pour l'essaim, les danses ont lieu à la surface de la grappe.

**Preuve.** Lu : Seeley & Visscher 2003, p. 511-512.

**Recommandation.** Distinguer les deux contextes.

**Disposition.** _à renseigner_

### BA-20 · mineur · Thèse « la reine ne commande pas »

**Constat.** La thèse est appuyée pour la recherche de nid (décision prise avec la reine en cage), mais la reine diffuse des phéromones régulatrices.

**Preuve.** Lu : Seeley & Visscher 2003. Résumé : Slessor et al. 2005.

**Recommandation.** Formuler : « la reine diffuse, elle n'ordonne pas ».

**Disposition.** _à renseigner_

### BA-21 · mineur · Ensemble des références « abeilles »

**Constat.** Volumes, pages et DOI manquent partout.

**Preuve.** Métadonnées vérifiées par Crossref et OpenAlex.

**Recommandation.** Reprendre le tableau de la section 1 du rapport.

**Disposition.** _à renseigner_

### BA-22 · mineur · Projet 3 (objets de simulation thermique)

**Constat.** Jones et al. 2004 ne traite que de la ventilation. Le chauffage par les abeilles chauffantes (Kleinhenz et al. 2003) et la ventilation collective (Peters et al. 2019) sont absents, alors que ce sont de meilleurs objets de simulation, eux aussi publiés.

**Preuve.** Résumés : Europe PMC, Kleinhenz 2003 (JEB 206:4217-4231); Peters 2019 (J R Soc Interface 16:20180561).

**Recommandation.** Ajouter les deux comme cibles de reproduction.

**Disposition.** _à renseigner_

### BA-23 · mineur · Projets 4 et 5 (paramètres)

**Constat.** Les paramètres apicoles vérifiés ne sont pas donnés.

**Preuve.** Lu : Seeley & Visscher 2003 et Seeley et al. 1996, PDF intégraux. Résumé : Seeley & Visscher 2008.

**Recommandation.** Quorum : 10-20 éclaireuses au site (fourmi : 9-17). Attrition : −15,7 à −17,2 circuits par retour. Trémulation au-delà d'environ 40 s de recherche. Receveuses : de 17 % à 30-50 % de la colonie. Piping environ 1 h avant le décollage, échauffement à 35 °C ou plus.

**Disposition.** _à renseigner_

## Ajouts recommandés

### BA-A01 · ajout

Projet 7 / question transversale : reproduire Sherman & Visscher 2002 (danses orientées vs désorientées) et le modèle de Beekman & Lew 2008, en faisant varier l'habitat; même plan avec les agents LLM.

**Disposition.** _à renseigner_

### BA-A02 · ajout

Projet 5 : chaîne quorum → piping → échauffement → buzz-run → décollage (Seeley & Visscher 2003; Seeley & Tautz 2001; Rittschof & Seeley 2008), symétrique au passage tandem → transport chez Temnothorax.

**Disposition.** _à renseigner_

### BA-A03 · ajout

Projet 3 : expérience « retrait des butineuses → maturation précoce » (Huang & Robinson 1992) et inhibition sociale par l'éthyl oléate (Leoncini et al. 2004), en pendant de Wilson 1984.

**Disposition.** _à renseigner_

### BA-A04 · ajout

Projet 6 : effondrement par maturation précoce (Khoury et al. 2011; Perry et al. 2015), parasite social clonal A. m. capensis (Oldroyd 2002) et mimétisme comportemental d'Aethina tumida (Ellis et al. 2002, à vérifier).

**Disposition.** _à renseigner_

### BA-A05 · ajout

Projet 2 : Honey Bee Algorithm de Nakrani & Tovey 2004 (allocation dynamique de serveurs) comme algorithme apicole fidèle et pont vers la répartition de charge agentique; ACO et ABC sur un même problème.

**Disposition.** _à renseigner_

### BA-A06 · ajout

Projet 4 : citer la théorie des files déjà publiée (Seeley & Tovey 1994; Anderson & Ratnieks 1999; Ratnieks & Anderson 1999) et étendre aux récoltes d'eau (Kühnholz & Seeley 1997) et de pollen (Camazine 1993).

**Disposition.** _à renseigner_

### BA-A07 · ajout

Nouvel axe ou extension du projet 7 : cognition individuelle (Menzel 2005; Giurfa 2001; Esch 2001), croisée avec l'architecture collective.

**Disposition.** _à renseigner_

### BA-A08 · ajout

Stigmergie apicole : motif du rayon (Camazine 1991; Jenkins et al. 1992), en pendant de la construction chez la fourmi.

**Disposition.** _à renseigner_

### BA-A09 · ajout

Thermorégulation : abeilles chauffantes (Kleinhenz et al. 2003) et ventilation collective (Peters et al. 2019).

**Disposition.** _à renseigner_

### BA-A10 · ajout

Tableau comparatif : séparer les trois fonctions de freinage (trémulation, arrêt au butinage, arrêt à l'essaim) et les trois formes d'oubli (évaporation, abandon, attrition).

**Disposition.** _à renseigner_

### BA-A11 · ajout

Guidage de l'essaim en vol par une minorité informée (« streakers »; références à vérifier : Beekman et al. 2006, Schultz et al. 2008, Couzin et al. 2005).

**Disposition.** _à renseigner_

### BA-A12 · ajout

Réserve de main-d'œuvre inactive (≥ 50 %) et modèle « foraging for work » (Tofts & Franks 1992) en concurrence avec le polyéthisme d'âge.

**Disposition.** _à renseigner_


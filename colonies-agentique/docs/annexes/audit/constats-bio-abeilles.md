# Constats — Biologie des abeilles

Source : [rapport complet](bio-abeilles.md). 23 constats (1 critiques, 13 majeurs, 9 mineurs) et 12 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** Le volet abeilles de v3 est juste dans ses grandes lignes, et toutes les références existent avec les bons auteurs et la bonne année. Quatre affirmations sont toutefois fausses ou mal attribuées : l'« attrition des danses » présentée comme mécanisme général d'oubli, l'« essaim scindé sans signaux d'arrêt », le « rapprochement non publié » de la file d'attente et le « seul projet sans résultat publié » du projet 7. La question transversale (richesse du signal → gain collectif) ignore une littérature apicole publiée qui y répond déjà, et la réponse dépend de l'habitat (Sherman & Visscher 2002; Donaldson-Matasci & Dornhaus 2012; Beekman & Lew 2008). La parité « au même titre » est inégale : les projets 2 et 3 sont nettement déséquilibrés, et le projet 1 utilise des protocoles différents selon l'espèce. Il manque des mécanismes apicoles majeurs : piping et buzz-run, inhibition sociale par l'éthyl oléate, effondrement par maturation précoce, cognition individuelle. Le quota WebSearch et le quota Consensus se sont épuisés en cours d'audit. Quelques contenus ne sont vérifiés qu'au niveau des métadonnées (Gardner 2008, Dornhaus & Chittka 2004, Ellis 2002, Beckers 1990), et le rapport les signale comme tels.

## Constats

### BA-01 · critique · Question transversale + Projet 7 (« seul projet sans résultat publié »)

**Constat.** Des études publiées testent déjà la valeur de l'information de la danse. Résultat : le gain dépend de l'environnement, et une précision accrue peut nuire à l'exploration. Sherman & Visscher 2002 : danses désorientées moins efficaces vers des nourrisseurs; sur sources naturelles, effet tantôt positif, tantôt nul. Donaldson-Matasci & Dornhaus 2012 : bénéfice dans les habitats riches à grandes parcelles. Beekman & Lew 2008 : bénéfice quand les sources sont rares ou lointaines. Okada et al. 2014 : une erreur d'environ 15° aide quand les sources sont rares. Grüter & Farina 2009 : l'information de localisation sert souvent de secours. L'hypothèse implicite « plus riche = meilleur » est donc démentie chez l'abeille, et le projet 7 a bel et bien un résultat publié à reproduire.

**Preuve.** Lu dans les résumés : Europe PMC (Sherman & Visscher 2002, Nature 419:920-922; Donaldson-Matasci & Dornhaus 2012, BES 66:583-592; Grüter & Farina 2009, TREE 24:242-247); OpenAlex (Beekman & Lew, doi 10.1093/beheco/arm117; Okada 2014, doi 10.1038/srep04175). Conclusion sur la portée pour v3 : inférée.

**Recommandation.** Reformuler la question : « dans quels environnements la richesse du signal paie-t-elle, et quand nuit-elle à l'exploration ? » Reproduire Sherman & Visscher 2002 (danses orientées vs désorientées) et le modèle de Beekman & Lew. Faire varier l'habitat (sources uniformes vs rares et riches). Transposer ce plan factoriel aux agents LLM.

**Disposition.** Modifié — Question reformulée comme recommandé (« dans quels environnements la richesse du signal paie-t-elle, et quand nuit-elle à l'exploration? ») avec réplication de la littérature apicole d'abord, et l'axe d'habitat est cartographié dans P8 (T8.8 : I'Anson Price 2019, même contraste danses orientées/désorientées; T8.9 : Okada 2014; E8.4 : densité × durée de vie × erreur angulaire), croisé avec la volatilité dans P1 (E1.6) et repris pour les LLM par P7 (S1, S3, S5; information redondante ou distribuée, H7.6). Écart : Sherman et Visscher 2002 et le modèle de Beekman et Lew 2008 ne sont pas des cibles de reproduction (cités, [R], paramètres non lus; T8.9 en no-go), et P7 n'a pas de facteur explicite « sources rares ou riches ». — Traité dans : ../../00-cadre.md (§2.4 point 12; §3 QR0); ../../../projets/P8-individu-et-colonie.md (§2; §3 H8.9; §5 T8.8, T8.9; §6 E8.4); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.6); ../../../projets/P7-synthese-agentique.md (§1; §3.2 H7.6)

### BA-02 · majeur · Tableau, ligne « Oubli » (Attrition des danses / TTL vs expiration des messages)

**Constat.** L'attrition est le bon concept, mais seulement pour la recherche de nid. Seeley 2003 mesure −15,7 circuits par retour, Seeley & Visscher 2008 −17,2, et l'origine est interne à l'émetteur. Selon un résumé secondaire de Seeley 2003, les danses de butinage ne déclinent pas au fil des visites; l'oubli y passe par l'abandon probabiliste et la modulation des circuits selon la rentabilité. Enfin, la danse n'a aucune persistance : ce qui décroît, c'est l'engagement de l'émetteur, pas le message. La correspondance avec un TTL ou l'expiration des messages est donc fausse.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral (https://bees.ucr.edu/sites/default/files/2020-06/bes54.pdf, « steady attritional process »). Résumé : Seeley & Visscher 2008 (https://journals.biologists.com/jeb/article/211/23/3691/17956). Spécificité au contexte du nid : lue dans un résumé secondaire de Seeley 2003, non confirmée dans le texte intégral.

**Recommandation.** Scinder la ligne. Fourmi : évaporation (côté canal). Abeille, butinage : abandon de la source + modulation des danses. Abeille, essaim : attrition (engagement de l'émetteur). Agentique : TTL côté canal vs décroissance de l'engagement de l'agent.

**Disposition.** Accepté — La ligne « Oubli » est scindée en trois formes selon qui oublie : évaporation (environnement, fourmi), abandon puis attrition des danses (émetteur, abeille; l'attrition est propre à la décision de nid et la danse n'a aucune persistance) et, côté agents, TTL du canal contre troncature du contexte. P5 oppose le TTL (propriété du canal) à l'expiration de l'engagement de l'émetteur, et la spécification range l'abandon dans la politique, non dans le canal. — Traité dans : ../../00-cadre.md (§2.4 point 14); ../../06-metriques-et-typologie.md (§6.2 « Oubli, en trois formes »; §7 homonymie 11); ../../10-glossaire.md (« oubli », « attrition des danses »); ../../05-spec-simulation.md (§2.3); ../../../projets/P5-decision-par-quorum.md (§7.2 « Oubli »)

### BA-03 · majeur · Projet 6 et tableau (« indécision et essaim scindé sans signaux d'arrêt »; « interblocage quand on supprime l'inhibition croisée »)

**Constat.** Deux phénomènes sont confondus. Les scissions en vol sont réelles mais rares : 2 essaims sur 19 chez Lindauer 1955, plus un essaim chez Seeley & Visscher 2003. Elles sont attribuées à un décollage déclenché par quorum alors que les danseuses restaient divisées, et non à l'absence de signaux d'arrêt. L'interblocage sans inhibition croisée est, lui, un résultat de modèle analytique (Seeley et al. 2012). Selon Pais et al. 2013, cet interblocage est adaptatif quand les deux options sont médiocres. Je n'ai trouvé aucune expérience de suppression des signaux d'arrêt dans un essaim réel.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral, p. 518-519. Résumés : Seeley et al. 2012 (https://research-information.bris.ac.uk/en/publications/stop-signals-provide-cross-inhibition-in-collective-decision-maki); Pais et al. 2013 (https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0073216).

**Recommandation.** Reformuler en deux modes. Interblocage : prédit par modèle, adaptatif si les options sont médiocres. Scission : observée quand un quorum est atteint sans consensus. Simuler les deux séparément en faisant varier δ (inhibition croisée) et le seuil de quorum. Rattacher le veto agentique à l'inhibition croisée seulement.

**Disposition.** Accepté — Les corrections 7 et 8 du cadre séparent l'interblocage (résultat de modèle, adaptatif si les options sont médiocres) de la scission (quorum atteint avant le consensus), et le signal d'arrêt est une inhibition, non un veto. P5 simule les deux séparément (E5.1 : carte de l'inhibition σ × quorum Q; E5.4) et P6 les range en D3 et D4 (H6.4, H6.5), le veto agentique n'étant rattaché qu'à l'inhibition ciblée. — Traité dans : ../../00-cadre.md (§2.4 points 7, 8); ../../../projets/P5-decision-par-quorum.md (§1 vocabulaire fixé; §3 H5.5; §4.4 étape 7; §6 E5.1, E5.4); ../../../projets/P6-defaillances-et-defenses.md (§7.1 D3, D4; §3 H6.4, H6.5)

### BA-04 · majeur · Projet 4 (« loi de Little; rapprochement non publié, de l'auteur »)

**Constat.** La lecture du déchargement du nectar comme une file d'attente est déjà publiée : Seeley & Tovey 1994, Anderson & Ratnieks 1999 (BES 46:73-81), Ratnieks & Anderson 1999 (Am Nat, « Use of queueing delay information in recruitment »). De plus, le temps de recherche de l'abeille est un temps d'appariement dans une file à deux côtés, pas directement le W de la loi de Little.

**Preuve.** Résumé : OpenAlex, Ratnieks & Anderson 1999 (doi 10.1086/303256). Métadonnées : Crossref, Anderson & Ratnieks 1999 (doi 10.1007/s002650050595). Lu : Seeley et al. 1996, PDF intégral (https://kops.uni-konstanz.de/server/api/core/bitstreams/b639f436-eab0-4b3c-869d-c50dea0f2f6a/content).

**Recommandation.** Citer ces trois travaux et restreindre l'originalité revendiquée à la comparaison fourmi/abeille. Modéliser une file d'appariement butineuses-receveuses. Paramètres vérifiés : trémulation au-delà d'environ 40 s de recherche; receveuses de 17 % à 30-50 % de la colonie en moins de 9 h.

**Disposition.** Accepté — Le cadre (point 6) et P4 n'affirment aucune nouveauté sur la loi de Little (Seeley et Tovey 1994, Anderson et Ratnieks 1999, Ratnieks et Anderson 1999a cités) et restreignent l'apport à la mise en regard de ce que lit chaque boucle (« deux files »), avec la file d'appariement butineuses-receveuses modélisée (T4.8, T4.9). Les paramètres vérifiés sont repris : trémulation probable au-delà de 40 s de recherche, receveuses de 17 % à 30-50 % de la colonie (T4.6, T4.7). — Traité dans : ../../00-cadre.md (§2.4 point 6); ../../../projets/P4-regulation-sans-vue-densemble.md (§2 Positionnement; §4.6 à §4.8; §5 T4.6 à T4.9); ../../06-metriques-et-typologie.md (§6.2 « Régulation de la charge »)

### BA-05 · majeur · Projet 3 (« une ruche homogène oscille »; Jones et al. 2004)

**Constat.** Le résumé de Jones et al. 2004 dit « tend to be more stable », pas « oscille ». La diversité en cause est génétique (patrilignes, colonies d'un seul mâle vs de plusieurs) et porte sur les seuils de ventilation. Simone-Finstrom et al. 2014 concluent que la diversité génétique attendue en conditions normales n'est pas prédictive de la stabilité thermique.

**Preuve.** Résumés : Europe PMC, Jones 2004 (https://pubmed.ncbi.nlm.nih.gov/15218093/); Simone-Finstrom 2014 (doi 10.1007/s10905-014-9447-3); Mattila & Seeley 2007, Science 317:362-364.

**Recommandation.** Écrire « moins stable » et préciser « diversité génétique des seuils ». Reproduire le modèle de Graham et al. 2006 (Insectes Soc 53:226-232). Mentionner la réplication partielle négative. Ajouter Mattila & Seeley 2007 comme appui sur la diversité génétique.

**Disposition.** Modifié — P3 corrige « oscille » en « moins stable » (l'oscillation est une inférence), précise que la diversité en cause est génétique (patrilignes, seuils), retient le modèle de Graham 2006 comme cible (T3.11, T3.12, bloquées avant lecture, reconstruction [I]) et signale la réplication partielle négative de Simone-Finstrom 2014. Écart : Mattila et Seeley 2007 n'est pas cité comme appui (simplement listé « à ajouter », R14) et Simone-Finstrom 2014 n'a pas d'entrée de bibliographie. — Traité dans : ../../../projets/P3-division-du-travail.md (§1 corrections de la v3; §2 Positionnement; §5 T3.11, T3.12; §11 R4, R14); ../../06-metriques-et-typologie.md (§6.1 « Division du travail et diversité »)

### BA-06 · majeur · Projet 3 – parité (retrait de caste chez Pheidole sans équivalent apicole)

**Constat.** La fourmi a trois résultats reproductibles, l'abeille un seul. L'expérience de perturbation apicole existe pourtant : après retrait des butineuses, des ouvrières deviennent butineuses précoces, jusqu'à 2 semaines plus tôt (Huang & Robinson 1992). Le mécanisme est une inhibition sociale par l'éthyl oléate transmis par trophallaxie (Leoncini et al. 2004). Le polyéthisme d'âge est d'ailleurs plastique (Seeley & Kolmes 1991, « illusion or reality? »).

**Preuve.** Résumés : Europe PMC, Huang & Robinson 1992 (PNAS 89:11726-11729); Leoncini et al. 2004 (PNAS 101:17559-17564). Seeley & Kolmes 1991 : seules les métadonnées sont vérifiées, via la bibliographie de Seeley et al. 1996.

**Recommandation.** Ajouter « retrait des butineuses → maturation précoce » comme pendant du retrait de caste chez Pheidole, et modéliser l'inhibition sociale par contact. Pendant agentique : pool d'agents de réserve et promotion réglée par la densité des agents seniors (inféré).

**Disposition.** Modifié — P3 modélise le pendant « retrait des butineuses, maturation précoce » avec inhibition sociale activable (H3.6, E3.6, T3.10), et propose des pendants agentiques (promotion freinée tant que le rôle est peuplé, promotion prématurée sous charge; capacité de réserve), en corrigeant toutefois l'audit : l'expérience de Huang et Robinson 1992 est un transplant d'abeilles âgées et le paradigme du retrait n'est pas sourcé (R5). Écart : Leoncini 2004 (éthyl oléate transmis par trophallaxie) n'est pas modélisé (inhibition générique seulement) et aucune fiche ne reprend la trophallaxie (L12). — Traité dans : ../../../projets/P3-division-du-travail.md (§1 corrections; §3 H3.6; §5 T3.10; §6 E3.6; §7 lignes 6 et 8; §11 R5, R14); ../../02-architecture-programme.md (§3 ligne « Lacune L12 »; §5 Tableau B)

### BA-07 · majeur · Projet 5 (quorum chez l'abeille)

**Constat.** La transition de la décision à l'action manque, alors qu'elle est le pendant exact du passage tandem → transport chez Temnothorax. Le quorum (10-15 éclaireuses ou plus au site) déclenche le worker piping, puis l'échauffement à 35 °C ou plus, les buzz-runs et le décollage. Le consensus des danseuses n'est ni nécessaire ni suffisant, et la météo peut interrompre le piping. Seeley & Visscher 2003, source première du seuil, n'est pas cité.

**Preuve.** Lu : Seeley & Visscher 2003, PDF intégral. Métadonnées Crossref : Seeley & Tautz 2001 (doi 10.1007/s00359-001-0243-0); Rittschof & Seeley 2008 (doi 10.1016/j.anbehav.2007.04.026).

**Recommandation.** Modéliser une chaîne symétrique pour les deux espèces : quorum → changement de mode. Citer Seeley & Visscher 2003, Seeley & Tautz 2001 et Rittschof & Seeley 2008. Pendant agentique : engagement en deux phases avec annulation possible. Signaler que la décision a été prise avec la reine en cage, ce qui appuie la thèse.

**Disposition.** Modifié — P5 construit la chaîne quorum, piping, échauffement (35 °C ou plus, environ 1 h), buzz-run, décollage en parallèle du passage tandem, transport (E5.3, H5.6), cite Seeley et Visscher 2003 pour le seuil (10 à 20 éclaireuses), note la décision prise avec la reine en cage et transpose en engagement en deux phases annulable. Écart : Seeley et Tautz 2001 et Rittschof et Seeley 2008 restent « à ajouter à la bibliographie après lecture », la durée de préparation D est un paramètre libre [à confirmer] et E5.3 reste exploratoire (R8). — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.4 Chaîne décision, action; §6 E5.3; §7.1 « Décision puis action, en deux temps »; §8 Voir écran 5; §11 R8; §13 « À ajouter à la bibliographie »); ../../06-metriques-et-typologie.md (§6.1 « Plan et contrôle »)

### BA-08 · majeur · Projet 2 (ACO contre ABC)

**Constat.** Dans ABC, la danse se réduit à une roulette proportionnelle à la qualité : aucune direction ni distance. Le rapport TR06 donne pour Rastrigin un intervalle anormal ([−600, 600]). Comparer ACO sur Oliver30 (combinatoire) à ABC sur Rastrigin (continu) ne permet de rien attribuer au mécanisme. Aucun résultat biologique n'est reproduit, ce qui déroge au critère de rigueur de v3.

**Preuve.** Lu : Karaboga 2005 TR06, PDF intégral (https://abc.erciyes.edu.tr/pub/tr06_2005.pdf). Métadonnées : Karaboga & Basturk 2007 (doi 10.1007/s10898-007-9149-x). Résumé : Nakrani & Tovey 2004 (doi 10.1177/105971230401200308).

**Recommandation.** Reproduire Karaboga & Basturk 2007 plutôt que TR06. Faire tourner les deux familles sur un même problème. Ajouter le Honey Bee Algorithm de Nakrani & Tovey 2004 (allocation dynamique de serveurs), plus fidèle à la biologie et pont direct vers l'agentique.

**Disposition.** Modifié — P2 reconnaît que la danse d'ABC est une sélection proportionnelle sans direction ni distance, reproduit Karaboga et Basturk 2008 (T2.8, T2.9, texte lu) plutôt que TR06 (gardé en T2.10, priorité basse, domaine [−600, 600] noté tel que publié), fait tourner ACO et ABC sur les mêmes classes de problèmes à budget égal (E2.1) et renvoie le Honey Bee Algorithm de Nakrani et Tovey à T2.12 et E2.4. Écart : Karaboga et Basturk 2007 (article visé par l'audit) n'est pas reproduit (non lu), Nakrani et Tovey 2004 reste bloqué par la porte G3, et l'absence de résultat biologique reproduit est déclarée comme asymétrie, non corrigée. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Portes G0 à G3; §2 « Thèse remplacée »; §5 T2.8 à T2.10, T2.12; §6 E2.1, E2.4); ../../00-cadre.md (§5 P2 annexe go/no-go); ../../02-architecture-programme.md (§5 Tableau B)

### BA-09 · majeur · Tableau, lignes « Canal » et « Contenu du signal » (et « Freinage » côté fourmi)

**Constat.** La dichotomie « fourmi = chimie / abeille = danse » est trop nette. Les danseuses émettent des hydrocarbures qui augmentent les sorties (Thom et al. 2007), la danse porte l'odeur florale, la communication phéromonale de l'abeille est riche (Slessor et al. 2005), et le contenu inclut la qualité de la source (nombre de circuits). Côté fourmi, « absence de retours » oublie le signal négatif actif décrit par Robinson et al. 2005 (phéromone « no entry »).

**Preuve.** Résumés : Europe PMC, Thom et al. 2007 (PLoS Biol 5:e228); Slessor, Winston & Le Conte 2005 (J Chem Ecol 31:2731-2745); Robinson et al. 2005 (Nature 438:442); Grüter & Farina 2009.

**Recommandation.** Présenter la danse comme un signal multicomposante : vecteur, qualité, odeur, éveil. Signaler à l'audit fourmis l'existence de signaux négatifs actifs chez la fourmi.

**Disposition.** Modifié — Le canal est déclaré variable du modèle, jamais attribut du taxon (contre-exemple Meliponini), le freinage actif de la fourmi est reconnu (phéromone « no entry » de Monomorium, inhibition par encombrement chez Lasius niger) et la ligne « Codage du signal » décrit la danse comme un vecteur analogique bruité plus une qualité (nombre de circuits), « symbolique » non établi. Écart : les autres composantes de la danse (odeur florale, hydrocarbures qui augmentent les sorties, Thom 2007; communication phéromonale, Slessor 2005) ne sont ni décrites ni citées, et ces deux références n'ont pas d'entrée de bibliographie. — Traité dans : ../../00-cadre.md (§2.3; §2.4 points 9, 10); ../../06-metriques-et-typologie.md (§6.1 « Médium et portée », « Codage du signal »); ../../10-glossaire.md (« danse frétillante », « piste »)

### BA-10 · majeur · Tableau, ligne « Freinage » (danse de trémulation, signal d'arrêt)

**Constat.** Trois motifs distincts sont confondus. (1) Trémulation : recrute des receveuses et inhibe les danses frétillantes (Kirchner 1993; Nieh 1993). (2) Signal d'arrêt au butinage : déclenché par le danger et dirigé vers les abeilles de la même source (Nieh 2010; ×43 après attaque). (3) Signal d'arrêt à l'essaim : inhibition croisée dirigée vers les danseuses des autres sites (Seeley et al. 2012).

**Preuve.** Résumé : Europe PMC, Nieh 2010 (Curr Biol 20:310-315). Lu : Seeley et al. 1996, PDF intégral, p. 425. Résumé : Seeley et al. 2012.

**Recommandation.** Faire trois entrées : rééquilibrage + inhibition (trémulation); disjoncteur par source (butinage); veto entre coalitions (essaim). Chacune a son pendant agentique (inféré).

**Disposition.** Modifié — La ligne « Freinage (inhibition) » distingue les trois motifs apicoles (signal d'arrêt à l'essaim = inhibition ciblée; signal d'arrêt au butinage déclenché par le danger; trémulation qui recrute des receveuses et freine le recrutement, « deux publics »), mais en une seule ligne dont les pendants agentiques (contre-pression, limite de concurrence, annulation) ne sont pas appariés un à un. Écart : le signal d'arrêt au butinage ne cite que Nieh 1993 [non vérifiée] (Nieh 2010 n'est pas utilisé), n'a pas d'entrée de glossaire et n'a pas de pendant « disjoncteur par source » (le « disjoncteur local » de P1 vise l'encombrement de la fourmi). — Traité dans : ../../06-metriques-et-typologie.md (§6.2 « Freinage (inhibition) »; §7 homonymie 9); ../../10-glossaire.md (« signal d'arrêt », « trémulation »); ../../../projets/P4-regulation-sans-vue-densemble.md (§4.7; §7 Rel5); ../../../projets/P1-recrutement-verrouillage.md (§7.1); ../../00-cadre.md (§2.4 point 7)

### BA-11 · majeur · Portée générale (« intelligence individuelle » de l'abeille)

**Constat.** La cognition individuelle de l'abeille est absente alors que l'intention du chercheur l'inclut : mémoire spatiale de type carte (Menzel et al. 2005), concepts de pareil/différent (Giurfa et al. 2001), odomètre visuel par flux optique (Esch et al. 2001), confirmation par radar du suivi du vecteur de danse (Riley et al. 2005). Or seuls 12-25 % des suivis de danse mènent à une source nouvelle (Biesmeijer & Seeley 2005), ce qui pèse directement sur l'axe capacité des agents × architecture.

**Preuve.** Résumés : Europe PMC (Menzel 2005, PNAS 102:3040-3045; Giurfa 2001, Nature 410:930-933; Esch 2001, Nature 411:581-583; Riley 2005, Nature 435:205-207). Biesmeijer & Seeley 2005 : chiffre lu dans Hasenjager et al. 2022 (https://link.springer.com/article/10.1007/s00265-022-03218-1).

**Recommandation.** Ajouter un axe « capacité individuelle × architecture » pour les deux espèces, ou l'intégrer au projet 7. Dans le moteur : odomètre bruité et dispersion angulaire de la danse (Tanner & Visscher 2010).

**Disposition.** Modifié — La cognition individuelle est portée par le projet P8 (individu contre colonie) : individu « riche » de l'abeille à curseurs étiquetés « contesté » ou « débattu » (odomètre bruité par flux optique, carte spatiale, concepts pareil/différent; Esch, Menzel, Giurfa), T8.15 non chiffrée, axe capacité × architecture de P7 (H7.10, H8.4 à H8.8) et reprise de 75 à 88 % de suivis de danse qui réactivent ou confirment (Biesmeijer et Seeley 2005; le complément, 12 à 25 % vers une source nouvelle, est déduit). Écart : Riley 2005 et Tanner et Visscher 2010 ne sont pas cités et l'odomètre n'a volontairement aucune cible chiffrée (controverse). — Traité dans : ../../../projets/P8-individu-et-colonie.md (§1; §2 Positionnement; §4.3 « Individu riche » de l'abeille; §5 T8.15); ../../../projets/P7-synthese-agentique.md (§3.2 H7.10); ../../../projets/P1-recrutement-verrouillage.md (§7.1); ../../06-metriques-et-typologie.md (§6.2 « Mémoire »)

### BA-12 · majeur · Tableau, ligne « Recrutement → Délégation »

**Constat.** La danse est une annonce que les recrues choisissent de suivre (mode « pull »); chaque butineuse évalue sa source sans rien comparer. La « délégation » suppose un délégant qui assigne, ce qui relève de l'orchestration et va à l'encontre de l'angle chorégraphique.

**Preuve.** Résumé : Seeley et al. 1991 (aucune comparaison entre sources). Le reste est inféré.

**Recommandation.** Remplacer par « annonce / pull (tableau d'offres) », métaphore employée par Nakrani & Tovey 2004. Garder « délégation » comme contre-exemple d'orchestration.

**Disposition.** Accepté — « Délégation » est retirée comme analogue du recrutement et réservée à l'orchestration en contre-exemple (homonymie 8, lignes retirées); la ligne « Recrutement : annonce et auto-sélection » (recrutement tiré, la suiveuse tire une danseuse au hasard, aucune comparaison de sources) la remplace, avec DIF contre ORC dans P7. La métaphore de l'annonce sur un tableau s'appuie sur Salemi et al. 2025, l'allocation par annonces de Nakrani et Tovey étant portée par P2 (E2.4). — Traité dans : ../../06-metriques-et-typologie.md (§6.1 « Recrutement : annonce et auto-sélection »; §7 homonymie 8); ../../10-glossaire.md (« délégation »); ../../../projets/P7-synthese-agentique.md (§7.2); ../../../projets/P1-recrutement-verrouillage.md (§7.1)

### BA-13 · majeur · Projet 6 (Acherontia ↔ prompt injection; pathologies apicoles)

**Constat.** Acherontia contourne la reconnaissance des nids-mates par camouflage chimique : c'est une usurpation d'identité, pas une injection de faux signaux dans le canal de coordination. Des pathologies apicoles plus parlantes manquent : l'effondrement par maturation précoce (Khoury et al. 2011; Perry et al. 2015), le parasite social clonal A. m. capensis (Oldroyd 2002) et le mimétisme comportemental d'Aethina tumida (Ellis et al. 2002).

**Preuve.** Lu dans un résumé secondaire de la notice Springer (Moritz 1991, https://link.springer.com/article/10.1007/BF01136209). Résumés : Europe PMC, Khoury 2011 (PLoS ONE 6:e18491) et Perry 2015 (PNAS 112:3427-3432). Métadonnées seulement : Oldroyd 2002 (doi 10.1016/S0169-5347(02)02479-5) et Ellis 2002 (doi 10.1007/s00114-002-0326-y); le contenu d'Ellis vient de ma mémoire.

**Recommandation.** Classer les pathologies par couche (identité, canal, dynamique). Associer Acherontia et Phengaris à l'usurpation d'identité. Ajouter Perry et al. 2015 comme résultat empirique reproductible : promotion prématurée d'agents sous charge, puis cascade.

**Disposition.** Modifié — P6 classe les pathologies par couche (dynamique, identité, canal) et rattache Acherontia (I2), Phengaris et Maculinea (I1) et A. m. capensis (I3) à l'usurpation d'identité plutôt qu'à l'injection de faux signaux; l'effondrement par maturation précoce n'existe que comme extension exploratoire de E3.6 dans P3. Écart : cette pathologie (Perry 2015, Khoury 2011) est une « candidate D5 » absente de la taxonomie de P6 (R12; IC12 de l'architecture) et le mimétisme d'Aethina tumida (Ellis 2002, à vérifier) n'y figure pas. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§7.1 Taxonomie P6; §11 R12); ../../../projets/P3-division-du-travail.md (§6 E3.6); ../../02-architecture-programme.md (§8 IC12)

### BA-14 · majeur · Projet 1 – parité (À reproduire)

**Constat.** Les expériences diffèrent selon l'espèce : verrouillage sur la branche longue pour la fourmi, réallocation après inversion de qualité pour l'abeille. Le pont double n'a pas de sens pour une abeille, qui vole droit vers la source. On ne peut donc pas comparer.

**Preuve.** Résumé : Seeley et al. 1991. Beckers et al. 1990 : référence lue dans la bibliographie de Seeley & Visscher 2003, contenu de mémoire.

**Recommandation.** Adopter un protocole commun : deux sources, inversion de qualité à t, pour les deux espèces. Opposer Beckers et al. 1990 (fourmi, à vérifier) à Seeley et al. 1991 (abeille). Garder le pont double comme expérience propre à la fourmi, en le disant.

**Disposition.** Accepté — P1 adopte le protocole commun d'inversion de qualité à deux sources, avec les mêmes mesures (p_best, t½, taux de verrouillage) pour ruche-Seeley et dyn-Dussutour (E1.1), garde le pont double et le raccourci tardif comme expériences propres à la fourmi avec l'asymétrie déclarée (E1.2), et oppose Beckers 1990 (fourmi, [R], à lire) à Seeley 1991. La parité est justifiée comme niveau d'exigence, non comme symétrie des expériences. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§2 Positionnement; §4.8 Parité fourmi-abeille et asymétries; §6 E1.1, E1.2); ../../02-architecture-programme.md (§5 Tableau B)

### BA-15 · mineur · Projet 3 (polyéthisme : nourrice → bâtisseuse → butineuse; Seeley 1982)

**Constat.** Seeley 1982 porte sur la valeur adaptative du calendrier (groupes de tâches réunies dans l'espace; nettoyage des cellules de 0 à 2 jours), pas sur la séquence. La séquence de v3 omet le nettoyage, le stockage et la garde.

**Preuve.** Résumé : https://link.springer.com/article/10.1007/BF00299306

**Recommandation.** Citer une synthèse pour la séquence (Seeley 1995) et Seeley 1982 pour sa logique spatiale. Indiquer que la séquence est plastique.

**Disposition.** Modifié — P3 corrige la séquence (quatre sous-castes d'âge : nettoyage de 0 à 2 j, couvain, stockage, butinage; T3.9), la déclare plastique (T3.10) et cite Seeley 1982 pour sa logique spatiale (co-localisation des tâches de même âge). Écart : la synthèse recommandée (Seeley 1995) n'est pas citée par P3 (âges via Kang et Theraulaz 2016 [S]) et la garde reste absente de la séquence. — Traité dans : ../../../projets/P3-division-du-travail.md (§1 corrections; §5 T3.9, T3.10; §7 ligne 9)

### BA-16 · mineur · Projet 5 (Seeley et Visscher 2004)

**Constat.** La référence est ambiguë : deux articles en 2004 (BES 56:594-601 et Apidologie 35:101-116).

**Preuve.** Résumé et métadonnées : Springer (s00265-004-0814-5); OpenAlex (doi 10.1051/apido:2004004).

**Recommandation.** Préciser lequel est visé et ajouter Seeley & Visscher 2003 (BES 54:511-520).

**Disposition.** Accepté — La bibliographie distingue Seeley et Visscher 2003 (Behav. Ecol. Sociobiol. 54:511-520) et Seeley et Visscher 2004 (Behav. Ecol. Sociobiol. 56:594-601, quorum), et P5 signale l'article de l'Apidologie (35:101-116) comme distinct, à ajouter après lecture. P5 cite les deux articles à leur place (T5.9, T5.10). — Traité dans : ../../11-bibliographie.md (« Seeley et Visscher 2003 », « Seeley et Visscher 2004 »); ../../../projets/P5-decision-par-quorum.md (§5 T5.9, T5.10; §13 « À ajouter à la bibliographie »)

### BA-17 · mineur · Projet 1 / tableau (von Frisch, encodage)

**Constat.** von Frisch est cité sans date ni détail de l'encodage, et l'odomètre visuel n'est pas mentionné.

**Preuve.** Lu dans Hasenjager et al. 2022 (qui cite von Frisch 1967). Métadonnées OpenAlex : doi 10.4159/harvard.9780674418776.

**Recommandation.** Citer von Frisch 1967 (Harvard UP). Préciser : angle par rapport à la gravité ↔ direction par rapport au soleil; durée de la course ↔ distance; distance mesurée par flux optique (Esch et al. 2001).

**Disposition.** Accepté — von Frisch 1967 est cité avec éditeur et DOI (Harvard UP), et l'encodage est précisé : angle de la course par rapport à la verticale vers azimut, durée vers distance, distance mesurée par flux optique (Esch 2001), calibration individuelle et non linéaire. Le glossaire et le visuel V6 reprennent cette formulation. — Traité dans : ../../11-bibliographie.md (« Frisch 1967 »); ../../../projets/P1-recrutement-verrouillage.md (§4.5; §8 V6); ../../06-metriques-et-typologie.md (§6.1 « Codage du signal »); ../../10-glossaire.md (« danse frétillante »)

### BA-18 · mineur · Tableau, « Direction et distance (symbolique) »

**Constat.** « Symbolique » se défend (Sherman & Visscher 2002; Donaldson-Matasci & Dornhaus 2012), mais l'encodage est continu et analogique. La danse en rond n'est probablement pas une danse distincte (Gardner et al. 2008), point que je n'ai pas pu vérifier.

**Preuve.** Résumés : Europe PMC. Gardner 2008 et Griffin 2012 : métadonnées seulement (doi 10.1016/j.anbehav.2007.09.032; doi 10.1016/j.anbehav.2012.03.003).

**Recommandation.** Dans les visuels et le moteur, représenter un vecteur continu avec dispersion angulaire, pas un code discret, et ne pas modéliser la danse en rond comme une danse à part.

**Disposition.** Modifié — « Symbolique » est retiré (« non établi : écrire vecteur codé + intensité ») et la danse est représentée comme un vecteur analogique bruité avec dispersion angulaire (erreur d'Okada, T1.7; V5 éventail, V6 bande d'incertitude). Écart : la danse en rond comme danse non distincte (Gardner et al. 2008) n'est pas abordée (seule Gardner et al. 2007 est citée) et le canal `dance-floor` du moteur reste décrit comme « tuple (direction, durée) ». — Traité dans : ../../06-metriques-et-typologie.md (§6.1 « Codage du signal »); ../../../projets/P1-recrutement-verrouillage.md (§4.5; §5 T1.7; §8 V5, V6); ../../05-spec-simulation.md (§2.3)

### BA-19 · mineur · Tableau, « piste de danse du nid »

**Constat.** Ne vaut que pour le butinage. Pour l'essaim, les danses ont lieu à la surface de la grappe.

**Preuve.** Lu : Seeley & Visscher 2003, p. 511-512.

**Recommandation.** Distinguer les deux contextes.

**Disposition.** Modifié — Les deux contextes sont séparés par la structure des fiches (butinage : ruche-Seeley dans P1; essaim : modèles de P5, dont le visuel place les danseuses sur la grappe), mais la règle n'est écrite nulle part. Écart : le canal `dance-floor` et la ligne « Découplage » parlent d'une « piste de danse » sans préciser qu'elle ne vaut que pour le butinage, l'essaim dansant à la surface de la grappe. — Traité dans : ../../05-spec-simulation.md (§2.3 `dance-floor`); ../../06-metriques-et-typologie.md (§6.1 « Découplage »); ../../../projets/P5-decision-par-quorum.md (§8 Voir, écran 2)

### BA-20 · mineur · Thèse « la reine ne commande pas »

**Constat.** La thèse est appuyée pour la recherche de nid (décision prise avec la reine en cage), mais la reine diffuse des phéromones régulatrices.

**Preuve.** Lu : Seeley & Visscher 2003. Résumé : Slessor et al. 2005.

**Recommandation.** Formuler : « la reine diffuse, elle n'ordonne pas ».

**Disposition.** Accepté — La thèse est reformulée (la reine régule la reproduction par phéromones; « la reine ne commande pas » reste un constat borné) et l'encart « Ce que fait vraiment la reine » est obligatoire; P5 écrit « elle diffuse, elle n'ordonne pas » avec l'essaim décollé la reine en cage, et 06 la qualifie de contrainte diffusée, non d'ordre. Slessor 2005 n'est pas cité (seule Slessor et al. 1988 l'est), sans effet sur la formulation. — Traité dans : ../../00-cadre.md (§2.1; §8); ../../07-vulgarisation-evaluation.md (§7.3); ../../../projets/P5-decision-par-quorum.md (§8 Voir, écran 5); ../../06-metriques-et-typologie.md (§6.1 « Modulation globale »)

### BA-21 · mineur · Ensemble des références « abeilles »

**Constat.** Volumes, pages et DOI manquent partout.

**Preuve.** Métadonnées vérifiées par Crossref et OpenAlex.

**Recommandation.** Reprendre le tableau de la section 1 du rapport.

**Disposition.** Modifié — La bibliographie consolidée donne volume, pages, DOI et statut pour les références apicoles que le programme cite (Seeley et al. 1991, 1996, 2012; Pais; Okada; Jones; Graham; Huang et Robinson; etc.). Écart : plusieurs références du tableau de l'audit n'ont pas d'entrée (Seeley et Tautz 2001, Rittschof et Seeley 2008, Mattila et Seeley 2007, Simone-Finstrom 2014, Kleinhenz 2003, Seeley et Kolmes 1991, Seeley et Visscher 2008, Grüter et Farina 2009, Thom 2007, Slessor 2005, Riley 2005, Tanner et Visscher 2010, Ellis 2002, Gardner 2008, Griffin 2012, Kühnholz et Seeley 1997, Camazine 1993, Nakrani et Tovey 2004), et Nieh 1993 reste sans DOI. — Traité dans : ../../11-bibliographie.md (§Références; §Compléments de la validation finale); ../../03-plan-de-recherche.md (§11 IN18)

### BA-22 · mineur · Projet 3 (objets de simulation thermique)

**Constat.** Jones et al. 2004 ne traite que de la ventilation. Le chauffage par les abeilles chauffantes (Kleinhenz et al. 2003) et la ventilation collective (Peters et al. 2019) sont absents, alors que ce sont de meilleurs objets de simulation, eux aussi publiés.

**Preuve.** Résumés : Europe PMC, Kleinhenz 2003 (JEB 206:4217-4231); Peters 2019 (J R Soc Interface 16:20180561).

**Recommandation.** Ajouter les deux comme cibles de reproduction.

**Disposition.** Hors portée — La ventilation collective (Peters 2019, entrée de bibliographie [R]) est déclarée « extension possible, hors noyau » et reportée sans phase attribuée, et les abeilles chauffantes (Kleinhenz 2003) ne figurent que dans la liste des références absentes à ajouter. Les cibles de thermorégulation retenues restent Jones 2004 et Graham 2006 (T3.11, T3.12). — Traité dans : ../../../projets/P3-division-du-travail.md (§2 Positionnement, « Hors périmètre, par décision »; §4 apis-thermoregulation; §11 R14)

### BA-23 · mineur · Projets 4 et 5 (paramètres)

**Constat.** Les paramètres apicoles vérifiés ne sont pas donnés.

**Preuve.** Lu : Seeley & Visscher 2003 et Seeley et al. 1996, PDF intégraux. Résumé : Seeley & Visscher 2008.

**Recommandation.** Quorum : 10-20 éclaireuses au site (fourmi : 9-17). Attrition : −15,7 à −17,2 circuits par retour. Trémulation au-delà d'environ 40 s de recherche. Receveuses : de 17 % à 30-50 % de la colonie. Piping environ 1 h avant le décollage, échauffement à 35 °C ou plus.

**Disposition.** Modifié — Les paramètres sont repris là où ils servent : quorum d'environ 15 éclaireuses (10 à 20), piping environ 1 h avant le décollage avec échauffement à 35 °C ou plus (P5), trémulation au-delà de 40 s de recherche et receveuses de 17 % à 30-50 % (P4), attrition d'environ −15,7 circuits par retour [à confirmer] (P6, P5). Écart : −17,2 (Seeley et Visscher 2008) n'apparaît pas, le quorum fourmi est donné à « environ 10 à 20 compagnes » (médianes de 2 à 7,5) et non à 9-17, et plusieurs valeurs portent [à confirmer] ou « lu par l'audit ». — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.1 Parité; §4.4; §5 T5.13, T5.17); ../../../projets/P4-regulation-sans-vue-densemble.md (§4.6; §4.8; §5 T4.6, T4.7); ../../../projets/P6-defaillances-et-defenses.md (§4; §5 T6.14)

## Ajouts recommandés

### BA-A01 · ajout

Projet 7 / question transversale : reproduire Sherman & Visscher 2002 (danses orientées vs désorientées) et le modèle de Beekman & Lew 2008, en faisant varier l'habitat; même plan avec les agents LLM.

**Disposition.** Modifié — Même traitement que BA-01 : cartographie de l'habitat dans P8 (E8.4, après T8.8 et T8.9) et P1 (E1.6), reprise de la forme de la question pour des algorithmes en P2. Écart : Sherman et Visscher 2002 n'est pas reproduit comme tel (I'Anson Price 2019 reproduit un contraste équivalent), le modèle de Beekman et Lew 2008 n'est pas une cible, et le plan factoriel d'habitat n'est pas transposé tel quel aux agents LLM. — Traité dans : ../../../projets/P8-individu-et-colonie.md (§5 T8.8, T8.9; §6 E8.4); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.6); ../../../projets/P7-synthese-agentique.md (§1; §3.2 H7.6); ../../../projets/P2-memoire-partagee-metaheuristiques.md (§2 « Dépendance à l'environnement du signal »)

### BA-A02 · ajout

Projet 5 : chaîne quorum → piping → échauffement → buzz-run → décollage (Seeley & Visscher 2003; Seeley & Tautz 2001; Rittschof & Seeley 2008), symétrique au passage tandem → transport chez Temnothorax.

**Disposition.** Modifié — La chaîne quorum, piping, échauffement, buzz-run, décollage est écrite en §4.4 de P5 et simulée en E5.3 (H5.6), en regard du passage tandem, transport. Écart : Seeley et Tautz 2001 et Rittschof et Seeley 2008 restent « à ajouter à la bibliographie après lecture », la durée de préparation D est libre [à confirmer] et E5.3 reste exploratoire. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.4; §6 E5.3; §11 R8; §13 « À ajouter à la bibliographie »)

### BA-A03 · ajout

Projet 3 : expérience « retrait des butineuses → maturation précoce » (Huang & Robinson 1992) et inhibition sociale par l'éthyl oléate (Leoncini et al. 2004), en pendant de Wilson 1984.

**Disposition.** Modifié — E3.6 (retrait de butineuses × inhibition sociale, avec variante ancrée sur le transplant de Huang et Robinson 1992) est le pendant apicole de Wilson 1984 (T3.2, E3.1). Écart : Leoncini 2004 (éthyl oléate) n'est pas modélisé et le paradigme de retrait reste non sourcé (R5). — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.6; §5 T3.2, T3.10; §6 E3.1, E3.6; §11 R5, R14)

### BA-A04 · ajout

Projet 6 : effondrement par maturation précoce (Khoury et al. 2011; Perry et al. 2015), parasite social clonal A. m. capensis (Oldroyd 2002) et mimétisme comportemental d'Aethina tumida (Ellis et al. 2002, à vérifier).

**Disposition.** Modifié — La taxonomie de P6 range Acherontia (I2), Phengaris (I1) et A. m. capensis (I3) en usurpation d'identité, et l'effondrement par maturation précoce n'existe que comme extension exploratoire de E3.6. Écart : Perry 2015 et Khoury 2011 (candidate D5) et Ellis 2002 (Aethina tumida, à vérifier) ne sont pas dans la taxonomie de P6. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§7.1 Taxonomie P6; §11 R12); ../../../projets/P3-division-du-travail.md (§6 E3.6); ../../02-architecture-programme.md (§8 IC12)

### BA-A05 · ajout

Projet 2 : Honey Bee Algorithm de Nakrani & Tovey 2004 (allocation dynamique de serveurs) comme algorithme apicole fidèle et pont vers la répartition de charge agentique; ACO et ABC sur un même problème.

**Disposition.** Accepté — P2 retient le Honey Bee Algorithm de Nakrani et Tovey 2004 comme cible relationnelle T2.12 et comme pont vers la répartition de charge (E2.4 : annonces, stigmergie distribuée, allocation centrale), et croise ACO et ABC sur les mêmes classes de problèmes à budget égal (E2.1). L'exécution de T2.12 et de E2.4 est conditionnée à la porte G3 (texte non lu, référence absente de la bibliographie consolidée). — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Portes G3; §5 T2.12; §6 E2.1, E2.4)

### BA-A06 · ajout

Projet 4 : citer la théorie des files déjà publiée (Seeley & Tovey 1994; Anderson & Ratnieks 1999; Ratnieks & Anderson 1999) et étendre aux récoltes d'eau (Kühnholz & Seeley 1997) et de pollen (Camazine 1993).

**Disposition.** Modifié — P4 cite la théorie des files déjà publiée (Seeley et Tovey 1994, Anderson et Ratnieks 1999a et 1999b, Ratnieks et Anderson 1999a) sans revendication de nouveauté sur Little, et reproduit la file d'appariement (T4.8, T4.9). Écart : l'extension aux récoltes d'eau (Kühnholz et Seeley 1997) et de pollen (Camazine 1993) n'est ni citée ni planifiée. — Traité dans : ../../../projets/P4-regulation-sans-vue-densemble.md (§2 Positionnement; §5 T4.8, T4.9; §6 E4.4); ../../00-cadre.md (§2.4 point 6)

### BA-A07 · ajout

Nouvel axe ou extension du projet 7 : cognition individuelle (Menzel 2005; Giurfa 2001; Esch 2001), croisée avec l'architecture collective.

**Disposition.** Modifié — P8 porte la cognition individuelle de l'abeille (Esch, Menzel, Giurfa; individu « riche » à curseurs, T8.15) et la croise avec l'architecture collective dans E8.3 (information privée contre sociale, variante abeille qualitative) et, côté LLM, dans H7.10 et E8.5. Écart : le volet abeille n'a aucune cible chiffrée (T8.15 en no-go) et aucun croisement abeille × architecture n'est planifié comme tel. — Traité dans : ../../../projets/P8-individu-et-colonie.md (§2; §4.3 « Individu riche » de l'abeille; §5 T8.15; §6 E8.3, E8.5); ../../../projets/P7-synthese-agentique.md (§3.2 H7.10)

### BA-A08 · ajout

Stigmergie apicole : motif du rayon (Camazine 1991; Jenkins et al. 1992), en pendant de la construction chez la fourmi.

**Disposition.** Modifié — P9 retient le rayon d'A. mellifera comme pendant apicole de la construction (phase 3), avec Camazine 1991, Camazine et al. 1990 et Jenkins 1992 comme sources, mais la cible exécutée est Johnson 2009 (T9.26, bande de pollen, cible de rejet de la lecture classique de Camazine; H9.16). Écart : Camazine et Jenkins ne sont pas reproduits ([R]; nature des équations de 1990 [à confirmer]). — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§2 Positionnement; §3 H9.16; §4 « Rayon d'Apis mellifera »; §5 T9.26)

### BA-A09 · ajout

Thermorégulation : abeilles chauffantes (Kleinhenz et al. 2003) et ventilation collective (Peters et al. 2019).

**Disposition.** Hors portée — Même renvoi que BA-22 : la ventilation collective (Peters 2019) est une extension hors noyau de P3 sans phase attribuée, et les abeilles chauffantes (Kleinhenz 2003) ne figurent que comme référence absente à ajouter. Les cibles de thermorégulation du programme restent Jones 2004 et Graham 2006. — Traité dans : ../../../projets/P3-division-du-travail.md (§2 « Hors périmètre, par décision »; §11 R14)

### BA-A10 · ajout

Tableau comparatif : séparer les trois fonctions de freinage (trémulation, arrêt au butinage, arrêt à l'essaim) et les trois formes d'oubli (évaporation, abandon, attrition).

**Disposition.** Modifié — Le tableau comparatif de 06 sépare les trois formes d'oubli selon qui oublie (ligne « Oubli, en trois formes ») et nomme les trois motifs de freinage apicole dans la ligne « Freinage (inhibition) ». Écart : le freinage reste une seule ligne, sans trois entrées ni pendant agentique distinct pour chaque fonction. — Traité dans : ../../06-metriques-et-typologie.md (§6.2 « Freinage (inhibition) », « Oubli, en trois formes »; §7 homonymies 9 et 11); ../../10-glossaire.md (« oubli », « signal d'arrêt », « trémulation »)

### BA-A11 · ajout

Guidage de l'essaim en vol par une minorité informée (« streakers »; références à vérifier : Beekman et al. 2006, Schultz et al. 2008, Couzin et al. 2005).

**Disposition.** Accepté — P9 reprend le guidage de l'essaim par une minorité informée (H9.11; T9.16 à T9.18 : streaker contre guide subtil de Schultz 2008, p*(N) de Couzin 2005), avec Beekman 2006 marqué [non vérifiée] conformément à « références à vérifier ». L'exécution est conditionnelle à la lecture de Couzin 2005 (porte PR-0, puis PR-3). — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§2 Positionnement; §3 H9.11; §5 T9.16 à T9.18, portes PR-0 et PR-3)

### BA-A12 · ajout

Réserve de main-d'œuvre inactive (≥ 50 %) et modèle « foraging for work » (Tofts & Franks 1992) en concurrence avec le polyéthisme d'âge.

**Disposition.** Modifié — P3 couvre la réserve de main-d'œuvre et le foraging-for-work (Tofts et Franks 1992; T3.7, T3.8; duel FFW contre seuils variables en E3.3, H3.3) et mentionne la réserve apicole (au moins 50 % d'inactives, Seeley et al. 1996, [à confirmer]). Écart : le volet est surtout fourmi (Temnothorax, Myrmica) et aucune expérience n'oppose FFW au polyéthisme d'âge de l'abeille (E3.6 reste séparée). — Traité dans : ../../../projets/P3-division-du-travail.md (§2 Positionnement; §3 H3.3; §5 T3.7, T3.8; §6 E3.3)


# Audit de la proposition v3 — angle « bio-abeilles »

Date : 2026-10-01. Objet : exactitude apicole de chaque affirmation de `proposition-v3.md` sur l'abeille domestique (*Apis mellifera*), parité fourmis/abeilles projet par projet, mécanismes apicoles absents.

## Méthode et limites

- Sources primaires lues en texte intégral : Seeley & Visscher 2003 (PDF, 10 p.), Seeley, Kühnholz & Weidenmüller 1996 (PDF, 9 p.), Karaboga 2005 TR06 (PDF, 10 p.). Résumés lus (Europe PMC, Springer, Science, PLoS) pour une trentaine d'autres articles. Métadonnées (auteurs, revue, volume, pages, DOI) vérifiées par Crossref ou OpenAlex.
- Convention : **[lu]** = constaté dans la source; **[résumé]** = lu dans le résumé seulement; **[méta]** = seules les métadonnées sont vérifiées, le contenu vient de ma mémoire; **[inféré]** = mon raisonnement.
- Limites : le budget WebSearch de la session et le quota Consensus se sont épuisés en cours d'audit; plusieurs résumés d'éditeurs (Elsevier, Springer) étaient inaccessibles (p. ex. Gardner et al. 2008, Dornhaus & Chittka 2004, Ellis et al. 2002). Ces cas sont marqués [méta]. Je n'ai lu ni le livre de von Frisch ni le texte intégral de Seeley et al. 2012.

## Verdict

Le volet abeilles de v3 est globalement juste dans ses grandes lignes, et les références citées existent toutes avec les bons auteurs et la bonne année. Mais quatre affirmations sont fausses ou mal attribuées : l'« attrition des danses » comme mécanisme général d'oubli, l'« essaim scindé sans signaux d'arrêt », le « rapprochement non publié » de la file d'attente, et le « seul projet sans résultat publié » du projet 7. La question transversale (richesse du signal → gain collectif) ignore une littérature apicole publiée qui y répond déjà, de façon conditionnelle à l'habitat. C'est le constat le plus grave. La parité « au même titre » est inégale : les projets 2, 3 et 5 donnent plus de résultats reproductibles à une espèce qu'à l'autre. Des mécanismes apicoles majeurs manquent : piping et buzz-run, inhibition sociale par l'éthyl oléate, cognition individuelle.

## 1. Vérification des références « abeilles » de v3

| Réf. v3 | Statut | Référence exacte vérifiée | Contenu confirmé |
|---|---|---|---|
| von Frisch (danse) | Existe; année et édition absentes dans v3 | von Frisch K. (1967) *The Dance Language and Orientation of Bees*. Harvard UP (rééd. 1993, DOI 10.4159/harvard.9780674418776) [méta; 1967 lu dans la bibliographie de Seeley et al. 1996] | Encodage : angle de la course frétillante par rapport à la gravité ↔ direction par rapport au soleil; durée de la course ↔ distance [lu dans Hasenjager et al. 2022, qui cite von Frisch 1967] |
| Seeley, Camazine, Sneyd 1991 | Correct | *Behav Ecol Sociobiol* 28:277–290, DOI 10.1007/BF00175101 | La colonie réalloue ses butineuses quand le tableau des sources change; aucune butineuse ne compare les sources [résumé] |
| Camazine & Sneyd 1991 | Correct | *J Theor Biol* 149:547–571, DOI 10.1016/S0022-5193(05)80098-0 | Système d'EDO non linéaires; solutions conformes aux observations [résumé] |
| Seeley 1982 | Existe, mais mal utilisée (voir m1) | *Behav Ecol Sociobiol* 11:287–293, DOI 10.1007/BF00299306 | Porte sur la valeur adaptative du calendrier (tâches spatialement groupées par âge; 0–2 j : nettoyage des cellules), pas sur la séquence « nourrice → bâtisseuse → butineuse » [résumé] |
| Jones et al. 2004 | Correct; portée exagérée (voir M4) | Jones, Myerscough, Graham, Oldroyd, *Science* 305:402–404 | Colonies génétiquement diverses (plusieurs mâles) : température du couvain « tend à être plus stable »; seuils de ventilation différents selon les patrilignes [résumé] |
| Seeley 1992 | Correct | *Behav Ecol Sociobiol* 31:375–383, DOI 10.1007/BF00170604 | Danse de trémulation si source riche mais difficulté à trouver une receveuse; deux sens : receveuses (« traiter le nectar ») et butineuses (« ne plus recruter ») [résumé] |
| Seeley & Tovey 1994 | Correct | *Anim Behav* 47:311–316, DOI 10.1006/anbe.1994.1044 | Le temps de recherche d'une receveuse indique le rapport collecte/traitement [méta + titre] |
| Seeley & Visscher 2004 | Ambiguë : deux articles cette année-là | (a) « Quorum sensing during nest-site selection by honeybee swarms », *BES* 56:594–601; (b) « Group decision making in nest-site selection by honey bees », *Apidologie* 35:101–116, DOI 10.1051/apido:2004004 | (a) retarder le quorum retarde le piping et le décollage [résumé] |
| Seeley et al. 2012 | Correct | Seeley, Visscher, Schlegel, Hogan, Franks, Marshall, *Science* 335:108–111, DOI 10.1126/science.1210361 | Les éclaireuses visent les danseuses des **autres** sites; c'est un **modèle analytique** qui montre la levée de l'interblocage entre sites égaux [résumé] |
| Franks et al. 2002 | Correct | Franks, Pratt, Mallon, Britton, Sumpter, *Phil Trans R Soc B* 357:1567–1583 | Compare explicitement *Leptothorax (Temnothorax) albipennis* et *Apis mellifera*; « opinion polling » chez les deux [résumé] |
| Moritz et al. 1991 | Correct | Moritz, Kirchner, Crewe, *Naturwissenschaften* 78:179–182, DOI 10.1007/BF01136209 | Le sphinx partage des hydrocarbures cuticulaires des abeilles; rarement attaqué une fois dans la ruche [lu dans un résumé secondaire de la notice Springer] |
| Karaboga 2005 | Correct (rapport technique) | « An idea based on honey bee swarm for numerical optimization », TR06, Erciyes Univ., oct. 2005 | Testé sur Sphere 5D, Rosenbrock 2D, Rastrigin 10D [lu]. Version évaluée par les pairs : Karaboga & Basturk 2007, *J Glob Optim* 39:459–471 |

## 2. Constats détaillés

### Critique

**C1. Question transversale et projet 7 : la littérature apicole répond déjà à la question, et pas comme v3 le suppose.**
- v3 : « Comment la richesse du signal change-t-elle le gain collectif » et, pour le projet 7, « seul projet sans résultat publié à reproduire ».
- Constat [résumé] : Sherman & Visscher 2002 (*Nature* 419:920–922) ont désorienté les danses (plus d'information de direction). Ces colonies recrutent moins bien vers des nourrisseurs. Sur des sources naturelles, l'information de direction « augmente parfois la récolte, parfois ne change rien ». Donaldson-Matasci & Dornhaus 2012 (*BES* 66:583–592) font la même manipulation dans cinq habitats : la communication aide surtout quand la richesse florale est élevée et que les parcelles comptent beaucoup de fleurs. Beekman & Lew (*Behav Ecol*, en ligne 2007; 19:255–261, 2008) le montrent par simulation : la danse est avantageuse quand la découverte des sources est lente (parcelles rares ou lointaines). Okada et al. 2014 (*Sci Rep*, doi 10.1038/srep04175) : une erreur angulaire d'environ 15° aide quand les sources sont rares; une précision de 0–5° maximise la découverte des sources connues mais nuit à la découverte de nouvelles. Grüter & Farina 2009 (*TREE* 24:242–247) : les suiveuses ignorent souvent l'information de localisation, qui sert d'information de secours. Biesmeijer & Seeley 2005 : seulement 12–25 % des suivis de danse mènent à une source nouvelle; le reste réactive des butineuses expérimentées [lu dans Hasenjager et al. 2022].
- Conséquence [inféré] : l'hypothèse implicite (« plus de richesse → plus de gain ») est démentie chez l'abeille. Le gain dépend de l'environnement (dispersion, rareté, volatilité des ressources), et un signal plus précis peut nuire à l'exploration. Le projet 7 dispose donc d'un résultat publié à reproduire, et il est central.
- Recommandation : reformuler la question : « dans quels environnements la richesse du signal paie-t-elle, et quand nuit-elle à l'exploration ? » Ajouter au projet 1 ou 7 la reproduction de Sherman & Visscher 2002 (danses orientées vs désorientées) et du modèle de Beekman & Lew. Faire varier l'habitat (sources uniformes vs rares et riches). Transposer le même plan factoriel aux agents LLM : canal pauvre vs riche × environnement facile vs difficile.

### Majeur

**M1. Tableau, ligne « Oubli » : « attrition des danses » est le bon concept, mais seulement pour l'essaimage, et ce n'est pas une expiration de message.**
- [lu] Seeley & Visscher 2003 parlent du « steady attritional process of individuals ceasing to dance » (Camazine et al. 1999; Seeley 2003; Visscher 2003). Le terme est donc établi. [résumé] Seeley 2003 (*BES* 53:417–424, « the expiration of dissent ») : le nombre de circuits par retour décroît **linéairement** d'environ −15,7 circuits par retour; Seeley & Visscher 2008 (*JEB* 211:3691) mesurent −17,2. La décroissance est jugée d'origine interne et neurophysiologique.
- [lu dans un résumé secondaire de Seeley 2003, non confirmé dans le texte intégral] Cette décroissance serait propre à la recherche de nid; les danseuses de nectar ne la montrent pas au fil des visites. Elles modulent plutôt leurs circuits selon la rentabilité de la source [lu dans Seeley & Visscher 2008].
- Problèmes : (1) placée dans le tableau général, l'attrition s'applique implicitement au recrutement alimentaire (projet 1), où l'oubli tient plutôt à l'**abandon probabiliste** de la source (Seeley et al. 1991; Camazine & Sneyd 1991), aux danses modulées par la rentabilité et aux signaux d'arrêt. (2) La danse n'a aucune persistance : elle n'existe que pendant qu'on l'exécute. L'oubli est donc du côté de l'**émetteur** (son engagement baisse), pas du message. La correspondance « TTL vs expiration des messages » est fausse [inféré].
- Recommandation : scinder la ligne. Fourmi : évaporation (décroissance dans l'environnement, côté canal). Abeille, butinage : abandon de la source + recrutement modulé par la rentabilité. Abeille, essaim : attrition (engagement de l'émetteur qui décroît). Agentique : TTL côté canal vs **décroissance de l'engagement de l'agent** (ré-émissions décroissantes), qui est une propriété de l'agent et non du bus.

**M2. Projet 6 et tableau : « essaim scindé sans signaux d'arrêt » mélange deux phénomènes.**
- [lu] Seeley & Visscher 2003 recensent trois cas d'essaims ayant décollé alors que les danseuses étaient fortement divisées entre deux sites : deux essaims de Lindauer 1955 (2 sur 19), Balcony et Moosach, plus leur essaim 3. Dans ces trois cas, l'essaim en vol s'est divisé, a calé, puis s'est reposé. L'essaim Balcony a perdu sa reine. Les auteurs attribuent la scission au fait que le quorum (10–20 éclaireuses au site) peut être atteint **avant le consensus**. Le signal d'arrêt n'est pas en cause : il n'est ni mentionné ni mesuré.
- [résumé] Seeley et al. 2012 : c'est un **modèle analytique** qui montre que l'inhibition croisée évite l'**interblocage** (l'indécision) entre sites de qualité égale. Pais et al. 2013 (*PLoS ONE* 8:e73216) ajoutent que l'interblocage est **maintenu** quand les deux sites sont égaux et médiocres, et levé quand ils sont égaux et bons. L'indécision devant deux options médiocres est donc adaptative : elle garde les éclaireuses en exploration.
- Je n'ai trouvé aucune expérience qui supprime les signaux d'arrêt dans un essaim réel et observe une scission. Je ne peux pas exclure qu'elle existe.
- Recommandation : reformuler ainsi. « Interblocage : prédit par le modèle sans inhibition croisée (Seeley et al. 2012; Pais et al. 2013), adaptatif si les options sont médiocres. Scission en vol : observée quand un quorum est atteint sans consensus (Lindauer 1955; Seeley & Visscher 2003). » Simuler les deux modes séparément : faire varier δ (inhibition croisée) et le seuil de quorum. La correspondance avec le veto agentique tient pour l'inhibition croisée, pas pour la scission.

**M3. Projet 4 : la lecture en file d'attente n'est pas un « rapprochement non publié ».**
- [résumé] Ratnieks & Anderson 1999, « Task partitioning in insect societies. II. Use of queueing delay information in recruitment », *Am Nat* (DOI 10.1086/303256), analysent par simulation stochastique les délais de file d'attente entre butineuses et receveuses chez l'abeille et chez *Polybia*. Anderson & Ratnieks 1999, *BES* 46:73–81, portent sur la coordination butineuses/receveuses. Seeley & Tovey 1994 (Tovey est chercheur en recherche opérationnelle) expliquent pourquoi le temps de recherche reflète le rapport des taux de collecte et de traitement.
- Ce qui pourrait rester original [inféré, non vérifié] : la mise en regard fourmi (débit des retours) / abeille (temps d'attente) par la loi de Little. Attention : le temps de recherche de l'abeille est un temps d'appariement dans une file à deux côtés (les butineuses cherchent des receveuses et inversement). Ce n'est pas directement le W d'une file M/M/c, et ni la fourmi ni l'abeille ne mesure L.
- Recommandation : citer Seeley & Tovey 1994, Anderson & Ratnieks 1999 et Ratnieks & Anderson 1999. Restreindre la revendication d'originalité à la comparaison inter-espèces. Modéliser explicitement une file d'appariement à deux côtés. Paramètres vérifiés [lu, Seeley et al. 1996] : trémulation probable au-delà d'environ 40 s de recherche (Seeley 1992; Kirchner & Lindauer 1994); les receveuses passent de 17 % à 30–50 % de la colonie en moins de 9 h.

**M4. Projet 3 : Jones et al. 2004 est surinterprété (« une ruche homogène oscille ») et sa généralisation est contestée.**
- [résumé] Le résultat est que la température « tend à être plus stable » dans les colonies génétiquement diverses. La diversité est **génétique** : colonies issues d'un seul mâle vs de plusieurs, par insémination contrôlée [méta pour le protocole]. Le mécanisme proposé passe par des seuils de ventilation (refroidissement) qui varient selon les patrilignes. Le mot « oscille » n'est pas dans le résumé.
- [résumé] Simone-Finstrom et al. 2014 (*J Insect Behav*, DOI 10.1007/s10905-014-9447-3) : le degré de diversité génétique attendu en conditions normales « n'est pas prédictif » de la stabilité thermique.
- Recommandation : écrire « moins stable ». Préciser « diversité génétique (patrilignes) des seuils ». Reproduire le modèle de Graham et al. 2006 (*Insectes Soc* 53:226–232, chauffage et refroidissement à seuils variés) plutôt que d'affirmer une oscillation empirique. Mentionner la réplication partielle négative. Complément de référence : Mattila & Seeley 2007 (*Science* 317:362–364), où la diversité génétique accroît productivité et valeur adaptative [résumé].

**M5. Projet 3, parité : les fourmis ont une expérience de perturbation (Wilson 1984), les abeilles aucune.**
- [résumé] Huang & Robinson 1992 (*PNAS* 89:11726–11729) : quand on retire les butineuses ou qu'on manipule la démographie, les jeunes ouvrières deviennent butineuses précoces, jusqu'à environ deux semaines plus tôt. Les interactions entre ouvrières règlent l'hormone juvénile. Leoncini et al. 2004 (*PNAS* 101:17559–17564) : les butineuses produisent de l'éthyl oléate, transmis par trophallaxie, qui retarde l'entrée au butinage. C'est un mécanisme d'inhibition sociale sans coordinateur.
- Nuance sur le polyéthisme : Seeley & Kolmes 1991, « Age polyethism for hive duties in honey bees – illusion or reality? », *Ethology* 87:284–297 [méta, cité dans Seeley et al. 1996]. Les « travailleuses en réserve » : à tout moment, 50 % ou plus des ouvrières sont inactives [lu dans Seeley et al. 1996].
- Recommandation : ajouter pour l'abeille l'expérience « retrait des butineuses → maturation précoce » comme pendant exact du retrait de caste chez *Pheidole*. Modéliser l'inhibition sociale (un signal transmis par contact qui retarde le passage au butinage). Pendant agentique [inféré] : un pool d'agents de réserve, et une promotion des agents réglée par la densité des agents seniors.

**M6. Projet 5 : la transition décision → action (piping, buzz-run) est absente, alors que c'est le pendant exact du passage tandem → transport chez *Temnothorax*.**
- [lu] Seeley & Visscher 2003 : le quorum (10–15 abeilles ou plus au site) déclenche le **worker piping**. Ce signal vibratoire pousse l'essaim à réchauffer ses muscles de vol (≥ 35 °C) environ une heure avant le décollage. Le consensus des danseuses n'est ni nécessaire ni suffisant. La météo peut interrompre le piping. Les auteurs relient eux-mêmes ce mécanisme au quorum de 9–17 fourmis chez *L. albipennis* (Pratt et al. 2002). Le décollage a eu lieu même avec la **reine en cage** au support, ce qui soutient la thèse « la reine ne commande pas ».
- [méta] Seeley & Tautz 2001 (*J Comp Physiol A* 187:667–676), piping; Seeley et al. 2003 (*Naturwissenschaften* 90:256–260), échauffement; Rittschof & Seeley 2008 (*Anim Behav* 75:189–197), buzz-run, « Time to go! ».
- Recommandation : ajouter au projet 5 une chaîne en deux temps, symétrique chez les deux espèces : quorum → changement de mode (transport chez la fourmi; piping, échauffement et buzz-run chez l'abeille). Citer Seeley & Visscher 2003 comme source première du seuil de quorum, et 2004 (*BES*) pour le test. Pendant agentique : un engagement en deux phases (seuil, puis préparation, puis exécution) avec annulation possible si les conditions se dégradent.

**M7. Projet 2 : ABC n'est qu'une métaphore lâche de l'abeille, et la comparaison ACO/ABC est confondue par le type de problème.**
- [lu, Karaboga 2005] Dans ABC, la danse se réduit à une sélection proportionnelle à la qualité (roulette) : aucune direction ni distance n'est encodée. L'abandon passe par un paramètre « limit ». Le rapport TR06 donne pour Rastrigin l'intervalle [−600, 600] (inhabituel; c'est l'intervalle classique de Griewank), ce qui fragilise la reproduction de ses chiffres.
- [inféré] ACO sur Oliver30 (combinatoire) contre ABC sur Rastrigin (continu) : on compare deux algorithmes sur deux classes de problèmes, donc on ne peut rien attribuer au mécanisme. Ce projet ne reproduit d'ailleurs aucun résultat **biologique**, ni pour la fourmi ni pour l'abeille, ce qui déroge au critère de rigueur de v3.
- Recommandation : reproduire Karaboga & Basturk 2007 (*J Glob Optim* 39:459–471) et non TR06. Faire tourner les deux familles sur le même problème, par exemple une variante continue d'ACO et une variante combinatoire d'ABC (références à vérifier). Ajouter le Honey Bee Algorithm de Nakrani & Tovey 2004 (*Adaptive Behavior*, DOI 10.1177/105971230401200308) : allocation dynamique de serveurs inspirée du butinage, meilleur que les méthodes classiques sous charge variable [résumé]. Il est plus fidèle à la biologie (tableau d'annonces, abandon) et sert directement de pont vers l'agentique (répartition de charge).

**M8. Tableau, lignes « Canal » et « Contenu » : la dichotomie « fourmi = chimie / abeille = danse » est trop nette.**
- [résumé] Thom et al. 2007 (*PLoS Biol* 5:e228) : les danseuses émettent des alcanes et des alcènes (tricosane, pentacosane, (Z)-9-tricosène, (Z)-9-pentacosène); injectés dans la ruche, ils augmentent le nombre de sorties. La danse transporte aussi l'odeur florale; Sherman & Visscher 2002 parlent d'un recrutement fondé sur l'éveil des butineuses et l'odeur florale. Slessor, Winston & Le Conte 2005 (*J Chem Ecol* 31:2731–2745) recensent la communication phéromonale de l'abeille. Le contenu de la danse inclut aussi la qualité (nombre de circuits).
- Recommandation : présenter la danse comme un signal multicomposante (Grüter & Farina 2009) : vecteur + qualité + odeur + éveil. Côté fourmi, la ligne « Freinage : absence de retours » oublie les signaux négatifs actifs. Robinson et al. 2005 (*Nature* 438:442) décrivent une phéromone « no entry » chez *Monomorium pharaonis* [résumé]. À signaler à l'audit « bio-fourmis ».

**M9. Tableau, ligne « Freinage » : deux fonctions distinctes du signal d'arrêt et le double rôle de la trémulation sont confondus.**
- [résumé] Butinage : Nieh 2010 (*Curr Biol* 20:310–315). Le signal d'arrêt est déclenché par le danger (attaques à la source : ×43; morsure simulée : ×88; phéromone d'alarme : ×14). Il vise de préférence les nids-mates qui visitent **la même** source (rétroaction négative ciblée). Essaimage : Seeley et al. 2012. Il vise les danseuses des **autres** sites (inhibition croisée).
- [lu, Seeley et al. 1996] La trémulation recrute des receveuses et **inhibe** aussi les danses frétillantes : diffusées, ses vibrations font cesser les danseuses (Kirchner 1993, *BES* 33:169–172; Nieh 1993, *BES* 33:51–56).
- Recommandation : trois entrées. Trémulation : rééquilibrage par recrutement d'une autre tâche + inhibition du recrutement. Signal d'arrêt au butinage : auto-inhibition par source, déclenchée par le risque, comme un disjoncteur. Signal d'arrêt à l'essaim : inhibition croisée, comme un veto entre coalitions. Ce sont trois motifs agentiques différents [inféré].

**M10. Portée : l'« intelligence individuelle » de l'abeille est absente, alors qu'elle figure dans l'intention du chercheur.**
- [résumé] Menzel et al. 2005 (*PNAS* 102:3040–3045) : navigation selon une mémoire spatiale de type carte. Giurfa et al. 2001 (*Nature* 410:930–933) : concepts de « pareil » et « différent ». Esch et al. 2001 (*Nature* 411:581–583) : l'odomètre de la danse repose sur le flux optique et se trompe dans un tunnel texturé. Riley et al. 2005 (*Nature* 435:205–207) : le radar harmonique confirme que les recrues suivent le vecteur de la danse. Sumpter 2006 (*Phil Trans B*) : le butinage de l'abeille « ne peut être entièrement compris » à partir d'individus simples.
- Recommandation : ajouter un axe « capacité individuelle × architecture collective », chez l'abeille comme chez la fourmi (navigation, apprentissage), ou l'intégrer au projet 7. C'est la question que pose l'axe Haiku/Sonnet/Opus. Côté simulation : un odomètre bruité dépendant de la texture du paysage et une dispersion angulaire de la danse. Selon Tanner & Visscher 2010, cette dispersion relève de contraintes sensorielles plutôt que d'une adaptation [résumé].

**M11. Tableau, ligne « Recrutement → Délégation » : la danse est une annonce en mode « pull », pas une délégation.**
- [résumé] Seeley et al. 1991 : chaque butineuse ne connaît que sa source et calcule sa rentabilité absolue, sans comparer. Les recrues choisissent les danses qu'elles suivent. [inféré] La délégation suppose un délégant qui assigne, ce qui relève de l'orchestration. L'analogue chorégraphique est le tableau d'annonces ou la file de travail en « pull ». C'est d'ailleurs la métaphore de Nakrani & Tovey 2004 (« advert board ») [méta pour le terme exact].
- Recommandation : remplacer « Délégation » par « annonce / pull (tableau d'offres) » et garder « délégation » comme contre-exemple d'orchestration.

**M12. Projet 6 : *Acherontia* relève de l'usurpation d'identité, pas de l'injection de faux signaux. D'autres pathologies apicoles plus parlantes manquent.**
- [lu dans un résumé secondaire] Le sphinx contourne la reconnaissance des nids-mates par camouflage chimique. Il n'injecte aucun signal dans le canal de coordination. [inféré] L'analogue agentique est le contournement d'authentification ou l'usurpation d'identité, pas l'injection de prompt. Même remarque pour *Phengaris* chez la fourmi.
- Pathologies à ajouter :
  - **Effondrement par maturation précoce** [résumé]. Khoury, Myerscough & Barron 2011 (*PLoS ONE* 6:e18491) : au-delà d'un seuil de mortalité des butineuses, des recrues de plus en plus jeunes accélèrent le déclin. Perry et al. 2015 (*PNAS* 112:3427–3432) : les butineuses précoces font moins de voyages et meurent plus tôt; la rétroaction positive mène à l'effondrement de la division du travail. C'est une pathologie de chorégraphie par excellence, que v3 ignore. Pendant agentique [inféré] : promotion prématurée d'agents sous charge, puis cascade.
  - **Parasite social clonal** [méta] : l'abeille du Cap (*A. m. capensis*), dont les ouvrières pondeuses envahissent les colonies de *A. m. scutellata* (Oldroyd 2002, *TREE* 17:249–251, « social cancer »; Neumann & Moritz 2002, *BES* 52:271–281). Pendant agentique : un agent compromis qui se réplique.
  - **Mimétisme comportemental du protocole** [méta; contenu de mémoire, à vérifier] : le petit coléoptère de la ruche (*Aethina tumida*) obtiendrait sa nourriture en imitant la sollicitation trophallactique (Ellis et al. 2002, *Naturwissenschaften* 89:326–328). C'est un meilleur analogue de l'injection, puisqu'il exploite le protocole et non l'identité.
- Recommandation : classer les pathologies par couche (identité, canal, dynamique) et donner à l'abeille un résultat reproductible empirique (Perry et al. 2015) et non seulement un modèle.

**M13. Projet 1, parité : chaque espèce a son expérience, ce qui empêche la comparaison.**
- v3 : fourmis = verrouillage sur la branche longue (ordre d'arrivée); abeilles = réallocation après inversion de qualité.
- [inféré] Le pont double n'a pas de sens pour l'abeille, qui vole en ligne droite vers la source codée. Le protocole commun naturel est l'inversion de qualité entre deux sources. Le contraste publié existe : Beckers et al. 1990 (*Insectes Soc* 37:258–267), où des fourmis ne basculeraient pas vers une meilleure source tardive [méta; référence lue dans la bibliographie de Seeley & Visscher 2003, contenu de mémoire], contre Seeley et al. 1991, où l'abeille bascule [résumé].
- Recommandation : un même protocole pour les deux espèces (deux sources, inversion de qualité à t). Garder le pont double comme expérience propre à la fourmi, en le signalant comme asymétrique.

### Mineur

- **m1.** Seeley 1982 ne fonde pas la séquence « nourrice → bâtisseuse → butineuse ». La séquence omet le nettoyage des cellules (0–2 j, [résumé]), la réception et le stockage, et la garde. Elle est aussi plastique (M5). Recommandation : citer une synthèse pour la séquence (p. ex. Seeley 1995, *The Wisdom of the Hive*) et Seeley 1982 pour sa logique spatiale.
- **m2.** « Seeley et Visscher 2004 » est ambigu (*BES* 56:594–601 vs *Apidologie* 35:101–116). Préciser lequel, et ajouter Seeley & Visscher 2003 (*BES* 54:511–520).
- **m3.** von Frisch est cité sans année. Citer 1967 (Harvard UP, trad. de l'éd. allemande de 1965 [méta, de mémoire pour 1965]). Préciser l'encodage : angle/gravité ↔ direction/soleil; durée de la course ↔ distance (Hasenjager et al. 2022). Distance mesurée par flux optique (Esch et al. 2001).
- **m4.** « Symbolique » se défend : Sherman & Visscher 2002 parlent de « symbolic communication », Donaldson-Matasci & Dornhaus 2012 de « symbolically convey » [résumé]. Mais l'encodage est continu et analogique (un angle pour un angle, une durée pour une distance). Pour les visuels et le moteur : vecteur continu, dispersion angulaire et erreur d'odomètre, pas un code discret. La « danse en rond » ne devrait probablement pas être une danse distincte (Gardner, Seeley & Calderone 2008, *Anim Behav* 75:1291–1300; Griffin, Smith & Seeley 2012, *Anim Behav* 83:1319–1324, sur l'information directionnelle des danses en rond) [méta; contenu non lu].
- **m5.** « Piste de danse du nid » ne vaut que pour le butinage. Pour l'essaim, les danses ont lieu à la surface de la grappe [lu, Seeley & Visscher 2003].
- **m6.** Thèse « la reine ne commande pas » : appuyée pour la recherche de nid (décision prise reine en cage, [lu]). Mais la reine diffuse des phéromones régulatrices (Slessor et al. 2005, [résumé]). Formuler : « la reine diffuse, elle n'ordonne pas ».
- **m7.** Toutes les références « abeilles » de v3 manquent de volume, pages et DOI. Utiliser le tableau de la section 1.
- **m8.** Projet 3 : Jones et al. 2004 ne traite que de la ventilation (refroidissement), d'après le résumé. Le chauffage par « heater bees » (Kleinhenz et al. 2003, *JEB* 206:4217–4231 : couvain maintenu à 33–36 °C, abeilles chauffantes immobiles dans les cellules vides) et la ventilation collective (Peters, Peleg & Mahadevan 2019, *J R Soc Interface* 16:20180561 : groupes de ventileuses auto-organisés à l'entrée, modèle à l'appui) sont de meilleurs objets de simulation, eux aussi publiés [résumé].
- **m9.** Paramètres de simulation à préciser, que v3 ne donne pas, et qui sont vérifiés : quorum de 10–20 éclaireuses au site [lu]; quorum de 9–17 fourmis chez *L. albipennis* [lu, cité par Seeley & Visscher 2003]; attrition de −15,7 à −17,2 circuits par retour [résumé]; trémulation au-delà d'environ 40 s de recherche [lu]; receveuses de 17 % à 30–50 % de la colonie [lu]; piping environ 1 h avant le décollage, échauffement ≥ 35 °C [lu].

## 3. Réponses aux deux questions ciblées

1. **« Attrition des danses » est-il le bon concept ?** Oui pour la recherche de nid par l'essaim : le terme est employé par Seeley & Visscher 2003 et mesuré par Seeley 2003. Non comme mécanisme général d'« oubli » de la ruche : au butinage, c'est l'abandon probabiliste et la modulation des danses par la rentabilité qui jouent ce rôle. Et non comme équivalent d'une expiration de message : c'est l'engagement de l'émetteur qui décroît (M1).
2. **Un essaim se scinde-t-il réellement sans signaux d'arrêt ?** Les scissions en vol sont réelles mais rares (2 essaims sur 19 chez Lindauer 1955, plus un essaim chez Seeley & Visscher 2003). Elles sont attribuées à un décollage déclenché par quorum alors que les danseuses restent divisées, pas à l'absence de signaux d'arrêt. Le rôle des signaux d'arrêt contre l'**interblocage** est démontré par modèle, pas par suppression expérimentale (M2). Je n'ai trouvé aucune expérience de suppression des signaux d'arrêt dans un essaim réel. Ce qui trancherait : le texte intégral de Seeley et al. 2012 et de Seeley 2010 (*Honeybee Democracy*).

## 4. Parité fourmis/abeilles, projet par projet

| Projet | Fourmi | Abeille | Parité | Correctif |
|---|---|---|---|---|
| 1 Recrutement | Résultat reproductible (Goss 1989) | Résultat reproductible (Seeley et al. 1991) + modèle (Camazine & Sneyd 1991) | Moyenne : expériences différentes | Protocole commun d'inversion de qualité (M13) |
| 2 ACO/ABC | Algorithme fidèle aux expériences (Deneubourg, Goss) | Métaphore lâche (ABC) | Faible | Même problème pour les deux + Nakrani & Tovey 2004 (M7) |
| 3 Division du travail | 3 résultats (seuils, retrait de caste, seuils renforcés) | 1 résultat (Jones 2004), surinterprété | Faible | Huang & Robinson 1992, Leoncini 2004 (M4, M5) |
| 4 Régulation | Prabhakar et al. 2012 | Seeley 1992, Seeley & Tovey 1994, Seeley et al. 1996 | Bonne | Citer la théorie des files déjà publiée (M3) |
| 5 Quorum | Pratt 2002/2005, Franks 2003 | Seeley & Visscher 2003/2004, Seeley et al. 2012 | Bonne sur le quorum; l'inhibition croisée est propre à l'abeille | Transition quorum → action pour les deux (M6); dire que la levée d'égalité n'a pas d'équivalent documenté chez *Temnothorax* dans v3 |
| 6 Pathologies | Moulin : empirique (Schneirla) + modèle (Couzin) | Scission : empirique mais mal attribuée; interblocage : modèle | Moyenne | Ajouter l'effondrement par maturation précoce (Perry 2015) (M12) |
| 7 Synthèse | — | Littérature publiée sur la valeur du signal | — | Reproduire Sherman & Visscher 2002 (C1) |

## 5. Mécanismes apicoles majeurs absents de v3

1. Worker piping, échauffement et buzz-run : de la décision à l'action (M6).
2. Guidage de l'essaim en vol par une minorité informée (« streakers »). Références à vérifier : Beekman et al. 2006; Schultz et al. 2008; Couzin et al. 2005 (*Nature*) pour le principe de la minorité informée.
3. Inhibition sociale par l'éthyl oléate, transmise par trophallaxie; maturation précoce et réversion (M5).
4. Trophallaxie comme réseau d'information (Leoncini et al. 2004; Hasenjager et al. 2022).
5. Signal de secousse (shaking signal), modulateur d'activité (Hasenjager et al. 2022, [lu dans le résumé de la revue]).
6. Signal d'arrêt du butinage déclenché par le danger (Nieh 2010) (M9).
7. Stigmergie de construction et motif du rayon (couvain, pollen, miel) : Camazine 1991 (*BES* 28, DOI 10.1007/BF00172140); Jenkins et al. 1992 (*J Math Biol* 30:281–306). C'est le pendant apicole des pistes et des nids de fourmis, et un excellent objet de simulation [méta].
8. Régulation de la récolte de pollen (Camazine 1993, *BES* 32, DOI 10.1007/BF00166516) et d'eau (Kühnholz & Seeley 1997, *BES* 41:407–422) [méta].
9. Thermorégulation active : abeilles chauffantes, ventilation collective (m8).
10. Division éclaireuses/recrues, compromis exploration/exploitation : Seeley 1983, *BES* 12:253–259 [méta]; voir aussi Karaboga 2005, qui cite 5–10 % d'éclaireuses d'après Seeley 1995 [lu].
11. Cognition individuelle : carte spatiale, concepts, odomètre visuel (M10).
12. Phéromones de la reine et du couvain : régulation diffusée, pas commandement (m6).
13. Réserve de main-d'œuvre inactive (≥ 50 %) et « foraging for work » (Tofts & Franks 1992) comme modèle concurrent du polyéthisme [lu dans Seeley et al. 1996].
14. Pathologies dynamiques et parasites sociaux (M12).

## 6. Recommandations prioritaires

1. Réécrire la question transversale autour de la dépendance à l'environnement, et faire de Sherman & Visscher 2002 et Beekman & Lew 2008 les résultats à reproduire du projet 7 (C1).
2. Corriger le tableau : lignes « Oubli » (M1), « Freinage » (M9), « Canal/Contenu » (M8), « Recrutement » (M11).
3. Réattribuer la scission et l'interblocage (M2) et ajouter piping et buzz-run au projet 5 (M6).
4. Rééquilibrer les projets 2 et 3 (M5, M7), harmoniser le protocole du projet 1 (M13).
5. Retirer « rapprochement non publié » (M3) et nuancer Jones et al. 2004 (M4).
6. Compléter les références (section 1). Avant publication, lire en texte intégral Seeley et al. 2012, Seeley 2003, Gardner et al. 2008, Dornhaus & Chittka 2004 et Ellis et al. 2002, dont je n'ai vu que les résumés ou les métadonnées.

## Sources consultées

- Seeley & Visscher 2003, PDF intégral : https://bees.ucr.edu/sites/default/files/2020-06/bes54.pdf
- Seeley, Kühnholz & Weidenmüller 1996, PDF intégral : https://kops.uni-konstanz.de/server/api/core/bitstreams/b639f436-eab0-4b3c-869d-c50dea0f2f6a/content
- Karaboga 2005, TR06, PDF intégral : https://abc.erciyes.edu.tr/pub/tr06_2005.pdf
- Seeley 1982 : https://link.springer.com/article/10.1007/BF00299306
- Seeley 1992 : https://link.springer.com/article/10.1007/BF00170604
- Seeley, Camazine & Sneyd 1991 : https://doi.org/10.1007/BF00175101
- Camazine & Sneyd 1991 : https://doi.org/10.1016/S0022-5193(05)80098-0
- Seeley & Tovey 1994 : https://doi.org/10.1006/anbe.1994.1044
- Seeley & Visscher 2004 (*BES*) : https://link.springer.com/article/10.1007/s00265-004-0814-5
- Seeley & Visscher 2004 (*Apidologie*) : https://doi.org/10.1051/apido:2004004
- Seeley 2003 : https://link.springer.com/article/10.1007/s00265-003-0598-z
- Seeley & Visscher 2008 (*JEB*) : https://journals.biologists.com/jeb/article/211/23/3691/17956/Sensory-coding-of-nest-site-value-in-honeybee
- Seeley et al. 2012, résumé : https://research-information.bris.ac.uk/en/publications/stop-signals-provide-cross-inhibition-in-collective-decision-maki ; https://www.science.org/doi/10.1126/science.1210361
- Pais et al. 2013 : https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0073216
- Jones et al. 2004 : https://pubmed.ncbi.nlm.nih.gov/15218093/
- Graham et al. 2006 : https://link.springer.com/article/10.1007/s00040-005-0862-5
- Simone-Finstrom et al. 2014 : https://doi.org/10.1007/s10905-014-9447-3
- Franks et al. 2002 : https://asu.elsevierpure.com/en/publications/information-flow-opinion-polling-and-collective-intelligence-in-h/
- Moritz, Kirchner & Crewe 1991 : https://link.springer.com/article/10.1007/BF01136209
- Karaboga & Basturk 2007 : https://doi.org/10.1007/s10898-007-9149-x
- Nakrani & Tovey 2004 : https://doi.org/10.1177/105971230401200308
- Anderson & Ratnieks 1999 : https://doi.org/10.1007/s002650050595
- Ratnieks & Anderson 1999 : https://doi.org/10.1086/303256
- Nieh 2010 : https://europepmc.org/search?query=%22negative%20feedback%20signal%20that%20is%20triggered%20by%20peril%22
- Sherman & Visscher 2002 : https://europepmc.org/search?query=%22Honeybee%20colonies%20achieve%20fitness%20through%20dancing%22
- Donaldson-Matasci & Dornhaus 2012 : https://europepmc.org/search?query=%22How%20habitat%20affects%20the%20benefits%20of%20communication%22
- Beekman & Lew 2008 : https://doi.org/10.1093/beheco/arm117
- Dornhaus & Chittka 2004 : https://doi.org/10.1007/s00265-003-0726-9
- Okada et al. 2014 : https://doi.org/10.1038/srep04175
- Grüter & Farina 2009 : https://europepmc.org/search?query=%22can%20we%20follow%20the%20steps%22
- Biesmeijer & Seeley 2005 : https://doi.org/10.1007/s00265-005-0019-6
- Hasenjager, Franks & Leadbeater 2022 : https://link.springer.com/article/10.1007/s00265-022-03218-1
- Riley et al. 2005; Thom et al. 2007; Esch et al. 2001 : https://europepmc.org/search?query=%22scent%20of%20the%20waggle%20dance%22
- Tanner & Visscher 2010; Girard, Mattila & Seeley 2011; Sumpter 2006 : via Europe PMC (requête « round dance waggle Seeley »)
- Gardner, Seeley & Calderone 2008 : https://doi.org/10.1016/j.anbehav.2007.09.032
- Griffin, Smith & Seeley 2012 : https://doi.org/10.1016/j.anbehav.2012.03.003
- Huang & Robinson 1992; Leoncini et al. 2004; Perry et al. 2015 : https://europepmc.org/search?query=%22Rapid%20behavioral%20maturation%20accelerates%20failure%22
- Khoury, Myerscough & Barron 2011; Kleinhenz et al. 2003; Peters et al. 2019 : https://europepmc.org/search?query=%22Collective%20ventilation%20in%20honeybee%20nests%22
- Menzel et al. 2005; Giurfa et al. 2001; Mattila & Seeley 2007 : https://europepmc.org/search?query=%22map-like%20spatial%20memory%22
- Slessor, Winston & Le Conte 2005 : https://europepmc.org/search?query=%22Pheromone%20communication%20in%20the%20honeybee%22
- Robinson et al. 2005 (« no entry ») : https://europepmc.org/search?query=%22no%20entry%20signal%20in%20ant%20foraging%22
- Seeley & Tautz 2001 : https://doi.org/10.1007/s00359-001-0243-0
- Seeley et al. 2003 (échauffement) : https://doi.org/10.1007/s00114-003-0425-4
- Rittschof & Seeley 2008 : https://doi.org/10.1016/j.anbehav.2007.04.026
- Camazine 1991 (rayon) : https://doi.org/10.1007/BF00172140
- Camazine 1993 (pollen) : https://doi.org/10.1007/BF00166516
- Kühnholz & Seeley 1997 : https://doi.org/10.1007/s002650050402
- Seeley 1983 : https://doi.org/10.1007/BF00290778
- Oldroyd 2002 : https://doi.org/10.1016/S0169-5347(02)02479-5
- Neumann & Moritz 2002 : https://doi.org/10.1007/s00265-002-0518-7
- Ellis et al. 2002 : https://doi.org/10.1007/s00114-002-0326-y
- von Frisch 1967/1993 : https://doi.org/10.4159/harvard.9780674418776

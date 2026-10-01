# Constats — Biologie des fourmis

Source : [rapport complet](bio-fourmis.md). 21 constats (1 critiques, 8 majeurs, 12 mineurs) et 18 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** Les attributions bibliographiques de v3 sur les fourmis sont presque toutes justes (auteurs, années, revues). Il reste une erreur critique : le résultat de Wilson 1984 est inversé, car ce sont les majors qui reprennent les tâches des minors retirés. On compte aussi huit erreurs majeures de modélisation biologique : - le moulin des légionnaires est rattaché au tore de Couzin et al. 2002, un modèle pour poissons et oiseaux, sans phéromone; - le tableau crée une fausse asymétrie de freinage, alors que les fourmis ont des signaux négatifs explicites; - le signal des fourmis est réduit à un scalaire; - « la fourmi » est traitée comme une seule espèce, alors que les exemples couvrent au moins cinq genres aux mécanismes distincts; - le projet 1 compare des manipulations non appariées (longueur de chemin contre qualité de source), et le blocage n'est pas un trait général; - la fonction de choix est donnée sans k ni n et présentée comme une règle individuelle, ce que contredit Perna et al. 2012; - l'analogie TCP est attribuée à un article qui ne la fait pas; - la thèse sur la reine est à borner. Certaines primaires n'ont pas pu être lues en texte intégral (paywalls, quotas de recherche épuisés). Ces points s'appuient sur des sources secondaires ou sont marqués comme non vérifiés, notamment k ≈ 20.

## Constats

### BF-01 · critique · §3 Division du travail, « À reproduire »

**Constat.** v3 dit « les petites ouvrières prennent la relève ». Wilson 1984 montre l'inverse : quand on abaisse le ratio minors:majors sous 1:1 (P. guilelmimuelleri, P. megacephala, P. pubiventris), ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5), augmentent leur activité (×15 à 30) et rétablissent au moins 75 % de l'activité des minors manquants. Bonabeau et al. 1996 modélisent précisément cela.

**Preuve.** https://link.springer.com/article/10.1007/BF00293108 (résumé éditeur via l'index de recherche); résumé de Bonabeau et al. 1996 https://doi.org/10.1098/rspb.1996.0229

**Recommandation.** Écrire : retrait des minors → les majors, à seuil élevé, prennent le relais quand le stimulus monte. Cibles quantitatives : facteur d'activité et part d'activité rétablie.

**Disposition.** _à renseigner_

### BF-02 · majeur · §6 Pathologies, fourmis (moulin)

**Constat.** La « phase tore de Couzin et al. 2002 » vient d'un modèle 3D à zones (répulsion, orientation, attraction) pour bancs de poissons et volées d'oiseaux, sans phéromone. Le moulin des légionnaires vient du suivi de piste phéromonale chez des fourmis aveugles (Schneirla 1944; Delsuc 2003). Le modèle propre aux fourmis est Couzin et Franks 2003 (Eciton burchellii, suivi de piste et évitement, conditions périodiques, figure « Circular milling »).

**Preuve.** Résumé Europe PMC de Couzin et al. 2002; texte intégral de Couzin et Franks 2003 https://www.sccs.swarthmore.edu/users/08/bblonder/phys120/docs/couzin.pdf; https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.0000037

**Recommandation.** Simuler le moulin fourmi avec un modèle de suivi de piste (base : Couzin et Franks 2003, paramètre d'ordre F). Montrer le tore de 2002 seulement comme contrepoint : même motif, autre mécanisme.

**Disposition.** _à renseigner_

### BF-03 · majeur · Tableau « Deux chorégraphies », ligne Freinage

**Constat.** « Absence de retours » laisse croire que seule l'abeille a un frein actif. Or Monomorium pharaonis dépose une phéromone répulsive « no entry » (Robinson et al. 2005), et Lasius niger subit une inhibition par encombrement (Dussutour et al. 2004). L'absence de retours ne vaut que pour Pogonomyrmex.

**Preuve.** Résumés Europe PMC : Robinson et al. 2005, Nature 438:442; Dussutour et al. 2004, Nature 428:70-73; Czaczkes et al. 2015, Annu Rev Entomol 60:581-599

**Recommandation.** Ligne Freinage côté fourmi : évaporation, phéromone répulsive, inhibition par encombrement, baisse du taux de rencontres. Ajouter une variante « no entry » à comparer au signal d'arrêt de l'abeille.

**Disposition.** _à renseigner_

### BF-04 · majeur · Tableau, ligne Contenu du signal; question transversale

**Constat.** « Intensité (scalaire) » est une simplification de modèle, pas un fait biologique. Le signal des fourmis combine plusieurs phéromones (attractive ou répulsive), une polarité par la géométrie des bifurcations (Jackson et al. 2004), une modulation selon la source, une mémoire privée qui rivalise avec la piste (Grüter et al. 2011) et un tandem à rétroaction bidirectionnelle (Franks et Richardson 2006). L'échelle « scalaire → symbole → langage » s'en trouve faussée.

**Preuve.** Résumés Europe PMC : Jackson et al. 2004, Nature 432:907-909; Franks et Richardson 2006, Nature 439:153. Grüter et al. 2011 : doi:10.1007/s00265-010-1020-2 (bibliographie seulement; le résultat est de mémoire)

**Recommandation.** Reformuler en « scalaires multiples, localisés et signés + géométrie + mémoire privée ». Assumer le scalaire comme simplification de Deneubourg. Ajouter au moteur une variable « information privée vs sociale ».

**Disposition.** _à renseigner_

### BF-05 · majeur · Tableau et projets 1 à 6 (cadrage « la fourmilière »)

**Constat.** v3 traite « la fourmi » comme une seule espèce, alors que les exemples mobilisent Linepithema (piste de masse), Pheidole (castes), Pogonomyrmex (fourragement sans piste, réglé par les contacts), Temnothorax (tandem et quorum) et Eciton/Labidus (légionnaires). Le canal « piste chimique » ne vaut ni pour Pogonomyrmex ni pour le tandem. Côté abeille, une seule espèce : on compare une espèce à un ordre.

**Preuve.** Prabhakar et al. 2012 : « no need for pheromone trails », https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002670 ; le reste est inféré à partir des sources citées

**Recommandation.** Faire un tableau mécanisme × espèce nommée, et des préréglages par espèce dans le moteur. Présenter la diversité des fourmis comme une variable explicative.

**Disposition.** _à renseigner_

### BF-06 · majeur · §1 Recrutement, « À reproduire »

**Constat.** (a) Manipulations non appariées : chez la fourmi, raccourci ajouté tard (Goss 1989); chez l'abeille, inversion de qualité des sources (Seeley 1991). L'effet de l'espèce se confond avec celui de la manipulation. (b) « Fourmis bloquées » n'est pas général : Pheidole megacephala suit les changements de source (Dussutour et al. 2009, « unlike many other mass recruiting species »), et Linepithema humile s'adapte aux blocages dans un labyrinthe grâce à la phéromone d'exploration (Reid et al. 2011) et aux demi-tours (Reid et al. 2012).

**Preuve.** Résumés Europe PMC : Dussutour et al. 2009, Proc R Soc B 276:4353-4361; Reid et al. 2011, J Exp Biol 214:50-58. Bonabeau et al. 2000, Nature 406:39-42 (texte lu)

**Recommandation.** Apparier : changement de qualité de source des deux côtés (Dussutour 2009; Beckers et al. 1990, Insectes Soc 37:258-267) et, à part, raccourci tardif côté fourmi. Montrer le blocage et sa levée (évaporation, bruit, demi-tours).

**Disposition.** _à renseigner_

### BF-07 · majeur · §1, fonction de choix de Deneubourg

**Constat.** k et n ne sont pas donnés, ce qui rend le critère de reproduction inapplicable. n ≈ 2 est vérifié par des sources secondaires (Perna 2012; Dorigo et Stützle 2004, qui disent α = 2 dérivé de Deneubourg 1990). k ≈ 20 n'a pas pu être vérifié (de mémoire seulement); chez Dorigo et Stützle, la constante est t_s. A et B y sont des passages cumulés sans évaporation, avec dépôt aller-retour. Surtout, Perna et al. 2012 mesurent une réponse individuelle de type Weber (proportionnelle) : le sigmoïde n = 2 est un ajustement collectif.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002592 ; https://web2.qatar.cmu.edu/~gdicaro/15382/additional/aco-book.pdf (ch. 1)

**Recommandation.** Fixer n = 2 (sources citées). Traiter k comme dépendant du dispositif, avec analyse de sensibilité, et confirmer k ≈ 20 dans le PDF de Deneubourg 1990. Préciser la signification de A et B. Ajouter un mode « Weber individuel + bruit » qui reproduit le sigmoïde collectif.

**Disposition.** _à renseigner_

### BF-08 · majeur · §4 Régulation, fourmis (analogie TCP)

**Constat.** L'article de Prabhakar, Dektar et Gordon 2012 ne parle pas de TCP; il évoque seulement les « computer networks ». L'analogie TCP (« anternet ») vient du communiqué de Stanford (2012) puis de Gordon 2014 (PLoS Biol). v3 ne nomme pas l'espèce (Pogonomyrmex barbatus). Le stimulus réel est le taux de contacts antennaires avec les butineuses qui reviennent avec de la nourriture.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002670 ; https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001805 ; https://engineering.stanford.edu/news/stanford-biologist-and-computer-scientist-discover-anternet

**Recommandation.** Citer Gordon 2014 pour l'analogie et Prabhakar 2012 pour le modèle. Nommer l'espèce. Restreindre l'analogie à l'auto-cadencement par ACK. Simuler aussi les limites signalées par les auteurs (variabilité entre colonies, météo).

**Disposition.** _à renseigner_

### BF-09 · majeur · Thèse « la reine ne commande pas »

**Constat.** Une classe conservée d'hydrocarbures sert de phéromone royale et empêche la reproduction des ouvrières chez des guêpes, des bourdons et des fourmis (Van Oystaeyen et al. 2014; généralité contestée chez Bombus par Amsalem et al. 2015). Sans borne, la thèse est attaquable.

**Preuve.** Résumés Europe PMC : Van Oystaeyen et al. 2014, Science 343:287-290; Amsalem et al. 2015, Proc R Soc B 282:20151800

**Recommandation.** Écrire : la reine ne dirige ni le travail ni les décisions collectives, mais émet un signal d'état qui règle la reproduction.

**Disposition.** _à renseigner_

### BF-10 · mineur · §3, seuils de réponse

**Constat.** Le modèle à seuils est présenté sans ses limites. Ulrich et al. 2021 (120 colonies d'Ooceraea biroi) montrent que la variation des seuils seule ne reproduit pas les patrons observés. Le résultat de Theraulaz 1998 est une prédiction de modèle, pas une mesure. La forme s²/(s²+θ²) n'a pas pu être relue dans le texte primaire.

**Preuve.** https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001269 ; Crossref pour Bonabeau 1996 (263:1565-1569) et Theraulaz 1998 (265:327-332)

**Recommandation.** Ajouter Ulrich 2021 comme borne et un curseur « efficacité individuelle ». Étiqueter Theraulaz 1998 comme prédiction.

**Disposition.** _à renseigner_

### BF-11 · mineur · §6, Phengaris

**Constat.** Phengaris (= Maculinea) combine mimétisme chimique et mimétisme acoustique des sons de la reine (Barbero et al. 2009). Elle trompe la reconnaissance coloniale, pas le canal de coordination. L'analogie avec la prompt injection est donc imprécise : c'est plutôt de l'usurpation d'identité ou de l'élévation de privilège.

**Preuve.** Résumés Europe PMC : Barbero et al. 2009, Science 323:782-785 et J Exp Biol 212:4084-4090; Nash et al. 2008, Science 319:88-90; Allies et al. 1986, J Chem Ecol 12:1285-1293. Aswale et al. 2022 : https://arxiv.org/html/2202.01808v2

**Recommandation.** Garder Phengaris pour l'usurpation d'identité. Pour le faux signal, ajouter les substances de propagande de Leptothorax kutteri (Allies et al. 1986) et Aswale et al. 2022 (AAMAS : 3 % de détracteurs divisent la collecte par ~150; défense par phéromone de prudence). Chercher aussi sous le nom Maculinea.

**Disposition.** _à renseigner_

### BF-12 · mineur · §1, Goss et al. 1989

**Constat.** v3 ne précise ni l'espèce (Iridomyrmex humilis = Linepithema humile), ni le rapport de longueurs (r = 2), ni le délai (30 min), ni les effectifs (14 essais simultanés, 18 essais tardifs). Le résultat est statistique : une colonie peut parfois rester sur la branche longue même en présentation simultanée.

**Preuve.** Bonabeau et al. 2000, figure 2 « modified from » Goss 1989 (texte lu); Dorigo et Stützle 2004, ch. 1

**Recommandation.** Donner ces paramètres, et reproduire des distributions sur l'ensemble des essais plutôt qu'une trajectoire unique.

**Disposition.** _à renseigner_

### BF-13 · mineur · §1, attribution de la fonction de choix

**Constat.** Deneubourg et al. 1990 porte d'abord sur le patron exploratoire. La référence classique sur la décision collective, Deneubourg et Goss 1989, manque.

**Preuve.** Bibliographie de Bonabeau et al. 2000 (réf. 1); résumé de Deneubourg et al. 1990 via Consensus

**Recommandation.** Ajouter Deneubourg et Goss 1989, Ethol Ecol Evol 1:295-311.

**Disposition.** _à renseigner_

### BF-14 · mineur · §5, Pratt et al. 2002 et 2005

**Constat.** En 2002, l'espèce s'appelait Leptothorax albipennis. Crossref liste aussi une notice Anim Behav 71:478 (2006) au même titre que Pratt et al. 2005 : probablement un erratum, non vérifié.

**Preuve.** Crossref : doi:10.1007/s00265-002-0487-x ; doi:10.1016/j.anbehav.2005.01.022 ; doi:10.1016/j.anbehav.2005.11.001

**Recommandation.** Citer avec le nom d'origine et le nom actuel. Lire la notice de 2006 avant de reprendre des paramètres.

**Disposition.** _à renseigner_

### BF-15 · mineur · §5, curseur de quorum

**Constat.** La référence la plus directe manque : Pratt et Sumpter 2006 (PNAS). Chez Temnothorax curvispinosus, quorum de 5,7 ± 0,5 fourmis en émigration forcée contre 12,7 ± 0,6 en émigration non forcée (ajustement par fonction de Hill), avec des taux de recherche et d'acceptation plus élevés en émigration forcée.

**Preuve.** https://pmc.ncbi.nlm.nih.gov/articles/PMC1635101/

**Recommandation.** En faire la cible quantitative du projet 5 côté fourmi.

**Disposition.** _à renseigner_

### BF-16 · mineur · §5 et §6, bris d'égalité et interblocage

**Constat.** v3 ne donne pas d'expérience fourmi correspondant à « l'inhibition croisée débloque une égalité ». Aucune inhibition croisée ni aucun signal d'arrêt n'est mentionné chez Temnothorax dans Pratt et Sumpter 2006. Qu'il n'en existe aucun nulle part reste une supposition.

**Preuve.** https://pmc.ncbi.nlm.nih.gov/articles/PMC1635101/ (absence de mention); le reste est inféré

**Recommandation.** Spécifier l'expérience fourmi (deux sites de qualité égale) avec une sortie sourcée, ou présenter l'asymétrie comme un résultat comparatif.

**Disposition.** _à renseigner_

### BF-17 · mineur · §6, Schneirla 1944

**Constat.** La référence est correcte (Am Mus Novit 1253; Barro Colorado). Mais la première description publiée est celle de Beebe 1921, et l'espèce (Labidus praedator, d'après ma mémoire) n'a pas été vérifiée.

**Preuve.** https://striresearch.si.edu/barrocolorado100/ants/ ; https://en.wikipedia.org/wiki/Ant_mill

**Recommandation.** Ajouter Beebe 1921, et confirmer l'espèce dans le texte de l'AMNH.

**Disposition.** _à renseigner_

### BF-18 · mineur · §2, ACO

**Constat.** Le visuel suggère une équivalence avec les fourmis réelles. Or Bonabeau et al. 2000 notent que l'évaporation de l'ACO a été poussée « beyond biological plausibility », et chez les fourmis réelles l'évaporation joue un rôle mineur dans la découverte du plus court chemin. η^β, la liste tabou et le dépôt proportionnel à la qualité du tour n'ont pas d'équivalent biologique direct.

**Preuve.** Bonabeau et al. 2000 (texte lu); Dorigo et Stützle 2004, ch. 1; Crossref doi:10.1109/3477.484436

**Recommandation.** Le dire dans le visuel et dans la note de recherche. La référence Dorigo 1996 est juste (IEEE SMC-B 26(1):29-41).

**Disposition.** _à renseigner_

### BF-19 · mineur · Tableau, ligne Canal (« persistante »)

**Constat.** La persistance varie : chez L. humile, demi-vie d'environ 30 min pour la phéromone synthétique (borne inférieure) contre environ 4 h pour des extraits de gastre; la décroissance dépend aussi du substrat.

**Preuve.** Perna et al. 2012 (texte lu); Jeanson, Ratnieks et Deneubourg 2003 (bibliographie seulement)

**Recommandation.** Faire de la persistance un paramètre calibré par espèce et par substrat.

**Disposition.** _à renseigner_

### BF-20 · mineur · §4, contraste par la loi de Little

**Constat.** Côté fourmi, la loi de Little est juste mais porte sur d'autres grandeurs : nombre de butineuses dehors = taux de sortie × durée d'un trajet. Ce n'est pas la même file que celle des receveuses de la ruche.

**Preuve.** inféré

**Recommandation.** Préciser L, λ et W de chaque côté.

**Disposition.** _à renseigner_

### BF-21 · mineur · §3, Agentique (« la diversité stabilise »)

**Constat.** L'idée n'a d'appui que côté abeille (Jones et al. 2004).

**Preuve.** Résumé Europe PMC : Hasegawa et al. 2016, Sci Rep 6:20846

**Recommandation.** Ajouter côté fourmi Hasegawa et al. 2016 (ouvrières inactives à seuils variés, pérennité de la colonie) et Ulrich et al. 2021.

**Disposition.** _à renseigner_

## Ajouts recommandés

### BF-A01 · ajout

Signaux négatifs : phéromone « no entry » de Monomorium pharaonis (Robinson et al. 2005, Nature 438:442) et inhibition par encombrement (Dussutour et al. 2004, Nature 428:70-73). Équivalents agentiques : veto persistant, délestage de charge.

**Disposition.** _à renseigner_

### BF-A02 · ajout

Information privée vs sociale : mémoire de route contre piste chez Lasius niger (Grüter et al. 2011, BES 65:141-148), synthèse dans Czaczkes et al. 2015 (Annu Rev Entomol 60:581-599). Équivalent : contexte propre de l'agent contre état partagé.

**Disposition.** _à renseigner_

### BF-A03 · ajout

Taille critique et transition de phase avec hystérésis, chez la fourmi pharaon (Beekman, Sumpter et Ratnieks 2001, PNAS 98:9703-9706). Question agentique : combien d'agents faut-il pour qu'une chorégraphie s'installe ?

**Disposition.** _à renseigner_

### BF-A04 · ajout

Bruit fonctionnel et suivi d'un environnement changeant chez Pheidole megacephala (Dussutour et al. 2009, Proc R Soc B 276:4353-4361), et phéromone d'exploration chez Linepithema humile (Reid et al. 2011, J Exp Biol 214:50-58).

**Disposition.** _à renseigner_

### BF-A05 · ajout

Ouvrières informées et demi-tours (Beckers et al. 1992, J Theor Biol 159:397-415; Reid et al. 2012, Anim Behav).

**Disposition.** _à renseigner_

### BF-A06 · ajout

Transport coopératif à meneur transitoire : le groupe amplifie au maximum l'effet d'une seule fourmi informée (Gelblum et al. 2015, Nat Commun 6:7729).

**Disposition.** _à renseigner_

### BF-A07 · ajout

Algorithme de quorum accordable : quorum de 5,7 fourmis en urgence contre 12,7 hors urgence (Pratt et Sumpter 2006, PNAS 103:15906-15910). Tandems inversés pour une mise en œuvre rapide (Franks et al. 2009, Phil Trans R Soc B 364:845-852).

**Disposition.** _à renseigner_

### BF-A08 · ajout

Enseignement par tandem à rétroaction bidirectionnelle (Franks et Richardson 2006, Nature 439:153) : un protocole avec accusé de réception.

**Disposition.** _à renseigner_

### BF-A09 · ajout

Auto-assemblage : ponts vivants d'Eciton ajustés par un arbitrage coût/bénéfice sans connaissance globale (Reid et al. 2015, PNAS).

**Disposition.** _à renseigner_

### BF-A10 · ajout

Construction stigmergique chez Lasius niger (Khuong et al. 2016, PNAS 113:1303-1308). Rappeler que le terme stigmergie vient de Grassé (1959), à propos des termites.

**Disposition.** _à renseigner_

### BF-A11 · ajout

Couzin et Franks 2003 (Proc R Soc B 270:139-146) comme modèle fourmi du moulin et de la formation de voies de circulation.

**Disposition.** _à renseigner_

### BF-A12 · ajout

Limites des modèles à seuils (Ulrich et al. 2021, PLoS Biol) et rôle des ouvrières inactives (Hasegawa et al. 2016, Sci Rep 6:20846).

**Disposition.** _à renseigner_

### BF-A13 · ajout

Rationalité et capacité cognitive de groupe (Sasaki et Pratt 2012, Curr Biol 22:R827-R829).

**Disposition.** _à renseigner_

### BF-A14 · ajout

Phéromones royales et reconnaissance coloniale par hydrocarbures cuticulaires (Van Oystaeyen et al. 2014), pour borner la thèse et nourrir le volet « intrus ».

**Disposition.** _à renseigner_

### BF-A15 · ajout

Faux signaux injectés : substances de propagande de Leptothorax kutteri (Allies et al. 1986, J Chem Ecol 12:1285-1293). Côté artificiel : détracteurs et phéromone de prudence (Aswale et al. 2022, AAMAS), à relier à EscapeBench et LeakLab.

**Disposition.** _à renseigner_

### BF-A16 · ajout

Raids de légionnaires auto-organisés (Deneubourg et al. 1989, J Insect Behav 2:719-725; Franks et al. 1991, J Insect Behav 4:583-607).

**Disposition.** _à renseigner_

### BF-A17 · ajout

Référence classique de la décision collective par piste : Deneubourg et Goss 1989, Ethol Ecol Evol 1:295-311.

**Disposition.** _à renseigner_

### BF-A18 · ajout

Mode de simulation « réponse individuelle de Weber + bruit → sigmoïde collectif » (Perna et al. 2012, PLoS Comput Biol 8:e1002592) : un visuel direct du passage de l'intelligence individuelle à l'intelligence collective.

**Disposition.** _à renseigner_


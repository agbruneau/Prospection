# Constats — Biologie des fourmis

Source : [rapport complet](bio-fourmis.md). 21 constats (1 critiques, 8 majeurs, 12 mineurs) et 18 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** Les attributions bibliographiques de v3 sur les fourmis sont presque toutes justes (auteurs, années, revues). Il reste une erreur critique : le résultat de Wilson 1984 est inversé, car ce sont les majors qui reprennent les tâches des minors retirés. On compte aussi huit erreurs majeures de modélisation biologique : - le moulin des légionnaires est rattaché au tore de Couzin et al. 2002, un modèle pour poissons et oiseaux, sans phéromone; - le tableau crée une fausse asymétrie de freinage, alors que les fourmis ont des signaux négatifs explicites; - le signal des fourmis est réduit à un scalaire; - « la fourmi » est traitée comme une seule espèce, alors que les exemples couvrent au moins cinq genres aux mécanismes distincts; - le projet 1 compare des manipulations non appariées (longueur de chemin contre qualité de source), et le blocage n'est pas un trait général; - la fonction de choix est donnée sans k ni n et présentée comme une règle individuelle, ce que contredit Perna et al. 2012; - l'analogie TCP est attribuée à un article qui ne la fait pas; - la thèse sur la reine est à borner. Certaines primaires n'ont pas pu être lues en texte intégral (paywalls, quotas de recherche épuisés). Ces points s'appuient sur des sources secondaires ou sont marqués comme non vérifiés, notamment k ≈ 20.

## Constats

### BF-01 · critique · §3 Division du travail, « À reproduire »

**Constat.** v3 dit « les petites ouvrières prennent la relève ». Wilson 1984 montre l'inverse : quand on abaisse le ratio minors:majors sous 1:1 (P. guilelmimuelleri, P. megacephala, P. pubiventris), ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5), augmentent leur activité (×15 à 30) et rétablissent au moins 75 % de l'activité des minors manquants. Bonabeau et al. 1996 modélisent précisément cela.

**Preuve.** https://link.springer.com/article/10.1007/BF00293108 (résumé éditeur via l'index de recherche); résumé de Bonabeau et al. 1996 https://doi.org/10.1098/rspb.1996.0229

**Recommandation.** Écrire : retrait des minors → les majors, à seuil élevé, prennent le relais quand le stimulus monte. Cibles quantitatives : facteur d'activité et part d'activité rétablie.

**Disposition.** Accepté — Écrit tel que recommandé : après le retrait des minors (ratio sous 1:1), ce sont les majors qui prennent le relais (activité ×15 à ×30, répertoire ×1,4 à ×4,5, au moins 75 % de l'activité restaurée), avec le facteur d'activité et la part restaurée comme cibles chiffrées (H3.1, T3.2). — Traité dans : ../../00-cadre.md (§2.4, point 1); ../../../projets/P3-division-du-travail.md (§1 tableau des corrections, H3.1, §4.1, T3.2); ../../06-metriques-et-typologie.md (§6.2, ligne Division du travail et diversité)

### BF-02 · majeur · §6 Pathologies, fourmis (moulin)

**Constat.** La « phase tore de Couzin et al. 2002 » vient d'un modèle 3D à zones (répulsion, orientation, attraction) pour bancs de poissons et volées d'oiseaux, sans phéromone. Le moulin des légionnaires vient du suivi de piste phéromonale chez des fourmis aveugles (Schneirla 1944; Delsuc 2003). Le modèle propre aux fourmis est Couzin et Franks 2003 (Eciton burchellii, suivi de piste et évitement, conditions périodiques, figure « Circular milling »).

**Preuve.** Résumé Europe PMC de Couzin et al. 2002; texte intégral de Couzin et Franks 2003 https://www.sccs.swarthmore.edu/users/08/bblonder/phys120/docs/couzin.pdf; https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.0000037

**Recommandation.** Simuler le moulin fourmi avec un modèle de suivi de piste (base : Couzin et Franks 2003, paramètre d'ordre F). Montrer le tore de 2002 seulement comme contrepoint : même motif, autre mécanisme.

**Disposition.** Accepté — Le moulin est confié à P9 avec Couzin et Franks 2003 comme modèle fourmi (suivi de piste et évitement, tronçon périodique, flux F; T9.1, T9.2), et Couzin et al. 2002 n'est qu'un contrepoint 3D sans phéromone (T9.9, tableau « même motif, autre mécanisme »); l'apparition d'un moulin 2D reste hors périmètre, faute de modèle publié. — Traité dans : ../../00-cadre.md (§2.4, point 2); ../../../projets/P9-mouvement-collectif-et-construction.md (§4.1, §4.2, T9.1, T9.2, T9.9); ../../../projets/P6-defaillances-et-defenses.md (§1 répartition, §2 corrections de la v3); ../../10-glossaire.md (moulin, moulin de fourmis)

### BF-03 · majeur · Tableau « Deux chorégraphies », ligne Freinage

**Constat.** « Absence de retours » laisse croire que seule l'abeille a un frein actif. Or Monomorium pharaonis dépose une phéromone répulsive « no entry » (Robinson et al. 2005), et Lasius niger subit une inhibition par encombrement (Dussutour et al. 2004). L'absence de retours ne vaut que pour Pogonomyrmex.

**Preuve.** Résumés Europe PMC : Robinson et al. 2005, Nature 438:442; Dussutour et al. 2004, Nature 428:70-73; Czaczkes et al. 2015, Annu Rev Entomol 60:581-599

**Recommandation.** Ligne Freinage côté fourmi : évaporation, phéromone répulsive, inhibition par encombrement, baisse du taux de rencontres. Ajouter une variante « no entry » à comparer au signal d'arrêt de l'abeille.

**Disposition.** Modifié — La ligne Freinage énumère côté fourmi « no entry », encombrement, baisse du taux de contacts et décroissance de la piste, et le cadre limite l'absence de retours à *P. barbatus*; la variante « no entry » n'est toutefois qu'un volet exploratoire sans paramètres (E1.3 c), non comparé au signal d'arrêt de l'abeille. — Traité dans : ../../00-cadre.md (§2.4, point 9); ../../06-metriques-et-typologie.md (§6.2, ligne Freinage); ../../07-vulgarisation-evaluation.md (§4.7); ../../../projets/P4-regulation-sans-vue-densemble.md (§2 corrections, §7.3); ../../../projets/P1-recrutement-verrouillage.md (E1.3, R1.12)

### BF-04 · majeur · Tableau, ligne Contenu du signal; question transversale

**Constat.** « Intensité (scalaire) » est une simplification de modèle, pas un fait biologique. Le signal des fourmis combine plusieurs phéromones (attractive ou répulsive), une polarité par la géométrie des bifurcations (Jackson et al. 2004), une modulation selon la source, une mémoire privée qui rivalise avec la piste (Grüter et al. 2011) et un tandem à rétroaction bidirectionnelle (Franks et Richardson 2006). L'échelle « scalaire → symbole → langage » s'en trouve faussée.

**Preuve.** Résumés Europe PMC : Jackson et al. 2004, Nature 432:907-909; Franks et Richardson 2006, Nature 439:153. Grüter et al. 2011 : doi:10.1007/s00265-010-1020-2 (bibliographie seulement; le résultat est de mémoire)

**Recommandation.** Reformuler en « scalaires multiples, localisés et signés + géométrie + mémoire privée ». Assumer le scalaire comme simplification de Deneubourg. Ajouter au moteur une variable « information privée vs sociale ».

**Disposition.** Accepté — « Scalaire » est déclaré simplification de modèle; la ligne Codage du signal décrit un champ multicomposante (attractif et répulsif), la géométrie des bifurcations (Jackson 2004) et la mémoire privée, et l'information privée contre sociale devient un agent à poids (w_p, w_s) calibré sur Grüter 2011 (T8.7, E8.3). — Traité dans : ../../00-cadre.md (§2.4, point 10); ../../06-metriques-et-typologie.md (§6.1 Codage du signal, §6.2 Mémoire); ../../../projets/P8-individu-et-colonie.md (T8.7, E8.3); ../../../projets/P1-recrutement-verrouillage.md (§7.1, §7.3); ../../10-glossaire.md (phéromone, piste)

### BF-05 · majeur · Tableau et projets 1 à 6 (cadrage « la fourmilière »)

**Constat.** v3 traite « la fourmi » comme une seule espèce, alors que les exemples mobilisent Linepithema (piste de masse), Pheidole (castes), Pogonomyrmex (fourragement sans piste, réglé par les contacts), Temnothorax (tandem et quorum) et Eciton/Labidus (légionnaires). Le canal « piste chimique » ne vaut ni pour Pogonomyrmex ni pour le tandem. Côté abeille, une seule espèce : on compare une espèce à un ordre.

**Preuve.** Prabhakar et al. 2012 : « no need for pheromone trails », https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002670 ; le reste est inféré à partir des sources citées

**Recommandation.** Faire un tableau mécanisme × espèce nommée, et des préréglages par espèce dans le moteur. Présenter la diversité des fourmis comme une variable explicative.

**Disposition.** Accepté — Le cadre pose un tableau mécanisme × taxon nommé (Linepithema et Lasius, Pheidole, Pogonomyrmex, Temnothorax, Eciton et Labidus, Apis, Meliponini), S0 tient une matrice concept × taxon × canal, et chaque fiche nomme un préréglage par modèle; le taxon est traité comme variable explicative face au canal (H1.7, E1.6). — Traité dans : ../../00-cadre.md (§2.3); ../../../projets/S0-socle.md (§4.5); ../../../projets/P1-recrutement-verrouillage.md (§4.1, H1.7, E1.6); ../../../projets/P3-division-du-travail.md (§4); ../../06-metriques-et-typologie.md (§6)

### BF-06 · majeur · §1 Recrutement, « À reproduire »

**Constat.** (a) Manipulations non appariées : chez la fourmi, raccourci ajouté tard (Goss 1989); chez l'abeille, inversion de qualité des sources (Seeley 1991). L'effet de l'espèce se confond avec celui de la manipulation. (b) « Fourmis bloquées » n'est pas général : Pheidole megacephala suit les changements de source (Dussutour et al. 2009, « unlike many other mass recruiting species »), et Linepithema humile s'adapte aux blocages dans un labyrinthe grâce à la phéromone d'exploration (Reid et al. 2011) et aux demi-tours (Reid et al. 2012).

**Preuve.** Résumés Europe PMC : Dussutour et al. 2009, Proc R Soc B 276:4353-4361; Reid et al. 2011, J Exp Biol 214:50-58. Bonabeau et al. 2000, Nature 406:39-42 (texte lu)

**Recommandation.** Apparier : changement de qualité de source des deux côtés (Dussutour 2009; Beckers et al. 1990, Insectes Soc 37:258-267) et, à part, raccourci tardif côté fourmi. Montrer le blocage et sa levée (évaporation, bruit, demi-tours).

**Disposition.** Modifié — Manipulations appariées : inversion de qualité de source des deux côtés (E1.1, ancre Beckers 1990) et raccourci tardif traité à part côté fourmi (E1.2); le blocage est déclaré non général et sa levée est simulée par évaporation et bruit (H1.1, H1.6, E1.3), mais les demi-tours et la phéromone d'exploration restent non modélisés. — Traité dans : ../../00-cadre.md (§2.4, point 11); ../../../projets/P1-recrutement-verrouillage.md (§1 QR2, E1.1, E1.2, E1.3, R1.12); ../../../projets/P6-defaillances-et-defenses.md (§2 corrections de la v3, H6.2, E6.2)

### BF-07 · majeur · §1, fonction de choix de Deneubourg

**Constat.** k et n ne sont pas donnés, ce qui rend le critère de reproduction inapplicable. n ≈ 2 est vérifié par des sources secondaires (Perna 2012; Dorigo et Stützle 2004, qui disent α = 2 dérivé de Deneubourg 1990). k ≈ 20 n'a pas pu être vérifié (de mémoire seulement); chez Dorigo et Stützle, la constante est t_s. A et B y sont des passages cumulés sans évaporation, avec dépôt aller-retour. Surtout, Perna et al. 2012 mesurent une réponse individuelle de type Weber (proportionnelle) : le sigmoïde n = 2 est un ajustement collectif.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002592 ; https://web2.qatar.cmu.edu/~gdicaro/15382/additional/aco-book.pdf (ch. 1)

**Recommandation.** Fixer n = 2 (sources citées). Traiter k comme dépendant du dispositif, avec analyse de sensibilité, et confirmer k ≈ 20 dans le PDF de Deneubourg 1990. Préciser la signification de A et B. Ajouter un mode « Weber individuel + bruit » qui reproduit le sigmoïde collectif.

**Disposition.** Modifié — n = 2 est fixé comme ajustement collectif, k est traité comme paramètre du dispositif avec analyse de sensibilité (k ∈ {5 ; 20 ; 50}), A et B sont définis comme passages cumulés et un mode « Weber individuel + bruit » est planifié (E1.5, H1.8, porte F); k ≈ 20 reste [à confirmer] faute de lecture de Deneubourg 1990. — Traité dans : ../../00-cadre.md (§2.4, point 3); ../../../projets/P1-recrutement-verrouillage.md (§4.3, H1.2, H1.8, E1.5, R1.2, R1.8); ../../10-glossaire.md (fonction de choix)

### BF-08 · majeur · §4 Régulation, fourmis (analogie TCP)

**Constat.** L'article de Prabhakar, Dektar et Gordon 2012 ne parle pas de TCP; il évoque seulement les « computer networks ». L'analogie TCP (« anternet ») vient du communiqué de Stanford (2012) puis de Gordon 2014 (PLoS Biol). v3 ne nomme pas l'espèce (Pogonomyrmex barbatus). Le stimulus réel est le taux de contacts antennaires avec les butineuses qui reviennent avec de la nourriture.

**Preuve.** https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002670 ; https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001805 ; https://engineering.stanford.edu/news/stanford-biologist-and-computer-scientist-discover-anternet

**Recommandation.** Citer Gordon 2014 pour l'analogie et Prabhakar 2012 pour le modèle. Nommer l'espèce. Restreindre l'analogie à l'auto-cadencement par ACK. Simuler aussi les limites signalées par les auteurs (variabilité entre colonies, météo).

**Disposition.** Modifié — L'analogie TCP est attribuée à Carey 2012 et à Gordon 2014 (absente de Prabhakar 2012), l'espèce est nommée (*P. barbatus*) et l'analogie est bornée à l'auto-cadencement par accusés (Rel1, statut Analogie); les limites signalées par les auteurs (nid, météo) ne figurent que par l'écart modèle-données de T4.3 et le balayage de la volatilité c_G (T4.5), sans facteur simulé propre. — Traité dans : ../../00-cadre.md (§2.4, point 5); ../../../projets/P4-regulation-sans-vue-densemble.md (§2, §4.1, §4.2, §7.2 Rel1, T4.3, T4.5, R50, R53); ../../06-metriques-et-typologie.md (§6.2, ligne Régulation de la charge)

### BF-09 · majeur · Thèse « la reine ne commande pas »

**Constat.** Une classe conservée d'hydrocarbures sert de phéromone royale et empêche la reproduction des ouvrières chez des guêpes, des bourdons et des fourmis (Van Oystaeyen et al. 2014; généralité contestée chez Bombus par Amsalem et al. 2015). Sans borne, la thèse est attaquable.

**Preuve.** Résumés Europe PMC : Van Oystaeyen et al. 2014, Science 343:287-290; Amsalem et al. 2015, Proc R Soc B 282:20151800

**Recommandation.** Écrire : la reine ne dirige ni le travail ni les décisions collectives, mais émet un signal d'état qui règle la reproduction.

**Disposition.** Accepté — La thèse est reformulée et « la reine ne commande pas » reste un constat biologique borné; l'encart « Ce que fait vraiment la reine » dit que la reine signale sa fécondité par des phéromones, ce qui règle la reproduction et non le travail ni les choix collectifs, avec la généralité contestée (Van Oystaeyen 2014; Amsalem 2015). — Traité dans : ../../00-cadre.md (§2.1, §8); ../../07-vulgarisation-evaluation.md (§7.3); ../../06-metriques-et-typologie.md (§6.1, ligne Modulation globale); ../../08-science-ouverte-ethique.md (§7.5)

### BF-10 · mineur · §3, seuils de réponse

**Constat.** Le modèle à seuils est présenté sans ses limites. Ulrich et al. 2021 (120 colonies d'Ooceraea biroi) montrent que la variation des seuils seule ne reproduit pas les patrons observés. Le résultat de Theraulaz 1998 est une prédiction de modèle, pas une mesure. La forme s²/(s²+θ²) n'a pas pu être relue dans le texte primaire.

**Preuve.** https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001269 ; Crossref pour Bonabeau 1996 (263:1565-1569) et Theraulaz 1998 (265:327-332)

**Recommandation.** Ajouter Ulrich 2021 comme borne et un curseur « efficacité individuelle ». Étiqueter Theraulaz 1998 comme prédiction.

**Disposition.** Accepté — Ulrich 2021 est intégré comme borne et contre-preuve avec un curseur « efficacité individuelle » dans le modèle commun, et les valeurs de Theraulaz 1998 sont étiquetées prédictions de modèle, non mesures; la forme T_θ est lue dans Theraulaz 1998 et attribuée à Bonabeau 1996 [non vérifiée]. — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.9 contre-preuves, §4.1, §4.2, §4.6, R7, R9)

### BF-11 · mineur · §6, Phengaris

**Constat.** Phengaris (= Maculinea) combine mimétisme chimique et mimétisme acoustique des sons de la reine (Barbero et al. 2009). Elle trompe la reconnaissance coloniale, pas le canal de coordination. L'analogie avec la prompt injection est donc imprécise : c'est plutôt de l'usurpation d'identité ou de l'élévation de privilège.

**Preuve.** Résumés Europe PMC : Barbero et al. 2009, Science 323:782-785 et J Exp Biol 212:4084-4090; Nash et al. 2008, Science 319:88-90; Allies et al. 1986, J Chem Ecol 12:1285-1293. Aswale et al. 2022 : https://arxiv.org/html/2202.01808v2

**Recommandation.** Garder Phengaris pour l'usurpation d'identité. Pour le faux signal, ajouter les substances de propagande de Leptothorax kutteri (Allies et al. 1986) et Aswale et al. 2022 (AAMAS : 3 % de détracteurs divisent la collecte par ~150; défense par phéromone de prudence). Chercher aussi sous le nom Maculinea.

**Disposition.** Accepté — *Phengaris* (écrit « Maculinea (Phengaris) ») est gardé pour l'usurpation d'identité (I1), et le faux signal passe par les substances de propagande de *L. kutteri* (Allies 1986, citée sans étiquette) et par Aswale 2022 (détracteurs, phéromone de prudence; T6.11, H6.9, E6.8). — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§2 positionnement et corrections de la v3, §7.1 I1 et C1, E6.8, R12, R13); ../../06-metriques-et-typologie.md (§6.2, ligne Identité)

### BF-12 · mineur · §1, Goss et al. 1989

**Constat.** v3 ne précise ni l'espèce (Iridomyrmex humilis = Linepithema humile), ni le rapport de longueurs (r = 2), ni le délai (30 min), ni les effectifs (14 essais simultanés, 18 essais tardifs). Le résultat est statistique : une colonie peut parfois rester sur la branche longue même en présentation simultanée.

**Preuve.** Bonabeau et al. 2000, figure 2 « modified from » Goss 1989 (texte lu); Dorigo et Stützle 2004, ch. 1

**Recommandation.** Donner ces paramètres, et reproduire des distributions sur l'ensemble des essais plutôt qu'une trajectoire unique.

**Disposition.** Accepté — Les paramètres de Goss 1989 sont donnés (*L. humile*, publiée *I. humilis*; r ∈ {1 ; 1,4 ; 2}; courte ajoutée 30 min après le début; 11 colonies, dont 14/14 à r = 2 et 2/18 pour la branche tardive), et la reproduction porte sur des distributions de 1 000 simulations par r. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§2, §4.2, T1.1 à T1.3)

### BF-13 · mineur · §1, attribution de la fonction de choix

**Constat.** Deneubourg et al. 1990 porte d'abord sur le patron exploratoire. La référence classique sur la décision collective, Deneubourg et Goss 1989, manque.

**Preuve.** Bibliographie de Bonabeau et al. 2000 (réf. 1); résumé de Deneubourg et al. 1990 via Consensus

**Recommandation.** Ajouter Deneubourg et Goss 1989, Ethol Ecol Evol 1:295-311.

**Disposition.** Modifié — L'attribution est corrigée : n = 2 et k = 20 viennent d'un choix entre deux branches égales en recrutement exploratoire (Deneubourg 1990, via Goss 1989); la référence classique Deneubourg et Goss 1989 n'est en revanche ajoutée ni aux fiches ni à la bibliographie. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§2, §4.3); ../../10-glossaire.md (fonction de choix); ../../11-bibliographie.md (entrée Deneubourg et al. 1990)

### BF-14 · mineur · §5, Pratt et al. 2002 et 2005

**Constat.** En 2002, l'espèce s'appelait Leptothorax albipennis. Crossref liste aussi une notice Anim Behav 71:478 (2006) au même titre que Pratt et al. 2005 : probablement un erratum, non vérifié.

**Preuve.** Crossref : doi:10.1007/s00265-002-0487-x ; doi:10.1016/j.anbehav.2005.01.022 ; doi:10.1016/j.anbehav.2005.11.001

**Recommandation.** Citer avec le nom d'origine et le nom actuel. Lire la notice de 2006 avant de reprendre des paramètres.

**Disposition.** Accepté — *T. albipennis* est nommé avec son ancien nom (*Leptothorax albipennis*, nom des titres de 2001 à 2003) et la notice de 2006 est signalée comme erratum probable, à lire avant de reprendre des valeurs de Pratt 2005. — Traité dans : ../../../projets/P5-decision-par-quorum.md (en-tête Taxons nommés, §4.3 M7, R1, R12); ../../11-bibliographie.md (Pratt et al. 2002, Pratt et al. 2005)

### BF-15 · mineur · §5, curseur de quorum

**Constat.** La référence la plus directe manque : Pratt et Sumpter 2006 (PNAS). Chez Temnothorax curvispinosus, quorum de 5,7 ± 0,5 fourmis en émigration forcée contre 12,7 ± 0,6 en émigration non forcée (ajustement par fonction de Hill), avec des taux de recherche et d'acceptation plus élevés en émigration forcée.

**Preuve.** https://pmc.ncbi.nlm.nih.gov/articles/PMC1635101/

**Recommandation.** En faire la cible quantitative du projet 5 côté fourmi.

**Disposition.** Accepté — Pratt et Sumpter 2006 est la cible quantitative fourmi (*T. curvispinosus*) : quorum de 5,7 ± 0,5 en émigration forcée contre 12,7 ± 0,6 en non forcée, ajustement de Hill, taux de recherche et d'acceptation (T5.20, T5.21), avec l'incohérence interne de 11,3 signalée. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.3 M7, T5.20, T5.21, §7.1 Urgence réglable, R10)

### BF-16 · mineur · §5 et §6, bris d'égalité et interblocage

**Constat.** v3 ne donne pas d'expérience fourmi correspondant à « l'inhibition croisée débloque une égalité ». Aucune inhibition croisée ni aucun signal d'arrêt n'est mentionné chez Temnothorax dans Pratt et Sumpter 2006. Qu'il n'en existe aucun nulle part reste une supposition.

**Preuve.** https://pmc.ncbi.nlm.nih.gov/articles/PMC1635101/ (absence de mention); le reste est inféré

**Recommandation.** Spécifier l'expérience fourmi (deux sites de qualité égale) avec une sortie sourcée, ou présenter l'asymétrie comme un résultat comparatif.

**Disposition.** Accepté — La seconde option du constat est retenue : l'absence d'inhibition croisée documentée chez *Temnothorax* est déclarée comme asymétrie et traitée en résultat comparatif (H5.7, E5.4 : sites égaux, scission contre interblocage), avec le constat cité en source. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.1 asymétries déclarées, H5.7, E5.4)

### BF-17 · mineur · §6, Schneirla 1944

**Constat.** La référence est correcte (Am Mus Novit 1253; Barro Colorado). Mais la première description publiée est celle de Beebe 1921, et l'espèce (Labidus praedator, d'après ma mémoire) n'a pas été vérifiée.

**Preuve.** https://striresearch.si.edu/barrocolorado100/ants/ ; https://en.wikipedia.org/wiki/Ant_mill

**Recommandation.** Ajouter Beebe 1921, et confirmer l'espèce dans le texte de l'AMNH.

**Disposition.** Accepté — Beebe 1921 est ajouté comme première description (bibliographie, [non vérifiée]) et l'espèce du moulin de Schneirla 1944, lu en texte intégral, est donnée sous son nom d'origine *Eciton praedator* (synonymie avec *Labidus praedator* non explicitée). — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§2 ligne Moulin et boucles, R1); ../../../projets/P9-mouvement-collectif-et-construction.md (§2, §8 page 15); ../../11-bibliographie.md (Beebe 1921, Schneirla 1944)

### BF-18 · mineur · §2, ACO

**Constat.** Le visuel suggère une équivalence avec les fourmis réelles. Or Bonabeau et al. 2000 notent que l'évaporation de l'ACO a été poussée « beyond biological plausibility », et chez les fourmis réelles l'évaporation joue un rôle mineur dans la découverte du plus court chemin. η^β, la liste tabou et le dépôt proportionnel à la qualité du tour n'ont pas d'équivalent biologique direct.

**Preuve.** Bonabeau et al. 2000 (texte lu); Dorigo et Stützle 2004, ch. 1; Crossref doi:10.1109/3477.484436

**Recommandation.** Le dire dans le visuel et dans la note de recherche. La référence Dorigo 1996 est juste (IEEE SMC-B 26(1):29-41).

**Disposition.** Modifié — P2 ne reproduit aucun résultat biologique, déclare le dépôt en fin de tour (ant-cycle) non biologique, réserve la métaphore à la vulgarisation (bouton « retirer la métaphore ») et reconnaît ACO et ABC plus proches de l'orchestration; il ne reprend pas la mise en garde de Bonabeau 2000 sur l'évaporation poussée au-delà de la plausibilité biologique. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Rôle, §2 Critique de Sörensen, §4.1 ligne Fidélité biologique, §7.2, §8)

### BF-19 · mineur · Tableau, ligne Canal (« persistante »)

**Constat.** La persistance varie : chez L. humile, demi-vie d'environ 30 min pour la phéromone synthétique (borne inférieure) contre environ 4 h pour des extraits de gastre; la décroissance dépend aussi du substrat.

**Preuve.** Perna et al. 2012 (texte lu); Jeanson, Ratnieks et Deneubourg 2003 (bibliographie seulement)

**Recommandation.** Faire de la persistance un paramètre calibré par espèce et par substrat.

**Disposition.** Modifié — La persistance est un paramètre balayé et converti en demi-vie (τ½ = ln 2/ρ; grille de H1.1; canal `field` à demi-vie réglable), avec des ordres de grandeur par espèce (≈ 30 min chez *L. humile*, au moins 40-60 min chez *L. niger*); l'écart de durée selon le produit et le substrat n'est pas écrit. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§3 H1.1, §4.2, §4.5, §7.1); ../../05-spec-simulation.md (§2.3); ../../06-metriques-et-typologie.md (§3.1 R_pers)

### BF-20 · mineur · §4, contraste par la loi de Little

**Constat.** Côté fourmi, la loi de Little est juste mais porte sur d'autres grandeurs : nombre de butineuses dehors = taux de sortie × durée d'un trajet. Ce n'est pas la même file que celle des receveuses de la ruche.

**Preuve.** inféré

**Recommandation.** Préciser L, λ et W de chaque côté.

**Disposition.** Accepté — L, λ et W sont précisés de chaque côté : fourrageuses dehors, débit de sortie et durée du trajet pour la boucle de terrain M/G/∞ de la fourmi; butineuses en attente, arrivées et temps de recherche pour la file d'appariement de l'abeille (« deux files, pas une »). — Traité dans : ../../00-cadre.md (§2.4, point 6); ../../../projets/P4-regulation-sans-vue-densemble.md (§4.9, §7.2 Rel4, T4.12); ../../06-metriques-et-typologie.md (§6.2, ligne Régulation de la charge)

### BF-21 · mineur · §3, Agentique (« la diversité stabilise »)

**Constat.** L'idée n'a d'appui que côté abeille (Jones et al. 2004).

**Preuve.** Résumé Europe PMC : Hasegawa et al. 2016, Sci Rep 6:20846

**Recommandation.** Ajouter côté fourmi Hasegawa et al. 2016 (ouvrières inactives à seuils variés, pérennité de la colonie) et Ulrich et al. 2021.

**Disposition.** Accepté — « La diversité stabilise » n'est plus affirmée : P3 la teste par métrique (H3.4, E3.4) et ajoute côté fourmi Hasegawa 2016 (inactives à seuils variés, fatigue; T3.8, E3.3) et Ulrich 2021 (borne et contre-preuve) à côté de Jones 2004. — Traité dans : ../../../projets/P3-division-du-travail.md (§1 QR4, H3.3, H3.4, §4.3, §4.6, R9); ../../00-cadre.md (§3, QR4)

## Ajouts recommandés

### BF-A01 · ajout

Signaux négatifs : phéromone « no entry » de Monomorium pharaonis (Robinson et al. 2005, Nature 438:442) et inhibition par encombrement (Dussutour et al. 2004, Nature 428:70-73). Équivalents agentiques : veto persistant, délestage de charge.

**Disposition.** Modifié — Les signaux négatifs sont intégrés (« no entry » de *M. pharaonis*, encombrement de *L. niger*; encombrement modélisé en T1.8 et H1.3), mais les équivalents agentiques sont adaptés en contre-pression, limite de concurrence et 429 avec retry-after, car le signal d'arrêt est une inhibition et non un veto. — Traité dans : ../../06-metriques-et-typologie.md (§6.2, ligne Freinage); ../../00-cadre.md (§2.4, points 7 et 9); ../../../projets/P1-recrutement-verrouillage.md (T1.8, H1.3, E1.3); ../../../projets/P4-regulation-sans-vue-densemble.md (§7.2 Rel5 et Rel6, E4.5)

### BF-A02 · ajout

Information privée vs sociale : mémoire de route contre piste chez Lasius niger (Grüter et al. 2011, BES 65:141-148), synthèse dans Czaczkes et al. 2015 (Annu Rev Entomol 60:581-599). Équivalent : contexte propre de l'agent contre état partagé.

**Disposition.** Accepté — L'information privée contre sociale (mémoire de route contre piste chez *L. niger*) est la cible T8.7 et l'expérience E8.3 (agent à poids privé et social en environnement dynamique), avec Czaczkes 2015 en synthèse et l'équivalent agentique contexte propre contre état partagé. — Traité dans : ../../../projets/P8-individu-et-colonie.md (§2, T8.7, E8.3, §7.1); ../../../projets/P1-recrutement-verrouillage.md (§7.1); ../../06-metriques-et-typologie.md (§6.2, ligne Mémoire); ../../10-glossaire.md (information privée et information sociale)

### BF-A03 · ajout

Taille critique et transition de phase avec hystérésis, chez la fourmi pharaon (Beekman, Sumpter et Ratnieks 2001, PNAS 98:9703-9706). Question agentique : combien d'agents faut-il pour qu'une chorégraphie s'installe ?

**Disposition.** Accepté — Beekman 2001 (taille de colonie, transition de phase, hystérésis) sert de cadre à un balayage de taille croissant puis décroissant (E1.4) et à la cible de verrouillage de P6 (T6.6, H6.2); la question « combien d'agents » devient le facteur N de E1.4 et de E1.6. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§4.6, E1.4, E1.6); ../../../projets/P6-defaillances-et-defenses.md (§4.1 F4, T6.6, H6.2)

### BF-A04 · ajout

Bruit fonctionnel et suivi d'un environnement changeant chez Pheidole megacephala (Dussutour et al. 2009, Proc R Soc B 276:4353-4361), et phéromone d'exploration chez Linepithema humile (Reid et al. 2011, J Exp Biol 214:50-58).

**Disposition.** Modifié — Le bruit fonctionnel chez *P. megacephala* (Dussutour 2009) est une cible et une hypothèse (T1.9, H1.6, E1.3 b; T6.7), mais la phéromone d'exploration de *L. humile* (Reid 2011) n'est que déclarée non modélisée, sans citation par étiquette. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§4.5, T1.9, H1.6, E1.3, R1.12); ../../../projets/P6-defaillances-et-defenses.md (§4.1 F5, T6.7)

### BF-A05 · ajout

Ouvrières informées et demi-tours (Beckers et al. 1992, J Theor Biol 159:397-415; Reid et al. 2012, Anim Behav).

**Disposition.** Hors portée — Les demi-tours (Beckers 1992) sont cités, déclarés non lus et non modélisés, à signaler comme omission dans V1 et dans la note et à lire avant tout ajout; Reid 2012 et le rôle des ouvrières informées ne sont traités nulle part. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (E1.2, R1.5, R1.12, §13)

### BF-A06 · ajout

Transport coopératif à meneur transitoire : le groupe amplifie au maximum l'effet d'une seule fourmi informée (Gelblum et al. 2015, Nat Commun 6:7729).

**Disposition.** Accepté — Gelblum 2015 (*P. longicornis*) est modèle de référence (Gillespie, Ising à champ moyen) avec les cibles T9.10 à T9.14 : la réponse du groupe est maximale pour une fourmi transitoirement informée (0,35 à 1,4 guide simultané, 5 à 20 s), relation transposée aux agents. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.6, T9.10 à T9.14, H9.8, §7.2)

### BF-A07 · ajout

Algorithme de quorum accordable : quorum de 5,7 fourmis en urgence contre 12,7 hors urgence (Pratt et Sumpter 2006, PNAS 103:15906-15910). Tandems inversés pour une mise en œuvre rapide (Franks et al. 2009, Phil Trans R Soc B 364:845-852).

**Disposition.** Modifié — L'algorithme de quorum accordable est repris (Pratt et Sumpter 2006 : 5,7 contre 12,7, ajustement de Hill; T5.20, T5.21; relation « urgence réglable »), mais les tandems inversés ne figurent que comme étape de l'exécution (T5.16, d'après Pratt 2002) et Franks et al. 2009 n'est cité nulle part. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§4.3 M7, T5.16, T5.20, T5.21, §7.1)

### BF-A08 · ajout

Enseignement par tandem à rétroaction bidirectionnelle (Franks et Richardson 2006, Nature 439:153) : un protocole avec accusé de réception.

**Disposition.** Accepté — Le tandem est classé comme messages dirigés 1:1 en boucle fermée avec rétroaction bidirectionnelle (Franks et Richardson 2006) et le glossaire en donne l'analogue de la poignée de main acquittée (Analogie [I]); le tandem lui-même est modélisé en P5 (M4). — Traité dans : ../../06-metriques-et-typologie.md (§1.3 tableau de placement, §6.1 ligne Recrutement); ../../10-glossaire.md (tandem); ../../../projets/P5-decision-par-quorum.md (§4.3 M4)

### BF-A09 · ajout

Auto-assemblage : ponts vivants d'Eciton ajustés par un arbitrage coût/bénéfice sans connaissance globale (Reid et al. 2015, PNAS).

**Disposition.** Accepté — Les ponts d'*E. hamatum* (Reid 2015) sont un modèle géométrique coût-bénéfice reproduit (T9.20, H9.12; 2 à 20 % de la colonie immobilisée) et l'arbitrage coût-bénéfice sans connaissance globale devient E9.2 (part d'agents affectés à la coordination, H9.18). — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.8, T9.20, H9.12, H9.18, §7.2)

### BF-A10 · ajout

Construction stigmergique chez Lasius niger (Khuong et al. 2016, PNAS 113:1303-1308). Rappeler que le terme stigmergie vient de Grassé (1959), à propos des termites.

**Disposition.** Accepté — Les piliers de *L. niger* (Khuong 2016) sont repris en phase 3 (T9.25, H9.15, E9.3 sur la durée de vie du marquage) et l'origine du mot stigmergie chez les termites (Grassé 1959) est rappelée. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§2, §4.9, T9.25, H9.15); ../../06-metriques-et-typologie.md (§7, homonymie 4); ../../10-glossaire.md (stigmergie, stigmergie constructive)

### BF-A11 · ajout

Couzin et Franks 2003 (Proc R Soc B 270:139-146) comme modèle fourmi du moulin et de la formation de voies de circulation.

**Disposition.** Accepté — Couzin et Franks 2003 est le modèle fourmi du moulin (choix collectif d'un sens sur tronçon périodique) et des voies de circulation (T9.1, T9.2), validé par docking. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§4.1, T9.1, T9.2, §9.4 D2); ../../00-cadre.md (§2.4, point 2); ../../10-glossaire.md (moulin de fourmis, voie de circulation)

### BF-A12 · ajout

Limites des modèles à seuils (Ulrich et al. 2021, PLoS Biol) et rôle des ouvrières inactives (Hasegawa et al. 2016, Sci Rep 6:20846).

**Disposition.** Accepté — Les limites des seuils sont posées (Ulrich 2021 en borne, Garrison 2018 et Lynch 2024 en contre-preuves) et les inactives à seuils variés sont modélisées (Hasegawa 2016, fatigue, T3.8; réserve de Charbonneau 2017, T3.7). — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.3, §4.3, §4.6, T3.7, T3.8, R9)

### BF-A13 · ajout

Rationalité et capacité cognitive de groupe (Sasaki et Pratt 2012, Curr Biol 22:R827-R829).

**Disposition.** Accepté — Sasaki et Pratt 2012 (colonies à environ 90 % avec 2 ou 8 nids, individus moins précis à 8) figure comme difficulté D5 (surcharge) et relation « surcharge cognitive », transposée en répartition de l'inspection entre sous-agents. — Traité dans : ../../../projets/P8-individu-et-colonie.md (§1 tableau D1 à D5, §2, §7.1)

### BF-A14 · ajout

Phéromones royales et reconnaissance coloniale par hydrocarbures cuticulaires (Van Oystaeyen et al. 2014), pour borner la thèse et nourrir le volet « intrus ».

**Disposition.** Accepté — Les phéromones royales (classe conservée, généralité contestée : Van Oystaeyen 2014, Amsalem 2015) bornent la thèse sur la reine, et les hydrocarbures cuticulaires nourrissent la ligne Identité et les entrées I1 à I3 (usurpation d'identité) de P6. — Traité dans : ../../06-metriques-et-typologie.md (§6.1 Modulation globale, §6.2 Identité); ../../07-vulgarisation-evaluation.md (§7.3); ../../../projets/P6-defaillances-et-defenses.md (§2 Parasites et mimétisme, §7.1 I1)

### BF-A15 · ajout

Faux signaux injectés : substances de propagande de Leptothorax kutteri (Allies et al. 1986, J Chem Ecol 12:1285-1293). Côté artificiel : détracteurs et phéromone de prudence (Aswale et al. 2022, AAMAS), à relier à EscapeBench et LeakLab.

**Disposition.** Accepté — Le faux signal est repris avec *L. kutteri* (Allies 1986, citée sans étiquette) et Aswale 2022 (détracteurs, phéromone de prudence; T6.11, H6.9, E6.8), et le lien avec EscapeBench et LeakLab est posé comme méthodologique, à confirmer par le chercheur. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§2, §4.1 F6, T6.11, H6.9, E6.8, §7.5, R14)

### BF-A16 · ajout

Raids de légionnaires auto-organisés (Deneubourg et al. 1989, J Insect Behav 2:719-725; Franks et al. 1991, J Insect Behav 4:583-607).

**Disposition.** Modifié — Les raids de légionnaires (Deneubourg 1989, Franks 1991) sont rattachés à P9 comme famille « raids, voies, trafic » avec les cibles T9.3 et T9.4, mais seulement décrits en résumé et bloqués : aucune équation lue, aucun modèle de raid implanté. — Traité dans : ../../../projets/P9-mouvement-collectif-et-construction.md (§2, §4.5, T9.3, T9.4, PR-0, R4)

### BF-A17 · ajout

Référence classique de la décision collective par piste : Deneubourg et Goss 1989, Ethol Ecol Evol 1:295-311.

**Disposition.** Accepté — Traité à la validation finale : Deneubourg et Goss 1989 ajoutée à la bibliographie (métadonnées vérifiées sur Crossref) et citée au positionnement de P1 comme référence classique de la décision collective par piste; texte à lire avant la note de recherche. — Traité dans : ../../11-bibliographie.md (Compléments de la validation finale), ../../../projets/P1-recrutement-verrouillage.md (2. Positionnement)

### BF-A18 · ajout

Mode de simulation « réponse individuelle de Weber + bruit → sigmoïde collectif » (Perna et al. 2012, PLoS Comput Biol 8:e1002592) : un visuel direct du passage de l'intelligence individuelle à l'intelligence collective.

**Disposition.** Accepté — Le mode « Weber individuel + bruit → sigmoïde collectif » est une expérience (E1.5, H1.8 : exposant ajusté selon le bruit directionnel), un réglage du niveau Explorer et l'objectif O5, conditionnés à la lecture de Perna 2012 (porte F). — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§3 H1.8, §5 porte F, E1.5, §8 Explorer, O5); ../../03-plan-de-recherche.md (§3.2, H1.8)


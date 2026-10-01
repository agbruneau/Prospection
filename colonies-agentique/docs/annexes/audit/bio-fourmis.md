# Audit « bio-fourmis » de la proposition v3

Date : 2026-10-01. Portée : exactitude myrmécologique de chaque affirmation de v3 sur les fourmis (espèces, expériences, résultats, modèles, équations, paramètres, attributions, années), plus les mécanismes absents. L'angle abeille, l'angle ACO-algorithmique et l'angle agentique relèvent d'autres auditeurs; je ne les touche que là où ils s'appuient sur une affirmation myrmécologique.

## Méthode et niveau de preuve

Chaque constat porte une étiquette de preuve :

- **[L]** : lu dans la source primaire (texte intégral ou résumé de l'éditeur ou de PubMed / Europe PMC).
- **[S]** : lu dans une source secondaire fiable qui rapporte la source primaire (revue, manuel, article d'un coauteur).
- **[B]** : seulement les métadonnées bibliographiques (Crossref, Europe PMC) : auteurs, revue, volume, pages.
- **[M]** : de mémoire, non vérifié pendant cet audit. À confirmer avant publication.
- **[I]** : inférence de l'auditeur.

Limites de l'audit : le quota de l'outil de recherche scientifique (Consensus) et celui de WebSearch de la session se sont épuisés en cours de route, et plusieurs éditeurs (Springer, Royal Society, ResearchGate) refusent l'accès. J'ai donc vérifié par Europe PMC, Crossref, Semantic Scholar, PLOS, PMC et des PDF en accès libre. Les primaires suivantes n'ont **pas** pu être lues en texte intégral : Goss et al. 1989, Deneubourg et al. 1990, Wilson 1984, Bonabeau et al. 1996, Pratt et al. 2002 et 2005, Schneirla 1944. Leurs constats reposent sur [S] ou sur le résumé de l'éditeur.

## Synthèse

v3 tient bien la plupart de ses attributions bibliographiques (années, auteurs, revues exacts pour Goss 1989, Deneubourg 1990, Bonabeau 1996, Theraulaz 1998, Wilson 1984, Prabhakar 2012, Pratt 2002 et 2005, Franks 2002 et 2003, Schneirla 1944, Couzin 2002, Dorigo 1996). Elle contient toutefois une **erreur critique** : le résultat de Wilson 1984 est inversé. On y trouve aussi plusieurs **erreurs majeures de modélisation biologique** : le moulin attribué à la phase tore d'un modèle conçu pour les poissons; une fausse asymétrie de freinage entre fourmi et abeille; un signal réduit à un scalaire; « la fourmi » traitée comme une espèce unique; une comparaison piste/danse qui ne compare pas la même manipulation; la fonction de choix donnée sans ses paramètres ni sa portée réelle. La thèse « la reine ne commande pas » tient pour l'allocation du travail et les décisions, mais doit être bornée : les phéromones royales règlent bel et bien la reproduction des ouvrières.

| # | Gravité | Section v3 | Constat (court) |
|---|---|---|---|
| 1 | critique | §3 À reproduire | Wilson 1984 inversé : ce sont les **majors** qui prennent la relève, pas les petites ouvrières |
| 2 | majeur | §6 Fourmis | Le moulin n'est pas la phase tore de Couzin et al. 2002 (modèle poissons/oiseaux, sans phéromone) |
| 3 | majeur | Tableau, « Freinage » | Les fourmis ont des signaux négatifs explicites (phéromone « no entry », inhibition par encombrement) |
| 4 | majeur | Tableau, « Contenu du signal » | Le signal des fourmis n'est pas un scalaire unique |
| 5 | majeur | Tableau et §1 à §6 | « La fourmi » regroupe au moins 5 genres aux mécanismes distincts; le canal « piste » ne vaut pas pour tous |
| 6 | majeur | §1 À reproduire | Comparaison piste/danse non appariée; le blocage n'est pas général chez les fourmis |
| 7 | majeur | §1 Fonction de choix | k et n absents; n ≈ 2 est un ajustement collectif, pas une règle individuelle; k non vérifié |
| 8 | majeur | §4 Fourmis | L'analogie TCP n'est pas dans Prabhakar et al. 2012; espèce et stimulus à préciser |
| 9 | majeur | Thèse | « La reine ne commande pas » à borner (phéromones royales et reproduction) |
| 10 | mineur | §3 Fourmis | Modèle à seuils : limites empiriques récentes (Ulrich et al. 2021) |
| 11 | mineur | §6 Phengaris | Mimétisme chimique **et** acoustique; c'est une usurpation d'identité, pas une injection dans le canal de coordination |
| 12 | mineur | §1 | Goss 1989 : espèce, rapport de longueurs, effectifs et caractère statistique du résultat à préciser |
| 13 | mineur | §1 | Attribution de la fonction de choix : ajouter Deneubourg et Goss 1989 |
| 14 | mineur | §5 | Pratt 2002 : espèce alors nommée *Leptothorax albipennis*; Pratt 2005 : notice de 2006 au même titre à vérifier |
| 15 | mineur | §5 | Il manque Pratt et Sumpter 2006, la meilleure référence pour un « curseur quorum » |
| 16 | mineur | §5 et §6 | Le bris d'égalité et l'interblocage n'ont pas d'équivalent fourmi précisé (pas d'inhibition croisée connue chez *Temnothorax*) |
| 17 | mineur | §6 | Schneirla 1944 : première observation (Beebe 1921), espèce et lieu à préciser |
| 18 | mineur | §2 | L'évaporation de l'ACO est « au-delà de la plausibilité biologique »; à dire dans le visuel |
| 19 | mineur | Tableau, « Canal » | La persistance de la piste varie (de ~30 min à quelques heures; dépend du substrat) |
| 20 | mineur | §4 Contraste | La loi de Little s'applique côté fourmi, mais à une autre grandeur que la « file » |
| 21 | mineur | §3 Agentique | La diversité qui stabilise n'est appuyée que par l'abeille; ajouter un appui fourmi |

## Constats détaillés

### 1. [critique] Wilson 1984 : résultat inversé (§3)

- **v3 :** « retrait d'une caste (Wilson 1984, Pheidole) […] À reproduire : les petites ouvrières prennent la relève. »
- **Sources :** Wilson, E. O. (1984). *Behav Ecol Sociobiol* 16 : 89–98, [doi:10.1007/BF00293108](https://doi.org/10.1007/BF00293108). Résumé de l'éditeur [S, via l'extrait indexé de Springer] : dix espèces de *Pheidole* étudiées. Quand le ratio minors:majors est abaissé sous 1:1 chez *P. guilelmimuelleri*, *P. megacephala* et *P. pubiventris*, le répertoire des **majors** grandit de 1,4 à 4,5 fois et leur activité de 15 à 30 fois. Ils rétablissent alors au moins 75 % du taux d'activité des minors manquants : ils forment une caste de réserve d'urgence. Bonabeau, Theraulaz et Deneubourg 1996 [L, résumé] présentent leur modèle à seuils fixes comme rendant compte de ces observations.
- **Problème :** l'expérience retire les **petites** ouvrières (minors), et ce sont les **grandes** (majors, ou soldats) qui reprennent leurs tâches. La phrase de v3 dit l'inverse. C'est l'expérience phare du projet 3, donc le banc de reproduction viserait le mauvais résultat.
- **Recommandation :** remplacer par « Retrait des minors (ratio minors:majors < 1:1) → les majors, à seuil élevé pour ces tâches, s'y mettent quand le stimulus monte; ils rétablissent ≥ 75 % de l'activité perdue (Wilson 1984; modèle : Bonabeau et al. 1996, 1998) ». Cible quantitative : facteur d'activité des majors et part d'activité rétablie.

### 2. [majeur] Le moulin n'est pas la phase tore de Couzin et al. 2002 (§6)

- **v3 :** « moulin (Schneirla 1944; phase tore de Couzin et al. 2002) ».
- **Sources :**
  - Couzin, Krause, James, Ruxton, Franks (2002). *J Theor Biol* 218 : 1–11 [L, résumé Europe PMC]. Modèle 3D à zones (répulsion, orientation, attraction) appliqué aux « fish schools and bird flocks ». Le résumé ne mentionne ni phéromone ni fourmis.
  - Couzin et Franks (2003). *Proc R Soc B* 270 : 139–146 [L, texte intégral]. Modèle de **suivi de piste phéromonale** avec évitement local, calibré sur *Eciton burchellii*, en conditions aux limites périodiques « very similar to the circular mill ». La figure 2 porte le titre « Circular milling ».
  - Delsuc (2003). *PLoS Biol* 1 : e37 [L] : le moulin survient quand des fourrageuses sont séparées de la colonne par une perturbation de leur communication phéromonale (Schneirla 1944). Delsuc cite Couzin et Franks 2003 comme démonstration du caractère auto-organisé.
- **Problème :** chez les fourmis légionnaires (aveugles), le moulin vient de la rétroaction piste → suivi. Le tore de Couzin 2002 vient de l'alignement et de l'attraction à distance, typiques des vertébrés à vision. C'est une convergence de forme, pas de mécanisme. Simuler le moulin « fourmi » avec le modèle de 2002 enseignerait un mauvais mécanisme, ce qui contredit le principe du projet (« le contraste vient du mécanisme »).
- **Recommandation :** pour la fourmi, modèle de suivi de piste avec dépôt et évaporation (base : Couzin et Franks 2003). Montrer le tore de 2002 seulement comme contrepoint : même motif, autre mécanisme (bancs de poissons). C'est d'ailleurs un bon visuel pédagogique. Paramètre d'ordre à reproduire : le flux normalisé F de Couzin et Franks 2003.

### 3. [majeur] « Freinage : absence de retours » : fausse asymétrie (tableau)

- **Sources :**
  - Robinson, Jackson, Holcombe, Ratnieks (2005). *Nature* 438 : 442 [L, résumé] : phéromone de piste **négative** (« no entry ») déposée par *Monomorium pharaonis* pour marquer une branche non récompensée.
  - Dussutour, Fourcassié, Helbing, Deneubourg (2004). *Nature* 428 : 70–73 [L, résumé] : sous forte densité, une seconde piste s'établit avant que le débit chute; « the underlying mechanism is based on inhibitory interactions ».
  - Czaczkes, Grüter, Ratnieks (2015). *Annu Rev Entomol* 60 : 581–599 [L, résumé] : les pistes règlent le fourragement par rétroactions positive **et négative**.
- **Problème :** le tableau suggère que seule l'abeille dispose d'un frein actif (trémulation, signal d'arrêt) et que la fourmi ne freine que par absence de signal. C'est faux en général. « Absence de retours » n'est juste que pour *Pogonomyrmex barbatus* (projet 4). Les projets 5 et 6 (veto, interblocage) héritent de cette asymétrie.
- **Recommandation :** ligne « Freinage » côté fourmi = « évaporation; phéromone répulsive (*M. pharaonis*); inhibition par encombrement (*Lasius niger*); baisse du taux de rencontres (*Pogonomyrmex*) ». Ajouter au projet 1 une variante « no entry » comparée au signal d'arrêt de l'abeille. C'est la comparaison la plus propre entre « veto chimique persistant » et « veto adressé éphémère » [I].

### 4. [majeur] « Contenu du signal : intensité (scalaire) » (tableau)

- **Sources :**
  - Jackson, Holcombe, Ratnieks (2004). *Nature* 432 : 907–909 [L, résumé] : la **géométrie** des bifurcations (~60°) donne une polarité au réseau de pistes de *M. pharaonis*.
  - Robinson et al. 2005 (ci-dessus) : signal de **signe** opposé.
  - Beckers, Deneubourg, Goss (1993). *J Insect Behav* 6 : 751–759 [B, via la bibliographie de Perna et al. 2012] : modulation du dépôt chez *L. niger* selon la source.
  - Grüter, Czaczkes, Ratnieks (2011). *Behav Ecol Sociobiol* 65 : 141–148, [doi:10.1007/s00265-010-1020-2](https://doi.org/10.1007/s00265-010-1020-2) [B]. Conflit entre information privée (mémoire de route) et sociale (phéromone) chez *L. niger*. Résultat de mémoire [M] : les fourrageuses expérimentées suivent surtout leur mémoire.
  - Franks et Richardson (2006). *Nature* 439 : 153 [L, résumé] : la course en tandem chez *T. albipennis* comporte une rétroaction **bidirectionnelle** entre meneuse et suiveuse.
- **Problème :** réduire la fourmi à un scalaire fausse la question transversale (« scalaire → symbole → langage »). Chez plusieurs espèces, le signal a plusieurs canaux (attractif ou répulsif, court ou long terme), une polarité, une modulation par la qualité, et se combine avec une mémoire individuelle. Le tandem est même un protocole avec accusé de réception [I].
- **Recommandation :** reformuler en « scalaires multiples, localisés et signés + géométrie + mémoire privée ». Garder « scalaire » seulement comme simplification de modèle assumée (Deneubourg), et le dire. Ajouter une variable « information privée vs sociale » au moteur (cf. Czaczkes et al. 2015).

### 5. [majeur] « La fourmi » n'existe pas (tableau et §1 à §6)

- **Constat [I, appuyé sur les sources ci-dessus] :** v3 fait parler « la fourmilière » d'une seule voix. Or ses exemples mobilisent au moins cinq genres aux mécanismes différents :
  - *Linepithema humile* (piste de masse, §1, §2);
  - *Pheidole* (castes physiques, §3);
  - *Pogonomyrmex barbatus* (fourragement individuel sans piste, réglé par le taux de contacts, §4; Prabhakar et al. 2012 [L, résumé] : « no need for pheromone trails »);
  - *Temnothorax* (tandem et quorum, §5);
  - *Eciton* / *Labidus* (légionnaires aveugles, §6).

  La ligne « Canal : piste chimique » ne vaut ni pour *Pogonomyrmex* ni pour le tandem de *Temnothorax*. Côté abeille, une seule espèce (*Apis mellifera*) porte presque tout. L'asymétrie est méthodologique : on compare une espèce à un ordre.
- **Recommandation :** un tableau par mécanisme × **espèce nommée**. Dans le moteur, un « préréglage espèce » plutôt qu'un préréglage « fourmi ». Dire explicitement que la diversité des fourmis est une variable, pas un bruit. C'est un argument pour l'agentique (plusieurs architectures de chorégraphie possibles) [I].

### 6. [majeur] Projet 1 : comparaison non appariée; blocage non général

- **v3 :** « fourmis bloquées sur la branche longue quand la courte arrive tard; abeilles qui réallouent leurs butineuses quand on inverse la qualité des sources ».
- **Sources :**
  - Bonabeau, Dorigo, Theraulaz (2000). *Nature* 406 : 39–42 [L, texte intégral; figure « modified from » Goss et al. 1989] : avec *Linepithema humile* et r = 2, la branche courte gagne dans la plupart des 14 essais simultanés. Si elle arrive 30 min après la longue (18 essais), elle n'est pas sélectionnée, car la durée de vie de la phéromone est trop longue.
  - Dussutour, Beekman, Nicolis, Meyer (2009). *Proc R Soc B* 276 : 4353–4361 [L, résumé] : *Pheidole megacephala*, « unlike many other mass recruiting species », choisit la meilleure de deux sources **même quand l'environnement change dynamiquement**; le bruit y joue un rôle fonctionnel.
  - Reid, Sumpter, Beekman (2011). *J Exp Biol* 214 : 50–58 [L, résumé] : *L. humile* résout un labyrinthe des tours de Hanoï et s'adapte aux sections bloquées puis ajoutées. « Contrary to previous studies », une espèce à recrutement de masse peut fourrager efficacement en milieu dynamique, grâce à la phéromone d'exploration.
  - Reid et al. (2012). *Anim Behav* [L, résumé via Consensus] : chez *L. humile*, les demi-tours (U-turns) des ouvrières informées renforcent la piste vers la meilleure source.
  - Beckers, Deneubourg, Goss (1992). *J Theor Biol* 159 : 397–415 [B] : demi-tours et choix de chemin chez *L. niger*.
- **Problèmes :**
  1. La manipulation fourmi (longueur de chemin, ajout tardif) n'est pas celle de l'abeille (qualité de source, inversion). Le contraste mesuré confondrait espèce et manipulation [I].
  2. « Fourmis bloquées » est vrai pour Goss 1989 en laboratoire, mais faux comme trait général : des espèces à piste suivent les changements (*P. megacephala*), et *L. humile* elle-même s'adapte dans un autre dispositif.
- **Recommandation :** apparier les manipulations. (a) Changement de qualité de source, des deux côtés : abeille (Seeley et al. 1991) et fourmi (*P. megacephala*, Dussutour 2009; *L. niger*, Beckers et al. 1990, *Insectes Soc* 37 : 258–267 [B]). (b) Ajout tardif d'un raccourci côté fourmi, avec la variante d'évaporation. Montrer le blocage **et** sa levée (bruit, demi-tours, phéromone d'exploration). C'est plus juste et plus riche pour l'agentique : le compromis rigidité/adaptabilité se règle par des paramètres, l'architecture seule ne le fixe pas [I].

### 7. [majeur] Fonction de choix : paramètres absents, portée mal posée (§1)

- **v3 :** P_A = (k+A)^n / ((k+A)^n + (k+B)^n), sans valeurs.
- **Sources :**
  - Forme et exposant : Perna et al. (2012). *PLoS Comput Biol* 8 : e1002592 [L] : « an exponent a ≈ 2 reproduces experimental results » chez *L. humile* (Deneubourg et al. 1990); a ≈ 2 aussi chez *L. niger* (Beckers et al.); a = 4 dans une autre expérience en corridor.
  - Dorigo et Stützle (2004). *Ant Colony Optimization*, MIT Press, ch. 1 [S] : « the value α = 2, was derived from experiments on trail-following (Deneubourg et al., 1990) ». A et B y valent le nombre cumulé de passages (« no pheromone evaporation is considered »). Le dépôt à l'aller **et** au retour est nécessaire pour converger vers la branche courte.
  - Individu vs collectif : Perna et al. 2012 [L, résumé] montrent qu'à l'échelle **individuelle**, la réponse suit une loi de Weber (proportionnelle). Le sigmoïde de Deneubourg émerge au niveau collectif si on ajoute un bruit directionnel.
  - k : la valeur k ≈ 20 couramment citée (Bonabeau, Dorigo, Theraulaz 1999, *Swarm Intelligence*) est **[M], non vérifiée** dans un texte lu. Chez Dorigo et Stützle, la constante additive est t_s (temps de traversée de la branche courte), pas 20 [S]. Deneubourg et al. 1990 est [B] seulement : *J Insect Behav* 3 : 159–168, [doi:10.1007/BF01417909](https://doi.org/10.1007/BF01417909).
- **Problèmes :** sans k ni n, le critère « reproduire un résultat publié » ne peut pas s'appliquer. Présenter la formule comme une règle de décision individuelle contredit la mesure directe de Perna et al., alors que le projet vise justement « l'intelligence individuelle et collective ».
- **Recommandation :** fixer n = 2 (source : Deneubourg et al. 1990, via Perna 2012 et Dorigo et Stützle 2004). Traiter k comme un paramètre dépendant du dispositif, avec une analyse de sensibilité, et confirmer « k ≈ 20 » dans le PDF de Deneubourg et al. 1990 avant de l'écrire. Préciser : A et B = passages cumulés, sans évaporation; dépôt aller-retour. Ajouter un mode « individu Weber + bruit » qui reproduit le sigmoïde collectif. C'est un visuel fort pour l'émergence individuel → collectif [I].

### 8. [majeur] Analogie TCP : attribution et précision (§4)

- **v3 :** « rythme des retours chargés, analogue à TCP (Prabhakar, Dektar, Gordon 2012; Gordon 2010) ».
- **Sources :**
  - Prabhakar, Dektar, Gordon (2012). *PLoS Comput Biol* 8 : e1002670 [L]. Espèce : *Pogonomyrmex barbatus*. Le stimulus est le taux de **contacts antennaires**, dans le nid, entre butineuses qui reviennent avec de la nourriture et butineuses prêtes à sortir. L'article ne parle que de « computer networks » en général (recherche des chaînes « TCP », « Internet », « congestion » : aucune occurrence, selon l'outil de lecture). Il signale lui-même une corrélation simulée plus forte qu'observée et l'effet de la météo.
  - L'analogie TCP (« anternet ») vient du communiqué de Stanford (août 2012) [L](https://engineering.stanford.edu/news/stanford-biologist-and-computer-scientist-discover-anternet), puis de Gordon (2014), *PLoS Biol* 12 : e1001805 [L] : « Likewise TCP, the protocol that manages traffic congestion in the internet, uses a similar algorithm ».
  - Gordon (2010). *Ant Encounters: Interaction Networks and Colony Behavior*, Princeton UP, coll. Primers in Complex Systems [L, page éditeur]. Correct.
- **Recommandation :** citer Gordon 2014 (et le communiqué) pour l'analogie, et Prabhakar 2012 pour le modèle. Nommer l'espèce. Préciser que l'analogie porte sur l'auto-cadencement par accusés de réception (le retour chargé joue le rôle de l'ACK), pas sur tout TCP [I]. Ajouter la variabilité entre colonies et l'effet de l'humidité (Gordon, Dektar, Pinter-Wollman 2013, *PLoS ONE* [B]) comme cas limites à simuler.

### 9. [majeur] Thèse « la reine ne commande pas » à borner

- **Source :** Van Oystaeyen et al. (2014). *Science* 343 : 287–290 [L, résumé] : une classe conservée d'hydrocarbures saturés sert de phéromone royale qui **empêche les ouvrières de se reproduire** chez des guêpes, des bourdons et des fourmis (*Cataglyphis* [M]). Nuance : Amsalem et al. 2015 (*Proc R Soc B* 282 : 20151800 [L, résumé]) contestent la généralité chez *Bombus impatiens*.
- **Problème :** sans borne, la thèse est attaquable par tout myrmécologue. La reine émet bel et bien un signal diffusé qui règle un aspect de la colonie (la reproduction), même si elle ne dirige ni le travail ni les décisions.
- **Recommandation :** « la reine ne dirige ni l'allocation du travail ni les décisions collectives; elle émet surtout un signal d'état (fertilité) qui règle la reproduction ». Chez *Temnothorax*, la reine est transportée comme du couvain pendant l'émigration [M]. C'est une bonne illustration de la thèse, à sourcer.

### 10. [mineur] Seuils de réponse : bornes empiriques (§3)

- **Sources :**
  - Bonabeau et al. (1996). *Proc R Soc B* 263 : 1565–1569 [B + résumé L].
  - Theraulaz, Bonabeau, Deneubourg (1998). *Proc R Soc B* 265 : 327–332 [B + résumé L] : seuils renforcés par la pratique et oubliés sans elle. Ils prédisent qu'après retrait puis réintroduction des spécialistes, la colonie ne retrouve pas son état antérieur, d'autant moins que la séparation a duré.
  - Ulrich et al. (2021). *PLoS Biol* 19 : e3001269 [L, résumé] : sur 120 colonies d'*Ooceraea biroi*, la variation des seuils seule ne reproduit pas les patrons observés; il faut aussi l'efficacité variable et la demande des larves.
- **Notes :**
  - Forme T_θ(s) = s²/(s²+θ²) : conforme à ma connaissance, [M]; non relue dans le primaire (paywall).
  - Le « résultat à reproduire » de Theraulaz 1998 est une prédiction de modèle, pas une mesure. À dire.
- **Recommandation :** ajouter Ulrich 2021 comme borne (« les seuils expliquent une partie du phénomène, pas tout »), et prévoir un curseur « efficacité individuelle ».

### 11. [mineur] *Phengaris* : mécanisme et analogie (§6)

- **Sources :**
  - Akino, Knapp, Thomas, Elmes (1999). *Proc R Soc B* 266 : 1419–1426 [B; auteurs M] : mimétisme chimique de *Maculinea* (= *Phengaris*) *rebeli* chez *Myrmica*.
  - Nash et al. (2008). *Science* 319 : 88–90 [L, résumé] : mosaïque coévolutive chimique chez *M. alcon*.
  - Barbero et al. (2009). *Science* 323 : 782–785 [L, résumé] : les chenilles et chrysalides **imitent les sons de la reine** de *Myrmica schencki*.
  - Barbero et al. (2009). *J Exp Biol* 212 : 4084–4090 [L, résumé] : le mimétisme chimique permet l'entrée; le mimétisme acoustique élève le statut.
- **Problème :** *Phengaris* trompe la **reconnaissance coloniale** (identité, statut). Elle n'injecte rien dans le canal de coordination (piste). L'analogue agentique est l'usurpation d'identité ou l'élévation de privilège, plus que la *prompt injection* [I].
- **Recommandation :**
  - Garder *Phengaris* pour « usurpation d'identité ».
  - Pour l'injection de faux signaux, ajouter les « substances de propagande » de *Leptothorax kutteri* : une sécrétion de la glande de Dufour pousse les ouvrières hôtes à s'attaquer entre elles (Allies, Bourke, Franks 1986, *J Chem Ecol* 12 : 1285–1293 [L, résumé]).
  - Ajouter, côté artificiel, Aswale et al. (2022, AAMAS) [L](https://arxiv.org/html/2202.01808v2) : 3 % de « détracteurs » qui déposent une fausse phéromone persistante divisent la collecte par ~150; une phéromone de prudence la remonte d'environ 57 fois. C'est directement transposable aux bancs EscapeBench et LeakLab [I].
  - Note de recherche bibliographique : *Maculinea* est l'ancien nom, encore dominant dans la littérature d'avant ~2010 [M].

### 12. [mineur] Goss et al. 1989 : précisions (§1)

- **Sources :** *Naturwissenschaften* 76 : 579–581 [B]; détails via Bonabeau et al. 2000 et Dorigo et Stützle 2004 [S].
  - Espèce : *Iridomyrmex humilis*, aujourd'hui *Linepithema humile*.
  - Rapport de longueurs r = 2.
  - Essais : 14 simultanés, 18 avec la branche courte ajoutée à t = 30 min.
  - Le résultat est statistique : « the colony may occasionally get “stuck” on a longer path » même en présentation simultanée (Bonabeau 2000).
- **Recommandation :** nommer l'espèce (les deux noms), donner r, le délai et les effectifs, et reproduire des **distributions sur essais** (histogrammes de % de trafic sur la branche courte), pas une trajectoire unique.

### 13. [mineur] Attribution de la fonction de choix (§1)

- Deneubourg et al. 1990 porte d'abord sur le **patron exploratoire** (résumé [L, via Consensus]); le pont à branches égales y sert d'appui.
- **Recommandation :** ajouter Deneubourg et Goss (1989), « Collective patterns and decision making », *Ethol Ecol Evol* 1 : 295–311 [B, réf. 1 de Bonabeau et al. 2000].

### 14. [mineur] Pratt et al. 2002 et 2005 : noms et version (§5)

- Pratt, Mallon, Sumpter, Franks (2002). *Behav Ecol Sociobiol* 52 : 117–127, [doi:10.1007/s00265-002-0487-x](https://doi.org/10.1007/s00265-002-0487-x) [B]. Titre original : « …by the ant *Leptothorax albipennis* ». Le genre a changé depuis.
- Pratt, Sumpter, Mallon, Franks (2005). *Anim Behav* 70 : 1023–1036, [doi:10.1016/j.anbehav.2005.01.022](https://doi.org/10.1016/j.anbehav.2005.01.022) [B]. Crossref liste aussi *Anim Behav* 71 : 478 (2006), [doi:10.1016/j.anbehav.2005.11.001](https://doi.org/10.1016/j.anbehav.2005.11.001), au **même titre**. Probablement un erratum [I]; à lire avant de reprendre des valeurs de paramètres.
- Franks, Pratt, Mallon, Britton, Sumpter (2002). *Phil Trans R Soc B* 357 : 1567–1583 [L, résumé] : compare bien abeilles et *L. albipennis*. Correct.
- Franks, Dornhaus, Fitzsimmons, Stevens (2003). *Proc R Soc B* 270 : 2457–2463 [L, résumé] : en conditions dures, les colonies décident plus vite mais discriminent moins, avec un quorum abaissé. Correct.

### 15. [mineur] Référence manquante pour le curseur de quorum (§5)

- Pratt et Sumpter (2006). *PNAS* 103 : 15906–15910 [L, texte PMC]. Chez *Temnothorax curvispinosus* :
  - quorum de 5,7 ± 0,5 fourmis en émigration forcée contre 12,7 ± 0,6 en émigration non forcée;
  - quorum estimé par ajustement d'une fonction de Hill sur la proportion de transports selon la population du site;
  - taux de recherche et d'acceptation plus élevés en émigration forcée.
- **Recommandation :** en faire la cible quantitative du projet 5 côté fourmi (« algorithme accordable »).

### 16. [mineur] Bris d'égalité et interblocage côté fourmi (§5, §6)

- **Constat :** Pratt et Sumpter 2006 [L] ne mentionnent ni inhibition croisée ni signal d'arrêt chez *Temnothorax*. À ma connaissance, aucun n'y est documenté [M].
- v3 ne dit pas ce qui, chez la fourmi, correspond à « l'inhibition croisée débloque une égalité ». Ce serait plutôt la course de rétroaction quorum → transport, ou une scission temporaire de la colonie [M].
- **Recommandation :** énoncer l'expérience fourmi équivalente (deux sites de qualité égale), avec la sortie attendue sourcée, ou déclarer l'asymétrie comme résultat comparatif.

### 17. [mineur] Schneirla 1944 (§6)

- *American Museum Novitates* 1253 [B]. Observation à Barro Colorado, Panama [L, page du STRI](https://striresearch.si.edu/barrocolorado100/ants/).
- Première description publiée : Beebe 1921 [S, Wikipédia, « Ant mill »].
- Espèce : *Labidus praedator* (alors *Eciton praedator*) [M]; à confirmer dans le texte AMNH.

### 18. [mineur] ACO vs fourmis réelles (§2)

- Bonabeau et al. (2000) [L] : les informaticiens ont dû augmenter l'évaporation « beyond biological plausibility ».
- Dorigo et Stützle (2004) [S] : chez les fourmis réelles, l'évaporation joue un rôle mineur dans la découverte du plus court chemin.
- Dorigo, Maniezzo, Colorni (1996). *IEEE Trans SMC-B* 26(1) : 29–41, [doi:10.1109/3477.484436](https://doi.org/10.1109/3477.484436) [B]. Correct.
- **Recommandation :** l'écrire dans le visuel « arêtes épaissies ». Le terme heuristique η^β, la liste tabou et le dépôt proportionnel à la qualité du tour n'ont pas d'équivalent biologique direct [I].

### 19. [mineur] Persistance de la piste (tableau, « Canal »)

- Perna et al. 2012 [L] : la phéromone synthétique de *L. humile* a une demi-vie de l'ordre de 30 min (borne inférieure), contre ~4 h pour des extraits de gastre.
- Jeanson, Ratnieks, Deneubourg (2003) [B, via la bibliographie de Perna 2012] : la décroissance dépend du substrat.
- **Recommandation :** « persistante » est relatif. En faire un paramètre calibré par espèce et par substrat.

### 20. [mineur] Loi de Little côté fourmi (§4)

- [I] Appliquée à *Pogonomyrmex*, la loi donne une relation juste et utile : nombre de butineuses dehors = taux de sortie × durée moyenne d'un trajet. Ce n'est pas une file d'attente au sens où l'est celle des receveuses de la ruche. Le rapprochement « deux lectures de la même file » doit donc préciser quelles grandeurs L, λ et W on mesure de chaque côté.

### 21. [mineur] Diversité qui stabilise : appui fourmi absent (§3)

- Hasegawa et al. (2016). *Sci Rep* 6 : 20846 [L, résumé] : les ouvrières inactives, à seuils variés, assurent la pérennité de la colonie au prix d'une productivité moindre à court terme.
- Avec Ulrich et al. 2021, cela donne au parallèle agentique (« même modèle, même prompt ») un appui côté fourmi, pas seulement côté abeille (Jones et al. 2004).

## Mécanismes myrmécologiques majeurs absents

Classés par utilité pour la chorégraphie agentique [I sur l'utilité].

1. **Signaux négatifs et inhibition** : phéromone « no entry » (Robinson et al. 2005); inhibition par encombrement et réserve de capacité (Dussutour et al. 2004). Équivalents : veto persistant et délestage de charge.
2. **Information privée vs sociale** : mémoire de route contre piste (Grüter et al. 2011; synthèse : Czaczkes et al. 2015). Équivalent : agent qui pondère son contexte propre contre l'état partagé.
3. **Seuil de taille et transition de phase** : sous une taille critique, fourragement désordonné; au-delà, organisé, avec hystérésis (Beekman, Sumpter, Ratnieks 2001, *PNAS* 98 : 9703–9706 [L, résumé]). Équivalent : combien d'agents faut-il pour qu'une chorégraphie s'installe.
4. **Bruit fonctionnel et exploration** : *P. megacephala* (Dussutour et al. 2009); phéromone d'exploration (Reid et al. 2011). Équivalent : température et exploration.
5. **Ouvrières informées et demi-tours** : Beckers et al. 1992; Reid et al. 2012.
6. **Transport coopératif à meneur transitoire** : Gelblum et al. (2015), *Nat Commun* 6 : 7729 [L, résumé]. Le groupe amplifie au maximum l'effet d'une seule fourmi informée, près d'une transition de phase. Espèce *Paratrechina longicornis* [M]. Équivalent : leadership éphémère sans chef. C'est le cas le plus proche de la « chorégraphie avec soliste ».
7. **Auto-assemblage** : ponts vivants d'*Eciton* ajustés par un arbitrage coût/bénéfice, sans qu'aucun individu ne connaisse ce bilan global (Reid et al. 2015, *PNAS* [L, résumé; volume et pages M]).
8. **Construction stigmergique** : *Lasius niger*, où la durée de vie de la phéromone contrôle l'architecture (Khuong et al. 2016, *PNAS* 113 : 1303–1308 [L, résumé]). Le terme « stigmergie » vient de Grassé (1959), à propos des **termites** [M]. À dire si v3 utilise le mot.
9. **Réseaux d'interactions et taux de rencontres** : Gordon 2010; le quorum de *Temnothorax* se lit aussi par taux de rencontres (Pratt 2005, *Behav Ecol* [M]).
10. **Enseignement par tandem** : rétroaction bidirectionnelle (Franks et Richardson 2006), soit un protocole avec accusé de réception. Mise en œuvre rapide par tandems inversés (Franks et al. 2009, *Phil Trans R Soc B* 364 : 845–852 [L, résumé]).
11. **Rationalité collective et capacité cognitive de groupe** : Sasaki et Pratt (2012), *Curr Biol* 22 : R827–R829 [L, résumé].
12. **Raids de légionnaires auto-organisés** : Deneubourg, Goss, Franks, Pasteels (1989), *J Insect Behav* 2 : 719–725 [B]; Franks et al. (1991), *J Insect Behav* 4 : 583–607 [B].
13. **Phéromones royales** et reconnaissance coloniale par hydrocarbures cuticulaires (Van Oystaeyen et al. 2014), indispensables pour borner la thèse et pour le volet « intrus ».
14. **Cycles d'activité synchronisés** chez *Leptothorax* (Cole 1991; Boi et al. 1999) [M, non vérifiés]. Pertinents pour « des agents identiques oscillent ».

## Recommandations prioritaires pour v4

1. Corriger Wilson 1984 (constat 1).
2. Remplacer le tore de 2002 par Couzin et Franks 2003 pour le moulin; garder le tore comme contrepoint (constat 2).
3. Réécrire le tableau par **espèce nommée**, avec freinage actif et signal multicanal (constats 3, 4, 5).
4. Apparier les manipulations du projet 1, et montrer le blocage **et** sa levée (constat 6).
5. Fixer n = 2; vérifier k dans le PDF de Deneubourg et al. 1990; ajouter le mode « Weber individuel » (constat 7).
6. Réattribuer l'analogie TCP (constat 8); borner la thèse sur la reine (constat 9).
7. Ajouter Pratt et Sumpter 2006, Dussutour 2009, Reid 2011, Robinson 2005, Beekman 2001, Gelblum 2015, Ulrich 2021 et Aswale 2022 au corpus de reproduction.
8. Avant publication, lire en texte intégral : Goss 1989, Deneubourg 1990, Wilson 1984, Bonabeau 1996, Pratt 2002, Pratt 2005 (et sa notice de 2006), Schneirla 1944. Ce sont les seules qui permettent de trancher les points encore [S] ou [M].

## Sources consultées (URL)

- Bonabeau, Dorigo, Theraulaz 2000, *Nature* 406 : 39–42 : https://www.nature.com/articles/35017500 (texte lu via https://antoptima.com/pdf/pdfrassegna2/pdf021.pdf)
- Dorigo et Stützle 2004, *Ant Colony Optimization*, ch. 1 : https://web2.qatar.cmu.edu/~gdicaro/15382/additional/aco-book.pdf
- Perna et al. 2012, *PLoS Comput Biol* : https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002592 (préimpression https://arxiv.org/abs/1201.5827)
- Goss et al. 1989 (métadonnées) : https://www.semanticscholar.org/paper/Self-organized-shortcuts-in-the-Argentine-ant-Goss-Aron/3d07f29efdb75213aaabef4d71a263a6fa2d72cb
- Deneubourg et al. 1990 : https://doi.org/10.1007/BF01417909
- Wilson 1984 : https://link.springer.com/article/10.1007/BF00293108
- Bonabeau et al. 1996 : https://doi.org/10.1098/rspb.1996.0229 ; Theraulaz et al. 1998 : https://doi.org/10.1098/rspb.1998.0299
- Ulrich et al. 2021 : https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.3001269
- Prabhakar, Dektar, Gordon 2012 : https://journals.plos.org/ploscompbiol/article?id=10.1371%2Fjournal.pcbi.1002670
- Gordon 2014, *PLoS Biol* : https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001805
- Communiqué Stanford « anternet » (2012) : https://engineering.stanford.edu/news/stanford-biologist-and-computer-scientist-discover-anternet
- Gordon 2010, *Ant Encounters* : https://press.princeton.edu/books/paperback/9780691138794/ant-encounters
- Pratt et Sumpter 2006, *PNAS* : https://pmc.ncbi.nlm.nih.gov/articles/PMC1635101/
- Pratt et al. 2002 : https://doi.org/10.1007/s00265-002-0487-x ; Pratt et al. 2005 : https://doi.org/10.1016/j.anbehav.2005.01.022 ; notice 2006 : https://doi.org/10.1016/j.anbehav.2005.11.001
- Franks et al. 2002, 2003, 2009 : Europe PMC, https://www.ebi.ac.uk/europepmc/ (recherche par titre)
- Couzin et al. 2002 : Europe PMC (résumé), *J Theor Biol* 218 : 1–11
- Couzin et Franks 2003 : https://www.sccs.swarthmore.edu/users/08/bblonder/phys120/docs/couzin.pdf
- Delsuc 2003, *PLoS Biol* : https://journals.plos.org/plosbiology/article?id=10.1371%2Fjournal.pbio.0000037
- STRI, Barro Colorado : https://striresearch.si.edu/barrocolorado100/ants/
- Robinson et al. 2005; Jackson et al. 2004; Dussutour et al. 2004; Van Oystaeyen et al. 2014; Amsalem et al. 2015 : Europe PMC (résumés)
- Dussutour et al. 2009; Reid et al. 2011; Khuong et al. 2016; Gelblum et al. 2015; Hasegawa et al. 2016; Beekman et al. 2001 (https://doi.org/10.1073/pnas.161285298) : Europe PMC (résumés)
- Czaczkes et al. 2015; Franks et Richardson 2006; Sasaki et Pratt 2012; Allies et al. 1986 : Europe PMC (résumés)
- Barbero et al. 2009 (*Science*, *J Exp Biol*); Nash et al. 2008; Akino et al. 1999 (https://doi.org/10.1098/rspb.1999.0796) : Europe PMC
- Aswale et al. 2022, AAMAS : https://arxiv.org/html/2202.01808v2
- Grüter et al. 2011 : https://doi.org/10.1007/s00265-010-1020-2 ; Beckers et al. 1990 : https://doi.org/10.1007/BF02224053 ; Beckers et al. 1992 : https://doi.org/10.1016/S0022-5193(05)80686-1
- Dorigo, Maniezzo, Colorni 1996 : https://doi.org/10.1109/3477.484436

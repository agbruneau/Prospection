# Audit de la proposition v3 — angle « vulgarisation »

Date : 2026-10-01. Objet : `proposition-v3.md` (lue en entier). Régime : production (livrable sur lequel le chercheur va agir).

**Méthode et limites.** Chaque constat indique sa preuve : **[lu]** = vérifié dans la source citée (page primaire ou notice bibliographique consultée); **[recherche]** = vérifié seulement par résultats de recherche ou notice secondaire; **[inféré]** = raisonnement de l'auditeur, sans source; **[calculé]** = calcul reproductible (script [`v0_cvd.py`](../../../recherche/verifications-numeriques/v0_cvd.py)). Limites : le budget WebSearch et le quota de l'outil de recherche scientifique se sont épuisés en cours d'audit; le site de l'EPTC 2 (ethics.gc.ca) a été refusé par l'outil (certificat); Slessor et al. 1988, la palette Okabe-Ito et le *Debunking Handbook* n'ont pas été lus à la source. Ces points sont signalés au cas par cas.

---

## 1. Verdict

La v3 est un bon programme scientifique, mais la vulgarisation, pourtant exigée au même titre que les projets académiques, y tient en une phrase (« page interactive à trois niveaux »). Il manque l'essentiel : publics cibles, objectifs d'apprentissage mesurables, évaluation de l'efficacité, accessibilité, règles de conception visuelle. Plus grave, deux choix structurants vont à l'encontre de la littérature. D'abord, le niveau 1 est une « animation libre » : c'est le public le moins outillé qui reçoit le moins de guidage, alors que PhET constate que l'animation sans interaction apporte peu. Ensuite, le message central (« la reine ne commande pas », « chorégraphie », table fourmi → abeille → LLM) risque de renforcer les conceptions erronées qu'il combat : esprit centralisateur, téléologie, échelle évolutive. Il réintroduit même l'orchestration dans la carte agentique (« Délégation »). Tout cela se corrige au stade du devis, à faible coût, si l'on ajoute un volet transversal « vulgarisation et évaluation » doté de ses propres livrables.

Bilan : **4 critiques, 14 majeurs, 12 mineurs.**

---

## 2. Constats

### Critiques

**C1 — Aucun public cible n'est défini.** *(v3, l. 3 et 20)*
- Problème : quatre publics aux besoins incompatibles se partagent implicitement les mêmes pages : grand public, étudiants, praticiens de l'agentique, chercheurs. Sans public nommé, rien ne permet de calibrer les trois niveaux, la durée, le vocabulaire ou le canal (classe, musée, blogue technique, article).
- Preuve : [lu] la v3 ne nomme aucun public. [lu] PhET a dû restreindre et étudier son public cible, des étudiants de premier cycle, au moyen de plus de 200 entrevues individuelles (Adams et al.).
- Recommandation : une fiche par public, avec contexte d'usage, durée disponible, point d'entrée, prérequis, canal et objectif principal (voir §3.1). Chaque page déclare son public principal et ses publics secondaires.

**C2 — Aucun objectif d'apprentissage mesurable, aucune évaluation de l'efficacité pédagogique.** *(v3, l. 20 « Critère de rigueur »)*
- Problème : la rigueur n'est exigée que du côté scientifique (reproduire un résultat publié). Or l'efficacité pédagogique de l'interactivité n'a rien d'acquis : elle varie selon la conception, et rien dans la v3 ne permet de savoir si les pages font mieux qu'un texte bien illustré.
- Preuve :
  - [lu] Hohman, Conlen, Heer, Chau (Distill, 2020) : les résultats empiriques sur les articles interactifs sont mitigés, et peu de lecteurs interagissent réellement.
  - [lu] Berney et Bétrancourt (EARLI 2016, résumé de l'article de *Computers & Education* 2016) : 140 comparaisons, 61 expériences, g = 0,226, soit un effet faible.
  - [recherche] Höffler et Leutner 2007 : d = 0,37.
  - [recherche] Smetana et Bell 2012 : les simulations sont efficaces surtout comme complément, avec un étayage de qualité, de la réflexion et une dissonance cognitive.
- Recommandation : un volet d'évaluation (voir §3.7) avec objectifs formulés selon Bloom révisé (Krathwohl 2002 [lu, notice]). Il comprend des items de conceptions erronées pré/post/différés, une condition témoin statique et le gain normalisé (Hake 1998 [recherche] : g = (post − pré)/(100 − pré)). Prévoir l'approbation éthique (EPTC 2, non consultée [inféré]) et la conformité à la Loi 25 pour toute analytique [lu].

**C3 — Le modèle des trois niveaux est inversé par rapport aux données probantes.** *(v3, l. 20)*
- Problème : le niveau 1 offre une « animation libre » sans guidage au grand public, l'expérience guidée n'arrive qu'au niveau 3 (chercheurs), et la carte fourmi/abeille/agentique, qui intéresse justement les praticiens, est cachée au niveau 3.
- Preuve :
  - [lu] PhET (Adams et al.) : quand une simulation ne fait que montrer un mouvement, les étudiants le prennent pour un fait et développent rarement de nouvelles idées; ils ne commencent à donner du sens qu'en interagissant. Les auteurs en concluent que la valeur éducative de l'animation sans interactivité est « quite limited ».
  - [lu] Kirschner, Sweller, Clark 2006 : le guidage minimal est moins efficace chez les novices.
  - [recherche] Segel et Heer 2010, structure en « verre à martini » : une tige guidée par l'auteur, suivie d'une exploration libre.
  - [recherche] Kim, Reinecke, Hullman 2017 : faire prédire avant de montrer améliore le rappel et la compréhension. Hohman et al. 2020 le citent [lu].
- Recommandation : réordonner en « Voir (récit guidé avec prédiction) → Explorer (bac à sable étayé, vue de l'agent, modifier la règle) → Vérifier (reproduction, distribution sur N graines, code, limites) ». La carte agentique devient accessible dès le niveau 1 sous une forme résumée (voir §3.2).

**C4 — La thèse-slogan et la métaphore centrale risquent de renforcer l'esprit centralisateur qu'elles combattent.** *(v3, titre, l. 5)*
- Problème, en trois volets :
  - (a) « Chorégraphie » évoque d'abord un chorégraphe. Le sous-titre « sans chorégraphe » corrige par une négation, que le lecteur pressé ne retiendra pas.
  - (b) « La reine ne commande pas » est trop général. Les reines régulent bel et bien la reproduction des ouvrières par phéromones. Un lecteur qui l'apprend ensuite risque de rejeter tout le message.
  - (c) La formulation négative installe le mythe en tête de page.
- Preuve :
  - [lu] Resnick 1996 : les élèves expliquent d'abord les motifs « by lead or by seed » (par un chef ou par un germe). Il cite le ballet, dont le public suppose à juste titre que les mouvements ont été planifiés par un chorégraphe, comme exemple qui *nourrit* l'esprit centralisateur. Dans MultiLogo, les enfants mettaient spontanément un agent « en charge », appelé « the teacher » ou « the mother ». Le même texte note que la reine termite ne « dit » pas aux ouvrières quoi faire.
  - [recherche] Slessor et al. 1988 (*Nature* 332) : phéromone mandibulaire de la reine d'abeille.
  - [recherche] Van Oystaeyen et al. 2014 (*Science* 343) : une classe conservée de phéromones de reine inhibe la reproduction des ouvrières chez les fourmis, les guêpes et certaines abeilles.
  - [inféré] l'effet de la négation sur la mémorisation. La littérature sur l'« effet boomerang » est elle-même discutée; je n'ai pas lu le *Debunking Handbook 2020* (existence vérifiée, DOI 10.17910/b7.1182).
- Recommandation : énoncer d'abord le mécanisme positif, puis préciser la portée. Par exemple : « Les décisions collectives (où butiner, où déménager, qui fait quoi) émergent d'interactions locales; aucune ouvrière ni la reine ne donne d'ordres. La reine, elle, signale sa présence et sa fécondité par des phéromones qui freinent la reproduction des ouvrières. » Ajouter un encart « Ce que fait vraiment la reine » dans le projet 3 ou 5, et tester l'item « Qui choisit le nouveau site de l'essaim ? » en pré/post. Si le titre garde « chorégraphie », expliquer dès la première ligne que le chorégraphe n'existe pas et que la « partition » est faite de règles locales.

### Majeurs

**M1 — La carte fourmi/abeille/agentique réintroduit l'orchestration et contient une asymétrie fausse.** *(table l. 9-16)*
- Problème :
  - La ligne « Recrutement → Délégation » contredit la thèse : en agentique, déléguer, c'est ce que fait un orchestrateur central.
  - « Freinage (fourmi) : absence de retours » omet que certaines fourmis disposent d'un signal négatif actif.
  - La table aligne des termes, alors qu'une analogie solide aligne des *relations*.
- Preuve :
  - [lu] Anthropic, *Building effective agents* (19 déc. 2024) : « a central LLM dynamically breaks down tasks, delegates them to worker LLMs ».
  - [recherche] Robinson, Jackson, Holcombe, Ratnieks 2005 (*Nature* 438) : phéromone répulsive « no entry » chez *Monomorium pharaonis*, concentrée aux bifurcations.
  - [lu, notice] Gentner 1983, structure-mapping.
  - [lu, notice] Peltz 2003, orchestration et chorégraphie de services web.
- Recommandation :
  - Remplacer « Délégation » par un mécanisme décentralisé : annonce d'opportunité sur un canal partagé, auto-sélection par les agents, ou « tableau noir / file de tâches réclamables ».
  - Ajouter le signal « no entry » côté fourmi.
  - Ajouter une colonne « Où l'analogie casse » et une colonne « Relation conservée » (p. ex. « rétroaction positive proportionnelle au succès »).
  - Faire valider la carte par un myrmécologue, un apidologue et un praticien de l'agentique.

**M2 — La gradation « scalaire → symbole → langage » se lit comme une échelle évolutive.** *(l. 18; projet 7, l. 69)*
- Problème : présenter la fourmi, puis l'abeille, puis le LLM sur un axe de « richesse du signal », et tracer une « courbe du gain collectif », sera lu comme une progression du moins au plus évolué. Pour la vulgarisation, c'est une erreur de phylogénie autant qu'une téléologie. La communication des fourmis est par ailleurs multimodale (plusieurs phéromones, signaux tactiles), ce que l'étiquette « scalaire » efface.
- Preuve : [recherche] Johnson et al. 2013 (*Current Biology*) : les fourmis sont le groupe frère des Apoidea (abeilles et guêpes apoïdes); ni ancêtres ni « version simple » des abeilles. [lu] Chi et al. 2012 : les élèves attribuent les motifs émergents à des agents de contrôle animés de buts.
- Recommandation : présenter la richesse du signal comme une *dimension de conception* parmi d'autres (persistance × contenu × localité × coût), sur un graphique non ordonné ou multi-axes, sans flèche fourmi → abeille → LLM. En visuel, la question devient « quel canal pour quel problème ? », pas « qui est le plus avancé ? ». Dire explicitement que les deux insectes sont des solutions différentes, et non des étapes.

**M3 — Le vocabulaire est anthropomorphique et téléologique, sans politique explicite.** *(passim)*
- Problème : « décision », « veto », « délégation », « débat », « la colonie rééquilibre », « les petites ouvrières prennent la relève ». Seeley lui-même parle de « démocratie ». Ces métaphores sont utiles pour les praticiens, mais le grand public les prend au pied de la lettre.
- Preuve : [lu] Kelemen et Rosset 2009 (*Cognition* 111) : sous contrainte de temps, des étudiants en sciences endossent davantage d'explications téléologiques injustifiées, ce qui correspond à la lecture rapide du grand public. [lu] Seeley 2010, *Honeybee Democracy*, quatrième de couverture : « collective fact-finding, vigorous debate, and consensus building ». [lu] Chi 2005 : les processus émergents produisent des conceptions erronées robustes.
- Recommandation : un lexique contrôlé à deux colonnes (§3.6), un encart « Ce que ça ne veut pas dire » par page, et des pictogrammes sans visage ni yeux expressifs. On mesure ensuite l'effet par des items ciblés (« La colonie *veut*… » vrai ou faux).

**M4 — L'accessibilité est absente, alors que le choix de Canvas l'exige explicitement.** *(l. 73)*
- Problème : un Canvas est une image matricielle, invisible aux lecteurs d'écran. Les animations à démarrage automatique et les « graphes temps réel » affichés à côté du texte, l'écran partagé, les curseurs et le glisser-déposer de sources ou de sites touchent directement plusieurs critères WCAG 2.2 AA.
- Preuve [lu] :
  - WCAG 2.2, Recommandation W3C du 12 déc. 2024.
  - 1.1.1 (A), alternative textuelle; 1.4.1 (A), pas la couleur seule; 1.4.11 (AA), contraste non textuel 3:1; 2.1.1 (A), clavier.
  - 2.2.2 (A), mécanisme de pause pour tout contenu en mouvement qui démarre seul, dure plus de 5 s et est présenté en parallèle, ou pour toute mise à jour automatique.
  - 2.5.7 (AA, nouveau), alternative sans glisser; 2.5.8 (AA, nouveau), cibles d'au moins 24 × 24 px CSS.
  - 4.1.2 (A), nom, rôle, valeur; 4.1.3 (AA), messages d'état; 1.4.10 (AA), reflow à 320 px CSS.
  - 2.3.3 (AAA), animation déclenchée désactivable; technique C39 `prefers-reduced-motion`.
  - Spécification HTML : l'auteur doit fournir du contenu qui transmet la fonction du canvas.
  - [lu] MDN : `prefers-reduced-motion` est Baseline depuis janv. 2020.
- Recommandation : viser WCAG 2.2 AA (liste de contrôle en §3.5). L'essentiel : boutons Lecture/Pause/Pas-à-pas, `<input type="range">` natifs, résumé textuel vivant (`role="status"`, à débit limité) et tableau de données équivalent à chaque graphe. En mode « mouvement réduit », remplacer l'animation par des instantanés en petits multiples.

**M5 — Couleurs et daltonisme : rien n'est spécifié, et la paire intuitive fourmi rouge-brun / abeille jaune-orange est la plus fragile.**
- Preuve :
  - [lu] Crameri, Shephard, Heron 2020 (*Nature Communications* 11:5444) : environ 8 % des hommes et 0,5 % des femmes ont une déficience de la vision des couleurs. Les auteurs recommandent d'éviter l'arc-en-ciel et le rouge-vert et d'utiliser des cartes perceptuellement uniformes (viridis, cividis, batlow), lisibles en niveaux de gris.
  - [calculé] Palette Okabe-Ito (codes hexadécimaux [recherche], source primaire Wong 2011 non lue), simulation Machado 2009, ΔE76. La paire vermillon #D55E00 / orange #E69F00 ne garde qu'un ΔE ≈ 18 en deutéranopie. L'orange n'a que 2,25:1 sur fond blanc, ce qui échoue le seuil 3:1 de 1.4.11. Le jaune #F0E442 tombe à 1,32:1.
  - Le meilleur trio testé est fourmi vermillon #D55E00, abeille bleu #0072B2 et agent pourpre #CC79A7 : pire ΔE ≈ 23 (bleu–pourpre en protanopie), contraste d'au moins 3,06:1 sur blanc et d'au moins 3,61:1 sur #121212.
- Recommandation : adopter ce trio, ou valider tout autre trio avec l'émulation de DevTools [lu : Chrome 83, protanopie, deutéranopie, tritanopie, achromatopsie]. Doubler chaque couleur d'un pictogramme et d'une étiquette (1.4.1). Pour la phéromone, utiliser une rampe séquentielle perceptuellement uniforme, jamais *jet*. ΔE76 reste une approximation : la vérification finale se fait à l'œil sous émulation.

**M6 — Les animations et les « courbes temps réel » ne sont pas pensées pour l'analyse.** *(visuels des projets 1 à 6)*
- Preuve :
  - [recherche] Robertson et al. 2008 (IEEE TVCG) : l'animation est la forme la moins efficace pour l'analyse; les petits multiples sont plus exacts, et l'animation, appréciée en présentation, y cause de nombreuses erreurs.
  - [recherche] Tversky, Morrison, Bétrancourt 2002 : principes d'appréhension et de congruence.
  - [lu] Berney et Bétrancourt 2016 : le rythme d'affichage modère l'effet; les représentations iconiques font mieux que les abstraites.
  - [lu, notice] Heer et Robertson 2007, transitions animées.
  - [lu] Victor 2011, *Ladder of Abstraction* : monter des instances concrètes vers la vue d'ensemble sur tous les paramètres (petits multiples), puis redescendre.
- Recommandation : chaque animation est couplée à un graphe statique synchronisé (série temporelle, curseur temporel commun) et à une vue « échelle d'abstraction » : balayage du paramètre clé en petits multiples ou en nuage de N exécutions. L'utilisateur contrôle le rythme (pause, pas-à-pas, ralenti). Détails par projet en §3.3.

**M7 — L'écran partagé fourmi/abeille suggère des échelles comparables et casse sur mobile.** *(l. 20, l. 26)*
- Problème : un même cadre et un même chronomètre font croire que la fourmi et l'abeille opèrent aux mêmes distances et aux mêmes durées. Juxtaposer deux graphes aux axes indépendants empêche aussi la comparaison directe. À 320 px, l'écran partagé est impossible.
- Preuve : [inféré] l'abeille butine sur des distances d'un ordre de grandeur supérieur aux pistes de fourmis (chiffre non vérifié). [lu, notice] Gleicher et al. 2011 : trois stratégies de comparaison (juxtaposition, superposition, encodage explicite). [lu, notice] Cleveland et McGill 1984 : la position sur une échelle commune est l'encodage le plus précis. [lu] WCAG 1.4.10.
- Recommandation : une barre d'échelle et une horloge propres à chaque panneau, avec la mention « échelles différentes ». Les courbes de résultat d'une espèce à l'autre se superposent sur un axe commun normalisé (fraction de la colonie, temps en unités naturelles comme le « nombre d'allers-retours »). Sur mobile, un sélecteur fourmi/abeille à état synchronisé remplace l'écran partagé.

**M8 — Une seule exécution stochastique sert de preuve, sans distribution.** *(niveau 3, l. 20)*
- Problème : en conditions de vulgarisation, un apprenant peut tomber sur une exécution atypique (les fourmis choisissent la longue branche) qui contredit le récit, ou au contraire croire qu'un seul essai « démontre » le résultat.
- Preuve : [inféré] la nature stochastique des modèles cités (choix probabiliste de Deneubourg, ACO, ABC). PhET observe que les élèves prennent ce qu'ils voient pour un fait [lu].
- Recommandation : graine fixée et affichée (« rejouer cette exécution »), état de la page dans l'URL, et toujours, à côté de l'exécution vivante, la distribution sur N graines (histogramme ou nuage de points) qui situe l'exécution courante. Le récit du niveau 1 utilise une graine typique, et le dit.

**M9 — Le niveau individuel (« intelligence individuelle ») est invisible.** *(intention, l. 3)*
- Problème : l'intention porte sur l'intelligence individuelle *et* collective, mais tous les visuels montrent la vue d'ensemble, c'est-à-dire précisément la vue que l'agent n'a pas. C'est la source de la « confusion des niveaux ».
- Preuve : [recherche] Wilensky et Resnick 1999 : la confusion et le « glissement » entre niveaux sont à l'origine de malentendus profonds. [lu] Resnick 1996, heuristique « A flock isn't a big bird ». [lu, notice] Wilensky et Reisman 2006 : la modélisation incarnée (« penser comme un loup ») aide à apprendre la biologie.
- Recommandation : un mode « Vue de l'agent » dans chaque projet. On suit une fourmi ou une abeille, le reste est masqué hors de son rayon de perception, et la règle en cours s'affiche en clair (« je sens 0,7 à gauche, 0,2 à droite → je tourne à gauche, p = 0,86 »). C'est aussi le meilleur pont vers l'agent LLM : « ce que voit l'agent » correspond à sa fenêtre de contexte.

**M10 — Il manque un niveau « construire ou modifier la règle » pour les étudiants et les praticiens.**
- Preuve : [lu] Resnick 1996 : les cinq heuristiques de pensée décentralisée (rétroaction positive, hasard créateur d'ordre, niveaux, objets émergents, environnement actif) apparaissent quand les élèves *construisent* des modèles, souvent après résistance. [lu, notice] Jacobson et Wilensky 2006.
- Recommandation : au niveau Explorer, un petit panneau de règle modifiable, sous forme de formule ou de quelques lignes de TypeScript dans un bac à sable, avec retour immédiat. Pour les praticiens : « remplacez la règle par un appel LLM », ce qui relie directement au projet 7.

**M11 — Le statut épistémique n'est pas signalé dans les visuels.** *(projets 3, 4 et 7)*
- Problème : la v3 mêle résultats publiés à reproduire, rapprochements de l'auteur (loi de Little, signalé à juste titre) et hypothèses agentiques présentées comme des faits (« la diversité stabilise », l. 42). Le lecteur ne peut pas les distinguer.
- Preuve : [lu] v3, l. 42 et 49. [inféré] le risque de transfert abusif vers la pratique.
- Recommandation : une étiquette visible sur chaque énoncé et chaque graphe : *Résultat publié reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur (non testée)*, *Analogie*. La règle d'audit, « chaque affirmation porte son étiquette », peut être vérifiée automatiquement par un attribut HTML.

**M12 — La charge de production est sous-estimée.** *(l. 20, l. 73-74)*
- Problème : 7 projets × 2 espèces × 3 niveaux, plus la carte et la note, font environ 40 vues interactives à concevoir, écrire, rendre accessibles, tester et évaluer.
- Preuve : [lu] Distill Hiatus (2 juill. 2021) : chaque article demande un travail important; les éditeurs y passaient parfois plus de 50 h; épuisement des bénévoles. [lu] Hohman et al. 2020 : produire un article interactif s'apparente plus à bâtir un site web qu'à écrire un billet. [lu] Olah et Carter 2017 : la distillation demande un effort comparable à la découverte.
- Recommandation :
  - Un gabarit de page unique : les trois niveaux, le même jeu de contrôles, la même légende, la même zone texte/tableau accessible.
  - Une charte unique (§3.4). Publier et évaluer 1 → 3 → 5 complètement avant d'ouvrir 2, 4, 6.
  - Budgéter explicitement les heures de vulgarisation (j'estime au moins 40 à 80 h par page complète, accessibilité et tests compris [inféré]).

**M13 — Pas de positionnement par rapport aux ressources existantes.**
- Preuve [lu] :
  - NetLogo *Ants* (Wilensky 1997; curseurs population, évaporation, diffusion) et *BeeSmart Hive Finding* (Guo et Wilensky 2014; d'après Seeley; seuil de quorum réglable; exécutable dans NetLogo Web). Licence CC BY-NC-SA 3.0.
  - StarLogo (Resnick 1996); PhET et ses lignes directrices; les explorables de Nicky Case (*The Evolution of Trust*, *Emoji Simulator*); le carrefour explorabl.es.
  - La conférence TED de D. Gordon (2003), « The emergent genius of ant colonies ».
- Recommandation : une section « Ressources existantes et valeur ajoutée ». La valeur propre au projet, c'est la comparaison fourmi/abeille dans un moteur commun et le pont agentique, pas la simulation de fourragement en soi. Utiliser *Ants* et *BeeSmart* comme repères de validation croisée et comme lectures complémentaires; ne pas reprendre leur code (licence NC). Les conditions d'*Ants* et de *BeeSmart* peuvent servir de témoin dans l'évaluation (§3.7).

**M14 — Le visuel du projet 7 (grille 2 × 4 avec noms commerciaux) va être surinterprété.** *(l. 68-69)*
- Problème : Haiku, Sonnet et Opus sont des noms de produits qui vieilliront vite et suggèrent un classement ou une caution. Une « courbe du gain » sans incertitude, sur des agents LLM stochastiques, sera lue comme une loi.
- Preuve : [inféré].
- Recommandation : nommer par palier de capacité (petit, moyen, grand modèle) en donnant les identifiants exacts et la date dans la note de recherche. Montrer chaque cellule comme un nuage de N exécutions avec intervalle, ajouter un axe coût et latence, et étiqueter « Résultat exploratoire, sans référence publiée » (M11).

### Mineurs

**m1 — Mobile.** Rien n'est prévu sur les performances Canvas en mobile, la batterie, l'orientation (WCAG 1.3.4 [lu]) ou le tactile. Recommandation : mettre en pause quand l'onglet ou le canevas n'est plus visible (Page Visibility API et IntersectionObserver, API standard [inféré, non vérifié ici]); plafonner le nombre d'agents selon l'appareil; cibles d'au moins 24 px (2.5.8 [lu]); tester en 375 × 812.

**m2 — Langue.** Les praticiens de l'agentique lisent surtout l'anglais. Recommandation : rédiger en français canadien, mais externaliser toutes les chaînes dès le départ pour une version anglaise. *The Evolution of Trust* a des dizaines de traductions bénévoles [lu, page ncase.me/trust]. Faire valider la terminologie (danse frétillante, danse de trémulation, course en tandem, stigmergie) avec le Grand dictionnaire terminologique de l'OQLF [inféré, non consulté].

**m3 — Glossaire absent.** Stigmergie, quorum, rétroaction positive ou négative, seuil de réponse, inhibition croisée. Le terme « stigmergie » n'apparaît pas dans la v3, alors que la ligne « Canal » de la table le décrit [lu]. Recommandation : un glossaire commun, lié depuis chaque page, structuré autour des cinq heuristiques de Resnick, qui servent aussi d'objectifs transversaux.

**m4 — Danse frétillante.** Le visuel « vecteurs de danse » risque d'être compris comme « l'abeille pointe vers la nourriture ». Il faut montrer la transposition (angle par rapport à la verticale du rayon = angle par rapport au soleil) et l'imprécision d'une course à l'autre. Preuve [inféré; les sources sur la dispersion des courses n'ont pas été vérifiées]. Recommandation : une animation en deux temps, « dans le noir du nid » puis « dehors », avec la dispersion des courses visible.

**m5 — Thermomètre (projet 3).** Une jauge montre une valeur instantanée, pas une oscillation. Recommandation : série temporelle avec bande cible, et deux petits multiples (homogène / diversifiée) sur un même axe vertical; plus l'histogramme des seuils de chaque ruche [inféré].

**m6 — Projet 4 (files d'attente).** La loi de Little est abstraite pour le grand public. Recommandation : document réactif à la Victor (L, λ, W liés, modifier l'un met à jour les autres [lu, Victor 2011, *reactive documents*]), avec une analogie familière (la caisse d'épicerie). Si le rapprochement « TCP » est utilisé, l'attribuer avec soin : je n'ai pas pu confirmer que Prabhakar, Dektar, Gordon 2012 (*PLOS Comp. Biol.*) l'emploie (lecture outillée contradictoire); il semble provenir de la couverture médiatique (« Anternet ») [non vérifié].

**m7 — Projet 6 (moulin).** Les vidéos de moulins de fourmis plaisent, mais nourrissent l'idée de « fourmis stupides ». Recommandation : présenter le moulin comme le mode d'échec d'une règle habituellement efficace (suivre la piste), avec en contrepoint les cas où la même règle réussit [inféré]. Pour l'analogie avec l'injection de prompts : la garder pour les praticiens, avec l'étiquette *Analogie*.

**m8 — Diagramme de phases (projet 6).** Trop abstrait pour le grand public sans redescente vers le concret. Recommandation : rendre chaque cellule cliquable pour lancer l'exécution correspondante [lu : Victor, *Ladder of Abstraction*].

**m9 — Pictogrammes.** Les représentations iconiques aident plus que les abstraites [lu : Berney et Bétrancourt 2016], mais les visages favorisent l'anthropomorphisme. Recommandation : silhouettes réalistes sans visage au niveau Voir, points ou flèches aux niveaux Explorer et Vérifier, avec une transition explicite entre les deux.

**m10 — Hébergement et pérennité.** Les artifacts claude.ai sont privés par défaut et partagés par lien [lu, description de l'outil]. Cela convient aux prototypes, mais pas au référencement, à la diffusion grand public ni à l'archivage. Recommandation : hébergement statique public (p. ex. GitHub Pages) avec version archivée et citable par projet [inféré].

**m11 — Analytique d'usage.** Mesurer la lecture active (Conlen, Kale, Heer 2019 [recherche]) est utile, mais la Loi 25 impose que les fonctions d'identification, de localisation ou de profilage soient désactivées par défaut et activées par la personne [lu, CAI]. Recommandation : analytique agrégée, sans identifiant, en consentement explicite (opt-in) pour toute étude; données d'évaluation sur une plateforme approuvée par le CER [inféré].

**m12 — Version imprimable et affiches.** Absente. Recommandation : produire les instantanés en petits multiples du mode « mouvement réduit » (M4) et les réutiliser comme figures statiques des notes de recherche, des affiches et du matériel de classe. C'est aussi la condition témoin statique de l'évaluation (§3.7) [inféré].

---

## 3. Propositions concrètes

### 3.1 Publics cibles

| Public | Contexte et durée | Point d'entrée | Objectif principal | Canal |
|---|---|---|---|---|
| Grand public (15 ans et plus) | Mobile, 3 à 5 min, sans prérequis | Niveau Voir | Expliquer qu'un comportement collectif peut émerger sans chef | Page publique, réseaux, musée, vulgarisation scientifique |
| Étudiants (cégep et universitaire : biologie, génie, informatique) | Ordinateur, 20 à 50 min, en classe ou en devoir | Niveaux Explorer, puis Modifier la règle | Prédire et expliquer l'effet d'un paramètre; relier règle locale et motif global | Cours de systèmes multi-agents, d'éthologie, de génie des systèmes |
| Praticiens de l'agentique | Ordinateur, 10 à 20 min, lecture ciblée | Carte comparative et Vue de l'agent | Choisir un mécanisme de coordination (canal, oubli, freinage, quorum) et anticiper ses modes d'échec | Billet technique en anglais et en français, conférence |
| Chercheurs | Ordinateur, lecture approfondie | Niveau Vérifier et note de recherche | Juger la fidélité de la reproduction et la solidité de l'extension agentique | Note, dépôt de code, préimpression |

### 3.2 Trois niveaux de lecture révisés (gabarit commun à toutes les pages)

1. **Voir** (récit guidé, tige du verre à martini). Trois à cinq étapes; à chaque étape, l'utilisateur **prédit** avant de lancer (Kim et al. 2017). Une seule variable manipulée, une graine typique annoncée, une conclusion explicite, plus l'encart « Ce que ça ne veut pas dire ». La carte agentique y figure en version résumée, en une ligne.
2. **Explorer** (bac à sable étayé). Curseurs limités aux paramètres pertinents (étayage implicite de PhET [lu]), défis courts, graphes synchronisés, **Vue de l'agent**, panneau **Modifier la règle**.
3. **Vérifier** (reproduction). Expérience du résultat publié, distribution sur N graines, balayage de paramètres en petits multiples, exportation des paramètres et données, lien vers le code, la note de recherche et les références primaires, avec l'étiquette de statut épistémique de chaque énoncé.

### 3.3 Conception visuelle par projet

| Projet | Vue principale (animation) | Vue analytique (statique, synchronisée) | Vue « échelle d'abstraction » | Point de vigilance |
|---|---|---|---|---|
| 1. Piste vs danse | Fourmis : phéromone en rampe séquentielle uniforme. Abeilles : glyphes de danse avec dispersion | Fraction de la colonie par branche ou source dans le temps, deux espèces superposées sur un axe commun, marqueur de l'événement (ajout tardif, inversion) | Petits multiples sur n et k de Deneubourg; temps de réallocation selon le moment de l'inversion | Échelles différentes (M7); « pointer » (m4) |
| 2. ACO vs ABC | Arêtes d'épaisseur ∝ τ (pas la couleur seule); abeilles sur courbes de niveau (cividis), forme selon le rôle | Courbe de convergence (meilleure solution par itération), distribution sur N graines | Effet de ρ (ACO) et de *limit* (ABC) en petits multiples | « Chemin vs lieu » à montrer et non seulement à dire |
| 3. Division du travail | Agents marqués par tâche (couleur, lettre ou forme) | Aire empilée de la répartition des tâches; série de température avec bande cible | Homogène vs diversifiée en petits multiples, axe vertical commun; histogramme des seuils | « La diversité stabilise » : hypothèse pour l'agentique (M11) |
| 4. Régulation | Entrée du nid ou de la ruche, file visible | Chronogramme des sorties et retours; longueur de file et temps d'attente | Document réactif L = λW | Attribution du rapprochement TCP (m6) |
| 5. Quorum | Carte des sites, soutien par site | Courbes de soutien sur axe commun | Nuage vitesse/justesse sur N exécutions par seuil de quorum | « Démocratie », « débat » (M3) |
| 6. Pathologies | Spirale, essaim scindé | Paramètre d'ordre (rotation) dans le temps | Diagramme de phases cliquable (m8) | « Fourmis stupides » (m7) |
| 7. Synthèse LLM | Rejeu des journaux d'agents (Vue de l'agent = contexte) | Grille 2 × 4 en nuages de points avec intervalles; coût et latence | Gain selon la dimension de canal, sans ordre implicite | Échelle évolutive (M2); noms de produits (M14) |

### 3.4 Charte graphique fourmi / abeille / agent

- Couleurs d'identité, valables dans les deux thèmes [calculé] : fourmi **#D55E00** (vermillon), abeille **#0072B2** (bleu), agent **#CC79A7** (pourpre). Contraste d'au moins 3,06:1 sur blanc et d'au moins 3,61:1 sur #121212; pire ΔE76 ≈ 23 sous simulation des trois dichromasies. Éviter la paire vermillon/orange (ΔE ≈ 18 en deutéranopie) et l'orange ou le jaune comme couleur de trait sur fond blanc.
- Chaque couleur est toujours doublée d'un pictogramme et d'une étiquette textuelle (1.4.1).
- Grandeurs continues (phéromone, soutien, température) : rampes séquentielles perceptuellement uniformes (viridis, cividis, batlow [lu, Crameri 2020]); jamais d'arc-en-ciel.
- Disposition invariante : fourmi à gauche ou en haut, abeille à droite ou en bas, carte agentique dessous; mêmes contrôles au même endroit sur toutes les pages.

### 3.5 Liste de contrôle d'accessibilité (WCAG 2.2 AA, plus 2.3.3 AAA souhaité)

- [ ] Lecture/Pause/Pas-à-pas toujours visibles, au clavier (2.2.2, 2.1.1)
- [ ] `prefers-reduced-motion: reduce` : pas d'animation automatique; instantanés en petits multiples (2.3.3, C39)
- [ ] Contenu de repli du canvas et résumé textuel vivant `role="status"`, à débit limité (1.1.1, 4.1.3)
- [ ] Tableau de données équivalent pour chaque graphe (1.1.1, 1.3.1)
- [ ] Curseurs natifs `<input type="range">` étiquetés, avec valeur et unité (4.1.2)
- [ ] Toute action de glisser (déplacer une source ou un site) a une alternative par clic ou par clavier (2.5.7)
- [ ] Cibles d'au moins 24 × 24 px CSS (2.5.8); focus visible et non masqué (2.4.11)
- [ ] Couleur jamais seule; contraste non textuel d'au moins 3:1 (1.4.1, 1.4.11)
- [ ] Reflow à 320 px CSS sans défilement horizontal, sauf le canevas lui-même (1.4.10); les deux orientations (1.3.4)
- [ ] Aucun clignotement au-delà de 3 fois par seconde (2.3.1)
- [ ] Tests : clavier seul, NVDA ou VoiceOver, émulation de daltonisme dans DevTools, mobile 375 px

### 3.6 Lexique contrôlé (extrait)

| À éviter seul | Formulation mécaniste | Métaphore permise (avec étiquette) |
|---|---|---|
| La reine commande / ne commande pas | Les tâches et les déplacements émergent de règles locales; la reine signale sa fécondité | — |
| La colonie décide, veut | Le choix de la colonie résulte d'un seuil de quorum atteint | « Décision collective » (terme technique, défini) |
| Les abeilles débattent, votent | Les éclaireuses recrutent proportionnellement à la qualité perçue; les signaux d'arrêt inhibent les recrutements concurrents | « Démocratie » (Seeley), entre guillemets, avec ses limites |
| La fourmi enseigne | Course en tandem : une meneuse règle son allure sur le contact de la suiveuse | — |
| Délégation (agentique) | Annonce sur un canal partagé, puis auto-sélection | « Délégation » réservée à l'orchestration, en contre-exemple |
| Plus évolué, plus avancé | Autre solution, autre compromis | — |

### 3.7 Protocole d'évaluation pédagogique (esquisse)

- **Objectifs** (exemples) :
  - P1 : *prédire* quelle branche domine quand la courte est ajoutée tard, et *expliquer* le verrouillage par rétroaction positive.
  - P5 : *décrire* l'effet du seuil de quorum sur la vitesse et la justesse.
  - Transversal : *distinguer* une explication émergente d'une explication par contrôleur (Chi 2005).
  - Praticiens : *choisir* un mécanisme de freinage pour un scénario donné et *justifier* son choix.
- **Instrument** : 10 à 15 items en choix multiple avec justification écrite (codée selon direct / émergent), dont 3 à 4 items de conceptions erronées (« Qui choisit le site de l'essaim ? »). Prétest, post-test immédiat, post-test différé à 2–4 semaines; gain normalisé de Hake.
- **Plan** : aléatoire entre sujets, page interactive contre version statique (mêmes textes, instantanés en petits multiples). En classe, randomisation par groupe-cours, à analyser en modèle multiniveau.
- **Taille d'échantillon** [calculé, test t bilatéral, α = 0,05, puissance 0,80] : environ 307 par bras si d = 0,23 (Berney et Bétrancourt), 115 par bras si d = 0,37 (Höffler et Leutner), 63 par bras si d = 0,5. Ces effets viennent de méta-analyses animation contre image statique; leur transposition aux explorables est une inférence.
- **Qualitatif** : entrevues à voix haute, 5 à 8 par public et par page, avant la publication (méthode PhET [lu]).
- **Éthique et vie privée** : approbation du CER selon l'EPTC 2 (non consultée [inféré]); Loi 25, analytique désactivée par défaut [lu].

---

## 4. Ajouts recommandés au programme

1. Un volet transversal **V0 « Vulgarisation et évaluation »** avec ses propres livrables : fiches de publics, objectifs, gabarit à trois niveaux, charte graphique, lexique contrôlé, liste de contrôle d'accessibilité, protocole d'évaluation.
2. Un mode **Vue de l'agent** dans chaque projet (niveau individuel, pont vers la fenêtre de contexte du LLM).
3. Un panneau **Modifier la règle** au niveau Explorer, branché sur le projet 7.
4. Une **distribution sur N graines** affichée à côté de toute exécution vivante; graine et état de la page dans l'URL.
5. Des **étiquettes de statut épistémique** sur chaque énoncé et chaque graphe.
6. Une **carte comparative révisée** : relations plutôt que termes, colonne « où l'analogie casse », sans « Délégation », signal « no entry » côté fourmi, validée par trois experts.
7. Un encart **« Ce que fait vraiment la reine »** et une reformulation positive de la thèse.
8. Une **version statique** (petits multiples) qui sert à la fois au mode mouvement réduit, aux affiches, aux notes et à la condition témoin.
9. Une section **« Ressources existantes »** (NetLogo *Ants* et *BeeSmart*, StarLogo, PhET, Nicky Case, Gordon) et la valeur ajoutée propre.
10. Une **version anglaise** et un glossaire terminologique validé.
11. Un **hébergement public archivé** (pages statiques et version citable), les artifacts restant pour les prototypes.
12. Un **budget d'heures de vulgarisation** par page, et la règle « 1 → 3 → 5 publiés et évalués avant 2, 4, 6 ».

---

## 5. Sources

### Lues (page primaire, notice ou texte intégral consulté)
- W3C, *WCAG 2.2*, Recommandation du 12 déc. 2024 — https://www.w3.org/TR/WCAG22/
- W3C, Understanding 2.5.7 — https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html ; 2.5.8 — https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html ; 2.2.2 — https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html ; 2.3.3 — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html ; 1.4.10 — https://www.w3.org/WAI/WCAG22/Understanding/reflow.html ; 4.1.3 — https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html ; 1.4.1 — https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html
- MDN, `prefers-reduced-motion` — https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- WHATWG, HTML, élément canvas — https://html.spec.whatwg.org/multipage/canvas.html
- Chrome DevTools 83, émulation des déficiences visuelles — https://developer.chrome.com/blog/new-in-devtools-83
- Victor, B. (2011). *Explorable Explanations* — https://worrydream.com/ExplorableExplanations/ ; *Up and Down the Ladder of Abstraction* — https://worrydream.com/LadderOfAbstraction/
- Hohman, Conlen, Heer, Chau (2020). *Communicating with Interactive Articles*, Distill — https://distill.pub/2020/communicating-with-interactive-articles/
- Distill Team (2021). *Distill Hiatus* — https://distill.pub/2021/distill-hiatus/
- Olah, Carter (2017). *Research Debt*, Distill — https://distill.pub/2017/research-debt/
- Case, N. — https://ncase.me/ ; https://ncase.me/trust/ ; carrefour https://explorabl.es/
- Adams, Reid, LeMaster, McKagan, Perkins, Wieman. *A Study of Interface Design for Engagement and Learning with Educational Simulations* (PhET; publié dans *J. Interactive Learning Research* 19(3), 2008 [recherche]) — https://phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf
- Resnick, M. (1996). Beyond the Centralized Mindset. *J. Learning Sciences* 5 — https://pleiad.cl/_media/bic2007/papers/resnick-beyond-centralized-mindset.pdf
- Berney, Bétrancourt (2016). Does animation enhance learning? A meta-analysis. *Computers & Education* — https://doi.org/10.1016/j.compedu.2016.06.005 (résumé EARLI lu : https://tecfa.unige.ch/perso/sandra/pdf/Earli2016_berney_betrancourt_FINAL.pdf)
- Kirschner, Sweller, Clark (2006). *Educational Psychologist* 41(2) — https://doi.org/10.1207/s15326985ep4102_1
- Chi et al. (2012). Misconceived causal explanations for emergent processes. *Cognitive Science* 36(1) — https://doi.org/10.1111/j.1551-6709.2011.01207.x
- Kelemen, Rosset (2009). The Human Function Compunction. *Cognition* 111 — https://www.sciencedirect.com/science/article/abs/pii/S0010027709000146
- Crameri, Shephard, Heron (2020). The misuse of colour in science communication. *Nat. Commun.* 11:5444 — https://pmc.ncbi.nlm.nih.gov/articles/PMC7595127/
- NetLogo *Ants* (Wilensky 1997) — https://ccl.northwestern.edu/netlogo/models/Ants ; *BeeSmart Hive Finding* (Guo, Wilensky 2014) — https://ccl.northwestern.edu/netlogo/models/BeeSmartHiveFinding
- Anthropic (2024). *Building effective agents* — https://www.anthropic.com/engineering/building-effective-agents
- Seeley, T. D. (2010). *Honeybee Democracy*, Princeton UP — https://press.princeton.edu/books/hardcover/9780691147215/honeybee-democracy
- Gordon, D. (2003). TED, *The emergent genius of ant colonies* — https://www.ted.com/talks/deborah_gordon_the_emergent_genius_of_ant_colonies
- Commission d'accès à l'information du Québec, Loi 25 — https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/principaux-changements-loi-25
- Notices OpenAlex consultées : Gentner 1983 (https://doi.org/10.1207/s15516709cog0702_3); Peltz 2003 (https://doi.org/10.1109/mc.2003.1236471); Cleveland, McGill 1984 (https://doi.org/10.1080/01621459.1984.10478080); Gleicher et al. 2011 (https://doi.org/10.1177/1473871611416549); Heer, Robertson 2007 (https://doi.org/10.1109/tvcg.2007.70539); Mayer, Moreno 2003 (https://doi.org/10.1207/s15326985ep3801_6); Krathwohl 2002 (https://doi.org/10.1207/s15430421tip4104_2); Hmelo-Silver, Pfeffer 2004 (https://doi.org/10.1207/s15516709cog2801_7); Wilensky, Reisman 2006 (https://doi.org/10.1207/s1532690xci2402_1); Jacobson, Wilensky 2006 (https://doi.org/10.1207/s15327809jls1501_4); Rutten, van Joolingen, van der Veen (*Computers & Education*, OpenAlex : 2011) (https://doi.org/10.1016/j.compedu.2011.07.017); Seeley et al., Stop signals… *Science* (OpenAlex : 2011; la v3 dit 2012) (https://doi.org/10.1126/science.1210361)
- Prabhakar, Dektar, Gordon (2012). *PLOS Comput. Biol.* — https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 (présence d'une comparaison explicite à TCP : non confirmée)

### Vérifiées par recherche seulement (notice secondaire)
- Höffler, Leutner (2007). *Learning and Instruction* 17(6) : d = 0,37 — https://eric.ed.gov/?id=EJ780451
- Robertson, Fernandez, Fisher, Lee, Stasko (2008). Effectiveness of Animation in Trend Visualization. IEEE TVCG — https://www.microsoft.com/en-us/research/publication/effectiveness-of-animation-in-trend-visualization/
- Tversky, Morrison, Bétrancourt (2002). *IJHCS* 57(4) — https://dl.acm.org/doi/10.1006/ijhc.2002.1017
- Segel, Heer (2010). Narrative Visualization. IEEE TVCG — http://vis.stanford.edu/files/2010-Narrative-InfoVis.pdf
- Kim, Reinecke, Hullman (2017). Explaining the Gap. CHI — https://mucollective.northwestern.edu/project/explaining-the-gap
- Conlen, Kale, Heer (2019). Capture & Analysis of Active Reading Behaviors… EuroVis — https://idl.uw.edu/papers
- Hake (1998). *Am. J. Phys.* 66 — https://www.per-central.org/items/detail.cfm?ID=2662
- Smetana, Bell (2012). *Int. J. Science Education* — https://consensus.app/papers/details/6938bf26016d58ee836f0128c30c82d4/
- D'Angelo et al. (2013). *Simulations for STEM Learning*, SRI — https://consensus.app/papers/details/49ffef0b197958dcb6198e48cc3660dd/
- Chi (2005). *J. Learning Sciences* 14(2) — https://eric.ed.gov/?id=EJ724968
- Wilensky, Resnick (1999). Thinking in Levels. *J. Sci. Educ. Technol.* 8(1) — https://ccl.northwestern.edu/1999/thinking_in_levels.pdf
- Slessor et al. (1988). *Nature* 332:354-356 (phéromone mandibulaire de la reine) — page primaire non consultée
- Van Oystaeyen et al. (2014). *Science* 343:287-290 — https://www.science.org/doi/10.1126/science.1244899
- Robinson, Jackson, Holcombe, Ratnieks (2005). « No entry » signal. *Nature* 438 — https://pure.york.ac.uk/portal/en/publications/insect-communication-no-entry-signal-in-ant-foraging
- Johnson et al. (2013). *Current Biology* 23 — https://www.sciencedirect.com/science/article/pii/S0960982213010567
- Palette Okabe-Ito (codes hexadécimaux) — https://thenode.biologists.com/data-visualization-with-flying-colors/research/ (source primaire Wong 2011, *Nat. Methods* 8:441, non lue)

### Non vérifiées (à confirmer)
- EPTC 2 (2022) — https://ethics.gc.ca/eng/policy-politique_tcps2-eptc2_2022.html (accès refusé par l'outil : certificat)
- Lewandowsky et al., *Debunking Handbook 2020* — https://doi.org/10.17910/b7.1182 (existence vérifiée, contenu non lu)
- Ordres de grandeur des distances de butinage fourmi/abeille (M7); dispersion des courses de danse (m4); Grand dictionnaire terminologique (m2); Page Visibility API (m1).

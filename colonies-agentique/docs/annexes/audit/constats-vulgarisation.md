# Constats — Vulgarisation

Source : [rapport complet](vulgarisation.md). 30 constats (4 critiques, 14 majeurs, 12 mineurs) et 15 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La vulgarisation est exigée au même titre que les projets académiques, mais la v3 la réduit à une phrase : aucun public cible, aucun objectif d'apprentissage mesurable, aucune évaluation pédagogique, aucune accessibilité, aucune règle de conception visuelle. Deux choix structurants vont à l'encontre de la littérature. Le niveau 1 « animation libre » donne le moins de guidage au public le moins outillé, alors que PhET juge limitée la valeur éducative de l'animation sans interaction. Le message central (« la reine ne commande pas », « chorégraphie », gradation fourmi → abeille → LLM) risque de renforcer l'esprit centralisateur, la téléologie et l'idée d'une échelle évolutive. La carte agentique réintroduit même l'orchestration avec « Délégation ». Tout se corrige au stade du devis par un volet transversal « vulgarisation et évaluation » : gabarit commun à trois niveaux réordonnés, charte graphique vérifiée pour le daltonisme, WCAG 2.2 AA, lexique contrôlé, protocole pré/post avec condition témoin. Bilan : 4 critiques, 14 majeurs, 12 mineurs; trois sources n'ont pas pu être lues (EPTC 2, Slessor 1988, Debunking Handbook) et sont signalées dans le rapport.

## Constats

### VU-01 · critique · Ensemble; l. 3 et l. 20 (format)

**Constat.** Aucun public cible n'est défini. Quatre publics aux besoins incompatibles (grand public, étudiants, praticiens de l'agentique, chercheurs) se partagent implicitement les mêmes pages, sans calibrage de durée, de vocabulaire, de point d'entrée ni de canal.

**Preuve.** v3 lue; PhET (Adams et al.) a restreint son public et l'a étudié en plus de 200 entrevues : https://phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf

**Recommandation.** Rédiger une fiche par public (contexte, durée, point d'entrée, prérequis, objectif, canal). Chaque page déclare son public principal et ses publics secondaires.

**Disposition.** _à renseigner_

### VU-02 · critique · Critère de rigueur (l. 20)

**Constat.** La rigueur ne vise que la reproduction scientifique. Il n'y a aucun objectif d'apprentissage mesurable ni aucune évaluation de l'efficacité pédagogique, alors que les preuves sur l'interactivité sont mitigées et les effets faibles à moyens.

**Preuve.** Hohman et al. 2020 https://distill.pub/2020/communicating-with-interactive-articles/ ; Berney et Bétrancourt 2016, g = 0,226 https://doi.org/10.1016/j.compedu.2016.06.005 ; Höffler et Leutner 2007, d = 0,37 https://eric.ed.gov/?id=EJ780451 ; Hake 1998 https://www.per-central.org/items/detail.cfm?ID=2662

**Recommandation.** Ajouter des objectifs formulés selon Bloom révisé et des items de conceptions erronées en pré-test, post-test et post-test différé. Comparer à une condition témoin statique et mesurer le gain normalisé de Hake. Taille d'échantillon d'environ 115 à 307 par bras pour d entre 0,37 et 0,23. Prévoir un CER (EPTC 2) et la conformité à la Loi 25.

**Disposition.** _à renseigner_

### VU-03 · critique · Format à trois niveaux (l. 20)

**Constat.** Les niveaux sont inversés. L'animation libre non guidée va au grand public, l'expérience guidée arrive en dernier, et la carte agentique, qui intéresse les praticiens, est cachée au niveau 3.

**Preuve.** PhET : la valeur éducative de l'animation sans interactivité est « quite limited » (lu) ; Kirschner, Sweller, Clark 2006 https://doi.org/10.1207/s15326985ep4102_1 ; Segel et Heer 2010, verre à martini http://vis.stanford.edu/files/2010-Narrative-InfoVis.pdf ; Kim et al. 2017 https://mucollective.northwestern.edu/project/explaining-the-gap

**Recommandation.** Réordonner en Voir (récit guidé avec prédiction), Explorer (bac à sable étayé, Vue de l'agent, Modifier la règle), Vérifier (reproduction, N graines, code, limites). La carte agentique apparaît en résumé dès le niveau 1.

**Disposition.** _à renseigner_

### VU-04 · critique · Titre, thèse (l. 5)

**Constat.** « Chorégraphie » évoque un chorégraphe, et la négation « la reine ne commande pas » installe le mythe en tête de page. Le slogan est aussi trop général : les reines régulent la reproduction des ouvrières par phéromones, de sorte qu'un lecteur informé risque de rejeter tout le message.

**Preuve.** Resnick 1996 (lu) : « lead or seed »; le ballet et son chorégraphe y servent d'exemple qui nourrit l'esprit centralisateur https://pleiad.cl/_media/bic2007/papers/resnick-beyond-centralized-mindset.pdf ; Van Oystaeyen et al. 2014 https://www.science.org/doi/10.1126/science.1244899 ; Slessor et al. 1988 (recherche seulement)

**Recommandation.** Énoncer le mécanisme positif avec sa portée (les décisions de travail et de déplacement émergent de règles locales; la reine signale sa fécondité). Ajouter un encart « Ce que fait vraiment la reine » et un item pré/post « Qui choisit le site de l'essaim ? ».

**Disposition.** _à renseigner_

### VU-05 · majeur · Table des mécanismes (l. 9-16)

**Constat.** « Recrutement → Délégation » réintroduit l'orchestration, puisqu'en agentique déléguer est le rôle de l'orchestrateur central. « Freinage fourmi : absence de retours » omet le signal négatif « no entry ». La table aligne des termes plutôt que des relations.

**Preuve.** Anthropic 2024, orchestrator-workers https://www.anthropic.com/engineering/building-effective-agents ; Robinson et al. 2005 https://pure.york.ac.uk/portal/en/publications/insect-communication-no-entry-signal-in-ant-foraging ; Gentner 1983 https://doi.org/10.1207/s15516709cog0702_3

**Recommandation.** Remplacer « Délégation » par « annonce sur un canal partagé, puis auto-sélection ». Ajouter le signal « no entry », une colonne « relation conservée » et une colonne « où l'analogie casse ». Faire valider la carte par trois experts.

**Disposition.** _à renseigner_

### VU-06 · majeur · Question transversale (l. 18); projet 7 (l. 69)

**Constat.** La gradation « scalaire → symbole → langage » et la courbe du gain selon la richesse du signal seront lues comme une échelle évolutive (fourmi < abeille < LLM). L'étiquette « scalaire » efface aussi la communication multimodale des fourmis.

**Preuve.** Johnson et al. 2013 : les fourmis sont le groupe frère des Apoidea https://www.sciencedirect.com/science/article/pii/S0960982213010567 ; Chi et al. 2012 https://doi.org/10.1111/j.1551-6709.2011.01207.x

**Recommandation.** Présenter la richesse du signal comme une dimension de conception parmi d'autres (persistance, contenu, localité, coût), sans ordre ni flèche. Dire explicitement que les deux insectes sont des solutions différentes, et non des étapes.

**Disposition.** _à renseigner_

### VU-07 · majeur · Vocabulaire, passim

**Constat.** Vocabulaire anthropomorphique et téléologique sans politique explicite (décision, veto, débat, démocratie, délégation, « la colonie rééquilibre »). Le lecteur pressé du grand public est justement celui qui retient le plus les explications téléologiques.

**Preuve.** Kelemen et Rosset 2009 https://www.sciencedirect.com/science/article/abs/pii/S0010027709000146 ; Seeley 2010 https://press.princeton.edu/books/hardcover/9780691147215/honeybee-democracy ; Chi 2005 https://eric.ed.gov/?id=EJ724968

**Recommandation.** Un lexique contrôlé à deux colonnes (formulation mécaniste, métaphore étiquetée), un encart « Ce que ça ne veut pas dire » par page, des pictogrammes sans visage et des items pré/post ciblés.

**Disposition.** _à renseigner_

### VU-08 · majeur · Technique (l. 73) et format

**Constat.** L'accessibilité est absente. Canvas n'est pas lisible par les lecteurs d'écran, et les animations automatiques, les graphes temps réel, l'écran partagé et le glisser-déposer touchent les critères WCAG 2.2 1.1.1, 1.4.1, 1.4.10, 1.4.11, 2.1.1, 2.2.2, 2.5.7, 2.5.8, 4.1.2 et 4.1.3.

**Preuve.** https://www.w3.org/TR/WCAG22/ ; https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html ; https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html ; https://html.spec.whatwg.org/multipage/canvas.html ; https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

**Recommandation.** Viser WCAG 2.2 AA. Lecture, pause et pas-à-pas au clavier; curseurs natifs; résumé textuel avec role=status; tableau de données équivalent; alternative au glisser; cibles d'au moins 24 px; prefers-reduced-motion remplacé par des petits multiples statiques.

**Disposition.** _à renseigner_

### VU-09 · majeur · Visuels, écran partagé

**Constat.** Les couleurs ne sont pas spécifiées. La paire intuitive vermillon/orange (fourmi/abeille) ne garde qu'un ΔE d'environ 18 en deutéranopie, et l'orange n'a que 2,25:1 de contraste sur fond blanc, sous le seuil de 3:1.

**Preuve.** Calcul : scratchpad/cvd.py (Machado 2009, ΔE76) ; Crameri et al. 2020 https://pmc.ncbi.nlm.nih.gov/articles/PMC7595127/ ; https://developer.chrome.com/blog/new-in-devtools-83

**Recommandation.** Adopter fourmi #D55E00, abeille #0072B2, agent #CC79A7 (contraste d'au moins 3,06:1 dans les deux thèmes, pire ΔE d'environ 23), doubler chaque couleur d'un pictogramme et d'une étiquette, utiliser viridis ou cividis pour les grandeurs continues et valider avec l'émulation de DevTools.

**Disposition.** _à renseigner_

### VU-10 · majeur · Visuels des projets 1 à 6

**Constat.** Le projet repose sur des animations et des courbes temps réel, alors que l'animation est la forme la moins efficace pour l'analyse et que les petits multiples sont plus exacts. Aucune vue d'ensemble sur les paramètres n'est prévue.

**Preuve.** Robertson et al. 2008 https://www.microsoft.com/en-us/research/publication/effectiveness-of-animation-in-trend-visualization/ ; Tversky et al. 2002 https://dl.acm.org/doi/10.1006/ijhc.2002.1017 ; Victor 2011 https://worrydream.com/LadderOfAbstraction/

**Recommandation.** Coupler chaque animation à un graphe statique synchronisé et à une vue « échelle d'abstraction » (balayage du paramètre clé en petits multiples ou en nuage de N exécutions), avec un rythme contrôlé par l'utilisateur.

**Disposition.** _à renseigner_

### VU-11 · majeur · Écran partagé (l. 20, l. 26)

**Constat.** Un même cadre et une même horloge suggèrent des échelles spatiales et temporelles comparables. Les graphes juxtaposés empêchent la comparaison directe, et l'écran partagé est impossible à 320 px.

**Preuve.** Gleicher et al. 2011 https://doi.org/10.1177/1473871611416549 ; Cleveland et McGill 1984 https://doi.org/10.1080/01621459.1984.10478080 ; WCAG 1.4.10 https://www.w3.org/WAI/WCAG22/Understanding/reflow.html ; écart de distances de butinage : inféré, non vérifié

**Recommandation.** Barre d'échelle et horloge par panneau, avec la mention « échelles différentes ». Superposer les courbes de résultat sur un axe commun normalisé. Sur mobile, un sélecteur à état synchronisé.

**Disposition.** _à renseigner_

### VU-12 · majeur · Niveau 3, expérience guidée

**Constat.** Une seule exécution stochastique sert de démonstration. Une exécution atypique contredit le récit, ou un seul essai est pris pour une preuve.

**Preuve.** inféré (modèles probabilistes); PhET : les élèves prennent ce qu'ils voient pour un fait (lu)

**Recommandation.** Graine fixée et affichée, état dans l'URL, et distribution sur N graines toujours visible à côté de l'exécution vivante. Le récit annonce sa graine typique.

**Disposition.** _à renseigner_

### VU-13 · majeur · Intention (l. 3) et visuels

**Constat.** Le niveau individuel est invisible : tous les visuels montrent la vue d'ensemble que l'agent n'a pas, ce qui nourrit la confusion des niveaux.

**Preuve.** Wilensky et Resnick 1999 http://ccl.northwestern.edu/1999/thinking_in_levels.pdf ; Wilensky et Reisman 2006 https://doi.org/10.1207/s1532690xci2402_1 ; Resnick 1996, « A flock isn't a big bird » (lu)

**Recommandation.** Ajouter dans chaque projet un mode « Vue de l'agent » : perception locale masquée et règle courante en clair. C'est aussi un pont vers la fenêtre de contexte du LLM.

**Disposition.** _à renseigner_

### VU-14 · majeur · Format (l. 20)

**Constat.** Il n'y a pas de niveau « construire ou modifier la règle », alors que la pensée décentralisée se développe quand on construit des modèles. C'est un manque pour les étudiants et pour les praticiens, qui écrivent du code.

**Preuve.** Resnick 1996, cinq heuristiques apparues pendant la construction (lu) ; Jacobson et Wilensky 2006 https://doi.org/10.1207/s15327809jls1501_4

**Recommandation.** Ajouter un panneau Modifier la règle (formule ou quelques lignes de TypeScript) au niveau Explorer, branché sur le projet 7 (« remplacez la règle par un LLM »).

**Disposition.** _à renseigner_

### VU-15 · majeur · Projets 3, 4 et 7 (l. 42, 49, 70)

**Constat.** Le statut épistémique n'est pas signalé dans les visuels : des hypothèses agentiques (« la diversité stabilise ») sont présentées comme des faits, mêlées aux résultats reproduits.

**Preuve.** v3 lue (l. 42, 49) ; risque de transfert : inféré

**Recommandation.** Une étiquette visible par énoncé et par graphe (Résultat publié reproduit, Modèle simplifié, Hypothèse de l'auteur, Analogie), vérifiable automatiquement par un attribut HTML.

**Disposition.** _à renseigner_

### VU-16 · majeur · Technique et parcours (l. 73-74)

**Constat.** La charge de production est sous-estimée : environ 40 vues interactives à concevoir, rendre accessibles, tester et évaluer.

**Preuve.** Distill Hiatus 2021 (plus de 50 h d'éditeur par article, épuisement) https://distill.pub/2021/distill-hiatus/ ; Hohman et al. 2020 ; Olah et Carter 2017 https://distill.pub/2017/research-debt/

**Recommandation.** Gabarit et charte uniques; publier et évaluer 1, 3 et 5 avant 2, 4 et 6; budgéter les heures (estimation inférée : au moins 40 à 80 h par page complète).

**Disposition.** _à renseigner_

### VU-17 · majeur · Ensemble

**Constat.** Pas de positionnement par rapport aux ressources existantes (NetLogo Ants et BeeSmart, StarLogo, PhET, Nicky Case, Gordon), d'où un risque de doublon et une valeur ajoutée non dite.

**Preuve.** https://ccl.northwestern.edu/netlogo/models/Ants ; https://ccl.northwestern.edu/netlogo/models/BeeSmartHiveFinding ; https://ncase.me/ ; https://www.ted.com/talks/deborah_gordon_the_emergent_genius_of_ant_colonies

**Recommandation.** Ajouter une section Ressources existantes et valeur ajoutée (comparaison fourmi/abeille dans un moteur commun, pont agentique). Utiliser Ants et BeeSmart comme repères et lectures complémentaires, sans reprendre leur code (licence CC BY-NC-SA).

**Disposition.** _à renseigner_

### VU-18 · majeur · Projet 7 (l. 68-69)

**Constat.** La grille 2 × 4 utilise des noms commerciaux qui vieilliront et suggèrent un classement, et la courbe du gain n'affiche pas d'incertitude alors que les agents LLM sont stochastiques. Risque de surinterprétation par les praticiens.

**Preuve.** inféré

**Recommandation.** Nommer par palier de capacité en donnant les identifiants et la date dans la note; présenter chaque cellule comme un nuage de N exécutions avec intervalle; ajouter coût et latence; étiquette « exploratoire ».

**Disposition.** _à renseigner_

### VU-19 · mineur · Technique (l. 73)

**Constat.** Le mobile n'est pas traité : performance Canvas, batterie, orientation, tactile.

**Preuve.** WCAG 1.3.4 et 2.5.8 (lu) ; API de visibilité : inféré

**Recommandation.** Pause quand le canevas n'est pas visible, plafond d'agents selon l'appareil, cibles d'au moins 24 px, deux orientations, tests en 375 × 812.

**Disposition.** _à renseigner_

### VU-20 · mineur · Ensemble

**Constat.** Langue unique implicite, alors que les praticiens de l'agentique lisent surtout l'anglais; terminologie française non validée.

**Preuve.** ncase.me/trust compte de nombreuses traductions bénévoles (lu) ; GDT non consulté

**Recommandation.** Externaliser les chaînes dès le départ pour une version anglaise; valider la terminologie (danse frétillante, trémulation, tandem, stigmergie) avec le GDT de l'OQLF.

**Disposition.** _à renseigner_

### VU-21 · mineur · Table (l. 11) et ensemble

**Constat.** Pas de glossaire; le terme « stigmergie » est absent alors que la table le décrit.

**Preuve.** v3 lue ; Resnick 1996 (lu)

**Recommandation.** Un glossaire commun structuré autour des cinq heuristiques de Resnick, qui servent aussi d'objectifs transversaux.

**Disposition.** _à renseigner_

### VU-22 · mineur · Projet 1, visuel « vecteurs de danse » (l. 26)

**Constat.** Risque de comprendre que l'abeille pointe vers la nourriture; la transposition gravité/soleil et l'imprécision de la danse ne sont pas montrées.

**Preuve.** inféré; sources sur la dispersion non vérifiées

**Recommandation.** Une animation en deux temps (dans le noir du nid, puis dehors) avec la dispersion des courses visible.

**Disposition.** _à renseigner_

### VU-23 · mineur · Projet 3, thermomètre (l. 41)

**Constat.** Une jauge montre une valeur instantanée, pas l'oscillation à démontrer.

**Preuve.** inféré

**Recommandation.** Série temporelle avec bande cible et petits multiples homogène/diversifiée sur un axe commun, plus l'histogramme des seuils.

**Disposition.** _à renseigner_

### VU-24 · mineur · Projet 4 (l. 45-49)

**Constat.** La loi de Little est abstraite pour le grand public, et l'analogie TCP est d'attribution incertaine.

**Preuve.** Victor 2011 https://worrydream.com/ExplorableExplanations/ ; Prabhakar et al. 2012 https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 (mention de TCP non confirmée)

**Recommandation.** Document réactif L = λW avec une analogie familière (la caisse d'épicerie); attribuer la comparaison TCP avec soin.

**Disposition.** _à renseigner_

### VU-25 · mineur · Projet 6 (l. 61-65)

**Constat.** Le moulin peut nourrir l'idée de « fourmis stupides »; l'analogie avec l'injection de prompts est sensationnelle.

**Preuve.** inféré

**Recommandation.** Présenter le moulin comme le mode d'échec d'une règle habituellement efficace; étiqueter l'injection de prompts comme Analogie.

**Disposition.** _à renseigner_

### VU-26 · mineur · Projet 6, diagramme de phases (l. 64)

**Constat.** Trop abstrait pour le grand public sans redescente vers le concret.

**Preuve.** Victor, Ladder of Abstraction https://worrydream.com/LadderOfAbstraction/

**Recommandation.** Rendre chaque cellule du diagramme cliquable pour lancer l'exécution correspondante.

**Disposition.** _à renseigner_

### VU-27 · mineur · Visuels

**Constat.** Les représentations iconiques aident, mais les visages favorisent l'anthropomorphisme.

**Preuve.** Berney et Bétrancourt 2016, iconique supérieur à abstrait (lu)

**Recommandation.** Silhouettes sans visage au niveau Voir, points ou flèches ensuite, avec une transition explicite.

**Disposition.** _à renseigner_

### VU-28 · mineur · Technique (l. 73, « publiable comme artifact »)

**Constat.** Les artifacts claude.ai sont privés par défaut et partagés par lien, ce qui limite le référencement, la diffusion publique et la pérennité.

**Preuve.** description de l'outil Artifact (lu) ; reste : inféré

**Recommandation.** Hébergement statique public avec version archivée et citable; garder les artifacts pour les prototypes.

**Disposition.** _à renseigner_

### VU-29 · mineur · Évaluation et analytique

**Constat.** Une analytique d'usage serait soumise à la Loi 25 : fonctions d'identification et de profilage désactivées par défaut.

**Preuve.** https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/principaux-changements-loi-25 ; Conlen, Kale, Heer 2019 (recherche)

**Recommandation.** Analytique agrégée, sans identifiant, en consentement explicite (opt-in) pour toute étude; données sur une plateforme approuvée par le CER.

**Disposition.** _à renseigner_

### VU-30 · mineur · Livrables

**Constat.** Pas de version imprimable, d'affiche ni de matériel statique de classe.

**Preuve.** inféré

**Recommandation.** Réutiliser les petits multiples du mode mouvement réduit comme figures, affiches et condition témoin de l'évaluation.

**Disposition.** _à renseigner_

## Ajouts recommandés

### VU-A01 · ajout

Volet transversal V0 « Vulgarisation et évaluation » avec ses propres livrables : fiches de publics, objectifs mesurables, gabarit à trois niveaux, charte graphique, lexique contrôlé, liste de contrôle WCAG 2.2 AA, protocole pré/post

**Disposition.** _à renseigner_

### VU-A02 · ajout

Trois niveaux réordonnés pour toutes les pages : Voir (récit guidé avec prédiction), Explorer (bac à sable étayé), Vérifier (reproduction, N graines, code, limites)

**Disposition.** _à renseigner_

### VU-A03 · ajout

Mode « Vue de l'agent » dans chaque projet (perception locale et règle en clair), pont vers la fenêtre de contexte du LLM

**Disposition.** _à renseigner_

### VU-A04 · ajout

Panneau « Modifier la règle » au niveau Explorer, branché sur le projet 7

**Disposition.** _à renseigner_

### VU-A05 · ajout

Distribution sur N graines toujours affichée à côté de l'exécution vivante; graine et état dans l'URL

**Disposition.** _à renseigner_

### VU-A06 · ajout

Étiquettes de statut épistémique (Résultat reproduit, Modèle simplifié, Hypothèse de l'auteur, Analogie) sur chaque énoncé et chaque graphe

**Disposition.** _à renseigner_

### VU-A07 · ajout

Carte comparative révisée : relations plutôt que termes, colonne « où l'analogie casse », sans « Délégation », signal « no entry » côté fourmi, validée par trois experts

**Disposition.** _à renseigner_

### VU-A08 · ajout

Encart « Ce que fait vraiment la reine » et reformulation positive de la thèse

**Disposition.** _à renseigner_

### VU-A09 · ajout

Charte de couleurs vérifiée : fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues

**Disposition.** _à renseigner_

### VU-A10 · ajout

Version statique en petits multiples (mouvement réduit, affiches, notes, condition témoin de l'évaluation)

**Disposition.** _à renseigner_

### VU-A11 · ajout

Évaluation pédagogique randomisée (interactif contre statique), environ 115 à 307 participants par bras, entrevues à voix haute à la manière de PhET, CER (EPTC 2) et Loi 25

**Disposition.** _à renseigner_

### VU-A12 · ajout

Section « Ressources existantes et valeur ajoutée » (NetLogo Ants et BeeSmart, StarLogo, PhET, Nicky Case, Gordon)

**Disposition.** _à renseigner_

### VU-A13 · ajout

Version anglaise et glossaire terminologique validé

**Disposition.** _à renseigner_

### VU-A14 · ajout

Hébergement public archivé et citable (artifacts réservés aux prototypes)

**Disposition.** _à renseigner_

### VU-A15 · ajout

Budget d'heures de vulgarisation par page; règle « 1, 3 et 5 publiés et évalués avant 2, 4 et 6 »

**Disposition.** _à renseigner_


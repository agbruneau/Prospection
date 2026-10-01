# Constats — Vulgarisation

Source : [rapport complet](vulgarisation.md). 30 constats (4 critiques, 14 majeurs, 12 mineurs) et 15 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La vulgarisation est exigée au même titre que les projets académiques, mais la v3 la réduit à une phrase : aucun public cible, aucun objectif d'apprentissage mesurable, aucune évaluation pédagogique, aucune accessibilité, aucune règle de conception visuelle. Deux choix structurants vont à l'encontre de la littérature. Le niveau 1 « animation libre » donne le moins de guidage au public le moins outillé, alors que PhET juge limitée la valeur éducative de l'animation sans interaction. Le message central (« la reine ne commande pas », « chorégraphie », gradation fourmi → abeille → LLM) risque de renforcer l'esprit centralisateur, la téléologie et l'idée d'une échelle évolutive. La carte agentique réintroduit même l'orchestration avec « Délégation ». Tout se corrige au stade du devis par un volet transversal « vulgarisation et évaluation » : gabarit commun à trois niveaux réordonnés, charte graphique vérifiée pour le daltonisme, WCAG 2.2 AA, lexique contrôlé, protocole pré/post avec condition témoin. Bilan : 4 critiques, 14 majeurs, 12 mineurs; trois sources n'ont pas pu être lues (EPTC 2, Slessor 1988, Debunking Handbook) et sont signalées dans le rapport.

## Constats

### VU-01 · critique · Ensemble; l. 3 et l. 20 (format)

**Constat.** Aucun public cible n'est défini. Quatre publics aux besoins incompatibles (grand public, étudiants, praticiens de l'agentique, chercheurs) se partagent implicitement les mêmes pages, sans calibrage de durée, de vocabulaire, de point d'entrée ni de canal.

**Preuve.** v3 lue; PhET (Adams et al.) a restreint son public et l'a étudié en plus de 200 entrevues : https://phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf

**Recommandation.** Rédiger une fiche par public (contexte, durée, point d'entrée, prérequis, objectif, canal). Chaque page déclare son public principal et ses publics secondaires.

**Disposition.** Accepté — V0 donne une fiche par public (contexte, durée, point d'entrée, prérequis, objectif, canal, mesure) pour les quatre publics, et une règle d'attribution qui fixe, pour chaque page, un public principal et des publics secondaires; le bandeau Z0 affiche le public principal. — Traité dans : ../../07-vulgarisation-evaluation.md (§2.1 Fiches des quatre publics; §2.2 Pages, parcours et public principal; §4.2 zone Z0 Bandeau); ../../00-cadre.md (§8 Vulgarisation (V0), publics)

### VU-02 · critique · Critère de rigueur (l. 20)

**Constat.** La rigueur ne vise que la reproduction scientifique. Il n'y a aucun objectif d'apprentissage mesurable ni aucune évaluation de l'efficacité pédagogique, alors que les preuves sur l'interactivité sont mitigées et les effets faibles à moyens.

**Preuve.** Hohman et al. 2020 https://distill.pub/2020/communicating-with-interactive-articles/ ; Berney et Bétrancourt 2016, g = 0,226 https://doi.org/10.1016/j.compedu.2016.06.005 ; Höffler et Leutner 2007, d = 0,37 https://eric.ed.gov/?id=EJ780451 ; Hake 1998 https://www.per-central.org/items/detail.cfm?ID=2662

**Recommandation.** Ajouter des objectifs formulés selon Bloom révisé et des items de conceptions erronées en pré-test, post-test et post-test différé. Comparer à une condition témoin statique et mesurer le gain normalisé de Hake. Taille d'échantillon d'environ 115 à 307 par bras pour d entre 0,37 et 0,23. Prévoir un CER (EPTC 2) et la conformité à la Loi 25.

**Disposition.** Modifié — Objectifs-cadre formulés selon Bloom révisé, chacun avec un item de mesure nommé, items de conceptions erronées, pré-test, post-test immédiat et différé, condition témoin statique, CER et Loi 25. Adaptation : le critère primaire est l'ANCOVA (d ajusté), le gain normalisé de Hake est secondaire et sans seuil, et la cible est 132 par bras (188 à recruter) pour d = 0,30, au lieu de 115 à 307 par bras. — Traité dans : ../../07-vulgarisation-evaluation.md (§3 Objectifs d'apprentissage mesurables; §10 Protocole d'évaluation pédagogique, 10.1 à 10.5; §11 Éthique et vie privée); ../../00-cadre.md (§8 Vulgarisation (V0), évaluation)

### VU-03 · critique · Format à trois niveaux (l. 20)

**Constat.** Les niveaux sont inversés. L'animation libre non guidée va au grand public, l'expérience guidée arrive en dernier, et la carte agentique, qui intéresse les praticiens, est cachée au niveau 3.

**Preuve.** PhET : la valeur éducative de l'animation sans interactivité est « quite limited » (lu) ; Kirschner, Sweller, Clark 2006 https://doi.org/10.1207/s15326985ep4102_1 ; Segel et Heer 2010, verre à martini http://vis.stanford.edu/files/2010-Narrative-InfoVis.pdf ; Kim et al. 2017 https://mucollective.northwestern.edu/project/explaining-the-gap

**Recommandation.** Réordonner en Voir (récit guidé avec prédiction), Explorer (bac à sable étayé, Vue de l'agent, Modifier la règle), Vérifier (reproduction, N graines, code, limites). La carte agentique apparaît en résumé dès le niveau 1.

**Disposition.** Accepté — Gabarit Voir (récit guidé avec prédiction), Explorer (bac à sable étayé, Vue de l'agent, Modifier la règle), Vérifier (reproduction, N graines, code, limites), dans cet ordre; la carte agentique apparaît dès Voir sous forme d'une ligne. — Traité dans : ../../00-cadre.md (§8 Vulgarisation (V0), trois niveaux réordonnés); ../../07-vulgarisation-evaluation.md (§4.1 Principe; §4.3 Ce qui est visible à chaque niveau; §4.7 Carte agentique : dès le niveau 1)

### VU-04 · critique · Titre, thèse (l. 5)

**Constat.** « Chorégraphie » évoque un chorégraphe, et la négation « la reine ne commande pas » installe le mythe en tête de page. Le slogan est aussi trop général : les reines régulent la reproduction des ouvrières par phéromones, de sorte qu'un lecteur informé risque de rejeter tout le message.

**Preuve.** Resnick 1996 (lu) : « lead or seed »; le ballet et son chorégraphe y servent d'exemple qui nourrit l'esprit centralisateur https://pleiad.cl/_media/bic2007/papers/resnick-beyond-centralized-mindset.pdf ; Van Oystaeyen et al. 2014 https://www.science.org/doi/10.1126/science.1244899 ; Slessor et al. 1988 (recherche seulement)

**Recommandation.** Énoncer le mécanisme positif avec sa portée (les décisions de travail et de déplacement émergent de règles locales; la reine signale sa fécondité). Ajouter un encart « Ce que fait vraiment la reine » et un item pré/post « Qui choisit le site de l'essaim ? ».

**Disposition.** Accepté — Thèse reformulée au positif avec sa portée, « la reine ne commande pas » ramené à un constat biologique borné, « chorégraphie » remplacé par une typologie à trois axes; encart « Ce que fait vraiment la reine » (fait, mythe cité une fois, faille, fait) et item « Qui choisit le nouveau site de l'essaim ? » mesuré par HV0.2. — Traité dans : ../../00-cadre.md (§2.1 Thèse reformulée; §2.2 « Chorégraphie » : trois axes, pas un mot); ../../07-vulgarisation-evaluation.md (§7.3 Encart « Ce que fait vraiment la reine »; §10.1 HV0.2); ../../08-science-ouverte-ethique.md (§7.5 Charte anti-anthropomorphisme)

### VU-05 · majeur · Table des mécanismes (l. 9-16)

**Constat.** « Recrutement → Délégation » réintroduit l'orchestration, puisqu'en agentique déléguer est le rôle de l'orchestrateur central. « Freinage fourmi : absence de retours » omet le signal négatif « no entry ». La table aligne des termes plutôt que des relations.

**Preuve.** Anthropic 2024, orchestrator-workers https://www.anthropic.com/engineering/building-effective-agents ; Robinson et al. 2005 https://pure.york.ac.uk/portal/en/publications/insect-communication-no-entry-signal-in-ant-foraging ; Gentner 1983 https://doi.org/10.1207/s15516709cog0702_3

**Recommandation.** Remplacer « Délégation » par « annonce sur un canal partagé, puis auto-sélection ». Ajouter le signal « no entry », une colonne « relation conservée » et une colonne « où l'analogie casse ». Faire valider la carte par trois experts.

**Disposition.** Accepté — La table devient une carte en relations (relation, où l'analogie casse, statut, source) : « Délégation » est retiré (réservé à l'orchestration, en contre-exemple), le signal « no entry » et le freinage côté fourmi sont ajoutés. La validation par un myrmécologue, un apidologue et un praticien est posée comme condition de V0 et reste à obtenir. — Traité dans : ../../06-metriques-et-typologie.md (§6 Correspondance fourmi / abeille / agentique, révisée, 6.1 et 6.2; §7 Homonymies, ligne délégation); ../../07-vulgarisation-evaluation.md (§4.7 Carte agentique : dès le niveau 1); ../../08-science-ouverte-ethique.md (§8 Registre des déclarations, validations d'experts)

### VU-06 · majeur · Question transversale (l. 18); projet 7 (l. 69)

**Constat.** La gradation « scalaire → symbole → langage » et la courbe du gain selon la richesse du signal seront lues comme une échelle évolutive (fourmi < abeille < LLM). L'étiquette « scalaire » efface aussi la communication multimodale des fourmis.

**Preuve.** Johnson et al. 2013 : les fourmis sont le groupe frère des Apoidea https://www.sciencedirect.com/science/article/pii/S0960982213010567 ; Chi et al. 2012 https://doi.org/10.1111/j.1551-6709.2011.01207.x

**Recommandation.** Présenter la richesse du signal comme une dimension de conception parmi d'autres (persistance, contenu, localité, coût), sans ordre ni flèche. Dire explicitement que les deux insectes sont des solutions différentes, et non des étapes.

**Disposition.** Accepté — R est un vecteur à cinq composantes, jamais une échelle; l'ordre fourmi < abeille < LLM est déclaré hypothèse et « scalaire » une simplification de modèle. Les pages montrent l'arbre sans échelle (fourmis et Apoidea, groupes frères), sans flèche fourmi, abeille, agent; l'objectif OA-T.5 le mesure. — Traité dans : ../../00-cadre.md (§4 Construits mesurables; §2.4 Corrections factuelles, point 10); ../../06-metriques-et-typologie.md (§3 R, la richesse du signal : un vecteur); ../../07-vulgarisation-evaluation.md (§4.7; §3.1 OA-T.5); ../../08-science-ouverte-ethique.md (§7.5)

### VU-07 · majeur · Vocabulaire, passim

**Constat.** Vocabulaire anthropomorphique et téléologique sans politique explicite (décision, veto, débat, démocratie, délégation, « la colonie rééquilibre »). Le lecteur pressé du grand public est justement celui qui retient le plus les explications téléologiques.

**Preuve.** Kelemen et Rosset 2009 https://www.sciencedirect.com/science/article/abs/pii/S0010027709000146 ; Seeley 2010 https://press.princeton.edu/books/hardcover/9780691147215/honeybee-democracy ; Chi 2005 https://eric.ed.gov/?id=EJ724968

**Recommandation.** Un lexique contrôlé à deux colonnes (formulation mécaniste, métaphore étiquetée), un encart « Ce que ça ne veut pas dire » par page, des pictogrammes sans visage et des items pré/post ciblés.

**Disposition.** Accepté — Lexique contrôlé (à éviter seul, formulation mécaniste, métaphore étiquetée), encart « Ce que ça ne veut pas dire » par page (zone Z5), silhouettes sans visage au niveau Voir, items « qui décide ? » et « La colonie veut… », motifs proscrits vérifiés par TV0.13. — Traité dans : ../../07-vulgarisation-evaluation.md (§7.1 à 7.4 Lexique contrôlé et garde-fous; §4.2 zone Z5; §6.3 Pictogrammes et doublage; §3 Instrument); ../../08-science-ouverte-ethique.md (§7.5)

### VU-08 · majeur · Technique (l. 73) et format

**Constat.** L'accessibilité est absente. Canvas n'est pas lisible par les lecteurs d'écran, et les animations automatiques, les graphes temps réel, l'écran partagé et le glisser-déposer touchent les critères WCAG 2.2 1.1.1, 1.4.1, 1.4.10, 1.4.11, 2.1.1, 2.2.2, 2.5.7, 2.5.8, 4.1.2 et 4.1.3.

**Preuve.** https://www.w3.org/TR/WCAG22/ ; https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html ; https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements.html ; https://html.spec.whatwg.org/multipage/canvas.html ; https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

**Recommandation.** Viser WCAG 2.2 AA. Lecture, pause et pas-à-pas au clavier; curseurs natifs; résumé textuel avec role=status; tableau de données équivalent; alternative au glisser; cibles d'au moins 24 px; prefers-reduced-motion remplacé par des petits multiples statiques.

**Disposition.** Accepté — Liste de contrôle WCAG 2.2 AA qui couvre 1.1.1, 1.4.1, 1.4.10, 1.4.11, 2.1.1, 2.2.2, 2.5.7, 2.5.8, 4.1.2 et 4.1.3, avec contenu de repli du canevas, résumé textuel `role="status"`, bouton « Données », curseurs natifs, alternative au glisser, cibles de 24 px et jumeau statique sous `prefers-reduced-motion` (retenu comme bonne pratique de niveau AAA). — Traité dans : ../../07-vulgarisation-evaluation.md (§8 Liste de contrôle d'accessibilité (WCAG 2.2 AA); §4.2 Zones de la page; §6.6 Animation et mouvement; §12 TV0.4 à TV0.8)

### VU-09 · majeur · Visuels, écran partagé

**Constat.** Les couleurs ne sont pas spécifiées. La paire intuitive vermillon/orange (fourmi/abeille) ne garde qu'un ΔE d'environ 18 en deutéranopie, et l'orange n'a que 2,25:1 de contraste sur fond blanc, sous le seuil de 3:1.

**Preuve.** Calcul : [`v0_cvd.py`](../../../recherche/verifications-numeriques/v0_cvd.py) (Machado 2009, ΔE76) ; Crameri et al. 2020 https://pmc.ncbi.nlm.nih.gov/articles/PMC7595127/ ; https://developer.chrome.com/blog/new-in-devtools-83

**Recommandation.** Adopter fourmi #D55E00, abeille #0072B2, agent #CC79A7 (contraste d'au moins 3,06:1 dans les deux thèmes, pire ΔE d'environ 23), doubler chaque couleur d'un pictogramme et d'une étiquette, utiliser viridis ou cividis pour les grandeurs continues et valider avec l'émulation de DevTools.

**Disposition.** Accepté — Charte arrêtée sur fourmi #D55E00, abeille #0072B2, agent #CC79A7 (au moins 3:1 sur blanc et sur #121212), doublage obligatoire par pictogramme, étiquette, marqueur et trait; viridis par défaut, cividis en mode daltonisme; vérification par script CIEDE2000 et épreuve visuelle avec émulation (TV0.1 à TV0.3, EV0.6). — Traité dans : ../../07-vulgarisation-evaluation.md (§6.1 Couleurs d'identité; §6.2 Distinguabilité sous dichromatie; §6.3; §6.4 Palettes continues; §12 TV0.1 à TV0.3); ../../00-cadre.md (§8 Vulgarisation (V0), charte)

### VU-10 · majeur · Visuels des projets 1 à 6

**Constat.** Le projet repose sur des animations et des courbes temps réel, alors que l'animation est la forme la moins efficace pour l'analyse et que les petits multiples sont plus exacts. Aucune vue d'ensemble sur les paramètres n'est prévue.

**Preuve.** Robertson et al. 2008 https://www.microsoft.com/en-us/research/publication/effectiveness-of-animation-in-trend-visualization/ ; Tversky et al. 2002 https://dl.acm.org/doi/10.1006/ijhc.2002.1017 ; Victor 2011 https://worrydream.com/LadderOfAbstraction/

**Recommandation.** Coupler chaque animation à un graphe statique synchronisé et à une vue « échelle d'abstraction » (balayage du paramètre clé en petits multiples ou en nuage de N exécutions), avec un rythme contrôlé par l'utilisateur.

**Disposition.** Accepté — Chaque scène est couplée à un graphe synchronisé (Z2) et à la distribution sur N graines (Z3); Vérifier offre le balayage en petits multiples dont chaque cellule ouvre l'exécution (échelle d'abstraction); le rythme est contrôlé par la personne et le jumeau statique fournit les petits multiples. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 zones Z1 à Z3; §4.6 Niveau Vérifier : lecture libre; §6.6 Animation et mouvement; §9 Version statique en petits multiples)

### VU-11 · majeur · Écran partagé (l. 20, l. 26)

**Constat.** Un même cadre et une même horloge suggèrent des échelles spatiales et temporelles comparables. Les graphes juxtaposés empêchent la comparaison directe, et l'écran partagé est impossible à 320 px.

**Preuve.** Gleicher et al. 2011 https://doi.org/10.1177/1473871611416549 ; Cleveland et McGill 1984 https://doi.org/10.1080/01621459.1984.10478080 ; WCAG 1.4.10 https://www.w3.org/WAI/WCAG22/Understanding/reflow.html ; écart de distances de butinage : inféré, non vérifié

**Recommandation.** Barre d'échelle et horloge par panneau, avec la mention « échelles différentes ». Superposer les courbes de résultat sur un axe commun normalisé. Sur mobile, un sélecteur à état synchronisé.

**Disposition.** Accepté — Barre d'échelle et horloge propres à chaque espèce avec la mention « échelles différentes », courbes de résultat superposées sur un axe commun normalisé, et sélecteur fourmi/abeille à état synchronisé à 320 px. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 zones Z1 et Z2; §4.10 Disposition, échelles et mobile); ../../05-spec-simulation.md (§14 Ce que la couche navigateur ne doit jamais faire, displayTimeScale)

### VU-12 · majeur · Niveau 3, expérience guidée

**Constat.** Une seule exécution stochastique sert de démonstration. Une exécution atypique contredit le récit, ou un seul essai est pris pour une preuve.

**Preuve.** inféré (modèles probabilistes); PhET : les élèves prennent ce qu'ils voient pour un fait (lu)

**Recommandation.** Graine fixée et affichée, état dans l'URL, et distribution sur N graines toujours visible à côté de l'exécution vivante. Le récit annonce sa graine typique.

**Disposition.** Accepté — Aucune exécution n'est montrée sans sa distribution sur N graines (invariant, TV0.16); l'exécution typique est choisie une fois avant publication par une règle consignée et sa graine est annoncée; graine et état sont dans le fragment d'URL. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.3 Invariant; §4.4 Niveau Voir; §4.8 Distribution sur N graines; §4.9 Graine et état dans l'URL; §12 TV0.15 et TV0.16); ../../05-spec-simulation.md (§8.3 Résumés précalculés pour les pages)

### VU-13 · majeur · Intention (l. 3) et visuels

**Constat.** Le niveau individuel est invisible : tous les visuels montrent la vue d'ensemble que l'agent n'a pas, ce qui nourrit la confusion des niveaux.

**Preuve.** Wilensky et Resnick 1999 http://ccl.northwestern.edu/1999/thinking_in_levels.pdf ; Wilensky et Reisman 2006 https://doi.org/10.1207/s1532690xci2402_1 ; Resnick 1996, « A flock isn't a big bird » (lu)

**Recommandation.** Ajouter dans chaque projet un mode « Vue de l'agent » : perception locale masquée et règle courante en clair. C'est aussi un pont vers la fenêtre de contexte du LLM.

**Disposition.** Accepté — Zone Z6 « Vue de l'agent » à chaque niveau (vignette, suivi interactif, trace exportable) : perception locale seule et règle en clair avec les quantités de l'instant; pont vers la fenêtre de contexte du LLM étiqueté Analogie; chaque fiche la spécialise. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 zone Z6; §4.3; §4.5 Niveau Explorer); ../../../projets/P1-recrutement-verrouillage.md (§8 Explorer); ../../../projets/P5-decision-par-quorum.md (§8 Vue de l'agent); ../../../projets/P7-synthese-agentique.md (§8 Vue de l'agent); ../../../projets/P8-individu-et-colonie.md (§8.2 à 8.4)

### VU-14 · majeur · Format (l. 20)

**Constat.** Il n'y a pas de niveau « construire ou modifier la règle », alors que la pensée décentralisée se développe quand on construit des modèles. C'est un manque pour les étudiants et pour les praticiens, qui écrivent du code.

**Preuve.** Resnick 1996, cinq heuristiques apparues pendant la construction (lu) ; Jacobson et Wilensky 2006 https://doi.org/10.1207/s15327809jls1501_4

**Recommandation.** Ajouter un panneau Modifier la règle (formule ou quelques lignes de TypeScript) au niveau Explorer, branché sur le projet 7 (« remplacez la règle par un LLM »).

**Disposition.** Modifié — Panneau Modifier la règle (zone Z7) au niveau Explorer : règle publiée, variantes prédéfinies, puis éditeur (formule ou quelques lignes de TypeScript) dans un worker isolé. Adaptation : « remplacer la règle par un LLM » se fait par rejeu de cassettes archivées, jamais par appel d'API depuis la page, et le code modifié n'est jamais encodé dans l'URL. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 zone Z7; §4.5 Modifier la règle); ../../05-spec-simulation.md (§14); ../../../projets/P7-synthese-agentique.md (§8 Modifier la règle)

### VU-15 · majeur · Projets 3, 4 et 7 (l. 42, 49, 70)

**Constat.** Le statut épistémique n'est pas signalé dans les visuels : des hypothèses agentiques (« la diversité stabilise ») sont présentées comme des faits, mêlées aux résultats reproduits.

**Preuve.** v3 lue (l. 42, 49) ; risque de transfert : inféré

**Recommandation.** Une étiquette visible par énoncé et par graphe (Résultat publié reproduit, Modèle simplifié, Hypothèse de l'auteur, Analogie), vérifiable automatiquement par un attribut HTML.

**Disposition.** Accepté — Étiquette de statut (quatre valeurs) et de régime sur chaque énoncé et chaque graphe, rendue par une forme et un texte; attributs `data-statut` et `data-regime` vérifiés automatiquement (TV0.13, le harnais refuse la version s'il en manque); chaque fiche déclare le statut de ses visuels. — Traité dans : ../../00-cadre.md (§6 Principes de rigueur, principe 7); ../../07-vulgarisation-evaluation.md (§5 Statut épistémique : modèle d'affichage; §12 TV0.13); ../../../projets/P3-division-du-travail.md (§8 Visuels); ../../../projets/P4-regulation-sans-vue-densemble.md (§8.1 Les six visuels)

### VU-16 · majeur · Technique et parcours (l. 73-74)

**Constat.** La charge de production est sous-estimée : environ 40 vues interactives à concevoir, rendre accessibles, tester et évaluer.

**Preuve.** Distill Hiatus 2021 (plus de 50 h d'éditeur par article, épuisement) https://distill.pub/2021/distill-hiatus/ ; Hohman et al. 2020 ; Olah et Carter 2017 https://distill.pub/2017/research-debt/

**Recommandation.** Gabarit et charte uniques; publier et évaluer 1, 3 et 5 avant 2, 4 et 6; budgéter les heures (estimation inférée : au moins 40 à 80 h par page complète).

**Disposition.** Accepté — Gabarit et charte uniques; budget par parcours et par page (24 à 45 h, plus n pages de 20 à 36 h, soit 1 792 à 3 240 h pour 80 pages, [estimation, à confirmer]); séquence par phases (phase 1 publiée et évaluée avant la phase 2) et risque R102 avec signal d'alerte, repris au registre de la feuille de route (R205). — Traité dans : ../../07-vulgarisation-evaluation.md (§14 Budget d'heures de vulgarisation par page; §1 règle 1; §17.2 R102); ../../09-feuille-de-route.md (§6.2 Heures de vulgarisation par page; §7 Registre des risques)

### VU-17 · majeur · Ensemble

**Constat.** Pas de positionnement par rapport aux ressources existantes (NetLogo Ants et BeeSmart, StarLogo, PhET, Nicky Case, Gordon), d'où un risque de doublon et une valeur ajoutée non dite.

**Preuve.** https://ccl.northwestern.edu/netlogo/models/Ants ; https://ccl.northwestern.edu/netlogo/models/BeeSmartHiveFinding ; https://ncase.me/ ; https://www.ted.com/talks/deborah_gordon_the_emergent_genius_of_ant_colonies

**Recommandation.** Ajouter une section Ressources existantes et valeur ajoutée (comparaison fourmi/abeille dans un moteur commun, pont agentique). Utiliser Ants et BeeSmart comme repères et lectures complémentaires, sans reprendre leur code (licence CC BY-NC-SA).

**Disposition.** Accepté — Section « Ressources existantes et valeur ajoutée » : NetLogo Ants et BeeSmart comme repères et témoins actifs possibles (EV0.7), sans reprise de leur code (CC BY-NC-SA); StarLogo, PhET, Nicky Case, Gordon; valeur ajoutée énoncée (fourmi et abeille sur noyau commun, Vue de l'agent, étiquetage, Vérifier, pont agentique). — Traité dans : ../../07-vulgarisation-evaluation.md (§13 Ressources existantes et valeur ajoutée; §16 Hébergement, archivage et publication, ligne Licences); ../../08-science-ouverte-ethique.md (§3 Licences proposées)

### VU-18 · majeur · Projet 7 (l. 68-69)

**Constat.** La grille 2 × 4 utilise des noms commerciaux qui vieilliront et suggèrent un classement, et la courbe du gain n'affiche pas d'incertitude alors que les agents LLM sont stochastiques. Risque de surinterprétation par les praticiens.

**Preuve.** inféré

**Recommandation.** Nommer par palier de capacité en donnant les identifiants et la date dans la note; présenter chaque cellule comme un nuage de N exécutions avec intervalle; ajouter coût et latence; étiquette « exploratoire ».

**Disposition.** Modifié — Les visuels publics nomment des paliers (petit, moyen, grand modèle), avec identifiants et date dans Vérifier et dans la note; chaque cellule affiche la distribution et le coût avec intervalle, sous la mention exploratoire ou confirmatoire. Adaptation : la latence n'est pas prévue à l'affichage (elle est mesurée dans le vecteur de coût et le journal). — Traité dans : ../../07-vulgarisation-evaluation.md (§4.8 Agents LLM; §5; §7.2 ligne Noms de produits dans les visuels publics); ../../06-metriques-et-typologie.md (§5.2 Coût); ../../08-science-ouverte-ethique.md (§7.5); ../../../projets/P7-synthese-agentique.md (§8 Visuels et trois niveaux)

### VU-19 · mineur · Technique (l. 73)

**Constat.** Le mobile n'est pas traité : performance Canvas, batterie, orientation, tactile.

**Preuve.** WCAG 1.3.4 et 2.5.8 (lu) ; API de visibilité : inféré

**Recommandation.** Pause quand le canevas n'est pas visible, plafond d'agents selon l'appareil, cibles d'au moins 24 px, deux orientations, tests en 375 × 812.

**Disposition.** Accepté — Test à 375 × 812, plafond d'agents selon l'appareil, pause hors écran et onglet masqué (Page Visibility, Intersection Observer), cibles d'au moins 24 px, aucune restriction d'orientation (1.3.4), aucune interaction qui dépend du survol, sélecteur synchronisé à 320 px. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.10; §8 critères 1.3.4 et 2.5.8; §6.6); ../../../projets/P4-regulation-sans-vue-densemble.md (§8.5 Accessibilité propre au projet, Mobile)

### VU-20 · mineur · Ensemble

**Constat.** Langue unique implicite, alors que les praticiens de l'agentique lisent surtout l'anglais; terminologie française non validée.

**Preuve.** ncase.me/trust compte de nombreuses traductions bénévoles (lu) ; GDT non consulté

**Recommandation.** Externaliser les chaînes dès le départ pour une version anglaise; valider la terminologie (danse frétillante, trémulation, tandem, stigmergie) avec le GDT de l'OQLF.

**Disposition.** Accepté — Chaînes externalisées dès le départ (catalogues français canadien et anglais, traduction d'abord des pages des praticiens), lexique et motifs proscrits en deux langues, glossaire bilingue tenu; la terminologie (danse frétillante, trémulation, tandem, stigmergie) reste à valider avec le GDT de l'OQLF, non encore consulté. — Traité dans : ../../07-vulgarisation-evaluation.md (§15 Version anglaise et glossaire); ../../10-glossaire.md (Glossaire bilingue (français / anglais))

### VU-21 · mineur · Table (l. 11) et ensemble

**Constat.** Pas de glossaire; le terme « stigmergie » est absent alors que la table le décrit.

**Preuve.** v3 lue ; Resnick 1996 (lu)

**Recommandation.** Un glossaire commun structuré autour des cinq heuristiques de Resnick, qui servent aussi d'objectifs transversaux.

**Disposition.** Modifié — Glossaire bilingue en place avec « stigmergie », quorum, seuil de réponse, inhibition croisée et la liste fermée d'homonymies; V0 en fixe la présentation. Écart : le glossaire n'est pas structuré autour des cinq heuristiques de Resnick (annoncées seulement comme fil structurant), il n'a pas d'entrées rétroaction positive et négative, et ces heuristiques ne sont pas formulées comme objectifs transversaux. — Traité dans : ../../07-vulgarisation-evaluation.md (§15 Version anglaise et glossaire; §3.1 Objectifs transversaux); ../../10-glossaire.md (Glossaire; Homonymies à lever); ../../06-metriques-et-typologie.md (§7 Homonymies à lever)

### VU-22 · mineur · Projet 1, visuel « vecteurs de danse » (l. 26)

**Constat.** Risque de comprendre que l'abeille pointe vers la nourriture; la transposition gravité/soleil et l'imprécision de la danse ne sont pas montrées.

**Preuve.** inféré; sources sur la dispersion non vérifiées

**Recommandation.** Une animation en deux temps (dans le noir du nid, puis dehors) avec la dispersion des courses visible.

**Disposition.** Modifié — P1 montre la dispersion des recrues au sol avec un curseur d'erreur de 0 à 60° (V5) et la traduction angle vers azimut, durée vers distance avec bande d'incertitude (V6). Écart : l'animation en deux temps (dans le noir du nid, puis dehors) et la transposition gravité/soleil ne sont écrites nulle part. — Traité dans : ../../../projets/P1-recrutement-verrouillage.md (§8 Visuels et trois niveaux, V5 et V6); ../../06-metriques-et-typologie.md (§6.1 Coordination, ligne Codage du signal)

### VU-23 · mineur · Projet 3, thermomètre (l. 41)

**Constat.** Une jauge montre une valeur instantanée, pas l'oscillation à démontrer.

**Preuve.** inféré

**Recommandation.** Série temporelle avec bande cible et petits multiples homogène/diversifiée sur un axe commun, plus l'histogramme des seuils.

**Disposition.** Modifié — P3 remplace la jauge par une trace de température avec bande cible de 33 à 36 °C pour une patriligne contre quinze (visuel 7), montre l'oscillation en courbe et jamais par clignotement, et le jumeau statique fournit les petits multiples à axes communs. Écart : l'histogramme des seuils n'est pas au catalogue. — Traité dans : ../../../projets/P3-division-du-travail.md (§8 Visuels et trois niveaux, visuels 7 et 10, accessibilité propre); ../../07-vulgarisation-evaluation.md (§9 Version statique en petits multiples)

### VU-24 · mineur · Projet 4 (l. 45-49)

**Constat.** La loi de Little est abstraite pour le grand public, et l'analogie TCP est d'attribution incertaine.

**Preuve.** Victor 2011 https://worrydream.com/ExplorableExplanations/ ; Prabhakar et al. 2012 https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 (mention de TCP non confirmée)

**Recommandation.** Document réactif L = λW avec une analogie familière (la caisse d'épicerie); attribuer la comparaison TCP avec soin.

**Disposition.** Modifié — P4 se présente comme un document réactif sur L = λW (Vis3, « Un triangle, deux files ») et attribue l'analogie TCP au communiqué de Stanford et à Gordon (OA-P4.3, erreur « TCP est dans l'article »). Écart : l'analogie familière (la caisse d'épicerie) n'est écrite nulle part. — Traité dans : ../../../projets/P4-regulation-sans-vue-densemble.md (§8.1 Les six visuels; §8.2; §8.6 Erreurs de compréhension à prévenir); ../../07-vulgarisation-evaluation.md (§3.2 OA-P4.1 et OA-P4.3); ../../00-cadre.md (§2.4 Corrections factuelles, point 5); ../../10-glossaire.md (analogie TCP)

### VU-25 · mineur · Projet 6 (l. 61-65)

**Constat.** Le moulin peut nourrir l'idée de « fourmis stupides »; l'analogie avec l'injection de prompts est sensationnelle.

**Preuve.** inféré

**Recommandation.** Présenter le moulin comme le mode d'échec d'une règle habituellement efficace; étiqueter l'injection de prompts comme Analogie.

**Disposition.** Accepté — Le moulin est présenté comme le mode d'échec d'une règle habituellement efficace (OA-P6.1, entrée du glossaire, erreur « fourmis stupides » prévenue) et l'injection de prompt est étiquetée Analogie, sans immunité biologique présentée comme acquise. — Traité dans : ../../../projets/P6-defaillances-et-defenses.md (§8 Erreurs de compréhension à prévenir; tableau des visuels V6.4 et V6.6); ../../07-vulgarisation-evaluation.md (§3.2 OA-P6.1; §7.2); ../../10-glossaire.md (moulin de fourmis)

### VU-26 · mineur · Projet 6, diagramme de phases (l. 64)

**Constat.** Trop abstrait pour le grand public sans redescente vers le concret.

**Preuve.** Victor, Ladder of Abstraction https://worrydream.com/LadderOfAbstraction/

**Recommandation.** Rendre chaque cellule du diagramme cliquable pour lancer l'exécution correspondante.

**Disposition.** Accepté — Chaque cellule du balayage en petits multiples ouvre l'exécution correspondante au niveau Vérifier, et la carte des régimes de P6 (V6.3) est cliquable et lance une mini-simulation par cellule, la carte complète étant précalculée en headless. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.6 Niveau Vérifier : lecture libre); ../../../projets/P6-defaillances-et-defenses.md (§8 Explorer, V6.3; §9 Plan de simulation, navigateur)

### VU-27 · mineur · Visuels

**Constat.** Les représentations iconiques aident, mais les visages favorisent l'anthropomorphisme.

**Preuve.** Berney et Bétrancourt 2016, iconique supérieur à abstrait (lu)

**Recommandation.** Silhouettes sans visage au niveau Voir, points ou flèches ensuite, avec une transition explicite.

**Disposition.** Accepté — Silhouettes sans visage au niveau Voir, points ou flèches ensuite avec transition explicite; visage contre silhouette testé sans présupposé (HV0.4, EV0.3), silhouettes par défaut dans les deux cas. — Traité dans : ../../07-vulgarisation-evaluation.md (§6.3 Pictogrammes et doublage; §10.1 HV0.4; §10.7 Règles de décision); ../../08-science-ouverte-ethique.md (§7.5)

### VU-28 · mineur · Technique (l. 73, « publiable comme artifact »)

**Constat.** Les artifacts claude.ai sont privés par défaut et partagés par lien, ce qui limite le référencement, la diffusion publique et la pérennité.

**Preuve.** description de l'outil Artifact (lu) ; reste : inféré

**Recommandation.** Hébergement statique public avec version archivée et citable; garder les artifacts pour les prototypes.

**Disposition.** Accepté — Hébergement statique public avec build archivée par projet, DOI de version et SWHID; les artifacts claude.ai sont réservés aux prototypes (ni référencement, ni diffusion grand public, ni archivage). — Traité dans : ../../07-vulgarisation-evaluation.md (§16 Hébergement, archivage et publication); ../../08-science-ouverte-ethique.md (§2 Inventaire des objets produits, ligne Pages interactives); ../../05-spec-simulation.md (§12 Spike de la phase 0, SPK1)

### VU-29 · mineur · Évaluation et analytique

**Constat.** Une analytique d'usage serait soumise à la Loi 25 : fonctions d'identification et de profilage désactivées par défaut.

**Preuve.** https://www.cai.gouv.qc.ca/protection-renseignements-personnels/sujets-et-domaines-dinteret/principaux-changements-loi-25 ; Conlen, Kale, Heer 2019 (recherche)

**Recommandation.** Analytique agrégée, sans identifiant, en consentement explicite (opt-in) pour toute étude; données sur une plateforme approuvée par le CER.

**Disposition.** Accepté — Aucune analytique active par défaut (TV0.12); une analytique agrégée sans identifiant ni requête tierce reste admise; journal d'interactions seulement dans l'étude, avec consentement; données de participants sur un stockage approuvé par le CER. — Traité dans : ../../07-vulgarisation-evaluation.md (§11.3 Loi 25; §11.4 Règles de conception retenues; §12 TV0.12); ../../08-science-ouverte-ethique.md (§7.4 Évaluation pédagogique : CER et Loi 25)

### VU-30 · mineur · Livrables

**Constat.** Pas de version imprimable, d'affiche ni de matériel statique de classe.

**Preuve.** inféré

**Recommandation.** Réutiliser les petits multiples du mode mouvement réduit comme figures, affiches et condition témoin de l'évaluation.

**Disposition.** Accepté — Le jumeau statique (HTML sans JavaScript, généré par le moteur headless) sert d'affiche, de figure de note, de matériel de classe, de PDF et de condition témoin. — Traité dans : ../../07-vulgarisation-evaluation.md (§9 Version statique en petits multiples; §16 ligne Impression)

## Ajouts recommandés

### VU-A01 · ajout

Volet transversal V0 « Vulgarisation et évaluation » avec ses propres livrables : fiches de publics, objectifs mesurables, gabarit à trois niveaux, charte graphique, lexique contrôlé, liste de contrôle WCAG 2.2 AA, protocole pré/post

**Disposition.** Accepté — V0 est un volet transversal du programme qui livre fiches de publics, objectifs mesurables, gabarit à trois niveaux, charte, lexique contrôlé, liste WCAG 2.2 AA et protocole pré/post, chacun avec un critère « prêt quand ». — Traité dans : ../../00-cadre.md (§5 Architecture du programme; §8 Vulgarisation (V0)); ../../07-vulgarisation-evaluation.md (§1 Portée et règles qui gouvernent V0); ../../02-architecture-programme.md (§1 Vue d'ensemble)

### VU-A02 · ajout

Trois niveaux réordonnés pour toutes les pages : Voir (récit guidé avec prédiction), Explorer (bac à sable étayé), Vérifier (reproduction, N graines, code, limites)

**Disposition.** Accepté — Trois niveaux Voir, Explorer, Vérifier pour toutes les pages, spécialisés par chaque fiche de projet. — Traité dans : ../../00-cadre.md (§8 Vulgarisation (V0)); ../../07-vulgarisation-evaluation.md (§4.1 à 4.6); fiches de projet, §8 de chacune (par exemple ../../../projets/P1-recrutement-verrouillage.md, ../../../projets/P5-decision-par-quorum.md)

### VU-A03 · ajout

Mode « Vue de l'agent » dans chaque projet (perception locale et règle en clair), pont vers la fenêtre de contexte du LLM

**Disposition.** Accepté — Zone Z6 « Vue de l'agent » aux trois niveaux, avec le pont vers la fenêtre de contexte du LLM étiqueté Analogie. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 zone Z6; §4.5 Niveau Explorer); ../../../projets/P7-synthese-agentique.md (§8 Vue de l'agent); ../../../projets/P8-individu-et-colonie.md (§8.2 à 8.4)

### VU-A04 · ajout

Panneau « Modifier la règle » au niveau Explorer, branché sur le projet 7

**Disposition.** Modifié — Zone Z7 « Modifier la règle » au niveau Explorer; sur P7, la bascule vers un LLM passe par le rejeu de cassettes archivées et non par un appel direct (aucune clé d'API, aucun appel depuis la page). — Traité dans : ../../07-vulgarisation-evaluation.md (§4.5 Modifier la règle); ../../../projets/P7-synthese-agentique.md (§8 Modifier la règle); ../../05-spec-simulation.md (§14)

### VU-A05 · ajout

Distribution sur N graines toujours affichée à côté de l'exécution vivante; graine et état dans l'URL

**Disposition.** Accepté — Distribution sur N graines affichée à tous les niveaux dès qu'une exécution est montrée (TV0.16); graine et état dans le fragment d'URL avec liste blanche de paramètres (TV0.15). — Traité dans : ../../07-vulgarisation-evaluation.md (§4.3 Invariant; §4.8; §4.9; §12 TV0.15 et TV0.16)

### VU-A06 · ajout

Étiquettes de statut épistémique (Résultat reproduit, Modèle simplifié, Hypothèse de l'auteur, Analogie) sur chaque énoncé et chaque graphe

**Disposition.** Accepté — Étiquettes de statut épistémique et de régime sur chaque énoncé et chaque graphe, avec attributs `data-statut` et `data-regime` et contrôle automatique TV0.13. — Traité dans : ../../00-cadre.md (§6 Principes de rigueur, principe 7); ../../07-vulgarisation-evaluation.md (§5; §12 TV0.13)

### VU-A07 · ajout

Carte comparative révisée : relations plutôt que termes, colonne « où l'analogie casse », sans « Délégation », signal « no entry » côté fourmi, validée par trois experts

**Disposition.** Accepté — Carte révisée en relations, avec colonnes « Relation conservée » et « Où l'analogie casse », sans ligne « Délégation », avec « no entry » côté fourmi; la validation par trois experts est inscrite comme condition et reste à obtenir. — Traité dans : ../../06-metriques-et-typologie.md (§6 Correspondance fourmi / abeille / agentique, révisée); ../../07-vulgarisation-evaluation.md (§4.7); ../../08-science-ouverte-ethique.md (§8 Registre des déclarations)

### VU-A08 · ajout

Encart « Ce que fait vraiment la reine » et reformulation positive de la thèse

**Disposition.** Accepté — Encart « Ce que fait vraiment la reine » en cinq temps (fait, avertissement, mythe cité une fois, faille, fait) et thèse reformulée au positif; l'encart est inclus par référence sur les pages où la question « qui commande ? » se pose. — Traité dans : ../../00-cadre.md (§2.1 Thèse reformulée); ../../07-vulgarisation-evaluation.md (§7.3 Encart « Ce que fait vraiment la reine »); ../../../projets/P5-decision-par-quorum.md (§8 Voir)

### VU-A09 · ajout

Charte de couleurs vérifiée : fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues

**Disposition.** Accepté — Charte de couleurs et pictogrammes arrêtée (fourmi #D55E00, abeille #0072B2, agent #CC79A7), avec viridis par défaut et cividis en mode daltonisme pour les grandeurs continues. — Traité dans : ../../00-cadre.md (§8 Vulgarisation (V0), charte); ../../07-vulgarisation-evaluation.md (§6.1 à 6.4)

### VU-A10 · ajout

Version statique en petits multiples (mouvement réduit, affiches, notes, condition témoin de l'évaluation)

**Disposition.** Accepté — Jumeau statique en petits multiples, généré par le moteur, qui sert de mode mouvement réduit, d'affiche, de note et de condition témoin de l'évaluation. — Traité dans : ../../07-vulgarisation-evaluation.md (§9 Version statique en petits multiples; §6.6; §10.2 Plan, condition B)

### VU-A11 · ajout

Évaluation pédagogique randomisée (interactif contre statique), environ 115 à 307 participants par bras, entrevues à voix haute à la manière de PhET, CER (EPTC 2) et Loi 25

**Disposition.** Modifié — Évaluation randomisée interactif contre statique, préenregistrée, avec entrevues à voix haute à la manière de PhET, CER et Loi 25. Adaptation : cible de 132 par bras (188 à recruter) pour d = 0,30 au lieu de 115 à 307, essai contrôlé sur les parcours P1 et P5 (EV0.2), pré-post exploratoire sans témoin pour les phases 2 et 3. — Traité dans : ../../07-vulgarisation-evaluation.md (§10 Protocole d'évaluation pédagogique, 10.1 à 10.6 et 10.8; §11 Éthique et vie privée); ../../08-science-ouverte-ethique.md (§7.4); ../../09-feuille-de-route.md (§5.1 Portes du programme, GF3, GF5, GF8)

### VU-A12 · ajout

Section « Ressources existantes et valeur ajoutée » (NetLogo Ants et BeeSmart, StarLogo, PhET, Nicky Case, Gordon)

**Disposition.** Accepté — Section « Ressources existantes et valeur ajoutée » qui couvre NetLogo Ants et BeeSmart, StarLogo, PhET, Nicky Case et Gordon, avec leur usage dans le programme. — Traité dans : ../../07-vulgarisation-evaluation.md (§13 Ressources existantes et valeur ajoutée)

### VU-A13 · ajout

Version anglaise et glossaire terminologique validé

**Disposition.** Accepté — Chaînes externalisées avec catalogues français canadien et anglais, lexique et motifs proscrits bilingues, glossaire bilingue tenu; la validation terminologique avec le GDT de l'OQLF est prévue et pas encore faite. — Traité dans : ../../07-vulgarisation-evaluation.md (§15 Version anglaise et glossaire); ../../10-glossaire.md (Glossaire bilingue (français / anglais))

### VU-A14 · ajout

Hébergement public archivé et citable (artifacts réservés aux prototypes)

**Disposition.** Accepté — Hébergement statique public archivé et citable (build par projet, DOI, SWHID); artifacts claude.ai réservés aux prototypes. — Traité dans : ../../07-vulgarisation-evaluation.md (§16 Hébergement, archivage et publication); ../../08-science-ouverte-ethique.md (§2 Inventaire des objets produits, ligne Pages interactives)

### VU-A15 · ajout

Budget d'heures de vulgarisation par page; règle « 1, 3 et 5 publiés et évalués avant 2, 4 et 6 »

**Disposition.** Modifié — Budget d'heures par parcours et par page, et règle de séquence reprise en l'adaptant aux phases de la v4 : phase 1 (P1, P8, P5) publiée et évaluée avant la phase 2 (P3, P4, P6, P9 mouvement), puis la phase 3, au lieu de « 1, 3 et 5 avant 2, 4 et 6 ». — Traité dans : ../../07-vulgarisation-evaluation.md (§14; §1 règle 1; §17.1 Portes, G1 et G2); ../../09-feuille-de-route.md (§3 Règle de séquence; §6.2 Heures de vulgarisation par page)


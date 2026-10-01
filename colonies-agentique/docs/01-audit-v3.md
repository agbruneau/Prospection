# Audit de la proposition v3 : synthèse

**Statut :** synthèse de l'audit, subordonnée au [cadre](00-cadre.md) (en cas de conflit, le cadre prime). **Date :** 2026-10-01. **Régime :** production (le relecteur agit sur ce document : décomptes, restes ouverts, contrôles).
**Légende :** [calculé] = recompté par script; [lu] = lu dans le fichier cité; [I] = inféré par le rédacteur de cette synthèse; [à confirmer] = valeur non confirmée dans la source.

## Résultat

Sept auditeurs ont examiné la [proposition v3](annexes/proposition-v3.md) sous sept angles et produit **281 entrées** : 192 constats (21 critiques, 104 majeurs, 67 mineurs) et 89 ajouts recommandés. Chaque entrée porte une ligne **Disposition** dans les fichiers `constats-*.md`. Recompte [calculé] :

| Accepté | Modifié | Rejeté | Hors portée | Non traité | Total |
|---:|---:|---:|---:|---:|---:|
| 161 (57,3 %) | 115 (40,9 %) | 0 | 5 (1,8 %) | 0 | 281 |

<!-- compter-dispositions: Accepté=161 Modifié=115 Rejeté=0 Hors portée=5 Non traité=0 total=281 -->

Le zéro de la colonne « Rejeté » ne veut pas dire que tout a été suivi à la lettre : 115 entrées sont « Modifié », dont au moins 35 nomment un écart restant, et cinq entrées sont hors du périmètre. Les trois entrées restées sans réponse à la rédaction ont été traitées à la validation finale (rubrique « Restes ouverts »). Les entrées ne sont pas reprises une à une ici : chaque rubrique renvoie aux fichiers.

**Identifiants.** Dans les fichiers constats, BA = bio-abeilles, BF = bio-fourmis, CA = chorégraphie-agentique, LA = lacunes, ME = méthodologie, ST = simulation-technique, VU = vulgarisation. `BA-01` est un constat, `BA-A01` un ajout recommandé. Les constats sont triés par gravité dans chaque fichier; la numérotation interne des rapports complets (C1, M4, L12…) ne correspond directement qu'en lacunes (LAnn = Lnn) [I]. Le lien « Source » en tête de chaque fichier constats ouvre le rapport correspondant.

## Méthode

1. **Audit.** Chaque auditeur a examiné la v3 sous son angle (lecture intégrale déclarée par quatre des sept rapports); les rapports délimitent leur étendue (l'auditeur bio-fourmis, par exemple, ne touche aux angles voisins que là où ils s'appuient sur une affirmation myrmécologique). Les références ont été vérifiées par Crossref, OpenAlex, Europe PMC, arXiv, les pages d'éditeurs et, quand l'accès le permettait, le texte intégral. Chaque constat porte sa preuve et une étiquette de niveau de preuve (tableau « Limites »).
2. **Gravité.** Trois degrés : critique, majeur, mineur. Seul le rapport simulation-technique définit l'échelle (critique : compromet le critère de rigueur ou la validité d'un projet; majeur : bloque ou fausse une partie du travail; mineur : coût ou risque limité); les autres l'appliquent sans la définir [I].
3. **Mise en forme.** Chaque rapport est repris dans un fichier `constats-*.md` : constat, preuve, recommandation, puis la ligne **Disposition** (verdict, ce qui a été fait, adaptation ou écart, renvoi « Traité dans » vers l'endroit du programme où vit la réponse). La grille de verdicts est fermée : Accepté, Modifié, Rejeté, Hors portée, Non traité. Les définitions suivantes sont déduites de l'usage dans les fichiers, qui ne les énoncent pas [I] :

| Verdict | Sens |
|---|---|
| Accepté | recommandation appliquée dans son esprit, sans écart nommé |
| Modifié | appliquée avec adaptation ou en partie; la ligne dit laquelle (« Adaptation : », « Écart : » ou une phrase) |
| Rejeté | refusée avec raison; prévu par la grille, jamais utilisé |
| Hors portée | reconnue valide, exclue du périmètre |
| Non traité | aucune trace dans le programme |

4. **Recoupement.** Les valeurs corrigées viennent des dossiers de [`recherche/dossiers/`](../recherche/dossiers/), eux-mêmes revus par des passes de vérification indépendantes ([`recherche/verifications/`](../recherche/verifications/)), et de la [bibliographie](11-bibliographie.md), qui donne un statut à chaque référence.
5. **Contrôle.** `node outils/verifier-docs.ts` refuse toute disposition « à renseigner ». [`node outils/compter-dispositions.ts`](../outils/compter-dispositions.ts) recompte les verdicts, exige une disposition au vocabulaire fermé par entrée et compare le résultat à la ligne de contrôle de ce document.

Limites de la méthode : voir « Limites de l'audit ».

## Bilan par angle

| Angle | Crit. / Maj. / Min. | Ajouts | Verdict de l'auditeur (résumé) |
|---|---|---:|---|
| Bio-abeilles (BA) | 1 / 13 / 9 | 12 | Volet apicole juste dans l'ensemble, références existantes. Quatre affirmations fausses ou mal attribuées : attrition des danses comme oubli général, essaim scindé sans signal d'arrêt, rapprochement « non publié » sur la file d'attente, « seul projet sans résultat publié ». La question transversale ignore une littérature apicole qui y répond déjà, selon l'habitat. Parité inégale; piping, buzz-run, inhibition sociale et cognition individuelle manquent. |
| Bio-fourmis (BF) | 1 / 8 / 12 | 18 | Attributions presque toutes justes, mais une erreur critique (Wilson 1984 inversé) et huit erreurs majeures de modélisation : moulin, freinage, signal « scalaire », « la fourmi » unique, manipulations non appariées, fonction de choix, analogie TCP, thèse sur la reine. |
| Chorégraphie-agentique (CA) | 2 / 18 / 6 | 10 | L'intuition (stigmergie contre signal direct) tient. « Chorégraphie » désigne en informatique un plan global explicite; aucun orchestrateur témoin; « délégation » et « veto » sont des équivalences abusives; A2A, MCP, tableaux noirs LLM et bancs existants sont absents. |
| Lacunes (LA) | 3 / 15 / 8 | 13 | L'intelligence individuelle n'est traitée nulle part; la dichotomie canal/taxon est contredite par les sources; aucune métrique pour la question transversale; six familles de concepts manquent; parité biaisée. Propose cinq axes, trois projets ajoutés, P2 recentré. |
| Méthodologie (ME) | 7 / 19 / 11 | 14 | Une bonne intuition, pas un protocole : ni question testable, ni construits opérationnalisés, ni tolérance de reproduction. P7 confond « capacité » avec génération, réflexion et classifieurs; 24 cellules réelles; ni coût ni puissance. |
| Simulation-technique (ST) | 3 / 17 / 9 | 7 | Faisable en TypeScript et Canvas, mais « un seul moteur » contredit le critère de rigueur. Deux cibles fausses (Wilson 1984, Couzin et al. 2002). P7 non reproductible au sens fort : journal, rejeu et budget manquent. |
| Vulgarisation (VU) | 4 / 14 / 12 | 15 | Réduite à une phrase : ni public, ni objectif mesurable, ni évaluation, ni accessibilité. Niveaux inversés; le message central risque de renforcer les conceptions erronées qu'il combat. |
| **Total** | **21 / 104 / 67** | **89** | |

**Convergence.** Les erreurs les plus lourdes ont été relevées par plusieurs angles à la fois. D'après les renvois « point N » des dispositions [calculé] : la réduction du signal de la fourmi à un scalaire (point 10 des corrections du cadre) par cinq angles; l'analogie TCP (5), la loi de Little (6) et le freinage chez la fourmi (9) par quatre; notamment Wilson 1984 (1), le moulin (2), le signal d'arrêt (7) et le statut de P7 (12) par trois. Deux corrections reposent sur un seul angle : la convention de ρ (point 4, texte intégral de [Dorigo et al. 1996] lu par l'auditeur) et la distinction interblocage-scission (point 8, texte intégral de [Seeley et Visscher 2003] pour la scission, résumés pour les modèles). La convergence de plusieurs angles indépendants est un indice de confiance, pas une preuve [I].

## Répartition des dispositions

Recompte de la ligne **Disposition** de chacune des 281 entrées [calculé, `node outils/compter-dispositions.ts`].

| Fichier | Accepté | Modifié | Rejeté | Hors portée | Non traité | Total |
|---|---:|---:|---:|---:|---:|---:|
| constats-bio-abeilles | 10 | 23 | 0 | 2 | 0 | 35 |
| constats-bio-fourmis | 27 | 11 | 0 | 1 | 0 | 39 |
| constats-choregraphie-agentique | 21 | 15 | 0 | 0 | 0 | 36 |
| constats-lacunes | 12 | 25 | 0 | 2 | 0 | 39 |
| constats-methodologie | 30 | 21 | 0 | 0 | 0 | 51 |
| constats-simulation-technique | 26 | 10 | 0 | 0 | 0 | 36 |
| constats-vulgarisation | 35 | 10 | 0 | 0 | 0 | 45 |
| **Total** | **161** | **115** | **0** | **5** | **0** | **281** |

| Entrées | Accepté | Modifié | Rejeté | Hors portée | Non traité | Total |
|---|---:|---:|---:|---:|---:|---:|
| Constats | 106 | 83 | 0 | 3 | 0 | 192 |
| Ajouts | 55 | 32 | 0 | 2 | 0 | 89 |
| Constats critiques | 13 | 8 | 0 | 0 | 0 | 21 |
| Constats majeurs | 52 | 51 | 0 | 1 | 0 | 104 |
| Constats mineurs | 41 | 24 | 0 | 2 | 0 | 67 |

**Lecture.**
- Les 21 constats critiques sont tous traités (13 acceptés, 8 modifiés). Aucune entrée n'est non traitée : les trois qui l'étaient à la rédaction (un constat majeur, un mineur et un ajout) ont été traitées à la validation finale.
- Parmi les 115 « Modifié », le marqueur « Écart : » apparaît dans 35 lignes, « Adaptation : » dans 38, aucun dans 42. Les deux marqueurs ne sont pas employés de la même façon d'un fichier à l'autre : bio-abeilles marque tous ses « Modifié » par « Écart », lacunes et simulation-technique écrivent « Adaptation » même quand elle nomme un manque (par exemple une source non lue). Le décompte exact des entrées partielles n'est donc pas calculable à partir des fichiers; 40 (35 écarts et 5 hors portée, soit environ 14 %) est un plancher.
- Le zéro « Rejeté » reflète en partie la forme de la grille : les refus partiels vivent dans « Modifié » (rubrique « Hors portée et refus partiels »).

## Erreurs factuelles de la v3 corrigées

Seize corrections forment la liste fermée du cadre (rubrique « Corrections factuelles de la v3 »); elles s'imposent à tous les documents. Colonne « Constats » : renvois « point N » des dispositions [calculé].

| # | Erreur de la v3 et correction | Constats | Où la correction vit |
|---|---|---|---|
| 1 | Wilson 1984 inversé : après retrait des minors, ce sont les majors qui prennent le relais (répertoire ×1,4 à 4,5, activité ×15 à 30) [Wilson 1984] | BF-01, ME-20, ST-02 | [P3](../projets/P3-division-du-travail.md) : H3.1, T3.2 (calibration seulement, [Bonabeau et al. 1996] non lu); [06](06-metriques-et-typologie.md) |
| 2 | Moulin : modèle fourmi = [Couzin et Franks 2003]; [Couzin et al. 2002] est un modèle 3D de poissons et d'oiseaux sans phéromone, donc contrepoint | BF-02, BF-A11, ME-36, ST-10 | [P9](../projets/P9-mouvement-collectif-et-construction.md) : T9.1, T9.2, T9.9; moulin retiré de [P6](../projets/P6-defaillances-et-defenses.md) |
| 3 | Fonction de choix : n = 2; k ≈ 20 [à confirmer] dans [Deneubourg et al. 1990]; A et B sont des passages cumulés; la réponse individuelle est de type Weber et le sigmoïde un ajustement collectif [Perna et al. 2012] | BF-07, ST-07 | [P1](../projets/P1-recrutement-verrouillage.md) : E1.5, H1.8 |
| 4 | Ant System : ρ est la persistance (τ ← ρτ + Δτ) [Dorigo et al. 1996]; la forme en (1−ρ) est postérieure | ST-21 | [P2](../projets/P2-memoire-partagee-metaheuristiques.md) (convention de ρ); [05](05-spec-simulation.md); [S0](../projets/S0-socle.md) : T0.29 |
| 5 | Analogie TCP absente de [Prabhakar et al. 2012]; elle vient de [Carey 2012] et de [Gordon 2014]; statut Analogie | BF-08, CA-22, ST-22, VU-24 | [P4](../projets/P4-regulation-sans-vue-densemble.md) (relation Rel1) |
| 6 | Loi de Little déjà appliquée à ce contexte [Anderson et Ratnieks 1999a], [Seeley et Tovey 1994]; « deux files », non « deux lectures de la même file » | BA-04, BA-A06, BF-20, CA-21, ME-22 | P4 : T4.8, T4.9, T4.12 |
| 7 | Signal d'arrêt = inhibition ciblée, pas veto [Seeley et al. 2012] | BA-03, BA-10, BF-A01, CA-08 | [P5](../projets/P5-decision-par-quorum.md) : H5.1 à H5.4 |
| 8 | Interblocage ≠ scission : [Lindauer 1955] décrit une scission; l'interblocage, absence de décision, est un résultat de modèle [Pais et al. 2013] | BA-03 | P5 : E5.1, E5.4; P6 : H6.4, H6.5 |
| 9 | Freinage chez la fourmi : phéromone « no entry » [Robinson et al. 2005], inhibition par encombrement [Grüter et al. 2012] | BA-09, BF-03, BF-A01, CA-04, CA-08, LA-06 | P1 : T1.8, H1.3, E1.3; 06 |
| 10 | Signal fourmi « scalaire » : simplification de modèle; la danse n'est pas un publish/subscribe [Eugster et al. 2003] | BA-09, BF-04, CA-04, CA-05, LA-02, LA-23, VU-06 | 06 (« Codage du signal »); [P8](../projets/P8-individu-et-colonie.md) : T8.7, E8.3 |
| 11 | Blocage sur la branche longue non général : [Dussutour et al. 2009] (*Pheidole megacephala*); phéromone d'exploration [Reid et al. 2011] et demi-tours [Beckers et al. 1992] (*Linepithema humile*) | BF-06, LA-06 | P1 : H1.1, H1.6, E1.3; demi-tours non modélisés (hors portée) |
| 12 | « Seul projet sans résultat publié » faux : ancrages à reproduire d'abord ([Ashery et al. 2025], [Du et al. 2024] contre [Choi et al. 2025a], [Li et al. 2024], [Rahman et al. 2025], [Jimenez-Romero et al. 2025]) | BA-01, CA-18, CA-A06, LA-05 | [P7](../projets/P7-synthese-agentique.md) : T7.1 à T7.8 |
| 13 | « Agents LLM identiques oscillent » : hypothèse sans acquis, contre-preuves publiées | CA-11, LA-25, ME-21 | P3 : H3.9 (exploratoire); P7 : H7.9 (confirmatoire) |
| 14 | Oubli : trois formes (évaporation, abandon, attrition des danses); l'attrition n'est pas le mécanisme général | BA-02, CA-06, LA-19 | 06 (« Oubli, en trois formes »); [10](10-glossaire.md) |
| 15 | « Piste = chemin, danse = lieu » réfuté (ACO continu [Socha et Dorigo 2008]; ABC combinatoire) : devient la granularité de la mémoire partagée | LA-02, LA-19, ST-23 | P2 : H2.1 |
| 16 | `temperature` non réglable, effort et réflexion variables, retrait possible de Haiku 4.5 dès le 2026-10-15 [Anthropic 2026a] | CA-11, CA-19, LA-08, ST-03 | P7 (modèles, tarifs, paramètres); [04](04-protocole-reproduction.md); [08](08-science-ouverte-ethique.md) |

**Hors liste fermée.** Corrections plus fines, venues des mêmes audits :

| Correction | Constats | Où |
|---|---|---|
| [Jones et al. 2004] : « tend à être plus stable », non « oscille »; diversité génétique (patrilignes) | BA-05, ME-32, ST-09 | P3 : T3.11, T3.12 ([Graham et al. 2006]), H3.7 |
| [Seeley 1982] porte sur la logique spatiale du calendrier, non sur la séquence nourrice, bâtisseuse, butineuse | BA-15 | P3 : T3.9, T3.10 |
| [Karaboga 2005] est un rapport technique non évalué par les pairs, au protocole atypique; cible principale : [Karaboga et Basturk 2008] | BA-08, ME-31, ST-12 | P2 : T2.8, T2.10 |
| Oliver30 : 423,741 en distances réelles, 420 en entières [Dorigo et al. 1996] | ME-19, ST-11 | P2 : T2.1 |
| « Seeley et Visscher 2004 » désigne deux articles : [Seeley et Visscher 2004] (quorum) distinct de l'article de l'*Apidologie* | BA-16, CA-23 | [11](11-bibliographie.md); P5 : T5.9, T5.10 |
| Mimétisme (*Phengaris*, *Acherontia*) = usurpation d'identité, non injection de faux signal [Barbero et al. 2009], [Moritz et al. 1991] | BF-11, BA-13, CA-14 | P6 (taxonomie en trois couches) |
| « Délégation » réintroduit l'orchestration; le recrutement est une annonce et une auto-sélection | BA-12, CA-07, LA-23, VU-05 | 06 (ligne « Recrutement ») |
| [Goss et al. 1989] : espèce, rapport de longueurs, délai et effectifs absents de la v3 | BF-12, ME-16 | P1 : T1.1 à T1.3 |
| Espèce de [Pratt et al. 2002] nommée alors *Leptothorax albipennis*; première description du moulin par [Beebe 1921], non [Schneirla 1944] | BF-14, BF-17 | P5; P6 et P9 |
| L'interblocage n'est pas toujours pathologique : adaptatif si les options sont médiocres [Pais et al. 2013] | ME-35, BA-03 | P5 : T5.1, H5.1 |

## Recadrages et ajouts

**Recadrages conceptuels** (rubriques du [cadre](00-cadre.md) du même nom) :

| Recadrage | Pourquoi | Constats |
|---|---|---|
| Thèse reformulée : « la reine ne commande pas » devient un constat biologique borné, jamais une prescription d'architecture | La reine régule la reproduction par phéromones [Oystaeyen et al. 2014], [Amsalem et al. 2015]; le slogan installe le mythe qu'il veut défaire | BF-09, BA-20, CA-24, LA-14, VU-04 |
| « Chorégraphie » : typologie à trois axes (plan global, contrôle central à l'exécution, médium) et quatre régimes | En informatique, une chorégraphie est un plan global explicite [Montesi 2013], [OMG 2013]; une colonie n'en a pas | CA-01, CA-05 |
| Taxons nommés avec préréglage; le canal est une variable du modèle | « La fourmi » et « l'abeille » ne sont pas des mécanismes; la piste ne vaut pas pour tous les taxons | BF-05, LA-02, LA-16, CA-20 |
| R vecteur à cinq composantes, G à budget égal avec trois références | Les deux construits n'avaient ni définition ni référence | LA-03, ME-02, ME-03, CA-03 |

**Ajouts de projets, de volets et de mécanismes :**

| Ajout | Pourquoi | Où |
|---|---|---|
| **S0** Socle (typologie, glossaire, R et G, noyau, harnais) | R et G non définis; « un seul moteur » incompatible avec des modèles de natures différentes; ni harnais ni fiche de reproduction (LA-03, ST-01, ST-16, ST-A01, ST-A02, CA-01) | [S0](../projets/S0-socle.md); [05](05-spec-simulation.md); [06](06-metriques-et-typologie.md) |
| **V0** Vulgarisation et évaluation | Ni public, ni objectif mesurable, ni évaluation, ni accessibilité (VU-01 à VU-04, VU-A01) | [07](07-vulgarisation-evaluation.md) |
| **P8** Individu et colonie (phase 1) | L'intention vise deux niveaux; l'individuel est absent (LA-01, critique); le gain collectif dépend de la difficulté (CA-26) [Sasaki et al. 2013]; cognition de l'abeille (BA-11) | [P8](../projets/P8-individu-et-colonie.md) |
| **P9** Mouvement collectif et construction | Familles manquantes : transport, minorité informée, auto-assemblage, construction stigmergique (LA-10, LA-11); le moulin quitte P6 (BF-02, ST-10, ME-36) | [P9](../projets/P9-mouvement-collectif-et-construction.md) |
| Témoin orchestré dans chaque volet agentique, facteur « structure de la tâche » | Le programme se définit par opposition à l'orchestration sans en mesurer le résultat (CA-02, CA-A03) | QR3 du cadre; P7 (bras ORC) |
| Ancrages publiés de P7 | Reproduire d'abord, étendre ensuite (LA-05, CA-18, CA-A06) | P7 |
| P2 recentré en annexe à porte go/no-go | ACO et ABC non comparables et éloignés de la chorégraphie (LA-17, ME-18, ST-23, BF-18) | [P2](../projets/P2-memoire-partagee-metaheuristiques.md) |
| P6 « Défaillances et défenses » | Trois moteurs hétérogènes sans volet défense; usurpation d'identité distincte de l'injection (LA-18, CA-14, BF-11) | [P6](../projets/P6-defaillances-et-defenses.md) |
| Lignes ajoutées au tableau de correspondance : modulation globale, mémoire, découplage, vérification indépendante, identité, réversibilité | LA-14, LA-19, CA-04, CA-10, CA-17, CA-A07 | 06 |
| Mécanismes biologiques : signaux négatifs, information privée contre sociale, taille de colonie et hystérésis, bruit fonctionnel, chaîne décision-action, réserve de main-d'œuvre, quorum accordable | BF-A01 à BF-A04, BA-07, LA-13, LA-15, BA-A12, BF-15 | P1, P3, P5, P8 |
| Outillage de rigueur : hypothèses falsifiables, protocole de reproduction, préenregistrement, ODD, plan statistique, science ouverte, éthique, publication, jalons et risques | ME-01, ME-04, ME-09, ME-11 à ME-14, ME-27, ME-29, ME-A01 à ME-A14 | [03](03-plan-de-recherche.md); [04](04-protocole-reproduction.md); [08](08-science-ouverte-ethique.md); [09](09-feuille-de-route.md) |
| Phases 0 à 3 et dépendances révisées | Dépendances non déclarées dans la v3 (LA-24, LA-A13) | [02](02-architecture-programme.md); 09 |

## Hors portée et refus partiels

**Rejeté : aucune entrée.** Aucune recommandation n'a été refusée en bloc.

**Hors portée (3).** Reconnues valides, exclues du périmètre :

| Entrée | Contenu | État | Raison |
|---|---|---|---|
| BA-22, BA-A09 | Thermorégulation active : abeilles chauffantes, ventilation collective | P3 la déclare « Hors périmètre, par décision », sans phase attribuée; les cibles restent [Jones et al. 2004] et [Graham et al. 2006] | Aucune raison écrite au-delà de « extension possible, hors noyau »; le noyau thermorégulation est déjà couvert [I] |
| BF-A05 | Demi-tours et ouvrières informées (*Linepithema humile*) | [Beckers et al. 1992] cité, non lu, non modélisé; omission à signaler dans V1 et dans la note | Source non lue [I] |

**Refus partiels** (inclus dans « Modifié »; la raison est celle de la ligne Disposition, sauf mention) :

| Constats | Recommandation de l'auditeur | Ce que le programme a fait | Raison |
|---|---|---|---|
| LA-05, ME-07, ST-03, CA-19 | Échelle de capacité (règle, Haiku, Sonnet, Opus) | Facteur catégoriel « modèle » (génération, raisonnement, tokeniseur, classifieurs); une seule famille de modèles | La « capacité » varie plusieurs choses à la fois |
| LA-23 | « Abonnement » pour la danse | Écarté | La danse est un échantillonnage aléatoire local, non un publish/subscribe |
| LA-11, LA-A04 (et LA-10) | Projet distinct « Construire sans plan », séparé du mouvement collectif | Fusionné avec le mouvement collectif dans P9, en volet de phase 3; Nazzi 2016 non repris | Non écrite |
| LA-17 | Recentrage complet de P2 | Annexe à porte go/no-go; noyau ACO/ABC conservé | Non écrite |
| LA-21 | Cadrage du superorganisme | Entrées de glossaire seulement | Pas de chapitre théorique ajouté au socle |
| CA-18, CA-A06 | SwarmBench et Kim et al. comme ancrages de P7; AgentsNet | SwarmBench en P9, Kim et al. en P8, AgentsNet non retenu; aucun ne conditionne P7 | Non écrite |
| CA-08, CA-11 | Backoff exponentiel avec gigue, NACK | Absents (CA-08); gigue non retenue comme référence d'ingénierie (CA-11) | Non écrite |
| ME-19, ME-32, ST-12 | Critères de reproduction proposés (9 essais sur 10 à l'optimum; spectre de la température; Sphère 5D et Rastrigin 10D du TR06) | Remplacés par des critères du programme (T2.1, T2.2, T2.8, T2.10; écart-type de la température) | Le pilote ne satisfait pas le premier critère (ME-19); non écrite pour les deux autres |
| ST-27, VU-14, VU-A04 | `sample` d'artifact et bascule LLM à l'exécution | Interdits : les pages rejouent des journaux, aucun appel d'API | Plus strict que la recommandation |
| ME-08 | Front de Pareto et sensibilité globale (Morris, Sobol') préenregistrés | Pareto limité à coût-précision (P7, P8) et au visuel de P5; sensibilité globale non exigée au préenregistrement (OFAT puis Sobol' prévus) | Non écrite |
| VU-02, VU-A11 | Taille d'échantillon de l'étude pédagogique de l'audit | Recalculée dans [07](07-vulgarisation-evaluation.md) | Critère primaire ANCOVA, gain de Hake secondaire |
| ST-03, ST-A06 | Collecter Haiku 4.5 en premier | Conditionnel : la chaîne amont ne tient pas avant le retrait possible; décision D18 ouverte (voir « Restes ouverts ») | Calendrier |
| BF-18 | Mise en garde de Bonabeau et al. 2000 sur l'évaporation au-delà de la plausibilité biologique | Non reprise; P2 déclare le dépôt de fin de tour non biologique | Non écrite |

## Restes ouverts

**Non traités (0).** La recherche textuelle dans `docs/`, `projets/` et le README [lu] avait confirmé trois absences à la rédaction. Elles ont été traitées à la validation finale :

| Entrée | Contenu | État à la rédaction | Traitement à la validation finale |
|---|---|---|---|
| LA-12 (majeur) | Trophallaxie, absente chez les deux espèces | Seule mention : la dernière ligne de la correspondance v3-v4 de [02](02-architecture-programme.md), qui renvoie au présent document pour confirmation. P4 se limite au débit de sortie, à la file d'appariement et à la trémulation. LA-A07 (réseaux trophallactiques) et BA-06, BA-A03 (éthyl oléate transmis par trophallaxie) touchent la même lacune | Hors portée : déclarée dans la rubrique « Hors portée » de [P4](../projets/P4-regulation-sans-vue-densemble.md), faute de modèle de référence lu; [Greenwald et al. 2015] ajoutée à la bibliographie; extension possible après la phase 2 |
| LA-20 (mineur) | Décision d'essaimer (reproduction de la colonie) | Aucun document; la rubrique « Hors portée » de [P5](../projets/P5-decision-par-quorum.md) ne la liste pas | Hors portée : déclarée dans la rubrique « Hors portée » de P5 |
| BF-A17 (ajout) | Deneubourg et Goss 1989, référence classique de la décision collective par piste | Absente de la bibliographie et des fiches; la fonction de choix ne passe que par [Deneubourg et al. 1990] via [Goss et al. 1989] | Accepté : [Deneubourg et Goss 1989] ajoutée à la bibliographie (métadonnées vérifiées) et citée au positionnement de [P1](../projets/P1-recrutement-verrouillage.md); texte encore à lire |

**Partiels, par cause** (regroupement [I], non un décompte) :

| Cause | Exemples | Conséquence |
|---|---|---|
| Source non lue ou cible bloquée | ST-02 (T3.2 calibre θ sans reproduire [Bonabeau et al. 1996]); ST-07 (règle de [Perna et al. 2012] absente du modèle spatial); LA-07 et LA-A05 ([Beekman et al. 2001] non reproduit en P1); BA-05 ([Graham et al. 2006], T3.11 et T3.12 non figées); BA-08 ([Karaboga et Basturk 2007] non lu, Nakrani et Tovey 2004 bloqué par la porte G3); BF-A16 (raids sans équation lue); LA-A02 ([Grüter et al. 2008] en résumé, [Dong et al. 2023] sans cible chiffrée); BA-A11 ([Couzin et al. 2005] à lire); ME-13 (revue systématique protocolée, non exécutée) | Reproductions « go partiel » ou no-go jusqu'à la lecture |
| Références sans entrée de bibliographie | BA-21 (dix-huit références du tableau de l'audit, toujours absentes [lu], dont Nakrani et Tovey 2004); BA-09; CA-09 et CA-A09 (Feinerman et Korman 2013, Navlakha et Bar-Joseph 2015); CA-16; LA-04 (Malone et Crowston 1994) | Aucune étiquette citable. Fiche P3, rubrique R14 : [Leoncini et al. 2004], [Khoury et al. 2011] et [Perry et al. 2015] y figurent comme absentes, mais les « Compléments de la validation finale » de la [bibliographie](11-bibliographie.md) les ajoutent [lu]; R14 a été mis à jour à la validation finale |
| Mécanismes non modélisés | Trophallaxie (LA-12); éthyl oléate (LA-15, LA-A06); stridulation (LA-13, LA-A08); shaking (LA-13); demi-tours et phéromone d'exploration (BF-06, BF-A04); signal d'arrêt au butinage (BA-10); récoltes d'eau et de pollen (BA-A06); maturation précoce (BA-13, BA-A04); alignement des intérêts (CA-13) | Couverture inégale des familles de concepts signalées par LA |
| Parité asymétrique déclarée, non corrigée | LA-16 (P9 et P6 fortement asymétriques; 2D et 3D non paramétrés); BA-08 (aucun résultat biologique pour ACO et ABC); BF-16 (pas d'inhibition croisée connue chez *Temnothorax*); BA-A07 (aucun croisement abeille et architecture); BA-A12 | Écart au principe de parité, déclaré dans les fiches |
| Validation externe non obtenue | VU-05 et VU-A07 (myrmécologue, apidologue, praticien); VU-20 et VU-A13 (GDT de l'OQLF non consulté) | La carte comparative et la terminologie restent non validées |
| Questions sans hypothèse falsifiable | QR2d et réactivité de QR4a (ME-01; IN19 du [plan de recherche](03-plan-de-recherche.md)) | Résultats descriptifs tant que le chercheur ne tranche pas |
| Répétitions sous le plancher | ME-09 (plusieurs fiches; IN6 du plan de recherche) | Exception à déclarer au registre avant le préenregistrement |
| Décisions à échéance | Haiku 4.5 : retrait possible dès le 2026-10-15 [Anthropic 2026a], soit 14 jours après la date de ce document; la chaîne amont de P7 ne tient pas avant (ST-03, ST-A06, ME-25; décision D18 de [02](02-architecture-programme.md), porte GF1 de [09](09-feuille-de-route.md)); perte du point historique déclarée par défaut. Ancre à poids ouverts non tranchée (ME-25, CA-19) | Décision écrite du chercheur avant la date de retrait |

## Limites de l'audit

**Accès et quotas.** Les sept rapports signalent l'épuisement du budget de recherche web de la session et du quota de l'outil de recherche scientifique en cours d'audit. Des éditeurs ont refusé l'accès (Springer, Science, PNAS, PMC, PubMed, ACM DL, ScienceDirect, ACS, Elsevier, Royal Society, ResearchGate; un certificat refusé pour l'EPTC 2). Aucun contrôle d'accès n'a été contourné (rapport lacunes). Les vérifications ont continué par Crossref, OpenAlex, Europe PMC, arXiv et les PDF en accès libre.

**Sources non lues.** Texte intégral et lacunes, par rapport :

| Rapport | Lu en texte intégral | Non lu ou accès refusé |
|---|---|---|
| bio-abeilles | [Seeley et Visscher 2003], [Seeley et al. 1996], [Karaboga 2005]; une trentaine de résumés | Livre de von Frisch; texte intégral de [Seeley et al. 2012]; Gardner 2008, Dornhaus et Chittka 2004, Ellis 2002 (métadonnées seulement) |
| bio-fourmis | Résumés, sources secondaires et PDF en accès libre | [Goss et al. 1989], [Deneubourg et al. 1990], [Wilson 1984], [Bonabeau et al. 1996], [Pratt et al. 2002], [Pratt et al. 2005], [Schneirla 1944] |
| chorégraphie-agentique | Pages d'éditeurs, résumés (arXiv, Europe PMC), texte intégral selon les cas; l'outil de lecture passe par un modèle de synthèse : citations fidèles au sens, non garanties au mot près | PubMed, Springer, ACM DL, presse de Stanford refusés |
| lacunes | Section résultats de [Schürch et Ratnieks 2015] seulement | Tout le reste : métadonnées, résumés et sources secondaires |
| méthodologie | Textes extraits par d'autres auditeurs (réutilisés) | [Goss et al. 1989], [Wilensky et Rand 2007] |
| simulation-technique | [Dorigo et al. 1996], [Karaboga 2005], [Prabhakar et al. 2012], [Pais et al. 2013] | Pages derrière Springer, ACS, Science, ScienceDirect |
| vulgarisation | Pages primaires consultées; calcul de daltonisme par script | [Slessor et al. 1988], [Okabe et Ito 2002], *Debunking Handbook*, EPTC 2 |

**Niveau de preuve.** Chaque auditeur a sa légende; les échelles ne sont pas comparables (« M » désigne la mémoire dans bio-fourmis et les métadonnées dans lacunes et méthodologie). Occurrences des étiquettes dans chaque rapport, légende comprise, [calculé par motif, indicateur grossier] :

| Rapport | Occurrences |
|---|---|
| bio-abeilles | résumé 31, lu 11, inféré 10, métadonnées 7 |
| bio-fourmis | mémoire 14, inféré 13, métadonnées 13, lu 10, secondaire 7 |
| chorégraphie-agentique | lu 156, métadonnées 16, inféré 12, secondaire 11, non vérifié 2 |
| lacunes | métadonnées 95, secondaire 75, résumé 33, inféré 15, texte intégral 4 |
| méthodologie | métadonnées 48, lu 30, secondaire 26, inféré 22, non vérifiable 6 |
| simulation-technique | lu 29, inféré 18, non vérifié 4, résumé 1 |
| vulgarisation | lu 35, recherche 16, inféré 14, calculé 3, non vérifié 1 |

**Constats à confiance moindre** [I] : ceux de **lacunes** (appuyés surtout sur des métadonnées et des sources secondaires), de **bio-fourmis** quand la preuve est « mémoire » (notamment k ≈ 20 [à confirmer]) et de **méthodologie** quand la preuve se limite aux métadonnées. Des dossiers de recherche ont relu certains de ces points (par exemple [Goss et al. 1989], extrait du texte intégral d'après ME-16); les autres restent à lire.

**Valeurs à confirmer.** Le cadre garde ouverts k ([Deneubourg et al. 1990]), les paramètres de [Bonabeau et al. 1996], de [Camazine et Sneyd 1991] et de [Pratt et al. 2005]. Les identifiants et tarifs des modèles LLM, les versions A2A et MCP se vérifient de nouveau avant toute exécution de P7. La [bibliographie](11-bibliographie.md) compte 51 références « non vérifiées » et 13 compléments dont seules les métadonnées sont confirmées : aucune valeur n'en est tirée sans [à confirmer].

**Limites de cette synthèse.**
- Les lignes Disposition sont la déclaration des rédacteurs du programme; je n'ai constaté aucune revue par un tiers [I]. J'ai vérifié par recherche textuelle les six entrées hors portée ou non traitées à la rédaction (les trois non traitées l'ont été ensuite, à la validation finale); les 275 autres reposent sur la ligne et son renvoi « Traité dans ».
- L'indépendance des angles porte sur l'étendue et les conclusions, non sur les sources : méthodologie a réutilisé des textes extraits par d'autres auditeurs.
- Les audits datent du 2026-10-01, comme le cadre; ils ne couvrent pas les évolutions ultérieures (versions A2A et MCP, retraits de modèles).

## Index des fichiers

Depuis `docs/` : proposition auditée [`annexes/proposition-v3.md`](annexes/proposition-v3.md); contrôle [`../outils/compter-dispositions.ts`](../outils/compter-dispositions.ts).

| Angle | Rapport complet | Constats et dispositions | Entrées |
|---|---|---|---:|
| Bio-abeilles | [`bio-abeilles.md`](annexes/audit/bio-abeilles.md) | [`constats-bio-abeilles.md`](annexes/audit/constats-bio-abeilles.md) | 35 (23 + 12) |
| Bio-fourmis | [`bio-fourmis.md`](annexes/audit/bio-fourmis.md) | [`constats-bio-fourmis.md`](annexes/audit/constats-bio-fourmis.md) | 39 (21 + 18) |
| Chorégraphie-agentique | [`choregraphie-agentique.md`](annexes/audit/choregraphie-agentique.md) | [`constats-choregraphie-agentique.md`](annexes/audit/constats-choregraphie-agentique.md) | 36 (26 + 10) |
| Lacunes | [`lacunes.md`](annexes/audit/lacunes.md) | [`constats-lacunes.md`](annexes/audit/constats-lacunes.md) | 39 (26 + 13) |
| Méthodologie | [`methodologie.md`](annexes/audit/methodologie.md) | [`constats-methodologie.md`](annexes/audit/constats-methodologie.md) | 51 (37 + 14) |
| Simulation-technique | [`simulation-technique.md`](annexes/audit/simulation-technique.md) | [`constats-simulation-technique.md`](annexes/audit/constats-simulation-technique.md) | 36 (29 + 7) |
| Vulgarisation | [`vulgarisation.md`](annexes/audit/vulgarisation.md) | [`constats-vulgarisation.md`](annexes/audit/constats-vulgarisation.md) | 45 (30 + 15) |

**Relire une disposition.** Ouvrir le fichier constats, suivre le renvoi « Traité dans », vérifier que l'identifiant cité (H, T, E) existe dans la fiche (`node outils/verifier-docs.ts`), puis relancer `node outils/compter-dispositions.ts` si une disposition change : la ligne de contrôle de ce document doit alors être mise à jour.

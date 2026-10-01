# Audit de la proposition v3 — angle simulation-technique

Date : 2026-10-01. Objet : `proposition-v3.md` (fourmilière et ruche comme chorégraphies sans chorégraphe). Angle : faisabilité et fidélité des simulations, moteur, déterminisme, performance navigateur, tests, export, rejouabilité, projet 7 (agents LLM).

Régime appliqué : production (livrable sur lequel le chercheur va agir).

Convention de preuve : **[lu]** = vérifié dans la source citée (URL en fin de document); **[inféré]** = raisonnement de l'auditeur, non vérifié dans une source; **[non vérifié]** = affirmation plausible que je n'ai pas pu relire (accès refusé ou budget de recherche épuisé).

---

## 1. Verdict

La v3 est faisable techniquement en TypeScript + Canvas, mais sa phrase d'architecture (« un seul moteur avec deux espèces interchangeables ») est incompatible avec son propre critère de rigueur. Les résultats publiés qu'elle veut reproduire reposent sur des modèles de nature différente : système d'EDO (Camazine et Sneyd 1991), Monte Carlo de choix binaires (Goss/Deneubourg), modèle stochastique à temps discret (Prabhakar et al. 2012), champ moyen avec bruit (Seeley et al. 2012; Pais et al. 2013), modèle à agents (Pratt et al. 2005), métaheuristiques (Dorigo et al. 1996; Karaboga 2005). Il faut un **noyau commun mince** (graine, horloge, enregistreur, scénario, tests) et, par article, un **modèle de référence fidèle**; le modèle spatial animé commun devient une extension validée contre la référence (docking). Deux critères d'acceptation sont faux ou introuvables tels qu'écrits : Wilson 1984 dit l'inverse de la v3, et Couzin et al. 2002 n'est pas un modèle de fourmis. Le projet 7 n'est pas reproductible au sens fort : les modèles 5.5 refusent `temperature`, Haiku 4.5 approche de sa date de retrait possible, et l'axe « capacité » confond génération, tokenizer et réflexion. Il lui faut un journal complet avec rejeu par cassette, un budget chiffré et un plan d'expérience à répétitions.

---

## 2. Méthode et limites

- Lecture intégrale de la v3.
- Sources primaires consultées : Dorigo, Maniezzo et Colorni 1996 (texte intégral), Karaboga 2005 TR06 (texte intégral), Prabhakar et al. 2012 (texte intégral), Pais et al. 2013 (texte intégral), Perna et al. 2012 (résumé), plus les résumés de Camazine et Sneyd 1991, Seeley et al. 1991, Bonabeau et al. 1996, Theraulaz et al. 1998, Jones et al. 2004, Graham et al. 2006, Myerscough et Oldroyd 2004, Couzin et al. 2002, Huberman et Glance 1993, Franks et al. 2003 et Wilson 1984 (résumé éditeur via recherche). Documentation primaire : Node.js, MDN, ECMAScript via MDN, esbuild, TypeScript 5.8, xoshiro (Vigna), documentation Claude (tarifs, Batch, retraits), définitions de types des capacités d'artifact.
- Limites : le budget WebSearch de la session et le quota Consensus se sont épuisés en cours d'audit; certaines sources sont restées derrière un paywall (Springer, ACS, Science, ScienceDirect). Les points concernés sont marqués [non vérifié].

---

## 3. Constats

Gravités : **critique** = compromet le critère de rigueur ou la validité d'un projet; **majeur** = bloque ou fausse une partie du travail si on ne le traite pas; **mineur** = coût ou risque limité.

### Tableau récapitulatif

| # | Gravité | Section v3 | Constat |
|---|---|---|---|
| C1 | critique | Technique | « Un seul moteur » incompatible avec des modèles de référence hétérogènes |
| C2 | critique | Projet 3 | Wilson 1984 inversé : ce sont les majors qui prennent la relève |
| C3 | critique | Projet 7 | Axe « capacité » confondu, pas de déterminisme, modèles qui se retirent |
| M1 | majeur | Technique | Déterminisme : `Math.random` sans graine, fonctions `Math` dépendantes du moteur |
| M2 | majeur | Technique | Pas de temps, unités, ordre de mise à jour non spécifiés |
| M3 | majeur | Projets 1, 6 | Diffusion/évaporation : stabilité et discrétisation non traitées |
| M4 | majeur | Projet 1 | Fonction de Deneubourg (niveau colonie) employée comme règle individuelle |
| M5 | majeur | Projets 5, 6 | Interblocage : résultat de champ moyen, bruit de taille finie non couvert |
| M6 | majeur | Projet 3 | Jones et al. 2004 est empirique; les modèles à reproduire sont ailleurs |
| M7 | majeur | Projet 6 | Couzin et al. 2002 : modèle 3D poissons/oiseaux sans phéromone; aucune cible pour le moulin ni le mimétisme |
| M8 | majeur | Projet 2 | ACO/Oliver30 : coordonnées, protocole et convention de ρ absents |
| M9 | majeur | Projet 2 | ABC : protocole TR06 atypique (Rastrigin 10D sur ±600); visuel 2D ≠ protocole publié |
| M10 | majeur | Technique | Chaîne TS navigateur absente (Node exécute le .ts, pas le navigateur) |
| M11 | majeur | Technique | Architecture de performance et contraintes d'artifact non vérifiées |
| M12 | majeur | Format | Export et rejouabilité non spécifiés; dans un artifact, l'export exige une capacité |
| M13 | majeur | Critère de rigueur | Pas de harnais de tests de reproduction headless ni de critères d'acceptation chiffrés |
| M14 | majeur | Projet 4 | File d'attente des abeilles : besoin d'un modèle à événements discrets; Little exige la stationnarité; données de Prabhakar à obtenir |
| M15 | majeur | Projet 7 | Aucun budget; coût dominé par la sortie et la réflexion |
| M16 | majeur | Projet 7 | Batch API incompatible avec une simulation pas à pas en temps raisonnable |
| M17 | majeur | Projet 7 | Journalisation et rejeu non spécifiés |
| m1 | mineur | Projet 2 | Convention de ρ (persistance en 1996, évaporation dans la v3) |
| m2 | mineur | Projet 4 | « Analogue à TCP » absent de Prabhakar et al. 2012 |
| m3 | mineur | Projet 2 | Contraste « combinatoire vs continu » : artefact du choix d'algorithmes |
| m4 | mineur | Technique | Précision Float32 et sous-normaux dans les champs |
| m5 | mineur | Format | Écran partagé : échelles de temps et d'espace incompatibles entre espèces |
| m6 | mineur | Projet 7 | Fallback de modèle et refus : contaminent les bras expérimentaux |
| m7 | mineur | Format | La capacité `sample` d'un artifact ne fixe pas le modèle |
| m8 | mineur | Format | Taille d'artifact (16 Mo) et données précalculées |
| m9 | mineur | Projet 7 | « Règle simple » et LLM doivent partager la même interface de politique |

### C1 — critique — « Un seul moteur » vs modèles de référence hétérogènes (Technique)

**Problème.** La v3 prévoit « un seul moteur avec deux espèces interchangeables (le contraste vient du mécanisme, pas du code) », et exige pourtant que « chaque simulation reproduise un résultat publié ». Or les résultats cibles proviennent de modèles de types différents :

- Camazine et Sneyd 1991 : « a system of non-linear differential equations » **[lu, résumé]**. Seeley, Camazine et Sneyd 1991 : appuyé sur « a computer simulation of nectar-source selection » **[lu, résumé]**.
- Dorigo et al. 1996 : algorithme itératif par cycles, sans temps physique **[lu]**.
- Prabhakar et al. 2012 : « The model operates in discrete time », départs ~ Poisson(α_n) **[lu]**.
- Seeley et al. 2012 et Pais et al. 2013 : modèle analytique en champ moyen, auquel s'ajoute du bruit sensoriel (processus de Wiener) **[lu pour Pais 2013; Seeley 2012 : résumé via recherche]**.
- Pratt et al. 2005 : modèle à agents **[lu, titre et notice]**.
- Karaboga 2005 : métaheuristique **[lu]**.

Un moteur spatial unique ne peut reproduire fidèlement une EDO ou un Monte Carlo de choix binaires : il produirait un *autre* modèle, et l'écart avec la figure publiée ne dirait plus rien de la fidélité. S'y ajoute un problème d'échelle **[inféré]** : un pont double tient sur une table, alors que les abeilles butinent à des kilomètres et dansent sur quelques décimètres de rayon. Une grille spatiale commune aux deux espèces n'a donc pas de sens physique.

**Recommandation.** Trois couches :
1. **Noyau commun** (quelques centaines de lignes) : PRNG à graine, horloge à pas fixe, ordonnanceur, enregistreur de séries temporelles, format de scénario, intégrateur RK4, algorithme SSA de Gillespie, champ sur grille. Ce noyau est réellement partagé par les deux espèces.
2. **Modèle de référence par article** : la forme publiée, sans plus (EDO, Monte Carlo, modèle à agents, métaheuristique, simulation à événements discrets), validée contre la figure ou le tableau publié.
3. **Modèle « chorégraphique » commun** : le modèle spatial animé et comparable fourmi/abeille, avec le **canal** (champ stigmergique vs piste de danse) comme seul composant interchangeable. On le valide par docking contre la couche 2 (mêmes grandeurs observées, mêmes tendances).

Le contraste « vient du mécanisme » au niveau 3; la fidélité se démontre au niveau 2.

### C2 — critique — Wilson 1984 inversé (Projet 3)

**Problème.** La v3 écrit : « À reproduire : les petites ouvrières prennent la relève ». Wilson 1984 rapporte l'inverse : quand le ratio minors:majors est abaissé, la taille du répertoire des majors augmente de 1,4 à 4,5 fois et leur taux d'activité de 15 à 30 fois; les majors rétablissent 75 % ou plus de l'activité des minors retirées **[lu, résumé éditeur rapporté par la recherche]**. Le résumé de Bonabeau et al. 1996 confirme que le modèle à seuils fixes « can account for some observations on ant species of Pheidole (Wilson 1984) » **[lu]**. Un test d'acceptation écrit comme dans la v3 validerait un modèle faux.

**Recommandation.** Corriger la cible : retirer les minors → les majors (seuils élevés) s'activent quand le stimulus monte. Reproduire la figure correspondante de Bonabeau et al. 1996 avec leurs paramètres. Relire le texte intégral de Bonabeau et al. 1996 avant de coder : seul le résumé est vérifié ici.

### C3 — critique — Projet 7 : un axe « capacité » confondu et non reproductible

**Problème** (documentation Claude, consultée le 2026-10-01) :
- Les modèles disponibles ne forment pas une échelle propre. Haiku 4.5 (`claude-haiku-4-5-20251001`) date de 2025, alors que Sonnet 5.5 et Opus 5.5 datent de 2026. Les modèles 4.7 et suivants utilisent un tokenizer qui produit environ 30 % de jetons de plus pour un même texte **[lu, page Pricing]**. Le modèle le plus capable, Claude Fable 5.1, est absent de la v3 **[lu]**.
- `temperature`, `top_p` et `top_k` sont dépréciés : une valeur non par défaut renvoie une erreur 400 sur Claude 4.7 et les modèles suivants **[lu, page Model deprecations]**. On ne peut donc pas contrôler l'échantillonnage de façon uniforme : Haiku 4.5 l'accepte, Sonnet 5.5 et Opus 5.5 non. Même à température 0, le déterminisme n'est pas garanti **[inféré; non vérifié dans la documentation]**.
- La réflexion n'est pas un réglage neutre. Sur Opus 5.5, elle ne peut pas être désactivée, et l'effort vaut `medium` par défaut; sur Sonnet 5.5, il vaut `high` par défaut, avec des niveaux recalibrés **[lu, référence claude-api]**. Haiku 4.5 ne réfléchit pas sans `budget_tokens`.
- Retraits : la date de retrait provisoire de Haiku 4.5 est « Not sooner than October 15, 2026 », soit dans deux semaines. Anthropic donne au moins 60 jours de préavis. La page reconnaît elle-même que « Researchers lose access to models for ongoing and comparative studies » **[lu]**.

**Recommandation.**
- Redéfinir l'axe : (a) une échelle de *niveaux* dans une même génération (Sonnet 5.5, Opus 5.5, Fable 5.1), où l'effort est fixé et consigné par bras; (b) Haiku 4.5 seulement comme point historique, à collecter **en premier**.
- Consigner `response.model`, l'effort, le mode de réflexion et le tokenizer pour chaque appel.
- Mesurer la variance par répétitions (au moins 5 à 10 par cellule, à calibrer sur un pilote) plutôt que viser un déterminisme impossible.
- Le rejeu se fait par cassette (voir M17) : l'expérience reste rejouable même après le retrait d'un modèle, mais elle n'est plus *re-exécutable*. Il faut le dire dans la note de recherche.

### M1 — majeur — Déterminisme (Technique)

**Problème.** La v3 ne dit rien de la graine. MDN : pour `Math.random`, « The implementation selects the initial seed […]; it cannot be chosen or reset by the user » **[lu]**. MDN, objet `Math` : « Many Math functions have a precision that's implementation-dependent […] Even the same JavaScript engine on a different OS or architecture can give different results! » **[lu]**. Une trace calculée sous Node (V8) peut donc diverger dans Firefox ou Safari dès qu'un `Math.exp` ou un `Math.pow` décide d'un branchement.

**Recommandation.**
- PRNG à graine : xoshiro128** (opérations 32 bits, `Math.imul`), initialisé par SplitMix64. Vigna recommande d'initialiser avec « un générateur radicalement différent » et fournit des fonctions de saut pour des flux indépendants **[lu]**. Prévoir un flux par sous-système (environnement, chaque espèce, politique LLM) pour qu'un ajout ne décale pas tous les tirages.
- Éviter `Math.pow` à exposant entier dans les chemins critiques : n = 2 dans la fonction de Deneubourg s'écrit `x*x`; avec α = 1 et β = 5 dans Ant System, on multiplie. Les constantes dérivées (facteur de décroissance par pas, etc.) se calculent une fois sous Node et s'écrivent **comme littéraux numériques dans le fichier de scénario**. Le navigateur ne recalcule alors aucun `Math.exp` critique [inféré].
- Bannir `Date.now`, `performance.now` et l'ordre d'itération des objets à clés numériques de la logique de simulation [inféré].
- Distinguer deux niveaux de test (voir M13) : traces dorées (*golden traces*), valides pour un moteur et une version; critères statistiques, valides partout.

### M2 — majeur — Pas de temps, unités, ordre de mise à jour (Technique)

**Problème.** Ni pas de temps, ni unités, ni ordre de mise à jour. Trois risques :
1. Une évaporation écrite « par pas » change de sens quand on change dt [inféré].
2. MDN : `requestAnimationFrame` suit la fréquence de l'écran (60, 120, 144 Hz) et met en garde : sans le temps écoulé, « the animation will run faster on high refresh-rate screens »; les appels sont « paused […] in background tabs or hidden `<iframe>`s » **[lu]**. Une simulation cadencée par le rendu n'est ni reproductible ni portable.
3. Huberman et Glance 1993 montrent que les résultats d'une simulation spatiale « differ greatly when time is discrete as opposed to continuous » **[lu, résumé]**. L'ordre de mise à jour (synchrone ou séquentiel aléatoire) est un paramètre du modèle, pas un détail d'implémentation.

**Recommandation.**
- Pas fixe découplé du rendu, avec un accumulateur (Fiedler, « Fix Your Timestep! » **[lu]**); rendu interpolé ou simplement le dernier état.
- Paramètres en unités physiques (s, mm, demi-vie), convertis par pas au chargement du scénario : `decay = exp(-ln2 * dt / t_half)`, calculé une seule fois (voir M1).
- Ordre de mise à jour déclaré dans le scénario : `synchrone` (double tampon) ou `sequentiel-aleatoire` (permutation tirée du PRNG à chaque pas). Tester la sensibilité du résultat à ce choix au moins une fois par modèle à agents.
- Les expériences guidées (niveau 3) ne doivent pas dépendre de `requestAnimationFrame` : calcul par tranches dans un worker ou résultats précalculés (voir M11).

### M3 — majeur — Diffusion et évaporation sur grille (Projets 1, 6)

**Problème.** « Diffusion/évaporation » n'apparaît que comme formule ACO. Pour un champ de phéromone en 2D, le schéma explicite FTCS n'est stable que si r = DΔt/Δx² ≤ 1/4 (Δx = Δy) **[lu, Wikipedia, source secondaire]**. Autres risques **[inféré]** : un dépôt au plus proche voisin depuis des positions continues produit une anisotropie liée à la grille, et une évaporation multiplicative en Float32 fait apparaître des valeurs sous-normales (voir m4).

**Recommandation.** D'abord se demander si la diffusion est nécessaire : le modèle de référence de Goss/Deneubourg est un Monte Carlo sur deux branches, sans grille. Pour le modèle spatial :
- évaporation exacte (facteur constant par pas, M2);
- diffusion seulement si le modèle l'exige, avec vérification de r ≤ 1/4 au chargement du scénario (erreur explicite sinon);
- dépôt bilinéaire et lecture des capteurs par interpolation bilinéaire;
- un test de convergence en grille (Δx et Δx/2 donnent la même statistique colonie à la tolérance près).

### M4 — majeur — Fonction de Deneubourg : niveau colonie vs règle individuelle (Projet 1)

**Problème.** La v3 donne P_A = (k+A)^n / ((k+A)^n + (k+B)^n) comme mécanisme. Perna et al. 2012 ont mesuré la réponse individuelle de *Linepithema humile* : l'angle de virage suit une loi de Weber (différence des concentrations gauche/droite divisée par leur somme). Ils notent que cette réponse proportionnelle est « in apparent contradiction with the well-established non-linear choice function » de Deneubourg et al. 1990 **[lu, résumé]**. Coder la fonction de Deneubourg comme règle de chaque fourmi dans un modèle spatial mélange les niveaux.

**Recommandation.**
- Modèle de référence (couche 2) : Monte Carlo de la fonction de choix, comme dans les articles d'origine. Les valeurs k = 20 et n = 2 reviennent souvent dans la littérature, mais je n'ai pas pu les relire dans Goss et al. 1989 ni dans Deneubourg et al. 1990 **[non vérifié]**.
- Modèle spatial (couche 3) : règle de virage de Perna et al. 2012; la non-linéarité au niveau colonie devient une **sortie** à comparer, pas une entrée.
- Vérifier dans Goss et al. 1989 le protocole exact de la branche courte ajoutée tard (délai, durée d'observation, nombre de répétitions) avant d'écrire le test **[non vérifié : texte intégral non obtenu]**.

### M5 — majeur — Interblocage : résultat de champ moyen (Projets 5, 6)

**Problème.** « L'inhibition croisée débloque une égalité » est un résultat du modèle analytique. Pais et al. 2013 l'étudient en champ moyen : sans inhibition croisée, deux options égales gardent un équilibre symétrique stable (interblocage); au-delà d'un seuil de σ, une bifurcation en fourche crée deux attracteurs. Les auteurs précisent que le bruit modélisé est sensoriel et que le bruit de population finie exigerait l'équation maîtresse, « beyond the scope of the present paper » **[lu]**. Un modèle à agents fini casse la symétrie par fluctuation, tôt ou tard [inféré] : l'« interblocage » observé dépendra de N et de l'horizon.

**Recommandation.**
- Couche 2 : EDO de Pais et al. 2013 (RK4), reproduire le diagramme de bifurcation.
- Version de taille finie : SSA de Gillespie (1977) sur les mêmes taux [référence non relue en ligne : accès refusé].
- Définition opérationnelle de l'interblocage : aucun quorum atteint avant T, en proportion sur M graines.
- Montrer la dépendance à N : c'est justement un résultat de vulgarisation intéressant (l'interblocage d'un système multi-agents fini est probabiliste) [inféré].

### M6 — majeur — Thermorégulation : cibles de simulation mal attribuées (Projet 3)

**Problème.** Le résumé de Jones et al. 2004 décrit un résultat **empirique** : les colonies génétiquement diverses (reine fécondée par plusieurs mâles) ont des températures de couvain plus stables **[lu]**. Les modèles de simulation sont Graham et al. 2006 (colonies à 1 vs 15 patrilignes qui chauffent le nid; la colonie monopatrilignée est moins stable) et Myerscough et Oldroyd 2004 **[lu, résumés]**. De plus, la diversité porte sur les **patrilignes** (variance de seuil entre groupes), pas sur un tirage indépendant par abeille [lu pour la notion de patriligne; l'effet de la structure de variance sur le résultat est inféré].

**Recommandation.** Cible de reproduction : Graham et al. 2006 (paramètres à relire dans le texte intégral). Seuils tirés par patriligne. Modèle physique minimal : un compartiment de température (refroidissement de Newton) couplé aux agents [inféré; à confronter au modèle de Graham et al.].

### M7 — majeur — Moulin et mimétisme : pas de modèle cible (Projet 6)

**Problème.** Couzin et al. 2002 est « a self-organizing model of group formation in three-dimensional space » pour « fish schools and bird flocks » **[lu, résumé]**. Ce n'est pas un modèle de fourmis, et il n'a pas de phéromone. Le moulin de fourmis (Schneirla 1944) est un phénomène de suivi de piste. La v3 ne cite aucun modèle de moulin à phéromone ni aucun résultat quantitatif à reproduire; même chose pour le mimétisme chimique (*Phengaris*, sphinx tête-de-mort). Le critère « chaque simulation reproduit un résultat publié » n'est donc pas applicable au projet 6.

**Recommandation.**
- Moulin : utiliser le modèle à agents de la couche 3 (règle de Perna et al. 2012) dans une géométrie qui piège la piste. Présenter Couzin et al. 2002 comme *analogue* (phase tore), pas comme référence. Chercher un modèle publié de moulin à phéromone (je n'ai pas pu chercher : budget épuisé).
- Mimétisme : modèle de reconnaissance par gabarit (distance entre profils chimiques et seuil d'acceptation); critère d'acceptation qualitatif, déclaré « exploratoire, sans résultat publié à reproduire », comme le projet 7.

### M8 — majeur — Ant System sur Oliver30 : protocole manquant (Projet 2)

**Problème et faits [lu, Dorigo et al. 1996, texte intégral] :**
- Oliver30 vient de Whitley, Starkweather et Fuquay 1989 (réf. [34] de l'article); la v3 n'indique pas de source de coordonnées. Plusieurs jeux circulent [inféré].
- Meilleure tournée : longueur réelle 423,741, longueur entière 420 (figure 9). La distance est euclidienne réelle, sauf dans la comparaison avec le progiciel « Travel » (distances entières).
- Paramètres de la variante *ant-cycle* : α = 1, β = 5, ρ = 0,5, Q = 100, m = n = 30, NC_MAX = 5000, moyennes sur 10 essais. Tableau I : moyenne 424,250, meilleur 423,741.
- L'obtention systématique de 423,741 en moins de 400 cycles se fait avec la stratégie élitiste (e = 8), pas avec AS de base.

**Recommandation.** Valider le jeu de coordonnées en recalculant la tournée publiée : 423,741 en réel, 420 en entier; sinon, refuser le jeu. Cibles : moyenne ≈ 424,25 sur 10 graines (AS de base) et taux d'atteinte de 423,741 (variante élitiste). Exécuter sous Node; le navigateur ne montre qu'une exécution.

### M9 — majeur — ABC : protocole TR06 et visuel 2D (Projet 2)

**Problème et faits [lu, Karaboga 2005 TR06, texte intégral] :** Sphere 5D sur [−100, 100], Rosenbrock **2D** sur [−2,048; 2,048], Rastrigin **10D** sur **[−600, 600]** (domaine atypique pour Rastrigin, d'ordinaire [−5,12; 5,12] [inféré]). Taille d'essaim 20, `limit` = nombre d'observatrices × dimension, 2000 cycles, 30 exécutions. Moyenne sur Rastrigin : 4,68E-17. Le « nuage d'abeilles sur une surface 2D » de la v3 correspond au protocole publié pour Rosenbrock seulement.

**Recommandation.** Reproduire exactement le tableau 3 du TR06 sous Node. Afficher Rosenbrock 2D comme cas publié et Rastrigin 2D comme illustration étiquetée « non publiée ». Karaboga et Basturk 2007 (J. Global Optim.) n'est pas accessible ici **[non vérifié]** : ne pas le prendre comme cible sans relecture.

### M10 — majeur — Chaîne TypeScript pour le navigateur (Technique)

**Problème.** « Node exécute .ts directement » vaut pour Node seulement : le type stripping est activé par défaut depuis v23.6.0 et stable depuis v25.2.0 et v24.12.0 **[lu]**. Le navigateur, lui, a besoin d'une transpilation, et un artifact doit être un fichier HTML autonome. Contraintes du stripping **[lu]** : pas d'`enum`, de `namespace` avec code, de *parameter properties* ni de décorateurs; extensions `.ts` obligatoires dans les imports; `import type` requis; `tsconfig.json` ignoré par Node.

**Recommandation.**
- `tsconfig` : `noEmit`, `erasableSyntaxOnly` (TS 5.8), `verbatimModuleSyntax`, `allowImportingTsExtensions` ou `rewriteRelativeImportExtensions` **[lu]**.
- Build navigateur : esbuild `--bundle --format=iife --minify`, puis injection du JS dans le HTML. esbuild « does not do any type checking » : garder `tsc --noEmit` en CI **[lu]**.
- C'est une frontière d'outillage, pas de langage : elle se justifie parce qu'un artifact exige un fichier unique.

### M11 — majeur — Performance et contraintes d'artifact (Technique)

**Faits [lu] :** OffscreenCanvas est largement disponible depuis mars 2023 et utilisable dans un worker. Un `ArrayBuffer` transféré à un worker l'est sans copie (le tampon source est détaché); les TypedArray ne sont pas transférables, il faut passer `.buffer`. `SharedArrayBuffer` exige un contexte sécurisé **et** l'isolation cross-origin (COOP/COEP). MDN recommande des coordonnées entières, des canvas superposés et des appels groupés.

**Non vérifié :** si une page publiée sur claude.ai est isolée cross-origin et si sa CSP autorise un worker créé depuis une URL `blob:`. Les volumes réalistes (taille des colonies de *Temnothorax*, d'un essaim d'abeilles) ne sont pas vérifiés ici non plus.

**Recommandation.**
- Données en structure de tableaux (Float32Array/Int32Array) plutôt qu'en objets par agent [inféré].
- Champs dessinés par un seul `putImageData`; agents dessinés en un seul chemin, ou par écriture de pixels [inféré].
- Simulation dans un worker si le pas dépasse ~8 ms (moitié d'une image à 60 Hz) [inféré], avec transfert de tampons (pas de `SharedArrayBuffer`).
- WebGL seulement si une mesure le justifie (au-delà de ~10⁵ points à 60 Hz [inféré, à mesurer]).
- **Faire un spike d'une demi-journée** : un artifact minimal qui lance un worker `blob:`, transfère un tampon, dessine 10⁴ et 10⁵ agents et appelle `downloads.save`, pour lever les inconnues avant le projet 1.

### M12 — majeur — Export et rejouabilité (Format)

**Problème.** La v3 ne prévoit ni export ni manifeste de run. Dans un artifact, offrir un fichier exige la capacité `downloads` (`downloads.save({filename, data})`, avec confirmation du visiteur, qui peut refuser); le stockage durable partagé exige `db` (quotas) **[lu, définitions de types des capacités]**.

**Recommandation.**
- **Manifeste de run** (JSON) : identifiant et version du modèle, hachage git du moteur, scénario complet (paramètres, dt, ordre de mise à jour, unités), graine, horizon, moteur JS (`navigator.userAgent` ou `process.version`), résumé des statistiques.
- **Séries** en CSV (une ligne par pas d'échantillonnage).
- Pour un moteur déterministe, manifeste + graine = rejeu complet sur le même moteur; on ne stocke la trajectoire que pour les runs LLM (M17).
- Bouton « exporter » via `downloads` quand l'option est disponible, sinon masqué.

### M13 — majeur — Tests de reproduction automatisés (Critère de rigueur)

**Problème.** La v3 n'a ni harnais, ni critères chiffrés, ni plan pour les figures publiées.

**Faits [lu] :** `node:test` est stable depuis v20.0.0; il ramasse `**/*.test.ts` par défaut quand le stripping est actif; les snapshots sont stables depuis v23.4.0.

**Recommandation.**
1. **Tests statistiques d'acceptation**, un par résultat publié : par exemple, sur 100 graines, proportion d'essais « bloqués sur la branche longue » ≥ seuil; moyenne Oliver30 dans [423,7; 426]; tableau 3 du TR06 à un ordre de grandeur près. Les seuils s'écrivent **avant** de coder (pré-enregistrement).
2. **Traces dorées** : hachage de l'état à t = 100, 1000 pour quelques graines, en snapshot; valides seulement pour la version de Node fixée en CI.
3. **Figures publiées numérisées** (p. ex. avec WebPlotDigitizer) versionnées en CSV, avec une erreur de reproduction calculée (RMSE ou distance de forme).
4. CI : `tsc --noEmit` puis `node --test`.

Les réplications lourdes tournent sous Node (avec `worker_threads` pour les balayages); les pages livrent des résumés précalculés en JSON et rejouent une graine en direct.

### M14 — majeur — Régulation : modèles de file et données (Projet 4)

**Problème.**
- Prabhakar et al. 2012 : α_n = max(α_{n−1} − q·D_{n−1} + c·A_n − d, α_min), D_n ~ Poisson(α_n); q = 0,05, d = 0, α_min = 0,01 fourmi/s; c ajusté **par essai** entre 0,01 et 0,25; 62 essais (2009–2010) **[lu]**. Reproduire exige les séries de retours observées : leur disponibilité (matériel supplémentaire) n'est pas vérifiée.
- Côté abeilles, Seeley et Tovey 1994 (Anim. Behav., DOI 10.1006/anbe.1994.1044 **[lu, notice]**) décrit un système de files où le temps de recherche d'une receveuse sert de signal. Le modèle naturel est une simulation à événements discrets (file à priorité d'événements), pas un pas fixe [inféré].
- La loi de Little (L = λW) ne vaut qu'en moyenne sur des régimes stationnaires; or la v3 l'applique justement aux phases de rééquilibrage, non stationnaires [inféré; Little 1961 non relu].

**Recommandation.** Ajouter au noyau un petit moteur à événements discrets (tas binaire, ~50 lignes). Demander les données de Prabhakar et al. aux auteurs, ou les numériser. Présenter Little comme un rapprochement en moyenne, vérifié numériquement sur fenêtre glissante dans la simulation.

### M15 — majeur — Projet 7 : budget absent (Projet 7)

**Faits [lu, page Pricing, 2026-10-01], en $ US par million de jetons (entrée / sortie) :** Haiku 4.5 : 1 / 5; Sonnet 5.5 : 2 / 10; Opus 5.5 : 4 / 20; Fable 5.1 : 10 / 50. Batch : −50 %, cumulable avec le cache. Lecture de cache : 0,1× l'entrée (0,05× sur Opus 5.5, 0,025× sur Fable 5.1).

**Ordre de grandeur [inféré, hypothèses explicites] :** 3 scénarios (1, 3, 5) × 2 architectures × 10 répétitions × 50 agents × 100 pas = **300 000 appels par modèle**; 1 500 jetons d'entrée et 150 de sortie par appel, réflexion exclue.

| Modèle | $/appel | Total standard | Avec Batch |
|---|---|---|---|
| Haiku 4.5 | 0,00225 | 675 $ | ~338 $ |
| Sonnet 5.5 | 0,0045 | 1 350 $ | ~675 $ |
| Opus 5.5 | 0,009 | 2 700 $ | ~1 350 $ |
| Fable 5.1 | 0,0225 | 6 750 $ | ~3 375 $ |

Les jetons de réflexion sont facturés comme sortie. Sur Opus 5.5, où elle ne se désactive pas, 500 jetons de réflexion par appel ajouteraient ~0,01 $ par appel, soit ~3 000 $. La sortie domine.

**Recommandation.** Faire un pilote de 1 % pour mesurer les jetons réels par appel, puis fixer un plafond par bras. Mettre en cache le préfixe stable (règles, scénario) et placer l'observation de l'agent après le point de cache; vérifier par `usage.cache_read_input_tokens`. Effort `low` ou `medium` par défaut pour les agents, fixé et consigné.

### M16 — majeur — Batch API vs simulation pas à pas (Projet 7)

**Faits [lu] :** la plupart des lots finissent en moins d'une heure; un lot expire à 24 h; maximum de 100 000 requêtes ou 256 Mo par lot; résultats dans un ordre quelconque (apparier par `custom_id`); conservés 29 jours; succès de cache « best-effort » de 30 à 98 %.

**Problème [inféré].** Une simulation de 100 pas où chaque pas dépend du précédent demanderait 100 lots successifs, soit potentiellement plusieurs jours par run.

**Recommandation.** Lots synchronisés (*lockstep*) : un lot par pas regroupant **toutes les répétitions et tous les agents** de toutes les cellules; on garde la remise de 50 % et le délai total ≈ T lots. Sinon, API interactive avec limiteur de concurrence. Choisir selon le budget en temps; le dire dans le protocole.

### M17 — majeur — Journalisation et rejeu (Projet 7)

**Problème.** La v3 dit « rejouant les journaux » sans en donner le format.

**Recommandation.**
- **Journal JSONL**, une ligne par appel : `run_id`, hachage du scénario, graine, pas, `agent_id`, modèle demandé, `response.model`, effort, configuration de réflexion, corps complet de la requête, réponse complète (`content`, `stop_reason`, `usage`), latence, coût calculé, version du SDK, horodatage. Compression gzip; archivage hors git (dépôt de données avec DOI) [inféré : ~Go par modèle à l'échelle de M15].
- **Rejeu par cassette** : l'adaptateur LLM sert la réponse journalisée, indexée par (run, pas, agent, hachage de la requête). Un hachage de requête différent signale une divergence du moteur, ce qui fait aussi office de test de non-régression.
- **Sorties structurées** (`output_config.format`, schéma JSON) pour l'action de l'agent. Sur les modèles 5.5, `tool_choice` forcé renvoie une erreur 400 **[lu, référence claude-api]**.
- Les pages web rejouent les journaux; elles n'appellent jamais l'API.

### m1 — mineur — Convention de ρ (Projet 2)

Dorigo et al. 1996 écrivent τ(t+n) = ρ·τ(t) + Δτ, où ρ est la **persistance** et (1−ρ) l'évaporation **[lu]**. La v3 écrit τ ← (1−ρ)τ + Δτ, donc ρ y est l'évaporation. Avec ρ = 0,5, les deux coïncident; avec 0,99 (tableau I), non. Déclarer la convention dans le scénario.

### m2 — mineur — « Analogue à TCP » (Projet 4)

Le texte de Prabhakar et al. 2012 ne contient ni « TCP » ni « Internet ». Il parle seulement d'une analogie avec « many other distributed networks, from computer networks to neural integrators » **[lu, via l'outil de récupération]**. Attribuer l'analogie TCP à sa source réelle, ou la présenter comme rapprochement de l'auteur.

### m3 — mineur — « Combinatoire vs continu » (Projet 2)

Le contraste tient au choix des algorithmes, pas aux mécanismes : il existe des variantes continues d'ACO (ACO_R, Socha et Dorigo 2008) et des variantes combinatoires d'algorithmes d'abeilles **[non vérifié en ligne : budget épuisé]**. Le formuler comme tel.

### m4 — mineur — Précision des champs (Technique)

En Float32, de petits dépôts sur un champ élevé sont absorbés; une évaporation répétée fait apparaître des sous-normaux, qui peuvent ralentir certains processeurs [inféré]. Mettre à zéro sous un seuil ε déclaré; accumuler en Float64 si le test de convergence l'exige.

### m5 — mineur — Écran partagé (Format)

Les deux espèces n'ont ni les mêmes échelles de temps ni les mêmes échelles d'espace [inféré]. Synchroniser par temps normalisé (par exemple, temps de décision médian = 1) et l'afficher; sinon, la comparaison visuelle suggère des vitesses relatives fausses.

### m6 — mineur — Fallback et refus (Projet 7)

La référence claude-api recommande d'activer par défaut le paramètre serveur `fallbacks`, qui bascule sur un autre modèle en cas de refus **[lu]**. En expérience contrôlée, cela contaminerait le bras. Le désactiver et consigner `stop_reason: "refusal"` comme donnée (et comme catégorie d'échec, utile au projet 6).

### m7 — mineur — Capacité `sample` (Format)

Une page peut interroger Claude via `sample`, mais avec un `modelTier` (`quick`, `default`, `complex`) et non un modèle fixé; « the platform may serve a nearby cheaper tier »; le coût est à la charge du visiteur **[lu, sample.d.ts]**. Usage acceptable : démonstration étiquetée. Jamais pour produire des données.

### m8 — mineur — Taille d'artifact (Format)

16 Mo par page **[lu, description de l'outil Artifact]**. Les résumés précalculés (M13) doivent tenir dans cette limite; sinon, utiliser la capacité `assets` ou des agrégats.

### m9 — mineur — Interface de politique (Projet 7)

Pour que la grille 2 × 4 compare des choses comparables, « règle simple » et « LLM » doivent implanter la même interface (`decide(observation) → action`) et recevoir la même observation sérialisée. C'est ici qu'une interface à plusieurs implantations est justifiée [inféré].

---

## 4. Matrice concept → modèle de référence

| Projet | Espèce | Modèle de référence (couche 2) | Source vérifiée | Extension spatiale (couche 3) |
|---|---|---|---|---|
| 1 | Fourmi | Monte Carlo de la fonction de choix | Goss 1989 [non relu], Deneubourg 1990 [non relu] | Modèle à agents, virage de Weber (Perna 2012) |
| 1 | Abeille | EDO compartimentales | Camazine et Sneyd 1991 [résumé lu] | Piste de danse, recrutement par suivi |
| 2 | Fourmi | Ant System *ant-cycle* | Dorigo 1996 [lu] | — (algorithmique) |
| 2 | Abeille | ABC (TR06) | Karaboga 2005 [lu] | — |
| 3 | Fourmi | Seuils fixes, stochastique | Bonabeau 1996 [résumé lu] | Agents colorés par tâche |
| 3 | Abeille | Seuils par patriligne + température | Graham 2006 [résumé lu] | Thermomètre de ruche |
| 4 | Fourmi | Poisson à temps discret | Prabhakar 2012 [lu] | Chronogramme |
| 4 | Abeille | Événements discrets (files) | Seeley et Tovey 1994 [notice lue] | File à l'entrée |
| 5 | Fourmi | Modèle à agents de l'émigration | Pratt 2005 [notice lue], Franks 2003 [résumé lu] | Carte des sites |
| 5 | Abeille | EDO + bruit; SSA à N fini | Pais 2013 [lu], Seeley 2012 [résumé] | Carte des sites |
| 6 | Fourmi | Aucun identifié | — | Moulin par suivi de piste |
| 6 | Abeille | EDO de Pais sans inhibition | Pais 2013 [lu] | Essaim scindé |
| 7 | Agents LLM | Exploratoire (aucune cible) | — | Grille 2 × 4 |

---

## 5. Architecture minimale recommandée

```
noyau/        rng.ts (xoshiro128** + splitmix), horloge.ts (pas fixe), ordonnanceur.ts,
              ode.ts (RK4), ssa.ts (Gillespie), des.ts (événements discrets),
              grille.ts (champ, évaporation exacte, diffusion vérifiée), enregistreur.ts,
              scenario.ts (validation + constantes précalculées), manifeste.ts
modeles/      un dossier par article (référence) + choregraphie/ (modèle spatial commun)
politiques/   regle.ts, llm.ts (SDK @anthropic-ai/sdk), cassette.ts (rejeu)
pages/        rendu Canvas, worker, export (downloads), aucun accès réseau
tests/        *.test.ts : acceptation statistique, traces dorées, docking
donnees/      figures numérisées (CSV), résumés précalculés (JSON)
```

Pas de framework ECS, pas de bibliothèque physique : le noyau tient en quelques centaines de lignes. Un seul langage (TypeScript); seule frontière, l'outillage esbuild pour le navigateur.

---

## 6. Ajouts recommandés au programme

1. **Phase 0 « noyau et spike »** avant le projet 1 : noyau commun, harnais de tests, spike d'artifact (worker `blob:`, transfert de tampons, `downloads`, 10⁴/10⁵ agents).
2. **Fiche de reproduction par article** : équations, paramètres, unités, protocole, figure cible numérisée, critère d'acceptation chiffré écrit d'avance.
3. **Docking** systématique entre modèle spatial commun et modèle de référence.
4. **Module SSA (Gillespie)** pour les effets de taille finie (projets 5, 6) et **module à événements discrets** (projet 4).
5. **Balayages paramétriques headless** (Node, `worker_threads`) pour les diagrammes de phases (projet 6) et l'analyse de sensibilité, y compris à l'ordre de mise à jour.
6. **Projet 7 : pilote à 1 %**, budget par bras, collecte de Haiku 4.5 en premier, journal JSONL, cassette, archivage avec DOI, pas de fallback.
7. **Manifeste de run et export** standard pour toutes les pages.

---

## 7. Sources

Articles (lus en texte intégral ou en résumé, selon la mention dans le texte) :
- Dorigo, Maniezzo, Colorni 1996, *Ant System* — texte intégral : http://www.sci.brooklyn.cuny.edu/~sklar/teaching/f05/alife/papers/dorigo-96ant.pdf
- Karaboga 2005, TR06 — texte intégral : https://abc.erciyes.edu.tr/pub/tr06_2005.pdf
- Prabhakar, Dektar, Gordon 2012, PLoS Comput Biol : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670
- Pais et al. 2013, PLoS ONE : https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0073216
- Perna et al. 2012 (arXiv 1201.5827; PLoS Comput Biol 8(7):e1002592) : https://arxiv.org/abs/1201.5827
- Camazine et Sneyd 1991 (résumé) : https://consensus.app/papers/details/0f69a4a7b3cf5fbfbe26efc5d46aea0f/
- Seeley, Camazine, Sneyd 1991 (résumé) : https://consensus.app/papers/details/e0b29bc897325ba4b7037e07b83c347b/
- Bonabeau, Theraulaz, Deneubourg 1996 (résumé) : https://consensus.app/papers/details/fad8697e1c785517a81459bc5ef5de5c/
- Theraulaz, Bonabeau, Deneubourg 1998 (résumé) : https://consensus.app/papers/details/fdc4ae3d15f45afb873a4ac1657e5017/
- Wilson 1984, Behav Ecol Sociobiol 16:89–98 (notice) : https://link.springer.com/article/10.1007/BF00293108
- Jones et al. 2004, Science (résumé) : https://consensus.app/papers/details/3b6bf5096f0b5e1da11c631c054e338f/
- Graham et al. 2006, Insectes Sociaux (résumé) : https://consensus.app/papers/details/f4eb3dba35ee5a00a6138dc700152ebc/
- Myerscough et Oldroyd 2004, Insectes Sociaux (résumé) : https://consensus.app/papers/details/a89bfa75d6b55a28a094bd042e9e71d6/
- Couzin et al. 2002, J Theor Biol, DOI 10.1006/jtbi.2002.3065 (résumé via Europe PMC) : https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE%3A%22Collective%20memory%20and%20spatial%20sorting%20in%20animal%20groups%22&resultType=core&format=json
- Huberman et Glance 1993, PNAS, DOI 10.1073/pnas.90.16.7716 (résumé via Europe PMC) : https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=TITLE%3A%22Evolutionary%20games%20and%20computer%20simulations%22&resultType=core&format=json
- Franks et al. 2003, Proc R Soc B, DOI 10.1098/rspb.2003.2527 (résumé via Europe PMC)
- Seeley et al. 2012, Science, DOI 10.1126/science.1210361 (notice) : https://research-information.bristol.ac.uk/en/publications/stop-signals-provide-cross-inhibition-in-collective-decision-making-by-honey-bee-swarms(0d6272d7-2753-426c-9dca-25d8182e6799)/export.html
- Seeley et Tovey 1994, DOI 10.1006/anbe.1994.1044; Pratt et al. 2002, DOI 10.1007/s00265-002-0487-x (notices Crossref) : https://api.crossref.org/works
- Pratt, Sumpter, Mallon, Franks 2005, Anim Behav 70:1023–1036 (notice) : https://sciencedirect.com/science/article/abs/pii/S0003347205002332

Plateforme et outillage :
- Node.js, TypeScript (type stripping) : https://nodejs.org/api/typescript.html
- Node.js, test runner : https://nodejs.org/api/test.html
- TypeScript 5.8, `erasableSyntaxOnly` : https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html
- esbuild, API et types de contenu : https://esbuild.github.io/api/ ; https://esbuild.github.io/content-types/
- MDN, `Math` : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
- MDN, `Math.random` : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
- MDN, OffscreenCanvas : https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
- MDN, SharedArrayBuffer : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer
- MDN, requestAnimationFrame : https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame
- MDN, objets transférables : https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects
- MDN, optimiser le canvas : https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
- Vigna, générateurs xoshiro : https://prng.di.unimi.it/
- Fiedler, « Fix Your Timestep! » : https://gafferongames.com/post/fix_your_timestep/
- Schéma FTCS (source secondaire) : https://en.wikipedia.org/wiki/FTCS_scheme

API Claude (consultées le 2026-10-01) :
- Tarifs : https://platform.claude.com/docs/en/about-claude/pricing
- Retraits de modèles : https://platform.claude.com/docs/en/about-claude/model-deprecations
- Batch : https://platform.claude.com/docs/en/build-with-claude/batch-processing
- Capacités d'artifact (`downloads`, `db`, `sample`) : définitions de types du contrat d'exécution 0.2.66, fournies avec l'outil Artifact.

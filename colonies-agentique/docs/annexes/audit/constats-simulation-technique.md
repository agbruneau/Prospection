# Constats — Simulation et technique

Source : [rapport complet](simulation-technique.md). 29 constats (3 critiques, 17 majeurs, 9 mineurs) et 7 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 est faisable en TypeScript + Canvas, mais « un seul moteur avec deux espèces interchangeables » contredit son propre critère de rigueur. Les résultats à reproduire viennent de modèles de types différents : EDO (Camazine et Sneyd 1991), Monte Carlo de choix (Goss/Deneubourg), Poisson à temps discret (Prabhakar 2012), champ moyen bruité (Pais 2013), modèle à agents (Pratt 2005), métaheuristiques (Dorigo 1996, Karaboga 2005). Il faut donc un noyau commun mince (graine, horloge, enregistreur, scénario, tests) et un modèle de référence fidèle par article; le modèle spatial commun devient une extension validée par docking. Deux cibles sont fausses ou absentes : Wilson 1984 dit l'inverse de la v3 (ce sont les majors qui prennent la relève), et Couzin 2002 est un modèle 3D de poissons et d'oiseaux, sans phéromone. Le projet 7 n'est pas reproductible au sens fort : temperature est refusée sur les modèles 4.7 et suivants, Haiku 4.5 a une date de retrait possible au 15 octobre 2026, et l'axe « capacité » confond génération, tokenizer et réflexion. Il lui faut un journal JSONL complet, un rejeu par cassette, un budget chiffré et des répétitions.

## Constats

### ST-01 · critique · Technique et parcours (« un seul moteur »)

**Constat.** Les résultats publiés ciblés reposent sur des modèles hétérogènes (EDO, Monte Carlo, Poisson discret, champ moyen, modèle à agents, métaheuristique). Un moteur spatial unique produirait d'autres modèles, et l'écart à la figure publiée ne mesurerait plus la fidélité. Les échelles spatiales fourmi/abeille sont aussi incompatibles (inféré).

**Preuve.** Lu : https://consensus.app/papers/details/0f69a4a7b3cf5fbfbe26efc5d46aea0f/ (« system of non-linear differential equations »); https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 (« discrete time »); https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0073216

**Recommandation.** Trois couches : noyau commun (PRNG, horloge à pas fixe, RK4, SSA, événements discrets, grille, enregistreur, scénario), modèle de référence par article validé contre la figure publiée, modèle chorégraphique commun (seul le canal est interchangeable) validé par docking.

**Disposition.** Accepté — Un moteur unique est abandonné : trois couches (noyau commun mince, un modèle de référence par article validé contre sa figure ou son tableau, modèle chorégraphique commun à canal seul interchangeable, aligné par docking). Le noyau reprend PRNG, horloge à pas fixe, RK4, SSA, événements discrets, grille, enregistreur, scénario, et ajoute Euler–Maruyama et le manifeste. — Traité dans : ../../00-cadre.md (§7 Architecture de simulation); ../../05-spec-simulation.md (§2 Architecture : trois couches, deux sorties; §3.1 Tableau par projet); ../../02-architecture-programme.md (§7, D1); ../../../projets/S0-socle.md (§9 Plan de simulation)

### ST-02 · critique · Projet 3 — À reproduire

**Constat.** « Les petites ouvrières prennent la relève » inverse Wilson 1984 : quand on retire des minors, ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5) et leur activité (×15 à 30) et rétablissent au moins 75 % de l'activité manquante. Le test d'acceptation validerait un modèle faux.

**Preuve.** Lu (résumé éditeur) : https://link.springer.com/article/10.1007/BF00293108 ; https://consensus.app/papers/details/fad8697e1c785517a81459bc5ef5de5c/

**Recommandation.** Corriger la cible (retrait des minors → activation des majors à seuils élevés) et reproduire la figure de Bonabeau et al. 1996 après lecture du texte intégral.

**Disposition.** Modifié — La cible est corrigée : après retrait des minors, ce sont les majors qui prennent le relais (activité ×15 à ×30, répertoire ×1,4 à ×4,5, au moins 75 % de l'activité restaurée), testé par H3.1 et T3.2. Adaptation : T3.2 n'est qu'une calibration de θ_maj/θ_min (relationnelle, « go partiel ») et non la reproduction de la figure de Bonabeau et al. 1996, dont le texte n'est pas lu. — Traité dans : ../../00-cadre.md (§2.4 point 1); ../../../projets/P3-division-du-travail.md (§1 Corrections de v3; §3 H3.1; §5 T3.2; §6 E3.1; §11 R1, R2, R6); ../../../projets/P7-synthese-agentique.md (§4.2 S3 fourmi, T7.17)

### ST-03 · critique · Projet 7 — axe capacité (règle, Haiku, Sonnet, Opus)

**Constat.** L'axe confond génération (Haiku 4.5 de 2025 vs 5.5 de 2026), tokenizer (~30 % de jetons en plus à partir de 4.7), réflexion (non désactivable sur Opus 5.5, effort medium par défaut; high sur Sonnet 5.5) et échantillonnage (temperature non par défaut → erreur 400 à partir de 4.7). Fable 5.1, le plus capable, est absent. Retrait de Haiku 4.5 possible dès le 15 octobre 2026; la documentation admet que les chercheurs perdent l'accès aux modèles.

**Preuve.** Lu : https://platform.claude.com/docs/en/about-claude/model-deprecations ; https://platform.claude.com/docs/en/about-claude/pricing

**Recommandation.** Échelle de niveaux dans une même génération (Sonnet 5.5, Opus 5.5, Fable 5.1) avec effort fixé et consigné; Haiku 4.5 comme point historique, à collecter en premier; consigner response.model; mesurer la variance par répétitions; dire que l'expérience reste rejouable mais pas ré-exécutable.

**Disposition.** Modifié — « Capacité » est traitée comme paquet catégoriel (génération, raisonnement, tokeniseur, classifieurs), avec effort et max_tokens fixés et consignés, response.model consigné pour chaque appel, variance mesurée par pilote et répétitions, et énoncé « rejouable, non ré-exécutable »; Haiku 4.5 est désigné point historique à collecter en premier. Adaptation : la grille garde Haiku 4.5, Sonnet 5.5 et Opus 5.5 (pas une échelle à l'intérieur d'une génération) et Fable 5.1 n'est qu'une option descriptive hors comparaison principale (E7.11); la décision de collecter Haiku en premier reste ouverte (D18, porte GF1). — Traité dans : ../../00-cadre.md (§2.4 point 16); ../../../projets/P7-synthese-agentique.md (§9.3 Modèles LLM : identifiants, tarifs, paramètres; §6.3 E7.11; §11.1 R71, R90; §11.5); ../../04-protocole-reproduction.md (§13.1; §13.3 Contrôle de plateforme; §13.5); ../../08-science-ouverte-ethique.md (§6.4 Rejouable n'est pas ré-exécutable; §6.5); ../../02-architecture-programme.md (§8 IC1, §7 D18); ../../09-feuille-de-route.md (§5.1 GF1)

### ST-04 · majeur · Technique — déterminisme

**Constat.** Aucun PRNG à graine prévu. Math.random n'accepte pas de graine, et la précision des fonctions Math dépend du moteur, du système et de l'architecture : une trace calculée sous Node peut diverger dans Firefox ou Safari.

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random ; https://prng.di.unimi.it/

**Recommandation.** xoshiro128** initialisé par SplitMix64, un flux par sous-système; multiplications au lieu de Math.pow à exposant entier; constantes dérivées précalculées sous Node et écrites comme littéraux dans le scénario; traces dorées propres à un moteur, critères statistiques valides partout.

**Disposition.** Accepté — xoshiro128** initialisé par SplitMix64 (graine maître de 64 bits), un flux nommé par sous-système, exposants entiers écrits en multiplications, constantes dérivées calculées sous Node et écrites en littéraux au scénario compilé; Math.random, Date.now et performance.now interdits par test de conformité. Les traces dorées sont liées à un moteur et à une version de Node épinglés, les critères statistiques valent partout (niveaux N1, N2, N3). — Traité dans : ../../05-spec-simulation.md (§4.1 Aléatoire; §4.8 Scénario; §7.1 Ce que le moteur garantit; §7.2 Interdits et contrôle; §9.4 Traces dorées); ../../04-protocole-reproduction.md (§6.6 Graines et générateur; §6.7 Déterminisme entre moteurs); ../../../projets/S0-socle.md (§5 T0.1, T0.3, T0.21, T0.26)

### ST-05 · majeur · Technique — pas de temps, unités, ordre de mise à jour

**Constat.** Rien n'est spécifié. requestAnimationFrame suit la fréquence de l'écran et s'arrête dans les onglets en arrière-plan; une évaporation « par pas » dépend de dt; synchrone vs asynchrone change les résultats (Huberman et Glance 1993).

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame ; https://gafferongames.com/post/fix_your_timestep/ ; DOI 10.1073/pnas.90.16.7716 (résumé Europe PMC)

**Recommandation.** Pas fixe avec accumulateur, découplé du rendu; paramètres en unités physiques (demi-vie) convertis au chargement; ordre de mise à jour déclaré dans le scénario et testé en sensibilité; expériences guidées hors requestAnimationFrame.

**Disposition.** Modifié — L'horloge est à pas fixe (t = n·dt), sans requestAnimationFrame ni temps mural; cadencer sur rAF est interdit à la page, avec un test bloquant (SPK6 : même empreinte à cadence nominale, limitée et onglet masqué). Les paramètres s'écrivent en unités physiques (demi-vie) et sont convertis une fois à la compilation du scénario; l'ordre de mise à jour est déclaré au scénario et testé en sensibilité (écart < 3 ES de Monte Carlo). Adaptation : aucun accumulateur n'est spécifié; le découplage repose sur le worker et sur SPK6, et le pilote de page (browser/driver.ts) n'est pas décrit. — Traité dans : ../../05-spec-simulation.md (§4.2 Horloge; §4.6 Grille; §7.3 Ordre de mise à jour; §12 Spike, SPK6; §14 Ce que la couche navigateur ne doit jamais faire); ../../../projets/S0-socle.md (§9 Plan de simulation, Pas de temps et unités; T0.28); ../../04-protocole-reproduction.md (§6.8 Ordre de mise à jour)

### ST-06 · majeur · Projets 1 et 6 — diffusion et évaporation

**Constat.** La discrétisation du champ n'est pas traitée. Le schéma explicite FTCS en 2D exige r = DΔt/Δx² ≤ 1/4. Dépôt au plus proche voisin → anisotropie; risque de sous-normaux (inféré).

**Preuve.** Lu (source secondaire) : https://en.wikipedia.org/wiki/FTCS_scheme

**Recommandation.** Évaporation exacte; diffusion seulement si le modèle l'exige, avec contrôle de r au chargement; dépôt et capteurs bilinéaires; test de convergence en grille (Δx vs Δx/2).

**Disposition.** Accepté — Évaporation exacte (facteur exp(−ln2·dt/t_half) calculé une fois, remise à zéro sous ε), diffusion FTCS seulement si le modèle l'exige et refusée à la compilation si r > 1/4 en 2D, dépôt et lecture bilinéaires, test de convergence Δx contre Δx/2 et test d'équivalence de l'évaporation paresseuse. Les consommateurs spatiaux (P6 : Aswale et al.; P9 : Khuong et al.) s'en servent après ces tests. — Traité dans : ../../05-spec-simulation.md (§4.6 Grille; §9.6 Tests propres au moteur : grille; §11 Budgets de performance); ../../../projets/S0-socle.md (§9 Plan de simulation, Grille); ../../../projets/P6-defaillances-et-defenses.md (§9 Plan de simulation); ../../../projets/P9-mouvement-collectif-et-construction.md (§9.1 Couche 1, noyau)

### ST-07 · majeur · Projet 1 — fonction de Deneubourg

**Constat.** La fonction de choix non linéaire est un ajustement au niveau colonie. Perna et al. 2012 mesurent une réponse individuelle proportionnelle (loi de Weber sur l'angle de virage), « in apparent contradiction » avec cette fonction. L'employer comme règle de chaque fourmi mélange les niveaux. k = 20 et n = 2 n'ont pas pu être relus dans les articles d'origine.

**Preuve.** Lu (résumé) : https://arxiv.org/abs/1201.5827 ; Goss 1989 et Deneubourg 1990 non relus

**Recommandation.** Référence : Monte Carlo de la fonction de choix, comme dans les articles d'origine. Modèle spatial : règle de Perna, avec la non-linéarité colonie comme sortie à comparer. Relire le protocole de Goss et al. 1989 (branche courte ajoutée tard) avant d'écrire le test.

**Disposition.** Modifié — La fonction de Deneubourg est traitée comme un ajustement collectif (n = 2; k = 20 à confirmer; A et B cumulés) : le pont de Goss reste un Monte Carlo de choix comme dans l'article d'origine (T1.1 à T1.3, Goss 1989 lu en texte intégral), et E1.5 teste si des individus de type Weber avec bruit produisent le sigmoïde collectif (n_fit comme sortie). Adaptation : la règle de Perna et al. 2012 ne figure pas encore dans un modèle spatial, car l'article n'est pas lu (porte F, plan B R1.8), et k reste à confirmer dans Deneubourg et al. 1990 (non lu, R1.2). — Traité dans : ../../00-cadre.md (§2.4 point 3; §10 Réserves ouvertes); ../../../projets/P1-recrutement-verrouillage.md (§4.3 Fonction de choix de Deneubourg; §5 T1.1 à T1.3 et portes; §6 E1.5; §11 R1.2, R1.8); ../../10-glossaire.md (entrée fonction de choix)

### ST-08 · majeur · Projets 5 et 6 — interblocage par inhibition croisée

**Constat.** L'interblocage et sa levée sont des résultats de champ moyen (bifurcation en fourche en σ). Pais et al. 2013 excluent explicitement le bruit de population finie. Un modèle à agents fini casse la symétrie par fluctuation, donc l'interblocage observé dépendra de N et de l'horizon (inféré).

**Preuve.** Lu : https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0073216

**Recommandation.** Référence : EDO (RK4) et diagramme de bifurcation; version à N fini par SSA de Gillespie; définir l'interblocage comme l'absence de quorum avant T, en proportion sur M graines; montrer la dépendance à N.

**Disposition.** Modifié — La référence est l'EDO de champ moyen (RK4, balayage de σ, σ* = 4αγρ/(ρ−α)², cartes σ × Q avec issues décision, interblocage, scission), complétée par une version à N fini en SSA (N = 50 et 200, 200 graines) qui montre la dépendance à N (H5.3, E5.2); P6 classe les issues à l'horizon T (interblocage = aucun site au quorum). Adaptation : l'interblocage à N fini se mesure par P(|ΔΨ|/N > 0,3 à t = 40), la sortie de l'égalité, et non comme absence de quorum avant T. — Traité dans : ../../../projets/P5-decision-par-quorum.md (§3 H5.3; §5 T5.1 à T5.3; §6 E5.1, E5.2); ../../../projets/P6-defaillances-et-defenses.md (§3 H6.4; §6 E6.4; §5 T6.8, T6.10); ../../05-spec-simulation.md (§3.1 Tableau par projet, P5; §9.6 T0.7)

### ST-09 · majeur · Projet 3 — thermorégulation

**Constat.** Jones et al. 2004 rapporte un résultat empirique (colonies génétiquement diverses plus stables). Les modèles de simulation sont Graham et al. 2006 (1 vs 15 patrilignes) et Myerscough et Oldroyd 2004. La diversité porte sur les patrilignes, pas sur un tirage indépendant par abeille.

**Preuve.** Lu (résumés) : https://consensus.app/papers/details/3b6bf5096f0b5e1da11c631c054e338f/ ; https://consensus.app/papers/details/f4eb3dba35ee5a00a6138dc700152ebc/ ; https://consensus.app/papers/details/a89bfa75d6b55a28a094bd042e9e71d6/

**Recommandation.** Prendre Graham et al. 2006 comme cible (paramètres à relire); tirer les seuils par patriligne; un compartiment de température couplé aux agents.

**Disposition.** Accepté — Jones et al. 2004 est rangé comme résultat empirique et Graham et al. 2006 (1 contre 15 patrilignes, ventilation à 5) comme cible de simulation, avec Myerscough et Oldroyd 2004. Le modèle reconstruit tire les seuils par patriligne (θ_i = μ + η_patriligne + ε_i) et couple les agents à un compartiment de température; T3.11 et T3.12 restent non figées avant lecture des équations et paramètres. — Traité dans : ../../../projets/P3-division-du-travail.md (§3 H3.7; §4.5 Abeille, thermorégulation par seuils variés; §5 T3.11, T3.12; §6 E3.7; §11 R4); ../../../projets/P7-synthese-agentique.md (§4.2 S3 abeille, T7.18)

### ST-10 · majeur · Projet 6 — moulin et mimétisme

**Constat.** Couzin et al. 2002 est un modèle 3D de bancs de poissons et de vols d'oiseaux, sans phéromone : ce n'est pas un modèle de moulin de fourmis. Aucun modèle publié ni résultat quantitatif n'est cité pour le moulin ou le mimétisme chimique : le critère « reproduire un résultat publié » ne s'applique pas.

**Preuve.** Lu (résumé, Europe PMC) : DOI 10.1006/jtbi.2002.3065

**Recommandation.** Moulin : modèle à agents à suivi de piste (règle de Perna), Couzin 2002 présenté comme analogue; chercher un modèle publié de moulin à phéromone. Mimétisme : modèle de reconnaissance par gabarit, déclaré exploratoire.

**Disposition.** Modifié — Couzin et al. 2002 devient un contrepoint (poissons et oiseaux 3D, sans phéromone, T9.9 et docking Vicsek T9.19) et le moulin de fourmis est porté par Couzin et Franks 2003 (suivi de piste) et Erhard et al. 2022, exécutés par P9; le mimétisme chimique relève d'un modèle simplifié de reconnaissance par gabarit (F7), déclaré exploratoire et sans cible chiffrée. Adaptation : un modèle publié de moulin à phéromone a été trouvé, donc la règle de Perna n'est pas employée. — Traité dans : ../../00-cadre.md (§2.4 point 2); ../../../projets/P9-mouvement-collectif-et-construction.md (§4.1 Couzin et Franks 2003; §4.2 Contrepoint, Couzin et al. 2002; §5.1 T9.1, T9.2, T9.9; §5.3 T9.19); ../../../projets/P6-defaillances-et-defenses.md (§2 Corrections de la v3; §4.1 F1, F3, F7; §6 E6.6); ../../02-architecture-programme.md (§3 Correspondance v3 vers v4)

### ST-11 · majeur · Projet 2 — ACO sur Oliver30

**Constat.** Ni source de coordonnées ni protocole. D'après Dorigo 1996 : Oliver30 vient de Whitley et al. 1989; tournée de 423,741 en réel et 420 en entier; α=1, β=5, ρ=0,5, Q=100, m=n=30, NCmax=5000, 10 essais; moyenne 424,250. L'atteinte systématique de 423,741 se fait avec la stratégie élitiste (e=8).

**Preuve.** Lu (texte intégral) : http://www.sci.brooklyn.cuny.edu/~sklar/teaching/f05/alife/papers/dorigo-96ant.pdf

**Recommandation.** Valider les coordonnées en recalculant la tournée publiée (423,741 / 420); cibles : moyenne ≈ 424,25 sur 10 graines et taux d'atteinte en élitiste; exécuter sous Node.

**Disposition.** Accepté — T2.1 recalcule la tournée publiée d'Oliver30 (423,741 en réel, 420 en entier; coordonnées de Dower avec somme de contrôle) et bloque T2.2 à T2.7 tant qu'elle échoue; T2.2 vise la moyenne ≈ 424,25 (α = 1, β = 5, ρ = 0,5 au sens de 1996, m = n = 30, 5000 cycles) et T2.3 le taux d'atteinte en élitiste (e = 8), le tout exécuté sous Node. L'écart d'échelle est de 30 essais au lieu de 10 (puissance), et le pilote ne reproduit pas T2.3(b). — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§4.4 Ant System, instance Oliver30; §5 T2.1, T2.2, T2.3; §9 Plan de simulation); ../../05-spec-simulation.md (§3.1 Tableau par projet, P2)

### ST-12 · majeur · Projet 2 — ABC

**Constat.** Le TR06 teste Sphere 5D, Rosenbrock 2D [±2,048] et Rastrigin 10D sur [−600, 600] (domaine atypique), avec essaim de 20, limit = observatrices × D, 2000 cycles, 30 exécutions. Le visuel 2D ne correspond au protocole publié que pour Rosenbrock. Karaboga et Basturk 2007 n'a pas pu être relu.

**Preuve.** Lu (texte intégral) : https://abc.erciyes.edu.tr/pub/tr06_2005.pdf

**Recommandation.** Reproduire exactement le tableau 3 du TR06 sous Node; Rosenbrock 2D comme cas publié, Rastrigin 2D étiqueté « illustration non publiée ».

**Disposition.** Modifié — T2.10 reprend le tableau 3 du rapport TR06 avec Rosenbrock 2D comme seul critère (valeur publiée 0,002234 ± 0,002645, priorité basse); la cible principale d'ABC est la Table 3 de Karaboga et Basturk 2008 (T2.8, Rastrigin 50D). Adaptation : Sphère 5D et Rastrigin 10D [−600, 600] du TR06 ne sont pas retenues comme critères et le visuel 2D (V5) est déclaré Modèle simplifié plutôt qu'« illustration non publiée »; Karaboga et Basturk 2007 reste non lu. — Traité dans : ../../../projets/P2-memoire-partagee-metaheuristiques.md (§4.7 Artificial Bee Colony; §5 T2.8, T2.10; §8.1 Voir, V5; §10 L7; §11 R2)

### ST-13 · majeur · Technique — chaîne TypeScript

**Constat.** Node exécute le .ts (type stripping par défaut depuis v23.6, stable depuis v24.12/v25.2), pas le navigateur, alors qu'un artifact doit être un HTML autonome. Le stripping interdit enum, namespace, parameter properties et décorateurs, impose les extensions .ts et import type, et ignore tsconfig.

**Preuve.** Lu : https://nodejs.org/api/typescript.html ; https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html ; https://esbuild.github.io/content-types/

**Recommandation.** tsconfig : noEmit, erasableSyntaxOnly, verbatimModuleSyntax. Build navigateur : esbuild --bundle --format=iife, JS injecté dans le HTML; tsc --noEmit en CI (esbuild ne vérifie pas les types). Frontière d'outillage justifiée par l'artifact.

**Disposition.** Accepté — Node exécute le .ts sans build et tsc --noEmit vérifie les types (strict, erasableSyntaxOnly, verbatimModuleSyntax, allowImportingTsExtensions), avec deux configurations dont une sans types Node pour le noyau; les contraintes du type stripping (pas d'enum ni de namespace avec code, imports en .ts) sont énoncées. La page se construit par esbuild --bundle --format=iife avec injection dans le HTML, présentée comme frontière d'outillage et non de langage, et tsc reste obligatoire car esbuild ne vérifie pas les types. — Traité dans : ../../05-spec-simulation.md (§13 Outillage minimal; §12 SPK12; §16.1 Prérequis); ../../00-cadre.md (§7 Architecture de simulation); ../../../projets/S0-socle.md (§11 R0.13)

### ST-14 · majeur · Technique — performance navigateur et artifacts

**Constat.** Aucune architecture de performance. Inconnues non vérifiées : isolation cross-origin des pages claude.ai (nécessaire à SharedArrayBuffer) et CSP pour les workers blob:. OffscreenCanvas est disponible partout depuis mars 2023; le transfert d'ArrayBuffer est sans copie.

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer ; https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects

**Recommandation.** Tableaux typés en structure de tableaux, un seul putImageData pour les champs, simulation en worker avec transfert de tampons, WebGL seulement sur mesure. Spike d'une demi-journée (worker blob:, 10⁴/10⁵ agents, downloads) avant le projet 1.

**Disposition.** Accepté — Les agents sont en structure de tableaux typés avec simulation en worker et transfert de tampons (sans SharedArrayBuffer), et un spike de la phase 0 mesure le worker blob:, le transfert, le rendu à 10⁴ et 10⁵ agents (Canvas, putImageData, OffscreenCanvas, WebGL seulement si les précédents échouent) et les téléchargements, y compris crossOriginIsolated. WASM n'entre que selon une règle de décision fondée sur mesure. — Traité dans : ../../05-spec-simulation.md (§3.2 Règles par type, AGT; §11 Budgets de performance, règle de décision pour WASM; §12 Spike de la phase 0, SPK2 à SPK5, SPK9); ../../../projets/S0-socle.md (§6 E0.4; §9 Budgets de performance)

### ST-15 · majeur · Format — export et rejouabilité

**Constat.** Ni export ni manifeste de run. Dans un artifact, offrir un fichier exige la capacité downloads (avec confirmation du visiteur); le stockage partagé exige db (avec quotas).

**Preuve.** Lu : définitions de types 0.2.66 (downloads.d.ts, db.d.ts) de l'outil Artifact

**Recommandation.** Manifeste JSON (modèle, hachage git, scénario complet, graine, dt, ordre de mise à jour, moteur JS) + séries CSV; manifeste + graine = rejeu complet sur le même moteur; bouton d'export via downloads, masqué si indisponible.

**Disposition.** Accepté — Un manifeste JSON par run (modèle, commit git, scénario compilé, graine, dt, ordre de mise à jour, moteur JS, empreintes, SHA-256 des sorties) plus des séries CSV : manifeste et graine rejouent un modèle déterministe sur le même moteur. L'export passe par la capacité downloads sous artifact (refus du visiteur sans erreur) ou Blob et lien download sur page statique, et le bouton est masqué si aucune voie n'existe (SPK7). — Traité dans : ../../05-spec-simulation.md (§4.9 Manifeste de run; §8.1 Séries; §8.5 Export depuis une page; §12 SPK7; §15 Rejouabilité)

### ST-16 · majeur · Critère de rigueur — tests

**Constat.** Ni harnais de tests de reproduction, ni critères d'acceptation chiffrés, ni numérisation des figures publiées.

**Preuve.** Lu : https://nodejs.org/api/test.html

**Recommandation.** node:test (stable depuis v20, ramasse *.test.ts par défaut) : tests statistiques sur N graines avec seuils écrits d'avance, traces dorées en snapshot (stable depuis v23.4), figures numérisées en CSV avec erreur de reproduction; CI tsc --noEmit + node --test; réplications sous Node, résumés précalculés pour les pages.

**Disposition.** Accepté — Le harnais repose sur node:test (npm run verify : tsc --noEmit sur deux configurations, node --test, vérifications documentaires), avec des cibles exécutables targets/<projet>/T<projet>.<n>.json aux critères et marges écrits avant le code, une garde de puissance qui refuse un TOST sous-dimensionné, des traces dorées en snapshot et des figures numérisées en CSV avec incertitude de lecture et erreur de reproduction (RMSE ou distance de forme). Les réplications sortent du moteur headless Node et les pages reçoivent des résumés précalculés. — Traité dans : ../../05-spec-simulation.md (§9.1 Niveaux; §9.2 Tests de reproduction pilotés par les fiches; §9.3 Tolérances; §9.4 Traces dorées; §8.3; §8.4 Figures publiées numérisées); ../../04-protocole-reproduction.md (§3 Fiche de reproduction; §5 Équivalence : TOST; §7.2 Portes)

### ST-17 · majeur · Projet 4 — régulation

**Constat.** Prabhakar 2012 : α_n = max(α_{n−1} − qD_{n−1} + cA_n − d, α_min), D_n ~ Poisson, c ajusté par essai sur 62 essais; il faut donc les données observées, dont la disponibilité n'est pas vérifiée. La file des abeilles (Seeley et Tovey 1994) appelle une simulation à événements discrets. La loi de Little ne vaut qu'en régime stationnaire, alors que la v3 l'applique au rééquilibrage (inféré).

**Preuve.** Lu : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 ; notice Crossref DOI 10.1006/anbe.1994.1044

**Recommandation.** Ajouter un moteur à événements discrets au noyau; demander les données aux auteurs ou les numériser; présenter Little comme rapprochement en moyenne, vérifié sur fenêtre glissante.

**Disposition.** Accepté — Un moteur à événements discrets (tas binaire, ordre d'insertion) est ajouté au noyau et porte les files butineuses-receveuses; les données de Prabhakar et al. 2012 (créneau, c_P, séries brutes non publiés) sont à demander au laboratoire Gordon ou à numériser (fig. 2 et 3), avec cibles T4.2 et T4.3 provisoires. La loi de Little est traitée comme identité vérifiée sur fenêtres (T4.12, écart < 2 % sur fenêtres ≥ 100 W), sans revendication de nouveauté, avec la réserve que la relation exacte vaut sur un intervalle fini. — Traité dans : ../../05-spec-simulation.md (§3.1 Tableau par projet, P4; §4.5 Événements discrets); ../../../projets/P4-regulation-sans-vue-densemble.md (§2 Positionnement; §4.1; §4.4; §4.9 Deux files, une identité (Little); §5 T4.2, T4.3, T4.12; §9.5 Sorties; §11 R42, R44)

### ST-18 · majeur · Projet 7 — coûts

**Constat.** Aucun budget. Tarifs vérifiés ($/MTok, entrée/sortie) : Haiku 4.5 1/5, Sonnet 5.5 2/10, Opus 5.5 4/20, Fable 5.1 10/50. Hypothèse de 300 000 appels par modèle (1 500 jetons en entrée, 150 en sortie) : ~675 $, 1 350 $, 2 700 $, 6 750 $ avant Batch. Les jetons de réflexion, facturés en sortie, peuvent ajouter des milliers de dollars (inféré).

**Preuve.** Lu : https://platform.claude.com/docs/en/about-claude/pricing ; calcul inféré

**Recommandation.** Pilote à 1 % pour mesurer les jetons réels; plafond par bras; cache du préfixe stable vérifié par usage.cache_read_input_tokens; effort low/medium fixé et consigné; Batch −50 %, cumulable avec le cache.

**Disposition.** Accepté — Le budget est chiffré par bloc (≈ 4 304 $ en standard, plafond ×1,30; ≈ 2 152 $ en lot, cumul lot et cache [à confirmer]), avec pilote à 1 % prélevé sur l'enveloppe, plafond par bras appliqué par un interrupteur automatique, cache du préfixe stable contrôlé par usage.cache_read_input_tokens, et effort fixé et consigné (low ou medium selon le modèle). Un ordre de coupe est prévu si le coût mesuré dépasse de plus de 30 % le coût planifié. — Traité dans : ../../../projets/P7-synthese-agentique.md (§9.3 Hypothèses de coût et coût par run; §9.6 Cache; §9.7 Budget en dollars, plafonds, pilote à 1 %; §11.4 Plan B et ordre de coupe); ../../09-feuille-de-route.md (§6.3 Coût d'API de P7)

### ST-19 · majeur · Projet 7 — Batch vs pas à pas

**Constat.** Un lot se termine le plus souvent en moins d'une heure mais peut prendre jusqu'à 24 h; résultats dans un ordre quelconque, conservés 29 jours. Une simulation de 100 pas dépendants pourrait prendre des jours (inféré).

**Preuve.** Lu : https://platform.claude.com/docs/en/build-with-claude/batch-processing

**Recommandation.** Lots synchronisés : un lot par pas regroupant toutes les répétitions et toutes les cellules, appariés par custom_id; sinon API interactive avec limiteur de concurrence. Inscrire le choix dans le protocole.

**Disposition.** Accepté — Le mode lot synchronisé est la voie de production : un lot par tour réunit tous les agents de toutes les répétitions de toutes les cellules du bloc (30 lots successifs), résultats appariés par custom_id, limites et expiration à 24 h notées. L'API standard avec limiteur de concurrence sert au développement, aux pilotes et à E7.9, et de repli si les lots sont trop lents; le choix est inscrit dans la fiche P7, qui tient lieu de spécification expérimentale. — Traité dans : ../../../projets/P7-synthese-agentique.md (§9.6 Exécution et budgets de performance, mode lot synchronisé; §11.4 point 7; §6.3 E7.9); ../../09-feuille-de-route.md (§7 R202)

### ST-20 · majeur · Projet 7 — journalisation et rejeu

**Constat.** « Rejouant les journaux » sans format, ni clé de rejeu, ni archivage.

**Preuve.** Inféré; contrainte tool_choice lue dans la référence claude-api

**Recommandation.** JSONL par appel (run, scénario, graine, pas, agent, modèle demandé, response.model, effort, requête et réponse complètes, usage, coût, latence, version du SDK); rejeu par cassette indexé par le hachage de la requête (détecte aussi les divergences du moteur); sorties structurées (tool_choice forcé refusé sur 5.5); archivage avec DOI hors git; les pages rejouent sans appeler l'API.

**Disposition.** Accepté — Un enregistrement JSONL par appel (LlmCallRecord : run, hachage du scénario, graine, pas, agent, modèle demandé, response.model, effort, requête et réponse complètes, usage, coût, latence, version du SDK), rejeu par cassette indexé par (run, pas, agent, hachage de requête) qui détecte aussi les divergences du moteur, sorties structurées au même schéma d'action (tool_choice forcé refusé sur les modèles 5.5), archivage compressé hors git avec DOI par campagne. Les pages rejouent les journaux et n'appellent jamais l'API. — Traité dans : ../../05-spec-simulation.md (§5 Interfaces, LlmCallRecord; §8.6 Journal LLM; §15 Rejouabilité); ../../../projets/P7-synthese-agentique.md (§9.3 Contrôles de plateforme; §9.4 Journal JSONL, cassette, rejeu; §9.5); ../../08-science-ouverte-ethique.md (§6 Journaux LLM : archivage; §6.4)

### ST-21 · mineur · Projet 2 — formule d'évaporation

**Constat.** Dorigo 1996 écrit τ(t+n) = ρ·τ(t) + Δτ, où ρ est la persistance; la v3 utilise ρ comme évaporation. Les deux coïncident à 0,5, pas à 0,99.

**Preuve.** Lu : texte intégral de Dorigo 1996

**Recommandation.** Déclarer la convention de ρ dans le scénario.

**Disposition.** Accepté — La convention de ρ est déclarée : persistance au sens de 1996 (τ ← ρτ + Δτ), évaporation = 1 − persistance; le paramètre se nomme « persistance » dans le code et un test unitaire vérifie la divergence à 0,99. La correction figure au cadre et la convention est déclarée au scénario du moteur. — Traité dans : ../../00-cadre.md (§2.4 point 4); ../../../projets/P2-memoire-partagee-metaheuristiques.md (§2 Corrections de la v3; §4.3 Convention de ρ; §10 L4); ../../05-spec-simulation.md (§3.2 META); ../../../projets/S0-socle.md (§9 Plan de simulation, T0.29)

### ST-22 · mineur · Projet 4 — « analogue à TCP »

**Constat.** Le texte de Prabhakar et al. 2012 ne mentionne ni TCP ni Internet, seulement « computer networks » de façon générale.

**Preuve.** Lu (via l'outil de récupération) : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670

**Recommandation.** Attribuer l'analogie TCP à sa vraie source, ou la présenter comme rapprochement de l'auteur.

**Disposition.** Accepté — L'analogie TCP est attribuée à sa source (communiqué de Stanford, Carey 2012, et Gordon 2014), l'article de Prabhakar et al. 2012 n'en parlant pas; elle est énoncée comme Analogie d'auto-cadencement, et Gordon 2010 n'est pas cité pour TCP. — Traité dans : ../../00-cadre.md (§2.4 point 5); ../../../projets/P4-regulation-sans-vue-densemble.md (§2 Positionnement et Corrections de la v3; §7.2 Relations; §11 R50, R53)

### ST-23 · mineur · Projet 2 — contraste combinatoire vs continu

**Constat.** Le contraste tient au choix des algorithmes : des variantes continues d'ACO (ACO_R) et combinatoires d'algorithmes d'abeilles existent.

**Preuve.** Non vérifié en ligne (budget de recherche épuisé)

**Recommandation.** Le formuler comme un artefact du choix d'algorithmes, pas comme une propriété des mécanismes.

**Disposition.** Accepté — « Piste = chemin, danse = lieu » est réfuté comme frontière algorithmique (ACO_R en continu, ABC combinatoire) et remplacé par la granularité de la mémoire partagée; la fiche teste le contraste TSP contre continu comme régularité de performance (H2.1), donc comme effet du choix d'algorithmes et non propriété des mécanismes. — Traité dans : ../../00-cadre.md (§2.4 point 15); ../../../projets/P2-memoire-partagee-metaheuristiques.md (§1 Objet; §2 Thèse remplacée : granularité de la mémoire partagée; §3 H2.1)

### ST-24 · mineur · Technique — précision des champs

**Constat.** En Float32, les petits dépôts sont absorbés et l'évaporation répétée produit des sous-normaux.

**Preuve.** Inféré

**Recommandation.** Seuil ε sous lequel on met à zéro; Float64 si le test de convergence l'exige.

**Disposition.** Accepté — Les champs sont en Float64 par défaut; Float32 n'est admis qu'après un test de convergence. L'évaporation remet à zéro sous un seuil ε déclaré, ce qui évite les sous-normaux. — Traité dans : ../../05-spec-simulation.md (§4.6 Grille; §7.5 Précision numérique)

### ST-25 · mineur · Format — écran partagé

**Constat.** Échelles de temps et d'espace incompatibles entre espèces : l'affichage côte à côte suggère des vitesses relatives fausses.

**Preuve.** Inféré

**Recommandation.** Synchroniser sur un temps normalisé (temps de décision médian = 1) et l'afficher.

**Disposition.** Modifié — L'écran partagé donne à chaque espèce sa barre d'échelle et son horloge avec la mention « échelles différentes », superpose les courbes sur un axe commun normalisé (fraction de la colonie), et le facteur d'affichage du temps (displayTimeScale) est déclaré au scénario et montré à l'écran, jamais calculé dans la simulation. Adaptation : le temps n'est pas normalisé sur le temps de décision médian (= 1); il reste en unités naturelles, le facteur d'affichage s'y ajoutant. — Traité dans : ../../07-vulgarisation-evaluation.md (§4.2 Zones de la page, Z1 et Z2; §4.10 Disposition, échelles et mobile); ../../05-spec-simulation.md (§5 Interfaces, Scenario; §14 Normaliser le temps d'un écran partagé); ../../../projets/P1-recrutement-verrouillage.md (§8 V4)

### ST-26 · mineur · Projet 7 — fallback et refus

**Constat.** La référence claude-api recommande d'activer fallbacks par défaut, ce qui substituerait un autre modèle en cours d'expérience.

**Preuve.** Lu : référence claude-api

**Recommandation.** Désactiver fallbacks; consigner stop_reason refusal comme donnée (utile au projet 6).

**Disposition.** Accepté — Les replis côté serveur (fallbacks) sont désactivés, avec test de non-régression, et stop_reason « refusal » est codé comme issue (REFUS) et consigné au registre des refus avec analyse de sensibilité; le volet LLM de P6 reprend les issues décision, interblocage, scission, refus. — Traité dans : ../../../projets/P7-synthese-agentique.md (§9.3 Contrôles de plateforme; §11.1 R74, R75; §11.2 Issues d'un run); ../../04-protocole-reproduction.md (§13.1 Refus et basculements; §13.3); ../../08-science-ouverte-ethique.md (§6.3 Confidentialité et conditions, refus de classifieurs); ../../../projets/P6-defaillances-et-defenses.md (§6 E6.5)

### ST-27 · mineur · Format — appels LLM depuis une page

**Constat.** La capacité sample d'un artifact choisit un modelTier, peut servir un palier moins cher et facture le visiteur : pas de modèle fixé.

**Preuve.** Lu : sample.d.ts (contrat 0.2.66)

**Recommandation.** Réserver sample aux démonstrations étiquetées; les données viennent du script Node.

**Disposition.** Modifié — La capacité sample est interdite pour produire des données (elle ne fixe pas le modèle) : les pages rejouent des journaux, les données viennent du moteur headless Node et aucune page n'appelle l'API. Adaptation : l'interdiction est plus stricte que la recommandation, et la réservation de sample à des démonstrations étiquetées n'est pas écrite. — Traité dans : ../../05-spec-simulation.md (§14 Ce que la couche navigateur ne doit jamais faire; §8.6 Journal LLM; §1 Règles directrices, règle 9); ../../../projets/P7-synthese-agentique.md (§8 Visuels et trois niveaux)

### ST-28 · mineur · Format — taille d'artifact

**Constat.** Une page est limitée à 16 Mo; les résumés précalculés doivent y tenir.

**Preuve.** Lu : description de l'outil Artifact

**Recommandation.** Agrégats en JSON, ou capacité assets.

**Disposition.** Accepté — Une page doit tenir dans 16 Mo; les résumés précalculés sont des agrégats JSON (preregisteredN, graine rejouée, cellules avec n, moyenne, ES, IC) et, au-delà, des fichiers de support ou la capacité assets. SPK9 mesure la taille du bundle et de la page. — Traité dans : ../../05-spec-simulation.md (§8.3 Résumés précalculés pour les pages; §12 SPK9); ../../../projets/S0-socle.md (§6 E0.4, contrôle v)

### ST-29 · mineur · Projet 7 — grille 2 × 4

**Constat.** Règle simple et LLM doivent recevoir la même observation et rendre une action du même type, sinon les cellules ne sont pas comparables.

**Preuve.** Inféré

**Recommandation.** Interface unique decide(observation) → action, implantée par règle, LLM et cassette.

**Disposition.** Accepté — Une interface unique Policy.decide(obs, ctx) → action est implantée par la règle, le LLM et la cassette, avec la même observation sérialisée; E7.4 ajoute la condition LLM-RÈGLE et le témoin orchestré suit la même interface. — Traité dans : ../../05-spec-simulation.md (§5 Interfaces, Policy; §8.6); ../../../projets/S0-socle.md (§7 Témoin orchestré); ../../../projets/P7-synthese-agentique.md (§4.3 Modèle chorégraphique commun; §6.3 E7.4; §9.1); ../../04-protocole-reproduction.md (§12.4 Politique LLM contre règle); ../../../projets/P1-recrutement-verrouillage.md (§6 E1.7)

## Ajouts recommandés

### ST-A01 · ajout

Phase 0 « noyau et spike » avant le projet 1 : PRNG à graine, horloge à pas fixe, RK4, SSA de Gillespie, moteur à événements discrets, grille, enregistreur, scénario, harnais node:test; spike d'artifact (worker blob:, transfert de tampons, downloads, 10⁴/10⁵ agents).

**Disposition.** Accepté — La phase 0 (S0) précède P1 et contient le noyau (PRNG, horloge, RK4, SSA, événements discrets, grille, enregistreur, scénario, manifeste), le harnais node:test et un spike de 12 vérifications (worker blob:, transfert de tampons, téléchargements, 10⁴ et 10⁵ agents); aucun code de P1 n'est écrit avant la porte de sortie GF4. — Traité dans : ../../05-spec-simulation.md (§12 Spike de la phase 0; §16.3 Critères d'achèvement de S0); ../../../projets/S0-socle.md (§1 Objet, lots A à I; §6 E0.4; §12 Effort et dépendances); ../../09-feuille-de-route.md (§2.1 Phase 0 : socle; §5.1 GF4)

### ST-A02 · ajout

Fiche de reproduction par article : équations, paramètres, unités, protocole, figure cible numérisée (CSV), critère d'acceptation chiffré écrit avant de coder.

**Disposition.** Accepté — Chaque cible a sa fiche de reproduction (équations, paramètres, unités, protocole, figure numérisée en CSV, critère chiffré, marge, répétitions, règle de décision) rédigée et gelée avant le premier commit du modèle, vérifiable par git log. — Traité dans : ../../00-cadre.md (§6 Principes de rigueur, principe 2); ../../04-protocole-reproduction.md (§3 Fiche de reproduction : règles et gabarit; §7.2 Portes); ../../05-spec-simulation.md (§8.4 Figures publiées numérisées; §9.2); ../../../projets/P7-synthese-agentique.md (§10 L1)

### ST-A03 · ajout

Docking systématique entre le modèle chorégraphique commun et chaque modèle de référence.

**Disposition.** Accepté — Le modèle chorégraphique commun est aligné par docking sur chaque référence avant usage (réduire à la référence, ajouter un composant du canal à la fois), et chaque fiche porte son tableau de docking; l'exception déclarée est le docking D2 de P2, qui peut être jugé non applicable. — Traité dans : ../../00-cadre.md (§6 principe 6; §7); ../../04-protocole-reproduction.md (§12 Docking); ../../05-spec-simulation.md (§2.4 Docking; §9.5 Docking); ../../../projets/P1-recrutement-verrouillage.md (§9 Docking, D1 à D4); ../../../projets/P7-synthese-agentique.md (§5 Tableau B, T7.15 à T7.20); ../../../projets/P2-memoire-partagee-metaheuristiques.md (§9 Docking; §11 R11)

### ST-A04 · ajout

Manifeste de run standard (modèle, hachage git, scénario, graine, dt, ordre de mise à jour, moteur JS) et export CSV/JSON via la capacité downloads.

**Disposition.** Accepté — Le manifeste de run standard (modèle, commit git, scénario, graine, dt, ordre de mise à jour, moteur JS) et l'export CSV et JSON via downloads, ou Blob sur page statique, sont spécifiés, avec bouton masqué si la voie manque. — Traité dans : ../../05-spec-simulation.md (§4.9 Manifeste de run; §8.1; §8.5 Export depuis une page; §12 SPK7)

### ST-A05 · ajout

Balayages paramétriques headless (Node, worker_threads) pour les diagrammes de phases et l'analyse de sensibilité, y compris à l'ordre de mise à jour et à la taille N.

**Disposition.** Accepté — Les balayages sont toujours headless sous Node avec worker_threads, résultat indépendant du nombre de travailleurs (test d'agrégation, SPK11), diagrammes de phases et d'hystérésis, et analyse de sensibilité (OFAT, Morris, Sobol') où l'ordre de mise à jour est un facteur catégoriel; la taille N est balayée projet par projet (P5 E5.2). — Traité dans : ../../05-spec-simulation.md (§10 Balayages paramétriques et diagrammes de phases, §10.1 à §10.4; §12 SPK11); ../../../projets/P5-decision-par-quorum.md (§6 E5.2)

### ST-A06 · ajout

Projet 7 : pilote à 1 % avec budget par bras, collecte prioritaire de Haiku 4.5, journal JSONL, rejeu par cassette, sorties structurées, fallbacks désactivés, archivage avec DOI.

**Disposition.** Modifié — P7 prévoit le pilote à 1 % avec plafond par bras, le journal JSONL, le rejeu par cassette, les sorties structurées, les fallbacks désactivés et l'archivage à DOI, et fixe Haiku 4.5 comme bloc à collecter en premier. Adaptation : cette collecte prioritaire est conditionnelle, car la chaîne amont (≈ 14 sem.-pers. dans P7 seul, 51,5 avec S0, P1, P5, P3 et P8) ne tient pas avant le retrait possible du 2026-10-15 et la décision D18 ou GF1 reste ouverte, avec perte déclarée par défaut. — Traité dans : ../../../projets/P7-synthese-agentique.md (§9.3; §9.4; §9.7; §11.4 Plan B et ordre de coupe; §11.5 Tensions et décisions; §12 Chemin critique); ../../02-architecture-programme.md (§7 D18; §8 IC1); ../../09-feuille-de-route.md (§5.1 GF1); ../../08-science-ouverte-ethique.md (§6)

### ST-A07 · ajout

Matrice concept × espèce × type de modèle × source vérifiée × cible, maintenue comme document de pilotage du programme.

**Disposition.** Accepté — La matrice concept × espèce × type de modèle × source × cible est tenue comme document de pilotage : fichier donnees/matrice.csv de S0 (colonnes figées, parité, validateur), matrice de traçabilité de l'architecture (190 cibles, contrôle par script) et matrice QR, hypothèses, cibles du plan de recherche. — Traité dans : ../../../projets/S0-socle.md (§4.5 Matrice concept × espèce × type de modèle × source × cible); ../../02-architecture-programme.md (§4 Matrice de traçabilité; §11 Contrôles); ../../03-plan-de-recherche.md (§4 Matrice de traçabilité)


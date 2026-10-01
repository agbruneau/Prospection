# Constats — Simulation et technique

Source : [rapport complet](simulation-technique.md). 29 constats (3 critiques, 17 majeurs, 9 mineurs) et 7 ajouts recommandés. La ligne **Disposition** de chaque entrée dit où et comment le programme v4 en tient compte.

**Verdict de l’auditeur.** La v3 est faisable en TypeScript + Canvas, mais « un seul moteur avec deux espèces interchangeables » contredit son propre critère de rigueur. Les résultats à reproduire viennent de modèles de types différents : EDO (Camazine et Sneyd 1991), Monte Carlo de choix (Goss/Deneubourg), Poisson à temps discret (Prabhakar 2012), champ moyen bruité (Pais 2013), modèle à agents (Pratt 2005), métaheuristiques (Dorigo 1996, Karaboga 2005). Il faut donc un noyau commun mince (graine, horloge, enregistreur, scénario, tests) et un modèle de référence fidèle par article; le modèle spatial commun devient une extension validée par docking. Deux cibles sont fausses ou absentes : Wilson 1984 dit l'inverse de la v3 (ce sont les majors qui prennent la relève), et Couzin 2002 est un modèle 3D de poissons et d'oiseaux, sans phéromone. Le projet 7 n'est pas reproductible au sens fort : temperature est refusée sur les modèles 4.7 et suivants, Haiku 4.5 a une date de retrait possible au 15 octobre 2026, et l'axe « capacité » confond génération, tokenizer et réflexion. Il lui faut un journal JSONL complet, un rejeu par cassette, un budget chiffré et des répétitions.

## Constats

### ST-01 · critique · Technique et parcours (« un seul moteur »)

**Constat.** Les résultats publiés ciblés reposent sur des modèles hétérogènes (EDO, Monte Carlo, Poisson discret, champ moyen, modèle à agents, métaheuristique). Un moteur spatial unique produirait d'autres modèles, et l'écart à la figure publiée ne mesurerait plus la fidélité. Les échelles spatiales fourmi/abeille sont aussi incompatibles (inféré).

**Preuve.** Lu : https://consensus.app/papers/details/0f69a4a7b3cf5fbfbe26efc5d46aea0f/ (« system of non-linear differential equations »); https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 (« discrete time »); https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0073216

**Recommandation.** Trois couches : noyau commun (PRNG, horloge à pas fixe, RK4, SSA, événements discrets, grille, enregistreur, scénario), modèle de référence par article validé contre la figure publiée, modèle chorégraphique commun (seul le canal est interchangeable) validé par docking.

**Disposition.** _à renseigner_

### ST-02 · critique · Projet 3 — À reproduire

**Constat.** « Les petites ouvrières prennent la relève » inverse Wilson 1984 : quand on retire des minors, ce sont les majors qui élargissent leur répertoire (×1,4 à 4,5) et leur activité (×15 à 30) et rétablissent au moins 75 % de l'activité manquante. Le test d'acceptation validerait un modèle faux.

**Preuve.** Lu (résumé éditeur) : https://link.springer.com/article/10.1007/BF00293108 ; https://consensus.app/papers/details/fad8697e1c785517a81459bc5ef5de5c/

**Recommandation.** Corriger la cible (retrait des minors → activation des majors à seuils élevés) et reproduire la figure de Bonabeau et al. 1996 après lecture du texte intégral.

**Disposition.** _à renseigner_

### ST-03 · critique · Projet 7 — axe capacité (règle, Haiku, Sonnet, Opus)

**Constat.** L'axe confond génération (Haiku 4.5 de 2025 vs 5.5 de 2026), tokenizer (~30 % de jetons en plus à partir de 4.7), réflexion (non désactivable sur Opus 5.5, effort medium par défaut; high sur Sonnet 5.5) et échantillonnage (temperature non par défaut → erreur 400 à partir de 4.7). Fable 5.1, le plus capable, est absent. Retrait de Haiku 4.5 possible dès le 15 octobre 2026; la documentation admet que les chercheurs perdent l'accès aux modèles.

**Preuve.** Lu : https://platform.claude.com/docs/en/about-claude/model-deprecations ; https://platform.claude.com/docs/en/about-claude/pricing

**Recommandation.** Échelle de niveaux dans une même génération (Sonnet 5.5, Opus 5.5, Fable 5.1) avec effort fixé et consigné; Haiku 4.5 comme point historique, à collecter en premier; consigner response.model; mesurer la variance par répétitions; dire que l'expérience reste rejouable mais pas ré-exécutable.

**Disposition.** _à renseigner_

### ST-04 · majeur · Technique — déterminisme

**Constat.** Aucun PRNG à graine prévu. Math.random n'accepte pas de graine, et la précision des fonctions Math dépend du moteur, du système et de l'architecture : une trace calculée sous Node peut diverger dans Firefox ou Safari.

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random ; https://prng.di.unimi.it/

**Recommandation.** xoshiro128** initialisé par SplitMix64, un flux par sous-système; multiplications au lieu de Math.pow à exposant entier; constantes dérivées précalculées sous Node et écrites comme littéraux dans le scénario; traces dorées propres à un moteur, critères statistiques valides partout.

**Disposition.** _à renseigner_

### ST-05 · majeur · Technique — pas de temps, unités, ordre de mise à jour

**Constat.** Rien n'est spécifié. requestAnimationFrame suit la fréquence de l'écran et s'arrête dans les onglets en arrière-plan; une évaporation « par pas » dépend de dt; synchrone vs asynchrone change les résultats (Huberman et Glance 1993).

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame ; https://gafferongames.com/post/fix_your_timestep/ ; DOI 10.1073/pnas.90.16.7716 (résumé Europe PMC)

**Recommandation.** Pas fixe avec accumulateur, découplé du rendu; paramètres en unités physiques (demi-vie) convertis au chargement; ordre de mise à jour déclaré dans le scénario et testé en sensibilité; expériences guidées hors requestAnimationFrame.

**Disposition.** _à renseigner_

### ST-06 · majeur · Projets 1 et 6 — diffusion et évaporation

**Constat.** La discrétisation du champ n'est pas traitée. Le schéma explicite FTCS en 2D exige r = DΔt/Δx² ≤ 1/4. Dépôt au plus proche voisin → anisotropie; risque de sous-normaux (inféré).

**Preuve.** Lu (source secondaire) : https://en.wikipedia.org/wiki/FTCS_scheme

**Recommandation.** Évaporation exacte; diffusion seulement si le modèle l'exige, avec contrôle de r au chargement; dépôt et capteurs bilinéaires; test de convergence en grille (Δx vs Δx/2).

**Disposition.** _à renseigner_

### ST-07 · majeur · Projet 1 — fonction de Deneubourg

**Constat.** La fonction de choix non linéaire est un ajustement au niveau colonie. Perna et al. 2012 mesurent une réponse individuelle proportionnelle (loi de Weber sur l'angle de virage), « in apparent contradiction » avec cette fonction. L'employer comme règle de chaque fourmi mélange les niveaux. k = 20 et n = 2 n'ont pas pu être relus dans les articles d'origine.

**Preuve.** Lu (résumé) : https://arxiv.org/abs/1201.5827 ; Goss 1989 et Deneubourg 1990 non relus

**Recommandation.** Référence : Monte Carlo de la fonction de choix, comme dans les articles d'origine. Modèle spatial : règle de Perna, avec la non-linéarité colonie comme sortie à comparer. Relire le protocole de Goss et al. 1989 (branche courte ajoutée tard) avant d'écrire le test.

**Disposition.** _à renseigner_

### ST-08 · majeur · Projets 5 et 6 — interblocage par inhibition croisée

**Constat.** L'interblocage et sa levée sont des résultats de champ moyen (bifurcation en fourche en σ). Pais et al. 2013 excluent explicitement le bruit de population finie. Un modèle à agents fini casse la symétrie par fluctuation, donc l'interblocage observé dépendra de N et de l'horizon (inféré).

**Preuve.** Lu : https://journals.plos.org/plosone/article?id=10.1371%2Fjournal.pone.0073216

**Recommandation.** Référence : EDO (RK4) et diagramme de bifurcation; version à N fini par SSA de Gillespie; définir l'interblocage comme l'absence de quorum avant T, en proportion sur M graines; montrer la dépendance à N.

**Disposition.** _à renseigner_

### ST-09 · majeur · Projet 3 — thermorégulation

**Constat.** Jones et al. 2004 rapporte un résultat empirique (colonies génétiquement diverses plus stables). Les modèles de simulation sont Graham et al. 2006 (1 vs 15 patrilignes) et Myerscough et Oldroyd 2004. La diversité porte sur les patrilignes, pas sur un tirage indépendant par abeille.

**Preuve.** Lu (résumés) : https://consensus.app/papers/details/3b6bf5096f0b5e1da11c631c054e338f/ ; https://consensus.app/papers/details/f4eb3dba35ee5a00a6138dc700152ebc/ ; https://consensus.app/papers/details/a89bfa75d6b55a28a094bd042e9e71d6/

**Recommandation.** Prendre Graham et al. 2006 comme cible (paramètres à relire); tirer les seuils par patriligne; un compartiment de température couplé aux agents.

**Disposition.** _à renseigner_

### ST-10 · majeur · Projet 6 — moulin et mimétisme

**Constat.** Couzin et al. 2002 est un modèle 3D de bancs de poissons et de vols d'oiseaux, sans phéromone : ce n'est pas un modèle de moulin de fourmis. Aucun modèle publié ni résultat quantitatif n'est cité pour le moulin ou le mimétisme chimique : le critère « reproduire un résultat publié » ne s'applique pas.

**Preuve.** Lu (résumé, Europe PMC) : DOI 10.1006/jtbi.2002.3065

**Recommandation.** Moulin : modèle à agents à suivi de piste (règle de Perna), Couzin 2002 présenté comme analogue; chercher un modèle publié de moulin à phéromone. Mimétisme : modèle de reconnaissance par gabarit, déclaré exploratoire.

**Disposition.** _à renseigner_

### ST-11 · majeur · Projet 2 — ACO sur Oliver30

**Constat.** Ni source de coordonnées ni protocole. D'après Dorigo 1996 : Oliver30 vient de Whitley et al. 1989; tournée de 423,741 en réel et 420 en entier; α=1, β=5, ρ=0,5, Q=100, m=n=30, NCmax=5000, 10 essais; moyenne 424,250. L'atteinte systématique de 423,741 se fait avec la stratégie élitiste (e=8).

**Preuve.** Lu (texte intégral) : http://www.sci.brooklyn.cuny.edu/~sklar/teaching/f05/alife/papers/dorigo-96ant.pdf

**Recommandation.** Valider les coordonnées en recalculant la tournée publiée (423,741 / 420); cibles : moyenne ≈ 424,25 sur 10 graines et taux d'atteinte en élitiste; exécuter sous Node.

**Disposition.** _à renseigner_

### ST-12 · majeur · Projet 2 — ABC

**Constat.** Le TR06 teste Sphere 5D, Rosenbrock 2D [±2,048] et Rastrigin 10D sur [−600, 600] (domaine atypique), avec essaim de 20, limit = observatrices × D, 2000 cycles, 30 exécutions. Le visuel 2D ne correspond au protocole publié que pour Rosenbrock. Karaboga et Basturk 2007 n'a pas pu être relu.

**Preuve.** Lu (texte intégral) : https://abc.erciyes.edu.tr/pub/tr06_2005.pdf

**Recommandation.** Reproduire exactement le tableau 3 du TR06 sous Node; Rosenbrock 2D comme cas publié, Rastrigin 2D étiqueté « illustration non publiée ».

**Disposition.** _à renseigner_

### ST-13 · majeur · Technique — chaîne TypeScript

**Constat.** Node exécute le .ts (type stripping par défaut depuis v23.6, stable depuis v24.12/v25.2), pas le navigateur, alors qu'un artifact doit être un HTML autonome. Le stripping interdit enum, namespace, parameter properties et décorateurs, impose les extensions .ts et import type, et ignore tsconfig.

**Preuve.** Lu : https://nodejs.org/api/typescript.html ; https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-8.html ; https://esbuild.github.io/content-types/

**Recommandation.** tsconfig : noEmit, erasableSyntaxOnly, verbatimModuleSyntax. Build navigateur : esbuild --bundle --format=iife, JS injecté dans le HTML; tsc --noEmit en CI (esbuild ne vérifie pas les types). Frontière d'outillage justifiée par l'artifact.

**Disposition.** _à renseigner_

### ST-14 · majeur · Technique — performance navigateur et artifacts

**Constat.** Aucune architecture de performance. Inconnues non vérifiées : isolation cross-origin des pages claude.ai (nécessaire à SharedArrayBuffer) et CSP pour les workers blob:. OffscreenCanvas est disponible partout depuis mars 2023; le transfert d'ArrayBuffer est sans copie.

**Preuve.** Lu : https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas ; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer ; https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects

**Recommandation.** Tableaux typés en structure de tableaux, un seul putImageData pour les champs, simulation en worker avec transfert de tampons, WebGL seulement sur mesure. Spike d'une demi-journée (worker blob:, 10⁴/10⁵ agents, downloads) avant le projet 1.

**Disposition.** _à renseigner_

### ST-15 · majeur · Format — export et rejouabilité

**Constat.** Ni export ni manifeste de run. Dans un artifact, offrir un fichier exige la capacité downloads (avec confirmation du visiteur); le stockage partagé exige db (avec quotas).

**Preuve.** Lu : définitions de types 0.2.66 (downloads.d.ts, db.d.ts) de l'outil Artifact

**Recommandation.** Manifeste JSON (modèle, hachage git, scénario complet, graine, dt, ordre de mise à jour, moteur JS) + séries CSV; manifeste + graine = rejeu complet sur le même moteur; bouton d'export via downloads, masqué si indisponible.

**Disposition.** _à renseigner_

### ST-16 · majeur · Critère de rigueur — tests

**Constat.** Ni harnais de tests de reproduction, ni critères d'acceptation chiffrés, ni numérisation des figures publiées.

**Preuve.** Lu : https://nodejs.org/api/test.html

**Recommandation.** node:test (stable depuis v20, ramasse *.test.ts par défaut) : tests statistiques sur N graines avec seuils écrits d'avance, traces dorées en snapshot (stable depuis v23.4), figures numérisées en CSV avec erreur de reproduction; CI tsc --noEmit + node --test; réplications sous Node, résumés précalculés pour les pages.

**Disposition.** _à renseigner_

### ST-17 · majeur · Projet 4 — régulation

**Constat.** Prabhakar 2012 : α_n = max(α_{n−1} − qD_{n−1} + cA_n − d, α_min), D_n ~ Poisson, c ajusté par essai sur 62 essais; il faut donc les données observées, dont la disponibilité n'est pas vérifiée. La file des abeilles (Seeley et Tovey 1994) appelle une simulation à événements discrets. La loi de Little ne vaut qu'en régime stationnaire, alors que la v3 l'applique au rééquilibrage (inféré).

**Preuve.** Lu : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670 ; notice Crossref DOI 10.1006/anbe.1994.1044

**Recommandation.** Ajouter un moteur à événements discrets au noyau; demander les données aux auteurs ou les numériser; présenter Little comme rapprochement en moyenne, vérifié sur fenêtre glissante.

**Disposition.** _à renseigner_

### ST-18 · majeur · Projet 7 — coûts

**Constat.** Aucun budget. Tarifs vérifiés ($/MTok, entrée/sortie) : Haiku 4.5 1/5, Sonnet 5.5 2/10, Opus 5.5 4/20, Fable 5.1 10/50. Hypothèse de 300 000 appels par modèle (1 500 jetons en entrée, 150 en sortie) : ~675 $, 1 350 $, 2 700 $, 6 750 $ avant Batch. Les jetons de réflexion, facturés en sortie, peuvent ajouter des milliers de dollars (inféré).

**Preuve.** Lu : https://platform.claude.com/docs/en/about-claude/pricing ; calcul inféré

**Recommandation.** Pilote à 1 % pour mesurer les jetons réels; plafond par bras; cache du préfixe stable vérifié par usage.cache_read_input_tokens; effort low/medium fixé et consigné; Batch −50 %, cumulable avec le cache.

**Disposition.** _à renseigner_

### ST-19 · majeur · Projet 7 — Batch vs pas à pas

**Constat.** Un lot se termine le plus souvent en moins d'une heure mais peut prendre jusqu'à 24 h; résultats dans un ordre quelconque, conservés 29 jours. Une simulation de 100 pas dépendants pourrait prendre des jours (inféré).

**Preuve.** Lu : https://platform.claude.com/docs/en/build-with-claude/batch-processing

**Recommandation.** Lots synchronisés : un lot par pas regroupant toutes les répétitions et toutes les cellules, appariés par custom_id; sinon API interactive avec limiteur de concurrence. Inscrire le choix dans le protocole.

**Disposition.** _à renseigner_

### ST-20 · majeur · Projet 7 — journalisation et rejeu

**Constat.** « Rejouant les journaux » sans format, ni clé de rejeu, ni archivage.

**Preuve.** Inféré; contrainte tool_choice lue dans la référence claude-api

**Recommandation.** JSONL par appel (run, scénario, graine, pas, agent, modèle demandé, response.model, effort, requête et réponse complètes, usage, coût, latence, version du SDK); rejeu par cassette indexé par le hachage de la requête (détecte aussi les divergences du moteur); sorties structurées (tool_choice forcé refusé sur 5.5); archivage avec DOI hors git; les pages rejouent sans appeler l'API.

**Disposition.** _à renseigner_

### ST-21 · mineur · Projet 2 — formule d'évaporation

**Constat.** Dorigo 1996 écrit τ(t+n) = ρ·τ(t) + Δτ, où ρ est la persistance; la v3 utilise ρ comme évaporation. Les deux coïncident à 0,5, pas à 0,99.

**Preuve.** Lu : texte intégral de Dorigo 1996

**Recommandation.** Déclarer la convention de ρ dans le scénario.

**Disposition.** _à renseigner_

### ST-22 · mineur · Projet 4 — « analogue à TCP »

**Constat.** Le texte de Prabhakar et al. 2012 ne mentionne ni TCP ni Internet, seulement « computer networks » de façon générale.

**Preuve.** Lu (via l'outil de récupération) : https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002670

**Recommandation.** Attribuer l'analogie TCP à sa vraie source, ou la présenter comme rapprochement de l'auteur.

**Disposition.** _à renseigner_

### ST-23 · mineur · Projet 2 — contraste combinatoire vs continu

**Constat.** Le contraste tient au choix des algorithmes : des variantes continues d'ACO (ACO_R) et combinatoires d'algorithmes d'abeilles existent.

**Preuve.** Non vérifié en ligne (budget de recherche épuisé)

**Recommandation.** Le formuler comme un artefact du choix d'algorithmes, pas comme une propriété des mécanismes.

**Disposition.** _à renseigner_

### ST-24 · mineur · Technique — précision des champs

**Constat.** En Float32, les petits dépôts sont absorbés et l'évaporation répétée produit des sous-normaux.

**Preuve.** Inféré

**Recommandation.** Seuil ε sous lequel on met à zéro; Float64 si le test de convergence l'exige.

**Disposition.** _à renseigner_

### ST-25 · mineur · Format — écran partagé

**Constat.** Échelles de temps et d'espace incompatibles entre espèces : l'affichage côte à côte suggère des vitesses relatives fausses.

**Preuve.** Inféré

**Recommandation.** Synchroniser sur un temps normalisé (temps de décision médian = 1) et l'afficher.

**Disposition.** _à renseigner_

### ST-26 · mineur · Projet 7 — fallback et refus

**Constat.** La référence claude-api recommande d'activer fallbacks par défaut, ce qui substituerait un autre modèle en cours d'expérience.

**Preuve.** Lu : référence claude-api

**Recommandation.** Désactiver fallbacks; consigner stop_reason refusal comme donnée (utile au projet 6).

**Disposition.** _à renseigner_

### ST-27 · mineur · Format — appels LLM depuis une page

**Constat.** La capacité sample d'un artifact choisit un modelTier, peut servir un palier moins cher et facture le visiteur : pas de modèle fixé.

**Preuve.** Lu : sample.d.ts (contrat 0.2.66)

**Recommandation.** Réserver sample aux démonstrations étiquetées; les données viennent du script Node.

**Disposition.** _à renseigner_

### ST-28 · mineur · Format — taille d'artifact

**Constat.** Une page est limitée à 16 Mo; les résumés précalculés doivent y tenir.

**Preuve.** Lu : description de l'outil Artifact

**Recommandation.** Agrégats en JSON, ou capacité assets.

**Disposition.** _à renseigner_

### ST-29 · mineur · Projet 7 — grille 2 × 4

**Constat.** Règle simple et LLM doivent recevoir la même observation et rendre une action du même type, sinon les cellules ne sont pas comparables.

**Preuve.** Inféré

**Recommandation.** Interface unique decide(observation) → action, implantée par règle, LLM et cassette.

**Disposition.** _à renseigner_

## Ajouts recommandés

### ST-A01 · ajout

Phase 0 « noyau et spike » avant le projet 1 : PRNG à graine, horloge à pas fixe, RK4, SSA de Gillespie, moteur à événements discrets, grille, enregistreur, scénario, harnais node:test; spike d'artifact (worker blob:, transfert de tampons, downloads, 10⁴/10⁵ agents).

**Disposition.** _à renseigner_

### ST-A02 · ajout

Fiche de reproduction par article : équations, paramètres, unités, protocole, figure cible numérisée (CSV), critère d'acceptation chiffré écrit avant de coder.

**Disposition.** _à renseigner_

### ST-A03 · ajout

Docking systématique entre le modèle chorégraphique commun et chaque modèle de référence.

**Disposition.** _à renseigner_

### ST-A04 · ajout

Manifeste de run standard (modèle, hachage git, scénario, graine, dt, ordre de mise à jour, moteur JS) et export CSV/JSON via la capacité downloads.

**Disposition.** _à renseigner_

### ST-A05 · ajout

Balayages paramétriques headless (Node, worker_threads) pour les diagrammes de phases et l'analyse de sensibilité, y compris à l'ordre de mise à jour et à la taille N.

**Disposition.** _à renseigner_

### ST-A06 · ajout

Projet 7 : pilote à 1 % avec budget par bras, collecte prioritaire de Haiku 4.5, journal JSONL, rejeu par cassette, sorties structurées, fallbacks désactivés, archivage avec DOI.

**Disposition.** _à renseigner_

### ST-A07 · ajout

Matrice concept × espèce × type de modèle × source vérifiée × cible, maintenue comme document de pilotage du programme.

**Disposition.** _à renseigner_


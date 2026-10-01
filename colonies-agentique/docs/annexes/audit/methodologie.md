# Audit méthodologique — Proposition v3 « Fourmilière et ruche comme chorégraphies sans chorégraphe »

Auditeur : angle « méthodologie » · Date : 2026-10-01 · Objet : `proposition-v3.md` (lue en entier)

Légende des preuves : **[L]** lu dans la source primaire (ou son texte intégral extrait) · **[M]** métadonnées bibliographiques vérifiées (Crossref, éditeur), contenu non lu · **[S]** vérifié par source secondaire (résumé, moteur de recherche) · **[I]** inféré par l'auditeur, non vérifié · **[NV]** non vérifiable avec les outils disponibles.

Limites de l'audit : le quota WebSearch de la session et celui de l'outil Consensus ont été épuisés en cours de route; la suite a reposé sur WebFetch (arXiv, Crossref, documentation Anthropic, éditeurs) et sur les textes intégraux déjà extraits dans le scratchpad par d'autres auditeurs (`dorigo96.txt`, `pais2013.txt`, `p2src/`, `p4src/`). Plusieurs PDF n'ont pas pu être lus (Goss et al. 1989, Wilensky et Rand 2007).

---

## 1. Verdict

La v3 est une bonne intuition de programme, mais ce n'est pas encore un protocole de recherche. Aucune question n'est posée sous forme testable; les deux construits centraux (« richesse du signal », « gain collectif ») ne sont pas définis opérationnellement, et le premier est confondu avec l'espèce, le canal et la persistance; le « critère de rigueur » (reproduire un résultat publié) n'a ni tolérance, ni nombre de répétitions, ni règle de décision. Le projet 7, seule contribution originale, croise un facteur « capacité » (règle, Haiku, Sonnet, Opus) qui varie en même temps la génération du modèle, le mode de réflexion, le contrôle de l'échantillonnage, la date de coupure des connaissances et les classifieurs de sécurité; son plan « 2 × 4 » oublie le facteur scénario (24 cellules réelles); il n'a ni coût, ni puissance, ni stratégie contre la non-stationnarité. Deux affirmations précises sont contredites par les sources primaires : la nouveauté du rapprochement avec la loi de Little (déjà évoquée par Anderson et Ratnieks 1999) et la cible du projet 3 (chez *Pheidole*, ce sont les **majors** qui prennent la relève, pas les petites ouvrières). Tout est corrigeable; la section 7 donne le gabarit.

---

## 2. Constats transversaux

### C1 — Aucune question de recherche ni hypothèse falsifiable · **critique**
**Où :** toute la v3 (« Question transversale », projets 1 à 7).
**Problème :** la seule question formulée (« Comment la richesse du signal change-t-elle le gain collectif et les modes d'échec ? ») est ouverte : aucun résultat ne peut la réfuter. Les projets 1 à 6 décrivent des phénomènes « à reproduire » sans dire quelle conclusion la reproduction permettra de tirer sur l'agentique. Les colonnes « Agentique » sont des analogies de conception, pas des prédictions.
**Recommandation :** pour chaque projet, une matrice de traçabilité QR → hypothèse → variables (VI, VD, contrôles) → plan → critère de décision → analyse (gabarit section 7.1). Chaque hypothèse énonce une direction et une taille d'effet minimale d'intérêt, et dit quel résultat la réfute. Séparer explicitement le **confirmatoire** (préenregistré) de l'**exploratoire** (pages interactives, curseurs).
**Preuve :** [I] lecture de la v3.

### C2 — Construit « richesse du signal » non opérationnalisé et confondu · **critique**
**Où :** tableau « Deux chorégraphies naturelles » (ligne « Contenu du signal »), « Question transversale », projet 7.
**Problème :** l'axe ordinal « scalaire (fourmi) → symbole (abeille) → langage (LLM) » est fragile sur trois plans.
1. *Validité de construit côté fourmi.* Le signal chimique n'est pas un simple scalaire : la géométrie des bifurcations de piste donne une **polarité** (Jackson, Holcombe et Ratnieks 2004, *Nature* 432:907) [M]; *Monomorium pharaonis* emploie un signal répulsif « no entry » (Robinson et al. 2005, *Nature* 438:442) [M] et des phéromones attractives et répulsives à **taux de décroissance différents** (Robinson et al. 2008, *Insectes Sociaux* 55:246) [M]. Le tableau v3 (« Freinage : absence de retours » côté fourmi) omet ces signaux négatifs.
2. *Confusion avec l'espèce et le canal.* Plusieurs fourmis étudiées dans la v3 **n'utilisent pas de piste** pour le comportement visé : Prabhakar, Dektar et Gordon (2012) écrivent que « many ant species do not use pheromone trails » et que *Pogonomyrmex barbatus* fourrage sans information spatiale [L, `p4src/prab2012.txt`]; *Temnothorax* (projet 5) recrute par tandem et transport. « Fourmi = piste » ne tient donc pas d'un projet à l'autre. De plus, la richesse varie **en même temps** que la persistance (piste durable vs danse éphémère), la localité et l'adressage : on ne peut attribuer un effet à la seule « richesse ».
3. *Non-monotonie probable côté LLM.* Un canal d'**un seul mot** suffit à faire passer la coopération de 0 % à 96,7 % dans une chasse au cerf à 4 joueurs (Madmoun et Lahlou, EACL 2026, arXiv:2510.05748) [L, résumé] : plus de « langage » n'implique pas plus de gain.
**Recommandation :** définir la richesse par des **propriétés mesurables du canal**, manipulées indépendamment : (a) contenu en bits par message (entropie empirique des messages, ou cardinalité de l'alphabet; précédent : Haldane et Spurway 1954 ont analysé statistiquement l'information de la danse, *Insectes Sociaux* 1:247 [M]); (b) persistance (demi-vie τ); (c) localité (portée); (d) adressage (diffusion vs dépôt). Pour les agents LLM, manipuler le **format** du message à capacité fixe : scalaire borné, tuple symbolique (direction, distance, qualité), texte libre plafonné en jetons. L'axe « fourmi → abeille → LLM » devient alors une illustration, pas la variable indépendante.
**Preuve :** sources citées ci-dessus; [I] pour la décomposition proposée.

### C3 — Construit « gain collectif » non défini · **critique**
**Où :** « Question transversale », projet 7 (« courbe du gain collectif »).
**Problème :** gain par rapport à quoi ? Sans référence, toute amélioration peut venir du budget de calcul plutôt que de la coordination. En agentique, un agent unique bien instruit égale presque les meilleures discussions multi-agents (Wang et al. 2024, arXiv:2402.18272) [L, résumé]; les gains des systèmes multi-agents LLM sont « often minimal » sur les bancs courants (Cemri et al. 2025, MAST, arXiv:2503.13657, 14 modes d'échec, κ = 0,88) [L, résumé].
**Recommandation :** définir le gain par scénario comme un **contraste à budget égal** :
`G = (P_coll − P_ref) / (P_max − P_ref)`, où `P_ref` est l'une de trois références préenregistrées : (i) mêmes agents **sans canal** (indépendants); (ii) **agent unique** avec le même budget total de jetons; (iii) colonie à règles du même scénario. Rapporter aussi le coût (jetons, $) et la **robustesse** (performance après perturbation : inversion des sources, retrait d'une caste, faux signal). Pour distinguer coordination réelle et simple couplage temporel, envisager la mesure d'émergence par décomposition de l'information (PID du TDMI; Riedl, arXiv:2510.05174) [L, résumé]. Classer les échecs avec la taxonomie MAST plutôt qu'une liste ad hoc.
**Preuve :** sources citées; [I] pour la formule.

### C4 — « Reproduire un résultat publié » sans tolérance ni règle de décision · **critique**
**Où :** « Critère de rigueur »; rubriques « À reproduire » des projets 1 à 6.
**Problème :** la v3 ne dit pas (a) si l'on **réplique un modèle publié** (réimplanter Camazine et Sneyd 1991 et retrouver ses courbes) ou si l'on **valide contre des données empiriques** (retrouver le comportement observé par Seeley et al. 1991) — deux exigences différentes; (b) quel niveau d'accord suffit; (c) combien de répétitions; (d) que faire en cas d'échec. La littérature de réplication distingue l'identité numérique, l'équivalence distributionnelle et l'alignement relationnel (Axtell et al. 1996, *Comput. Math. Organ. Theory* 1:123 [M]; repris par Wilensky et Rand 2007, *JASSS* 10(4) [S], qui jugent l'identité numérique probablement impossible entre plateformes).
**Recommandation :** pour chaque cible, préenregistrer le niveau visé et la tolérance :
- *Alignement relationnel* (cibles qualitatives) : signe et ordre des effets entre conditions, IC à 95 % excluant zéro.
- *Équivalence distributionnelle* (cibles chiffrées) : test d'équivalence TOST avec marge δ fixée d'avance (Lakens 2017, *SPPS* 8:355) [M], sur l'échelle pertinente (log10 pour des erreurs d'optimisation).
- *Plusieurs patrons simultanés* plutôt qu'un seul (modélisation orientée patrons; Grimm et al. 2005, *Science* 310:987) [M].
- *Porte go/no-go* : aucune extension agentique tant que la porte n'est pas franchie; tout écart est consigné dans un registre des déviations.
Exemples concrets de tolérances : section 7.3.
**Preuve :** sources citées.

### C5 — Comparaison fourmi/abeille non commensurable · **majeur**
**Où :** thèse (« au même titre », « même moteur ») et tous les projets.
**Problème :** côté fourmi, la v3 mobilise au moins cinq genres (*Linepithema*/« Iridomyrmex » au projet 1, *Pheidole* au 3, *Pogonomyrmex* au 4, *Temnothorax* au 5, fourmis légionnaires au 6) [I]; côté abeille, une seule espèce, *Apis mellifera*. Un « contraste fourmi/abeille » mélange donc variation inter-espèces et variation de mécanisme. Par ailleurs, « même moteur » n'assure pas l'équité : les paramètres (effectif, vitesses, taux) ne sont pas commensurables entre espèces, et un choix de point dans l'espace des paramètres peut fabriquer n'importe quel gagnant — c'est exactement le risque documenté pour les études de simulation comparatives (Pawel, Kook et Reeve, *Biometrical Journal* 66, 2024, doi:10.1002/bimj.202200091) [M].
**Recommandation :** (a) nommer l'espèce par projet et parler de « mécanisme de type piste / de type danse » plutôt que de « la fourmi »; (b) calibrer chaque mécanisme sur ses données publiées, puis comparer sur une **grille ou un front de Pareto** (vitesse × justesse × coût) plutôt qu'en un point; (c) analyse de sensibilité globale (Morris puis Sobol) préenregistrée; (d) normaliser l'environnement (même effectif, même horizon, même budget d'information).
**Preuve :** [L] Prabhakar et al. 2012 pour *Pogonomyrmex*; [M] Pawel et al.; [I] pour le reste.

### C6 — Puissance, répétitions et graines non planifiées · **majeur**
**Où :** absent de la v3.
**Problème :** aucune taille d'échantillon, aucune erreur standard Monte Carlo, aucune politique de graines.
**Recommandation :**
- Adopter le cadre ADEMP pour planifier chaque étude de simulation (buts, mécanisme générateur, estimandes, méthodes, mesures de performance) et rapporter l'erreur standard Monte Carlo (Morris, White et Crowther 2019, *Stat. Med.*, doi:10.1002/sim.8086) [S].
- Fixer le nombre de répétitions par **précision visée** (p. ex. MCSE d'une proportion ≈ √(p(1−p)/n) : n = 400 donne ±0,025 à p = 0,5) ou par **stabilisation du coefficient de variation**, et par **puissance** pour les contrastes (Lee et al. 2015, *JASSS* 18(4):4) [L]. Pour les modèles à règles, peu coûteux, viser n ≥ 1 000.
- Ordres de grandeur (α = 0,05 bilatéral, puissance 0,80; calcul de l'auditeur [I]) : proportions 0,5 vs 0,7 → 93 runs par groupe; 0,7 vs 0,9 → 62; effet continu d = 0,5 → 63; d = 0,3 → 175; d = 0,5 avec correction de Bonferroni sur 6 contrastes → 97.
- Graines : générateur pseudo-aléatoire **semable** (Math.random ne l'est pas; MDN) [L], une graine par run consignée, flux indépendants par agent.
**Preuve :** sources citées; calculs [I] (script reproductible en annexe A).

### C7 — Artefacts de simulation non contrôlés · **majeur**
**Où :** « Technique et parcours » (TypeScript + Canvas, navigateur); projet 3 (« des agents identiques réagissent en même temps et oscillent »).
**Problème :**
1. *Mise à jour synchrone.* Des motifs spatio-temporels célèbres ont disparu quand on est passé d'une mise à jour synchrone à asynchrone (Huberman et Glance 1993, *PNAS* 90:7716) [S]. Les oscillations d'agents identiques du projet 3 pourraient être un artefact de synchronie plutôt qu'un effet de l'homogénéité.
2. *Précision numérique.* La précision de plusieurs fonctions `Math` dépend de l'implantation : des navigateurs, voire un même moteur sur une autre architecture, peuvent donner des résultats différents (MDN) [L]. L'identité numérique entre navigateurs n'est donc pas garantie.
3. *Pas de temps, ordre de mise à jour, conditions initiales, rodage* (burn-in) : non spécifiés.
**Recommandation :** (a) un **moteur de référence sans affichage** (Node, versions figées, PRNG semé) produit tous les résultats confirmatoires; le navigateur ne sert qu'à la vulgarisation et rejoue des traces; (b) facteur expérimental « ordre de mise à jour » (synchrone / asynchrone aléatoire) au projet 3 et partout où l'on rapporte des oscillations; (c) étude de convergence en pas de temps; (d) documenter chaque modèle selon le protocole ODD (Grimm et al. 2020, *JASSS* 23(2):7, doi:10.18564/jasss.4259) [S].
**Preuve :** sources citées.

### C8 — Pas de préenregistrement; risque de « jardin des sentiers » · **majeur**
**Où :** absent; aggravé par les pages interactives (curseurs) qui invitent à chercher le réglage qui « marche ».
**Problème :** sans plan d'analyse figé, les comparaisons ACO/ABC, piste/danse et modèles LLM sont exposées aux pratiques douteuses documentées pour les simulations comparatives (Pawel et al. 2024) [M].
**Recommandation :** préenregistrer sur OSF, par projet, avant les runs confirmatoires : hypothèses, VI/VD, paramètres, n, tolérances, analyses, critères d'exclusion (p. ex. runs avortés, refus du modèle). Envisager le format *Registered Report* pour le projet 7. Les pages interactives sont déclarées exploratoires.
**Preuve :** [M] Pawel et al.; [I] pour le reste.

### C9 — Science ouverte non planifiée · **majeur**
**Où :** « chaque page publiable comme artifact » (seule mention de diffusion).
**Problème :** un artifact n'est ni archivé, ni citable, ni versionné de façon pérenne. Aucune licence, aucun DOI, aucun plan de gestion des données. *PLoS Comput Biol* exige depuis le 30 mars 2021 que tout le code lié aux résultats soit public sans restriction à la publication, et recommande un dépôt à DOI (Zenodo, Software Heritage) [L].
**Recommandation :** dépôt Git public dès le départ; licence de code (MIT ou Apache-2.0) et de données (CC BY 4.0); `CITATION.cff`; intégration GitHub → Zenodo **activée avant la première version** (Zenodo émet un DOI à chaque *release* GitHub; le dépôt doit être public) [L, docs GitHub]; archivage Software Heritage; plan de gestion des données (exigence des organismes subventionnaires canadiens à vérifier selon la source de financement [NV]). Pour le projet 7 : publier **toutes** les requêtes et réponses (journaux JSONL), avec identifiant de modèle, horodatage, paramètres et usage en jetons.
**Preuve :** sources citées. Note : la mémoire du chercheur signale un dépôt antérieur où le webhook Zenodo manquait; d'où l'activation précoce.

### C10 — Positionnement face à l'état de l'art absent · **majeur**
**Où :** toute la v3 (aucune revue de littérature; projet 7 dit « seul projet sans résultat publié à reproduire »).
**Problème :** des travaux proches existent, des deux côtés.
- *Biologie comparée fourmi/abeille :* Detrain et Deneubourg 2008, « Collective decision-making and foraging patterns in ants and honeybees », *Adv. Insect Physiol.* 35:123–173 [M] — exactement la comparaison du projet 1; Franks et al. 2002, *Phil. Trans. R. Soc. B* 357:1567 [M] (projet 5, déjà cité); Marshall et al. 2009, *J. R. Soc. Interface* 6:1065 [S] (fourmis et abeilles ramenées au modèle de diffusion optimal); de Vries et Biesmeijer 1998, *Behav. Ecol. Sociobiol.*, modèle individu-centré qui simule déjà l'inversion des sources de Seeley et al. [L, résumé].
- *Agents LLM en essaim :* Jimenez-Romero, Yegenoglu et Blum 2025, *Front. Artif. Intell.* 8:1593017 — fourmis pilotées par GPT-4o dans NetLogo, déposant et suivant des phéromones; 10 fourmis, 1 000 pas, **5 runs**, température 0; le LLM égale le modèle à règles et l'hybride le dépasse [L]; SwarmBench (Ruan et al., arXiv:2505.04364) [L, résumé]; SwarmWorld, stigmergie seule suffisante dans des sociétés d'agents LLM (Pal, Wang et Buehler, arXiv:2608.26081, août 2026) [L, résumé]; coordination par champs de pression avec **décroissance temporelle** (analogue de l'évaporation), 48,5 % de succès contre 12,6 % pour la conversation sur 1 350 essais (Rodriguez, arXiv:2601.08129) [L, résumé]; LLM-Foraging en robotique d'essaim (Li et al., arXiv:2605.01461) [L, résumé]. Critique méthodologique des simulations sociales génératives : validation souvent fondée sur la « crédibilité » subjective (Larooij et Törnberg, arXiv:2504.03274) [L, résumé].
- *Vulgarisation :* l'essai « Your AI Agents Don't Need an Orchestrator. Ants Proved It. » (Substack *Bits & Quarks*, 8 juin 2026, URL `.../the-queen-gives-no-orders`) porte déjà le slogan « the queen gives no orders » et l'argument stigmergie contre orchestration — sans les abeilles [L]. La thèse-slogan n'est donc pas originale; la valeur ajoutée doit venir de la rigueur et du volet abeille.
- *Terminologie :* l'opposition orchestration/chorégraphie vient des services Web (Peltz 2003, *IEEE Computer* 36(10):46) [M] et n'est pas citée.
**Recommandation :** une revue de littérature systématique courte (protocole, bases, équations de recherche, critères) avant le projet 1, avec un tableau « ce qui existe / ce que nous ajoutons » par projet. Pour le projet 7, la contribution défendable devient : *manipulation contrôlée des propriétés du canal à capacité fixe, avec références à budget égal et puissance planifiée* — ce que Jimenez-Romero et al. (5 runs, un modèle, un format) ne font pas.
**Preuve :** sources citées.

### C11 — Revues et conférences cibles non désignées · **mineur**
**Problème :** aucun plan de publication; or le choix du lieu conditionne format, longueur et exigences d'ouverture.
**Recommandation (correspondance proposée [I], dates vérifiées quand indiqué) :**
| Projet | Cible principale | Repli |
|---|---|---|
| 1, 5 (bio comparée) | *J. R. Soc. Interface*, *PLoS Comput Biol* (code obligatoire) | *Behav. Ecol. Sociobiol.*, *Insectes Sociaux* |
| 2 (ACO/ABC) | *Swarm Intelligence* (Springer) | conférence ANTS : l'édition 2026 a eu lieu à Darmstadt du 8 au 10 juin 2026 [L, IRIDIA]; prochaine probablement 2028 (biennale) [I] |
| 3, 4, 6 | ALIFE 2027, Prague, 19–23 juillet 2027, échéance non publiée [L, alife.org]; revue *Artificial Life* | *JASSS* pour l'apport méthodologique |
| 7 (LLM) | AAMAS 2027 (lieu et échéances non vérifiés [NV]); *JAAMAS* | ateliers LLM-agents; *Registered Report* |
| Méthode (moteur, protocole de reproduction) | *JASSS* | *SoftwareX* [I] |
**Preuve :** sources citées.

### C12 — Éthique et limites absentes · **majeur**
**Problème :** la v3 n'a aucune section éthique ni limites.
**Recommandation :**
- *Animaux :* aucune expérimentation animale (simulation pure) — à affirmer explicitement.
- *Vulgarisation :* risque d'anthropomorphisme (« intelligence », « décide », « la reine ne commande pas ») et de surinterprétation des analogies; le domaine des métaheuristiques a été sévèrement critiqué pour ses métaphores qui masquent l'absence de nouveauté (Sörensen, *ITOR* 22:3, doi:10.1111/itor.12001) [M]. Ajouter à chaque page un encadré « limites de l'analogie ».
- *Évaluation pédagogique :* si l'on prétend mesurer l'effet didactique des visuels, c'est une recherche avec des participants humains → approbation d'un comité d'éthique de la recherche (EPTC 2 au Canada) [NV].
- *Projet 6 (injection de faux signaux) :* cadrer comme recherche défensive, sans publier de charges réutilisables contre des systèmes tiers; divulgation responsable si un produit réel est touché.
- *Projet 7 :* coût et empreinte énergétique à budgéter; les refus des classifieurs de sécurité (Opus 5.5 : catégories `cyber`, `bio`, `reasoning_extraction`) [L, docs Anthropic] créent des **données manquantes différentielles** entre modèles — traiter comme attrition, préenregistrer la règle.
**Preuve :** sources citées.

### C13 — Bibliographie « citée de mémoire » · **mineur**
**Problème :** la v3 le reconnaît. Plusieurs références sont toutefois exactes au plan bibliographique (vérifiées ici : Dorigo, Maniezzo et Colorni 1996, *IEEE SMC-B* 26(1):29 [M]; Seeley, Camazine et Sneyd 1991 [S]; Camazine et Sneyd 1991 [S]; Wilson 1984, *BES* 16:89 [S]; Jones et al. 2004, *Science* 305:402 [S]; Prabhakar et al. 2012, *PLoS Comput Biol* 8:e1002670 [L]; Pratt et al. 2005, *Anim. Behav.* 70:1023 [M]; Franks et al. 2003, *Proc. R. Soc. B* 270:2457 [M]; Seeley et al. 2012, *Science* 335:108 [S]; Couzin et al. 2002, *J. Theor. Biol.* 218:1 [M]; Seeley et Tovey 1994, *Anim. Behav.* 47:311 [M]; Karaboga et Basturk 2007, *J. Glob. Optim.* 39:459 [M]).
**Recommandation :** bibliothèque Zotero/BibTeX avec DOI pour chaque entrée, statut de vérification par entrée, et citation de la source exacte de chaque cible chiffrée (figure, tableau, page).

### C14 — Gouvernance du programme : jalons, risques, livrables · **mineur**
**Problème :** le « parcours » donne un ordre (1 → 3 → 5, puis 2, 4, 6, puis 7), sans durée, jalons, critères de passage, ni registre de risques; le format « note de recherche courte » n'est pas défini.
**Recommandation :** calendrier avec portes go/no-go (porte = reproduction réussie selon C4); registre des risques (retrait de modèles, données biologiques indisponibles, coût LLM); gabarit de note : ADEMP + ODD + résultats + écarts au préenregistrement + limites.

---

## 3. Constats par projet (1 à 6)

### P1 — Recrutement : piste contre danse
- **P1-a · majeur · positionnement.** La comparaison existe déjà en revue (Detrain et Deneubourg 2008) [M], et le scénario d'inversion des sources a déjà un modèle individu-centré (de Vries et Biesmeijer 1998) [L, résumé]. *Recommandation :* utiliser de Vries et Biesmeijer comme comparateur d'« amarrage » (docking) et citer Detrain et Deneubourg comme cadre.
- **P1-b · majeur · cible mal spécifiée.** « Bloquées sur la branche longue quand la courte arrive tard » : selon une source secondaire, la branche courte était ajoutée 30 minutes après le début chez *Iridomyrmex humilis* (aujourd'hui *Linepithema humile*), la majorité restant sur la longue [S]; je n'ai pas pu lire Goss et al. 1989 (*Naturwissenschaften* 76:579) [M]. La fonction de choix (k ≈ 20, n ≈ 2) est attribuée à Deneubourg et al. 1990 (*J. Insect Behav.* 3:159) [M, valeurs NV]. *Recommandation :* extraire du texte intégral le nombre d'expériences, la proportion de colonies restées sur la branche longue et la fenêtre de mesure; fixer la tolérance comme un intervalle binomial autour de cette proportion (le nombre de colonies publiées étant petit, la tolérance doit refléter son incertitude).
- **P1-c · majeur · VD absente.** Définir : latence d'adaptation (temps pour que 80 % des butineuses passent à la nouvelle meilleure source), probabilité de verrouillage (aucune bascule avant T_max), coût (messages ou dépôts par unité de ressource).
- **P1-d · mineur.** L'analogie « état partagé persistant (rigide mais robuste) / diffusion (adaptable mais bavarde) » est une hypothèse, pas un constat : la reformuler en H1 (section 7.1).

### P2 — ACO contre ABC
- **P2-a · majeur · contraste confondu avec le type de problème.** ACO sur un voyageur de commerce (combinatoire) et ABC sur Rastrigin/Rosenbrock (continu) : toute différence est attribuable au problème autant qu'à « piste vs danse ». Il existe une ACO pour domaines continus sans changement conceptuel majeur (Socha et Dorigo, *EJOR*, 2008) [L, `p2src/acor2008.txt`]. *Recommandation :* comparer sur les **mêmes** problèmes (ACO_R vs ABC en continu; ou une ABC combinatoire vs AS sur TSP), à **budget d'évaluations égal**, avec une référence non bio-inspirée (recherche aléatoire, CMA-ES ou 2-opt) [I]; citer la critique de Sörensen (2015) [M].
- **P2-b · majeur · tolérance dépendante des conventions.** Pour Oliver30, Dorigo et al. 1996 rapportent la meilleure tournée **423,741** (distances réelles) trouvée en moins de 400 cycles avec α = 1, β = 5, ρ = 0,5, Q = 100, e = 8 fourmis élitistes, mais **420** en distances entières arrondies (Tableau III, moyennes sur 10 runs) [L, `dorigo96.txt`]. *Recommandation :* fixer la convention de distance, le budget (NCMAX = 5 000 cycles dans l'article) et un critère du type « ≥ 9 runs sur 10 atteignent 423,741 ± 10⁻³ » [I].
- **P2-c · mineur · source à citer.** « Karaboga 2005 » est le rapport technique TR06 (non évalué par les pairs) : 5D Sphere, 2D Rosenbrock, 10D Rastrigin, essaim de 20, *limit* = onlookers × D, **30 runs**, p. ex. Rosenbrock 2D moyenne 0,002234 (é.-t. 0,002645) [L, `p2src/abc_tr06.txt`]. Karaboga et Basturk 2008 (*Appl. Soft Comput.*) utilisent aussi 30 runs mais Rastrigin et Rosenbrock en **50 dimensions** [L, `p2src/abc2008.txt`] : les deux sources donnent des cibles incompatibles. *Recommandation :* choisir une source et en copier exactement le protocole; tester l'équivalence sur l'échelle log10 (valeurs de l'ordre de 10⁻¹⁷, sous la résolution utile du double) ou par taux de succès sous un seuil (p. ex. 10⁻¹²) [I].

### P3 — Division du travail
- **P3-a · majeur · cible inversée.** Wilson 1984 : quand le ratio minors:majors descend sous 1:1, ce sont les **majors** qui élargissent leur répertoire (×1,4 à ×4,5) et leur activité (×15 à ×30), servant de caste de réserve [S, résumé de l'article]. La v3 écrit « les petites ouvrières prennent la relève ». *Recommandation :* corriger la cible et l'exprimer en facteurs à reproduire (alignement relationnel : hausse du répertoire et du taux d'activité des majors après retrait des minors).
- **P3-b · majeur · artefact possible.** L'affirmation « des agents identiques réagissent en même temps et oscillent » doit être testée sous mise à jour asynchrone (C7), sinon l'effet peut être un artefact.
- **P3-c · mineur · mécanisme inféré.** Jones et al. 2004 comparent des colonies **génétiquement** diversifiées et uniformes; les colonies diverses maintiennent une température plus stable [S]. Le mécanisme par seuils variés est l'explication proposée; je n'ai pas lu si la colonie uniforme « oscille » [NV]. *Recommandation :* VD = écart-type et puissance spectrale de la température après rodage; VI = dispersion σ_θ des seuils; contrôle = ordre de mise à jour.

### P4 — Régulation sans vue d'ensemble
- **P4-a · majeur · nouveauté revendiquée à tort.** La v3 présente la lecture par la loi de Little comme un « rapprochement non publié, de l'auteur ». Or Anderson et Ratnieks 1999 (*Am. Nat.* 154:521, partition des tâches et délais de file chez l'abeille) invoquent explicitement le résultat de Little (L = λW; Little 1961) et notent qu'il « does not hold here » à cause d'une corrélation entre taux d'arrivée et nombre en file [L, `p4src/ar1999I.txt`]. Seeley et Tovey 1994 expliquent déjà pourquoi le temps de recherche d'une receveuse indique les taux relatifs de collecte et de traitement [M, titre]. *Recommandation :* restreindre la revendication au cadrage comparatif « débit (fourmi) vs attente (abeille) », citer ces deux articles, et traiter la mise en garde d'Anderson et Ratnieks comme hypothèse à tester.
- **P4-b · mineur · données de reproduction.** Prabhakar et al. 2012 ajustent un seul paramètre (c) sur 39 essais de terrain et comparent les corrélations observées/simulées [L]. *Recommandation :* vérifier la disponibilité des données brutes avant d'en faire une cible; sinon, cible = reproduction du modèle publié (et non des données).

### P5 — Décision par quorum
- **P5-a · majeur · architecture non instanciable.** Chez *Temnothorax*, le recrutement passe par tandem puis transport, pas par une piste persistante; le croisement « piste vs danse » du projet 7 n'a donc pas de sens tel quel pour ce scénario (voir P7-b).
- **P5-b · mineur · VD.** Définir vitesse (temps jusqu'au quorum, temps jusqu'à l'engagement total) et justesse (proportion de runs choisissant le meilleur site), puis la courbe vitesse-justesse en fonction du seuil Q (Franks et al. 2003 [M]; Pratt et al. 2005 [M]).

### P6 — Pathologies
- **P6-a · mineur · construit « pathologie ».** L'interblocage entre options égales n'est pas toujours une pathologie : pour des options égales de **faible** valeur, il est adaptatif (attendre une meilleure option); l'inhibition croisée le rompt au-delà d'un seuil critique **s\* = 4v³ / (v² − 1)²** (Pais et al. 2013, *PLoS ONE* 8:e73216, reprenant Seeley et al. 2012) [L, `pais2013.txt`]. *Recommandation :* utiliser cette bifurcation comme cible quantitative (section 7.3) et distinguer interblocage adaptatif et pathologique.
- **P6-b · mineur · cible du moulin.** Couzin et al. 2002 traitent des « animal groups » génériques (titre vérifié) [M]; ce n'est pas un modèle de fourmis à pistes. *Recommandation :* soit cibler explicitement la phase tore de Couzin (paramètres de zones, polarisation et moment angulaire comme VD), soit trouver un modèle de moulin propre aux fourmis légionnaires.

---

## 4. Projet 7 en profondeur — synthèse fourmi, abeille, agent LLM

### P7-a — Question et hypothèses absentes · **critique**
La v3 ne donne qu'un croisement de facteurs. *Recommandation :* hypothèses préenregistrées (section 7.1, H7a à H7d), dont au moins une hypothèse d'**équivalence** (p. ex. au format scalaire, les niveaux LLM ne diffèrent pas de la colonie à règles à ±δ).

### P7-b — Plan factoriel mal spécifié · **critique**
1. « Grille 2 × 4 » omet le facteur scénario : le plan réel est 2 (architecture) × 4 (capacité) × 3 (scénarios) = **24 cellules**, dont 18 avec LLM [I].
2. L'architecture « piste vs danse » n'a pas d'instanciation commune aux scénarios 1, 3 et 5 : au scénario 3, le canal de coordination est le stimulus de tâche (ni piste ni danse); au scénario 5, la fourmi utilise tandem et quorum (P5-a).
3. *Recommandation :* remplacer « piste vs danse » par des **facteurs de canal** définis formellement et applicables à tous les scénarios : persistance (τ court / long), adressage (dépôt dans l'environnement / diffusion), format (scalaire / symbolique / texte). Plan fractionnaire ou plan à facteurs croisés partiels si le budget l'exige, avec contrastes planifiés.

### P7-c — Facteur « capacité » confondu · **critique**
Vérifié dans la documentation Anthropic (2026-10-01) [L] :
| | Haiku 4.5 | Sonnet 5.5 | Opus 5.5 |
|---|---|---|---|
| Identifiant | `claude-haiku-4-5-20251001` | `claude-sonnet-5-5` | `claude-opus-5-5` |
| Prix entrée / sortie ($/M jetons) | 1 / 5 | 2 / 10 | 4 / 20 |
| Réflexion | « extended » (budget manuel) | adaptative | adaptative, **toujours active** |
| Effort par défaut | non pris en charge | `high` | `medium` |
| Température réglable | oui | **non** (400 si ≠ 1,0) | **non** |
| Coupure fiable des connaissances | févr. 2025 | juin 2026 | juin 2026 |
| Retrait (au plus tôt) | **15 oct. 2026** | 28 sept. 2027 | 22 sept. 2027 |

Passer de Haiku à Sonnet à Opus change donc en même temps : génération, mode et profondeur de réflexion, contrôle de l'échantillonnage, connaissances (les modèles de 2026 connaissent mieux Deneubourg et Seeley), tokeniseur, latence et classifieurs de sécurité. « Capacité » n'est pas une variable unique.
*Recommandation :* (a) renommer le facteur « modèle » et le traiter comme catégoriel, sans prétendre à une échelle de capacité; (b) fixer explicitement l'effort (p. ex. `low` pour Sonnet et Opus) et la longueur maximale de sortie pour tous; (c) ajouter une condition **« LLM exécutant la règle »** (même modèle, règle explicite dans l'invite) pour séparer suivi d'instructions et jugement — Jimenez-Romero et al. 2025 le font implicitement [L]; (d) mesurer et rapporter les jetons de réflexion facturés comme covariable.

### P7-d — Confondants : verbosité, invite, contamination · **majeur**
- *Verbosité.* Dans le bras « diffusion », un modèle plus bavard émet des messages plus longs : la richesse du signal augmente avec le modèle. *Recommandation :* plafonner les messages en jetons ou imposer un schéma (sortie structurée), et mesurer longueur et entropie par message comme variables de contrôle.
- *Invite.* Des variations de format d'invite produisent jusqu'à 76 points d'écart d'exactitude (LLaMA-2-13B; Sclar et al., ICLR 2024) [L, résumé]. Une seule invite rend le résultat non généralisable. *Recommandation :* au moins 3 paraphrases d'invite comme facteur aléatoire; invites figées et hachées avant les runs confirmatoires; développement d'invite sur un jeu pilote distinct.
- *Contamination des connaissances.* Les modèles connaissent le pont double et la danse frétillante; ils peuvent « reconnaître » le scénario et appliquer un savoir de manuel plutôt que l'information locale. *Recommandation :* scénarios isomorphes à habillage neutre (étiquettes arbitraires), plus une sonde de reconnaissance après chaque run [I].

### P7-e — Non-stationnarité, retrait et non-déterminisme · **majeur**
- Les identifiants sont des **instantanés figés** (« Every Claude model ID is a pinned snapshot ») [L] : bonne nouvelle pour la stabilité intra-modèle. Mais les modèles sont retirés : Haiku 4.5 n'a de garantie que jusqu'au 15 octobre 2026; Sonnet 4.5 sera retiré le 30 novembre 2026; le préavis minimal est de 60 jours; Anthropic écrit elle-même que les chercheurs perdent l'accès « for ongoing and comparative studies » [L, page des dépréciations]. Une réplication indépendante après retrait est impossible.
- L'API n'a **pas de paramètre `seed`**; même à température 0, « the results will not be fully deterministic »; la température n'est plus réglable sur les modèles postérieurs à Opus 4.6 [L, référence de l'API Messages]. Mesuré ailleurs : jusqu'à 15 % de variation d'exactitude entre runs « déterministes » (Atil et al., arXiv:2408.04667) [L, résumé]; dérive de comportement d'un même service en trois mois (Chen, Zaharia et Zou, arXiv:2307.09009 : 84 % → 51 % sur les nombres premiers) [L, résumé].
- *Recommandation :* (a) traiter chaque run LLM comme un tirage stochastique (répétitions obligatoires); (b) exécuter tous les runs confirmatoires dans une **fenêtre courte**, randomiser l'ordre des cellules dans le temps et consigner date, identifiant, `request-id` et usage; (c) archiver les journaux complets (le « rejeu des journaux » prévu permet la réanalyse, pas la régénération — le dire); (d) remplacer Haiku 4.5 ou prévoir son retrait dans le plan; (e) inclure un modèle à poids ouverts figé comme ancre reproductible [I].

### P7-f — Coût, puissance et unité d'analyse · **majeur**
*Estimation de l'auditeur [I], hypothèses explicites :* 20 agents × 100 décisions = 2 000 appels par run; 1 500 jetons d'entrée par appel; sortie 150 jetons (Haiku) ou 400 jetons réflexion comprise (Sonnet, Opus); tarifs vérifiés ci-dessus; 2 architectures × 3 scénarios.
| Répétitions par cellule | Coût par run (H / S / O) | Total 18 cellules LLM | × 3 paraphrases d'invite |
|---|---|---|---|
| 30 | 4,50 $ / 14 $ / 28 $ | ≈ 8 400 $ | ≈ 25 000 $ |
| 93 (proportions 0,5 vs 0,7) | idem | ≈ 26 000 $ | ≈ 78 000 $ |
Leviers vérifiés : Batch API −50 %; lecture de cache d'invite à 10 % du prix d'entrée (5 % pour Opus 5.5) [L]. Mais une simulation pas à pas exige la réponse du pas t avant le pas t + 1 : le traitement asynchrone par lots ne convient que si l'on regroupe tous les agents de toutes les répétitions d'un même pas, au prix d'une durée totale élevée [I].
- *Interactions.* La question centrale du projet 7 est une **interaction** (architecture × modèle). Dans un plan 2 × 2 équilibré, l'erreur type d'un contraste d'interaction est le double de celle d'un effet principal : il faut ~4 fois plus de runs à taille d'effet égale, ~16 fois si l'interaction vaut la moitié de l'effet principal [I, dérivation de l'auditeur; argument connu d'A. Gelman, billet non consulté].
- *Unité d'analyse.* Les agents d'un même run ne sont pas indépendants : l'unité est le **run**; modèles mixtes avec effet aléatoire de run et de paraphrase; pas de statistiques au niveau agent (pseudo-réplication).
- *Recommandation :* run pilote pour mesurer variance et coût réels; analyse de puissance par simulation; plan séquentiel avec règle d'arrêt préenregistrée; plafond budgétaire et rapport coût/cellule dans la note.

### P7-g — Validité externe de l'analogie · **mineur**
Une colonie de 20 agents LLM sur une grille ne représente ni une fourmilière (10³ à 10⁶ individus) ni un système agentique industriel (outils, latence, coûts). *Recommandation :* section « portée des conclusions » : ce que le résultat dit des mécanismes de canal, et ce qu'il ne dit pas des insectes ni des produits.

---

## 5. Synthèse des constats

| # | Gravité | Section v3 | Constat (court) |
|---|---|---|---|
| C1 | critique | Global | Pas de QR ni d'hypothèses falsifiables |
| C2 | critique | Tableau, Q. transversale, P7 | « Richesse du signal » non opérationnalisée, confondue |
| C3 | critique | Q. transversale, P7 | « Gain collectif » sans référence ni budget égal |
| C4 | critique | Critère de rigueur | Reproduction sans tolérance ni règle de décision |
| P7-a | critique | P7 | Aucune hypothèse au projet 7 |
| P7-b | critique | P7 | Plan réel 24 cellules; architecture non instanciable |
| P7-c | critique | P7 | « Capacité » confondue (génération, réflexion, température, connaissances) |
| C5 | majeur | Thèse | Fourmi = 5 genres vs abeille = 1 espèce; paramètres non commensurables |
| C6 | majeur | — | Ni puissance, ni répétitions, ni graines |
| C7 | majeur | Technique, P3 | Artefacts : synchronie, précision `Math`, pas de temps |
| C8 | majeur | — | Pas de préenregistrement |
| C9 | majeur | Technique | Pas de DOI, licence, archivage, PGD |
| C10 | majeur | Global, P7 | État de l'art absent (bio comparée et LLM en essaim) |
| C12 | majeur | — | Éthique et limites absentes |
| P1-a | majeur | P1 | Detrain et Deneubourg 2008, de Vries et Biesmeijer 1998 non cités |
| P1-b | majeur | P1 | Cible du pont double non chiffrée |
| P1-c | majeur | P1 | VD non définies |
| P2-a | majeur | P2 | ACO/ABC confondu avec type de problème |
| P2-b | majeur | P2 | Tolérance Oliver30 dépend de la convention de distance |
| P3-a | majeur | P3 | Cible Wilson 1984 inversée |
| P3-b | majeur | P3 | Oscillation possiblement artefactuelle |
| P4-a | majeur | P4 | Nouveauté Little revendiquée à tort |
| P5-a | majeur | P5, P7 | *Temnothorax* sans piste |
| P7-d | majeur | P7 | Verbosité, invite, contamination |
| P7-e | majeur | P7 | Retrait, pas de seed, non-déterminisme |
| P7-f | majeur | P7 | Coût, puissance d'interaction, unité d'analyse |
| C11 | mineur | — | Lieux de publication non désignés |
| C13 | mineur | Parcours | Bibliographie non vérifiée |
| C14 | mineur | Parcours | Ni jalons, ni risques, ni gabarit de note |
| P1-d | mineur | P1 | Analogie à reformuler en hypothèse |
| P2-c | mineur | P2 | TR06 non évalué par les pairs; protocole à copier exactement |
| P3-c | mineur | P3 | Jones 2004 : mécanisme de seuils inféré |
| P4-b | mineur | P4 | Données de Prabhakar à vérifier |
| P5-b | mineur | P5 | VD vitesse/justesse à définir |
| P6-a | mineur | P6 | Interblocage parfois adaptatif; cible s\* disponible |
| P6-b | mineur | P6 | Couzin 2002 n'est pas un modèle de fourmis |
| P7-g | mineur | P7 | Portée des conclusions à borner |

---

## 6. Ajouts recommandés au programme (documents à produire)

1. **Plan de recherche** : QR, hypothèses, matrice de traçabilité (7.1), positionnement par projet.
2. **Revue de littérature systématique courte** (protocole, équations, critères, tableau « existant / apport »).
3. **Protocole ODD** par modèle (fourmi et abeille, chaque projet), avec section « ordre de mise à jour » et « stochasticité ».
4. **Protocole de reproduction** : cibles, niveau (relationnel / distributionnel), tolérances, n, tests, portes go/no-go (7.3).
5. **Préenregistrements OSF** par projet; *Registered Report* pour le projet 7.
6. **Plan d'analyse statistique** (ADEMP, MCSE, puissance par simulation, modèles mixtes, corrections multiples).
7. **Spécification du projet 7** : facteurs de canal, conditions de référence à budget égal, invites figées et paraphrases, schéma de journalisation, budget plafonné, fenêtre d'exécution, plan B en cas de retrait.
8. **Plan de gestion des données et du logiciel** : licences, `CITATION.cff`, Zenodo (activé avant la 1re version), Software Heritage, archivage des journaux LLM.
9. **Registre des déviations** et **registre des risques**.
10. **Charte de vulgarisation** : limites de chaque analogie, vocabulaire non anthropomorphique, séparation exploratoire/confirmatoire dans les pages.
11. **Section éthique** (simulation pure, recherche défensive au projet 6, CER si évaluation pédagogique).
12. **Plan de publication** (7.4 / C11) et **calendrier à jalons**.
13. **Gabarit de note de recherche** : ADEMP + ODD + résultats + écarts + limites + liens DOI.

---

## 7. Gabarits proposés

### 7.1 Exemples d'hypothèses falsifiables [I]
- **H1 (P1).** À débit d'information égal, la latence d'adaptation après inversion des sources croît avec la persistance du canal τ. *Réfutée si* la pente estimée de la latence en fonction de log τ a un IC à 95 % qui contient 0 ou est négatif. VD : temps jusqu'à 80 % de réallocation; probabilité de verrouillage.
- **H3 (P3).** Sous mise à jour **asynchrone**, l'amplitude d'oscillation de la variable régulée décroît avec la dispersion des seuils σ_θ. *Réfutée si* l'effet disparaît en asynchrone (artefact) ou si la pente n'est pas négative.
- **H5 (P5).** Le temps de décision croît et le taux d'erreur décroît avec le seuil de quorum Q (compromis vitesse-justesse), pour les deux mécanismes.
- **H7a.** L'avantage de la diffusion sur le dépôt persistant en latence d'adaptation augmente avec le modèle (interaction). **H7b (équivalence).** Au format scalaire, les modèles LLM ne diffèrent pas de la colonie à règles à ±δ (TOST). **H7c.** À modèle fixe, le texte libre augmente la fréquence des modes d'échec MAST par rapport au format symbolique. **H7d.** Le gain G (C3) devient nul ou négatif contre la référence « agent unique à budget égal ».

### 7.2 Variables
- **VI :** persistance τ, adressage, format du message, effectif, seuil Q, dispersion σ_θ, modèle, paraphrase d'invite (aléatoire), ordre de mise à jour.
- **VD :** latence d'adaptation, probabilité de verrouillage, justesse, temps de décision, amplitude d'oscillation, coût (jetons, $), robustesse après perturbation, fréquence des modes d'échec.
- **Contrôles :** budget de jetons, longueur max des messages, effort, environnement, graines (règles), fenêtre temporelle (LLM).

### 7.3 Exemples de tolérances de reproduction [I sauf mention]
| Cible | Source | Niveau | Critère proposé |
|---|---|---|---|
| Bifurcation de l'interblocage | Pais et al. 2013 [L] | Distributionnel | s\* estimé numériquement à ±2 % de 4v³/(v²−1)² pour v ∈ [1,5; 5] (champ moyen); en stochastique, transition de la probabilité d'interblocage centrée sur s\* |
| Oliver30 | Dorigo et al. 1996 [L] | Distributionnel | ≥ 9/10 runs atteignent 423,741 ± 10⁻³ (distances réelles) avec les paramètres publiés et NCMAX = 5 000 |
| ABC Rosenbrock 2D | Karaboga TR06 [L] | Distributionnel | 30 runs; équivalence TOST sur log10 de l'erreur, marge ±0,5 décade autour de 0,002234 |
| Relève des majors | Wilson 1984 [S] | Relationnel | Après retrait des minors, hausse du répertoire et de l'activité des majors dans le même sens, ordre de grandeur compatible avec ×1,4–4,5 et ×15–30 |
| Pont double tardif | Goss et al. 1989 [M] | Relationnel puis distributionnel | Proportion de runs verrouillés dans l'IC binomial de la proportion publiée (à extraire) |
| Inversion des sources | Seeley et al. 1991 [S] | Relationnel | Réallocation majoritaire vers la nouvelle meilleure source; délai à extraire de la figure publiée [NV] |
| Fourragement *Pogonomyrmex* | Prabhakar et al. 2012 [L] | Réplication du modèle | Corrélation simulé/observé comparable à celle publiée, si données disponibles |

### 7.4 Calendrier type [I]
Porte 0 (plan, revue, préenregistrements) → P1 → P3 → P5 (portes de reproduction) → P2, P4, P6 → pilote P7 (variance, coût) → préenregistrement P7 → exécution P7 dans une fenêtre courte → notes et dépôts DOI à chaque porte.

---

## 8. Sources consultées

Documentation et politiques
- Anthropic, Models overview — https://platform.claude.com/docs/en/about-claude/models/overview.md [L]
- Anthropic, Model deprecations — https://platform.claude.com/docs/en/about-claude/model-deprecations.md [L]
- Anthropic, Messages API (temperature, absence de seed) — https://platform.claude.com/docs/en/api/messages.md [L]
- PLOS Computational Biology, Code availability — https://journals.plos.org/ploscompbiol/s/code-availability [L]
- GitHub Docs, Referencing and citing content (Zenodo) — https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content [L]
- MDN, Math — https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math [L]
- ALIFE conferences — https://alife.org/conference/ [L]; ANTS — https://iridia.ulb.ac.be/ants/ [L]

Méthodologie de la simulation et des statistiques
- Axtell et al. 1996, doi:10.1007/bf01299065 [M]
- Wilensky et Rand 2007, JASSS 10(4) — http://ccl.northwestern.edu/2007/Wilensky&Rand_ModelsMatch(JASSS).pdf [S]
- Grimm et al. 2005, Science 310:987, doi:10.1126/science.1116681 [M]
- Grimm et al. 2020, ODD, doi:10.18564/jasss.4259 — https://www.jasss.org/23/2/7.html [S]
- Lee et al. 2015, JASSS 18(4):4 — https://www.jasss.org/18/4/4.html [L]
- Morris, White et Crowther 2019, doi:10.1002/sim.8086 [S]
- Pawel, Kook et Reeve 2024, doi:10.1002/bimj.202200091 [M]
- Lakens 2017, SPPS 8(4):355, doi:10.1177/1948550617697177 [M]
- Huberman et Glance 1993, PNAS 90:7716 — https://www.pnas.org/doi/pdf/10.1073/pnas.90.16.7716 [S]
- Sörensen, ITOR 22:3, doi:10.1111/itor.12001 [M]
- Peltz 2003, IEEE Computer 36(10):46, doi:10.1109/MC.2003.1236471 [M]
- Woolley et al. 2010, Science 330:686, doi:10.1126/science.1193147 [M] (mesure de l'intelligence collective, référence possible pour C3)

Biologie
- Detrain et Deneubourg 2008, doi:10.1016/s0065-2806(08)00002-7 [M]
- Goss et al. 1989, Naturwissenschaften 76:579 — https://www.semanticscholar.org/paper/Self-organized-shortcuts-in-the-Argentine-ant-Goss-Aron/3d07f29efdb75213aaabef4d71a263a6fa2d72cb [M]; détail du délai de 30 min [S]
- Deneubourg et al. 1990, J. Insect Behav. 3:159 [M]
- Seeley, Camazine et Sneyd 1991; Camazine et Sneyd 1991; de Vries et Biesmeijer 1998 — résultats Consensus [S]
- Wilson 1984, BES 16:89 — https://link.springer.com/article/10.1007/BF00293108 [S]
- Jones et al. 2004, Science 305:402 [S]
- Prabhakar, Dektar et Gordon 2012, PLoS Comput Biol 8:e1002670 [L, `p4src/prab2012.txt`]
- Anderson et Ratnieks 1999, Am. Nat. 154:521 — https://eprints.whiterose.ac.uk/id/eprint/1304/ [L, `p4src/ar1999I.txt`]
- Seeley et Tovey 1994, doi:10.1006/anbe.1994.1044 [M]
- Franks et al. 2002, Phil. Trans. R. Soc. B 357:1567 [S]; Franks et al. 2003, doi:10.1098/rspb.2003.2527 [M]
- Pratt et al. 2005, doi:10.1016/j.anbehav.2005.01.022 [M]
- Marshall et al. 2009, J. R. Soc. Interface 6:1065 [S]
- Seeley et al. 2012, Science 335:108 — https://research-information.bris.ac.uk/en/publications/stop-signals-provide-cross-inhibition-in-collective-decision-maki [S]
- Pais et al. 2013, PLoS ONE 8:e73216 — https://pmc.ncbi.nlm.nih.gov/articles/PMC3759446/ [L]
- Couzin et al. 2002, doi:10.1006/jtbi.2002.3065 [M]
- Jackson et al. 2004, doi:10.1038/nature03105 [M]; Robinson et al. 2005, doi:10.1038/438442a [M]; Robinson et al. 2008, doi:10.1007/s00040-008-0994-5 [M]
- Haldane et Spurway 1954, doi:10.1007/bf02222949 [M]

Optimisation
- Dorigo, Maniezzo et Colorni 1996, doi:10.1109/3477.484436 [L, `dorigo96.txt`]
- Karaboga 2005 (TR06) [L, `p2src/abc_tr06.txt`]; Karaboga et Basturk 2007, doi:10.1007/s10898-007-9149-x [M]; 2008, doi:10.1016/j.asoc.2007.05.007 [L, `p2src/abc2008.txt`]
- Socha et Dorigo 2008 (ACO_R) [L, `p2src/acor2008.txt`]

Agents LLM
- Jimenez-Romero, Yegenoglu et Blum 2025 — https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1593017/full [L]
- Ruan et al., SwarmBench — https://arxiv.org/abs/2505.04364 [L, résumé]
- Pal, Wang et Buehler, SwarmWorld — https://arxiv.org/abs/2608.26081 [L, résumé]
- Rodriguez, pressure fields — https://arxiv.org/abs/2601.08129 [L, résumé]
- Li et al., LLM-Foraging — https://arxiv.org/abs/2605.01461 [L, résumé]
- Riedl, émergence dans les LLM multi-agents — https://arxiv.org/abs/2510.05174 [L, résumé]
- Madmoun et Lahlou, EACL 2026 — https://arxiv.org/abs/2510.05748 [L, résumé]
- Cemri et al., MAST — https://arxiv.org/abs/2503.13657 [L, résumé]
- Wang et al. 2024 — https://arxiv.org/abs/2402.18272 [L, résumé]
- Larooij et Törnberg — https://arxiv.org/abs/2504.03274 [L, résumé]
- Sclar et al., ICLR 2024 — https://proceedings.iclr.cc/paper_files/paper/2024/hash/6c0e99d736da621403018ca7b32b1a4d-Abstract-Conference.html [L, résumé]
- Atil et al. — https://arxiv.org/abs/2408.04667 [L, résumé]
- Chen, Zaharia et Zou — https://arxiv.org/abs/2307.09009 [L, résumé]
- Bits & Quarks, 8 juin 2026 — https://bitsquarks.substack.com/p/the-queen-gives-no-orders [L]

---

## Annexe A — Calcul de puissance et de coût (reproductible)

```python
from statistics import NormalDist
z = NormalDist().inv_cdf
def n_prop(p1, p2, a=.05, pw=.8):
    pb = (p1 + p2) / 2
    return ((z(1-a/2)*(2*pb*(1-pb))**.5 + z(pw)*(p1*(1-p1)+p2*(1-p2))**.5)**2) / (p1-p2)**2
def n_d(d, a=.05, pw=.8): return 2*((z(1-a/2)+z(pw))/d)**2
# n_prop(.5,.7)=93 ; n_prop(.7,.9)=62 ; n_d(.5)=63 ; n_d(.3)=175 ; n_d(.5, a=.05/6)=97
price = {"haiku-4-5": (1, 5), "sonnet-5-5": (2, 10), "opus-5-5": (4, 20)}   # $/M jetons, docs 2026-10-01
out   = {"haiku-4-5": 150, "sonnet-5-5": 400, "opus-5-5": 400}            # hypothèse
calls, inp = 20*100, 1500                                                  # hypothèse
# coût par run = calls*(inp*pin + out*pout)/1e6 -> 4,50 $ / 14 $ / 28 $
# total = somme(coût run * reps) * 2 architectures * 3 scénarios -> 8 370 $ (30 reps), 25 947 $ (93 reps)
```

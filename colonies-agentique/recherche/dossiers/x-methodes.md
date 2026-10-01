# Dossier X — Méthodes : modélisation, reproduction, statistiques, science ouverte

Dossier documentaire transversal du socle S0 du programme « Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents ». Rédigé le 2026-10-01. **Statut : consolidé après vérification indépendante, 2026-10-01** (section 9). Régime : production (livrable sur lequel le chercheur va agir), avec des vérifications numériques exploratoires (section 4, script `recherche/verifications-numeriques/x_methodes_checks.py`, Python, bibliothèque standard, quelques secondes en tout).

**Légende de vérification** (appliquée à chaque affirmation chiffrée) :

- **[T]** texte intégral lu (PDF converti en texte local et lu, ou HTML de l'article).
- **[T\*]** texte intégral d'une page HTML lu par WebFetch : l'extraction est faite par un modèle auxiliaire, donc **non recoupée au PDF**. Les nombres critiques sont recalculés quand la ligne le dit.
- **[R]** résumé seulement lu (éditeur, Europe PMC, arXiv, Crossref, résultat de recherche).
- **[M]** métadonnées seulement (titre, revue, DOI).
- **[S]** rapporté par une source secondaire lue, nommée entre parenthèses.
- **[I]** inférence ou calcul de l'auteur du dossier, non publié tel quel.
- **[à confirmer]** valeur que la vérification indépendante n'a pas pu confirmer; **[non vérifiée]** référence que cette vérification n'a pas pu établir.

**Ce qui n'a pas pu être lu, et pourquoi.** L'outil de recherche scientifique est épuisé (« 30 recherches par mois, remise à zéro le 1er novembre »); le téléchargement par `curl` a été refusé par les permissions; PMC a servi un CAPTCHA (non contourné); SAGE, Wiley, ScienceDirect, TU/e et UCP (Lakens 2024), la page de Gelman et la page de Springer des revues ont répondu 403 ou servi un jeu de témoins; PubMed a servi une page de témoins; Nature et Springer ont bouclé sur un jeu de témoins (cookies); HAL a servi une page Anubis. Les affirmations touchées sont signalées référence par référence. Aucune absence de source n'est conclue faute d'avoir pu la chercher : chaque cas est classé en section 8.

---

## 1. Synthèse

1. **Trois niveaux d'accord, pas deux.** Axtell et al. 1996 définissent le *docking* (alignement de deux modèles) et trois niveaux d'équivalence : identité numérique, équivalence distributionnelle, équivalence **relationnelle**. L'expression « alignement relationnel » (cadre §6.3) est celle de Wilensky et Rand 2007 (§2.15), qui créditent Axtell et al. 1996 des trois catégories; le manuscrit d'Axtell et al. 1996 (1995-09-01) écrit « équivalence relationnelle », la version publiée n'est pas lue [T, T\*]. L'identité numérique est irréaliste pour un modèle stochastique (Axtell et al. 1996), sauf pour les entiers d'un PRNG (section 4.1).
2. **Non-rejet n'est pas équivalence.** Axtell et al. 1996 concluent à l'équivalence distributionnelle parce que Mann-Whitney (n = 10, U critique 23) et Kolmogorov-Smirnov (n = 40, seuil 0,304) ne rejettent pas [T]. Schuirmann 1987 et Lakens 2017 montrent que l'inférence correcte est le test de deux tests unilatéraux (TOST), équivalent à un IC à 90 % inclus dans la marge [R, T\*]. Appliqué aux cibles G1 du dossier P5 avec 1000 répétitions, une marge de ±2 points sur une proportion n'est **pas testable** : il faudrait environ 7 900 répétitions par bras; ±4 points exige 1 980 [I, section 4.3].
3. **ODD en sept éléments** (2006, mise à jour 2010, deuxième mise à jour 2020). L'élément « Process overview and scheduling » doit fixer l'ordre des processus **et** des agents, et dire si la mise à jour est synchrone ou asynchrone : l'ordre peut changer fortement les sorties [T, Grimm et al. 2010]. Test du dossier sur le modèle M6 de Sumpter et Pratt 2009 : synchrone ou asynchrone ne change rien (durée 276,6 contre 276,7 pas à k = 1) [I]. L'écart résiduel de +9 % avec la durée publiée n'est donc pas un effet d'ordre.
4. **ADEMP et erreur standard de Monte Carlo.** n_sim = p(1−p)/ES² (1 900 pour une couverture de 95 % à ES = 0,5 %, 10 000 au pire cas) [T\*, recalculé]. L'extraction automatique donnait pour l'ES de l'écart-type empirique « EmpSE²/√(2(n−1)) » : la forme exacte est **EmpSE/√(2(n−1))**, vérifiée par simulation [I]. La pratique publiée est mauvaise : 8 % des études de simulation en psychologie justifient n_sim, 77 % ne rapportent aucune incertitude de Monte Carlo [T\*, Siepe et al. 2024].
5. **Sensibilité des modèles à agents.** Broeke et al. 2016 comparent trois méthodes (OFAT étendue, décomposition de variance par régression, Sobol'), **pas Morris** (le criblage de Morris relève de Morris 1991 et de Campolongo et al. 2007). Ils recommandent l'OFAT étendue comme point de départ; Saltelli et al. 2019 jugent faux les travaux qui explorent seulement des couloirs à une dimension [T\*, R]. Tension réelle, à résoudre ainsi : OFAT pour les mécanismes, global (Sobol, schéma N(k+2)) pour attribuer la variance.
6. **Évaluation statistique des LLM.** Miller 2024 [T] fournit dix équations (ES par TLC, ES groupée, rééchantillonnage K, différence appariée, puissance). Deux écarts relevés : l'exemple de la §4.2 donne « 1/6 → 1/9 » alors que ses propres entrées (ρ = 0,5) donnent 1/6 → 1/12 [I]; les MDE de la §5 (13,2 % et 7,5 %) sont tronqués, non arrondis (13,27 % et 7,57 %) [I]. Bowyer et al. 2025 : le TLC sous-estime l'incertitude sous quelques centaines d'items [R].
7. **Plateforme LLM au 2026-10-01** [T\*, Anthropic 2026] : identifiants = instantanés figés; `temperature` non réglable sur les modèles postérieurs à Opus 4.6; pas de paramètre `seed` visible (extrait tronqué); Haiku 4.5 : retrait « pas avant le 2026-10-15 »; **Sonnet 4.5 déprécié le 2026-09-30, retrait le 2026-11-30** (absent du cadre).
8. **Algorithmes.** SSA : méthode directe de Gillespie (τ = (1/a₀) ln(1/r₁); j = plus petit entier tel que Σa_j > r₂a₀) [T, Gillespie 2007; les articles de 1976 et 1977 ne sont pas lus]. RK4 : rapport d'erreur ≈ 16 par division du pas par 2 sur M1c de Seeley et al. 2012 (19,3; 16,6; 16,2) [I]. PRNG : les vecteurs de test de `xoshiro128**`, PCG32 et SplitMix64 sont reproduits exactement [I]; PCG est contesté par Vigna 2026 (flux corrélés, prédictible) [S]; `Math.random` n'est pas semable [T\*, MDN 2026].
9. **Métaphores.** Sörensen 2015 est consolidé par Camacho-Villalón et al. 2023 (ITOR **2023**, 30(6), et non 2022) et par l'appel d'Aranha et al. 2022 dans *Swarm Intelligence* même (CC BY [à confirmer : version 4.0 non lue]) [R, M]. Rahman et al. 2025 posent la question pour les « essaims LLM » (calcul environ 300 fois plus long pour Boids; aucun chiffre analogue pour l'ACO) [R]. Conséquence : toute description d'algorithme du programme se fait par composants, sans métaphore.
10. **Science ouverte.** FAIR4RS 2022 (v1.0) compte 17 principes (F1–R3) [T]. CITATION.cff 1.2.0 : clés obligatoires `cff-version`, `message`, `title`, `authors` [T\*]. **Zenodo ignore CITATION.cff si un `.zenodo.json` existe** [T\*]. L'archivage à chaque *release* suppose un dépôt public sous licence (exigence de la doc GitHub [T\*]; les pages Zenodo lues ne l'énoncent pas); des dépôts « liés » sans webhook existent (issue zenodo #2281) [S]. SWHID : norme ISO/IEC 18670 depuis le 2025-04-23 [T\*]. La politique des trois organismes sur la gestion des données de recherche (GDR) couvre le dépôt des **données, métadonnées et code** qui appuient les conclusions [T\*].
11. **Échéances.** **AAMAS 2027 (Hanoi, 3–7 mai 2027) : résumé le 2026-10-01 (aujourd'hui), article le 2026-10-08** (fin du jour indiqué, UTC−12) [T\*] : hors de portée pour P7 (phase 3); la piste « Blue Sky Ideas » (12 nov. 2026) pourrait accueillir la typologie du cadre §2.2 [I]. ALIFE 2027 : Prague, 19–23 juillet 2027, échéances non publiées [T\*]. *J R Soc Interface* demande code et données publics à la publication et disponibles dès la soumission; *PLOS Comput Biol* exige le code à la publication (politique du 2021-03-30) [S, T\*].
12. **Résultats différents de ce que la portée laissait attendre** : Broeke et al. 2016 sans Morris; « alignement relationnel » est l'étiquette de Wilensky et Rand 2007, « équivalence relationnelle » celle du manuscrit d'Axtell et al. 1996; le protocole d'évaluation OPE est de Planque et al. 2022 [non vérifiée], non de Grimm et al.; Camacho-Villalón et al. 2023 paraît en 2023; ANTS 2028 est annoncée sans lieu trouvé; l'exemple §4.2 de Miller 2024 est inexact.

---

## 2. Références

Statut : **vérifiée** = référence confirmée par la vérification indépendante; **corrigée** = confirmée après correction; **non vérifiée** = non établie. Colonne « Lu » : ce qui a été lu réellement.

### 2.1 Références demandées par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Grimm et al. 2006 | Grimm, V., Berger, U., Bastiansen, F., Eliassen, S., Ginot, V., Giske, J., et al. (2006). A standard protocol for describing individual-based and agent-based models. *Ecological Modelling*, 198(1–2), 115–126. | 10.1016/j.ecolmodel.2006.04.023 | vérifiée | [T] (PDF auteur) |
| Grimm et al. 2010 | Grimm, V., Berger, U., DeAngelis, D. L., Polhill, J. G., Giske, J., Railsback, S. F. (2010). The ODD protocol: a review and first update. *Ecological Modelling*, 221(23), 2760–2768. | 10.1016/j.ecolmodel.2010.08.019 | vérifiée | [T] (manuscrit auteur; pagination du manuscrit, pas de l'éditeur; chiffres de M1 revérifiés sur le PDF de l'éditeur) |
| Grimm et al. 2020 | Grimm, V., Railsback, S. F., Vincenot, C. E., Berger, U., Gallagher, C., DeAngelis, D. L., Edmonds, B., Ge, J., Giske, J., Groeneveld, J., Johnston, A. S. A., Milles, A., Nabe-Nielsen, J., Polhill, J. G., Radchuk, V., Rohwäder, M.-S., Stillman, R. A., Thiele, J. C., Ayllón, D. (2020). The ODD protocol for describing agent-based and other simulation models: a second update to improve clarity, replication, and structural realism. *JASSS*, 23(2), 7 (2020-03-31). | 10.18564/jasss.4259 · jasss.org/23/2/7.html | corrigée | [T\*] HTML; [T] PDF (chiffres illisibles à l'extraction) et supplément S7 |
| Grimm et al. 2005 | Grimm, V., Revilla, E., Berger, U., Jeltsch, F., Mooij, W. M., Railsback, S. F., Thulke, H.-H., Weiner, J., Wiegand, T., DeAngelis, D. L. (2005). Pattern-oriented modeling of agent-based complex systems: lessons from ecology. *Science*, 310, 987–991. | 10.1126/science.1116681 · PMID 16284171 | vérifiée | [R] |
| Axtell et al. 1996 | Axtell, R., Axelrod, R., Epstein, J. M., Cohen, M. D. (1996). Aligning simulation models: a case study and results. *Computational and Mathematical Organization Theory*, 1(2), 123–141. | 10.1007/BF01299065 | vérifiée | [T] (version auteur du 1995-09-01) |
| Wilensky et Rand 2007 | Wilensky, U., Rand, W. (2007). Making models match: replicating an agent-based model. *JASSS*, 10(4), 2 (2007-10-31). | jasss.org/10/4/2.html | vérifiée | [T\*] (deux passes) |
| Broeke et al. 2016 | ten Broeke, G., van Voorn, G., Ligtenberg, A. (2016). Which sensitivity analysis method should I use for my agent-based model? *JASSS*, 19(1), 5 (2016-01-31). | jasss.org/19/1/5.html | corrigée | [T\*] |
| Saltelli 2002 | Saltelli, A. (2002). Making best use of model evaluations to compute sensitivity indices. *Computer Physics Communications*, 145(2), 280–297. | 10.1016/S0010-4655(02)00280-1 | vérifiée | [M] |
| Saltelli et al. 2010 | Saltelli, A., Annoni, P., Azzini, I., Campolongo, F., Ratto, M., Tarantola, S. (2010). Variance based sensitivity analysis of model output. Design and estimator for the total sensitivity index. *Computer Physics Communications*, 181(2), 259–270. | 10.1016/j.cpc.2009.09.018 | vérifiée | [M] (pas de résumé dans Crossref) |
| Saltelli et al. 2019 | Saltelli, A., Aleksankina, K., Becker, W., Fennell, P., Ferretti, F., Holst, N., Li, S., Wu, Q. (2019). Why so many published sensitivity analyses are false: a systematic review of sensitivity analysis practices. *Environmental Modelling & Software*, 114, 29–39. | 10.1016/j.envsoft.2019.01.012 | vérifiée | [R] (CC BY 4.0 [à confirmer]; texte non lu : ScienceDirect 403) |
| Morris et al. 2019 | Morris, T. P., White, I. R., Crowther, M. J. (2019). Using simulation studies to evaluate statistical methods. *Statistics in Medicine*, 38(11), 2074–2102. | 10.1002/sim.8086 · PMC6492164 | vérifiée | [T\*] ; ES de Monte Carlo recalculés par simulation [I]; numérotation « Tableau 6 », « §5.3 » de la version publiée non vérifiée [à confirmer] (préimpression v1 [T] : formules au §5.2, calcul de n_sim au §5.4) |
| Schuirmann 1987 | Schuirmann, D. J. (1987). A comparison of the two one-sided tests procedure and the power approach for assessing the equivalence of average bioavailability. *J. Pharmacokinetics and Biopharmaceutics*, 15(6), 657–680. | 10.1007/BF01068419 · PMID 3450848 | vérifiée | [R] |
| Lakens 2017 | Lakens, D. (2017). Equivalence tests: a practical primer for t tests, correlations, and meta-analyses. *Social Psychological and Personality Science*, 8(4), 355–362. | 10.1177/1948550617697177 · PMC5502906 | vérifiée | [T\*] |
| Lakens et al. 2018 | Lakens, D., Scheel, A. M., Isager, P. M. (2018). Equivalence testing for psychological research: a tutorial. *Advances in Methods and Practices in Psychological Science*, 1(2), 259–269. | 10.1177/2515245918770963 | vérifiée | [R] (résumé via TU/e; SAGE 403) |
| Miller 2024 | Miller, E. (2024). Adding error bars to evals: a statistical approach to language model evaluations. arXiv:2411.00640 (v1, 2024-11-01; 14 p.). | arxiv.org/abs/2411.00640 | corrigée | [T] (PDF local) |
| Gillespie 1977 | Gillespie, D. T. (1977). Exact stochastic simulation of coupled chemical reactions. *J. Physical Chemistry*, 81(25), 2340–2361. | 10.1021/j100540a008 | corrigée | [M] + [S] (résumé de recherche); **texte non lu** |
| Gillespie 1976 | Gillespie, D. T. (1976). A general method for numerically simulating the stochastic time evolution of coupled chemical reactions. *J. Computational Physics*, 22(4), 403–434. (ajoutée à la consolidation : réf. 8 de Gillespie 2007) | 10.1016/0021-9991(76)90041-3 | vérifiée | [M] (Crossref, consulté à la consolidation); **texte non lu** |
| Gillespie 2007 | Gillespie, D. T. (2007). Stochastic simulation of chemical kinetics. *Annu. Rev. Phys. Chem.*, 58, 35–55. (ajoutée : seule source lue de l'algorithme) | 10.1146/annurev.physchem.58.032806.104637 | vérifiée | [T] |
| Wikipedia 2026 | Wikipedia, « Runge–Kutta methods » (consultée le 2026-10-01) : méthode de Runge–Kutta classique d'ordre 4, formules et ordres d'erreur. Origines : voir Runge 1895 / Kutta 1901 [non vérifiée]. | en.wikipedia.org/wiki/Runge–Kutta_methods | vérifiée | [S] (Wikipédia : formules, ordres d'erreur); **originaux non vérifiés** |
| O'Neill 2014 | O'Neill, M. E. (2014). PCG: a family of simple fast space-efficient statistically good algorithms for random number generation. Rapport technique HMC-CS-2014-0905, Harvey Mudd College (2014-09-05). Non évalué par les pairs. | cs.hmc.edu/tr/hmc-cs-2014-0905.pdf | vérifiée | [T] (PDF; certains chiffres illisibles à l'extraction) |
| Blackman et Vigna 2021 | Blackman, D., Vigna, S. (2021). Scrambled linear pseudorandom number generators. *ACM Trans. Math. Softw.*, 47(4), 1–32 (2021-09-28). | 10.1145/3460772 · arXiv:1805.01407 (v3, 2022-03-28) | vérifiée | [T] (arXiv v3) |
| Sörensen 2015 | Sörensen, K. (2015). Metaheuristics — the metaphor exposed. *Int. Trans. Oper. Res.*, 22(1), 3–18. | 10.1111/itor.12001 | vérifiée | [R] |
| Barker et al. 2022 | Barker, M., Chue Hong, N. P., Katz, D. S., Lamprecht, A.-L., Martinez-Ortiz, C., Psomopoulos, F., Harrow, J., Castro, L. J., Gruenpeter, M., Martinez, P. A., Honeyman, T. (2022). Introducing the FAIR Principles for research software. *Scientific Data*, 9, 622 (2022-10-14). | 10.1038/s41597-022-01710-x | vérifiée | [M] + [R] (résultat de recherche); **article non lu** (Nature : témoins; PMC : CAPTCHA). Principes lus dans FAIR4RS 2022 |
| FAIR4RS 2022 | Chue Hong, N. P., Katz, D. S., Barker, M., et al. (FAIR4RS WG) (2022). FAIR Principles for Research Software (FAIR4RS Principles), v1.0, recommandation RDA (2022-05-24). CC BY 4.0. | 10.15497/RDA00068 · zenodo.org/record/6623556 | vérifiée | [T] (PDF) |
| CFF 2026 | Citation File Format 1.2.0 (citation-file-format.github.io). Zenodo : help.zenodo.org/docs/github/describe-software/citation-file/. GitHub : docs « About CITATION files ». | citation-file-format.github.io | vérifiée | [T\*] |
| GitHub et Zenodo 2026 | GitHub Docs « Referencing and citing content »; Zenodo : « Enable a repository », « Archive a release from GitHub »; Zenodo blog, « DOI versioning launched » (2017-05-30). | docs.github.com; help.zenodo.org; blog.zenodo.org/2017/05/30/doi-versioning-launched | vérifiée | [T\*] (docs); [R] (blog); l'exigence dépôt public + licence + approbation de l'organisation est dans la doc GitHub, non dans les pages Zenodo lues |
| SWH 2026 | Software Heritage, FAQ (SWHID, Save Code Now, codemeta). | softwareheritage.org/faq/ | vérifiée | [T\*] |
| choosealicense et CC 2026 | choosealicense.com (MIT, Apache-2.0); Creative Commons CC BY 4.0 et FAQ (logiciel, bases de données). | choosealicense.com; creativecommons.org | vérifiée | [T\*] |
| Tri-Agence 2025 | Politique des trois organismes sur la gestion des données de recherche (page mise à jour le 2025-12-19); DMP Assistant (Portage / Alliance de recherche numérique du Canada). | science.gc.ca (politique); alliancecan.ca (DMP Assistant) | vérifiée | [T\*] (politique); [S] (DMP Assistant) |
| Chambers 2013 | Chambers, C. D. (2013). Registered reports: a new publishing initiative at Cortex. *Cortex*, 49(3), 609–610. | 10.1016/j.cortex.2012.12.016 · PMID 23347556 | vérifiée | [M] |
| Chambers et Tzavella 2022 | Chambers, C. D., Tzavella, L. (2022). The past, present and future of Registered Reports. *Nature Human Behaviour*, 6(1), 29–42. | 10.1038/s41562-021-01193-7 · PMID 34782730 | vérifiée | [R] |
| Nosek et al. 2018 | Nosek, B. A., Ebersole, C. R., DeHaven, A. C., Mellor, D. T. (2018). The preregistration revolution. *PNAS*, 115(11), 2600–2606. | 10.1073/pnas.1708274114 · PMC5856500 | vérifiée | [R] |
| OSF 2026 | OSF Support, « Welcome to Registrations & Preregistrations » ; COS, « Registered Reports ». | help.osf.io/article/330-welcome-to-registrations ; cos.io/initiatives/registered-reports | vérifiée | [T\*] |
| JRSI 2026 | *Journal of the Royal Society Interface* : portée, politique de données et code. | royalsocietypublishing.org/rsif | vérifiée | [S] (résultats de recherche; page directe 403) |
| PLOS CB 2021 | *PLOS Computational Biology* : politique de disponibilité du code; types d'articles. | journals.plos.org/ploscompbiol/s/code-availability | vérifiée | [T\*] |
| Swarm Intelligence 2026 | *Swarm Intelligence* (Springer) : portée. | link.springer.com/journal/11721 | vérifiée | [S] (résultat de recherche; page directe : témoins) |
| ALIFE 2027 | ALIFE 2027, Prague (UCT Prague, ČVUT) ; ISAL, page des conférences. | 2027.alife.org → alife.vscht.cz ; alife.org/conference/ | vérifiée | [T\*] |
| JASSS 2026 | *JASSS* : portée, recommandations ODD et code; CoMSES. | jasss.org | vérifiée | [S] (résultats de recherche; page d'accueil vide à l'extraction) |
| AAMAS 2027 | AAMAS 2027 (Hanoï, 3–7 mai 2027) : appels (échéances à la fin du jour indiqué, UTC−12; inscription des auteurs sur OpenReview le 2026-09-17). | warwick.ac.uk/fac/sci/dcs/aamas2027/ | vérifiée | [T\*] |
| JAAMAS 2026 | *Autonomous Agents and Multi-Agent Systems* (Springer) : portée; partenariat IFAAMAS. | link.springer.com/journal/10458 | vérifiée | [S] (résultats de recherche) |

### 2.2 Références ajoutées : les dix plus importantes que la portée ne nomme pas

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Siepe et al. 2024 | Siepe, B. S., Bartoš, F., Morris, T. P., Boulesteix, A.-L., Heck, D. W., Pawel, S. (2024). Simulation studies for methodological research in psychology: a standardized template for planning, preregistration, and reporting (ADEMP-PreReg). *Psychological Methods*. | 10.1037/met0000695 · PMC7616844 | vérifiée | [T\*] |
| Pawel et al. 2024 | Pawel, S., Kook, L., Reeve, K. (2024). Pitfalls and potentials in simulation studies: questionable research practices in comparative simulation studies allow for spurious claims of superiority of any method. *Biometrical Journal*, 66(1), e2200091. | 10.1002/bimj.202200091 | vérifiée | [R] |
| Thiele et al. 2014 | Thiele, J. C., Kurth, W., Grimm, V. (2014). Facilitating parameter estimation and sensitivity analysis of agent-based models: a cookbook using NetLogo and R. *JASSS*, 17(3), 11. | 10.18564/jasss.2503 · jasss.org/17/3/11.html | vérifiée | [T\*] |
| Edmonds et Hales 2003 | Edmonds, B., Hales, D. (2003). Replication, replication and replication: some hard lessons from model alignment. *JASSS*, 6(4), 11. | jasss.org/6/4/11.html | vérifiée | [T\*] |
| Hauke et al. 2020 | Hauke, J., Achter, S., Meyer, M. (2020). Theory development via replicated simulations and the added value of standards. *JASSS*, 23(1), 12. | jasss.soc.surrey.ac.uk/23/1/12.html | corrigée | [T\*] |
| Lakens 2024 | Lakens, D. (2024). When and how to deviate from a preregistration. *Collabra: Psychology*, 10(1), 117094 ; chapitre 13 de *Improving Your Statistical Inferences* (2022). | 10.1525/collabra.117094 ; 10.5281/zenodo.6409077 | vérifiée | [R] (article : 403); chapitre : [T\*] non recoupé, [M] seulement à la vérification |
| Willroth et Atherton 2024 | Willroth, E. C., Atherton, O. E. (2024). Best laid plans: a guide to reporting preregistration deviations. *Adv. Methods Pract. Psychol. Sci.*, 7(1). | 10.1177/25152459231213802 | vérifiée | [R] |
| Bowyer et al. 2025 | Bowyer, S., Aitchison, L., Ivanova, D. R. (2025). Position: don't use the CLT in LLM evals with fewer than a few hundred datapoints. ICML 2025 (spotlight). | arXiv:2503.01747 | vérifiée | [R] |
| Atil et al. 2024 | Atil, B., et al. (2024). Non-determinism of « deterministic » LLM settings. arXiv:2408.04667 (v5, 2025-04-02). | arXiv:2408.04667 | vérifiée | [R] |
| Aranha et al. 2022 | Aranha, C., Camacho Villalón, C. L., Campelo, F., Dorigo, M., Ruiz, R., Sevaux, M., Sörensen, K., Stützle, T. (2022). Metaphor-based metaheuristics, a call for action: the elephant in the room. *Swarm Intelligence*, 16(1), 1–6 (en ligne 2021-11-30). CC BY (version 4.0 non lue [à confirmer]). | 10.1007/s11721-021-00202-9 | vérifiée | [M] |

### 2.3 Références complémentaires (toutes consultées)

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Camacho-Villalón et al. 2023 | Camacho-Villalón, C. L., Dorigo, M., Stützle, T. (2023). Exposing the grey wolf, moth-flame, whale, firefly, bat, and antlion algorithms: six misleading optimization techniques inspired by bestial metaphors. *Int. Trans. Oper. Res.*, 30(6), 2945–2971 (en ligne 2022). | 10.1111/itor.13176 | vérifiée | [R] |
| Rahman et al. 2025 | Rahman, M. A. U., Schranz, M., Hayat, S. (2025; v3 2026-08-27). LLM-powered swarms: a new frontier or a conceptual stretch? arXiv:2506.14496. | arXiv:2506.14496 | corrigée | [R] |
| Madaan et al. 2024 | Madaan, L., et al. (2024). Quantifying variance in evaluation benchmarks. arXiv:2406.10229. | arXiv:2406.10229 | vérifiée | [R] |
| Card et al. 2020 | Card, D., Henderson, P., Khandelwal, U., Jia, R., Mahowald, K., Jurafsky, D. (2020). With little power comes great responsibility. EMNLP 2020. | arXiv:2010.06595 | vérifiée | [R] |
| Kapoor et al. 2024 | Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., Narayanan, A. (2024). AI agents that matter. arXiv:2407.01502. | arXiv:2407.01502 | vérifiée | [R] |
| Chen et al. 2023 | Chen, L., Zaharia, M., Zou, J. (2023). How is ChatGPT's behavior changing over time? arXiv:2307.09009 (v3, 2023-10-31). | arXiv:2307.09009 | vérifiée | [R] |
| Sclar et al. 2024 | Sclar, M., Choi, Y., Tsvetkov, Y., Suhr, A. (2024). Quantifying language models' sensitivity to spurious features in prompt design or: how I learned to start worrying about prompt formatting. ICLR 2024 (arXiv:2310.11324, 2023-10-17). (ajoutée à la consolidation : citée par l'audit méthodologie) | arXiv:2310.11324 | vérifiée | [R] (arXiv, consulté à la consolidation) |
| Anthropic 2026 | Anthropic, documentation API : « Models overview », « Model deprecations », « Messages » (consultées le 2026-10-01). | platform.claude.com/docs/en/about-claude/models/overview ; …/model-deprecations ; …/api/messages | vérifiée | [T\*] |
| Judd et al. 2012 | Judd, C. M., Westfall, J., Kenny, D. A. (2012). Treating stimuli as a random factor in social psychology. *J. Personality and Social Psychology*, 103(1), 54–69. | 10.1037/a0028347 · PMID 22612667 | vérifiée | [R] |
| Barr et al. 2013 | Barr, D. J., Levy, R., Scheepers, C., Tily, H. J. (2013). Random effects structure for confirmatory hypothesis testing: keep it maximal. *J. Memory and Language*, 68(3), 255–278. | 10.1016/j.jml.2012.11.001 · PMC3881361 | vérifiée | [R] |
| Bates et al. 2015 | Bates, D., Mächler, M., Bolker, B., Walker, S. (2015). Fitting linear mixed-effects models using lme4. *J. Statistical Software*, 67(1). | 10.18637/jss.v067.i01 · arXiv:1406.5823 | vérifiée | [R] |
| Green et MacLeod 2016 | Green, P., MacLeod, C. J. (2016). SIMR: an R package for power analysis of generalized linear mixed models by simulation. *Methods in Ecology and Evolution*, 7(4), 493–498. | 10.1111/2041-210X.12504 | vérifiée | [R] (résultat de recherche) |
| Holm 1979 | Holm, S. (1979). A simple sequentially rejective multiple test procedure. *Scandinavian J. Statistics*, 6, 65–70 (numéro (2) [à confirmer]). | 10.2307/4615733 | vérifiée | [R] (résultat de recherche) |
| Benjamini et Hochberg 1995 | Benjamini, Y., Hochberg, Y. (1995). Controlling the false discovery rate: a practical and powerful approach to multiple testing. *J. R. Stat. Soc. B*, 57(1), 289–300. | 10.1111/j.2517-6161.1995.tb02031.x | vérifiée | [M] |
| Gelman 2018 | Gelman, A. (2018-03-15). You need 16 times the sample size to estimate an interaction than to estimate a main effect. Blog *Statistical Modeling, Causal Inference, and Social Science*. | statmodeling.stat.columbia.edu/2018/03/15/need16/ | vérifiée | [S] (résumé de recherche; page 403); calcul refait [I] |
| Lee et al. 2015 | Lee, J.-S., Filatova, T., Ligmann-Zielinska, A., et al. (2015). The complexities of agent-based modeling output analysis. *JASSS*, 18(4), 4. | jasss.org/18/4/4.html | vérifiée | [T\*]; formule du n minimal revérifiée sur le PDF [T] (voir M4) |
| Campelo et Wanner 2019 | Campelo, F., Wanner, E. F. (2019). Sample size calculations for the experimental comparison of multiple algorithms on multiple problem instances. arXiv:1908.01720 (soumis au *J. Heuristics*). | arXiv:1908.01720 | vérifiée | [R] |
| Bartz-Beielstein et al. 2020 | Bartz-Beielstein, T., Doerr, C., et al. (2020). Benchmarking in optimization: best practice and open issues. arXiv:2007.03488. | arXiv:2007.03488 | vérifiée | [R] |
| Derrac et al. 2011 | Derrac, J., García, S., Molina, D., Herrera, F. (2011). A practical tutorial on the use of nonparametric statistical tests as a methodology for comparing evolutionary and swarm intelligence algorithms. *Swarm and Evolutionary Computation*, 1(1), 3–18. | 10.1016/j.swevo.2011.02.002 | vérifiée | [M] |
| Arcuri et Briand 2011 | Arcuri, A., Briand, L. (2011). A practical guide for using statistical tests to assess randomized algorithms in software engineering. ICSE 2011. | 10.1145/1985793.1985795 | vérifiée | [M] + [R] (résultat de recherche) |
| Grimm et Railsback 2012 | Grimm, V., Railsback, S. F. (2012). Pattern-oriented modelling: a « multi-scope » for predictive systems ecology. *Phil. Trans. R. Soc. B*, 367(1586), 298–310. | 10.1098/rstb.2011.0180 · PMC3223804 | vérifiée | [R] |
| Grimm et al. 2014 | Grimm, V., Augusiak, J., Focks, A., Frank, B. M., Gabsi, F., et al. (2014). Towards better modelling and decision support: documenting model development, testing, and analysis using TRACE. *Ecological Modelling*, 280, 129–139. | 10.1016/j.ecolmodel.2014.01.018 | vérifiée | [R] |
| Planque et al. 2022 | Planque, B., Aarflot, J. M., Buttay, L., et al. (2022). A standard protocol for describing the evaluation of ecological models (protocole OPE : Objectives, Patterns, Evaluation; 25 questions, six études de cas). Prépublication Zenodo (2022-01-21); publié dans *Ecological Modelling* 471 (110059) (2022-07-21). | 10.5281/zenodo.5886180 · 10.1016/j.ecolmodel.2022.110059 | non vérifiée | [R] (Zenodo); revue [S] (résultat de recherche); résumés de la préimpression et de la version publiée relus à la consolidation [R] : 25 questions et six études de cas; texte publié non lu |
| Müller et al. 2013 | Müller, B., Bohn, F., Dreßler, G., et al. (2013). Describing human decisions in agent-based models — ODD+D, an extension of the ODD protocol. *Environmental Modelling & Software*, 48, 37–48. | 10.1016/j.envsoft.2013.06.003 | vérifiée | [M] |
| Galán et al. 2009 | Galán, J. M., Izquierdo, L. R., Izquierdo, S. S., Santos, J. I., del Olmo, R., López-Paredes, A., Edmonds, B. (2009). Errors and artefacts in agent-based modelling. *JASSS*, 12(1), 1. | jasss.org/12/1/1.html | vérifiée | [T\*] |
| Huberman et Glance 1993 | Huberman, B. A., Glance, N. S. (1993). Evolutionary games and computer simulations. *PNAS*, 90, 7716–7718. | 10.1073/pnas.90.16.7716 · PMC47213 | vérifiée | [R] |
| Caron-Lormier et al. 2008 | Caron-Lormier, G., Humphry, R. W., Bohan, D. A., Hawes, C., Thorbek, P. (2008). Asynchronous and synchronous updating in individual-based models. *Ecological Modelling*, 212(3–4), 522–527. | 10.1016/j.ecolmodel.2007.10.049 | corrigée | [R] |
| Campolongo et al. 2007 | Campolongo, F., Cariboni, J., Saltelli, A. (2007). An effective screening design for sensitivity analysis of large models. *Environmental Modelling & Software*, 22(10), 1509–1518. | 10.1016/j.envsoft.2006.10.004 | vérifiée | [M] |
| Morris 1991 | Morris, M. D. (1991). Factorial sampling plans for preliminary computational experiments. *Technometrics*, 33(2), 161–174. | 10.1080/00401706.1991.10484804 | vérifiée | [M] |
| Sobol' 2001 | Sobol′, I. M. (2001). Global sensitivity indices for nonlinear mathematical models and their Monte Carlo estimates. *Math. Comput. Simul.*, 55(1–3), 271–280. | 10.1016/S0378-4754(00)00270-6 | vérifiée | [M] |
| Vigna 2026 | Vigna, S. Page « PCG » (critique des générateurs PCG), pcg.di.unimi.it. | pcg.di.unimi.it/pcg.php | vérifiée | [S] (page d'opinion de l'auteur de xoshiro; résumée par WebFetch) |
| MDN 2026 | MDN, `Math.random()`; V8 blog, « There's Math.random(), and then there's Math.random() » (2015-12-17). | developer.mozilla.org; v8.dev/blog/math-random | vérifiée | [T\*] |
| rust-random 2026 | Dépôt rust-random/rngs : tests de référence de rand_xoshiro (`xoshiro128**`, SplitMix64) et rand_pcg (Lcg64Xsh32). | github.com/rust-random/rngs | vérifiée | [T\*] (vecteurs et constantes) |
| He 2026 | He, Z. (2026-07-30). VISA: a structured description protocol for agent-based simulation models towards machine reproducibility. arXiv:2607.28027 (prépublication). | arXiv:2607.28027 | vérifiée | [R] |
| Vanhée et al. 2025 | Vanhée, L., Borit, M., Siebers, P.-O., et al. (2025). Large language models for agent-based modelling: current and possible uses across the modelling cycle. arXiv:2507.05723. | arXiv:2507.05723 | vérifiée | [R]; texte intégral relu à la vérification [T] : recommande des protocoles structurés (« e.g., ODD, RAT ») |
| Sauro et al. 2025 | Sauro, H. M., et al. (2025). From FAIR to CURE: guidelines for computational models of biological systems. arXiv:2502.15597. | arXiv:2502.15597 | vérifiée | [R] |
| CoMSES 2026 | CoMSES Net : normes de partage de modèles (ODD, codemeta, DataCite); lien vers une liste de revues (liste non lue). | comses.net/resources/standards/ | vérifiée | [T\*] |
| Steele et al. 2014 | Steele, G. L., Lea, D., Flood, C. H. (2014). Fast splittable pseudorandom number generators. OOPSLA '14, p. 453–472 (SplitMix; référence [36] de Blackman et Vigna). | 10.1145/2660193.2660195 | vérifiée | [M] (liste de références de Blackman et Vigna 2021) |
| Matsumoto et al. 2007 | Matsumoto, M., Wada, I., Kuramoto, A., Ashihara, H. (2007). Common defects in initialization of pseudorandom number generators. *ACM Trans. Model. Comput. Simul.*, 17(4) (référence [27] de Blackman et Vigna, sur l'initialisation par un générateur de nature différente). | — | vérifiée | [M] (liste de références de Blackman et Vigna 2021) |
| Smith et al. 2016 | Smith, A. M., Katz, D. S., Niemeyer, K. E., FORCE11 Software Citation Working Group (2016). Software citation principles. *PeerJ Computer Science*, 2, e86. | 10.7717/peerj-cs.86 | vérifiée | [M] + [R] |
| Wilkinson et al. 2016 | Wilkinson, M. D., Dumontier, M., Aalbersberg, I. J., et al. (2016). The FAIR Guiding Principles for scientific data management and stewardship. *Scientific Data*, 3, 160018. | 10.1038/sdata.2016.18 | vérifiée | [M] |
| GECCO 2027 | GECCO 2027, Cracovie, 12–16 juillet 2027 (site officiel); échéances 2027 [à confirmer] : le site officiel affiche encore celles de 2026, les dates 2027 viennent d'un résumé de recherche wikicfp. | gecco-2027.sigevo.org; wikicfp.com (eventid 201407) | non vérifiée | [S] pour les échéances; site officiel lu pour le lieu et les dates de conférence |
| ANTS 2026 | ANTS 2026 (15e conférence, Darmstadt, 8–10 juin 2026; 93 soumissions) ; ANTS 2028 annoncée. | iridia.ulb.ac.be/ants/ | vérifiée | [S] (résultats de recherche) |
| Di Cosmo et Zacchiroli 2017 | Di Cosmo, R., Zacchiroli, S. (2017). Software Heritage: why and how to preserve software source code. iPRES 2017. | hal-01590958 | vérifiée | [M] (API HAL, hal-01590958 : communication à iPRES 2017, 14e conférence; sans DOI); page HAL bloquée (Anubis), non contourné |
| Runge 1895 / Kutta 1901 | Références originales de RK4 (années approximatives [à confirmer]; titres non cités faute de source lue). | — | non vérifiée | Non cherchées dans une source primaire (voir Wikipedia 2026); la page Wikipédia consultée ne contient pas la liste de références |

---

## 3. Méthodes, équations et paramètres

Chaque méthode suit le même gabarit : définition, énoncé (équations et paramètres tels que publiés), valeurs recommandées, application au programme. Les valeurs « recommandées » portent [I] quand elles ne viennent pas d'une source.

### M1 — Description des modèles : ODD (Grimm et al. 2006, Grimm et al. 2010, Grimm et al. 2020)

**Définition.** Protocole standard de description des modèles à agents (ABM) ou à individus; indépendant du logiciel; la version 2020 vise tout modèle de simulation [T\*].

**Énoncé.**
- Éléments (2020) : 1 *Purpose and patterns*; 2 *Entities, state variables and scales*; 3 *Process overview and scheduling*; 4 *Design concepts*; 5 *Initialization*; 6 *Input data*; 7 *Submodels* [T\*]. En 2006, sept éléments aussi, mais *Purpose*, *State variables and scales*, *Input* [T].
- 2010 [T] : renommages (éléments 2 et 6), *Fitness* devient *Objectives*, deux concepts s'ajoutent (*Basic principles*, *Learning*) : onze concepts de conception. 2020 [T] : *Basic principles* reste en tête des onze concepts (fig. 1 de 2020; *Theoretical and empirical background* est un élément d'ODD+D, Müller et al. 2013, cité dans le texte de 2020 à propos des patrons); l'élément 1 gagne la notion de *patterns* (critères d'évaluation du modèle); sous-sections *Rationale* facultatives; ODD résumé (S2), imbriqué (S3), delta-ODD (S4), licence de l'ODD (S5), exemples TRACE (S6), gabarit d'expériences de simulation (S7) [T\*].
- Utiliser ODD, c'est utiliser exactement ces identifiants dans cet ordre (numérotation facultative en 2010 [T, Grimm et al. 2010 §3, légende de la fig. 1]; en 2020, éléments à reprendre tels que donnés, numérotation comprise [T, Grimm et al. 2020, légende de la fig. 1]).
- *Process overview and scheduling* : pseudo-code détaillé hors des calendriers très simples; préciser l'ordre des processus et celui des agents au sein d'un processus (aléatoire, fixe, trié), et mise à jour **immédiate (asynchrone) ou différée (synchrone)**; l'ordre peut avoir un effet très grand sur les sorties (Bigbee et al. 2006; Caron-Lormier et al. 2008, cités) [T].
- *Input data* ne désigne ni les paramètres ni les valeurs initiales; sans entrée externe, le dire [T, 2010]. Pour une reproductibilité complète, fournir en archive les fichiers d'entrée, y compris la graine du générateur aléatoire [T, 2006 §2.6, paraphrase].
- *Submodels* : équations et algorithmes d'abord; tableau des paramètres avec dimension, unité, valeur [T, 2010].
- Revue de 54 publications (jusqu'en décembre 2009) : *Input* correct dans 62 % des cas; 75 % suivent ODD complètement ou avec au plus un élément manquant; 11 % le mal interprètent sur plus de la moitié [T].
- Citation : citer 2006 et 2020 pour que l'usage soit suivi [T\*]; la mise à jour de 2010 demande « 2006; 2010 » [T].
- Expériences de simulation (S7) : section « Calibration, simulation experiments, and model analysis » en quatre sous-sections (calibration et vérification des sorties; corroboration; sensibilité; expériences), avec but, plages de paramètres, pas de temps, durée, conditions d'arrêt, **nombre de répétitions**, variables observées, analyses statistiques [T].

**Valeurs recommandées [I].** Un ODD complet par modèle de référence (couche 2 du cadre §7) et par modèle chorégraphique commun (couche 3); un delta-ODD par variante de canal; un ODD résumé dans la note de recherche, l'ODD complet en annexe; la section S7 dans chaque fiche de reproduction.

**Application.** Pour un modèle EDO ou SSA (Seeley et al. 2012, Pais et al. 2013), les entités sont des populations Ψ; l'ordonnancement est un pas fixe (RK4) ou un temps continu (SSA); la stochasticité est celle du SSA. Pour un agent LLM : *Sensing* = observation sérialisée, *Adaptation* = appel de politique, *Learning* = mémoire du contexte, *Stochasticity* = échantillonnage et non-déterminisme de l'API (section M9). ODD n'impose pas de graine, d'horodatage ni d'identifiant de modèle : ils vont au **manifeste de run** (cadre §7). Pour les modules de décision, ODD+D (Müller et al. 2013) est le complément connu [M]; He 2026 et Vanhée et al. 2025 explorent des descriptions lisibles par machine [R].

### M2 — Modélisation orientée patrons (Grimm et al. 2005, Grimm et Railsback 2012, Planque et al. 2022 [non vérifiée], Grimm et al. 2014)

**Définition [R, résumé de Grimm et Railsback 2012].** Stratégie de conception, de sélection et de calibration multicritères : on identifie des patrons observés à plusieurs échelles et niveaux; ils servent à (i) déterminer échelles, entités, variables et processus, (ii) tester et sélectionner les sous-modèles, (iii) trouver des valeurs de paramètres.

**Énoncé.** L'article de 2005 propose POM comme cadre général de conception, test et analyse des modèles ascendants; le résumé ne donne ni équation ni seuil [R].

**Valeurs recommandées [I].** Au moins trois patrons par modèle, à deux niveaux au moins (individu et colonie); chaque patron = grandeur + sens ou ordre de grandeur + source; un jeu de paramètres qui ne reproduit pas l'ensemble est rejeté (filtre multi-patrons). Les patrons alimentent l'élément 1 d'ODD 2020.

**Application.** P5 : patrons (a) seuil de bifurcation σ\* de l'inhibition croisée; (b) vitesse et justesse en fonction du quorum; (c) fréquence des scissions. Pour documenter l'évaluation : protocole OPE (Planque et al. 2022 [non vérifiée] : objectifs, patrons, évaluation, 25 questions [R]) et document TRACE (développement, tests, analyse; notion d'« evaludation ») [R].

### M3 — Docking et réplication (Axtell et al. 1996, Wilensky et Rand 2007, Edmonds et Hales 2003, Hauke et al. 2020, Galán et al. 2009)

**Définition [T].** Le docking (ou alignement) sert à établir si deux modèles produisent les mêmes résultats; fondement des expériences cruciales et des tests de subsomption (Axtell et al. 1996, résumé).

**Énoncé.**
- Trois niveaux : identité numérique (inatteignable avec des éléments stochastiques); équivalence distributionnelle (distributions statistiquement indistinguables); équivalence relationnelle (même relation interne entre résultats, par exemple décroissance monotone avec la taille); la relationnelle est plus faible, la distributionnelle peut exiger un alignement laborieux des détails paramétriques [T, Axtell et al. 1996 §6, manuscrit du 1995-09-01; version publiée non lue]. Chez Wilensky et Rand 2007 : identité numérique, équivalence distributionnelle, **alignement relationnel** (§2.15), trois catégories créditées à Axtell et al. 1996 [T\*].
- Axtell et al. 1996 : Mann-Whitney bilatéral à 5 % (n = 10; U critique 23); Kolmogorov-Smirnov bilatéral à 5 % (n = 40; seuil 0,304); 11 comparaisons sur 12 non rejetées; pour le réseau 20×20, K-S = 0,5 > 0,304, moyennes 16,25 contre 9,23 [T]. Leçons : description précise du modèle; publier l'information distributionnelle des résultats [T].
- Wilensky et Rand 2007 : dix répétitions par implémentation, test t à 95 %; trois différences d'implémentation découvertes (méthode d'interaction, ordre des événements, algorithme d'ordonnancement : liste mélangée ou non); fixer le standard de réplication d'avance (§6.1) [T\*].
- Edmonds et Hales 2003 : double réplication d'un modèle publié; elle révèle des faiblesses; conseils : vérifier l'alignement dès les premiers cycles, tester par K-S les moyennes à long terme, désactiver progressivement les fonctions, réimplémenter dans un autre langage par un autre programmeur [T\*].
- Hauke et al. 2020 : l'article d'origine (Miller et al. 2012) moyennait 100 répétitions; la réplication, avec ODD et plan d'expériences, juge « 100 ou moins » à interpréter avec prudence (CV 0,14 à 100 répétitions contre 0,20 à 5 000), 5 000 répétitions suffisantes, et l'équivalence distributionnelle suggérée, non démontrée [T\*].
- Galán et al. 2009 : un artefact est un phénomène significatif dû à des hypothèses accessoires jugées non significatives; recommandations : réimplémenter dans d'autres paradigmes, relancer sur d'autres machines, systèmes et générateurs [T\*].

**Valeurs recommandées [I].** Le niveau visé s'écrit par cible, avant le code. Pour l'équivalence distributionnelle : TOST (M6) avec une marge δ justifiée, jamais « K-S non significatif » seul. Deux implémentations indépendantes (Python dans `verifications-numeriques/`, TypeScript pour le moteur) pour les modèles de la porte 0.

**Gabarit de critère d'acceptation (fiche de reproduction, cadre §6.2–6.3) [I].** Cible T*n*.*m* | source + emplacement (figure, tableau, équation) | niveau (identité / distributionnel / relationnel) | grandeur et unité | valeur publiée et dispersion (avec le n publié) | marge δ et justification | n répétitions (ES de Monte Carlo cible) | test et seuil | règle de décision | porte go/no-go | déviations (registre, M8).

### M4 — Analyse de sensibilité (Broeke et al. 2016, Saltelli 2002, Saltelli et al. 2010, Saltelli et al. 2019, Thiele et al. 2014, Lee et al. 2015)

**Définition.** Étude de la façon dont la variabilité de la sortie se répartit entre les entrées.

**Énoncé.**
- Broeke et al. 2016 : trois méthodes comparées, **OFAT étendue**, **décomposition de variance par régression** (un R² supérieur à 90 % est donné en exemple de seuil pour essayer d'autres fonctions de régression, §3.8, non comme exigence), **Sobol'** (V(y) = ΣV_i + ΣV_ij + … + V_{1…m}; S_i = V_i/V(y)) [T\*]. Cas d'étude : modèle de récolte à 15 paramètres. Coûts : OFAT 1 650 (10 répétitions × 11 valeurs × 15 paramètres); régression 5 000 (1 000 × 5); Sobol' 17 000 exécutions au total (§5.5), k = 15 (tableau 1); la lecture 17 000 = N(k+2) avec N = 1 000 est une déduction [I] (schéma de Saltelli 2002 [M]); IC par 10 000 rééchantillons bootstrap [T\*]. Résultats : R² = 43,9 % (retenu comme raisonnablement précis, §5.11); somme des indices de premier ordre 0,46 (donc plus de 54 % de variance par interactions); estimations négatives de Sobol' par imprécision [T\*]. Sortie moyennée sur t = 500–1 000 pour limiter la dépendance de phase [T\*]. Recommandation (§6.5) : OFAT étendue comme point de départ [T\*].
- Saltelli et al. 2019 : la plupart des analyses publiées ne parcourent que des corridors unidimensionnels; la mauvaise pratique est au moins aussi grave que celle du test p; des méthodes matures existent depuis environ deux décennies [R].
- Thiele et al. : LHS, Morris, Sobol', FAST, ABC; paquets R (`sensitivity`, `lhs`, `abc`, `RNetLogo`…); choisir le nombre de répétitions par stabilisation du coefficient de variation (dix répétitions dans le tutoriel) [T\*].
- Lee et al. : stabilisation du CV (c_V = σ/μ), variance fenêtrée, approche par puissance; les tailles d'échantillon de 100 ou moins sont courantes dans la littérature ABM [T\*; PDF relu à la vérification [T] : la formule imprimée est n_min ≥ 2 (s²/δ)(t + t)², sans carré sur δ (erreur probable de l'article); ne pas la recopier, utiliser la forme standard n = 2σ²(z + z)²/δ² [I]].

**Valeurs recommandées [I].** (1) OFAT étendue (au moins 10 niveaux par paramètre, au moins 10 répétitions) pour toute figure de mécanisme; (2) global quand k ≤ ~15 : Sobol' avec N ≥ 1 000 et IC bootstrap (k = 8 donne 10 000 runs); (3) k plus grand : criblage de Morris (Morris 1991 [M]; coût r(k+1) exécutions pour r trajectoires [I], non relu dans la source) puis Sobol' sur les paramètres retenus; (4) sortie = moyenne sur une fenêtre après rodage; (5) pour une sortie bimodale (décision A ou B, extinction), les indices de variance se lisent mal : rapporter la probabilité de chaque mode; (6) l'ordre de mise à jour est un facteur catégoriel de toute analyse.

**Application.** P5 : (γ, α, ρ, σ, N) pour M1; P7 : format du message, persistance, effectif, paraphrase d'invite.

### M5 — Plan d'étude de simulation : ADEMP, ES de Monte Carlo, puissance (Morris et al. 2019, Siepe et al. 2024, Pawel et al. 2024)

**Définition [T\*].** ADEMP : *Aims* (buts), *Data-generating mechanisms* (comment les données sont générées, quels facteurs varient, plan factoriel ou partiel), *Estimands/other targets* (grandeurs visées), *Methods* (méthodes évaluées), *Performance measures* (mesures, avec ES de Monte Carlo).

**Énoncé (Morris et al. 2019, Tableau 6 [T\*], numérotation de la version publiée non vérifiée [à confirmer]; en préimpression v1 : formules au §5.2, calcul de n_sim au §5.4 [T]; formes marquées « recalculé » vérifiées par simulation [I]).** Pour n = n_sim répétitions, θ̂_i l'estimation i, θ la valeur vraie :

| Mesure | Estimation | ES de Monte Carlo |
|---|---|---|
| Biais | (1/n) Σ θ̂_i − θ | √[ Σ(θ̂_i − θ̄)² / (n(n−1)) ] |
| ES empirique | √[ Σ(θ̂_i − θ̄)² / (n−1) ] | **EmpSE / √(2(n−1))** (recalculé : l'extraction donnait EmpSE²) |
| EQM | (1/n) Σ(θ̂_i − θ)² | √[ Σ((θ̂_i − θ)² − EQM)² / (n(n−1)) ] (reconstruit, recalculé) |
| Couverture, puissance, taux de rejet | (1/n) Σ 1(événement) | √[ p̂(1 − p̂) / n ] |

- Nombre de répétitions : **n_sim = p(1−p) / ES\*²**; exemple publié : couverture de 95 %, ES = 0,5 % donne 1 900; pire cas p = 0,5 donne 10 000 [T\*; recalculé, X12].
- Bonnes pratiques [T\*] : fixer la graine une seule fois; stocker l'état du PRNG à chaque répétition; flux séparés en parallèle; consigner les échecs comme valeurs manquantes avec leur cause; rapporter l'ES de Monte Carlo; ne pas donner plus de décimales que l'ES le justifie; publier le code.
- État de la pratique : revue de 100 études de simulation de *Statistics in Medicine* (vol. 34) : 93 sans ES de Monte Carlo [T\*]; en psychologie (321 articles examinés, 100 avec simulation) : 8 % justifient n_sim, 3 % le calculent, 77 % sans incertitude de Monte Carlo, 64 % sans code [T\*, Siepe et al. 2024].
- Pawel et al. 2024 : des pratiques de recherche douteuses permettent de faire paraître supérieure n'importe quelle méthode dans une étude comparative; recommandations : protocoles préenregistrés, études neutres, partage du code et des données [R].
- Puissance par simulation : simuler le mécanisme générateur **et** l'analyse prévue, compter les rejets; l'ES de Monte Carlo de la puissance est √(P(1−P)/n) [I d'après le tableau]. Pour les modèles mixtes : `simr` [R]. Pour comparer plusieurs algorithmes sur plusieurs instances avec contrôle de Holm : Campelo et Wanner 2019 [R].

**Valeurs recommandées [I].** ES de Monte Carlo d'une proportion : confirmatoire ≤ 0,005 (10 000 au pire cas, 3 600 si p = 0,9); exploratoire ≤ 0,01 (2 500; 900 si p = 0,9). Pour une moyenne : n = S²/ES\*² avec S d'un pilote. La règle « n ≥ 1 000 » de l'audit méthodologie est un plancher, pas une garantie : Hauke et al. 2020 jugent 5 000 répétitions suffisantes pour un modèle publié avec 100.

**Application.** Chaque fiche de projet contient un tableau ADEMP; P7 se dimensionne sur un pilote (M9).

### M6 — Équivalence : TOST (Schuirmann 1987, Lakens 2017, Lakens et al. 2018)

**Définition.** Deux tests unilatéraux : on rejette à la fois « effet ≤ −Δ_L » et « effet ≥ +Δ_U » au niveau α; la conclusion d'équivalence équivaut à un IC à 1−2α (90 % pour α = 0,05) entièrement inclus dans les bornes [R, T\*].

**Énoncé.**
- H₀₁ : Δ ≤ −Δ_L ; H₀₂ : Δ ≥ +Δ_U ; équivalence si t_U ≤ −t(df, α) et t_L ≥ t(df, α) [T\*, Lakens 2017].
- Statistiques (Welch, recommandé) : t_L = (M₁ − M₂ − Δ_L) / √(SD₁²/n₁ + SD₂²/n₂) ; t_U = (M₁ − M₂ − Δ_U) / √(SD₁²/n₁ + SD₂²/n₂) ; degrés de liberté de Satterthwaite [T\*].
- Schuirmann 1987 : à α = 0,05, TOST mène à la même conclusion que l'IC « le plus court » à 1−2α de Westlake et surpasse l'« approche par la puissance » (tester l'absence de différence à 0,05 et exiger une puissance de 0,80) [R].
- Puissance (bornes symétriques, effet vrai nul) : n par groupe = 2(z_α + z_{β/2})² / Δ², Δ borne en d de Cohen; Tableau 1, puissance 80 %, α = 0,05 : d = 0,5 donne 70; 0,3 donne 191; 0,2 donne 429 [T\*]. Recalcul par approximation normale : 68,5; 190,3; 428,2 [I, X13].
- Quatre issues (TOSTER) : NHST et TOST significatifs; NHST non significatif et TOST significatif; NHST significatif et TOST non; aucun significatif (indéterminé) [T\*, vignette CRAN]. Lakens et al. 2018 (Lakens, Scheel et Isager) traitent le choix de la plus petite taille d'effet d'intérêt (SESOI) [R; texte non lu].
- Un résultat non significatif ne permet pas de conclure à l'absence d'effet; indiquer les bornes dans le résumé d'un article [T\*].

**Proportions (programme) [I].** n par bras = 2p(1−p)(z₀,₉₅ + z₀,₉₀)² / δ², (z₀,₉₅ + z₀,₉₀)² = 8,564 :

| p | δ = 0,05 | δ = 0,10 | δ = 0,15 |
|---|---|---|---|
| 0,5 | 1 713 | 429 | 191 |
| 0,7 | 1 439 | 360 | 160 |
| 0,9 | 617 | 155 | 69 |

**Valeurs recommandées [I].** α = 0,05 par test unilatéral; marge fixée et justifiée **avant** les runs; échelle pertinente : relative pour les durées (±10 à ±15 %), en points pour les proportions (±4 à ±10 selon n), log₁₀ pour les erreurs d'optimisation (±0,5 décade, audit méthodologie §7.3). Rapporter l'IC à 90 % et les bornes.

**Application.** Réplication (M3) et docking; hypothèse d'équivalence H7b du plan P7; critère G1 du dossier P5 (section 4.3).

### M7 — Modèles mixtes, interactions, corrections multiples

**Énoncé et valeurs.**
- Unité d'analyse = le **run**; les agents d'un run sont groupés. Effets aléatoires croisés pour les stimuli (ici les paraphrases d'invite) : Judd et al. 2012 [R]. Structure aléatoire maximale justifiée par le plan : Barr et al. 2013 [R]. Implémentation : `lme4` (Bates et al. 2015 [R]); puissance par simulation : `simr` [R].
- Interaction : l'ES d'un contraste d'interaction est le double de celui d'un effet principal dans un plan 2×2 équilibré; si l'interaction vaut la moitié de l'effet principal, 16 fois plus de runs [S, Gelman 2018; calcul refait [I], X15]. Si l'interaction égale l'effet principal : 4 fois [I] (calcul; non tiré de la source).
- Holm 1979 : procédure séquentielle de rejet contrôlant le risque d'erreur de première espèce pour toute combinaison d'hypothèses vraies [R]. Benjamini et Hochberg 1995 : taux de fausses découvertes [M].

**Valeurs recommandées [I].** La famille d'hypothèses = celles d'un même préenregistrement; confirmatoire : Holm à α = 0,05; exploratoire : Benjamini-Hochberg (q = 0,10) ou rien, mais étiqueté; rapporter p brut et ajusté. La question centrale de P7 est une interaction (architecture × modèle) : budgéter 4 à 16 fois les runs d'un effet principal.

### M8 — Préenregistrement, Registered Reports, registre des déviations

**Énoncé.**
- Préenregistrement : version horodatée, en lecture seule, déposée avant la collecte ou l'analyse; la soumission d'un enregistrement OSF ne peut plus être modifiée; embargo jusqu'à quatre ans; retrait possible (métadonnées conservées); mise à jour = processus transparent distinct; modèles disponibles : *OSF Preregistration*, *Open-Ended*, *Registered Report Protocol*, AsPredicted [T\*].
- Registered Report : le protocole (introduction, méthodes, pilotes) est évalué à l'étape 1 et reçoit une acceptation de principe; l'étape 2 ajoute résultats et discussion, les analyses non prévues allant dans une section « exploratoire »; plus de 300 revues utilisent le format [T\*]. Bilan : Chambers et Tzavella 2022 [R]; Nosek et al. 2018 : distinguer postdiction et prédiction [R].
- Études de simulation : ADEMP-PreReg (gabarit pas à pas : buts, mécanisme générateur, estimands, méthodes, mesures) [T\*]; Pawel et al. recommandent des protocoles de simulation préenregistrés [R].
- Déviations : Lakens 2024 distingue cinq catégories [R, article] (événements imprévus, erreurs de préenregistrement, information manquante, hypothèses non testées violées, hypothèses auxiliaires falsifiées); on indique quand, où, pourquoi, puis l'effet sur la sévérité du test et la validité de l'inférence; une déviation peut accroître la sévérité [T\*, chapitre 13 du livre de Lakens; non recoupé à la vérification, à confirmer]. Willroth et Atherton 2024 proposent un cadre de rapport standardisé [R].
- Revues offrant le format : *Royal Society Open Science* (depuis 2015 [à confirmer]) et *PLOS ONE* [S]; **non trouvé** pour *J R Soc Interface*, *PLOS Comput Biol* (absent de la liste des types d'articles [T\*]), *JASSS*, *Swarm Intelligence* (section 8).

**Valeurs recommandées [I].** Un enregistrement OSF par projet, avant la première exécution confirmatoire : hypothèses H*n*.*m*, SHA du dépôt et des fichiers de scénario, politique de graines, δ, n, script d'analyse, règles d'exclusion (refus de classifieur LLM = attrition, règle préenregistrée). Registre des déviations (fichier versionné) : ID, date, section du plan, plan d'origine, déviation, raison, catégorie de Lakens 2024, effet sur la sévérité, effet sur la validité, décision. Pour P7 : Registered Report (étape 1 = protocole, variance et coût du pilote).

### M9 — Évaluation statistique des LLM (Miller 2024 et compléments)

**Énoncé (Miller 2024, équations numérotées comme dans l'article [T]).** Score s_i = x_i + ε_i; μ = E[s]; σ_i² = Var(ε_i) :

1. SE_TLC = √( Var(s)/n ) = √( [1/(n−1) Σ(s_i − s̄)²] / n ) ; 2. Bernoulli : SE = √( s̄(1−s̄)/n ) ; 3. IC 95 % = s̄ ± 1,96·SE.
4. ES groupée : SE_groupé = [ SE_TLC² + (1/n²) Σ_c Σ_i Σ_{j≠i} (s_{i,c} − s̄)(s_{j,c} − s̄) ]^{1/2} (rapport ES groupée/ES naïve de 1,10 à 3,05 selon l'évaluation, tableau 4, avec des modèles d'Anthropic; l'association ligne-valeur est déduite de l'ordre du tableau extrait [I]).
- Décomposition : Var(μ̂) = (Var(x) + E[σ²])/n. Rééchantillonnage K : Var(s_i) = σ_i²/K ; choisir K tel que E[σ²]/K ≈ Var(x). Exemple (x ~ U[0,1], score binaire) : Var(μ̂|K) = Var(μ̂|K=1)·(1+2/K)/3 (K = 2 : −1/3; K = 4 : −1/2; K = 6 : −5/9; limite −2/3). Ne pas toucher à la température pour réduire la variance (§3.3).
5. Différence non appariée (SE_{A−B} = √(SE_A² + SE_B²), formule non numérotée) : IC 95 % = μ̂_{A−B} ± 1,96·SE_{A−B} ; 6. z = μ̂_{A−B}/SE_{A−B}.
7. Appariée : SE_{A−B,apparié} = √( Var(s_{A−B})/n ) ; 8. appariée et groupée : SE = (1/n) · [ Σ_c Σ_i Σ_j (s_{A−B,i,c} − s̄)(s_{A−B,j,c} − s̄) ]^{1/2} (le facteur 1/n est hors de la racine, comme imprimé dans l'article [T]).
9. Taille d'échantillon : **n = (z_{α/2} + z_β)² (ω² + σ_A²/K_A + σ_B²/K_B) / Δ²**, ω² = Var(x_A) + Var(x_B) − 2Cov(x_A, x_B) ; 10. effet minimal détectable : Δ = (z_{α/2} + z_β) √( (ω² + σ_A²/K_A + σ_B²/K_B) / n ).
- Exemples publiés : σ_A² = σ_B² = 0, ω² = 1/9, Δ = 0,03, α = 0,05, 80 % : n ≈ 969; σ_A² = σ_B² = 1/6, ω² = 1/9, n = 198 : MDE 13,2 % (K = 1) puis 7,5 % (K = 10) [T]. Recalcul : 969,0; 13,27 % et 7,57 %, donc valeurs publiées **tronquées** [I, X8–X9]. Exemple §4.2 : pour Var(s_A) = Var(s_B) = 1/12 et corrélation 0,5, le texte annonce 1/6 → 1/9; le calcul avec ses entrées donne 1/6 → 1/12; 1/9 correspond à une corrélation de 1/3 [I, X11]. Arxiv ne liste que la v1 : vérifier une éventuelle correction.

**Compléments.** Bowyer et al. 2025 : sous quelques centaines d'items, les intervalles du TLC sont trop étroits; alternatives fréquentistes ou bayésiennes et bibliothèque Python [R]. Madaan et al. 2024 : métriques de variance de benchmark, dont la variance de graine [R]. Card et al. 2020 : ensembles de test de 2 000 phrases ≈ 75 % de puissance pour 1 point de BLEU [R]. Atil et al. 2024 : jusqu'à 15 % de variation d'exactitude entre exécutions naturelles (cinq LLM, huit tâches, dix exécutions), aucun modèle répétable [R]. Chen et al. 2023 : identification de nombres premiers de GPT-4 passée de 84 % à 51 % entre mars et juin 2023 [R]. Kapoor et al. 2024 : évaluer le coût avec l'exactitude; jeux de test réservés [R].

**Plateforme (Anthropic 2026, consultée le 2026-10-01 [T\*]).** Tout identifiant est un instantané figé, y compris les identifiants sans date (génération 4.6 et suivantes). `temperature` : les modèles publiés après Opus 4.6 ne permettent pas de la régler (1,0 accepté, toute autre valeur → 400); même à 0,0 les résultats ne sont pas entièrement déterministes. Aucun paramètre `seed` dans la liste visible des paramètres de requête (extrait tronqué à `top_k`). Haiku 4.5 (`claude-haiku-4-5-20251001`) : actif, retrait « pas avant le 2026-10-15 »; Sonnet 4.5 : **déprécié le 2026-09-30, retrait le 2026-11-30**; Sonnet 5.5, Opus 5.5, Fable 5.1 : pas avant les 2027-09-28, 2027-09-22, 2027-09-01; préavis d'au moins 60 jours; la page reconnaît que les chercheurs perdent l'accès aux modèles pour les études en cours et comparatives.

**Valeurs recommandées [I].**
- Unité statistique = le run (ou le couple scénario-instance); groupes = scénario et paraphrase; utiliser les éq. 4 et 8; TLC seulement au-delà de quelques centaines d'unités, sinon bootstrap ou bayésien (Bowyer et al. 2025).
- Pilote d'au moins 10 répétitions par cellule pour estimer E[σ²], Var(x), ω², puis K par la règle E[σ²]/K ≈ Var(x) et n par l'éq. 9; plafond de coût par bras.
- Fenêtre d'exécution courte, ordre des cellules randomisé dans le temps, tâches sentinelles répétées avant, pendant et après pour détecter une dérive, identifiant `response.model` consigné; journal JSONL complet et rejeu par cassette (audit simulation-technique M17); `temperature` laissée à la valeur par défaut; refus de classifieur = attrition préenregistrée.
- Rapporter le coût avec la performance, en front de Pareto (Kapoor et al. 2024).

### M10 — Algorithmes de simulation

**M10a. SSA de Gillespie (Gillespie 2007 [T]; Gillespie 1976 et Gillespie 1977 non lus).**
- État x, M réactions de propensités a_j(x) (a_j dt = probabilité d'une réaction R_j dans [t, t+dt]), a₀(x) = Σ a_j(x). Densité conjointe du temps τ avant la prochaine réaction et de son indice j : **p(τ, j | x, t) = a_j(x) exp(−a₀(x) τ)** (éq. 8–9).
- **Méthode directe** (éq. 10a,b) : r₁, r₂ uniformes sur (0,1); **τ = (1/a₀(x)) ln(1/r₁)** ; **j = plus petit entier tel que Σ_{j'=1}^{j} a_{j'}(x) > r₂ a₀(x)**. Algorithme : 0 initialiser t, x; 1 évaluer a_j et a₀; 2 tirer τ et j; 3 poser t ← t+τ, x ← x+ν_j; 4 enregistrer, recommencer.
- **Méthode de la première réaction** (éq. 15a,b) : τ_j = (1/a_j) ln(1/r_j) pour chaque j; τ = min, j = argmin; exacte, mais moins efficace quand M est grand [T]. La revue de 2007 cite Gillespie 1976 (J. Comput. Phys. 22:403–434, réf. 8) et Gillespie 1977 (réf. 9) comme présentation originale; la méthode de la première réaction y est notée et prouvée exacte en réf. 8 [T, Gillespie 2007].
- Application à M1c (Seeley et al. 2012, dossier P5), N individus; propensités [I] : U→A : γ_A U ; A→U : α_A A ; U+A→A+A : ρ_A A U/N ; A+B→U+B (A inhibé par B) : σ_B A B/N, et symétriques.

**M10b. RK4.** y_{n+1} = y_n + (h/6)(k₁ + 2k₂ + 2k₃ + k₄) ; k₁ = f(t_n, y_n) ; k₂ = f(t_n + h/2, y_n + h k₁/2) ; k₃ = f(t_n + h/2, y_n + h k₂/2) ; k₄ = f(t_n + h, y_n + h k₃) ; erreur locale O(h⁵), globale O(h⁴) ; les méthodes explicites conviennent mal aux problèmes raides (région de stabilité bornée) [S, Wikipedia 2026]. Valeurs [I] : pas fixe découplé du rendu; choisir h par un test d'ordre (section 4.1, X4); pas de seuil de quorum dans le second membre (discontinuité) : traiter le franchissement comme un événement.

**M10c. Générateurs pseudo-aléatoires.**
- **PCG** (O'Neill 2014 [T]) : générateur linéaire congruentiel dont la sortie passe par une fonction de permutation; état de b bits, sorties de b/2 bits; périodes 2⁶⁴ et 2¹²⁸ pour les variantes de 64 et 128 bits; optionnellement b−1 bits de sélection de flux (2^{b−1} flux «complets et distincts»); passe TestU01 (BigCrush); rapport technique, pas un article évalué par les pairs [T, site]. Variante XSH-RR 64/32 : multiplicateur 6364136223846793005; XSHIFT = 18, SPARE = 27, ROTATE = 59 [T\*, rand_pcg].
- **xoshiro / xoroshiro** (Blackman et Vigna 2021 [T]) : générateurs linéaires F₂ avec brouilleurs; **`xoshiro128++` et `xoshiro128**` sont le premier choix 32 bits**; états non entièrement nuls; fonctions de saut (`xoshiro128**` : 2⁶⁴ et 2⁹⁶ pas) pour flux disjoints [T\*, site de Vigna; l'article seul dit que des fonctions de saut existent]; si l'on ne dispose que d'une graine de 64 bits, remplir l'état avec **SplitMix** car l'initialisation doit venir d'un générateur de nature radicalement différente; la graine doit être conservée pour la répétabilité [T].
- **Critique** (Vigna 2026, page d'opinion) : il conclut qu'aucune raison technique ne justifie PCG; flux corrélés (Durst 1989), état à 64 bits retrouvé à partir de trois sorties, plus lent que xoroshiro128++ [S]. Le rapport d'O'Neill 2014 affirme des flux complets et distincts et une meilleure résistance à la prédiction (résumé) [T]; sa réponse à Vigna n'est pas lue.
- **JavaScript** : `Math.random` ne se sème pas (MDN 2026) [T\*]; V8 utilise xorshift128+ depuis décembre 2015 (Chrome 49) [T\*]; plusieurs fonctions `Math` dépendent de l'implémentation (audit simulation-technique M1, MDN 2026 [S]).
- Valeurs recommandées [I] : `xoshiro128**` (opérations 32 bits natives, `Math.imul`), graine 64 bits étendue par SplitMix64; un flux par sous-système (environnement, chaque espèce, politique LLM); sous-flux par `jump()` ou par SplitMix64 de (graine, identifiant); graine et version du générateur au manifeste; vecteurs de test X1–X3 exécutés sous Node et dans trois navigateurs; `Math.random` et `Date.now` interdits dans la logique de simulation. PCG32 acceptable si son vecteur passe, mais on évite d'en tirer des flux par agent.

**M10d. Ordre de mise à jour.** Les résultats d'un modèle spatial diffèrent beaucoup entre temps discret et temps continu (Huberman et Glance 1993 [R]); la mise à jour synchrone et l'asynchrone donnent des résultats différents, surtout aux fortes densités et avec des interactions plus complexes (Caron-Lormier et al. 2008 [R]); effet « très grand » possible (Grimm et al. 2010 [T]); l'ordre « mélangé ou non » a déterminé le résultat d'une réplication (Wilensky et Rand 2007 [T\*]). Valeurs [I] : facteur « ordre » dans le scénario (synchrone à double tampon; asynchrone séquentiel avec permutation tirée du PRNG à chaque pas), testé une fois par modèle à agents, avec critère |écart| < 3 ES de Monte Carlo pour conclure « sans effet ». Résultat sur M6 : section 4.3, X17.

### M11 — Critique des métaheuristiques à métaphore (Sörensen 2015 et suites)

**Énoncé.** Sörensen 2015 : un « tsunami » de métaheuristiques « nouvelles » fondées sur une métaphore (comportement d'insectes, écoulement d'eau, musiciens); cette lignée éloigne le domaine de la rigueur scientifique [R]. Camacho-Villalón et al. 2023 : analyse par composants de six algorithmes (loup gris, flamme-papillon, baleine, luciole, chauve-souris, fourmi-lion); leurs idées existaient déjà; seule la terminologie est nouvelle [R]. Aranha et al. 2022 (huit auteurs, dont Dorigo, Sörensen, Stützle) lancent un appel à l'action dans *Swarm Intelligence* 16(1) [M]. Rahman et al. 2025 : des « essaims LLM » de Boids et de colonies de fourmis (ACO) reproduisent les comportements; le calcul est environ 300 fois plus long pour Boids (LLM contre version classique), sans chiffre analogue pour l'ACO [R].

**Valeurs recommandées [I].** (1) Tout algorithme se décrit par composants et pseudo-code (ODD, M1), la métaphore vient après; (2) toute comparaison de P2 : même classe de problèmes, même budget d'évaluations, référence non inspirée du vivant (recherche aléatoire, 2-opt, CMA-ES); (3) statistique : tests non paramétriques (Derrac et al. 2011 [M]), puissance sur instances × algorithmes avec Holm (Campelo et Wanner 2019 [R]), huit chantiers de bonne pratique de benchmarking (Bartz-Beielstein et al. 2020 [R]); (4) soumission à *Swarm Intelligence* : décrire sans métaphore.

### M12 — Science ouverte : logiciel, données, contenus

**FAIR4RS 2022 (v1.0, 2022-05-24, CC BY 4.0 : reproduction permise avec attribution) [T].** Logiciel de recherche : fichiers de code source, algorithmes, scripts, flux de travail et exécutables créés pendant le processus de recherche ou dans un but de recherche. Les principes s'appliquent quelle que soit la licence.

| ID | Principe |
|---|---|
| F1 | Software is assigned a globally unique and persistent identifier. |
| F1.1 | Components of the software representing levels of granularity are assigned distinct identifiers. |
| F1.2 | Different versions of the software are assigned distinct identifiers. |
| F2 | Software is described with rich metadata. |
| F3 | Metadata clearly and explicitly include the identifier of the software they describe. |
| F4 | Metadata are FAIR, searchable and indexable. |
| A1 | Software is retrievable by its identifier using a standardized communications protocol. |
| A1.1 | The protocol is open, free, and universally implementable. |
| A1.2 | The protocol allows for an authentication and authorization procedure, where necessary. |
| A2 | Metadata are accessible, even when the software is no longer available. |
| I1 | Software reads, writes and exchanges data in a way that meets domain-relevant community standards. |
| I2 | Software includes qualified references to other objects. |
| R1 | Software is described with a plurality of accurate and relevant attributes. |
| R1.1 | Software is given a clear and accessible license. |
| R1.2 | Software is associated with detailed provenance. |
| R2 | Software includes qualified references to other software. |
| R3 | Software meets domain-relevant community standards. |

**CITATION.cff (CFF 2026) [T\*].** Version de schéma 1.2.0. Clés obligatoires : `cff-version`, `message`, `title`, `authors`. Clés utiles : `version`, `date-released`, `identifiers` (type `doi`), `license`, `repository-code`, `url`, `keywords`, `abstract`, `preferred-citation`, `references`. GitHub : le fichier à la racine de la branche par défaut produit un lien « citer ce dépôt » (APA et BibTeX); Zotero et Zenodo le lisent. **Zenodo n'en applique qu'un sous-ensemble et l'ignore entièrement si un `.zenodo.json` existe**; GitHub s'en sert quand même.

**GitHub → Zenodo (GitHub et Zenodo 2026) [T\*, R].** Le dépôt doit être **public** et porter une licence, et l'approbation d'un propriétaire d'organisation peut être requise (exigences de la doc GitHub [T\*]; les pages Zenodo lues ne les énoncent pas); autoriser l'application Zenodo; activer le dépôt dans Zenodo; chaque nouvelle *release* GitHub est archivée et reçoit un nouveau DOI. Zenodo distingue un DOI de version et un DOI « de concept » pour toutes les versions (blog 2017 [R]) : citer le DOI de version pour une version précise. Des dépôts liés à Zenodo sans webhook GitHub existent (issue zenodo #2281) [S] : après l'activation, vérifier le webhook dans les paramètres du dépôt, puis seulement publier la première *release*; la documentation Zenodo lue ne décrit pas le webhook ni le traitement des *releases* en brouillon.

**Software Heritage (SWH 2026) [T\*].** Archive du code source (non des binaires), tout ce qu'il peut obtenir; collecte régulière des grandes forges; « Save Code Now » pour forcer un archivage; **SWHID** : identifiant dérivé du contenu, norme **ISO/IEC 18670 depuis le 2025-04-23**; pour une citation académique, SWH recommande le SWHID du **répertoire** de la version citée; `codemeta.json` (JSON-LD) est pris en charge, la FAQ ne mentionne pas CITATION.cff.

**Licences (choosealicense et CC 2026) [T\*].** MIT : permissive, conditions = conserver les avis de droit d'auteur et de licence; Apache-2.0 : idem, plus concession expresse de brevets et obligation d'indiquer les modifications; fichier NOTICE reproduit s'il existe. CC BY 4.0 : partage et adaptation, même commerciaux, avec crédit, lien vers la licence et mention des modifications; **CC recommande de ne pas utiliser ses licences pour du logiciel** (CC0 est acceptable), mais ses licences 4.0 couvrent les droits sui generis sur les bases de données. ODD 2020 offre un cadre de licence pour réutiliser un ODD (S5) [T\*].

**Valeurs recommandées [I].** Dépôt public dès le premier jour; code sous MIT (court) ou Apache-2.0 (brevets); textes, figures et données sous CC BY 4.0, ou CC0 pour des données sans exigence d'attribution; `CITATION.cff` 1.2.0 sans `.zenodo.json` (ou l'inverse, jamais les deux sans contrôle); Zenodo activé et vérifié **avant** la première *release*; DOI de version cité dans les notes, DOI de concept dans la bibliographie générale; SWHID du répertoire en pied de note; journaux LLM complets en archive de données à DOI (champs : identifiant de modèle, horodatage, paramètres, jetons); correspondance F1–R3 au dépôt (identifiants F1–F4, métadonnées CFF et CodeMeta, licence R1.1, provenance R1.2 par manifeste de run).

**Plan de gestion des données (PGD).** Politique des trois organismes (Tri-Agence 2025) : trois piliers (stratégies institutionnelles, plans de gestion des données, dépôt); le dépôt vise **données, métadonnées et code** qui appuient directement les conclusions; stratégies institutionnelles exigées au 2023-03-01; PGD exigés pour un ensemble initial de concours défini au printemps 2022 puis élargi; applicable selon le financement [T\*]. DMP Assistant : outil gratuit, bilingue, de l'Alliance de recherche numérique du Canada [S]. CoMSES 2026 : ODD, codemeta, DataCite [T\*]; Sauro et al. 2025 : lignes directrices « FAIR vers CURE » pour modèles computationnels [R].

### M13 — Revues et conférences cibles

| Lieu | Portée (source) | Politique code et données | Dates 2027 | Statut |
|---|---|---|---|---|
| *J R Soc Interface* | Recherche à l'interface des sciences physiques et de la vie : mathématiques, physique, ingénierie appliquées au biologique [S] | Politique : données, **code** et matériel publics **à la publication**; code et matériel à fournir **dès la soumission** [S] | — | [S] |
| *PLOS Comput Biol* | Biologie computationnelle; articles : éducation, perspectives, revues, « Ten Simple Rules »… [T\*] | Tout code lié aux résultats public **à la publication**; politique du 2021-03-30; dépôt à DOI recommandé (Zenodo, CodeOcean, Software Heritage); licence précisée, conforme à l'*Open Source Definition* encouragée [T\*] | — | [T\*] |
| *Swarm Intelligence* | Systèmes d'individus coordonnés par contrôle décentralisé; modélisation de colonies d'insectes; ACO, PSO, robotique en essaim; trimestriel, sans frais de page [S] | Non trouvée | — | [S] |
| ALIFE 2027 | Prague, **19–23 juillet 2027** (UCT Prague, ČVUT); ALIFE 2026 : Waterloo (Ontario), 17–21 août 2026 [T\*] | Non publiée | Échéances, formats, éditeur : **non publiés** | [T\*] |
| *JASSS* | Simulation sociale, sociétés artificielles [S] | ODD recommandé (rédiger l'ODD complet d'abord); code recommandé, sous licence; évaluation facultative par CoMSES [S] | — | [S] |
| AAMAS 2027 | Hanoï, **3–7 mai 2027**; piste principale : résumé 2026-10-01, article **2026-10-08**, réfutation 20–24 nov., notification 2026-12-21, version finale 2027-01-25; tous les délais à la fin du jour indiqué, Anywhere on Earth (UTC−12); inscription des auteurs sur OpenReview le 2026-09-17 [T\*] | La page ne décrit pas de liste de reproductibilité; l'évaluation mentionne la reproductibilité [T\*] | Blue Sky Ideas : 2026-11-12; Fast Track AAAI : 2026-12-11; tutoriels : 2026-12-10; propositions d'ateliers : 2026-10-29 [T\*] | [T\*] |
| *JAAMAS* | Inclut auto-organisation, fonctionnalité émergente, intelligence en essaim; partenariat IFAAMAS : un article accepté dans les 12 mois précédant la conférence AAMAS peut y être présenté [S] | Non trouvée | — | [S] |
| GECCO 2027 [non vérifiée] | Cracovie, 12–16 juillet 2027; thèmes dont intelligence en essaim, benchmarking, reproductibilité [S] | — | Résumé 2027-01-19, soumission 2027-01-26 [S] [à confirmer] (le site officiel affiche encore les dates de 2026) | [S] |
| ANTS | 2026 : Darmstadt, 8–10 juin (93 soumissions); ANTS 2028 annoncée à ANTS 2026; lieu et dates non trouvés [S] | — | — | [S] |

**Lecture pour le programme [I].** P7 (phase 3) ne peut viser AAMAS 2027 (résumé = aujourd'hui); P1 et P5 (biologie comparée avec code) vont naturellement à *J R Soc Interface* ou *PLOS Comput Biol* (la première demande le code dès la soumission); P3, P4, P6 à ALIFE 2027 dès que l'appel sort; l'apport méthodologique (moteur, fiche de reproduction) à *JASSS*; l'appel *Blue Sky Ideas* d'AAMAS (2026-11-12) conviendrait à la typologie du cadre §2.2 sans résultat de simulation.

---

## 4. Résultats cibles et critères d'acceptation

Dossier méthodologique : on donne des **énoncés exacts** (valeur publiée ou calculée, source, emplacement) et un critère d'acceptation reproductible (grandeur, valeur, tolérance, répétitions). Les valeurs « calculées [I] » viennent de `x_methodes_checks.py` (graine fixée; sections `prng`, `stats`, `rk4`, `ssa`, `order`, `tost`, `ntable`, `mcse`).

### 4.1 Générateurs, intégrateurs, SSA

| ID | Énoncé (source, emplacement) | Grandeur mesurée | Critère d'acceptation |
|---|---|---|---|
| X1 | `xoshiro128**`, état [1, 2, 3, 4] : 11520, 0, 5927040, 70819200, 2031721883, 1637235492, 1287239034, 3734860849, 3729100597, 4258142804 (test « reference » de rand_xoshiro [T\*]) | 10 premières sorties | **Égalité exacte** (identité numérique), sous Node et trois navigateurs; reproduit en Python [I] |
| X2 | PCG32 (Lcg64Xsh32::new(42, 54)) : 0xa15c02b7, 0x7b47f409, 0xba1d3330, 0x83d2f293, 0xbfa4784b, 0xcbed606e (vecteur recopié de la suite de tests officielle, selon le commentaire du test [T\*]) | 6 premières sorties | Égalité exacte; uniquement si PCG32 est retenu; reproduit en Python [I] |
| X3 | SplitMix64, graine 1477776061723855037 : 1985237415132408290, 2979275885539914483, 13511426838097143398, … (rand_xoshiro [T\*]) | 3 premières sorties (50 dans la source) | Égalité exacte; reproduit en Python [I] |
| X4 | RK4 d'ordre 4 (erreur globale O(h⁴)) [S, Wikipedia 2026] ; M1c, σ = 10, γ = 3, α = 1/3, ρ = 3, T = 4, y₀ = (0,01 ; 0,0101) | Rapport des erreurs max pour h → h/2 (référence : h = T/64 000) | Rapport ∈ [12 ; 20]. Mesuré : 19,3 ; 16,6 ; 16,2 (Euler : 1,8 ; 1,9 ; 2,0) [I] |
| X5 | Équilibre de M1c à σ = 10 : (0,8497 ; 0,0392) (dossier P5, A2) | Ψ_A, Ψ_B à t = 200, h = 0,01 | ±10⁻³. Mesuré par RK4 : (0,8497 ; 0,0392) [I] |
| X6 | SSA direct : pour U→A seul, E[A(t)] = N(1 − e^{−γt}) (réaction linéaire; calcul [I]) | Moyenne de A(t = 2), N = 200, γ = 0,5 | 2 000 runs; écart < 3 ES de Monte Carlo. Mesuré : 126,16 ± 0,15 contre 126,42 (1,7 ES) [I] |
| X7 | M1c à N fini par SSA (aucune valeur publiée; exploratoire) | P(\|A−B\|/N > 0,3 à t = 40), 200 runs | σ = 1 (< σ\* = 1,6875) : 0,445 ± 0,035 (N = 50), 0,105 ± 0,022 (N = 200); σ = 10 : 0,950 ± 0,015 (N = 50), 1,000 (N = 200). Critère de docking ODE ↔ SSA : à σ < σ\*, la probabilité **décroît** avec N; à σ > σ\*, elle tend vers 1; écarts entre implémentations < 3 ES [I] |

### 4.2 Formules statistiques publiées

| ID | Énoncé (source, emplacement) | Grandeur | Critère d'acceptation |
|---|---|---|---|
| X8 | Miller 2024, éq. 9, exemple §5 : ω² = 1/9, Δ = 0,03, α = 0,05, puissance 80 % : n ≈ 969 [T] | n | Entier exact 969 (calculé 969,0 [I]) |
| X9 | Miller 2024, éq. 10, §5 : n = 198, σ_A² = σ_B² = 1/6, ω² = 1/9 : MDE 13,2 % (K = 1) → 7,5 % (K = 10) [T] | MDE | ±0,1 point avec troncature; valeurs arrondies 13,3 % et 7,6 % (13,27 ; 7,57 [I]) |
| X10 | Miller 2024, §3.1 : Var(μ̂\|K) = Var(μ̂\|K=1)(1+2/K)/3 [T] | Facteur de variance | K = 2 : 2/3; K = 4 : 1/2; K = 6 : 4/9 (exact [I]) |
| X11 | Miller 2024, §4.2 : Var(s_A) = Var(s_B) = 1/12, corrélation 0,5 → « de 1/6 à 1/9 » [T] | Variance de la différence appariée | Calcul : 1/6 → **1/12** (réduction de 1/2); 1/9 pour une corrélation de 1/3 [I]. Écart à signaler à l'auteur ou à vérifier dans une version ultérieure |
| X12 | Morris et al. 2019, §5.4 de la préimpression v1 [T] (« §5.3 » de la version publiée non vérifié [à confirmer]) : couverture 95 %, ES = 0,5 % → 1 900; pire cas (50 %) → 10 000 [T\*] | n_sim | Exact (1 900; 10 000 [I]); ES d'une proportion à n = 400, p = 0,5 : 0,025 [I] |
| X13 | Lakens 2017, Tableau 1 : n par groupe pour une puissance de 80 %, α = 0,05 : d = 0,5 → 70; 0,3 → 191; 0,2 → 429 [T\*] | n | ±2 par rapport à la valeur exacte (t non centré, TOSTER); approximation normale : 68,5; 190,3; 428,2 [I] |
| X14 | Axtell et al. 1996 : K-S bilatéral à 5 %, n = 40 : seuil 0,304; Mann-Whitney bilatéral à 5 %, n = 10 : U critique 23 [T] | Seuils | K-S : 1,358·√((n+m)/(nm)) = 0,3037 [I]; U : valeur de table de Siegel citée, non recalculée |
| X15 | Gelman 2018 : ES d'une interaction = 2 × ES d'un effet principal; 16 × le n si l'interaction vaut la moitié [S] | Rapport des ES, des n | Plan 2×2 équilibré, variance égale : rapport 2 et 16 (calcul exact [I]) |
| X16 | Morris et al. 2019 : ES de Monte Carlo du biais, de l'ES empirique, de l'EQM, de la couverture (tableau 6 de la version publiée [à confirmer]; §5.2 de la préimpression v1 [T]) [T\*] | Rapport formule/écart-type observé | 3 000 réplications de n = 200 : rapports 0,990; 1,002; 0,988; 0,989 (tolérance ±6 %). Avec σ = 3 : écart-type observé de l'ES empirique 0,149; EmpSE/√(2(n−1)) = 0,150; EmpSE²/√(…) = 0,450 : **la forme avec EmpSE² est fausse** [I] |

### 4.3 Applications au programme (diagnostics)

| ID | Énoncé | Grandeur | Résultat et critère |
|---|---|---|---|
| X17 | Ordre de mise à jour sur M6 (Sumpter et Pratt 2009, dossier P5 M6; lecture « r par option »; n = 40, T = 10, a = 0,1, m = 0,9) | Fraction vers X; durée jusqu'à l'engagement de tous; 1 000 runs par condition | Asynchrone : k = 1 : 76,1 % et 276,7 ± 67,6 pas; k = 9 : 82,8 % et 323,2 ± 79,0. Synchrone : k = 1 : 76,0 % et 276,6 ± 71,4; k = 9 : 82,7 % et 325,3 ± 80,2 [I]. Écart synchrone/asynchrone < 3 ES : **ordre sans effet**. Publié : 75,5 % / 253,7 ± 64,0; 83,3 % / 307,8 ± 71,0 : l'écart de durée (+9,1 % et +5,0 %) subsiste : 7,8 et 4,6 ES (± du publié lu comme écart-type [I]; lecture de r et sens du « ± » non vérifiés [à confirmer]) |
| X18 | TOST sur la fraction vers X (k = 1; publié 75,5 %; 1 000 runs de part et d'autre) | IC à 90 % de la différence | Différence +0,77 point; IC90 [−2,38 ; +3,91]. Marge ±2 points : équivalence **non établie**; ±4 points : établie. n requis par bras (puissance 80 %, différence vraie nulle) : 7 920 (±2) et 1 980 (±4) [I] |
| X19 | TOST sur la durée (k = 1; publié 253,7 ± 64,0, ± lu comme écart-type [I] [à confirmer]) | IC à 90 % de la différence de moyennes | Différence +23,5; IC90 [+18,5 ; +28,5]. Marge ±10 % (25,4) : **non établie**; ±15 % (38,1) : établie [I]; conclusions conditionnelles à la lecture du « ± » [à confirmer] |
| X20 | Variance entre exécutions des LLM : jusqu'à 15 % d'exactitude entre exécutions naturelles (Atil et al. 2024 [R]) | Coefficient de variation inter-exécutions d'une configuration identique | Pilote d'au moins 10 répétitions par cellule; seuil de non-répétabilité à fixer avant P7 (aucune valeur publiée transposable); n par l'éq. 9 de Miller 2024 avec K tel que E[σ²]/K ≈ Var(x) |

### 4.4 Énoncés de plateforme et de politique (faits datés)

| ID | Énoncé | Source | Critère de contrôle |
|---|---|---|---|
| X21 | `Math.random` : la graine n'est pas choisissable; V8 : xorshift128+ depuis le 2015-12-17 | MDN 2026; blog V8 [T\*] | Aucun appel à `Math.random` dans la logique de simulation (grep en CI) |
| X22 | `temperature` : valeur ≠ 1,0 refusée (400) pour les modèles postérieurs à Opus 4.6; jamais entièrement déterministe; pas de `seed` visible | Anthropic 2026 (2026-10-01) [T\*] | Manifeste de run : `response.model`, effort, paramètres; aucun contrôle d'échantillonnage supposé |
| X23 | Haiku 4.5 : retrait pas avant 2026-10-15; Sonnet 4.5 : déprécié 2026-09-30, retrait 2026-11-30; préavis ≥ 60 jours | Anthropic 2026 [T\*] | Collecte Haiku 4.5 en premier si utilisé; aucune dépendance à Sonnet 4.5 |
| X24 | AAMAS 2027 : résumé 2026-10-01, article 2026-10-08, Blue Sky 2026-11-12 (fin du jour indiqué, UTC−12) | Site AAMAS 2027 [T\*] | Décision avant le 2026-10-08 (ou 2026-11-12 pour Blue Sky) |
| X25 | PLOS Comput Biol : code public à la publication (politique du 2021-03-30) | Page de politique [T\*] | Dépôt et DOI avant l'acceptation |

---

## 5. Visuels de vulgarisation

1. **« Même film, même graine / autre graine »** (déterminisme). Un bouton rejoue une trace à graine fixe (identique à l'image près) puis affiche 100 graines superposées. Appui : Morris et al. 2019 (graine fixée une fois; état stocké); manifeste de run (cadre §7). Niveau : Vérifier.
2. **Barre d'erreur de Monte Carlo qui rétrécit.** Un histogramme de la proportion estimée se resserre quand n_sim passe de 100 à 10 000; bande ±1 ES; marqueur du pire cas p = 0,5. Appui : Morris et al. 2019 (n = p(1−p)/ES²), X12, X16.
3. **L'échelle de l'équivalence.** Un IC à 90 % glisse devant une zone grisée [−δ, +δ] et prend quatre couleurs (équivalent, différent, les deux, indéterminé). Appui : Lakens 2017; vignette TOSTER; X18–X19 (même sortie, marge ±2 puis ±4 points).
4. **Synchrone contre asynchrone.** Même règle, bascule d'ordre; l'effet apparaît (Huberman et Glance 1993; Caron-Lormier et al. 2008) ou non (X17 : sur M6, aucun). Montre qu'un réglage « innocent » est une hypothèse à tester. Appui : Grimm et al. 2010.
5. **L'interblocage et la taille de l'essaim.** À σ < σ\*, N = 50 sort de l'égalité dans 44 % des runs à t = 40, N = 200 dans 10 % (X7); curseur N. Appui : SSA (Gillespie 2007), Seeley et al. 2012 (dossier P5).
6. **Pas de temps : Euler contre RK4.** Courbes d'erreur en échelle log-log (pentes 1 et 4) pour le même modèle. Appui : X4.
7. **La carte ODD.** Les sept éléments en parcours cliquable; chaque page du programme renvoie à son ODD. Appui : Grimm et al. 2020.
8. **Dix exécutions identiques d'un même agent LLM.** Petits multiples montrant des trajectoires différentes à configuration identique; légende : jusqu'à 15 % d'écart d'exactitude (Atil et al. 2024) et absence de `seed`. Niveau : Explorer.
9. **Le bestiaire des métaphores.** Un tableau « composants » en regard de la « métaphore » (loup gris, luciole…) montrant les ingrédients communs. Appui : Camacho-Villalón et al. 2023; Sörensen 2015. Garde-fou V0 : pas de téléologie.
10. **De la ligne de code au DOI.** Frise : dépôt public → release → Zenodo (DOI de version et de concept) → Software Heritage (SWHID) → CITATION.cff. Appui : GitHub et Zenodo 2026, SWH 2026.

---

## 6. Parallèles agentiques appuyés par des sources

Chaque parallèle sépare ce que dit la source de ce qui est inféré.

1. **Décrire un système d'agents comme un ABM.** Source : ODD vise « tout modèle de simulation » (Grimm et al. 2020); ODD+D ajoute la décision humaine (Müller et al. 2013); VISA propose des tables et des règles de cohérence pour la reproductibilité par machine (He 2026, prépublication) [R, M]; Vanhée et al. 2025 recommandent des protocoles structurés comme ODD pour guider la documentation assistée par LLM [T]. Inférence [I] : un système d'agents LLM se documente avec ODD, l'appel de politique comme sous-modèle, l'identifiant de modèle et l'effort comme paramètres.
2. **Patrons multiples contre note de performance unique.** Source : POM (Grimm et al. 2005) évalue un modèle sur plusieurs patrons à plusieurs échelles [R]; Kapoor et al. 2024 : l'exactitude seule néglige le coût [R]. Inférence [I] : un système multi-agents s'évalue sur un ensemble de patrons (taux de succès, coût, modes d'échec MAST) et non un score unique.
3. **Docking règle ↔ LLM.** Source : alignement de deux modèles, trois niveaux d'équivalence (Axtell et al. 1996). Inférence [I] : la condition « LLM exécutant la règle » (audit méthodologie P7-c) est un docking entre la politique à règles et la politique LLM sur la même interface; test d'équivalence (TOST) au format scalaire (hypothèse H7b).
4. **Sensibilité à l'invite comme analyse de sensibilité.** Source : Broeke et al. 2016 et Saltelli et al. 2019 (OFAT puis global); Sclar et al. 2024 (jusqu'à 76 points d'écart d'exactitude selon le format de l'invite, LLaMA-2-13B) [R]. Inférence [I] : paraphrases d'invite = facteur aléatoire (Judd et al. 2012), OFAT sur le format du message avant tout plan croisé.
5. **Pas de graine, donc répétitions et rejeu.** Source : pas de `seed`, `temperature` non réglable, jamais déterministe (Anthropic 2026); variance entre exécutions (Atil et al. 2024); Miller 2024 : ne pas toucher à la température pour réduire la variance. Inférence [I] : on remplace la graine par K répétitions et un journal de rejeu (cassette); le « thermostat » n'est pas un levier de P7.
6. **Non-stationnarité et retrait de modèles.** Source : instantanés figés mais retraits annoncés (Anthropic 2026); dérive d'un service en trois mois (Chen et al. 2023). Inférence [I] : tâches sentinelles et fenêtre d'exécution courte; un résultat LLM est rejouable, non ré-exécutable après retrait.
7. **Ordre de mise à jour et tours de parole.** Source : synchrone et asynchrone donnent des résultats différents (Caron-Lormier et al. 2008; Huberman et Glance 1993). Inférence [I] : dans un système multi-agents LLM, « tous répondent à partir du même état » (synchrone) et « chacun voit les réponses déjà données » (asynchrone) sont deux modèles distincts; l'ordre est un facteur à tester, comme X17.
8. **Métaphore d'essaim et coût.** Source : Sörensen 2015; Camacho-Villalón et al. 2023; Rahman et al. 2025 (Boids LLM ≈ 300 fois plus de calcul) [R]. Inférence [I] : un « essaim d'agents » se justifie par une mesure (gain à budget égal, cadre §4), pas par la métaphore.
9. **Puissance d'une interaction.** Source : Gelman 2018 [S]; Card et al. 2020 (NLP sous-puissant) [R]. Inférence [I] : la question QR3 (orchestrateur contre émergence selon la structure de tâche) est une interaction; prévoir 4 à 16 fois les runs d'un effet principal.
10. **Provenance et journaux publics.** Source : FAIR4RS 2022, R1.2 (provenance détaillée), A2 (métadonnées accessibles même sans logiciel) [T]. Inférence [I] : journal JSONL archivé avec DOI = provenance de P7.

---

## 7. Corrections au cadre, à la v3 et aux audits

**Cadre v4 (`docs/00-cadre.md`).**

1. **§6.3 « alignement relationnel »** : l'expression est celle de Wilensky et Rand 2007 (§2.15), qui créditent Axtell et al. 1996 des trois catégories; le manuscrit d'Axtell et al. 1996 (1995-09-01) écrit **équivalence relationnelle** (version publiée non lue). Écrire « équivalence relationnelle (Axtell et al. 1996; alignement relationnel chez Wilensky et Rand 2007) ».
2. **§6.6 « le modèle chorégraphique commun est validé contre chaque modèle de référence »** : le docking aligne deux modèles; la validation compare à des données empiriques (le principe 1 du cadre le dit). Écrire « aligné par docking ».
3. **§6.5 citation d'ODD** : ODD 2020 demande de citer 2006 et 2020; la mise à jour de 2010 demande 2006 et 2010. Citer Grimm et al. 2006 et 2020 (et 2010 pour les éléments renommés).
4. **§4 gain G = (P_coll − P_ref)/(P_max − P_ref)** : rapport de variables aléatoires; instable quand P_max ≈ P_ref; P_max n'est pas défini. Rapporter aussi la différence appariée P_coll − P_ref avec son IC et donner l'IC de G par bootstrap sur les runs (graines appariées) [I]; définir P_max (borne théorique ou meilleure performance observée) dans `03-plan-de-recherche.md`.
5. **§6.3 « marge d'équivalence (TOST), nombre de répétitions »** : exact, mais il faut relier n et δ. Avec 1 000 répétitions par bras, une marge de ±2 points sur une proportion près de 0,75 est invérifiable (≈ 7 900 requis); ±4 points exige ≈ 1 980; ±10 points ≈ 320 (X18, M6). Les critères du dossier P5 (G1 : « fraction à ±2 points; durée à ±10 % ») ne sont **pas** des TOST valides à n = 1 000.
6. **§7 « PRNG à graine » et « algorithme de Gillespie (SSA) »** : préciser `xoshiro128**` avec SplitMix64 (vecteurs X1 et X3) ou PCG32 (X2); préciser la méthode directe de Gillespie 2007 (éq. 10) ou de la première réaction; interdire `Math.random` (X21).
7. **§2.4 point 16 et §10 (paramètres LLM)** : conforme à la documentation (X22–X23) mais incomplet : **Sonnet 4.5 déprécié le 2026-09-30, retrait le 2026-11-30**; Haiku 4.5 « pas avant le 2026-10-15 » est une date provisoire; les identifiants sont des instantanés figés selon la documentation : la non-stationnarité attendue tient aux retraits; l'absence de dérive silencieuse n'est pas vérifiée de façon indépendante (tâches sentinelles, M9).
8. **Aucune règle de science ouverte** : le cadre n'a ni licence, ni DOI, ni PGD, ni politique de publication des journaux LLM. Ajouter un livrable S0 « Plan de gestion des données et du logiciel » (section M12), avec la vérification du webhook Zenodo avant la première *release*.
9. **Aucune règle de statistique d'évaluation LLM** (hors cadre §4) : ajouter Miller 2024 (éq. 4, 7–10), la règle de choix de K et le plan pilote (M9) à `03-plan-de-recherche.md`.

**Proposition v3 (`docs/annexes/proposition-v3.md`).**

10. **Critère de rigueur (l. 20) sans niveau, tolérance ni règle de décision** : corrigé par le cadre §6; la formule de gabarit est en M3.
11. **Technique (l. 73) « un seul moteur »** et **« rejouant les journaux »** : le journal permet le rejeu, non la ré-exécution (retrait de modèles, aucune graine, X22–X23); la v3 ne l'écrit pas.
12. **l. 74 « références de mémoire »** : ce dossier remplace la mémoire par des sources pour M1–M13; les écarts à ce que la portée laissait attendre sont listés en section 1 (point 12).

**Audits (affirmations à ajuster).**

13. **Audit méthodologie C4 / §8** : « Axtell … alignement relationnel » → équivalence relationnelle (point 1).
14. **Audit méthodologie C11** : « AAMAS 2027 (lieu et échéances non vérifiés) » → Hanoï, 3–7 mai 2027; résumé 2026-10-01, article 2026-10-08 (X24). « ANTS prochaine probablement 2028 [I] » → ANTS 2028 annoncée à ANTS 2026, lieu et dates non trouvés [S].
15. **Audit méthodologie, Annexe A (puissance)** : les n (93, 62, 63, 175, 97) valent pour **détecter** une différence; l'hypothèse d'équivalence H7b exige les n de TOST (M6 : 70 par groupe pour d = 0,5 (tableau 1 de Lakens 2017; approximation normale : 68,5); 191 pour d = 0,3; 155 à 429 par bras pour une proportion à ±0,10 selon p).
16. **Audit méthodologie P7-f (interaction)** : l'argument de Gelman 2018, noté « billet non consulté », est confirmé par une source secondaire et refait [S, I] (X15).
17. **Audit simulation-technique M1 « SplitMix64 pour `xoshiro128**` »** : exact (Blackman et Vigna 2021 §5.3); pour un état de 128 bits, le calcul de SplitMix sur deux sorties de 64 bits convient (X3, X1) [I].
18. **Dossier P5 §5 (« l'écart vient probablement de l'ordre de mise à jour »)** : non soutenu; l'ordre n'a aucun effet sur M6 (X17).

---

## 8. Questions ouvertes et ce qui permettrait de trancher

1. **Grimm et al. 2005 (Science)** : seul le résumé est lu; le texte donnerait les étapes précises de POM. Trancher : accès institutionnel; à défaut Grimm et Railsback 2012 en texte intégral (PMC3223804 : CAPTCHA non contourné).
2. **Gillespie 1976 et Gillespie 1977** : textes non lus; l'énoncé de l'algorithme vient de la revue de 2007 [T]. Trancher : PDF des articles (J. Comput. Phys. pour 1976; ACS pour 1977).
3. **Lakens et al. 2018** (Lakens, Scheel et Isager) : SESOI non lu (SAGE 403); chapitre 13 de Lakens 2024 non recoupé. Trancher : préimpression OSF ou accès institutionnel.
4. **Barker et al. 2022** : article non lu; les 17 principes sont lus dans FAIR4RS 2022 (v1.0) [T]. Les onze auteurs sont vérifiés dans les métadonnées [M] (vérification indépendante).
5. **Saltelli 2002, Saltelli et al. 2010, Morris 1991, Sobol' 2001, Campolongo et al. 2007** : métadonnées seulement; les formules de Morris (r(k+1)) et les indices de Sobol' ne sont pas relus dans la source. Trancher : textes intégraux, ou le « Primer » de Saltelli.
6. **Lee et al. 2015, formule du n minimal** : tranché à la vérification indépendante [T] : la formule imprimée n'a pas de carré sur δ (erreur probable de l'article); la forme standard est retenue (M4).
7. **Miller 2024 §4.2** : l'exemple « 1/9 » est inexact avec ses propres entrées (X11; recalcul confirmé à la vérification indépendante). Trancher : correspondance avec l'auteur ou version ultérieure d'arXiv (seule la v1 est listée).
8. **Morris et al. 2019 : EQM et ES empirique** : l'extraction automatique était fautive (formules corrigées par simulation, X16). Formule de l'ES empirique confirmée par la préimpression v1 [T]. Trancher : relire le tableau 6 (numérotation de la version publiée non vérifiée) sur le PDF.
9. **Zenodo** : la documentation lue ne décrit ni le webhook ni le traitement des *releases* en brouillon ou en pré-version; un dépôt antérieur du chercheur a eu un webhook absent (mémoire de projet du chercheur, non revérifiée ici). Trancher : test sur un dépôt jetable (activer, vérifier Settings → Webhooks, publier une pré-version, un brouillon, une release).
10. **Licences des journaux d'appels LLM** : les conditions d'utilisation d'Anthropic sur la republication des réponses de l'API n'ont pas été lues. Trancher : lecture de ces conditions avant tout dépôt de journaux.
11. **Registered Reports et revues cibles** : non trouvés pour *J R Soc Interface*, *PLOS Comput Biol*, *JASSS*, *Swarm Intelligence*; frais de publication non vérifiés. Trancher : lignes directrices aux auteurs (pages en 403 ou à témoins) ou courriel aux éditeurs.
12. **ALIFE 2027, GECCO 2027 et AAMAS 2028** : échéances d'ALIFE non publiées; échéances 2027 de GECCO non confirmées (site officiel encore en 2026); AAMAS 2028 inconnu; ANTS 2028 sans lieu. Trancher : sites des conférences (alife.vscht.cz, ifaamas.org) en 2027.
13. **PCG contre xoshiro** : le différend repose sur une page d'opinion de Vigna 2026 [S] et le texte d'O'Neill 2014 [T]; la réponse d'O'Neill n'est pas lue. Pour le programme le choix est neutre (`xoshiro128**` par défaut); tester les flux par agent seulement si PCG est retenu.
14. **Écart résiduel de durée de M6 (+9 %)** : l'ordre de mise à jour est écarté (X17); restent la lecture de r et le comptage du temps. Trancher : code ou SI de Sumpter et Pratt 2009, ou auteurs.
15. **ES du « ± » de Sumpter et Pratt 2009** : lu comme écart-type pour X19 [I] [à confirmer]; si c'est une ES, la conclusion change. Trancher : texte de la section 4(b).
16. **Politique tri-organismes** : s'applique si le programme est financé par un des trois organismes; sinon, bonne pratique. Trancher : source de financement.
17. **Broeke et al. 2016 contre Saltelli et al. 2019 (OFAT)** : réconciliation proposée en M4 [I]; elle n'est pas dans la littérature lue. Trancher : application sur M1 et comparaison OFAT, Morris, Sobol' sur un même paramétrage (essai de la porte 0).
18. **Planque et al. 2022 [non vérifiée]** : texte publié non lu; les résumés de la préimpression et de la version publiée donnent 25 questions et six études de cas [R]. Trancher : lecture du texte publié.

---

## 9. Historique de vérification

Vérification indépendante du 2026-10-01 (rapport `recherche/verifications/x-methodes.md`) : 93 références (84 confirmées, 6 corrigées, 3 non vérifiables, 0 fausse); 25 résultats cibles (23 confirmés, 2 non vérifiables : X17, X19); 33 affirmations de la section 3 (24 confirmées, 5 corrigées, 2 non vérifiables, 2 fausses). Consolidation le 2026-10-01 : corrections reportées en place, étiquettes normalisées (« Nom année »), statuts de référence au vocabulaire du cadre §6.8 (vérifiée, corrigée, non vérifiée).

**Corrections appliquées.**

1. M1, Grimm et al. 2020 : le renommage de *Basic principles* en *Theoretical and empirical background* était faux (c'est un élément d'ODD+D); numérotation facultative en 2010 seulement.
2. M10a, sections 1 et 8, Gillespie 1977 : la réf. 8 de la revue de 2007 est Gillespie 1976 (réf. 9 = 1977); Gillespie 1976 ajouté aux références (métadonnées lues dans Crossref à la consolidation).
3. M9, Miller 2024 : éq. 8 avec 1/n hors de la racine; l'éq. 5 est l'IC 95 % de la différence, le SE de la différence n'est pas numéroté. Numérotation relue sur le PDF d'arXiv v1 à la consolidation [T].
4. M4, Broeke et al. 2016 : R² > 90 % = seuil donné en exemple, non exigence; 17 000 exécutions au total, N(k+2) avec N = 1 000 = déduction [I].
5. M3 et M5, Hauke et al. 2020 : 5 000 répétitions suffisantes (non nécessaires), équivalence distributionnelle suggérée (non démontrée); la recommandation de M5 est ajustée.
6. M11, Rahman et al. 2025 : le facteur 300 s'applique à Boids.
7. M4 et section 8, Lee et al. 2015 : absence du carré sur δ confirmée dans le PDF; forme standard conservée.
8. M5, X12, X16, Morris et al. 2019 : numérotation « Tableau 6 » et « §5.3 » non vérifiée; en préimpression v1 : §5.2 et §5.4.
9. Section 1, M3, section 7 : « équivalence relationnelle » lu dans le manuscrit d'Axtell et al. 1996; « alignement relationnel » est l'étiquette de Wilensky et Rand 2007, qui créditent Axtell et al. 1996.
10. Section 7 pt 15 : 70 par groupe pour d = 0,5 (tableau 1 de Lakens 2017), non 69.
11. Références : DOI et numéros de fascicule ajoutés (Grimm et al. 2010, Axtell et al. 1996, Chambers 2013, Chambers et Tzavella 2022, Nosek et al. 2018, Judd et al. 2012, Barr et al. 2013, Bates et al. 2015, Holm 1979, Derrac et al. 2011, Thiele et al. 2014, Grimm et Railsback 2012, Willroth et Atherton 2024, Steele et al. 2014); Caron-Lormier et al. 2008 : 212(3–4); Barker et al. 2022 : onze auteurs; Di Cosmo et Zacchiroli 2017 : non vérifiée devient vérifiée [M]; Vanhée et al. 2025 : texte intégral lu; CoMSES 2026 : la liste de revues n'est pas sur la page; Sclar et al. 2024 ajouté.
12. M13, X24 : AAMAS 2027, délais à la fin du jour indiqué (UTC−12) et inscription OpenReview le 2026-09-17; JAAMAS : « précédant la conférence »; GECCO 2027 : échéances marquées non confirmées.
13. M12, section 1 pt 10, GitHub et Zenodo 2026 : l'exigence dépôt public + licence + approbation d'organisation vient de la doc GitHub.
14. M2 : (i) à (iii) de POM viennent du résumé de Grimm et Railsback 2012; M7 : « 4 fois » est un calcul [I]; M8 : chapitre 13 de Lakens non recoupé, *Royal Society Open Science* « depuis 2015 » à confirmer; M10c : source des sauts de `xoshiro128**` = site de Vigna; X17 et X19 : lecture du « ± » à confirmer.
15. Planque et al. 2022 : l'ambiguïté « 25 questions » contre « 25 études de cas » est levée au niveau des résumés (préimpression et version publiée : 25 questions, six études de cas) [R].

**Réserves restantes.**

- Non vérifiée : Planque et al. 2022 (texte publié non lu), GECCO 2027 (échéances 2027), Runge 1895 / Kutta 1901 (originaux non cherchés; années approximatives).
- [à confirmer] : X17 et X19 (lecture de r et sens du « ± » de Sumpter et Pratt 2009); « Tableau 6 » et « §5.3 » de Morris et al. 2019; *Royal Society Open Science* « depuis 2015 »; chapitre 13 de Lakens 2024; version 4.0 de la licence CC BY (Aranha et al. 2022, Saltelli et al. 2019); numéro (2) de Holm 1979.
- Négatifs non démontrables : absence de format Registered Report pour *J R Soc Interface*, *PLOS Comput Biol*, *JASSS*, *Swarm Intelligence* (« non trouvé »).
- Étiquettes : particule « ten » retirée selon la convention (Broeke et al. 2016); pour les pages web sans date propre, l'année est celle de la consultation (2026).

# Dossier P2 — Optimisation bio-inspirée : ACO contre ABC (la piste contre la danse)

Dossier documentaire du Projet 2 de la proposition v3. Rédigé le 2026-10-01.

**Statut :** consolidé après vérification indépendante, 2026-10-01 (voir « Historique de vérification », §11).

**Légende de vérification** (appliquée à chaque affirmation chiffrée) :

- **[T]** : texte intégral lu (source primaire); les équations, paramètres et chiffres sont transcrits de la source, avec leur emplacement.
- **[R]** : résumé lu (métadonnées et résumé : Crossref, Semantic Scholar, arXiv, Consensus).
- **[M]** : métadonnées bibliographiques seulement; le contenu n'a pas été lu.
- **[S]** : source secondaire lue, nommée entre crochets (ici : le rapport de vérification indépendante du 2026-10-01).
- **[I]** : inférence ou calcul de l'auteur du dossier, non publié dans les sources citées. **[PILOTE]** en est un cas particulier : résultat d'une simulation exploratoire réalisée pour ce dossier (scripts dans `scratchpad/p2src/`).
- **[non vérifiée]** : référence dont le contenu cité n'a pas pu être confirmé (texte fermé, résumé masqué). **[à confirmer]** : valeur non confirmée dans une source.

---

## 1. Synthèse

1. Les deux algorithmes canoniques sont documentés et transcrits depuis leurs sources primaires : Ant System (Dorigo et al. 1996, postprint de l'auteur) et Ant Colony System (Dorigo et Gambardella 1997, PDF IRIDIA). Pour ABC, j'ai lu le rapport TR06 (Karaboga 2005) et l'article de l'*Applied Soft Computing* (Karaboga et Basturk 2008). Je n'ai pas pu lire l'article du *Journal of Global Optimization* (Karaboga et Basturk 2007 [non vérifiée], accès fermé).
2. **Correction majeure à v3** : en 1996, ρ désigne la **persistance**, et la règle publiée est τ(t+n) = ρ·τ(t) + Δτ. La convention où le paramètre désigne l'évaporation est adoptée plus tard, mais la forme exacte de v3, τ ← (1−ρ)τ + Δτ, n'apparaît ni dans Dorigo et Gambardella 1997, qui réécrit l'AS en τ ← (1−α)τ + ΣΔτ (α y nomme la décroissance, éq. 2), ni dans Socha et Dorigo 2008, qui écrit τ ← (1−ρ)τ + ρΔτ (ρ y pondère Δτ, éq. 2). L'origine de la forme de v3 reste à établir : Dorigo et Stützle 2004 (non lu) est une piste [I] [à confirmer]. Avec ρ = 0,5 les deux formes coïncident, mais pas pour les ρ = 0,99 de la Table I.
3. La longueur optimale publiée d'Oliver30 vaut **423,741** en distances réelles et **420** en distances entières. Une recherche 2-opt multi-départs l'a recalculée à partir des coordonnées; elle confirme aussi que le tour de l'AG de Whitley et al. mesure 424,635 (vérification par calcul, sans preuve d'optimalité).
4. Le pilote AS sur Oliver30, avec les paramètres publiés et 10 essais, donne une moyenne de 424,52 à 424,68 contre **424,250** publié. L'optimum n'est atteint que dans 0 à 1 essai sur 10 sans élitisme. Avec l'élitisme (e = 8), il est atteint dans 9 ou 10 essais sur 10, mais seulement 3 à 5 essais sur 10 y arrivent en moins de 400 cycles, alors que l'article affirme que c'est toujours le cas (avec e = 8 cité en exemple; nombre d'essais non précisé). τ0 n'étant pas publié, il faut en faire un paramètre de sensibilité.
5. Le rapport ABC fondateur (TR06, 2005) ne contient **aucune équation algorithmique** (seules figurent les formules des fonctions tests). Les équations de mise à jour apparaissent dans Karaboga et Basturk 2008 (lu); Karaboga et Basturk 2007 [non vérifiée] n'a pas pu être lu. Le code de référence (Sahin 2020) utilise p_i = 0,9·fit_i/max fit + 0,1 plutôt que la roulette fit_i/Σfit décrite dans les articles. Le pilote ABC reproduit pourtant la Table 3 de Karaboga et Basturk 2008 en D = 50 : Griewank et Rastrigin donnent 0 dans 30 essais sur 30, Rosenbrock donne 0,147 ± 0,172 contre 0,133 ± 0,262 publié.
6. La thèse « piste = chemin/combinatoire; danse = lieu/continu » est **fausse comme frontière algorithmique** : ACO_R (Socha et Dorigo 2008) étend ACO au continu, et des ABC combinatoires (TSP) et binaires existent. Je propose de la reformuler selon la **granularité de la mémoire partagée** : statistiques par composant, construites incrémentalement (ACO), contre solutions complètes diffusées puis perturbées (ABC). Cette reformulation est appuyée par la définition d'ACO que donnent Socha et Dorigo (construction incrémentale).
7. La critique des métaheuristiques à métaphore (Sörensen 2015; Sörensen et al. 2018; Camacho-Villalón et al. 2023) impose trois choses au cadrage : décrire les algorithmes par leurs composants, comparer à budget égal d'évaluations avec des références non bio-inspirées, et réserver la métaphore à la vulgarisation.
8. Les parallèles agentiques sont appuyés par la stigmergie comme mémoire distribuée (Dorigo et al. 2000; Dorigo et Gambardella 1997), par les architectures LLM à tableau noir (Han et Zhang 2025; Salemi et al. 2025; Nakamura et al. 2025) et par les LLM couplés aux métaheuristiques (OPRO, Yang et al. 2023; ReEvo, Ye et al. 2024, qui injecte des heuristiques générées par LLM dans ACO; EoH, Liu et al. 2024).

---

## 2. Références

Étiquettes normalisées « Nom année ». Statut : *vérifiée*, *corrigée* ou *non vérifiée* (rapport de vérification indépendante du 2026-10-01). Colonne « Consulté » : niveau de lecture selon la légende.

| Étiquette | Référence complète | DOI / URL | Statut | Consulté |
|---|---|---|---|---|
| Dorigo et al. 1996 | Dorigo, M., Maniezzo, V., Colorni, A. (1996). Ant System: Optimization by a colony of cooperating agents. *IEEE Trans. Systems, Man, and Cybernetics – Part B*, 26(1), 29–41. | https://doi.org/10.1109/3477.484436 ; postprint : http://www.sci.brooklyn.cuny.edu/~sklar/teaching/f05/alife/papers/dorigo-96ant.pdf | vérifiée | [T] postprint (paginé 1–26, « pp.1-13 » en en-tête; la pagination officielle est 29–41; les pages citées au §3.1 sont celles du postprint); éq. (1)–(6), Tables I–V, Fig. 1–14 |
| Dorigo et Gambardella 1997 | Dorigo, M., Gambardella, L. M. (1997). Ant Colony System: A cooperative learning approach to the traveling salesman problem. *IEEE Trans. Evolutionary Computation*, 1(1), 53–66. | https://doi.org/10.1109/4235.585892 ; copie : https://permalink.ulb.be/t/F0M8LsBZIE/download (l'ancienne URL IRIDIA redirige vers ce permalien de l'ULB) | vérifiée | [T] texte intégral; éq. (1)–(5), Sec. III-D, Tables I–III |
| Socha et Dorigo 2008 | Socha, K., Dorigo, M. (2008). Ant colony optimization for continuous domains. *European Journal of Operational Research*, 185(3), 1155–1173 (en ligne le 2006-11-04). | https://doi.org/10.1016/j.ejor.2006.06.046 ; copie : https://permalink.ulb.be/t/uUq8ikt4uj/download | corrigée | [T] texte intégral; éq. (1)–(10), Tables 1–6. Corrigée : q = 0,1 vaut pour toute la Sec. 5.2; l'initialisation *skewed* est recommandée (Sec. 5.1) mais non appliquée par l'article (§3.3) |
| Karaboga 2005 | Karaboga, D. (2005). *An idea based on honey bee swarm for numerical optimization*. Technical Report TR06, Erciyes University, Engineering Faculty, Computer Engineering Department (octobre 2005). | https://abc.erciyes.edu.tr/pub/tr06_2005.pdf | corrigée | [T] texte intégral (10 p.); Tables 1–3. Corrigée : aucune équation algorithmique (seules les formules des fonctions tests figurent, p. 7–8). PDF en ligne régénéré le 2010-04-14 (métadonnées PDF); son identité avec l'original de 2005 n'est pas vérifiable [à confirmer] |
| Karaboga et Basturk 2007 | Karaboga, D., Basturk, B. (2007). A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm. *Journal of Global Optimization*, 39(3), 459–471. | https://doi.org/10.1007/s10898-007-9149-x | non vérifiée | [M] métadonnées confirmées; résumé de l'éditeur masqué, texte fermé. Le TLDR de Semantic Scholar confirme seulement « fonctions multivariables, ABC surpasse les autres algorithmes »; la liste des comparateurs (GA, PSO, PS-EA) n'est pas vérifiée [à confirmer] |
| Karaboga et Basturk 2008 | Karaboga, D., Basturk, B. (2008). On the performance of artificial bee colony (ABC) algorithm. *Applied Soft Computing*, 8(1), 687–697. | https://doi.org/10.1016/j.asoc.2007.05.007 ; copie : http://web.ecs.baylor.edu/faculty/lee/ELC5364/Lecture%20note/Lecture%20Note29-ABC-Karaboga.pdf | vérifiée | [T] texte intégral; éq. (1)–(2), Tables 1–5 |
| Karaboga et Akay 2009 | Karaboga, D., Akay, B. (2009). A comparative study of Artificial Bee Colony algorithm. *Applied Mathematics and Computation*, 214(1), 108–132. | https://doi.org/10.1016/j.amc.2009.03.090 | non vérifiée | [M] métadonnées confirmées; résumé masqué et texte fermé lors de la vérification |
| Sahin 2020 | Sahin, O. (2020). *Artificial Bee Colony Algorithm Homepage* : code de référence Python (`ABC.py`, `Config.py`, `ABC.ini`) [logiciel]. Publié le 2020-05-27; auteur du fichier : Omur Sahin. | https://abc.erciyes.edu.tr/software.htm ; https://github.com/artificialbeecolony/Python_ABC | corrigée | [T] code lu ligne à ligne par la vérification indépendante. Corrigée : NumberOfPopulation désigne la taille de colonie (SN = 25), non SN (§3.4c) |
| Karaboga et Gorkemli 2011 | Karaboga, D., Gorkemli, B. (2011). A combinatorial Artificial Bee Colony algorithm for traveling salesman problem. *2011 Int. Symp. on Innovations in Intelligent Systems and Applications (INISTA)*, 50–53. | https://doi.org/10.1109/INISTA.2011.5946125 | vérifiée | [M] métadonnées Crossref |
| Karaboga et Gorkemli 2019 | Karaboga, D., Gorkemli, B. (2019). Solving traveling salesman problem by using combinatorial artificial bee colony algorithms. *Int. J. on Artificial Intelligence Tools*, 28(1), 1950004. | https://doi.org/10.1142/S0218213019500040 | vérifiée | [R] résumé Crossref : CABC et qCABC, 15 instances TSP |
| Kashan et al. 2012 | Kashan, M. H., Nahavandi, N., Kashan, A. H. (2012). DisABC: A new artificial bee colony algorithm for binary optimization. *Applied Soft Computing*, 12(1), 342–352 (en ligne en août 2011). | https://doi.org/10.1016/j.asoc.2011.08.038 | vérifiée | [M] métadonnées Crossref |
| Pham et al. 2006 | Pham, D. T., Ghanbarzadeh, A., Koç, E., Otri, S., Rahim, S., Zaidi, M. (2006). The Bees Algorithm — A novel tool for complex optimisation problems. In *Intelligent Production Machines and Systems* (IPROMS 2006), Elsevier, 454–459. | https://doi.org/10.1016/B978-008045157-2/50081-X | vérifiée | [M] métadonnées Crossref; ScienceDirect 403. Le rapport technique Cardiff 2005 (MEC 0501) n'a pas été trouvé en ligne |
| Pham et Castellani 2009 | Pham, D. T., Castellani, M. (2009). The Bees Algorithm: modelling foraging behaviour to solve continuous optimization problems. *Proc. IMechE, Part C: J. Mechanical Engineering Science*, 223(12), 2919–2938. | https://doi.org/10.1243/09544062JMES1494 | vérifiée | [M] métadonnées Crossref |
| Sörensen 2015 | Sörensen, K. (2015). Metaheuristics—the metaphor exposed. *International Transactions in Operational Research*, 22(1), 3–18 (en ligne le 2013-02-08). | https://doi.org/10.1111/itor.12001 | vérifiée | [R] résumé Crossref. Texte intégral : Wiley 403 malgré un accès indiqué « bronze » |
| Sörensen et al. 2018 | Sörensen, K., Sevaux, M., Glover, F. (2018). A history of metaheuristics. In Martí, R., Pardalos, P., Resende, M. (dir.), *Handbook of Heuristics*, Springer, 791–808. Préimpression arXiv:1704.00853. | https://doi.org/10.1007/978-3-319-07124-4_4 ; https://arxiv.org/abs/1704.00853 | corrigée | [T] préimpression : sections « metaphor-centric period », « framework » et « scientific period ». Corrigée : version publiée ajoutée (pagination, DOI). La préimpression attribue ACO à Colorni et al. (1992) |
| Camacho-Villalón et al. 2023 | Camacho-Villalón, C. L., Dorigo, M., Stützle, T. (2023). Exposing the grey wolf, moth-flame, whale, firefly, bat, and antlion algorithms: six misleading optimization techniques inspired by bestial metaphors. *International Transactions in Operational Research*, 30(6), 2945–2971 (en ligne le 2022-07-26). | https://doi.org/10.1111/itor.13176 | vérifiée | [R] résumé Crossref |
| Aranha et al. 2022 | Aranha, C., Camacho Villalón, C. L., Campelo, F., Dorigo, M., Ruiz, R., Sevaux, M., Sörensen, K., Stützle, T. (2022). Metaphor-based metaheuristics, a call for action: the elephant in the room. *Swarm Intelligence*, 16(1), 1–6 (en ligne le 2021-11-30). | https://doi.org/10.1007/s11721-021-00202-9 | vérifiée | [M] métadonnées Crossref |
| Mernik et al. 2015 | Mernik, M., Liu, S.-H., Karaboga, D., Črepinšek, M. (2015). On clarifying misconceptions when comparing variants of the Artificial Bee Colony Algorithm by offering a new implementation. *Information Sciences*, 291, 115–127 (janvier 2015; en ligne en 2014). | https://doi.org/10.1016/j.ins.2014.08.040 | vérifiée | [R] résumé (Consensus; TLDR Semantic Scholar) : les comparaisons fondées sur le nombre d'itérations induisent en erreur. Résumé de l'éditeur inaccessible (403) |
| Diwold et al. 2011 | Diwold, K., Aderhold, A., Scheidler, A., Middendorf, M. (2011). Performance evaluation of artificial bee colony optimization and new selection schemes. *Memetic Computing*, 3(3), 149–162. | https://doi.org/10.1007/s12293-011-0065-8 | non vérifiée | [M] métadonnées confirmées. L'affirmation « ABC se dégrade quand l'optimum n'est pas au centre du domaine » n'a pas pu être vérifiée (résumé masqué, accès fermé); le TLDR de Semantic Scholar ne parle que de l'influence des paramètres et de deux nouvelles variantes de sélection |
| Dorigo et al. 2000 | Dorigo, M., Bonabeau, E., Theraulaz, G. (2000). Ant algorithms and stigmergy. *Future Generation Computer Systems*, 16(8), 851–871. | https://doi.org/10.1016/S0167-739X(00)00042-X ; copie : https://permalink.ulb.be/t/VJhryTFBJ8/download | vérifiée | [T] p. 851–854 (résumé, définition de Grassé p. 852, « variables stigmergiques » p. 853–854) |
| Heylighen 2016 | Heylighen, F. (2016). Stigmergy as a universal coordination mechanism I: Definition and components. *Cognitive Systems Research*, 38, 4–13 (en ligne en décembre 2015). | https://doi.org/10.1016/j.cogsys.2015.12.002 | vérifiée | [M] métadonnées Crossref |
| Dorigo et Stützle 2004 | Dorigo, M., Stützle, T. (2004). *Ant Colony Optimization*. MIT Press. | https://doi.org/10.7551/mitpress/1290.001.0001 | vérifiée | [M] métadonnées Crossref |
| Whitley et al. 1989 | Whitley, D., Starkweather, T., Fuquay, D. (1989). Scheduling problems and travelling salesman: the genetic edge recombination operator. *Proc. 3rd Int. Conf. on Genetic Algorithms*, Morgan Kaufmann. Pagination [à confirmer]. | — | vérifiée | [M] confirmée seulement comme réf. [34] de Dorigo et al. 1996 (auteurs, titre, actes et éditeur concordent); pages non vérifiées. C'est la source d'Oliver30 citée par l'AS et l'ACS |
| Dower s.d. | Dower, S. (s.d.). *Oliver 30 TSP* [page de données : coordonnées, ordre, longueurs]. Attribue l'instance à Oliver, Smith et Holland (1987, p. 224–230), d'après Hopfield et Tank. Date de la page non indiquée. | https://stevedower.id.au/research/oliver-30 | vérifiée | [T] coordonnées (numérotation de Dorigo); longueurs 423,741 et 420 recalculées (2-opt) |
| Yang et al. 2023 | Yang, C., Wang, X., Lu, Y., Liu, H., Le, Q. V., Zhou, D., Chen, X. (2023). Large Language Models as Optimizers. arXiv:2309.03409 (ICLR 2024). | https://arxiv.org/abs/2309.03409 | vérifiée | [R] résumé arXiv : l'invite contient les solutions précédentes et leurs valeurs |
| Ye et al. 2024 | Ye, H., Wang, J., Cao, Z., Berto, F., Hua, C., Kim, H., Park, J., Song, G. (2024). ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution. arXiv:2402.01145 (NeurIPS 2024). | https://arxiv.org/abs/2402.01145 | vérifiée | [R] résumé; sec. 5.2 « Heuristic measures for ACO » (TSP, CVRP, OP, MKP, BPP) lue dans l'HTML arXiv v3 |
| Liu et al. 2024 | Liu, F., Tong, X., Yuan, M., Lin, X., Luo, F., Wang, Z., Lu, Z., Zhang, Q. (2024). Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model. *Proc. 41st International Conference on Machine Learning (ICML)*, PMLR 235, 32201–32223. Préimpression arXiv:2401.02051. | https://proceedings.mlr.press/v235/liu24bs.html ; https://arxiv.org/abs/2401.02051 | corrigée | [R] résumé arXiv. Corrigée : version publiée (ICML 2024) ajoutée |
| Han et Zhang 2025 | Han, B., Zhang, S. (2025). Exploring Advanced LLM Multi-Agent Systems Based on Blackboard Architecture. arXiv:2507.01701. | https://arxiv.org/abs/2507.01701 | vérifiée | [R] résumé arXiv : sélection d'agents par le tableau noir, consensus, moins de jetons |
| Salemi et al. 2025 | Salemi, A., Parmar, M., Goyal, P., Song, Y., Yoon, J., Zamani, H., Pfister, T., Palangi, H. (2025). LLM-Based Multi-Agent Blackboard System for Information Discovery in Data Science. arXiv:2510.01285 (v2 du 2026-01-31). | https://arxiv.org/abs/2510.01285 | vérifiée | [R] résumé arXiv : agent central qui affiche des requêtes, agents qui se portent volontaires |
| Nakamura et al. 2025 | Nakamura, M., Kumar, A., Mahmud, S., Abdelnabi, S., Zilberstein, S., Bagdasarian, E. (2025). Terrarium: Revisiting the Blackboard for Multi-Agent Safety, Privacy, and Security Studies. arXiv:2510.14312. | https://arxiv.org/abs/2510.14312 | vérifiée | [R] résumé arXiv : empoisonnement de données (*data poisoning*) |
| Pal et al. 2026 | Pal, S., Wang, F. Y., Buehler, M. J. (2026). SwarmWorld: Stigmergic technological evolution in societies of language-model agents. arXiv:2608.26081 (préimpression du 2026-08-26, non évaluée par les pairs). | https://arxiv.org/abs/2608.26081 | vérifiée | [R] résumé arXiv : auto-organisation sans rôles assignés, stigmergie physique |

---

## 3. Modèles (transcriptions des sources)

### 3.1 Ant System, version ant-cycle (Dorigo et al. 1996) [T]

Les numéros d'équation sont ceux du postprint (Sec. II–III). Les pages citées sont celles du postprint.

- **Mise à jour de la piste**, éq. (1), p. 5 : τ_ij(t+n) = ρ·τ_ij(t) + Δτ_ij. Ici ρ est un coefficient tel que (1−ρ) représente l'évaporation entre t et t+n; la Sec. IV le nomme *trail persistence*, avec 0 ≤ ρ < 1.
- **Somme des dépôts**, éq. (2) : Δτ_ij = Σ_{k=1..m} Δτ_ij^k.
- **Dépôt ant-cycle**, éq. (3) : Δτ_ij^k = Q / L_k si la fourmi k emprunte l'arête (i,j) pendant son tour, 0 sinon. L_k est la longueur du tour de la fourmi k.
- **Visibilité** : η_ij = 1/d_ij, constante pendant toute l'exécution.
- **Règle de transition**, éq. (4), p. 6 : p_ij^k(t) = [τ_ij(t)]^α·[η_ij]^β / Σ_{l∈allowed_k} [τ_il(t)]^α·[η_il]^β si j ∈ allowed_k, 0 sinon, avec allowed_k = N − tabu_k (liste tabou des villes déjà visitées).
- **Variantes « locales »**, éq. (5) et (6), p. 8 : ant-density dépose Q à chaque pas; ant-quantity dépose Q/d_ij à chaque pas.
- **Initialisation** : τ_ij(0) = c, « une petite constante positive ». **La valeur de c n'est pas publiée.**
- **Arrêt** : NC_MAX cycles, ou stagnation (toutes les fourmis font le même tour).
- **Complexité** : O(NC·n²·m), soit O(NC·n³) avec m ≈ n (Sec. III).
- **Élitisme**, Sec. V-C : à chaque cycle, chaque arête du meilleur tour reçoit en plus e·Q/L*, où e est le nombre de fourmis élitistes et L* la longueur du meilleur tour trouvé.

**Paramètres publiés** (Sec. IV, p. 8–9; Table I, p. 9; Fig. 9, p. 13; Sec. VI, p. 17) :

| Paramètre | Valeur | Emplacement |
|---|---|---|
| α (poids de la piste) | défaut de l'étude : 1; meilleur pour ant-cycle : **1** | Sec. IV; Table I |
| β (poids de la visibilité) | défaut de l'étude : 1; meilleur pour ant-cycle : **5** | Sec. IV; Table I |
| ρ (persistance) | ant-cycle : **0,5**; ant-density et ant-quantity : 0,99 | Table I |
| Q | **100** (influence jugée négligeable, Q ∈ {1, 100, 10 000} testés) | Sec. IV; Fig. 9 |
| m | **m = n** (30 pour Oliver30); optimum de synergie m ≈ n (Sec. V-A) | Sec. IV, V-A |
| NC_MAX | **5000** cycles (étude des paramètres); 2500 (carte α–β et élitisme) | Sec. IV; Fig. 8, Sec. V-C |
| Essais | **10** par réglage | Sec. IV; Table I |
| Répartition initiale | uniforme (même nombre de fourmis par ville); elle bat le départ d'une ville unique | Sec. V-B, note 5 |
| e (élitistes) | plage optimale; **e = 8** cité en exemple de bon réglage (« for instance ») | Fig. 14; Sec. VI-A |
| Valeurs testées | α ∈ {0; 0,5; 1; 2; 5}, β ∈ {0; 1; 2; 5}, ρ ∈ {0,3; 0,5; 0,7; 0,9; 0,999} | Sec. IV |

**Résultats publiés sur Oliver30** :

- **Table I** (moyenne sur 10 essais, NC_MAX = 5000, distances réelles) :

  | Variante | Meilleurs paramètres | Moyenne | Meilleur |
  |---|---|---|---|
  | ant-density | α = 1, β = 5, ρ = 0,99 | 426,740 | 424,635 |
  | ant-quantity | α = 1, β = 5, ρ = 0,99 | 427,315 | 426,255 |
  | ant-cycle | α = 1, β = 5, ρ = 0,5 | **424,250** | **423,741** |

- **Fig. 9 et 10** : meilleur tour en **342 cycles**, de longueur **423,741** en distances réelles et **420** en distances entières. Il présente deux inversions (2–1 et 25–24) par rapport au tour de Whitley et al. (424,635).
- **Fig. 7 et 8** : avec α = 5 et β = 2, l'arborescence moyenne des nœuds tombe à 2 vers 2500 cycles (stagnation). La carte α–β comporte trois classes : G (bon, sans stagnation), ∞ (mauvais, sans stagnation, α faible) et ∅ (mauvais, avec stagnation, α élevé). Les combinaisons G citées sont (1,1), (1,2), (1,5) et (0,5; 5).
- **Sec. VI-A (p. 17)**, avec α = 1, β = 5, ρ = 0,5, Q = 100 et e = 8 (réglage cité en exemple, « for instance »; le nombre d'essais n'est pas précisé) : le tour de 423,741 est trouvé à chaque fois en moins de 400 cycles, et des valeurs inférieures à 430 sont atteintes en environ 100 cycles. L'algorithme n'entre jamais en stagnation.
- **Table III** (distances entières, moyenne sur 10, arrondie) : ant-cycle 420; meilleure heuristique de construction + 2-opt : 421; Lin-Kernighan : 420 ou 421.
- **Table IV** (distances entières, 10 essais, 1 h sur un 80386) :

  | Méthode | Meilleur | Moyenne | Écart-type |
  |---|---|---|---|
  | AS | 420 | 420,4 | 1,3 |
  | TS | 420 | 420,6 | 1,5 |
  | SA | 422 | 459,8 | 25,1 |

- **Table II** (grilles r×r d'arête 10, 5 essais) : optimum toujours trouvé jusqu'à 64 villes. Cycles moyens : 4×4 → 5,6; 5×5 → 13,6; 6×6 → 60; 7×7 → 320; 8×8 → 970.
- **Honnêteté de l'article, à reprendre en vulgarisation** : la note 4 précise que ce résultat n'est pas compétitif face aux algorithmes spécialisés, et la Sec. VI-A que l'AS est beaucoup plus lent que les heuristiques TSP dédiées.

### 3.2 Ant Colony System (Dorigo et Gambardella 1997) [T]

Les équations ci-dessous sont lues sur l'image des pages 55–56 (texte extrait illisible).

- **Rappel AS**, éq. (1)–(2) : la règle de transition reprend celle de l'AS avec seulement [τ]·[η]^β, sans exposant α sur τ. La mise à jour globale de l'AS s'écrit τ ← (1−α)·τ + Σ_k Δτ_k, avec Δτ_k = 1/L_k et 0 < α < 1 le paramètre de décroissance. L'article de 1997 nomme donc α ce que celui de 1996 appelle 1−ρ.
- **Règle pseudo-aléatoire proportionnelle**, éq. (3) : s = argmax_{u∈J_k(r)} {[τ(r,u)]·[η(r,u)]^β} si q ≤ q0 (exploitation); sinon S est tiré selon (1) (exploration biaisée), avec q ~ U[0,1].
- **Mise à jour globale**, éq. (4) : τ(r,s) ← (1−α)·τ(r,s) + α·Δτ(r,s), où Δτ = (L_gb)^−1 pour les arêtes du meilleur tour global et 0 sinon. La variante iteration-best donne un résultat proche, avec un léger avantage au global-best.
- **Mise à jour locale**, éq. (5) : τ(r,s) ← (1−ρ)·τ(r,s) + ρ·Δτ(r,s). La version ACS retenue utilise Δτ = τ0. La variante Ant-Q, avec Δτ = γ·max τ(s,z), est inspirée du Q-learning.
- **Paramètres** (Sec. III-D, p. 56) : β = 2, q0 = 0,9, α = ρ = 0,1, τ0 = (n·L_nn)^−1 (L_nn : tour du plus proche voisin), **m = 10**. Les fourmis sont placées au hasard, au plus une par ville.
- **Table I** (2500 itérations, 25 essais) :

  | Instance | Variante | Moyenne | Écart-type | Meilleur |
  |---|---|---|---|---|
  | Oliver30 | ACS | **424,74** | **2,83** | **423,74** |
  | Oliver30 | Ant-Q | 424,70 | 2,00 | 423,74 |
  | Oliver30 | Δτ = 0 | 427,52 | 5,21 | 423,74 |
  | Oliver30 | sans mise à jour locale | 427,31 | 3,63 | 423,91 |
  | ry48p | ACS (10 000 itérations) | 14 625 | 142 | 14 422 |

- **Table III** (1250 itérations, 20 fourmis, 15 essais) : meilleur tour entier [nombre de tours générés] et meilleur réel.

  | Instance | Meilleur entier | Tours | Meilleur réel |
  |---|---|---|---|
  | Eil50 | 425 | 1830 | 427,96 |
  | Eil75 | 535 | 3480 | 542,37 |
  | KroA100 | 21 282 | 4820 | 21 285,44 |

- **Rôle de la mise à jour locale** (Sec. IV-A) : elle rend une arête moins attirante chaque fois qu'elle est empruntée. Les fourmis ne convergent donc jamais vers un chemin commun (mécanisme anti-grégaire).
- La phéromone y est décrite comme une **mémoire à long terme distribuée** sur les arêtes, ce qui permet une communication indirecte appelée stigmergie (p. 55).

### 3.3 ACO_R pour domaines continus (Socha et Dorigo 2008) [T]

- **Convention d'évaporation** de l'ACO générique, éq. (2), p. 1157 : τ_ij ← (1−ρ)·τ_ij + ρ·Δτ si τ_ij appartient à la solution choisie, (1−ρ)·τ_ij sinon, avec ρ ∈ (0,1] le taux d'évaporation.
- **Idée centrale** (Sec. 3, p. 1158) : la distribution discrète sur les composants est remplacée par une densité continue. La phéromone devient une **archive de k solutions complètes**, triées par qualité (Sec. 3.2, Fig. 3). Cette idée est inspirée de PB-ACO.
- **Noyau gaussien** par dimension i, éq. (5) : G^i(x) = Σ_{l=1..k} ω_l · (1/(σ_l^i·√(2π))) · exp(−(x−μ_l^i)²/(2σ_l^i²)).
- **Moyennes**, éq. (6) : μ^i = (s_1^i, …, s_k^i). Les solutions de l'archive sont les moyennes.
- **Poids de rang**, éq. (7) : ω_l = (1/(q·k·√(2π))) · exp(−(l−1)²/(2q²k²)). Un q petit favorise fortement les meilleures solutions.
- **Choix du noyau**, éq. (8) : p_l = ω_l / Σ_r ω_r. Le choix se fait une fois par fourmi et par itération.
- **Écart-type**, éq. (9) : σ_l^i = ξ · Σ_{e=1..k} |s_e^i − s_l^i| / (k−1). Le paramètre ξ joue un rôle analogue à l'évaporation.
- **Mise à jour** : les m nouvelles solutions sont ajoutées à l'archive, puis les m pires sont retirées.
- **Paramètres** (Table 2, p. 1166) : m = 2 fourmis, ξ = 0,85, q = 10^−4, k = 50. Sec. 5.2 (**toutes** les fonctions de la série) : q = 0,1, valeur plus grande choisie pour la robustesse sur les fonctions multimodales.
- **Résultats**, Table 6 (100 essais; arrêt |f − f*| < ε1·f + ε2 avec ε1 = ε2 = 10^−4, éq. 10). Nombre moyen d'évaluations; le taux de succès est indiqué entre crochets quand il est inférieur à 100 %.

  | Fonction | Évaluations moyennes | Succès |
  |---|---|---|
  | Rosenbrock R2 | 820 | 100 % |
  | Sphère (n = 6) | 781 | 100 % |
  | Griewangk GR10 | 1390 | **61 %** |
  | Rosenbrock R5 | 2487 | 97 % |

- **Point méthodologique** (Sec. 5.1, p. 1164) : l'article recommande, quand c'est possible, une initialisation sans biais (ni près de l'optimum, ni symétrique autour de lui; dite *skewed*), et de compter les évaluations de fonction plutôt que le temps CPU. **Il ne l'applique toutefois pas systématiquement** : ses essais reprennent des intervalles d'initialisation identiques à ceux des méthodes comparées.
- **Définition d'ACO par la construction incrémentale** : l'article refuse le statut d'extension d'ACO à CACO et à CIAC, faute de construction incrémentale des solutions (Sec. 4.1, p. 1162–1163).

### 3.4 Artificial Bee Colony

**a) TR06 (Karaboga 2005) [T]**

- Rôles (Sec. III, p. 6) : la première moitié de la colonie est formée d'ouvrières, la seconde d'observatrices. Il y a une ouvrière par source. L'ouvrière d'une source épuisée devient éclaireuse.
- Le paramètre **limit** est le nombre d'essais sans amélioration avant l'abandon d'une source (p. 7).
- **Aucune équation algorithmique** (recherche, fitness, probabilité) n'apparaît. Seules les formules des fonctions tests (Table 1) et les x_opt figurent, en texte, aux p. 7 et 8. Vérifié par extraction PDF, puis relu indépendamment. Le PDF en ligne a été régénéré le 2010-04-14 (métadonnées PDF); son identité avec l'original de 2005 n'est pas vérifiable [à confirmer].
- **Table 2** : swarmsize 20; limit = nombre d'observatrices × D; observatrices et ouvrières à 50 % chacune; une éclaireuse. MCN = 2000; 30 essais.
- **Table 3** :

  | Fonction | Moyenne | Écart-type |
  |---|---|---|
  | Sphère 5D | 4,45E−17 | 1,13E−17 |
  | Rosenbrock 2D | 0,002234 | 0,002645 |
  | Rastrigin 10D | 4,68E−17 | 2,64E−17 |

- **Anomalie** : la Table 1 donne pour Rastrigin le domaine **[−600, 600]**, inhabituel (c'est le domaine usuel de Griewank). Le rapport ne teste pas Griewank.

**b) Applied Soft Computing 2008 (Karaboga et Basturk 2008) [T]**

- **Éq. (1)**, p. 690 : P_i = F(θ_i) / Σ_{k=1..S} F(θ_k), où F est la quantité de nectar et S le nombre de sources. Le texte précise que la sélection se fait par roulette.
- **Éq. (2)** : θ_i(c+1) = θ_i(c) ± φ_i(c), où φ est un pas aléatoire calculé à partir de la différence avec une source k tirée au hasard. La sélection est gloutonne : la source n'est remplacée que si le nectar augmente.
- **Paramètres** (Table 2, p. 691; Sec. 4) : colonie de **100**; n_o = n_e = 50 % de la colonie; n_s = 1 (au plus une éclaireuse par cycle); **limit = n_e × D**.
- **MCN** : 1000 pour f1 et f2, **5000** pour f3–f5, « pour égaliser » le budget à 100 000 et 500 000 évaluations. Les auteurs comptent donc environ 100 évaluations par cycle. **30 essais.**
- **Fonctions** (Table 1) :

  | Fonction | Dimension | Domaine | Remarque |
  |---|---|---|---|
  | Schaffer F6 | 2 | [−100, 100] | |
  | Sphère | 5 | [−100, 100] | |
  | **Griewank décalée** | 50 | [−600, 600] | f3 = (1/4000)·Σ(x_i−100)² − Π cos((x_i−100)/√i) + 1, optimum en x = 100 |
  | **Rastrigin** | 50 | [−5,12; 5,12] | |
  | **Rosenbrock** | 50 | [−50, 50] | |

- **Table 3** (moyenne ± écart-type; valeurs inférieures à 1E−12 notées 0) :

  | Fonction | ABC | DE | PSO | EA |
  |---|---|---|---|---|
  | Griewank 50D | **0 ± 0** | 0 ± 0 | 1,549 | 0,00624 |
  | Rastrigin 50D | **0 ± 0** | 0 ± 0 | 13,1162 | 32,6679 |
  | Rosenbrock 50D | **0,133109389824 ± 0,262242170275** | 35,3176 ± 0,27444 | 5142,45 | 79,8180 |

  Les résultats de DE, PSO et EA viennent de Krink et al. 2004 (référence [27] de l'article; la Table 3 cite à tort [26], qui renvoie à Goldberg 1989 [S : rapport de vérification indépendante]).
- **Table 4** (1000 cycles; colonies de 10, 50 et 100) : Rosenbrock 50D donne 9,22, 0,160 et 0,0853. La qualité s'améliore avec la taille, puis plafonne; une colonie de 50 à 100 est jugée suffisante.
- **Table 5** (effet de limit; 30 essais) : sur les fonctions multimodales, limit = 0,1·n_e·D et l'absence d'éclaireuses donnent de moins bons résultats que 0,5·n_e·D ou n_e·D. L'effet est plus net pour les petites colonies; les éclaireuses n'aident pas sur les fonctions unimodales.
- **Budget de la Table 5 et incohérence** : la note de la Table 5 fixe un budget de 20 000 évaluations (f1, f2) et de 100 000 (f3–f5) pour des colonies de 20, 40 et 100, soit 5000 cycles pour une colonie de 20 [I]; cette note est cohérente avec un budget fixe en évaluations [S : rapport de vérification indépendante]. **L'incohérence réelle oppose les Tables 4 et 5** : pour une colonie de 100 et environ 1000 cycles [I], Rastrigin 50D vaut 4,37E−16 (Table 4) contre 5,096 (Table 5, limit = n_e·D); la cause n'est pas établie [à confirmer]. Mernik et al. 2015 traite justement de ce type d'ambiguïté.
- **Les auteurs reconnaissent la parenté avec DE** (Sec. 5) : la production de voisins est « similaire à la mutation » de DE et la sélection gloutonne est « comme dans DE ».

**c) Équations canoniques et code de référence**

Les équations ci-dessous sont celles du code de référence Python (Sahin 2020; `ABC.py`, `Config.py`, `ABC.ini`), lu ligne à ligne par la vérification indépendante [T]. Leur attribution aux articles de Karaboga et Basturk 2007 [non vérifiée] et de Karaboga et Akay 2009 [non vérifiée] n'est pas vérifiée : ces articles n'ont pas été lus.

- Initialisation : x_ij = l_j + rand(0,1)·(u_j − l_j).
- Voisinage : v_ij = x_ij + φ_ij·(x_ij − x_kj), avec φ ~ U[−1, 1]. **Une seule dimension j** est modifiée; k ≠ i est tiré au hasard.
- Fitness : fit = 1/(1+f) si f ≥ 0, et 1 + |f| sinon.
- **Probabilité des observatrices dans le code : p_i = 0,9·fit_i/max fit + 0,1**, avec un balayage circulaire et un tirage r < p_i. Ce n'est **pas** la roulette fit_i/Σfit de l'éq. (1) de Karaboga et Basturk 2008.
- Éclaireuse : au plus une par cycle, sur la source dont le compteur trial est le plus élevé si trial ≥ limit.
- Arrêt : nombre maximal d'**évaluations**. `ABC.ini` fixe 500 000 évaluations, 30 essais, D = 30, NumberOfPopulation = 50 et Limit = 1500. `Config.py` fixe `FOOD_NUMBER = NumberOfPopulation / 2` : NumberOfPopulation désigne donc la **taille de colonie** (50), SN = 25, et Limit = 1500 = colonie × D = 2·SN·D. Le défaut du code vaut le double de la règle de 2008 (limit = n_e·D = SN·D) [T].

**d) ABC combinatoire et binaire** [M/R]

- CABC (Karaboga et Gorkemli 2011) et qCABC (Karaboga et Gorkemli 2019) pour le TSP, testés sur 15 instances (résumé de 2019).
- DisABC (Kashan et al. 2012) pour l'optimisation binaire.
- Le contenu des opérateurs de ces variantes n'a pas été lu.

### 3.5 Bees Algorithm (Pham et al. 2006, Pham et Castellani 2009) [M]

- Seules les métadonnées sont confirmées. La terminologie (n éclaireuses, m sites sélectionnés, e sites d'élite, nep et nsp recrues, rayon de voisinage ngh) est connue par Wikipédia, qui n'est pas une source primaire. **Elle ne doit pas servir de cible de reproduction tant que le texte n'est pas obtenu.**
- Il faut s'en souvenir pour le cadrage : le Bees Algorithm et ABC sont deux algorithmes distincts, inspirés tous deux du butinage, et publiés presque en même temps (2005).

---

## 4. Résultats cibles et critères d'acceptation

**Conventions communes** :

- Graines enregistrées.
- Budget compté en **évaluations de fonction (FE)** ou en **tours construits**, jamais en « cycles » seuls (Mernik et al. 2015).
- Rapport de la moyenne, de l'écart-type, de la médiane, du meilleur et du taux de succès.
- Intervalle de confiance bootstrap à 95 % (10 000 rééchantillonnages) sur la moyenne.
- Un critère est **satisfait** si la valeur publiée tombe dans l'IC95 % reproduit **ou** si l'écart relatif reste dans la tolérance indiquée.

| ID | Algo / espèce | Résultat publié (emplacement) | Grandeur mesurée | Critère d'acceptation | Répétitions | Pilote |
|---|---|---|---|---|---|---|
| C1 | Instance Oliver30 | Optimum 423,741 (réel) / 420 (entier); tour de l'AG = 424,635 (Dorigo et al. 1996, Fig. 9, note 3) | Longueur du meilleur tour, coordonnées de Dower s.d. | Recalcul exact à ±0,001; certificat d'optimalité par Concorde (à faire) | 1 | **Fait** : 2-opt multi-départs (3000 départs) → 423,741 / 420; ordre identité → 424,635 [PILOTE] |
| C2 | AS ant-cycle (Dorigo et al. 1996) | Moyenne 424,250, meilleur 423,741 (Table I; α = 1, β = 5, ρ = 0,5, m = 30, 5000 cycles; Q = 100 est la valeur par défaut, absente de la Table I) | Meilleur tour par essai | (a) Moyenne ≤ 424,25 × 1,002 (≈ 425,10), soit un excès relatif moyen sur l'optimum ≤ 0,32 %; (b) ≥ 1 essai sur 30 atteint 423,741; (c) le classement ant-cycle < ant-density < ant-quantity sur la moyenne est reproduit | **30** (10 dans l'article : trop peu pour l'IC) | Pour 10 essais, τ0 = 1e−6 → moyenne 424,516 (σ 0,77), meilleur 423,912, 0/10 à l'optimum; τ0 = 0,06 → 424,684 (σ 0,85), 1/10 à l'optimum. (a) satisfait, (b) fragile [PILOTE] |
| C3 | AS élitiste (Dorigo et al. 1996) | e = 8 (exemple de bon réglage, « for instance »; nombre d'essais non précisé) : 423,741 trouvé à chaque fois en moins de 400 cycles; < 430 en ≈ 100 cycles (Sec. VI-A, p. 17) | Cycles avant le premier tour à 423,741; cycles avant < 430 | (a) taux de succès ≥ 90 % en 5000 cycles; (b) médiane des cycles avant succès ≤ 400; (c) médiane avant < 430 ≤ 150 | 30 | 9/10 (τ0 = 1e−6) et 10/10 (τ0 = 0,06) à l'optimum, mais seulement **3/10 (τ0 = 1e−6) et 5/10 (τ0 = 0,06) en moins de 400 cycles** (médianes 665 et 526) → « toujours < 400 » **non reproduit** [PILOTE] |
| C4 | AS, carte α–β (Dorigo et al. 1996) | Classes G / ∞ / ∅ (Fig. 8, 2500 cycles, 10 essais); stagnation (arborescence → 2) avec α = 5, β = 2 vers 2500 cycles (Fig. 7) | Arborescence moyenne des nœuds (arêtes au-dessus de ε par nœud); longueur moyenne | Classe reproduite dans ≥ 80 % des cellules; avec α = 5, β = 2 : arborescence ≤ 2,05 avant 3000 cycles dans ≥ 7 essais sur 10 | 10 par cellule | À faire. La valeur de ε n'est pas publiée : la fixer (p. ex. τ < 1e−6·τ_max) et la déclarer |
| C5 | AS, synergie (Dorigo et al. 1996) | Grille 4×4, optimum 160; m ≈ n optimal (grilles r×r, r = 4 à 8); optimum atteint avec 8 à 16 fourmis sur le graphe aléatoire de 16 villes; α = 1 meilleur qu'α = 0 (Fig. 12–13) | « One-ant cycles » = cycles avant l'optimum × m | Minimum des one-ant cycles pour m ∈ {8, 16} [à confirmer : l'article donne « 8–16 fourmis » pour le graphe aléatoire de 16 villes; le minimum de la Fig. 13 (grille 4×4) ne se lit que sur le graphique]; optimum toujours trouvé pour m ≥ 4 | 5 par m (comme l'article) → 20 recommandés | À faire |
| C6 | ACS (Dorigo et Gambardella 1997) | Oliver30 : moyenne 424,74, σ 2,83, meilleur 423,74 (Table I; m = 10, β = 2, q0 = 0,9, α = ρ = 0,1, 2500 itérations) | Meilleur tour par essai | Moyenne dans 424,74 ± 1,1 (soit ± 2σ/√25); meilleur = 423,741 dans ≥ 1 essai; sans mise à jour locale, moyenne supérieure à celle de l'ACS (427,31 publié) | 25 | À faire |
| C7 | ACS (Dorigo et Gambardella 1997) | Eil50 = 425 en 1830 tours; Eil75 = 535; KroA100 = 21 282 (Table III; 20 fourmis, 1250 itérations, 15 essais) | Meilleur tour entier sur 15 essais; tours avant le meilleur | Meilleur sur 15 essais = optimum entier; tours médians ≤ 2 × la valeur publiée | 15 | À faire. Eil50 et Eil75 = Eil51 et Eil76 de TSPLIB moins une ville : à reconstituer |
| C8 | ABC (Karaboga et Basturk 2008) | Griewank 50D (décalée) 0 ± 0; Rastrigin 50D 0 ± 0; Rosenbrock 50D 0,1331 ± 0,2622 (Table 3; colonie 100, limit = n_e·D, MCN 5000, 30 essais; < 1e−12 → 0) | Meilleure valeur f par essai, seuil 1e−12 | Griewank et Rastrigin : ≥ 90 % des essais < 1e−12. Rosenbrock : moyenne dans [0,01; 0,5] (même ordre de grandeur) et Mann-Whitney sans différence avec une loi de même médiane (p > 0,05) si les données brutes sont obtenues | 30 | **Satisfait** : Griewank 30/30 et Rastrigin 30/30 < 1e−12; Rosenbrock 0,147 ± 0,172 (§4.1) [PILOTE] |
| C9 | ABC (Karaboga et Basturk 2008), effet de limit | Multimodal : limit = 0,1·n_e·D et « sans éclaireuse » pires que 0,5 et 1·n_e·D, surtout pour une colonie de 20 (Table 5; budget de 100 000 évaluations pour f3–f5, note de la Table 5). Rastrigin 50D, colonie de 20 : 0,1283 (0,1·n_e·D); 0,00257 (0,5·n_e·D); 3,58E−14 (n_e·D); 0,0995 (sans éclaireuse) [S : rapport de vérification indépendante] | Moyenne f par réglage, à **100 000 évaluations** (5000 cycles pour une colonie de 20 [I]) | Ordre qualitatif reproduit sur Rastrigin 50D pour une colonie de 20 : moyenne(limit = n_e·D) < moyenne(0,1·n_e·D) et < moyenne(sans éclaireuse), Mann-Whitney p < 0,05 | 30 | À faire |
| C10 | ABC (Karaboga 2005, TR06) | Rosenbrock 2D : 0,002234 ± 0,002645 (Table 3; essaim de 20, MCN 2000, 30 essais) | Meilleure f par essai | Moyenne dans [0,0005; 0,01] | 30 | À faire (priorité basse : rapport sans équation algorithmique) |
| C11 | ACO_R (Socha et Dorigo 2008) | Rosenbrock R2 : 820 FE; GR10 : 61 % de succès, 1390 FE; R5 : 97 %, 2487 FE (Table 6; m = 2, ξ = 0,85, q = 0,1, k = 50, éq. 10) | FE moyennes avant le critère (10); taux de succès | FE moyennes à ± 25 % de la valeur publiée; succès sur GR10 dans [50 %, 72 %] (IC binomial à 95 % pour n = 100 autour de 61 %) | 100 | À faire |
| C12 | Test de la thèse (nouveau, non publié) | — | Excès relatif à l'optimum à budget égal de FE | Grille 2×2 : {ACO (AS ou MMAS), ABC} × {TSP Oliver30/Eil51, Rastrigin/Rosenbrock 10D}, avec CABC et ACO_R comme versions croisées; références 2-opt/LK et DE/CMA-ES. Hypothèse falsifiable : l'avantage relatif ACO/ABC s'inverse entre combinatoire et continu | 30 par cellule | Non commencé. C'est la contribution du projet, pas une reproduction |

### 4.1 Pilote ABC (Karaboga et Basturk 2008, D = 50, colonie 100, MCN 5000) [PILOTE]

Script : `p2src/abc_pilot.py`. Réglages : SN = 50, limit = SN·D = 2500, au plus une éclaireuse par cycle, voisinage sur une dimension, φ ~ U[−1, 1], fit = 1/(1+f), bornes écrêtées. Le budget réel est d'environ 500 050 évaluations par essai, ce qui concorde avec les 500 000 annoncés.

| Fonction | Publié (Table 3) | Pilote, roulette fit/Σfit (30 essais) | Pilote, code de référence 0,9/0,1 (10 essais) |
|---|---|---|---|
| Griewank 50D décalée | 0 ± 0 | **0 ± 0** (30/30 < 1e−12) | 0 ± 0 (10/10) |
| Rastrigin 50D | 0 ± 0 | **0 ± 0** (30/30) | 0 ± 0 (10/10) |
| Rosenbrock 50D | 0,1331 ± 0,2622 | **0,147 ± 0,172** (min 0,0019; max 0,685) | 0,105 ± 0,103 |

Verdict : **C8 satisfait** pour les deux règles de sélection. La Table 3 de Karaboga et Basturk 2008 est reproductible avec les seuls éléments publiés et le code de référence, et le choix entre roulette et règle 0,9/0,1 n'y change rien de significatif à ce budget. Limite : un seul pilote, 10 essais pour la variante du code, et aucun test de décalage d'optimum (voir Diwold et al. 2011 [non vérifiée] : apport sur ce point non vérifié).

---

## 5. Évaluation de la thèse « piste = chemin/combinatoire; danse = lieu/continu »

**Ce qui tient** [T] :

- AS et ACS ont été conçus pour l'optimisation combinatoire : la phéromone est portée par les arêtes d'un graphe (Dorigo et al. 1996, résumé et Sec. II).
- ABC a été conçu pour l'optimisation numérique (Karaboga 2005, TR06; Karaboga et Basturk 2008).
- La piste chimique marque un trajet (Dorigo et al. 1996, Sec. I).
- Dans ABC, l'information partagée est une **solution complète**, c'est-à-dire une position de source. Cela correspond, en un sens, à « un lieu ».

**Ce qui ne tient pas** [T/R] :

1. **ACO_R** étend ACO au continu « sans changement conceptuel majeur », selon le résumé de Socha et Dorigo 2008. La phéromone y devient une archive de **solutions complètes**, autrement dit de lieux : la piste peut donc encoder des lieux.
2. Il existe des **ABC combinatoires** (CABC, Karaboga et Gorkemli 2011; qCABC, Karaboga et Gorkemli 2019, pour le TSP) et **binaires** (DisABC, Kashan et al. 2012) : la danse peut donc servir des chemins.
3. La « danse » d'ABC **ne code ni direction ni distance**. Elle se réduit à une sélection proportionnelle à la fitness, éq. (1), voire à 0,9·fit/max + 0,1 dans le code. L'observatrice copie les coordonnées complètes de la source, puis la perturbe. Le symbolisme vectoriel de la vraie danse, qui donne à v3 son contraste « scalaire / symbole », disparaît dans l'algorithme.
4. Les auteurs d'ABC eux-mêmes décrivent son opérateur comme une mutation de type DE avec sélection gloutonne (Karaboga et Basturk 2008, Sec. 5) : le mécanisme est générique.

**Reformulation proposée** [I] appuyée par les définitions de Socha et Dorigo 2008 : la différence opérante n'est pas « combinatoire contre continu », mais la **granularité de la mémoire partagée et le mode de génération** :

| Axe | ACO (AS, ACS, ACO_R) | ABC |
|---|---|---|
| Unité mémorisée | Statistiques par **composant** (arête, valeur de variable), agrégées sur toute la population; ACO_R conserve une archive pondérée par rang | **Solution complète** attachée à une ouvrière; compteur trial |
| Génération | **Construction incrémentale** composant par composant (critère définitoire selon Socha et Dorigo) | **Perturbation** d'une solution existante (une dimension, différence avec une autre source) |
| Diffusion | Implicite : chaque fourmi lit l'état agrégé (stigmergie) | Explicite et sélective : les observatrices choisissent une source annoncée, proportionnellement à sa qualité |
| Oubli | Évaporation continue (ρ), ou remplacement des pires dans ACO_R | Abandon discret après `limit` échecs, puis redémarrage aléatoire (éclaireuse) |

Cette reformulation conserve le contraste biologique. La piste est une trace agrégée et persistante dans l'environnement; la danse, un message individuel, éphémère et localisé. Mais elle déplace l'hypothèse testable vers la question pertinente pour l'agentique : **état partagé décomposé contre propositions complètes diffusées**. Le critère C12 la rend falsifiable.

---

## 6. Critique des métaheuristiques à métaphore et conséquences pour le cadrage

**Ce que disent les sources** :

- Sörensen 2015 [R] : la prolifération des méthodes « inspirées de la nature » menace d'éloigner le domaine de la rigueur scientifique.
- Sörensen et al. 2018 [T] : ils placent les fourmis et les abeilles dans la liste des métaphores. Ils jugent la métaphore utile comme source d'inspiration, mais insuffisante pour justifier des choix de conception. Ils renvoient à Sörensen 2015 pour le « metaphor fallacy ». Ils notent toutefois qu'ACO a introduit, avec GRASP, l'idée de mêler l'information déterministe et l'information stochastique et de faire échanger de l'information entre solutions (section « framework »).
- Camacho-Villalón et al. 2023 [R] : six algorithmes « nouveaux » n'apportent que de la terminologie. Dorigo, créateur d'ACO, est coauteur, tout comme d'Aranha et al. 2022 [M].
- Mernik et al. 2015 [R] : comparer en itérations induit en erreur, ABC en particulier.
- Diwold et al. 2011 [non vérifiée] : l'affirmation « ABC se dégrade quand l'optimum n'est pas au centre du domaine » n'a pas pu être vérifiée (résumé masqué, accès fermé); le TLDR de Semantic Scholar ne parle que de l'influence des paramètres et de deux nouvelles variantes de sélection. Ne pas s'y appuyer avant lecture du texte.
- Socha et Dorigo 2008 [T] : recommande, quand c'est possible, l'initialisation asymétrique (*skewed*) et le décompte en évaluations de fonction, mais reprend dans ses propres essais les intervalles d'initialisation des méthodes comparées.

**Conséquences pour P2** (recommandations) :

1. **Présenter chaque algorithme par ses composants.** ACO = construction probabiliste + mémoire de composants + évaporation; ABC = perturbation différentielle sur une dimension + sélection proportionnelle + redémarrage sur échec. Le vocabulaire fourmi et abeille ne sert que d'habillage pédagogique, et un bouton « retirer la métaphore » le montre à l'écran (voir V7).
2. **Prévoir des références non bio-inspirées dans chaque expérience** : plus proche voisin + 2-opt et LK (ou OR-Tools) pour le TSP; DE et CMA-ES pour le continu; recherche aléatoire au même budget.
3. **Fixer un budget égal en évaluations**, documenter le décompte (une évaluation par ouvrière, par observatrice et par éclaireuse) et utiliser une initialisation asymétrique ou décalée. La Griewank de Karaboga et Basturk 2008 est déjà décalée; Rastrigin et Rosenbrock ne le sont pas : ajouter des versions décalées.
4. **Publier les résultats négatifs**, comme la non-reproduction de C3.
5. **Situer le parallèle agentique au niveau des composants** (granularité de la mémoire, oubli, sélection proportionnelle, redémarrage), et non au niveau de l'analogie « fourmis contre abeilles ». C'est précisément la critique de Sörensen appliquée à la thèse du chercheur.
6. **Dans les supports de vulgarisation**, dire explicitement que l'AS n'était pas compétitif face aux heuristiques TSP spécialisées, comme le disent ses auteurs eux-mêmes (Dorigo et al. 1996, note 4 et Sec. VI-A).

---

## 7. Visuels de vulgarisation

| # | Visuel | Contenu | Appui |
|---|---|---|---|
| V1 | **Carte des pistes d'Oliver30** | Arêtes d'épaisseur ∝ τ, animées cycle par cycle; meilleur tour en surimpression; compteur 423,741 / 420 | Reprend la Fig. 6 de Dorigo et al. 1996 (CCA0, épaisseur ∝ piste) |
| V2 | **Arborescence moyenne des nœuds** | Courbe en temps réel; une ligne à 2 marque la stagnation; curseurs α, β, ρ | Fig. 5 et 7 de Dorigo et al. 1996 |
| V3 | **Carte de phase α–β cliquable** | Grille 5×4 de classes G / ∞ / ∅ remplie à mesure que l'utilisateur lance des essais | Fig. 8 de Dorigo et al. 1996 |
| V4 | **Familles d'arêtes de l'ACS** | Barres BE / TE / UE; la mise à jour locale fait « pâlir » une arête à chaque passage (anti-grégarité) | Fig. 4–6 et Sec. IV-A de Dorigo et Gambardella 1997 |
| V5 | **Champ de fleurs ABC** | Contours 2D de Rastrigin ou Rosenbrock; sources en points, halos ∝ trial; histogramme des observatrices par source; éclair quand une éclaireuse est relâchée; curseur `limit` | Karaboga et Basturk 2008, Sec. 3 et Table 5 |
| V6 | **Archive d'ACO_R** | Pour une dimension, k cloches gaussiennes de poids ω_l (rang) et de largeur σ (ξ); curseurs q et ξ | Socha et Dorigo 2008, Fig. 2 et 3, éq. (5)–(9) |
| V7 | **« Retirer la métaphore »** | Bascule qui remplace fourmis et abeilles par les noms neutres des opérateurs (construction, mémoire de composants, perturbation, sélection proportionnelle, redémarrage) | Sörensen 2015; Sörensen et al. 2018 |
| V8 | **Ce que la colonie retient** | Écran partagé sur le même problème discrétisé : matrice de phéromone (ACO) contre liste de solutions complètes (ABC) | Reformulation du §5 [I] |
| V9 | **Budget juste** | Abscisse en évaluations de fonction (non en cycles); trois courbes ACO, ABC et référence (2-opt ou DE) | Mernik et al. 2015; Socha et Dorigo 2008 |

---

## 8. Parallèles agentiques

**Appuyés par des sources** :

- **Stigmergie et état partagé.** Dorigo et al. 2000 définissent la stigmergie comme une communication indirecte par modification de l'environnement (d'après Grassé). Ils introduisent les **variables stigmergiques** : l'information par laquelle les agents communiquent indirectement (p. 853–854). Dorigo et Gambardella 1997 décrivent la phéromone comme une mémoire à long terme distribuée (p. 55). Dans un système multi-agent, cela correspond aux champs d'un état partagé.
- **Tableau noir LLM.** Dans Han et Zhang 2025, les agents sont sélectionnés d'après le contenu du tableau noir, jusqu'à un consensus inscrit au tableau, avec une consommation de jetons moindre. Dans Salemi et al. 2025, un agent central affiche des requêtes et des agents autonomes **se portent volontaires** : c'est un modèle par tirage proche des observatrices qui choisissent une source annoncée. C'est toutefois un hybride, puisque l'émetteur des requêtes reste central. Nakamura et al. 2025 (Terrarium) montre que le tableau noir est une surface d'attaque (empoisonnement de données), ce qui fait le pont avec P6 et l'injection de faux signaux. Pal et al. 2026 décrit des sociétés d'agents LLM qui s'organisent par stigmergie sans rôles assignés.
- **LLM et métaheuristiques.** Dans OPRO (Yang et al. 2023), l'invite contient les solutions précédentes et leurs scores : c'est une **archive de solutions complètes** évaluées, structurellement proche de l'archive d'ACO_R et des sources d'ABC. Dans ReEvo (Ye et al. 2024), le LLM génère les **mesures heuristiques** qu'ACO combine à la phéromone (sec. 5.2) : l'agent fournit η, la colonie fait la recherche. Avec EoH (Liu et al. 2024), ce sont des pistes concrètes pour la synthèse P7.

**Inférences** [I, à tester] :

| Mécanisme de colonie | Analogue agentique proposé | Mode d'échec partagé |
|---|---|---|
| ρ (persistance ou évaporation) | TTL ou décroissance des entrées de l'état partagé | Mémoire trop persistante → verrouillage sur une vieille solution (cf. stagnation) |
| α / β | Poids de l'état partagé face à l'a priori propre de l'agent (le « η » du LLM) | α élevé → grégarité, tous les agents copient l'entrée dominante (∅ de la Fig. 8 de Dorigo et al. 1996) |
| Mise à jour locale de l'ACS | Marquer « en cours » ce qu'un agent explore, pour décourager les doublons | Sans elle, travail redondant |
| `limit` d'ABC | Budget de réessais avant un nouveau plan à partir de zéro | `limit` trop bas → instabilité; infini → acharnement |
| Roulette des observatrices | Allocation de travailleurs proportionnelle au score des propositions affichées | Une proposition surévaluée attire toute la capacité |
| Éclaireuses | Quota d'exploration forcé | Sans éclaireuses, perte de diversité sur les problèmes multimodaux (Table 5 de Karaboga et Basturk 2008) |

**Expérience agentique dérivée** (extension de P2 vers P7, non publiée) : des agents LLM améliorent un tour TSP, à budget de jetons égal, selon deux régimes :

- (a) une **mémoire d'arêtes** partagée, table de scores avec décroissance;
- (b) un **tableau de solutions complètes** avec scores et compteurs d'échecs.

Il faut y ajouter une référence non agentique (2-opt ou LKH) et le décompte des appels comme budget d'évaluations.

---

## 9. Corrections et approximations relevées dans v3

1. **Règle d'évaporation mal attribuée.** v3 écrit « évaporation τ ← (1−ρ)τ + Δτ » en citant Dorigo et al. 1996. Or l'article de 1996 publie τ(t+n) = ρ·τ(t) + Δτ, où ρ est la **persistance** et (1−ρ) l'évaporation (éq. 1; Sec. IV). La forme (1−ρ) avec ρ = évaporation vient de la littérature ultérieure (éq. 4–5 de Dorigo et Gambardella 1997, avec α et ρ; éq. 2 de Socha et Dorigo 2008). Il faut déclarer la convention dans le code, car la Table I utilise ρ = 0,99 pour ant-density et ant-quantity.
2. **Règle de transition incomplète.** « Probabilité ∝ τ^α·η^β » omet la restriction aux villes permises (liste tabou), la définition η = 1/d et le dépôt Δτ^k = Q/L_k (ant-cycle). Le dépôt ne se fait qu'en fin de tour.
3. **« ACO sur Oliver30 » sous-spécifié.** Il faut choisir la variante (AS ant-cycle, Table I de Dorigo et al. 1996; ou ACS, Table I de Dorigo et Gambardella 1997) et préciser les distances (réelles ou entières; 423,741 contre 420). Les coordonnées ne figurent pas dans l'article : elles viennent de Whitley et al. 1989 (réf. [34]) et doivent être fixées dans le dépôt.
4. **Date et contenu d'ABC.** « Karaboga 2005 » est un rapport technique (TR06, octobre 2005) **sans équation algorithmique** (seules les formules des fonctions tests figurent, Table 1; le PDF en ligne a été régénéré en 2010, identité avec l'original non vérifiable), testé sur Sphère 5D, Rosenbrock 2D et Rastrigin 10D (domaine atypique de [−600, 600]). Les équations et la cible « Rastrigin, Rosenbrock » relèvent des articles de Karaboga et Basturk 2007 [non vérifiée] et 2008. La cible documentée lue ici est celle de Karaboga et Basturk 2008 (D = 50; colonie 100; MCN 5000; 30 essais).
5. **La « danse » d'ABC ne porte ni direction ni distance** : c'est une sélection proportionnelle à la fitness. De plus, le code de référence (Sahin 2020) utilise 0,9·fit/max + 0,1 plutôt que fit/Σfit. Le contraste « symbole contre scalaire » de la question transversale de v3 **ne vaut pas pour l'algorithme**.
6. **Rôles d'ABC imprécis.** « Ouvrières, observatrices, éclaireuses » est correct, mais il faut préciser : ouvrières = observatrices = 50 % de la colonie; SN = colonie/2; au plus une éclaireuse par cycle; limit = n_e·D.
7. **Le contraste « piste = chemin (combinatoire), danse = lieu (continu) » est réfuté comme frontière** par ACO_R (Socha et Dorigo 2008), CABC (Karaboga et Gorkemli 2011) et DisABC (Kashan et al. 2012). Il faut le reformuler en granularité de mémoire (§5).
8. **Le visuel « arêtes épaissies par la phéromone » existe déjà** dans Dorigo et al. 1996 (Fig. 6) : le citer comme source.
9. **Le « critère de rigueur » de v3 est incomplet.** Il manque le budget (FE ou tours), le nombre d'essais, le critère d'arrêt, les tolérances, le test statistique et les références non bio-inspirées. Le §4 propose ces éléments.
10. **Le Bees Algorithm (Pham et al. 2006; Pham et Castellani 2009) est absent de v3**, alors qu'il faut le distinguer d'ABC. Son contenu n'est pas vérifié ici.
11. **Asymétrie de v3** : les sources d'ACO sont plus solides et plus anciennes que celles d'ABC. La comparaison doit le signaler. Karaboga et Basturk 2008 compare à des résultats tirés d'un autre article (Krink et al. 2004) au lieu de réimplanter les concurrents, et ses Tables 4 et 5 sont incohérentes entre elles (Rastrigin 50D, colonie de 100; §3.4b).
12. **Affirmation de 1996 non reproduite** : « toujours < 400 cycles » avec e = 8 n'est pas reproduit dans le pilote (3 à 5 essais sur 10). À signaler dans la note de recherche plutôt qu'à reprendre tel quel.

---

## 10. Questions ouvertes

1. **Paramètres et résultats de Karaboga et Basturk 2007 [non vérifiée]** (JOGO) : quelles dimensions (10, 20, 30 ?), quel MCN, quelle colonie ? Il faut un accès Springer pour trancher; la cible C8 en dépend si on veut citer 2007 plutôt que 2008.
2. **Valeur de τ0 = c dans Dorigo et al. 1996** : elle n'est pas publiée. Le pilote montre qu'elle change le taux d'atteinte de l'optimum. Contacter IRIDIA ou consulter Dorigo 1992 (thèse) et Dorigo et Stützle 2004 (livre) pour le réglage d'origine.
3. **Élitisme dans la Table I** : il n'est pas indiqué. Le pilote sans élitisme donne une moyenne plus haute de 0,27 à 0,43; avec e = 8, la moyenne tombe à 423,741. Il est possible que la Table I ait été obtenue avec des fourmis élitistes [I]; seule une source interne pourrait le confirmer.
4. **Certificat d'optimalité d'Oliver30** : lancer Concorde. La valeur 423,741 n'est confirmée ici que par 2-opt multi-départs.
5. **Bees Algorithm** : obtenir le texte de Pham et al. 2006 ou de Pham et Castellani 2009 avant d'en faire une cible.
6. **Texte intégral de Sörensen 2015** (Wiley 403) : il est nécessaire pour citer précisément les « fallacies » dans la note de recherche.
7. **Équivalence du budget agentique** : comment convertir des jetons ou des appels LLM en « évaluations » comparables pour C12 et pour l'expérience agentique du §8 ?
8. **Sélection d'ABC** : roulette ou 0,9/0,1 ? Le pilote (§4.1) ne montre pas d'écart significatif sur la Table 3 de Karaboga et Basturk 2008. Il reste à vérifier si l'écart apparaît en petite colonie (Table 5) ou sur des optimums décalés.

**Fichiers de vérification** (dans `scratchpad/p2src/`) :

- `oliver30_check.py` : recalcul de l'optimum d'Oliver30, avec un `assert`.
- `as_oliver30_pilot.py` : pilote AS (arguments : τ0, e, essais, NC_MAX).
- `abc_pilot.py` : pilote ABC (Karaboga et Basturk 2008) (arguments : fonction, essais, MCN, sélection).
- Textes extraits des sources : `as1996.txt`, `acs1997.txt`, `acor2008.txt`, `abc_tr06.txt`, `abc2008.txt`, `history.txt`, `stig2000.txt`.

---

## 11. Historique de vérification

**Vérification indépendante du 2026-10-01** (rapport : `recherche/verifications/p2-optimisation.md`) : sur 31 références, 23 confirmées, 5 corrigées (Socha et Dorigo 2008, Karaboga 2005, Sahin 2020, Sörensen et al. 2018, Liu et al. 2024), 3 non vérifiables (Karaboga et Basturk 2007, Karaboga et Akay 2009, Diwold et al. 2011); aucune fausse. Tous les résultats cibles C1 à C11 figurent dans leurs sources.

**Corrections appliquées (consolidation du 2026-10-01)** :

1. **Code de référence ABC** (§3.4c, synthèse 5) : NumberOfPopulation désigne la taille de colonie (`Config.py` : FOOD_NUMBER = NumberOfPopulation / 2), donc SN = 25 et Limit = 1500 = 2·SN·D, le double de la règle de 2008. L'[I] antérieure (limit = SN·D) est réfutée. L'auteur du fichier est Omur Sahin, non l'auteur d'ABC (étiquette Sahin 2020).
2. **Karaboga 2005** (§3.4a, §9.4, synthèse 5) : « ni formule » remplacé par « aucune équation algorithmique »; les formules des fonctions tests figurent aux p. 7–8. PDF en ligne régénéré en 2010.
3. **Socha et Dorigo 2008** (§3.3, §6) : q = 0,1 vaut pour toute la Sec. 5.2, non pour les seules multimodales; l'initialisation *skewed* est recommandée mais l'article reprend les intervalles des méthodes comparées.
4. **C9** (§3.4b, §4, §9.11) : budget fixé à 100 000 évaluations; l'incohérence oppose les Tables 4 et 5, non la note de la Table 5 au texte; valeurs de la Table 5 ajoutées.
5. **Diwold et al. 2011** (§4.1, §6) : l'affirmation sur l'optimum décentré est marquée [non vérifiée].
6. **Versions publiées ajoutées** : Liu et al. 2024 (ICML 2024, PMLR 235, 32201–32223) et Sörensen et al. 2018 (p. 791–808, DOI 10.1007/978-3-319-07124-4_4).
7. **Synthèse 2** : Dorigo et Gambardella 1997 nomme α la décroissance de l'AS; Socha et Dorigo 2008 pondère Δτ par ρ; la forme exacte de v3 n'apparaît dans aucun des deux.
8. **Paramètres** (§3.1, C2, C3, synthèse 4) : Q = 100 est absent de la Table I; e = 8 est cité en exemple (« for instance ») et le nombre d'essais n'est pas précisé (Sec. VI-A, p. 17).
9. **Références** : pagination officielle de Dorigo et al. 1996 (29–41); URL de l'ULB pour Dorigo et Gambardella 1997; Aranha et al. 2022 en 16(1); liste des comparateurs de Karaboga et Basturk 2007 non vérifiée (retirée); résumé de Karaboga et Akay 2009 non reconfirmé; Goldberg 1989 pour la citation [26] de la Table 3 de Karaboga et Basturk 2008; auteurs complets des préimpressions (API arXiv).
10. **Forme** : étiquettes « Nom année »; légende alignée sur celle du programme ([T], [R], [M], [S], [I]); colonne « Statut » en vérifiée, corrigée ou non vérifiée.

**Relu à la source par le consolidateur** (2026-10-01, texte de Socha et Dorigo 2008 et postprint de Dorigo et al. 1996) : les points 3 et 8 ci-dessus confirmés. Ajout propre à la consolidation : en C5, la phrase « 8–16 fourmis » de Dorigo et al. 1996 concerne le graphe aléatoire de 16 villes; le minimum sur la grille 4×4 est marqué [à confirmer].

**Réserves restantes** :

- Karaboga et Basturk 2007, Karaboga et Akay 2009 et Diwold et al. 2011 : [non vérifiée] (accès fermé). Les équations canoniques d'ABC (§3.4c) reposent sur Sahin 2020 et sur les éq. (1)–(2) de Karaboga et Basturk 2008, non sur ces articles.
- Karaboga 2005 : identité du PDF en ligne (régénéré en 2010) avec l'original de 2005 [à confirmer].
- Whitley et al. 1989 : pagination non vérifiée [à confirmer].
- Origine de la forme τ ← (1−ρ)τ + Δτ de v3 : Dorigo et Stützle 2004 non lu [à confirmer].
- Cause de l'écart entre les Tables 4 et 5 de Karaboga et Basturk 2008 [à confirmer].
- Minimum des one-ant cycles de la Fig. 13 (C5) [à confirmer].
- Les résultats [PILOTE] n'ont pas été relancés par la vérification indépendante.

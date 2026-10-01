# Dossier P7 — Synthèse fourmi / abeille / agent LLM

Dossier documentaire du Projet 7 (proposition v3). Rédigé le 2026-10-01. Régime : exploratoire (dossier de recherche); le plan factoriel est chiffré pour décision, pas encore pré-enregistré.

**Statut : consolidé après vérification indépendante, 2026-10-01.** Rapport : `recherche/verifications/p7-agents-llm.md`.

**Légende de vérification**
- **[T]** texte intégral consulté (HTML arXiv/ar5iv ou PDF) : paramètres et emplacements transcrits.
- **[R]** résumé consulté (page éditeur, arXiv, Europe PMC) : seules les affirmations du résumé sont tenues pour vérifiées.
- **[M]** métadonnées seulement (Crossref) : existence, DOI, pagination; contenu non lu.
- **[I]** (écrit aussi « inférence ») : déduction ou calcul de l'auteur du dossier, non lu dans une source.
- **[non vérifiée]** : référence dont le contenu n'a pas pu être vérifié de façon indépendante; **[à confirmer]** : valeur non confirmée.
- Les extractions de texte passent par un outil de lecture automatique (WebFetch); les chiffres clés ont été recoupés par une seconde requête quand c'était possible. Un chiffre marqué « [à confirmer] » provient d'une seule extraction, d'extractions discordantes ou d'une valeur non confirmée par la vérification indépendante. Les références sont nommées par leur étiquette normalisée « Nom année » (§3).

**Obstacle** : le quota de recherche Web de la session s'est épuisé en cours de travail; la suite s'est faite par lecture directe d'URL (arXiv, Crossref, Europe PMC, sites de spécifications). Quelques vérifications restent donc ouvertes (section 12).

---

## 1. Constats principaux

1. **v3 se trompe en disant que P7 n'a « aucun résultat publié à reproduire ».** Au moins quatre résultats publiés avec des agents LLM peuvent servir d'ancrage : la convention émergente du *naming game* (Ashery et al. 2025), le gain du débat (Du et al. 2024) et sa remise en cause (Choi et al. 2025), la mise à l'échelle par vote (Li et al. 2024), et un ACO piloté par LLM sur un réseau à deux chemins (Rahman et al. 2025). P7 peut donc respecter le critère de rigueur du programme.
2. **L'hypothèse « signal plus riche ⇒ gain collectif plus grand » est contestée.** Choi et al. 2025 montrent que le vote majoritaire explique l'essentiel du gain attribué au débat, et que la discussion forme une martingale. Zhang et al. 2025 trouvent que le débat bat rarement *Chain-of-Thought* ou *Self-Consistency*. Chen et al. 2024a observent un gain non monotone en nombre d'appels. Le gain doit donc se mesurer, pas se présumer.
3. **Les erreurs des LLM sont corrélées.** D'après Kim et al. 2025, quand deux modèles se trompent, ils choisissent la même mauvaise réponse dans environ 60 % des cas sur HELM, contre 33 % au hasard, et cette corrélation croît avec la précision des modèles. Chen 2026 borne le gain de tout vote ou routage par 1 − β, où β est le taux d'échec simultané. La « diversité » d'une population LLM est donc faible par construction; c'est un parallèle direct avec la diversité des seuils chez la fourmi et l'abeille.
4. **Ni A2A ni MCP n'offrent de chorégraphie native.** A2A 1.0 est un protocole client → agent distant, fondé sur des tâches. MCP (révision 2026-07-28) relie un client à des serveurs d'outils et de ressources, et devient sans état. Une stigmergie entre agents LLM exige un substrat partagé ajouté au-dessus de ces protocoles (inférence appuyée par les spécifications lues).
5. **La grille 2 × 4 de v3 ne contrôle ni l'orchestration ni l'absence d'interaction.** Il faut deux bras de plus : un orchestrateur central et des agents indépendants agrégés par vote. Le facteur « capacité » confond aussi plusieurs choses : le raisonnement (impossible à désactiver sur Opus 5.5), l'échantillonnage (température réglable seulement sur Haiku 4.5), la génération du modèle et le coût.

---

## 2. Corrections et approximations de v3

| # | Passage v3 | Problème | Correction proposée | Appui |
|---|---|---|---|---|
| C1 | P7 « seul projet sans résultat publié à reproduire » | Faux : il existe des résultats LLM-MAS reproductibles | Phase d'ancrage : *naming game*, débat contre vote, vote selon N, LLM-ACO à deux chemins | Ashery et al. 2025 [T]; Du et al. 2024 [T]; Choi et al. 2025 [T]; Li et al. 2024 [T]; Rahman et al. 2025 [T] |
| C2 | Grille « 2 × 4 » (piste/danse × règle/Haiku/Sonnet/Opus) | Il manque le témoin d'orchestration (la thèse oppose chorégraphie et orchestration) et le témoin sans interaction | Grille 4 × 4 : piste, danse, orchestrateur, indépendants + vote | Choi et al. 2025 [T]; Kapoor et al. 2025 [R]; Hadfield et al. 2025 [T] (orchestrateur-travailleurs) |
| C3 | Capacité = « règle simple, Haiku, Sonnet, Opus » | Facteur confondu : raisonnement non désactivable sur Opus 5.5; température rejetée (400) sur Opus 5.5 et Fable 5.1, valeurs non par défaut rejetées sur Sonnet 5.5; effort par défaut `medium` sur Opus 5.5 contre `high` ailleurs; Haiku 4.5 est d'une génération antérieure (contexte de 200 K) | Fixer l'effort explicitement, journaliser `usage`, traiter « capacité » comme un paquet (modèle + raisonnement), donner les identifiants exacts | Anthropic 2026 (skill `claude-api`, cache 2026-09-25) |
| C4 | « Courbe du gain collectif selon la richesse du signal » | Présume un axe continu et une relation monotone; or fourmi, abeille et LLM diffèrent par bien plus que le signal | Manipuler la richesse **à modèle constant** (échelle L0–L3, §8) et tracer un graphe catégoriel avec IC | Choi et al. 2025; Chen et al. 2024a [R]; Li et al. 2026 [R] |
| C5 | « Canal fourmi : intensité (scalaire) »; « Freinage fourmi : absence de retours » | Approximation : les réseaux de pistes portent une polarité par leur géométrie, et il existe un signal phéromonal répulsif « *no entry* » (freinage actif) | Décrire la piste comme un champ multi-signal (attractif, répulsif, géométrie); à confirmer avec le dossier fourmis | Jackson et al. 2004 [R partiel]; Robinson et al. 2005 [R partiel] |
| C6 | « Contenu du signal abeille : symbolique » | Contestable (inférence) : la danse code direction et distance de façon analogique (angle → azimut, durée → distance), avec dispersion mesurable; « symbolique » au sens sémiotique est discutable | Dire « vectoriel analogique bruité (≈ 2 dimensions) »; à trancher avec le dossier abeilles | Haldane et Spurway 1954 [M] (contenu non lu) |
| C7 | Colonne agentique « état partagé (journal d'événements) vs diffusion (pub/sub) » | A2A et MCP ne fournissent ni l'un ni l'autre entre pairs : A2A = tâches client → agent distant (sondage, flux, *push*); MCP = client ↔ serveur | Préciser que le substrat chorégraphique (tableau noir, bus d'événements) s'ajoute aux protocoles; voir §9 | A2A 2026a [T]; MCP 2026 [T] |
| C8 | « Oubli : TTL vs expiration des messages » | Correct, et désormais concret : MCP 2026-07-28 impose `ttlMs` sur les résultats de liste et de lecture de ressources (indice de fraîcheur) | Citer `ttlMs` comme analogue d'évaporation, en notant qu'il s'agit d'un indice de cache et non d'un déclin d'intensité | MCP 2026 [T] |
| C9 | P3 agentique : « agents identiques réagissent en même temps et oscillent; la diversité stabilise » | Non documenté tel quel pour des agents LLM dans les sources lues; seuls les ingrédients le sont : erreurs corrélées, biais collectif, différenciation par personas | Formuler comme hypothèse H4 et la tester dans S3 | Kim et al. 2025 [T]; Ashery et al. 2025 [T]; Riedl 2026 [T] |
| C10 | P7 technique : « script Node appelant l'API Claude et rejouant les journaux » | Incomplet : sans journal de `model`, `usage`, `stop_reason`, le rejeu ne vaut rien; les *fallbacks* côté serveur (recommandés par défaut sur Opus 5.5, Sonnet 5.5 et Fable 5.1) **changent de modèle** en cours d'expérience | Désactiver les *fallbacks* dans les expériences; compter les refus comme une issue; rejeu = réexécuter l'environnement déterministe à partir des sorties LLM journalisées, sans rappeler l'API | Anthropic 2026; Atil et al. 2024 [R] |
| C11 | « Règle simple » | Ambigu | La « règle » est le **modèle biologique publié** de chaque scénario (fonction de choix de Deneubourg, seuils de réponse, quorum), exécuté dans le même environnement que les LLM | (inférence; cohérent avec le critère de rigueur v3) |
| C12 | Échelle implicite | Une colonie compte 10³–10⁶ individus; un essaim LLM en compte 10–25 au plus. Park et al. 2023 parlent de « milliers de dollars » pour 25 agents pendant deux jours de jeu; les Boids LLM sont environ 300 fois plus lents | Exécuter les agents à règle à N = 10 (apparié) **et** à N biologique, pour séparer l'effet d'échelle de l'effet de mécanisme | Park et al. 2023 [T]; Rahman et al. 2025 [T] |
| C13 | Coût et durée absents de v3 | — | Plan chiffré au §8 (≈ 3 250 $ US standard, ≈ 1 620 $ US en lot, hors imprévus) | Calcul §8 |

Note mémoire du chercheur : « A2A 1.0 seul recensé officiellement » est dépassé. A2A en est à v1.0.1 (correctif du 2026-05-28), mais la page de spécification affiche encore « 1.0.0 »; voir §9.

---

## 3. Références

Étiquette normalisée « Nom année » : nom du premier auteur sans particule; deux auteurs « X et Y »; trois ou plus « X et al. »; organisation = sigle; suffixe a, b seulement si deux œuvres du dossier donnent la même étiquette. **Lecture** : niveau de la légende. **Vérification** : verdict de la vérification indépendante du 2026-10-01 (vérifiée, corrigée, non vérifiée). Les DOI arXiv suivent la forme `10.48550/arXiv.<id>`.

### 3.1 Systèmes multi-agents LLM : fondements

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Park et al. 2023 | Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., Bernstein, M. S. (2023). *Generative Agents: Interactive Simulacra of Human Behavior*. UIST '23, ACM, p. 1–22. | 10.1145/3586183.3606763; arXiv:2304.03442 | [T] | vérifiée | §4.1, §4.2, §6.4, §7.1.2, §8.2 (ar5iv) |
| Du et al. 2024 | Du, Y., Li, S., Torralba, A., Tenenbaum, J. B., Mordatch, I. (2024). *Improving Factuality and Reasoning in Language Models through Multiagent Debate*. ICML 2024, PMLR 235:11733–11763. | arXiv:2305.14325; https://proceedings.mlr.press/v235/du24e.html | [T] | corrigée | §3.1, §3.2, tableaux 1–2, fig. 3, fig. 10–11 |
| Li et al. 2024 | Li, J., Zhang, Q., Yu, Y., Fu, Q., Ye, D. (2024). *More Agents Is All You Need*. Transactions on Machine Learning Research. | arXiv:2402.05120 | [T] | vérifiée | §3, §5 (tableau 2), §6, fig. 1 |
| Wang et al. 2023 | Wang, X., Wei, J., Schuurmans, D., Le, Q., Chi, E., Narang, S., Chowdhery, A., Zhou, D. (2023). *Self-Consistency Improves Chain of Thought Reasoning in Language Models*. ICLR 2023. | arXiv:2203.11171 | [R] | vérifiée | Résumé (GSM8K +17,9 %) |
| Liang et al. 2024 | Liang, T., He, Z., Jiao, W., Wang, X., Wang, Y., Wang, R., Yang, Y., Shi, S., Tu, Z. (2024). *Encouraging Divergent Thinking in Large Language Models through Multi-Agent Debate*. EMNLP 2024. | arXiv:2305.19118 | [R] | vérifiée | Résumé (*Degeneration-of-Thought*) |
| Qian et al. 2025 | Qian, C., Xie, Z., Wang, Y., Liu, W., Zhu, K., Xia, H., Dang, Y., Du, Z., Chen, W., Yang, C., Liu, Z., Sun, M. (2025). *Scaling Large Language Model-based Multi-Agent Collaboration*. ICLR 2025. | arXiv:2406.07155 | [R] | vérifiée | Résumé (MacNet, loi logistique) |
| Tran et al. 2025 | Tran, K.-T., Dao, D., Nguyen, M.-D., Pham, Q.-V., O'Sullivan, B., Nguyen, H. D. (2025). *Multi-Agent Collaboration Mechanisms: A Survey of LLMs*. Prépublication. | arXiv:2501.06322 | [R] | vérifiée | Résumé (structures pair-à-pair / centralisée / distribuée) |
| Hadfield et al. 2025 | Hadfield, J., Zhang, B., Lien, K., Scholz, F., Fox, J., Ford, D. (2025-06-13). *How we built our multi-agent research system*. Anthropic Engineering. | https://www.anthropic.com/engineering/multi-agent-research-system | [T] | vérifiée | Billet complet |

### 3.2 Débat, vote, gain collectif, mise à l'échelle

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Choi et al. 2025 | Choi, H. K., Zhu, X., Li, S. (2025). *Debate or Vote: Which Yields Better Decisions in Multi-Agent Large Language Models?* NeurIPS 2025 (*spotlight*). | arXiv:2508.17536 | [T] | vérifiée | Déf. 1–2, théorème 2, tableaux 1, 2, 4 |
| Zhang et al. 2025 | Zhang, H., Cui, Z., Chen, J., Wang, X., Zhang, Q., Wang, Z., Wu, D., Hu, S. (2025). *Stop Overvaluing Multi-Agent Debate — We Must Rethink Evaluation and Embrace Model Heterogeneity*. Prise de position, prépublication. | arXiv:2502.08788 | [R] | vérifiée | Résumé |
| Chen et al. 2024a | Chen, L., Davis, J. Q., Hanin, B., Bailis, P., Stoica, I., Zaharia, M., Zou, J. (2024). *Are More LLM Calls All You Need? Towards the Scaling Properties of Compound AI Systems*. NeurIPS 2024 (*Thirty-Eighth Annual Conference on Neural Information Processing Systems*). | arXiv:2403.02419 (titre de la v1 : *… Towards Scaling Laws of Compound Inference Systems*); https://openreview.net/forum?id=m5106RRLgx | [R] | corrigée | Résumé arXiv (non-monotonie); titre et venue publiés : métadonnées OpenReview [M] |
| Li et al. 2026 | Li, J., Gu, Z., Cai, Y., Feng, H. (2026). *Scaling Behavior of Single LLM-Driven Multi-Agent Systems*. Prépublication. | arXiv:2606.00655 | [R] | vérifiée | Résumé |
| Hegazy 2024 | Hegazy, M. (2024). *Diversity of Thought Elicits Stronger Reasoning Capabilities in Multi-Agent Debate Frameworks*. J. Robotics and Automation Research 5(3):1–10. | arXiv:2410.12853 | [R] | vérifiée | Résumé; **revue de faible notoriété, poids faible** |
| Schoenegger et al. 2024 | Schoenegger, P., Tuminauskaite, I., Park, P. S., Bastos, R. V. S., Tetlock, P. E. (2024). *Wisdom of the silicon crowd: LLM ensemble prediction capabilities rival human crowd accuracy*. Science Advances 10(45):eadp1528. | 10.1126/sciadv.adp1528 | [R] | vérifiée | Résumé (Europe PMC) |
| Bahrami et al. 2010 | Bahrami, B., Olsen, K., Latham, P. E., Roepstorff, A., Rees, G., Frith, C. D. (2010). *Optimally interacting minds*. Science 329(5995):1081–1085. | 10.1126/science.1185718; PMID 20798320 | [R] | vérifiée | Résumé (Europe PMC); définition s_dyade/s_max **non lue** |
| Riedl 2026 | Riedl, C. (2026). *Emergent Coordination in Multi-Agent Language Models*. ICLR 2026. | arXiv:2510.05174 | [T] | vérifiée | §2 (*Method*), §4.1, §4.2 |

### 3.3 Erreurs corrélées, homogénéité, monoculture

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Kim et al. 2025 | Kim, E., Garg, A., Peng, K., Garg, N. (2025). *Correlated Errors in Large Language Models*. ICML 2025. | arXiv:2506.07962 | [T] | vérifiée | Définition de la métrique, tableau 1, fig. 1–5 |
| Chen 2026 | Chen, J. (2026). *When Does Combining Language Models Help? A Co-Failure Ceiling on Routing, Voting, and Mixture-of-Agents Across 67 Frontier Models*. Prépublication. | arXiv:2606.27288 | [R] | vérifiée | Résumé (auteur : Josef Chen) |
| Kim 2026 | Kim, D. (2026). *Are Diversity Metrics Measuring Diversity? A Capability-Controlled Audit of Majority-Vote Gain in LLM Ensembles*. Prépublication. | arXiv:2607.20768 | [R] | vérifiée | Résumé (auteur : Donghwan Kim) |
| Kleinberg et Raghavan 2021 | Kleinberg, J., Raghavan, M. (2021). *Algorithmic monoculture and social welfare*. PNAS 118(22):e2018340118. | 10.1073/pnas.2018340118 | [R] | vérifiée | Résumé (Europe PMC) |
| Weng et al. 2025 | Weng, Z., Chen, G., Wang, W. (2025). *Do as We Do, Not as You Think: the Conformity of Large Language Models*. ICLR 2025 (oral). | arXiv:2501.13381 | [R] | vérifiée | Résumé (BenchForm) |
| Ashery et al. 2025 | Flint Ashery, A., Aiello, L. M., Baronchelli, A. (2025). *Emergent social conventions and collective bias in LLM populations*. Science Advances 11:eadu9368. | 10.1126/sciadv.adu9368; arXiv:2410.08948 | [T] | corrigée | Version arXiv v2 : Résultats, fig. 1–3, tableau 1, MS (page Science : 403) |

### 3.4 Stigmergie, tableaux noirs, essaims d'agents LLM

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Han et Zhang 2025 | Han, B., Zhang, S. (2025). *Exploring Advanced LLM Multi-Agent Systems Based on Blackboard Architecture*. Prépublication. | arXiv:2507.01701 | [R] | vérifiée | Résumé |
| Salemi et al. 2025 | Salemi, A., Parmar, M., Goyal, P., Song, Y., Yoon, J., Zamani, H., Pfister, T., Palangi, H. (2025, rév. 2026-01-31). *LLM-Based Multi-Agent Blackboard System for Information Discovery in Data Science*. Prépublication. | arXiv:2510.01285 | [R] | vérifiée | Résumé |
| Mao et Mirhoseini 2026 | Mao, Y., Mirhoseini, A. (2026). *Decentralized Multi-Agent Systems with Shared Context*. Prépublication. | arXiv:2606.10662 | [R] | corrigée | Résumé (jusqu'à +10,5 points; environ −50 % de coût) |
| Pal et al. 2026 | Pal, S., Wang, F. Y., Buehler, M. J. (2026). *SwarmWorld: Stigmergic technological evolution in societies of language-model agents*. Prépublication. | arXiv:2608.26081 | [R] | vérifiée | Résumé |
| Rahman et al. 2025 | Rahman, M. A. U., Schranz, M., Hayat, S. (2025, v3 2026-08-27). *LLM-Powered Swarms: A New Frontier or a Conceptual Stretch?* Soumis à IEEE Intelligent Systems. | arXiv:2506.14496 | [T] | vérifiée | §IV-B, §V-A, §V-B, fig. 2, tableau II |
| Khushiyant 2025 | Khushiyant (2025). *Emergent Collective Memory in Decentralized Multi-Agent AI Systems*. Prépublication à auteur unique. | arXiv:2512.10166 | [R] | non vérifiée | Résumé; l'architecture des agents n'y est pas précisée (« agents non LLM » non confirmé) [non vérifiée]; **écarté du cœur du dossier** |

### 3.5 Échecs et sécurité des systèmes multi-agents

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Cemri et al. 2025 | Cemri, M., Pan, M. Z., Yang, S., Agrawal, L. A., Chopra, B., Tiwari, R., Keutzer, K., Parameswaran, A., Klein, D., Ramchandran, K., Zaharia, M., Gonzalez, J. E., Stoica, I. (2025). *Why Do Multi-Agent LLM Systems Fail?* NeurIPS 2025, Datasets and Benchmarks Track (*spotlight*). | arXiv:2503.13657; PDF des actes NeurIPS 2025 | [T] | corrigée | PDF des actes (pied de page confirmé), §4, §5.1–5.3, fig. 1, fig. 4, annexe A; HTML v3 (prévalences par mode, 1 642 traces) |
| Lee et Tiwari 2024 | Lee, D., Tiwari, M. (2024). *Prompt Infection: LLM-to-LLM Prompt Injection within Multi-Agent Systems*. Prépublication. | arXiv:2410.07283 | [R] | vérifiée | Résumé |

### 3.6 Méthodologie d'évaluation

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Miller 2024 | Miller, E. (2024). *Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations*. Prépublication. | arXiv:2411.00640 | [T] | corrigée | Formules et recommandations |
| Kapoor et al. 2025 | Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., Narayanan, A. (2025). *AI Agents That Matter*. Transactions on Machine Learning Research (publié le 2025-06-13). | arXiv:2407.01502; https://openreview.net/forum?id=Zy4uFzMviZ | [R] | corrigée | Résumé; venue TMLR selon OpenReview (`Zy4uFzMviZ`) |
| Atil et al. 2024 | Atil, B., Aykent, S., Chittams, A., Fu, L., Passonneau, R. J., Radcliffe, E., Rajagopal, G. R., Sloan, A., Tudrej, T., Ture, F., Wu, Z., Xu, L., Baldwin, B. (2024, v5 2025-04-02). *Non-Determinism of "Deterministic" LLM Settings*. Prépublication. | arXiv:2408.04667 | [R] | vérifiée | Résumé |
| Chen et al. 2024b | Chen, L., Zaharia, M., Zou, J. (2024). *How Is ChatGPT's Behavior Changing Over Time?* Harvard Data Science Review 6(2). | 10.1162/99608f92.5317da47; arXiv:2307.09009 | [R] | vérifiée | Résumé arXiv + métadonnées Crossref |
| Yao et al. 2024 | Yao, S., Shinn, N., Razavi, P., Narasimhan, K. (2024). *τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains*. Prépublication. | arXiv:2406.12045 | [T] | vérifiée | §3 (définition de pass^k) |

### 3.7 Protocoles et plateforme

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| MCP 2026 | Model Context Protocol (2026). *Specification 2026-07-28 — Key Changes*. | https://modelcontextprotocol.io/specification/2026-07-28/changelog | [T] | vérifiée | Changelog complet (révision marquée *Current*) |
| MCP 2025 | MCP Blog (2025-12-09). *MCP joins the Agentic AI Foundation*. | https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ | [T] | vérifiée | Billet |
| A2A 2026a | A2A Project (2026, année déduite des versions GitHub). *A2A Protocol Specification* (« Latest Released Version 1.0.0 »). | https://a2a-protocol.org/latest/specification/ | [T] | vérifiée | Page (lecture outillée) |
| A2A 2026b | A2A Project (2026, année déduite de l'ordre des versions). *Releases* (v1.0.0 du 2026-03-12; v1.0.1 du 2026-05-28). | https://github.com/a2aproject/A2A/releases | [T] | vérifiée | Liste des versions (GitHub omet l'année) |
| Anthropic 2026 | Anthropic (2026). Skill `claude-api`, tableau *Current Models* (cache du 2026-09-25) et guides de migration. Document local. | (local) | [T] | vérifiée | Identifiants, tarifs, contraintes d'API; contrôlé contre le même skill local, non contre la documentation en ligne |

### 3.8 Appuis biologiques cités pour les corrections (hors cœur P7)

| Étiquette | Référence complète | DOI / URL | Lecture | Vérification | Ce qui a été lu |
|---|---|---|---|---|---|
| Jackson et al. 2004 | Jackson, D. E., Holcombe, M., Ratnieks, F. L. W. (2004). *Trail geometry gives polarity to ant foraging networks*. Nature 432(7019):907–909. | 10.1038/nature03105 | [R partiel] | vérifiée | Première phrase du résumé |
| Robinson et al. 2005 | Robinson, E. J. H., Jackson, D. E., Holcombe, M., Ratnieks, F. L. W. (2005). *'No entry' signal in ant foraging*. Nature 438(7067):442. | 10.1038/438442a | [R partiel] | vérifiée | Résumé (signal « no entry », *Monomorium pharaonis*) |
| Haldane et Spurway 1954 | Haldane, J. B. S., Spurway, H. (1954). *A statistical analysis of communication in "Apis mellifera" and a comparison with communication in other animals*. Insectes Sociaux 1(3):247–283. | 10.1007/BF02222949 | [M] | vérifiée | Métadonnées seulement (contenu non lu) |

---

## 4. Modèles et paramètres publiés

### M1 — Generative Agents (Park et al. 2023, [T])
- **Récupération de mémoire** (§4.1) : `score = α_recency·recency + α_importance·importance + α_relevance·relevance`, avec α = 1 pour les trois termes. Chaque terme est normalisé dans [0, 1] par min-max.
  - *Recency* : décroissance exponentielle « over the number of sandbox game hours since the memory was last retrieved », facteur 0,995.
  - *Importance* : note de 1 (banal) à 10 (marquant), attribuée par le LLM.
  - *Relevance* : similarité cosinus entre plongements (*embeddings*).
- **Réflexion** (§4.2) : déclenchée quand la somme des importances des événements récents dépasse 150, soit 2 à 3 fois par jour simulé.
- **Cadre** : 25 agents, 2 jours de jeu, `gpt3.5-turbo`; « milliers de dollars » de jetons (§8.2) et plusieurs jours de calcul.

### M2 — Débat multi-agents (Du et al. 2024, [T])
- **Procédure** (§2–3) : chaque agent répond seul, puis reçoit à chaque ronde les réponses des autres. Prompt GSM8K verbatim : « These are the solutions to the problem from other agents: … Using the solutions from other agents as additional information, can you provide your answer to the math problem? ». Variante la plus proche, le prompt « Short » de la fig. 3 : « Based off the opinion of other agents, can you give an updated response ». La population « almost always converges » vers une réponse commune; l'absence de vote final n'est pas énoncée explicitement dans le texte [à confirmer].
- **Paramètres** : « Multi-agent results in the table are run with 3 agents and two rounds of debate » (note du tableau 1); modèle `gpt-3.5-turbo-0301`. Gain croissant avec le nombre d'agents (fig. 10a) et de rondes jusqu'à environ 4 (fig. 10b).

### M3 — Échantillonnage et vote, « Agent Forest » (Li et al. 2024, [T])
- **§3** : on tire N réponses, sᵢ = ℳ(x); on calcule V(sᵢ) = Σ_{j≠i} sim(sᵢ, sⱼ) et on retient A = argmax_{sᵢ} V(sᵢ).
  - *sim* = fréquence d'occurrence pour les tâches fermées, BLEU pour la génération ouverte.
- **Réglages** : T = 1,0, top-p = 1,0; N jusqu'à 40 (10 pour le débat); fig. 1 : taille d'ensemble jusqu'à 15 (« ensemble size scales up to 15 »).

### M4 — Débat comme processus de Dirichlet composé (Choi et al. 2025, [T])
- **Déf. 1** : θ_{i,t} ~ Dir(α_{i,t}), puis y_{i,t} ~ Cat(θ_{i,t}).
- **Déf. 2** (mise à jour bayésienne) : α_{i,t} = α_{i,t−1} + c_{i,t}, où c_{i,t} compte les réponses des voisins.
- **Théorème 2** : si (1/|N(i)|) Σ_{j∈N(i)} p_{j,t−1} = p_{i,t−1}, alors E[p_{i,t} | α_{t−1}] = p_{i,t−1}. La suite {p_{i,t}} est une martingale : la discussion seule n'améliore pas la justesse espérée.
- **Cadre** : N = 5, T ∈ {2, 3, 5}, Qwen2.5-7B/32B et Llama3.1-8B, 7 bancs d'essai.

### M5 — *Naming game* LLM (Ashery et al. 2025, [T], version arXiv v2)
- **Protocole** (Résultats; légende de la fig. 1) : N = 24 agents, réservoir de W = 10 noms (W = 2 pour le biais et la masse critique), mémoire H = 5 interactions.
  - Gain de +100 si coordination, −50 sinon; une paire tirée au hasard à chaque pas.
  - Bascule de consensus : 95 % de succès sur les 3N dernières interactions (MS).
  - Modèles : Llama-3-70B-Instruct, Llama-3.1-70B-Instruct, Llama-2-70b-Chat (4 bits), Claude-3.5-Sonnet.
- **Masse critique** (fig. 3) : N = 48 et H = 3 pour Llama-3-70B-Instruct; valeurs par modèle à la fig. 3B (en pourcentages) et au tableau S3 (en effectifs d'agents); 10 exécutions par expérience (3 pour Llama-3-70B). Les courbes de la fig. 1 sont des moyennes sur 40 exécutions; la fig. 2 repose sur 40, 27 ou 20 exécutions selon le modèle.

### M6 — Mesures d'émergence (Riedl 2026, [T])
- **Emplacements** : interventions au §2 (*Method*), capacité d'émergence au §4.1, I₃ au §4.2.
- **Décomposition PID** : I({X_{i,t}, X_{j,t}}; T_{ij,t+ℓ}) = UI_i + UI_j + Red_{ij} + Syn_{ij}.
- **Critère pratique** : S_macro(ℓ) = I(V_t; V_{t+ℓ}) − Σ_{k=1}^{n} I(X_{k,t}; V_{t+ℓ}).
- **Test de coalition** : G₃ = I₃ − max(I₂{1,2}, I₂{1,3}, I₂{2,3}).
- **Cadre** : jeu de devinette collective, N = 10, rétroaction de groupe seulement (« trop haut / trop bas »), aucune communication; GPT-4.1 (2025-04-14); 200 expériences par condition (simple, persona, théorie de l'esprit); la condition de théorie de l'esprit inclut la persona (annexe A.1).

### M7 — Accord sur les erreurs (Kim et al. 2025, [T])
- **Métrique** : taux d'accord d'une paire de modèles **conditionnel au fait que les deux se trompent** (QCM). Hasard : 1/3 sur HELM, ≈ 0,127 sur HuggingFace.
- **Régression** (tableau 1, coefficients standardisés) : même fournisseur +0,066 (HF) / +0,022 (HELM); même architecture +0,076 (HF); précision de chaque modèle et leur interaction positives; R² = 0,340 (HF), 0,613 (HELM), 0,415 (*Resumes*).

### M8 — Plafond de co-échec (Chen 2026, [R])
- Toute politique qui renvoie la réponse d'un membre (vote, routeur, cascade) vérifie : précision ≤ 1 − β, où β = P(tous les modèles se trompent sur la même question).

### M9 — Statistique d'évaluation (Miller 2024, [T]; numéros de formule tels qu'extraits)
- **(1)** SE = √(Var(s)/n); IC à 95 % = s̄ ± 1,96·SE.
- **(2)** Cas de Bernoulli : SE = √(s̄(1−s̄)/n).
- **(4)** SE groupée : √(SE² + (1/n²) Σ_c Σ_i Σ_{j≠i} (s_{i,c} − s̄)(s_{j,c} − s̄)).
- **(7)** Comparaison appariée : SE_{A−B} = √(Var(s_{A−B})/n), soit √(SE²_A + SE²_B − 2·SE_A·SE_B·Corr(s_A, s_B)).
- **(9)** Taille d'échantillon : n = (z_{α/2} + z_β)² (ω² + σ²_A/K_A + σ²_B/K_B)/δ².
- **Rééchantillonnage** : Var(μ̂ | K) = Var(μ̂ | K=1)·(1 + 2/K)/3 dans le cas binaire illustré.

### M10 — Fiabilité sur essais répétés (Yao et al. 2024, [T], §3)
- pass^k = E_tâche[ C(c, k) / C(n, k) ], où c est le nombre de succès sur n essais.

### M11 — ACO piloté par LLM (Rahman et al. 2025, [T])
- **Environnement** (§IV-B, §V-B) : réseau à deux chemins (court/long) entre source et destination.
- **Prompts** : trois par itération (choix du chemin, dépôt, évaporation). Le prompt de choix contient des **consignes de phase explicites** (« explore 50/50 early, … exploit late »), ce qui constitue un confondant.
- **Cadre** : 30 essais × 18 itérations; évaluation finale avec un GPT en nuage (version non précisée dans l'extraction); Qwen 2.5 Instruct 14B n'a servi qu'au développement local.

### M12 — Taxonomie MAST (Cemri et al. 2025, [T])
- **Structure** (§4, fig. 1, annexe A) : 14 modes répartis en trois catégories. Totaux par catégorie, calculés en sommant les prévalences de la v3 (arrondis) [I] :
  - FC1 Conception du système : ≈ 44,2 %.
  - FC2 Désalignement inter-agents : ≈ 32,4 %.
  - FC3 Vérification de la tâche : ≈ 23,5 %.
- **Prévalences par mode** (§4, v3) :

  | Mode | Description | Prévalence |
  |---|---|---|
  | FM-1.1 | Spécification de la tâche ignorée | 11,8 % |
  | FM-1.2 | Rôle ignoré | 1,5 % |
  | FM-1.3 | Répétition d'étapes | 15,7 % |
  | FM-1.4 | Perte d'historique | 2,80 % |
  | FM-1.5 | Conditions d'arrêt ignorées | 12,4 % |
  | FM-2.1 | Réinitialisation de la conversation | 2,20 % |
  | FM-2.2 | Absence de demande de clarification | 6,80 % |
  | FM-2.3 | Dérive de la tâche | 7,40 % |
  | FM-2.4 | Rétention d'information | 0,85 % |
  | FM-2.5 | Apport d'un autre agent ignoré | 1,90 % |
  | FM-2.6 | Décalage raisonnement-action | 13,2 % |
  | FM-3.1 | Arrêt prématuré | 6,20 % |
  | FM-3.2 | Vérification absente ou incomplète | 8,20 % |
  | FM-3.3 | Vérification incorrecte | 9,10 % |

- **Accord inter-annotateurs** : κ = 0,88 entre humains; κ = 0,77 pour le juge LLM, 0,79 hors domaine. Corpus de 1 642 traces (v3) sur 7 systèmes multi-agents.

---

## 5. Résultats cibles et critères d'acceptation

Principe : les modèles d'origine (gpt-3.5, Llama, Claude-3.5) ne sont pas ceux du programme. On reproduit donc des **relations** (ordre, signe, forme), pas des valeurs absolues, sauf pour les identités mathématiques.

| # | Source et emplacement | Résultat publié | Grandeur mesurée | Critère d'acceptation (tolérance, répétitions) |
|---|---|---|---|---|
| R1 | Ashery et al. 2025, Résultats, fig. 1 | Consensus établi « by population round 15 » pour tous les modèles sauf Llama-2-70b-Chat (N = 24, W = 10, H = 5) | Ronde de population (≈ N/2 interactions, inférence) où 95 % des 3N dernières interactions réussissent | Haiku 4.5 et Sonnet 5.5 : ≥ 18 exécutions sur 20 au consensus au plus tard à la ronde 20 (15 + 5 de tolérance); médiane rapportée avec IC bootstrap |
| R2 | Ashery et al. 2025, fig. 2B, tableau 1 | Biais collectif avec W = 2 malgré des agents individuellement non biaisés (premier coup, mémoire vide : p = 0,116, tableau 1, interaction 1; interaction 2, agrégée sur les configurations de mémoire : p = 0,110; interaction 3 : p < 2,2 × 10⁻¹⁶) | Fraction des exécutions convergeant vers chaque nom; test binomial contre 0,5 | Biais collectif détecté si p < 0,05 sur 40 exécutions, alors que le test individuel (premier coup, mémoire vide) ne l'est pas (p = 0,116 dans la source) |
| R3 | Ashery et al. 2025, fig. 3B, tableau S3 | Masse critique entre 2 % (Llama-3-70B) et 67 % (Llama-2-70b-Chat); référence humaine citée : 25 % | Plus petite minorité engagée qui fait basculer la convention (bisection) | Valeur pour Haiku 4.5 et Sonnet 5.5 comprise dans [2 %, 67 %]; 10 exécutions par niveau; rapporter l'écart à 25 % |
| R4 | Du et al. 2024, §3.1, tableau 1 | Arithmétique : agent seul 67,0 ± 4,7 %, vote 69,0 ± 4,6 %, débat 81,8 ± 2,3 %; GSM8K : 77,0 / 81,0 / 85,0 % (3 agents, 2 rondes) | Exactitude selon la condition | Sur une tâche où l'agent seul est à 40–80 % (éviter le plafond) : ordre seul ≤ vote ≤ débat, avec IC apparié (Miller, éq. 7); 200 items × 3 graines |
| R5 | Choi et al. 2025, tableau 1 | Qwen2.5-7B, moyenne sur 7 tâches : seul 0,7205; débat décentralisé (T = 5) 0,7050; vote 0,7691 | G_interaction = débat − vote à appels égaux | Reproduit si l'IC à 95 % de G_interaction contient 0 ou est négatif (prédiction de Choi), sur les mêmes 200 items × 3 graines; sinon, conflit R4/R5 à documenter |
| R6 | Li et al. 2024, §5, tableau 2; fig. 1 | GPT-3.5-Turbo : GSM8K 0,73 → 0,85 et MATH 0,29 → 0,39 à N = 40; Llama2-13B en ensemble atteint 59 % contre 54 % pour Llama2-70B seul | Exactitude selon N ∈ {1, 3, 5, 9, 15, 25, 40} | Courbe non décroissante jusqu'à saturation (ρ de Spearman > 0, p < 0,05) sur 200 items avec Haiku 4.5; non-monotonie admise si les items difficiles dominent (Chen et al. 2024a), auquel cas on la rapporte par strate de difficulté |
| R7 | Rahman et al. 2025, §V-B, fig. 2 | LLM-ACO : 52,2 % → 86,7 % → 100 % de choix optimaux par phase; ACO classique : 61,1 % → 71,7 % → 72,8 %; 53,95 s par essai contre 0,334 s | Fraction de choix du chemin court par tiers d'itérations; temps par essai | (a) Avec consignes de phase : ≥ 90 % de choix courts au dernier tiers, 30 essais × 18 itérations. (b) **Sans** consignes de phase (test du confondant) : on rapporte simplement le résultat; c'est lui qui intéresse P1/P7 |
| R8 | Kim et al. 2025, fig. 1, tableau 1 | Accord conditionnel aux erreurs ≈ 60 % (HELM, hasard 33 %); 0,423 (HF, hasard 0,127) | Accord conditionnel entre Haiku, Sonnet et Opus sur nos items | Accord > hasard, avec IC bootstrap (2 000 tirages) excluant le hasard; au moins 100 items où les deux modèles se trompent, sinon on déclare la puissance insuffisante |
| R9 | Chen 2026 (résumé) | Précision du vote ≤ 1 − β | β observé; précision du vote | **Identité** : toute violation signale une erreur de code (test automatique dans le banc) |
| R10 | Park et al. 2023, §7.1.2 | Diffusion de 1 à 8 agents (4 → 32 %) et de 1 à 13 (4 → 52 %); densité du réseau 0,167 → 0,74; 5 présents sur 12 invités; hallucinations 1,3 % (6/453) | — | **Non retenu** pour reproduction (coût, environnement complexe); sert d'illustration |
| R11 | Cemri et al. 2025, §3–4 | κ humain = 0,88; κ du juge LLM = 0,77 | Accord sur l'annotation MAST de nos traces d'échec | κ ≥ 0,70 entre deux annotateurs sur 30 traces avant d'utiliser un juge LLM; κ du juge ≥ 0,70 sur 30 autres |
| R12 | Riedl 2026 | Toutes les conditions montrent une capacité d'émergence; seul « persona + théorie de l'esprit » donne une stabilité I₃ > 0 significative | S_macro et G₃ calculés sur nos exécutions | Outil de mesure plutôt que cible; on ne valide le calcul que s'il reproduit le signe de S_macro sur un jeu de contrôle simulé (agents à règle synergique ou indépendants) |

---

## 6. Définitions opérationnelles

### 6.1 Gain collectif

Notation : e désigne une instance d'environnement (graine), S(e) un score orienté « plus haut = mieux », et a l'architecture. Toutes les comparaisons sont **appariées sur e**, avec des nombres aléatoires communs : même graine, mêmes sources, mêmes perturbations.

| Symbole | Définition | Rôle |
|---|---|---|
| S_ind(e) | Même population, aucun signal : chaque agent agit seul et le score collectif est l'agrégat de ses actions (récolte totale, vote non interactif pour une décision) | Référence nulle |
| S_best(e) | Score du meilleur agent seul, ou du modèle le plus fort seul **à budget de jetons égal** (p. ex. *Self-Consistency* avec k tirages) | Référence forte |
| **G_int** | E_e[S_a(e) − S_ind(e)] | **Gain d'interaction (primaire)** : ce que la chorégraphie ajoute à la simple juxtaposition |
| G_fort | E_e[S_a(e) − S_best(e)] | Synergie forte (le groupe bat son meilleur membre) |
| G_$ | G_int / (C_a − C_ind), où C est le coût en $ par exécution | Efficacité économique (Kapoor et al. 2025) |
| B | S_a / S_best, si S est sur une échelle de rapport | Analogue du « bénéfice collectif » de Bahrami et al. 2010 (définition exacte du texte non lue) |
| Plafond | 1 − β | Borne de tout gain par sélection (Chen 2026) |

Score S selon le scénario (inférence de l'auteur, à harmoniser avec les dossiers P1, P3 et P5) :
- **S1 Recrutement** :
  - Primaire : p_best, la fraction d'agents-pas exploitant la meilleure source sur la seconde moitié de l'exécution.
  - Secondaire : t½, le nombre de pas nécessaires pour réallouer 50 % de l'effort après inversion des qualités.
- **S3 Division du travail** :
  - Primaire : −RMS(stimulus − consigne) sur l'exécution.
  - Secondaires : changements de tâche par agent (coût) et temps de récupération après retrait d'une caste.
- **S5 Quorum** :
  - Primaire : 𝟙[choix = meilleur site] à budget de rondes fixe.
  - Secondaire : τ, le temps de décision conditionnel au succès.
  - Issues d'échec codées séparément : scission, absence de décision (interblocage), refus du modèle.

Décomposition à rapporter pour chaque cellule : S_a − S_ind = (S_vote − S_ind) + (S_a − S_vote), soit gain d'agrégation + gain d'interaction (cadre de Choi et al. 2025 transposé; inférence).

### 6.2 Richesse du signal

v3 traite la richesse comme un scalaire unique. On la décompose en quatre grandeurs, ce qui est une proposition de l'auteur (inférence) :

| Grandeur | Définition | Mesure |
|---|---|---|
| **R1 nominale** | Dimension d (nombre de variables de tâche codables) et alphabet \|M\| | Par conception : L0 = un entier 0–9 (log₂ 10 ≈ 3,3 bits, d = 1); L1 = tuple (direction 8 secteurs, distance 4 classes, qualité 4 niveaux) = 7 bits, d = 3; L2 = texte libre ≤ 30 jetons; L3 = texte libre ≤ 300 jetons |
| **R2 effective** | Î(D(M); W)/H(W) ∈ [0, 1], où W est l'état caché pertinent (identité ou position du meilleur site) et D un décodeur figé | Estimateur par comptage avec correction de biais; borne inférieure de I(M; W) par l'inégalité de traitement des données. Pour L2–L3, D est un analyseur déterministe, ou un juge LLM figé validé contre annotation humaine (κ ≥ 0,7) |
| **R3 persistance** | Demi-vie du signal dans le canal | Piste : τ½ = ln 2 / ρ par pas (évaporation ρ); danse : durée de vie d'une ronde; LLM : TTL du tableau |
| **R4 portée** | Fraction des agents pouvant percevoir un signal au moment de son émission | Piste : quiconque passe; danse : agents présents sur la « piste de danse »; diffusion : tous |

La question transversale de v3 devient : « comment G_int varie-t-il avec R2, à R3, R4 et modèle fixés? » La comparaison entre espèces (fourmi, abeille, LLM) reste descriptive, parce qu'elle confond le signal avec tout le reste.

### 6.3 Hypothèses à pré-enregistrer

- **H1 (information distribuée)** : G_int ≈ 0 en S5 quand tous les agents ont la même information (cas de Choi et al. 2025), mais G_int > 0 en S1, où l'information est répartie (seuls les éclaireurs connaissent les sources). Inférence de l'auteur : le résultat nul de Choi suppose une information redondante.
- **H2 (persistance)** : après inversion des qualités, t½(piste) > t½(danse). C'est le pendant LLM du blocage des fourmis contre la réallocation des abeilles (v3, P1).
- **H3 (richesse)** : G_int croît de L0 à L1 quand l'information est distribuée, puis plafonne de L1 à L3, alors que le coût croît de façon monotone.
- **H4 (diversité)** : en S3, une population hétérogène réduit l'amplitude d'oscillation par rapport à une population homogène. Corollaire : mêler un modèle faible et un modèle fort peut faire moins bien que le fort seul (Bahrami et al. 2010, résumé : « two heads were actually worse than the better one » quand les sensibilités diffèrent beaucoup).
- **H5 (capacité)** : la compétence individuelle croît avec la capacité, mais la corrélation des erreurs aussi (Kim et al. 2025). G_fort n'augmente donc pas avec la capacité.

---

## 7. Méthodologie d'évaluation

### 7.1 Variance et répétitions
- **Unité statistique** : l'exécution. Les décisions d'agents à l'intérieur d'une exécution sont groupées; on utilise la SE groupée (Miller 2024, éq. 4).
- **Plan apparié** : mêmes graines dans toutes les cellules d'une comparaison, avec SE appariée (éq. 7). Le gain de puissance est gratuit quand Corr > 0.
- **Taille** : un pilote de 10 exécutions par cellule estime σ; on fixe ensuite n par l'éq. 9.
  - Test bilatéral, α = 0,05, puissance 0,8, échantillons indépendants : n = 63 pour d = 0,5; 29 pour d = 0,74; 25 pour d = 0,8; 16 pour d = 1,0 (calcul : `scratchpad/cout_p7.py`).
  - Choix : **30 exécutions par cellule LLM** (d détectable ≈ 0,74 sans appariement, moins avec); 1 000 par cellule pour les agents à règle.
- **Comparaisons multiples** : correction de Holm sur les contrastes primaires (H1–H5, environ 6 contrastes). Pour les contrastes clés, passer à n = 40 si le pilote montre d < 0,8.
- **Fiabilité** : rapporter pass^k pour k ∈ {1, 3, 5} sur les issues binaires (Yao et al. 2024).
- **Non-déterminisme** : ne jamais supposer qu'un réglage est déterministe. Atil et al. 2024 rapportent jusqu'à 15 % de variation d'exactitude entre exécutions et jusqu'à 70 % d'écart entre le meilleur et le pire cas.

### 7.2 Coûts
- Rapporter le coût en $ par exécution et par cellule, et tracer le front de Pareto exactitude-coût (Kapoor et al. 2025).
- Comparer aussi **à coût égal** : par exemple 3 agents Haiku interactifs contre 1 Opus avec k tirages.
- Repère : selon Hadfield et al. 2025, un système multi-agents consomme environ 15 fois les jetons d'une conversation, et l'usage de jetons explique 80 % de la variance de performance sur BrowseComp. Le budget de jetons est donc un confondant de premier ordre de tout « gain collectif ».

### 7.3 Confondants et parades

| Confondant | Parade |
|---|---|
| Budget de jetons ou d'appels inégal entre architectures (l'orchestrateur ajoute un appel par tour) | Rapporter les appels et les jetons; contraste à coût égal |
| Raisonnement : Opus 5.5 ne le désactive pas; Sonnet 5.5 le coupe avec `thinking: {type: "between_tools"}` (effort ≤ `high`); Haiku 4.5 sans raisonnement par défaut; Fable 5.1 toujours actif | Effort fixé explicitement (`low` ou `medium`) sur les modèles qui l'acceptent (le paramètre `effort` échoue sur Haiku 4.5); journaliser `usage.output_tokens`; « capacité » = modèle + mode de raisonnement |
| Échantillonnage : `temperature` et `top_p` rejetés (400) sur Opus 5.5 et Fable 5.1; valeurs non par défaut rejetées sur Sonnet 5.5; réglables sur Haiku 4.5 | Échantillonnage par défaut partout; la diversité vient des personas et prompts, pas de la température |
| Refus (`stop_reason: "refusal"`) des classifieurs de sécurité sur Opus 5.5, Sonnet 5.5 et Fable 5.1 | Issue codée « refus », jamais une donnée manquante silencieuse; **pas de *fallbacks*** côté serveur ni côté client (ils changent de modèle) |
| Format de sortie : `tool_choice` forcé rejeté (400) sur Opus 5.5, Sonnet 5.5 et Fable 5.1 | Sorties structurées (`output_config.format`) avec le même schéma d'action pour tous les modèles; échec d'analyse = action nulle, comptée |
| Ordre des messages et des agents dans le prompt | Permutation aléatoire par tour, graine journalisée |
| Contamination des données (GSM8K, MMLU) | Environnements procéduraux (S1, S3, S5) générés à la volée; bancs publics réservés aux ancrages R4–R6 |
| Plafond de performance (les modèles récents réussissent l'arithmétique simple) | Calibrer la difficulté pour que l'agent seul soit à 40–80 %; Li et al. 2024 trouvent le gain maximal à difficulté intermédiaire (§6.2) |
| Croissance du contexte (L3) | Plafond de jetons par message et fenêtre glissante, identiques dans toutes les cellules |
| Échelle (N = 10 contre une colonie) | Agents à règle à N = 10 et à N biologique (C12) |

### 7.4 Non-stationnarité
- Les identifiants de modèle n'ont pas de date (`claude-opus-5-5`, etc.). Le maintien des poids derrière un identifiant n'est **pas garanti** dans les sources lues (question ouverte Q3).
- Chen et al. 2024b documentent une dérive marquée entre deux versions d'un même service : la précision de GPT-4 à reconnaître les nombres premiers passe de 84 % à 51 % entre mars et juin 2023.
- **Parades** :
  - journaliser `response.model`, l'horodatage, la région et `usage`;
  - entrelacer les cellules d'une même comparaison en blocs aléatoires dans le temps (jamais toute une cellule un jour, l'autre le lendemain);
  - rejouer chaque semaine une **cellule sentinelle** (graines fixes) et déclarer une dérive si son score sort de l'IC à 95 % du pilote;
  - geler la campagne sur une fenêtre de temps courte.

### 7.5 Rejeu
- L'environnement est déterministe pour une graine donnée. Le journal contient pour chaque appel : requête, réponse brute, `model`, `usage`, `stop_reason`, latence.
- Le rejeu réexécute l'environnement à partir des sorties journalisées; c'est la base des visuels « replay » (§11) et de l'audit des échecs (MAST).

---

## 8. Plan factoriel chiffré

### 8.1 Hypothèses de coût
- **Tarifs** : Anthropic 2026 (skill `claude-api`, cache du 2026-09-25), en $ US par million de jetons (entrée / sortie / lecture de cache).

  | Modèle | Identifiant | Entrée | Sortie | Lecture de cache |
  |---|---|---|---|---|
  | Claude Haiku 4.5 | `claude-haiku-4-5` | 1 | 5 | 0,10 [à confirmer] (règle générale 0,1 × l'entrée) |
  | Claude Sonnet 5.5 | `claude-sonnet-5-5` | 2 | 10 | 0,20 |
  | Claude Opus 5.5 | `claude-opus-5-5` | 4 | 20 | 0,20 |
  | Claude Fable 5.1 | `claude-fable-5-1` | 10 | 50 | 0,25 |

  L'API par lots (*Batch*) donne −50 % sur tous les jetons, cumulable avec le cache [à confirmer : cumul non vérifié]. Prix à reconfirmer au lancement (page *Pricing*).
- **Exécution type** : N = 10 agents × T = 30 tours = 300 appels.
- **Jetons par appel (niveau L2)** : 1 200 en lecture de cache (prompt système et règles), 800 non cachés (état local), 150 en sortie visible.
- **Raisonnement (hypothèse à calibrer au pilote)** : 0 jeton pour Haiku et Sonnet (`between_tools`), 300 pour Opus 5.5 à effort bas, 500 pour Fable 5.1.
- **Échelle de richesse (entrée non cachée / sortie)** : L0 400/20, L1 600/50, L2 800/150, L3 2 000/400.
- **Coût par exécution (L2)** : Haiku 0,50 $; Sonnet 1,00 $; Opus 3,73 $; Fable 12,24 $.

### 8.2 Phases

| Phase | Facteurs | Cellules | Exécutions | Coût standard | Coût en lot |
|---|---|---|---|---|---|
| 0 Pilote | 6 cellules représentatives × 10 exécutions (σ, jetons, refus, échecs d'analyse) | 6 | 60 | ≈ 80 $ | ≈ 40 $ |
| A Ancrages | R1–R3 *naming game* (Haiku, Sonnet; 20 exécutions); R4–R5 débat contre vote (Sonnet, 200 items × 3 graines); R6 vote selon N (Haiku, 200 items) | — | — | ≈ 65 $ (estimation grossière) | ≈ 35 $ |
| 1 Grille centrale | Architecture {piste, danse, orchestrateur, indépendants + vote} × modèle {Haiku 4.5, Sonnet 5.5, Opus 5.5} × scénario {S1, S3, S5}, niveau L2 (L0 pour le vote) | 36 LLM (+ 12 à règle) | 1 080 (+ 12 000 à règle, gratuites) | 1 733 $ | 867 $ |
| 2 Échelle de richesse | {L0, L1, L2, L3} × {piste, danse} × 3 scénarios, Sonnet 5.5 | 24 (6 recoupent la phase 1) | 720 | 797 $ (≈ 620 $ en réutilisant L2) | 399 $ |
| 3 Diversité | {homogène Sonnet, hétérogène Haiku/Sonnet/Opus} × {piste, danse} × {S3, S5} | 8 (4 recoupent la phase 1) | 240 | 330 $ | 165 $ |
| Option | Fable 5.1 × danse × 3 scénarios × 10 exécutions | 3 | 30 | 367 $ | 184 $ |
| **Total** | | | ≈ 2 300 LLM | **≈ 3 370 $** | **≈ 1 690 $** |
| + 30 % d'imprévus | | | | ≈ 4 380 $ | ≈ 2 200 $ |

Les coûts en lot supposent que le rabais de −50 % se cumule avec le cache [à confirmer]. Le total brut du script est de 3 248 $ en standard et 1 624 $ en lot pour les phases 1, 2, 3, l'option et le *naming game*; s'y ajoutent les estimations du pilote et des autres ancrages. Opus 5.5 représente environ 73 % du coût de la phase 1 (≈ 1 263 $ sur 1 733 $); retirer Opus ou le limiter à S5 est le premier levier d'économie.

### 8.3 Durée et ordonnancement
- **Mode lot** : à chaque tour, on soumet un lot réunissant tous les agents de toutes les répétitions d'une cellule (30 × 10 = 300 requêtes); une cellule demande 30 lots successifs. La latence d'un lot n'est pas garantie (délai maximal à vérifier dans la doc *Batches*); viser le mode lot pour la production, l'API standard pour le développement.
- **Charge** : environ 2 300 exécutions × 300 appels ≈ 700 000 appels. C'est faisable en quelques semaines sous les limites de débit habituelles (inférence, à vérifier selon le palier du compte).

---

## 9. Protocoles A2A et MCP (état au 2026-10-01)

**MCP**
- **Révision courante** : 2026-07-28, qui remplace 2025-11-25 (MCP 2026, changelog lu).
- **Changements majeurs** :
  - noyau **sans état** : plus de poignée de main `initialize`; version et capacités dans `_meta` à chaque requête;
  - retrait des sessions et de l'en-tête `Mcp-Session-Id`;
  - nouvelle RPC `server/discover`;
  - `subscriptions/listen` remplace `resources/subscribe`;
  - les tâches deviennent une extension officielle (`io.modelcontextprotocol/tasks`, sondage par `tasks/get`, nouvelle méthode `tasks/update`);
  - patron *Multi Round-Trip Requests* (`resultType: "input_required"`) à la place des requêtes initiées par le serveur;
  - `CacheableResult` avec `ttlMs` et `cacheScope`.
- **Dépréciations** : *Roots*, *Sampling* et *Logging*; enregistrement dynamique de clients au profit des *Client ID Metadata Documents*.
- **Gouvernance** : Agentic AI Foundation (fonds dirigé de la Linux Foundation) depuis le 2025-12-09 (MCP 2025); mêmes mainteneurs, processus SEP inchangé.

**A2A**
- **Versions** : v1.0.0 (2026-03-12) et v1.0.1 (2026-05-28, correctifs de spécification) d'après A2A 2026b. La page de spécification (A2A 2026a) affiche « Latest Released Version 1.0.0 » et annonce l'entrée d'A2A dans l'Agentic AI Foundation, sans date (date à confirmer).
- **Liaisons** : JSON-RPC (§9), gRPC (§10), HTTP+JSON/REST (§11).
- **Objets** : Agent Card, Task, Message, Part, Artifact.
- **États de tâche** : SUBMITTED, WORKING, COMPLETED, FAILED, CANCELED, INPUT_REQUIRED, REJECTED, AUTH_REQUIRED.
- **Mises à jour** : sondage, flux (*streaming*), notifications *push* (webhooks).

**Lecture pour la chorégraphie** (inférence de l'auteur, appuyée par les deux spécifications) :
- Les deux protocoles sont **bilatéraux et initiés par un client**. A2A modélise la **délégation dirigée** vers un agent connu par son Agent Card : c'est un recrutement adressé, plus proche de l'orchestration que de la danse, qui est diffusée à quiconque est présent.
- La stigmergie entre agents LLM se construit **par-dessus**. Exemple de patron : une ressource MCP partagée sert de tableau noir; `subscriptions/listen` notifie les changements (perception locale); `ttlMs` indique la fraîcheur (évaporation, sans la sémantique de décroissance d'intensité).
- `TASK_STATE_REJECTED` est un refus individuel, pas un signal d'arrêt adressé aux autres (signal *stop* des abeilles). Aucun des deux protocoles n'a de primitive de quorum.
- Note : l'affirmation « aucun concept de pub/sub ou d'état partagé dans A2A » vient d'une lecture outillée de la page de spécification; à confirmer par une recherche plein texte.

---

## 10. Parallèles agentiques appuyés par des sources

| Mécanisme biologique (v3) | Analogue LLM documenté | Ce que la source montre | Limite du parallèle |
|---|---|---|---|
| Piste, stigmergie | Tableau noir : Han et Zhang 2025, Salemi et al. 2025; contexte partagé : Mao et Mirhoseini 2026; stigmergie physique : Pal et al. 2026 | Han et Zhang 2025 : performance compétitive avec moins de jetons. Salemi et al. 2025 : +13 à 57 % de succès relatif. Mao et Mirhoseini 2026 : jusqu'à +10,5 points sur SWE-bench Verified et environ −50 % de coût. Pal et al. 2026 : « Physical stigmergy alone supports capable societies »; portefeuilles plus larges et plus résilients que *best-of-N* isolé | Salemi et al. 2025 gardent un agent central qui diffuse les requêtes (hybride); Han et Zhang 2025 choisissent les agents selon le contenu du tableau, par quel mécanisme exact? (non lu) |
| Seuils de réponse, division du travail | Mao et Mirhoseini 2026 : agents qui « réclament » des tâches dans une file partagée | Auto-allocation sans coordinateur | Analogie fonctionnelle seulement (inférence) |
| Danse, diffusion, recrutement | Débat : Du et al. 2024, Liang et al. 2024; conformité : Weng et al. 2025 | Le débat améliore l'exactitude (Du et al. 2024) mais n'ajoute guère au vote (Choi et al. 2025); conformité mesurable (Weng et al. 2025) | La danse transmet une information que le suiveur n'a pas; dans le débat sur QCM, tous ont la même (cf. H1) |
| Quorum, décision sans chef | *Naming game* : Ashery et al. 2025; vote : Li et al. 2024, Choi et al. 2025 | Convention globale par interactions locales; biais collectif; masse critique de 2 à 67 % selon le modèle | Le *naming game* n'a pas de « meilleure » option : il mesure la coordination, pas la justesse |
| Diversité des seuils (thermorégulation) | Hétérogénéité des modèles : Zhang et al. 2025, Hegazy 2024; erreurs corrélées : Kim et al. 2025; plafond : Chen 2026, Kim 2026; monoculture : Kleinberg et Raghavan 2021 | Les erreurs sont corrélées, d'autant plus que les modèles sont précis; le vote bat le meilleur membre dans seulement 9,98 % des sous-ensembles de taille 3 (Kim 2026, MMLU-Pro) | La diversité LLM visée est épistémique (erreurs); la diversité des seuils est temporelle (moments de réponse) |
| Différenciation de rôles émergente | Riedl 2026; Pal et al. 2026 | Les personas et une instruction de théorie de l'esprit font passer d'un agrégat à un collectif d'ordre supérieur (S_macro, G₃); rôles d'exploration, de construction, de maintenance et de coordination | — |
| Moulin de fourmis, boucle | MAST FM-1.3 « répétition d'étapes » (15,7 %), FM-1.5 « conditions d'arrêt ignorées » (12,4 %) | Les boucles et non-terminaisons sont les modes d'échec les plus fréquents | Le moulin naît d'une rétroaction positive entre suiveurs; la répétition LLM est souvent individuelle (inférence) |
| Parasites par mimétisme chimique | *Prompt Infection* : Lee et Tiwari 2024 | Une injection se réplique d'agent en agent comme un virus; défense par *LLM Tagging* | Prolonge EscapeBench et LeakLab (v3, P6) |
| Évaporation | `ttlMs` dans MCP 2026-07-28 | Indice de fraîcheur des résultats | Pas de décroissance d'intensité |
| Orchestration (contre-modèle) | Hadfield et al. 2025 (orchestrateur-travailleurs) | +90,2 % sur une évaluation interne contre un Opus 4 seul, avec environ 15 fois les jetons d'une conversation | Gain non normalisé par le coût |

---

## 11. Visuels de vulgarisation

1. **Grille 4 × 3 cliquable** (architecture × modèle, un onglet par scénario) : chaque case montre G_int avec son IC en couleur divergente centrée sur 0, et un clic ouvre le rejeu d'une exécution.
2. **Barre décomposée « agrégation + interaction »** : pour chaque architecture, la part du gain qui vient du simple vote et celle qui vient de la communication. C'est le visuel clé du message de Choi et al. 2025.
3. **Échelle de richesse L0 → L3** : petits multiples, un panneau par scénario, avec G_int et le coût par exécution dans deux panneaux alignés (pas de double axe).
4. **Plafond de co-échec** : diagramme UpSet des erreurs Haiku, Sonnet et Opus; la zone « tous faux » (β) est surlignée et la ligne 1 − β est superposée à la précision du vote.
5. ***Naming game* animé** : 24 points colorés selon le nom courant; curseur de minorité engagée; la bascule apparaît au seuil critique, avec un repère « 25 % humains ».
6. **Triptyque même scénario** : fourmis (champ de phéromone en carte thermique), abeilles (vecteurs de danse éphémères), agents LLM (bulles de message qui s'effacent selon R3), avec chronogramme commun de p_best.
7. **Front de Pareto exactitude-coût** : chaque configuration est un point; le front est souligné (Kapoor et al. 2025).
8. **Carte des pannes MAST** : diagramme de Sankey architecture → catégorie FC → mode FM, alimenté par l'annotation des exécutions échouées.
9. **Lecteur de rejeu** : frise des tours; le volet de gauche montre l'état partagé (piste ou tableau), le volet de droite les messages; chaque message peut être annoté du mode MAST correspondant.

---

## 12. Questions ouvertes

1. **H1 est le pivot** : le résultat nul de Choi (débat ≈ vote) tient-il quand l'information est distribuée entre les agents? Aucune source lue ne le teste directement dans un environnement de fourragement.
2. **Un LLM peut-il « être » une fourmi?** Dans Rahman et al. 2025, le prompt contient la politique (phases explore/exploit) : l'agent exécute la règle. Le régime intéressant est celui où l'agent ne reçoit que le signal local et le but. Comment le formuler sans réintroduire la règle par le prompt?
3. **Stabilité des identifiants de modèle** : les identifiants sans date (`claude-opus-5-5`) désignent-ils des poids figés? À vérifier dans la doc Models API (`created_at`) ou auprès d'Anthropic. Sinon, la cellule sentinelle (§7.4) est indispensable.
4. **Estimateur de R2 pour le texte libre** : un décodeur LLM figé introduit son propre biais. Faut-il un analyseur déterministe avec un vocabulaire contraint?
5. **Vérifications restantes** (quota de recherche épuisé) :
   - définition exacte du « bénéfice collectif » dans Bahrami et al. 2010 (texte non lu);
   - contenu informationnel (bits) de la danse dans Haldane et Spurway 1954 (à confier au dossier abeilles);
   - date d'entrée d'A2A dans l'AAIF;
   - écart entre la page de spécification A2A (1.0.0) et la version GitHub v1.0.1;
   - absence de vote final dans le débat de Du et al. 2024 [à confirmer];
   - cumul du rabais de lot et du cache (§8.1) [à confirmer].
6. **Écart d'échelle** : un essaim de 10 agents LLM peut-il montrer des transitions de phase connues chez les colonies (moulin, symétrie brisée du pont double)? Il faudra peut-être un hybride : quelques agents LLM « éclaireurs » parmi une foule d'agents à règle (inférence; aucune source lue).
7. **Pré-enregistrement** : déposer H1–H5, le plan, les métriques et les règles d'exclusion (refus, échecs d'analyse) avant la phase 1, par exemple sur OSF.
8. **Fable 5.1** : sa rétention de données de 30 jours est obligatoire (incompatible avec une organisation à rétention nulle) et son raisonnement est toujours actif. L'inclure seulement comme option descriptive, hors comparaison principale.

---

## 13. Historique de vérification

Rapport source : `recherche/verifications/p7-agents-llm.md` (2026-10-01) : 43 références contrôlées, 35 confirmées, 7 corrigées, 1 non vérifiable, 0 fausse. Consolidation du 2026-10-01 : seules les corrections du rapport sont appliquées, sans changement de fond; aucune conclusion du dossier n'est modifiée.

### 13.1 Corrections appliquées

1. **Du et al. 2024 (M2)** : la citation de prompt n'était pas verbatim. Remplacée par le prompt GSM8K exact et la variante « Short » de la fig. 3. « Pas de vote final » n'est pas énoncé dans le texte : marqué [à confirmer].
2. **Chen et al. 2024a** : publié à NeurIPS 2024 sous le titre *… Towards the Scaling Properties of Compound AI Systems* (la prépublication portait *… Towards Scaling Laws of Compound Inference Systems*). Étiquette suffixée a, à cause de Chen et al. 2024b.
3. **Ashery et al. 2025 (R2)** : p = 0,116 (tableau 1, interaction 1, premier coup, mémoire vide) au lieu de 0,110, qui porte sur l'interaction 2. Précisions : fig. 1 sur 40 exécutions, fig. 2 sur 40, 27 ou 20 exécutions; fig. 3 en pourcentages et tableau S3 en effectifs (ce qui explique les extractions discordantes).
4. **Mao et Mirhoseini 2026 (§10)** : « jusqu'à » +10,5 points; « environ » −50 % de coût.
5. **Cemri et al. 2025 (M12)** : les totaux 41,8 / 36,9 / 21,3 % venaient de la fig. 2 de la v2 (plus de 200 traces); remplacés par les totaux de la v3, obtenus en sommant les modes (≈ 44,2 / 32,4 / 23,5 %) [I]. Prévalences par mode, κ et 1 642 traces : v3. Venue : *Datasets and Benchmarks Track*, *spotlight*.
6. **Miller 2024 (M9)** : racine carrée rétablie à l'éq. 7.
7. **Kapoor et al. 2025** : publié dans *TMLR* (2025-06-13), pas une prépublication; l'étiquette passe de 2024 à 2025.
8. **Khushiyant 2025** : marquée [non vérifiée]; l'affirmation « agents non LLM » ne se lit pas dans le résumé et est retirée.
9. **Précisions du rapport** : Park et al. 2023 (« milliers de dollars » au §8.2); Kim et al. 2025 (troisième jeu de données : *Resumes*, non « CV »); Riedl 2026 (§2, §4.1, §4.2; la condition de théorie de l'esprit inclut la persona; 200 expériences par condition); Rahman et al. 2025 (Qwen 2.5 Instruct 14B seulement pour le développement local); Li et al. 2024 (fig. 1 : taille d'ensemble jusqu'à 15); cumul du rabais de lot et du cache marqué [à confirmer], ainsi que la lecture de cache de Haiku 4.5 (0,10 $).
10. **Étiquettes** : les clés internes (park2023, etc.) sont remplacées par les étiquettes « Nom année » dans tout le texte. anthropic2025 devient Hadfield et al. 2025; chen2024calls et chen2024drift deviennent Chen et al. 2024a et 2024b; kimd2026 devient Kim 2026; kapoor2024 devient Kapoor et al. 2025.
11. **Compléments hors rapport** (métadonnées lues le 2026-10-01 [M]) : liste complète des 13 auteurs d'Atil et al. 2024 (API arXiv); venue « NeurIPS 2024 poster » et identifiant OpenReview de Chen et al. 2024a.
12. **Questions ouvertes tranchées** (retirées du §12.5) : taille d'ensemble de la fig. 1 de Li et al. 2024 (15); sections de Riedl 2026; valeurs de la masse critique d'Ashery et al. 2025 (pourcentages à la fig. 3, effectifs au tableau S3).

### 13.2 Réserves restantes

- **Khushiyant 2025** : contenu non vérifié (architecture des agents inconnue) [non vérifiée]; sans effet, la référence est écartée.
- **Du et al. 2024** : l'absence de vote final dans le débat n'est pas explicite dans le texte [à confirmer].
- **Totaux MAST par catégorie** : calculés par sommation, non lus dans la v3 [I].
- **Coûts en lot** : le cumul du rabais de lot (−50 %) et du cache n'est pas vérifié; les totaux en lot du §8.2 en dépendent [à confirmer]. Les tarifs et contraintes ont été contrôlés contre le skill local (cache du 2026-09-25), non contre la documentation en ligne; ils se reconfirment avant toute exécution, de même que la disponibilité de Haiku 4.5 (retrait possible dès le 2026-10-15, selon le cadre).
- **Contenu non lu** : définition du bénéfice collectif (Bahrami et al. 2010); contenu en bits de la danse (Haldane et Spurway 1954, métadonnées seulement); version publiée d'Ashery et al. 2025 (page Science : 403, lecture sur arXiv v2).
- **Protocoles** : date d'entrée d'A2A dans l'AAIF; écart entre la page de spécification (1.0.0) et la version GitHub v1.0.1; absence de pub/sub dans A2A établie par lecture outillée seulement; années 2026 des étiquettes A2A déduites de l'ordre des versions.
- **Extraction** : un chiffre tiré d'une seule extraction WebFetch peut demander une reconfirmation sur le PDF.
- **Incohérence interne non corrigée** (hors rapport) : C13 annonce ≈ 3 250 $ en standard et ≈ 1 620 $ en lot (total du script), le §8.2 ≈ 3 370 $ et ≈ 1 690 $ (pilote et ancrages inclus). À harmoniser avec le chercheur.
- **Formulation non corrigée** (hors rapport) : le §10 dit que les boucles et non-terminaisons sont les modes d'échec les plus fréquents; FM-1.3 (15,7 %) et FM-1.5 (12,4 %) sont aux rangs 1 et 3, FM-2.6 (13,2 %) au rang 2.
- **Harmonisation inter-dossiers** : le cadre (§2.4, point 12) cite Jimenez-Romero et al. 2025 parmi les résultats à reproduire en P7; la référence est absente de ce dossier et n'a pas été ajoutée. Le dossier P8 écrit « Kim et al. 2025b » (erreurs corrélées) et « Chen et al. 2024 » (sans suffixe) pour des œuvres citées ici sous « Kim et al. 2025 » et « Chen et al. 2024a ».

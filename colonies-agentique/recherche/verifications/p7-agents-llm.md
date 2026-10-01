# Vérification indépendante — dossier P7 (agents LLM)

Vérifié le 2026-10-01, sur le fichier `dossiers/p7-agents-llm.md`. Régime : production (livrable sur lequel le chercheur va agir).

**Bilan** : 43 références contrôlées. **35 confirmées**, **7 corrigées** (aucune n'est inventée; les erreurs portent sur la venue, une valeur mal attribuée ou un mélange de versions), **1 non vérifiable** (sur le contenu, pas sur l'existence), **0 fausse**. Les résultats cibles R1 à R12 figurent dans leurs sources, sauf deux écarts : la valeur p de R2 et les totaux par catégorie de MAST (M12).

**Méthode et limites**
- Le quota WebSearch (200/200) et celui de l'outil de recherche scientifique (30/30) étaient épuisés. Toutes les vérifications passent donc par la lecture directe d'URL :
  - API arXiv : titres, auteurs, dates, `journal_ref`, commentaires;
  - HTML arXiv, en texte intégral;
  - API Crossref : DOI, volume, pages;
  - Europe PMC : résumés;
  - API OpenReview : venues;
  - pages des spécifications.
- Les extractions passent par WebFetch, donc par un petit modèle intermédiaire. Les chiffres ont été demandés « verbatim », et les points litigieux ont été réinterrogés. Un chiffre tiré d'une seule extraction reste possible à reconfirmer sur le PDF.
- La référence `claudeapi` a été contrôlée contre le même skill local (cache du 2026-09-25), et non contre la documentation en ligne. Le contrôle vérifie que le dossier transcrit fidèlement le skill; il ne prouve pas que le skill est à jour.

---

## 1. Références : statut

Légende : ✔ confirmée (auteurs, année, titre, venue, volume/pages, DOI); ✎ corrigée; ? non vérifiable.

| Clé | Statut | Correction | URL de contrôle |
|---|---|---|---|
| park2023 | ✔ | — (Crossref : UIST '23, p. 1–22, DOI exact) | https://api.crossref.org/works/10.1145/3586183.3606763 |
| du2024 | ✎ | Métadonnées exactes (PMLR 235:11733–11763). La citation du prompt n'est **pas verbatim**, voir §2 M2 | https://proceedings.mlr.press/v235/du24e.html |
| li2024 | ✔ | — (« Published at TMLR », arXiv v2, oct. 2024) | https://arxiv.org/abs/2402.05120 |
| wang2023sc | ✔ | — (ICLR 2023) | https://arxiv.org/abs/2203.11171 |
| liang2024 | ✔ | — (EMNLP 2024, conférence principale) | https://arxiv.org/abs/2305.19118 |
| qian2025 | ✔ | — (ICLR 2025) | https://arxiv.org/abs/2406.07155 |
| tran2025 | ✔ | — | https://arxiv.org/abs/2501.06322 |
| anthropic2025 | ✔ | — (6 auteurs, 13 juin 2025) | https://www.anthropic.com/engineering/multi-agent-research-system |
| choi2025 | ✔ | — (commentaire arXiv : « NeurIPS 2025 Spotlight ») | https://arxiv.org/abs/2508.17536 |
| zhang2025 | ✔ | — (prise de position; refusée au *Position Paper Track* de NeurIPS 2025 selon OpenReview, donc prépublication) | https://arxiv.org/abs/2502.08788 |
| chen2024calls | ✎ | Publiée à **NeurIPS 2024** sous un titre modifié : *Are More LLM Calls All You Need? Towards the Scaling Properties of Compound AI Systems*. Citer la version publiée | https://api2.openreview.net/notes/search?term=Are%20More%20LLM%20Calls%20All%20You%20Need |
| li2026simas | ✔ | — | https://arxiv.org/abs/2606.00655 |
| hegazy2024 | ✔ | — (`journal_ref` arXiv : JRAR 5(3), oct. 2024, p. 1–10) | https://arxiv.org/abs/2410.12853 |
| schoenegger2024 | ✔ | — (Sci. Adv. 10(45):eadp1528) | https://api.crossref.org/works/10.1126/sciadv.adp1528 |
| bahrami2010 | ✔ | — (Science 329(5995):1081–1085) | https://api.crossref.org/works/10.1126/science.1185718 |
| riedl2026 | ✔ | — (`journal_ref` : ICLR 2026). Sections localisées, voir §2 M6 | https://arxiv.org/abs/2510.05174 |
| kim2025 | ✔ | — (ICML 2025) | https://arxiv.org/abs/2506.07962 |
| chen2026cofail | ✔ | — (auteur : Josef Chen) | https://arxiv.org/abs/2606.27288 |
| kimd2026 | ✔ | — (auteur : Donghwan Kim) | https://arxiv.org/abs/2607.20768 |
| kleinberg2021 | ✔ | — (PNAS 118(22):e2018340118) | https://api.crossref.org/works/10.1073/pnas.2018340118 |
| weng2025 | ✔ | — (ICLR 2025 Oral) | https://arxiv.org/abs/2501.13381 |
| ashery2025 | ✎ | Métadonnées exactes (Sci. Adv. 11:eadu9368). La valeur p de R2 est mal attribuée, voir §3 R2 | https://arxiv.org/abs/2410.08948 |
| han2025 | ✔ | — | https://arxiv.org/abs/2507.01701 |
| salemi2025 | ✔ | — (v2 du 2026-01-31) | https://arxiv.org/abs/2510.01285 |
| mao2026 | ✎ | Gains mal nuancés : « **jusqu'à** +10,5 points » et « **environ** −50 % » (voir §4) | https://arxiv.org/abs/2606.10662 |
| pal2026 | ✔ | — | https://arxiv.org/abs/2608.26081 |
| rahman2025 | ✔ | — (v3 du 2026-08-27, soumise à IEEE Intelligent Systems) | https://arxiv.org/abs/2506.14496 |
| khushiyant2025 | ? | Métadonnées exactes. L'affirmation « agents non LLM » ne se lit pas dans le résumé, qui ne précise pas l'architecture. Sans effet, puisque la référence est écartée du cœur du dossier | https://arxiv.org/abs/2512.10166 |
| cemri2025 | ✎ | Venue confirmée (NeurIPS 2025 *Datasets and Benchmarks Track*, *spotlight*). En revanche, les totaux par catégorie viennent de **v2** et les prévalences par mode de **v3**, voir §2 M12 | https://api2.openreview.net/notes/search?term=Why%20Do%20Multi-Agent%20LLM%20Systems%20Fail |
| lee2024 | ✔ | — (prépublication; refusée à ICLR 2025 selon OpenReview) | https://arxiv.org/abs/2410.07283 |
| miller2024 | ✎ | Métadonnées exactes. Erreur de notation dans l'éq. 7, voir §2 M9 | https://arxiv.org/abs/2411.00640 |
| kapoor2024 | ✎ | Publiée dans **TMLR (2025)**, et non une prépublication (OpenReview `Zy4uFzMviZ`, publiée le 2025-06-13). Citer : Kapoor et al. (2025), *AI Agents That Matter*, TMLR | https://api2.openreview.net/notes/search?term=AI%20Agents%20That%20Matter%20Kapoor |
| atil2024 | ✔ | — (13 auteurs; v5 du 2025-04-02) | https://arxiv.org/abs/2408.04667 |
| chen2024drift | ✔ | — (HDSR 6(2), 2024-03-12) | https://api.crossref.org/works/10.1162/99608f92.5317da47 |
| yao2024 | ✔ | — (venue non trouvée sur OpenReview; la prépublication est confirmée) | https://arxiv.org/abs/2406.12045 |
| mcp2026 | ✔ | — (révision 2026-07-28, marquée **Current** sur la page *Versioning*) | https://modelcontextprotocol.io/specification/2026-07-28/changelog |
| mcpaaif2025 | ✔ | — | https://blog.modelcontextprotocol.io/posts/2025-12-09-mcp-joins-agentic-ai-foundation/ |
| a2aspec | ✔ | — (affiche « Latest Released Version 1.0.0 »; date d'entrée dans l'AAIF absente, comme le dossier le note) | https://a2a-protocol.org/latest/specification/ |
| a2arel | ✔ | — (v1.0.0 le 12 mars, v1.0.1 le 28 mai; GitHub omet l'année, 2026 déduit de l'ordre des versions) | https://github.com/a2aproject/A2A/releases |
| claudeapi | ✔ | — (tarifs et contraintes conformes au skill local, cache du 2026-09-25; voir limites) | skill `claude-api` (local) |
| jackson2004 | ✔ | — (Nature 432(7019):907–909) | https://api.crossref.org/works/10.1038/nature03105 |
| robinson2005 | ✔ | — (Nature 438(7067):442) | https://api.crossref.org/works/10.1038/438442a |
| haldane1954 | ✔ | — (Insectes Sociaux 1(3):247–283) | https://api.crossref.org/works/10.1007/BF02222949 |

---

## 2. Modèles et paramètres (§4 du dossier)

| Bloc | Verdict | Détail lu dans la source |
|---|---|---|
| M1 park2023 | ✔ | α = 1; normalisation min-max dans [0, 1]; décroissance 0,995 par heure de jeu depuis la dernière récupération; importance de 1 à 10; seuil de réflexion 150 (2 à 3 réflexions par jour); 25 agents pendant 2 jours, `gpt3.5-turbo`. La phrase sur les « thousands of dollars » est au **§8.2** |
| M2 du2024 | ✎ | Configuration exacte : 3 agents, 2 rondes, `gpt-3.5-turbo-0301`, plafond vers 4 rondes (fig. 10b). **La citation de prompt du dossier n'existe pas telle quelle.** Prompt GSM8K verbatim : « These are the solutions to the problem from other agents: … Using the solutions from other agents as additional information, can you provide your answer to the math problem? ». Variante la plus proche, le prompt « Short » de la fig. 3 : « Based off the opinion of other agents, can you give an updated response ». L'énoncé « il n'y a pas de vote final » n'est pas explicite dans le texte : le papier dit seulement que la population « almost always converges » vers une réponse commune (non vérifiable) |
| M3 li2024 | ✔ | V(sᵢ) = Σ sim; fréquence pour les tâches fermées, BLEU pour les tâches ouvertes; T = 1,0, top-p = 1,0; N jusqu'à 40, 10 pour le débat. **Question ouverte 5 tranchée** : fig. 1, « ensemble size scales up to 15 » |
| M4 choi2025 | ✔ | Déf. 1 et 2, théorème 2 (martingale); N = 5; T ∈ {2, 3, 5}; Qwen2.5-7B, Qwen2.5-32B, Llama3.1-8B; 7 bancs d'essai |
| M5 ashery2025 | ✔ | N = 24, W = 10 (W = 2 pour le biais), H = 5; +100 / −50; bascule à 95 % des 3N dernières interactions. Masse critique : N = 48 et H = 3 pour Llama-3-70B; 10 exécutions (3 pour Llama-3-70B). Précisions : les courbes de la fig. 1 sont des moyennes sur **40 exécutions**; la fig. 2 repose sur 40, 27 ou 20 exécutions selon le modèle. **Question ouverte 5 tranchée** : le tableau S3 donne des **effectifs** d'agents, la fig. 3 des **pourcentages**, d'où les extractions discordantes |
| M6 riedl2026 | ✔ | Les trois équations sont exactes; N = 10; GPT-4.1 (2025-04-14); 200 expériences par condition. La condition ToM **inclut** la persona (prompt de l'annexe A.1). **Sections** : interventions au §2 (*Method*), capacité d'émergence au §4.1, I₃ au §4.2 |
| M7 kim2025 | ✔ | Hasard : 1/3 (HELM), 0,127 (HF); coefficients du tableau 1 exacts; R² = 0,340, 0,613 et 0,415. Le 3ᵉ jeu s'appelle « Resumes » dans la source |
| M8 chen2026cofail | ✔ | « accuracy cannot exceed one minus beta » (résumé) |
| M9 miller2024 | ✎ | Éq. 1, 2, 4 et 9 et facteur (1 + 2/K)/3 exacts. **Éq. 7** : la source écrit SE_{A−B} = **√(** SE²_A + SE²_B − 2·SE_A·SE_B·Corr **)**. Le dossier omet la racine carrée |
| M10 yao2024 | ✔ | pass^k = E_tâche[C(c, k)/C(n, k)], au §3 |
| M11 rahman2025 | ✔ | 2 chemins; 3 prompts par itération; consignes de phase présentes; 30 essais × 18 itérations. Précision sur le modèle : Qwen 2.5 Instruct 14B a servi au développement local; l'évaluation finale utilise un GPT en nuage |
| M12 cemri2025 | ✎ | Les 14 prévalences par mode, κ = 0,88, 0,77 et 0,79, 1 642 traces et 7 systèmes sont conformes à v3. **Les totaux FC1 41,8 %, FC2 36,9 % et FC3 21,3 % ne figurent pas dans v3** : ils viennent de la fig. 2 de **v2** (41,77 / 36,94 / 21,30 %, sur plus de 200 traces seulement). En sommant les modes de v3, on obtient environ **44,2 / 32,4 / 23,5 %** (calcul de l'auteur, non lu). Correction : donner les totaux de v3 calculés en le signalant, ou les retirer |

---

## 3. Résultats cibles (§5 du dossier)

| # | Verdict | Constat |
|---|---|---|
| R1 | ✔ | « a shared social convention is established by population round 15 in all cases, except for Llama-2-70b-Chat » |
| R2 | ✎ | **Valeur p mal attribuée.** Le non-biais individuel (premier coup, mémoire vide, 10 000 tirages) correspond à **p = 0,116** (tableau 1, interaction 1). La valeur p = 0,110 porte sur l'**interaction 2**, agrégée sur les configurations de mémoire. À l'interaction 3, p < 2,2 × 10⁻¹⁶. Le critère d'acceptation (test au premier coup) doit citer 0,116 |
| R3 | ✔ | De 2 % (Llama-3-70B-Instruct) à 67 % (Llama-2-70b-Chat); référence humaine de 25 % |
| R4 | ✔ | Arithmétique : 67,0 ± 4,7 / 69,0 ± 4,6 / 81,8 ± 2,3; GSM8K : 77,0 / 81,0 / 85,0. Le « vote » correspond à la ligne *Multi-Agent (Majority)* |
| R5 | ✔ | 0,7205 / 0,7050 (T = 5) / 0,7691 |
| R6 | ✔ | 0,73 → 0,85 et 0,29 → 0,39 à N = 40; Llama2-13B en ensemble à 59 % contre 54 % pour Llama2-70B seul |
| R7 | ✔ | 52,2 → 86,7 → 100 % contre 61,1 → 71,7 → 72,8 % (fig. 2b); 53,95 s contre 0,334 s par essai |
| R8 | ✔ | Environ 60 % sur HELM (hasard 1/3); 0,423 sur HF (hasard 0,127) |
| R9 | ✔ | Identité énoncée dans le résumé |
| R10 | ✔ | 4 → 32 %, 4 → 52 %; densité 0,167 → 0,74; 5 présents sur 12 invités; 1,3 % (6/453) |
| R11 | ✔ | κ = 0,88 entre humains; κ = 0,77 pour le juge LLM |
| R12 | ✔ | Émergence significative dans les trois conditions (p = 1,5 × 10⁻¹⁶, 6,6 × 10⁻⁷ et 0,02); I₃ significatif seulement pour ToM (persona incluse), p = 3,5 × 10⁻¹⁴ |

## 4. Autres affirmations chiffrées

| Passage | Verdict | Constat |
|---|---|---|
| §7.1 atil2024 | ✔ | « accuracy variations up to 15% » et écart meilleur–pire « up to 70% » |
| §7.4 chen2024drift | ✔ | GPT-4 sur les nombres premiers : 84 % (mars 2023) → 51 % (juin 2023) |
| §7.2 et §10 anthropic2025 | ✔ | +90,2 % contre un Opus 4 seul; environ 15 fois les jetons d'une conversation; 80 % de la variance sur BrowseComp; patron orchestrateur-travailleurs |
| §3.1 wang2023sc | ✔ | GSM8K +17,9 % |
| §1 et §10 zhang2025 | ✔ | « MAD often fail to outperform … Chain-of-Thought and Self-Consistency » (9 bancs d'essai, 4 modèles) |
| chen2024calls, li2026simas | ✔ | Non-monotonie énoncée dans les deux résumés |
| §10 han2025 | ✔ | « best average performance » avec moins de jetons; agents choisis selon le contenu du tableau |
| §10 salemi2025 | ✔ | +13 à 57 % de succès relatif; agent central qui publie les requêtes |
| §10 mao2026 | ✎ | « gains of **up to** 10.5 percentage points » sur SWE-bench Verified, coût « **roughly** 50% » plus bas; agents qui réclament des sous-tâches |
| §10 pal2026 | ✔ | Citation exacte; portefeuilles plus larges et plus résilients qu'un *best-of-N*; quatre rôles |
| §10 kimd2026 | ✔ | 9,98 % des sous-ensembles de taille 3, sur MMLU-Pro |
| §10 lee2024 | ✔ | Propagation « like a computer virus »; défense *LLM Tagging* |
| §6.3 bahrami2010 | ✔ | « two heads were actually worse than the better one » quand les sensibilités diffèrent beaucoup (résumé) |
| C5 robinson2005 | ✔ | Phéromone de piste négative, signal « no entry » (*Monomorium pharaonis*) |
| §9 MCP | ✔ | Tous les changements listés figurent dans le changelog : sans état, `server/discover`, `subscriptions/listen`, extension des tâches avec `tasks/update`, MRTR, `ttlMs`/`cacheScope`, dépréciations, CIMD. AAIF : fonds dirigé de la Linux Foundation, gouvernance et processus SEP inchangés |
| §9 A2A | ✔ | Liaisons aux §9, §10 et §11; objets; états (plus `TASK_STATE_UNSPECIFIED`); sondage, flux et *push*. Aucun pub/sub entre pairs, mais seulement d'après une lecture outillée, comme le dossier le signale |
| C3, C10, §7.3 et §8.1 (skill `claude-api`) | ✔ | Tarifs Haiku 1/5, Sonnet 5.5 2/10, Opus 5.5 4/20, Fable 5.1 10/50; lectures de cache à 0,20, 0,20 et 0,25 (environ 0,1 × pour Haiku); Haiku à 200 K de contexte. Contraintes : raisonnement non désactivable et effort `medium` par défaut sur Opus 5.5; `between_tools` (effort ≤ `high`) sur Sonnet 5.5; température 400 sur Opus et Fable, valeurs non par défaut 400 sur Sonnet 5.5; `tool_choice` forcé 400; *fallbacks* recommandés par défaut; refus; rétention de 30 jours pour Fable; `effort` en erreur sur Haiku 4.5; lot à −50 %. **Non vérifié** : le cumul du rabais de lot avec le cache |

## 5. Questions ouvertes du dossier (§12.5) tranchées par cette vérification

- Taille d'ensemble de la fig. 1 de li2024 : **N = 15** (confirmé).
- Sections de riedl2026 : §2, §4.1 et §4.2.
- Masse critique d'ashery2025 : la fig. 3 donne des pourcentages, le tableau S3 des effectifs. La discordance venait de là.
- Restent ouvertes : la définition du bénéfice collectif dans bahrami2010 (texte intégral non lu), la date d'entrée d'A2A dans l'AAIF et le contenu en bits de la danse (haldane1954).

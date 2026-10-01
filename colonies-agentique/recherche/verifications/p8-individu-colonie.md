# Vérification indépendante du dossier P8 — Individu et colonie

Vérifié le 2026-10-01. Vérificateur indépendant : chaque source a été consultée directement, sans me fier aux lectures déclarées dans le dossier.

**Méthode.** Métadonnées : API Crossref (DOI par DOI), PubMed (PMID), Europe PMC, OpenAlex, API arXiv, OpenReview (recherche), pages d'éditeur. Texte intégral lu : PMC (Sasaki 2013, I'Anson Price 2019, Hong et Page 2004, List 2009, Sumpter et Pratt 2009, Tautz 2004; Planqué 2010 par Europe PMC XML); PDF extraits (PyMuPDF) de Grüter 2011 (copie libre du laboratoire Ratnieks), Thompson 2014 (AMS), Krogh et Vedelsby 1995 (NIPS), Galton 1907 (MIT), et des versions arXiv de Li 2024 (v2), Chen 2024 (v2) et de la version NeurIPS (copie NSF PAR), Kim 2025 (v3), Kapoor 2025 (v1), MoA (v1), Self-MoA (v1), Snell 2024 (v1), Feinerman et Korman 2017 (v1), Luebbert et Pachter 2024 (v1); SEP (page entière); billet Anthropic; page des tarifs de l'API Claude. Figures lues en image : Sasaki 2013 (Éq. 1–3, Fig. 2, 3), Grüter 2011 (Fig. 2, 3). Les calculs [I] du dossier ont été refaits par du code indépendant, sauf la numérisation de la Fig. 3 (relue à l'œil seulement). La grille de `chen_thm4` a servi de spécification, et j'ai lancé une fois `p8_check.py chen_thm4` pour comparer les décomptes.

**Accès refusés, non contournés.** Le SI de Sasaki 2013 (docx PMC) et, par intermittence, la page PMC de Marshall 2009 renvoient une vérification reCAPTCHA : non contournée, donc SI toujours non lu. Cell Press, Wiley, OUP, Hindawi et figshare : 403. Le quota de WebSearch s'est épuisé (200 sur 200) en cours de route; la fin du travail a passé par les API directes. L'outil scientifique (Consensus) n'a pas été appelé.

**Légende (statut d'une référence).** *Confirmée* = métadonnées exactes et affirmations retrouvées. *Corrigée* = la source existe mais le dossier contient une erreur ou une imprécision à corriger. *Non vérifiable* = je n'ai pas pu trancher.
**Légende (affirmation chiffrée).** [T] texte intégral lu; [R] résumé lu; [M] métadonnées seulement; [S] source secondaire lue (nommée); [I] inférence ou calcul de ma part.

## 1. Références : métadonnées

### 1.1 Fourmis (portée)

| Clé | Statut | Correction ou complément | URL consultée |
|---|---|---|---|
| Sasaki2013 | Corrigée (contenu) | Métadonnées exactes (5 auteurs, 110(34), 13769–13773; en ligne 2013-07-29, imprimé 2013-08-20; PMC3752206). Corrections de contenu : voir §2 (M1) — exclusions d'essais, effectifs, « limites déclarées ». SI non lu (reCAPTCHA). | https://pmc.ncbi.nlm.nih.gov/articles/PMC3752206/ |
| SasakiPratt2012 | Confirmée | Résumé [R] confirmé; « ≈ 90 % avec 2 ou 8 nids » retrouvé [S] (résumé de recherche reprenant AIP Inside Science et ScienceDaily, pages non ouvertes : colonies à 90 % dans les deux cas, fourmi isolée souvent fautive à 8 nids; 8 nids = 4 bons et 4 médiocres selon un résumé de recherche citant Sasaki, Pratt et Kacelnik 2018). Texte de l'article (Cell Press) : 403. | https://pubmed.ncbi.nlm.nih.gov/23058797/ |
| SasakiPratt2011 | Confirmée | 22(2), 276–281; en ligne 2011-01-18. Résumé : Temnothorax, effet de leurre chez l'individu, absent chez la colonie. | https://api.crossref.org/works/10.1093/beheco/arq198 |
| SasakiPratt2018 | Confirmée | 63, 259–275; en ligne 2017-10-04. | https://pubmed.ncbi.nlm.nih.gov/28977775/ |
| FeinermanKorman2017 | Confirmée | 220(1), 73–82; arXiv v1 2017-01-17, 24 p. Phrase « précision … croît avec la taille du groupe (Sasaki et al. 2013) » retrouvée [T] (§7.6 du dossier justifié). | https://arxiv.org/abs/1701.05080 |
| Czaczkes2015 | Confirmée | 60, 581–599; en ligne 2014-10-24. Résumé : phéromone et mémoire individuelle complémentaires [R]. | https://pubmed.ncbi.nlm.nih.gov/25386724/ |
| Gruter2011 | Confirmée | 65(2), 141–148; en ligne 2010-07-20. [T] via la copie du laboratoire (voir §2, T8.7). | https://www.socialinsect-research.com/resources/Gr%C3%BCteretal.2011.pdf |
| FranksRichardson2006 | Confirmée | 439(7073), 153. Résumé : *T. albipennis*, enseignement en tandem [R]. | https://pubmed.ncbi.nlm.nih.gov/16407943/ |

### 1.2 Abeilles (portée)

| Clé | Statut | Correction ou complément | URL consultée |
|---|---|---|---|
| Gruter2008 | Confirmée | 275(1640), 1321–1327; PMC2602683. « 93 % des cas » retrouvé [R]. | https://pubmed.ncbi.nlm.nih.gov/18331980/ |
| Gruter2010 | Non vérifiable (attribution) | Métadonnées exactes; **DOI manquant : 10.1016/j.cub.2010.06.052**; 20(16), R683–R685 (2010-08-24). Le résumé (seul texte accessible) ne dit rien de « copier quand c'est incertain » (§6.4 du dossier) : attribution non retrouvée. L'alternative Grüter et Farina 2009 existe : *TREE* 24(5), 242–247, 10.1016/j.tree.2008.12.007 [M]. | https://pubmed.ncbi.nlm.nih.gov/20728057/ |
| IAnsonPrice2019 | Corrigée (contenu) | Métadonnées exactes (5(2), eaat0450; PMC6374110). Erreur de contenu sur T8.8 : voir §2. | https://pmc.ncbi.nlm.nih.gov/articles/PMC6374110/ |
| Dong2023 | Confirmée | 379(6636), 1015–1018; en ligne 2023-03-09. Résumé [R] : désordre, erreurs d'angle, distance « fixée pour la vie ». | https://pubmed.ncbi.nlm.nih.gov/36893231/ |
| DornhausChittka2004 | Confirmée | 55(4), 395–401. Résumé retrouvé [R] sur Springer (le dossier disait [S]) : colonies à danses obscurcies à peine moins bonnes en habitat tempéré, nettement moins en forêt tropicale. | https://link.springer.com/article/10.1007/s00265-003-0726-9 |
| Menzel2005 | Confirmée | 102(8), 3040–3045 (15 auteurs; « et al. » correct). | https://pubmed.ncbi.nlm.nih.gov/15710880/ |
| Giurfa2001 | Confirmée | 410(6831), 930–933. | https://pubmed.ncbi.nlm.nih.gov/11309617/ |
| Esch2001 | Confirmée (DOI ajouté) | **10.1038/35079072**; 411(6837), 581–583. Résumé [R] : tunnel étroit → distance exagérée. | https://api.crossref.org/works/10.1038/35079072 |
| Marshall2009 | Non vérifiable (partiel) | Métadonnées exactes; PMC2827444. Éq. 4.1, condition w = k grands et §6.3 (k = 0, convergence asymptotique vers le modèle de diffusion) confirmés par extraction WebFetch [S]; **numéro de figure non tranché** (extraction : Fig. 4; dossier : Fig. 5; page PMC en reCAPTCHA). Lemme de Neyman-Pearson cité à propos du SPRT [S]. | https://pmc.ncbi.nlm.nih.gov/articles/PMC2827444/ |

### 1.3 Cadre théorique (portée)

| Clé | Statut | Correction ou complément | URL consultée |
|---|---|---|---|
| Condorcet1785 | Confirmée [M] | Existence confirmée : Gallica (titre « … rendues à la pluralité des voix »), archive.org (1785, Paris, Imprimerie Royale; l'exemplaire archive.org écrit « rendus »). Texte non lu, comme le dossier le dit. | https://gallica.bnf.fr/ark:/12148/bpt6k417181 |
| SEPJury | Confirmée [T] | Auteurs Franz Dietrich et Kai Spiekermann (© 2021, première publication 2021-11-17). §2.5 et §3.2 existent; « the group cannot beat the facts » et limite < 1 sauf compétence conditionnelle retrouvés [T]; Boland 1989 (*The Statistician* 38(3), 181–189) et Karotkin et Paroush 2003 (*SCW* 20(3), 429–441) cités; Dietrich 2008 existe (« The premises of Condorcet's jury theorem are not simultaneously justified »). | https://plato.stanford.edu/entries/jury-theorems/ |
| Ladha1992 | Confirmée | 36(3), 617–634 (pages confirmées par la bibliographie du SEP; Crossref ne donne que 617). Résumé [R] : « for large groups … fairly general conditions; for small groups … severe ». | https://api.crossref.org/works/10.2307/2111584 |
| DietrichSpiekermann2013 | Confirmée | 29(1), 87–120; en ligne 2013-04-03. Résumé [R] : « large crowds are fallible but better than small groups ». | https://api.crossref.org/works/10.1017/S0266267113000096 |
| HongPage2004 | Corrigée (contenu) | Métadonnées exactes (PMC528939). Théorème 1 : voir §2 (M4). | https://pmc.ncbi.nlm.nih.gov/articles/PMC528939/ |
| Page2007 | Confirmée [S] | Existence, éditeur et année confirmés par la bibliographie de Thompson (réf. [3], pp. 162 et 165 citées). Énoncé « diversity prediction theorem » retrouvé [S] sur Wikipédia (« Wisdom of the crowd »); livre non lu. | https://en.wikipedia.org/wiki/Wisdom_of_the_crowd |
| KroghVedelsby1995 | Confirmée | *NIPS 7*, 231–238 (8 p., la première page porte 231). Éq. 5, 6, 10 retrouvées [T]. | https://papers.nips.cc/paper_files/paper/1994/file/b8c37e33defde51cf91e1e03e51657da-Paper.pdf |
| Thompson2014 | Confirmée | **Pagination résolue : 1024–1030**; vol. 61, n° 9 (octobre 2014). Titre complet confirmé (Crossref tronque le sous-titre). | https://www.ams.org/journals/notices/201409/rnoti-p1024.pdf |
| Grim2019 | Confirmée | 86(1), 98–123; en ligne 2018 (OpenAlex). Résumé [R] confirmé. | https://api.crossref.org/works/10.1086/701070 |
| Romaniega2023 | Confirmée | arXiv v3 2025-01-07; résumé [R] confirmé. | https://arxiv.org/abs/2307.04709 |
| Galton1907 | Confirmée | *Nature* 75(1949), 450–451; DOI 10.1038/075450a0 (ajouté). Chiffres retrouvés [T] (voir §2, T8.14). | https://api.crossref.org/works/10.1038/075450a0 |
| Wallis2014 | Confirmée | 29(3), 420–424 (arXiv *journal_ref*). Résumé [R] : moyenne « exactly coinciding with the outcome ». | https://arxiv.org/abs/1410.3989 |

### 1.4 Agentique (portée)

| Clé | Statut | Correction ou complément | URL consultée |
|---|---|---|---|
| Li2024 | Confirmée | TMLR 10/2024 (en-tête du PDF; OpenReview : accepté TMLR, 2024-10-23); arXiv v2 2024-10-11. | https://arxiv.org/abs/2402.05120 |
| Wang2023SC | Confirmée | ICLR 2023 (v4 = version finale); +17,9 / +11,0 / +12,2 / +6,4 / +3,9 retrouvés [R]. | https://arxiv.org/abs/2203.11171 |
| Wang2024MoA | Confirmée | v1 exacte. Complément : ICLR 2025 (spotlight, OpenReview). | https://arxiv.org/abs/2406.04692 |
| Li2025SelfMoA | Confirmée | v1 exacte. Complément : accepté par TMLR (OpenReview, 2026-03-05). | https://arxiv.org/abs/2502.00674 |
| Chen2024 | Corrigée | arXiv v1 et v2 exacts (v2 2024-06-04). **Titre NeurIPS** : la fiche OpenReview/NeurIPS (poster) dit « Are More **LLM** Calls All You Need? Towards the Scaling Properties of Compound AI Systems »; le PDF camera-ready (copie NSF PAR, en-tête « 38th NeurIPS 2024 ») dit « **LM** Calls ». Les deux existent; citer la source du titre. Question §8.5 tranchée : voir §2 (M5). | https://par.nsf.gov/servlets/purl/10596770 |
| Wang2024ACL | Confirmée | 6106–6131; DOI 10.18653/v1/2024.acl-long.331; résumé [R] confirmé. | https://api.crossref.org/works/10.18653/v1/2024.acl-long.331 |
| Kapoor2025 | Confirmée | TMLR confirmé (OpenReview « Accepted by TMLR »; date de publication 2025-06-13). « Mai 2025 » du dossier non confirmé (acceptation possible en mai). | https://arxiv.org/abs/2407.01502 |

### 1.5 Références ajoutées

| Clé | Statut | Correction ou complément | URL consultée |
|---|---|---|---|
| Kim2025Scaling | Confirmée | Premier auteur Yubin Kim, 20 auteurs; v1 2025-12-09, v3 2026-04-08. Aucune version éditeur trouvée (recherche OpenReview négative, non exhaustive). | https://arxiv.org/abs/2512.08296 |
| Snell2024 | Confirmée | v1 2024-08-06. Complément : ICLR 2025 (oral), titre modifié (« … than Scaling Parameters for Reasoning »). | https://arxiv.org/abs/2408.03314 |
| Brown2024 | Confirmée [R] | v3 2024-12-30; couverture log-linéaire; vote et modèles de récompense plafonnent. | https://arxiv.org/abs/2407.21787 |
| Wu2024 | Confirmée [R] | v3 2025-03-03; Llemma-7B + recherche arborescente > Llemma-34B. | https://arxiv.org/abs/2408.00724 |
| Smit2024 | Confirmée [R] | v3. | https://arxiv.org/abs/2311.17371 |
| Choi2025 | Confirmée [R] | Auteurs Hyeong Kyu Choi, Xiaojin Zhu, Sharon Li; NeurIPS 2025 spotlight (OpenReview). Martingale et « vote explique l'essentiel » retrouvés. | https://arxiv.org/abs/2508.17536 |
| Zhang2025 | Confirmée [R] | Titre complet : « … We Must Rethink Evaluation and Embrace Model Heterogeneity ». | https://arxiv.org/abs/2502.08788 |
| Du2023 | Confirmée [R] | v1 2023-05-23. | https://arxiv.org/abs/2305.14325 |
| KimCorr2025 | Confirmée | ICML 2025 (poster, OpenReview); « over 350 LLMs », 60 % [R]. | https://arxiv.org/abs/2506.07962 |
| ChenJ2026 | Confirmée [R] | Josef Chen; v1 2026-06-25; β = 0,052 contre 0,023 (copule gaussienne à 67 modèles), mathématiques ouvertes. | https://arxiv.org/abs/2606.27288 |
| Douven2026 | Confirmée [R] | v2 2026-07-22; 15 LLM, 254 questions, 35,8 % → 8,9 %. | https://arxiv.org/abs/2607.18269 |
| Schoenegger2024 | Confirmée [R] | 10(45), eadp1528; 12 LLM, 31 questions, 925 prévisionnistes (résumé lu; le dossier disait [S]). | https://api.crossref.org/works/10.1126/sciadv.adp1528 |
| Anthropic2025 | Corrigée (usage) | Billet publié le 2025-06-13; auteurs exacts. +90,2 %, 15 ×, 80 % retrouvés [T], mais l'appariement du dossier est faux : voir §2 (M14). | https://www.anthropic.com/engineering/multi-agent-research-system |
| SasakiPrattKacelnik2018 | Confirmée | **Article n° 12730**, *Sci. Rep.* 8(1) (« numéro à confirmer » du §8.10 tranché). Tug of War (individus) contre Sequential Choice (colonies) [R]. | https://pubmed.ncbi.nlm.nih.gov/30143679/ |
| EdwardsPratt2009 | Confirmée (DOI ajouté) | **10.1098/rspb.2009.0981**; 276(1673), 3655–3661. Résumé [R] : pas d'effet de leurre chez la colonie. | https://pubmed.ncbi.nlm.nih.gov/19625319/ |
| Nicolis2011 | Confirmée [R] | e18901; l'optimum de la force de rétroaction dépend du nombre d'options. | https://pubmed.ncbi.nlm.nih.gov/21541321/ |
| Robinson2011 | Confirmée [R] | e19981; *T. albipennis*; seuil simple suffisant. | https://pubmed.ncbi.nlm.nih.gov/21629645/ |
| KaoCouzin2014 | Confirmée [R] | 281(1784), 20133305. | https://pubmed.ncbi.nlm.nih.gov/24759858/ |
| Mann2018 | Confirmée | 115(44), E10387–E10396 (pages confirmées par Europe PMC). | https://pubmed.ncbi.nlm.nih.gov/30322917/ |
| Planque2010 | Confirmée | e11664. Beckers 1989 : métadonnées exactes (*Psyche* 96(3–4), 239–256, 10.1155/1989/94279); le lien taille de colonie → mode de recrutement est retrouvé [T] dans Planqué (Europe PMC XML); le contenu « apprentissage contre patrons émergents » reste **non vérifiable** (résumé de Beckers inaccessible), comme le dossier le dit (§7.17). | https://pubmed.ncbi.nlm.nih.gov/20694195/ |
| Reina2018 | Confirmée [R] | 8, 4387; Hick-Hyman, Piéron, Weber. | https://pubmed.ncbi.nlm.nih.gov/29531351/ |
| Lorenz2011 | Confirmée (DOI ajouté) | **10.1073/pnas.1008636108**; 108(22), 9020–9025; N = 144 [R]. | https://pubmed.ncbi.nlm.nih.gov/21576485/ |
| List2009 | Corrigée (contenu) | Métadonnées exactes (PMC2689716). Erreur sur le critère de consensus : voir §2 (M9). | https://pmc.ncbi.nlm.nih.gov/articles/PMC2689716/ |
| SumpterPratt2009 | Confirmée | PMC2689713. « 3,33 % » bien présent au §4(d) du texte [T] (voir §2, pré-tests). | https://pmc.ncbi.nlm.nih.gov/articles/PMC2689713/ |
| Okada2014 | Confirmée [R] | 4, 4175; PMC3935192. Texte intégral non lu par moi non plus. | https://pubmed.ncbi.nlm.nih.gov/24569525/ |
| BeekmanLew2008 | Confirmée [R] | 19(2), 255–261; en ligne 2007-12-06. | https://api.crossref.org/works/10.1093/beheco/arm117 |
| ShermanVisscher2002 | Confirmée [R] | 419(6910), 920–922. Résumé retrouvé (le dossier disait [S]). | https://pubmed.ncbi.nlm.nih.gov/12410309/ |
| DonaldsonMatasci2012 | Confirmée | 66(4), 583–592. Erratum confirmé : 66(6), 993, 10.1007/s00265-012-1352-1. | https://api.crossref.org/works/10.1007/s00265-012-1352-1 |
| Tautz2004 | Confirmée [T] | PMC449896; chiffres retrouvés (voir §2, M10). | https://pmc.ncbi.nlm.nih.gov/articles/PMC449896/ |
| Luebbert2024 | Confirmée [T] | v1 2024-05-08, 16 p. Tautz 2004 figure au Tableau 2 (« R² ≥ 0,99 ») avec 0,9899; Srinivasan 2000 examiné; Esch 2001 non examiné; période 1996–2010. Aucune publication en revue trouvée (Crossref). | https://arxiv.org/abs/2405.12998 |
| SrinivasanTautzStuart2024 | Confirmée | arXiv 2408.11520 (2024-08-21). Deux réponses *J. Comp. Physiol. A* 211(5–6) confirmées : 637–640 (Srinivasan, seul auteur, 10.1007/s00359-025-01763-4) et 641–644 (Stuart, seul auteur, 10.1007/s00359-025-01765-2); « autres » non identifiées. | https://arxiv.org/abs/2408.11520 |
| Cheeseman2014 | Confirmée | 111(24), 8949–8954 (8 auteurs). Résumé [R] : décalage d'horloge par anesthésie → carte métrique. | https://pubmed.ncbi.nlm.nih.gov/24889633/ |
| Cheung2014 | Corrigée | **Pages E4396–E4397** (Europe PMC; OpenAlex « E4402 » est faux). Lettre sans résumé; 13 auteurs. | https://europepmc.org/article/MED/25277972 |

### 1.6 Références citées dans le texte, hors tableaux

| Référence | Statut | Remarque | URL |
|---|---|---|---|
| Schürch et Grüter 2014 | Confirmée | *PLoS ONE* 9(8), e104660 (2014-08-20); citée comme réf. 29 par I'Anson Price. | https://api.crossref.org/works/10.1371/journal.pone.0104660 |
| Alon et al. 2011 | Confirmée | *Comb. Probab. Comput.* 20(4), 481–502, 10.1017/s0963548311000125; citée dans Feinerman et Korman (aucune accélération notable sur grille) [T]. | https://api.crossref.org/works/10.1017/s0963548311000125 |
| Weng 2025 | Confirmée | « Do as We Do, Not as You Think: the Conformity of LLMs », ICLR 2025 (oral). | https://arxiv.org/abs/2501.13381 |
| Srinivasan et al. 2000 | Confirmée | *Science* 287(5454), 851–853. | https://api.crossref.org/works/10.1126/science.287.5454.851 |
| Pratt et Sumpter 2006 | Confirmée [M] | *PNAS* 103(43), 15906–15910, 10.1073/pnas.0604801103 (espèce *T. curvispinosus* : reprise du dossier P5, non relue). | https://api.crossref.org/works/10.1073/pnas.0604801103 |
| Seeley et Buhrman 2001 | Confirmée [M] | *Behav. Ecol. Sociobiol.* 49(5), 416–427. | https://api.crossref.org/works/10.1007/s002650000299 |
| Seeley 2010 (*Honeybee Democracy*) | Non vérifiable (non consultée) | Existence établie par la vérification P5; non rouverte ici. | — |

## 2. Résultats cibles et paramètres

### 2.1 Cibles de reproduction

| ID | Verdict | Détail |
|---|---|---|
| T8.1 | **Confirmé** | α_col 7,4 lx et α_ind 32,3 lx (P = 0,0047); λ_col 0,80 et λ_ind 0,93 (P = 0,050); après ajout de données : 6,6 / 30,9 (P = 0,0020) et 0,78 / 0,89 (P = 0,052) [T]. Rapports α : 7,4/32,3 = 0,229 et 6,6/30,9 = 0,214 [I], donc « 0,21 à 0,23 » exact. Asymptotes de la Fig. 2A ≈ 0,80 et ≈ 0,915 [I, image]; légende « < 40 lx » [T]. **Incohérence signalée par le dossier : réelle.** L'Éq. 1 imprimée est P = 0,5 + 0,5·λ/(1 + e^(−(x−α)/β)) [T, image] (asymptotes 0,90 et 0,965 pour λ = 0,80 et 0,93), alors que la Fig. 2A s'accorde avec une asymptote ≈ λ [I]. Le SI (Table S1) reste nécessaire pour trancher. |
| T8.2 | **Confirmé** pour les paramètres; valeurs numérisées non vérifiables au ±0,01 | q_A = 0,20; q_B de 0,19 à 0,001; c = 1,1; population 100 : légende de la Fig. 3 [T]. Éq. 2 et 3 lues en image [T] : conformes au dossier. N_A, N_B = fourmis engagées + 20 % des fourmis en évaluation; colonie « choisit » à > 50 % dans a ou b [T]. Courbes de la Fig. 3 relues à l'œil : 5 % → ≈ 0,59 / 0,65; croisement ≈ 59–60 % à ≈ 0,89; 99 % → ≈ 1,00 / 0,957; cohérent avec le tableau du dossier [I]. T et taux de transition : SI non lu, **non vérifiable**. Pré-test Éq. 2 refait : 5 % → 0,545; 20 % → 0,691; 40 % → 0,837; 60 % → 0,923; 80 % → 0,972; 99,5 % → 0,999 [I], identique au dossier. |
| T8.3 | **Confirmé** [I] | 0,6480; 0,7535; 0,9791; 0,7366; 0,8779 (recalcul exact). |
| T8.4 | **Confirmé** [I] | ρ = 0,05 : 0,795 (n = 101) et limite 0,8145; ρ = 0,1 : 0,728 et 0,736; ρ = 0,2 : 0,670 et 0,672 (bêta-binomial; limite par intégration numérique). |
| T8.5 | **Confirmé**, avec réserve | Identité retrouvée [T] (Éq. 5–6 puis 10 de Krogh et Vedelsby : e = ē − a, puis E = Ē − A). Mon essai (10⁴ tirages) : écart absolu maximal 5,7 × 10⁻¹³; l'écart **relatif** atteint 1,8 × 10⁻⁹ quand (c − θ)² ≈ 0. Le critère « relatif ≤ 10⁻⁹ » peut donc échouer sans bogue : prévoir un seuil absolu ou mixte. |
| T8.6 | **Confirmé** | Table 1 de Hong et Page [T] : 20 agents, l = 12 : 93,78 / 94,72; 10 agents, l = 20 : 93,52 / 96,08; 50 essais (et 10 agents, l = 12 : 92,56 / 94,53; tailles de réserve de 1 320 et 6 840 agents exactes). Ma réplication indépendante (n = 2 000, k = 3, 24 fonctions, relais séquentiel, 20 équipes aléatoires par fonction) [I] : l = 12, équipes de 20 : meilleurs 93,74 (σ 0,86), aléatoires 94,76 (0,42), écart +1,02 ± 0,84, aléatoires > meilleurs 24/24; l = 20, équipes de 10 : 93,25 (1,10) et 95,93 (0,28), +2,68 ± 1,17, 24/24. Conforme à la réplication du dossier (+0,99 et +2,26) et aux critères d'acceptation. Thompson p. 1028 : « less well than the median performance of 200 random groups of ten agents » [T]. |
| T8.7 | **Confirmé** [T, figures lues] | Visites 0 / 1 / 2 / 3 / 4 : 50,5 % (98) / 74,6 % (71) / 86,7 % (45) / 95,3 % (43) / 94,1 % (34) (Fig. 2a). *Remarque* : le texte écrit « 52 % » pour les naïves (51 sur 98 à droite); la figure donne 50,5 %. Piste seule 1 / 5 / 20 passages : 62 % (125) / 64,6 % (178) / 70,2 % (208) (Fig. 2b; N = 333 = 125 + 208). Conflit (Fig. 3) : 3 visites contre piste forte 100 % (34), faible 94,2 % (49); 1 visite contre forte 82 % (41), faible 87,2 % (34); 84,4 % pour 1 visite (situations 3 et 4 réunies). Contrôle 90,5 % (19/21); temps médian 5,9 s contre 5,7 s (z = −0,6; p = 0,55). Pas d'effet de la force de piste (z = 0,39; p = 0,69). |
| T8.8 | **Corrigé** | Retrouvés [T] : 58,5 % de danses désorientées (n = 74) contre 98,3 % d'orientées (n = 67); −0,134 contre −0,101 kg/j; χ² = 24,22; P < 0,0001; 12,9 ± 20,8 %; 17,5 ± 9,7 %; 18,96 ± 16,7 %; 24,88 ± 43,6 %; 10 répétitions par combinaison; 0,5 M, 25 µl, 18 jours. **Correction** : le +22,59 ± 11,1 % (habitat éphémère, 5 jours, densité 0,1) correspond à une variation **élevée** (SD = moyenne/4), pas « faible variation ». Le texte ne chiffre que 5 des 8 cellules; les trois autres (signe seulement via la discussion et la Fig. 4, non lue en image) restent à relire pour le critère « ≥ 7 sur 8 ». Code de Schürch et Grüter 2014 : non lu. |
| T8.9 | **Confirmé** [R] | 10–15° en bordure basse des erreurs réelles; ≥ 30° non bénéfique; 15° bénéfique si sources rares; ≤ 10° bénéfique partout; 0–5° succès aux sources connues, échecs aux nouvelles. La grille (0, 5, 10, 15, 30, 45°) est un choix du dossier [I]; paramètres du modèle : non vérifiables. |
| T8.10 | **Confirmé** [I] + [T] | F(K; 0,5; 0,85; 0,4) : 0,625 / 0,6456 / 0,6454 / 0,5872 / 0,501 (K = 1, 3, 5, 21, 201), K* = 3; (0,6; 0,85; 0,4) : 0,670, K* = 5 (0,711), F(201) = 0,6008; (0,4; 0,85; 0,1) : 0,400 / 0,3925, retour à 0,400. Théorème 3 [T] conforme. **Inversion du Théorème 4 confirmée** : v2 écrit « α < 1 − 1/t » (aussi dans la version NeurIPS) alors que F(3) − F(1) ≥ 0 ⇔ α ≥ 1 − 1/t (démonstration directe). Théorème 2 : mes 27 combinaisons de la grille de la Fig. 5 contredisent la classification imprimée (27/27, en lisant la 2e puce « p₁ + p₂ < 1 **et** α ≤ 1 − 1/t »; avec « ou », comme imprimé, elle chevauche la 3e); contre-exemple (0,6; 0,85; 0,4) : F(3) = 0,7043 > F(∞) = 0,6. Théorème 4 : 79/79 (α > 1 − 1/t, ±2) et 60/60 (α < 1 − 1/t, K = 1) avec la grille spécifiée (un cas à α = 1 − 1/t exactement est exclu; selon l'arrondi flottant il passe de 79 à 80). |
| T8.11 | **Confirmé** [T] | Tableau 2 de Li 2024 (K = 40, erreur-type) : GSM8K 13B 0,35 ± 3e-2 → 0,59; 70B 0,54 → 0,74; GPT-3.5 0,73 → 0,85; GPT-4 0,88. MATH 0,03 → 0,09; 0,05 → 0,11; 0,29 → 0,39; GPT-4 0,40. MMLU 0,42 → 0,51; 0,55 → 0,60; 0,59 → 0,70; GPT-4 0,77. HumanEval 0,14 → 0,18; 0,24 → 0,33; 0,67 → 0,73; GPT-4 0,88. Chess 13B 0,14 → 0,18; GPT-4 0,65. Tableau 6 : 69 / 37 / 16 % et 200 / 120 / 34 %. 10 exécutions; Debate limité à 10. |
| T8.12 | **Confirmé** [T] | β = −0,236 (p = 0,004); seuil ≈ 0,45; 94 % sur 16 couples modèle-banc (8 modèles × SWE-bench Verified et Terminal-Bench, sous-ensembles de 20 instances, p < 0,001, test binomial); amplification 17,2 × (indépendant), 7,8 × (décentralisé), 5,1 × (hybride), 4,4 × (centralisé). |
| T8.13 | **Confirmé** [T] | Tableau A1 (HumanEval, 164 tâches, 5 exécutions) : GPT-4 89,6 (87,8–90,9) à 1,93 $; warming 93,2 (92,1–93,9) à 2,45 $; retry 92,0 à 2,51 $; escalade 85,0 à 0,27 $; LATS (GPT-4) 88,0 à 134,50 $; LDB (GPT-4) 93,3 à 6,36 $ (**ligne marquée « * » : configuration que les auteurs de LDB n'avaient pas évaluée**); Reflexion 87,8 à 3,90 $. |
| T8.14 | **Confirmé** [T] | 787 cartes (13 écartées), médiane 1207 lb, poids réel 1198 lb (écart 9 lb, 0,8 %), quartiles +45 lb (3,7 %) et −29 lb (2,4 %), erreur probable ½(45 + 29) = 37 lb (3,1 %). |
| T8.15 | **Confirmé** [R] | Danse correcte exige l'apprentissage social; distance « set for life »; texte intégral non lu (comme le dossier). |

### 2.2 Hypothèses H8.x (valeurs publiées sous-jacentes)

H8.1 : « publié +0,06 et −0,03 à −0,04 » confirmé [I] par relecture de la Fig. 3 (+0,06 aux petites différences; −0,032 à −0,043 aux grandes). H8.3 : G_int de −0,04 à −0,14 confirmé [I] (−0,040 à 5 %, −0,098 à 20 %, −0,139 à 40 %, −0,107 à 60 %, −0,060 à 80 %, −0,043 à 99 %). H8.6 : seuil 0,45 [T]. H8.7 : martingale [R]. H8.8 : Self-MoA +6,6 points sur AlpacaEval 2.0 et +3,8 en moyenne [T : « 6.6 point improvement »]. H8.9 : signes cohérents avec I'Anson Price [T]. H8.2, H8.4, H8.5 : énoncés propres au dossier, sans valeur de source à contrôler.

### 2.3 Paramètres et affirmations de la section 3 (M1 à M14)

| Élément | Verdict | Détail |
|---|---|---|
| M1 — dispositif de Sasaki 2013 | **Corrigé** | Confirmés [T] : *T. rugatulus*; nid constant à 1 lx; comparaison à 7, 14, 20, 28, 39, 56 ou 112 lx; cavité de 38 mm, entrée de 2 mm, balsa de 2,4 mm; 12 h d'acclimatation, choix lu à 12 h; colonie : > 90 % des membres; 7 niveaux par sujet, 4 ordres; 106 et 112 essais; petites 20–80, grandes 150–250, individus issus de colonies de 100–130; tailles de colonie non significatives (SI Fig. S2); 20 % des fourmis en évaluation comptées; seuil de choix > 50 % en a ou b. **Corrections** : (i) 12 essais individuels ont aussi été exclus (échec à rejoindre un nid cible) et 10 essais coloniaux (9 scissions + 1 sans déplacement), pas seulement « 9 scissions »; (ii) l'article se contredit : « thirty-two colonies » pour les tests de colonies, mais « each of 16 colonies … total of 112 trials » (16 × 7 = 112); (iii) les individus étaient **présélectionnés** (ouvrières qui rapportent du couvain) : question ouverte §8.1 en partie tranchée; (iv) « limites déclarées » : c non optimisé, compromis vitesse-précision et effet de taille non significatif sont dans le texte; « individus et colonies pas comparés à échelle égale » et « résultats propres à *T. rugatulus* et au choix de nid » **ne s'y trouvent pas** (les auteurs écrivent que le schéma « may also be relevant to many other taxa »). |
| M2 — Condorcet, Galton | Confirmé | Formule et limite < 1 [T, SEP]; Galton et Wallis : voir T8.14 et §1.3. Le modèle bêta-binomial est un choix du dossier [I]. |
| M3 — identité | Confirmé | Voir T8.5. |
| M4 — Hong et Page | **Corrigé** | Confirmés [T] : anneau n = 2 000, V uniforme sur [0 ; 100], k = 3, l = 12 (1 320 agents) ou 20 (6 840), arrêt après k contrôles sans amélioration, relais séquentiel, 50 essais, Δ. **Corrections** : le Théorème 1 repose sur **quatre** hypothèses (agents « intelligents », problème difficile, diversité, meilleur agent unique), pas trois; l'énoncé de Hong et Page dit N₁ < N (Thompson cite « N ≥ N₁ »). La critique de Thompson (V injective, copies illimitées, aucun lien avec l'expérience, p. 1028) est confirmée [T]. |
| M5 — Chen 2024 | Confirmé, une imprécision | Notations, Définition 1, Lemme 1, Théorèmes 2–4, GPT-3.5-turbo-0125, 1 000 exécutions, quatre jeux, Vote « facile » 53 % / « difficile » 47 % (Fig. 2), coût non modélisé (§Conclusion) [T]. Imprécision : le modèle d'échelle impose c₁ > 0 et c₂ > 0, **pas** c₃ (« c_i > 0 » du dossier est trop fort). |
| M6 — Li 2024 | Confirmé | Algorithme 1 (similarité cumulée; BLEU pour le code), N jusqu'à 40, 10 exécutions, Tableaux 2, 5 (235 ± 54; 326 ± 131; 138 ± 14; 247 ± 91; 495 ± 120 pour GSM8K, MATH, Chess, MMLU, HumanEval), 6; Propriétés 1–3. Détails : Propriété 1 : le texte dit « gains taper off » à I = 400 (le dossier écrit « s'effondre »); le « gain relatif » du §6 est défini comme une différence d'exactitudes. 40 × 13 / 70 ≈ 7,4 [I] exact. |
| M7 — Kim 2025 | Confirmé | 260 configurations, 6 bancs, 5 architectures, 3 familles, 4 800 jetons moyens, R² CV 0,373 (0,413 avec ACI), 20 paramètres (Tableau des spécifications), β = −0,236, frontière ≈ 0,45, surcoûts 58 / 263 / 285 / 515 %, +80,8 % à −70,0 %, décentralisé +9,2 % (BrowseComp-Plus), planification −39 % à −70 %, 87 % contre 20 % au hasard [T]. |
| M8 — Marshall 2009 | Non vérifiable (partiel) | Éq. 4.1, w = k grands, §6.3, SPRT et Neyman-Pearson : [S] (extraction WebFetch). Numéro de figure : voir §1.2. |
| M9 — List 2009 | **Corrigé** | Confirmés [T] : 200 éclaireuses, 5 sites de qualités 3, 5, 7, 9, 10; 250 essais; 79,6 % (199/250, σ = 1, λ = 0,8, critère fort); 41,6 % (104/250, λ = 0,5, fort); 4,4 % (11/250, λ = 0,2, fort). **Correction** : 246/250 (98,4 %) correspond au critère **fort**; au critère faible, σ = 0,2 et λ = 0,8 donne 250/250 (100 %) (et 237/250 pour σ = 1). De plus, la Fig. 8 (μ = 1) est une simulation **illustrative** (cascade vers le site 2, « the second worst »), pas un taux sur 250 essais : « fréquemment » est un abus. |
| M10 — information sociale | Confirmé, une correction | I'Anson Price : voir T8.8 et le tableau ci-dessus (Lausanne 27,9 / 23,6 / 9,2 / 39,3 %; E1 12 colonies de 15 000–20 000, juin–août 2014; E2 4 ruches d'observation ≈ 3 000, mai–août 2016; E3 8 colonies, mai–juin 2017, contrôle vertical/lumière; « 20 % de suiveuses en moins » en fin d'essai; nectar ≈ 21 %; auteurs : la danse probablement utile au printemps) [T]. Okada, Beekman et Lew [R]. Tautz 2004 [T] : pente 3 à 4 fois plus faible sur l'eau (0,546 ± 0,483 contre 1,970 ± 0,348 et 2,243 ± 0,500; p < 0,02), contraste ≈ 20 % (terre) contre ≈ 9 % (eau); le seuil ≈ 20 % vient des études en tunnel citées (Si et al. 2003). Dong [R]. Controverse de l'odomètre : voir Luebbert (§1.5) [T]. |
| M11 — Grüter 2011 | Confirmé | 8 colonies sans reine de 700 à 1 500 ouvrières; tronc de 15 cm, branches de 11 cm; Exp. 1 : 6 colonies; Exp. 2 : 8 colonies; Exp. 3 : 7 colonies, 176 fourmis; Exp. 4 : 6 colonies, 21 fourmis; GLMM binomial, tests de Wald [T]. |
| M12 — Feinerman et Korman | Confirmé | Deux sources de cognition collective; trois catégories; contrainte de calcul (Alon et al. 2011) [T]. |
| M13 — cinq sens de « difficile » | [I] dossier | Chaque source citée dit bien ce que le tableau lui attribue (Sasaki, Chen, Kim, Snell [T : cinq quantiles de pass@1], Li). La réconciliation par p_i et ρ reste une inférence du dossier. |
| M14 — « budget égal » | **Corrigé** | Sasaki, Li, MoA (6 propositeurs × 3 couches; Fig. 5 coût-qualité), Kim (jetons appariés), Snell (FLOPs appariés, modèle 14 × plus grand), Kapoor (coût en $), Chen (coût non modélisé) : confirmés [T]. Anthropic : « multi-agent systems use about 15× more tokens than **chats** » et « agents … about 4× more tokens than chat interactions »; le +90,2 % compare un système multi-agent à un **agent unique** Opus 4. Le « ≈ 15 × les jetons » associé au +90,2 % (§6.3 et §7.13 du dossier) mélange deux comparaisons; relatif à l'agent unique, le ratio impliqué est ≈ 3,75 × [I]. Seule la ligne M14 (« d'un dialogue ») est exacte. |

### 2.4 Pré-tests du §4.4 refaits [I]

- **Condorcet, 40 votants d'erreur 1/3** : Sumpter et Pratt 2009 écrivent bien « just 3.33 per cent » au §4(d) [T]. Mon calcul exact : 0,955 % (≥ 21 erreurs), 2,144 % (égalité 20–20 comptée comme erreur), 1,55 % (égalité tranchée au hasard) : **le dossier a raison**, aucune lecture ne donne 3,33 %.
- **G du cadre** : G = (P_col − P_ind)/(1 − P_ind) = +0,149 (5 %), +0,174 (20 %), −1,143 (80 %), −5,714 (90 %), indéfini à 99 % [I, calcul sur la Fig. 3 relue]; n_eff = 5, 5, 3, 3, 3 puis « — » dès 60 % [I]. Jury de 101 : 0,966 à 5 %, 1,000 dès 20 % [I]. Gain +4,8 points pour p = 0,6, K = 3 (0,648) [I].
- **Tarifs** (E8.5, §7.19) : 1 / 2 / 4 $ par million de jetons d'entrée pour Haiku 4.5 / Sonnet 5.5 / Opus 5.5 (sortie 5 / 10 / 20 $) confirmés sur la page des tarifs [T, 2026-10-01].

### 2.5 Questions ouvertes du §8 tranchées ou non

| § | État |
|---|---|
| 8.1 SI de Sasaki | Non tranché (reCAPTCHA). Présélection des individus : **tranchée** (brood-retrievers, texte principal). |
| 8.2 λ de l'Éq. 1 | Non tranché; incohérence confirmée (T8.1). |
| 8.3 effectifs | Partiellement tranché : article incohérent (32 contre 16 colonies). |
| 8.5 Chen NeurIPS | **Tranchée** : le camera-ready (copie NSF PAR) garde les Théorèmes 2 et 4 tels quels. |
| 8.6 Sumpter et Pratt 3,33 % | **Tranchée** : chiffre bien dans le texte; il ne se reproduit pas. |
| 8.10 | **Tranchée** : Thompson 1024–1030; DOI Lorenz et Esch; Sasaki, Pratt et Kacelnik n° 12730. |
| 8.7, 8.4, 8.8, 8.9, 8.14, 8.15 | Non tranchées (texte intégral inaccessible ou hors portée). |

## 3. Bilan

- **Références** : 69 lignes de tableaux (§2.1 à §2.5 du dossier), plus 7 références citées dans le texte (§1.6). Aucune référence inventée ni fausse; toutes les métadonnées bibliographiques vérifiables sont exactes. Décompte des 69 : **60 confirmées**, **7 corrigées** (Sasaki2013, IAnsonPrice2019, HongPage2004, Chen2024, Anthropic2025, List2009, Cheung2014), **2 non vérifiables** (Marshall2009, Gruter2010), **0 fausse**.
- **Erreurs de fond à reporter dans le dossier** : (1) I'Anson Price : +22,59 % est à variation élevée; (2) List 2009 : 246/250 est le critère fort; (3) Hong et Page : quatre hypothèses, N₁ < N; (4) Anthropic : « +90,2 % pour ≈ 15 × les jetons » mélange deux ratios; (5) Cheung 2014 : E4396–E4397; (6) Sasaki 2013 : exclusions d'essais, effectifs contradictoires de l'article, « limites déclarées » partiellement absentes; (7) Chen 2024 : titre NeurIPS ambigu (LM ou LLM); (8) Chen, M5 : c₃ non contraint.
- **Compléments** : DOI de Grüter 2010, Esch 2001, Lorenz 2011, Edwards et Pratt 2009, Galton 1907; erratum de Donaldson-Matasci; pagination de Thompson; n° de Sasaki, Pratt et Kacelnik 2018; venues éditeur de Wang MoA (ICLR 2025), Self-MoA (TMLR), Snell (ICLR 2025), Kapoor (TMLR, 2025-06-13).
- **Tout ce que le dossier calcule [I] a été refait et concorde** : Condorcet (T8.3, T8.4), identité (T8.5), Hong et Page (T8.6, trois écarts de ≤ 0,4 point attribuables à l'aléa), Chen (T8.10; Théorème 2 : 27/27; Théorème 4 : 79/79 et 60/60), Éq. 2 de Sasaki, G et n_eff, tarifs.
- **Non vérifiables** : SI de Sasaki 2013 (T, taux, Table S1, Fig. S1–S8); numéro de figure de Marshall 2009; attribution « copier quand c'est incertain » à Grüter, Leadbeater et Ratnieks 2010; contenu de Beckers 1989; paramètres d'Okada 2014 et de Schürch et Grüter 2014; texte intégral de Dong 2023; valeurs numérisées de la Fig. 3 au ±0,01 (relues à l'œil seulement).

# Vérification indépendante — dossier P3 « Division du travail »

Vérificateur : passe sceptique du 2026-10-01 sur `p3-division-travail.md`. J'ai tout vérifié moi-même, sans me fier au dossier.

**Bilan** : 41 références. 33 confirmées, 7 corrigées, 1 non vérifiable, 0 fausse. Toutes existent. Aucune erreur de fond sur les métadonnées. Les corrections portent sur 3 métadonnées incomplètes (pages, auteurs/DOI d'une prépublication, lieu de conférence), 2 versions publiées ou DOI manquants, et 2 appuis mal interprétés (HZ2025, HR1992 → A2). Le plus important : HZ2025 repose sur une **unité de contrôle centrale** qui choisit les agents. Il ne peut donc pas appuyer la « chorégraphie sans orchestrateur ».

Sources consultées : API Crossref, OpenAlex, Europe PMC (résumés et texte intégral PMC), PubMed eutils, pages arXiv, pages Springer, PDF NSF PAR (WMGH2020), PDF IAS (TBD1998, figures rendues en image et lues), PDF arXiv (KT2015, FOC2024). Limites : Royal Society, ScienceDirect et JSTOR renvoient 403 ou une erreur; quotas WebSearch et Consensus épuisés.

Mode de lecture : certaines citations « verbatim » ont été extraites par l'outil WebFetch, qui fait passer la page par un petit modèle. Les chiffres clés ont été recoupés quand c'était possible. Le texte de TBD1998, WMGH2020, KT2015 et FOC2024 a été extrait directement du PDF (`pdftotext`).

## 1. Références : statut

Légende : **Confirmée** = existence, auteurs, année, titre, revue, volume/pages, DOI exacts. Pour les références problématiques, la correction est donnée.

| Clé | Statut | Correction / remarque | URL de vérification |
|---|---|---|---|
| BTD1996 | **Non vérifiable** (contenu) | Métadonnées confirmées : Bonabeau, Theraulaz, Deneubourg, *Proc. R. Soc. Lond. B* 263(1376):1565–1569, 22 nov. 1996. Le **résumé** que le dossier dit avoir lu est inaccessible : Semantic Scholar le dit « elided by publisher », OpenAlex n'en a pas, la Royal Society renvoie 403. L'accord avec Wilson (1984) est corroboré indirectement par TBD1998 (texte lu : « excellent quantitative agreement with experiments (Bonabeau et al. 1996; Wilson 1984) »). | https://api.openalex.org/works/doi:10.1098/rspb.1996.0229 |
| BTD1998 | Confirmée | Ajouter le numéro 4 (60(4):753–807). Crossref et OpenAlex ne listent que Bonabeau; Springer liste bien les trois auteurs. | https://link.springer.com/article/10.1006/bulm.1998.0041 |
| TBD1998 | Confirmée | Titre imprimé au singulier (« reinforcement »); Crossref et PMC au pluriel; coquille Crossref « J-N. Denuebourg » confirmée. PMC1688885 confirmé. | https://api.crossref.org/works/10.1098/rspb.1998.0299 |
| W1984 | Confirmée | 16(1):89–98, nov. 1984. | https://link.springer.com/article/10.1007/BF00293108 |
| BF2001 | Confirmée | PMID 11112175. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1146/annurev.ento.46.1.413%22 |
| DWPK2011 | Confirmée | 42(1):91–110; résumé (OpenAlex) cohérent avec une revue. | https://api.openalex.org/works/doi:10.1146/annurev-ecolsys-102710-145017 |
| DPWK2012 | **Corrigée** | Ordre des auteurs confirmé (Duarte, **Pen, Keller, Weissing**). Pages manquantes : ***Behav. Ecol. Sociobiol.* 66(6):947–957**, juin 2012. | https://api.crossref.org/works/10.1007/s00265-012-1343-2 |
| TF1992 | Confirmée | PMID 21236060. | https://api.crossref.org/works/10.1016/0169-5347(92)90128-X |
| T1993 | Confirmée | 55(5):891–918, sept. 1993. | https://api.crossref.org/works/10.1016/S0092-8240(05)80195-8 |
| FT1994 | Confirmée | 48(2):470–472. | https://api.crossref.org/works/10.1006/anbe.1994.1261 |
| CD2015a | Confirmée | 17(3):217–242. Citation « any distributed system » confirmée dans le résumé. | https://api.openalex.org/works/doi:10.1007/s10818-015-9205-4 |
| CD2015b | Confirmée | 69(9):1459–1472. | https://api.crossref.org/works/10.1007/s00265-015-1958-1 |
| CHD2015 | Confirmée | 62(1):31–35. | https://api.crossref.org/works/10.1007/s00040-014-0370-6 |
| CSD2017 | Confirmée | 12(9):e0184074; PMC5587300. | https://www.ebi.ac.uk/europepmc/webservices/rest/PMC5587300/fullTextXML |
| H2016 | Confirmée | 6:20846; PMC4754661. | https://www.ebi.ac.uk/europepmc/webservices/rest/PMC4754661/fullTextXML |
| GTDA2002 | Confirmée | 215(3):363–373; PMID 12054843. | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=12054843&rettype=abstract&retmode=text |
| JFGB2007 | Confirmée | 62(2):289–298. Pages vérifiées directement : elles ne sont plus [Secondaire]. | https://api.openalex.org/works/doi:10.1007/s00265-007-0464-5 |
| U2021 | Confirmée | 19(6):e3001269; PMC8211278. | https://www.ebi.ac.uk/europepmc/webservices/rest/PMC8211278/fullTextXML |
| L2024 | **Corrigée** | Auteurs et DOI récupérés : **Lynch C.M., Wilson R.C., Dornhaus A.** (2024). *bioRxiv*, **doi:10.1101/2024.05.13.593812** (mis en ligne le 14 mai 2024). Toujours une prépublication; aucune version publiée trouvée dans OpenAlex. | https://doi.org/10.1101/2024.05.13.593812 |
| S1982 | Confirmée | 11(4):287–293. | https://link.springer.com/article/10.1007/BF00299306 |
| R1992 | Confirmée | 37(1):637–665 (métadonnées seulement, comme le dit le dossier). | https://api.openalex.org/works/doi:10.1146/annurev.en.37.010192.003225 |
| HR1992 | **Corrigée** (appui de A2) | Métadonnées confirmées (PMID 1465390, PMC50629). Le « jusqu'à 2 semaines plus tôt » figure dans le résumé, mais comme description générale du développement précoce. Ce n'est pas un résultat mesuré après un retrait de butineuses dans cet article. L'expérience de HR1992 est inverse : des « transplants » d'abeilles âgées dans des colonies sans butineuses (et des groupes élevés hors colonie). A2 doit citer une autre source pour le paradigme « retrait des butineuses → butinage précoce » (non vérifié ici), ou se reformuler. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1073/pnas.89.24.11726%22 |
| BHOR2001 | Confirmée | 213(3):461–479; PMID 11735292. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1006/jtbi.2001.2427%22 |
| JMGO2004 | Confirmée | 305(5682):402–404; PMID 15218093. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1126/science.1096340%22 |
| GMJO2006 | Confirmée | 53(2):226–232. | https://link.springer.com/article/10.1007/s00040-005-0862-5 |
| MO2004 | Confirmée | 51(2):146–152. | https://link.springer.com/article/10.1007/s00040-003-0713-1 |
| JNO2007 | Confirmée | 193(2):159–165; en ligne le 30 sept. 2006, numéro de févr. 2007. Le résumé dit « **in many cases** » des différences significatives, pas dans tous les cas. | https://link.springer.com/article/10.1007/s00359-006-0176-8 |
| OF2007 | Confirmée | 22(8):408–413; PMID 17573148. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1016/j.tree.2007.06.001%22 |
| SKB2010 | Confirmée | 5(1):e8967; PMID 20126462, PMC2813292. Le résumé dit que la production endothermique est « the job of bees older than about two days » et que l'ectothermie est « most frequent » chez les < ~2 j. Paraphrase du dossier acceptable, mais à nuancer : « environ 2 jours », chaleur active. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1371/journal.pone.0008967%22 |
| GKW2018 | Confirmée | 8:15836; PMC6203754. | https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6203754/fullTextXML |
| PPM2019 | Confirmée | 16(150):20180561. | https://api.openalex.org/works/doi:10.1098/rsif.2018.0561 |
| KT2015 | **Corrigée** | La prépublication existe, mais une **version publiée** est à citer en priorité : Kang Y., Théraulaz G. (2016). Dynamical models of task organization in social insect colonies. ***Bull. Math. Biol.* 78(5):879–915. doi:10.1007/s11538-016-0165-1**. | https://doi.org/10.1007/s11538-016-0165-1 |
| FOC2024 | **Corrigée** (mineure) | Métadonnées confirmées; ajouter **doi:10.1016/j.ecocom.2024.101083**. Nuance : FOC2024 utilise une règle de réponse en échelon bruité (fonction erf), pas $T_\theta=s^2/(s^2+\theta^2)$. Seule la dynamique du stimulus (éq. 3) correspond à la forme attribuée au modèle classique [BTD1996, 1997, 1998]. | https://arxiv.org/abs/2308.07122 |
| KBK2000 | Confirmée | 406(6799):992–995; PMID 10984052. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1038/35023164%22 |
| CBTD2000 | Confirmée | 8(2):83–95. Le résumé parle de camions affectés à des cabines de peinture (flow shop dynamique) et de « similarités » avec une approche de marché; « les deux s'adaptent bien » est confirmé. | https://api.crossref.org/works/10.1177/105971230000800201 |
| WMGH2020 | **Corrigée** | Lieu : ***Proceedings of the 33rd International Florida Artificial Intelligence Research Society Conference* (FLAIRS-33)**, 2020, AAAI Press (© AAAI 2020). Pas la conférence AAAI. Pages non trouvées. | https://par.nsf.gov/biblio/10182204 |
| KGPG2025 | Confirmée | Kim E., Garg A., Peng K., Garg N.; arXiv 9 juin 2025; « Accepted to ICML 2025 ». | https://arxiv.org/abs/2506.07962 |
| KR2021 | Confirmée | 118(22):e2018340118; PMID 34035166. | https://api.openalex.org/works/doi:10.1073/pnas.2018340118 |
| C2025 | Confirmée | v3 du 26 oct. 2025 confirmée. Le κ = 0,88 n'est plus dans le résumé de la v3 (il était dans celui de la v1), mais il est dans le texte de la v3 (accord inter-annotateurs). La v3 donne aussi κ = 0,77 pour le juge LLM. | https://arxiv.org/html/2503.13657v3 |
| Y2025 | Confirmée | Yang Y., Chai H., Shao S., Song Y., Qi S., Rui R., Zhang W.; v2 du 29 mai 2025. Résumé : « eliminates the need for a central orchestrator » et mémoire « supports continual skill refinement and specialization ». | https://arxiv.org/abs/2504.00587 |
| HZ2025 | **Corrigée** (appui mal interprété) | Métadonnées confirmées (Han B., Zhang S., v1 du 2 juill. 2025). Le texte tranche la question laissée ouverte par le dossier : une **unité de contrôle** (un agent LLM) « iteratively selects agents based on query, current messages on the blackboard and agent abilities ». C'est un sélecteur central sur état partagé, donc plus proche de l'orchestration. On ne peut pas le citer comme appui à « les agents tirent le travail sans orchestrateur ». Il sert plutôt de **contre-exemple** ou de point de comparaison. | https://arxiv.org/html/2507.01701v1 |

## 2. Résultats cibles et paramètres clés

### 2.1 Modèle à seuils fixes (BTD1996) et Wilson (1984)

| Élément du dossier | Vérification | Statut |
|---|---|---|
| $T_\theta(s)=s^2/(s^2+\theta^2)$ attribuée à BTD1996 | TBD1998, éq. 1 : « In the fixed-threshold model (Bonabeau et al. 1996), individual i engages in task j with probability… » | Confirmé (texte) |
| $s(t+1)=s(t)+\delta-\alpha N_{act}/N$ | FOC2024, éq. 3 (lue) : même forme, attribuée au « classical response threshold model [7–9] ». U2021, éq. 1 (lue) : généralisation. | Confirmé (avec la nuance FOC2024 ci-dessus) |
| Paramètres de BTD1996 (θ des castes, N, p, δ, α) | Texte inaccessible (403) | Non vérifiable (le dossier le dit déjà) |
| Wilson : 10 espèces; ratio abaissé sous 1:1 (habituel 3:1 à 20:1) chez *guilelmimuelleri*, *megacephala*, *pubiventris*; répertoire ×1,4–4,5; activité ×15–30 | Résumé Springer, cité textuellement | Confirmé |
| Les majors restaurent ≥ 75 % de l'activité des minors manquantes; changement en < 1 h, réversible | Résumé Springer : « within 1 h… reversed in comparably short time »; « 75% or more » (obtenu par extraction WebFetch) | Confirmé |
| Correction v3 n° 1 (ce sont les majors qui prennent la relève) et n° 2 (pas de retrait d'une caste) | Conformes au résumé | Confirmé |
| Tableaux de champ moyen (section 3.1) | Recalculés indépendamment ($x=T/(T+p)$, bissection sur $(1-f)x_1+fx_2=1/3$) : $x_{maj}$ = 0,009 / 0,014 / 0,038 / 0,281, identiques. Rapports d'activité identiques **si la colonne « 1:2 » correspond à f = 0,67** (avec f = 2/3 exact, on obtient 6,3 / 8,2 / 12,7 / 18,2 et 5,5 / 8,3 / 11,8). | Confirmé (inféré, pas une valeur publiée). Préciser f = 0,67 dans l'en-tête. |

### 2.2 TBD1998 (texte et figures lus)

| Élément | Vérification | Statut |
|---|---|---|
| Éq. 1 à 7, rôles de ξ, φ, p (durée moyenne $1/p$), σ, Θ, normalisation par N (« brood divided by 2… », Wilson 1984) | Texte | Confirmé |
| Fig. 1a–b : N=5, m=2, θ(0)=500, x(0)=0,1, α=3, δ=1, p=0,2, ξ=10, φ=1, σ=0,1; axe 0–3000 | Légende et image de la figure | Confirmé |
| Individus 3, 4, 5 spécialistes de la tâche 1 ($x_{i1}\approx0{,}55$, $x_{i2}\approx0{,}05$); 1, 2 de la tâche 2 ($x_{i1}\approx0{,}05$, $x_{i2}\approx0{,}8$) | Texte et légende | Confirmé |
| Fig. 1c : θ initiaux uniformes sur [1; 1000]; l'individu 1 est spécialiste des deux tâches | Légende | Confirmé |
| Fig. 2a : φ+ξ=11; transitions 0,4 et 2 | Texte : « When φ<0.4, all individuals are specialists… For 0.4<φ<2… For φ>2… no specialization » | Confirmé |
| Fig. 2b : ξ=10, φ=1; transitions 0,04 et 0,42 | Texte | Confirmé |
| Fig. 3 : 50 spécialistes retirés; seuils de $T_r$ 1700 ($N_n$) et 3700 ($N_f$) | Texte : « as Tr exceeds 1700… as Tr exceeds 3700 » | Confirmé |
| Bornes F5 lues sur le graphique (≥ 40 à $T_r$ ≥ 3000; ≥ 25 à $T_r$ ≥ 4500) | Image : $N_n$ atteint ~50 dès $T_r$ ≈ 2400; $N_f$ ≈ 14 à ~3800, ≈ 36–42 à ~3900, ≈ 50 au-delà de 4000. Les bornes proposées sont compatibles et prudentes. | Confirmé (lecture graphique) |
| Spécialiste si θ < 100; convergence si θ > 900 ou θ < 100 | Texte et légendes des Fig. 2 et 3 | Confirmé |
| Espèces : *Polistes dominulus* (illustration), abeille, *P. instabilis* (expérience proposée, O'Donnell 1998) | Texte | Confirmé |
| FFW : cas particulier à seuils identiques très bas; pas assez robuste pour un polyéthisme temporel fort (BTD1998) | TBD1998, introduction (le résumé de BTD1998 n'en parle pas) | Confirmé (via TBD1998) |
| Pas de temps $\Delta t$ non donné; gel aux bornes de l'éq. 4 | Texte : seule « dynamics… restricted to an interval » est donnée, pas de $\Delta t$ numérique | Confirmé (constat d'absence) |

### 2.3 Ouvrières inactives

| Élément | Source | Statut |
|---|---|---|
| CSD2017 : 20 colonies, 1307 ouvrières (moy. 65,35); inactivité 0,607 (méd. 0,628, é.-t. 0,146); retraits 5/9/6 colonies; actives compensées par les groupes « Inactive » et « Walker »; inactivité plus basse après retrait des inactives; aucun changement au retrait aléatoire | Texte PMC | Confirmé (numéros de figures non vérifiés) |
| H2016 : 75 ouvrières, grille 50×50, stimulus 5,001 (+1 par pas), normale de moyenne 5 (0–10) contre 5 fixe, énergie 10 → 0, déplacement prob. 0,5, taux 0,006–0,3, extinction au premier pas sans traitement, 5 essais × 1000 pas; résultats; *Myrmica kotokui* 66,0 ± 9,8 % (8 colonies) | Texte PMC | Confirmé |
| CD2015b : inactivité constante chez un individu, groupe distinct, ni rythmes circadiens ni quarts de travail | Résumé Springer | Confirmé |
| CHD2015 : budgets-temps identiques laboratoire/terrain | Résumé Springer | Confirmé |

### 2.4 Abeilles

| Élément | Source | Statut |
|---|---|---|
| A1 : 5 castes femelles (reine + 4 sous-castes d'âge); 0–2 j nettoyage; prédictions vérifiées dès 2 j | Résumé S1982 | Confirmé |
| A1 : âges 1–3 / 3–11 / 11–20 / ~20 j | KT2015 (PDF lu) citant Seeley 1982 | Confirmé [Secondaire] |
| A2 : « jusqu'à 2 semaines plus tôt » | Résumé HR1992 | **Présent, mais mal cadré** (voir HR1992 ci-dessus) |
| BHOR2001 : liste des phénomènes expliqués | Résumé | Confirmé |
| A3 : stabilité accrue avec plusieurs pères; mécanisme par seuils de ventilation; aucun chiffre | Résumé JMGO2004 | Confirmé |
| A3/A4 : simulations à 1 ou 15 patrilignes (chauffage) et à 5 patrilignes (refroidissement) | Résumé GMJO2006 | Confirmé |
| A3 : couvain 33–36 °C | Résumé SKB2010 | Confirmé |
| A4 : proportions de ventileuses différentes selon la patriligne (*A. florea*) | Résumé JNO2007 : « in many cases » | Confirmé, avec nuance. La monotonie en T du critère A4 est une proposition, absente des sources. |
| A5 : seuil uniforme mal adapté; groupes hétérogènes rapides | Résumé MO2004 | Confirmé |
| OF2007 : deux lectures (spécialisation génétique ou effet secondaire de la polyandrie) | Résumé Europe PMC | Confirmé |

### 2.5 Critiques et contre-preuves

| Élément | Source | Statut |
|---|---|---|
| U2021 : 120 colonies; 16 ouvrières (8 en morphologie); génétique → convergence, âge → aucun effet, morphologie → divergence; seuils seuls insuffisants; efficacité et demande larvaire ajoutées; éq. 1–2, τ, T = 10 000 | Texte PMC | Confirmé |
| X1 / GKW2018 : *B. terrestris*, 159 ouvrières, 14 colonies; 40,87 °C [40,54–41,20] contre 42,67 °C [42,16–43,17]; 77 % contre 39 %; $R_M$ = 0,231; seuil individuel non prédictif en groupe | Texte PMC | Confirmé (différence de 1,80 °C exacte; n = 158 en groupe) |
| L2024 : seuils de réponse souvent moins bons qu'un modèle nul aléatoire; la variation n'améliore pas l'allocation | Résumé Europe PMC : « response thresholds usually perform worse than a null random choice model in terms of cost and efficiency, and variation among workers does not improve task allocation » | Confirmé. Les auteurs précisent qu'ils n'ont pas modélisé les bénéfices de la spécialisation. |
| DPWK2012 : répartition 3:1 difficile; l'accouplement multiple freine la spécialisation | Résumé : « not easily achievable… multiple matings of colony foundresses impede the evolution of specialization » | Confirmé |
| JFGB2007 : demande faible et nombre de tâches élevé favorisent la division du travail | Résumé | Confirmé |
| GTDA2002 : spécialisation au-delà d'une taille critique; petites colonies indifférenciées | Résumé PubMed (efetch, rendu par extraction) | Confirmé |

### 2.6 Parallèles agentiques

| Élément | Source | Statut |
|---|---|---|
| WMGH2020 : seuils constants = pire performance, plus de 400 changements de tâche par course; distribution uniforme meilleure; cite TBD1998 et Kazakova & Wu (2018) sur la difficulté de réadaptation | PDF lu : « Agents in constant swarms execute even more task switches, on average, over 400 per run »; « swarms with a uniform distribution perform best in all evaluation metrics » | Confirmé |
| KGPG2025 : > 350 LLM; accord de 60 % quand les deux se trompent; erreurs plus corrélées chez les gros modèles | Résumé arXiv | Confirmé |
| KR2021 : la monoculture réduit la qualité collective, même sans choc | Résumé | Confirmé |
| C2025 : 14 modes, 3 catégories, κ = 0,88 | Texte v3 (κ inter-annotateurs) | Confirmé |
| Y2025 : sans orchestrateur central; mémoire qui spécialise | Résumé | Confirmé |
| HZ2025 : tableau noir pour agents LLM | Texte : sélection par une unité de contrôle centrale | **Appui contraire à l'usage fait** (voir tableau 1) |
| KBK2000 : groupes plus efficaces, gains décroissants (interférence) | Résumé | Confirmé |
| CBTD2000 : camions et cabines de peinture; similarités avec le marché; les deux s'adaptent bien | Résumé Crossref | Confirmé |

## 3. Actions demandées au dossier

1. Section 6, ligne « Stimulus partagé » : retirer HZ2025 des appuis à la chorégraphie, ou le présenter comme contre-exemple (tableau noir **avec** sélecteur central). Y2025 reste le seul appui LLM sans orchestrateur.
2. A2 : reformuler (« le butinage précoce peut survenir jusqu'à 2 semaines plus tôt », HR1992, description générale) et sourcer l'expérience de retrait des butineuses ailleurs, ou cibler l'expérience de « transplant » de HR1992.
3. Compléter les métadonnées : DPWK2012 (66(6):947–957), L2024 (auteurs + DOI), WMGH2020 (FLAIRS-33), KT2015 (version *Bull. Math. Biol.* 2016), FOC2024 (DOI), BTD1998 (n° 4).
4. BTD1996 : changer le statut « [Résumé] » en « [Méta] + corroboration par TBD1998 », puisque le résumé n'a pas pu être relu.
5. Tableau de la section 3.1 : indiquer que la colonne « 1:2 » utilise f = 0,67.

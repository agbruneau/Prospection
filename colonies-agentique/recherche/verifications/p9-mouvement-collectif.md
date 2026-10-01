# Vérification indépendante du dossier P9 — Mouvement collectif et construction

Vérifié le 2026-10-01. Vérificateur indépendant et sceptique : chaque source a été consultée directement, sans tenir compte des lectures déclarées dans le dossier.

**Méthode.** Métadonnées : API Crossref (DOI par DOI), PubMed E-utilities et Europe PMC (PMID, PMCID, résumés), API arXiv, GBIF, pages d'éditeur (Springer, Nature, PLOS, bioRxiv). Contenu : texte intégral extrait localement (PyMuPDF) des PDF de Couzin et Franks 2003 (copie hébergée par Swarthmore), Peters et al. 2006 (arXiv, avec rendu image de la page des éq. 12–15), Vicsek et al. 1995 (arXiv), Mlot et al. 2011 (copie du laboratoire Hu, Georgia Tech) et Peleg et al. 2018 (bioRxiv v1); HTML intégral de Gelblum 2015, Reid 2015, Garnier 2013 (PLOS), Khuong 2016, Johnson 2009, Heyde 2021, Lutz 2021 (PMC), Gelblum 2016 (ar5iv, puis PMC5187715 pour les légendes) et Ruan 2025 (arXiv v4, tronqué avant les annexes B+); résumés d'éditeur ou de PubMed/Europe PMC pour le reste. Les nombres sont toujours demandés au sous-modèle de WebFetch sous forme de citations littérales; les calculs du dossier ont été refaits à part ([I]) et le script `p9_checks.py` a été relancé tel quel.

**Limites.** `curl` refusé par l'environnement; WebSearch (budget de 200 appels) et l'outil scientifique (30 recherches du mois) épuisés en cours de route. PMC a servi une page reCAPTCHA pour plusieurs articles (Mlot, parfois Garnier et Khuong) : rien n'a été contourné, j'ai pris d'autres hôtes (copie du laboratoire, PLOS). Les redirections de cookies d'idp.springer.com et d'idp.nature.com ont été suivies telles quelles (aucun identifiant). OpenAlex a rendu 429 en fin de session. Non consultés : Schneirla 1944 (AMNH : 403), annexes de SwarmBench (HTML tronqué, PDF au-dessus du plafond de 10 Mo de l'outil), SI de Gelblum 2015, Reid 2015, Mlot 2011, Johnson 2009, PRL de Vicsek 1995, texte intégral de Couzin 2005, Beekman 2006, Latty 2009, Berman 2011, Liu 2011, Camazine 1990, Franks 1991 au-delà du résumé.

**Légende.** *Confirmée* = métadonnées exactes et énoncés retrouvés dans la source. *Corrigée* = la source existe mais une métadonnée ou un énoncé du dossier est faux ou imprécis. *Non vérifiable* = je n'ai pas pu trancher avec ce que j'ai pu lire. *Erronée* = la source n'existe pas ou ne dit pas ce que le dossier lui attribue (aucun cas).

---

## 1. Références : métadonnées

### 1.1 Section 2.1 (portée)

| Clé | Statut | Correction | URL consultée |
|---|---|---|---|
| CouzinFranks2003 | Confirmée | Métadonnées exactes; « en ligne le 2002-12-09 » lu sur la première page du PDF (Crossref, PMC et Semantic Scholar donnent 2003-01-22 = date du numéro). Reçu 15 juillet, accepté 18 septembre 2002. Précisions mineures : le tronçon de 11 cm est filmé à 25 Hz puis doublé à 50 Hz par isolement des demi-images (le dossier écrit « filmé à 50 Hz »); « τ = 300 s » s'écrit « t = 300 s » (temps de diffusion de la phéromone) dans la légende de la fig. 2. | https://www.sccs.swarthmore.edu/users/08/bblonder/phys120/docs/couzin.pdf ; https://api.crossref.org/works/10.1098/rspb.2002.2210 |
| Couzin2002 | Confirmée | Métadonnées exactes (Crossref : 218(1), 1–11, 2002-09). Contenus [R]/[S] renvoyés à P6, non revérifiés ici. | https://api.crossref.org/works/10.1006/jtbi.2002.3065 |
| Deneubourg1989 | Confirmée | Métadonnées exactes; « communication brève » confirmée (Springer : *Short Communication*, 719–725, sept. 1989). | https://link.springer.com/article/10.1007/BF01065789 |
| Franks1991 | Confirmée | Résumé retrouvé mot pour mot dans ses éléments : expériences de moulin, vitesse sigmoïde de la force de la phéromone, trafic sortant et rentrant, *E. burchelli* forcée à raider « dans une forme plus typique d'autres espèces ». | https://link.springer.com/article/10.1007/BF01048072 |
| Schneirla1944 | Non vérifiable | AMNH (digitallibrary.amnh.org) : 403; Crossref sans entrée. Ni titre complet, ni pages, ni contenu vérifiés par moi (le dossier renvoie à P6 [L]). | https://hdl.handle.net/2246/3733 |
| Delsuc2003 | Confirmée | *Journal Club* (PLoS Biol. 1(2), 2003-11-17), commente Brady 2003; le moulin en est le point d'entrée. | https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.0000037 |
| Dussutour2004 | Confirmée | 428(6978), 70–73, 2004-03-04; PMID 14999281. Résumé : un sentier à faible densité, un autre sentier sous forte congestion, mécanisme fondé sur des interactions inhibitrices; aucune formation de voies. | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=14999281 |
| Burd2002 | Confirmée | 159(3), 283–293; PMID 18707380; résumé confirme l'absence de ségrégation et le débit supérieur près de 50:50. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1086/338541%22 |
| Gelblum2015 | Confirmée | Métadonnées exactes (Nat. Commun. 6, 7729; 2015-07-28; PMC4525283). Deux précisions : voir §2 (K_for, « publié 1,2 % »). | https://pmc.ncbi.nlm.nih.gov/articles/PMC4525283/ |
| Feinerman2018 | Confirmée | *Review Article*, Nat. Phys. 14(7), 683–693; reçu 2017-07-19, accepté 2018-03-08, en ligne 2018-05-14. Résumé retrouvé (Ising, « temporarily informed leader ants », nouveau formalisme). | https://www.nature.com/articles/s41567-018-0107-y |
| Couzin2005 | Confirmée | PMID 15690039; résumé retrouvé (la proportion d'informés baisse avec la taille du groupe; consensus sans connaissance mutuelle). | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=15690039 |
| Beekman2006 | Non vérifiable (contenu) | Métadonnées exactes (Crossref : 71(1), 161–171, 2006-01; trois auteurs). Aucun résumé obtenu (ScienceDirect 403, OpenAlex et Semantic Scholar sans résumé) : les énoncés [S] du dossier (moins de 5 % d'informés, dimensions de l'essaim, Nasanov) restent non vérifiés. | https://api.crossref.org/works/10.1016/j.anbehav.2005.04.009 |
| Schultz2008 | Corrigée | Métadonnées exactes (211(20), 3287–3295; PMID 18840663). Correction : « nichoirs à 255, 9 ou 8 m » : 255 m est la distance du nichoir pour l'essaim du 2 juillet; 8 m et 9 m sont les distances de **filmage** des essaims du 3 juillet et du 29 juin. Précision : un seul essaim est analysé en entier (2 juillet), les deux autres le sont partiellement (fraction de la vidéo); les tests de Rayleigh (P < 0,002) et la variance angulaire plus faible en haut valent « pour chacun des trois essaims ». | https://journals.biologists.com/jeb/article/211/20/3287/17542/The-mechanism-of-flight-guidance-in-honeybee-swarms |
| SeeleyBuhrman2001 | Confirmée | 49(5), 416–427. Résumé : cinq nichoirs, 4 essais sur 5 vers le meilleur site; aucune mention de vol ni de guidage. | https://link.springer.com/article/10.1007/s002650000299 |
| Reid2015 | Confirmée | 112(49), 15113–15118; en ligne 2015-11-23; PMC4679032. | https://pmc.ncbi.nlm.nih.gov/articles/PMC4679032/ |
| Mlot2011 | Confirmée | 108(19), 7669–7673; PMC3093451 (PMCID confirmé par Europe PMC; page PMC elle-même bloquée par reCAPTCHA, texte lu dans la copie Hu lab). | https://hu.gatech.edu/Publications/Hu11TM.pdf |
| Peleg2018 | Corrigée (mineure) | Métadonnées exactes (Nat. Phys. 14(12), 1193–1198, en ligne 2018-09-17; v1 bioRxiv 2017-09-14, mêmes quatre auteurs). « ≈ 10 000 abeilles par grappe » **non retrouvé** dans le texte principal de la v1 (SI absent du PDF) : à rétrograder en [I] ou à sourcer. | https://api.biorxiv.org/details/biorxiv/10.1101/188953 |
| Khuong2016 | Confirmée | 113(5), 1303–1308; en ligne 2016-01-19; PMID 26787857; PMC4747701. | https://pmc.ncbi.nlm.nih.gov/articles/PMC4747701/ |
| TheraulazBonabeau1995 (Science) | Confirmée | 269(5224), 686–688, 1995-08-04; PMID 17758813; résumé : modèle « inspiré des colonies de guêpes », treillis cubique 3D. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1126/science.269.5224.686%22 |
| TheraulazBonabeau1995 (JTB) | Confirmée | Titre exact : « Modelling the collective building of complex architectures in social insects with lattice swarms »; 177(4), 381–400, 1995-12. | https://api.crossref.org/works/10.1006/jtbi.1995.0255 |
| Bonabeau1998 | Confirmée | Sept auteurs (Crossref); 353(1375), 1561–1576, 1998-10-29; PMC1692383 (PMC n'affiche que Bonabeau). Résumé retrouvé : quatre ajouts (i)–(iv) au modèle de piliers de Deneubourg. | https://pmc.ncbi.nlm.nih.gov/articles/PMC1692383/ |
| Camazine1991 | Confirmée | 28(1), 61–76; reçu 1990-04-18, accepté 1990-08-21. Résumé : « blueprint » contre auto-organisation, simulation informatique. | https://link.springer.com/article/10.1007/BF00172140 |
| Camazine1990 | Confirmée | 147(4), 553–571, 1990-12 (Crossref). Résumé retrouvé; « EDO non linéaires » non confirmé par le résumé (voir §2). | https://api.semanticscholar.org/graph/v1/paper/DOI:10.1016/S0022-5193(05)80264-4 |
| Jenkins1992 | Confirmée | 30(3), 281–306; résumé : bande de pollen apparaît quand le paramètre d'apport franchit une valeur de bifurcation; dépend de la forme des termes de prélèvement; persistance après une hausse temporaire. | https://link.springer.com/article/10.1007/BF00176152 |
| Werfel2014 | Confirmée | 343(6172), 754–758, 2014-02-14; PMID 24531967; résumé retrouvé (règles locales garanties, trois robots, problème inverse). | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=24531967 |
| Grasse1959 | Confirmée | 6(1), 41–80, 1959-03; le titre complet se termine par « … la théorie de la stigmergie : Essai d'interprétation du comportement des termites constructeurs ». Aucun résumé. | https://link.springer.com/article/10.1007/BF02223791 |
| Vicsek1995 | Confirmée | PRL 75(6), 1226–1229, 1995-08-07 (Crossref); arXiv cond-mat/0611743 (déposé 2006-11-29) : *journal_ref* identique. | https://arxiv.org/abs/cond-mat/0611743 |

### 1.2 Section 2.2 (références ajoutées)

| Clé | Statut | Correction | URL consultée |
|---|---|---|---|
| Garnier2013 | Confirmée | 9(3), e1002984, 2013-03-28. Espèce : *E. burchellii*, Soberania, 12–20 mars 2001 (PLOS). | https://journals.plos.org/ploscompbiol/article?id=10.1371/journal.pcbi.1002984 |
| Gelblum2016 | Confirmée | 113(51), 14615–14620, 2016-12-05; PMC5187715 (à ajouter). arXiv:2107.09508v1 (2021-07-20) : *journal_ref* PNAS, champ DOI = celui de la revue de 2018, comme le dit le dossier. | https://pmc.ncbi.nlm.nih.gov/articles/PMC5187715/ |
| Peters2006 | Confirmée (complément) | Compléter : DOI 10.1142/S0219525906000859, *Adv. Complex Syst.* 9(4), 337–352, déc. 2006. Auteurs et *journal_ref* arXiv:0810.4583v1 exacts. | https://api.crossref.org/works?query.bibliographic=Peters+Johansson+Dussutour+Helbing |
| Dussutour2005 | Confirmée | 208(15), 2903–2912; résumé retrouvé (grappes alternées, mêmes volume et retour de nourriture, modèle proposé). | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1242/jeb.01711%22 |
| GregoireChate2004 | Confirmée | 92(2), 025702; PMID 14753946; résumé : transition toujours discontinue en 2D, y compris pour le modèle minimal de Vicsek. | https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=14753946 |
| Couzin2011 | Confirmée | 334(6062), 1578–1580; neuf auteurs exacts; résumé : une minorité opiniâtre peut dicter le choix, mais les non informés inhibent spontanément ce processus. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1126/science.1210280%22 |
| Lutz2021 | Confirmée | 118(17), e2013741118; PMC8092576; PMID 33893232; *E. burchellii*, Barro Colorado, janv.–févr. 2015. | https://pmc.ncbi.nlm.nih.gov/articles/PMC8092576/ |
| Sole2000 | Confirmée | 6(3), 219–226; résumé : modèle de Deneubourg et al., trois espèces, rendement maximal, paramètres « strikingly similar ». | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1162/106454600568843%22 |
| TheraulazBonabeau1999 | Confirmée | 5(2), 97–116; stigmergie quantitative et qualitative. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1162/106454699568700%22 |
| Johnson2009 | Confirmée | 276(1655), 255–261 (en ligne 2008-09-09); PMC2674341. | https://pmc.ncbi.nlm.nih.gov/articles/PMC2674341/ |
| Pratt1998 | Confirmée | 42(3), 193–205; reçu 1997-05-24, accepté 1997-08-30; régulation du rayon de mâles par rétroaction négative. | https://link.springer.com/article/10.1007/s002650050431 |
| Greggers2013 | Confirmée | 100(8), 805–809, 2013-06-28; *Short Communication*. Résumé : **deux** essaims, **deux** éclaireuses de l'essaim intact. | https://link.springer.com/article/10.1007/s00114-013-1077-7 |
| MakinsonBeekman2014 | Confirmée (complément) | 217(11), **2020–2027** (OpenAlex : 2020–7); titre complet « … (*Apis mellifera* Linnaeus) ». Résumé conforme. | https://api.openalex.org/works/doi:10.1242/jeb.103283 |
| Janson2005 | Confirmée | 70(2), 349–358, 2005-08. | https://api.crossref.org/works/10.1016/j.anbehav.2004.10.018 |
| Latty2009 | Confirmée | 78(1), 117–121, 2009-07; seul le titre est invoqué par le dossier. | https://api.crossref.org/works/10.1016/j.anbehav.2009.04.007 |
| Heyde2021 | Confirmée | 118(5), e2006985118, 2021-01-18; PMC7865135. | https://pmc.ncbi.nlm.nih.gov/articles/PMC7865135/ |
| Rubenstein2014 | Confirmée (métadonnées) | 345(6198), 795–799, 2014-08-15; PMID 25124435. Le résumé dit « thousand-robot swarm » : le « 1 024 » du dossier n'y figure pas (voir §2). | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1126/science.1254295%22 |
| Wilson2014 | Confirmée | 8(4), 303–327, 2014-10-31; six auteurs; trois méthodes (équilibre, transitoire, taux) validées par simulation à agents. | https://link.springer.com/article/10.1007/s11721-014-0100-8 |
| Berman2011 | Non vérifiable (contenu) | Métadonnées exactes (Proc. IEEE 99(9), 1470–1481, 2011-09; cinq auteurs). Résumé non obtenu (IEEE en JavaScript; Semantic Scholar sans résumé) : le contenu [R] du dossier n'est pas vérifié. | https://api.crossref.org/works/10.1109/JPROC.2011.2111450 |
| VicsekZafeiris2012 | Confirmée | 517(3–4), 71–140, 2012-08. | https://api.crossref.org/works/10.1016/j.physrep.2012.03.004 |
| Liu2011 | Corrigée | **Auteurs** : Liu, Z., Han, **J.** et Hu, **X.** (Zhixin Liu, Jing Han, Xiaoming Hu), non « Han, Z. et Hu, B. ». Reste exact : *Automatica* 47(12), 2697–2703, titre. L'énoncé (« la proportion tend vers 0 quand n → ∞ ») reste non vérifiable : résumé indisponible. | https://api.crossref.org/works/10.1016/j.automatica.2011.08.047 |
| Ruan2025 | Confirmée | arXiv:2505.04364, v1 2025-05-07, v4 2025-10-15; auteurs Kai Ruan, Mowen Huang, Ji-Rong Wen, Hao Sun; titre « Benchmarking LLMs' Swarm intelligence ». Annexes non lisibles par moi (voir §2). | http://export.arxiv.org/api/query?id_list=2505.04364 |
| Gao2026 | Confirmée | arXiv:2608.30661, 2026-08-31; « EMNLP 2026 Findings » est dans le champ *comments* (non *journal_ref*); résumé : exactitude, efficacité, coût, qualité du processus; SwarmExp. | https://arxiv.org/abs/2608.30661 |
| Li2024Flock (×2) | Confirmée | arXiv:2404.04752 (v2) et 2505.06513 (v1), auteurs exacts; résumés conformes (convergence vers la moyenne ou divergence; Crazyflie). | http://export.arxiv.org/api/query?id_list=2404.04752,2505.06513 |
| Pal2026 | Confirmée | arXiv:2608.26081, 2026-08-26; résumé conforme (observation physique plutôt que communication; stigmergie physique seule). | http://export.arxiv.org/api/query?id_list=2608.26081 |
| Topologies (×5) | Confirmée | MacNet (2406.07155, ICLR 2025, chiffre « logistic growth » et « irregular topologies outperforming regular ones » retrouvés); Zhuge (2402.16823, ICML 2024; code `gptswarm`); Li, Y. (2406.11776); Orogat (2602.03128; *comments* : « accepted to SIGMOD 2027 »; MAFBench; « 60x »; « above 90% to below 30% »); Zheng (2609.38327, déposé 2026-09-29, d_c, « agreement … mixed »). | http://export.arxiv.org/api/query?id_list=2406.07155,2402.16823,2406.11776,2602.03128,2609.38327 |
| Conformite (×5) | Confirmée | YS (Yashwanth YS, 2608.02758 : 64–94 %, < 26 % pour 7 modèles sur 8, 48 % pour GPT-4o); Riedl (2510.05174, ICLR 2026 d'après v4); Khushiyant (2512.10166 : ρ_c = 0,230 à 13 %); Tessera (2606.08340, 13 LLM); Li, R. (2510.10047). | http://export.arxiv.org/api/query?id_list=2608.02758,2510.05174,2512.10166,2606.08340,2510.10047 |

### 1.3 Références citées dans le texte sans entrée de tableau

| Clé | Statut | Correction | URL consultée |
|---|---|---|---|
| Weng2025 (via P5) | Confirmée | arXiv:2501.13381, Weng, Chen et Wang, ICLR 2025 (Oral), BenchForm. | http://export.arxiv.org/api/query?id_list=2501.13381 |
| Camazine et Sneyd 1991 | Confirmée | JTB 149(4), 547–571, 1991-04, DOI 10.1016/S0022-5193(05)80098-0 (à ajouter). | https://api.crossref.org/works?query.bibliographic=Camazine+Sneyd+1991 |
| Petersen, Nagpal, Werfel 2011 (RSS) | Confirmée | DOI 10.15607/RSS.2011.VII.035 exact; titre « TERMES: An Autonomous Robotic System for Three-Dimensional Collective Construction ». | https://api.crossref.org/works?filter=doi:10.15607/RSS.2011.VII.035 |
| Deneubourg 1977 (§8.2) | Non vérifiable | Aucune référence complète n'est donnée dans le dossier; non cherchée avec assez de précision pour conclure. | — |

---

## 2. Résultats cibles et paramètres

### 2.1 Trafic, voies, raids (P9-M1 à M4; T9.1 à T9.8)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Couzin et Franks 2003 : modèle (Δt = 0,02 s; k = 100; ε ~ N(0 ; 0,5 rad); mise à jour parallèle; paramètres de la fig. 1 : 5–90° par pas de 5°, 50 répétitions, 15 000 pas; θ_p = 500 °/s, σ = 0,5, C_max = 1,2 × 10⁻¹⁰; balayages de C_max, θ_p, σ; r_d, r_p, b, f, u_des, u_min, m) | **Confirmé** | Toutes les valeurs figurent dans le texte et la légende de la fig. 1. | PDF intégral |
| Couzin et Franks 2003 : terrain (Soberania; 11 cm; 226 individus; 75 % de moyennes; N = 97 rentrantes, N = 84 sortantes; 113 collisions, 226 fourmis) | **Confirmé** | Nuance 25 Hz → 50 Hz (voir §1.1). | PDF intégral |
| Moulin : « periodic boundary conditions, which make the simulation very similar to the circular mill »; le texte n'affirme pas un moulin 2D; sens choisi « randomly determined » | **Confirmé** | Phrase de §4(b)(i) retrouvée; l'autocatalyse « ants opposing the main flow are forced to turn around » aussi. | PDF intégral |
| T9.1 : « F fort quand α = 90° et θ_a = 1000 °/s »; σ = 0,01, Q = C_max = 1,2 × 10⁻⁶, N = 50, 100 répétitions | **Confirmé** pour les paramètres de la légende; **non vérifiable** pour « F fort à θ_a = 1000 » | La légende de la fig. 2 donne ces valeurs; le texte dit « at intermediate values … (hereafter α = 90°) » et 1000 °/s n'apparaît que dans la capture 2c. La carte F(α, θ_a) est une image. | PDF intégral |
| T9.2 : Δθ_a = 1400, 600, 200 °/s; t = 5000; 100 répétitions; F max à ω = 1 « regardless of Δθ_a »; croissance asymptotique de F avec Δθ_a; rentrantes au centre | **Confirmé** | Légende de la fig. 4 et §4(b)(ii). | PDF intégral |
| T9.3 : vitesse sigmoïde de la force de phéromone (Franks 1991) | **Confirmé** | Résumé (« sigmoidal function »). | Springer |
| T9.7 : grappes alternées, mêmes volume et retour que le pont large (Dussutour 2005) | **Confirmé** | Résumé. | Europe PMC |
| T9.8 : rendement maximal; trois espèces; paramètres « strikingly similar » (Solé 2000) | **Confirmé** | Résumé. | Europe PMC |
| Peters 2006 : éq. (1)–(5), (13)–(15), (16)–(17); Burd V_m = 4,04, k_m = 0,59, n ≈ 0,64, V = 0,39 V_m; q = 1, k = 6, ν = 1/40 min⁻¹; γ = 0,57; w de 10 à 1,5 mm, symétrie pour w ≤ 6 mm; fig. 4 (4 min, doublement de la capacité); fig. 5 (φ = 15 min⁻¹, l₁ = 10 cm, l₂ = 20 cm, 10 min, γ = 0,57 minimise le temps); 0,5 < γ < 0,8 | **Confirmé** | L'éq. (15) du dossier est correcte (rendu image de la page; l'extraction texte brouille la fraction). Valeur de *a* : aucune valeur numérique dans le texte, comme dit. | PDF + image page 6 |
| Calculs [I] : φ_c = kν/q = 0,15 fourmi/min; n/(n+1) = 0,390 | **Confirmé** | Recalculés. | calcul |
| Burd 2002 : relation de type fluide; débit max à forte concentration; 50:50 « counterintuitive »; pas de ségrégation | **Confirmé** | Résumé. | Europe PMC |

### 2.2 Vicsek (P9-M3; T9.4)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Éq. (1)–(2) (U[−η/2, η/2]; r = 1; Δt = 1; v = 0,03; 0,003 < v < 0,3); β = 0,45 ± 0,07; δ = 0,35 ± 0,06; η_c = 2,9 ± 0,05 « for ρ = 0.4 »; η_c = 2π; 5 répétitions, 5 %; fig. 1 et fig. 2a (N, L) | **Confirmé** | Texte et légendes de l'arXiv. Fig. 3 : « a) ρ = 0,4, b) L = 20 et η = 2,0 » (le dossier fusionne a et b). | PDF arXiv |
| Incohérence ρ = 0,4 contre N/L² ≈ 4 | **Confirmée** | N/L² = 4,16; 4,00; 4,00; 4,01; 4,00. | calcul sur la légende |
| Grégoire et Chaté 2004 | **Confirmé** | Résumé. | PubMed |
| Pré-test v_a (18 valeurs, ρ = 4, 1 et 0,4) | **Confirmé** | `p9_checks.py` relancé : sortie identique valeur par valeur (graine 0). | exécution locale |
| η_c = 2,9 ↔ écart-type 0,84 rad | **Confirmé** | 2,9/√12 = 0,837. | calcul |

### 2.3 Transport coopératif (P9-M5 à M7; T9.10 à T9.15)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Gelblum 2015 : 5 colonies, 46/25/16/6/5 expériences (= 98), plateau 100 × 70, 7,5 m, 1280 × 720 à 50 i/s, Cheerio ou silicone de 1,5 mm, > 70 m, 637 696 images; vitesse linéaire jusqu'à 15; r = 0,104 (N = 5 591, 47 expériences); 14 contre 186, P = 0,6691 | **Confirmé** | Citations littérales. | PMC4525283 |
| 0,5 bit, N = 134, 5–20 s, 0,35–1,4 fourmi simultanée | **Confirmé** | Citations littérales. | PMC4525283 |
| F_ind ≈ 4,25 et F_c = 4,3; taille optimale « on the order of 1 cm »; distribution des vitesses « in the transition region between unimodal … and bimodal » | **Confirmé** | | PMC4525283 |
| T9.12(b) « écart avec le pic d'Ising ≤ 5 % (publié 1,2 %) » | **Corrigé** | Le 1,2 % est un calcul (4,3/4,25 − 1 = 1,18 %) [I]; je n'ai trouvé aucune phrase de l'article qui le publie. | PMC4525283 + calcul |
| Tests : N = 90, médianes 8,84 et 6,53, P = 0,6285 (N = 9); 4 cm (> 100 fourmis) échoue, 1 cm réussit (P < 0,01; P < 0,0001; N = 11; recul de 5 cm); rayon induit maximal 8 cm; 1 fourmi contre 2–4 (N = 20) | **Confirmé** | Légende de la fig. 4. Fig. 4a–b = modèle étendu, 4c–d = Ising, 4e–g = tests (le dossier est cohérent). | PMC4525283 |
| Données « plateau propre » : N = 56 030 images, 17 trajectoires; Gillespie; quatre paramètres libres; force de traction ~0,1 mN | **Confirmé** | La force est dans le texte principal (« of the order of 0.1 mN », note 4), contrairement à « SI non lu ». | PMC4525283 |
| « K_for (10 s dans la fig. 4) » | **Corrigé** (mineur) | Les 10 s sont dans le texte des Résultats (« we assume that an informed ant disorients … on a timescale of 10 s »), non dans la légende de la fig. 4. | PMC4525283 |
| « Un oubli graduel donne le même comportement (SI note 15) »; valeurs ajustées des Méthodes | **Non vérifiable** | La note 15 est citée par l'article; son contenu est dans le SI. | PMC4525283 |
| Gelblum 2016 : éq. (1)–(5) (dont N_c, W(v), G_c); taux exp(± p·f_loc/F_ind); F_ind^c = N f₀/2; G_c ≈ N/2; « around 5 ants »; R = 11,5 cm; « stringent test » | **Confirmé** | LaTeX de l'ar5iv; la racine carrée du dossier dans éq. (5) est nécessaire pour G_c ≈ N/2 (vérifié par calcul). Le placement des tildes dans l'éq. (2) concorde avec l'ar5iv. | ar5iv |
| 18 cm; 98 min d'oscillations; ~5 h de mouvement (fig. 3) | **Confirmé** | Version PNAS : « 98 min », « about 5 h », fig. 4 « over 3 h ». (L'ar5iv imprime « 9898 minutes » et « 55 hours » : artefact de rendu.) | PMC5187715 |
| T9.14(d) « G_c/N → 0,50 ± 0,02 pour N ≥ 100 F_ind/f₀ » | **Corrigé** | Avec l'éq. (5) : G_c/N = 0,444 (N = 50), **0,4685 (N = 100)**, 0,4825 (N = 200), 0,4957 (N = 1000) (F_ind = f₀ = 1). La borne 0,48 n'est atteinte qu'à N ≳ 170 F_ind/f₀. Proposition : N ≥ 200 F_ind/f₀ ou tolérance ± 0,04. | calcul (éq. 5) |
| Feinerman 2018 : revue; Ising; « temporarily informed leader ants »; aucune valeur chiffrée | **Confirmé** | Résumé. L'arXiv:2107.09508 est bien Gelblum 2016 (Semantic Scholar l'associe pourtant au DOI de la revue de 2018 et au PMID 27930304 de PNAS). | Nature; Semantic Scholar |

### 2.4 Minorité informée et guidage (P9-M8, M9; T9.16 à T9.18)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Couzin 2005 et 2011 (énoncés) | **Confirmé** | Résumés. Aucune équation ni valeur lue, comme déclaré. | PubMed; Europe PMC |
| Liu et al. 2011 : « la proportion tend vers 0 » | **Non vérifiable** | Résumé indisponible. | — |
| Schultz 2008 : < 5 % ont visité le site; subtle guides contre streakers; ~8 000 abeilles (1,0 kg); 15 juin–3 juillet 2006; Appledore; Sony HDR-HC1; 60 demi-images/s; 1/10 000 s; Rayleigh P < 0,002 « all »; variance du haut inférieure pour les trois essaims; zone haute = 10–20 %; Couzin 2005 « < 10 % »; Janson 2005 « plausible » | **Confirmé** | Citations littérales de la page de l'éditeur. | JEB |
| « nichoirs à 255, 9 ou 8 m » | **Corrigé** | Voir §1.1 : 9 et 8 m = distances de filmage. | JEB |
| « tableaux 1–3 » de Schultz (T9.17) | **Non vérifiable** | Le sous-modèle décrit les trois tableaux comme agrégés sur les trois essaims; je ne l'ai pas confirmé. | JEB |
| Greggers 2013 : deux essaims, une éclaireuse rapide vers la destination | **Confirmé** | Résumé verbatim. | Springer |
| Makinson et Beekman 2014 | **Confirmé** | Résumé (essaims forcés à partir avant la phase de bourdonnement; « even when directional consensus was high »). | OpenAlex |
| Beekman 2006 [S] (< 5 %; 11 000 abeilles; 8–12 m …) | **Non vérifiable** | Voir §1.1. | — |

### 2.5 Auto-assemblage (P9-M10 à M13; T9.20 à T9.23)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Reid 2015 : quatre plateformes, 24 × 3,3 cm, 12/20/40/60° (n = 5, 8, 7, 3 = 23), février–août 2014, 30 min; GLM (t₆₃₀ = 6,81; 2,72; 9,01); pentes 1,25; 0,96; 0,59; 0,52; éq. [1]–[5] ; A = 17,02 [15,22 ; 18,82]; L₀, w_A, L_T, l_n, w_n, 0,42 fourmi/cm, ω = 4,799 θ^−0,5014; « Our data do not allow us to claim … »; 10 fourmis par pont, 2 000–20 000, 2–20 % | **Confirmé** | Citations littérales de PMC. | PMC4679032 |
| L_A publiés = 13,95; 25,36; 35,01; 35,36 et D_max = 6,93; 12,49; 16,45; 16,61 | **Confirmé** | Phrase des Méthodes retrouvée. | PMC4679032 |
| Incohérence : formule → L_A = 12,68 (12°) et 38,36 (60°); D_max(60°) = 16,61 cohérent avec 38,36 | **Confirmée** | Recalcul : 12,68; 25,36; 35,01; 38,36 et D_max(35,36) = 15,31 ≠ 16,61. | calcul |
| d* = 10,86; 4,61; 1,52; 0,63 cm (A = 17,02) et 9,91; 4,23; 1,28; 0,58 (ω) | **Confirmé** | Recalculés et script relancé. | calcul |
| Garnier 2013 : 13 des 20 ponts; fentes 7–26 mm (14,92); largeurs 8–55 mm; 30 s; 43 % à 30 s, 71 % à 120 s; ~50 % restent après 2 min, jusqu'à 500 s; minimes 31,8 % (293/920), 33,7 % (193/573), 22 % (729/3314); +0,25 fourmi/s double le temps (ρ = 1,959; σ = 2,789); 57 pistes, période médiane 3,4 s (3,413) | **Confirmé** | Citations littérales. | PMC3610604 |
| Modèle : α = 0,02; β = 144,5; γ = 3,258; θ = 12,97; φ ~ −0,52, ψ ~ 3, ω ~ 2, écart 0,12; m = 5 s; fente 15 mm; λ 0,1–4 par 0,05; période 1–20 s; 0–100 % de 3 fourmis/s; 100 périodes; 1 000 répétitions; optimum ≈ 3 s indépendant de l'intensité et de la longueur (5–30 mm); V = 724, P = 0,4177; 10 ponts hors échantillon; 0,796 ± 0,071 et 0,817 ± 0,002 | **Confirmé** | Citations littérales. | PMC3610604 |
| « indépendante de l'intensité (≥ 2 fourmis/s, testé jusqu'à 5) » | **Non vérifiable** | L'article dit seulement « does not vary with the traffic intensity ». | PMC3610604 |
| Mlot 2011 : 1,3 ± 0,8 mg (N = 16); γ = 34 ± 2 (N = 4); u = 0,39 ± 0,18 (N = 8); p = 0,64 ± 0,04 (N = 5); h = 2,5 ± 0,4 (N = 30), 8 mm; n_∞ ≈ 40 ± 10 %; 1,1 ± 0,3 (N = 3) et 0,2 ± 0,04 g/mL (N = 4); 0,27 ± 0,01; 102 ± 4° (N = 10); 133 ± 12° (N = 6); ϕ = 0,35 → 136°; 620 ± 100 dyn (N = 11), 370 ± 90; 2 × 10⁴ dyn/cm²; N = 1 000–7 000 (21); R de 1,5 à 3,6 cm en 150 s; 10³ s prédit; sigmoïde; n₀ ≈ 2,6 N^0,62; Brownien échoue; auto-réparation; tableau 1; savon (fig. S1) | **Confirmé** | Citations littérales du PDF intégral. | Hu lab PDF |
| T9.22(a) « θ* ∈ [135 ; 138]° pour ϕ ∈ [0,34 ; 0,35] (136,3° et 136,8°) » | **Corrigé** (mineur) | 136,3° pour ϕ = 0,35 ✓; ϕ = 0,34 donne 136,9°; 136,8° correspond à ϕ = 0,342 = (0,2)^(2/3). L'intervalle [135 ; 138] reste valide. | calcul |
| Peleg v1 : 0,5–5 Hz; 0–0,1 g; ≈ 1 Hz; courbe maîtresse (3 essais); pas de réponse à 0,01 g; 30–120 min; vertical 0,05 g jusqu'à rupture à une accélération critique; règle de déformation normale intégrée | **Confirmé** | Texte de la v1. | bioRxiv PDF |
| « ≈ 10 000 abeilles par grappe » | **Non vérifiable** | Absent du texte principal de la v1. | bioRxiv PDF |

### 2.6 Construction (P9-M14 à M19; T9.25 à T9.29)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Khuong 2016 : 13 colonies (2 000–3 000), 500 fourmis (11 réplications), Petri 10 cm, 2–3 mm, seuil 3 mm, 14 mm²; η_d,0 = 0,025, b_d = 0,11, η_p,1 = 0,029; μ = 0,22 ± 0,005; P = 0,32 ± 0,02; ξ = 2,866, ω = 3,727, α = 8,582; piquets 4,02 ± 0,33 et 8,46 ± 0,64 mm; treillis 200³, 0,5 mm, 1 500 déplacements, 87 mm²/s; 10 simulations; éq. [1] | **Confirmé** | Citations littérales. | PMC4747701 |
| 0,3 pilier/cm² à 48 h; 9,93 ± 0,66 mm à 96 h; pcf < 1 sous 10 mm; 800–1 200 s; « no structure can be built »; maxima à 3 600 s et 7 200 s; ≈ 8 mm; indépendance de N et de la surface; moins de fourmis, pas de piliers; durées de vie des pistes; « > 10 min » | **Confirmé** | Citations littérales. | PMC4747701 |
| Johnson 2009 : 14 025 cellules; 1 min; 40 et 17 charges; 30 abeilles/min; 30 exécutions; 818,5 ± 241,4 / 668,4 ± 209,7 / 391,0 ± 91,8; F₂,₈₇ = 33,76; trois règles de Camazine; motif vertical; croissance plus rapide à gabarits multiples; SI avec code | **Confirmé** | Citations littérales. | PMC2674341 |
| « réserves de pollen d'environ 3 jours : fig. 3e » | **Non vérifiable** | La phrase retrouvée dit seulement que, « with pollen stores », le retrait différentiel ne suffit pas. | PMC2674341 |
| Camazine 1990 : « EDO non linéaires » | **Non vérifiable** | Le résumé parle de « model equations ». | Semantic Scholar |
| Bonabeau 1998 (quatre ajouts; piliers → murs, galeries, chambres) | **Confirmé** | Résumé. | PMC1692383 |
| Werfel 2014 | **Confirmé** | Résumé. | PubMed |
| Heyde 2021 : 1,7–1,8 mm; 4,6 et 7,2 mm; 25,7–27,4 mm; 35 planchers; 15 et 23 rampes linéaires, 5 hélicoïdales; trois champs; Grassé (stimulus local) | **Confirmé** | Citations littérales (nom d'espèce non revérifié). | PMC7865135 |
| Rubenstein 2014 : « 1 024 robots » | **Non vérifiable** | Résumé : « thousand-robot swarm ». | Europe PMC |

### 2.7 Agentique (P9-M20; T9.30 à T9.32; §6)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| SwarmBench : 13 LLM (liste de 13 noms), moyenne de 5 exécutions, 5 tâches, k × k = 5 × 5, ≤ 120 caractères, mémoire de 5, T = 1,0, top_p = 1,0, F = 2, m = 1, bloc 5; Flocking le mieux réussi, Synchronization la plus dispersée; Transport : seuls o4-mini et deepseek-r1 > 0; dynamique physique prédit le succès, contenu des messages peu; messages en tête de l'importance par permutation (« higher permutation importance than visual observations »); quatre modes d'échec; N = 16 > 8, Foraging dégradé, Pursuit max à 12; k = 3 → 5 mieux, k = 7 rendements décroissants; variante centralisée | **Confirmé** | Texte principal. | arXiv HTML v4 |
| max_round = 100; 15 agents à règles × 20 répétitions; tableaux S.5, S.6, S.7, S.10–S.11; chiffres centralisé/décentralisé (T9.31); −33,1 %; indicateurs de l'annexe L.5; lien « mémoire stigmergique »/Grassé | **Non vérifiable** | HTML tronqué à l'annexe B; PDF > 10 Mo. T9.30–T9.32 reposent là-dessus. Le sous-modèle donne deux réponses contradictoires sur la présence de « Grassé (1959) » dans la liste de références. | arXiv HTML v4 |
| Gao 2026 : second « SwarmBench »; SwarmExp | **Confirmé** | Résumé. | arXiv |
| §6 : YS (64–94 %; < 26 %; 48 %), Khushiyant (ρ_c = 0,230, 13 %), MAFBench (60x; > 90 % → < 30 %; SIGMOD 2027), MacNet, Li Y., Zheng (d_c), SwarmWorld, GPTSwarm, Li 2024 et LLM-Flock, Weng 2025 | **Confirmé** | Résumés. | arXiv |
| Wilson 2014 (trois méthodes); Berman 2011 (qualitatif) | **Confirmé** / **Non vérifiable** | Wilson confirmé; Berman : résumé non obtenu. | Springer |

### 2.8 Sections 2.3 et 7 (constats sur la portée et corrections)

| Élément | Verdict | Détail | Source lue |
|---|---|---|---|
| Aucun article de Pratt sur le guidage de l'essaim | **Non concluant** | Ma requête Crossref (guidage d'essaim, Pratt) ne remonte aucun article de Pratt, mais l'absence n'est pas établie. À noter : Fetecau et Guo 2012 (*Bull. Math. Biol.*, 10.1007/s11538-012-9769-2), Bernardi et Colombi 2018 (10.2478/caim-2018-0021) et Diwold et al. 2011 (*Swarm Intell.* 5, 121–141) sont des travaux sur le guidage de l'essaim absents du dossier (utiles pour l'asymétrie côté abeille, §4.7). | Crossref |
| C2 : *Eciton praedator* Smith 1858 = *Labidus praedator* | **Confirmé** | GBIF : synonyme accepté sous *Labidus praedator*. | https://api.gbif.org/v1/species/match?name=Eciton%20praedator |
| C5, C6, C7, C8, C9, C10, C11 | **Confirmés** | Voir §1 (Feinerman = revue; Seeley et Buhrman = « best-of-N »; Theraulaz et Bonabeau = guêpes; Johnson 2009; Dussutour 2004 et Burd 2002). | — |
| C3, C14 (cadre §2.4 point 2; v3 §6 « apparition du moulin ») | **Confirmés** | Phrases retrouvées dans `00-cadre.md` et `proposition-v3.md`. | fichiers locaux |
| P9-M3 : « filiation Aoki 1982 → Reynolds 1987 → Huth et Wissel 1992 → Couzin 2002 » | **Non vérifiable** | Hors périmètre de ma lecture (extraction P6). | — |

---

## 3. Bilan chiffré

**Références (67 articles ou entrées, y compris celles des lignes groupées et du §1.3). Le résumé structuré retourné à l'orchestrateur reprend ces quatre chiffres.**

| Statut | Nombre | Détail |
|---|---|---|
| Confirmées | 60 | dont 4 avec complément (Peters2006 : DOI; MakinsonBeekman2014 : pages; Camazine et Sneyd 1991 : DOI; Gelblum2016 : PMC) |
| Corrigées | 3 | Liu2011 (auteurs); Schultz2008 (distances de nichoir et d'essaims analysés); Peleg2018 (« ≈ 10 000 abeilles » introuvable) |
| Non vérifiables | 4 | Schneirla1944; Beekman2006 (contenu [S]); Berman2011 (contenu [R]); Deneubourg 1977 (aucune référence donnée) |
| Erronées (introuvables ou fabriquées) | 0 | |

**Résultats cibles et valeurs de paramètres (61 lignes des sections 2.1 à 2.7; deux lignes mixtes, T9.1 et Wilson/Berman, comptent dans deux catégories).**

| Statut | Lignes |
|---|---|
| Confirmées | 46 |
| Corrigées | 5 |
| Non vérifiables | 12 |

Section 2.8 (constats sur la portée et corrections C1–C15) : 3 lignes confirmées, 1 non concluante (absence de Pratt), 1 non vérifiable (filiation de Couzin 2002).

Six corrections de contenu au total (cinq en section 2, plus Liu en §1) : (1) auteurs de Liu 2011; (2) Schultz 2008, 9 m et 8 m = distances de filmage; (3) « publié 1,2 % » (Gelblum 2015) est un calcul du dossier; (4) K_for = 10 s se lit dans le texte des Résultats, non dans la fig. 4; (5) critère T9.14(d) : G_c/N vaut 0,4685 à N = 100 F_ind/f₀, hors de 0,50 ± 0,02; (6) T9.22(a) : ϕ = 0,34 donne 136,9° (136,8° ↔ ϕ = 0,342). Précisions sans effet : 25 → 50 Hz et τ = « t » (Couzin et Franks); Peters2006 sans DOI; Grassé : titre complet.

Principaux non vérifiables : annexes de SwarmBench (T9.30 à T9.32, dont max_round = 100, 15 agents à règles, tableaux S.5, S.6, S.7); « F fort à θ_a = 1000 °/s » (carte en image); « ≈ 10 000 abeilles » (Peleg v1); « 1 024 robots » (Rubenstein); « EDO non linéaires » (Camazine 1990); fig. 3e et « 3 jours » (Johnson); « testé jusqu'à 5 fourmis/s » (Garnier); contenus de Beekman 2006, Berman 2011, Liu 2011; notes SI de Gelblum 2015.

**Ce qui tient.** Aucune référence inventée. Toutes les valeurs numériques des articles lus en texte intégral (Couzin et Franks, Peters, Vicsek, Gelblum 2015 et 2016, Reid, Garnier, Mlot, Khuong, Johnson, Heyde, Peleg v1) sont retrouvées à l'identique, y compris les incohérences signalées par le dossier (ρ de Vicsek; L_A de Reid), que j'ai recalculées. Les effectifs du tableau de parité (§4.7 du dossier) sont retrouvés : 98 expériences et 5 colonies (*P. longicornis*), 226 individus, 23 expériences, 13 ponts, N = 30 radeaux, 11 réplications et 13 colonies (*L. niger*), 3 essais par condition (Peleg v1), 2 essaims (Greggers), 3 essaims dont un seul analysé en entier (Schultz, nuance de §1.1). Le constat d'asymétrie côté abeille tient, et la liste des travaux sur le guidage de l'essaim pourrait s'élargir (§2.8).

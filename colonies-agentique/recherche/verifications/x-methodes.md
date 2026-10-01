# Vérification indépendante — dossier x-methodes

Date : 2026-10-01. Vérificateur indépendant et sceptique; rien du dossier n'a été tenu pour acquis.

**Verdict.** Aucune référence fausse ni inventée : les 93 lignes de références du dossier (sections 2.1 à 2.3) existent, avec des métadonnées exactes pour l'essentiel. Bilan : **84 confirmées, 6 corrigées, 3 non vérifiables, 0 fausse**. Trois affirmations du dossier sont toutefois **fausses ou mal transcrites** et doivent être corrigées avant usage : (1) ODD 2020 ne renomme pas *Basic principles* en *Theoretical and empirical background* (M1); (2) la « référence 8 » de la revue de Gillespie 2007 est l'article de 1976, pas celui de 1977 (M10a); (3) l'éq. 8 de Miller 2024 est recopiée avec le facteur 1/n à l'intérieur de la racine (M9). Les 25 résultats cibles X1 à X25 se reproduisent : 23 confirmés, 2 non vérifiables (X17 et X19, qui dépendent de la lecture de r et du sens de « ± » chez Sumpter et Pratt 2009).

## Méthode et limites

- **Métadonnées** : API Crossref, OpenAlex (jusqu'à son blocage : 429 avec reprise dans environ 10 h), API Europe PMC (PMID, PMCID, résumés), API arXiv, API HAL, API Zenodo, pages JASSS.
- **Textes intégraux lus** (PDF téléchargés, convertis en texte local par `pdftotext`; formules et figures rendues en image par PyMuPDF quand le texte était illisible) : Miller 2024 (arXiv v1); Grimm 2006, 2010, 2020 (+ suppléments S1, S7); Axtell et al. (manuscrit du 1995-09-01); Morris et al. (arXiv v1, 1712.03198); Siepe et al. (manuscrit accepté, UCL); Lee et al. 2015 (PDF JASSS); Gillespie 2007; O'Neill 2014; Blackman et Vigna (arXiv v3); FAIR4RS v1.0; Vanhée et al. 2025 (v1). Pages HTML lues : JASSS (Wilensky et Rand, ten Broeke, Hauke, Edmonds et Hales, Thiele, Galán), docs Anthropic, Zenodo, GitHub, CFF, SWH, CC, OSF, COS, Tri-Agence, PLOS CB, AAMAS 2027, ALIFE, MDN, V8, rust-random/rngs, Vigna.
- **Calculs refaits** : script indépendant (stdlib) pour les valeurs de Miller, Morris, Lakens, TOST, K-S, équilibres et σ\* de M1c; puis exécution du script du dossier (`x_methodes_checks.py`, toutes sections) : les sorties sont identiques à celles du dossier.
- **Inaccessibles** : Wiley et PMC (PDF, 403), ScienceDirect (403), Springer (mur de témoins, non contourné), blog de Gelman (403), wikicfp (connexion refusée), Royal Society (403). Le quota WebSearch (200/200) s'est épuisé en cours de route; l'outil scientifique est épuisé (30/mois). Aucune absence de source n'est conclue faute d'avoir pu la chercher.

**Légende des statuts de référence** : **C** confirmée; **Corr.** confirmée après correction; **NV** non vérifiable; **F** fausse. **Marques de lecture (moi)** : [T] texte intégral; [R] résumé; [M] métadonnées; [S] source secondaire nommée; [I] calcul ou inférence de ma part.

---

## 1. Références : statut, correction, URL

### 1.1 Références demandées par la portée (39)

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| Grimm2006 | C | 28 auteurs (liste complète dans Crossref; « et al. » du dossier acceptable). 198(1–2), 115–126 ✓. [T] PDF : sept éléments nommés ✓; §2.6 « Input » : archiver les fichiers d'entrée, graine comprise ✓. | https://api.crossref.org/works/10.1016/j.ecolmodel.2006.04.023 ; https://bio.uib.no/te/papers/Grimm_2006_A_standard_protocol.pdf |
| Grimm2010 | C | 221(**23**), 2760–2768 (numéro de fascicule à ajouter). [T] PDF éditeur (pagination 2760–2768) : voir M1 (54 publications, 62 %, 75 %, 11 %). | https://api.crossref.org/works/10.1016/j.ecolmodel.2010.08.019 ; https://bio.uib.no/te/papers/Grimm_2010_The_ODD_protocol_.pdf |
| Grimm2020 | Corr. | JASSS 23(2), 7; reçu 2019-11-08, accepté 2020-02-16, **publié 2020-03-31**; 19 auteurs dans l'ordre du dossier ✓. **Affirmation fausse en M1** : *Basic principles* n'est pas renommé; la fig. 1 de 2020 le garde en tête des 11 concepts, et *Theoretical and empirical background* est un élément d'**ODD+D** (Müller 2013), cité dans le texte à propos des patrons. La numérotation des éléments est à reprendre « telle quelle » (légende de la fig. 1), alors qu'elle était facultative en 2010. [T] PDF + image de la fig. 1. | https://api.crossref.org/works/10.18564/jasss.4259 ; https://www.jasss.org/23/2/7.html ; https://www.jasss.org/23/2/7/7.pdf |
| Grimm2005 | C | Science 310(5750), 987–991, 2005-11-11; PMID 16284171 ✓. [R] Europe PMC : cadre unificateur de « décodage » des systèmes à agents; ni équation ni seuil ✓. | https://api.crossref.org/works/10.1126/science.1116681 |
| Axtell1996 | C | CMOT 1(2), 123–141 ✓ (Crossref : 1996-02). [T] manuscrit (umich.edu) : trois niveaux **numerical identity / distributional equivalence / relational equivalence**; U critique 23 (n = 10); K-S 0,304 (n = 40); « 11 des 12 » comparaisons non rejetées; 20×20 : K-S 0,5; moyennes 16,25 contre 9,23 ✓. **Réserve** : version publiée non lue; Wilensky et Rand 2007 attribuent à Axtell ces trois catégories avec l'étiquette « relational alignment ». | https://api.crossref.org/works/10.1007/BF01299065 ; https://websites.umich.edu/~axe/research/Aligning_Sim.pdf |
| WilenskyRand2007 | C | JASSS 10(4), 2, 2007-10-31 ✓. [T*] §2.15 : les trois catégories (« numerical identity », « distributional equivalence », « relational alignment »), créditées à Axtell et al. 1996; §5.7–5.8 : dix runs, test t à 95 %; §5.10, 5.17, 5.19 : méthode d'interaction, ordre des événements, mélange avant reproduction; §6.1 : fixer d'avance le standard de réplication ✓. | https://www.jasss.org/10/4/2.html |
| TenBroeke2016 | Corr. | JASSS 19(1), 5, 2016-01-31 ✓. Trois méthodes comparées (OFAT étendue, régression, Sobol'), **Morris absent** ✓. **Corrections** : (i) le seuil R² > 90 % est donné en exemple (§3.8) pour essayer d'autres fonctions de régression, pas comme exigence; l'étude elle-même retient R² = 43,9 % comme « raisonnablement précis » (§5.11); (ii) N = 1 000 et k = 15 pour Sobol' ne sont pas écrits : l'article donne 17 000 runs au total (§5.5) et k = 15 (tableau 1); N(k+2) est une déduction [I]. | https://www.jasss.org/19/1/5.html |
| Saltelli2002 | C | CPC 145(2), 280–297 ✓, un seul auteur ✓. [M] | https://api.crossref.org/works/10.1016/S0010-4655(02)00280-1 |
| Saltelli2010 | C | CPC 181(2), 259–270; six auteurs ✓. [M] | https://api.openalex.org/works/doi:10.1016/j.cpc.2009.09.018 |
| Saltelli2019 | C | EM&S 114, 29–39; huit auteurs ✓. [R] (S2) : couloirs unidimensionnels, mésusage « au moins aussi grave » que celui du test p, méthodes matures depuis environ deux décennies ✓. Licence CC BY 4.0 non vérifiée. | https://api.openalex.org/works/doi:10.1016/j.envsoft.2019.01.012 |
| Morris2019 | C | Stat Med 38(11), 2074–2102; PMC6492164 ✓. [T] préimpression v1 (arXiv:1712.03198) : MCSE de l'ES empirique = EmpSE/√(2(n_sim−1)) ✓; n_sim = 1 900 (couverture 95 %, ES 0,5 %) et 10 000 (pire cas) ✓; 93 études sur 100 sans ES de Monte Carlo ✓. **Réserve** : la numérotation « Tableau 6 » et « §5.3 » n'est pas vérifiable (PDF Wiley 403); en v1 les formules sont dans le §5.2 et le calcul de n_sim dans le §5.4. | https://api.crossref.org/works/10.1002/sim.8086 ; https://arxiv.org/abs/1712.03198 |
| Schuirmann1987 | C | 15(6), 657–680; PMID 3450848 ✓. [R] : TOST ⇔ IC « le plus court » de Westlake à 1−2α; propriétés supérieures à l'approche par la puissance « dans la plupart des cas » ✓. | https://api.openalex.org/works/doi:10.1007/BF01068419 |
| Lakens2017 | C | SPPS 8(4), 355–362 ✓; titre complet avec sous-titre ✓ (Europe PMC); PMC5502906 ✓. [T*] tableau 1 : 70, 191, 429 ✓. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC5502906&format=json |
| Lakens2018 | C | AMPPS 1(2), 259–269; trois auteurs ✓. [R] : SESOI ✓. | https://api.openalex.org/works/doi:10.1177/2515245918770963 |
| Miller2024 | Corr. | arXiv:2411.00640 v1 (2024-11-01), 14 p., seule version ✓. [T] : éq. 1–10 ✓, exemples ✓ (voir M9). **Corrections** : l'éq. 8 imprime 1/n **hors** de la racine carrée; le dossier la recopie avec (1/n) dedans. L'éq. numérotée (5) est l'IC 95 %; la formule SE_{A−B} = √(SE_A²+SE_B²) n'est pas numérotée. | https://arxiv.org/abs/2411.00640 |
| Gillespie1977 | Corr. | JPC 81(25), 2340–2361 ✓ [M]. **Affirmation fausse en M10a** : dans la revue de 2007, la réf. 8 est Gillespie 1976 (J. Comput. Phys. 22:403–434) et la réf. 9 est l'article de 1977. La méthode de la première réaction est « notée dans la réf. 8 » et prouvée exacte par elle. Ajouter Gillespie 1976 aux références. | https://api.openalex.org/works/doi:10.1021/j100540a008 |
| Gillespie2007 | C | Annu. Rev. Phys. Chem. 58, 35–55 (en ligne 2006-10-12) ✓. [T] PDF : éq. 8–9, 10a,b, 15a,b ✓ (voir M10a). | https://www.dna.caltech.edu/courses/cs191/paperscs191/gillespie1.pdf |
| RK4 | C | [S] Wikipédia : formules de k1 à k4, erreur locale O(h⁵), globale O(h⁴), pas de A-stabilité pour les méthodes explicites ✓. Les originaux (Runge, Kutta) : voir ligne « Runge1895 / Kutta1901 ». | https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods |
| ONeill2014 | C | HMC-CS-2014-0905, émis le 2014-09-05 ✓. [T] : état b bits, sorties b/2; périodes 2⁶⁴ et 2¹²⁸; 2^(b−1) flux « complets et distincts »; passe TestU01 ✓. « Non évalué par les pairs » : inféré du statut de rapport technique [I]. | https://www.cs.hmc.edu/tr/hmc-cs-2014-0905.pdf |
| BlackmanVigna2021 | C | ACM TOMS 47(4), 1–32, 2021-09-28 ✓; arXiv v3 2022-03-28 ✓. [T] §5.3 : `xoshiro128++` et `xoshiro128**` « premier choix » 32 bits; amorçage par SplitMix; la graine doit être conservée ✓. | https://api.openalex.org/works/doi:10.1145/3460772 ; https://arxiv.org/abs/1805.01407 |
| Sorensen2015 | C | ITOR 22(1), 3–18 ✓ (en ligne 2013-02-08). [R] (OpenAlex, résumé reconstruit) : « tsunami », insectes, écoulement d'eau, musiciens, éloignement de la rigueur ✓. | https://api.openalex.org/works/doi:10.1111/itor.12001 |
| Barker2022 | C | Sci Data 9, 622, 2022-10-14 ✓. **11 auteurs** : Barker, Chue Hong, Katz, Lamprecht, Martínez-Ortiz, Psomopoulos, Harrow, Castro, Gruenpeter, Martinez, Honeyman (lève la question ouverte 4). [M] seulement. | https://api.openalex.org/works/doi:10.1038/s41597-022-01710-x |
| FAIR4RS1.0 | C | v1.0, 2022-05-24, CC BY 4.0, DOI 10.15497/RDA00068 ✓ (Zenodo 6623556). [T] : les 17 principes F1 à R3 sont identiques mot pour mot au tableau du dossier; définition du logiciel de recherche ✓; « quelle que soit la licence » ✓. | https://zenodo.org/api/records/6623556 |
| CFF | C | [T*] version 1.2.0; clés obligatoires `authors`, `cff-version`, `message`, `title` ✓ (guide du schéma); les dix clés « utiles » existent ✓; Zenodo n'utilise qu'un sous-ensemble et **ignore entièrement CITATION.cff si `.zenodo.json` existe** ✓; GitHub : « Cite this repository » (APA, BibTeX) ✓. | https://raw.githubusercontent.com/citation-file-format/citation-file-format/main/schema-guide.md ; https://help.zenodo.org/docs/github/describe-software/citation-file/ |
| GitHubZenodo | C | [T*]. Précision : l'exigence « dépôt public + licence + approbation par le propriétaire de l'organisation » est dans la doc **GitHub**; les pages Zenodo lues (« enable repository », « github-upload ») ne l'énoncent pas, ni le webhook, ni les brouillons. Issue zenodo #2281 ✓ (2022-01-13, fermée). Blog 2017-05-30 ✓ [R]. | https://docs.github.com/en/repositories/archiving-a-github-repository/referencing-and-citing-content ; https://github.com/zenodo/zenodo/issues/2281 |
| SWH | C | [T*] SWHID = ISO/IEC 18670 depuis le 2025-04-23 ✓; SWHID du **répertoire** recommandé pour une citation ✓; code source seulement ✓; `codemeta.json` ✓; CITATION.cff non mentionné ✓. | https://www.softwareheritage.org/faq/ |
| Licences | C | [T*] MIT (conserver les avis) ✓; Apache-2.0 (avis, mention des modifications, NOTICE, licence de brevet) ✓; CC : déconseille ses licences pour le logiciel, CC0 acceptable; les licences 4.0 couvrent les droits sui generis sur les bases de données ✓. | https://choosealicense.com/licenses/apache-2.0/ ; https://creativecommons.org/faq/ |
| TriAgence | C | [T*] page modifiée le 2025-12-19 ✓; trois piliers ✓; dépôt des données, métadonnées **et code** à l'appui des conclusions ✓; stratégies institutionnelles au 2023-03-01 ✓; PGD : premiers concours au printemps 2022, extension en cours ✓. DMP Assistant : gratuit, bilingue, Alliance de recherche numérique ✓. | https://science.gc.ca/site/science/en/interagency-research-funding/policies-and-guidelines/research-data-management/tri-agency-research-data-management-policy |
| Chambers2013 | C | Cortex 49(3), 609–610; PMID 23347556 ✓. **À ajouter** : DOI 10.1016/j.cortex.2012.12.016. [M] | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:23347556%20AND%20SRC:MED&format=json |
| ChambersTzavella2022 | C | NHB 6(1), 29–42 (en ligne 2021-11-15); PMID 34782730 ✓. [R] : aucun chiffre dans le résumé. | https://api.openalex.org/works/doi:10.1038/s41562-021-01193-7 |
| Nosek2018 | C | PNAS 115(11), 2600–2606; PMC5856500 ✓. [R] : postdiction contre prédiction ✓. | https://api.openalex.org/works/doi:10.1073/pnas.1708274114 |
| OSF | C | [T*] enregistrement horodaté, non modifiable après soumission, embargo jusqu'à quatre ans, retrait avec métadonnées conservées, « Updates » séparés, modèles OSF Preregistration / Open-Ended / Registered Report Protocol / AsPredicted ✓. COS : étape 1, étape 2 avec section « Exploratory Analyses », plus de 300 revues ✓. | https://help.osf.io/article/330-welcome-to-registrations ; https://www.cos.io/initiatives/registered-reports |
| JRSI | C | [S] (résultats de recherche; page éditeur 403) : recherche à l'interface des sciences physiques et de la vie; données et code à la disposition des relecteurs dès la soumission (site personnel admis), publics à la publication ✓. | https://royalsociety.org/journals/ethics-policies/data-sharing-mining/ |
| PLOSCB | C | [T*] code public à la publication; politique lancée le **2021-03-30**; Zenodo, CodeOcean, Software Heritage; licence précisée, conforme à l'OSD encouragée; licences CC déconseillées pour le code ✓. | https://journals.plos.org/ploscompbiol/s/code-availability |
| SwarmIntell | C | [S] (résultat de recherche; page Springer : mur de témoins) : contrôle décentralisé, insectes sociaux, ACO, PSO, trimestriel, sans frais de page ✓. | https://link.springer.com/journal/11721/aims-and-scope |
| ALIFE2027 | C | [T*] Prague, 19–23 juillet 2027, UCT Prague et ČVUT ✓; ALIFE 2026 Waterloo (Ontario), 17–21 août 2026 ✓; aucune échéance publiée ✓. | https://alife.vscht.cz/ ; https://www.alife.org/conference/ |
| JASSS | C | [S] (résultats de recherche; page d'accueil vide) : ODD recommandé; code recommandé, non exigé; évaluation facultative du modèle par CoMSES ✓. | https://www.jasss.org/ |
| AAMAS2027 | C | [T*] Hanoï, 3–7 mai 2027 ✓; résumé 2026-10-01, article 2026-10-08, réfutation 20–24 nov., notification 2026-12-21, version finale 2027-01-25 ✓; **« tous les délais à la fin du jour indiqué, Anywhere on Earth (UTC−12) »** ✓; Blue Sky : résumé 2026-11-05, article 2026-11-12; Fast Track AAAI 2026-12-11; tutoriels 2026-12-10; ateliers 2026-10-29 ✓. Inscription des auteurs sur OpenReview le 2026-09-17 (absent du dossier). La reproductibilité figure parmi les critères d'évaluation, sans liste de contrôle ✓. | https://www.warwick.ac.uk/fac/sci/dcs/aamas2027/calls/call-for-main-track/ |
| JAAMAS | C | [S] (résultats de recherche; Springer : mur de témoins) : portée incluant auto-organisation, fonctionnalité émergente, intelligence en essaim ✓; partenariat IFAAMAS : formulation à nuancer, la source dit que les articles acceptés dans les 12 mois **précédant la conférence** y sont présentés (le dossier écrit « précédant la notification »). | https://link.springer.com/journal/10458/updates/17308940 |

### 1.2 Références ajoutées (10)

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| Siepe2024 | C | Psychological Methods, en ligne 2024-11-14; six auteurs ✓; PMC7616844 ✓. [T] manuscrit accepté : 321 articles (Psychological Methods, Behavior Research Methods, Multivariate Behavioral Research, 2021–2022), 100 avec simulation; **8 %** justifient n_sim, **3 %** le calculent, **77 %** sans incertitude de Monte Carlo, **64 %** sans code ✓. | https://discovery.ucl.ac.uk/id/eprint/10200328/1/Simulation_Studies_for_Methodological_Research_in_Psychology_ACCEPTED.pdf |
| Pawel2024 | C | Biom J 66(1), e2200091 (en ligne 2023-03-08) ✓. [R] : pratiques douteuses, protocoles préenregistrés, études neutres, partage du code ✓. | https://api.openalex.org/works/doi:10.1002/bimj.202200091 |
| Thiele2014 | C | JASSS 17(3), 11; DOI 10.18564/jasss.2503 (à ajouter) ✓. [T*] LHS, Morris, Sobol', FAST, ABC; `sensitivity`, `lhs`, `abc`, `RNetLogo`; stabilisation du CV; dix répétitions ✓. | https://www.jasss.org/17/3/11.html |
| EdmondsHales2003 | C | JASSS 6(4), 11, 2003-10-31 ✓. [T*] double réplication; quatre conseils (alignement précoce, K-S, extinction progressive des fonctions, autre langage et autre programmeur) ✓. | https://www.jasss.org/6/4/11.html |
| Hauke2020 | Corr. | JASSS 23(1), 12, 2020-01-31 ✓. [T*] la publication d'origine (Miller et al. 2012) moyennait **100** runs; la réplication juge « 100 ou moins » à interpréter avec prudence (CV 0,14 à 100 runs contre 0,20 à 5 000) et **5 000 runs « suffisants »** (pas « nécessaires »); l'équivalence distributionnelle est « suggérée » (hint), non démontrée. | https://www.jasss.org/23/1/12.html |
| Lakens2024 | C | Collabra 10(1), 117094 ✓. [R] : cinq catégories de déviations ✓. Chapitre 13 du livre (Zenodo 6409077, v1.0.0, 2022-04-03) : [M] seulement. | https://api.openalex.org/works/doi:10.1525/collabra.117094 ; https://zenodo.org/api/records/6409077 |
| WillrothAtherton2024 | C | AMPPS 7(1) (non indiqué au dossier). [R] : cadre standardisé de rapport; sondage de 34 éditeurs. | https://api.openalex.org/works/doi:10.1177/25152459231213802 |
| Bowyer2025 | C | arXiv:2503.01747 v3; « ICML 2025 Spotlight Position Paper » ✓. [R] : TLC trop optimiste; alternatives fréquentistes et bayésiennes; bibliothèque Python ✓. | http://export.arxiv.org/api/query?id_list=2503.01747 |
| Atil2024 | C | arXiv:2408.04667 v5 (2025-04-02) ✓. [R] : jusqu'à 15 %; cinq LLM, huit tâches, dix exécutions; aucun modèle répétable sur toutes les tâches ✓. | http://export.arxiv.org/api/query?id_list=2408.04667 |
| Aranha2022 | C | Swarm Intell. 16(1), 1–6, en ligne 2021-11-30; huit auteurs ✓; licence CC BY (version 4.0 non lue). [M] + résumé (S2). | https://api.openalex.org/works/doi:10.1007/s11721-021-00202-9 |

### 1.3 Références complémentaires (44)

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| CamachoVillalon2023 | C | ITOR 30(6), 2945–2971; trois auteurs; en ligne 2022-07-26 (le fascicule est de 2023 : correction du dossier exacte) ✓. [R] (S2) ✓. | https://api.openalex.org/works/doi:10.1111/itor.13176 |
| Rahman2025 | Corr. | arXiv:2506.14496 v3 mis à jour le 2026-08-27 ✓. [R] : le « environ 300 fois » concerne **Boids** (LLM contre classique); l'article étudie aussi l'ACO, sans ce chiffre. La phrase de M11 (« Boids et colonies de fourmis… 300 fois ») est à scinder. | http://export.arxiv.org/api/query?id_list=2506.14496 |
| Madaan2024 | C | arXiv:2406.10229 v1 ✓. [R] : variance de graine ✓. | http://export.arxiv.org/api/query?id_list=2406.10229 |
| Card2020 | C | arXiv:2010.06595; EMNLP 2020 ✓. [R] : 2 000 phrases ≈ 75 % de puissance pour 1 point de BLEU ✓. | http://export.arxiv.org/api/query?id_list=2010.06595 |
| Kapoor2024 | C | arXiv:2407.01502 ✓. [R] : coût avec l'exactitude; jeux réservés ✓. | http://export.arxiv.org/api/query?id_list=2407.01502 |
| Chen2023 | C | arXiv:2307.09009 v3 (2023-10-31) ✓. [R] : 84 % → 51 % ✓. | http://export.arxiv.org/api/query?id_list=2307.09009 |
| Anthropic2026 | C | [T*] trois pages lues le 2026-10-01 (voir X22, X23). Chaque identifiant est un instantané figé, y compris sans date dès la génération 4.6 ✓. | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| Judd2012 | C | JPSP 103(1), 54–69; DOI 10.1037/a0028347; PMID 22612667 ✓. [R] | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:22612667%20AND%20SRC:MED&format=json |
| Barr2013 | C | **J Mem Lang 68(3), 255–278**; DOI 10.1016/j.jml.2012.11.001; PMC3881361 ✓ (à ajouter). [R] : structure aléatoire maximale « justifiée par le plan » ✓. | https://api.openalex.org/works/doi:10.1016/j.jml.2012.11.001 |
| Bates2015 | C | JSS 67(1); DOI 10.18637/jss.v067.i01; quatre auteurs ✓; arXiv:1406.5823 ✓. [R] | https://arxiv.org/abs/1406.5823 |
| GreenMacLeod2016 | C | MEE 7(4), 493–498; titre : « SIMR : an R package… » ✓. [M] | https://api.openalex.org/works/doi:10.1111/2041-210X.12504 |
| Holm1979 | C | Scand. J. Stat. 6, 65–70; **DOI 10.2307/4615733** (à ajouter); numéro (2) non confirmé par ma consultation. [R] (résumé rapporté par recherche) : niveau garanti pour toute combinaison d'hypothèses vraies ✓. | https://api.openalex.org/works/doi:10.2307/4615733 |
| BH1995 | C | JRSS B 57(1), 289–300 ✓. [M] | https://api.openalex.org/works/doi:10.1111/j.2517-6161.1995.tb02031.x |
| Gelman2018 | C | [S] (résumé de recherche; blog 403, comme pour le dossier) : ES de l'interaction = 2 × celui de l'effet principal; 16 fois le n si l'interaction vaut la moitié ✓. Le « 4 fois » (interaction égale à l'effet principal) vient du calcul [I], non de la source. | https://statmodeling.stat.columbia.edu/2018/03/15/need16/ |
| Lee2015 | C | JASSS 18(4), 4; dix auteurs ✓. [T] PDF + image : **la formule imprimée est n_min ≥ 2 (s²/δ)(t+t)² sans carré sur δ** (erreur probable de l'article); la forme standard du dossier (δ²) reste la bonne. « 100 ou moins » courants ✓ (§2.3). | https://www.jasss.org/18/4/4/4.pdf |
| CampeloWanner2019 | C | arXiv:1908.01720 v1; soumis au J. Heuristics ✓. [R] : étape de Holm ✓. | http://export.arxiv.org/api/query?id_list=1908.01720 |
| BartzBeielstein2020 | C | arXiv:2007.03488 v2 (2020-12-16) ✓. [R] : huit sujets ✓. | http://export.arxiv.org/api/query?id_list=2007.03488 |
| Derrac2011 | C | SWEVO 1(1), 3–18; DOI 10.1016/j.swevo.2011.02.002 (à ajouter) ✓. [M] | https://api.openalex.org/works/doi:10.1016/j.swevo.2011.02.002 |
| ArcuriBriand2011 | C | ICSE 2011, p. 1–10 ✓. [R] : revue de 2009; les articles ne tiennent pas bien compte du hasard ✓. | https://api.openalex.org/works/doi:10.1145/1985793.1985795 |
| GrimmRailsback2012 | C | Phil Trans R Soc B 367(1586), 298–310; PMC3223804 ✓. [R] : (i), (ii), (iii) ✓. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC3223804&format=json |
| Grimm2014 | C | Ecol Model 280, 129–139; 12 auteurs ✓. [M] | https://api.openalex.org/works/doi:10.1016/j.ecolmodel.2014.01.018 |
| Planque2022 | NV | Publié dans Ecol Model 471, 110059 (2022-07-21), 19 auteurs ✓; préimpression Zenodo 5886180 (2022-01-21) ✓ : OPE, **25 questions**, six études de cas ✓. **Non résolu** : le résumé de la version publiée (reconstruit, partiel) associe « 25 » à des études de cas; texte publié non lu. | https://zenodo.org/api/records/5886180 |
| Muller2013 | C | EM&S 48, 37–48; 10 auteurs ✓. [M] | https://api.openalex.org/works/doi:10.1016/j.envsoft.2013.06.003 |
| Galan2009 | C | JASSS 12(1), 1; sept auteurs dans l'ordre du dossier ✓. [T*] définition d'artefact; réimplanter, relancer sur d'autres machines, systèmes et générateurs ✓. | https://www.jasss.org/12/1/1.html |
| HubermanGlance1993 | C | PNAS 90(16), 7716–7718; PMC47213 ✓. [R] : résultats très différents entre temps discret et continu ✓. | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=PMCID:PMC47213&format=json |
| CaronLormier2008 | C | Ecol Model 212(3–4), 522–527 ✓. [R] (RePEc) : différences surtout aux fortes densités et avec une complexité d'interaction croissante ✓. | https://ideas.repec.org/a/eee/ecomod/v212y2008i3p522-527.html |
| Campolongo2007 | C | EM&S 22(10), 1509–1518 ✓. [M] | https://api.openalex.org/works/doi:10.1016/j.envsoft.2006.10.004 |
| Morris1991 | C | Technometrics 33(2), 161–174 ✓. [M] La formule r(k+1) reste [I] (non relue). | https://api.openalex.org/works/doi:10.1080/00401706.1991.10484804 |
| Sobol2001 | C | Math. Comput. Simul. 55(1–3), 271–280 ✓. [M] | https://api.openalex.org/works/doi:10.1016/S0378-4754(00)00270-6 |
| VignaPCG | C | [S] (page d'opinion de l'auteur) : « aucune raison technique sensée »; flux corrélés (Durst 1989); état 64 bits retrouvé à partir de **trois sorties**; 2,75 ns contre 0,95 ns pour `xoroshiro128++` ✓. | https://pcg.di.unimi.it/pcg.php |
| MDNRandom | C | [T*] MDN : la graine « ne peut être choisie ni réinitialisée »; fonctions `Math` à précision dépendante de l'implémentation ✓. V8 : article du **2015-12-17**, MWC1616 → xorshift128+, Chrome 49 ✓. | https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random ; https://v8.dev/blog/math-random |
| RustCrates | C | [T*] vecteurs de `xoshiro128**` (graine [1,0,0,0,2,0,0,0,…] octets = état [1,2,3,4]), SplitMix64 (graine 1477776061723855037, 50 valeurs) et PCG32 `new(42, 54)` (« numbers copied from official test suite ») : identiques au dossier; constantes PCG 6364136223846793005, 59, 18, 27 ✓. | https://raw.githubusercontent.com/rust-random/rngs/master/rand_xoshiro/src/xoshiro128starstar.rs ; …/rand_pcg/tests/lcg64xsh32.rs |
| VISA2026 | C | arXiv:2607.28027 v1 (2026-07-30); auteur « Zhou He » ✓. [R] : huit tables et règles exécutables ✓. | http://export.arxiv.org/api/query?id_list=2607.28027 |
| Vanhee2025 | C | arXiv:2507.05723 v1 (2025-07-08); onze auteurs; accepté à la Social Simulation Conference 2025 ✓. **Statut à relever** : le résumé ne dit rien d'ODD, mais le **texte intégral** [T] recommande des protocoles structurés (« e.g., ODD, RAT ») pour guider la documentation assistée par LLM ✓. | https://arxiv.org/pdf/2507.05723v1 |
| Sauro2025 | C | arXiv:2502.15597 v1 ✓. [R] | http://export.arxiv.org/api/query?id_list=2502.15597 |
| CoMSES | C | [T*] ODD (2020 : « Purpose and patterns »; variantes résumé, imbriqué, delta, ODD+D), codemeta, DataCite ✓. La page ne contient pas la liste des revues (simple lien). | https://www.comses.net/resources/standards/ |
| Steele2014 | C | OOPSLA '14, p. 453–472; DOI 10.1145/2660193.2660195 ✓; réf. [36] de Blackman et Vigna ✓ [T]. | https://api.openalex.org/works/doi:10.1145/2660193.2660195 |
| Matsumoto2007 | C | ACM TOMACS 17(4) (2007), quatre auteurs; réf. [27] de Blackman et Vigna ✓ [T]. | https://arxiv.org/pdf/1805.01407v3 |
| Smith2016 | C | PeerJ CS 2, e86 (2016-09-19); trois auteurs et le groupe FORCE11 ✓. [M] | https://api.openalex.org/works/doi:10.7717/peerj-cs.86 |
| Wilkinson2016 | C | Sci Data 3, 160018 (2016-03-15); 52 auteurs ✓. [M] | https://api.openalex.org/works/doi:10.1038/sdata.2016.18 |
| GECCO2027 | NV | Cracovie, **12–16 juillet 2027**, en présentiel ✓ (site officiel). **Échéances non vérifiables** : les pages officielles « Call-for-Papers » et « Important-Dates » affichent encore les dates de 2026 (19 et 26 janvier 2026, conférence du 13–17 juillet 2026); les dates 2027 (2027-01-19, 2027-01-26) ne viennent que d'un résumé de recherche de wikicfp [S, non recoupé]. | https://gecco-2027.sigevo.org/HomePage |
| ANTS | C | [S] ANTS 2026 : 15e conférence, Darmstadt, 8–10 juin 2026 ✓ (site officiel); « 21 articles longs et 21 courts sur 93 soumissions » (résumé de recherche de la page Springer); le programme annonce « Announcing ANTS 2028 » (modération de Marco Dorigo, 9 juin); lieu et dates de 2028 absents ✓. | https://ants2026.org/ |
| DiCosmo2017 | C | **Statut NV → V [M]** : existe (HAL hal-01590958, communication, iPRES 2017, 14e conférence; Di Cosmo et Zacchiroli); pas de DOI. | https://api.archives-ouvertes.fr/search/?q=halId_s:hal-01590958 |
| Runge1895 / Kutta1901 | NV | Non cherchés dans une source primaire; la page Wikipédia consultée ne contient pas la liste de références. | — |

---

## 2. Résultats cibles et paramètres

### 2.1 Résultats cibles X1 à X25 (section 4 du dossier)

| ID | Statut | Ce que j'ai lu ou recalculé |
|---|---|---|
| X1 | C | Vecteur de `xoshiro128**` identique à la source (rust-random/rngs) [T*]; reproduit par le script [I]. |
| X2 | C | Vecteur PCG32 identique (tests de `rand_pcg`) [T*]; reproduit [I]. |
| X3 | C | SplitMix64 : graine et trois premières valeurs identiques; 50 valeurs dans la source [T*]; reproduit [I]. |
| X4 | C | Rapports 19,3; 16,6; 16,2 (RK4) et 1,8; 1,9; 2,0 (Euler) reproduits [I]; ordre 4 [S] Wikipédia. |
| X5 | C | Équilibre (0,8497 ; 0,0392) refait en forme analytique : 0,84966 et 0,03923 [I]; cohérent avec le dossier P5 (A2) et sa vérification. |
| X6 | C | E[A(2)] = 200(1−e⁻¹) = 126,42 [I]; SSA 126,16 ± 0,15 (1,7 ES) reproduit. |
| X7 | C | Reproduit [I]. Aucune valeur publiée (exploratoire), comme le dit le dossier. |
| X8 | C | [T] §5 : n ≈ 969 pour ω² = 1/9, Δ = 0,03, α = 0,05, 80 %; recalcul 968,997 [I]. |
| X9 | C | [T] §5 : n = 198, σ² = 1/6, ω² = 1/9 : MDE 13,2 % puis 7,5 %; recalcul 13,27 % puis 7,57 % [I] : valeurs publiées inférieures aux valeurs arrondies. |
| X10 | C | [T] §3.1 : Var(μ̂\|K) = Var(μ̂\|K=1)·(1+2/K)/3; K = 2, 4, 6 : réductions de 1/3, 1/2, 5/9; limite 2/3 ✓ (facteurs 2/3, 1/2, 4/9). |
| X11 | C | [T] §4.2 : texte « de 1/6 à 1/9 », réduction « de 1/3 »; calcul avec ses propres entrées (Var = 1/12, corrélation 0,5) : 1/6 → **1/12**; 1/9 correspond à ρ = 1/3 [I]. L'écart du dossier est réel. L'exemple de la §5 (ω² = 1/9) hérite de la même incohérence. |
| X12 | C | [T] préimpression Morris : 95 × 5 / 0,5² = 1 900; pire cas 10 000 ✓. |
| X13 | C | [T*] Lakens, tableau 1 : 70, 191, 429; approximation normale 68,5; 190,3; 428,2 [I]. |
| X14 | C | [T] Axtell : U critique 23 (n = 10), K-S 0,304 (n = 40); 1,358·√(80/1600) = 0,3037 [I]. |
| X15 | C | [S] Gelman (résumé de recherche) : ES × 2; 16 fois; calcul exact refait [I] (4 fois si l'interaction égale l'effet principal : [I] seulement). |
| X16 | C | [T] formule EmpSE/√(2(n−1)) dans Morris v1; simulation reproduite : rapports 0,990; 1,002; 0,988; 0,989 et, pour σ = 3, 0,1487 (observé) contre 0,1501 (formule) et 0,4495 (forme fausse) [I]. |
| X17 | NV | Chiffres reproduits exactement par le script (276,7 ± 67,6; 276,6 ± 71,4; 323,2; 325,3; écarts de 7,8 et 4,6 ES; +9,1 % et +5,0 % : recalculés [I]). Valeurs publiées 75,5 % / 253,7 ± 64,0 et 83,3 % / 307,8 ± 71,0 confirmées par `verifications/p5-quorum.md`. **Non vérifiables ici** : la lecture de r (« non vérifiable » chez P5) et le sens de « ± » chez Sumpter et Pratt 2009 (dossier : écart-type [I]); l'article n'a pas pu être relu (Europe PMC : erreur 500). |
| X18 | C | IC 90 % [−2,38 ; +3,91]; marges ±2 et ±4 points; n requis 7 920 et 1 980 (et 317 pour ±10) : refaits [I]. Valeur publiée 75,5 % confirmée par P5. |
| X19 | NV | IC 90 % [+18,5 ; +28,5] reproduit (demi-largeur 4,84 recalculée [I]); dépend du « ± » lu comme écart-type (voir X17). |
| X20 | C | [R] Atil : jusqu'à 15 %; la valeur de non-répétabilité à fixer relève du pilote, comme le dit le dossier. |
| X21 | C | [T*] MDN et V8 (2015-12-17, Chrome 49). |
| X22 | C | [T*] « Models released after Claude Opus 4.6 do not support setting temperature »; 1,0 accepté, autre valeur : 400; « not fully deterministic » à 0,0 ✓. Page de dépréciation : `temperature`, `top_p`, `top_k` rejetés si non défaut dès Opus 4.7. Liste des paramètres : `seed` absent de l'extrait, `top_p` tronqué : l'inexistence de `seed` n'est pas établie, le dossier le dit déjà. |
| X23 | C | [T*] Haiku 4.5 (`claude-haiku-4-5-20251001`) actif, « not sooner than October 15, 2026 »; Sonnet 4.5 déprécié 2026-09-30, retrait 2026-11-30; Sonnet 5.5, Opus 5.5, Fable 5.1 : 2027-09-28, 2027-09-22, 2027-09-01; préavis d'au moins 60 jours; la page reconnaît la perte d'accès pour les chercheurs ✓. |
| X24 | C | [T*] voir AAMAS2027. |
| X25 | C | [T*] voir PLOSCB. |

### 2.2 Affirmations chiffrées et paramètres de la section 3 (méthodes M1 à M13)

| Méthode | Statut | Affirmation et vérification |
|---|---|---|
| M1 | C | ODD 2006 : sept éléments aux noms *Purpose*, *State variables and scales*, *Input* ✓ [T]. |
| M1 | C | 2010 : éléments 2 et 6 renommés, *Fitness* → *Objectives*, +*Basic principles*, +*Learning*, onze concepts ✓ [T]. |
| M1 | C | 2020 : sept éléments, « Purpose and patterns », sous-sections *Rationale* facultatives, S2 à S7 ✓ [T, T*]; S7 : section « Calibration, simulation experiments, and model analysis », pas de temps, durée, conditions d'arrêt, nombre de répétitions ✓ [T]. |
| M1 | F | 2020 : « *Basic principles* devient *Theoretical and empirical background* » : **faux** [T, fig. 1 en image]. |
| M1 | Corr. | « Numérotation facultative » : vrai pour 2010 (légende de la fig. 1), faux pour 2020 (« tels que donnés, numérotation comprise »). |
| M1 | C | Citation : 2006 + 2020 (2020 le demande); 2006 + 2010 pour 2010 ✓ [T]. Pseudo-code, ordre des processus et des agents, synchrone ou asynchrone, « très grand effet » (Bigbee 2006; Caron-Lormier 2008) ✓ [T]; *Input data* ≠ paramètres, énoncé « n'utilise pas de données d'entrée » ✓; tableau des paramètres (dimension, unité, valeur) ✓ [T]. |
| M1 | C | Revue de 2010 : 87 citations (Web of Science, 2009-12-14), **54** utilisent ODD; *Input* correct dans **62 %**; **75 %** complet ou un élément manquant; **11 %** (six articles) avec plus de la moitié mal interprétée ✓ [T]. |
| M2 | C | POM : (i) échelles, entités, variables, processus; (ii) tester et sélectionner les sous-modèles; (iii) valeurs de paramètres : c'est le résumé de **Grimm et Railsback 2012** [R]; le résumé de 2005 est plus général ✓. OPE : 25 questions [R, préimpression]. |
| M3 | C | Axtell (voir 1.1) [T]. Wilensky et Rand (trois différences; §6.1) [T*]. Edmonds et Hales [T*]. Galán [T*] ✓. |
| M3 | Corr. | Hauke : « 5 000 nécessaires » → **suffisants**; « équivalence atteinte » → **suggérée** [T*]. |
| M4 | C | Ten Broeke : méthodes sans Morris; 1 650 (10 × 11 × 15); 5 000 (1 000 × 5); 17 000; bootstrap 10 000; R² 43,9 % (± 4,1); somme des indices de premier ordre 0,46; estimations négatives « par imprécision numérique »; moyenne sur t = 500–1 000; §6.5 OFAT comme point de départ ✓ [T*]. |
| M4 | Corr. | « R² exigé > 90 % » et « N = 1 000, k = 15 » : voir TenBroeke2016. |
| M4 | C | Thiele [T*]; Lee [T] (formule sans carré imprimée); Saltelli 2019 [R] ✓. |
| M5 | C | MCSE : biais, ES empirique (EmpSE/√(2(n−1))), couverture; n_sim; 93 sur 100 [T préimpression]; formules refaites par simulation [I]. |
| M5 | C | Siepe : 321, 100, 8 %, 3 %, 77 %, 64 % ✓ [T]. Pawel [R] ✓. |
| M6 | C | H₀₁, H₀₂; statistiques de Welch; IC à 90 %; tableau 1; « non significatif ≠ absence d'effet »; bornes dans le résumé [T*, Lakens 2017]; quatre issues (TOSTER, vignette CRAN) [T*]; Schuirmann [R]. Tableau de n pour proportions (1 713 … 69) refait [I]. |
| M7 | C | Judd, Barr, Bates, Green et MacLeod [R/M]; Gelman [S]; Holm [R]; BH [M]. |
| M8 | C | OSF, COS (plus de 300 revues; étape 1 / étape 2) [T*]; Lakens : cinq catégories de déviations [R]; Willroth [R]; ADEMP-PreReg [T] ✓. |
| M8 | NV | Royal Society Open Science « depuis 2015 » : l'année n'est pas vérifiable (COS la liste parmi les revues adoptantes, comme PLOS ONE). « Non trouvé » pour JRSI, PLOS CB (« Registered Report » absent de la page des lignes directrices, extrait partiel), JASSS, Swarm Intelligence : négatif non démontrable. Chapitre 13 de Lakens (livre) non relu. |
| M9 | C | Miller [T] : éq. 1–7, 9, 10 ✓; Tableau 4 : rapports 1,10 à 3,05 (modèles d'Anthropic; association ligne-valeur non établie) ✓; §3.3 « Don't touch the thermostat » ✓. |
| M9 | Corr. | Éq. 8 : le facteur 1/n est **à l'extérieur** de la racine (voir Miller2024). |
| M9 | C | Bowyer, Madaan, Card, Atil, Chen, Kapoor [R] ✓. Plateforme Anthropic [T*] ✓ (voir X22–X23). |
| M10a | C | Gillespie 2007 [T] : p(τ, j) = a_j(x) exp(−a₀τ) (éq. 8–9); méthode directe τ = (1/a₀) ln(1/r₁), j = plus petit entier avec somme > r₂a₀ (éq. 10a,b); première réaction τ_j = (1/a_j) ln(1/r_j) (éq. 15a,b), « moins efficace quand M est grand » ✓. |
| M10a | F | « Gillespie 1977 introduit les deux (réf. 8 de la revue) » : la réf. 8 est l'article de **1976**. |
| M10b | C | RK4 : formules, O(h⁵) local, O(h⁴) global, mauvais pour le raide [S] ✓. |
| M10c | C | PCG, xoshiro, SplitMix, critique de Vigna, `Math.random` : voir 1.1 et 1.3 ✓. Jump de `xoshiro128**` : 2⁶⁴ et 2⁹⁶ pas [T*, site de Vigna; l'article seul dit que des fonctions de saut existent]. |
| M10d | C | Huberman et Glance; Caron-Lormier; Grimm 2010; Wilensky et Rand ✓. |
| M11 | Corr. | Sörensen, Camacho-Villalón, Aranha ✓; Rahman : voir 1.3 (300 × pour Boids). |
| M12 | C | FAIR4RS (17 principes) [T]; CFF, Zenodo, SWH, licences, Tri-Agence [T*] ✓. |
| M13 | C | JRSI, PLOS CB, ALIFE, AAMAS, JAAMAS, ANTS [S/T*] ✓. |
| M13 | NV | GECCO 2027 : échéances (voir 1.3). |
| §6 | C | Sclar et al. (citée par l'audit, absente des tableaux de référence) : arXiv:2310.11324, « jusqu'à 76 points » avec LLaMA-2-13B ✓ [R]. À ajouter à la liste. |
| §7 | C | Citations du cadre (§2.4 pt 16, §4, §6.3, §6.5, §6.6, §7, §10), de la proposition v3 (l. 20, 73, 74), des audits (C4, C11, P7-f, Annexe A; simulation-technique M1, M17) et du dossier P5 (§5 : « l'écart résiduel vient probablement de l'ordre de mise à jour ») : exactes. |

---

## 3. Bilan chiffré

| Objet | Confirmé | Corrigé | Non vérifiable | Faux |
|---|---|---|---|---|
| Références (93 lignes de la section 2) | 84 | 6 (Grimm2020, TenBroeke2016, Miller2024, Gillespie1977, Hauke2020, Rahman2025) | 3 (Planque2022, GECCO2027, Runge1895 / Kutta1901) | 0 |
| Résultats cibles X1–X25 | 23 | 0 | 2 (X17, X19) | 0 |
| Affirmations et paramètres de la section 3 (33 lignes du tableau 2.2) | 24 | 5 | 2 (registres de revues M8; échéances GECCO M13) | 2 (renommage de *Basic principles*; réf. 8 de Gillespie) |

Trois affirmations de contenu sont **fausses ou mal transcrites** : renommage de *Basic principles* (Grimm 2020), réf. 8 de Gillespie 2007, facteur 1/n de l'éq. 8 de Miller (cette dernière classée « corrigée »). Elles figurent dans les lignes « Corr. » des références concernées (Grimm2020, Gillespie1977, Miller2024), d'où le bilan « 0 fausse » au niveau des références.

## 4. Corrections à reporter dans le dossier

1. **M1 et 2.1 (Grimm2020)** : supprimer « *Basic principles* devient *Theoretical and empirical background* » (cette appellation est celle d'ODD+D, Müller 2013); écrire que la numérotation est à reprendre telle quelle en 2020.
2. **M10a et 2.1 (Gillespie1977)** : « la revue de 2007 cite Gillespie 1976 (J. Comput. Phys. 22:403–434, réf. 8) et 1977 (réf. 9) comme présentation originale; la première réaction est notée et prouvée en réf. 8 »; ajouter Gillespie 1976.
3. **M9 (éq. 8)** : SE = (1/n)·[ΣΣΣ …]^{1/2}; l'éq. (5) numérotée est l'IC 95 % (le SE de la différence n'est pas numéroté).
4. **M4 et 2.1 (TenBroeke)** : R² > 90 % est un exemple de seuil, non une exigence; « N = 1 000, k = 15 » est une déduction (17 000 runs au total).
5. **M3 (Hauke)** : 5 000 runs « suffisants »; équivalence distributionnelle « suggérée ».
6. **M11 (Rahman)** : le facteur 300 s'applique à Boids.
7. **M4 (Lee)** : mettre à jour la note : la formule imprimée n'a pas de carré sur δ (confirmé dans le PDF); garder la forme standard.
8. **M5 (Morris)** : mentionner que la numérotation « Tableau 6 / §5.3 » n'a pas été vérifiée (version publiée inaccessible); en préimpression v1 : §5.2 et §5.4.
9. **M3 / §7 pt 1 (Axtell, W et R)** : préciser que « équivalence relationnelle » est lu dans le manuscrit d'Axtell (1995-09-01) et que Wilensky et Rand créditent Axtell pour ces trois catégories sous l'étiquette « relational alignment ».
10. **§7 pt 15** : « 69 par groupe pour d = 0,5 » est l'approximation normale (68,5); la valeur publiée (tableau 1 de Lakens) est 70, comme en M6.
11. **Références** : ajouter DOI et numéros : Chambers 2013 (10.1016/j.cortex.2012.12.016), Barr (68(3), 255–278; 10.1016/j.jml.2012.11.001), Holm (10.2307/4615733), Derrac (10.1016/j.swevo.2011.02.002), Thiele (10.18564/jasss.2503), Grimm2010 (issue 23); statut DiCosmo2017 NV → V [M]; statut Vanhée2025 : texte intégral confirme; auteurs de Barker 2022 (11).
12. **M13 (GECCO 2027)** : marquer les échéances « non confirmées » (le site officiel montre encore 2026); **AAMAS** : ajouter l'inscription OpenReview du 2026-09-17 et la mention « Anywhere on Earth (UTC−12) »; **JAAMAS** : « précédant la conférence ».
13. **GitHubZenodo (M12)** : attribuer à la doc GitHub l'exigence « dépôt public + licence + approbation de l'organisation ».
14. **Planque2022** : lever l'ambiguïté « 25 questions » contre « 25 études de cas » en lisant le texte publié.

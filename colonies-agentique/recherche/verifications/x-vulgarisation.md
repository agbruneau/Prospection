# Vérification indépendante du dossier X — Vulgarisation visuelle et évaluation pédagogique (V0)

Vérifié le 2026-10-01. Vérificateur indépendant : chaque source a été consultée directement; les lectures déclarées dans le dossier n'ont pas été reprises.

**Méthode.** Métadonnées : API Crossref (DOI par DOI), API ERIC, Europe PMC, PubMed E-utilities, API arXiv, DataCite, pages d'éditeur et d'auteurs. Texte intégral extrait localement (pdftotext) des PDF suivants : Hake 2002 (arXiv, 61 p.), Hake 1998 (ERIC ED441679, 28 p.), Nissen et al. (arXiv, 27 p.), Debunking Handbook 2020 (19 p.), Resnick 1996 (17 p.), prépublication PhET d'Adams et al. (37 p.), manuscrits d'auteur des parties I et II d'Adams et al. (IssueLab), Podolefsky et al. 2013 (30 p.), Khodr et al. 2022 (8 p.), Segel et Heer 2010, Lazonder et Harmsen 2016 (version de l'éditeur, Groningen), Kraft 2020 (EdWorkingPaper 19-10, août 2019), Berney et Bétrancourt (version EARLI, 3 p.), Wilensky et Resnick 1999, Nuñez et al. 2018 (PLOS ONE), EPTC 2 (éd. 2018, 237 p., et **éd. 2022**), Loi 25 (L.Q. 2021, c. 25, 64 p.). Les calculs ont été refaits par un script indépendant (`recalc.py`, stdlib seulement, scratchpad de session), puis comparés à la sortie de `x_vulgarisation_checks.py` (rejoué : tout PASS, sorties identiques aux miennes).

**Accès refusés ou illisibles, non contournés** : Springer et nature.com (boucle de témoins), ScienceDirect et ACM DL (403), ethics.gc.ca (certificat), tresor.gouv.qc.ca (404), vis.stanford.edu et physics.uwyo.edu (certificat), PDF de Hake publié dans l'*Am. J. Phys.*. Aucune absence n'est conclue d'un refus. Les commandes réseau de l'outil Bash ont été refusées; tout est passé par WebFetch et WebSearch. L'outil de recherche scientifique n'a pas été nécessaire.

**Légende des statuts.** *Confirmée* : la source existe, les métadonnées citées sont exactes et les affirmations attribuées sont retrouvées. *Corrigée* : la source existe, mais une métadonnée ou une affirmation est inexacte ou incomplète. *Non vérifiable* : je n'ai pas pu trancher. *Erronée* : la source n'existe pas ou dit le contraire (aucune).
**Légende de preuve** (pour les valeurs) : **[T]** texte intégral lu par moi; **[R]** résumé lu à la source; **[M]** métadonnées seulement; **[S]** source secondaire (nommée); **[I]** calcul ou inférence de ma part.

---

## 1. Références : tableau de vérification

Les compléments de DOI ou de pagination (colonne « Correction ») ne sont pas des erreurs du dossier sauf mention « Corrigée ». URL = page effectivement consultée (« Crossref » = `api.crossref.org/works?filter=doi:…`).

### 1.1 Références demandées par la portée (48)

| Clé | Statut | Correction ou complément | URL |
|---|---|---|---|
| Victor2011a | Confirmée | Titre, auteur et date (10 mars 2011) exacts. Aucune donnée empirique citée [R]. | worrydream.com/ExplorableExplanations/ |
| Victor2011b | Confirmée | Octobre 2011; « stepping down is as important as stepping up » [T, extrait]. | worrydream.com/LadderOfAbstraction/ |
| Case | Confirmée | ncase.me : 10 projets (dont *The Evolution of Trust*, *Emoji Simulator*, *Nutshell*); « public domain waiver » (CC0); aucune évaluation mentionnée. explorabl.es : aucune évaluation non plus. | ncase.me ; explorabl.es |
| Hohman2020 | Confirmée | Compléter : *Distill* 5(9). Auteur : Duen Horng (Polo) Chau. Passages « Looking Forward » retrouvés. | distill.pub/2020/communicating-with-interactive-articles/ ; Crossref |
| Olah2021 | **Corrigée** | Signature formelle : « Editorial Team » (*Distill* 6(7), 2021-07-02, DOI 10.23915/distill.00031). Olah, Cammarata, Greydanus et Tam figurent seulement dans la note « drafted by ». Citer : Distill Editorial Team (2021) (BibTeX de la page : « Team, Editorial »). | distill.pub/2021/distill-hiatus/ ; Crossref |
| Adams2008a | Confirmée | 19(3), 397–419 [R, LearnTechLib/PER-Central]; « over 275 », « over 75 simulations ». | per-central.org/items/detail.cfm?ID=12269 |
| Adams2008b | Confirmée | 19(4), 551–577, oct. 2008 (ERIC EJ810084); « over 200 ». | eric.ed.gov/?id=EJ810084 |
| Adams2008p | Confirmée | Titre exact : *A Study of Interface Design for Engagement and Learning with Educational Simulations*; 37 p.; six auteurs (Dubson absent, présent dans les versions publiées). | phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf |
| Wieman2008 | Confirmée [M] | 322(5902), 682–683. Résumé introuvable (PubMed sans résumé) : le [R] du dossier n'est pas revérifiable; aucune valeur n'en dépend. | Crossref ; Europe PMC |
| Tversky2002 | Confirmée [M/S] | 57(4), 247–262. Principes de congruence et d'appréhension retrouvés dans un résumé relayé par moteur de recherche [S]. | Crossref ; WebSearch |
| Hoffler2007 | Confirmée | ERIC EJ780451 : d = 0,37 (0,25–0,49); 26 études, 76 comparaisons; 0,40 / 0,76 / 1,06 [R]. | api.ies.ed.gov/eric (EJ780451) |
| Moreno2007 | Confirmée | Cinq principes (activité guidée, réflexion, rétroaction, contrôle, pré-entraînement) [R]. | ERIC EJ785058 |
| Mayer | **Non vérifiable** | Livre sans éditeur ni année dans le dossier; non consulté; aucune valeur attribuée. | — |
| MayerMoreno2003 | Confirmée | Compléter : DOI 10.1207/S15326985EP3801_6. | Crossref |
| WhiteGunstone1992 | Confirmée [S] | *Probing Understanding*, Falmer Press, 1992 (libraire et articles citant); livre non lu. | WebSearch (abebooks.com) |
| Hake1998 | Confirmée | *Am. J. Phys.* 66(1), 64–74 (Crossref). ERIC ED441679 : PDF de 28 p. (« 27p. » selon ERIC) [T]. | Crossref ; files.eric.ed.gov/fulltext/ED441679.pdf |
| Hake2002 | Confirmée | arXiv:physics/0106087 (v2), titre exact; PDF de 61 p. [T]. | arxiv.org/pdf/physics/0106087 |
| Nissen2018 | **Corrigée** (mineure) | Métadonnées exactes (DOI confirmé par Crossref et par la *journal_ref* arXiv). §1.4 : « recommandent d et l'ANCOVA » est trop précis : le texte recommande d (avec moyennes, écarts-types et corrélation pré–post) et des méthodes qui analysent les post-tests individuels « en contrôlant le prétest »; le mot ANCOVA n'apparaît pas. | arxiv.org/pdf/1612.09180 |
| ColettaSteinert2020 | Confirmée | 16(1), 010108 (6 fév. 2020); biais par variables omises (test de Lawson, SAT) [R]. | journals.aps.org/prper/abstract/10.1103/PhysRevPhysEducRes.16.010108 |
| Bao2006 | Confirmée | 74(10), 917–922; moyenne de classe et moyenne des g individuels diffèrent [R]. | Crossref |
| Marx2007 | Confirmée | Titre exact *Normalized change*; c = gain/gain maximal ou perte/perte maximale [R] (le dossier avait [S]). | api.crossref.org/works/10.1119/1.2372468 |
| Tufte1983 | Confirmée [M] | Graphics Press, 1983 / 2001; « small multiples » et « data-ink ratio » listés. | edwardtufte.com/book/the-visual-display-of-quantitative-information/ |
| Tufte1990 | Confirmée [M] | 1990; « layering and separation », « small multiples » listés. | edwardtufte.com/book/envisioning-information/ |
| Munzner2014 | Confirmée [M] | ISBN 9781466508910; chap. 5 *Marks and Channels*, 6 *Rules of Thumb*, 7 *Arrange Tables*, 12 *Facet into Multiple Views*. | cs.ubc.ca/~tmm/vadbook/ |
| Cleveland1984 | Confirmée | Compléter : DOI 10.1080/01621459.1984.10478080; titre complet *Graphical Perception: Theory, Experimentation, and Application to the Development of Graphical Methods*. | Crossref |
| Mackinlay1986 | Confirmée | Critères d'expressivité et d'efficacité dans le résumé [R]. | Crossref |
| HeerBostock2010 | Confirmée | CHI 2010, pp. 203–212; DOI exact. « 50 sujets par tâche » : seulement [S] (WebSearch). | idl.uw.edu/papers/crowdsourcing-graphical-perception ; Crossref |
| OkabeIto | Confirmée | Page créée le 2002-11-20, modifiée les 2008-02-15 et 2008-09-24. Prévalence 8 / 5 / 4 % [R]. Figure 16 lue (image) : les RVB correspondent exactement aux hex du dossier (voir §2.4). | jfly.uni-koeln.de/color/ ; …/color/image/pallete.jpg |
| Wong2011 | Confirmée | 8(6), 441 (Crossref). « Jusqu'à 8 % des hommes, 0,5 % des femmes » nord-européens : [S] (extrait relayé par moteur; Nature derrière témoins). | Crossref ; Semantic Scholar |
| Crameri2020 | Confirmée | 11, art. 5444, 2020-10-28. 8 % / 0,5 % ✓; Box 2 (viridis, magma, plasma, inferno, batlow, cividis, CMOcean) ✓; « The common rainbow colour map should not be used » ✓ [R/T partiel]. | pmc.ncbi.nlm.nih.gov/articles/PMC7595127/ |
| Nunez2018 | **Corrigée** | Titre complet : « …to enable accurate interpretation of scientific data ». Cividis optimisée pour la déutéranomalie à sévérité 100 ✓. Mais le texte écrit que la carte est « close to optimal for protanomaly and tritanomaly » (S4 File, sévérité 100) : « non conçue pour la tritanopie » est vrai au sens strict (non optimisée pour elle) mais ne doit pas se lire « performe mal en tritanopie » (§3.4 et §7.6 du dossier). | journals.plos.org/plosone/article/file?id=10.1371/journal.pone.0199239&type=printable |
| Machado2009 | Confirmée | Compléter : DOI 10.1109/TVCG.2009.113. Les trois matrices à sévérité 1,0 sont identiques à celles du dossier [R, page des auteurs]. | inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html |
| WCAG22 | Confirmée | Rec. du 5 oct. 2023 [T, version datée REC-WCAG22-20231005]; version du 12 déc. 2024 [T]. Niveaux et valeurs : voir §2.5. | w3.org/TR/WCAG22/ ; w3.org/TR/2023/REC-WCAG22-20231005/ |
| MDN | Confirmée | `prefers-reduced-motion` : « Baseline widely available », depuis janvier 2020; Page Visibility : juillet 2015; Intersection Observer : mars 2019; `drawFocusIfNeeded` : août 2016; WHATWG : contenu de repli « essentially the same function or purpose », correspondance un-à-un régions–zones focalisables [T]. | developer.mozilla.org ; html.spec.whatwg.org/multipage/canvas.html |
| TamirZohar1991 | Confirmée | 75(1), 57–67; 28 élèves de Jérusalem; ERIC EJ453605 [R]. | ERIC EJ453605 ; Crossref |
| ZoharGinossar1998 | Confirmée | 82(6), 679–697; compléter le DOI 10.1002/(SICI)1098-237X(199811)82:6<679::AID-SCE3>3.0.CO;2-E. | Crossref |
| Lewandowsky2020 | Confirmée | 22 auteurs (liste complète sur le PDF; DataCite n'en liste que trois); DOI 10.17910/b7.1182 ✓ (Databrary); 19 p. Pagination du dossier : voir §2.1 (E20). | skepticalscience.com/docs/DebunkingHandbook2020.pdf ; api.datacite.org |
| Resnick1996 | Confirmée | 5(1), 1–22; PDF de 17 p.; une douzaine d'élèves, 8 à 10 séances de 60 à 90 min ✓. | pleiad.cl/_media/bic2007/papers/resnick-beyond-centralized-mindset.pdf |
| WilenskyResnick1999 | Confirmée | Compléter : 8(1), 3–19. Confusion et glissement entre niveaux; embouteillage qui recule [T, résumé et introduction]. | ccl.northwestern.edu/1999/thinking_in_levels.pdf ; Crossref |
| Chi2012 | Confirmée | 36(1), 1–61; agents de contrôle à but intentionnel; schéma émergent enseigné améliore la diffusion [R, Crossref]. | Crossref |
| NetLogoAnts | Confirmée | Wilensky (1997); CC BY-NC-SA 3.0; curseurs POPULATION, EVAPORATION-RATE, DIFFUSION-RATE; aucune espèce nommée [R]. | ccl.northwestern.edu/netlogo/models/Ants |
| BeeSmart | Confirmée | Guo et Wilensky (2014); CC BY-NC-SA 3.0; curseur `quorum` [R]. | ccl.northwestern.edu/netlogo/models/BeeSmartHiveFinding |
| StarLogo | Confirmée | Renvoie à Resnick 1996 (StarLogo, trois projets d'élèves) [T]. | voir Resnick1996 |
| Gordon2010 | Confirmée | Princeton UP, 184 p., 11 avril 2010, ISBN (broché) 9780691138794; coll. *Primers in Complex Systems* [M]. | press.princeton.edu/books/paperback/9780691138794/ant-encounters |
| GordonTED | Confirmée | TED2003, février 2003 [M]. | ted.com/talks/deborah_gordon_the_emergent_genius_of_ant_colonies |
| EPTC2 | Confirmée | Éd. 2018 (237 p.) lue. **Éd. 2022 lue aussi** (copie IUCPQ) : les articles 2.1 (et la note sur les études pilotes), 2.5 et 3.1 sont inchangés (comparaison de texte : seuls les en-têtes de page diffèrent); publication le 30 janvier 2023 [S, WebSearch]. | frq.gouv.qc.ca/app/uploads/2021/06/eptc2-2018.pdf ; iucpq.ca/app/uploads/2024/07/eptc_2_2022.pdf |
| Loi25 | Confirmée | L.Q. 2021, c. 25 (PL 64), sanctionnée le 22 septembre 2021; 64 p. [T]. | publicationsduquebec.gouv.qc.ca (2021C25F.PDF) |
| CAI | Confirmée | Page CAI : information préalable et moyens d'activer; mineurs de moins de 14 ans ✓. Québec.ca : « il faut que ces fonctions soient désactivées par défaut » ✓ [R]. | cai.gouv.qc.ca/…/principaux-changements-loi-25 ; quebec.ca/…/protection-defaut |

### 1.2 Références ajoutées (50)

| Clé | Statut | Correction ou complément | URL |
|---|---|---|---|
| Berney2016 | Confirmée | 101, 150–167. Résumé [R] : 61 études (N = 7 036), 140 comparaisons, g = 0,226 (0,12–0,33), 0,309 / 0,336 / 0,883. EARLI [T] : Q = 643,18 (dl 139), I² = 78,38. | archive-ouverte.unige.ch/unige:92234 ; tecfa.unige.ch/perso/sandra/pdf/Earli2016_berney_betrancourt_FINAL.pdf |
| Podolefsky2013 | Confirmée | arXiv:1306.6544 (v3); 30 p.; « over 600 individual student interviews », 125 simulations [T]. | arxiv.org/pdf/1306.6544 |
| Podolefsky2010 | Confirmée | 6, 020117 (2010-10-05); ERIC EJ921967 [R]. | ERIC ; Crossref |
| Lazonder2016 | Confirmée | 86(3), 681–718 [T, PDF éditeur]; 72 études; 0,66 (0,44–0,88), 0,71 (0,52–0,90), 0,50 (0,37–0,62). | pure.rug.nl/ws/files/81069469/… |
| Alfieri2011 | Confirmée | 103(1), 1–18. ERIC [R] : d = −0,38 (−0,44 ; −0,31), 580 comparaisons; enrichie 0,30 (0,23 ; 0,36), 360 comparaisons; 164 études. Valeurs 0,50 (guidée), 0,36 (explication sollicitée), −0,15 (génération) : [S] (résumé d'un blogue, concordant avec WebSearch). | ERIC EJ933606 ; laurenmarg.com |
| Kirschner2006 | Confirmée | 41(2), 75–86; l'avantage du guidage recule quand les connaissances préalables sont élevées [R]. | ERIC EJ736299 |
| Kalyuga2003 | Confirmée [M] | 38(1), 23–31. | Crossref |
| ChiWylie2014 | Confirmée | 49(4), 219–243 (ERIC EJ1044018). | ERIC |
| Rutten2012 | Confirmée | 58(1), 136–153 (ERIC EJ947482). | ERIC ; Crossref |
| Smetana2012 | Confirmée | 34(9), 1337–1370; 61 études empiriques [R] (ERIC EJ993847). | ERIC |
| Jacobson2011 | Confirmée | 39(5), 763–783 [R, ERIC EJ935185]. Les cinq modèles NetLogo (fourragement de fourmis, embouteillages, moisissures, ségrégation, loup-mouton) sont énumérés dans Khodr [T]. | ERIC ; Khodr |
| Khodr2022 | **Corrigée** (mineure) | ICLS 2022, pp. 99–106 = **8 pages**, pas 6 (« PDF (6 p.) »). Le reste (cinq scénarios, cinq catégories, 11 puis 37 répondants, 3 novices et 3 experts, instrument « freely publicly available ») est exact [T]. | repository.isls.org/bitstream/1/8913/1/ICLS2022_99-106.pdf |
| WilenskyReisman2006 | Confirmée | 24(2), 171–209; compléter le DOI 10.1207/s1532690xci2402_1 (ERIC EJ736292). | Crossref ; ERIC |
| McGellin2021 | Confirmée | 30(5), 621–640; 174 adultes; « evocative, albeit potentially distracting » [R]. | Europe PMC |
| SwireThompson2020 | Confirmée | 9(3), 286–299; « backfire effects are not a robust empirical phenomenon » [R]. | Europe PMC |
| Kelemen2009 | Confirmée | 111(1), 138–143; sous pression de temps, plus d'explications téléologiques injustifiées jugées correctes, performance similaire sur les items témoins [R, PubMed 19200537]. | eutils.ncbi.nlm.nih.gov (PMID 19200537) |
| Omland2008 | Confirmée | 30(9), 854–867; « primitive lineage fallacy » [R]. | Europe PMC |
| Baum2005 | Confirmée [M] | 310(5750), 979–980. | Crossref |
| Johnson2013 | Confirmée | 23(20), 2058–2062; Apoidea et fourmis sont des groupes frères [R]. | Europe PMC |
| VanOystaeyen2014 | Confirmée | 343(6168), 287–290; guêpe, bourdon et fourmi du désert; hydrocarbures saturés conservés sur trois origines indépendantes [R]. | Europe PMC |
| Amsalem2015 | Confirmée | 282(1817), 20151800; aucun appui chez *B. impatiens* [R]. | Europe PMC |
| Slessor1988 | Confirmée | 332(6162), 354–356; **DOI 10.1038/332354a0 maintenant vérifié** par Crossref (le dossier l'indiquait « non revérifié »). Cinq composés, plus actifs ensemble : [S]. | Crossref ; WebSearch |
| Kraft2020 | Confirmée | 49(4), 241–253. Valeurs lues dans l'EdWorkingPaper 19-10 [T] (version d'août 2019, non la version publiée) : voir §2.1. | edworkingpapers.com (PDF « Interpreting Effect Sizes – August 19 FINAL ») |
| Hedges2007 | Confirmée [M] | 29(1), 60–87. Aucune valeur d'ICC reprise : rien à vérifier. | Crossref |
| Ericsson1980 | Confirmée | 87(3), 215–251; verbalisation tirée de la mémoire à court terme [R, ERIC EJ231273]. | ERIC |
| Nielsen1993 | Confirmée | pp. 206–213, *INTERCHI '93*, Amsterdam, 24–29 avril 1993. L = 31 %, formule N(1−(1−L)ⁿ), « cinq utilisateurs ≈ 85 % » [S, Nielsen Norman Group]. | nngroup.com/articles/why-you-only-need-to-test-with-5-users/ ; Crossref |
| Virzi1992 | Confirmée | 34(4), 457–468; quatre ou cinq sujets ≈ 80 % des problèmes [S, WebSearch]. | Crossref |
| Faulkner2003 | Confirmée | 35(3), 379–383; DOI exact. 5 utilisateurs : 85 % en moyenne, minimum 55 %, maximum près de 100 % [S, WebSearch; l'extrait PubMed ne contenait que le début du résumé]. | PubMed 14587545 ; WebSearch |
| Schneider2018 | Confirmée | 23, 1–24 (Crossref; compléter le DOI 10.1016/j.edurev.2017.11.001). Valeurs (103 études, N = 12 201; g⁺ 0,53 et 0,33; connaissances préalables non modératrices) : [S] seulement (WebSearch; LearnTechLib et ScienceDirect illisibles). | Crossref ; WebSearch |
| Rey2019 | Confirmée | 31(2), 389–419; 56 études, 88 comparaisons; bénéfice plus grand pour connaissances préalables élevées (rétention) [R, ERIC EJ1217373]. | ERIC |
| Sundararajan2020 | Confirmée [M] | 32(3), 707–734. | Crossref |
| WongAdesope2021 | Confirmée | 33(2), 357–385; 28 articles; g⁺ 0,35 / 0,27 / 0,29 [R, ERIC EJ1295978]. | ERIC |
| LiuSu2024 | Confirmée | 11, art. 42, 2024-09-29; transfert 0,28, rétention 0,31, compréhension 0,46 (SMD) [R, résumé Crossref] : le dossier avait [S]. | Crossref |
| Koyunlu2024 | Confirmée | 21(3), **893–920**; g = 0,979 (0,771–1,188); 35 études (6 thèses, 29 articles) [R]. | dergipark.org.tr/en/doi/10.33711/yyuefd.1570041 |
| Kim2017 | Confirmée | CHI 2017, pp. 1375–1386; prix du meilleur article ✓ [R]. | idl.uw.edu/papers/explaining-the-gap |
| Hullman2015 | Confirmée | 10(11), e0142444; titre complet : « …for Inferences about Reliability of Variable Ordering ». Détail des essais : voir §2.1 (E28). | journals.plos.org/plosone/article?id=10.1371/journal.pone.0142444 |
| Kale2019 | Confirmée | 25(1), 892–902 [R, PubMed 30136961]. | PubMed |
| Robertson2008 | Confirmée | Compléter : *IEEE TVCG* 14(6), 1325–1332, nov. 2008. Résumé [R] conforme au dossier (animation la moins efficace pour l'analyse; petits multiples plus exacts; animation la plus rapide en présentation mais plus d'erreurs). | microsoft.com/en-us/research/publication/effectiveness-of-animation-in-trend-visualization/ ; Crossref |
| SegelHeer2010 | Confirmée | **Revue et année confirmées** : *IEEE TVCG* 16(6), 1139–1148, 2010 (Crossref); le PDF indique reçu le 31 mars 2010, mis en ligne le 24 oct. 2010. Ferme la question ouverte n° 14 du dossier. §4.4.1 « Martini Glass », « the most common across the interactive visualizations we examined » [T]. | idl.cs.washington.edu/files/2010-Narrative-InfoVis.pdf ; Crossref |
| Gleicher2011 | Confirmée | 10(4), 289–309; juxtaposition, superposition, encodage explicite [R, Crossref]. | Crossref |
| Boy2015 | Confirmée [M] | Titre complet : *Storytelling in Information Visualizations: Does it Engage Users to Explore Data?*; CHI 2015, pp. 1449–1458. | Crossref ; WebSearch |
| Dragicevic2019 | Confirmée [M] | CHI 2019, pp. 1–15; DOI exact. | Crossref |
| PhETaccess | **Corrigée** | La page citée liste des publications (2015–2020) mais **n'énonce pas** un lancement en 2014. Source du fait : Perkins et Moore, PERC 2017 (« Beginning in 2014, the PhET initiative… ») [R]. | phet.colorado.edu/en/accessibility/research ; per-central.org/items/detail.cfm?ID=14629 |
| Shanahan2022 | Confirmée | arXiv:2212.03551 (v5, 2023-02-16); « knows », « believes », « thinks » ✓ [R]. | arxiv.org/abs/2212.03551 |
| TransformerExplainer | Confirmée | arXiv:2408.04619 (v2, 2026-08-10); CHI '26, art. 7, DOI 10.1145/3772318.3791725; 90 participants, « significant advantages in improving user understanding and engagement », plus de 490 000 utilisateurs, « smooth transitions across abstraction levels » [R]. | arxiv.org/abs/2408.04619 |
| Miller2024 | Confirmée | arXiv:2411.00640; « evaluations are experiments », formules d'analyse et de planification [R]. | arxiv.org/abs/2411.00640 |
| Kapoor2024 | **Corrigée** (complément) | **arXiv:2407.01502** (v1, 2024-07-01), identifiant absent du dossier. Résumé : accuracy sans autres métriques, coûts, holdout, reproductibilité [R]. | arxiv.org/abs/2407.01502 |
| DequeVendor | Confirmée | Source primaire lue : blogue Deque du 10 mars 2021 (« 57 percent »; plus de 2 000 audits, plus de 13 000 pages, près de 300 000 problèmes; outil axe). Le communiqué devops.com cité n'a pas été lu. | deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/ |
| ISO40500 | Confirmée | « WCAG 2.2 Approved as an ISO Standard », 21 oct. 2025, ISO/IEC 40500:2025 [T]. | w3.org/WAI/news/2025-10-21/wcag22-iso |
| SGQRI008 | **Non vérifiable** | Existence et entrée en vigueur (29 avril 2024; WCAG 2.1 AA plus certains critères 2.2) : seulement des résultats de tiers (WebSearch). La page du Conseil du trésor citée a répondu 404 à ma tentative. | WebSearch |

---

## 2. Résultats cibles et paramètres clés

### 2.1 Résultats cibles E1 à E29 (§4.1 du dossier)

| ID | Statut | Vérification (preuve) |
|---|---|---|
| E1 | Confirmé | « This finding suggests that the educational value of animations without interactivity is quite limited » [T]; p. 9 du PDF de la prépublication (le dossier dit p. 10 : pagination imprimée non vérifiée). **Nuance** : la phrase figure aussi dans le manuscrit d'auteur de la **partie I** (IssueLab, « Part I – Engagement and Learning ») [T]; elle est absente du manuscrit de la partie II. Le dossier (§2.3.1) affirme qu'elle n'a pas été retrouvée dans les versions publiées : la version éditeur de la partie I n'a pas pu être lue (non vérifiable). Citer la partie I. |
| E2 | Confirmé | « more than 200 simulation interviews with 89 different students covering 52 of 60 simulations », « four to six students », « when six students were interviewed on a single simulation, the last two interviews very rarely provided new useful information regarding interface design » [T, p. 3]. |
| E3 | Confirmé | Accord intercodeurs 95 % puis « essentially increased to 100 % » [T, p. 4]; six intervieweurs ou observateurs, 46 heures [T]. |
| E4 | Confirmé | Partie I : « over 275 » (LearnTechLib) [R]; partie II : « over 200 » (ERIC) [R]. |
| E5 | Confirmé | g = 0,226 (0,12–0,33), 61 études, 140 comparaisons, N = 7 036 [R]; I² = 78,38, Q = 643,18 (dl 139) [T, EARLI]. |
| E6 | Confirmé | 0,309 (rythme imposé), 0,336 (commentaire audio), 0,883 (sans texte) [R]. |
| E7 | Confirmé | d = 0,37 (0,25–0,49), 26 études, 76 comparaisons [R]. |
| E8 | Confirmé | d = 0,50 (0,37–0,62), 72 études [T]. Précision : les 0,50 reposent sur 60 comparaisons issues des 72 études. |
| E9 | Confirmé | Éq. 1b de Hake 2002 (Sec. II-B) [T]. |
| E10 | Confirmé | 0,23 ± 0,04 (14 cours, N = 2 084) et 0,48 ± 0,14 (48 cours, N = 4 458) : Éq. 5–6 de Hake 2002 [T]; résumé ERIC de Hake 1998 [R]. |
| E11 | Confirmé | Corrélation de ⟨g⟩ avec le prétest +0,02 (62 cours), Éq. 2 [T]; post-test +0,55 (Éq. 3) et gain brut −0,49 (Éq. 4) [T]. |
| E12 | Confirmé | d = 2,43 (Éq. 9) [T]; recalcul 2,428 [I]. |
| E13 | Confirmé | r(g, d) = 0,75; « d, pretest mean, and pretest standard deviation accounted for 92 % of the variance in g »; 4 551 étudiants, 89 cours, 17 établissements; mâles plus performants dans 33/43 cours (77 %) selon g contre 23/43 (53 %) selon d [T, Discussion et Conclusion, pp. 21–23]. |
| E14 | Confirmé | < 0,05 petit; 0,05 à < 0,20 moyen; ≥ 0,20 grand; 1 942 effets, 747 essais; médiane 0,10 [T, EdWorkingPaper]. Pagination de la version publiée (p. 21) non vérifiable. |
| E15 | Confirmé | Médianes 0,24 (≤ 100) contre 0,03 (> 2 000); 0,17 (mesures étroites) contre 0,10 (larges); 0,03 pour les essais préenregistrés du département américain de l'Éducation (139 effets, 49 essais) [T]. |
| E16 | **Corrigé** (formulation) | Le texte écrit « created either **by lead or by seed** » (§4). La citation « lead or seed » avec guillemets n'est pas littérale. Contenu exact [T]. |
| E17 | Confirmé | Agent « in charge », « the teacher », « the mother » (§4, citant Resnick 1990) [T]. |
| E18 | Confirmé | 28 élèves; formulation anthropomorphe n'implique pas raisonnement anthropomorphe; plusieurs la jugent utile à la compréhension [R]. |
| E19 | Confirmé | 174 adultes; pas de différence de compréhension, de plaisir ni de pensée anthropomorphe [R]. |
| E20 | **Corrigé** (pagination) | Section « The elusive backfire effects » : pp. **9 à 11** (familiarité p. 9; surcharge et vision du monde pp. 10–11), non pp. 9–10 [T]. « Do not refrain from attempting to debunk … out of fear that doing so will backfire » ✓. Le texte dit que les effets boomerang « occur only occasionally » : « rares » est plus exact que « non robustes » (§1.8, §7.1). |
| E21 | Confirmé | pp. 12–13 : fait (en premier si clair, simple, concret), avertir, mythe « once only », expliquer la faille, refaire le fait [T]. |
| E22 | Confirmé | 8 % / 0,5 % dans le monde [T/R, Crameri]; 8 % / 0,5 % nord-européens [S, Wong]; 8 / 5 / 4 % de mâles selon l'origine [R, Okabe et Ito]. |
| E23 | Confirmé | 4,5:1 (1.4.3); 3:1 (1.4.11); 24 × 24 px (2.5.8); 320 px / 256 px (1.4.10; « 320 CSS pixels is equivalent to … 1280 CSS pixels wide at 400 % zoom »); plus de 5 s (2.2.2) [T]. |
| E24 | Confirmé | « Baseline widely available », depuis janvier 2020 [T, MDN]. |
| E25 | Confirmé | Art. 2.1, note d'application : « les études pilotes font partie des recherches exigeant une évaluation par un CER »; « l'intention ou la capacité de publier les résultats ne sont pas des facteurs pertinents » [T, éd. 2018, p. 14; identique en éd. 2022]. |
| E26 | Confirmé | Art. 8.1 (secteur privé) et 65.0.1 (organismes publics) : informer au préalable du recours à la technologie et des moyens d'activer les fonctions d'identification, de localisation ou de profilage; art. 14 : mineur de moins de 14 ans, consentement du titulaire de l'autorité parentale ou du tuteur [T]. |
| E27 | Confirmé | Art. 90.12 : 50 000 $ (personne physique), 10 000 000 $ ou 2 % du chiffre d'affaires mondial; art. 91 : 5 000 à 100 000 $ (personne physique), 15 000 à 25 000 000 $ ou 4 % [T]. |
| E28 | Confirmé | 288 sujets, 96 par condition, neuf tâches; F(2, 573) = 73, 57, 84, 220 (deux quantités); F(2, 573) = 43 (trois quantités); plus d'erreurs avec les HOP pour la moyenne à forte variance, p_adj < 0,001 [T partiel, extraction du texte intégral; section 5.2.1, 5.3, 5.4]. Résumé [R] conforme. |
| E29 | Confirmé | « High-g » ⟨g⟩ > 0,7; « Medium-g » 0,7 > ⟨g⟩ > 0,3; « Low-g » ⟨g⟩ < 0,3 (inégalités strictes); 14 cours traditionnels tous en Low-g; 41 cours (N = 3 741, 85 %) en Medium-g et 7 (N = 717, 15 %) en Low-g; aucun en High-g [T, ERIC]. |

### 2.2 Paramètres et énoncés des §3.1 à 3.3

| Élément | Statut | Preuve |
|---|---|---|
| Éq. 1a–1b, exemples 44 % + 19 points → 0,34 et 32 % + 47 points → 0,69 | Confirmé | [T] Hake 2002, Sec. II-B; recalcul 0,339 et 0,691 [I]. |
| ⟨g⟩ entre 0,34 et 0,69 pour la majorité des cours interactifs | Confirmé | [T] légende de la Fig. 1. |
| d = 0,25 / 0,103; Springer et al. d = 0,57, 31 études, 2 559 étudiants | Confirmé | [T] Éq. 7–9 et Sec. II-D5. |
| Écart de Hake « 1,8 sd » et « 6,2 sd » (script) | Confirmé | [T] Hake 1998; recalcul 1,79 et 6,25 [I]. |
| Nissen : 17 établissements; recommandation | Confirmé (voir Nissen2018 pour « ANCOVA ») | [T]. |
| Coletta et Steinert : variables omises | Confirmé | [R]. |
| PhET : bénévoles surtout non-scientifiques; deux modes d'entrevue (prédiction puis révision; exploration libre); résumés plutôt que transcriptions; 7 heures transcrites; nouveaux volontaires à chaque série de révisions; niveau maîtrise de préférence avec expérience d'enseignement | Confirmé | [T] prépublication, « Interview Methodology », pp. 3–4. |
| Curseur leurre : laisser ajuster des paramètres que les élèves croient influents « even if they do not » | Confirmé | [T] prépublication (même passage que E1). |
| Modèle 1 − (1 − L)ⁿ, L = 0,31, 5 utilisateurs ≈ 85 % | Confirmé [S] | Nielsen Norman Group; Faulkner : 85 %, minimum 55 % [S]. |
| Tableau des tailles d'effet publiées (§3.2) | Confirmé, sauf deux lignes en [S] | Schneider et al. et les trois valeurs d'Alfieri (0,50 ; 0,36 ; −0,15) : [S] seulement. Les autres lignes : [R] ou [T] (voir §1). |

### 2.3 Calculs : recalcul indépendant [I]

Mon script (`recalc.py`) et le script du dossier donnent les mêmes valeurs. Mon implémentation de CIEDE2000 reproduit les paires de test de Sharma et al. lues dans leur fichier de données (50 ; 2,6772 ; −79,7751 → 2,0425 et 50 ; 2,5 ; 0 contre 73 ; 25 ; −18 → 27,1492 [T, hajim.rochester.edu/ece/sites/gsharma/ciede2000]).

| Élément | Statut | Résultat |
|---|---|---|
| Contrastes (WCAG, seuil 0,04045) | Confirmé | fourmi #D55E00 : 3,87 (blanc), 4,84 (#121212); abeille #0072B2 : 5,19 et 3,61; agent #CC79A7 : 3,06 et 6,12; orange #E69F00 : 2,25; jaune #F0E442 : 1,32. |
| ΔE2000 minimal en dichromatie | Confirmé | 12,2 (abeille–agent, protanopie); fourmi–agent en tritanopie 13,9; vermillon–orange en déutéranopie 12,5 (ΔE76 18,3). Écart d'une unité sur ΔE76 fourmi–agent (74,3 contre 74,4) : arrondi. |
| Tailles d'échantillon par bras (α = 0,05; 80 %) | Confirmé | d = 0,226 : 309 (413 à 90 %; 232 ANCOVA ρ = 0,5); d = 0,30 : 176 (132); d = 0,37 : 116 (87); d = 0,50 : 64 (48). |
| Attrition 30 % après ANCOVA ρ = 0,5 | Confirmé | 331 / 188 / 124 / 69 (arrondi sur la valeur non arrondie; 189 si l'on arrondit d'abord à 132). |
| Grappes m = 25 : 2,2 / 3,4 / 5,8; classes par bras (d = 0,37) : 8 / 12 / 21 | Confirmé | Les ICC sont des hypothèses [I]. |
| Proportions 0,30 → 0,50 : 93; 0,30 → 0,60 : 42; 0,40 → 0,60 : 97; 0,20 → 0,50 : 39; pré–post d_z 0,3 / 0,5 / 0,8 : 90 / 34 / 15 | Confirmé | [I]. |
| Découverte : L = 0,31 : 67 / 84 / 89 / 95 / 98 % pour n = 3, 5, 6, 8, 10; n = 6 / 7 / 9 pour 85 / 90 / 95 %; L = 0,15 : n = 12 / 15 / 19 | Confirmé | [I]. |
| 307 / 115 / 63 de l'audit contre 309 / 116 / 64 | Confirmé | L'audit utilisait d = 0,23, le dossier 0,226; écart attendu. |

### 2.4 Palette, accessibilité, éthique

| Élément | Statut | Preuve |
|---|---|---|
| Hex Okabe-Ito : #E69F00, #56B4E9, #009E73, #F0E442, #0072B2, #D55E00, #CC79A7 | **Confirmé à la source** (le dossier avait [S]) | Fig. 16 de la page jfly lue : (230,159,0), (86,180,233), (0,158,115), (240,228,66), (0,114,178), (213,94,0), (204,121,167). |
| Matrices de Machado (3 × 3 × 3 valeurs) | Confirmé | [R] page des auteurs, valeurs identiques. |
| Luminance relative, seuil 0,04045 | Confirmé | [T] W3C : l'ancien seuil 0,03928 date d'avant mai 2021; la mise à jour est sans effet pratique (le dossier parle d'« erratum » : mot imprécis). |
| Niveaux WCAG 1.3.4 AA, 1.4.1 A, 1.4.3 AA, 1.4.10 AA, 1.4.11 AA, 2.1.1 A, 2.2.2 A, 2.3.1 A, **2.3.3 AAA**, 2.4.11 AA, 2.5.7 AA, 2.5.8 AA, 4.1.2 A, 4.1.3 AA | Confirmé | [T] W3C. Techniques suffisantes de 2.3.3 : C39 et SCR40; vestibulaire : « nausea, migraine headaches ». 2.5.7 cite bien les curseurs (clic sur la piste) [T]. |
| Exceptions de 1.4.10 | Confirmé | [T] cartes, diagrammes, vidéo, jeux, présentations, tableaux de données, barres d'outils persistantes. |
| Page Visibility (juillet 2015), Intersection Observer (mars 2019) | Confirmé | [T] MDN. |
| EPTC 2 art. 2.2, 2.4, 2.5, 3.1; activités intégrées à un cours; crédits alternatifs | Confirmé | [T] éd. 2018; 2.1, 2.5 et 3.1 identiques en éd. 2022. |
| Loi 25 : art. 3.1 (RPRP), 3.2, 3.3 (EFVP), 8.1, 8.2, 9.1 (exclut les témoins de connexion), 14, 21, 21.0.1, 65.0.1, 90.12, 91 | Confirmé | [T]. L'énoncé « désactivées par défaut » est celui de Québec.ca [R], non du texte de loi : le dossier le dit correctement. |
| Écart « plus de 200 » / 275 (partie I) / 600 (programme PhET) signalé au §2.3.1 du dossier | Confirmé | [R]/[T] voir E4 et Podolefsky2013 (« over 600 individual student interviews », 125 simulations). |
| Complexity Explorables, rubrique « Collective behavior » : 11 explorables, aucun sur les insectes sociaux | Confirmé [R] | Page `/topics/collective-behavior` : 11 titres listés; aucun sur fourmis ou abeilles (d'après les titres et descriptions). |

---

## 3. Bilan chiffré

Références du dossier : **98** (48 de la portée, 50 ajoutées).

| Statut | Nombre | Références |
|---|---|---|
| Confirmée | **90** | dont 13 sur métadonnées seulement, marquées [M] (Wieman2008, Tversky2002, Tufte1983, Tufte1990, Munzner2014, Gordon2010, GordonTED, Kalyuga2003, Baum2005, Sundararajan2020, Hedges2007, Boy2015, Dragicevic2019; aucune valeur chiffrée n'en dépend), et dont 9 dont les valeurs ou le fait central ne reposent que sur des sources secondaires [S] (WhiteGunstone1992, Schneider2018, Faulkner2003, Alfieri2011 pour trois valeurs, HeerBostock2010 pour « 50 sujets », Nielsen1993, Virzi1992, Slessor1988 pour les cinq composés, Wong2011 pour 8 % / 0,5 %) |
| Corrigée | **6** | Olah2021 (signature), Nissen2018 (« ANCOVA »), Nunez2018 (cividis en tritanomalie), Khodr2022 (8 p., non 6), PhETaccess (source du fait de 2014), Kapoor2024 (ID arXiv à ajouter) |
| Non vérifiable | **2** | Mayer (livre sans éditeur ni année), SGQRI008 (source primaire non lue) |
| Erronée (inexistante ou contredite) | **0** | — |

Résultats cibles : 29 énoncés E1–E29 : **27 confirmés** (dont E1 avec une nuance sur la version publiée), **2 corrigés** (E16 formulation de la citation, E20 pagination), 0 non vérifiable, 0 erroné. Calculs : toutes les valeurs recalculées concordent (0 écart, hors arrondi d'une unité sur un ΔE76).

**Compléments de DOI ou de pagination à porter à la bibliographie** (sans erreur du dossier) : Hohman2020 (5(9)); MayerMoreno2003; Cleveland1984; Machado2009; ZoharGinossar1998; WilenskyResnick1999 (3–19); WilenskyReisman2006; Schneider2018; Koyunlu2024 (893–920); Slessor1988 (DOI vérifié); Robertson2008 (14(6), 1325–1332); SegelHeer2010 (16(6), 1139–1148); Kim2017 (pp. 1375–1386); HeerBostock2010 (pp. 203–212); Boy2015 (pp. 1449–1458); Sharma, Wu et Dalal (*Color Res. Appl.* 30(1), 21–30; en ligne en 2004 selon Crossref), citée au §3.4 sans entrée dans la liste.

---

## 4. Constats complémentaires (hors tableau)

1. **Questions ouvertes du dossier maintenant tranchées.** (a) Segel et Heer : *IEEE TVCG* 16(6), 1139–1148, 2010 (§8.14). (b) EPTC 2 (2022) : articles 2.1, 2.5 et 3.1 inchangés; l'hypothèse « chapitre 2 inchangé [I] » est confirmée pour ces articles (§8.2); la numérotation de tous les articles n'a pas été comparée. (c) Okabe-Ito : RVB lus à la source (§8.11).
2. **EPTC 2, art. 6.11 et 10.1 (non mentionnés).** « L'évaluation par le CER n'est pas requise pour la phase exploratoire initiale » (contacts préliminaires avec des personnes); mais l'information recueillie ne peut servir à la recherche que si l'intention est déclarée dans la demande et le consentement prévu. Pertinent pour les entrevues de conception (§8.4 du dossier, qui ne cite que 2.1 et 2.5).
3. **Cividis (§3.4, §7.6).** Reformuler : optimisée pour la déutéranomalie (sévérité 100), « close to optimal » en protanomalie et en tritanomalie selon Nuñez et al.; ne pas la présenter comme inadaptée à la tritanopie.
4. **Nuance boomerang (§1.8, §7.1).** Le manuel parle d'effets qui « occur only occasionally » (surcharge : une seule étude directe, sans effet; vision du monde : cas rares) : l'argument du cadre est bien affaibli, mais « non robuste » surinterprète.
5. **« Quite limited » (E1, §2.3.1).** Retrouvée dans le manuscrit d'auteur de la partie I; si la version éditeur la contient, citer Adams et al. 2008a (19(3)) plutôt que la prépublication.
6. **Kraft 2020.** Valeurs lues dans la version de travail d'août 2019; contrôler la version publiée avant de citer une page.
7. **Restent non vérifiables** (inchangés par rapport au dossier) : version publiée de Hake 1998 (*Am. J. Phys.*; numérotation des équations), Mayer (livre), source primaire de SGQRI 008, résumé de Wieman et al. 2008, Schneider et al. 2018 à la source, deux valeurs d'Alfieri et al. (0,36 et −0,15) à la source, « 50 sujets par tâche » de Heer et Bostock, Dragicevic et al. 2019 (contenu), Boy et al. 2015 (résultat).

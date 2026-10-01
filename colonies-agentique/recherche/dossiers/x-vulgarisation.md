# Dossier X — Vulgarisation visuelle et évaluation pédagogique (V0)

**Statut :** consolidé après vérification indépendante, 2026-10-01.

Dossier documentaire transversal du volet V0 du cadre v4 (§8). Rédigé le 2026-10-01. Régime : production (livrable sur lequel le chercheur va agir : charte, protocole d'évaluation, dépôt au comité d'éthique), avec vérifications numériques exploratoires : `recherche/verifications-numeriques/x_vulgarisation_checks.py` (stdlib seulement; `python x_vulgarisation_checks.py [couleur|gain|taille|entrevue]`; toutes les lignes PASS à la date de rédaction).

**Légende de vérification** (appliquée à chaque affirmation chiffrée) :

- **[T]** texte intégral lu : PDF converti localement, ou page HTML extraite par WebFetch avec citations courtes littérales (la colonne « Lu » le précise).
- **[R]** résumé lu à la source (éditeur, ERIC, Europe PMC, page des auteurs).
- **[M]** métadonnées ou page éditeur seulement.
- **[S]** source secondaire, ou résumé reproduit par un moteur de recherche (nommé); non relu à la source.
- **[I]** inférence ou calcul de l'auteur du dossier, non publié tel quel.
- **[à confirmer]** valeur non confirmée à la source; **[non vérifiée]** référence non consultée ou non tranchée par la vérification indépendante.
- **Étiquettes** « Nom année » : nom du premier auteur sans particule; deux auteurs « et », trois ou plus « et al. »; organisation = sigle; suffixe a, b, c seulement si deux œuvres donnent la même étiquette.

**Conditions de recherche.** L'outil de recherche scientifique a refusé (quota mensuel épuisé, remise à zéro le 1er novembre). Ont servi : WebSearch et WebFetch (ERIC, Europe PMC, arXiv, pages d'auteurs, W3C, MDN, legisquebec/Publications Québec). Accès refusés ou illisibles, **non contournés** : ethics.gc.ca (certificat non vérifiable), ACM DL (403), HAL (contrôle anti-robot), PubMed (bandeau de témoins), vis.stanford.edu et physics.uwyo.edu (certificat), Hedges et Hedberg 2007 (PDF en images sans texte), Springer (lu seulement par la redirection normale de témoins, pour Rey et al. 2019). Aucune absence n'est conclue d'un refus. La vérification indépendante a essuyé les mêmes refus (Springer, nature.com, ScienceDirect, ACM DL, tresor.gouv.qc.ca, vis.stanford.edu, physics.uwyo.edu, *Am. J. Phys.* pour Hake 1998), mais a pu lire l'EPTC 2 éd. 2022 (copie IUCPQ) : voir « Historique de vérification » en fin de dossier.

---

## 1. Synthèse

1. **Interactivité contre animation seule.** PhET (Adams et al. 2008c : plus de 200 entretiens, 89 étudiants, 52 simulations sur 60) constate que, sans interaction, les étudiants prennent l'animation pour un fait et en tirent rarement de nouvelles idées; les auteurs jugent la valeur de l'animation sans interactivité « quite limited » [T, Adams et al. 2008c, section I.A, et manuscrit d'auteur de la partie I, Adams et al. 2008a; version éditeur non lue, à confirmer; citer Adams et al. 2008a]. Les méta-analyses donnent un petit effet moyen de l'animation sur l'image fixe : g = 0,226 (IC95 0,12–0,33; 61 études, N = 7 036, I² = 78 %) [R/T, Berney et Bétrancourt 2016]; d = 0,37 (26 études, 76 comparaisons) [R, Höffler et Leutner 2007]. L'effet dépend du rythme imposé (g = 0,309), du commentaire audio (0,336) et de l'absence de texte (0,883) [R].
2. **Guidage.** Les synthèses convergent vers « explorer, mais avec étayage » : découverte guidée d = 0,50 [S; à confirmer] et découverte non assistée d = −0,38 [R] (164 études) [Alfieri et al. 2011]; guidage et résultats d'apprentissage d = 0,50 (IC95 0,37–0,62; 72 études) [T, Lazonder et Harmsen 2016]. Le guidage perd son avantage quand les connaissances préalables sont élevées [R, Kirschner et al. 2006; S, Kalyuga et al. 2003] : le parcours Voir → Explorer → Vérifier doit laisser les praticiens et les chercheurs entrer directement au niveau 2 ou 3.
3. **Explorables : aucune preuve d'efficacité propre.** Victor 2011a n'avance aucune donnée [T]; la page de Nicky Case (Case s. d.) n'en mentionne aucune [R]; Hohman et al. 2020 écrivent que l'évaluation empirique est limitée [T]. Les appuis viennent de domaines voisins : PhET, prédiction avant observation (Kim et al. 2017 [R]), plan « verre à martini » (Segel et Heer 2010 [T]). Une méta-analyse du cycle prédire–observer–expliquer (Koyunlu Ünlü 2024) annonce g = 0,979 (35 études) [R], valeur à traiter comme borne haute [I] (35 études dont 6 thèses; qualité des études et biais de publication non détaillés dans le résumé lu).
4. **Mesure : le gain de Hake est utile mais contesté.** Hake 1998 et Hake 2002 : 62 cours, 6 542 étudiants; cours traditionnels ⟨⟨g⟩⟩ = 0,23 ± 0,04 (14 cours), cours d'engagement interactif 0,48 ± 0,14 (48 cours) [T/R]; d calculé = 2,43, recalculé ici à 2,428 [T, I]. Nissen et al. 2018 (4 551 étudiants, 89 cours) trouvent g biaisé en faveur des prétests élevés (r(g, d) = 0,75) et recommandent d et des analyses des post-tests individuels qui contrôlent le prétest (le texte n'emploie pas le mot ANCOVA) [T]; Coletta et Steinert 2020 contestent [R]. **Décision proposée :** critère primaire par ANCOVA (post ~ pré + condition, d ajusté); ⟨g⟩ en secondaire, pour comparabilité.
5. **Tailles d'effet et échantillons.** Médiane de 0,10 SD sur 747 essais randomisés d'éducation; 0,24 pour les études de 100 sujets ou moins contre 0,03 pour celles de plus de 2 000 [T, Kraft 2020, version de travail d'août 2019]. Pour d = 0,30 (effet minimal d'intérêt proposé) : 132 par bras (ANCOVA, ρ = 0,5, puissance 0,80), 188 à recruter avec 30 % d'attrition au post-test différé; randomisation par classes de 25 : facteur 2,2 à 5,8 pour un ICC de 0,05 à 0,20 [I]. Pour d = 0,226 (Berney et Bétrancourt 2016) : 232 par bras (ANCOVA). Les 307/115/63 de l'audit se recalculent à 309/116/64 mais omettent covariable, attrition et grappes.
6. **Entrevues à voix haute.** PhET (Adams et al. 2008c) : 4 à 6 étudiants par simulation; avec 6 étudiants, les deux derniers entretiens n'ont presque jamais révélé de nouveau problème d'interface [T]. Le modèle 1 − (1 − L)ⁿ donne 84 % des problèmes avec n = 5 si L = 0,31, mais 56 % si L = 0,15 [I]. Règle proposée : 6 par public et par page, et deux entretiens de plus tant que le dernier en révèle un majeur.
7. **Conceptions erronées centralisatrices.** Resnick 1996 : les élèves expliquent un motif par un chef ou par un germe (« by lead or by seed »); dans le projet de cimetière de fourmis, un « leader ant » est supposé; en MultiLogo, l'agent « en charge » devient « the teacher » ou « the mother » [T]. Chi et al. 2012 : explications par des agents de contrôle intentionnels [R]. **Mais** Tamir et Zohar 1991 (28 élèves) trouvent que l'acceptation de formulations anthropomorphes n'implique pas un raisonnement anthropomorphe [R], et McGellin et al. 2021 (174 adultes) ne trouvent aucune différence de compréhension entre texte anthropomorphe et non anthropomorphe [R]. Le garde-fou du cadre doit viser l'**explication causale** (chef, finalité), pas tout le vocabulaire.
8. **Débunkage.** Le Debunking Handbook 2020 (Lewandowsky et al. 2020) juge rares les effets boomerang de familiarité, de surcharge et de vision du monde (« occur only occasionally »; surcharge : une seule étude directe, sans effet), et déconseille de s'abstenir de corriger par crainte d'un boomerang; structure : fait d'abord (si clair et mémorable), avertir, mythe **une seule fois**, expliquer la faille, refaire le fait [T]. L'argument du cadre selon lequel la négation « installe le mythe » est donc affaibli et n'est pas appuyé tel quel.
9. **Couleur (charte vérifiée par calcul).** Contraste : fourmi #D55E00 3,87:1 (blanc) et 4,84:1 (#121212); abeille #0072B2 5,19 et 3,61; agent #CC79A7 3,06 et 6,12 [I]. Tous passent 3:1 pour les marques graphiques; fourmi et agent échouent 4,5:1 comme texte sur blanc. Distance ΔE2000 minimale sous simulation de dichromatie : 12,2 (abeille–agent, protanopie), du même ordre que la paire jugée fragile (vermillon–orange en deutéranopie, 12,5) : le doublage non chromatique est obligatoire [I].
10. **Accessibilité.** WCAG 2.2 (W3C 2023) : Recommandation du 5 octobre 2023, mise à jour le 12 décembre 2024 [T]; norme ISO/IEC 40500:2025 depuis le 21 octobre 2025 [T, W3C 2025]. `prefers-reduced-motion` (Baseline « largement disponible » depuis janvier 2020 [T, MDN s. d.]) correspond à la technique C39 du critère 2.3.3, de niveau **AAA**; le niveau AA exige plutôt 2.2.2 (A), 2.5.7, 2.5.8, 1.4.10, 1.4.11 et 2.4.11 [T].
11. **Éthique et vie privée (Canada, Québec).** EPTC 2 (CRSH et al. 2018), article 2.1 (note d'application) : les études pilotes relèvent d'un comité d'éthique de la recherche (CER); l'intention ou la capacité de publier n'est pas un critère; l'article 2.5 n'exempte que l'usage exclusivement évaluatif ou d'amélioration [T, éd. 2018; éd. 2022 lue par la vérification indépendante : art. 2.1, 2.5 et 3.1 inchangés]. Loi 25 (Québec 2021; L.Q. 2021, c. 25) : information préalable et moyens d'activer pour toute technologie d'identification, de localisation ou de profilage; consentement manifeste, libre, éclairé; mineurs de moins de 14 ans par le titulaire de l'autorité parentale; sanctions administratives de 50 000 $ (personne physique) ou 10 M$/2 %, pénales de 5 000 à 100 000 $ (personne physique) ou 15 000 à 25 M$/4 % [T].
12. **Ressources existantes.** NetLogo *Ants* (Wilensky 1997, CC BY-NC-SA 3.0; curseurs population, évaporation, diffusion; aucune espèce nommée) et *BeeSmart Hive Finding* (Guo et Wilensky 2014; quorum réglable) [R]; aucun des 11 explorables de la rubrique « comportement collectif » de Complexity Explorables (Complexity Explorables s. d.) ne porte sur les insectes sociaux [R]. Valeur ajoutée du programme : comparaison fourmi/abeille sur un noyau commun, Vue de l'agent, étiquetage épistémique, niveau Vérifier, pont agentique, évaluation mesurée.

---

## 2. Références

Statut : **vérifiée** = source consultée (au moins le résumé) et métadonnées confirmées; **corrigée** = correction appliquée à la suite de la vérification indépendante; **non vérifiée** = non consultée ou non tranchée. Colonne « Lu » : ce qui a été lu réellement. ★ = référence importante non nommée par la portée.

### 2.1 Références demandées par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Victor 2011a | Victor, B. (2011-03-10). *Explorable Explanations*. | worrydream.com/ExplorableExplanations/ | vérifiée | [T] page HTML (extraction). Aucune donnée empirique sur l'efficacité. |
| Victor 2011b | Victor, B. (2011-10). *Up and Down the Ladder of Abstraction*. | worrydream.com/LadderOfAbstraction/ | vérifiée | [T] page HTML (extraction, citations courtes) |
| Case s. d. | Case, N. (s. d.). ncase.me : *The Evolution of Trust*, *Emoji Simulator*, *Nutshell*, etc.; hub explorabl.es | ncase.me ; explorabl.es | vérifiée | [R] pages d'accueil; licence « public domain waiver »; aucune évaluation d'efficacité mentionnée |
| Hohman et al. 2020 | Hohman, F., Conlen, M., Heer, J., Chau, D. H. (2020-09-11). Communicating with interactive articles. *Distill*, 5(9). | 10.23915/distill.00028 | vérifiée | [T] page HTML (extraction) |
| Distill 2021 | Distill Editorial Team (2021-07-02). Distill Hiatus. *Distill*, 6(7). (Rédigé par Olah, Cammarata, Greydanus et Tam selon la note « drafted by »; signature formelle : Editorial Team.) | 10.23915/distill.00031 ; distill.pub/2021/distill-hiatus/ | corrigée | [T] page HTML (extraction); signature « Editorial Team » vérifiée à la source |
| Adams et al. 2008a | Adams, W. K., Reid, S., LeMaster, R., McKagan, S. B., Perkins, K. K., Dubson, M., Wieman, C. E. (2008). A study of educational simulations. Part I — Engagement and learning. *J. Interactive Learning Research*, 19(3), 397–419. | pas de DOI affiché; per-central.org ID 12269 | vérifiée | [R]; manuscrit d'auteur (IssueLab) lu par la vérification indépendante [T] : contient « quite limited » |
| Adams et al. 2008b | Idem. Part II — Interface design. 19(4), 551–577. | ERIC EJ810084 | vérifiée | [R] |
| Adams et al. 2008c | Adams, W. K., et al. (2008 [à confirmer]). *A Study of Interface Design for Engagement and Learning with Educational Simulations* (prépublication, 37 p.; six auteurs, Dubson absent, présent dans les versions publiées). | phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf | vérifiée | [T] PDF converti. Texte unique non divisé en deux parties. |
| Wieman et al. 2008 | Wieman, C. E., Adams, W. K., Perkins, K. K. (2008). PhET: Simulations that enhance learning. *Science*, 322(5902), 682–683. | 10.1126/science.1161948 | vérifiée | [M] (le [R] initial n'est pas revérifiable : résumé introuvable à la vérification; aucune valeur n'en dépend) |
| Tversky et al. 2002 | Tversky, B., Morrison, J. B., Bétrancourt, M. (2002). Animation: can it facilitate? *Int. J. Human-Computer Studies*, 57(4), 247–262. | 10.1006/ijhc.2002.1017 | vérifiée | [S] résumé reproduit par WebSearch (ACM = 403); SERC : « revue de la littérature » [R, une ligne] |
| Höffler et Leutner 2007 | Höffler, T. N., Leutner, D. (2007). Instructional animation versus static pictures: a meta-analysis. *Learning and Instruction*, 17(6), 722–738. | 10.1016/j.learninstruc.2007.09.013 | vérifiée | [R] (ERIC EJ780451) |
| Moreno et Mayer 2007 | Moreno, R., Mayer, R. (2007). Interactive multimodal learning environments. *Educational Psychology Review*, 19(3), 309–326. | 10.1007/s10648-007-9047-2 | vérifiée | [R] (ERIC EJ785058) |
| Mayer s. d. | Mayer, R. E. *Multimedia Learning* (livre; principes de signalisation, de segmentation, de cohérence). Éditeur et année absents [à confirmer]. | — | non vérifiée | [non vérifiée] Livre non consulté. Principes lus via Mayer et Moreno 2003 [S], Schneider et al. 2018 [S], Rey et al. 2019 [R], Sundararajan et Adesope 2020 [S]. |
| Mayer et Moreno 2003 | Mayer, R. E., Moreno, R. (2003). Nine ways to reduce cognitive load in multimedia learning. *Educational Psychologist*, 38(1), 43–52. | 10.1207/S15326985EP3801_6 | vérifiée | [S] résumé reproduit par WebSearch |
| White et Gunstone 1992 | White, R., Gunstone, R. (1992). *Probing Understanding*. Falmer Press (origine du prédire–observer–expliquer). | — | vérifiée | [S] (résultats de recherche; livre non lu) |
| Hake 1998 | Hake, R. R. (1998). Interactive-engagement versus traditional methods: a six-thousand-student survey of mechanics test data for introductory physics courses. *Am. J. Phys.*, 66(1), 64–74. | 10.1119/1.18809 | vérifiée | [T] PDF ERIC ED441679 (28 p.; ERIC indique 27 p.; couche de texte issue d'un OCR; lue en entier sur les passages cités); [R] résumé (PER-Central) |
| Hake 2002 | Hake, R. R. (2002 [année de la version arXiv v2, à confirmer]). Lessons from the physics-education reform effort (soumis en 2001 à *Conservation Ecology*). | arXiv:physics/0106087 | vérifiée | [T] PDF converti (61 p.); reprend l'enquête de 1998 |
| Nissen et al. 2018 | Nissen, J. M., Talbot, R. M., Nasim Thompson, A., Van Dusen, B. (2018). Comparison of normalized gain and Cohen's d for analyzing gains on concept inventories. *Phys. Rev. Phys. Educ. Res.*, 14, 010115. | arXiv:1612.09180 ; DOI 10.1103/PhysRevPhysEducRes.14.010115 (confirmé par Crossref et par la journal_ref arXiv) | corrigée | [T] ★ (le texte ne parle pas d'ANCOVA : voir §3.1) |
| Coletta et Steinert 2020 | Coletta, V. P., Steinert, J. J. (2020). Why normalized gain should continue to be used in analyzing preinstruction and postinstruction scores on concept inventories. *Phys. Rev. Phys. Educ. Res.*, 16(1), 010108. | 10.1103/PhysRevPhysEducRes.16.010108 | vérifiée | [R] |
| Bao 2006 | Bao, L. (2006). Theoretical comparisons of average normalized gain calculations. *Am. J. Phys.*, 74(10), 917–922. | 10.1119/1.2213632 | vérifiée | [R] |
| Marx et Cummings 2007 | Marx, J. D., Cummings, K. (2007). Normalized change. *Am. J. Phys.*, 75(1), 87–91. | 10.1119/1.2372468 | vérifiée | [R] (résumé, vérification indépendante) |
| Tufte 1983 | Tufte, E. R. (1983; 2ᵉ éd. 2001). *The Visual Display of Quantitative Information*. Graphics Press. | edwardtufte.com | vérifiée | [M] page éditeur (liste « small multiples », « data-ink ») |
| Tufte 1990 | Tufte, E. R. (1990). *Envisioning Information*. Graphics Press. | edwardtufte.com | vérifiée | [M] page éditeur (liste « small multiples », « layering and separation ») |
| Munzner 2014 | Munzner, T. (2014). *Visualization Analysis and Design*. CRC Press (A K Peters), ISBN 9781466508910. | cs.ubc.ca/~tmm/vadbook/ | vérifiée | [M] (chap. 5 « Marks and Channels », 6, 7, 12); texte non lu |
| Cleveland et McGill 1984 | Cleveland, W. S., McGill, R. (1984). Graphical perception: theory, experimentation, and application to the development of graphical methods. *J. Am. Stat. Assoc.*, 79(387), 531–554. | 10.1080/01621459.1984.10478080 | vérifiée | [S] résumé reproduit par WebSearch |
| Mackinlay 1986 | Mackinlay, J. (1986). Automating the design of graphical presentations of relational information. *ACM Trans. Graphics*, 5(2), 110–141. | 10.1145/22949.22950 | vérifiée | [R] (résumé : critères d'expressivité et d'efficacité) |
| Heer et Bostock 2010 | Heer, J., Bostock, M. (2010). Crowdsourcing graphical perception: using Mechanical Turk to assess visualization design. *CHI 2010*, pp. 203–212. | 10.1145/1753326.1753357 | vérifiée | [R] (page idl.uw.edu : résumé); « 50 sujets par tâche » : [S] seulement [à confirmer] |
| Okabe et Ito 2002 | Okabe, M., Ito, K. Color Universal Design (CUD) — how to make figures and presentations that are friendly to colorblind people (2002; modifié 2008). | jfly.uni-koeln.de/color/ | vérifiée | [R] page (prévalence); figure 16 (image) lue par la vérification indépendante : valeurs RVB concordant exactement avec les codes hexadécimaux du dossier. Pas une publication revue par les pairs. |
| Wong 2011 | Wong, B. (2011). Points of view: Color blindness. *Nature Methods*, 8(6), 441. | 10.1038/nmeth.1618 | vérifiée | [S] extrait relayé par un moteur (Semantic Scholar; Nature derrière témoins) : prévalence 8 % / 0,5 % [à confirmer à la source]; palettes en figures non lues |
| Crameri et al. 2020 | Crameri, F., Shephard, G. E., Heron, P. J. (2020). The misuse of colour in science communication. *Nature Communications*, 11, 5444. | 10.1038/s41467-020-19160-7 | vérifiée | [R] + extraits ciblés (PMC7595127) |
| Nuñez et al. 2018 | Nuñez, J. R., Anderton, C. R., Renslow, R. S. (2018). Optimizing colormaps with consideration for color vision deficiency to enable accurate interpretation of scientific data. *PLoS ONE*, 13(7), e0199239. | 10.1371/journal.pone.0199239 | corrigée | [R] (cividis); texte lu par la vérification indépendante [T] : optimisée pour la déutéranomalie, « close to optimal » en protanomalie et en tritanomalie (S4 File, sévérité 100) |
| Machado et al. 2009 | Machado, G. M., Oliveira, M. M., Fernandes, L. A. F. (2009). A physiologically-based model for simulation of color vision deficiency. *IEEE TVCG*, 15(6), 1291–1298. | 10.1109/TVCG.2009.113 ; page des auteurs (inf.ufrgs.br/~oliveira) | vérifiée | [T] matrices de sévérité 1,0 relues |
| W3C 2023 | W3C. *Web Content Accessibility Guidelines (WCAG) 2.2* (Recommandation du 5 octobre 2023; mise à jour le 12 décembre 2024) et pages « Understanding » 1.4.10, 2.2.2, 2.3.3, 2.5.7, 2.5.8. | w3.org/TR/WCAG22/ | vérifiée | [T] extraction (texte normatif cité); version datée REC-WCAG22-20231005 et version du 12 décembre 2024 lues par la vérification indépendante [T] |
| MDN s. d. | MDN. `prefers-reduced-motion`; Page Visibility API; Intersection Observer API. WHATWG HTML, élément `canvas`. | developer.mozilla.org ; html.spec.whatwg.org | vérifiée | [T] extraction |
| Tamir et Zohar 1991 | Tamir, P., Zohar, A. (1991). Anthropomorphism and teleology in reasoning about biological phenomena. *Science Education*, 75(1), 57–67. | ERIC EJ453605 | vérifiée | [R] |
| Zohar et Ginossar 1998 | Zohar, A., Ginossar, S. (1998). Lifting the taboo regarding teleology and anthropomorphism in biology education — heretical suggestions. *Science Education*, 82(6), 679–697. | `10.1002/(SICI)1098-237X(199811)82:6<679::AID-SCE3>3.0.CO;2-E` | vérifiée | [S] (Wiley refusé) |
| Lewandowsky et al. 2020 | Lewandowsky, S., Cook, J., Ecker, U. K. H., et al. (22 auteurs) (2020). *The Debunking Handbook 2020*. | 10.17910/b7.1182 ; skepticalscience.com/docs/DebunkingHandbook2020.pdf | vérifiée | [T] PDF (19 p.) + document compagnon *Under the Hood* [T] (20 p.) |
| Resnick 1996 | Resnick, M. (1996). Beyond the centralized mindset. *J. Learning Sciences*, 5(1), 1–22. | pleiad.cl/_media/bic2007/papers/resnick-beyond-centralized-mindset.pdf | vérifiée | [T] PDF (17 p.) |
| Wilensky et Resnick 1999 | Wilensky, U., Resnick, M. (1999). Thinking in levels: a dynamic systems approach to making sense of the world. *J. Science Education and Technology*, 8(1), 3–19. | 10.1023/A:1009421303064 ; ccl.northwestern.edu/1999/thinking_in_levels.pdf | vérifiée | [T] début (résumé, introduction) |
| Chi et al. 2012 | Chi, M. T. H., Roscoe, R. D., Slotta, J. D., Roy, M., Chase, C. C. (2012). Misconceived causal explanations for emergent processes. *Cognitive Science*, 36(1), 1–61. | 10.1111/j.1551-6709.2011.01207.x | vérifiée | [R] (page ASU) |
| Wilensky 1997 | Wilensky, U. (1997). NetLogo *Ants* model. Northwestern CCL. | ccl.northwestern.edu/netlogo/models/Ants | vérifiée | [R] page du modèle (extraction) |
| Guo et Wilensky 2014 | Guo, Y., Wilensky, U. (2014). NetLogo *BeeSmart Hive Finding* model. | ccl.northwestern.edu/netlogo/models/BeeSmartHiveFinding | vérifiée | [R] page du modèle (extraction) |
| StarLogo (= Resnick 1996) | StarLogo : renvoi à Resnick 1996 (ci-dessus; StarLogo présenté, trois projets d'élèves). | — | vérifiée | [T] |
| Gordon 2010 | Gordon, D. M. (2010). *Ant Encounters: Interaction Networks and Colony Behavior*. Princeton UP, 184 p., ISBN 9780691138794. | press.princeton.edu | vérifiée | [M] fiche éditeur |
| Gordon 2003 | Gordon, D. M. « The emergent genius of ant colonies ». TED2003. | ted.com | vérifiée | [M] fiche |
| CRSH et al. 2018 | CRSH, CRSNG, IRSC. *Énoncé de politique des trois Conseils : Éthique de la recherche avec des êtres humains — EPTC 2*. Éd. 2018 (lue); éd. 2022 publiée le 30 janvier 2023 [S] (lue aussi par la vérification indépendante pour les art. 2.1, 2.5 et 3.1). | frq.gouv.qc.ca/app/uploads/2021/06/eptc2-2018.pdf ; iucpq.ca/app/uploads/2024/07/eptc_2_2022.pdf | vérifiée | [T] éd. 2018 (237 p., français); éd. 2022 lue par la vérification indépendante (copie IUCPQ) [T] : art. 2.1 (note sur les études pilotes), 2.5 et 3.1 inchangés (comparaison de texte; seuls les en-têtes de page diffèrent); ethics.gc.ca : certificat non vérifiable |
| Québec 2021 | *Loi modernisant des dispositions législatives en matière de protection des renseignements personnels*, L.Q. 2021, c. 25 (projet de loi 64; sanctionnée le 2021-09-22). | publicationsduquebec.gouv.qc.ca (2021C25F.PDF) | vérifiée | [T] PDF (64 p.) |
| CAI s. d. | Commission d'accès à l'information du Québec. Principaux changements apportés par la Loi 25; Québec.ca, « Identification, localisation, profilage ». | cai.gouv.qc.ca ; quebec.ca | vérifiée | [R] extraction |

### 2.2 Références ajoutées (utiles au projet, vérifiées)

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Berney et Bétrancourt 2016 | Berney, S., Bétrancourt, M. (2016). Does animation enhance learning? A meta-analysis. *Computers & Education*, 101, 150–167. | 10.1016/j.compedu.2016.06.005 | vérifiée | [R] (UNIGE) + [T] version EARLI 2016 (3 p., tecfa.unige.ch) |
| Podolefsky et al. 2013 ★ | Podolefsky, N. S., Moore, E. B., Perkins, K. K. (2013). Implicit scaffolding in interactive simulations: design strategies to support multiple educational goals. | arXiv:1306.6544 | vérifiée | [T] PDF (30 p.) |
| Podolefsky et al. 2010 | Podolefsky, N. S., Perkins, K. K., Adams, W. K. (2010). Factors promoting engaged exploration with computer simulations. *Phys. Rev. ST Phys. Educ. Res.*, 6, 020117. | 10.1103/PhysRevSTPER.6.020117 ; ERIC EJ921967 | vérifiée | [R] |
| Lazonder et Harmsen 2016 ★ | Lazonder, A. W., Harmsen, R. (2016). Meta-analysis of inquiry-based learning: effects of guidance. *Rev. Educ. Res.*, 86(3), 681–718. | 10.3102/0034654315627366 | vérifiée | [T] PDF (résumé et introduction lus) |
| Alfieri et al. 2011 ★ | Alfieri, L., Brooks, P. J., Aldrich, N. J., Tenenbaum, H. R. (2011). Does discovery-based instruction enhance learning? *J. Educ. Psychol.*, 103(1), 1–18. | 10.1037/a0021017 (affiché par ERIC EJ933606) | vérifiée | [R] ERIC : d = −0,38 (−0,44 ; −0,31), 580 comparaisons; enrichie 0,30 (0,23 ; 0,36); 164 études. Valeurs 0,50 (guidée), 0,36 (explication sollicitée) et −0,15 (génération) : [S] seulement (WebSearch; résumé d'un blogue) [à confirmer] |
| Kirschner et al. 2006 | Kirschner, P. A., Sweller, J., Clark, R. E. (2006). Why minimal guidance during instruction does not work: an analysis of the failure of constructivist, discovery, problem-based, experiential, and inquiry-based teaching. *Educ. Psychologist*, 41(2), 75–86. | 10.1207/s15326985ep4102_1 ; ERIC EJ736299 | vérifiée | [R] résumé ERIC (vérification indépendante) |
| Kalyuga et al. 2003 ★ | Kalyuga, S., Ayres, P., Chandler, P., Sweller, J. (2003). The expertise reversal effect. *Educ. Psychologist*, 38(1), 23–31. | 10.1207/S15326985EP3801_4 | vérifiée | [S] |
| Chi et Wylie 2014 | Chi, M. T. H., Wylie, R. (2014). The ICAP framework: linking cognitive engagement to active learning outcomes. *Educ. Psychologist*, 49(4), 219–243. | 10.1080/00461520.2014.965823 | vérifiée | [S] |
| Rutten et al. 2012 | Rutten, N., van Joolingen, W. R., van der Veen, J. T. (2012). The learning effects of computer simulations in science education. *Computers & Education*, 58(1), 136–153. | — | vérifiée | [S] |
| Smetana et Bell 2012 | Smetana, L. K., Bell, R. L. (2012). Computer simulations to support science instruction and learning: a critical review. *Int. J. Science Education*, 34(9), 1337–1370. | — | vérifiée | [S] (61 articles) |
| Jacobson et al. 2011 | Jacobson, M. J., Kapur, M., So, H.-J., Lee, J. (2011). The ontologies of complexity and learning about complex systems. *Instructional Science*, 39(5), 763–783. | 10.1007/s11251-010-9147-0 | vérifiée | [R] (ERIC EJ935185) |
| Khodr et al. 2022 ★ | Khodr, H., Kothiyal, A., Bruno, B., Dillenbourg, P. (2022). An assessment framework for complex systems understanding. *ICLS 2022 Proceedings*, 99–106. | repository.isls.org/bitstream/1/8913/1/ICLS2022_99-106.pdf | corrigée | [T] PDF (8 p.) |
| Wilensky et Reisman 2006 | Wilensky, U., Reisman, K. (2006). Thinking like a wolf, a sheep, or a firefly: learning biology through constructing and testing computational theories — an embodied modeling approach. *Cognition and Instruction*, 24(2), 171–209. | 10.1207/s1532690xci2402_1 ; ERIC EJ736292 | vérifiée | [S] résumé |
| McGellin et al. 2021 ★ | McGellin, R. T. L., Grand, A., Sullivan, M. (2021). Stop avoiding the inevitable: the effects of anthropomorphism in science writing for non-experts. *Public Understanding of Science*, 30(5), 621–640. | 10.1177/0963662521991732 | vérifiée | [R] (Europe PMC) |
| Swire-Thompson et al. 2020 | Swire-Thompson, B., DeGutis, J., Lazer, D. (2020). Searching for the backfire effect. *J. Applied Research in Memory and Cognition*, 9(3), 286–299. | 10.1016/j.jarmac.2020.06.006 | vérifiée | [R] (Europe PMC) |
| Kelemen et Rosset 2009 | Kelemen, D., Rosset, E. (2009). The human function compunction: teleological explanation in adults. *Cognition*, 111(1), 138–143. | 10.1016/j.cognition.2009.01.001 | vérifiée | [R] (PubMed 19200537) |
| Omland et al. 2008 | Omland, K. E., Cook, L. G., Crisp, M. D. (2008). Tree thinking for all biology: the problem with reading phylogenies as ladders of progress. *BioEssays*, 30(9), 854–867. | 10.1002/bies.20794 | vérifiée | [R] (Europe PMC) |
| Baum et al. 2005 | Baum, D. A., Smith, S. D., Donovan, S. S. (2005). The tree-thinking challenge. *Science*, 310(5750), 979–980. | 10.1126/science.1117727 | vérifiée | [M] |
| Johnson et al. 2013 | Johnson, B. R., Borowiec, M. L., Chiu, J. C., Lee, E. K., Atallah, J., Ward, P. S. (2013). Phylogenomics resolves evolutionary relationships among ants, bees, and wasps. *Current Biology*, 23(20), 2058–2062. | 10.1016/j.cub.2013.08.050 | vérifiée | [R] (Europe PMC) |
| Oystaeyen et al. 2014 | Van Oystaeyen, A., et al. (2014). Conserved class of queen pheromones stops social insect workers from reproducing. *Science*, 343(6168), 287–290. | 10.1126/science.1244899 | vérifiée | [R] |
| Amsalem et al. 2015 | Amsalem, E., Orlova, M., Grozinger, C. M. (2015). A conserved class of queen pheromones? Re-evaluating the evidence in bumblebees (*Bombus impatiens*). *Proc. R. Soc. B*, 282(1817), 20151800. | 10.1098/rspb.2015.1800 | vérifiée | [R] |
| Slessor et al. 1988 | Slessor, K. N., Kaminski, L.-A., King, G. G. S., Borden, J. H., Winston, M. L. (1988). Semiochemical basis of the retinue response to queen honey bees. *Nature*, 332(6162), 354–356. | 10.1038/332354a0 (vérifié par Crossref lors de la vérification indépendante) | vérifiée | [S] (WebSearch; Europe PMC sans notice); cinq composés [S] seulement [à confirmer] |
| Kraft 2020 ★ | Kraft, M. A. (2020). Interpreting effect sizes of education interventions. *Educational Researcher*, 49(4), 241–253. | 10.3102/0013189X20912798 | vérifiée | [T] PDF : EdWorkingPaper 19-10 (version d'août 2019), non la version publiée; contrôler la version publiée avant de citer une page [à confirmer] |
| Hedges et Hedberg 2007 | Hedges, L. V., Hedberg, E. C. (2007). Intraclass correlation values for planning group-randomized trials in education. *Educ. Eval. Policy Anal.*, 29(1), 60–87. | — | vérifiée | [M] PDF en images illisible; valeurs d'ICC non lues |
| Ericsson et Simon 1980 | Ericsson, K. A., Simon, H. A. (1980). Verbal reports as data. *Psychological Review*, 87(3), 215–251. | ERIC EJ231273 | vérifiée | [R] (ERIC EJ231273) |
| Nielsen et Landauer 1993 | Nielsen, J., Landauer, T. K. (1993). A mathematical model of the finding of usability problems. *INTERCHI '93* (Amsterdam, 24–29 avril 1993), pp. 206–213. | — | vérifiée | [S] (Nielsen Norman Group) |
| Virzi 1992 | Virzi, R. A. (1992). Refining the test phase of usability evaluation: how many subjects is enough? *Human Factors*, 34(4), 457–468. | — | vérifiée | [S] |
| Faulkner 2003 | Faulkner, L. (2003). Beyond the five-user assumption. *Behavior Research Methods, Instruments, & Computers*, 35(3), 379–383. | 10.3758/BF03195514 | vérifiée | [S] |
| Schneider et al. 2018 | Schneider, S., Beege, M., Nebel, S., Rey, G. D. (2018). A meta-analysis of how signaling affects learning with media. *Educ. Research Review*, 23, 1–24. | 10.1016/j.edurev.2017.11.001 | vérifiée | [S] résumé reproduit par WebSearch; valeurs à confirmer à la source (LearnTechLib et ScienceDirect illisibles) [à confirmer] |
| Rey et al. 2019 | Rey, G. D., Beege, M., Nebel, S., Wirzberger, M., Schmitt, T. H., Schneider, S. (2019). A meta-analysis of the segmenting effect. *Educ. Psychology Review*, 31(2), 389–419. | 10.1007/s10648-018-9456-4 | vérifiée | [R] |
| Sundararajan et Adesope 2020 | Sundararajan, N., Adesope, O. (2020). Keep it coherent: a meta-analysis of the seductive details effect. *Educ. Psychology Review*, 32(3), 707–734. | 10.1007/s10648-020-09522-4 | vérifiée | [S] |
| Wong et Adesope 2021 | Wong, R. M., Adesope, O. O. (2021). Meta-analysis of emotional designs in multimedia learning. *Educ. Psychology Review*, 33(2), 357–385. | 10.1007/s10648-020-09545-x | vérifiée | [R] (ERIC EJ1295978) |
| Liu et Su 2024 | Liu, K., Su, P. (2024). Effectiveness of facial anthropomorphism design for improving multimedia learning outcomes: systematic review and meta-analysis. *Smart Learning Environments*, 11, art. 42 (2024-09-29). | 10.1186/s40561-024-00332-7 | vérifiée | [R] (résumé Crossref); Springer en boucle de témoins |
| Koyunlu Ünlü 2024 | Koyunlu Ünlü, Z. (2024). Effect of the Predict-Observe-Explain strategy on achievement in science education: a meta-analysis. *Van Yüzüncü Yıl Üniv. Eğitim Fak. Dergisi*, 21(3), 893–920. | 10.33711/yyuefd.1570041 | vérifiée | [R] |
| Kim et al. 2017 ★ | Kim, Y.-S., Reinecke, K., Hullman, J. (2017). Explaining the gap: visualizing one's predictions improves recall and comprehension of data. *CHI 2017*, pp. 1375–1386 (prix du meilleur article). | 10.1145/3025453.3025592 | vérifiée | [R] (idl.uw.edu) |
| Hullman et al. 2015 ★ | Hullman, J., Resnick, P., Adar, E. (2015). Hypothetical outcome plots outperform error bars and violin plots for inferences about reliability of variable ordering. *PLoS ONE*, 10(11), e0142444. | 10.1371/journal.pone.0142444 | vérifiée | [R] |
| Kale et al. 2019 | Kale, A., Nguyen, F., Kay, M., Hullman, J. (2019). Hypothetical outcome plots help untrained observers judge trends in ambiguous data. *IEEE TVCG*, 25(1), 892–902. | 10.1109/TVCG.2018.2864909 | vérifiée | [R] (PubMed 30136961) |
| Robertson et al. 2008 | Robertson, G., Fernandez, R., Fisher, D., Lee, B., Stasko, J. (2008). Effectiveness of animation in trend visualization. *IEEE TVCG*, 14(6), 1325–1332 (nov. 2008). | microsoft.com/en-us/research/publication/effectiveness-of-animation-in-trend-visualization/ | vérifiée | [R] |
| Segel et Heer 2010 | Segel, E., Heer, J. (2010). Narrative visualization: telling stories with data. *IEEE TVCG*, 16(6), 1139–1148 (revue, année et pagination absentes du PDF lu; confirmées par Crossref à la vérification indépendante). | 10.1109/TVCG.2010.179 ; idl.cs.washington.edu/files/2010-Narrative-InfoVis.pdf | vérifiée | [T] PDF (résumé, §4.4) |
| Gleicher et al. 2011 | Gleicher, M., Albers, D., Walker, R., Jusufi, I., Hansen, C. D., Roberts, J. C. (2011). Visual comparison for information visualization. *Information Visualization*, 10(4), 289–309. | 10.1177/1473871611416549 | vérifiée | [R] (Crossref) |
| Boy et al. 2015 | Boy, J., Détienne, F., Fekete, J.-D. (2015). Storytelling in information visualizations: does it engage users to explore data? *CHI 2015*, 1449–1458. | 10.1145/2702123.2702452 | vérifiée | [M] titre et lieu seulement (HAL bloqué par contrôle anti-robot) |
| Dragicevic et al. 2019 | Dragicevic, P., Jansen, Y., Sarma, A., Kay, M., Chevalier, F. (2019). Increasing the transparency of research papers with explorable multiverse analyses. *CHI 2019*, pp. 1–15. | 10.1145/3290605.3300295 | vérifiée | [S] |
| PhET s. d. | PhET Interactive Simulations. Accessibility research and design (liste de publications; Moore, Smith et collègues). | phet.colorado.edu/en/accessibility/research | corrigée | [R] : liste de publications 2015–2020; la page **n'énonce pas** un lancement en 2014 (source du fait : Perkins et Moore 2017) |
| Shanahan 2022 | Shanahan, M. (2022). Talking about large language models. | arXiv:2212.03551 | vérifiée | [R] |
| Cho et al. 2024 | Cho, A., et al. (2024; v2 2026). Transformer Explainer: learning LLM transformers with interactive visual explanation and experimentation. *CHI '26*, art. 7, DOI 10.1145/3772318.3791725. | arXiv:2408.04619 | vérifiée | [R] |
| Miller 2024 | Miller, E. (2024). Adding error bars to evals: a statistical approach to language model evaluations. | arXiv:2411.00640 | vérifiée | [R] + [T] début |
| Kapoor et al. 2024 | Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N., Narayanan, A. (2024). AI agents that matter. | arXiv:2407.01502 (v1, 2024-07-01); préimpression Princeton, 2024-07-02 (identifiant arXiv absent du PDF lu) | corrigée | [T] résumé et introduction (PDF converti) |
| Deque 2021 | Deque Systems (2021-03-10). Étude sur la couverture de l'automatisation (blogue; 57 % des problèmes en volume; plus de 2 000 audits, plus de 13 000 pages, près de 300 000 problèmes; outil axe). | deque.com/blog/automated-testing-study-identifies-57-percent-of-digital-accessibility-issues/ (source primaire); devops.com (communiqué, non lu) | vérifiée | [R] étude de fournisseur : blogue lu par la vérification indépendante; communiqué devops.com non lu |
| W3C 2025 | W3C (2025-10-21). WCAG 2.2 approved as an ISO standard (ISO/IEC 40500:2025). | w3.org/WAI/news/2025-10-21/wcag22-iso | vérifiée | [T] page |
| Québec 2024 | Standard sur l'accessibilité des sites Web (SGQRI 008 3.0), gouvernement du Québec. | tresor.gouv.qc.ca | non vérifiée | [non vérifiée] [S] (en vigueur le 2024-04-29 selon des résumés de tiers) [à confirmer]; page du Conseil du trésor : 404 à la vérification indépendante |
| Sharma et al. 2005 | Sharma, G., Wu, W., Dalal, E. N. (2005; en ligne en 2004). The CIEDE2000 color-difference formula: implementation notes, supplementary test data, and mathematical observations. *Color Res. Appl.*, 30(1), 21–30. | 10.1002/col.20070 | vérifiée | [M] métadonnées Crossref; jeu de test lu à la source par la vérification indépendante [T] (hajim.rochester.edu/ece/sites/gsharma/ciede2000). Ajoutée : citée au §3.4 sans entrée. |
| Perkins et Moore 2017 | Perkins, K. K., Moore, E. B. (2017). Increasing the accessibility of PhET simulations for students with disabilities: progress, challenges, and potential. *Physics Education Research Conference 2017*, pp. 296–299. | 10.1119/perc.2017.pr.069 ; per-central.org/items/detail.cfm?ID=14629 | vérifiée | [R] résumé (PER-Central) : initiative d'accessibilité lancée en 2014. Ajoutée : source du fait de 2014 (§3.6). |
| Complexity Explorables s. d. | Complexity Explorables. Rubrique « Collective Behavior » (11 explorables). | complexity-explorables.org/topics/collective-behavior/ | vérifiée | [R] page lue : 11 titres, aucun sur les fourmis ni les abeilles (d'après titres et descriptions). Ajoutée : citée au §1.12 sans entrée. |

### 2.3 Références prévues ou mémorisées qui diffèrent de ce qui a été lu (résultat)

1. **Adams et al. 2008a, 2008b et 2008c** : deux articles publiés (a, b) et une prépublication (c), pas un seul article. La partie I (19(3)) annonce plus de **275** entretiens [R]; la partie II (19(4)) et la prépublication de 37 pages annoncent plus de **200** (89 étudiants, 52 simulations sur 60) [R/T]. Podolefsky et al. 2013 parlent de plus de **600** entretiens pour l'ensemble du programme PhET [T]. La phrase « quite limited » figure dans la **prépublication** (section I.A, p. 9 du PDF) et dans le manuscrit d'auteur de la partie I (IssueLab) [T, vérification indépendante]; elle est absente du manuscrit d'auteur de la partie II; la version éditeur de la partie I n'a pas pu être lue [à confirmer]. Citer Adams et al. 2008a.
2. **Hake 1998** : la version publiée (*Am. J. Phys.*) n'a pas été lue; la version ERIC (rapport de 28 p.; ERIC indique 27 p.; même titre) a une couche de texte lisible [T]. Les seuils High/Medium/Low sont **> 0,7 / 0,3 à 0,7 / < 0,3** (inégalités strictes) [T]; les nombres de l'enquête concordent avec Hake 2002 [T].
3. **Lewandowsky et al. 2020** : manuel de consensus de 22 auteurs, pas un article de revue; DOI 10.17910/b7.1182 confirmé par le document compagnon [T].
4. **Okabe et Ito 2002** : page web (2002, modifiée 2008), pas un article. Les valeurs RVB sont dans une figure (Fig. 16), lue par la vérification indépendante : elles concordent exactement avec les codes hexadécimaux de la palette. Wong 2011 est une chronique d'une page, sans la table de codes dans l'extrait lu.
5. **Tufte 1983, Tufte 1990 et Munzner 2014** : seules les fiches d'éditeur ont été lues; la définition de « small multiples » et les principes d'expressivité et d'efficacité de Munzner 2014 n'ont **pas** été vérifiés dans les livres. Le critère d'expressivité et d'efficacité vient de Mackinlay 1986 [R].
6. **EPTC 2 (2022)** : le texte officiel (ethics.gc.ca) n'est pas lisible dans cet environnement (certificat). L'édition 2018 (copie FRQ, 237 p.) est lue en entier; les notices universitaires disent que l'édition 2022 a été publiée en janvier 2023 (le 30 janvier 2023 selon la vérification [S]) et touche les chapitres 3 (consentement large), 8 (recherche multi-juridictionnelle) et 12 (lignées cellulaires) [S]. La vérification indépendante a lu l'édition 2022 (copie de l'IUCPQ) : les articles 2.1 (note sur les études pilotes), 2.5 et 3.1 sont inchangés [T] (comparaison de texte; seuls les en-têtes de page diffèrent); la numérotation des autres articles n'a pas été comparée [à confirmer].
7. **Tamir et Zohar 1991** : le résultat est plus nuancé que le slogan « l'anthropomorphisme est une conception erronée » (voir §1.7).
8. **Moreno et Mayer 2007** : le résumé nomme cinq principes (activité guidée, réflexion, rétroaction, contrôle, pré-entraînement) [R]; le texte n'a pas été lu.
9. **Mayer s. d. (livre)** [non vérifiée] : non lu; aucune valeur d'effet n'est attribuée au livre dans ce dossier.
10. **Case s. d., Victor 2011a, Hohman et al. 2020, Distill 2021** : aucune étude d'efficacité n'a été trouvée avec WebSearch (deux requêtes ciblées et les pages elles-mêmes). Ce n'est pas une preuve d'absence (outil scientifique indisponible).

---

## 3. Modèles, méthodes, équations et paramètres

### 3.1 Gain normalisé et mesures voisines

- **Définition publiée** (Hake 2002, Sec. II-B, Éq. 1a–1b) : ⟨g⟩ = %⟨Gain⟩ / %⟨Gain⟩max = (%⟨post⟩ − %⟨pré⟩) / (100 − %⟨pré⟩), calculé sur les **moyennes de classe** [T]. Exemples lus : pré 44 %, gain 19 points → 19/56 = 0,34; pré 32 %, gain 47 points → 0,69 [T, Sec. II-B, texte qui accompagne la Fig. 1; recalculés : 0,339 et 0,691].
- **Catégories** (Hake 1998, définitions (e)–(g), avant les résultats) : « High-g » si ⟨g⟩ > 0,7; « Medium-g » si 0,7 > ⟨g⟩ > 0,3; « Low-g » si ⟨g⟩ < 0,3. Résultats : les 14 cours traditionnels sont tous dans Low-g; 85 % des 48 cours interactifs (41 cours, N = 3 741) sont dans Medium-g et 15 % (7 cours, N = 717) dans Low-g; aucun cours dans High-g [T].
- **Propriétés publiées** (Hake 2002, Sec. II-D) : corrélation de ⟨g⟩ avec le prétest = +0,02 (Éq. 2; 62 cours); post-test avec prétest +0,55 (Éq. 3); gain brut avec prétest −0,49 (Éq. 4) [T].
- **Enquête** : 62 cours, 6 542 étudiants; 14 cours traditionnels (2 084 étudiants) ⟨⟨g⟩⟩ = 0,23 ± 0,04 (sd); 48 cours interactifs (4 458 étudiants) 0,48 ± 0,14 (Éq. 5–6) [T/R]. La majorité des cours interactifs se situe entre 0,34 et 0,69 (Fig. 1) [T].
- **Taille d'effet associée** (Hake 2002, Éq. 7–9) : d = |m_A − m_B| / [(sd_A² + sd_B²)/2]^0,5 = 0,25 / 0,103 = **2,43** [T; recalcul 2,428 PASS]. Hake 2002 la compare à la règle de Cohen (0,2 / 0,5 / 0,8) et à d = 0,57 (31 études, 2 559 étudiants) de Springer et al. 1999 [T, citation secondaire de cette étude].
- **Moyenne de classe contre moyenne des g individuels** : les deux calculs diffèrent en général (Bao 2006) [R].
- **Variante** : Marx et Cummings 2007 définissent un « changement normalisé » c qui traite aussi les pertes (rapport de la perte à la perte maximale possible) [R].
- **Critique** (Nissen et al. 2018, 4 551 étudiants, 89 cours, 17 établissements) : r(g, d) = 0,75; d, moyenne et écart-type du prétest expliquent 92 % de la variance de g; g est biaisé en faveur des populations à prétest élevé; selon g, les hommes apprennent davantage dans 33 des 43 cours (77 %), selon d dans 23 sur 43 (53 %). Recommandation : d, avec moyennes, écarts-types, effectifs et corrélation pré–post, ou des méthodes qui analysent les post-tests individuels en contrôlant le prétest (le texte n'emploie pas le mot ANCOVA) [T].
- **Réplique** (Coletta et Steinert 2020) : le biais viendrait de variables omises (p. ex. raisonnement scientifique, SAT), non de g [R].
- **Choix V0** [I] : (1) primaire : ANCOVA post ~ pré + condition, d ajusté; (2) secondaire : ⟨g⟩ de classe avec IC par rééchantillonnage, pour comparer à la littérature de physique; (3) tertiaire : proportions de bonnes réponses sur les items de conceptions erronées. Les repères de Hake 1998 (0,23 et 0,48) viennent d'un inventaire de mécanique (FCI) et **ne se transposent pas** à un inventaire sur la coordination décentralisée.

### 3.2 Tailles d'effet typiques et échantillons requis

**Tailles publiées utiles pour planifier** (valeurs lues à la source indiquée) :

| Source | Contraste | Valeur | Lu |
|---|---|---|---|
| Berney et Bétrancourt 2016 | animation contre graphique fixe | g = 0,226 (IC95 0,12–0,33); 61 études, N = 7 036, 140 comparaisons; Q = 643,18 (dl 139), I² = 78,38 %; rythme imposé g = 0,309; avec commentaire audio 0,336; sans texte 0,883 | [R/T] |
| Höffler et Leutner 2007 | animation contre image fixe | d = 0,37 (IC95 0,25–0,49); représentationnelle 0,40; vidéo réaliste 0,76; savoir procédural-moteur 1,06 | [R] |
| Schneider et al. 2018 | signalisation | rétention g⁺ = 0,53 (0,42–0,64); transfert 0,33 (0,22–0,43); 103 études, N = 12 201; connaissances préalables non modératrices [à confirmer] | [S] |
| Rey et al. 2019 | segmentation | « petit à moyen » pour rétention et transfert; 56 études, 88 comparaisons; plus grand bénéfice pour les connaissances préalables élevées (rétention) | [R] |
| Wong et Adesope 2021 | design émotionnel (couleurs, formes) | rétention g⁺ = 0,35; transfert 0,27; compréhension 0,29 (28 articles) | [R] |
| Liu et Su 2024 | anthropomorphisme facial | transfert 0,28; rétention 0,31; compréhension 0,46 (DMS) | [R] |
| Alfieri et al. 2011 | découverte guidée; non assistée | enrichie 0,30 [R]; explication sollicitée 0,36 [S; à confirmer]; guidée 0,50 [S; à confirmer]; non assistée −0,38 [R]; « génération » −0,15 [S; à confirmer] (164 études) | [R/S] |
| Lazonder et Harmsen 2016 | guidage | activités d'apprentissage 0,66 (0,44–0,88); réussite 0,71 (0,52–0,90); résultats 0,50 (0,37–0,62); 72 études | [T] |
| Koyunlu Ünlü 2024 | prédire–observer–expliquer | g = 0,979 (0,771–1,188); 35 études (6 thèses, 29 articles) | [R] |
| Kraft 2020 | essais randomisés d'éducation, résultats standardisés | médiane 0,10 SD (1 942 effets, 747 essais); repères < 0,05 petit, 0,05 à < 0,20 moyen, ≥ 0,20 grand; médiane 0,24 (≤ 100 élèves) contre 0,03 (> 2 000); mesures étroites 0,17 contre larges 0,10; essais préenregistrés du département américain de l'Éducation 0,03 | [T, EdWorkingPaper 19-10 (août 2019)] |

Lecture [I] : (a) l'hétérogénéité est forte (I² = 78 %), donc 0,226 n'est pas un effet attendu mais une moyenne de contextes disparates; (b) les items de conceptions erronées sont des mesures étroites et conçues par le chercheur, qui donnent des effets plus élevés que des mesures larges (Kraft 2020); (c) aucune de ces études ne compare un explorable guidé à un équivalent statique : la transposition est une inférence.

**Formules utilisées** (α = 0,05 bilatéral; z = quantiles normaux) [I] :

- 2 groupes, différence de moyennes standardisée d : n par groupe = 2 ((z₁₋α/₂ + z₁₋β) / d)² + z₁₋α/₂² / 4.
- ANCOVA avec prétest de corrélation ρ au post-test : n × (1 − ρ²).
- Attrition a : n / (1 − a).
- Randomisation par grappes (classes) de taille moyenne m, corrélation intra-classe ICC : n × [1 + (m − 1) ICC].
- Deux proportions p₁, p₂ : n = [z₁₋α/₂ √(2 p̄ (1 − p̄)) + z₁₋β √(p₁(1 − p₁) + p₂(1 − p₂))]² / (p₁ − p₂)².

**Résultats** (script, section `taille`; autotests : n(0,5) = 64; n(0,226) = 308,3 et n(0,37) = 115,6, à ±3 de l'audit) :

| d | 80 % | 90 % | ANCOVA ρ = 0,5 | ANCOVA ρ = 0,7 |
|---|---|---|---|---|
| 0,20 | 394 | 527 | 296 | 201 |
| 0,226 | 309 | 413 | 232 | 158 |
| 0,30 | 176 | 235 | 132 | 90 |
| 0,37 | 116 | 155 | 87 | 59 |
| 0,50 | 64 | 86 | 48 | 33 |
| 0,80 | 26 | 34 | 20 | 13 |

- Avec 30 % d'attrition (post-test différé), ANCOVA ρ = 0,5, puissance 0,80 : à recruter par bras 331 (d = 0,226), 188 (0,30), 124 (0,37), 69 (0,50).
- Classes de 25 : facteur de plan 2,20 / 3,40 / 5,80 pour ICC = 0,05 / 0,10 / 0,20; avec d = 0,37 (ANCOVA ρ = 0,5) : 8 / 12 / 21 classes par bras. **Les ICC sont des hypothèses de planification** [I]; Hedges et Hedberg 2007 compilent des ICC de rendement scolaire pour planifier ce type d'essai, mais leur PDF était illisible : échantillons et valeurs non lus [M].
- Item de conception erronée (proportion de bonnes réponses) : 0,30 → 0,50 : 93 par groupe; 0,30 → 0,60 : 42; 0,40 → 0,60 : 97; 0,20 → 0,50 : 39.
- Plan pré–post sans témoin (d_z intra-sujet 0,3 / 0,5 / 0,8) : 90 / 34 / 15 sujets; ne permet pas de séparer l'effet de la page de l'effet du prétest.
- Hypothèses : ρ = 0,5–0,7 pré–post, attrition 30 %, α = 0,05, puissance 0,80, tous [I] à ajuster au pilote.

### 3.3 Entrevues à voix haute (protocole et saturation)

- **Protocole PhET** [T, Adams et al. 2008c, section Interview Methodology] : plus de 200 entretiens, 89 étudiants, 52 des 60 simulations; typiquement 4 à 6 étudiants par simulation, hommes et femmes à parts égales, représentation de minorités, rendement scolaire varié, étudiants n'ayant pas encore reçu l'enseignement visé; bénévoles surtout non-scientifiques. Deux modes : (1) questions de prédiction posées avant, puis révision pendant ou après l'interaction; (2) exploration libre sans question. Vidéo de tous les entretiens; **résumés** par entretien plutôt que transcriptions complètes, car les gestes sur la simulation font partie de la communication. Accord intercodeurs sur un extrait codé : 95 % au départ, ≈ 100 % après révision de la grille; 7 heures transcrites; six intervieweurs ou observateurs, 46 heures évaluées indépendamment. Les interprétations divergent quand l'intervieweur ne maîtrise pas le contenu (niveau maîtrise, de préférence avec expérience d'enseignement).
- **Saturation observée** : avec six étudiants interviewés sur une même simulation, les deux derniers entretiens ont très rarement apporté de l'information utile nouvelle sur l'interface [T]. Les réponses sur le contenu conceptuel varient davantage [T].
- **Effet de la première rencontre** : l'interaction diffère profondément après instruction ou usage antérieur; il faut de nouveaux volontaires à chaque série de révisions importantes [T].
- **Modèle de découverte** (Nielsen et Landauer 1993, rapporté par des sources secondaires) : part trouvée = 1 − (1 − L)ⁿ, L = probabilité qu'un participant fasse apparaître un problème donné; moyenne de L = 0,31 [S; à confirmer à la source]. Faulkner 2003 : 5 utilisateurs révèlent en moyenne 85 % des problèmes, avec une étendue de 55 % à près de 100 % selon l'échantillon [S; à confirmer à la source]. Ericsson et Simon 1980 fondent la verbalisation concurrente sur la mémoire à court terme [R].
- **Calculs** (script, section `entrevue`) : L = 0,31 : n = 3, 5, 6, 8, 10 → 67, 84, 89, 95, 98 %; pour 85 / 90 / 95 % il faut n = 6 / 7 / 9. L = 0,15 : n = 5, 8, 10, 15 → 56, 73, 80, 91 %; pour 85 / 90 / 95 % il faut n = 12 / 15 / 19 [I]. Autotest : L = 0,31, n = 5 → 0,844 contre ≈ 85 % rapporté (PASS).

### 3.4 Couleur : formules, données et résultats

- **Luminance relative** (WCAG 2.x; W3C 2023, page de définition) : L = 0,2126 R + 0,7152 G + 0,0722 B, avec R = R_sRGB/12,92 si R_sRGB ≤ seuil, sinon ((R_sRGB + 0,055)/1,055)^2,4. Le seuil publié avant mai 2021 est 0,03928; la page actuelle du W3C donne **0,04045** (mise à jour, et non un « erratum »; différence négligeable pour 8 bits) [T]. **Contraste** = (L₁ + 0,05)/(L₂ + 0,05) [T].
- **Simulation de dichromatie** (Machado et al. 2009, sévérité 1,0, appliquée en RGB linéaire) [T] :

  | Type | Matrice |
  |---|---|
  | protanopie | [0,152286 ; 1,052583 ; −0,204868] [0,114503 ; 0,786281 ; 0,099216] [−0,003882 ; −0,048116 ; 1,051998] |
  | deutéranopie | [0,367322 ; 0,860646 ; −0,227968] [0,280085 ; 0,672501 ; 0,047413] [−0,011820 ; 0,042940 ; 0,968881] |
  | tritanopie | [1,255528 ; −0,076749 ; −0,178779] [−0,078411 ; 0,930809 ; 0,147602] [0,004733 ; 0,691367 ; 0,303900] |

- **Distance de couleur** : ΔE76 (CIELAB, D65) et ΔE2000 (CIEDE2000) [I]. L'implantation de CIEDE2000 reproduit deux paires du jeu de test de Sharma et al. 2005 à 4 décimales (2,0425 et 27,1492) [I]; les données de test ont été lues à la source par la vérification indépendante, qui obtient les mêmes valeurs [T].
- **Palette Okabe-Ito** [R pour les codes : figure 16 de la page lue par la vérification indépendante, RVB concordants] : noir #000000, orange #E69F00, bleu ciel #56B4E9, vert bleuté #009E73, jaune #F0E442, bleu #0072B2, vermillon #D55E00, pourpre rougeâtre #CC79A7. Prévalence : 8 % des hommes caucasiens, 5 % des Asiatiques, 4 % des Africains « rouge-vert » [R, Okabe et Ito 2002]; jusqu'à 8 % des hommes et 0,5 % des femmes d'ascendance nord-européenne [S, Wong 2011; à confirmer à la source]; 8 % et 0,5 % dans le monde [T, Crameri et al. 2020, introduction].
- **Cartes continues** : Crameri et al. 2020 déconseillent l'arc-en-ciel et le rouge-vert à luminosité semblable; cartes listées (Box 2) : viridis, magma, plasma, inferno, batlow, cividis, CMOcean [R]. Cividis est optimisée pour la déficience rouge-vert (déutéranomalie, sévérité 100) à partir de viridis [R, Nuñez et al. 2018]; le texte la décrit aussi comme « close to optimal » pour la protanomalie et la tritanomalie (S4 File, sévérité 100) [T, vérification indépendante] : elle n'est pas optimisée pour la tritanopie au sens strict, mais il ne faut pas la présenter comme inadaptée à la tritanopie.
- **Résultats pour la charte** (script, section `couleur`) :

  | Couleur | Hex | Contraste sur blanc | sur #121212 | Texte 4,5:1 sur blanc |
  |---|---|---|---|---|
  | fourmi | #D55E00 | 3,87 | 4,84 | non |
  | abeille | #0072B2 | 5,19 | 3,61 | oui |
  | agent | #CC79A7 | 3,06 | 6,12 | non |

  | Paire | ΔE76 normal / prot. / deut. / trit. | ΔE2000 normal / prot. / deut. / trit. |
  |---|---|---|
  | fourmi–abeille | 114,6 / 91,9 / 108,4 / 101,6 | 49,6 / 50,0 / 56,6 / 65,7 |
  | fourmi–agent | 74,4 / 71,7 / 69,8 / 36,4 | 37,0 / 40,9 / 34,0 / 13,9 |
  | abeille–agent | 53,6 / 22,7 / 42,6 / 69,2 | 41,1 / **12,2** / 25,2 / 56,2 |

  Repère fragile : vermillon–orange en déutéranopie = ΔE76 18,3, ΔE2000 12,5 [I]. L'orange (#E69F00) a 2,25:1 sur blanc et le jaune (#F0E442) 1,32:1 : ils échouent le seuil de 3:1 comme couleurs de trait sur fond blanc [I].

### 3.5 Encodage visuel, animation, comparaison, distributions

- **Hiérarchie de précision** (Cleveland et McGill 1984) : la position sur une échelle commune est jugée le plus précisément, puis la longueur, puis l'angle ou la pente, puis la surface [S]. Heer et Bostock 2010 répliquent ces résultats avec 50 sujets par tâche [à confirmer; le résumé lu n'indique pas ce nombre] sur Mechanical Turk, en cohérence avec l'original [S]. Mackinlay 1986 codifie des critères d'**expressivité** (le langage graphique exprime-t-il l'information voulue) et d'**efficacité** [R].
- **Animation contre petits multiples** (Robertson et al. 2008) : l'animation est la forme la moins efficace pour l'analyse; les deux représentations statiques (traces superposées, petits multiples) sont significativement plus rapides, les petits multiples plus exacts; l'animation est la plus rapide pour la présentation et plaît, mais cause de nombreuses erreurs [R].
- **Principes de Tversky et al. 2002** : principe de congruence (contenu et format correspondent aux concepts) et d'appréhension (le graphique doit être perçu et conçu correctement; les animations sont souvent trop rapides ou complexes); quand l'animation semble supérieure, une inspection révèle un contenu ou des procédures non équivalents, ou de l'interactivité; l'interactivité judicieuse peut compenser [S].
- **Petits multiples** : listés parmi les principes de *The Visual Display of Quantitative Information* et d'*Envisioning Information* [M]; leur définition n'a pas été lue dans les livres.
- **Comparaison** (Gleicher et al. 2011) : tout dispositif de comparaison combine juxtaposition, superposition et encodage explicite [R].
- **Distribution sur N exécutions** (Hullman et al. 2015; 288 sujets, 96 par condition, 9 essais) : le résumé rapporte que les « hypothetical outcome plots » (HOP, tirages animés) donnent des jugements beaucoup plus exacts pour deux et trois quantités, et une exactitude comparable aux autres représentations pour une seule quantité [R]. Le détail des essais (extraction du texte, confirmée par la vérification indépendante; sections 5.2.1, 5.3 et 5.4) donne F(2, 573) de 57 à 220 (p ≤ 0,001) pour deux quantités, F(2, 573) = 43 pour trois, et **plus** d'erreurs avec les HOP qu'avec barres d'erreur et violons pour une quantité à forte variance (p < 0,001) [T partiel]. Kale et al. 2019 : les HOP aident des observateurs non formés à juger une tendance dans des données ambiguës [R].
- **Narration** (Segel et Heer 2010, §4.4.1) : le « verre à martini » commence par un récit conduit par l'auteur (tige), puis s'ouvre à l'exploration par le lecteur; c'est la structure la plus courante des visualisations interactives examinées [T]. Boy et al. 2015 testent si la narration engage à explorer (résultat non lu) [M].
- **Échelle d'abstraction** (Victor 2011b) : monter et descendre entre niveaux d'abstraction; « descendre est aussi important que monter » [T, citation courte]. Document réactif : le lecteur modifie les hypothèses et voit les conséquences (Victor 2011a) [T].
- **Explorables multivers** (Dragicevic et al. 2019) : rapports où le lecteur change les choix d'analyse en interagissant avec l'article [S].

### 3.6 Accessibilité et mobile

Texte normatif de WCAG 2.2 (W3C 2023; niveau; valeur) [T, extraction W3C] :

| Critère | Niveau | Énoncé (court) et valeurs |
|---|---|---|
| 1.3.4 Orientation | AA | ne pas restreindre à une seule orientation |
| 1.4.1 Utilisation de la couleur | A | la couleur n'est pas le seul moyen visuel de transmettre l'information |
| 1.4.3 Contraste (minimum) | AA | texte 4,5:1; grand texte 3:1 |
| 1.4.10 Reflow | AA | sans défilement bidimensionnel à 320 px CSS (vertical) ou 256 px (horizontal), équivalant à 1 280 px à 400 % de zoom; exception pour le contenu exigeant une disposition 2D (cartes, diagrammes, jeux, tableaux de données) |
| 1.4.11 Contraste non textuel | AA | composants d'interface et objets graphiques ≥ 3:1 contre les couleurs adjacentes |
| 2.1.1 Clavier | A | toute fonction au clavier |
| 2.2.2 Pause, arrêt, masquage | A | mouvement qui démarre seul, dure plus de **5 s** et est présenté en parallèle : mécanisme de pause, d'arrêt ou de masquage; mise à jour automatique : idem ou contrôle de fréquence |
| 2.3.1 Trois flashs | A | pas plus de 3 flashs par seconde |
| 2.3.3 Animation issue des interactions | **AAA** | animation de mouvement déclenchée par l'interaction désactivable; techniques suffisantes C39 (requête CSS `prefers-reduced-motion`), SCR40 |
| 2.4.11 Focus non masqué (minimum) | AA | le composant focalisé n'est pas entièrement masqué par du contenu de l'auteur |
| 2.5.7 Mouvements de glissement | AA | alternative à un pointeur unique sans glisser; les curseurs sont visés (clic sur la piste) |
| 2.5.8 Taille de cible (minimum) | AA | ≥ 24 × 24 px CSS, sauf espacement, équivalent, en ligne, agent utilisateur, essentiel |
| 4.1.2 Nom, rôle, valeur | A | programmatiquement déterminables |
| 4.1.3 Messages d'état | AA | via rôle ou région vive, sans prise de focus |

- **Canvas** (WHATWG HTML; MDN s. d.) : l'auteur doit fournir un contenu qui remplit essentiellement la même fonction que le bitmap; `drawFocusIfNeeded()` pour un focus visible; correspondance un-à-un entre régions interactives et zones focalisables du contenu de repli [T].
- **Mouvement réduit** (MDN s. d.) : `prefers-reduced-motion` détecte le souhait de réduire le mouvement non essentiel; valeurs `no-preference` et `reduce`; disponible partout depuis **janvier 2020**; vise les troubles vestibulaires [T]. La page W3C du critère 2.3.3 décrit des réactions pouvant aller jusqu'à la nausée et la migraine [T].
- **Pause hors écran** : Page Visibility API (`visibilitychange`; disponible depuis juillet 2015) et Intersection Observer (décider d'animer ou non selon la visibilité; depuis mars 2019) [T, MDN s. d.].
- **Précédent PhET** : initiative d'accessibilité lancée en 2014 (descriptions interactives pour lecteurs d'écran, clavier) [R, Perkins et Moore 2017; la page PhET s. d. liste des publications de 2015 à 2020 et n'énonce pas cette date].
- **Statut** : WCAG 2.2 (W3C 2023), Recommandation du 5 octobre 2023, mise à jour du 12 décembre 2024 [T]; ISO/IEC 40500:2025 (21 octobre 2025) [T, W3C 2025]. SGQRI 008 3.0 (Québec 2024; organismes publics québécois) en vigueur le 29 avril 2024, WCAG 2.1 AA et certains critères 2.2 [non vérifiée; S, à confirmer] : source primaire non lue; à vérifier si les pages sont hébergées par un organisme public.
- **Limite de l'automatisation** : l'outil de Deque détecterait 57 % des problèmes en volume (> 13 000 pages; Deque 2021) [R, fournisseur]; l'autre part exige un test manuel.

### 3.7 Conceptions erronées, anthropomorphisme, correction

- **Resnick 1996** [T] : une douzaine d'élèves du secondaire (8 à 10 séances de 60 à 90 min), trois projets StarLogo. §3.3 « Ant cemeteries » : les élèves imaginent un « leader ant » ou un cimetière pré-désigné; §4 « The centralized mindset » : motifs attribués à un chef ou à un germe (« created either by lead or by seed »); le ballet est cité comme cas où l'hypothèse d'un chorégraphe est juste; en MultiLogo, l'agent « en charge » est appelé « the teacher » ou « the mother »; Resnick note aussi (§3.2) que la reine termite ne « dit » pas aux ouvrières quoi faire. §5 : cinq heuristiques : *Positive feedback isn't always negative*; *Randomness can help create order*; *A flock isn't a big bird*; *A traffic jam isn't just a collection of cars*; *The hills are alive*.
- **Wilensky et Resnick 1999** [T, début] : la confusion et le glissement entre niveaux sont à l'origine de nombreux malentendus profonds (ex. : l'embouteillage recule alors que les voitures avancent).
- **Chi et al. 2012** [R] : les élèves invoquent des agents de contrôle à but intentionnel; schéma causal direct appliqué à tort à des processus non séquentiels; l'enseignement direct d'un schéma émergent améliore la compréhension de la diffusion.
- **Kelemen et Rosset 2009** : sous contrainte de temps, des étudiants jugent correctes davantage d'explications téléologiques injustifiées, sans plus d'erreurs sur les items témoins [R].
- **Tamir et Zohar 1991** [R] : 28 élèves de biologie, Jérusalem; l'acceptation de formulations anthropomorphes n'implique pas un raisonnement anthropomorphe; la plupart distinguent formulation et explication factuelle; plusieurs jugent ces formulations utiles à la compréhension. **Zohar et Ginossar 1998** plaident pour lever le tabou [S].
- **McGellin et al. 2021** [R] : 174 adultes; lire un texte quelconque améliore les connaissances; aucune différence de compréhension, de plaisir ou de pensée anthropomorphe entre texte anthropomorphe et non anthropomorphe; plus d'exemples vivaces, moins de généralisations avec le texte anthropomorphe; « évocateur mais possiblement distrayant ».
- **Échelle évolutive** : lire un arbre comme une échelle de progrès est une erreur fréquente (« primitive lineage fallacy »; Omland et al. 2008 [R]; Baum et al. 2005 [M]). Les fourmis et les Apoidea (abeilles et guêpes apoïdes) sont des **groupes frères** (Johnson et al. 2013) [R].
- **Reine** : les phéromones de reine de l'abeille domestique sont décrites par Slessor et al. 1988 (réponse de cour; cinq composés du mélange mandibulaire [à confirmer]) [S]. Oystaeyen et al. 2014 rapportent des phéromones de reine stérilisantes chez une guêpe, un bourdon et une fourmi du désert, avec des hydrocarbures saturés conservés sur trois origines indépendantes de l'eusocialité [R]; Amsalem et al. 2015, avec *Bombus impatiens*, ne trouvent aucun appui à une classe conservée d'hydrocarbures [R]. Le caractère général est donc **contesté**.
- **Débunkage** (Lewandowsky et al. 2020, pp. 9–13) [T] : « Do not refrain… out of fear that doing so will backfire »; les effets boomerang de familiarité et de vision du monde sont rares, l'effet de surcharge n'est pas appuyé (une seule étude directe); répéter un mythe en le réfutant s'est révélé sûr dans de nombreux contextes. Structure : **Fait** (en premier, si simple, concret, plausible, qui s'intègre au récit) → **avertir** qu'un mythe vient, le mentionner **une fois** → **expliquer la faille** (pourquoi on l'a cru, pourquoi c'est faux, pourquoi l'alternative est juste) → **Fait** de nouveau; une simple rétractation est insuffisante; l'alternative ne doit pas être plus complexe que le mythe; si les faits sont trop nuancés pour un résumé, expliquer d'abord pourquoi le mythe est faux. Document compagnon : « Simple negations are not effective… » (R5) [T]. Swire-Thompson et al. 2020 : les effets boomerang ne sont pas un phénomène empirique robuste [R].
- **Instrument** (Khodr et al. 2022) [T] : questionnaire de cinq scénarios (Traffic Jam, Scattering, Flock of Birds, Butterfly Effect, Robots and Gold), mélange de choix multiples et de questions ouvertes; cinq catégories ontologiques : Ordre (centralisé/décentralisé), Causes (unique/multiples), Effet des actions (linéaire/non linéaire), Effet des agents (prévisible/aléatoire), Processus (statique/émergent); trois niveaux de codage (modèle « mécanique » centralisé, modèle de systèmes complexes, intermédiaire); validation : 11 participants puis entretiens verbaux cognitifs (3 novices, 3 experts), puis 37 répondants (8 experts, 29 non-experts); notation floue; instrument libre d'accès. **Aucun scénario ne traite d'insectes sociaux** [T]; validité limitée (N = 37).
- **Jacobson et al. 2011** [R] : environnement hypermédia à modèles à agents (cinq modèles NetLogo, dont le fourragement de fourmis [T, Khodr et al. 2022]); le groupe le plus étayé progresse en connaissances déclaratives; les groupes ne diffèrent pas d'abord en résolution de problèmes; l'enrichissement des ontologies prédit un meilleur transfert.

### 3.8 Éthique de la recherche et vie privée (Canada, Québec)

**EPTC 2** (CRSH et al. 2018; éd. 2018, français) [T] :

| Article | Contenu pertinent |
|---|---|
| 2.1 (application) | La « recherche » est une démarche visant le développement des connaissances par une étude structurée ou une investigation systématique. Pour décider s'il s'agit de recherche, le choix de la méthode et l'intention (ou la capacité) de publier ne sont pas des facteurs pertinents. **Les études pilotes font partie des recherches exigeant l'évaluation d'un CER.** Les activités de recherche intégrées à un cours sont aussi couvertes. |
| 2.2 | Pas d'évaluation pour la recherche fondée exclusivement sur de l'information publique sans attente raisonnable de vie privée |
| 2.4 | Idem pour l'utilisation secondaire exclusive de renseignements **anonymes**, si le couplage ou la diffusion ne crée pas de renseignements identificatoires |
| 2.5 | Les études d'assurance et d'amélioration de la qualité, l'évaluation de programmes et les examens administrés dans un programme d'enseignement **s'ils servent exclusivement** à l'évaluation, la gestion ou l'amélioration ne sont pas de la recherche. Si les données sont ensuite destinées à la recherche, il s'agit d'une utilisation secondaire : évaluation par un CER possible (note d'application). |
| 3.1 | Consentement donné volontairement; retrait en tout temps; demande de retrait des données. Influence indue possible quand le recrutement est fait par une personne en autorité (ex. enseignant à étudiant); si des étudiants refusent de participer pour des crédits, ils doivent pouvoir obtenir les crédits autrement. |

L'éd. 2022 (publiée le 30 janvier 2023 [S]) a été lue par la vérification indépendante pour les articles 2.1, 2.5 et 3.1 : inchangés [T]; ces articles s'appliquent donc tels quels; numérotation des autres articles non comparée [à confirmer].

**Loi 25 (Québec 2021; L.Q. 2021, c. 25)**, articles tels que sanctionnés [T] :

| Disposition | Contenu |
|---|---|
| Loi sur le secteur privé, art. 3.1–3.3 | responsable de la protection des renseignements personnels (RPRP) et coordonnées publiées; politiques de gouvernance publiées; **évaluation des facteurs relatifs à la vie privée (EFVP)** pour tout projet de système d'information ou de prestation électronique de services impliquant des renseignements personnels, proportionnée à la sensibilité et à la finalité |
| art. 8.1 (secteur privé) et 65.0.1 (organismes publics) | Informer **au préalable** du recours à une technologie comprenant des fonctions d'identification, de localisation ou de profilage, et des moyens offerts pour **activer** ces fonctions. Le profilage s'entend de la collecte et de l'utilisation de renseignements pour évaluer des caractéristiques d'une personne (rendement, préférences, intérêts, comportement). L'énoncé « désactivées par défaut » est celui de Québec.ca (CAI s. d.) [R], non une formule du texte lu. |
| art. 8.2 | politique de confidentialité en termes simples et clairs, publiée sur le site si la collecte est technologique |
| art. 9.1 | paramètres de confidentialité au plus haut niveau par défaut pour un produit ou service technologique offert au public; **exception** : paramètres des témoins de connexion |
| art. 14 | consentement manifeste, libre, éclairé, pour des fins spécifiques; **mineur de moins de 14 ans : titulaire de l'autorité parentale ou tuteur**; mineur de 14 ans et plus : le mineur, le titulaire ou le tuteur |
| art. 21, 21.0.1 | communication sans consentement à des fins d'étude ou de recherche si une EFVP conclut à cinq conditions; demande écrite avec décision documentée d'un CER le cas échéant |
| art. 90.12 | sanction administrative maximale : 50 000 $ (personne physique) ou 10 M$ / 2 % du chiffre d'affaires mondial |
| art. 91 | amende pénale : 5 000 à 100 000 $ (personne physique); 15 000 à 25 M$ ou 4 % du chiffre d'affaires mondial (autres cas) |

Applicabilité à un chercheur [I] : la loi sur le secteur privé vise « une personne qui exploite une entreprise »; un établissement d'enseignement relève plutôt de la loi sur l'accès (art. 65.0.1). Savoir de laquelle relèvent les pages est une question pour le RPRP de l'établissement.

---

## 4. Résultats cibles et critères d'acceptation

Régime : dossier méthodologique. La section 4.1 transcrit des énoncés exacts publiés (avec emplacement); la section 4.2 fixe des critères d'acceptation quantitatifs **de V0**, reproductibles. Les seuils marqués [I] sont proposés par ce dossier et à préenregistrer avant la collecte.

### 4.1 Énoncés exacts et valeurs publiées

| ID | Énoncé (paraphrase fidèle ou citation courte) | Valeur | Source, emplacement | Lu |
|---|---|---|---|---|
| E1 | « the educational value of animations without interactivity is quite limited » | — | Adams et al. 2008c, §I.A « Animation and Interactivity » (p. 9 du PDF); phrase retrouvée aussi dans le manuscrit d'auteur de la partie I (Adams et al. 2008a), à citer de préférence; version éditeur non lue [à confirmer] | [T] |
| E2 | Étudiants interviewés; pas de nouvelle information d'interface dans les 2 derniers de 6 entretiens | > 200 entretiens; 89 étudiants; 52/60 sims; 4–6 par sim | Adams et al. 2008c, « Interview Methodology » (p. 3) | [T] |
| E3 | Accord intercodeurs sur un extrait codé | 95 % → ≈ 100 % | Adams et al. 2008c, p. 4 | [T] |
| E4 | Partie I : plus de 275 entretiens d'étudiants; partie II : plus de 200 | 275 ; 200 | Adams et al. 2008a, Adams et al. 2008b (résumés) | [R] |
| E5 | Effet global de l'animation sur le statique | g = 0,226 [0,12 ; 0,33]; k = 140, 61 études, N = 7 036; I² = 78,38 % | Berney et Bétrancourt 2016, résumé ; version EARLI, « Main results » | [R/T] |
| E6 | Rythme imposé; avec commentaire; sans texte | g = 0,309 ; 0,336 ; 0,883 | Berney et Bétrancourt 2016, résumé | [R] |
| E7 | Animation contre image fixe | d = 0,37 [0,25 ; 0,49]; 26 études; 76 comparaisons | Höffler et Leutner 2007, résumé | [R] |
| E8 | Guidage et résultats d'apprentissage | d = 0,50 [0,37 ; 0,62]; 72 études (le 0,50 repose sur 60 comparaisons issues des 72 études) | Lazonder et Harmsen 2016, résumé | [T] |
| E9 | Gain normalisé de classe | ⟨g⟩ = (post − pré)/(100 − pré) | Hake 2002, Éq. 1b | [T] |
| E10 | ⟨⟨g⟩⟩ traditionnel; interactif | 0,23 ± 0,04 (14 cours); 0,48 ± 0,14 (48 cours) | Hake 2002, Éq. 5–6 ; Hake 1998, résumé | [T/R] |
| E11 | Corrélation ⟨g⟩–prétest | +0,02 (62 cours) | Hake 2002, Éq. 2 | [T] |
| E12 | d de Hake | 2,43 | Hake 2002, Éq. 9 | [T] |
| E13 | g biaisé vers les prétests élevés | r(g, d) = 0,75; 92 % de variance de g expliquée | Nissen et al. 2018, résumé; §§VII–VIII (pp. 21–23) | [T] |
| E14 | Repères d'effet (essais randomisés d'éducation) | < 0,05 petit; 0,05–< 0,20 moyen; ≥ 0,20 grand; médiane 0,10 | Kraft 2020, « New Empirical Benchmarks » (p. 21 de l'EdWorkingPaper; pagination de la version publiée [à confirmer]) | [T] |
| E15 | Médianes selon l'effectif | 0,24 (≤ 100) contre 0,03 (> 2 000) | Kraft 2020, p. 23 (pagination de la version publiée [à confirmer]) | [T] |
| E16 | Les élèves expliquent les motifs « created either by lead or by seed » | — | Resnick 1996, §4 (pp. 10–11) | [T] |
| E17 | Agent « en charge » : « the teacher », « the mother » | — | Resnick 1996, §4 (p. 11) | [T] |
| E18 | Anthropomorphe sans lien avec raisonnement anthropomorphe | 28 élèves | Tamir et Zohar 1991 (ERIC) | [R] |
| E19 | Pas de différence de compréhension anthropomorphe/non | 174 adultes | McGellin et al. 2021, résumé | [R] |
| E20 | Effets boomerang rares (« occur only occasionally »; familiarité, surcharge, vision du monde) | — | Lewandowsky et al. 2020, pp. 9–11 (familiarité p. 9; surcharge et vision du monde pp. 10–11) | [T] |
| E21 | Structure Fait–Mythe–Faille–Fait; mythe mentionné une fois | — | Lewandowsky et al. 2020, pp. 12–13 | [T] |
| E22 | Prévalence de la déficience rouge-vert | 8 % hommes, 0,5 % femmes (monde; Crameri et al. 2020); 8 % / 0,5 % (nord-européens; Wong 2011) | Crameri et al. 2020, Introduction ; Wong 2011 | [R] (Crameri et al. 2020; Okabe et Ito 2002); [S, à confirmer] (Wong 2011) |
| E23 | Seuils WCAG | 4,5:1 texte; 3:1 non textuel; 24 × 24 px; 320 px; 5 s | W3C 2023, 1.4.3, 1.4.11, 2.5.8, 1.4.10, 2.2.2 | [T] |
| E24 | `prefers-reduced-motion` : disponible depuis | janvier 2020 | MDN s. d. | [T] |
| E25 | Pilotes = recherche; intention de publier non pertinente | — | CRSH et al. 2018, art. 2.1, note d'application (p. 14; identique en éd. 2022) | [T] |
| E26 | Information préalable et moyens d'activer; mineurs < 14 ans | — | Québec 2021, art. 8.1 ; 65.0.1 ; 14 | [T] |
| E27 | Sanctions | 50 000 $ ou 10 M$/2 % (admin.); 5 000–100 000 $ ou 15 000–25 M$/4 % (pénal) | Québec 2021, art. 90.12 ; 91 | [T] |
| E28 | HOP contre barres d'erreur et violons : nettement plus exacts pour 2 et 3 quantités; une quantité : comparable (résumé), pire à forte variance (détail confirmé par la vérification indépendante) | 288 sujets, 96 par condition, neuf tâches; deux quantités F(2, 573) = 57–220; trois quantités F(2, 573) = 43 | Hullman et al. 2015, résumé; sections 5.2.1, 5.3, 5.4 (Fig. 4–8) | [R]; détail [T partiel] |
| E29 | Seuils de catégories de gain | High-g > 0,7; Medium-g 0,3 à 0,7; Low-g < 0,3; 14 cours T tous Low-g; 41/48 IE Medium-g, 7/48 Low-g | Hake 1998 (ERIC), définitions (e)–(g) et résultats (2a)–(2b) | [T] |

### 4.2 Critères d'acceptation de V0

Conventions : « rép. » = répétitions ou participants; les calculs déterministes ont rép. = 1; le script du dossier reproduit les lignes marquées ◆.

| ID | Grandeur mesurée | Valeur cible | Tolérance / règle de décision | Rép. | Méthode |
|---|---|---|---|---|---|
| VA1 ◆ | Contraste des marques graphiques (1.4.11) | ≥ 3:1 sur fond clair (#FFFFFF) **et** sombre (#121212), pour chaque couleur d'identité | tolérance 0 (calcul exact, seuil sRGB 0,04045); état actuel : 3,06 (agent/blanc) = marge de 0,06 | 1 | formule WCAG |
| VA2 ◆ | Contraste du texte (1.4.3) | ≥ 4,5:1; les couleurs d'identité ne servent pas de couleur de texte (fourmi et agent échouent sur blanc) | 0 exception | 1 | idem |
| VA3 ◆ | Distinguabilité sous dichromatie | ΔE2000 ≥ 10 pour chaque paire de la charte sous protanopie, déutéranopie et tritanopie, **et** doublage par pictogramme ou motif | seuil 10 provisoire [I], à confirmer par test visuel avec émulation (DevTools) et au moins 3 relecteurs ayant une déficience réelle; minimum actuel : 12,2 | 3 simulations + test | script + test humain |
| VA4 | Reflow | aucune perte de contenu ni de fonction à 320 × 256 px CSS et 400 % de zoom, hors zone de canevas | 0 écart | 1 par page | manuel + règles automatiques |
| VA5 | Cibles | tout composant interactif ≥ 24 × 24 px CSS (ou exception documentée) | 0 écart non documenté | 100 % des composants | script de mesure du DOM |
| VA6 | Mouvement | tout mouvement automatique > 5 s offre pause/arrêt/masquage; `prefers-reduced-motion: reduce` supprime les animations automatiques | 0 écart | 1 par page, 2 états | émulation navigateur |
| VA7 | Clavier et focus | 100 % des fonctions au clavier; focus visible non masqué; alternative sans glisser aux curseurs | 0 écart | 1 par page | manuel (clavier seul; lecteur d'écran NVDA ou VoiceOver) |
| VA8 | Règles automatisées | 0 violation WCAG 2.2 AA détectée par axe-core ou équivalent, **et** liste manuelle complète cochée | l'automatisation ne couvre qu'environ 57 % des problèmes (Deque 2021) [R, fournisseur] : la liste manuelle est obligatoire | 1 par page et par version | outil + liste |
| VU1 | Problèmes d'utilisabilité trouvés | 6 entretiens par public et par page; arrêt quand 2 entretiens consécutifs ne révèlent aucun problème majeur nouveau; sinon +2 | couverture visée ≥ 85 % : atteinte avec n = 6 si L = 0,31, mais n = 12 si L = 0,15 [I] | 6–12 | voix haute, deux modes PhET |
| VU2 | Fiabilité du codage | accord brut ≥ 90 % au premier double codage (20 % des entretiens), ≥ 95 % après révision | valeur publiée : 95 % → ≈ 100 % [T] | 20 % des entretiens | deux codeurs |
| VL1 | Effet sur les items de conceptions erronées (post immédiat) | d ajusté ≥ 0,30 (ANCOVA, pré en covariable), page interactive prédictive contre version statique | succès : estimation ≥ 0,30 et borne inférieure de l'IC95 > 0; réfutation : borne supérieure de l'IC95 < 0,30 | 132 par bras (ρ = 0,5; puissance 0,80); 188 à recruter si attrition 30 %; par classes : ×2,2 à ×5,8 | assignation aléatoire au sein des classes si possible |
| VL2 | Item « Qui choisit le nouveau site de l'essaim ? » (proportion bonne) | augmentation de 0,30 à ≥ 0,50 | puissance 0,80, α = 0,05 | 93 par groupe | test de deux proportions |
| VL3 ◆ | Gain normalisé de classe ⟨g⟩ (secondaire) | rapporté avec IC par rééchantillonnage (≥ 2 000 tirages) | aucun seuil d'acceptation; repères de Hake 1998 non transposables | tous les groupes | calcul |
| VL4 | Rétention différée (2 à 4 semaines) | même modèle que VL1 | rapporter l'attrition; analyse en intention de traiter | mêmes groupes | ANCOVA |
| VL5 | Instrument de systèmes complexes (Khodr et al. 2022) | score par concept, secondaire | pas de seuil (validation N = 37) | mêmes groupes | notation floue publiée |
| VE1 | Autorisation éthique | avis écrit du CER ou attestation d'exemption **avant** toute collecte, pilotes et entretiens compris | 100 % des collectes | — | dossier CER |
| VE2 | Analytique et témoins | aucune identification, localisation ni profilage actif par défaut; si une étude active ces fonctions, information préalable et consentement; audit réseau sans requête tierce non déclarée | 0 écart à chaque version publiée | chaque version | outils du navigateur (onglet Réseau) |
| VC1 | Lexique et statut épistémique | 0 occurrence des formulations proscrites seules (« la reine commande », « la colonie veut »); étiquette de statut sur 100 % des énoncés et graphes | 0 écart | chaque page | contrôle automatique + relecture |
| VC2 ◆ | Garde-fous de calcul | d(Hake) = 2,43 ± 0,01; contrastes de la charte ± 0,01; CIEDE2000 = valeurs du jeu de test de Sharma et al. 2005 à 5·10⁻⁴; n(d = 0,5) = 64 | PASS/FAIL | 1 | `x_vulgarisation_checks.py` |

---

## 5. Visuels de vulgarisation

Chaque idée précise son appui (source), son public principal et son statut épistémique. Aucune n'est testée : ce sont des **hypothèses de conception** à évaluer avec la section 4.2.

1. **Prédiction avant observation** (Voir; grand public, étudiants). L'utilisateur trace sa prédiction (p. ex. quelle branche domine) avant la simulation, puis voit l'écart avec la distribution et rédige une courte auto-explication. Appui : Kim et al. 2017 [R]; Moreno et Mayer 2007 (réflexion, rétroaction) [R]; protocole de prédiction de PhET [T, Adams et al. 2008c]. Statut : *Hypothèse de l'auteur*. À mesurer par VL1.
2. **Vue de l'agent** (Explorer; étudiants, praticiens). On suit un individu; la règle en cours s'affiche; le reste est masqué hors de son rayon de perception. Appui : « A flock isn't a big bird » [T, Resnick 1996]; confusion de niveaux [T, Wilensky et Resnick 1999]; modélisation incarnée [S, Wilensky et Reisman 2006].
3. **Curseur leurre** (Explorer; étudiants). Un paramètre que les élèves croient influent et qui ne l'est pas (p. ex. « autorité de la reine » sur le choix d'un site), pour que la simulation corrige la conception. Appui : PhET recommande de laisser ajuster des paramètres que les élèves croient pertinents même s'ils n'ont aucun effet, sinon les conceptions erronées ne sont pas traitées [T, Adams et al. 2008c, §I.A]. Précaution : la reine **régule** bel et bien la reproduction; le leurre ne vaut que pour la décision de déménagement ou de butinage [I].
4. **Distribution sur N graines, en deux formes** (Explorer, Vérifier). Nuage statique de N exécutions avec l'exécution courante marquée; en alternative, tirages animés (HOP) pour comparer deux ou trois quantités; **pas** de HOP seul pour une quantité unique à forte variance (Hullman et al. 2015, détail confirmé par la vérification indépendante). Appui : Hullman et al. 2015 [R]; Kale et al. 2019 [R]. Graine et état dans l'URL (cadre §8).
5. **Jumeau statique en petits multiples** (tous niveaux; mode mouvement réduit; affiche; condition témoin). Appui : Robertson et al. 2008 [R]; Tufte 1983, Tufte 1990 [M]; condition témoin de l'évaluation. Contrainte : à contenu textuel identique (Tversky et al. 2002 : l'équivalence de contenu est la faille des comparaisons animation/statique [S]).
6. **Verre à martini** (structure des trois niveaux). Voir = tige conduite par l'auteur; Explorer = ouverture; Vérifier = lecture libre des données. Appui : Segel et Heer 2010, §4.4.1 [T]. Entrée libre pour experts (Kalyuga et al. 2003 [S]).
7. **Échelle d'abstraction** (Explorer → Vérifier). Chaque cellule d'un diagramme de phases ou d'un balayage ouvre l'exécution correspondante. Appui : Victor 2011b [T].
8. **Encart « Ce que fait vraiment la reine »** (Voir; grand public). Format Fait → avertissement → mythe (une fois) → faille → fait. Exemple d'ossature, **à faire valider** par un myrmécologue et un apidologue [Hypothèse de l'auteur] : *Fait* : les déplacements et les choix de travail de la colonie résultent de règles locales et de signaux partagés; *avertissement* : on entend souvent que la reine commande; *mythe* : « la reine donne les ordres »; *faille* : la reine signale sa présence et sa fécondité par des phéromones, ce qui règle la reproduction, pas le choix d'un site ou d'une source (Slessor et al. 1988 pour l'abeille [S]; hydrocarbures de fécondité chez d'autres espèces, résultat contesté [R, Oystaeyen et al. 2014; Amsalem et al. 2015]); *fait* : ces choix émergent des interactions. Appui de structure : Lewandowsky et al. 2020 [T]; conception erronée « by lead or by seed » [T, Resnick 1996].
9. **Arbre sans échelle** (Voir; grand public). Montrer fourmis et Apoidea comme groupes frères, sans flèche fourmi → abeille → agent. Appui : Johnson et al. 2013 [R]; Omland et al. 2008 [R]. Le « signal plus riche » devient une dimension de conception, non un échelon.
10. **Carte comparative en relations** (Voir en version résumée; Explorer en version complète). Colonnes : relation conservée, où l'analogie casse, statut épistémique. Appui : audit vulgarisation, M1 (Gentner 1983, notice) [S via audit].
11. **Pictogrammes sans visage, avec test A/B** (Voir). Les preuves sont partagées : le design émotionnel (couleurs, formes) améliore rétention et compréhension (Wong et Adesope 2021; g⁺ 0,29 à 0,35) [R]; l'anthropomorphisme facial aussi (Liu et Su 2024; 0,28 à 0,46) [R]; un texte anthropomorphe ne dégrade pas la compréhension (McGellin et al. 2021) [R]. En sens inverse, les explications téléologiques injustifiées sont plus souvent acceptées sous contrainte de temps (Kelemen et Rosset 2009) [R], ce qui menace la lecture rapide du grand public [I]. **Conséquence** : ne pas supposer que les visages nuisent; tester silhouette contre visage sur l'item « Qui décide ? » (VL2).
12. **Document réactif de la loi de Little** (Explorer; P4). L, λ, W liés; modifier l'un met à jour les autres. Appui : Victor 2011a (documents réactifs) [T]; analogie d'épicerie [Hypothèse de l'auteur].
13. **Sélecteur synchronisé fourmi/abeille sur mobile** et pause hors écran. Appui : 1.4.10 [T], Page Visibility et Intersection Observer [T]; cibles ≥ 24 px (2.5.8) [T]; tester en 375 × 812 [I].
14. **Résumé textuel vivant et tableau de données** équivalents à chaque graphe. Appui : 4.1.3 [T], contenu de repli du canevas [T], descriptions interactives de PhET (PhET s. d.) [R].
15. **Panneau « Vérifier » à analyses variables** : le lecteur change les choix (graine, paramètre, ordre de mise à jour) et voit la robustesse. Appui : Dragicevic et al. 2019 [S].

### Application par public (synthèse) [I]

| Public | Point d'entrée et durée (audit §3.1) | Éléments de ce dossier à appliquer | Mesure |
|---|---|---|---|
| Grand public (15 ans et plus) | Voir, mobile, 3 à 5 min | prédiction (1), encart sur la reine (8), arbre sans échelle (9), pictogrammes testés (11), contraste et ΔE (VA1–VA3), reflow 320 px et cibles 24 px (VA4–VA5); Loi 25, art. 14 : sous 14 ans, consentement du titulaire de l'autorité parentale (hors public visé) | VL2 (item « Qui choisit ? »); aucune collecte sans CER |
| Étudiants | Explorer puis Modifier la règle, 20 à 50 min, en classe | Vue de l'agent (2), curseur leurre (3), distribution (4), jumeau statique comme témoin (5); recrutement par un enseignant : art. 3.1 de l'EPTC 2 (CRSH et al. 2018; crédits alternatifs, pas d'influence indue) | VL1 (ANCOVA), VL4 (différé), VL5 (Khodr et al. 2022) |
| Praticiens de l'agentique | carte comparative et Vue de l'agent, 10 à 20 min, sans passer par Voir | carte en relations (10), parallèles du §6 (fenêtre de contexte, coût et IC, lexique des agents) | VU1 (entrevues), pas de gain normalisé |
| Chercheurs | Vérifier et note de recherche | panneau multivers (15), distribution sur N graines (4), statut épistémique, critères VC1–VC2 | revue des critères d'acceptation de chaque projet |

---

## 6. Parallèles agentiques appuyés par des sources

Chaque parallèle sépare ce que dit la source de ce qui est inféré.

1. **La Vue de l'agent est la fenêtre de contexte.** Source : le Transformer Explainer (Cho et al. 2024; étude de 90 participants, avantages significatifs en compréhension et engagement; transitions fluides entre niveaux d'abstraction; plus de 490 000 utilisateurs) [R]. Inférence [I] : pour une page sur des agents LLM, afficher exactement l'observation sérialisée que reçoit l'agent, avec transitions du niveau « agent » au niveau « système », sur le modèle de l'échelle d'abstraction de Victor 2011b [T].
2. **Mêmes pièges de vocabulaire pour les agents.** Source : Shanahan 2022 met en garde contre « knows », « believes », « thinks » appliqués aux grands modèles de langage [R]; Resnick 1996 : des enfants placent un agent « en charge » (« the teacher ») [T]. Inférence [I] : l'architecture à orchestrateur central rejoue l'intuition « lead » de Resnick 1996; le lexique contrôlé (audit §3.6) s'applique aux pages sur les agents, et l'item « La colonie veut… » a un équivalent « L'agent veut… ».
3. **Statistiques d'évaluation pour les pages sur les agents.** Source : Miller 2024 (les évaluations sont des expériences; intervalles de confiance et planification) [R]; Kapoor et al. 2024 (accuracy seule, coûts ignorés, reproductibilité absente) [R]; Hullman et al. 2015 (distributions) [R]. Inférence [I] : afficher, pour chaque cellule d'une grille d'agents, la distribution sur N exécutions **et** le coût, avec intervalle; HOP en complément seulement.
4. **Praticiens : entrer sans le récit guidé.** Source : effet d'inversion de l'expertise [S, Kalyuga et al. 2003] et guidage moins utile aux connaissances élevées [R, Kirschner et al. 2006]; la segmentation profite davantage aux connaissances préalables élevées (rétention) [R, Rey et al. 2019]. Inférence [I] : pour les praticiens, point d'entrée = carte comparative et Vue de l'agent (audit §3.1).
5. **« Modifier la règle » vers « remplacer par un appel LLM ».** Source : environnement à NetLogo d'ancrage de Jacobson et al. 2011 [R] et modification de règles dans StarLogo [T, Resnick 1996]; LLM dans NetLogo (voir dossier p7 et audit lacunes L05) [S via audit]. Inférence [I] : la même interface de politique `decide(observation) → action` permet la comparaison pédagogique règle contre LLM (audit simulation-technique m9).
6. **Analyses multivers pour les évaluations LLM.** Source : Dragicevic et al. 2019 (rapport où le lecteur modifie les choix d'analyse) [S]. Inférence [I] : variantes d'invite, de modèle et de graine exposées au lecteur dans le niveau Vérifier de P7.
7. **Instrument de systèmes complexes pour praticiens.** Source : Khodr et al. 2022 (cinq catégories; scénarios hors insectes) [T]. Inférence [I] : adapter deux scénarios (décision de groupe sans chef; orchestrateur contre auto-sélection) pour mesurer le glissement « lead » chez les praticiens.

---

## 7. Corrections au cadre et à la v3

**Au cadre v4**

1. **§2.1 : « [le slogan] installe le mythe qu'il veut défaire ».** L'effet d'installation par répétition n'est pas appuyé comme règle générale : les boomerangs de familiarité, de surcharge et de vision du monde sont rares (« occur only occasionally »; surcharge : une seule étude directe, sans effet), et il est déconseillé de s'abstenir de corriger par crainte d'un boomerang [T, Lewandowsky et al. 2020, pp. 9–11]. Garder la reformulation (justifiée par l'exactitude biologique), mais fonder l'argument sur : fait d'abord, mythe une fois, explication de la faille; une simple négation est insuffisante [T].
2. **§8 : « pas d'anthropomorphisme ni de téléologie ».** Trop absolu et non mesurable. Tamir et Zohar 1991 (28 élèves) et McGellin et al. 2021 (174 adultes) ne montrent pas qu'une formulation anthropomorphe produit des conceptions erronées [R]; ce qui est robuste côté conceptions erronées est l'attribution **causale** à un agent de contrôle ou à un but (Resnick 1996 [T]; Chi et al. 2012 [R]; Kelemen et Rosset 2009 sous contrainte de temps [R]). Reformulation proposée : « pas d'agent de contrôle ni de finalité dans l'explication causale; métaphore admise si étiquetée; effet mesuré par items » (lexique de l'audit §3.6).
3. **§8 : « WCAG 2.2 AA, daltonisme, `prefers-reduced-motion` ».** Le critère 2.3.3, auquel se rattache `prefers-reduced-motion`, est de niveau **AAA** [T]; le niveau AA exige 2.2.2 (A, mécanisme de pause si > 5 s), 2.5.7, 2.5.8, 1.4.10, 1.4.11, 2.4.11. Garder `prefers-reduced-motion` comme bonne pratique, sans l'attribuer au niveau AA.
4. **§8 : évaluation sans volet éthique.** Le cadre ne mentionne ni l'EPTC 2 ni la Loi 25. Ajouter : avis du CER **avant** tout pilote ou entretien (art. 2.1 : les pilotes sont de la recherche; l'intention de publier n'est pas un critère); l'exemption de l'art. 2.5 vaut pour l'évaluation exclusivement interne; analytique soumise à l'art. 8.1/65.0.1 et à l'EFVP.
5. **§8 : évaluation « pré-test et post-test, condition témoin statique ».** Ajouter le post-test différé, le critère primaire par ANCOVA, un effet minimal d'intérêt (0,30 proposé), un nombre de participants (132 par bras; 188 avec attrition) et le traitement des classes (§3.2). Ne pas fonder la puissance sur g = 0,226 seul (I² = 78 %).
6. **§8 : charte.** Les trois couleurs sont valides, mais : fourmi et agent ne servent pas de couleur de texte sur blanc; la paire abeille–agent en protanopie est au niveau de la paire jugée fragile (ΔE2000 12,2 contre 12,5) : pictogramme ou motif obligatoire, pas seulement « conseillé ». Cividis est optimisée pour la déutéranomalie et jugée « close to optimal » pour la protanomalie et la tritanomalie (Nuñez et al. 2018) [T] : ne pas la présenter comme inadaptée à la tritanopie.
7. **§8 : trois niveaux.** Préciser que *Voir* est obligatoire pour le grand public et optionnel pour praticiens et chercheurs (effet d'inversion de l'expertise; Kalyuga et al. 2003 [S]); ajouter les curseurs leurres [T, Adams et al. 2008c].

**À la v3 (l. 20)**

8. « Animation libre » au niveau 1 : confirmé comme risque (E1), mais « apporte peu » ne signifie pas « nuit » : l'effet moyen de l'animation sur le statique est faible et positif (g = 0,226; d = 0,37) [R]; le défaut vient de l'absence d'exploration engagée et de prédiction. Les animations à rythme imposé font mieux que toutes les formes de rythme libre (g = 0,309) [R/T, EARLI]; garder néanmoins une pause (WCAG 2.2.2).
9. « Curseurs + graphes temps réel » : l'animation est la moins efficace pour l'analyse [R, Robertson et al. 2008]; coupler à un jumeau statique.
10. « Écran partagé » : le critère 1.4.10 **exempte** le contenu exigeant une disposition bidimensionnelle (cartes, diagrammes, jeux) [T]; l'écran partagé n'est donc pas interdit à 320 px, mais exige alternative textuelle et attention aux échelles (audit M7) [I].

**À l'audit vulgarisation (source du cadre)**

11. Le motif « effet boomerang discuté », « [inféré] » (C4) est tranché : effets rares (« occur only occasionally »), non inexistants [T, Lewandowsky et al. 2020].
12. Okabe et Ito 2002 et Wong 2011 (« non lue », M5) : la chronique de Wong 2011 n'est connue que par un extrait relayé [S; à confirmer à la source]; les codes hexadécimaux sont confirmés par la figure 16 de la page d'Okabe et Ito 2002 (RVB lus par la vérification indépendante); Okabe et Ito 2002 donnent 8 % / 5 % / 4 % de mâles selon l'origine [R].
13. EPTC 2 « non consultée » (C2) : lue en édition 2018 [T]; édition 2022 lue par la vérification indépendante (art. 2.1, 2.5 et 3.1 inchangés) [T].
14. Loi 25 « [lu, CAI] : fonctions désactivées par défaut » (m11) : le texte de l'art. 8.1 exige l'**information préalable** et les moyens d'**activer** ces fonctions; la formule « désactivées par défaut » est celle de Québec.ca [R]; l'art. 9.1 (plus haut niveau de confidentialité par défaut) **exclut** les témoins de connexion [T].
15. WCAG 2.2 « Recommandation du 12 déc. 2024 » : la Recommandation date du 5 octobre 2023 et a été mise à jour le 12 décembre 2024 [T].
16. Tailles d'échantillon (§3.7 de l'audit) : 307 / 115 / 63 se recalculent à 309 / 116 / 64, mais omettent covariable (−25 % à ρ = 0,5), attrition (+43 % à 30 %) et grappes (×2,2 à ×5,8) [I]; l'hétérogénéité de Berney et Bétrancourt 2016 (I² = 78 %) fragilise 0,226 comme valeur de planification.
17. « Hake 1998 [recherche] » : le gain normalisé est contesté (Nissen et al. 2018) [T]; l'audit ne le signalait pas.
18. « Plus de 200 entrevues » (C1) : 275 pour la partie I (Adams et al. 2008a) [R]; 600 pour l'ensemble du programme PhET (Podolefsky et al. 2013) [T].
19. Hohman et al. 2020 (C2) : « peu de lecteurs interagissent » n'est qu'une des deux positions rapportées; l'article note aussi que beaucoup de lecteurs, même sur mobile, s'intéressent à l'interactivité, et conclut à une évaluation empirique limitée [T].

---

## 8. Questions ouvertes et ce qui permettrait de trancher

1. **Version publiée de Hake 1998 (*Am. J. Phys.*).** Seule la version ERIC (OCR) a été lue; vérifier la numérotation des équations et des figures avant une citation formelle. Trancher : PDF de l'AJP (accès institutionnel).
2. **EPTC 2 (2022).** Texte officiel illisible ici (certificat). La vérification indépendante a lu l'éd. 2022 (copie IUCPQ) : articles 2.1, 2.5 et 3.1 inchangés [T]. Reste : la numérotation des autres articles (2.2 à 2.4 notamment) n'a pas été comparée [à confirmer]. Trancher : PDF depuis le CER de l'établissement.
3. **Statut du chercheur en vertu de la Loi 25** (personne exploitant une entreprise ou organisme public) et obligation d'EFVP. Trancher : le RPRP de l'établissement.
4. **Les entretiens de conception (voix haute) relèvent-ils du CER ?** Si les résultats nourrissent une publication, probablement oui (art. 2.1); sinon l'art. 2.5 pourrait s'appliquer. Trancher : décision écrite du CER.
5. **Taille d'effet d'un explorable guidé contre un équivalent statique.** Inconnue; extrapolée d'animations (0,226 à 0,37) et de simulations (PhET). Trancher : pilote de 30 à 60 participants par bras pour estimer écart-type, corrélation pré–post et attrition, puis recalcul (script, section `taille`).
6. **ICC des classes cégep/universitaires.** Non lu (Hedges et Hedberg 2007 illisible). Trancher : assignation aléatoire **au sein** des classes (ICC sans effet), ou ICC estimé au pilote.
7. **Instrument sur « qui décide ? »** : l'instrument de Khodr et al. 2022 n'a aucun scénario d'insectes sociaux et N = 37. Trancher : écrire 3 à 4 items (choix d'un site, rôle de la reine), les valider par entretiens cognitifs (protocole de Khodr et al. 2022 : 3 novices, 3 experts) avant le prétest.
8. **Études sur la conception « la reine commande » chez les élèves.** Non trouvées avec WebSearch (deux requêtes; résultats de vulgarisation seulement). **Ce n'est pas une conclusion d'absence** : l'outil scientifique est indisponible jusqu'au 1er novembre. Trancher : ERIC et bases d'éducation (mots-clés *ant colony*, *queen*, *leader*, *misconception*, *emergence*).
9. **Visages ou silhouettes ?** Preuves partagées (§5.11). Trancher : test A/B préenregistré (VL2).
10. **Seuil de distinguabilité sous dichromatie** : aucun seuil publié adopté; 10 est provisoire. Trancher : épreuve visuelle avec relecteurs ayant une déficience réelle, ou une source sur les seuils de différence de couleur en visualisation (non lue).
11. **Okabe-Ito, valeurs RVB** : tranchée par la vérification indépendante : figure 16 de la page jfly (image) lue, RVB concordant exactement avec les codes hexadécimaux du dossier [R].
12. **Sources non lisibles à la source** : Tversky et al. 2002 (ACM 403), Kim et al. 2017 (résumé seulement), Boy et al. 2015 (HAL bloqué), Schneider et al. 2018 (résumé via moteur), Alfieri et al. 2011 (valeurs via moteur), Mayer s. d. (livre; [non vérifiée]), Tufte 1983, Tufte 1990 et Munzner 2014 (livres), Wieman et al. 2008 (résumé non retrouvé). Trancher : accès institutionnel; vérifier avant de citer un chiffre dans un livrable.
13. **Prédiction avant observation dans les simulations** : l'appui direct (Kim et al. 2017) porte sur des visualisations de données; la méta-analyse POE (Koyunlu Ünlü 2024; g = 0,979) est de qualité hétérogène. Trancher : pilote ciblé (VL1 avec et sans phase de prédiction).
14. **Segel et Heer 2010 : revue et année** absentes du PDF lu : tranchée par la vérification indépendante (Crossref) : *IEEE TVCG* 16(6), 1139–1148, 2010.

---

## 9. Historique de vérification

**Vérification indépendante du 2026-10-01** (rapport : `recherche/verifications/x-vulgarisation.md`). Bilan du vérificateur : 98 références (90 confirmées, 6 corrigées, 2 non vérifiables, 0 erronée); 29 résultats cibles E1 à E29 (27 confirmés, 2 corrigés); tous les calculs recalculés concordent (hors arrondi d'une unité sur un ΔE76). **Consolidation du 2026-10-01** : toutes les corrections du rapport sont appliquées en place; aucune autre modification de fond. Le tableau des références compte maintenant 101 lignes : les 98 d'origine, plus 3 entrées ajoutées (voir 9.3); « StarLogo » est un renvoi à Resnick 1996, non une source distincte (100 références distinctes).

### 9.1 Corrections appliquées

**Références**

1. **Distill 2021** (ex-Olah2021) : signature formelle « Editorial Team », *Distill* 6(7), DOI 10.23915/distill.00031; Olah, Cammarata, Greydanus et Tam figurent dans la note « drafted by ».
2. **Nissen et al. 2018** : « ANCOVA » retiré de la recommandation de l'article (§1.4, §3.1); le texte recommande d et des analyses des post-tests individuels contrôlant le prétest. DOI confirmé (Crossref, journal_ref arXiv). La décision V0 par ANCOVA reste une proposition du dossier [I].
3. **Nuñez et al. 2018** : titre complet; cividis optimisée pour la déutéranomalie et « close to optimal » en protanomalie et en tritanomalie (S4 File, sévérité 100); la formule « non conçue pour la tritanopie » est remplacée (§3.4, §7.6).
4. **Khodr et al. 2022** : 8 pages, non 6.
5. **PhET s. d.** : la page liste des publications et n'énonce pas le lancement de 2014; le fait est sourcé par **Perkins et Moore 2017** (entrée ajoutée) (§3.6).
6. **Kapoor et al. 2024** : arXiv:2407.01502 (v1, 2024-07-01) ajouté.
7. **Okabe et Ito 2002** : la figure 16 de la page a été lue; les RVB concordent exactement avec les codes hexadécimaux du dossier (§2.3.4, §3.4, §7.12, §8.11).
8. **Wong 2011** : preuve de la prévalence 8 % / 0,5 % ramenée de [R] à [S] (extrait relayé; Nature derrière témoins); numéro 8(6) (§3.4, §4.1 E22, §7.12). Le chiffre mondial reste appuyé par Crameri et al. 2020 [T].
9. **Segel et Heer 2010** : *IEEE TVCG* 16(6), 1139–1148, 2010 confirmés (Crossref); DOI 10.1109/TVCG.2010.179 (§2.2, §8.14).
10. **Deque 2021** : source primaire (blogue du 2021-03-10) lue par la vérification; communiqué devops.com non lu.
11. **Hake 1998** : PDF ERIC de 28 p. (ERIC indique 27 p.).
12. **Niveaux de preuve relevés** (le dossier avait [S]) : Marx et Cummings 2007, Liu et Su 2024, Kirschner et al. 2006, Kelemen et Rosset 2009, Swire-Thompson et al. 2020, Ericsson et Simon 1980, Mackinlay 1986, Gleicher et al. 2011, Kale et al. 2019 : [R]. **Wieman et al. 2008** ramené de [R] à [M] (résumé introuvable; aucune valeur n'en dépend).
13. **Compléments de DOI, de titre complet et de pagination** portés au tableau : Hohman et al. 2020 (5(9)); Mayer et Moreno 2003 (DOI); Cleveland et McGill 1984 (DOI, titre); Machado et al. 2009 (DOI); Zohar et Ginossar 1998 (DOI); Wilensky et Resnick 1999 (8(1), 3–19; DOI); Wilensky et Reisman 2006 (DOI, titre); Schneider et al. 2018 (DOI); Koyunlu Ünlü 2024 (893–920); Slessor et al. 1988 (DOI vérifié); Robertson et al. 2008 (14(6), 1325–1332); Kim et al. 2017 (pp. 1375–1386); Heer et Bostock 2010 (pp. 203–212, titre); Kirschner et al. 2006 (DOI, titre); Coletta et Steinert 2020 (titre, 16(1)); Hullman et al. 2015 (titre); Cho et al. 2024 (CHI '26, art. 7, DOI); numéros de fascicule de plusieurs articles (Chi et Wylie, Swire-Thompson et al., Omland et al., Baum et al., Johnson et al., Oystaeyen et al., Amsalem et al., Virzi, Faulkner, Rey et al., Sundararajan et Adesope); Nielsen et Landauer 1993 (pp. 206–213); Liu et Su 2024 (art. 42). Les DOI de Sharma et al. 2005, de Wilensky et Resnick 1999, de Kirschner et al. 2006, de Segel et Heer 2010 et la forme longue du titre de Heer et Bostock 2010 proviennent d'une consultation directe de Crossref ou de la page des auteurs lors de la consolidation.
14. **Étiquettes normalisées** « Nom année » dans tout le texte; les clés internes (Victor2011a, Hake1998, etc.) sont retirées. Particule omise : Oystaeyen et al. 2014 (Van Oystaeyen).

**Résultats cibles et paramètres**

15. **E1** : la phrase « quite limited » est à la p. 9 (non p. 10) du PDF de la prépublication; elle figure aussi dans le manuscrit d'auteur de la partie I (Adams et al. 2008a), absente de celui de la partie II; citer la partie I (§1.1, §2.3.1, §4.1, §5.3).
16. **E16** : citation littérale « created either by lead or by seed » (§1.7, §3.7, §4.1, §5.8).
17. **E20** : pp. 9 à 11 (non 9–10); « rares » (« occur only occasionally ») et non « non robustes ». Conclusion mise à jour : l'argument du cadre (§2.1) est affaibli, non appuyé tel quel (§1.8, §4.1, §7.1, §7.11).
18. **E8** : le 0,50 de Lazonder et Harmsen 2016 repose sur 60 comparaisons issues des 72 études.
19. **E14 et E15** : valeurs lues dans l'EdWorkingPaper 19-10 (août 2019) de Kraft 2020; pagination de la version publiée marquée [à confirmer].
20. **EPTC 2, éd. 2022** : lue par la vérification (copie IUCPQ); articles 2.1 (note sur les études pilotes), 2.5 et 3.1 inchangés. L'hypothèse « chapitre 2 inchangé [I] » est levée pour ces articles (§1.11, §2.3.6, §3.8, §7.13, §8.2).
21. **Seuil de luminance** : 0,04045 est une mise à jour du W3C (le seuil publié avant mai 2021 est 0,03928), non un « erratum » (§3.4).
22. **E28 / Hullman et al. 2015** : détail des essais confirmé (« à relire » levé) (§3.5, §4.1, §5.4).
23. **Sharma et al. 2005** : jeu de test CIEDE2000 lu à la source, valeurs concordantes (§3.4).
24. **Marqueurs** : [non vérifiée] sur Mayer s. d. et Québec 2024 (SGQRI 008); [à confirmer] sur les valeurs non confirmées à la source (voir 9.2).

### 9.2 Réserves restantes

- **Hake 1998** : version publiée (*Am. J. Phys.*) non lue; numérotation des équations et figures à vérifier (§8.1).
- **Mayer s. d.** (livre) : [non vérifiée]; éditeur et année absents [à confirmer]; aucune valeur n'en dépend.
- **Québec 2024 (SGQRI 008)** : [non vérifiée]; existence et date d'entrée en vigueur (2024-04-29) connues par des tiers seulement; page du Conseil du trésor en 404.
- **Valeurs connues par source secondaire seulement [à confirmer]** : Schneider et al. 2018 (103 études, N = 12 201, g⁺ 0,53 et 0,33, connaissances préalables non modératrices); Alfieri et al. 2011 (le rapport signale 0,36 et −0,15 parmi les valeurs non confirmées, mais classe aussi le 0,50 de la découverte guidée parmi les valeurs [S] seulement dans sa section 2.2; les trois sont donc marquées); Heer et Bostock 2010 (« 50 sujets par tâche », absent du résumé lu); Wong 2011 (8 % / 0,5 %); Slessor et al. 1988 (cinq composés); Nielsen et Landauer 1993 (L = 0,31) et Faulkner 2003 (85 %, 55 %).
- **Contenu non vérifié** : Wieman et al. 2008 (résumé), Dragicevic et al. 2019 et Boy et al. 2015 (contenu et résultat), Tversky et al. 2002 (résumé relayé seulement).
- **Adams et al. 2008a** : version éditeur non lue (la phrase « quite limited » n'est vue que dans le manuscrit d'auteur); année de la prépublication (Adams et al. 2008c) supposée [à confirmer].
- **Kraft 2020** : pagination de la version publiée non contrôlée.
- **EPTC 2 éd. 2022** : numérotation des articles autres que 2.1, 2.5 et 3.1 non comparée.
- **Constat du rapport non intégré au corps** (ajout de fond, hors du périmètre des corrections) : EPTC 2, art. 6.11 et 10.1, que le dossier ne cite pas. L'évaluation par le CER n'est pas requise pour la phase exploratoire initiale (contacts préliminaires), mais l'information recueillie ne peut servir à la recherche que si l'intention est déclarée dans la demande et le consentement prévu. Pertinent pour la question ouverte §8.4 (entrevues de conception); à examiner avant le dépôt au CER.
- **Citations de seconde main sans entrée** : Springer et al. 1999 (via Hake 2002), Resnick 1990 (via Resnick 1996), Gentner 1983 (via l'audit vulgarisation); non vérifiées par la vérification indépendante.

### 9.3 Entrées ajoutées au tableau (sources citées sans entrée)

Sharma et al. 2005 (demandée par le rapport), Perkins et Moore 2017 (source du fait de 2014, désignée par le rapport), Complexity Explorables s. d. (page vérifiée par le rapport, citée au §1.12 sans entrée).

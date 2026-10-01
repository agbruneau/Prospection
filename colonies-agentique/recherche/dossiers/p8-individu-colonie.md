# Dossier P8 — Individu et colonie (intelligence individuelle contre collective), comparatif fourmi / abeille

Dossier documentaire du Projet 8 du cadre v4 (`docs/00-cadre.md`, qui prime). Rédigé le 2026-10-01. Régime : production (livrable sur lequel le chercheur va agir), avec des pré-tests numériques exploratoires (section 4.4).

**Statut :** consolidé après vérification indépendante, 2026-10-01. Les corrections du rapport `recherche/verifications/p8-individu-colonie.md` sont appliquées en place (voir « Historique de vérification », section 9). Les références sont désignées par leur étiquette normalisée « Nom année » (liste complète en section 2).

**Légende de vérification** (appliquée à chaque affirmation chiffrée) :

- **[T]** texte intégral lu (HTML PMC ou PDF extrait par `pdftotext`; les équations et figures citées ont été lues en image).
- **[R]** résumé seulement lu.
- **[M]** métadonnées seulement (titre, revue, DOI).
- **[S]** rapporté par une source secondaire lue, nommée entre parenthèses.
- **[I]** inférence ou calcul de l'auteur du dossier, non publié tel quel (y compris toute valeur lue sur une figure par numérisation).

**Conditions de lecture.** L'outil scientifique (Consensus) a refusé dès le premier appel (30 recherches mensuelles épuisées). Les lectures ont passé par WebFetch (outil de lecture avec modèle de synthèse : il restitue des faits, pas du texte mot à mot), PubMed (efetch), Europe PMC, OpenAlex (limite de débit atteinte en cours de route), arXiv et les PDF libres. PNAS, Wiley et OpenReview ont refusé (403 ou vérification de navigateur); les redirections de cookies de Springer et de Nature n'ont pas été suivies. Un chiffre que la vérification indépendante n'a pas confirmé est marqué « [à confirmer] »; une référence non vérifiable est marquée « [non vérifiée] » là où elle est citée. Aucune référence n'est de mémoire.

---

## 1. Synthèse

1. **Cible pivot (fourmi).** Sasaki et al. 2013 (*Temnothorax rugatulus*, choix du nid par la luminosité) : la colonie discrimine mieux que la fourmi isolée pour de petites différences (seuils α de 6,6 à 7,4 lux contre 30,9 à 32,3 lux), l'individu fait mieux pour de grandes différences (asymptotes lues sur la Fig. 2A : individus ≈ 0,92, colonies ≈ 0,80) [T, I]. Le modèle est une chaîne de Markov dont j'ai lu les trois équations (section 3, M1); les taux de transition et le seuil de quorum T sont dans le SI, **non lu** (accès refusé). La réplication complète est donc bloquée par une donnée manquante, pas par un doute sur le résultat.
2. **Ce que la colonie « vaut ».** En numérisant la Fig. 3 de l'article, la colonie équivaut à un jury de **3 à 5 fourmis indépendantes** (aux différences ≤ 50 %), pas aux 100 simulées, et elle passe sous l'individu au-delà de ≈ 58 % de différence de qualité [I]. Le gain d'interaction (quorum) est donc faible devant le gain d'agrégation (vote), ce qui est exactement la décomposition prévue au cadre (§4).
3. **Le comparateur de Sasaki n'est pas à budget égal** : une fourmi présélectionnée contre une colonie de 20 à 250 ouvrières [T, confirmé à la vérification indépendante]. Le résultat « la colonie bat l'individu si la tâche est difficile » ne tranche donc pas la question « à budget égal » de QR1. C'est aussi vrai de la plupart des résultats agentiques favorables aux collectifs (Li et al. 2024, Wang et al. 2024a [Mixture-of-Agents], Hadfield et al. 2025 [billet d'Anthropic]); seuls Kapoor et al. 2025, Kim et al. 2025a et Snell et al. 2024 contrôlent le budget.
4. **« Difficile » a au moins cinq sens** dans les sources (M13) et les résultats pointent dans des directions opposées : chez Sasaki (difficulté = petite différence, bruit non biaisé) le collectif gagne; chez Chen et al. 2024 (requête « difficile » = réponse modale fausse, p < 1/2) le vote nuit; chez Kim et al. 2025a la coordination aide sous ≈ 45 % de précision de base et nuit au-delà; chez Snell et al. 2024 le calcul au test aide sur les questions faciles et intermédiaires. La réconciliation (la précision item par item de l'individu, p_i, et la structure de corrélation décident) est une **inférence** [I], proposée comme E8.1.
5. **Sagesse des foules.** Condorcet suppose indépendance et p > 1/2; avec des causes communes la limite n'est plus 1 (Dietrich et Spiekermann 2013 [S]) : pour p = 0,6 et une corrélation intra-classe ρ = 0,1, la majorité plafonne à 0,736 au lieu de 1 [I]. Le « théorème de prédiction de la diversité » est une identité algébrique (Krogh et Vedelsby 1995 [T]), pas une hypothèse. Hong et Page 2004 : la réplication reproduit « équipe aléatoire > équipe des meilleurs » (24 fonctions : 94,55 contre 93,56 et 95,90 contre 93,64; publié 94,72 / 93,78 et 96,08 / 93,52 [I, T]), mais le théorème est trivial et l'expérience illustre l'aléa, non la diversité (Thompson 2014 [T]).
6. **L'individu n'est pas un suiveur naïf.** Chez *Lasius niger*, la mémoire de route l'emporte sur la piste : 74,6 % de bons choix après 1 visite, 95,3 % après 3, contre 61,6 à 70,2 % pour une piste seule; en conflit, 82 à 100 % suivent la mémoire [Grüter et al. 2011, T]. Chez l'abeille, 93 % des cas relèvent de l'information privée devant une danse [Grüter et al. 2008, R].
7. **Abeille : pas de plan « colonie contre individu isolé » équivalent à celui de Sasaki** (non trouvé; recherche non exhaustive) [I]. Les résultats comparables portent sur la **valeur de l'information sociale selon l'environnement** : colonies à danses désorientées qui butinent mieux dans un habitat tempéré pauvre (perte de poids −0,101 contre −0,134 kg/j) [I'Anson Price et al. 2019, T], erreur angulaire de la danse bénéfique ou nuisible selon la rareté (Okada et al. 2014 [R]), et apprentissage social nécessaire à une danse correcte (Dong et al. 2023 [R]). Asymétrie à déclarer (cadre §5, parité).
8. **Agentique.** Le vote de K échantillons améliore un modèle faible (Llama2-13B, GSM8K : 0,35 → 0,59 à K = 40 [Li et al. 2024, T]), mais 40 × 13 G de paramètres ≈ 7,4 × le coût d'un 70 G [I]; le gain n'est pas monotone selon la difficulté (Propriété 1) et la précision en fonction de K peut passer par un maximum puis décroître (Chen et al. 2024, [T]). Les conditions des Théorèmes 2 et 4 de Chen et al. 2024 (arXiv v2, inchangées dans le camera-ready NeurIPS) ne concordent pas avec le calcul exact (inégalité inversée au Théorème 4, contre-exemple au Théorème 2; 4.4) [I].
9. **Budget égal.** Kim et al. 2025a : à jetons totaux appariés (≈ 4 800 par essai), la coordination a un rendement négatif quand la précision de l'agent seul dépasse ≈ 45 % (β = −0,236, p = 0,004) et va de +80,8 % (finance décomposable) à −70,0 % (planification séquentielle) [T]. Kapoor et al. 2025 : à coût contrôlé, un simple « warming » (93,2 % pour 2,45 $) égale les agents complexes (LATS : 88,0 % pour 134,50 $) [T].
10. **Corrections principales** (section 7) : espèce et auteurs de Sasaki et al. 2013; budget non égal; **G du cadre indéfini quand P_ref = P_max** (−1,14 à 80 % de différence, indéfini à 99 %); Hong et Page ne prouve pas « diversité > capacité »; le 3,33 % de Condorcet cité dans le dossier P5 ne se retrouve pas par calcul exact; la « carte cognitive » de Menzel et al. 2005 est contestée.
11. **Limites** : SI de Sasaki non lu; code des modèles à agents d'abeille (Schürch et Grüter 2014) non lu; résumé d'éditeur absent (Franks et Richardson 2006; ceux de Dornhaus et Chittka 2004 et de Sherman et Visscher 2002 ont été retrouvés [R] à la vérification); attribution de Grüter et al. 2010 non vérifiée; controverse non tranchée sur l'odomètre de l'abeille; valeurs lues sur figures = [I].

---

## 2. Références

**Étiquette** : « Nom année » (nom de famille du premier auteur sans particule; deux auteurs « X et Y année »; trois auteurs ou plus « X et al. année »; suffixe a, b seulement en cas de collision). **Statut** après vérification indépendante (2026-10-01) : **vérifiée** = métadonnées exactes et affirmations retrouvées; **corrigée** = la source existe, mais le dossier contenait une erreur ou une imprécision, corrigée en place; **non vérifiée** = non tranché (la référence porte « [non vérifiée] » là où elle est citée). Colonne « Lu » : ce qui a été lu réellement (légende en tête de dossier).

### 2.1 Fourmis demandées par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Sasaki et al. 2013 | Sasaki, T., Granovskiy, B., Mann, R. P., Sumpter, D. J. T. et Pratt, S. C. (2013). Ant colonies outperform individuals when a sensory discrimination task is difficult but not when it is easy. *PNAS*, 110(34), 13769–13773 (en ligne 2013-07-29). | 10.1073/pnas.1304917110 · PMID 23898161 · PMC3752206 | corrigée (contenu : exclusions d'essais, effectifs, présélection, limites; M1) | [T] texte principal (HTML PMC); Éq. 1–3 et Fig. 2A, 3 lues en image; **SI (Tables S1–S4, Fig. S1–S8) non lu** (reCAPTCHA) |
| Sasaki et Pratt 2012 | Sasaki, T. et Pratt, S. C. (2012). Groups have a larger cognitive capacity than individuals. *Current Biology*, 22(19), R827–R829. | 10.1016/j.cub.2012.07.058 · PMID 23058797 | vérifiée | [R] (PubMed) + [S] (AIP Inside Science, ScienceDaily) pour le plan 2 contre 8 nids; texte de l'article inaccessible (403) |
| Sasaki et Pratt 2011 | Sasaki, T. et Pratt, S. C. (2011). Emergence of group rationality from irrational individuals. *Behavioral Ecology*, 22(2), 276–281 (en ligne 2011-01-18). | 10.1093/beheco/arq198 | vérifiée | [R] résumé complet (OpenAlex) |
| Sasaki et Pratt 2018 | Sasaki, T. et Pratt, S. C. (2018). The psychology of superorganisms: collective decision making by insect societies. *Annual Review of Entomology*, 63, 259–275 (en ligne 2017-10-04). | 10.1146/annurev-ento-020117-043249 · PMID 28977775 | vérifiée | [R] résumé complet |
| Feinerman et Korman 2017 | Feinerman, O. et Korman, A. (2017). Individual versus collective cognition in social insects. *Journal of Experimental Biology*, 220(1), 73–82. | 10.1242/jeb.143891 · arXiv:1701.05080 | vérifiée | [T] (arXiv v1, 24 p.; texte éditeur non comparé) |
| Czaczkes et al. 2015 | Czaczkes, T. J., Grüter, C. et Ratnieks, F. L. W. (2015). Trail pheromones: an integrative view of their role in social insect colony organization. *Annual Review of Entomology*, 60, 581–599 (en ligne 2014-10-24). | 10.1146/annurev-ento-010814-020627 · PMID 25386724 | vérifiée | [R] résumé complet |
| Grüter et al. 2011 | Grüter, C., Czaczkes, T. J. et Ratnieks, F. L. W. (2011). Decision making in ant foragers (*Lasius niger*) facing conflicting private and social information. *Behavioral Ecology and Sociobiology*, 65(2), 141–148 (en ligne 2010-07-20). | 10.1007/s00265-010-1020-2 | vérifiée | [T] (PDF libre, Fig. 2–3 lues en image) |
| Franks et Richardson 2006 | Franks, N. R. et Richardson, T. (2006). Teaching in tandem-running ants. *Nature*, 439(7073), 153. | 10.1038/439153a · PMID 16407943 | vérifiée | [R] (notice PubMed; résumé d'éditeur absent d'OpenAlex; aucun chiffre lu) |

Sasaki et al. 2013 : la portée écrit « Sasaki, Mann et Pratt 2013 »; la référence compte cinq auteurs et l'espèce est *T. rugatulus* (section 7).

### 2.2 Abeilles demandées par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Grüter et al. 2008 | Grüter, C., Balbuena, M. S. et Farina, W. M. (2008). Informational conflicts created by the waggle dance. *Proc. R. Soc. B*, 275(1640), 1321–1327. | 10.1098/rspb.2008.0186 · PMC2602683 | vérifiée | [R] résumé (OpenAlex, PubMed) |
| Grüter et al. 2010 | Grüter, C., Leadbeater, E. et Ratnieks, F. L. W. (2010). Social learning: the importance of copying others. *Current Biology*, 20(16), R683–R685 (2010-08-24). | 10.1016/j.cub.2010.06.052 · PMID 20728057 | **non vérifiée** (attribution) | [R] résumé court (l'apprentissage social est adaptatif parce que les démonstrateurs filtrent l'information); texte non lu (accès payant). **L'attribution « copier quand c'est incertain » (section 6, point 4) n'est pas retrouvée dans le résumé.** Identification : la portée dit « Grüter et al. 2008/2010 (copie sociale, information des danses) »; 2008 = Proc B (danse), 2010 = cette synthèse (copie sociale). Alternative non retenue : Grüter et Farina 2009, *Trends in Ecology & Evolution* 24(5), 242–247, 10.1016/j.tree.2008.12.007 [M] |
| I'Anson Price et al. 2019 | I'Anson Price, R., Dulex, N., Vial, N., Vincent, C. et Grüter, C. (2019). Honeybees forage more successfully without the "dance language" in challenging environments. *Science Advances*, 5(2), eaat0450. | 10.1126/sciadv.aat0450 · PMID 30788430 · PMC6374110 | corrigée (T8.8 : variation élevée, non faible) | [T] (HTML PMC; chiffres retrouvés à la vérification indépendante) |
| Dong et al. 2023 | Dong, S., Lin, T., Nieh, J. C. et Tan, K. (2023). Social signal learning of the waggle dance in honey bees. *Science*, 379(6636), 1015–1018 (en ligne 2023-03-09). | 10.1126/science.ade1702 · PMID 36893231 | vérifiée | [R] résumé complet. Identifiée et vérifiée (la portée disait « à identifier ») |
| Dornhaus et Chittka 2004 | Dornhaus, A. et Chittka, L. (2004). Why do honey bees dance? *Behav. Ecol. Sociobiol.*, 55(4), 395–401. | 10.1007/s00265-003-0726-9 | vérifiée | [R] (résumé Springer relu à la vérification) |
| Menzel et al. 2005 | Menzel, R. et al. (2005). Honey bees navigate according to a map-like spatial memory. *PNAS*, 102(8), 3040–3045. | 10.1073/pnas.0408550102 | vérifiée | [R] |
| Giurfa et al. 2001 | Giurfa, M., Zhang, S., Jenett, A., Menzel, R. et Srinivasan, M. V. (2001). The concepts of "sameness" and "difference" in an insect. *Nature*, 410(6831), 930–933. | 10.1038/35073582 · PMID 11309617 | vérifiée | [R] résumé complet (Europe PMC) |
| Esch et al. 2001 | Esch, H. E., Zhang, S., Srinivasan, M. V. et Tautz, J. (2001). Honeybee dances communicate distances measured by optic flow. *Nature*, 411(6837), 581–583. | 10.1038/35079072 | vérifiée (DOI ajouté) | [R] résumé (en tunnel étroit, distance exagérée) |
| Marshall et al. 2009 | Marshall, J. A. R., Bogacz, R., Dornhaus, A., Planqué, R., Kovacs, T. et Franks, N. R. (2009). On optimal decision-making in brains and social insect colonies. *J. R. Soc. Interface*, 6(40), 1065–1074. | 10.1098/rsif.2008.0511 · PMC2827444 | vérifiée | [T] partiel (HTML PMC; dossier P5 [T]); Éq. 4.1, w = k grands, §6.3, SPRT et Neyman-Pearson : [S] (extraction). Fig. 4 = schéma du modèle à commutation directe, Fig. 5 = temps de décision selon k (légendes lues sur PMC [S], concordantes avec le dossier P5 [T]); équations détaillées dans le dossier P5 |

### 2.3 Cadre théorique demandé par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Condorcet 1785 | Condorcet (1785). *Essai sur l'application de l'analyse à la probabilité des décisions rendues à la pluralité des voix*. Paris : Imprimerie royale. | gallica.bnf.fr/ark:/12148/bpt6k417181 · archive.org/details/essaisurlapplica00cond | vérifiée [M] | [M] (existence et numérisation confirmées; l'exemplaire archive.org écrit « rendus »; texte non lu). L'énoncé moderne (indépendance, p > 1/2) est lu dans Dietrich et Spiekermann 2021 |
| Dietrich et Spiekermann 2021 | Dietrich, F. et Spiekermann, K. (2021). Jury theorems. *Stanford Encyclopedia of Philosophy* (première publication 2021-11-17). | plato.stanford.edu/entries/jury-theorems/ | vérifiée | [T] (page entière lue à la vérification; §2.1–2.5, 3.2) |
| Ladha 1992 | Ladha, K. K. (1992). The Condorcet jury theorem, free speech, and correlated votes. *Am. J. Political Science*, 36(3), 617–634. | 10.2307/2111584 | vérifiée | [R] |
| Dietrich et Spiekermann 2013 | Dietrich, F. et Spiekermann, K. (2013). Epistemic democracy with defensible premises. *Economics and Philosophy*, 29(1), 87–120 (en ligne 2013-04-03). | 10.1017/S0266267113000096 | vérifiée | [R] résumé; [S] via Dietrich et Spiekermann 2021 |
| Hong et Page 2004 | Hong, L. et Page, S. E. (2004). Groups of diverse problem solvers can outperform groups of high-ability problem solvers. *PNAS*, 101(46), 16385–16389. | 10.1073/pnas.0403723101 · PMC528939 | corrigée (M4 : quatre hypothèses, N₁ < N) | [T] (HTML PMC, extraction factuelle; recoupé avec Thompson 2014 et ma réplication) |
| Page 2007 | Page, S. E. (2007). *The Difference*. Princeton University Press. | en.wikipedia.org/wiki/Wisdom_of_the_crowd (source secondaire) | vérifiée [S] | [S] (Wikipédia, « Wisdom of the crowd » : énoncé du « diversity prediction theorem »; existence et éditeur confirmés par la bibliographie de Thompson 2014); livre non lu |
| Krogh et Vedelsby 1995 | Krogh, A. et Vedelsby, J. (1995). Neural network ensembles, cross validation, and active learning. *NIPS 7*, 231–238. | papers.nips.cc/paper_files/paper/1994/file/b8c37e33defde51cf91e1e03e51657da-Paper.pdf | vérifiée | [T] (Éq. 1–10) |
| Thompson 2014 | Thompson, A. (2014). Does diversity trump ability? An example of the misuse of mathematics in the social sciences. *Notices of the AMS*, 61(9), 1024–1030 (octobre 2014). | 10.1090/noti1163 · ams.org/journals/notices/201409/rnoti-p1024.pdf | vérifiée (pagination tranchée) | [T] |
| Grim et al. 2019 | Grim, P., Singer, D. J., Bramson, A., Holman, B., McGeehan, S. et Berger, W. J. (2019). Diversity, ability, and expertise in epistemic communities. *Philosophy of Science*, 86(1), 98–123 (en ligne 2018). | 10.1086/701070 | vérifiée | [R] |
| Romaniega 2023 | Romaniega, Á. (2023). Fatal errors and misuse of mathematics in the Hong–Page theorem and Landemore's epistemic argument. arXiv (v3, 2025-01-07). | arXiv:2307.04709 | vérifiée | [R] |
| Galton 1907 | Galton, F. (1907). Vox populi. *Nature*, 75(1949), 450–451. | 10.1038/075450a0 · web.mit.edu/curhan/www/docs/Articles/15341_Readings/Collective_Intelligence/Galton_1907_Vox_Populi.pdf | vérifiée (DOI ajouté) | [T] (page numérisée lue) |
| Wallis 2014 | Wallis, K. F. (2014). Revisiting Francis Galton's forecasting competition. *Statistical Science*, 29(3), 420–424. | 10.1214/14-STS468 · arXiv:1410.3989 | vérifiée | [R] |

Page 2007 : *The Difference* est cité; son contenu n'a pas été lu.

### 2.4 Agentique demandé par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Li et al. 2024 | Li, J., Zhang, Q., Yu, Y., Fu, Q. et Ye, D. (2024). More agents is all you need. *Transactions on Machine Learning Research* (10/2024; accepté 2024-10-23 selon OpenReview). | arXiv:2402.05120 (v2, 2024-10-11) | vérifiée | [T] (PDF, §3–6, Tableaux 2, 3, 5, 6) |
| Wang et al. 2023 | Wang, X., Wei, J., Schuurmans, D., Le, Q., Chi, E., Narang, S., Chowdhery, A. et Zhou, D. (2023). Self-consistency improves chain of thought reasoning in language models. *ICLR 2023* (arXiv v4 = version finale). | arXiv:2203.11171 | vérifiée | [R] (GSM8K +17,9 %, SVAMP +11,0 %, AQuA +12,2 %, StrategyQA +6,4 %, ARC-c +3,9 %) |
| Wang et al. 2024a | Wang, J., Wang, J., Athiwaratkun, B., Zhang, C. et Zou, J. (2024). Mixture-of-Agents enhances large language model capabilities. arXiv v1; *ICLR 2025* (spotlight, OpenReview). | arXiv:2406.04692 | vérifiée | [T] partiel (résumé, Tableau 2, §3.4) |
| Li et al. 2025 | Li, W., Lin, Y., Xia, M. et Jin, C. (2025). Rethinking mixture-of-agents: is mixing different large language models beneficial? arXiv v1; accepté par *TMLR* (OpenReview, 2026-03-05). | arXiv:2502.00674 | vérifiée | [T] partiel (résumé, introduction) |
| Chen et al. 2024 | Chen, L., Davis, J. Q., Hanin, B., Bailis, P., Stoica, I., Zaharia, M. et Zou, J. (2024). Are more LLM calls all you need? Towards the scaling properties of compound AI systems. *NeurIPS 2024* (poster; titre de la fiche OpenReview/NeurIPS). Le PDF camera-ready (copie NSF PAR, en-tête « 38th NeurIPS 2024 ») porte « LM calls » au lieu de « LLM calls ». **Titre v1** (2024-03-04) : « Are more LLM calls all you need? Towards scaling laws of compound inference systems ». | arXiv:2403.02419 (v2, 2024-06-04) · par.nsf.gov/servlets/purl/10596770 | corrigée (titre NeurIPS; M5 : c₃, Théorèmes 2 et 4) | [T] (PDF v2, p. 1–10; Théorèmes 2–4 lus en image; Théorèmes 2 et 4 relus dans le camera-ready NeurIPS) |
| Wang et al. 2024b | Wang, Q., Wang, Z., Su, Y., Tong, H. et Song, Y. (2024). Rethinking the bounds of LLM reasoning: are multi-agent discussions the key? *Proc. ACL 2024 (long)*, 6106–6131. | 10.18653/v1/2024.acl-long.331 · arXiv:2402.18272 | vérifiée | [T] (arXiv v1; version ACL non comparée) |
| Kapoor et al. 2025 | Kapoor, S., Stroebl, B., Siegel, Z. S., Nadgir, N. et Narayanan, A. (2025). AI agents that matter. *TMLR* (publié 2025-06-13 selon OpenReview; le « mai 2025 » du dossier initial n'est pas confirmé). | arXiv:2407.01502 (v1, 2024-07-01) | vérifiée | [T] (arXiv v1, §1–2, Tableau A1; version TMLR non comparée) |

### 2.5 Références ajoutées (hors portée)

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Kim et al. 2025a | Kim, Y. et al. (2025). Towards a science of scaling agent systems. arXiv (v1 2025-12-09; v3 2026-04-08; 20 auteurs, premier auteur Yubin Kim). Aucune version éditeur trouvée (recherche OpenReview négative, non exhaustive). | arXiv:2512.08296 | vérifiée | [T] (PDF v3, résumé, §1, §3–4, annexes C) |
| Snell et al. 2024 | Snell, C., Lee, J., Xu, K. et Kumar, A. (2024). Scaling LLM test-time compute optimally can be more effective than scaling model parameters. arXiv v1 (2024-08-06); *ICLR 2025* (oral), titre modifié (« … than scaling parameters for reasoning »). | arXiv:2408.03314 | vérifiée | [T] partiel (résumé, §1, §3.2) |
| Brown et al. 2024 | Brown, B., Juravsky, J., Ehrlich, R., Clark, R., Le, Q. V., Ré, C. et Mirhoseini, A. (2024). Large language monkeys: scaling inference compute with repeated sampling. arXiv (v3 2024-12-30). | arXiv:2407.21787 | vérifiée | [R] |
| Wu et al. 2024 | Wu, Y., Sun, Z., Li, S., Welleck, S. et Yang, Y. (2024). Inference scaling laws: an empirical analysis of compute-optimal inference for problem-solving with language models. arXiv (v3 2025-03-03). | arXiv:2408.00724 | vérifiée | [R] |
| Smit et al. 2024 | Smit, A., Duckworth, P., Grinsztajn, N., Barrett, T. D. et Pretorius, A. (2024). Should we be going MAD? A look at multi-agent debate strategies for LLMs. arXiv (v3). | arXiv:2311.17371 | vérifiée | [R] |
| Choi et al. 2025 | Choi, H. K., Zhu, X. et Li, S. (2025). Debate or vote: which yields better decisions in multi-agent large language models? *NeurIPS 2025* (spotlight). | arXiv:2508.17536 | vérifiée | [R] (martingale; « le vote explique l'essentiel du gain » retrouvé) |
| Zhang et al. 2025 | Zhang, H., Cui, Z., Chen, J., Wang, X., Zhang, Q., Wang, Z., Wu, D. et Hu, S. (2025). Stop overvaluing multi-agent debate -- we must rethink evaluation and embrace model heterogeneity. arXiv. | arXiv:2502.08788 | vérifiée (titre complet) | [R] |
| Du et al. 2023 | Du, Y., Li, S., Torralba, A., Tenenbaum, J. B. et Mordatch, I. (2023). Improving factuality and reasoning in language models through multiagent debate. arXiv (v1 2023-05-23). | arXiv:2305.14325 | vérifiée | [R] |
| Kim et al. 2025b | Kim, E., Garg, A., Peng, K. et Garg, N. (2025). Correlated errors in large language models. *ICML 2025* (poster). | arXiv:2506.07962 | vérifiée | [R] (plus de 350 modèles; accord de 60 % quand les deux se trompent, sur un banc) |
| Chen 2026 | Chen, J. (2026). When does combining language models help? A co-failure ceiling on routing, voting, and mixture-of-agents across 67 frontier models. arXiv (v1 2026-06-25). | arXiv:2606.27288 | vérifiée | [R] (précision ≤ 1 − β; β observé 0,052 contre 0,023 prédit, copule gaussienne à 67 modèles) |
| Douven 2026 | Douven, I. (2026). Wisdom of LLM crowds: aggregation and contamination in language model ensembles. arXiv (v2 2026-07-22). | arXiv:2607.18269 | vérifiée | [R] (15 LLM, 254 questions; écart de capacité 35,8 % → 8,9 % après contrôle de contamination) |
| Schoenegger et al. 2024 | Schoenegger, P., Tuminauskaite, I., Park, P. S., Bastos, R. V. S. et Tetlock, P. E. (2024). Wisdom of the silicon crowd. *Science Advances*, 10(45), eadp1528. | 10.1126/sciadv.adp1528 | vérifiée | [R] (12 LLM, 31 questions, 925 prévisionnistes humains) |
| Hadfield et al. 2025 | Hadfield, J., Zhang, B., Lien, K., Scholz, F., Fox, J. et Ford, D. (2025-06-13). How we built our multi-agent research system. Billet d'ingénierie d'Anthropic. | anthropic.com/engineering/multi-agent-research-system | corrigée (usage : rapport de jetons; M14) | [T] (billet; extraction factuelle) |
| Sasaki et al. 2018 | Sasaki, T., Pratt, S. C. et Kacelnik, A. (2018). Parallel vs. comparative evaluation of alternative options by colonies and individuals of the ant *Temnothorax rugatulus*. *Scientific Reports*, 8(1), art. 12730 (2018-08-24). | 10.1038/s41598-018-30656-7 · PMID 30143679 · PMC6109163 | vérifiée | [R] (Tug of War pour les individus, Sequential Choice pour les colonies) |
| Edwards et Pratt 2009 | Edwards, S. C. et Pratt, S. C. (2009). Rationality in collective decision-making by ant colonies. *Proc. R. Soc. B*, 276(1673), 3655–3661. | 10.1098/rspb.2009.0981 · PMID 19625319 | vérifiée (DOI ajouté) | [R] résumé (pas d'effet de leurre chez la colonie); citée par Feinerman et Korman 2017 [T] |
| Nicolis et al. 2011 | Nicolis, S. C., Zabzina, N., Latty, T. et Sumpter, D. J. T. (2011). Collective irrationality and positive feedback. *PLoS ONE*, 6(4), e18901. | 10.1371/journal.pone.0018901 | vérifiée | [R] résumé complet |
| Robinson et al. 2011 | Robinson, E. J. H., Franks, N. R., Ellis, S., Okuda, S. et Marshall, J. A. R. (2011). A simple threshold rule is sufficient to explain sophisticated collective decision-making. *PLoS ONE*, 6(5), e19981. | 10.1371/journal.pone.0019981 | vérifiée | [R] |
| Kao et Couzin 2014 | Kao, A. B. et Couzin, I. D. (2014). Decision accuracy in complex environments is often maximized by small group sizes. *Proc. R. Soc. B*, 281(1784), 20133305. | 10.1098/rspb.2013.3305 | vérifiée | [R] résumé (OpenAlex) |
| Mann 2018 | Mann, R. P. (2018). Collective decision making by rational individuals. *PNAS*, 115(44), E10387–E10396. | 10.1073/pnas.1811964115 | vérifiée | [R] |
| Planqué et al. 2010 | Planqué, R., van den Berg, J. B. et Franks, N. R. (2010). Recruitment strategies and colony size in ants. *PLoS ONE*, 5(8), e11664. Cite Beckers et al. 1989 (section 2.6). | 10.1371/journal.pone.0011664 | vérifiée | [T] (Europe PMC XML; lien taille de colonie → mode de recrutement retrouvé) |
| Reina et al. 2018 | Reina, A., Bose, T., Trianni, V. et Marshall, J. A. R. (2018). Psychophysical laws and the superorganism. *Scientific Reports*, 8, 4387. | 10.1038/s41598-018-22616-y | vérifiée | [R] (Hick-Hyman, Piéron, Weber) |
| Lorenz et al. 2011 | Lorenz, J., Rauhut, H., Schweitzer, F. et Helbing, D. (2011). How social influence can undermine the wisdom of crowd effect. *PNAS*, 108(22), 9020–9025. | 10.1073/pnas.1008636108 | vérifiée (DOI ajouté) | [R] (N = 144) |
| List et al. 2009 | List, C., Elsholtz, C. et Seeley, T. D. (2009). Independence and interdependence in collective decision making: an agent-based model of nest-site choice by honeybee swarms. *Phil. Trans. R. Soc. B*, 364, 755–762. | 10.1098/rstb.2008.0277 · PMC2689716 | corrigée (M9 : critère fort ou faible; Fig. 8 illustrative) | [T] (HTML PMC; chiffres retrouvés à la vérification indépendante) |
| Sumpter et Pratt 2009 | Sumpter, D. J. T. et Pratt, S. C. (2009). Quorum responses and consensus decision making. *Phil. Trans. R. Soc. B*, 364, 743–753. | 10.1098/rstb.2008.0204 · PMC2689713 | vérifiée | [T] (HTML PMC; « 3,33 % » retrouvé au §4(d)) |
| Okada et al. 2014 | Okada, R., Ikeno, H., Kimura, T., Ohashi, M., Aonuma, H. et Ito, E. (2014). Error in the honeybee waggle dance improves foraging flexibility. *Scientific Reports*, 4, 4175. | 10.1038/srep04175 · PMC3935192 | vérifiée | [R] résumé complet; texte intégral non lu |
| Beekman et Lew 2008 | Beekman, M. et Lew, J.-B. (2008). Foraging in honeybees—when does it pay to dance? *Behavioral Ecology*, 19(2), 255–261 (en ligne 2007-12-06). | 10.1093/beheco/arm117 | vérifiée | [R] résumé (OpenAlex) |
| Sherman et Visscher 2002 | Sherman, G. et Visscher, P. K. (2002). Honeybee colonies achieve fitness through dancing. *Nature*, 419(6910), 920–922. | 10.1038/nature01127 | vérifiée | [R] (résumé retrouvé à la vérification) |
| Donaldson-Matasci et Dornhaus 2012 | Donaldson-Matasci, M. C. et Dornhaus, A. (2012). How habitat affects the benefits of communication in collectively foraging honey bees. *Behav. Ecol. Sociobiol.*, 66(4), 583–592 (erratum 66(6), 993, 10.1007/s00265-012-1352-1). | 10.1007/s00265-011-1306-z | vérifiée | [S] (recherche) |
| Tautz et al. 2004 | Tautz, J., Zhang, S., Spaethe, J., Brockmann, A., Si, A. et Srinivasan, M. (2004). Honeybee odometry: performance in varying natural terrain. *PLoS Biology*, 2(7), e211. | 10.1371/journal.pbio.0020211 · PMC449896 | vérifiée | [T] (HTML PMC; chiffres retrouvés à la vérification); **mis en cause** par Luebbert et Pachter 2024 (voir ci-dessous) |
| Luebbert et Pachter 2024 | Luebbert, L. et Pachter, L. (2024). The miscalibration of the honeybee odometer. Prépublication **non évaluée par les pairs**; aucune publication en revue trouvée (Crossref). | arXiv:2405.12998 (v1, 2024-05-08) | vérifiée | [T] (PDF, 16 p., Tableaux 1–2). Examine des articles de 1996 à 2010 (dont Srinivasan et al. 2000 et Tautz et al. 2004, cité au Tableau 2 pour un R² de 0,9899 jugé improbable); n'examine pas Esch et al. 2001. Allégations : incohérences, figures dupliquées, calculs incorrects |
| Srinivasan et al. 2024 | Srinivasan, M., Tautz, J. et Stuart, G. W. (2024). Comment on miscalibration of the honeybee odometer. arXiv (2024-08-21). | arXiv:2408.11520 | vérifiée | [R] : réponse point par point, qui conteste les conclusions. Réponses publiées en 2025 : Srinivasan 2025 et Stuart 2025 (section 2.6) [M]; « autres » réponses non identifiées |
| Cheeseman et al. 2014 | Cheeseman, J. F. et al. (2014). Way-finding in displaced clock-shifted bees proves bees use a cognitive map. *PNAS*, 111(24), 8949–8954. | 10.1073/pnas.1408039111 | vérifiée | [R] (décalage d'horloge par anesthésie, carte métrique) |
| Cheung et al. 2014 | Cheung, A. et al. (2014). Still no convincing evidence for cognitive map use by honeybees. *PNAS*, 111(42), E4396–E4397. | 10.1073/pnas.1413581111 · europepmc.org/article/MED/25277972 | corrigée (pages E4396–E4397; OpenAlex « E4402 » est faux) | [M] (lettre; pas de résumé; 13 auteurs) |

### 2.6 Références citées dans le texte, hors tableaux ci-dessus

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Schürch et Grüter 2014 | Schürch, R. et Grüter, C. (2014). Dancing bees improve colony foraging success as long-term benefits outweigh short-term costs. *PLoS ONE*, 9(8), e104660 (2014-08-20). | 10.1371/journal.pone.0104660 | vérifiée | [M] (citée comme réf. 29 par I'Anson Price et al. 2019); **code non lu** |
| Alon et al. 2011 | Alon, N., Avin, C., Koucký, M., Kozma, G., Lotker, Z. et Tuttle, M. R. (2011). Many random walks are faster than one. *Combinatorics, Probability and Computing*, 20(4), 481–502. | 10.1017/s0963548311000125 | vérifiée | [M]; contenu rapporté par Feinerman et Korman 2017 [T] (aucune accélération notable sur grille) |
| Weng et al. 2025 | Weng, Z., Chen, G. et Wang, W. (2025). Do as we do, not as you think: the conformity of large language models. *ICLR 2025* (oral). | arXiv:2501.13381 | vérifiée | [M] (titre, auteurs, venue) |
| Srinivasan et al. 2000 | Srinivasan, M. V., Zhang, S., Altwein, M. et Tautz, J. (2000). Honeybee navigation: nature and calibration of the "odometer". *Science*, 287(5454), 851–853. | 10.1126/science.287.5454.851 | vérifiée | [M]; examinée par Luebbert et Pachter 2024 [T] |
| Srinivasan 2025 | Srinivasan, M. V. (2025). Setting the record straight: a response to Lior Pachter. *J. Comp. Physiol. A*, 211(5–6), 637–640. | 10.1007/s00359-025-01763-4 | vérifiée | [M] (Springer non lu) |
| Stuart 2025 | Stuart, G. W. (2025). A plea for scientific integrity: a comment on the honeybee odometer controversy. *J. Comp. Physiol. A*, 211(5–6), 641–644. | 10.1007/s00359-025-01765-2 | vérifiée | [M] (Springer non lu) |
| Pratt et Sumpter 2006 | Pratt, S. C. et Sumpter, D. J. T. (2006). A tunable algorithm for collective decision-making. *PNAS*, 103(43), 15906–15910. | 10.1073/pnas.0604801103 | vérifiée | [M] (espèce *T. curvispinosus* : reprise du dossier P5 [T], non relue) |
| Seeley et Buhrman 2001 | Seeley, T. D. et Buhrman, S. C. (2001). Nest-site selection in honey bees: how well do swarms implement the "best-of-N" decision rule? *Behav. Ecol. Sociobiol.*, 49(5), 416–427. | 10.1007/s002650000299 | vérifiée | [M] |
| Seeley 2010 | Seeley, T. D. (2010). *Honeybee Democracy*. Princeton University Press. | press.princeton.edu/books/hardcover/9780691147215/honeybee-democracy | **non vérifiée** | non consultée dans ce dossier (existence établie par la vérification du dossier P5, fiche éditeur [M]); contenu du livre non lu |
| Beckers et al. 1989 | Beckers, R., Goss, S., Deneubourg, J.-L. et Pasteels, J. M. (1989). Colony size, communication and ant foraging strategy. *Psyche*, 96(3–4), 239–256. | 10.1155/1989/94279 | vérifiée (métadonnées); contenu « apprentissage contre patrons émergents » **non vérifiée** | [S] via Planqué et al. 2010 (lien taille de colonie → mode de recrutement); résumé de Beckers inaccessible (Wiley : 403) |
| Dietrich 2008 | Dietrich, F. (2008). The premises of Condorcet's jury theorem are not simultaneously justified. *Episteme*, 5(1), 56–73. | 10.3366/e1742360008000233 | vérifiée | [M] (citée par Dietrich et Spiekermann 2021) |
| Boland 1989 | Boland, P. J. (1989). Majority systems and the Condorcet jury theorem. *The Statistician*, 38(3), 181–189. | 10.2307/2348873 | vérifiée | [M] (citée par Dietrich et Spiekermann 2021, §3.2) |
| Karotkin et Paroush 2003 | Karotkin, D. et Paroush, J. (2003). Optimum committee size: quality-versus-quantity dilemma. *Social Choice and Welfare*, 20(3), 429–441. | 10.1007/s003550200190 | vérifiée | [M] (citée par Dietrich et Spiekermann 2021, §3.2) |

---

## 3. Modèles, méthodes, équations et paramètres

### M1 — Sasaki et al. 2013 : chaîne de Markov individu / colonie [T; SI non lu]

Emplacement : Résultats (Éq. 1 à 3), légendes Fig. 1 à 3, Matériel et méthodes (« Markov Chain Model »), SI Tables S2 à S4 (non lues).

**Dispositif** [T, confirmé à la vérification indépendante] : *T. rugatulus*; nid constant à 1 lux (très préféré); nid de comparaison plus clair donc moins bon, à 7, 14, 20, 28, 39, 56 ou 112 lux; cavité de 38 mm, entrée de 2 mm, balsa de 2,4 mm entre deux lames de verre, filtres neutres. Individu : 12 h d'acclimatation, toit retiré, choix lu à 12 h (nid contenant le couvain). Colonie : choix lu quand plus de 90 % des membres sont dans un nid. Chaque sujet est testé aux 7 niveaux (4 ordres). Effectifs rapportés : 106 essais individuels et 112 essais coloniaux, après exclusion de 12 essais individuels (échec à rejoindre un nid cible) et de 10 essais coloniaux (9 scissions, 1 colonie sans déplacement); colonies de 20 à 80 (petites) et de 150 à 250 ouvrières (grandes); individus **présélectionnés** parmi les ouvrières qui rapportent du couvain, issus de colonies de 100 à 130 ouvrières. **Incohérence de l'article** : il indique 32 colonies pour les tests coloniaux, mais aussi 16 colonies testées chacune aux 7 niveaux (16 × 7 = 112 essais); effectif exact de colonies [à confirmer] (SI non lu).

**Éq. 1 (courbe psychométrique ajustée aux données)** [T, image] :

```
P(choix correct) = 0,5 + 0,5 · λ / (1 + exp(−(x − α)/β))
```

x = différence de luminosité (lux); α = seuil de discrimination; β = échelle; λ = niveau asymptotique. Valeurs rapportées [T, confirmées à la vérification indépendante] : α_col = 7,4 lux et α_ind = 32,3 lux (test de Monte-Carlo P = 0,0047), λ_col = 0,80 et λ_ind = 0,93 (P = 0,050); après ajout de données près du croisement, α_col = 6,6, α_ind = 30,9 (P = 0,0020), λ_col = 0,78, λ_ind = 0,89 (P = 0,052). **Incohérence confirmée par la vérification indépendante** : l'Éq. 1 imprimée donne une asymptote 0,5 + 0,5 λ (0,90 et 0,965 pour λ = 0,80 et 0,93), alors que la Fig. 2A montre des asymptotes ≈ 0,80 (colonies) et ≈ 0,915 (individus) [I, lecture de l'image]. Soit λ désigne l'asymptote et l'équation est typographiée autrement, soit λ est bien un facteur appliqué à 0,5 et la Fig. 2A s'en écarte (les valeurs de λ rapportées sont, elles, confirmées dans le texte). À trancher par le SI (Table S1, non lu; section 8).

**Éq. 2 (fourmi isolée)** [T, image] :

```
p_A(i) = q_A
p_B(i) = q_B · ( 2 q_B / (q_B + q_A) )^i          (q_A > q_B)
```

i = nombre de comparaisons déjà faites entre A et B; chaque comparaison réduit l'acceptation du nid inférieur et laisse inchangée celle du meilleur (texte).

**Éq. 3 (colonie, règle de quorum)** [T, image] :

```
p_A(i) = q_A + c · N_A² / (N_A² + T²)
p_B(i) = q_B · ( 2 q_B / (q_B + q_A) )^i + c · N_B² / (N_B² + T²)
```

N_A, N_B = population au site (fourmis engagées + 20 % des fourmis en évaluation); T = seuil de quorum; c = poids de l'information sociale (c = 0 : fourmi isolée). La forme de Hill d'exposant 2 est cohérente avec le critère k ≥ 2 de Sumpter et Pratt 2009 (dossier P5).

**Paramètres de la Fig. 3** (légende) : q_A = 0,20; q_B de 0,19 à 0,001; c = 1,1; population simulée de 100. États : Exploring, A, B, CA_i, CB_i, a (accepte A), b (accepte B); la colonie « choisit » quand plus de 50 % des fourmis sont dans a ou b. **T et les taux de transition : SI Tables S2 à S4, non lus.** L'axe de la Fig. 3 (« différence de qualité, % ») correspond à (q_A − q_B)/q_A [I] (5 % pour q_B = 0,19; 99,5 % pour q_B = 0,001).

**Courbes numérisées** [I, ±0,01; à confirmer] : voir T8.2 (section 4). Fig. 2A (données ajustées) : les courbes se croisent vers 35–40 lux (légende : « < 40 lx »).

**Limites déclarées** [T, corrigées à la vérification indépendante] : c n'est pas optimisé; une part du déficit colonial aux tâches faciles tient au compromis vitesse-précision; un effet de la taille de colonie (grandes meilleures que petites sur toute la plage) est **non significatif** (SI Fig. S2, citée dans le texte principal). Le texte ne déclare pas que individus et colonies sont comparés à échelle inégale, ni que les résultats sont propres à *T. rugatulus* et au choix de nid : les auteurs écrivent plutôt que le schéma pourrait valoir pour de nombreux autres taxons. La non-comparabilité d'échelle reste une observation de ce dossier [I] (section 1, point 3).

### M2 — Condorcet, indépendant et corrélé [S, I]

- **Théorème** (Dietrich et Spiekermann 2021, §2.1) : sous indépendance inconditionnelle et compétence inconditionnelle p > 1/2, la fiabilité de la majorité croît avec n impair et tend vers 1 :

```
P_n(p) = Σ_{k=(n+1)/2..n} C(n,k) p^k (1−p)^(n−k)
```

- **Causes communes** (Dietrich et Spiekermann 2021, §2.2–2.5) : l'indépendance conditionnelle (CI) et la compétence conditionnelle (CC) ne sont presque jamais justifiées ensemble (Dietrich 2008); sous « tendance à la compétence » (TC), la fiabilité de la majorité croît mais sa **limite est inférieure à 1** : « le groupe ne peut battre les faits » (Dietrich et Spiekermann 2013). Ladha 1992 [R] étend le théorème aux votes corrélés (pour de grands groupes, le résultat tient sous des conditions assez générales; l'effet est sévère pour de petits groupes).
- **Modèle bêta-binomial** (choix de l'auteur du dossier [I], un modèle de corrélation parmi d'autres) : votes échangeables de moyenne p et de corrélation intra-classe ρ; a = p(1−ρ)/ρ, b = (1−p)(1−ρ)/ρ; P_n = Σ_{k>n/2} C(n,k) B(k+a, n−k+b)/B(a,b); limite n → ∞ = P(Beta(a,b) > 1/2).
- **Hétérogénéité de compétence** (Dietrich et Spiekermann 2021, §3.2) : Boland 1989 et Karotkin et Paroush 2003 : une taille de groupe optimale finie peut exister.
- **Galton 1907** [T] (empirique) : 787 estimations valides du poids habillé d'un bœuf; médiane 1207 lb; poids réel 1198 lb (écart de 9 lb, soit 0,8 %); quartiles à +45 lb (3,7 %) et −29 lb (2,4 %) de la médiane; « erreur probable » d'une estimation isolée ½(45 + 29) = 37 lb (3,1 %). Wallis 2014 [R] : après correction d'erreurs, la **moyenne** coïncide exactement avec le poids réel.

### M3 — Identité de prédiction de la diversité [T, S]

Krogh et Vedelsby 1995 (Éq. 5–6 puis 10) : pour un ensemble de moyenne pondérée V̄ = Σ w_a V_a (poids positifs de somme 1), ambiguïté a(x) = Σ w_a (V_a − V̄)² et erreur quadratique e(x) = (f − V̄)² :

```
e(x) = ē(x) − a(x)           puis, moyenné sur la distribution des entrées : E = Ē − A
```

Page 2007 [S] la nomme « diversity prediction theorem » (erreur collective = erreur moyenne − diversité de prédiction). C'est une **identité algébrique** : elle n'établit ni qu'une équipe diverse est meilleure ni que la diversité en est la cause. Vérifiée numériquement : écart absolu maximal 5,7 × 10⁻¹⁴ sur 10³ tirages (`p8_check.py`), 5,7 × 10⁻¹³ sur 10⁴ tirages à la vérification indépendante (4.4).

### M4 — Hong et Page 2004 [T; Thompson 2014 T]

Emplacement : « A Computational Experiment », Table 1 (p. 16385–16386); « A Mathematical Theorem » (p. 16386–16388).

- Anneau de n = 2 000 positions, valeurs V uniformes sur [0 ; 100]. Agent = liste ordonnée (φ₁, …, φ_k) d'entiers distincts de {1..l}, k = 3, l = 12 (pool de 1 320) ou 20 (pool de 6 840). Recherche : à partir de i, on teste les décalages φ dans l'ordre cyclique; on avance si V augmente; arrêt après k contrôles sans amélioration. Performance d'un agent = valeur moyenne des points d'arrêt sur tous les départs. Équipe : les agents travaillent à tour de rôle jusqu'à stabilité.
- **Résultats publiés** (Table 1) [T] : l = 12, 20 agents : meilleurs 93,78, aléatoires 94,72; l = 20, 10 agents : meilleurs 93,52, aléatoires 96,08; 50 réplications. Diversité = fraction de positions de la liste qui diffèrent (Δ).
- **Théorème 1** : sous **quatre** hypothèses (agents « intelligents », problème difficile, diversité, meilleur agent unique), avec probabilité 1 il existe N₁ < N (énoncé de Hong et Page; Thompson 2014 le cite avec N ≥ N₁) tels que N₁ agents tirés indépendamment dépassent les N₁ meilleurs parmi N. **Critique (Thompson 2014, [T])** : énoncé faux sans V injective; une fois corrigé, il se réduit à « le groupe de tous les agents trouve toujours le maximum, pas k copies du meilleur »; N et N₁ doivent dépasser largement la taille du pool (copies illimitées); il n'a **aucun lien** avec l'expérience; l'expérience illustre le bénéfice de l'**aléa** : un groupe de diversité maximale fait moins bien que la médiane de 200 groupes aléatoires (p. 1028). Même conclusion : Grim et al. 2019 [R] (sensibilité à la rugosité du paysage), Romaniega 2023 [R].

### M5 — Chen et al. 2024 : vote et difficulté des requêtes [T]

Emplacement : §3 (Algorithmes 1–2), §4 (Définition 1, Lemme 1, Théorèmes 2 à 4, Table 1 des notations), §5 (Fig. 1 à 5).

- Notations : K = nombre d'appels; α = fraction de requêtes faciles; p₁ = probabilité qu'un appel soit correct sur une requête facile (p₁ > 1/2); p₂ sur une requête difficile (p₂ < 1/2); |A| = 2.
- Indicateur de difficulté (Lemme 1) : d_V(x) = max_{a≠y} Pr[G(x) = a] − Pr[G(x) = y]; requête difficile si d_V > 0.
- **Théorème 3** : F(K, x) = I_{(1−d_V(x))/2}((K+1)/2, (K+1)/2) (fonction bêta incomplète régularisée), soit exactement la majorité binomiale; F(K, D_{α,p1,p2}) = α·Maj_K(p₁) + (1−α)·Maj_K(p₂).
- **Théorème 4** : si p₁ + p₂ > 1 et α [inégalité de l'énoncé, voir ci-dessous], K* = 2 · log( α/(1−α) · (2p₁−1)/(1−2p₂) ) / log( p₂(1−p₂) / (p₁(1−p₁)) ), avec t = p₂(1−p₂)(½−p₂) / (p₁(1−p₁)(p₁−½)) + 1.
- **Correction par calcul exact** [I] : la condition du Théorème 4 (« α < 1 − 1/t », arXiv v2, p. 7; identique dans le camera-ready NeurIPS, copie NSF PAR [T]) est **inversée**, et la classification du Théorème 2 (p. 5–6) est contredite par le calcul (27 combinaisons sur 27 de la grille de la Fig. 5, en lisant la 2e puce « p₁ + p₂ < 1 **et** α ≤ 1 − 1/t »; avec « ou », comme imprimé, elle chevauche la 3e; contre-exemple plus bas). Pour p₁ + p₂ > 1, F(3) − F(1) = α p₁(1−p₁)(2p₁−1) − (1−α) p₂(1−p₂)(1−2p₂) ≥ 0 ⇔ α ≥ 1 − 1/t. Avec α > 1 − 1/t, la formule de K* est exacte à ±2 de l'optimum impair dans 79 cas sur 79 (un cas à α = 1 − 1/t exactement est exclu; 80 selon l'arrondi flottant); avec α < 1 − 1/t, l'optimum exact est K = 1 dans 60 cas sur 60 (la formule donne alors des valeurs négatives). Contre-exemple à « F croît monotonement si p₁ + p₂ > 1 et α ≥ 1 − 1/t » (Théorème 2) : (α, p₁, p₂) = (0,6 ; 0,85 ; 0,4) donne F(3) = 0,7043 > F(∞) = 0,6. Vérifié dans le camera-ready NeurIPS (copie NSF PAR) : Théorèmes 2 et 4 inchangés.
- Modèle d'échelle (§4.2) : G(K,x) = exp(−c₁(x)K − c₂(x)√K + c₃(x)) si d(x) > 0; 1 − exp(−c₁(x)K − c₂(x)√K + c₃(x)) si d(x) < 0; c₁ > 0 et c₂ > 0 (c₃ non contraint) ajustés sur un petit échantillon.
- Résultats empiriques (GPT-3.5-turbo-0125; 1 000 exécutions; MMLU Physique, TruthfulQA, GPQA, AVeriTeC) : performance non monotone (Fig. 1 et 4); Vote « facile » 53 % / « difficile » 47 % sur MMLU Physique (Fig. 2). Le coût des appels n'est pas modélisé (Conclusion).

### M6 — Li et al. 2024 (« Agent Forest ») [T]

- Algorithme 1 : N échantillons s_i = M(x); vote par similarité cumulée V(s_i) = Σ_{j≠i} sim(s_i, s_j) (fréquence d'occurrence pour les choix fermés, BLEU pour le code); A = argmax V. Taille d'ensemble jusqu'à 40, moyenne de 10 exécutions; avec Debate, taille limitée à 10.
- Modèles : Llama2-13B-Chat, Llama2-70B-Chat, GPT-3.5-Turbo, GPT-4 (seul). Tableau 2 (Seul → Ours, K = 40) : GSM8K 13B 0,35 ± 0,03 → 0,59; 70B 0,54 → 0,74; GPT-3.5 0,73 → 0,85; GPT-4 0,88. MATH 13B 0,03 → 0,09; 70B 0,05 → 0,11; GPT-3.5 0,29 → 0,39; GPT-4 0,40. MMLU 13B 0,42 → 0,51; 70B 0,55 → 0,60; GPT-3.5 0,59 → 0,70; GPT-4 0,77. HumanEval 13B 0,14 → 0,18; 70B 0,24 → 0,33; GPT-3.5 0,67 → 0,73; GPT-4 0,88. Chess 13B 0,14 → 0,18; GPT-4 0,65 (lecture du tableau extrait; alignement des lignes déduit de l'ordre des colonnes [I]).
- Gain relatif (Tableau 6) : GSM8K (facile) 69 / 37 / 16 % et MATH (difficile) 200 / 120 / 34 % pour 13B / 70B / GPT-3.5.
- Tâche synthétique d'isolation (§6.1) : trouver l'intervalle k tel que Σ a_i b_i ∈ k, avec a_i, b_i entiers dans [−I, I] (I = difficulté inhérente), S termes (étapes) et K intervalles équiprobables (probabilité a priori 1/K). **Propriété 1** : le gain relatif croît puis **décroît** avec I (maximal à I = 100 et 200; le texte parle d'un gain qui s'amenuise à I = 400, non d'un effondrement) [pas monotone en difficulté]; dans cette section, le « gain relatif » est défini comme une différence d'exactitudes; Propriété 2 : croît avec S; Propriété 3 : la performance absolue croît avec 1/K.
- Jetons (Tableau 5, GPT-3.5, un agent) : 235 ± 54 (GSM8K), 326 ± 131 (MATH), 495 ± 120 (HumanEval); le coût croît proportionnellement à K.
- **Pas d'appariement de budget** : 40 échantillons d'un 13 G contre un 70 G ≈ 520 contre 70 (milliards de paramètres × échantillons) soit ≈ 7,4 × [I].

### M7 — Kim et al. 2025a : lois d'échelle des systèmes d'agents [T]

- 260 configurations; 6 bancs agentiques (BrowseComp-Plus, Finance-Agent, PlanCraft, Workbench, SWE-bench Verified, Terminal-Bench); 5 architectures (agent unique, indépendant, centralisé, décentralisé, hybride); 3 familles de LLM; jetons de raisonnement totaux appariés (moyenne 4 800 par essai).
- Régression à effets mixtes (20 paramètres), R² validé croisé = 0,373 (0,413 avec une mesure de capacité ancrée dans la tâche). Terme « capacité plafond » : interaction de la précision de base SA avec log(1 + n_agents), β = −0,236 (p = 0,004); frontière de décision SA = 0,45 après dénormalisation; 94 % de concordance sur 16 couples modèle-banc (SWE-bench et Terminal-Bench, p < 0,001, test binomial).
- Amplification des erreurs (niveau de trace) : 17,2 × (indépendant), 7,8 × (décentralisé), 5,1 × (hybride), 4,4 × (centralisé). Surcoût de communication : 58 % (indépendant), 263 % (décentralisé), 285 % (centralisé), 515 % (hybride) par rapport à l'agent seul. Changement relatif : de +80,8 % (finance décomposable, centralisé) à −70,0 % (planification séquentielle, indépendant); décentralisé +9,2 % (navigation web dynamique); planification : −39 % à −70 % pour toute variante multi-agents.
- Prédiction : meilleure architecture identifiée pour 87 % des configurations retenues (contre 20 % au hasard).

### M8 — Théorie de la décision séquentielle (Marshall et al. 2009) [T partiel, S]

SPRT : minimise le temps de décision pour un taux d'erreur donné (lemme de Neyman-Pearson). Usher-McClelland linéarisé : dy_i/dt = I_i − w y_j − k y_i + cη_i (Éq. 4.1); quasi optimal si w = k, grands; modèle d'abeille à commutation directe avec k = 0 asymptotiquement optimal (§6.3, Fig. 5; Fig. 4 = schéma du modèle à commutation directe, Fig. 5 = temps de décision selon k, d'après les légendes lues sur PMC [S] et le dossier P5 [T]). Équations complètes : dossier P5, M5. Pour P8 : la colonie est bornée par le DDM/SPRT optimal d'un individu disposant des mêmes indices.

### M9 — List et al. 2009 : indépendance et interdépendance chez l'essaim [T]

Modèle à agents : 200 éclaireuses, 5 sites de qualités 3, 5, 7, 9, 10 (délibérément proches); fiabilité individuelle σ (0,2 haute; 1,0 basse); poids d'interdépendance λ (0 à 1); probabilité d'imitation sans inspection μ (0 à 1); 250 essais. Résultats : σ = 0,2 et λ = 0,8 : meilleur site choisi 246/250 (98,4 %, critère de consensus **fort**; 250/250, soit 100 %, au critère faible); σ = 1,0 (λ = 0,8) : 199/250 (79,6 %, critère fort; 237/250 au critère faible); λ = 0,5 : 104/250 (41,6 %, critère fort); λ = 0,2 : 11/250 (4,4 %, critère fort); μ = 1 (imitation pure) : la Fig. 8 est une simulation **illustrative** (cascade vers le deuxième plus mauvais site), non un taux sur 250 essais. Texte : l'extension de Condorcet à une interaction qui crée de la dépendance.

### M10 — Valeur de l'information sociale chez l'abeille [T, R]

- **I'Anson Price et al. 2019** [T]. Expériences : E1, 12 colonies (15 000–20 000 ouvrières), juin–août 2014; E2, 4 ruches d'observation (≈ 3 000 ouvrières), 2016; E3, 8 colonies, 2017 (contrôle verticales/lumière); Université de Lausanne (27,9 % bâti, 23,6 % agricole, 9,2 % bois, 39,3 % improductif). Danses désorientées par cadres horizontaux et filtres rouges : 58,5 % de danses désorientées (n = 74) contre 98,3 % de danses orientées (n = 67). Modèle à agents (modifié de Schürch et Grüter 2014) : stratégie « SI » (information sociale) contre « NI » (éclaireuses, sans information sociale); densité de parcelles 0,01 ou 0,1; âge moyen 5 ou 15 jours; molarité 0,5 M; rendement 25 µl; écart-type moyenne/10 ou moyenne/4; 18 jours; 10 répétitions par combinaison; variable : énergie totale récoltée.
- **Okada et al. 2014** [R] : simulation d'une journée de butinage; erreur angulaire de la danse de 10–15° en bordure inférieure des erreurs réelles; à 30° et plus, la danse n'est pas bénéfique; à 15°, bénéfique si les sources sont rares; à 10° et moins, bénéfique dans toutes les conditions testées; une précision de 0–5° maximise la découverte des sources connues mais fait échouer la découverte de nouvelles (stratégie risquée).
- **Beekman et Lew 2008** [R] : la danse paie quand la probabilité de découverte indépendante est faible (parcelles petites ou lointaines); son avantage principal est de ne butiner que les meilleures parcelles et d'exclure les concurrentes.
- **Tautz et al. 2004** [T] : l'« odomètre » dépend du contraste visuel : pente durée de danse/distance 3 à 4 fois plus faible sur l'eau que sur terre (p < 0,02); contraste moyen ≈ 20 % (terre) contre ≈ 9 % (eau); le seuil de contraste ≈ 20 % vient des études en tunnel citées par l'article, non de l'étude elle-même. Paramétrage utile d'un odomètre bruité (Esch et al. 2001 [R] : en tunnel étroit, distance exagérée). **Mise en garde** : une prépublication (Luebbert et Pachter 2024 [T]) conteste l'ensemble de la série d'articles sur l'odomètre de 1996 à 2010, dont Tautz et al. 2004 (R² = 0,9899) et Srinivasan et al. 2000; les auteurs visés ont répondu (Srinivasan et al. 2024 [R]; réponses de 2025 : Srinivasan 2025 et Stuart 2025 [M]). La controverse n'est pas tranchée : aucune valeur chiffrée de l'odomètre n'est retenue comme cible.
- **Dong et al. 2023** [R] : des abeilles sans suivi préalable de danses dansent avec plus de désordre et d'erreurs d'angle, et encodent la distance de façon fausse; l'angle s'améliore avec l'expérience, la distance reste « fixée pour la vie ».

### M11 — Grüter et al. 2011 (aucun modèle; plan et statistiques) [T]

*L. niger*; carrefour en T (tronc de 15 cm, branches de 11 cm); colonies sans reine de 700 à 1 500 ouvrières; Exp. 1 : 6 colonies, 0 à 4 visites; Exp. 2 : 8 colonies, 1, 5 ou 20 passages de piste; Exp. 3 : 7 colonies, 176 fourmis, quatre combinaisons; Exp. 4 : contrôle de la communication dans le nid; Exp. 5 : temps de décision. Statistiques : GLMM binomial avec la colonie en effet aléatoire; tests de Wald. Chiffres : T8.7.

### M12 — Feinerman et Korman 2017 : cadre conceptuel [T]

Deux sources de cognition collective : cognition individuelle et connectivité. Spectre en trois catégories : cognition collective **fondée sur l'individu** (amplification inconditionnelle ou conditionnelle; ex. alarme, piste), **combinaison de perspectives individuelles** (sondage par quorum, agrégation; « many eyes », « many wrongs »), **émergence** (transport coopératif, construction de nid). Hypothèse (§« Summary » du spectre) : les comportements collectifs fondés sur l'individu prévalent quand des capacités de type insecte solitaire suffisent; des solutions distribuées plus sophistiquées seraient complexes et difficiles à faire évoluer; **contraintes de calcul** : des marcheurs aléatoires sans communication partant d'un point d'une grille n'accélèrent presque pas le temps de couverture (Alon et al. 2011, cité). Ce sont des **hypothèses** de l'article, pas des résultats.

### M13 — Cinq sens de « difficile » [I, appuyé sur les sources]

| Code | Définition | Source | Effet observé du collectif |
|---|---|---|---|
| D1 | Discriminabilité : petite différence entre options; individu à p légèrement > 1/2, bruit non biaisé | Sasaki et al. 2013 | colonie > individu |
| D2 | Biais systématique : le mode de la réponse est faux (p_i < 1/2) | Chen et al. 2024 | vote nuit (la précision tend vers 0 sur ces requêtes) |
| D3 | Capacité relative : précision de l'agent unique | Kim et al. 2025a (seuil ≈ 45 %), Snell et al. 2024 (cinq niveaux de pass@1), Li et al. 2024 | coordination utile sous le seuil, nuisible au-dessus; calcul au test préférable sur faciles et intermédiaires |
| D4 | Structure et horizon : étapes séquentielles, dépendances | Kim et al. 2025a (−39 à −70 %), Li et al. 2024 (Propriété 2) | multi-agents nuisible en séquentiel; gain croît avec le nombre d'étapes sur tâche décomposable |
| D5 | Surcharge : nombre d'options à évaluer | Sasaki et Pratt 2012, Nicolis et al. 2011 | colonie robuste (≈ 90 % avec 2 ou 8 nids [S]); optimum de la rétroaction dépend du nombre d'options |

### M14 — Ce que « budget égal » veut dire dans les sources [T]

| Étude | Budget apparié ? |
|---|---|
| Sasaki et al. 2013 | Non : une fourmi contre 20 à 250 ouvrières |
| Li et al. 2024 | Non : K = 40 échantillons contre 1 (≈ 7,4 × en calcul pour 13 G contre 70 G) |
| Wang et al. 2024a (MoA) | Non : 6 propositeurs × 3 couches; analyse coût-qualité séparée (Fig. 5) |
| Hadfield et al. 2025 | Non : ≈ 15 × les jetons d'un dialogue (≈ 4 × pour un agent seul); le +90,2 % est mesuré contre un agent unique, soit ≈ 3,75 × ses jetons [I]; l'usage de jetons explique 80 % de la variance de BrowseComp |
| Kim et al. 2025a | Oui : jetons de raisonnement totaux appariés (moyenne 4 800) |
| Snell et al. 2024 | Oui : FLOPs appariés (modèle de 14 × plus de paramètres) |
| Kapoor et al. 2025 | Oui : coût en dollars, front de Pareto convexe |
| Chen et al. 2024 | Le coût n'est pas modélisé |

---

## 4. Résultats cibles et critères d'acceptation

Conventions : « runs » = répétitions indépendantes à graines différentes; IC = intervalle à 95 %. **Alignement relationnel** = signes et ordre des effets; **équivalence distributionnelle** = marge d'équivalence fixée d'avance. Une réplication de modèle n'est pas une validation contre les données (cadre §6.1). Les cibles marquées « P7 » exigent une API et sont différées.

### 4.1 Cibles de reproduction

| ID | Résultat publié (source, emplacement) | Grandeur mesurée | Critère d'acceptation |
|---|---|---|---|
| T8.1 | Seuils et asymptotes psychométriques : α_col 7,4 / α_ind 32,3 lux (P = 0,0047), puis 6,6 / 30,9 (P = 0,0020); asymptotes ≈ 0,80 (colonies) et ≈ 0,915 (individus); croisement ≈ 35–40 lux (Sasaki et al. 2013, Résultats, Fig. 2A) [T, I] | P(correct) selon la différence (7 niveaux), ajustement de l'Éq. 1 | Alignement relationnel et ordre de grandeur : P_col > P_ind aux deux plus faibles différences et P_col < P_ind aux deux plus fortes; rapport α_col/α_ind ∈ [0,10 ; 0,40] (publié 0,21 à 0,23); écart d'asymptotes ∈ [0,05 ; 0,20] (publié ≈ 0,12); 1 000 répétitions du protocole complet; les trois conditions requises |
| T8.2 | Modèle, Éq. 2–3 : courbes numérisées de la Fig. 3 (q_A = 0,20; c = 1,1; N = 100) [I, ±0,01; à confirmer]. Différence 5 / 10 / 20 / 40 / 60 / 80 / 99 % : individus 0,59 / 0,61 / 0,66 / 0,78 / 0,89 / 0,97 / 1,00; colonies 0,65 / 0,67 / 0,72 / 0,81 / 0,89 / 0,94 / 0,96; croisement à 58,5 % (≈ 59–60 % à la relecture indépendante, à l'œil) | P(choix du meilleur) par différence | \|P_sim − P_pub\| ≤ 0,03 aux 7 points, deux courbes; croisement 58,5 ± 5 %; ≥ 2 000 colonies et ≥ 20 000 individus par point (SE ≤ 0,011 et ≤ 0,0035). **Porte no-go** : ne pas coder avant lecture du SI (T, taux). Pré-test : l'Éq. 2 seule, avec alternance A/B simple, ne reproduit pas la courbe individuelle (écart jusqu'à 0,06 à 40 %, 4.4) |
| T8.3 | Condorcet indépendant : P_n(p) (Dietrich et Spiekermann 2021, §2.1) [T, I]. p = 0,6 : n = 3 → 0,6480; 11 → 0,7535; 101 → 0,9791; p = 0,51 : n = 1001 → 0,7366; p = 2/3 : n = 11 → 0,8779 | P(majorité correcte) | Implantation = formule à 10⁻¹²; Monte-Carlo (10⁶ tirages par point) à ≤ 3 erreurs-types (≈ 0,0015) |
| T8.4 | Condorcet corrélé (bêta-binomial) [I]. p = 0,6 : ρ = 0,05 → n = 101 : 0,795, limite 0,8145; ρ = 0,1 → 0,728, limite 0,736; ρ = 0,2 → 0,670, limite 0,672 | P(majorité), limite n → ∞ | \|MC − exact\| ≤ 0,002 (10⁶ tirages); limite par n = 10⁴ à ≤ 0,005 de l'intégrale; la valeur ρ = 0 doit retrouver T8.3 |
| T8.5 | Identité de prédiction de la diversité (Krogh et Vedelsby 1995, Éq. 6 et 10; Page 2007) [T] | (c − θ)² contre moyenne(s_i − θ)² − moyenne(s_i − c)² | Écart **absolu** ≤ 10⁻¹² sur 10⁴ tirages (ne pas retenir un critère relatif seul : il peut atteindre 1,8 × 10⁻⁹ sans bogue quand (c − θ)² ≈ 0; écart absolu obtenu : 5,7 × 10⁻¹⁴ sur 10³ tirages avec `p8_check.py`, 5,7 × 10⁻¹³ sur 10⁴ tirages à la vérification indépendante, 4.4) |
| T8.6 | Hong et Page 2004, Table 1 : l = 12, 20 agents : 93,78 (meilleurs) contre 94,72 (aléatoires); l = 20, 10 agents : 93,52 contre 96,08; 50 réplications [T]. Ma réplication (24 fonctions) : 93,56 contre 94,55 et 93,64 contre 95,90 [I] | Valeur moyenne d'équipe | Aléatoires − meilleurs ≥ +0,5 (l = 12) et ≥ +1,0 (l = 20), moyenne sur ≥ 50 fonctions; aléatoires dans 94,72 ± 0,5 et 96,08 ± 0,5; test des signes p < 0,01. **Test complémentaire** (Thompson 2014, p. 1028) : une équipe de diversité Δ maximale < médiane de 200 équipes aléatoires |
| T8.7 | Grüter et al. 2011 (Fig. 2–3, Résultats) [T]. Visites 0 / 1 / 2 / 3 / 4 : 50,5 % (N = 98) / 74,6 % (71) / 86,7 % (45) / 95,3 % (43) / 94,1 % (34) (le texte écrit 52 % pour les fourmis naïves; 50,5 % lu sur la Fig. 2a [I]); piste seule 1 / 5 / 20 passages : 62 % (125) / 64,6 % (178) / 70,2 % (208); conflit : 3 visites contre piste forte 100 % (34), contre piste faible 94,2 % (49); 1 visite contre piste forte 82 % (41), contre piste faible 87,2 % (34); contrôle (Exp. 4) 90,5 % (19/21); temps de décision médian 5,9 s (conflit) contre 5,7 s (sans piste) (z = −0,6, p = 0,55) | Proportion choisissant la branche mémorisée (ou marquée) | Agent fourrageur à poids mémoire w_p(visites) et poids social w_s(passages) : chaque proportion dans l'IC de Wilson à 95 % de la valeur publiée avec le N publié; 10 000 agents par cellule; pas d'effet de la force de piste sur le conflit (p > 0,05) |
| T8.8 | I'Anson Price et al. 2019, modèle à agents (Résultats « model »; Fig. 4) [T] : habitat éphémère (5 j), densité 0,1, forte variation (écart-type = moyenne/4) : éclaireuses +22,59 ± 11,1 % d'énergie; densité 0,01 : éclaireuses à 12,9 ± 20,8 % de l'énergie des danseuses; habitat persistant (15 j), densité 0,1 : +17,5 ± 9,7 %; densité 0,01 : 18,96 ± 16,7 % (forte variation) et 24,88 ± 43,6 % (faible variation); empirique : perte de poids −0,134 (orientées) contre −0,101 kg/j (désorientées), χ² = 24,22, p < 0,0001 | ΔE = E_danse − E_éclaireuses; signe par cellule | Alignement relationnel : signe de ΔE conforme dans ≥ 7 des 8 cellules (faible densité : danse gagne; haute densité : éclaireuses gagnent) [à confirmer : le texte ne chiffre que 5 des 8 cellules; le signe des 3 autres ne vient que de la discussion et de la Fig. 4, non lue en image]; ≥ 100 répétitions par cellule (publié : 10). **Code de Schürch et Grüter 2014 non lu** : modèle à réécrire |
| T8.9 | Okada et al. 2014 [R] : erreur ≥ 30° : danse non bénéfique; 15° : bénéfique si sources rares; ≤ 10° : bénéfique partout; 0–5° : succès aux sources connues, échecs aux nouvelles | Signe de ΔE selon l'erreur (0, 5, 10, 15, 30, 45°) × habitat (rare, abondant) | Relationnel : signes conformes sur ≥ 5 des 6 erreurs en habitat rare et sur l'ordre des seuils; ≥ 200 répétitions. Paramètres du modèle non lus (texte intégral requis) |
| T8.10 | Chen et al. 2024, Théorème 3 et Fig. 5 [T, I] : F(K; α, p₁, p₂). (0,5 ; 0,85 ; 0,4) : F(1) = 0,625; F(3) = 0,6456; F(5) = 0,6454; F(21) = 0,5872; F(201) = 0,501; K* = 3. (0,6 ; 0,85 ; 0,4) : F(1) = 0,670; K* = 5, F = 0,711; F(201) = 0,6008. (0,4 ; 0,85 ; 0,1) : F(1) = 0,400; F(3) = 0,3925; creux puis retour à 0,400 | F(K) exact et K* | Monte-Carlo (10⁵ requêtes) à ≤ 3 erreurs-types de l'exact; K* simulé = K* exact; formule du Théorème 4 à ±2 de K* **si α > 1 − 1/t** |
| T8.11 (P7) | Li et al. 2024, Tableaux 2 et 6 [T] : Llama2-13B, GSM8K 0,35 ± 0,03 → 0,59 (K = 40, 10 exécutions); gains relatifs GSM8K 69 / 37 / 16 %, MATH 200 / 120 / 34 % | Précision selon K; gain relatif | Les modèles de 2023 ne sont plus disponibles à l'identique : alignement relationnel. (i) précision croissante jusqu'à K = 40 sur GSM8K pour un modèle faible, ≥ +10 points; (ii) gain relatif MATH > GSM8K pour chaque modèle; (iii) gain relatif décroissant avec la capacité. ≥ 10 exécutions; budget à rapporter en jetons |
| T8.12 (P7) | Kim et al. 2025a [T] : seuil ≈ 0,45; β = −0,236 (p = 0,004); amplification d'erreur 17,2 × (indépendant) contre 4,4 × (centralisé) | Pente de ΔP selon p_SAS; amplification | Pente négative (IC excluant 0) sur ≥ 6 tâches et ≥ 60 configurations; zéro de ΔP dans [0,35 ; 0,55]; rapport d'amplification indépendant/centralisé ≥ 2 |
| T8.13 (P7) | Kapoor et al. 2025, Tableau A1 (HumanEval, 164 tâches, 5 exécutions) [T] : GPT-4 seul 89,6 % (87,8–90,9) à 1,93 $; « warming » 93,2 % (92,1–93,9) à 2,45 $; « retry » 92,0 % à 2,51 $; escalade 85,0 % à 0,27 $; LATS (GPT-4) 88,0 % à 134,50 $; LDB (GPT-4) 93,3 % à 6,36 $; Reflexion 87,8 % à 3,90 $ | Précision et coût; front de Pareto convexe | Reproduire le **plan** (retry, warming, escalade + front) et non les nombres (modèles retirés) : aucun agent complexe ne domine strictement « warming » sur le front, avec 5 exécutions et IC rapportés |
| T8.14 | Galton 1907 [T] : N = 787; médiane 1207 lb contre 1198 lb (0,8 %); erreur probable individuelle 37 lb (3,1 %); quartiles +45 / −29 lb | Erreur de la médiane et de la moyenne contre erreur individuelle | Simulateur d'estimations à deux pièces calibré sur les quartiles : médiane de 787 estimations à ≤ 1 % du vrai, erreur probable individuelle 37 ± 3 lb, 1 000 répétitions (garde-fou pédagogique) |
| T8.15 | Dong et al. 2023 [R] : apprentissage social requis; distance « fixée pour la vie » | Désordre et erreurs d'encodage selon l'exposition | Non chiffrée en l'état (texte intégral de Dong requis); relationnel : un modèle d'encodage appris sans exposition produit plus de désordre et une distance biaisée persistante. Odomètre : **aucune cible chiffrée retenue** (controverse, M10) |

### 4.2 Hypothèses directionnelles falsifiables pour QR1

QR1 : à quelle difficulté de tâche un collectif de règles simples dépasse-t-il un individu fort? Définitions de travail : « individu fort » = un agent traitant seul toute la tâche avec le budget B; « collectif » = N agents à règles locales, budget total B; difficulté = D1 à D5 (M13), toujours déclarée.

| ID | Énoncé (direction) | Effet minimal | Critère de réfutation |
|---|---|---|---|
| H8.1 | Dans le modèle de Sasaki (Éq. 2–3, c = 1,1, N = 100), P_col − P_ind > 0 aux petites différences et < 0 aux grandes, avec **un seul** croisement d* ∈ [50 ; 70] % | ΔP ≥ +0,04 pour d ≤ 20 % et ≤ −0,02 pour d ≥ 80 % (publié : +0,06 et −0,03 à −0,04 [I]) | Aucun changement de signe sur d ∈ [5 ; 99] %, ou d* hors [40 ; 80] %, avec ≥ 2 000 colonies et ≥ 20 000 individus par d |
| H8.2 | Le déficit colonial aux grandes différences vient de la rétroaction positive : ΔP(d = 90 %) décroît monotonement quand c passe de 0 à 2 et vaut ≥ −0,01 à c = 0 (la colonie se réduit alors à un vote d'individus indépendants, donc ≥ 0 par Condorcet) | ΔP(90 %) à c = 2 ≤ −0,03 | ΔP(90 %) ≤ −0,02 à c = 0 (déficit sans rétroaction), ou non-monotonie |
| H8.3 | **Agrégation contre interaction** (cadre §4) : à N = 7 votants, le vote de N individus indépendants du modèle de l'Éq. 2 bat la colonie à quorum : G_int = P_col − P_vote(7) ≤ −0,03 à tout d ∈ [5 ; 99] % (attendu −0,04 à −0,14 d'après la Fig. 3 numérisée; n_eff = 3 à 5 [I]) | \|G_int\| ≥ 0,03 | G_int ≥ −0,01 pour un d quelconque à N = 7 (le quorum apporterait alors de l'information au-delà du vote). Dépend de T8.2 |
| H8.4 | Pour des agents faibles, le gain du vote de K = 5 appels est > 0 pour les items à p̂_i ∈ (0,5 ; 0,9) et < 0 pour p̂_i < 0,5 (Chen et al. 2024) | Gain moyen ≥ +0,03 pour p̂ ∈ (0,5 ; 0,9); ≤ −0,02 pour p̂ < 0,5 | Gain moyen < +0,01 pour p̂ ∈ (0,5 ; 0,9) (échantillons non conditionnellement indépendants) ou gain ≥ 0 pour p̂ < 0,5; ≥ 500 items stratifiés, p̂ estimé sur 20 échantillons distincts de ceux du vote |
| H8.5 | **Faible contre fort à budget égal** : avec K = rapport de coût, le jury de K agents faibles bat l'agent fort ssi Maj_K(p_w) > p_s au niveau de l'item; le gain ΔP est en **U inversé** selon la précision moyenne de l'agent faible : nul ou négatif pour p_w < 0,5, maximal pour p_w ∈ [0,55 ; 0,75], nul quand p_s → 1 | max ΔP ≥ +0,03 pour au moins une paire (faible, fort) avec K ≥ 5 | ΔP ≤ +0,01 pour toutes les paires et tous les K ≤ 20, ou ΔP monotone en p_w |
| H8.6 | **Seuil de coordination** : à jetons égaux, ΔP = P_MAS − P_SAS décroît avec la précision de base p_SAS; ΔP = 0 pour p_SAS ∈ [0,35 ; 0,55] (publié 0,45) | \|ΔP\| ≥ 0,05 aux extrémités de la plage de p_SAS observée | Pente ≥ 0 ou IC 95 % contenant 0 sur ≥ 60 configurations et ≥ 6 tâches |
| H8.7 | **Interaction sans gain pour des agents homogènes** : P_débat − P_vote ∈ [−0,02 ; +0,02] à jetons égaux (martingale; Choi et al. 2025) | — | ≥ +0,03 (IC excluant 0) sur ≥ 3 tâches, ou ≤ −0,03 (conformité nuisible) |
| H8.8 | **Qualité contre diversité** : à budget égal, N échantillons du meilleur modèle battent un mélange de N modèles dont l'écart de qualité moyen est ≥ 10 points (Li et al. 2025 : +6,6 points sur AlpacaEval 2.0, +3,8 en moyenne) | ≥ +2 points | Mélange ≥ auto-ensemble − 1 point sur ≥ 3 bancs |
| H8.9 | **Valeur conditionnelle de l'information sociale (abeille)** : ΔE = E_danse − E_éclaireuses < 0 à densité 0,1 et > 0 à densité 0,01 | \|ΔE\| ≥ 10 % de l'énergie du bras de référence aux deux extrémités | Même signe dans les 8 cellules, ou signe inversé; ≥ 100 répétitions |

### 4.3 Expériences originales proposées (après les reproductions)

- **E8.1** Carte (p_w, ρ, K) du jury à coût égal dans le modèle bêta-binomial : frontière G = 0 (déterministe) et sa sensibilité à la corrélation; teste la réconciliation D1/D2.
- **E8.2** n_eff(d ; c, T) : nombre de votants indépendants équivalents à la colonie, après T8.2.
- **E8.3** Information privée contre sociale en environnement dynamique : agent à poids (w_p, w_s) calibré sur T8.7, avec inversion de qualité; latence d'adaptation (lien avec P1).
- **E8.4** Valeur de la danse : grille densité × durée de vie × erreur angulaire (T8.8 et T8.9), cartographiée en ΔE.
- **E8.5** (P7) H8.4 à H8.8 avec témoin orchestré (QR3), jetons égaux, modèles ouverts. Contrainte [I] : aux tarifs relevés par l'audit méthodologique et confirmés sur la page des tarifs de l'API Claude le 2026-10-01 [T] (1 / 2 / 4 $ par million de jetons d'entrée, 5 / 10 / 20 $ en sortie, pour Haiku 4.5 / Sonnet 5.5 / Opus 5.5), le budget égal ne permet que K = 2 ou 4 appels faibles par appel fort; avec p = 0,6, K = 3 ne gagne que +4,8 points (0,648). Une « colonie » de N ≥ 10 exige des modèles à poids ouverts.

### 4.4 Pré-tests numériques (exploratoire)

Script : `recherche/verifications-numeriques/p8_check.py` (Python 3 + numpy, sans scipy). `python p8_check.py` : moins d'une seconde; `python p8_check.py hp` : 24 fonctions de Hong et Page, ≈ 3 min. Parties : condorcet, chen, chen_tables, chen_thm4, diversity, sasaki, neff, hp. Résultats [I] :

- **Condorcet** : valeurs de T8.3. Le dossier P5 cite 3,33 % d'erreur de majorité pour 40 votants d'erreur 1/3 (Sumpter et Pratt 2009, §4(d) : le chiffre figure bien dans le texte [T], vérification indépendante). Le calcul exact donne **0,96 %** (majorité d'erreurs stricte, ≥ 21 erreurs), **2,14 %** (égalité 20–20 comptée comme erreur) ou **1,55 %** (égalité tranchée au hasard); aucun ne donne 3,33 % : le chiffre publié ne se reproduit pas par calcul exact.
- **Corrélation** : valeurs de T8.4 (p = 0,6, ρ = 0,1 : limite 0,736).
- **Diversité** : identité vérifiée (écart absolu maximal 5,7 × 10⁻¹⁴ sur 10³ tirages; 5,7 × 10⁻¹³ sur 10⁴ tirages à la vérification indépendante).
- **Chen et al.** : la classification du Théorème 2 telle qu'imprimée est contredite par le calcul exact pour 27 combinaisons sur 27 de la grille de la Fig. 5 (α ∈ {0,4 ; 0,5 ; 0,6}, p₁ ∈ {0,85 ; 0,75 ; 0,65}, p₂ ∈ {0,4 ; 0,3 ; 0,1}), en lisant la 2e puce « p₁ + p₂ < 1 **et** α ≤ 1 − 1/t » (avec « ou », comme imprimé, elle chevauche la 3e); formule de K* du Théorème 4 à ±2 de l'optimum exact dans 79 cas sur 79 quand α > 1 − 1/t (un cas à α = 1 − 1/t exactement est exclu; 80 selon l'arrondi flottant), et optimum exact K = 1 dans 60 cas sur 60 quand α < 1 − 1/t (grille de `chen_thm4` : p₁ ∈ {0,6 ; 0,7 ; 0,8 ; 0,85 ; 0,9}, p₂ ∈ {0,1 ; 0,2 ; 0,3 ; 0,4 ; 0,45}, α de 0,05 à 0,9, p₁ + p₂ > 1, K impair jusqu'à 801).
- **Sasaki, individu (Éq. 2)** : chaîne alternée A/B, départ équiprobable, i = indice de visite : 5 % → 0,545; 20 % → 0,691; 40 % → 0,837; 60 % → 0,923; 80 % → 0,972; 99,5 % → 0,999, contre 0,59 / 0,66 / 0,78 / 0,89 / 0,97 / 1,00 (Fig. 3). Écart jusqu'à 0,06 (courbe trop plate à 5 %, trop raide à 40 %) : la structure de la chaîne (taux, nombre de comparaisons par décision) est dans le SI et ne se devine pas.
- **Numérisation de la Fig. 3** (axes calibrés sur les graduations, x : 6,81 px par %) puis **G du cadre** et **n_eff** (plus petit n impair tel que Maj_n(P_ind) ≥ P_col) [valeurs numérisées à confirmer au ±0,01 : relues à l'œil seulement par la vérification indépendante] :

| d (%) | P_ind | P_col | ΔP | G = (P_col − P_ind)/(1 − P_ind) | n_eff |
|---|---|---|---|---|---|
| 5 | 0,590 | 0,651 | +0,061 | +0,149 | 5 |
| 10 | 0,610 | 0,673 | +0,063 | +0,162 | 5 |
| 20 | 0,661 | 0,720 | +0,059 | +0,174 | 3 |
| 40 | 0,778 | 0,813 | +0,035 | +0,158 | 3 |
| 50 | 0,839 | 0,855 | +0,016 | +0,099 | 3 |
| 60 | 0,894 | 0,890 | −0,004 | −0,038 | — |
| 80 | 0,972 | 0,940 | −0,032 | −1,143 | — |
| 90 | 0,993 | 0,953 | −0,040 | −5,714 | — |
| 99 | 1,000 | 0,957 | −0,043 | indéfini | — |

  Un jury de 101 individus indépendants atteindrait 0,966 à d = 5 % et 1,000 à d ≥ 20 %. Gain d'interaction contre un jury de 7 : G_int = −0,04 (5 %), −0,10 (20 %), −0,14 (40 %), −0,11 (60 %), −0,06 (80 %), −0,043 (99 %).
- **Hong et Page** (24 fonctions aléatoires; n = 2 000, k = 3) : l = 12, équipes de 20 : meilleurs 93,56 (σ entre fonctions 0,84), aléatoires 94,55 (0,52), écart +0,99 ± 0,64, aléatoires > meilleurs dans 23/24; l = 20, équipes de 10 : 93,64 contre 95,90, écart +2,26 ± 0,82, 24/24.

Laissé de côté : modèle de colonie de Sasaki (SI), modèles à agents d'abeille (code), agent fourrageur de Grüter, simulations LLM (API), modèle d'Okada.

---

## 5. Visuels de vulgarisation

Statuts épistémiques entre crochets (cadre §6.7). Public principal : grand public et étudiants, sauf mention.

1. **Courbes qui se croisent** (fourmi) : P(correct) selon la différence de qualité pour une fourmi isolée et pour une colonie (Fig. 3 de Sasaki, T8.2), curseurs c et T; zone grisée « la colonie plafonne à ≈ 0,96 ». Variante Voir : le nid « sombre contre un peu moins sombre ». [Modèle simplifié]
2. **« Combien de fourmis indépendantes vaut la colonie? »** : barre n_eff(d) (3 à 5) à côté du jury de 100 (0,97 à 5 %). Message honnête : l'interaction ajoute peu à l'agrégation. [Hypothèse de l'auteur, E8.2]
3. **Jury de Condorcet interactif** : curseurs p, n, ρ; carte de chaleur de la fiabilité; la ligne de **plafond** (0,736 pour p = 0,6, ρ = 0,1) apparaît quand on monte ρ. [Résultat reproduit (théorie)]
4. **Galton à 787 voix** : nuage d'estimations (médiane 1207 lb, réel 1198 lb, erreur probable 37 lb); bouton « chacun voit la moyenne » qui rétrécit la dispersion (Lorenz et al. 2011 [R] : l'influence sociale rétrécit la diversité des opinions et érode l'effet). [Résultat reproduit + Analogie]
5. **Équipe des meilleurs contre équipe au hasard** (anneau de 2 000 positions, 3 chiffres par agent) : on voit 93,6 contre 95,9; encart « ce n'est pas la diversité : c'est l'aléa » (Thompson 2014). [Résultat reproduit; limite signalée]
6. **Identité de la diversité** : trois estimations, une moyenne; barres « erreur moyenne », « diversité », « erreur du groupe » qui s'additionnent exactement. [Résultat reproduit (identité)]
7. **Le carrefour en T** (*L. niger*) : une fourmi arrive; 0, 1 ou 3 visites antérieures; barres 50,5 / 74,6 / 95,3 % contre piste seule 62–70 %; mode conflit (82 à 100 % suivent la mémoire). Niveau Explorer : curseurs w_p et w_s. [Résultat reproduit (T8.7)]
8. **La danse, utile ou non?** : carte densité de ressources × durée de vie des sources, avec zones « la danse aide » / « l'éclaireuse seule suffit » (I'Anson Price et al. 2019, Beekman et Lew 2008, Okada et al. 2014) et curseur d'erreur angulaire (0° à 45°). Encart « Lausanne, un habitat tempéré pauvre : −0,101 contre −0,134 kg/j ». [Modèle simplifié + Résultat empirique]
9. **Courbe en U inversé du vote** (agents) : précision en fonction de K pour un mélange de requêtes faciles et difficiles (curseurs α, p₁, p₂; K* marqué), reproduction de Chen et al. 2024 (Fig. 5). [Résultat reproduit (T8.10)]
10. **Seuil de coordination à ≈ 45 %** : points (précision de l'agent seul, gain du collectif à jetons égaux) avec la droite qui coupe zéro (Kim et al. 2025a). Niveau Vérifier. Public : praticiens. [Résultat publié, non reproduit]
11. **Front de Pareto coût–précision** (HumanEval) : LATS à 134,50 $ contre « warming » à 2,45 $ (Kapoor et al. 2025). Public : praticiens. [Résultat publié, non reproduit]
12. **Quatre cartes de la difficulté** (D1 à D5, M13) : une page « quand un groupe aide-t-il? » qui explique pourquoi les résultats semblent se contredire. [Hypothèse de l'auteur]

Évaluation (V0) : pré-test et post-test sur « le groupe est-il toujours plus sage? » (concept erroné à corriger : la foule n'est sage que si les erreurs sont indépendantes et la tâche bien calibrée).

---

## 6. Parallèles agentiques appuyés par des sources

Chaque parallèle sépare ce que dit la source de ce qui est inféré.

1. **Le collectif aide sur le difficile, mais « difficile » doit être défini.** Source : Sasaki et al. 2013 (D1); Chen et al. 2024 (D2 : le vote nuit si p < 1/2); Kim et al. 2025a (D3 : coordination utile sous ≈ 45 %); Snell et al. 2024 (calcul au test préférable sur faciles et intermédiaires, pré-entraînement sur les plus difficiles à FLOPs appariés); Li et al. 2024 (gain non monotone en I). Inférence [I] : la précision item par item de l'agent seul et la corrélation des erreurs décident; à tester en E8.1.
2. **Verrouillage par rétroaction positive.** Source : Sasaki et al. 2013 (le même quorum qui sert les tâches difficiles verrouille un choix inférieur sur les tâches faciles), Nicolis et al. 2011 (l'optimum de la force de rétroaction dépend du nombre d'options), Choi et al. 2025 (le débat est une martingale; le vote explique l'essentiel du gain), Weng et al. 2025 (conformité, dossier P5), Lorenz et al. 2011 (l'influence sociale érode la sagesse). Inférence : un agrégateur à seuil sans vérification indépendante amplifie l'erreur commune; List et al. 2009 (indépendance avant interdépendance : l'imitation pure μ = 1 échoue dans une simulation illustrative, non dans un taux sur 250 essais) suggère d'exiger une inspection propre avant tout endossement.
3. **Individu riche + collectif : amplifier, sonder, affiner.** Source : Feinerman et Korman 2017 (le groupe amplifie, moyenne, sonde et affine les actions d'individus capables). Appui agentique : Hadfield et al. 2025 (billet d'Anthropic; orchestrateur et sous-agents : +90,2 % sur l'évaluation interne contre un agent unique; les systèmes multi-agents consomment ≈ 15 × les jetons d'un dialogue et un agent seul ≈ 4 ×, soit ≈ 3,75 × relativement à l'agent unique [I]; l'usage de jetons explique 80 % de la variance de BrowseComp); Kim et al. 2025a (la vérification centralisée contient l'amplification d'erreurs : 4,4 × contre 17,2 × en indépendant). Inférence : l'orchestrateur joue le rôle de l'amplificateur conditionnel; ce n'est pas de la « chorégraphie » (typologie du cadre §2.2).
4. **Information privée contre sociale.** Source : Grüter et al. 2011 (mémoire > piste : 95,3 % contre 62–70 %), Grüter et al. 2008 (93 % de l'information privée devant une danse), I'Anson Price et al. 2019 (des abeilles exposées à des danses non informatives en suivent moins : 20 % de suiveuses en moins en fin d'essai), Grüter et al. 2010 [non vérifiée] (copier quand c'est incertain : attribution non retrouvée dans le résumé), Czaczkes et al. 2015 (phéromone et mémoire complémentaires). Inférence : un agent devrait **apprendre la fiabilité du canal partagé** (poids adaptatif) et protéger son contexte propre contre l'écrasement par l'état partagé; à tester en E8.3.
5. **Évaluer en parallèle plutôt que comparer.** Source : Sasaki et al. 2018 (les fourmis isolées suivent un modèle de comparaison directe, « Tug of War »; les colonies un choix séquentiel où l'action suit le premier critère atteint); Robinson et al. 2011 (un simple seuil individuel suffit; pas de comparaison de nids). Inférence : N plans évalués indépendamment avec un critère d'acceptation (best-of-N avec vérificateur) plutôt qu'un agent qui compare tout.
6. **Surcharge cognitive.** Source : Sasaki et Pratt 2012 (individus moins précis à 8 options qu'à 2; colonies ≈ 90 % dans les deux cas [S]); Hadfield et al. 2025 (sous-agents aux fenêtres de contexte séparées). Inférence : répartir l'inspection de nombreuses options entre sous-agents, chacun n'en voyant qu'un petit sous-ensemble.
7. **Budget égal d'abord.** Source : Kapoor et al. 2025, Kim et al. 2025a, Snell et al. 2024, Brown et al. 2024 (la couverture croît log-linéairement avec les échantillons; le vote plafonne sans vérificateur), Wu et al. 2024 (petit modèle plus algorithme avancé peut battre un grand modèle à calcul égal). Inférence : toute mesure de G (cadre §4) rapporte jetons et appels; sans cela, l'effet de budget et l'effet de coordination se confondent.
8. **Corrélation des erreurs, qualité et diversité.** Source : Kim et al. 2025b (accord de 60 % quand deux modèles se trompent), Chen 2026 (précision ≤ 1 − β; β observé 0,052 contre 0,023 prédit), Li et al. 2025 (Self-MoA > MoA de +6,6 points), Douven 2026 (la contamination par la date de coupure gonfle l'écart de capacité), Schoenegger et al. 2024 (12 LLM rivalisent avec 925 humains sur 31 questions [R]). Inférence : la « diversité » d'une population LLM est plafonnée; la sagesse des foules n'est pas transférable sans mesure de la corrélation.
9. **Apprentissage social du protocole.** Source : Dong et al. 2023 (la danse correcte exige un apprentissage social; la distance reste mal encodée si l'exposition manque). Inférence faible [I] : un agent qui apprend un format de message par exposition à des pairs peut hériter de leurs biais; hypothèse de l'auteur.

---

## 7. Corrections au cadre et à la v3

1. **Cadre §2.3 (taxons)** : « Tandem et quorum : *T. albipennis* ». Sasaki et al. 2013 (et Sasaki et al. 2018) utilisent ***T. rugatulus***; Pratt et Sumpter 2006, *T. curvispinosus* (lecture du dossier P5 [T]). Le préréglage de P8 doit nommer *T. rugatulus*.
2. **Texte de portée** : « Sasaki, Mann et Pratt 2013 ». La référence est de **Sasaki, Granovskiy, Mann, Sumpter et Pratt**; citer « Sasaki et al. 2013 ».
3. **Cadre QR1 et §4 (« à budget égal »)** : Sasaki et al. 2013 compare une fourmi à une colonie de 20 à 250 ouvrières; le résultat ne porte donc pas sur un budget égal. L'individu n'y est pas un agent « fort » mais une ouvrière présélectionnée (qui rapporte du couvain) qui fait toute la tâche seule. La formulation « individu fort » exige la définition de travail de 4.2.
4. **Cadre §4 (G = (P_coll − P_ref)/(P_max − P_ref))** : G est **indéfini quand P_ref = P_max** et explose près du plafond : −1,14 à d = 80 % et −5,7 à 90 %, indéfini à 99 % sur la Fig. 3 numérisée [I]. Recommandation : rapporter ΔP et son IC, plus n_eff ou la différence en log-cote (psychophysique), et ne calculer G que si P_ref ≤ 0,9.
5. **« La colonie ne bat l'individu que si la tâche est difficile »** : vrai pour *T. rugatulus* sur la luminosité, avec nuances chiffrées : avantage colonial jusqu'à ≈ 35–40 lux (≈ 58 % de différence de qualité dans le modèle), asymptote coloniale ≈ 0,80 sous l'individuelle ≈ 0,92, effet de taille de colonie non significatif.
6. **Feinerman et Korman 2017** : la phrase « la précision de la décision croît avec la taille du groupe (Sasaki et al. 2013) » surinterprète l'article cité, où l'effet de taille est non significatif [T, confirmé à la vérification indépendante; effet de taille non significatif, SI Fig. S2].
7. **Hong et Page 2004** : ne pas citer comme preuve que « la diversité l'emporte sur la capacité ». L'expérience se reproduit (T8.6), le théorème est trivial et sans lien avec l'expérience, et la cause de l'avantage n'est pas la « diversité » (Thompson 2014; Grim et al. 2019; Romaniega 2023).
8. **Condorcet** : le théorème exige indépendance et p > 1/2; avec causes communes, la limite est < 1 (Dietrich et Spiekermann 2013). Ne jamais écrire « la foule converge vers la vérité » sans cette condition.
9. **Dossier P5** : « Condorcet, 40 votants, erreur 1/3 : 3,33 % » ne se reproduit pas (0,96 / 2,14 / 1,55 %, 4.4), bien que le chiffre figure dans Sumpter et Pratt 2009, §4(d) [T].
10. **Chen et al. 2024** : titre v1 « LLM calls / scaling laws of compound inference systems »; titre de la fiche NeurIPS « LLM calls / scaling properties of compound AI systems » (le PDF camera-ready écrit « LM calls »); au Théorème 4 de l'arXiv v2 (idem dans le camera-ready NeurIPS), l'inégalité sur α est inversée, et la classification du Théorème 2 est contredite par le calcul exact (4.4).
11. **Li et al. 2024** : le titre promet « more agents »; le dispositif est un **vote indépendant sans communication** (référence « agents indépendants sans canal » du cadre), pas une colonie; la phrase « un petit modèle bat un grand » n'est pas à calcul égal (≈ 7,4 ×); le gain n'est pas monotone en difficulté (Propriété 1).
12. **Mixture-of-Agents** : le résumé (arXiv v1) donne 65,1 % contre 57,5 % (GPT-4 Omni); l'introduction donne 65,8 %; le Tableau 2 donne 65,1 ± 0,6 (MoA) et 65,7 ± 0,7 (avec GPT-4o final). Self-MoA contredit l'idée que mélanger des modèles aide (+6,6 points pour l'auto-ensemble).
13. **Hadfield et al. 2025** : « +90,2 % » compare un système multi-agent à un agent unique; le rapport de ≈ 15 × les jetons est relatif à un dialogue (≈ 4 × pour un agent seul), soit ≈ 3,75 × relativement à l'agent unique [I]; l'usage de jetons explique 80 % de la variance de BrowseComp. Ce n'est pas un résultat à budget égal.
14. **Menzel et al. 2005** (« carte cognitive ») : la conclusion reste débattue. Cheeseman et al. 2014 (décalage de l'horloge solaire par anesthésie) concluent à une carte métrique; Cheung et al. 2014 y répondent (« Still no convincing evidence… », [M]). Étiqueter « débattu » dans tout visuel.
15. **Odomètre de l'abeille (Esch et al. 2001, Tautz et al. 2004, Srinivasan et al. 2000)** : l'idée d'un odomètre à flux optique est ancienne et corroborée par plusieurs études, mais les valeurs de calibration publiées sont contestées (Luebbert et Pachter 2024, prépublication; réponse de Srinivasan et al. 2024). Toute valeur de pente ou de « degrés par milliseconde » est marquée « contestée » dans les visuels et n'est pas une cible.
16. **I'Anson Price et al. 2019** : résultat propre à un habitat tempéré pauvre (Lausanne, 3 expériences; nectar de concentration moyenne ≈ 21 %); les auteurs jugent la danse probablement utile au printemps. Ne pas écrire « la danse nuit ».
17. **Audit « lacunes » L01** : « Beckers et al. 1989 opposent apprentissage (petites sociétés) et patrons émergents (grandes) » : seul est vérifié ici le lien entre taille de colonie et stratégie de recrutement (solitaire, tandem, groupe, piste; Planqué et al. 2010 [T]); l'opposition « apprentissage contre patrons émergents » n'est pas confirmée [non vérifiée].
18. **Cadre §5 (parité)** : il n'existe pas, dans mes lectures, d'équivalent abeille du plan « colonie contre individu isolé » de Sasaki; les comparables sont I'Anson Price et al. 2019 (colonie, information de danse), Grüter et al. 2008 (individu, information privée) et List et al. 2009 (modèle d'essaim). Asymétrie à déclarer dans la fiche P8 et justifiée par ce constat.
19. **v3 (« capacité des agents : règle simple, Haiku, Sonnet, Opus »)** : aux tarifs 1 / 2 / 4 (audit méthodologique, confirmés sur la page des tarifs de l'API Claude le 2026-10-01 [T]), le budget égal limite le collectif faible à 2 ou 4 appels; l'effet de jury est alors faible (+4,8 points à p = 0,6 pour K = 3) [I]. QR1 exige des modèles à poids ouverts pour K ≥ 10.
20. **v3 (« des agents identiques oscillent; la diversité stabilise »)** : pour la **précision**, le rôle de la diversité est une identité (M3) soumise à la corrélation des erreurs, non un effet causal général; pour la **stabilité**, rien dans P8 ne l'établit.

---

## 8. Questions ouvertes et ce qui permettrait de trancher

1. **SI de Sasaki et al. 2013** (Tables S1 à S4, Fig. S1 à S8) : taux de transition, T, effectifs exacts, sélection des individus (tranchée : ouvrières présélectionnées qui rapportent du couvain, texte principal [T]). Trancher le reste : PDF de l'article avec SI (accès institutionnel) ou Pratt lab.
2. **λ de l'Éq. 1** : est-ce l'asymptote ou un facteur 0,5 + 0,5 λ? Incohérence confirmée par la vérification indépendante (Éq. 1 imprimée contre Fig. 2A). Trancher : SI (Table S1).
3. **Effectifs de Sasaki** : l'article indique 32 colonies pour les tests coloniaux, mais aussi 16 colonies testées chacune aux 7 niveaux (16 × 7 = 112 essais) : contradiction interne confirmée; 12 essais individuels et 10 essais coloniaux ont été exclus. Effectif exact de colonies [à confirmer] : SI.
4. **Code de Schürch et Grüter 2014** (modèle d'abeilles de I'Anson Price et al. 2019) et paramètres complets d'Okada et al. 2014 : texte intégral et dépôt de code.
5. **Théorèmes 2 et 4 de Chen et al. 2024** : **tranchée** : le camera-ready NeurIPS (copie NSF PAR) garde les Théorèmes 2 et 4 tels quels; l'inégalité du Théorème 4 n'est pas corrigée.
6. **Sumpter et Pratt 2009, 3,33 %** : **tranchée** : le chiffre figure bien au §4(d) [T]; il ne se reproduit pas par calcul exact (4.4).
7. **Condorcet 1785** : existence confirmée (Gallica, archive.org), texte non lu; l'énoncé moderne vient de Dietrich et Spiekermann 2021 [T].
8. **Dong et al. 2023** : texte intégral pour chiffrer T8.15 (divergence d'angle, erreur de distance, effectifs).
9. **Franks et Richardson 2006, Giurfa et al. 2001 (chiffres), Donaldson-Matasci et Dornhaus 2012** : résumés d'éditeur absents ou restitués par recherche; texte intégral requis avant toute valeur chiffrée (les résumés de Dornhaus et Chittka 2004 et de Sherman et Visscher 2002 ont été retrouvés [R] à la vérification).
10. **Pagination de Thompson 2014**, DOI de Lorenz et al. 2011 et d'Esch et al. 2001, numéro d'article de Sasaki et al. 2018 : **tranchées** : Thompson 2014, pp. 1024–1030; Lorenz et al. 2011, 10.1073/pnas.1008636108; Esch et al. 2001, 10.1038/35079072; Sasaki et al. 2018, article n° 12730.
11. **Équivalence des sens de « difficile »** (M13) : la réconciliation D1/D2 par p_i et ρ est une inférence; trancher par E8.1 (analytique, sans API) puis E8.5 (P7).
12. **Budget égal avec des tarifs actuels** : les prix et identifiants des modèles se vérifient de nouveau avant toute exécution (cadre §2.4, point 16; retrait possible de Haiku 4.5 dès le 2026-10-15).
13. **Version éditeur de Kapoor et al. 2025 (TMLR), Wang et al. 2024b (ACL), Kim et al. 2025a (aucune version éditeur trouvée), Feinerman et Korman 2017** : seules les versions arXiv ont été lues; les chiffres de la version publiée peuvent différer.
14. **Controverse de l'odomètre** : lire les réponses publiées (Srinivasan 2025; Stuart 2025, *J. Comp. Physiol. A* 211(5–6)) et, si possible, les données brutes de Tautz et al. 2004 avant d'utiliser la moindre calibration; trancher par une réplication indépendante.
15. **Parité abeille** : chercher un plan « essaim contre éclaireuse isolée » publié (Seeley et Buhrman 2001; Seeley 2010 [non vérifiée], non lu) avant d'accepter l'asymétrie.
16. **Grüter et al. 2010 [non vérifiée]** : l'attribution « copier quand c'est incertain » n'est pas retrouvée dans le résumé (l'apprentissage social y est présenté comme adaptatif parce que les démonstrateurs filtrent l'information). Trancher : lire le texte intégral, ou retirer l'attribution au point 4 de la section 6.

---

## 9. Historique de vérification

Vérification indépendante du 2026-10-01 (rapport `recherche/verifications/p8-individu-colonie.md`) : les références des tableaux et celles citées dans le texte ont été consultées directement; aucune n'est inventée ni fausse; tout ce que le dossier calcule [I] a été refait par du code indépendant et concorde. Consolidation du 2026-10-01 : corrections appliquées en place, étiquettes normalisées, statuts reportés en section 2.

### 9.1 Corrections appliquées

**Références (métadonnées, versions publiées, statuts)**

1. Grüter et al. 2010 : DOI ajouté (10.1016/j.cub.2010.06.052; métadonnées confirmées par Crossref, résumé par Europe PMC); statut « non vérifiée » (attribution de la section 6, point 4).
2. Esch et al. 2001 : DOI 10.1038/35079072, 411(6837); lue [R] et non [S]; « couloir texturé » remplacé par « tunnel étroit : distance exagérée ».
3. Lorenz et al. 2011 : DOI 10.1073/pnas.1008636108, 108(22); lue [R] et non [S].
4. Edwards et Pratt 2009 : DOI 10.1098/rspb.2009.0981; lue [R] et non [S].
5. Galton 1907 : DOI 10.1038/075450a0; *Nature* 75(1949).
6. Thompson 2014 : pagination 1024–1030, n° 9 (octobre 2014); « à confirmer » levé.
7. Cheung et al. 2014 : pages E4396–E4397 (le « E4402 » d'OpenAlex est faux).
8. Sasaki et al. 2018 : article n° 12730; « numéro à confirmer » levé.
9. Donaldson-Matasci et Dornhaus 2012 : DOI de l'erratum 10.1007/s00265-012-1352-1.
10. Chen et al. 2024 : titre NeurIPS « LLM calls … scaling properties of compound AI systems » (fiche OpenReview/NeurIPS); le PDF camera-ready porte « LM calls », que le dossier citait seul.
11. Kapoor et al. 2025 : *TMLR*, publié 2025-06-13 (OpenReview); « mai 2025 » non confirmé, retiré.
12. Versions publiées ajoutées : Wang et al. 2024a (ICLR 2025, spotlight), Li et al. 2025 (TMLR), Snell et al. 2024 (ICLR 2025, oral, titre modifié), Wang et al. 2023 (ICLR 2023, v4), Li et al. 2024 (accepté 2024-10-23).
13. Zhang et al. 2025 : titre complet rétabli.
14. Dietrich et Spiekermann 2021 (ex-« SEPJury ») : année 2021 (première publication 2021-11-17) et auteurs nommés; lue [T].
15. Srinivasan et al. 2024 : réponses de 2025 identifiées (Srinivasan 2025, 637–640; Stuart 2025, 641–644; *J. Comp. Physiol. A* 211(5–6)), chacune d'un seul auteur.
16. Beckers et al. 1989 : *Psyche* 96(3–4), 239–256; lien taille de colonie → mode de recrutement retrouvé [T] dans Planqué et al. 2010.
17. Okada et al. 2014 : PMC3935192 ajouté.
18. Statuts de lecture : Dornhaus et Chittka 2004, Sherman et Visscher 2002 et Schoenegger et al. 2024 passent de [S] à [R]; Page 2007 : source secondaire nommée (Wikipédia).
19. Marshall et al. 2009 : numéro de figure tranché (Fig. 4 = schéma du modèle à commutation directe; Fig. 5 = temps de décision selon k; légendes lues sur PMC [S], concordantes avec le dossier P5 [T]). Classée « vérifiée » : le rapport ne la disait non vérifiable que pour ce point.
20. Étiquettes normalisées dans tout le dossier : « Anthropic 2025 » devient Hadfield et al. 2025 (le billet nomme ses auteurs); Kim et al. 2025a (lois d'échelle) et 2025b (erreurs corrélées); Wang et al. 2024a (MoA) et 2024b (ACL); « SEPJury » devient Dietrich et Spiekermann 2021.
21. Section 2.6 ajoutée : références citées dans le texte et absentes des tableaux (Schürch et Grüter 2014, Alon et al. 2011, Weng et al. 2025, Srinivasan et al. 2000, Srinivasan 2025, Stuart 2025, Pratt et Sumpter 2006, Seeley et Buhrman 2001, Seeley 2010, Beckers et al. 1989, Dietrich 2008, Boland 1989, Karotkin et Paroush 2003). Métadonnées issues du rapport, de Crossref et de l'API arXiv.

**Contenu, paramètres et résultats cibles**

22. Sasaki et al. 2013 : exclusions d'essais, soit 12 essais individuels et 10 essais coloniaux (9 scissions, 1 sans déplacement), et non « 9 scissions » seulement (M1).
23. Sasaki et al. 2013 : contradiction interne de l'article sur les effectifs (32 colonies contre 16 × 7 = 112 essais) (M1, 8.3).
24. Sasaki et al. 2013 : individus présélectionnés (ouvrières qui rapportent du couvain) (M1, 7.3, 8.1).
25. Sasaki et al. 2013 : « limites déclarées » ramenées à ce que le texte dit (M1).
26. Valeurs retrouvées dans les textes : « à reconfirmer » levé pour le dispositif et les valeurs de l'Éq. 1 de Sasaki et al. 2013, pour I'Anson Price et al. 2019 et List et al. 2009, pour Tautz et al. 2004, et pour l'effet de taille non significatif (7.6, Feinerman et Korman 2017 justifié).
27. I'Anson Price et al. 2019 : +22,59 ± 11,1 % relève d'une variation élevée (écart-type = moyenne/4), non faible (T8.8).
28. T8.8 : le texte ne chiffre que 5 des 8 cellules; critère « ≥ 7 sur 8 » marqué [à confirmer].
29. Hong et Page 2004 : Théorème 1 sous quatre hypothèses; N₁ < N dans l'énoncé (M4).
30. Chen et al. 2024 : c₃ non contraint (M5).
31. Chen et al. 2024 : Théorèmes 2 et 4 relus dans le camera-ready NeurIPS, inchangés (M5, 1.8, 7.10, 8.5 tranchée); lecture de la 2e puce du Théorème 2 (« et » contre « ou »); 79 ou 80 cas selon l'arrondi flottant (M5, 4.4).
32. Hadfield et al. 2025 : le +90,2 % compare à un agent unique; ≈ 15 × est relatif à un dialogue (≈ 4 × pour un agent seul); ≈ 3,75 × relativement à l'agent unique [I] (M14, 6.3, 7.13).
33. List et al. 2009 : 246/250 relève du critère fort; au critère faible, 250/250 (237/250 pour σ = 1) (M9).
34. List et al. 2009 : Fig. 8 (μ = 1) est une simulation illustrative, non un taux sur 250 essais (M9, 6.2).
35. T8.5 : critère absolu (≤ 10⁻¹²) à la place du critère relatif (≤ 10⁻⁹), qui peut échouer sans bogue.
36. Li et al. 2024 : Propriété 1, le gain s'amenuise à I = 400 (non « s'effondre »); « gain relatif » du §6 = différence d'exactitudes (M6).
37. T8.7 : le texte de Grüter et al. 2011 écrit 52 % pour les fourmis naïves; 50,5 % est lu sur la Fig. 2a.
38. Tautz et al. 2004 : le seuil de contraste ≈ 20 % vient des études en tunnel citées, non de l'étude (M10).
39. Sumpter et Pratt 2009 : « 3,33 % » figure bien au §4(d); il ne se reproduit pas par calcul exact (4.4, 7.9, 8.6 tranchée).
40. T8.2 et table de 4.4 : valeurs numérisées de la Fig. 3 marquées [à confirmer] au ±0,01 (relues à l'œil seulement); croisement ≈ 59–60 % à la relecture.
41. Tarifs (E8.5, 7.19) : confirmés sur la page des tarifs de l'API Claude le 2026-10-01 [T].
42. Marques « [non vérifiée] » posées là où la référence est citée : Grüter et al. 2010 (6.4), Seeley 2010 (8.15), contenu « apprentissage contre patrons émergents » de Beckers et al. 1989 (7.17).
43. Section 1 (point 11), 8.9, 8.10, 8.13 et 8.15 mises à jour; question 16 ajoutée à la section 8.

Non reportés (compléments du rapport qui ne corrigent rien) : ligne « 10 agents, l = 12 » de la Table 1 de Hong et Page 2004, détails d'effectifs et de dates de I'Anson Price et al. 2019, valeurs de jetons supplémentaires du Tableau 5 de Li et al. 2024.

### 9.2 Réserves restantes

- **SI de Sasaki et al. 2013 non lu** (reCAPTCHA) : T, taux de transition (Tables S2 à S4), Table S1 (λ de l'Éq. 1 : incohérence confirmée, non tranchée), Fig. S1 à S8, effectif exact de colonies [à confirmer]. La réplication de T8.2 reste bloquée (porte no-go).
- **Valeurs numérisées de la Fig. 3** : [à confirmer] au ±0,01 (relues à l'œil seulement).
- **T8.8** : 3 cellules sur 8 [à confirmer]; code de Schürch et Grüter 2014 et paramètres d'Okada et al. 2014 non lus.
- **Non vérifiées** : Grüter et al. 2010 (attribution), Seeley 2010 (non consultée), contenu de Beckers et al. 1989.
- **Dong et al. 2023** : texte intégral non lu (T8.15 non chiffrée). **Condorcet 1785** et **Page 2007** non lus.
- **Controverse de l'odomètre** : non tranchée; aucune valeur chiffrée retenue.
- **Versions éditeur non comparées** : Kapoor et al. 2025 (TMLR), Wang et al. 2024b (ACL), Feinerman et Korman 2017; aucune version éditeur trouvée pour Kim et al. 2025a.
- **Marshall et al. 2009** : équations lues par extraction [S] (matériel supplémentaire non lu).
- **Étiquette « Hadfield et al. 2025 »** : choisie parce que le billet nomme ses auteurs; à harmoniser avec `docs/11-bibliographie.md` si le programme préfère « Anthropic 2025 ».
- **Inférences du dossier** [I] : réconciliation des cinq sens de « difficile » (E8.1), calcul de n_eff et de G sur les courbes numérisées.
- **Avant toute exécution de P7** : identifiants et tarifs des modèles à vérifier de nouveau (cadre, §2.4, point 16).

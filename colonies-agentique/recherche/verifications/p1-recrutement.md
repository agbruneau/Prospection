# Vérification indépendante — dossier P1 « Recrutement : la piste contre la danse »

Vérifié le 2026-10-01. Régime : production. Le dossier a été relu en entier. Chaque référence a été contrôlée par moi-même à la source, sans me fier au dossier.

**Moyens utilisés.**

- Crossref : API `works` (filtre par DOI ou requête bibliographique).
- OpenAlex.
- Semantic Scholar.
- Europe PMC : API REST pour les résumés.
- Pages éditeur : Springer, OUP, PLOS, Frontiers, arXiv.
- PMC : texte intégral.
- PDF intégraux de Goss et al. 1989 et de Seeley et al. 1991, lus page par page.

Le quota de l'outil Consensus et celui de WebSearch étaient épuisés : je ne les ai pas utilisés.

**Légende des statuts.**

- **confirmée** : métadonnées exactes et contenu cité retrouvé au niveau de lecture indiqué.
- **corrigée** : la référence existe, mais une métadonnée manque ou est fausse, ou un résultat est mal rapporté.
- **non vérifiable** : je n'ai pas pu confirmer l'affirmation à la source.
- **fausse** : la référence n'existe pas ou ne correspond pas.

**Niveau de lecture de ma vérification.**

- [T] : texte intégral lu.
- [R] : résumé lu.
- [M] : métadonnées seulement.

## 1. Bilan

**Résultat.** Les 40 références existent. Aucune n'est fausse.

- **27 confirmées.**
- **11 corrigées** :
  - 9 pour des métadonnées incomplètes (volume, pages, DOI ou coauteurs « à confirmer »);
  - 2 pour des résultats rapportés inexactement : Okada 2014 (critère C7) et un détail de Seeley 1991.
- **2 non vérifiables sur un point précis** : Czaczkes 2015 et Dussutour 2009.

**Valeurs clés.** Les valeurs des deux modèles centraux sont exactes, et la réimplantation reproduit les chiffres annoncés. J'ai relancé `p1-verif/verif_p1.py` : sorties identiques aux sections 3 et 4 du dossier.

- Goss 1989 : éq. 1-3, k = 20, n = 2, Φ = 0,5, 12/26, 15/18, 14/14, 2/18.
- Seeley 1991 : annexe, tableau 2, conditions initiales, 119/3, pentes +18/−30 (simulation) et +34/−19 (terrain).

## 2. Tableau référence → statut → correction → URL

| Clé | Statut | Correction ou remarque | URL de vérification |
|---|---|---|---|
| goss1989 | confirmée [T] | Métadonnées, équations, paramètres et résultats conformes (voir section 3). PDF ULB accessible | https://dipot.ulb.ac.be/dspace/bitstream/2013/19271/1/042GossNaturwissenschaften89.pdf |
| deneubourg1990 | confirmée [M] | Vol. 3, n° 2, p. 159-168. Rôle confirmé : c'est la réf. [5] de goss1989 (« J. Ins. Behav. (in press) »), à l'origine de l'éq. 3 | https://api.crossref.org/works/10.1007/BF01417909 |
| beckers1989 | confirmée [R] | Le résumé dit : « 98 ant species », « Six foraging strategies », associées à la taille de colonie croissante | https://api.semanticscholar.org/graph/v1/paper/DOI:10.1155/1989/94279 |
| beckers1990 | confirmée [R] | Le niveau peut passer de S à R. Le résumé confirme le non-basculement de *L. niger* vers 1 M si la piste vers 0,1 M est déjà bien développée. *T. caespitum*, lui, bascule | https://link.springer.com/article/10.1007/BF02224053 |
| beckers1992 | confirmée [M] | N° 4 à ajouter (159(4):397-415) | https://api.crossref.org/works/10.1016/S0022-5193(05)80686-1 |
| beckers1993 | confirmée [M] | N° 6 à ajouter (6(6):751-759) | https://api.crossref.org/works/10.1007/BF01201674 |
| seeley1991 | **corrigée** (détail) [T] | Métadonnées exactes (28(4):277-290). Deux détails à corriger : (1) section 9, point 13 : « environ 4200 abeilles marquées » est inexact. 4000 abeilles ont été marquées; la population est d'environ 4200 au 19 juin, et toutes les butineuses portent encore une marque (p. 278). (2) Le texte de la p. 286 donne 90 abeilles au sud à midi sur le terrain, alors que la fig. 1 en indique 91. C6 retient 91 (fig. 1), ce qui se défend, mais l'écart interne à la source mérite une note | http://users.sussex.ac.uk/~ezequiel/iam/Seeley_91.pdf |
| camazine1991 | confirmée [M] | Métadonnées exactes (149(4):547-571). Le titre provisoire cité par seeley1991 est confirmé (p. 289). Contenu non lu, comme le dit le dossier | https://api.crossref.org/works/10.1016/S0022-5193(05)80098-0 |
| vonfrisch1967 | confirmée [M] | Remarque : Crossref date ce DOI de 1993 (réédition). Citer « 1967; rééd. 1993 » avec le DOI de 1993, comme le fait déjà le dossier | https://api.crossref.org/works/10.4159/harvard.9780674418776 |
| seeleytowne1992 | **corrigée** | Ajouter vol. 30, n° 1, p. 59-69. Les pages viennent de la page Springer lue par l'outil, pas de Crossref. Le résumé est lu : les suiveuses ne comparent pas les danses, la part des recrues suit la part des circuits (11 essais). Le niveau peut passer à R | https://link.springer.com/article/10.1007/BF00168595 |
| seeley1994 | **corrigée** | Compléter : 34(1):51-62, DOI 10.1007/BF00175458 (un doublon OpenAlex porte 10.1007/s002650050018). Le contenu est confirmé : relation linéaire entre efficacité énergétique et nombre de courses par danse, seuils et pentes individuels, danses mélangées et échantillon aléatoire | https://link.springer.com/article/10.1007/BF00175458 |
| weidenmuller1999 | **corrigée** | Compléter : 46(3):190-199, DOI 10.1007/s002650050609. Le contenu est confirmé : site de nid plus précis qu'une mangeoire équidistante, « demonstrated four times with four colonies » | https://link.springer.com/article/10.1007/s002650050609 |
| gardner2007 | **corrigée** | Compléter : Gardner KE, Seeley TD, Calderone NW (2007), *Entomol Gen* 29(2-4):285-298, DOI 10.1127/entom.gen/29/2007/285. Le titre complet se termine par « (Hymenoptera: Apidae: Apis mellifera) ». Contenu confirmé : 572 danses, 10 distances, appui à l'hypothèse « tuned-error » | https://api.crossref.org/works/10.1127/entom.gen/29/2007/285 |
| okada2014 | **corrigée** (résultat) [T partiel, PMC] | Métadonnées et PMC exacts. **Le résultat est mal rapporté dans C7 :** voir la section 4 | https://pmc.ncbi.nlm.nih.gov/articles/PMC3935192/ |
| esch2001 | confirmée [R] | 411(6837):581-583. Le résumé dit que la danse transmet « the total amount of image motion », et non la distance absolue | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1038/35079072%22 |
| schurch2016 | confirmée [R] | 219(9):1287-1289. « by as much as 50% » est confirmé. Crossref écrit « Samuelson EEW », Europe PMC « Samuelson EE » | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1242/jeb.134874%22 |
| kohl2021 | confirmée [T, PMC] | Coefficients du tableau 2 exacts. Rupture à 1,0328 km (« 1,03 » est un arrondi). *A. m. carnica*, 0,1-1,7 km | https://pmc.ncbi.nlm.nih.gov/articles/PMC8029670/ |
| biesmeijer2005 | **corrigée** | Coauteur confirmé : Biesmeijer JC, Seeley TD (2005), 59(1):133-142, DOI 10.1007/s00265-005-0019-6. Le résumé confirme « reactivation and confirmation accounted for the other 75–88% » | https://link.springer.com/article/10.1007/s00265-005-0019-6 |
| sherman2002 | confirmée [R] | Nuance : le bénéfice est net aux mangeoires de sirop. Aux sources naturelles, l'information directionnelle « sometimes » augmente la récolte, sinon elle ne change rien | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1038/nature01127%22 |
| price2019 | confirmée [R] | 5(2):eaat0450. Les colonies à danses désorientées réussissent mieux en milieu tempéré modifié par l'humain | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1126/sciadv.aat0450%22 |
| granovskiy2012 | confirmée [R] | 23(3):588-596. Le résumé confirme : inspectrices = réponse rapide, danse = réponse sur une période plus longue | https://academic.oup.com/beheco/article/23/3/588/208838 |
| gruter2012 | confirmée [T] | *L. niger*, 6 colonies. 1 contre 3 trous : bascule « within an average of 10 minutes » (fig. 3A). 9 contre 27 : pas de bascule (fig. 3C). Phéromone « at least 40–60 minutes » | https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0044501 |
| dussutour2009 | **non vérifiable** (point précis) [T, PMC] | Les métadonnées, l'éq. 3.1 `p_i = c_i^α/(k + c_1^α + c_2^α)`, « With α = 2, as fitted to experiments », k = 12, q1 = 0,09, q2 = 0,13, ρ = 0,00085, la réduction linéaire de Φ de 100 à 50 % entre 60 et 120 min (donnée comme une borne supérieure) et les comptes 21/21, 18/21, 16/21 sont tous confirmés. **α = 2 est donc vérifié** (question ouverte n° 4 en partie résolue). Restent non vérifiés : (1) l'unité de temps de ρ, que les passages lus n'énoncent pas; (2) la méthode d'ajustement, que le dossier se contredit à décrire (« moindres carrés » en 3.2, « par grille » en 3.5) | https://pmc.ncbi.nlm.nih.gov/articles/PMC2817102/ |
| czaczkes2015 | **non vérifiable** (point précis) [R] | Les métadonnées et le résumé sont confirmés : « two or more pheromones with different functions », complémentarité avec la mémoire individuelle. Mais la section 9, point 6 du dossier parle de « phéromones **de persistances différentes** » : le résumé, seul niveau lu, ne le dit pas. Reformuler en « fonctions différentes » ou lire le texte intégral | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1146/annurev-ento-010814-020627%22 |
| deneubourg1983 | confirmée [M] | 105(2):259-271 | https://api.crossref.org/works/10.1016/S0022-5193(83)80007-1 |
| deneubourg1986 | **corrigée** | Compléter : Deneubourg JL, Aron S, Goss S, Pasteels JM, Duerinck G (1986), *Physica D* 22(1-3):176-186, DOI 10.1016/0167-2789(86)90239-3. Je n'ai pas pu relire le résumé (non fourni par Semantic Scholar ni OpenAlex) : l'affirmation de contenu reste au niveau [S] | https://api.openalex.org/works/doi:10.1016/0167-2789(86)90239-3 |
| nicolis1999 | confirmée [R] | Le résumé dit « Different collective responses depending on the environmental conditions, and without change of individual behaviour ». « Multistabilité » est une glose acceptable (diagramme de bifurcation) | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1006/jtbi.1999.0934%22 |
| sumpter2003 | confirmée [R] | Cadre général avec des « generalised rate functions » qui couvrent les pistes et la danse | https://link.springer.com/article/10.1007/s00265-002-0549-0 |
| detrain2008 | confirmée [M] | 35:123-173 | https://api.crossref.org/works/10.1016/S0065-2806(08)00002-7 |
| beekman2001 | confirmée [R] | 98(17):9703-9706. Le résumé dit « first-order and exhibits hysteresis », quand la nourriture est difficile à trouver | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1073/pnas.161285298%22 |
| planque2010 | **corrigée** | Compléter : Planqué R, van den Berg JB, Franks NR (2010), *PLoS ONE* 5(8):e11664, DOI 10.1371/journal.pone.0011664. Le résumé confirme : tandem ou groupe pour les petites et moyennes colonies, pistes pour les grandes | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1371/journal.pone.0011664%22 |
| lanan2014 | **corrigée** | Ajouter le DOI 10.25849/myrmecol.news_020:053 (20:53-70; OpenAlex date le DOI de 2023, mais le volume 20 est de 2014). 402 espèces : confirmé. Nuance : le résumé associe les « long-term trail networks » à des distributions de ressources particulières; le mot « durables » est une inférence | https://api.openalex.org/works/doi:10.25849/myrmecol.news_020:053 |
| seeley2011 | **corrigée** | Support exact : chapitre de Galizia CG, Eisenhardt D, Giurfa M (dir.), *Honeybee Neurobiology and Behavior*, Springer, Dordrecht, 2012 (en ligne 2011), p. 77-87, DOI 10.1007/978-94-007-2099-2_7. Le résumé confirme « hard to find, variable in profitability, and ephemeral » | https://link.springer.com/chapter/10.1007/978-94-007-2099-2_7 |
| theraulaz1999 | confirmée [R] | 5(2):97-116. Le résumé est confirmé (Grassé 1959, stigmergie quantitative et qualitative) | https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:%2210.1162/106454699568700%22 |
| heylighen2016 | confirmée [M] | 38:4-13 | https://api.crossref.org/works/10.1016/j.cogsys.2015.12.002 |
| peltz2003 | confirmée [M] | 36(10):46-52 | https://api.crossref.org/works/10.1109/MC.2003.1236471 |
| han2025 | confirmée [R] | Auteurs : Bochen Han, Songmao Zhang. « manage to spend less tokens » : confirmé | https://arxiv.org/abs/2507.01701 |
| jimenez2025 | confirmée [T] | GPT-4o, température 0, 10 fourmis, 3 sources, 1000 pas, 5 répétitions, ≈ 85 unités (écart-type ≈ 7 contre ≈ 20), hybride ≈ 95 (écart-type ≈ 12), 9 itérations de prompt : confirmés | https://www.frontiersin.org/journals/artificial-intelligence/articles/10.3389/frai.2025.1593017/full |
| hanc2026 | confirmée [R] | Auteurs exacts (Chen Han et al.). « speeds up convergence but also heightens the risk of wrong-but-sure cascades » : confirmé | https://arxiv.org/abs/2601.05606 |
| choi2025 | confirmée [R] | Le résumé confirme : « align with numerically dominant groups or more intelligent agents ». Le cadre est celui de débats sur des sujets clivants, et non d'une topologie | https://arxiv.org/abs/2506.01332 |

## 3. Vérification des valeurs clés des deux modèles centraux

### Goss et al. 1989 (PDF lu en entier)

| Élément du dossier | Source | Statut |
|---|---|---|
| Éq. 1-3, retards 20 s et 20r s, j ↔ j′ | p. 580 | conforme |
| k = 20, n = 2 tirés de [5] (« choice between two equal paths during an exploratory recruitment ») | p. 580; réf. [5] = Deneubourg, Aron, Goss, Pasteels, J. Ins. Behav. (in press) | conforme |
| Φ = 0,5 fourmi/s; dépôt d'une unité dans chaque sens; *I. humilis* marque à l'aller et au retour | p. 579 et légende de la fig. 2 | conforme |
| Durée de vie de la phéromone ≈ 30 min [4], évaporation négligée | p. 580; [4] = Van Vorhis Key et Baker, J. Chem. Ecol. 8:3 (1982) | conforme |
| Comptage du 501e au 1000e passage, n = 1000; branche tardive après le 1000e passage, comptage 1501-2000 | légende de la fig. 2 | conforme |
| Module de 12,5 cm, branches à 30° | fig. 1a, p. 579 | conforme |
| 11 colonies; 12/26, 15/18, 14/14, 2/18; branche ajoutée à 30 min, mesure 20-30 min plus tard; ΣΦ = 407-912 (g) | p. 581 et légende de la fig. 2 | conforme |
| Trois prédictions, la troisième « currently being tested » | p. 580-581 | conforme |

Les auteurs ajoutent une donnée que le dossier ne mentionne pas : sous lumière rouge, 11 essais sur 14 (r = 2, 7 colonies) dépassent 80 % sur la branche courte. Elle est utile pour la question ouverte n° 5 (fiabilité des vraies colonies).

### Seeley, Camazine et Sneyd 1991 (PDF lu en entier)

Sont conformes au PDF :

- les 7 équations de l'annexe (p. 290);
- le tableau 2 au complet, avec les notes (121 min, 1600 m contre 400 m, (1 − p)^5 = 0,80);
- τ_A = 0,38 et τ_B = 0,02 (14 et 1 circuits, 2,4 s par circuit, T2 = 90 s, T6 = 120 s);
- les conditions initiales (11, 11, 1, 1, 0, 0, 101), soit environ 125 abeilles;
- 119 et 3 à midi (simulation);
- les pentes 34/18 et −19/−30;
- le tableau 1 en entier;
- « 2 sur 117 »;
- les comptes de la fig. 1 (12/91 → 121/10; 92/24 → 13/107);
- 1,00 M au nord le matin;
- les trois hypothèses du modèle (p. 285). Les seuils fixes sont à la p. 284, non 285.

La formalisation `f_l = τD/(τD + τD)` décrit fidèlement le texte de la p. 285, et le dossier la marque à juste titre comme une formalisation [I].

### Réimplantation

`python verif_p1.py` reproduit exactement les chiffres annoncés :

- Seeley : 118,7 et 3,0 à midi; pentes +12,2 et −18,2; croisement à 147 min; 80,4 et 29,5 à 16 h;
- Goss : histogrammes [37, 10, 7, 7, 39], [23, 8, 5, 14, 50], [17, 5, 6, 7, 64] et [100, 0, 0, 0, 0];
- le script se termine par « OK ».

L'écart des pentes (+12/−18 contre +18/−30 publiés) est donc bien réel dans le modèle reconstitué. Je n'ai pas de source pour le trancher : il faudrait lire Camazine et Sneyd 1991.

## 4. Résultats cibles et critères : constats

1. **C7 et section 6 (okada2014) : résultat mal rapporté.**
   - Le dossier écrit « 10-15°, bénéfice dans la plupart des conditions ». Selon le résumé, une erreur de 10° ou moins est bénéfique dans toutes les conditions testées. À 15°, la danse n'est bénéfique que si les sources sont rares (résultats « highly mosaic »). À 30° ou plus, elle n'est pas bénéfique.
   - Le critère « indice de bascule maximal pour σ ∈ [10, 15]° » n'est pas un résultat publié. Le texte établit seulement deux choses : à 0-5°, beaucoup d'abeilles échouent à changer de mangeoire, et une erreur de 15° favorise la flexibilité en environnement changeant.
   - Protocole publié : 20 simulations par condition, 1000 abeilles, 2, 5, 7 ou 10 mangeoires, à des distances de 400 à 2000 m.
   - Correction : présenter C7 comme une extension, et non comme une reproduction, ou le réécrire sur les seuils publiés (≤ 10° partout bénéfique, 15° conditionnel, ≥ 30° sans bénéfice).
2. **Tableau des probabilités (section 4) : définition incohérente.**
   - Pour r = 1, « 0,78 » correspond à P(X ≥ 12 | n = 26, p = 0,52) = 0,786, soit la queue supérieure. Or l'observé (12) est sous l'espérance (13,5). Un test bilatéral donne 0,69 par doublement, ou 0,56 par la méthode des probabilités minimales. La conclusion reste la même (pas d'écart), mais l'étiquette « aussi extrême » ne correspond pas au calcul.
   - Pour r = 1,4, P(X ≥ 15 | 18; 0,62) = 0,047, et non 0,044. On obtient 0,043 avec p ≈ 0,615 : il s'agit probablement de la valeur non arrondie.
   - Pour r = 2, 0,75^14 = 0,018 : conforme.
   - Ces probabilités ne sont pas calculées dans `verif_p1.py`.
3. **C4 et script.** L'assertion du script tolère ±12 et ±3 abeilles à midi, alors que le critère C4 annonce 119 ± 3 et 3 ± 1. Le script ne vérifie donc pas le critère publié. Il faudrait aligner ses tolérances sur C4.
4. **C8 (gruter2012), C9 (dussutour2009), C1-C3 (goss1989), C4-C6 (seeley1991)** : les valeurs publiées sont toutes retrouvées à la source (sections 2 et 3).
5. **Section 3.4 (kohl2021)** : coefficients exacts. Le seuil exact est 1,0328 km.
6. **Section 9, point 13** : remplacer « environ 4200 abeilles marquées » par « 4000 abeilles marquées, population d'environ 4200 ».
7. **Section 9, point 6** : la mention « persistances différentes » n'est pas appuyée par le niveau de lecture déclaré (voir czaczkes2015).

## 5. Ce qui reste non vérifié par moi

- **Contenu de Camazine et Sneyd 1991, Deneubourg et al. 1990 et Deneubourg et al. 1986** : seules les métadonnées sont confirmées. Pour 1990, le rôle est aussi confirmé par Goss.
- **Unité de temps de ρ chez Dussutour 2009** : il faudrait lire la section 3 en entier (PDF de l'éditeur, bloqué en 403).
- **Pages de Seeley et Towne 1992** : la plage 59-69 provient de la page Springer rendue par l'outil de lecture. Crossref ne fournit pas les pages.
- **Lectures de figure (fig. 2 de Goss, fig. 5 de Seeley)** : elles restent au niveau « lecture de figure » (±3 points). Je n'ai pas fait de lecture indépendante plus précise.

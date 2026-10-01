# Dossier P5 — Décision collective par quorum (Temnothorax / Apis)

**Statut : consolidé après vérification indépendante, 2026-10-01.** Rapport : `recherche/verifications/p5-quorum.md`; corrections et réserves restantes en section 10.

Dossier documentaire du Projet 5 de la proposition v3. Rédigé le 2026-10-01. Régime : production (livrable sur lequel le chercheur va agir), avec un pré-test numérique exploratoire (section 5).

**Légende de vérification** (appliquée à chaque affirmation chiffrée) :

- **[T]** texte intégral lu (PDF ou HTML de l'article, ou SOM).
- **[R]** résumé seulement lu.
- **[M]** métadonnées seulement (titre, revue, DOI).
- **[S]** rapporté par une source secondaire lue, nommée entre parenthèses.
- **[I]** inférence ou calcul de l'auteur du dossier, non publié tel quel.
- **[à confirmer]** valeur ou énoncé que la vérification indépendante n'a pas pu confirmer (source non lue, restriction non retrouvée, lecture ambiguë).
- **[non vérifiée]** référence, ou contenu d'une référence, dont la vérification indépendante n'a pas pu consulter la source.

---

## 1. Synthèse

1. Les deux espèces décident par **course vers un seuil** : chez *Temnothorax albipennis*, une éclaireuse passe du tandem (lent, un suiveur) au transport (3 fois plus rapide) quand la population du nid candidat atteint un quorum; chez *Apis mellifera*, les éclaireuses déclenchent le *piping* (préparation à l'envol) quand environ 15 éclaireuses sont présentes ensemble au site.
2. Le quorum est un **paramètre réglable vitesse/justesse** chez la fourmi (médianes 2 à 7,5 ouvrières selon les conditions, Franks et al. 2003), mais Pratt et Sumpter 2006 (sur *T. curvispinosus*) montrent que les taux de recherche et d'acceptation pèsent plus que le quorum sur la vitesse.
3. Chez l'abeille, l'**inhibition croisée ciblée** (signal d'arrêt) est ce qui brise l'égalité : le modèle de Seeley et al. 2012 bifurque (fourche) à σ* = 4αγρ/(ρ−α)²; un signal d'arrêt non ciblé ne brise **pas** l'égalité (SOM lue).
4. Pais et al. 2013 donnent la version « sensible à la valeur » (γ = ρ = v, α = 1/v) : σ* = 4v³/(v²−1)²; l'interblocage sur deux options faibles est **adaptatif** (on attend mieux), pas une pathologie.
5. Marshall et al. 2009 relient ces modèles au modèle de diffusion (DDM, test séquentiel optimal) : seul le modèle d'abeille à **commutation directe sans déclin** (k = 0) est asymptotiquement optimal; le modèle de fourmi exigerait une connaissance globale.
6. Différence structurante, lue dans Franks et al. 2002 : **la fourmi ne cesse de recruter que si elle trouve mieux; l'abeille cesse spontanément de danser**. C'est la vraie opposition « persistance contre expiration » pour l'analogie agentique.
7. La plupart des résultats « abeille » reproductibles sont des résultats **de modèle** (théorie); les résultats empiriques reposent sur 4 à 6 essaims (4 essaims pour Seeley et Visscher 2004, 5 essais pour Seeley et Buhrman 2001, 6 essaims pour Seeley 2003). Les critères d'acceptation (section 4) en tiennent compte.
8. Plusieurs approximations de v3 sont à corriger (section 8), dont « signal d'arrêt = veto », « signal scalaire » pour la fourmi et l'oubli du déclin des danses.

---

## 2. Références

Statut (cadre §6.8) : **vérifiée** = métadonnées et affirmations retrouvées par la vérification indépendante; **corrigée** = la source existe, mais une métadonnée ou une affirmation du dossier a été corrigée (section 10); **non vérifiée** = la vérification indépendante n'a pas pu consulter la source. Colonne « Lu » : ce qui a été lu réellement par l'auteur du dossier.

Étiquettes : chaque référence est nommée dans le texte par son étiquette normalisée « Nom année » (cadre §9) : un auteur « A année », deux auteurs « A et B année », trois ou plus « A et al. année ». Le suffixe a, b ne sert qu'à Pratt 2005a (*Behavioral Ecology*) et Pratt 2005b (*Insectes Sociaux*), seules étiquettes identiques du dossier. Un contenu marqué **[non vérifiée]** ou une valeur marquée **[à confirmer]** n'a pas pu être confirmé.

### 2.1 Références demandées par la portée

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Pratt et al. 2002 | Pratt, S. C., Mallon, E. B., Sumpter, D. J. T. et Franks, N. R. (2002). Quorum sensing, recruitment, and collective decision-making during colony emigration by the ant *Leptothorax albipennis*. *Behavioral Ecology and Sociobiology*, 52(2), 117–127. | 10.1007/s00265-002-0487-x | vérifiée | [R] résumé; modèle ODE et paramètres [S] (Franks et al. 2002, Fig. 6b et 8) |
| Pratt 2005a | Pratt, S. C. (2005a). Quorum sensing by encounter rates in the ant *Temnothorax albipennis*. *Behavioral Ecology*, 16(2), 488–496. | 10.1093/beheco/ari020 | corrigée | [R]; critère F7 corrigé (section 10) |
| Pratt et al. 2005 | Pratt, S. C., Sumpter, D. J. T., Mallon, E. B. et Franks, N. R. (2005). An agent-based model of collective nest choice by the ant *Temnothorax albipennis*. *Animal Behaviour*, 70(5), 1023–1036. | 10.1016/j.anbehav.2005.01.022 | non vérifiée | [R] (page ASU Pure) **[non vérifiée]** : métadonnées exactes (Crossref), mais la vérification indépendante n'a trouvé aucun résumé (ScienceDirect fermé, dépôt de Leicester mort, page de Bristol sans résumé); structure « 19 états, 44 paramètres » [S] (Pratt et Sumpter 2006, confirmée). Tableau des paramètres **non lu** (ScienceDirect bloqué par CAPTCHA, non contourné) |
| Franks et al. 2003 | Franks, N. R., Dornhaus, A., Fitzsimmons, J. P. et Stevens, M. (2003). Speed versus accuracy in collective decision making. *Proceedings of the Royal Society B*, 270(1532), 2457–2463. | 10.1098/rspb.2003.2527 · PMC1691524 | corrigée | [T]; critère F3 corrigé (section 10) |
| Franks et al. 2002 | Franks, N. R., Pratt, S. C., Mallon, E. B., Britton, N. F. et Sumpter, D. J. T. (2002). Information flow, opinion polling and collective intelligence in house-hunting social insects. *Philosophical Transactions of the Royal Society B*, 357(1427), 1567–1583. | 10.1098/rstb.2002.1066 · PMC1693068 | vérifiée | [T] |
| Seeley et Buhrman 1999 | Seeley, T. D. et Buhrman, S. C. (1999). Group decision making in swarms of honey bees. *Behavioral Ecology and Sociobiology*, 45(1), 19–31. | 10.1007/s002650050536 | vérifiée | [R] |
| Seeley et Buhrman 2001 | Seeley, T. D. et Buhrman, S. C. (2001). Nest-site selection in honey bees: how well do swarms implement the "best-of-N" decision rule? *Behavioral Ecology and Sociobiology*, 49(5), 416–427. | 10.1007/s002650000299 | vérifiée | [R] |
| Seeley et Visscher 2004 | Seeley, T. D. et Visscher, P. K. (2004). Quorum sensing during nest-site selection by honeybee swarms. *Behavioral Ecology and Sociobiology*, 56(6), 594–601 (en ligne le 2004-07-22). | 10.1007/s00265-004-0814-5 | vérifiée | [R]; moyennes 442 et 196 min [S] (Seeley et al. 2006) |
| Passino et Seeley 2006 | Passino, K. M. et Seeley, T. D. (2006). Modeling and analysis of nest-site selection by honeybee swarms: the speed and accuracy trade-off. *Behavioral Ecology and Sociobiology*, 59(3), 427–442 (en ligne le 2005-10-11). | 10.1007/s00265-005-0067-y | vérifiée | [R] + notes de bas de page (N_sim = 100); résultats chiffrés [S] (Seeley et al. 2006). Équations et paramètres **non lus** (paywall) |
| Seeley et al. 2012 | Seeley, T. D., Visscher, P. K., Schlegel, T., Hogan, P. M., Franks, N. R. et Marshall, J. A. R. (2012). Stop signals provide cross inhibition in collective decision-making by honeybee swarms. *Science*, 335(6064), 108–111 (en ligne le 2011-12-08). | 10.1126/science.1210361 | vérifiée | [R] texte principal; **SOM [T]** (seeley.som.pdf, 32 p.) |
| Pais et al. 2013 | Pais, D., Hogan, P. M., Schlegel, T., Franks, N. R., Leonard, N. E. et Marshall, J. A. R. (2013). A mechanism for value-sensitive decision-making. *PLoS ONE*, 8(9), e73216. | 10.1371/journal.pone.0073216 · PMC3759446 | corrigée | [T] (texte principal; Text S1 et code Matlab S1 non lus); critères A5 et A7 corrigés (section 10) |
| Seeley 2010 | Seeley, T. D. (2010). *Honeybee Democracy*. Princeton University Press, 280 p. (parution 2010-10-10, © 2011). | ISBN 9780691147215 · press.princeton.edu/books/hardcover/9780691147215/honeybee-democracy | vérifiée | [M] fiche éditeur seulement; contenu du livre **non lu** |
| Marshall et al. 2009 | Marshall, J. A. R., Bogacz, R., Dornhaus, A., Planqué, R., Kovacs, T. et Franks, N. R. (2009). On optimal decision-making in brains and social insect colonies. *Journal of the Royal Society Interface*, 6(40), 1065–1074. | 10.1098/rsif.2008.0511 · PMC2827444 | vérifiée | [T] (matériel électronique supplémentaire non lu) |

### 2.2 Références ajoutées (utiles au projet)

| Étiquette | Référence | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Sumpter et Pratt 2009 | Sumpter, D. J. T. et Pratt, S. C. (2009). Quorum responses and consensus decision making. *Phil. Trans. R. Soc. B*, 364(1518), 743–753. | 10.1098/rstb.2008.0204 · PMC2689713 | vérifiée | [T] (HTML PMC, équations MathML lues); lecture du paramètre r **[à confirmer]** (section 5) |
| Pratt et Sumpter 2006 | Pratt, S. C. et Sumpter, D. J. T. (2006). A tunable algorithm for collective decision-making. *PNAS*, 103(43), 15906–15910. | 10.1073/pnas.0604801103 · PMC1635101 | vérifiée | [T] (sans le SI) |
| Seeley et al. 2006 | Seeley, T. D., Passino, K. M. et Visscher, P. K. (2006). Group decision making in honey bee swarms. *American Scientist*, 94(3), 220 (mai-juin 2006; page de fin non vérifiée). | 10.1511/2006.59.220 | corrigée | [T] (vulgarisation par les auteurs); ordre des auteurs corrigé (section 10) |
| Seeley et Visscher 2003 | Seeley, T. D. et Visscher, P. K. (2003). Choosing a home: how the scouts in a honey bee swarm perceive the completion of their group decision making. *Behav. Ecol. Sociobiol.*, 54(5), 511–520. | 10.1007/s00265-003-0664-6 | vérifiée | [R] |
| Seeley 2003 | Seeley, T. D. (2003). Consensus building during nest-site selection in honey bee swarms: the expiration of dissent. *Behav. Ecol. Sociobiol.*, 53(6), 417–424. | 10.1007/s00265-003-0598-z | corrigée | [R]; résultat 23/27 sur 6 essaims (section 10) |
| Britton et al. 2002 | Britton, N. F., Franks, N. R., Pratt, S. C. et Seeley, T. D. (2002). Deciding on a new home: how do honeybees agree? *Proc. R. Soc. B*, 269(1498), 1383–1388. | 10.1098/rspb.2002.2001 · PMC1691030 | vérifiée | [M] (Crossref); modèle repris [S] (Franks et al. 2002, Marshall et al. 2009) |
| Reina et al. 2017 | Reina, A., Marshall, J. A. R., Trianni, V. et Bose, T. (2017). Model of the best-of-N nest-site selection process in honeybees. *Physical Review E*, 95, 052411. | 10.1103/PhysRevE.95.052411 (confirmé par Crossref et par la *journal_ref* d'arXiv) · arXiv:1611.07575 | vérifiée | [T] (arXiv v2) |
| List et al. 2009 | List, C., Elsholtz, C. et Seeley, T. D. (2009). Independence and interdependence in collective decision making: an agent-based model of nest-site choice by honeybee swarms. *Phil. Trans. R. Soc. B*, 364(1518), 755–762. | 10.1098/rstb.2008.0277 · PMC2689716 | vérifiée | [R] |
| Mallon et al. 2001 | Mallon, E. B., Pratt, S. C. et Franks, N. R. (2001). Individual and collective decision-making during nest site selection by the ant *Leptothorax albipennis*. *Behav. Ecol. Sociobiol.*, 50(4), 352–359. | 10.1007/s002650100377 | corrigée | [R] |
| Masuda et al. 2015 | Masuda, N., O'Shea-Wheller, T. A., Doran, C. et Franks, N. R. (2015). Computational model of collective nest selection by ants with heterogeneous acceptance thresholds. *Royal Society Open Science*, 2(6), 140533. | 10.1098/rsos.140533 | vérifiée | [T] partiel (via Europe PMC, résumé automatisé) |
| Gray et al. 2018 | Gray, R., Franci, A., Srivastava, V. et Leonard, N. E. (2018). Multiagent decision-making dynamics inspired by honeybees. *IEEE Transactions on Control of Network Systems*, 5(2), 793–806 (juin 2018). | 10.1109/TCNS.2018.2796301 · arXiv:1711.11578 | corrigée | [T] partiel (introduction, section II) |
| Reina et al. 2015 | Reina, A., Valentini, G., Fernández-Oto, C., Dorigo, M. et Trianni, V. (2015). A design pattern for decentralised decision making. *PLoS ONE*, 10(10), e0140950. | 10.1371/journal.pone.0140950 | vérifiée | [R] |
| Valentini et al. 2017 | Valentini, G., Ferrante, E. et Dorigo, M. (2017). The best-of-n problem in robot swarms: formalization, state of the art, and novel perspectives. *Frontiers in Robotics and AI*, 4, 9. | 10.3389/frobt.2017.00009 | vérifiée | [R] |
| Ghaffari et al. 2015 | Ghaffari, M., Musco, C., Radeva, T. et Lynch, N. (2015). Distributed house-hunting in ant colonies. *Proceedings of the 2015 ACM Symposium on Principles of Distributed Computing* (PODC '15), 57–66. | 10.1145/2767386.2767426 · arXiv:1505.03799 | corrigée | [R] |
| Du et al. 2024 | Du, Y., Li, S., Torralba, A., Tenenbaum, J. B. et Mordatch, I. (2024). Improving factuality and reasoning in language models through multiagent debate. *Proceedings of Machine Learning Research*, 235 (ICML 2024), 11733–11763. Préimpression : arXiv, 2023-05-23. | proceedings.mlr.press/v235/du24e.html · arXiv:2305.14325 | corrigée | [R] |
| Kaesberg et al. 2025 | Kaesberg, L. B., Becker, J., Wahle, J. P., Ruas, T. et Gipp, B. (2025). Voting or consensus? Decision-making in multi-agent debate. *Findings of the Association for Computational Linguistics: ACL 2025*, 11640–11671. | 10.18653/v1/2025.findings-acl.606 · arXiv:2502.19130 | vérifiée | [R] |
| Weng et al. 2025 | Weng, Z., Chen, G. et Wang, W. (2025). Do as we do, not as you think: the conformity of large language models. *ICLR 2025* (Oral). | arXiv:2501.13381 | vérifiée | [R] |
| Cemri et al. 2025 | Cemri, M., Pan, M. Z., Yang, S. et al. (2025). Why do multi-agent LLM systems fail? arXiv:2503.13657. Les 14 modes, les 3 catégories et κ = 0,88 sont identiques en v1 et en v3; la v3 (2025-10-26) renomme les catégories et ajoute MAST-Data (plus de 1600 traces). Version lue par le dossier non consignée **[à confirmer]**. | arXiv:2503.13657 | vérifiée | [R] |
| Pratt 2005b | Pratt, S. C. (2005b). Behavioral mechanisms of collective nest-site choice by the ant *Temnothorax curvispinosus*. *Insectes Sociaux*, 52(4), 383–392. | 10.1007/s00040-005-0823-z | corrigée | [R] |
| Niven 2012 | Niven, J. E. (2012). Behavior. How honeybees break a decision-making deadlock. *Science*, 335(6064), 43–44. | 10.1126/science.1216563 | corrigée | [R] |
| Visscher 2007 | Visscher, P. K. (2007). Group decision making in nest-site selection among social insects. *Annual Review of Entomology*, 52, 255–275. | 10.1146/annurev.ento.51.110104.151025 | corrigée | [R] |
| Zhao et al. 2021 | Zhao, J., Su, L. et Lynch, N. (2021). Lack of quorum sensing leads to failure of consensus in *Temnothorax* ant emigration. *Stabilization, Safety, and Security of Distributed Systems* (SSS 2021), LNCS, 209–228. | 10.1007/978-3-030-91081-5_14 | corrigée | [R] (résumé seulement; section 9.11) |
| Visscher et Camazine 1999 | Visscher, P. K. et Camazine, S. (1999). Œuvre citée en seconde main par Franks et al. 2002 (46 éclaireuses; 41 %, 13 %, 35 %); titre et revue non consignés dans le dossier. **[non vérifiée]** | — | non vérifiée | [S] (Franks et al. 2002) |

---

## 3. Modèles, équations et paramètres

Notation commune (Seeley et al. 2012, Pais et al. 2013) : Ψ_A, Ψ_B = proportions d'éclaireuses engagées pour A et B; Ψ_U = 1 − Ψ_A − Ψ_B non engagées; γ découverte, α abandon spontané, ρ recrutement, σ inhibition croisée (signal d'arrêt), δ commutation directe.

### M1 — Seeley et al. 2012, modèle à signal d'arrêt ciblé [T, SOM]

Emplacement : SOM, « SOM Text », sous-sections *Microscopic, Individual-level Model*, *Indiscriminate Stop-signal Model*, *Discriminate Stop-signal Model*; Fig. S1–S4.

Le modèle est dérivé d'une équation maîtresse par développement de van Kampen (terme d'ordre N^1/2). Trois variantes, toutes lues :

**(a) Commutation directe** (reprise de Marshall et al. 2009, Fig. 4) — réactions U→A (γ_A), A→U (α_A), A+U→A+A (ρ_A), A+B→A+A (δ_A) :

```
dΨA/dt = γA(1−ΨA−ΨB) − ΨA[αA − ρA(1−ΨA−ΨB) + (δB−δA)ΨB]
dΨB/dt = γB(1−ΨA−ΨB) − ΨB[αB − ρB(1−ΨA−ΨB) + (δA−δB)ΨA]
```

Avec α = 0 : convergence asymptotique vers un DDM sur la droite Ψ_A + Ψ_B = 1. Avec α > 0 et options égales : point fixe symétrique stable pour **tous** les paramètres (interblocage) :
Ψ_A^s = Ψ_B^s = [ρ − α − 2γ + √((ρ−α−2γ)² + 8γρ)] / (4ρ).

**(b) Signal d'arrêt non ciblé** — A+B →(½σ_A) A+U, A+A →(½σ_A) A+U, etc. :

```
dΨA/dt = γA(1−ΨA−ΨB) − ΨA[αA − ρA(1−ΨA−ΨB) + ½(σA ΨA + σB ΨB)]
```

Options égales : point fixe symétrique toujours stable → **interblocage persistant** (Fig. S2 : γ = 3, α = 1/3, ρ = 3, σ = 1).

**(c) Signal d'arrêt ciblé (inhibition croisée)** — A+B →(σ_A) A+U et B+A →(σ_B) B+U :

```
dΨA/dt = γA(1−ΨA−ΨB) − ΨA[αA − ρA(1−ΨA−ΨB) + σB ΨB]
dΨB/dt = γB(1−ΨA−ΨB) − ΨB[αB − ρB(1−ΨA−ΨB) + σA ΨA]
```

- Options égales, avant bifurcation : Ψ_A^s = Ψ_B^s = [ρ − α − 2γ + √((ρ−α−2γ)² + 4γ(2ρ+σ))] / (2(2ρ+σ)).
- **Seuil de bifurcation** (si ρ > α) : **σ\* = 4αγρ / (ρ − α)²**. Au-delà, le point symétrique devient un col; deux attracteurs stables apparaissent.
- Points fixes après bifurcation, réécrits en Ψ par l'auteur du dossier [I, cohérent avec la SOM et vérifié numériquement en section 5] : Ψ_U\* = α/ρ, Ψ_A + Ψ_B = 1 − α/ρ, Ψ_A Ψ_B = γα/(ρσ), donc Ψ_A − Ψ_B = ±√((ρ−α)² − 4αγρ/σ) / ρ.
- Paramètres publiés des figures : Fig. S3A (avant) γ = 3, α = 1/3, ρ = 3, σ = 1; Fig. S3B (après) σ = 10; Fig. S4 (options inégales) ⟨γ⟩ = 3, Δγ = −1, ⟨α⟩ = 1/3, ⟨ρ⟩ = 3, ⟨σ⟩ = 10, Δα = Δρ = Δσ = 0; Fig. S1 (commutation directe) A : γ_A = 3, γ_B = 6, α = 0, ρ_A = 3, ρ_B = 6, δ_A = 1, δ_B = 2; C : γ = 3, α = 1/3, ρ = 3, δ = 1.
- Pour Fig. S3 : σ\* = 1,6875 [I, calcul].

Protocole expérimental (SOM, *Materials and Methods*) : observations initiales sur 20 danseuses de chacun de deux essaims naturels (Ithaca, 2009 et 2011) et trois essaims artificiels (2010); expérience sur l'île Appledore : deux essais avec deux nichoirs identiques (40 L, entrée 15 cm², à 250 m de l'essaim, 40 m l'un de l'autre) et deux essais avec un seul nichoir; éclaireuses marquées jaune ou rose selon le nichoir; environ 2 % des émettrices non identifiées. Les **proportions de signaux ipsi/contra** du texte principal **n'ont pas été lues** (accès sur inscription).

### M2 — Pais et al. 2013, version stochastique sensible à la valeur [T]

Emplacement : section *Model*, Éq. 1–2; *Results*, Éq. 3–5; Fig. 1–6.

Éq. 1 (décodée de l'extraction PDF, dont la police symbole code γ = « c », α = « a », ρ = « r », σ = « s », Ψ = « y »; forme concordante avec M1c) :

```
dΨA = [γA ΨU − ΨA(αA − ρA ΨU + σB ΨB)] dt + k·√(ΨU² + ΨA² + ΨU²ΨA²) dWA
dΨB = [γB ΨU − ΨB(αB − ρB ΨU + σA ΨA)] dt + k·√(ΨU² + ΨB² + ΨU²ΨB²) dWB
```

- Paramétrage : **γ_i = ρ_i = v_i, α_i = 1/v_i**; σ = σ_A = σ_B **indépendant de la valeur**, sans bruit (« As in previous work we set… », section *Model*).
- k : intensité du bruit sensoriel (k = 0 pour l'analyse déterministe). Bruit sensoriel seulement; le bruit intrinsèque de population finie est explicitement hors portée (équation maîtresse).
- Décision : quand une population atteint un seuil de quorum (variable); Fig. 5 : seuils Ψ_A = Ψ_B = 0,7.
- Éq. 2 (variété lente, décodage à confirmer sur le PDF) : Ψ_A Ψ_B = (2v̄/σ) · Ψ_U(1+Ψ_A)(1+Ψ_B) / (3 − Ψ_U), indépendante de Δv.
- Éq. 3 : dx = (a + bx) dt + c dW (OU si a = 0, b ≠ 0; DDM si b = 0).
- **Éq. 4 : σ\* = 4v³ / (v² − 1)²** (options égales, fourche). Concorde avec M1c en posant γ = ρ = v, α = 1/v [I, vérifié algébriquement et numériquement]. Restitué aussi par Reina et al. 2017 (Éq. B3, écrit (1−v²)²). Pour v grand, σ\* ≈ 4/v [I]; Gray et al. 2018 le décrit comme « inversement proportionnel » à la valeur moyenne.
- **Éq. 5 (loi de Weber) : Δv/v̄ = K**, où K croît avec σ (Fig. 4, droite).
- Fig. 3 : bruit k = 0,05; deux options égales et faibles en interblocage jusqu'à la découverte d'une troisième, supérieure, à t = 30, qui est choisie. Le seuil de décision 0,7 vient de la légende de la Fig. 5 : l'appliquer à la Fig. 3 est une inférence de ce dossier [I] **[à confirmer]**.
- Fig. 4 (gauche) : v̄ = 4.
- Fig. 5 : fourche (Δv = 0), nœud-col (Δv ≠ 0), hystérésis en Δv (sauts aux replis de la courbe en S, vers Δv ≈ ±0,5, lecture graphique [I]), ensemble équivalent à une catastrophe fronce (*cusp*). Paramètres lus sur la figure elle-même (vérification indépendante) : v̄ = 4 dans les trois panneaux; Δv = 0 (gauche); Δv = 0,1 (milieu); σ = 4 (droite, hystérésis).
- Fig. S3 : rampe de σ dans le temps pour briser un interblocage (k = 0,05).
- Code Matlab S1 et Text S1 disponibles comme matériel supplémentaire (non téléchargés).

Mise en garde (Reina et al. 2017, Annexe B, [T]) : les valeurs doivent respecter v ≥ 1 pour que les états restent positifs **[à confirmer]** (restriction non retrouvée dans le texte de Reina et al. 2017 par la vérification indépendante); et avec ce paramétrage, **pour N = 3 options égales, aucun σ ≥ 0 ne brise l'interblocage**. Reina et al. 2017 propose γ_i = k v_i, α_i = k/v_i, ρ_i = h v_i, β_ij = h v_i et le paramètre de contrôle r = h/k.

### M3 — Modèle d'abeille de Britton et al. 2002 (forme de Franks et al. 2002) [S via T]

Emplacement : Franks et al. 2002, légende de la Fig. 6a; paramètres en légende de la Fig. 7. X = neutres, Y_i = danseuses pour i, Z_i = informées non dansantes. Décodage des symboles validé par les étiquettes de la Fig. 6a (β_i X Y_i, γ_i Y_i, δ_i β_i Y_i Z_i, α_i β_j Y_j Z_i) :

```
dX/dt  = −β1 X Y1 − β2 X Y2
dY1/dt =  β1 X Y1 − γ1 Y1 + δ1 β1 Y1 Z1 + α2 β1 Y1 Z2
dY2/dt =  β2 X Y2 − γ2 Y2 + δ2 β2 Y2 Z2 + α1 β2 Y2 Z1
dZ1/dt =  γ1 Y1 − δ1 β1 Y1 Z1 − α1 β2 Y2 Z1
dZ2/dt =  γ2 Y2 − δ2 β2 Y2 Z2 − α2 β1 Y1 Z2
```

- Fig. 7 : β1 = 1,0, β2 = 1,2, γ = 0,3, δ = 0,5 (site 2 légèrement supérieur, découvert plus tard). (a) α = δ = 0,5 : le consensus bascule toujours vers le site 2, quel que soit le retard. (b) α = 0,7 : pas de consensus (impasse).
- Interprétation publiée : α = δ correspond à des abeilles retraitées qui suivent les danses **au hasard**, sans préférence (données de Visscher et Camazine 1999 **[non vérifiée]** : sur 46 éclaireuses, 41 % suivent des danses du même site, 13 % de l'autre, 35 % des deux — [S] Franks et al. 2002).

### M4 — Modèle de fourmi de Pratt et al. 2002 (forme de Franks et al. 2002) [S via T]

Emplacement : Franks et al. 2002, légende de la Fig. 6b; paramètres en légende de la Fig. 8. X = chercheuses, Z_i = évaluatrices du site i, Y_i = recruteuses, B_0 = passives au vieux nid, B_i = passives au site i, T = seuil.

```
dX/dt  = −(μ1+μ2) X − λ1 I(Y1,X) − λ2 I(Y2,X)
dZ1/dt =  μ1 X + λ1 I(Y1,X) − ρ12 Z1 − k1 Z1
dZ2/dt =  μ2 X + λ2 I(Y2,X) + ρ12 Z1 − k2 Z2
dY1/dt =  k1 Z1 − ρ12 Y1
dY2/dt =  k2 Z2 + ρ12 Y1
dB1/dt =  φ1 J(Y1,B0)
dB2/dt =  φ2 J(Y2,B0)
I(Yi,X)  = Yi si Yi < T et X > 0; 0 sinon      (tandems)
J(Yi,B0) = 0 si Yi < T ou B0 = 0; Yi sinon      (transports)
```

- Les comparateurs (< , >) sont absents de l'extraction PDF; ils sont rétablis d'après la Fig. 6b (« Y1 < T → tandem », « Y1 > T → transport ») [I].
- Fig. 8 : μ1 = μ2 = 0,013; λ1 = λ2 = 0,033; φ1 = φ2 = 0,099; T = 10. (a) k1 = 0,016, k2 = 0,020, ρ12 = 0,008 → pas de scission. (b) k1 = 0,019, k2 = 0,020, ρ12 = 0,004 → transports vers les deux sites (scission). Unités : par fourmi par minute; axe du temps 0–120 min; axe « ants at site » jusqu'à 250.
- Les symboles φ et ρ12 de la légende sont décodés par recoupement avec les étiquettes de la Fig. 6b et avec Masuda et al. 2015, qui attribue à Pratt et al. 2002 un recrutement par tandem de 0,033 min⁻¹, des conversions évaluatrice → recruteuse de 0,015 (site médiocre) et 0,02 min⁻¹ (bon site) et une commutation de 0,008 min⁻¹ [S]. Écart à noter : 0,015 (Masuda) contre 0,016 (Franks, Fig. 8a).
- Effectif initial (X(0), B_0(0)) **non donné** dans Franks et al. 2002 : à prendre dans Pratt et al. 2002.
- Points clés (Franks et al. 2002, [T]) : la qualité est codée par la **latence** avant recrutement (1/k_i), pas par le taux de recrutement (λ identique); le recrutement est individuel (un tandem = un suiveur), donc linéaire en Y_i, pas en X·Y_i comme la danse.

### M5 — Versions stochastiques de Marshall et al. 2009 [T]

Emplacement : sections 4 et 6, Éq. 4.1, 6.1–6.6; Fig. 4–5. Notations : n = taille de la population, s = n − y1 − y2 non engagées, q_i découverte, r′_i recrutement, r_i commutation, k_i déclin, cη bruit blanc.

- Usher–McClelland (4.1) : ẏ1 = I1 + cη1 − k y1 − w y2; ẏ2 = I2 + cη2 − k y2 − w y1. Optimal (≈ DDM) si w = k, tous deux grands.
- Fourmi (6.1–6.2) : r′_i(s) = r′_i + cη si s > 0, 0 sinon;
  ẏ1 = (n−y1−y2)(q1 + cη_q1) + y1 r′1(s) + y2(r2 + cη_r2) − y1(r1 + cη_r1) − y1(k1 + cη_k1) (et symétrique). Seulement la phase avant quorum; sans classe d'évaluatrices. Optimalité possible seulement si déclin et commutation dépendent **des deux** qualités (connaissance globale, jugée irréaliste).
- Abeille, commutation indirecte (6.3) : ẏ1 = (n−y1−y2)(q1 + cη) − y1(k1 + cη) + y1(n−y1−y2)(r′1 + cη). Ne se réduit pas au DDM.
- Abeille, commutation directe (6.4) : ẏ1 = (n−y1−y2)(q1 + cη) + y1(n−y1−y2)(r′1 + cη) − y1 k + y1 y2 (r1 − r2 + cη_r1 − cη_r2) (et −y1y2(…) pour ẏ2).
- Avec k = 0 : x2 → n/√2 et (6.5) ẋ1 = (n²/2 − x1²)((r1 − r2)/√2 + cη); par changement de variable (6.6) ẋ = A + cη, A = (r1 − r2)/√2 : **DDM, asymptotiquement optimal**.
- Section 7 / Fig. 5 : r1 − r2 = 2, k balayé de 0 à 1; le temps de décision moyen (moyenné sur les scénarios de découverte favorables ou défavorables) est minimal à **k = 0**. Valeurs de n, c, q_i, r′_i dans le matériel supplémentaire, **non lu**.

### M6 — Modèle de réponse de quorum de Sumpter et Pratt 2009 [T]

Emplacement : section 4(a)–(d), Éq. 4.1–4.2, Fig. 3–6 (MathML lu directement).

- n individus non engagés; chacun trouve une des deux options avec probabilité r par pas de temps; s'engage à l'arrivée avec probabilité
  **P_X(x) = p_x · [a + (m − a) · x^k / (T^k + x^k)]** (4.1), x = nombre déjà engagé à X; réponse linéaire de référence p_x[a + (m − a) x/(2T)] (4.2).
- Réponse de quorum ssi k ≥ 2 (ou k > 1 si on retient le point d'inflexion).
- Simulation publiée (section 4b–c, Fig. 4) : n = 40, r = 0,02, p_x = 1, p_y = 0,5, T = 10, a = 0,1, m = 0,9; 1000 simulations. k = 1 : **75,5 %** choisissent X, durée **253,7 ± 64,0** pas; k = 9 : **83,3 %**, **307,8 ± 71,0** pas. Choix indépendant attendu : 66,7 %. Condorcet (40 votants, erreur 1/3) : erreur de majorité 3,33 %, contre environ 10 % pour les meilleurs quorums.
- Fig. 5 : pour k = 4 ou 9, vitesse maximale à T = 0, justesse maximale vers T ≈ 10; plage T ≈ 5–15 robuste.
- Colonies de *Temnothorax* : « typiquement pas plus de 100–200 individus » (section 3b).

### M7 — Modèle à agents de Pratt et al. 2005 et sa réutilisation (Pratt et Sumpter 2006)

- Pratt et al. 2005 [R] : paramètres individuels estimés sur des émigrations filmées de fourmis marquées vers un seul nid (bon ou médiocre); le modèle reproduit le minutage et la distribution des comportements, mais prédit mal le **degré de scission**; il fait émerger une variabilité individuelle malgré des paramètres identiques. **[non vérifiée]** : la vérification indépendante n'a pu consulter aucun résumé de Pratt et al. 2005; ce contenu, dont la « mauvaise prédiction du degré de scission » et la « variabilité individuelle émergente », reste à confirmer.
- Structure [S, Pratt et Sumpter 2006] : **19 états comportementaux, 44 paramètres**, temps discret, implémenté en Objective-C.
- Pratt et Sumpter 2006 [T] (espèce : ***T. curvispinosus***, pas *albipennis*) : quorum estimé par la fonction de Hill Y = P^k / (Quorum^k + P^k) (Y = proportion de transports, P = population du site). Paramètres balayés : Search, Accept (taux médiocre = 0,52 × taux bon nid), Quorum; 100 simulations par combinaison.
  - Empirique (18 colonies) : Quorum **5,7 ± 0,5** (forcé) contre **12,7 ± 0,6** (non forcé); fraction dans le bon nid **65 ± 32 %** contre **90 ± 18 %** (Wilcoxon W = 67, P < 0,05); vitesse W = 252, P < 0,0001.
  - Prédit (1000 simulations par condition) : **87 ± 77 min et 84 ± 11 %** (forcé) contre **565 ± 314 min et 97 ± 7 %** (non forcé).
  - Un quorum de 11,3 améliore la justesse de 40,7 % par rapport à un quorum nul, pour un effet de 5,7 % seulement sur la vitesse.
  - Incohérence interne de la source (vérification indépendante) : la Discussion place le quorum de 11,3 en émigration non forcée, alors que la Fig. 4 en donne 12,7 ± 0,6. Signalée, non corrigée.

### M8 — Modèle de Passino et Seeley 2006 (résultats seulement)

- Modèle stochastique en temps discret (Seeley et al. 2006 [T]); N_sim = 100 par cas (note de bas de page Springer [T]).
- Résultats [S, Seeley et al. 2006] : quorum de bon compromis **15 à 20 abeilles**; réduction des danses de bon compromis **15 à 20 circuits par visite**, à comparer à la réduction observée d'environ 15 circuits par visite. Réduction plus rapide → décision plus lente; plus lente → **décisions scindées** fréquentes.
- Équations et tableau des paramètres **non lus**.

### M9 — Extension à N options (Reina et al. 2017) [T]

dx_i/dt = γ_i x_u − α_i x_i + ρ_i x_u x_i − Σ_j x_j β_ji x_i (Éq. 1). Pour N = 2 : seuil général β = 4αγρ/(ρ−α)² (Éq. B2, identique à M1c); valeur : β = 4v³/(1−v²)² (Éq. B3). Pour N = 3 avec le paramétrage de Pais : interblocage pour tout β ≥ 0 (Éq. B4). Diagramme de stabilité à trois phases (I interblocage, II coexistence, III décision) en fonction de r = h/k et v (Fig. 1, exemple v = 5).

---

## 4. Résultats cibles et critères d'acceptation

Conventions : « runs » = répétitions indépendantes à graines différentes; IC = intervalle de confiance binomial ou bootstrap à 95 %. Les critères **théoriques** visent la réplication d'un modèle publié; les critères **empiriques** visent l'accord qualitatif ou d'ordre de grandeur, vu les petits effectifs.

### 4.1 Abeille (*Apis mellifera*)

| ID | Résultat publié (source, emplacement) | Grandeur mesurée | Critère d'acceptation |
|---|---|---|---|
| A1 | Seuil de fourche σ\* = 4αγρ/(ρ−α)² (Seeley et al. 2012 SOM, *Discriminate Stop-signal Model*) | σ estimé où \|Ψ_A − Ψ_B\| à l'équilibre devient > 10⁻³ | Pour (γ, α, ρ) = (3, 1/3, 3) : σ̂\* ∈ [1,654; 1,721] (±2 % de 1,6875). Balayage σ par pas ≤ 0,01; intégration déterministe jusqu'à t = 500; 2 conditions initiales perturbées (±10⁻⁴). |
| A2 | Équilibres Fig. S3 (Seeley et al. 2012 SOM) | (Ψ_A, Ψ_B) à t = 200 | σ = 1 : Ψ_A = Ψ_B = 0,4585 ± 10⁻³. σ = 10 : {0,8497; 0,0392} ± 10⁻³ (valeurs [I], section 5). |
| A3 | Signal non ciblé → interblocage (Seeley et al. 2012 SOM, Fig. S2) | \|Ψ_A − Ψ_B\| à t = 500 | < 10⁻³ pour σ ∈ {0,1; 1; 10; 100}, γ = 3, α = 1/3, ρ = 3, perturbation initiale 10⁻². |
| A4 | σ\*(v) = 4v³/(v²−1)² (Pais et al. 2013 Éq. 4, Fig. 2) | σ̂\* par détection numérique | v ∈ {1,5; 2; 4; 10} : écart ≤ 2 % aux valeurs analytiques 8,640; 3,556; 1,138; 0,408 [I]. Intégration déterministe, γ = ρ = v, α = 1/v. |
| A5 | Interblocage adaptatif puis choix d'une 3ᵉ option supérieure découverte à t = 30 (Pais et al. 2013 Fig. 3, k = 0,05) | Option qui franchit en premier le seuil 0,7 (seuil de la légende de la Fig. 5, appliqué ici à la Fig. 3 par inférence [I] **[à confirmer]**) | Qualitatif tant que Text S1 n'est pas lu : option 3 choisie dans ≥ 90 % de 200 runs; aucune des deux options faibles ne franchit le seuil avant t = 30 dans ≥ 90 % des runs. Valeurs v et σ à tirer de Text S1. |
| A6 | Loi de Weber : Δv_min/v̄ = K(σ), K croissant avec σ (Pais et al. 2013 Éq. 5, Fig. 4) | Δv_min (unicité de l'attracteur) en fonction de v̄ | Régression linéaire sur la partie asymptotique : R² ≥ 0,99; K strictement croissant sur au moins 3 valeurs de σ. |
| A7 | Hystérésis en Δv, sauts vers ±0,5 (replis lus sur la figure [I]) (Pais et al. 2013 Fig. 5 droite; v̄ = 4, σ = 4) | Δv de saut à la montée et à la descente | Avec v̄ = 4 et σ = 4 (lus sur la Fig. 5) : boucle présente (sauts asymétriques); \|Δv_saut\| ∈ [0,4; 0,6]. Critère non conditionnel à Text S1. |
| A8 | Modèle de Britton (Franks et al. 2002 Fig. 7) : α = δ = 0,5 → consensus sur le site 2; α = 0,7 → impasse | Y2/(Y1+Y2) à t = 200 (unités arbitraires) | Avec β1 = 1,0, β2 = 1,2, γ = 0,3, δ = 0,5 et introduction du site 2 retardée de {0; 20; 50} : α = 0,5 → ratio > 0,95 pour les trois retards; α = 0,7 → ratio < 0,95 et Y1 > 0,05 (coexistence). Conditions initiales à documenter (non publiées dans Franks et al. 2002). |
| A9 | Retard de décollage par dispersion du quorum : 442 min (5 nichoirs) contre 196 min (1 nichoir), moyennes sur 4 essaims (Seeley et Visscher 2004 [R] + Seeley et al. 2006 [T]) | Ratio temps-jusqu'au-quorum (5 cavités / 1 cavité) dans un modèle à agents, quorum = 15 présentes | Ratio ∈ [1,5; 3,5] (publié 2,26; tolérance large car n = 4); 200 runs par traitement; IC du ratio par bootstrap. |
| A10 | Quorum, pas consensus : *piping* quand ≥ 10–15 abeilles à un nichoir; consensus des danseuses ni nécessaire ni suffisant (Seeley et Visscher 2003 [R]) | Fraction des runs où le quorum est atteint alors que ≥ 2 sites ont encore des danseuses | > 0 et rapportée avec IC; 500 runs; quorum = 15. |
| A11 | Meilleur-de-5 : 4 essaims sur 5 choisissent le site supérieur (Seeley et Buhrman 2001 [R]) | P(meilleur site) avec 1 site supérieur et 4 moyens | P̂ ≥ 0,6 sur 500 runs (l'IC binomial de 4/5 va d'environ 0,28 à 0,99 : cible faible, sert de garde-fou). |
| A12 | Compromis du modèle de Passino : quorum optimal 15–20; réduction 15–20 circuits/visite (Passino et Seeley 2006 [S]) | Position du compromis (temps minimal sous contrainte P(meilleur) ≥ 0,9) | Quorum optimal ∈ [10; 25] et réduction optimale ∈ [10; 25] circuits/visite; 100 runs par point (comme N_sim publié). Conditionnel à la lecture du modèle. |
| A13 | Déclin linéaire des danses; 23 éclaireuses sur 27 (6 essaims) cessent de danser pour un site non choisi **avant** d'avoir suivi une danse pour un autre site (Seeley 2003 [R]) | Fraction des retraits « spontanés » | ≥ 0,7 dans un modèle à expiration (cible 23/27 = 0,85; IC binomial environ 0,66–0,96); 200 runs. |

### 4.2 Fourmi (*Temnothorax*)

| ID | Résultat publié (source, emplacement) | Grandeur mesurée | Critère d'acceptation |
|---|---|---|---|
| F1 | Quorum médian plus bas en conditions dures : 3 contre 6 (vent, Exp. 1, N = 16), 4,5 contre 7,5 (acide formique, Exp. 2, N = 14), 2 contre 5 (choix, Exp. 3, N = 16); Wilcoxon p < 0,005 (Franks et al. 2003, Résultats, Fig. 1) | Entrée du modèle (paramètre T) | Pas un résultat à faire émerger : ces valeurs fixent les deux niveaux de T à simuler (T_dur ≈ 0,4–0,6 × T_doux). |
| F2 | Décision plus rapide en conditions dures : 9 contre 12,5 min (Exp. 3, p < 0,05); 10,5 contre 11,5 (Exp. 1, n.s.); 8,5 contre 11,0 (Exp. 2, n.s.) (Franks et al. 2003, Fig. 2) | Temps découverte → premier transport, nids à 6 cm | Avec T = 2 contre T = 5 : réduction du temps médian entre 10 % et 50 % (publié 28 %); 500 runs par condition. |
| F3 | Plus de transports vers le nid médiocre en conditions dures (N = 11, p < 0,05, différence médiane 1); meilleur nid accepté en premier 31/32; les 32 essais (16 colonies × 2 conditions) finissent dans le meilleur nid en 1 h; les deux nids découverts avant tout transport dans 30/32 essais (Franks et al. 2003, Fig. 5) | Transports vers le médiocre; nid final | Transports vers le médiocre plus nombreux avec T bas (Mann-Whitney p < 0,05 sur 500 + 500 runs); nid final = meilleur dans ≥ 95 % des runs **dans les deux conditions**. La justesse se mesure donc en **erreurs transitoires**, pas en choix final. |
| F4 | Recrutement : 1/3 des ouvrières recrutent; transport 3 fois plus rapide que le tandem; tandems inversés après le basculement (Pratt et al. 2002 [R]) | Fraction des recruteuses; ratio des débits | Ratio transport/tandem = 3 (entrée); fraction émergente de recruteuses ∈ [0,23; 0,43]; 200 runs. |
| F5 | Quorum « d'environ 10–20 compagnes »; chaque éclaireuse ne recrute que « peut-être trois » autres par tandem (Franks et al. 2002, Conclusions [T], citant Pratt et al. 2002) | Nombre moyen de suiveuses par recruteuse avant quorum | ∈ [2; 4]; 200 runs. |
| F6 | Pas de scission (a) contre scission (b) dans le modèle ODE (Franks et al. 2002 Fig. 8) | B1(fin), B2(fin) | (a) B1(fin) ≤ 1 fourmi; (b) B1(fin) > 1 et B2(fin) > B1(fin). Intégration déterministe; effectifs initiaux à prendre dans Pratt et al. 2002. |
| F7 | Quorum par taux de rencontres : basculement au même taux de rencontres quelle que soit la taille du nid; population au basculement plus basse dans un petit nid; visites raccourcies d'environ 2 min après le basculement (Pratt 2005a [R]) | Taux de rencontres et population au basculement selon l'aire du nid | Taux au basculement invariant à ±15 % entre deux aires (rapport 1:2); population au basculement **croissante** avec l'aire (un nid plus petit fait basculer à une population plus basse); 200 runs par aire. Valeurs absolues non lues. |
| F8 | Accélérer (urgence) : 87 ± 77 min / 84 ± 11 % contre 565 ± 314 min / 97 ± 7 % (Pratt et Sumpter 2006, *T. curvispinosus*, 1000 simulations) | Durée, fraction dans le bon nid | Conditionnel aux paramètres du SI non lus : écart de justesse ≥ 5 points et rapport des durées ≥ 3 entre les deux régimes; 1000 runs. |
| F9 | Quorum 11,3 contre 0 : +40,7 % de justesse, +5,7 % de durée (Pratt et Sumpter 2006, Discussion); la Discussion place le quorum de 11,3 en émigration non forcée, la Fig. 4 donne 12,7 ± 0,6 : incohérence interne de la source, signalée, non corrigée | Gains relatifs | Gain de justesse ≥ 20 % et effet sur la durée ≤ 15 %; 1000 runs. |

### 4.3 Cibles communes (moteur générique)

| ID | Résultat publié | Grandeur | Critère |
|---|---|---|---|
| G1 | Sumpter et Pratt 2009, section 4(b) : 75,5 % (k = 1) et 83,3 % (k = 9) vers X; 253,7 ± 64,0 et 307,8 ± 71,0 pas | Fraction finale vers X; temps jusqu'à engagement de tous | 1000 runs, paramètres de M6 : fraction à ±2 points; moyenne du temps à ±10 %. Voir l'ambiguïté sur r en section 5 : **[à confirmer]**, la durée visée dépend de la lecture de r. |
| G2 | Marshall et al. 2009 Fig. 5 : temps moyen minimal à k = 0 (commutation directe, r1 − r2 = 2) | k minimisant le temps moyen | k̂ = 0 sur la grille {0; 0,1; …; 1}; ≥ 1000 runs par point; valeurs n, c, q à tirer du matériel supplémentaire. |

---

## 5. Pré-test numérique (exploratoire)

Script : [`p5_check_quorum.py`](../verifications-numeriques/p5_check_quorum.py) (Python, bibliothèque standard; `python p5_check_quorum.py`, environ 1 min). Ce qui a été fait :

- **M1c** (γ = 3, α = 1/3, ρ = 3) : σ\* = 1,6875. Euler (dt = 10⁻³, t = 200) : σ = 1 → (0,4585; 0,4585), égal à la formule analytique; σ = 10 → (0,0392; 0,8497), égal au point fixe dérivé en M1c. Près de σ\* (±5 %), la divergence est très lente (ralentissement critique) : allonger l'intégration pour A1.
- **M2** : l'identité 4v³/(v²−1)² = 4αγρ/(ρ−α)² avec γ = ρ = v, α = 1/v est vérifiée pour v ∈ {2; 4; 10} (3,556; 1,138; 0,408).
- **M6** (1000 runs) : en lisant r comme « probabilité de trouver **une** des deux options », la justesse concorde (75,9 % et 82,4 %) mais les durées sont environ 2 fois trop longues (554 et 647 pas). En lisant r comme « probabilité de trouver **chaque** option », on obtient 76,1 % / 274 ± 69 pas (k = 1) et 82,0 % / 326 ± 75 pas (k = 9), à moins de 8 % des valeurs publiées. Conclusion provisoire [I] du pré-test : la seconde lecture ajuste mieux; l'écart résiduel vient probablement de l'ordre de mise à jour dans un pas de temps (non précisé). **Mise à jour après vérification indépendante** : le texte de Sumpter et Pratt 2009 écrit que chacun des individus non engagés trouve *l'une des deux options* avec une probabilité constante r par pas de temps, libellé qui appuie la **première** lecture, celle que le pré-test écarte. Le libellé de la source et le meilleur ajustement numérique divergent : la lecture de r est **[à confirmer]** (code des auteurs, ou question aux auteurs).

Laissé de côté : A5–A13 et F2–F9 n'ont pas été simulés (il faut d'abord les paramètres manquants listés en section 9).

---

## 6. Visuels de vulgarisation

1. **Triangle U-A-B** (simplex de Pais et al. 2013, Fig. 1) : lignes de flux, variété lente, attracteurs pleins et cols vides; curseurs σ, v̄, Δv; le point rouge (état de l'essaim) glisse vers la variété puis le long d'elle. C'est le visuel central du projet : il montre la décision comme une bille dans un paysage qui se déforme.
2. **Diagramme de bifurcation** σ → Ψ_A − Ψ_B, avec la courbe σ\*(v) = 4v³/(v²−1)² en encart; zone grisée « interblocage adaptatif ». Bouton « rampe de σ » (Pais et al. 2013, Fig. S3).
3. **Écran partagé fourmi / abeille** (même moteur M6, deux habillages) :
   - fourmi : vieux nid détruit, deux nids à 6 cm, compteur de population avec jauge de quorum; sous le seuil, tandems (une fourmi menée par une autre), au-dessus, transports 3 fois plus rapides (une fourmi portée);
   - abeille : grappe avec danseuses colorées par site (longueur de danse ∝ qualité, −15 circuits par retour), éclairs au moment des coups de tête ciblés; compteur au nichoir avec ligne de quorum à 15 → *piping* → envol.
4. **Expérience des 5 nichoirs** (Seeley et Visscher 2004) : bouton qui divise un site en 5 cavités; chronomètre comparé aux moyennes 196 et 442 min.
5. **Frontière vitesse-justesse** : nuage (temps, justesse) pour T de 0 à 20 et k ∈ {1; 2; 4; 9} (Sumpter et Pratt 2009, Fig. 6); points empiriques de Franks et al. 2003 (médianes doux/dur) et de Pratt et Sumpter 2006 superposés.
6. **Loi de Weber** : droites Δv_min en fonction de v̄ pour trois σ (Pais et al. 2013, Fig. 4 droite).
7. **Hystérésis** : Δv qui oscille lentement; le système saute d'un attracteur à l'autre à des seuils différents à l'aller et au retour (Pais et al. 2013, Movie S4).
8. **Interrupteur « signal ciblé / non ciblé »** : avec options égales, le ciblé brise l'égalité, le non ciblé non (SOM Fig. S2 contre S3). C'est la démonstration la plus parlante pour l'analogie agentique.
9. **Carte comparative** fourmi / abeille / agents : taille (~100–200 contre ~10 000), signal (binaire + latence contre danse graduée), fin d'engagement (seulement si mieux contre expiration spontanée), freinage (aucun spontané contre retrait + signal d'arrêt), quorum (10–20 au nid, plus bas sous urgence, contre ~15 présentes, ~150 visiteuses).

---

## 7. Parallèles agentiques appuyés par des sources

Chaque parallèle sépare ce que dit la source de ce qui est inféré pour les agents.

1. **Accumulateurs en course vers un seuil.** Source : Seeley et al. 2012 (résumé) et Marshall et al. 2009 décrivent essaim et cerveau comme des populations qui intègrent des indices bruités jusqu'à un seuil. Inférence [I] : un système multi-agents LLM qui s'engage quand k agents sur n soutiennent une proposition implémente un quorum; T devient un paramètre réglable de vitesse/justesse (Franks et al. 2003, Sumpter et Pratt 2009). Appui côté LLM : Kaesberg et al. 2025 montre que le protocole de décision change à lui seul la performance (vote +13,2 % en raisonnement, consensus +2,8 % en connaissances).
2. **Indépendance avant interdépendance.** Source : Seeley et al. 2006 (chaque recrue inspecte elle-même le site avant de danser), List et al. 2009 (fiabilité issue de l'interaction indépendance/interdépendance), Sumpter et Pratt 2009 (Condorcet suppose l'indépendance; pensée de groupe). Côté LLM : Weng et al. 2025 mesure la conformité des LLM à la majorité (BenchForm). Inférence [I] : exiger qu'un agent revérifie la proposition (ré-exécute le test, relit la source) avant de l'endosser, au lieu de recopier l'avis majoritaire.
3. **Inhibition croisée ciblée, pas veto diffusé.** Source : SOM de Seeley et al. 2012 — un signal d'arrêt non ciblé laisse l'interblocage; seul le signal ciblé vers les partisans de l'option rivale le brise. Inférence [I] : la critique d'un agent doit viser les propositions rivales et désengager probabilistiquement leurs partisans, plutôt qu'un « stop » général. Appui robotique : Reina et al. 2015 (patron de conception micro-macro), Gray et al. 2018 (dynamique multi-agents avec fourche et commande adaptative de la bifurcation).
4. **Urgence réglable.** Source : Pais et al. 2013 (augmenter σ avec le temps pour forcer un choix entre options faibles), Franks et al. 2003 et Pratt et Sumpter 2006 (quorum et taux d'acceptation abaissés sous urgence). Inférence [I] : un délai de grâce qui abaisse le quorum ou monte l'inhibition à mesure que le budget (temps, jetons) s'épuise.
5. **Expiration contre persistance.** Source : Franks et al. 2002 — la fourmi ne cesse de recruter que si elle trouve mieux; l'abeille cesse spontanément (environ 80 % arrêtent après une danse, Seeley et al. 2006; déclin linéaire, Seeley 2003). Inférence [I] : TTL sur les endossements d'agents (expiration) contre engagement persistant révocable seulement par une meilleure proposition; le modèle de Passino prédit des décisions scindées si l'expiration est trop lente.
6. **Interblocage et défauts de terminaison.** Source : Cemri et al. 2025 (taxonomie MAST : 14 modes de défaillance en 3 catégories, dont la vérification de tâche; κ = 0,88, identiques en v1 et en v3 d'arXiv). Inférence [I] : l'interblocage symétrique de M1a/M1b est un candidat de mécanisme pour une partie de ces défaillances; à tester, pas à affirmer.
7. **Chorégraphie contre orchestration.** Source : Sumpter et Pratt 2009 rappelle que le remède de Janis à la pensée de groupe passe par des évaluateurs centralisés, ce qui exige un traitement d'information complexe; les insectes s'en passent par le quorum. Inférence [I] : juge LLM central (orchestration) contre quorum local (chorégraphie), comparables sur la même tâche.
8. **Formalisations algorithmiques.** Ghaffari et al. 2015 : borne inférieure Ω(log n) pour le consensus de déménagement et algorithme optimal O(log n). Valentini et al. 2017 : problème du meilleur-de-n avec qualité **et coût** d'échantillonnage par option, transposable au choix entre n plans d'agents de coûts d'évaluation différents. Du et al. 2024 : débat multi-agents qui converge vers une réponse commune.

---

## 8. Corrections et approximations de v3

1. **Nom d'espèce** : *Leptothorax albipennis* est devenu *Temnothorax albipennis*; les titres de 2001–2003 gardent *Leptothorax* (Pratt 2005a l'indique). v3 utilise « Temnothorax » partout : préciser l'ancien nom pour les citations.
2. **« Contenu du signal : intensité (scalaire) » pour la fourmi** : faux pour le déménagement de *Temnothorax*. Franks et al. 2002 décrit le recrutement comme un signal binaire « suis-moi » / « laisse-moi te porter »; la qualité passe par la **latence** avant recrutement (Mallon et al. 2001). Le scalaire (piste chimique) vaut pour le fourragement d'autres espèces.
3. **« Recrutement : suivi de piste, tandem »** : pour P5, pas de piste; tandem puis **transport** (portage), 3 fois plus rapide (Pratt et al. 2002), plus les tandems inversés.
4. **« Freinage : absence de retours » pour la fourmi** : ne s'applique pas au déménagement. Le frein fourmi est le **délai** (latence, tandem lent); il n'y a pas d'arrêt spontané (Franks et al. 2002). Le frein abeille comprend aussi le **déclin des danses** (Seeley 2003), absent de v3.
5. **« Signaux d'arrêt comme veto »** : inexact. Le signal d'arrêt désengage probabilistiquement un danseur rival (taux σ); il ne bloque rien d'un coup. Et un signal non ciblé ne brise pas l'égalité (SOM). Parler d'**inhibition croisée ciblée** ou de **désengagement ciblé**.
6. **« L'inhibition croisée débloque une égalité »** : vrai seulement si σ > σ\* = 4αγρ/(ρ−α)² et ρ > α. Avec le paramétrage de valeur, l'égalité entre deux options **faibles** est maintenue exprès (Pais et al. 2013); et pour **trois** options égales, le paramétrage de Pais ne la débloque jamais (Reina et al. 2017).
7. **« Interblocage quand on supprime l'inhibition croisée » (projet 6)** : à préciser. Sans inhibition ciblée, l'interblocage n'apparaît **qu'avec un déclin α > 0** (SOM, commutation directe); avec α = 0, le système diffuse (DDM) et finit par décider, lentement.
8. **« Compromis vitesse/justesse par le quorum »** : approximation. Franks et al. 2003 le montre chez *T. albipennis*, mais Pratt et Sumpter 2006 (*T. curvispinosus*) trouve que Search et Accept pèsent plus que le quorum sur la vitesse, et que le quorum améliore surtout la justesse. Et dans Franks et al. 2003, les erreurs sont **transitoires** (tous les essais finissent dans le meilleur nid) : définir la justesse en conséquence.
9. **« Quorum + inhibition croisée » pour l'essaim** : le quorum se mesure **au site** (environ 15 présentes, environ 150 visiteuses) et déclenche le *piping*, pas le choix lui-même; le consensus des danseuses n'est ni nécessaire ni suffisant (Seeley et Visscher 2003).
10. **Comparaison Franks et al. 2002** : bien attribuée. À compléter par les contrastes qu'elle donne vraiment : taille (≈100 contre ≈10 000), comparaison directe des sites (fréquente chez la fourmi, rare chez l'abeille), fin d'engagement (spontanée chez l'abeille seulement).
11. **Dates** : Seeley et al. 2012 est paru en ligne le 2011-12-08 (certains le citent 2011); Passino et Seeley 2006 est paru en ligne en 2005; Seeley 2010 porte un © 2011.
12. **Critère de rigueur de v3** (« reproduire un résultat publié pour chaque espèce ») : réalisable pour P5, mais côté abeille les cibles solides sont des résultats **de modèle** (A1–A8); les cibles empiriques (A9–A13) reposent sur 4 à 6 essaims et ne valent que comme garde-fous.
13. **Modèles manquants dans v3** : Britton et al. 2002, Marshall et al. 2009, Pais et al. 2013, Passino et Seeley 2006, Sumpter et Pratt 2009 et Reina et al. 2017 sont les vrais supports d'équations du projet; v3 ne cite que des travaux empiriques et « Pratt et al. 2005 ».

---

## 9. Questions ouvertes et ce qui permettrait de trancher

1. **Paramètres du modèle de Pratt et al. 2005** **[non vérifiée]** (44 paramètres) : non lus (accès ScienceDirect bloqué par CAPTCHA). Trancher : accès institutionnel au PDF, ou SI de Pratt et Sumpter 2006 (paramètres *T. curvispinosus*, autre espèce).
2. **Proportions ipsi/contra des signaux d'arrêt** (Seeley et al. 2012, texte principal) : non lues (inscription requise). Trancher : PDF de l'article.
3. **Text S1 et code Matlab de Pais et al. 2013** : valeurs de v, σ, k pour Fig. 3 et 6; à télécharger depuis PLoS ONE (libre). Pour la Fig. 5, v̄, Δv et σ se lisent sur la figure (A7).
4. **Équations et paramètres de Passino et Seeley 2006** : non lus; résultats connus seulement par la vulgarisation des auteurs.
5. **Matériel supplémentaire de Marshall et al. 2009** (n, c, q_i, r′_i de la Fig. 5) : non lu.
6. **Effectifs initiaux et décodage des symboles de Franks et al. 2002 Fig. 8** (φ, ρ12; 0,015 contre 0,016) : à confirmer dans Pratt et al. 2002.
7. **Valeur du quorum d'abeille** : « 10–15 ou plus » (Seeley et Visscher 2003), « 15 ou plus » et « 10 à 20 » (Seeley et al. 2006); la valeur citée dans *Honeybee Democracy* n'a pas été lue. Trancher : chapitre correspondant du livre et texte de Seeley et Visscher 2004.
8. **Mécanisme de détection du quorum chez l'abeille** : inconnu selon Seeley et al. 2006 (visuel, olfactif ou tactile); chez la fourmi, taux de rencontres (Pratt 2005a). Choix de modélisation : densité au site pour les deux, ou effectif pour l'abeille?
9. **Lecture de r dans Sumpter et Pratt 2009** **[à confirmer]** : le libellé de la source appuie « une des deux options »; le pré-test favorise « par option » (durées à moins de 8 %). Trancher : écrire aux auteurs ou chercher leur code.
10. **Nombres absolus de Pratt 2005a** (taux de rencontres au basculement, aires des nids) : non lus.
11. **Résultats de Zhao et al. 2021** (« Lack of quorum sensing leads to failure of consensus in *Temnothorax* ant emigration », *SSS 2021*, LNCS, pp. 209–228, DOI 10.1007/978-3-030-91081-5_14) : lieu de publication confirmé par la vérification indépendante; contenu vu par un résumé seulement [R]; utile pour le volet « pathologies » (projet 6).

---

## 10. Historique de vérification

**Vérification indépendante du 2026-10-01** (`recherche/verifications/p5-quorum.md`) : 34 références au tableau, plus Zhao et al. 2021 citée en section 9 (20 confirmées, 13 corrigées, 2 non vérifiables); aucune référence fausse ni inventée; les métadonnées de toutes les références munies d'un DOI sont exactes. Consolidation le même jour : corrections appliquées en place, sans changement de fond. La seule conclusion modifiée est la lecture de r (section 5). Les métadonnées corrigées ont été recoupées à la consolidation (Crossref, OpenAlex, API arXiv, page PMLR, résumés Springer de Seeley 2003 et de Seeley et Visscher 2004).

### 10.1 Corrections appliquées

*Contenu et paramètres*

1. F7 (Pratt 2005a) : sens de variation inversé. La population au basculement **croît** avec l'aire du nid (un nid plus petit fait basculer à une population plus basse, au même taux de rencontres).
2. A7 (Pais et al. 2013) : les paramètres de la Fig. 5 figurent sur la figure (v̄ = 4; Δv = 0 puis 0,1; σ = 4 pour l'hystérésis); le critère n'est plus conditionnel à Text S1. Les replis vers Δv ≈ ±0,5 sont une lecture graphique du vérificateur [I] (M2, A7, §9.3).
3. A5 (Pais et al. 2013) : le seuil 0,7 vient de la légende de la Fig. 5; son application à la Fig. 3 est une inférence [I], marquée **[à confirmer]** (M2, A5). Recoupé à la consolidation : la légende de la Fig. 3 ne donne que t = 30 et k = 0,05, et renvoie à Text S1 (§S.2) pour le modèle à trois options.
4. F3 (Franks et al. 2003) : « 32 colonies » devient 32 essais (16 colonies × 2 conditions); §8.8 ajusté.
5. Seeley 2003 : le résultat 23/27 repose sur 6 essaims; « 4 ou 5 essaims » devient « 4 à 6 » (synthèse 7, A13, §8.12).
6. Lecture de r (Sumpter et Pratt 2009) : le libellé de la source appuie la première lecture (l'une des deux options), que le pré-test écartait. La conclusion provisoire de la section 5 est mise à jour; lecture marquée **[à confirmer]** (section 5, G1, §9.9). Libellé recoupé à la consolidation sur le texte HTML de PMC.
7. Reina et al. 2017 : la restriction « v ≥ 1 » n'est pas retrouvée dans le texte : **[à confirmer]** (M2).
8. Pratt et al. 2005 : la « mauvaise prédiction du degré de scission » et la « variabilité individuelle émergente » restent **[non vérifiée]** (section 2, M7, §9.1).
9. Pratt et Sumpter 2006 : incohérence interne de la source (quorum de 11,3 dans la Discussion contre 12,7 ± 0,6 en Fig. 4) signalée en M7 et F9, non corrigée.

*Références*

10. Seeley et al. 2006 : ordre des auteurs Seeley, Passino, Visscher (page de l'éditeur et Crossref); la version précédente écrivait Seeley, Visscher, Passino.
11. Mallon et al. 2001 : 50(4), 352–359, DOI 10.1007/s002650100377.
12. Pratt et al. 2002 : numéro 52(2). Seeley et Visscher 2004 : numéro 56(6), en ligne le 2004-07-22.
13. Pratt 2005b : 52(4), DOI 10.1007/s00040-005-0823-z.
14. Gray et al. 2018 : *IEEE Trans. Control Netw. Syst.*, 5(2), 793–806, DOI 10.1109/TCNS.2018.2796301; titre publié « Multiagent decision-making dynamics inspired by honeybees ».
15. Niven 2012 : 335(6064), 43–44, DOI 10.1126/science.1216563; titre de PubMed (avec la rubrique « Behavior »; Crossref donne le titre sans la rubrique).
16. Visscher 2007 : DOI 10.1146/annurev.ento.51.110104.151025.
17. Ghaffari et al. 2015 : PODC '15, pp. 57–66, DOI 10.1145/2767386.2767426.
18. Du et al. 2024 : version publiée (ICML 2024, PMLR 235, 11733–11763); l'étiquette passe de 2023 à 2024, la préimpression arXiv:2305.14325 datant de 2023.
19. Kaesberg et al. 2025 : DOI 10.18653/v1/2025.findings-acl.606, pp. 11640–11671. Weng et al. 2025 : ICLR 2025 (Oral).
20. Cemri et al. 2025 : les 14 modes, les 3 catégories et κ = 0,88 sont identiques en v1 et en v3; la v3 renomme les catégories et ajoute MAST-Data. Version lue non consignée : **[à confirmer]**.
21. Zhao et al. 2021 : lieu de publication complété (SSS 2021, LNCS, pp. 209–228, DOI 10.1007/978-3-030-91081-5_14).
22. Reina et al. 2017 : DOI confirmé (Crossref, *journal_ref* d'arXiv), alors qu'il était déduit. Britton et al. 2002 : métadonnées confirmées (Crossref); le statut « non consultée » est levé.

*Forme*

23. Statuts « V » et « NV » remplacés par vérifiée, corrigée, non vérifiée (cadre §6.8). Clés de la version précédente remplacées dans tout le texte par les étiquettes « Nom année » (cadre §9). Légende complétée de [à confirmer] et [non vérifiée].
24. Visscher et Camazine 1999 (citée en seconde main sans entrée) et Zhao et al. 2021 (citée en §9.11) ajoutées à la table 2.2, pour que chaque étiquette du texte ait une entrée.

### 10.2 Réserves restantes

1. **Pratt et al. 2005 : contenu [non vérifiée].** ScienceDirect et OUP fermés; ni résumé ni paramètres lus.
2. **Lecture de r (Sumpter et Pratt 2009) [à confirmer].** Le rapport classe cette référence « non vérifiable » pour la seule lecture de r; la référence elle-même (métadonnées, chiffres) est confirmée, d'où le statut *vérifiée* assorti de [à confirmer] sur la valeur. Trancher : code des auteurs ou question aux auteurs.
3. **Seuil 0,7 en A5 [à confirmer]** et **replis ±0,5 en A7** (lecture graphique [I]).
4. **Restriction v ≥ 1 (Reina et al. 2017) [à confirmer].**
5. **Version de Cemri et al. 2025 [à confirmer].**
6. **Seeley et al. 2006.** Ordre des auteurs à contrôler sur le PDF imprimé; page de fin non vérifiée (Crossref ne donne que « 220 »).
7. **Visscher et Camazine 1999 [non vérifiée].** La référence citée par Franks et al. 2002 n'est pas identifiée. Deux œuvres de 1999 de ces auteurs existent (*Nature* 397:400, DOI 10.1038/17047; chapitre de *Information Processing in Social Insects*, DOI 10.1007/978-3-0348-8739-7_19) : à trancher dans la liste de références de Franks et al. 2002.
8. **Sources non consultées par la vérification** : Text S1 de Pais et al. 2013, matériel supplémentaire de Marshall et al. 2009, texte principal de Seeley et al. 2012 (proportions ipsi/contra); questions ouvertes de la section 9 inchangées.

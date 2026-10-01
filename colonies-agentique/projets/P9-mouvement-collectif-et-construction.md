# P9 — Mouvement collectif et construction

**Statut :** fiche de projet v1, 2026-10-01. **Régime :** production (le chercheur va agir sur ce document). **Phase :** 2; construction : phase 3 (cadre : `../docs/00-cadre.md`, qui prime). **Nouveau projet du cadre v4.**
**Sources :** dossier `../recherche/dossiers/p9-mouvement-collectif.md` (consolidé après vérification indépendante, 2026-10-01); moulin : `../recherche/dossiers/p6-pathologies.md` (blocs P6-M1 à P6-M3, cibles P6-T1 à P6-T5); lacunes L10 et L11 de `../docs/annexes/audit/lacunes.md`; `../docs/annexes/audit/bio-fourmis.md` et `bio-abeilles.md`; oracle numérique `../recherche/dossiers/p9_checks.py`.

**Conventions de lecture.**
- **Statut de lecture** (comme dans le dossier) : [T] texte intégral lu; [T†] page lue à travers WebFetch, à reconfirmer; [R] résumé lu; [M] métadonnées; [S] source secondaire; [I] inférence ou calcul, non publié; **[à confirmer]**; **[non vérifiée]**. Un [T] du dossier P6 peut être [R] dans P9 : la fiche donne la lecture la plus forte et l'origine.
- **« (proposée) »** : tolérance, plan ou valeur choisi par le dossier ou par cette fiche, non publié. Elle équivaut à [à confirmer] jusqu'à calibration (numérisation de la figure, lecture du SI, pilote).
- **Niveaux d'acceptation :** R = alignement relationnel (signe, ordre, plage); D = équivalence distributionnelle (TOST). Règles de décision, registre des déviations et format de la fiche de reproduction : `../docs/04-protocole-reproduction.md`.
- **Statuts épistémiques** des énoncés de transposition : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.
- Cette fiche n'invente aucune valeur publiée. Les calculs propres à la fiche sont marqués [I].
- **Étiquettes ambiguës** résolues selon la bibliographie : Bonabeau et al. 1998a (termites), Li et al. 2024a et 2024b, Li et al. 2025b (SwarmSys).
- **Identifiants :** les cibles reprennent ceux du dossier; trois cibles ajoutées comblent les deux trous du dossier (T9.9, T9.19) et clôturent la liste (T9.33). Correspondance en section 5.

---

## 1. Objet et questions de recherche

P9 étudie comment un groupe sans chef ni plan global se déplace, transporte, s'assemble et construit, chez la fourmi et chez l'abeille, puis ce qui s'en transpose aux systèmes d'agents. Il comble les lacunes L10 (mouvement collectif et transport coopératif) et L11 (auto-assemblage et construction stigmergique) de l'audit, et il **héberge le moulin**, cédé par P6 : le modèle fourmi est Couzin et Franks 2003, le tore de Couzin et al. 2002 en est le **contrepoint** (même motif, autre mécanisme, sans phéromone).

| QR du cadre | Contribution de P9 |
|---|---|
| **QR3** (contrôle), principale | Un **témoin orchestré** dans chaque volet agentique (E9.1 à E9.3, E9.6); la structure de tâche (décomposable ou séquentielle) est testée sur SwarmBench (T9.31). |
| **QR2** (échecs) | Rotation sans issue (moulin, tore), embouteillage, silo d'information, « mémoire de poisson rouge » (T9.32); coût d'une structure (ponts : 2 à 20 % de la colonie immobilisée, T9.20). |
| **QR0** (richesse du signal) | Le **canal est une variable du modèle** : force mécanique sur la charge (instantanée, locale), piste (persistante, locale), vision et vitesse (éphémère), artefact à durée de vie réglable. La persistance τ est la composante balayée (E9.3). |
| **QR1** (individu et collectif) | Partielle : pour une petite charge, une fourmi seule fait mieux que deux à quatre (Gelblum et al. 2015, N = 20); p*(N) de la minorité informée. |
| **QR4** (diversité) | Marginale : les modèles de P9 supposent des agents identiques (Gelblum et al. 2015 le dit) ou ne testent pas la diversité. Renvoi à P3. |

**Questions propres au projet.**
1. Une même rotation collective peut-elle naître de mécanismes différents (suivi de piste, zones d'interaction), et quelle observable les distingue?
2. Comment une minorité *transitoirement* informée oriente-t-elle un groupe sans chef (charge, essaim), et où se situe l'optimum de conformisme?
3. Combien d'individus immobilise une structure auto-assemblée, et qu'est-ce qui fixe sa taille?
4. La durée de vie d'un marquage partagé commande-t-elle l'architecture produite?
5. Lesquelles de ces relations se transposent à des agents, et lesquelles non?

**Rôle dans le programme.** (a) Fournit au socle S0 le moteur spatial manquant (voisinage hors réseau, treillis 3D, réseau de ressorts : section 9). (b) Fournit à P7 des cibles agentiques publiées et un témoin orchestré (T9.30 à T9.32); la dépendance P9 vers P7 n'est pas au cadre : suggestion à arbitrer par `../docs/03-plan-de-recherche.md`. (c) Le moulin comme *pathologie* et son analogue agentique (répétition d'étapes) relèvent de P6 (`../projets/P6-defaillances-et-defenses.md`) s'il les reprend; P9 porte le modèle et les cibles.

**Hors périmètre.** Validation contre des données de terrain (la réplication d'un modèle n'est pas sa validation : T9.13, T9.14 et T9.21(c) sont les seules cibles de *validation*); apparition spontanée d'un moulin 2D (aucun modèle évalué par les pairs trouvé, recherche incomplète : P6-C11); optimalité des ponts (non revendiquée par Reid et al. 2015).

---

## 2. Positionnement

| Famille | Existant publié | Ce que P9 reproduit | Ce que P9 ajoute |
|---|---|---|---|
| **Rotation collective (moulin, tore)** | Observations [Schneirla 1944]; première description [Beebe 1921] **[non vérifiée]**; suivi de piste en tronçon périodique [Couzin et Franks 2003]; zones 3D et tore [Couzin et al. 2002]; marche renforcée sur arêtes orientées [Erhard et al. 2022]; mémoire collective par bifurcation bruitée [Chan et Kanso 2026]; commentaire [Delsuc 2003] | Flux F et voies (T9.1, T9.2); tore et hystérésis (T9.9); marche renforcée (T9.33) | **Contrepoint** explicite (observables, perturbations); sensibilité de l'hystérésis à la vitesse de balayage (E9.4). |
| **Raids, voies, trafic** | [Deneubourg et al. 1989]; [Franks et al. 1991]; [Solé et al. 2000]; [Dussutour et al. 2004]; [Dussutour et al. 2005]; [Burd et al. 2002]; [Peters et al. 2006] | Voies (T9.2); *Lasius* (T9.5); *Atta* (T9.6); raids et pont étroit **bloqués** (T9.3, T9.4, T9.7) | Trois régimes de trafic distingués (voies; aucune ségrégation; poussée frontale) au lieu d'un « trafic bidirectionnel » unique. |
| **Mouvement collectif de base** | [Vicsek et al. 1995]; contre-épreuve [Grégoire et Chaté 2004]; revue [Vicsek et Zafeiris 2012] [M] | Phénoménologie (T9.8) | Bimodalité près du seuil (E9.5); docking avec Couzin et al. 2002 (T9.19). |
| **Transport coopératif** | [Gelblum et al. 2015]; [Gelblum et al. 2016]; revue [Feinerman et al. 2018]; robotique [Berman et al. 2011] **[non vérifiée]**, [Wilson et al. 2014] | T9.10 à T9.14 | Distinction réplication / validation (prédiction hors ajustement); version agentique avec témoin orchestré. |
| **Minorité informée, guidage** | [Couzin et al. 2005]; [Couzin et al. 2011]; [Liu et al. 2011] ([à confirmer]); [Schultz et al. 2008]; [Greggers et al. 2013]; [Makinson et Beekman 2014]; [Janson et al. 2005]; [Latty et al. 2009]; [Beekman et al. 2006] **[non vérifiée]** | p*(N) (**bloquée**), streaker contre guide subtil (T9.16 à T9.18) | E9.1 : agents LLM, témoin orchestré. |
| **Auto-assemblage** | [Reid et al. 2015]; [Garnier et al. 2013]; [Mlot et al. 2011]; [Peleg et al. 2018]; [Lutz et al. 2021]; [Rubenstein et al. 2014] | T9.20 à T9.24 | Registre des coquilles de Reid; statut *Modèle simplifié*; E9.2 (coût de la coordination). |
| **Construction** (phase 3) | Mot et concept [Grassé 1959]; [Theraulaz et Bonabeau 1999]; fourmi [Khuong et al. 2016]; guêpes [Theraulaz et Bonabeau 1995a], [Theraulaz et Bonabeau 1995b]; termites [Bonabeau et al. 1998a], [Heyde et al. 2021], [Deneubourg 1977]; rayon [Camazine 1991], [Camazine et al. 1990], [Jenkins et al. 1992], [Johnson 2009], [Pratt 1998]; problème inverse [Werfel et al. 2014] | T9.25, T9.26 (rejet de la lecture classique de Camazine); T9.27 à T9.29 bloquées ou optionnelles | E9.3 : durée de vie d'un artefact partagé. |
| **Agentique** | [Ruan et al. 2025] (SwarmBench décentralisé); [Gao et al. 2026] (**homonyme**, orchestration); flocking LLM [Li et al. 2024a], [Li et Zhou 2025]; stigmergie et essaims LLM [Pal et al. 2026], [Khushiyant 2025], [Li et al. 2025b]; topologie [Qian et al. 2024], [Li et al. 2024b], [Zheng et al. 2026], [Zhuge et al. 2024]; coût [Orogat et al. 2026]; conformité [YS 2026], [Weng et al. 2025] | T9.30 à T9.32 | E9.1 à E9.3 et E9.6, à budget égal, avec témoin orchestré. |

---

## 3. Hypothèses falsifiables

Les hypothèses *confirmatoires* sont préenregistrées avant toute exécution confirmatoire (`../docs/08-science-ouverte-ethique.md`); les *exploratoires* alimentent les pages interactives et ne portent jamais « Résultat reproduit ». Les critères chiffrés complets sont dans les cibles (section 5); on ne répète ici que l'effet minimal et la réfutation.

| ID (liens) | Énoncé dirigé | VI → VD | Effet minimal | Critère de réfutation | Statut |
|---|---|---|---|---|---|
| **H9.1** (T9.1) | Sur tronçon périodique, le suivi de piste avec évitement fait choisir un sens collectif quand l'angle de perception est intermédiaire et le virage d'évitement rapide; le sens est tiré au hasard. | α, θ_a → F à 5 000 pas; signe du flux net | F̄(90°, 1 000 °/s [à confirmer]) ≥ 0,8 et ≥ 0,3 au-dessus de F̄ des bords (proposée); part de flux net positif dans [0,40 ; 0,60] | L'un des deux critères échoue sur 100 répétitions (binomial bilatéral, p ≤ 0,01 pour le sens) | Confirmatoire |
| **H9.2** (T9.2) | Avec préférence directionnelle ω et asymétrie d'évitement Δθ_a, F est maximal à ω = 1 et les rentrantes occupent le centre. | ω, Δθ_a → F; distance au centre de piste | Médiane(rentrantes) < médiane(sortantes) à Δθ_a = 1 400 °/s (Mann-Whitney, p < 0,01); argmax F̄ = 1 ± 0,25 | p ≥ 0,01, ou argmax hors de [0,75 ; 1,25] | Confirmatoire |
| **H9.3** (T9.9, T9.33) | **Contrepoint.** Un tore (m̄ haut, p̄ bas) apparaît **sans aucun marquage** pour Δr_o petit et Δr_a grand, avec boucle d'hystérésis; une marche renforcée à une seule fourmi est piégée presque sûrement sur grille 2D. | Δr_o, Δr_a, sens du balayage; β → m̄, p̄, aire de boucle; piégeage | (Δr_o, Δr_a) = (1 ; 12) : m̄ ≥ 0,5 et p̄ ≤ 0,3 (proposée); aire de boucle d'IC 95 % excluant 0; sur ℤ, abs(X_n/n) à ± 0,01 de 0,4621 pour β = 1 | Pas de tore à ces points; IC de l'aire contenant 0; seuil de ℤ manqué | Confirmatoire |
| **H9.4** (E9.4) | L'hystérésis du tore est une mémoire induite par le bruit, pas une bistabilité : l'aire de boucle décroît quand la durée du palier par valeur de r_o augmente [I, d'après Chan et Kanso 2026]. | Durée de palier (2 000 pas publiés et au moins deux autres, proposée) → aire de boucle | À fixer au pilote, avant la série [à confirmer] | Pente de l'aire contre log(durée) dont l'IC 95 % contient 0 | **Exploratoire** |
| **H9.5** (T9.8) | Le modèle de Vicsek est ordonné à faible bruit et désordonné à fort bruit, quel que soit N. | η, N → v_a | À ρ = 4 : v_a ≥ 0,95 à η = 0,5 et ≤ 0,2 à η = 4,5, pour N ∈ {40 ; 100 ; 400 ; 4 000}, ≥ 20 graines | L'une des bornes échoue pour un N | Confirmatoire (β et η_c **ne sont pas** des cibles) |
| **H9.6** (E9.5) | Près du seuil, à N ≥ 4 000, l'histogramme de v_a est bimodal (transition discontinue en 2D, Grégoire et Chaté 2004). | η (près du seuil), N → distribution de v_a | Critère de bimodalité fixé au préenregistrement [à confirmer]; aucune valeur publiée lue | Distribution unimodale à tous les η balayés pour N ≥ 4 000 | **Exploratoire** |
| **H9.7** (T9.5, T9.6) | (a) *Lasius* : la poussée frontale augmente la capacité du pont et γ ≈ 0,57 minimise le temps de parcours. (b) *Atta* : à concentration égale, un trafic 50:50 débite plus qu'un trafic 90:10. | γ, w, proportion → capacité, temps de parcours, débit | (a) capacité avec poussée ≥ 1,6 fois celle sans (publié : « doublée »); argmin_γ ∈ [0,45 ; 0,70]. (b) Mann-Whitney p < 0,05 | (a) rapport < 1,6 ou argmin hors plage; (b) p ≥ 0,05 | (a) Confirmatoire; (b) exploratoire (extension; valeurs de Burd non lues) |
| **H9.8** (T9.10 à T9.12) | La réponse à une fourmi nouvellement attachée a un maximum **intérieur** en individualité F_ind (≈ 4,25) et en rayon de charge (≈ 1 cm); la vitesse médiane est linéaire en porteuses jusqu'à 15. | F_ind, rayon, nombre de porteuses → réponse transitoire, vitesse | Pic Ising à ± 3 % de N f₀/2; pic du modèle étendu dans [4,0 ; 4,5] (si les paramètres du SI sont retrouvés); rayon optimal dans [0,5 ; 2] cm; R² ≥ 0,95 de la droite | R(F_ind) monotone, ou pic hors plage | Confirmatoire (réplication) |
| **H9.9** (T9.13, T9.14) | **Validation.** Paramètres fixés sur le « plateau propre », le modèle prédit l'échec d'une charge de 4 cm devant l'obstacle en U (celle de 1 cm passe) et la transition vers l'oscillation autour de 5 fourmis, avec G_c ≈ N/2. | Rayon, N, longueur de laisse → succès, période, G_c | Succès ≥ 80 % (1 cm) et ≤ 20 % (4 cm) (proposée); transition à N ∈ [4 ; 6]; G_c/N → 0,50 ± 0,02 pour N ≥ 200 F_ind/f₀ | Une prédiction échoue sans réajustement | Confirmatoire |
| **H9.10** (T9.16) | La proportion d'informés nécessaire p*(N) décroît avec N quand les non informés sont neutres. | N, p → précision du groupe | p*(N) strictement décroissante sur N ∈ {10 ; 20 ; 50 ; 100 ; 200 ; 500}; p*(200)/p*(10) ≤ 0,5 (proposée) | Non strictement décroissante, ou rapport > 0,5 | Confirmatoire, **bloquée** (PR-0) |
| **H9.11** (T9.17, T9.18) | Dans un essaim à ≤ 5 % d'informés, l'hypothèse « streaker » (vitesse accrue vers la cible) reproduit le motif de vitesse observé; l'hypothèse « guide subtil » (vitesse ordinaire) ne le reproduit pas. | Mode de guidage → ANOVA de la vitesse selon la direction; Rayleigh; variance angulaire | Streaker : pic significatif (P < 0,05) dans ≥ 90 % des secteurs simulés; guide subtil : ≤ 10 % (proposée) | Le guide subtil reproduit le motif dans > 10 % des secteurs : les données ne discriminent pas | Confirmatoire, conditionnelle (modèle de Couzin et al. 2005 à lire) |
| **H9.12** (T9.20) | La distance parcourue par le pont (d*) décroît avec l'angle et croît avec le trafic. | θ, densité de trafic → d* | 100 % des combinaisons (4 angles × 3 densités) | Une combinaison non monotone | Confirmatoire; *Modèle simplifié*, optimalité non revendiquée |
| **H9.13** (T9.21) | La période de trafic qui maximise le temps où la fente est franchie vaut ≈ 3 s, indépendante de l'intensité et de la longueur de fente; la corrélation trafic-pont hors échantillon est ≈ 0,8. | Période, intensité, longueur de fente → fraction de temps, corrélation | Période ∈ [2,5 ; 4,0] s; corrélation ∈ [0,75 ; 0,88] (TOST ± 0,06, proposée) | Hors plage | Confirmatoire |
| **H9.14** (T9.22, T9.23) | (a) Radeau : n(t) est sigmoïde (pas une loi de puissance) et le modèle brownien échoue. (b) Grappe : la règle active produit une déformation maximale décroissante avec L_z/L_x et aucune réponse à la secousse verticale. | N; rapport L_z/L_x; direction de secousse → n(t); déformation | (a) AIC en faveur du logistique pour N = 1 000 à 7 000; (b) Spearman ≤ −0,9 sur ≥ 5 rapports; variation < 5 % (proposée) | (a) loi de puissance préférée ou brownien réussit; (b) inversion de l'un des signes | (a) Confirmatoire; (b) confirmatoire du *modèle*, la règle individuelle reste une *Hypothèse de l'auteur* |
| **H9.15** (T9.25), phase 3 | Sans marquage phéromonal, rien ne se construit; avec 1/η_m ∈ [800 ; 1 200] s, l'espacement des piliers est ≈ 10 mm, indépendant de N et de la surface. | 1/η_m, N, surface → densité, distance au plus proche voisin | Distance ∈ [9,0 ; 10,8] mm (TOST ± 1 mm, proposée); variation < 10 % entre N et entre surfaces | Un pilier sans marquage (≥ 2 simulations sur 10); espacement hors plage | Confirmatoire |
| **H9.16** (T9.26), phase 3 | L'auto-organisation de Camazine **seule** ne forme pas la bande de pollen avec des réserves réalistes; la bande exige gabarit « reine » et auto-organisation. | Mécanismes actifs (ablation) → surface de la bande de pollen | Welch p < 0,01 (pluie fixe contre aucune; aléatoire contre aucune); moyennes à ± 15 % | La bande se forme sous auto-organisation seule | Confirmatoire (cible de rejet) |
| **H9.17** (E9.1) | Pour des agents LLM conformistes, p*(N) ne décroît pas avec N comme pour des agents à règles. | N, p, type d'agent → précision | Rapport p*(200)/p*(10) ≥ 0,8 prédit (LLM) | Rapport ≤ 0,5 pour les LLM | Confirmatoire (volet agentique, après pilote) |
| **H9.18** (E9.2) | Le débit d'une équipe passe par un maximum pour une part intérieure k* d'agents affectés à la coordination. | k → débit | Écart de 10 % entre k* et k = 0 | Débit monotone en k | Confirmatoire (après pilote) |
| **H9.19** (E9.3) | À tâche de construction égale, un artefact partagé à durée de vie réglable donne un espacement qui croît puis sature avec la durée de vie. | TTL → période du motif | Variation de 30 % entre le TTL le plus court et un TTL intermédiaire | Insensibilité au TTL | Confirmatoire (phase 3, après pilote) |
| **H9.20** (T9.31, E9.6) | Le gain du contrôle central dépend de la structure de tâche : grand pour une tâche à état partagé séquentiel (*Synchronization*), nul pour *Pursuit* et *Transport* (effet plancher), intermédiaire pour *Foraging*. | Tâche, mode (central, décentralisé), modèle → score | Accord des signes sur ≥ 20 graines | Signes discordants | Confirmatoire (valeurs de référence **[à confirmer]**) |

---

## 4. Modèles de référence

Un modèle par article, validé contre la figure ou le tableau publié (cadre, principe de réplication avant extension). Les équations sont recopiées de la source lue; quand elles n'existent qu'en **image** dans la version lue, le bloc le dit et ne les reconstruit pas (on ne code pas ces modèles avant lecture du PDF : porte PR-0). Les préréglages sont des noms **provisoires**; la convention définitive est dans `../docs/05-spec-simulation.md`. Les blocs du dossier sont cités « P9-M<k> ». Le format ODD suit [Grimm et al. 2020]; le résumé tient en une ligne par modèle.

**Matrice de parité (taxon nommé).** Le canal est une variable du modèle, jamais un attribut du taxon (cadre).

| Famille | Fourmi (taxon : modèle) | Abeille (*Apis mellifera* : modèle) | Hors couple fourmi-abeille |
|---|---|---|---|
| Rotation, ordre collectif | *Eciton burchellii* : Couzin et Franks 2003 | **aucun équivalent publié** | Poissons, oiseaux : Couzin et al. 2002 (tore); générique : Vicsek et al. 1995 |
| Voies, trafic | *E. burchellii* (voies); *Lasius niger* (pont, poussée frontale); *Atta cephalotes* (diagramme fondamental) | **aucun** | — |
| Transport | *Paratrechina longicornis* : Gelblum et al. 2015, 2016 | **aucun** | Robots [Berman et al. 2011] **[non vérifiée]**, [Wilson et al. 2014] |
| Minorité informée, guidage | **aucun** | Schultz et al. 2008; Greggers et al. 2013; Makinson et Beekman 2014 | Modèle générique [Couzin et al. 2005] |
| Auto-assemblage | *E. hamatum* (ponts : Reid); *E. burchellii* (ponts : Garnier); *Solenopsis invicta* (radeaux : Mlot) | Grappe : Peleg et al. 2018 | Robots [Rubenstein et al. 2014] |
| Construction (phase 3) | *L. niger* : Khuong et al. 2016 | Rayon : Camazine 1991; Johnson 2009; Pratt 1998 | Termites : Bonabeau et al. 1998a, Heyde et al. 2021 (*Apicotermes lamani*); guêpes : Theraulaz et Bonabeau 1995a et 1995b; robots : Werfel et al. 2014 |

### 4.1 *Eciton burchellii* — Couzin et Franks 2003 (P9-M1; P6-M2) [T]

Préréglages `eciton-burchellii/cf2003-individu` (fig. 1), `…-anneau` (fig. 2), `…-voies` (fig. 4). Emplacement : §2(a)–(d), éq. (2.1)–(2.4); §3; §4(a), §4(b)(i)–(ii); fig. 1–4. *Orthographe de la source : « burchelli ».*

- **Type et intégration.** Modèle à agents hors réseau sur piste linéaire; pas fixe Δt = 0,02 s; mise à jour **parallèle** des directions, puis des positions.
- **Équations.**
```
(2.1) d_i(t+Δt) = Σ_{j≠i} (c_i − c_j) / |c_i − c_j|      évitement : cercle r_d ou arc frontal (portée r_p, angle interne α);
                                                         rotation bornée à θ_a·Δt; décélération −m jusqu'à u_min
(2.2) C(r,τ) = Q / (2π D τ) · exp(−r² / (4 D τ)),  D = 0,01 cm² s⁻¹     piste linéaire, profil figé après le temps de diffusion τ
(2.3) S(C) = arctan(k C / C_max) / (π/2),  k = 100,  0 < S < 1           stimulus par antenne + bruit gaussien σ;
                                                         virage vers l'antenne la plus stimulée à θ_p·Δt; erreur ε ~ N(0 ; 0,5 rad)
(2.4) d'_i = (d_i + ω g_i) / |d_i + ω g_i|                préférence directionnelle (vecteur g_i, poids ω)
```
  La tête est en c_i + ½ b v_i; les antennes, de longueur f, sont à 45° de l'axe; l'évitement prime sur le suivi de piste. **Flux F** = norme de la somme des vitesses normalisées (0 : aucun flux net; 1 : tous dans le même sens), mesuré sur un tronçon de 50 cm.
- **Paramètres tirés de la vidéo** (226 individus) : r_d = 0,4 cm; r_p = 1,2 cm; b = 0,8 cm; f = 0,4 cm; u_des = 13 cm/s; u_min = 2 cm/s; m = 50 cm/s².
- **Fig. 1 (suivi individuel)** : θ_p = 500 °/s; σ = 0,5; C_max = 1,2 × 10⁻¹⁰ g cm⁻³; 50 répétitions par angle d'approche (5° à 90°, pas de 5°); 15 000 pas; balayages C_max (1,2 × 10⁻¹², 10⁻¹⁰, 10⁻⁸), θ_p (100, 300, 500, 700, 900 °/s), σ (0,25 à 1,0).
- **Fig. 2 (anneau)** : tronçon périodique de 50 cm; N = 50; θ_p = 500 °/s; σ = 0,01; Q = C_max = 1,2 × 10⁻⁶ (unité : g cm⁻³ dans les légendes, g cm⁻¹ dans le texte; **à trancher dans le PDF avant de coder** [à confirmer]); temps de diffusion t = 300 s; F à 5 000 pas (100 s à Δt = 0,02 s [I]), moyenne de 100 répétitions. F est maximal à α et θ_a intermédiaires; à α = 90° et θ_a = 1 000 °/s [à confirmer : la carte F(α, θ_a) est une image] les fourmis choisissent collectivement un sens, par des collisions frontales répétées.
- **Fig. 4 (voies)** : N/2 fourmis préfèrent chaque direction avec poids ω; les sortantes tournent plus vite pour s'éviter de Δθ_a = 1 400, 600, 200 °/s (autres paramètres comme la fig. 2); 5 000 pas, 100 répétitions; déviations angulaires sur les 5 000 premières interactions (fig. 4e–g).
- **Terrain (fig. 3)** : *E. burchellii*, parc national Soberania (Panama); tronçon de 11 cm filmé à 25 Hz puis doublé à 50 Hz; fourmis moyennes seulement (75 % de la colonne, citant Franks 1985 **[non vérifiée]**); rentrantes N = 97, sortantes N = 84; 113 collisions (226 fourmis).
- **ODD.** Objet : choix collectif d'un sens et voies de circulation. Entités : fourmis (position, direction, vitesse); champ de piste figé. Processus : évitement prioritaire, sinon suivi de piste, sinon marche. Stochasticité : bruit σ sur le stimulus, erreur de virage, conditions initiales. Observation : F, distance transversale, angles de déviation.
- **Réserve.** Le modèle simule le **choix collectif d'un sens sur un tronçon périodique** « très semblable au moulin circulaire » (§4(b)(i)), pas l'apparition d'un moulin 2D (dossier, correction C3).

### 4.2 Contrepoint — Couzin et al. 2002 : zones 3D, tore (P6-M1) [T dans P6; R dans P9]

Préréglage `generique-3d/couzin2002-tore`. **Poissons et oiseaux : aucune fourmi, aucune phéromone.** Le tore est rapproché des bancs de barracudas, carangues et thons, jamais des fourmis (P6-C1). Schneirla 1944 comparait déjà le moulin de fourmis à celui de poissons en notant les différences de modalité (tactilo-chimique contre vision), de dimension (2D contre 3D) et d'initiation.

- **Type et intégration.** Modèle à agents, espace 3D continu, pas τ = 0,1 s; ordre de mise à jour non précisé dans le dossier : à fixer et à inscrire à l'ODD [à confirmer].
- **Équations.**
```
(1) d_r(t+τ) = −Σ_{j≠i} r_ij / |r_ij|,   r_ij = (c_j − c_i) / |c_j − c_i|     répulsion (rayon r_r), priorité absolue
(2) d_o = Σ_{j=1..n_o} v_j / |v_j|                                            orientation (r_r ≤ d < r_o), si n_r = 0
(3) d_a = Σ_{j≠i} r_ij / |r_ij|                                               attraction (r_o ≤ d ≤ r_a), si n_r = 0
    deux zones occupées : d_i = ½ (d_o + d_a); vecteur nul ou aucun voisin : d_i = v_i
(4)–(6) p_group = (1/N) |Σ v_i|;   m_group = (1/N) |Σ r_ic × v_i|,   r_ic = c_i − c_group
```
  Angle mort : cône arrière de (360 − α)°. Bruit : rotation de d_i tirée d'une gaussienne sphérique enroulée d'écart-type σ. Rotation bornée à θτ par pas; vitesse constante s. **Note d'implantation [I]** : l'article fait la demi-somme sans dire si d_o et d_a sont normalisés avant; beaucoup de réimplantations les normalisent. À fixer et à documenter.
- **Plages (tableau 1)** : N 10–100; r_r = 1; Δr_o et Δr_a 0–15; α 200–360°; θ 10–100 °/s; s 1–5 unités/s; σ 0–0,2 rad. **Fig. 3** : N = 100, r_r = 1, α = 270°, θ = 40 °/s, s = 3, σ = 0,05; 30 répétitions par combinaison; état stable en ≤ 5 000 pas. **Fig. 4 (hystérésis)** : r_a = 14, 2 000 pas par valeur de r_o, 15 répétitions.
- **Résultats publiés** : quatre régimes (essaim; tore; groupe parallèle dynamique; groupe très parallèle), fragmentation > 50 % à Δr_o et Δr_a faibles; tore pour Δr_o petit et Δr_a grand; la zone du tore disparaît presque à α = 360° et s'élargit quand α diminue.
- **Transposabilité [I].** Le tore exige alignement direct et attraction à distance, alors que l'*Eciton* presque aveugle se guide par contact et par piste : ce qui se transpose est l'ingrédient structurel (perception frontale, angle mort), pas les valeurs. Chan et Kanso 2026 attribuent la mémoire collective d'un modèle de ce type à une bifurcation transcritique bruitée plutôt qu'à une vraie bistabilité [R]; l'identification de leur modèle à celui de Couzin est une inférence très probable [I].
- **ODD.** Objet : régimes de mouvement collectif sans marquage. Entités : individus (position, direction); aucun champ. Processus : trois zones, priorité à la répulsion. Stochasticité : bruit angulaire. Observation : p_group, m_group.

**Même motif, autre mécanisme** (comparaison à afficher dans la page *Moulin ou tore ?* et à tenir à jour dans la note de recherche) :

| | Vicsek et al. 1995 | Couzin et al. 2002 | Couzin et Franks 2003 |
|---|---|---|---|
| Espace | plan, périodique | 3D continu | piste linéaire de 50 cm, périodique |
| Interaction | alignement (rayon r) | répulsion, orientation, attraction (zones; angle mort) | évitement (cercle et arc), suivi de piste |
| Signal chimique | non | non | **oui** (éq. 2.2–2.3) |
| Paramètre d'ordre | v_a | p_group, m_group | flux F |
| Moulin ou tore | non | tore (3D) | choix d'un sens sur anneau (analogue du moulin) |
| Taxon | générique | poissons, oiseaux | *E. burchellii* |

### 4.3 Générique — Vicsek et al. 1995 (P9-M3) [T, version arXiv]

Préréglage `generique-2d/vicsek1995`. Emplacement : arXiv cond-mat/0611743; éq. (1)–(4); fig. 1–3 (non comparé à la version PRL).

- **Type et intégration.** Particules auto-propulsées sur cellule carrée de côté L, conditions périodiques; Δt = 1; v = 0,03 (résultats « indépendants » pour 0,003 < v < 0,3); r = 1; ρ = N/L²; positions et directions initiales aléatoires, même |v|. Mise à jour synchrone, déduite de la forme des équations [I].
- **Équations.**
```
x_i(t+1) = x_i(t) + v_i(t) Δt                                       (1)
θ_i(t+1) = ⟨θ(t)⟩_r + Δθ,   Δθ ~ U[−η/2, η/2]                       (2)
⟨θ⟩_r = arctg[ ⟨sin θ⟩_r / ⟨cos θ⟩_r ]   (voisins à distance ≤ r, i inclus)
v_a = (1/(N v)) |Σ_i v_i|                                           (3)
v_a ~ (η_c(ρ) − η)^β   et   v_a ~ (ρ − ρ_c(η))^δ                   (4)
```
- **Publié** : β = 0,45 ± 0,07; δ = 0,35 ± 0,06; η_c(∞) = 2,9 ± 0,05 « pour ρ = 0,4 » (texte); limite η_c = 2π à « température infinie »; erreurs à 5 % près de la transition pour N = 4 000 et 10 000 (5 répétitions). Fig. 2a : (N, L) = (40 ; 3,1), (100 ; 5), (400 ; 10), (4 000 ; 31,6), (10 000 ; 50). Fig. 1 : N = 300; fig. 3 : (a) ρ = 0,4, (b) L = 20 et η = 2,0.
- **Incohérence interne [I, vérifiée]** : les couples (N, L) de la fig. 2a donnent N/L² ≈ 4, pas 0,4. Le pré-test du dossier (N = 400, ρ = 4) ne retrouve pas η_c ≈ 2,9 (v_a = 0,54 à η = 3,0) : attendu pour une estimation de taille finie, mais la valeur n'est pas une cible tant que ρ n'est pas tranché dans la version PRL.
- **Contre-épreuve publiée** : en 2D la transition est **toujours discontinue**, y compris pour le modèle minimal [Grégoire et Chaté 2004] [R]. Les exposants β et δ ne sont donc **pas** des cibles; seule la phénoménologie l'est.
- **ODD.** Objet : transition d'ordre. Entités : particules (position, angle). Processus : alignement sur la moyenne des voisins, bruit uniforme, déplacement. Observation : v_a.

### 4.4 Trafic — *Lasius niger* (Peters et al. 2006 d'après Dussutour et al. 2004) et *Atta cephalotes* (Burd et al. 2002) (P9-M4) [T pour Peters; R pour Dussutour et al. 2004 et Burd]

Préréglages `lasius-niger/peters2006-pont` et `atta-cephalotes/burd2002-diagramme`. Emplacement : Peters et al. 2006, éq. (1)–(17), fig. 1–6. Ce que Dussutour et al. 2004 montre est le **choix de route sous encombrement** (pont double) : aucune formation de voies.

- **Type et intégration.** Équations à retard (éq. 4–5; le retard T est probablement le temps de parcours de la branche [I]; valeur de T et schéma d'intégration **non relevés** : à lire dans Peters [à confirmer]); microsimulation à forces sociales (pas non relevé).
- **Équations.**
```
Φ = w ρ V                                           (1)  flux = largeur × densité × vitesse
Φ = w ρ V_m [1 − (w ρ / k_m)^n]                     (2)  Burd : V_m = 4,04 cm/s, k_m = 0,59 cm⁻², n ≈ 0,64
F_ij = (k + C_ij)² / [(k + C_1j)² + (k + C_2j)²]    (3)  choix de branche i au point j (n = 2)
dC_ij/dt = q [Φ_ij(t) + Φ_ij'(t − T)] − ν C_ij(t)   (4)  dépôt q, évaporation ν
Φ_ij(t) = φ_j F_ij [1 − γ a Φ_ij'(t−T)/w] + φ_j F_i'j γ a Φ_i'j'(t−T)/w   (5)  poussée frontale, redirection γ
```
  État stationnaire : C_ij = qφ/ν ± D (éq. 13); D = 0 (usage symétrique) ou D² = q²φ²/ν² − [k² + γaφ(k + 2qφ/ν)²/w] / (1 + γaφ/w) (éq. 15). Pour γ = 0, asymétrie si φ > kν/q, soit **0,15 fourmi/min** pour q = 1, k = 6, ν = 1/40 min⁻¹ [I, exact].
- **Paramètres (fig. 2)** : q = 1; k = 6; ν = 1/40 min⁻¹; branches de 3 mm; γ = 0,57. Le coefficient *a* (temps d'interaction, section efficace) **n'a pas de valeur numérique** dans le texte. Expérience rapportée : largeurs de 10 mm à 1,5 mm; usage symétrique pour w ≤ 6 mm; redirection après poussée ≈ 60 % [S]. Microsimulation : poussée qui **double** la capacité (fig. 4, w = 3 mm); fig. 5 : φ = 15 min⁻¹, l₁ = 10 cm, l₂ variable, moyennes de 10 min; à (l₁, l₂) = (10 ; 20) cm, γ = 0,57 minimise le temps de parcours.
- **Cohérence avec P1 [I].** La forme (3) est celle de la fonction de choix de Deneubourg (n = 2), mais **k = 6 vient de Peters, fig. 2** : ne pas le confondre avec k ≈ 20 [à confirmer] de Deneubourg et al. 1990 (cadre, corrections factuelles).
- **Atta (Burd et al. 2002)** [R; valeurs via Peters] : vitesse moyenne de type fluide en fonction de la concentration; pas de ségrégation; à concentration égale, un trafic proche de 50:50 a un débit supérieur à un trafic majoritairement unidirectionnel. Contrôle [I] : V/V_m au débit maximal = n/(n+1) = 0,390 (publié par Peters : 0,39).
- **Pont à goulots (Dussutour et al. 2005)** [R] : grappes alternées d'entrantes et de sortantes, volume de trafic et retour de nourriture identiques à ceux d'un pont large; modèle **non lu** (T9.7 bloquée).
- **ODD (Lasius).** Objet : choix de branche et capacité sous encombrement. Entités : flux sur deux branches; concentrations C_ij; (microsimulation : fourmis). Processus : dépôt, évaporation, choix en (k + C)², poussée. Stochasticité : redirection (microsimulation). Observation : Φ₁/Φ_tot, temps de parcours.

### 4.5 Raids et marche renforcée (P9-M2; P6-M3)

- **Raids (Deneubourg et al. 1989 [M]; Franks et al. 1991 [R]; Solé et al. 2000 [R])** : aucune équation lue. Franks et al. 1991 : expériences de moulin circulaire; vitesse de course **sigmoïde** en fonction de la force de la phéromone de piste; le raid résulte du trafic sortant et rentrant, tous deux marqués. Solé et al. 2000 : modèle de Deneubourg simulé pour trois espèces (*E. hamatum*, *E. burchellii*, *E. rapax*); les motifs observés maximisent le rendement. **Trou** : règles de dépôt, paramètres et critères quantitatifs du modèle de 1989 non lus.
- **Marche renforcée (Erhard et al. 2022)** [T sur la préimpression; publié dans *J. Stat. Phys.* 190(1)] — préréglage `abstrait/erhard2022-moulin`. Plus petit modèle exact du moulin (une fourmi, mémoire dans l'environnement) :
```
P(X_{n+1} = x | G_n) = a_n(X_n, x) / Σ_{y~X_n} a_n(X_n, y),   a_n(X_n, x) = exp(β c_n(X_n, x))      (2.1)–(2.2)
c_n(x, y) = passages de x vers y − passages de y vers x
```
  Théorème 2.2 : sur tout graphe fini connexe qui n'est pas un arbre, et sur ℤ^d (d ≥ 2), la marche est presque sûrement piégée dans un circuit orienté, **pour tout β ∈ (0, ∞)**. Proposition 2.1 : sur ℤ, X_n/n → Y p.s., P(Y = ±(1 − e^{−β})/(1 + e^{−β})) = ½ (0,4621 pour β = 1 [I, exact]). Le piégeage ne demande pas de groupe, seulement un renforcement orienté sans oubli.
- **ODD (Erhard).** Entités : un marcheur, poids d'arêtes orientées. Processus : choix proportionnel à exp(β c), puis mise à jour de c. Stochasticité : choix de l'arête. Observation : X_n/n; circuit suivi.

### 4.6 *Paratrechina longicornis* — Gelblum et al. 2015 et 2016 (P9-M5, P9-M6) [T]

Préréglages `paratrechina-longicornis/gelblum2015` et `…/gelblum2016`. Emplacement : 2015 — Results (fig. 1–4), Methods « Theoretical model » et « Ising model », éq. (1)–(4) des Méthodes **en image**; SI (notes 1 à 25) non lu. 2016 — arXiv:2107.09508v1, éq. (1)–(5); SI non lu. **Attention** : l'identifiant arXiv:2107.09508 est Gelblum et al. 2016, pas Feinerman et al. 2018 (revue; erreur de dépôt probable [I]).

- **Dispositif (article de 2015)** : 5 colonies (Israël), 98 expériences (46, 25, 16, 6, 5); plateau de 100 × 70 cm; charge à 7,5 m du nid en moyenne (min. 3 m); 50 images/s; trajectoire totale > 70 m; force de traction d'une fourmi ≈ 0,1 mN (SI note 4).
- **Type et intégration (2015).** Modèle stochastique à événements discrets : charge = anneau de N_max sites (tireuse de force f = 1; soulageuse qui réduit le frottement d'un facteur β·f; vide); vitesse linéaire en force totale; attachement et détachement stochastiques; **algorithme de Gillespie**. Une informée tire toujours vers le nid et devient non informée au taux K_for (10 s : texte des Résultats). Les non informées commutent entre tirer et soulever à un taux qui dépend de F_ind (individualité), K_c (taux de base) et de la force locale perçue (**forme en image**; forme exponentielle donnée en 2016). Quatre paramètres libres (F_ind, K_c, deux mécaniques), ajustés sur le « plateau propre » (charge relocalisée sans fourmis libres) : distribution de vitesse (N = 56 030 images), fonction de corrélation (N = 17 trajectoires), vitesse médiane et vitesse angulaire médiane (fig. 3b–e). **Valeurs ajustées : dans le SI, non lues.**
- **Ising simplifié (2015)** : spins ±1 sur graphe complet; champ extérieur = force d'une informée; champ moyen; F_c croît **linéairement avec N** (éq. 1 des Méthodes, image). Résultats : réponse à une fourmi nouvellement attachée maximale pour F_ind ≈ 4,25 (modèle étendu) et F_c = 4,3 (Ising, solution exacte); rayon optimal de l'ordre de 1 cm (fig. 4b). Contrôle [I] : F_c = 4,3 correspond à N ≈ 8,6 si F_c = N f₀/2 (forme de 2016), le N de l'Ising de 2015 étant à lire dans les Méthodes.
- **2016 — équations.**
```
r_{p↔l} ∝ exp(± p·f_loc / F_ind)       couplage fort si F_ind ≲ F_ind^c = N f₀ / 2
dθ/dt = v / L                                                                                (1)
(1/k_c) dv/dt = −(G̃/(k_c L)) v cos θ + f₀ Ñ sinh(v/F̃_ind) − 2 (v + G̃ sin θ) cosh(v/F̃_ind)   (2)
N_c = (F_ind / f₀) (2 + G̃ / (k_c L))             bifurcation de Hopf supercritique            (3)
W(v) = v²/2 − (Ñ f₀ F̃_ind / 2) log cosh(v/F̃_ind) + G̃ v sin θ                               (4)
G_c = (F_ind/2) sinh(2 arccosh √(f₀N/(2F_ind))) − F_ind arccosh √(f₀N/(2F_ind))              (5)
```
  Charge contrainte sur un cercle de rayon L; N spins non informés (N/2 de chaque côté); informées = force constante G vers le nid; tildes = normalisation par le frottement γ. Pour N ≫ F_ind/f₀ : G_c ≈ N/2. Valeurs de l'éq. (5) pour F_ind = f₀ = 1 [I] : G_c/N = 0,444 (N = 50), 0,4685 (N = 100), 0,4825 (N = 200), 0,4957 (N = 1 000). L'éq. (2) est transcrite de l'extraction ar5iv : **le placement des tildes est à confirmer sur le PDF** [I]. Intégration : EDO, RK4 du noyau.
- **Mesures (articles de 2015 et 2016).** Vitesse médiane linéaire en porteuses jusqu'à 15; r = 0,104 entre distribution angulaire des fourmis et direction (Pearson, N = 5 591 images); fourmis attachées en permanence (N = 14) pas plus corrélées que les autres (N = 186; P = 0,6691); une fourmi qui s'attache injecte ≈ 0,5 bit en quelques secondes (N = 134), pour 5 à 20 s; **0,35 à 1,4 guide simultanément**; charge de 4 cm (> 100 fourmis) : très persistante mais ne passe pas l'obstacle en U (recul de 5 cm), celle de 1 cm le passe (N = 11); 2016 : laisse de 18 cm pour une charge de 1 cm; transition marche aléatoire vers oscillations vers 5 fourmis (absence à 1–3); période linéaire en longueur de laisse; tige rigide R = 11,5 cm : rotations complètes.
- **Limites énoncées** : fourmis supposées identiques (SI note 15); « oubli » discret (un oubli graduel donnerait le même comportement : SI note 15 [à confirmer]).
- **ODD (2015).** Objet : réponse d'un groupe à une fourmi transitoirement informée. Entités : sites de l'anneau (état tire/soulève/vide, informé ou non), charge (position, orientation). Échelles : secondes; K_for = 10 s. Processus : événements de Gillespie (attachement, détachement, commutation, perte d'information). Stochasticité : tous les événements. Observation : vitesse, vitesse angulaire, courbure, information mutuelle.
- **Feinerman et al. 2018 est une revue** [R] (le groupe près de la transition, réactivité maximale grâce aux fourmis temporairement informées); aucune valeur numérique lue (T9.15 bloquée).

### 4.7 Minorité informée et guidage de l'essaim — *Apis mellifera* (P9-M8, P9-M9)

Préréglage `apis-mellifera/essaim-guidage`.

- **Couzin et al. 2005** [R, **texte non obtenu**] : l'information se transmet sans signalisation, sans que les individus sachent qui est informé; plus le groupe est grand, plus la proportion d'informés nécessaire est faible; consensus possible même si les informés ignorent s'ils sont majoritaires. **Équations, rayons de zones, poids de la direction préférée, nombre de répétitions et valeurs de la fig. 2 inconnus** : on ne reconstruit pas le modèle de mémoire (hypothèse [I] non vérifiée : terme de direction préférée analogue à l'éq. 2.4 de Couzin et Franks 2003). Appuis : [Liu et al. 2011] [S] [à confirmer] (la proportion de meneurs → 0 quand n → ∞); [Couzin et al. 2011] [R] (les non informés inhibent une minorité opiniâtre et rendent le contrôle à la majorité).
- **Hypothèses de guidage (Schultz et al. 2008)** : moins de 5 % de l'essaim a visité le site; « guides subtils » (direction préférée, vitesse ordinaire) contre « streakers » (direction préférée et vitesse élevée). Données [T†] : trois essaims, ≈ 8 000 abeilles (1,0 kg), Appledore Island (Maine), juin et juillet 2006; nichoir à 255 m pour l'essaim du 2 juillet (8 m et 9 m sont des distances de **filmage**); **un seul essaim analysé en entier**; Sony HDR-HC1, 60 demi-images/s; Rayleigh : uniformité rejetée (P < 0,002) pour chacun des trois; variance angulaire plus faible en haut; vitesses plus élevées vers le nichoir; région haute = 10 à 20 % de l'essaim. Valeurs de vitesse en m/s non données par la page lue.
- **Autres** : Greggers et al. 2013 [R] : radar harmonique, **deux** essaims; Makinson et Beekman 2014 [R] : des essaims forcés à partir avant la phase de bourdonnement ne se guident pas, même à consensus directionnel élevé; Janson et al. 2005 et Latty et al. 2009 [M]; Beekman et al. 2006 **[non vérifiée]** (aucun résumé obtenu; énoncés [à confirmer]).
- **Écarts de référence.** « Seeley et Buhrman 2001 » est l'article « meilleur-de-N » (P5), pas un article de guidage; aucun article de Pratt sur le guidage de l'essaim n'a été trouvé (vérification non concluante : l'absence n'est pas établie; confusion probable avec Passino, coauteur de Schultz [I]).
- **ODD (à écrire après lecture de Couzin et al. 2005).** Objet : précision de direction d'un groupe selon p et N. Entités : individus informés et non informés. Le reste dépend du texte : porte PR-0.

### 4.8 Auto-assemblage (P9-M10 à P9-M13)

**Ponts d'*E. hamatum* — Reid et al. 2015** [T; SI non lu]; préréglage `eciton-hamatum/reid2015`. Type : modèle **géométrique** de coût-bénéfice, sans intégration; éq. [1]–[5].
```
B = 2 d cos(θ/2) (1 − sin(θ/2))                                              [1] distance économisée
C = 4 d² w_θ tan²(θ/2) (1 − w_θ tan(θ/2))                                    [2] coût (surface du pont)
ρ = (N − n_b) / f                                                            [3] densité de fourmis sur la piste
d* = cos(θ/2) / (2(1 − sin(θ/2))) · [ (L_T+L_A) − √( (L_T+L_A)² − N l_n w_n [1 − sin(θ/2)]² / (w_θ [1 − w_θ tan(θ/2)] sin²(θ/2)) ) ]   [4]
d* : [4] avec N l_n w_n remplacé par A N l_n w_n,  A = 17,02 (IC 95 % 15,22–18,82)                                                     [5]
avec b = 2 d tan(θ/2); f = L_T + b + (1 − d/D_max) L_A; D_max = L_A cos(θ/2)/2; L₁ = w_A/(2 tan(θ/2)); L_E = L₀ − L₁;
     L_A = 2 L₀ − w_A/tan(θ/2); n_b = w_θ b² (1 − w_θ tan(θ/2)) / (l_n w_n)
```
Paramètres : L₀ = 22,04 cm; w_A = 3,3 cm; L_T = 100 cm; l_n = 0,691 cm; w_n = 0,107 cm; densité 0,42 fourmi/cm; ω = 4,799 θ^−0,5014 (unité de θ non précisée). Dispositif : quatre plateformes imprimées en 3D, deux bras de 24 cm de long et 3,3 cm de large en V, θ ∈ {12°, 20°, 40°, 60°} (n = 5, 8, 7, 3; **23 expériences**), Barro Colorado, 2014. Publié : L_A = 13,95; 25,36; 35,01; 35,36 cm et D_max = 6,93; 12,49; 16,45; 16,61 cm. Les ponts naissent au sommet de la déviation et **s'arrêtent avant l'axe**; l'auteur écrit que les données ne permettent pas de conclure à l'optimalité. Investissement colonial (SI, grossier) : 2 000 à 20 000 fourmis, soit 2 à 20 % d'une colonie de 100 000.
**Contrôle [I]** (`p9_checks.py`, relancé) : L_A de la formule = 12,68 (12°), 25,36, 35,01, 38,36 (60°) : **13,95 (12°) et 35,36 (60°) ne concordent pas avec la formule**; D_max(60°) = 16,61 est cohérent avec 38,36 (35,36 est probablement une coquille); à 12°, D_max = 6,93 est cohérent avec 13,95 (la formule donne 6,31), cause inconnue. d* avec A = 17,02 : 10,86 (12°, plafonné à D_max = 6,93), 4,61, 1,52, 0,63 cm; avec ω = 4,799 θ^−0,5014 (θ en degrés) : 9,91; 4,23; 1,28; 0,58 cm. Les positions de la fig. 4B n'ont pas été lues : ces d* ne se comparent pas aux données.
ODD : Objet : arrêt du pont. Entités : géométrie (angle, largeur), densité de trafic. Pas de dynamique. Observation : d*.

**Ponts d'*E. burchellii* — Garnier et al. 2013** [T; équations en image]; préréglage `eciton-burchellii/garnier2013`. Type : modèle à agents, pas de 1 s; passages de fourmis ~ Poisson(λ). Expériences : 13 des 20 ponts retirés puis reformés; fentes de 7 à 26 mm (moyenne 14,92 mm); taille du pont : **43 % de la base à 30 s, 71 % à 120 s**; minimes 31,8 % (293/920) des fourmis de pont; temps passé dans le pont doublé par + 0,25 fourmi/s (relation exponentielle); 57 pistes analysées (PIV) : période dominante médiane **3,4 s (3,413)**. Modèle : probabilité de s'arrêter = sigmoïde 3D du trafic et de la densité D_t (α = 0,02; β = 144,5; γ = 3,258; θ = 12,97, symboles de l'article); probabilité de partir exponentielle décroissante du trafic sur le corps (ρ = 1,959; σ = 2,789); trafic sur le corps = part du trafic total (φ ≈ −0,52, ψ ≈ 3, ω ≈ 2; écart quadratique moyen 0,12 fourmi) intégrée sur m = 5 s. Simulations : fente de 15 mm; λ de 0,1 à 4 fourmis/s par pas de 0,05; créneaux de période 1 à 20 s, intensité 0 à 100 % du maximum (3 fourmis/s); 100 périodes; **1 000 répétitions par combinaison**. Résultats cibles : période optimale ≈ 3 s, indépendante de l'intensité (plage « ≥ 2 fourmis/s, testé jusqu'à 5 » **[à confirmer]**) et de la longueur de fente (5–30 mm), non différente de 3,413 s (Wilcoxon V = 724, P = 0,4177); **validation hors échantillon** sur 10 ponts supplémentaires : corrélation maximale au décalage 0 de 0,796 ± 0,071 (expériences) et 0,817 ± 0,002 (simulations).

**Radeaux de *Solenopsis invicta* — Mlot et al. 2011** [T; éq. (1)–(2) en image; SI non lu]; préréglage `solenopsis-invicta/mlot2011`. Type : modèle de **trajectoires rectilignes** (marche droite, rebond au bord, adhésion; seule la couche supérieure bouge); pas de temps non relevé. Paramètres : masse 1,3 ± 0,8 mg; empaquetage γ = 34 ± 2 fourmis/cm²; vitesse u ≈ 0,39 ± 0,18 cm/s; rebond p = 0,64 ± 0,04; épaisseur ≈ 2,5 ± 0,4 couches; n_∞ ≈ 40 ± 10 % de N; angle de contact individuel 102 ± 4°, radeau 133 ± 12°, Cassie-Baxter cos θ* = ϕ(cos θ_e + 1) − 1 avec ϕ = 0,35, θ* = 136° (136,3° recalculé [I]). Sphères de N = 1 000 à 7 000; N = 3 000 : R de 1,5 à 3,6 cm en 150 s (l'analogie fluide prédit 10³ s, un ordre de grandeur de trop); n(t) sigmoïde (21 courbes); condition initiale n₀ ≈ 2,6 N^0,62; **le modèle brownien échoue**.

**Grappe d'*Apis mellifera* — Peleg et al. 2018** [R pour la version publiée; T pour la préimpression bioRxiv v1, dont les valeurs peuvent différer]; préréglage `apis-mellifera/peleg2018`. Type : réseau triangulaire 2D de ressorts (gravité, attraction entre voisines, répulsion de pénétration; base fixée; surface libre); équations en image, non transcrites. Règle comportementale : une abeille devient active quand la déformation normale **intégrée sur une période de secousse** dépasse un seuil et remonte le gradient de déformation; c'est une **hypothèse comportementale** (non observée directement). Résultats v1 : plateau secoué à 0,5–5 Hz, 0 à 0,1 g; mode pendulaire ≈ 1 Hz; surface de contact A(t)/A(0) sur une courbe maîtresse (3 essais par condition); **aucune réponse à 0,01 g**; retour en 30 à 120 min; secousse verticale : pas d'adaptation à 0,05 g. Effectif (≈ 10 000 abeilles) **[à confirmer]**.

### 4.9 Construction (phase 3)

**Piliers de *L. niger* — Khuong et al. 2016** [T; SI inclus dans la version PMC]; préréglage `lasius-niger/khuong2016`. Type : agents sur **treillis cubique 3D** 200 × 200 × 200, Δl = 0,5 mm; 500 agents; Δt = 1 s; voisinage V₂₆; marche contrainte à la surface; dépôt seulement contre une face; **1 500 déplacements élémentaires par Δt** (coefficient de diffusion 87 mm²·s⁻¹); 10 simulations par valeur de 1/η_m; **seul paramètre libre : la durée de vie de la phéromone**.
```
P̃(drop | n, τ_m) = 1 − exp( −η_d(n) · Δt · exp(−τ_m · η_m) )          [1]  τ_m : temps écoulé depuis le dernier dépôt dans V₂₆; 1/η_m : durée de vie
P(drop | n) = 1 − exp(−η_d(n) Δc),   η_d(n) = −log(1 − P(drop|n)) / Δc   [S3]–[S4]
η_d(n) = η_{d,0} + b_d n  (η_{d,0} = 0,025 s⁻¹; b_d = 0,11 s⁻¹ par granule);   η_p(n) = η_{p,1} n  (η_{p,1} = 0,029 s⁻¹)
```
Autres : contacts avec une pile de taille n : μ = 0,22 ± 0,005 s⁻¹, P_portant = 0,32 ± 0,02; modulation en hauteur par la fonction de répartition d'une loi normale asymétrique (ξ = 2,866; ω = 3,727; α = 8,582) calée sur des piquets de bois (hauteurs de dépôt min. 4,02 ± 0,33 mm, max. 8,46 ± 0,64 mm; fourmi de 4,1 ± 0,14 mm : **gabarit corporel**). Dispositif : 13 colonies; 500 fourmis (11 réplications) sur boîte de Pétri de 10 cm; scanner laser horaire; pilier = structure > 3 mm. Résultats : densité ≈ 0,3 pilier/cm²; plus proche voisin **9,93 ± 0,66 mm** à 96 h; sans marquage, aucune structure; 800 s ≤ 1/η_m ≤ 1 200 s concorde; durée de vie ≫ simulation : très nombreuses petites structures (≈ 8 mm), pas de structure émergente; espacement indépendant de N (250, 500, 1 000) et de la surface.
ODD : Objet : espacement des piliers. Entités : agents (position, charge portée), cellules (matériau, horodatage du dernier dépôt). Processus : déplacement, prélèvement, dépôt modulé par la phéromone et la hauteur. Stochasticité : déplacements et décisions. Observation : densité, distance au plus proche voisin, fonction de corrélation de paires.

**Rayon d'*Apis mellifera* — Camazine 1991 → Johnson 2009** [R; T pour Johnson]; préréglage `apis-mellifera/johnson2009-rayon`. Règles de Camazine (rapportées par Johnson) : la reine pond au centre; les ouvrières déposent pollen et nectar au hasard; elles prélèvent préférentiellement pollen et nectar dans le couvain. Camazine et al. 1990 [R] : modèle mathématique (« EDO non linéaires » **[à confirmer]**); Jenkins et al. 1992 [R] : version simplifiée, bande de pollen par bifurcation. **Johnson 2009 [T]** : modèle à agents (NetLogo), 14 025 cellules, 1 itération = 1 min; reine (≤ 1 œuf/min), butineuses de pollen (gabarit « reine »), réceptrices de nectar (gabarit « gravité »), nourrices; cellule = 40 charges de nectar ou 17 de pollen; apport de nectar 30 abeilles/min; **30 exécutions par question**. Le motif vertical exige le gabarit de gravité; la bande de pollen exige gabarit « reine » **et** auto-organisation; le modèle d'auto-organisation de Camazine seul ne forme plus la bande avec des réserves réalistes (« 3 jours », fig. 3e : **[à confirmer]**). Statut à retenir : *Modèle simplifié, non robuste*. Ne pas confondre Camazine et al. 1990 (rayon) avec Camazine et Sneyd 1991 (butinage, JTB 149:547–571).

**Hors couple fourmi-abeille (phase 3, optionnel).** [Bonabeau et al. 1998a] [R, **équations non lues**] : un modèle de piliers de Deneubourg (1977) [M] modifié par quatre ajouts (courant d'air; flux net d'individus; piste auto-entretenue; gabarit de reine) donne piliers, murs, galeries, chambres sans changer le comportement. [Theraulaz et Bonabeau 1995a] [R] et [Theraulaz et Bonabeau 1995b] [M] : réseaux de particules sur treillis cubique, **guêpes** (pas des termites). [Heyde et al. 2021] [T partiel] : trois champs (matériau, termites, phéromone), *Apicotermes lamani* (espacement de plancher 4,6 et 7,2 mm; épaisseur 1,7–1,8 mm; 35 planchers); équations non relevées. [Werfel et al. 2014] [R] : règles locales **générées** pour garantir une structure donnée (robots, démonstration à trois robots); SI non lu. [Grassé 1959] [M] : origine du mot « stigmergie »; [Theraulaz et Bonabeau 1999] [R] : stigmergie quantitative et qualitative; [Heylighen 2016a], [Heylighen 2016b] [M] : stigmergie comme mécanisme de coordination.

### 4.10 Agentique — SwarmBench (Ruan et al. 2025; P9-M20) [T; annexes à reconfirmer]

Préréglage `agents/swarmbench-ruan2025`. **Deux benchmarks portent ce nom** : Ruan et al. 2025 (arXiv:2505.04364, essaim décentralisé) et [Gao et al. 2026] (arXiv:2608.30661, orchestration d'essaims) : toujours distinguer par l'identifiant arXiv.

- **Protocole.** Grille 2D discrète avec moteur physique (force de déplacement par défaut F = 2; masse d'agent m = 1; bloc de *Transport* m = 5); chaque agent est une instance LLM indépendante; **vue égocentrique k × k** (5 × 5 par défaut; 3 et 7 testés); **message anonyme ≤ 120 caractères** diffusé aux agents à portée de perception; mémoire de 5 images; épisode jusqu'à max_round (100 d'après les fig. 5 et S.6 **[à confirmer]**); `temperature` = 1,0 et top_p = 1,0 pour tous les modèles; zéro-shot.
- **Tâches** : *Pursuit*, *Synchronization*, *Foraging*, *Flocking* (former une forme cible; distance de Wasserstein à translation optimale, éq. 5; ce n'est **pas** un alignement de Vicsek), *Transport* (pousser un bloc de masse 5 hors d'une sortie; score par agent sorti = (max_round − ronde)/max_round, éq. 7).
- **Évaluation** : 13 LLM, 5 exécutions par modèle et tâche, graines fixes communes; 15 agents à règles comme références (20 répétitions; tableau S.2 non lu) **[à confirmer]**.
- **Résultats** [T] : *Flocking* est la tâche la mieux réussie, *Synchronization* la plus dispersée; sur *Transport* avec obstacle irrégulier, seuls o4-mini et deepseek-r1 ont un score moyen non nul; la dynamique physique prédit le succès, **le contenu des messages le prédit peu**; échecs : « Movement Bias », « Information Silo », « Traffic Jams », « Memory of a goldfish »; *Transport* meilleur à N = 16 qu'à N = 8, *Foraging* se dégrade avec N, *Pursuit* culmine à N = 12; k = 3 vers 5 améliore quatre tâches, k = 7 sans gain.
- **Variantes [à confirmer]** (annexes S.5, S.6, S.7, S.10–S.11 non revérifiées) : centralisé contre décentralisé (gemini-2.0-flash, 5 exécutions) : *Flocking* 9,90 ± 0,67 contre 9,40 ± 0,80 (+5 %); *Foraging* 8,20 ± 0,98 contre 5,80 ± 4,35 (+41 %); *Pursuit* 8,80 contre 8,80 (0 %); *Synchronization* 9,00 ± 3,35 contre 3,40 ± 2,94 (+164 %); *Transport* 0,00 contre 0,00 (**plancher**, pas une équivalence [I]); bruit de 20 % et délais de 0 à 4 : −33,1 % (sonnet-3.7, de 5,14 à 3,44).

---

## 5. Cibles de reproduction

**Règles.** « Répétitions » = exécutions indépendantes à graines différentes; IC = intervalle de confiance à 95 %. Une cible est **acceptée** si tous ses critères le sont; sinon la déviation entre au registre (`../docs/04-protocole-reproduction.md`). Toute tolérance « (proposée) » se calibre après numérisation de la figure (WebPlotDigitizer) ou lecture du SI. Une cible **bloquée** n'a pas de fiche de reproduction possible avant lecture de la source (porte PR-0); son critère provisoire est exploratoire.

**Correspondance avec le dossier.** Les identifiants sont ceux du dossier. Trois cibles sont ajoutées : **T9.9** (tore et hystérésis de Couzin et al. 2002, critères de P6-T1 et P6-T2, repris sans duplication), **T9.19** (docking Vicsek et Couzin et al. 2002) et **T9.33** (marche renforcée, critère de P6-T5). P6-T3 est T9.1 et P6-T4 est T9.2. Les trous T9.9 et T9.19 du dossier sont ainsi comblés; la liste va de T9.1 à T9.33 sans trou.

### 5.1 Mouvement de base, voies, raids, trafic

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.1** | *E. burchellii*. Flux F à 5 000 pas, tronçon périodique de 50 cm, N = 50, θ_p = 500 °/s, σ = 0,01 : F fort à α = 90° et θ_a = 1 000 °/s [à confirmer]; sens choisi collectivement | R | F̄(90°, 1 000) ≥ 0,8 et ≥ 0,3 au-dessus de F̄ aux bords (α ≤ 20° ou ≥ 160°; θ_a ≤ 100 ou ≥ 2 000 °/s) (proposée; critère de P6-T3). **Ajout P9** : part des répétitions à flux net positif dans [0,40 ; 0,60] (binomial bilatéral, p > 0,01) | 100 par combinaison | Couzin et Franks 2003, §4(b)(i), fig. 2b–d | [T] | PR-1 |
| **T9.2** | *E. burchellii*. Voies : rentrantes au centre, sortantes en périphérie; F maximal à ω = 1 pour Δθ_a = 1 400, 600, 200 °/s; terrain : rentrantes N = 97, sortantes N = 84 | R | Médiane(rentrantes) < médiane(sortantes) à Δθ_a = 1 400 (Mann-Whitney p < 0,01); argmax F̄ = 1 ± 0,25 (critère de P6-T4). **Ajout P9** : la médiane des rentrantes décroît de Δθ_a = 200 à 600 puis 1 400 (trois comparaisons appariées, Bonferroni; à confirmer sur la fig. 4b–d numérisée) | 100 | Couzin et Franks 2003, §4(b)(ii), éq. 2.4, fig. 3–4 | [T] | PR-1 |
| **T9.3** | *E. burchellii*. Vitesse de course **sigmoïde** en fonction de la force de la phéromone de piste (moulin circulaire expérimental) | R | **Bloquée.** Provisoire : monotone et saturante; ajustement logistique en log C, R² ≥ 0,95 sur ≥ 6 niveaux (proposée) | 30 fourmis par niveau (proposée) | Franks et al. 1991 | [R] | PR-0 |
| **T9.4** | *E. hamatum*, *E. burchellii*, *E. rapax*. Rendement maximal selon le régime de proies; paramètres optimaux « très proches » | R | **Bloquée.** Provisoire : le motif optimal diffère selon le régime; rapport max/min des paramètres optimaux entre régimes ≤ 2 (proposée) | ≥ 50 par point | Solé et al. 2000; Deneubourg et al. 1989 | [R]; [M] | PR-0 |
| **T9.5** | *L. niger*. Pont à deux branches : asymétrie à faible flux; symétrie sous poussée pour w ≤ 6 mm; γ ≈ 0,57; q = 1, k = 6, ν = 1/40 min⁻¹ | R | (a) φ_c = kν/q = 0,15 fourmi/min à ± 5 % (γ = 0; 20 perturbations initiales). (b) γ = 0,57, w = 3 mm, φ ≥ φ_S : abs(Φ₁ − Φ₂)/φ < 0,05; γ = 0, φ ≥ 10 φ_c : > 0,5 (proposée; φ_S et a à caler sur la fig. 2b de Peters; a non publié). (c) (l₁, l₂, φ) = (10 cm, 20 cm, 15 min⁻¹) : argmin_γ τ ∈ [0,45 ; 0,70] (publié 0,57). (d) capacité avec poussée ≥ 1,6 fois celle sans (publié : « doublée ») | (a) 20 perturbations; (c) ≥ 10 | Peters et al. 2006, éq. 3–5, 13–15, fig. 2, 4, 5; Dussutour et al. 2004 | [T]; [S] | PR-1 |
| **T9.6** | *A. cephalotes*. Φ = wρV_m[1 − (wρ/k_m)^n]; V_m = 4,04 cm/s; k_m = 0,59 cm⁻²; n ≈ 0,64; V/V_m = 0,39 au débit maximal; débit 50:50 supérieur à 90:10 | R | (a) test unitaire : n/(n+1) = 0,390 ± 0,005. (b) débit(50:50) > débit(90:10), Mann-Whitney p < 0,05 (extension; valeurs de Burd non lues) | ≥ 30 | Burd et al. 2002; Peters et al. 2006 | [R]; [S] | PR-1 |
| **T9.7** | *L. niger*. Pont à goulots : grappes alternées; mêmes volume et retour de nourriture que le pont large | R | **Bloquée.** Provisoire : rapport de débits ∈ [0,9 ; 1,1]; alternance (pic d'autocorrélation du signe) dans ≥ 80 % des répétitions (proposée) | 20 | Dussutour et al. 2005 | [R] | PR-0 |
| **T9.8** | Générique. Vicsek : v_a(η) à ρ = 4, v = 0,03, r = 1 | R | (a) v_a ≥ 0,95 à η = 0,5 et ≤ 0,2 à η = 4,5 pour N ∈ {40 ; 100 ; 400 ; 4 000}. (b) contrôle [I] (N = 400, une graine) : v_a = 0,99 ; 0,88 ; 0,66 ; 0,54 ; 0,38 ; 0,10 pour η = 0,5 ; 1,5 ; 2,5 ; 3,0 ; 3,5 ; 4,5, à ± 0,10 (proposée; à resserrer après ≥ 20 graines). (c) β et η_c(∞) **ne sont pas des cibles**. (d) extension : histogramme de v_a bimodal à N ≥ 4 000 près du seuil | (a) ≥ 20 graines | Vicsek et al. 1995, éq. 2–4, fig. 2–3; Grégoire et Chaté 2004 | [T] (arXiv); [R] | PR-1 |
| **T9.9** *(nouveau)* | Générique 3D (poissons, oiseaux), Couzin et al. 2002 : N = 100, r_r = 1, α = 270°, θ = 40 °/s, s = 3, σ = 0,05. (a) tore à Δr_o petit et Δr_a grand. (b) hystérésis à r_a = 14 : tore en montant de r_o ≈ 1,5 à ≈ 2,5; pas de tore en descendant; essaim sous 1,5 | R | (a) (Δr_o ; Δr_a) = (1 ; 12) : m̄ ≥ 0,5 et p̄ ≤ 0,3; (0 ; 12) : essaim, p̄ et m̄ < 0,3; (7 ; 12) : p̄ ≥ 0,8; carte concordante avec la fig. 3E–F numérisée sur ≥ 85 % des cellules (proposées; points de contrôle déduits de la fig. 4 [I], non lus sur la fig. 3). (b) montée : max de m̄ ∈ [1,5 ; 2,5] ± 0,25; descente : m̄ < 0,2 sur [1,5 ; 2,5]; aire de boucle d'IC 95 % excluant 0 (proposées) | (a) 30 par cellule; (b) 15 | Couzin et al. 2002, fig. 3–4 (P6-M1; P6-T1, P6-T2) | [T] via P6 | PR-1 |
| **T9.33** *(nouveau)* | Abstrait, Erhard : sur ℤ, X_n/n → ±(1 − e^{−β})/(1 + e^{−β}) = ±0,4621 (β = 1); piégeage presque sûr sur grille finie | R | ℤ : abs(X_n/n) à ± 0,01 de 0,4621 à n = 10⁵ pour ≥ 95 % des essais, signes équilibrés (binomial p > 0,01). Grille 6 × 6 : ≥ 99 % des essais suivent le même circuit orienté ≥ 50 tours consécutifs avant n = 10⁶ (critère opérationnel proposé; critère de P6-T5) | 1 000 | Erhard et al. 2022, Prop. 2.1, Th. 2.2 | [T] préimpression (via P6) | PR-1 |

### 5.2 Transport coopératif

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.10** | *P. longicornis*. Vitesse médiane de la charge linéaire en nombre de porteuses jusqu'à 15 (fig. 1d); r = 0,104 (N = 5 591 images, 47 expériences); fourmis permanentes (N = 14) pas plus corrélées que les autres (N = 186; P = 0,6691) | R | Modèle ajusté, « plateau propre » sans informées : R² ≥ 0,95 de la droite sur 1–15 porteuses; r ∈ [0 ; 0,25] (proposée) | 200 trajectoires par point | Gelblum et al. 2015, Results | [T] | PR-2 |
| **T9.11** | Une fourmi qui s'attache injecte ≈ 0,5 bit en quelques secondes (N = 134; fig. 2a); influence de 5 à 20 s; 0,35 à 1,4 guide simultanément; oubli de 10 s dans les simulations | R | I(direction de la charge ; direction du nid) ∈ [0,3 ; 0,7] bit (IC bootstrap sur 134 attachements simulés); durée ∈ [5 ; 20] s; nombre ∈ [0,35 ; 1,4] (taux d'attachement du SI, note 9, à fixer) | 134 attachements simulés | Gelblum et al. 2015 | [T] | PR-2 |
| **T9.12** | Pic de réponse à F_ind ≈ 4,25 (modèle étendu) et F_c = 4,3 (Ising); F_c linéaire en N; rayon optimal ≈ 1 cm (fig. 4a–d) | R | (a) Ising à champ moyen : pic à ± 3 % de N f₀/2 pour N ∈ {10 ; 20 ; 40}; relation linéaire en N, R² ≥ 0,98 (la forme F_c = N f₀/2 vient de 2016; son application à 2015 est [I]). (b) **si** les paramètres du SI sont retrouvés : pic de R(F_ind) ∈ [4,0 ; 4,5], écart à Ising ≤ 5 % (1,2 % calculé [I]). (c) R(rayon) a un maximum unique dans [0,5 ; 2] cm (facteur 2 proposé) | ≥ 200 attachements simulés par point | Gelblum et al. 2015, fig. 4a–d; Gelblum et al. 2016 | [T] (Méthodes en image) | PR-2 |
| **T9.13** | **Validation.** Courbure décroissante avec la taille (N = 90); charge de 4 cm (> 100 fourmis) bloquée par l'obstacle en U (recul de 5 cm), celle de 1 cm passe (temps P < 0,01; recul P < 0,0001; N = 11) (fig. 4e–g) | R | Rayons {0,15 ; 0,5 ; 1 ; 4 ; 8} cm : Spearman(courbure, rayon) ≤ −0,9; succès ≥ 80 % (1 cm) et ≤ 20 % (4 cm) (proportions non publiées; proposée); temps(1 cm) < temps(4 cm) et recul(1 cm) > recul(4 cm) quand les deux réussissent (Mann-Whitney p < 0,01) | 100 par rayon | Gelblum et al. 2015 | [T] | PR-2 |
| **T9.14** | **Validation.** Oscillation vers 5 fourmis (absente à 1–3); période linéaire en longueur de laisse; N_c = (F_ind/f₀)(2 + G̃/(k_c L)); G_c ≈ N/2; rotations avec tige R = 11,5 cm | R | (a) transition unimodale-bimodale de la vitesse angulaire à N ∈ [4 ; 6]. (b) période linéaire en L, R² ≥ 0,95 sur ≥ 4 longueurs. (c) N_c numérique (Hopf) = éq. 3 à ± 5 % pour 3 jeux de paramètres. (d) G_c numérique = éq. 5 à ± 5 % pour N ∈ {50 ; 100 ; 200}; G_c/N → 0,50 ± 0,02 pour N ≥ 200 F_ind/f₀ (0,4825 à 200 et 0,4685 à 100 [I]; tolérance ± 0,04 si N ≥ 100 F_ind/f₀). (e) pas de rotation complète si N < 2G dans ≥ 95 % de 100 répétitions | 100 | Gelblum et al. 2016, éq. 3 et 5, fig. 3–4 | [T] (arXiv) | PR-2 |
| **T9.15** | Revue : Ising, poids de la taille de charge, formalisme à développer | — | **Bloquée** : aucune cible chiffrée lue | — | Feinerman et al. 2018 | [R] | PR-0 |

### 5.3 Minorité informée et guidage

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.16** | Générique. p*(N) = plus petite proportion d'informés donnant une précision ≥ 0,9; p*(N) décroît avec N; consensus sans connaissance mutuelle | R | **Bloquée** (Méthodes non lues). Provisoire : p*(N) strictement décroissante sur N ∈ {10 ; 20 ; 50 ; 100 ; 200 ; 500}; p*(200)/p*(10) ≤ 0,5 (proposée); p*(N) ≤ 0,10 pour N ≥ 100 [I, d'après « moins de 10 % » rapporté par Schultz et al. 2008] | ≥ 100 par (N, p) | Couzin et al. 2005; Liu et al. 2011 [à confirmer]; Couzin et al. 2011 | [R]; [S] | PR-0 |
| **T9.17** | *A. mellifera*. Trois essaims (≈ 8 000 abeilles), un seul analysé en entier; Rayleigh P < 0,002 pour chacun; variance angulaire plus faible en haut (3 sur 3); vitesse maximale vers le nichoir (ANOVA); région haute de 10 à 20 % | R | Essaim simulé à ≤ 5 % d'informés. Streaker : pic de vitesse vers la cible significatif (ANOVA P < 0,05) dans ≥ 90 % des secteurs. Guide subtil : ≤ 10 %. Rayleigh P < 0,002 dans ≥ 90 % des secteurs pour les deux; variance(haut) < variance(bas) dans 3 essaims sur 3 (proposée) | 3 essaims × ≥ 100 simulations | Schultz et al. 2008 (tableaux 1–3 [à confirmer]; fig. 3–5) | [T†]; [R] | PR-3 |
| **T9.18** | *A. mellifera*. Greggers : l'éclaireuse de l'essaim intact vole vite vers la destination (**n = 2**). Makinson : pas de guidage avant le bourdonnement malgré un consensus élevé | R | Illustratif pour Greggers. Makinson : différence de succès (consensus élevé sans guides contre consensus moyen avec guides) > 0, IC excluant 0 (extension; valeurs non lues) | 200 | Greggers et al. 2013; Makinson et Beekman 2014 | [R] | PR-3 |
| **T9.19** *(nouveau)* | Docking Vicsek ↔ Couzin et al. 2002 : bruit uniforme de Vicsek d'écart-type η/√12 contre bruit gaussien enroulé σ | R (docking) | À fixer dans la fiche de reproduction : v_a et p̄ comparés à écart-type égal. Contraintes [I] : η_c = 2,9 ↔ 0,84 rad alors que Couzin et al. 2002 explore σ ∈ [0 ; 0,2] rad (le recouvrement exige η ≤ 0,69 ou un balayage de σ étendu); Vicsek est 2D et Couzin et al. 2002 est 3D : harmoniser la dimension | ≥ 20 graines (proposée) | Dossier, P9-M3 | [I] | PR-1; prérequis de T9.16 |

### 5.4 Auto-assemblage

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.20** | *E. hamatum*. Ponts : s'arrêtent avant l'axe; distance décroissante avec θ, croissante avec le trafic; A = 17,02 [15,22 ; 18,82]; 23 expériences; pentes 1,25 ; 0,96 ; 0,59 ; 0,52; 2 à 20 % de la colonie | R | (a) tests unitaires de B (linéaire en d), C (R² ≥ 0,99 contre d²), L_A, D_max : valeurs publiées à ± 0,01 cm à 20° et 40°; **les écarts à 12° (13,95 publié, 12,68 formule) et à 60° (35,36 contre 38,36) vont au registre comme coquilles probables**. (b) d*(θ) strictement décroissante sur les 4 angles et croissante en densité pour {0,2 ; 0,42 ; 0,8} fourmi/cm (choix proposé), 100 % des combinaisons. (c) contrôle [I] (A = 17,02) : d* = 10,86 (12°, plafonné à D_max), 4,61, 1,52, 0,63 cm, à ± 10 % (code contre formule; ne pas comparer aux données). (d) 2 000 à 20 000 fourmis (2 à 20 %) | Déterministe | Reid et al. 2015, éq. 1–5, fig. 2–4, SI | [T] | PR-4 |
| **T9.21** | *E. burchellii*. Garnier : trafic revenu en 30 s; pont à 43 % de la base à 30 s et 71 % à 120 s; période naturelle 3,4 s; période optimale ≈ 3 s; corrélation 0,796 ± 0,071 (exp.) et 0,817 ± 0,002 (sim.); temps dans le pont doublé par + 0,25 fourmi/s | R/D | (a) période maximisant la fraction de temps non vide ∈ [2,5 ; 4,0] s, indépendante de l'intensité (≥ 2 fourmis/s : [à confirmer]) et de la longueur (5–30 mm). (b) taille à 30 s ∈ [35 ; 50] % et à 120 s ∈ [62 ; 80] % (± 8 points, proposée). (c) corrélation au décalage 0 ∈ [0,75 ; 0,88], TOST ± 0,06 (proposée); **validation hors échantillon** (10 ponts non utilisés pour l'ajustement). (d) rapport des temps de séjour pour + 0,25 fourmi/s ∈ [1,7 ; 2,3] | 1 000 par combinaison; 100 périodes; (c) 1 000 simulations par pont | Garnier et al. 2013 | [T] (équations en image) | PR-4 |
| **T9.22** | *S. invicta*. Mlot : h = 2,5 ± 0,4 couches; n_∞/N = 40 ± 10 %; γ = 34 ± 2 fourmis/cm²; p = 0,64 ± 0,04; u = 0,39 ± 0,18 cm/s; θ* = 136° (Cassie-Baxter, ϕ = 0,35; mesuré 133 ± 12°); N = 3 000 : R de 1,5 à 3,6 cm en 150 s; n(t) sigmoïde; n₀ ≈ 2,6 N^0,62 | R | (a) θ* ∈ [135 ; 138]° pour ϕ ∈ [0,34 ; 0,35] (136,3° et 136,9° [I]). (b) trajectoires rectilignes : n_∞/N ∈ [0,30 ; 0,50]; épaisseur ∈ [2,1 ; 2,9]; R(150 s) ∈ [3,2 ; 4,0] cm pour N = 3 000 (± 10 %); n(t) sigmoïde mieux qu'une loi de puissance (AIC), N = 1 000 à 7 000. (c) le modèle brownien échoue (résultat négatif à reproduire) | 30 par N | Mlot et al. 2011 (éq. 1–2 en image) | [T] | PR-4 |
| **T9.23** | *A. mellifera*. Peleg (préimpression v1) : A(t)/A(0) sur une courbe maîtresse; aucune réponse à 0,01 g; retour en 30 à 120 min; pas de réponse à la secousse verticale (0,05 g) | R | Réseau de ressorts 2D : déformation normale maximale décroissante avec L_z/L_x (Spearman ≤ −0,9 sur ≥ 5 rapports); règle active : A(t)/A(0) croît et déplacement vertical net > 0 (IC excluant 0); secousse verticale de même amplitude : abs(ΔA/A(0)) < 5 % (proposée). *Modèle simplifié*; règle = hypothèse comportementale | Non fixé dans le dossier [à confirmer] | Peleg et al. 2018, fig. 2 (v1) | [R]; [T] (v1) | PR-4 |
| **T9.24** | *E. burchellii*. Échafaudages : croissance par correction d'erreur individuelle | — | **Bloquée** (équations non lues) | — | Lutz et al. 2021 | [R] | PR-0 |

### 5.5 Construction (phase 3)

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.25** | *L. niger*. Khuong : densité ≈ 0,3 pilier/cm²; plus proche voisin 9,93 ± 0,66 mm à 96 h; pcf < 1 sous 10 mm; durée de vie 800–1 200 s; sans marquage, aucune structure; espacement indépendant de N (250, 500, 1 000) et de la surface (÷ 4, × 4) | R/D | (a) 1/η_m ∈ [800 ; 1 200] s : distance moyenne à 96 h ∈ [9,0 ; 10,8] mm et densité ∈ [0,2 ; 0,4]/cm² (TOST ± 1 mm sur la distance, proposée). (b) pcf(r < 8 mm) < 0,5; pcf(r ≥ 15 mm) ∈ [0,8 ; 1,2]. (c) sans marquage, ou 1/η_m < 600 s : aucun pilier (surface ≥ 14 mm²) dans ≥ 9 simulations sur 10. (d) distance médiane variant de < 10 % entre 250, 500 et 1 000 fourmis et entre surface ÷ 4 et × 4 à 1/η_m = 1 000 s. (e) durée de vie ≫ simulation : espacement ≈ 8 mm sans structure émergente. **Tension du dossier à lever** : (d) affirme l'invariance à N alors que, à 250 fourmis, l'attendu est l'absence de piliers (fig. S9, rangée I) [à confirmer] | 10 par condition | Khuong et al. 2016, fig. 2, 4, S9, S10 | [T] | PR-5 |
| **T9.26** | *A. mellifera*. Johnson : bande de pollen 818,5 ± 241,4 (pluie fixe), 668,4 ± 209,7 (aléatoire), 391,0 ± 91,8 (sans) cellules; F₂,₈₇ = 33,76; l'auto-organisation de Camazine seule ne forme pas la bande | R | Ordre fixe > aléatoire > aucune; Welch p < 0,01 (fixe contre aucune; aléatoire contre aucune); moyennes à ± 15 %; matrice d'ablation (SO + T1 + T2 : motif vertical et bande; sans T2 : pollen dispersé; sans SO : zones indistinctes; sans T1 : concentrique; SO seule : pas de bande; fig. 3e [à confirmer]). **Cible de rejet** de la lecture classique de Camazine 1991 | 30 | Johnson 2009, fig. 2–4 (SI non lu) | [T] | PR-5 |
| **T9.27** | Termites. Piliers, murs, galeries, chambres selon quatre conditions sans changement de comportement | R | **Bloquée.** Provisoire : matrice « condition vers motif » à 5 lignes (base + 4 ajouts); reproduite pour ≥ 90 % de 30 graines par condition | 30 par condition | Bonabeau et al. 1998a | [R] | PR-0 |
| **T9.28** | Robots. Règles locales générées garantissant la structure; démonstration à 3 robots | — | **Bloquée** (SI non lu). Extension : K ≥ 20 structures, N ∈ {1 ; 3 ; 10} agents, complétion dans 100 % de ≥ 1 000 exécutions asynchrones par structure; toute exécution incomplète est un contre-exemple à consigner | ≥ 1 000 par structure | Werfel et al. 2014 | [R] | PR-0 |
| **T9.29** | *Apicotermes lamani*. Espacement de plancher 4,6 et 7,2 mm; épaisseur 1,7–1,8 mm; 35 planchers (optionnelle) | R | Moyenne simulée ∈ [4,0 ; 8,0] mm; équations non relevées | — | Heyde et al. 2021 | [T] partiel | PR-5 |

### 5.6 Agentique

| ID | Espèce; grandeur et valeur publiée | Niv. | Tolérance ou marge | Rép. | Source | Lecture | Porte |
|---|---|---|---|---|---|---|---|
| **T9.30** | SwarmBench. *Transport* meilleur à N = 16 qu'à N = 8; *Foraging* se dégrade avec N; *Pursuit* culmine à N = 12; k = 3 vers 5 améliore *Pursuit*, *Synchronization*, *Foraging*, *Flocking*; k = 7 sans gain | R | **LLM** : ≥ 3 modèles disponibles; mêmes signes que le publié; test de signe sur différences appariées, p < 0,05. **Agents à règles** (15 références) : extension; mêmes signes à tester | ≥ 20 graines communes par cellule (publié : 5) | Ruan et al. 2025, fig. 8, annexe I | [T] | PR-6 |
| **T9.31** | Centralisé contre décentralisé (gemini-2.0-flash, 5 exécutions) : *Flocking* +5 %, *Foraging* +41 %, *Pursuit* 0 %, *Synchronization* +164 %, *Transport* 0 (plancher); bruit de 20 % et délais : −33,1 % | R | Gain central positif et grand pour *Synchronization*, nul pour *Pursuit* et *Transport*, intermédiaire pour *Foraging* : accord des signes; bruit et délai : baisse moyenne du score total (IC excluant 0). **Cible du témoin orchestré de QR3** | ≥ 20 graines | Ruan et al. 2025, tableaux S.5 et S.6 | [T] **[à confirmer]** | PR-6 |
| **T9.32** | Défaillances (biais de mouvement, silos, embouteillages, mémoire de poisson rouge); indicateurs : Gini des actions, composantes connexes du graphe de vision, répulsion de type Boids | R | Les trois indicateurs corrélés négativement au score final pour *Pursuit*, *Synchronization*, *Foraging* | ≥ 20 graines (publié : 5) | Ruan et al. 2025, annexe L.5, tableau S.7 | [T] **[à confirmer]** | PR-6 |

### 5.7 Portes go/no-go

| Porte | Portée | Go | No-go et plan B |
|---|---|---|---|
| **PR-0** | Cibles bloquées (T9.3, T9.4, T9.7, T9.15, T9.16, T9.24, T9.27, T9.28) et modèles dont les équations sont en image (Gelblum et al. 2015, Garnier, Mlot, Peleg) | Source lue en texte intégral (PDF); équations, paramètres et unités transcrits; fiche de reproduction écrite avant le code | La cible reste « bloquée », exclue des critères d'achèvement; son critère provisoire sert d'essai exploratoire marqué comme tel; aucune page ne l'affiche comme reproduite. |
| **PR-1** | Mouvement de base : T9.1, T9.2, T9.5, T9.6, T9.8, T9.9, T9.19, T9.33 | Tous acceptés, ou déviation justifiée au registre : go pour les pages 4, 12 et 15 au niveau Vérifier, E9.4 et E9.5 | La page garde le statut *Modèle simplifié — reproduction non acquise*; le résultat négatif est publié. |
| **PR-2** | Transport : T9.10 à T9.14 | T9.10 à T9.12 acceptées (réplication) avant d'évaluer T9.13 et T9.14 (validation) | Valeurs ajustées du SI illisibles : T9.12(b) n'est pas évaluée (T9.12(a), Ising, suffit à la page 2); T9.13 et T9.14 deviennent exploratoires. |
| **PR-3** | Minorité informée : T9.16 à T9.19 | Couzin et al. 2005 lu (PR-0) et T9.19 acceptée : go pour E9.1 | La page 9 reste *Hypothèse de l'auteur*; E9.1 n'est pas lancée. |
| **PR-4** | Auto-assemblage : T9.20 à T9.23 | T9.20(a), T9.21 et T9.22 acceptées | Statut *Modèle simplifié*; écarts consignés. T9.23 reste un *Modèle simplifié* quoi qu'il arrive. |
| **PR-5** | Construction (phase 3) : T9.25, T9.26, T9.29 | Condition proposée [I] : PR-1 et PR-4 passées; décision de lancement prise dans `../docs/03-plan-de-recherche.md` | Phase 3 reportée; E9.3 n'est pas lancée (elle exige T9.25 accepté). |
| **PR-6** | Agentique : T9.30 à T9.32; E9.1 à E9.3, E9.6 | ≥ 3 modèles LLM disponibles et leurs paramètres **revérifiés à la date d'exécution** (cadre, correction « Paramètres LLM »); agents à règles du benchmark exécutés seuls; témoin orchestré prêt | Volet limité aux agents à règles et à un témoin orchestré à règles; LLM reportés à P7. |

---

## 6. Expériences originales

Numérotation : E9.1 à E9.3 viennent du dossier; E9.4 à E9.6 sont ajoutées par la fiche (E9.4 d'après la mise à jour de Chan et Kanso 2026 signalée par P6; E9.5 d'après T9.8(d); E9.6 d'après T9.31). **Chaque volet agentique a un témoin orchestré et est mesuré à budget de calcul égal, avec les trois références préenregistrées du cadre** (agents indépendants sans canal, agent unique à budget égal, colonie à règles); G, R et le coût sont définis dans `../docs/06-metriques-et-typologie.md`. Les exécutions LLM exigent la revérification des modèles (porte PR-6).

**E9.1 — Proportion d'informés, règles contre LLM** (H9.17). *Prérequis* : T9.16 accepté, T9.19 accepté (PR-3).
- *Plan* : (1) réplication de p*(N) avec des agents à règles de type Couzin; (2) mêmes grilles avec des agents LLM sur une tâche de direction commune où une fraction p reçoit la direction du but (tâche à définir au préenregistrement); (3) bras orchestré : un agent central reçoit la vérité.
- *Facteurs* : N ∈ {10 ; 20 ; 50 ; 100 ; 200 ; 500} (grille de T9.16; à réduire si le coût l'exige [à confirmer]); p; type d'agent (règles, LLM, orchestré); format du message (scalaire, tuple symbolique, texte plafonné : composante « format » du vecteur R).
- *Répétitions* : ≥ 100 par (N, p) pour les règles (proposée); pour les LLM, fixées après pilote selon le coût [à confirmer].
- *Lecture* : rapport p*(200)/p*(10) pour les LLM. Prédit ≥ 0,8; réfuté si ≤ 0,5 (IC); entre les deux, **non concluant** (règle proposée).
- *Contraintes* : `temperature` non réglable sur les modèles récents : la variabilité vient de la répétition des appels; non-déterminisme documenté [Atil et al. 2024]; modèle, version et paramètres consignés à chaque appel.

**E9.2 — Coût de la coordination** (H9.18). *Prérequis* : T9.20 accepté (PR-4), PR-6 pour les LLM.
- *Plan* : tâche d'acheminement où k agents, immobilisés, raccourcissent le trajet des autres (analogue du pont : bénéfice croissant, coût croissant plus vite, comme B et C de Reid et al. 2015). Étape 1 : agents à règles, pour vérifier le maximum intérieur; étape 2 : agents LLM.
- *Facteurs* : k, y compris k = 0 (grille à fixer au pilote [à confirmer]); taille du collectif; canal.
- *Mesures* : débit (tâches achevées par unité de budget); part des jetons ou des agents consacrée à la coordination; latence.
- *Lecture* : maximum intérieur si débit(k*) dépasse débit(k = 0) d'au moins 10 % (dossier); réfuté si le débit est monotone en k. Répétitions à fixer au pilote.
- *Témoin orchestré* : un orchestrateur fixe k à partir d'un plan global.

**E9.3 — Artefact persistant à durée de vie réglable contre messages** (H9.19, phase 3). *Prérequis* : T9.25 accepté (PR-5).
- *Plan* : tâche de construction sur un plateau partagé, analogue du substrat de Khuong et al. 2016 : les agents déposent et prélèvent des unités; le marquage est attaché à l'artefact avec une durée de vie.
- *Facteurs* : durée de vie (au moins quatre niveaux, dont « sans marquage » et « très longue devant l'horizon », par analogie avec T9.25(c) et (e); proposée); canal (artefact persistant, message dirigé); nombre d'agents (trois valeurs, proposée; à fixer).
- *Mesures* : période spatiale du motif, densité de structures, présence ou absence de structure.
- *Lecture* : la période croît puis sature; variation ≥ 30 % entre la durée de vie la plus courte et une durée intermédiaire; réfuté si l'IC de la variation contient 0.
- *Témoin orchestré* : un orchestrateur attribue les sites à partir d'un plan global (A1 oui, A2 oui). Répétitions à fixer.

**E9.4 — Hystérésis du tore et vitesse de balayage** (H9.4, exploratoire). *Prérequis* : T9.9 accepté (PR-1).
- *Plan* : refaire le balayage montant puis descendant de r_o à r_a = 14 en variant la durée du palier (2 000 pas publiés, plus au moins deux autres, proposée) et σ (0,05 publié, plus au moins une valeur, proposée); aire de boucle de m̄.
- *Répétitions* : 15 par point (comme publié). *Lecture* : pente de l'aire contre log(durée), IC 95 %; réfutée si l'IC contient 0.

**E9.5 — Bimodalité de Vicsek près du seuil** (H9.6, exploratoire). *Prérequis* : T9.8(a) accepté; relire Grégoire et Chaté 2004 (tailles, mesure du caractère discontinu) avant de fixer le critère.
- *Plan* : N ∈ {4 000 ; 10 000}, η balayé finement autour du seuil apparent à ρ = 4, séries longues, histogramme de v_a. Critère de bimodalité fixé au préenregistrement [à confirmer]. Voisinage par liste de cellules (section 9). ≥ 20 graines (proposée).

**E9.6 — Témoin orchestré : structure de tâche et gain central** (H9.20). *Prérequis* : T9.31 accepté (PR-6).
- *Plan* : (1) **avant toute exécution**, classer a priori chacune des cinq tâches (décomposable ou séquentielle) et préenregistrer l'ordre prédit du gain central; (2) rejouer centralisé et décentralisé sur ≥ 20 graines communes avec ≥ 3 modèles (T9.30); (3) ajouter le bras « agents à règles »; (4) mesurer G, le coût (jetons, appels, latence, messages).
- *Lecture* : accord des signes; quand les deux modes sont proches de 0 (*Transport*), conclure « non concluant » et non « nul ». Avec cinq tâches seulement, aucun test d'ordre n'a la puissance voulue : le résultat est descriptif [I].

---

## 7. Parallèle agentique

Règle de lecture : on transpose des **relations** (comment une grandeur varie avec une autre), pas des termes (« fourmi », « pont », « leader »). Chaque énoncé porte un statut épistémique et chaque côté est sourcé; la correspondance elle-même est une inférence du dossier [I].

### 7.1 Typologie des mécanismes de P9 [*Hypothèse de l'auteur*; `../docs/06-metriques-et-typologie.md` fait foi]

| Mécanisme | A1 plan global | A2 contrôle central | A3 médium | Régime |
|---|---|---|---|---|
| Suivi de piste, marquage du matériau (Couzin et Franks 2003; Khuong et al. 2016) | non | non | état partagé persistant | Auto-organisation stigmergique |
| Force sur la charge (Gelblum et al.) | non | non | diffusion éphémère (la charge transmet les forces) | Auto-organisation par signaux directs |
| Vision et vitesse (essaim, Vicsek, zones) | non | non | diffusion éphémère | Auto-organisation par signaux directs |
| Pont vivant (Reid; Garnier) | non | non | trafic perçu (éphémère) | Auto-organisation par signaux directs |
| SwarmBench décentralisé | non (le chorégraphe est le concepteur du prompt) | non | message anonyme ≤ 120 caractères (éphémère) | Auto-organisation par signaux directs |
| SwarmBench centralisé (agent_0 commandant) | oui | oui | — | Orchestration |
| TERMES (Werfel et al. 2014) | oui (structure spécifiée; règles générées) | non | environnement partagé | Chorégraphie spécifiée |

### 7.2 Relations transposées

| n° | Relation observée (côté colonie) | Relation proposée (côté agents) | Statut | Où l'analogie casse | Test |
|---|---|---|---|---|---|
| 1 | La proportion d'informés nécessaire baisse quand le groupe grandit, si les non informés sont neutres [Couzin et al. 2005] [R]; [Liu et al. 2011] [S] [à confirmer]; les non informés inhibent une minorité opiniâtre [Couzin et al. 2011] [R] | p*(N) pour des agents LLM. Les agents se conforment publiquement à une norme qu'ils rejettent en privé dans 64 à 94 % des cas (8 modèles); un seul « entrepreneur de norme » ne provoque une cascade que dans moins de 26 % des cas pour 7 modèles sur 8 (48 % pour GPT-4o) [YS 2026] [R] | *Hypothèse de l'auteur* | La **neutralité** des non informés : les LLM ne sont pas neutres. | E9.1 |
| 2 | 0,35 à 1,4 guide simultané, 5 à 20 s chacun; réponse maximale à un conformisme intermédiaire; les grosses charges perdent la réactivité [Gelblum et al. 2015] [T] | Un orchestrateur persistant correspond au régime « trop ordonné »; une rotation d'éclaireurs informés à vie courte, au régime observé; F_ind a pour analogue le degré d'adoption de la trajectoire courante du groupe [I]; conformité des LLM à la majorité : [Weng et al. 2025] [S, via P5] | *Analogie* (F_ind); *Hypothèse de l'auteur* (rotation) | F_ind est un couplage mécanique (unité de force); le conformisme LLM se mesure par un taux de réponse. | Indirect : E9.6; expérience dédiée = piste ouverte |
| 3 | Le modèle de Gelblum n'a aucun signal : l'influence passe par la force sur la charge [T]. Dans SwarmBench, le contenu des messages prédit peu le succès, la dynamique physique de groupe beaucoup, alors que les messages dominent l'importance des variables pour prédire l'action suivante [Ruan et al. 2025] [T]; la réutilisation des technologies commence surtout par l'observation physique des artefacts [Pal et al. 2026] [R] | Pour le transport et la construction, privilégier un **état partagé observable** (axe A3) plutôt que des messages dirigés | *Hypothèse de l'auteur* | Une force n'est pas un jeton : la charge intègre les forces sans interprétation. | E9.3 |
| 4 | Sans marquage, aucune structure; durée de vie de 800 à 1 200 s : piliers espacés de ≈ 10 mm; durée de vie démesurée : ≈ 8 mm, sans structure émergente [Khuong et al. 2016] [T] | La durée de vie d'un artefact partagé est un **paramètre de contrôle à balayer**, avec deux échecs symétriques : rien ne se construit, ou saturation. Appuis : « mémoire de poisson rouge » rattachée à l'absence de mémoire stigmergique (annexe L.5 de [Ruan et al. 2025], [à confirmer]); la stigmergie physique seule suffit à des sociétés capables sans surpasser la recherche isolée pour la meilleure invention [Pal et al. 2026] [R]; traces sans mémoire individuelle : échec complet, seuil ρ_c = 0,230 retrouvé à 13 % près [Khushiyant 2025] [R; préimpression à auteur unique, prudence] | *Hypothèse de l'auteur* | Phéromone chimique dans un matériau, en secondes réelles, contre jeton à durée de vie en pas ou en jetons. | E9.3 |
| 5 | 2 à 20 % de la colonie immobilisée dans les ponts; le pont s'arrête avant l'axe; optimalité non revendiquée [Reid et al. 2015] [T] | Mesurer la part des agents ou des jetons consacrée à la coordination et chercher un optimum intérieur. L'orchestration seule multiplie la latence par plus de 60 (cause attribuée à l'implémentation); une topologie mal adaptée fait passer le succès de plus de 90 % à moins de 30 % [Orogat et al. 2026] [R, résumé] | *Hypothèse de l'auteur* | Un pont est un ensemble de corps immobilisés; un agent de coordination est un appel qui peut être réaffecté. | E9.2 |
| 6 | Chez le transporteur le graphe est complet (tout le monde sent la charge) : F_c ∝ N [Gelblum et al. 2015] [T] | Une topologie irrégulière dépasse une topologie régulière et la performance suit une loi logistique du nombre d'agents [Qian et al. 2024] [R]; un débat clairsemé donne des résultats comparables ou meilleurs à moindre coût [Li et al. 2024b] [R]; un degré critique de communication sépare prolifération d'hypothèses fausses et état résolu [Zheng et al. 2026] [R]; [Zhuge et al. 2024] [R] optimise la connectivité. SwarmBench : k = 5 meilleur que 3, k = 7 sans gain pour *Transport* [T]. Le levier pertinent est **quelle information atteint qui** | *Analogie* | La topologie d'un système d'agents est **conçue**, pas émergente. | T9.30 (k) |
| 7 | Vicsek : alignement local, transition d'ordre [Vicsek et al. 1995] [T] | Des LLM qui doivent faire du flocking convergent vers la moyenne des positions initiales ou divergent, sans notion utile de forme ou de distance [Li et al. 2024a] [R]; [Li et Zhou 2025] [R] ajoute un consensus par influence, validé sur drones. Le *Flocking* de SwarmBench est une **formation de forme**, pas un alignement de Vicsek [T]. Proposition : alignement par une couche de règles, LLM à la perception et à la planification | *Hypothèse de l'auteur* | Le bruit de Vicsek n'est pas la température d'un LLM, non réglable sur les modèles récents. | Piste ouverte (hors de ce plan); docking sur le modèle de Vicsek |
| 8 | Des règles locales **générées** garantissent une structure donnée [Werfel et al. 2014] [R]; essaim d'environ mille robots (« 1 024 » [à confirmer]) [Rubenstein et al. 2014] [R]; politiques d'attachement-détachement inspirées de la fourmi [Wilson et al. 2014] [R] | Relie P9 au problème inverse du cadre (règles locales qui garantissent une propriété globale) et à P7 | *Analogie* | Robots déterministes à détection locale précise, pas des LLM. | T9.28 (extension, bloquée) |
| 9 | — | Gain du contrôle central selon la tâche : +164 % (*Synchronization*), +41 % (*Foraging*), +5 % (*Flocking*), 0 (*Pursuit*, *Transport*), écarts-types parfois supérieurs au gain [Ruan et al. 2025] [T] [à confirmer] | *Hypothèse de l'auteur* jusqu'à l'acceptation de T9.31 | Un modèle, 5 exécutions; *Transport* est un plancher. | T9.31, E9.6 |

### 7.3 Ce qui se transpose, ce qui ne se transpose pas

| Se transpose (avec test) | Ne se transpose pas tel quel |
|---|---|
| Mathématique des transitions d'ordre (Vicsek; Ising à champ moyen) pour des états discrets d'agents [*Modèle simplifié*] | Forces mécaniques sur une charge, flottabilité et angle de contact des radeaux, géométrie du pont (parties physiques de Gelblum, Mlot, Reid) |
| Loi « moins d'informés quand N croît », si les non informés sont neutres [*Hypothèse de l'auteur*] | Neutralité des non informés : les LLM se conforment (64 à 94 %) |
| Durée de vie d'un marquage partagé comme paramètre de morphogenèse [*Hypothèse de l'auteur*] | Phéromone chimique dans le matériau et diffusion |
| Compromis coût-bénéfice d'une structure de coordination [*Analogie*] | L'optimalité : non revendiquée même chez la fourmi |
| Rotation de meneurs informés à vie courte [*Hypothèse de l'auteur*] | `temperature` comme bruit : non réglable sur les modèles récents; le bruit de Vicsek n'est pas la température d'un LLM |

### 7.4 Témoin orchestré et structure de tâche

**Définitions provisoires** (la définition du programme est dans `../docs/06-metriques-et-typologie.md`) : une tâche est *décomposable* si ses sous-tâches se réalisent sans dépendance d'ordre ni état partagé unique à faire converger; *séquentielle* dans le cas contraire.

| Volet | Bras orchestré (témoin) | Structure de tâche [*Hypothèse de l'auteur*] | Mesure |
|---|---|---|---|
| E9.1 | Agent central qui reçoit la vérité | Perception décomposable; consensus sur une direction = état partagé unique : séquentielle | G aux trois références + bras orchestré |
| E9.2 | Orchestrateur qui fixe k selon un plan global | Acheminement : décomposable, hors coût de coordination | Débit à budget égal |
| E9.3 | Orchestrateur qui attribue les sites selon un plan (A1 oui, A2 oui) | Décomposable dans l'espace après amorçage, dépendante de l'histoire dans le temps | Période du motif, coût |
| T9.31, E9.6 | Mode centralisé de SwarmBench (agent_0) | À classer **avant exécution** (préenregistré). Provisoire [I] : *Synchronization* séquentielle (un état binaire commun); *Foraging* décomposable | Score, G, coût |

**Avertissement.** Si *Foraging* est classée décomposable, son gain central de +41 % irait **contre** l'hypothèse (avec des écarts-types parfois supérieurs au gain, [à confirmer]); les valeurs publiées ne se rangent donc pas d'elles-mêmes selon la dichotomie. D'où la classification préenregistrée avant toute lecture des résultats.

### 7.5 Lien avec P7

P7 (`../projets/P7-synthese-agentique.md`) reproduit d'abord des résultats publiés (liste au cadre, corrections factuelles) et dépend de P1, P3, P5 et P8. P9 fournit à P7 : (a) les cibles SwarmBench et le témoin orchestré (T9.30 à T9.32, E9.6); (b) la loi p*(N) et son test en condition de conformisme (E9.1); (c) le paramètre de durée de vie d'un artefact (E9.3); (d) la mesure du coût de coordination (E9.2). P9 ne duplique pas les grilles LLM communes de P7 (capacité, taille N, coût) : il s'y branche. La dépendance P9 vers P7 n'est pas au cadre; elle est proposée [I] et revient à `../docs/03-plan-de-recherche.md`.

---

## 8. Visuels et trois niveaux

Gabarit, charte, évaluation et accessibilité communs : `../docs/07-vulgarisation-evaluation.md` (V0). Cette section ne donne que ce qui est propre à P9. Charte du cadre : fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues (F, p̄, m̄, v_a). **Pas d'anthropomorphisme** : la fourmi ne « décide » pas, elle « bascule » avec une probabilité.

### 8.1 Inventaire

Numérotation du dossier (1 à 14), plus la page 15 (le moulin, repris de P6). Rang : 1 = phase 2, publiée après passage de la porte de sa cible; 2 = après lecture bloquante (PR-0) ou en fin de phase 2; 3 = phase 3. Public principal : proposé, à valider par V0.

| n° | Titre | Cibles | Public (proposé) | Statut épistémique | Rang |
|---|---|---|---|---|---|
| 15 | **Moulin ou tore ?** | T9.1, T9.2, T9.9, T9.33 | Grand public, étudiants | *Résultat reproduit* (après T9.1, T9.2, T9.9); *Modèle simplifié*; le rapprochement poissons-fourmis est une *Analogie* | 1 |
| 1 | La charge qui hésite | T9.10 à T9.13 | Étudiants | *Résultat reproduit* après T9.12 et T9.13 | 1 |
| 2 | Tirer ou soulever | T9.12 | Étudiants | *Modèle simplifié* | 1 |
| 3 | Une laisse, et ça oscille | T9.14 | Étudiants | *Résultat reproduit* après T9.14 | 1 |
| 4 | Trois voies, ou tout mélangé, ou on se bouscule | T9.2, T9.5, T9.6 | Grand public | *Résultat reproduit* et *Modèle simplifié*; l'application au routage de données est une *Analogie* | 1 |
| 5 | Où le pont s'arrête-t-il ? | T9.20, T9.21 | Étudiants | *Modèle simplifié* | 1 |
| 6 | Le radeau | T9.22 | Grand public | *Résultat reproduit* pour les mesures; *Modèle simplifié* pour la dynamique | 1 |
| 7 | La grappe s'étale | T9.23 | Grand public | *Modèle simplifié*; la règle individuelle est une *Hypothèse de l'auteur* | 1 |
| 12 | Le tournant du bruit | T9.8 | Étudiants | *Résultat reproduit* pour la phénoménologie; *Modèle simplifié* | 1 |
| 9 | Qui guide l'essaim ? | T9.16 à T9.18 | Étudiants, praticiens | *Modèle simplifié*; *Hypothèse de l'auteur* tant que Couzin et al. 2005 n'est pas lu | 2 |
| 13 | Carte comparative fourmi, abeille, agent | — | Praticiens | *Analogie* | 2 |
| 14 | Rejouer SwarmBench | T9.30 à T9.32 | Praticiens | *Résultat reproduit* pour les benchmarks; *Analogie* pour le rapprochement | 2 |
| 8 | Piliers à la phéromone | T9.25 | Étudiants | *Résultat reproduit* | 3 |
| 10 | Rayon : plan ou auto-organisation ? | T9.26 | Étudiants | *Modèle simplifié, non robuste* (Camazine); cible de rejet | 3 |
| 11 | Du pilier au mur | T9.27 | Étudiants | *Modèle simplifié*; **à produire après lecture des équations** | 3 |

### 8.2 Voir — récit guidé avec prédiction

Chaque page ouvre sur une question à laquelle l'apprenant répond **avant** la révélation; manipulation minimale (lecture, pause, pas à pas, choix de réponse).

| Page | Ce qui est montré | Prédiction demandée (réponse publiée) |
|---|---|---|
| 15 | Chronologie d'un moulin de terrain [Schneirla 1944] : 4 septembre 1936, *Eciton praedator*, quelques centaines d'ouvrières; 7 h 30 à 8 h 15 : anneau de 10 à 11,5 cm; midi : 14 à 15 cm; 20 h 30 : deux anneaux après une forte pluie; lendemain : environ trois douzaines tournent encore. Puis le tronçon périodique et le tore côte à côte. (La boucle de 1 200 pieds de Beebe 1921 n'est affichée qu'avec les marques **[non vérifiée]** et [à confirmer].) | « Une fourmi repart à contre-sens : que se passe-t-il ? » (elle est retournée par une série de collisions frontales) |
| 1 | Anneau de charge vu de dessus; fourmis informées en flèche vers le nid | « La grosse charge passe-t-elle l'obstacle en U ? » (non, à 4 cm; celle de 1 cm passe) |
| 3 | Charge sur laisse, vitesse angulaire | « Combien de fourmis faut-il pour que la charge oscille ? » (vers 5) |
| 4 | Trois panneaux : *Eciton*, *Atta*, *Lasius* | « Que fait la colonne quand le pont se rétrécit à 3 mm ? » (usage symétrique des deux branches pour w ≤ 6 mm) |
| 5 | Pont entre deux bras en V | « Quand l'angle augmente, le pont va-t-il plus loin ou moins loin ? » (moins loin) |
| 12 | Nuage de particules, bruit croissant | « Le groupe se désordonne-t-il progressivement ou brutalement ? » (brutalement en 2D, d'après Grégoire et Chaté 2004) |
| 6 | Sphère de 3 000 fourmis sur l'eau | « S'étale-t-elle ou reste-t-elle une boule ? » (R de 1,5 à 3,6 cm en 150 s) |
| 7 | Grappe sur plateau secoué | « Réagit-elle à une secousse verticale ? » (non, à 0,05 g) |
| 9 | Essaim en vol | « Quelle proportion d'informés faut-il ? » (réponse **non établie** tant que T9.16 est bloquée) |
| 14 | Quatre échecs rejoués à côté du moulin et du pont | « Les messages expliquent-ils le succès ? » (peu : la dynamique physique de groupe prédit mieux) |

### 8.3 Explorer — bac à sable étayé

| Famille (pages) | Ce qui est montré et manipulé | Vue de l'agent | Modifier la règle |
|---|---|---|---|
| Moulin, tore (15) | Anneau périodique (N = 50) et tore 3D en projection; jauges F, p̄, m̄. α, θ_a, ω, Δθ_a; Δr_o, Δr_a, α; sens du balayage | Fourmi : cercle et arc d'évitement, stimulus de chaque antenne. Individu du banc : trois zones concentriques et angle mort | Intensité du marquage (Q); angle mort. Ce que le modèle produit sans marquage est affiché comme **exploratoire** (aucune cible publiée lue) |
| Transport (1 à 3) | Anneau de charge, histogrammes de vitesse, obstacle en U. Rayon (0,15 à 8 cm), F_ind, N, longueur de laisse; bouton « attacher une fourmi informée » (durée de vie 10 s) | Une seule force locale perçue; état tire, soulève ou informée; **aucune consigne** | F_ind; durée de l'information K_for; taux de commutation |
| Trafic (4) | Trois panneaux et jauge de flux commune. ω, Δθ_a; proportion 50:50; largeur w; γ | Ce que la fourmi évite ou suit; la « poussée » | γ; asymétrie d'évitement |
| Ponts (5) | Courbes B(d) (droite) et C(d) (parabole); fraction de temps où le pont existe. θ, trafic, période de forçage | Trafic perçu sur le corps (intégré sur 5 s); probabilités d'arrêt et de départ | Période; fenêtre d'intégration |
| Radeau, grappe (6, 7) | N; bouton « ajouter du savon »; accélération, fréquence, direction de secousse | Fourmi qui marche droit et rebondit au bord (p = 0,64); abeille qui intègre la déformation | Probabilité de rebond; seuil d'activation; règle active allumée ou éteinte (hypothèse) |
| Guidage (9) | Proportion d'informés, N; histogramme de vitesse selon la direction | Voisins dans les zones; direction préférée | Mode « guide subtil » ou « streaker » |
| Vicsek (12) | η, N (40, 400, 4 000), ρ; v_a en direct; histogramme près du seuil | Voisins dans le rayon r | r; η |
| Construction (8, 10, 11) | 1/η_m (200 s à 10 h), N (250, 500, 1 000), surface; cinq panneaux du rayon; interrupteurs du pilier au mur | Taille de pile n, taux de dépôt η_d(n), hauteur | Durée de vie; interrupteur « sans marquage »; mécanismes du rayon (SO, T1, T2) |
| SwarmBench (14) | N, k; central ou décentralisé | Vue k × k et message ≤ 120 caractères | k; mémoire |

### 8.4 Vérifier

Pour chaque page : distribution sur N graines (graines affichées) contre la valeur publiée numérisée et sa tolérance; verdict de la cible T9.x; lien vers le code, le manifeste de run et le registre des déviations; limites. **Encarts obligatoires** :
- Ponts : « les auteurs ne revendiquent pas que l'arrêt soit optimal » (T9.20).
- Grappe : « règle individuelle = hypothèse de l'auteur » (T9.23).
- Vicsek : « β et η_c ne sont pas des cibles; la transition est discontinue en 2D ».
- Rayon : « l'explication classique ne suffit pas » (Johnson 2009).
- SwarmBench : « deux benchmarks portent ce nom » (identifiants arXiv affichés).
- Page 15 : « le modèle simule le choix d'un sens sur un tronçon périodique, pas l'apparition d'un moulin ».
- Chaque cible de validation (T9.13, T9.14, T9.21(c)) est marquée **validation**; les autres, **réplication**.
- Encart « Ce que fait vraiment la reine » (page 9) : à rédiger par V0; aucune source lue ici ne documente le rôle de la reine dans le guidage.

### 8.5 Objectifs d'apprentissage (mesurables)

Instruments (pré-test, post-test, condition témoin statique) : `../docs/07-vulgarisation-evaluation.md`.

| n° | Après la page, l'apprenant peut… | Item |
|---|---|---|
| OA1 | Nommer le mécanisme (marquage ou zones d'interaction) qui produit chacune de deux rotations collectives et justifier par la présence ou l'absence de marquage (page 15) | Classification justifiée |
| OA2 | Prédire le sens de l'effet de la taille de la charge sur le franchissement d'un obstacle (page 1) | Prédiction à choix |
| OA3 | Expliquer pourquoi des informés transitoires suffisent à orienter une charge sans meneur persistant (pages 1 à 3) | Choix de l'énoncé exact parmi quatre |
| OA4 | Lire une distribution sur N graines et décider si une cible est acceptée (niveau Vérifier, toutes pages) | Lecture de graphe |
| OA5 | Distinguer réplication et validation sur un exemple (T9.10 contre T9.13) | Appariement |
| OA6 | Énoncer ce qui se transpose aux agents et ce qui ne se transpose pas, avec un exemple de chaque (pages 13, 14; praticiens) | Production courte |
| OA7 | Dire pourquoi l'arrêt du pont n'est pas démontré optimal (page 5) | Choix de l'énoncé exact |

### 8.6 Accessibilité propre à P9

Base commune : WCAG 2.2 AA, daltonisme, `prefers-reduced-motion`, clavier, mobile (cadre).
- **Sens des flux sans la couleur** : rentrantes et sortantes distinguées par la forme (triangle orienté, cercle) et la position, pas par la couleur seule; mêmes règles pour les spins (symboles ↑ et ↓ en plus de la couleur).
- **Mouvement** : avec `prefers-reduced-motion`, lecture pas à pas et instantanés des temps clés (début, milieu, fin), curseur de temps au clavier; aucun clignotement.
- **Équivalents textuels** : tableau de valeurs sous chaque graphe (par exemple rentrantes N = 97, sortantes N = 84); description textuelle de l'anneau; « Vue de l'agent » doublée d'un lecteur textuel (« cette fourmi perçoit une force vers la gauche »).
- **Densité** : les cas à grand N (Vicsek 10 000; radeau 7 000) ont une version précalculée et une image statique de repli sur mobile.
- **Unités explicites** (°/s, cm, s) et valeurs numériques saisissables à côté des curseurs.
- **Contrôle** : l'outillage automatique ne détecte qu'une partie des problèmes (57 % en volume selon une étude de fournisseur [Deque 2021]) : prévoir une passe manuelle au clavier et au lecteur d'écran avant publication.

### 8.7 Erreurs de compréhension à prévenir

Les erreurs de type « chef » ou « plan » sont documentées pour les processus émergents [Chi et al. 2012].

| Erreur courante | Ce qui est publié | Prévention dans la page |
|---|---|---|
| « Le moulin est propre à la piste chimique, et les poissons tournent pareil » | Le tore de Couzin et al. 2002 n'a aucune phéromone; Schneirla 1944 notait déjà les différences de modalité, de dimension et d'initiation | Page 15 : tableau « même motif, autre mécanisme » (section 4.2) |
| « La simulation montre que le moulin apparaît » | Couzin et Franks 2003 simulent le choix d'un sens sur un tronçon périodique; aucun modèle évalué par les pairs de l'apparition 2D n'a été trouvé | Encart de la page 15 |
| « Une fourmi chef dirige la charge » | 0,35 à 1,4 guide simultané, 5 à 20 s chacun; les fourmis attachées en permanence ne sont pas plus corrélées | Page 1, histogramme des durées |
| « Plus il y a de fourmis, mieux la charge est dirigée » | Une charge de 4 cm (> 100 fourmis) perd la réactivité et échoue l'obstacle en U | Page 1, prédiction |
| « Les ponts sont optimaux » | Les auteurs refusent de conclure à l'optimalité; 2 à 20 % de la colonie immobilisée | Encart de la page 5 |
| « Les streakers sont démontrés » | Trois essaims dont un seul analysé en entier; le modèle des guides subtils n'est pas réfuté en général | Page 9, interrupteur et bandeau |
| « Le motif du rayon est concentrique et prouve l'auto-organisation » | Le motif est vertical; l'auto-organisation seule ne forme pas la bande de pollen [Johnson 2009] | Page 10 |
| « La transition d'ordre de Vicsek est continue » | Discontinue en 2D [Grégoire et Chaté 2004] | Page 12 |
| « Réplication = validation » | Seules T9.13, T9.14 et T9.21(c) prédisent des données non utilisées pour l'ajustement | Marque sur chaque cible |
| « Les messages entre agents expliquent leur réussite » | Le contenu des messages prédit peu le succès dans SwarmBench | Page 14 |
| « SwarmBench » désigne un seul benchmark | Deux benchmarks homonymes | Identifiants arXiv affichés |
| « La température d'un LLM joue le rôle du bruit de Vicsek » | `temperature` n'est pas réglable sur les modèles récents | Page 13, ligne « bruit » |

---

## 9. Plan de simulation

Architecture commune (trois couches, moteur headless Node et couche navigateur, TypeScript partout, `tsc --noEmit`) : cadre et `../docs/05-spec-simulation.md`. Cette section ne dit que ce que P9 y ajoute ou exige.

### 9.1 Couche 1 — noyau (S0) : ce que P9 exige en plus

Le noyau du cadre (PRNG à graine, horloge à pas fixe, RK4, Gillespie, événements discrets, grille, enregistreur, scénario, manifeste) ne suffit pas à P9 (dossier, correction C13). **À demander à S0** :
- recherche de voisins hors réseau avec conditions périodiques, par liste de cellules (Vicsek, Couzin et al. 2002, Couzin et Franks 2003);
- réseau de ressorts 2D (Peleg et al. 2018);
- treillis 3D stochastique, 200 × 200 × 200 à Δl = 0,5 mm (Khuong et al. 2016);
- diagnostics : paramètres d'ordre (v_a, p̄, m̄, F), fonction de corrélation de paires, test de Rayleigh, information mutuelle, aire de boucle d'hystérésis, test d'unimodalité.

### 9.2 Couche 2 — modèles de référence

| Modèle (préréglage) | Intégrateur et pas | N d'agents | Horizon | Répétitions et graines | Remarque de coût |
|---|---|---|---|---|---|
| Couzin et Franks 2003 | Pas fixe 0,02 s; mise à jour parallèle | 50 (fig. 2) | 5 000 pas (fig. 2, 4); 15 000 pas (fig. 1) | 100 par combinaison; 50 par angle (fig. 1) | Taille de la grille α × θ_a non relevée [à confirmer] |
| Couzin et al. 2002 | Pas 0,1 s; ordre à fixer | 100 (plage 10 à 100) | ≤ 5 000 pas; 2 000 par r_o (hystérésis) | 30 par cellule; 15 (hystérésis) | O(N²) : voir 9.5 |
| Vicsek et al. 1995 | Δt = 1 | 40; 100; 400; 4 000; 10 000 | 3 000 pas dont 1 500 de chauffe (pré-test du dossier) | ≥ 20 graines (proposée) | Liste de cellules obligatoire |
| Peters et al. 2006 | EDO à retard (T non relevé) | — | Moyenne de 4 min (fig. 4) ou 10 min (fig. 5) après l'état stationnaire | 20 perturbations; ≥ 10 | Modeste |
| Burd et al. 2002 | Formule statique; deux flux (extension) | — | — | ≥ 30 | Modeste |
| Erhard et al. 2022 | Marche discrète | 1 | n = 10⁵ (ℤ); 10⁶ (grille) | 1 000 | Modeste |
| Gelblum et al. 2015 | Gillespie (événements) | N_max sites (plus de 100 fourmis à 4 cm) | Trajectoires de charge | 200 par point; ≥ 200 attachements simulés | Proportionnel au nombre d'événements |
| Gelblum et al. 2016 | EDO, RK4 | 1 à ≥ 1 000 | — | Déterministe pour (c), (d); 100 pour (e) | Modeste |
| Couzin et al. 2005 | À lire (PR-0) | À lire | À lire | ≥ 100 par (N, p) (provisoire) | À estimer après lecture |
| Reid et al. 2015 | Formules (aucune intégration) | — | — | Balayage déterministe (4 angles × 3 densités) | Négligeable |
| Garnier et al. 2013 | Pas de 1 s; Poisson | Pont, fente de 15 mm | 100 périodes | 1 000 par combinaison | Nombre de combinaisons à fixer |
| Mlot et al. 2011 | Trajectoires rectilignes (pas non relevé) | 1 000 à 7 000 | ≈ 150 s | 30 par N | Précalcul pour le navigateur |
| Peleg et al. 2018 | Ressorts 2D (intégrateur non relevé) | Taille du réseau non relevée | — | Non fixé | À lire |
| Khuong et al. 2016 | Δt = 1 s; 1 500 déplacements par pas | 500 (250; 1 000 en robustesse) | 96 h (cible) | 10 par valeur de 1/η_m | **Cas lourd : voir 9.5** |
| Johnson 2009 | 1 itération = 1 min | 14 025 cellules | À lire | 30 par question | Modeste |
| SwarmBench (Ruan et al. 2025) | Rondes | N de 8 à 16 (valeurs citées : 8, 12, 16) | max_round (100 [à confirmer]) | ≥ 20 graines communes (publié : 5) | **Coût en jetons : voir 9.5** |

### 9.3 Couche 3 — modèle chorégraphique commun

Seul le **canal** est interchangeable (persistance, portée, adressage, format; cadre). P9 en fournit quatre instances, chacune dockée sur un modèle de référence (9.4) :

| Canal | Persistance | Portée | Adressage | Référence |
|---|---|---|---|---|
| Force sur la charge | instantanée | globale sur la charge (graphe complet) | aucun | Gelblum et al. 2015 |
| Piste ou marquage du matériau | durée de vie 1/η_m (ou évaporation ν) | locale (voisinage V₂₆; antennes) | aucun | Couzin et Franks 2003; Khuong et al. 2016 |
| Alignement et vision | nulle | rayon r ou zones | aucun | Vicsek et al. 1995; Couzin et al. 2002 |
| Artefact ou message d'agents | durée de vie réglable (TTL) | vue k × k | aucun ou dirigé | SwarmBench; E9.3 |

### 9.4 Docking ([Axtell et al. 1996])

Le modèle commun, canal fixé, doit passer **les mêmes cibles** que le modèle de référence, sans modifier les critères; règles et marges d'équivalence : `../docs/04-protocole-reproduction.md`.

| Docking | Canal et modèle | Cibles passées | Phase |
|---|---|---|---|
| D1 | Vicsek ↔ Couzin et al. 2002, à écart-type de bruit égal | T9.19 | 2 |
| D2 | Piste ↔ Couzin et Franks 2003 | T9.1, T9.2 | 2 |
| D3 | Alignement ↔ Vicsek | T9.8 | 2 |
| D4 | Force sur la charge ↔ Gelblum et al. 2015 | T9.12 | 2 |
| D5 | Marquage du matériau ↔ Khuong et al. 2016 | T9.25 | 3 |

### 9.5 Budgets de performance

Les budgets communs (images par seconde, mémoire, durée de rejeu) sont fixés par `../docs/05-spec-simulation.md`; P9 déclare ses **cas lourds** (calculs [I] sur les valeurs du dossier) et mesure avant de choisir (WASM seulement si la mesure l'exige : cadre).

| Cas | Ordre de grandeur [I] | Parade |
|---|---|---|
| Vicsek, N = 10 000, voisinage en O(N²) | 10⁸ paires par pas, 3 × 10¹¹ pour 3 000 pas; le pré-test du dossier (18 exécutions à N = 400 ou 40, numpy O(N²)) dure déjà ≈ 4 min | Liste de cellules |
| Couzin et al. 2002, grille Δr_o × Δr_a | 16 × 16 cellules [à confirmer : pas entier] × 30 répétitions × 5 000 pas × N² = 3,8 × 10¹¹ paires | Liste de cellules; balayage creux validé par la carte numérisée |
| Khuong et al. 2016, 96 h simulées [à confirmer] | 500 agents × 1 500 déplacements × 345 600 s ≈ 2,6 × 10¹¹ déplacements par exécution, × 10 exécutions par valeur de 1/η_m | Headless seulement; mesure; échantillonnage sans rejet ou horizon réduit si l'accord avec T9.25 le permet; page 8 en rejeu précalculé |
| Navigateur à grand N (Vicsek 10 000; radeau 7 000) | À mesurer | Rejeu précalculé; image statique de repli |
| LLM (SwarmBench; E9.1) | 13 modèles × 5 tâches × 5 exécutions = 325 épisodes publiés; T9.30 exige ≥ 20 graines × ≥ 3 modèles × 5 tâches × plusieurs N et k; E9.1 va jusqu'à N = 500 agents | Tarifs et identifiants revérifiés à la date d'exécution; grille réduite; agents à règles d'abord |

### 9.6 Sorties

Manifeste de run par exécution (graine, version du code, préréglage, paramètres, horodatage); résultats par cible (CSV ou JSON) avec verdict; figures superposant le publié numérisé et le simulé; registre des déviations; rapport de docking; traces rejouables pour la couche navigateur; pour les LLM, journal d'appels (modèle, version, paramètres, jetons, latence).

### 9.7 Vérifications numériques héritées : `p9_checks.py` et ses limites

Le script (`../recherche/dossiers/p9_checks.py`; numpy; ≈ 4 min dont presque tout pour Vicsek) a été **relancé en partie** pour la fiche (Reid et contrôles d'arithmétique, valeurs recoupées avec le dossier; la partie Vicsek, la plus longue, ne l'a pas été). Il couvre : géométrie de Reid (L_A, D_max, d*); Vicsek (v_a(η) à ρ = 4 et ρ = 1 avec N = 400, et ρ = 0,4 avec N = 40); arithmétique de Mlot (Cassie-Baxter), Burd/Peters (n/(n+1); φ_c = kν/q), Gelblum (F_c = 4,3), Khuong (η_d), écart-type de Vicsek. **Limites** :
- Les valeurs imprimées sont des calculs du dossier [I], **jamais des valeurs publiées**; elles servent d'oracle de comparaison, pas de cible.
- Le script **n'a aucune assertion** : il imprime. Il ne peut pas échouer; les contrôles doivent être portés en tests TypeScript avec tolérances.
- Vicsek : **une graine** (graine 0), N = 400 seulement (N = 40 pour ρ = 0,4), 3 000 pas dont 1 500 de chauffe, v_a moyenné sur la seconde moitié; N ≥ 4 000 non testé; ρ non tranché; η_c non retrouvé à N = 400 (v_a = 0,54 à η = 3,0).
- Reid : N = 0,42 (L_T + L_A) fixé; ω = 4,799 θ^−0,5014 avec θ en degrés est une hypothèse (unité non précisée); les positions de la fig. 4B ne sont pas lues; les écarts de L_A à 12° et 60° ne sont pas expliqués.
- Gelblum : l'application de F_c = N f₀/2 à l'article de 2015 est une inférence [I].
- Rien dans le script ne simule le moulin, le transport, la grappe, Khuong ou SwarmBench : aucune de ces cibles n'a de pré-test.

---

## 10. Livrables et critères d'achèvement

| Livrable | Contenu | Critère d'achèvement (vérifiable) |
|---|---|---|
| **LIV-1** Fiches de reproduction | Une par cible non bloquée : équations, paramètres, unités, protocole, figure numérisée, critère chiffré, porte (format : `../docs/04-protocole-reproduction.md`) | Chaque fiche existe **avant** le premier commit du code du modèle (historique git); les cibles bloquées n'en ont pas et figurent au registre. |
| **LIV-2** Code | Modèles de la couche 2 et quatre canaux de la couche 3, en TypeScript; moteur headless et préréglages | `tsc --noEmit` sans erreur; chaque préréglage s'exécute en ligne de commande et produit un manifeste de run. |
| **LIV-3** Tests | Tests unitaires de formules (B(d), C(d), L_A, D_max et d* de Reid; n/(n+1) de Burd; φ_c de Peters; N_c et G_c de Gelblum et al. 2016; Cassie-Baxter de Mlot; η_d de Khuong; tanh(β/2) d'Erhard) et un test de reproduction par cible acceptée | Les tests passent; changer une valeur publiée dans un préréglage fait échouer au moins un test; les valeurs [I] de `p9_checks.py` sont reprises **avec assertions**. |
| **LIV-4** Données | Sorties brutes, manifestes, liste des graines, figures numérisées (CSV) | Chaque graphe de la note se retrouve depuis un manifeste; dépôt et format : `../docs/08-science-ouverte-ethique.md`. |
| **LIV-5** Registre des déviations | Entrées initiales : L_A de Reid à 12° et 60°; ρ de Vicsek; unité de Q (Couzin et Franks 2003); θ_a = 1 000 °/s; placement des tildes (Gelblum et al. 2016, éq. 2); tension de T9.25(d) | Chaque écart simulation-publié a une entrée datée; les entrées initiales sont présentes. |
| **LIV-6** Rapport de docking | D1 à D4 (D5 en phase 3) | Un verdict par docking, selon le protocole. |
| **LIV-7** Préenregistrement | Hypothèses confirmatoires H9.1 à H9.3, H9.5, H9.7 à H9.20 : énoncé, VI, VD, effet minimal, règle de décision, graines, plan d'analyse; H9.4 et H9.6 déclarées exploratoires [Nosek et al. 2018]; rapport enregistré possible [Chambers 2013], [Chambers et Tzavella 2022] | Horodatage du dépôt **antérieur** à la première exécution confirmatoire; écarts documentés selon [Lakens 2024] et [Willroth et Atherton 2024]. |
| **LIV-8** Note de recherche | Résultats par famille, négatifs compris; matrice de parité; transposition (sections 7.2 et 7.3) avec statuts épistémiques | Toutes les étiquettes existent dans `../docs/11-bibliographie.md` (contrôle par script); toute valeur sans source porte [à confirmer]; chaque énoncé de transposition porte l'un des quatre statuts. |
| **LIV-9** Pages interactives | Pages de rang 1, puis de rang 2 (section 8.1), aux trois niveaux, avec les encarts obligatoires | WCAG 2.2 AA vérifiée (outil et passe manuelle); chaque page déclare son public; **aucune page n'affiche « Résultat reproduit » sans cible acceptée**. |
| **LIV-10** Évaluation | Pré-test, post-test et condition témoin statique pour les pages de rang 1 | Protocole V0 appliqué; résultats consignés; cadre éthique de `../docs/08-science-ouverte-ethique.md` (la simulation seule n'implique aucun participant; l'évaluation, oui : [CRSH et al. 2018]). |
| **LIV-11** Volet agentique | Rapports E9.1, E9.2, E9.6 (et E9.3 en phase 3) | Chaque rapport contient le bras orchestré, G aux trois références et le coût; journaux d'appels complets; modèles et paramètres revérifiés à la date d'exécution. |
| **LIV-12** Phase 3 | T9.25, T9.26, T9.29 (lectures de T9.27 et T9.28), E9.3, pages 8, 10, 11 | Porte PR-5 passée; livrables 1 à 9 appliqués à ces cibles. |

**Le projet est achevé (phase 2)** quand : (1) chaque cible non bloquée des sections 5.1 à 5.4 est acceptée ou porte une déviation justifiée au registre; (2) chaque cible bloquée est lue et testée, ou déclarée dans la note « non reproduite : source inaccessible »; (3) D1 à D4 sont réalisés; (4) les hypothèses confirmatoires sont tranchées selon la règle préenregistrée et les résultats négatifs publiés; (5) les pages de rang 1 sont publiées; (6) E9.1, E9.2 et E9.6 sont rendues avec témoin orchestré, sous réserve de PR-6; (7) les contrôles de LIV-8 passent. **La phase 3 est achevée** quand T9.25 et T9.26 sont acceptées (ou déviées au registre), E9.3 rendue et D5 réalisé.

---

## 11. Risques et réserves

| R | Risque | Source ou marque | Parade et plan B |
|---|---|---|---|
| **R1** | Couzin et al. 2005 non lu (équations, paramètres, fig. 2) : T9.16 bloquée, page 9 reste hypothèse, E9.1 bloquée | [R]; texte non obtenu | PDF institutionnel ou courriel aux auteurs. Plan B : p*(N) qualitatif d'après Couzin et al. 2011 [R] et T9.19; E9.1 réduite à un test de conformisme sans loi de référence. |
| **R2** | Équations **en image** (Gelblum et al. 2015, Méthodes; Mlot, éq. 1–2; Garnier; Peleg) | Dossier, limites de la collecte | Ne pas coder avant lecture du PDF (PR-0). Plan B : T9.14 est indépendante de 2015 (éq. de 2016 lisibles); T9.22(a) se teste sans les éq. 1–2. |
| **R3** | SI non lus : Gelblum et al. 2015 (notes 9, 12–25; valeurs ajustées de F_ind, K_c, mécaniques), Johnson (tableau 1, code NetLogo), Peleg (version publiée, sections C et D), Reid, Mlot, Schultz (tableaux 1–3) | [à confirmer] | Téléchargement par le chercheur. Plan B : T9.12(b) non évaluée; T9.23 sur la préimpression seulement, marquée comme telle. |
| **R4** | Sources inaccessibles aux outils : Bonabeau et al. 1998a (PMC1692383, accès refusé), Werfel et al. 2014, Lutz et al. 2021, équations de Heyde et al. 2021, Franks et al. 1991 / Deneubourg et al. 1989 / Solé et al. 2000, Dussutour et al. 2005, Feinerman et al. 2018 (manuscrit accepté, lien en 404) | Cibles bloquées T9.3, T9.4, T9.7, T9.15, T9.24, T9.27, T9.28 | Lecture dans un navigateur par le chercheur. Plan B : cibles hors des critères d'achèvement, déclarées « non reproduites : source inaccessible ». |
| **R5** | Valeurs [à confirmer] : θ_a = 1 000 °/s; plage d'intensité de Garnier; note 15 du SI de Gelblum et al. 2015; « 3 jours » et fig. 3e de Johnson; « EDO non linéaires » (Camazine et al. 1990); « 1 024 » (Rubenstein et al. 2014); annexes de SwarmBench; énoncé de Liu et al. 2011; effectif de Peleg; tension de T9.25(d) | Dossier, marques de la vérification indépendante | Garder la marque; numériser ou lire; jamais de critère fondé sur ces valeurs sans lecture. |
| **R6** | Références **non vérifiées** citées ici : [Beebe 1921], [Beekman et al. 2006], [Berman et al. 2011], [Franks 1985]; d'autres dans le dossier (filiation Aoki 1982, Reynolds 1987, Huth et Wissel 1992; Brady 2003; Gilley 1998; Grozinger et al. 2014; Lindauer 1955) | Bibliographie : non vérifiée | Aucune valeur issue de ces sources sans [à confirmer]. |
| **R7** | Vicsek : ρ du texte (0,4) contre N/L² = 4 de la fig. 2; η_c non retrouvé à N = 400; transition discontinue | [I]; [Grégoire et Chaté 2004] | T9.8 limitée à la phénoménologie; lire la version PRL; E9.5 exploratoire. |
| **R8** | Reid : coquilles de L_A à 12° et 60°; positions de la fig. 4B non lues; optimalité non revendiquée | [I, vérifié] | Registre (LIV-5); statut *Modèle simplifié*; d* jamais comparés aux données. |
| **R9** | L'hystérésis du tore est fragile (mémoire par bifurcation bruitée, dépendante de la vitesse de balayage) : T9.9(b) peut échouer | [Chan et Kanso 2026] [R] | Un résultat négatif est un résultat; E9.4 transforme le risque en question de recherche. |
| **R10** | **Parité fourmi/abeille asymétrique** (section 4) : la ruche n'a pas d'équivalent publié du moulin, du transport coopératif ni du pont vivant; l'abeille entre par le guidage (3 essaims dont un seul analysé en entier; 2 pour Greggers), la grappe (3 essais par condition, préimpression) et le rayon (simulations, pas de dynamique de construction mesurée) | Dossier, parité | **Justification** : l'asymétrie reflète la littérature, pas un choix. Bandeaux de réserve sur les pages abeille; lecture ciblée (Pratt 1998; trois travaux signalés par la vérification : Fetecau et Guo 2012 et Bernardi et Colombi 2018, **absents de la bibliographie**, et Diwold et al. (*Swarm Intell.* 5, 121–141, 2011), à ne **pas confondre** avec l'étiquette « Diwold et al. 2011 » de la bibliographie, qui désigne un article sur l'optimisation par colonie d'abeilles artificielles); chercher un équivalent mesuré côté abeille pour la construction et le transport, sinon déclarer l'asymétrie dans la note. |
| **R11** | Modèles de construction sur des taxons **hors du couple** (termites, guêpes) : écart au principe de parité | Dossier, correction C1 | Déclaré; limité à la phase 3; la parité de construction reste *L. niger* / rayon d'*A. mellifera*. |
| **R12** | Confusions de citation : Feinerman et al. 2018 (revue) et arXiv:2107.09508 (Gelblum et al. 2016); deux SwarmBench; Camazine et al. 1990 et Camazine et Sneyd 1991; Theraulaz et Bonabeau 1995a et 1995b (guêpes); Seeley et Buhrman 2001 (P5); « Pratt et al. sur le guidage » introuvable; collisions d'étiquettes (Li et al. 2024, 2024a, 2024b; Qian et al. 2024 et 2025) | Dossier; bibliographie | Citer par étiquette suffixée de la bibliographie, avec identifiant arXiv ou DOI. |
| **R13** | LLM : `temperature` non réglable; retrait possible de Haiku 4.5 dès le 2026-10-15; non-déterminisme [Atil et al. 2024]; modèles d'origine de SwarmBench non rejouables | Cadre, corrections factuelles | PR-6; ≥ 3 modèles; agents à règles d'abord; version consignée à chaque appel; tarifs et identifiants revérifiés. |
| **R14** | Coût de calcul : Khuong (≈ 2,6 × 10¹¹ déplacements [I]), Vicsek à N = 10 000, LLM | Section 9.5 | Liste de cellules; mesure avant WASM; grille LLM réduite. |
| **R15** | Confondre réplication et validation | Cadre, principe 1 | Marque « validation » sur T9.13, T9.14, T9.21(c). |
| **R16** | Retard de S0 sur les ajouts spatiaux | Dossier, correction C13 | Demander les ajouts tôt (section 9.1). Plan B : implanter dans P9, rapatrier ensuite. |
| **R17** | La construction (phase 3) glisse | Cadre : phase 3 | PR-5; plan B : limiter la phase 3 à T9.25, T9.26 et E9.3. |

---

## 12. Effort et dépendances

### 12.1 Estimation (semaines-personne) [estimation, à confirmer]

| Lot | Contenu | Semaines |
|---|---|---|
| WP0 | Lectures bloquantes (R1 à R4), numérisation des figures cibles | 2 |
| WP1 | Ajouts spatiaux au noyau, s'ils ne viennent pas de S0 | 2 |
| WP2 | Moulin, tore, voies, marche renforcée (T9.1, T9.2, T9.9, T9.33), E9.4 | 3 |
| WP3 | Vicsek, docking D1 et D3 (T9.8, T9.19), E9.5 | 1 |
| WP4 | Trafic (T9.5, T9.6) | 2 |
| WP5 | Transport (T9.10 à T9.14), docking D4 | 4 |
| WP6 | Minorité informée et guidage (T9.16 à T9.18), après lecture | 2 |
| WP7 | Auto-assemblage (T9.20 à T9.23) | 4 |
| WP8 | Pages de rang 1 et 2 | 6 |
| WP9 | Volet agentique (T9.30 à T9.32, E9.1, E9.2, E9.6) | 5 |
| WP10 | Préenregistrement, note de recherche, évaluation V0 | 3 |
| **Phase 2** | | **34** |
| WP11 | Construction (T9.25, T9.26, T9.29, E9.3, pages 8, 10, 11), docking D5 | 5 |
| **Total** | | **39** |

### 12.2 Prérequis et dépendances

- **S0** (prérequis de tout) : noyau, manifeste, harnais, glossaire, métriques R et G; les ajouts spatiaux de la section 9.1.
- **V0** : gabarit, charte et évaluation, avant les premières pages.
- **P1** (recommandé) : le champ de piste et la fonction de choix peuvent être partagés; attention à k (k = 6 chez Peters, k ≈ 20 [à confirmer] chez Deneubourg et al. 1990).
- **P5** : la décision de site précède le guidage de l'essaim; Seeley et Buhrman 2001 relève de P5.
- **P6** : le moulin comme pathologie et son analogue agentique, s'il les reprend (`../projets/P6-defaillances-et-defenses.md`).
- **P7** : consommateur des sorties de P9 (section 7.5); dépendance proposée, non au cadre.
- Aucun prérequis de P2, P3, P4, P8.

### 12.3 Ordre des tâches

1. **WP0** démarre en parallèle de tout le reste; priorité à ce qui débloque le plus : Couzin et al. 2005 (T9.16), SI de Gelblum et al. 2015 (T9.12(b)), Bonabeau et al. 1998a, Feinerman et al. 2018, SI de Johnson, Peleg et al. 2018 (version publiée).
2. **LIV-1** : fiches de reproduction des cibles non bloquées, avant tout code.
3. **WP1**, puis **WP3** (Vicsek : le plus simple, il valide le voisinage périodique), puis **WP2** : porte **PR-1**.
4. **WP4** et **WP5** : porte **PR-2**; puis **WP7** : porte **PR-4**.
5. **WP6** après lecture : porte **PR-3**.
6. **WP9** (exige S0 et les grilles LLM de P7) : porte **PR-6**.
7. **WP8** au fil des portes; **WP10** en fin de phase 2.
8. **WP11** : porte **PR-5**.

Après WP1, les familles trafic, transport et auto-assemblage sont indépendantes : elles se parallélisent si plus d'une personne travaille sur P9.

---

## 13. Références clés

Statut de la bibliographie (`../docs/11-bibliographie.md`) : **V** vérifiée; **C** corrigée; **NV** non vérifiée (aucune valeur sans [à confirmer]). Lecture : celle du dossier P9 (ou P6, signalé).

| Étiquette | Statut | Lecture | Rôle |
|---|---|---|---|
| **Moulin, mouvement de base** | | | |
| [Schneirla 1944] | V | [T] (P6); [M] (P9) | Observations de moulin |
| [Beebe 1921] | NV | [S] | Boucle de 1 200 pieds [à confirmer] |
| [Delsuc 2003] | C | [S] | Commentaire (Brady 2003) |
| [Couzin et Franks 2003] | V | [T] | Modèle fourmi : F, voies |
| [Couzin et al. 2002] | V | [T] (P6); [R] (P9) | Contrepoint : tore |
| [Erhard et al. 2022] | C | [T] préimpression (P6) | Marche renforcée |
| [Chan et Kanso 2026] | C | [R] (P6) | Mémoire collective, bifurcation bruitée |
| [Vicsek et al. 1995] | V | [T] (arXiv) | Modèle de base |
| [Grégoire et Chaté 2004] | V | [R] | Transition discontinue |
| [Vicsek et Zafeiris 2012] | V | [M] | Revue |
| **Raids, trafic** | | | |
| [Deneubourg et al. 1989] | V | [M] | Modèle de raids |
| [Franks et al. 1991] | V | [R] | Moulin expérimental, sigmoïde |
| [Solé et al. 2000] | V | [R] | Rendement des raids |
| [Franks 1985] | NV | cité par Couzin et Franks 2003 | Proportion de fourmis moyennes |
| [Dussutour et al. 2004] | V | [R]; [S] | Pont double |
| [Dussutour et al. 2005] | V | [R] | Pont à goulots |
| [Burd et al. 2002] | V | [R]; [S] | *Atta* |
| [Peters et al. 2006] | C | [T] (arXiv) | Équations du pont double |
| **Transport** | | | |
| [Gelblum et al. 2015] | V | [T]; SI non lu | *P. longicornis* |
| [Gelblum et al. 2016] | V | [T] (arXiv) | Obstacle, oscillations |
| [Feinerman et al. 2018] | V | [R] | Revue |
| [Berman et al. 2011] | NV | [R] | Robotique |
| [Wilson et al. 2014] | V | [R] | Politiques stochastiques |
| **Minorité informée, guidage** | | | |
| [Couzin et al. 2005] | V (métadonnées) | [R] | Minorité informée |
| [Couzin et al. 2011] | V | [R] | Non informés et consensus |
| [Liu et al. 2011] | C | [M]; [S] [à confirmer] | Proportion de meneurs |
| [Schultz et al. 2008] | C | [R]; [T†] | Streakers |
| [Greggers et al. 2013] | V | [R] | Radar harmonique |
| [Makinson et Beekman 2014] | C | [R] | Guidage forcé |
| [Janson et al. 2005], [Latty et al. 2009] | V | [M] | Guidage; trafic dense |
| [Beekman et al. 2006] | NV | [S] | Guidage |
| [Seeley et Buhrman 2001] | V | [R] | Hors sujet (P5) |
| **Auto-assemblage** | | | |
| [Reid et al. 2015] | V | [T]; SI non lu | Ponts d'*E. hamatum* |
| [Garnier et al. 2013] | V | [T] | Ponts d'*E. burchellii* |
| [Mlot et al. 2011] | V | [T] | Radeaux |
| [Peleg et al. 2018] | C | [R]; [T] préimpression v1 | Grappe |
| [Lutz et al. 2021] | V | [R] | Échafaudages |
| [Rubenstein et al. 2014] | V | [R] | Essaim de robots |
| **Construction** | | | |
| [Grassé 1959] | C | [M] | Origine de « stigmergie » |
| [Theraulaz et Bonabeau 1999] | V | [R] | Stigmergie quantitative et qualitative |
| [Heylighen 2016a], [Heylighen 2016b] | V; C | [M] | Stigmergie, coordination |
| [Khuong et al. 2016] | V | [T] | Piliers de *L. niger* |
| [Theraulaz et Bonabeau 1995a], [Theraulaz et Bonabeau 1995b] | V | [R]; [M] | Guêpes, réseaux de particules |
| [Bonabeau et al. 1998a] | V | [R] | Termites |
| [Deneubourg 1977] | V | [M] | Modèle de piliers |
| [Heyde et al. 2021] | V | [T] partiel | Termites, modèle continu |
| [Camazine 1991], [Camazine et al. 1990], [Jenkins et al. 1992] | V | [R] | Rayon |
| [Camazine et Sneyd 1991] | C | [M] | Butinage (autre sujet) |
| [Johnson 2009] | V | [T] | Rayon : rejet de la lecture classique |
| [Pratt 1998] | V | [R] | Rayon de mâles |
| [Werfel et al. 2014] | V | [R] | Problème inverse |
| **Agentique** | | | |
| [Ruan et al. 2025] | V | [T]; annexes à reconfirmer | SwarmBench décentralisé |
| [Gao et al. 2026] | C | [R] | SwarmBench homonyme |
| [Li et al. 2024a], [Li et Zhou 2025] | V | [R] | Flocking LLM |
| [Pal et al. 2026], [Khushiyant 2025], [Li et al. 2025b] | V | [R] | Stigmergie et essaims LLM |
| [Qian et al. 2024], [Li et al. 2024b], [Zheng et al. 2026], [Zhuge et al. 2024] | V | [R] | Topologie |
| [Orogat et al. 2026] | V | [R] | Coût de l'orchestration |
| [YS 2026], [Weng et al. 2025] | V | [R] | Conformité des LLM |
| [Atil et al. 2024] | V | — | Non-déterminisme des LLM |
| **Méthode, éthique, vulgarisation** | | | |
| [Axtell et al. 1996] | V | — | Docking |
| [Grimm et al. 2020] | C | — | ODD |
| [Nosek et al. 2018], [Chambers 2013], [Chambers et Tzavella 2022], [Lakens 2024], [Willroth et Atherton 2024] | V | — | Préenregistrement, écarts |
| [CRSH et al. 2018] | V | — | Éthique de l'évaluation |
| [Chi et al. 2012], [Deque 2021] | V | — | Erreurs de compréhension; accessibilité |

# P7 — Synthèse agentique : fourmi, abeille, agent LLM et témoin orchestré

**Statut :** fiche de projet, régime **production**. Elle tient lieu de spécification expérimentale du projet : aucun document séparé. Le cadre ([../docs/00-cadre.md](../docs/00-cadre.md)) prime; les tensions sont listées en section 11.
**Date :** 2026-10-01. **Phase :** 3 (cadre, architecture du programme), avec une collecte Haiku 4.5 à avancer (section 12).
**Public principal des pages :** praticiens de l'agentique, puis chercheurs.
**Sources :** [../recherche/dossiers/p7-agents-llm.md](../recherche/dossiers/p7-agents-llm.md) (« dossier P7 »), x-choregraphie.md, x-methodes.md; modèles de colonie : p1-recrutement.md, p3-division-travail.md, p5-quorum.md, p8-individu-colonie.md (même répertoire); audits dans `../docs/annexes/audit/` (methodologie, simulation-technique, choregraphie-agentique, bio-abeilles, lacunes). Les documents transversaux sont cités par leur nom : protocole de reproduction ([../docs/04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)), spécification de simulation ([../docs/05-spec-simulation.md](../docs/05-spec-simulation.md)), métriques et typologie ([../docs/06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md)), vulgarisation et évaluation ([../docs/07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)), science ouverte et éthique ([../docs/08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md)), plan de recherche ([../docs/03-plan-de-recherche.md](../docs/03-plan-de-recherche.md)), glossaire ([../docs/10-glossaire.md](../docs/10-glossaire.md)).

**Marques.** Lecture : **[T]** texte intégral lu; **[R]** résumé; **[M]** métadonnées; **[S]** source secondaire; **[I]** inférence ou calcul, non lu dans une source (les calculs partent de valeurs du dossier et en donnent la formule). **[P, à confirmer]** : choix de conception de cette fiche, à confirmer au pilote et à figer au préenregistrement; toute valeur sans source qui porte cette marque est une proposition, jamais un fait. **[à confirmer]** et **[non vérifiée]** : conservés tels qu'ils figurent dans les dossiers et la bibliographie. Statuts épistémiques d'un énoncé : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*; aucun résultat de P7 n'est encore reproduit, les statuts sont ceux de l'écriture. Les étiquettes `[Nom année]` renvoient à ../docs/11-bibliographie.md.

---

## 1. Objet et questions de recherche

P7 mesure, **à modèle constant**, comment les propriétés d'un canal de coordination (persistance, portée, adressage, format) et l'architecture (orchestrée, chorégraphiée, émergente) changent le gain collectif d'agents LLM, contre trois références préenregistrées à budget égal : agents indépendants sans canal, agent unique, colonie à règles (cadre, §4). Il commence par **reproduire des résultats publiés** (ancrage), puis étend. Les colonies n'entrent que par leurs **modèles publiés** (taxons nommés, préréglages), exécutés dans les mêmes environnements que les LLM; le canal est une variable du modèle, jamais un attribut du taxon (cadre, §2.3).

| Question (cadre, §3) | Ce que P7 en fait | Hypothèses | Partagée avec |
|---|---|---|---|
| QR0 (centrale) : richesse du signal, environnements, structures de tâche | Gain d'interaction G_int selon le vecteur R, l'environnement et la structure de tâche; on reproduit d'abord la littérature apicole qui répond que cela dépend de l'habitat [Sherman et Visscher 2002] [Donaldson-Matasci et Dornhaus 2012] [Beekman et Lew 2008] | H7.1, H7.6, H7.7, H7.8 | P1, P5, P8 |
| QR1 : individu fort contre collectif | Référence « agent unique à budget égal » (SOLO), G_fort | H7.4, H7.10 | P8 |
| QR2 : modes d'échec | Annotation MAST des échecs, issues codées d'un run | H7.3, H7.11 | P6 |
| QR3 : un orchestrateur bat-il l'émergence, selon la structure de tâche | Bras témoin ORC dans chaque scénario; structure décomposable ou séquentielle manipulée | H7.5 | (propre à P7) |
| QR4 : diversité | Populations homogènes, mélange de modèles, personas | H7.9 | P3 |
| Problème inverse (cadre, §2.2) : spécifier des règles locales qui garantissent une propriété globale | Bras CHS (chorégraphie spécifiée projetée) contre bras émergents | H7.11 | S0 |

**Séquence imposée.**
1. **Ancrage** (section 5, tableaux A et B) : reproduire d'abord [Ashery et al. 2025], [Du et al. 2024] contre [Choi et al. 2025a], [Li et al. 2024], [Rahman et al. 2025], [Jimenez-Romero et al. 2025] (cadre, §2.4 point 12), puis les modèles de colonie par docking. Aucune donnée de grille tant que les portes d'outils, de docking et d'ancrage ne sont pas franchies.
2. **Pilote** à 1 % puis pilote de variance; figer invites, difficulté, plafonds.
3. **Registered Report**, étape 1 (protocole, pilote), avant toute collecte confirmatoire.
4. **Expériences originales** (section 6), dans l'ordre : Haiku 4.5 d'abord.

**Ce que P7 n'affirme pas.** « La reine ne commande pas » reste un constat biologique borné, jamais une prescription d'architecture (cadre, §2.1). Que des agents LLM identiques oscillent est une hypothèse sans acquis, testée (H7.9), jamais affirmée (cadre, §2.4 point 13). Aucun classement de « la fourmi » et de « l'abeille » n'en sortira : le contraste porte sur des mécanismes de canal à modèle fixe, et un essaim de 10 agents n'est ni une colonie ni un système industriel (section 7).

**Contribution défendable** (audit methodologie, C10) : manipulation contrôlée des propriétés du canal à capacité fixe, avec références à budget égal, témoin orchestré et puissance planifiée, là où [Jimenez-Romero et al. 2025] n'ont qu'un modèle, un format et 5 répétitions.

---

## 2. Positionnement

| Existant (étiquette, ce qui est publié) | P7 reproduit | P7 ajoute |
|---|---|---|
| Convention émergente, biais collectif, masse critique dans des populations LLM (jeu de nommage) [Ashery et al. 2025] | T7.1 à T7.3 avec Haiku 4.5 et Sonnet 5.5 | Le jeu de nommage n'a pas de « meilleure » option : il mesure la coordination, pas la justesse. P7 ajoute des options de valeur inégale et de l'information distribuée (S1, S5) |
| Le débat améliore l'exactitude [Du et al. 2024]; le vote explique l'essentiel du gain et la discussion est une martingale [Choi et al. 2025a]; le débat bat rarement la cohérence propre [Zhang et al. 2025] | T7.4 et T7.5; conflit éventuel documenté | Hypothèse H7.6 : le résultat nul de Choi suppose une information redondante entre agents [I]; P7 le teste avec information distribuée |
| Vote selon N [Li et al. 2024]; gain non monotone en nombre d'appels [Chen et al. 2024a] | T7.6 (identique à T8.11 de la fiche P8) | Stratification par difficulté, coût en dollars |
| LLM-ACO sur deux chemins [Rahman et al. 2025]; fourmis LLM dans NetLogo [Jimenez-Romero et al. 2025] | T7.7, T7.8 | Rahman et al. 2025 donnent des consignes de phase explicites (confondant); P7 ajoute la condition « LLM exécutant la règle » et la manipulation du canal |
| Erreurs corrélées [Kim et al. 2025]; plafond de co-échec [Chen 2026] [Kim 2026]; monoculture [Kleinberg et Raghavan 2021] [Wu et al. 2024b] | T7.9, T7.10 | Lien entre corrélation des erreurs, capacité et G_fort (H7.10) |
| Tableaux noirs, contexte partagé, stigmergie LLM [Han et Zhang 2025] [Salemi et al. 2025] [Mao et Mirhoseini 2026] [Pal et al. 2026] : résultats compétitifs, souvent hybrides (agent central) | Aucune cible reproduite (résumés [R]) | Manipulation contrôlée du canal (persistance, portée, format), témoin orchestré, budget égal |
| Orchestrateur-travailleurs : +90,2 % sur évaluation interne, environ 15 fois les jetons [Hadfield et al. 2025]; l'architecture gagnante dépend de la tâche [Kim et al. 2025a] | Aucune (évaluation interne non reproductible) | Témoin ORC dans les mêmes scénarios que les canaux émergents; structure de tâche manipulée (H7.5) |
| Taxonomie des échecs MAST [Cemri et al. 2025] | T7.11 (accord d'annotation) | Cartographie canal → modes d'échec (H7.3) |
| Mesure d'émergence par décomposition de l'information [Riedl 2026] | T7.12 (outil) | Application aux runs de la grille |
| Chorégraphie spécifiée : types de session, projection [Carbone et Montesi 2013] [Honda et al. 2008] [OMG 2013]; agents intéressés [Gopinathan et al. 2026] (résumé d'une présentation) | — | Bras CHS et problème inverse (H7.11) |
| MCP [MCP 2026] et A2A [A2A 2026a] : ni l'un ni l'autre n'offre de chorégraphie native | — | Substrat chorégraphique ajouté au-dessus des protocoles (section 9) |

---

## 3. Hypothèses falsifiables

Correspondance avec les sources : H7.1 à H7.4 = H7a à H7d de l'audit methodologie (§7.1); H7.6 à H7.10 = H1 à H5 du dossier P7 (§6.3); H7.5 vient de QR3; H7.11 du problème inverse.

### 3.1 Construits et opérationnalisation

Les opérationnalisations finales sont fixées ici et dans le plan de recherche ([../docs/03-plan-de-recherche.md](../docs/03-plan-de-recherche.md)); les définitions générales de G et de R sont dans métriques et typologie ([../docs/06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md)).

- **Unité statistique :** le run. Les décisions d'agents d'un run sont groupées. Toutes les comparaisons sont **appariées** sur la graine d'environnement e (nombres aléatoires communs : mêmes sources, mêmes perturbations) [dossier P7, §6.1 et §7.1].
- **Scores S** (plus haut = mieux) [dossier P7, §6.1; inférence de l'auteur, à harmoniser avec les fiches P1, P3, P5] :
  - **S1 recrutement** : primaire p_best (fraction d'agents-pas exploitant la meilleure source sur la seconde moitié); secondaire t½ (pas pour réallouer 50 % de l'effort après inversion des qualités).
  - **S3 division du travail** : primaire −RMS(stimulus − consigne); secondaires : changements de tâche par agent, temps de récupération après retrait d'une caste.
  - **S5 quorum** : primaire 𝟙[choix = meilleur site] à budget de rondes fixe; secondaire τ (temps de décision conditionnel au succès); issues d'échec codées à part : scission, absence de décision (interblocage), refus du modèle.
- **Références** (cadre, §4; notées ind, fort et règles dans métriques et typologie) : S_ind (mêmes agents sans canal, bras IND), S_best (agent unique à budget égal, bras SOLO), COL (colonie à règles du taxon).
- **Gain d'interaction (primaire)** G_int = E_e[S_a − S_ind]. **Synergie forte** G_fort = E_e[S_a − S_best]. **Efficacité** G_$ = G_int / (C_a − C_ind), C en dollars par run [Kapoor et al. 2025]. **Plafond** : toute politique qui renvoie la réponse d'un membre vérifie précision ≤ 1 − β, β = P(tous les modèles se trompent) [Chen 2026] (T7.10).
- **Décomposition** (cadre, §4; cadre de [Choi et al. 2025a] transposé [I]) : S_a − S_ind = (S_vote − S_ind) + (S_a − S_vote), agrégation puis interaction. Elle n'a de sens qu'en **S5** (décision unique). En S1 et S3 les actions s'additionnent : le vote n'existe pas, G_agg est non défini et Δ_com = Δ_ind (métriques et typologie) [I].
- **Normalisation.** Le G du cadre, Δ/(P_max − P_ref), est un rapport de moyennes avec IC par rééchantillonnage apparié des runs; il est instable quand P_max ≈ P_ref (x-methodes, §7 point 4). **On rapporte d'abord la différence appariée avec son IC**; le G normalisé s'affiche seulement quand P_max − P_ref ≥ ε fixé d'avance, ε = 0,1 de l'étendue du score [P, à confirmer]. P_max = borne théorique du score (S1 et S5 : 1; S3 : 0 pour −RMS) [P, à confirmer].
- **Robustesse** : variation de G après perturbation, intégrée aux runs (inversion des qualités en S1; retrait de 30 % des agents en S3, cadre §4).
- **Coût** : jetons (entrée, cache, sortie, raisonnement), appels, latence, dollars; messages échangés.
- **Vecteur R** (jamais une échelle; cadre §4; composantes nommées comme dans [../docs/06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md)) [dossier P7, §6.2] (proposition de l'auteur, [I]) :

| Composante | Définition | Manipulation ou mesure |
|---|---|---|
| R_nom (nominale) | Dimension d et alphabet \|M\| (log₂ \|M\| bits; pour le texte, plafond de jetons) | L0 : entier 0 à 9 (log₂ 10 ≈ 3,3 bits, d = 1); L1 : tuple (direction en 8 secteurs, distance en 4 classes, qualité en 4 niveaux) = 7 bits, d = 3; L2 : texte libre ≤ 30 jetons; L3 : texte libre ≤ 300 jetons |
| R_eff (effective) | Î(D(M); W)/H(W) ∈ [0, 1], W état caché pertinent, D décodeur figé | Estimateur par comptage avec correction de biais; borne inférieure de I(M; W). Pour L2 et L3 : analyseur déterministe, ou juge LLM figé validé (κ ≥ 0,7) |
| R_pers (persistance) | Demi-vie du signal : τ½ = ln 2/λ, λ taux d'évaporation par pas [dossier P7, §6.2]; avec la convention de persistance de [Dorigo et al. 1996] (τ ← ρτ + Δτ, cadre §2.4 point 4), τ½ = ln(1/2)/ln ρ [I] | Piste : par pas; danse : durée de la ronde; LLM : TTL du tableau |
| R_port (portée) | Fraction des agents pouvant percevoir un signal à son émission | Dépôt local, agents présents, diffusion à tous |
| R_adr (adressage) | Fraction des messages dont l'émetteur désigne le destinataire | Dirigé (messages A2A), déposé (piste, tableau), diffusé (bus) |

  « Piste = chemin, danse = lieu » est réfuté comme frontière algorithmique; on parle de **granularité de la mémoire partagée** (cadre, §2.4 point 15) : les niveaux L0 à L3 en sont la manipulation.

### 3.2 Hypothèses

Seuils d'effet et marges : **[P, à confirmer]** (en écarts-types σ inter-runs de la cellule de référence), sauf là où le dossier en donne un (d ≥ 0,8 pour 25 runs par groupe, dossier P7 §7.1). Verdicts possibles : confirmée, réfutée, indéterminée (IC trop large), avec IC et marge publiés.

| ID | Énoncé dirigé | VI → VD | Effet minimal | Critère de réfutation | Statut |
|---|---|---|---|---|---|
| **H7.1** (interaction canal × modèle) | En S1, après inversion des qualités, l'avantage de la diffusion (DIF) sur le dépôt persistant (PER) en latence d'adaptation (t½ plus court) est plus grand avec Opus 5.5 qu'avec Haiku 4.5; Sonnet 5.5 sert de point intermédiaire descriptif | Canal {PER, DIF} × modèle {Haiku 4.5, Opus 5.5} → t½ (temps-à-événement censuré à T) et probabilité de verrouillage | Contraste d'interaction ≥ 0,8σ; n par cellule ≈ 100 (4 × 25 : une interaction de même taille que l'effet principal exige 4 fois les runs [x-methodes, M7], [I]); n fixé par l'éq. 9 de [Miller 2024] au pilote | IC à 95 % (bootstrap apparié) du contraste contient 0 ou est négatif | Confirmatoire préenregistré (famille primaire) |
| **H7.2** (équivalence au format scalaire) | Au format L0, un LLM exécutant la règle explicite du taxon (LLM-RÈGLE) est équivalent à la colonie à règles du même taxon (mêmes environnement et graines) | Politique {LLM-RÈGLE, COL} × modèle {Haiku 4.5, Sonnet 5.5} × taxon {fourmi, abeille} × environnement {S1, S3-D, S5-D} → score primaire du scénario | Marge d'équivalence ±0,5σ_COL; n = 40 par cellule LLM contre 1 000 runs COL : puissance ≈ 0,85 (36 suffisent pour 0,8 [I]) | TOST unilatéraux à 5 % (IC à 90 % hors de [−Δ, +Δ]) : l'équivalence est réfutée pour un modèle si l'un des 6 TOST (taxon × environnement) échoue; aucune correction entre ces 6 (intersection-union) | Confirmatoire préenregistré (famille primaire; verdict par modèle) |
| **H7.3** (le texte libre augmente les échecs MAST) | À modèle (Sonnet 5.5) et architecture fixés, le nombre de modes MAST annotés par run est plus élevé en texte libre (L2 ou L3) qu'en tuple symbolique (L1) | Format {L1, L2, L3} × canal {PER, DIF} → nombre de modes MAST distincts par run (0 à 14) | Rapport de taux ≥ 1,5 | IC à 95 % du rapport de taux (texte libre contre L1) contient 1 ou est inférieur. Préalable : T7.11 | Confirmatoire préenregistré (famille primaire) |
| **H7.4** (gain contre l'agent unique à budget égal) | À budget égal en dollars, aucune architecture à interaction (CHS, PER, DIF) ne bat l'agent unique (SOLO, accès à l'union des observations) : G_fort ≤ 0 en S1, S3 et S5. L'orchestrateur est examiné en H7.5 | Architecture {CHS, PER, DIF} contre SOLO × modèle {Haiku 4.5, Sonnet 5.5} → G_fort | Réfutation à partir de G_fort ≥ +0,5σ | Borne inférieure de l'IC à 95 % de G_fort > 0 pour au moins une architecture dans un scénario | Confirmatoire préenregistré (famille primaire) |
| **H7.5** (QR3 : orchestrateur × structure de tâche) | L'avantage de ORC sur les arrangements émergents (EMG = PER et DIF) en G_int est positif en tâche décomposable (S3-D) et nul ou négatif en tâche séquentielle (S3-S) [Kim et al. 2025a] | {ORC, EMG} × structure {décomposable, séquentielle}, Sonnet 5.5 → G_int | Contraste d'interaction ≥ 0,8σ; avec 40 runs par cellule, détectable ≥ 0,77σ [I] | IC à 95 % du contraste contient 0 ou est négatif | Confirmatoire préenregistré (famille primaire) |
| **H7.6** (information distribuée; dossier H1) | En S5, G_int(DIF contre IND) est nul quand l'information est redondante (cas de [Choi et al. 2025a]) et positif quand elle est distribuée | {IND, DIF} × information {redondante, distribuée}, Sonnet 5.5 → 𝟙[meilleur site] | Interaction ≥ 0,8σ; n = 40 | IC à 95 % de l'interaction contient 0 ou est négatif; ou G_int redondant hors de ±0,5σ | Confirmatoire préenregistré (famille primaire) |
| **H7.7** (persistance; dossier H2) | Après inversion des qualités en S1, t½(PER) > t½(DIF) (pendant LLM du blocage de certaines fourmis contre la réallocation des abeilles; ce blocage n'est pas général, cadre §2.4 point 11). Le découplage persistance × portée (E7.6) sépare les deux facteurs que ce contraste confond | Canal {PER, DIF}, Sonnet 5.5 → t½, verrouillage | d ≥ 0,8 | IC à 95 % de t½(PER) − t½(DIF) contient 0 ou est négatif | Confirmatoire préenregistré (famille secondaire) |
| **H7.8** (richesse; dossier H3) | G_int croît de L0 à L1 quand l'information est distribuée (S1, S5-D), puis plafonne de L1 à L3, alors que le coût croît de façon monotone | Niveau {L0, L1, L2, L3} × canal {PER, DIF}, Sonnet 5.5 → G_int, coût en dollars | ΔG_int(L0→L1) ≥ 0,8σ. Plateau L1→L3 : descriptif (un TOST à ±0,5σ exigerait environ 70 runs par groupe [x-methodes, M6]) | IC à 95 % de ΔG_int(L0→L1) contient 0; ou coût non monotone | Confirmatoire (famille secondaire) pour L0→L1 et le coût; plateau exploratoire |
| **H7.9** (diversité; dossier H4) | En S3-D, une population hétérogène (personas, ou mélange de modèles) réduit l'amplitude d'oscillation du stimulus par rapport à une population homogène. Corollaire : mêler un modèle faible et un fort peut faire moins bien que le fort seul [Bahrami et al. 2010]. Contre-preuves publiées à intégrer [Lynch et al. 2024] [Garrison et al. 2018] [Ulrich et al. 2021] | Hétérogénéité {homogène, personas, mélange de modèles} → écart-type du stimulus après rodage; ordre de mise à jour contrôlé | d ≥ 0,8 | Aucun des deux types d'hétérogénéité ne réduit l'amplitude (IC à 95 % contient 0 ou est positif) | Confirmatoire (famille secondaire) |
| **H7.10** (capacité; dossier H5) | La compétence individuelle croît avec le modèle (Haiku 4.5, Sonnet 5.5, Opus 5.5, catégoriel ordonné par génération et coût), mais G_fort ne croît pas avec lui : les erreurs corrélées croissent avec la précision [Kim et al. 2025] | Modèle × architecture → score SOLO et G_fort | Pente de la compétence > 0 et pente de G_fort ≤ 0 | IC à 95 % de la pente de G_fort positif | Confirmatoire (famille secondaire) |
| **H7.11** (problème inverse) | La projection (CHS) élimine par construction les issues « absence de décision » et de non-terminaison, mais n'améliore pas la justesse du contenu : une chorégraphie spécifiée garantit l'ordre des messages, jamais la justesse d'un contenu généré [I] | Architecture {CHS, DIF, PER} → fréquence des issues de terminaison (FM-1.5), conformité au type global, G_int; écart de réalisation Δ_PE, rapport de coûts κ_PE et écart de robustesse ΔRob_PE de [../docs/06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md) | Écart de fréquence d'échecs de terminaison ≥ 10 points; G_int(CHS) − G_int(DIF) ≤ 0,3σ | CHS n'est pas meilleure sur la terminaison, ou son G_int dépasse celui de DIF de plus de 0,3σ (IC > 0) | Exploratoire |

### 3.3 Plan d'analyse

- **Modèle :** modèle mixte, score ~ architecture × modèle × environnement, effets aléatoires de la paraphrase d'invite (croisés; trois niveaux, un minimum) et de la graine d'environnement [Judd et al. 2012] [Barr et al. 2013] [Bates et al. 2015]; SE groupée ou appariée pour les items intra-run [Miller 2024] (éq. 4 et 7); bootstrap ou méthode bayésienne sous quelques centaines d'unités [Bowyer et al. 2025].
- **Multiplicité :** famille primaire H7.1 à H7.6, correction de Holm à 5 % [Holm 1979] (le dossier compte environ 6 contrastes); famille secondaire H7.7 à H7.10 par Benjamini-Hochberg à q = 0,10 [Benjamini et Hochberg 1995]; le reste est étiqueté exploratoire. On rapporte p brut et ajusté.
- **Puissance** (α = 0,05, puissance 0,8; calculs [I], formules du dossier P7 §7.1 et de x-methodes M6, M7, M9) :

| Contraste | n par cellule | Effet détectable |
|---|---|---|
| Simple (cellule contre cellule) | 30 | ≈ 0,74σ (dossier P7) |
| Simple, Bonferroni sur 6 (borne de Holm) | 30 | ≈ 0,90σ |
| Interaction 2 × 2 | 30 | ≈ 1,02σ |
| Interaction 2 × 2 | 100 | ≈ 0,56σ |
| ORC contre EMG × structure (cellules EMG regroupées) | 40 | ≈ 0,77σ |
| TOST ±0,5σ, cellule LLM contre 1 000 runs COL | 40 (36 suffisent) | puissance ≈ 0,85 (≈ 0,71 à 30) |

  Les interactions de la grille (H7.1, H7.5, H7.6) sont donc sous-puissantes à 30 runs; le plan prévoit n = 40 ou 100 là où il le faut (section 6) et un **plan séquentiel** : n additionnel par paliers jusqu'à un plafond budgétaire préenregistré; au-delà, le verdict est « indéterminé ».
- **Fiabilité :** pass^k pour k ∈ {1, 3, 5} sur les issues binaires [Yao et al. 2024]. **Front de Pareto** exactitude-coût et contrastes à coût égal [Kapoor et al. 2025].
- **Non-déterminisme :** jamais supposé nul [Atil et al. 2024]; K répétitions plutôt que température.
- **Exclusions préenregistrées :** un refus de classifieur est une **issue codée** (attrition) : analyse principale sur les runs sans refus, analyse de sensibilité où le refus compte comme échec, cellule déclarée non comparable au-delà d'un seuil de refus fixé au pilote [P, à confirmer] ([../docs/08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md)); une action non analysable devient une action nulle comptée (section 11.2).
- **Rapport de déviations :** registre versionné (date, section du plan, déviation, raison, catégorie, effet sur la sévérité et la validité) [Lakens 2024] [Willroth et Atherton 2024].

---

## 4. Modèles de référence

Un moteur unique « fourmi ou abeille » est abandonné (cadre, §7) : les résultats publiés viennent de modèles de natures différentes. Trois couches : noyau commun, **modèles de référence** (cette section, 4.1 et 4.2), **modèle chorégraphique commun** de P7 (4.3), aligné par docking sur chaque modèle de référence. Une *réplication* n'est pas une *validation* contre des données (cadre, §6.1). Les cibles chiffrées de 4.2 sont consolidées par les fiches P1, P3 et P5 sous leurs propres identifiants; P7 n'en reprend que le docking (section 5, tableau B).

### 4.1 Ancrages publiés et instruments de mesure (résultats LLM)

Les modèles d'origine (gpt-3.5, Llama, Claude 3.5) ne sont pas ceux du programme : on reproduit des **relations** (ordre, signe, forme), jamais des valeurs absolues, sauf pour les identités mathématiques [dossier P7, §5].

| Ancrage | Dispositif et paramètres tels que publiés | Localisation | Type, pas, intégration; résumé ODD |
|---|---|---|---|
| Jeu de nommage [Ashery et al. 2025] [T, arXiv v2; page éditeur : 403] | N = 24 agents; réservoir de W = 10 noms (W = 2 pour le biais et la masse critique); mémoire H = 5 interactions; gain +100 si coordination, −50 sinon; une paire tirée au hasard à chaque pas; consensus = 95 % de succès sur les 3N dernières interactions. Modèles : Llama-3-70B-Instruct, Llama-3.1-70B-Instruct, Llama-2-70b-Chat (4 bits), Claude-3.5-Sonnet. Masse critique : N = 48, H = 3 (Llama-3-70B-Instruct), 10 runs (3 pour Llama-3-70B). Fig. 1 : moyennes sur 40 runs; fig. 2 : 40, 27 ou 20 runs selon le modèle | Résultats, légende fig. 1, fig. 2B, fig. 3 (3B en %, tableau S3 en effectifs), tableau 1 | Modèle à agents, temps discret, une interaction par pas, aucune intégration numérique. ODD : agents-LLM à mémoire glissante; ordre = tirage d'une paire; stochasticité = paires et échantillonnage LLM |
| Débat multi-agents [Du et al. 2024] [T] | Chaque agent répond seul, puis reçoit à chaque ronde les réponses des autres; prompt GSM8K : « These are the solutions to the problem from other agents: … Using the solutions from other agents as additional information, can you provide your answer to the math problem? »; variante « Short » (fig. 3) : « Based off the opinion of other agents, can you give an updated response ». 3 agents, 2 rondes; gpt-3.5-turbo-0301; gain croissant avec les agents (fig. 10a) et les rondes jusqu'à environ 4 (fig. 10b). La population converge presque toujours; l'absence de vote final n'est pas énoncée dans le texte [à confirmer] | §3.1, §3.2, tableaux 1 et 2, fig. 3, 10, 11 | Rondes discrètes; aucune intégration. ODD : agents identiques; ordre synchrone par ronde; stochasticité = échantillonnage |
| Débat comme processus de Dirichlet composé [Choi et al. 2025a] [T] | Déf. 1 : θ_{i,t} ~ Dir(α_{i,t}), y_{i,t} ~ Cat(θ_{i,t}). Déf. 2 : α_{i,t} = α_{i,t−1} + c_{i,t}, c_{i,t} comptant les réponses des voisins. Théorème 2 : si la moyenne des p_{j,t−1} des voisins égale p_{i,t−1}, alors E[p_{i,t} \| α_{t−1}] = p_{i,t−1} (martingale : la discussion seule n'améliore pas la justesse espérée). N = 5; T ∈ {2, 3, 5}; Qwen2.5-7B et 32B, Llama3.1-8B; 7 bancs | Déf. 1 et 2, théorème 2, tableaux 1, 2, 4 | Modèle bayésien à temps discret. ODD : agents, voisinage; mise à jour synchrone; stochasticité = tirage catégoriel |
| Échantillonnage et vote, « Agent Forest » [Li et al. 2024] [T] | N échantillons s_i = ℳ(x); V(s_i) = Σ_{j≠i} sim(s_i, s_j); A = argmax V; sim = fréquence d'occurrence (tâches fermées) ou BLEU (génération ouverte). T = 1,0, top-p = 1,0; N jusqu'à 40 (10 pour le débat); fig. 1 : taille d'ensemble jusqu'à 15 | §3, §5 (tableau 2), §6, fig. 1 | Échantillonnage indépendant; aucune intégration. ODD : un agent échantillonné N fois; pas d'interaction |
| LLM-ACO sur deux chemins [Rahman et al. 2025] [T] | Réseau à deux chemins (court, long) entre source et destination; trois prompts par itération (choix du chemin, dépôt, évaporation); le prompt de choix contient des **consignes de phase explicites** (explorer 50/50 au début, exploiter à la fin) : confondant. 30 essais × 18 itérations; évaluation finale avec un GPT en nuage (version non précisée dans l'extraction); Qwen 2.5 Instruct 14B seulement pour le développement local | §IV-B, §V-A, §V-B, fig. 2, tableau II | ACO à itérations discrètes; l'évaporation s'écrit avec la convention de persistance du programme (cadre, §2.4 point 4). ODD : agents-fourmis LLM; ordre par itération; stochasticité = LLM |
| Fourmis LLM dans NetLogo [Jimenez-Romero et al. 2025] | Modèle *Ants* de NetLogo; GPT-4o à température 0; 10 fourmis; 3 sources; 1 000 pas; 5 répétitions; 9 itérations de prompt; collecte ≈ 85 unités pour le LLM comme pour les règles (é.-t. 7 contre 20), ≈ 95 pour l'hybride 50/50 [T via outil, non recoupé : à confirmer]. Absent du dossier P7 (cadre, §2.4 point 12) | Dossier p1-recrutement, §8; audit methodologie, C10 | Modèle à agents sur grille (phéromone déposée et suivie); pas = 1 tick. Exige le moteur de grille de S0 |

**Instruments de mesure publiés** (reproduits comme outils, pas comme résultats) :

| Instrument | Définition telle que publiée | Localisation |
|---|---|---|
| Erreurs corrélées [Kim et al. 2025] [T] | Accord d'une paire de modèles **conditionnel au fait que les deux se trompent** (QCM); hasard : 1/3 (HELM), ≈ 0,127 (HuggingFace). Régression, coefficients standardisés : même fournisseur +0,066 (HF) et +0,022 (HELM); R² = 0,340 (HF), 0,613 (HELM), 0,415 (*Resumes*) | Définition, tableau 1, fig. 1 à 5 |
| Plafond de co-échec [Chen 2026] [R] | Toute politique qui renvoie la réponse d'un membre : précision ≤ 1 − β, β = P(tous les modèles se trompent sur la même question) | Résumé |
| Statistique d'évaluation [Miller 2024] [T] | (1) SE = √(Var(s)/n), IC à 95 % = s̄ ± 1,96·SE; (2) Bernoulli : SE = √(s̄(1−s̄)/n); (4) SE groupée; (7) différence appariée : SE = √(Var(s_{A−B})/n); (9) n = (z_{α/2} + z_β)²(ω² + σ_A²/K_A + σ_B²/K_B)/δ²; rééchantillonnage : Var(μ̂ \| K) = Var(μ̂ \| K=1)·(1 + 2/K)/3 (cas binaire illustré). Deux écarts relevés par x-methodes (exemple du §4.2; marges de détectabilité tronquées) sans effet sur les formules | Formules (1) à (9) |
| Fiabilité [Yao et al. 2024] [T] | pass^k = E_tâche[C(c, k)/C(n, k)], c succès sur n essais | §3 |
| Émergence [Riedl 2026] [T] | I({X_{i,t}, X_{j,t}}; T_{ij,t+ℓ}) = UI_i + UI_j + Red_{ij} + Syn_{ij}; S_macro(ℓ) = I(V_t; V_{t+ℓ}) − Σ_k I(X_{k,t}; V_{t+ℓ}); G₃ = I₃ − max(I₂{1,2}, I₂{1,3}, I₂{2,3}). Cadre : jeu de devinette collective, N = 10, rétroaction de groupe seulement, GPT-4.1, 200 expériences par condition (simple, persona, théorie de l'esprit, cette dernière incluant la persona) | §2, §4.1, §4.2 |
| Taxonomie MAST [Cemri et al. 2025] [T] | 14 modes en trois catégories : FC1 conception (≈ 44,2 %), FC2 désalignement inter-agents (≈ 32,4 %), FC3 vérification (≈ 23,5 %) (totaux obtenus en sommant les prévalences de la v3 [I]); 1 642 traces, 7 systèmes; κ = 0,88 entre humains, 0,77 pour le juge LLM, 0,79 hors domaine. Modes les plus fréquents : FM-1.3 répétition d'étapes (15,7 %), FM-2.6 décalage raisonnement-action (13,2 %), FM-1.5 conditions d'arrêt ignorées (12,4 %) | §4, §5.1 à 5.3, fig. 1, annexe A |

[Park et al. 2023] (agents génératifs : 25 agents, 2 jours de jeu, « milliers de dollars » de jetons) sert d'illustration du coût; non reproduit.

### 4.2 Modèles de colonie (couche 2) : taxons nommés et préréglages

Chaque scénario porte un préréglage par taxon, un pour la fourmi et un pour l'abeille (parité, cadre §5). La « règle » de P7 est le **modèle biologique publié** du scénario, exécuté dans le même environnement que les LLM (4.3) [dossier P7, C11]. Le canal est celui que la règle exige : il n'est pas imposé par le taxon (cadre, §2.3).

| Scénario | Taxon et préréglage | Modèle, paramètres et unités tels que publiés | Localisation | Type, intégration; ODD |
|---|---|---|---|---|
| S1 | Fourmi : *Linepithema humile*, préréglage « pont-Goss » (fiche P1), « verrouillage ». Variantes « flexibles » : « dyn-Dussutour » (*Pheidole megacephala*) et « encombrement-Grüter » (*Lasius niger*) | Équations (1) à (3) ci-dessous. Φ = 0,5 fourmi/s; traversée ≈ 20 s (courte), 20r s (longue), r ∈ {1 ; 1,4 ; 2}; **k = 20** (valeur reprise de [Deneubourg et al. 1990], texte non lu : [à confirmer]); n = 2; dépôt de 1 unité par fourmi dans les deux sens; évaporation négligée (durée de vie ≈ 30 min); trafic du 501e au 1000e passage. Variante : k = 12, q₁ = 0,09, q₂ = 0,13, ρ = 0,00085, α = 2 [Dussutour et al. 2009] ([non vérifiée] dans la bibliographie; unité de ρ [à confirmer]); rétroaction négative par encombrement [Grüter et al. 2012] | [Goss et al. 1989], p. 579–580, éq. 1–3, fig. 1–2; dossier p1-recrutement, §3.1, §3.2, §3.5 | Monte Carlo de choix binaires et équations moyennes; un tirage par passage. **Modèle simplifié** : la fonction de choix est un ajustement collectif; la réponse individuelle est de type Weber (cadre, §2.4 point 3). ODD : fourmis, deux branches, phéromone; ordre = passage; stochasticité = tirage du choix |
| S1 | Abeille : *Apis mellifera*, préréglage « ruche-Seeley » (fiche P1) | 7 compartiments H_A, H_B (déchargement), D_A, D_B (danse), A, B (source), F (suiveuses); équations ci-dessous. Tableau 2 (p_i = 1/T_i, T en min) : T1 = 1,0; T2 = 1,5; T3 = 2,5; T4 = 60; T5 = 3,0; T6 = 2,0; T7 = 3,5; f_x^A = 0,00, f_x^B = 0,04; f_d^A = 1,00, f_d^B = 0,15; τ_A = 0,38, τ_B = 0,02; conditions initiales A = B = 11, D_A = D_B = 1, H_A = H_B = 0, F = 101 (total 125); sources à 2,50 et 0,75 mol/l | [Seeley et al. 1991], p. 283–286, fig. 4, tableau 2, annexe p. 290; [Camazine et Sneyd 1991] | EDO, RK4 (pas ≤ 0,05 min, stabilité vérifiée à dt/2); version agent stochastique N = 125. ODD : butineuses, sources; synchrone; stochasticité = abandon et suivi |
| S3 | Fourmi : *Pheidole*, préréglage « pheidole-seuils-fixes » (fiche P3) | T_θ(s) = s²/(s² + θ²) ([Theraulaz et al. 1998], éq. 1, qui l'attribue à [Bonabeau et al. 1996], [non vérifiée]); ∂ₜsⱼ = δ − (α/N) Σᵢ xᵢⱼ (éq. 7); abandon avec probabilité p par pas. Valeurs de la fig. 1 : α = 3, δ = 1, p = 0,2; m = 2 tâches; deux castes θ₁ < θ₂, fraction de majors f. Valeurs de [Bonabeau et al. 1996] (θ, N, durée) : [à confirmer]. Relèvement par les **majors** après retrait des minors : activité ×15 à ×30, répertoire ×1,4 à ×4,5 [Wilson 1984] (cadre, §2.4 point 1) | [Theraulaz et al. 1998], éq. 1–7, fig. 1–3; dossier p3-division-travail, §3.1 | Probabiliste à temps discret, pas 1 (Euler-Maruyama pour la version continue, Δt vérifié à 0,1). Fraction active à l'équilibre δ/α [I]. ODD : individus à seuils, stimulus partagé |
| S3 | Abeille : *Apis mellifera*, préréglage « apis-thermoregulation » (fiche P3; seuils par patriligne) | Diversité génétique des seuils et stabilité thermique [Jones et al. 2004] [R]; simulations à 1 ou 15 patrilignes (chauffage) et 5 patrilignes (refroidissement) [Graham et al. 2006] [R]. **Reconstruction [I], aucune équation publiée lue** : T(t+1) = T(t) + λ(T_amb − T) + κ_h·H(t) − κ_c·F(t), θᵢ = μ + η_patriligne + εᵢ. Inhibition sociale du polyéthisme d'âge [Beshers et al. 2001] [R], équations non lues. Paramètres : [à confirmer] | Dossier p3-division-travail, §3.5, §3.6 | Modèle à seuils; pas à fixer. **Modèle simplifié (reconstruction)** : fragilité déclarée, voir R82. ODD : abeilles à seuils par patriligne, compartiment de température |
| S5 | Fourmi : *Temnothorax albipennis*, quorum générique de [Sumpter et Pratt 2009] (cible T5.23 de la fiche P5; préréglage « émigration, deux nids ») | P_X(x) = p_x·[a + (m − a)·x^k/(T^k + x^k)] (éq. 4.1). n = 40; r = 0,02; p_x = 1; p_y = 0,5; T = 10; a = 0,1; m = 0,9; 1 000 simulations. k = 1 : 75,5 % choisissent X en 253,7 ± 64,0 pas; k = 9 : 83,3 % en 307,8 ± 71,0 pas; choix indépendant attendu : 66,7 %. Lecture du paramètre r : [à confirmer]. Quorum plus bas en conditions dures [Franks et al. 2003] (T_dur ≈ 0,4 à 0,6 fois T_doux) | [Sumpter et Pratt 2009], §4(a)–(d), éq. 4.1–4.2, fig. 3–6; dossier p5-quorum, M6, F1 | Modèle à agents à temps discret (probabilité par pas). N biologique = n = 40 du modèle. ODD : ouvrières non engagées, deux options, quorum local |
| S5 | Abeille : *Apis mellifera*, préréglage « essaim, choix de nid » (fiche P5; signal d'arrêt ciblé) | dΨ_A/dt = γ_AΨ_U − Ψ_A(α_A − ρ_AΨ_U + σ_BΨ_B), symétrique pour B, Ψ_U = 1 − Ψ_A − Ψ_B; seuil de bifurcation σ* = 4αγρ/(ρ−α)²; (γ, α, ρ) = (3, 1/3, 3) donne σ* = 1,6875 [I]; figures : σ = 1 (avant), σ = 10 (après). Version sensible à la valeur : γᵢ = ρᵢ = vᵢ, αᵢ = 1/vᵢ, σ*(v) = 4v³/(v²−1)²; bruit sensoriel k = 0,05 (fig. 3); seuil de quorum 0,7 (légende fig. 5; application à la fig. 3 : [à confirmer]) | [Seeley et al. 2012] (matériel supplémentaire; texte principal non lu); [Pais et al. 2013], éq. 1–5; dossier p5-quorum, M1, M2 | EDO et SDE (RK4; Euler-Maruyama, pas ≤ 0,01); **N fini par SSA, méthode directe** [Gillespie 2007] : propensités U→A : γ_A·U; A→U : α_A·A; U+A→A+A : ρ_A·A·U/N; A+B→U+B : σ_B·A·B/N [I]; N = 50 et 200 (x-methodes, X7, exploratoire). ODD : éclaireuses, deux sites, signal d'arrêt |

```
S1 fourmi ([Goss et al. 1989], p. 579-580)                       S_j : phéromone sur la branche courte au point j
dS_j/dt = Φ·p_{s,j'}(t − 20)  + Φ·p_{s,j}(t)               (1)   L_j : sur la branche longue; j' = point opposé
dL_j/dt = Φ·p_{l,j'}(t − 20r) + Φ·p_{l,j}(t)               (2)
p_{s,j} = (20 + S_j)² / [(20 + S_j)² + (20 + L_j)²],  p_{s,j} + p_{l,j} = 1   (3)

S1 abeille ([Seeley et al. 1991], annexe p. 290)
dA/dt   = (1 − f_d^A)(1 − f_x^A) p1 H_A + p2 D_A + f_l^A p4 F − p3 A
dD_A/dt = f_d^A (1 − f_x^A) p1 H_A − p2 D_A
dH_A/dt = p3 A − p1 H_A
dF/dt   = f_x^A p1 H_A + f_x^B p5 H_B − p4 F
dB/dt   = (1 − f_d^B)(1 − f_x^B) p5 H_B + p6 D_B + f_l^B p4 F − p7 B
dD_B/dt = f_d^B (1 − f_x^B) p5 H_B − p6 D_B
dH_B/dt = p7 B − p5 H_B
f_l^A = τ_A D_A / (τ_A D_A + τ_B D_B),  f_l^B = 1 − f_l^A   (formalisation [I], dossier p1 §3.3)
```

### 4.3 Modèle chorégraphique commun de P7 (couche 3)

Un environnement **à tours** où seul le canal est interchangeable (persistance, portée, adressage, format) [cadre, §7]. Il est aligné par docking sur chaque modèle de 4.2 avant tout usage (section 5, tableau B).

**Résumé ODD** (description complète en annexe de la note, un delta-ODD par variante de canal) [Grimm et al. 2006] [Grimm et al. 2020] :
1. *Objet et patrons* : mesurer G selon le canal; patrons de contrôle : les relations de 4.1 et 4.2.
2. *Entités et échelles* : N agents (10 LLM; N biologique pour les agents à règle), environnement (sources, tâches ou sites), médium de coordination; échelle = le tour, T = 30 tours, un appel par agent et par tour, soit 300 appels par run [dossier P7, §8.1].
3. *Ordonnancement* : mise à jour **synchrone** à double tampon (tous répondent à partir du même état), avec permutation aléatoire de l'ordre des agents et des messages à chaque tour (`permutationSeed` journalisée); variante asynchrone séquentielle en E7.9. L'ordre est un facteur à tester, non un détail [Caron-Lormier et al. 2008].
4. *Concepts de conception* : émergence (arrangements PER et DIF), interaction, adaptation de l'agent par son contexte et l'état partagé, jamais par mise à jour de poids [I], perception locale imposée par la portée R_port, stochasticité (graine d'environnement; échantillonnage et non-déterminisme du LLM).
5. *Initialisation* : environnements procéduraux générés à la volée à partir d'une graine (pas de banc public : contamination); habillage neutre (étiquettes arbitraires).
6. *Données d'entrée* : aucune externe; les graines et les invites hachées vont au manifeste de run.
7. *Sous-modèles* : environnements, canaux, politiques (règle, LLM, LLM-RÈGLE), scores.

| Environnement | Description (modèle simplifié, à figer au docking) | Information | Perturbation |
|---|---|---|---|
| **S1** recrutement | M = 2 sources de qualité qᵢ et de longueur de trajet ℓᵢ tours; à chaque tour : exploiter A, exploiter B, explorer ou rester. Configuré en pont (q égales, ℓ différents) il porte le docking de la fourmi; configuré par qualités (ℓ égaux) celui de l'abeille | Distribuée : seuls K éclaireurs connaissent les sources au départ [P, à confirmer] | Inversion des qualités à mi-run (t½) |
| **S3-D** division du travail, décomposable | m = 2 tâches indépendantes; stimulus sⱼ(t+1) = sⱼ(t) + δ − (α/N)·nⱼ(t), nⱼ nombre d'agents sur j; agents : tâche 1, tâche 2 ou repos | Stimulus partagé | Retrait de 30 % des agents à mi-run |
| **S3-S** division du travail, séquentielle | Idem, mais les unités de la tâche 2 n'apparaissent que par l'achèvement de la tâche 1 (chaîne de précédence). **Extension sans règle publiée : Hypothèse de l'auteur** | Idem | Idem |
| **S5-D** quorum, information distribuée | M = 2 sites de qualité v_A, v_B; chaque éclaireur évalue avec bruit, indépendamment; actions : évaluer, s'engager pour A ou B, recruter, rester; décision au quorum; T rondes fixes | Distribuée | — |
| **S5-R** quorum, information redondante | Idem, mais tous les agents reçoivent la même estimation bruitée (cas de [Choi et al. 2025a]) | Redondante | — |

La **difficulté** est calibrée au pilote pour que SOLO se situe à 40–80 % de son maximum (éviter le plafond; le gain est maximal à difficulté intermédiaire [Li et al. 2024]; dossier P7, §7.3) [P, à confirmer]. La structure de tâche est **décomposable** pour S1 et S3-D, **séquentielle** pour S3-S; S5 est une décision à agrégation (classement [I]).

---

## 5. Cibles de reproduction

Convention : alignement **relationnel** (signe, ordre, forme) pour les ancrages LLM, puisque les modèles d'origine ne sont plus ceux du programme; aucun TOST sauf pour le docking distributionnel (T7.19). La marge, les répétitions et la porte sont écrites **avant le code**, dans la fiche de reproduction de chaque cible ([../docs/04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)). Correspondance avec les résultats cibles du dossier P7 (§5, identifiants R1 à R12, à ne pas confondre avec les risques R71 et suivants de la section 11) : T7.1 à T7.7 = R1 à R7; T7.9 = R8; T7.10 = R9; T7.11 = R11; T7.12 = R12; T7.13 reprend la cible T9 et T7.14 la cible T12 du dossier x-choregraphie (attribuées à P7 par la fiche S0); T7.8 ([Jimenez-Romero et al. 2025]) et T7.15 à T7.20 (docking) sont créées ici. R10 ([Park et al. 2023], §7.1.2) n'est pas retenue (coût, environnement complexe).

**Tableau A — ancrages LLM** (lecture : [T], [R], [M], [S], [I]; porte : voir après les tableaux).

| T | Taxon ou système | Grandeur | Valeur publiée | Niveau d'acceptation | Tolérance ou marge | Répétitions | Source, emplacement | Lecture | Porte |
|---|---|---|---|---|---|---|---|---|---|
| **T7.1** | LLM : Haiku 4.5, Sonnet 5.5 | Ronde de population où 95 % des 3N dernières interactions réussissent (≈ N/2 interactions par ronde [I]) | Consensus « by population round 15 » pour tous les modèles sauf Llama-2-70b-Chat (N = 24, W = 10, H = 5) | Relationnel (ordre de grandeur) | Consensus au plus tard à la ronde 20 (15 + 5) dans ≥ 18 runs sur 20; médiane avec IC bootstrap | 20 par modèle | [Ashery et al. 2025], Résultats, fig. 1 | [T] (arXiv v2) | Ancrage |
| **T7.2** | LLM | Fraction des runs convergeant vers chaque nom; test binomial contre 0,5 (W = 2) | Biais collectif malgré des agents individuellement non biaisés : premier coup, mémoire vide, p = 0,116 (tableau 1, interaction 1); interaction 2 agrégée p = 0,110; interaction 3 p < 2,2 × 10⁻¹⁶ | Relationnel (signe) | Biais collectif détecté si p < 0,05 sur 40 runs, alors que le test individuel (premier coup, mémoire vide) ne l'est pas | 40 | [Ashery et al. 2025], fig. 2B, tableau 1 | [T] | Ancrage |
| **T7.3** | LLM | Plus petite minorité engagée qui fait basculer la convention (bisection) | De 2 % (Llama-3-70B) à 67 % (Llama-2-70b-Chat); référence humaine citée : 25 % | Relationnel (intervalle) | Valeur dans [2 %, 67 %]; écart à 25 % rapporté | 10 par niveau | [Ashery et al. 2025], fig. 3B, tableau S3 | [T] (fig. 3B en %, tableau S3 en effectifs) | Ancrage |
| **T7.4** | LLM : Sonnet 5.5 | Exactitude selon la condition (seul, vote, débat) | Arithmétique : 67,0 ± 4,7 / 69,0 ± 4,6 / 81,8 ± 2,3 %; GSM8K : 77,0 / 81,0 / 85,0 % (3 agents, 2 rondes) | Relationnel (ordre) | Seul ≤ vote ≤ débat, IC apparié (éq. 7 de [Miller 2024]), sur une tâche où l'agent seul est à 40–80 % | 200 items × 3 graines | [Du et al. 2024], §3.1, tableau 1 | [T] | Ancrage |
| **T7.5** | LLM : Sonnet 5.5 | G_interaction = débat − vote à appels égaux | Qwen2.5-7B, moyenne sur 7 tâches : seul 0,7205; débat décentralisé (T = 5) 0,7050; vote 0,7691 | Relationnel (signe) | IC à 95 % de G_interaction contient 0 ou est négatif (prédiction de Choi); sinon conflit T7.4 / T7.5 à documenter | Mêmes 200 items × 3 graines | [Choi et al. 2025a], tableau 1 | [T] | Ancrage |
| **T7.6** (= T8.11, P8) | LLM : Haiku 4.5 (critères (ii) et (iii) avec Sonnet 5.5 et Opus 5.5) | Exactitude selon N ∈ {1, 3, 5, 9, 15, 25, 40} | GPT-3.5-Turbo : GSM8K 0,73 → 0,85, MATH 0,29 → 0,39 à N = 40; Llama2-13B en ensemble 59 % contre 54 % pour Llama2-70B seul | Relationnel (monotonie) | (i) courbe non décroissante jusqu'à saturation (ρ de Spearman > 0, p < 0,05); non-monotonie admise si les items difficiles dominent [Chen et al. 2024a], rapportée par strate; (ii) gain relatif MATH > GSM8K; (iii) gain relatif décroissant avec la capacité; budget en jetons rapporté | 200 items; ≥ 10 exécutions | [Li et al. 2024], §5, tableau 2, fig. 1; critères (ii)-(iii) : dossier p8-individu-colonie, §4.1 | [T] | Ancrage |
| **T7.7** | LLM : Haiku 4.5, Sonnet 5.5 | Fraction de choix du chemin court par tiers d'itérations; temps par essai | LLM-ACO : 52,2 → 86,7 → 100 %; ACO classique : 61,1 → 71,7 → 72,8 %; 53,95 s par essai contre 0,334 s | Relationnel | (a) avec consignes de phase : ≥ 90 % de choix courts au dernier tiers; (b) **sans** consignes de phase (test du confondant) : résultat rapporté, sans seuil | 30 essais × 18 itérations | [Rahman et al. 2025], §V-B, fig. 2 | [T] | Ancrage pour (a); (b) non bloquant |
| **T7.8** | LLM : Haiku 4.5 | Collecte d'unités de nourriture (modèle *Ants*) | ≈ 85 unités, LLM comme règles (é.-t. 7 contre 20); ≈ 95 pour l'hybride 50/50 [à confirmer] | Relationnel | (i) \|LLM − règles\| ≤ 10 % de la collecte des règles [P, à confirmer]; (ii) hybride > max(LLM, règles), IC à 95 % apparié > 0; (iii) variances rapportées. Écart au protocole (température 0 impossible : `temperature` non réglable) au registre des déviations | 10 par condition [P, à confirmer] | [Jimenez-Romero et al. 2025], via dossier p1-recrutement §8 | [T] via outil, non recoupé | Ancrage (non satisfait s'il n'est pas exécuté) |
| **T7.9** | LLM : Haiku 4.5, Sonnet 5.5, Opus 5.5 | Accord conditionnel aux erreurs entre modèles | ≈ 60 % (HELM; hasard 33 %); 0,423 (HuggingFace; hasard 0,127) | Relationnel (supérieur au hasard) | IC bootstrap à 95 % (2 000 tirages) exclut le hasard; ≥ 100 items où les deux modèles se trompent, sinon « puissance insuffisante » | ≥ 500 items à réponse fermée | [Kim et al. 2025], fig. 1, tableau 1; seuils : cible « T11 » du dossier x-choregraphie, §5 | [T] | Non bloquant |
| **T7.10** | Tout vote | Précision d'un vote contre 1 − β | Précision ≤ 1 − β | Identité | Toute violation signale une erreur de code (test automatique dans le harnais) | Tous les runs de vote | [Chen 2026] | [R] | Outils |
| **T7.11** | Juge LLM et annotateurs humains | Accord d'annotation MAST | κ = 0,88 (humains); 0,77 (juge LLM); 0,79 (hors domaine) | Validité de mesure | κ ≥ 0,70 entre deux annotateurs sur 30 traces avant d'utiliser un juge LLM; puis κ du juge ≥ 0,70 sur 30 autres | 2 × 30 traces | [Cemri et al. 2025], §3–4 | [T] | Outils (préalable à H7.3) |
| **T7.12** | Outil de mesure | Signe de S_macro et de G₃ sur un jeu de contrôle simulé | Toutes les conditions montrent une capacité d'émergence; seule « persona + théorie de l'esprit » donne une stabilité I₃ > 0 significative | Validité d'outil | Le calcul reproduit le signe de S_macro sur un jeu simulé (agents à règle synergique contre agents indépendants); n du jeu fixé au pilote | Jeu de contrôle | [Riedl 2026], §2, §4.1, §4.2 | [T] | Outils (si la mesure est utilisée) |
| **T7.13** | Agentique : chorégraphie spécifiée (bras CHS) | Interblocages sur ordonnancements aléatoires des processus projetés | Absence d'interblocage par construction de la projection (théorème) | Identité (propriété de code) | 100 chorégraphies aléatoires bien formées : 0 interblocage sur 10⁴ ordonnancements aléatoires; contrôle négatif : processus écrits à la main avec une mutation (inversion d'un envoi et d'une réception), taux d'interblocage > 0 rapporté | 100 × 10⁴ | [Carbone et Montesi 2013] [Honda et al. 2008] (dossier x-choregraphie, cible T9) | [R] (théorème); critère [I] | Outils (préalable à CHS et à H7.11) |
| **T7.14** | LLM : Haiku 4.5, Sonnet 5.5, Opus 5.5 | n effectif de Kish d'un panel de modèles sur les mêmes items | Neuf juges équivalent à environ deux votes effectifs (n_eff de Kish dans [1,5 ; 3] pour k = 9, ≥ 300 items annotés) | Relationnel (n_eff < k) | k = 3 modèles seulement dans la grille (famille unique) : n_eff/k < 1 avec un IC bootstrap à 95 % qui exclut 1; la plage [1,5 ; 3] du dossier vise k = 9 et ne se transpose pas à k = 3 [P, à confirmer] | ≥ 300 items annotés (ceux de T7.9) | [Kohli 2026] (dossier x-choregraphie, cible T12) | [R]; définition de n_eff lue au dossier | Non bloquant |

**Tableau B — docking des modèles de colonie** (le modèle chorégraphique commun, configuré comme le modèle publié, reproduit ses relations; critères repris des fiches P1, P3 et P5, dont les identifiants sont rappelés en regard, sans les redupliquer).

| T | Taxon (scénario) | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Répétitions | Source, emplacement | Lecture | Porte |
|---|---|---|---|---|---|---|---|---|---|
| **T7.15** | *Linepithema humile* (S1 en pont) | % du trafic par la branche courte, passages 501 à 1000; branche courte tardive | Histogrammes Monte Carlo (fig. 2a-c) pour r ∈ {1 ; 1,4 ; 2}; branche courte ajoutée au 1000e passage : la colonie reste sur la longue (fig. 2d) | Distributionnel (docking sur la lecture publiée) | Chaque classe à ±5 points de la lecture (lecture ±3, erreur Monte Carlo ≈ 1,5); ≥ 95 % des simulations dans la classe 0–20 % pour la branche tardive. Le critère strict d'accord avec les 11 colonies échoue pour r = 1,4 et r = 2 avec le modèle publié : non retenu | 1 000 par r | [Goss et al. 1989], fig. 1–2, p. 579–580 (fiche P1 : T1.1 à T1.3; dossier p1-recrutement, §5, C1 à C3) | [T] | Docking |
| **T7.16** | *Apis mellifera* (S1 par qualités) | Effectifs simulés à midi (t = 240 min) | 119 abeilles sur la source riche, 3 sur la pauvre | Docking (EDO, déterministe) | Riche à 119 ± 3, pauvre à 3 ± 1 (dt ≤ 0,05 min, vérifié à dt/2); version agent (N = 125) : à 16 h la riche porte ≥ 70 % des engagés dans ≥ 95 % des répétitions | 1 intégration; 100 répétitions (agent) | [Seeley et al. 1991] [Camazine et Sneyd 1991], tableau 2, annexe p. 290 (fiche P1 : T1.4, T1.6; dossier, C4, C6) | [T] | Docking |
| **T7.17** | *Pheidole* (S3 fourmi) | Fraction active à l'équilibre; activité des majors après retrait des minors | Fraction = δ/α (conséquence de l'éq. 7); activité par major ×15 à ×30, répertoire ×1,4 à ×4,5 sous un ratio minors:majors de 1:1; les majors restaurent ≥ 75 % de l'activité des minors manquantes | Théorique, puis relationnel | \|ā − δ/α\| ≤ 0,01 (N = 1 000, 2 × 10⁴ pas, 2e moitié); x_maj(f = 0,9)/x_maj(f_base) ∈ [15 ; 30] avec θ₂/θ₁ calibré [à confirmer]; activité totale ≥ 75 % de la référence | 10 graines (F0); 20 graines (F1) | [Theraulaz et al. 1998], éq. 7; [Wilson 1984]; [Bonabeau et al. 1996] [non vérifiée] (fiche P3 : T3.1, T3.2; dossier p3-division-travail, §4, F0 et F1) | [T] (Theraulaz); [R] (Wilson 1984) | Docking |
| **T7.18** | *Apis mellifera* (S3 abeille) | Stabilité thermique selon la diversité des patrilignes | Colonies à plusieurs pères plus stables que celles à un père (aucun chiffre lu) | Relationnel | Écart-type de T_couvain : diverse < uniforme (Mann-Whitney p < 0,01); moyenne dans 33–36 °C, à recaler sur [Jones et al. 2004] ou [Graham et al. 2006] dès lecture [à confirmer] | 30 graines par condition | [Jones et al. 2004] [Graham et al. 2006] (fiche P3 : T3.11; dossier p3-division-travail, §4, A3) | [R]; équations non lues | Docking (conditionnelle : sans lecture, S3-abeille reste « reconstruction » et l'asymétrie est déclarée) |
| **T7.19** | *Temnothorax albipennis* (S5 fourmi) | Fraction vers X; temps jusqu'à l'engagement de tous | k = 1 : 75,5 % et 253,7 ± 64,0 pas; k = 9 : 83,3 % et 307,8 ± 71,0 pas (n = 40, r = 0,02, p_x = 1, p_y = 0,5, T = 10, a = 0,1, m = 0,9) | Distributionnel (TOST) | Fraction : marge ±4 points avec ≥ 1 980 runs par bras (±2 points exigerait ≈ 7 900); durée : ±15 % (±10 % non établie à 1 000 runs; lecture du « ± » : [à confirmer]) [x-methodes, X18, X19] | ≥ 1 980 par bras | [Sumpter et Pratt 2009], §4(b), fig. 4 (fiche P5 : T5.23; dossier p5-quorum, G1) | [T]; lecture de r [à confirmer] | Docking |
| **T7.20** | *Apis mellifera* (S5 abeille) | Seuil de bifurcation σ*; signal non ciblé; σ*(v) | σ* = 1,6875 pour (γ, α, ρ) = (3, 1/3, 3) [I]; σ = 1 : Ψ_A = Ψ_B = 0,4585; σ = 10 : (0,8497 ; 0,0392); signal non ciblé : interblocage persistant; σ*(v) = 8,640 ; 3,556 ; 1,138 ; 0,408 pour v = 1,5 ; 2 ; 4 ; 10 [I] | Docking (analytique) | σ̂* ∈ [1,654 ; 1,721] (±2 %); équilibres à ±10⁻³; \|Ψ_A − Ψ_B\| < 10⁻³ (non ciblé); σ*(v) à ±2 %. À N fini (SSA), la probabilité d'écart > 0,3 décroît avec N pour σ < σ* [x-methodes, X7; exploratoire] | Balayage de σ par pas ≤ 0,01; 200 runs SSA | [Seeley et al. 2012], matériel supplémentaire; [Pais et al. 2013], éq. 4 (fiche P5 : T5.1 à T5.4; dossier p5-quorum, A1 à A4) | [T] (matériel supplémentaire); texte principal non lu | Docking |

**Portes go/no-go** (avant toute donnée de la grille E7.1) :
- **Porte d'outils** (type *code* du protocole de reproduction) : T7.10, T7.11, T7.12 et T7.13 passent. Sinon on corrige le harnais ou la mesure; H7.3 est suspendue sans T7.11, CHS et H7.11 sans T7.13.
- **Porte de docking** (type *docking*) : T7.15 à T7.20 passent. L'échec d'un docking retire du plan confirmatoire l'environnement ou la comparaison à COL concernés, avec déclaration (plan B, section 11).
- **Porte d'ancrage** (type *réplication*) : au moins 4 des 6 ancrages {T7.1, T7.2, T7.4, T7.5, T7.6, T7.8} sont satisfaits pour au moins un des modèles d'ancrage [P, à confirmer], et aucun écart de signe inexpliqué sur T7.6. Un écart n'est pas une erreur (les modèles diffèrent de ceux publiés) mais il est consigné au registre des déviations et interprété. Si T7.4 et T7.5 divergent, le conflit est documenté, non masqué.

**États des cibles** (états du protocole de reproduction : *bloquée*, *provisoire*, *gelée*). À l'écriture, T7.14 et T7.18 sont *bloquées* (paramètres issus d'un résumé : pas de code avant lecture de [Kohli 2026] et de [Graham et al. 2006]); T7.8, T7.17, T7.19 et T7.20 sont *provisoires* (extraction non recoupée, valeur [à confirmer] ou texte principal non lu); les autres sont *gelables* dès que leur fiche est complète. T7.10 et T7.13 s'éprouvent comme des vérifications de code (identités), non par TOST.

**Cibles et expérience de P8 hébergées par P7.** La fiche P8 déclare que T8.11 à T8.13 et E8.5 « se jouent dans P7 » (appels d'API). T8.11 est reprise ici (T7.6). T8.12 (seuil de coordination de [Kim et al. 2025a], ≥ 60 configurations sur six bancs agentiques externes) et T8.13 (plan de [Kapoor et al. 2025]) s'exécutent avec le harnais de P7, **sous les identifiants et les critères de P8** : elles n'ancrent aucune H7.x, ne conditionnent aucune porte de P7, et leur coût n'est pas compris dans 9.7 [à estimer au pilote] (R83). E8.5 est traitée de même (section 6).

---

## 6. Expériences originales

Elles ne commencent qu'après les portes d'outils, de docking et d'ancrage (section 5), qui forment la porte d'extension du protocole de reproduction. Statut : confirmatoire pour les cellules qui portent H7.1 à H7.10 (préenregistrées), exploratoire pour le reste (étiqueté dans les pages, cadre §6.4).

### 6.1 Espace factoriel recompté

| Plan | Cellules LLM | Runs LLM | Source |
|---|---|---|---|
| Grille « 2 × 4 » de la v3 (piste, danse × règle, Haiku, Sonnet, Opus) | 8 nominales; 24 réelles avec 3 scénarios, dont 18 avec LLM | — | audit methodologie, P7-b |
| Grille 4 × 3 × 3 du dossier P7, phase 1 | 36 (+ 12 à règle) | 1 080 | dossier P7, §8.2 |
| **Espace complet de P7** : 6 architectures × 3 modèles × 4 environnements × 4 niveaux L × 3 types de diversité | 864 | 25 920 à 30 runs | calcul [I] |
| Grille centrale de P7 : 6 architectures × 3 modèles × 4 environnements | 72 | 2 160 | calcul [I] |
| **Plan retenu (fractionnaire)** : 58 cellules de la grille + 49 cellules d'extension | **107** | ≈ 3 750, rehausses de n comprises | calcul [I], section 9 |
| Agents à règle | 24 jeux de cellules : 16 à N = 10 (8 taxons × environnements, 8 contrôles IND et ORC à règle) et 8 à N biologique | 24 000 (1 000 par jeu) | calcul [I]; dossier P7 : 12 cellules, 12 000 runs |

Le plan retenu **omet 14 des 72 cellules de la grille** : Opus 5.5 dans S3-D et S3-S pour les cinq bras sans CHS (10 cellules), et Opus 5.5 avec CHS dans les quatre environnements (4 cellules). Le levier d'économie principal du dossier (limiter Opus 5.5, qui pèse environ 73 % du coût de la phase 1) est donc appliqué d'emblée. Les trois bras de référence sont ceux du cadre : IND, SOLO, COL. **Adressage** : il varie entre bras (dirigé pour ORC et CHS, déposé pour PER, diffusé pour DIF) et n'est pas isolé comme facteur; il reste confondu avec l'architecture, ce qui est déclaré. Persistance et portée sont découplées en E7.6; le format l'est en E7.3.

### 6.2 Contrastes planifiés (matrice hypothèses → cellules)

| Hypothèse | Cellules (expérience) | Contraste |
|---|---|---|
| H7.1 | S1 × {PER, DIF} × {Haiku 4.5, Opus 5.5}, Sonnet 5.5 descriptif (E7.1, E7.2) | (DIF − PER) avec Opus 5.5 moins (DIF − PER) avec Haiku 4.5, sur t½ |
| H7.2 | LLM-RÈGLE à L0 × {Haiku 4.5, Sonnet 5.5} × 2 taxons × {S1, S3-D, S5-D} contre COL (E7.4) | 12 TOST à ±0,5σ_COL |
| H7.3 | Sonnet 5.5 × {PER, DIF} × {L1, L2, L3} × {S1, S3-D, S5-D} (E7.3) | Texte libre (L2 ∪ L3) contre L1, taux de modes MAST |
| H7.4 | {CHS, PER, DIF} contre SOLO, Haiku 4.5 et Sonnet 5.5, 4 environnements (E7.1) | G_fort par scénario |
| H7.5 | Sonnet 5.5 × {ORC, PER, DIF} × {S3-D, S3-S}, 40 runs (E7.1) | (ORC − EMG) en S3-D moins (ORC − EMG) en S3-S |
| H7.6 | {IND, DIF} × {S5-D, S5-R} × {Haiku 4.5, Sonnet 5.5}, 40 runs (E7.1, E7.5) | Interaction architecture × information |
| H7.7 | S1, Sonnet 5.5, PER contre DIF (E7.1); découplage 2 × 2 (E7.6) | t½(PER) − t½(DIF); effet de la persistance seule |
| H7.8 | Sonnet 5.5, 4 niveaux × 2 canaux × 3 environnements (E7.3) | ΔG_int(L0 → L1); monotonie du coût |
| H7.9 | S3-D et S5-D × {PER, DIF} × {homogène, personas, mélange} (E7.7) | Amplitude d'oscillation du stimulus |
| H7.10 | S1 et S5-D × {SOLO, IND, ORC, PER, DIF} × 3 modèles (E7.1) | Pentes de la compétence et de G_fort selon le modèle |
| H7.11 | CHS contre PER et DIF en S5-D (E7.1) | Fréquence des issues de terminaison; G_int |

### 6.3 Expériences

Communs à toutes : 3 paraphrases d'invite par blocs équilibrés (10 runs chacune pour 30 runs), invites **figées et hachées avant les runs confirmatoires**, développées sur un jeu pilote distinct (jusqu'à 76 points d'écart d'exactitude selon le format de l'invite, [Sclar et al. 2024] [R], d'où le facteur aléatoire; trois niveaux sont un minimum, à augmenter si le pilote montre une variance de paraphrase forte, ce qui triplerait le coût selon l'audit methodologie, P7-f); sorties structurées; habillage neutre; sonde de reconnaissance du scénario après chaque run; ordre des messages permuté à chaque tour (graine journalisée).

| E | Hypothèses | Plan et facteurs | Répétitions | Critère de lecture |
|---|---|---|---|---|
| **E7.1** Grille centrale | H7.1, H7.4, H7.5, H7.6, H7.7, H7.10, H7.11 | Architecture {IND, SOLO, ORC, CHS, PER, DIF} × modèle {Haiku 4.5, Sonnet 5.5, Opus 5.5, catégoriel} × environnement {S1, S3-D, S3-S, S5-D}; format L2 (L0 pour IND). Haiku et Sonnet : 24 cellules chacun; Opus : {IND, SOLO, ORC, PER, DIF} × {S1, S5-D}, 10 cellules; 58 sur 72 | 30; 40 pour les cellules de H7.5 et H7.6 | G_int, G_fort, décomposition (S5), G_$, robustesse (ΔG après inversion ou retrait), issues codées, MAST; pour H7.11, Δ_PE, κ_PE et ΔRob_PE en S5-D; E7.1 couvre le banc des régimes de S0 sur les scénarios de P7; **contrôle de manipulation** : indicateurs C_ctrl, C_med, C_spec, C_stig, C_mem, C_amp (typologie : [../docs/06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md); définitions du dossier x-choregraphie, §2.3) calculés sur les journaux et vérifiés par cellule |
| **E7.2** Extension d'interaction | H7.1 | S1 × {PER, DIF} × {Haiku 4.5, Opus 5.5} | n₁ de l'éq. 9 de [Miller 2024] au pilote (≈ 100 [I]); paliers de 10 runs [P, à confirmer] jusqu'au plafond | Contraste d'interaction et IC; au-delà du plafond : « indéterminé » |
| **E7.3** Échelle de richesse | H7.3, H7.8 | Sonnet 5.5; niveau {L0, L1, L2, L3} × canal {PER, DIF} × {S1, S3-D, S5-D} : 24 cellules, 6 communes avec E7.1 (L2), 18 nouvelles. Plafond de jetons par message et fenêtre glissante identiques dans toutes les cellules (L3). Échelle **catégorielle** avec IC, jamais un axe continu présumé monotone [Chen et al. 2024a] | 30 | G_int et coût en panneaux alignés; R_eff estimé; annotation MAST des runs en échec |
| **E7.4** LLM exécutant la règle | H7.2 | Politique LLM-RÈGLE (même modèle, règle publiée du taxon dans l'invite, sans consigne de phase supplémentaire) à L0 × {Haiku 4.5, Sonnet 5.5} × taxon {fourmi, abeille} × {S1, S3-D, S5-D} : 12 cellules. Interface commune `decide(observation) → action`, même observation sérialisée que COL. Compagnon exploratoire : LLM sans règle (but et signal local seulement) contre COL. Ablation des consignes de phase de [Rahman et al. 2025] (T7.7 b). Opus 5.5 : option | 40 (COL : 1 000) | 12 TOST à ±0,5σ_COL; le compagnon donne la différence signée, sans verdict |
| **E7.5** Information redondante ou distribuée | H7.6 | S5-R × {IND, DIF} × {Haiku 4.5, Sonnet 5.5} : 4 cellules nouvelles, contre S5-D de E7.1 | 40 | Interaction architecture × information |
| **E7.6** Découplage persistance × portée | H7.7 | Sonnet 5.5, S1 : {persistant, éphémère} × {portée locale, globale}; PER = (persistant, locale), DIF = (éphémère, globale); 2 cellules nouvelles | 30 | Attribution de l'effet sur t½ à la persistance, à la portée ou aux deux (exploratoire) |
| **E7.7** Diversité | H7.9 | {homogène (E7.1), personas, mélange Haiku 4.5 / Sonnet 5.5 / Opus 5.5 par agent} × {PER, DIF} × {S3-D, S5-D} : 8 cellules nouvelles. La diversité vient des personas et des modèles, **non de la température** (non réglable, cadre §2.4 point 16) | 30 | Écart-type du stimulus après rodage, changements de tâche par agent; comparaison au fort seul [Bahrami et al. 2010] |
| **E7.8** Échelle et hybride | Exploratoire | Agents à règle à N = 10 (apparié) et à N biologique pour séparer l'effet d'échelle de l'effet de mécanisme; hybride : N = 100 dont 5 éclaireurs LLM [P, à confirmer] parmi des agents à règle (S1, S3-D, S5-D, Sonnet 5.5; 3 cellules) [dossier P7, §12 question 6] | 1 000 (règle); 30 (hybride) | Transitions de phase connues, G(N); relie P9 (fraction d'informés) |
| **E7.9** Ordre de mise à jour | Exploratoire | Synchrone (E7.1) contre asynchrone séquentiel : Sonnet 5.5, DIF, S3-D (1 cellule); d'abord avec les agents à règle, une fois par modèle à agents [Caron-Lormier et al. 2008] [Huberman et Glance 1993] | 30 | Écart < 3 erreurs standard de Monte Carlo pour conclure « sans effet » [x-methodes, M10d] |
| **E7.10** Contamination | Exploratoire | Habillage neutre (E7.1) contre habillage biologique (« fourmis », « abeilles ») : Sonnet 5.5, DIF, S1 (1 cellule) | 30 | Écart de score; taux de reconnaissance du scénario par la sonde |
| **E7.11** Fable 5.1 (option) | Descriptif | DIF × {S1, S3-D, S5-D}, hors comparaison principale (rétention des données de 30 jours obligatoire; raisonnement toujours actif) | 10 | Descriptif seulement |
| **E7.12** Décodeur LLM contre analyseur déterministe | Exploratoire (complément proposé à S0 dans métriques et typologie, hébergé par P7) | Messages L2 (≤ 30 jetons, schéma contraint) de E7.3 : R_eff estimé par un décodeur LLM figé (validé κ ≥ 0,7 contre annotation humaine) et par un analyseur déterministe; décodeur fixé avant les runs | 300 messages | Concordance ou échec selon les seuils du complément correspondant de métriques et typologie; décide si R_eff de L2 et L3 se lit par analyseur ou par juge |

**Expérience hébergée : E8.5 (fiche P8).** Collectif faible contre agent fort, à jetons égaux, avec quatre bras : agent fort seul, K agents faibles indépendants avec vote, K agents faibles avec canal, témoin orchestré (H8.4 à H8.8). Ces bras correspondent à SOLO, IND, DIF ou PER et ORC de P7; la fiche P8 en définit les facteurs et les critères, et son préenregistrement est propre. L'égalité en jetons de P8 et le plafond en dollars de P7 se réconcilient avant ce préenregistrement; E8.5 n'entre ni dans les cellules de 6.1 ni dans le budget de 9.7.

---

## 7. Parallèle agentique

### 7.1 Architectures comparées

Typologie à trois axes (cadre, §2.2) : A1 plan global explicite; A2 contrôle central à l'exécution; A3 médium de coordination. Les protocoles réels fournissent le transport, **pas la chorégraphie** : A2A est un protocole client vers agent distant à tâches, MCP relie un client à des serveurs d'outils et de ressources; le substrat chorégraphique (tableau noir, bus) s'ajoute au-dessus [dossier P7, §9; inférence de l'auteur].

| Bras | A1 plan | A2 contrôle central | A3 médium | Réalisation | Fourni par les protocoles ? |
|---|---|---|---|---|---|
| **IND** (référence) | non | non | aucun | Agents indépendants; vote en S5, somme des actions en S1 et S3 | — |
| **SOLO** (référence) | — | agent unique | — | Un agent voit l'union des observations et décide les N actions du tour; k tirages de Self-Consistency fixés pour égaler le coût de l'architecture comparée [Wang et al. 2023] | — |
| **ORC** (témoin orchestré) | oui | oui | messages dirigés | Client A2A superviseur : délègue des tâches à des agents travailleurs (états SUBMITTED, WORKING, COMPLETED, FAILED, CANCELED, INPUT_REQUIRED, REJECTED, AUTH_REQUIRED) [A2A 2026a] | Oui : délégation dirigée |
| **CHS** | oui | non | messages dirigés | Type global (types de session multipartites ou chorégraphie BPMN) projeté en rôles; messages typés entre pairs; le harnais vérifie la conformité des traces au type global [Carbone et Montesi 2013] [Honda et al. 2008] [OMG 2013] | A2A transporte; la projection est ajoutée |
| **PER** | non | non | état partagé persistant | Serveur MCP exposant un champ ou un tableau à décroissance (ressource à lire, outils `deposit` et `sense`); perception locale imposée; TTL au moins égal à la durée du run [P, à confirmer] [MCP 2026] | Substrat oui; décroissance ajoutée : `ttlMs` est un indice de fraîcheur de cache, non une décroissance d'intensité |
| **DIF** | non | non | diffusion éphémère | Bus sans rétention (TTL d'un tour [P, à confirmer]), auditoire auto-sélectionné (agents présents) | Non : ni A2A ni MCP n'ont de diffusion ou de pub/sub entre pairs |

**Type global de CHS** (esquisse [P, à confirmer]) : chaque tour enchaîne deux phases, un message `Rapport` de chaque agent à tous les autres (S1 : source et qualité observées; S3 : tâche prise; S5 : site et estimation), puis une décision locale selon la règle projetée (S5 : `Engagement(site)` quand le nombre de rapports pour un site atteint le quorum). Les messages hors type sont rejetés et comptés (C_spec); la condition de réalisabilité de [OMG 2013] s'applique (l'initiateur d'une étape a participé à la précédente). L'absence d'interblocage par projection est la cible T7.13; la règle de séquencement BPMN (cible T10 du dossier x-choregraphie) est T0.34 de la fiche S0.

Le **témoin orchestré** (ORC) répond à QR3 : même modèle pour l'orchestrateur et les travailleurs; l'orchestrateur voit l'état global et assigne les actions; ses appels comptent dans le budget (plafond en dollars par run commun aux bras à interaction). Le système de recherche multi-agent d'Anthropic suit ce patron : environ 15 fois les jetons d'un échange, +90,2 % sur une évaluation interne, échecs par excès de sous-agents et travail dupliqué [Hadfield et al. 2025].

### 7.2 Relations et statuts épistémiques

Les énoncés sont des **relations** entre mécanismes, non des équivalences de termes. À l'écriture, aucun n'est un *Résultat reproduit*; le statut passe à ce niveau seulement après la porte concernée.

| Relation biologique (source) | Relation agentique (bras, cellule) | Statut |
|---|---|---|
| Le recrutement par danse est une annonce que le suiveur choisit de suivre, tirée au hasard parmi les danses présentes; il n'assigne rien [Seeley et al. 1991] | DIF (diffusion éphémère, auto-sélection); la **délégation** est ORC, un régime d'orchestration (dossier x-choregraphie, §9 point 2) | Analogie |
| Une trace laissée dans un médium stimule l'action suivante : P(action \| trace) > P(action) [Heylighen 2016a]; le taux d'oubli optimal dépend de la vitesse d'obsolescence [Heylighen 2016b] | PER à TTL; la persistance règle flexibilité et verrouillage (H7.7) | Hypothèse de l'auteur |
| Régimes de coordination du cadre (orchestration; chorégraphie spécifiée; auto-organisation stigmergique; par signaux directs) | Les bras ORC, CHS, PER, DIF; indicateurs C de [x-choregraphie, §2.3] | Modèle simplifié |
| Quorum : seuil local à réponse non linéaire, réglable entre vitesse et justesse [Sumpter et Pratt 2009] | Agrégation à seuil en S5; n nominal n'est pas n effectif : neuf juges équivalent à environ deux votes [Kohli 2026] | Hypothèse de l'auteur |
| Diversité des seuils de réponse (diversité temporelle) [Theraulaz et al. 1998] | Diversité épistémique des personas et des modèles [Kim et al. 2025] [Kim 2026]; « des agents identiques oscillent » est sans acquis, testé en H7.9 (cadre, §2.4 point 13) | Hypothèse de l'auteur |
| La valeur collective d'insectes cognitivement capables vient surtout de l'amplification de la cognition individuelle [Feinerman et Korman 2017] | Vote, filtrage; la valeur d'un collectif de LLM viendrait de l'amplification plus que de l'émergence au sens fort [I] (H7.4, H7.10) | Hypothèse de l'auteur |
| Inhibition probabiliste et ciblée (signal d'arrêt), non un veto (cadre, §2.4 point 7) [Seeley et al. 2012]; le freinage existe aussi chez la fourmi (cadre, §2.4 point 9; encombrement : [Grüter et al. 2012]) | Présente dans COL et LLM-RÈGLE (S5 abeille); non manipulée pour les LLM libres en P7 (relève de P4 et P5) | Modèle simplifié |
| Oubli sous trois formes : évaporation, abandon, attrition des danses (cadre, §2.4 point 14) | P7 manipule l'oubli côté environnement (TTL, R_pers); l'abandon et l'attrition ne vivent que dans les agents à règle | Modèle simplifié |
| Le signal de piste est un champ multi-signal, non un scalaire; la danse est un échantillonnage aléatoire local, non un pub/sub (cadre, §2.4 point 10) | Le niveau L0 « scalaire » est un **niveau de manipulation** du format, pas une description de la piste (granularité de la mémoire partagée, cadre, §2.4 point 15) | Modèle simplifié |

### 7.3 Où l'analogie casse

| Rupture | Biologie | Agents LLM | Traitement dans P7 |
|---|---|---|---|
| Indépendance et erreurs corrélées | Éclaireuses qui inspectent elles-mêmes [List et al. 2009] | Accord de l'ordre de 60 % entre modèles quand les deux se trompent [Kim et al. 2025]; la discussion est une martingale [Choi et al. 2025a] | T7.9, T7.10; β mesuré; une seule famille de modèles (R87) |
| Homogénéité | Diversité des seuils | Même modèle, même invite; température non réglable | E7.7 (personas, mélange) |
| Coût par individu | Individu bon marché, redondance massive | Environ 15 fois les jetons [Hadfield et al. 2025]; environ 300 fois le temps de calcul pour Boids [Rahman et al. 2025] | Budget égal en dollars; G_$ |
| Échelle | Colonies de 10³ à 10⁶ individus [dossier P7, C12] | 10 à 25 agents au plus | Agents à règle à N = 10 et à N biologique; hybride (E7.8) |
| Intérêts | Coopération acquise par l'évolution, non hypothèse de protocole [Feinerman et Korman 2017] | Agents d'écosystèmes ouverts, potentiellement intéressés [Gopinathan et al. 2026] | Hors périmètre : agents coopératifs supposés |
| Adversarialité | Mimétisme chimique | Injection qui se réplique d'agent en agent [Lee et Tiwari 2024] | Renvoyée à P6 |
| Environnement textuel | Champ physique, localité imposée par la physique | Aucune localité si on ne l'impose pas; tout agent lit tout | Portée R_port imposée par le harnais |
| Horloge centrale | Aucune | Le tour est tenu par le harnais : un orchestrateur caché de l'horloge [I] | La décentralisation porte sur la décision, non sur l'horloge; limite déclarée |
| Réversibilité | Pertes tolérées | Effets de bord à compenser [Garcia-Molina et Salem 1987] | Non couverte (renvoi P6) |
| Rôle de la reine | Elle diffuse des signaux régulateurs, sans assigner les tâches | Le prompt système partagé est une contrainte diffusée, non un ordre [I] | Prompt système commun à tous les agents d'une cellule |

### 7.4 Structure de tâche

Facteur de QR3, croisé avec l'architecture (décomposable ou séquentielle). **Décomposable** : sous-tâches indépendantes à effets additifs (S1, S3-D). **Séquentielle** : l'étape suivante exige la sortie de la précédente (S3-S). S5 est une décision à agrégation (classement [I]). Attente publiée : l'architecture centralisée domine une tâche décomposable (+80,8 % en finance), le décentralisé gagne en navigation dynamique (+9,2 %), et en planification séquentielle toute variante multi-agent dégrade (−39 % à −70 %) [Kim et al. 2025a] (bancs externes; transposition à P7 : Hypothèse de l'auteur, H7.5).

### 7.5 Lien avec P7

Cette fiche **est** P7; elle consolide les volets agentiques des autres projets.

| Projet | Volet repris | Où |
|---|---|---|
| P1 | Panneau « TTL d'un tableau partagé × poids de la majorité » (conformité : [Han et al. 2026] [Choi et al. 2025b]); précédent fourmis LLM | E7.3, E7.6, T7.8 |
| P3 | Agents homogènes contre diversifiés; oscillation de l'arriéré | E7.7, H7.9 |
| P5 | n effectif d'un quorum de LLM; information distribuée | S5, H7.6 |
| P6 | Modes d'échec (MAST); l'injection reste à P6 | H7.3, H7.11 |
| P8 | Budget égal, faible contre fort (H8.5), seuil de coordination (H8.6) | H7.4, H7.10; E8.5 de P8 s'exécute avec ce harnais (R83) |
| P9 | Minorité informée : fraction d'agents informés | E7.8 |
| S0 | Typologie, métriques R et G, noyau, harnais | Sections 3, 9 |

---

## 8. Visuels et trois niveaux

**Charte** (cadre, §8) : fourmi #D55E00, abeille #0072B2, agent #CC79A7, chacun doublé d'un pictogramme; viridis ou cividis pour les grandeurs continues; G_int en échelle divergente centrée sur 0. **Public principal** : praticiens de l'agentique, puis chercheurs; niveaux principaux : Explorer, puis Vérifier, Voir servant d'amorce courte (vulgarisation et évaluation). Chaque graphe porte son statut épistémique et sa mention « confirmatoire » ou « exploratoire ». Les pages **n'appellent jamais l'API** : elles rejouent les journaux (cassettes) [audit simulation-technique, M17]. Conséquence : « Modifier la règle » agit en direct sur les agents **à règle** seulement; pour les LLM, on change la cassette affichée.

| | **Voir** (récit guidé, avec prédiction) | **Explorer** (bac à sable étayé) | **Vérifier** (reproduction, N graines, code, limites) |
|---|---|---|---|
| **Montré** | (1) Jeu de nommage animé : 24 points colorés selon le nom courant, curseur de minorité engagée, repère « 25 % chez les humains » [Ashery et al. 2025]; (2) barre décomposée « agrégation + interaction » (S5) [Choi et al. 2025a]; (3) triptyque d'un même scénario S1 : champ de phéromone en carte thermique (fourmis), vecteurs de danse éphémères (abeilles), bulles de message qui s'effacent selon R_pers (agents), chronogramme commun de p_best | Grille architecture × modèle, un onglet par scénario : chaque case donne G_int avec son IC en couleur divergente, un clic ouvre le rejeu; échelle de richesse L0 à L3 en petits multiples (G_int et coût en deux panneaux alignés, pas de double axe); curseur des trois régimes (orchestration, chorégraphie projetée, tableau noir stigmergique) avec C_ctrl, C_med, C_spec en direct; lecteur de rejeu (frise des tours, état partagé à gauche, messages à droite, annotation MAST) | Distribution sur graines (30 LLM, 1 000 règle); diagramme UpSet des erreurs de Haiku 4.5, Sonnet 5.5 et Opus 5.5 (zone « tous faux » β surlignée, ligne 1 − β superposée à la précision du vote); front de Pareto exactitude-coût [Kapoor et al. 2025]; carte des pannes MAST (Sankey architecture → catégorie → mode); fiche de reproduction, écarts, registre des déviations, ODD, code, journal, manifeste, limites |
| **Manipulé** | Rien : une prédiction avant chaque révélation | Architecture, modèle (cassette), niveau L, scénario; pour les agents à règle : N, TTL, portée, k, n, ρ, seuils θ, quorum T, σ | Graine, cellule, marge d'équivalence; téléchargement des séries |
| **Vue de l'agent** | Une bulle « ce que voit cet agent » : une observation et sa sortie structurée | Panneau du lecteur : observation exacte (état local du médium perçu à la portée R_port), hachage de l'invite, sortie structurée, `stop_reason`; pour une règle : probabilité de choix calculée | Requête et réponse brutes du journal champ par champ, jetons, coût |
| **Modifier la règle** | Aucune | Curseurs des paramètres des modèles de colonie (agents à règle), variantes prédéfinies, puis éditeur de la politique `decide` (formule ou quelques lignes de TypeScript) avec retour immédiat (O5); bouton « exécuter la règle dans l'invite » qui bascule vers la cassette LLM-RÈGLE | Comparer deux jeux de paramètres sur N graines avec IC; basculer du modèle publié au modèle commun (docking) |
| **Objectifs d'apprentissage** (formulés « la personne peut… », verbe et niveau de Bloom, objectif-cadre précisé et item de mesure nommé; V0 prévaut pour le niveau, le type d'item et les seuils, [../docs/07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)) | **O1** (Appliquer; précise OA-P7.1) : situer ORC, CHS, PER et DIF dans les quatre régimes selon les trois axes; item : classement avec justification. **O2** (Comprendre; précise OA-P8.2) : expliquer que le gain d'un collectif peut venir du vote et non de la communication (cas S5, après prédiction); item : question ouverte codée, explication directe ou émergente [Chi et al. 2012] | **O3** (Appliquer; précise OA-P7.2) : prédire, avant de lancer la cellule rejouée, le sens de l'effet d'un changement de persistance ou de portée sur t½; item : prédiction tracée et écart à la distribution. **O4** (Analyser; précise OA-P7.2) : lire G_int et le coût à chaque niveau L0 à L3 et dire où l'ajout de texte cesse de payer; item : lecture d'une grille fournie. **O5** (Créer; précise OA-P7.4) : écrire une politique `decide(observation) → action` sur les agents à règle et la comparer au témoin orchestré rejoué; item : politique et comparaison | **O6** (Évaluer; précise OA-P7.3 et OA-T.3) : critiquer un résultat multi-agents sans budget égal ni intervalle, et conclure « équivalent », « différent » ou « indéterminé » à partir d'un IC et d'une marge; item : critique d'un énoncé. **O7** (Comprendre; précise OA-P7.2) : expliquer pourquoi n nominal n'est pas n effectif (neuf juges, deux votes effectifs [Kohli 2026]); item : question ouverte codée |
| **Accessibilité propre** (en plus de WCAG 2.2 AA, daltonisme, `prefers-reduced-motion`, clavier, mobile) | Aucune animation d'effacement sous `prefers-reduced-motion` : le TTL s'affiche en nombre | La couleur divergente de G_int est doublée d'un glyphe de signe et d'une valeur textuelle (« G_int = x [IC a ; b] »); lecteur de rejeu au clavier, tour par tour, sans lecture automatique; messages LLM longs repliés, région live désactivée par défaut; grille repliée en liste sur mobile | Table de données équivalente à l'UpSet et au Sankey; langue des invites : anglais [P, à confirmer], traduction française affichée avec le message original |
| **Erreurs de compréhension à prévenir** [Chi et al. 2012] | « La reine ou l'orchestrateur décide » (schéma causal centralisé) : encart « Ce que fait vraiment la reine »; ORC est un témoin, non une faute | « Plus de communication, meilleur résultat » (L0 à L3 avec coût); « le gain vient de la communication » alors qu'il peut venir du vote ou du budget (décomposition, budget égal); « fourmi = piste, abeille = danse » (le canal est une variable; Meliponini en contre-exemple; S5 fourmi sans piste) | « Reproduit = validé » (statuts épistémiques; la réplication n'est pas la validation); « dix agents LLM = une colonie » (N et N biologique); anthropomorphisme et téléologie : vocabulaire de mécanisme (cadre, §8) |

---

## 9. Plan de simulation

### 9.1 Modèles par couche

| Couche | Contenu | Ajouts de P7 |
|---|---|---|
| 1. Noyau commun ([../docs/05-spec-simulation.md](../docs/05-spec-simulation.md)) | PRNG à graine `xoshiro128**` initialisé par SplitMix64 (vecteurs de test X1 et X3 de x-methodes) [Blackman et Vigna 2021]; horloge à pas fixe découplée du rendu; RK4; SSA (méthode directe) [Gillespie 2007]; événements discrets; enregistreur; scénario avec constantes précalculées; manifeste de run. `Math.random` et `Date.now` interdits dans la logique de simulation (contrôle par recherche en intégration continue). Un flux par sous-système : environnement, permutation des messages, chaque architecture, chaque agent à règle | Adaptateur LLM (interface `decide(observation) → action`), cassette, journal, lots synchronisés, interrupteur de budget, adaptateurs MCP et A2A, annotation MAST |
| 2. Modèles de référence | Ancrages (4.1) et modèles de colonie (4.2), chacun validé contre sa figure ou son tableau | Docking, tableau B |
| 3. Modèle chorégraphique commun | Environnements S1, S3-D, S3-S, S5-D, S5-R (4.3); seul le canal est interchangeable | Contrôle de manipulation (indicateurs C) |

Langage : TypeScript partout (Node exécute le `.ts`; `tsc --noEmit` vérifie les types); esbuild seulement pour empaqueter les pages; tests par `node --test` (cadre, §7).

### 9.2 Pas de temps, effectifs, graines, répétitions

| Élément | Choix | Source |
|---|---|---|
| Pas de temps | LLM : le tour, T = 30. Agents à règle : celui du modèle publié (S1 abeille : RK4, pas ≤ 0,05 min, vérifié à dt/2; SDE : Euler-Maruyama, pas ≤ 0,01; SSA : temps continu) | dossier P7, §8.1; x-choregraphie, §5; 4.2 |
| N d'agents | LLM : 10. Règle : 10 (apparié) **et** N biologique (S1 abeille : 125; S5 fourmi : 40; S5 abeille en SSA : 50 et 200; S3 : 100 ou 1 000) | dossier P7, C12; 4.2 |
| Graines | Une graine d'environnement par run, **commune à toutes les cellules d'une comparaison**. Pas de graine pour l'API : on la remplace par K répétitions et une cassette | audit simulation-technique, M1; x-methodes, M9 |
| Répétitions | LLM : 30 (40 pour H7.2, H7.5, H7.6; ≈ 100 pour H7.1). Règle : 1 000 (plus si l'erreur standard de Monte Carlo d'un critère de docking l'exige : n_sim = p(1−p)/ES², soit 10 000 au pire cas pour ES = 0,005) | dossier P7, §7.1; [Morris et al. 2019] |
| Rodage | Mesure du stimulus de S3 après rodage; durée fixée au pilote [P, à confirmer] | x-methodes, M4 |
| Difficulté | Calibrée pour que SOLO soit à 40–80 % de son maximum | dossier P7, §7.3 |

### 9.3 Modèles LLM : identifiants, tarifs, paramètres

**Identifiants et tarifs du dossier (cache du 2026-09-25) [Anthropic 2026b], À VÉRIFIER avant toute exécution** contre la documentation en ligne [Anthropic 2026a] (le dossier les a contrôlés contre le seul skill local).

| Modèle | Identifiant | $ US par million de jetons : entrée / sortie / lecture de cache | Raisonnement et effort | Échantillonnage | Retrait (au plus tôt) |
|---|---|---|---|---|---|
| Claude Haiku 4.5 | alias `claude-haiku-4-5` = identifiant complet `claude-haiku-4-5-20251001` [Anthropic 2026b] : figer l'identifiant complet, consigner `response.model` | 1 / 5 / 0,10 [à confirmer] (règle générale : 0,1 fois l'entrée) | Sans raisonnement par défaut; le paramètre `effort` échoue | `temperature` réglable : laissée à la valeur par défaut | **2026-10-15** (provisoire) |
| Claude Sonnet 5.5 | `claude-sonnet-5-5` | 2 / 10 / 0,20 | Raisonnement coupé par `thinking: {type: "between_tools"}` (effort ≤ `high`); effort par défaut `high`, fixé à `low` ou `medium` | Valeur non par défaut rejetée (400) | 2027-09-28 |
| Claude Opus 5.5 | `claude-opus-5-5` | 4 / 20 / 0,20 | Raisonnement non désactivable; effort par défaut `medium`, fixé à `low` | `temperature`, `top_p` rejetés (400) | 2027-09-22 |
| Claude Fable 5.1 (option) | `claude-fable-5-1` | 10 / 50 / 0,25 | Raisonnement toujours actif; rétention de 30 jours obligatoire | `temperature`, `top_p` rejetés (400) | 2027-09-01 |

- **Capacité = catégoriel.** « Capacité » est un paquet (modèle, génération, raisonnement, tokeniseur, classifieurs de sécurité), traité comme facteur **catégoriel** sans échelle prétendue. **Effort et sortie maximale fixés et consignés** : une seule valeur de `max_tokens` par niveau L, identique pour tous les modèles, calibrée au pilote pour ne tronquer aucun modèle (une troncature, `stop_reason: "max_tokens"`, est une issue codée).
- **Haiku 4.5 : point historique à collecter en premier.** Retrait provisoire « pas avant 2026-10-15 »; la page des dépréciations donne au moins 60 jours de préavis [Anthropic 2026a] : vérifier avant de planifier (R71). Sonnet 4.5 est déprécié depuis 2026-09-30 (retrait 2026-11-30) : **aucune dépendance** à ce modèle.
- **Hypothèses de coût du dossier** (à calibrer au pilote) : par appel, 1 200 jetons en lecture de cache (prompt système et règles), 800 non cachés (état local), 150 en sortie visible (L2); raisonnement : 0 pour Haiku 4.5 et Sonnet 5.5, 300 pour Opus 5.5 à effort bas, 500 pour Fable 5.1; échelle de richesse (entrée non cachée / sortie) : L0 400/20, L1 600/50, L2 800/150, L3 2 000/400.
- **Coût par run** (300 appels; formule du dossier, recalcul [I]) :

| Niveau | Haiku 4.5 | Sonnet 5.5 | Opus 5.5 | Fable 5.1 |
|---|---|---|---|---|
| L0 | 0,19 $ | 0,37 $ | 2,47 $ | 9,09 $ |
| L1 | 0,29 $ | 0,58 $ | 2,89 $ | 10,14 $ |
| L2 (dossier : 0,50 ; 1,00 ; 3,73 ; 12,24) | 0,50 $ | 1,00 $ | 3,73 $ | 12,24 $ |
| L3 | 1,24 $ | 2,47 $ | 6,67 $ | 19,59 $ |

- **Contrôles de plateforme** (tous à revérifier) : aucun paramètre `seed`; même à température par défaut les résultats ne sont pas déterministes [Anthropic 2026a] [Atil et al. 2024]; `tool_choice` forcé rejeté (400) sur Opus 5.5, Sonnet 5.5 et Fable 5.1 : **sorties structurées** (`output_config.format`) avec **le même schéma d'action pour tous les modèles**; les **replis côté serveur** (`fallbacks`, recommandés par défaut sur les modèles 5.5) changent de modèle en cours d'expérience : **désactivés**, comptage des refus (`stop_reason: "refusal"`) comme issue; limites de débit selon le palier du compte [Anthropic 2026c].

### 9.4 Journal JSONL, cassette, rejeu

Un fichier compressé par bloc, **une ligne par appel**, archivé hors dépôt Git dans un dépôt de données à DOI (après lecture des conditions d'utilisation, R85). **Les noms de champs sont ceux de la spécification de simulation** ([../docs/05-spec-simulation.md](../docs/05-spec-simulation.md), type `LlmCallRecord`), qui prime pour les noms; la présente fiche fixe le reste. Aucun secret n'entre dans le journal : le corps de requête est conservé tel qu'envoyé, sans clé.

| Champs de la spécification | Contenu |
|---|---|
| `schema`, `runId`, `scenarioHash`, `seed`, `step`, `agentId` | Version du schéma; identifiant du run; hachage du scénario complet (paramètres, pas, ordre de mise à jour, unités); graine; tour; agent |
| `requestedModel`, `responseModel` | Modèle demandé; **`response.model` consigné** pour chaque appel |
| `effort`, `thinking` | Configuration envoyée |
| `request`, `requestHash` | Corps complet de la requête; SHA-256 de son JSON canonique, clé de cassette avec (`runId`, `step`, `agentId`) |
| `response` | `content`, `stopReason`, `usage` (`input_tokens`, `cache_read_input_tokens`, `cache_creation_input_tokens`, `output_tokens`) |
| `latencyMs`, `costUsd`, `region`, `requestId`, `sdkVersion`, `timestamp`, `permutationSeed` | Latence; coût calculé depuis `usage` et la table de tarifs du manifeste; traçabilité du fournisseur; version du SDK; horodatage; graine de la permutation de l'ordre des agents et des messages |

| Champs ajoutés par P7 | Contenu |
|---|---|
| `cell` | Bloc, architecture, modèle demandé, environnement, niveau L, taxon (LLM-RÈGLE), type de diversité, structure d'information |
| `promptId`, `promptHash`, `paraphrase` | Invite figée, hachée avant les runs confirmatoires |
| `maxTokens` | Sortie maximale fixée pour le niveau L |
| `parsedAction`, `parseError` | Action analysée; un échec d'analyse donne une action nulle, comptée |
| `budgetCumUsd` | Cumul du bras budgétaire, pour l'interrupteur |
| `batchId`, `customId` | Mode lot : appariement des résultats |
| `protocolMsg` | Message MCP ou A2A : méthode, version de spécification, identifiant de tâche |
| `sentinel` | Cellule sentinelle |
| `issue` | Code d'issue du run (section 11.2) |

- **Rejeu par cassette** : l'adaptateur LLM sert la réponse journalisée, indexée par (`runId`, `step`, `agentId`, `requestHash`). Un hachage de requête différent signale une divergence du moteur : c'est aussi le test de non-régression. Le rejeu **ré-exécute l'environnement déterministe à partir des sorties LLM journalisées, sans rappeler l'API** [dossier P7, C10]. Les pages et l'audit des échecs reposent sur lui.
- **Rejouable, pas ré-exécutable.** Aucune graine côté API, retraits annoncés de modèles, dérive possible : une expérience reste rejouable après le retrait d'un modèle, mais on ne peut plus la **ré-exécuter**. La note de recherche le dit (audit simulation-technique, C3).

### 9.5 Implémentation par protocoles réels

Versions à **revérifier avant exécution** (R84) : **MCP 2026-07-28** (cœur sans état, `server/discover`, `subscriptions/listen`, `CacheableResult` avec `ttlMs` et `cacheScope`; *Sampling* déprécié, non utilisé) [MCP 2026]; **A2A 1.0.0** (publiée le 2026-03-12) et v1.0.1 (correctif du 2026-05-28) [A2A 2026b], la page de spécification affichant « 1.0.0 » [A2A 2026a] : l'écart n'est pas résolu, le manifeste consigne la version effective. Les années 2026 de ces étiquettes sont déduites de l'ordre des versions.

- **Le harnais est le client.** L'agent ne choisit pas d'appeler des outils : son observation est le résultat de `sense`, et sa sortie structurée contient le dépôt (`deposit`) ou le message que le harnais exécute. Raison : `tool_choice` forcé est rejeté sur les modèles 5.5, et laisser le choix d'appeler un outil serait un confondant entre modèles [I].
- **PER** : serveur MCP (ressource lue; outils `deposit` et `sense`); la **décroissance est ajoutée par le serveur** (`ttlMs` n'est qu'un indice de cache). **ORC** : client A2A superviseur, agents travailleurs décrits par des Agent Cards. **CHS** : messages typés entre pairs sur A2A, conformité au type global vérifiée par le harnais. **DIF** : bus sans rétention propre au harnais (A2A et MCP n'ont pas de diffusion entre pairs; absence de pub/sub dans A2A établie par lecture outillée, à confirmer).
- Chaque message de protocole est journalisé (`protocol_msg`). A2A rend les agents opaques (ni pensées, ni plans, ni outils partagés) : cohérent avec l'observation sérialisée identique.

### 9.6 Exécution et budgets de performance

- **Mode lot synchronisé (production).** Un lot **par tour** réunit tous les agents de toutes les répétitions de toutes les cellules du bloc; 30 lots successifs par bloc; ORC en demande deux par tour (orchestrateur, puis travailleurs). Limites d'un lot : 100 000 requêtes ou 256 Mo; résultats dans un ordre quelconque (apparier par `custom_id`); lots conservés 29 jours; la plupart finissent en moins d'une heure, expiration à 24 h; succès du cache « au mieux » (30 à 98 %) [audit simulation-technique, M16]. **API standard** avec limiteur de concurrence pour le développement, les pilotes et E7.9 (l'asynchrone séquentiel ne se met pas en lot).
- **Charge** : environ 3 750 runs × 300 appels ≈ 1,1 million d'appels [I] (dossier : ≈ 700 000 pour ≈ 2 300 runs). Faisable en quelques semaines sous les limites habituelles, à vérifier selon le palier [dossier P7, §8.3].
- **Cache** : préfixe stable (règles, scénario) puis observation; vérifier `usage.cache_read_input_tokens`; effort fixé et consigné.
- **Non-stationnarité** [Chen et al. 2024b] : fenêtre d'exécution courte; cellules d'une même comparaison **entrelacées** en blocs aléatoires dans le temps (jamais une cellule un jour, l'autre le lendemain); **cellule sentinelle** à graines fixes rejouée chaque semaine, dérive déclarée si son score sort de l'IC à 95 % du pilote; campagne gelée sur une fenêtre courte [dossier P7, §7.4].
- **Pages** : au plus 25 agents, Canvas, aucun WebAssembly (le cadre n'en prévoit que si N dépasse ce que Canvas tient, avec mesure); simulation dans un worker si le pas dépasse environ 8 ms [audit simulation-technique, M11, inféré]; balayages des agents à règle sous Node (`worker_threads`).

### 9.7 Budget en dollars, plafonds, pilote à 1 %

Barème : coûts par run de 9.3 × nombre de runs; standard en $ US. **Base du dossier** : ≈ 3 370 $ standard et ≈ 1 690 $ en lot, ≈ 4 380 $ et ≈ 2 200 $ avec 30 % d'imprévus. Le dossier annonçait aussi ≈ 3 250 $ et ≈ 1 620 $ (C13) : il s'agit d'une **différence de périmètre, non d'une erreur** [I] : 3 248 $ (phases 1, 2, 3, option et jeu de nommage) + 80 $ (pilote) + ≈ 44 $ (autres ancrages, par différence) ≈ 3 372 $.

| Bloc | Contenu | Runs | Coût standard [I] | Plafond (×1,30) |
|---|---|---|---|---|
| B0a | **Pilote à 1 %** : jetons réels par appel, refus, échecs d'analyse, cache; prélevé sur l'enveloppe, non ajouté | — | ≈ 43 | ≈ 56 |
| B0b | Pilote de variance : 6 cellules représentatives × 10 runs (σ, jetons, refus; reprend la cible X20 transférée à P7 par S0, seuil de non-répétabilité fixé après pilote) [dossier P7, §8.2] | 60 | ≈ 80 (dossier) | ≈ 104 |
| B1 | Ancrages T7.1 à T7.7, T7.9 (dossier : ≈ 65 $, estimation grossière, T7.7 et T7.9 non comptés) + T7.8 (≈ 145 $ sous l'hypothèse d'un appel par fourmi et par pas, soit 10 000 appels par run, 10 runs, Haiku 4.5 [à confirmer]) | — | ≈ 210 | ≈ 273 |
| B2 | E7.1 grille centrale (58 cellules × 30) | 1 740 | ≈ 2 013 | ≈ 2 617 |
| B2' | E7.2 extension d'interaction (4 cellules × 70 runs additionnels) | 280 | ≈ 593 | ≈ 771 |
| B2t | Rehausses à 40 runs (H7.5 : 6 cellules Sonnet 5.5; H7.6 : 4 cellules) | 100 | ≈ 81 | ≈ 105 |
| B3 | E7.3 échelle de richesse (18 cellules nouvelles; dossier : ≈ 620 $ en réutilisant L2) | 540 | ≈ 617 | ≈ 802 |
| B4 | E7.7 diversité (4 mélanges de modèles ≈ 209 $, 4 personas ≈ 120 $; dossier : ≈ 330 $) | 240 | ≈ 330 | ≈ 429 |
| B5 | E7.4 LLM-RÈGLE (12 cellules × 40, Haiku 4.5 et Sonnet 5.5) | 480 | ≈ 134 | ≈ 174 |
| B6 | E7.5 information redondante (4 cellules × 40) | 160 | ≈ 82 | ≈ 107 |
| B7 | E7.6 découplage 2 × 2 (2 cellules) | 60 | ≈ 60 | ≈ 78 |
| B8 | E7.8 hybride (3 cellules, la moitié des appels) | 90 | ≈ 45 | ≈ 59 |
| B9 | E7.9 ordre de mise à jour (1 cellule; sans rabais de lot) | 30 | ≈ 30 | ≈ 39 |
| B10 | E7.10 contamination (1 cellule) | 30 | ≈ 30 | ≈ 39 |
| **Total (base)** | | ≈ 3 750 | **≈ 4 304** | **≈ 5 595** |
| En lot (−50 %) | Cumul du rabais de lot et du cache : **[à confirmer]** | | ≈ 2 152 | ≈ 2 798 |
| Options | E7.11 Fable 5.1 (3 cellules × 10 runs) ≈ 367 $ (dossier); Opus 5.5 pour E7.4 ≈ 593 $ [I] | | non comptées | |

Par modèle (cellules de grille et d'extension, hors pilote, ancrages et T7.8) : Haiku 4.5 ≈ 472 $, Sonnet 5.5 ≈ 1 766 $, Opus 5.5 ≈ 1 567 $, mélanges ≈ 209 $ (un tiers par modèle) [I]. Le **bloc Haiku 4.5** (≈ 472 $ de cellules, plus T7.8 et les ancrages) est collecté **en premier**. Le plan dépasse la base du dossier d'environ 930 $ (+ SOLO, CHS, S3-S, LLM-RÈGLE, T7.8, extension de H7.1, S5-R, E7.9, E7.10). Non budgété : le juge MAST (R81), les ancrages T7.7 et T7.9 et le décodeur de E7.12 (quelques dollars [I], à mesurer au pilote), le coût énergétique (non estimé).

**Règles de plafond.**
1. **Plafond par bras** (bras budgétaire = bloc × modèle) = coût planifié × 1,30 (imprévus du dossier). Un **interrupteur automatique** du runner arrête les appels au plafond, calculé depuis `usage` et la table de tarifs du manifeste; reprise après revue consignée.
2. **Plafond par run** commun aux bras à interaction (égalité de budget) : fixé au pilote au 95e centile de la consommation du bras le plus coûteux pour chaque (modèle, environnement) [P, à confirmer]; taux de troncature rapporté. SOLO reçoit le nombre k de tirages qui égale ce plafond. IND n'est pas égalisé (référence nulle); le coût plus faible est rapporté par G_$.
3. **Pilote à 1 % d'abord.** Si le coût mesuré d'un bloc dépasse de plus de 30 % le coût planifié, on s'arrête et on replanifie (ordre de coupe en 11.4).

### 9.8 Docking, sorties et tests

- **Docking** : T7.15 à T7.20 avant tout usage de COL; le modèle commun est *aligné par docking*, non « validé » (x-methodes, §7 point 2).
- **Sorties** : journal JSONL; manifeste de run (versions, SHA du dépôt et des scénarios, graines, identifiants, tarifs) et **manifeste de campagne** (fenêtre d'exécution, ordre randomisé des cellules, condensats des fichiers; spécification de simulation); séries CSV (une ligne par tour); tableaux cellule × contraste avec IC et marges; pour les agents à règle, manifeste + graine suffisent au rejeu complet sur le même moteur (audit simulation-technique, M12).
- **Tests** (`tsc --noEmit` puis `node --test`) : identité 1 − β (T7.10); absence d'interblocage par projection (T7.13); traces dorées valides pour un couple (moteur, version de Node); tests d'acceptation statistique; rejeu à 100 % du journal; interrupteur de budget; traitement des refus et des échecs d'analyse; recherche interdisant `Math.random` et `Date.now`.

---

## 10. Livrables et critères d'achèvement

| # | Livrable | Contenu | Critère d'achèvement vérifiable |
|---|---|---|---|
| L1 | Fiches de reproduction T7.1 à T7.20 | Équations, paramètres, unités, protocole, figure cible numérisée, critère chiffré, marge, répétitions, règle de décision, porte, registre des déviations ([../docs/04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)) | 20 fiches déposées et horodatées **avant** le premier commit de code du harnais concerné (`git log`) |
| L2 | Code du harnais P7 | Adaptateur LLM, cassette, journal, lots synchronisés, interrupteur de budget, adaptateurs MCP et A2A, environnements, agents à règle, annotation MAST, analyses | `tsc --noEmit` sans erreur; `node --test` vert; zéro occurrence de `Math.random` et `Date.now` dans la logique de simulation |
| L3 | Tests | Traces dorées; docking T7.15 à T7.20; identités T7.10 et T7.13; rejeu; interrupteur de budget; traitement des refus et des échecs d'analyse; contrôle de manipulation | Docking vert (porte de docking); 0 violation de 1 − β sur tous les runs de vote; rejeu à 100 % des appels journalisés; indicateurs C par cellule conformes à la typologie, validés sur un cas d'école par régime avant publication (test porté par S0) [x-choregraphie, §10 question 5] |
| L4 | **Préenregistrement** (Registered Report, étape 1) | H7.1 à H7.11; SHA du dépôt et des scénarios; invites hachées; politique de graines; marges et n; scripts d'analyse; règles d'exclusion (un refus de classifieur est une attrition préenregistrée); pilote (variance, coût); plan séquentiel. Modèle « Registered Report Protocol » [OSF 2026]; format décrit par [Chambers 2013] [Chambers et Tzavella 2022] | Enregistrement horodaté (identifiant OSF) **avant** la première exécution confirmatoire; registre des déviations versionné [Lakens 2024]. Revues offrant le format : *Royal Society Open Science* et *PLOS ONE* [S, dossier x-methodes, M8]; non trouvé pour les autres revues cibles |
| L5 | Données et logiciel | Journaux JSONL compressés, manifeste, séries CSV, scripts. Licences : code MIT ou Apache-2.0, données CC BY 4.0 [choosealicense et CC 2026]; `CITATION.cff` [CFF 2026]; archivage par version [GitHub et Zenodo 2026]; SWHID du répertoire [SWH 2026]; principes FAIR4RS [FAIR4RS 2022] | DOI résolu; empreintes des archives publiées; **webhook Zenodo vérifié avant la première *release*** (un dépôt antérieur du chercheur l'avait manquant); 100 % des appels portent `responseModel`; 0 appel de repli |
| L6 | Note de recherche (étape 2) | ADEMP [Morris et al. 2019] [Siepe et al. 2024]; ODD résumé (complet en annexe); résultat de chaque H7.k (verdict, IC, marge); écarts au préenregistrement; limites : portée des conclusions, rejouable mais pas ré-exécutable | Chaque H7.1 à H7.11 a un verdict publié (confirmée, réfutée, indéterminée); tout écart du registre est expliqué; relecture par un tiers |
| L7 | Page(s) interactive(s) | Section 8 | WCAG 2.2 AA (vérification automatique **et** manuelle : l'automatisation seule ne couvre qu'une partie des problèmes [Deque 2021], étude de fournisseur); clavier, `prefers-reduced-motion`, mobile; statut épistémique et mention confirmatoire ou exploratoire sur chaque graphe; aucune requête réseau vers l'API |
| L8 | Évaluation des pages | Pré-test, post-test, condition témoin statique; objectifs O1 à O6 ([../docs/07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)) | Si des participants humains : approbation d'un comité d'éthique de la recherche **avant** le recrutement [CRSH et al. 2018]; résultats rapportés avec IC |
| L9 | Registres | Déviations; risques R71 à R90 | À jour à chaque porte; aucun risque ouvert sans parade |

**P7 est achevé quand** : (a) les portes d'outils, de docking et d'ancrage sont franchies, ou leur échec est documenté et le plan B appliqué; (b) H7.1 à H7.10 ont chacune un verdict avec IC; (c) la dépense reste sous les plafonds de 9.7; (d) le journal est complet et rejoué à 100 %; (e) les dépôts à DOI sont en ligne; (f) les pages sont évaluées ou leur évaluation est reportée avec son motif.

---

## 11. Risques et réserves

### 11.1 Registre

| R | Risque | Source ou réserve | Parade et plan B |
|---|---|---|---|
| **R71** | Retrait de Haiku 4.5 avant la collecte; phase 3 du cadre | Retrait provisoire « pas avant 2026-10-15 » [Anthropic 2026a]; cadre, §2.4 point 16 | Bloc Haiku collecté en premier (voir 11.5); sinon le point historique est perdu et déclaré; plan B : ancre à poids ouverts figé [audit methodologie, P7-e] |
| **R72** | Dérive des modèles derrière un identifiant | Identifiants figés selon la documentation, non vérifié de façon indépendante; dérive documentée [Chen et al. 2024b] | Cellule sentinelle, entrelacement, fenêtre courte |
| **R73** | Non-déterminisme | Aucun `seed`; [Atil et al. 2024] | K répétitions, cassette; jamais de température comme levier |
| **R74** | Refus de classifieur : attrition différentielle entre modèles | `stop_reason: "refusal"` sur Opus 5.5, Sonnet 5.5, Fable 5.1 [audit methodologie, C12] | Issue codée; registre des refus; analyse principale sans refus, sensibilité avec refus = échec; seuil de non-comparabilité fixé au pilote |
| **R75** | Replis côté serveur qui changent de modèle | Recommandés par défaut sur les modèles 5.5 [dossier P7, C10] | Désactivés; test de non-régression |
| **R76** | Coûts sous-estimés | Jetons de raisonnement d'Opus 5.5 (hypothèse de 300); succès de cache au mieux; cumul lot et cache [à confirmer]; lecture de cache de Haiku 4.5 [à confirmer] | Pilote à 1 %, plafonds, ordre de coupe (11.4) |
| **R77** | Difficulté mal calibrée (plafond ou plancher) | Gain maximal à difficulté intermédiaire [Li et al. 2024] | Calibrage au pilote : SOLO à 40–80 % |
| **R78** | Contamination : les modèles connaissent le pont double et la danse | audit methodologie, P7-d | Habillage neutre, sonde, E7.10 |
| **R79** | Sensibilité à l'invite avec trois paraphrases | [Sclar et al. 2024] | Invites figées; pilote distinct; plus de paraphrases si la variance est forte (coût environ ×3) |
| **R80** | Interactions sous-puissantes (H7.1, H7.5, H7.6) | [Gelman 2018]; [Card et al. 2020] | n = 40 ou ≈ 100; plan séquentiel; verdict « indéterminé » admis |
| **R81** | Annotation MAST : juge LLM, accord, coût non budgété | T7.11; [Cemri et al. 2025] | Détection déterministe des modes observables dans le journal, juge seulement pour le reste; annoter les runs en échec plus un échantillon de succès; plan B : restreindre H7.3 aux modes déterministes |
| **R82** | Docking fragile | S3-abeille en reconstruction [I]; k = 20 de [Deneubourg et al. 1990], unité de ρ de [Dussutour et al. 2009] ([non vérifiée]), lecture de r de [Sumpter et Pratt 2009], paramètres de [Bonabeau et al. 1996] ([non vérifiée]), [Pratt et al. 2005] ([non vérifiée]), texte principal de [Seeley et al. 2012] et matériel supplémentaire de [Marshall et al. 2009] non lus : tous [à confirmer] | Lire les sources avant le préenregistrement; échec d'un docking = retrait de l'environnement ou de la comparaison à COL, asymétrie fourmi/abeille déclarée |
| **R83** | Cohérence avec les fiches parallèles | Scénarios S1, S3, S5 définis ici (Hypothèse de l'auteur); T8.12, T8.13 et E8.5 de P8, hébergées par P7 mais non budgétées; numérotation R possiblement concurrente | Revue croisée avant le préenregistrement; le plan de recherche consolide |
| **R84** | Protocoles : versions et lecture | A2A 1.0.0 contre v1.0.1; absence de pub/sub dans A2A établie par lecture outillée; date d'entrée d'A2A dans l'AAIF à confirmer; MCP en révision récente [A2A 2026a] [A2A 2026b] [MCP 2026] | Revérifier avant exécution; plan B : implémentation en processus avec le même schéma de messages, déclarée |
| **R85** | Conditions d'utilisation de l'API sur la republication des réponses | Non lues (x-methodes, §8 question 10) | Lecture avant tout dépôt; plan B : publier les dérivés (scores, hachages) et garder la cassette privée |
| **R86** | Fable 5.1 : rétention de 30 jours obligatoire | Incompatible avec une organisation à rétention nulle [dossier P7, §12 point 8] | Option descriptive seulement |
| **R87** | Validité externe : N = 10, une seule famille de modèles, langue des invites, tâches simplifiées | [Kim et al. 2025]; audit choregraphie-agentique, §6 | Portée des conclusions bornée; N biologique pour les règles; ancre à poids ouverts (option) |
| **R88** | Ancrages non reproductibles à l'identique | Modèles d'origine indisponibles; version publiée d'[Ashery et al. 2025] non lue (page éditeur : 403, lecture sur arXiv v2); extraction de [Jimenez-Romero et al. 2025] non recoupée; absence de vote final chez [Du et al. 2024] [à confirmer] | Alignement relationnel; porte d'ancrage à 4 sur 6; registre des déviations |
| **R89** | Contenus non lus ou valeurs [à confirmer] de P7 | Définition du bénéfice collectif B de [Bahrami et al. 2010] (non lue); totaux MAST par catégorie calculés [I]; extraction d'un seul outil pour certains chiffres | Lire avant d'utiliser; conserver les marques |
| **R90** | Perte de ré-exécutabilité | Retraits annoncés, aucune graine API | Cassette, DOI, archivage Software Heritage; dire « rejouable, pas ré-exécutable » |

### 11.2 Issues d'un run et modes d'échec

**Issues codées** (aucune donnée manquante silencieuse) :

| Code | Définition | Traitement |
|---|---|---|
| `OK` | Run terminé, score calculé | — |
| `ECHEC_TACHE` | Run terminé, score sous le seuil d'échec fixé au pilote [P, à confirmer] | Annotation MAST |
| `REFUS` | `stop_reason: "refusal"` | Attrition préenregistrée : analyse principale sans les runs refusés, sensibilité avec refus = échec; registre des refus (cellule, run, tour, agent, `responseModel`, `stopReason`, horodatage); **pas de repli** |
| `TRONQUE` | `stop_reason: "max_tokens"` | Compté; indique un calibrage à revoir |
| `ANALYSE` | Sortie non analysable | Action nulle, comptée |
| `BUDGET` | Plafond atteint | Run arrêté, censuré |
| `API` | Erreur ou délai | Relance avec le même `request_hash`, nombre de relances préenregistré [P, à confirmer]; au-delà, valeur manquante déclarée |
| `NON_TERMINAISON` | T atteint sans décision (S5) | Mode FM-1.5 |
| `SCISSION`, `INTERBLOCAGE` | S5 : deux sites engagés au-delà du quorum; absence de décision. L'interblocage n'est pas une scission (cadre, §2.4 point 8) | Codés séparément |
| `VERROUILLAGE` | S1 : aucune bascule avant T après l'inversion | Entre dans t½ censuré |

**Modes d'échec des systèmes multi-agents** : taxonomie MAST à 14 modes [Cemri et al. 2025]. Les modes les plus fréquents au corpus publié sont FM-1.3 (15,7 %), FM-2.6 (13,2 %) et FM-1.5 (12,4 %) [dossier P7, §4 M12]. **Détection déterministe dans le journal** (proposition à valider par T7.11 [I]) : FM-1.3 répétition d'étapes (même action ou même message au moins k fois de suite); FM-1.5 conditions d'arrêt ignorées (poursuite après la décision, ou T atteint sans décision); FM-3.1 arrêt prématuré (décision avant observation ou avant le quorum). Les autres modes passent par le juge LLM figé, validé à κ ≥ 0,70.

### 11.3 Éthique et sécurité

- **Aucune expérimentation animale** : simulation pure. Aucune donnée personnelle : scénarios synthétiques.
- **Participants humains** : seulement pour l'évaluation des pages (V0); comité d'éthique de la recherche requis [CRSH et al. 2018]. P7 n'en implique pas.
- **Sécurité** : P7 ne teste aucune injection (volet P6) et ne publie aucune charge réutilisable; un refus de classifieur est une donnée, jamais un obstacle à contourner.
- **Données** : conditions d'utilisation lues avant le dépôt des journaux (R85); Fable 5.1 hors plan principal (R86); la politique des trois organismes sur la gestion des données s'applique selon le financement [Tri-Agence 2025]; science ouverte et éthique : [../docs/08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md).
- **Coût et empreinte** : dollars et nombre d'appels (≈ 1,1 million [I]) rapportés; énergie non estimée [à confirmer : aucune source dans les dossiers].
- **Vulgarisation** : pas d'anthropomorphisme ni de téléologie; encart « limites de l'analogie » sur chaque page (cadre, §8).

### 11.4 Plan B et ordre de coupe

1. **Budget** (coupes dans cet ordre, la famille primaire étant protégée) : option Fable 5.1 (non comptée) → E7.9 et E7.10 → E7.8 → Opus 5.5 dans E7.1 (d'abord S5-D, puis S1; H7.1 devient Sonnet 5.5 contre Haiku 4.5, contraste plus étroit) → E7.2 plafonné → E7.3 sans L3 (le plateau de H7.8 est perdu).
2. **Haiku 4.5 perdu** : déclaré; H7.1 devient Sonnet 5.5 contre Opus 5.5 (contraste plus étroit); ancre à poids ouverts en option.
3. **Docking échoué** : retrait de l'environnement ou de COL concerné; H7.2 limité aux couples réussis; asymétrie fourmi/abeille signalée.
4. **Porte d'ancrage échouée** : P7 passe en mode exploratoire (aucun verdict confirmatoire) et le plan est revu avec la fiche P8.
5. **Puissance insuffisante** : plan séquentiel jusqu'au plafond, puis « indéterminé ».
6. **Protocoles** : implémentation en processus avec le même schéma de messages, déclarée.
7. **Lots trop lents** : API standard avec limiteur de concurrence (perte du rabais de 50 %, coupes du point 1).
8. **MAST** : modes déterministes seuls.

### 11.5 Tensions avec le cadre et décisions à prendre

- **Phasage et Haiku 4.5.** Le cadre place P7 en phase 3, après les résultats reproduits de P1, P3, P5, P8; il demande aussi de collecter Haiku 4.5 en premier (retrait possible dès le 2026-10-15). Un Registered Report exige le préenregistrement **avant** la collecte confirmatoire. Proposition : préenregistrer tôt un **bloc Haiku** (cellules Haiku, protocole, règles d'exclusion), ou classer ces données comme exploratoires. À trancher par le chercheur avant la date de retrait.
- **Budget.** Le plan recompté (≈ 4 304 $) dépasse la base du dossier (≈ 3 370 $) : décision d'enveloppe, ordre de coupe en 11.4.
- **Gain G.** Le cadre (§4) donne le rapport (P_ref étant préenregistré, P_max non défini); P7 rapporte la différence appariée et définit P_max (3.1). Le plan de recherche doit l'adopter.
- **Cibles et expérience de P8.** T8.12, T8.13 et E8.5 sont hébergées par P7 mais hors cellules et hors budget : voir R83.

---

## 12. Effort et dépendances

**Prérequis.**
- **S0** : typologie, glossaire, métriques R et G, noyau, harnais. **V0** : gabarit avant P1.
- **Résultats reproduits** de P1, P8, P5 (phase 1) et P3 (phase 2) : leurs modèles de colonie (4.2) fournissent COL; T8.10 (vote selon la difficulté, sans API) de P8 précède T7.6. P9 : facultatif (E7.8). **Non comptés** dans l'effort ci-dessous : l'exécution de E8.5 et de T8.12 et T8.13 pour P8.
- Accès à l'API et palier de limites de débit [Anthropic 2026c]; enveloppe budgétaire approuvée; compte OSF; dépôt public et webhook Zenodo vérifié.
- **Lectures préalables** : sources non lues de R82 et conditions d'utilisation (R85).

**Effort** [estimation, à confirmer], en semaines-personne :

| # | Tâche | Dépend de | Effort |
|---|---|---|---|
| 1 | Extension du harnais S0 : adaptateur LLM, journal, cassette, lots synchronisés, interrupteur, adaptateurs MCP et A2A | S0 | 5 |
| 2 | Environnements S1, S3, S5; agents à règle; docking T7.15 à T7.20 | 1 (en partie); P1, P3, P5 reproduits | 5 |
| 3 | Ancrages et outils T7.1 à T7.14 | 1 | 5 |
| 4 | Pilote à 1 %, pilote de variance, calibrage de difficulté, invites figées | 2, 3 | 2 |
| 5 | Registered Report, étape 1; registre des déviations | 4 | 2 |
| 6 | Collecte (surveillance des lots; Haiku 4.5 en premier) | 5 | 2 (calendrier : 3 à 4 semaines, ordre de grandeur du dossier P7, §8.3 : « quelques semaines ») |
| 7 | Annotation MAST (T7.11, puis annotation) et analyses | 6 | 5 |
| 8 | Pages et évaluation (V0) | 6; V0 | 4 |
| 9 | Note de recherche, étape 2, dépôts | 7, 8 | 4 |
| | **Total** | | **≈ 34** |

**Ordre et chemin critique.** S0 → 1 → (2 ∥ 3) → 4 → 5 → 6 → 7 → 9, avec 8 en parallèle de 7. Inférence : la collecte Haiku 4.5 exige 1, 2, 4 et 5 (bloc Haiku seulement), soit une chaîne amont d'environ 14 semaines-personne [estimation, à confirmer]; elle ne tient pas avant le 2026-10-15 si le harnais de S0 n'est pas prêt, d'où la décision de 11.5.

**Publication.** AAMAS 2027 est hors de portée (résumé le 2026-10-01, article le 2026-10-08, fin du jour indiqué, UTC−12) [AAMAS 2027]; la piste « Blue Sky Ideas » (2026-11-12) pourrait accueillir la typologie du cadre (§2.2) sans résultat de simulation [dossier x-methodes, M13]. ALIFE 2027 (Prague, 19–23 juillet 2027) : échéances non publiées [ALIFE 2027]. *PLOS Computational Biology* exige le code public à la publication [PLOS CB 2021]. Format Registered Report : voir L4.

---

## 13. Références clés

Statut = celui de ../docs/11-bibliographie.md : **vérifiée** (source consultée, citation confirmée par un vérificateur indépendant), **corrigée** (citation corrigée après vérification; l'entrée donne la version corrigée), **non vérifiée** (ne pas citer une valeur issue de cette source sans [à confirmer]). Lecture = niveau de lecture dans le dossier d'origine ([T] texte intégral, [T*] page lue par outil, [R] résumé, [M] métadonnées, [S] source secondaire, [I] calcul), « — » quand le dossier citant ne l'indique pas. Suffixes des étiquettes ambiguës, selon la bibliographie : Anthropic 2026a (documentation en ligne) et 2026b (skill local), Choi et al. 2025a (débat contre vote) et 2025b (conformité), Wu et al. 2024b (monoculture générative).

**Ancrages et systèmes multi-agents LLM**

| Étiquette | Statut | Lecture et réserve |
|---|---|---|
| Ashery et al. 2025 | corrigée | [T] arXiv v2; page de l'éditeur non lue |
| Du et al. 2024 | corrigée | [T]; absence de vote final [à confirmer] |
| Choi et al. 2025a | vérifiée | [T] |
| Choi et al. 2025b | vérifiée | — (dossier p1-recrutement) |
| Li et al. 2024 | vérifiée | [T] |
| Chen et al. 2024a | corrigée | [R] |
| Zhang et al. 2025 | vérifiée | [R] |
| Rahman et al. 2025 | corrigée | [T] |
| Jimenez-Romero et al. 2025 | vérifiée | [T via outil], non recoupée [à confirmer]; absent du dossier P7 |
| Kim et al. 2025 | corrigée | [T]; correspond à Kim et al. 2025b de la bibliographie (même œuvre) |
| Kim et al. 2025a | vérifiée | [T] (dossier p8-individu-colonie) |
| Chen 2026 | vérifiée | [R] |
| Kim 2026 | vérifiée | [R] |
| Kleinberg et Raghavan 2021 | vérifiée | [R] |
| Wu et al. 2024b | vérifiée | [R] |
| Kohli 2026 | vérifiée | [R] |
| Cemri et al. 2025 | corrigée | [T]; totaux par catégorie calculés [I] |
| Park et al. 2023 | vérifiée | [T]; non reproduit |
| Riedl 2026 | vérifiée | [T] |
| Bahrami et al. 2010 | vérifiée | [R]; définition du bénéfice collectif non lue |
| Wang et al. 2023 | vérifiée | [R] |
| Han et Zhang 2025 | corrigée | [R] |
| Han et al. 2026 | vérifiée | — (dossier p1-recrutement) |
| Salemi et al. 2025 | vérifiée | [R] |
| Mao et Mirhoseini 2026 | corrigée | [R] |
| Pal et al. 2026 | vérifiée | [R]; prépublication non évaluée par les pairs |
| Hadfield et al. 2025 | corrigée | [T] par lecture outillée; évaluation interne non reproductible |
| Lee et Tiwari 2024 | vérifiée | [R] |
| Gopinathan et al. 2026 | corrigée | [R]; résumé d'une présentation, implémentation préliminaire |

**Mesure, statistique, méthode de simulation**

| Étiquette | Statut | Lecture et réserve |
|---|---|---|
| Miller 2024 | corrigée | [T]; deux écarts relevés par x-methodes, sans effet sur les formules |
| Yao et al. 2024 | vérifiée | [T] |
| Atil et al. 2024 | vérifiée | [R] |
| Chen et al. 2024b | vérifiée | [R] |
| Kapoor et al. 2025 | corrigée | [R] |
| Sclar et al. 2024 | vérifiée | [R] |
| Bowyer et al. 2025 | vérifiée | [R] |
| Card et al. 2020 | vérifiée | [R] |
| Judd et al. 2012 | vérifiée | [R] |
| Barr et al. 2013 | vérifiée | [R] |
| Bates et al. 2015 | vérifiée | [R] |
| Holm 1979 | vérifiée | [R] |
| Benjamini et Hochberg 1995 | vérifiée | [M] |
| Gelman 2018 | vérifiée | [S]; calcul refait [I] |
| Morris et al. 2019 | vérifiée | [T*] (extraction non recoupée au PDF; numérotation du tableau [à confirmer]) |
| Siepe et al. 2024 | vérifiée | [T*] |
| Lakens 2024 | vérifiée | [R]; chapitre 13 non recoupé |
| Willroth et Atherton 2024 | vérifiée | [R] |
| Grimm et al. 2006 | vérifiée | [T] |
| Grimm et al. 2020 | corrigée | [T*] |
| Caron-Lormier et al. 2008 | corrigée | [R] |
| Huberman et Glance 1993 | vérifiée | [R] |
| Gillespie 2007 | vérifiée | [T]; articles de 1976 et 1977 non lus |
| Blackman et Vigna 2021 | vérifiée | [T] |
| Dorigo et al. 1996 | vérifiée | [T] (audit methodologie) |
| Chi et al. 2012 | vérifiée | — (dossier x-vulgarisation) |

**Chorégraphie, stigmergie, protocoles, plateforme**

| Étiquette | Statut | Lecture et réserve |
|---|---|---|
| OMG 2013 | corrigée | [T] |
| Carbone et Montesi 2013 | vérifiée | [R] |
| Honda et al. 2008 | corrigée | [R] |
| Heylighen 2016a | vérifiée | [T] |
| Heylighen 2016b | corrigée | [T] |
| Feinerman et Korman 2017 | vérifiée | [T] |
| Garcia-Molina et Salem 1987 | corrigée | [T]; borne de j illisible [à confirmer] |
| List et al. 2009 | corrigée | — (dossiers p5-quorum et p8-individu-colonie) |
| MCP 2026 | vérifiée | [T] |
| A2A 2026a | vérifiée | [T] par lecture outillée; année déduite des versions |
| A2A 2026b | vérifiée | [T]; année déduite de l'ordre des versions |
| Anthropic 2026a | vérifiée | [T*] |
| Anthropic 2026b | vérifiée | [T]; document local contrôlé contre lui-même, non contre la documentation en ligne |
| Anthropic 2026c | vérifiée | — (dossier p4-regulation) |

**Modèles de colonie et biologie**

| Étiquette | Statut | Lecture et réserve |
|---|---|---|
| Goss et al. 1989 | vérifiée | [T] |
| Deneubourg et al. 1990 | vérifiée | [M]; valeur de k [à confirmer] |
| Dussutour et al. 2009 | non vérifiée | [T via outil]; unité de ρ [à confirmer] |
| Grüter et al. 2012 | vérifiée | [T via outil] |
| Seeley et al. 1991 | corrigée | [T] |
| Camazine et Sneyd 1991 | corrigée | — (annexe de Seeley et al. 1991 y renvoie) |
| Bonabeau et al. 1996 | non vérifiée | métadonnées seulement; valeurs [à confirmer] |
| Theraulaz et al. 1998 | vérifiée | [T] |
| Wilson 1984 | vérifiée | [R] |
| Jones et al. 2004 | vérifiée | [R] |
| Graham et al. 2006 | vérifiée | [R]; équations non lues [à confirmer] |
| Beshers et al. 2001 | vérifiée | [R]; équations non lues |
| Lynch et al. 2024 | corrigée | [R]; prépublication |
| Garrison et al. 2018 | vérifiée | [T] |
| Ulrich et al. 2021 | vérifiée | [T] |
| Sumpter et Pratt 2009 | vérifiée | [T]; lecture du paramètre r [à confirmer] |
| Franks et al. 2003 | corrigée | [R] |
| Pratt et al. 2005 | non vérifiée | contenu non lu |
| Seeley et al. 2012 | vérifiée | [T] (matériel supplémentaire); texte principal non lu |
| Pais et al. 2013 | corrigée | [T] |
| Marshall et al. 2009 | corrigée | [T] (version anticipée); matériel supplémentaire non lu |
| Sherman et Visscher 2002 | vérifiée | [R] |
| Donaldson-Matasci et Dornhaus 2012 | vérifiée | [R] |
| Beekman et Lew 2008 | vérifiée | [R] |

**Science ouverte, éthique, publication**

| Étiquette | Statut | Lecture et réserve |
|---|---|---|
| OSF 2026 | vérifiée | [T*] |
| Chambers 2013 | vérifiée | [M] |
| Chambers et Tzavella 2022 | vérifiée | [R] |
| FAIR4RS 2022 | vérifiée | [T] |
| CFF 2026 | vérifiée | [T*] |
| GitHub et Zenodo 2026 | vérifiée | [T*]; exigence de dépôt public dans la documentation GitHub |
| SWH 2026 | vérifiée | [T*] |
| choosealicense et CC 2026 | vérifiée | [T*] |
| Tri-Agence 2025 | vérifiée | [T*] |
| CRSH et al. 2018 | vérifiée | — |
| Deque 2021 | vérifiée | — (étude de fournisseur) |
| AAMAS 2027 | vérifiée | [T*] |
| ALIFE 2027 | vérifiée | [T*] |
| PLOS CB 2021 | vérifiée | [T*] |


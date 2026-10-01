# P6 — Défaillances et défenses

**Statut :** fiche de projet, régime *production* (modèles, cibles chiffrées, préenregistrement); les pages interactives relèvent du régime *exploratoire*. **Date :** 2026-10-01. **Phase :** 2. Le [cadre](../docs/00-cadre.md) prime sur cette fiche.
**Sources :** dossier [p6-pathologies](../recherche/dossiers/p6-pathologies.md) (équations, paramètres, cibles, réserves), avec [x-choregraphie](../recherche/dossiers/x-choregraphie.md), [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md), [p5-quorum](../recherche/dossiers/p5-quorum.md) et [p9-mouvement-collectif](../recherche/dossiers/p9-mouvement-collectif.md) pour les recoupements; audits [choregraphie-agentique](../docs/annexes/audit/choregraphie-agentique.md), [bio-fourmis](../docs/annexes/audit/bio-fourmis.md) et [bio-abeilles](../docs/annexes/audit/bio-abeilles.md).

**Marques.** [T] texte intégral lu; [R] résumé lu; [M] métadonnées seulement; [S] source secondaire; [I] inférence ou calcul non publié (statuts du dossier). [non vérifiée] : référence dont le contenu n'a pas été relu par la vérification. [à confirmer] : valeur non confirmée dans la source. **†** : seuil, tolérance ou borne choisi par cette fiche, non publié; il vaut [à confirmer] jusqu'au pilote de calibration (voir le [protocole de reproduction](../docs/04-protocole-reproduction.md)). **‡** : référence absente de la [bibliographie](../docs/11-bibliographie.md), donc non citée par étiquette; statut d'après l'audit; à ajouter avant tout usage (R12). Les niveaux des facteurs sont des choix de plan, fixés au pilote et préenregistrés, pas des valeurs publiées. Statuts épistémiques d'un énoncé : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.

## 1. Objet et questions de recherche

P6 étudie ce que la coordination sans contrôle central produit de défaillant, et ce qui la protège. Fourmilière et ruche sont traitées au même titre, par taxon nommé; le volet agentique transpose chaque pathologie et inclut un **témoin orchestré**.

| QR du cadre | Part de P6 |
|---|---|
| **QR2 (échecs)**, centrale | Pathologies dynamiques (piégeage, verrouillage, interblocage, scission), pathologies d'identité et de canal (mimétisme, faux signal, propagation), défenses. Livre la taxonomie propre des échecs de colonies, en regard de MAST. |
| QR3 (contrôle) | L'orchestrateur est-il un remède ou une surface d'attaque, selon la structure de tâche (décomposable ou séquentielle)? Témoin orchestré dans chaque volet agentique (H6.10). |
| QR0 (richesse du signal) | La **persistance** du médium (composante τ du vecteur R) comme variable de vulnérabilité (H6.7, H6.9). |
| QR4 (diversité) | Vérificateurs hétérogènes contre vérificateurs corrélés (H6.6). |
| QR1 | Non servie. |

**Sous-questions de QR2.**
- **QR2a (dynamique).** Quelles conditions produisent piégeage, verrouillage, interblocage ou scission, et quels remèdes biologiques (évaporation, bruit, attrition, inhibition croisée) se transposent aux agents?
- **QR2b (adversarial).** Un faux signal ou un usurpateur se propage-t-il plus loin dans un médium persistant que dans un canal éphémère, et quelles défenses décentralisées tiennent, à quel coût en gain collectif G?
- **QR2c (contrôle).** Un orchestrateur répare-t-il ces pathologies, et devient-il un point unique de compromission?
- **QR2d (taxonomie).** Les modes MAST se mettent-ils en correspondance avec les pathologies de colonies, mode par mode, sur des traces propres?

**Rôle dans le programme.** Projet de phase 2. Il fournit à P7 des issues d'échec codées (scission, interblocage, refus) et une condition de perturbation « agents compromis »; il n'est pas un prérequis de P7 (le cadre fait dépendre P7 de P1, P3, P5, P8). Il prolonge, par méthode, les bancs de réfutation EscapeBench et LeakLab du chercheur (voir « Volet sécurité » dans le parallèle agentique).

**Répartition avec les projets voisins.**

| Objet | Propriétaire | Ce que fait P6 |
|---|---|---|
| Moulin : Couzin et Franks 2003 (fourmi), Erhard et al. 2022; Couzin et al. 2002 en contrepoint | **P9** | Conserve T6.1 à T6.5 (numérotation du dossier) pour la traçabilité; n'en porte ni l'exécution ni l'effort. Réutilise le modèle accepté dans E6.1 (expériences d'analogie avec les boucles d'agents). |
| Quorum, inhibition croisée (Seeley et al. 2012; Pais et al. 2013) | **P5** (cibles A4, A5 du dossier p5) | Un seul module M7 (B1). P6 porte T6.8 à T6.10 pour l'interblocage et la scission comme **pathologies**; la consolidation ([plan de recherche](../docs/03-plan-de-recherche.md)) ne compte qu'un test pour T6.8, identique à A4 de P5. |
| Verrouillage comme effet du canal (fonction de choix, piste contre danse) | **P1** | P6 porte le verrouillage comme **pathologie** (hystérésis de Beekman et al. 2001, sortie par bruit ou attrition). Recoupement possible sur Dussutour et al. 2009 (T6.7) : un seul module, une seule exécution, propriétaire à fixer en consolidation. |
| Grille LLM architecture × modèle × scénario, échelle de richesse | **P7** | Réutilise son harnais et ses règles de paramétrage; ne refait pas la grille. |

**Ce que P6 ne fait pas.** Il ne reproduit pas le moulin (P9). Il ne **valide** aucun modèle contre des données empiriques : il les **réplique** (cadre, principe 1). Il ne produit aucun code ou contenu d'attaque opérationnel (politique défensive, plus bas). Il ne rejoue pas avec de vrais agents les expériences LLM publiées de T6.12 et T6.13 (relève de P7).

## 2. Positionnement

| Thème | Existant publié (statut) | Reproduit par P6 | Apport de P6 |
|---|---|---|---|
| **Moulin et boucles** | Observation : Schneirla 1944 [T] (cas de terrain d'*Eciton praedator*, quelques centaines d'ouvrières, anneau de 10 à 15 cm, plus de 24 h, mort probable par dessiccation); Beebe 1921 [non vérifiée] (boucle d'émigration de 1200 pieds [à confirmer]). Modèles : Couzin et Franks 2003 [T], Erhard et al. 2022 [T, préimpression v2], Malíčková et al. 2015 [T] et Das 2017 [R] (préimpressions). Contrepoint : Couzin et al. 2002 [T] (poissons, 3D, sans phéromone). Commentaire : Delsuc 2003 [T]. Agents : MAST FM-1.3, FM-1.5 (Cemri et al. 2025); compteur de blocage (Fourney et al. 2024) | T6.1 à T6.5, **exécutés par P9** | E6.1 : boucle d'agents avec oubli, bruit, condition d'arrêt et témoin orchestré; correspondance avec FM-1.3 et FM-1.5 (*Analogie*) |
| **Verrouillage et cascades** | Beekman et al. 2001 [R; non vérifiée] (*Monomorium pharaonis* : transition avec hystérésis selon la taille de colonie); Sasaki et al. 2013 [R]; Dussutour et al. 2009 [R; non vérifiée] (*Pheidole megacephala* : le bruit débloque); Grüter et al. 2012 [R] (encombrement, *Lasius niger*); Seeley 2003 [non vérifiée] (attrition des danses, nid); Bikhchandani et al. 1992 [M], Giraldeau et al. 2002 [R]; Wynn et al. 2025 [R] | T6.6, T6.7, T6.14 | E6.2 : mécanismes de sortie comparés (fourmi : bruit, encombrement; abeille : attrition), hystérésis; E6.3 : cascade en séquence visible |
| **Interblocage et scission** | Seeley et al. 2012 [R]; Pais et al. 2013 [T; Texte S1 non lu]; Lindauer 1955 [non vérifiée]; Seeley et Buhrman 1999 [non vérifiée]; Seeley et Visscher 2003 (scission en vol quand le quorum précède le consensus; lu par l'audit bio-abeilles, non relu ici); Zakir et al. 2022 [non vérifiée] | T6.8, T6.9; T6.10 en **extension** | Carte des régimes (σ, q, v) qui sépare interblocage adaptatif et pathologique; niveau d'interblocage comme frontière de la scission; remèdes côté agents (E6.4, E6.5) |
| **Parasites et mimétisme** | Akino et al. 1999 [R], Barbero et al. 2009 [R], Nash et al. 2008 [R] (*Maculinea*/*Myrmica*); Johnson et al. 2011 [R] (reconnaissance collective); Moritz et al. 1991 [M] (camouflage chimique d'*Acherontia atropos*; contenu non lu); Cappa et al. 2019 [S] (classement parmi les mimétismes d'hydrocarbures cuticulaires; attribution à Moritz [à confirmer]); Neumann et Moritz 2002 [non vérifiée], Neumann et al. 2011 [R], Neumann et Pirk 2019 [R], Oldroyd 2002 [M] (*A. m. capensis*); Peck et Seeley 2019 [R] (pillage); Couvillon et al. 2008 [M] (garde) | Rien (aucun résultat chiffré lu) | E6.6 : modèle simplifié de reconnaissance collective et volet agentique (vérificateurs indépendants contre corrélés; identités synthétiques) |
| **Propagande et faux signal** | Aswale et al. 2022 [T]; substances de propagande de *Leptothorax kutteri* : Allies et al. 1986‡ (résumé lu par l'audit bio-fourmis) | T6.11 | E6.8 : persistance du faux signal, fraction critique, canal éphémère en comparaison |
| **Sécurité des systèmes d'agents** | Greshake et al. 2023 [R] (injection indirecte); Cohen et al. 2024 [R] (Morris II); Lee et Tiwari 2024 [T partiel]; Gu et al. 2024 [T partiel]; Triedman et al. 2025 [R]; Hammond et al. 2025 [R] | T6.12, T6.13 (modèles abstraits) | E6.7 : persistance × topologie × défense × position de la source, avec témoin orchestré; protocole défensif sans charge utile |
| **Défenses collectives** | [Stroeymeyt et al. 2018] [M] (la plasticité du réseau social réduit la transmission de maladie chez *Lasius niger*; titre seul); phéromone de prudence (Aswale et al. 2022); Neumann et Pirk 2019 [R] (rejet amélioré après expositions répétées) | T6.11 (défense) | H6.8 : modularité comme pare-feu et son coût en G; H6.6 |
| **Taxonomies d'échec** | Cemri et al. 2025 [T partiel] (MAST : 14 modes, 3 catégories, 1642 traces, κ = 0,88); Hammond et al. 2025 [R] (mauvaise coordination, conflit, collusion) | — | Taxonomie P6 en trois couches (dynamique, identité, canal); correspondance MAST mode par mode sur nos traces (E6.9) |
| **Orchestration comme témoin** | Fourney et al. 2024 [T partiel]; Hadfield et al. 2025 [T]; Kim et al. 2025a [T] (architecture × structure de tâche); Triedman et al. 2025 [R] | — | H6.10 : l'orchestrateur répare les boucles et devient un point unique de compromission |

**Corrections de la v3 appliquées sans les rediscuter** (cadre, corrections factuelles; dossier §2).

| Énoncé de la v3 | Traitement dans P6 |
|---|---|
| Moulin = « phase tore de Couzin et al. 2002 » | Le modèle fourmi est Couzin et Franks 2003; Couzin et al. 2002 est un contrepoint (poissons et oiseaux, sans phéromone). Schneirla 1944 décrit un cas de terrain modeste; la boucle géante est Beebe 1921 [non vérifiée]; Delsuc 2003 est un commentaire, pas une source primaire. Le moulin n'est pas propre à la piste chimique : Schneirla le compare au moulin de poissons de Parr 1927 [non vérifiée]. |
| « Interblocage quand on supprime l'inhibition croisée »; « essaim scindé sans signaux d'arrêt » | Interblocage (aucune décision) et scission (deux décisions) sont deux régimes distincts. Avec σ = 0 l'interblocage est garanti par la structure des équations : c'est un **test d'implantation**; le résultat à reproduire est la courbe `σ*(v)`. L'interblocage n'est pas toujours une pathologie : adaptatif pour des options égales et médiocres (Pais et al. 2013). |
| « Veto » pour le signal d'arrêt | Inhibition probabiliste, ciblée et graduée. |
| Freinage fourmi = absence de retours | Existe : phéromone « no entry » (Robinson et al. 2005), inhibition par encombrement. Sert de remède biologique côté fourmi. |
| Fourmis « bloquées » sur la branche longue | Pas général (*P. megacephala* suit les changements) : le verrouillage est traité comme un régime paramétrique (E6.2). |
| *Phengaris*/*Acherontia* = injection de faux signaux | Le mimétisme usurpe une **identité**; l'injection détourne une **action**. Mimétisme ↔ usurpation d'identité ou de capacité; propagande ↔ injection indirecte; propagation ↔ Prompt Infection (audit choregraphie-agentique, constat du projet 6). Moritz et al. 1991 parle de « camouflage », pas de « mimétisme »; mécanisme non lu, donc non décrit. Nomenclature *Phengaris*/*Maculinea* non vérifiée. |
| Abeilles : intrus externes seulement | *A. m. capensis* est un parasite **intraspécifique** (compromission interne). |
| « Agents identiques oscillent » | Hypothèse sans acquis (contre-preuves publiées) : non mobilisée en P6. |
| « Attrition des danses » = oubli général | Valable pour la recherche de nid (Seeley 2003), pas pour le butinage; l'oubli est de trois formes (évaporation, abandon, attrition). |
| « La reine ne commande pas » | Constat borné (jamais une prescription d'architecture). *A. m. capensis* ne dit rien du commandement : c'est l'usurpation d'un signal de reproduction. |

## 3. Hypothèses falsifiables

Convention : les seuils marqués † sont des choix de la fiche, à calibrer au pilote. Les hypothèses **confirmatoires** sont préenregistrées avant l'exécution des graines de confirmation (Chambers 2013; Chambers et Tzavella 2022; écarts consignés selon Lakens 2024); les contrastes primaires confirmatoires reçoivent la correction de Holm (Holm 1979), comme en P7; l'équivalence se teste par TOST (Lakens 2017; Lakens et al. 2018; Schuirmann 1987). Les expériences sur agents à règle sont confirmatoires; les volets LLM restent **exploratoires** tant que le pilote n'a pas levé les risques R7 et R8. Un résultat négatif se publie au même titre qu'un résultat positif.

| ID | Énoncé dirigé | Variables indépendantes → dépendantes | Effet minimal† et critère de réfutation | Statut |
|---|---|---|---|---|
| **H6.1** | Sans oubli, un renforcement orienté de la trace piège le système dans un circuit avec une probabilité qui croît avec l'horizon; l'oubli de la trace et le bruit de décision la réduisent. | oubli ρ, bruit ε, β, topologie (arbre ou graphe à cycle), N → P(piégeage) = part des exécutions où au moins L tours consécutifs (L fixé au pilote) suivent le même circuit orienté; tours jusqu'à la sortie | **Effet :** baisse absolue de P(piégeage) ≥ 0,30† entre ρ = 0 et le ρ intermédiaire. **Réfutation :** baisse < 0,05† avec IC 95 % (bootstrap, graines appariées) incluant 0, ou P(piégeage \| ρ = 0) qui ne croît pas avec l'horizon sur graphe à cycle. | Confirmatoire (agents à règle); extension LLM exploratoire |
| **H6.2** | Dans la région bistable de la taille de colonie, après inversion des qualités de deux sources, un mécanisme de sortie (bruit d'exploration, encombrement, attrition de l'engagement) réduit le temps de réallocation par rapport au renforcement pur. | n (sous, dans, au-dessus de la région bistable), mécanisme {pur; bruit; encombrement; attrition} → P(verrouillage sur la source initiale), t½ (temps pour réallouer 50 % de l'effort) | **Effet :** baisse relative de t½ ≥ 0,30†. **Réfutation :** IC 95 % de la différence incluant 0, avec équivalence ± 0,10† (TOST) dans la région bistable. | Confirmatoire; conditionnée à T6.6, T6.7, T6.14 |
| **H6.3** | Quand les agents répondent en séquence en voyant les réponses antérieures, une erreur initiale devient l'issue collective plus souvent qu'avec des réponses masquées, davantage encore si les erreurs sont corrélées; un vérificateur indépendant placé avant l'amplification réduit cet effet. | visibilité {masquée; visible}, corrélation des erreurs, vérificateur {aucun; décentralisé indépendant; central (témoin)} → P(issue erronée \| première réponse erronée) | **Effet :** +0,15† (visible contre masquée). **Réfutation :** différence dans ± 0,05† (TOST) ou de signe opposé. | Confirmatoire (règle, *Modèle simplifié*); LLM exploratoire |
| **H6.4** | Dans le modèle de Pais et al. (B1) à deux sites égaux, trois régimes occupent le plan (σ, q) : **scission** si σ < `σ*(v)` et q < ψ_éq(v, σ) (niveau d'interblocage symétrique); **décision** si σ > `σ*(v)` et q < ψ_gagnant(v, σ) (niveau de l'attracteur gagnant); **interblocage** sinon. Sous `σ*`, la fréquence de scission décroît quand q monte et celle d'interblocage croît. Pour v = 2 [I, calcul de la fiche] : ψ_éq = 0,46 à σ = 0 et 0,375 à σ = σ*; ψ_gagnant ≈ 0,59 à 1,5σ* et ≈ 0,64 à 2σ*. | σ/σ*, q, v, bruit k → part {décision, interblocage, scission} à l'horizon T | **Effet :** sous σ*, transition de la fréquence de scission de ≥ 0,9† à ≤ 0,1† sur un intervalle de q de largeur ≤ 0,1†. **Réfutation :** transition non monotone, ou frontière (ψ_éq ou ψ_gagnant) à plus de 0,05† de la valeur prédite. | Confirmatoire (modèle); les niveaux ψ sont [I] |
| **H6.5** | Pour un k-sur-n d'agents devant deux plans incompatibles, un verrou exclusif supprime la scission mais accroît l'interblocage; une inhibition ciblée sur le camp adverse réduit l'interblocage sans verrou; une inhibition non ciblée ne rompt pas l'égalité (cohérent avec A3 du dossier p5). | mécanisme {aucun; verrou exclusif; inhibition ciblée; inhibition non ciblée; arbitre central (témoin)}, q → scission, interblocage, temps de décision, messages | **Effet :** verrou : scission −0,50†; inhibition ciblée : interblocage −0,30† contre « aucun »; non ciblée : écart d'interblocage ≤ 0,05†. **Réfutation :** l'un des trois signes absent (IC 95 % excluant l'effet minimal). | Confirmatoire (règle); LLM exploratoire |
| **H6.6** | La probabilité d'admettre un usurpateur d'identité décroît avec le nombre k de vérificateurs indépendants, plus lentement quand leurs erreurs sont corrélées, jusqu'à un plafond fixé par le nombre effectif de vérificateurs (n_eff < k). | k, corrélation des erreurs (même modèle et même consigne; hétérogène), distance de l'identité usurpée → P(admission de l'usurpateur), P(rejet d'un légitime), n_eff | **Effet :** de k = 1 à k = 3 sous indépendance, baisse relative ≥ 0,50†; sous forte corrélation, au plus la moitié de cette baisse†. **Réfutation :** interaction k × corrélation dans ± 0,10† (TOST). | Confirmatoire (modèle de reconnaissance); juges LLM exploratoires |
| **H6.7** | À source d'infection et paramètres égaux, un médium persistant propage la contamination plus loin et plus longtemps qu'un canal éphémère; l'expiration (TTL) abaisse le β effectif et déplace vers des β plus grands le seuil β > 2γ de Gu et al. 2024. | persistance τ½ {éphémère; TTL court; TTL long; sans expiration}, β, γ, N → fraction finale infectée, tour d'infection complète, seuil effectif | **Effet :** fraction finale (TTL long) − (TTL court) ≥ 0,20†. **Réfutation :** écart dans ± 0,05† (TOST) pour tout β au-dessus du seuil nominal. | Confirmatoire (règle); LLM exploratoire (bac à sable, marqueur inerte) |
| **H6.8** | À densité de liens et β égaux, une topologie modulaire réduit la fraction finale infectée par rapport à une topologie sans structure; le coût en gain collectif G est faible pour une tâche décomposable et élevé pour une tâche séquentielle. | modularité (nombre de ponts inter-modules à densité fixe), structure de tâche {décomposable; séquentielle} → fraction finale infectée, G (apparié, à budget égal), messages | **Effet :** baisse de la fraction finale ≥ 0,30†; coût en G ≤ 0,10† (décomposable) et ≥ 0,25† (séquentielle). **Réfutation :** l'un des deux contrastes dans l'intervalle d'équivalence ± 0,05†. | Confirmatoire (règle); appui biologique limité à [Stroeymeyt et al. 2018] [M] : *Hypothèse de l'auteur* |
| **H6.9** | Quand le faux signal ne s'évapore pas, la collecte s'effondre de façon abrupte avec la fraction de détracteurs; la défense par prudence la restaure sous une fraction critique f_c et échoue au-delà; f_c baisse quand la persistance du faux signal monte. | fraction de détracteurs, évaporation du faux signal, patience de la défense, canal {piste persistante; diffusion éphémère à portée locale} → nourriture par coopératrice, part des coopératrices qui livrent, f_c | **Effet :** f_c(persistance longue) ≤ 0,5 × f_c(persistance courte)†. **Réfutation :** f_c indépendante de la persistance (pente nulle, IC 95 %). La reproduction (T6.11) précède l'extension. | Reproduction confirmatoire; extension exploratoire |
| **H6.10** | Un orchestrateur à compteur de blocage fait sortir des boucles plus souvent qu'une chorégraphie sans remède, surtout sur tâche séquentielle; mais la compromission de l'orchestrateur propage plus vite et plus loin que celle d'un pair. | architecture {orchestrée; chorégraphiée stigmergique; chorégraphiée à signaux directs}, structure de tâche, position de la source {orchestrateur; pair} → taux de sortie de boucle, fraction infectée, G, coût | **Effet :** +0,20† de sortie de boucle (séquentielle); +0,20† de fraction infectée (orchestrateur contre pair). **Réfutation :** l'un des deux contrastes a un IC 95 % incluant 0 : la dissociation est alors réfutée. | Confirmatoire (règle); LLM exploratoire |

## 4. Modèles de référence

Un modèle par article, validé contre la figure ou le tableau publié. Les équations sont transcrites du dossier [p6-pathologies](../recherche/dossiers/p6-pathologies.md) avec leur emplacement; toute ligne [à confirmer] se relit dans la source avant implantation (fiche de reproduction avant le code). Intégration : RK4 pour les EDO; Euler–Maruyama pour les EDS (pas dt ≤ 0,01 en unités du modèle, sensibilité vérifiée à dt/2, convention du dossier x-choregraphie); algorithme de Gillespie (SSA) pour les processus à sauts; pas fixe pour les agents. Ordre de mise à jour explicite (Caron-Lormier et al. 2008) : synchrone pour les modèles publiés en pas fixe, asynchrone à ordre aléatoire pour les marcheurs. Description ODD (Grimm et al. 2020) résumée en 4.5; la description complète accompagne le code. Correspondance avec les modèles du dossier : F1 = M2, F2 = M1, F3 = M3, F4 = M5, F6 = M6, B1 = M7; M4 (Malíčková et al. 2015; Das 2017, préimpressions) n'est pas reproduit.

### 4.1 Fourmi

**F1. Couzin et Franks 2003, suivi de piste avec évitement** (*Eciton burchellii*; préréglage « tronçon circulaire ») [T]. Reproduit par P9.
- Localisation : §2 (modèle), fig. 2 (« Circular milling »), fig. 3–4.
- Équations : `(2.1) d_i(t+Δt) = Σ_{j≠i} (c_i − c_j)/|c_i − c_j|` (évitement, rotation bornée à θ_aΔt); `(2.2) C(r,τ) = Q/(2πDτ)·exp(−r²/(4Dτ))`; `(2.3) S(C) = tan⁻¹(k·C/C_max)/(π/2)`; `(2.4) d′_i = (d_i + ω g_i)/|d_i + ω g_i|`.
- Paramètres : Δt = 0,02 s; D = 0,01 cm² s⁻¹; k = 100; erreur de virage ε ~ N(0 ; 0,5 rad); r_d = 0,4 cm; r_p = 1,2 cm; b = 0,8 cm; f = 0,4 cm; u_des = 13 cm/s; u_min = 2 cm/s; m = 50 cm/s². Fig. 2 : tronçon périodique de 50 cm, N = 50, θ_p = 500 °/s, σ = 0,01, Q = C_max = 1,2 × 10⁻⁶, τ = 300 s. **Unités de Q à trancher** (g cm⁻¹ dans le texte, g cm⁻³ dans les légendes; P9 retient g cm⁻³).
- Type : agents en pas fixe, mise à jour synchrone [I], conditions périodiques.

**F2. Couzin et al. 2002, zones de répulsion, d'orientation et d'attraction** (contrepoint, **pas un modèle de fourmi** : poissons et oiseaux en 3D, sans phéromone) [T]. Reproduit par P9.
- Localisation : section « Behavioural rules », éq. (1)–(6), tableau 1, fig. 3–4.
- Équations : `d_r = −Σ r_ij/|r_ij|` (priorité absolue); `d_o = Σ v_j/|v_j|`; `d_a = Σ r_ij/|r_ij|`; `d_i = ½(d_o + d_a)` si les deux zones sont occupées; mesures `p_group = (1/N)|Σ v_i|` et `m_group = (1/N)|Σ r_ic × v_i|`. La normalisation avant la demi-somme n'est pas précisée : à fixer et documenter [I].
- Paramètres : tableau 1 (N 10–100; r_r = 1; Δr_o 0–15; Δr_a 0–15; α 200–360°; θ 10–100 °/s; s 1–5 unités/s; σ 0–0,2 rad; τ = 0,1 s); fig. 3 : N = 100, α = 270°, θ = 40 °/s, s = 3, σ = 0,05; fig. 4 : r_a = 14, 2000 pas par valeur de r_o.
- Type : agents 3D en pas fixe, synchrone.

**F3. Erhard et al. 2022, marche aléatoire renforcée sur arêtes orientées** (une fourmi abstraite; le plus petit modèle exact du moulin) [T préimpression v2; M version publiée]. Reproduit par P9.
- Localisation : éq. (2.1)–(2.2), Prop. 2.1, Th. 2.2.
- Équations : `P(X_{n+1} = x | G_n) = a_n(X_n, x) / Σ_{y∼X_n} a_n(X_n, y)` avec `a_n(X_n, x) = exp(β·c_n(X_n, x))`, où `c_n(x,y)` est le nombre de passages de x vers y moins le nombre de passages de y vers x. Th. 2.2 : sur tout graphe fini connexe qui n'est pas un arbre, et sur ℤ^d (d ≥ 2), la marche est presque sûrement piégée dans un circuit orienté, pour tout β ∈ (0, ∞). Prop. 2.1 : sur ℤ, pas de piégeage; `X_n/n → Y` p.s., avec `P(Y = ±(1 − e^{−β})/(1 + e^{−β})) = ½`.
- Paramètres : β sans dimension; n en pas. Type : processus discret, mise à jour séquentielle, Monte-Carlo.

**F4. Beekman et al. 2001, transition de phase et hystérésis** (*Monomorium pharaonis*, nourrisseur à 50 cm [à confirmer]) [non vérifiée; résumé confirmé, équation et valeurs non relues].
- Localisation : éq. (1), fig. 1 (paramètres), fig. 4 (hystérésis expérimentale).
- Équation [à confirmer] : `dx/dt = (α + βx)(n − x) − s·x/(s + x)`, x = fourrageuses à la source, n = taille de colonie. Équilibres : `βx³ + (βs + α − βn)x² + (s(1 + α − βn) − αn)x − αns = 0`.
- Paramètres [à confirmer] : β = 0,00015; s = 10; α = 0,021 (découverte fréquente) ou 0,0045 (découverte rare); α mesuré = 0,0052 par fourmi par minute. Unités de β et de s à relire.
- Calcul de contrôle [I] (recalculé par la fiche à partir de l'équation telle que transcrite) : trois équilibres positifs, donc bistabilité, pour n ∈ [476 ; 910] à α = 0,0045; aucun à α = 0,021.
- Type : EDO scalaire (champ moyen), RK4, plus résolution du polynôme cubique et signe de la dérivée pour la stabilité; version agents (n discret) par SSA.

**F5. Dussutour et al. 2009, bruit et décision en milieu dynamique** (*Pheidole megacephala*; branches de 60 mm et 180 mm [à confirmer]) [non vérifiée; résumé confirmé : espèce, modèle par EDS, rôle fonctionnel du bruit].
- Équation [à confirmer] : `dc₁/dt = Q₁ p₁(c₁) Φ(t) − ρ c₁ + σ dW/dt`. La forme de p₁ et le terme Φ(t) se relisent dans la source; le dossier p1-recrutement en transcrit une forme, `p_i = c_i^α/(k + c_i^α + c_j^α)`, dont le placement de k n'a pas pu être recontrôlé [à confirmer].
- Paramètres [à confirmer] : q₁ = 0,09; q₂ = 0,13; α = 2 (confirmé « as fitted to experiments », dossier p1-recrutement); k = 12; ρ = 0,00085, **unité de temps non vérifiée** (s⁻¹ ou min⁻¹).
- Protocole publié [à confirmer] : branche courte bloquée de 60 à 120 min puis rouverte; en phase 3, 16 colonies sur 21 reviennent à la courte; sans bruit (σ = 0), le retour prend plus de 250 min.
- Type : EDS, Euler–Maruyama.

**F6. Aswale et al. 2022, « Hacking the colony »** (essaim virtuel de fourmis artificielles, pas un taxon) [T].
- Localisation : tableau 1, éq. (1)–(2), §3.4, §4.3, fig. 4, 8, 9.
- Équations : dépôt d'intensité `1000·exp(−λτ)` (éq. 1; τ défini dans la source); évaporation linéaire de k = 1 unité/s (éq. 2); maximum retenu en cas de dépôt sur une cellule déjà marquée.
- Paramètres (tableau 1) : n = 1024 fourmis; N = 50 000 pas; monde 1920 × 1080, cellules de 4; nid (960, 540) de rayon 20; nourriture (372, 36) de rayon 16; v = 50; Δt = 0,016; χ = 32 vecteurs de sondage de longueur ≤ 40 dans ±0,8π; bruit uniforme ±0,1π; λ = 0,01; τ_turn = 7; τ_attack = 100. Défense : « phéromone de prudence », patience maximale 250. Répétitions publiées : 20 simulations par configuration.
- Type : agents sur grille avec champs de phéromone (vraie, trompeuse, prudence), pas fixe, mise à jour synchrone [I, à documenter].
- Écart interne du papier : facteur de gain 57 (conclusion) contre 58 (§4.3). Le rapprochement avec le moulin (formation circulaire figée en cas extrême, fig. 9) est une inférence du dossier [I], pas une affirmation des auteurs.

**F7. Reconnaissance collective** (Johnson et al. 2011) [R] et **modèle simplifié de P6** [I]. Aucune équation ni valeur lue : l'article rapporte qu'une reconnaissance forte émerge d'un collectif de mauvais reconnaisseurs (un intrus aux odeurs proches passe un gardien, presque jamais plusieurs). P6 définit son propre modèle, déclaré *Modèle simplifié* et exploratoire : k gardiens perçoivent le profil d'un candidat avec bruit, acceptent si sa distance au gabarit de colonie est sous un seuil, avec un facteur d'erreur commun qui règle la corrélation; le collectif admet si au moins m des k acceptent. Sorties : P(admission de l'usurpateur), P(rejet d'un légitime), n_eff.

Schneirla 1944 et Beebe 1921 sont des observations, sans modèle; aucun modèle n'a été lu pour Akino et al. 1999, Barbero et al. 2009 et Nash et al. 2008 (parasites).

### 4.2 Abeille

**B1. Pais et al. 2013, extension stochastique du modèle de Seeley et al. 2012** (*Apis mellifera*, choix du site par l'essaim) [T; Texte S1 non lu]. Module partagé avec P5.
- Localisation : éq. (1), éq. (4), fig. 2 à 6.
- Équation (1), avec `ψ_U = 1 − ψ_A − ψ_B` : `dψ_A = [γ_A ψ_U − ψ_A(α_A − ρ_A ψ_U + σ_B ψ_B)] dt + k √(ψ_U² + ψ_A² + ψ_U²ψ_A²) dW_A`, et symétriquement pour B. γ : découverte; α : abandon spontané; ρ : recrutement par danse; σ : signal d'arrêt (inhibition croisée), sans bruit.
- Paramétrisation : `γ_i = ρ_i = v_i`, `α_i = 1/v_i`. Décision quand une population atteint le quorum (0,7 dans la fig. 5). Éq. (4), deux sites égaux : fourche à `σ* = 4v³/(v² − 1)²`. Bruit k = 0,05 (fig. 3, troisième site supérieur découvert à t = 30; autres valeurs au Texte S1, non lu).
- Valeurs de contrôle [I] (recalculées par la fiche) : `σ*(1,5) = 8,640`; `σ*(2) = 3,556`; `σ*(3) = 1,688`; `σ*(4) = 1,138`. À σ = 0 et v = 2, ψ_A = ψ_B ≈ 0,46 (interblocage; un quorum sous 0,46 serait atteint par **les deux** sites : scission). La fourche a lieu à `ψ_U = 1/v²`, donc à ψ_A = ψ_B = (1 − 1/v²)/2 = 0,375 pour v = 2 : le niveau d'interblocage descend de 0,46 (σ = 0) à 0,375 (σ = σ*) [I, calcul de la fiche; simulation déterministe concordante à 0,9σ*, 0,38]. À v = 2 et σ = 1,5σ*, le gagnant n'est qu'à ψ_A ≈ 0,59, sous le quorum de 0,7 : briser la symétrie ne garantit pas d'atteindre le quorum.
- Type : EDS (Euler–Maruyama) ; EDO (RK4) pour k = 0.

**B2. Attrition de l'engagement** (module de P6, d'après Seeley 2003 [non vérifiée]). Le nombre de tours frétillants par retour décroît de façon linéaire; 23 éclaireuses sur 27 (6 essaims) ayant dansé pour un site non choisi ont arrêté avant de suivre une autre danse [à confirmer]; pente d'environ −15,7 circuits par retour [résumé, audit bio-abeilles; à confirmer]. Modèle [I] : l'intensité d'une danseuse après n retours vaut `d_n = max(0, d_0 − a·n)`, la pente a étant calée sur T6.14; le recrutement effectif de B1 devient proportionnel à d_n/d_0. Se simule au niveau agent (pas fixe ou SSA); se docke sur B1 en l'absence d'attrition.

**B3. Observations sans modèle quantitatif lu** : scission en vol (Lindauer 1955 [non vérifiée] : deux groupes de danseuses d'égale force donnent ensemble le signal d'envol, l'essaim se divise, revient, et peut finir par s'installer à découvert; Seeley et Buhrman 1999 [non vérifiée]; Seeley et Visscher 2003 : scission quand le quorum est atteint avant le consensus, lu par l'audit bio-abeilles); parasitisme (*A. m. capensis* : Neumann et Moritz 2002 [non vérifiée], Neumann et al. 2011 [R], Neumann et Pirk 2019 [R], Oldroyd 2002 [M]; camouflage d'*Acherontia atropos* : Moritz et al. 1991 [M], mécanisme non lu); pillage (Peck et Seeley 2019 [R]); garde (Couvillon et al. 2008 [M], titre seul : changement rapide du comportement des gardiennes sous afflux d'intrus, chiffres non lus).

### 4.3 Agents

**G1. Gu et al. 2024, Agent Smith** [T partiel]. Éq. (5) : `c_{t+1} = (1 − γ)c_t + Δ_t/N`, avec `Δ_t ~ B(N/2, β c_t(1 − c_t))`. En espérance : `c_{t+1} = (1 − γ)c_t + β c_t(1 − c_t)/2`. Propagation si β > 2γ; limite `1 − 2γ/β` (éq. 7, solution de l'éq. différentielle 6). c_t : fraction infectée; t : tour de discussion. La définition exacte de γ et de β se relit dans la source [à confirmer]. Observation publiée sur un million d'agents LLaVA-1.5 : environ 100 % d'infection après 27 à 31 tours (non reproduite : coût, voir P7). Type : chaîne de Markov à tirages binomiaux, synchrone par tour.

**G2. Lee et Tiwari 2024, Prompt Infection** [T partiel, HTML; [R] dans le dossier p7]. Croissance logistique de l'infection dans une société d'agents : infection complète au tour 4,7 (N = 10) et 6,3 (N = 20); GPT-4o ignore 66 % des attaques autoréplicantes, GPT-3.5 9 %; défense « LLM Tagging » avec marquage : aucune attaque ne réussit. Modèle de P6 [I] : SI à pas discret, calé sur N = 10 et testé sur N = 20 (T6.13). Les autres résultats chiffrés du papier ne sont pas des cibles.

**G3. Cemri et al. 2025, MAST** (taxonomie de codage; non un modèle) [T partiel]. 1642 traces, 7 cadriciels, 14 modes en 3 catégories, κ = 0,88. Totaux (fig. 1) : conception 44,2 %, désalignement 32,3 %, vérification 23,5 % (fig. 4, 210 traces : 41,8 / 36,9 / 21,3 %). Modes et prévalences : FM-1.1 spécification de la tâche ignorée 11,8 %; FM-1.2 rôle ignoré 1,5 %; **FM-1.3 répétition d'étapes 15,7 %**; FM-1.4 perte d'historique 2,80 %; **FM-1.5 conditions d'arrêt ignorées 12,4 %**; FM-2.1 réinitialisation de la conversation 2,20 %; FM-2.2 absence de demande de clarification 6,80 %; FM-2.3 dérive de la tâche 7,40 %; FM-2.4 rétention d'information 0,85 % (0,80 % dans la fig. 1); FM-2.5 apport d'un autre agent ignoré 1,90 %; FM-2.6 décalage raisonnement-action 13,2 %; FM-3.1 arrêt prématuré 6,20 %; FM-3.2 vérification absente ou incomplète 8,20 %; FM-3.3 vérification incorrecte 9,10 %. FM-1.3 et FM-1.5 sont aux rangs 1 et 3 (FM-2.6 au rang 2).

**G4. Fourney et al. 2024, compteur de blocage de Magentic-One** [T partiel, §4.1]. L'Orchestrateur incrémente un compteur de blocage si une boucle est détectée ou si rien n'avance, et replanifie au-delà de 2 (valeur du papier, balayée en sensibilité). C'est le témoin orchestré de E6.1.

### 4.4 Modèle chorégraphique commun (couche 3)

Seul le **canal** est interchangeable : persistance (demi-vie τ½ ou TTL), portée (voisinage), adressage (diffusion ou message dirigé), format (scalaire, tuple symbolique, texte plafonné). Pour P6, les « infectés » et les « détracteurs » sont des états ou des règles d'agent, jamais du contenu textuel. Le contrat d'interface est dans la [spécification de simulation](../docs/05-spec-simulation.md); la validation par docking est décrite dans le plan de simulation.

### 4.5 Résumé ODD

| Modèle | Entités et états | Processus et ordre de mise à jour | Stochasticité | Sorties |
|---|---|---|---|---|
| F1 | fourmis (position, direction, vitesse); piste figée après τ | par pas Δt : évitement prioritaire, sinon suivi de piste par antenne, préférence ω; synchrone | bruit du stimulus σ; erreur de virage ε | flux F; distance au centre de piste |
| F2 | individus 3D (c, v) | zones de répulsion, d'orientation, d'attraction; synchrone | bruit angulaire σ | p_group, m_group, fragmentation |
| F3 | un marcheur; graphe; compteurs `c_n(x,y)` | un pas = un tirage selon exp(β·c), puis mise à jour du compteur; séquentiel | choix de l'arête | `X_n/n`; circuit piégé |
| F4 | colonie (x, n); version agents : états {nid, recherche, piste} | EDO; SSA (découverte, recrutement, abandon) | SSA | équilibres, hystérésis, P(piste) |
| F5 | concentrations c₁, c₂ sur deux branches; phase (blocage, réouverture) | EDS, phases 1 à 3 | bruit σ dW | part des retours à la branche courte |
| F6 | 1024 fourmis; grille (phéromone vraie, trompeuse, prudence); détracteurs | par pas Δt : sondage de χ vecteurs, virage, dépôt, évaporation linéaire; synchrone [I] | bruit uniforme ±0,1π | nourriture par coopératrice; part qui livre |
| F7 (P6) | k gardiens; candidats (profil d'odeur); facteur d'erreur commun | perception bruitée, acceptation si distance < seuil; admission si ≥ m acceptent | bruit de perception; facteur commun | P(admission), faux rejets, n_eff |
| B1 | ψ_A, ψ_B, ψ_U | EDS ou EDO; décision au quorum q | k dW | issue {décision, interblocage, scission}, temps de décision |
| B2 (P6) | danseuses (engagement d_n) | à chaque retour, d_n décroît; arrêt à 0; pas fixe | tirage des retours | décroissance, abandons sans suivi |
| G1 | N agents {sains, infectés} | par tour : appariements aléatoires, infection, guérison; synchrone | binomiale | c_t, plateau, tour d'infection complète |
| G2 et commun | agents sur graphe; médium (TTL, portée); défenses | par tour : lecture, écriture, transmission, expiration | tirages | fraction infectée, tour complet, G, messages |

### 4.6 Parité fourmi et abeille

| Famille | Fourmi | Abeille | Asymétrie et justification |
|---|---|---|---|
| Piégeage (moulin) | *Eciton* (F1, F3), exécuté par P9 | aucun équivalent publié | **Forte** : la ruche n'a pas de moulin documenté; assumée (même constat que P9) |
| Verrouillage | *M. pharaonis* (F4), *P. megacephala* (F5), *L. niger* (encombrement, Grüter et al. 2012) | attrition de l'engagement (B2; Seeley 2003) | Faible : même famille de mécanismes de sortie, problème côté fourmi et remède côté abeille; E6.2 les compare dans un même cadre |
| Indécision | aucun équivalent documenté (pas d'inhibition croisée connue chez *Temnothorax*, audit bio-fourmis) | B1, observations de Lindauer 1955, Seeley et Visscher 2003 | **Forte** : compensée en transposant l'expérience (E6.5) aux deux **profils de règle** (quorum seul; quorum avec inhibition croisée), sans prêter ces profils à un taxon |
| Parasites, mimétisme | *Maculinea*/*Myrmica* (Akino, Barbero, Nash, Johnson) | *Acherontia* [M], *A. m. capensis* [non vérifiée] | Moyenne : aucun modèle ni cible chiffrée des deux côtés; entrée par le modèle simplifié F7 et par les pages « Voir » |
| Faux signal, propagande | *L. kutteri* (Allies et al. 1986‡), Aswale et al. 2022 (artificiel) | aucun lu | **Forte** : le seul résultat chiffré est un essaim virtuel, pas un taxon |
| Défenses | *L. niger* ([Stroeymeyt et al. 2018] [M]), reconnaissance collective (Johnson et al. 2011) | garde (Couvillon et al. 2008 [M]), rejet amélioré (Neumann et Pirk 2019) | Moyenne : sources de part et d'autre au niveau résumé ou titre |

## 5. Cibles de reproduction

T6.k reprend T<k> du dossier ([p6-pathologies](../recherche/dossiers/p6-pathologies.md), §7) pour k = 1 à 13. **T6.14 est créée par la fiche** : elle n'a pas de correspondant dans le dossier. Niveaux d'acceptation : **R** alignement relationnel (signe, ordre, plage); **D** équivalence distributionnelle (TOST, marge indiquée); **N** identité numérique (test unitaire). Réplication, non validation (cadre, principe 1). Une cible non acceptée entre au registre des déviations et déclasse en exploratoire les expériences qui en dépendent. « Porte » : condition de départ (go) ou d'arrêt (no-go). Les tolérances † se calibrent après numérisation des figures, selon le protocole de reproduction.

**Ce qui est publié.**

| ID | Espèce, modèle | Grandeur | Valeur publiée | Source (emplacement) | Lecture |
|---|---|---|---|---|---|
| T6.1 | contrepoint (poissons, oiseaux), F2 | p̄ et m̄ sur la grille Δr_o, Δr_a ∈ {0…15} (moyenne des 1000 derniers des 5000 pas) | quatre régimes; tore à Δr_o petit et Δr_a grand | Couzin et al. 2002, fig. 3, tableau 1 | [T] |
| T6.2 | idem | m̄ et p̄ en balayage montant puis descendant de r_o (r_a = 14; 2000 pas par valeur) | tore entre r_o ≈ 1,5 et ≈ 2,5 en montant; pas de tore en descendant; retour à l'essaim sous 1,5 | Couzin et al. 2002, fig. 4 | [T] |
| T6.3 | *E. burchellii*, F1 | flux F à t = 5000 pas, tronçon périodique de 50 cm | F maximal à α et θ_a intermédiaires; choix collectif d'un sens à α = 90°, θ_a = 1000 °/s (θ_a [à confirmer]) | Couzin et Franks 2003, §4(b)(i), fig. 2 | [T] |
| T6.4 | *E. burchellii*, F1 | distance médiane au centre de piste (rentrantes contre sortantes); F selon ω | rentrantes au centre, sortantes aux bords; F maximal à ω = 1 | Couzin et Franks 2003, fig. 3–4 (terrain : 97 rentrantes, 84 sortantes) | [T] |
| T6.5 | fourmi abstraite, F3 | sur ℤ : X_n/n à n = 10⁵; grille 6 × 6 : piégeage | ±(1 − e^{−β})/(1 + e^{−β}) = ±0,4621 pour β = 1; piégeage p.s. | Erhard et al. 2022, Prop. 2.1, Th. 2.2 | [T] préimpression v2; [M] version publiée |
| T6.6 | *M. pharaonis*, F4 | équilibres de l'éq. 1; x final selon l'état initial | bistabilité à α = 0,0045; 700 ouvrières : aidée 4,7 ± 3,3 contre non aidée 2,6 ± 3,3 (P = 0,005); 300 ouvrières : pas de piste même aidée (0,56 ± 1,65) [à confirmer] | Beekman et al. 2001, éq. 1, fig. 1, fig. 4 | [R] confirmé; éq. et valeurs [à confirmer]; [non vérifiée] |
| T6.7 | *P. megacephala*, F5 | part des essais revenus à la branche courte dans les 30 dernières minutes de la phase 3 | 16/21 ≈ 0,76; sans bruit, retour après plus de 250 min [à confirmer] | Dussutour et al. 2009 | [R]; [non vérifiée] |
| T6.8 | *A. mellifera*, B1 (k = 0) | point de bifurcation numérique `σ̂*(v)` | `σ* = 4v³/(v² − 1)²` | Pais et al. 2013, éq. 4, fig. 2 | [T]; valeurs de contrôle [I] |
| T6.9 | *A. mellifera*, B1 (k = 0,05) | choix final entre deux sites égaux et médiocres, puis un troisième, supérieur, découvert à t = 30 | interblocage, puis choix du troisième | Pais et al. 2013, fig. 3 (v_A, v_B, v_C et seuil au Texte S1, non lu) | [T] texte principal |
| T6.10 | *A. mellifera*, B1 (qualitatif) | régime final dans le plan (σ, q) : décision, interblocage, scission | scission tentée avec deux sites équivalents | Lindauer 1955 (résumé allemand); Seeley et Visscher 2003 | [R]; [non vérifiée] |
| T6.11 | essaim virtuel, F6 | nourriture par coopératrice; part des coopératrices qui livrent | 21,74 sans attaque; 0,14 et 13,10 % avec 3,13 % de détracteurs (faux signal évaporé comme le vrai, avec recharge au nid); collecte à 5 % de la référence avec 0,39 % de détracteurs et faux signal non évaporant; plus de 8 unités et plus de 96 % avec la phéromone de prudence; à 50 % de détracteurs, 2,23 % livrent une fois et aucune deux fois (défense en échec) | Aswale et al. 2022, §3.4, §4.3, fig. 4, 8, 9 | [T] |
| T6.12 | agents, G1 | fraction infectée c_t (simulation par paires) | récurrence stochastique de l'éq. (5); limite 1 − 2γ/β si β > 2γ (éq. 7) | Gu et al. 2024, éq. (5)–(7) | [T partiel] |
| T6.13 | agents, G2 | tour d'infection complète dans une société de N agents | 4,7 (N = 10); 6,3 (N = 20) | Lee et Tiwari 2024, fig. 6 | [T partiel] (dossier p6); [R] (dossier p7) |
| T6.14 (créée) | *A. mellifera*, B2 | décroissance de l'engagement des danseuses (recherche de nid) | décroissance linéaire du nombre de tours par retour; 23 éclaireuses sur 27 (6 essaims) arrêtent avant de suivre une autre danse; pente d'environ −15,7 circuits par retour [à confirmer] | Seeley 2003; audit bio-abeilles (résumé) | [R]; [non vérifiée] |

**Comment on accepte.**

| ID | Niveau | Tolérance ou marge TOST † | Répétitions | Porte go/no-go | Exécution |
|---|---|---|---|---|---|
| T6.1 | R | m̄ ≥ 0,5† et p̄ ≤ 0,3† à (Δr_o = 1, Δr_a = 12); à (0 ; 12) essaim, p̄ et m̄ < 0,3†; à (7 ; 12) p̄ ≥ 0,8†; carte concordante avec la fig. 3E–F numérisée sur ≥ 85 %† des cellules. Points de contrôle déduits de la fig. 4, non lus sur la fig. 3 [I] | 30 par cellule (publié) | Non bloquante pour P6 (contrepoint) | P9 (reprise) |
| T6.2 | R | maximum de m̄ en montée dans [1,5 ; 2,5] ± 0,25†; en descente m̄ < 0,2† sur [1,5 ; 2,5]; aire de la boucle > 0 (IC 95 % excluant 0); sensibilité à la vitesse de balayage (Chan et Kanso 2026 [R]; lien avec le modèle de Couzin = inférence [I]) | 15 (publié) | Non bloquante | P9 (reprise) |
| T6.3 | R | F̄(90°, 1000) ≥ 0,8† et supérieur d'au moins 0,3† à F̄ aux bords (α ≤ 20° ou ≥ 160°; θ_a ≤ 100 ou ≥ 2000 °/s) | 100 par combinaison (publié) | Acceptée par P9 (T9.1 du dossier p9 reprend ce critère) | P9 |
| T6.4 | R | médiane des rentrantes < médiane des sortantes à Δθ_a = 1400 °/s (Mann-Whitney, p < 0,01†); argmax F̄ en ω = 1 ± 0,25† | 100 | Acceptée par P9 (T9.2) | P9 |
| T6.5 | R | sur ℤ : abs(X_n/n) à ± 0,01† de 0,4621 pour ≥ 95 %† des essais, signes équilibrés (binomial, p > 0,01†); grille : ≥ 99 %† des essais suivent le même circuit orienté pendant ≥ 50 tours consécutifs avant n = 10⁶ (critère opérationnel proposé) | 1000 | **Prérequis de E6.1.** Si P9 ne l'a pas accepté à la date de début de E6.1, P6 l'exécute (≈ 0,5 semaine-personne [estimation]) | P9 (reprise) |
| T6.6 | R; N pour les équilibres | bornes de bistabilité à ± 1 %† de [476 ; 910] (calcul [I]); version agents : à n = 700, P(piste \| aidée) − P(piste \| non aidée) ≥ 0,3†; à n = 300, aucune piste dans les deux cas | 100 par condition | **No-go tant que l'éq. 1 et les valeurs ne sont pas relues dans le PDF.** Si elles diffèrent : recalculer les bornes; T6.6 devient *Modèle simplifié* | P6 |
| T6.7 | R | 0,76 ± 0,15† avec bruit; aucun retour avant 250 min à σ = 0 | ≥ 200 | No-go tant que le PDF n'est pas relu (valeurs, unité de ρ). Si non reproduite, le mécanisme « bruit » de E6.2 passe en exploratoire | P6 |
| T6.8 | N | abs(σ̂* − σ*)/σ* ≤ 1 %† pour v ∈ {1,5 ; 2 ; 3 ; 4 ; 6}; à σ = 0 : abs(ψ_A − ψ_B) < 10⁻³† à T = 200; à σ = 2σ* : abs(ψ_A − ψ_B) > 0,3† | déterministe, 1 par point | Go immédiat; **bloquante pour E6.4**. Même test que A4 de P5 (tolérance 2 %, dossier p5) : un seul code | P6 (module partagé avec P5) |
| T6.9 | R | P(choix du troisième) ≥ 0,9† et aucune décision avant t = 30 dans ≥ 90 %† des essais | 200 | **Bloquée** tant que le Texte S1 n'est pas lu; non bloquante pour E6.4 | P6 |
| T6.10 | R (extension, non reproduction) | la carte contient les trois régimes; la scission n'apparaît que si σ < σ* et q < ψ_éq(v, σ) (v = 2 : 0,46 à σ = 0; 0,375 à σ = σ*; [I]); au-dessus de σ*, la décision exige q < ψ_gagnant (v = 2 : ≈ 0,59 à 1,5σ*; [I]) | 200 par point | Go si T6.8 est acceptée; aucun no-go : le résultat se rapporte quel qu'il soit | P6 |
| T6.11 | R; D pour la référence (TOST ± 20 %†) | référence à ± 20 %†; attaque ≤ 0,05† × référence; défense ≥ 30† × attaque | ≥ 20 (publié : 20 par configuration) | Go; **bloquante pour E6.7 (calibration du faux signal) et E6.8** | P6 |
| T6.12 | D (TOST ± 0,02†) | erreur quadratique moyenne ≤ 0,02† entre la trajectoire moyenne et la récurrence en espérance pour N = 10⁴; plateau à ± 0,02† de 1 − 2γ/β | 100 | Go; **bloquante pour E6.7** | P6 |
| T6.13 | R | modèle SI calé sur N = 10 prédit N = 20 à ± 1† tour (validation croisée à deux points seulement) | 100 | Go; non bloquante. Si échec : on rapporte qu'un SI simple ne prédit pas l'effet de N | P6 |
| T6.14 | R | modèle d'attrition : R² ≥ 0,95† de la décroissance simulée; part d'abandons sans suivi de 0,85 ± 0,10† (23/27 = 0,852) | 100 par essaim simulé | **Bloquée** jusqu'à la lecture de Seeley 2003; non bloquante : sans elle, le mécanisme « attrition » de E6.2 reste exploratoire | P6 |

**Parité.** Fourmi : T6.3 à T6.7 et T6.11 (essaim virtuel). Abeille : T6.8, T6.9, T6.10, T6.14. Agents : T6.12, T6.13. Les parasites n'ont de cible chiffrée ni côté fourmi ni côté abeille (aucun résultat chiffré lu) : asymétrie déclarée en 4.6. T6.12 et T6.13 calent un modèle abstrait sur des expériences LLM publiées; les rejouer avec de vrais agents relève de P7.

## 6. Expériences originales

Les niveaux des facteurs sont fixés au pilote et préenregistrés. Répétitions : 1 000 par cellule pour les agents à règle, 30 par cellule pour les agents LLM (dossier p7, §7.1; à 30 exécutions, taille d'effet détectable d'environ 0,74 sans appariement). Graines appariées entre cellules (nombres aléatoires communs). Chaque volet agentique inclut un **témoin orchestré à budget égal** d'appels et de jetons. Les volets LLM suivent les règles de paramétrage de P7 (plan de simulation) et la politique défensive (parallèle agentique). Hypothèses et seuils : section 3.

**E6.1. Du moulin à la boucle d'agents** (H6.1, H6.10)
- Plan : agents à règle qui choisissent la prochaine arête selon `exp(β·c)` avec traces dans un état partagé (extension de F3 à plusieurs marcheurs, avec oubli, bruit et condition d'arrêt); tâche : parcours d'un graphe d'étapes jusqu'à un état-but.
- Facteurs : oubli ρ (5 niveaux, de 0 à ρ_max fixé au pilote); bruit ε; condition d'arrêt {absente; présente}; architecture {chorégraphiée sans remède; chorégraphiée avec TTL; orchestrée à compteur de blocage (témoin)}; structure de tâche {séquentielle; décomposable}; N {1; 10; 100}; topologie {arbre; graphe à cycle}.
- Volet LLM (E6.1-L, exploratoire) : deux ou trois agents LLM sur une tâche à étapes dépendantes avec notes partagées et sans condition d'arrêt, contre le même scénario avec compteur de blocage orchestré; issues codées selon MAST (FM-1.3, FM-1.5).
- Témoin orchestré : compteur de blocage de Fourney et al. 2024 (seuil 2, balayé en sensibilité).
- Lecture : contrastes appariés de P(piégeage) et du temps de sortie, IC 95 %; règle de décision de H6.1 et premier contraste de H6.10. **Porte :** T6.5 accepté.

**E6.2. Verrouillage, hystérésis et sortie** (H6.2)
- Plan : recrutement à rétroaction positive (F4 en version agents, SSA); balayage de n montant puis descendant pour mesurer l'hystérésis; à t_inv, inversion des qualités de deux sources; mesures de P(verrouillage) et de t½ (métrique S1 de P7).
- Facteurs : n (sous, dans, au-dessus de la région bistable, plus balayage); α {rare; fréquent}; mécanisme de sortie {pur; bruit (F5); encombrement (Grüter et al. 2012); attrition (B2)}; amplitude du mécanisme.
- Témoin : borne orchestrée (répartiteur central informé des qualités, qui réalloue à t_inv), pour fixer ce que l'auto-organisation perd.
- Lecture : H6.2; aire de la boucle d'hystérésis > 0 (IC 95 % excluant 0). **Portes :** T6.6, T6.7, T6.14 acceptées ou déclassées en exploratoire.

**E6.3. Cascade en séquence visible** (H6.3)
- Plan : N agents répondent un à un à une question fermée à signal privé bruité, en voyant ou non les réponses antérieures. Règle : suivi de la majorité visible (Bikhchandani et al. 1992; *Modèle simplifié*). LLM (exploratoire) : items fermés procéduraux générés à la volée (évite la contamination), modèles de P7.
- Facteurs : visibilité {masquée; visible}; corrélation des erreurs {faible; forte}; vérificateur {aucun; décentralisé indépendant; central}; N.
- Témoin orchestré : vérificateur central indépendant placé avant l'amplification.
- Lecture : P(issue erronée \| première réponse erronée); n_eff (méthode de Kohli 2026) pour la corrélation des erreurs LLM; H6.3. **Porte :** aucune côté règle; pilote LLM (R7) côté LLM.

**E6.4. Carte des régimes d'indécision** (H6.4)
- Plan : B1, d'abord déterministe (k = 0) puis stochastique (k = 0,05, valeur de Pais et al. 2013); balayage bidimensionnel de σ/σ* et de q, pour plusieurs v; classification des issues à l'horizon T : décision (un site au quorum), interblocage (aucun), scission (deux). Distinction **adaptatif ou pathologique** : `σ*(v)` décroît quand v croît, donc l'interblocage se maintient pour des options médiocres et se lève pour de bonnes (Pais et al. 2013; audit bio-abeilles).
- Facteurs : σ/σ*; q; v {1,5; 2; 3; 4}; k {0; 0,05}. Répétitions : 1 par point (déterministe), 200 par point (stochastique, comme T6.10).
- Lecture : H6.4 (frontières et position par rapport à ψ_éq et à ψ_gagnant); carte publiée avec IC. **Porte :** T6.8 acceptée; T6.9 non requise. Pas de témoin orchestré (analyse de modèle; l'arbitre central est traité en E6.5).

**E6.5. Remèdes de l'indécision côté agents** (H6.5, H6.10)
- Plan : k-sur-n agents à règle choisissent entre deux plans incompatibles de valeur égale; engagement par recrutement et abandon (règle dérivée de B1). LLM (exploratoire) : dix agents, deux plans incompatibles de valeur égale, échanges de messages; issues {décision, interblocage, scission, refus} codées séparément (comme en P7).
- Facteurs : mécanisme {aucun; verrou exclusif; inhibition ciblée; inhibition non ciblée; arbitre central (témoin)}; quorum q; N {10; 100}.
- Lecture : H6.5 (trois signes); scission, interblocage, temps de décision, messages (coût). **Portes :** T6.8 acceptée; E6.4 réalisée.

**E6.6. Gardiens et usurpation** (H6.6)
- Plan : F7 avec candidats légitimes et usurpateurs à profil proche; k gardiens à erreurs indépendantes ou corrélées. Volet LLM (exploratoire) : des juges LLM vérifient la cohérence d'une « carte d'agent » **synthétique** (champs d'identité fictifs, sans lien avec un protocole en service) contre un registre; un usurpateur est une carte dont un champ est falsifié de façon bénigne.
- Facteurs : k {1; 3; 5; 9}; règle d'admission m {tous; majorité}; corrélation {indépendante; par facteur commun}; LLM : {même modèle et même consigne; familles de modèles différentes}; distance d'identité {proche; éloignée}.
- Témoin orchestré : registre central à signature (analogue des cartes d'agent signées de A2A 2026, signalées par l'audit choregraphie-agentique, à relire dans la spécification), un seul vérificateur détenant la clé.
- Lecture : H6.6; n_eff à comparer au constat de Kohli 2026 (9 juges ≈ 2 votes effectifs [R]). Un résultat nul est admis (R9). **Porte :** pilote LLM.

**E6.7. Propagation : persistance × topologie × défense** (H6.7, H6.8, H6.10)
- Plan : SI sur un graphe d'agents avec médium partagé (couche 3); calibration préalable sur T6.12 et T6.13, puis plan factoriel. Volet LLM (exploratoire, bac à sable) : dix agents; l'« infection » est la reproduction d'un **marqueur inerte** (jeton aléatoire produit par le harnais, sans effet, sans outil, sans réseau, sans donnée réelle).
- Facteurs : persistance τ½ {éphémère; TTL court; TTL long; sans expiration}; topologie {aléatoire; modulaire à nombre de ponts décroissant; étoile (orchestrateur)}; β, γ; défense {aucune; marquage de provenance (analogue du « LLM Tagging » de Lee et Tiwari 2024); expiration et réputation (analogue de la prudence); filtre central (témoin)}; position de la source {pair; orchestrateur}; structure de tâche {décomposable; séquentielle}.
- Témoin orchestré : passerelle de filtrage central, à budget égal.
- Lecture : fraction finale, tour d'infection complète, seuil effectif, G, messages (H6.7, H6.8, second contraste de H6.10). **Portes :** T6.11 et T6.12 acceptées; politique défensive appliquée.

**E6.8. Détracteurs et prudence étendus** (H6.9)
- Plan : F6 après T6.11; balayage de la fraction de détracteurs, de l'évaporation du faux signal et de la patience; canal éphémère à portée locale (sans persistance) comparé à la piste persistante.
- Facteurs : fraction de détracteurs; évaporation du faux signal {comme le vrai; lente; nulle}; patience; canal {piste; diffusion éphémère}. Répétitions : au moins 20 par configuration (publié), davantage autour de f_c (à fixer au pilote).
- Témoin orchestré : sans objet (essaim virtuel sans agent LLM); une extension LLM éventuelle se confond avec E6.7.
- Lecture : f_c par canal (H6.9). **Porte :** T6.11 acceptée.

**E6.9. Codage des échecs : MAST et taxonomie P6** (QR2d)
- Plan : annoter les traces d'échec de E6.1-L, E6.3, E6.5 et E6.7 (et celles de P7 si disponibles) selon les 14 modes de MAST et selon la taxonomie P6 (codes D, I, C, X du parallèle agentique); deux annotateurs humains, puis un juge LLM.
- Mesures : κ inter-annotateurs; matrice de correspondance (fréquence par mode MAST et par code P6); modes MAST sans correspondant; pathologies P6 sans mode MAST.
- Lecture : κ ≥ 0,70† entre deux annotateurs sur 30 traces avant d'utiliser le juge LLM, puis κ du juge ≥ 0,70† sur 30 autres (règle du dossier p7, §5, sur l'annotation MAST; repères : κ humain 0,88 et κ du juge LLM 0,77 chez Cemri et al. 2025). Chaque correspondance du tableau de 7.1 est confirmée, révisée ou déclarée non appuyée. Les prévalences mesurées sur nos traces ne se comparent pas à celles de Cemri et al. 2025. **Portes :** traces disponibles; pilote LLM.

## 7. Parallèle agentique

Chaque ligne énonce une **relation** (ce qui produit l'échec), pas une ressemblance de vocabulaire. Chaque côté est sourcé; la mise en correspondance elle-même est une inférence [I]. En informatique, une chorégraphie est un plan global explicite; une colonie n'en a aucun. Les systèmes de P6 sont des auto-organisations, **stigmergique** (état partagé persistant) ou **par signaux directs** (diffusion éphémère); le témoin orchestré est le régime « plan global, contrôle central » de la typologie du cadre.

### 7.1 Taxonomie P6 et relations

Taxonomie propre aux échecs de colonies, en trois couches [I, construite par la fiche d'après la recommandation de classer par couche de l'audit bio-abeilles] : **D** dynamique (l'échec naît de la dynamique du collectif); **I** identité (un acteur usurpe une identité, un statut ou une capacité); **C** canal (un signal faux ou contaminé circule dans le médium). **X** : mode propre aux agents, sans analogue biologique vérifié.

| Code | Pathologie (taxon, source) | Relation (ce qui produit l'échec) | Analogue agentique (mode MAST candidat [I]) | Remède biologique | Remède agentique à tester | Statut épistémique |
|---|---|---|---|---|---|---|
| **D1** | Moulin (*Eciton*; Schneirla 1944 [T]; Erhard et al. 2022 [T]) | Renforcement orienté sans oubli : chacun suit la trace du précédent; piégeage presque sûr sur graphe non arborescent (Th. 2.2) | Boucle d'étapes sur un état partagé relu sans condition d'arrêt (FM-1.3, 15,7 %; FM-1.5, 12,4 %) | Évaporation; bruit (Dussutour et al. 2009 [non vérifiée]); décrochage d'une traînarde (Beebe 1921 [non vérifiée]) | TTL, bruit local (chorégraphie); compteur de blocage (orchestré; Fourney et al. 2024) | *Modèle simplifié* (E6.1); *Analogie* |
| **D2** | Verrouillage (*M. pharaonis*; *Temnothorax*; Beekman et al. 2001 [non vérifiée]; Sasaki et al. 2013 [R]) | Rétroaction positive plus bistabilité : l'état initial persiste | Conformisme et cascade en débat (Wynn et al. 2025 [R]); pas de mode MAST dédié, voisins FM-3.2 et FM-3.3 | Attrition (*A. mellifera*; Seeley 2003 [non vérifiée]); encombrement (Grüter et al. 2012 [R]) | Décroissance du poids des anciens messages [I]; vérification indépendante avant amplification | *Modèle simplifié* (E6.2, E6.3); *Analogie* |
| **D3** | Interblocage de l'essaim (*A. mellifera*; Seeley et al. 2012 [R]; Pais et al. 2013 [T]) | Deux populations égales sans inhibition croisée suffisante (σ < σ*); **adaptatif** si les options sont médiocres | Agents qui attendent un consensus qui ne vient pas (candidats FM-1.5, FM-3.1) | Inhibition croisée ciblée (signal d'arrêt) | Veto ciblé; délai de grâce; arbitre (orchestré) | *Résultat reproduit* (T6.8) pour le modèle; *Analogie* pour les agents |
| **D4** | Scission (Lindauer 1955 [non vérifiée]; Seeley et Visscher 2003) | Quorum atteint avant le consensus (q < ψ_éq) | Double engagement sur deux plans incompatibles (candidat FM-2.5) | Retour en grappe, nouvel essai | Verrou ou quorum exclusif; arbitre | *Hypothèse de l'auteur* (E6.4, E6.5) |
| **I1** | Mimétisme chimique et acoustique (*Maculinea*/*Myrmica*; Akino et al. 1999; Barbero et al. 2009 [R]) | Imiter le profil de reconnaissance pour être admis avec un statut élevé | Usurpation d'identité ou de capacité (carte d'agent usurpée); hors MAST | Reconnaissance collective par plusieurs gardiens (Johnson et al. 2011); course aux armements (Nash et al. 2008) | Vérificateurs indépendants; cartes signées (orchestré : registre) | *Modèle simplifié* (E6.6); *Analogie* |
| **I2** | Camouflage chimique d'*Acherontia atropos* (Moritz et al. 1991 [M]) | Contourner la reconnaissance des congénères; **mécanisme non lu, non décrit** | idem I1 | idem I1 | idem I1 | *Analogie* |
| **I3** | Pseudo-reine *A. m. capensis* (Neumann et Moritz 2002 [non vérifiée]; Oldroyd 2002 [M]) | Initiée qui usurpe un signal d'autorité et se réplique (parasite intraspécifique) | Agent compromis qui se réplique (Prompt Infection, Morris II, Agent Smith); hors MAST | Rejet amélioré après expositions répétées (Neumann et Pirk 2019 [R]) | Mémoire d'incidents, quarantaine [I] | *Analogie* |
| **C1** | Faux signal persistant (Aswale et al. 2022 [T]); propagande (Allies et al. 1986‡) | Un signal faux non évaporé détourne l'action des coopératrices | Injection indirecte dans le médium partagé (Greshake et al. 2023 [R]); document empoisonné (Cohen et al. 2024 [R]) | Phéromone de prudence (remède artificiel, non observé chez la fourmi) | Expiration, réputation des entrées [I] | *Résultat reproduit* (T6.11); *Analogie* pour le RAG |
| **C2** | Propagation, pillage (Peck et Seeley 2019 [R]) | Importation d'une infection depuis une colonie qui s'effondre | Agent qui consomme les sorties d'un agent compromis [I]; propagation autoréplicante (Gu et al. 2024; Lee et Tiwari 2024) | Seuils de garde resserrés (Couvillon et al. 2008 [M], titre seul) | Filtrage adaptatif, modularité | *Modèle simplifié* (T6.12, T6.13); *Analogie* |
| **X1** | Aucun analogue biologique vérifié (les colonies tolèrent la perte) | Action irréversible sans compensation | Effets de bord à compenser (sagas : Garcia-Molina et Salem 1987) | — | Compensation; traces rejouables | *Analogie* limite (audit choregraphie-agentique) |

Les statuts *Résultat reproduit* ne valent qu'après acceptation de la cible citée. MAST décrit des échecs sans adversaire : il ne couvre que la couche D. Les couches I et C se rattachent à Hammond et al. 2025 (conflit, collusion) et à la taxonomie d'injection de Greshake et al. 2023 [I]. Les quatre échecs de coordination spatiale de SwarmBench (Ruan et al. 2025, via le dossier p9, reproduits par P9) s'inscrivent en D sans être reproduits ici.

### 7.2 Où l'analogie casse

1. **Identité contre action.** Le mimétisme usurpe une identité; l'injection détourne une action. Dans un système à canal textuel unique, données et instructions circulent par le même canal, ce qui n'a pas de pendant chez l'insecte [I; audit choregraphie-agentique, « environnement textuel »].
2. **Indépendance des vérificateurs.** Les gardiens de Johnson et al. 2011 sont de mauvais reconnaisseurs *indépendants*. Les vérificateurs LLM ont des erreurs corrélées (Kim et al. 2025 : accord d'environ 60 % quand deux modèles se trompent; Kohli 2026 : 9 juges valent environ 2 votes; Chen 2026 : précision d'un vote bornée par 1 − β).
3. **Adversaire et intérêts.** La course aux armements hôte-parasite (Nash et al. 2008) est évolutive; l'attaquant d'un système d'agents est intentionnel et adaptatif. La coopération des insectes est un acquis évolutif, pas une hypothèse de protocole; des agents de mandants différents n'ont ni parenté ni police par défaut (audit choregraphie-agentique).
4. **Oubli.** L'évaporation est continue; la fenêtre de contexte est abrupte; le `ttlMs` de MCP est un indice de fraîcheur, pas un déclin d'intensité (MCP 2026; dossier p7, C8).
5. **Réversibilité.** Les colonies tolèrent la perte; les agents produisent des effets de bord à compenser (X1).
6. **Échelle.** Une société de 10 à 25 agents LLM est loin des colonies (10² à 10⁶ ouvrières, [non vérifié]); la région bistable de F4 (n de 476 à 910 pour α = 0,0045, [I]) n'est pas atteignable à 10 agents. Mitigation : agents à règle à N biologique, et hybride éventuel (question ouverte de P7).
7. **Moulin.** Il naît d'une rétroaction positive entre suiveurs; la répétition d'un agent LLM est souvent individuelle (dossier p7, §10). E6.1-L force un état partagé relu par plusieurs agents.
8. **Interblocage.** Chez l'essaim il peut être adaptatif; pour un agent qui attend sans fin, il est un coût (jetons, latence).
9. **Orchestrateur.** La colonie n'a pas de point unique; l'orchestrateur en est un (Triedman et al. 2025 [R] : du contenu adversarial détourne le contrôle et la communication d'un système multi-agents, 58 à 90 % des essais avec GPT-4o selon l'orchestrateur, jusqu'à 100 % dans certaines configurations, même quand les agents individuels refusent). La reine n'est pas un orchestrateur : « la reine ne commande pas » est un constat biologique borné, jamais une prescription d'architecture.

### 7.3 Témoin orchestré

| Expérience | Témoin orchestré | Piège à éviter |
|---|---|---|
| E6.1 | Compteur de blocage (Fourney et al. 2024) | L'orchestrateur ajoute un appel par tour : compter appels et jetons (dossier p7, §7.3) |
| E6.2 | Répartiteur central informé des qualités | Borne supérieure, non concurrent réaliste |
| E6.3 | Vérificateur central indépendant | Indépendance réelle (modèle différent), sinon n_eff trop faible |
| E6.5 | Arbitre central | Aucune scission ni interblocage par construction : comparer coût en messages et latence, pas l'issue |
| E6.6 | Registre central à signature | La clé est un point unique : sa compromission contourne tout |
| E6.7 | Passerelle de filtrage | Le filtre est lui-même une surface d'attaque |

L'orchestrateur est évalué comme **remède** (boucles, indécision) et comme **surface d'attaque** : c'est la dissociation de H6.10. Son gain ne se lit qu'à budget égal : un système orchestré consomme environ 15 fois les jetons d'un clavardage et l'usage de jetons explique 80 % de la variance de performance sur BrowseComp (Hadfield et al. 2025 [T], évaluation interne non reproductible).

### 7.4 Structure de tâche

Facteur de E6.1, E6.7 et H6.8 : **décomposable** (sous-tâches indépendantes agrégées) ou **séquentielle** (chaîne de dépendances). Appui publié (Kim et al. 2025a [T], dossier p8) : le contrôle centralisé gagne +80,8 % en finance décomposable, le décentralisé +9,2 % en navigation web dynamique; en planification séquentielle, toute variante multi-agents baisse de 39 à 70 %; amplification d'erreur de 17,2× (indépendants), 7,8× (décentralisé), 5,1× (hybride), 4,4× (centralisé). Prédictions de P6 [I] : (a) pour les boucles, l'avantage de l'orchestrateur se concentre sur les tâches séquentielles (H6.10); (b) pour la propagation, la partition limite la contamination à faible coût en décomposable, alors qu'en séquentiel l'infection traverse la chaîne sans dilution et la modularité coûte du gain (H6.8). Aucune généralisation au-delà des tâches et modèles étudiés.

### 7.5 Volet sécurité : périmètre défensif

Le programme général d'éthique et de science ouverte est dans [08-science-ouverte-ethique](../docs/08-science-ouverte-ethique.md); cette fiche en fixe la partie propre à P6.
- **Aucun code ou contenu d'attaque opérationnel** dans les livrables (dépôt, pages, notes, données) : ni charge utile d'injection, ni consigne de contournement, ni script d'exploitation, ni mode d'emploi contre un produit nommé.
- **Infection simulée sans charge** : modèles abstraits à états (SI); pour les LLM, un **marqueur inerte** (jeton aléatoire produit par le harnais, sans effet) dans un bac à sable sans outil, sans réseau et sans donnée réelle. La consigne exacte n'est pas publiée; seul un gabarit neutre, en prose, l'est. L'« usurpation » ne porte que sur des identités synthétiques fictives.
- **Aucune expérience contre un système tiers**, un fournisseur ou un protocole en service. Toute vulnérabilité réelle observée fortuitement fait l'objet d'une divulgation responsable au fournisseur avant toute publication.
- **Publication des mesures** (courbes, seuils, défenses), pas des charges. Revue interne avant dépôt public. Aucune page n'offre de champ de texte libre transmis à un LLM.
- **Refus des classifieurs** (`stop_reason: "refusal"`) : codés comme issue par une règle préenregistrée, jamais comme donnée manquante (dossier p7, §7.3).
- **Lien avec EscapeBench et LeakLab.** Ce sont des bancs de réfutation du chercheur (série Go, dépôt SpecDrivenDev), absents du dépôt colonies-agentique et non relus pour cette fiche. Le lien est **méthodologique** [I] : hypothèses numérotées avec verdict confirmé ou infirmé, harnais de rejeu de non-régression, verdicts dépendants de la plateforme déclarés comme tels (ici : du modèle LLM et de sa version). Pour LeakLab, la détection d'interblocages logiciels est une piste de rapprochement avec E6.5, à confirmer par le chercheur. Aucun code partagé; aucune frontière de langage (cadre : TypeScript partout).

### 7.6 Lien avec P7

- P6 livre à P7 la taxonomie de codage (MAST plus codes P6) et les issues d'échec codées (scission, interblocage, refus), pour la « carte des pannes » de P7.
- P6 propose à P7 une condition de perturbation « agents compromis » (variation de G après compromission d'une fraction d'agents, en complément du retrait de 30 % des agents du cadre).
- P7 fournit à P6 son harnais LLM, ses règles de paramétrage et ses statistiques; la grille de P7 n'est pas refaite.
- **H2 de P7** (après inversion des qualités, t½ de la piste supérieur à t½ de la danse) est le pendant de H6.2 et H6.7 : la persistance du médium sert à la fois la rigidité et la propagation. Les deux projets partagent le facteur de persistance (τ du vecteur R).
- Rien dans P7 ne dépend de P6; en cas de retard de P6, P7 poursuit sans la condition de compromission.

## 8. Visuels et trois niveaux

Les visuels du moulin (manège de Barro Colorado, carte des phases de Couzin et al. 2002, tronçon circulaire) relèvent de P9; P6 les relie à V6.1. Charte et gabarit : [vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md). Public principal déclaré : V6.1 à V6.5 grand public et étudiants; V6.6 à V6.8 praticiens de l'agentique et chercheurs.

| ID | Titre | Sources et cibles | Niveaux | Statut épistémique |
|---|---|---|---|---|
| V6.1 | « Une trace qui ne s'efface pas » | E6.1, T6.5 | Voir, Explorer | *Modèle simplifié*; *Analogie* (boucle d'agents) |
| V6.2 | « La courbe en S » | T6.6, T6.7, T6.14, E6.2 | Voir, Explorer, Vérifier | *Résultat reproduit* après T6.6; *Modèle simplifié* |
| V6.3 | « Décider, bloquer ou se scinder » | T6.8 à T6.10, E6.4 | Voir, Explorer, Vérifier | *Résultat reproduit* (σ*); *Hypothèse de l'auteur* (ψ_éq); récit de Lindauer [non vérifiée] |
| V6.4 | « Le cheval de Troie chimique » | F7, E6.6 | Voir, Explorer | *Modèle simplifié*; *Analogie* (usurpation d'identité) |
| V6.5 | « Une pseudo-reine » | *A. m. capensis*; encart « Ce que fait vraiment la reine » | Voir | *Analogie*; [non vérifiée] |
| V6.6 | « De la phéromone trompeuse au RAG empoisonné » | T6.11 à T6.13, E6.7, E6.8 | Voir, Explorer, Vérifier | *Résultat reproduit* (T6.11, T6.12); *Analogie* pour le RAG |
| V6.7 | « Un orchestrateur : remède ou point faible? » | H6.10, E6.1, E6.7 | Explorer, Vérifier | *Hypothèse de l'auteur* tant que H6.10 n'est pas testée |
| V6.8 | « Table de correspondance MAST » | E6.9 | Vérifier | *Analogie*, étiquetée mode par mode |

### Voir

- **Montré.** Récit guidé court, avec **prédiction avant révélation** : V6.1 « Si la trace ne s'efface jamais, que devient la file? »; V6.3 « Deux sites égaux, signal d'arrêt insuffisant : l'essaim décide-t-il? »; V6.4 « Un intrus à l'odeur presque identique passe-t-il un gardien? Dix? »; V6.6 « Combien de détracteurs coupent la collecte? » (0,39 % [T] n'apparaît qu'après la prédiction). V6.5 présente la pseudo-reine avec l'encart sur la reine.
- **Manipulé.** Un seul curseur ou un bouton « Révéler »; aucune exécution libre.
- **Objectifs d'apprentissage** (mesurables; instrument, pré-test, post-test et condition témoin statique dans [vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md)) :
  - **OA1** prédire si une règle de renforcement sans oubli referme un système en boucle, et nommer deux remèdes (oubli, bruit) [V6.1];
  - **OA2** distinguer interblocage et scission sur la carte des régimes et nommer le paramètre qui fait passer de l'un à l'autre (quorum, inhibition) [V6.3];
  - **OA3** expliquer pourquoi un médium persistant amplifie un faux signal plus qu'un canal éphémère, avec un chiffre lu sur la page [V6.6];
  - **OA4** distinguer l'usurpation d'identité du détournement d'action et citer une défense décentralisée avec son coût [V6.4, V6.6];
  - **OA5** énoncer pourquoi l'orchestration corrige certaines pathologies et en aggrave d'autres [V6.7].

### Explorer

- **Montré et manipulé.** V6.1 : β, oubli ρ, bruit, N, condition d'arrêt, bouton « compteur de blocage orchestré ». V6.2 : n, α, mécanisme de sortie (bruit, encombrement, attrition), bouton « aider la colonie » (amorcer une piste), inversion des qualités. V6.3 : **carte (σ/σ*, q) dont chaque cellule est cliquable** et lance une mini-simulation; v; bouton « supprimer les signaux d'arrêt » (σ = 0, étiqueté « test d'implantation »). V6.4 : seuil d'acceptation, nombre de gardiens k, corrélation des erreurs. V6.6 : persistance, modularité (partition en modules), défense, fraction de détracteurs. V6.7 : architecture, position de la source d'infection.
- **Vue de l'agent.** Marcheur ou fourmi : voisinage, compteurs sur les arêtes, probabilité de chaque choix (la fourmi « bascule avec une probabilité », elle ne « décide » pas). Éclaireuse : engagement ψ, signaux perçus (danse, arrêt), probabilité d'abandon, âge de l'engagement. Gardien : profil perçu (bruité), seuil, distance, décision; les k gardiens côte à côte avec leurs erreurs. Agent LLM : ce qu'il lit (éléments du médium avec provenance et âge), ce qu'il écrit, TTL; uniquement des marqueurs inertes.
- **Modifier la règle.** β, ρ, bruit; quorum q; ajout d'une inhibition ciblée σ ou d'un verrou exclusif; seuil d'acceptation; TTL; marquage de provenance; partition en modules; ajout d'un compteur de blocage. Chaque modification relance l'exécution et affiche une **distribution** sur plusieurs graines, jamais une trajectoire unique.
- **Objectifs d'apprentissage.** OA1 à OA5 (avec manipulation).

### Vérifier

- **Montré.** Reproduction des cibles T6.x en distribution sur N graines (histogrammes, IC 95 %), cible et tolérance affichées, valeurs [à confirmer] affichées telles quelles, écarts au registre des déviations, code, lien vers le préenregistrement, statut épistémique de chaque énoncé, encart « ce que la page ne montre pas » (validation empirique).
- **Manipulé.** Choix de la graine, du nombre de répétitions, de la tolérance; export des données; rejeu.
- **Objectifs d'apprentissage.** Lire une distribution et un critère d'acceptation; distinguer **réplication** et **validation**; reconnaître un énoncé *Analogie*.

### Accessibilité propre au projet

- Animations de boucle ou de spirale : version statique par étapes et respect de `prefers-reduced-motion`.
- État sain ou infecté, signal vrai ou faux : jamais par la couleur seule; pictogramme et motif en plus de la charte (fourmi #D55E00, abeille #0072B2, agent #CC79A7); viridis ou cividis pour la fraction infectée et les grandeurs continues.
- Carte des régimes : navigation au clavier (flèches), chaque cellule annoncée (« σ/σ* = …, q = … : interblocage »); alternative en tableau texte; repli en liste sur mobile.
- Graphes de réseau (modularité) : description textuelle et matrice d'adjacence navigable.
- Curseurs : pas au clavier, valeur lue par le lecteur d'écran; courbes avec texte alternatif et table de données (niveau Vérifier).
- Les tests automatisés ne couvrent qu'une partie des problèmes (Deque 2021, étude de fournisseur) : test manuel au clavier et au lecteur d'écran avant publication. WCAG 2.2 AA (cadre).

### Erreurs de compréhension à prévenir

| Erreur | Prévention |
|---|---|
| « Les fourmis du moulin sont stupides ou suicidaires » | Présenter le moulin comme le mode d'échec d'une règle habituellement efficace; vocabulaire sans téléologie |
| « Le tore de Couzin et al. 2002 est un moulin de fourmis » | Contrepoint étiqueté : même motif, autre mécanisme (poissons, 3D) |
| « Interblocage égale scission », ou « l'interblocage est toujours mauvais » | Carte des régimes à trois issues; interblocage adaptatif pour options médiocres (Pais et al. 2013) |
| « Le mimétisme est une injection » | Deux pictogrammes distincts : usurpation d'identité et détournement d'action |
| « Le parasite est rusé » | Vocabulaire neutre : il imite des hydrocarbures et des sons; pas d'intention |
| « La reine commande, ou a été remplacée sur ordre » | Encart « Ce que fait vraiment la reine » (cadre); *capensis* = usurpation d'un signal de reproduction. Les explications causales erronées des processus émergents sont documentées (Chi et al. 2012) |
| « Décentralisé est plus sûr » ou « orchestré est plus sûr » | V6.7 montre les deux faces |
| « L'évaporation est un oubli volontaire » | Trois formes d'oubli (évaporation, abandon, attrition) distinguées |
| « L'injection de prompt est un virus biologique » | Étiquette *Analogie*; aucune immunité biologique présentée comme acquise |

## 9. Plan de simulation

**Couche 1, noyau commun** (S0, voir [spécification de simulation](../docs/05-spec-simulation.md)) : PRNG à graine (Blackman et Vigna 2021), horloge à pas fixe, RK4, SSA de Gillespie, événements discrets, grille, enregistreur, scénario, manifeste de run. **Exigence ajoutée :** l'intégrateur Euler–Maruyama (requis par B1 et F5; convention du dossier x-choregraphie) doit figurer au noyau, sinon P6 l'y ajoute.

**Couche 2, modèles de référence** (un par article; F1 et F2 : P9).

| Modèle | Type | Pas et intégrateur | N d'agents | Répétitions | Horizon | Cible |
|---|---|---|---|---|---|---|
| F3 | marche discrète | séquentiel | 1 (N > 1 en E6.1) | 1000 | n = 10⁵ (ℤ), 10⁶ (grille) | T6.5 (P9) |
| F4 | EDO, SSA | RK4; SSA | n = 300 et 700, plus balayage | 100 par condition | jusqu'à l'équilibre | T6.6 |
| F5 | EDS | Euler–Maruyama, dt ≤ 0,01 (unités du modèle) | champ moyen | ≥ 200 | au-delà de 250 min [à confirmer] | T6.7 |
| B1 | EDS ou EDO | Euler–Maruyama; RK4 pour k = 0 | 2 populations | 1 (k = 0); 200 (k = 0,05) | T = 200 (T6.8) | T6.8 à T6.10 |
| B2 | agents | pas fixe | N danseuses | 100 | jusqu'à l'arrêt | T6.14 |
| F6 | agents sur grille | Δt = 0,016 | n = 1024 | ≥ 20 par configuration | 50 000 pas | T6.11 |
| G1 | chaîne de Markov | tour | N = 10⁴ | 100 | jusqu'au plateau | T6.12 |
| G2 (SI) | pas discret | tour | N = 10 et 20 | 100 | jusqu'à l'infection complète | T6.13 |
| F7 | Monte-Carlo | — | k gardiens (1 à 9) | 1000 | — | E6.6 |

**Couche 3, modèle chorégraphique commun** : seul le canal change (persistance, portée, adressage, format). Pour P6, état d'agent {sain, infecté} ou rôle {coopératrice, détracteur}; médium avec TTL; topologie (aléatoire, modulaire, étoile); défenses (marquage de provenance, expiration, réputation, filtre central); témoin orchestré. Agents LLM branchés par le harnais (volet B).

**Docking** (cadre, principe 6; Axtell et al. 1996) : le modèle commun, configuré comme chaque référence, reproduit sa sortie.

| Référence | Configuration du modèle commun | Sortie comparée | Critère † |
|---|---|---|---|
| F3 | un marcheur, médium = compteurs orientés, ρ = 0 | X_n/n; circuit piégé | critères de T6.5 |
| F4 | agents (SSA) à n grand contre EDO | équilibres | écart ≤ 5 %† à n = 10³ |
| B1 | version agents à seuils, N grand, contre EDS | frontière σ* | écart ≤ 5 %† |
| F6 | « piste plus détracteurs » | nourriture par coopératrice | à ± 20 %† de F6 (TOST) |
| G1 | SI sur graphe complet | c_t | critère de T6.12 |

**Pas de temps :** F1, Δt = 0,02 s; F2, τ = 0,1 s; F6, Δt = 0,016; B1 et F5, dt ≤ 0,01 en unités du modèle; agents : tour discret.

**Graines.** Liste fixe dans le manifeste de run. Graines de calibration (pilote) distinctes des graines de confirmation, tirées après gel du code et du préenregistrement. Graines appariées entre cellules (nombres aléatoires communs; dossier p7, §6.1).

**Budgets de performance** (estimations [I], à mesurer au pilote) :
- F6 : 1024 agents × 32 vecteurs de sondage × 50 000 pas ≈ 1,6 × 10⁹ lectures de grille par exécution; 20 exécutions ≈ 3,3 × 10¹⁰ par configuration. Cible : ≤ 10 min† par configuration sur le poste de référence (Node, plusieurs `worker_threads`).
- Carte de E6.4 : 40 × 40 points × 200 répétitions × (T/dt = 2 × 10⁴ pas) ≈ 6,4 × 10⁹ pas d'Euler–Maruyama. Cible : ≤ 10 min†.
- Autres campagnes headless : ≤ 1 h† chacune; sinon réduire la grille avant d'envisager WASM (cadre : seulement avec mesure à l'appui).
- Navigateur : chaque cellule cliquable de la carte des régimes lance une exécution courte (≤ 2 s†) à N réduit; la carte complète est précalculée en headless et servie comme données.

**Volet LLM (B), règles de P7 reprises** (dossier p7, §7.3 et §7.5) : journaliser `model`, `usage`, `stop_reason`, latence; **aucun fallback** (ils changent de modèle); effort fixé explicitement; échantillonnage par défaut (`temperature` non réglable sur les modèles récents); sorties structurées avec un schéma d'action unique; refus codés comme issue; ordre des messages permuté (graine journalisée); cellule sentinelle hebdomadaire contre la dérive; rejeu = réexécuter l'environnement à partir des sorties journalisées, sans rappeler l'API. E6.6 exige au moins deux familles de modèles, dont un d'un autre fournisseur ou à poids ouverts (audit choregraphie-agentique, constats du projet 7). Identifiants, tarifs et disponibilité (retrait possible de Haiku 4.5 dès le 2026-10-15) se reconfirment avant toute exécution (Anthropic 2026a, Anthropic 2026b). Ordre de grandeur par cellule : environ 1,00 $ par exécution (N = 10, 30 tours, niveau L2, Sonnet 5.5), soit environ 30 $ pour 30 exécutions [I, dossier p7 §8.1, tarifs à reconfirmer]; le nombre de cellules et le budget total se fixent au pilote.

**Sorties.** JSON Lines par exécution plus manifeste de run (graine, version du code, paramètres, empreinte; pour les LLM, identifiant de modèle et paramètres), figures, tableaux de résultats, rapport de docking, registre des déviations. Formats dans la spécification de simulation.

## 10. Livrables et critères d'achèvement

| # | Livrable | Critère d'achèvement vérifiable |
|---|---|---|
| 1 | **Registre de lecture** des sources bloquantes | Beekman et al. 2001, Dussutour et al. 2009, Seeley 2003 et le Texte S1 de Pais et al. 2013 lus dans le PDF; pour chacune, valeurs relues ou marque [à confirmer] maintenue. Lindauer 1955, Seeley et Buhrman 1999, Neumann et Moritz 2002, Zakir et al. 2022, Beebe 1921, Moritz et al. 1991 et Couvillon et al. 2008 : lus ou statut inchangé et justifié |
| 2 | **Fiches de reproduction** T6.6 à T6.14, écrites avant le code | Chaque fiche porte équations, paramètres, unités, protocole, figure cible numérisée, critère chiffré; l'historique du dépôt les date avant le premier commit du module correspondant |
| 3 | **Code** (TypeScript) : F4, F5, B1 (partagé avec P5), B2, F6, F7, G1, SI, adaptation de la couche 3 | `tsc --noEmit` sans erreur; tests unitaires verts; **script de contrôle `p6_checks` recréé** (σ*(v), valeur propre à σ = 0, ψ_éq, bornes [476 ; 910], 0,4621), qui affiche « checks OK » |
| 4 | **Rapport de docking** | Les cinq configurations du plan de simulation passent leur critère |
| 5 | **Reproductions** T6.6 à T6.14 | Chaque cible est acceptée, rejetée ou en dérogation consignée au registre des déviations; T6.9 et T6.14 peuvent rester « bloquées » avec raison écrite |
| 6 | **Expériences** E6.1 à E6.9 | Exécutées selon le plan préenregistré; données et manifestes de run archivés; rejeu à graine fixe identique; **verdict par hypothèse** H6.1 à H6.10 (confirmée, réfutée, non concluante) avec IC; résultats négatifs publiés; registre des hypothèses tenu à jour |
| 7 | **Préenregistrement** | H confirmatoires, plan, métriques, règles d'exclusion (refus, échecs d'analyse), horodatés **avant** les graines de confirmation; dépôt public (voir [08-science-ouverte-ethique](../docs/08-science-ouverte-ethique.md)) |
| 8 | **Note de recherche** | Contient la taxonomie P6 (tableau de 7.1), les statuts épistémiques, « où l'analogie casse », les limites et le registre des déviations; contrôle automatique : toutes les étiquettes `[Nom année]` existent dans la bibliographie, aucun nombre sans source ni marque; chaque énoncé de transposition porte un statut |
| 9 | **Pages** V6.1 à V6.8 | Trois niveaux; statut épistémique visible; accessibilité (WCAG 2.2 AA, test manuel au clavier et au lecteur d'écran); carte des régimes cliquable; aucun champ de texte libre transmis à un LLM |
| 10 | **Évaluation pédagogique** | Pré-test, post-test et condition témoin statique pour au moins V6.1, V6.3 et V6.6, analysés selon [vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md); avis du comité d'éthique avant toute collecte auprès d'apprenants (EPTC 2 : CRSH et al. 2018) |
| 11 | **Conformité défensive** | Balayage automatique du dépôt (aucune charge utile ni consigne d'attaque : liste de motifs) et revue signée; journal de divulgation (vide ou renseigné) |
| 12 | **Contrôle des identifiants** | T6.1 à T6.14, H6.1 à H6.10, E6.1 à E6.9 sans trou ni doublon dans la fiche, le plan de recherche et les pages |

**P6 est achevé** quand les livrables 1 à 12 sont satisfaits, que chaque cible est dans un état terminal (acceptée, rejetée, dérogation, bloquée avec raison) et que chaque hypothèse a un verdict.

## 11. Risques et réserves

| # | Risque ou réserve | Effet | Plan B ou parade |
|---|---|---|---|
| R1 | **Huit références au contenu non relu** (Beebe 1921, Lindauer 1955, Seeley et Buhrman 1999, Seeley 2003, Neumann et Moritz 2002, Beekman et al. 2001, Dussutour et al. 2009, Zakir et al. 2022); **Moritz et al. 1991 et Couvillon et al. 2008 connus par métadonnées seulement**. La bibliographie marque certaines de ces entrées « vérifiée » ou « corrigée » (métadonnées et résumés); le dossier p6 marque le contenu non relu : on suit le dossier pour les valeurs | Bloque T6.6, T6.7, T6.14; T6.10 reste qualitatif; V6.3 (récit) et V6.5; mécanisme d'*Acherontia* non décrit | Lire les PDF avant les fiches de reproduction; sinon déclasser en *Modèle simplifié* ou *Analogie* et maintenir les marques |
| R2 | **Valeurs [à confirmer]** : Beekman (éq. 1, β, s, α, colonies de 300 et 700, nourrisseur à 50 cm); Dussutour (60 et 180 mm, blocage de 60 à 120 min, 16/21, q₁, q₂, k, ρ et son unité, plus de 250 min); Beebe (1200 pieds, vitesse, 2 h 30 par tour); Seeley 2003 (23 sur 27, 6 essaims, −15,7 circuits par retour); Seeley et Buhrman 1999 (douzaine de sites, environ une heure); Lindauer 1955 (20 000 à 30 000 abeilles); θ_a = 1000 °/s (Couzin et Franks 2003, lu sur une capture); définition de γ et β (Gu et al. 2024). Les bornes [476 ; 910] sont recalculées à partir de l'équation **transcrite**, non de la source | T6.3, T6.6, T6.7, T6.14, E6.7 | Relire; analyse de sensibilité; sinon élargir les tolérances et les marquer |
| R3 | **T6.9 bloquée** (Texte S1 de Pais et al. 2013 : v_A, v_B, v_C, seuil) | T6.9 non testable en valeur | Texte S1 est libre d'accès; sinon rester qualitatif comme A5 de P5; E6.4 n'en dépend pas |
| R4 | Seuils † non calibrés; figures de Couzin (P9) à numériser; points de contrôle de T6.1 déduits de la fig. 4 | Tolérances arbitraires | Calibration au pilote; numérisation (WebPlotDigitizer); tout écart au registre |
| R5 | **Moulin** : aucun modèle 2D évalué par les pairs avec apparition spontanée (préimpressions seulement); recherche 2020–2026 non exhaustive; le tore et l'hystérésis de Couzin et al. 2002 peuvent dépendre de la vitesse de balayage et du bruit (Chan et Kanso 2026 [R]; identification au modèle de Couzin = inférence) | E6.1 repose sur le modèle minimal F3 et sur F1 de P9 | Compléter la recherche bibliographique; E6.1 déclare sa base |
| R6 | Dépendance à P9 (T6.5) et à P5 (B1) | Retard de E6.1 ou de E6.4 | P6 exécute T6.5 (≈ 0,5 semaine-personne [estimation, à confirmer]) et implante B1 puis le remet à P5 |
| R7 | **Volet LLM** : non-stationnarité des identifiants; `temperature` non réglable; effort variable; retrait possible de Haiku 4.5 dès 2026-10-15; refus des classifieurs; coût API | Résultats non reproductibles ou incomplets | Règles de P7 (journal, aucun fallback, cellule sentinelle); modèle choisi au pilote. **Plan B :** volet à règle seul; volet LLM exploratoire ou reporté en phase 3 avec P7 |
| R8 | **Usage dual** d'une recherche défensive | Mésusage des résultats | Politique défensive (7.5), revue avant dépôt public. **Plan B :** ne publier que les modèles abstraits et les mesures agrégées |
| R9 | Corrélation des erreurs des vérificateurs LLM (n_eff proche de 1, Kohli 2026) | E6.6 peut ne montrer aucun bénéfice de k | Résultat nul admis et publié; ajouter une famille de modèles différente pour casser la corrélation |
| R10 | **Échelle** : 10 à 25 agents LLM contre des colonies; T6.13 ne se valide qu'à deux points (N = 10 et 20) | Transposition limitée; validation croisée faible | Agents à règle à N biologique; T6.13 rapportée comme validation croisée faible; hybride éventuel avec P7 |
| R11 | **Chevauchements** : P5 (A4, A5 contre T6.8, T6.9), P1 (Dussutour, Beekman), P9 (T6.1 à T6.5 contre T9.1, T9.2) | Double comptage; écarts de numérotation | Un module, une exécution; la consolidation ([plan de recherche](../docs/03-plan-de-recherche.md)) fixe les propriétaires; cette fiche garde la numérotation du dossier |
| R12 | **Références absentes de la bibliographie** (‡) : Allies et al. 1986 (propagande), Ellis et al. 2002 (mimétisme comportemental d'*Aethina tumida*, à vérifier), Regnier et Wilson 1971, Middleton et Latty 2016, A2ABreak (arXiv 2609.10871) et Banu 2026 (arXiv 2605.15225), ces deux dernières d'après l'audit, non vérifiées | H6.8 sans appui lu; pathologie dynamique apicole (maturation précoce, candidate D5) absente de 7.1 | Ajouter à la bibliographie après vérification; lire Stroeymeyt avant d'écrire un mécanisme; compléter 7.1 |
| R13 | Nomenclature *Phengaris*/*Maculinea* non vérifiée; attribution de Cappa et al. 2019 à Moritz et al. 1991 à confirmer | Libellés | Vérifier l'usage actuel avant publication; écrire « *Maculinea* (*Phengaris*) » en attendant |
| R14 | **EscapeBench et LeakLab** absents du dépôt, non relus; lien méthodologique non vérifié [I] | Affirmation de lien non fondée | Confirmer avec le chercheur; sinon retirer le lien du texte public |
| R15 | Incohérences internes des sources : Aswale et al. 2022 (facteur de gain 57 contre 58); Schneirla 1944 et Wheeler 1910 (46 h contre 48 h); FM-2.4 (0,85 % contre 0,80 %); statuts de lecture différents entre dossiers pour Lee et Tiwari 2024 et Cemri et al. 2025 ([T partiel] contre [R], [T]) | Écarts mineurs | Citer la valeur la plus prudente, signaler l'écart, le consigner au registre |
| R16 | Script `p6_checks` du dossier **absent du dépôt**; calculs [I] (σ*(v), valeurs propres, bornes de Beekman, ψ_éq) recalculés par la vérification du dossier et par cette fiche (concordants), sans test versionné | Aucun test de non-régression | Recréer en TypeScript (livrable 3) |

## 12. Effort et dépendances

**Estimation en semaines-personne** [estimation, à confirmer]. Exclut la reproduction du moulin (T6.1 à T6.5, portée par P9) et le coût d'API (section 9).

| Tâche | Semaines-personne |
|---|---|
| Lecture des sources bloquantes; fiches de reproduction T6.6 à T6.14 | 2,5 à 3,5 |
| Implantation et docking (F4, F5, B1 partagé, B2, F6, F7, G1, SI, couche 3) | 4 à 5 |
| Reproductions T6.6 à T6.14, registre des déviations | 2 à 3 |
| Expériences à règle E6.1 à E6.8, préenregistrement et analyse | 5 à 7 |
| Volet LLM (pilote; E6.1-L, E6.3, E6.5, E6.6, E6.7) et codage E6.9 | 4 à 6 |
| Visuels V6.1 à V6.8 | 4 à 5 |
| Note de recherche, évaluation pédagogique, comité d'éthique | 3 à 4 |
| Politique défensive, revue, divulgation éventuelle | 0,5 à 1 |
| **Total** | **25 à 34,5** |

**Prérequis.**
- **S0** ([socle](S0-socle.md)) : noyau (PRNG, horloge, RK4, SSA, Euler–Maruyama, grille, enregistreur, manifeste de run), gabarit ODD, harnais, typologie, glossaire, métriques R et G ([métriques et typologie](../docs/06-metriques-et-typologie.md)).
- **V0** : gabarit de page, charte et évaluation, avant le premier visuel.
- **P9** ([mouvement collectif et construction](P9-mouvement-collectif-et-construction.md)) : T6.5 accepté (prérequis de E6.1), T6.3 et T6.4 acceptés.
- **P5** ([décision par quorum](P5-decision-par-quorum.md)) : module B1; A4 de P5 identique à T6.8.
- **P1** ([recrutement et verrouillage](P1-recrutement-verrouillage.md)) : modules de recrutement, notamment Dussutour et al. 2009 s'ils sont déjà implantés.
- **P7** ([synthèse agentique](P7-synthese-agentique.md)) : harnais LLM et règles de paramétrage (volet LLM seulement). P7 ne dépend pas de P6; P2 n'est pas requis.

**Ordre des tâches.**
1. Lire les sources bloquantes (Beekman et al. 2001, Dussutour et al. 2009, Seeley 2003, Texte S1 de Pais et al. 2013, Gu et al. 2024 pour γ et β, Lee et Tiwari 2024 fig. 6).
2. Écrire les fiches de reproduction T6.6 à T6.14 avant tout code.
3. Confirmer l'état de T6.3 à T6.5 chez P9 et du module B1 chez P5; sinon les exécuter.
4. Implanter les modèles et le docking.
5. Reproduire T6.6 à T6.14; ouvrir le registre des déviations.
6. Préenregistrer les hypothèses confirmatoires.
7. Exécuter les expériences à règle dans l'ordre E6.4, E6.2, E6.1, puis E6.3, E6.5, E6.6, E6.7, E6.8.
8. Piloter le volet LLM après le harnais (reconfirmer identifiants, tarifs et disponibilité).
9. Exécuter le volet LLM et coder les échecs (E6.9).
10. Produire les visuels dès que leurs cibles sont acceptées; évaluer.
11. Rédiger la note de recherche; passer la revue défensive; publier.

## 13. Références clés

Statut en deux colonnes : **Bibliographie** (verdict de [11-bibliographie](../docs/11-bibliographie.md)) et **Lecture** (statut de lecture dans le dossier p6, sauf indication). Les références marquées ‡ en dessous du tableau sont absentes de la bibliographie.

**Fourmi : moulin**

| Étiquette | Rôle dans P6 | Bibliographie | Lecture |
|---|---|---|---|
| Schneirla 1944 | observation du moulin (D1) | vérifiée | [T] |
| Beebe 1921 | boucle d'émigration | non vérifiée | [non vérifiée]; valeurs [à confirmer] |
| Delsuc 2003 | commentaire, non source primaire | corrigée | [T] |
| Parr 1927, Wheeler 1910 | moulin de poissons; cas en captivité (via Schneirla 1944) | non vérifiée | citées en passant, non consultées |
| Couzin et al. 2002 | F2, contrepoint | vérifiée | [T] |
| Couzin et Franks 2003 | F1 | vérifiée | [T] (fichier local, réserve du dossier) |
| Erhard et al. 2022 | F3 | corrigée | [T] préimpression; [M] version publiée |
| Malíčková et al. 2015; Das 2017 | modèles non reproduits | vérifiée | [T]; [R] |
| Chan et Kanso 2026 | hystérésis du tore | corrigée | [R] |

**Fourmi : verrouillage et cascades**

| Étiquette | Rôle dans P6 | Bibliographie | Lecture |
|---|---|---|---|
| Beekman et al. 2001 | F4 | vérifiée | [R]; éq. et valeurs [à confirmer]; **dossier : non vérifiée** |
| Sasaki et al. 2013 | verrouillage | corrigée | [R] |
| Dussutour et al. 2009 | F5 | non vérifiée | [R]; valeurs [à confirmer] |
| Grüter et al. 2012 | encombrement | vérifiée | [R] (paraphrase) |
| Giraldeau et al. 2002 | cascades chez l'animal | vérifiée | [R] |
| Bikhchandani et al. 1992 | cascades informationnelles | vérifiée | [M] |
| Robinson et al. 2005 | phéromone « no entry » | vérifiée | [R partiel] (dossier p7) |

**Parasites, faux signal, défense**

| Étiquette | Rôle dans P6 | Bibliographie | Lecture |
|---|---|---|---|
| Akino et al. 1999; Barbero et al. 2009; Nash et al. 2008 | I1 (mimétisme chimique, acoustique; course aux armements) | vérifiée | [R] |
| Johnson et al. 2011 | F7 (reconnaissance collective) | vérifiée | [R] |
| Aswale et al. 2022 | F6, T6.11 | corrigée | [T] |

**Abeille**

| Étiquette | Rôle dans P6 | Bibliographie | Lecture |
|---|---|---|---|
| Moritz et al. 1991 | I2 | vérifiée | [M] |
| Cappa et al. 2019 | classement d'*Acherontia* (secondaire) | corrigée | [T] passage cité; attribution [à confirmer] |
| Couvillon et al. 2008 | garde | vérifiée | [M] |
| Peck et Seeley 2019 | C2 (pillage) | corrigée | [R] |
| Neumann et Moritz 2002 | I3 | non vérifiée | contenu [à confirmer] |
| Neumann et al. 2011; Neumann et Pirk 2019 | I3 (rejet) | corrigée | [R] |
| Oldroyd 2002 | I3 | vérifiée | [M] |
| Lindauer 1955 | D4, T6.10 | non vérifiée | [R] résumé allemand, inaccessible à la vérification |
| Seeley et Buhrman 1999 | D4 | vérifiée | [R]; contenu [à confirmer]; **dossier : non vérifiée** |
| Seeley 2003 | B2, T6.14 | corrigée | [R]; chiffres [à confirmer]; **dossier : non vérifiée** |
| Seeley et Visscher 2003 | D4 (scission en vol) | vérifiée | lu par l'audit bio-abeilles, non relu |
| Seeley et al. 2012 | D3 | vérifiée | [R] |
| Pais et al. 2013 | B1 | corrigée | [T]; Texte S1 non lu |
| Zakir et al. 2022 | D3 (robots) | non vérifiée | contenu [à confirmer] |

**Agentique**

| Étiquette | Rôle dans P6 | Bibliographie | Lecture |
|---|---|---|---|
| Greshake et al. 2023; Cohen et al. 2024 | C1 | vérifiée | [R] |
| Lee et Tiwari 2024 | G2, T6.13 | vérifiée | [T partiel] (dossier p6); [R] (dossier p7) |
| Gu et al. 2024 | G1, T6.12 | corrigée | [T partiel] |
| Triedman et al. 2025 | orchestrateur détourné | vérifiée | [R] |
| Cemri et al. 2025 | G3 (MAST) | corrigée | [T partiel] (dossier p6); [T] (dossier p7) |
| Hammond et al. 2025 | taxonomie, couches I et C | vérifiée | [R] |
| Fourney et al. 2024 | G4, témoin orchestré | vérifiée | [T partiel] |
| Wynn et al. 2025 | cascade en débat | vérifiée | [R] |
| Hadfield et al. 2025 | orchestration, jetons | corrigée | [T] (dossier p7) |
| Kim et al. 2025; Kohli 2026; Chen 2026 | erreurs corrélées, n_eff, plafond de co-échec | corrigée; vérifiée; vérifiée | [T]; [R]; [R] (dossiers p7, x-choregraphie) |
| Kim et al. 2025a | architecture × structure de tâche | vérifiée | [T] (dossier p8) |
| Garcia-Molina et Salem 1987 | sagas (X1) | corrigée | [L] (dossier x-choregraphie) |
| A2A 2026 | cartes d'agent | corrigée | page de spécification (dossier x-choregraphie); cartes signées : audit, à relire |
| MCP 2026 | `ttlMs`, analogue partiel de l'évaporation | vérifiée | [T] (dossier p7) |
| Ruan et al. 2025 | SwarmBench (via P9) | vérifiée | [T] (dossier p9) |
| Anthropic 2026a; Anthropic 2026b | disponibilité et paramètres des modèles | vérifiée | à reconfirmer avant exécution |

**Méthode et éthique**

| Étiquette | Rôle dans P6 | Bibliographie |
|---|---|---|
| Grimm et al. 2020 | description ODD | corrigée |
| Axtell et al. 1996 | docking | vérifiée |
| Caron-Lormier et al. 2008 | ordre de mise à jour | corrigée |
| Blackman et Vigna 2021 | PRNG | vérifiée |
| Chambers 2013; Chambers et Tzavella 2022; Lakens 2024 | préenregistrement, écarts | vérifiée |
| Lakens 2017; Lakens et al. 2018; Schuirmann 1987; Holm 1979 | TOST; correction de Holm | vérifiée |
| Chi et al. 2012 | idées fausses sur l'émergence | vérifiée |
| Deque 2021 | couverture des tests d'accessibilité automatisés (étude de fournisseur) | vérifiée |
| CRSH et al. 2018 | EPTC 2 | vérifiée |

**Références absentes de la bibliographie (‡), non citées par étiquette** : Allies, Bourke et Franks 1986 (*J Chem Ecol* 12:1285–1293; résumé lu par l'audit bio-fourmis); Ellis et al. 2002, Regnier et Wilson 1971, Middleton et Latty 2016 (d'après les audits, non lues); A2ABreak (arXiv 2609.10871) et Banu 2026 (arXiv 2605.15225), d'après l'audit choregraphie-agentique, non vérifiées. À ajouter à la bibliographie avant tout usage (R12). [Stroeymeyt et al. 2018], [Perry et al. 2015] et [Khoury et al. 2011] y ont été ajoutées à la validation finale (métadonnées vérifiées, texte non lu).

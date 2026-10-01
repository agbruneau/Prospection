# P5 — Décision collective par quorum

**Statut :** fiche de projet, régime **production** (le chercheur agit sur ce document). Rédigée le 2026-10-01. Phase 1 du programme.
**Sources :** dossier [p5-quorum](../recherche/dossiers/p5-quorum.md) (équations, paramètres, cibles chiffrées, réserves); [cadre](../docs/00-cadre.md) (prime sur tout); [bibliographie](../docs/11-bibliographie.md); audits [bio-fourmis](../docs/annexes/audit/bio-fourmis.md) et [bio-abeilles](../docs/annexes/audit/bio-abeilles.md). Compléments cités à l'endroit où ils servent : dossiers [x-methodes](../recherche/dossiers/x-methodes.md), [x-choregraphie](../recherche/dossiers/x-choregraphie.md), [p6-pathologies](../recherche/dossiers/p6-pathologies.md), [p7-agents-llm](../recherche/dossiers/p7-agents-llm.md), [p8-individu-colonie](../recherche/dossiers/p8-individu-colonie.md).
**Taxons nommés :** *Temnothorax albipennis* (anciennement *Leptothorax albipennis*, nom que portent encore les titres de 2001 à 2003) et *Apis mellifera* (essaim); *T. curvispinosus* pour deux cibles seulement (T5.20 et T5.21).

**Lecture des marques.** [T] texte intégral lu; [R] résumé seulement; [M] métadonnées seulement; [S] rapporté par une source secondaire lue; [I] inférence ou calcul de l'auteur du dossier ou de cette fiche; **[à confirmer]** valeur ou énoncé non confirmé; **[non vérifiée]** source ou contenu que la vérification indépendante n'a pas pu consulter. « Lu par l'audit » = lecture intégrale par l'audit bio-abeilles (notamment Seeley et Visscher 2003), que le dossier P5 n'a lue qu'en résumé. Statuts épistémiques des énoncés de transposition : *Résultat reproduit* (acquis seulement une fois la cible T correspondante passée), *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*. Notation : U, A, B = non engagées, engagées pour A, pour B; ΔΨ = valeur absolue de Ψ_A − Ψ_B.

---

## 1. Objet et questions de recherche

**Objet.** Reproduire, puis étendre, les modèles publiés de décision par quorum chez la fourmi (émigration vers un nid, *T. albipennis*) et chez l'abeille (choix d'un nid par l'essaim, *A. mellifera*), à parité, pour établir comment un seuil de quorum et une inhibition ciblée règlent vitesse, justesse et modes d'échec d'une décision sans contrôle central, et ce qui s'en transpose à des collectifs d'agents.

| QR du cadre | Contribution de P5 |
|---|---|
| **QR2 (échecs), principale** | Interblocage (aucune décision) et scission (deux décisions) sont deux modes d'échec distincts; carte σ × quorum (E5.1), parité à sites égaux (E5.4), chaîne quorum → action (E5.3). |
| **QR0 (richesse du signal)** | Trois composantes du vecteur R varient : adressage (signal d'arrêt ciblé ou non, ciblage gradué en E5.5), persistance (expiration spontanée de l'engagement contre engagement persistant), format (binaire plus latence contre signal gradué). Le test d'habitat (la danse paie-t-elle selon la dispersion des ressources?) relève de P1 et P7 [Sherman et Visscher 2002; Donaldson-Matasci et Dornhaus 2012; Beekman et Lew 2008], pas de P5. |
| **QR3 (contrôle)** | Témoin orchestré (agrégateur central à information complète) contre quorum local, sur tâche décomposable puis séquentielle (E5.6, agents à règles). L'exécution avec agents LLM revient à P7. |
| QR1, QR4 | Indirect. P5 fournit à P8 la règle de quorum de la colonie (forme de Hill d'exposant 2, cohérente avec le critère k ≥ 2 de [Sumpter et Pratt 2009], selon p8-individu-colonie). La diversité des seuils (QR4) est hors portée; [Masuda et al. 2015] (seuils d'acceptation hétérogènes) est la piste si elle s'ouvre. |

**Rôle dans le programme.** Projet de phase 1 qui livre les modèles de référence M1, M2, M4 et M6 (section Modèles de référence), réutilisés par P6 (pathologies : interblocage et scission), P8 (règle de quorum) et P7 (scénario quorum). Deux démonstrations portent le projet : « signal d'arrêt ciblé contre non ciblé » et « interblocage ≠ scission ».

**Typologie (cadre, axes A1 à A3).** Les deux systèmes sont des auto-organisations sans plan global (A1 non) ni contrôle central (A2 non). *Tension signalée :* le cadre associe le régime « signaux directs » à la diffusion éphémère (danse, quorum) et ne nomme pas le cas A3 = messages dirigés, qui est celui du tandem, du transport et du signal d'arrêt par contact; il est classé ici dans les signaux directs [I].

**Vocabulaire fixé** (valable pour toute la fiche).

| Terme | Définition opérationnelle | Source |
|---|---|---|
| Quorum | Seuil de présence au **site candidat** qui fait basculer le mode du collectif. Fourmi : population du nid candidat, lue par le taux de rencontres. Abeille : environ 15 éclaireuses présentes au site (parmi environ 150 visiteuses) déclenchent le *piping*; le quorum ne déclenche pas le choix lui-même et le consensus des danseuses n'est ni nécessaire ni suffisant. | [Pratt 2005a]; [Seeley et Visscher 2003]; [Seeley et Visscher 2004] |
| Signal d'arrêt | **Inhibition ciblée** : désengage avec un taux σ une danseuse du site rival. Ce n'est pas un veto. Non ciblé, il ne brise pas l'égalité (SOM). | [Seeley et al. 2012] |
| Interblocage | Absence de décision : point fixe symétrique stable, population non engagée résiduelle. Adaptatif si les deux options sont faibles. | [Seeley et al. 2012]; [Pais et al. 2013] |
| Scission | Deux décisions : deux sites atteignent le quorum, ou décollage avec danseuses réparties sur au moins deux sites. Distincte de l'interblocage. | [Lindauer 1955] (non vérifiée); [Seeley et Visscher 2003] |
| Justesse | Fourmi : **erreurs transitoires** (transports vers le nid médiocre), car tous les essais finissent dans le meilleur nid. Abeille : probabilité de choisir le meilleur site. | [Franks et al. 2003]; [Seeley et Buhrman 2001] |
| Vitesse | Fourmi : délai découverte → premier transport. Abeille : délai jusqu'au quorum, puis jusqu'au décollage. | [Franks et al. 2003]; [Seeley et Visscher 2004] |

**Corrections du cadre appliquées** (liste des corrections factuelles : points 7, 8, 10, 13, 14) : signal d'arrêt = inhibition, pas veto; interblocage ≠ scission; fourmi : signal binaire plus latence (le « scalaire » n'est qu'une simplification de modèle) et danse = échantillonnage local, pas publication-abonnement; « agents LLM identiques s'interbloquent » est une hypothèse sans acquis, jamais affirmée ici; trois formes d'oubli (le déclin des danses n'est pas le mécanisme général).

**Hors portée.** Guidage de l'essaim en vol (P9), test d'habitat sur la danse (P1, P7), diversité des seuils (P3), exécution avec agents LLM (P7).

---

## 2. Positionnement

| Existant (publié) | Reproduit par P5 | Apport de P5 |
|---|---|---|
| **Abeille, signal d'arrêt et bifurcation.** M1 [Seeley et al. 2012] (SOM [T]); M2 sensible à la valeur [Pais et al. 2013] [T]; N options M9 [Reina et al. 2017] [T]; lien avec le test séquentiel [Marshall et al. 2009] [T] | T5.1 à T5.7, T5.24 | Trois extensions non publiées dans les sources lues : N fini par SSA (E5.2), ciblage gradué (E5.5), carte σ × quorum (E5.1). Une implantation unique, réutilisée par P6 et P7. |
| **Abeille, choix tardif.** M3 [Britton et al. 2002] via [Franks et al. 2002] | T5.8 | Comparaison directe à M4 sur sites égaux (E5.4). |
| **Fourmi.** M4 [Pratt et al. 2002] via [Franks et al. 2002]; vitesse/justesse [Franks et al. 2003]; quorum par rencontres [Pratt 2005a]; modèle à agents [Pratt et al. 2005] ([non vérifiée]); algorithme accordable [Pratt et Sumpter 2006] | T5.14 à T5.22 | M4 stochastique (SSA), sites égaux (E5.4), chaîne tandem → transport (E5.3). |
| **Réponse de quorum générique.** [Sumpter et Pratt 2009] | T5.23 | Critère TOST valide (n relié à la marge) et décision sur la lecture de r, qui reste à confirmer. |
| **Abeille, observations.** [Seeley et Visscher 2003], [Seeley et Visscher 2004], [Seeley et Buhrman 1999], [Seeley et Buhrman 2001], [Seeley 2003], [Passino et Seeley 2006] | T5.9 à T5.13, comme garde-fous (4 à 6 essaims) | Chaîne quorum → piping → échauffement → buzz-run → décollage (E5.3), qu'aucune source lue ne modélise en bloc. |
| **Robotique et algorithmique.** [Reina et al. 2015]; [Gray et al. 2018]; [Valentini et al. 2017]; [Ghaffari et al. 2015] (borne inférieure Ω(log n), algorithme O(log n)); [Zakir et al. 2022] (non vérifiée) | Non reproduits | Bornes de comparaison pour le coût de E5.6. |
| **Vote et débat d'agents LLM.** [Kaesberg et al. 2025]; [Du et al. 2024]; [Choi et al. 2025a]; [Li et al. 2024]; [Weng et al. 2025]; [Kohli 2026]; [Kim et al. 2025b]; [Cemri et al. 2025] | Non reproduits (P7) | Prédictions de modèle pour un quorum k-sur-n à erreurs corrélées et un témoin orchestré (E5.6), à exécuter avec des LLM en P7. |

---

## 3. Hypothèses falsifiables

Chaque hypothèse est dirigée. Les marques **[à confirmer]** signalent un seuil choisi par l'auteur de la fiche, à fixer au pilote avant le préenregistrement. H5.1 et H5.2 sont testées par les cibles T5.1 à T5.4 et T5.6 (pas d'expérience E propre). Pour une interaction, prévoir 4 à 16 fois les exécutions d'un effet principal (x-methodes).

**H5.1 — Ciblage et seuil (confirmatoire préenregistrée).** À options égales avec ρ > α, l'inhibition **ciblée** sépare deux régimes en σ\* = 4αγρ/(ρ−α)² (interblocage symétrique sous σ\*, deux attracteurs au-delà); l'inhibition **non ciblée** ne brise l'égalité pour aucun σ.
VI : σ, type de signal (ciblé ou non), (γ, α, ρ). VD : ΔΨ à l'équilibre.
Effet minimal : ΔΨ > 10⁻³ au-delà de σ\* (seuil de détection de T5.1); ΔΨ = 0,81 à σ = 10 pour (3, 1/3, 3) [I, calcul sur T5.2].
Réfutation : σ̂\* hors de [1,654 ; 1,721] (±2 % de 1,6875), ou ΔΨ ≥ 10⁻³ sous signal non ciblé pour un σ testé.
Réserve : l'interblocage à σ = 0 est garanti par la structure des équations (valeur propre négative [I, p6-pathologies]) : c'est un **test d'implantation**, jamais rapporté comme résultat.

**H5.2 — Le signal fort a un coût de discrimination (confirmatoire préenregistrée).** Plus σ augmente, plus la différence relative de valeur nécessaire pour un attracteur unique, Δv_min/v̄ = K(σ), est grande : une inhibition plus forte brise mieux l'égalité mais discrimine moins les options proches [Pais et al. 2013, Éq. 5].
VI : σ (au moins 3 niveaux), v̄. VD : Δv_min.
Effet minimal : K strictement croissant sur au moins 3 valeurs de σ; R² ≥ 0,99 sur la partie asymptotique (T5.6).
Réfutation : K non croissant, ou R² < 0,99.

**H5.3 — Interblocage et taille finie (confirmatoire sur paramètres neufs; exploratoire tant que X7 n'est pas répliqué).** À N fini (SSA), pour σ < σ\*, la probabilité de sortir de l'égalité à t = 40 décroît quand N croît; pour σ > σ\*, elle tend vers 1. Le pilote x-methodes (X7) a observé 0,445 (N = 50) puis 0,105 (N = 200) à σ = 1, et 0,950 puis 1,000 à σ = 10, sans valeur publiée pour comparer.
VI : N, σ/σ\*. VD : P(ΔΨ/N > 0,3 à t = 40).
Effet minimal : baisse ≥ 0,10 entre les deux N à σ < σ\* [I, à confirmer].
Réfutation : la borne inférieure de l'IC à 95 % de la baisse est inférieure à 0,10; ou P(N = 200) < 0,95 à σ > σ\*.

**H5.4 — Adressage gradué (exploratoire).** Soit p la fraction des signaux d'arrêt dirigés vers les danseuses du site rival (p = 1 : M1c; p = 0 : M1b). Il existe p_min < 1 sous lequel aucun σ ne brise l'égalité; entre p_min et 1, la plage de σ qui la brise est bornée supérieurement : un signal fort mal ciblé ne rétablit pas la décision.
VI : p, σ. VD : signe de la valeur propre antisymétrique λ = ρΨ_U − α − σ(1−p)Ψ_s au point symétrique [I, dérivation de cette fiche], puis probabilité de sortie à N fini.
Effet minimal : plage de σ non vide à p = 1 et vide à p = 0; un p_min strictement entre les deux. Calcul préliminaire de rédaction (RK4 ponctuel plus valeur propre, (3, 1/3, 3)) : aucun σ à p = 0,75; plage finie à p = 0,9 [I, à confirmer; script à verser dans `recherche/verifications-numeriques/`].
Réfutation : plage non vide à p = 0 (contredirait T5.3), ou plage non bornée pour tout p < 1.

**H5.5 — Scission et interblocage occupent des régions distinctes du plan (σ, Q) (exploratoire).** Avec deux sites égaux, la scission (les deux populations dépassent le quorum Q) n'apparaît que si Q est inférieur à la population engagée à l'équilibre symétrique Ψ_s(σ); au-dessus, on obtient l'interblocage (σ < σ\*) ou une décision (σ > σ\*) si le gagnant dépasse Q. Ancres du dossier p6-pathologies [I] pour v = 2 : Ψ_s(0) ≈ 0,46; à 1,5σ\*, le gagnant n'est qu'à ≈ 0,59, sous un seuil de 0,7 : briser la symétrie ne garantit pas d'atteindre le quorum.
VI : σ/σ\*, Q, v̄, bruit k. VD : issue (décision, interblocage, scission) et sa fréquence.
Effet minimal : frontière scission/interblocage observée à Q = Ψ_s(σ) à ±0,02 [à confirmer].
Réfutation : scission observée pour Q > Ψ_s(σ) dans plus de 5 % des exécutions du régime concerné [à confirmer].

**H5.6 — Une phase de préparation réduit la scission au décollage (exploratoire, Modèle simplifié).** Dans la chaîne quorum → préparation → exécution (abeille), la fréquence des décollages avec danseuses réparties sur au moins deux sites décroît quand la durée de préparation D croît (l'expiration des danses se poursuit pendant D) et croît quand le quorum Q_site baisse.
VI : D, Q_site, vitesse d'expiration des danses. VD : P(scission au décollage), délai de décollage.
Effet minimal : variation de P(scission) ≥ 0,05 entre niveaux extrêmes de D [I, à confirmer].
Réfutation : pente de P(scission) en D nulle ou positive (IC à 95 %).

**H5.7 — Parité à sites égaux (exploratoire, comparatif).** À qualités égales, le mode d'échec dominant de l'émigration de *Temnothorax* (M4 stochastique) est la scission, celui de l'essaim (M1c, σ < σ\*) est l'interblocage. L'asymétrie est déclarée : aucune inhibition croisée n'est documentée chez *Temnothorax* [Pratt et Sumpter 2006] (audit bio-fourmis, constat 16, [M]).
VI : taxon, σ (abeille), ρ12 et retard de découverte (fourmi). VD : fréquence de chaque issue.
Effet minimal : écart ≥ 0,2 entre la fréquence du mode attendu et celle de l'autre, dans chaque taxon [I, à confirmer].
Réfutation : dans M4, interblocage au moins aussi fréquent que scission; ou dans M1c, scission au moins aussi fréquente qu'interblocage.

**H5.8 — Corrélation des erreurs et saturation (exploratoire, agents à règles).** Pour un quorum k-sur-n d'agents à règles dont les erreurs ont une cause commune (corrélation intra-classe ρ_err > 0), la justesse sature sous 1 quand n croît, à un plafond décroissant avec ρ_err; au-delà de n_sat, ajouter des agents coûte des messages sans gain. Ancre pour le vote seul : à p = 0,6 et ρ_err = 0,1, le plafond est 0,736 [I, p8-individu-colonie, T8.4].
VI : n, k/n, ρ_err. VD : P(meilleure option), messages.
Effet minimal : plafond mesuré inférieur à celui de l'indépendance, avec IC à 95 % disjoints [à confirmer].
Réfutation : gain de justesse encore supérieur à l'ES de Monte Carlo entre n_sat et dix fois n_sat.

**H5.9 — Orchestration et structure de tâche (exploratoire, interaction).** À budget de messages égal, l'avantage du témoin orchestré sur le quorum local est plus grand sur une tâche séquentielle que sur une tâche décomposable, et il n'est pas dominant sur la tâche décomposable.
VI : architecture (quorum local, témoin orchestré), structure de tâche. VD : ΔP appariée, délai, messages.
Effet minimal : à fixer au pilote (variance, ω², K) [à confirmer].
Réfutation : IC à 95 % du contraste d'interaction contenant 0 ou de signe opposé.

---

## 4. Modèles de référence

Un modèle par article, nommé par taxon et préréglage (cadre : pas de moteur « fourmi » ou « abeille » unique). Patrons visés par la modélisation orientée patrons (x-methodes) : (a) seuil de bifurcation σ\*; (b) vitesse et justesse en fonction du quorum; (c) fréquence des scissions.

### 4.1 Parité fourmi / abeille

| Dimension | *T. albipennis* (préréglage « émigration, deux nids ») | *A. mellifera* (préréglage « essaim, choix de nid ») | Source |
|---|---|---|---|
| Taille du collectif | environ 100; colonies de 100 à 200 individus au plus | environ 10 000; environ 150 éclaireuses visitent un site | [Franks et al. 2002]; [Sumpter et Pratt 2009]; [Seeley et Visscher 2003] |
| Signal | binaire (« suis-moi », « laisse-moi te porter »); la qualité passe par la latence avant recrutement (1/k_i) | danse graduée; signal d'arrêt ciblé | [Franks et al. 2002]; [Mallon et al. 2001] |
| Recrutement | linéaire en Y_i (un tandem = un suiveur); transport 3 fois plus rapide que le tandem après le quorum | quadratique (danseuse × recrue); la danse est un échantillonnage aléatoire local | [Franks et al. 2002]; [Pratt et al. 2002] |
| Comparaison directe des sites | fréquente | rare | [Franks et al. 2002] |
| Fin d'engagement | la fourmi ne cesse de recruter que si elle trouve mieux (persistance) | cesse spontanément de danser (expiration; déclin linéaire) | [Franks et al. 2002]; [Seeley 2003] |
| Frein | délai (latence, tandem lent); aucun arrêt spontané pendant l'émigration | retrait par expiration plus signal d'arrêt ciblé | [Franks et al. 2002]; [Seeley et al. 2012] |
| Quorum | nid candidat; médianes de 2 à 7,5 ouvrières selon les conditions; environ 10 à 20 compagnes; plus bas sous urgence | site; environ 15 présentes (10 à 20 selon la source) | [Franks et al. 2003]; [Franks et al. 2002]; [Seeley et Visscher 2003]; [Seeley et al. 2006] |
| Détection du quorum | taux de rencontres | mécanisme inconnu (visuel, olfactif ou tactile) | [Pratt 2005a]; [Seeley et al. 2006] |
| Décision et exécution | intriquées : le transport est l'exécution | séparées : *piping*, échauffement, buzz-run, décollage | [Marshall et al. 2009] (lecture par x-choregraphie) |
| Inhibition croisée | aucune documentée | signal d'arrêt ciblé | [Pratt et Sumpter 2006]; [Seeley et al. 2012] |
| Base empirique | 11 à 18 colonies par expérience | 4 à 6 essaims par expérience | [Franks et al. 2003]; [Pratt et Sumpter 2006]; [Seeley et Visscher 2004]; [Seeley 2003] |

**Asymétries déclarées.** (1) L'inhibition croisée n'a pas d'équivalent documenté chez *Temnothorax* : c'est un résultat comparatif (H5.7), pas une lacune à combler. (2) La chaîne décision → action est longue chez l'abeille et réduite à un seul basculement chez la fourmi (section 4.4). (3) Côté abeille, les cibles solides sont des **résultats de modèle** (T5.1 à T5.8); côté fourmi, plusieurs cibles sont empiriques mais passent par un modèle à agents que la source n'a pas livré (M7).

### 4.2 Vue d'ensemble

| ID | Source | Taxon / préréglage | Type | Intégration | Lecture |
|---|---|---|---|---|---|
| M1 | [Seeley et al. 2012] | *A. mellifera*, essaim | EDO (limite N → ∞ d'une équation maîtresse); SSA à N fini | RK4; SSA direct | [T] SOM; texte principal [R] |
| M2 | [Pais et al. 2013] | *A. mellifera*, essaim | EDS (bruit sensoriel k) | Euler–Maruyama [I] | [T] sans Text S1 ni code Matlab |
| M3 | [Britton et al. 2002] via [Franks et al. 2002] | *A. mellifera*, essaim | EDO à 5 variables | RK4 | [S] via [T] |
| M4 | [Pratt et al. 2002] via [Franks et al. 2002] | *T. albipennis*, émigration | EDO à seuil | RK4; SSA [I] | [S] via [T] |
| M5 | [Marshall et al. 2009] | commun (branches fourmi et abeille) | EDS, courses vers un seuil | Euler–Maruyama [I] | [T] sans matériel supplémentaire |
| M6 | [Sumpter et Pratt 2009] | générique (contexte *Temnothorax*) | Monte Carlo à temps discret | pas de 1 | [T]; lecture de r **[à confirmer]** |
| M7 | [Pratt et al. 2005]; [Pratt et Sumpter 2006] | *T. albipennis* (2005); *T. curvispinosus* (2006) | à agents, temps discret, 19 états, 44 paramètres | à définir | 2005 **[non vérifiée]**; 2006 [T] sans SI |
| M8 | [Passino et Seeley 2006] | *A. mellifera*, essaim | stochastique, temps discret | à définir | résultats [S] seulement |
| M9 | [Reina et al. 2017] | *A. mellifera*, N options | EDO | RK4 | [T] (arXiv v2) |

### 4.3 Équations et paramètres

#### M1 — Signal d'arrêt, trois variantes [Seeley et al. 2012] [T, SOM]

Emplacement : SOM, « SOM Text », sous-sections *Microscopic, Individual-level Model*, *Indiscriminate Stop-signal Model*, *Discriminate Stop-signal Model*; Fig. S1 à S4. Modèle dérivé d'une équation maîtresse (développement de van Kampen, terme d'ordre N^1/2). Notation : Ψ_U = 1 − Ψ_A − Ψ_B; γ découverte, α abandon spontané, ρ recrutement, σ signal d'arrêt, δ commutation directe. Unité de temps non précisée dans les sources lues **[à confirmer]**.

```
(a) commutation directe (reprise de Marshall et al. 2009, Fig. 4)
 dΨA/dt = γA(1−ΨA−ΨB) − ΨA[αA − ρA(1−ΨA−ΨB) + (δB−δA)ΨB]
 dΨB/dt = γB(1−ΨA−ΨB) − ΨB[αB − ρB(1−ΨA−ΨB) + (δA−δB)ΨA]
 α = 0 : convergence asymptotique vers un DDM sur Ψ_A + Ψ_B = 1
 α > 0, options égales : point fixe symétrique stable pour tous les paramètres
   Ψ_s = [ρ−α−2γ + √((ρ−α−2γ)² + 8γρ)] / (4ρ)

(b) signal d'arrêt NON ciblé  (A+B →(½σA) A+U ; A+A →(½σA) A+U ; ...)
 dΨA/dt = γA ΨU − ΨA[αA − ρA ΨU + ½(σA ΨA + σB ΨB)]
 options égales : point fixe symétrique toujours stable = interblocage persistant (Fig. S2)

(c) signal d'arrêt CIBLÉ = inhibition croisée  (A+B →(σA) A+U ; B+A →(σB) B+U)
 dΨA/dt = γA ΨU − ΨA[αA − ρA ΨU + σB ΨB]
 dΨB/dt = γB ΨU − ΨB[αB − ρB ΨU + σA ΨA]
 options égales, avant bifurcation :
   Ψ_A = Ψ_B = [ρ−α−2γ + √((ρ−α−2γ)² + 4γ(2ρ+σ))] / (2(2ρ+σ))
 seuil de bifurcation (si ρ > α) :  σ* = 4αγρ / (ρ−α)²
 après bifurcation [I, vérifié numériquement] :
   Ψ_U = α/ρ ; Ψ_A + Ψ_B = 1 − α/ρ ; Ψ_A·Ψ_B = γα/(ρσ) ;
   Ψ_A − Ψ_B = ± √((ρ−α)² − 4αγρ/σ) / ρ
```

- Paramètres publiés des figures : S3A (avant) γ = 3, α = 1/3, ρ = 3, σ = 1; S3B (après) σ = 10; S2 (non ciblé) γ = 3, α = 1/3, ρ = 3, σ = 1; S4 (options inégales) ⟨γ⟩ = 3, Δγ = −1, ⟨α⟩ = 1/3, ⟨ρ⟩ = 3, ⟨σ⟩ = 10, Δα = Δρ = Δσ = 0; S1 (commutation directe) A : γ_A = 3, γ_B = 6, α = 0, ρ_A = 3, ρ_B = 6, δ_A = 1, δ_B = 2; C : γ = 3, α = 1/3, ρ = 3, δ = 1.
- Valeurs dérivées [I] : σ\* = 1,6875 pour (3, 1/3, 3); σ = 1 → Ψ_A = Ψ_B = 0,4585; σ = 10 → (0,8497 ; 0,0392). Près de σ\* (±5 %), la divergence est très lente (ralentissement critique).
- SSA à N fini [I, x-methodes] : propensités U → A : γ_A U; A → U : α_A A; U + A → A + A : ρ_A A U / N; A + B → U + B : σ_B A B / N, et symétriques.
- Données associées (SOM) : 20 danseuses dans chacun de deux essaims naturels (Ithaca, 2009 et 2011) et trois essaims artificiels (2010); île Appledore : deux essais avec deux nichoirs identiques (40 L, entrée de 15 cm², à 250 m de l'essaim, 40 m l'un de l'autre) et deux essais avec un seul; éclaireuses marquées jaune ou rose selon le nichoir; environ 2 % des émettrices non identifiées. Les proportions de signaux ipsi/contra du texte principal **ne sont pas lues** (accès sur inscription).

#### M2 — Version stochastique sensible à la valeur [Pais et al. 2013] [T]

Emplacement : section *Model*, Éq. 1–2; *Results*, Éq. 3–5; Fig. 1 à 6. Décodage de l'extraction PDF (γ = « c », α = « a », ρ = « r », σ = « s », Ψ = « y »), concordant avec M1c.

```
 dΨA = [γA ΨU − ΨA(αA − ρA ΨU + σB ΨB)] dt + k·√(ΨU² + ΨA² + ΨU²ΨA²) dWA
 dΨB = [γB ΨU − ΨB(αB − ρB ΨU + σA ΨA)] dt + k·√(ΨU² + ΨB² + ΨU²ΨB²) dWB     (Éq. 1)
 paramétrage : γi = ρi = vi ; αi = 1/vi ; σ indépendant de la valeur, sans bruit
 Éq. 2 (variété lente; décodage à confirmer sur le PDF) :
   ΨA·ΨB = (2v̄/σ)·ΨU(1+ΨA)(1+ΨB)/(3−ΨU), indépendante de Δv
 Éq. 3 : dx = (a + bx)dt + c dW   (OU si a = 0, b ≠ 0 ; DDM si b = 0)
 Éq. 4 : σ* = 4v³ / (v²−1)²      (options égales, fourche)
 Éq. 5 (Weber) : Δv/v̄ = K, K croît avec σ
```

- k : bruit sensoriel (k = 0 : déterministe); le bruit intrinsèque de population finie est hors du modèle (c'est l'objet de E5.2). Décision : une population atteint le seuil de quorum; Fig. 5 : Ψ_A = Ψ_B = 0,7.
- Paramètres des figures : Fig. 3 : k = 0,05, deux options égales et faibles en interblocage jusqu'à la découverte d'une troisième, supérieure, à t = 30 (les autres valeurs sont dans Text S1, non lu; le seuil 0,7 appliqué à la Fig. 3 est une inférence [I] **[à confirmer]**). Fig. 4 gauche : v̄ = 4. Fig. 5 : v̄ = 4 dans les trois panneaux; Δv = 0 (gauche), 0,1 (milieu); σ = 4 (droite, hystérésis), replis vers Δv ≈ ±0,5 (lecture graphique [I]). Fig. S3 : rampe de σ pour briser un interblocage, k = 0,05.
- Valeurs dérivées [I] : σ\*(1,5) = 8,640; σ\*(2) = 3,556; σ\*(4) = 1,138; σ\*(10) = 0,408; pour v grand, σ\* ≈ 4/v. L'identité avec M1c (γ = ρ = v, α = 1/v) est vérifiée algébriquement et numériquement.
- Mise en garde [Reina et al. 2017, Annexe B] : v ≥ 1 pour des états positifs **[à confirmer]** (restriction non retrouvée par la vérification); avec ce paramétrage, pour **N = 3 options égales aucun σ ≥ 0 ne brise l'interblocage**.
- Quorum et franchissement : le seuil n'entre pas dans le second membre (discontinuité); le franchissement est un événement (x-methodes).

#### M3 — Abeille, modèle de Britton [Britton et al. 2002] via [Franks et al. 2002, légende de la Fig. 6a] [S via T]

X = neutres, Y_i = danseuses pour i, Z_i = informées non dansantes (décodage validé par les étiquettes de la Fig. 6a).

```
 dX/dt  = −β1 X Y1 − β2 X Y2
 dY1/dt =  β1 X Y1 − γ1 Y1 + δ1 β1 Y1 Z1 + α2 β1 Y1 Z2
 dY2/dt =  β2 X Y2 − γ2 Y2 + δ2 β2 Y2 Z2 + α1 β2 Y2 Z1
 dZ1/dt =  γ1 Y1 − δ1 β1 Y1 Z1 − α1 β2 Y2 Z1
 dZ2/dt =  γ2 Y2 − δ2 β2 Y2 Z2 − α2 β1 Y1 Z2
```

Paramètres (Fig. 7) : β1 = 1,0; β2 = 1,2; γ = 0,3; δ = 0,5 (site 2 légèrement supérieur, découvert plus tard); (a) α = δ = 0,5 : le consensus bascule toujours vers le site 2, quel que soit le retard; (b) α = 0,7 : impasse. Interprétation publiée : α = δ correspond à des abeilles retraitées qui suivent les danses au hasard (données de [Visscher et Camazine 1999], **[non vérifiée]** : 46 éclaireuses, 41 %, 13 %, 35 %, rapportées par [Franks et al. 2002]). Conditions initiales **non publiées** dans [Franks et al. 2002].

#### M4 — Fourmi, modèle de Pratt [Pratt et al. 2002] via [Franks et al. 2002, légende de la Fig. 6b] [S via T]

X = chercheuses, Z_i = évaluatrices du site i, Y_i = recruteuses, B_0 = passives au vieux nid, B_i = passives au site i, T = seuil de quorum.

```
 dX/dt  = −(μ1+μ2)X − λ1·I(Y1,X) − λ2·I(Y2,X)
 dZ1/dt =  μ1 X + λ1·I(Y1,X) − ρ12 Z1 − k1 Z1
 dZ2/dt =  μ2 X + λ2·I(Y2,X) + ρ12 Z1 − k2 Z2
 dY1/dt =  k1 Z1 − ρ12 Y1
 dY2/dt =  k2 Z2 + ρ12 Y1
 dB1/dt =  φ1·J(Y1,B0)
 dB2/dt =  φ2·J(Y2,B0)
 I(Yi,X)  = Yi  si Yi < T et X > 0 ; 0 sinon          (tandems)
 J(Yi,B0) = Yi  si Yi ≥ T et B0 > 0 ; 0 sinon          (transports)
```

- Les comparateurs sont absents de l'extraction PDF; ils sont rétablis d'après la Fig. 6b (« Y1 < T → tandem », « Y1 > T → transport ») [I].
- Paramètres (Fig. 8; par fourmi et par minute; temps de 0 à 120 min) : μ1 = μ2 = 0,013; λ1 = λ2 = 0,033; φ1 = φ2 = 0,099; T = 10. (a) k1 = 0,016, k2 = 0,020, ρ12 = 0,008 : pas de scission. (b) k1 = 0,019, k2 = 0,020, ρ12 = 0,004 : transports vers les deux sites (scission).
- Décodage de φ et ρ12 par recoupement avec [Masuda et al. 2015] (tandem 0,033 min⁻¹; conversions évaluatrice → recruteuse 0,015 et 0,02 min⁻¹; commutation 0,008 min⁻¹) [S]. Écart à signaler : 0,015 (Masuda) contre 0,016 (Franks, Fig. 8a). Effectifs initiaux (X(0), B_0(0)) **non donnés** : à prendre dans [Pratt et al. 2002].
- Points clés [T, Franks et al. 2002] : la qualité est codée par la latence avant recrutement (1/k_i), pas par le taux λ (identique); le recrutement est individuel donc linéaire en Y_i.
- SSA [I] : tandem au taux λ_i·Y_i tant que Y_i < T et X > 0; transport au taux φ_i·Y_i tant que Y_i ≥ T et B_0 > 0 (un passif passe de B_0 à B_i).

#### M5 — Courses vers un seuil [Marshall et al. 2009] [T]

Sections 4 et 6, Éq. 4.1 et 6.1–6.6; Fig. 4 et 5. n = taille de la population, s = n − y1 − y2, q_i découverte, r′_i recrutement, r_i commutation, k_i déclin, cη bruit blanc.

```
 Usher–McClelland (4.1) : ẏ1 = I1 + cη1 − k·y1 − w·y2 ; ẏ2 = I2 + cη2 − k·y2 − w·y1
   optimal (≈ DDM) si w = k, tous deux grands
 Fourmi (6.1–6.2) : r′i(s) = r′i + cη si s > 0, sinon 0
   ẏ1 = (n−y1−y2)(q1+cηq1) + y1·r′1(s) + y2(r2+cηr2) − y1(r1+cηr1) − y1(k1+cηk1)
   phase avant quorum seulement; optimalité possible seulement si déclin et commutation
   dépendent des DEUX qualités (connaissance globale, jugée irréaliste)
 Abeille, commutation indirecte (6.3) :
   ẏ1 = (n−y1−y2)(q1+cη) − y1(k1+cη) + y1(n−y1−y2)(r′1+cη)     (non réductible au DDM)
 Abeille, commutation directe (6.4) :
   ẏ1 = (n−y1−y2)(q1+cη) + y1(n−y1−y2)(r′1+cη) − y1·k + y1·y2(r1−r2+cηr1−cηr2)
 k = 0 : x2 → n/√2 ; (6.5) ẋ1 = (n²/2 − x1²)((r1−r2)/√2 + cη) ;
   (6.6) ẋ = A + cη, A = (r1−r2)/√2 : DDM, asymptotiquement optimal
```

Section 7 et Fig. 5 : r1 − r2 = 2, k balayé de 0 à 1; le temps de décision moyen est minimal à k = 0. Valeurs de n, c, q_i, r′_i dans le matériel supplémentaire, **non lu**.

#### M6 — Réponse de quorum [Sumpter et Pratt 2009] [T]

Section 4(a)–(d), Éq. 4.1–4.2, Fig. 3 à 6. n individus non engagés; chacun trouve une des deux options avec la probabilité r par pas de temps et s'engage à l'arrivée avec la probabilité

```
 P_X(x) = p_x · [ a + (m − a)·x^k / (T^k + x^k) ]        (4.1)   x = nombre déjà engagé à X
 réponse linéaire de référence : p_x [a + (m − a)·x/(2T)]  (4.2)
 réponse de quorum ssi k ≥ 2 (ou k > 1 si l'on retient le point d'inflexion)
```

Simulation publiée (section 4b–c, Fig. 4) : n = 40, r = 0,02, p_x = 1, p_y = 0,5, T = 10, a = 0,1, m = 0,9; 1 000 simulations. k = 1 : 75,5 % choisissent X, durée 253,7 ± 64,0 pas; k = 9 : 83,3 %, 307,8 ± 71,0 pas; choix indépendant attendu : 66,7 %. Fig. 5 : pour k = 4 ou 9, vitesse maximale à T = 0, justesse maximale vers T ≈ 10; plage de T d'environ 5 à 15 robuste. **Lecture de r [à confirmer]** : le texte appuie « r = probabilité de trouver l'une des deux options »; avec cette lecture, la justesse concorde (75,9 % et 82,4 %) mais les durées sont environ deux fois trop longues (554 et 647 pas); avec « r par option », 76,1 % / 274 ± 69 pas (k = 1) et 82,0 % / 326 ± 75 pas (k = 9) [I, pré-test du dossier]. L'ordre de mise à jour n'a aucun effet (x-methodes, X17 : correction du dossier P5). Le 3,33 % d'erreur de majorité attribué à Condorcet (40 votants, erreur 1/3) figure dans le texte mais **ne se reproduit pas par calcul exact** (0,96 %, 2,14 % ou 1,55 % selon le traitement de l'égalité, p8-individu-colonie) : ne pas l'utiliser comme cible.

#### M7 — Modèle à agents [Pratt et al. 2005] et [Pratt et Sumpter 2006]

- [Pratt et al. 2005] **[non vérifiée]** (*T. albipennis*) : paramètres estimés sur des émigrations filmées de fourmis marquées vers un seul nid; 19 états comportementaux et 44 paramètres, en temps discret [S, Pratt et Sumpter 2006]. La mauvaise prédiction du degré de scission et la variabilité individuelle émergente attribuées à ce modèle restent **non vérifiées** (aucun résumé accessible). **Le tableau des 44 paramètres n'est pas lu** (ScienceDirect fermé, CAPTCHA non contourné). Une notice au même titre (*Anim. Behav.* 71:478, 2006) est probablement un erratum [I, audit bio-fourmis, constat 14] : à lire avant de reprendre des valeurs.
- [Pratt et Sumpter 2006] [T sans SI] (***T. curvispinosus***, pas *albipennis*) : quorum estimé par une fonction de Hill, Y = P^k / (Quorum^k + P^k) (Y = proportion de transports, P = population du site); balayage de Search, Accept (taux au nid médiocre = 0,52 × celui du bon nid) et Quorum; 100 simulations par combinaison. Empirique (18 colonies) : quorum 5,7 ± 0,5 (forcé) contre 12,7 ± 0,6 (non forcé); fraction dans le bon nid 65 ± 32 % contre 90 ± 18 % (Wilcoxon W = 67, P < 0,05); vitesse W = 252, P < 0,0001. Prédit (1 000 simulations par condition) : 87 ± 77 min et 84 ± 11 % (forcé) contre 565 ± 314 min et 97 ± 7 % (non forcé). Un quorum de 11,3 améliore la justesse de 40,7 % par rapport à un quorum nul, pour 5,7 % seulement sur la vitesse. Incohérence interne de la source : la Discussion place le quorum de 11,3 en émigration non forcée, la Fig. 4 donne 12,7 ± 0,6 (signalée, non corrigée). Le taux de recherche et le taux d'acceptation pèsent plus que le quorum sur la vitesse.

#### M8 — [Passino et Seeley 2006] (résultats seulement) [S]

Modèle stochastique à temps discret, N_sim = 100 par cas. Résultats [S, Seeley et al. 2006] : quorum de bon compromis de 15 à 20 abeilles; réduction des danses de bon compromis de 15 à 20 circuits par visite, à comparer à la réduction observée d'environ 15 circuits par visite (déclin linéaire, [Seeley 2003]). Une réduction plus rapide ralentit la décision; une réduction plus lente produit des décisions scindées fréquentes. Équations et tableau des paramètres **non lus** (paywall).

#### M9 — N options [Reina et al. 2017] [T]

```
 dx_i/dt = γi x_u − αi x_i + ρi x_u x_i − Σ_j x_j β_ji x_i          (Éq. 1)
 N = 2 : seuil général β = 4αγρ/(ρ−α)²  (Éq. B2, identique à M1c) ; forme de valeur 4v³/(1−v²)² (Éq. B3)
 N = 3, paramétrage de Pais : interblocage pour tout β ≥ 0          (Éq. B4)
 paramétrage proposé : γi = k·vi, αi = k/vi, ρi = h·vi, β_ij = h·vi ; contrôle r = h/k
```

Diagramme de stabilité à trois phases (I interblocage, II coexistence, III décision) en fonction de r et v (Fig. 1, exemple v = 5).

### 4.4 Chaîne décision → action (extension, non publiée en bloc)

Aucune source lue ne modélise l'enchaînement complet. Il est construit ici comme une machine à états pilotée par événements au-dessus de M2 (abeille) et de M4 (fourmi). **Statut : Modèle simplifié; les paramètres hors tableau sont des Hypothèses de l'auteur.**

| Étape | Abeille (*A. mellifera*) | Fourmi (*T. albipennis*) | Source et statut |
|---|---|---|---|
| 1. Évaluation et recrutement | danse (M1, M2) | tandem (M4) | [Franks et al. 2002] |
| 2. Détection du quorum | environ 15 éclaireuses présentes au site (10 à 20), parmi environ 150 visiteuses; mécanisme inconnu | taux de rencontres au nid candidat; seuil T (médianes de 2 à 7,5) | [Seeley et Visscher 2003]; [Seeley et al. 2006]; [Pratt 2005a]; [Franks et al. 2003] |
| 3. Changement de mode | début du *worker piping* (signal vibratoire) | passage au transport, 3 fois plus rapide que le tandem | [Seeley et Visscher 2003]; [Pratt et al. 2002] |
| 4. Préparation | échauffement des muscles de vol (≥ 35 °C) environ une heure avant le décollage; la météo peut interrompre le *piping* | aucune : décision et exécution sont intriquées | lu par l'audit dans [Seeley et Visscher 2003]; résumé seul dans le dossier |
| 5. Déclencheur d'exécution | buzz-run (Schwirrlauf) | aucun : le transport est l'exécution | [Lindauer 1955] (non vérifiée) **[à confirmer]**; référence moderne absente de la bibliographie |
| 6. Exécution | décollage; vol guidé par une minorité informée (hors P5, voir P9) | transports jusqu'au vidage du vieux nid; tandems inversés | [Pratt et al. 2002] [R] |
| 7. Échec | scission en vol : trois cas recensés par Seeley et Visscher (dont deux essaims de Lindauer, 2 sur 19), quorum atteint avant le consensus; le signal d'arrêt n'est ni mentionné ni mesuré dans ces cas | scission (Fig. 8b); changements d'engagement mauvais → bon 14 %, bon → mauvais 3,8 % | [Seeley et Visscher 2003] (lu par l'audit); [Franks et al. 2002]; [Marshall et al. 2009] |

Réalisation : (i) le premier site dont le compte atteint Q_site déclenche PIPING_ON à t_q; (ii) préparation de durée D, annulable si le compte retombe sous Q_site [I]; (iii) LIFTOFF à t_q + D, avec classement de l'issue (décision, scission). Calibrer l'unité de temps du modèle sur la moyenne de 196 min (un nichoir) [Seeley et Visscher 2004] ([S] via [Seeley et al. 2006]) [I]. Aucune valeur de D n'est publiée dans les sources lues : D est un paramètre libre **[à confirmer]**.

### 4.5 Résumé ODD

Résumé au format ODD [Grimm et al. 2006; Grimm et al. 2020]; l'ODD complet de chaque modèle et un delta-ODD par variante de canal sont des livrables (section 10).

| Élément ODD | Modèles à populations (M1 à M5, M9) | M6, M7, M8 (individu-centrés) | Modèle commun (couche 3) |
|---|---|---|---|
| 1. Objectif et patrons | patrons (a) à (c) ci-dessus | patron (b) : compromis vitesse/justesse | seul le canal varie : persistance, portée, adressage, format |
| 2. Entités, variables, échelles | proportions ou effectifs Ψ, X, Y, Z, B; temps continu | n individus (40 en M6); états individuels | N agents, 2 ou 3 options, états U, A, B (et évaluatrice/recruteuse côté fourmi) |
| 3. Déroulement | pas fixe (RK4) ou temps continu (SSA); franchissement du quorum = événement | temps discret; ordre de mise à jour testé une fois par modèle (critère : écart < 3 ES de Monte Carlo) | SSA; ordre de mise à jour = facteur de scénario |
| 4. Concepts de conception | émergence; stochasticité = SSA ou bruit k | interaction par comptage au site; stochasticité = tirages | rétroaction positive (recrutement), inhibition (σ, ciblée ou non), expiration (α) ou persistance |
| 5. Initialisation | M1 : (0,01 ; 0,0101) dans le pré-test; M4, M3 : effectifs non publiés | n non engagés (M6) | conditions initiales du modèle de référence visé |
| 6. Données d'entrée | aucune | aucune | aucune (les paramètres vont au manifeste de run) |
| 7. Sous-modèles | équations de la section 4.3 | formule de Hill (M6, M7) | module de quorum (Hill, T, k), module de signal (ciblé, non ciblé, ciblage gradué p) |

---

## 5. Cibles de reproduction

**Nature des cibles (à lire d'abord).** Toutes sont des **réplications** d'un résultat publié, jamais des validations contre des données (principe 1 du cadre). Côté abeille, les cibles solides sont des **résultats de modèle** (T5.1 à T5.8); les cibles empiriques (T5.9 à T5.13) reposent sur 4 à 6 essaims et ne valent que comme garde-fous : 4 essaims pour [Seeley et Visscher 2004], 5 essais pour [Seeley et Buhrman 2001], 6 essaims pour [Seeley 2003]. Côté fourmi, 11 à 18 colonies par expérience, mais plusieurs cibles passent par un modèle à agents dont les paramètres ne sont pas lus (M7).

**Portes go/no-go** (le protocole général est dans [04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)).
- **A, bloquante :** identité numérique ou relation analytique. Un échec est un défaut d'implantation : aucune expérience E avant correction.
- **B, conditionnelle :** dépend d'une source non lue ou d'une valeur **[à confirmer]**. No-go : la cible reste « forme seule » (relationnelle) et le plan B de la section Risques s'applique.
- **C, garde-fou :** empirique à petit effectif. Non bloquante : un échec va au registre des déviations et la limite est signalée.

| ID (dossier) | Espèce | Grandeur | Valeur publiée | Niveau | Tolérance ou marge | Répét. | Source (emplacement) | Lecture | Porte |
|---|---|---|---|---|---|---|---|---|---|
| **T5.1** (A1) | *A. mellifera* | σ̂\* où ΔΨ > 10⁻³ à l'équilibre, (γ, α, ρ) = (3, 1/3, 3) | σ\* = 4αγρ/(ρ−α)² = 1,6875 [I] | identité numérique | σ̂\* dans [1,654 ; 1,721] (±2 %); pas ≤ 0,01; t ≥ 500 jusqu'à stabilisation; 2 conditions initiales (±10⁻⁴) | 1 par point | [Seeley et al. 2012], SOM, *Discriminate Stop-signal Model* | [T]; valeur [I] | A |
| **T5.2** (A2) | *A. mellifera* | (Ψ_A, Ψ_B) à t = 200 | σ = 1 : 0,4585 chacun; σ = 10 : (0,8497 ; 0,0392) [I] | identité numérique | ±10⁻³ | 1 | [Seeley et al. 2012], SOM, Fig. S3 | [T]; valeurs [I] | A |
| **T5.3** (A3) | *A. mellifera* | ΔΨ à t = 500 sous signal **non ciblé** | ΔΨ → 0 : interblocage persistant | **test d'implantation** (propriété analytique de M1b) | ΔΨ < 10⁻³ pour σ ∈ {0,1 ; 1 ; 10 ; 100}; (3, 1/3, 3); perturbation initiale 10⁻² | 1 | [Seeley et al. 2012], SOM, Fig. S2 | [T] | A |
| **T5.4** (A4) | *A. mellifera* | σ̂\*(v), γ = ρ = v, α = 1/v | σ\* = 4v³/(v²−1)² : 8,640; 3,556; 1,138; 0,408 pour v ∈ {1,5 ; 2 ; 4 ; 10} [I] | identité numérique | écart ≤ 2 % | 1 par point | [Pais et al. 2013], Éq. 4, Fig. 2 | [T]; valeurs [I] | A |
| **T5.5** (A5) | *A. mellifera* | première option à franchir le seuil 0,7 (seuil de la Fig. 5 appliqué à la Fig. 3 par inférence [I], **[à confirmer]**); troisième option supérieure découverte à t = 30; k = 0,05 | interblocage puis choix de la 3e option | relationnel | 3e option choisie dans ≥ 90 % des exécutions; aucune option faible ne franchit avant t = 30 dans ≥ 90 % | 200 | [Pais et al. 2013], Fig. 3 | [T]; Text S1 non lu | B |
| **T5.6** (A6) | *A. mellifera* | Δv_min/v̄ en fonction de σ | K(σ) croissant (Éq. 5) | relationnel | R² ≥ 0,99 (partie asymptotique); K strictement croissant sur ≥ 3 valeurs de σ | 1 par point | [Pais et al. 2013], Éq. 5, Fig. 4 | [T] | A |
| **T5.7** (A7) | *A. mellifera* | Δv de saut à la montée et à la descente; v̄ = 4, σ = 4 | boucle d'hystérésis; sauts vers ±0,5 (lecture graphique [I]) | relationnel | boucle présente (sauts asymétriques); valeur absolue du saut dans [0,4 ; 0,6] | 1 par point (balayage lent de Δv) | [Pais et al. 2013], Fig. 5 droite | [T] pour les paramètres; ±0,5 [I] | A |
| **T5.8** (A8) | *A. mellifera* | Y2/(Y1+Y2) à t = 200 | α = δ = 0,5 : consensus sur le site 2 quel que soit le retard; α = 0,7 : impasse | relationnel | β1 = 1,0; β2 = 1,2; γ = 0,3; δ = 0,5; site 2 retardé de {0 ; 20 ; 50}; α = 0,5 : ratio > 0,95 aux trois retards; α = 0,7 : ratio < 0,95 et Y1 > 0,05 | 1 par point | [Franks et al. 2002], Fig. 7 (modèle de [Britton et al. 2002]) | [S] via [T]; conditions initiales non publiées | B |
| **T5.9** (A9) | *A. mellifera* | rapport du temps jusqu'au quorum, 5 cavités contre 1; quorum = 15 | 442 min contre 196 min (moyennes de 4 essaims), soit 2,26 | garde-fou | rapport dans [1,5 ; 3,5]; IC du rapport par bootstrap | 200 par traitement | [Seeley et Visscher 2004] | [R]; moyennes [S] ([Seeley et al. 2006]) | C |
| **T5.10** (A10) | *A. mellifera* | fraction des exécutions où le quorum est atteint alors que ≥ 2 sites ont encore des danseuses; quorum = 15 | quorum ni nécessaire ni suffisant (le consensus non plus) | garde-fou qualitatif | > 0, rapportée avec IC | 500 | [Seeley et Visscher 2003] | [R]; texte intégral lu par l'audit | C |
| **T5.11** (A11) | *A. mellifera* | P(meilleur site), 1 site supérieur et 4 moyens | 4 essaims sur 5 | garde-fou | P̂ ≥ 0,6 (IC binomial de 4/5 : environ 0,28 à 0,99) | 500 | [Seeley et Buhrman 2001] | [R] | C |
| **T5.12** (A12) | *A. mellifera* | position du compromis (temps minimal sous P(meilleur) ≥ 0,9) | quorum de 15 à 20; réduction de 15 à 20 circuits par visite | ordre de grandeur | quorum optimal dans [10 ; 25]; réduction optimale dans [10 ; 25] circuits/visite | 100 par point (N_sim publié) | [Passino et Seeley 2006] ([S] via [Seeley et al. 2006]) | [S]; équations non lues | B |
| **T5.13** (A13) | *A. mellifera* | fraction des retraits « spontanés » | 23 sur 27 (6 essaims) = 0,85; IC binomial environ 0,66 à 0,96 | garde-fou | ≥ 0,7 dans un modèle à expiration | 200 | [Seeley 2003] | [R] | C |
| **T5.14** (F2) | *T. albipennis* | délai découverte → premier transport, nids à 6 cm; T = 2 contre T = 5 | 9 contre 12,5 min (Exp. 3, p < 0,05), soit −28 %; 10,5 contre 11,5 (Exp. 1) et 8,5 contre 11,0 (Exp. 2), non significatifs | relationnel | réduction du temps médian dans [10 % ; 50 %] | 500 par condition | [Franks et al. 2003], Fig. 2 | [T] | B |
| **T5.15** (F3) | *T. albipennis* | transports vers le nid médiocre; nid final | plus de transports vers le médiocre sous conditions dures (N = 11, p < 0,05, différence médiane 1); meilleur nid accepté en premier 31/32; les 32 essais finissent dans le meilleur nid en 1 h; 30/32 essais avec les deux nids découverts avant tout transport | relationnel | plus de transports vers le médiocre à T bas (Mann-Whitney, p < 0,05); nid final = meilleur dans ≥ 95 % des exécutions dans les deux conditions | 500 + 500 | [Franks et al. 2003], Fig. 5 | [T] | B |
| **T5.16** (F4) | *T. albipennis* | fraction de recruteuses; rapport transport/tandem | 1/3 des ouvrières recrutent; transport 3 fois plus rapide que le tandem; tandems inversés après le basculement | relationnel (le rapport est une entrée) | rapport = 3 imposé; fraction émergente dans [0,23 ; 0,43] | 200 | [Pratt et al. 2002] | [R] | B |
| **T5.17** (F5) | *T. albipennis* | nombre moyen de suiveuses par recruteuse avant le quorum | environ trois (estimation prudente de la source); quorum d'environ 10 à 20 compagnes | garde-fou | entre 2 et 4 | 200 | [Franks et al. 2002], Conclusions (citant [Pratt et al. 2002]) | [T] (seconde main sur Pratt 2002) | C |
| **T5.18** (F6) | *T. albipennis* | effectifs finaux B1 et B2 | Fig. 8a : pas de scission; Fig. 8b : scission (paramètres en M4) | relationnel | (a) B1(fin) ≤ 1 fourmi; (b) B1(fin) > 1 et B2(fin) > B1(fin) | 1 (déterministe) | [Franks et al. 2002], Fig. 6b et 8 | [S] via [T]; effectifs initiaux non donnés | B |
| **T5.19** (F7) | *T. albipennis* | taux de rencontres et population au basculement selon l'aire du nid | basculement au même taux de rencontres quelle que soit la taille du nid; population plus basse dans un petit nid; visites raccourcies d'environ 2 min après le basculement | relationnel | taux invariant à ±15 % entre deux aires (rapport 1:2); population au basculement **croissante** avec l'aire | 200 par aire | [Pratt 2005a] | [R]; valeurs absolues non lues | B |
| **T5.20** (F8) | *T. curvispinosus* | durée; fraction dans le bon nid | 87 ± 77 min et 84 ± 11 % (forcé) contre 565 ± 314 min et 97 ± 7 % (non forcé) | relationnel (conditionnel au SI) | écart de justesse ≥ 5 points; rapport des durées ≥ 3 | 1 000 | [Pratt et Sumpter 2006] | [T] sans SI | B |
| **T5.21** (F9) | *T. curvispinosus* | gains relatifs d'un quorum de 11,3 contre 0 | +40,7 % de justesse, +5,7 % de durée; incohérence interne 11,3 / 12,7 ± 0,6 | relationnel | gain de justesse ≥ 20 %; effet sur la durée ≤ 15 % | 1 000 | [Pratt et Sumpter 2006], Discussion | [T] | B |
| **T5.22** (T4 de x-choregraphie) | *T. albipennis* | part des changements d'engagement par recrutement | 14 % (mauvais → bon nid) contre 3,8 % (bon → mauvais), réanalyse de [Pratt et al. 2002] | distributionnel (calibration) | 14 ± 4 % et 3,8 ± 2 %; nids à 10 cm (condition de calibration) | 200 émigrations | [Marshall et al. 2009], §8 | [T]; dénominateur **[à confirmer]** | B |
| **T5.23** (G1) | générique (contexte *Temnothorax*) | fraction finale vers X; temps jusqu'à l'engagement de tous | k = 1 : 75,5 % et 253,7 ± 64,0 pas; k = 9 : 83,3 % et 307,8 ± 71,0 pas; choix indépendant 66,7 % | distributionnel (TOST) | fraction ±4 points; durée ±15 % (notes ci-dessous) | ≥ 2 000 | [Sumpter et Pratt 2009], §4(b), Fig. 4 | [T]; lecture de r **[à confirmer]** | A (fraction), B (durée) |
| **T5.24** (G2) | *A. mellifera* (modèle, commun) | k minimisant le temps moyen de décision (commutation directe, r1 − r2 = 2) | k = 0 minimal; encart ≈ 0,72–0,73 à k = 0 et ≈ 0,85 à k = 1 (lecture graphique [I]) | relationnel | k̂ = 0 sur {0 ; 0,1 ; … ; 1}; croissance monotone; ratio ⟨DT⟩(k=1)/⟨DT⟩(k=0) = 1,17 ± 0,05 [I, **à confirmer**] | ≥ 1 000 par point | [Marshall et al. 2009], §7, Fig. 5 | [T]; matériel supplémentaire non lu | B |

**Notes.**

1. **Correspondance avec le dossier.** A1 à A13 → T5.1 à T5.13; F2 à F9 → T5.14 à T5.21; T4 de x-choregraphie → T5.22 (ajoutée : seule cible fourmi sur les changements d'engagement, utile à la parité); G1 et G2 → T5.23 et T5.24. **F1 n'est pas une cible** : c'est une entrée qui fixe deux niveaux de T (quorum médian de 3 contre 6, 4,5 contre 7,5 et 2 contre 5 selon l'expérience; Wilcoxon p < 0,005 [Franks et al. 2003]), soit T_dur d'environ 0,4 à 0,6 fois T_doux. La fiche compte donc 24 cibles, comme le dossier compte 24 lignes.
2. **Marges TOST de T5.23 : correction du dossier.** Le dossier visait ±2 points et ±10 %, ce qui n'est pas un TOST valide à 1 000 exécutions (x-methodes). Pour une proportion voisine de 0,75, ±2 points exigent environ 7 920 exécutions par bras, ±4 points environ 1 980, ±10 points environ 320. Pré-test (X18) : écart +0,77 point, IC à 90 % [−2,38 ; +3,91] : équivalence établie à ±4 points, non à ±2. Durée (X19) : écart +23,5, IC à 90 % [+18,5 ; +28,5] : non établie à ±10 % (25,4), établie à ±15 % (38,1), sous réserve de la lecture de r et du sens du « ± » publié **[à confirmer]**. La marge de ±15 % est un choix de l'auteur de la fiche [I], sans seuil biologique; elle est fixée avant les exécutions confirmatoires avec cette justification, et révisée si le code des auteurs tranche la lecture de r [Lakens 2017; Schuirmann 1987].
3. **Cibles empiriques (T5.9 à T5.13, T5.17).** Aucun TOST : l'effectif publié est trop petit. Critère = intervalle de plausibilité, rapporté avec son IC; jamais présenté comme validation.
4. **Implantation double.** Pour les cibles de porte A, deux implémentations indépendantes (Python dans `recherche/verifications-numeriques/`, TypeScript pour le moteur), alignées par docking à l'identité numérique à la tolérance indiquée (x-methodes).
5. **Interblocage à σ = 0.** Garanti par la structure des équations pour deux options égales avec v > 1 : test d'implantation (T5.3), pas un résultat.
6. **Valeurs à confirmer héritées du dossier :** seuil 0,7 de T5.5; restriction v ≥ 1 ([Reina et al. 2017]); replis ±0,5 de T5.7 (lecture graphique); rapport 1,17 de T5.24; dénominateur de T5.22; lecture de r de T5.23.

---

## 6. Expériences originales

Elles s'ouvrent après la porte A. Sauf mention, elles sont exploratoires : leurs résultats ne sont pas présentés comme confirmés. Tout facteur dont le niveau est marqué **[à confirmer]** est fixé au pilote avant l'exécution.

**E5.1 — Carte des régimes σ × Q (H5.5).**
*Plan :* M2 (k = 0,05) et M1c déterministe (k = 0), deux options égales. Pour chaque cellule (σ, Q), intégrer jusqu'à t_max (étendu près de σ\* à cause du ralentissement critique) et classer l'issue : décision (une seule population ≥ Q), interblocage (aucune ≥ Q à t_max), scission (les deux ≥ Q; possible seulement si Q ≤ 0,5).
*Facteurs :* σ/σ\* dans {0 ; 0,5 ; 1 ; 1,5 ; 2} [I, à confirmer]; Q sur une grille fine autour de Ψ_s(σ) [pas à confirmer]; v̄ dans {1,5 ; 2 ; 4} (valeurs de T5.4).
*Répétitions :* 200 par cellule en exploratoire (valeur du dossier p6-pathologies pour cette carte); 1 par cellule en déterministe.
*Critère de lecture :* frontière scission/interblocage à Q = Ψ_s(σ). Ancres à v̄ = 2 [I, p6-pathologies] : Ψ_s(0) ≈ 0,46; gagnant à 1,5σ\* ≈ 0,59. La carte doit contenir les trois régimes.

**E5.2 — Interblocage à N fini (H5.3).**
*Plan :* SSA direct sur M1c (propensités en M1); sortie P(ΔΨ/N > 0,3 à t = 40).
*Facteurs :* N dans {50 ; 200} (pilote X7), N intermédiaires **[à confirmer]**; σ dans {0,95σ\* ; 1 ; 1,05σ\* ; 10}, σ\* = 1,6875 pour (3, 1/3, 3).
*Répétitions :* 200 au pilote; en confirmatoire, n = p(1−p)/ES² avec ES ≤ 0,005 (jusqu'à 10 000 au pire cas) [Morris et al. 2019].
*Critère de lecture :* baisse de P avec N sous σ\*, P → 1 au-dessus; docking ODE ↔ SSA : écarts inférieurs à 3 ES de Monte Carlo (x-methodes).

**E5.3 — Chaîne décision → action, en parité (H5.6).**
*Plan :* abeille : M2 plus détecteur de quorum de site plus préparation D (section 4.4); fourmi : M4 stochastique (ou M7 si accessible) avec basculement tandem → transport.
*Facteurs, abeille :* Q_site dans {10 ; 15 ; 20}; D (niveaux **[à confirmer]**, D = 0 comme contrôle « décollage immédiat »); réduction des danses par visite dans [10 ; 25] circuits (T5.12); nombre de sites, 1 contre 5 (T5.9); σ dans {0 ; 1,5σ\*} [I, à confirmer].
*Facteurs, fourmi :* T dans {2 ; 5} (niveaux de [Franks et al. 2003]) plus un T élevé **[à confirmer]**; ρ12 dans {0,004 ; 0,008} (Fig. 8 de [Franks et al. 2002]); retard de découverte du second site **[à confirmer]**.
*Répétitions :* 200 à 500 par cellule (valeurs de T5.9 et T5.10).
*Critère de lecture :* pente de P(scission) en D et en Q_site. Condition préalable : le même modèle restitue T5.9 (rapport 5 cavités / 1 cavité); sinon la pente n'est pas lue.

**E5.4 — Sites égaux, parité (H5.7).**
*Plan :* mêmes qualités aux deux sites. Abeille : M1c; fourmi : M4 stochastique avec k1 = k2. Issues : décision unique, scission, interblocage (aucun quorum à t_max).
*Facteurs :* σ dans {0 ; 0,5σ\* ; 2σ\*} [I, à confirmer] (abeille); ρ12 dans {0,004 ; 0,008}, retard de découverte nul puis non nul **[à confirmer]** (fourmi).
*Répétitions :* ES de Monte Carlo ≤ 0,01, soit 2 500 par cellule au pire cas (900 si p = 0,9) [Morris et al. 2019].
*Critère de lecture :* fréquence de chaque issue par taxon; écart attendu ≥ 0,2 **[à confirmer]**. La comparaison est descriptive : l'asymétrie (aucune inhibition croisée documentée chez la fourmi) est déclarée.

**E5.5 — Adressage gradué et coût du signal fort (H5.4, extension de H5.2).**
*Plan :* M1 avec terme d'inhibition pour A égal à σ[p·Ψ_B + (1−p)·½(Ψ_A+Ψ_B)] (p = 1 : M1c; p = 0 : M1b), (γ, α, ρ) = (3, 1/3, 3). Étape déterministe : signe de λ(σ, p) = ρΨ_U − α − σ(1−p)Ψ_s au point symétrique, plus intégration RK4 de contrôle. Étape stochastique : SSA à N = 200 sur les plages trouvées. Étendre K(σ) de T5.6 aux grands σ (limite « veto »).
*Facteurs :* p dans {0 ; 0,25 ; 0,5 ; 0,75 ; 0,9 ; 1} [I, à confirmer]; σ jusqu'à une valeur très supérieure à σ\* **[à confirmer]**.
*Étalonnage :* les proportions de signaux ipsi/contra de [Seeley et al. 2012] (texte principal, non lu) fixeraient un p empirique; à défaut, balayage de p.
*Répétitions :* 1 en déterministe; SSA selon l'ES de Monte Carlo.
*Critère de lecture :* p_min et borne supérieure de la plage de σ; comparaison avec le régime « veto ».

**E5.6 — Quorum k-sur-n à erreurs corrélées, avec témoin orchestré (H5.8, H5.9).**
*Plan :* agents à règles (pas de LLM). Chaque agent évalue les options à partir d'indices bruités dont les erreurs ont une corrélation intra-classe ρ_err (bêta-binomiale, comme la cible T8.4 du dossier p8-individu-colonie). Quatre bras appariés sur la graine d'environnement : (R0) vote indépendant sans canal (référence nulle); (R1) agent unique à budget égal; (R2) quorum local du modèle commun (accumulation de Hill avec k ≥ 2, inhibition ciblée et expiration activables); (R3) **témoin orchestré** : agrégateur central à information complète, au même budget de messages.
*Structure de tâche :* décomposable (chaque option s'évalue indépendamment, en parallèle) ou séquentielle (l'évaluation de l'option j exige le résultat de j−1 : le parallélisme des éclaireuses n'accélère plus).
*Facteurs :* n; quorum k/n; ρ_err (dont 0,1, pour l'ancre 0,736 à p = 0,6); inhibition (oui/non); expiration (oui/non); structure de tâche.
*Répétitions :* ES de Monte Carlo ≤ 0,01 (2 500 au pire cas, 900 si p = 0,9); pour l'interaction, 4 à 16 fois ce nombre (x-methodes).
*Mesures :* ΔP appariée avec IC par bootstrap sur les exécutions (graines appariées); G du cadre seulement si P_ref ≤ 0,9, car G est indéfini quand P_ref = P_max (p8-individu-colonie), avec P_max = 1 proposé [I] (consolidation dans [03-plan-de-recherche.md](../docs/03-plan-de-recherche.md)); décomposition agrégation (vote) plus interaction; coût en messages; issues d'échec codées séparément (scission, interblocage, refus), comme le scénario quorum de P7.
*Critère de lecture :* plafond et n_sat (H5.8); contraste d'interaction (H5.9). Rien n'est affirmé sur les LLM avant P7.

---

## 7. Parallèle agentique

On transpose des **relations** (qui dépend de quoi), pas des termes (« quorum », « essaim »). Statuts épistémiques : *Résultat reproduit* n'est acquis qu'une fois la cible citée passée.

### 7.1 Relations transposées

| Relation chez l'insecte | Source | Transposition aux agents | Statut épistémique |
|---|---|---|---|
| **Course vers un seuil.** Une population qui intègre des indices bruités jusqu'à un seuil décide; seul le modèle d'abeille à commutation directe sans déclin (k = 0) atteint asymptotiquement l'optimum du test séquentiel, le modèle de fourmi l'exigerait par connaissance globale. | [Seeley et al. 2012]; [Marshall et al. 2009] | Un système multi-agents qui s'engage quand k agents sur n soutiennent une proposition implémente un quorum; T règle vitesse et justesse. Appui : le protocole de décision change à lui seul la performance (vote +13,2 % en raisonnement, consensus +2,8 % en connaissances) [Kaesberg et al. 2025] [R]. | Résultat reproduit (modèle, sous T5.24); transposition : Hypothèse de l'auteur |
| **Indépendance avant interdépendance.** Chaque recrue inspecte elle-même le site avant de danser; la fiabilité vient de l'équilibre entre indépendance et interdépendance. | [Seeley et al. 2006]; [List et al. 2009]; [Sumpter et Pratt 2009] | Exiger qu'un agent revérifie (ré-exécute le test, relit la source) avant d'endosser, au lieu de recopier l'avis majoritaire. Limite : les LLM se conforment à la majorité [Weng et al. 2025]. | Hypothèse de l'auteur |
| **Inhibition ciblée, pas veto diffusé.** Non ciblé, le signal d'arrêt laisse l'interblocage; ciblé vers les partisans du rival, il brise l'égalité; fort, il discrimine moins les options proches. | [Seeley et al. 2012], SOM; [Pais et al. 2013] | La critique d'un agent vise les propositions rivales et désengage probabilistiquement leurs partisans; un « stop » général ne brise pas l'égalité. Appui robotique : [Reina et al. 2015]; [Gray et al. 2018]. | Modèle simplifié (sous T5.1 à T5.4, T5.6); transposition : Hypothèse de l'auteur |
| **Urgence réglable.** Monter σ ou baisser le quorum et le taux d'acceptation force un choix. | [Pais et al. 2013] (rampe de σ); [Franks et al. 2003]; [Pratt et Sumpter 2006] | Un délai de grâce qui abaisse le quorum ou augmente l'inhibition à mesure que le budget (temps, jetons) s'épuise. | Hypothèse de l'auteur |
| **Persistance contre expiration de l'engagement.** La fourmi ne cesse de recruter que si elle trouve mieux; l'abeille cesse spontanément de danser. Une réduction trop lente des danses donne des décisions scindées. | [Franks et al. 2002]; [Seeley 2003]; [Passino et Seeley 2006] [S] | TTL sur les endossements contre engagement persistant révocable seulement par une meilleure proposition. | Analogie (elle casse sur le point de la section 7.2 relatif au TTL) |
| **Interblocage et scission comme défauts de terminaison.** | [Pais et al. 2013]; [Cemri et al. 2025] (taxonomie MAST : 14 modes, 3 catégories, κ = 0,88) | L'interblocage symétrique (aucune décision) et la scission (double engagement) sont des candidats de mécanisme pour une partie de ces défaillances; à tester, jamais à affirmer. | Hypothèse de l'auteur |
| **Décision puis action, en deux temps.** | [Seeley et Visscher 2003]; [Pratt et al. 2002] | Engagement en deux phases (seuil, préparation, exécution) avec annulation possible si les conditions se dégradent. Aucun analogue biologique vérifié de la compensation d'un effet déjà engagé (question ouverte de x-choregraphie). | Analogie |
| **Chorégraphie contre orchestration.** Le remède de Janis à la pensée de groupe passe par des évaluateurs centralisés; les insectes s'en passent par le quorum. | [Sumpter et Pratt 2009] | Juge central contre quorum local, comparables sur la même tâche (E5.6, H5.9). | Hypothèse de l'auteur |
| **Formalisations algorithmiques.** | [Ghaffari et al. 2015]; [Valentini et al. 2017]; [Du et al. 2024] | Bornes de coût; meilleur-de-n avec coût d'échantillonnage par option; débat convergeant vers une réponse commune. | Modèle simplifié |

### 7.2 Où l'analogie casse

- **Indépendance.** Un n nominal n'est pas un n effectif : un jury de 9 LLM vaut environ 2 votes indépendants [Kohli 2026]; l'accord atteint 60 % quand deux modèles se trompent [Kim et al. 2025b]; la sagesse des foules suppose des erreurs indépendantes [Couzin 2009]; avec causes communes la limite de la majorité est inférieure à 1 [Dietrich et Spiekermann 2013]. Conséquence testée : H5.8.
- **Coût.** Chez les LLM le coût se compte en jetons, pas en temps d'exposition (les jetons expliquent environ 80 % de la variance de performance sur BrowseComp [Hadfield et al. 2025]).
- **Intérêts.** La coopération des insectes est un acquis évolutif, pas une hypothèse de protocole [Feinerman et Korman 2017].
- **Bruit.** Le bruit sensoriel k de M2 n'est pas un levier chez un LLM : `temperature` n'est pas réglable sur les modèles récents et aucun `seed` n'est exposé [Anthropic 2026a]; on le remplace par K répétitions et un journal de rejeu. Paramètres à revérifier avant toute exécution (cadre).
- **Valeur.** M2 suppose un scalaire de valeur v_i; un juge LLM produit un score bruité sans vérité de terrain : la sensibilité à la valeur n'est pas acquise.
- **Primitives.** Ni A2A ni MCP n'ont de primitive de quorum; un état REJECTED est un refus individuel, pas un signal d'arrêt adressé aux autres (lecture outillée, à confirmer par recherche plein texte) [A2A 2026a; MCP 2026].
- **Oubli.** Le TTL est une propriété du canal; l'expiration de l'abeille est une décroissance de l'engagement de l'**émetteur** : la danse n'a aucune persistance (audit bio-abeilles). Les deux ne sont pas interchangeables.
- **Anonymat.** Les insectes interagissent de façon anonyme et à peu près bien mélangée; les agents sont identifiés et leur topologie est souvent fixe [Feinerman et Korman 2017].
- **Identité des agents.** « Des agents LLM identiques s'interbloquent » est une hypothèse sans acquis (cadre, point 13) : elle se teste en P7, elle ne s'affirme pas.

### 7.3 Témoin orchestré

Chaque volet agentique inclut un témoin orchestré (QR3). Trois niveaux, du modèle au LLM :
- **Modèle.** L'optimum à information globale est le test séquentiel (DDM; [Wald et Wolfowitz 1948], **[non vérifiée]**, transcrite de [Marshall et al. 2009]). Le modèle d'abeille à commutation directe sans déclin l'atteint asymptotiquement sans observateur central; c'est le repère théorique du témoin.
- **Agents à règles (P5, E5.6).** Bras R3 : agrégateur central qui voit tous les indices et décide au même budget de messages que le quorum local.
- **Agents LLM (P7).** Juge central LLM, un appel, au même budget de jetons que le quorum; modèles ouverts si la « colonie » compte N ≥ 10 (p8-individu-colonie).

### 7.4 Structure de tâche

La tâche de P5 est, par construction, **décomposable** : chaque option s'évalue indépendamment, en parallèle. La variante **séquentielle** (l'évaluation de l'option j exige le résultat de j−1) retire l'avantage du parallélisme. Prédictions [I] (Hypothèse de l'auteur, H5.9) : sur tâche décomposable, pas d'avantage net du témoin à budget de messages égal; sur tâche séquentielle, avantage plus grand de l'orchestrateur. Le contraste est une interaction : prévoir 4 à 16 fois les exécutions d'un effet principal (x-methodes).

### 7.5 Lien avec P7

- Le scénario « quorum » de P7 (score primaire : choix du meilleur site à budget de rondes fixe; score secondaire : délai de décision; échecs codés séparément : scission, interblocage, refus) s'appuie sur les modèles de P5 (p7-agents-llm).
- P5 fournit à P7 : (a) la règle de quorum (Hill, k ≥ 2, T) et le signal ciblé, spécifiés pour le harnais; (b) la condition « LLM exécutant la règle », qui est un docking avec la politique à règles, testée par équivalence (hypothèse d'équivalence du plan de P7, x-methodes); (c) les prédictions H5.8 et H5.9 à confronter aux LLM; (d) le témoin orchestré.
- Dépendance : P7 attend la porte A de P5 (T5.1 à T5.4, T5.6, T5.7) et T5.23 (cadre : P7 dépend des résultats reproduits de P1, P3, P5 et P8). La fiche de P7 : [P7-synthese-agentique.md](P7-synthese-agentique.md).

---

## 8. Visuels et trois niveaux

Les neuf visuels du dossier, plus deux issus des expériences (carte σ × Q, curseur N), sont répartis sur les trois niveaux du cadre. Chaque page déclare son public principal : **Voir** = grand public; **Explorer** = étudiants et praticiens de l'agentique; **Vérifier** = chercheurs. Les marques de couleur (fourmi #D55E00, abeille #0072B2, agent #CC79A7) sont toujours doublées de pictogrammes.

| | **Voir** (récit guidé, avec prédiction) | **Explorer** (bac à sable étayé) | **Vérifier** (reproduction) |
|---|---|---|---|
| **Montré et manipulé** | Cinq écrans, chacun précédé d'une prédiction. (1) Fourmi : vieux nid détruit, deux nids à 6 cm, jauge de quorum; tandems (une fourmi menée par une autre), puis transports (une fourmi portée) quand la jauge est franchie. (2) Abeille : grappe, danseuses colorées par site (durée proportionnelle à la qualité, −15 circuits par retour), compteur au nichoir avec ligne de quorum à 15, puis *piping*, puis envol. (3) Deux sites identiques : l'égalité tient-elle? (4) Interrupteur « signal ciblé / non ciblé » (Fig. S2 contre S3 de [Seeley et al. 2012]) : la démonstration la plus parlante pour l'analogie agentique. (5) Encart « Ce que fait vraiment la reine » : l'essaim décolle même avec la reine en cage (lu par l'audit dans [Seeley et Visscher 2003]); elle diffuse, elle n'ordonne pas. | Écran partagé fourmi/abeille (même moteur M6, deux habillages); **triangle U-A-B** (simplexe de [Pais et al. 2013], Fig. 1 : lignes de flux, variété lente, attracteurs pleins, cols vides, point rouge = état de l'essaim; curseurs σ, v̄, Δv), visuel central; diagramme de bifurcation σ → Ψ_A − Ψ_B avec σ\*(v) en encart, zone grisée « interblocage adaptatif », bouton « rampe de σ »; expérience des 5 nichoirs (chronomètre comparé à 196 et 442 min); frontière vitesse-justesse (T de 0 à 20, k dans {1 ; 2 ; 4 ; 9}, points de [Franks et al. 2003] et [Pratt et Sumpter 2006] superposés); loi de Weber; hystérésis; carte comparative fourmi / abeille / agents (section 4.1, taille, signal, fin d'engagement, freinage, quorum); carte σ × Q (E5.1); curseur N (au pilote, la sortie de l'égalité passe d'environ 44 % à 10 % de N = 50 à N = 200, X7). | Distribution sur N graines (histogrammes de la fraction vers X et des durées de T5.23, bande TOST autour de 75,5 % et 83,3 %); table des 24 cibles avec statut (acquise, échec, déviation, source manquante); code, manifeste de run et rejeu d'un run par graine; limites affichées : 4 à 6 essaims, résultats de modèle, lecture de r à confirmer. |
| **Vue de l'agent** | Une éclaireuse suivie individuellement : ce qu'elle perçoit (danse suivie, signal d'arrêt reçu, compte local au site) et ce qu'elle fait, sans voir la colonie. | Panneau de l'agent : état (U, A, B; évaluatrice ou recruteuse côté fourmi), taux γ, α, ρ, σ traduits en probabilités par pas, compte local; taux de rencontres côté fourmi. | Trace par agent exportable (JSONL) liée à la graine; règle en pseudo-code (ODD). |
| **Modifier la règle** | Un seul interrupteur : ciblé ou non ciblé. | Ciblé ↔ non ciblé; ciblage gradué p (E5.5); expiration ↔ persistance de l'engagement; quorum T et exposant k de Hill; rampe d'urgence; N. | Relancer la reproduction avec la règle modifiée : le test de la cible se ré-exécute et la règle modifiée sort du registre des cibles, étiquetée « extension ». |
| **Objectifs d'apprentissage** (mesurables) | OA1 : prédire, avant de voir, si deux sites identiques mènent à une décision sans signal d'arrêt ciblé. OA2 : distinguer quorum (seuil de présence au site) et consensus. | OA3 : prédire l'effet d'un abaissement du quorum sur la vitesse et sur les erreurs transitoires. OA4 : distinguer interblocage et scission sur trois traces. OA5 : expliquer pourquoi un signal non ciblé ne brise pas l'égalité. | OA6 : distinguer un résultat de modèle d'une mesure empirique sur la table des cibles. OA7 : lire une bande d'équivalence. |
| **Accessibilité propre au projet** | Paire abeille–agent fragile en protanopie (ΔE2000 de 12,2) : pictogramme ou motif obligatoire, pas seulement conseillé (x-vulgarisation); « éclairs » du signal d'arrêt à 3 flashs par seconde au plus [W3C 2023, critère 2.3.1]; animation de plus de 5 s avec pause (2.2.2); texte alternatif par écran. | Attracteurs pleins et cols vides distingués par forme et remplissage, pas par la couleur seule (1.4.1); curseurs avec clic sur la piste en alternative au glissement (2.5.7) et cibles d'au moins 24 × 24 px (2.5.8); description textuelle en région vive (« σ franchit σ\* : un attracteur devient deux »); carte σ × Q : régimes par motifs, viridis ou cividis pour les grandeurs continues; l'écran partagé est un diagramme 2D exempté du reflow à 320 px (1.4.10) mais exige une alternative textuelle; `prefers-reduced-motion` comme bonne pratique (critère de niveau AAA, non AA) : flèches statiques et bouton « pas » à la place des lignes de flux animées. | Tableaux en HTML sémantique; code et données téléchargeables; figures avec description longue. |
| **Erreurs de compréhension à prévenir** | « La reine choisit le nid » (encart; la reine diffuse, elle n'ordonne pas); « les abeilles votent ou débattent » (aucun verbe d'intention : téléologie et anthropomorphisme exclus); « le quorum, c'est la majorité des danseuses » (le quorum se mesure au site et déclenche le *piping*; le consensus n'est ni nécessaire ni suffisant). | « Le signal d'arrêt est un veto » (inhibition probabiliste ciblée); « interblocage = bug » (adaptatif entre deux options faibles); « interblocage = scission » (aucune décision contre deux décisions); « décider vite, c'est décider mal » (chez la fourmi les erreurs sont transitoires, et chez *T. curvispinosus* les taux de recherche et d'acceptation pèsent plus que le quorum sur la vitesse); « la fourmi n'a pas de frein » (dans l'émigration le frein est le délai; ailleurs il existe des signaux négatifs, cadre point 9). | « Une réplication est une validation » (principe 1 du cadre); « les cibles d'abeille sont des mesures » (résultats de modèle, 4 à 6 essaims). Ces erreurs relèvent du motif général des explications causales erronées des processus émergents [Chi et al. 2012]. |

Seuils de réussite, items de pré-test et de post-test et condition témoin statique : fixés dans [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md).

---

## 9. Plan de simulation

Trois couches (cadre) : noyau commun, modèles de référence, modèle chorégraphique commun. Deux sorties : moteur headless Node (balayages, tests, rejeu) et couche navigateur (visuels), en TypeScript, sans autre langage. Le détail des exigences de simulation est dans [05-spec-simulation.md](../docs/05-spec-simulation.md).

| Élément | Choix | Source ou statut |
|---|---|---|
| **Couche 1, noyau (S0)** | PRNG `xoshiro128**` avec graine de 64 bits étendue par SplitMix64, un flux par sous-système (environnement, chaque taxon, politique); horloge à pas fixe découplée du rendu; RK4; SSA par méthode directe; événements discrets (franchissement du quorum); enregistreur; scénario; manifeste de run. `Math.random` et `Date.now` interdits dans la logique de simulation. | [Blackman et Vigna 2021]; [Wikipedia 2026]; [Gillespie 2007] (x-methodes) |
| **Couche 2, modèles** | M1 à M9 (section Modèles de référence), un par article, aligné sur la figure ou le tableau publié. | cadre |
| **Couche 3, modèle commun** | N agents, 2 ou 3 options; seul le canal varie (persistance, portée, adressage, format); modules de quorum (Hill, T, k) et de signal (ciblé, non ciblé, p). | cadre |
| **Pas de temps** | EDO : RK4 à pas fixe; h = 0,01 reproduit l'équilibre de M1c à ±10⁻³ à t = 200 (X5) [I]; test d'ordre : rapport des erreurs de h à h/2 dans [12 ; 20] (X4, mesuré 19,3, 16,6 et 16,2) [I]. M3, M4, M9 : h fixé par le même test; M4 en minutes sur 0 à 120. EDS (M2, M5) : Euler–Maruyama [I], pas fixé par test de convergence **[à confirmer]**. M6 : pas de 1. SSA : temps continu. Franchissement de quorum : événement, jamais terme du second membre. | x-methodes |
| **N d'agents** | M1 par SSA : N dans {50 ; 200} (pilote X7). M6 : n = 40. Fourmi : colonies de 100 à 200 au plus. Abeille : environ 150 éclaireuses visitent un site; l'essaim d'environ 10 000 n'est pas individualisé (champ moyen) [I]. Navigateur : au plus 200 agents dessinés [I]; pas de WASM (cadre : seulement si N dépasse ce que Canvas tient, avec mesure). | [Sumpter et Pratt 2009]; [Seeley et Visscher 2003]; [Franks et al. 2002] |
| **Graines** | Graine maîtresse; graine d'une exécution = SplitMix64 de (graine maîtresse, identifiant de l'exécution); graine et version du PRNG au manifeste; blocs de graines disjoints entre pilote et confirmatoire [I]; vecteurs de test X1 et X3 (identité exacte sous Node et trois navigateurs). | x-methodes |
| **Répétitions** | Celles des cibles et des expériences. Règle d'ES de Monte Carlo : confirmatoire ≤ 0,005 (10 000 au pire cas, 3 600 si p = 0,9); exploratoire ≤ 0,01 (2 500; 900 si p = 0,9); pour une moyenne, n = S²/ES² avec S d'un pilote. | [Morris et al. 2019] (x-methodes) |
| **Ordre de mise à jour** | Facteur testé une fois par modèle à agents (synchrone à double tampon; asynchrone avec permutation tirée du PRNG); critère : écart inférieur à 3 ES de Monte Carlo. Sans effet sur M6 (X17). | [Caron-Lormier et al. 2008]; x-methodes |
| **Budgets de performance** | Aucune valeur publiée. À mesurer au pilote : temps par exécution (M1c par SSA à N = 200, M4 par SSA, chaîne de E5.3), puis budget d'intégration continue de la porte A et budget de rendu fixés **avant** le préenregistrement **[estimation, à confirmer]**. Simulation hors du fil d'interface. | [I] |
| **Docking** | (i) M1c EDO ↔ SSA à N grand : la probabilité décroît avec N sous σ\*, tend vers 1 au-dessus; écarts < 3 ES (X7). (ii) Modèle commun (canal ciblé, expiration) ↔ M1c déterministe : équilibres de T5.2 à ±10⁻³. (iii) Modèle commun (canal tandem/transport) ↔ M4 : relationnel (T5.18). (iv) Modèle commun ↔ M6 : distributionnel, TOST (T5.23). (v) TypeScript ↔ Python : identité numérique du PRNG, tolérance des cibles de porte A. Le modèle commun est **aligné** par docking (la validation exigerait des données empiriques). | [Axtell et al. 1996]; [Wilensky et Rand 2007] |
| **Sorties** | Manifeste de run (graine, SHA du dépôt, paramètres, version du PRNG, ordre de mise à jour); trace JSONL par exécution; CSV agrégés; données de figure; ES de Monte Carlo avec chaque proportion ou moyenne; ODD complet; registre des déviations; fiche de reproduction par cible. | cadre; x-methodes |

---

## 10. Livrables et critères d'achèvement

| # | Livrable | Contenu | Critère d'achèvement vérifiable |
|---|---|---|---|
| 1 | Fiches de reproduction (24) | Une par cible, écrite avant le code : source et emplacement, niveau, marge, n, règle de décision, porte, registre des déviations (gabarit dans [04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)) | 24 fichiers versionnés; pour chaque modèle, `git log` montre la fiche avant le premier commit de code |
| 2 | Lectures manquantes | Liste de la section 12 | Pour chaque source : lue (statut mis à jour) ou « non lue » avec décision de plan B consignée |
| 3 | Code | Modules M1 à M9, modèle commun, scripts d'analyse, implémentation Python indépendante pour la porte A | `tsc --noEmit` sans erreur; aucun appel à `Math.random` ni `Date.now` dans la logique de simulation (recherche automatisée en intégration continue); vecteurs X1 et X3 passés |
| 4 | Tests | Un test exécutable par cible | T5.1 à T5.4, T5.6, T5.7 et la fraction de T5.23 verts sur les deux implémentations; chaque cible B ou C a une issue consignée (acquise, échec, source manquante); docking (i) à (v) passé |
| 5 | Données | Sorties de runs avec manifeste, JSONL, CSV | Archivées avec DOI (webhook Zenodo vérifié avant la première *release*); un run se rejoue à l'identique à graine fixe |
| 6 | Préenregistrement | Avant la première exécution confirmatoire : H5.1 à H5.3, critères de porte A, T5.23, SHA du dépôt et des scénarios, politique de graines, marges (±4 points, ±15 %), n, script d'analyse, règles d'exclusion; gabarit ADEMP-PreReg [Siepe et al. 2024] | Enregistrement horodaté en lecture seule [Nosek et al. 2018]; registre des déviations versionné (identifiant, date, plan d'origine, déviation, raison, catégorie, effet) [Lakens 2024; Willroth et Atherton 2024]; le format Registered Report [Chambers 2013; Chambers et Tzavella 2022] est une option de revue, non retrouvée pour les revues visées |
| 7 | Note de recherche | Réplication de M1, M2, M4 et M6; tableau des 24 cibles avec issue; ODD résumé (complet en annexe); E5.1 à E5.6 étiquetées exploratoires; déviations; limites (4 à 6 essaims; modèle contre mesure) | Chaque affirmation chiffrée citée; chaque marque **[à confirmer]** conservée; cible de revue [I] : *J. R. Soc. Interface* ou *PLOS Comput. Biol.*, qui exigent le code [JRSI 2026; PLOS CB 2021] |
| 8 | ODD | ODD complet par modèle de référence et delta-ODD par variante de canal | Un fichier par modèle, sept éléments dans l'ordre [Grimm et al. 2020] |
| 9 | Page interactive | Voir, Explorer, Vérifier (section 8); public déclaré; statut épistémique sur chaque énoncé et chaque graphe | Contrôles d'accessibilité du plan de V0 passés; la table des cibles de « Vérifier » est générée depuis les résultats de tests, non saisie à la main |
| 10 | Évaluation | Pré-test et post-test, condition témoin statique, objectifs OA1 à OA7 | Protocole déposé et approuvé selon V0 avant toute collecte; analyse selon [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md) |
| 11 | Passation à P6 et P7 | Modules, manifestes, spécification de la règle de quorum | P6 et P7 exécutent leurs cibles dépendantes avec les modules livrés, sans modifier le noyau |

**P5 est achevé quand :** (a) la porte A est passée; (b) chaque cible B ou C est passée ou consignée « non reproduite : source manquante » avec plan B décidé; (c) E5.1 à E5.6 sont exécutées ou écartées par décision écrite; (d) les livrables 1 à 11 satisfont leur critère. **Passation minimale à P7 :** porte A plus T5.23.

---

## 11. Risques et réserves

Numérotation locale à la fiche; les identifiants globaux sont attribués par [03-plan-de-recherche.md](../docs/03-plan-de-recherche.md).

| R | Risque ou réserve | Porte no-go | Plan B |
|---|---|---|---|
| **R1** | **Pratt et al. 2005 [non vérifiée] :** les 44 paramètres et les 19 états ne sont pas lus (ScienceDirect fermé, CAPTCHA non contourné). Une notice de 2006 au même titre est probablement un erratum [I] : à lire avant de reprendre des valeurs. | M7 non implantable : T5.14, T5.15, T5.19, T5.20, T5.21 restent « forme seule » | Accès institutionnel; SI de [Pratt et Sumpter 2006] pour T5.20 et T5.21; modèle à agents réduit reconstruit de M4 et de [Pratt et Sumpter 2006], étiqueté Modèle simplifié, cibles relationnelles seulement |
| **R2** | **Text S1 et code Matlab de [Pais et al. 2013] non lus :** valeurs de v, σ et k de la Fig. 3 inconnues. | T5.5 bloquée | Téléchargement (libre, PLoS ONE); à défaut, ajustement sur la figure et déviation consignée |
| **R3** | **Matériel supplémentaire de [Marshall et al. 2009] non lu** (n, c, q_i, r′_i). | T5.24 en forme seulement | Critère relationnel (k̂ = 0, monotonie) sans valeurs absolues; ou courriel aux auteurs |
| **R4** | **Lecture de r [à confirmer]** et sens du « ± » dans [Sumpter et Pratt 2009]. | Durées de T5.23 non tranchables | Fractions seulement (porte A); courriel aux auteurs ou code |
| **R5** | **Cibles empiriques d'abeille sur 4 à 6 essaims :** surinterprétation possible. | T5.9 à T5.13 non bloquantes | Garde-fous; IC binomiaux rapportés (4/5 : 0,28 à 0,99); jamais présentées comme validation |
| **R6** | **Valeur du quorum d'abeille non tranchée** (« 10–15 ou plus », « 15 ou plus », « 10 à 20 »); le chapitre de [Seeley 2010] n'est pas lu. | Aucune | Sensibilité sur Q_site dans {10 ; 15 ; 20} (E5.3); lecture de [Seeley et Visscher 2004] et du livre |
| **R7** | **Détection du quorum chez l'abeille inconnue** [Seeley et al. 2006] : densité au site ou effectif, choix de modélisation (Hypothèse de l'auteur). | Résultats dépendants du choix | Publier les deux variantes |
| **R8** | **Chaîne décision → action sans équation publiée dans les sources lues :** durées (environ une heure; ≥ 35 °C) lues seulement par l'audit; buzz-run référencé par [Lindauer 1955] (non vérifiée) ou par une référence moderne absente de la bibliographie. | E5.3 reste exploratoire | D libre avec analyse de sensibilité; ajouter à la bibliographie, après lecture, Seeley et Tautz 2001, Seeley et al. 2003 (échauffement) et Rittschof et Seeley 2008 (*[non vérifiée]*, métadonnées seules) |
| **R9** | **Texte principal de [Seeley et al. 2012] non lu** (proportions de signaux ipsi/contra). | p empirique inconnu | Balayage de p (E5.5) |
| **R10** | **Incohérences internes des sources :** quorum de 11,3 contre 12,7 ± 0,6 ([Pratt et Sumpter 2006]); 0,015 contre 0,016 ([Masuda et al. 2015] contre [Franks et al. 2002]); 3,33 % de Condorcet non reproductible par calcul exact. | Aucune | Signaler, ne pas utiliser comme cible, consigner au registre |
| **R11** | **Transposition aux LLM :** erreurs corrélées, `temperature` non réglable, pas de `seed`, retraits de modèles [Anthropic 2026a]. | Aucune affirmation sur les LLM avant P7 | E5.6 en agents à règles; K répétitions et journal de rejeu en P7 |
| **R12** | **Ambiguïté de taxon :** *T. albipennis* (cadre), *T. curvispinosus* (T5.20, T5.21), *T. rugatulus* (P8). | Paramètre venu d'un autre taxon | Deux préréglages nommés; ne jamais mélanger les paramètres; étiqueter toute valeur importée |
| **R13** | **Marges TOST :** ±2 points inatteignable à 1 000 exécutions; marge de ±15 % choisie après le pré-test (risque de marge opportuniste). | Marge non fixée avant les exécutions | Marge et justification écrites avant les exécutions confirmatoires; révision seulement par déviation consignée |
| **R14** | **Ralentissement critique près de σ\* :** T5.1 mal détecté à ±2 %. | T5.1 échoue à t = 500 | Détection par valeur propre ou critère de convergence; t_max étendu; déviation consignée |
| **R15** | **Références à statut ouvert :** [Visscher et Camazine 1999] non identifiée (deux œuvres de 1999 possibles); [Seeley et al. 2006], ordre des auteurs et page de fin à contrôler; version lue de [Cemri et al. 2025] non consignée **[à confirmer]**; *Apidologie* 35:101–116 (2004) est distincte de l'article de [Seeley et Visscher 2004]. | Aucune | Résoudre dans la liste de références de [Franks et al. 2002] et sur les PDF imprimés |

---

## 12. Effort et dépendances

**Effort** (semaines-personne **[estimation, à confirmer]**; aucune valeur publiée, estimation de l'auteur de la fiche).

| # | Tâche | Prérequis | Effort |
|---|---|---|---|
| 1 | Lectures manquantes et fiches de reproduction (24) | accès aux sources | 2 |
| 2 | Préenregistrement (H5.1 à H5.3, porte A, T5.23) | tâche 1 | 0,5 |
| 3 | M1, M2, M9 et tests T5.1 à T5.7 (TypeScript et Python) | S0; tâches 1 et 2 | 2 |
| 4 | M3, M4, M5, M6 et tests T5.8, T5.18, T5.22, T5.23, T5.24 | S0; Pratt et al. 2002; matériel de Marshall | 2,5 |
| 5 | M7, M8 puis T5.14 à T5.16, T5.19 à T5.21 (conditionnel à l'accès à Pratt et al. 2005, sinon plan B) | tâche 4 | 3 |
| 6 | Cibles empiriques d'abeille T5.9 à T5.13, modèle commun, docking | tâches 3 et 4 | 2,5 |
| 7 | E5.1, E5.2, E5.4, E5.5 | porte A | 3 |
| 8 | E5.3 et E5.6 | tâches 6 et 7 | 3 |
| 9 | Visuels des trois niveaux | gabarit de V0; tâches 3 à 6 | 4 |
| 10 | Évaluation (pré-test, post-test, témoin statique) | tâche 9; V0 | 1,5 |
| 11 | Note de recherche, ODD, dépôt et DOI | tout | 3 |
| | **Total** | | **27**, dont 3 conditionnelles (tâche 5) |

**Prérequis de lecture, avant la porte B.**
- [Pais et al. 2013] : Text S1 et code Matlab S1 (libres) → T5.5.
- [Marshall et al. 2009] : matériel supplémentaire (n, c, q_i, r′_i) → T5.24.
- [Seeley et al. 2012] : texte principal, proportions ipsi/contra (inscription requise) → E5.5.
- [Pratt et al. 2002] : effectifs initiaux de M4 et dénominateur de 14 % / 3,8 % → T5.18, T5.22.
- [Pratt et al. 2005] et la notice de 2006 : 44 paramètres → M7.
- [Pratt 2005a] : valeurs absolues → T5.19. [Passino et Seeley 2006] : équations et paramètres → T5.12.
- [Seeley 2010] (valeur du quorum) et [Lindauer 1955] (scission) → R6 et E5.3.
- [Sumpter et Pratt 2009] : code des auteurs ou courriel (lecture de r) → T5.23.

**Dépendances entre projets.**

| Projet | Relation avec P5 |
|---|---|
| S0 | Prérequis de tout : noyau (PRNG, RK4, SSA, manifeste), harnais, typologie, glossaire, métriques R et G. |
| V0 | Gabarit de page avant la première page; plan d'évaluation. |
| P8 | Partage de la règle de quorum (forme de Hill, M6); coordonner les paramètres et l'implantation. |
| P6 | Consomme M1 et M2 (interblocage, scission) : attend la porte A de P5. |
| P7 | Consomme les modèles et prédictions : attend la porte A et T5.23. |
| P9 | Reprend après le décollage (vol guidé par une minorité informée). |
| P1 | Porte le test d'habitat de la danse (QR0). |

**Ordre :** 1 → 2 → 3 → 4 → porte A → (6, 7) → 8 → (9, 10) → 11; la tâche 5 s'exécute en parallèle de 6 dès que l'accès à Pratt et al. 2005 est acquis; sans accès, plan B de R1 puis passage.

---

## 13. Références clés

Statut = statut dans [11-bibliographie.md](../docs/11-bibliographie.md); lecture = lecture rapportée par le dossier [p5-quorum](../recherche/dossiers/p5-quorum.md).

| Étiquette | Statut | Lecture | Usage dans la fiche |
|---|---|---|---|
| [Seeley et al. 2012] | vérifiée | [R] texte principal; [T] SOM | M1; T5.1 à T5.3; E5.5 |
| [Pais et al. 2013] | corrigée | [T]; Text S1 et code non lus | M2; T5.4 à T5.7 |
| [Britton et al. 2002] | vérifiée | [M]; modèle [S] | M3; T5.8 |
| [Franks et al. 2002] | vérifiée | [T] | M3, M4; T5.8, T5.17, T5.18 |
| [Pratt et al. 2002] | vérifiée | [R]; EDO [S] | M4; T5.16 |
| [Pratt 2005a] | corrigée | [R] | T5.19 |
| [Pratt et al. 2005] | **non vérifiée** | [R] page seule; tableau non lu | M7 |
| [Franks et al. 2003] | corrigée | [T] | T5.14, T5.15 |
| [Marshall et al. 2009] | corrigée | [T]; matériel supplémentaire non lu | M5; T5.22, T5.24 |
| [Sumpter et Pratt 2009] | vérifiée | [T]; lecture de r **[à confirmer]** | M6; T5.23 |
| [Pratt et Sumpter 2006] | vérifiée | [T] sans SI | M7; T5.20, T5.21 |
| [Passino et Seeley 2006] | vérifiée | [R] et [S] | M8; T5.12 |
| [Seeley et Visscher 2003] | vérifiée | [R] (dossier); texte intégral lu par l'audit | T5.10; chaîne décision → action |
| [Seeley et Visscher 2004] | vérifiée | [R]; moyennes [S] | T5.9 |
| [Seeley et Buhrman 1999] | vérifiée | [R] | positionnement |
| [Seeley et Buhrman 2001] | vérifiée | [R] | T5.11 |
| [Seeley 2003] | corrigée | [R] | T5.13; expiration |
| [Seeley et al. 2006] | corrigée | [T] (vulgarisation par les auteurs) | M8; quorum de 15 à 20 |
| [Seeley 2010] | vérifiée | [M]; contenu non lu | R6 |
| [Reina et al. 2017] | vérifiée | [T] (arXiv v2) | M9 |
| [List et al. 2009]; [Mallon et al. 2001] | corrigée; corrigée | [R]; [R] | relation d'indépendance; latence |
| [Masuda et al. 2015] | vérifiée | [T] partiel | décodage des paramètres de M4 |
| [Gray et al. 2018] | corrigée | [T] partiel | relation inhibition ciblée |
| [Reina et al. 2015]; [Valentini et al. 2017]; [Ghaffari et al. 2015] | vérifiée; vérifiée; corrigée | [R] | relations d'inhibition et d'algorithmique |
| [Lindauer 1955] | **non vérifiée** | non lue | scission (qualitatif) |
| [Visscher et Camazine 1999] | **non vérifiée** | [S] via [Franks et al. 2002] | M3 |
| [Zakir et al. 2022] | **non vérifiée** | [R] (dossier p6-pathologies) | positionnement |

**Contexte agentique.** [Kaesberg et al. 2025] (vérifiée); [Du et al. 2024] (corrigée); [Choi et al. 2025a] (vérifiée); [Li et al. 2024] (vérifiée); [Weng et al. 2025] (vérifiée); [Kohli 2026] (vérifiée); [Kim et al. 2025b] (vérifiée); [Cemri et al. 2025] (corrigée); [Hadfield et al. 2025] (corrigée); [A2A 2026a] (vérifiée); [MCP 2026] (vérifiée); [Anthropic 2026a] (vérifiée).
**Décision et cognition collective.** [Couzin 2009] (corrigée); [Feinerman et Korman 2017] (vérifiée); [Dietrich et Spiekermann 2013] (vérifiée); [Wald et Wolfowitz 1948] (**non vérifiée**); [Chi et al. 2012] (vérifiée).
**Valeur du signal selon l'habitat (hors P5).** [Sherman et Visscher 2002]; [Donaldson-Matasci et Dornhaus 2012]; [Beekman et Lew 2008] (toutes vérifiées).
**Méthodes.** [Axtell et al. 1996]; [Grimm et al. 2006]; [Grimm et al. 2020] (corrigée); [Gillespie 2007]; [Blackman et Vigna 2021]; [Wikipedia 2026]; [Lakens 2017]; [Schuirmann 1987]; [Morris et al. 2019]; [Caron-Lormier et al. 2008] (corrigée); [Wilensky et Rand 2007]; [Chambers 2013]; [Chambers et Tzavella 2022]; [Nosek et al. 2018]; [Siepe et al. 2024]; [Lakens 2024]; [Willroth et Atherton 2024]; [JRSI 2026]; [PLOS CB 2021]; [W3C 2023] (vérifiées sauf mention).
**Références du dossier non mobilisées ici.** [Pratt 2005b] (corrigée), [Niven 2012] (corrigée), [Visscher 2007] (corrigée), [Zhao et al. 2021] (corrigée; [R]; résultat sur l'absence de quorum utile à P6).
**À ajouter à la bibliographie après lecture (hors liste, métadonnées seules [M], audit bio-abeilles) :** Seeley et Tautz 2001 (*piping*); Seeley et al. 2003 (échauffement); Rittschof et Seeley 2008 (buzz-run); Seeley et Visscher 2004, *Apidologie* 35:101–116 (article distinct de celui de *Behav. Ecol. Sociobiol.*).


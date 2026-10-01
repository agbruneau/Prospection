# P4 — Régulation sans vue d'ensemble : débit, délai, backpressure

**Date :** 2026-10-01. **Statut :** fiche de projet, régime **production** (le chercheur agit sur ce document). Le cadre ([../docs/00-cadre.md](../docs/00-cadre.md)) prime. Phase 2 du programme. Taxons : *Pogonomyrmex barbatus* et *Apis mellifera*.
**Sources :** [le dossier P4](../recherche/dossiers/p4-regulation.md), vérifié le 2026-10-01 (cité « le dossier »); audits [bio-fourmis](../docs/annexes/audit/bio-fourmis.md), [bio-abeilles](../docs/annexes/audit/bio-abeilles.md), [choregraphie-agentique](../docs/annexes/audit/choregraphie-agentique.md); script de contrôle [p4_checks_regulation.py](../recherche/verifications-numeriques/p4_checks_regulation.py).

**Légende de lecture** (celle du dossier) : [T] texte intégral lu; [R] résumé lu; [M] métadonnées seulement; [S] source secondaire lue; [I] inférence ou calcul (du dossier ou de cette fiche); [à confirmer]; [non vérifiée].
**Convention de la fiche :** tout seuil, marge, taille d'effet, nombre de répétitions ou niveau de facteur absent des sources est un choix de conception, marqué [I] et tenu pour [à confirmer] jusqu'au préenregistrement.
**Symboles :** c, k, τ, q désignent des grandeurs différentes selon les modèles. La fiche les indice : c_P (gain par retour, [Prabhakar et al. 2012]), c_G (volatilité, [Pagliara et al. 2018]), k_G et k_D (Pagliara; Davidson), k (pente de Hill, [Edwards et Myerscough 2011]).

---

## 1. Objet et questions de recherche

P4 étudie comment une colonie règle un flux (fourragement, collecte et traitement du nectar) à partir d'une grandeur lue localement, sans vue d'ensemble, puis ce que cela enseigne pour la contre-pression (backpressure) entre agents. Les deux taxons n'ont **pas** la même boucle :

| Taxon | Boucle | Grandeur lue localement | Ce qui est réglé |
|---|---|---|---|
| *P. barbatus* | Boucle de terrain : fourrageuses dehors, file M/G/∞ [Pagliara et al. 2018] | Taux de contacts antennaires au tunnel d'entrée, qui suit le taux de retour [Pinter-Wollman et al. 2013] [R]; [Prabhakar et al. 2012] | Taux de sortie |
| *A. mellifera* | File d'appariement butineuses-receveuses [Anderson et Ratnieks 1999a] | Délai de recherche d'une receveuse [Seeley 1989] [non vérifiée] [Seeley et Tovey 1994]; signaux de trémulation [Seeley et al. 1996] | Allocation butineuses/receveuses (recrutement et abandon) |

Les deux boucles relèvent, selon la fiche [I], de l'**auto-organisation par signaux directs** (A1 non, A2 non, A3 diffusion éphémère; cadre, typologie à trois axes). Le **témoin orchestré** (A1 oui, A2 oui) est simulé en E4.5 et E4.6.

| QR du cadre | Contribution de P4 |
|---|---|
| **QR0** (richesse du signal, selon l'environnement) | Part « canal régulateur » : indice implicite (débit, délai) contre signal explicite, mesurés par le vecteur R (information effective, persistance, portée, adressage). On garde la leçon apicole : le gain dépend de l'habitat [Donaldson-Matasci et Dornhaus 2012]; [Beekman et Lew 2008]. P4 ne reproduit pas ces résultats (voir P1, P8). H4.3, H4.4 |
| **QR2** (échecs) | Extinction du fourragement sous un seuil de gain, oscillations sous retard, emballement. H4.1, H4.6, H4.7 |
| **QR3** (contrôle) | Témoin orchestré et structure de tâche (décomposable ou séquentielle) dans un modèle de file. H4.5 |
| QR1, QR4 | **Non servies directement.** QR1 relève de P8. QR4 (diversité) relève de P3 et P7; H4.6 n'en teste que l'effet sur les oscillations de régulation |

**Rôle dans le programme.** Fournir (1) cinq modèles ou protocoles de référence, soit 12 cibles de reproduction; (2) une bibliothèque de contrôleurs de flux (indice de débit, indice de délai, signal explicite, double message, orchestré), en entrée optionnelle de P7; (3) la correction des erreurs de la v3 sur TCP, la loi de Little et les « deux lectures de la même file » (§2). P7 ne dépend pas de P4 (cadre); P4 ne lance aucun agent LLM.

---

## 2. Positionnement

| Existant publié (étiquette, lecture) | Reproduit par P4 | Apport de P4 |
|---|---|---|
| Modèle de régulation sans information spatiale, *P. barbatus* : [Prabhakar et al. 2012] [T] | T4.1 à T4.3 | Gain stationnaire c_P/q [I]; boucle fermée (H4.1); deux compartiments (H4.2); liste explicite de ce qui n'est pas publié (§4) |
| Deux échelles de temps (activation, disponibilité) : [Pinter-Wollman et al. 2013] [R] | T4.4 (extension de la fiche, cible relationnelle) | Modèle à deux compartiments (E4.3) |
| Boucle fermée excitable et file M/G/∞ : [Pagliara et al. 2018] [T] | T4.5 | Docking avec le modèle de Prabhakar (E4.2); lien explicite avec Little |
| Décision individuelle par dérive-diffusion : [Davidson et al. 2016] [R] | Aucune cible chiffrée | Niveau individuel (docking optionnel, « Vue de l'agent ») |
| Contexte écologique : [Gordon 2002] [R]; [Greene et Gordon 2007] [R]; [Gordon 2013] [R] | Rien (résumés seulement) | Contexte seulement |
| Analogie TCP : [Carey 2012] [T]; [Gordon 2014] [T, partiel]. Absente de [Prabhakar et al. 2012] [T] et de [Gordon 2016] [T] | Aucune (une analogie n'est pas un résultat) | Énoncée comme **Analogie** d'auto-cadencement (§7) |
| Files butineuses-receveuses : [Anderson et Ratnieks 1999a] [T]; [Ratnieks et Anderson 1999a] [R]; [Seeley et Tovey 1994] [R] | T4.8, T4.9 (seul le premier est lu en entier) | Modes avec et sans délai de recherche dans un même moteur; comparaison des indices (E4.4) |
| Réallocation par trémulation : [Seeley et al. 1996] [T] | T4.6, T4.7 | Couche individu-centrée pour le cumul de receveuses (§9) |
| EDO butineuses-receveuses-trémulation : [Edwards et Myerscough 2011] [T, préprint] | T4.10, T4.11 | Second effet de la trémulation (inhibition), E4.8 |
| Indice et signaux : [Seeley 1989], [Seeley 1992], [Kirchner et Lindauer 1994], [Nieh 1993] (toutes [non vérifiée]); [Kirchner 1993] [à confirmer] | Rien | Cadre d'hypothèses, toutes marquées (§4.7, §11) |
| Loi de Little : [Little 1961] [M]; [Little 2011] [T]; [Anderson et Ratnieks 1999a], annexe C [T]; [Pagliara et al. 2018], éq. 12 [T]; [Netflix 2026] [T] | T4.12 (test d'intégrité) | **Aucune revendication de nouveauté sur Little.** Reste la mise en regard de ce que chaque boucle lit, non trouvée publiée dans les sources consultées [I, recherche non exhaustive] |
| Contrôle de flux en ingénierie : [Jacobson et Karels 1988], [Nichols et al. 2018], [Cardwell et al. 2022], [Netflix 2026], [Reactive Streams 2026], [Anthropic 2026c] | Rien | Contrôleurs de la couche 3 (E4.5); analogie CoDel-abeille : proposition [I] |
| Centralisé ou décentralisé : [Kim et al. 2025a], [Salemi et al. 2025], [Mao et Mirhoseini 2026] (lus par l'audit [S]) | Rien | E4.6, en simulation de file (les agents LLM relèvent de P7) |

**Corrections de la v3 appliquées** (dossier, correspondances; cadre, corrections 5, 6, 7, 9, 10) :

| La v3 disait | La fiche retient |
|---|---|
| « analogue à TCP (Prabhakar et al. 2012; Gordon 2010) » | TCP est absent de l'article. L'analogie vient de [Carey 2012] et de [Gordon 2014]. [Gordon 2010] : contenu non lu, **non cité** pour TCP |
| Modèle non spécifié | Seul c_P est ajusté; q, d, ᾱ sont fixés; durée du créneau et valeurs de c_P **non publiées** (§4.1) |
| « Seeley 1992; Seeley et Tovey 1994 » | Ajouter [Seeley 1989] [non vérifiée] (indice, cadre de files) et [Seeley et al. 1996] (preuve directe) |
| « danse frétillante ou de trémulation » | Trop binaire : la trémulation recrute des receveuses et inhibe le recrutement (second effet non vérifié); la réponse est probabiliste |
| « seuils de temps d'attente publiés » | Trois valeurs vérifiées, le couple 20/50 s ne l'est pas (§4.8) |
| « loi de Little; rapprochement non publié » | Faux : déjà publiée ([Anderson et Ratnieks 1999a]; [Pagliara et al. 2018]) |
| « deux lectures de la même file » | Inexact : **deux files**. Débit sur la boucle de terrain, délai sur une file d'appariement (§4.9) |
| « le fourragement suit la nourriture disponible » | Remplacé par T4.1 à T4.5 (critères chiffrés) |
| « la colonie rééquilibre collecte et traitement » | T4.6, T4.8, T4.10; la colonie agit sur le recrutement **et** l'abandon [Seeley et al. 1996] |
| « Pinter-Wollman » sans article | [Pinter-Wollman et al. 2013] (*Anim Behav*); l'article de 2011 reste [non vérifiée] |
| Freinage fourmi = « absence de retours » | Vrai pour *P. barbatus* seulement; phéromone « no entry » [Robinson et al. 2005] et inhibition par encombrement [Dussutour et al. 2004] ailleurs (cadre, correction 9) |

---

## 3. Hypothèses falsifiables

**Règle de décision commune.** Une hypothèse est *confirmée* si la borne inférieure de l'IC à 95 % de l'effet dépasse la taille d'effet minimale, *réfutée* si la borne supérieure est inférieure à cette taille, *non concluante* sinon (IC par rééchantillonnage sur les graines; équivalences par TOST [Schuirmann 1987]; [Lakens 2017], selon le [protocole de reproduction](../docs/04-protocole-reproduction.md)). Les hypothèses **confirmatoires** sont préenregistrées avant exécution; les **exploratoires** ne soutiennent aucune conclusion de la note [Chambers 2013]. Toutes les hypothèses portent sur des modèles (statut *Modèle simplifié* ou *Hypothèse de l'auteur*), jamais sur la biologie directement.

**H4.1 — Seuil de gain de boucle (fourmi).** En boucle fermée (retours = sorties retardées d'une durée de trajet X, avec probabilité p de retour chargé), le fourragement défini par l'éq. 3-4 de [Prabhakar et al. 2012] se maintient si le gain de boucle g = (c_P/q)·p ≥ 1 (champ moyen) et s'éteint vers le plancher ᾱ sinon [I : dérivation de la fiche, §4.1].
- VI : g (via c_P, dans l'intervalle de balayage publié 0,01 à 0,25), p, durée moyenne du trajet D, population disponible.
- VD : débit de sortie sur le dernier tiers du run, rapporté au pic.
- Taille d'effet minimale [I] : rapport > 0,5 pour g ≥ 1,2 et < 0,05 pour g ≤ 0,8.
- Réfutation : la frontière (g où le rapport franchit 0,5) sort de [0,8; 1,2] [I] pour au moins deux des trois valeurs de D.
- Statut : **confirmatoire préenregistré**.

**H4.2 — Deux compartiments (fourmi).** Un modèle à deux compartiments (activation en secondes, disponibilité en minutes [Pinter-Wollman et al. 2013] [R]) reproduit la reprise retardée de la fig. 2 de [Prabhakar et al. 2012] avec une erreur plus faible que l'éq. 3-4 seule.
- VI : modèle (un ou deux compartiments), niveau de débit (0,169 et 0,807 fourmi/s, exemples de la fig. 2), à nombre de paramètres libres égal ou pénalisé (critère fixé au préenregistrement).
- VD : RMSE relatif entre sorties simulées moyennes et courbes numérisées.
- Taille d'effet minimale [I] : réduction relative du RMSE ≥ 20 %.
- Réfutation : borne supérieure de l'IC de la réduction < 20 %.
- Statut : **exploratoire** (une seule trace numérisée par niveau de débit).

**H4.3 — Indice natif (les deux files).** À nombre d'échantillons égal par fenêtre de décision, l'indice natif porte plus d'information effective sur l'état à réguler que l'indice de l'autre boucle : débit de retours pour la boucle de terrain (état : abondance), délai de recherche pour la file d'appariement (état : charge).
- VI : boucle {terrain M/G/∞, file d'appariement} × indice {débit, délai} (les indices « non natifs » sont des **contrefactuels in silico**, sans accès local réel [I]), niveau d'état, taille d'échantillon.
- VD : I(indice; état)/H(état), composante de R ([métriques et typologie](../docs/06-metriques-et-typologie.md)).
- Taille d'effet minimale [I] : contraste d'interaction ≥ 0,1.
- Réfutation : borne supérieure de l'IC du contraste < 0,1.
- Statut : **exploratoire**.

**H4.4 — Signal explicite contre indice implicite.** À retard de rétroaction égal, un pool qui signale explicitement sa demande aux producteurs (type `request(n)` ou `retry-after`) présente un CV du débit plus faible que le même pool qui ne lit qu'un indice implicite de latence, au prix de messages supplémentaires.
- VI : régulateur {latence implicite, demande explicite} × retard (trois niveaux [I]) × profil de charge {stationnaire, échelon}.
- VD : CV du débit de sortie en régime établi; délai au 95e centile; messages par tâche.
- Taille d'effet minimale [I] : réduction relative du CV ≥ 20 %.
- Réfutation : borne supérieure < 20 %.
- Statut : **confirmatoire préenregistré** (modèle de file, sans LLM).

**H4.5 — Témoin orchestré et structure de tâche (QR3).** Dans le modèle de file, la régulation locale se rapproche du témoin orchestré sur une tâche **décomposable** (tâches indépendantes), mais pas sur une tâche **séquentielle** (chaîne de k étapes dépendantes).
- VI : régulateur {local, orchestré} × structure {décomposable, séquentielle} × k.
- VD : ratio de débit local/orchestré; messages par tâche.
- Taille d'effet minimale [I] : ratio ≥ 0,90 en décomposable; ratio ≤ 0,80 en séquentiel.
- Réfutation : en décomposable, borne supérieure de l'IC du ratio < 0,90; en séquentiel, borne inférieure > 0,80. H4.5 n'est confirmée que si les deux prédictions le sont.
- Statut : **confirmatoire préenregistré**. Pas de conclusion sur les agents LLM : voir P7.

**H4.6 — Homogénéité et retard.** Dans un pool de N régulateurs aux seuils identiques lisant un même signal retardé, l'amplitude des oscillations du débit croît avec le retard et décroît avec l'hétérogénéité des seuils. « Agents identiques oscillent » est une hypothèse sans acquis (cadre, correction 13) : à tester, jamais à affirmer.
- VI : retard (trois niveaux [I]) × CV des seuils (quatre niveaux dont 0 [I]) × N.
- VD : CV du débit; pic spectral dominant.
- Taille d'effet minimale [I] : réduction ≥ 30 % de l'amplitude entre CV = 0 et le CV maximal, à retard intermédiaire.
- Réfutation : borne supérieure < 30 %.
- Statut : **exploratoire** (recoupe P3 et P7 pour la diversité des seuils).

**H4.7 — Double action de la trémulation.** Dans l'extension trémulation d'[Edwards et Myerscough 2011], ajouter le second effet de la trémulation (inhibition du recrutement des butineuses; [Kirchner 1993] [à confirmer]; [Nieh 1993] [non vérifiée]; audit bio-abeilles, M9 [S]) borne la croissance de R observée à Q = 3 (T4.11).
- VI : intensité d'inhibition ι (quatre niveaux [I]), Q ∈ {2, 3}.
- VD : dR/dt à 8 h; amplitude des oscillations de S.
- Taille d'effet minimale [I] : dR/dt(8 h) ≤ 5 % de sa valeur sans inhibition pour au moins un ι.
- Réfutation : pour tout ι balayé, dR/dt(8 h) ≥ 50 % de sa valeur sans inhibition.
- Statut : **exploratoire** (le terme d'inhibition n'est pas publié; sa forme est de la fiche [I]).

---

## 4. Modèles de référence

Un modèle par article, nommé par son préréglage (taxon + source). Parité : trois entrées par taxon; une sans cible chez la fourmi (P4-Pb-2016), une sans modèle publié chez l'abeille (P4-Am-1996). Les natures diffèrent (cadre, architecture de simulation) : aucun moteur unique.

| Préréglage | Taxon | Source | Type de modèle | Intégration |
|---|---|---|---|---|
| P4-Pb-2012 | *P. barbatus* | [Prabhakar et al. 2012] | Processus stochastique à temps discret (Poisson), entrées exogènes | Récursion à pas fixe, aucune intégration |
| P4-Pb-2018 | *P. barbatus* | [Pagliara et al. 2018] | Hybride : EDO rapide-lente (intégrateur à fuite + FitzHugh-Nagumo) et file M/G/∞ à événements | RK4 à pas fixe, détection du franchissement du seuil |
| P4-Pb-2016 (optionnel) | *P. barbatus* | [Davidson et al. 2016] [R] | EDS à impulsions, niveau individuel | Euler-Maruyama [I] |
| P4-Am-1999 | *A. mellifera* | [Anderson et Ratnieks 1999a] | Simulation stochastique à événements discrets | Pilotée par événements |
| P4-Am-2011 | *A. mellifera* | [Edwards et Myerscough 2011] (préprint) | Système d'EDO non linéaires, déterministe | RK4; contrôle croisé par Euler à dt = 0,5 s (script du dossier) |
| P4-Am-1996 | *A. mellifera* | [Seeley et al. 1996] | Protocole empirique + couche individu-centrée de la fiche [I] | Événements (SSA, [Gillespie 1976]; [Gillespie 1977]) [I] |

### 4.1 P4-Pb-2012 — *P. barbatus*, Prabhakar, Dektar et Gordon 2012 [T]

**Données** (Methods). Rodeo (Nouveau-Mexique), août 2009 (33 essais, 9 colonies) et août-septembre 2010 (29 essais, 8 colonies, dont 4 déjà suivies) : **62 essais, 13 colonies** de plus de 5 ans. Observation de 20 min; retours empêchés aux minutes 4 à 7; comptage vidéo (AnTracks, erreur 7,3 %, 30 images/s).

**Équations** (Results, « Model of the regulation of foraging activity »). Arrivées au début du créneau, départs à la fin :

```
α_n = max( α_{n−1} − q·D_{n−1} + c_P·A_n − d , ᾱ ),   α_0 = 0      (éq. 3)
D_n ~ Poisson(α_n)                                                  (éq. 4)
```

Le modèle linéaire initial (éq. 1-2 : λ(t) = λ_ac·f(t,τ); x(t) = Poisson(λ_b) + Poisson(λ(t))) est abandonné par les auteurs (τ devrait varier selon le régime).

| Symbole | Sens | Valeur publiée | Unité | Emplacement |
|---|---|---|---|---|
| A_n | Retours chargés au créneau n | Données observées en entrée (non publiées) | retours | Results |
| D_n | Départs au créneau n | Sortie | départs | éq. 4 |
| c_P | Hausse de α par retour | **Ajusté par essai**, balayage de 0,01 à 0,25 | (fourmi/s) par retour [I] | « Comparison of model and data » |
| q | Baisse de α par départ (vidange du tunnel) | **0,05**, fixé pour garder α entre 0,15 et 1,2 fourmi/s | idem [I] | idem |
| d | Décroissance par créneau | **0**, fixé | idem [I] | idem |
| ᾱ | Plancher (taux de base) | **0,01 fourmi/s** ([Schafer et al. 2006] [M], réf. 27) | fourmi/s | idem |

**Ce qui n'est PAS publié :** la durée du créneau (1 s probable [I], vu les unités en fourmi/s); les valeurs de c_P retenues par essai; les séries brutes de retours et de sorties (indisponibles pour le dossier [à confirmer auprès du laboratoire Gordon]); la population de fourrageuses. Sans elles, la fig. 3 et les statistiques par essai ne se reproduisent que qualitativement.

**Ajustement et résultats publiés** : on retient le c_P qui minimise le RMSE relatif moyen sur 200 itérations; RMSE du meilleur c_P de 0,237 à 4,9, moyenne 0,602 (SE 0,077, 62 essais). Intervalles entre retours exponentiels (processus de Poisson) sur 60-240 s dans 39 essais; erreur de variation totale moyenne 0,056 (SE 0,009). Le modèle corrèle **plus fort** que les données (limite reconnue par les auteurs : nid, météo). Exemples de la fig. 2 : 0,807 et 0,169 fourmi/s.

**Propriété dérivée** [I; vérifiée numériquement par le script, tolérance < 5 %]. En régime stationnaire, retours poissoniens de taux λ, au-dessus du plancher : E[D] = (c_P·λ − d)/q. Avec d = 0, le gain sortie/entrée vaut c_P/q; la conservation du flux (sorties = retours, [Pagliara et al. 2018]) impose c_P ≈ q = 0,05. Sans retour, α décroît avec une constante de temps d'environ 1/q = 20 créneaux.

**Gain de boucle** [I, base de H4.1]. En boucle fermée, E[A] = p·E[D] et E[α] = (c_P/q)·E[A] donnent un état non trivial seulement si (c_P/q)·p = 1; au-dessus, croissance (bornée par la population disponible); au-dessous, retour au plancher. À vérifier par simulation (E4.1), pas à poser.

**Erreurs de la source** : « ratio of c to e » se lit probablement c/q [I]; « varying u among trials » se lit c [I]; fenêtre de retrait 240-420 s (fig. 2), « minutes 4-7 » ou 240-430 s (Methods).

### 4.2 P4-Pb-2018 — *P. barbatus*, Pagliara, Gordon et Leonard 2018 [T]

Données 2015-2017, même site, du matin jusqu'à midi environ. Équations (symboles de la fiche : c_G, k_G) :

```
ds/dt = −s/τ + k_G·λ_in                          (éq. 4)  intégrateur à fuite des contacts
ε1·ε2·dv/dt = v − v³/3 − c_G·u − a + s            (éq. 5)  FitzHugh-Nagumo, c_G = volatilité
ε1·du/dt = v − c_G·u                              (éq. 6)
X ~ χ², moyenne D                                 (éq. 7)  durée du trajet
E[Q(t′)] = ∫₀^∞ r_out(t′−x)·(1 − F(x;D)) dx       (éq. 9)  file M/G/∞ du terrain
r_in(t′) = E[ r_out(t′ − X) ]                     (éq. 11)
régime stationnaire : r_in = r_out = r ,  E[Q] = r·E[X] = r·D    (éq. 12)
```

Une sortie est comptée quand v dépasse 0,75. Paramètres publiés (Results, « Foraging dynamics inside the nest ») : k_G = 0,3; τ = 0,41; a = 0,35; ε1 = 0,2; ε2 = 0,05; D = 10 min (fig. 8); c_G exploré sur [0, 5], exemples 0,1; 2; 5 (fig. 7). **Non lus ou non précisés :** unité de τ et de k_G, valeurs de N et de c_G\*, degrés de liberté du χ² (annexes S1-S4) [à confirmer].

L'éq. 12 est la loi de Little appliquée au terrain (les auteurs ne la nomment pas). **Résultat :** il existe une volatilité critique c_G\* : au-dessus, le fourragement se maintient à débit constant; en dessous, il s'arrête (fig. 7-8). Proposition des auteurs : les fourrageuses ajustent c_G après une première sortie, selon la chaleur et la sécheresse.

### 4.3 P4-Pb-2016 (optionnel) — niveau individuel, Davidson et al. 2016 [R]

```
ds/dt = γ + k_D·Σ_j δ(t − t_j) + σ·dη/dt        seuils : +1 sortir, −1 rentrer au nid
```

Exemple « colonie 2 » (fig. 6A) : k_D = 0,14; γ = −0,038; s₀ = 0,39; σ = 0,21; r_in = 0,083 (unités non précisées [à confirmer]). Version individuelle et bruitée du même intégrateur que [Pagliara et al. 2018]. **Aucune cible chiffrée** : utilisé pour la « Vue de l'agent » et un docking optionnel; ne bloque aucune porte.

### 4.4 P4-Am-1999 — *A. mellifera*, Anderson et Ratnieks 1999a [T]

Simulation C à événements discrets. Les ouvrières sont butineuses ou receveuses; elles transfèrent immédiatement si un partenaire est libre, sinon font la queue; **aucun délai de recherche**; jamais de queue des deux côtés. Discipline SIRO ou FCFS.

| Paramètre (tableau 1, jeu standard) | Valeur |
|---|---|
| N_f, N_r | 500, 500 |
| Durée du voyage f(·) | N(500, 500) **(moyenne, variance)** |
| Durée du cycle de réception r(·) | N(500, 500) |
| Durée du transfert t(·) | N(50, 50) |
| Discipline | SIRO |
| Simulation | ≥ 30 000 événements de rodage, puis 20 000 à 50 000 de mesure; 10 répétitions par taille (2 au-delà de 2 000 butineuses) |

Unités de temps arbitraires; seules la moyenne et la variance des lois comptent (annexe B). Résultats : délai décroissant à peu près exponentiellement avec la taille (fig. 2); temps perdu de 2,3 / 1,25 / 0,42 / 0,15 % pour des tailles de 10 / 100 / 1 000 / 10 000 (butineuses + receveuses). Éq. C8 : `p* = (m_f + m_t)/(m_f + m_r + 2·m_t)` minimise le délai et maximise le débit. Éq. C12 (déterministe) : `m_q,r = max{0, (N_r/N_f)(m_f + m_t) − (m_r + m_t)}`, `m_q,f` par symétrie (éq. C14), indépendant de la taille. Éq. C3 (N_f = N_r = 1) : `E = 0,399·√(σ₁² + σ₂²) = 12,62`. Durée réelle d'un transfert : 36,6 ± 22,3 s ([Anderson 1998a], thèse [non vérifiée]). La règle de seuil sur le délai pour changer de tâche ([Anderson 1998b] [R]) est robuste aux valeurs exactes des seuils.

**Deux modes à prévoir** (dossier, question 11) : sans délai de recherche (ce modèle) et avec délai (modèle d'urne de [Seeley et Tovey 1994], forme utilisée par Edwards et Myerscough : S = s_s·(F′ + R′)/R′). Chaque cible exige l'un ou l'autre; la discipline SIRO est jugée « virtuellement identique » à l'urne par les auteurs.

### 4.5 P4-Am-2011 — *A. mellifera*, Edwards et Myerscough 2011 [T, préprint]

Équations transcrites du préprint arXiv:1007.3311; la **version publiée** (*J Theor Biol* 271: 64-77) n'a pas été comparée. Le symbole de l'éq. 9 est perdu à l'extraction du PDF (β présumé, retrouvé aux fig. 8 et 10) [à confirmer]. La numérotation de l'équation de dF/dt n'est pas relevée [à confirmer].

```
S(t) = s_s·(F′ + R′)/R′                                                          (éq. 1)
dF/dt  = f_r·F·[m_S^k/(S^k + m_S^k)]·[Q^j/(Q^j + m_Q^j)] − f_s·F·[S^k/(S^k + m_S^k)]·[m_Q^j/(Q^j + m_Q^j)]
dF′/dt = (F − F′)/f_a − F′/S                                                     (éq. 5)
dR′/dt = (R_0 − R′)/r_s − F′/S                                                   (éq. 6)
Extension trémulation : dR/dt = β·U(S − m_T)·S^m/(S^m + m_T^m)                    (éq. 9; U : fonction échelon présumée [à confirmer])
S* = m_S·(f_r·Q^j/(f_s·m_Q^j))^(1/k)                                             (éq. 10)
```

| Paramètre | Sens | Valeur (unité) | Source citée |
|---|---|---|---|
| s_s | Durée d'une approche | 5 s (2-7 s) | [Seeley et al. 1991] |
| f_r | Taux de recrutement max | 0,0010 s⁻¹ | [Seeley et Towne 1992] |
| f_s | Taux de repos max | 0,0002 s⁻¹ | [Camazine et Sneyd 1991] [à confirmer] |
| m_S, k | Demi-effet du temps de recherche; pente de Hill | 10 s; 4 | Ajustement sur [Seeley 1992] [non vérifiée], fig. 7 |
| m_Q, j | Demi-effet de la qualité; pente | 1,5; 4 (Q sans unité explicite [à confirmer]) | [Seeley 1986]; [Seeley 1995] (fig. 5.31) |
| f_a | Durée d'un voyage | 15 min (0,5-20) | [Seeley 1994] [à confirmer] |
| r_s | Durée du stockage | 20 min (1-20) | [Seeley 1995] |
| m_T, m | Seuil et pente de trémulation | **30 s**; 5 | Ajustés sur [Seeley 1992] [non vérifiée], fig. 7 |
| β | Recrutement max par trémulation | 5 (fig. 8); 0,1 (fig. 10) | — |

Résultats : instabilité de l'équilibre sans fourrageuses si Q > m_Q·(f_s/f_r)^(1/j)·(s_s/m_S)^(k/j), soit Q ≈ 0,5 [I, dossier]. À Q élevé, les receveuses fixent la population de butineuses (R divisé par deux, F divisé par deux, fig. 5a-b); à Q faible, R n'a aucun effet (fig. 5c-d). Avec trémulation : si S\* > m_T, F et R croissent sans borne et S oscille (fig. 8a, Q = 3); à Q = 2, tout se stabilise; la trémulation accélère la réallocation après inversion de qualité (fig. 10). Calcul du dossier [I] : S\*(Q = 3) = 29,9 s, à la limite de m_T = 30 s; la source donne un critère de stabilité Q ≲ 3 (3,01 recalculé).

### 4.6 P4-Am-1996 — *A. mellifera*, Seeley, Kühnholz et Weidenmüller 1996 [T]

**Protocole** : ruche d'observation d'environ 4 000 abeilles au départ (effectifs mesurés ≈ 3 130 pour l'essai 1, ≈ 4 450 pour l'essai 2), Cranberry Lake (État de New York), une source (nourrisseur à 350 m, saccharose 2,0 mol/L), 55 µL par voyage. Receveuses mesurées par **marquage cumulatif** de toutes les abeilles vues en réception pendant 9 à 12 h; scans de trémulation toutes les 15 min; durée de trémulation d'environ une demi-heure.

| | Essai 1 faible | Essai 1 fort | Essai 2 faible | Essai 2 fort |
|---|---|---|---|---|
| Butineuses au nourrisseur | 10 | 73 | 14 | 267 |
| Retours (abeilles/min) | 2,0 | 12,8 | 2,7 | 26,5 |
| Afflux (mL/h) | 6,6 | 42,2 | 8,9 | 87,4 |
| Danseuses en trémulation par scan (moy. ± ET) | 0,1 ± 0,3 (n = 40) | 6,7 ± 3,7 (n = 40) | 0,6 ± 0,8 (n = 48) | 19,1 ± 9,0 (n = 36) |
| Receveuses cumulées (% de l'effectif mesuré) | ≈ 530 (17 %) | > 970 (30 %)\* | ≈ 770 (17 %) | ≈ 2 250 (≈ 50 %) |

\* Incohérence de la source : texte 970, tableau 1 : 950. Rapportés à 4 000, les mêmes nombres donneraient 13, 24, 19 et 56 % [I] : la population se paramètre **par essai**.

Autres résultats : effet de la croissance de la colonie de seulement 4,5 % (essai 1) et 1,3 % (essai 2) des receveuses supplémentaires; aucune nouvelle receveuse n'est vieille; la colonie ajuste recrutement **et** abandon (tableau 2); bascule de moins de 20 % à plus de 50 % en moins de 9 h. Ce n'est pas un modèle : la cible T4.6 exige une couche individu-centrée (marquage cumulatif) que la fiche ajoute (§9).

### 4.7 Indice et signaux (ce qui est lu, ce qui ne l'est pas)

- **Indice** : les butineuses notent la difficulté à trouver une stockeuse (stockeuses de 12 à 18 jours, environ 20 % de la colonie; cadre de files) : [Seeley 1989] [non vérifiée] [à confirmer]. Échantillonnage et « lois de la probabilité » : [Seeley et Tovey 1994] [R].
- **Trémulation** : [Seeley 1992] [non vérifiée] (rotation d'environ 50°/s, nid à couvain, deux publics : [à confirmer]); durée d'environ une demi-heure confirmée par [Seeley et al. 1996] [T]. Effet sur les receveuses : démontré (T4.6). Inhibition du recrutement : [Kirchner 1993] [à confirmer]; [Nieh 1993] [non vérifiée]; audit bio-abeilles, M9 [S]. Cause immédiate (temps total de recherche) : [Kirchner et Lindauer 1994] [non vérifiée]. Environ la moitié des trémulations naturelles ne sont pas de type « délai » : [Biesmeijer 2003] [à confirmer]; l'expérience hors de la ruche peut la déclencher : [Thom 2003] [R].
- **Signal d'arrêt** : une **inhibition**, pas un veto (cadre, correction 7).
- **Qualité de l'information** croissante avec la taille de colonie; moyenner sur plusieurs voyages ou transferts : [Ratnieks et Anderson 1999a] [R]; transferts multiples comme échantillonnage : [Hart et Ratnieks 2001] [à confirmer], en partie sous-produit non adaptatif des charges partielles : [Gregson et al. 2003] [R].

### 4.8 Seuils de trémulation : état de vérification

| Énoncé | Source | Statut |
|---|---|---|
| Plus de 40 s de recherche après une source très rentable : trémulation probable | [Seeley et al. 1996] (introduction), citant [Seeley 1992] [non vérifiée] et [Kirchner et Lindauer 1994] [non vérifiée] | [T] (énoncé secondaire d'un article primaire du même auteur) |
| Demi-suppression de la frétillante à S = 10 s (Hill k = 4) | [Edwards et Myerscough 2011], ajusté sur [Seeley 1992] [non vérifiée], fig. 7 | [T] (ajustement de modèle, pas une mesure) |
| Début de trémulation à S = 30 s (Hill m = 5) | idem | [T] (idem) |
| Temps *total* de recherche = cause immédiate | [Kirchner et Lindauer 1994] [non vérifiée] | [M]; [à confirmer] |
| Règle de seuil : délai → frétillante, trémulation ou rien | [Anderson 1998b], citant [Seeley 1995] | [R]; valeurs non lues |
| « < 20 s frétillante; > 50 s trémulation » | Attribué à [Seeley 1992] [non vérifiée] ou à [Seeley 1995] par la littérature secondaire | **Non vérifié** : ne pas utiliser |

**Action avant de fixer un seuil dans une simulation :** numériser la fig. 7 de [Seeley 1992] [non vérifiée] (probabilité de chaque danse selon le temps de recherche).

### 4.9 Deux files, une identité (Little)

Little relie trois moyennes (L = λW); il ne dit pas pourquoi W renseigne sur la charge : ce lien vient d'un modèle de file (urne : W croît avec (F′ + R′)/R′). [Little 2011] [T] : sur un intervalle fini sans stationnarité, la relation est exacte pour un système vide en 0 et en T.

| | Fourmi moissonneuse | Abeille mellifère |
|---|---|---|
| File | Boucle de terrain, M/G/∞ [Pagliara et al. 2018] | Zone de déchargement, file d'appariement à deux côtés [Anderson et Ratnieks 1999a] |
| L | Fourrageuses dehors, E[Q] | Butineuses (ou receveuses) en attente, F′ |
| λ | Débit de sortie = débit de retour en régime stationnaire | Arrivées de butineuses chargées |
| W | Durée moyenne du trajet D | Temps de recherche S |
| Lu par l'agent | Taux de contacts, qui suit le taux de retour [Pinter-Wollman et al. 2013] [R] (intégré, pas un débit au sens strict) | Son propre temps de recherche [Seeley 1989] [non vérifiée] |
| Information inférée | Abondance : à L fixé, λ = L/D baisse si D augmente [I] | Déséquilibre collecte/traitement (charge ρ) [Seeley et Tovey 1994] |
| Plancher d'information [I] | — | S → s_s quand F′ → 0 (éq. 1) : le délai est peu informatif en sous-charge |

**Réserve** : Anderson et Ratnieks écrivent que Little « ne tient pas ici » parce que les arrivées sont corrélées à la file; cela contredit [Little 2011]. Leur réserve vise probablement la *dérivation* de l'éq. C12, non l'identité [I] : à trancher en relisant l'annexe C (R44).

### 4.10 Résumé ODD ([Grimm et al. 2020])

| Préréglage | Objet | Entités et état | Échelles | Ordonnancement et stochasticité | Initialisation et entrées |
|---|---|---|---|---|---|
| P4-Pb-2012 | Relier sorties et retours chargés sans information spatiale | Tunnel : α_n, D_n, A_n | Créneau Δ non publié (1 s [I]); essais de 20 min | Au créneau n : A_n, mise à jour de α_n, tirage de D_n; Poisson | α_0 = 0; A_n observé (non publié) ou Poisson(λ) synthétique |
| P4-Pb-2018 | Condition de maintien du fourragement en boucle fermée | s, v, u, nombre dehors Q | Unités de τ non précisées [à confirmer]; D = 10 min; runs de 3 h | EDO continues; sortie si v > 0,75; retour après X ~ χ² (moyenne D) | Débit initial 0,01 fourmi/s (fig. 8B) |
| P4-Am-1999 | Délai de file selon la taille | N_f butineuses, N_r receveuses; états voyage, attente, transfert, cycle | Temps arbitraire | Événements; SIRO ou FCFS; durées normales (moyenne, variance) | Rodage ≥ 30 000 événements; mesure 20 000 à 50 000 |
| P4-Am-2011 | Butineuses actives selon Q et R_0 | F, F′, R′, R (extension), S | Secondes; 8 à 24 h | EDO simultanées, déterministe | À lire dans le préprint [à confirmer]; script du dossier : F(0) = 1, F′(0) = 0, R′(0) = R_0 [I] |
| P4-Am-1996 (fiche) | Cumul de receveuses distinctes | Abeilles (≈ 3 130 ou ≈ 4 450), butineuses (10 à 267), receveuses marquées | 9 à 12 h; scans de 15 min | Événements; couche de la fiche [I] | Paramètres du tableau 1 de la source |

---

## 5. Cibles de reproduction

Douze cibles, **une fiche de reproduction par cible** (gabarit du [protocole de reproduction](../docs/04-protocole-reproduction.md)). La parenthèse de la colonne « ID » donne la correspondance avec le dossier (T-F1 à T-F5, T-A1 à T-A6, T-L). Vocabulaire du protocole : **nature** (réplication, validation, vérification de code), **niveau** (relationnel, distributionnel (TOST), déterministe), **état de fiche** (complète, provisoire, bloquée). Aucune cible ne s'appuie sur une distribution publiée avec dispersion : le niveau distributionnel n'est retenu que pour T4.8, où le dossier le propose [I]. Tout critère relationnel porte un IC à 95 % qui exclut 0. Les n et les marges du tableau viennent du dossier ou sont [I]; ils se recalculent à la rédaction de chaque fiche (garde de puissance du harnais, [spec-simulation](../docs/05-spec-simulation.md)). Une graine fixe par répétition; moyenne ± IC 95 %.

| ID (dossier) | Taxon | Grandeur | Valeur publiée | Nature; niveau | Tolérance ou marge [I] | Répétitions | Source | Lecture; état de fiche | Porte |
|---|---|---|---|---|---|---|---|---|---|
| **T4.1** (T-F1) | *P. barbatus* | E[D]/E[A] stationnaire; λ ∈ {0,169; 0,807} par créneau; c_P ∈ {0,025; 0,05; 0,1} | Éq. 3-4 avec q = 0,05, d = 0, ᾱ = 0,01. Gain c_P/q = 0,5; 1; 2 **dérivé [I]** | Vérification de code; déterministe (identité) | Écart relatif < 10 % (script : < 5 %) | 1 run de 2·10⁵ créneaux par couple (6 couples) | [Prabhakar et al. 2012], éq. 3-4 | [T] éq.; [I] gain; complète | Code |
| **T4.2** (T-F2) | *P. barbatus* | Sorties moyennes 300-420 s ÷ 60-240 s; délai de reprise à 80 % | Retrait des retours 240-420 s : chute puis reprise retardée (qualitatif) | Réplication; relationnel | Rapport < 0,2; reprise > 0 et < 120 s (créneau 1 s). Script : rapport ≈ 0,02, reprise ≈ 36 s | 200 | [Prabhakar et al. 2012], fig. 2 | [T] qualitatif; seuils [I]; provisoire (créneau et c_P non publiés) | Rép-F |
| **T4.3** (T-F3) | *P. barbatus* | Corrélation retours/sorties simulées (lissage rectangulaire, rayon 25 créneaux) selon le débit moyen | Modèle : croissante (Spearman, n = 62, z = −4,04, p = 0,0001); données : non (z = −1,34, p = 0,18) | Réplication; relationnel | ρ > 0, p < 0,01 | 62 essais synthétiques (0,1 à 1,2 fourmi/s [I]) × 200 itérations | [Prabhakar et al. 2012], fig. 3 | [T]; provisoire (idem) | Rép-F |
| **T4.4** (T-F4) | *P. barbatus* | Extension à deux compartiments : délai de sortie après une salve; constante de repli | Activation 3 à 8 s; repli des disponibles après plus de 4 à 5 min sans retour | Validation; relationnel | Délai médian ∈ [3, 8] s (publié); pool d'entrée < 50 % après 5 min | 100 | [Pinter-Wollman et al. 2013] | [R]; 50 % [I]; **bloquée** | Validation (hors porte) |
| **T4.5** (T-F5) | *P. barbatus* | Débit sur la dernière heure d'un run de 3 h | c_G = 0,1 : arrêt; c_G = 2 et 5 : débit stationnaire, r_in = r_out (D = 10 min; fig. 8B : 7 valeurs de c_G, débit initial 0,01 fourmi/s, colonie 859) | Réplication; relationnel | c_G = 0,1 : < 5 % du pic; c_G ∈ {2; 5} : écart r_in/r_out < 10 % | 20 par c_G | [Pagliara et al. 2018], fig. 7-8 | [T]; provisoire (annexes S1-S4 non lues) | Rép-F |
| **T4.6** (T-A1) | *A. mellifera* | **Cumul** de receveuses distinctes sur 9 h, en % de l'effectif mesuré de l'essai (≈ 3 130; ≈ 4 450; pas 4 000; pas l'effectif instantané) | 17 → 30 % (2,0 → 12,8 retours/min); 17 → ≈ 50 % (2,7 → 26,5 retours/min), en moins de 9 h | Validation; relationnel (un essai par scénario) | 30 ± 5 points et 50 ± 10 points; sans trémulation : hausse < 5 points | 20 par scénario | [Seeley et al. 1996], tableau 1, fig. 1-2 | [T]; provisoire (mécanisme de cumul non publié) | Validation (hors porte) |
| **T4.7** (T-A2) | *A. mellifera* | Fraction des retours suivis d'une trémulation selon S (classes de 10 s) | Trémulation probable au-delà de 40 s | Validation; relationnel (qualitatif jusqu'à numérisation) | < 10 % pour S < 20 s; > 50 % pour S > 40 s | 20 | [Seeley et al. 1996] (introduction), citant [Seeley 1992] [non vérifiée] | [T] secondaire; seuils [I]; **bloquée** (fig. 7 de Seeley 1992 non lue) | Validation (hors porte) |
| **T4.8** (T-A3) | *A. mellifera* | Délai moyen des butineuses ÷ 500 (jeu standard, SIRO; taille = butineuses + receveuses, N_f = N_r = taille/2 [I]) | 2,3 / 1,25 / 0,42 / 0,15 % pour 10 / 100 / 1 000 / 10 000 | Réplication; distributionnel (TOST) | δ = ±15 % relatif par point : [1,96; 2,65], [1,06; 1,44], [0,357; 0,483], [0,128; 0,173] % (calcul [I]) | 10 par taille dans l'article (2 au-delà de 4 000 ouvrières); n requis par pilote; rodage 30 000, mesure 20 000 à 50 000 événements | [Anderson et Ratnieks 1999a], discussion, tableau 1 | [T]; provisoire (dispersion non publiée) | Rép-A; Docking |
| **T4.9** (T-A4) | *A. mellifera* | Délais à variances nulles (éq. C12, C14); cas 1 + 1 (éq. C3); proportion optimale (éq. C8) | E = 12,62; p\* = 0,5 | Réplication; déterministe (C12, C14), relationnel (C3, C8) | Déterministe : écart < 1 %; cas 1 + 1 : ±3 %; minimum à p = 0,50 ± 0,02 | 10 | [Anderson et Ratnieks 1999a], annexe C | [T]; recoupement [I] : 0,399·√(500 + 500) = 12,62; p\* = 550/1 100; complète | Rép-A |
| **T4.10** (T-A5) | *A. mellifera* | S(24 h) contre S\*; F(8 h) pour R_0 = 100 et 50 | S\*(Q = 2) = 19,9 s; S\*(Q = 3) = 29,9 s (calcul du dossier, retrouvé par le script); R sans effet à Q faible, F ∝ R à Q élevé (fig. 5) | Réplication; déterministe | S\* ± 5 %; Q = 0,9 : écart F < 5 %; Q = 3 : F(R_0 = 50)/F(R_0 = 100) ≈ 0,5 ± 0,1 | 1 (RK4; contrôle croisé Euler, dt = 0,5 s) | [Edwards et Myerscough 2011], éq. 10, fig. 5 | [T] préprint; provisoire (version publiée non comparée) | Rép-A; Docking |
| **T4.11** (T-A6) | *A. mellifera* | dR/dt sur 8 h; amplitude des oscillations de S | Q = 3 : R croît sans borne et S oscille; Q = 2 : stabilisation (fig. 8a; critère Q ≲ 3, recalculé 3,01) | Réplication; relationnel | Q = 3 : R croît encore à 8 h; Q = 2 : dR/dt → 0 (seuil numérique à fixer dans la fiche [à confirmer]) | 1 + balayage de sensibilité sur m_T | [Edwards et Myerscough 2011], éq. 9, fig. 8 et 10 | [T] préprint; symbole de l'éq. 9 [à confirmer]; provisoire | Rép-A |
| **T4.12** (T-L) | Les deux | L mesuré contre λ·W mesuré, par file et par sous-classe | L = λW | Vérification de code; déterministe (identité) | Écart < 2 % sur des fenêtres ≥ 100 W | Toutes les simulations | [Little 2011]; [Pagliara et al. 2018], éq. 12 | [T]; seuil [I]; complète | Code (continu) |

**Portes go/no-go** (vocabulaire du protocole : lecture, code, réplication, docking, extension).
- **Lecture** (par cible) : l'état de fiche de la colonne « Lecture ». **T4.4 et T4.7 sont bloquées** : pas de code du modèle avant la lecture de [Pinter-Wollman et al. 2013] en texte intégral et la numérisation de la fig. 7 de [Seeley 1992] [non vérifiée]; exécutées en `todo`, jamais comptées comme réussies. Une cible provisoire ne peut être que « satisfaite sous réserve ».
- **Code** : T4.12 et T4.1 passent, avec les vérifications du noyau de S0. Aucune réplication sans elles.
- **Réplication fourmi (Rép-F)** : cibles requises T4.2, T4.3, T4.5. Autorise E4.1 à E4.3.
- **Réplication abeille (Rép-A)** : cibles requises T4.8, T4.9, T4.10, T4.11. Autorise la part abeille d'E4.4 et E4.8.
- **Validations** (T4.4, T4.6, T4.7) : hors porte de réplication. Un échec est un résultat (limite du modèle) consigné au registre, non un échec de code.
- **Docking** : le modèle chorégraphique commun reproduit T4.1, T4.5, T4.8 et T4.10 dans les mêmes tolérances que ses références (§9). Autorise E4.4 à E4.7 comme résultats confirmatoires.
- **Extension** : porte de réplication franchie pour les cibles dont l'expérience dépend; enregistrement préalable déposé si elle est confirmatoire.
- **Deux niveaux** : le protocole exige des patrons à deux niveaux (individu et colonie). La fourmi n'a aucune cible chiffrée au niveau individuel ([Davidson et al. 2016] [R] seulement) : go conditionnel au mieux pour Rép-F (R55).

**No-go :** un échec est consigné au registre des déviations; on corrige l'implémentation avant toute extension. Si l'écart tient à une valeur non publiée, la cible est dégradée au niveau relationnel, avec déviation enregistrée, jamais retouchée en silence. Les seuils [I] se figent au gel de la fiche, avant le code (cadre, principe 2).

**Non reproductible sans données ni valeurs non publiées :** RMSE par essai (0,237 à 4,9; moyenne 0,602, SE 0,077), erreur de variation totale (0,056, SE 0,009), variation du RMSE (13 %, 2,6 %, 15,5 %), t = 8,98 sur l'écart modèle-données. Le signe négatif de z = −4,04 est reproduit tel que publié; sa convention n'est pas élucidée [à confirmer].

**Sorties secondaires, hors porte :** danseuses en trémulation par scan (tableau 1 de [Seeley et al. 1996]); cas à variance de 6 500 d'Anderson et Ratnieks (taille et valeurs à préciser [à confirmer]).

---

## 6. Expériences originales

Elles ne démarrent qu'après la porte indiquée (réplication avant extension; porte d'extension du protocole). Stochastique : 100 graines par cellule [I]; déterministe : 1 run et une grille de sensibilité. Lecture selon la règle commune du §3. Plusieurs cibles sont provisoires (§5) : un go conditionnel est probable, et les résultats qui en dépendent portent « sous réserve ».

**E4.1 — Boucle fermée de Prabhakar (H4.1).** Plan : couple l'éq. 3-4 à un terrain M/G/∞ (chaque sortie revient après X ~ χ² de moyenne D avec probabilité p; forme de l'éq. 7 de Pagliara; retard par tampon circulaire de créneaux, selon la [spec-simulation](../docs/05-spec-simulation.md)). Facteurs : g ∈ {0,5; 0,8; 1; 1,2; 2} [I], atteint par c_P = g·q/p; p ∈ {0,5; 0,8; 1} [I]; D ∈ {5; 10; 20} min [I] (10 min : fig. 8 de Pagliara); population disponible (trois niveaux [I]). Lecture : frontière g50 dans [0,8; 1,2] pour au moins deux des trois D; T4.12 vérifié sur chaque cellule. Porte Rép-F.

**E4.2 — Docking Prabhakar ↔ Pagliara.** Plan : même boucle de terrain (D = 10 min), mêmes observables (débit stationnaire selon l'abondance). Pour chacune des sept valeurs de c_G de T4.5, chercher g qui donne le même débit stationnaire (à ±10 % [I]). Lecture : correspondance monotone entre g et c_G; sinon les deux modèles ne sont pas équivalents en boucle fermée (résultat négatif à publier). Exploratoire. Porte Rép-F.

**E4.3 — Deux compartiments (H4.2).** Plan : numériser la fig. 2 (0,807 et 0,169 fourmi/s); ajuster le modèle à un compartiment (c_P) et à deux (temps d'activation, constante de repli, critère de parcimonie fixé au préenregistrement); comparer les RMSE relatifs. 200 répétitions. Lecture : H4.2. Porte Rép-F; reste exploratoire tant que T4.4 est bloquée (texte intégral de Pinter-Wollman et al. 2013 non lu).

**E4.4 — Indice natif (H4.3).** Plan : plan 2 × 2 (boucle de terrain, file d'appariement) × (indice de débit, indice de délai), à nombre d'échantillons égal; la file d'appariement est exécutée dans ses deux modes (avec et sans délai de recherche), et avec moyennage sur plusieurs échantillons comme facteur ([Ratnieks et Anderson 1999a] [R]). Estimateur d'information et regroupement fixés au préenregistrement. Au moins cinq niveaux d'état [I]. Lecture : contraste d'interaction ≥ 0,1 [I]. Portes Rép-F, Rép-A, docking.

**E4.5 — Régulateurs de contre-pression (H4.4; double message exploratoire).** Plan : producteurs et consommateurs (§9). Régulateurs : Ctl1 latence implicite (type CoDel), Ctl2 débit (type fourmi), Ctl3 demande explicite (type `request(n)`), Ctl4 double message (Ctl3 plus recrutement de consommateurs de réserve, type trémulation), Ctl5 orchestré (témoin). Facteurs : retard (trois niveaux [I]); profil de charge {stationnaire, échelon, retrait de 30 % des consommateurs (cadre, robustesse)}; élasticité de la réserve {nulle, intermédiaire, grande} [I]. Sorties : CV du débit, délai p95, débit, messages par tâche, temps de rétablissement, G ([métriques et typologie](../docs/06-metriques-et-typologie.md)). Lecture : H4.4. Porte de docking.

**E4.6 — Témoin orchestré et structure de tâche (H4.5).** Plan : graphe de tâches décomposable (N tâches indépendantes) ou séquentiel (chaîne de k = 2; 4; 8 étapes [I]); régulateurs local (Ctl1 ou Ctl3) et orchestré (Ctl5); retrait de 30 % des consommateurs en cours de run. Sorties : ratio de débit, messages par tâche, robustesse. Lecture : H4.5 (deux prédictions). Porte de docking.

**E4.7 — Retard et homogénéité (H4.6).** Plan : N ∈ {10; 100; 1 000} [I] régulateurs identiques puis à seuils hétérogènes (quatre CV [I]); retard de rétroaction (trois niveaux [I]). Sorties : CV du débit, pic spectral. Exploratoire. Porte de docking.

**E4.8 — Inhibition par la trémulation (H4.7).** Plan : étendre l'éq. 9 par un terme de frein sur f_r d'intensité ι (forme et référence de la fiche [I]; mécanisme [à confirmer]); Q ∈ {2; 3}; RK4. Sorties : dR/dt à 8 h, amplitude de S. Lecture : H4.7. Exploratoire. Porte Rép-A et lecture de la version publiée d'Edwards et Myerscough (R43).

**Parité.** E4.1 à E4.3 sont propres à la fourmi; E4.8 et les cibles T4.6 à T4.11 portent l'effort propre à l'abeille; E4.4 à E4.7 sont communs. L'asymétrie (trois originaux fourmi, un abeille) tient à ce que les cibles abeille sont plus nombreuses (six contre cinq) et que la fourmi dispose de deux modèles publiés complets.

---

## 7. Parallèle agentique

Le canal est une **variable du modèle**, pas un attribut du taxon. Chaque énoncé de transposition porte un statut : *Résultat reproduit*, *Modèle simplifié*, *Hypothèse de l'auteur*, *Analogie*.

### 7.1 Les canaux de P4 comme vecteur R

| Canal | Persistance | Portée | Adressage | Information effective I(M;W)/H(W) |
|---|---|---|---|---|
| Contacts antennaires, *P. barbatus* | Éphémère (contacts brefs) [Prabhakar et al. 2012] [T] | Tunnel d'entrée de 5 à 10 cm [T] | Aucun (fourrageuses présentes) | À mesurer (E4.4) |
| Délai de recherche, *A. mellifera* (indice, non émis) | Sans objet | Individuelle | Sans objet | À mesurer (E4.4) |
| Trémulation, *A. mellifera* | Environ une demi-heure en moyenne [Seeley et al. 1996] [T] | Nid : [à confirmer] | Deux publics supposés : receveuses, butineuses [Seeley 1992] [non vérifiée] [à confirmer] | À mesurer |
| Latence observée (agents) | Sans objet (indice) | Individuelle | Sans objet | E4.5 |
| 429 et `retry-after` [Anthropic 2026c] | Par réponse [I] | Appelant | Dirigé | E4.5 |
| `request(n)` [Reactive Streams 2026] | Jusqu'à consommation du crédit [I] | Un abonné | Dirigé | E4.5 |
| Orchestrateur (témoin) | Selon l'implémentation | Globale | Dirigé | Sans objet |

Les bits nominaux par message sont fixés par les [métriques et typologie](../docs/06-metriques-et-typologie.md), non ici.

### 7.2 Relations (pas des termes)

| Relation | Biologie (source, lecture) | Ingénierie ou agents (source) | Statut épistémique | Où l'analogie casse |
|---|---|---|---|---|
| **Rel1.** Le flux admis suit le flux sorti | r_in = r_out en régime stationnaire, boucle de terrain [Pagliara et al. 2018], éq. 12 [T]; le retour chargé tient lieu d'accusé [I] | Conservation des paquets et auto-cadencement par accusés [Jacobson et Karels 1988] [T] | **Analogie** (relation de conservation commune). Le nom « TCP » vient de [Carey 2012] et [Gordon 2014], pas de l'article | Le modèle de 2012 n'a ni perte ni retransmission (éq. 3-4) [T]; l'« accusé » est un retour de nourriture, non la confirmation d'un paquet précis [I] |
| **Rel2.** Démarrage graduel | Les patrouilleuses déclenchent, puis la montée suit le taux de retour [Gordon 2002] [R] | Démarrage lent [Jacobson et Karels 1988]; limites d'accélération [Anthropic 2026c] | **Analogie** (celle du communiqué) | Pour des agents, la limite d'accélération est imposée par le fournisseur, non auto-régulée |
| **Rel3.** Régler sur le délai, non sur la longueur | L'indice est un délai [Seeley 1989] [non vérifiée] [à confirmer]; [Seeley et Tovey 1994] [R] | CoDel contrôle le temps de séjour, indépendamment du débit du lien (cible 5 ms, intervalle 100 ms) [Nichols et al. 2018] [T]; limite Vegas, min RTT contre RTT échantillonné [Netflix 2026] [T] | **Hypothèse de l'auteur** : analogie CoDel-abeille proposée par le dossier [I], non trouvée publiée | Le délai de l'abeille est un temps d'appariement dans une file à deux côtés, non le temps de séjour d'une file à un serveur [I] |
| **Rel4.** Dimensionner la concurrence par L = λW | [Anderson et Ratnieks 1999a], annexe C [T]; [Pagliara et al. 2018], éq. 12 [T] | `Limit = RPS moyen × latence moyenne` [Netflix 2026] [T]; données en vol ≈ bw × min_rtt [Cardwell et al. 2022] [T, partiel] | **Résultat reproduit** (identité, T4.12) en biologie; **Analogie** pour l'usage en ingénierie | Little n'explique pas pourquoi W renseigne sur la charge (§4.9); ni la fourmi ni l'abeille ne mesure L [I] |
| **Rel5.** Le consommateur saturé borne les producteurs | La trémulation inhibe la frétillante [Kirchner 1993] [à confirmer]; [Nieh 1993] [non vérifiée]; audit bio-abeilles, M9 [S] : une inhibition, pas un veto | Contre-pression pilotée par la demande : pas plus d'émissions que `request(n)` [Reactive Streams 2026], règle 1.1 [T] | **Analogie partielle** | L'effet **mesuré** de la trémulation est de recruter des receveuses [Seeley et al. 1996] [T]; [Thom 2003] [R]. Son analogue premier est la mise à l'échelle des consommateurs (audit chorégraphie, T5 [I]). La danse est un échantillonnage local, pas un pub/sub (cadre, correction 10) |
| **Rel6.** Signal explicite contre indice implicite | Indice = sous-produit (temps de recherche) [Seeley 1989] [non vérifiée]; signal = trémulation [Seeley 1992] [non vérifiée] | 429 et `retry-after`, seau à jetons [Anthropic 2026c] (explicite) contre latence croissante (implicite) | **Hypothèse de l'auteur** (H4.4); double message testé en E4.5 | Chez les agents, le signal explicite est une réponse du fournisseur, non un message entre pairs |
| **Rel7.** Mise en veille sans retours | Repli des disponibles après plus de 4 à 5 min sans retour [Pinter-Wollman et al. 2013] [R]; arrêt des sorties après plus de 20 min [Carey 2012] (source primaire non trouvée) | Expiration de délai [I] | **Analogie** | Le seuil de 20 min est secondaire (R53) |
| **Rel8.** Fiabiliser l'indice par échantillonnage multiple | Moyenner sur plusieurs voyages ou transferts [Ratnieks et Anderson 1999a] [R]; transferts multiples [Hart et Ratnieks 2001] [à confirmer] | Moyennes mobiles et fenêtres des limites de concurrence [Netflix 2026] (Gradient2) [T] | **Analogie** | Une partie des transferts multiples est un sous-produit non adaptatif [Gregson et al. 2003] [R] |
| **Rel9.** Un grand pool partagé attend moins | Délai décroissant avec la taille [Anderson et Ratnieks 1999a] [T], T4.8 | Mutualisation des serveurs [I; résultat classique de files, non sourcé ici] | **Résultat reproduit** (biologie); **Analogie** (ingénierie) | Colonies simulées jusqu'à 10 000 ouvrières; pools d'agents petits [I] |

### 7.3 Où l'analogie casse (au-delà du tableau)

- **La fourmi n'est pas un débitmètre** : elle intègre des contacts dont le taux suit le taux de retour [Pinter-Wollman et al. 2013] [R]. « Débit » est une lecture de modèle : nuance apportée à la correction 6 du cadre, qui écrit « un débit sur la boucle de terrain ».
- **Freinage actif ailleurs** : phéromone « no entry » [Robinson et al. 2005], inhibition par encombrement [Dussutour et al. 2004]. « Absence de retours » ne vaut que pour *P. barbatus* (cadre, correction 9).
- **Coût et contraintes** : le coût de la fourrageuse est interne (eau) [Prabhakar et al. 2012], introduction [T]; pour des agents, jetons et limites sont externes [Anthropic 2026c].
- **Localité** : contacts physiques dans un tunnel; un canal textuel d'agents n'a aucune localité si on ne l'impose pas [I].
- **Homogénéité** : « agents identiques oscillent » est sans acquis (H4.6).
- **Irréversibilité** : la contre-pression suppose que différer une tâche est sans effet de bord; sinon, compensations de type saga [Garcia-Molina et Salem 1987]. Hors périmètre de P4, signalé à P6.

### 7.4 Témoin orchestré

Contrôleur central à **vue complète** (longueur et capacité de toutes les files, état de chaque consommateur) qui affecte les tâches et dimensionne le pool : A1 oui, A2 oui (cadre). Deux variantes dans E4.5 et E4.6 : **oracle** sans coût de communication (borne supérieure idéalisée, P_max de G) et **réaliste** à décision retardée et vue échantillonnée [I]. Dans les deux cas, on mesure aussi ses messages. Il n'est jamais présenté comme modèle biologique.

### 7.5 Structure de tâche

Les deux colonies étudiées règlent des flux de tâches **décomposables** (voyages indépendants; appariement). Étendre aux tâches **séquentielles** est une *Hypothèse de l'auteur* (H4.5). La littérature agentique est partagée : [Kim et al. 2025a] (architecture gagnante dépendante de la tâche; dégradation des architectures multi-agents en planification séquentielle), [Salemi et al. 2025] et [Mao et Mirhoseini 2026] (décentralisation gagnante) [S, lus par l'audit]. P4 ne tranche pas pour les agents LLM.

### 7.6 Lien avec P7

- Pas de dépendance dans un sens ni dans l'autre (cadre); P4 est une entrée **optionnelle** de P7 (P4 en phase 2, P7 en phase 3).
- P4 livre : les contrôleurs Ctl1 à Ctl5 (TypeScript, validés par docking), les métriques (CV du débit, p95, messages, G), et H4.4 et H4.5 comme sous-expériences candidates.
- P7 y brancherait de vrais agents sous limites d'API, avec un facteur « canal » à modèle fixe (indice de latence contre `retry-after` contre texte), et son propre témoin orchestré.
- P4 n'exécute aucun agent LLM. Les limites d'API ([Anthropic 2026c], consultées le 2026-10-01) se vérifient de nouveau avant toute exécution de P7 (cadre, correction 16).

---

## 8. Visuels et trois niveaux

**Public** (décision de [vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md)) : principal, étudiants; secondaire, praticiens; entrée par défaut, *Explorer*; la page se présente comme un document réactif sur la loi de Little, avec la contre-pression pour les praticiens. Couleurs de la charte : fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes; viridis ou cividis pour les grandeurs continues. Pas d'anthropomorphisme ni de téléologie; l'encart « Ce que fait vraiment la reine » vient du gabarit, P4 n'y ajoute aucune affirmation.

### 8.1 Les six visuels

| # | Visuel | Taxon | Cibles | Statut épistémique du graphe |
|---|---|---|---|---|
| Vis1 | Le portier du tunnel | *P. barbatus* | T4.1 à T4.3 | Modèle simplifié (éq. 3-4); Résultat reproduit pour le retrait (T4.2) |
| Vis2 | Le quai de déchargement | *A. mellifera* | T4.6, T4.7, T4.10, T4.11 | Résultat reproduit (T4.6); Modèle simplifié pour le reste |
| Vis3 | Un triangle, deux files | Les deux | T4.12 | Résultat reproduit (identité); « ce que chaque espèce perçoit » : Modèle simplifié, en partie [à confirmer] |
| Vis4 | Le seuil de volatilité | *P. barbatus* | T4.5 | Résultat reproduit |
| Vis5 | Les grandes colonies attendent moins | *A. mellifera* | T4.8, T4.9 | Résultat reproduit |
| Vis6 | Pousser ou tirer | *A. mellifera* et agents | Interprétation des auteurs de [Seeley et al. 1996] | **Analogie** (`retry-after` contre message explicite) |

### 8.2 Ce qui est montré et manipulé, par niveau

| Visuel | **Voir** (récit guidé, prédiction d'abord) | **Explorer** (bac à sable étayé) | **Vérifier** (reproduction, distribution sur N graines, code, limites) |
|---|---|---|---|
| Vis1 | Un retour chargé entre, la jauge α monte de c_P; un départ la baisse de q. Prédiction : « si les retours cessent, que font les sorties ? » | Bouton « bloquer les retours de 4 à 7 min » (rejoue la fig. 2); chronogramme retours, sorties observées (fig. 2 numérisée), sorties simulées. Manipule : c_P, q, d, ᾱ, niveau de débit (0,169 ou 0,807), graine | T4.1 à T4.3 : distribution du gain sur les graines, tableau d'acceptation. Limites : durée du créneau et c_P non publiés; modèle plus corrélé que les données |
| Vis2 | Vue de dessus de l'entrée; chronomètre par butineuse. Prédiction : « si l'afflux est fort, quelle part de la colonie reçoit le nectar ? » | Scénarios faible et fort afflux (essais 1 et 2); S moyen, % de receveuses (cumulé et instantané), danseuses. Manipule : afflux, Q, R_0, β, m_T, mode avec ou sans délai de recherche | T4.6, T4.7, T4.10, T4.11 : cumul contre cible (30 ± 5; 50 ± 10 points). Limites : cumul ≠ instantané; seuil de 40 s secondaire; [Seeley 1992] [non vérifiée] |
| Vis3 | Le même triangle L-λ-W affiché deux fois, « deux files, pas une ». Prédiction : « à L fixé, si W augmente, que devient λ ? » | Curseur « rareté des graines » (D augmente, λ baisse à L fixé); curseur « afflux » (λ monte, puis L et W); encadré « ce que chaque espèce perçoit » | T4.12 : écart L contre λ·W en temps réel; limite : Little n'explique pas pourquoi W renseigne sur la charge |
| Vis4 | La boucle terrain-nid-terrain : « assez de nourriture, ça tient; trop peu, ça s'arrête ». Prédiction avant le curseur | Diagramme en toile d'araignée (r_out selon r_in, diagonale); curseur c_G; bascule entre fourragement soutenu et arrêt | T4.5 : sept valeurs de c_G, 20 graines. Limites : unité de τ, N et c_G\* non lus (annexes) |
| Vis5 | Taille de 10 à 10 000 (échelle log), délai en % du cycle. Prédiction : « un petit groupe attend-il plus ? » | Curseur de taille; curseur de p avec creux à p\*; SIRO ou FCFS; quatre points publiés superposés | T4.8, T4.9 : ±15 %. Limites : unités arbitraires; incohérence 2,4 / 2,3 % de la source |
| Vis6 | Bande dessinée en deux cases : l'ouvrière poussée par l'échec, puis tirée par un signal | Choix du régulateur Ctl1 à Ctl5 et du retard; comparaison indice implicite et signal explicite | H4.4 et H4.5 seulement **après** préenregistrement et exécution; coût en messages; statut Analogie. Les résultats confirmatoires restent séparés des pages exploratoires |

### 8.3 Vue de l'agent et Modifier la règle (niveau Explorer)

**Vue de l'agent**
- *Fourmi* : la fourrageuse au tunnel; variable s(t) et seuils ±1 ([Davidson et al. 2016] [R], colonie 2); ne perçoit que les contacts à 5-10 cm. La jauge α de Vis1 est un état **de colonie**, non individuel.
- *Abeille* : la butineuse chargée avec son chronomètre S; la règle de danse selon S (m_S, m_T d'Edwards et Myerscough, qui sont des ajustements); la receveuse, état disponible ou occupé.
- *Agent* : l'appelant avec sa file de requêtes; selon le régulateur, il voit sa latence, un 429 avec `retry-after`, ou ses crédits `request(n)`.

**Modifier la règle** (toute valeur hors plage publiée est signalée « Hypothèse de l'auteur »)
- *Fourmi* : c_P, q, d, ᾱ; un ou deux compartiments (H4.2, exploratoire).
- *Abeille* : discipline SIRO ou FCFS, proportion p de receveuses, m_S, m_T, β, Q; avec ou sans délai de recherche; terme d'inhibition ι (H4.7, exploratoire, [à confirmer]).
- *Agent* : régulateur Ctl1 à Ctl5, retard de rétroaction, élasticité de la réserve.

### 8.4 Objectifs d'apprentissage

Mesurés par pré-test et post-test avec condition témoin statique ([vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md)). **OA-P4.1 à OA-P4.3 sont fixés par V0**; OA-P4.4 à OA-P4.6 sont des **propositions de la fiche**, à intégrer à V0 ou à retirer.

| ID | La personne peut… | Niveau de la page |
|---|---|---|
| OA-P4.1 (V0) | Prédire l'effet d'un changement de λ ou de W sur L dans un document réactif | Explorer |
| OA-P4.2 (V0) | Distinguer ce que mesure la fourmi (un débit sur la boucle de terrain) de ce que mesure l'abeille (un délai dans une file d'appariement) | Voir, Explorer |
| OA-P4.3 (V0) | Dire d'où vient l'analogie TCP et ce que l'article de référence ne dit pas | Explorer |
| OA-P4.4 (proposé) | Prédire que le blocage des retours fait chuter les sorties, puis les reprend avec retard (T4.2) | Voir |
| OA-P4.5 (proposé) | Classer un exemple d'ingénierie (429 avec `retry-after`, latence croissante, `request(n)`) comme signal explicite ou indice implicite | Explorer |
| OA-P4.6 (proposé) | Lire une distribution sur N graines et décider si une cible est atteinte selon son critère | Vérifier |

### 8.5 Accessibilité propre au projet (WCAG 2.2 AA)

- **Chronogrammes** (Vis1) : trois séries distinguées par couleur de la charte, forme de marqueur et style de trait; table de données alternative; description textuelle de l'événement clé.
- **Animations** (Vis1, Vis2) : sous `prefers-reduced-motion`, parcours pas à pas statique avec boutons « suivant »; jauge α annoncée en texte (région `aria-live` polie, débit limité).
- **Chronomètres colorés** (Vis2) : vert, gris, rouge doublés d'une icône et d'une étiquette; vérification en daltonisme.
- **Curseurs** : opérables au clavier, valeur lisible, plage publiée marquée.
- **Toile d'araignée** (Vis4) et **échelle log** (Vis5) : tableau équivalent; point fixe et points publiés annoncés en texte; étiquettes directes.
- **Mobile** : aucune interaction ne dépend du survol.

### 8.6 Erreurs de compréhension à prévenir

| Idée fausse | Ce que la page dit à la place |
|---|---|
| « La fourmi compte les retours » | Elle intègre des contacts; la jauge de Vis1 est un état de colonie |
| « TCP est dans l'article » | L'analogie vient d'un communiqué et de [Gordon 2014]; l'article ne cite que les « réseaux informatiques » |
| « Les deux espèces lisent la même file » | Deux files : terrain (débit) et appariement (délai) |
| « Little explique pourquoi le délai renseigne » | Little relie trois moyennes; un modèle de file explique le reste; en sous-charge, le délai reste plat |
| « La trémulation freine » | Elle recrute surtout des receveuses; l'inhibition du recrutement reste à confirmer |
| « Le signal d'arrêt est un veto » | Une inhibition (cadre, correction 7) |
| « L'abeille voit la file; la reine commande » | Elle ne connaît que son propre temps de recherche; encart du gabarit |
| « Toute fourmi freine par absence de signal » | Vrai pour *P. barbatus*; d'autres espèces freinent activement |
| « Le modèle valide la biologie » | Réplication n'est pas validation; le modèle corrèle plus que les données |
| « Plus de signal, meilleure régulation » | Cela dépend (H4.4 : gain de régulation contre coût en messages) |
| « Les agents LLM se comportent comme des fourmis » | Ce sont des analogies sourcées, avec leur statut |

---

## 9. Plan de simulation

Trois couches (cadre, architecture de simulation). TypeScript partout; Node exécute le `.ts` et `tsc --noEmit` vérifie les types. Deux sorties : moteur **headless Node** (balayages, tests, rejeu) et couche **navigateur** (visuels). Spécification de S0 : [spec-simulation](../docs/05-spec-simulation.md).

### 9.1 Couches

| Couche | Contenu | Validation |
|---|---|---|
| 1. Noyau commun (S0) | PRNG à graine, horloge à pas fixe, file d'événements discrets (tas binaire), RK4, Euler-Maruyama, SSA, échantillonneurs (Poisson, normale, χ²), enregistreur, manifeste de run. P4 ajoute un **moniteur de Little** (T4.12) et exige les trois échantillonneurs [I] | Tests de S0 + porte de code |
| 2. Modèles de référence | Les six préréglages du §4, un par article | Cibles T4.1 à T4.12 |
| 3. Modèle chorégraphique commun | **Producteurs-consommateurs** : N_p producteurs (butineuses ou agents émetteurs), N_c consommateurs à capacité limitée (receveuses ou serveurs), file d'appariement, réserve de consommateurs inactifs, canal interchangeable {contacts, délai, signal explicite, double message, orchestré} (persistance, portée, adressage, format). L'abandon est une règle de la politique, non du canal (spec) | Docking (§9.3) + porte de docking |

### 9.2 Paramètres par modèle

| Modèle (cibles) | Pas de temps | Durée simulée | N d'agents | Graines |
|---|---|---|---|---|
| P4-Pb-2012 (T4.1 à T4.4) | Créneau de 1 s [I]; sensibilité à ½ et 2 créneaux [I] | 2·10⁵ créneaux (T4.1); 1 100 créneaux (T4.2, script du dossier); 20 min (T4.3) | Sans objet (taux) | T4.1 : 1 run par couple; T4.2 : 200; T4.3 : 62 × 200 |
| P4-Pb-2018 (T4.5, E4.1, E4.2) | RK4 à pas fixe si le pas est compatible avec ε1·ε2 = 0,01 (raideur à vérifier avant de retenir un schéma explicite); convergence en divisant le pas par 2; intégrateur des auteurs inconnu [à confirmer]; décision dans la fiche | 3 h | Non précisé [à confirmer] | 20 par c_G |
| P4-Am-1999 (T4.8, T4.9) | Événementiel (tas binaire, temps continu) | 30 000 événements de rodage + 20 000 à 50 000 de mesure | Taille 10 à 10 000 (N_f = N_r = taille/2 [I]) | 10 par taille (2 au-delà de 4 000) |
| P4-Am-2011 (T4.10, T4.11, E4.8) | RK4; pas fixé par test d'ordre; l'échelon U(S − m_T) est un **événement** de franchissement localisé par bissection, non écrit dans le second membre; contrôle croisé Euler à 0,5 s | 8 h; 24 h pour S\* | R_0 = 100 et 50; F(0) = 1 [I] | Déterministe |
| P4-Am-1996 (T4.6, T4.7) | Événementiel (SSA); scans toutes les 15 min | 9 h | ≈ 3 130 et ≈ 4 450 abeilles; butineuses de 10 à 267 | 20 par scénario |
| Couche 3 (E4.4 à E4.7) | À fixer au préenregistrement [à confirmer] | À fixer | N ∈ {10; 100; 1 000} (E4.7) [I] | 100 par cellule [I] |

Une graine maître par campagne, une graine fixe par répétition (dérivation par S0); le manifeste enregistre graine, version du code, paramètres et le statut de lecture de chaque valeur. Les retards sont des tampons circulaires (P4-Pb-2012 et boucle fermée d'E4.1). L'ordre de mise à jour est un facteur de toute analyse; celui de P4-Pb-2012 est publié (arrivées au début du créneau, départs à la fin). **Sensibilité** selon la spec : OFAT étendue pour toute figure de mécanisme; méthode globale si le nombre de paramètres le permet (P4-Am-2011, R48).

### 9.3 Docking

Le modèle commun, configuré par canal, est validé contre chaque modèle de référence selon [Axtell et al. 1996] (alignement de modèles) et le [protocole de reproduction](../docs/04-protocole-reproduction.md) :

| Configuration du modèle commun | Référence | Cible de docking |
|---|---|---|
| Canal contacts, entrée exogène | P4-Pb-2012 | T4.1 |
| Canal contacts, boucle de terrain M/G/∞ | P4-Pb-2018 | T4.5 |
| Canal délai, sans délai de recherche | P4-Am-1999 | T4.8 |
| Canal délai, avec délai de recherche (urne) | P4-Am-2011 | T4.10 |

Critère : le modèle commun satisfait la même tolérance que la référence **et** reste dans la marge d'équivalence commun-référence fixée par le protocole (aucune valeur inventée ici).

### 9.4 Budgets de performance

Charge de référence de la [spec-simulation](../docs/05-spec-simulation.md) (budgets par projet) : 2·10⁵ créneaux par run pour P4-Pb-2012; pour les files, 3·10⁴ événements de rodage puis 2·10⁴ à 5·10⁴ de mesure, de 10 à 10 000 ouvrières, soit au plus 8·10⁴ événements (tas en O(log n)); exécution headless et page. Ces coûts sont des calculs de la spec [I]; les seuils de temps et d'images par seconde se fixent **avant** les mesures du spike de la phase 0 et se mesurent sur le harnais [à confirmer]. WASM seulement si la mesure montre que le noyau dépasse le budget (règle de la spec).

### 9.5 Sorties

- Manifeste de run (graine, version, paramètres, statut de lecture); séries JSON ou CSV (retours, sorties, α, S, F, R, receveuses cumulées, L, λ, W, messages).
- Tableau d'acceptation T4.1 à T4.12 avec décision (porte), distributions sur graines, rapport de docking.
- Données numérisées, au format de la spec (`data/figures/<étiquette>-<figure>.csv`, colonnes `x,y,yLow,yHigh`, incertitude de lecture en en-tête) : fig. 2 et 3 de [Prabhakar et al. 2012]; fig. 7 de [Seeley 1992] [non vérifiée] (R41); fig. 7-8 de [Pagliara et al. 2018]; fig. 1-2 de [Seeley et al. 1996]. Chaque fichier cite l'étiquette et l'emplacement de la figure; licence à vérifier ([science ouverte et éthique](../docs/08-science-ouverte-ethique.md)).
- Cibles exécutables : `targets/p4.json`, une entrée par T4.n, de même niveau, même n et même marge que la fiche (contrôle par `outils/verifier-cibles.ts`); résultats et manifestes dans `data/results/p4/`.
- Registre des déviations : un fichier versionné par projet, `data/results/p4/registre-deviations.md` [I : chemin fixé par la présente fiche], au gabarit du protocole.

---

## 10. Livrables et critères d'achèvement

| # | Livrable | Critère d'achèvement vérifiable |
|---|---|---|
| L1 | **Fiches de reproduction** : 12, une par cible, au gabarit du protocole (équations, paramètres, unités, protocole, figure cible, critère chiffré, état de lecture) | Les douze fichiers existent; chaque seuil [I] est gelé; chaque fiche est gelée par un commit étiqueté **avant** le code de son modèle (ordre vérifiable par `git log`); T4.4 et T4.7 restent « bloquée » tant que leur source n'est pas lue |
| L2 | **Données numérisées** (§9.5) | Un CSV par figure, au format de la spec, avec incertitude de lecture; surimpression de contrôle; source, méthode, date et licence consignées |
| L3 | **Code** : cinq modèles de référence, couche 3 (Ctl1 à Ctl5), moniteur de Little | `npm run verify` au vert (`tsc --noEmit`, `node --test`, vérifications documentaires); `targets/p4.json` en correspondance exacte avec les T4.n de cette fiche; tests T4.1 à T4.12 à graines fixes (les cibles bloquées en `todo`, jamais comptées comme réussies); moniteur de Little actif dans chaque run; rejeu à l'identique d'un run depuis son manifeste |
| L4 | **Rapport de docking** | Les quatre configurations du §9.3 satisfont leur critère (porte de docking) |
| L5 | **Préenregistrement** : un enregistrement par projet (gabarit de simulation, [science ouverte et éthique](../docs/08-science-ouverte-ethique.md)) couvrant H4.1, H4.4, H4.5, les seuils gelés, le plan factoriel, la règle de décision et l'estimateur d'information [Chambers 2013]; [Chambers et Tzavella 2022] | Dépôt horodaté **avant** la première exécution confirmatoire de P4; écarts ultérieurs consignés au registre |
| L6 | **Expériences originales** E4.1 à E4.8, selon les portes | Pour chacune, une décision (confirmée, réfutée, non concluante) avec IC; exploratoires étiquetées comme telles |
| L7 | **Note de recherche** (français canadien, nature académique) | Placement sur les trois axes de la typologie en tête; statut épistémique sur chaque énoncé et graphe; tableau T4.1 à T4.12 avec décisions; registre des déviations; limites; chaque affirmation factuelle porte une étiquette de la bibliographie; aucune valeur chiffrée sans source ni marque; marques [non vérifiée] et [à confirmer] conservées |
| L8 | **Page interactive** (Vis1 à Vis6, trois niveaux) | Les six visuels fonctionnent aux trois niveaux; contrôle WCAG 2.2 AA (outil automatique **et** contrôle manuel : clavier, lecteur d'écran, `prefers-reduced-motion`, daltonisme, mobile) sans défaut bloquant; statut épistémique affiché sur chaque graphe; résultats confirmatoires séparés des pages exploratoires |
| L9 | **Évaluation** : pré-test et post-test sur OA-P4.1 à OA-P4.6, condition témoin statique | Instruments finalisés et protocole conforme à V0 et à la [science ouverte et éthique](../docs/08-science-ouverte-ethique.md); analyse selon le plan de V0 |
| L10 | **Registre des corrections de la v3** (tableau du §2) | Chaque ligne retrouvée dans la note et dans la page, par recherche textuelle |

---

## 11. Risques et réserves

Numérotation R41 à R56 (préfixe du projet, pour éviter les collisions avant consolidation par le [plan de recherche](../docs/03-plan-de-recherche.md)).

| ID | Risque ou réserve | Effet | Plan B ou porte |
|---|---|---|---|
| **R41** | Huit articles *Behav Ecol Sociobiol* non vérifiés (Springer bloque l'accès) : [Seeley 1989], [Seeley 1992], [Kirchner et Lindauer 1994], [Nieh 1993], [Anderson et Ratnieks 1999b], [Kirchner 1993], [Biesmeijer 2003], [Hart et Ratnieks 2001]; [Seeley 1994] pour son contenu | Énoncés du §4.7 restent [à confirmer]; seuils de T4.7 et paramètres m_S, m_T non confirmés | Accès en bibliothèque, **en priorité [Seeley 1992] [non vérifiée] (fig. 7, à numériser) et [Seeley 1989] [non vérifiée]**. D'ici là : T4.7 et T4.4 bloquées, H4.7 exploratoire |
| **R42** | [Prabhakar et al. 2012] : durée du créneau, valeurs de c_P et séries brutes non publiées | T4.2 et T4.3 qualitatifs; seuils [I] sans appui | Demander données et code au laboratoire Gordon; analyse de sensibilité sur le créneau; seuils recalés sur la fig. 2 numérisée |
| **R43** | [Edwards et Myerscough 2011] : préprint seulement; symbole de l'éq. 9 et valeurs de m_T, m, β non confirmés; S\*(Q = 3) = 29,9 s est proche de m_T = 30 s | T4.11 fragile (dépend de dépassements transitoires); E4.8 non fiable | Lire la version publiée (*J Theor Biol* 271: 64-77); balayage de sensibilité sur m_T; si l'instabilité dépend du pas, déclarer « non reproduit » sans forcer |
| **R44** | [Anderson et Ratnieks 1999a] affirment que Little « ne tient pas ici », en contradiction avec [Little 2011] | Formulation de « déjà publiée » | Relire l'annexe C contre [Little 2011]; le verdict repose sur la citation de Little par les auteurs et sur l'éq. 12 de Pagliara |
| **R45** | [Pagliara et al. 2018] : annexes S1-S4 non lues (unités de τ et k_G, N, c_G\*, degrés de liberté du χ²) | Tolérances de T4.5 et pas d'intégration incertains | Lire les annexes; contacter les auteurs; test de convergence sur le pas |
| **R46** | [Pinter-Wollman et al. 2013] lu en résumé seulement | T4.4 partiellement [I] | Texte intégral (PMC3767282); T4.4 reste non bloquante |
| **R47** | Réplication n'est pas validation : le modèle 2012 corrèle plus fort que les données (aveu des auteurs) | Surinterprétation biologique | Formulations de la page et de la note limitées au niveau « réplication »; T4.6 et T4.7 seules sont des cibles empiriques |
| **R48** | Paramètres d'Edwards et Myerscough tirés de primaires non lues ([Seeley et al. 1991], [Seeley et Towne 1992], [Camazine et Sneyd 1991], [Seeley 1986], [Seeley 1994], [Seeley 1995]); f_s [à confirmer] (cadre, réserves) | T4.10 et T4.11 dépendent de ces valeurs | Balayage de sensibilité par paramètre; marquer chaque valeur avec sa source |
| **R49** | Aucun modèle publié ne donne le **cumul** de receveuses; β serait ajusté | T4.6 deviendrait une calibration | Calibrer sur l'essai 1, **prédire** l'essai 2 [I]; sinon dégrader en « calibration » et le dire |
| **R50** | Sur-affirmation des analogies : TCP absent de l'article; CoDel-abeille non publiée [I]; trémulation ≠ contre-pression | Erreur de compréhension, perte de crédibilité | Statut *Analogie* ou *Hypothèse de l'auteur* partout; liste du §8.6 |
| **R51** | Portée : E4.4 à E4.8 dépassent les réplications | Dérive de calendrier | Réplication avant extension (portes); couper d'abord E4.7 et E4.8 (exploratoires) |
| **R52** | Limites d'API et tarifs ([Anthropic 2026c], consultés le 2026-10-01) susceptibles de changer | Sans effet dans P4 (aucun LLM); affecte P7 | Vérifier de nouveau avant toute exécution de P7 (cadre, correction 16) |
| **R53** | [Gordon 2010] : contenu non lu; seuil de plus de 20 min sans retour [Carey 2012] : source primaire non trouvée (peut-être [Gordon et al. 2008] ou [Gordon et al. 2011], [M]) | Citations d'analogie sans appui primaire | Ne pas citer [Gordon 2010] pour TCP; lire [Gordon 2010], [Gordon et al. 2008] et [Gordon et al. 2011] avant de citer le seuil de 20 min |
| **R54** | Numérisation de figures : accès (fig. 7 de [Seeley 1992] [non vérifiée]) et licence de redistribution des données dérivées | T4.7 bloquée; publication des données incertaine | Vérifier la licence ([science ouverte et éthique](../docs/08-science-ouverte-ethique.md)); ne publier que les valeurs et la méthode si nécessaire |
| **R55** | Le protocole exige des patrons à deux niveaux (individu et colonie) pour la porte de réplication; la fourmi n'a aucune cible chiffrée au niveau individuel ([Davidson et al. 2016] [R]) | Rép-F au mieux « go conditionnel » | Lire Davidson et al. 2016 en entier pour en tirer une cible individuelle; sinon registre de type « source » accepté par le chercheur |
| **R56** | Les canaux de la spec (champ, piste de danse, tableau noir, messages) ne couvrent pas les canaux de P4 : contact local éphémère, indice de délai, crédits de demande | Couche 3 incomplète pour P4 | Ajouter ces canaux à la spec ou les réaliser par `messages` et par des politiques; décision avec S0 avant la porte de docking |

**Mises en garde de statut.** Dans la bibliographie, [Seeley et al. 1991], [Seeley et Towne 1992] et [Camazine et Sneyd 1991] sont « corrigée », alors que le dossier n'a lu que leurs métadonnées [M]; [Gordon 2010] est « vérifiée » (métadonnées) mais son contenu est non lu. Aucune valeur n'est reprise de ces sources sans marque.

---

## 12. Effort et dépendances

**Estimation en semaines-personne [estimation, à confirmer] :**

| Lot | Contenu | Sem.-pers. |
|---|---|---|
| 1 | Fiches de reproduction (12) et numérisations | 3 |
| 2 | Modèles fourmi et T4.1 à T4.5 | 2,5 |
| 3 | Modèles abeille et T4.6 à T4.11 | 3,5 |
| 4 | Moniteur de Little et T4.12 (avec S0) | 0,5 |
| 5 | Couche 3 et docking | 2,5 |
| 6 | Expériences originales E4.1 à E4.8 | 4 |
| 7 | Visuels Vis1 à Vis6 (trois niveaux) et accessibilité | 4 |
| 8 | Note de recherche et préenregistrement | 2 |
| 9 | Évaluation (avec V0) | 1 |
| | **Total** | **23** |

**Prérequis.**
- **S0** : noyau (PRNG, horloge, file d'événements, RK4, SSA, échantillonneurs), harnais, manifeste, moniteur de Little; spécification dans [spec-simulation](../docs/05-spec-simulation.md).
- **V0** : gabarit, charte, protocole d'évaluation ([vulgarisation et évaluation](../docs/07-vulgarisation-evaluation.md)).
- Documents transversaux : [protocole de reproduction](../docs/04-protocole-reproduction.md), [métriques et typologie](../docs/06-metriques-et-typologie.md), [glossaire](../docs/10-glossaire.md).
- Accès en bibliothèque aux articles Springer (R41); données du laboratoire Gordon (R42), souhaitables mais non bloquantes.
- Projets : aucune dépendance scientifique envers P1, P5, P8 (phase 1); coordination avec **P3** sur H4.6 (diversité des seuils) et sur [Pinter-Wollman et al. 2011] ([non vérifiée], citée par P3 et P4). P7 vient après (§7.6).

**Ordre des tâches.**
1. Fiches de reproduction, numérisations, accès aux sources (R41), **avant tout code**.
2. Porte de code : T4.12 (moniteur), T4.1, avec les vérifications du noyau de S0.
3. En parallèle : fourmi (T4.2, T4.3, T4.5) vers la porte Rép-F; abeille (T4.8, T4.9, T4.10, T4.11) vers la porte Rép-A; validations T4.6, puis T4.4 et T4.7 une fois leurs sources lues.
4. Couche 3 et docking vers la porte de docking (canaux de P4 à ajouter, R56).
5. Préenregistrement (un enregistrement couvrant H4.1, H4.4, H4.5) **avant** la première exécution confirmatoire : E4.1, E4.5 ou E4.6.
6. E4.1 à E4.3 (après Rép-F); E4.4 (Rép-F, Rép-A, docking); E4.5 à E4.7 (docking); E4.8 (Rép-A).
7. Visuels : Vis1, Vis3, Vis4, Vis5 dès que leurs cibles passent; Vis2 après Rép-A; Vis6 après E4.5. Note, évaluation en dernier.
8. En cas de contrainte de budget : couper E4.7 et E4.8 d'abord (R51).

---

## 13. Références clés

Statuts de la [bibliographie](../docs/11-bibliographie.md) (« vérifiée », « corrigée », « non vérifiée »); entre parenthèses, la lecture faite dans le dossier. Étiquette ambiguë : **Anthropic 2026c** (Rate limits; dossier P4).

**Fourmis (*P. barbatus*)**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Prabhakar et al. 2012] | corrigée | [T] PDF complet |
| [Pagliara et al. 2018] | vérifiée | [T] PDF complet |
| [Pinter-Wollman et al. 2013] | vérifiée | [R]; texte intégral inaccessible |
| [Davidson et al. 2016] | vérifiée | [R]; éq. 2 et paramètres de la fig. 6A lus |
| [Gordon 2002] | vérifiée | [R] |
| [Greene et Gordon 2007] | corrigée | [R] |
| [Gordon 2013] | corrigée | [R] + [M]; addendum non lu |
| [Gordon 2014] | vérifiée | [T] partiel (« Operating Costs », seule mention de TCP) |
| [Gordon 2016] | vérifiée | [T] par mots-clés : aucune occurrence de TCP ni d'internet |
| [Gordon 2010] | vérifiée | [M] : contenu **non lu**; non citable pour TCP |
| [Carey 2012] | vérifiée | [T] page complète |
| [Gordon et al. 2008] | corrigée | [M]; référence 28 de Prabhakar et al. 2012 |
| [Gordon et al. 2011] | corrigée | [M]; référence 29 de Prabhakar et al. 2012 |
| [Schafer et al. 2006] | corrigée | [M]; référence 27, source du plancher ᾱ |
| [Pinter-Wollman et al. 2011] | non vérifiée | [M]; **non vérifiée**; citée aussi par P3 |

**Abeilles (*A. mellifera*)**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Seeley et al. 1996] | corrigée | [T] PDF complet |
| [Anderson et Ratnieks 1999a] | corrigée | [T] PDF complet |
| [Edwards et Myerscough 2011] | vérifiée | [T] préprint arXiv:1007.3311; version publiée non comparée |
| [Seeley et Tovey 1994] | vérifiée | [R] |
| [Ratnieks et Anderson 1999a] | vérifiée | [R] |
| [Gregson et al. 2003] | corrigée | [R] |
| [Thom 2003] | vérifiée | [R] |
| [Anderson 1998b] | corrigée | [R] déclaré; règle de seuil confirmée par Anderson et Ratnieks 1999a [T] |
| [Seeley 1995] | corrigée | [R] (table des matières) |
| [Seeley 1989] | non vérifiée | [M]; contenu [à confirmer] |
| [Seeley 1992] | non vérifiée | [M]; contenu [à confirmer]; fig. 7 non vue |
| [Kirchner et Lindauer 1994] | non vérifiée | [M]; contenu [à confirmer] |
| [Kirchner 1993] | corrigée | [M]; contenu [à confirmer] |
| [Nieh 1993] | non vérifiée | [M]; contenu [à confirmer] |
| [Biesmeijer 2003] | corrigée | [M]; « environ la moitié » [à confirmer] |
| [Anderson et Ratnieks 1999b] | non vérifiée | [M]; contenu [à confirmer] |
| [Hart et Ratnieks 2001] | corrigée | [M]; contenu [à confirmer] |
| [Anderson 1998a] | non vérifiée | [S] (thèse non consultée) |
| [Seeley 1994] | corrigée | [M]; contenu [à confirmer] |
| [Seeley 1986] | corrigée | Métadonnées confirmées; valeurs lues par l'intermédiaire de [Edwards et Myerscough 2011] [S] |
| [Seeley et al. 1991] | corrigée | [M]; valeur s_s lue par l'intermédiaire d'Edwards et Myerscough [S] |
| [Seeley et Towne 1992] | corrigée | [M]; valeur f_r lue par l'intermédiaire d'Edwards et Myerscough [S] |
| [Camazine et Sneyd 1991] | corrigée | [M]; valeur f_s lue par l'intermédiaire d'Edwards et Myerscough [S]; [à confirmer] |
| [Beekman et Lew 2008] | vérifiée | Résumé lu par l'audit bio-abeilles; sert QR0 (cadre) |
| [Donaldson-Matasci et Dornhaus 2012] | vérifiée | Résumé lu par l'audit bio-abeilles; sert QR0 (cadre) |

**Files d'attente et ingénierie**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Little 2011] | corrigée | [T] |
| [Little 1961] | vérifiée | [M]; existence confirmée par Little 2011 et Anderson et Ratnieks 1999a |
| [Jacobson et Karels 1988] | vérifiée | [T] |
| [Nichols et al. 2018] | vérifiée | [T] |
| [Cardwell et al. 2022] | vérifiée | [T] partiel |
| [Netflix 2026] | vérifiée | [T] |
| [Reactive Streams 2026] | vérifiée | [T] |
| [Anthropic 2026c] | vérifiée | [T] |

**Méthodes**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Grimm et al. 2020] | corrigée | Référence de méthode (ODD); dossier x-methodes |
| [Axtell et al. 1996] | vérifiée | Référence de méthode (docking); dossier x-methodes |
| [Schuirmann 1987] | vérifiée | Référence de méthode (TOST); dossier x-methodes |
| [Lakens 2017] | vérifiée | Référence de méthode (équivalence); dossier x-methodes |
| [Chambers 2013] | vérifiée | Référence de méthode (rapports enregistrés); dossier x-methodes |
| [Chambers et Tzavella 2022] | vérifiée | Référence de méthode; dossier x-methodes |
| [Gillespie 1976] | vérifiée | Référence de méthode (SSA); dossier x-methodes |
| [Gillespie 1977] | corrigée | Référence de méthode (SSA); dossier x-methodes |

**Cadre et transposition agentique**

| Étiquette | Statut | Lecture |
|---|---|---|
| [Robinson et al. 2005] | vérifiée | Résumé lu par l'audit bio-fourmis (cadre, correction 9) |
| [Dussutour et al. 2004] | vérifiée | Résumé lu par l'audit bio-fourmis (cadre, correction 9) |
| [Kim et al. 2025a] | vérifiée | Lu par l'audit chorégraphie-agentique [S] |
| [Salemi et al. 2025] | vérifiée | Lu par l'audit chorégraphie-agentique [S] |
| [Mao et Mirhoseini 2026] | corrigée | Lu par l'audit chorégraphie-agentique [S] |
| [Garcia-Molina et Salem 1987] | corrigée | [S] audit chorégraphie-agentique |

**Lectures à faire** (aucune valeur reprise pour l'instant) : [Thenius et al. 2008] (apprentissage social fondé sur les délais de file, [M]), [Burd 1996] (serveurs, *Atta*, [M]), [Huang et Seeley 2003] (déchargements multiples, [non vérifiée]).

**Règle de citation.** Une valeur issue d'une référence « non vérifiée » ne se cite qu'avec [à confirmer]. Les références « corrigée » sont citées dans leur version corrigée (bibliographie).


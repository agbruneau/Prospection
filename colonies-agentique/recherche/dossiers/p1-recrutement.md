# Dossier P1 — Recrutement : la piste contre la danse

**Statut :** consolidé après vérification indépendante, 2026-10-01.

Dossier documentaire du Projet 1 de la proposition v3. Rédigé le 2026-10-01. Régime : production (livrable sur lequel le chercheur va agir).

## 0. Méthode et légende

Chaque affirmation porte un niveau de vérification :

- **[T]** texte intégral de la source primaire lu (PDF ou HTML complet);
- **[R]** résumé lu sur une page d'indexation (Europe PMC, Consensus, arXiv, page éditeur), texte intégral non lu;
- **[M]** métadonnées seulement (Crossref, Semantic Scholar) : existence et référence confirmées, contenu non lu;
- **[S]** contenu rapporté par une source secondaire, primaire non lue;
- **[I]** inférence de ma part, ou calcul fait pour ce dossier.

Deux marques complètent la légende : **[à confirmer]** pour une valeur non confirmée à la source, **[non vérifiée]** pour une référence ou un point de référence que la vérification indépendante n'a pas pu confirmer.

Dans le texte, chaque référence est nommée par son étiquette « Nom année » (p. ex. Goss et al. 1989); la section 2 donne la référence complète.

Les lectures de figure (valeurs lues à l'œil sur un PDF numérisé) sont marquées « lecture de figure » avec une incertitude d'environ ±3 points de pourcentage.

Vérification par calcul : `recherche/verifications-numeriques/p1_verif_recrutement.py` réimplante les deux modèles publiés et compare ses sorties aux valeurs publiées (section 4). Pour le relancer : `python p1_verif_recrutement.py`. Le script se termine par des `assert` : état de l'ODE à midi selon le critère C4 (119 ± 3 et 3 ± 1), queues binomiales du tableau de la section 4, classes de la branche tardive.

Limites de la collecte : le budget WebSearch de la session et le quota de l'outil de recherche scientifique ont été épuisés en cours de route. Trois sources clés restent non lues en texte intégral : Deneubourg et al. 1990, Camazine et Sneyd 1991 (J. Theor. Biol.) et Beckers et al. 1990. Voir la section 10.

## 1. Synthèse

1. Les quatre références centrales de v3 existent et sont correctement attribuées. Goss et al. 1989 et Seeley et al. 1991 ont été lus en entier [T].
2. **Fourmis.** Le modèle de Goss et al. 1989 tient en trois équations avec retards : fonction de choix à k = 20 et n = 2, sans évaporation. Ma réimplantation reproduit les histogrammes Monte Carlo publiés (fig. 2a-d) à quelques points près. Le résultat « branche courte ajoutée tard » est confirmé : 2 colonies sur 18 l'adoptent, contre 14 sur 14 quand les deux branches sont offertes ensemble. Cependant, le modèle publié prédit des colonies moins fiables que les vraies : 14/14 n'a qu'environ 2 % de probabilité sous le modèle [I].
3. **Abeilles.** Le modèle publié a 7 compartiments. Ses équations (annexe) et ses paramètres (tableau 2) se trouvent dans Seeley et al. 1991; l'article de Camazine et Sneyd 1991 en est la version détaillée [R]. Ma réintégration reproduit exactement l'état publié à midi (119 et 3 abeilles). Elle **ne reproduit pas** les pentes publiées après l'inversion : j'obtiens +12 et −18 abeilles par 30 min, contre +18 et −30 publiées. Cet écart doit être résolu avant de figer le critère (section 10).
4. **Erreurs de cadrage dans v3.**
   - Dans les deux modèles publiés, c'est l'**intensité** du signal qui pilote l'allocation, pas son contenu symbolique. Le vecteur de la danse n'entre pas dans la fonction de suivi.
   - Le verrouillage des fourmis ne vient pas de la seule persistance. Il découle de la non-linéarité (n = 2), de l'absence d'évaporation à l'échelle de l'expérience et de l'absence de rétroaction négative. Des fourmis à phéromone persistante basculent en environ 10 min quand l'encombrement crée cette rétroaction (Grüter et al. 2012).
   - La danse n'est pas une diffusion pub/sub : les suiveuses tirent une danseuse au hasard.
5. **Comparabilité.** v3 compare une manipulation de longueur chez la fourmi à une manipulation de qualité chez l'abeille. Pour un vrai côte à côte, il faut appliquer les deux manipulations aux deux espèces (section 5, cible C10).

## 2. Références

| Étiquette | Référence complète | DOI / URL | Niveau | Ce qui a été lu |
|---|---|---|---|---|
| Goss et al. 1989 | Goss S, Aron S, Deneubourg JL, Pasteels JM (1989) Self-organized shortcuts in the Argentine ant. *Naturwissenschaften* 76(12):579–581 | 10.1007/BF00462870 ; PDF : https://dipot.ulb.ac.be/dspace/bitstream/2013/19271/1/042GossNaturwissenschaften89.pdf | T | Texte, éq. 1-3, fig. 1-2 |
| Deneubourg et al. 1990 | Deneubourg JL, Aron S, Goss S, Pasteels JM (1990) The self-organizing exploratory pattern of the Argentine ant. *J Insect Behav* 3(2):159–168 | 10.1007/BF01417909 | M (+S) | Métadonnées; rôle confirmé par Goss et al. 1989 (réf. [5] : origine de l'éq. 3) |
| Beckers et al. 1989 | Beckers R, Goss S, Deneubourg JL, Pasteels JM (1989) Colony size, communication and ant foraging strategy. *Psyche* 96(3-4):239–256 | 10.1155/1989/94279 | R | Résumé (98 espèces, 6 stratégies associées à la taille de colonie croissante) |
| Beckers et al. 1990 | Beckers R, Deneubourg JL, Goss S, Pasteels JM (1990) Collective decision making through food recruitment. *Insectes Sociaux* 37(3):258–267 | 10.1007/BF02224053 | R (+S) | Résumé : *L. niger* ne bascule pas vers 1 M si la piste vers 0,1 M est déjà bien développée; *T. caespitum* bascule. Rapporté aussi par Grüter et al. 2012 et Dussutour et al. 2009 |
| Beckers et al. 1992 | Beckers R, Deneubourg JL, Goss S (1992) Trails and U-turns in the selection of a path by the ant *Lasius niger*. *J Theor Biol* 159(4):397–415 | 10.1016/S0022-5193(05)80686-1 | M | — |
| Beckers et al. 1993 | Beckers R, Deneubourg JL, Goss S (1993) Modulation of trail laying in the ant *Lasius niger* (Hymenoptera: Formicidae) and its role in the collective selection of a food source. *J Insect Behav* 6(6):751–759 | 10.1007/BF01201674 | M | — |
| Seeley et al. 1991 | Seeley TD, Camazine S, Sneyd J (1991) Collective decision-making in honey bees: how colonies choose among nectar sources. *Behav Ecol Sociobiol* 28(4):277–290 | 10.1007/BF00175101 ; PDF : http://users.sussex.ac.uk/~ezequiel/iam/Seeley_91.pdf | T | Texte, tableaux 1-2, fig. 1-5, annexe |
| Camazine et Sneyd 1991 | Camazine S, Sneyd J (1991) A model of collective nectar source selection by honey bees: self-organization through simple rules. *J Theor Biol* 149(4):547–571 | 10.1016/S0022-5193(05)80098-0 | R | Résumé seulement |
| Frisch 1967 | von Frisch K (1967) *The Dance Language and Orientation of Bees*. Harvard University Press (rééd. 1993; le DOI est celui de la réédition) | 10.4159/harvard.9780674418776 | M | — |
| Seeley et Towne 1992 | Seeley TD, Towne WF (1992) Tactics of dance choice in honey bees: do foragers compare dances? *Behav Ecol Sociobiol* 30(1):59–69 | 10.1007/BF00168595 | R (+S) | Résumé : les suiveuses ne comparent pas les danses; la part des recrues suit la part des circuits (11 essais). Résultat aussi rapporté par Seeley et al. 1991 (« en préparation ») |
| Seeley 1994 | Seeley TD (1994) Honey bee foragers as sensory units of their colonies. *Behav Ecol Sociobiol* 34(1):51–62 | 10.1007/BF00175458 | R | Résumé |
| Weidenmüller et Seeley 1999 | Weidenmüller A, Seeley TD (1999) Imprecision in waggle dances of the honeybee (*Apis mellifera*) for nearby food sources: error or adaptation? *Behav Ecol Sociobiol* 46(3):190–199 | 10.1007/s002650050609 | R | Résumé |
| Gardner et al. 2007 | Gardner KE, Seeley TD, Calderone NW (2007) Hypotheses on the adaptiveness or non-adaptiveness of the directional imprecision in the honey bee's waggle dance (Hymenoptera: Apidae: *Apis mellifera*). *Entomol Gen* 29(2-4):285–298 | 10.1127/entom.gen/29/2007/285 | R | Résumé (572 danses, 10 distances) |
| Okada et al. 2014 | Okada R, Ikeno H, Kimura T, Ohashi M, Aonuma H, Ito E (2014) Error in the honeybee waggle dance improves foraging flexibility. *Sci Rep* 4:4175 | 10.1038/srep04175 ; PMC3935192 | T (via outil, partiel) | Résumé et texte PMC, résumé par l'outil de lecture; résultats sur les seuils d'erreur relus à la vérification |
| Esch et al. 2001 | Esch HE, Zhang S, Srinivasan MV, Tautz J (2001) Honeybee dances communicate distances measured by optic flow. *Nature* 411(6837):581–583 | 10.1038/35079072 | R | Résumé |
| Schürch et al. 2016 | Schürch R, Ratnieks FLW, Samuelson EEW, Couvillon MJ (2016) Dancing to her own beat: honey bee foragers communicate via individually calibrated waggle dances. *J Exp Biol* 219(9):1287–1289 | 10.1242/jeb.134874 | R | Résumé |
| Kohl et Rutschmann 2021 | Kohl PL, Rutschmann B (2021) Honey bees communicate distance via non-linear waggle duration functions. *PeerJ* 9:e11187 | 10.7717/peerj.11187 ; PMC8029670 | T (via outil) | Tableau 2, équations |
| Biesmeijer et Seeley 2005 | Biesmeijer JC, Seeley TD (2005) The use of waggle dance information by honey bees throughout their foraging careers. *Behav Ecol Sociobiol* 59(1):133–142 | 10.1007/s00265-005-0019-6 | R | Résumé |
| Sherman et Visscher 2002 | Sherman G, Visscher PK (2002) Honeybee colonies achieve fitness through dancing. *Nature* 419:920–922 | 10.1038/nature01127 | R | Résumé |
| I'Anson Price et al. 2019 | I'Anson Price R, Dulex N, Vial N, Vincent C, Grüter C (2019) Honeybees forage more successfully without the "dance language" in challenging environments. *Sci Adv* 5(2):eaat0450 | 10.1126/sciadv.aat0450 | R | Résumé |
| Granovskiy et al. 2012 | Granovskiy B, Latty T, Duncan M, Sumpter DJT, Beekman M (2012) How dancing honey bees keep track of changes: the role of inspector bees. *Behav Ecol* 23(3):588–596 | 10.1093/beheco/ars002 | T (via outil) | PDF OUP, résumé par l'outil |
| Grüter et al. 2012 | Grüter C, Schürch R, Czaczkes TJ, Taylor K, Durance T, Jones SM, Ratnieks FLW (2012) Negative feedback enables fast and flexible collective decision-making in ants. *PLoS ONE* 7(9):e44501 | 10.1371/journal.pone.0044501 | T (via outil) | Texte HTML, fig. 3 |
| Dussutour et al. 2009 | Dussutour A, Beekman M, Nicolis SC, Meyer B (2009) Noise improves collective decision-making by ants in dynamic environments. *Proc R Soc B* 276:4353–4361 | 10.1098/rspb.2009.1235 ; PMC2817102 | T (via outil) | Résumé, méthodes et paramètres cités mot à mot; α = 2 confirmé; **unité de temps de ρ non vérifiée [à confirmer]** |
| Czaczkes et al. 2015 | Czaczkes TJ, Grüter C, Ratnieks FLW (2015) Trail pheromones: an integrative view of their role in social insect colony organization. *Annu Rev Entomol* 60:581–599 | 10.1146/annurev-ento-010814-020627 | R | Résumé (plusieurs phéromones aux fonctions différentes; complémentarité avec la mémoire individuelle); **persistances différentes des phéromones : [non vérifiée]** |
| Deneubourg et al. 1983 | Deneubourg JL, Pasteels JM, Verhaeghe JC (1983) Probabilistic behaviour in ants: a strategy of errors? *J Theor Biol* 105(2):259–271 | 10.1016/S0022-5193(83)80007-1 | M | — |
| Deneubourg et al. 1986 | Deneubourg JL, Aron S, Goss S, Pasteels JM, Duerinck G (1986) Random behaviour, amplification processes and number of participants: how they contribute to the foraging properties of ants. *Physica D* 22(1-3):176–186 | 10.1016/0167-2789(86)90239-3 | M (+S) | Métadonnées; contenu rapporté par un résumé Consensus [S], résumé non retrouvé par la vérification |
| Nicolis et Deneubourg 1999 | Nicolis SC, Deneubourg JL (1999) Emerging patterns and food recruitment in ants: an analytical study. *J Theor Biol* 198:575–592 | 10.1006/jtbi.1999.0934 | R | Résumé |
| Sumpter et Pratt 2003 | Sumpter DJT, Pratt SC (2003) A modelling framework for understanding social insect foraging. *Behav Ecol Sociobiol* 53(3):131–144 | 10.1007/s00265-002-0549-0 | R | Résumé |
| Detrain et Deneubourg 2008 | Detrain C, Deneubourg JL (2008) Collective decision-making and foraging patterns in ants and honeybees. *Adv Insect Physiol* 35:123–173 | 10.1016/S0065-2806(08)00002-7 | M | — |
| Beekman et al. 2001 | Beekman M, Sumpter DJT, Ratnieks FLW (2001) Phase transition between disordered and ordered foraging in Pharaoh's ants. *PNAS* 98:9703–9706 | 10.1073/pnas.161285298 | R | Résumé |
| Planqué et al. 2010 | Planqué R, van den Berg JB, Franks NR (2010) Recruitment strategies and colony size in ants. *PLoS ONE* 5(8):e11664 | 10.1371/journal.pone.0011664 | R | Résumé |
| Lanan 2014 | Lanan M (2014) Spatiotemporal resource distribution and foraging strategies of ants (Hymenoptera: Formicidae). *Myrmecological News* 20:53–70 | 10.25849/myrmecol.news_020:053 | R | Résumé (402 espèces) |
| Seeley 2012 | Seeley TD (2012; en ligne 2011) Progress in understanding how the waggle dance improves the foraging efficiency of honey bee colonies. In : Galizia CG, Eisenhardt D, Giurfa M (dir.) *Honeybee Neurobiology and Behavior*. Springer, Dordrecht, p. 77–87 | 10.1007/978-94-007-2099-2_7 | R | Résumé |
| Theraulaz et Bonabeau 1999 | Theraulaz G, Bonabeau E (1999) A brief history of stigmergy. *Artificial Life* 5:97–116 | 10.1162/106454699568700 | R | Résumé |
| Heylighen 2016 | Heylighen F (2016) Stigmergy as a universal coordination mechanism I: Definition and components. *Cognitive Systems Research* 38:4–13 | 10.1016/j.cogsys.2015.12.002 | M | — |
| Peltz 2003 | Peltz C (2003) Web services orchestration and choreography. *Computer* 36(10):46–52 | 10.1109/MC.2003.1236471 | M | — |
| Han et Zhang 2025 | Han B, Zhang S (2025) Exploring Advanced LLM Multi-Agent Systems Based on Blackboard Architecture. arXiv:2507.01701 | https://arxiv.org/abs/2507.01701 | R | Résumé |
| Jimenez-Romero et al. 2025 | Jimenez-Romero C, Yegenoglu A, Blum C (2025) Multi-agent systems powered by large language models: applications in swarm intelligence. *Front Artif Intell* 8:1593017 | 10.3389/frai.2025.1593017 | T (via outil) | Texte HTML, fig. 3-6 |
| Han et al. 2026 | Han C, Tan J, Yu B, Zheng W, Tang X (2026) Conformity Dynamics in LLM Multi-Agent Systems: The Roles of Topology and Self-Social Weighting. arXiv:2601.05606 | https://arxiv.org/abs/2601.05606 | R | Résumé |
| Choi et al. 2025 | Choi M, Kim K, Chae S, Baek S (2025) An Empirical Study of Group Conformity in Multi-Agent Systems. arXiv:2506.01332 | https://arxiv.org/abs/2506.01332 | R | Résumé (via l'API arXiv) |

### 2.1 Références citées par l'entremise d'une autre source (œuvres non consultées)

| Étiquette | Référence complète | DOI / URL | Niveau | Origine de la citation |
|---|---|---|---|---|
| Van Vorhis Key et Baker 1982 | Van Vorhis Key SE, Baker TC (1982) Trail-following responses of the Argentine ant, *Iridomyrmex humilis* (Mayr), to a synthetic trail pheromone component and analogs. *J Chem Ecol* 8(1):3–14 | 10.1007/bf00984000 | M (+S) | Réf. [4] de Goss et al. 1989 [T] (« J. Chem. Ecol. 8, 3 »); métadonnées retrouvées dans Crossref; durée de vie de la phéromone (≈ 30 min) rapportée par Goss et al. 1989 [S] |
| Seeley et Visscher 1988 | Seeley TD, Visscher PK (1988) Assessing the benefits of cooperation in honeybee foraging: search costs, forage quality, and competitive ability. *Behav Ecol Sociobiol* 22(4):229–237 | 10.1007/bf00299837 | M (+S) | Liste de références de Seeley et al. 1991 [T]; valeur de 121 min rapportée par Seeley et al. 1991 [S] |
| Hayek 1945 | Hayek FA (1945) The use of knowledge in society. *Am Econ Rev* 35:519–530 | — | S | Liste de références de Seeley et al. 1991 [T]; œuvre non consultée |
| Simon 1981 | Simon HA (1981) *The sciences of the artificial*, 2nd edn. MIT Press, Cambridge | — | S | Liste de références de Seeley et al. 1991 [T]; œuvre non consultée |
| Haldane et Spurway 1954 | Haldane JBS, Spurway H (1954) A statistical analysis of communication in "Apis mellifera" and a comparison with communication in other animals. *Insectes Sociaux* 1:247–283 | 10.1007/bf02222949 | M | **[non vérifiée]** : métadonnées retrouvées dans Crossref à la consolidation; l'estimation du contenu informationnel de la danse (section 10, point 7) n'est pas vérifiée |

Note taxonomique [S] : l'*Iridomyrmex humilis* de Goss et Deneubourg est aujourd'hui *Linepithema humile*, la fourmi d'Argentine (titres récents, p. ex. PLoS Comput Biol 2012; source exacte non identifiée [à confirmer]).

## 3. Modèles, équations et paramètres publiés

### 3.1 Pont à deux branches — Goss et al. 1989 [T]

Emplacement : p. 579-580, éq. (1)-(3); fig. 1 (dispositif) et fig. 2 (résultats).

**Dispositif.** Le pont compte deux modules identiques en série. Chaque module a une branche courte et une branche longue, chacune à 30° de l'axe. Le module mesure 12,5 cm (fig. 1a). r est le rapport longueur longue / longueur courte, testé à r ∈ {1 ; 1,4 ; 2}.

**Équations moyennes** (S_j : phéromone sur la branche courte au point de choix j; L_j : phéromone sur la branche longue au point j; j = 1 côté nid, j = 2 côté nourriture; j′ est le point opposé) :

```
dS_j/dt = Φ·p_{s,j'}(t − 20) + Φ·p_{s,j}(t)          (1)
dL_j/dt = Φ·p_{l,j'}(t − 20r) + Φ·p_{l,j}(t)         (2)
p_{s,j} = (20 + S_j)² / [(20 + S_j)² + (20 + L_j)²]   (3)   avec p_{s,j} + p_{l,j} = 1
```

| Paramètre | Valeur | Emplacement |
|---|---|---|
| Φ (flux par direction) | 0,5 fourmi/s dans les simulations Monte Carlo | légende fig. 2 |
| Temps de traversée de la branche courte | ≈ 20 s; branche longue : 20r s | p. 580 |
| k (attractivité d'une branche non marquée) | 20 | éq. 3 |
| n (non-linéarité) | 2 | éq. 3 |
| Dépôt | 1 unité par fourmi, **dans les deux sens** (aller et retour) | p. 579 |
| Évaporation | négligée; durée de vie moyenne de la phéromone ≈ 30 min, du même ordre que l'expérience | p. 580 (cite Van Vorhis Key et Baker 1982 [S]) |
| Comptage | trafic du 501e au 1000e passage (ΣΦ = 500); 1000 simulations par condition | légende fig. 2 |
| Branche tardive (simulation) | branche courte ajoutée après le 1000e passage; comptage du 1501e au 2000e | fig. 2d |

**Attention.** Le « 20 » des retards (secondes) et le k = 20 (unités de phéromone) sont deux grandeurs distinctes. Leur égalité est une coïncidence.

**Trois prédictions publiées** (p. 580) :

1. La probabilité de choisir la branche courte croît avec r.
2. Une branche courte ajoutée après l'établissement de la piste n'est pas adoptée, à cause de l'irréversibilité de la rétroaction positive.
3. Si les ouvrières ne marquent qu'au retour, la colonie ne peut pas sélectionner la branche courte plus souvent que la longue. Cette prédiction était « en cours de test » en 1989.

### 3.2 Fonction de choix de Deneubourg — forme générale [M + T via Goss et al. 1989]

`P_A = (k + A)^n / [(k + A)^n + (k + B)^n]`

- La forme et les valeurs k = 20, n = 2 viennent de « notre étude expérimentale précédente [5] » : un choix entre deux branches **égales** lors d'un recrutement exploratoire (Goss et al. 1989, p. 580). La référence [5] est Deneubourg et al. 1990, alors sous presse [T]. Le texte de 1990 n'a pas été lu : la valeur k = 20 y est [à confirmer] (cadre, section 10).
- La méthode d'estimation de k et n n'a pas été lue (texte non consulté) [M].
- Lecture des paramètres [I] : k fixe le seuil de pheromone en dessous duquel le choix reste presque aléatoire; n > 1 rend le choix plus que proportionnel, donc amplificateur. C'est n qui crée la bistabilité et le verrouillage.
- Variante à ne pas confondre : Dussutour et al. 2009 emploient une forme différente, `p_i = c_i^α / (k + c_i^α + c_j^α)`, avec α = 2 (« as fitted to experiments ») et k = 12, ce dernier issu d'une recherche paramétrique en grille au sens des moindres carrés sur les fig. 2-3 [T via outil].

### 3.3 Modèle à 7 compartiments — Seeley et al. 1991 (Camazine et Sneyd 1991) [T]

Emplacement : Seeley et al. 1991, p. 283-286 (structure), fig. 4 (schéma), tableau 2 (paramètres), annexe p. 290 (équations). L'annexe renvoie à Camazine et Sneyd 1991 pour la « discussion détaillée ».

**Compartiments** : H_A et H_B (en déchargement), D_A et D_B (danse pour A ou B, temps de retour inclus), A et B (à la source), F (suiveuses). A est la source à 2,50 mol/l, B celle à 0,75 mol/l.

**Équations (annexe)** :

```
dA/dt  = (1 − f_d^A)(1 − f_x^A) p1 H_A + p2 D_A + f_l^A p4 F − p3 A
dD_A/dt = f_d^A (1 − f_x^A) p1 H_A − p2 D_A
dH_A/dt = p3 A − p1 H_A
dF/dt  = f_x^A p1 H_A + f_x^B p5 H_B − p4 F
dB/dt  = (1 − f_d^B)(1 − f_x^B) p5 H_B + p6 D_B + f_l^B p4 F − p7 B
dD_B/dt = f_d^B (1 − f_x^B) p5 H_B − p6 D_B
dH_B/dt = p7 B − p5 H_B
```

**Fonction de suivi** (texte p. 285-286; formalisation [I]) : `f_l^A = τ_A·D_A / (τ_A·D_A + τ_B·D_B)` et `f_l^B = 1 − f_l^A`. τ_i est la fraction du temps passé en D_i à danser réellement. L'hypothèse sous-jacente : les suiveuses suivent la première danseuse rencontrée, et les rencontres sont aléatoires (Seeley et Towne 1992, alors en préparation).

**Tableau 2** (p_i = 1/T_i) :

| Paramètre | Valeur | Source citée par les auteurs |
|---|---|---|
| T1 (déchargement → départ, A) | 1,0 min | tableau 1 |
| T2 (danse → butinage, A) | 1,5 min | tableau 1 |
| T3 (butinage → déchargement, A) | 2,5 min | tableau 1 |
| T4 (suivi de danses → butinage, A et B) | 60 min | Seeley et Visscher 1988 (121 min mesurées pour des sources à 1600 m; réduit à 60 car les mangeoires sont à 400 m) |
| T5 (déchargement → départ, B) | 3,0 min | tableau 1 |
| T6 (danse → butinage, B) | 2,0 min | tableau 1 |
| T7 (butinage → déchargement, B) | 3,5 min | tableau 1 |
| f_x^A (abandon par voyage, A) | 0,00 | tableau 1 |
| f_x^B (abandon par voyage, B) | 0,04 | (1 − p)^5 = 0,80 en 30 min |
| f_d^A (probabilité de danser, A) | 1,00 | tableau 1 (extrapolé) |
| f_d^B (probabilité de danser, B) | 0,15 | tableau 1 |
| τ_A, τ_B | 0,38 ; 0,02 | 14 et 1 circuits × 2,4 s par circuit (400 m), divisés par T2 = 90 s et T6 = 120 s (p. 286) |
| Conditions initiales | A = B = 11, D_A = D_B = 1, H_A = H_B = 0, F = 101 (total 125) | p. 286 |

**Hypothèses du modèle** (trois premières : p. 285; seuils fixes : p. 284) : effectif de butineuses fixe, départ simultané, deux sources seulement, seuils de réponse fixes (pas d'ajustement à l'état de la colonie).

**Données individuelles utiles pour une fonction qualité → comportement continue** (tableau 1, mangeoire de la colonie expérimentale) :

| Sucrose (mol/l) | 2,00 | 1,50 | 1,00 | 0,50 |
|---|---|---|---|---|
| Probabilité de revenir à la mangeoire | 1,00 | 1,00 | 1,00 | 0,60 |
| Tempo (voyages/abeille/30 min) | 6,1 | 6,2 | 6,0 | 3,9 |
| Probabilité de danser | 0,80 | 0,59 | 0,26 | 0,00 |
| Circuits par retour | 9,8 ± 15,4 | 5,4 ± 4,9 | 1,6 ± 3,9 | 0,0 |
| Recrues par 15 min | 10,3 ± 5,4 | 5,6 ± 4,0 | 2,2 ± 1,6 | 0,0 |

### 3.4 Encodage et bruit de la danse frétillante

- **Direction.** L'angle de la course frétillante par rapport à la verticale encode l'angle entre la source et l'azimut solaire (Frisch 1967 [M]; principe décrit dans tous les résumés lus [R]).
- **Distance.** La danse encode le flux optique cumulé (l'« image motion ») plutôt que la distance absolue. Les recrues cherchent à la distance « perçue » (Esch et al. 2001 [R]).
- **Calibration non linéaire** (Kohl et Rutschmann 2021, tableau 2 [T via outil]; *A. m. carnica*, 0,1-1,7 km; t_w en s, d en km) :
  - modèle non linéaire : `t_w = 0,1993 + (2,0018/0,6717)·(1 − e^(−0,6717·d))`;
  - modèle segmenté : `t_w = 0,2917 + 1,4282·d` pour d ≤ 1,0328 km, puis `t_w = 1,0767 + 0,6683·d`;
  - le retour suit une loi linéaire : `t_r = 1,3712 + 0,5238·d`.
  - Ordre de grandeur [I] : environ 1,4 s de course frétillante par km jusqu'à 1 km, environ 0,7 s/km au-delà.
- **Variabilité individuelle.** Chaque abeille a sa propre calibration (pente et ordonnée). L'écart de compréhension entre danseuse et recrue peut atteindre environ 50 % (Schürch et al. 2016 [R]).
- **Bruit directionnel.**
  - Erreur typique de 10-15° (Okada et al. 2014). Environ 85 % des courses sont à moins de 15° (304 sur 358); l'erreur diminue avec la distance (fig. 2e) [T via outil].
  - L'imprécision pour les sources proches serait « accordée » : les danses pour un site de nid proche (cible ponctuelle) sont plus précises que celles pour une mangeoire équidistante, résultat répété dans 4 colonies (Weidenmüller et Seeley 1999 [R]). Gardner et al. 2007 [R] rejettent les deux hypothèses de contrainte (retour bref, frétillement bref) et appuient l'hypothèse adaptative.
- **Intensité.** Le nombre de courses frétillantes par danse croît linéairement avec l'efficacité énergétique du butinage, avec des seuils et des pentes qui varient d'une abeille à l'autre. Les danses pour différentes sources sont mélangées sur la piste de danse, de sorte qu'une suiveuse en tire un échantillon aléatoire (Seeley 1994 [R]).

### 3.5 Modèles de la flexibilité (fourmis)

- **Dussutour et al. 2009** [T via outil, citations mot à mot].
  - Équation de la phéromone : `dc_i/dt = p_i·Φ·q_i − ρ·c_i`.
  - Version stochastique d'Itô : `dc_i = [p_i Φ q_i − ρ c_i] dt + σ dW_i`.
  - Paramètres ajustés par recherche paramétrique en grille (moindres carrés) sur les fig. 2-3 : « k = 12, q_1 = 0.09, q_2 = 0.13 and ρ = 0.00085 ». α = 2 est confirmé. L'unité de temps de ρ n'est pas énoncée dans les passages lus [à confirmer].
  - Le flux Φ diminue linéairement de 100 % à 50 % entre t = 60 et t = 120 min (le texte donne cette réduction comme une borne supérieure).
- **Grüter et al. 2012** [T via outil]. L'encombrement à la mangeoire (nombre de trous d'accès) est une rétroaction négative. Les auteurs observent des colonies de *L. niger* qui basculent en environ 10 min, alors que la phéromone de cette espèce persiste au moins 40-60 min.

## 4. Vérification par réimplantation (calculs pour ce dossier) [I]

Script : `recherche/verifications-numeriques/p1_verif_recrutement.py`, en Python, bibliothèque standard seulement. Il intègre l'ODE des abeilles par RK4 (dt = 0,01 min) et fait le Monte Carlo du pont : arrivées de Bernoulli à 0,5 par seconde et par côté, dépôt au point de choix d'entrée, puis au point opposé à l'arrivée.

**Fourmis** (1000 simulations par condition; % de simulations par classe de « % du trafic sur la branche courte », classes 0-20, 20-40, 40-60, 60-80 et 80-100 %) :

| Condition | Publié (lecture de fig. 2) | Réimplantation |
|---|---|---|
| a) r = 1 | ≈ 37 / 9 / 8 / 7 / 39 | 37 / 10 / 7 / 7 / 39 |
| b) r = 1,4 | ≈ 23 / 10 / 8 / 10 / 49 | 23 / 8 / 5 / 14 / 50 |
| c) r = 2 | ≈ 15 / 6 / 6 / 7 / 66 | 17 / 5 / 6 / 7 / 64 |
| d) r = 2, branche tardive | ≈ 100 / 0 / 0 / 0 / 0 | 100 / 0 / 0 / 0 / 0 |

Le modèle publié est reproduit. Sous ce modèle, la probabilité qu'une colonie mette la majorité de son trafic sur la branche courte vaut (dernière colonne : queue binomiale du côté de l'écart observé, recalculée dans le script) :

| Condition | Probabilité sous le modèle | Observé dans les expériences | Probabilité d'un résultat aussi extrême |
|---|---|---|---|
| r = 1 | 0,52 | 12/26 | 0,56 (bilatérale, méthode des probabilités minimales); 0,69 par doublement de la queue inférieure P(X ≤ 12) = 0,34. La queue supérieure P(X ≥ 12) = 0,79 ne mesure pas un écart : 12 est sous l'espérance (13,5) |
| r = 1,4 | 0,62 | 15/18 | 0,047 (P(X ≥ 15), p = 0,62 arrondi) |
| r = 2 | 0,75 | 14/14 | 0,018 (0,75^14) |
| r = 2, branche tardive | 0,00 | 2/18 | — |

Les vraies colonies sont donc **plus fiables** que le modèle à Φ = 0,5 pour r = 1,4 (à la limite du seuil unilatéral de 5 %) et pour r = 2. Les auteurs ne revendiquent qu'un accord qualitatif. Plusieurs hypothèses peuvent expliquer l'écart : un trafic réel plus élevé (ΣΦ de 407 à 912 en 10 min pour r = 2), la mémoire individuelle ou les demi-tours (Beckers et al. 1992).

**Abeilles** (Φ ne s'applique pas ici; taille de groupe = A + D + H, selon la légende de la fig. 5; inversion à midi par permutation des états) :

| Grandeur | Publié | Réintégration (tableau 2) |
|---|---|---|
| Groupe de la source riche simulée (sud) à midi | 119 | 118,7 |
| Groupe de la source pauvre simulée (nord) à midi | 3 | 3,0 |
| Pente maximale de croissance au nord après l'inversion | +18 abeilles/30 min (sim.), +34 (terrain) | **+12,2** |
| Pente maximale de décroissance au sud | −30 abeilles/30 min (sim.), −19 (terrain) | **−18,2** |
| Croisement des courbes nord et sud | ≈ 1,5-2 h après l'inversion (lecture de la fig. 5) | 147 min |
| Taille de groupe à 16 h (nord / sud) | ≈ 100+ / ≈ 10 (lecture de la fig. 5) | 80,4 / 29,5 |

Avec les valeurs du tableau 2, l'état à midi est reproduit exactement, mais pas la dynamique après l'inversion.

J'ai testé la sensibilité. Avec f_x^B ≈ 0,07-0,08, on retrouve +18 et −30, mais l'état à midi passe à environ 1 abeille au nord au lieu de 3. Aucun réglage unique de f_x^B ne satisfait les deux contraintes. Il faut lire Camazine et Sneyd 1991 (JTB) pour trancher. Trois hypothèses restent possibles : une fonction d'abandon différente, une définition différente de la pente (comptage par demi-heure comme sur le terrain) ou des paramètres modifiés pour l'après-midi.

## 5. Résultats cibles et critères d'acceptation

Convention : chaque critère précise la grandeur mesurée, la valeur publiée, la tolérance et le nombre de répétitions.

| # | Espèce | Résultat publié | Critère d'acceptation | Source |
|---|---|---|---|---|
| C1 | Fourmi | Histogrammes Monte Carlo de la fig. 2a-c | Grandeur : % du trafic courte, passages 501-1000, Φ = 0,5 /s, k = 20, n = 2, ρ = 0, dépôt dans les deux sens, retards 20 s et 20r s. 1000 simulations par r ∈ {1 ; 1,4 ; 2}. Critère : chaque classe à ±5 points de la lecture publiée (lecture ±3, erreur Monte Carlo ≈ 1,5). Statut : atteint (section 4) | Goss et al. 1989 |
| C2 | Fourmi | Branche courte tardive : la colonie reste sur la longue (fig. 2d) | Courte ajoutée au 1000e passage, comptage 1501-2000, 1000 simulations. Critère : au moins 95 % des simulations dans la classe 0-20 %. Statut : atteint (100 %) | Goss et al. 1989 |
| C3 | Fourmi | Expériences sur 11 colonies : 12/26 (r = 1), 15/18 (r = 1,4), 14/14 (r = 2), 2/18 (tardive) | Critère ordinal : P(court majoritaire) croissante en r, et P(tardive) < 0,2 × P(r = 2), sur au moins 1000 simulations. Un critère statistique strict (observé dans l'intervalle à 95 % du modèle) **échoue**, au sens unilatéral, pour r = 1,4 (P = 0,047, à la limite) et r = 2 (P = 0,018) avec le modèle publié (section 4); avec un intervalle bilatéral à 95 %, seul r = 2 échouerait [I]. Il ne doit donc pas servir de critère d'acceptation sans mécanisme supplémentaire | Goss et al. 1989 |
| C4 | Abeille | État simulé à midi : 119 abeilles sur la riche, 3 sur la pauvre | ODE du tableau 2, conditions initiales publiées, à t = 240 min. Critère : riche à 119 ± 3 et pauvre à 3 ± 1. Déterministe, une seule intégration (dt ≤ 0,05 min; vérifier la stabilité à dt/2). Statut : atteint (118,7 et 3,0; assertion du script alignée sur ce critère) | Seeley et al. 1991 |
| C5 | Abeille | Réallocation après l'inversion (fig. 5) : pentes simulées +18 et −30 par 30 min | Critère provisoire : la nouvelle riche dépasse l'ancienne en moins de 180 min, et le rapport riche/pauvre à 16 h est d'au moins 2,5. Critère définitif (pentes ±20 %) **suspendu** tant que l'écart de la section 4 n'est pas résolu | Seeley et al. 1991, Camazine et Sneyd 1991 |
| C6 | Abeille | Terrain, fig. 1 : 19 juin, midi nord 12 / sud 91, 16 h 121 / 10; 20 juin, midi 92 / 24, 16 h 13 / 107 | Version agent (N = 125, stochastique), 100 répétitions. Critère : à 16 h, la source riche porte au moins 70 % des engagées dans au moins 95 % des répétitions. Les effectifs absolus du terrain ne sont pas des cibles (colonie de ≈ 4200 abeilles, recrutement non simultané, nord à 1,00 M le matin). Note : le texte de Seeley et al. 1991 (p. 286) donne 90 abeilles au sud à midi, la fig. 1 en indique 91; C6 retient la fig. 1 | Seeley et al. 1991 |
| C7 | Abeille | Erreur de danse, simulations d'Okada et al. 2014 : erreur ≤ 10°, danse bénéfique dans toutes les conditions testées; 15°, bénéfique seulement quand les sources sont rares; ≥ 30°, aucun bénéfice; 0-5°, grand succès pour trouver les mangeoires mais échecs à en trouver de nouvelles | **Reproduction** sur les seuils publiés. Version agent avec σ ∈ {0, 5, 10, 15, 30, 60}°, 1000 abeilles, 2, 5, 7 ou 10 mangeoires de 400 à 2000 m (protocole publié : 20 simulations par condition; ici au moins 50 répétitions par σ). Critère ordinal : gain sur une colonie sans danse positif dans toutes les conditions pour σ ≤ 10°, positif seulement avec sources rares pour σ = 15°, nul ou négatif dès σ ≥ 30°. **Extension, non reproduction :** un « indice de bascule maximal pour σ ∈ [10, 15]° » n'est pas un résultat publié; à présenter comme contribution. Le protocole iMoAD-f exact doit être relu avant de fixer des seuils numériques | Okada et al. 2014 |
| C8 | Fourmi | La rétroaction négative par encombrement rend la bascule rapide : 1 contre 3 trous, bascule en ≈ 10 min (fig. 3A); 9 contre 27 trous, pas de bascule (fig. 3C) | Modèle avec un plafond de débit par source. Critère : temps médian de bascule ≤ 20 min en forte contrainte, absence de bascule (moins de 50 % sur la nouvelle source après 60 min) en faible contrainte; au moins 100 répétitions | Grüter et al. 2012 |
| C9 | Fourmi | Environnement dynamique, *P. megacephala*, 21 réplicats : 21/21 courte (phase 1), 18/21 se replient sur la longue (branche courte bloquée), 16/21 reviennent à la courte (dernières 30 min) | Équation différentielle stochastique de Dussutour et al. 2009 (k = 12, q1 = 0,09, q2 = 0,13, ρ = 0,00085 [unité à confirmer], α = 2, σ à étalonner). 21 réplicats × 100 lots. Critère : les trois comptes observés dans l'intervalle à 95 % du modèle. Prérequis : confirmer l'unité de ρ | Dussutour et al. 2009 |
| C10 | Les deux (nouveau) | **Aucun résultat publié** | Même manipulation pour les deux espèces : (a) inversion de qualité; (b) meilleure option ajoutée tard. Mesure commune : part de l'effort sur la meilleure option en fonction du temps depuis le changement, 100 répétitions. Ce sera une prédiction, pas une reproduction : à présenter comme une contribution | — |

## 6. Signal persistant ou éphémère : compromis flexibilité et stabilité

**Ce qui est établi dans les sources lues :**

- **Verrouillage chez les fourmis.**
  - *I. humilis* : branche courte tardive adoptée 2 fois sur 18 (Goss et al. 1989 [T]).
  - *L. niger* : la colonie ne bascule pas vers une source de 1 M quand la piste vers 0,1 M est déjà bien développée, alors que *T. caespitum* bascule (Beckers et al. 1990 [R], rapporté aussi par Grüter et al. 2012 et Dussutour et al. 2009).
  - Le modèle publié explique ce verrouillage par l'irréversibilité de la rétroaction positive à évaporation négligeable.
- **Flexibilité chez les abeilles.** La colonie suit la source la plus riche à chaque inversion (Seeley et al. 1991 [T]). Le mécanisme revendiqué est une « sélection naturelle entre sources » : les butineuses des bonnes sources « survivent » (n'abandonnent pas) et « se reproduisent » (recrutent). Aucune comparaison entre sources n'a lieu : seulement 2 abeilles sur 117 ont visité les deux mangeoires.
- **La persistance n'est pas seule en cause.**
  - L'encombrement rétablit la flexibilité malgré une phéromone persistante (Grüter et al. 2012 [T]).
  - Le bruit aide *P. megacephala* à suivre les changements; les auteurs relient la différence avec *L. niger* au caractère durable de ses ressources, des colonies de pucerons (Dussutour et al. 2009 [T]).
  - L'erreur individuelle de suivi de piste serait une stratégie (Deneubourg et al. 1983 [M], titre; Deneubourg et al. 1986 [S]).
  - Les pistes peuvent combiner plusieurs phéromones aux fonctions différentes, et interagissent avec la mémoire individuelle (Czaczkes et al. 2015 [R]).
- **Chez l'abeille, la mémoire individuelle complète le signal éphémère.** Les inspectrices assurent la réponse rapide aux changements, la danse la réponse lente (Granovskiy et al. 2012 [T via outil]). Entre 75 et 88 % des suivis de danse servent à la réactivation ou à la confirmation, et non à la découverte (Biesmeijer et Seeley 2005 [R]).
- **La précision coûte de la flexibilité.** Dans les simulations d'Okada et al. 2014, une erreur de 0-5° donne un grand succès pour trouver les mangeoires, mais aussi des échecs à en trouver de nouvelles; la danse reste bénéfique pour une erreur ≤ 10° dans toutes les conditions testées, à 15° seulement quand les sources sont rares, et plus du tout à 30° ou plus [T via outil, partiel]. L'imprécision est accordée (Weidenmüller et Seeley 1999).
- **La valeur de la danse dépend de l'environnement.**
  - Bénéfice net aux mangeoires de sirop avec les danses orientées; aux sources naturelles, l'information directionnelle augmente parfois la récolte, sinon elle ne change rien (Sherman et Visscher 2002 [R]).
  - Bénéfice quand les sources sont difficiles à trouver, variables et éphémères (Seeley 2012 [R]).
  - Désavantage dans des milieux « difficiles » modifiés par l'humain (I'Anson Price et al. 2019 [R]).
- **Écologie comparée.** Les stratégies de recrutement s'associent à la taille de colonie (Beckers et al. 1989 [R], Planqué et al. 2010 [R]). Elles s'associent aussi à la distribution spatiotemporelle des ressources : les réseaux de pistes à long terme correspondent à des distributions de ressources particulières (que ces ressources soient durables est une inférence [I]) (Lanan 2014 [R]).
- **Non-linéarité et seuils.**
  - Multistabilité de l'exploitation selon les conditions, sans changement du comportement individuel (Nicolis et Deneubourg 1999 [R]).
  - Transition de phase avec hystérésis selon la taille de colonie (Beekman et al. 2001 [R]).
  - Un cadre unifié traite la piste et la danse comme des fonctions de taux de recrutement (Sumpter et Pratt 2003 [R]).

**Ce que j'infère [I]** :

1. Le compromis que v3 attribue au canal (persistant contre éphémère) se décompose en au moins trois leviers indépendants : la persistance (ρ), la non-linéarité de la réponse (n; linéaire chez l'abeille dans le modèle publié, où f_l est proportionnel au temps de danse) et la rétroaction négative locale (abandon f_x, encombrement).
2. Le modèle abeille n'a pas d'« évaporation » : l'oubli y passe par l'abandon individuel conditionné à la qualité.
3. Une page interactive gagnerait à séparer ces trois curseurs plutôt qu'à opposer deux espèces « en bloc ».
4. La lecture précédente doit être confrontée à Sumpter et Pratt 2003 et Detrain et Deneubourg 2008 (non lus en texte intégral), qui traitent explicitement la comparaison fourmis-abeilles.

## 7. Visuels de vulgarisation

| # | Visuel | Concept | Appui |
|---|---|---|---|
| V1 | « Le pont qui se souvient » : le pont de la fig. 1 animé, avec un histogramme Monte Carlo qui se remplit en direct par-dessus les barres publiées (fig. 2a-d). Curseurs r, k, n, Φ, ρ; interrupteur « marquage aller-retour / retour seulement » (prédiction 3); bouton « ajouter la branche courte maintenant » | Amplification et effet du retard; verrouillage | Goss et al. 1989 |
| V2 | « La loupe de la fonction de choix » : P_A en fonction de A à B fixe, pour une famille n ∈ {1, 2, 3} et k ∈ {5, 20, 50} | k agit comme un seuil d'attention, n comme la force du conformisme | Goss et al. 1989, Deneubourg et al. 1990 |
| V3 | « La ruche en compartiments » : le schéma de la fig. 4 animé par des particules, horloge de 8 h à 16 h avec inversion à midi, points du terrain (fig. 1-2) et courbe publiée (fig. 5) superposés | Recrutement plus abandon, sans comparaison entre sources | Seeley et al. 1991 |
| V4 | « Réaction à un changement », écran partagé normalisé : part de l'effort sur la meilleure option en fonction du temps depuis le changement, même axe et même mesure pour les deux espèces | Lecture de C10 | Goss et al. 1989, Seeley et al. 1991, Grüter et al. 2012 |
| V5 | « L'éventail de la danse » : rose des directions et recrues dispersées au sol; curseur d'erreur de 0 à 60° avec compteurs « exploitation » et « découvertes » | Le bruit utile | Okada et al. 2014, Weidenmüller et Seeley 1999 |
| V6 | « Ce que dit la danse » : décodage angle → azimut et durée → distance, avec une bande d'incertitude (calibration individuelle, non-linéarité, flux optique) | Le symbole est approximatif | Kohl et Rutschmann 2021, Schürch et al. 2016, Esch et al. 2001 |
| V7 | Carte de phase persistance × non-linéarité (ρ, n), colorée par le temps de bascule ou par « verrouillé », avec les positions de *I. humilis*, *P. megacephala* et de l'abeille (n = 1) | Les trois leviers de la section 6 | Calcul original, non publié |
| V8 | Même carte pour des agents : TTL d'un tableau partagé × poids de la majorité dans la décision de l'agent | Pont vers P7 | Han et Zhang 2025, Han et al. 2026 (analogie) |

## 8. Parallèles agentiques

| Mécanisme biologique (source) | Analogue agentique | Appui côté agentique | Statut |
|---|---|---|---|
| Stigmergie : coordination indirecte par la modification de l'environnement (Theraulaz et Bonabeau 1999 [R]) | Tableau noir ou état partagé lu par les agents, qui choisissent leur action selon son contenu | Han et Zhang 2025 [R] : agents sélectionnés selon le contenu du tableau, rondes jusqu'au consensus, moins de tokens que l'état de l'art | Analogie de l'auteur; le cadre de la stigmergie généralisée existe (Heylighen 2016 [M]) |
| Fonction de choix non linéaire (n = 2) : verrouillage (Goss et al. 1989) | Conformité majoritaire des agents LLM : alignement sur les groupes numériquement dominants ou sur les agents plus intelligents (Choi et al. 2025 [R], débats sur des sujets clivants); plus de connectivité accélère la convergence mais augmente les cascades « wrong-but-sure » (Han et al. 2026 [R], topologie) | Han et al. 2026 [R], Choi et al. 2025 [R] | Analogie testable en P7 : estimer un « n effectif » des agents |
| Abandon individuel selon la qualité absolue, sans comparaison (Seeley et al. 1991 [T]) | Chaque agent réévalue sa propre tâche et l'abandonne (disjoncteur local) sans coordinateur | — (aucune source agentique lue) | Inférence |
| Les suiveuses tirent une danseuse au hasard; les danses sont mélangées (Seeley et al. 1991, Seeley 1994) | Agents inactifs qui tirent une annonce au hasard, pondérée par sa « vigueur » (nombre de répétitions ∝ valeur), avec expiration | — | Inférence; corrige le « pub/sub » de v3 |
| Fourmis pilotées par un LLM dans le modèle Ants de NetLogo | GPT-4o à température 0, 10 fourmis, 3 sources, 1000 pas, 5 répétitions. Collecte d'environ 85 unités pour le LLM comme pour les règles (écart-type 7 contre 20); environ 95 pour l'hybride 50/50; 9 itérations de prompt; écarts aux règles malgré la température 0 | Jimenez-Romero et al. 2025 [T via outil] | Précédent direct pour P1 et P7 |
| Mémoire privée contre signal social (Granovskiy et al. 2012, Biesmeijer et Seeley 2005, Czaczkes et al. 2015) | Mémoire ou contexte propre à l'agent contre état partagé | — | Inférence |
| Bruit utile (Okada et al. 2014, Dussutour et al. 2009) | Température et échantillonnage comme source d'exploration | — | Hypothèse à tester en P7 |
| Contrôle décentralisé pour éviter une communication et un calcul centraux coûteux (Seeley et al. 1991 [T], p. 288, citant Hayek 1945 et Simon 1981) | Chorégraphie contre orchestration | Peltz 2003 [M] | Définition de Peltz à lire avant de la citer |

Non appuyé par les sources lues : les qualificatifs de v3 « robuste » (état partagé) et « bavarde » (diffusion). Aucune source consultée ne compare le volume de communication de la piste et de la danse.

## 9. Corrections à v3

1. **Attribution de la fonction de choix.** La fonction et k = 20, n = 2 proviennent de Deneubourg et al. 1990 : branches égales, recrutement exploratoire. Goss et al. 1989 les réutilisent (éq. 3) dans un modèle à retards. v3 met les deux références ensemble sans distinguer ces rôles.
2. **Branche tardive : précisions manquantes.**
   - Le résultat (2/18) porte sur *I. humilis* (aujourd'hui *L. humile*), avec r = 2.
   - La branche est ajoutée 30 min après le début et la mesure est faite 20-30 min plus tard.
   - Le modèle néglige l'évaporation. Une simulation qui ajoute de l'évaporation doit garder ρ = 0 (ou ρ ≪ 1/30 min⁻¹) pour reproduire le résultat.
3. **Le dépôt dans les deux sens est un prérequis** de la sélection du raccourci (prédiction 3 de Goss et al. 1989). v3 ne le mentionne pas, et le moteur doit le modéliser.
4. **Les manipulations ne sont pas comparables.** Fourmis : longueur et ajout tardif; abeilles : qualité et inversion. Ajouter la cible C10, et un équivalent fourmi en qualité (Beckers et al. 1990, Dussutour et al. 2009, Grüter et al. 2012).
5. **« Persistant = rigide » est trop simple.** La rigidité dépend de la persistance, de la non-linéarité et de l'absence de rétroaction négative. *L. niger* bascule en environ 10 min sous encombrement, malgré une phéromone persistante de 40-60 min (Grüter et al. 2012).
6. **« Persistant » est relatif.** Il s'agit d'environ 30 min pour *I. humilis* (Goss et al. 1989) et de 40-60 min pour *L. niger* (Grüter et al. 2012). Certaines pistes combinent plusieurs phéromones aux fonctions différentes (Czaczkes et al. 2015 [R]); que ces phéromones aient des persistances différentes n'est pas établi par le résumé lu [non vérifiée].
7. **Contenu du signal.**
   - La piste n'est pas un simple scalaire : c'est un champ spatial dont la géométrie est le chemin, même si la lecture locale est scalaire [I].
   - La danse porte aussi une intensité : probabilité de danser et nombre de circuits, qui croît avec l'efficacité énergétique (Seeley et al. 1991, tableau 1; Seeley 1994).
   - Dans le modèle publié, seule l'intensité (τ·D) pilote la répartition; le vecteur direction et distance n'y entre pas.
8. **« Diffusion (pub/sub) » est inexact pour la danse.** Le recrutement est local et la suiveuse tire au hasard la première danseuse rencontrée (Seeley et al. 1991, d'après Seeley et Towne 1992; Seeley 1994).
9. **« Oubli : attrition des danses ».** Dans le modèle, l'oubli de la colonie passe surtout par l'abandon individuel conditionné à la qualité (f_x). La danse décroît parce que les abeilles cessent de danser pour une source pauvre (f_d), et non par une décroissance du signal comparable à l'évaporation.
10. **Encodage de la distance.** La danse encode le flux optique (Esch et al. 2001). La calibration est individuelle (Schürch et al. 2016) et non linéaire (Kohl et Rutschmann 2021). Le visuel et la simulation doivent porter cette incertitude.
11. **Bruit de la danse.** v3 l'annonce sans le chiffrer. Ordre de grandeur : 10-15° (Okada et al. 2014), accordé selon le type de cible (Weidenmüller et Seeley 1999).
12. **Paramètres du modèle abeille.** Les équations et paramètres accessibles sont ceux de Seeley et al. 1991 (annexe, tableau 2). Avec ces valeurs, la dynamique après l'inversion ne reproduit pas la fig. 5 (section 4). « Modèle Camazine et Sneyd 1991 » ne doit pas être cité comme reproduit tant que l'article JTB n'a pas été lu.
13. **Détail expérimental à reporter.** Le matin du 19 juin, la mangeoire nord était à 1,00 M sur le terrain, mais à 0,75 M dans la simulation publiée. Les mangeoires étaient à 400 m, 4000 abeilles avaient été marquées (population d'environ 4200 le 19 juin, butineuses toutes marquées), et environ 125 abeilles ont visité les mangeoires.
14. **Recrutement « suivi de piste, tandem ».** Le tandem est typique des petites colonies, et les stratégies se rangent selon la taille de colonie (Beckers et al. 1989, Planqué et al. 2010). Les espèces du pont double recrutent en masse. Il faut nommer l'espèce pour chaque mécanisme.
15. **Titre de Camazine et Sneyd 1991.** Le titre publié est « A model of collective nectar source selection by honey bees: self-organization through simple rules ». Seeley et al. 1991 le citent sous un titre provisoire différent (« A mathematical model of colony-level nectar source selection… »).

## 10. Questions ouvertes

1. **Camazine et Sneyd 1991 (JTB, texte intégral).** Les paramètres ou la fonction d'abandon y diffèrent-ils du tableau 2 de Seeley et al. 1991? C'est ce qui trancherait l'écart des pentes (+12/−18 contre +18/−30) et permettrait de figer C5.
2. **Deneubourg et al. 1990 (texte intégral).** Avec quelles données, quel ajustement et quel intervalle de confiance k = 20 et n = 2 ont-ils été estimés [à confirmer]? Le résultat du pont à branches égales est aussi à récupérer.
3. **Beckers et al. 1990 (texte intégral).** Il faut les chiffres du non-basculement de *L. niger* (1 M contre 0,1 M, introduction tardive) pour construire l'équivalent fourmi de l'inversion abeille.
4. **Dussutour et al. 2009.** α = 2 est confirmé. Reste à confirmer l'unité de ρ = 0,00085 (s⁻¹ ou min⁻¹?) [à confirmer].
5. **Fiabilité des vraies colonies.** Quel mécanisme rend les vraies colonies plus fiables que le modèle de Goss et al. 1989 (C3)? Candidats : trafic, mémoire, demi-tours (Beckers et al. 1992). À trancher avant d'en faire un critère statistique.
6. **Comparaison directe déjà publiée?** Detrain et Deneubourg 2008 et Sumpter et Pratt 2003 sont les candidats. Une comparaison fourmi-abeille sous manipulations identiques existe-t-elle déjà? Sinon, C10 est une contribution originale.
7. **Métrique de « richesse du signal ».** La question transversale de v3 demande une métrique opérationnelle. Proposition [I] : un nombre de bits par épisode de recrutement. Haldane et Spurway 1954 auraient estimé le contenu informationnel de la danse [non vérifiée].
8. **« n effectif » des agents LLM.** Peut-on mesurer, pour des agents LLM qui lisent un état partagé, l'équivalent de n (la pente de la réponse à la majorité)? Han et al. 2026 et Choi et al. 2025 fournissent des protocoles de départ.
9. **Définitions de référence.** Lire Peltz 2003 et Heylighen 2016 avant de les citer pour les définitions « chorégraphie » et « stigmergie ».

## 11. Historique de vérification

Vérification indépendante : `recherche/verifications/p1-recrutement.md` (2026-10-01). Résultat : les 40 références du tableau de la section 2 existent; 27 confirmées, 11 corrigées, 2 non vérifiables sur un point précis. Valeurs des deux modèles centraux (Goss et al. 1989, Seeley et al. 1991) confirmées à la source.

**Corrections appliquées (consolidation du 2026-10-01).**

*Références (section 2)*

1. Deneubourg et al. 1990 : numéro (3(2)).
2. Beckers et al. 1990 : niveau S porté à R (résumé).
3. Beckers et al. 1992 : numéro (159(4)). Beckers et al. 1993 : numéro (6(6)).
4. Seeley et Towne 1992 : 30(1):59–69 (pages confirmées aussi par Semantic Scholar); niveau porté à R.
5. Seeley 1994 : 34(1):51–62, DOI 10.1007/BF00175458.
6. Weidenmüller et Seeley 1999 : 46(3):190–199, DOI 10.1007/s002650050609.
7. Gardner et al. 2007 : auteurs (Gardner KE, Seeley TD, Calderone NW), titre complet, 29(2-4):285–298, DOI.
8. Esch et al. 2001 : numéro (411(6837)). Schürch et al. 2016 : numéro (219(9)) et initiales de Samuelson (EEW, selon Crossref; Europe PMC donne EE). I'Anson Price et al. 2019 : numéro (5(2)). Granovskiy et al. 2012 : numéro (23(3)).
9. Biesmeijer et Seeley 2005 : coauteur Seeley confirmé, 59(1):133–142, DOI.
10. Deneubourg et al. 1986 : coauteurs (Aron, Goss, Pasteels, Duerinck), 22(1-3):176–186, DOI; contenu ramené au niveau [S].
11. Planqué et al. 2010 : coauteurs (van den Berg, Franks), 5(8):e11664, DOI.
12. Lanan 2014 : DOI 10.25849/myrmecol.news_020:053; « ressources durables » désormais marqué comme inférence.
13. Seeley 2012 (ex-« seeley2011 ») : support exact (chapitre dans *Honeybee Neurobiology and Behavior*, Springer, Dordrecht, 2012, en ligne 2011, p. 77–87, DOI).
14. Frisch 1967 : aucune correction (DOI de la réédition de 1993, déjà signalé).

*Valeurs et résultats*

15. Okada et al. 2014 : C7 et section 6 réécrits sur les seuils publiés (≤ 10° bénéfique partout, 15° seulement si sources rares, ≥ 30° sans bénéfice, 0-5° succès mais échecs de bascule); le critère « bascule maximale pour σ ∈ [10, 15]° » est déclaré extension et non reproduction; protocole publié noté (20 simulations par condition, 2, 5, 7 ou 10 mangeoires).
16. Section 4, tableau des probabilités : définition rendue cohérente (r = 1 : 0,56 bilatérale, 0,69 par doublement, la queue supérieure 0,79 n'étant pas un écart; r = 1,4 : 0,047 au lieu de 0,044; r = 2 : 0,018 au lieu de 0,017). Conclusion mise à jour : C3 précise le caractère unilatéral du test, r = 1,4 étant à la limite.
17. Section 9, point 13 : « 4000 abeilles marquées, population d'environ 4200 » (au lieu de « environ 4200 abeilles marquées »).
18. C6 : note sur l'écart interne de Seeley et al. 1991 (90 au texte p. 286, 91 à la fig. 1; C6 retient la fig. 1).
19. Section 3.3 : seuils de réponse fixes situés à la p. 284, les trois autres hypothèses à la p. 285.
20. Section 3.4 : seuil du modèle segmenté de Kohl et Rutschmann 2021 donné à 1,0328 km (1,03 était un arrondi).
21. Section 6 : Sherman et Visscher 2002 nuancé (bénéfice net aux mangeoires de sirop; aux sources naturelles, parfois sans effet).
22. Section 9, point 6 : « phéromones de persistances différentes » remplacé par « aux fonctions différentes » (Czaczkes et al. 2015); la persistance différente est marquée [non vérifiée].
23. Dussutour et al. 2009 : α = 2 confirmé (« With α = 2, as fitted to experiments »); contradiction interne sur la méthode d'ajustement levée (recherche paramétrique en grille, critère des moindres carrés); unité de ρ marquée [à confirmer]; C9 et question ouverte 4 mis à jour.
24. Section 8 : Choi et al. 2025 rattaché à l'alignement sur les groupes dominants (débats sur des sujets clivants); la connectivité et les cascades « wrong-but-sure » sont attribuées à Han et al. 2026 seul.
25. Script `p1_verif_recrutement.py` : tolérances à midi alignées sur C4 (119 ± 3, 3 ± 1) et queues binomiales ajoutées; chemin du script corrigé dans la section 0 et la section 4 (l'ancien `p1-verif/verif_p1.py` n'existe plus). Le script se termine par « OK ».

*Ajouts de forme (consolidation)*

26. Étiquettes « Nom année » dans tout le texte; colonne « Clé » remplacée par « Étiquette »; marques [à confirmer] et [non vérifiée] ajoutées à la légende.
27. Section 2.1 : cinq références citées dans le texte par l'entremise d'une autre source, absentes du tableau d'origine (Van Vorhis Key et Baker 1982, Seeley et Visscher 1988, Hayek 1945, Simon 1981, Haldane et Spurway 1954).

**Réserves restantes.**

- **Dussutour et al. 2009 : unité de temps de ρ** (s⁻¹ ou min⁻¹) non énoncée dans les passages lus [à confirmer]; la forme exacte de p_i (placement de k) a été lue au rapport de vérification et n'a pas pu être recontrôlée de façon fiable à la consolidation (rendu MathML instable).
- **Czaczkes et al. 2015** : seul le résumé a été lu; la persistance différente des phéromones d'une même piste reste [non vérifiée].
- **Camazine et Sneyd 1991, Deneubourg et al. 1990, Deneubourg et al. 1986** : seules les métadonnées sont confirmées; k = 20 dans le texte de 1990 [à confirmer]; le contenu de Deneubourg et al. 1986 reste au niveau [S] (aucun résumé retrouvé dans Crossref, Semantic Scholar ou OpenAlex).
- **Beckers et al. 1990** : niveau [R] repris du rapport de vérification; le résumé n'a pu être relu à la consolidation (Semantic Scholar sans résumé). Texte intégral non lu.
- **Écart des pentes de l'ODE des abeilles** (+12/−18 contre +18/−30) : réel, non résolu; C5 définitif reste suspendu.
- **Seeley et Towne 1992** : pages 59–69 confirmées par deux sources de métadonnées (page Springer lue par le vérificateur, Semantic Scholar); le résumé n'a pas été relu à la consolidation.
- **Lectures de figure** (fig. 2 de Goss et al. 1989, fig. 5 de Seeley et al. 1991) : ±3 points, sans lecture indépendante plus précise.
- **C3** : le verdict de l'échec statistique pour r = 1,4 dépend du choix unilatéral ou bilatéral (P = 0,047 unilatéral). La valeur de p non arrondie (≈ 0,615 donnerait 0,043) n'est pas reproductible dans le script [à confirmer].
- **Note taxonomique** (section 2) : la source « PLoS Comput Biol 2012 » n'est pas identifiée [à confirmer].
- **Références de la section 2.1** : œuvres non consultées; seules les métadonnées de Van Vorhis Key et Baker 1982, Seeley et Visscher 1988 et Haldane et Spurway 1954 ont été retrouvées dans Crossref.

# Dossier P4 — Régulation sans vue globale (fourmi moissonneuse, abeille mellifère)

**Statut : consolidé après vérification indépendante, 2026-10-01.** Rapport : `recherche/verifications/p4-regulation.md`; corrections appliquées et réserves restantes en section 12. Les références sont désignées par leur étiquette normalisée « Nom année » (liste complète en section 2).

Dossier documentaire pour le Projet 4 de la proposition v3. Rédigé le 2026-10-01.
Régime : exploratoire documenté (chaque affirmation porte son niveau de vérification).

## 0. Légende de vérification

Appliquée à chaque affirmation chiffrée.

| Code | Signification |
|---|---|
| **[T]** | Texte intégral lu (PDF extrait localement ou HTML complet; préprint signalé comme tel) |
| **[R]** | Résumé lu (page éditeur, Europe PMC, OpenAlex, Semantic Scholar) |
| **[M]** | Métadonnées seulement (Crossref, Europe PMC, page éditeur) |
| **[S]** | Source secondaire lue, nommée (communiqué, autre article, rapport d'audit) |
| **[I]** | Inférence ou calcul de l'auteur du dossier, absent des sources |
| **[à confirmer]** | Valeur ou énoncé que la vérification indépendante n'a pas pu confirmer (source non lue, contenu en image, résumé muet) |
| **[non vérifiée]** | Référence dont la vérification indépendante n'a pas pu consulter le contenu, posée là où elle est citée |

Limite de la recherche : le budget WebSearch de la session s'est épuisé en cours de route et Consensus est à une requête de son plafond mensuel. Les absences (« non trouvé ») valent donc pour les sources consultées seulement. La vérification indépendante a épuisé les budgets WebSearch (200/200) et Consensus (30/30); Springer (*Behav Ecol Sociobiol*) bloque l'accès au texte et masque les résumés partout où ils ont été cherchés. Aucune absence de source n'est conclue d'un refus d'accès.

---

## 1. Synthèse

1. Le modèle de Prabhakar et al. 2012 est un processus stochastique à temps discret à quatre paramètres. Seul `c` est ajusté; on fixe `q = 0,05`, `d = 0` et `ᾱ = 0,01 fourmi/s`. **L'article ne mentionne pas TCP** : il parle seulement de « réseaux informatiques » et cite une référence sur le contrôle de congestion en centre de données. L'analogie TCP vient du communiqué de Stanford (Carey 2012, 24 août 2012) et de Gordon 2014.
2. Les abeilles ont un double mécanisme. D'une part, un *indice* : le temps de recherche d'une receveuse (Seeley 1989 [non vérifiée]). D'autre part, des *signaux* : la danse de trémulation recrute des receveuses et freine le recrutement, aidée par les signaux d'arrêt (Seeley 1992 [non vérifiée]; Kirchner 1993 [à confirmer]; Nieh 1993 [non vérifiée]; l'inhibition de la frétillante par la trémulation est aussi rapportée par l'audit bio-abeilles, M9, qui la lit dans Seeley et al. 1996 [S]). L'effet sur les receveuses est démontré : elles passent de 17 % à 30–50 % de l'effectif mesuré de la colonie (Seeley et al. 1996 [T]).
3. **La loi de Little est déjà publiée dans ce contexte.** Anderson et Ratnieks 1999a, annexe C l'invoquent explicitement pour la file butineuses-receveuses. Pagliara et al. 2018, éq. 12 l'appliquent au fourragement des moissonneuses sans la nommer (`E[Q] = rD`). Seeley 1989 [non vérifiée] cadrerait déjà l'indice abeille en théorie des files [à confirmer]. La mention de v3 « rapprochement non publié, de l'auteur » est donc fausse, ce qu'établissent les deux sources lues en texte intégral (Anderson et Ratnieks 1999a, Pagliara et al. 2018).
4. L'idée « deux lectures de la même file » est inexacte : il s'agit de **deux files différentes**. La fourmi lit un débit λ sur une boucle de type M/G/∞, le terrain, ce qui renseigne sur la durée de quête W. L'abeille lit un délai W sur une file d'appariement entre deux castes, ce qui renseigne sur la charge ρ. La loi de Little est une identité valide, mais elle ne suffit pas à expliquer pourquoi le délai renseigne : il faut un modèle de file (Seeley et Tovey 1994).
5. Il existe des cibles quantitatives reproductibles : le gain stationnaire et l'expérience de retrait (Prabhakar et al. 2012), les délais selon la taille de colonie (Anderson et Ratnieks 1999a, tableau 1 et annexe C) et l'état stationnaire analytique S* (Edwards et Myerscough 2011). Trois vérifications numériques passent (`p4_checks_regulation.py`, § 11).
6. Les seuils de temps d'attente circulent sous des formes variées. Les valeurs vérifiées : plus de 40 s favorise la trémulation (Seeley et al. 1996, citant Seeley 1992 [non vérifiée] et Kirchner et Lindauer 1994 [non vérifiée]); `m_S = 10 s` et `m_T = 30 s` sont ajustés sur Seeley 1992, fig. 7 (non lue) par Edwards et Myerscough 2011 [T, préprint]. Le couple populaire « < 20 s frétillante / > 50 s trémulation » **n'a pas été vérifié**.

---

## 2. Références

**Étiquette** : « Nom année » (nom de famille du premier auteur sans particule; deux auteurs « X et Y année »; trois auteurs ou plus « X et al. année »; suffixe a, b seulement en cas de collision). **Statut** après vérification indépendante (2026-10-01) : **vérifiée** = métadonnées exactes et affirmations retrouvées; **corrigée** = la source existe, mais le dossier contenait une erreur, une omission ou une imprécision, corrigée en place; **non vérifiée** = source non consultée ou contenu non retrouvé (la référence porte « [non vérifiée] » là où elle est citée; les valeurs concernées portent « [à confirmer] »). Colonne « Lu » : ce qui a été lu réellement (légende en section 0). Pour les références Springer (*Behav Ecol Sociobiol*) marquées non vérifiées ou à contenu [à confirmer], le dossier initial déclarait un résumé lu [R] (Consensus, Semantic Scholar); la vérification indépendante ne l'a pas retrouvé (pages Springer masquées, Crossref, OpenAlex et Semantic Scholar sans résumé). La mention [R] initiale est donc retirée de ces lignes, au profit de [M]. Les clés internes de la version précédente du dossier (prabhakar2012, etc.) ne sont plus utilisées.

### 2.1 Fourmis (*Pogonomyrmex barbatus*)

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Prabhakar et al. 2012 | Prabhakar B, Dektar KN, Gordon DM (2012). The regulation of ant colony foraging activity without spatial information. *PLoS Comput Biol* 8(8): e1002670. | 10.1371/journal.pcbi.1002670 ; https://doi.org/10.1371/journal.pcbi.1002670 | corrigée (« ET » lu à tort pour des erreurs-types; sens des 13 %, 2,6 % et 15,5 %; § 3.2) | [T] PDF complet (7 p.) |
| Carey 2012 | Carey B (24 août 2012). Stanford researchers discover the "anternet". *Stanford Report* (repris par Bio-X). | https://biox.stanford.edu/highlight/stanford-researchers-discover-anternet | vérifiée | [T] page complète |
| Gordon 2014 | Gordon DM (2014). The ecology of collective behavior. *PLoS Biol* 12(3): e1001805. | 10.1371/journal.pbio.1001805 ; https://doi.org/10.1371/journal.pbio.1001805 | vérifiée | [T] partiel : section « Operating Costs » (seule mention de TCP) |
| Gordon 2010 | Gordon DM (2010). *Ant Encounters: Interaction Networks and Colony Behavior*. Princeton University Press, coll. Primers in Complex Systems, 184 p., ISBN 978-0-691-13879-4. | 10.1515/9781400835447 ; https://press.princeton.edu/books/paperback/9780691138794/ant-encounters | **non vérifiée** (contenu) | [M] page éditeur seulement (métadonnées exactes); contenu non lu : rien ne permet de citer ce livre pour l'analogie TCP |
| Gordon 2016 | Gordon DM (2016). The evolution of the algorithms for collective behavior. *Cell Systems* 3(6): 514–520. | 10.1016/j.cels.2016.10.013 ; https://doi.org/10.1016/j.cels.2016.10.013 | vérifiée | [T] (recherche de mots-clés) : aucune occurrence de « TCP » ni de « internet » |
| Pinter-Wollman et al. 2013 | Pinter-Wollman N, Bala A, Merrell A, Queirolo J, Stumpe MC, Holmes S, Gordon DM (2013). Harvester ants use interactions to regulate forager activation and availability. *Anim Behav* 86(1): 197–207. PMCID PMC3767282. | 10.1016/j.anbehav.2013.05.012 ; https://doi.org/10.1016/j.anbehav.2013.05.012 | vérifiée | [R] (texte intégral PMC inaccessible) |
| Pagliara et al. 2018 | Pagliara R, Gordon DM, Leonard NE (2018). Regulation of harvester ant foraging as a closed-loop excitable system. *PLoS Comput Biol* 14(12): e1006200. | 10.1371/journal.pcbi.1006200 ; https://doi.org/10.1371/journal.pcbi.1006200 | vérifiée | [T] PDF complet |
| Davidson et al. 2016 | Davidson JD, Arauco-Aliaga RP, Crow S, Gordon DM, Goldman MS (2016). Effect of interactions between harvester ants on forager decisions. *Front Ecol Evol* 4: 115. | 10.3389/fevo.2016.00115 ; https://doi.org/10.3389/fevo.2016.00115 | vérifiée | [R] + éq. 2 et paramètres de la fig. 6A lus (page Frontiers) |
| Gordon 2002 | Gordon DM (2002). The regulation of foraging activity in red harvester ant colonies. *Am Nat* 159(5): 509–518. | 10.1086/339461 ; https://doi.org/10.1086/339461 | vérifiée | [R] |
| Greene et Gordon 2007 | Greene MJ, Gordon DM (2007). Interaction rate informs harvester ant task decisions. *Behav Ecol* 18(2): 451–455. | 10.1093/beheco/arl105 ; https://doi.org/10.1093/beheco/arl105 ; https://academic.oup.com/beheco/article/18/2/451/204082 | corrigée (DOI ajouté) | [R] |
| Gordon 2013 | Gordon DM (2013). The rewards of restraint in the collective regulation of foraging by harvester ant colonies. *Nature* 498(7452): 91–93; **addendum** *Nature* 542(7640): 260 (2017), doi 10.1038/nature21057. | 10.1038/nature12137 ; https://doi.org/10.1038/nature12137 | corrigée (attribution de « dépenser de l'eau pour en obtenir »; § 3.1) | [R] (résumé relu à la consolidation, Europe PMC, PMID 23676676) + [M]; addendum non lu |
| Gordon 2019 | Gordon DM (2019). The ecology of collective behavior in ants. *Annu Rev Entomol* 64: 35–50. | 10.1146/annurev-ento-011118-111923 ; https://doi.org/10.1146/annurev-ento-011118-111923 | vérifiée | [M] |
| Gordon et al. 2008 | Gordon DM, Holmes S, Nacu S (2008). The short-term regulation of foraging in harvester ants. *Behav Ecol* 19(1): 217–222 (en ligne en 2007). Réf. 28 de Prabhakar et al. 2012. | 10.1093/beheco/arm125 ; https://doi.org/10.1093/beheco/arm125 | corrigée (titre et DOI ajoutés) | [M]; contenu non lu (référence lue dans la liste de Prabhakar et al. 2012 [S]) |
| Gordon et al. 2011 | Gordon DM, Guetz A, Greene MJ, Holmes S (2011). Colony variation in the collective regulation of foraging by harvester ants. *Behav Ecol* 22(2): 429–435. Réf. 29 de Prabhakar et al. 2012. | 10.1093/beheco/arq218 ; https://doi.org/10.1093/beheco/arq218 | corrigée (titre et DOI ajoutés) | [M]; contenu non lu (référence lue dans la liste de Prabhakar et al. 2012 [S]) |
| Schafer et al. 2006 | Schafer RJ, Holmes S, Gordon DM (2006). Forager activation and food availability in harvester ants. *Anim Behav* 71(4): 815–822. Réf. 27 de Prabhakar et al. 2012, source du plancher ᾱ = 0,01. | 10.1016/j.anbehav.2005.05.024 ; https://doi.org/10.1016/j.anbehav.2005.05.024 | corrigée (titre et DOI ajoutés) | [M]; contenu non lu (référence lue dans la liste de Prabhakar et al. 2012 [S]) |

### 2.2 Abeilles (*Apis mellifera*)

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Seeley 1989 | Seeley TD (1989). Social foraging in honey bees: how nectar foragers assess their colony's nutritional status. *Behav Ecol Sociobiol* 24(3): 181–199. | 10.1007/BF00292101 ; https://doi.org/10.1007/BF00292101 | **non vérifiée** (contenu) | [M] métadonnées exactes; résumé non retrouvé à la vérification (pages Springer masquées, Crossref sans résumé); le TLDR de Semantic Scholar ne parle que de « queue length ». Contenu cité (stockeuses de 12 à 18 jours, environ 20 % de la colonie, théorie des files) : [à confirmer] |
| Seeley 1992 | Seeley TD (1992). The tremble dance of the honey bee: message and meanings. *Behav Ecol Sociobiol* 31(6): 375–383. | 10.1007/BF00170604 ; https://doi.org/10.1007/BF00170604 | **non vérifiée** (contenu) | [M] métadonnées exactes (numéro 6 ajouté); résumé non retrouvé; le TLDR de Semantic Scholar [S] décrit une trémulation qui aligne le traitement du nectar sur l'apport (hausse du traitement, frein à la hausse de l'apport). Fig. 7 non vue. Durée d'environ une demi-heure confirmée par Seeley et al. 1996 [T]; 50°/s, nid à couvain, deux publics : [à confirmer] |
| Seeley et Tovey 1994 | Seeley TD, Tovey CA (1994). Why search time to find a food-storer bee accurately indicates the relative rates of nectar collecting and nectar processing in honey bee colonies. *Anim Behav* 47(2): 311–316. | 10.1006/anbe.1994.1044 ; https://doi.org/10.1006/anbe.1994.1044 | vérifiée | [R] via OpenAlex : échantillonnage et « lois de la probabilité » confirmés |
| Seeley et al. 1996 | Seeley TD, Kühnholz S, Weidenmüller A (1996). The honey bee's tremble dance stimulates additional bees to function as nectar receivers. *Behav Ecol Sociobiol* 39(6): 419–427. | 10.1007/s002650050309 ; https://doi.org/10.1007/s002650050309 ; https://kops.uni-konstanz.de (URN nbn:de:bsz:352-172897) | corrigée (dénominateur de T-A1 : effectifs mesurés, non 4 000) | [T] PDF complet |
| Kirchner et Lindauer 1994 | Kirchner WH, Lindauer M (1994). The causes of the tremble dance of the honeybee, *Apis mellifera*. *Behav Ecol Sociobiol* 35(5): 303–308. | 10.1007/BF00184419 ; https://doi.org/10.1007/BF00184419 | **non vérifiée** (contenu) | [M] métadonnées exactes; résumé non retrouvé. Contenu cité (temps *total* de recherche comme cause immédiate) : [à confirmer] |
| Kirchner 1993 | Kirchner WH (1993). Vibrational signals in the tremble dance of the honeybee, *Apis mellifera*. *Behav Ecol Sociobiol* 33(3): 169–172. | 10.1007/BF00216597 ; https://doi.org/10.1007/BF00216597 | corrigée (numéro 3 et DOI ajoutés); contenu [à confirmer] | [M]; résumé non retrouvé; le contenu cité est rapporté par l'audit bio-abeilles (M9), qui le lit dans Seeley et al. 1996 [S] |
| Nieh 1993 | Nieh JC (1993). The stop signal of honey bees: reconsidering its message. *Behav Ecol Sociobiol* 33(1): 51–56. | 10.1007/BF00164346 ; https://doi.org/10.1007/BF00164346 | **non vérifiée** (contenu) | [M] métadonnées exactes; résumé non retrouvé. Contenu cité (danseuses en trémulation = principales émettrices du signal d'arrêt) : [à confirmer] |
| Biesmeijer 2003 | Biesmeijer JC (2003). The occurrence and context of tremble dancing in free-foraging honey bees (*Apis mellifera*). *Behav Ecol Sociobiol* 53(6): 411–416. | 10.1007/s00265-003-0597-0 ; https://doi.org/10.1007/s00265-003-0597-0 | corrigée (pagination et DOI ajoutés); « environ la moitié » [à confirmer] | [M]; résumé non retrouvé |
| Thom 2003 | Thom C (2003). The tremble dance of honey bees can be caused by hive-external foraging experience. *J Exp Biol* 206(13): 2111–2116. | 10.1242/jeb.00398 ; https://doi.org/10.1242/jeb.00398 | vérifiée | [R] : l'encombrement au nourrisseur augmente la trémulation; les danseuses venues de sources naturelles ont souvent un délai court |
| Anderson et Ratnieks 1999a | Anderson C, Ratnieks FLW (1999a). Task partitioning in insect societies. I. Effect of colony size on queueing delay and colony ergonomic efficiency. *Am Nat* 154(5): 521–535. PMID 10561125. | 10.1086/303255 ; https://doi.org/10.1086/303255 ; https://eprints.whiterose.ac.uk/id/eprint/1304/ | corrigée (incohérence interne de la source signalée : 2,4 % contre 2,3 % pour la taille 10; § 4.4) | [T] PDF complet (White Rose) |
| Ratnieks et Anderson 1999a | Ratnieks FLW, Anderson C (1999a). Task partitioning in insect societies. II. Use of queueing delay information in recruitment. *Am Nat* 154(5): 536–548. PMID 10561126. | 10.1086/303256 ; https://doi.org/10.1086/303256 | vérifiée | [R] : qualité croissante avec la taille, groupe en excès mieux informé, deux moyennages |
| Ratnieks et Anderson 1999b | Ratnieks FLW, Anderson C (1999b). Task partitioning in insect societies. *Insectes Soc* 46(2): 95–108. | 10.1007/s000400050119 ; https://doi.org/10.1007/s000400050119 | corrigée (numéro 2 et DOI ajoutés) | [R] déclaré par le dossier initial; titre, numéro et DOI confirmés par la vérification (non citée dans le corps du dossier) |
| Anderson et Ratnieks 1999b | Anderson C, Ratnieks FLW (1999b). Worker allocation in insect societies: coordination of nectar foragers and nectar receivers in honey bee (*Apis mellifera*) colonies. *Behav Ecol Sociobiol* 46(2): 73–81. | 10.1007/s002650050595 ; https://doi.org/10.1007/s002650050595 | **non vérifiée** (contenu) | [M] métadonnées exactes; résumé non retrouvé. Contenu cité (« meilleur usage » de l'information, régulateurs primaires) : [à confirmer] |
| Anderson 1998b | Anderson C (1998b). Simulation of the feedbacks and regulation of recruitment dancing in honey bees. *Adv Complex Syst* 1(2–3): 267–282. (« Anderson 1998b » dans Anderson et Ratnieks 1999a.) | 10.1142/S0219525998000181 ; https://doi.org/10.1142/S0219525998000181 | corrigée (numéro et DOI ajoutés) | [R] déclaré par le dossier initial; la règle de seuil sur le délai, robuste aux valeurs exactes des seuils, est confirmée par Anderson et Ratnieks 1999a [T] |
| Hart et Ratnieks 2001 | Hart AG, Ratnieks FLW (2001). Why do honey-bee (*Apis mellifera*) foragers transfer nectar to several receivers? Information improvement through multiple sampling in a biological system. *Behav Ecol Sociobiol* 49(4): 244–250 (en ligne en 2000, numéro de 2001). Erratum : *Behav Ecol Sociobiol* 49(4): 330, DOI 10.1007/s002650100340. | 10.1007/s002650000306 ; https://doi.org/10.1007/s002650000306 | corrigée (pagination et erratum ajoutés); contenu [à confirmer] | [M]; résumé non retrouvé |
| Gregson et al. 2003 | Gregson AM, Hart AG, Holcombe M, Ratnieks FLW (2003). Partial nectar loads as a cause of multiple nectar transfer in the honey bee (*Apis mellifera*): a simulation model. *J Theor Biol* 222(1): 1–8. | 10.1016/S0022-5193(02)00487-3 ; https://doi.org/10.1016/S0022-5193(02)00487-3 | corrigée (titre complet et DOI ajoutés) | [R] : « as many as 1.9 » transferts et sous-produit non adaptatif confirmés |
| Edwards et Myerscough 2011 | Edwards JR, Myerscough MR (2011). Intelligent decisions from the hive mind: foragers and nectar receivers of *Apis mellifera* collaborate to optimise active forager numbers. *J Theor Biol* 271(1): 64–77. PMID 21126525. Préprint arXiv:1007.3311. | 10.1016/j.jtbi.2010.11.027 ; https://doi.org/10.1016/j.jtbi.2010.11.027 ; https://arxiv.org/abs/1007.3311 | vérifiée (préprint); version publiée non comparée | [T] préprint + [M]; la version publiée peut différer |
| Seeley 1995 | Seeley TD (1995). *The Wisdom of the Hive: The Social Physiology of Honey Bee Colonies*. Harvard University Press. | 10.4159/9780674043404 ; https://doi.org/10.4159/9780674043404 | corrigée (titre complet et DOI ajoutés) | [R] (table des matières) |
| Seeley 1986 | Seeley TD (1986). Social foraging by honeybees: how colonies allocate foragers among patches of flowers. *Behav Ecol Sociobiol* 19(5): 343–354. | 10.1007/BF00295707 ; https://doi.org/10.1007/BF00295707 | corrigée (titre et DOI ajoutés) | [R] déclaré par le dossier initial; titre, numéro et DOI confirmés par la vérification (cité par Edwards et Myerscough 2011, tableau 1 [S]) |
| Seeley 1994 | Seeley TD (1994). Honey bee foragers as sensory units of their colonies. *Behav Ecol Sociobiol* 34(1): 51–62. | 10.1007/BF00175458 ; https://doi.org/10.1007/BF00175458 | corrigée (titre et DOI ajoutés); contenu [à confirmer] | [M]; résumé non retrouvé (variation individuelle des seuils de danse : [à confirmer]) |
| Thenius et al. 2008 | Thenius R, Schmickl T, Crailsheim K (2008). Optimisation of a honeybee-colony's energetics via social learning based on queuing delays. *Connection Science* 20(2–3): 193–210. | 10.1080/09540090802091982 ; https://doi.org/10.1080/09540090802091982 | corrigée (référence complète et DOI ajoutés) | [M]; contenu non lu |
| Burd 1996 | Burd M (1996). Server system and queuing models of leaf harvesting by leaf-cutting ants. *Am Nat* 148(4): 613–629. | 10.1086/285943 ; https://doi.org/10.1086/285943 | corrigée (référence complète et DOI ajoutés) | [M]; contenu non lu |

### 2.3 Files d'attente et ingénierie

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Little 1961 | Little JDC (1961). A proof for the queuing formula: L = λW. *Oper Res* 9(3): 383–387. | 10.1287/opre.9.3.383 ; https://doi.org/10.1287/opre.9.3.383 | vérifiée (existence) | [M] (existence confirmée par Little 2011 et Anderson et Ratnieks 1999a) |
| Little 2011 | Little JDC (2011). OR FORUM—Little's Law as viewed on its 50th anniversary. *Oper Res* 59(3): 536–549. | 10.1287/opre.1110.0940 ; https://doi.org/10.1287/opre.1110.0940 | corrigée (titre exact; précision sur LL.1, § 5.2) | [T] |
| Jacobson et Karels 1988 | Jacobson V, Karels MJ (1988). Congestion avoidance and control. Version de novembre 1988, « very slightly revised » par rapport à SIGCOMM '88. | https://ee.lbl.gov/papers/congavoid.pdf | vérifiée | [T] |
| Nichols et al. 2018 | Nichols K, Jacobson V, McGregor A (éd.), Iyengar J (éd.) (janvier 2018). Controlled Delay Active Queue Management. RFC 8289 (Experimental). | https://www.rfc-editor.org/rfc/rfc8289.html | vérifiée | [T] |
| Cardwell et al. 2022 | Cardwell N, Cheng Y, Hassas Yeganeh S, Swett I, Jacobson V (7 mars 2022). BBR Congestion Control. draft-cardwell-iccrg-bbr-congestion-control-02. | https://datatracker.ietf.org/doc/html/draft-cardwell-iccrg-bbr-congestion-control-02 | vérifiée | [T] partiel |
| Netflix 2026 | Netflix. concurrency-limits (README). Page non datée; année = consultation, 2026-10-01. | https://github.com/Netflix/concurrency-limits | vérifiée | [T] : le README nomme explicitement la loi de Little |
| Reactive Streams 2026 | Reactive Streams JVM 1.0.4, spécification. Année = consultation, 2026. | https://github.com/reactive-streams/reactive-streams-jvm | vérifiée | [T] |
| Anthropic 2026 | Anthropic. Rate limits, documentation de l'API Claude (consultée le 2026-10-01). | https://platform.claude.com/docs/en/api/rate-limits | vérifiée | [T] |

### 2.4 Références citées dans le texte, absentes des tableaux d'origine

Ces références sont nommées dans le dossier sans y figurer en tableau. Métadonnées issues de la liste de références de Prabhakar et al. 2012 (page PMC3426560) ou de Crossref, lues à la consolidation; aucun contenu lu.

| Étiquette | Référence complète | DOI / URL | Statut | Lu |
|---|---|---|---|---|
| Alizadeh et al. 2008 | Alizadeh M, Atikoglu B, Kabbani A, Lakshmikantha A, Pan R, et al. (2008). Data center transport mechanisms: congestion control theory and IEEE standardization. *Proceedings of the 46th Annual Allerton Conference on Communications, Control and Computing*. (Liste d'auteurs tronquée dans la source.) | — | **non vérifiée** | [S] réf. 34 de Prabhakar et al. 2012; article non consulté |
| Anderson 1998a | Anderson C (1998a). The organisation of foraging in insect societies. Thèse de doctorat non publiée, School of Mathematics, University of Sheffield. | — | **non vérifiée** | [S] liste de références d'Anderson et Ratnieks 1999a (Crossref); thèse non consultée |
| Seeley et al. 1991 | Seeley TD, Camazine S, Sneyd J (1991). Collective decision-making in honey bees: how colonies choose among nectar sources. *Behav Ecol Sociobiol* 28(4): 277– [pagination finale à confirmer]. | 10.1007/BF00175101 | **non vérifiée** | [M] (Crossref); source de s_s dans le tableau 1 d'Edwards et Myerscough 2011 [S] |
| Seeley et Towne 1992 | Seeley TD, Towne WF (1992). Tactics of dance choice in honey bees: do foragers compare dances? *Behav Ecol Sociobiol* 30(1): 59– [pagination finale à confirmer]. | 10.1007/BF00168595 | **non vérifiée** | [M] (Crossref); source de f_r dans le tableau 1 d'Edwards et Myerscough 2011 [S] |
| Camazine et Sneyd 1991 | Camazine S, Sneyd J (1991). A model of collective nectar source selection by honey bees: self-organization through simple rules. *J Theor Biol* 149(4): 547–571. | 10.1016/S0022-5193(05)80098-0 | **non vérifiée** | [M] (Crossref); source de f_s dans le tableau 1 d'Edwards et Myerscough 2011 [S]; valeur [à confirmer] (cadre § 10) |
| Pinter-Wollman et al. 2011 | Pinter-Wollman N, Wollman R, Guetz A, Holmes S, Gordon DM (2011). The effect of individual variation on the structure and function of interaction networks in harvester ants. *J R Soc Interface* 8(64): 1562–1573. | 10.1098/rsif.2011.0059 | **non vérifiée** | [M] (Crossref); identification de l'article « J R Soc Interface, réseaux d'interaction » du § 9 par correspondance de métadonnées; contenu non lu |
| Huang et Seeley 2003 | Huang MH, Seeley TD (2003). Multiple unloadings by nectar foragers in honey bees: a matter of information improvement or crop fullness? *Insectes Soc* 50(4): 330–339. | 10.1007/s00040-003-0682-4 | **non vérifiée** | [M] (Crossref); recherche annoncée en § 10, non faite |

---

## 3. Fourmis moissonneuses : ce que disent les sources

### 3.1 Contexte écologique (Gordon 2002, Greene et Gordon 2007, Gordon 2013, Pagliara et al. 2018)

- Les fourrageuses cherchent seules des graines dispersées et n'utilisent aucune piste. Plus la nourriture abonde, plus elles rentrent vite : le **taux de retour reflète la disponibilité de la nourriture** (Prabhakar et al. 2012, introduction, citant ses réf. 22–23).
- Les interactions décisives ont lieu dans un tunnel d'entrée de 5 à 10 cm : contacts antennaires brefs entre fourrageuses entrantes chargées et sortantes disponibles (Prabhakar et al. 2012, introduction).
- Les patrouilleuses déclenchent le début du fourragement. Ensuite, le taux de retour des fourrageuses module le taux de sortie, avec une sensibilité moindre (Gordon 2002, résumé).
- Le **taux** de contact est l'information. Des billes imprégnées d'hydrocarbures cuticulaires de patrouilleuses, introduites à 1 bille / 10 s, maximisent le fourragement (Greene et Gordon 2007, résumé).
- Le coût de fonctionnement est en eau : il faut dépenser de l'eau pour en obtenir (Prabhakar et al. 2012, introduction [T], relevé par la vérification indépendante). La dessiccation coûte cher aux fourrageuses du désert, et les colonies qui réussissent le mieux, c'est-à-dire qui produisent plus de colonies-filles, fourragent moins par temps sec (Gordon 2013, résumé [R]; voir aussi l'addendum 2017, non lu). La formule « dépenser de l'eau pour en obtenir » ne figure pas dans le résumé de Gordon 2013.

### 3.2 Modèle de Prabhakar et al. 2012 [T]

**Données** (Methods). Les essais ont lieu près de Rodeo, au Nouveau-Mexique, en août 2009 (33 essais, 9 colonies, 8 jours) et en août-septembre 2010 (29 essais, 8 colonies, 5 jours, dont 4 colonies déjà suivies en 2009). Cela donne **62 essais sur 13 colonies**, âgées de plus de 5 ans. Chaque observation dure 20 min, et on empêche le retour des fourrageuses aux minutes 4 à 7. Le comptage se fait par vidéo (AnTracks, erreur de 7,3 %), à 30 images/s.

**Modèle 1, linéaire** (Results, éq. 1–2) :

```
λ(t) = λ_ac · f(t, τ)          f(t,τ) = nombre de retours entre t−τ et t
x(t) = Poisson(λ_b) + Poisson(λ(t))
```

Les auteurs l'abandonnent, car τ devrait varier selon le régime de fourragement.

**Modèle 2, retenu** (Results, « Model of the regulation of foraging activity », éq. 3–4). Les arrivées ont lieu au début du créneau, les départs à la fin :

```
α_n = max( α_{n−1} − q·D_{n−1} + c·A_n − d , ᾱ ),   α_0 = 0      (3)
D_n ~ Poisson(α_n)                                              (4)
```

| Symbole | Sens | Valeur publiée | Emplacement |
|---|---|---|---|
| A_n | retours chargés au créneau n | données observées en entrée | Results |
| D_n | départs au créneau n | sortie | éq. 4 |
| c | hausse de α par retour | **ajusté par essai**, balayage de 0,01 à 0,25 | « Comparison of model and data » |
| q | baisse de α par départ (vidange du tunnel) | **0,05** (fixé pour garder α entre 0,15 et 1,2 fourmi/s) | idem |
| d | décroissance par créneau | **0** (fixé) | idem |
| ᾱ | plancher (taux de base) | **0,01 fourmi/s** (réf. 27) | idem |
| durée du créneau | — | **non précisée** | — |

Le texte justifie chaque terme : un retard de reprise après une baisse (fig. 2), le tunnel encombré qui motive q, et une réponse plus faible longtemps après le dernier retour, qui motive d.

**Ajustement et résultats** :

- Pour chaque essai, on balaie c et on garde la valeur qui minimise le RMSE relatif moyen sur 200 itérations. Le RMSE du meilleur c va de 0,237 à 4,9, avec une moyenne de 0,602 (erreur-type, SE, 0,077) sur 62 essais. **Les valeurs de c retenues ne sont pas publiées.**
- Les intervalles entre retours suivent une loi exponentielle, donc un processus de Poisson, sur 60–240 s dans 39 essais. L'erreur de variation totale moyenne est de 0,056 (SE 0,009), avec un meilleur ajustement à haut débit (fig. 1; exemple : intervalle moyen de 1,02 s).
- Variation du RMSE (« change in RMSE ») d'une simulation à l'autre : 13 % à bas débit et 2,6 % à haut débit; entre essais d'une même colonie, elle atteint 15,5 %. Ce sont des variations du RMSE, non de la variabilité des sorties.
- Corrélations, calculées après lissage par un filtre rectangulaire de rayon 25 créneaux (fig. 3). Le modèle corrèle **plus fort** que les données (t = 8,98, p < 0,001). Sa corrélation croît avec le débit moyen de retour (Spearman, n = 62, z = −4,04, p = 0,0001); celle des données, non (z = −1,34, p = 0,18).
- Exemples de la fig. 2 : 0,807 fourmi/s (haut débit) et 0,169 fourmi/s (bas débit).
- La discussion compare le processus, de façon générique, à d'autres réseaux distribués, des réseaux informatiques aux intégrateurs neuronaux. Elle cite Alizadeh et al. 2008 [non vérifiée] (contrôle de congestion en centre de données; référence 34 de l'article). **Le mot TCP n'apparaît pas.**

**Erreurs relevées dans la source** :
- Le texte écrit « ratio of c to e » : lire probablement c/q [I].
- Il écrit aussi « varying u among trials » : lire c [I].
- La fenêtre de retrait varie selon l'endroit : 240–420 s (fig. 2), « minutes 4–7 » ou 240–430 s (Methods).

**Propriété dérivée** [I, vérifiée numériquement au § 11]. En régime stationnaire avec des retours poissonniens de taux λ, et au-dessus du plancher, la moyenne de l'éq. 3 donne `0 = −q·E[D] + c·λ − d`, d'où **E[D] = (c·λ − d)/q**. Avec d = 0, le gain sortie/entrée vaut c/q. La conservation du flux (sorties = retours, comme chez Pagliara et al. 2018) impose donc c ≈ q = 0,05. On peut en tirer une prédiction testable sur les c ajustés, qui ne sont pas publiés. Sans retour, α décroît d'environ q·α par créneau, donc avec une constante de temps d'environ 1/q = 20 créneaux.

### 3.3 Deux échelles de temps (Pinter-Wollman et al. 2013) [R]

- La fourrageuse sortante vit dans le nid un taux d'interaction qui suit le taux de retour. Ses interactions sont groupées dans l'espace.
- **Activation en quelques secondes** : la fourmi sort de 3 à 8 s après une hausse marquée de ses interactions avec des fourrageuses de retour.
- **Disponibilité en quelques minutes** : si les retours cessent plus de 4 à 5 min, les fourrageuses disponibles près de l'entrée s'enfoncent dans le nid.
- Une rétroaction négative relie activation et disponibilité. L'échelle des secondes donne de la souplesse; celle des minutes, de la robustesse (prédation).
- Le terme q de Prabhakar et al. 2012 en est une version minimale [I].

### 3.4 Boucle fermée excitable (Pagliara et al. 2018) [T]

Données : 2015 à 2017, même site, observations du matin jusqu'à midi environ.

```
ds/dt = −s/τ + k·λ_in                         (4)  intégrateur à fuite des contacts
ε1·ε2·dv/dt = v − v³/3 − c·u − a + s           (5)  FitzHugh-Nagumo, c = « volatilité »
ε1·du/dt = v − c·u                            (6)
```

- Une sortie est comptée chaque fois que v dépasse 0,75.
- Valeurs : k = 0,3, τ = 0,41, a = 0,35, ε1 = 0,2, ε2 = 0,05 (Results, « Foraging dynamics inside the nest »). L'unité de τ n'est pas explicite dans notre lecture.
- Durée du trajet X : loi du χ², de moyenne D minutes (éq. 7); D = 10 min dans la fig. 8.
- La volatilité c est explorée sur [0, 5], avec des exemples à 0,1, 2 et 5 (fig. 7).

**Partie terrain = file M/G/∞**, les auteurs eux-mêmes parlant d'une file à « infinité de serveurs » :

```
E[Q(t′)] = ∫₀^∞ r_out(t′−x)·(1 − F(x;D)) dx        (9)
r_in(t′) = E[ r_out(t′ − X) ]                        (11)
régime stationnaire : r_in = r_out = r ,  E[Q] = r·E[X] = r·D   (12)
```

L'éq. 12 est la loi de Little appliquée au terrain : le nombre moyen de fourrageuses dehors égale le débit multiplié par la durée moyenne du trajet. Les auteurs ne nomment pas Little.

Résultats :
- Il existe une **volatilité critique c\*** : au-dessus, le fourragement se maintient à débit constant (quasi-état stationnaire); en dessous, il s'arrête (fig. 7–8).
- Proposition des auteurs : les fourrageuses ajustent leur volatilité après une première sortie, selon la chaleur et la sécheresse (passage de c_u à c_i).

### 3.5 Décision individuelle par dérive-diffusion (Davidson et al. 2016) [R]

`ds/dt = γ + k·Σ_j δ(t − t_j) + σ·dη/dt`

- Seuils : +1 pour sortir fourrager, −1 pour retourner dans le nid.
- Paramètres de l'exemple « colonie 2 » (fig. 6A) : k = 0,14, γ = −0,038, s₀ = 0,39, σ = 0,21, r_in = 0,083.
- C'est une version individuelle et bruitée du même intégrateur que Pagliara et al. 2018.

---

## 4. Abeilles : ce que disent les sources

### 4.1 L'indice : temps de recherche d'une receveuse (Seeley 1989 [non vérifiée]; Seeley et Tovey 1994 [R])

- Les butineuses n'évaluent pas directement l'état de la colonie (taux d'entrée de nectar, rayons vides). Elles notent la **difficulté à trouver une stockeuse**.
- Les stockeuses ont généralement 12 à 18 jours et forment environ 20 % de la colonie (Seeley 1989 [non vérifiée]) [à confirmer].
- Seeley 1989 [non vérifiée] invoque **explicitement la théorie des files** : l'attente dépend du rapport entre le taux d'arrivée des butineuses chargées et celui des stockeuses vides [à confirmer]. C'est un **indice** (sous-produit), et non un signal évolué.
- Seeley et Tovey 1994 modélisent la recherche comme un échantillonnage. Si la collecte augmente à capacité de traitement constante, la proportion de stockeuses dans la zone baisse, et le nombre attendu de rencontres avant succès augmente « par les lois de la probabilité ».
- Forme utilisée par Edwards et Myerscough 2011 (éq. 1), qui l'attribue à Seeley et Tovey : `S = s_s · (F′ + R′)/R′`. Ici F′ désigne les butineuses en attente et R′ les receveuses disponibles.
- Anderson et Ratnieks 1999a jugent leur discipline SIRO « virtuellement identique » au « modèle d'urne » de Seeley et Tovey.

### 4.2 Les signaux : trémulation, arrêt, frétillante

- **Trémulation** (Seeley 1992 [non vérifiée]). La butineuse secoue son corps en pivotant d'environ 50° par seconde [à confirmer], pendant une trentaine de minutes en moyenne (confirmé par Seeley et al. 1996 [T]), dans le nid à couvain [à confirmer].
  - La danse apparaît de façon fiable après une source riche suivie d'une grande difficulté à trouver une stockeuse [à confirmer].
  - Elle a deux effets : hausse rapide de la capacité de traitement, et baisse du recrutement [S : le TLDR de Semantic Scholar décrit une hausse du traitement et un frein à la hausse de l'apport; l'article n'a pas été lu].
  - Le message diffère selon le public : pour les abeilles d'intérieur, passer au traitement du nectar; pour les butineuses, cesser de recruter [à confirmer].
- **Signaux vibratoires de la trémulation** (Kirchner 1993) [à confirmer]. Rejoués, ils inhibent la danse frétillante et le recrutement. La trémulation est une rétroaction négative opposée à la rétroaction positive de la frétillante. [S : l'audit bio-abeilles, M9, lit dans Seeley et al. 1996 que les vibrations de la trémulation font cesser les danseuses, avec Kirchner 1993 et Nieh 1993 en référence.]
- **Signal d'arrêt** (Nieh 1993 [non vérifiée]). Les danseuses en trémulation en sont les principales émettrices sur la piste de danse. Il fait quitter la piste aux danseuses frétillantes [à confirmer].
- **Cause immédiate** (Kirchner et Lindauer 1994 [non vérifiée]). Plusieurs conditions déclenchent la trémulation; leur point commun est l'allongement du temps *total* de recherche jusqu'au déchargement complet [à confirmer].
- **Nuances** :
  - Avec des sources naturelles, seulement environ la moitié des trémulations sont de type « délai ». Les autres commencent dès l'entrée, souvent après un premier succès (Biesmeijer 2003) [à confirmer].
  - L'expérience hors de la ruche peut aussi la déclencher (Thom 2003) [R].
- **Frétillante** (Seeley 1994) [à confirmer]. Le nombre de tours est linéaire en efficacité énergétique, avec une forte variation individuelle des seuils et des pentes. Le seuil de danse baisse quand la nourriture est rare.

### 4.3 Démonstration directe : receveuses recrutées (Seeley et al. 1996) [T]

Dispositif : ruche d'observation d'environ 4 000 abeilles au départ de l'étude (les effectifs mesurés sont d'environ 3 130 abeilles pour l'essai 1 et d'environ 4 450 pour l'essai 2), à Cranberry Lake (État de New York), une seule source (nourrisseur à 350 m, sucrose 2,0 mol/L), charge de 55 µL par voyage. On mesure les receveuses en **marquant cumulativement** toutes les abeilles vues en train de recevoir pendant 9 à 12 h. Les scans de trémulation ont lieu toutes les 15 min.

| | Essai 1 faible (7 juil.) | Essai 1 fort (8 juil.) | Essai 2 faible (19 juil.) | Essai 2 fort (20 juil.) |
|---|---|---|---|---|
| Butineuses au nourrisseur | 10 | 73 | 14 | 267 |
| Retours (abeilles/min) | 2,0 | 12,8 | 2,7 | 26,5 |
| Afflux (mL/h) | 6,6 | 42,2 | 8,9 | 87,4 |
| Danseuses en trémulation par scan (moy. ± ET) | 0,1 ± 0,3 (n = 40) | 6,7 ± 3,7 (n = 40) | 0,6 ± 0,8 (n = 48) | 19,1 ± 9,0 (n = 36) |
| Receveuses (total, % de l'effectif mesuré) | ≈ 530 (17 %) | > 970 (30 %)\* | ≈ 770 (17 %) | ≈ 2 250 (≈ 50 %) |

\* Incohérence interne : le texte dit 970, mais le tableau 1 donne 950.

Les pourcentages se rapportent aux effectifs mesurés, environ 3 130 abeilles (essai 1) et environ 4 450 (essai 2) [T, vérification indépendante], et non à 4 000, effectif du début de l'étude. Rapportés à 4 000, les mêmes nombres donneraient 13 %, 24 %, 19 % et 56 % [I]. La population se paramètre donc par essai (T-A1).

Autres résultats :
- **Effet de la croissance de la colonie** : seulement 4,5 % (essai 1) et 1,3 % (essai 2) des receveuses supplémentaires.
- **Âges** : aucune nouvelle receveuse n'est vieille; la plupart ont un âge moyen (18–35 j), certaines sont jeunes (0–17 j). L'âge moyen des receveuses passe de 31,0 à 24,2 j (essai 1) et de 24,9 à 19,6 j (essai 2).
- La colonie ajuste à la fois le **recrutement** et l'**abandon** de la tâche (tableau 2) : moins de receveuses passent au butinage quand l'afflux est fort.
- La bascule (de moins de 20 % à plus de 50 % de receveuses) se fait **en moins de 9 h**.
- **Seuil cité dans l'introduction** : une butineuse qui revient d'une source très rentable et doit chercher **plus de 40 s** commence probablement à trembler (citant Seeley 1992 [non vérifiée] et Kirchner et Lindauer 1994 [non vérifiée]).
- **Interprétation des auteurs** : les ouvrières peuvent être « poussées » vers une tâche par l'échec à trouver du travail, mais aussi « tirées » par un signal.

### 4.4 Files d'attente et partitionnement (Anderson et Ratnieks 1999a) [T]

**Modèle** : simulation C à événements discrets. Les ouvrières sont soit butineuses, soit receveuses. Elles transfèrent immédiatement si un partenaire est libre, sinon elles font la queue. Il n'y a **aucun délai de recherche**, et jamais de queue des deux côtés à la fois. Discipline : SIRO ou FCFS.

**Tableau 1 (jeu standard)** :

| Paramètre | Valeur |
|---|---|
| N_f, N_r | 500, 500 |
| durée du voyage de butinage f(·) | N(500, 500) (moyenne, variance) |
| durée du cycle de réception r(·) | N(500, 500) |
| durée du transfert t(·) | N(50, 50) |
| discipline | SIRO |
| simulation | ≥ 30 000 événements de rodage, puis 20 000 à 50 000 de mesure; 10 répétitions par taille (2 au-delà de 2 000 butineuses) |

Les unités de temps sont arbitraires; seuls les rapports comptent. Les auteurs montrent (annexe B) que la forme des lois importe peu : seules la moyenne et la variance comptent.

**Résultats** :
- Le délai décroît à peu près exponentiellement avec la taille de colonie (fig. 2).
- Délai moyen pour une taille de 10 : 12 unités, soit 2,4 % de 500; pour une taille de 1 000 : 0,4 %. La Discussion donne 2,3 % pour la taille 10 : incohérence interne de la source, sans effet à ±15 % [T, vérification indépendante].
- Avec une variance de 6 500 (CV 0,16, comparable à Seeley 1989 [non vérifiée]) : 37 unités (7,4 %) contre 4,5 (0,9 %).
- Discussion : temps perdu de **2,3 / 1,25 / 0,42 / 0,15 %** pour des tailles de **10 / 100 / 1 000 / 10 000** (la taille compte butineuses + receveuses).
- Une proportion optimale unique `p* = (m_f + m_t)/(m_f + m_r + 2m_t)` minimise le délai et maximise le débit (éq. C8); la pénalité est forte dès qu'on s'en écarte (fig. 5, colonie de 100).
- Cas déterministe (variances nulles) :
  `m_q,r = max{0, (N_r/N_f)(m_f + m_t) − (m_r + m_t)}` (éq. C12), et `m_q,f` par symétrie (éq. C14). Ce délai est indépendant de la taille.
- Cas N_f = N_r = 1 : `E = 0,399·√(σ₁² + σ₂²) = 12,62` (éq. C3).
- Durée réelle d'un transfert chez l'abeille : 36,6 ± 22,3 s (Anderson 1998a, thèse).
- **Loi de Little (annexe C, p. 533)** : les auteurs écrivent que leur raisonnement déterministe ressemble à celui de Little (L = λW; Little 1961). Ils ajoutent qu'elle « ne tient pas ici », car le taux d'arrivée des ouvrières est corrélé au nombre en file. Voir § 5.2, point 4.
- Les auteurs évoquent une règle de seuil sur le délai pour changer de tâche, implantée par Anderson 1998b : elle s'avère robuste aux valeurs exactes des seuils.

**Compléments** ([R] pour Ratnieks et Anderson 1999a et Gregson et al. 2003; [à confirmer] pour Anderson et Ratnieks 1999b et Hart et Ratnieks 2001) :
- La qualité de l'information portée par les délais croît avec la taille de colonie. Le groupe en excès est mieux informé. Deux moyens l'améliorent : moyenner sur plusieurs voyages ou sur plusieurs transferts (Ratnieks et Anderson 1999a).
- La trémulation obéit au « meilleur usage » de l'information : le groupe en excès s'applique une rétroaction négative et en applique une positive au groupe en pénurie. Ce n'est pas le cas de la frétillante. Les danses frétillante et de trémulation seraient les régulateurs primaires; les signaux d'arrêt et de secousse, des réglages fins (Anderson et Ratnieks 1999b [non vérifiée]) [à confirmer].
- Les transferts multiples servent à l'échantillonnage de l'information (Hart et Ratnieks 2001) [à confirmer]. Une partie est toutefois un sous-produit non adaptatif des charges partielles, jusqu'à 1,9 transfert par butineuse (Gregson et al. 2003).

### 4.5 Modèle EDO butineuses-receveuses (Edwards et Myerscough 2011) [T]

```
S(t) = s_s · (F′ + R′)/R′                                                        (1)
dF/dt  = f_r·F·[m_S^k/(S^k + m_S^k)]·[Q^j/(Q^j + m_Q^j)] − f_s·F·[S^k/(S^k + m_S^k)]·[m_Q^j/(Q^j + m_Q^j)]
dF′/dt = (F − F′)/f_a − F′/S                                                     (5)
dR′/dt = (R_0 − R′)/r_s − F′/S                                                   (6)
Extension trémulation : dR/dt = β·U(S − m_T)·S^m/(S^m + m_T^m)                    (9)
```

Les équations sont transcrites depuis le préprint arXiv; l'éq. 9 est reconstruite d'un texte extrait (symbole β présumé [à confirmer]) et doit être vérifiée sur la version publiée. La vérification indépendante retrouve dans le préprint β = 5 (fig. 8) et β = 0,1 (fig. 10), mais le symbole de l'éq. 9 est perdu à l'extraction du PDF.

**Tableau 1** :

| Param. | Sens | Valeur | Source citée |
|---|---|---|---|
| s_s | durée d'une approche | 5 s (2–7 s) | Seeley et al. 1991 |
| f_r | taux de recrutement max | 0,0010 s⁻¹ | Seeley et Towne 1992 |
| f_s | taux de repos max | 0,0002 s⁻¹ | Camazine et Sneyd 1991 |
| m_S, k | demi-effet du temps de recherche, pente de Hill | 10 s, 4 | Seeley 1992 [non vérifiée] (fig. 7) |
| m_Q, j | demi-effet de la qualité, pente | 1,5, 4 | Seeley 1986 / 1995 (fig. 5.31) |
| f_a | durée d'un voyage | 15 min (0,5–20) | Seeley 1994 |
| r_s | durée du stockage | 20 min (1–20) | Seeley 1995 |
| m_T, m | seuil et pente de la trémulation | **30 s**, 5 | ajustés sur Seeley 1992 [non vérifiée], fig. 7 |
| β | recrutement max par trémulation | 5 (fig. 8), 0,1 (fig. 10) | — |

Résultats :
- **État stationnaire analytique** (éq. 10) : `S* = m_S·(f_r·Q^j/(f_s·m_Q^j))^{1/k}`.
- L'équilibre sans fourrageuses est instable si `Q > m_Q·(f_s/f_r)^{1/j}·(s_s/m_S)^{k/j}`, soit Q ≈ 0,5.
- Quand la qualité est forte, ce sont les receveuses qui fixent la population de butineuses : avec deux fois moins de receveuses, on a deux fois moins de butineuses (fig. 5a-b). Quand elle est faible, le nombre de receveuses n'a aucun effet (fig. 5c-d).
- Avec la trémulation : si S\* > m_T, les deux populations croissent sans borne et S oscille (fig. 8a, Q = 3). Avec Q = 2, tout se stabilise.
- La trémulation accélère la réallocation après une inversion de qualité des sources (fig. 10).

Calcul de l'auteur du dossier [I] (§ 11) : S\*(Q = 3) = 29,9 s, à la limite de m_T = 30 s. Le comportement de la fig. 8a dépend donc de dépassements transitoires; c'est un point à surveiller en reproduction. La source donne elle-même un critère de stabilité Q ≲ 3 (recalculé par la vérification indépendante : 3,01) [T] : Q = 3 est bien à la frontière.

### 4.6 Seuils de temps d'attente publiés : état vérifié

| Énoncé | Source primaire | Statut |
|---|---|---|
| Plus de 40 s de recherche après une source riche → trémulation probable | Seeley et al. 1996 (intro), citant Seeley 1992 [non vérifiée] et Kirchner et Lindauer 1994 [non vérifiée] | [T] (énoncé secondaire dans un article primaire du même auteur) |
| Demi-suppression de la frétillante à S = 10 s (Hill k = 4) | Edwards et Myerscough 2011, ajusté sur Seeley 1992 [non vérifiée] fig. 7 | [T] (ajustement de modèle, pas une mesure) |
| Début de trémulation à S = 30 s (Hill m = 5) | Edwards et Myerscough 2011, idem | [T] (idem) |
| Le temps *total* de recherche jusqu'au déchargement complet est la cause immédiate | Kirchner et Lindauer 1994 [non vérifiée] | [M]; contenu [à confirmer] |
| « Règle de seuil » de Seeley 1995 : délai → frétillante, trémulation ou aucune danse | Anderson 1998b, citant Seeley 1995 | [R] (valeurs non lues) |
| « < 20 s → frétillante; > 50 s → trémulation » | attribué à Seeley 1992 [non vérifiée]/1995 dans la littérature secondaire | **non vérifié** |

**Action** : numériser la fig. 7 de Seeley 1992 [non vérifiée] (probabilité de chaque danse selon le temps de recherche) avant de fixer un seuil dans la simulation.

---

## 5. La loi de Little (L = λW) : déjà publiée? valide?

### 5.1 Déjà publiée? Oui, sous trois formes

1. **Abeilles, explicitement** : Anderson et Ratnieks 1999a, annexe C [T] cite Little 1961 pour la file butineuses-receveuses.
2. **Fourmis, implicitement** : Pagliara et al. 2018, éq. 12 [T], `E[Q] = r·D` pour la file M/G/∞ du terrain, sans nommer Little.
3. **Cadre de files pour l'indice abeille** : Seeley 1989 [non vérifiée] [à confirmer] et Seeley et Tovey 1994 [R] (échantillonnage et « lois de la probabilité » confirmés par le résumé).

Côté ingénierie, le README de Netflix 2026 nomme explicitement la loi de Little (« Limit = Average RPS * Average Latency »), ce que le dossier ne disait pas [T, vérification indépendante].

**Non trouvé** dans les sources consultées : la mise en regard explicite « la fourmi lit λ, l'abeille lit W, deux lectures de L = λW ». C'est peut-être la seule part originale de v3, sous réserve d'une recherche complète, impossible ici faute de budget.

### 5.2 Valide? Oui comme identité, mais la formulation de v3 est à corriger

| Point | Fourmi moissonneuse | Abeille mellifère |
|---|---|---|
| File concernée | Boucle de terrain : fourrageuses dehors, file M/G/∞ (Pagliara et al. 2018) | Zone de déchargement : file d'appariement entre deux castes (Anderson et Ratnieks 1999a) |
| L | fourrageuses dehors E[Q] | butineuses en attente F′ (ou receveuses en attente) |
| λ | débit de sortie = débit de retour en régime stationnaire | arrivées de butineuses chargées |
| W | durée moyenne du trajet D (recherche + déplacement) | temps de recherche S |
| Grandeur perçue | λ, via le taux de contacts (≈ taux de retour, Pinter-Wollman et al. 2013) | W, son propre temps de recherche (Seeley 1989 [non vérifiée]) [à confirmer] |
| Information inférée | abondance de nourriture : à L fixé, λ = L/D baisse si D augmente [I] | déséquilibre collecte/traitement, c.-à-d. la charge ρ (Seeley 1989 [non vérifiée], Seeley et Tovey 1994) |
| Réponse | sortir ou non (rétroaction positive bornée par q) | frétillante (+ butineuses) ou trémulation/arrêt (+ receveuses, − recrutement) |

**Conclusions** [I appuyée sur Little 2011, Pagliara et al. 2018, Anderson et Ratnieks 1999a] :

1. **Deux files distinctes**, pas « la même file ». La symétrie tient au niveau du principe : régler un flux avec une grandeur mesurée localement, sans vue globale.
2. Little relie trois moyennes, mais ne dit pas pourquoi W renseigne sur ρ. Ce lien vient d'un modèle de file : dans le modèle d'urne, W croît avec (F′ + R′)/R′. On peut donc dire que l'abeille lit W *parce que* W est monotone en ρ, et non à cause de Little.
3. **Fourmi** : la lecture « débit » est exactement Little sur la boucle de terrain, puisque `E[Q] = r·D` est l'éq. 12 de Pagliara et al. 2018. À nombre de fourrageuses dehors donné, un débit plus faible signale un trajet plus long, donc une nourriture plus rare.
4. **Réserve d'Anderson et Ratnieks** : leur affirmation que Little « ne tient pas ici » à cause d'une corrélation entre arrivées et file contredit l'énoncé de Little 2011 [T]. Selon lui, la loi tient sur un intervalle fini sans stationnarité, quelle que soit la discipline, et vaut aussi pour les sous-réseaux et les sous-classes; sur un intervalle fini, la relation LL.1 est exacte pour un système **vide en 0 et en T** [T, vérification indépendante]. Leur réserve vise probablement l'usage de Little pour *dériver* leur délai déterministe (éq. C12), et non l'identité elle-même [I]. À trancher en relisant l'annexe C contre Little 2011, § 2–3.
5. **Contrôle pratique** : dans le moteur de simulation, L = λW doit tenir à ±2 % sur toute fenêtre longue, pour chaque file et chaque sous-classe. C'est un test d'intégrité du moteur, pas un résultat scientifique (cible T-L, § 6). Hors conditions limites (système non vide aux bornes), l'écart tend vers 0 quand la fenêtre s'allonge; le seuil de 2 % est un critère du dossier [I], non tiré de la source.

---

## 6. Résultats cibles et critères d'acceptation

Convention : une graine fixe par répétition, et la moyenne ± IC 95 % sur les répétitions.

| ID | Espèce | Résultat publié (emplacement) | Grandeur mesurée en simulation | Critère d'acceptation | Répétitions |
|---|---|---|---|---|---|
| T-F1 | Fourmi | Modèle éq. 3–4 avec q = 0,05, d = 0, ᾱ = 0,01 (Prabhakar et al. 2012) | E[D]/E[A] en régime stationnaire, entrée Poisson λ ∈ {0,169; 0,807} /créneau, c ∈ {0,025; 0,05; 0,1} | écart relatif à c/q < 10 % (dérivé § 3.2; vérifié : < 5 %) | 1 run de 2·10⁵ créneaux par couple |
| T-F2 | Fourmi | Retrait des retours entre 240 et 420 s → chute puis reprise retardée des sorties (fig. 2) | sorties moyennes sur 300–420 s rapportées à 60–240 s; délai de reprise à 80 % | rapport < 0,2; délai de reprise > 0 et < 120 s (créneau = 1 s, hypothèse) [I : seuils propres au dossier, absents de la source, qui ne donne qu'un retard de reprise qualitatif] | 200 |
| T-F3 | Fourmi | Corrélation retours/sorties simulées (lissage rect. rayon 25) croissante avec le débit moyen (fig. 3; Spearman z = −4,04, n = 62) | ρ de Spearman entre débit moyen (62 essais synthétiques de 0,1 à 1,2 fourmi/s, profil de retrait) et coefficient de corrélation | ρ > 0, p < 0,01 | 62 essais × 200 itérations |
| T-F4 | Fourmi | Activation en 3–8 s; repli des disponibles après plus de 4–5 min sans retour (Pinter-Wollman et al. 2013, résumé) | extension à deux compartiments : délai de sortie après une salve; constante de repli | délai médian ∈ [3, 8] s; pool d'entrée < 50 % après 5 min d'interruption | 100 |
| T-F5 | Fourmi | Volatilité critique c\* : c = 0,1 → arrêt; c = 2 et 5 → débit stationnaire avec r_in = r_out (Pagliara et al. 2018, fig. 7–8, D = 10 min) | débit sur la dernière heure d'un run de 3 h (fig. 8B : D = 10 min, 7 valeurs de c; débit initial de 0,01 fourmi/s, colonie 859, à reproduire [T]) | c = 0,1 : débit < 5 % du pic; c = 2 et 5 : écart r_in/r_out < 10 % | 20 par c |
| T-A1 | Abeille | Receveuses de 17 % à 30 % (2,0 → 12,8 butineuses/min) et de 17 % à ≈ 50 % (2,7 → 26,5/min) en moins de 9 h (Seeley et al. 1996, fig. 1–2, tableau 1) | **cumul** des receveuses distinctes sur 9 h, en % de l'effectif mesuré de l'essai (environ 3 130 abeilles pour l'essai 1, environ 4 450 pour l'essai 2; population paramétrée par essai, et non 4 000; pas l'effectif instantané) | 30 ± 5 points et 50 ± 10 points; contrôle sans trémulation : hausse < 5 points | 20 par scénario |
| T-A2 | Abeille | Trémulation probable au-delà de 40 s de recherche (Seeley et al. 1996 intro) | fraction des retours suivis d'une trémulation selon des classes de S (pas de 10 s) | < 10 % pour S < 20 s; > 50 % pour S > 40 s [I : seuils propres au dossier; la source dit seulement « probablement » au-delà de 40 s, après une source très rentable] (à recaler sur la fig. 7 de Seeley 1992 [non vérifiée] une fois numérisée) | 20 |
| T-A3 | Abeille | Délai moyen / 500 : 2,3 / 1,25 / 0,42 / 0,15 % pour 10 / 100 / 1 000 / 10 000 ouvrières (Anderson et Ratnieks 1999a, discussion; tableau 1) | délai moyen des butineuses, jeu standard, SIRO (taille = butineuses + receveuses; la taille 10 donne 2,4 % dans les Résultats, 2,3 % dans la Discussion) | ±15 % relatif sur chaque point | 10 par taille (2 au-delà de 4 000 ouvrières), 30 000 événements de rodage + 50 000 de mesure |
| T-A4 | Abeille | Cas déterministe, éq. C12/C14; cas 1 + 1, éq. C3 (12,62); p\* = 0,5 (éq. C8) | délais à variances nulles; délai pour N = 2 | déterministe : écart < 1 %; 1 + 1 : 12,62 ± 3 %; délai minimal à p = 0,50 ± 0,02 | 10 |
| T-A5 | Abeille | Équilibre S\* (éq. 10); indépendance vis-à-vis de R quand Q est faible (Edwards et Myerscough 2011, fig. 5) | S(t) après 24 h; F(8 h) pour R = 100 et R = 50 | S\* à ±5 % (Q = 2 → 19,9 s; Q = 3 → 29,9 s); Q = 0,9 : écart F < 5 %; Q = 3 : F(R = 50)/F(R = 100) ≈ 0,5 ± 0,1 | déterministe (1) |
| T-A6 | Abeille | Extension trémulation : Q = 3 → croissance non bornée et S oscillant; Q = 2 → stabilisation (Edwards et Myerscough 2011, fig. 8) | dérivée de R sur 8 h; amplitude des oscillations de S | Q = 3 : R croît encore à 8 h; Q = 2 : dR/dt → 0 | déterministe (1) |
| T-L | Les deux | Identité L = λW (Little 2011; Pagliara et al. 2018 éq. 12) | L mesuré contre λ·W mesuré, pour chaque file et chaque sous-classe | écart < 2 % sur des fenêtres ≥ 100 W [I : critère du dossier, cohérent avec Little 2011 mais non tiré de la source] | toutes les simulations |

---

## 7. Visuels de vulgarisation

1. **« Le portier du tunnel »** (fourmi, Prabhakar et al. 2012). Animation du tunnel d'entrée : chaque fourmi chargée qui entre fait monter la jauge α de c, chaque sortie la fait baisser de q. Un bouton « bloquer les retours de 4 à 7 min » rejoue la fig. 2. Dessous, un chronogramme montre retours, sorties observées (données de la fig. 2 numérisées) et sorties simulées.
2. **« Le quai de déchargement »** (abeille, Seeley et al. 1996, Edwards et Myerscough 2011). Vue de dessus de la zone d'entrée. Chaque butineuse porte un chronomètre dont la couleur change avec S : vert (frétillante), gris, rouge (trémulation). Des receveuses arrivent quand des trémulations ont lieu. Graphes en temps réel : S moyen, % de receveuses (cumulé et instantané), nombre de danseuses. Un scénario guidé rejoue les journées de faible et fort afflux.
3. **« Un triangle, deux files »** (§ 5). Le même triangle L–λ–W apparaît deux fois. Côté fourmi, un curseur « rareté des graines » allonge W = D et fait baisser λ à L fixé. Côté abeille, un curseur « afflux » fait monter λ, puis L et W. Un encadré dit en clair ce que chaque espèce perçoit.
4. **« Le seuil de volatilité »** (Pagliara et al. 2018). Diagramme en toile d'araignée : courbe entrée/sortie du nid (r_out en fonction de r_in) et diagonale. Le curseur c montre la bascule entre fourragement soutenu et arrêt.
5. **« Les grandes colonies attendent moins »** (Anderson et Ratnieks 1999a). Taille de colonie en échelle log de 10 à 10 000, délai en % de la durée de cycle, avec les 4 points publiés superposés. Un second curseur fait varier p et montre le creux à p\*.
6. **« Pousser ou tirer »** (Seeley et al. 1996). Bande dessinée en deux cases : l'ouvrière poussée vers une tâche par l'échec, puis tirée par un signal (trémulation). Dans la page agentique, la même paire devient retry/backoff contre message explicite.

---

## 8. Parallèles agentiques appuyés par des sources

| Mécanisme biologique | Contrepartie technique (source vérifiée) | Portée pour des agents LLM |
|---|---|---|
| Boucle fermée fourmi : r_in = r_out en régime stationnaire (Pagliara et al. 2018) | « Conservation des paquets » et **auto-cadencement** par les accusés de réception : un nouveau paquet n'entre que lorsqu'un ancien sort (Jacobson et Karels 1988, § 1) | Un essaim d'agents sans orchestrateur cale sa concurrence sur le rythme des tâches *réussies* qui reviennent |
| Démarrage par les patrouilleuses puis montée graduelle (Gordon 2002); analogie de démarrage lent du communiqué (Carey 2012, Gordon 2014) | Démarrage lent de TCP (Jacobson et Karels 1988); « limites d'accélération » : monter le trafic graduellement (Anthropic 2026) | Lancer un essaim avec peu d'agents et ajouter de la concurrence à mesure des succès |
| Abeille : indice = **délai**, pas longueur de file (Seeley 1989 [non vérifiée]) [à confirmer] | CoDel contrôle le *temps de séjour* plutôt que la longueur : indépendant du débit du lien, cible 5 ms, intervalle 100 ms (Nichols et al. 2018); limite Vegas fondée sur min RTT contre RTT échantillonné (Netflix 2026) | Réguler un pool d'agents par la latence observée des appels (outils, API), indépendamment du débit absolu |
| Loi de Little sur la file (Anderson et Ratnieks 1999a; Pagliara et al. 2018) | `Limit = RPS moyen × latence moyenne` (Netflix 2026); données en vol ≈ BDP = bw × min_rtt (Cardwell et al. 2022) | Dimensionner la concurrence d'agents : L = λ·W |
| Trémulation : + receveuses (augmentation des consommateurs) **et** − recrutement par les signaux d'arrêt (Seeley 1992 [non vérifiée], Kirchner 1993 [à confirmer], Nieh 1993 [non vérifiée]) | Contre-pression *pilotée par la demande* : un éditeur n'émet pas plus que la demande signalée par `request(n)` (Reactive Streams 2026, règle 1.1) | Le consommateur saturé signale « moins » aux producteurs *et* « plus » à son pool : deux messages, deux publics |
| Signal explicite contre indice implicite (Seeley 1989 [non vérifiée] : l'indice est un sous-produit; Seeley 1992 [non vérifiée] : la trémulation est un signal) | 429 + `retry-after` (signal explicite) contre latence croissante (indice implicite); seau à jetons (Anthropic 2026) | Comparer un essaim qui ne lit que la latence (fourmi/abeille-indice) à un essaim qui lit aussi des signaux explicites (abeille-signal) |
| Transferts multiples pour mieux échantillonner le délai (Hart et Ratnieks 2001 [à confirmer]; Ratnieks et Anderson 1999a) | Moyennes mobiles et fenêtres d'échantillonnage dans les algorithmes de limite (Netflix 2026, Gradient2) | Moyenner plusieurs mesures de latence avant de décider; une seule mesure est trop bruitée |
| Délai décroissant avec la taille de colonie (Anderson et Ratnieks 1999a) | Mutualisation des serveurs [I : résultat classique de files, non sourcé ici] | Un grand pool partagé d'agents attend moins qu'une série de petits pools |
| Réponse plus faible, puis repli des disponibles après 4–5 min sans retour (Prabhakar et al. 2012, terme d; Pinter-Wollman et al. 2013) | Expiration de délai (timeout); arrêt des sorties après plus de 20 min sans retour (Carey 2012, **source primaire non trouvée**) | Mettre en veille les agents après une période sans succès plutôt que de les laisser sonder |

À noter : l'analogie TCP est celle de Prabhakar et Gordon, rapportée par le communiqué et Gordon 2014, et non celle de l'article de 2012. L'analogie CoDel/abeille est une proposition du dossier [I]; elle n'a pas été trouvée publiée.

---

## 9. Corrections et approximations dans v3 (Projet 4)

1. **« analogue à TCP (Prabhakar, Dektar, Gordon 2012; Gordon 2010 Ant Encounters) »**
   - L'article de 2012 ne parle pas de TCP (Prabhakar et al. 2012 [T]; Gordon 2016 [T] non plus). L'analogie vient du communiqué de Stanford (Carey 2012, 24 août 2012) et de Gordon 2014 (section « Operating Costs »).
   - Ant Encounters (Gordon 2010 [non vérifiée]) précède l'analogie; s'il en parle, ce n'est pas vérifié : contenu non lu, rien ne permet de citer ce livre pour l'analogie TCP.
   - Corriger les citations en conséquence.
2. **Modèle sous-spécifié** : v3 ne dit pas qu'un seul paramètre (c) est ajusté, ni que q, d et ᾱ sont fixés. La durée du créneau n'est pas publiée, et les c ajustés non plus. Sans les données brutes, la reproduction de la fig. 3 ne peut qu'être qualitative.
3. **« Seeley 1992; Seeley et Tovey 1994 »** : il manque Seeley 1989 [non vérifiée], à l'origine de l'indice et du cadre de files [à confirmer]. Il manque aussi Seeley et al. 1996, la preuve directe : receveuses de 17 % à 30–50 %.
4. **« danse frétillante ou de trémulation »** : présentation trop binaire.
   - La trémulation agit dans deux directions : recruter des receveuses **et** freiner le recrutement, via les signaux vibratoires et les signaux d'arrêt (Kirchner 1993 [à confirmer], Nieh 1993 [non vérifiée]).
   - La réponse est probabiliste, et elle dépend aussi de la rentabilité de la source.
   - En conditions naturelles, environ la moitié des trémulations ne sont pas causées par un délai (Biesmeijer 2003) [à confirmer].
5. **Seuils** : v3 n'en donne pas, mais la proposition dit « seuils de temps d'attente publiés ». Les seules valeurs vérifiées sont > 40 s, m_S = 10 s et m_T = 30 s (§ 4.6). Le couple 20/50 s souvent cité n'est pas vérifié.
6. **« loi de Little; rapprochement non publié, de l'auteur »** : faux.
   - Anderson et Ratnieks 1999a cite Little explicitement.
   - Pagliara et al. 2018 en écrit l'équation pour les fourmis.
   - Seeley 1989 [non vérifiée] poserait le cadre de files [à confirmer]. Le verdict « faux » tient sur les deux premières sources, lues en texte intégral.
7. **« deux lectures de la même file »** : inexact. Ce sont deux files distinctes (§ 5.2). La fourmi ne mesure pas un débit au sens strict : elle intègre des contacts antennaires dont le taux suit le taux de retour, sur deux échelles de temps (Pinter-Wollman et al. 2013).
8. **« À reproduire : le fourragement suit la nourriture disponible »** : trop vague pour être réfutable. Le remplacer par les critères T-F1 à T-F5.
   - Il faut aussi noter que le modèle 2012 corrèle *plus* fort que les données : c'est une limite reconnue par les auteurs (nid, météo).
9. **« la colonie rééquilibre collecte et traitement »** : à quantifier (T-A1, T-A3, T-A5).
   - La colonie agit sur le recrutement **et** sur l'abandon (Seeley et al. 1996, tableau 2).
   - Anderson et Ratnieks expliquent que la colonie combine recrutement et abandon plutôt que des changements de sous-tâche (Anderson et Ratnieks 1999b [non vérifiée]) [à confirmer].
10. **Pinter-Wollman et al.** : v3 ne précise pas l'article. Celui qui sert P4 est Pinter-Wollman et al. 2013 (*Anim Behav* 86(1): 197–207). Pinter-Wollman et al. 2011 [non vérifiée] (*J R Soc Interface*, réseaux d'interaction) n'a pas été vérifié.
11. **Manques** :
    - Pagliara et al. 2018 : boucle fermée, file M/G/∞ et seuil de volatilité. C'est le meilleur pont formel vers Little et vers le contrôle de congestion.
    - Edwards et Myerscough 2011 : seul modèle EDO butineuses-receveuses-trémulation trouvé, avec paramètres.
    - Anderson et Ratnieks 1999a : seul modèle de file avec cibles chiffrées.
12. **Agentique** : « backpressure par débit ou par latence » est juste sur le fond. Il faut l'appuyer sur Jacobson et Karels 1988 (débit/ACK), Nichols et al. 2018 et Netflix 2026 (latence), et Reactive Streams 2026 (contre-pression explicite), et distinguer *indice* et *signal* (§ 8).

---

## 10. Questions ouvertes

1. **Durée du créneau de Prabhakar et al. 2012** : non publiée. Elle vaut probablement 1 s, vu les unités en fourmis/s [I]. Le plus sûr serait d'obtenir les données et le code du labo Gordon, ou de chercher un dépôt de données.
2. **Valeurs de c ajustées** : non publiées. La prédiction c ≈ q (§ 3.2) est testable avec les données brutes.
3. **« Plus de 20 min sans retour → plus aucune sortie »** : affirmation du communiqué Carey 2012. La source primaire est probablement Gordon et al. 2008 ou 2011; à vérifier.
4. **Fig. 7 de Seeley 1992 [non vérifiée]** : texte intégral non consulté. Il faut la numériser pour T-A2 et pour valider m_S et m_T.
5. **Équations exactes de Seeley et Tovey 1994** : texte intégral non consulté. La forme utilisée ici vient d'Edwards et Myerscough 2011.
6. **Réserve d'Anderson et Ratnieks sur Little** : à confronter à Little 2011 (§ 5.2, point 4).
7. **Version publiée d'Edwards et Myerscough 2011** (JTB 271: 64–77) : à comparer au préprint, notamment l'éq. 9, le symbole β et les valeurs m_T et m.
8. **Unités de τ et k dans Pagliara et al. 2018**, et valeurs de N et de c\* : à vérifier dans les annexes S1–S4.
9. **Ant Encounters (Gordon 2010 [non vérifiée])** : contenu non lu. Il faut vérifier ce qu'il dit des files, des taux et des réseaux techniques avant de le citer pour P4.
10. **Recherche à compléter** (budget épuisé) :
    - le terme « Little's law » combiné à ant/honeybee dans Google Scholar;
    - Thenius et al. 2008 (apprentissage social fondé sur les délais de file; métadonnées confirmées [M], contenu non lu);
    - Burd 1996 (serveurs, Atta; métadonnées confirmées [M], contenu non lu);
    - Huang et Seeley 2003 [non vérifiée] (déchargements multiples).
11. **Choix pour le moteur commun** : faut-il simuler la file d'abeilles avec un délai de recherche (modèle d'urne) ou sans (Anderson et Ratnieks)? Les deux cibles l'exigent séparément, d'où deux modes à prévoir.
12. **Mesure des receveuses dans Seeley et al. 1996** : c'est un cumul de marquage sur une journée, rapporté à l'effectif mesuré de chaque essai (environ 3 130 et 4 450 abeilles). Le simulateur doit tracer cette grandeur, et non l'effectif instantané, sous peine d'un faux échec de T-A1.

---

## 11. Vérifications numériques (script `p4_checks_regulation.py`)

Emplacement : `recherche/verifications-numeriques/p4_checks_regulation.py` (numpy seulement). Sortie obtenue le 2026-10-01 :

```
lambda=0.169 c=0.025  E[D]/E[A]=0.523  c/q=0.50
lambda=0.169 c=0.050  E[D]/E[A]=1.004  c/q=1.00
lambda=0.169 c=0.100  E[D]/E[A]=2.001  c/q=2.00
lambda=0.807 c=0.025  E[D]/E[A]=0.500  c/q=0.50
lambda=0.807 c=0.050  E[D]/E[A]=1.000  c/q=1.00
lambda=0.807 c=0.100  E[D]/E[A]=2.000  c/q=2.00
retrait : sortie avant=0.801/s pendant=0.016/s délai de reprise à 80 % ~ 36 s (médiane)
Q=2.0: S(24 h)= 19.9 s  S*= 19.9 s  F=  76.2
Q=3.0: S(24 h)= 29.9 s  S*= 29.9 s  F=  77.1
Q=0.9 : F(8 h) R=100 -> 16.60, R=50 -> 16.58
OK
```

Lecture des résultats :
- Le gain c/q se confirme.
- Pendant le retrait, les sorties simulées tombent près du plancher ᾱ en moins d'une minute (constante de temps 1/q). C'est une prédiction à confronter à la fig. 2, où la baisse observée semble moins complète; à vérifier sur les données.
- S\* d'Edwards et Myerscough 2011 est retrouvé, et l'indépendance vis-à-vis de R à faible qualité aussi.
- Non couverts par le script : T-A3 et T-A4 (simulation à événements d'Anderson et Ratnieks 1999a) et T-F5 (Pagliara et al. 2018).

---

## 12. Historique de vérification

**Vérification indépendante du 2026-10-01** (`recherche/verifications/p4-regulation.md`) : 45 références (19 confirmées, 20 corrigées, 6 non vérifiables, 0 fausse); aucune référence inventée; les corrections portent sur des DOI ou numéros manquants (13 cas) et sur des points d'interprétation (7 cas). Les résultats cibles et paramètres ont été confrontés aux textes lus (Prabhakar et al. 2012, Pagliara et al. 2018, Seeley et al. 1996, Anderson et Ratnieks 1999a, préprint d'Edwards et Myerscough 2011, Little 2011, Jacobson et Karels 1988, Gordon 2016). **Consolidation du même jour** : corrections appliquées en place, sans changement de fond; étiquettes normalisées; légende de vérification alignée sur celle du programme.

### 12.1 Corrections appliquées

**Références (métadonnées, versions, statuts)**

1. Prabhakar et al. 2012 : « ET 0,077 » et « ET 0,009 » sont des erreurs-types (SE), pas des écarts-types (§ 3.2).
2. Prabhakar et al. 2012 : les « 13 % / 2,6 % / 15,5 % » mesurent la variation du RMSE, non la variabilité des sorties (§ 3.2).
3. Greene et Gordon 2007 : DOI 10.1093/beheco/arl105 ajouté.
4. Gordon 2013 : « dépenser de l'eau pour obtenir de l'eau » est retiré de son résumé et attribué à l'introduction de Prabhakar et al. 2012 (§ 3.1). Le résumé de Gordon 2013, relu à la consolidation (Europe PMC, PMID 23676676), confirme le reste : dessiccation coûteuse, colonies plus réussies qui fourragent moins par temps sec, production de colonies-filles.
5. Gordon et al. 2008, Gordon et al. 2011, Schafer et al. 2006 : titres et DOI ajoutés (10.1093/beheco/arm125; 10.1093/beheco/arq218; 10.1016/j.anbehav.2005.05.024); numérotation de Prabhakar et al. 2012 recoupée (réf. 27 à 29, liste PMC lue); la ligne unique « NC » devient trois entrées [M].
6. Seeley 1992 : numéro 6 ajouté (31(6)). Kirchner 1993 : numéro 3 et DOI 10.1007/BF00216597. Biesmeijer 2003 : 53(6): 411–416, DOI 10.1007/s00265-003-0597-0. Ratnieks et Anderson 1999b : numéro 2, DOI 10.1007/s000400050119. Anderson 1998b : 1(2–3), DOI 10.1142/S0219525998000181 (« Anderson 1998b » d'Anderson et Ratnieks 1999a). Hart et Ratnieks 2001 : 49(4): 244–250 et erratum 49(4): 330 (DOI 10.1007/s002650100340). Gregson et al. 2003 : titre complet « (*Apis mellifera*) » et DOI 10.1016/S0022-5193(02)00487-3. Seeley 1995 : titre complet et DOI 10.4159/9780674043404. Seeley 1986 : titre, 19(5), DOI 10.1007/BF00295707. Seeley 1994 : titre, 34(1), DOI 10.1007/BF00175458. Thenius et al. 2008 : référence complète (*Connection Science* 20(2–3): 193–210) et DOI 10.1080/09540090802091982. Burd 1996 : référence complète (*Am Nat* 148(4): 613–629) et DOI 10.1086/285943.
7. Little 2011 : titre exact « OR FORUM—Little's Law as viewed on its 50th anniversary »; précision : sur un intervalle fini, LL.1 est exacte pour un système vide en 0 et en T (§ 5.2, point 4). Little 1961 : « NC » devient [M].
8. Anderson et Ratnieks 1999a : incohérence interne de la source signalée (taille 10 : 2,4 % dans les Résultats, 2,3 % dans la Discussion; sans effet à ±15 %); la taille compte butineuses + receveuses.
9. Précisions de forme confirmées par la vérification : Edwards et Myerscough 2011 (numéro 1, PMID 21126525), Pinter-Wollman et al. 2013 (numéro 1), Jacobson et Karels 1988 (version de novembre 1988), Nichols et al. 2018 (janvier 2018; deux éditeurs), Cardwell et al. 2022 (auteurs, 7 mars 2022, URL de la version -02), Gordon 2016 (aucune occurrence de « internet » non plus). Netflix 2026 nomme explicitement la loi de Little (§ 5.1).
10. Gordon 2010 : contenu non lu; rien ne permet de citer ce livre pour l'analogie TCP; marqué « [non vérifiée] » (§ 9, point 1; question 9).

**Résultats cibles et paramètres**

11. T-A1 : dénominateur corrigé. Les pourcentages se rapportent aux effectifs mesurés, environ 3 130 abeilles (essai 1) et environ 4 450 (essai 2), non à 4 000 (effectif du début de l'étude); à 4 000, on obtiendrait 13 %, 24 %, 19 % et 56 % [I]. Population paramétrée par essai; § 4.3 et question 12 mises à jour.
12. T-F2 et T-A2 : seuils (rapport < 0,2; reprise entre 0 et 120 s; < 10 % sous 20 s; > 50 % au-delà de 40 s) étiquetés [I], critères propres au dossier, absents des sources.
13. T-L : seuil de 2 % étiqueté [I]; hors conditions limites, l'écart tend vers 0 quand la fenêtre s'allonge (Little 2011).
14. T-F5 : débit initial de la fig. 8B (0,01 fourmi/s, colonie 859, D = 10 min, 7 valeurs de c) ajouté comme donnée à reproduire.
15. T-A3 : clarification de la taille (butineuses + receveuses) et de l'incohérence 2,4 % contre 2,3 %.
16. § 4.5 et T-A6 : la source donne elle-même un critère de stabilité Q ≲ 3 (recalculé : 3,01); Q = 3 est à la frontière.
17. Éq. 9 d'Edwards et Myerscough 2011 : β = 5 (fig. 8) et 0,1 (fig. 10) confirmés dans le préprint; le symbole de l'éq. 9 reste « [à confirmer] ».

**Conclusions mises à jour**

18. § 1 (point 3) et § 9 (point 6) : « la loi de Little est déjà publiée dans ce contexte » tient sur Anderson et Ratnieks 1999a et Pagliara et al. 2018, lues en texte intégral; l'appui de Seeley 1989 [non vérifiée] est désormais [à confirmer].
19. § 1 (point 2), § 4.2 et § 8 : la double action de la trémulation (receveuses en plus, recrutement en moins) repose en partie sur des références non vérifiées (Seeley 1992, Nieh 1993, Kirchner 1993); elle est appuyée par Seeley et al. 1996 [T] pour les receveuses, et par deux sources secondaires [S] pour le frein (TLDR Semantic Scholar de Seeley 1992; audit bio-abeilles, M9).

**Statuts, marques, étiquettes**

20. Marques « [non vérifiée] » posées là où ces références sont citées : Gordon 2010, Seeley 1989, Seeley 1992, Kirchner et Lindauer 1994, Nieh 1993, Anderson et Ratnieks 1999b. Marques « [à confirmer] » sur les contenus non retrouvés : Seeley 1989 (stockeuses de 12 à 18 jours, environ 20 % de la colonie, théorie des files), Seeley 1992 (50°/s, nid à couvain, deux publics, fig. 7), Kirchner 1993, Kirchner et Lindauer 1994, Nieh 1993, Biesmeijer 2003 (« environ la moitié »), Anderson et Ratnieks 1999b, Hart et Ratnieks 2001, Seeley 1994.
21. Légende de vérification alignée sur le programme : TI, RÉS, MÉTA, NC, [inférence] deviennent [T], [R], [M], [S], [I]; ajout de [à confirmer] et [non vérifiée]. Pour les références Springer non retrouvées, le [R] initial est retiré au profit de [M] (section 2).
22. Étiquettes « Nom année » dans tout le dossier; clés internes retirées. Suffixes : Anderson et Ratnieks 1999a et 1999b; Ratnieks et Anderson 1999a et 1999b; Anderson 1998a (thèse) et 1998b. Organisations sans sigle : Netflix 2026 et Reactive Streams 2026 (année de consultation; pages non datées), Anthropic 2026 (comme dans `x-methodes.md`, où l'étiquette désigne d'autres pages de la documentation).
23. Section 2.4 ajoutée : références nommées dans le texte et absentes des tableaux (Alizadeh et al. 2008, Anderson 1998a, Seeley et al. 1991, Seeley et Towne 1992, Camazine et Sneyd 1991, Pinter-Wollman et al. 2011, Huang et Seeley 2003). Métadonnées issues de la liste de références de Prabhakar et al. 2012 (PMC) ou de Crossref; aucun contenu lu; toutes « non vérifiée ».
24. Hors rapport, par exactitude : chemin du script de vérification (`p4_checks.py` devenu `recherche/verifications-numeriques/p4_checks_regulation.py`) et renvoi interne inexistant « § 5.3 » remplacé par « § 5.2, point 4 ».

### 12.2 Réserves restantes

1. **Huit articles *Behav Ecol Sociobiol* non vérifiés** (Springer bloque l'accès, résumés masqués) : Seeley 1989, Seeley 1992, Kirchner 1993, Kirchner et Lindauer 1994, Nieh 1993, Biesmeijer 2003, Anderson et Ratnieks 1999b, Hart et Ratnieks 2001 (auxquels s'ajoute Seeley 1994 pour son contenu). Trancher : consultation en bibliothèque, en priorité Seeley 1992 (fig. 7, à numériser pour T-A2 et pour m_S, m_T) et Seeley 1989. Tant que ce n'est pas fait, les énoncés qui en dépendent restent [à confirmer] (§ 4.1, § 4.2, § 8).
2. **Gordon 2010** : contenu non lu.
3. **Edwards et Myerscough 2011** : version publiée (JTB 271: 64–77) non comparée au préprint; symbole de l'éq. 9 à confirmer.
4. **Couple « < 20 s / > 50 s »** : non vérifié (§ 4.6); seuils de T-F2 et T-A2 non publiés [I].
5. **Section 2.4** : références connues par leurs seules métadonnées; pagination finale de Seeley et al. 1991 et de Seeley et Towne 1992 à confirmer; liste d'auteurs d'Alizadeh et al. 2008 tronquée dans la source.
6. **Questions de la section 10** : durée du créneau et valeurs de c de Prabhakar et al. 2012 (non publiées), unités de τ et k de Pagliara et al. 2018, équations de Seeley et Tovey 1994, source primaire du seuil de plus de 20 minutes sans retour, recherche « Little's law » combinée à ant/honeybee.
7. **Lectures de la consolidation** (WebFetch sur Crossref, Europe PMC, PMC, Semantic Scholar; l'outil de recherche scientifique a refusé, quota mensuel épuisé) : résumé de Gordon 2013, liste de références de Prabhakar et al. 2012, métadonnées de la section 2.4, TLDR de Seeley 1992. Aucune absence de source n'est conclue d'un refus d'accès.

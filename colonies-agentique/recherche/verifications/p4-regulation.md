# Vérification indépendante — dossier P4 « Régulation sans vue globale »

Vérificateur : passe sceptique du 2026-10-01. J'ai consulté chaque source moi-même, sans me fier au dossier.

## Moyens et limites

- **Métadonnées** : API Crossref et Europe PMC, Semantic Scholar, OpenAlex, pages des éditeurs.
- **Texte intégral lu et extrait localement** (`pdftotext`) :
  - prabhakar2012 et pagliara2018 (PDF PLOS);
  - skw1996 (PDF de Konstanz);
  - anderson_ratnieks1999a (White Rose);
  - edwards2011 (préprint arXiv);
  - little2011, jacobson1988 et gordon2016.
  Les extraits sont dans `scratchpad/verif-p4/*.txt`.
- **Résumés lus** dans Europe PMC ou chez l'éditeur : pinterwollman2013, gordon2002, gordon2013, greene2007, ratnieks_anderson1999b, gregson2003, thom2003, seeley_tovey1994 (via OpenAlex) et davidson2016 (Frontiers).
- **Inaccessibles** :
  - Springer (*Behav Ecol Sociobiol*) bloque l'accès, et les résumés y sont masqués partout (Semantic Scholar, OpenAlex). Le contenu de seeley1989, seeley1992, kirchner1993, kirchner_lindauer1994, nieh1993, biesmeijer2003, anderson_ratnieks1999bes et hart_ratnieks2001 reste donc **non vérifié**. Leurs métadonnées, elles, sont confirmées.
  - Le dépôt KOPS de Konstanz est protégé par un anti-robot. J'ai utilisé le PDF de skw1996 déjà téléchargé pendant la session.
- **Budgets épuisés** : WebSearch (200/200) et Consensus (30/30). Aucune recherche plein texte n'a été possible.

## 1. Références : statut

Légende des statuts :
- **C** : confirmée (existe, métadonnées exactes, affirmations vérifiées ou non contestées);
- **Corr.** : corrigée;
- **NV** : non vérifiable;
- **F** : fausse.

### 1.1 Fourmis

| Clé | Statut | Correction / remarque | URL |
|---|---|---|---|
| prabhakar2012 | Corr. | Métadonnées exactes, PLoS Comput Biol 8(8): e1002670. Les écarts « (ET 0,077) » et « (ET 0,009) » sont des **erreurs-types** (SE), pas des écarts-types. Les « 13 % / 2,6 % / 15,5 % » mesurent la **variation du RMSE**, pas la variabilité des sorties. Le reste est confirmé mot pour mot (voir § 2). | https://doi.org/10.1371/journal.pcbi.1002670 |
| stanford2012 | C | Bjorn Carey, *Stanford Report*, 24 août 2012. TCP, démarrage lent et « plus de 20 minutes » confirmés. | https://biox.stanford.edu/highlight/stanford-researchers-discover-anternet |
| gordon2014 | C | 12(3): e1001805. La seule mention de TCP est dans la section « Operating Costs ». | https://doi.org/10.1371/journal.pbio.1001805 |
| gordon2010 | NV | Métadonnées exactes : Princeton UP, coll. Primers in Complex Systems, 184 p., ISBN 978-0-691-13879-4, DOI 10.1515/9781400835447. Contenu non lu : rien ne permet de citer ce livre pour l'analogie TCP. | https://press.princeton.edu/books/paperback/9780691138794/ant-encounters |
| gordon2016 | C | Cell Systems 3(6): 514–520. Aucune occurrence de « TCP » ni de « internet » (texte intégral cherché). | https://doi.org/10.1016/j.cels.2016.10.013 |
| pinterwollman2013 | C | Anim Behav 86(1): 197–207; 7 auteurs dans l'ordre exact. Le résumé confirme : 3–8 s, plus de 4–5 min, regroupement spatial, rétroaction négative, flexibilité et robustesse face à la prédation. | https://doi.org/10.1016/j.anbehav.2013.05.012 |
| pagliara2018 | C | 14(12): e1006200. Éq. 4–6, 9, 11 et 12, paramètres, seuil 0,75, file à « infinite number of servers », 2015–2017 : tout est confirmé (voir § 2). | https://doi.org/10.1371/journal.pcbi.1006200 |
| davidson2016 | C | Front Ecol Evol 4: 115. Éq. 2, seuils ±1 et paramètres de la fig. 6A (k = 0,14, γ = −0,038, s₀ = 0,39, σ = 0,21, r_in = 0,083) confirmés. | https://doi.org/10.3389/fevo.2016.00115 |
| gordon2002 | C | Am Nat 159(5): 509–518. Le résumé confirme : patrouilleuses déclencheuses, et sensibilité moindre au retour des fourrageuses qu'à celui des patrouilleuses. | https://doi.org/10.1086/339461 |
| greene2007 | Corr. | DOI à ajouter : **10.1093/beheco/arl105**. Le résumé confirme « 1 patroller mimic every 10 s » comme taux le plus stimulant. | https://doi.org/10.1093/beheco/arl105 |
| gordon2013 | Corr. | Nature 498(7452): 91–93; addendum 542(7640): 260 (2017), doi 10.1038/nature21057, confirmés. **Attribution à corriger** : « dépenser de l'eau pour obtenir de l'eau » n'est pas dans le résumé de gordon2013, mais dans l'introduction de prabhakar2012. Le résumé de gordon2013 parle des coûts de dessiccation et de la retenue par temps sec chez les colonies qui réussissent. | https://doi.org/10.1038/nature12137 |
| gordon2019 | C | Annu Rev Entomol 64: 35–50. | https://doi.org/10.1146/annurev-ento-011118-111923 |
| gordon2008 | Corr. | Gordon, Holmes, Nacu, « The short-term regulation of foraging in harvester ants », Behav Ecol 19(1): 217–222. DOI **10.1093/beheco/arm125** (en ligne en 2007). Réf. 28 de prabhakar2012. | https://doi.org/10.1093/beheco/arm125 |
| gordon2011 | Corr. | Gordon, Guetz, Greene, Holmes, « Colony variation in the collective regulation of foraging by harvester ants », Behav Ecol 22(2): 429–435. DOI **10.1093/beheco/arq218**. Réf. 29. | https://doi.org/10.1093/beheco/arq218 |
| schafer2006 | Corr. | Schafer, Holmes, Gordon, « Forager activation and food availability in harvester ants », Anim Behav 71(4): 815–822. DOI **10.1016/j.anbehav.2005.05.024**. Réf. 27, source du plancher ᾱ = 0,01. | https://doi.org/10.1016/j.anbehav.2005.05.024 |

### 1.2 Abeilles

| Clé | Statut | Correction / remarque | URL |
|---|---|---|---|
| seeley1989 | NV | Métadonnées exactes : 24(3): 181–199. Contenu non vérifié : stockeuses de 12 à 18 jours, environ 20 % de la colonie, recours explicite à la théorie des files. Le TLDR de Semantic Scholar parle seulement de « queue length ». | https://doi.org/10.1007/BF00292101 |
| seeley1992 | NV | Métadonnées exactes : 31(**6**): 375–383. Non vérifiés : 50°/s, nid à couvain, double effet, deux publics, fig. 7. La durée d'« environ une demi-heure » est confirmée, mais par skw1996. | https://doi.org/10.1007/BF00170604 |
| seeley_tovey1994 | C | Anim Behav 47(2): 311–316. Résumé lu : il confirme l'échantillonnage et les « rules of probability ». | https://doi.org/10.1006/anbe.1994.1044 |
| skw1996 | Corr. | Métadonnées et chiffres exacts (voir § 2). **Correction de cible (T-A1)** : les pourcentages sont calculés sur les effectifs mesurés, soit environ 3 130 abeilles (essai 1) et environ 4 450 (essai 2), et non 4 000. Les 4 000 abeilles correspondent seulement au début de l'étude. | https://doi.org/10.1007/s002650050309 |
| kirchner_lindauer1994 | NV | Métadonnées exactes : 35(5): 303–308. Contenu (« temps total de recherche ») non vérifié. | https://doi.org/10.1007/BF00184419 |
| kirchner1993 | Corr. | Ajouter le n° 3 et le DOI **10.1007/BF00216597** (BES 33(3): 169–172). Contenu non vérifié. | https://doi.org/10.1007/BF00216597 |
| nieh1993 | NV | Métadonnées exactes : 33(1): 51–56. Contenu non vérifié : les danseuses en trémulation seraient les principales émettrices du signal d'arrêt. | https://doi.org/10.1007/BF00164346 |
| biesmeijer2003 | Corr. | Ajouter : BES **53(6): 411–416**, DOI **10.1007/s00265-003-0597-0**. Le chiffre « environ la moitié des trémulations » n'est pas vérifié. | https://doi.org/10.1007/s00265-003-0597-0 |
| thom2003 | C | J Exp Biol 206(13): 2111–2116. Le résumé confirme : l'encombrement au nourrisseur augmente la trémulation, et les danseuses venues de sources naturelles ont souvent un délai court. | https://doi.org/10.1242/jeb.00398 |
| anderson_ratnieks1999a | Corr. | Métadonnées et chiffres confirmés (voir § 2). **Incohérence interne de la source, non signalée par le dossier** : pour une taille de 10, les Résultats donnent 2,4 % (12/500) et la Discussion 2,3 %. | https://eprints.whiterose.ac.uk/id/eprint/1304/ |
| ratnieks_anderson1999b | C | Am Nat 154(5): 536–548, PMID 10561126. Le résumé confirme : qualité croissante avec la taille, groupe en excès mieux informé, deux moyennages. | https://doi.org/10.1086/303256 |
| ratnieks_anderson1999c | Corr. | Ajouter le n° 2 et le DOI **10.1007/s000400050119** (Insectes Soc 46(2): 95–108). | https://doi.org/10.1007/s000400050119 |
| anderson_ratnieks1999bes | NV | Métadonnées exactes : 46(2): 73–81. Contenu non vérifié : « meilleur usage » de l'information, régulateurs primaires. | https://doi.org/10.1007/s002650050595 |
| anderson1998 | Corr. | Ajouter : Adv Complex Syst **1(2–3)**: 267–282, DOI **10.1142/S0219525998000181**. C'est l'« Anderson 1998b » d'anderson_ratnieks1999a. | https://doi.org/10.1142/S0219525998000181 |
| hart_ratnieks2001 | Corr. | Compléter : BES **49(4): 244–250** (en ligne en 2000, numéro de 2001). Erratum : BES 49(4): 330, DOI 10.1007/s002650100340. Contenu non vérifié. | https://doi.org/10.1007/s002650000306 |
| gregson2003 | Corr. | Titre exact : « …in the honey bee **(Apis mellifera)**: a simulation model ». DOI **10.1016/S0022-5193(02)00487-3**. Le résumé confirme « as many as 1.9 » et le sous-produit non adaptatif. | https://doi.org/10.1016/S0022-5193(02)00487-3 |
| edwards2011 | C | J Theor Biol 271(1): 64–77, PMID 21126525; préprint arXiv:1007.3311. Tableau 1, éq. 1, 9 et 10, fig. 5, 8 et 10 confirmés dans le préprint. Version publiée non consultée. | https://doi.org/10.1016/j.jtbi.2010.11.027 |
| seeley1995 | Corr. | Ajouter : *The Wisdom of the Hive: The Social Physiology of Honey Bee Colonies*, Harvard UP, DOI **10.4159/9780674043404**. | https://doi.org/10.4159/9780674043404 |
| seeley1986 | Corr. | Titre : « Social foraging by honeybees: how colonies allocate foragers among patches of flowers », BES 19(5): 343–354. DOI **10.1007/BF00295707**. | https://doi.org/10.1007/BF00295707 |
| seeley1994 | Corr. | Titre : « Honey bee foragers as sensory units of their colonies », BES 34(1): 51–62. DOI **10.1007/BF00175458**. Contenu non vérifié. | https://doi.org/10.1007/BF00175458 |
| thenius2008 | Corr. | Thenius, Schmickl, Crailsheim, « Optimisation of a honeybee-colony's energetics via social learning based on queuing delays », *Connection Science* 20(2–3): 193–210. DOI **10.1080/09540090802091982**. | https://doi.org/10.1080/09540090802091982 |
| burd1996 | Corr. | Burd, « Server system and queuing models of leaf harvesting by leaf-cutting ants », Am Nat 148(4): 613–629. DOI **10.1086/285943**. | https://doi.org/10.1086/285943 |

### 1.3 Files d'attente et ingénierie

| Clé | Statut | Correction / remarque | URL |
|---|---|---|---|
| little1961 | C | Oper Res 9(3): 383–387, existence confirmée. Le statut NC du dossier peut passer à MÉTA. | https://doi.org/10.1287/opre.9.3.383 |
| little2011 | Corr. | 59(3): 536–549, titre « OR FORUM—Little's Law as Viewed on Its 50th Anniversary ». **Précision** : sur un intervalle fini, LL.1 est exacte pour un système **vide en 0 et en T**. La non-stationnarité et l'indépendance vis-à-vis de la discipline, des sous-réseaux et des sous-classes sont confirmées. | https://doi.org/10.1287/opre.1110.0940 |
| jacobson1988 | C | Version de novembre 1988, « very slightly revised » par rapport à SIGCOMM '88. « Conservation of packets », auto-cadencement et démarrage lent confirmés. | https://ee.lbl.gov/papers/congavoid.pdf |
| rfc8289 | C | Nichols, Jacobson, McGregor (éd.), Iyengar (éd.), janvier 2018, Experimental. TARGET de 5 ms, INTERVAL de 100 ms, temps de séjour indépendant du débit du lien : confirmés. | https://www.rfc-editor.org/rfc/rfc8289.html |
| bbr_draft | C | draft-02, 7 mars 2022 (Cardwell, Cheng, Hassas Yeganeh, Swett, Jacobson). `BBR.bdp = BBR.bw * BBR.min_rtt` confirmé. | https://datatracker.ietf.org/doc/html/draft-cardwell-iccrg-bbr-congestion-control-02 |
| netflix_cl | C | « Limit = Average RPS * Average Latency » confirmé. Le README **nomme explicitement la loi de Little**, ce que le dossier ne dit pas. Vegas (minRTT/sampleRtt) et Gradient2 (deux moyennes exponentielles) confirmés. | https://github.com/Netflix/concurrency-limits |
| reactive_streams | C | Version 1.0.4. La règle 1.1 interdit d'émettre plus que la demande. | https://github.com/reactive-streams/reactive-streams-jvm |
| anthropic_rl | C | Seau à jetons, 429 avec `retry-after`, et limites d'accélération (« ramp up your traffic gradually ») : confirmés le 2026-10-01. | https://platform.claude.com/docs/en/api/rate-limits |

**Bilan** : 45 références; 19 confirmées, 20 corrigées, 6 non vérifiables, 0 fausse. Aucune référence n'est inventée. Les corrections portent sur des DOI ou des numéros manquants (13 cas) et sur des points d'interprétation (7 cas).

## 2. Résultats cibles et paramètres

### 2.1 Fourmis

| Élément | Verdict | Détail (lu dans la source) |
|---|---|---|
| Éq. 3–4, α₀ = 0, plancher ᾱ = 0,01 fourmi/s [réf. 27] | Confirmé | prabhakar2012, p. 3 |
| q = 0,05 (pour garder α entre 0,15 et 1,2 fourmi/s), d = 0, c balayé de 0,01 à 0,25 | Confirmé | idem |
| Durée du créneau | Confirmé (absente de la source) | Seule l'unité vidéo (1/30 s) est donnée |
| RMSE de 0,237 à 4,9; moyenne 0,602 | Corrigé | Le 0,077 est une **SE** |
| Erreur de variation totale 0,056, sur 39 essais, fenêtre 60–240 s, intervalle de 1,02 s | Corrigé | Le 0,009 est une **SE** |
| 13 %, 2,6 %, 15,5 % | Précisé | Ce sont des « change in RMSE » |
| t = 8,98; Spearman n = 62, z = −4,04, p = 0,0001; z = −1,34, p = 0,18; lissage rectangulaire de rayon 25 créneaux | Confirmé | |
| 0,807 et 0,169 fourmi/s (fig. 2); retrait 240–420 s (fig. 2), 240–430 s (Methods), « minutes 4–7 » | Confirmé | |
| 62 essais (33 + 29), 13 colonies (9 + 8 − 4), plus de 5 ans, Rodeo (Nouveau-Mexique), erreur de 7,3 %, AnTracks | Confirmé | |
| « ratio of c to e », « varying u » | Confirmé | Coquilles présentes dans la source |
| TCP absent; « computer networks to neural integrators »; Alizadeh et al. 2008 (réf. 34) | Confirmé | 0 occurrence de « TCP » dans le PDF |
| Retard de reprise (justifie un terme du modèle) | Confirmé | « a lag in the recovery… (Fig. 2) » |
| **T-F2** : rapport < 0,2, reprise entre 0 et 120 s | **Absent de la source** | Seuils propres au dossier. La source ne donne qu'un retard qualitatif. À présenter comme critère dérivé. |
| T-F1 : gain c/q | Inférence (dérivation correcte) | En régime stationnaire au-dessus du plancher, E[D] = (cλ − d)/q. Non publié. |
| T-F4 : 3–8 s; plus de 4–5 min | Confirmé | Résumé de pinterwollman2013 |
| Pagliara : k = 0,3, τ = 0,41, a = 0,35, ε₁ = 0,2, ε₂ = 0,05; seuil v > 0,75; X ~ χ² de moyenne D minutes (éq. 7) | Confirmé | Le dossier retranscrit correctement les éq. 5–6, le FitzHugh-Nagumo avec c dans les deux équations. |
| Éq. 9, 11, 12 (`E[Q] = r·D`); « infinite number of servers »; Little non nommé | Confirmé | |
| **T-F5** : c = 0,1 → arrêt; c = 2 et 5 → r_in = r_out (fig. 7); fig. 8B : 3 h, D = 10 min, 7 valeurs de c | Confirmé | Nuance : le débit initial de la fig. 8B (0,01 fourmi/s, colonie 859) est une donnée à reproduire. |
| c_u → c_i selon la chaleur et la sécheresse | Confirmé | |
| Observations « jusqu'à midi environ », 2015–2017 | Confirmé | Août et septembre |

### 2.2 Abeilles

| Élément | Verdict | Détail (lu dans la source) |
|---|---|---|
| skw1996 : Cranberry Lake, environ 4 000 abeilles au départ, nourrisseur à 350 m, 2,0 mol/L, 55 µL, scans aux 15 min, marquage cumulatif sur 9–12 h | Confirmé | |
| 10 / 73 / 14 / 267 butineuses; 2,0 / 12,8 / 2,7 / 26,5 par min; 6,6 / 42,2 / 8,9 / 87,4 mL/h; danseuses 0,1 ± 0,3 (n = 40), 6,7 ± 3,7 (40), 0,6 ± 0,8 (48), 19,1 ± 9,0 (36) | Confirmé | |
| Receveuses : 530 (17 %), > 970 (30 %) dans le texte contre 950 au tableau 1, 770 (17 %), 2 250 (≈ 50 %) | Confirmé | L'incohérence 970/950 est bien dans la source. |
| **T-A1, dénominateur** | **Corrigé** | Les pourcentages se rapportent à environ **3 130** abeilles (essai 1) et environ **4 450** (essai 2), et non à 4 000. Rapportés à 4 000, on obtiendrait 13 %, 24 %, 19 % et 56 %. Il faut paramétrer la population par essai. |
| 4,5 % et 1,3 % dus à la croissance; âges 31,0 → 24,2 j et 24,9 → 19,6 j; tableau 2 (abandon); « within 9 h », de < 20 % à > 50 %; « pushed/pulled » | Confirmé | |
| « Plus de 40 seconds » (intro de skw1996, citant Seeley 1992 et Kirchner et Lindauer 1994) | Confirmé | |
| **T-A2** : < 10 % sous 20 s, > 50 % au-delà de 40 s | **Absent de la source** | La source dit seulement « likely » au-delà de 40 s, après une source très rentable. |
| Seeley 1992, fig. 7 | Non vérifiable | Source inaccessible |
| Anderson et Ratnieks, tableau 1 : N_f = N_r = 500; N(500, 500), N(500, 500), N(50, 50); SIRO; ≥ 30 000 itérations de rodage + ≥ 20 000 (typiquement 50 000) de mesure; 10 répétitions (2 au-delà de 2 000 butineuses) | Confirmé | |
| **T-A3** : 2,3 / 1,25 / 0,42 / 0,15 % pour 10 / 100 / 1 000 / 10 000 (Discussion) | Confirmé | La taille compte butineuses + receveuses. Dans les Résultats, la taille 10 donne 2,4 % (incohérence interne, sans effet à ±15 %). |
| 37 unités (7,4 %) contre 4,5 (0,9 %) avec une variance de 6 500 (CV 0,16) | Confirmé | |
| **T-A4** : C3 = 0,399·√(500 + 500) = 12,62; C8 donne p\* = 0,5; C12 et C14 indépendants de la taille | Confirmé | |
| Transfert de 36,6 ± 22,3 s | Confirmé | Source : thèse de doctorat d'Anderson (1998a) |
| Little (annexe C, p. 533) : « does not hold here » à cause de la corrélation entre arrivées et file | Confirmé | |
| Discipline SIRO « virtually identical » au modèle d'urne de Seeley et Tovey | Confirmé | |
| Règle de seuil d'Anderson (1998b), robuste | Confirmé | |
| edwards2011, tableau 1 (préprint) : s_s = 5 s (2–7), f_r = 0,0010 s⁻¹, f_s = 0,0002 s⁻¹, m_S = 10 s, k = 4, m_Q = 1,5, j = 4, f_a = 15 min (0,5–20), r_s = 20 min (1–20) | Confirmé | L'extraction PDF décale la colonne des valeurs d'une ligne; réalignée et recoupée avec le texte (k = 4, m_S = 10, j = 4, m_Q = 1,5). |
| m = 5, m_T = 30; éq. 9 avec β = 5 (fig. 8) et 0,1 (fig. 10) | Confirmé (préprint) | Le symbole de l'éq. 9 est perdu à l'extraction : vérifier sur la version publiée. |
| **T-A5** : S\* (éq. 10) | Confirmé (recalculé) | Q = 2 → 19,9 s; Q = 3 → 29,9 s |
| Instabilité de l'équilibre nul si Q > ≈ 0,5 | Confirmé (recalculé) | 1,5·0,2^¼·0,5 ≈ 0,50 |
| Fig. 5 : R/2 → F/2 à Q = 3; aucun effet de R à Q = 0,9 | Confirmé | |
| **T-A6** : Q = 3 → R non borné et S oscillant; Q = 2 → stabilisation | Confirmé | La source donne elle-même un critère de stabilité Q ≲ 3 (recalculé : 3,01). Q = 3 est donc à la frontière, ce qui confirme la mise en garde du dossier. |

### 2.3 Loi de Little et parallèles techniques

| Élément | Verdict | Détail |
|---|---|---|
| Little déjà publiée dans ce contexte (anderson_ratnieks1999a, annexe C; pagliara2018, éq. 12) | Confirmé | La mention de v3 « non publié » est bien fausse. Ajout : netflix_cl nomme aussi Little. |
| Seeley 1989 « cadre de files » | Non vérifiable | Résumé inaccessible |
| T-L : L = λW à ±2 % sur des fenêtres ≥ 100 W | Cohérent avec little2011 | Hors conditions limites (système non vide aux bornes), l'écart tend vers 0 quand la fenêtre s'allonge. Le critère est raisonnable mais n'est pas tiré de la source. |
| Analogie TCP : absente de prabhakar2012 et de gordon2016; présente dans stanford2012 et gordon2014 | Confirmé | |

## 3. À faire avant de figer P4

1. Corriger ET en SE pour prabhakar2012, et corriger le dénominateur de T-A1.
2. Ajouter les 13 DOI ou numéros manquants (§ 1).
3. Étiqueter T-F2 et T-A2 comme critères dérivés par le dossier, non publiés.
4. Consulter en bibliothèque les huit articles Springer (*BES*) restés non vérifiés, en priorité seeley1992 (fig. 7) et seeley1989.

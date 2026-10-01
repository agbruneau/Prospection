# Vérification indépendante — dossier x-choregraphie

Date : 2026-10-01. Vérificateur indépendant; aucune affirmation du dossier n'a été tenue pour acquise.

**Verdict.** Aucune référence fausse ni inventée. Les 42 références de la liste principale existent et leurs métadonnées sont exactes pour l'essentiel. Il y a 8 corrections mineures (titre, sous-titre, pagination, section, page, attribution, nuance de portée) et 2 points non vérifiables (un numéro d'article ACM, deux paramètres de la fig. 5 de Marshall). Les résultats cibles T1 à T13 figurent bien dans les sources citées, avec deux réserves sur T1.

## Méthode

- **Métadonnées** : API Crossref, OpenAlex, Semantic Scholar, Europe PMC et arXiv (via WebFetch), plus les pages des éditeurs (OMG, W3C, Princeton UP, Cambridge Core, ITU, AAAI).
- **Textes intégraux téléchargés et extraits** (pdftotext; pages numérisées lues en image) :
  - BPMN 2.0.2 (PDF OMG complet);
  - Marshall et al. 2009 (version anticipée, 9 p.);
  - Couzin 2009 (copie d'auteur);
  - Feinerman & Korman 2017 (arXiv);
  - Heylighen 2016 I et II (prépublications VUB);
  - Garcia-Molina & Salem 1987 (scan Cornell, texte OCR);
  - Nii 1986 (scan AAAI, p. 38, 39, 43 et 44 lues en image);
  - thèse de Montesi 2013 (pages liminaires).
- **Résumés lus mot à mot** : tous les arXiv cités, Carbone & Montesi 2013, Honda et al. 2008 et 2016, Scalas & Yoshida 2019, Montesi 2023 ch. 4, Theraulaz & Bonabeau 1999, Erman et al. 1980, Peltz 2003.
- **Inaccessibles** : ACM DL (403), DBLP (anti-robot), Google Books (429). Le quota WebSearch était épuisé (200/200).
- **Formules DDM de M9** : vérifiées par dérivation et par Monte-Carlo, pas dans Bogacz et al. 2006 (paywall).

Légende : **C** = confirmée; **Corr.** = confirmée après correction; **NV** = non vérifiable; **F** = fausse.

## 1. Références : statut, correction, URL

### Chorégraphie, orchestration, sagas, événements

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| peltz2003 | C | Computer 36(10):46-52, oct. 2003, auteur Chris Peltz (HP). Le résumé n'a que deux phrases, et les définitions attribuées à Peltz restent non lues, comme le dossier le signale déjà. | https://api.crossref.org/works/10.1109/MC.2003.1236471 |
| wscdl2005 | C | Six éditeurs exacts. Statut : CR du 9 nov. 2005. Groupe fermé le 10 juil. 2009. §1 et §1.5 confirmés. | https://www.w3.org/TR/ws-cdl-10/ ; https://www.w3.org/2002/ws/chor/ |
| bpmn2013 | Corr. | Couverture : « Date: December 2013 », formal/2013-12-09 (la page OMG indique janvier 2014). §7.2.1 p. 23, §11.1 p. 315, §11.3, §11.5.6 p. 335-336 et tableau 11.6 p. 340 confirmés. **Les conditions de passerelle en langue naturelle (« underspecified and would not be enforceable ») sont au §11.7.1, p. 344, et non au §11.6.** BPMN 2.0 : formal/11-01-03, déc. 2010 (C). | https://www.omg.org/spec/BPMN/2.0.2/PDF |
| montesi2013 | C | ITU Copenhague, août 2013 (publication ITU-DS n° 104, 2014). ISBN imprimé 978-87-7949-299-8 confirmé. LCL, Chor → Jolie, asynchronie et mobilité confirmés dans le résumé. | https://researcher.itu.dk/en/publications/choreographic-programming |
| carbone2013 | C | POPL '13, p. 263-274. Le résumé confirme EPP vers le π-calcul, la vérification contre des sessions multipartites et le *deadlock-freedom-by-design*. | https://api.openalex.org/works/doi:10.1145/2429069.2429101 |
| montesi2023 | Corr. | Cambridge UP, en ligne le 11 mai 2023. **Cambridge Core indique 244 p., et non 253.** Ch. 4 « Endpoint Projection », p. 76-90, DOI .006 confirmé. La phrase « descriptions of desired emergent behaviour » figure bien dans le résumé du ch. 4. | https://www.cambridge.org/core/product/identifier/9781108981491/type/book ; https://api.openalex.org/works/doi:10.1017/9781108981491.006 |
| choral2024 | C | TOPLAS 46(1), **p. 1-59** (à ajouter). arXiv:2005.09520 : premier langage chorégraphique « based on mainstream abstractions »; le compilateur produit une implémentation Java par rôle. | https://api.crossref.org/works/10.1145/3632398 ; https://arxiv.org/abs/2005.09520 |
| honda2008 | C | POPL '08, **p. 273-284** (à ajouter). Le résumé confirme le type global comme « shared agreement », la projection, la sûreté, le progrès et la fidélité. | https://api.openalex.org/works/doi:10.1145/1328438.1328472 |
| honda2016 | NV (partiel) | JACM 63(1), p. 1-67, 3 mars 2016 : confirmé. **Le numéro d'article 9 n'est pas vérifiable** : Crossref, OpenAlex et S2 ne donnent que les pages, et ACM DL comme DBLP sont bloqués. | https://api.openalex.org/works/doi:10.1145/2827695 |
| scalas2019 | C | PACMPL 3(POPL), 1-29. Le résumé confirme « flawed type safety proofs ». Note : leur théorie se passe des types globaux, ce qui est utile pour M3. | https://api.semanticscholar.org/graph/v1/paper/DOI:10.1145/3290343 |
| pact2026 | C | Cinq auteurs exacts, 4 mai 2026. Note : c'est le résumé d'une **présentation** (« In this talk »), avec une implémentation préliminaire; la citer comme telle. « Every Pact protocol maps to a formal game » est confirmé. | https://arxiv.org/abs/2605.03143 |
| gms1987 | Corr. | SIGMOD '87, p. 249-259 : confirmé. La garantie T1…Tn / T1…Tj, Cj…C1 est confirmée. **Nuance de portée** : le texte dit « Due to space limitations, we only discuss sagas in a centralized system, although clearly they can be implemented in a distributed database system ». La restriction est donc éditoriale, pas conceptuelle. Le SEC est confirmé. La borne de j reste illisible dans l'OCR (« 0 < J < 12~111 »). | https://www.cs.cornell.edu/andru/cs711/2002fa/reading/sagas.pdf |
| richardson-saga | C | Définition, chorégraphie et orchestration, compensations, absence d'isolation : confirmées. Page non datée. | https://microservices.io/patterns/data/saga.html |
| fowler2017 | C | 7 fév. 2017. Quatre motifs. « not explicit in any program text » est confirmé. | https://martinfowler.com/articles/201701-event-driven.html |

### Stigmergie, tableaux noirs, auto-organisation

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| grasse1959 | C | Insectes Sociaux 6(1):41-80, 1959. | https://api.openalex.org/works/doi:10.1007/BF02223791 |
| tb1999 | C | Artificial Life 5(2):97-116. Le résumé Europe PMC confirme le paradoxe et la distinction quantitative / qualitative. | Europe PMC, PMID 10633572 |
| heylighen2016a | C | CSR 38:4-13 (en ligne en déc. 2015). Définition p. 6 et P(action\|condition) > P(action) p. 7 confirmées. Absence de garantie d'usage optimal de la main-d'œuvre : §5, p. 9. | https://pespmc1.vub.ac.be/Papers/StigmergyICognSystems.pdf |
| heylighen2016b | Corr. | CSR 38:50-59 : confirmé. **DOI manquant à ajouter : 10.1016/j.cogsys.2015.12.007.** Contenu des §2 à §5 confirmé, y compris persistant → asynchrone, transitoire → synchrone, et l'oubli optimal selon la vitesse d'obsolescence. | https://pespmc1.vub.ac.be/Papers/StigmergyIICognSystems.pdf |
| parunak1997 | C | Ann. Oper. Res. 75:69-101. | https://api.openalex.org/works/doi:10.1023/A:1018980001403 |
| parunak2006 | Corr. | LNCS 3830, p. 163-186 : confirmé. **Attribution à corriger** (§3.4) : Heylighen 2016b §3 attribue le terme « sematectonic » à Wilson (1975) et seulement le terme « marker-based stigmergy » à Parunak 2006. Ce n'est donc pas toute la distinction. | https://api.openalex.org/works/doi:10.1007/11678809_10 |
| erman1980 | C | ACM Comput. Surv. 12(2):213-253. Le résumé confirme le « general framework for coordinating independent processes » et le « focus-of-control mechanism ». | https://api.openalex.org/works/doi:10.1145/356810.356816 |
| nii1986 | Corr. | AI Magazine 7(2):38-53, été 1986 : confirmé. **Titre à corriger** : l'article imprimé et l'éditeur portent « The Blackboard Model of Problem Solving and the Evolution of Blackboard Architectures », sous la bannière « Part One ». Le préfixe « Blackboard systems: » ne figure pas sur l'article. P. 39 (trois composantes, légende de la fig. 1, note 6), p. 43 et p. 44 (cycle en quatre étapes) confirmées. | https://ojs.aaai.org/aimagazine/index.php/aimagazine/article/view/537 |
| camazine2001 | C | Six auteurs, © 2001, broché le 17 sept. 2003, 562 p., Princeton Studies in Complexity. Définition de l'auto-organisation confirmée. | https://press.princeton.edu/books/paperback/9780691116242/self-organization-in-biological-systems |
| bdt1999 | C | OUP, 21 oct. 1999, DOI confirmé. | https://api.openalex.org/works/doi:10.1093/oso/9780195131581.001.0001 |

### Cognition individuelle et collective, superorganisme

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| fk2017 | C | JEB 220(1):73-82; arXiv:1701.05080. | https://arxiv.org/pdf/1701.05080 |
| couzin2009 | Corr. | TiCS 13(1):36-43 (en ligne le 6 déc. 2008). Faits des p. 39 et 41 et des encadrés 2 et 3 confirmés. **Le terme « super-organisms » est à la p. 40, et non à la p. 41** (§3.8). | https://www.icts.res.in/sites/default/files/Couzin_2009_Cognition.pdf |
| marshall2009 | NV (paramètres T1) | JRSI 6(40):1065-1074, six auteurs, PMC2827444 : confirmé. Équations 4.1, 4.2 et 6.1 à 6.6 conformes au texte. **Deux paramètres de T1 sont non vérifiables tels qu'écrits** : le texte dit seulement que q1−q2 et r′1−r′2 ont été « simultaneously varied ». L'égalité q1−q2 = r′1−r′2 n'est pas énoncée, et la plage [−1, 1] se lit seulement sur les axes de la fig. 5. Le matériel supplémentaire n'a pas été consulté. | https://www.cs.unm.edu/~wjust/CS523/S2018/Readings/Marshall2009.pdf |
| bogacz2006 | Corr. | Psychol. Rev. 113(4):700-765 : confirmé. **Titre incomplet** : ajouter le sous-titre « A formal analysis of models of performance in two-alternative forced-choice tasks ». | https://api.openalex.org/works/doi:10.1037/0033-295X.113.4.700 |
| hw2009 | C | Norton, ISBN 9780393067040, 522 p. selon OpenLibrary, qui date la parution de 2008. L'usage courant cite 2009 (date du copyright). Contenu non lu, comme le dossier le signale. | https://openlibrary.org/isbn/9780393067040.json |

### Agentique

| Clé | Statut | Correction ou note | URL de vérification |
|---|---|---|---|
| a2a | C | Version 1.0.0. §1.2 « without needing to share their internal thoughts, plans, or tool implementations » : confirmé. Trois mécanismes : sondage, flux, push. **Précision** : l'énumération TaskState compte 9 valeurs, dont UNSPECIFIED, soit 8 états opérationnels. Aucune occurrence d'orchestration ni de chorégraphie dans le contenu rendu, mais la page pourrait avoir été tronquée. | https://a2a-protocol.org/latest/specification/ |
| anthropic2025 | C | 13 juin 2025. +90,2 % (évaluation interne), environ 15 fois plus de jetons, 50 sous-agents, recherches dupliquées : confirmés. **Précision** : « 80 % de la variance » expliqués par les jetons vaut pour BrowseComp, à dire dans le tableau du §6. Le statut est incohérent dans le dossier ([R] au §7, [L] en §11). | https://www.anthropic.com/engineering/multi-agent-research-system |
| hanzhang2025 | C | arXiv:2507.01701. Consensus et moins de jetons : confirmés. | https://arxiv.org/abs/2507.01701 |
| salemi2025 | C | Huit auteurs exacts. 13-57 % : confirmé. | https://arxiv.org/abs/2510.01285 |
| cemri2025 | C | 1600+ traces, 7 cadriciels, 14 modes, 3 catégories, κ = 0,88 : confirmés (v3, 26 oct. 2025). | https://arxiv.org/abs/2503.13657 |
| kim2025 | C | Accord de 60 % quand les deux modèles se trompent, « on one leaderboard dataset » : confirmé. **À ajouter** : acceptée à ICML 2025. | https://arxiv.org/abs/2506.07962 |
| kohli2026 | C | 9 juges ≈ 2 votes indépendants, Kish n_eff : confirmés (trois jeux NLI). | https://arxiv.org/abs/2605.29800 |
| wu2024 | C | — | https://arxiv.org/abs/2407.02209 |
| li2024 | C | Échantillonnage et vote : confirmé. | https://arxiv.org/abs/2402.05120 |
| du2023 | C | — | https://arxiv.org/abs/2305.14325 |
| pal2026 | C | Exploration, construction, maintenance, coordination; réutilisation surtout par observation physique; « Physical stigmergy alone supports capable societies »; best-of-N compétitif pour le meilleur artefact : tout est confirmé mot à mot. | https://arxiv.org/abs/2608.26081 |
| fokoue2026 | C | Prépublication v2. | https://arxiv.org/abs/2603.20328 |
| gorinevski2026 | C | Citée en §11, jamais utilisée dans le texte. | https://arxiv.org/abs/2604.05080 |

### Références de seconde main (déjà marquées [NV] par le dossier)

Confirmées à travers les listes de références lues :

- Britton et al. 2002, Proc. R. Soc. B 269(1498):1383-1388 (OpenAlex);
- Couzin et al. 2005, Nature 433:513-516 (OpenAlex);
- Pratt et al. 2002, Behav. Ecol. Sociobiol. 52:117-127 (réf. 53 de Couzin);
- Alon et al. 2011, « Many Random Walks Are Faster Than One », Comb. Probab. Comput. 20:481-502 (liste de Feinerman & Korman).

Nieh 1993, Visscher 2007, Seeley 2003, Usher & McClelland 2001 et Wald & Wolfowitz 1948 n'ont pas été vérifiées.

## 2. Résultats cibles et paramètres

| Cible ou affirmation | Statut | Ce que dit la source (lu) |
|---|---|---|
| T1 : k = 0 minimise ⟨DT⟩; r1 − r2 = 2; k ∈ [0, 1] | C | §7 : « r1−r2 = 2 », « decay k varying between 0 and 1 », « setting k=0 is robustly optimal as it minimizes expected decision time across all scenarios considered ». Encart de la fig. 5 : axe ⟨DT⟩ de 0,72 à 0,86. |
| T1 : q1 − q2 = r′1 − r′2 ∈ [−1, 1]; rapport 1,17 ± 0,05 | NV | « simultaneously varied », sans égalité énoncée. La plage vient des axes de la fig. 5. Le rapport 1,17 est une lecture graphique (0,85/0,725) que le texte ne donne pas. À présenter comme lecture graphique [I]. |
| T2 : Usher-McClelland avec w = k grands → DDM | C | §4 : « when w=k and both of these parameters are relatively high, the Usher-McClelland model approximates optimal decision-making ». Les seuils chiffrés sont [I]. |
| T3 : modèle 6.3 non réductible | C | §6.2 : « can neither be reduced to two independent random processes, nor does it asymptotically converge to the diffusion model ». La preuve est dans le matériel supplémentaire. |
| T4 : 14 % vs 3,8 % | C | §8 : « 14 per cent of commitment switches from poor to good nest occurred through recruitment, compared with 3.8 per cent of switches from good to poor nest ». **À ajouter** : note 2, nids distants de 10 cm, une condition de calibration. |
| T5 : 50-200 ouvrières, ≈ 30 % d'éclaireuses, transport ≈ 3 fois plus rapide | C | Couzin p. 41 (« between 50 to 200 », « Approximately 30% », « approximately three times faster [53] »). Quorum abaissé en urgence et bassin limité d'éclaireuses : confirmés. |
| T6 : période ≈ 20 min, 70 % inactif | C | Couzin, encadré 2, fig. I : « periodicity of 20 min », « 70% of their time inactive », « [71-74] ». |
| T7 : 100 individus, deux sous-groupes de 5 | C | Couzin, fig. 1a : « five individuals in each subset », « group size was 100 ». |
| T8 : garantie des sagas | C | Garcia-Molina & Salem §1. La borne de j est illisible (déjà signalé). Nuance de portée centralisée : voir gms1987. |
| T9 : absence d'interblocage par construction | C (résumé) | Carbone & Montesi 2013 et Honda 2008 (résumés). Le critère est [I]. |
| T10 : règle de séquencement BPMN | C | §11.5.6, p. 335 : « The Initiator of a Choreography Activity MUST have been involved (as Initiator or Receiver) in the previous Choreography Activity ». |
| T11 : 60 % | C | Kim et al., résumé (voir kim2025). |
| T12 : 9 juges ≈ 2 votes | C | Kohli, résumé. |
| T13 : accélération négligeable du temps de couverture | C | Feinerman & Korman : « in grid topologies … negligible speed-up in cover time (Alon et al., 2011) ». Le passage au tore 2D est [I]; Alon et al. n'a pas été lu. |
| M5 à M8 (éq. 4.1, 4.2, 6.1 à 6.6) | C | Conformes au texte extrait : recrutement linéaire (fourmi) contre quadratique (abeille); q_i indépendant de la qualité en 6.3; connaissance globale exigée pour la fourmi; A = (r1 − r2)/√2. |
| M9 : ER = 1/(1+e^{2Az/c²}), DT = (z/A)·tanh(Az/c²) | C (math), NV (source) | Dérivées par la fonction d'échelle et vérifiées par Monte-Carlo (A = 0,5, c = 1, z = 1 : ER 0,263 simulé contre 0,269 théorique; DT 0,95 contre 0,92, biais de discrétisation attendu). L'attribution à Bogacz 2006 n'est pas vérifiée dans le texte. |
| Marshall §8 : le signal d'arrêt inhibe la danse (Nieh 1993); suggestion de Visscher 2007; inhibition puis recrutement ≈ basculement direct; Seeley 2003 (décroissance) | C | Mot à mot au §8, p. 7. |
| Marshall §5 : « without central control », abeille : décision séparée de l'exécution | C | §5, p. 4. |
| Couzin p. 39 : sagesse des foules conditionnelle | C | « this argument assumes that individuals have access to the same noisy information ». |
| Couzin p. 41 : phéromones multiples, mémoire de travail, attention sélective; danse ∝ qualité; décroissance constante; quorum | C | Mot à mot. |
| Couzin, encadré 3 : rétroactions explicites et/ou émergentes | C | « implemented explicitly in individual rules and/or in dynamical collective properties that emerge ». |
| F&K : localité des signaux; mélange et anonymat; meneur de *P. longicornis* ≈ 10 s; hypothèse d'amplification; rumeurs difficiles | C | Tout est lu dans le texte arXiv. |
| Heylighen I : définition, formule, absence de planification et de contrôle, absence de garantie d'optimalité | C | p. 6, 7 et 9. |
| Nii : « no control flow; the knowledge sources are self-activating »; note 6; « Interaction … solely through the blackboard »; cycle en 4 étapes; terminaison | C | p. 39, 43 et 44 (images). |
| BPMN : « no central controller, responsible entity, or observer »; compensation dans un seul participant; Signal sans destinataire | C | p. 23; tableau 11.6, p. 340; p. 340-342. |
| SwarmWorld, Salemi, Han & Zhang, Cemri, Anthropic | C | Voir le §1. |

## 3. Corrections à reporter dans le dossier

1. Section 11, nii1986 : remplacer le titre par « The blackboard model of problem solving and the evolution of blackboard architectures » et garder la mention « (Part one) » entre parenthèses.
2. Section 11, bogacz2006 : ajouter le sous-titre.
3. Section 11, heylighen2016b : ajouter https://doi.org/10.1016/j.cogsys.2015.12.007.
4. Section 11 : ajouter les pages de honda2008 (273-284) et de choral2024 (1-59). Pour honda2016, retirer « art. 9 » ou le marquer [NV].
5. Section 3.2 : écrire « 244 p. », et non 253, pour Montesi 2023.
6. Section 3.1 : la règle sur les conditions de passerelle en langue naturelle est au §11.7.1, p. 344.
7. Section 3.4 : Wilson 1975 pour « sématectonique », Parunak 2006 pour « marker-based ».
8. Section 3.8 : Couzin p. 40 pour « super-organisms ».
9. Section 3.3 et correction 10 du §9 : citer la clause « due to space limitations … clearly they can be implemented in a distributed database system ». La saga d'origine est décrite en mode centralisé, mais les auteurs ne l'y limitent pas.
10. T1 : marquer « q1 − q2 = r′1 − r′2 ∈ [−1, 1] » et le rapport 1,17 comme lectures graphiques ou inférences.
11. T4 : ajouter la condition des nids à 10 cm (note 2 de Marshall).
12. Section 6 (vitesse et justesse) : préciser que les 80 % de variance expliqués par les jetons concernent BrowseComp. Harmoniser le statut d'anthropic2025.
13. Section 7.8 : écrire « 8 états opérationnels (9 valeurs d'énumération, dont UNSPECIFIED) ».
14. pact2026 : indiquer qu'il s'agit d'un résumé de présentation; kim2025 : ajouter ICML 2025.

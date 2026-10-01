# Dossier P3 — Division du travail : fourmilière, ruche, agents

Dossier documentaire du Projet 3 de la proposition v3. Rédigé le 2026-10-01.

**Statut :** consolidé après vérification indépendante, 2026-10-01 (voir section 9).

## 0. Statut et méthode

Légende de vérification, appliquée à chaque affirmation chiffrée :

- **[T]** : texte intégral (ou section pertinente) lu dans la source primaire.
- **[R]** : résumé lu sur une page éditeur, PubMed/Europe PMC, Crossref ou Springer; texte intégral non lu.
- **[M]** : seules les métadonnées (titre, revue, pages, DOI) ont été vérifiées.
- **[S]** : contenu attribué à une source par une autre source lue (nommée); la source citée n'a pas été lue.
- **[I]** : déduction ou reconstruction de l'auteur du dossier, absente des sources.
- **[non vérifiée]** : référence dont le contenu n'a pu être confirmé (la vérification indépendante n'a pas pu lire la source).
- **[à confirmer]** : valeur numérique non confirmée dans une source lue.

Les références sont nommées par leur étiquette « Nom année » (section 2).

Limites d'accès rencontrées : Royal Society, Science, Annual Reviews et ResearchGate renvoient 403; PMC affiche un CAPTCHA (non contourné); le quota WebSearch de la session et le quota Consensus ont été épuisés en cours de travail. Conséquence majeure : **le texte de Bonabeau et al. 1996 [non vérifiée] et celui de Jones et al. 2004 n'ont pas été lus**; le résumé de Bonabeau et al. 1996, que la première version disait avoir lu, n'a pas pu être relu à la vérification (masqué par l'éditeur). Leurs équations sont reconstituées à partir de sources lues (Theraulaz et al. 1998, mêmes auteurs; Ulrich et al. 2021; Fontanari et al. 2024) et les valeurs de paramètres de 1996 restent à vérifier [à confirmer].

Vérification de calcul : le script `scratchpad/p3_check.js` compare le champ moyen et une simulation agent du modèle à seuils fixes (section 3.1); il contient une auto-vérification `console.assert`.

## 1. Synthèse

Le modèle à seuils de réponse est le noyau commun aux deux espèces : une probabilité de s'engager $T_\theta(s)=s^2/(s^2+\theta^2)$, un stimulus de tâche qui croît avec la demande et décroît avec le travail fait, et une probabilité constante $p$ d'abandon. Chez *Pheidole*, la diversité des seuils est morphologique (minors vs majors); chez l'abeille, elle est génétique (patrilignes issues de la polyandrie) et liée à l'âge. Le texte de Theraulaz et al. 1998 a été lu en entier : équations, paramètres et quatre résultats chiffrés reproductibles (spécialisation à partir d'individus identiques, deux diagrammes de transition, expérience de retrait-réintroduction). Wilson 1984 fournit la cible empirique fourmi (activité des majors ×15–30 quand le ratio minors:majors passe sous 1:1). Côté abeille, les résumés de Jones et al. 2004 et Graham et al. 2006 sont vérifiés, mais pas leurs équations ni leurs chiffres. La proposition v3 contient une erreur de fond (ce sont les **majors**, pas les « petites ouvrières », qui prennent la relève chez Wilson) et présente comme acquis un parallèle agentique (« les agents identiques oscillent ») qui reste une hypothèse : l'appui est indirect (essaims artificiels, erreurs corrélées des LLM) et il existe des contre-preuves (Lynch et al. 2024; Garrison et al. 2018; Ulrich et al. 2021).

## 2. Références

« Lecture » : ce que le dossier a lu (légende de la section 0). « Vérification » : résultat de la vérification indépendante du 2026-10-01 (**vérifiée**, **corrigée**, **non vérifiée**). L'ancienne clé permet de retrouver les renvois des documents antérieurs.

| Étiquette | Ancienne clé | Référence complète | DOI / URL | Lecture | Vérification |
|---|---|---|---|---|---|
| Bonabeau et al. 1996 | BTD1996 | Bonabeau E., Theraulaz G., Deneubourg J.-L. (1996). Quantitative study of the fixed threshold model for the regulation of division of labour in insect societies. *Proc. R. Soc. Lond. B* 263(1376):1565–1569 (22 nov. 1996). | https://doi.org/10.1098/rspb.1996.0229 | [M] (Crossref, OpenAlex). Résumé et texte non lus : résumé masqué par l'éditeur (Semantic Scholar), Royal Society 403. Un résumé relayé par Consensus (dossier et audit de simulation) n'a pu être reproduit. Corroboration indirecte : Theraulaz et al. 1998 [T] attribue l'éq. 1 à ce modèle et mentionne un « excellent accord quantitatif » avec Wilson 1984. | **non vérifiée** (contenu); métadonnées confirmées |
| Bonabeau et al. 1998 | BTD1998 | Bonabeau E., Theraulaz G., Deneubourg J.-L. (1998). Fixed response thresholds and the regulation of division of labor in insect societies. *Bull. Math. Biol.* 60(4):753–807. | https://doi.org/10.1006/bulm.1998.0041 | [R] (page Springer) | **corrigée** (n° 4 ajouté; Crossref et OpenAlex ne listent que Bonabeau, Springer les trois auteurs) |
| Theraulaz et al. 1998 | TBD1998 | Theraulaz G., Bonabeau E., Deneubourg J.-L. (1998). Response threshold reinforcement and division of labour in insect societies. *Proc. R. Soc. Lond. B* 265(1393):327–332. | https://doi.org/10.1098/rspb.1998.0299 ; PMC1688885 ; copie lue : https://static.ias.edu/pitp/archive/2012files/18.pdf | [T] intégral. Le PDF imprimé porte « reinforcement »; Crossref et PMC portent « reinforcements »; Crossref écrit « J-N. Denuebourg » (coquille). | vérifiée |
| Wilson 1984 | W1984 | Wilson E.O. (1984). The relation between caste ratios and division of labor in the ant genus *Pheidole* (Hymenoptera: Formicidae). *Behav. Ecol. Sociobiol.* 16(1):89–98 (nov. 1984). | https://doi.org/10.1007/BF00293108 | [R] (Springer, Consensus) | vérifiée |
| Beshers et Fewell 2001 | BF2001 | Beshers S.N., Fewell J.H. (2001). Models of division of labor in social insects. *Annu. Rev. Entomol.* 46:413–440. PMID 11112175. | https://doi.org/10.1146/annurev.ento.46.1.413 | [R] (Europe PMC) | vérifiée |
| Duarte et al. 2011 | DWPK2011 | Duarte A., Weissing F.J., Pen I., Keller L. (2011). An evolutionary perspective on self-organized division of labor in social insects. *Annu. Rev. Ecol. Evol. Syst.* 42(1):91–110. | https://doi.org/10.1146/annurev-ecolsys-102710-145017 | [R] (portail Groningen; PDF éditeur 403) | vérifiée |
| Duarte et al. 2012 | DPWK2012 | Duarte A., Pen I., Keller L., Weissing F.J. (2012). Evolution of self-organized division of labor in a response threshold model. *Behav. Ecol. Sociobiol.* 66(6):947–957 (juin 2012). | https://doi.org/10.1007/s00265-012-1343-2 | [R] (Consensus) | **corrigée** (pages ajoutées; ordre des auteurs confirmé) |
| Tofts et Franks 1992 | TF1992 | Tofts C., Franks N.R. (1992). Doing the right thing: ants, honeybees and naked mole-rats. *Trends Ecol. Evol.* 7(10):346–349. PMID 21236060. | https://doi.org/10.1016/0169-5347(92)90128-X | [R] (Europe PMC) | vérifiée |
| Tofts 1993 | T1993 | Tofts C. (1993). Algorithms for task allocation in ants (A study of temporal polyethism: theory). *Bull. Math. Biol.* 55(5):891–918 (sept. 1993). | https://doi.org/10.1016/S0092-8240(05)80195-8 | [M] (OpenAlex) | vérifiée |
| Franks et Tofts 1994 | FT1994 | Franks N.R., Tofts C. (1994). Foraging for work: how tasks allocate workers. *Anim. Behav.* 48(2):470–472. | https://doi.org/10.1006/anbe.1994.1261 | [M] (OpenAlex) | vérifiée |
| Charbonneau et Dornhaus 2015a | CD2015a | Charbonneau D., Dornhaus A. (2015). When doing nothing is something. How task allocation strategies compromise between flexibility, efficiency, and inactive agents. *J. Bioecon.* 17(3):217–242. | https://doi.org/10.1007/s10818-015-9205-4 | [R] (Springer) | vérifiée |
| Charbonneau et Dornhaus 2015b | CD2015b | Charbonneau D., Dornhaus A. (2015). Workers 'specialized' on inactivity: behavioral consistency of inactive workers and their role in task allocation. *Behav. Ecol. Sociobiol.* 69(9):1459–1472. | https://doi.org/10.1007/s00265-015-1958-1 | [R] (Springer) | vérifiée |
| Charbonneau et al. 2015 | CHD2015 | Charbonneau D., Hillis N., Dornhaus A. (2015). 'Lazy' in nature: ant colony time budgets show high 'inactivity' in the field as well as in the lab. *Insectes Soc.* 62(1):31–35. | https://doi.org/10.1007/s00040-014-0370-6 | [R] (Springer) | vérifiée |
| Charbonneau et al. 2017 | CSD2017 | Charbonneau D., Sasaki T., Dornhaus A. (2017). Who needs 'lazy' workers? Inactive workers act as a 'reserve' labor force replacing active workers, but inactive workers are not replaced when they are removed. *PLoS ONE* 12(9):e0184074. PMC5587300. | https://doi.org/10.1371/journal.pone.0184074 | [T] (Europe PMC) | vérifiée (numéros de figures non vérifiés : [à confirmer]) |
| Hasegawa et al. 2016 | H2016 | Hasegawa E., Ishii Y., Tada K., Kobayashi K., Yoshimura J. (2016). Lazy workers are necessary for long-term sustainability in insect societies. *Sci. Rep.* 6:20846. PMC4754661. | https://doi.org/10.1038/srep20846 | [T] (Europe PMC) | vérifiée |
| Gautrais et al. 2002 | GTDA2002 | Gautrais J., Theraulaz G., Deneubourg J.-L., Anderson C. (2002). Emergent polyethism as a consequence of increased colony size in insect societies. *J. Theor. Biol.* 215(3):363–373. PMID 12054843. | https://doi.org/10.1006/jtbi.2001.2506 | [R] (Europe PMC) | vérifiée |
| Jeanson et al. 2007 | JFGB2007 | Jeanson R., Fewell J.H., Gorelick R., Bertram S.M. (2007). Emergence of increased division of labor as a function of group size. *Behav. Ecol. Sociobiol.* 62(2):289–298. | https://doi.org/10.1007/s00265-007-0464-5 | [R] (Consensus); pages vérifiées directement (plus [S]) | vérifiée |
| Ulrich et al. 2021 | U2021 | Ulrich Y., Kawakatsu M., Tokita C.K., Saragosti J., Chandra V., Tarnita C.E., Kronauer D.J.C. (2021). Response thresholds alone cannot explain empirical patterns of division of labor in social insects. *PLoS Biol.* 19(6):e3001269. PMC8211278. | https://doi.org/10.1371/journal.pbio.3001269 | [T] partiel (section modèle et résultats, Europe PMC) | vérifiée |
| Lynch et al. 2024 | L2024 | Lynch C.M., Wilson R.C., Dornhaus A. (2024). Stop and go: exploring alternative mechanisms for task allocation in social insects — response and satisfaction thresholds trade off cost, accuracy, and speed differently. *bioRxiv*, mis en ligne le 14 mai 2024. | https://doi.org/10.1101/2024.05.13.593812 | [R] (Consensus, Europe PMC). Prépublication non évaluée par les pairs; aucune version publiée trouvée (OpenAlex). | **corrigée** (auteurs et DOI ajoutés) |
| Seeley 1982 | S1982 | Seeley T.D. (1982). Adaptive significance of the age polyethism schedule in honeybee colonies. *Behav. Ecol. Sociobiol.* 11(4):287–293. | https://doi.org/10.1007/BF00299306 | [R] (Springer) | vérifiée |
| Robinson 1992 | R1992 | Robinson G.E. (1992). Regulation of division of labor in insect societies. *Annu. Rev. Entomol.* 37(1):637–665. PMID 1539941. | https://doi.org/10.1146/annurev.en.37.010192.003225 | [M] (Europe PMC, OpenAlex); résumé restreint par l'éditeur | vérifiée |
| Huang et Robinson 1992 | HR1992 | Huang Z.-Y., Robinson G.E. (1992). Honeybee colony integration: worker–worker interactions mediate hormonally regulated plasticity in division of labor. *PNAS* 89(24):11726–11729. PMID 1465390; PMC50629. | https://doi.org/10.1073/pnas.89.24.11726 | [R] (Europe PMC) | **corrigée** (appui de A2 recadré : « jusqu'à 2 semaines plus tôt » est une description générale; l'expérience de l'article est un transplant d'abeilles âgées, pas un retrait de butineuses) |
| Beshers et al. 2001 | BHOR2001 | Beshers S.N., Huang Z.-Y., Oono Y., Robinson G.E. (2001). Social inhibition and the regulation of temporal polyethism in honey bees. *J. Theor. Biol.* 213(3):461–479. PMID 11735292. | https://doi.org/10.1006/jtbi.2001.2427 | [R] (Europe PMC) | vérifiée |
| Jones et al. 2004 | JMGO2004 | Jones J.C., Myerscough M.R., Graham S., Oldroyd B.P. (2004). Honey bee nest thermoregulation: diversity promotes stability. *Science* 305(5682):402–404. PMID 15218093. | https://doi.org/10.1126/science.1096340 | [R] (Europe PMC). Texte et matériel supplémentaire non lus (403). | vérifiée |
| Graham et al. 2006 | GMJO2006 | Graham S., Myerscough M.R., Jones J.C., Oldroyd B.P. (2006). Modelling the role of intracolonial genetic diversity on regulation of brood temperature in honey bee (*Apis mellifera* L.) colonies. *Insectes Soc.* 53(2):226–232. | https://doi.org/10.1007/s00040-005-0862-5 | [R] (Springer) | vérifiée |
| Myerscough et Oldroyd 2004 | MO2004 | Myerscough M.R., Oldroyd B.P. (2004). Simulation models of the role of genetic variability in social insect task allocation. *Insectes Soc.* 51(2):146–152. | https://doi.org/10.1007/s00040-003-0713-1 | [R] (Springer) | vérifiée |
| Jones et al. 2007 | JNO2007 | Jones J.C., Nanork P., Oldroyd B.P. (2007). The role of genetic diversity in nest cooling in a wild honey bee, *Apis florea*. *J. Comp. Physiol. A* 193(2):159–165 (en ligne le 30 sept. 2006). | https://doi.org/10.1007/s00359-006-0176-8 | [R] (Springer) | vérifiée (le résumé dit « in many cases », pas dans tous les cas) |
| Oldroyd et Fewell 2007 | OF2007 | Oldroyd B.P., Fewell J.H. (2007). Genetic diversity promotes homeostasis in insect colonies. *Trends Ecol. Evol.* 22(8):408–413. PMID 17573148. | https://doi.org/10.1016/j.tree.2007.06.001 | [R] (Europe PMC) | vérifiée |
| Stabentheiner et al. 2010 | SKB2010 | Stabentheiner A., Kovac H., Brodschneider R. (2010). Honeybee colony thermoregulation — regulatory mechanisms and contribution of individuals in dependence on age, location and thermal stress. *PLoS ONE* 5(1):e8967. PMID 20126462; PMC2813292. | https://doi.org/10.1371/journal.pone.0008967 | [R] (Europe PMC) | vérifiée (paraphrase nuancée : « environ 2 jours », chaleur active) |
| Garrison et al. 2018 | GKW2018 | Garrison L.K., Kleineidam C.J., Weidenmüller A. (2018). Behavioral flexibility promotes collective consistency in a social insect. *Sci. Rep.* 8:15836. PMC6203754. | https://doi.org/10.1038/s41598-018-33917-7 | [T] (Europe PMC). Bourdon, pas abeille mellifère. | vérifiée |
| Peters et al. 2019 | PPM2019 | Peters J.M., Peleg O., Mahadevan L. (2019). Collective ventilation in honeybee nests. *J. R. Soc. Interface* 16(150):20180561. | https://doi.org/10.1098/rsif.2018.0561 | [R] (OpenAlex). Extension possible, hors noyau. | vérifiée |
| Kang et Theraulaz 2016 | KT2015 | Kang Y., Théraulaz G. (2016). Dynamical models of task organization in social insect colonies. *Bull. Math. Biol.* 78(5):879–915. Préprint : arXiv:1511.04769 (2015). | https://doi.org/10.1007/s11538-016-0165-1 ; https://arxiv.org/abs/1511.04769 | [T] (préprint arXiv; sert de source secondaire pour les âges de Seeley 1982) | **corrigée** (version publiée à citer en priorité) |
| Fontanari et al. 2024 | FOC2024 | Fontanari J.F., de Oliveira V.M., Campos P.R.A. (2024). Evolving division of labor in a response threshold model. *Ecological Complexity* 58:101083. arXiv:2308.07122. | https://doi.org/10.1016/j.ecocom.2024.101083 ; https://arxiv.org/abs/2308.07122 | [T] partiel (section II) | **corrigée** (DOI ajouté; règle de réponse en échelon bruité, fonction erf, et non $T_\theta$) |
| Krieger et al. 2000 | KBK2000 | Krieger M.J.B., Billeter J.-B., Keller L. (2000). Ant-like task allocation and recruitment in cooperative robots. *Nature* 406(6799):992–995. PMID 10984052. | https://doi.org/10.1038/35023164 | [R] (Europe PMC) | vérifiée |
| Campos et al. 2000 | CBTD2000 | Campos M., Bonabeau E., Théraulaz G., Deneubourg J.-L. (2000). Dynamic scheduling and division of labor in social insects. *Adaptive Behavior* 8(2):83–95. | https://doi.org/10.1177/105971230000800201 | [R] (Crossref) | vérifiée |
| Wu et al. 2020 | WMGH2020 | Wu A.S., Mathias H.D., Giordano J.P., Hevia A. (2020). Effects of response threshold distribution on dynamic division of labor in decentralized swarms. *Proceedings of the 33rd International Florida Artificial Intelligence Research Society Conference* (FLAIRS-33), AAAI Press (© AAAI 2020). Pages non trouvées. | https://par.nsf.gov/biblio/10182204 ; PDF : https://par.nsf.gov/servlets/purl/10182204 | [T] (NSF PAR) | **corrigée** (lieu : FLAIRS-33, pas la conférence AAAI) |
| Kim et al. 2025 | KGPG2025 | Kim E., Garg A., Peng K., Garg N. (2025). Correlated errors in large language models. ICML 2025 (arXiv, 9 juin 2025). | https://arxiv.org/abs/2506.07962 | [R] | vérifiée |
| Kleinberg et Raghavan 2021 | KR2021 | Kleinberg J., Raghavan M. (2021). Algorithmic monoculture and social welfare. *PNAS* 118(22):e2018340118. PMID 34035166. | https://doi.org/10.1073/pnas.2018340118 | [R] | vérifiée |
| Cemri et al. 2025 | C2025 | Cemri M. et al. (2025). Why do multi-agent LLM systems fail? arXiv:2503.13657 (v3, 26 oct. 2025). | https://arxiv.org/abs/2503.13657 | [R]. Le κ = 0,88 n'est plus dans le résumé de la v3 mais figure dans son texte (accord inter-annotateurs); la v3 donne κ = 0,77 pour le juge LLM. | vérifiée |
| Yang et al. 2025 | Y2025 | Yang Y., Chai H., Shao S., Song Y., Qi S., Rui R., Zhang W. (2025). AgentNet: decentralized evolutionary coordination for LLM-based multi-agent systems. arXiv:2504.00587 (v2, 29 mai 2025). | https://arxiv.org/abs/2504.00587 | [R] | vérifiée |
| Han et Zhang 2025 | HZ2025 | Han B., Zhang S. (2025). Exploring advanced LLM multi-agent systems based on blackboard architecture. arXiv:2507.01701 (v1, 2 juill. 2025). | https://arxiv.org/abs/2507.01701 | [R]; texte lu par la vérification | **corrigée** (appui mal interprété : une unité de contrôle centrale sélectionne les agents; contre-exemple, pas appui) |
| Kazakova et Wu 2018 | — | Kazakova V.A., Wu A.S. (2018). Specialization vs. re-specialization: Effects of Hebbian learning in a dynamic environment. In *Proc. 31st FLAIRS*, 354–359. | — | [S] (liste de références de Wu et al. 2020, lue); l'article lui-même n'a pas été consulté | **non vérifiée** |
| Bonabeau et al. 1997 | — | Bonabeau E., Theraulaz G., Deneubourg J.-L., Aron S., Camazine S. (1997). Self-organization in social insects. *Trends Ecol. Evol.* 12:188–193. | — | [S] (réf. 8 de Fontanari et al. 2024, lue); l'article lui-même n'a pas été consulté | **non vérifiée** |

Les deux dernières entrées ne sont citées que par l'intermédiaire d'une source lue; elles figurent ici pour que la liste soit complète.

## 3. Modèles

### 3.1 Modèle à seuils fixes (Bonabeau et al. 1996 [non vérifiée])

**Ce qui est vérifié de Bonabeau et al. 1996 : seulement les métadonnées [M], plus une corroboration indirecte [S, Theraulaz et al. 1998].** Theraulaz et al. 1998 (lu) attribue son éq. 1 à ce modèle et le dit « en excellent accord quantitatif » avec Wilson 1984. Le résumé que la première version disait avoir lu n'a pas pu être relu à la vérification indépendante (masqué par l'éditeur, Royal Society 403) : le contenu suivant reste donc [non vérifiée]. Les individus répondent aux stimuli de tâche selon un seuil; au-dessus du seuil, ils s'engagent avec une forte probabilité; l'exécution réduit le stimulus; si des castes ont des seuils différents et fixes à l'échelle de l'expérience, le modèle rend compte d'observations de Wilson 1984 sur *Pheidole*.

Équations (forme canonique reconstituée à partir de sources lues) :

$$T_{\theta}(s)=\frac{s^2}{s^2+\theta^2}\qquad\text{(Theraulaz et al. 1998, éq. 1, attribuée explicitement à Bonabeau et al. 1996)}$$

$$s(t+1)=s(t)+\delta-\alpha\,\frac{N_{\text{act}}(t)}{N}\qquad\text{([S] Fontanari et al. 2024 éq. 3 attribue cette forme au modèle classique, réfs. Bonabeau et al. 1996, 1997, 1998; Ulrich et al. 2021 éq. 1 en donne une généralisation)}$$

Fontanari et al. 2024 emploie toutefois une règle de réponse en échelon bruité (fonction erf) et non $T_\theta$ : seule la dynamique du stimulus (éq. 3) correspond à la forme attribuée au modèle classique.

- Un individu inactif devient actif avec la probabilité $T_{\theta_i}(s)$ par pas de temps.
- Un individu actif redevient inactif avec la probabilité $p$ par unité de temps, indépendamment du stimulus; durée moyenne d'engagement $1/p$ (Theraulaz et al. 1998, commentaire de l'éq. 5).
- Deux castes : minors de seuil $\theta_1$, majors de seuil $\theta_2>\theta_1$; $f$ = fraction de majors.
- Normalisation par $N$ : la demande croît linéairement avec la taille de colonie (« le couvain est divisé par 2 quand la colonie l'est », Theraulaz et al. 1998 citant Wilson 1984).

Généralisation (Ulrich et al. 2021, éq. 1–2, [T]) : $s_{j}(t+1)=s_{j}(t)+\delta_j-\big(\alpha^X_j n^X_j(t)+\alpha^Y_j n^Y_j(t)\big)/n$ et $P_{ij}=s_{ij}^{\eta}/(s_{ij}^{\eta}+\theta_{ij}^{\eta})$, abandon avec probabilité constante $\tau$, $T=10\,000$ pas.

**Paramètres de Bonabeau et al. 1996 [non vérifiée] : [à confirmer].** Valeurs de θ des minors et des majors, $N$, $p$, $\delta$, $\alpha$, durée et emplacement des figures restent à lire dans le texte. Valeurs par défaut proposées en attendant, tirées de Theraulaz et al. 1998 (mêmes auteurs, [T]) : $\alpha=3$, $\delta=1$, $p=0{,}2$.

**Propriétés analytiques [I, vérifié par simulation dans `p3_check.js`].**

1. À l'état stationnaire, $\langle N_{\text{act}}/N\rangle=\delta/\alpha$ (car $\Delta s=0$). Avec $\alpha=3,\delta=1$ : un tiers de la colonie active, quel que soit $f$. Le modèle prédit donc une compensation totale de la perte de minors, tant que $T$ peut l'absorber.
2. Champ moyen par caste : $x_c^*=T_c(s^*)/(T_c(s^*)+p)$, avec $s^*$ solution de $(1-f)\,x_1^*+f\,x_2^*=\delta/\alpha$.
3. Invariance d'échelle : multiplier tous les θ par $k$ multiplie $s^*$ par $k$; seul le rapport $\theta_2/\theta_1$ compte à l'état stationnaire.

Champ moyen et simulation agent ($N=1000$, $\theta_1=10$, $\theta_2=80$, $p=0{,}2$, $\alpha=3$, $\delta=1$, 20 000 pas, moyenne sur la 2ᵉ moitié, 5 graines) :

| $f$ (fraction majors) | ratio minors:majors | $x_{\text{maj}}$ champ moyen | $x_{\text{maj}}$ simulation | $x_{\text{min}}$ simulation | actifs totaux |
|---|---|---|---|---|---|
| 0.05 | 19:1 | 0.009 | 0.009 | 0.350 | 0.333 |
| 0.25 | 3:1 | 0.014 | 0.014 | 0.440 | 0.333 |
| 0.50 | 1:1 | 0.038 | 0.038 | 0.628 | 0.333 |
| 0.90 | 1:9 | 0.281 | 0.281 | 0.808 | 0.333 |

Rapport d'activité des majors $x_{\text{maj}}(f_{\text{exp}})/x_{\text{maj}}(f_{\text{base}})$ selon $\theta_2/\theta_1$ (champ moyen). Correspondance des ratios : 19:1 ↔ $f=0{,}05$; 3:1 ↔ $f=0{,}25$; 1:2 ↔ $f=0{,}67$; 1:9 ↔ $f=0{,}90$ :

| $\theta_2/\theta_1$ | 19:1 → 1:2 | 19:1 → 1:9 | 3:1 → 1:2 | 3:1 → 1:9 |
|---|---|---|---|---|
| 5 | 6.4 | 12.1 | 4.3 | 8.2 |
| 6 | 8.4 | 17.2 | 5.6 | 11.5 |
| 8 | 13.0 | 30.0 | 8.5 | 19.6 |
| 10 | 18.6 | 46.5 | 12.1 | 30.1 |

Les colonnes « 1:2 » sont calculées avec $f=0{,}67$. Le recalcul indépendant de la vérification retrouve à l'identique les $x_{\text{maj}}$ du tableau précédent et les rapports du tableau ci-dessus (avec $f=0{,}67$); avec $f=2/3$ exact, il obtient 6,3 / 8,2 / 12,7 / 18,2 (colonne 19:1 → 1:2) et 5,5 / 8,3 / 11,8 (colonne 3:1 → 1:2; trois valeurs rapportées, correspondance aux $\theta_2/\theta_1$ non précisée) [I].

Lecture [I] : la plage empirique de Wilson (×15–30) s'obtient avec $\theta_2/\theta_1\approx 6$–10 selon les ratios comparés [à confirmer]. C'est une calibration, pas la valeur publiée.

### 3.2 Seuils renforcés (Theraulaz et al. 1998) — [T]

$m$ tâches, $N$ individus, seuils $\theta_{ij}$, stimulus $s_j$, fraction de temps $x_{ij}$ consacrée à la tâche $j$.

| Éq. | Forme publiée |
|---|---|
| (1) | $T_{\theta_{ij}}(s_j)=s_j^2/(s_j^2+\theta_{ij}^2)$ |
| (2a) | $\theta_{ij}\to\theta_{ij}-\xi\,\Delta t$ si $i$ exécute $j$ pendant $\Delta t$ (apprentissage) |
| (2b) | $\theta_{ij}\to\theta_{ij}+\varphi\,\Delta t$ sinon (oubli) |
| (3) | $\theta_{ij}\to\theta_{ij}-x_{ij}\,\xi\,\Delta t+(1-x_{ij})\,\varphi\,\Delta t$ |
| (4) | $\partial_t\theta_{ij}=\big[(1-x_{ij})\varphi-x_{ij}\xi\big]\,\Theta(\theta_{ij}-\theta_{\min})\,\Theta(\theta_{\max}-\theta_{ij})$, Θ = fonction échelon |
| (5) | $\partial_t x_{ij}=T_{\theta_{ij}}(s_j)\big(1-\sum_{k=1}^m x_{ik}\big)-p\,x_{ij}+\psi(i,j,t)$ |
| (6) | ψ gaussien centré, variance $\sigma^2$, non corrélé dans le temps, entre individus et entre tâches |
| (7) | $\partial_t s_j=\delta-\dfrac{\alpha}{N}\sum_{i=1}^N x_{ij}$ |

$\xi$ et $\varphi$ sont identiques pour toutes les tâches; $\delta$ et $\alpha$ identiques pour les deux tâches; $p$ identique pour tous. Le modèle « foraging-for-work » est présenté comme un cas particulier : seuils fixes, identiques et très bas.

Paramètres et résultats publiés :

| Figure | Paramètres | Résultat publié |
|---|---|---|
| 1a–b | $N=5$, $m=2$, $\theta_{ij}(0)=500$, $x_{ij}(0)=0{,}1$, $\alpha=3$, $\delta=1$, $p=0{,}2$, $\xi=10$, $\varphi=1$, $\sigma=0{,}1$; axe du temps 0–3000 | Individus 3, 4, 5 spécialistes de la tâche 1 ($x_{i1}\approx0{,}55$, $x_{i2}\approx0{,}05$); individus 1, 2 spécialistes de la tâche 2 ($x_{i1}\approx0{,}05$, $x_{i2}\approx0{,}8$). |
| 1c | Idem, θ initiaux uniformes sur $[\theta_{\min}=1,\theta_{\max}=1000]$ | Les individus à θ initial bas deviennent spécialistes; l'individu 1 est spécialiste des deux tâches. |
| 2a | $N=100$, $m=2$, $\varphi+\xi=11$, $\alpha=3$, $\delta=1$, $p=0{,}2$, $\sigma=0{,}1$, $\theta(0)=500$, $x(0)=0{,}1$ | $\varphi<0{,}4$ : tous spécialistes; $T_c$ devient grand près de 0,4; $0{,}4<\varphi<2$ : différenciation, nombre de spécialistes et $T_c$ décroissent; $\varphi>2$ : aucune spécialisation. |
| 2b | $N=100$, $m=2$, $\alpha=3$, $\delta=1$, $\xi=10$, $\varphi=1$, $\sigma=0{,}1$ | $p<0{,}04$ : tous spécialistes; chute marquée juste après 0,04; $0{,}04<p<0{,}42$ : $T_c$ décroît, nombre de spécialistes croît; $p>0{,}42$ : tous spécialistes. |
| 3 | $N=100$, $m=2$, $\alpha=3$, $\delta=1$, $p=0{,}2$, $\xi=10$, $\varphi=1$, $\sigma=0{,}1$; retrait des 50 spécialistes de la tâche 1 pendant $T_r$ | Les 50 restants prennent la tâche 1 quand $T_r>1700$ ($N_n$ monte); ils restent spécialistes après réintroduction quand $T_r>3700$ ($N_f$ monte). |

Définitions publiées : spécialiste de $j$ si $\theta_{ij}<100$; convergence $T_c$ quand, pour tout $i,j$, $\theta_{ij}>900$ ou $\theta_{ij}<100$. $N_n$ : individus à $\theta_{i1}>900$ avant le retrait et $<100$ à la réintroduction. $N_f$ : ceux d'entre eux encore à $\theta_{i1}<100$ longtemps après.

Contrôle de cohérence [I] : l'éq. 7 impose $\sum_i x_{ij}/N\to\delta/\alpha=1/3$. Avec les valeurs de la Fig. 1b : $(3\times0{,}55+2\times0{,}05)/5=0{,}35$ et $(3\times0{,}05+2\times0{,}8)/5=0{,}35$. Cohérent.

Points d'implantation non précisés par le texte [I] :

- Pas de temps $\Delta t$ non donné. Proposer $\Delta t=1$ et vérifier que $\Delta t=0{,}1$ donne les mêmes transitions.
- Bruit : schéma d'Euler–Maruyama, $\sigma\sqrt{\Delta t}\,\mathcal N(0,1)$; borner $x_{ij}\in[0,1]$ et $\sum_k x_{ik}\le1$.
- Lue littéralement, l'éq. 4 fige θ dès qu'il touche une borne (Θ(0)=0), ce qui rendrait impossible la baisse de θ observée à la Fig. 3. Le texte dit que « la dynamique est restreinte à un intervalle » : implanter un écrêtage $\theta\leftarrow\min(\max(\theta,\theta_{\min}),\theta_{\max})$, pas un gel.
- Symbole δ utilisé deux fois dans l'article (incrément de stimulus et Dirac).

### 3.3 Foraging-for-work (Tofts et Franks 1992, Tofts 1993, Franks et Tofts 1994)

- [R, Tofts et Franks 1992] La division du travail se classe traditionnellement en polyéthisme physique et temporel; de nouveaux modèles indiquent que le polyéthisme temporel peut être une propriété émergente plutôt qu'un principe d'organisation.
- [T, Theraulaz et al. 1998, décrivant FFW] Les individus cherchent activement du travail et continuent une tâche tant qu'ils y sont stimulés; FFW explique, sous conditions, la sociogenèse, un polyéthisme temporel faible et la spécialisation intra-caste (Tofts 1993); FFW n'est pas assez robuste pour un polyéthisme temporel fort (Bonabeau et al. 1998); FFW est un cas particulier du modèle à seuils fixes (seuils identiques, très bas).
- Équations de FFW (zones spatiales en chaîne, déplacement vers le travail disponible) : **non lues**. Tofts 1993 est la source à obtenir.

### 3.4 Ouvrières inactives

- [R, Charbonneau et Dornhaus 2015a] Revue des explications de la charge inégale, dont les limites de collecte d'information et le décalage entre la fréquence des fluctuations de la demande et la vitesse de réaffectation. Les auteurs écrivent que ces processus s'appliquent à « tout système distribué » où des agents sont affectés à des tâches à demande fluctuante, et qu'une proportion d'inactifs peut être adaptative.
- [R, Charbonneau et Dornhaus 2015b] Chez *Temnothorax rugatulus*, l'inactivité est constante pour un individu mais varie entre individus; les « inactives » forment un groupe distinct, non expliqué par des rythmes circadiens ou des quarts de travail.
- [R, Charbonneau et al. 2015] Budgets-temps identiques au laboratoire et sur le terrain, inactivité comprise : ce n'est pas un artefact de laboratoire.
- [T, Charbonneau et al. 2017] *T. rugatulus*, 20 colonies, 1307 ouvrières (moyenne 65,35). Proportion moyenne du temps inactif : 0,607 (médiane 0,628, é.-t. 0,146). Retrait des 20 % les plus actives (5 colonies) : l'activité de la colonie est maintenue, les nouvelles plus actives viennent surtout des groupes « inactives » et « marcheuses » (Fig. 1A, 5A [à confirmer]). Retrait des 20 % les plus inactives (9 colonies) : l'inactivité baisse à 1 semaine et reste basse à 2 semaines (Fig. 1B, 2B [à confirmer]). Retrait aléatoire (6 colonies) : aucun changement (Fig. 1C [à confirmer]).
- [T, Hasegawa et al. 2016] Modèle : 75 ouvrières sur une grille 50×50; stimulus initial 5,001, +1 par pas s'il n'est pas traité; seuils variables tirés d'une normale de moyenne 5 (bornes 0–10) contre seuil uniforme 5; fatigue : énergie 10, tombe à 0 après une tâche, récupère à taux constant (varié); déplacement aléatoire (prob. 0,5); taux d'apparition des tâches 0,006–0,3; mort de la colonie au premier pas sans traitement; 5 essais × 1000 pas. Résultats : le système variable traite toujours moins de tâches (Fig. 1a) mais persiste plus longtemps en présence de fatigue (Fig. 1b–c); la différence disparaît quand le taux de récupération vaut 1. Données *Myrmica kotokui* : 66,0 ± 9,8 % des comportements sont du repos.

Test discriminant [I, à vérifier par simulation] : avec une demande proportionnelle à $N$ (éq. 7 de Theraulaz et al. 1998), retirer des inactives laisse la fraction active à $\delta/\alpha$, donc l'inactivité revient, contrairement à Charbonneau et al. 2017. Avec une demande absolue ($\Delta s=\delta-\alpha' N_{\text{act}}$), $N_{\text{act}}$ reste constant : retirer des actives est compensé, retirer des inactives fait baisser durablement l'inactivité, comme dans Charbonneau et al. 2017. L'expérience Charbonneau et al. 2017 départage donc les deux normalisations de la demande.

### 3.5 Abeilles : polyéthisme d'âge

- [R, Seeley 1982] Thèse : l'organisation des tâches dans le nid est un compromis entre trouver le travail et l'exécuter efficacement. Deux prédictions, confirmées dès 2 jours d'âge : chaque âge prend plusieurs tâches, et les tâches d'un même âge sont co-localisées dans le nid. Les 0–2 jours se spécialisent dans le nettoyage des cellules. Cinq castes femelles : la reine et quatre sous-castes d'âge (nettoyage des cellules, nid à couvain, stockage de la nourriture, butinage).
- [S, Kang et Theraulaz 2016 citant Seeley 1982] Âges indicatifs : 1–3 j nettoyage; 3–11 j soins au couvain et entretien; 11–20 j réception et stockage; butinage vers 20 j.
- [S, Theraulaz et al. 1998 citant Seeley 1982] La probabilité de réversion du butinage vers les soins décroît avec le temps passé à butiner.
- [R, Huang et Robinson 1992] Plasticité du polyéthisme d'âge régulé par l'hormone juvénile : le butinage précoce peut survenir jusqu'à 2 semaines plus tôt que la moyenne (description générale du développement précoce, pas un résultat mesuré après retrait de butineuses); deux approches expérimentales, abeilles élevées en groupes de tailles différentes et « transplants » d'abeilles âgées dans des colonies sans butineuses, montrent que les interactions entre ouvrières ont un effet quantitatif sur le développement endocrinien et comportemental.
- [R, Beshers et al. 2001] Modèle mathématique combinant développement comportemental intrinsèque et inhibition sociale. Il explique la corrélation âge-tâche, l'âge de premier butinage et sa variation entre ruches, l'allocation équilibrée intérieur/butinage, la récupération après perturbation démographique et la différenciation en rôles. **Équations non lues.**
- Robinson 1992 : seules les métadonnées sont vérifiées.

Reconstruction proposée pour la simulation [I, pas les équations de Beshers et al. 2001] : chaque abeille porte une variable interne $h_i$ qui croît à taux $a$; chaque rencontre avec une butineuse la réduit de $b$; elle butine quand $h_i>\theta_F$. Retirer les butineuses supprime l'inhibition, d'où le butinage précoce (hypothèse du modèle : le paradigme « retrait des butineuses → butinage précoce » n'est pas sourcé ici, voir A2). Remplacer par les équations publiées dès que Beshers et al. 2001 est lu.

### 3.6 Abeilles : thermorégulation et diversité génétique

- [R, Jones et al. 2004] La forte diversité génétique vient de l'accouplement multiple de la reine. Les températures du nid à couvain sont plus stables dans les colonies génétiquement diverses (plusieurs pères) que dans les colonies uniformes (un seul père). Mécanisme proposé : la diversité génétique des seuils de réponse à la température module la ventilation (« hive-ventilating behavior ») et prévient les réponses excessives de la colonie aux fluctuations.
- [R, Graham et al. 2006] Modèles de simulation : (1) colonies de 1 ou 15 patrilignes qui chauffent le nid; les colonies à une patriligne maintiennent en moyenne une température moins stable; (2) colonies de 5 patrilignes qui refroidissent le nid, avec la proportion de chaque patriligne engagée selon la température.
- [R, Myerscough et Oldroyd 2004] Les colonies à seuil uniforme s'adaptent mal aux besoins changeants; celles composées de nombreux groupes à seuils différents s'adaptent vite et mieux; avantage proposé pour la polyandrie.
- [R, Jones et al. 2007] Chez *Apis florea*, la proportion de ventileuses de chaque patriligne diffère significativement selon la température expérimentale « dans de nombreux cas » (pas dans tous).
- [R, Oldroyd et Fewell 2007] Deux lectures : la diversité génétique offre une spécialisation génétique qui rend la colonie résiliente, ou elle n'est qu'un effet secondaire de la polyandrie.
- [R, Stabentheiner et al. 2010] Couvain maintenu entre 33 et 36 °C; la production endothermique de chaleur est le fait des abeilles de plus d'environ 2 jours, l'ectothermie étant la plus fréquente chez les abeilles de moins d'environ 2 jours.

**Non vérifié [à confirmer]** : nombre de colonies, schéma d'insémination, statistiques de température, équations et paramètres de Jones et al. 2004 et Graham et al. 2006. Ces chiffres sont nécessaires avant de figer un critère d'acceptation (voir section 8).

Reconstruction proposée pour le moteur commun [I, aucune équation publiée lue] :

$$T(t+1)=T(t)+\lambda\big(T_{\text{amb}}(t)-T(t)\big)+\kappa_h\,H(t)-\kappa_c\,F(t)$$

$H$ = fraction qui chauffe ($T<\theta^{h}_i$), $F$ = fraction qui ventile ($T>\theta^{c}_i$), $\theta_i=\mu+\eta_{\text{patriligne}}+\varepsilon_i$. Colonie uniforme : 1 patriligne; diverse : 15 (comme Graham et al. 2006). Une réponse déterministe et commune déclenche tout le monde au même instant; une réponse probabiliste $T_\theta$ adoucit déjà ce tout-ou-rien. Les deux sources de désynchronisation (diversité entre individus, stochasticité de chaque individu) doivent être des curseurs séparés, sinon la comparaison est biaisée.

### 3.7 Limites et critiques publiées

- [T, Ulrich et al. 2021] 120 colonies de fourmi clonale (16 ouvrières, ou 8 dans l'expérience de morphologie). Le mélange génétique fait converger les comportements, le mélange d'âges n'a pas d'effet, le mélange morphologique les fait diverger. La variation des seuils ne reproduit qu'en partie ces patrons; il faut ajouter la variabilité d'efficacité des adultes et la demande des larves.
- [T, Garrison et al. 2018] Bourdon *Bombus terrestris*, 159 ouvrières, 14 colonies. Seuil de ventilation seul : 40,87 °C [40,54–41,20]; en groupe aléatoire : 42,67 °C [42,16–43,17]. Proportion qui ventile : 77 % seule contre 39 % en groupe. Répétabilité du seuil : $R_M=0{,}231$. Le seuil mesuré seul ne prédit pas qui ventile en groupe. C'est une contre-preuve directe aux seuils fixes individuels.
- [R, Lynch et al. 2024, prépublication] Selon le critère coût/efficacité, les seuils de réponse font souvent moins bien qu'un modèle nul de choix aléatoire, et la variation entre ouvrières n'améliore pas l'allocation. Les auteurs précisent qu'ils n'ont pas modélisé les bénéfices de la spécialisation.
- [R, Duarte et al. 2012] Une répartition biaisée (p. ex. 3:1) est difficile à obtenir avec des seuils; l'accouplement multiple **freine** l'évolution de la spécialisation, ce qui est en tension avec Myerscough et Oldroyd 2004 et Oldroyd et Fewell 2007.
- [R, Jeanson et al. 2007] La division du travail croît avec la taille du groupe; une demande faible et un grand nombre de tâches la favorisent.
- [R, Gautrais et al. 2002] Avec seuils renforcés, la spécialisation n'émerge qu'au-delà d'une taille critique; les petites colonies ont des membres inactifs indifférenciés.

## 4. Résultats cibles et critères d'acceptation

« Valeur publiée » = chiffre lu dans la source. Les tolérances et répétitions sont des propositions de l'auteur du dossier.

| ID | Espèce | Grandeur mesurée | Valeur publiée | Critère proposé | Source / statut |
|---|---|---|---|---|---|
| F0 | Fourmi (modèle générique) | Fraction active moyenne à l'équilibre | Conséquence de l'éq. 7 | $\lvert\bar a-\delta/\alpha\rvert\le0{,}01$ pour $N=1000$, 2·10⁴ pas, moyenne sur la 2ᵉ moitié, 10 graines | Theraulaz et al. 1998 [T] + dérivation [I] |
| F1 | *Pheidole* | Taux d'activité par major quand minors:majors passe du ratio usuel (3:1 à 20:1 selon l'espèce) à moins de 1:1 | ×15 à ×30; répertoire ×1,4 à ×4,5; les majors restaurent au moins 75 % de l'activité des minors manquantes; changement en moins d'une heure, réversible | Avec $\theta_2/\theta_1$ calibré : $x_{\text{maj}}(f=0{,}9)/x_{\text{maj}}(f_{\text{base}})\in[15;30]$ pour $f_{\text{base}}\in\{0{,}05;0{,}25\}$; activité totale ≥ 75 % de la référence; retour à l'état initial quand $f$ revient à la base; 20 graines, $N=1000$ | Wilson 1984 [R]; ajustement de Bonabeau et al. 1996 [non vérifiée] non lu |
| F2 | Générique (fourmi, guêpe) | Spécialisation à partir d'individus identiques (Fig. 1a–b) | 3 spécialistes de la tâche 1 à $x\approx0{,}55$, 2 de la tâche 2 à $x\approx0{,}8$ | Sur 100 graines : convergence avant $t=3000$ dans ≥ 90 % des cas; chaque tâche a ≥ 1 spécialiste; $\sum_i x_{ij}/N=0{,}33\pm0{,}05$; spécialistes de la tâche minoritaire plus actifs que ceux de la majoritaire dans ≥ 80 % des cas | Theraulaz et al. 1998 [T] |
| F3 | Générique | Transitions selon φ (Fig. 2a) | 0,4 et 2 | $N_1=N_2=100$ pour φ ≤ 0,3; strictement entre 0 et 100 pour φ ∈ [0,5; 1,8]; $N_1=N_2=0$ pour φ ≥ 2,2; pic de $T_c$ dans [0,3; 0,6]; pas de 0,1, 10 graines par point | Theraulaz et al. 1998 [T] |
| F4 | Générique | Transitions selon $p$ (Fig. 2b) | 0,04 et 0,42 | Tous spécialistes pour $p\le0{,}03$ et $p\ge0{,}45$; minimum du nombre de spécialistes dans [0,04; 0,10]; croissance sur [0,05; 0,42]; 10 graines par point | Theraulaz et al. 1998 [T] |
| F5 | Générique | Retrait-réintroduction (Fig. 3) | Seuils de $T_r$ : 1700 ($N_n$) et 3700 ($N_f$) | $N_n\le5$ pour $T_r\le1500$ et $N_n\ge40$ pour $T_r\ge3000$; $N_f\le5$ pour $T_r\le3300$ et $N_f\ge25$ pour $T_r\ge4500$; seuils estimés à ± 20 % de 1700 et 3700; pas de 100, 20 graines | Theraulaz et al. 1998 [T]; bornes 3000 et 4500 lues graphiquement (approximatif) |
| F6 | *Temnothorax* | Réserve de main-d'œuvre | Inactivité de référence 0,607 (é.-t. 0,146); retrait des 20 % les plus actives compensé; retrait des 20 % les plus inactives non compensé | Inactivité de référence 0,61 ± 0,15; après retrait des actives, activité totale à ± 10 % de la référence; après retrait des inactives, inactivité inférieure à la référence jusqu'à la fin de l'horizon; 30 graines | Charbonneau et al. 2017 [T] |
| F7 | *Myrmica* (modèle) | Persistance avec fatigue | Seuils variables : moins de tâches traitées, persistance plus longue; écart nul quand la récupération vaut 1 | Paramètres de Hasegawa et al. 2016; 30 essais au lieu de 5; persistance médiane variable > uniforme (Wilcoxon, $p<0{,}05$) pour récupération < 1; pas de différence à 1; tâches traitées variable < uniforme | Hasegawa et al. 2016 [T] |
| A1 | Abeille | Séquence âge-tâche | 4 sous-castes d'âge; 0–2 j : nettoyage des cellules | Séquence émergente nettoyage → couvain → stockage → butinage; âges médians à ± 3 j des repères 1–3 / 3–11 / 11–20 / ≥ 20 j; 20 graines | Seeley 1982 [R]; âges [S] |
| A2 | Abeille | Plasticité de l'âge au premier butinage | Le butinage précoce peut survenir jusqu'à 2 semaines plus tôt que la moyenne (description générale du résumé; pas une mesure après retrait de butineuses) | Âge moyen au premier butinage réduit d'au moins 7 j [à confirmer] (jusqu'à 14 j) par rapport au témoin quand l'inhibition par les butineuses est supprimée dans le modèle; 20 graines. Variante ancrée dans la source : reproduire l'expérience de « transplants » d'abeilles âgées dans des colonies sans butineuses. L'expérience « retrait des butineuses » reste à sourcer [non vérifiée] | Huang et Robinson 1992 [R] (description générale seulement); modèle Beshers et al. 2001 non lu |
| A3 | Abeille | Stabilité thermique selon la diversité | Plus stable avec plusieurs pères (pas de chiffre lu) | Écart-type de $T_{\text{couvain}}$ : diverse < uniforme (Mann–Whitney, $p<0{,}01$, 30 graines par condition); moyenne dans 33–36 °C; ampleur à recaler sur Jones et al. 2004 ou Graham et al. 2006 dès lecture | Jones et al. 2004 et Graham et al. 2006 [R]; Stabentheiner et al. 2010 [R] |
| A4 | Abeille | Composition des ventileuses selon la température | Varie entre patrilignes (5 patrilignes simulées; *A. florea* in vivo, différences significatives « dans de nombreux cas ») | Proportion de chaque patriligne parmi les ventileuses monotone en T (Spearman significatif pour ≥ 4 patrilignes sur 5); la monotonie en T est une proposition de l'auteur, absente des sources | Graham et al. 2006, Jones et al. 2007 [R] |
| A5 | Abeille (modèle générique) | Adaptation à un saut de demande | Uniforme lente et inadéquate; hétérogène rapide | Après un saut de demande : temps pour atteindre ± 10 % de la cible et dépassement maximal plus faibles en hétérogène; 30 graines | Myerscough et Oldroyd 2004 [R] |
| X1 | Bourdon (test de réfutation) | Effet du groupe sur le seuil | +1,8 °C en groupe; participation 77 % → 39 %; $R_M=0{,}231$ | Un modèle à seuils fixes individuels doit échouer à reproduire ces trois chiffres; un modèle avec inhibition sociale doit les approcher à ± 25 % | Garrison et al. 2018 [T] |

## 5. Visuels de vulgarisation

1. **La baignoire de travail** : le stimulus est un niveau d'eau qui monte au débit δ; chaque fourmi ou abeille active est un drain α/N. Curseurs δ, α, p; le niveau se stabilise quand un tiers travaille (F0).
2. **Deux sigmoïdes, une colonie** : courbes $T_\theta(s)$ des minors et des majors, avec un point mobile au niveau courant de $s^*$. On fait glisser $f$ (fraction de majors) et on voit $s^*$ franchir le seuil des majors.
3. **L'expérience de Wilson rejouée** : curseur du ratio minors:majors, histogramme de l'activité par major, bande grise ×15–30 de Wilson, courbe du champ moyen superposée aux points simulés.
4. **Naissance des spécialistes** : réplique animée des Fig. 1a–b de Theraulaz et al. 1998 (spaghettis de θ, puis carte de chaleur individus × tâches).
5. **Carte des régimes** : plan (φ, p) coloré selon « tous spécialistes / différenciés / aucun », avec les frontières publiées 0,4, 2, 0,04 et 0,42 en pointillé.
6. **Retirer puis rendre** : chronologie interactive avec curseur $T_r$; courbes $N_n$ et $N_f$; message : la colonie ne revient pas à l'état d'avant (hystérésis).
7. **Deux ruches, un thermomètre** : écran partagé, 1 patriligne contre 15, abeilles colorées par patriligne, trace de température avec la bande 33–36 °C.
8. **Le tapis roulant de l'âge** : la vie d'une ouvrière en quatre stations (Seeley 1982); bouton « retirer les butineuses » qui fait sauter des jeunes à la station finale (hypothèse du modèle, voir A2; Huang et Robinson 1992 décrit des transplants d'abeilles âgées, pas un retrait de butineuses).
9. **Les paresseuses de réserve** : retirer les 20 % les plus actives ou les plus inactives et voir qui comble le vide (Charbonneau et al. 2017).
10. **Panneau agentique** : tableau de tâches avec arriéré par type; agents homogènes contre diversifiés; nombre de changements de tâche par agent et oscillation de l'arriéré (cf. Wu et al. 2020).

## 6. Parallèles agentiques

| Mécanisme biologique | Équivalent agentique | Appui | Statut |
|---|---|---|---|
| Stimulus partagé $s_j$, travail tiré par les individus | Arriéré par type de tâche sur un tableau partagé; les agents tirent le travail sans orchestrateur (auto-organisation stigmergique, état partagé persistant) | Campos et al. 2000 : allocation inspirée de la division du travail appliquée à l'ordonnancement de camions (affectés à des cabines de peinture), comparée à un mécanisme de marché, les deux s'adaptant bien. Krieger et al. 2000 : robots plus efficaces en groupe, avec gains décroissants dans les grands groupes (interférence). Côté LLM, seul Yang et al. 2025 (ligne « Renforcement des seuils ») décrit une coordination sans orchestrateur central. **Contre-exemple** : Han et Zhang 2025 propose un tableau noir pour agents LLM, mais une unité de contrôle (un agent LLM) y sélectionne itérativement les agents d'après la requête, les messages courants du tableau et les capacités des agents (texte lu par la vérification indépendante); c'est un sélecteur central sur état partagé, plus proche de l'orchestration que d'un tirage du travail par les agents. | Faisabilité appuyée hors LLM (Campos et al. 2000, Krieger et al. 2000); côté LLM, appui limité à Yang et al. 2025 (résumé); correspondance [I] |
| $\delta/\alpha$ = fraction active à l'équilibre | Taux d'utilisation ρ = λ/μ d'un pool d'agents | Dérivation section 3.1; lien avec la loi de Little du Projet 4 | [I] |
| Diversité des seuils (castes, patrilignes) | Hétérogénéité des agents (modèles, prompts, températures d'échantillonnage [à confirmer : `temperature` non réglable sur les modèles récents, cadre 2.4 n° 16]) | Wu et al. 2020 : seuils homogènes = pire performance et plus de 400 changements de tâche par course; distribution uniforme meilleure. Kim et al. 2025 : erreurs fortement corrélées entre plus de 350 LLM (accord de 60 % quand les deux se trompent), plus fortes chez les gros modèles. Kleinberg et Raghavan 2021 : la monoculture algorithmique peut réduire la qualité collective, même sans choc. | Hypothèse plausible, non démontrée pour les agents LLM |
| Contre-preuves | Idem | Lynch et al. 2024 : la variation n'améliore pas l'allocation; Garrison et al. 2018 : les seuils individuels ne prédisent pas la réponse en groupe; Ulrich et al. 2021 : les seuils seuls ne suffisent pas | À intégrer comme scénarios de réfutation |
| Renforcement des seuils (ξ, φ) | Spécialisation par la mémoire d'expérience; oubli = décroissance ou TTL de la mémoire | Yang et al. 2025 : coordination décentralisée sans orchestrateur central, mémoire par récupération qui affine les compétences et spécialise | Analogie [I]; appui sur le résumé seulement |
| Hystérésis (Fig. 3 de Theraulaz et al. 1998) | Verrouillage de rôle : un agent spécialisé ne rend pas sa place après le retour du titulaire | Wu et al. 2020 cite Theraulaz et al. 1998 et Kazakova et Wu 2018 [non vérifiée] : une fois adapté, le système se réadapte difficilement | Appui [S] |
| $p$, durée moyenne $1/p$ | Délai d'expiration, nombre maximal de tours, préemption | Theraulaz et al. 1998 (définition de $p$) | [I] |
| Ouvrières inactives | Capacité de réserve (agents en veille); coût contre latence de réaffectation | Charbonneau et Dornhaus 2015a généralise explicitement à « tout système distribué »; Charbonneau et al. 2017 : réserve qui remplace les actives | Appui direct (Charbonneau et Dornhaus 2015a) |
| Fatigue (Hasegawa et al. 2016) | Quotas, limites de débit, temps de recharge | Hasegawa et al. 2016 : les seuils variables prolongent la persistance quand la fatigue existe | [I] |
| Co-localisation des tâches d'un même âge (Seeley 1982) | Localité des données et des files de travail pour réduire le coût de recherche de travail | Seeley 1982 [R] | [I] |
| Inhibition sociale (Beshers et al. 2001) | Promotion à un rôle freinée tant que ce rôle est assez peuplé | Beshers et al. 2001 [R] | [I] |
| Modes d'échec | Désalignement entre agents, rôles dupliqués ou abandonnés | Cemri et al. 2025 : 14 modes en 3 catégories (conception, désalignement inter-agents, vérification), κ = 0,88 (accord inter-annotateurs, relevé dans le texte de la v3 et non dans son résumé; la v3 donne aussi κ = 0,77 pour le juge LLM) | Correspondance fine non faite (résumé lu par le dossier; κ confirmé dans le texte v3 par la vérification indépendante) |

Proposition de protocole pour le Projet 7 [I] : remplacer la règle $T_\theta$ par un agent LLM qui reçoit l'arriéré et décide de prendre ou non une tâche. Comparer quatre conditions (même modèle/même prompt; même modèle/prompts variés; modèles différents; règle à seuils), avec trois mesures : écart-type de l'arriéré, changements de tâche par agent, fraction active comparée à δ/α. Séparer la diversité inter-agents de la température d'échantillonnage (réglage à revérifier avant toute exécution, cadre 2.4 n° 16).

## 7. Corrections à v3

1. **Erreur de sens** : « les petites ouvrières prennent la relève » est faux. Chez Wilson 1984, on réduit la part des minors (petites ouvrières) et ce sont les **majors** (grandes ouvrières, « soldats ») qui élargissent leur répertoire (×1,4–4,5) et leur activité (×15–30).
2. « Retrait d'une caste » est inexact : Wilson abaisse le ratio minors:majors sous 1:1 (contre 3:1 à 20:1 selon l'espèce) dans 3 des 10 espèces étudiées (*P. guilelmimuelleri*, *P. megacephala*, *P. pubiventris*); il ne retire pas toute une caste.
3. Le modèle à seuils fixes ne se réduit pas à $T_\theta(s)$ : il faut aussi la dynamique du stimulus ($\delta$, $\alpha$, normalisation par $N$) et la probabilité d'abandon $p$. Sans elles, aucune reproduction n'est possible.
4. Theraulaz et al. 1998 n'est pas un modèle de fourmi : il est générique et illustré par la guêpe *Polistes dominulus*, l'abeille et une expérience proposée sur *Polistes instabilis*. Titre exact imprimé : « Response threshold reinforcement… » (Crossref : « reinforcements »).
5. Seeley 1982 ne décrit pas « nourrice → bâtisseuse → butineuse » : il identifie quatre sous-castes d'âge (nettoyage des cellules, nid à couvain, stockage de la nourriture, butinage). Sa thèse porte sur la réduction du coût de recherche du travail par la co-localisation des tâches.
6. Jones et al. 2004 : la diversité des seuils est **génétique** (patrilignes issues de la polyandrie). Le résumé parle de températures « moins stables » et de « réponses excessives », pas explicitement d'oscillation : « une ruche homogène oscille » est une inférence à vérifier dans le texte. Le modèle chiffré est dans Graham et al. 2006, avec 1 contre 15 patrilignes en chauffage et 5 patrilignes en ventilation.
7. Le parallèle « des agents identiques réagissent en même temps et oscillent; la diversité stabilise » est présenté comme un fait. C'est une hypothèse, appuyée indirectement (Wu et al. 2020, Kim et al. 2025, Kleinberg et Raghavan 2021) et contredite en partie (Lynch et al. 2024, Garrison et al. 2018, Ulrich et al. 2021).
8. Manquants par rapport à la portée demandée : Robinson 1992 et la plasticité de l'âge (butinage précoce, réversion; Huang et Robinson 1992), le modèle d'inhibition sociale (Beshers et al. 2001), le foraging-for-work (Tofts et Franks 1992, Tofts 1993, Franks et Tofts 1994), les ouvrières inactives (Charbonneau et Dornhaus 2015a, b, Charbonneau et al. 2015, Charbonneau et al. 2017, Hasegawa et al. 2016) et les revues Beshers et Fewell 2001 et Duarte et al. 2011.
9. Toutes les références P3 de v3 existent bien. Leurs métadonnées sont dans la section 2.

## 8. Questions ouvertes et moyens de trancher

1. **Paramètres de Bonabeau et al. 1996 [non vérifiée]** (θ minors/majors, $N$, $p$, $\delta$, $\alpha$, figures, méthode d'ajustement) : lire le texte (accès institutionnel ou demande à l'auteur). Sans eux, F1 reste une calibration et non une reproduction.
2. **Chiffres et équations de Jones et al. 2004 et Graham et al. 2006** (nombre de colonies, nombre de mâles, variance de température, règle de chauffage et de ventilation, paramètres) : lire Science (matériel supplémentaire) et *Insectes Sociaux* 53:226–232. Ils figent A3 et A4.
3. **Équations de Beshers et al. 2001** (inhibition sociale) et de Tofts 1993 (FFW) : lire J. Theor. Biol. 213:461–479 et Bull. Math. Biol. 55:891–918.
4. **Pas de temps et bruit de Theraulaz et al. 1998** : vérifier que F3–F5 tiennent pour Δt = 1 et Δt = 0,1. Si les transitions bougent, le critère doit porter sur la forme des transitions et non sur leur valeur exacte.
5. **Demande proportionnelle à N ou absolue** : le test discriminant de la section 3.4 dira laquelle reproduit Charbonneau et al. 2017.
6. **La diversité aide-t-elle vraiment ?** Myerscough et Oldroyd 2004 et Jones et al. 2004 disent oui; Lynch et al. 2024 et Duarte et al. 2012 nuancent. Il faut trancher par métrique (stabilité, coût de changement, réactivité) dans la même simulation : c'est l'apport comparatif du Projet 3.
7. **Échelle de temps** : Wilson observe le changement en moins d'une heure; aucune correspondance pas de modèle ↔ minutes n'a été lue. Il faut une mesure de $p$ réel (durée moyenne d'un acte) pour convertir.
8. **Agents LLM** : aucune étude lue ne mesure l'oscillation d'agents LLM identiques en allocation de tâches. C'est la contribution expérimentale propre du Projet 7.

## 9. Historique de vérification

Vérification indépendante du 2026-10-01 (`recherche/verifications/p3-division-travail.md`) : 41 références, 33 confirmées, 7 corrigées, 1 non vérifiable, 0 fausse. La consolidation du même jour porte la section 2 à 43 entrées (deux références citées par intermédiaire s'y ajoutent).

### Corrections appliquées

1. **Han et Zhang 2025** (section 6, ligne « Stimulus partagé ») : retiré des appuis et présenté comme contre-exemple (une unité de contrôle centrale sélectionne les agents). Conclusion de la ligne mise à jour : faisabilité appuyée hors LLM; côté LLM, seul Yang et al. 2025.
2. **Huang et Robinson 1992 et A2** (sections 3.5, 4, 5) : « jusqu'à 2 semaines plus tôt » recadré en description générale; l'expérience de l'article est un transplant d'abeilles âgées dans des colonies sans butineuses. A2 reformulée; le paradigme « retrait des butineuses » est marqué [non vérifiée]; le visuel 8 et la reconstruction de la section 3.5 sont ajustés.
3. **Métadonnées** : Duarte et al. 2012 (66(6):947–957); Lynch et al. 2024 (auteurs Lynch C.M., Wilson R.C., Dornhaus A.; DOI 10.1101/2024.05.13.593812); Wu et al. 2020 (FLAIRS-33, pas la conférence AAAI); Kang et Theraulaz 2016 (version publiée, *Bull. Math. Biol.* 78(5):879–915, qui remplace « KT2015 »); Fontanari et al. 2024 (DOI 10.1016/j.ecocom.2024.101083; règle de réponse erf signalée en 3.1); Bonabeau et al. 1998 (n° 4).
4. **Bonabeau et al. 1996** : statut [Résumé] remplacé par [M] et corroboration indirecte par Theraulaz et al. 1998; paragraphe de 3.1 réécrit; marque [non vérifiée] à chaque citation; paramètres [à confirmer].
5. **Section 3.1** : colonnes « 1:2 » calculées avec f = 0,67; valeurs à f = 2/3 exact indiquées.
6. **Nuances de la vérification** : Jones et al. 2007 (« in many cases »; sections 3.6 et A4); Stabentheiner et al. 2010 (« environ 2 jours », chaleur active); Cemri et al. 2025 (κ = 0,88 dans le texte de la v3 et non dans son résumé; κ = 0,77 pour le juge LLM); Jeanson et al. 2007 (pages vérifiées, plus [S]); Lynch et al. 2024 (bénéfices de la spécialisation non modélisés); Charbonneau et al. 2017 (numéros de figures [à confirmer]); numéros de livraison ajoutés aux références.
7. **Alignement sur le cadre** (qui prime) : « chorégraphie par état partagé » remplacé par « auto-organisation stigmergique » (cadre 2.2); température d'échantillonnage des LLM marquée [à confirmer] (cadre 2.4 n° 16).
8. **Forme** : légende [T], [R], [M], [S], [I] (anciennement [Texte], [Résumé], [Méta], [Secondaire], [Inféré]); références nommées par étiquette « Nom année », anciennes clés conservées dans la section 2; Kazakova et Wu 2018 et Bonabeau et al. 1997 ajoutés à la section 2 (références citées par intermédiaire, source lue : listes de références de Wu et al. 2020 et de Fontanari et al. 2024).
9. **Recoupé lors de la consolidation** : résumé de Huang et Robinson 1992 (Europe PMC); métadonnées de Duarte et al. 2012, Lynch et al. 2024, Kang et Theraulaz 2016 et Bonabeau et al. 1998 (OpenAlex); DOI de Fontanari et al. 2024 (Crossref); lieu de Wu et al. 2020 (NSF PAR). Le résumé de Bonabeau et al. 1996 reste inaccessible (masqué par l'éditeur sur Semantic Scholar; Royal Society 403).

### Réserves restantes

- **Bonabeau et al. 1996 [non vérifiée]** : résumé, paramètres de caste et figures non lus; F1 reste une calibration. Un résumé relayé par Consensus (première version du dossier, audit de simulation) n'a pu être reproduit.
- **Paradigme « retrait des butineuses → butinage précoce »** (A2) : source à trouver; seuil de 7 j [à confirmer].
- **Jones et al. 2004, Graham et al. 2006** : texte, matériel supplémentaire, équations et chiffres non lus; A3 et A4 ne sont pas figés. Équations de Beshers et al. 2001 et de Tofts 1993 non lues.
- **Kazakova et Wu 2018, Bonabeau et al. 1997** : non consultées (citées par intermédiaire); pas de DOI relevé pour Bonabeau et al. 1997.
- **Lynch et al. 2024** : prépublication, non évaluée par les pairs. **Wu et al. 2020** : pages non trouvées.
- **Charbonneau et al. 2017** : numéros de figures [à confirmer]. Bornes de F5 (3000 et 4500) lues sur le graphique; la vérification les juge compatibles et prudentes.
- **Calibration θ₂/θ₁ ≈ 6–10** : valeur de l'auteur du dossier [à confirmer] tant que les paramètres de Bonabeau et al. 1996 ne sont pas lus.
- **Mode de lecture** : plusieurs citations du résumé de Wilson 1984 (dont « 75 % ou plus ») ont été extraites par un outil de lecture à petit modèle (WebFetch), puis recoupées; ce n'est pas une lecture directe de la page éditeur.
- **Paramètres LLM** : réglage de la température et identifiants de modèles à revérifier avant toute exécution du Projet 7 (cadre 2.4 n° 16 et section 10).

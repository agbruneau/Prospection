# Vérification indépendante — dossier P6 « Pathologies »

Vérifié le 2026-10-01. Sur 44 références, j'en confirme 26, 10 demandent une correction (aucune n'est grave), 8 restent non vérifiables (texte inaccessible) et aucune n'est fausse.

## Méthode et limites

- **Métadonnées** : Crossref, OpenAlex et arXiv, consultés pour chaque DOI ou identifiant arXiv.
- **Contenu** : textes intégraux que j'ai extraits moi-même avec PyMuPDF : Couzin 2002 (PDF vert jmvidal), Pais 2013 (PLOS), Erhard (arXiv v2), Aswale (arXiv v2), Gu (arXiv v2), Lee et Tiwari (arXiv v1) et Cemri (arXiv v3). Les résumés viennent d'Europe PMC, d'OpenAlex ou d'arXiv.
- **Fichiers locaux** : trois textes viennent de PDF déjà présents dans l’espace de travail de la session (non versionné), dont je n'ai pas vérifié la provenance moi-même. Il s'agit de `schneirla1944.pdf`, que j'ai extrait moi-même (en-tête *American Museum Novitates* n° 1253 conforme), de `p6src_malickova2015.pdf` (extrait moi-même) et de `couzin2003.txt`, une extraction faite par un autre agent dont l'en-tête et les dates concordent avec Crossref. Les détails confirmés à partir de ces fichiers reposent sur cette réserve.
- **Inaccessibles** : PMC (captcha), PNAS, Royal Society et Springer (erreur 403 ou boucle de témoins). Le texte intégral d'Europe PMC répond par une erreur 500 hors du sous-ensemble en libre accès, et l'outil tronque le texte Gutenberg de Beebe. Les quotas WebSearch et Consensus étaient épuisés.

## 1. Références problématiques

| Clé | Statut | Correction | URL |
|---|---|---|---|
| `erhard2022` | corrigée | La version publiée est parue en ligne le 2022-11-15 dans *J. Stat. Phys.* **190**(1), art. 18, numéro de **2023**. Ajouter le volume et l'article. Les énoncés (éq. 2.1–2.2, Prop. 2.1, Th. 2.2) concordent avec la v2 arXiv. | https://doi.org/10.1007/s10955-022-03031-0 |
| `chan2026` | corrigée | Il y a deux auteurs, pas « et al. » : **Chan, A. et Kanso, E.** (2026). *Bioinspiration & Biomimetics* **21**(1):016024, DOI **10.1088/1748-3190/ae39bd**. Le résumé décrit un modèle à « avoidance, alignment, attraction » sans nommer Couzin : en faire le modèle de Couzin 2002 est une inférence, très probable. | https://doi.org/10.1088/1748-3190/ae39bd |
| `cemri2025` | corrigée | Les fréquences des 14 modes sont exactes (FM-2.4 vaut 0,85 % dans le texte et 0,80 % dans la fig. 1). Les **totaux par catégorie sont faux** : la fig. 1 de la v3 donne **44,2 % / 32,3 % / 23,5 %**, la fig. 4 donne 41,8 % / 36,9 % / 21,3 %. Les valeurs 32,15 % et 26,05 % n'apparaissent nulle part. Le dossier mélange deux figures. | https://arxiv.org/abs/2503.13657 |
| `gu2024` | corrigée | L'éq. (5) publiée est stochastique : c_{t+1} = (1−γ)c_t + Δ_t/N, avec Δ_t ~ B(N/2, βc_t(1−c_t)). La forme déterministe c_{t+1} = (1−γ)c_t + βc_t(1−c_t)/2 en est l'espérance et n'est pas numérotée. La limite 1 − 2γ/β, valable si β > 2γ, découle de l'éq. (7). La valeur ~100 % à 27–31 tours est confirmée. | https://arxiv.org/abs/2402.08567 |
| `aswale2022` | corrigée | Le nombre de répétitions existe bien : **20 simulations par configuration** (légende de la fig. 4 et texte de la fig. 8). Q7 se résout, et T11 peut viser 20 répétitions et plus. Petite incohérence interne : le §4.3 annonce « magnitude of 58 », la conclusion « factor of 57 ». Toutes les autres valeurs sont confirmées. | https://arxiv.org/abs/2202.01808 |
| `delsuc2003` | corrigée | Nuance pour C12 : les ~105 Ma sont l'estimation moléculaire de **Brady 2003**, que Delsuc rapporte. Le chiffre ne vient pas du commentaire lui-même. La formule « prix évolutif » est confirmée. | https://doi.org/10.1371/journal.pbio.0000037 |
| `peck2019` | corrigée | Le titre est tronqué. Titre complet : « Mite bombs or robber lures? The roles of drifting and robbing in *Varroa destructor* transmission from collapsing honey bee colonies to their neighbors ». Le contenu (6 colonies saines, 3 infestées) est confirmé par le résumé. | https://doi.org/10.1371/journal.pone.0218392 |
| `neumann2019` | corrigée | Il manque un segment au titre : « …by socially parasitic Cape honeybee, ***A. m. capensis***, workers ». Le contenu est confirmé par le résumé. | https://doi.org/10.1038/s41598-019-43920-1 |
| `neumann2011` | corrigée | Le titre se termine par « …in honeybees (*Apis mellifera* L.) ». L'article est paru en ligne en 2010 et dans le numéro de 2011. Le contenu (clone issu d'une seule ouvrière, Fst = 0,32, 0,71 % d'hybrides) est confirmé. | https://doi.org/10.1111/j.1420-9101.2010.02167.x |
| `cappa2019` | corrigée | Ajouter **9:3171**. Le passage cité est confirmé : mimétisme des CHC chez *Acherontia atropos* et *Braula coeca* (réf. 66–67), mimétisme de Varroa (réf. 62–65). Je n'ai pas vu les entrées bibliographiques 62–67, donc l'attribution à Moritz 1991 et à Martin et Bayfield 2014 n'est pas vérifiée. | https://doi.org/10.1038/s41598-019-38963-3 |
| `seeley1999` | non vérifiable | Pages confirmées : **45(1):19–31**. Le contenu (une douzaine de sites ou plus, envol environ 1 h après l'unanimité, arrêt des danses plutôt que changement de site) n'a pas pu être lu : pas de résumé accessible, Springer est bloqué. | https://doi.org/10.1007/s002650050536 |
| `seeley2003` | non vérifiable | Métadonnées exactes. Les chiffres « 23 sur 27, 6 essaims » et la décroissance linéaire des tours n'ont pas pu être lus : Springer est bloqué et aucun résumé n'est indexé. | https://doi.org/10.1007/s00265-003-0598-z |
| `lindauer1955` | non vérifiable | Métadonnées exactes (*Z. vergl. Physiol.* 37(4):263–324; la revue s'appelle aujourd'hui *J. Comp. Physiol. A*). Le résumé allemand (scission de la nuée, Schwirrlauf, 20 000–30 000 abeilles) est inaccessible. | https://doi.org/10.1007/BF00303153 |
| `neumann2002` | non vérifiable | Métadonnées exactes. Le contenu (pseudo-reines, « capensis calamity ») ne peut pas être lu : pas de résumé accessible. | https://doi.org/10.1007/s00265-002-0518-7 |
| `beekman2001` | non vérifiable | Métadonnées exactes. Le résumé confirme la transition de premier ordre avec hystérésis chez *Monomorium pharaonis*. L'éq. 1, β = 0,00015, s = 10, α = 0,021/0,0045/0,0052, les colonies de 300 et 700 ouvrières (4,7 ± 3,3 contre 2,6 ± 3,3, P = 0,005) et le nourrisseur à 50 cm restent non lus : PNAS et PMC sont bloqués. | https://doi.org/10.1073/pnas.161285298 |
| `dussutour2009` | non vérifiable | Métadonnées exactes. Le résumé confirme *Pheidole megacephala*, le modèle par EDS et le rôle fonctionnel du bruit. Les branches de 60/180 mm, le blocage de 60 à 120 min, le ratio 16/21, les paramètres q₁, q₂, α, k, ρ et la durée de plus de 250 min sans bruit restent non lus. Le dossier lui-même les tient de résumés automatiques. | https://doi.org/10.1098/rspb.2009.1235 |
| `zakir2022` | non vérifiable | Métadonnées exactes (ANTS 2022, LNCS 13491, p. 209–221). Le contenu est inaccessible : résumé masqué, dépôt ULB sans texte. | https://doi.org/10.1007/978-3-031-20176-9_17 |
| `beebe1921` | non vérifiable | Le titre et le chap. XII « Sequels » sont confirmés (Gutenberg #25888; l'édition transcrite est celle de Garden City Publishing Co., © 1921). L'outil tronque le texte : la boucle de 1200 pieds, les 2 à 2¾ po/s, environ 2 h 30 par tour, la traînarde et l'histéride n'ont pas été vus. | https://www.gutenberg.org/ebooks/25888 |

**Confirmées sans réserve (26)** : `schneirla1944`, `couzin2002`, `couzin2003` (sous la réserve du fichier local), `malickova2015`, `das2017`, `sasaki2013`, `gruter2012`, `giraldeau2002`, `bikhchandani1992`, `akino1999`, `nash2008`, `barbero2009`, `johnson2011` (en ligne en 2010, numéro de 2011), `moritz1991` [M], `couvillon2008` [M], `oldroyd2002` [M] (le numéro est le 6), `seeley2010` [M], `seeley2012` (en ligne en déc. 2011), `pais2013`, `greshake2023`, `cohen2024`, `lee2024`, `triedman2025`, `hammond2025`, `fourney2024`, `wynn2025`.

## 2. Résultats cibles et paramètres

| Élément du dossier | Vérification | Source lue |
|---|---|---|
| Schneirla : 4 sept. 1936, BCI, Haskins Library, *E. praedator*, « several hundred », sens antihoraire | Confirmé, p. 6 | PDF |
| 10–11,5 cm / 4–5 cm / 1–2 cm (7 h 30–8 h 15); 14–15 cm à midi | Confirmé, p. 6–7 | PDF |
| 20 h 30 : deux anneaux presque égaux, antihoraires, bords à environ 20 cm | Confirmé, p. 8 | PDF |
| 5 sept., 6 h 30 : environ 3 douzaines de fourmis, anneau d'environ 7 cm, dessiccation après plus de 24 h | Confirmé, p. 8 | PDF |
| 1,12 po de pluie | Confirmé (note de la p. 8). Cette pluie tombe le **3 sept.**, avant 15 h. | PDF |
| Collisions frontales qui retournent une fourmi en sens horaire | Confirmé, p. 6 | PDF |
| Wheeler : 46 h (p. 6) contre 48 h (p. 9) | Incohérence confirmée (« forty-six hours », puis « 48 hours ») | PDF |
| Fabre : 1,35 m, 7 jours | Confirmé, p. 5 | PDF |
| Comparaison avec Parr (1927) : stimulation unilatérale, 2D contre 3D | Confirmé, p. 19–21 | PDF |
| Couzin 2002 : τ = 0,1 s; ½(d_o + d_a); cône arrière (360 − α)° | Confirmé | PDF |
| Tableau 1 : N 10–100; r_r = 1; Δr_o et Δr_a 0–15; α 200–360°; θ 10–100 °/s; s 1–5; σ 0–0,2 rad | Confirmé (σ y figure aussi en degrés : 0–11,5°) | PDF |
| Fig. 3 : N = 100, r_r = 1, α = 270°, θ = 40, s = 3, σ = 0,05; 30 répétitions; ≤ 5000 pas | Confirmé | PDF |
| Fragmentation à plus de 50 % (région e); α ≈ 230°; tore réduit à α = 360° | Confirmé | PDF |
| Fig. 4 : r_a = 14, 2000 pas, 15 répétitions; tore vers 1,5, polarisé au-delà de 2,5; pas de tore en descendant; perte de polarisation sous 1,5 | Confirmé | PDF |
| Tore associé aux barracudas, carangues et thons; aucune mention de fourmis | Confirmé | PDF |
| Couzin et Franks 2003 : Δt = 0,02 s; D = 0,01; S(C), k = 100; ε de 0,5 rad; r_d, r_p, b, f, u_des, u_min, m; 226 individus | Confirmé | fichier local |
| Fig. 2 « Circular milling » : N = 50, θ_p = 500, σ = 0,01, Q = C_max = 1,2 × 10⁻⁶, τ = 300 s, t = 5000, 100 répétitions; α = 90°, θ_a = 1000 | Confirmé | fichier local |
| Moulins sous fortes pluies; pas de bidirectionnalité stable dans les moulins | Confirmé | fichier local |
| Fig. 3 : N = 97 rentrantes, 84 sortantes, 113 interactions; fig. 4 : F maximal à ω = 1, Δθ_a = 1400 | Confirmé | fichier local |
| Unités de Q : g cm⁻¹ dans le texte, g cm⁻³ dans les légendes | Incohérence confirmée | fichier local |
| Erhard : éq. 2.1–2.2; Th. 2.2 (graphe fini qui n'est pas un arbre, ℤᵈ avec d ≥ 2); Prop. 2.1, limite ±(1−e^{−β})/(1+e^{−β}) | Confirmé (sur ℤ la marche est dite *transiente*) | arXiv |
| Malíčková : moulins spontanés (fig. 7, t = 750–790); « mill futilely » avec une seule phéromone | Confirmé | PDF local |
| Pais : éq. (1) (bruit k√(ψ_U² + ψ_i² + ψ_U²ψ_i²)); γ = ρ = v, α = 1/v; éq. (4) σ* = 4v³/(v²−1)²; fig. 3 (t = 30, k = 0,05); seuil de 0,7 (fig. 5); hystérésis entre −0,5 et +0,5; loi de Weber | Confirmé. Le Texte S1 n'a pas été lu (T9 reste bloqué). | PLOS |
| Calculs [I] : σ*(1,5; 2; 3; 4) = 8,640; 3,556; 1,688; 1,138; ψ = 0,4606 à σ = 0 et v = 2; gagnant ψ_A = 0,5915 à 1,5σ* | Recalculés et exacts | calcul indépendant |
| Bistabilité de Beekman sur [476; 910] avec α = 0,0045, aucune avec α = 0,021 | Recalcul exact **à partir de l'équation transcrite dans le dossier**, que je n'ai pas lue dans la source | calcul indépendant |
| Sasaki : « can lock the colony into a suboptimal choice » | Confirmé | résumé |
| Barbero : « approximately 10,000 species of social parasites » | Confirmé | résumé |
| Aswale : tableau 1, éq. 1–2, « refill » au nid, 21,74 / 0,14 / 13,10 % / 0,39 % / 5 % / 2,23 % / plus de 8 et plus de 96 % / patience max 250 / formation circulaire (fig. 9) | Confirmé | arXiv |
| Lee et Tiwari : 13,92 %, 209 %, 66 % / 9 %, tours 4,7 et 6,3 (fig. 6a), Marking + LLM Tagging qui bloque toutes les attaques | Confirmé | arXiv |
| Cohen : Virtual Donkey, TPR 1,0, FPR 0,015 | Confirmé | résumé |
| Triedman : 58–90 %, jusqu'à 100 %, malgré les refus individuels | Confirmé | arXiv HTML |
| Magentic-One §4.1 : compteur incrémenté en cas de boucle ou d'absence de progrès; seuil ≤ 2, replanification au-delà | Confirmé | arXiv HTML |
| MAST : 1642 traces, 7 cadres, κ = 0,88, 14 modes | Confirmé. Totaux par catégorie : voir `cemri2025`. | arXiv PDF |
| Seeley 2012 : signaux d'arrêt vers les autres sites; le modèle résout l'interblocage | Confirmé | résumé |
| Greshake, Hammond, Wynn, Grüter, Giraldeau, Nash, Akino, Johnson, Peck, Neumann 2011 et 2019 | Contenus confirmés par les résumés | résumés |

**Conséquences pour les cibles** :
- Sont fondées sur des valeurs que j'ai vérifiées : T1–T4 (sous la réserve du fichier local pour T3–T4), T5, T8, T11 (prévoir 20 répétitions), T12 (préciser la forme de l'éq. 5) et T13.
- T6 et T7 reposent sur des chiffres non vérifiés : relire Beekman 2001 et Dussutour 2009 avant de les implanter.
- T9 reste bloqué par le Texte S1.
- T10 repose sur Lindauer 1955, non vérifié.

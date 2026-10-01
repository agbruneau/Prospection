# Dossier P6 — Pathologies de la chorégraphie (fourmilière, ruche, agents)

**Statut : consolidé après vérification indépendante, 2026-10-01.** Rapport : `recherche/verifications/p6-pathologies.md`; corrections et réserves restantes en section 11.

Dossier documentaire du Projet 6 de la proposition v3. Rédigé le 2026-10-01.

**Légende de statut** (utilisée partout) :
- **[T]** texte intégral lu dans la source primaire (ou section citée);
- **[R]** résumé de la source primaire lu, pas le texte;
- **[M]** métadonnées seulement (titre, revue, DOI) confirmées, contenu non lu;
- **[S]** rapporté par une source secondaire nommée;
- **[I]** inférence ou calcul de l'auteur du dossier, non publié.

Marques ajoutées à la consolidation (vérification indépendante du 2026-10-01) :
- **[non vérifiée]** : référence dont le contenu n'a pas pu être relu par la vérification (accès fermé, résumé absent ou texte tronqué). Le contenu rapporté vient de la première collecte et se relit avant usage; les métadonnées sont confirmées.
- **[à confirmer]** : valeur chiffrée ou énoncé que la vérification n'a pas pu confirmer dans la source.

**Limites de la collecte.** Le quota WebSearch de la session et celui de l'outil Consensus ont été épuisés en cours de route; la suite s'est faite par WebFetch (arXiv, PMC, Europe PMC, OpenAlex, Springer) et par extraction de PDF (PyMuPDF). La recherche de modèles récents du moulin n'est donc pas exhaustive (voir Q2). Deux résumés automatiques de pages web se sont révélés faux sur des équations (Pais et al. 2013, Beekman et al. 2001 [non vérifiée]); toutes les équations ci-dessous ont été relues sur le PDF ou sur l'image de l'équation.

Script de vérification des calculs [I] : `dossiers/p6_checks.py` (`python p6_checks.py` doit afficher `checks OK`). Fichier absent du dépôt au 2026-10-01 : les calculs [I] ont été recalculés indépendamment par la vérification (section 11).

---

## 1. Synthèse

1. Le moulin de fourmis est bien documenté à la source : Schneirla 1944 décrit un cas de terrain précis (Eciton praedator, quelques centaines d'ouvrières, anneau de 10 à 15 cm, plus de 24 h, mort par dessiccation), et Beebe 1921 [non vérifiée] une boucle d'émigration de 1200 pieds [à confirmer] qui s'est dissoute quand des traînardes épuisées ont quitté le cercle.
2. La « phase tore » de Couzin et al. 2002 est un modèle 3D de bancs de poissons, sans phéromone ni fourmi. Le modèle fourmi pertinent est Couzin et Franks 2003, qui intitule sa figure 2 « Circular milling ». Schneirla 1944 comparait déjà le moulin de fourmis au moulin de poissons de Parr 1927, en relevant des différences de mécanisme.
3. Le verrouillage a deux formes publiées et modélisées chez la fourmi : bistabilité avec hystérésis selon la taille de colonie (Beekman et al. 2001 [non vérifiée]) et rétroaction positive qui fige un mauvais choix (Sasaki et al. 2013). Le bruit le débloque (Dussutour et al. 2009 [non vérifiée]). Chez l'abeille, l'attrition linéaire des danses empêche le verrouillage (Seeley 2003 [non vérifiée]).
4. L'interblocage de l'essaim sans inhibition croisée est une propriété analytique du modèle Seeley et al. 2012 / Pais et al. 2013 : seuil critique σ* = 4v³/(v²−1)². Avec σ = 0, l'interblocage entre deux sites égaux est garanti [I, vérifié analytiquement et numériquement].
5. Lindauer 1955 [non vérifiée] a observé l'issue concrète de l'indécision : avec deux sites équivalents, deux groupes de danseuses donnent ensemble le signal d'envol, l'essaim tente de se scinder, revient, et peut finir par s'installer à découvert. Scission (double décision) et interblocage (aucune décision) sont deux pathologies distinctes que v3 confond.
6. Côté parasites, le mimétisme ne sert pas qu'à entrer : Maculinea rebeli imite chimiquement l'hôte (Akino et al. 1999) et acoustiquement la reine (Barbero et al. 2009), donc obtient un statut élevé. A. m. capensis est un parasite intraspécifique qui devient pseudo-reine (Neumann et Moritz 2002 [non vérifiée]).
7. Côté agents, la littérature fournit des analogues directs : injection indirecte par l'environnement partagé (Greshake et al. 2023), propagation autoréplicante (Morris II, Prompt Infection, Agent Smith), taxonomie MAST où la répétition d'étapes (15,7 %) et l'ignorance des conditions d'arrêt (12,4 %) correspondent au moulin [I pour la correspondance].
8. Un pont bio-inspiré publié existe : Aswale et al. 2022 (AAMAS) montrent qu'avec une phéromone trompeuse non évaporante, 0,39 % de fourmis artificielles malveillantes suffisent à ramener la collecte à 5 % de sa valeur.

---

## 2. Corrections et approximations de v3

| # | Énoncé v3 | Constat | Statut |
|---|---|---|---|
| C1 | « moulin (Schneirla 1944; phase tore de Couzin et al. 2002) » | Couzin et al. 2002 modélisent des groupes 3D (poissons, oiseaux), par répulsion, alignement et attraction directs, sans piste chimique. Le tore y est rapproché des bancs de barracudas, carangues et thons, jamais des fourmis. Le modèle fourmi est Couzin et Franks 2003 (piste + évitement, conditions périodiques « very similar to the circular mill »). | [T] |
| C2 | Schneirla 1944 comme source du moulin « de la mort » à grande échelle | Le cas de Schneirla 1944 est petit : quelques centaines d'ouvrières, anneau de 10–11,5 cm puis 14–15 cm de diamètre, scindé en deux anneaux après une averse. La boucle géante (1200 pieds [à confirmer]) est celle de Beebe 1921 [non vérifiée], et elle ne s'est pas terminée par la mort de toutes les fourmis dans le passage lu. | [T] pour Schneirla 1944; Beebe 1921 non reconfirmée |
| C3 | Moulin = pathologie propre à la piste chimique | Schneirla 1944 compare explicitement le moulin d'Eciton au moulin de poissons de Parr 1927 : même maintien par stimulation unilatérale, mais modalité tactilo-chimique contre visuelle, 2D contre 3D, initiation périphérique supposée contre centrale. L'analogie fourmi-poisson est donc ancienne et nuancée. | [T] |
| C4 | « parasites par mimétisme chimique (Phengaris) » | Exact mais incomplet : Akino et al. 1999 portent sur Maculinea rebeli et Myrmica schencki. Le mimétisme est aussi acoustique (Barbero et al. 2009 : les larves imitent les sons de la reine) et fait l'objet d'une course aux armements géographique (Nash et al. 2008). La synonymie Phengaris/Maculinea n'a pas été vérifiée ici. | [R] |
| C5 | « intrus par mimétisme chimique (sphinx tête-de-mort, Moritz et al. 1991) » | Le titre dit « chemical camouflage », pas « mimicry ». Le contenu n'a pas pu être lu (pas de résumé en ligne). Une source secondaire (Cappa et al. 2019) range le cas d'*Acherontia atropos* parmi les mimétismes des hydrocarbures cuticulaires (passage confirmé par la vérification); son attribution à Moritz et al. 1991 n'a pas pu être vérifiée [à confirmer] (entrées bibliographiques 62–67 de Cappa et al. non vues). Ne pas décrire le mécanisme avant lecture. | [M] + [S] |
| C6 | « indécision et essaim scindé sans signaux d'arrêt » | Lindauer 1955 [non vérifiée] décrit la tentative de scission quand deux sites sont équivalents, sans la relier aux signaux d'arrêt, découverts dans ce contexte bien plus tard (Seeley et al. 2012). Le modèle Seeley et al. 2012 / Pais et al. 2013 prédit un **interblocage** (aucun site au quorum), pas une **scission** (deux sites au quorum). Laquelle des deux survient dépend du seuil de quorum par rapport au niveau d'interblocage. | [R] + [I] |
| C7 | « À reproduire : interblocage quand on supprime l'inhibition croisée » | Avec σ = 0 et deux sites égaux (v > 1), l'interblocage est garanti par la structure des équations : c'est un test d'implantation, pas la reproduction d'un résultat. Le résultat non trivial à reproduire est la courbe σ*(v) et la sensibilité à la valeur (Pais et al. 2013, fig. 2). | [I] |
| C8 | Verrouillage et cascades absents de P6 | v3 n'en parle qu'en P1. Pour P6, la littérature offre l'hystérésis de Beekman et al. 2001 [non vérifiée], le verrouillage de Sasaki et al. 2013, le déblocage par le bruit (Dussutour et al. 2009 [non vérifiée]) et l'antidote apicole (attrition des danses, Seeley 2003 [non vérifiée]; Seeley et Buhrman 1999 [non vérifiée]). | [R] |
| C9 | « injection de faux signaux (prompt injection) » | Trop générique. L'analogue stigmergique est l'injection **indirecte** par des données récupérées (Greshake et al. 2023). L'analogue du parasite qui se propage est l'invite autoréplicante (Cohen et al. 2024; Lee et Tiwari 2024; Gu et al. 2024). | [R] |
| C10 | Abeilles : intrus externes seulement | A. m. capensis est un parasite **intraspécifique** : des ouvrières pondent, produisent des phéromones de reine et remplacent la reine hôte. C'est l'analogue d'une compromission interne, distinct de l'intrusion. | [R] |
| C11 | Critère v3 « reproduire un résultat publié pour chaque espèce » | Pour l'interblocage de l'essaim sans signaux d'arrêt, il n'existe pas d'expérience de terrain (supprimer les signaux d'arrêt est impraticable) : la cible est un résultat de modèle. Pour l'apparition spontanée du moulin en 2D, aucun modèle évalué par les pairs n'a été trouvé (recherche incomplète, voir Q2). | [I] |
| C12 | Delsuc 2003 souvent cité comme source primaire du moulin | C'est un « Journal Club » de PLoS Biology commentant Brady 2003 (PNAS). Le chiffre de ~105 millions d'années est l'estimation moléculaire de Brady 2003 [non vérifiée], que Delsuc rapporte; il ne vient pas du commentaire lui-même. | [T] |

---

## 3. Fourmis

### 3.1 Observations primaires du moulin

| Source | Fait | Emplacement | Statut |
|---|---|---|---|
| Schneirla 1944 | 4 septembre 1936, île Barro Colorado, trottoir de ciment devant la Haskins Memorial Library; Eciton praedator; « several hundred » ouvrières; rotation antihoraire autour d'un amas central | p. 6 | [T] |
| idem | 7 h 30–8 h 15 : diamètre extérieur 10–11,5 cm, largeur de l'anneau 4–5 cm, amas central 1–2 cm; midi : 14–15 cm | p. 6–7 | [T] |
| idem | 20 h 30 : après une forte pluie, le groupe s'est divisé en **deux anneaux** presque égaux, tous deux antihoraires, à ~20 cm d'écart | p. 8 | [T] |
| idem | 5 septembre, 6 h 30 : sol jonché de mortes; ~3 douzaines tournent encore (anneau ~7 cm); mort probable par dessiccation après plus de 24 h de rotation | p. 8 | [T] |
| idem | Hypothèse d'initiation : groupe isolé par une averse (1,12 po de pluie, tombée le 3 septembre avant 15 h), amas pendant la pluie, puis les fourmis du bord suivent la périphérie en tournant vers le côté du contact et du produit chimique | p. 8–9 | [T] |
| idem | Une fourmi qui repart dans le sens horaire est retournée par une série de collisions frontales | p. 6 | [T] |
| Wheeler 1910 (cité par Schneirla 1944) | E. schmitti en captivité tourne autour de la base d'un bocal pendant 46 h (Schneirla 1944 écrit 48 h p. 9 : incohérence interne) | p. 6, 9 | [S] |
| Fabre 1896 (cité par Schneirla 1944) | chenilles processionnaires autour d'un vase de 1,35 m de circonférence pendant 7 jours | p. 5 | [S] |
| Schneirla 1944 | Comparaison avec le moulin de poissons de Parr 1927 : maintien par stimulation unilatérale centripète dans les deux cas; différences de modalité (tactilo-chimique contre vision), de dimension (2D contre 3D) et d'initiation | p. 19–21 | [T] |
| Beebe 1921, chap. XII « Sequels » | Colonne d'émigration d'Eciton dont les deux bouts se rejoignent; circonférence mesurée de 1200 pieds (~366 m) [à confirmer]; vitesse 2 à 2¾ po/s, soit ~2 h 30 par tour [à confirmer]; la boucle tourne plus d'une journée | Gutenberg #25888 | [non vérifiée] |
| idem | Fin : une traînarde « à demi morte » sort du cercle, d'autres suivent sa trace, et le reste de la colonne s'écoule vers la jungle; la mort de toutes n'est pas rapportée | idem | [non vérifiée] |
| idem | Des myrmécophiles (staphylins, un histéride « accepté comme l'un des marcheurs ») tournent avec la colonne | idem | [non vérifiée] |
| Couzin et Franks 2003 | Les fourmis légionnaires forment des moulins quand un nombre modéré est séparé de la colonie et confiné, en laboratoire ou sur le terrain lors de très fortes pluies; aucun trafic bidirectionnel stable n'est observé dans les moulins | §4b(i), §4b(ii) | [T] |
| Delsuc 2003 | Le moulin serait le « prix évolutif » d'une stratégie de fourragement collectif stable depuis ~105 Ma (estimation moléculaire de Brady 2003 [non vérifiée], rapportée par Delsuc) | Journal Club | [T] |

### 3.2 Modèles du moulin et de la phase tore

#### M1 — Couzin et al. 2002 (zones; phase tore) [T]

Individus i = 1…N, position **c**ᵢ, direction unitaire **v**ᵢ, espace 3D continu, pas de temps τ = 0,1 s (section « Behavioural rules: description »).

- Zone de répulsion (rayon r_r), priorité absolue, éq. (1) : **d**_r(t+τ) = −Σ_{j≠i} **r**ᵢⱼ/|**r**ᵢⱼ|, avec **r**ᵢⱼ = (**c**ⱼ−**c**ᵢ)/|**c**ⱼ−**c**ᵢ|.
- Si n_r = 0 : zone d'orientation (r_r ≤ d < r_o), éq. (2) : **d**_o = Σ_{j=1}^{n_o} **v**ⱼ/|**v**ⱼ|; zone d'attraction (r_o ≤ d ≤ r_a), éq. (3) : **d**_a = Σ_{j≠i} **r**ᵢⱼ/|**r**ᵢⱼ|. Si les deux zones sont occupées : **d**ᵢ = ½(**d**_o + **d**_a). Si le vecteur est nul ou aucun voisin : **d**ᵢ = **v**ᵢ.
- Angle mort : cône arrière d'angle (360 − α)°.
- Bruit : rotation de **d**ᵢ tirée d'une gaussienne sphérique enroulée d'écart-type σ.
- Rotation bornée par θτ par pas; vitesse constante s.
- Largeurs : Δr_o = r_o − r_r, Δr_a = r_a − r_o.
- Mesures, éq. (4)–(6) : p_group = (1/N)|Σ **v**ᵢ|; m_group = (1/N)|Σ **r**_ic × **v**ᵢ|, **r**_ic = **c**ᵢ − **c**_group.

Note d'implantation [I] : l'article fait la demi-somme de **d**_o et **d**_a sans dire s'ils sont normalisés avant; beaucoup de réimplantations normalisent. À fixer et documenter.

Tableau 1 (plages explorées) : N 10–100; r_r = 1; Δr_o 0–15; Δr_a 0–15; α 200–360°; θ 10–100 °/s; s 1–5 unités/s; σ 0–0,2 rad; τ = 0,1 s.

Paramètres de la figure 3 : N = 100, r_r = 1, α = 270°, θ = 40 °/s, s = 3, σ = 0,05; 30 répétitions par combinaison; état stable atteint en ≤ 5000 pas.

Résultats publiés :
- Quatre régimes (fig. 3A–D) : essaim (p et m bas), **tore** (p bas, m haut; Δr_o relativement petit, Δr_a relativement grand), groupe parallèle dynamique (Δr_o intermédiaire), groupe très parallèle (Δr_o grand). Région e : plus de 50 % de fragmentation quand Δr_o et Δr_a sont faibles.
- La zone tore se réduit à presque rien quand α = 360° et s'élargit quand α diminue (angle mort). Vers α ≈ 230°, la fragmentation devient courante partout.
- Hystérésis, fig. 4 (r_a = 14 fixe, 2000 pas par valeur de r_o, 15 répétitions) : en montant, essaim → tore vers r_o ≈ 1,5 → parallèle au-delà de ≈ 2,5. En descendant depuis le parallèle, pas de tore; le groupe reste polarisé jusqu'à r_o < 1,5 puis redevient essaim.

Applicabilité aux fourmis [I] : le tore exige alignement direct et attraction à distance, alors que l'Eciton presque aveugle se guide par contact et piste. Ce qui transpose est l'ingrédient structurel (perception frontale et angle mort favorisent la rotation), pas les valeurs. Mise à jour à signaler : Chan et Kanso 2026 (*Bioinspiration & Biomimetics* 21(1):016024) attribuent la « mémoire collective » d'un modèle à évitement, alignement et attraction à une bifurcation transcritique bruitée plutôt qu'à une vraie bistabilité [R]. Leur résumé ne nomme pas Couzin : l'identification de ce modèle à celui de Couzin et al. 2002 est une inférence, très probable [I]. Le résultat d'hystérésis peut donc dépendre de la vitesse de balayage et du bruit [I].

#### M2 — Couzin et Franks 2003 (piste + évitement; moulin, voies de circulation) [T]

Section 2 du modèle (Δt = 0,02 s) :
- Tête en **c**ᵢ + ½b**v**ᵢ; antennes de longueur f à 45° de l'axe.
- Évitement si une autre fourmi est dans le cercle de rayon r_d ou dans l'arc frontal de portée r_p et d'angle interne α. Éq. (2.1) : **d**ᵢ(t+Δt) = Σ_{j≠i} (**c**ᵢ−**c**ⱼ)/|**c**ᵢ−**c**ⱼ|, rotation bornée à θ_aΔt; décélération −m jusqu'à u_min.
- Sinon, piste linéaire, éq. (2.2) : C(r,τ) = Q/(2πDτ) · exp(−r²/(4Dτ)), D = 0,01 cm² s⁻¹, profil figé après un temps τ.
- Stimulus par antenne, éq. (2.3) : S(C) = tan⁻¹(k·C/C_max)/(π/2), k = 100, 0 < S < 1, plus bruit gaussien d'écart-type σ; virage vers le stimulus le plus fort à θ_pΔt; erreur de virage ε ~ N(0; 0,5 rad).
- Préférence directionnelle, éq. (2.4) : **d**′ᵢ = (**d**ᵢ + ω**g**ᵢ)/|**d**ᵢ + ω**g**ᵢ|.
- Paramètres tirés de la vidéo d'E. burchelli (226 individus) : r_d = 0,4 cm, r_p = 1,2 cm, b = 0,8 cm, f = 0,4 cm, u_des = 13 cm/s, u_min = 2 cm/s, m = 50 cm/s².

Figure 2, « Circular milling » : tronçon de 50 cm à conditions périodiques; N = 50, θ_p = 500 °/s, σ = 0,01, Q = 1,2 × 10⁻⁶, C_max = 1,2 × 10⁻⁶, τ = 300 s; flux F (norme de la somme des vitesses normalisée, 0 = pas de flux net, 1 = tous dans le même sens) mesuré à t = 5000 pas, moyenne de 100 répétitions. F est maximal à α et θ_a intermédiaires; à α = 90° et θ_a = 1000 °/s, les fourmis choisissent collectivement un sens (fig. 2c–d).

Figure 4, voies : avec préférence directionnelle et asymétrie de virage Δθ_a entre sortantes et rentrantes, F est maximal à ω = 1 quel que soit Δθ_a; avec Δθ_a grand, les rentrantes occupent le centre et les sortantes les bords. Comparaison terrain, fig. 3 : rentrantes N = 97, sortantes N = 84; 113 interactions (226 fourmis).

Remarque [I] : les unités de Q varient dans l'article (g cm⁻¹ dans le texte, g cm⁻³ dans les légendes). À trancher avant d'implanter.

#### M3 — Erhard et al. 2022 (marche aléatoire renforcée sur arêtes orientées) [T sur la préimpression]

Éq. (2.1)–(2.2) : P(X_{n+1} = x | 𝒢ₙ) = aₙ(Xₙ,x)/Σ_{y∼Xₙ} aₙ(Xₙ,y), avec aₙ(Xₙ,x) = exp(β·cₙ(Xₙ,x)), où cₙ(x,y) est le nombre de passages de x vers y moins le nombre de passages de y vers x.

- Théorème 2.2 : sur tout graphe fini connexe qui n'est pas un arbre, et sur ℤᵈ avec d ≥ 2, la marche est presque sûrement piégée dans un circuit orienté qu'elle suit indéfiniment, **pour tout β ∈ (0, ∞)** : pas de transition de phase en β.
- Proposition 2.1 : sur ℤ, pas de piégeage; Xₙ/n → Y p.s., avec P(Y = ±(1−e^{−β})/(1+e^{−β})) = ½.
- Publié dans le *Journal of Statistical Physics* 190(1), art. 18 (en ligne le 2022-11-15; numéro de 2023) [M, confirmé par Crossref]; le texte lu est la v2 arXiv.

Intérêt : c'est le plus petit modèle exact du moulin (une seule fourmi, mémoire dans l'environnement). Il montre que le piégeage ne demande pas de groupe, seulement un renforcement orienté sans oubli.

#### M4 — Autres modèles du moulin (préimpressions)

- Malíčková et al. 2015 (arXiv, non publié selon OpenAlex) : modèle stochastique hors réseau à deux phéromones; des moulins apparaissent spontanément quand des fourmis en quête de nourriture suivent les traces de fourmis en quête du nid et inversement; le moulin se rompt par le hasard ou la décroissance de la phéromone, ce qui synchronise ensuite la découverte de la nourriture (fig. 7, t ≈ 750–790). La discussion note qu'avec une seule phéromone suivie et déposée à la fois, les fourmis « tourneraient en vain » jusqu'à décroissance [T].
- Das 2017 (arXiv, projet MIT PRIMES) : EDP de diffusion-advection combinant mémoire et renforcement; solution axisymétrique stationnaire stable ressemblant au moulin [R]. Poids faible.

### 3.3 Verrouillage et cascades d'information (fourmis)

#### M5 — Beekman et al. 2001 (transition de phase, hystérésis) [non vérifiée]

Après vérification indépendante : le résumé confirme la transition de premier ordre avec hystérésis chez *Monomorium pharaonis*. L'équation, les paramètres et les résultats chiffrés ci-dessous, lus par l'auteur du dossier (image de l'équation, texte), n'ont pas pu être relus (PNAS et PMC inaccessibles) : [à confirmer].

Éq. (1) [à confirmer] (image de l'équation lue par l'auteur du dossier) : dx/dt = (α + βx)(n − x) − s·x/(s + x), x = fourrageuses à la source, n = taille de colonie. Équilibre : βx³ + (βs + α − βn)x² + (s(1 + α − βn) − αn)x − αns = 0.

Paramètres (fig. 1) : β = 0,00015, s = 10; α = 0,021 (découverte fréquente) ou 0,0045 (découverte rare); α mesuré = 0,0052 par fourmi par minute [à confirmer].

Expérience (Monomorium pharaonis; nourrisseur à 50 cm) : la hausse est faible de 100 à 600 ouvrières puis forte au-delà de 600; hystérésis (fig. 4) : à 300 ouvrières, pas de piste même « aidée » (0,56 ± 1,65); à 700, aidée 4,7 ± 3,3 contre non aidée 2,6 ± 3,3, P = 0,005 [à confirmer].

Calcul [I] (`p6_checks.py`) : avec α = 0,0045, l'équation a trois équilibres positifs (bistabilité) pour n ∈ [476; 910]; avec α = 0,021, aucun. C'est cohérent avec les colonies de 300 (monostable basse) et 700 (bistable) [à confirmer]. Le recalcul indépendant de la vérification confirme ces bornes à partir de l'équation telle que transcrite ici; l'équation source et les valeurs de α, β et s restent à confirmer.

#### Autres sources

- **Sasaki et al. 2013** [R] : chez Temnothorax, les colonies battent les individus quand la différence de qualité entre nids est faible, mais l'inverse quand elle est grande : la même rétroaction positive « can lock the colony into a suboptimal choice ».
- **Dussutour et al. 2009** [non vérifiée] [R : le résumé confirme *Pheidole megacephala*, le modèle par EDS et le rôle fonctionnel du bruit; le reste vient d'un résumé automatique, à relire sur le PDF] : branche courte (60 mm) et longue (180 mm), courte bloquée de 60 à 120 min puis rouverte [à confirmer]; en phase 3, 16 colonies sur 21 reviennent à la branche courte [à confirmer]. Modèle par EDS : dc₁/dt = Q₁p₁(c₁)Φ(t) − ρc₁ + σ dW/dt; q₁ = 0,09, q₂ = 0,13, α = 2, k = 12, ρ = 0,00085 [à confirmer]. Sans bruit (σ = 0), le retour prend plus de 250 min [à confirmer] : le bruit est fonctionnel.
- **Grüter et al. 2012** [R, résumé paraphrasé par OpenAlex] : chez Lasius niger, l'encombrement au nourrisseur fournit une rétroaction négative qui garde la colonie flexible.
- **Giraldeau et al. 2002** [R] : cadre des cascades d'information chez l'animal (copier la décision d'autrui plutôt que l'indice environnemental).
- **Bikhchandani et al. 1992** [M] : théorie des cascades informationnelles.

### 3.4 Parasites sociaux et défense (fourmis)

- **Akino et al. 1999** [R] : les chenilles de Maculinea rebeli fraîchement muées portent des hydrocarbures qui les font reconnaître comme des larves de Myrmica schencki; elles en biosynthétisent une partie et acquièrent le reste dans le nid; le mélange imite mieux l'hôte spécifique que d'autres Myrmica, d'où la spécificité d'hôte.
- **Nash et al. 2008** [R] : plus la chimie de surface de M. alcon ressemble à celle de l'hôte, plus le nid est exploité; course aux armements avec Myrmica rubra (populations différenciées), pas avec M. ruginodis (panmictique), qui sert de refuge évolutif.
- **Barbero et al. 2009** [R] : les reines de M. schencki émettent des sons distincts qui augmentent les soins des ouvrières; les nymphes et larves de M. rebeli imitent ces sons de reine plus que ceux des ouvrières et obtiennent un statut élevé; « approximately 10,000 species of social parasites ».
- **Johnson et al. 2011** [R] : modèle multi-agents où une reconnaissance forte des congénères émerge d'un **collectif de mauvais reconnaisseurs** : un intrus aux odeurs proches passe un gardien, presque jamais plusieurs.

#### M6 — Aswale et al. 2022, « Hacking the Colony » (AAMAS) [T]

Pont direct entre stigmergie et attaque. Tableau 1 : n = 1024 fourmis, N = 50 000 pas, monde 1920 × 1080, cellules de 4, nid (960, 540) rayon 20, nourriture (372, 36) rayon 16, v = 50, Δt = 0,016, χ = 32 vecteurs de sondage de longueur ≤ 40 dans ±0,8π, bruit uniforme ±0,1π, λ = 0,01, τ_turn = 7, τ_attack = 100. Dépôt : intensité 1000·exp(−λτ) (éq. 1); évaporation linéaire de k = 1 unité/s (éq. 2); maximum en cas de dépôt sur une cellule déjà marquée. Répétitions : 20 simulations par configuration (légende de la fig. 4, texte de la fig. 8) [T].

Résultats (§3.4, §4.3) :
- Sans détracteurs : 21,74 unités de nourriture par coopératrice.
- 3,13 % de détracteurs, phéromone trompeuse évaporée comme la vraie, avec « recharge » au nid : 0,14 unité par coopératrice, et seulement 13,10 % des coopératrices livrent de la nourriture.
- Phéromone trompeuse qui ne s'évapore pas : 0,39 % de détracteurs suffisent; collecte à 5 % de la valeur sans attaque.
- Cas extrême (50 % de détracteurs) : 2,23 % des fourmis livrent une fois, aucune deux fois.
- Défense par « phéromone de prudence » (patience max 250) : plus de 8 unités par fourmi et plus de 96 % des coopératrices livrent, soit un gain de facteur 57 (conclusion des auteurs; le §4.3 annonce 58, incohérence interne); échec dans le cas extrême.
- Les auteurs citent le moulin comme exemple de fragilité de la stigmergie (introduction). Dans le cas extrême avec défense (phéromone trompeuse non évaporante), les coopératrices se figent en une formation circulaire stable autour du nid (fig. 9). Le rapprochement entre les deux est une inférence du dossier [I], pas une affirmation des auteurs.

---

## 4. Abeilles

### 4.1 Intrus et mimétisme

- **Moritz et al. 1991** [M] : « Chemical camouflage of the death's head hawkmoth (Acherontia atropos L.) in honeybee colonies », Naturwissenschaften 78(4):179–182. Aucun résumé en ligne; contenu non lu.
- **Cappa et al. 2019** [S] : citent Moritz et al. 1991 et Martin et Bayfield 2014 (pou des abeilles Braula coeca) comme cas de mimétisme du profil d'hydrocarbures cuticulaires; Varroa présente un mimétisme quasi spécifique de la colonie (Le Conte et al. 2015; Kather et al. 2015, non lus). Le passage (mimétisme des CHC chez *Acherontia atropos* et *Braula coeca*, réf. 66–67; Varroa, réf. 62–65) est confirmé; l'attribution à Moritz et al. 1991 et à Martin et Bayfield 2014 reste [à confirmer] (entrées bibliographiques 62–67 non vues).

### 4.2 Pillage

- **Peck et Seeley 2019** [R] : six colonies presque sans varroa entourent trois colonies très infestées; quand ces dernières s'effondrent et sont **pillées**, beaucoup d'acariens se répandent, y compris vers des ruches éloignées; les auteurs préfèrent « robber lures » à « mite bombs ».
- **Couvillon et al. 2008** [M] : « En garde: rapid shifts in honeybee, Apis mellifera, guarding behaviour are triggered by onslaught of conspecific intruders », Animal Behaviour 76(5):1653–1658. Le titre seul établit un changement rapide du comportement des gardiennes sous afflux d'intrus; les chiffres n'ont pas été lus.

### 4.3 Apis mellifera capensis, parasite social intraspécifique

- **Neumann et Moritz 2002** [non vérifiée] [R selon la première collecte; contenu à confirmer, pas de résumé accessible à la vérification] : les ouvrières pondeuses capensis produisent par parthénogenèse des femelles diploïdes; certaines deviennent pseudo-reines (ovaires développés, bouquet phéromonal de reine). Dans une colonie hôte, elles produisent des phéromones de reine malgré la présence de la reine, activent leurs ovaires, remplacent la reine, et leur progéniture est préférentiellement nourrie. Une lignée particulièrement virulente a envahi A. m. scutellata (« capensis calamity »); sans mâles ni reines élevées chez l'hôte, ces clones sont isolés du pool génétique de l'hôte.
- **Neumann et al. 2011** [R] : les ouvrières parasites portent la signature génétique d'un clone fondé par une seule ouvrière ancestrale; le flux génique hôte-parasite est rare.
- **Neumann et Pirk 2019** [R] : les colonies hôtes rejettent mieux les parasites lors d'infections successives; la plupart sont rejetées avant de produire beaucoup de phéromone mandibulaire.
- **Oldroyd 2002** [M] : « The Cape honeybee: an example of a social cancer », TREE 17(6):249–251.

### 4.4 Indécision, scission, interblocage

- **Lindauer 1955** [non vérifiée], résumé allemand [R, traduit selon la première collecte; inaccessible à la vérification] : quand deux nichoirs équivalents sont offerts, l'accord peut ne pas se faire; deux groupes de danseuses d'égale force se forment et donnent ensemble le signal d'envol; la nuée cherche à se scinder, revient peu après et se reforme en grappe. Ou bien les éclaireuses retentent l'accord, ou bien, si cela échoue encore, l'essaim s'installe sur place, bâtit des rayons dans le buisson et commence à élever du couvain. Lindauer note aussi que les éclaireuses d'un site médiocre cessent vite de danser, et le « Schwirrlauf » (buzz-run) comme signal d'envol pour 20 000–30 000 abeilles [à confirmer].
- **Seeley et Buhrman 1999** [non vérifiée] [R selon la première collecte; aucun résumé accessible à la vérification; pages 45(1):19–31 confirmées] : reprise vidéo des observations de Lindauer 1955; une douzaine de sites ou plus annoncés au départ, un seul à la fin [à confirmer]; envol environ une heure après l'unanimité [à confirmer]; le consensus se fait surtout parce que les danseuses des sites perdants **cessent** de danser, plutôt que de changer de site. Hypothèse : l'abandon programmé des danses réduit le risque d'un arrêt avec des groupes de danseuses « inflexibles » bloqués sur deux sites ou plus.
- **Seeley 2003** [non vérifiée] [R selon la première collecte] : 23 éclaireuses sur 27 (6 essaims) [à confirmer] ayant dansé pour un site non choisi ont arrêté **avant** de suivre une danse pour un autre site; le nombre de tours frétillants par retour décroît de façon remarquablement linéaire; les éclaireuses de sites inférieurs commencent plus faiblement et s'arrêtent plus vite [à confirmer : chiffres et forme de la décroissance].
- **Seeley et al. 2012** [R] : les éclaireuses envoient des signaux d'arrêt aux danseuses d'**autres** sites; un modèle analytique montre que cette inhibition croisée résout l'interblocage entre sites égaux.
- **Zakir et al. 2022** [non vérifiée] [R selon la première collecte; contenu à confirmer, résumé masqué] : en essaims de robots, le modèle de commutation directe n'atteint le consensus que si les options diffèrent; l'inhibition croisée brise l'interblocage entre options égales; le temps passé indécis est le paramètre clé.

#### M7 — Pais et al. 2013 (extension stochastique du modèle Seeley et al. 2012) [T]

Éq. (1), avec ψ_U = 1 − ψ_A − ψ_B :

dψ_A = [γ_A ψ_U − ψ_A(α_A − ρ_A ψ_U + σ_B ψ_B)] dt + k √(ψ_U² + ψ_A² + ψ_U²ψ_A²) dW_A, et symétriquement pour B.

- γᵢ : découverte indépendante; αᵢ : abandon spontané; ρᵢ : recrutement par danse; σ : signal d'arrêt (inhibition croisée), indépendant de la valeur, sans bruit.
- Paramétrisation reprise de Seeley et al. 2012 : γᵢ = ρᵢ = vᵢ, αᵢ = 1/vᵢ. Décision quand une population atteint le seuil de quorum (0,7 dans les figures 5).
- Éq. (4) : pour deux sites égaux, bifurcation fourche à σ* = 4v³/(v² − 1)². Sous σ*, un seul attracteur symétrique (interblocage, une fraction reste non engagée et peut découvrir mieux); au-dessus, deux attracteurs et choix au hasard.
- Fig. 3 : avec deux sites égaux mais médiocres, l'interblocage dure jusqu'à la découverte d'un troisième site supérieur (t = 30), qui est choisi; k = 0,05. Les autres paramètres sont dans le Texte S1, non lu.
- Fig. 4 : Δv minimal pour un seul attracteur ∝ v (analogue de la loi de Weber), pente fixée par σ. Fig. 5 : fronce (cusp), hystérésis en Δv entre environ −0,5 et +0,5. Fig. 6 : compromis vitesse-justesse.

Vérifications [I] (`p6_checks.py`) :
- Le terme d'inhibition croisée σψ_Aψ_B est symétrique en A et B : il disparaît du mode antisymétrique, dont la valeur propre vaut −α + ρψ_U. La fourche se produit à ψ_U = 1/v², ce qui redonne exactement σ* = 4v³/(v²−1)².
- À σ = 0, la valeur propre vaut −1/(v(1+ψ)) < 0 : interblocage garanti pour tout v > 1.
- Valeurs : σ*(1,5) = 8,640; σ*(2) = 3,556; σ*(3) = 1,688; σ*(4) = 1,138.
- Attention : à v = 2 et σ = 1,5σ*, l'attracteur gagnant n'est qu'à ψ_A ≈ 0,59 (< 0,7). Briser la symétrie ne garantit pas d'atteindre le quorum. Inversement, à σ = 0 et v = 2, ψ_A = ψ_B ≈ 0,46 : un quorum inférieur à 0,46 serait atteint par les **deux** sites, d'où une scission à la Lindauer 1955 [non vérifiée] plutôt qu'un interblocage.

---

## 5. Agentique

| Source | Contenu utile pour P6 | Statut |
|---|---|---|
| Greshake et al. 2023 (AISec '23, p. 79–90) | Injection **indirecte** : l'attaquant place des instructions dans des données que l'application récupérera, sans accès à l'interface; taxonomie (vol de données, propagation autoréplicante, contamination de l'information); démonstrations contre Bing Chat (GPT-4) et la complétion de code. | [R] |
| Cohen et al. 2024 (Morris II) | Invite adversariale autoréplicante qui déclenche une cascade d'injections indirectes entre applications reliées par **RAG** et compromet le RAG d'autres applications; défense « Virtual Donkey » : TPR 1,0, FPR 0,015. | [R] |
| Lee et Tiwari 2024 (Prompt Infection) | Composantes : détournement, charge utile, donnée, autoréplication; « effondrement récursif » des rôles; avec GPT-4o, l'infection autoréplicante réussit 13,92 % plus souvent, avec GPT-3.5 elle est 209 % plus efficace; GPT-4o ignore 66 % des attaques autoréplicantes, GPT-3.5 9 %; dans une société d'agents, croissance logistique, infection complète au tour 4,7 (N = 10) et 6,3 (N = 20); défense « LLM Tagging » + marquage : aucune attaque ne réussit. | [T partiel, HTML] |
| Gu et al. 2024 (Agent Smith, ICML) | Une image adversariale dans la mémoire d'un seul agent suffit; dynamique éq. (5) : c_{t+1} = (1−γ)c_t + Δ_t/N, avec Δ_t ~ B(N/2, βc_t(1−c_t)); en espérance (forme déterministe, non numérotée) : c_{t+1} = (1−γ)c_t + βc_t(1−c_t)/2; propagation si β > 2γ, limite 1 − 2γ/β (éq. 7, solution de l'éq. différentielle 6); avec un million d'agents LLaVA-1.5, ~100 % d'infection après 27 à 31 tours de discussion. | [T partiel, HTML] |
| Triedman et al. 2025 | Du contenu adversarial détourne le contrôle et la communication d'un SMA pour exécuter du code arbitraire : 58–90 % des essais avec GPT-4o selon l'orchestrateur, jusqu'à 100 % dans certaines configurations, même quand les agents individuels refusent. | [R] |
| Cemri et al. 2025 (MAST, v3) | 1642 traces, 7 cadres; 14 modes en 3 catégories; κ = 0,88. Conception 44,2 % : FM-1.3 répétition d'étapes 15,7 %, FM-1.5 ignorance des conditions d'arrêt 12,4 %, FM-1.1 11,8 %, FM-1.4 2,80 %, FM-1.2 1,5 %. Désalignement 32,3 % : FM-2.6 13,2 %, FM-2.3 7,40 %, FM-2.2 6,80 %, FM-2.1 2,20 %, FM-2.5 1,90 %, FM-2.4 0,85 % (0,80 % dans la fig. 1). Vérification 23,5 % : FM-3.3 9,10 %, FM-3.2 8,20 %, FM-3.1 6,20 %. Totaux par catégorie : ceux de la fig. 1 (1642 traces); la fig. 4, qui porte sur 210 traces, donne 41,8 % / 36,9 % / 21,3 %. | [T partiel, HTML; totaux relus sur le PDF v3] |
| Hammond et al. 2025 (Cooperative AI Foundation, rapport n° 1) | Trois modes d'échec : mauvaise coordination, conflit, collusion; sept facteurs de risque dont effets de réseau, dynamiques déstabilisantes, sécurité multi-agents. | [R] |
| Fourney et al. 2024 (Magentic-One) | Remède **orchestré** au moulin : l'Orchestrateur tient un compteur de blocage, incrémenté si une boucle est détectée ou si rien n'avance; au-delà de 2, il replanifie (§4.1). | [T partiel, HTML] |
| Wynn et al. 2025 (atelier ICML MAS) | En débat multi-agents, les modèles passent souvent d'une bonne à une mauvaise réponse sous la pression des pairs, en privilégiant l'accord : analogue d'une cascade d'information. | [R] |

---

## 6. Parallèles agentiques

La correspondance elle-même est une inférence du dossier [I]; chaque côté est sourcé.

| Pathologie biologique | Mécanisme | Analogue agentique | Remède bio (chorégraphie) | Remède agentique |
|---|---|---|---|---|
| Moulin (Schneirla 1944; Erhard et al. 2022) | Renforcement orienté sans oubli; chacun suit la trace du précédent | Boucle d'agents, répétition d'étapes (MAST FM-1.3), absence de condition d'arrêt (FM-1.5) | Évaporation; bruit (Dussutour et al. 2009 [non vérifiée]); sortie d'une traînarde (Beebe 1921 [non vérifiée]) | Compteur de blocage central (Fourney et al. 2024, orchestration); TTL sur l'état partagé ou l'aléa local (chorégraphie, à tester) |
| Verrouillage sur un mauvais choix (Sasaki et al. 2013; Beekman et al. 2001 [non vérifiée]) | Rétroaction positive plus bistabilité | Conformisme en débat multi-agents (Wynn et al. 2025) | Attrition des danses (Seeley 2003 [non vérifiée]); rétroaction négative (Grüter et al. 2012) | Décroissance programmée du poids des messages anciens [I] |
| Interblocage de l'essaim (Seeley et al. 2012; Pais et al. 2013) | Deux populations égales sans inhibition croisée | Interblocage entre agents qui attendent un consensus | Signal d'arrêt ciblé sur l'autre camp; σ réglé selon la valeur | Veto ciblé; robots : Zakir et al. 2022 [non vérifiée] |
| Scission de l'essaim (Lindauer 1955 [non vérifiée]) | Deux quorums atteints en même temps | Double engagement (deux agents agissent sur deux plans incompatibles) [I] | Retour en grappe et nouvel essai | Verrou ou quorum exclusif sur l'état partagé [I] |
| Mimétisme chimique ou acoustique (Akino et al. 1999; Barbero et al. 2009) | Imiter l'odeur de colonie ou le signal de la reine | Injection indirecte qui se fait passer pour une instruction légitime (Greshake et al. 2023) | Reconnaissance collective par plusieurs gardiens (Johnson et al. 2011); course aux armements (Nash et al. 2008) | Marquage de provenance, « LLM Tagging » (Lee et Tiwari 2024); défense en profondeur |
| Pseudo-reine capensis (Neumann et Moritz 2002 [non vérifiée]) | Initiée qui usurpe le signal d'autorité et se reproduit | Agent compromis qui se réplique (Prompt Infection; Morris II; Agent Smith) | Rejet amélioré après expositions répétées (Neumann et Pirk 2019) | Mémoire d'incidents, quarantaine [I] |
| Phéromone trompeuse (Aswale et al. 2022) | Signal faux persistant dans l'environnement | Document empoisonné dans un RAG partagé (Morris II) | Phéromone de prudence (remède artificiel proposé par les auteurs, pas observé chez la fourmi) | Expiration et réputation des entrées partagées [I] |
| Pillage d'une colonie qui s'effondre (Peck et Seeley 2019) | Les pilleuses ramènent le parasite | Un agent qui pille les sorties d'un agent compromis importe l'infection [I] | Seuils de garde qui se resserrent sous attaque (Couvillon et al. 2008, titre) | Filtrage adaptatif sous charge [I] |

---

## 7. Résultats cibles et critères d'acceptation

Les tolérances marquées « proposée » sont des choix du dossier à calibrer après numérisation des figures (WebPlotDigitizer). Chaque cible indique la grandeur mesurée, la valeur publiée, la tolérance et le nombre de répétitions.

| ID | Espèce / modèle | Grandeur mesurée | Valeur publiée | Critère d'acceptation | Rép. |
|---|---|---|---|---|---|
| T1 | Fourmi-analogue / Couzin et al. 2002, fig. 3 | p̄ et m̄ sur la grille Δr_o, Δr_a ∈ {0…15} (moyenne des 1000 derniers des 5000 pas) | Quatre régimes; tore à Δr_o petit et Δr_a grand | Au point (Δr_o = 1, Δr_a = 12) : m̄ ≥ 0,5 et p̄ ≤ 0,3 (proposée); à (0, 12) : essaim, p̄ et m̄ < 0,3; à (7, 12) : p̄ ≥ 0,8. Carte des régimes concordante avec la fig. 3E–F numérisée sur ≥ 85 % des cellules (proposée) | 30 par cellule (comme publié) |
| T2 | idem, fig. 4 (hystérésis) | m̄ et p̄ en balayage montant puis descendant de r_o, r_a = 14, 2000 pas par valeur | Tore entre r_o ≈ 1,5 et ≈ 2,5 en montant; pas de tore en descendant; retour à l'essaim sous 1,5 | Montée : maximum de m̄ dans [1,5; 2,5] ± 0,25; descente : m̄ < 0,2 sur [1,5; 2,5] (proposée); aire de la boucle > 0 avec IC 95 % excluant 0. Test supplémentaire : sensibilité à la vitesse de balayage (Chan et Kanso 2026) | 15 (comme publié) |
| T3 | Fourmi / Couzin et Franks 2003, fig. 2 | Flux F à t = 5000 pas sur un tronçon périodique de 50 cm | F maximal à α et θ_a intermédiaires; choix collectif d'un sens à α = 90°, θ_a = 1000 °/s | F̄(90°, 1000) ≥ 0,8 (proposée) et supérieur d'au moins 0,3 à F̄ aux bords (α ≤ 20° ou ≥ 160°; θ_a ≤ 100 ou ≥ 2000 °/s) | 100 par combinaison (comme publié) |
| T4 | idem, fig. 4 (voies) | Distance médiane au centre de piste, rentrantes contre sortantes; F en fonction de ω | Rentrantes au centre, sortantes aux bords; F maximal à ω = 1 | Médiane rentrantes < médiane sortantes à Δθ_a = 1400 °/s (Mann-Whitney, p < 0,01); argmax F̄ = 1 ± 0,25 | 100 |
| T5 | Fourmi abstraite / Erhard et al. 2022, Prop. 2.1 et Th. 2.2 | Sur ℤ : Xₙ/n à n = 10⁵; sur grille finie 6 × 6 : piégeage | ±(1−e^{−β})/(1+e^{−β}) = ±0,4621 pour β = 1; piégeage p.s. | ℤ : |Xₙ/n| à ±0,01 de 0,4621 pour ≥ 95 % des essais, signes équilibrés (test binomial, p > 0,01). Grille : ≥ 99 % des essais suivent le même circuit orienté ≥ 50 tours consécutifs avant n = 10⁶ (critère opérationnel proposé) | 1000 |
| T6 | Fourmi / Beekman et al. 2001 [non vérifiée] | Équilibres de l'éq. 1 [à confirmer]; x final selon l'état initial | Bistabilité pour α = 0,0045 (fig. 1B) [à confirmer]; 700 ouvrières : aidée 4,7 ± 3,3 contre 2,6 ± 3,3 [à confirmer] | EDO : bornes de bistabilité à ±1 % de [476; 910] (calcul [I], exact à partir de l'éq. 1 telle que transcrite; éq. et paramètres à relire dans la source avant implantation); version agents à n = 700 : P(piste | aidée) − P(piste | non aidée) ≥ 0,3 (proposée); à n = 300 : aucune piste dans les deux cas | 100 par condition |
| T7 | Fourmi / Dussutour et al. 2009 [non vérifiée] | Proportion d'essais revenus à la branche courte dans les 30 dernières minutes de la phase 3 | 16/21 ≈ 0,76 [à confirmer]; sans bruit, retour > 250 min [à confirmer] | 0,76 ± 0,15 avec bruit; aucun retour avant 250 min à σ = 0 | ≥ 200 |
| T8 | Abeille / Pais et al. 2013 éq. 4 (k = 0) | Point de bifurcation numérique σ̂*(v) | σ* = 4v³/(v²−1)² | |σ̂* − σ*|/σ* ≤ 1 % pour v ∈ {1,5; 2; 3; 4; 6}; à σ = 0 : |ψ_A − ψ_B| < 10⁻³ à T = 200; à σ = 2σ* : |ψ_A − ψ_B| > 0,3 | Déterministe; 1 par point |
| T9 | Abeille / Pais et al. 2013 fig. 3 (k = 0,05) | Choix final avec deux sites égaux médiocres puis un troisième supérieur découvert à t = 30 | Interblocage puis choix du troisième | P(choix du troisième) ≥ 0,9 (proposée) et aucune décision avant t = 30 dans ≥ 90 % des essais. **Bloqué** tant que le Texte S1 (valeurs v_A, v_B, v_C, seuil) n'est pas lu | 200 |
| T10 | Abeille / Lindauer 1955 [non vérifiée] (qualitatif) | Régime final dans le plan (σ, seuil de quorum) : décision, interblocage, scission | Scission tentée avec deux sites équivalents | Extension, pas reproduction : la carte doit contenir les trois régimes; scission seulement si le seuil est sous le niveau d'interblocage (≈ 0,46 à v = 2, σ = 0) [I] | 200 par point |
| T11 | Pont / Aswale et al. 2022 | Nourriture par coopératrice; % de coopératrices qui livrent | 21,74 sans attaque; 0,14 et 13,10 % avec 3,13 % de détracteurs; 5 % de la référence avec 0,39 % et phéromone non évaporante; > 8 et > 96 % avec la défense | Référence à ±20 %; attaque ≤ 0,05 × référence; défense ≥ 30 × attaque (proposées) | ≥ 20 (publié : 20 simulations par configuration) |
| T12 | Agents / Gu et al. 2024 éq. (5) | Fraction infectée c_t, simulation stochastique par paires | Récurrence stochastique c_{t+1} = (1−γ)c_t + Δ_t/N, Δ_t ~ B(N/2, βc_t(1−c_t)), dont l'espérance est c_{t+1} = (1−γ)c_t + βc_t(1−c_t)/2; limite 1 − 2γ/β si β > 2γ (éq. 7) | Écart quadratique moyen ≤ 0,02 entre trajectoire moyenne et récurrence en espérance pour N = 10⁴; plateau à ±0,02 de 1 − 2γ/β | 100 |
| T13 | Agents / Lee et Tiwari 2024 fig. 6 | Tour d'infection complète dans une société de N agents | 4,7 (N = 10), 6,3 (N = 20) | Modèle SI calé sur N = 10 prédit N = 20 à ±1 tour (validation croisée) | 100 |

Note sur T1 [I] : les points de contrôle (Δr_o = 1, Δr_a = 12) etc. sont déduits de la fig. 4 (r_a = 14 et tore pour r_o ∈ [1,5; 2,5], donc Δr_o ∈ [0,5; 1,5] et Δr_a ≈ 12), pas lus sur la fig. 3.

Note après vérification : T6 et T7 reposent sur des chiffres que la vérification n'a pas pu confirmer (Beekman et al. 2001 [non vérifiée], Dussutour et al. 2009 [non vérifiée] : à relire avant implantation); T9 reste bloquée (Texte S1); T10 repose sur Lindauer 1955 [non vérifiée].

Note : T12 et T13 calent un modèle abstrait sur des expériences LLM publiées. Les rejouer avec de vrais agents relève de P7.

---

## 8. Visuels de vulgarisation

1. **« Le manège de Barro Colorado »** : chronologie animée du moulin de Schneirla 1944 avec les mesures réelles (7 h 30, midi, scission en deux anneaux à 20 h 30, lendemain), à côté de la boucle de 1200 pieds de Beebe 1921 [non vérifiée] qui se dissout quand une traînarde décroche.
2. **Une fourmi suffit** : marche d'Erhard et al. 2022 sur une grille; les arêtes s'épaississent dans le sens parcouru; curseur β; bascule ℤ contre 2D (« pourquoi la deuxième dimension piège »).
3. **Carte des phases de Couzin et al. 2002** : grille Δr_o × Δr_a cliquable, chaque cellule lance une mini-simulation; boucle d'hystérésis tracée en direct pendant que r_o monte puis descend.
4. **Le tronçon circulaire** (Couzin et Franks 2003) : 50 fourmis sur un anneau périodique, curseurs α et θ_a, jauge F qui montre le choix collectif d'un sens.
5. **La courbe en S de Beekman et al. 2001** [non vérifiée] : fourrageuses contre taille de colonie, curseur α, flèches d'hystérésis, bouton « aider la colonie » (amorcer une piste).
6. **Le triangle de l'essaim** : simplexe U-A-B (Pais et al. 2013) avec lignes de flux, curseurs σ et v, courbe σ*(v), bouton « supprimer les signaux d'arrêt ».
7. **Décider, bloquer ou se scinder** : animation de la nuée de Lindauer 1955 [non vérifiée] qui se divise et revient, à côté de la carte des régimes (σ × quorum) de T10.
8. **Le cheval de Troie chimique** : profils d'odeur en barres (colonie, chenille Maculinea, intrus); curseur du seuil d'acceptation; passage d'un à plusieurs gardiens (Johnson et al. 2011).
9. **De la phéromone trompeuse au RAG empoisonné** : écran partagé; à gauche la colonie d'Aswale et al. 2022 avec la phéromone rouge autour du nid; à droite un magasin RAG dont les documents empoisonnés se propagent; courbe logistique commune (Gu et al. 2024; Lee et Tiwari 2024).
10. **Table de correspondance MAST** : les 14 modes avec leur prévalence, reliés aux pathologies biologiques du §6; les liens sont étiquetés « analogie » pour ne pas les confondre avec des résultats.

---

## 9. Références

Format : **étiquette** — référence — DOI/URL — lecture — statut après vérification indépendante (vérifiée, corrigée, [non vérifiée]). Les étiquettes suivent la convention « Nom année » du cadre; aucune ne demande de suffixe a/b dans ce dossier.

**Fourmis : moulin et mouvement collectif**
- **Schneirla 1944** — Schneirla, T. C. (1944). A unique case of circular milling in ants, considered in relation to trail following and the general problem of orientation. *American Museum Novitates* 1253:1–26. http://hdl.handle.net/2246/3733 — [T] — vérifiée
- **Beebe 1921** — Beebe, W. (1921). *Edge of the Jungle*, chap. XII « Sequels ». Garden City Publishing Co. (édition transcrite dans Project Gutenberg #25888). https://www.gutenberg.org/ebooks/25888 — [T] selon la première collecte, non reconfirmé (texte tronqué par l'outil de la vérification); titre, chapitre et éditeur confirmés — [non vérifiée]
- **Delsuc 2003** — Delsuc, F. (2003). Army ants trapped by their evolutionary history. *PLoS Biology* 1(2):e37. https://doi.org/10.1371/journal.pbio.0000037 — [T] — corrigée (origine du ~105 Ma : Brady 2003, voir C12)
- **Couzin et al. 2002** — Couzin, I. D., Krause, J., James, R., Ruxton, G. D. et Franks, N. R. (2002). Collective memory and spatial sorting in animal groups. *Journal of Theoretical Biology* 218(1):1–11. https://doi.org/10.1006/jtbi.2002.3065 — [T] — vérifiée
- **Couzin et Franks 2003** — Couzin, I. D. et Franks, N. R. (2003). Self-organized lane formation and optimized traffic flow in army ants. *Proc. R. Soc. Lond. B* 270:139–146. https://doi.org/10.1098/rspb.2002.2210 — [T] — vérifiée (sous la réserve du fichier local, section 11.2)
- **Erhard et al. 2022** — Erhard, D., Franco, T. et Reis, G. (2022). The directed edge reinforced random walk: the ant mill phenomenon. *Journal of Statistical Physics* 190(1), art. 18 (en ligne le 2022-11-15; numéro de 2023). https://doi.org/10.1007/s10955-022-03031-0 ; arXiv:1911.07295 — [T] préimpression v2, [M] version publiée — corrigée
- **Malíčková et al. 2015** — Malíčková, M., Yates, C. et Boďová, K. (2015). A stochastic model of ant trail following with two pheromones. arXiv:1508.06816 — [T] — vérifiée
- **Das 2017** — Das, R. (2017). Exploring the ant mill: numerical and analytical investigations of mixed memory-reinforcement systems. arXiv:1703.06859 — [R] — vérifiée
- **Chan et Kanso 2026** — Chan, A. et Kanso, E. (2026). Noise-induced collective memory in schooling fish. *Bioinspiration & Biomimetics* 21(1):016024. https://doi.org/10.1088/1748-3190/ae39bd ; arXiv:2507.16102 — [R] — corrigée (deux auteurs; DOI ajouté)

**Fourmis : verrouillage, cascades**
- **Beekman et al. 2001** — Beekman, M., Sumpter, D. J. T. et Ratnieks, F. L. W. (2001). Phase transition between disordered and ordered foraging in Pharaoh's ants. *PNAS* 98(17):9703–9706. https://doi.org/10.1073/pnas.161285298 — [R] confirmé; éq. 1 et valeurs [à confirmer] — [non vérifiée]
- **Sasaki et al. 2013** — Sasaki, T., Granovskiy, B., Mann, R. P., Sumpter, D. J. T. et Pratt, S. C. (2013). Ant colonies outperform individuals when a sensory discrimination task is difficult but not when it is easy. *PNAS* 110:13769–13773. https://doi.org/10.1073/pnas.1304917110 — [R] — vérifiée
- **Dussutour et al. 2009** — Dussutour, A., Beekman, M., Nicolis, S. C. et Meyer, B. (2009). Noise improves collective decision-making by ants in dynamic environments. *Proc. R. Soc. B* 276(1677):4353–4361. https://doi.org/10.1098/rspb.2009.1235 — [R] confirmé (espèce, modèle par EDS, rôle du bruit); paramètres [à confirmer] — [non vérifiée]
- **Grüter et al. 2012** — Grüter, C., Schürch, R., Czaczkes, T. J. et al. (2012). Negative feedback enables fast and flexible collective decision-making in ants. *PLoS ONE* 7(9):e44501. https://doi.org/10.1371/journal.pone.0044501 — [R] (paraphrase) — vérifiée
- **Giraldeau et al. 2002** — Giraldeau, L.-A., Valone, T. J. et Templeton, J. J. (2002). Potential disadvantages of using socially acquired information. *Phil. Trans. R. Soc. B* 357(1427):1559–1566. https://doi.org/10.1098/rstb.2002.1065 — [R] — vérifiée
- **Bikhchandani et al. 1992** — Bikhchandani, S., Hirshleifer, D. et Welch, I. (1992). A theory of fads, fashion, custom, and cultural change as informational cascades. *Journal of Political Economy* 100(5):992–1026. https://doi.org/10.1086/261849 — [M] — vérifiée

**Fourmis : parasites sociaux, reconnaissance, attaque**
- **Akino et al. 1999** — Akino, T., Knapp, J. J., Thomas, J. A. et Elmes, G. W. (1999). Chemical mimicry and host specificity in the butterfly *Maculinea rebeli*, a social parasite of *Myrmica* ant colonies. *Proc. R. Soc. Lond. B* 266(1427):1419–1426. https://doi.org/10.1098/rspb.1999.0796 — [R] — vérifiée
- **Nash et al. 2008** — Nash, D. R., Als, T. D., Maile, R., Jones, G. R. et Boomsma, J. J. (2008). A mosaic of chemical coevolution in a large blue butterfly. *Science* 319(5859):88–90. https://doi.org/10.1126/science.1149180 — [R] — vérifiée
- **Barbero et al. 2009** — Barbero, F., Thomas, J. A., Bonelli, S., Balletto, E. et Schönrogge, K. (2009). Queen ants make distinctive sounds that are mimicked by a butterfly social parasite. *Science* 323(5915):782–785. https://doi.org/10.1126/science.1163583 — [R] — vérifiée
- **Johnson et al. 2011** — Johnson, B. R., van Wilgenburg, E. et Tsutsui, N. D. (2011). Nestmate recognition in social insects: overcoming physiological constraints with collective decision making. *Behav. Ecol. Sociobiol.* 65(5):935–944. https://doi.org/10.1007/s00265-010-1094-x — [R] — vérifiée
- **Aswale et al. 2022** — Aswale, A., López, A., Ammartayakun, A. et Pinciroli, C. (2022). Hacking the colony: on the disruptive effect of misleading pheromone and how to defend against it. *AAMAS 2022*, p. 27–34. arXiv:2202.01808 (DOI selon OpenAlex : 10.65109/wqpv7776, qui se résout vers la bibliothèque numérique de l'ACM, 10.5555/3535850.3535855; page non lue, accès refusé) — [T] — corrigée (20 simulations par configuration)

**Abeilles**
- **Moritz et al. 1991** — Moritz, R. F. A., Kirchner, W. H. et Crewe, R. M. (1991). Chemical camouflage of the death's head hawkmoth (*Acherontia atropos* L.) in honeybee colonies. *Naturwissenschaften* 78(4):179–182. https://doi.org/10.1007/BF01136209 — [M] — vérifiée
- **Cappa et al. 2019** — Cappa, F., Petrocelli, I., Dani, F. R. et al. (2019). Natural biocide disrupts nestmate recognition in honeybees. *Scientific Reports* 9:3171. https://doi.org/10.1038/s41598-019-38963-3 (PMC6395671) — [T] passage cité — corrigée (volume et numéro d'article; attribution à Moritz et al. 1991 [à confirmer])
- **Peck et Seeley 2019** — Peck, D. T. et Seeley, T. D. (2019). Mite bombs or robber lures? The roles of drifting and robbing in *Varroa destructor* transmission from collapsing honey bee colonies to their neighbors. *PLoS ONE* 14(6):e0218392. https://doi.org/10.1371/journal.pone.0218392 — [R] — corrigée (titre complet)
- **Couvillon et al. 2008** — Couvillon, M. J., Robinson, E. J. H., Atkinson, B., Child, L., Dent, K. R. et Ratnieks, F. L. W. (2008). En garde: rapid shifts in honeybee, *Apis mellifera*, guarding behaviour are triggered by onslaught of conspecific intruders. *Animal Behaviour* 76(5):1653–1658. https://doi.org/10.1016/j.anbehav.2008.08.002 — [M] — vérifiée
- **Neumann et Moritz 2002** — Neumann, P. et Moritz, R. F. A. (2002). The Cape honeybee phenomenon: the sympatric evolution of a social parasite in real time? *Behav. Ecol. Sociobiol.* 52(4):271–281. https://doi.org/10.1007/s00265-002-0518-7 — [R] selon la première collecte, contenu [à confirmer] — [non vérifiée]
- **Oldroyd 2002** — Oldroyd, B. P. (2002). The Cape honeybee: an example of a social cancer. *Trends Ecol. Evol.* 17(6):249–251. https://doi.org/10.1016/S0169-5347(02)02479-5 — [M] — vérifiée
- **Neumann et al. 2011** — Neumann, P., Härtel, S., Kryger, P., Crewe, R. M. et Moritz, R. F. A. (2011). Reproductive division of labour and thelytoky result in sympatric barriers to gene flow in honeybees (*Apis mellifera* L.). *J. Evol. Biol.* 24(2):286–294 (en ligne en 2010). https://doi.org/10.1111/j.1420-9101.2010.02167.x — [R] — corrigée (fin du titre)
- **Neumann et Pirk 2019** — Neumann, P. et Pirk, C. W. W. (2019). Increased response to sequential infections of honeybee, *Apis mellifera scutellata*, colonies by socially parasitic Cape honeybee, *A. m. capensis*, workers. *Scientific Reports* 9:7582. https://doi.org/10.1038/s41598-019-43920-1 — [R] — corrigée (titre complet)
- **Lindauer 1955** — Lindauer, M. (1955). Schwarmbienen auf Wohnungssuche. *Zeitschrift für vergleichende Physiologie* 37(4):263–324 (revue aujourd'hui *J. Comp. Physiol. A*). https://doi.org/10.1007/BF00303153 — [R] (résumé allemand) selon la première collecte, inaccessible à la vérification — [non vérifiée]
- **Seeley et Buhrman 1999** — Seeley, T. D. et Buhrman, S. C. (1999). Group decision making in swarms of honey bees. *Behav. Ecol. Sociobiol.* 45(1):19–31. https://doi.org/10.1007/s002650050536 — [R] selon la première collecte, contenu [à confirmer] — [non vérifiée]
- **Seeley 2003** — Seeley, T. D. (2003). Consensus building during nest-site selection in honey bee swarms: the expiration of dissent. *Behav. Ecol. Sociobiol.* 53(6):417–424. https://doi.org/10.1007/s00265-003-0598-z — [R] selon la première collecte, chiffres [à confirmer] — [non vérifiée]
- **Seeley 2010** — Seeley, T. D. (2010). *Honeybee Democracy*. Princeton University Press. https://doi.org/10.1515/9781400835959 (éd. numérique) — [M] — vérifiée
- **Seeley et al. 2012** — Seeley, T. D., Visscher, P. K., Schlegel, T., Hogan, P. M., Franks, N. R. et Marshall, J. A. R. (2012). Stop signals provide cross inhibition in collective decision-making by honeybee swarms. *Science* 335(6064):108–111. https://doi.org/10.1126/science.1210361 — [R] — vérifiée
- **Pais et al. 2013** — Pais, D., Hogan, P. M., Schlegel, T., Franks, N. R., Leonard, N. E. et Marshall, J. A. R. (2013). A mechanism for value-sensitive decision-making. *PLoS ONE* 8(9):e73216. https://doi.org/10.1371/journal.pone.0073216 — [T] (Texte S1 non lu) — vérifiée
- **Zakir et al. 2022** — Zakir, R., Dorigo, M. et Reina, A. (2022). Robot swarms break decision deadlocks in collective perception through cross-inhibition. *Swarm Intelligence (ANTS 2022)*, LNCS 13491, p. 209–221. https://doi.org/10.1007/978-3-031-20176-9_17 — [R] selon la première collecte, contenu [à confirmer] — [non vérifiée]

**Agentique**
- **Greshake et al. 2023** — Greshake, K., Abdelnabi, S., Mishra, S., Endres, C., Holz, T. et Fritz, M. (2023). Not what you've signed up for: compromising real-world LLM-integrated applications with indirect prompt injection. *AISec '23*, p. 79–90. https://doi.org/10.1145/3605764.3623985 ; arXiv:2302.12173 — [R] — vérifiée
- **Cohen et al. 2024** — Cohen, S., Bitton, R. et Nassi, B. (2024). Here comes the AI worm: unleashing zero-click worms that target GenAI-powered applications. arXiv:2403.02817 — [R] — vérifiée
- **Lee et Tiwari 2024** — Lee, D. et Tiwari, M. (2024). Prompt infection: LLM-to-LLM prompt injection within multi-agent systems. arXiv:2410.07283 — [T partiel] — vérifiée
- **Gu et al. 2024** — Gu, X., Zheng, X., Pang, T. et al. (2024). Agent Smith: a single image can jailbreak one million multimodal LLM agents exponentially fast. ICML 2024 (selon arXiv); arXiv:2402.08567 — [T partiel] — corrigée (éq. 5 stochastique)
- **Triedman et al. 2025** — Triedman, H., Jha, R. et Shmatikov, V. (2025). Multi-agent systems execute arbitrary malicious code. arXiv:2503.12188 — [R] — vérifiée
- **Cemri et al. 2025** — Cemri, M., Pan, M. Z., Yang, S. et al. (2025). Why do multi-agent LLM systems fail? arXiv:2503.13657 (v3, 2025-10-26) — [T partiel] — corrigée (totaux par catégorie)
- **Hammond et al. 2025** — Hammond, L., Chan, A., Clifton, J. et al. (2025). Multi-agent risks from advanced AI. Cooperative AI Foundation, Technical Report #1; arXiv:2502.14143 — [R] — vérifiée
- **Fourney et al. 2024** — Fourney, A., Bansal, G., Mozannar, H. et al. (2024). Magentic-One: a generalist multi-agent system for solving complex tasks. arXiv:2411.04468 — [T partiel] — vérifiée
- **Wynn et al. 2025** — Wynn, A., Satija, H. et Hadfield, G. (2025). Talk isn't always cheap: understanding failure modes in multi-agent debate. Atelier ICML MAS 2025; arXiv:2509.05396 — [R] — vérifiée

**Cités en passant, non vérifiés** (aucune référence complète consultée; statut [non vérifiée]) : **Wheeler 1910**, **Parr 1927** et **Fabre 1896** (via Schneirla 1944, p. 6 et 9, p. 19–21, p. 5); **Brady 2003** (via Delsuc 2003); **Le Conte et al. 2015**, **Kather et al. 2015** et **Martin et Bayfield 2014** (via la bibliographie de Cappa et al. 2019); **Goss et al. 1989** (relève du dossier P1).

---

## 10. Questions ouvertes

1. **Valeurs exactes des figures de Couzin et al. 2002** (fig. 3E–F, 4) : numériser pour fixer les seuils de T1–T2, aujourd'hui « proposés ».
2. **Modèle publié de l'apparition spontanée du moulin en 2D** avec dépôt de piste : seules des préimpressions ont été trouvées (Malíčková et al. 2015, Das 2017). Une recherche bibliographique complète 2020–2026 (le quota de recherche était épuisé) permettrait de trancher.
3. **Seeley et al. 2012, matériel supplémentaire** : nombre de signaux d'arrêt dirigés vers l'autre site contre le même site, valeurs de paramètres; **Pais et al. 2013, Texte S1** : paramètres de la fig. 3 (bloque T9).
4. **Moritz et al. 1991** : mécanisme réel (composés, réaction des abeilles); lire l'article avant d'en décrire le contenu.
5. **Fréquence des scissions chez Lindauer** : combien d'essaims, dans quelles conditions; lire Lindauer 1955 [non vérifiée] (p. 263–324) ou Seeley 2010.
6. **Dussutour et al. 2009 [non vérifiée]** : retranscrire les EDS et paramètres depuis le PDF (lus via un résumé automatique).
7. **Aswale et al. 2022** : nombre de répétitions par configuration. **Résolu** par la vérification indépendante : 20 simulations par configuration (légende de la fig. 4, texte de la fig. 8) [T].
8. **Question de recherche pour P7** [I] : un état partagé persistant (stigmergie, RAG) propage-t-il une infection plus vite qu'un canal de messages éphémères ? Le contraste piste/danse de v3 donne une prédiction testable : l'évaporation (TTL) devrait abaisser le β effectif d'Agent Smith.
9. **Couvillon et al. 2008** : chiffres du resserrement des seuils de garde sous pillage, utiles pour un « filtrage adaptatif » côté agents.
10. **Nomenclature** Phengaris/Maculinea : vérifier l'usage actuel avant publication.

---

## 11. Historique de vérification

Rapport indépendant : `recherche/verifications/p6-pathologies.md` (2026-10-01). Sur 44 références : 26 confirmées, 10 corrigées, 8 non vérifiables (contenu inaccessible), aucune fausse. Les corrections ci-dessous sont appliquées dans le dossier; les métadonnées marquées « relu » ont été revérifiées à la consolidation (Crossref ou PDF arXiv).

### 11.1 Corrections appliquées

*Références corrigées (section 9)*

1. Erhard et al. 2022 : version publiée ajoutée (*J. Stat. Phys.* 190(1), art. 18; en ligne le 2022-11-15, numéro de 2023) (Crossref relu).
2. Chan et Kanso 2026 : deux auteurs (pas « et al. »), *Bioinspiration & Biomimetics* 21(1):016024, DOI 10.1088/1748-3190/ae39bd (Crossref relu). L'identification du modèle à celui de Couzin et al. 2002 devient une inférence [I] (M1, T2).
3. Cemri et al. 2025 : totaux par catégorie remplacés par ceux de la fig. 1 (44,2 % / 32,3 % / 23,5 %, 1642 traces); les valeurs 32,15 % et 26,05 % n'apparaissaient nulle part; la fig. 4 (210 traces) donne 41,8 % / 36,9 % / 21,3 %; FM-2.4 : 0,85 % (texte), 0,80 % (fig. 1) (PDF v3 relu). Somme des 14 fréquences par catégorie : 44,2 / 32,35 / 23,5 [I].
4. Gu et al. 2024 : l'éq. (5) publiée est stochastique, c_{t+1} = (1−γ)c_t + Δ_t/N avec Δ_t ~ B(N/2, βc_t(1−c_t)); la forme déterministe en est l'espérance; la limite 1 − 2γ/β (β > 2γ) vient de l'éq. (7) (PDF relu). Touche la section 5 et T12.
5. Aswale et al. 2022 : 20 simulations par configuration (M6, T11, point 7 de la section 10 résolu); incohérence interne 58 / 57 signalée.
6. Delsuc 2003 : les ~105 Ma sont l'estimation moléculaire de Brady 2003, rapportée par Delsuc, pas du commentaire lui-même (C12, section 3.1).
7. Peck et Seeley 2019 : titre complet (Crossref relu).
8. Neumann et Pirk 2019 : segment *A. m. capensis* ajouté au titre (Crossref relu).
9. Neumann et al. 2011 : titre complet; en ligne en 2010, numéro de 2011 (Crossref relu).
10. Cappa et al. 2019 : 9:3171 (Crossref relu); le passage cité est confirmé, son attribution à Moritz et al. 1991 et à Martin et Bayfield 2014 est marquée [à confirmer] (C5, section 4.1).

*Métadonnées complétées*

11. Seeley et Buhrman 1999 : 45(1):19–31 (Crossref relu); contenu toujours non vérifié.
12. Oldroyd 2002 : numéro 6.
13. Zakir et al. 2022 : LNCS 13491.
14. Beebe 1921 : éditeur (Garden City Publishing Co., édition transcrite par Gutenberg); contenu toujours non vérifié.

*Valeurs et cibles*

15. Schneirla 1944 : la pluie de 1,12 po tombe le 3 septembre, avant 15 h (note de la p. 8).
16. T11 : 20 répétitions et plus (publié : 20 par configuration). T12 : forme exacte de l'éq. (5) précisée.
17. T6 et T7 : valeurs publiées marquées [à confirmer] (Beekman et al. 2001, Dussutour et al. 2009 non relus); T9 reste bloquée (Texte S1); T10 repose sur Lindauer 1955 [non vérifiée]. Tous les passages citant les huit références non vérifiables portent « [non vérifiée] ».

*Forme*

18. Étiquettes normalisées « Nom année » partout (clés `schneirla1944` etc. remplacées); statut de lecture [L] du dossier, aligné sur [T] dans le reste du programme; marques « [non vérifiée] » et « [à confirmer] » ajoutées à la légende; Fabre 1896 ajouté aux références citées en passant (cité en section 3.1 sans entrée).

### 11.2 Réserves restantes

1. **Huit références au contenu non relu** : Beebe 1921 (texte Gutenberg tronqué par l'outil), Lindauer 1955, Seeley et Buhrman 1999, Seeley 2003, Neumann et Moritz 2002 (Springer), Beekman et al. 2001 (PNAS, PMC), Dussutour et al. 2009 (Royal Society), Zakir et al. 2022 (résumé masqué). Trancher : texte intégral ou PDF de chacune.
2. **Valeurs [à confirmer]** : Beekman (éq. 1, β = 0,00015, s = 10, α = 0,021 / 0,0045 / 0,0052, colonies de 300 et 700, nourrisseur à 50 cm); Dussutour (60 / 180 mm, blocage de 60 à 120 min, 16/21, q₁, q₂, α, k, ρ, plus de 250 min); Beebe (1200 pieds, 2 à 2¾ po/s, ~2 h 30 par tour); Seeley 2003 (23 sur 27, 6 essaims); Seeley et Buhrman 1999 (douzaine de sites, environ 1 h); Lindauer 1955 (20 000–30 000 abeilles).
3. **Calcul de bistabilité de Beekman** ([476; 910]) : recalcul exact à partir de l'équation transcrite dans le dossier, non de la source.
4. **Couzin et Franks 2003** : les détails (Δt, S(C), fig. 2 à 4, unités de Q) ont été confirmés sur un fichier local extrait par un autre agent (en-tête et dates concordent avec Crossref); T3 et T4 en dépendent. Schneirla 1944 et Malíčková et al. 2015 : PDF locaux extraits par la vérification, provenance non vérifiée (en-tête de Schneirla 1944 conforme).
5. **Pais et al. 2013, Texte S1** non lu : T9 bloquée.
6. **Chan et Kanso 2026** : le résumé ne nomme pas Couzin; le lien avec Couzin et al. 2002 reste une inférence.
7. **Cappa et al. 2019** : entrées bibliographiques 62–67 non vues; attribution à Moritz et al. 1991 et à Martin et Bayfield 2014 non vérifiée.
8. **Script `p6_checks.py`** cité en en-tête : absent du dépôt; calculs [I] (σ*(v), valeurs propres, bornes de Beekman) recalculés indépendamment par la vérification, mais le script lui-même est à recréer.
9. **Aswale et al. 2022** : DOI selon OpenAlex; il se résout (redirection vers l'ACM DL), mais la page n'a pas pu être lue (accès refusé).
10. **Références citées en passant** (Wheeler 1910, Parr 1927, Fabre 1896, Brady 2003, Le Conte et al. 2015, Kather et al. 2015, Martin et Bayfield 2014, Goss et al. 1989) : aucune consultée.

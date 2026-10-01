# P3 — Division du travail : seuils, castes, polyéthisme, diversité

**Statut :** fiche de projet, version 1 (2026-10-01). **Régime :** production (code versionné, préenregistrement, livrables sur lesquels le chercheur agit). **Phase :** 2. **Cadre :** [00-cadre.md](../docs/00-cadre.md), qui prime.
**Sources :** dossier [p3-division-travail.md](../recherche/dossiers/p3-division-travail.md) (équations, paramètres, cibles, réserves) et son rapport de vérification [p3-division-travail.md](../recherche/verifications/p3-division-travail.md); audits [bio-fourmis.md](../docs/annexes/audit/bio-fourmis.md) et [bio-abeilles.md](../docs/annexes/audit/bio-abeilles.md); [bibliographie](../docs/11-bibliographie.md); script de contrôle [p3_check_seuils.js](../recherche/verifications-numeriques/p3_check_seuils.js).

**Légende de lecture** (celle du dossier) : [T] texte lu; [R] résumé lu; [M] métadonnées seules; [S] attribué à une source par une source lue; [I] inférence (du dossier ou de cette fiche); [à confirmer] valeur non confirmée dans une source lue; [non vérifiée] référence dont le contenu n'a pu être confirmé. **Statut épistémique des transpositions :** Résultat reproduit, Modèle simplifié, Hypothèse de l'auteur, Analogie. **Valeurs propres à cette fiche :** toute taille d'effet, marge, répétition ou estimation qui ne vient pas d'un dossier est une proposition [I] à figer dans le préenregistrement; elle porte [à confirmer].

## 1. Objet et questions de recherche

P3 étudie comment des individus aux règles locales répartissent le travail entre tâches sans affectation centrale. Le noyau commun aux deux espèces est le modèle à seuils de réponse : un stimulus de tâche qui croît avec la demande et décroît avec le travail accompli, un seuil individuel qui fixe la probabilité de s'engager, une probabilité constante d'abandon. La diversité des seuils est morphologique chez *Pheidole* (minors et majors, [Wilson 1984]), génétique chez l'abeille (patrilignes issues de la polyandrie, [Jones et al. 2004]) et liée à l'âge ([Seeley 1982]).

| QR du cadre | Part de P3 |
|---|---|
| **QR4 (diversité), principale** | La diversité des seuils stabilise-t-elle le collectif, et selon quelle métrique? P3 tranche par métrique (stabilité, coût de changement, réactivité) dans une même simulation (E3.4, E3.5, E3.7). L'extension aux agents LLM revient à P7. |
| QR3 (contrôle) | Témoin orchestré à règle pour une structure de tâche décomposable (E3.8); la version LLM est celle de P7. |
| QR2 (échecs) | Modes d'échec propres à P3 : hystérésis et verrouillage de rôle (T3.6), maturation précoce (E3.6), oscillation par gain de boucle (E3.5). La taxonomie des échecs de colonies reste à P6. |
| QR0, QR1 | Non servies directement : le stimulus de P3 est un signal scalaire unique, sa richesse n'est pas variée; la comparaison individu-collectif relève de P8. |

**Questions propres à P3.**
(a) Quel rapport θ_maj/θ_min reproduit la compensation de caste de Wilson, et que prédit le modèle quand on retire des minors plutôt que de changer la composition?
(b) La spécialisation émerge-t-elle d'individus identiques, avec les transitions et l'hystérésis publiées (seuils renforcés)?
(c) Les ouvrières inactives sont-elles une réserve? Le foraging-for-work (FFW) rend-il compte de ce que les seuils variables expliquent, et la demande est-elle proportionnelle à N ou absolue?
(d) Chez l'abeille, que produisent le polyéthisme d'âge, l'inhibition sociale (maturation précoce) et la thermorégulation par seuils variés?
(e) La diversité aide-t-elle, selon la métrique? Quand des agents identiques oscillent-ils dans le modèle, et pourquoi?
(f) Que peut-on dire des agents LLM identiques? Rien d'acquis : c'est une hypothèse (H3.9), testée par P7.

**Rôle dans le programme.** P3 fournit à P7 le scénario S3 (environnement, politique à seuils, métriques, témoin orchestré à règle), à P6 le modèle de maturation précoce et de verrouillage de rôle, et à P4 la fraction active δ/α (taux d'utilisation d'un pool). Il dépend de S0 (noyau, harnais) et du gabarit de V0.

**Parité fourmi/abeille.** Asymétrie signalée et justifiée : côté fourmi, trois modèles sont lus en texte ou en partie ([Theraulaz et al. 1998], [Charbonneau et al. 2017], [Hasegawa et al. 2016]); côté abeille, aucun modèle n'est lu (résumés seulement : [Jones et al. 2004], [Graham et al. 2006], [Beshers et al. 2001], [Myerscough et Oldroyd 2004]), faute d'accès aux textes. Les cibles abeille sont donc de niveau relationnel et conditionnées à la lecture (R4, R5, R10). Le modèle de [Theraulaz et al. 1998] est générique (illustré par la guêpe *Polistes dominulus*), il n'est ni un modèle de fourmi ni un modèle d'abeille.

**Corrections de v3 appliquées ici** (sans les rediscuter).

| v3 | Correction | Source |
|---|---|---|
| « Les petites ouvrières prennent la relève » | Ce sont les **majors**. Wilson abaisse le ratio minors:majors sous 1:1 chez 3 espèces sur 10; il ne retire pas toute une caste. | Cadre, correction n° 1; dossier |
| Le modèle à seuils = T_θ(s) | Il faut aussi la dynamique du stimulus (δ, α, normalisation par N) et l'abandon p. | Dossier |
| Theraulaz et al. 1998, modèle de fourmi | Modèle générique, illustré par *Polistes dominulus*. | Dossier |
| Séquence « nourrice → bâtisseuse → butineuse » (Seeley 1982) | Quatre sous-castes d'âge (nettoyage des cellules, nid à couvain, stockage, butinage). | Dossier |
| « Une ruche homogène oscille » (Jones et al. 2004) | Le résumé dit « moins stable »; l'oscillation est une inférence. Le modèle chiffré est dans Graham et al. 2006. | Dossier |
| « Les agents LLM identiques oscillent » | Hypothèse sans acquis, avec contre-preuves : H3.9. | Cadre, correction n° 13 |
| Huang et Robinson 1992 appuie « retrait des butineuses → butinage précoce » | L'expérience de l'article est un transplant d'abeilles âgées; le paradigme du retrait n'est pas sourcé (R5). | Rapport de vérification |
| Han et Zhang 2025 appuie un tableau noir sans orchestrateur | Une unité de contrôle centrale sélectionne les agents : contre-exemple. | Rapport de vérification |
| « Oubli » | Dans P3, relèvement du seuil (éq. 2b de Theraulaz et al. 1998), distinct des trois formes du cadre (évaporation, abandon, attrition des danses) [I]. | Cadre, correction n° 14 |

## 2. Positionnement

| Domaine | Existant (étiquette, lecture) | P3 reproduit | P3 ajoute |
|---|---|---|---|
| Seuils fixes, castes de *Pheidole* | [Wilson 1984] [R]; [Bonabeau et al. 1996] [M] [non vérifiée]; [Bonabeau et al. 1998b] [R]; équation 1 relayée par [Theraulaz et al. 1998] [T] | Calibration de θ_maj/θ_min contre la plage ×15–30 (T3.2) : calibration et non reproduction tant que 1996 n'est pas lu | Correction de v3; invariance d'échelle et fraction active δ/α; test de la normalisation de la demande (E3.1) |
| Seuils renforcés, spécialisation émergente | [Theraulaz et al. 1998] [T]; [Gautrais et al. 2002] [R]; [Jeanson et al. 2007] [R]; [Kang et Theraulaz 2016] [T] (préimpression); [Fontanari et al. 2024] [T] partiel; revues [Beshers et Fewell 2001] et [Duarte et al. 2011]; [Duarte et al. 2012] [R] | Figures 1 à 3 de 1998 (T3.3 à T3.6) | Robustesse au pas de temps et à l'écrêtage des bornes; même moteur que les autres modèles |
| Réserve de main-d'œuvre, FFW | [Tofts et Franks 1992] [R]; [Tofts 1993] et [Franks et Tofts 1994] [M]; [Charbonneau et Dornhaus 2015a] et [Charbonneau et Dornhaus 2015b] [R]; [Charbonneau et al. 2015] [R]; [Charbonneau et al. 2017] [T]; [Hasegawa et al. 2016] [T] | T3.7, T3.8 | Duel FFW contre seuils variables (E3.3); discriminant de normalisation (E3.2); réserve côté abeille (≥ 50 % d'ouvrières inactives selon l'audit bio-abeilles, citant [Seeley et al. 1996]; valeur [à confirmer]) |
| Polyéthisme d'âge, inhibition sociale | [Seeley 1982] [R]; [Robinson 1992] [M]; [Huang et Robinson 1992] [R]; [Beshers et al. 2001] [R], équations non lues | T3.9, T3.10 (relationnel) | Modèle reconstruit [I]; maturation précoce comme mode d'échec pour P6 |
| Thermorégulation et diversité génétique | [Jones et al. 2004], [Graham et al. 2006], [Myerscough et Oldroyd 2004], [Jones et al. 2007], [Oldroyd et Fewell 2007], [Stabentheiner et al. 2010], [Peters et al. 2019] [R] | T3.11 à T3.13 (relationnel, après lecture) | Deux curseurs séparés (diversité entre individus, stochasticité individuelle); comparaison par métrique |
| Critiques et contre-preuves | [Ulrich et al. 2021] [T]; [Garrison et al. 2018] [T]; [Lynch et al. 2024] [R], prépublication; [Duarte et al. 2012] [R] | T3.14 (réfutation des seuils fixes individuels) | Intégrées comme scénarios de réfutation |
| Transposition agentique | [Campos et al. 2000], [Krieger et al. 2000], [Yang et al. 2025], [Kim et al. 2025], [Kleinberg et Raghavan 2021], [Wu et al. 2024b], [Fokoué et al. 2026] (prépublication) [R]; [Han et Zhang 2025] [R] (contre-exemple); [Wu et al. 2020] [T] | Aucun résultat LLM. Le modèle de Wu et al. 2020 n'est pas décrit dans le dossier : non reproduit. | Mécanisme du gain de boucle (H3.5), témoin orchestré à règle (H3.8), banc S3 pour P7 (E3.9); H3.9 traitée en hypothèse |

Hors périmètre, par décision : la taille critique de colonie ([Gautrais et al. 2002], [Jeanson et al. 2007]; modèles non lus), la ventilation collective ([Peters et al. 2019]; extension possible, hors noyau) et la division éclaireuses/recrues.

## 3. Hypothèses falsifiables

Toutes sont dirigées. **Confirmatoires préenregistrées : H3.1 à H3.4**; les autres sont **exploratoires** et étiquetées comme telles (principe 4 du cadre). Famille confirmatoire corrigée par Holm, exploratoire par Benjamini-Hochberg étiqueté [Benjamini et Hochberg 1995] (valeurs recommandées par le dossier de méthodes, [I]); règles de décision et déviations selon le protocole de reproduction ([04-protocole-reproduction.md](../docs/04-protocole-reproduction.md)).

### H3.1 — Wilson corrigé : les majors prennent le relais *(confirmatoire préenregistré)*
- **Énoncé.** Dans le modèle à seuils fixes à deux castes (θ_maj > θ_min), quand la fraction de majors passe de f_base (0,05 ou 0,25) à f_exp = 0,9 (ratio minors:majors de 1:9), l'activité par major est multipliée par un facteur compris dans [15 ; 30], pour **une même valeur** de θ_maj/θ_min; l'activité totale reste ≥ 75 % de la référence; le retour de f à f_base rétablit l'état initial.
- **VI.** Chemin de composition (19:1→1:9; 3:1→1:9; sensibilité : →1:2); θ_maj/θ_min (grille {5, 6, 8, 10} du dossier, puis raffinement). **VD.** Facteur x_maj(f_exp)/x_maj(f_base); part d'activité restaurée; réversibilité.
- **Effet minimal.** Facteur ≥ 15 (borne basse publiée) sur les deux chemins.
- **Réfutation.** Aucune valeur de θ_maj/θ_min ne place les deux chemins dans [15 ; 30] à la fois, ou la part restaurée est < 75 %.
- **Notes.** Un paramètre libre pour deux chemins : le test porte sur l'existence d'une valeur commune. La part restaurée vaut ≈ 100 % par construction (fraction active = δ/α, [I]) : ce critère n'est pas discriminant (R2).

### H3.2 — La normalisation de la demande se lit dans le retrait d'inactives *(confirmatoire préenregistré)*
- **Énoncé.** Avec une demande absolue (Δs = δ − α′·N_act), le retrait des 20 % d'ouvrières les plus inactives abaisse durablement l'inactivité de la colonie; avec une demande proportionnelle à N (éq. 7 de [Theraulaz et al. 1998]), l'inactivité revient à 1 − δ/α. Dans les deux cas, le retrait des 20 % les plus actives est compensé; le retrait aléatoire ne change rien. Seule la demande absolue reproduit [Charbonneau et al. 2017].
- **VI.** Normalisation (proportionnelle, absolue) × type de retrait (actives, inactives, aléatoire; 20 %). **VD.** Fraction inactive à deux horizons (rapport 1:2 entre les horizons, comme 1 et 2 semaines); activité totale après retrait des actives.
- **Effet minimal.** Après retrait des inactives : inactivité inférieure à la référence d'au moins 0,146 (1 é.-t. publié) [I, à confirmer]; après retrait des actives : activité totale à ± 10 % de la référence.
- **Réfutation.** La demande absolue ne reproduit pas la baisse durable, ou la demande proportionnelle la reproduit aussi : l'expérience ne départage plus les deux normalisations.
- **Notes.** Calibrer δ/α sur l'inactivité publiée : 1 − 0,607 ≈ 0,39 [I]. Dérivation du dossier [I], à vérifier par simulation.

### H3.3 — Réserve contre FFW *(exploratoire jusqu'à la lecture de Charbonneau et Dornhaus 2015b)*
- **Énoncé.** À normalisation fixée par H3.2, un modèle à seuils variables produit une inactivité individuellement persistante, et les remplaçantes des 20 % les plus actives viennent surtout des inactives; FFW (seuils identiques et très bas, cas particulier selon [Theraulaz et al. 1998]) produit une répétabilité nulle et un recrutement indifférencié.
- **VI.** Modèle (FFW; seuils variables; seuils variables + fatigue de [Hasegawa et al. 2016]); retrait des 20 % les plus actives. **VD.** Répétabilité de l'état inactif entre deux fenêtres; origine des remplaçantes par classe d'avant-retrait; persistance.
- **Effet minimal.** [à confirmer] : à fixer sur la dispersion empirique de [Charbonneau et Dornhaus 2015b] après lecture. **Réfutation.** Répétabilité équivalente (TOST, marge à fixer) entre FFW et seuils variables, ou remplaçantes non issues des inactives.
- **Notes.** Les équations de FFW (chaîne de zones) ne sont pas lues ([Tofts 1993] [M]) : FFW est implanté comme cas particulier, Modèle simplifié.

### H3.4 — La diversité redistribue les changements, elle n'en réduit pas le nombre moyen *(confirmatoire préenregistré)*
- **Énoncé.** À N, δ, α, p fixés et une seule tâche, le nombre moyen d'engagements par agent et par pas est indépendant de la diversité des seuils (il vaut p·δ/α en régime stationnaire, [I]) alors que sa dispersion entre agents croît avec elle.
- **VI.** σ_log de θ (0 ; 0,25 ; 0,5 ; 1 [à confirmer]); ordre de mise à jour. **VD.** Engagements par agent et par pas; écart-type entre agents.
- **Effet minimal / équivalence.** Marge ± 5 % de p·δ/α [à confirmer] (TOST sur la moyenne); croissance monotone de la dispersion. **Réfutation.** IC à 90 % de la différence hors de la marge, ou dispersion non croissante.
- **Notes.** Identité de bilan de flux (les départs valent p·N_act), retrouvée dans un essai de rédaction (moyenne de 0,0666 à 0,0667 contre 0,0667 attendu; dispersion entre agents de 0,0018 à 0,0519) [I, à confirmer] : le test confirmatoire vérifie surtout le code et la lecture de la métrique « changements de tâche ». Avec m ≥ 2 tâches, la fraction d'engagements qui sont des changements de tâche devrait baisser avec la diversité de profil (θ_ij variable selon la tâche) : mesurée en E3.4, **exploratoire** [I, non vérifié]. Cela situe [Wu et al. 2020] (seuils constants, plus de 400 changements de tâche par course) : si leur écart est réel, il ne vient pas du nombre moyen d'engagements de ce modèle [I].

### H3.5 — L'oscillation vient du gain de boucle et de la lecture synchrone, pas de l'identité *(exploratoire)*
- **Énoncé.** Dans le modèle à seuils, des agents à seuils identiques ne présentent d'oscillation soutenue que si la lecture du stimulus est synchrone et que G·Δt > T* + p, avec G = α·T′(s*)·(1 − x*) (gain de boucle) [I]; la diversité des seuils réduit alors l'amplitude de façon monotone; en lecture séquentielle ou quand Δt tend vers 0, il n'y a pas d'oscillation soutenue.
- **VI.** Ordre de mise à jour (synchrone, séquentiel); Δt; seuil médian (donc G); σ_log de θ. **VD.** Écart-type de la fraction active et de s; autocorrélation; frontière de stabilité observée contre prédite.
- **Effet minimal.** Réduction ≥ 50 % de l'écart-type entre σ_log = 0 et σ_log = 1 dans le régime instable [à confirmer]; frontière observée à ± [à confirmer] de la prédiction linéarisée.
- **Réfutation.** Réduction non monotone, ou oscillation soutenue en lecture séquentielle, ou frontière observée hors de la tolérance.
- **Notes.** Le système continu (EDO) est stable pour tout G (parties réelles négatives) [I]; l'instabilité est donc un régime de pas discret et de lecture synchrone, ce qui est justement celui d'agents cadencés en tours (lien avec H3.9). **Réserve de statut :** l'effet a été entrevu lors de la rédaction (N = 1000, α = 3, δ = 1, p = 0,2, seuils log-normaux de médiane 3, 2×10⁴ pas, 3 graines : écart-type de la fraction active 0,12 pour σ_log = 0 contre 0,02 pour σ_log = 1 en lecture synchrone; 0,016 contre 0,013 en lecture séquentielle) [I, non versionné, à confirmer]. Une réplication préenregistrée sur graines neuves teste le code, non une prédiction indépendante (R8).

### H3.6 — Abeille : l'inhibition sociale gouverne l'âge au premier butinage *(exploratoire jusqu'à la lecture de Beshers et al. 2001)*
- **Énoncé.** Dans un modèle de polyéthisme d'âge où les butineuses inhibent la maturation des plus jeunes, le retrait des butineuses avance l'âge moyen au premier butinage d'au moins 7 jours [à confirmer], et cet effet disparaît si l'inhibition est désactivée.
- **VI.** Inhibition (oui, non); retrait des butineuses; taux a et b (balayage). **VD.** Âge moyen au premier butinage; fraction de butineuses; séquence des rôles.
- **Effet minimal.** ≥ 7 jours [à confirmer] (jusqu'à 14 j, [Huang et Robinson 1992] [R], description générale). **Réfutation.** Avance < 7 j avec inhibition active, ou même avance sans inhibition.
- **Notes.** Le paradigme « retrait des butineuses » n'est pas sourcé (R5). Variante ancrée dans la source : transplant d'abeilles âgées dans une colonie sans butineuses ([Huang et Robinson 1992]).

### H3.7 — Thermorégulation : la diversité des seuils réduit la variabilité de température *(exploratoire jusqu'à la lecture de Jones et al. 2004 et Graham et al. 2006)*
- **Énoncé.** À stochasticité individuelle fixée, une colonie à 15 patrilignes a un écart-type de température du couvain inférieur à une colonie à 1 patriligne (chauffage); l'effet diminue quand la stochasticité individuelle augmente.
- **VI.** Patrilignes (1 ou 15 en chauffage; 5 en ventilation, selon [Graham et al. 2006]); stochasticité individuelle (déterministe, réponse probabiliste lisse). **VD.** Écart-type de T_couvain; moyenne dans 33–36 °C ([Stabentheiner et al. 2010]); composition des ventileuses par patriligne.
- **Effet minimal.** [à confirmer] : à recaler sur [Jones et al. 2004] ou [Graham et al. 2006]. **Réfutation.** Écart-type (diverse) ≥ écart-type (uniforme), ou effet insensible à la stochasticité (la diversité n'est alors pas le mécanisme dominant).
- **Notes.** Résultat partiellement contesté : l'audit bio-abeilles relève qu'une étude (Simone-Finstrom et al. 2014, absente de la bibliographie) ne trouve pas la diversité attendue prédictive de la stabilité thermique. [Jones et al. 2007] : différences de proportion de ventileuses « dans de nombreux cas », non partout.

### H3.8 — Témoin orchestré : l'avantage d'un orchestrateur dépend de son information *(exploratoire; Hypothèse de l'auteur)*
- **Énoncé.** Dans l'environnement S3 à demande décomposable et stationnaire, un orchestrateur à règle (information complète, affectation immédiate) bat la règle à seuils sur l'écart du stimulus à la consigne; l'avantage disparaît ou s'inverse quand l'observation de l'orchestrateur est retardée de d pas ou bruitée, ou après le retrait de 30 % des agents.
- **VI.** Politique (orchestré; seuils; choix aléatoire; indépendants); délai d et bruit d'observation; perturbation. **VD.** RMS(stimulus − consigne); coût (lectures, affectations); robustesse.
- **Effet minimal.** d de Cohen ≥ 0,2 [à confirmer], avec 1 000 répétitions par cellule pour les agents à règle (dossier P7). **Réfutation.** L'orchestrateur reste meilleur à tous les délais testés, ou n'est jamais meilleur à délai nul.
- **Notes.** Aucun appui publié lu : Hypothèse de l'auteur. S3 est le cas le plus favorable à l'orchestration (structure décomposable); un résultat ne s'étend pas aux tâches séquentielles.

### H3.9 — Les agents LLM identiques oscillent *(HYPOTHÈSE; exploratoire en P3, test confirmatoire en P7)*
- **Énoncé.** Des agents LLM identiques (même modèle, même prompt) qui lisent le même arriéré à chaque tour produisent une oscillation de l'arriéré d'amplitude supérieure à celle d'une population hétérogène (prompts variés, ou modèles différents), à budget égal.
- **VI.** Population (même modèle/même prompt; même modèle/prompts variés; modèles différents; règle à seuils). **VD.** Écart-type de l'arriéré; changements de tâche par agent; fraction active comparée à δ/α.
- **Effet minimal.** Fixé dans la fiche P7. **Réfutation.** Pas de réduction d'amplitude chez les populations hétérogènes à budget égal, ou amplitude des identiques non supérieure à la ligne de base à règle (E3.9).
- **Appui indirect, aucun direct.** Aucune étude lue ne mesure l'oscillation d'agents LLM identiques en allocation de tâches (dossier). Ingrédients publiés, hors oscillation : erreurs corrélées entre plus de 350 LLM ([Kim et al. 2025] [R]); monoculture algorithmique ([Kleinberg et Raghavan 2021] [R]); monoculture générative ([Wu et al. 2024b] [R]); isomorphisme colonies/ensembles par décorrélation ([Fokoué et al. 2026] [R], prépublication); seuils constants moins bons en essaim non LLM ([Wu et al. 2020] [T]).
- **Contre-preuves, à intégrer comme scénarios de réfutation.** La variation entre ouvrières n'améliore pas l'allocation ([Lynch et al. 2024] [R], prépublication); le seuil individuel mesuré seul ne prédit pas la réponse en groupe, chez un bourdon ([Garrison et al. 2018] [T]); les seuils seuls ne suffisent pas ([Ulrich et al. 2021] [T]). Garde-fou : « la diversité l'emporte sur la capacité » n'est pas établi par [Hong et Page 2004] ([Thompson 2014]; [Grim et al. 2019]; [Romaniega 2023]).
- **Précision.** Le mécanisme de H3.5 prédit une oscillation par gain de boucle et lecture synchrone, non par identité : si P7 en observe, la mesure à faire est le gain effectif, non seulement l'homogénéité.

## 4. Modèles de référence

Chaque modèle nomme son taxon et son préréglage (cadre, §2.3). Unités : stimulus et seuils sans dimension; temps en pas de simulation, sans conversion en minutes ni en jours (R13); températures en °C. Les modèles 4.1 à 4.3 sont lus en texte (en partie pour 4.1); les modèles abeille 4.4 et 4.5 sont des **reconstructions [I]**.

### 4.1 Fourmi, *Pheidole* — seuils fixes (`pheidole-seuils-fixes`)

Type : individu-centré à temps discret (transitions de Bernoulli) avec champ moyen algébrique. Intégration : pas fixe Δt = 1; aucun intégrateur d'EDO (le champ moyen se résout par bissection). Sources : équation 1 de [Theraulaz et al. 1998] [T], qui l'attribue à [Bonabeau et al. 1996] [non vérifiée]; dynamique du stimulus : éq. 3 de [Fontanari et al. 2024] [T] partiel (cet article emploie une règle de réponse en échelon bruité, fonction erf, et non T_θ), généralisée par les éq. 1–2 de [Ulrich et al. 2021] [T] (P_ij = s^η/(s^η + θ_ij^η), abandon à probabilité constante τ, 10 000 pas).

```
Inactif → actif   avec probabilité  T_θc(s) = s² / (s² + θc²)     θc ∈ {θ_min (minors), θ_maj (majors)}
Actif → inactif   avec probabilité  p                              (durée moyenne d'engagement 1/p)
s(t+1) = max(0, s(t) + δ − α · N_act(t) / N)                       (plancher à 0 : choix d'implantation, non publié)
Champ moyen :  x_c* = T_c(s*) / (T_c(s*) + p),  s* tel que (1 − f)·x_min* + f·x_maj* = δ/α
```

| Paramètre | Valeur | Source et statut |
|---|---|---|
| α, δ, p | 3 ; 1 ; 0,2 | [Theraulaz et al. 1998] [T] (mêmes auteurs que 1996). Valeurs de 1996 : [à confirmer] (R1) |
| θ_min, θ_maj, N | 10 ; 80 ; 1000 | Valeurs de contrôle du dossier [I], non publiées. θ_maj/θ_min ≈ 6–10 selon le chemin comparé : calibration [à confirmer] (R6) |
| f (fraction de majors) | 0,05 (19:1); 0,25 (3:1); 0,67 (1:2); 0,9 (1:9) | Correspondance de ratios du dossier. Ratio usuel 3:1 à 20:1 selon l'espèce [Wilson 1984] [R] |

**Propriétés [I], vérifiées par simulation dans le script de contrôle.** (1) En régime stationnaire, ⟨N_act/N⟩ = δ/α (Δs = 0) : un tiers de la colonie pour α = 3, δ = 1, quel que soit f; le modèle prédit une compensation totale tant que T peut l'absorber. (2) Champ moyen par caste, ci-dessus. (3) Invariance d'échelle : multiplier tous les θ par k multiplie s* par k; seul θ_maj/θ_min compte.

**Valeurs de contrôle [I]** (N = 1000, θ_min = 10, θ_maj = 80, p = 0,2, α = 3, δ = 1, 2·10⁴ pas, moyenne sur la 2ᵉ moitié, 5 graines) :

| f | Ratio | x_maj, champ moyen = simulation | x_min, simulation | Actifs totaux |
|---|---|---|---|---|
| 0,05 | 19:1 | 0,009 | 0,350 | 0,333 |
| 0,25 | 3:1 | 0,014 | 0,440 | 0,333 |
| 0,50 | 1:1 | 0,038 | 0,628 | 0,333 |
| 0,90 | 1:9 | 0,281 | 0,808 | 0,333 |

**Rapport d'activité des majors** x_maj(f_exp)/x_maj(f_base) selon θ_maj/θ_min (champ moyen, colonnes « 1:2 » à f = 0,67; avec f = 2/3 exact, la colonne 19:1→1:2 donne 6,3 / 8,2 / 12,7 / 18,2) [I] :

| θ_maj/θ_min | 19:1 → 1:2 | 19:1 → 1:9 | 3:1 → 1:2 | 3:1 → 1:9 |
|---|---|---|---|---|
| 5 | 6,4 | 12,1 | 4,3 | 8,2 |
| 6 | 8,4 | 17,2 | 5,6 | 11,5 |
| 8 | 13,0 | 30,0 | 8,5 | 19,6 |
| 10 | 18,6 | 46,5 | 12,1 | 30,1 |

Lecture [I] : en croisant les deux chemins vers 1:9, seule la valeur 8 de la grille tombe dans [15 ; 30] pour les deux (30,0 et 19,6, le premier à la limite). C'est une **calibration**, pas la valeur publiée.

**ODD (résumé).** *Objet* : compensation de caste, fraction active. *Entités* : N ouvrières (caste, θ, état actif ou non); stimulus global s (une tâche). *Ordonnancement* : à chaque pas, chaque agent lit s(t) et tire sa transition; s est ensuite mis à jour avec N_act après les transitions (ordre séquentiel du script de contrôle); la variante synchrone (N_act(t − 1)) est un facteur de E3.5. *Stochasticité* : Bernoulli, graine du noyau. *Initialisation* : s(0) = 0, tous inactifs. *Sorties* : x_maj, x_min, N_act/N sur la 2ᵉ moitié.

### 4.2 Générique — seuils renforcés (`generique-theraulaz98`; illustration *Polistes dominulus*)

Source : [Theraulaz et al. 1998] [T] (éq. 1 à 7, Fig. 1 à 3; texte et figures lus). Type : EDO stochastiques à m tâches, N individus, seuils θ_ij, fractions de temps x_ij, stimulus s_j. Intégration : Euler–Maruyama [I]. FFW y est un cas particulier : seuils fixes, identiques et très bas.

```
(1)  T_θij(s_j) = s_j² / (s_j² + θij²)
(2a) θij → θij − ξ·Δt        si i exécute j pendant Δt (apprentissage)
(2b) θij → θij + φ·Δt        sinon (oubli = relèvement du seuil)
(3)  θij → θij − xij·ξ·Δt + (1 − xij)·φ·Δt                     (forme moyennée de (2))
(4)  ∂t θij = [(1 − xij)·φ − xij·ξ] · Θ(θij − θmin) · Θ(θmax − θij)      Θ = échelon
(5)  ∂t xij = T_θij(s_j)·(1 − Σk xik) − p·xij + ψ(i,j,t)
(6)  ψ : bruit gaussien centré, variance σ², non corrélé dans le temps, entre individus et entre tâches
(7)  ∂t s_j = δ − (α/N)·Σi xij
```

ξ et φ valent pour toutes les tâches; δ et α sont identiques pour les deux tâches; p est commun. Spécialiste de j si θij < 100; convergence (T_c) quand, pour tout i, j, θij > 900 ou θij < 100. N_n : individus à θ_i1 > 900 avant le retrait et < 100 à la réintroduction; N_f : ceux d'entre eux encore à θ_i1 < 100 longtemps après.

| Figure | Paramètres publiés | Résultat publié |
|---|---|---|
| 1a–b | N = 5, m = 2, θ(0) = 500, x(0) = 0,1, α = 3, δ = 1, p = 0,2, ξ = 10, φ = 1, σ = 0,1; temps 0–3000 | Individus 3, 4, 5 spécialistes de la tâche 1 (x_i1 ≈ 0,55; x_i2 ≈ 0,05); 1 et 2 de la tâche 2 (x_i1 ≈ 0,05; x_i2 ≈ 0,8) |
| 1c | Idem; θ(0) uniformes sur [1 ; 1000] | Les individus à θ initial bas se spécialisent; l'individu 1 l'est des deux tâches |
| 2a | N = 100, m = 2, φ + ξ = 11, α = 3, δ = 1, p = 0,2, σ = 0,1, θ(0) = 500, x(0) = 0,1 | φ < 0,4 : tous spécialistes; T_c grand près de 0,4; 0,4 < φ < 2 : différenciation; φ > 2 : aucune spécialisation |
| 2b | N = 100, m = 2, α = 3, δ = 1, ξ = 10, φ = 1, σ = 0,1 | p < 0,04 : tous spécialistes; chute après 0,04; 0,04 < p < 0,42 : T_c décroît, spécialistes en hausse; p > 0,42 : tous spécialistes |
| 3 | N = 100, m = 2, α = 3, δ = 1, p = 0,2, ξ = 10, φ = 1, σ = 0,1; retrait des 50 spécialistes de la tâche 1 pendant T_r | Les 50 restants prennent la tâche 1 si T_r > 1700 (N_n); ils restent spécialistes après réintroduction si T_r > 3700 (N_f) |

Contrôle de cohérence [I] : l'éq. 7 impose Σ_i x_ij/N → δ/α = 1/3; Fig. 1b : (3 × 0,55 + 2 × 0,05)/5 = 0,35 et (3 × 0,05 + 2 × 0,8)/5 = 0,35.

**Points d'implantation que le texte ne tranche pas [I] (R3).** Δt non donné : prendre Δt = 1 et vérifier que Δt = 0,1 donne les mêmes transitions. Bruit : σ√Δt·N(0,1), avec x_ij ∈ [0, 1] et Σ_k x_ik ≤ 1. Éq. 4 lue littéralement, Θ(0) = 0 fige θ aux bornes, ce qui interdirait la baisse observée à la Fig. 3 : implanter un écrêtage θ ← min(max(θ, θ_min), θ_max), pas un gel. Le symbole δ désigne deux choses dans l'article (incrément de stimulus et Dirac). Les valeurs publiées sont des prédictions de modèle, non des mesures.

**ODD (résumé).** *Entités* : N individus, m tâches, θ_ij, x_ij, s_j. *Ordonnancement* : pas Δt, schéma d'Euler explicite avec mise à jour simultanée de x, θ et s [I]. *Stochasticité* : bruit ψ gaussien. *Initialisation* : θ(0) = 500 (ou uniforme), x(0) = 0,1, s(0) à fixer [à confirmer]. *Sorties* : trajectoires de θ, T_c, nombres de spécialistes, N_n, N_f.

### 4.3 Fourmi — réserve et fatigue (*Temnothorax rugatulus*, *Myrmica kotokui*; `temnothorax-reserve`, `myrmica-fatigue`, `ffw-cas-particulier`)

**Données et protocole, *T. rugatulus*** ([Charbonneau et al. 2017] [T]) : 20 colonies, 1307 ouvrières (moyenne 65,35); proportion moyenne du temps inactif 0,607 (médiane 0,628, é.-t. 0,146). Retrait des 20 % les plus actives (5 colonies) : l'activité de la colonie est maintenue, les nouvelles plus actives viennent surtout des groupes « inactives » et « marcheuses » (Fig. 1A, 5A [à confirmer]); des 20 % les plus inactives (9 colonies) : l'inactivité baisse à une semaine et reste basse à deux (Fig. 1B, 2B [à confirmer]); aléatoire (6 colonies) : aucun changement (Fig. 1C [à confirmer]). Contexte : l'inactivité est constante pour un individu et distincte entre individus ([Charbonneau et Dornhaus 2015b] [R]), identique au laboratoire et sur le terrain ([Charbonneau et al. 2015] [R]); la revue [Charbonneau et Dornhaus 2015a] [R] généralise à « tout système distribué ».

**Modèle de fatigue** ([Hasegawa et al. 2016] [T]) : grille 50×50, 75 ouvrières; stimulus initial 5,001, +1 par pas s'il n'est pas traité; seuils variables tirés d'une normale de moyenne 5 (bornes 0–10) contre seuil uniforme de 5; fatigue : énergie 10 qui tombe à 0 après une tâche et se récupère à taux constant (variable); déplacement aléatoire (probabilité 0,5); taux d'apparition des tâches 0,006–0,3; la colonie meurt au premier pas sans traitement; 5 essais × 1000 pas. Données *M. kotokui* : 66,0 ± 9,8 % des comportements sont du repos.

**FFW** ([Tofts et Franks 1992] [R]; [Tofts 1993] et [Franks et Tofts 1994] [M]) : implanté comme cas particulier des seuils fixes (identiques, très bas; valeur « très bas » [à confirmer]), tel que décrit par [Theraulaz et al. 1998]. Les équations de FFW (zones en chaîne, déplacement vers le travail) ne sont pas lues : **Modèle simplifié** (R5).

**Normalisation de la demande** [I]. Proportionnelle à N : Δs = δ − α·N_act/N (éq. 7). Absolue : Δs = δ − α′·N_act. La première ramène la fraction active à δ/α quand on retire des inactives; la seconde fixe N_act et abaisse durablement l'inactivité. L'expérience de [Charbonneau et al. 2017] départage donc les deux (H3.2).

**ODD (résumé).** *Entités* : ouvrières (θ_i, état, énergie pour la fatigue); stimulus; grille seulement pour `myrmica-fatigue`. *Stochasticité* : tirages de Bernoulli, déplacement, apparition des tâches. *Sorties* : fraction inactive, origine des remplaçantes, persistance, tâches traitées.

### 4.4 Abeille, *Apis mellifera* — polyéthisme d'âge et inhibition sociale (`apis-age-inhibition`)

Faits lus : cinq castes femelles (reine et quatre sous-castes d'âge : nettoyage des cellules, nid à couvain, stockage de la nourriture, butinage); 0–2 j : nettoyage; les tâches d'un même âge sont co-localisées dans le nid ([Seeley 1982] [R]). Âges indicatifs : 1–3 j nettoyage, 3–11 j soins et entretien, 11–20 j réception et stockage, butinage vers 20 j [S] ([Kang et Theraulaz 2016] citant [Seeley 1982]); la probabilité de retour du butinage aux soins décroît avec le temps passé à butiner [S] ([Theraulaz et al. 1998]). Plasticité régulée par l'hormone juvénile; le butinage précoce peut survenir jusqu'à deux semaines plus tôt que la moyenne (description générale), et les interactions entre ouvrières ont un effet quantitatif (transplants d'abeilles âgées, abeilles élevées en groupes de tailles différentes) ([Huang et Robinson 1992] [R]). Un modèle combinant développement intrinsèque et inhibition sociale explique corrélation âge-tâche, âge de premier butinage, allocation intérieur/butinage et récupération après perturbation démographique ([Beshers et al. 2001] [R]) : **équations non lues** (R5). Réserve : l'audit bio-abeilles rapporte qu'au moins la moitié des ouvrières sont inactives à tout moment, d'après [Seeley et al. 1996] (valeur [à confirmer]).

**Reconstruction pour la simulation [I], pas les équations publiées** :

```
h_i(t+1) = h_i(t) + a − b · (rencontres de i avec des butineuses à t)       h_i : variable interne sans dimension
i butine quand h_i > θ_F ;  retour du butinage aux soins : probabilité décroissante avec le temps passé à butiner [S]
```

Paramètres a, b, θ_F, N, rencontres par pas, pas de temps : [à confirmer]; calibrer pour que l'âge moyen au premier butinage tombe vers 20 j [S]. Remplacer par les équations publiées dès que [Beshers et al. 2001] est lu. Type : individu-centré, pas d'un jour [à confirmer]. *Taxon* : *A. mellifera*; l'inhibition par contact est un signal direct local [I]. **ODD (résumé).** *Entités* : abeilles (âge, h_i, rôle). *Ordonnancement* : vieillissement, rencontres, mise à jour de h, changement de rôle. *Sorties* : âge au premier butinage, fraction de butineuses, séquence des rôles.

### 4.5 Abeille, *Apis mellifera* — thermorégulation par seuils variés (`apis-thermoregulation`)

Faits lus : les colonies à plusieurs pères ont une température du couvain plus stable; mécanisme proposé : la diversité génétique des seuils de température module la ventilation ([Jones et al. 2004] [R]). Simulations à 1 ou 15 patrilignes qui chauffent (la colonie à une patriligne est en moyenne moins stable) et à 5 patrilignes qui refroidissent, la proportion engagée de chaque patriligne dépendant de la température ([Graham et al. 2006] [R]). Uniforme mal adapté, hétérogène rapide ([Myerscough et Oldroyd 2004] [R]). Proportions de ventileuses différentes selon la patriligne chez *A. florea*, « dans de nombreux cas » ([Jones et al. 2007] [R]). Couvain entre 33 et 36 °C; production de chaleur active surtout par les abeilles de plus d'environ 2 jours ([Stabentheiner et al. 2010] [R]). Deux lectures de la diversité : spécialisation génétique résiliente, ou effet secondaire de la polyandrie ([Oldroyd et Fewell 2007] [R]). Nombre de colonies, schéma d'insémination, statistiques, équations et paramètres de 2004 et 2006 : **non lus** [à confirmer] (R4).

**Reconstruction [I], aucune équation publiée lue** :

```
T(t+1) = T(t) + λ·(T_amb(t) − T(t)) + κ_h·H(t) − κ_c·F(t)
H = fraction qui chauffe (T < θh_i),  F = fraction qui ventile (T > θc_i),  θ_i = μ + η_patriligne + ε_i
```

Colonie uniforme : 1 patriligne; diverse : 15 (comme [Graham et al. 2006]). Une réponse déterministe commune déclenche tout le monde au même instant; une réponse probabiliste T_θ adoucit déjà ce tout-ou-rien. **Les deux sources de désynchronisation (diversité entre individus, stochasticité de chaque individu) sont deux curseurs séparés**, sinon la comparaison est biaisée. λ, κ_h, κ_c, μ, η, ε, T_amb, N et le pas : [à confirmer]. Extension possible, hors noyau : ventilation collective ([Peters et al. 2019]). **ODD (résumé).** *Entités* : N abeilles (patriligne, θh_i, θc_i), température T. *Ordonnancement* : lecture de T, tirage des réponses, mise à jour de T. *Stochasticité* : réponse individuelle (curseur), ε_i. *Sorties* : T(t), écart-type, moyenne, composition des ventileuses.

### 4.6 Contre-modèles — *Bombus terrestris* et *Ooceraea biroi* (`bombus-garrison`, variante d'efficacité)

**Bourdon** ([Garrison et al. 2018] [T]; pas une abeille mellifère) : 159 ouvrières, 14 colonies. Seuil de ventilation seul 40,87 °C [40,54 ; 41,20]; en groupe aléatoire 42,67 °C [42,16 ; 43,17]; proportion qui ventile 77 % seule contre 39 % en groupe; répétabilité du seuil R_M = 0,231; le seuil mesuré seul ne prédit pas qui ventile en groupe. Contre-preuve directe aux seuils fixes individuels. Le modèle à approcher (seuil individuel + effet de groupe par inhibition sociale) est une construction [I]; aucune équation publiée n'est reprise.
**Fourmi clonale *O. biroi*** ([Ulrich et al. 2021] [T], éq. 1–2 ci-dessus; 120 colonies de 16 ouvrières, 8 dans l'expérience de morphologie) : le mélange génétique fait converger les comportements, le mélange d'âges n'a pas d'effet, le mélange morphologique les fait diverger; la variation des seuils ne reproduit qu'en partie ces patrons, il faut ajouter la variabilité d'efficacité des adultes et la demande des larves. Sert de **borne** : curseur « efficacité individuelle » dans le modèle commun, sans cible T propre.

## 5. Cibles de reproduction

Les valeurs publiées sont celles lues dans la source; tolérances, marges et répétitions sont des propositions du dossier ou de cette fiche [I, à confirmer au préenregistrement]. **Niveaux :** *identité* (tolérance numérique) pour les vérifications internes; *alignement relationnel* quand la source ne donne ni dispersion ni valeur exacte; *équivalence distributionnelle* (TOST) seulement quand une dispersion publiée existe (cadre, principe 3; [Axtell et al. 1996]). T3.3 à T3.6 sont des **répliques** de résultats de modèle; T3.2, T3.7 et T3.14 comparent à des données empiriques (validation partielle); on ne confond jamais les deux (principe 1). Correspondance avec les identifiants du dossier : T3.1 = F0, T3.2 = F1, …, T3.8 = F7, T3.9 = A1, …, T3.13 = A5, T3.14 = X1.

| ID | Espèce (préréglage) | Grandeur | Valeur publiée | Niveau | Tolérance ou marge TOST | Rép. | Source | Lecture | Porte go/no-go |
|---|---|---|---|---|---|---|---|---|---|
| T3.1 | Générique (`pheidole-seuils-fixes`) | Fraction active moyenne à l'équilibre | δ/α (1/3 pour α = 3, δ = 1), conséquence de l'éq. 7 | Identité | abs(ā − δ/α) ≤ 0,01 | 10 graines; N = 1000; 2·10⁴ pas | [Theraulaz et al. 1998] | [T] + [I] | **Bloquante** pour T3.2 à T3.8. No-go : bogue |
| T3.2 | *Pheidole* (`pheidole-seuils-fixes`) | Activité par major quand le ratio minors:majors passe sous 1:1 | ×15 à ×30; répertoire ×1,4 à ×4,5 (non modélisé); ≥ 75 % de l'activité des minors restaurée; changement en moins d'une heure, réversible | Relationnel (plage empirique) | Sans dispersion publiée : TOST sans objet; moyenne des graines dans [15 ; 30] sur les deux chemins vers 1:9 | 20 graines; N = 1000 | [Wilson 1984]; modèle [Bonabeau et al. 1996] | [R]; modèle [non vérifiée] | Go partiel « calibré » (R1, R6, R2). No-go si aucun θ_maj/θ_min ne convient |
| T3.3 | Générique (`generique-theraulaz98`) | Spécialisation d'individus identiques (Fig. 1a–b) | 3 spécialistes de la tâche 1 (x ≈ 0,55), 2 de la tâche 2 (x ≈ 0,8); N = 5 | Relationnel | Voir règles ci-dessous | 100 graines | [Theraulaz et al. 1998] | [T] | Go → docking. No-go → R3 |
| T3.4 | Générique | Transitions selon φ (Fig. 2a) | 0,4 et 2 | Relationnel | Voir règles | 10 graines par point (pas de 0,1) | [Theraulaz et al. 1998] | [T] | Go → docking. No-go → R3 |
| T3.5 | Générique | Transitions selon p (Fig. 2b) | 0,04 et 0,42 | Relationnel | Voir règles | 10 graines par point | [Theraulaz et al. 1998] | [T] | Go → docking. No-go → R3 |
| T3.6 | Générique | Retrait puis réintroduction (Fig. 3) | Seuils de T_r : 1700 (N_n) et 3700 (N_f) | Relationnel | ± 20 % de 1700 et de 3700; bornes graphiques approximatives | 20 graines; pas de 100 | [Theraulaz et al. 1998] | [T] | Go → docking. No-go → R3 |
| T3.7 | *Temnothorax rugatulus* (`temnothorax-reserve`) | Réserve de main-d'œuvre | Inactivité 0,607 (é.-t. 0,146; 20 colonies); retrait des 20 % les plus actives compensé; des 20 % les plus inactives non compensé; aléatoire sans effet | Relationnel | Référence 0,61 ± 0,15; activité totale à ± 10 % de la référence après retrait des actives | 30 graines; N ≈ 65 | [Charbonneau et al. 2017] | [T]; figures [à confirmer] | Go → E3.2. No-go → R7 |
| T3.8 | *Myrmica kotokui* (`myrmica-fatigue`) | Persistance avec fatigue | Seuils variables : moins de tâches traitées (Fig. 1a), persistance plus longue (Fig. 1b–c); écart nul quand la récupération vaut 1 | Relationnel | Persistance médiane variable > uniforme (Wilcoxon, p < 0,05) si récupération < 1; aucune différence à 1; tâches traitées variable < uniforme | 30 essais (5 publiés); N = 75 | [Hasegawa et al. 2016] | [T] | Go → E3.3. No-go : revoir le paramétrage publié |
| T3.9 | *Apis mellifera* (`apis-age-inhibition`) | Séquence âge-tâche | 4 sous-castes d'âge; 0–2 j : nettoyage; repères 1–3 / 3–11 / 11–20 / ≈ 20 j | Relationnel | Séquence nettoyage → couvain → stockage → butinage; âges médians à ± 3 j des repères | 20 graines | [Seeley 1982]; âges via [Kang et Theraulaz 2016] | [R]; âges [S] | Go → T3.10. No-go → R5 |
| T3.10 | *Apis mellifera* (`apis-age-inhibition`) | Plasticité de l'âge au premier butinage | Butinage précoce jusqu'à 2 semaines plus tôt (description générale, pas une mesure après retrait) | Relationnel | Avance ≥ 7 j [à confirmer] quand l'inhibition par les butineuses est supprimée | 20 graines | [Huang et Robinson 1992]; modèle [Beshers et al. 2001] | [R]; paradigme non sourcé | Go → E3.6. No-go → R5 |
| T3.11 | *Apis mellifera* (`apis-thermoregulation`) | Stabilité thermique selon la diversité | Plus stable avec plusieurs pères (aucun chiffre lu); couvain 33–36 °C | Relationnel | Écart-type diverse < uniforme (Mann-Whitney, p < 0,01); moyenne dans 33–36 °C; ampleur à recaler [à confirmer] | 30 graines par condition | [Jones et al. 2004]; [Graham et al. 2006]; [Stabentheiner et al. 2010] | [R] | Non figée avant lecture (R4) |
| T3.12 | *Apis mellifera* (`apis-thermoregulation`) | Composition des ventileuses selon la température | Varie selon la patriligne (5 simulées; *A. florea* « dans de nombreux cas ») | Relationnel | Spearman significatif pour ≥ 4 patrilignes sur 5 (monotonie en T : proposition du dossier, absente des sources) | 30 graines | [Graham et al. 2006]; [Jones et al. 2007] | [R] | Non figée avant lecture (R4) |
| T3.13 | *Apis mellifera* (modèle générique) | Adaptation à un saut de demande | Uniforme lente et inadéquate; hétérogène rapide et meilleure | Relationnel | Temps à ± 10 % de la cible et dépassement maximal plus faibles en hétérogène | 30 graines | [Myerscough et Oldroyd 2004] | [R] | Go → E3.4. No-go → R4 |
| T3.14 | *Bombus terrestris* (`bombus-garrison`), réfutation | Effet du groupe sur le seuil de ventilation | Seuil seul 40,87 °C; groupe 42,67 °C (+ 1,8 °C); participation 77 % → 39 %; R_M = 0,231 | Équivalence approchée | Un modèle à seuils fixes individuels doit échouer sur les trois valeurs; un modèle avec inhibition sociale doit les approcher à ± 25 % (marge proposée) | [à confirmer] | [Garrison et al. 2018] | [T] | Go si le contre-modèle échoue et l'inhibition passe. No-go → R9 |

**Règles de décision détaillées** (propositions du dossier, reprises).
- **T3.3.** Sur 100 graines : convergence avant t = 3000 dans ≥ 90 % des cas; chaque tâche a ≥ 1 spécialiste; Σ_i x_ij/N = 0,33 ± 0,05; les spécialistes de la tâche minoritaire sont plus actifs que ceux de la majoritaire dans ≥ 80 % des cas.
- **T3.4.** N_1 = N_2 = 100 pour φ ≤ 0,3 (N_j : spécialistes de la tâche j); strictement entre 0 et 100 pour φ ∈ [0,5 ; 1,8]; N_1 = N_2 = 0 pour φ ≥ 2,2; pic de T_c dans [0,3 ; 0,6].
- **T3.5.** Tous spécialistes pour p ≤ 0,03 et p ≥ 0,45; minimum du nombre de spécialistes dans [0,04 ; 0,10]; croissance sur [0,05 ; 0,42].
- **T3.6.** N_n ≤ 5 pour T_r ≤ 1500 et N_n ≥ 40 pour T_r ≥ 3000; N_f ≤ 5 pour T_r ≤ 3300 et N_f ≥ 25 pour T_r ≥ 4500. Les bornes 3000 et 4500 sont lues sur le graphique (approximatives); la vérification les juge compatibles et prudentes.
- **T3.3 à T3.6 et le pas de temps.** Si les transitions bougent entre Δt = 1 et Δt = 0,1, le critère porte sur la **forme** des transitions et non sur leur valeur exacte.
- **T3.7.** Après retrait des inactives : inactivité inférieure à la référence jusqu'à la fin de l'horizon; retrait aléatoire : aucun changement.
- **T3.2.** Retour à l'état initial quand f revient à f_base; activité totale ≥ 75 % de la référence (satisfaite par construction : R2).

## 6. Expériences originales

Une expérience par hypothèse (E3.k porte H3.k). Comparaisons appariées par graine, avec nombres aléatoires communs (dossier [p7-agents-llm.md](../recherche/dossiers/p7-agents-llm.md), qui fixe aussi les répétitions des agents à règle et des agents LLM). Les répétitions viennent du dossier quand il en donne; sinon ce sont des propositions à fixer par un pilote [à confirmer]. Une expérience ne démarre qu'après la porte de reproduction de son modèle (principe 1 du cadre).

| ID | Plan et facteurs | Répétitions | Critère de lecture |
|---|---|---|---|
| **E3.1** (H3.1) | Chemin de composition (19:1→1:2; 19:1→1:9; 3:1→1:2; 3:1→1:9) × θ_maj/θ_min ({5, 6, 8, 10}, puis raffinement autour de la valeur retenue) × mode (recomposition à N constant; retrait physique des minors, N décroît) × normalisation de la demande (proportionnelle, absolue) | 20 graines par cellule (T3.2) [à confirmer par pilote] | Facteur d'activité par major (moyenne, IC bootstrap sur graines); part d'activité restaurée; temps de rétablissement en pas; réversibilité. H3.1 : existence d'une valeur commune de θ_maj/θ_min. Le temps de rétablissement fournit à P7 la métrique « récupération après retrait d'une caste » |
| **E3.2** (H3.2) | Retrait de 20 % (actives, inactives, aléatoire) × normalisation (proportionnelle, absolue) × dispersion des seuils (σ_log 0,5 ou 1 [à confirmer]); δ/α calibré à 0,39 [I] | 30 graines (T3.7); N ≈ 65 | Inactivité aux deux horizons (rapport 1:2) et activité totale; les trois motifs de T3.7 lus pour chaque normalisation |
| **E3.3** (H3.3) | Modèle (FFW; seuils variables; seuils variables + fatigue, N = 75) × retrait des 20 % les plus actives | 30 graines | Répétabilité de l'état inactif entre fenêtres; origine des remplaçantes par classe d'avant-retrait; persistance (T3.8) |
| **E3.4** (H3.4) | σ_log (0; 0,25; 0,5; 1) × m (1; 2 tâches) × type de diversité (niveau : θ_i commun aux tâches; profil : θ_ij variable selon la tâche) × ordre de mise à jour (séquentiel; synchrone), avec un saut de demande en cours d'exécution | 100 graines [à confirmer] | Engagements par agent et par pas (équivalence, ± 5 % de p·δ/α [à confirmer]) et dispersion entre agents; fraction de changements de tâche (m = 2, exploratoire); écart-type de s; temps à ± 10 % après le saut (T3.13); coût et précision contre un choix aléatoire ([Lynch et al. 2024]) |
| **E3.5** (H3.5) | Ordre de mise à jour × Δt (1; 0,5; 0,1 [à confirmer]) × seuil médian (donc G) × σ_log (0; 0,25; 0,5; 1) | 20 graines [à confirmer] | Amplitude (écart-type de N_act/N), autocorrélation; frontière G·Δt = T* + p observée contre prédite. **La frontière prédite est écrite avant l'exécution de la grille** (R8) |
| **E3.6** (H3.6) | Inhibition (oui, non) × retrait de butineuses (0 %; une fraction [à confirmer]) × (a, b) balayés. Variante ancrée : transplant d'abeilles âgées ([Huang et Robinson 1992]). Extension pour P6, exploratoire : mortalité croissante des butineuses, existence d'un seuil au-delà duquel l'âge au premier butinage diminue sans arrêt (effondrement par maturation précoce; sources de l'audit absentes de la bibliographie : R14) | 20 graines | Âge au premier butinage; fraction de butineuses; avance ≥ 7 j [à confirmer] |
| **E3.7** (H3.7) | Patrilignes (1 ou 15 en chauffage; 5 en ventilation) × stochasticité individuelle (déterministe; réponse probabiliste; probabiliste bruitée) × perturbation de T_amb (échelon; cycle) | 30 graines par condition | Écart-type de T_couvain; moyenne dans 33–36 °C; composition des ventileuses (Spearman); interaction diversité × stochasticité |
| **E3.8** (H3.8) | Politique (orchestré à information complète; seuils; choix aléatoire; indépendants) × délai d'observation d (0; valeurs [à confirmer]) × bruit × perturbation (aucune; retrait de 30 % des agents; saut de demande) | 1 000 par cellule (agents à règle, dossier P7) | RMS(stimulus − consigne) en différence appariée avec IC bootstrap; coût (lectures et affectations); robustesse (variation après perturbation). Le G du cadre n'est pas calculé ici : sa décomposition revient à P7 |
| **E3.9** (H3.9) | Banc S3 : spécification versionnée (m types de tâches, δ, α, p, N, planning de demande, perturbations); conditions à règle (seuils identiques, seuils diversifiés) comme ligne de base; protocole des quatre conditions de P7 (même modèle/même prompt; même modèle/prompts variés; modèles différents; règle à seuils) | 1 000 par cellule à règle; 30 par cellule LLM (dossier P7) | Écart-type de l'arriéré; changements de tâche par agent; fraction active comparée à δ/α. La diversité inter-agents est séparée de l'échantillonnage (`temperature` non réglable sur les modèles récents, cadre n° 16). L'opérationnalisation de l'oscillation est fixée dans le plan de recherche ([03-plan-de-recherche.md](../docs/03-plan-de-recherche.md)) |

## 7. Parallèle agentique

Les énoncés ci-dessous sont des **relations**, chacune avec un statut épistémique de transposition.

| # | Relation observée ou modélisée | Relation agentique proposée | Appui | Statut de la transposition |
|---|---|---|---|---|
| 1 | Plus le travail non traité d'un type est grand, plus un individu libre s'y engage; le travail accompli réduit le stimulus. | Un arriéré partagé par type de tâche; les agents libres tirent le travail avec une probabilité croissante de l'arriéré, sans affectation. Régime : auto-organisation stigmergique (état partagé persistant). | [Campos et al. 2000] [R] (ordonnancement de camions, hors LLM); [Krieger et al. 2000] [R] (robots, gains décroissants); [Yang et al. 2025] [R] (LLM sans orchestrateur central, résumé). Contre-exemple : [Han et Zhang 2025] (une unité de contrôle choisit les agents : sélecteur central sur état partagé, plus proche de l'orchestration) | Analogie; faisabilité appuyée hors LLM |
| 2 | La fraction active à l'équilibre vaut δ/α, quelle que soit la composition. | Le taux d'utilisation d'un pool d'agents vaut le rapport entre taux d'arrivée du travail et capacité de traitement. | Dérivation [I] vérifiée par simulation; lien avec la loi de Little déjà appliquée à ce contexte (cadre, correction n° 6), traité par P4 | Modèle simplifié (dans le modèle); Analogie (transposition) |
| 3 | Des seuils étagés répondent graduellement à une variation commune; des seuils identiques répondent ensemble, d'où une oscillation si le gain de boucle est élevé et la lecture synchrone (H3.5). | Des déclencheurs étagés (prompts, rôles, modèles) amortissent la réponse de la population à un arriéré partagé; des déclencheurs identiques répondent au même tour. | Indirect : [Wu et al. 2020] [T] (non LLM); [Kim et al. 2025], [Kleinberg et Raghavan 2021], [Wu et al. 2024b] [R]. Contre-preuves : [Lynch et al. 2024], [Garrison et al. 2018], [Ulrich et al. 2021] | **Hypothèse de l'auteur** (H3.9) |
| 4 | L'expérience abaisse le seuil de la tâche exercée et relève les autres; l'oubli relève le seuil. | Une mémoire d'expérience qui spécialise l'agent; oubli = décroissance ou durée de vie (TTL) de la mémoire. | [Yang et al. 2025] [R] (résumé seulement) | Analogie |
| 5 | Après un retrait assez long, les remplaçants gardent la tâche (hystérésis). | Verrouillage de rôle : un agent spécialisé ne rend pas sa place au retour du titulaire. | [Wu et al. 2020] cite [Theraulaz et al. 1998] et [Kazakova et Wu 2018] [non vérifiée] [S] | Analogie |
| 6 | Une fraction d'inactives remplace les actives retirées; les inactives retirées ne sont pas remplacées. | Capacité de réserve (agents en veille) : coût contre latence de réaffectation. | [Charbonneau et Dornhaus 2015a] [R] (« tout système distribué »); [Charbonneau et al. 2017] [T] | Analogie à appui direct des auteurs |
| 7 | La probabilité d'abandon p fixe la durée d'engagement 1/p; la fatigue limite la persistance. | Délai d'expiration, nombre maximal de tours, préemption; quotas, limites de débit, temps de recharge. | [Theraulaz et al. 1998] (définition de p); [Hasegawa et al. 2016] (fatigue) | Analogie [I] |
| 8 | Les butineuses retardent la maturation des plus jeunes (inhibition sociale); sans elles, maturation précoce. | Promotion à un rôle freinée tant que ce rôle est assez peuplé; promotion prématurée sous charge. | [Beshers et al. 2001] [R] (équations non lues); audit bio-abeilles (maturation précoce) | Analogie [I] |
| 9 | Les tâches d'un même âge sont co-localisées dans le nid. | Localité des données et des files de travail pour réduire le coût de recherche de travail. | [Seeley 1982] [R] | Analogie [I] |

Modes d'échec : [Cemri et al. 2025] recense 14 modes en trois catégories pour les systèmes multi-agents LLM (rôles dupliqués ou abandonnés, désalignement); la correspondance fine avec les modes d'échec de la division du travail n'est pas faite et revient à P6.

**Où l'analogie casse.**
- **Le seuil n'est pas une propriété stable d'un agent LLM** : sa décision dépend du prompt et du contexte, et les exécutions varient même à réglages identiques ([Atil et al. 2024]; dérive : [Chen et al. 2024b]) [I]. Chez le bourdon, le seuil individuel mesuré seul ne prédit déjà pas la réponse en groupe ([Garrison et al. 2018]).
- **La diversité des insectes est héritée ou développementale** (génétique, morphologique, âge), donc stable pendant l'exécution; la diversité de prompts n'est pas une diversité d'erreurs, qui restent fortement corrélées entre modèles ([Kim et al. 2025]) [I]. L'avantage observé dans [Hong et Page 2004] n'établit pas un effet causal de la diversité ([Thompson 2014]; [Grim et al. 2019]; [Romaniega 2023]).
- **La dynamique diffère** : biologie continue et asynchrone; agents en tours avec lecture simultanée du même arriéré, c'est-à-dire le régime où le gain de boucle compte (H3.5) [I].
- **Les coûts diffèrent** : un changement de tâche coûte du temps à l'insecte, du contexte et des jetons à l'agent; un agent en veille ne coûte rien tant qu'il n'est pas appelé, alors que l'inactivité d'une colonie est un coût de maintenance [I].
- **Sélection contre conception** : le chorégraphe de la colonie est la sélection naturelle, celui du système d'agents est le concepteur du prompt et des protocoles (cadre, §2.2); δ, α et p y sont choisis, non sélectionnés [I].
- **Sans analogue** : la mort de la colonie au premier pas sans traitement ([Hasegawa et al. 2016]), la polyandrie [I].

**TÉMOIN ORCHESTRÉ.** Régime : orchestration (A1 plan global explicite et A2 contrôle central à l'exécution, cadre §2.2), face à l'auto-organisation stigmergique des seuils (A1 non, A2 non, état partagé persistant). Version à règle (P3, E3.8) : à chaque pas, un orchestrateur lit le vecteur complet des stimuli et affecte les agents aux tâches pour minimiser l'écart à la consigne; variantes à observation retardée de d pas ou bruitée; coût compté en lectures et en affectations. Version LLM (P7) : un LLM orchestrateur lit l'arriéré et assigne les tâches aux travailleurs à chaque tour, à budget égal. [Han et Zhang 2025] peut servir d'architecture de comparaison (orchestration sur état partagé). Références sans orchestrateur : la colonie à règles (seuils) et les agents indépendants sans canal (cadre, §4), plus un choix aléatoire comme modèle nul ([Lynch et al. 2024]); l'agent unique à budget égal est défini dans P7.

**Structure de tâche : décomposable.** P3 pose m types de tâches indépendants, chacun avec sa demande; aucune tâche ne dépend d'une autre. La variante séquentielle (tâche aval conditionnée par une tâche amont; file d'appariement butineuses–receveuses) relève de P4. S3 est le cas le plus favorable à l'orchestration : un résultat de P3 ne s'étend pas aux tâches séquentielles [I].

**Lien avec P7** ([P7-synthese-agentique.md](P7-synthese-agentique.md)).
- P3 livre à P7 le scénario S3 : spécification de l'environnement (E3.9), politique à seuils de référence (T3.1 et T3.2 reproduits), témoin orchestré à règle (E3.8) et métriques : écart-type de l'arriéré, changements de tâche par agent, fraction active comparée à δ/α, temps de récupération après retrait d'une caste (E3.1).
- Correspondance de vocabulaire à harmoniser [I] : l'arriéré de P7 est le stimulus s_j de P3; la « consigne » du score de S3 (écart du stimulus à la consigne) doit être définie une fois, dans le plan de recherche, pour les deux projets.
- H3.9 est testée par P7; P3 en fournit les prédictions à règle, le mécanisme (gain de boucle, lecture synchrone) et les contre-scénarios.
- P7 dépend de résultats reproduits de P3 (cadre, §5), ici T3.1 à T3.6 [I]. Identifiants de modèles LLM, tarifs et réglages se revérifient avant toute exécution (cadre, correction n° 16; retrait possible de Haiku 4.5 dès le 2026-10-15).

## 8. Visuels et trois niveaux

**Les dix visuels du dossier**, rattachés à un niveau. Chaque graphe porte son statut épistémique à l'écran (principe 7 du cadre) et son public principal est déclaré par page (praticiens de l'agentique pour le visuel 10, étudiants et grand public pour les autres, à confirmer dans [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)).

| # | Visuel | Niveau | Ce qui est montré | Statut affiché |
|---|---|---|---|---|
| 1 | La baignoire de travail | Voir | Stimulus = niveau d'eau qui monte au débit δ; chaque active est un drain α/N; le niveau se stabilise quand un tiers travaille | Modèle simplifié (T3.1) |
| 2 | Deux sigmoïdes, une colonie | Voir | Courbes T_θ(s) des minors et des majors, point mobile à s*; on fait glisser f et s* franchit le seuil des majors | Modèle simplifié |
| 3 | L'expérience de Wilson rejouée | Explorer | Curseur du ratio minors:majors; histogramme de l'activité par major; bande grise ×15–30 (valeur publiée) et courbe de champ moyen sur les points simulés | Bande : valeur publiée. Courbe : calibration, non reproduction (R1) |
| 4 | Naissance des spécialistes | Voir (récit), Explorer (curseurs) | Fig. 1a–b : trajectoires de θ, puis carte de chaleur individus × tâches | Résultat reproduit (T3.3), après la porte |
| 5 | Carte des régimes | Explorer | Plan (φ, p) coloré (tous spécialistes / différenciés / aucun), frontières publiées 0,4, 2, 0,04 et 0,42 en pointillé | Résultat reproduit (T3.4, T3.5) |
| 6 | Retirer puis rendre | Explorer | Chronologie avec curseur T_r; courbes N_n et N_f; la colonie ne revient pas à l'état d'avant (hystérésis) | Résultat reproduit (T3.6) |
| 7 | Deux ruches, un thermomètre | Voir | Écran partagé, 1 patriligne contre 15, abeilles colorées par patriligne, trace de température avec la bande 33–36 °C | Modèle simplifié (reconstruction [I]) tant que T3.11 n'est pas figée |
| 8 | Le tapis roulant de l'âge | Explorer | La vie d'une ouvrière en quatre stations; bouton « retirer les butineuses » | Hypothèse du modèle (R5); [Huang et Robinson 1992] décrit des transplants, pas un retrait |
| 9 | Les paresseuses de réserve | Explorer | Retirer les 20 % les plus actives ou les plus inactives, voir qui comble le vide | Résultat reproduit (T3.7); normalisation : Modèle simplifié |
| 10 | Panneau agentique | Explorer | Tableau de tâches avec arriéré par type; agents homogènes contre diversifiés; changements de tâche et oscillation de l'arriéré; témoin orchestré | Modèle simplifié (règle). Aucune donnée LLM : H3.9 est affichée comme hypothèse |

| | **Voir** (récit guidé, avec prédiction) | **Explorer** (bac à sable étayé) | **Vérifier** (reproduction, distribution, code, limites) |
|---|---|---|---|
| **Montré et manipulé** | Visuels 1, 2, 4, 7. Un curseur par scène; prédiction avant révélation (« si l'on retire les petites ouvrières, qui prend le relais? ») | Visuels 3, 5, 6, 8, 9, 10. Curseurs : ratio minors:majors, θ_maj/θ_min, φ, p, T_r, retrait de butineuses, type de retrait, composition des agents | Une page par cible T3.1 à T3.14 : figure cible numérisée superposée, distribution sur N graines, IC et marge (relationnelle ou TOST), registre des déviations, code et manifeste de run, encart « ce qui n'est pas reproduit » |
| **Vue de l'agent** | Une ouvrière suivie en annotation fixe (état, seuil, stimulus, probabilité de s'engager); pas d'inspection libre, rythme imposé | Clic sur un agent : θ_i, stimulus courant, probabilité d'engagement, historique; abeille : h_i et rencontres; thermorégulation : seuil contre température | Journal d'un agent d'une exécution, en données; rejeu depuis le manifeste |
| **Modifier la règle** | Sans objet : le cadre réserve ce geste à Explorer | θ_maj/θ_min, p, φ et ξ, inhibition (oui, non), normalisation (proportionnelle, absolue), ordre de mise à jour (séquentiel, synchrone) et Δt, diversité entre individus et stochasticité individuelle (deux curseurs); retour à la règle publiée en un geste | Paramètres publiés figés; toute modification est marquée « hors reproduction » |
| **Objectifs d'apprentissage** | OL1 à OL3 | OL4 à OL6 | OL7, OL8 |
| **Accessibilité propre au projet** | La baignoire annonce le niveau et la fraction active en texte (région dynamique), sans dépendre de l'animation; mécanisme de pause | Curseurs au clavier avec valeur en texte; cartes de régimes et de chaleur en viridis ou cividis avec tableau équivalent; N = 1000 agents : l'identité (caste, patriligne) n'est jamais portée par la couleur seule (forme et texture; couleurs d'espèce de la charte, fourmi #D55E00, abeille #0072B2, agent #CC79A7, doublées de pictogrammes); l'oscillation se montre en courbe, jamais par clignotement | Tableau de données équivalent à chaque distribution; IC et marges énoncés en texte; code et manifeste téléchargeables; liste manuelle obligatoire (l'automatisation couvre environ 57 % des problèmes, [Deque 2021], étude de fournisseur) |
| **Erreurs de compréhension à prévenir** | Inverser Wilson (les majors, non les petites, prennent le relais); croire qu'une reine répartit les tâches (attribution causale à un agent de contrôle, [Chi et al. 2012]; encart « Ce que fait vraiment la reine » : elle ne répartit pas le travail dans ces modèles, elle régule la reproduction); caste = rôle fixe à vie; « la colonie décide » (téléologie) | Inactive = paresseuse (réserve adaptative); « la diversité stabilise toujours » (H3.4, H3.5; contre-preuves); lire une courbe calibrée comme une mesure; « une ruche homogène oscille » (le résumé dit « moins stable »); prendre le modèle générique de 1998 pour un modèle de fourmi | Confondre calibration, reconstruction et reproduction; confondre réplication et validation; lire une exécution unique comme un résultat; présenter H3.9 comme acquis |

**Objectifs d'apprentissage mesurables** (seuils de réussite, pré-test et post-test, condition témoin statique : [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)).
- **OL1.** Énoncer, avant le résultat, quelle caste prend le relais quand les minors sont retirées, et le justifier par la comparaison seuil et stimulus.
- **OL2.** Expliquer pourquoi la fraction active converge vers δ/α sans coordinateur, en nommant ce qui la fixe.
- **OL3.** Distinguer la spécialisation par caste (seuils différents d'emblée) de la spécialisation émergente (individus identiques).
- **OL4.** Prédire, d'après la carte des régimes, l'effet d'une variation de φ ou de p.
- **OL5.** Décrire l'hystérésis : pourquoi la colonie ne retrouve pas son état antérieur après un retrait assez long.
- **OL6.** Distinguer inactivité de réserve et paresse; dire quand la diversité des seuils stabilise et quand elle ne change rien.
- **OL7.** Lire une distribution sur N graines et juger si un critère relationnel ou d'équivalence est satisfait.
- **OL8.** Reconnaître, sur une page de vérification, ce qui est calibré, reconstruit ou reproduit.

## 9. Plan de simulation

**Trois couches** (cadre, §7).
1. **Noyau commun** (S0, [S0-socle.md](S0-socle.md)) : PRNG à graine (un flux par exécution, même graine, même sortie), horloge à pas fixe (Δt = 1; essais à Δt = 0,1), enregistreur, manifeste de run, scénario. RK4 pour les EDO déterministes (éq. 5–7 sans bruit, trajectoires de champ moyen), le point fixe du champ moyen se résolvant par bissection; Euler–Maruyama pour les éq. 5–7 bruitées (RK4 est inadapté au bruit [I]); l'algorithme de Gillespie n'est pas requis.
2. **Modèles de référence**, un par article, chacun validé contre sa figure ou son tableau : `pheidole-seuils-fixes`, `generique-theraulaz98`, `temnothorax-reserve`, `myrmica-fatigue`, `ffw-cas-particulier`, `apis-age-inhibition`, `apis-thermoregulation`, `bombus-garrison`; l'orchestrateur à règle est un module distinct.
3. **Modèle chorégraphique commun** : médium = état partagé persistant (arriéré ou stimulus par type de tâche; température du nid), soit l'auto-organisation stigmergique (A1 non, A2 non, A3 état partagé persistant); l'inhibition par contact des abeilles est un signal direct local [I]. Canal interchangeable : persistance (nulle dans les modèles publiés, le stimulus ne baisse que par le travail), portée (lecture globale ou locale), adressage (aucun), format (scalaire par tâche; tuple ou texte plafonné pour P7). Témoin : orchestration (A2 oui).

| Cible ou expérience | N | Pas et horizon | Graines | Origine |
|---|---|---|---|---|
| T3.1 | 1000 | Δt = 1; 2·10⁴ pas; moyenne sur la 2ᵉ moitié | 10 | Dossier |
| T3.2, E3.1 | 1000 | Idem | 20 | Dossier |
| T3.3 | 5 | 0–3000 | 100 | Publié (N, durée); dossier |
| T3.4, T3.5 | 100 | Jusqu'à convergence ou horizon [à confirmer] | 10 par point | Publié (N); dossier |
| T3.6 | 100 | T_r par pas de 100; horizon [à confirmer] | 20 | Publié (N); dossier |
| T3.7, E3.2 | ≈ 65 | Horizon [à confirmer], deux échéances de rapport 1:2 | 30 | Publié (moyenne 65,35); dossier |
| T3.8, E3.3 | 75, grille 50×50 | 1000 pas | 30 essais | Publié; dossier |
| T3.9 à T3.13, E3.6, E3.7 | [à confirmer] | Pas d'un jour pour l'âge [à confirmer] | 20 à 30 | Dossier |
| T3.14 | [à confirmer] | [à confirmer] | [à confirmer] | — |
| E3.4, E3.5 | 1000 | 2·10⁴ pas (Δt = 1) | 100; 20 [à confirmer] | Propositions |
| E3.8, E3.9 | [à confirmer] | [à confirmer] | 1 000 (règle); 30 (LLM) | Dossier P7 |

**Budgets de performance.** Mesure de rédaction [I, à confirmer sur la machine cible] : le script de contrôle exécute 21 simulations (N = 1000, 2·10⁴ pas) en 6,6 s sous Node 24, soit environ 0,3 s par exécution. D'où E3.4 (32 cellules × 100 graines) ≈ 16 min et E3.5 (Δt = 0,1 multiplie le coût par dix) ≈ 1 h [estimation, à confirmer]. Côté navigateur : cible de 30 images/s à N = 1000 sur un portable ordinaire [à confirmer par mesure]; WASM seulement si la mesure l'exige (cadre, §7).

**Docking** (le modèle commun est validé contre chaque modèle de référence; trois niveaux d'équivalence, [Axtell et al. 1996]).

| Docking | Référence | Niveau | Critère |
|---|---|---|---|
| Commun (seuils fixes) ↔ `pheidole-seuils-fixes` | T3.1, T3.2 | Identité, puis relationnel | Champ moyen ↔ simulation : abs(ā − δ/α) ≤ 0,01; valeurs de contrôle de 4.1 |
| Commun (seuils renforcés) ↔ `generique-theraulaz98` | T3.3 à T3.6 | Relationnel | Règles de T3.3 à T3.6 |
| Commun (fatigue) ↔ `myrmica-fatigue` | T3.8 | Relationnel | Règles de T3.8 |

Le modèle à seuils fixes est implanté **deux fois**, indépendamment : dans le moteur TypeScript et dans le script de contrôle existant, que l'on étend. Un écart entre les deux est une erreur de code jusqu'à preuve du contraire.

**Perturbations standard** (cadre, §4) : retrait de 30 % des agents; changement d'environnement (saut de demande). **Sorties** (formats dans [05-spec-simulation.md](../docs/05-spec-simulation.md)) : manifeste de run; séries s_j(t), x_ij(t), θ_ij(t), N_act(t), T_couvain(t); états individuels à intervalle fixe; métriques de synthèse par exécution; données de figure; distributions par graine pour chaque T et chaque E; journal de déviations.

## 10. Livrables et critères d'achèvement

| # | Livrable | Critère d'achèvement vérifiable | Contrôle |
|---|---|---|---|
| 1 | **Lectures manquantes** : texte de [Bonabeau et al. 1996] et de [Wilson 1984]; [Jones et al. 2004] (avec matériel supplémentaire), [Graham et al. 2006], [Beshers et al. 2001], [Tofts 1993] | Chaque source lue; R1, R4 et R5 clos ou maintenus avec justification; T3.2 et T3.10 à T3.12 reclassées (calibré, reproduit ou non figé) | Tableau des risques de la note de recherche |
| 2 | **Fiches de reproduction** T3.1 à T3.14, écrites avant le code (cadre, principe 2) | Une fiche par cible : équations, paramètres, unités, protocole, figure cible numérisée, critère chiffré, porte go/no-go | `git log` : le commit de la fiche précède le premier commit du modèle correspondant |
| 3 | **Code** : moteur headless Node, couche navigateur, huit préréglages (§9), orchestrateur à règle | `tsc --noEmit` sans erreur; Node exécute le `.ts` directement; un manifeste de run est émis par exécution | Commande `tsc --noEmit`; exécution d'un scénario par préréglage |
| 4 | **Tests** (chacun doit échouer si l'on casse la logique visée) | (a) identité de T3.1; (b) invariance d'échelle (θ → kθ donne s* → ks*); (c) champ moyen ↔ simulation aux quatre valeurs de contrôle de 4.1; (d) même graine, même sortie; (e) T3.3 à T3.6 à Δt = 1 et Δt = 0,1; (f) écrêtage et non gel aux bornes de l'éq. 4 (la baisse de θ de la Fig. 3 reste possible); (g) concordance de la seconde implémentation des seuils fixes; (h) critère de stabilité de H3.5 contre les valeurs propres du système linéarisé; (i) engagements par agent égaux à p·δ/α (H3.4) | Suite de tests verte; une mutation volontaire d'un paramètre la fait échouer |
| 5 | **Données** | Manifestes et distributions par graine pour chaque T et chaque E | Rejeu d'un échantillon tiré au hasard : sorties identiques |
| 6 | **Préenregistrement** de H3.1 à H3.4 | Hypothèses, marges, n, règle de décision, famille de correction, horodatage antérieur au premier run confirmatoire ([Chambers 2013]; [Chambers et Tzavella 2022]; [Nosek et al. 2018]) | Date du préenregistrement contre date des premiers runs confirmatoires |
| 7 | **Registre des déviations** ([Lakens 2024]) | Toute déviation : date, motif, effet sur l'analyse | Relecture du registre contre `git log` |
| 8 | **Note de recherche** (académique) | Un verdict par cible (go, calibré, no-go) et par expérience; limites; statut épistémique de chaque énoncé; destination envisagée : [ALIFE 2027] (Prague, 19–23 juillet 2027; échéances non publiées selon le dossier [x-methodes.md](../recherche/dossiers/x-methodes.md)) | `node outils/verifier-docs.ts` sans erreur; toute valeur chiffrée citée ou marquée [à confirmer] |
| 9 | **Pages** Voir, Explorer, Vérifier : dix visuels et quatorze pages de vérification | Statut épistémique visible sur chaque graphe; public principal déclaré; fonctionne sans animation | Liste d'accessibilité manuelle cochée et vérification automatisée sans violation |
| 10 | **Évaluation** des objectifs OL1 à OL8 | Pré-test, post-test et condition témoin statique, selon [07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md); cadre éthique selon [08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md) | Protocole et résultats archivés |
| 11 | **Banc S3 pour P7** | Spécification versionnée; politique à seuils et orchestrateur à règle réutilisables sans modification | P7 retrouve les valeurs de contrôle de T3.1 avec la même politique |
| 12 | **Science ouverte** | Code, données, manifestes et fichier de citation publiés | Selon [08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md) |

## 11. Risques et réserves

| R | Réserve | Conséquence | Plan B et porte |
|---|---|---|---|
| **R1** | [Bonabeau et al. 1996] **non lu** (métadonnées seules; résumé masqué par l'éditeur, texte inaccessible) : θ_min, θ_maj, N, α, δ, p, durée, figures et méthode d'ajustement inconnus | T3.2 reste une calibration (θ_maj/θ_min ≈ 6–10 [à confirmer]) | Obtenir le texte (accès institutionnel ou demande aux auteurs). Sans lui, T3.2 est étiquetée « calibré », jamais « reproduit » |
| **R2** | [Wilson 1984] lu au résumé [R]; certaines citations (dont « 75 % ou plus ») extraites par un outil de lecture à petit modèle puis recoupées. Ratio atteint, effectifs et mesure de l'« activité » non lus. La part restaurée ≥ 75 % est satisfaite par construction | Critère non discriminant; risque de surestimer l'accord | Lire le texte intégral; présenter cette part comme cohérente, non confirmante; fonder la lecture sur le facteur d'activité |
| **R3** | [Theraulaz et al. 1998] : Δt non donné; gel aux bornes de l'éq. 4 incompatible avec la Fig. 3; bornes 3000 et 4500 de T3.6 lues sur le graphique | Les seuils numériques de T3.3 à T3.6 peuvent dépendre de choix d'implantation | Essais Δt = 1 et 0,1; écrêtage; si les transitions bougent, critère sur la forme; registre des déviations |
| **R4** | [Jones et al. 2004] et [Graham et al. 2006] : texte, matériel supplémentaire, équations, nombre de colonies et statistiques non lus. L'audit signale une étude (Simone-Finstrom et al. 2014, absente de la bibliographie) qui ne trouve pas la diversité attendue prédictive de la stabilité | T3.11 et T3.12 non figées; le modèle 4.5 est une reconstruction | Lire *Science* (matériel supplémentaire) et *Insectes Sociaux* 53:226–232; en attendant, critères relationnels; ne jamais écrire que la ruche homogène « oscille » |
| **R5** | [Beshers et al. 2001] et [Tofts 1993] : équations non lues; paradigme « retrait des butineuses → butinage précoce » non sourcé; seuil de 7 j [à confirmer] | T3.9 et T3.10 relationnelles; FFW = cas particulier | Lire *J. Theor. Biol.* 213:461–479 et *Bull. Math. Biol.* 55:891–918; sinon variante « transplant » ([Huang et Robinson 1992]) et E3.6 exploratoire |
| **R6** | Calibration θ_maj/θ_min ≈ 6–10 : valeur de l'auteur du dossier [à confirmer] | Dépend de R1 | Paramètre libre étiqueté, avec analyse de sensibilité |
| **R7** | Normalisation de la demande non tranchée; numéros de figures de [Charbonneau et al. 2017] [à confirmer] | Si aucune normalisation ne reproduit T3.7 : no-go | Ajouter efficacité individuelle variable et demande larvaire (à la manière de [Ulrich et al. 2021]); consigner au registre |
| **R8** | Oscillation : dépend de l'ordre de mise à jour et du pas (régime discret synchrone), cf. [Caron-Lormier et al. 2008] sur la mise à jour synchrone ou asynchrone. L'effet de H3.5 a été entrevu avant le préenregistrement | H3.5 reste exploratoire; une réplication préenregistrée ne vaut pas une prédiction indépendante | Écrire la frontière prédite avant la grille (E3.5); rapporter les deux ordres; dire « essai de rédaction » dans la note |
| **R9** | Contre-preuves : [Garrison et al. 2018], [Lynch et al. 2024] (prépublication), [Ulrich et al. 2021], [Duarte et al. 2012] : les seuils fixes individuels peuvent être une mauvaise description | T3.14 ; réponse nuancée à QR4 | Intégrer inhibition sociale et efficacité variable; un échec n'invalide pas P3, il change l'énoncé de QR4 |
| **R10** | Parité : fourmi lue en texte, abeille au résumé; la réserve d'au moins 50 % d'inactives chez l'abeille vient de l'audit (citant [Seeley et al. 1996]), non lue | Asymétrie de force des cibles | Cibles abeille relationnelles; lecture avant promotion; asymétrie dite dans la note |
| **R11** | Références non vérifiées ou prépublications : [Bonabeau et al. 1997] et [Kazakova et Wu 2018] (citées par intermédiaire, [non vérifiée]); [Lynch et al. 2024] et [Fokoué et al. 2026] (prépublications); pages de [Wu et al. 2020] non trouvées; [Han et Zhang 2025] retenu comme contre-exemple seulement | Aucune valeur issue de ces sources sans [à confirmer] | Vérification avant la note de recherche |
| **R12** | Agents LLM : aucune étude lue ne mesure l'oscillation d'agents identiques en allocation de tâches; paramètres (`temperature` non réglable, modèles, retrait possible de Haiku 4.5 dès le 2026-10-15) à revérifier | H3.9 non testée en P3 | Test confirmatoire dans P7; mesurer le gain effectif, pas seulement l'homogénéité |
| **R13** | Échelle de temps : Wilson observe le changement en moins d'une heure; aucune correspondance pas ↔ minutes n'a été lue; jours côté abeille | Aucune conversion de durée possible | Mesurer p réel (durée moyenne d'un acte); sinon rapporter en pas de simulation, jamais en minutes |
| **R14** | Références présentes seulement dans l'audit bio-abeilles : [Leoncini et al. 2004], [Khoury et al. 2011] et [Perry et al. 2015] ont été ajoutées à la bibliographie à la validation finale (métadonnées vérifiées, texte non lu); Simone-Finstrom et al. 2014, Kleinhenz et al. 2003, Mattila et Seeley 2007 et Seeley et Kolmes 1991 restent absentes | Aucune étiquette ne peut être citée | Les ajouter à la bibliographie après vérification avant d'en tirer une valeur |

## 12. Effort et dépendances

**Estimation en semaines-personne [estimation, à confirmer]** (une personne, code et visuels compris; hors délais d'accès aux articles) :

| Lot | Contenu | Semaines-personne |
|---|---|---|
| L0 | Lecture des six sources manquantes; fiches de reproduction T3.1 à T3.14 | 2,5 |
| L1 | Seuils fixes et renforcés (T3.1 à T3.6), tests, docking, seconde implémentation | 3 |
| L2 | Réserve, FFW, fatigue, bourdon (T3.7, T3.8, T3.14) | 2 |
| L3 | Abeille : âge et inhibition, thermorégulation (T3.9 à T3.13) | 3 |
| L4 | Expériences E3.1 à E3.8, préenregistrement, analyse | 3 |
| L5 | Banc S3 et contrat avec P7 (E3.9) | 1 |
| L6 | Dix visuels, trois niveaux, accessibilité | 3,5 |
| L7 | Évaluation pédagogique (avec V0) | 1,5 |
| L8 | Note de recherche, registre des déviations | 1,5 |
| | **Total** | **21** |

**Prérequis.**
- **S0** ([S0-socle.md](S0-socle.md)) : noyau (PRNG, horloge, enregistreur, manifeste), harnais de reproduction. Sans lui, aucun code ne démarre.
- **V0** : gabarit et charte avant les visuels ([07-vulgarisation-evaluation.md](../docs/07-vulgarisation-evaluation.md)).
- **Documents transversaux** : [04-protocole-reproduction.md](../docs/04-protocole-reproduction.md) (niveaux d'acceptation, déviations), [05-spec-simulation.md](../docs/05-spec-simulation.md) (formats), [06-metriques-et-typologie.md](../docs/06-metriques-et-typologie.md) (métriques, typologie à trois axes), [08-science-ouverte-ethique.md](../docs/08-science-ouverte-ethique.md).
- **Accès** aux six articles (accès institutionnel ou demande aux auteurs).
- **Phase.** Le cadre place P3 en phase 2, après P1, P8 et P5. L0 (lecture et fiches) ne dépend de rien et peut commencer dès la phase 0; L1 ne dépend que de S0 [I]; arbitrage de calendrier dans [09-feuille-de-route.md](../docs/09-feuille-de-route.md).

**Dépendances sortantes.** P7 (scénario S3, politique et témoin orchestré : [P7-synthese-agentique.md](P7-synthese-agentique.md)); P6 (maturation précoce, verrouillage de rôle, oscillation : [P6-defaillances-et-defenses.md](P6-defaillances-et-defenses.md)); P4 (fraction active δ/α comme taux d'utilisation : [P4-regulation-sans-vue-densemble.md](P4-regulation-sans-vue-densemble.md)).

**Ordre des tâches.** L0 → L1 (porte T3.1 puis T3.2) → L2 en parallèle de la lecture pour L3 → L3 → L4 (préenregistrement de H3.1 à H3.4 avant les premiers runs confirmatoires) → L5 → L6 et L7 → L8. L'ordre d'exécution des expériences suit celui des portes de leurs modèles; la frontière de H3.5 est écrite avant la grille de E3.5.

## 13. Références clés

Statut = statut de la bibliographie ([11-bibliographie.md](../docs/11-bibliographie.md)); lecture = légende du dossier. Les noms de la colonne « Étiquette » sont les étiquettes de citation.

| Étiquette | Statut | Lecture | Usage dans P3 |
|---|---|---|---|
| Wilson 1984 | vérifiée | [R] | Cible T3.2, correction de v3 |
| Bonabeau et al. 1996 | **non vérifiée** | [M] | Modèle à seuils fixes (contenu non lu, R1) |
| Bonabeau et al. 1997 | **non vérifiée** | [S] | Citée par Fontanari et al. 2024 |
| Bonabeau et al. 1998b | corrigée | [R] | Seuils fixes; FFW pas assez robuste pour un polyéthisme fort |
| Theraulaz et al. 1998 | vérifiée | [T] | Modèle 4.2, T3.3 à T3.6, éq. 1 attribuée à 1996 |
| Fontanari et al. 2024 | corrigée | [T] partiel | Dynamique du stimulus (éq. 3); règle erf |
| Ulrich et al. 2021 | vérifiée | [T] partiel | Généralisation (éq. 1–2); borne et contre-preuve |
| Kang et Theraulaz 2016 | corrigée | [T] (préimpression) | Âges de Seeley 1982 [S] |
| Gautrais et al. 2002 | vérifiée | [R] | Taille critique (hors périmètre) |
| Jeanson et al. 2007 | vérifiée | [R] | Division du travail et taille du groupe (hors périmètre) |
| Beshers et Fewell 2001 | vérifiée | [R] | Revue des modèles |
| Duarte et al. 2011 | vérifiée | [R] | Revue de la division du travail auto-organisée |
| Duarte et al. 2012 | corrigée | [R] | Contre-preuve (polyandrie freine la spécialisation) |
| Tofts et Franks 1992 | vérifiée | [R] | FFW |
| Tofts 1993 | vérifiée | [M] | FFW (équations non lues, R5) |
| Franks et Tofts 1994 | vérifiée | [M] | FFW |
| Charbonneau et Dornhaus 2015a | vérifiée | [R] | Réserve; généralisation à « tout système distribué » |
| Charbonneau et Dornhaus 2015b | vérifiée | [R] | Inactivité individuellement constante (H3.3) |
| Charbonneau et al. 2015 | vérifiée | [R] | Budgets-temps laboratoire et terrain |
| Charbonneau et al. 2017 | vérifiée | [T] | T3.7, H3.2 (figures [à confirmer]) |
| Hasegawa et al. 2016 | vérifiée | [T] | T3.8, modèle de fatigue |
| Seeley 1982 | vérifiée | [R] | T3.9 |
| Robinson 1992 | vérifiée | [M] | Régulation de la division du travail (métadonnées seules) |
| Huang et Robinson 1992 | corrigée | [R] | T3.10 (transplants, non retrait) |
| Beshers et al. 2001 | vérifiée | [R] | Inhibition sociale (équations non lues, R5) |
| Seeley et al. 1996 | corrigée | audit seulement | Réserve d'inactives chez l'abeille (R10) |
| Jones et al. 2004 | vérifiée | [R] | T3.11 (R4) |
| Graham et al. 2006 | vérifiée | [R] | T3.11, T3.12 (R4) |
| Myerscough et Oldroyd 2004 | vérifiée | [R] | T3.13 |
| Jones et al. 2007 | vérifiée | [R] | T3.12 |
| Oldroyd et Fewell 2007 | vérifiée | [R] | Deux lectures de la diversité génétique |
| Stabentheiner et al. 2010 | vérifiée | [R] | Couvain entre 33 et 36 °C |
| Peters et al. 2019 | vérifiée | [R] | Extension hors noyau |
| Garrison et al. 2018 | vérifiée | [T] | T3.14, contre-preuve |
| Lynch et al. 2024 | corrigée | [R], prépublication | Contre-preuve; modèle nul de choix aléatoire |
| Campos et al. 2000 | vérifiée | [R] | Appui hors LLM |
| Krieger et al. 2000 | vérifiée | [R] | Appui hors LLM |
| Yang et al. 2025 | vérifiée | [R] | Appui LLM sans orchestrateur (résumé) |
| Han et Zhang 2025 | corrigée | [R], texte lu à la vérification | Contre-exemple (sélecteur central) |
| Wu et al. 2020 | corrigée | [T] | Seuils constants et changements de tâche (non LLM) |
| Kazakova et Wu 2018 | **non vérifiée** | [S] | Réadaptation difficile (verrouillage) |
| Kim et al. 2025 | corrigée | [R] | Erreurs corrélées |
| Kleinberg et Raghavan 2021 | vérifiée | [R] | Monoculture algorithmique |
| Wu et al. 2024b | vérifiée | [R] | Monoculture générative |
| Fokoué et al. 2026 | vérifiée | [R], prépublication | Isomorphisme colonies et ensembles |
| Cemri et al. 2025 | corrigée | [R] | Modes d'échec des systèmes multi-agents (P6) |
| Hong et Page 2004 | corrigée | [T] (dossier P8) | Garde-fou : ne prouve pas « diversité > capacité » |
| Thompson 2014 | vérifiée | [T] (dossier P8) | Critique de Hong et Page |
| Grim et al. 2019 | vérifiée | [R] (dossier P8) | Critique de Hong et Page |
| Romaniega 2023 | vérifiée | [R] (dossier P8) | Critique de Hong et Page |
| Atil et al. 2024 | vérifiée | [R] (dossier P7) | Non-déterminisme des réglages « déterministes » |
| Chen et al. 2024b | vérifiée | [R] (dossier P7) | Dérive du comportement des modèles |
| Caron-Lormier et al. 2008 | corrigée | méthode | Mise à jour synchrone ou asynchrone (R8) |
| Axtell et al. 1996 | vérifiée | méthode | Niveaux d'équivalence, docking |
| Benjamini et Hochberg 1995 | vérifiée | méthode | Correction exploratoire |
| Chambers 2013 | vérifiée | méthode | Préenregistrement |
| Chambers et Tzavella 2022 | vérifiée | méthode | Préenregistrement |
| Nosek et al. 2018 | vérifiée | méthode | Préenregistrement |
| Lakens 2024 | vérifiée | méthode | Déviations |
| Chi et al. 2012 | vérifiée | [R] (dossier V0) | Attribution causale à un agent de contrôle |
| Deque 2021 | vérifiée | [R] (dossier V0), étude de fournisseur | Couverture de l'automatisation en accessibilité |
| ALIFE 2027 | vérifiée | [T] (dossier de méthodes) | Destination envisagée |

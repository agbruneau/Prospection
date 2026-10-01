# Protocole de reproduction et de rigueur statistique

**Statut :** protocole commun à S0 et à P1–P9. Subordonné à [`00-cadre.md`](00-cadre.md) (principes de rigueur 1 à 8) : en cas de conflit, le cadre prime, puis on corrige ce document.
**Date :** 2026-10-01. **Régime :** production (le chercheur agit sur ce document : chaque règle porte un critère vérifiable).
**Sources de valeurs :** [`x-methodes`](../recherche/dossiers/x-methodes.md) (méthodes, cibles X1 à X25), [audit méthodologie](annexes/audit/methodologie.md), [audit simulation-technique](annexes/audit/simulation-technique.md), [`p7-agents-llm`](../recherche/dossiers/p7-agents-llm.md), et les tables de cibles des autres dossiers de `../recherche/dossiers/` pour les exemples chiffrés.

## 1. Portée, conventions, prérequis

### 1.1 Portée

Le document s'applique à toute simulation du programme qui reproduit, aligne ou étend un résultat publié (S0, P1 à P9, y compris le volet agentique de P7). Il fixe les règles et les gabarits, pas les valeurs propres à un projet. L'évaluation pédagogique des supports (participants humains) est hors portée : voir `07-vulgarisation-evaluation.md`.

| Sujet | Où c'est fixé |
|---|---|
| Valeurs, cibles T\<projet\>.\<n\>, hypothèses H, expériences E d'un projet | fiche de projet dans `../projets/` (p. ex. `../projets/P5-decision-par-quorum.md`) |
| Questions de recherche, matrice de traçabilité, définitions finales de R et de G (dont P_max) | `03-plan-de-recherche.md` |
| Noyau de simulation, format de scénario, manifeste de run, journal LLM | `05-spec-simulation.md` |
| Métriques et typologie | `06-metriques-et-typologie.md` |
| Licences, DOI, plan de gestion des données, éthique | `08-science-ouverte-ethique.md` |
| Dates des portes, jalons, registre des risques | `09-feuille-de-route.md` |
| Termes et références | `10-glossaire.md`, `11-bibliographie.md` |

### 1.2 Marques

Reprises du dossier `x-methodes` : **[T]** texte intégral lu; **[T\*]** page HTML lue par extraction automatique, non recoupée au PDF; **[R]** résumé seulement; **[M]** métadonnées seulement; **[S]** source secondaire; **[I]** inférence ou calcul de l'auteur du dossier ou de ce document; **[à confirmer]** valeur non confirmée; **[non vérifiée]** référence non établie. Dans ce document, une étiquette `[Nom année]` renvoie à `11-bibliographie.md`; le niveau de lecture est précisé quand il est inférieur au texte intégral et que l'énoncé en dépend. Toute valeur numérique vient d'un dossier (nommé) ou porte [I] avec sa formule; les tolérances marquées « proposée » dans les dossiers restent des propositions jusqu'à leur confirmation dans la fiche.

Abréviations : **ES** erreur standard de Monte Carlo (§6.2); **TOST** deux tests unilatéraux (§5); **IC** intervalle de confiance; **δ** marge d'équivalence; **dt** pas de temps; **PRNG** générateur pseudo-aléatoire; **SSA** algorithme de simulation stochastique de Gillespie; **EDO** équations différentielles ordinaires; **ODD** protocole de description des modèles (§10); **ADEMP** plan d'étude de simulation (§9).

### 1.3 Prérequis

| Prérequis | Sert à | Contrôle d'achèvement |
|---|---|---|
| Noyau S0 : PRNG `xoshiro128**` avec SplitMix64, RK4, SSA, enregistreur, manifeste de run (cadre §7; spécification dans `05-spec-simulation.md`) | tout le reste | les cibles T0.n du noyau passent (§6.9) |
| Harnais de `05-spec-simulation.md` : `npm run verify` (`tsc --noEmit`, `node --test`, vérification des fiches et des cibles); Node exécute le `.ts` | vérifications de code, critères automatisés | la commande sort à 0 en intégration continue [audit simulation-technique, M13] |
| Script de contrôle numérique `../recherche/verifications-numeriques/x_methodes_checks.py` (Python, bibliothèque standard; sections `prng stats rk4 ssa order tost ntable mcse`) | recalcul indépendant des formules de ce document | aucune ligne `FAIL` (exécuté le 2026-10-01, toutes les sections : les valeurs de X1 à X7 et X12 à X19 citées dans ce document sont retrouvées) |
| Outil de numérisation de figures (p. ex. WebPlotDigitizer, cité par l'audit simulation-technique) et dossier `data/figures/` versionné ([05](05-spec-simulation.md), section 8.4) | champ 6 de la fiche | CSV avec SHA, calibration des axes, incertitude de lecture |
| Seconde implémentation indépendante (Python) pour les modèles du socle | docking, détection de bogues [Edmonds et Hales 2003] | écart entre implémentations < 3 ES de Monte Carlo (§12) |
| Compte OSF | préenregistrement (§11) [OSF 2026] | enregistrement horodaté en lecture seule |
| Accès aux textes intégraux | porte de lecture | chaque fiche déclare ce qui a été lu (champ 13) |
| P7 seulement : budget plafonné, clés d'API, contrôle de plateforme du jour (§13.3) | campagne LLM | liste de contrôle §13.3 signée avant le premier appel |

### 1.4 Ordre des opérations

| # | Opération | Produit | Porte (§7.2) |
|---|---|---|---|
| 1 | Rédiger et geler la fiche de reproduction (§3) | fiche gelée, marge et n calculés | lecture |
| 2 | Écrire le code et passer les vérifications de code (§6.9) | tests verts | code |
| 3 | Exécuter la réplication au niveau déclaré (§4 à §6) | décision par cible | réplication |
| 4 | Aligner le modèle chorégraphique commun (§12) | critère de docking | docking |
| 5 | Préenregistrer, puis exécuter les expériences E et les hypothèses H confirmatoires (§11) | résultats étiquetés | extension |
| 6 | Rédiger la note de recherche (§14) et passer la liste de contrôle (§15) | note + dépôt | — |

## 2. Réplication contre validation

Le cadre (principe 1) interdit de les confondre. Cinq opérations, cinq énoncés permis :

| Opération | Question | Comparé à | Énoncé permis | Énoncé interdit |
|---|---|---|---|---|
| Vérification de code | L'implantation calcule-t-elle ce qu'on croit? | identité mathématique, vecteur de test, ordre de convergence | « passe T0.n » | toute conclusion biologique |
| Réplication | Redonne-t-elle les résultats du modèle publié (sa figure, son tableau)? | résultats simulés publiés | *Résultat reproduit* (niveau déclaré) | « validé » |
| Docking | Deux modèles ou deux implantations donnent-ils les mêmes sorties? | un autre modèle | « aligné par docking, niveau X » | « validé » |
| Validation | Le modèle prédit-il des données empiriques non utilisées pour l'ajuster? | données de terrain ou de laboratoire | « validé contre [données] » | « validé » si les paramètres ont été ajustés sur ces données |
| Extension | Que fait le modèle hors du protocole publié? | prédiction, jamais acceptation | *Hypothèse de l'auteur*, ou résultat exploratoire ou confirmatoire (§11) | « reproduit » |

Règles :
1. Chaque critère d'une fiche est classé réplication ou validation. La porte de réplication ne dépend que des critères de réplication.
2. Un critère de validation qui échoue est un résultat (limite du modèle), inscrit au registre (§7.5), pas un échec de code.
3. Les paramètres ajustés sur un jeu de données ne servent pas à valider sur ce jeu.

Exemples tirés des dossiers :

| Cas | Classement | Détail |
|---|---|---|
| Seeley et al. 1991 : EDO à midi, riche 119 ± 3 et pauvre 3 ± 1 à t = 240 min [Seeley et al. 1991] | réplication, déterministe | valeurs simulées 118,7 et 3,0 : atteint (dossier `p1-recrutement`, C4) |
| Mêmes articles, effectifs absolus de terrain (colonie d'environ 4 200 abeilles) | **pas une cible** | recrutement non simultané, conditions de terrain non modélisées (`p1-recrutement`, C6) |
| Goss et al. 1989 : 11 colonies observées, 12/26 (r = 1), 15/18 (r = 1,4), 14/14 (r = 2), 2/18 (branche tardive) [Goss et al. 1989] | validation tentée | le critère « observé dans l'IC à 95 % du modèle » échoue au sens unilatéral à r = 1,4 (P = 0,047, limite) et r = 2 (P = 0,018) avec le modèle publié [I] : le critère d'acceptation reste ordinal (`p1-recrutement`, C3) |
| Garnier et al. 2013 : corrélation trafic-pont au décalage 0, 10 ponts non utilisés pour l'ajustement [Garnier et al. 2013] | validation hors échantillon | `p9-mouvement-collectif`, T9.21 critère (c); T9.13 et T9.14 aussi |

## 3. Fiche de reproduction

### 3.1 Règles

1. **Avant le code.** La fiche est rédigée avant le premier commit du modèle et gelée par un commit étiqueté (SHA ou étiquette consignés dans l'en-tête). Après le gel, seule une entrée du registre (§7.5) peut la modifier.
2. **Une cible, une fiche.** Un critère de validation et un critère de réplication ne partagent pas une fiche.
3. **Aucune valeur sans source** : une valeur déduite porte [I], une valeur non confirmée [à confirmer], une référence non confirmée [non vérifiée] (cadre, principe 8).
4. **Statut de lecture par composante** (champ 13). Si la source n'a pas été lue, ou si les paramètres ne viennent que d'un résumé, d'une notice ou d'une source secondaire, la fiche est *bloquée* : pas de code du modèle (précédent : T8.2 dans `p8-individu-colonie`, « ne pas coder avant lecture du SI »). Si les paramètres sont [T] ou [T\*] mais qu'une autre composante (équations, protocole, dispersion) ne l'est pas, ou qu'une valeur reste [à confirmer], la fiche est *provisoire* et le critère porte [à confirmer].
5. **Les tolérances « proposées » des dossiers** sont confirmées ou corrigées à la rédaction, après numérisation de la figure.
6. **Source incohérente.** Si le texte et la figure divergent, la fiche note les deux, retient l'une et inscrit l'écart au registre (précédents : 90 abeilles dans le texte contre 91 à la figure chez [Seeley et al. 1991]; quorum de 11,3 contre 12,7 chez [Pratt et Sumpter 2006]).
7. **Trois formes, une valeur.** Le tableau des cibles de la fiche de projet résume la fiche de reproduction; `targets/<projet>.json` (`05-spec-simulation.md`) en est la forme exécutable; `outils/verifier-cibles.ts` vérifie que le niveau, n et la marge concordent. Les champs 7 à 11 sont donc identiques dans les trois.

### 3.2 Gabarit (à copier pour chaque cible)

```markdown
# Fiche de reproduction T<projet>.<n> : <titre court>

**Statut de la fiche :** brouillon | gelée (<SHA ou étiquette git>, <date>) | satisfaite | non satisfaite | non concluante | bloquée (<raison>)
**Projet, taxon, préréglage :** P<k>; <taxon nommé>; <préréglage>   (le canal est une variable du modèle, jamais un attribut du taxon)
**Correspondance avec le dossier :** <ID du dossier, p. ex. G1, C4, T9.21>
**Nature :** réplication | validation | vérification de code

## 1. Article
[Nom année]; DOI ou URL; version lue (publiée, préimpression vN, matériel supplémentaire);
statut de la référence dans 11-bibliographie.md (vérifiée | corrigée | non vérifiée).

## 2. Figure, tableau ou équation cible
Emplacement exact (Fig., Tableau, éq., page). Valeur(s) ou courbe publiée(s), dispersion et **n publié**.
Si texte et figure divergent : les deux valeurs, celle qui est retenue, entrée du registre.

## 3. Équations
Transcrites telles que publiées (notation de la source), puis forme implantée.
Conventions à déclarer : sens de chaque paramètre (p. ex. ρ persistance ou évaporation), unité du temps, discrétisation.

## 4. Paramètres et unités
| Symbole | Valeur | Unité | Emplacement dans la source | Lecture | Rôle |
|---|---|---|---|---|---|
| … | … | … | … | T / T* / R / M / S / I | publié / ajusté / dérivé / libre |
Tout paramètre « libre » : valeur de départ, plage, règle de calage (§7.3 du protocole).

## 5. Protocole simulé
Nature du modèle (EDO, Monte Carlo, SSA, temps discret, modèle à agents, métaheuristique); conditions initiales;
horizon; rodage; pas et intégrateur; ordre de mise à jour (synchrone à double tampon | asynchrone séquentiel
à permutation tirée du PRNG); condition d'arrêt; grandeur observée et fenêtre de mesure; perturbations;
ce que « une répétition » désigne.

## 6. Données numérisées
Fichier CSV versionné (chemin, SHA); outil; calibration des axes; incertitude de lecture (± unités);
n publié; nature de la dispersion (écart-type, erreur-type, IC). Si elle est inconnue : [à confirmer]
et conclusion testée sous les deux lectures.

## 7. Niveau visé
identité numérique à tolérance (déterministe) | relationnel | distributionnel (TOST). Justification en une phrase (§4.5).

## 8. Critère chiffré
Énoncé exact : grandeur, valeur publiée, tolérance, fenêtre. Écrit avant le code.

## 9. Marge d'équivalence δ   (distributionnel seulement)
Valeur, échelle (points | relative | log10), α = 0,05 par test unilatéral, justification par composantes (§5.2).

## 10. Répétitions n
n par bras; ES de Monte Carlo visée; calcul (formule, entrées d'un pilote); n_max préenregistré pour l'issue
indéterminée; plancher applicable (§6.4).

## 11. Graines
Graine maîtresse; PRNG et version; dérivation par répétition et par sous-système; plan apparié ou non (§6.6).

## 12. Règle de décision
Satisfaite si … ; non satisfaite si … ; non concluante si … → action (augmenter n jusqu'à n_max, sinon « non concluante »).
Aucun ajustement de paramètre ni de critère après le gel sans entrée au registre.

## 13. Statut de lecture de la source
Équations [ ]; paramètres [ ]; protocole [ ]; figure cible [ ]; dispersion [ ].
Statut résultant : complète | provisoire | bloquée.

## 14. Portes et dépendances
Portes concernées (lecture, code, réplication, docking, extension); cibles dont celle-ci dépend;
E<projet>.<n> et H<projet>.<n> qu'elle débloque.

## 15. Résultat (rempli après l'exécution)
Date; SHA du code; manifeste(s) de run; estimation avec IC (90 % pour un TOST); décision;
entrées du registre (identifiants); lien vers la note de recherche.
```

### 3.3 Exemple rempli (champs essentiels)

Cible : modèle de réponse de quorum de [Sumpter et Pratt 2009] (dossier `p5-quorum`, M6 et cible G1; diagnostics X17 à X19 du dossier `x-methodes`).

| Champ | Contenu |
|---|---|
| 1. Article | [Sumpter et Pratt 2009], section 4(a)–(d), éq. 4.1, fig. 4; vérifiée; équations lues [T] (MathML) |
| 2. Cible | k = 1 : 75,5 % vers X, durée 253,7 ± 64,0 pas; k = 9 : 83,3 %, 307,8 ± 71,0 pas; n publié = 1000 simulations. « ± » lu comme écart-type [I] [à confirmer] |
| 4. Paramètres | n = 40, r = 0,02, p_x = 1, p_y = 0,5, T = 10, a = 0,1, m = 0,9, k ∈ {1; 9}. **Lecture de r : [à confirmer]** : le texte parle de « l'une des deux options »; le meilleur ajustement du pilote vient de la lecture « chaque option » |
| 7. Niveau | distributionnel (fraction vers X et durée) |
| 8–9. Critère et marge | le dossier P5 propose ±2 points (fraction) et ±10 % (durée) à 1000 runs; ±2 points est **non testable** à 1000 runs : il faut ≈ 7 920 par bras; ±4 points exige 1 980; ±10 points ≈ 320 [x-methodes, X18 et §7 pt 5]. La fiche choisit une marge, et son n, **avant** de voir l'IC |
| 10. n | 1000 suffisent pour la durée (demi-largeur de l'IC à 90 % ≈ 5 pas, X19); 1 980 par bras pour la fraction à ±4 points |
| 11. Graines | `xoshiro128**` semé par SplitMix64; graines appariées entre synchrone et asynchrone (§6.8) |
| 13. Lecture | équations [T]; paramètres [T]; dispersion [à confirmer]; statut **provisoire** |
| 15. Résultat du pilote (exploratoire, 1000 runs par bras, k = 1) | fraction : +0,77 point, IC à 90 % [−2,38 ; +3,91] : équivalence non établie à ±2, établie à ±4. Durée : +23,5 pas, IC à 90 % [+18,5 ; +28,5] : non établie à ±10 % (25,4), établie à ±15 % (38,1), sous réserve de la lecture du « ± » [à confirmer]. Ordre de mise à jour sans effet (synchrone 276,6 contre asynchrone 276,7 pas) : l'écart de +9 % ne vient pas de l'ordre |

Lecture par le protocole : si la fiche avait fixé ±10 % pour la durée, la cible serait *non satisfaite*; ±15 % ne peut être adopté après coup que par une entrée du registre fondée sur une raison indépendante des données (p. ex. confirmation de la lecture de r auprès des auteurs), et il est alors rapporté comme déviation (§7.5).

## 4. Niveaux d'acceptation

### 4.1 Les niveaux

| Niveau | Contenu | Quand | Test |
|---|---|---|---|
| Identité numérique à tolérance (déterministe) [Axtell et al. 1996] | mêmes valeurs, ou valeurs à une tolérance numérique déclarée | entiers d'un PRNG, identités mathématiques, modèles déterministes (EDO); irréaliste pour un modèle stochastique | égalité exacte ou tolérance (§4.4) |
| **Alignement relationnel** (cadre, principe 3) | même relation interne entre résultats : signe, ordre, monotonie, plage | cible qualitative, figure non numérisable, n publié très petit, modèle d'origine indisponible (LLM) | conditions de signe, d'ordre ou de plage avec IC |
| **Équivalence distributionnelle** (cadre, principe 3) | distributions indiscernables à une marge près | cible chiffrée avec dispersion et n publiés | TOST (§5) |

Le manuscrit d'Axtell et al. 1996 écrit « équivalence relationnelle »; « alignement relationnel » est l'étiquette de [Wilensky et Rand 2007], qui créditent Axtell et al. des trois catégories (version publiée d'Axtell non lue). Le relationnel est le plus faible; le distributionnel peut exiger un alignement laborieux des détails paramétriques [Axtell et al. 1996]. Le cadre retient deux niveaux d'acceptation statistiques. La catégorie « identité numérique à tolérance (déterministe) », reprise des trois niveaux d'Axtell et al. et des fiches de projet, sert aux cibles déterministes et aux identités : elle ne passe pas par un test statistique.

### 4.2 Alignement relationnel

Règles :
1. Le critère est un énoncé de signe, d'ordre ou de plage; chaque effet invoqué porte un IC à 95 % qui exclut 0 [audit méthodologie, C4].
2. **Patrons multiples** : au moins trois patrons, à deux niveaux au moins (individu et colonie); chaque patron = grandeur + sens ou ordre de grandeur + source; un jeu de paramètres qui ne les reproduit pas tous est rejeté [Grimm et al. 2005; Grimm et Railsback 2012; valeurs recommandées de `x-methodes`, M2, [I]].
3. Une plage tirée d'une source à n petit est élargie de l'incertitude de la source.

Exemples chiffrés (tolérances « proposées » par les dossiers, à confirmer à la rédaction de la fiche) :

| Source (dossier, cible) | Critère | Répétitions |
|---|---|---|
| [Sasaki et al. 2013] (`p8-individu-colonie`, T8.1) | P_col > P_ind aux deux plus faibles différences et P_col < P_ind aux deux plus fortes; α_col/α_ind ∈ [0,10 ; 0,40] (publié 0,21 à 0,23); écart d'asymptotes ∈ [0,05 ; 0,20] (publié ≈ 0,12); les trois conditions sont requises (trois patrons) | 1 000 du protocole complet |
| [Goss et al. 1989] (`p1-recrutement`, C3) | P(branche courte majoritaire) croissante en r; P(branche tardive) < 0,2 × P(r = 2) | ≥ 1 000 |
| [Couzin et Franks 2003] (`p9-mouvement-collectif`, T9.1) | F̄(90°, 1000 °/s) ≥ 0,8 et supérieur d'au moins 0,3 à F̄ aux bords; fraction de répétitions à flux net positif dans [0,40 ; 0,60] (le sens choisi est aléatoire); θ_a = 1000 °/s [à confirmer] | 100 par combinaison |
| [Okada et al. 2014] (`p8-individu-colonie`, T8.9) | signes conformes sur ≥ 5 des 6 erreurs de danse (0, 5, 10, 15, 30, 45°) en habitat rare, et ordre des seuils; paramètres du modèle non lus : fiche bloquée | ≥ 200 |
| [Seeley et Visscher 2004] et [Seeley et al. 2006] (`p5-quorum`, A9) | rapport du temps jusqu'au quorum, 5 cavités sur 1 cavité, dans [1,5 ; 3,5] (publié 442 min contre 196 min, soit 2,26, sur 4 essaims : plage large parce que n = 4) | 200 |

### 4.3 Équivalence distributionnelle

Règles :
1. Test : TOST (§5). Le non-rejet d'un test de différence n'établit pas l'équivalence [Schuirmann 1987; Lakens 2017]. [Axtell et al. 1996] concluaient à l'équivalence parce que Mann-Whitney (n = 10, U critique 23) et Kolmogorov-Smirnov (n = 40, seuil 0,304) ne rejetaient pas : ce n'est pas la pratique retenue.
2. Les critères des dossiers formulés par non-rejet (« Mann-Whitney sans différence, p > 0,05 ») sont convertis en TOST à la rédaction de la fiche.
3. Échelle de la marge : relative pour les durées, en points pour les proportions, log₁₀ pour les erreurs d'optimisation (§5.2).

| Source (dossier, cible) | Critère | Répétitions |
|---|---|---|
| [Sumpter et Pratt 2009] (`p5-quorum`, G1) | fraction vers X (75,5 % et 83,3 %) et durée (253,7 et 307,8 pas) : exemple complet en §3.3 | 1000 publiées |
| [Dorigo et al. 1996] (`p2-optimisation`, C2) | moyenne ≤ 424,25 × 1,002 (≈ 425,10); ≥ 1 essai sur 30 atteint 423,741; classement ant-cycle < ant-density < ant-quantity reproduit | 30 (10 dans l'article : trop peu pour un IC) |
| [Karaboga et Basturk 2008] (`p2-optimisation`, C8) | Griewank et Rastrigin 50D : ≥ 90 % des essais < 10⁻¹²; Rosenbrock 50D : moyenne dans [0,01 ; 0,5] (publié 0,1331 ± 0,2622), puis TOST sur log₁₀ plutôt que le test de rang du dossier. Pilote : 30/30 < 10⁻¹² et Rosenbrock 0,147 ± 0,172 | 30 |
| [Socha et Dorigo 2008] (`p2-optimisation`, C11) | évaluations de fonction à ±25 % de la valeur publiée; succès sur GR10 dans [50 % ; 72 %] (IC binomial à 95 % pour n = 100 autour de 61 %) | 100 |
| [Garnier et al. 2013] (`p9-mouvement-collectif`, T9.21 (c)) | corrélation trafic-pont au décalage 0 dans [0,75 ; 0,88]; TOST avec marge ±0,06 (proposée) | 1 000 par pont |
| [Anderson et Ratnieks 1999a] (`p4-regulation`, T-A3) | délai moyen/500 : 2,3 / 1,25 / 0,42 / 0,15 % pour 10 / 100 / 1 000 / 10 000 ouvrières, à ±15 % relatif par point | 10 par taille, 2 au-delà de 4 000 ouvrières |

Avec 2 répétitions par taille, un TOST n'a pas de puissance : la dernière ligne ne s'exécute qu'avec un n supérieur ou comme tolérance relationnelle [I].

### 4.4 Identité numérique à tolérance (cibles déterministes)

Pas de TOST : une intégration, une tolérance sur la valeur, et un test de convergence (même résultat à dt et à dt/2; l'erreur de discrétisation reste petite devant la tolérance).

| Source (dossier, cible) | Critère |
|---|---|
| [Seeley et al. 2012] (`p5-quorum`, A1) | σ\* = 4αγρ/(ρ − α)² ; pour (γ, α, ρ) = (3, 1/3, 3), σ̂\* ∈ [1,654 ; 1,721] (±2 % de 1,6875), pas de balayage ≤ 0,01, t = 500, deux conditions initiales perturbées (±10⁻⁴) |
| [Pais et al. 2013] (`p6-pathologies`, T8) | \|σ̂\* − σ\*\|/σ\* ≤ 1 % pour v ∈ {1,5 ; 2 ; 3 ; 4 ; 6}; à σ = 0, \|ψ_A − ψ_B\| < 10⁻³ à T = 200 |
| [Seeley et al. 1991] (`p1-recrutement`, C4) | riche à 119 ± 3, pauvre à 3 ± 1 à t = 240 min; dt ≤ 0,05 min, vérifier dt/2 |

### 4.5 Choix du niveau

| Situation | Niveau |
|---|---|
| Modèle déterministe, identité mathématique | identité numérique à tolérance (§4.4) |
| Modèle stochastique; la source donne valeur, dispersion et n | distributionnel |
| La source donne une forme, un ordre, une plage; figure non numérisable; modèle d'origine indisponible | relationnel |
| n publié très petit | relationnel large, ou garde-fou : [Seeley et Buhrman 2001] (`p5-quorum`, A11) : P̂ ≥ 0,6 sur 500 runs alors que l'IC binomial de 4/5 va d'environ 0,28 à 0,99 |
| Paramètres seulement dans un résumé, une notice ou une source secondaire | fiche bloquée (§3.1) |

## 5. Équivalence : TOST

### 5.1 Principe

Deux tests unilatéraux : H₀₁ : Δ ≤ −Δ_L ; H₀₂ : Δ ≥ +Δ_U. L'équivalence est établie si les deux sont rejetés à α, c'est-à-dire si l'IC à 1 − 2α (90 % pour α = 0,05) est entièrement inclus dans [−Δ_L ; +Δ_U] [Lakens 2017, T\*; Schuirmann 1987, résumé seulement]. Statistiques de Welch, degrés de liberté de Satterthwaite : t_L = (M₁ − M₂ − Δ_L)/√(SD₁²/n₁ + SD₂²/n₂), et t_U avec Δ_U [Lakens 2017]. À α = 0,05, le TOST conclut comme l'IC « le plus court » de Westlake et surpasse l'approche par la puissance [Schuirmann 1987]. Pour des proportions, la fiche déclare la méthode de l'IC à 90 % de la différence.

### 5.2 Choix de la marge δ

| Règle | Détail |
|---|---|
| Moment | fixée et justifiée **avant** les runs; jamais après avoir vu l'IC |
| Échelle | relative pour les durées (±10 à ±15 %); en points pour les proportions (±4 à ±10 selon n); log₁₀ pour les erreurs d'optimisation (±0,5 décade) [`x-methodes`, M6, valeurs recommandées [I]; audit méthodologie, §7.3]; standardisée (en écarts-types du comparateur, d de Cohen) pour comparer deux politiques [Lakens 2017] |
| Composantes | (a) incertitude de lecture de la figure; (b) dispersion et n de la source; (c) résolution de Monte Carlo atteignable au n du budget; (d) pertinence : le plus petit écart qui changerait une conclusion du programme (plus petite taille d'effet d'intérêt; [Lakens et al. 2018], résumé seulement) |
| Exemple de composition | `p1-recrutement`, C1 : chaque classe à ±5 points de la lecture publiée, avec lecture ±3 et erreur de Monte Carlo ≈ 1,5 (tolérance dans le dossier; la fiche P1 en fait une marge de TOST à préenregistrer) |
| Prudence [I] | une marge plus étroite que la somme de l'incertitude de lecture et de la dispersion publiée ne se justifie pas |

### 5.3 Choix de n

- **Proportions** : n par bras = 2p(1 − p)(z₀,₉₅ + z₀,₉₀)²/δ², avec (z₀,₉₅ + z₀,₉₀)² = 8,564, puissance 80 %, différence vraie nulle [`x-methodes`, M6, [I]] :

| p | δ = 0,05 | δ = 0,10 | δ = 0,15 |
|---|---|---|---|
| 0,5 | 1 713 | 429 | 191 |
| 0,7 | 1 439 | 360 | 160 |
| 0,9 | 617 | 155 | 69 |

- **Moyennes, marge en d de Cohen** : n par groupe = 2(z_α + z_{β/2})²/Δ² ; à 80 % et α = 0,05, d = 0,5 donne 70, d = 0,3 donne 191, d = 0,2 donne 429 [Lakens 2017, tableau 1]; l'approximation normale donne 68,5, 190,3 et 428,2 [I].
- **Cas M6** (p ≈ 0,755) : ±2 points exigent ≈ 7 920 par bras, ±4 points 1 980, ±10 points ≈ 320 [`x-methodes`, X18].
- **Détecter n'est pas établir l'équivalence.** Pour *détecter* une différence (α = 0,05 bilatéral, 80 %), d = 0,5 demande 63 par groupe et d = 0,3 en demande 175 [audit méthodologie, annexe A, [I]]; pour *établir* l'équivalence, 70 et 191.
- Quand n requis dépasse le budget, trois issues seulement : élargir δ par une entrée du registre (raison indépendante des données), passer au niveau relationnel, ou déclarer la cible « non concluante ». On ne garde pas une marge étroite avec un test sous-puissant. Le harnais de `05-spec-simulation.md` applique la règle : il calcule le n requis d'une cible TOST et échoue si le n prévu est inférieur (garde de puissance).

### 5.4 Décision

Quatre issues [TOSTER, rapportées par `x-methodes`, M6; T\*] :

| Test de différence | TOST | Issue | Décision de la fiche |
|---|---|---|---|
| non significatif | significatif | équivalent | **satisfaite** |
| significatif | significatif | différent, mais sous la marge | **satisfaite**; l'écart est rapporté |
| significatif | non significatif | différent, non équivalent | **non satisfaite** |
| non significatif | non significatif | indéterminé | **non concluante** : augmenter n jusqu'à n_max, sinon elle le reste |

« Satisfaite » ne veut pas dire « identique » : elle veut dire « à moins de δ ». Augmenter n par paliers jusqu'à n_max consomme du risque α à chaque palier : les paliers, n_max et la correction de la règle d'arrêt sont fixés au préenregistrement, et un arrêt à la première conclusion favorable est interdit [I].

### 5.5 Cible publiée sous forme de résumé

| Cas | Règle |
|---|---|
| n publié et dispersion connus | Welch avec les deux erreurs-types |
| n publié inconnu | la valeur publiée est traitée comme une constante; la fiche déclare que l'incertitude de la source est ignorée et justifie la marge en conséquence |
| Dispersion ambiguë (écart-type ou erreur-type) | exécuter sous les deux lectures; si les conclusions diffèrent, la cible reste *provisoire* [à confirmer] (cas de la durée en M6, X19) |

### 5.6 Conjonction et multiplicité

- Les critères d'une même cible sont **conjonctifs** (tous requis) : test d'intersection-union, sans correction pour cette conjonction [I].
- Les hypothèses confirmatoires d'un même préenregistrement forment une famille : Holm à α = 0,05 [Holm 1979]. Exploratoire : Benjamini-Hochberg à q = 0,10, ou rien, mais étiqueté [Benjamini et Hochberg 1995; recommandation de `x-methodes`, M7, [I]]. On rapporte p brut et p ajusté.

### 5.7 À rapporter

IC à 90 %, ses bornes, la marge, n, l'ES de Monte Carlo, les deux p unilatéraux. Un résultat non significatif ne permet pas de conclure à l'absence d'effet [Lakens 2017].

## 6. Répétitions, graines, erreur standard de Monte Carlo, puissance

### 6.1 Unités

Une **répétition** est un run complet à graine distincte; l'unité statistique est le run. Les agents d'un même run sont groupés : pas de statistiques au niveau de l'agent (pseudo-réplication).

### 6.2 Erreur standard de Monte Carlo (ES)

D'après [Morris et al. 2019] (T\*; numérotation « Tableau 6 » de la version publiée non vérifiée [à confirmer]; formules en §5.2 de la préimpression v1 [T]) :

| Mesure | Estimation | ES de Monte Carlo |
|---|---|---|
| Biais | (1/n) Σ θ̂ᵢ − θ | √[ Σ(θ̂ᵢ − θ̄)² / (n(n−1)) ] |
| ES empirique | √[ Σ(θ̂ᵢ − θ̄)² / (n−1) ] | **EmpSE / √(2(n−1))** |
| EQM | (1/n) Σ(θ̂ᵢ − θ)² | √[ Σ((θ̂ᵢ − θ)² − EQM)² / (n(n−1)) ] |
| Proportion (couverture, puissance, rejet) | (1/n) Σ 1(événement) | √[ p̂(1 − p̂) / n ] |

Une extraction automatique de l'article donnait EmpSE² comme ES de l'ES empirique : forme fausse, la bonne est EmpSE/√(2(n−1)). Vérifié par simulation (3 000 réplications de n = 200 : rapports formule/écart-type observé 0,990 ; 1,002 ; 0,988 ; 0,989, tolérance ±6 %) [`x-methodes`, X16].

### 6.3 Combien de répétitions pour une précision donnée

- **Proportion** : n_sim = p(1 − p)/ES\*². Exemples publiés : couverture de 95 %, ES = 0,5 % donne 1 900; pire cas p = 0,5 donne 10 000 [Morris et al. 2019, T\*; recalculé].
- **Moyenne** : n = S²/ES\*², S tiré d'un pilote [`x-methodes`, M5, [I]].
- **Précision recommandée** : confirmatoire ES ≤ 0,005 (10 000 au pire cas; 3 600 si p = 0,9); exploratoire ES ≤ 0,01 (2 500; 900 si p = 0,9) [`x-methodes`, M5, [I]].
- Pas plus de décimales que l'ES n'en justifie; les runs échoués sont consignés comme valeurs manquantes avec leur cause, jamais écartés en silence [Morris et al. 2019].
- Motif : 93 des 100 études de simulation de *Statistics in Medicine* (vol. 34) examinées n'avaient aucune ES de Monte Carlo [Morris et al. 2019]; en psychologie, 8 % justifient n_sim et 77 % ne rapportent aucune incertitude de Monte Carlo [Siepe et al. 2024].

### 6.4 Plancher, stabilisation, n publié

- **Plancher** : 1 000 répétitions pour un modèle à règles (peu coûteux); c'est un plancher, pas une garantie [audit méthodologie, C6; `x-methodes`, M5].
- **Stabilisation du coefficient de variation** c_V = σ/μ pour fixer n [Lee et al. 2015; Thiele et al. 2014 : dix répétitions dans leur tutoriel]. Cas instructif : un article d'origine moyennait 100 répétitions; la réplication a jugé « 100 ou moins » à interpréter avec prudence (c_V de 0,14 à 100 contre 0,20 à 5 000) et 5 000 suffisantes [Hauke et al. 2020].
- **Le n publié n'est pas le n requis** : [Axtell et al. 1996] (n = 10 et n = 40), [Wilensky et Rand 2007] (dix répétitions par implantation, test t à 95 %), [Dorigo et al. 1996] (10 essais). Le n de la fiche vient de §5.3 et §6.3.
- **Pilote** : taille fixée par la fiche; au moins 10 répétitions par cellule pour les LLM (§13). Le pilote sert à estimer la variance, jamais à choisir les graines du test.

### 6.5 Puissance par simulation

1. Simuler le mécanisme générateur sous l'alternative (différence vraie égale à la plus petite taille d'effet d'intérêt) **et** appliquer l'analyse prévue, TOST ou modèle mixte compris.
2. Compter les rejets sur n_sim simulations.
3. ES de la puissance : √(P(1 − P)/n_sim) [I, d'après le tableau §6.2].
4. Choisir n tel que la puissance atteigne 80 % (niveau retenu par [Lakens 2017], tableau 1).
5. Outils : `simr` pour les modèles mixtes [Green et MacLeod 2016]; plusieurs algorithmes sur plusieurs instances avec contrôle de Holm [Campelo et Wanner 2019].

### 6.6 Graines et générateur

| Règle | Détail |
|---|---|
| Générateur | `xoshiro128**` (opérations 32 bits, `Math.imul`) [Blackman et Vigna 2021]; graine de 64 bits étendue par SplitMix64, car l'initialisation doit venir d'un générateur de nature différente [Blackman et Vigna 2021]. PCG32 n'est pas retenu (`05-spec-simulation.md`); s'il l'était, son vecteur (X2) devrait passer et on n'en tirerait pas de flux par agent (le différend PCG contre xoshiro repose sur une page d'opinion [Vigna 2026] et sur [O'Neill 2014]) |
| Interdits | `Math.random` (non semable) [MDN 2026]; `Date.now`, `performance.now` et l'ordre d'itération d'objets à clés numériques dans la logique de simulation [audit simulation-technique, M1, [I]]; contrôle par `grep` en intégration continue (X21) |
| Flux | un flux par sous-système (environnement, chaque taxon, politique LLM); sous-flux par fonction de saut ou par SplitMix64 de (graine, identifiant) [`x-methodes`, M10c, [I]]; mécanisme exact dans `05-spec-simulation.md` |
| Liste de graines | graine maîtresse et indices 0 à n − 1 fixés dans la fiche; aucune sélection de graines après coup [I] |
| Plan apparié | mêmes graines dans toutes les cellules d'une comparaison [`p7-agents-llm`, §7.1] (nombres aléatoires communs). Pour un docking, mêmes graines maîtres dans les deux modèles (`05-spec-simulation.md`) : les flux nommés communs (p. ex. l'environnement) donnent des tirages communs; l'analyse est appariée par graine, et si l'appariement est ignoré le test reste valide mais conservateur [I] |
| Traçabilité | graine, version du générateur et état à chaque répétition au manifeste de run [Morris et al. 2019; cadre §7] |

### 6.7 Déterminisme entre moteurs

Plusieurs fonctions `Math` ont une précision dépendante de l'implémentation, même sur un autre système d'exploitation avec le même moteur [MDN 2026; audit simulation-technique, M1]. Conséquences :
- L'**identité numérique** ne vaut que pour les entiers du PRNG (X1 et X3; T0.1 et T0.3).
- Les **traces dorées** (hachage de l'état à t = 100 et 1000 pour quelques graines) ne valent que pour le moteur et la version de Node figés en intégration continue [audit simulation-technique, M13].
- Les **critères statistiques** valent partout.
- Le moteur de référence sans affichage (Node, version figée) produit tous les résultats confirmatoires; le navigateur rejoue des traces (cadre §7). Les constantes dérivées (facteur de décroissance par pas) se calculent une fois sous Node et s'écrivent comme littéraux dans le fichier de scénario [audit simulation-technique, M1, [I]].

### 6.8 Ordre de mise à jour

L'ordre est un paramètre du modèle : les résultats d'un modèle spatial diffèrent beaucoup entre temps discret et continu [Huberman et Glance 1993], et synchrone et asynchrone diffèrent surtout à forte densité [Caron-Lormier et al. 2008]; l'effet peut être très grand [Grimm et al. 2010].

- Facteur du scénario : `synchrone` (double tampon) ou `asynchrone` (permutation tirée du PRNG à chaque pas), testé **une fois par modèle à agents**.
- Critère « sans effet » : écart < 3 ES de Monte Carlo [`x-methodes`, M10d, [I]].
- Test fait sur M6 (**H0.1**, X17, 1000 runs par condition) : à k = 1, asynchrone 76,1 % et 276,7 ± 67,6 pas, synchrone 76,0 % et 276,6 ± 71,4 pas; à k = 9, 82,8 % et 323,2 ± 79,0 contre 82,7 % et 325,3 ± 80,2 : ordre sans effet [I].

### 6.9 Contrôles de code et de formules (cibles T0.n)

Les cibles de vérification du socle portent des identifiants `T0.n` (fiche S0, qui fait foi; T0.n reprend Xn), détaillés dans `05-spec-simulation.md` (table « Cibles de vérification du socle », qui donne la correspondance avec les `X<n>` du dossier `x-methodes`). Ce protocole les désigne par leur identifiant de dossier, pour ne pas dupliquer la numérotation, et en fixe le rôle : elles précèdent toute réplication (porte de code).

| Contrôle (dossier) | Cible T0.n | Critère |
|---|---|---|
| X1 : 10 premières sorties de `xoshiro128**`, état [1, 2, 3, 4] : 11520, 0, 5927040, 70819200, 2031721883, 1637235492, 1287239034, 3734860849, 3729100597, 4258142804 [rust-random 2026] | T0.1 | égalité exacte, sous Node et trois navigateurs |
| X3 : SplitMix64, graine 1477776061723855037 : 1985237415132408290, 2979275885539914483, 13511426838097143398 [rust-random 2026] | T0.3 | égalité exacte |
| X4 : RK4 sur M1c (σ = 10, γ = 3, α = 1/3, ρ = 3, T = 4, y₀ = (0,01 ; 0,0101)), rapport des erreurs maximales pour h → h/2 (référence h = T/64 000) | T0.4 | rapport ∈ [12 ; 20]; mesuré 19,3 ; 16,6 ; 16,2 (Euler 1,8 ; 1,9 ; 2,0) [I] |
| X5 : équilibre de M1c à σ = 10, t = 200, h = 0,01 | T0.5 | (0,8497 ; 0,0392) à ±10⁻³ |
| X6 : SSA direct [Gillespie 2007] pour U→A seul, E[A(t)] = N(1 − e^{−γt}), N = 200, γ = 0,5, t = 2 | T0.6 | 2 000 runs, écart < 3 ES; mesuré 126,16 ± 0,15 contre 126,42 (1,7 ES) |
| X7 : M1c à N fini par SSA, P(\|A − B\|/N > 0,3 à t = 40), 200 runs (exploratoire, aucune valeur publiée) : σ = 1 : 0,445 ± 0,035 (N = 50), 0,105 ± 0,022 (N = 200); σ = 10 : 0,950 ± 0,015 (N = 50), 1,000 (N = 200) | T0.7 | docking EDO et SSA : à σ < σ\* = 1,6875 la probabilité **décroît** avec N; à σ > σ\*, elle tend vers 1; écart entre implémentations < 3 ES |
| X12 à X14, X16 : n_sim 1 900 et 10 000; n de TOST 70, 191, 429 (±2); seuil K-S 0,304; ES de Monte Carlo (rapports 0,990 ; 1,002 ; 0,988 ; 0,989) | T0.12 à T0.14, T0.16 | valeurs retrouvées par `analysis/` |
| X21 : aucun `Math.random` dans la logique de simulation | T0.21 | contrôle par `grep` en intégration continue |
| X2 : PCG32 (`Lcg64Xsh32::new(42, 54)`) : 0xa15c02b7, 0x7b47f409, 0xba1d3330, 0x83d2f293, 0xbfa4784b, 0xcbed606e [rust-random 2026] | aucune (PCG32 non retenu) | à exécuter seulement si PCG32 est adopté |
| X8 à X11, X15 : formules de [Miller 2024] et de [Gelman 2018] : n = 969 (éq. 9); MDE 13,27 % et 7,57 % (les valeurs publiées 13,2 et 7,5 sont tronquées); facteur (1 + 2/K)/3 (2/3 ; 1/2 ; 4/9); exemple du §4.2 à 1/12 et non 1/9; interaction ×2 et ×16 | aucune | contrôle par `x_methodes_checks.py` (sections `stats`, `ntable`); à ajouter aux cibles du socle si `analysis/` implante le module d'évaluation des LLM |

## 7. Portes go/no-go, calage et registre des déviations

### 7.1 États d'une cible

| État | Sens | Action permise |
|---|---|---|
| bloquée | source non lue, ou paramètres issus d'un résumé, d'une notice ou d'une source secondaire | pas de code du modèle; lever la cause (accès, matériel supplémentaire, auteurs) |
| provisoire | paramètres [T] ou [T\*], mais une composante ni [T] ni [T\*] ou une valeur [à confirmer] | code et runs exploratoires; au mieux « satisfaite sous réserve » |
| gelée | fiche complète, critère écrit, marge et n calculés | exécuter, une fois, sur la liste de graines gelée |
| satisfaite | tous les critères de réplication satisfaits au niveau déclaré (« sous réserve » si la fiche était provisoire) | compte pour la porte de réplication (go conditionnel au mieux si « sous réserve ») |
| non satisfaite | au moins un critère non satisfait | diagnostic (§7.4), entrée au registre |
| non concluante | issue indéterminée à n_max (§5.4) | rapportée telle quelle; ne compte pas comme satisfaite |

### 7.2 Portes

| Porte | Moment | Condition de passage (vérifiable) | Si échec |
|---|---|---|---|
| Lecture | avant le code du modèle | fiche complète (champs 1 à 13); paramètres [T] ou [T\*]; aucune valeur [à confirmer]; fiche gelée; marge et n calculés | cible bloquée (paramètres) ou provisoire (autre composante ou valeur [à confirmer]) |
| Code | avant la première réplication | `npm run verify` de `05-spec-simulation.md` sort à 0 (cibles T0.n du noyau, du déterminisme et de la conformité; typage) | corriger le noyau; aucune réplication |
| Réplication | après les runs | chaque cible *requise* par la fiche de projet est satisfaite à son niveau; le modèle reproduit au moins trois patrons à deux niveaux [`x-methodes`, M2, [I]]; toute déviation est au registre | diagnostic (§7.4); extensions dépendantes suspendues |
| Docking | après la réplication de la référence | critère du §12 | les résultats du modèle chorégraphique commun ne sont pas rapportés comme confirmatoires |
| Extension | avant tout E\<projet\>.\<n\> | porte de réplication franchie pour les cibles dont E dépend; préenregistrement déposé si E est confirmatoire (§11) | E reste exploratoire et étiquetée, ou est suspendue |

Les fiches de projet nomment leurs portes à leur manière (A à E, PR-0 à PR-6…) : chacune se rattache à l'un de ces cinq types (p. ex. « moteur » au type *code*, « docking » au type *docking*, la lecture en texte intégral au type *lecture*). Les dépendances entre projets sont celles du cadre §5 : P7 dépend des résultats reproduits de P1, P3, P5 et P8; P2 n'est lancé que si les phases 1 et 2 sont achevées. Issues possibles : **go**, **go conditionnel**, **no-go**. Le chercheur décide; le protocole fixe les conditions; les dates des portes sont dans `09-feuille-de-route.md`. Un go conditionnel exige que chaque cible non satisfaite ou provisoire soit liée à une entrée du registre de type « source » ou « plan » acceptée par le chercheur : un échec de type « résultat » sans explication indépendante est un no-go.

### 7.3 Calage des paramètres libres

1. Un paramètre libre est déclaré dans la fiche (champ 4) avec sa plage et sa règle de calage.
2. Le calage porte sur une cible de calage **distincte** de la cible de test, avec des graines de calage distinctes de celles du test.
3. Après calage, les valeurs sont gelées par commit; le test s'exécute une fois sur la liste de graines gelée.
4. Ajuster un paramètre pour franchir la cible de test est interdit : les pratiques de recherche douteuses permettent de faire paraître supérieure n'importe quelle méthode dans une étude de simulation comparative [Pawel et al. 2024, résumé seulement].

### 7.4 Diagnostic quand une cible n'est pas satisfaite

Dans cet ordre, en consignant chaque étape :
1. **Code** : cibles T0.n du noyau et tests unitaires des équations transcrites (champ 3).
2. **Lecture de la source** : paramètres, unités, conventions, sens du « ± », lecture de r (M6); code ou matériel supplémentaire des auteurs; question aux auteurs.
3. **Pas de temps et grille** : même résultat à dt/2 et à Δx/2 [audit simulation-technique, M3].
4. **Ordre de mise à jour** : test de §6.8.
5. **Détails d'implantation qui ont déjà fait diverger des réplications** : méthode d'interaction, ordre des événements, algorithme d'ordonnancement (liste mélangée ou non) [Wilensky et Rand 2007].
6. **Isolement** : désactiver progressivement les fonctions du modèle; seconde implantation par un autre programmeur dans un autre langage [Edmonds et Hales 2003]; autres machines, systèmes et générateurs [Galán et al. 2009].
7. **Coquille de la source** (précédents : [Reid et al. 2015], écarts à 12° et 60°; [Miller 2024], exemple du §4.2).

Puis entrée au registre et décision (§7.5).

### 7.5 Registre des déviations

Un fichier versionné par projet (chemin fixé par la fiche de projet). Une entrée par déviation, créée **le jour** où elle apparaît. Trois types : *plan* (écart au préenregistrement ou à la fiche gelée), *source* (écart ou erreur dans la source), *résultat* (critère non satisfait). Pour un écart de plan, on indique quand, où, pourquoi, puis l'effet sur la sévérité du test et sur la validité de l'inférence; une déviation peut accroître la sévérité [Lakens 2024; chapitre 13 non recoupé [à confirmer]]. Les cinq catégories de Lakens 2024 : événement imprévu, erreur de préenregistrement, information manquante, hypothèse non testée violée, hypothèse auxiliaire falsifiée. Cadre de rapport standardisé : [Willroth et Atherton 2024].

Gabarit :

```markdown
| ID | Date | Cible ou section du plan | Type | Plan d'origine | Déviation ou écart | Raison | Catégorie (Lakens 2024) | Effet sur la sévérité | Effet sur la validité | Décision |
|---|---|---|---|---|---|---|---|---|---|---|
| D-<projet>-001 | AAAA-MM-JJ | T<projet>.<n> / §<…> | plan / source / résultat | … | … | … | … / sans objet | augmente / diminue / nul | … | go / go conditionnel / no-go |
```

Exemples tirés des dossiers (illustratifs) :

| ID | Type | Contenu |
|---|---|---|
| D-5-001 | résultat | M6 : durée plus longue que la publiée de +9,1 % (k = 1) et de +5,0 % (k = 9), soit 7,8 et 4,6 ES; ordre de mise à jour écarté (X17); lecture de r et sens du « ± » à confirmer [`x-methodes`, X17 et X19]. Décision : critère de durée non satisfait; fraction évaluée à part |
| D-9-001 | source | [Reid et al. 2015] : à 12°, 13,95 publié contre 12,68 calculé; à 60°, 35,36 contre 38,36. Inscrits comme coquilles probables; les tests unitaires à ±0,01 cm ne portent que sur 20° et 40° (`p9-mouvement-collectif`, T9.20 (a)) |
| D-0-001 | source | [Miller 2024], exemple du §4.2 : le texte annonce 1/6 → 1/9; le calcul avec ses entrées (corrélation 0,5) donne 1/6 → 1/12; 1/9 correspond à une corrélation de 1/3 [I]. L'exemple n'est pas utilisé comme cible; vérifier une version ultérieure (seule la v1 est listée) |

## 8. Cas limites

| Cas | Règle |
|---|---|
| Source non lue en texte intégral | cible bloquée ou provisoire (§3.1). Précédents dans `p9-mouvement-collectif` : T9.3, T9.7, T9.8, T9.15, T9.16 et T9.24 bloquées; dans `p6-pathologies` : T9 bloquée (Texte S1 non lu), T6 et T7 reposant sur des chiffres non confirmés |
| Valeurs incohérentes dans la source | noter les deux, en retenir une, entrée du registre de type *source* (cas de Seeley 1991 : 90 et 91; de Pratt et Sumpter 2006 : 11,3 et 12,7) [Seeley et al. 1991; Pratt et Sumpter 2006] |
| Convention de paramètre | déclarer la convention dans le scénario : chez [Dorigo et al. 1996], ρ est la *persistance* (τ ← ρτ + Δτ); la forme τ ← (1 − ρ)τ + Δτ est une convention postérieure (cadre §2.4, point 4); les deux coïncident à ρ = 0,5, pas à 0,99 [audit simulation-technique, m1] |
| Unité douteuse | cible bloquée jusqu'à confirmation : ρ = 0,00085 [unité à confirmer] chez [Dussutour et al. 2009] (`p1-recrutement`, C9) |
| Convention de mesure de la source | la fiche fixe la convention avant le code : Oliver30, 423,741 en distances réelles et 420 en distances entières [Dorigo et al. 1996] |
| Dispersion ambiguë | §5.5 |
| Proportion proche de 0 ou de 1 | IC binomial (Wilson ou exact), déclaré dans la fiche; exemple : « au moins 95 % des simulations dans la classe 0–20 % » (`p1-recrutement`, C2) |
| Sortie bimodale (décision A ou B, extinction, interblocage) | rapporter la probabilité de chaque mode; les indices de variance se lisent mal [`x-methodes`, M4] |
| Modèle déterministe | une intégration, pas de graine à tirer, test à dt et dt/2 (§4.4) |
| Runs échoués ou avortés | valeurs manquantes avec leur cause [Morris et al. 2019]; pour les LLM, règle d'attrition préenregistrée (§13) |
| Même graine, deux implantations | aucune identité attendue pour un modèle stochastique, sauf les entiers du PRNG (§6.7) |
| Valeur non publiée dont dépend la cible | la cible est dégradée au niveau relationnel, avec déviation enregistrée, jamais retouchée en silence (précédent : fiche P4, portes go/no-go) |
| Résultat sans valeur publiée (extension) | pas de fiche de reproduction : hypothèse H préenregistrée et présentée comme prédiction (cas de la cible C10 de `p1-recrutement`) |
| Cible de la proposition v3 corrigée par le cadre | la fiche suit le cadre §2.4 (p. ex. Wilson 1984 : ce sont les majors qui prennent la relève; Couzin et al. 2002 n'est pas un modèle de fourmis) |

## 9. ADEMP

Chaque fiche de projet contient un tableau ADEMP [Morris et al. 2019]; le gabarit de préenregistrement des études de simulation est ADEMP-PreReg [Siepe et al. 2024].

| Lettre | Question | À écrire |
|---|---|---|
| **A**ims | Quelle décision l'étude permet-elle? | but : réplication, docking, ou hypothèse H\<projet\>.\<n\> avec sa direction, sa taille d'effet minimale et son critère de réfutation |
| **D**ata-generating mechanisms | Comment les données sont-elles produites? | modèle (renvoi à l'ODD), facteurs et niveaux, plan factoriel complet ou partiel, conditions initiales, graines |
| **E**stimands | Quelles grandeurs vise-t-on? | grandeur, fenêtre de mesure, valeur publiée visée |
| **M**ethods | Quelles analyses? | TOST, conditions relationnelles, IC bootstrap, modèles mixtes, correction de multiplicité |
| **P**erformance measures | Comment juge-t-on? | écart à la valeur publiée, IC à 90 %, taux de critères satisfaits, **ES de Monte Carlo de chaque mesure**, n_sim justifié |

Exemple (M6, §3.3) :

| | |
|---|---|
| A | reproduire la fraction vers X et la durée de [Sumpter et Pratt 2009], k ∈ {1 ; 9} |
| D | M6 : n = 40, r = 0,02, p_x = 1, p_y = 0,5, T = 10, a = 0,1, m = 0,9; ordre de mise à jour comme facteur; 2 lectures de r |
| E | fraction finale vers X; durée jusqu'à l'engagement de tous les individus |
| M | TOST sur la différence à la valeur publiée; test de l'ordre de mise à jour à 3 ES |
| P | IC à 90 % de la différence; n requis; ES de Monte Carlo de la fraction (√(p̂(1 − p̂)/n)) |

Pour un volet LLM, D contient les facteurs de P7 (architecture, canal, format du message, modèle, paraphrase d'invite) et P les coûts (§13). Les protocoles préenregistrés, les études neutres et le partage du code et des données limitent les pratiques douteuses des études de simulation comparatives [Pawel et al. 2024, résumé seulement].

## 10. ODD

### 10.1 Règles

1. **Un ODD complet par modèle de référence** (couche 2) **et par modèle chorégraphique commun** (couche 3); un delta-ODD par variante de canal; l'ODD résumé va dans la note de recherche, l'ODD complet en annexe; la section S7 figure dans chaque fiche [`x-methodes`, M1, valeurs recommandées [I]].
2. Utiliser ODD, c'est reprendre les éléments tels que donnés, numérotation comprise [Grimm et al. 2020]. Citer [Grimm et al. 2006] et [Grimm et al. 2020]; ajouter [Grimm et al. 2010] pour les éléments renommés.
3. *Process overview and scheduling* : pseudo-code; ordre des processus et des agents; mise à jour immédiate (asynchrone) ou différée (synchrone) [Grimm et al. 2010].
4. *Input data* ne désigne ni les paramètres ni les valeurs initiales [Grimm et al. 2010]. Graine, horodatage et identifiant de modèle vont au **manifeste de run**, non à l'ODD.
5. *Submodels* : équations et algorithmes d'abord, puis tableau des paramètres (dimension, unité, valeur) [Grimm et al. 2010].
6. Modèle EDO ou SSA : les entités sont des populations; l'ordonnancement est un pas fixe (RK4) ou un temps continu (SSA).
7. Agent LLM : *Sensing* = observation sérialisée; *Adaptation* = appel de politique; *Learning* = mémoire du contexte; *Stochasticity* = échantillonnage et non-déterminisme de l'API [`x-methodes`, M1]. Les modules de décision se complètent par ODD+D [Müller et al. 2013].

### 10.2 Gabarit

```markdown
# ODD : <modèle> (<taxon, préréglage>), version <vN>, SHA <…>
Références : [Grimm et al. 2006]; [Grimm et al. 2020] (+ [Grimm et al. 2010] pour les éléments renommés)

## 1. Purpose and patterns
But; patrons d'évaluation (au moins trois, à deux niveaux : individu et colonie); fiches T<projet>.<n> liées.
Statut épistémique du modèle : Résultat reproduit | Modèle simplifié | Hypothèse de l'auteur | Analogie.

## 2. Entities, state variables and scales
Entités (individus, populations, environnement, canal); variables d'état avec unités; échelles de temps et d'espace.

## 3. Process overview and scheduling
Pseudo-code. Ordre des processus; ordre des agents (aléatoire | fixe | trié);
mise à jour synchrone (double tampon) ou asynchrone (permutation tirée du PRNG); pas fixe ou temps continu;
flux du PRNG par processus.

## 4. Design concepts
Basic principles; Emergence; Adaptation; Objectives; Learning; Prediction; Sensing; Interaction;
Stochasticity; Collectives; Observation. (« sans objet » si c'est le cas)

## 5. Initialization
Conditions initiales (valeurs, tirages); rodage.

## 6. Input data
Entrées externes (« aucune » si c'est le cas).

## 7. Submodels
Par sous-modèle : équations et algorithme; tableau de paramètres
(symbole | dimension | unité | valeur | source et statut de lecture | rôle); convention de chaque paramètre ambigu.

## S7. Calibration, simulation experiments, and model analysis
Calibration et vérification des sorties; corroboration; sensibilité; expériences : but, plages de paramètres,
pas de temps, durée, conditions d'arrêt, nombre de répétitions, variables observées, analyses statistiques.
```

Les onze noms de concepts sont la liste standard d'ODD; le dossier `x-methodes` n'en nomme que six : à recouper avec le texte de [Grimm et al. 2020].

### 10.3 Sensibilité (section S7)

[`x-methodes`, M4, valeurs recommandées [I]; Broeke et al. 2016; Saltelli et al. 2019] :
- **OFAT étendue** (au moins 10 niveaux par paramètre, au moins 10 répétitions) pour toute figure de mécanisme.
- **Global** quand k ≤ ~15 : Sobol' avec N ≥ 1 000 et IC bootstrap; k plus grand : criblage de Morris, puis Sobol' sur les paramètres retenus.
- Sortie = moyenne sur une fenêtre après rodage; sortie bimodale : probabilité de chaque mode.
- L'ordre de mise à jour est un facteur catégoriel de toute analyse.
- Les deux positions se concilient ainsi : OFAT pour les mécanismes, global pour attribuer la variance [`x-methodes`, §1 pt 5, [I]]; l'essai E0.3 (§16) le met à l'épreuve.

## 11. Confirmatoire et exploratoire; préenregistrement

### 11.1 Séparation

| | Confirmatoire | Exploratoire |
|---|---|---|
| Contenu | cibles de réplication gelées; hypothèses H\<projet\>.\<n\> et expériences E préenregistrées | pages interactives (niveau *Explorer*), balayages libres, analyses non prévues |
| Plan | déposé avant la première exécution confirmatoire | aucun plan figé |
| Analyse | script gelé (SHA) | libre, mais décrite |
| Multiplicité | Holm, α = 0,05 | Benjamini-Hochberg, q = 0,10, ou rien |
| Étiquette | « confirmatoire » + identifiant de l'enregistrement | « exploratoire » visible sur chaque page et chaque graphe |

Le cadre (principe 4) sépare les deux; les pages interactives sont déclarées exploratoires [audit méthodologie, C8]. Un résultat vu en exploratoire ne devient confirmatoire qu'après préenregistrement et nouvelle exécution sur de nouvelles graines : on distingue postdiction et prédiction [Nosek et al. 2018, résumé seulement]. Une hypothèse non préenregistrée est exploratoire, même si le résultat est net.

### 11.2 Quand et comment

- **Un enregistrement OSF par projet**, avant la première exécution confirmatoire [`x-methodes`, M8, [I]]. Version horodatée, en lecture seule; embargo possible jusqu'à quatre ans; une mise à jour est un processus transparent distinct; modèles disponibles : *OSF Preregistration*, *Open-Ended*, *Registered Report Protocol*, AsPredicted [OSF 2026, T\*].
- **Registered Report pour P7** : étape 1 = protocole, variance et coût du pilote (pilote de variance B0b de P7 (X20)); étape 2 = résultats, les analyses non prévues allant dans une section exploratoire [Chambers 2013; Chambers et Tzavella 2022; OSF 2026].
- **Études de simulation** : gabarit ADEMP-PreReg [Siepe et al. 2024].
- Les revues cibles offrant le format sont traitées dans `08-science-ouverte-ethique.md` (le format n'a pas été trouvé pour plusieurs revues cibles, négatif non démontrable [`x-methodes`, M8]).

### 11.3 Gabarit de préenregistrement

```markdown
# Préenregistrement : <projet>, version <vN>
Déposé sur OSF le <date> (lecture seule). SHA du dépôt <…>; des fichiers de scénario <…>; du script d'analyse <…>.
Aucune exécution confirmatoire avant le dépôt : <oui / non, détail>.

## 1. Portée
H<projet>.<n> et T<projet>.<n> couverts; liste de ce qui reste exploratoire.

## 2. Hypothèses
Par H<projet>.<n> : énoncé directionnel; taille d'effet minimale; critère de réfutation; lien avec la QR (03-plan-de-recherche.md).

## 3. ADEMP
Tableau du §9 du protocole.

## 4. Variables
VI, VD, contrôles (budget, longueur de message, effort, environnement, graines, fenêtre temporelle pour les LLM).

## 5. Plan d'échantillonnage
n par cellule; ES de Monte Carlo visée; puissance par simulation (entrées, résultat); pilote (n, variance mesurée);
plafond de coût; règle d'arrêt séquentielle éventuelle, avec n_max.

## 6. Graines et générateur
Graine maîtresse, PRNG et version, dérivation, plan apparié.

## 7. Analyse
Test et seuil par hypothèse; marges δ du TOST et leur justification; modèle mixte (effets aléatoires : run, paraphrase);
IC (méthode, rééchantillons); famille de multiplicité et procédure (Holm, α = 0,05).

## 8. Exclusions et attrition
Runs avortés; refus de classifieur (stop_reason "refusal") = issue codée; échec d'analyse = action nulle comptée;
aucune exclusion après coup.

## 9. Exécution LLM (si applicable)
Identifiants de modèle, effort, paramètres; fenêtre d'exécution; ordre des cellules randomisé; cellules sentinelles
et seuil de dérive; plan B en cas de retrait.

## 10. Déviations
Procédure : registre du §7.5 du protocole; toute déviation est rapportée dans la note.

## 11. Données et code
Dépôt, licences, DOI (08-science-ouverte-ethique.md); journaux archivés.

## 12. À confirmer au dépôt
Valeurs marquées [à confirmer].
```

## 12. Docking

### 12.1 Objet

Le docking aligne deux modèles (ou deux implantations) pour établir s'ils produisent les mêmes résultats [Axtell et al. 1996]. Le cadre (principe 6) écrit que le modèle chorégraphique commun est « validé contre chaque modèle de référence » : au sens du principe 1 du même cadre, c'est un **alignement par docking**, non une validation empirique. Trois usages : (a) modèle chorégraphique commun (couche 3) contre modèle de référence (couche 2); (b) deux implantations du même modèle (TypeScript et Python); (c) EDO contre SSA (X7, T0.7).

### 12.2 Procédure

1. Partir d'un modèle de référence dont la fiche est *satisfaite* (porte de réplication franchie).
2. Fixer les sorties communes, leurs unités, leur fenêtre et la normalisation du temps (les deux taxons n'ont pas les mêmes échelles [audit simulation-technique, m5]).
3. **Réduire B à A** : désactiver les composants de B absents de A, et vérifier l'alignement dès les premiers cycles [Edmonds et Hales 2003].
4. Comparer d'abord au niveau relationnel, puis au niveau distributionnel (§12.3).
5. **Ajouter un composant à la fois** (persistance, portée, adressage, format du canal) et refaire la comparaison; consigner l'effet de chaque ajout.
6. Tester l'ordre de mise à jour (§6.8) et la convergence en pas de temps et en grille.
7. Pour les modèles du socle, comparer à une seconde implantation indépendante (autre langage, autre programmeur) [Edmonds et Hales 2003].

### 12.3 Critère d'achèvement

| Composante | Critère |
|---|---|
| Relationnel | signes, ordre et monotonie des sorties identiques à ceux du modèle de référence. Exemple chiffré (X7, T0.7) : à σ < σ\* = 1,6875, P(\|A − B\|/N > 0,3) décroît avec N (0,445 à N = 50, 0,105 à N = 200); à σ = 10, elle tend vers 1 (0,950, puis 1,000) |
| Distributionnel | TOST sur chaque sortie primaire, avec une marge δ_dock au plus égale à la marge de la réplication de la référence [I] (les écarts se cumulent : B à δ_dock de A, A à δ de la publication); n selon §5.3; mêmes graines maîtres dans les deux modèles (`05-spec-simulation.md`), analyse appariée par graine |
| Implantations indépendantes | écart < 3 ES de Monte Carlo (exemple X6, T0.6 : 1,7 ES) |
| Pas de temps et grille | résultat inchangé à dt/2 et à Δx/2 [audit simulation-technique, M3] |
| Ordre de mise à jour | §6.8 |

Tant que le critère n'est pas satisfait, les résultats du modèle commun ne sont pas rapportés comme confirmatoires (porte de docking, §7.2).

### 12.4 Politique LLM contre règle

La condition « LLM exécutant la règle » (même modèle, règle explicite dans l'invite) sépare le suivi d'instructions du jugement [audit méthodologie, P7-c]. La règle et le LLM implantent la même interface `decide(observation) → action` et reçoivent la même observation sérialisée [audit simulation-technique, m9]. Mise en garde : dans [Rahman et al. 2025], le prompt contient la politique (phases explorer puis exploiter) : l'agent exécute la règle (`p7-agents-llm`, §12 question 2). Une hypothèse d'équivalence entre politique LLM et règle (voir la fiche P7) se teste par TOST (§5). À effectifs égaux, [Lakens 2017] donne 70 exécutions par groupe pour d = 0,5 et 191 pour d = 0,3. Quand le comparateur est une colonie à règles exécutée mille fois, la variance de la différence vaut σ²(1/n₁ + 1/n₂) et la cellule LLM n'en demande qu'environ la moitié [I] : la fiche P7 retient n = 40 pour une marge de ±0,5σ contre 1 000 runs à règles (36 suffisent; puissance ≈ 0,71 à 30, selon la table de la fiche P7). Les 30 exécutions par cellule du dossier P7 sont donc insuffisantes pour ce contraste; la marge d'une hypothèse d'équivalence se choisit en conséquence, sinon la conclusion reste « non concluante ».

## 13. Expériences LLM : évaluation statistique

### 13.1 Règles

| Élément | Règle | Source |
|---|---|---|
| Unité | le run (ou le couple scénario-instance); groupes : scénario et paraphrase; erreur standard groupée (éq. 4), appariée (éq. 7), appariée et groupée (éq. 8, facteur 1/n hors de la racine comme imprimé) | [Miller 2024, T] |
| Taille | pilote d'au moins 10 répétitions par cellule pour estimer E[σ²], Var(x) et ω²; K tel que E[σ²]/K ≈ Var(x); n par l'éq. 9 : n = (z_{α/2} + z_β)²(ω² + σ_A²/K_A + σ_B²/K_B)/Δ². Exemple vérifié (X8) : ω² = 1/9, Δ = 0,03, α = 0,05, puissance 80 % donnent n ≈ 969 | [Miller 2024]; `x-methodes`, M9 [I] |
| Intervalles | le théorème central limite sous-estime l'incertitude sous quelques centaines d'items : bootstrap sur les runs ou bayésien en dessous (le dossier P7 utilise 2 000 tirages bootstrap pour sa cible R8) | [Bowyer et al. 2025, résumé seulement] |
| Échantillonnage | `temperature` non réglable sur les modèles récents; pas de paramètre `seed`; même à température 0, résultats non entièrement déterministes. Ne pas toucher à la température pour réduire la variance : on augmente K | [Anthropic 2026a, T\*]; [Miller 2024, §3.3] |
| Non-déterminisme | jusqu'à 15 % de variation d'exactitude entre exécutions naturelles (cinq LLM, huit tâches, dix exécutions). Seuil de non-répétabilité à fixer après pilote : aucune valeur publiée n'est transposable (X20) | [Atil et al. 2024, résumé seulement] |
| Non-stationnarité | dérive d'un même service : identification de nombres premiers de GPT-4 passée de 84 % à 51 % entre mars et juin 2023. Les identifiants sont des instantanés figés, mais les retraits sont annoncés | [Chen et al. 2023]; [Anthropic 2026a] |
| Parades à la dérive | fenêtre d'exécution courte; cellules d'une comparaison entrelacées en blocs aléatoires dans le temps; **cellule sentinelle** à graines fixes rejouée chaque semaine, dérive déclarée si son score sort de l'IC à 95 % du pilote; `response.model`, date, région et `usage` journalisés | `p7-agents-llm`, §7.4 |
| Paraphrases d'invite | facteur aléatoire croisé; au moins 3 [I]; les variations de format font varier l'exactitude jusqu'à 76 points (LLaMA-2-13B); invites figées et hachées avant les runs, développement sur un jeu pilote distinct | [Judd et al. 2012]; [Sclar et al. 2024, résumé seulement]; audit méthodologie, P7-d |
| Modèles mixtes | effets aléatoires du run et de la paraphrase; structure aléatoire maximale justifiée par le plan; `lme4`; puissance par `simr` | [Barr et al. 2013]; [Bates et al. 2015]; [Green et MacLeod 2016] |
| Interactions | la question centrale de P7 est une interaction (architecture × modèle). L'ES d'un contraste d'interaction vaut 2 fois celle d'un effet principal dans un plan 2×2 équilibré : 4 fois plus de runs si l'interaction égale l'effet principal [I], 16 fois si elle en vaut la moitié | [Gelman 2018, S]; `x-methodes`, X15 |
| Multiplicité | Holm pour les contrastes confirmatoires (environ 6 dans le dossier P7); Benjamini-Hochberg en exploratoire | [Holm 1979]; [Benjamini et Hochberg 1995] |
| Fiabilité | pass^k = E_tâche[C(c, k)/C(n, k)], k ∈ {1, 3, 5}, pour les issues binaires | [Yao et al. 2024] |
| Refus et basculements | `stop_reason: "refusal"` = issue codée; l'attrition différentielle entre modèles est préenregistrée; **pas de *fallbacks*** côté serveur ni client (ils changent de modèle en cours d'expérience) | `p7-agents-llm`, §7.3; audit simulation-technique, m6 |
| Annotation des échecs | taxonomie MAST; κ ≥ 0,70 entre deux annotateurs sur 30 traces avant d'utiliser un juge LLM, puis κ du juge ≥ 0,70 sur 30 autres (proposition du dossier P7; publiés : 0,88 entre humains, 0,77 pour le juge) | [Cemri et al. 2025] |
| Coût | rapporter jetons, appels et dollars par cellule; front de Pareto exactitude-coût; comparaison aussi à coût égal. Le budget de jetons est un confondant de premier ordre (système multi-agents : environ 15 fois les jetons d'une conversation; 80 % de la variance de performance sur BrowseComp) | [Kapoor et al. 2025]; [Hadfield et al. 2025] |

Précédent à ne pas répéter : un ACO piloté par LLM avec 10 fourmis, 1 000 pas, **5 exécutions** et température 0 [Jimenez-Romero et al. 2025; audit méthodologie, C10].

### 13.2 Gain collectif G

Le cadre §4 définit G = (P_coll − P_ref)/(P_max − P_ref), à budget égal, avec trois références préenregistrées. Ce rapport est instable quand P_max est proche de P_ref [`x-methodes`, §7 pt 4, [I]] : on rapporte **aussi** la différence appariée P_coll − P_ref avec son IC, et l'IC de G par bootstrap sur les runs à graines appariées. P_max est défini dans `03-plan-de-recherche.md`. On décompose en agrégation (effet du vote) et interaction (effet de la communication) [Choi et al. 2025a]. Pour le gain d'interaction, toutes les comparaisons sont appariées sur l'instance d'environnement (même graine, mêmes sources, mêmes perturbations) (`p7-agents-llm`, §6.1).

### 13.3 Contrôle de plateforme avant toute campagne

Le cadre (§2.4, point 16; §10) impose de revérifier ces faits avant exécution. État au 2026-10-01 [Anthropic 2026a, T\*; Anthropic 2026b] :
- [ ] Identifiants exacts et disponibilité : Haiku 4.5 (`claude-haiku-4-5-20251001`), retrait « pas avant le 2026-10-15 » (date provisoire); Sonnet 4.5 déprécié le 2026-09-30, retrait le 2026-11-30; préavis d'au moins 60 jours. Collecter Haiku 4.5 en premier s'il est utilisé; aucune dépendance à Sonnet 4.5.
- [ ] `temperature` laissée à la valeur par défaut; effort et mode de réflexion fixés et consignés; `fallbacks` désactivés.
- [ ] Tarifs reconfirmés (la source locale date du 2026-09-25 [Anthropic 2026b]); cumul du rabais de lot et du cache [à confirmer].
- [ ] Journal JSONL complet par appel : `run_id`, hachage du scénario, graine, pas, `agent_id`, modèle demandé, `response.model`, effort, requête et réponse complètes (`content`, `stop_reason`, `usage`), latence, coût, version du SDK, horodatage [audit simulation-technique, M17].
- [ ] Pilote réalisé, plafond de coût par bras fixé.
- [ ] Fenêtre d'exécution, ordre randomisé des cellules et cellule sentinelle déclarés au préenregistrement.

### 13.4 Cibles de réplication LLM : niveau relationnel

Les modèles d'origine (gpt-3.5, Llama, Claude-3.5) ne sont plus disponibles à l'identique : on reproduit des relations (ordre, signe, forme), sauf pour les identités mathématiques (`p7-agents-llm`, §5). Les identifiants R1, R5… ci-dessous sont ceux du dossier; la fiche P7 leur attribue des T7.n.

| Cible du dossier | Critère (tolérances proposées par le dossier) |
|---|---|
| R1 [Ashery et al. 2025] | Haiku 4.5 et Sonnet 5.5 : ≥ 18 exécutions sur 20 au consensus au plus tard à la ronde 20 (15 + 5 de tolérance); médiane rapportée avec IC bootstrap |
| R5 [Choi et al. 2025a] | reproduite si l'IC à 95 % de G_interaction (débat moins vote, à appels égaux) contient 0 ou est négatif, sur 200 items × 3 graines; sinon conflit avec R4 [Du et al. 2024] à documenter |
| R7 [Rahman et al. 2025] | (a) avec consignes de phase : ≥ 90 % de choix du chemin court au dernier tiers (30 essais × 18 itérations); (b) **sans** consignes : on rapporte le résultat, le prompt contenant la politique étant un confondant |
| R9 [Chen 2026] | identité : précision du vote ≤ 1 − β; toute violation signale une erreur de code (test automatique) |

### 13.5 Journal et rejeu

Un run LLM est **rejouable, non ré-exécutable** après le retrait d'un modèle ou sans paramètre `seed` : la note de recherche le dit. Le rejeu se fait par cassette (la réponse journalisée est servie, indexée par run, pas, agent et hachage de la requête; un hachage différent signale une divergence du moteur). Les pages rejouent; elles n'appellent jamais l'API [audit simulation-technique, M17]. Les conditions d'utilisation d'Anthropic sur la republication des journaux n'ont pas été lues : à lire avant tout dépôt (`08-science-ouverte-ethique.md`).

### 13.6 Cas des identités et des formules

Les identités mathématiques (Condorcet à 10⁻¹², identité de diversité à 10⁻¹² en erreur absolue, plafond 1 − β) se testent comme des vérifications de code et non par TOST : cibles T8.3 et T8.5 de `p8-individu-colonie`, R9 de `p7-agents-llm`.

### 13.7 Tailles retenues par le dossier P7

30 exécutions par cellule LLM (n = 29 pour d = 0,74, 63 pour d = 0,5, 25 pour d = 0,8, 16 pour d = 1,0; α = 0,05 bilatéral, puissance 0,8, échantillons indépendants) et 1 000 par cellule pour les agents à règle; 40 pour les contrastes clés si le pilote donne d < 0,8 (`p7-agents-llm`, §7.1; calcul du dossier [I]). Ces tailles servent à *détecter* une différence; pour *établir* une équivalence, voir §5.3 et §12.4 (la fiche P7 passe à 40 exécutions pour ses contrastes d'équivalence).

## 14. Note de recherche

### 14.1 Statuts épistémiques

Chaque énoncé de transposition et chaque graphe porte l'un des quatre statuts du cadre (principe 7). Une transposition d'un taxon vers les agents ne porte que *Analogie* ou *Hypothèse de l'auteur* (`10-glossaire.md`); les deux autres statuts qualifient des résultats de modèle. Critères d'attribution [I] :

| Statut | Critère | Mention obligatoire |
|---|---|---|
| *Résultat reproduit* | la fiche de la cible est *satisfaite* à son niveau (porte de réplication franchie) | niveau, n, IC, source |
| *Modèle simplifié* | résultat d'un modèle dont les simplifications sont listées dans l'ODD; vaut pour le modèle, non pour l'organisme | simplifications principales |
| *Hypothèse de l'auteur* | énoncé non testé, ou testé en exploratoire seulement, ou hypothèse H non encore confirmée | ce qui permettrait de trancher |
| *Analogie* | correspondance structurelle biologie-agentique sans test de transfert | limite de l'analogie |

Un énoncé sans statut n'est pas publié. « La reine ne commande pas » reste un constat biologique borné, jamais une prescription d'architecture (cadre §2.1).

### 14.2 Gabarit

```markdown
# <Titre>
**Identifiant :** note <projet P<k>>-<n> · **Date** · **SHA du dépôt** · **DOI de version et SWHID** (08-science-ouverte-ethique.md)
**Statut épistémique global :** …

## 1. Résumé
Question, méthode, résultat principal avec IC, limite principale.

## 2. Question et hypothèses
QR; H<projet>.<n> (direction, effet minimal, critère de réfutation); lien vers le préenregistrement.

## 3. Cibles de reproduction
| T<projet>.<n> | source [Nom année] | niveau | critère | résultat avec IC | décision | statut de lecture |

## 4. Modèle et plan
ODD résumé; ADEMP; renvois aux annexes.

## 5. Résultats confirmatoires
Par hypothèse : estimation, IC, p ajusté (Holm), ES de Monte Carlo, coût.

## 6. Résultats exploratoires (étiquetés)

## 7. Écarts au plan et à la source
Extrait du registre : identifiants, type, effet sur la validité.

## 8. Transposition agentique
Chaque énoncé : statut épistémique; appui [Nom année]; limite de l'analogie.

## 9. Limites et portée
Réplication et validation distinguées; taxon et préréglage; échelle; non-stationnarité des LLM;
ce que le résultat ne dit pas (des insectes, des produits).

## 10. Reproductibilité
Commande de rejeu; manifestes de run; graines; versions (Node, TypeScript); journaux (DOI); licences.

## Annexes
ODD complet; fiches T<projet>.<n> gelées; registre des déviations; préenregistrement; journaux et cassettes.
```

## 15. Liste de contrôle d'une reproduction réussie

**Avant le code**
- [ ] Fiche complète (champs 1 à 14), gelée par un commit dont le SHA est noté.
- [ ] Chaque étiquette de source existe dans `11-bibliographie.md`, avec son statut.
- [ ] Paramètres lus [T] ou [T\*]; sinon la cible est déclarée provisoire ou bloquée.
- [ ] Figure numérisée : CSV versionné, incertitude de lecture notée.
- [ ] Niveau, critère, marge, n et graines écrits avant le code; n au moins égal au plancher (§6.4) et au n requis (§5.3).

**Code**
- [ ] `npm run verify` de `05-spec-simulation.md` sort à 0 (cibles T0.n comprises).
- [ ] Aucun `Math.random` ni `Date.now` dans la logique de simulation (contrôle par `grep`).
- [ ] Unités physiques; pas de temps découplé du rendu; constantes dérivées en littéraux dans le scénario.
- [ ] ODD complet; ordre de mise à jour déclaré et testé une fois.

**Exécution**
- [ ] Runs sur le moteur de référence (Node, version figée); un manifeste par run (graine, SHA, scénario, version du moteur).
- [ ] Liste de graines gelée, aucun re-tirage; runs échoués consignés avec leur cause.
- [ ] ES de Monte Carlo rapportée et au plus égale à la cible.

**Décision**
- [ ] Chaque critère évalué selon la règle de la fiche; IC à 90 % et bornes rapportés; « non concluante » déclarée telle.
- [ ] Aucun paramètre ajusté sur la cible de test (§7.3).
- [ ] Déviations au registre, effet évalué; décision go, go conditionnel ou no-go consignée par le chercheur.

**Après**
- [ ] Docking fait si le modèle commun l'exige (§12).
- [ ] Séparation confirmatoire et exploratoire visible; préenregistrement déposé avant toute expérience E confirmatoire.
- [ ] Note de recherche : statuts épistémiques, limites, réplication distinguée de la validation.
- [ ] Archivage : dépôt public, DOI de version, SWHID, journaux (`08-science-ouverte-ethique.md`).
- [ ] Rejeu depuis le manifeste et la graine : résultat identique sur le même moteur [audit simulation-technique, M12].

## 16. Identifiants définis, risques de méthode, tensions et points à trancher

### 16.1 Identifiants définis ici

| ID | Définition |
|---|---|
| H0.1 (S0) | L'ordre de mise à jour (synchrone, asynchrone) n'a pas d'effet sur les sorties de M6 de [Sumpter et Pratt 2009] : écart < 3 ES de Monte Carlo sur la fraction vers X et sur la durée, à k = 1 et à k = 9, 1 000 runs par condition. Réfutée si l'écart atteint 3 ES sur l'une des quatre sorties. Pilote exploratoire (X17) : non réfutée; à refaire en confirmatoire sur le moteur de référence |
| E0.3 (S0) | Comparer OFAT étendue, criblage de Morris et Sobol' sur M1 avec un même paramétrage (γ, α, ρ, σ, N) pour trancher entre [Broeke et al. 2016] et [Saltelli et al. 2019]. Achèvement : tableau du classement des paramètres par méthode, avec le coût en exécutions; §10.3 révisé si les classements divergent (`x-methodes`, question ouverte 17) |
| X20 → P7 (lot B0b) | Pilote de variance des agents LLM : au moins 10 répétitions par cellule; mesure du coefficient de variation entre exécutions d'une configuration identique, de E[σ²], Var(x), ω²; en tirer K et n. Achèvement : seuil de non-répétabilité écrit dans le préenregistrement de P7 avant la campagne (X20) |

Les cibles de vérification du socle (`T0.n`) sont définies par la fiche S0 et détaillées dans `05-spec-simulation.md`, non ici (§6.9). Les risques de méthode occupent la plage R60 à R69 (§16.2), locale à ce document. À la validation finale, les identifiants HS0.1, ES0.1, ES0.2 et TS0.n de la première version ont été alignés sur la fiche S0 : H0.1, E0.3, pilote de variance B0b de P7 (X20) et T0.n = Xn.

### 16.2 Risques de méthode

Plage R60 à R69 réservée à ce document, à fusionner dans le registre de `09-feuille-de-route.md`.

| ID | Risque | Signal | Parade |
|---|---|---|---|
| R60 | Source inaccessible ou paramètres non confirmés | fiche bloquée ou provisoire | §3.1; accès, matériel supplémentaire, auteurs |
| R61 | Marge TOST intenable au budget (M6 : ≈ 7 920 par bras pour ±2 points) | n requis > n_max | §5.3 |
| R62 | Critère ou marge changé après avoir vu les résultats | écart entre la fiche gelée et l'analyse | gel par commit; registre (§7.5) |
| R63 | Paramètre ajusté sur la cible de test | calage et test sur les mêmes graines ou la même cible | §7.3 |
| R64 | Dérive de plateforme ou retrait de modèle (Haiku 4.5, Sonnet 4.5) | sentinelle hors de l'IC; avis de retrait | §13.1 et §13.3 |
| R65 | Divergence entre moteurs JavaScript (fonctions `Math`) | trace dorée invalide hors du Node figé | §6.7 |
| R66 | Artefact d'ordre de mise à jour | écart ≥ 3 ES entre synchrone et asynchrone | §6.8 |
| R67 | Sous-puissance de l'interaction de P7 (×4 à ×16) | n requis hors budget | §13.1; plafond de coût |
| R68 | Coquille de la source prise pour un échec de code | écart localisé à un point isolé | §7.4, étape 7 |
| R69 | Page interactive lue comme une preuve | absence d'étiquette « exploratoire » | §11.1 |

### 16.3 Tensions avec le cadre (le cadre prime : aucune n'est tranchée contre lui)

| # | Point du cadre | Tension | Traitement ici |
|---|---|---|---|
| 1 | Principe 3 : « alignement relationnel » | étiquette de Wilensky et Rand 2007; le manuscrit d'Axtell et al. 1996 écrit « équivalence relationnelle » | terme du cadre conservé, provenance donnée (§4.1) |
| 2 | Principe 6 : « validé contre chaque modèle de référence » | en tension avec la distinction réplication-validation du principe 1 | « aligné par docking » (§12.1); reformulation du cadre suggérée |
| 3 | §4 : gain G | rapport instable quand P_max ≈ P_ref; P_max non défini | différence appariée et IC bootstrap ajoutés (§13.2); P_max à définir dans `03-plan-de-recherche.md` |
| 4 | Principe 3 : marge TOST et nombre de répétitions | les critères du dossier P5 (G1 : ±2 points, ±10 % à 1 000 runs) ne sont pas des TOST valides | §5.3 relie n et δ |
| 5 | Principe 3 : critère d'acceptation | des dossiers acceptent par non-rejet (P2, C8 : Mann-Whitney p > 0,05) | conversion en TOST (§4.3) |
| 6 | Principe 3 : deux niveaux | les cibles déterministes et les identités ne se jugent pas par un test statistique, et le cadre ne les nomme pas | catégorie « identité numérique à tolérance (déterministe) » (§4.1 et §4.4), comme dans les fiches de projet; sans contredire le cadre |
| 7 | §2.4 point 16 et §10 : paramètres LLM | Sonnet 4.5 déprécié le 2026-09-30, retrait le 2026-11-30, absent du cadre | §13.3 |

### 16.4 Points à trancher, avec ce qui permettrait de trancher

| Point | Ce qui trancherait |
|---|---|
| Lecture de r et sens du « ± » de [Sumpter et Pratt 2009] | code ou matériel supplémentaire des auteurs; question aux auteurs |
| Marges δ et n_max par cible | numérisation de chaque figure (champ 6), puis choix du chercheur selon le budget de calcul |
| Seuil de non-répétabilité LLM | pilote pilote de variance B0b de P7 (X20) |
| Textes non lus : Lakens 2024 (chapitre 13), Lakens et al. 2018, Morris et al. 2019 (numérotation), Grimm et al. 2020 (liste des concepts) | accès institutionnel ou préimpressions |
| Protocole OPE de [Planque et al. 2022] [non vérifiée] | lecture du texte publié avant toute adoption (non utilisé ici comme norme) |
| Conditions de republication des journaux d'appels | lecture des conditions d'utilisation d'Anthropic (voir `08-science-ouverte-ethique.md`) |
| Revues offrant le Registered Report | lignes directrices aux auteurs ou courriel aux éditeurs (voir `08-science-ouverte-ethique.md`) |
| Nomenclature des portes : types fonctionnels ici (lecture, code, réplication, docking, extension), lettres A à E ou PR-0 à PR-6 dans les fiches de projet, « porte C » et « porte D » dans `08-science-ouverte-ethique.md` (autre sens), « porte 0 » dans `05-spec-simulation.md` | harmonisation dans `09-feuille-de-route.md` (correspondance type par type) |
| Identifiants du socle | résolu à la validation finale : alignement sur H0.n, T0.n, E0.n de la fiche S0 |

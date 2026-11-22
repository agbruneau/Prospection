# Charte éditoriale, narrative et typographique — Volume 8 (v1.0)

Cette charte gouverne tous les agents rédacteurs, réviseurs, illustrateurs et lisseurs du manuel *Ingénierie exécutable de l'entreprise agentique* — *Manuel de spécifications testables, harnais 80/20, médiation MCP/A2A, délégation bornée, politiques OPA hors modèle, sémantique d'effet Saga et suite EvalOps vérifiable (non-avis)* (crédit d'auteur : **André-Guy Bruneau, M.Sc IT** ; parution visée : **janvier 2027** ; date de gel des faits : **2 décembre 2026**, `2026-12-02`). Son objectif est de produire un **manuel d'ingénierie analytique concis, rigoureux, fluide et directement actionnable**, articulé autour de contrats exécutables sans jamais dégénérer en déversement de code brut ni en catalogue bureaucratique d'exigences.

---

## 1. Posture et voix d'écriture

1. **Registre** : manuel d'ingénierie analytique en **français canadien** soutenu, précis et limpide, directement lisible au Québec, au Canada francophone et en Europe francophone, tout en conservant en anglais les termes techniques, commandes et identifiants de code établis (`MCP`, `A2A`, `OPA`, `Rego`, `JSON Schema`, `ML-DSA`, `SLH-DSA`, `OTel`, `FOCUS`, `pytest`).
2. **Ton et distinction des quatre registres épistémiques** : écriture sobre, factuelle et incisive, dénuée de superlatifs commerciaux. Chaque affirmation distingue toujours explicitement :
   - **le mesuré empirique** : ce qu'une étude publiée ou une mesure ouverte a observé (en précisant le devis, l'échantillon, le statut — article évalué par les pairs, prépublication ou rapport technique ouvert — et sa limite) ;
   - **le normatif ou réglementaire** : ce qu'une spécification technique datée (`RFC`, `NIST FIPS`, `MCP`, `A2A`, `OTel`, `FOCUS`), une loi ou une autorité (`Loi 25`, `BSIF E-23`/`B-10`, `EU AI Act`, `DORA`, `EN 18286:2026`) prescrit (en nommant la version épinglée, la juridiction, l'état — ratifiée vs *Internet-Draft* vs stade `Development` — et les éventuelles réserves `statut F`) ;
   - **l'architectural ou heuristique** : ce qui relève d'une déduction d'ingénierie, d'une heuristique de la collection (p. ex. la partition `80/20`, la Règle de deux) ou d'une recommandation de prudence ;
   - **le vérifié sur banc synthétique hors modèle (`DC-P12`)** : ce qui est démontré par exécution déterministe dans `8 - Trousse/` (doublures hermétiques `mock MCP servers`, comptage exact d'octets `HTTP 431`, injection de fautes Saga, essais `pass^k`/Wilson), explicitement borné comme preuve logicielle hors modèle sans étude de cas humaine, sans essai sur un `SoR` réel et sans valeur d'avis juridique ni de certification (`AO-05`).
3. **Constats d'absence datés** : toute affirmation négative (« aucune étude arbitrée ne mesure… », « aucun champ normatif ne couvre… ») est explicitement rattachée à la date de gel des faits arrêtée au **2 décembre 2026** (`2026-12-02`) et à l'étendue du corpus ouvert `L+` qui la fonde.
4. **Échéances postérieures au gel (`2027+`)** : toute échéance de `2027` et au-delà (`12 janvier 2027`, `15 mars 2027`, `30 mars 2027`, `1er mai 2027`, `28 juillet 2027`, `2 août 2027`, `2 septembre 2027`, `2 décembre 2027`, `15 mars 2029`) est écrite au futur comme une échéance à venir, en distinguant règle adoptée, jalon interne et spécification attendue ; jamais au passé ni comme un acquis observé.
5. **Scénarios illustratifs (`AO-07`)** : toute mise en situation non documentée est explicitement annoncée comme telle (« Imaginons… », « Scénario illustratif : … »), ne comporte aucun chiffre présenté comme mesuré en production réelle et ne sert jamais de prémisse à une conclusion empirique.
6. **Barre stylistique française de référence (pour `gauntlet-loop` en `G4`)** : extraits en français exempts de codes matriciels internes, tirés de *Compendium 2027* (déclarés dans `manifest.json`) :
   - `3 - Compendium 2027` — *Ouverture* (`00 - Ouverture`), sections `0.1` et `0.2` (rythme net, phrases de longueur maîtrisée, clarté argumentative, rejet des clichés promotionnels) ;
   - `3 - Compendium 2027` — *Chapitre 48 — Revue de littérature*, sections `48.4` et `48.8` (discipline épistémique, séparation stricte entre mesuré, débattu et non démontré).
   Aucun texte en anglais n'entre dans la comparaison à l'aveugle, afin de préserver l'anonymat parfait devant le critique.

---

## 2. Architecture interne obligatoire des unités narratives

### 2.1 Unité `00 — Liminaire` (`3 500` mots, plage `3 220 – 3 780` mots)

L'unité `00 — Liminaire` fonde le passage de la spécification en prose au contrat exécutable testé en `G0`. Elle comporte **sept éléments obligatoires** :

1. **Exergue et ouverture narrative par le réel (`250 à 450 mots`)** : `*Question directrice : <question précise du toc.md>*`, suivie d'un récit concret — documenté ou explicitement présenté comme scénario illustratif (`AO-07`) — exposant pourquoi une exigence rédigée en prose seule laisse passer en production une dérive silencieuse d'outil `MCP`, une saturation d'en-tête `ML-DSA` ou une faute de compensation Saga.
2. **Six sections analytiques et méthodologiques (`0.1` à `0.6`)** conformes aux intitulés exacts de `toc.md` :
   - `0.1` Du référentiel normatif à l'exigence de preuve exécutable ;
   - `0.2` Table canonique de passage et résolution des cinq discordances inter-volumes ;
   - `0.3` Architecture bicéphale du Volume 8 : manuel concis et dépôt compagnon `8 - Trousse/` ;
   - `0.4` Logique des deux parties, quatre modules Python/OPA et parcours de lecture par rôle (`AS` et intégration, Plateforme et `SRE`, `IAM`/`NHI` et sécurité hors modèle, `EvalOps`/`QA` et valideurs `2e`/`3e` ligne) ;
   - `0.5` Hygiène probatoire au gel du `2 décembre 2026`, vecteurs tiers et frontière hors modèle `DC-P12` ;
   - `0.6` Colophon d'intégrité 100 % agentique `G0–G5` et clause `non-avis` (`AO-05`), incluant le crédit fixe **André-Guy Bruneau, M.Sc IT**, les licences `CC BY 4.0` (manuel et figures) et `MIT` (`8 - Trousse/` et outillage), ainsi que la politique de dépôt figé et de `lockfile`.
3. **Table canonique unique des cinq discordances inter-volumes (en `0.2`/`0.3`)** : **unique tableau du liminaire (`CA-05`)**, levant explicitement les cinq divergences relevées entre les volumes `1` à `7` :
   1. échelle `L0–L4` (`Vol. 3` / `Vol. 6` `L0` déterministe sans IA vs `Vol. 7` `L0` lecture et synthèse par IA) ;
   2. taxonomies d'actions et classes (`N0–N4`, `P0–P3`, `Classes 1–6` dans `Vol. 2` vs `R1–R4` dans `Vol. 6`) ;
   3. homonymie des « `4 plans` » (`4 plans` du système d'information en `Vol. 6` vs `4 plans` du noyau possédé en `Vol. 7` vs `6 couches + 3 plans` en `Vol. 2` / `5 couches + 3 volets` en `Vol. 5`) ;
   4. notation `ArchiMate 3.2` (`Vol. 6`) vs `ArchiMate 4.0` (`Vols 1, 5`) ;
   5. version `MCP` (`2026-07-28` sans état dans `Vols 1–6` vs `2025-11-25` avec état dans `Vol. 7`).
   La table consigne la convention normative retenue pour le Volume 8 (`MCP 2026-07-28`, échelle `L0–L4` graduée par droits de mutation). Aucun autre tableau n'est toléré dans le liminaire.
4. **Figure inaugurale (`Fig-00`, `PlantUML .svg`)** commentée dans la prose de `0.2`–`0.3`, suivie de sa légende `*Figure 0 — ...*`, synthétisant l'architecture bicéphale du manuel, des quatre modules de `8 - Trousse/`, de l'unique moteur `OPA / Rego` et des six barrières `G0–G5`.
5. **Encadré méthodologique (en `0.3` ou `0.5`)** intitulé `> **Cinq critères permanents d'évaluation et de preuve exécutable**` fixant la grille appliquée aux contrats du livre (fidélité à la source ouverte `L+` épinglée, déterminisme portable à `exit 0`, refus par défaut et couverture négative, traçabilité `SHA-256` et étanchéité Oracle ≠ Bâtisseur, isolement adaptateur contre la dérive post-gel).
6. **Ancrage factuel complet** : chaque affirmation empirique, normative, chronologique ou issue de `G0` porte son renvoi `[n]` vers `sources/ch00-sources.md` (ou son ancre `aq/rapports-g0.json`) et passe la barrière Wyvern `G2` (`ancrage/ch00-ancrage.md`).
7. **Transition vers la Partie I** : un court paragraphe final, sans encadré « Trois invariants exécutables », conduisant vers le Chapitre 01.

### 2.2 Chapitres `01` à `04` (cinq mouvements par chapitre)

Chaque chapitre (`Ch. 01` à `Ch. 04`, respectivement `8 000`, `8 500`, `8 000` et `7 000` mots à \(\pm 8\ \%\)) suit cinq mouvements continus :

1. **Chapeau et ouverture concrète (`300 à 500 mots`)** :
   - Exergue exacte sous le titre : `*Question directrice : <question précise du toc.md>*`.
   - Trois à quatre paragraphes narratifs sans sous-titre posant un cas d'ingénierie concret, un échec mesuré dans le corpus ou un scénario illustratif balisé (`AO-07`) qui justifie les contrats exécutables du chapitre.
2. **Quatre sections analytiques numérotées (`X.1` à `X.4`)** :
   - Les intitulés exacts de `toc.md` sont respectés.
   - Le propos progresse en paragraphes construits (`90 à 180` mots en moyenne ; plafond bloquant à `180` mots ; phrases `≤ 70` mots). Les listes à puces sont réservées aux énumérations parallèles (`3 à 5` items maximum) et ne dépassent pas **`25 %` des lignes** de l'unité (`CA-05`).
3. **Intégration des preuves et insertion mécanique des extraits de code `≤ 40` L (`CA-G0-SYNC` / `CA-20`)** :
   - Chaque fait porte son renvoi `[n]` vers `sources/chNN-sources.md` (`01` à `04`) ; les auteurs et spécifications de référence sont nommés dans la phrase ; les citations textuelles courtes (`≤ 40` mots) sont placées entre guillemets français `« … »` et suivies de `[n]`.
   - Les identifiants techniques autorisés (`EXIG-*`, `CAP-*`, `ADR-*`, `POR-*`, `PRR`, `SBB`, `C01–C40`) sont introduits avec leur rôle fonctionnel exact en concordance avec `registre/matrice-exig-prr-c40.json` (`CA-07`).
   - **Règle impérative d'insertion des extraits de code (`AO-08` & `CA-G0-SYNC`)** :
     * aucun bloc de code ou contrat clôturé n'est tapé ni édité à la main dans le manuscrit ;
     * chaque extrait inséré compte **au plus `40` lignes**, provient mécaniquement d'un fichier réel du module correspondant dans `8 - Trousse/` (`harness-proto/`, `authz-pqc-audit/`, `policy-saga/`, `evalops-prr/`, `policies_opa/`, `schemas/`) ayant passé `G0` à `exit 0` ;
     * chaque bloc porte la balise ou référence normalisée d'extraction (fichier source dans `8 - Trousse/`, plage de lignes et empreinte `SHA-256` conforme à la syntaxe définie dans `architecture-trousse-g0.md`), vérifiée octet pour octet par `verifie_manuscrit.py` contre `aq/rapports-g0.json` ;
     * chaque extrait est précédé d'une phrase précisant son objet architectural et suivi d'un commentaire analytique exposant les invariants, cas limites et vecteurs négatifs qu'il couvre (sans paraphraser la syntaxe ligne par ligne).
4. **Deux figures commentées et au plus trois tableaux par chapitre (`CA-04`, `CA-05`, `CA-08`)** :
   - Chaque chapitre inclut exactement **deux figures** dans l'ordre du `toc.md` (`Fig-01`/`Fig-02` en Ch. 01, `Fig-03`/`Fig-04` en Ch. 02, `Fig-05`/`Fig-06` en Ch. 03, `Fig-07`/`Fig-08` en Ch. 04). Chaque figure est annoncée dans le paragraphe précédent, suivie immédiatement de sa légende en italique `*Figure N — ...*`, puis commentée en trois à cinq phrases.
   - Maximum **trois tableaux par chapitre** (`CA-05`), titrés avec préfixe de chapitre (`*Tableau X.Y — ...*`), réservés aux bilans d'exécution `G0`, aux matrices de vecteurs ou aux comparaisons multidimensionnelles.
5. **Clôture décisionnelle (`250 à 400 mots`)** :
   - Un encadré unique intitulé exactement `> **Trois invariants exécutables — Chapitre X**` synthétisant trois invariants vérifiables en `G0` et actionnables par l'équipe d'ingénierie.
   - Un court paragraphe final assurant la liaison logique vers le chapitre suivant (ou vers les Annexes A et B à la fin du Chapitre 04).

---

## 3. Liste noire mécanique (`CA-02`) et plafonds de densité (`CA-05`)

Toute apparition dans le liminaire ou les chapitres `01` à `04` d'un motif banni déclaré dans `forbidden_prose_regexes` de `manifest.json` déclenche un échec immédiat de la barrière `G1` (`verifie_manuscrit.py`).

### 3.1 Marqueurs interdits vs identifiants techniques autorisés (`AO-03` / `CA-02`)

- **Motifs maintenus en liste noire (strictement interdits dans la prose narrative)** :
  - Marqueurs bruts d'audit entre crochets : `\[S\]`, `\[D\]`, `\[A\]`, `\[M\]`, `\[N\]`, `\[L\+\]`. *(Le statut épistémique et la portée d'une preuve s'expriment en français clair dans la phrase ; la codification documentaire complète figure uniquement en Annexe A.)*
  - Classifications internes non définies pour le lecteur : `\bClasse [1-6]\b`, `\bStade [0-4]\b`, `\bPalier [1-3]\b`.
  - Identifiants de feuille de route, de veille ou d'extensions hors périmètre `A'` : `\bANC-\d{3}\b`, `\bINI-\d{3}\b`, `\bPEX-\d{2}\b`, `\bSIG-\d{3}\b`, `\bDIV-\d{2}\b`.
- **Identifiants techniques explicitement autorisés (adaptation Volume 8)** :
  - Les identifiants de spécification et de traçabilité **`EXIG-*`**, **`CAP-*`**, **`ADR-*`**, **`POR-*`**, **`PRR`** (`PRR-75`, `24 [BLOQUANT] PRR`), **`SBB`** (`5 SBB`) et **`C01–C40`** sont **retirés de `forbidden_prose_regexes`** dans `manifest.json` et `verifie_manuscrit.py` (`_check_ca02_unit`). Leur emploi est autorisé en prose et en tableau lorsqu'ils renvoient aux contrats exécutables de `8 - Trousse/` et concordent avec `registre/matrice-exig-prr-c40.json`.

### 3.2 Formules creuses et tics de génération (`CA-02`)

- Expressions bannies : *« Dans un monde en constante évolution »*, *« À l'ère du numérique »*, *« Il convient de souligner que »*, *« Force est de constater que »*, *« En conclusion, nous avons vu que »*, *« changement de paradigme révolutionnaire »*, *« synergie holistique »*.

### 3.3 Défauts éditoriaux surveillés en `G4` et `G5`

- Titres à deux-points empilés au-delà d'un seul sous-segment explicatif.
- Transitions génériques interchangeables d'un chapitre à l'autre.
- Commentaires qui paraphrasent mécaniquement un extrait `≤ 40` L sans expliquer les garanties d'invariant ni les cas d'échec refusés par le test.

### 3.4 Plafonds mécaniques de densité et de format (`CA-05`)

| Paramètre mesuré (`verifie_manuscrit.py`) | Liminaire (`00-liminaire`) | Chapitres `01` à `04` |
| --- | :---: | :---: |
| Nombre de tableaux | Exactement `1` (table des `5` discordances) | Au plus `3` par chapitre |
| Ratio de lignes en listes à puces | \(\le 25\ \%\) des lignes non vides | \(\le 25\ \%\) des lignes non vides |
| Longueur des extraits de code (`CA-20`) | `0` bloc (extraits `≤ 40` L réservés aux Ch. 01–04) | \(\le 40\) lignes par bloc (`CA-G0-SYNC`) |
| Longueur des paragraphes et phrases | Paragraphe \(\le 180\) mots · Phrase \(\le 70\) mots | Paragraphe \(\le 180\) mots · Phrase \(\le 70\) mots |

---

## 4. Règles linguistiques, mathématiques, typographiques et conventions des `9` figures

1. **Terminologie bilingue contrôlée et usage des guillemets obliques** : utiliser systématiquement les entrées de `registre/glossaire-termes.json`. À la première occurrence majeure d'un concept technique dans un chapitre, fournir le terme français suivi de l'équivalent anglais entre parenthèses s'il éclaire la pratique — p. ex. *identité non humaine* (`Non-Human Identity`, `NHI`), *exécution durable* (`Durable Execution`), *coût par résultat conforme* (`Cost per Compliant Outcome`, `CPO`), *canonisation JSON* (`JSON Canonicalization Scheme`, `JCS`). En prose, réserver les guillemets obliques (`backticks`) aux identifiants de code, chemins de modules, clés JSON et commandes ; ne jamais encadrer les sigles usuels (`MCP`, `A2A`, `OPA`, `Loi 25`, `RFC 8785`).
2. **Montants monétaires, symbole dollar (`\$`) et formules mathématiques (`CA-06`)** :
   - **Aucun symbole dollar non échappé** dans tout fichier `.md` (prose, titres, tableaux, code en ligne ou annexes) : tout montant monétaire s'écrit avec `\$` et devise explicite (`25 M\$ CA`, `1 000 \$ US`).
   - Toute formule mathématique s'écrit exclusivement entre `\(...\)` (en ligne) ou `\[...\]` (en display) — par exemple pour la borne de Wilson \(\hat{p}_{+} < p \implies n \ge \lceil 3/p \rceil\) ou le coût complet `CPO`.
   - La compilation `Pandoc` s'exécute avec `-f markdown-tex_math_dollars+tex_math_single_backslash` (`--embed-resources` pour le HTML autonome), afin de neutraliser le délimiteur dollar et d'activer les délimiteurs à barre oblique inverse.
3. **Typographie d'impression (`gabarit-livre.typ`)** :
   - Gabarit imprimé **`6,14 × 9,21 po`**, marges intérieures/extérieures `0,90 po / 0,78 po`, corps justifié à **`10,6 pt`** (`Libertinus Serif`, `Georgia`, `Palatino Linotype`), langue `fr-CA`.
   - Les blocs `raw(block: true)` dans `gabarit-livre.typ` sont stylés pour garantir la lisibilité des extraits `≤ 40` lignes sur `6,14 × 9,21 po` sans débordement horizontal (longueur de ligne cible `≤ 78` à `80` caractères dans les extraits exposés de `8 - Trousse/`).
   - Espace obligatoire avant le point-virgule `;` en prose hors code, liens et entités HTML (`CA-05`).
4. **Conventions des `9` figures (`Fig-00` à `Fig-08`, `CA-08`)** :
   - Répartition exacte : **`7` diagrammes `PlantUML`** (`.svg`, compilés avec `-failfast2` : `Fig-00`, `Fig-01`, `Fig-02`, `Fig-03`, `Fig-05`, `Fig-06`, `Fig-07`) et **`2` organigrammes `Mermaid`** (`.png` à `300 DPI` : `Fig-04` et `Fig-08`).
   - Plafond strict de **`≤ 14` nœuds** (idéalement `10 à 14`) par diagramme pour préserver la lisibilité sur format `6,14 × 9,21 po`.
   - Distinction visuelle constante : trait plein épais et teinte sobre pour la **frontière déterministe hors modèle possédée et vérifiée en `G0`**, contre trait pointillé pour les **modèles probabilistes substituables ou composants externes non fiables**.
   - Libellés et légendes rédigés en français canadien (hors identifiants de protocoles et standards normalisés tels que `MCP`, `A2A`, `OPA`, `Rego`, `SPIFFE`, `JCS`, `SCITT`, `ML-DSA`, `SLH-DSA`, `OTel`, `FOCUS`, `SHA-256`).

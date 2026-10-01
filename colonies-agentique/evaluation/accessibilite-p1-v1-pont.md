# Liste d'accessibilité : page-pilote p1-v1-pont

Liste de [07 §8](../docs/07-vulgarisation-evaluation.md) (WCAG 2.2 AA) pour la page-pilote [p1-v1-pont](../pages/p1-v1-pont.json), version du 2026-10-01. Les critères mesurables sont vérifiés à chaque commit par `tests/pages/accessibilite.test.ts`, `pilote.test.ts` et `gabarit.test.ts` (Chrome, Playwright, axe-core 4.13). Les vérifications qui exigent une personne restent ouvertes : sans elles, la liste n'est pas complète (TV0.7, TV0.8; CS0.12).

**État :** 13 critères sur 16 vérifiés automatiquement; 3 ouverts (lecteur d'écran, revue des flashs, orientation sur appareil réel).

| Critère | Niveau | Méthode | Résultat | Preuve |
|---|---|---|---|---|
| 1.1.1 Contenu non textuel | A | contenu de repli du canevas (texte vivant de la scène); écoute au lecteur d'écran | repli présent; **écoute à faire (personne, NVDA ou VoiceOver)** | `scene()` dans `src/browser/page.ts` |
| 1.3.1 Information et relations | A | tableau de données sous chaque distribution complète; axe-core | conforme (0 violation) | `pilote.test.ts`; tableau « Données » de chaque distribution |
| 1.3.4 Orientation | AA | aucune règle CSS d'orientation; reflow à 320 × 256 px | conforme à l'émulation; **appareil réel à faire (personne)** | `accessibilite.test.ts` (TV0.4) |
| 1.4.1 Utilisation de la couleur | A | statuts doublés d'une forme et d'un texte; une seule couleur d'identité sur la page (fourmi) | conforme | badges `data-statut`; TV0.3 : `x_vulgarisation_checks.py` (dE2000 minimal 12,5, vermillon-orange en deutéranopie) |
| 1.4.3 Contraste (minimum) | AA | axe-core; aucun texte en couleur d'identité | conforme | `pilote.test.ts`; `accessibilite.test.ts` (TV0.2) |
| 1.4.10 Reflow | AA | 320 × 256 px CSS aux trois niveaux : aucun défilement horizontal, aucune commande perdue | conforme | `accessibilite.test.ts` (TV0.4) |
| 1.4.11 Contraste non textuel | AA | couleurs d'identité et trait des composants à 3:1 sur #FFFFFF et #121212 | conforme (fourmi 3,87 et 4,84; abeille 5,19 et 3,61; agent 3,06 et 6,12) | `accessibilite.test.ts` (TV0.1) |
| 2.1.1 Clavier | A | tabulation complète; curseur aux flèches; Entrée et Espace sur les boutons; « Suivre un individu » | conforme | `accessibilite.test.ts` (TV0.7) |
| 2.2.2 Pause, arrêt, masquage | A | lecture de 8 s avec bouton Pause; reprise au même point | conforme | `accessibilite.test.ts` (TV0.6); `gabarit.test.ts` (UC-010 A2) |
| 2.3.1 Trois flashs | A | revue de l'animation (épaisseur des branches, courbe) | aucun flash relevé à la revue de l'agent; **revue humaine à faire** | — |
| 2.3.3 Animation issue des interactions | AAA, souhaité | `prefers-reduced-motion` aux deux états | conforme : lecture instantanée, aucun bouton Pause | `accessibilite.test.ts` (TV0.6) |
| 2.4.11 Focus non masqué (minimum) | AA | chaque élément focalisé visible au centre de sa boîte; contour de focus non nul | conforme | `accessibilite.test.ts` (TV0.7) |
| 2.5.7 Mouvements de glissement | AA | curseurs natifs (clic sur la piste, flèches); aucun glisser requis | conforme | `accessibilite.test.ts` (TV0.7) |
| 2.5.8 Taille de cible (minimum) | AA | mesure du DOM aux trois niveaux | conforme (≥ 24 × 24 px; boutons à 44 px); exception : lien en ligne « T1.1 » du texte de Vérifier | `accessibilite.test.ts` (TV0.5) |
| 4.1.2 Nom, rôle, valeur | A | axe-core; curseurs étiquetés avec valeur et unité | conforme à axe; **écoute à faire (personne)** | `pilote.test.ts` |
| 4.1.3 Messages d'état | AA | `role="status"`, sans prise de focus; focus conservé sur le bouton activé | conforme à l'émulation; **écoute à faire (personne)** | `accessibilite.test.ts` (UC-011, TV0.7) |

## Corrigé pendant la vérification

- Les boutons « Lancer », « Passer » et « Rejouer cette exécution » se désactivaient pendant le calcul : le focus retombait sur le document (2.4.3). Ils restent focalisables (`aria-disabled`).
- « Étape suivante » disparaît avec le résultat : le focus passe désormais au titre de l'étape suivante.

## À faire par une personne

1. Lecteur d'écran (NVDA sous Windows ou VoiceOver) : 1.1.1, 4.1.2, 4.1.3, parcours des trois niveaux.
2. Revue des flashs (2.3.1) et orientation sur un appareil réel (1.3.4).
3. Zoom à 400 % dans un navigateur de bureau (complément de l'émulation à 320 px).

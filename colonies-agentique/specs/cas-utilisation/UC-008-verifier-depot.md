---
id: UC-008
name: Vérifier le dépôt
status: Review
context: SIM
actors: [Pipeline CI, Chercheur]
linkedRequirements: [FR-008, NFR-006, NFR-010, C-001, C-002, C-007]
entities: [ReproductionTarget]
---

# UC-008 Vérifier le dépôt

## Vue d'ensemble

- **Acteur principal :** Pipeline CI (le chercheur peut lancer la même commande)
- **But :** savoir, à chaque commit, si le comportement spécifié tient : types, tests du noyau, conformité, documentation, cibles et traçabilité de la spécification.
- **Statut :** Review

## Préconditions

- Les dépendances de développement sont installées (`npm ci`).

## Déclencheur

- Un commit est poussé, ou le chercheur lance la vérification.

## Scénario nominal

1. L'acteur lance `npm run verify`.
2. Le système vérifie les types sous les deux configurations TypeScript.
3. Le système exécute les tests du noyau, de déterminisme et de conformité.
4. Le système vérifie la cohérence de la documentation (`node outils/verifier-docs.ts`).
5. Le système vérifie la correspondance entre les cibles des fiches et les fichiers de `targets/` (`node outils/verifier-cibles.ts`).
6. Le système vérifie la traçabilité de la spécification (`node outils/verifier-specs.ts`).
7. Le système affiche le résultat de chaque étape.
8. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Étape en échec
**Déclencheur :** à l'une des étapes 2 à 6, une vérification échoue.
1. Le système affiche l'étape en échec et ses erreurs; pour un test, son nom, qui commence par l'identifiant du cas d'utilisation vérifié.
2. Le système n'exécute pas les étapes suivantes.
3. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Aucun fichier versionné n'est créé ni modifié.

**Échec :**
- Aucun fichier versionné n'est créé ni modifié.

## Règles d'affaires

- **BR-014** : `npm run verify` ne crée ni ne modifie aucun fichier versionné.
- **BR-015** : Le nom de chaque test commence par l'identifiant du cas d'utilisation qu'il vérifie, suivi du flot ou de la règle (`UC-003 A3 : …`, `UC-003 BR-010 : …`). Un test qui vérifie une cible de reproduction nomme aussi son identifiant T.
- **BR-016** : Les réplications lourdes (`npm run reproduce`) restent hors de `npm run verify`.

## Exigences liées

FR-008 Vérifier le dépôt · NFR-006 Durée de vérification · NFR-010 Traçabilité des tests · C-001 TypeScript · C-002 Aléa contrôlé · C-007 Lieu du calcul

## Points soumis à la revue

L'étape 6 ajoute `outils/verifier-specs.ts` à la chaîne de [05](../../docs/05-spec-simulation.md) §9.1. Tant que `package.json` n'existe pas (phase 0), les étapes 4 et 6 se lancent directement avec `node`.

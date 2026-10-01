---
id: UC-002
name: Rejouer une exécution
status: Implemented
context: SIM
actors: [Chercheur]
linkedRequirements: [FR-002, NFR-001, C-002]
entities: [RunManifest, Scenario]
---

# UC-002 Rejouer une exécution

## Vue d'ensemble

- **Acteur principal :** Chercheur
- **But :** savoir si une exécution passée se reproduit au bit près, ou seulement en distribution, sur le poste courant.
- **Statut :** Implemented

## Préconditions

- Le manifeste existe et a été produit par UC-001.
- Le modèle désigné par le manifeste est implanté dans le code courant.

## Déclencheur

- Le chercheur lance le rejeu d'un manifeste en ligne de commande.

## Scénario nominal

1. Le chercheur lance `node src/cli/replay.ts <manifeste>`.
2. Le système recompile le scénario consigné dans le manifeste et vérifie que son hachage égale celui du manifeste.
3. Le système réexécute le modèle à partir de l'état initial des flux et des interventions consignés.
4. Le système compare l'empreinte d'état à chaque temps consigné dans le manifeste.
5. Le système affiche « Rejeu identique : <k> empreintes sur <k> ».
6. Le système termine avec le code de sortie 0.

## Flots alternatifs

### A1. Moteur ou version différents
**Déclencheur :** à l'étape 4, le moteur JavaScript, sa version, la plateforme ou la version du noyau diffèrent de ceux du manifeste.
1. Le système affiche le nombre d'empreintes égales.
2. Le système affiche « Moteur différent : équivalence statistique seulement ».
3. Le système termine avec le code de sortie 0.

### A2. Rejeu divergent sur le même moteur
**Déclencheur :** à l'étape 4, une empreinte diffère alors que moteur, version, plateforme et version du noyau sont ceux du manifeste.
1. Le système affiche « Rejeu divergent au temps <t> », avec le premier temps qui diverge.
2. Le système termine avec un code de sortie non nul.

### A3. Scénario modifié
**Déclencheur :** à l'étape 2, le hachage du scénario recompilé diffère de celui du manifeste.
1. Le système affiche « Scénario modifié : hachage <calculé> au lieu de <consigné> ».
2. Le système n'exécute pas le modèle.
3. Le système termine avec un code de sortie non nul.

### A4. Exécution d'agents LLM
**Déclencheur :** à l'étape 2, le manifeste référence un journal LLM.
1. Le système affiche « Exécution LLM : rejouer avec sa cassette (UC-021) ».
2. Le système n'exécute pas le modèle.
3. Le système termine avec un code de sortie non nul.

## Flots d'exception

### E1. Manifeste invalide
**Déclencheur :** à l'étape 2, le manifeste est illisible ou un champ requis manque.
1. Le système affiche « Manifeste invalide : <champ> ».
2. Le système termine avec un code de sortie non nul.

## Postconditions

**Succès :**
- Le rapport de rejeu est affiché.
- Aucun fichier n'est créé ni modifié.

**Échec :**
- Aucun fichier n'est créé ni modifié.

## Règles d'affaires

- **BR-006** : Le rejeu ne crée ni ne modifie aucun fichier.
- **BR-007** : Une identité de rejeu n'est affirmée que si le moteur JavaScript, sa version, la plateforme et la version du noyau sont ceux du manifeste; sinon, seule l'équivalence statistique est annoncée.

## Exigences liées

FR-002 Rejouer une exécution · NFR-001 Déterminisme · C-002 Aléa contrôlé

## Points soumis à la revue

Décision de rédaction : le code de sortie 0 du flot A1 ([05](../../docs/05-spec-simulation.md) §15 ne fixe le code de sortie que pour une divergence sur le même moteur).

Le « comment » (flux, empreintes FNV-1a, niveaux N1 à N3) est dans [05-spec-simulation.md](../../docs/05-spec-simulation.md) §7 et §15.

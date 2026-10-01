# colonies-agentique

Le comportement du logiciel est défini par le noyau de spécification `specs/` (AI Unified Process) : spécification d'abord, puis code et tests qui en dérivent. Le contenu scientifique est gouverné par `docs/00-cadre.md` et les fiches `projets/`.

## Pour toute modification de code

1. Nomme le cas d'utilisation servi (`specs/cas-utilisation/UC-###-*.md`). S'il n'existe pas, ou si son statut précède `Approved`, rédige ou modifie d'abord le cas et soumets-le à la revue du chercheur : le code attend l'approbation.
2. Lis le cas, ses exigences liées (`specs/catalogue-exigences.md`) et ses entités (`specs/modele-entites.md`). Nomme les types et les fichiers avec les noms canoniques du modèle d'entités.
3. **Synchronise** : applique seulement le comportement que décrit le diff du cas, et garde le reste du code tel quel. Régénère seulement pour un cas nouveau.
4. Dérive les tests du cas : scénario nominal, chaque flot A et E, chaque règle BR, état final des postconditions. Nom de test : `UC-### <nominal|A1|E1|BR-###> : <comportement>`, plus l'identifiant T pour une cible de reproduction.
5. Terminé quand `npm run verify` sort à 0, que `notes/suivi-feuille-de-route.md` reflète l'état des tâches touchées, que `node outils/verifier-specs.ts --ecrire` a régénéré le tableau de bord, et que le statut du cas reflète l'état réel.

## Règles

- Un bogue se règle dans la spécification d'abord : vérifie si le cas est incomplet ou si le code s'en écarte.
- Les identifiants FR, NFR, C, UC, BR, H, T et E sont stables : réutilise-les tels quels.
- Les cas décrivent un comportement observable; le « comment » technique vit dans `docs/05-spec-simulation.md`, qui fixe architecture, CLI, manifeste et tests.
- Les contraintes `C-###` du catalogue s'appliquent à tout le code.
- Le chercheur seul passe un cas à `Approved`; un agent propose, ne décide pas.

## Pointeurs

- Processus (statuts, revue, synchronisation, traçabilité) : `specs/README.md`.
- Cibles de reproduction et rigueur statistique : `docs/04-protocole-reproduction.md` et la fiche du projet.
- Pages et vulgarisation : `docs/07-vulgarisation-evaluation.md`.

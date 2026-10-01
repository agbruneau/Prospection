# Tableau de bord de la spécification

Généré par `node outils/verifier-specs.ts --ecrire` : ne pas modifier à la main. Une exigence est terminée quand tous les cas qui la servent sont `Verified` ou `Deployed`; la couverture de spécification compte le scénario nominal, chaque flot (A, E) et chaque règle BR du cas, nommés par au moins un test (`UC-### nominal`, `UC-### A1`, `UC-### BR-###`). La régression se lit dans `npm run verify`.

## Progression

| Catégorie | Total | Terminées | En cours | Non commencées | Couverture |
|---|---:|---:|---:|---:|---:|
| Exigences fonctionnelles | 20 | 0 | 9 | 11 | 0 % |
| Cas d'utilisation | 16 | 0 | 7 | 9 | 0 % |
| Cas à couverture de spécification complète | 16 | 0 | 7 | 9 | 0 % |

## Suivi par cas

| Cas | Titre | FR liées | Statut | Code | Tests | E2E | Couverture de spécification | Intégrité |
|---|---|---|---|:-:|:-:|:-:|---|---|
| [UC-001](cas-utilisation/UC-001-executer-scenario.md) | Exécuter un scénario | FR-001 | Review | ✕ | ✕ | — | 0 sur 10 | Faible |
| [UC-002](cas-utilisation/UC-002-rejouer-execution.md) | Rejouer une exécution | FR-002 | Review | ✕ | ✕ | — | 0 sur 8 | Faible |
| [UC-003](cas-utilisation/UC-003-verifier-cible.md) | Vérifier une cible de reproduction | FR-003 | Review | ✕ | ✕ | — | 0 sur 13 | Faible |
| UC-004 | Balayer des paramètres | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-005 | Aligner par docking | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-006 | Préparer les résumés d'une page | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-007 | Calculer les métriques R et G | — | non rédigé | ✕ | ✕ | — | — | Faible |
| [UC-008](cas-utilisation/UC-008-verifier-depot.md) | Vérifier le dépôt | FR-008 | Review | ✕ | ✕ | — | 0 sur 5 | Faible |
| [UC-010](cas-utilisation/UC-010-suivre-recit-guide.md) | Suivre un récit guidé | FR-010, FR-017 | Review | ✕ | ✕ | ✕ | 0 sur 7 | Faible |
| [UC-011](cas-utilisation/UC-011-explorer-modele.md) | Explorer un modèle | FR-011, FR-014, FR-017 | Review | ✕ | ✕ | ✕ | 0 sur 8 | Faible |
| [UC-012](cas-utilisation/UC-012-verifier-reproduction.md) | Vérifier une reproduction | FR-012, FR-017 | Review | ✕ | ✕ | ✕ | 0 sur 5 | Faible |
| UC-013 | Partager l'état d'une page | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-014 | Modifier la règle d'un agent | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-015 | Télécharger les données d'une page | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-020 | Exécuter une campagne d'agents LLM | — | non rédigé | ✕ | ✕ | — | — | Faible |
| UC-021 | Rejouer une campagne | — | non rédigé | ✕ | ✕ | — | — | Faible |

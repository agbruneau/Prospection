# Vision

La **plateforme colonies-agentique** est le logiciel du programme de recherche « Coordination sans contrôle central : fourmilières, ruches et systèmes d'agents ». Elle reproduit des modèles publiés de fourmilières et de ruches, les étend vers des systèmes d'agents et les rend explorables par des pages de vulgarisation.

Deux autorités, deux objets :
- le [cadre](../docs/00-cadre.md) et les [fiches de projet](../projets/) font foi pour le **contenu scientifique** (modèles, cibles T, hypothèses H);
- ce noyau de spécification (`specs/`) fait foi pour le **comportement du logiciel**. Le code et les tests en dérivent.

## Objectifs

- Reproduire chaque résultat publié ciblé avant toute extension, avec un verdict traçable jusqu'à sa fiche de reproduction.
- Rendre chaque exécution rejouable à partir de son manifeste et de sa graine.
- Offrir des pages à trois niveaux (Voir, Explorer, Vérifier) qui n'affirment jamais plus que ce qui est reproduit.
- Exécuter les expériences d'agents LLM sous un budget plafonné, rejouables hors ligne.
- Garder spécification, code et tests alignés : chaque test nomme le cas d'utilisation qu'il vérifie.

## Contextes délimités

| Contexte | Capacité | Acteurs |
|---|---|---|
| **SIM** | moteur de simulation headless : exécution, rejeu, reproduction, balayages, docking, métriques | Chercheur, Pipeline CI |
| **PAGES** | pages de vulgarisation statiques | Lecteur |
| **LLM** | campagnes d'agents LLM et rejeu par cassette | Chercheur, API LLM |

Un seul noyau de spécification couvre les trois contextes tant qu'il reste lisible d'une traite. Un contexte qui dépasse une quinzaine de cas d'utilisation reçoit son propre noyau (catalogue, modèle d'entités, cas d'utilisation).

## Hors portée

Serveur applicatif, comptes utilisateurs, appels d'API LLM depuis une page, collecte de données personnelles. L'évaluation pédagogique de V0 suit son propre protocole, soumis au comité d'éthique ([07](../docs/07-vulgarisation-evaluation.md)).

# Noyau de spécification

Ce dossier applique l'**AI Unified Process** décrit par [Martinelli 2026] : la spécification est la source de vérité du comportement du logiciel; le code et les tests en dérivent et se vérifient contre elle. Le contenu scientifique reste gouverné par le [cadre](../docs/00-cadre.md) et les [fiches](../projets/) : une décision scientifique qui change un comportement passe d'abord ici.

## Contenu

| Fichier | Rôle |
|---|---|
| [vision.md](vision.md) | but de la plateforme, contextes délimités, hors portée |
| [catalogue-exigences.md](catalogue-exigences.md) | exigences FR (récits utilisateur), NFR et contraintes C, à identifiants stables |
| [modele-entites.md](modele-entites.md) | vocabulaire du logiciel : entités, relations, règles de validation; noms canoniques = identifiants de code |
| [cas-utilisation.puml](cas-utilisation.puml) | diagramme des cas d'utilisation; sert de liste de contrôle des cas à rédiger |
| [cas-utilisation/](cas-utilisation/) | un fichier par cas `UC-###` : le contrat exécutable |
| [tableau-de-bord.md](tableau-de-bord.md) | progression et couverture, **générée** par `node outils/verifier-specs.ts --ecrire` |

## Cycle

Chaque changement suit la boucle **Spécifier → Générer → Valider → Revoir → Raffiner**, par petits pas :

1. **Spécifier** : mettre à jour le catalogue, le modèle d'entités et le cas d'utilisation, juste assez pour le prochain pas correct.
2. **Générer** : produire ou synchroniser le code et les tests à partir du cas (l'agent travaille sur « implémente UC-003 », jamais sur une consigne vague).
3. **Valider** : `npm run verify` (UC-008) confronte le code à la spécification; `node outils/verifier-specs.ts` contrôle la traçabilité.
4. **Revoir** : un humain revoit, dans cet ordre, la spécification, puis le code, puis les tests.
5. **Raffiner** : lever les ambiguïtés découvertes, dans la spécification d'abord.

## Statuts d'un cas d'utilisation

L'unité de travail est le cas d'utilisation; il avance en flux continu, sans sprint.

| Statut | Sens | Qui le donne |
|---|---|---|
| Draft | en rédaction | rédacteur |
| Review | complet, soumis à la revue (section « Points soumis à la revue » lue et tranchée) | rédacteur |
| Approved | comportement accepté; le code peut commencer | **le chercheur seulement** |
| Implemented | code synchronisé avec le cas | développeur ou agent, après revue du code |
| Verified | tests dérivés du cas présents et verts; couverture de spécification complète au tableau de bord | après revue des tests |
| Deployed | publié (version, page ou release) | chercheur |

Un cas présent au diagramme sans fichier est « non rédigé ». On le rédige quand sa phase arrive, pas avant : écrire aujourd'hui les cas de la phase 3 serait de la conception spéculative.

## Changer un comportement

- **Spécification d'abord**, sans exception : nouveau comportement, règle modifiée ou correctif. Un bogue signifie que la spécification est incomplète ou que le code s'en écarte : on vérifie la spécification en premier.
- **Synchroniser plutôt que régénérer** : pour un cas déjà implanté, on applique seulement le changement décrit par le diff du cas; le reste du code reste tel quel, ce qui garde les diffs petits et la revue possible. La régénération complète est réservée à un cas nouveau.
- **Une règle par énoncé** : une phrase qui contient « et » ou « ou » cache souvent deux règles; on les sépare.
- **Observable seulement** : un cas décrit ce qui se voit de l'extérieur (commande, message, fichier, code de sortie, affichage). Le « comment » vit dans [05-spec-simulation.md](../docs/05-spec-simulation.md) et le code.

## Traçabilité

- **Identifiants** : `FR-###`, `NFR-###`, `C-###`, `UC-###`, `BR-###`. Stables, uniques, jamais réutilisés ni renumérotés; une exigence retirée garde son identifiant et porte « retirée ».
- **Liens** : chaque cas liste ses exigences (`linkedRequirements`) et ses entités (`entities`); une règle `BR` est définie une fois, dans le cas où elle naît, et citée ailleurs par son identifiant.
- **Tests** : le nom de chaque test du produit commence par l'identifiant du cas et nomme ce qu'il couvre : `UC-001 nominal : …`, `UC-001 A2 : …`, `UC-001 BR-003 : …` (BR-015). Un test de cible nomme aussi la cible T.
- **Couverture de spécification** : un cas est couvert quand son scénario nominal, chacun de ses flots et chacune de ses règles sont nommés par au moins un test. Une ligne de code non couverte peut être acceptable; une règle non couverte est une brèche.

## Règles de gouvernance

1. Un comportement ne change jamais sans que sa spécification change d'abord.
2. Les identifiants sont des références durables, jamais réutilisées.
3. Les cas d'utilisation décrivent un comportement observable, sans détail d'implantation.
4. Chaque contexte délimité possède son noyau de spécification; tant qu'un seul noyau suffit, la colonne « Contexte » des exigences et le champ `context` des cas en tiennent lieu.

## Par où commencer

1. Les sept cas de la phase 0 sont approuvés (2026-10-01). UC-001, UC-002, UC-003 et UC-008 sont `Implemented`, à couverture de spécification complète : leur passage à `Verified` attend la revue des tests par le chercheur.
2. Suite de la phase 0 ([fiche S0](../projets/S0-socle.md)) : premières cibles réelles de P1 dans `targets/P1/` (chacune après sa fiche de reproduction gelée); le gabarit de page (UC-010 à UC-012) après le spike.
3. Rédiger UC-004 à UC-007 quand le noyau passe ses cibles T0; UC-013 à UC-015 avec la première page; UC-020 et UC-021 avant la phase 3, ou plus tôt si la porte GF1 retient la collecte anticipée de Haiku 4.5 ([09](../docs/09-feuille-de-route.md)).

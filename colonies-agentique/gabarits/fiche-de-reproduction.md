<!-- Extrait de docs/04-protocole-reproduction.md (« 3.2 Gabarit (à copier pour chaque cible) ») par outils/gabarits.ts; ne pas modifier ici. -->
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

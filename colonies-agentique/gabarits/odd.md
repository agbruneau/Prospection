<!-- Extrait de docs/04-protocole-reproduction.md (« 10.2 Gabarit ») par outils/gabarits.ts; ne pas modifier ici. -->
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

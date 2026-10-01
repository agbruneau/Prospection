<!-- Extrait de docs/04-protocole-reproduction.md (« 11.3 Gabarit de préenregistrement ») par outils/gabarits.ts; ne pas modifier ici. -->
# Préenregistrement : <projet>, version <vN>
Déposé sur OSF le <date> (lecture seule). SHA du dépôt <…>; des fichiers de scénario <…>; du script d'analyse <…>.
Aucune exécution confirmatoire avant le dépôt : <oui / non, détail>.

## 1. Portée
H<projet>.<n> et T<projet>.<n> couverts; liste de ce qui reste exploratoire.

## 2. Hypothèses
Par H<projet>.<n> : énoncé directionnel; taille d'effet minimale; critère de réfutation; lien avec la QR (03-plan-de-recherche.md).

## 3. ADEMP
Tableau du §9 du protocole.

## 4. Variables
VI, VD, contrôles (budget, longueur de message, effort, environnement, graines, fenêtre temporelle pour les LLM).

## 5. Plan d'échantillonnage
n par cellule; ES de Monte Carlo visée; puissance par simulation (entrées, résultat); pilote (n, variance mesurée);
plafond de coût; règle d'arrêt séquentielle éventuelle, avec n_max.

## 6. Graines et générateur
Graine maîtresse, PRNG et version, dérivation, plan apparié.

## 7. Analyse
Test et seuil par hypothèse; marges δ du TOST et leur justification; modèle mixte (effets aléatoires : run, paraphrase);
IC (méthode, rééchantillons); famille de multiplicité et procédure (Holm, α = 0,05).

## 8. Exclusions et attrition
Runs avortés; refus de classifieur (stop_reason "refusal") = issue codée; échec d'analyse = action nulle comptée;
aucune exclusion après coup.

## 9. Exécution LLM (si applicable)
Identifiants de modèle, effort, paramètres; fenêtre d'exécution; ordre des cellules randomisé; cellules sentinelles
et seuil de dérive; plan B en cas de retrait.

## 10. Déviations
Procédure : registre du §7.5 du protocole; toute déviation est rapportée dans la note.

## 11. Données et code
Dépôt, licences, DOI (08-science-ouverte-ethique.md); journaux archivés.

## 12. À confirmer au dépôt
Valeurs marquées [à confirmer].

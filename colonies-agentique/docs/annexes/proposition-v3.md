# Proposition v3 — Fourmilière et ruche comme chorégraphies sans chorégraphe (version à auditer)

Intention du chercheur : étudier la dynamique d'une fourmilière ET d'une ruche (au même titre) au niveau de l'intelligence individuelle et collective, pour faire un parallèle avec l'agentique (systèmes multi-agents, dont agents LLM), sous l'angle de la chorégraphie (coordination sans coordinateur central, par opposition à l'orchestration). Exigences : projets académiques, supports visuels de vulgarisation, simulations des concepts académiques ciblés.

Thèse : « la reine ne commande pas ». Le projet est comparatif : chaque concept est étudié chez la fourmi et chez l'abeille, dans le même moteur de simulation, avec un visuel côte à côte.

## Deux chorégraphies naturelles

| Mécanisme | Fourmilière | Ruche | Agentique |
|---|---|---|---|
| Canal | Piste chimique dans l'environnement (persistante) | Danse sur la piste de danse du nid (éphémère, localisée) | État partagé (journal d'événements) vs canal de diffusion (pub/sub) |
| Contenu du signal | Intensité (scalaire) | Direction et distance (symbolique) | Message en langage naturel |
| Oubli | Évaporation | Attrition des danses | TTL vs expiration des messages |
| Recrutement | Suivi de piste, tandem | Danse frétillante | Délégation |
| Freinage | Absence de retours | Danse de trémulation, signal d'arrêt | Backpressure, veto |
| Décision | Quorum (Temnothorax) | Quorum + inhibition croisée (essaim) | Consensus sans coordinateur |

Question transversale : le signal s'enrichit de la fourmi (scalaire) à l'abeille (symbole) à l'agent LLM (langage). Comment la richesse du signal change-t-elle le gain collectif et les modes d'échec ?

Critère de rigueur : chaque simulation reproduit un résultat publié pour chaque espèce avant toute extension agentique. Format : page interactive à trois niveaux (animation libre; curseurs + graphes temps réel; expérience guidée reproduisant le résultat publié + carte fourmi/abeille/agentique), sélecteur fourmi/abeille ou écran partagé; note de recherche courte par projet.

### 1. Recrutement : la piste contre la danse
- Fourmis : pont double, fonction de choix de Deneubourg P_A = (k+A)^n / ((k+A)^n + (k+B)^n) (Goss et al. 1989; Deneubourg et al. 1990).
- Abeilles : danse frétillante (von Frisch); choix entre sources de nectar (Seeley, Camazine, Sneyd 1991; modèle Camazine et Sneyd 1991).
- À reproduire : fourmis bloquées sur la branche longue quand la courte arrive tard; abeilles qui réallouent leurs butineuses quand on inverse la qualité des sources.
- Visuel : écran partagé (phéromones / vecteurs de danse et flux de butineuses); courbe de réaction à un changement.
- Agentique : état partagé persistant (rigide mais robuste) contre diffusion de messages (adaptable mais bavarde).

### 2. Optimisation bio-inspirée : ACO contre ABC
- Fourmis : Ant System (Dorigo, Maniezzo, Colorni 1996), probabilité ∝ τ^α·η^β, évaporation τ ← (1−ρ)τ + Δτ.
- Abeilles : Artificial Bee Colony (Karaboga 2005) : ouvrières, observatrices, éclaireuses.
- À reproduire : ACO sur Oliver30; ABC sur Rastrigin, Rosenbrock.
- Visuel : arêtes épaissies par la phéromone; nuage d'abeilles sur une surface 2D.
- Contraste : la piste encode un chemin (combinatoire), la danse un lieu (continu).
- Agentique : quel type de mémoire partagée pour quel type de problème.

### 3. Division du travail
- Fourmis : seuils de réponse T_θ(s) = s²/(s²+θ²) (Bonabeau, Theraulaz, Deneubourg 1996); retrait d'une caste (Wilson 1984, Pheidole); seuils renforcés (Theraulaz et al. 1998).
- Abeilles : polyéthisme d'âge (nourrice → bâtisseuse → butineuse; Seeley 1982); thermorégulation par seuils variés (Jones et al. 2004).
- À reproduire : les petites ouvrières prennent la relève; une ruche aux seuils diversifiés garde une température stable, une ruche homogène oscille.
- Visuel : agents colorés par tâche; thermomètre de ruche homogène vs diversifiée.
- Agentique : des agents identiques (même modèle, même prompt) réagissent en même temps et oscillent; la diversité stabilise.

### 4. Régulation sans vue d'ensemble
- Fourmis : rythme des retours chargés, analogue à TCP (Prabhakar, Dektar, Gordon 2012; Gordon 2010 Ant Encounters).
- Abeilles : temps d'attente pour décharger le nectar → danse frétillante (recruter des butineuses) ou de trémulation (recruter des receveuses) (Seeley 1992; Seeley et Tovey 1994).
- À reproduire : le fourragement suit la nourriture disponible; la colonie rééquilibre collecte et traitement.
- Visuel : chronogramme sorties/retours; file d'attente à l'entrée de la ruche avec ses deux danses.
- Contraste : la fourmi mesure un débit, l'abeille un temps d'attente — deux lectures de la même file (loi de Little L = λW; rapprochement non publié, de l'auteur).
- Agentique : backpressure par débit ou par latence; équilibrer producteurs et consommateurs.

### 5. Décision collective par quorum
- Fourmis : Temnothorax : tandem puis transport passé le quorum (Pratt et al. 2002; modèle agent Pratt et al. 2005; vitesse/justesse Franks et al. 2003).
- Abeilles : essaim : danse, quorum au site (Seeley et Visscher 2004), signaux d'arrêt / inhibition croisée (Seeley et al. 2012).
- Comparaison publiée : Franks et al. 2002 (les deux espèces).
- À reproduire : compromis vitesse/justesse par le quorum; l'inhibition croisée débloque une égalité.
- Visuel : carte des sites; courbes de soutien; curseurs quorum et inhibition.
- Agentique : consensus sans coordinateur; signaux d'arrêt comme veto.

### 6. Pathologies
- Fourmis : moulin (Schneirla 1944; phase tore de Couzin et al. 2002); parasites par mimétisme chimique (Phengaris).
- Abeilles : indécision et essaim scindé sans signaux d'arrêt; intrus par mimétisme chimique (sphinx tête-de-mort, Moritz et al. 1991).
- À reproduire : apparition du moulin; interblocage quand on supprime l'inhibition croisée.
- Visuel : spirale; essaim qui se divise; diagramme de phases.
- Agentique : boucles d'agents, interblocage, injection de faux signaux (prompt injection). Prolonge les bancs de réfutation EscapeBench et LeakLab du chercheur.

### 7. Synthèse : fourmi, abeille, agent LLM
- Question : sur les scénarios 1, 3 et 5, croiser architecture (piste vs danse) × capacité des agents (règle simple, Haiku, Sonnet, Opus).
- Visuel : grille 2 × 4; courbe du gain collectif selon la richesse du signal.
- Contribution : seul projet sans résultat publié à reproduire.

### Technique et parcours
TypeScript + Canvas dans le navigateur, un seul moteur avec deux espèces interchangeables (le contraste vient du mécanisme, pas du code); chaque page publiable comme artifact. Projet 7 : script Node appelant l'API Claude et rejouant les journaux.
Parcours : 1 → 3 → 5, puis 2, 4, 6, puis 7. Toutes les références ont été citées de mémoire, sans vérification.

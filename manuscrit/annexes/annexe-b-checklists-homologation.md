# Annexe B — Listes de contrôle d'homologation pré-production (75 points)

Aucun système multi-agents de niveau `L2`, `L3` ou `L4` ne doit recevoir l'autorisation de traiter des données réelles ou d'invoquer des outils mutatifs sans avoir franchi avec succès une revue d'homologation opérationnelle (*Production Readiness Review*, PRR). Cette annexe fournit une grille normative complète en **soixante-quinze points de contrôle vérifiables**, répartis en cinq domaines de quinze points chacun, directement utilisable par les équipes Architecture, Cybersécurité, SRE/AgentOps et Conformité.

> [!IMPORTANT]
> **Règle d'homologation (« Go / No-Go »)** : Pour les systèmes classés `L3` et `L4`, les points marqués **[BLOQUANT]** n'admettent aucune dérogation temporaire en production. Tout constat non conforme impose le maintien du système en niveau `L1` (lecture seule consultative) ou en *Shadow Mode* non mutatif jusqu'à remédiation prouvée.

---

## B.1 Grille 1 — Identité Non Humaine (`NHI`), Sécurité Zero Trust et Isolation (15 points)

| # | Point de contrôle | Criticité | Artefact de preuve exigé en revue Go-Live |
|---|---|---|---|
| **S-01** | Identité `NHI` unique inscrite à l'annuaire d'entreprise (zéro clé API partagée) | **[BLOQUANT]** | Entrée du Registre d'Agents + manifeste `SPIFFE ID` / `Entra Agent ID` |
| **S-02** | Attestation cryptographique de provenance du code et de la configuration système | Élevée | Signature `Sigstore`/cosign vérifiée au démarrage du pod |
| **S-03** | Délégation `OAuth 2.1 On-Behalf-Of` (`RFC 8693`) préservant `sub` et la chaîne `act` | **[BLOQUANT]** | Capture de jeton JWT décodé en environnement de pré-production |
| **S-04** | Atténuation stricte de portée (*Scope Attenuation*) à chaque saut inter-agents | **[BLOQUANT]** | Test automatisé prouvant le rejet d'un appel hors portée immédiate |
| **S-05** | Durée de vie courte des jetons (≤ 15 min) et contrainte à l'émetteur (`DPoP`/mTLS) | Élevée | Configuration du serveur d'autorisation et test de rejeu négatif |
| **S-06** | Séparation stricte entre agent d'interface exposé et agent détenteur d'outils d'écriture | **[BLOQUANT]** | Diagramme de flux réseau et politique d'accès `agentgateway` |
| **S-07** | Épinglage cryptographique (empreinte SHA-256) des descriptions et schémas `MCP` | **[BLOQUANT]** | Fichier `mcp-lock.json` signé + alerte sur modification distante (*Rug-Pull*) |
| **S-08** | Marquage structurel des données externes non fiables contre l'injection indirecte (`ASI01`) | **[BLOQUANT]** | Rapport de campagne Red Team automatisée (taux de contournement < 1 %) |
| **S-09** | Évaluation déterministe hors LLM (`Cedar` ou `OPA`) devant chaque appel d'outil mutatif | **[BLOQUANT]** | Jeu de règles `Cedar`/`Rego` versionné et tests unitaires associés |
| **S-10** | Approbation hors bande asynchrone (`CIBA`) activée pour les actions à haut risque | Élevée | Démonstration bout en bout de suspension et reprise signée |
| **S-11** | Exécution de tout code ou script dynamique en bac à sable isolé (`OpenSandbox`/microVM) | **[BLOQUANT]** | Spécification runtime prouvant l'absence de privilèges hôte et d'egress libre |
| **S-12** | Protection contre l'empoisonnement de la mémoire partagée (`ASI06`) et validation d'écriture | Élevée | Politique de validation avant insertion dans le graphe mémoire |
| **S-13** | Chiffrement mutuel et intégrité des messages inter-agents (`mTLS` ou `SLIM`/MLS) | **[BLOQUANT]** | Politique réseau Zero Trust interdisant tout trafic `A2A`/`MCP` en clair |
| **S-14** | Coupe-circuit centralisé (`Kill Switch` SOC) révoquant jetons et sessions en < 10 secondes | **[BLOQUANT]** | Procès-verbal d'exercice de déclenchement du coupe-circuit en staging |
| **S-15** | Validation de séparation des tâches (*Segregation of Duties*) sur les flux financiers/sensibles | **[BLOQUANT]** | Preuve qu'aucun identifiant `NHI` unique ne peut instruire et approuver seul |

---

## B.2 Grille 2 — Résilience, Exécution Durable et Intégrité Transactionnelle (15 points)

| # | Point de contrôle | Criticité | Artefact de preuve exigé en revue Go-Live |
|---|---|---|---|
| **R-01** | Inviolabilité des *Systems of Record* (passage exclusif par API/BAPI métiers validées) | **[BLOQUANT]** | Revue des connecteurs `MCP` confirmant zéro écriture SQL directe |
| **R-02** | Ancrage de tout flux multi-étapes mutatif dans un moteur durable (`Temporal`/`Restate`) | **[BLOQUANT]** | Code source du workflow distinguant logique déterministe et activités |
| **R-03** | Clé d'idempotence déterministe transmise et honorée sur chaque outil à effet de bord | **[BLOQUANT]** | Test d'injection de double envoi prouvant l'absence de doublon métier |
| **R-04** | Compteur dur de sauts restants (`maxRemainingHops`) dans l'enveloppe d'action | **[BLOQUANT]** | Test unitaire vérifiant l'arrêt immédiat à l'épuisement du `TTL` |
| **R-05** | Détection des boucles circulaires inter-plateformes SaaS par vecteur de corrélation | Élevée | Test croisé entre deux orchestrateurs simulant un renvoi mutuel |
| **R-06** | Définition explicite d'une action de compensation `Saga` ou d'un bail `TTL` par mutation | **[BLOQUANT]** | Matrice des étapes de la saga et test automatisé de *rollback* complet |
| **R-07** | Tampon de pré-engagement (fenêtre de grâce ou approbation) devant toute action irréversible | **[BLOQUANT]** | Architecture du connecteur courriel/paiement/publication externe |
| **R-08** | Revalidation des préconditions métiers et des droits IAM au réveil d'une pause longue (`T4`) | Élevée | Scénario de test simulant une révocation d'accès pendant l'attente |
| **R-09** | Retour d'erreurs structurées et exploitables cognitivement par les serveurs `MCP` | Moyenne | Catalogue des codes d'erreur d'outils (distinguant transitoire vs fatal) |
| **R-10** | Politique de réessai avec recul exponentiel (*exponential backoff* + *jitter*) hors du LLM | Élevée | Configuration de la passerelle `agentgateway` et du runtime durable |
| **R-11** | Mode dégradé déterministe documenté en cas d'indisponibilité du fournisseur de modèle | **[BLOQUANT]** | Test de bascule multi-fournisseurs ou routage gracieux vers file humaine |
| **R-12** | Confinement strict des *Computer-Use Agents* (`CUA`) avec assertions visuelles pré/post | **[BLOQUANT]** | Harnais de sécurité `CUA` (si applicable ; sinon marqué Sans objet) |
| **R-13** | Validation sur Jumeau numérique déterministe avant toute consigne vers l'univers `OT` | **[BLOQUANT]** | Rapport de test du sas `IT/OT` (si applicable ; sinon marqué Sans objet) |
| **R-14** | Cloisonnement strict multi-locataire (*multi-tenant*) du contexte et des caches d'inférence | **[BLOQUANT]** | Test d'étanchéité inter-clients / inter-divisions sous charge concurrente |
| **R-15** | Campagne d'ingénierie du chaos réussie (latence extrême, erreurs HTTP 429/500, JSON tronqué) | Élevée | Rapport d'exécution du harnais de chaos sans corruption d'état |

---

## B.3 Grille 3 — Observabilité `OpenTelemetry`, Qualité `ADLC` et FinOps (15 points)

| # | Point de contrôle | Criticité | Artefact de preuve exigé en revue Go-Live |
|---|---|---|---|
| **O-01** | Émission de traces distribuées conformes aux conventions `OpenTelemetry gen_ai.*` | **[BLOQUANT]** | Visualisation d'une trace complète (Saga → `A2A` → LLM → `MCP`) |
| **O-02** | Caviardage / masquage automatique des renseignements personnels (PII) avant export OTel | **[BLOQUANT]** | Configuration du processeur de filtrage de l'OpenTelemetry Collector |
| **O-03** | Versionnage complet `SemVer + Intent` (code, prompts, modèle, schémas d'outils, politiques) | Élevée | Manifeste de version immuable dans le dépôt Git et le registre |
| **O-04** | Suite de simulation multi-tours représentative (≥ 100 scénarios incluant cas adversariaux) | **[BLOQUANT]** | Dossier de scénarios `OpenEnv` / type \(\tau\)-bench versionné |
| **O-05** | Seuil de constance \(\text{pass}^k\) atteint (\(k \ge 5\)) sur les invariants métiers critiques | **[BLOQUANT]** | Rapport CI/CD affichant \(\text{pass}^5\) au-dessus du seuil fixé dans l'ADR |
| **O-06** | Détection automatique en temps réel des boucles sémantiques (*livelocks* répétitifs) | Élevée | Règle d'alerte et d'interruption configurée sur le flux de télémétrie |
| **O-07** | Procédure de déploiement progressif (*Shadow Mode* puis *Canary* 1–5 %) opérationnelle | Élevée | Script de routage pondéré sur `agentgateway` et critères de retour arrière |
| **O-08** | Retour arrière (*rollback*) automatisé en moins de 2 minutes vers la version N-1 stable | **[BLOQUANT]** | Journal d'un test de rollback déclenché sur seuil d'anomalie simulé |
| **O-09** | Enveloppe budgétaire maximale en devises (`maxTotalCostCad`) active par transaction/saga | **[BLOQUANT]** | Test démontrant l'arrêt propre d'une saga dépassant son plafond FinOps |
| **O-10** | Routage cognitif hybride privilégiant les `SLM` pour les tâches d'extraction et de triage | Moyenne | Répartition mesurée des appels par palier de modèle en pré-production |
| **O-11** | Optimisation et mesure du taux de réutilisation du préfixe / `KV-cache` inter-tours | Moyenne | Tableau de bord de latence `TTFT` et ratio de jetons mis en cache |
| **O-12** | Imputation analytique temps réel des coûts par unité d'affaires, processus et client | **[BLOQUANT]** | Étiquettes FinOps présentes sur 100 % des requêtes passées par la passerelle |
| **O-13** | Définition formelle de l'événement métier de succès pour calculer le *Cost-per-Outcome* | Élevée | Formule et requête analytique reliant coût technique et résultat validé |
| **O-14** | Surveillance continue de la dérive sémantique et du taux d'escalade vers les humains | Élevée | Tableau de bord AgentOps hebdomadaire avec seuils d'alerte |
| **O-15** | Protocole de décommissionnement propre (révocation `NHI`, archivage traces, redirection) | Moyenne | Runbook d'extinction d'agent validé par l'équipe plateforme |

---

## B.4 Grille 4 — Gouvernance, Droit, Facteur Humain et Conformité 2027 (15 points)

| # | Point de contrôle | Criticité | Artefact de preuve exigé en revue Go-Live |
|---|---|---|---|
| **G-01** | Propriétaire métier nominatif (*Named Business Owner*) désigné et signataire | **[BLOQUANT]** | Charte de responsabilité signée dans le Registre d'Agents d'Entreprise |
| **G-02** | Inscription au système de management de l'IA conforme à **ISO/IEC 42001** | Élevée | Fiche d'impact, analyse de risques et calendrier de revue PDCA |
| **G-03** | Qualification de l'**empreinte de déploiement (*Deployment Footprint*)** réglementaire | **[BLOQUANT]** | Grille juridique qualifiant tous les systèmes aval connectés |
| **G-04** | Conformité **BSIF/OSFI E-23** (si institution financière fédérale canadienne, éch. 1er mai 2027) | **[BLOQUANT]** | Cote de matérialité, rapport de validation indépendante et suivi des tiers |
| **G-05** | Évaluation des facteurs relatifs à la vie privée (**ÉFVP / PIA**) approuvée (**Loi 25** / RGPD) | **[BLOQUANT]** | Dossier ÉFVP signé incluant la cartographie des flux transfrontaliers |
| **G-06** | Mécanisme d'information, d'explication et de révision humaine (**Loi 25 art. 12.1**) | **[BLOQUANT]** | Parcours client/employé testé lorsqu'une décision affecte un individu |
| **G-07** | Divulgation transparente d'interaction avec une IA (**EU AI Act art. 50**, actif août 2026) | **[BLOQUANT]** | Mention explicite dans les interfaces conversationnelles, vocales et courriels |
| **G-08** | Dossier technique et supervision humaine renforcée si haut risque (**EU AI Act Annexe III**) | **[BLOQUANT]** | Documentation technique conforme avant l'échéance de décembre 2027 |
| **G-09** | Alignement sémantique des concepts métiers critiques sur le standard `Apache Ossie` | Élevée | Validation par l'équipe Données de l'absence de définitions ad hoc |
| **G-10** | Droit à l'effacement et purge sélective vérifiable dans la mémoire long terme | **[BLOQUANT]** | Test d'oubli d'une entité cliente sans dégradation résiduelle |
| **G-11** | Ergonomie `HOTL` présentant les preuves contradictoires (prévention du biais `ASI09`) | Élevée | Revue UX de l'écran `A2UI` d'approbation (absence d'incitation biaisée) |
| **G-12** | Dispositif périodique de maintien de vigilance des superviseurs humains (`HOTL`) | Moyenne | Programme de dossiers tests d'étalonnage et suivi du temps de revue |
| **G-13** | Plafonds juridiques et mandats `AP2` signés pour toute transaction commerciale B2B | **[BLOQUANT]** | Politique de délégation de signature financière et mandats W3C VCs |
| **G-14** | Garde-fous explicites anti-collusion algorithmique sur les agents de prix ou d'enchères | **[BLOQUANT]** | Audit des consignes d'optimisation et des journaux de négociation |
| **G-15** | Archivage immuable et horodaté (WORM) des décisions critiques pour opposabilité légale | **[BLOQUANT]** | Politique de rétention conforme aux délais de prescription légaux |

---

## B.5 Grille 5 — Fédération B2B, Souveraineté Cognitive, Edge et Usine Interne (15 points)

| # | Point de contrôle | Criticité | Artefact de preuve exigé en revue Go-Live |
|---|---|---|---|
| **F-01** | Authentification légale `vLEI` + rôle `OOR` et contrat d'usage `ODRL 2.2` sur tout canal B2B | **[BLOQUANT]** | Accord `ContractAgreement` du connecteur `EDC` et test de rejet d'un pair non signé |
| **F-02** | Scission physique entre Agent Diplomate B2B et Évaluateur interne (zéro secret en DMZ) | **[BLOQUANT]** | Revue d'architecture et rapport Red Team d'extraction de prix de réserve |
| **F-03** | Rapprochement tripartite déterministe (`Cedar`) exigé avant toute libération `AP2` / `x402` | **[BLOQUANT]** | Test unitaire et d'intégration couvrant écart de poids, `SKU`, prix et signature `IoT` |
| **F-04** | Résidence juridictionnelle vérifiée des 6 couches d'état (dont `KV-cache` et `Temporal`) | **[BLOQUANT]** | Matrice de géofencing signée pour les classes `C2` (`Loi 25`) et `C3` (`E-23`) |
| **F-05** | Clés de chiffrement d'état et de pseudonymisation détenues localement (`HYOK` en `HSM`) | Élevée | Preuve de révocation d'accès `HSM` rendant illisibles les journaux infonuagiques |
| **F-06** | Attestation matérielle distante CPU+GPU (`TEE`) validée avant déchiffrement de charge `C3` | **[BLOQUANT]** | Politique du vérificateur d'attestation épinglant les registres `PCR` approuvés |
| **F-07** | Profil de secours *Open-Weights* (`Cognitive DR`) homologué et testé (`RTO < 15 min`) | **[BLOQUANT]** | Procès-verbal du dernier exercice trimestriel de coupure fournisseur primaire |
| **F-08** | Survie autonome `Edge` ≥ 72 h (`SPIRE`/`TPM` local, `SLM` embarqué) et baux d'époque `CRDT` | Élevée | Rapport d'essai câble WAN débranché et fusion sans conflit ni double dépense |
| **F-09** | Enveloppe matérielle `Simplex` (`ISO 10218:2025` / `IEC 61508`) isolant tout pont `MCP ↔ ROS 2` | **[BLOQUANT]** | Certificat d'homologation sécurité machine (si robotique ; sinon Sans objet) |
| **F-10** | Distribution signée `TUF`/`Sigstore` à double clé des bundles `Edge` avec bascule `A/B` | **[BLOQUANT]** | Test d'injection d'archive altérée ou expirée bloquée au démarrage |
| **F-11** | Séparation des devoirs `Agentic SDLC` (bâtisseur interdit d'écriture sur les tests d'or) | **[BLOQUANT]** | Règles de protection du dépôt Git et confinement réseau du bac de compilation |
| **F-12** | Porte de mutation (≥ 85 %) et parité *Shadow Mirroring* 30 jours sur module modernisé | **[BLOQUANT]** | Rapport du comparateur d'ombre à 0,00 \$ CAD d'écart sur ≥ 100 000 transactions |
| **F-13** | Contrats de données `ODCS v3` en mode *Write-Audit-Publish* devant tout lac alimentant des agents | Élevée | Test de gel automatique de branche `Nessie` sur injection de dérive d'unité ou `PSI` |
| **F-14** | Confinement de l'`Agentic SRE` (lecture seule assainie, zéro shell libre, budget `Cedar` R1/R2) | **[BLOQUANT]** | Politique `Cedar` interdisant `kubectl exec`/`SSH`, anti-*Log Injection* et `CIBA` sur `R3` |
| **F-15** | Sas anti-PII à canaris et porte de parité \(\text{pass}^5 \ge 99\,\%\) avant promotion d'un `SLM` distillé | **[BLOQUANT]** | Audit d'exposition de Carlini (`Loi 25`), cadre `PCCP` (`E-23`) et score *Holdout* scellé |

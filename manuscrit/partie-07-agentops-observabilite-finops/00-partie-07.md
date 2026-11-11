# PARTIE VII — Ingénierie de Production : AgentOps, Observabilité, Simulation et FinOps {.partie-titre}

> **Périmètre éditorial de la Partie VII** : 48 pages (p. 400–447) • **Chapitres 21 à 23**

Doter une flotte d'agents d'identités cryptographiques `NHI`, de politiques d'autorisation `Zero Trust` et de bacs à sable confinés — comme établi en Partie VI — conditionne le droit d'entrer en production, mais ne suffit pas à y survivre dans la durée. Contrairement à un microservice déterministe invariant entre deux livraisons, un système multi-agents évolue dans un régime d'incertitude continue : une révision des poids d'un modèle, un ajustement de schéma `MCP`, une dérive des requêtes clientes ou la latence d'un progiciel patrimonial suffisent à provoquer des boucles sémantiques furtives, une chute de fiabilité composée ou une envolée brutale de la facture d'inférence.

Exploiter une main-d'œuvre numérique à grande échelle exige donc de refonder les pratiques héritées du `DevOps` et du `MLOps` au sein d'une discipline d'ingénierie unifiée : l'**AgentOps**. Cette septième partie en déploie les trois piliers opérationnels :

* Le **Chapitre 21** établit l'observabilité distribuée de bout en bout fondée sur les conventions `OpenTelemetry gen_ai.*`, reliant dans un graphe causal unique sagas durables, délégations `A2A v1.0`, appels `MCP` et requêtes mémoire, tout en assurant la détection temps réel des *livelocks* sémantiques et le caviardage strict des renseignements personnels (`Loi 25`, `RGPD`).
* Le **Chapitre 22** formalise le cycle de vie `ADLC` et les pipelines `CI/CD` probabilistes : registre composite `SemVer + Intent`, simulation multi-tours sous `OpenEnv` et \(\tau\)-bench gouvernée par la constance \(\text{pass}^k\), ingénierie du chaos protocolaire et déploiements progressifs *Shadow* et *Canary* à retour arrière automatisé.
* Le **Chapitre 23** institue la gouvernance **FinOps agentique**, déplaçant le pilotage financier du prix facial au million de jetons vers le **coût complet par résultat métier validé (*Cost-per-Outcome*)**, armé de disjoncteurs budgétaires temps réel par saga et d'une rationalisation trimestrielle du portefeuille.

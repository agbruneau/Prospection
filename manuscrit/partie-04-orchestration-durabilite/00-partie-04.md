# PARTIE IV — Patrons d'Orchestration, Exécution Durable et Intégrité Transactionnelle {.partie-titre}

> **Périmètre éditorial de la Partie IV** : 89 pages (p. 198–286) • **Chapitres 11 à 14**

Disposer de protocoles normalisés (`MCP`, `A2A v1.0`) et d'une couche sémantique partagée sous `Apache Ossie` résout l'équation de la connectivité et du sens, mais laisse entière celle de la coordination distribuée dans le temps. Dès qu'un processus métier mobilise plusieurs agents spécialisés sur des heures ou des semaines, l'exécution en mémoire vive volatile s'effondre au moindre redémarrage de conteneur, dépassement de quota d'API ou délai d'approbation humaine. Sans épine dorsale déterministe, les réessais aveugles engendrent des écritures dupliquées dans les progiciels centraux, des boucles cognitives ruineuses et des états partiellement mutés impossibles à réconcilier en audit prudentiel.

Cette quatrième partie établit l'architecture d'exécution résiliente qui transforme un essaim d'agents interopérables en un moteur transactionnel de calibre industriel :

* Le **Chapitre 11** formalise l'arbitrage entre orchestration centralisée et chorégraphie décentralisée, compare six topologies canoniques — du superviseur hiérarchique aux enchères internes *Contract Net* et à l'hybride BPMN 2.0 / DMN — et livre une matrice multicritère de sélection.
* Le **Chapitre 12** approfondit les moteurs d'exécution durable (`Temporal`, `Restate`, `Microsoft Agent Framework`, `Amazon Bedrock AgentCore`), le rejeu déterministe sur journal immuable, la mise en veille sans serveur (`awakeables`) et la revalidation d'état et de mandat après réveil longue durée.
* Le **Chapitre 13** traite l'intégrité transactionnelle distribuée par maillage événementiel sur `Kafka` et `Solace`, en codifiant le patron *Saga* à compensation déterministe et sémantique, les boîtes d'envoi transactionnelles (*Transactional Outbox*) et le confinement des sorties irréversibles.
* Le **Chapitre 14** clôt cette partie par l'architecture du plan de données AI-natif (`agentgateway`, `Agent Router`), l'ordonnancement Kubernetes sensible au préfixe `KV-cache` (`llm-d`), le routage hybride `SLM`/`LLM` et les coupe-circuits budgétaires en ligne.

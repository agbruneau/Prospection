# PARTIE II — La Pile Protocolaire d'Interopérabilité Ouverte {.partie-titre}

> **Périmètre éditorial de la Partie II** : 73 pages (p. 72–144) • **Chapitres 4 à 7**

Découpler les plans de contrôle déterministes des cellules de raisonnement probabilistes, comme l'a établi la Partie I, ne suffit pas à fédérer un système d'information patrimonial fragmenté. Tant que chaque équipe relie ses agents aux progiciels métiers, aux pairs spécialisés et aux interfaces humaines au moyen d'adaptateurs sur mesure ou de cadriciels captifs, l'organisation subit une explosion combinatoire de connecteurs fragiles et s'enferme dans des silos éditeurs incompatibles. De même que TCP/IP et HTTP ont jadis permis d'interconnecter des parcs hétérogènes sans imposer un système d'exploitation unique, la consolidation institutionnelle de 2026–2027 autour de la Linux Foundation (`AAIF` et `AGNTCY`), de l'`ASF`, de l'`IETF`, du `W3C` et de `FIDO` dote l'entreprise agentique d'une pile protocolaire ouverte, stratifiée et auditable.

Cette deuxième partie détaille les contrats normatifs et les patrons d'implémentation de chacune de ces couches :

* Le **Chapitre 4** cartographie la gouvernance des standards en 2026–2027 (dont les dix projets fondateurs de l'`AAIF`), formalise le modèle protocolaire de référence en six couches, démontre la non-substituabilité entre outil et pair, puis outille la prévention du verrouillage fournisseur.
* Le **Chapitre 5** formalise la connectivité verticale via `MCP` sur `Streamable HTTP`, ses six primitives d'exécution, la conception d'outils orientés intention contre l'antipattern CRUD 1:1, les paquets `Agent Skills`, `Open Responses` et l'API navigateur `WebMCP`.
* Le **Chapitre 6** traite de la coordination horizontale entre agents autonomes grâce à `A2A v1.0`, à la découverte fédérée d'`AGNTCY` (`OASF`, `Agent Directory`), au transport basse latence `SLIM` chiffré en `MLS` post-quantique et aux topologies multi-locataires (`ANP`).
* Le **Chapitre 7** couvre la frontière d'interaction multimodale et transactionnelle : flux réactifs `AG-UI`, interfaces déclaratives `A2UI`, voix temps réel `WebRTC` tolérante aux interruptions (*barge-in*), mandats vérifiables `AP2` et règlements programmatiques `x402`.

# Chapitre 20 — Défense en profondeur : Sandboxing, garde-fous neuro-symboliques et coupe-circuits

::: {.synthese-executive title="Synthèse exécutive — Chapitre 20 (Cible : 18 pages)"}
* **Objectif architectural** : Couvrir de bout en bout la thématique *Défense en profondeur : Sandboxing, garde-fous neuro-symboliques et coupe-circuits*.
* **Budget éditorial** : 18 pages imprimées (incluant schémas protocolaires, patrons d'implémentation, fil rouge et ADR).
:::

## 20.1 Isolation d'exécution : microVMs (Firecracker), OpenSandbox (AAIF) et bacs à sable WebAssembly (WASI)

*Section planifiée (cible chapitre : 18 pages — format Hybride exigeant).*

## 20.2 Évaluation continue PDP/PEP hors du LLM via OPA (Rego), Cedar et raisonnement automatisé

*Section planifiée (cible chapitre : 18 pages — format Hybride exigeant).*

## 20.3 Coupe-circuits (Kill Switches) SOC multi-nuages et révocation instantanée d'états et de jetons

*Section planifiée (cible chapitre : 18 pages — format Hybride exigeant).*

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Étape du Chapitre 20"}
**Chantier prévu** : Déploiement de politiques Cedar en ligne et d'un coupe-circuit centralisé testé trimestriellement chez Boréal.
:::

::: {.encadre-sectoriel title="Fournisseurs Cloud & SaaS — Isolation multi-locataire stricte du code généré à la volée"}
*Éclairage vertical planifié conformément à la charte éditoriale.*
:::

::: {.adr title="ADR-020 — Découplage systématique des garde-fous déterministes (Cedar/OPA) et exécution en microVM isolée"}
**Statut** : Planifiée | **Portée** : Fabrique Agentique d'Entreprise | **Chapitre** : 20
:::

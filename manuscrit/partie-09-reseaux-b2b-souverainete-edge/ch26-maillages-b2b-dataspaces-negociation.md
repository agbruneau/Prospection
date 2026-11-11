# Chapitre 26 — Maillages B2B inter-entreprises, espaces de données (Dataspace) et négociation multi-parties

::: {.synthese-executive title="Synthèse exécutive — Chapitre 26"}

* **Enjeu stratégique** : Tant que la fabrique agentique s'arrête aux portes juridiques de l'organisation, les gains internes de vélocité viennent buter sur la friction inter-entreprises : courriels de relance fournisseur, messages `EDI X12` rigides aveugles aux aléas capacitaires, litiges de facturation de soixante jours et appels d'offres manuels. À l'inverse, exposer naïvement un agent d'achat ou de souscription à des agents externes sans architecture de confiance mutuelle expose l'entreprise à l'extraction adversariale de ses marges, à l'usurpation de mandataire social et à des engagements contractuels non autorisés.
* **Décisions architecturales structurantes** :
  1. *Irréversible à moyen terme* : Fédérer les relations B2B en couplant la découverte et la délégation `AGNTCY` / `A2A v1.0` avec un connecteur d'espace de données conforme au standard **Eclipse Dataspace Components (`EDC` / `DSP`)**, des politiques d'usage exécutables **`W3C ODRL 2.2`** et des identifiants d'entités juridiques vérifiables (**`GLEIF vLEI`**).
  2. *Non négociable en sécurité économique* : Isoler physiquement le graphe privé de valorisation interne (coûts de revient, prix de réserve, pénalités de rupture) de l'agent diplomate exposé au tiers, et déporter les enchères multi-attributs sensibles dans des **salles blanches confidentielles (*Confidential Clean Rooms*)** sur enclaves matérielles attestées.
  3. *Structurante pour la finance opérationnelle* : Remplacer le contrôle a posteriori des factures par le **rapprochement tripartite autonome (*Autonomous 3-Way Match*)** subordonnant la libération d'un séquestre `AP2` / `x402` à la concordance déterministe (`Cedar`) entre mandat contractuel, preuve physique `IoT` de réception et certificat qualité.
* **Indicateurs de gouvernance** : Partenaires B2B actifs authentifiés par `vLEI` et contrat `ODRL` signé (100 %), taux de fuite de paramètres de réserve lors des campagnes Red Team B2B (`0 %`), délai médian de rapprochement commande-réception-règlement (\(< 8\text{ min}\) hors litige physique) et taux d'écarts interceptés sans perte financière.

:::

## 26.1 Traverser les frontières de confiance zéro : couplage A2A / AGNTCY, connecteurs Dataspace (EDC) et identité légale vLEI

À l'intérieur d'une même entreprise (Chapitres 6 et 18), deux agents qui collaborent partagent en dernier ressort une racine de confiance commune : l'autorité de certification `SPIFFE/SPIRE` du groupe, son annuaire `Entra ID` et l'arbitrage hiérarchique d'une direction générale unique. Dès que l'orchestration traverse une frontière légale pour relier un donneur d'ordre industriel, un aciériste tiers, un transporteur transfrontalier et un assureur maritime, cette racine commune disparaît. Chaque participant opère dans un régime de **confiance nulle mutuelle (*Mutual Zero Trust*)** : le partenaire commercial d'aujourd'hui est simultanément le fournisseur d'un concurrent direct, une cible potentielle de compromission de chaîne d'approvisionnement (`OWASP ASI04`), et une contrepartie juridiquement autonome dont les intérêts économiques divergent sur le partage de la marge.

### Pourquoi l'EDI patrimonial et les portails fournisseurs ne suffisent plus en 2027

Depuis trente ans, l'intégration inter-entreprises repose sur un dualisme rigide. D'un côté, l'échange de données informatisé (**`EDI ANSI X12`** en Amérique du Nord, **`UN/EDIFACT`** en Europe) transporte avec une fiabilité remarquable des transactions canoniques figées : bon de commande (`X12 850`), avis préalable d'expédition (`856`), facture (`810`). Mais l'`EDI` est structurellement muet dès qu'une exception survient : lorsqu'une tempête verglaçante ferme un corridor ferroviaire ou qu'une coulée d'acier présente un écart métallurgique mineur mais potentiellement acceptable sous décote, la grammaire `EDI` ne permet ni de négocier un compromis multi-contraintes (délai contre remise, fractionnement de lot, itinéraire alternatif), ni de vérifier dynamiquement une empreinte carbone unitaire. De l'autre côté, les portails web fournisseurs rejettent la charge cognitive sur des opérateurs humains contraints de ressaisir les mêmes statuts dans douze extranets clients incompatibles.

Pour autant, substituer purement et simplement un canal conversationnel `A2A v1.0` libre à un flux `EDI` constituerait une régression grave en matière de sécurité juridique et de souveraineté des données. `A2A` normalise le cycle de vie d'une tâche déléguée et `AGNTCY` (`OASF`, `SLIM`) fournit l'annuaire et la messagerie chiffrée, mais ni l'un ni l'autre ne définissent à eux seuls **le droit contractuel de réutilisation d'une donnée industrielle partagée** ni **la capacité juridique légale du signataire corporatif**.

### La convergence architecturale 2027 : pile agentique + Dataspace Protocol (DSP) + vLEI

À l'état de l'art vérifié fin 2026 et déployé dans les écosystèmes industriels européens et nord-américains en 2027 (dans le sillage de **`Catena-X`**, **`Manufacturing-X`** et de la fondation Eclipse), le maillage B2B de référence superpose quatre strates complémentaires à chaque frontière d'entreprise :

1. **Ancrage d'identité corporative vérifiable (`GLEIF vLEI`)** : Un identifiant `SPIFFE` interne (`spiffe://boreal.ca/...`) n'a aucune valeur probante pour une banque ou un fournisseur externe. Chaque passerelle B2B présente un justificatif cryptographique **`vLEI` (*verifiable Legal Entity Identifier*)**, émis par un émetteur qualifié accrédité par la *Global Legal Entity Identifier Foundation* (`GLEIF`) sur infrastructure `KERI` / `ACDC` ou `W3C Verifiable Credentials`. Couplé à un justificatif de rôle fonctionnel (*Official Organizational Role*, `OOR`), le `vLEI` prouve mathématiquement que l'agent `boreal-bel-procurement` agit bien au nom de la personne morale enregistrée *Boréal Équipements & Logistique Inc.* et dans les limites d'une délégation du vice-président aux approvisionnements.
2. **Souveraineté d'usage des données par connecteur `EDC` et contrat `ODRL 2.2`** : Avant qu'un agent fournisseur ne transmette une nomenclature technique, un passeport numérique de produit (*Digital Product Passport*, `DPP`) ou une courbe de capacité d'usine, les deux connecteurs **Eclipse Dataspace Components (`EDC`)** négocient automatiquement via le *Dataspace Protocol* (`DSP`) une politique **`W3C ODRL` (*Open Digital Rights Language*)**. Ce contrat lisible par machine interdit explicitement l'ingestion des données du partenaire dans l'entraînement de modèles (`aiTrainingProhibited`), proscrit la rétention au-delà de la clôture de l'appel d'offres et bloque toute retransmission à des sous-agents tiers non listés.
3. **Négociation structurée sur `A2A v1.0` / `SLIM` hors texte libre non borné** : Une fois le tunnel `EDC` établi et chiffré en `SLIM` (*Messaging Layer Security*), les agents échangent des artefacts `A2A` strictement typés par schémas JSON (`RFQProposal`, `CounterOffer`, `CapacityAttestation`) plutôt que de la prose rhétorique susceptible de transporter des injections de prompt inter-entreprises (`OWASP ASI01` / `ASI07`).
4. **Coexistence hybride avec le patrimoine `EDI`** : Pour les partenaires de rang 2 ou 3 ne disposant pas encore d'agents `A2A` natifs fin 2026–2027, un adaptateur B2B bidirectionnel traduit les accords conclus en transactions `X12 850/855/856` normalisées, préservant l'investissement ERP existant.

![Architecture de maillage B2B inter-entreprises : séparation acheteur-fournisseur, connecteurs EDC sous politique ODRL, Clean Room confidentielle et rapprochement tripartite autonome.](manuscrit/figures/fig-26-maillage-b2b-dataspace-edc.svg)

| Dimension B2B | `EDI X12 / EDIFACT` patrimonial | `API` / `A2A` direct point-à-point | Maillage fédéré `A2A` + `EDC` (`ODRL`) + `vLEI` |
|---|---|---|---|
| **Preuve d'entité légale** | Pré-câblage `VAN` bilatéral lent (4–12 sem.) | Certificat `mTLS` technique sans mandat social | **`vLEI` + rôle `OOR` vérifiables instantanément** |
| **Gouvernance des données** | Implicite dans contrat papier cadre | Aucune garantie technique post-transmission | **Contrat `ODRL 2.2` appliqué par le connecteur `EDC`** |
| **Gestion des exceptions** | Nulle (rejet syntaxique → courriel humain) | Souple mais vulnérable à la manipulation | **Négociation bornée sur schémas typés + *Clean Room*** |
| **Risque d'injection `ASI01`** | Très faible (grammaire positionnelle stricte) | Élevé si champs texte libres ingérés par LLM | **Maîtrisé (désérialisation stricte + isolation diplomate)** |
| **Règlement financier** | Facture `810` + rapprochement manuel 30–60 j | Webhook de paiement sans preuve physique | **Tripartite déterministe `IoT` + `Cedar` + `AP2`/`x402`** |

---

## 26.2 Négociation algorithmique asymétrique, isolation stratégique des consignes et Confidential Clean Rooms

Faire négocier un agent acheteur et un agent vendeur soulève un problème de théorie des jeux et de sécurité cognitive absent des workflows internes : **l'asymétrie d'information privée**. Pour arbitrer intelligemment entre trois aciéristes sur un lot critique de tôles magnétiques, la fonction d'utilité de l'entreprise acheteuse dépend de paramètres hautement confidentiels — son prix maximal tolérable (*prix de réserve* \(P_{\max}\)), le coût horaire réel d'arrêt de sa ligne d'assemblage si la livraison glisse de quarante-huit heures, et le niveau exact de son stock de sécurité.

### L'antipattern fatal : l'agent négociateur monolithique détenteur du secret

Si l'architecte injecte naïvement `prix_max_autorise = 142 000 CAD` et `urgence_rupture_stock = CRITIQUE_J+3` dans le prompt système du même agent `LLM` qui dialogue sur le réseau `A2A` avec l'agent commercial externe, l'entreprise s'expose à une extraction quasi certaine de son surplus économique. Même sans attaque grossière, un agent vendeur entraîné par apprentissage par renforcement sur des milliers de négociations sonde méthodiquement l'élasticité temporelle et tarifaire de son interlocuteur, ou glisse dans les métadonnées techniques d'un certificat produit une directive adversariale subtile poussant l'agent acheteur à concéder immédiatement le haut de sa fourchette.

### Patron du « Diplomate Aveugle et de l'Évaluateur Scellé » (*Blind Diplomat / Sealed Evaluator*)

La défense architecturale repose sur une **scission topologique stricte en deux composants séparés par une frontière déterministe** :

1. **L'Agent Diplomate Externe (Zone DMZ B2B)** : Seul autorisé à communiquer sur le canal `A2A` / `EDC`, il ne connaît **ni le prix de réserve réel, ni les marges internes, ni l'état des stocks**. Il ne reçoit pour chaque tour qu'une enveloppe de mandat tactique étroite générée pour ce tour précis (ex. : *« Demander une cotation ferme pour 40 tonnes grade M270 livrées à Drummondville avant le 18 mai, objectif cible 126 500 \$ CAD, variante autorisée sur incoterm DAP »*). Toute réponse entrante du fournisseur est convertie par un analyseur syntaxique strict en structure numérique pure avant de franchir la DMZ ; aucun champ commentaire libre externe n'atteint jamais le système interne.
2. **Le Moteur d'Utilité et d'Évaluation Scellé (Zone Interne Haute Sécurité)** : Totalement isolé du réseau externe, ce service hybride (optimiseur mathématique déterministe secondé par un `SLM` interne d'analyse contractuelle) évalue les offres structurées reçues selon une fonction de score multi-attributs pondérée :

\[U(\mathbf{x}) = w_p \cdot \frac{P_{\max} - p}{P_{\max} - P_{\text{cible}}} + w_d \cdot \exp\bigl(-\lambda \max(0, d - d_{\text{req}})\bigr) + w_q \cdot S_{\text{qual}}(q) - w_c \cdot \frac{E_{\text{CO}_2}}{E_{\text{plafond}}}\]

Tant que \(p \le P_{\max}\) et que les contraintes dures de conformité sont satisfaites, le moteur interne calcule la contre-proposition optimale du tour \(t+1\) (avec un plafond dur de \(T_{\max} = 4\) tours pour interdire le sondage statistique prolongé par un tiers) ou émet un jeton d'acceptation vers le sas de signature `AP2`.

### Enchères et vérifications sans divulgation en *Confidential Clean Room* (`TEE`)

Lorsque la coopération B2B exige de croiser des données mutuellement secrètes — par exemple vérifier qu'un sous-traitant dispose réellement de la capacité machine libre promise sur les six prochaines semaines sans qu'il ne révèle son carnet de commandes clients, ou calculer une tarification d'assurance flotte sur la sinistralité fine sans transférer les données brutes —, les parties recourent à une **salle blanche confidentielle (*Confidential Clean Room*)** exécutée dans une enclave matérielle attestée (`Intel TDX`, `AMD SEV-SNP` ou `NVIDIA H100/B200 Confidential Computing`).

Chacune des deux entreprises vérifie à distance l'empreinte cryptographique (`PCR` / *Remote Attestation*) du binaire d'évaluation neutre tournant dans l'enclave avant de lui libérer ses entrées chiffrées. L'enclave exécute le calcul conjoint (optimisation linéaire, score de compatibilité ou audit d'empreinte carbone Scope 3), détruit la mémoire vive éphémère, et ne retourne aux agents `A2A` des deux rives qu'un **résultat booléen ou agrégé signé** (*« Capacité disponible confirmée à 99,4 % ; prix d'équilibre mutuellement gagnant : 131 400 \$ CAD »*).

### Gouvernance des accords de niveau de service B2B, pénalités programmables et réputation vérifiable

Dans un écosystème ouvert où des dizaines d'agents fournisseurs publient des `Agent Cards` promettant des délais ambitieux, comment distinguer un partenaire industriel fiable d'un soumissionnaire opportuniste sur-engageant ses lignes de production ? L'architecture fédérée complète l'évaluation ponctuelle du prix par un **registre de performance d'exécution vérifiable (*Verifiable Fulfillment Score*)** : chaque clôture de rapprochement tripartite génère un reçu cryptographique cosigné attestant le respect effectif du créneau horaire, de la conformité qualité et de l'absence de litige. Lors des consultations `A2A` suivantes, le moteur d'utilité pondère automatiquement l'offre nominale d'un fournisseur par sa fiabilité empirique observée sur les douze derniers mois, pénalisant mathématiquement les promesses non tenues sans jamais publier d'informations nominatives chez les concurrents.

Parallèlement, toute passerelle B2B applique un **pare-feu protocolaire asymétrique sur les délais et volumes d'appels** : un partenaire externe ne peut soumettre plus de trois requêtes d'appel d'offres par minute ni maintenir une tâche `A2A` ouverte sans mise à jour au-delà du `TTL` négocié dans le contrat `ODRL`, prévenant les attaques par déni de service économique (*Denial-of-Wallet*, Chapitre 23) où un tiers malveillant tenterait d'épuiser les budgets d'inférence internes sous un flot de fausses demandes de cotation complexes.

#### Extrait 26.1 — Politique `Cedar` interdisant l'accès du Diplomate B2B aux secrets internes (`b2b-dmz-isolation.cedar`)

Appliquée sur `agentgateway`, cette règle garantit par construction qu'aucun agent exposé au réseau `EDC`/`A2A` externe ne peut interroger un outil `MCP` interne exposant des marges ou des prix de réserve :

```cedar
// Tout agent en zone DMZ B2B est bloqué sur les données de marge
forbid (
  principal is Boreal::Agent,
  action == Boreal::Mcp::"InvokeTool",
  resource is Boreal::McpServer
)
when {
  principal.networkZone == "DMZ_EXTERNAL_B2B" &&
  resource.dataSensitivity in [
    "RESERVE_PRICING",
    "INTERNAL_BILL_OF_MATERIALS_COST",
    "PLANT_OUTAGE_PENALTY_CURVE"
  ]
};
```

#### Extrait 26.2 — Contrat d'usage `W3C ODRL 2.2` et enveloppe de négociation B2B scindée (`b2b-dataspace-offer.json`)

Ce descripteur normalisé lie l'identité légale `vLEI`, l'interdiction formelle d'exploitation secondaire des données sous `EDC` et l'offre structurée exempte de tout contexte privé interne :

```json
{
  "@context": [
    "http://www.w3.org/ns/odrl.jsonld",
    "https://w3id.org/tractusx/v2.0/context.jsonld"
  ],
  "@type": "odrl:Offer",
  "uid": "urn:uuid:8f41c2d0-91b3-4e6a-8a11-7c3092b41e09",
  "assigner": {
    "vlei": "549300BOREALBELQC882",
    "roleCredential": "OOR:VP_SUPPLY_CHAIN_DELEGATE",
    "edcConnector": "https://edc.bel.boreal.ca/api/v2/dsp"
  },
  "target": "urn:artifact:rfq-steel-m270-2027-05",
  "permission": [{
    "action": "odrl:use",
    "constraint": [
      {
        "leftOperand": "cx-policy:UsagePurpose",
        "operator": "odrl:eq",
        "rightOperand": "b2b.spot.quotation.evaluation"
      },
      {
        "leftOperand": "odrl:elapsedTime",
        "operator": "odrl:lteq",
        "rightOperand": "PT12H"
      }
    ]
  }],
  "prohibition": [{
    "action": [
      "cx-policy:ModelTraining",
      "odrl:distribute",
      "cx-policy:CompetitorBenchmarking"
    ]
  }],
  "rfqPayload": {
    "materialSpec": "ASTM-A677-M270-35A",
    "quantityMetricTons": 40.0,
    "deliveryIncoterms": "DAP_DRUMMONDVILLE_QC",
    "latestArrivalUtc": "2027-05-18T16:00:00Z",
    "targetPriceCad": 126500,
    "maxNegotiationRounds": 4
  }
}
```

::: {.encadre-sectoriel title="Droit de la Concurrence & Chaînes d'Approvisionnement — Prévenir la collusion tacite algorithmique dans les Dataspaces"}

Connecter plusieurs fournisseurs d'un même secteur à un espace de données agentique soulève une vigilance aiguë des autorités de la concurrence (Bureau de la concurrence du Canada, DG COMP européenne, DOJ américain). Pour qu'un maillage B2B demeure irréprochable :

1. **Étanchéité en étoile (*Hub-and-Spoke Isolation*)** : Lors d'un appel d'offres multi-fournisseurs, les sessions `A2A` / `EDC` sont strictement bilatérales et isolées ; aucun signal de prix ou de capacité soumis par le fournisseur A ne transite jamais, même sous forme de moyenne agrégée en temps réel, vers le fournisseur B.
2. **Interdiction des clauses d'alignement automatique temps réel** : Les moteurs d'utilité proscrivent les règles algorithmiques de type *« égaler automatiquement le prix concurrent détecté plus 0,5 % »*, assimilables à un cartel algorithmique tacite.

:::

---

## 26.3 Du flux EDI statique au rapprochement tripartite autonome (Autonomous 3-Way Match) et séquestre AP2 / x402

Conclure une négociation inter-agents en quelques secondes perd tout intérêt opérationnel si le cycle aval de réception, de vérification de facture et de décaissement retombe dans trente jours de rapprochements comptables manuels — ou, pire, si un agent financier décaisse instantanément des fonds irréversibles sur la simple foi d'une facture numérique envoyée par un agent tiers compromis.

En comptabilité d'entreprise, le contrôle fondamental contre la fraude et l'erreur d'exécution est le **rapprochement tripartite (*3-Way Match*)** : ne jamais payer une facture sans concordance avérée entre (1) ce qui a été commandé, (2) ce qui a été physiquement reçu et contrôlé, et (3) ce qui est facturé. En 2027, l'orchestration durable (`Temporal`) combinée aux capteurs `IoT` d'entrepôt, au moteur de politique `Cedar` et aux protocoles transactionnels **`AP2`** / **`x402`** permet d'exécuter ce contrôle de manière **instantanée, déterministe et cryptographiquement opposable**.

### Les quatre temps de la saga de règlement tripartite programmé

1. **Verrouillage contractuel initial (`AP2 CartMandate` en séquestre logique)** : À l'issue de la négociation `A2A`, l'évaluateur interne émet un mandat vérifiable `AP2 CartMandate` cosigné par le connecteur du fournisseur, qui fige l'identifiant article `Apache Ossie`, la quantité exacte, le prix unitaire convenu, la fourchette de tolérance industrielle (ex. \(\pm 0{,}5\,\%\) sur pesée vrac) et les pénalités de retard. Ce mandat crée simultanément le bon de commande dans `SAP S/4HANA` et réserve l'enveloppe budgétaire sans déclencher de transfert bancaire immédiat.
2. **Attestation physique de réception à preuve matérielle (`IoT` + `OASF`)** : À l'arrivée du camion au quai logistique, le pont-bascule étalonné, le portique `RFID` et le lecteur optique du certificat d'analyse métallurgique génèrent un justificatif signé de réception (*Signed Goods Receipt Attestation*). L'opérateur de quai n'intervient en `HOTL` que si l'inspection visuelle signale un dommage d'emballage.
3. **Arbitrage comptable hors `LLM` par politique `Cedar`** : Lorsqu'arrive la demande de règlement électronique du fournisseur (`A2A InvoiceArtifact` ou en-tête `x402` pour les services logistiques/numériques à l'acte), **aucun modèle de langage n'est autorisé à décider de la conformité comptable**. Une activité déterministe évalue la règle `Cedar` de rapprochement tripartite au centime et au kilogramme près.
4. **Libération du paiement ou mise en quarantaine de litige** : Si l'écart sur les trois pièces est inférieur aux seuils contractuels, le connecteur trésorerie libère automatiquement l'ordre de paiement `ISO 20022` (ou le jeton de règlement `x402` sur compte pré-provisionné) et scelle le dossier fiscal en stockage `WORM` septennal. Au moindre dépassement de tolérance, la somme litigieuse est gelée, la portion conforme peut faire l'objet d'un règlement partiel selon contrat, et un dossier contradictoire pré-instruit est ouvert pour arbitrage humain.

#### Extrait 26.3 — Arbitre déterministe de rapprochement tripartite B2B avant libération `AP2` (`three_way_match.py`)

Exécuté comme activité durable dans `Temporal`, ce garde-fou mathématique bloque toute hallucination ou tentative de surfacturation externe avant l'appel à l'API de trésorerie :

```python
from dataclasses import dataclass
from decimal import Decimal


@dataclass(frozen=True)
class MandateTerms:
    po_id: str
    supplier_vlei: str
    sku_code: str
    ordered_qty: Decimal
    unit_price_cad: Decimal
    qty_tolerance_ratio: Decimal  # ex. Decimal("0.005") = 0.5 %


@dataclass(frozen=True)
class PhysicalReceipt:
    po_id: str
    sku_code: str
    measured_qty: Decimal
    quality_passed: bool
    iot_gate_signature_valid: bool


@dataclass(frozen=True)
class SupplierInvoice:
    invoice_id: str
    po_id: str
    supplier_vlei: str
    billed_qty: Decimal
    billed_total_cad: Decimal


def evaluate_three_way_match(
    mandate: MandateTerms,
    receipt: PhysicalReceipt,
    invoice: SupplierInvoice,
) -> tuple[str, Decimal, str]:
    zero = Decimal("0.00")
    if invoice.supplier_vlei != mandate.supplier_vlei:
        return ("QUARANTINE_SECURITY", zero, "VLEI_MISMATCH")
    iot_ok = (
        receipt.iot_gate_signature_valid
        and receipt.quality_passed
    )
    if not iot_ok:
        return ("HOLD_QUALITY_HOTL", zero, "RECEIPT_UNVERIFIED")
    po_match = (
        receipt.po_id == mandate.po_id
        and invoice.po_id == mandate.po_id
    )
    if not po_match:
        return ("REJECT_CORRELATION", zero, "PO_ID_MISMATCH")

    qty_gap = abs(receipt.measured_qty - mandate.ordered_qty)
    max_gap = mandate.ordered_qty * mandate.qty_tolerance_ratio
    over_billed = invoice.billed_qty > receipt.measured_qty
    if qty_gap > max_gap or over_billed:
        return ("ESCALATE_AP_DISPUTE", zero, "QTY_OUT_OF_BOUNDS")

    raw_total = invoice.billed_qty * mandate.unit_price_cad
    expected_total = raw_total.quantize(Decimal("0.01"))
    diff = abs(invoice.billed_total_cad - expected_total)
    if diff > Decimal("0.02"):
        return ("ESCALATE_PRICE_DIFF", zero, "PRICE_DEVIATION")

    return (
        "RELEASE_AP2_SETTLEMENT",
        expected_total,
        "MATCH_VERIFIED",
    )
```

---

## 26.4 Application au fil rouge : le réseau fournisseurs et transporteurs fédéré du Groupe Boréal

Voyons comment **Groupe Boréal Inc.** étend sa fabrique interne (Parties I à VIII) à son écosystème d'approvisionnement nord-américain et européen au cours du second semestre 2027.

::: {.fil-rouge title="Fil rouge — Groupe Boréal : Maillage B2B de 320 fournisseurs et transporteurs chez BEL et BCA"}

**Problème opérationnel initial** : Bien que la division **Boréal Équipements & Logistique (BEL)** ait automatisé ses sagas internes (Chapitre 13), 38 % des retards d'assemblage de ses usines de Drummondville et de Mannheim provenaient d'aléas externes sur les aciers spéciaux, les roulements de précision et le transport routier transfrontalier. Les achats spot urgents mobilisaient onze acheteurs seniors par courriel et téléphone pendant 72 heures, tandis que le service des comptes fournisseurs traitait manuellement 4 900 écarts de facturation `EDI 810` par trimestre. Parallèlement, **Boréal Capital & Assurances (BCA)** mettait neuf jours ouvrables à placer en co-assurance externe les risques industriels dépassant sa rétention nette de 10 M\$ CAD.

**Architecture déployée** :
1. **Passerelle fédérée `EDC` + `AGNTCY` et identité `vLEI`** : Boréal a équipé sa DMZ de Montréal et de Francfort de connecteurs `Eclipse Dataspace Components` adossés à `agentgateway` et authentifiés par les `vLEI` respectifs de BEL et BCA. Les 85 fournisseurs stratégiques de rang 1 ont raccordé leurs propres agents commerciaux en `A2A v1.0` sous contrat `ODRL 2.2`, tandis que 235 transporteurs et fournisseurs de rang 2 ont été intégrés via le traducteur bidirectionnel `A2A ↔ EDI X12`.
2. **Séparation *Blind Diplomat / Sealed Evaluator* et *Clean Room* de co-assurance** : Chez BEL, les courbes de coûts de rupture d'atelier demeurent confinées sur le cluster interne ; l'agent diplomate négocie en quatre tours maximum les réallocations de lots en cas de perturbation logistique. Chez BCA, le placement de tranches de co-assurance avec trois réassureurs canadiens et européens s'opère dans une *Confidential Clean Room* `Azure/OVHcloud SEV-SNP`, calculant la prime technique sans jamais exposer le portefeuille nominatif des assurés (`Loi 25` et `BSIF E-23` tiers).
3. **Rapprochement tripartite `IoT` + `SAP` + `AP2`** : Aux quais des neuf centres logistiques BEL, la pesée connectée et le contrôle `RFID` déclenchent l'arbitre déterministe (Extrait 26.2).

**Résultats mesurés après six mois** :
* **Délai d'approvisionnement spot sur incident** ramené de 72 heures à **34 minutes**, réduisant de **61 %** les arrêts de ligne liés aux ruptures fournisseurs.
* **Taux de règlement sans intervention humaine (*Touchless AP*)** passé de 54 % à **93,8 %**, avec **zéro décaissement erroné** et une économie d'escompte pour paiement rapide validé de **2,1 M\$ CAD/an**.
* **Audit Red Team B2B** : 400 tentatives adversariales d'extraction du prix de réserve menées contre l'agent diplomate ont toutes échoué (`0 %` de fuite, la valeur secrète étant physiquement absente de son contexte mémoire).

:::

---

## 26.5 Décision d'architecture normative et points de contrôle

La décision `ADR-026` codifie les règles d'ouverture du maillage agentique aux partenaires commerciaux externes.

::: {.adr title="ADR-026 — Maillage B2B fédéré sous connecteurs Dataspace (EDC/ODRL), isolation du diplomate et règlement tripartite déterministe"}

* **Statut** : Acceptée | **Périmètre** : Relations B2B, Achats, Logistique & Co-assurance | **Révision** : Semestrielle
* **Contexte** : L'automatisation inter-entreprises par `A2A v1.0` offre des gains majeurs d'agilité sur l'`EDI` classique, mais expose l'entreprise au vol de secrets économiques, au réemploi non consenti de ses données industrielles, à l'injection adversariale inter-organisations et à la fraude au paiement si le modèle cognitif contrôle directement la trésorerie.
* **Options évaluées** :
  1. *Maintien exclusif de l'`EDI X12/EDIFACT` et de portails web manuels* : **Rejetée** — incapacité à gérer dynamiquement les pénuries, retards et négociations multi-attributs.
  2. *Exposition directe d'agents internes complets sur Internet via `A2A` et `mTLS`* : **Rejetée** — fuite inévitable des prix de réserve sous sondage adversarial et absence de gouvernance d'usage des données partagées.
  3. *Architecture B2B à connecteur `EDC` (`ODRL` + `vLEI`), séparation stricte Agent Diplomate / Évaluateur Scellé, Clean Rooms matérielles pour calculs conjoints et libération `AP2`/`x402` conditionnée à un rapprochement tripartite déterministe*. **Retenue**.
* **Décision** : (a) Exiger une identité légale `vLEI` et un contrat `W3C ODRL 2.2` sur tout canal B2B mutatif ; (b) interdire la présence des marges internes, stocks critiques et prix de réserve dans le contexte de tout agent dialoguant avec l'extérieur ; (c) imposer la validation déterministe hors `LLM` du triptyque Commande–Réception physique–Facture avant tout décaissement.
* **Conséquences** : Protection mathématique du secret d'affaires, opposabilité juridique inter-entreprises et élimination de la fraude à la facturation autonome, au prix de l'exploitation d'une passerelle `EDC` en DMZ et de la normalisation stricte des schémas d'offres.

:::

### Liste de contrôle de mise en production — Chapitre 26

1. **Identité corporative `vLEI`** : Chaque partenaire B2B connecté au maillage présente-t-il un justificatif `vLEI` et une délégation fonctionnelle `OOR` cryptographiquement vérifiés à l'ouverture de session ?
2. **Contrat d'usage `ODRL 2.2`** : Tout échange de données techniques, tarifaires ou capacitaires est-il gouverné par une politique `ODRL` interdisant l'entraînement de modèles tiers et la redistribution ?
3. **Scission Diplomate / Évaluateur** : Est-il prouvé par revue d'architecture que l'agent exposé au réseau externe n'a aucun accès en lecture aux prix de réserve, coûts marginaux et niveaux de stocks critiques ?
4. **Désérialisation stricte en DMZ** : Les offres et contre-propositions entrantes sont-elles converties en structures numériques typées en rejetant ou isolant tout texte libre susceptible de porter une injection `ASI01` ?
5. **Plafond de tours et anti-collusion** : Le protocole de négociation borne-t-il le nombre de tours (\(\le 4\)) et garantit-il l'étanchéité totale des informations entre soumissionnaires concurrents ?
6. **Enclaves *Clean Room*** : Les calculs conjoints sur données confidentielles mutuelles s'exécutent-ils dans une enclave `TEE` dont l'attestation matérielle est vérifiée par chaque partie avant déchiffrement ?
7. **Rapprochement tripartite hors `LLM`** : La libération d'un règlement `AP2` ou `x402` est-elle subordonnée à un contrôle déterministe exact entre mandat signé, preuve `IoT`/qualité de réception et facture ?
8. **Passerelle de repli `EDI`** : Un adaptateur `A2A ↔ EDI X12/EDIFACT` permet-il d'intégrer sans rupture les fournisseurs et transporteurs patrimoniaux non agentiques ?

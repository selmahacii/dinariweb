'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleCheck,
  Code2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GitBranch,
  Globe,
  Headphones,
  Lock,
  Mail,
  MapPin,
  Menu,
  Network,
  QrCode,
  Repeat,
  RotateCcw,
  Scale,
  Server,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Terminal,
  Truck,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react'

const APK_DOWNLOAD_URL = '/downloads/dinari-v1.0.5.apk'

const featureItems = [
  {
    icon: ShieldCheck,
    tag: 'Sécurité bancaire',
    title: 'Paiement ultra-sécurisé',
    desc: 'Chaque transaction fait l’objet de contrôles stricts anti-fraude avec authentification renforcée et chiffrement AES-256 de bout en bout.',
    badge: 'Chiffrement AES-256 & 3D Secure',
    accent: 'teal',
  },
  {
    icon: Lock,
    tag: 'Garantie Escrow',
    title: 'Séquestre Dinari automatique',
    desc: 'Vos fonds sont conservés sur un compte séquestre neutre et ne sont débloqués qu’après réception et inspection conforme du colis.',
    badge: 'Fonds protégés jusqu’à validation',
    accent: 'gold',
  },
  {
    icon: Wallet,
    tag: 'Gestion DZD',
    title: 'Wallet digital en temps réel',
    desc: 'Un portefeuille dédié en dinars algériens pour recharger votre solde, recevoir vos paiements et piloter vos opérations instantanément.',
    badge: 'Solde DZD disponible sans délai',
    accent: 'teal',
  },
  {
    icon: Activity,
    tag: 'Traçabilité Yalidine',
    title: 'Suivi transparent & horodaté',
    desc: 'Chaque étape est documentée et synchronisée en temps réel avec le transporteur, du premier scan jusqu’à la livraison finale.',
    badge: 'Statuts synchronisés en direct',
    accent: 'teal',
  },
  {
    icon: BadgeCheck,
    tag: 'Confiance & KYC',
    title: 'Vérification certifiée des vendeurs',
    desc: 'Commerçants audités avec pièces d’identité, registre de commerce et historique transparent des avis clients vérifiés.',
    badge: 'Marchands certifiés & notés',
    accent: 'gold',
  },
  {
    icon: Scale,
    tag: 'Médiation 24/7',
    title: 'Gestion équitable des litiges',
    desc: 'En cas d’anomalie ou de non-conformité, notre équipe d’arbitrage intervient avec impartialité pour protéger vos droits.',
    badge: 'Support & arbitrage dédié',
    accent: 'teal',
  },
]

const flowSteps = [
  {
    num: '01',
    tag: 'Initiation',
    title: 'Acheteur',
    desc: 'Choisit son produit et initie sa commande en toute transparence.',
    badge: 'Panier validé',
    Icon: Smartphone,
  },
  {
    num: '02',
    tag: 'Vérification',
    title: 'Commande',
    desc: 'Les détails, montants et conditions de la transaction sont vérifiés.',
    badge: 'Contrôles KYC',
    Icon: Code2,
  },
  {
    num: '03',
    tag: 'Séquestre clé',
    title: 'Transaction',
    desc: 'Le montant est sécurisé et séquestré par Dinari jusqu’à livraison.',
    badge: 'Fonds protégés',
    Icon: ShieldCheck,
    highlight: true,
  },
  {
    num: '04',
    tag: 'Expédition',
    title: 'Vendeur',
    desc: 'Le marchand prépare la commande et assure la livraison avec suivi.',
    badge: 'En route · Yalidine',
    Icon: GitBranch,
  },
  {
    num: '05',
    tag: 'Clôture',
    title: 'Finalisation',
    desc: 'Réception confirmée, fonds débloqués et cycle clôturé avec succès.',
    badge: 'Fonds libérés',
    Icon: Check,
  },
]

const transactionSteps = [
  {
    num: '01',
    title: 'Acheteur crée une commande',
    status: 'INITIÉE',
    badge: 'Panier validé',
    desc: 'L’acheteur sélectionne son produit et valide son intention d’achat. La commande est immédiatement enregistrée dans le registre Dinari avec un contrat de séquestre unique.',
    amount: '25 000 DZD',
    escrow: 'En attente de provision',
    carrier: 'Yalidine Express · Prêt',
    guarantee: 'Protocole Dinari Shield',
    points: [
      'Validation transparente du montant et des articles',
      'Émission instantanée du contrat de séquestre temporaire',
      'Notification push envoyée en temps réel au vendeur',
    ],
  },
  {
    num: '02',
    title: 'Paiement initié & sécurisé',
    status: 'EN ATTENTE',
    badge: 'Authentification 3D',
    desc: 'L’acheteur provisionne la commande via son wallet Dinari ou carte CIB/Edahabia. Les contrôles de sécurité et anti-fraude s’exécutent avant tout engagement.',
    amount: '25 000 DZD',
    escrow: 'Contrôle bancaire en cours',
    carrier: 'Bordereau en préparation',
    guarantee: 'Chiffrement AES-256',
    points: [
      'Contrôle automatique de solvabilité et d’identité',
      'Authentification forte OTP / 3D Secure',
      'Vérification des règles d’idempotence anti-doublon',
    ],
  },
  {
    num: '03',
    title: 'Montant réservé sous séquestre',
    status: 'SÉQUESTRÉ',
    badge: '100% protégé',
    desc: 'Les 25 000 DZD sont bloqués sur le compte tiers séquestre Dinari. Le vendeur est garanti d’être payé dès livraison, et l’acheteur est garanti de ne pas perdre ses fonds.',
    amount: '25 000 DZD',
    escrow: 'Fonds bloqués sur compte tiers',
    carrier: 'Bordereau #YAL-9824 généré',
    guarantee: 'Garantie irrévocable Dinari',
    points: [
      'Fonds 100% isolés et intouchables sans validation',
      'Garantie formelle de solvabilité notifiée au marchand',
      'Acheteur protégé contre les fraudes et non-conformités',
    ],
  },
  {
    num: '04',
    title: 'Vendeur prépare & expédie',
    status: 'EN TRANSIT',
    badge: 'Colis en route',
    desc: 'Rassuré par le séquestre actif, le marchand emballe la commande et la confie au transporteur. Le numéro de suivi Yalidine est synchronisé en direct.',
    amount: '25 000 DZD',
    escrow: 'Séquestre actif (en transit)',
    carrier: 'Yalidine · En acheminement (Alger)',
    guarantee: 'Suivi colis horodaté',
    points: [
      'Colis scanné au hub logistique avec preuve de dépôt',
      'Géolocalisation et statuts d’expédition en temps réel',
      'Avis d’arrivée envoyé par SMS à l’acheteur',
    ],
  },
  {
    num: '05',
    title: 'Livraison & inspection conforme',
    status: 'RÉCEPTIONNÉ',
    badge: 'Inspection OK',
    desc: 'L’acheteur réceptionne le colis en main propre, vérifie sa parfaite conformité, puis confirme la réception sur son application Dinari pour autoriser le déblocage.',
    amount: '25 000 DZD',
    escrow: 'Accord de déblocage initié',
    carrier: 'Colis livré avec signature client',
    guarantee: 'Délai d’inspection garanti',
    points: [
      'Remise physique contre signature sécurisée',
      'Contrôle de conformité de l’article par l’acheteur',
      'Validation du déblocage en 1 clic sur l’application',
    ],
  },
  {
    num: '06',
    title: 'Fonds débloqués & cycle finalisé',
    status: 'FINALISÉE',
    badge: 'Cycle clôturé',
    desc: 'Le séquestre est levé : les 25 000 DZD sont immédiatement crédités sur le solde disponible du vendeur. Reçu officiel généré et réputations mutuelles mises à jour.',
    amount: '25 000 DZD',
    escrow: 'Fonds débloqués et crédités',
    carrier: 'Livraison clôturée avec succès',
    guarantee: 'Reçu officiel téléchargeable',
    points: [
      'Versement instantané sur le wallet DZD du vendeur',
      'Émission de la facture et du justificatif de transaction',
      'Clôture irrévocable du ledger financier',
    ],
  },
]

const architectureItems = [
  {
    title: 'Funding check',
    tag: 'SOLVABILITÉ',
    desc: 'Vérifie en temps réel que les conditions de provision et les plafonds nécessaires à l’opération sont strictement réunis avant tout engagement.',
    endpoint: 'POST /v1/funding/verify',
  },
  {
    title: 'Business rules',
    tag: 'LOGIQUE MÉTIER',
    desc: 'Applique vos règles métier personnalisées, commissions de place de marché, conditions de déblocage et politiques spécifiques.',
    endpoint: 'POST /v1/rules/evaluate',
  },
  {
    title: 'Ledger immuable',
    tag: 'REGISTRE',
    desc: 'Journalise chaque mouvement avec une traçabilité cryptographique complète et un état financier en temps réel.',
    endpoint: 'GET /v1/ledger/accounts/{id}',
  },
  {
    title: 'Escrow Reservation',
    tag: 'SÉQUESTRE',
    desc: 'Immobilise et protège les montants engagés dans un coffre-fort logique tant que la livraison n’est pas certifiée conforme.',
    endpoint: 'POST /v1/escrow/hold',
  },
  {
    title: 'Settlement auto',
    tag: 'RÈGLEMENT',
    desc: 'Orchestre la libération et le transfert effectif des fonds vers les comptes marchands une fois les conditions remplies.',
    endpoint: 'POST /v1/settlement/release',
  },
  {
    title: 'Reconciliation',
    tag: 'AUDIT AUTOMATISÉ',
    desc: 'Rapproche automatiquement les opérations internes avec les flux bancaires CIB, Edahabia et relevés transporteurs.',
    endpoint: 'POST /v1/reconcile/run',
  },
  {
    title: 'Exception management',
    tag: 'LITIGES & RETOURS',
    desc: 'Gère les anomalies, retours colis, suspensions et résolutions de litiges avec workflows d’arbitrage configurables.',
    endpoint: 'POST /v1/disputes/escalate',
  },
  {
    title: 'Webhooks & Events',
    tag: 'TEMPS RÉEL',
    desc: 'Diffuse des événements signés (HMAC SHA-256) à vos serveurs à chaque changement d’état transactionnel ou de livraison.',
    endpoint: 'EVENT transaction.escrow.locked',
  },
]

const faqs = [
  {
    id: 1,
    category: 'escrow',
    tag: 'ÉCOSYSTÈME',
    q: 'Qu’est-ce que Dinari et à quel besoin répond-il ?',
    a: 'Dinari est la première plateforme d’orchestration de confiance et de séquestre digital conçue pour le commerce en Algérie. Elle résout la défiance entre acheteurs, vendeurs et livreurs en sanctuarisant les montants sur des comptes dédiés jusqu’à la confirmation de conformité à la livraison.',
    badges: ['Séquestre 100% garanti', 'Élimination des arnaques', 'Conçu à Alger'],
  },
  {
    id: 2,
    category: 'escrow',
    tag: 'FONCTIONNEMENT',
    q: 'Comment fonctionne concrètement une transaction sécurisée ?',
    a: 'Dès l’accord entre les deux parties, les fonds sont consignés via CIB ou Edahabia. Le vendeur expédie le colis en toute sérénité. À l’arrivée, l’acheteur inspecte son colis avant de transmettre son code secret OTP ou QR au livreur, ce qui débloque instantanément le virement vers le compte marchand.',
    badges: ['Débit CIB / Edahabia', 'Inspection avant paiement', 'Code OTP secret'],
  },
  {
    id: 3,
    category: 'engine',
    tag: 'INFRASTRUCTURE',
    q: 'Qu’est-ce que Dinari Engine et à qui s’adresse-t-il ?',
    a: 'Dinari Engine est une couche logicielle d’orchestration financière accessible via API REST et webhooks. Elle permet aux marketplaces e-commerce, plateformes de services et entreprises de brancher des règles de séquestre automatique, de split de paiements et de réconciliation bancaire en quelques lignes de code.',
    badges: ['API REST & Webhooks HMAC', 'SDKs Node, Python, PHP', 'Idempotence native'],
  },
  {
    id: 4,
    category: 'engine',
    tag: 'RÉGULATION & BANQUE',
    q: 'Dinari Engine est-il une banque ou un établissement financier ?',
    a: 'Non. Dinari n’est ni une banque ni un établissement de crédit. Dinari Engine agit comme une couche d’orchestration logique et technologique connectée aux réseaux bancaires nationaux (SATIM, GIE Monétique). Les fonds séquestrés sont cantonnés sur des comptes dédiés auprès de nos banques partenaires agréées.',
    badges: ['Fonds cantonnés hors bilan', 'Banques partenaires agréées', 'Conforme SATIM'],
  },
  {
    id: 5,
    category: 'engine',
    tag: 'ARCHITECTURE',
    q: 'Dinari remplace-t-il une passerelle de paiement (Payment Gateway) ?',
    a: 'Non. Dinari ne remplace pas votre agrégateur de paiement ou TPE virtuel existant. Engine s’intègre par-dessus les passerelles pour y ajouter la logique de séquestre conditionnel, le ledger en partie double immuable et la synchronisation avec les transporteurs.',
    badges: ['Complémentaire aux gateways', 'Ledger immuable', 'Logique métier avancée'],
  },
  {
    id: 6,
    category: 'escrow',
    tag: 'APPLICATION MOBILE',
    q: 'Puis-je télécharger et utiliser l’application Android dès aujourd’hui ?',
    a: 'Oui, l’application Android Dinari (v1.0.5 Beta) est disponible en téléchargement direct APK officiel sur notre site. Elle vous permet de suivre vos commandes, de recharger votre portefeuille en dinars et de générer vos codes de validation sécurisés.',
    badges: ['Installation APK directe', 'Compatible Android 8.0+', 'Sécurité certifiée'],
  },
  {
    id: 7,
    category: 'escrow',
    tag: 'LITIGES & RETOURS',
    q: 'Que se passe-t-il en cas de colis endommagé ou de non-conformité ?',
    a: 'Si le produit reçu ne correspond pas à la commande, l’acheteur refuse la remise du code OTP. Les fonds restent bloqués en séquestre neutre. Un litige est ouvert en un clic, et notre équipe de médiation locale intervient sous 24 à 48h pour organiser le retour ou le remboursement intégral.',
    badges: ['Fonds protégés', 'Médiation sous 24-48h', 'Remboursement garanti'],
  },
  {
    id: 8,
    category: 'engine',
    tag: 'INTÉGRATION B2B',
    q: 'Comment les développeurs et entreprises peuvent-ils tester l’API ?',
    a: 'Un environnement Sandbox complet en dinars algériens (DZD) est accessible immédiatement. Vous pouvez générer vos clés de test, émettre des intentions de séquestre simulées et écouter les événements webhooks en temps réel avant tout passage en production.',
    badges: ['Sandbox DZD instantanée', 'Spécifications OpenAPI', 'Support technique dédié'],
  },
]

function Brand({ dark = false }: { dark?: boolean }) {
  return <a href="#top" className={`brand ${dark ? 'brand-dark' : ''}`} aria-label="Dinari, accueil"><img src="/images/dinari-logo.png" alt="" className="brand-mark-image" /><span>Dinari</span></a>
}

function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div className={`phone-wrap ${className}`} aria-label="Aperçu de l’application Dinari">
      <div className="phone-glow" />
      <div className="phone">
        <div className="phone-notch">
          <span className="notch-speaker" />
          <span className="notch-camera" />
        </div>
        <div className="phone-screen">
          <img
            className="dashboard-reference"
            src="/images/dinari-dashboard.png"
            alt="Aperçu de l’application Dinari avec solde, commandes et opérations récentes"
          />
          <div className="phone-reflection" />
          <span className="live-status-ping" title="Livraison en cours" />
          <div className="phone-screen-pill">
            <span className="phone-pill-beacon" />
            <span>Traçabilité 100%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const trustFeatures = [
  {
    num: '01',
    icon: Activity,
    tag: 'REGISTRE DISTRIBUÉ',
    title: 'Traçabilité immuable',
    desc: 'Chaque centime engagé et chaque changement d’état est horodaté et inscrit dans un registre cryptographique infalsifiable.',
    meta: 'SHA-256 · Journal d’audit inviolable',
    metric: '100% traçable',
  },
  {
    num: '02',
    icon: ShieldCheck,
    tag: 'SÛRETÉ DES FONDS',
    title: 'Contrôles multicouches',
    desc: 'Vérifications systématiques anti-fraude, validation d’identité (KYC) et cantonnement des fonds sur comptes séquestres bancaires.',
    meta: 'Anti-fraude SATIM & GIE Monétique',
    metric: 'Triple contrôle',
  },
  {
    num: '03',
    icon: CheckCircle2,
    tag: 'CYCLE DE VIE DU PAIEMENT',
    title: 'États transactionnels lisibles',
    desc: 'Fini l’opacité du cash ou des virements perdus. L’acheteur, le vendeur et le transporteur partagent le même statut en direct.',
    meta: 'Initié → Séquestré → Livré → Débloqué',
    metric: 'Temps réel',
  },
  {
    num: '04',
    icon: Repeat,
    tag: 'INTÉGRITÉ LOGICIELLE',
    title: 'Idempotence absolue',
    desc: 'Même en cas de perte de connexion réseau mobile ou de double clic, une opération ne peut jamais être débitée deux fois.',
    meta: 'Clé UUID unique · Tolérance aux pannes',
    metric: 'Zéro doublon',
  },
  {
    num: '05',
    icon: BadgeCheck,
    tag: 'PREUVE PHYSIQUE & DIGITALE',
    title: 'Vérification bipartite',
    desc: 'Les fonds ne sont libérés qu’après double confirmation : scan physique du transporteur et validation du code secret par l’acheteur.',
    meta: 'Scan QR + Code OTP de remise',
    metric: 'Double validation',
  },
  {
    num: '06',
    icon: Scale,
    tag: 'PROTECTION & ARBITRAGE',
    title: 'Gestion des exceptions & litiges',
    desc: 'Colis endommagé ou non conforme ? Les fonds restent bloqués en séquestre neutre et notre équipe d’arbitrage intervient sous 24h.',
    meta: 'Médiation équitable · Remboursement garanti',
    metric: 'Protection 24/7',
  },
]

const apiCodeExamples = [
  {
    id: 'hold',
    tab: '01 · Créer un séquestre',
    method: 'POST',
    endpoint: '/v1/escrow/hold',
    status: '200 OK · 38ms',
    code: `POST /v1/escrow/hold
Content-Type: application/json
Idempotency-Key: e7b1a204-58f2-4bc2

{
  "order_id": "ORD-10482",
  "amount": 25000,
  "currency": "DZD",
  "buyer_id": "usr_dz_9410",
  "seller_id": "mkt_dz_0028",
  "carrier": "yalidine",
  "tracking_code": "YAL-781920-DZ",
  "auto_release": "on_verified_delivery"
}`,
    response: `{
  "escrow_id": "esc_948201a",
  "status": "held_in_escrow",
  "amount_locked": 25000,
  "buyer_guarantee": "active",
  "created_at": "2026-10-02T22:30:00Z"
}`,
  },
  {
    id: 'release',
    tab: '02 · Libérer les fonds',
    method: 'POST',
    endpoint: '/v1/escrow/release',
    status: '200 OK · 42ms',
    code: `POST /v1/escrow/release
Content-Type: application/json

{
  "escrow_id": "esc_948201a",
  "confirmation_code": "OTP-7821",
  "delivery_proof": "carrier_scan_confirmed",
  "split": {
    "merchant_net": 24250,
    "platform_fee": 750
  }
}`,
    response: `{
  "escrow_id": "esc_948201a",
  "status": "settled",
  "merchant_payout": "credited_instantly",
  "payout_reference": "VIR-SATIM-88219"
}`,
  },
  {
    id: 'webhook',
    tab: '03 · Webhook temps réel',
    method: 'EVENT',
    endpoint: 'transaction.escrow.locked',
    status: 'SIGNED HMAC-SHA256',
    code: `EVENT transaction.escrow.locked
X-Dinari-Signature: t=179098,v1=9e8f...

{
  "event_id": "evt_09182371",
  "event": "transaction.escrow.locked",
  "timestamp": "2026-10-02T22:30:01Z",
  "data": {
    "escrow_id": "esc_948201a",
    "order_id": "ORD-10482",
    "amount": 25000,
    "status": "protected"
  }
}`,
    response: `HTTP/1.1 200 OK
Acknowledged by your webhook receiver in 18ms`,
  },
]

const cycleSteps = [
  {
    num: '01',
    phase: 'ÉTAPE 01',
    stepName: 'INITIER',
    title: 'Initier & sceller l’accord',
    tag: 'ACCORD COMMERCIAL & DEVIS',
    icon: FileText,
    desc: 'L’acheteur et le vendeur s’accordent sur le montant, le mode d’expédition et les conditions de contrôle. Dinari génère un bon d’opération horodaté et inviolable.',
    protocol: 'Contrat logique & clé d’intention',
    actors: 'Acheteur ↔ Vendeur',
    guarantee: 'Montant gelé, conditions d’arbitrage fixées',
    codeEvent: 'transaction.intent_created',
    executionStatus: 'Prêt pour cantonnement bancaire',
    specs: [
      { label: 'Protocole', val: 'Contrat logique signé' },
      { label: 'Acteurs', val: 'Acheteur ↔ Vendeur' },
      { label: 'Garantie', val: 'Conditions d’arbitrage fixées' },
    ],
    jsonPayload: `{
  "event": "transaction.intent_created",
  "tx_id": "TX-DZ-2026-8891",
  "phase": "01_INTENTION",
  "parties": {
    "buyer": "usr_alg_9410 (KYC vérifié)",
    "seller": "mkt_dz_0028 (Marchand certifié)"
  },
  "terms": {
    "amount": 25000,
    "currency": "DZD",
    "inspection_window": "48 heures",
    "dispute_arbiter": "dinari_mediation_algiers"
  },
  "hash": "sha256:7f9a2b8e4c190..."
}`,
  },
  {
    num: '02',
    phase: 'ÉTAPE 02',
    stepName: 'CONTRÔLER',
    title: 'Cantonner & sécuriser les fonds',
    tag: 'SÉQUESTRE SÉCURISÉ',
    icon: Lock,
    desc: 'Le montant est débité via CIB ou Edahabia et sanctuarisé sur un compte séquestre dédié. Le vendeur prépare le colis avec la certitude d’être payé.',
    protocol: 'Cantonnement SATIM & Coffre logique',
    actors: 'Dinari Engine ↔ Réseau CIB',
    guarantee: '100% protégé contre le non-paiement',
    codeEvent: 'escrow.funds_held_locked',
    executionStatus: 'Fonds sanctuarisés sous séquestre',
    specs: [
      { label: 'Protocole', val: 'Cantonnement SATIM' },
      { label: 'Acteurs', val: 'Dinari Engine ↔ Banque' },
      { label: 'Garantie', val: 'Protection intégrale du paiement' },
    ],
    jsonPayload: `{
  "event": "escrow.funds_held_locked",
  "tx_id": "TX-DZ-2026-8891",
  "phase": "02_ESCROW_HOLD",
  "vault": "SATIM_DEDICATED_ESCROW_ACC",
  "amount_locked": 25000,
  "currency": "DZD",
  "idempotency_key": "e7b1a204-58f2-4bc2",
  "buyer_protection": "ACTIVE_UNTIL_DELIVERY",
  "hash": "sha256:3d1e90b2f8a55..."
}`,
  },
  {
    num: '03',
    phase: 'ÉTAPE 03',
    stepName: 'ORCHESTRER',
    title: 'Coordonner flux & inspection',
    tag: 'EXPÉDITION & CONTRÔLE',
    icon: Truck,
    desc: 'Le transporteur achemine le colis sous supervision d’événements webhooks signés. L’acheteur inspecte son produit avant de communiquer son code OTP.',
    protocol: 'Webhooks transporteur & Code OTP',
    actors: 'Transporteur (Yalidine) ↔ Acheteur',
    guarantee: 'Inspection physique avant tout déblocage',
    codeEvent: 'logistics.delivery_handover',
    executionStatus: 'En cours d’acheminement & inspection',
    specs: [
      { label: 'Protocole', val: 'Tracking API & Code OTP' },
      { label: 'Acteurs', val: 'Transporteur ↔ Acheteur' },
      { label: 'Garantie', val: 'Droit de contrôle à la livraison' },
    ],
    jsonPayload: `{
  "event": "logistics.delivery_handover",
  "tx_id": "TX-DZ-2026-8891",
  "phase": "03_LOGISTICS_INSPECTION",
  "carrier": "YALIDINE_EXPRESS_DZ",
  "tracking_num": "YAL-781920-DZ",
  "status": "OUT_FOR_DELIVERY",
  "verification_method": "SECRET_OTP_SMS_QR",
  "hash": "sha256:1a8c44f772e04..."
}`,
  },
  {
    num: '04',
    phase: 'ÉTAPE 04',
    stepName: 'FINALISER',
    title: 'Libérer & archiver au grand livre',
    tag: 'CLÔTURE & RÈGLEMENT IMMUABLE',
    icon: BadgeCheck,
    desc: 'Dès validation bilatérale (scan OTP), le séquestre est levé et les fonds sont versés instantanément au vendeur. L’opération est scellée dans le grand livre.',
    protocol: 'Virement instantané DZD & Grand livre',
    actors: 'Banque partenaire ↔ Marchand',
    guarantee: 'Paiement irrévocable & reçu légal',
    codeEvent: 'settlement.funds_released_closed',
    executionStatus: 'Transaction clôturée avec succès',
    specs: [
      { label: 'Protocole', val: 'Virement instantané DZD' },
      { label: 'Acteurs', val: 'Banque ↔ Vendeur' },
      { label: 'Garantie', val: 'Règlement irrévocable & reçu' },
    ],
    jsonPayload: `{
  "event": "settlement.funds_released_closed",
  "tx_id": "TX-DZ-2026-8891",
  "phase": "04_SETTLED_FINAL",
  "seller_payout": 24250,
  "currency": "DZD",
  "platform_fee": 750,
  "payout_receipt": "VIR-SATIM-88219-DZ",
  "ledger_entry": "IMMUTABLE_BLOCK_#94821",
  "hash": "sha256:9c0d54e311bf2..."
}`,
  },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [activeFlowStep, setActiveFlowStep] = useState(2)
  const [activeArch, setActiveArch] = useState(0)
  const [activeApiTab, setActiveApiTab] = useState(0)
  const [activeCycleStep, setActiveCycleStep] = useState(0)
  const [copiedCode, setCopiedCode] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(1)
  const [faqCategory, setFaqCategory] = useState<'all' | 'escrow' | 'engine'>('all')
  const [ecoTab, setEcoTab] = useState<'consumer' | 'engine'>('consumer')
  const apkReady = Boolean(APK_DOWNLOAD_URL)

  const filteredFaqs = faqs.filter((item) => {
    if (faqCategory === 'all') return true
    return item.category === faqCategory
  })

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  return <main id="top">
    <nav className="navbar">
      <div className="nav-inner">
        <Brand />
        <div id="primary-navigation" className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="#produit" onClick={() => setMenuOpen(false)}>Produit</a>
          <a href="#engine" onClick={() => setMenuOpen(false)}>Dinari Engine</a>
          <a href="#fonctionnement" onClick={() => setMenuOpen(false)}>Comment ça marche</a>
          <a href="#securite" onClick={() => setMenuOpen(false)}>Sécurité</a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a>
          <a className="mobile-cta" href="#download" onClick={() => setMenuOpen(false)}>Télécharger l’application</a>
        </div>
        <div className="nav-actions">
          <a className="nav-secondary" href="/engine">Explorer Engine <ArrowUpRight /></a>
          <a className="button button-gold nav-cta" href="#download">Télécharger l’app</a>
          <button type="button" className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
    {menuOpen && <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />}

    <section className="hero">
      <div className="hero-grid" />
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="kicker">
            <span /> WALLET DIGITAL &amp; SÉQUESTRE
          </div>
          <h1>
            Plus qu’un portefeuille.<br />
            <em>Un écosystème de confiance.</em>
          </h1>
          <p className="hero-lead-text">
            Paiements <strong>CIB / Edahabia</strong>, transferts <strong>P2P instantanés</strong> et <strong>séquestre garanti</strong> pour sécuriser tout votre commerce en ligne.
          </p>
          <div className="hero-buttons">
            <a className="button button-gold" href="#produit">
              Découvrir l’écosystème <ArrowRight />
            </a>
            <a className="text-link" href="#download">
              Télécharger l’APK <ArrowUpRight />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-label label-top">
            <div className="visual-label-head">
              <span className="pulse" />
              <span>WALLET DIGITAL</span>
            </div>
            <div className="visual-label-body">
              <strong>100%</strong>
              <small>CONFORME</small>
            </div>
            <div className="visual-label-sub">
              <ShieldCheck className="w-3 h-3 visual-sub-icon" />
              <span>Fonds protégés</span>
            </div>
          </div>
          <PhoneMockup />

          {/* Floating Chip 1: Transfert P2P Instantané */}
          <div className="floating-chip chip-one">
            <div className="chip-icon-box success">
              <CircleCheck />
            </div>
            <div className="chip-content">
              <strong>Transfert P2P instantané</strong>
              <small>CIB · Edahabia · Zéro frais</small>
            </div>
          </div>

          {/* Floating Chip 2: Solde Portefeuille & Séquestre */}
          <div className="floating-chip chip-two">
            <div className="chip-header-line">
              <Wallet className="chip-wallet-icon" />
              <span>SOLDE DU WALLET</span>
            </div>
            <div className="chip-amount-row">
              <span className="chip-line" />
              <strong>51 600</strong>
              <small>DZD</small>
            </div>
            <div className="chip-escrow-pill">
              <Lock className="w-3 h-3 chip-gold-icon" />
              <span>Garanti sous séquestre</span>
            </div>
          </div>

          <div className="hero-node node-one" />
          <div className="hero-node node-two" />
        </div>
      </div>
    </section>

    <section className="section intro" id="produit">
      <div className="container">
        <div className="section-head split">
          <div>
            <div className="kicker dark"><span /> L’EXPÉRIENCE DINARI</div>
            <h2>La confiance,<br /><span>à chaque étape.</span></h2>
          </div>
          <p>Dinari est une plateforme de confiance pour faciliter les transactions entre acheteurs et vendeurs dans le commerce digital. Une expérience simple en surface, conçue avec sérieux sous le capot.</p>
        </div>

        <div className="flow-container">
          <div className="flow-track">
            <div
              className="flow-track-fill"
              style={{ width: `${((activeFlowStep + 1) / flowSteps.length) * 100}%` }}
            />
          </div>

          <div className="flow-grid">
            {flowSteps.map((stepItem, i) => {
              const StepIcon = stepItem.Icon
              const isActive = activeFlowStep === i
              return (
                <div
                  key={stepItem.num}
                  className={`flow-card ${isActive ? 'is-active' : ''} ${stepItem.highlight ? 'is-highlight' : ''}`}
                  onClick={() => setActiveFlowStep(i)}
                  onMouseEnter={() => setActiveFlowStep(i)}
                >
                  <div className="flow-card-head">
                    <span className="flow-step-num">{stepItem.num}</span>
                    <span className="flow-step-tag">{stepItem.tag}</span>
                  </div>
                  <div className="flow-icon-wrap">
                    <StepIcon />
                  </div>
                  <h3>{stepItem.title}</h3>
                  <p>{stepItem.desc}</p>
                  <span className="flow-micro-badge">
                    <Check /> {stepItem.badge}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flow-trust-strip">
            <div className="flow-trust-item">
              <ShieldCheck />
              <div>
                <strong>Protection bilatérale</strong>
                <span>Acheteur protégé contre la non-conformité, vendeur garanti d’être payé dès livraison.</span>
              </div>
            </div>
            <div className="flow-trust-item">
              <Lock />
              <div>
                <strong>Séquestre Dinari automatique</strong>
                <span>Les fonds restent bloqués en toute sécurité jusqu’à confirmation mutuelle.</span>
              </div>
            </div>
            <div className="flow-trust-item">
              <CircleCheck />
              <div>
                <strong>Traçabilité temps réel</strong>
                <span>Chaque étape est documentée et synchronisée avec le transporteur (Yalidine Express).</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section feature-section" id="avantages">
      <div className="feature-bg-ambient" aria-hidden="true" />
      <div className="container">
        <div className="section-head centered">
          <div className="kicker dark"><span /> UNE EXPÉRIENCE CLAIRE</div>
          <h2>Tout ce qu’il faut.<br /><span>Rien de superflu.</span></h2>
          <p>Des outils pensés pour donner de la visibilité à chaque opération, éliminer les incertitudes et garder le contrôle total de vos transactions.</p>
        </div>

        <div className="feature-grid">
          {featureItems.map((item) => {
            const IconComponent = item.icon
            return (
              <div className="feature-card" key={item.title}>
                <div className="feature-card-header">
                  <div className={`feature-icon-box ${item.accent === 'gold' ? 'accent-gold' : ''}`}>
                    <IconComponent />
                  </div>
                  <span className="feature-tag">{item.tag}</span>
                  <div className="feature-arrow-btn" aria-hidden="true">
                    <ArrowUpRight />
                  </div>
                </div>

                <div className="feature-card-body">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="feature-card-footer">
                  <span className="feature-pill">
                    <CheckCircle2 className="feature-pill-icon" />
                    <span>{item.badge}</span>
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>

    <section className="section demo-section" id="fonctionnement">
      <div className="demo-ambient-glow" aria-hidden="true" />
      <div className="container">
        <div className="section-head split">
          <div>
            <div className="kicker"><span /> DÉMONSTRATION INTERACTIVE</div>
            <h2>Voyez comment<br /><em>Dinari fonctionne.</em></h2>
          </div>
          <p>Une simulation visuelle pas-à-pas du cycle d’une transaction sous séquestre Dinari. Explorez chaque contrôle en temps réel sans engager de fonds réels.</p>
        </div>

        <div className="demo-panel">
          {/* Sidebar */}
          <div className="demo-sidebar">
            <div className="demo-caption">
              <span>CYCLE DE TRANSACTION</span>
              <span className="demo-badge">6 étapes</span>
            </div>

            <div className="demo-steps-list">
              {transactionSteps.map((s, i) => {
                const isSelected = i === step
                const isDone = i < step
                return (
                  <button
                    type="button"
                    className={`demo-step ${isSelected ? 'selected' : ''} ${isDone ? 'done' : ''}`}
                    key={s.title}
                    onClick={() => setStep(i)}
                  >
                    <div className="demo-step-num">
                      {isDone ? <Check /> : s.num}
                    </div>
                    <div className="demo-step-meta">
                      <b>{s.title}</b>
                      <span className="demo-step-tag">{s.status}</span>
                    </div>
                    {isSelected && <ArrowRight className="demo-step-arrow" />}
                  </button>
                )
              })}
            </div>

            <div className="demo-sidebar-footer">
              <div className="demo-protocol-pill">
                <ShieldCheck />
                <div>
                  <strong>Dinari Escrow Engine</strong>
                  <small>Orchestration 100% automatisée</small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Display Console */}
          <div className="demo-display">
            <div className="display-top">
              <div className="display-top-title">
                <span className="display-prompt">&gt;</span>
                <span>DINARI / SIMULATEUR DE SÉQUESTRE</span>
                <span className="display-id">#TX-2026-DZ</span>
              </div>
              <div className="live-dot">
                <i /> Simulation en direct
              </div>
            </div>

            <div className="display-center">
              {/* Column A: Live Transaction Card */}
              <div className="live-tx-card">
                <div className="tx-card-header">
                  <div className="tx-card-brand">
                    <ShieldCheck className="tx-brand-icon" />
                    <span>DINARI SÉQUESTRE</span>
                  </div>
                  <span className={`tx-status-badge status-${step}`}>
                    <span className="tx-status-dot" />
                    {transactionSteps[step].status}
                  </span>
                </div>

                <div className="tx-orbit-wrap">
                  <div className="transaction-orbit">
                    <div className="orbit-ring ring-a" />
                    <div className="orbit-ring ring-b" />
                    <div className="orbit-glow" />
                    <div className="orbit-core">
                      <ShieldCheck />
                      <small>SÉQUESTRE</small>
                      <strong>{transactionSteps[step].amount}</strong>
                    </div>
                  </div>
                </div>

                <div className="tx-data-grid">
                  <div className="tx-data-item">
                    <small>État des fonds</small>
                    <strong>{transactionSteps[step].escrow}</strong>
                  </div>
                  <div className="tx-data-item">
                    <small>Transporteur</small>
                    <strong>{transactionSteps[step].carrier}</strong>
                  </div>
                  <div className="tx-data-item">
                    <small>Protection</small>
                    <strong>{transactionSteps[step].guarantee}</strong>
                  </div>
                  <div className="tx-data-item">
                    <small>Règlement</small>
                    <strong>DZD (Dinar Algérien)</strong>
                  </div>
                </div>
              </div>

              {/* Column B: Step Explanations & Checkpoints */}
              <div className="display-copy">
                <div className="display-step-badge">
                  <span className="display-index">ÉTAPE {transactionSteps[step].num} / 06</span>
                  <span className="display-pill-badge">{transactionSteps[step].badge}</span>
                </div>

                <h3>{transactionSteps[step].title}</h3>
                <p className="display-main-desc">{transactionSteps[step].desc}</p>

                <div className="display-checkpoints">
                  <div className="checkpoints-title">CONTRÔLES EXÉCUTÉS À CETTE ÉTAPE :</div>
                  <ul>
                    {transactionSteps[step].points.map((pt, idx) => (
                      <li key={idx}>
                        <CheckCircle2 className="chk-icon" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="demo-controls-wrapper">
                  <div className="demo-controls">
                    <button
                      type="button"
                      className="demo-btn-prev"
                      onClick={() => setStep(Math.max(0, step - 1))}
                      disabled={step === 0}
                    >
                      Précédent
                    </button>
                    <button
                      type="button"
                      className="button button-gold demo-btn-next"
                      onClick={() => setStep(step === transactionSteps.length - 1 ? 0 : step + 1)}
                    >
                      {step === transactionSteps.length - 1 ? (
                        <>Recommencer <RotateCcw /></>
                      ) : (
                        <>Étape suivante <ArrowRight /></>
                      )}
                    </button>
                  </div>

                  {/* Micro Step Dots Indicator */}
                  <div className="demo-dots" aria-label="Sélecteur d’étape">
                    {transactionSteps.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`demo-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                        onClick={() => setStep(i)}
                        aria-label={`Aller à l'étape ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="display-progress-wrapper">
              <div className="display-progress-track">
                <span
                  className="display-progress-bar"
                  style={{ width: `${((step + 1) / transactionSteps.length) * 100}%` }}
                />
              </div>
              <div className="display-progress-meta">
                <span>Progression : <b>{Math.round(((step + 1) / transactionSteps.length) * 100)}%</b></span>
                <span><b>{step + 1}</b> sur 6 étapes validées</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section app-section" id="application">
      <div className="app-ambient-glow" aria-hidden="true" />
      <div className="container app-layout">
        {/* Left: Phone visual with floating interactive chips */}
        <div className="app-visual">
          <div className="app-backdrop-shape" aria-hidden="true" />
          <div className="app-phone-container">
            <PhoneMockup />
            
            {/* Floating Live Notification Chip (Top Left) */}
            <div className="app-floating-badge badge-notif">
              <span className="app-badge-dot" />
              <div>
                <strong>Colis #DZ-00159 Yalidine Express</strong>
                <small>En cours · Déblocage par code OTP</small>
              </div>
            </div>

            {/* Floating Transfer P2P Chip (Middle Left) */}
            <div className="app-floating-badge badge-p2p">
              <CheckCircle2 className="badge-check-icon" />
              <div>
                <small>Transfert P2P instantané</small>
                <strong>+14 500 DZD (Reçu)</strong>
              </div>
            </div>

            {/* Floating Escrow Status Chip (Bottom Right) */}
            <div className="app-floating-badge badge-balance">
              <ShieldCheck className="badge-shield-icon" />
              <div>
                <small>Solde Wallet Digital</small>
                <strong>51 600 DZD (Séquestre SATIM)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rich Copy, Feature Value Props, Download Box */}
        <div className="app-copy">
          <div className="kicker dark"><span /> EXPÉRIENCE MOBILE & SITE 100% UNIFIÉE</div>
          <h2>Plus qu’un portefeuille.<br /><span>Toute la puissance dans votre poche.</span></h2>
          <p className="app-lead">
            L’expérience mobile Dinari restitue l’intégralité des capacités du site web : <strong>Wallet digital</strong> en DZD, gestion financière complète, paiement direct <strong>CIB / Edahabia</strong>, transferts <strong>P2P instantanés</strong> et protection des transactions sous <strong>séquestre</strong> pour le commerce en ligne.
          </p>

          {/* 4 Rich Value Proposition Cards matching the platform experience */}
          <div className="app-feature-list">
            <div className="app-feature-row">
              <div className="app-feat-icon feat-teal">
                <Wallet />
              </div>
              <div className="app-feat-text">
                <strong>Wallet Digital & Solde en temps réel</strong>
                <span>Portefeuille électronique en DZD. Rechargez par CIB / Edahabia, visualisez votre solde actif et gérez vos avoirs en un clic.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-gold">
                <ShieldCheck />
              </div>
              <div className="app-feat-text">
                <strong>Séquestre Marketplace & Protection</strong>
                <span>Achetez et vendez sur les marketplaces en toute sérénité : les fonds restent consignés jusqu’à confirmation physique de réception.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-teal">
                <Repeat />
              </div>
              <div className="app-feat-text">
                <strong>Paiement digital & Transfert P2P instantané</strong>
                <span>Envoyez de l’argent entre utilisateurs Dinari en quelques secondes, sans frais cachés et avec reçu numérique certifié.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-gold">
                <Activity />
              </div>
              <div className="app-feat-text">
                <strong>Gestion financière & Traçabilité SATIM</strong>
                <span>Suivi dynamique Yalidine Express, double validation par code OTP et historique infalsifiable sur l’ensemble des 58 wilayas.</span>
              </div>
            </div>
          </div>

          {/* Download Action Box */}
          <div className="app-action-box">
            <div className="app-btn-group">
              <a className="button button-navy app-download-btn" href="#download">
                <Download className="w-4 h-4" />
                <span>Télécharger l’application Android</span>
                <ArrowUpRight className="app-btn-arrow" />
              </a>
              <a className="app-qr-link" href="#download">
                <QrCode className="w-4 h-4" />
                <span>Scanner le QR Code</span>
              </a>
            </div>

            {/* Spec & Security Badges Strip */}
            <div className="app-specs-strip">
              <div className="app-spec-item">
                <span className="spec-label">SYSTÈME</span>
                <b>Android 8.0+</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">VERSION</span>
                <b>v1.0.5 (APK)</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">TAILLE</span>
                <b>14.8 Mo</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">SÉCURITÉ</span>
                <b className="spec-verified">✓ Certifié sécurisé</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section engine-section" id="engine">
      <div className="engine-ambient-glow" />
      <div className="container">
        {/* Section Header */}
        <div className="engine-intro">
          <div className="engine-intro-col-left">
            <div className="kicker kicker-gold">
              <span className="pulse-dot" />
              INFRASTRUCTURE FINANCIÈRE &amp; API
            </div>
            <h2>
              Dinari<br />
              <em>Engine.</em>
            </h2>
            <div className="engine-header-cta">
              <a className="button button-gold-glow" href="/engine">
                Documentation API <ArrowUpRight />
              </a>
              <span className="engine-latency-tag">
                <span className="latency-indicator" /> Latence p99 &lt; 42ms
              </span>
            </div>
          </div>
          <div className="engine-intro-col-right">
            <p className="engine-lead">
              L’orchestration financière programmable pour le commerce algérien.
            </p>
            <p className="engine-description">
              Automatisez la séquestration, la libération sous séquestre et la réconciliation financière sans changer de banque ni d’acquéreur.
            </p>
            
            {/* Architectural Positioning Callout */}
            <div className="engine-positioning-card">
              <div className="positioning-badge-icon">
                <span className="not-symbol">≠</span>
              </div>
              <div className="positioning-copy">
                <b>Couche logicielle d’escrow &amp; réconciliation programmable.</b>
                <p>
                  Connectée directement à vos infrastructures existantes : CIB, Edahabia, banques partenaires et transporteurs.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* High-Tech 3-Tier Architecture Diagram */}
        <div className="architecture">
          {/* Column 1: Clients & Sources */}
          <div className="arch-column clients">
            <div className="arch-column-header">
              <span className="arch-tier-num">01</span>
              <span className="arch-label">SOURCES &amp; APPLICATIONS</span>
            </div>
            <div className="arch-boxes">
              <div className="arch-box">
                <div className="arch-box-icon"><Smartphone /></div>
                <div className="arch-box-text">
                  <b>Dinari Mobile</b>
                  <small>App iOS &amp; Android acheteurs/vendeurs</small>
                </div>
              </div>
              <div className="arch-box">
                <div className="arch-box-icon"><Code2 /></div>
                <div className="arch-box-text">
                  <b>Votre Marketplace</b>
                  <small>API REST &amp; Webhooks marchands</small>
                </div>
              </div>
              <div className="arch-box">
                <div className="arch-box-icon"><Truck /></div>
                <div className="arch-box-text">
                  <b>Réseau Logistique</b>
                  <small>Tracking colis &amp; preuve de remise</small>
                </div>
              </div>
            </div>
            <div className="arch-column-foot">Requêtes signées HTTPS / TLS 1.3</div>
          </div>

          {/* Left Connector (animated pulse toward Engine) */}
          <div className="arch-connector" title="Flux de requêtes">
            <div className="connector-line">
              <span className="connector-particle" />
            </div>
            <div className="connector-badge">
              <ArrowRight />
            </div>
          </div>

          {/* Column 2: Central Engine Matrix (The Heart) */}
          <div className="arch-engine">
            <div className="arch-engine-header">
              <div className="engine-brand-pill">
                <span className="engine-pulse" />
                <span className="gold-label">DINARI ENGINE</span>
                <span className="engine-chip-role">KERNEL D’ORCHESTRATION</span>
              </div>
              <span className="engine-status-pill">
                <span className="engine-status-dot" /> SYSTÈME OPÉRATIONNEL · v1.4
              </span>
            </div>

            {/* 8-Card Micro-Services Grid */}
            <div className="arch-engine-grid">
              {architectureItems.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  className={`arch-card-btn ${activeArch === i ? 'active' : ''}`}
                  onClick={() => setActiveArch(i)}
                >
                  <div className="arch-card-top">
                    <span className="arch-slot-num">0{i + 1}</span>
                    <span className="arch-tag">{item.tag}</span>
                  </div>
                  <div className="arch-card-body">
                    <b className="arch-item-title">{item.title}</b>
                    <ArrowUpRight className="arch-item-arrow" />
                  </div>
                  <div className="arch-card-indicator" />
                </button>
              ))}
            </div>

            {/* Live Interactive Detail Inspector */}
            <div className="arch-detail">
              <div className="arch-detail-header">
                <div className="arch-detail-title-group">
                  <span className="arch-detail-badge">PILIER ACTIF · 0{activeArch + 1}</span>
                  <h4>{architectureItems[activeArch]?.title}</h4>
                </div>
                <div className="arch-detail-code">
                  <code>{architectureItems[activeArch]?.endpoint}</code>
                </div>
              </div>
              <p className="arch-detail-desc">{architectureItems[activeArch]?.desc}</p>
              <div className="arch-detail-foot">
                <span className="arch-status-live">
                  <span className="arch-live-led" /> Traité en temps réel par le Kernel Dinari
                </span>
                <a href="/engine" className="arch-detail-link">
                  Explorer la documentation API <ArrowRight />
                </a>
              </div>
            </div>
          </div>

          {/* Right Connector (animated pulse toward Partners) */}
          <div className="arch-connector" title="Exécution & Règlements">
            <div className="connector-line">
              <span className="connector-particle" />
            </div>
            <div className="connector-badge">
              <ArrowRight />
            </div>
          </div>

          {/* Column 3: Partner Infrastructure & Settlements */}
          <div className="arch-column external">
            <div className="arch-column-header">
              <span className="arch-tier-num">03</span>
              <span className="arch-label">RÉSEAUX &amp; RÈGLEMENTS</span>
            </div>
            <div className="arch-boxes">
              <div className="arch-box">
                <div className="arch-box-icon"><Network /></div>
                <div className="arch-box-text">
                  <b>Réseaux CIB &amp; Edahabia</b>
                  <small>GIE Monétique, SATIM &amp; Acquéreurs</small>
                </div>
              </div>
              <div className="arch-box">
                <div className="arch-box-icon"><Server /></div>
                <div className="arch-box-text">
                  <b>Comptes Séquestres Dédiés</b>
                  <small>Banques partenaires agréées</small>
                </div>
              </div>
              <div className="arch-box">
                <div className="arch-box-icon"><GitBranch /></div>
                <div className="arch-box-text">
                  <b>Compensation &amp; Clôture</b>
                  <small>Virements finaux &amp; audit légal</small>
                </div>
              </div>
            </div>
            <div className="arch-column-foot">Règlements sécurisés &amp; audités</div>
          </div>
        </div>

        {/* Mobile-Only Brief Dinari Engine Section */}
        <div className="engine-mobile-brief">
          <div className="engine-mobile-card">
            <div className="kicker kicker-gold">
              <span className="pulse-dot" /> INFRASTRUCTURE &amp; API B2B
            </div>

            <h2 className="engine-mobile-title">
              Dinari <em>Engine.</em>
            </h2>

            <p className="engine-mobile-lead">
              L’orchestration financière et d’escrow programmable pour les marketplaces et plateformes algériennes.
            </p>

            {/* 4 Key Pillars */}
            <div className="engine-mobile-perks">
              <div className="engine-perk-item">
                <Code2 className="perk-icon" />
                <span>API REST &amp; Webhooks</span>
              </div>
              <div className="engine-perk-item">
                <ShieldCheck className="perk-icon" />
                <span>Séquestre SATIM garanti</span>
              </div>
              <div className="engine-perk-item">
                <Zap className="perk-icon" />
                <span>Latence p99 &lt; 42ms</span>
              </div>
              <div className="engine-perk-item">
                <Terminal className="perk-icon" />
                <span>Sandbox DZD prêt</span>
              </div>
            </div>

            {/* Direct Link Actions to Dinari Engine */}
            <div className="engine-mobile-actions">
              <a className="button button-gold-glow engine-mobile-btn-primary" href="/engine">
                <span>Explorer Dinari Engine</span>
                <ArrowUpRight />
              </a>
              <a className="button button-outline-dark engine-mobile-btn-secondary" href="/engine#sandbox">
                <span>Accéder au Sandbox DZD</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section ecosystem-section" id="ecosystem">
      <div className="eco-ambient-orb orb-left" />
      <div className="eco-ambient-orb orb-right" />
      <div className="container">
        {/* Section Header */}
        <div className="section-head centered light-head eco-head">
          <div className="kicker kicker-gold">
            <span className="pulse-dot" /> DEUX FACES D’UN MÊME ÉCOSYSTÈME
          </div>
          <h2>
            Dinari est l’écosystème.<br />
            <em>Engine en est le moteur API.</em>
          </h2>
          <p className="ecosystem-intro">
            L’application pour vos transactions quotidiennes. L’infrastructure API d’escrow pour vos plateformes.
          </p>
        </div>

        {/* Mobile Segmented Switcher */}
        <div className="eco-mobile-tabs" role="tablist" aria-label="Faces de l’écosystème">
          <button
            type="button"
            role="tab"
            aria-selected={ecoTab === 'consumer'}
            className={`eco-tab-btn ${ecoTab === 'consumer' ? 'active' : ''}`}
            onClick={() => setEcoTab('consumer')}
          >
            <Smartphone className="eco-tab-icon" />
            <span>01 · Dinari App</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={ecoTab === 'engine'}
            className={`eco-tab-btn ${ecoTab === 'engine' ? 'active' : ''}`}
            onClick={() => setEcoTab('engine')}
          >
            <Code2 className="eco-tab-icon" />
            <span>02 · Dinari Engine</span>
          </button>
        </div>

        {/* Mobile Live Sync Banner */}
        <div className="eco-bridge-mobile-sync">
          <span className="sync-pulse-dot" />
          <span>Flux unifié · Orchestré en temps réel sur le même grand livre</span>
        </div>

        {/* Dual Cards + Interactive Synergy Hub */}
        <div className="ecosystem-showcase">
          {/* Card 1: Consumer & Merchant Experience */}
          <div className={`eco-card-v2 consumer-v2 ${ecoTab === 'consumer' ? 'is-active-mobile' : 'is-hidden-mobile'}`}>
            <div className="eco-card-ambient" />
            <div className="eco-card-inner">
              <div className="eco-top-row">
                <div className="eco-pill-badge">
                  <Smartphone className="eco-pill-icon" />
                  <span>01 · INTERFACE MOBILE</span>
                </div>
                <span className="eco-target-tag">GRAND PUBLIC &amp; VENDEURS</span>
              </div>

              <div className="eco-brand-title">
                <h3>Dinari App</h3>
                <span className="eco-brand-subtitle">L’expérience de transaction au quotidien</span>
              </div>

              <p className="eco-desc">
                L’application intuitive qui protège chaque dinar : séquestre automatique et validation à la livraison.
              </p>

              {/* Micro UI Preview Box */}
              <div className="eco-preview-box">
                <div className="eco-preview-header">
                  <span className="eco-preview-title">APPLICATION SÉCURISÉE</span>
                  <span className="eco-preview-status">● ACTIF</span>
                </div>
                <div className="eco-preview-stats">
                  <div className="eco-stat-item">
                    <small>SÉQUESTRE</small>
                    <b>Garanti 100%</b>
                  </div>
                  <div className="eco-stat-item">
                    <small>VALIDATION</small>
                    <b>Code OTP / QR</b>
                  </div>
                  <div className="eco-stat-item">
                    <small>WALLET</small>
                    <b>Recharge instantanée</b>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <ul className="eco-feature-list">
                <li>
                  <div className="eco-check-icon"><CheckCircle2 /></div>
                  <div>
                    <b>Paiement &amp; Vente sous séquestre</b>
                    <span>Fonds protégés jusqu’à la confirmation de réception.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon"><CheckCircle2 /></div>
                  <div>
                    <b>Wallet digital algérien (DZD)</b>
                    <span>Rechargez par CIB, Edahabia ou virement bancaire.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon"><CheckCircle2 /></div>
                  <div>
                    <b>Suivi des commandes en direct</b>
                    <span>Statuts transparents et horodatés pour chaque étape.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon"><CheckCircle2 /></div>
                  <div>
                    <b>Historique &amp; Preuves infalsifiables</b>
                    <span>Reçus officiels et clôture irrévocable de transaction.</span>
                  </div>
                </li>
              </ul>

              <div className="eco-action-row">
                <a className="button eco-btn-consumer" href="#download">
                  Découvrir l’application <ArrowRight />
                </a>
              </div>
            </div>
          </div>

          {/* Central Synergy Bridge */}
          <div className="eco-bridge">
            <div className="eco-bridge-line top-line">
              <span className="bridge-stream stream-down" />
            </div>

            <div className="eco-hub-node">
              <div className="hub-core-ring" />
              <div className="hub-center-symbol">
                <Repeat className="hub-icon" />
              </div>
              <span className="hub-label">FLUX UNIFIÉ</span>
            </div>

            <div className="eco-bridge-info">
              <div className="bridge-tag">
                <Zap className="bridge-tag-icon" />
                <span>ORCHESTRÉ EN TEMPS RÉEL</span>
              </div>
              <small>Même ledger immuable · Données synchronisées</small>
            </div>

            <div className="eco-bridge-line bottom-line">
              <span className="bridge-stream stream-up" />
            </div>
          </div>

          {/* Card 2: Enterprise & API Engine */}
          <div className={`eco-card-v2 engine-v2 ${ecoTab === 'engine' ? 'is-active-mobile' : 'is-hidden-mobile'}`}>
            <div className="eco-card-ambient" />
            <div className="eco-card-inner">
              <div className="eco-top-row">
                <div className="eco-pill-badge gold">
                  <Code2 className="eco-pill-icon" />
                  <span>02 · MOTEUR D’INFRASTRUCTURE</span>
                </div>
                <span className="eco-target-tag gold">ENTREPRISES &amp; PLATEFORMES</span>
              </div>

              <div className="eco-brand-title">
                <h3 className="gold-title">Dinari Engine</h3>
                <span className="eco-brand-subtitle">La couche programmable d’escrow &amp; ledger</span>
              </div>

              <p className="eco-desc">
                L’infrastructure API complète pour automatiser la séquestration et rapprocher les flux dans vos logiciels.
              </p>

              {/* Micro Code Preview Box */}
              <div className="eco-code-box">
                <div className="eco-code-header">
                  <span className="eco-code-dots"><i /><i /><i /></span>
                  <code>POST /v1/escrow/create</code>
                  <span className="eco-code-badge">200 OK</span>
                </div>
                <pre className="eco-code-snippet">
                  <code>{`{\n  "status": "held_in_escrow",\n  "amount": 45000,\n  "currency": "DZD",\n  "settlement": "automatic_on_delivery"\n}`}</code>
                </pre>
              </div>

              {/* Feature Checklist */}
              <ul className="eco-feature-list">
                <li>
                  <div className="eco-check-icon gold"><CheckCircle2 /></div>
                  <div>
                    <b>Smart Escrow &amp; Règles Métier</b>
                    <span>Verrouillez et libérez les fonds selon vos conditions logistiques.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon gold"><CheckCircle2 /></div>
                  <div>
                    <b>Ledger multi-parties immuable</b>
                    <span>Comptabilité en partie double et traçabilité inviolable.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon gold"><CheckCircle2 /></div>
                  <div>
                    <b>Settlement &amp; Rapprochement auto</b>
                    <span>Ventilation des commissions et clôture bancaire SATIM.</span>
                  </div>
                </li>
                <li>
                  <div className="eco-check-icon gold"><CheckCircle2 /></div>
                  <div>
                    <b>Webhooks &amp; Événements signés</b>
                    <span>Notifications push chiffrées HMAC pour tous vos serveurs.</span>
                  </div>
                </li>
              </ul>

              <div className="eco-action-row">
                <a className="button eco-btn-engine" href="/engine">
                  Explorer la documentation API <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section api-section" id="api">
      <div className="api-ambient-glow" />
      <div className="container">
        <div className="api-layout-v2">
          {/* Left Column: Developer Value Prop & Tools */}
          <div className="api-copy-col">
            <div className="kicker kicker-teal">
              <span className="pulse-dot-teal" /> API REST &amp; SDKS DÉVELOPPEUR
            </div>
            
            <h2 className="api-title">
              Construisez au-dessus<br />
              <span className="api-gradient-text">de votre infrastructure.</span>
            </h2>
            
            <p className="api-lead">
              Dinari Engine est conçu comme une couche d’orchestration programmable. Gardez votre banque, vos transporteurs et vos comptes existants : ajoutez un moteur de séquestre, d’automatisation et de réconciliation en quelques lignes de code.
            </p>

            {/* Developer Benefits Grid (4 Key Features) */}
            <div className="api-perks-grid">
              <div className="api-perk-item">
                <div className="api-perk-icon"><ShieldCheck /></div>
                <div>
                  <b>Idempotence native</b>
                  <p>Clés UUID uniques : aucun double débit ni transaction fantôme possible.</p>
                </div>
              </div>
              <div className="api-perk-item">
                <div className="api-perk-icon"><Zap /></div>
                <div>
                  <b>Webhooks signés HMAC</b>
                  <p>Événements push instantanés à chaque mise à jour de statut ou scan colis.</p>
                </div>
              </div>
              <div className="api-perk-item">
                <div className="api-perk-icon"><Terminal /></div>
                <div>
                  <b>Sandbox DZD instantanée</b>
                  <p>Testez vos workflows complets avec des numéros de test sans risque.</p>
                </div>
              </div>
              <div className="api-perk-item">
                <div className="api-perk-icon"><Code2 /></div>
                <div>
                  <b>SDKs &amp; Spécifications OpenAPI</b>
                  <p>Bibliothèques prêtes pour Node.js, Python, PHP/Laravel et Go.</p>
                </div>
              </div>
            </div>

            {/* Install command quick copy pill */}
            <div className="api-install-strip">
              <div className="install-command">
                <span className="cmd-prompt">$</span>
                <code>npm install @dinari/engine-sdk</code>
              </div>
              <button
                type="button"
                className="cmd-copy-btn"
                onClick={() => handleCopy('npm install @dinari/engine-sdk')}
                title="Copier la commande"
              >
                {copiedCode ? <Check className="text-green" /> : <Copy />}
                <span>{copiedCode ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="api-actions">
              <a className="button button-navy-glow" href="/engine">
                Explorer Dinari Engine <ArrowUpRight />
              </a>
              <a className="button button-outline-dark" href="/engine#sandbox">
                Accéder au Sandbox <ArrowRight />
              </a>
            </div>

            {/* Developer Specs / Trust Strip */}
            <div className="api-specs-footer">
              <span>● OpenAPI 3.1</span>
              <span>● Chiffrement AES-256</span>
              <span>● SLA Disponibilité 99.99%</span>
            </div>
          </div>

          {/* Right Column: Interactive API Console */}
          <div className="api-console-col">
            <div className="api-console-window">
              {/* Tab Selector */}
              <div className="console-tabs-bar">
                {apiCodeExamples.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`console-tab-btn ${activeApiTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveApiTab(idx)}
                  >
                    <span>{item.tab}</span>
                  </button>
                ))}
              </div>

              {/* Console Window Header */}
              <div className="console-window-head">
                <div className="console-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="console-endpoint-pill">
                  <span className="method-pill">{apiCodeExamples[activeApiTab].method}</span>
                  <code>{apiCodeExamples[activeApiTab].endpoint}</code>
                </div>
                <button
                  type="button"
                  className="console-copy-btn"
                  onClick={() => handleCopy(apiCodeExamples[activeApiTab].code)}
                  title="Copier le code"
                >
                  {copiedCode ? <Check /> : <Copy />}
                  <small>{copiedCode ? 'Copié' : 'Copier'}</small>
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="console-code-body">
                <pre>
                  <code>{apiCodeExamples[activeApiTab].code}</code>
                </pre>
              </div>

              {/* Response Drawer */}
              <div className="console-response-drawer">
                <div className="response-drawer-header">
                  <div className="response-status">
                    <span className="response-dot" />
                    <b>RÉPONSE JSON DU SERVEUR</b>
                  </div>
                  <span className="response-latency-badge">
                    {apiCodeExamples[activeApiTab].status}
                  </span>
                </div>
                <pre className="response-json">
                  <code>{apiCodeExamples[activeApiTab].response}</code>
                </pre>
              </div>

              {/* Console Footer */}
              <div className="console-window-foot">
                <span className="console-status-live">
                  <span className="console-pulse" /> Sandbox Dinari DZD · Environnement actif
                </span>
                <span className="console-version-tag">Engine v1.4 REST</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section trust-section" id="securite">
      <div className="trust-ambient-orb" />
      <div className="container">
        {/* Section Header */}
        <div className="section-head split trust-head">
          <div>
            <div className="kicker kicker-teal">
              <span className="pulse-dot-teal" /> SÉCURITÉ &amp; TRANSPARENCE RADICALE
            </div>
            <h2>
              La confiance ne doit<br />
              <span className="trust-gradient-text">pas être invisible.</span>
            </h2>
          </div>
          <div className="trust-head-copy">
            <p>
              La confiance ne se décrète pas : elle se prouve avec des états compréhensibles, des contrôles cryptographiques infaillibles et un historique consultable à chaque instant.
            </p>
            <div className="trust-live-pill">
              <span className="live-ping-dot" /> Audit de transaction actif en direct
            </div>
          </div>
        </div>

        {/* 6-Card Modern Fintech Security Grid */}
        <div className="trust-grid-v2">
          {trustFeatures.map((item) => {
            const Icon = item.icon
            return (
              <div className="trust-card-v2" key={item.title}>
                <div className="trust-card-ambient" />
                <div className="trust-card-top">
                  <div className="trust-icon-box">
                    <Icon />
                  </div>
                  <div className="trust-badges">
                    <span className="trust-slot-num">{item.num}</span>
                    <span className="trust-metric-badge">{item.metric}</span>
                  </div>
                </div>

                <div className="trust-card-body">
                  <span className="trust-tag-label">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="trust-card-footer">
                  <div className="trust-meta-code">
                    <span className="trust-meta-led" />
                    <code>{item.meta}</code>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Trust & Assurance Guarantee Strip */}
        <div className="trust-assurance-strip">
          <div className="assurance-item">
            <div className="assurance-icon"><ShieldCheck /></div>
            <div>
              <b>Séquestre Dédié 100%</b>
              <span>Fonds cantonnés hors du bilan opérationnel de l’entreprise</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Lock /></div>
            <div>
              <b>Chiffrement AES-256 &amp; TLS 1.3</b>
              <span>Norme de sécurité bancaire et secrets d’accès tokenisés</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Network /></div>
            <div>
              <b>Interopérabilité SATIM &amp; CIB</b>
              <span>Paiements nationaux conformes aux règles de compensation</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Scale /></div>
            <div>
              <b>Médiation Locale en Algérie</b>
              <span>Support d’arbitrage basé à Alger, disponible 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section cycle-section-v2" id="cycle">
      <div className="cycle-ambient-glow" />
      <div className="container">
        {/* Section Header */}
        <div className="section-head split cycle-head">
          <div>
            <div className="kicker kicker-teal">
              <span className="pulse-dot-teal" /> WORKFLOW &amp; PROTOCOLE DE SÉQUESTRE
            </div>
            <h2>
              Simple à comprendre.<br />
              <span className="cycle-gradient-text">Sérieux à exécuter.</span>
            </h2>
          </div>
          <div className="cycle-head-copy">
            <p>
              Pour l’acheteur comme pour le vendeur, le parcours tient en 4 étapes fluides. En coulisses, Dinari Engine orchestre un automate à états finis strict qui élimine toute asymétrie de confiance.
            </p>
            <div className="cycle-live-pill">
              <span className="live-ping-dot" /> Automate déterministe actif
            </div>
          </div>
        </div>

        {/* Stepper Progress Ribbon */}
        <div className="cycle-stepper-wrap">
          <div className="cycle-stepper-line">
            <div
              className="cycle-stepper-progress"
              style={{ width: `${(activeCycleStep / (cycleSteps.length - 1)) * 100}%` }}
            />
          </div>
          <div className="cycle-stepper-nodes">
            {cycleSteps.map((s, idx) => {
              const isPassed = idx <= activeCycleStep
              const isCurrent = idx === activeCycleStep
              return (
                <button
                  type="button"
                  key={s.num}
                  className={`cycle-stepper-node ${isPassed ? 'passed' : ''} ${isCurrent ? 'current' : ''}`}
                  onClick={() => setActiveCycleStep(idx)}
                >
                  <div className="stepper-circle">
                    {idx < activeCycleStep ? <Check /> : s.num}
                  </div>
                  <span className="stepper-label">{s.stepName}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4 Connected Cards Grid */}
        <div className="cycle-cards-grid">
          {cycleSteps.map((item, idx) => {
            const Icon = item.icon
            const isSelected = activeCycleStep === idx
            return (
              <div
                key={item.num}
                className={`cycle-card-v3 ${isSelected ? 'selected' : ''}`}
                onClick={() => setActiveCycleStep(idx)}
              >
                <div className="cycle-card-top">
                  <div className="cycle-card-phase-badge">
                    <span>{item.phase}</span>
                  </div>
                  <div className="cycle-card-icon-box">
                    <Icon />
                  </div>
                </div>

                <div className="cycle-card-body">
                  <span className="cycle-card-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <div className="cycle-card-specs">
                  {item.specs.map((spec) => (
                    <div className="cycle-spec-row" key={spec.label}>
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-val">{spec.val}</span>
                    </div>
                  ))}
                </div>

                <div className="cycle-card-footer">
                  <div className="cycle-code-chip">
                    <span className="cycle-chip-dot" />
                    <code>{item.codeEvent}</code>
                  </div>
                  <div className="cycle-card-select-hint">
                    {isSelected ? (
                      <span className="hint-active">Actif</span>
                    ) : (
                      <span className="hint-view">Inspecter <ArrowRight /></span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interactive Live Execution Console */}
        <div className="cycle-inspector-console">
          <div className="inspector-console-head">
            <div className="inspector-console-title">
              <span className="console-radar-dot" />
              <b>INSPECTEUR D’AUTOMATE · ÉTAPE {cycleSteps[activeCycleStep].num} / 04</b>
              <span className="inspector-phase-tag">{cycleSteps[activeCycleStep].stepName}</span>
            </div>
            <div className="inspector-controls">
              <button
                type="button"
                className="inspector-nav-btn"
                onClick={() => setActiveCycleStep((prev) => Math.max(0, prev - 1))}
                disabled={activeCycleStep === 0}
                aria-label="Étape précédente"
              >
                <ArrowLeft />
                <span>Précédent</span>
              </button>
              <button
                type="button"
                className="inspector-nav-btn next-btn"
                onClick={() => setActiveCycleStep((prev) => (prev + 1) % cycleSteps.length)}
                aria-label="Étape suivante"
              >
                <span>{activeCycleStep === cycleSteps.length - 1 ? 'Recommencer le cycle' : 'Étape suivante'}</span>
                <ArrowRight />
              </button>
            </div>
          </div>

          <div className="inspector-console-body">
            {/* Left: Narrative & Guarantees */}
            <div className="inspector-narrative">
              <div className="inspector-phase-indicator">
                <span className="phase-pill-big">{cycleSteps[activeCycleStep].phase} · {cycleSteps[activeCycleStep].stepName}</span>
                <span className="phase-status-pill">
                  <span className="status-ping" /> {cycleSteps[activeCycleStep].executionStatus}
                </span>
              </div>

              <h4>{cycleSteps[activeCycleStep].title}</h4>
              <p className="inspector-lead">{cycleSteps[activeCycleStep].desc}</p>

              <div className="inspector-checks">
                <div className="inspector-check-item">
                  <div className="check-icon"><CheckCircle2 /></div>
                  <div>
                    <b>Protocole d’exécution strict</b>
                    <span>{cycleSteps[activeCycleStep].protocol}</span>
                  </div>
                </div>
                <div className="inspector-check-item">
                  <div className="check-icon"><ShieldCheck /></div>
                  <div>
                    <b>Garantie de non-répudiation</b>
                    <span>{cycleSteps[activeCycleStep].guarantee}</span>
                  </div>
                </div>
                <div className="inspector-check-item">
                  <div className="check-icon"><BadgeCheck /></div>
                  <div>
                    <b>Intervenants &amp; Rôles synchronisés</b>
                    <span>{cycleSteps[activeCycleStep].actors}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code / JSON Ledger Event */}
            <div className="inspector-code-pane">
              <div className="code-pane-bar">
                <div className="code-pane-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="code-pane-filename">dinari_state_machine.json</span>
                <button
                  type="button"
                  className="code-pane-copy"
                  onClick={() => handleCopy(cycleSteps[activeCycleStep].jsonPayload)}
                  title="Copier l’état JSON"
                >
                  {copiedCode ? <Check /> : <Copy />}
                  <small>{copiedCode ? 'Copié' : 'Copier'}</small>
                </button>
              </div>
              <pre className="code-pane-content">
                <code>{cycleSteps[activeCycleStep].jsonPayload}</code>
              </pre>
              <div className="code-pane-foot">
                <span className="code-foot-hash">
                  <CheckCircle2 /> Empreinte d’état vérifiée par SHA-256
                </span>
                <span className="code-foot-state">État séquentiel immuable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Pillars Strip */}
        <div className="cycle-guarantee-ribbon">
          <div className="ribbon-card">
            <div className="ribbon-icon"><ShieldCheck /></div>
            <div>
              <b>Automate à états déterministe</b>
              <p>Aucun raccourci possible : un fonds ne peut pas être débloqué sans passage par le séquestre et le scan de réception.</p>
            </div>
          </div>
          <div className="ribbon-card">
            <div className="ribbon-icon"><Lock /></div>
            <div>
              <b>Séquestre neutre garanti</b>
              <p>L’acheteur a l’assurance d’inspecter avant paiement ; le vendeur sait que l’argent est déjà consigné.</p>
            </div>
          </div>
          <div className="ribbon-card">
            <div className="ribbon-icon"><Scale /></div>
            <div>
              <b>Résolution locale sous 24h</b>
              <p>En cas d’anomalie ou de retour colis, l’équipe de médiation Dinari à Alger intervient sur la base du journal d’audit.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section download-section-v2" id="download">
      <div className="container">
        <div className="download-card-v2">
          {/* Ambient orbs & grid lines inside card */}
          <div className="download-ambient-orb orb-teal" />
          <div className="download-ambient-orb orb-gold" />
          <div className="download-grid-pattern" />
          <div className="download-radar-rings" />

          {/* Top Pill / Status Ribbon */}
          <div className="download-top-ribbon">
            <div className="download-badge-official">
              <span className="live-ping-gold" /> DISTRIBUTION MOBILE OFFICIELLE
            </div>
            <div className="download-release-meta">
              <span className="release-status-dot" /> Version 1.0.5 Beta · Signature SHA-256 certifiée
            </div>
          </div>

          {/* Main Card Content: Split Layout */}
          <div className="download-main-grid">
            {/* Left Column: Value Prop, Specs & CTAs */}
            <div className="download-content-col">
              <h2 className="download-title">
                Télécharger<br />
                <em>Dinari Mobile.</em>
              </h2>

              <p className="download-description">
                L’expérience séquestre complète et l’orchestration financière dans votre poche. Suivez vos commandes en direct, validez les remises physiques par OTP secret et protégez chaque transaction.
              </p>

              {/* 4 Technical Specs Chips */}
              <div className="download-specs-grid">
                <div className="spec-card">
                  <span className="spec-head">OS COMPATIBLE</span>
                  <b>Android 8.0+</b>
                  <small>arm64-v8a</small>
                </div>
                <div className="spec-card">
                  <span className="spec-head">TAILLE FICHIER</span>
                  <b>28.4 Mo</b>
                  <small>Optimisé 4G / 5G</small>
                </div>
                <div className="spec-card">
                  <span className="spec-head">INSTALLATION</span>
                  <b>APK Direct</b>
                  <small>Sans Play Store</small>
                </div>
                <div className="spec-card">
                  <span className="spec-head">SÉCURITÉ</span>
                  <b>100% Vérifié</b>
                  <small>Zéro malware</small>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="download-actions-row">
                <a
                  className="button button-gold download-btn-primary"
                  href={APK_DOWNLOAD_URL}
                  download="dinari-v1.0.5.apk"
                >
                  <Download />
                  <div className="download-btn-text">
                    <span>Télécharger l’APK Android</span>
                    <small>Version v1.0.5 · Installation immédiate</small>
                  </div>
                </a>

                <a className="button download-btn-secondary" href="#produit">
                  <Globe />
                  <span>Accéder à la Web App</span>
                </a>
              </div>

              {/* Safety reassurance note */}
              <div className="download-security-pill">
                <ShieldCheck />
                <span>Package officiel certifié Dinari DZ · Mises à jour OTA transparentes</span>
              </div>
            </div>

            {/* Right Column: QR Scanner Station */}
            <div className="download-qr-col">
              <div className="qr-station-box">
                <div className="qr-station-head">
                  <div className="qr-station-title">
                    <Smartphone />
                    <b>SCAN CAMERA</b>
                  </div>
                  <span className="qr-station-badge">Lien Direct APK</span>
                </div>

                <div className="qr-visual-container">
                  <div className="qr-corner-bracket corner-tl" />
                  <div className="qr-corner-bracket corner-tr" />
                  <div className="qr-corner-bracket corner-bl" />
                  <div className="qr-corner-bracket corner-br" />
                  
                  {/* Laser scan beam animation */}
                  <div className="qr-scan-beam" />

                  {/* QR Code with Dinari Center Emblem */}
                  <div className="qr-white-card">
                    <QrCode className="qr-actual-svg" />
                    <div className="qr-center-emblem">
                      <img src="/images/dinari-logo.png" alt="" />
                    </div>
                  </div>
                </div>

                <div className="qr-station-foot">
                  <b>Pointez l’appareil photo de votre smartphone</b>
                  <p>Ou scannez avec Google Lens pour lancer le téléchargement instantané.</p>
                  <div className="qr-devices-tag">
                    Compatible Samsung, Xiaomi, Realme, Oppo, Huawei &amp; Honor
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Perks Row: 3 Mobile Superpower Cards */}
          <div className="download-perks-strip">
            <div className="download-perk-item">
              <div className="perk-icon-box"><Bell /></div>
              <div>
                <b>Notifications push en direct</b>
                <p>Alertes instantanées au cantonnement des fonds, au scan transporteur et à la remise du colis.</p>
              </div>
            </div>

            <div className="download-perk-item">
              <div className="perk-icon-box"><ShieldCheck /></div>
              <div>
                <b>Validation bilatérale OTP &amp; QR</b>
                <p>Le livreur ne peut débloquer les fonds sans votre code secret : l’inspection est garantie.</p>
              </div>
            </div>

            <div className="download-perk-item">
              <div className="perk-icon-box"><Wallet /></div>
              <div>
                <b>Portefeuille DZD &amp; Cartes CIB</b>
                <p>Rechargez votre wallet en dinars via Edahabia ou CIB et retirez vers votre compte bancaire.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section faq-section-v2" id="faq">
      <div className="faq-ambient-glow" />
      <div className="container">
        <div className="faq-layout-v2">
          {/* Left Column: Title & Direct Contact Hub */}
          <div className="faq-left-col">
            <div className="kicker kicker-teal">
              <span className="pulse-dot-teal" /> BASE DE CONNAISSANCES &amp; SUPPORT
            </div>

            <h2 className="faq-title">
              Les réponses<br />
              <span className="faq-gradient-text">essentielles.</span>
            </h2>

            <p className="faq-subtitle">
              Une question ne devrait jamais rester sans réponse précise. Retrouvez ici tous les détails sur notre technologie de séquestre, nos garanties et l’intégration de Dinari Engine.
            </p>

            {/* Direct Assistance Card */}
            <div className="faq-support-card">
              <div className="support-card-head">
                <div className="support-icon-avatar">
                  <Headphones />
                </div>
                <div>
                  <span className="support-badge-status">
                    <span className="support-ping-dot" /> ÉQUIPE ACTIVE À ALGER
                  </span>
                  <b>Besoin d’un échange direct ?</b>
                </div>
              </div>

              <p className="support-card-desc">
                Notre équipe technique et nos spécialistes de l’arbitrage répondent à toutes vos questions sous 2 heures.
              </p>

              <div className="support-card-links">
                <a className="support-email-pill" href="mailto:contact@dinari.com">
                  <Mail />
                  <span>contact@dinari.com</span>
                </a>
                <span className="support-hours-tag">Support 7j/7 · 9h - 19h</span>
              </div>

              <div className="support-card-cta">
                <a className="button button-gold support-action-btn" href="mailto:contact@dinari.com">
                  <span>Contacter l’équipe</span>
                  <ArrowUpRight />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Category Tabs & Accordion Cards */}
          <div className="faq-right-col">
            {/* Category Filter Pills */}
            <div className="faq-filter-bar">
              <button
                type="button"
                className={`faq-filter-btn ${faqCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFaqCategory('all')}
              >
                <span>Toutes les questions</span>
                <small>8</small>
              </button>
              <button
                type="button"
                className={`faq-filter-btn ${faqCategory === 'escrow' ? 'active' : ''}`}
                onClick={() => setFaqCategory('escrow')}
              >
                <span>Séquestre &amp; Particuliers</span>
                <small>4</small>
              </button>
              <button
                type="button"
                className={`faq-filter-btn ${faqCategory === 'engine' ? 'active' : ''}`}
                onClick={() => setFaqCategory('engine')}
              >
                <span>Dinari Engine &amp; API</span>
                <small>4</small>
              </button>
            </div>

            {/* Accordion Cards List */}
            <div className="faq-accordion-list">
              {filteredFaqs.map((item) => {
                const isOpen = openFaq === item.id
                return (
                  <div className={`faq-card-v2 ${isOpen ? 'open' : ''}`} key={item.id}>
                    <button
                      type="button"
                      className="faq-card-trigger"
                      onClick={() => setOpenFaq(isOpen ? null : item.id)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-trigger-left">
                        <span className="faq-item-num">0{item.id}</span>
                        <div className="faq-trigger-text">
                          <span className="faq-tag-pill">{item.tag}</span>
                          <h3>{item.q}</h3>
                        </div>
                      </div>
                      <div className="faq-chevron-box" aria-hidden="true">
                        <ChevronDown />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-card-content">
                        <p>{item.a}</p>
                        <div className="faq-card-badges">
                          {item.badges.map((b) => (
                            <span className="faq-micro-chip" key={b}>
                              <CheckCircle2 />
                              <span>{b}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* =========================================================================
        Final CTA Section - Sovereign Fintech Protocol Closing
        ========================================================================= */}
    <section className="final-cta-v2" id="rejoindre">
      <div className="final-cta-glow-bg" />
      <div className="final-cta-grid-pattern" />

      <div className="container final-cta-container">
        <div className="final-cta-badge">
          <ShieldCheck className="final-cta-badge-icon" />
          <span>LE PROTOCOLE DE SÉQUESTRE NUMÉRIQUE EN ALGÉRIE</span>
        </div>

        <h2 className="final-cta-title">
          Prêt à sécuriser vos transactions <br />
          <em>et éliminer tout risque d’impayé ?</em>
        </h2>

        <p className="final-cta-lead">
          Rejoignez le premier réseau de séquestre décentralisé en Algérie. Que vous vendiez sur les réseaux sociaux, opériez une marketplace ou commandiez en e-commerce 58 wilayas : chaque dinar est protégé sous code OTP jusqu’à validation conforme.
        </p>

        {/* 3 Main Direct Action Pathways */}
        <div className="final-cta-actions">
          <a className="final-btn final-btn-gold" href="#download">
            <div className="final-btn-icon-wrap">
              <Smartphone className="final-btn-icon" />
            </div>
            <div className="final-btn-text">
              <strong>Démarrer sur Android</strong>
              <small>Télécharger l’Application v1.0.5</small>
            </div>
            <ArrowRight className="final-btn-arrow" />
          </a>

          <a className="final-btn final-btn-glass" href="/engine">
            <div className="final-btn-icon-wrap">
              <Code2 className="final-btn-icon" />
            </div>
            <div className="final-btn-text">
              <strong>Intégrer Dinari Engine</strong>
              <small>Documentation API & Sandbox DZD</small>
            </div>
            <ArrowUpRight className="final-btn-arrow" />
          </a>

          <a className="final-btn final-btn-outline" href="mailto:contact@dinari.com">
            <div className="final-btn-icon-wrap">
              <Mail className="final-btn-icon" />
            </div>
            <div className="final-btn-text">
              <strong>Partenariats & B2B</strong>
              <small>contact@dinari.com</small>
            </div>
            <ExternalLink className="final-btn-arrow" />
          </a>
        </div>

        {/* Metric Badges Strip */}
        <div className="final-cta-metrics">
          <div className="final-metric-item">
            <div className="final-metric-value">100%</div>
            <div className="final-metric-label">Fonds Séquestrés & Isolés</div>
          </div>
          <div className="final-metric-divider" />
          <div className="final-metric-item">
            <div className="final-metric-value">0 DZD</div>
            <div className="final-metric-label">Frais Cachés à l’Inscription</div>
          </div>
          <div className="final-metric-divider" />
          <div className="final-metric-item">
            <div className="final-metric-value">58 Wilayas</div>
            <div className="final-metric-label">Couverture Nationale CIB / Edahabia</div>
          </div>
          <div className="final-metric-divider" />
          <div className="final-metric-item">
            <div className="final-metric-value">99.98%</div>
            <div className="final-metric-label">Disponibilité Opérationnelle</div>
          </div>
        </div>
      </div>
    </section>

    {/* =========================================================================
        Institutional Footer - Multi-Column FinTech Structure
        ========================================================================= */}
    <footer className="footer-v2" id="footer">
      <div className="container footer-v2-container">
        {/* Top Status & Fast Contact Bar */}
        <div className="footer-v2-status-bar">
          <div className="footer-quick-email">
            <Mail className="footer-quick-email-icon" />
            <span>Assistance directe :</span>
            <a href="mailto:contact@dinari.com" className="footer-email-link">contact@dinari.com</a>
          </div>
        </div>

        {/* 4 Multi-Column Grid */}
        <div className="footer-v2-grid">
          {/* Column 1: Identity & Algérie HQ */}
          <div className="footer-col footer-col-brand">
            <Brand />
            <p className="footer-brand-mission">
              Le premier protocole de séquestre numérique et de confiance bipartite en Algérie. Protège les acheteurs contre la fraude et garantit aux vendeurs le paiement intégral avant expédition.
            </p>
            <div className="footer-contact-box">
              <div className="footer-contact-row">
                <MapPin className="footer-contact-icon" />
                <span>Alger, Algérie — Déploiement 58 Wilayas</span>
              </div>
              <div className="footer-contact-row">
                <Mail className="footer-contact-icon" />
                <a href="mailto:contact@dinari.com">contact@dinari.com</a>
              </div>
              <div className="footer-contact-row">
                <Activity className="footer-contact-icon" />
                <span>Support & Médiation 7j/7</span>
              </div>
            </div>
          </div>

          {/* Column 2: Écosystème & Produit */}
          <div className="footer-col">
            <h4 className="footer-col-title">Écosystème & Produit</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#download">
                  <span>Application Mobile Android</span>
                  <span className="footer-tag-hot">APK v1.0.5</span>
                </a>
              </li>
              <li>
                <a href="/engine">
                  <span>Dinari Engine (B2B)</span>
                  <ArrowUpRight className="footer-sub-arrow" />
                </a>
              </li>
              <li>
                <a href="#fonctionnement">Démonstration Séquestre</a>
              </li>
              <li>
                <a href="#fonctionnement">Ledger Cryptographique Public</a>
              </li>
              <li>
                <a href="#cycle">Cycle de Vie des Transactions</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Sécurité & Conformité */}
          <div className="footer-col">
            <h4 className="footer-col-title">Sécurité & Conformité</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#securite">
                  <ShieldCheck className="footer-mini-icon" />
                  <span>Protocole Séquestre Bipartite</span>
                </a>
              </li>
              <li>
                <a href="#securite">
                  <BadgeCheck className="footer-mini-icon" />
                  <span>Conformité Loi 18-05 & SATIM</span>
                </a>
              </li>
              <li>
                <a href="#securite">
                  <Lock className="footer-mini-icon" />
                  <span>Coffre-fort Cryptographique OTP</span>
                </a>
              </li>
              <li>
                <a href="#faq">
                  <Scale className="footer-mini-icon" />
                  <span>Procédure de Médiation & Arbitrage</span>
                </a>
              </li>
              <li>
                <a href="#securite">Politique de Sécurité des Données</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Développeurs & Assistance */}
          <div className="footer-col">
            <h4 className="footer-col-title">Développeurs & Support</h4>
            <ul className="footer-link-list">
              <li>
                <a href="/engine#api">
                  <Terminal className="footer-mini-icon" />
                  <span>Documentation API REST</span>
                </a>
              </li>
              <li>
                <a href="/engine#api">
                  <Code2 className="footer-mini-icon" />
                  <span>Sandbox Testnet DZD</span>
                </a>
              </li>
              <li>
                <a href="#faq">Questions Fréquentes (FAQ)</a>
              </li>
              <li>
                <a href="mailto:contact@dinari.com">
                  <Mail className="footer-mini-icon" />
                  <span>Support Développeurs & B2B</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@dinari.com">
                  <span>Partenariats Stratégiques</span>
                  <ExternalLink className="footer-sub-arrow" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="footer-v2-bottom">
          <div className="footer-bottom-copy">
            © 2026 Dinari. Tous droits réservés. Fièrement développé pour propulser l’économie de confiance en Algérie.
          </div>

          <div className="footer-bottom-links">
            <a href="#footer">Conditions Générales (CGU)</a>
            <span className="footer-sep">•</span>
            <a href="#footer">Politique de Confidentialité</a>
            <span className="footer-sep">•</span>
            <a href="#footer">Charte d’Arbitrage</a>
            <span className="footer-sep">•</span>
            <a href="mailto:contact@dinari.com">contact@dinari.com</a>
          </div>

          <a href="#top" className="footer-back-to-top" aria-label="Remonter en haut de la page">
            <span>Haut de page</span>
            <ArrowUp className="footer-top-icon" />
          </a>
        </div>
      </div>
    </footer>
  </main>
}

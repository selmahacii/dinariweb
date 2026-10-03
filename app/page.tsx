'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightLeft,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
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

const problemPointsBuyer = [
  'Et si le colis reçu ne correspond pas à ce qui a été promis ?',
  'Et si le produit arrive endommagé ou défectueux ?',
  'Payer en avance comporte un risque d’abandon ou d’arnaque.',
]

const problemPointsSeller = [
  'Et si j’expédie le colis et que l’acheteur refuse de payer ?',
  'Les retours de livraison coûtent cher et bloquent la marchandise.',
  'Attendre l’argent du transporteur crée de l’incertitude de trésorerie.',
]

const featureItems = [
  {
    icon: ShieldCheck,
    tag: 'Protection Acheteur',
    title: 'Vérification avant déblocage',
    desc: 'L’acheteur valide les conditions et la réception de son produit avant que les fonds ne soient transmis au vendeur.',
    badge: 'Fonds protégés',
    accent: 'teal',
  },
  {
    icon: Lock,
    tag: 'Protection Vendeur',
    title: 'Transaction garantie à l’expédition',
    desc: 'Le vendeur a la confirmation formelle que le montant est réservé avant de confier la marchandise au transporteur.',
    badge: 'Paiement garanti',
    accent: 'gold',
  },
  {
    icon: Wallet,
    tag: 'Gestion DZD',
    title: 'Wallet digital en dinars (DZD)',
    desc: 'Un portefeuille électronique pour recharger son solde, régler ses commandes et recevoir ses règlements en toute clarté.',
    badge: 'Solde DZD immédiat',
    accent: 'teal',
  },
  {
    icon: Activity,
    tag: 'Traçabilité',
    title: 'Suivi transparent des étapes',
    desc: 'Chaque statut est synchronisé en temps réel avec le transporteur, du premier scan jusqu’à la confirmation finale.',
    badge: 'Statuts synchronisés',
    accent: 'teal',
  },
  {
    icon: BadgeCheck,
    tag: 'Transparence',
    title: 'Conditions de règlement définies',
    desc: 'Les modalités de libération et les délais d’inspection sont convenus à l’avance pour éviter tout malentendu.',
    badge: 'Conditions prévisibles',
    accent: 'gold',
  },
  {
    icon: Scale,
    tag: 'Résolution',
    title: 'Gestion des anomalies & litiges',
    desc: 'En cas de non-conformité constatée ou d’anomalie de livraison, notre équipe intervient pour trouver une solution équitable.',
    badge: 'Médiation dédiée',
    accent: 'teal',
  },
]

const flowSteps = [
  {
    num: '01',
    tag: 'Commande',
    title: 'Commande',
    desc: 'L’acheteur sélectionne son produit et initie sa commande avec des conditions claires.',
    badge: 'Accord défini',
    Icon: ShoppingBag,
  },
  {
    num: '02',
    tag: 'Paiement',
    title: 'Paiement',
    desc: 'L’acheteur provisionne la transaction via son wallet Dinari ou sa carte.',
    badge: 'Paiement réservé',
    Icon: CreditCard,
  },
  {
    num: '03',
    tag: 'Séquestre',
    title: 'Séquestre',
    desc: 'Les fonds sont retenus en toute sécurité et ne sont accessibles à personne sans validation.',
    badge: 'Fonds protégés',
    Icon: ShieldCheck,
    highlight: true,
  },
  {
    num: '04',
    tag: 'Expédition',
    title: 'Expédition',
    desc: 'Le vendeur expédie la marchandise avec l’assurance que le paiement est déjà sécurisé.',
    badge: 'Suivi synchronisé',
    Icon: Truck,
  },
  {
    num: '05',
    tag: 'Réception',
    title: 'Réception',
    desc: 'L’acheteur reçoit le colis, vérifie la conformité et valide la commande.',
    badge: 'Validation client',
    Icon: CheckCircle2,
  },
]

const transactionSteps = [
  {
    num: '01',
    title: 'Commande',
    status: 'COMMANDE',
    badge: 'Accord convenu',
    desc: 'L’acheteur et le vendeur conviennent du produit, du montant et des conditions de la transaction. La commande est enregistrée avec des termes transparents.',
    amount: '25 000 DZD',
    escrow: 'En attente de paiement',
    carrier: 'Transporteur · Préparé',
    guarantee: 'Conditions convenues',
    points: [
      'Validation claire du montant et des détails du produit',
      'Conditions de validation et délais d’inspection définis',
      'Notification envoyée en direct aux deux parties',
    ],
  },
  {
    num: '02',
    title: 'Paiement',
    status: 'PAIEMENT',
    badge: 'Provision vérifiée',
    desc: 'L’acheteur effectue le paiement depuis son solde Dinari ou sa carte. Les fonds sont vérifiés avant toute mise en route de la commande.',
    amount: '25 000 DZD',
    escrow: 'Contrôle de provision OK',
    carrier: 'En attente de prise en charge',
    guarantee: 'Transaction protégée',
    points: [
      'Contrôle de disponibilité des fonds',
      'Authentification sécurisée de l’acheteur',
      'Confirmation immédiate de la commande',
    ],
  },
  {
    num: '03',
    title: 'Séquestre',
    status: 'SÉQUESTRÉ',
    badge: 'Fonds protégés',
    desc: 'Le montant est conservé sous séquestre : il n’est débité ni au profit immédiat du vendeur, ni perdu pour l’acheteur. La transaction est sécurisée.',
    amount: '25 000 DZD',
    escrow: 'Fonds conservés sous séquestre',
    carrier: 'Bordereau d’expédition émis',
    guarantee: 'Garantie bilatérale Dinari',
    points: [
      'Montant immobilisé jusqu’à confirmation de livraison',
      'Vendeur notifié que le paiement est garanti',
      'Acheteur garanti que les fonds ne sont pas transmis prématurément',
    ],
  },
  {
    num: '04',
    title: 'Expédition',
    status: 'EXPÉDITION',
    badge: 'Colis en route',
    desc: 'Le vendeur prépare la commande et la confie au service de livraison. L’acheteur et le vendeur suivent ensemble l’acheminement du colis.',
    amount: '25 000 DZD',
    escrow: 'Séquestre actif (en transit)',
    carrier: 'Transporteur · En acheminement',
    guarantee: 'Suivi transparent',
    points: [
      'Prise en charge par le transporteur avec numéro de suivi',
      'Mises à jour d’état consultables par les deux parties',
      'Avis d’arrivée notifié à l’acheteur',
    ],
  },
  {
    num: '05',
    title: 'Réception & Validation',
    status: 'RÉCEPTION',
    badge: 'Inspection effectuée',
    desc: 'L’acheteur réceptionne le colis, vérifie sa conformité par rapport à la commande et confirme la réception pour autoriser le déblocage.',
    amount: '25 000 DZD',
    escrow: 'Validation confirmée',
    carrier: 'Colis remis à destination',
    guarantee: 'Contrôle à la livraison',
    points: [
      'Remise physique du colis à l’acheteur',
      'Vérification de la conformité du produit reçu',
      'Confirmation de validation par l’acheteur',
    ],
  },
  {
    num: '06',
    title: 'Règlement',
    status: 'RÈGLEMENT',
    badge: 'Transaction clôturée',
    desc: 'Une fois la validation effectuée, les fonds sous séquestre sont débloqués et immédiatement crédités sur le solde disponible du vendeur.',
    amount: '25 000 DZD',
    escrow: 'Fonds débloqués & crédités',
    carrier: 'Livraison clôturée',
    guarantee: 'Règlement effectué',
    points: [
      'Crédit immédiat sur le wallet du vendeur',
      'Reçu numérique récapitulatif délivré aux deux parties',
      'Clôture définitive de la transaction',
    ],
  },
]

const architectureItems = [
  {
    title: 'Funding check',
    tag: 'PROVISION',
    desc: 'Vérifie en temps réel que les fonds et plafonds nécessaires à l’opération sont réunis avant tout engagement.',
    endpoint: 'POST /v1/funding/verify',
  },
  {
    title: 'Business rules',
    tag: 'RÈGLES MÉTIER',
    desc: 'Applique vos conditions de validation, commissions de plateforme et politiques de règlement personnalisées.',
    endpoint: 'POST /v1/rules/evaluate',
  },
  {
    title: 'Journal d’opérations',
    tag: 'REGISTRE',
    desc: 'Enregistre de manière transparente chaque étape et mouvement pour un suivi et un audit clairs.',
    endpoint: 'GET /v1/ledger/accounts/{id}',
  },
  {
    title: 'Escrow hold',
    tag: 'SÉQUESTRE',
    desc: 'Retient et protège les montants engagés tant que la livraison n’est pas confirmée.',
    endpoint: 'POST /v1/escrow/hold',
  },
  {
    title: 'Settlement auto',
    tag: 'RÈGLEMENT',
    desc: 'Déclenche la libération et le transfert effectif des fonds vers le vendeur une fois les conditions remplies.',
    endpoint: 'POST /v1/settlement/release',
  },
  {
    title: 'Reconciliation',
    tag: 'RAPPROCHEMENT',
    desc: 'Rapproche les écritures transactionnelles avec les flux de paiement et les statuts des transporteurs.',
    endpoint: 'POST /v1/reconcile/run',
  },
  {
    title: 'Gestion des anomalies',
    tag: 'LITIGES',
    desc: 'Gère les exceptions, retours de colis et suspensions de transaction selon des workflows configurables.',
    endpoint: 'POST /v1/disputes/escalate',
  },
  {
    title: 'Webhooks & Events',
    tag: 'ÉVÉNEMENTS',
    desc: 'Transmet des notifications d’événements en temps réel à vos serveurs à chaque changement d’état.',
    endpoint: 'EVENT transaction.escrow.locked',
  },
]

const faqs = [
  {
    id: 1,
    category: 'escrow',
    tag: 'SÉQUESTRE',
    q: 'Qu’est-ce que Dinari ?',
    a: 'Dinari est une plateforme de confiance et de sécurisation des transactions pour le commerce digital en Algérie. Elle permet aux acheteurs de payer sans risque et aux vendeurs d’expédier avec la certitude que leur transaction est garantie par un mécanisme de séquestre.',
    badges: ['Protection acheteur', 'Protection vendeur', 'Commerce digital'],
  },
  {
    id: 2,
    category: 'escrow',
    tag: 'FONCTIONNEMENT',
    q: 'Comment fonctionne une transaction sous séquestre ?',
    a: 'L’acheteur paie la commande, mais les fonds ne sont pas transmis immédiatement au vendeur : ils sont conservés sous séquestre. Le vendeur prépare et expédie le colis. À la réception, l’acheteur vérifie la marchandise et valide la transaction, ce qui déclenche le déblocage des fonds vers le vendeur.',
    badges: ['Paiement sécurisé', 'Expédition garantie', 'Validation à réception'],
  },
  {
    id: 3,
    category: 'escrow',
    tag: 'PROTECTION',
    q: 'Pourquoi est-ce plus sûr que le paiement à la livraison (COD) ou le paiement direct ?',
    a: 'Le paiement direct expose l’acheteur si le vendeur n’envoie pas le bon produit. Le paiement à la livraison (COD) expose le vendeur aux refus arbitraires et aux coûts de retours non justifiés. Dinari protège les deux côtés : l’argent est réservé d’avance, et débloqué uniquement après vérification.',
    badges: ['Zéro risque de non-paiement', 'Zéro avance à l’aveugle', 'Équilibre des parties'],
  },
  {
    id: 4,
    category: 'escrow',
    tag: 'LITIGES & ANOMALIES',
    q: 'Que se passe-t-il si le produit reçu n’est pas conforme ?',
    a: 'Si le produit reçu est défectueux ou ne correspond pas à la commande, l’acheteur signale une anomalie. Les fonds restent sécurisés sous séquestre et ne sont pas transférés au vendeur tant que le désaccord n’est pas examiné et résolu par notre processus de médiation.',
    badges: ['Fonds protégés', 'Procédure équitable', 'Assistance dédiée'],
  },
  {
    id: 5,
    category: 'engine',
    tag: 'INFRASTRUCTURE B2B',
    q: 'Quelle est la différence entre Dinari App et Dinari Engine ?',
    a: 'Dinari App est l’application mobile grand public et commerçants pour gérer son wallet, régler ses achats et suivre ses commandes. Dinari Engine est l’infrastructure technique (API & Webhooks) permettant aux marketplaces, sites e-commerce et entreprises d’intégrer ce mécanisme de séquestre directement dans leurs propres systèmes.',
    badges: ['App pour utilisateurs', 'Engine pour plateformes', 'Architecture distincte'],
  },
  {
    id: 6,
    category: 'engine',
    tag: 'INTÉGRATION',
    q: 'Dinari Engine remplace-t-il les solutions de paiement existantes ?',
    a: 'Non. Dinari Engine ne remplace pas les moyens de paiement existants : il ajoute une couche de confiance et d’arbitrage conditionnel par-dessus vos flux pour gérer la réservation, la validation et le règlement final.',
    badges: ['Couche complémentaire', 'Logique conditionnelle', 'API programmable'],
  },
  {
    id: 7,
    category: 'escrow',
    tag: 'APPLICATION MOBILE',
    q: 'Comment utiliser l’application Dinari ?',
    a: 'L’application Dinari permet de créer un compte, de gérer son portefeuille en dinars (DZD), d’initier des transactions protégées, de suivre ses colis et de confirmer la réception en quelques clics.',
    badges: ['Application Android', 'Suivi en direct', 'Gestion en dinars'],
  },
  {
    id: 8,
    category: 'engine',
    tag: 'DEVELOPPEURS',
    q: 'Comment une entreprise ou une marketplace peut-elle démarrer avec l’API ?',
    a: 'Les équipes techniques peuvent consulter la documentation de Dinari Engine, explorer les spécifications d’API et tester les flux de séquestre et webhooks dans notre environnement de démonstration avant tout déploiement.',
    badges: ['Documentation complète', 'Environnement test', 'Intégration API'],
  },
]

function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <a href="#top" className={`brand ${dark ? 'brand-dark' : ''}`} aria-label="Dinari, accueil">
      <img src="/images/dinari-logo.png" alt="" className="brand-mark-image" />
      <span>Dinari</span>
    </a>
  )
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
        </div>
      </div>
    </div>
  )
}

const trustFeatures = [
  {
    num: '01',
    icon: Activity,
    tag: 'TRAÇABILITÉ',
    title: 'Traçabilité des opérations',
    desc: 'Chaque étape et changement d’état d’une transaction sont documentés et consultables en direct.',
    meta: 'Historique clair & transparent',
    metric: 'Horodatage complet',
  },
  {
    num: '02',
    icon: ShieldCheck,
    tag: 'SÉCURITÉ',
    title: 'Contrôles d’accès & d’identité',
    desc: 'Des mécanismes d’authentification rigoureux pour garantir que seuls les utilisateurs autorisés valident les opérations.',
    meta: 'Authentification vérifiée',
    metric: 'Accès sécurisés',
  },
  {
    num: '03',
    icon: Lock,
    tag: 'CONFIDENTIALITÉ',
    title: 'Protection des données',
    desc: 'Vos informations personnelles et transactionnelles sont protégées conformément aux bonnes pratiques du secteur.',
    meta: 'Données chiffrées & isolées',
    metric: 'Normes de protection',
  },
  {
    num: '04',
    icon: Repeat,
    tag: 'FIABILITÉ',
    title: 'Idempotence des opérations',
    desc: 'Un ordre de paiement ne peut pas être exécuté deux fois par erreur, même en cas de coupure réseau mobile.',
    meta: 'Clé unique anti-doublon',
    metric: 'Exécution unique',
  },
  {
    num: '05',
    icon: CheckCircle2,
    tag: 'TRANSPARENCE',
    title: 'Journalisation et audit',
    desc: 'Toutes les actions clés génèrent des enregistrements d’audit clairs pour permettre un suivi précis et incontestable.',
    meta: 'Historique d’audit structuré',
    metric: 'Audit continu',
  },
  {
    num: '06',
    icon: Scale,
    tag: 'ÉQUITÉ',
    title: 'Gestion des exceptions',
    desc: 'Des procédures encadrées pour traiter les retards, non-conformités et contestations de manière juste et équilibrée.',
    meta: 'Médiation & résolution équitable',
    metric: 'Support d’arbitrage',
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
    title: 'Initier la commande',
    tag: 'ACCORD COMMERCIAL',
    icon: FileText,
    desc: 'L’acheteur et le vendeur conviennent du produit, du montant et des conditions de livraison. Dinari génère un récapitulatif clair de la commande.',
    protocol: 'Accord bilatéral & modalités fixées',
    actors: 'Acheteur ↔ Vendeur',
    guarantee: 'Conditions claires et prévisibles',
    codeEvent: 'order.created',
    executionStatus: 'Commande enregistrée',
    specs: [
      { label: 'Protocole', val: 'Accord de commande' },
      { label: 'Acteurs', val: 'Acheteur ↔ Vendeur' },
      { label: 'Garantie', val: 'Conditions prévisibles' },
    ],
    jsonPayload: `{
  "event": "order.created",
  "order_id": "ORD-DZ-2026-8891",
  "phase": "01_COMMANDE",
  "parties": {
    "buyer": "usr_dz_9410",
    "seller": "mkt_dz_0028"
  },
  "terms": {
    "amount": 25000,
    "currency": "DZD",
    "inspection_window": "48h après livraison"
  }
}`,
  },
  {
    num: '02',
    phase: 'ÉTAPE 02',
    stepName: 'SÉCURISER',
    title: 'Séquestrer les fonds',
    tag: 'SÉQUESTRE SÉCURISÉ',
    icon: Lock,
    desc: 'Le montant est provisionné et conservé sous séquestre. Le vendeur a la certitude que les fonds sont réservés avant de procéder à l’expédition.',
    protocol: 'Séquestre conditionnel Dinari',
    actors: 'Dinari ↔ Acheteur',
    guarantee: 'Paiement garanti et isolé',
    codeEvent: 'escrow.funds_held',
    executionStatus: 'Fonds protégés sous séquestre',
    specs: [
      { label: 'Protocole', val: 'Séquestre Dinari' },
      { label: 'Acteurs', val: 'Dinari ↔ Acheteur' },
      { label: 'Garantie', val: 'Paiement réservé' },
    ],
    jsonPayload: `{
  "event": "escrow.funds_held",
  "order_id": "ORD-DZ-2026-8891",
  "phase": "02_SEQUESTRE",
  "amount_held": 25000,
  "currency": "DZD",
  "status": "held_in_escrow",
  "buyer_protection": "active"
}`,
  },
  {
    num: '03',
    phase: 'ÉTAPE 03',
    stepName: 'LIVRER',
    title: 'Expédier avec suivi',
    tag: 'ACHEMINEMENT TRANSPARENT',
    icon: Truck,
    desc: 'Le transporteur achemine le colis avec suivi synchronisé. Les deux parties peuvent consulter la progression de la livraison en temps réel.',
    protocol: 'Suivi logistique synchronisé',
    actors: 'Transporteur ↔ Destinataire',
    guarantee: 'Traçabilité de livraison',
    codeEvent: 'shipment.in_transit',
    executionStatus: 'En cours d’acheminement',
    specs: [
      { label: 'Protocole', val: 'Suivi colis' },
      { label: 'Acteurs', val: 'Transporteur ↔ Destinataire' },
      { label: 'Garantie', val: 'Traçabilité temps réel' },
    ],
    jsonPayload: `{
  "event": "shipment.in_transit",
  "order_id": "ORD-DZ-2026-8891",
  "phase": "03_EXPEDITION",
  "carrier": "service_livraison",
  "tracking_code": "DZ-781920-TR",
  "status": "out_for_delivery"
}`,
  },
  {
    num: '04',
    phase: 'ÉTAPE 04',
    stepName: 'VALIDER',
    title: 'Inspecter & confirmer',
    tag: 'RÉCEPTION & CONTRÔLE',
    icon: CheckCircle2,
    desc: 'L’acheteur reçoit le colis, examine la conformité du produit par rapport à la commande et confirme la réception pour autoriser le déblocage.',
    protocol: 'Confirmation de réception acheteur',
    actors: 'Acheteur ↔ Dinari',
    guarantee: 'Droit d’inspection respecté',
    codeEvent: 'order.buyer_confirmed',
    executionStatus: 'Réception validée avec succès',
    specs: [
      { label: 'Protocole', val: 'Validation réception' },
      { label: 'Acteurs', val: 'Acheteur ↔ Dinari' },
      { label: 'Garantie', val: 'Inspection conforme' },
    ],
    jsonPayload: `{
  "event": "order.buyer_confirmed",
  "order_id": "ORD-DZ-2026-8891",
  "phase": "04_VALIDATION",
  "buyer_confirmation": "conforme",
  "release_authorized": true
}`,
  },
  {
    num: '05',
    phase: 'ÉTAPE 05',
    stepName: 'RÉGLER',
    title: 'Débloquer & clôturer',
    tag: 'RÈGLEMENT MARCHAND',
    icon: BadgeCheck,
    desc: 'Dès validation de la réception, le séquestre est levé et les fonds sont immédiatement transférés vers le solde disponible du vendeur.',
    protocol: 'Règlement immédiat & reçu officiel',
    actors: 'Dinari ↔ Vendeur',
    guarantee: 'Règlement irrévocable',
    codeEvent: 'settlement.completed',
    executionStatus: 'Transaction clôturée avec succès',
    specs: [
      { label: 'Protocole', val: 'Règlement' },
      { label: 'Acteurs', val: 'Dinari ↔ Vendeur' },
      { label: 'Garantie', val: 'Paiement débloqué' },
    ],
    jsonPayload: `{
  "event": "settlement.completed",
  "order_id": "ORD-DZ-2026-8891",
  "phase": "05_REGLEMENT",
  "seller_payout": 25000,
  "currency": "DZD",
  "status": "settled",
  "receipt_issued": true
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

  // Mobile-First Progressive Disclosure States
  const [mobileProblemBuyerOpen, setMobileProblemBuyerOpen] = useState(false)
  const [mobileProblemSellerOpen, setMobileProblemSellerOpen] = useState(false)
  const [mobileBuyerAccordion, setMobileBuyerAccordion] = useState<number | null>(null)
  const [mobileSellerAccordion, setMobileSellerAccordion] = useState<number | null>(null)
  const [showDemoTechDetails, setShowDemoTechDetails] = useState(false)
  const [showApkSpecs, setShowApkSpecs] = useState(false)
  const [showEngineArchMobile, setShowEngineArchMobile] = useState(false)
  const [showApiCodeMobile, setShowApiCodeMobile] = useState(false)
  const [showAllSecurityMobile, setShowAllSecurityMobile] = useState(false)
  const [showCycleDataMobile, setShowCycleDataMobile] = useState(false)
  const [footerGroupMobile, setFooterGroupMobile] = useState<string | null>(null)

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
            <span /> WALLET DIGITAL &amp; TRANSACTION PROTECTION
          </div>
          <h1>
            Le commerce en ligne,<br />
            <em>sans le risque de confiance.</em>
          </h1>
          <p className="hero-lead-text">
            Dinari sécurise les transactions entre acheteurs et vendeurs grâce à un mécanisme de séquestre et de validation à la livraison. Achetez avec confiance. Vendez avec la certitude que votre transaction est sécurisée.
          </p>
          <div className="hero-buttons">
            <a className="button button-gold hero-btn-main" href="#fonctionnement">
              <span>Découvrir Dinari</span> <ArrowRight />
            </a>
            <a className="button button-navy hero-btn-sub" href="#download">
              <span>Télécharger l’application</span> <Download />
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-label label-top">
            <div className="visual-label-head">
              <span className="pulse" />
              <span>TRANSACTIONS SÉCURISÉES</span>
            </div>
            <div className="visual-label-body">
              <strong>SÉQUESTRE</strong>
              <small>ACTIF</small>
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
              <small>Sécurisé · Reçu numérique</small>
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
              <span>Transaction sous séquestre</span>
            </div>
          </div>

          <div className="hero-node node-one" />
          <div className="hero-node node-two" />
        </div>
      </div>
    </section>

    {/* Section Problème / Confiance */}
    <section className="section intro" id="produit">
      <div className="container">
        <div className="section-head centered">
          <div className="kicker dark"><span /> LE PROBLÈME DE CONFIANCE</div>
          <h2>Acheter en ligne<br /><span>ne devrait pas être un pari.</span></h2>
          <p>Dans le commerce digital, l’acheteur craint de ne pas recevoir le bon produit, et le vendeur craint de ne pas être payé. Dinari élimine cette incertitude.</p>
        </div>

        {/* 2 Problem Cards + Dinari Trust Solution */}
        <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginBottom: '32px' }}>
          {/* Card Acheteur */}
          <div className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-box">
                <ShoppingBag />
              </div>
              <span className="feature-tag">Côté Acheteur</span>
            </div>
            <div className="feature-card-body">
              <h3 style={{ fontSize: '19px', marginBottom: '12px' }}>« Et si le produit ne correspond pas ? »</h3>
              <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.8 }}>
                <li>Et si le colis reçu ne correspond pas à ce qui a été promis ?</li>
                <li>Et si le produit arrive endommagé ou défectueux ?</li>
                {/* On mobile: 3rd point is disclosed */}
                <li className={`problem-extra-point ${!mobileProblemBuyerOpen ? 'mobile-hidden' : ''}`}>
                  Payer en avance comporte un risque d’abandon ou d’arnaque.
                </li>
              </ul>
              <button
                type="button"
                className="mobile-details-btn mobile-only"
                onClick={() => setMobileProblemBuyerOpen(!mobileProblemBuyerOpen)}
                aria-expanded={mobileProblemBuyerOpen}
              >
                <span>{mobileProblemBuyerOpen ? 'Masquer les détails' : 'Voir les détails'}</span>
                {mobileProblemBuyerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="feature-card-footer">
              <span className="feature-pill">
                <ShieldCheck className="feature-pill-icon" />
                <span>Paiement bloqué jusqu’à validation</span>
              </span>
            </div>
          </div>

          {/* Card Vendeur */}
          <div className="feature-card">
            <div className="feature-card-header">
              <div className="feature-icon-box accent-gold">
                <Truck />
              </div>
              <span className="feature-tag" style={{ color: '#8c6e00', background: 'rgba(252, 203, 26, 0.15)' }}>Côté Vendeur</span>
            </div>
            <div className="feature-card-body">
              <h3 style={{ fontSize: '19px', marginBottom: '12px' }}>« Et si j’expédie sans certitude d’être payé ? »</h3>
              <ul style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', fontSize: '13.5px', lineHeight: 1.8 }}>
                <li>Et si j’expédie le colis et que l’acheteur refuse de payer ?</li>
                <li>Les retours de livraison coûtent cher et bloquent la marchandise.</li>
                {/* On mobile: 3rd point is disclosed */}
                <li className={`problem-extra-point ${!mobileProblemSellerOpen ? 'mobile-hidden' : ''}`}>
                  Attendre l’argent du transporteur crée de l’incertitude de trésorerie.
                </li>
              </ul>
              <button
                type="button"
                className="mobile-details-btn mobile-only"
                onClick={() => setMobileProblemSellerOpen(!mobileProblemSellerOpen)}
                aria-expanded={mobileProblemSellerOpen}
              >
                <span>{mobileProblemSellerOpen ? 'Masquer les détails' : 'Voir les détails'}</span>
                {mobileProblemSellerOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
            <div className="feature-card-footer">
              <span className="feature-pill" style={{ color: '#8c6e00', borderColor: 'rgba(252, 203, 26, 0.3)' }}>
                <CheckCircle2 className="feature-pill-icon" style={{ color: '#b38600' }} />
                <span>Fonds garantis avant envoi</span>
              </span>
            </div>
          </div>
        </div>

        {/* Dinari Trust Banner */}
        <div className="flow-trust-strip" style={{ marginTop: '0', background: 'linear-gradient(135deg, #f0f7f6 0%, #fff 100%)', border: '1px solid rgba(0, 128, 128, 0.2)' }}>
          <div className="flow-trust-item" style={{ gridColumn: '1 / -1' }}>
            <ShieldCheck style={{ width: '28px', height: '28px' }} />
            <div>
              <strong style={{ fontSize: '15px' }}>La couche de confiance Dinari</strong>
              <span style={{ fontSize: '13px', color: 'var(--ink)' }}>
                Dinari ajoute une couche de confiance entre l’acheteur et le vendeur. La transaction suit des conditions définies à l’avance avant que les fonds soient libérés.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Section Protection des deux côtés */}
    <section className="section feature-section" id="avantages">
      <div className="feature-bg-ambient" aria-hidden="true" />
      <div className="container">
        <div className="section-head centered">
          <div className="kicker dark"><span /> ÉQUILIBRE &amp; SÉCURITÉ</div>
          <h2>Une transaction.<br /><span>Deux parties protégées.</span></h2>
          <p>Dinari protège simultanément l’acheteur et le vendeur avec des règles équitables et transparentes.</p>
        </div>

        <div className="feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '26px' }}>
          {/* Card 1: Protection Acheteur */}
          <div className="feature-card" style={{ padding: '34px 30px' }}>
            <div className="feature-card-header">
              <div className="feature-icon-box">
                <ShieldCheck />
              </div>
              <span className="feature-tag">POUR L’ACHETEUR</span>
            </div>
            <div className="feature-card-body">
              <h3 style={{ fontSize: '20px', marginBottom: '14px' }}>Protection acheteur</h3>
              <p style={{ marginBottom: '16px', fontSize: '14px' }}>
                Achetez en ligne sans crainte des mauvaises surprises ou des livraisons non conformes.
              </p>

              {/* Desktop Full List */}
              <ul className="desktop-only" style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', fontSize: '13.5px', lineHeight: 2 }}>
                <li><strong>Vérification des conditions :</strong> prix et termes validés avant tout débit.</li>
                <li><strong>Fonds protégés :</strong> le montant reste sous séquestre jusqu’à la livraison.</li>
                <li><strong>Validation à la réception :</strong> vous confirmez la bonne réception de votre commande.</li>
                <li><strong>Gestion des anomalies :</strong> assistance dédiée en cas de colis endommagé ou non conforme.</li>
              </ul>

              {/* Mobile Accordion Items */}
              <div className="mobile-protected-accordion mobile-only">
                {[
                  { title: 'Vérification des conditions', text: 'Prix et termes validés avant tout débit.' },
                  { title: 'Fonds protégés', text: 'Le montant reste sous séquestre jusqu’à la livraison.' },
                  { title: 'Validation à la réception', text: 'Vous confirmez la bonne réception de votre commande.' },
                  { title: 'Gestion des anomalies', text: 'Assistance dédiée en cas de colis endommagé ou non conforme.' },
                ].map((item, idx) => {
                  const isOpen = mobileBuyerAccordion === idx
                  return (
                    <div key={item.title} className="mobile-accord-row">
                      <button
                        type="button"
                        className="mobile-accord-btn"
                        onClick={() => setMobileBuyerAccordion(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="mobile-accord-title">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal" />
                          <strong>{item.title}</strong>
                        </span>
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      {isOpen && (
                        <p className="mobile-accord-desc">{item.text}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="feature-card-footer" style={{ marginTop: '20px' }}>
              <span className="feature-pill">
                <CheckCircle2 className="feature-pill-icon" />
                <span>Validation nécessaire avant déblocage</span>
              </span>
            </div>
          </div>

          {/* Card 2: Protection Vendeur */}
          <div className="feature-card" style={{ padding: '34px 30px' }}>
            <div className="feature-card-header">
              <div className="feature-icon-box accent-gold">
                <Lock />
              </div>
              <span className="feature-tag" style={{ color: '#8c6e00', background: 'rgba(252, 203, 26, 0.15)' }}>POUR LE VENDEUR</span>
            </div>
            <div className="feature-card-body">
              <h3 style={{ fontSize: '20px', marginBottom: '14px' }}>Protection vendeur</h3>
              <p style={{ marginBottom: '16px', fontSize: '14px' }}>
                Expédiez vos commandes en sachant que le paiement est déjà garanti et réservé.
              </p>

              {/* Desktop Full List */}
              <ul className="desktop-only" style={{ paddingLeft: '18px', margin: 0, color: 'var(--muted)', fontSize: '13.5px', lineHeight: 2 }}>
                <li><strong>Paiement garanti d’avance :</strong> notification de réservation avant l’envoi.</li>
                <li><strong>Conditions prévisibles :</strong> les règles de règlement sont convenues dès le départ.</li>
                <li><strong>Suivi de livraison synchronisé :</strong> preuve d’acheminement partagée en temps réel.</li>
                <li><strong>Règlement rapide :</strong> les fonds sont débloqués immédiatement après validation.</li>
              </ul>

              {/* Mobile Accordion Items */}
              <div className="mobile-protected-accordion mobile-only">
                {[
                  { title: 'Paiement garanti d’avance', text: 'Notification de réservation avant l’envoi.' },
                  { title: 'Conditions prévisibles', text: 'Les règles de règlement sont convenues dès le départ.' },
                  { title: 'Suivi de livraison synchronisé', text: 'Preuve d’acheminement partagée en temps réel.' },
                  { title: 'Règlement rapide', text: 'Les fonds sont débloqués immédiatement après validation.' },
                ].map((item, idx) => {
                  const isOpen = mobileSellerAccordion === idx
                  return (
                    <div key={item.title} className="mobile-accord-row">
                      <button
                        type="button"
                        className="mobile-accord-btn"
                        onClick={() => setMobileSellerAccordion(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="mobile-accord-title">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold" />
                          <strong>{item.title}</strong>
                        </span>
                        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                      {isOpen && (
                        <p className="mobile-accord-desc">{item.text}</p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="feature-card-footer" style={{ marginTop: '20px' }}>
              <span className="feature-pill" style={{ color: '#8c6e00', borderColor: 'rgba(252, 203, 26, 0.3)' }}>
                <CheckCircle2 className="feature-pill-icon" style={{ color: '#b38600' }} />
                <span>Zéro risque d’impayé après livraison</span>
              </span>
            </div>
          </div>
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

                <div className="mobile-only demo-tech-toggle-box">
                  <button
                    type="button"
                    className="mobile-details-btn"
                    onClick={() => setShowDemoTechDetails(!showDemoTechDetails)}
                    aria-expanded={showDemoTechDetails}
                  >
                    <span>{showDemoTechDetails ? 'Masquer les détails techniques' : 'Voir les détails techniques'}</span>
                    {showDemoTechDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className={`display-checkpoints ${!showDemoTechDetails ? 'mobile-hidden' : ''}`}>
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
                <strong>Commande en cours de livraison</strong>
                <small>Validation à la réception</small>
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
                <strong>51 600 DZD (Sécurisé)</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rich Copy, Feature Value Props, Download Box */}
        <div className="app-copy">
          <div className="kicker dark"><span /> APPLICATION DINARI</div>
          <h2>Votre portefeuille.<br /><span>Votre protection.</span></h2>
          <p className="app-lead">
            Dinari réunit un <strong>wallet digital en dinars algériens (DZD)</strong> et un moteur de protection des transactions. Gérez vos fonds, réglez vos achats en ligne et vendez avec l’assurance que chaque dinar engagé est sous contrôle.
          </p>

          {/* Core capabilities */}
          <div className="app-feature-list">
            <div className="app-feature-row">
              <div className="app-feat-icon feat-teal">
                <Wallet />
              </div>
              <div className="app-feat-text">
                <strong>Wallet en dinars (DZD) & Solde en direct</strong>
                <span>Rechargez votre portefeuille, visualisez votre solde en temps réel et gardez une visibilité permanente sur vos avoirs.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-gold">
                <ShieldCheck />
              </div>
              <div className="app-feat-text">
                <strong>Transactions sous séquestre</strong>
                <span>Achetez et vendez l’esprit tranquille : les fonds restent sécurisés jusqu’à la confirmation de livraison et de conformité.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-teal">
                <Repeat />
              </div>
              <div className="app-feat-text">
                <strong>Transferts P2P entre utilisateurs</strong>
                <span>Transférez des fonds en quelques clics entre proches et partenaires, sans complexité et avec historique immédiat.</span>
              </div>
            </div>

            <div className="app-feature-row">
              <div className="app-feat-icon feat-gold">
                <Activity />
              </div>
              <div className="app-feat-text">
                <strong>Suivi des commandes & Historique clair</strong>
                <span>Consultez le statut de chaque commande, l’état de vos séquestres et vos reçus d’opérations horodatés.</span>
              </div>
            </div>
          </div>

          {/* Download Action Box */}
          <div className="app-action-box">
            <div className="app-btn-group">
              <a className="button button-navy app-download-btn" href={APK_DOWNLOAD_URL} download="dinari-v1.0.5.apk">
                <Download className="w-4 h-4" />
                <span className="desktop-only">Télécharger l’application Android</span>
                <span className="mobile-only">Télécharger pour Android</span>
                <ArrowUpRight className="app-btn-arrow desktop-only" />
              </a>
              <a className="app-qr-link desktop-only" href="#download">
                <QrCode className="w-4 h-4" />
                <span>Scanner le QR Code</span>
              </a>
            </div>

            {/* Mobile collapsible specs button */}
            <div className="mobile-only" style={{ marginTop: '12px', textAlign: 'center' }}>
              <button
                type="button"
                className="mobile-details-btn"
                onClick={() => setShowApkSpecs(!showApkSpecs)}
                aria-expanded={showApkSpecs}
                style={{ margin: '0 auto' }}
              >
                <span>{showApkSpecs ? 'Masquer les détails techniques' : 'Détails techniques de l’application'}</span>
                {showApkSpecs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Spec & Security Badges Strip */}
            <div className={`app-specs-strip ${!showApkSpecs ? 'mobile-hidden' : ''}`}>
              <div className="app-spec-item">
                <span className="spec-label">SYSTÈME</span>
                <b>Android 8.0+</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">VERSION</span>
                <b>v1.0.5</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">TYPE</span>
                <b>arm64-v8a (28.4 Mo)</b>
              </div>
              <div className="app-spec-item">
                <span className="spec-label">SÉCURITÉ</span>
                <b className="spec-verified">✓ Vérifié</b>
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
              INFRASTRUCTURE B2B &amp; API
            </div>
            <h2>
              Dinari<br />
              <em>Engine.</em>
            </h2>
            <div className="engine-header-cta">
              <a className="button button-gold-glow" href="/engine">
                Explorer Dinari Engine <ArrowUpRight />
              </a>
              <span className="engine-latency-tag">
                <span className="latency-indicator" /> Infrastructure programmable
              </span>
            </div>
          </div>
          <div className="engine-intro-col-right">
            <p className="engine-lead">
              L’infrastructure de confiance pour les plateformes digitales.
            </p>
            <p className="engine-description">
              Dinari Engine permet aux marketplaces, sites e-commerce et entreprises d’intégrer des workflows de séquestre, de contrôle et de règlement dans leurs propres produits grâce à une API programmable.
            </p>
            
            {/* Architectural Positioning Callout */}
            <div className="engine-positioning-card">
              <div className="positioning-badge-icon">
                <span className="not-symbol">≠</span>
              </div>
              <div className="positioning-copy">
                <b>Une infrastructure d’orchestration de confiance dédiée aux plateformes.</b>
                <p>
                  Intégrez la réservation, le déblocage conditionnel et le suivi d’acheminement directement dans vos systèmes existants.
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
              L’infrastructure de confiance pour les plateformes digitales.
            </p>

            {/* 6 Key Modules Grid (Compact 2 columns) */}
            <div className="engine-mobile-perks">
              <div className="engine-perk-item">
                <ShieldCheck className="perk-icon" />
                <span>Escrow</span>
              </div>
              <div className="engine-perk-item">
                <Scale className="perk-icon" />
                <span>Business Rules</span>
              </div>
              <div className="engine-perk-item">
                <Activity className="perk-icon" />
                <span>Ledger</span>
              </div>
              <div className="engine-perk-item">
                <BadgeCheck className="perk-icon" />
                <span>Settlement</span>
              </div>
              <div className="engine-perk-item">
                <Repeat className="perk-icon" />
                <span>Reconciliation</span>
              </div>
              <div className="engine-perk-item">
                <Zap className="perk-icon" />
                <span>Webhooks</span>
              </div>
            </div>

            {/* Programmable default summary */}
            <div className="engine-mobile-specs-summary">
              <div className="engine-spec-chip">API programmable</div>
              <div className="engine-spec-chip">REST + Webhooks</div>
              <div className="engine-spec-chip">Sandbox DZD</div>
            </div>

            {/* Collapsible Architecture Details */}
            <div className="mobile-arch-toggle-wrap">
              <button
                type="button"
                className="mobile-details-btn"
                onClick={() => setShowEngineArchMobile(!showEngineArchMobile)}
                aria-expanded={showEngineArchMobile}
                style={{ margin: '10px auto' }}
              >
                <span>{showEngineArchMobile ? 'Masquer l’architecture' : 'Voir l’architecture'}</span>
                {showEngineArchMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showEngineArchMobile && (
              <div className="engine-mobile-arch-detail">
                <div className="mobile-arch-item">
                  <strong>01. Votre Application</strong>
                  <p>Consomme l’API Engine via HTTPS / TLS 1.3</p>
                </div>
                <div className="mobile-arch-item">
                  <strong>02. Dinari Engine</strong>
                  <p>Orchestre les états finis, le séquestre et les webhooks HMAC</p>
                </div>
                <div className="mobile-arch-item">
                  <strong>03. Réseaux &amp; Règlements</strong>
                  <p>Comptes séquestres dédiés et canaux de compensation SATIM</p>
                </div>
              </div>
            )}

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

            {/* Mobile Toggle Code Example Button */}
            <div className="mobile-only" style={{ marginTop: '16px', textAlign: 'center' }}>
              <button
                type="button"
                className="mobile-details-btn"
                onClick={() => setShowApiCodeMobile(!showApiCodeMobile)}
                aria-expanded={showApiCodeMobile}
                style={{ margin: '0 auto' }}
              >
                <span>{showApiCodeMobile ? 'Masquer l’exemple API' : 'Voir un exemple API'}</span>
                {showApiCodeMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Right Column: Interactive API Console */}
          <div className={`api-console-col ${!showApiCodeMobile ? 'mobile-hidden' : ''}`}>
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
              <span className="pulse-dot-teal" /> SÉCURITÉ &amp; TRANSPARENCE
            </div>
            <h2>
              La confiance ne doit<br />
              <span className="trust-gradient-text">pas être invisible.</span>
            </h2>
          </div>
          <div className="trust-head-copy">
            <p>
              La confiance ne se décrète pas : elle repose sur des étapes compréhensibles, des contrôles d’accès rigoureux et une traçabilité consultable à chaque instant.
            </p>
            <div className="trust-live-pill">
              <span className="live-ping-dot" /> Traçabilité active des transactions
            </div>
          </div>
        </div>

        {/* 6-Card Modern Fintech Security Grid */}
        <div className="trust-grid-v2">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon
            const isExtraMobile = idx >= 4
            return (
              <div
                className={`trust-card-v2 ${isExtraMobile && !showAllSecurityMobile ? 'mobile-hidden' : ''}`}
                key={item.title}
              >
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

        {/* Mobile Accordion Toggle for Extra Security Items */}
        <div className="mobile-only" style={{ textAlign: 'center', margin: '14px 0 18px' }}>
          <button
            type="button"
            className="mobile-details-btn"
            onClick={() => setShowAllSecurityMobile(!showAllSecurityMobile)}
            aria-expanded={showAllSecurityMobile}
            style={{ margin: '0 auto' }}
          >
            <span>{showAllSecurityMobile ? 'Masquer les mesures complémentaires' : 'Voir toutes les mesures de sécurité'}</span>
            {showAllSecurityMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Bottom Trust & Assurance Guarantee Strip */}
        <div className="trust-assurance-strip">
          <div className="assurance-item">
            <div className="assurance-icon"><ShieldCheck /></div>
            <div>
              <b>Séquestre Transactionnel</b>
              <span>Montants réservés jusqu’à la confirmation de livraison</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Lock /></div>
            <div>
              <b>Chiffrement des Communications</b>
              <span>Échanges sécurisés via des protocoles de chiffrement éprouvés</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Repeat /></div>
            <div>
              <b>Idempotence &amp; Fiabilité</b>
              <span>Protection native contre les doubles débits et répétitions accidentelles</span>
            </div>
          </div>
          <div className="assurance-item">
            <div className="assurance-icon"><Scale /></div>
            <div>
              <b>Processus de Médiation</b>
              <span>Gestion équitable des réclamations en cas de non-conformité</span>
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
              <span className="pulse-dot-teal" /> WORKFLOW DE SÉQUESTRE
            </div>
            <h2>
              Simple à comprendre.<br />
              <span className="cycle-gradient-text">Rigoureux à exécuter.</span>
            </h2>
          </div>
          <div className="cycle-head-copy">
            <p>
              Pour l’acheteur comme pour le vendeur, le parcours suit 5 étapes claires. Chaque étape protège les deux parties et garantit que les conditions sont remplies avant tout déblocage.
            </p>
            <div className="cycle-live-pill">
              <span className="live-ping-dot" /> Workflow actif
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

        {/* 5 Connected Cards Grid */}
        <div className="cycle-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
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
              <b>INSPECTEUR DE TRANSACTION · ÉTAPE {cycleSteps[activeCycleStep].num} / 05</b>
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
                    <b>Protocole clair</b>
                    <span>{cycleSteps[activeCycleStep].protocol}</span>
                  </div>
                </div>
                <div className="inspector-check-item">
                  <div className="check-icon"><ShieldCheck /></div>
                  <div>
                    <b>Garantie de transaction</b>
                    <span>{cycleSteps[activeCycleStep].guarantee}</span>
                  </div>
                </div>
                <div className="inspector-check-item">
                  <div className="check-icon"><BadgeCheck /></div>
                  <div>
                    <b>Acteurs concernés</b>
                    <span>{cycleSteps[activeCycleStep].actors}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Toggle for JSON Data */}
            <div className="mobile-only" style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '10px' }}>
              <button
                type="button"
                className="mobile-details-btn"
                onClick={() => setShowCycleDataMobile(!showCycleDataMobile)}
                aria-expanded={showCycleDataMobile}
                style={{ margin: '0 auto' }}
              >
                <span>{showCycleDataMobile ? 'Masquer les données techniques' : 'Voir les données techniques'}</span>
                {showCycleDataMobile ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Right: Code / JSON Ledger Event */}
            <div className={`inspector-code-pane ${!showCycleDataMobile ? 'mobile-hidden' : ''}`}>
              <div className="code-pane-bar">
                <div className="code-pane-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <span className="code-pane-filename">dinari_transaction.json</span>
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
                  <CheckCircle2 /> Événement transactionnel horodaté
                </span>
                <span className="code-foot-state">Statut vérifié</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Pillars Strip */}
        <div className="cycle-guarantee-ribbon">
          <div className="ribbon-card">
            <div className="ribbon-icon"><ShieldCheck /></div>
            <div>
              <b>Séquence d’étapes obligatoire</b>
              <p>Aucun raccourci possible : les fonds ne peuvent pas être débloqués sans confirmation de la livraison.</p>
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
              <b>Résolution équitable</b>
              <p>En cas d’anomalie ou de retour colis, le processus de médiation Dinari intervient sur la base des preuves d’expédition.</p>
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

            {/* Right Column: QR Scanner Station (Desktop Only) */}
            <div className="download-qr-col desktop-only">
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
        Final CTA Section - 2 Clear Pathways (App vs Engine)
        ========================================================================= */}
    <section className="final-cta-v2" id="rejoindre">
      <div className="final-cta-glow-bg" />
      <div className="final-cta-grid-pattern" />

      <div className="container final-cta-container">
        <div className="final-cta-badge">
          <ShieldCheck className="final-cta-badge-icon" />
          <span>SÉCURISATION DES TRANSACTIONS EN ALGÉRIE</span>
        </div>

        <h2 className="final-cta-title">
          Une nouvelle façon de sécuriser <br />
          <em>les transactions digitales.</em>
        </h2>

        <p className="final-cta-lead">
          Que vous soyez un acheteur souhaitant commander en toute sérénité, un commerçant voulant garantir ses ventes, ou une marketplace intégrant notre infrastructure : Dinari sécurise vos opérations.
        </p>

        {/* 2 Main Pathways: App vs Engine */}
        <div className="final-cta-actions" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', maxWidth: '780px', margin: '0 auto 40px' }}>
          <a className="final-btn final-btn-gold" href="#download">
            <div className="final-btn-icon-wrap">
              <Smartphone className="final-btn-icon" />
            </div>
            <div className="final-btn-text">
              <strong>Découvrir l’application</strong>
              <small>Pour acheteurs et vendeurs</small>
            </div>
            <ArrowRight className="final-btn-arrow" />
          </a>

          <a className="final-btn final-btn-glass" href="/engine">
            <div className="final-btn-icon-wrap">
              <Code2 className="final-btn-icon" />
            </div>
            <div className="final-btn-text">
              <strong>Explorer Dinari Engine</strong>
              <small>Pour entreprises et marketplaces</small>
            </div>
            <ArrowUpRight className="final-btn-arrow" />
          </a>
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
              La plateforme de confiance et de sécurisation des transactions pour le commerce digital en Algérie. Protège les acheteurs et garantit aux vendeurs le règlement de leurs commandes.
            </p>
            <div className="footer-contact-box">
              <div className="footer-contact-row">
                <MapPin className="footer-contact-icon" />
                <span>Alger, Algérie</span>
              </div>
              <div className="footer-contact-row">
                <Mail className="footer-contact-icon" />
                <a href="mailto:contact@dinari.com">contact@dinari.com</a>
              </div>
              <div className="footer-contact-row">
                <Activity className="footer-contact-icon" />
                <span>Support & Médiation client</span>
              </div>
            </div>
          </div>

          {/* Column 2: Écosystème & Produit */}
          <div className={`footer-col ${footerGroupMobile === 'eco' ? 'is-open' : ''}`}>
            <h4 
              className="footer-col-title footer-mobile-toggle" 
              onClick={() => setFooterGroupMobile(footerGroupMobile === 'eco' ? null : 'eco')}
            >
              <span>Écosystème &amp; Produit</span>
              <ChevronDown className="footer-toggle-chevron mobile-only" />
            </h4>
            <ul className={`footer-link-list ${footerGroupMobile === 'eco' ? 'is-expanded' : ''}`}>
              <li>
                <a href="#download">
                  <span>Application Mobile Dinari</span>
                  <span className="footer-tag-hot">v1.0.5</span>
                </a>
              </li>
              <li>
                <a href="/engine">
                  <span>Dinari Engine (B2B)</span>
                  <ArrowUpRight className="footer-sub-arrow" />
                </a>
              </li>
              <li>
                <a href="#fonctionnement">Comment ça marche</a>
              </li>
              <li>
                <a href="#avantages">Protection Acheteur &amp; Vendeur</a>
              </li>
              <li>
                <a href="#cycle">Cycle de la transaction</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Sécurité & Confiance */}
          <div className={`footer-col ${footerGroupMobile === 'sec' ? 'is-open' : ''}`}>
            <h4 
              className="footer-col-title footer-mobile-toggle" 
              onClick={() => setFooterGroupMobile(footerGroupMobile === 'sec' ? null : 'sec')}
            >
              <span>Sécurité &amp; Confiance</span>
              <ChevronDown className="footer-toggle-chevron mobile-only" />
            </h4>
            <ul className={`footer-link-list ${footerGroupMobile === 'sec' ? 'is-expanded' : ''}`}>
              <li>
                <a href="#securite">
                  <ShieldCheck className="footer-mini-icon" />
                  <span>Mécanisme de Séquestre</span>
                </a>
              </li>
              <li>
                <a href="#securite">
                  <Lock className="footer-mini-icon" />
                  <span>Protection des Opérations</span>
                </a>
              </li>
              <li>
                <a href="#securite">
                  <BadgeCheck className="footer-mini-icon" />
                  <span>Traçabilité des Livraisons</span>
                </a>
              </li>
              <li>
                <a href="#faq">
                  <Scale className="footer-mini-icon" />
                  <span>Procédure de Résolution</span>
                </a>
              </li>
              <li>
                <a href="#securite">Confidentialité des Données</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Développeurs & Assistance */}
          <div className={`footer-col ${footerGroupMobile === 'dev' ? 'is-open' : ''}`}>
            <h4 
              className="footer-col-title footer-mobile-toggle" 
              onClick={() => setFooterGroupMobile(footerGroupMobile === 'dev' ? null : 'dev')}
            >
              <span>Développeurs &amp; Support</span>
              <ChevronDown className="footer-toggle-chevron mobile-only" />
            </h4>
            <ul className={`footer-link-list ${footerGroupMobile === 'dev' ? 'is-expanded' : ''}`}>
              <li>
                <a href="/engine#api">
                  <Terminal className="footer-mini-icon" />
                  <span>Documentation API</span>
                </a>
              </li>
              <li>
                <a href="/engine#sandbox">
                  <Code2 className="footer-mini-icon" />
                  <span>Environnement Test</span>
                </a>
              </li>
              <li>
                <a href="#faq">Foire Aux Questions (FAQ)</a>
              </li>
              <li>
                <a href="mailto:contact@dinari.com">
                  <Mail className="footer-mini-icon" />
                  <span>Support Technique &amp; B2B</span>
                </a>
              </li>
              <li>
                <a href="mailto:contact@dinari.com">
                  <span>Échanger avec l’équipe</span>
                  <ExternalLink className="footer-sub-arrow" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Legal & Back to Top */}
        <div className="footer-v2-bottom">
          <div className="footer-bottom-copy">
            © 2026 Dinari. Tous droits réservés. Plateforme de confiance et sécurisation des transactions en Algérie.
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

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
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Cpu,
  ExternalLink,
  GitBranch,
  Layers,
  Lock,
  Mail,
  MapPin,
  Repeat,
  RotateCcw,
  Scale,
  Server,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  Truck,
  Users,
  Zap,
} from 'lucide-react'

// 05 — API Endpoints (Realistically structured REST primitives)
const apiEndpoints = [
  {
    method: 'POST',
    path: '/v1/transactions',
    tag: 'SÉQUESTRE',
    desc: 'Créer et provisionner une transaction sous séquestre conditionnel',
    snippets: {
      ts: `const transaction = await dinari.transactions.create({
  amount: 25000, // DZD
  currency: 'DZD',
  reference: 'ORD-10482',
  parties: {
    buyer: 'usr_buyer_82',
    seller: 'usr_merchant_14'
  },
  escrow: {
    mode: 'bipartite',
    releaseTrigger: 'buyer_confirmation',
    timeoutHours: 72
  }
})`,
      curl: `curl -X POST https://api.dinari.com/v1/transactions \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 25000,
    "currency": "DZD",
    "reference": "ORD-10482",
    "parties": { "buyer": "usr_buyer_82", "seller": "usr_merchant_14" },
    "escrow": { "mode": "bipartite", "release_trigger": "buyer_confirmation" }
  }'`,
      py: `transaction = dinari.transactions.create(
    amount=25000,
    currency="DZD",
    reference="ORD-10482",
    parties={"buyer": "usr_buyer_82", "seller": "usr_merchant_14"},
    escrow={"mode": "bipartite", "release_trigger": "buyer_confirmation"}
)`,
      response: `{
  "id": "tx_01H982A7K",
  "object": "transaction",
  "status": "held",
  "amount": 25000,
  "currency": "DZD",
  "reference": "ORD-10482",
  "escrow": {
    "state": "locked",
    "release_trigger": "buyer_confirmation",
    "dispute_allowed": true
  },
  "created_at": "2026-10-02T23:55:00Z"
}`
    }
  },
  {
    method: 'GET',
    path: '/v1/transactions/:id',
    tag: 'AUDIT',
    desc: 'Consulter l’état en temps réel et l’historique des transitions',
    snippets: {
      ts: `const transaction = await dinari.transactions.retrieve('tx_01H982A7K', {
  includeEvents: true
})`,
      curl: `curl -X GET https://api.dinari.com/v1/transactions/tx_01H982A7K \\
  -H "Authorization: Bearer sec_live_dzd_..."`,
      py: `transaction = dinari.transactions.retrieve(
    "tx_01H982A7K",
    include_events=True
)`,
      response: `{
  "id": "tx_01H982A7K",
  "status": "shipped",
  "amount": 25000,
  "currency": "DZD",
  "timeline": [
    { "step": "initiated", "timestamp": "2026-10-02T21:10:00Z" },
    { "step": "funded", "timestamp": "2026-10-02T21:12:00Z" },
    { "step": "held", "timestamp": "2026-10-02T21:12:30Z" },
    { "step": "shipped", "timestamp": "2026-10-02T22:30:00Z" }
  ],
  "inspection_window_hours": 48
}`
    }
  },
  {
    method: 'POST',
    path: '/v1/transactions/:id/confirm',
    tag: 'DÉBLOCAGE',
    desc: 'Valider la réception conforme et autoriser la libération des fonds',
    snippets: {
      ts: `const confirmation = await dinari.transactions.confirm('tx_01H982A7K', {
  confirmedBy: 'buyer',
  deliveryCondition: 'conforme',
  metadata: { tracking_code: 'YAL-781920-DZ' }
})`,
      curl: `curl -X POST https://api.dinari.com/v1/transactions/tx_01H982A7K/confirm \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "confirmed_by": "buyer",
    "delivery_condition": "conforme"
  }'`,
      py: `confirmation = dinari.transactions.confirm(
    "tx_01H982A7K",
    confirmed_by="buyer",
    delivery_condition="conforme"
)`,
      response: `{
  "id": "tx_01H982A7K",
  "status": "released",
  "settlement": {
    "merchant_payout_amount": 25000,
    "currency": "DZD",
    "state": "completed",
    "settled_at": "2026-10-02T23:56:00Z"
  }
}`
    }
  },
  {
    method: 'POST',
    path: '/v1/reconciliation',
    tag: 'RAPPROCHEMENT',
    desc: 'Générer un état de rapprochement périodique pour la comptabilité',
    snippets: {
      ts: `const report = await dinari.reconciliation.create({
  periodStart: '2026-10-01T00:00:00Z',
  periodEnd: '2026-10-02T23:59:59Z',
  format: 'json'
})`,
      curl: `curl -X POST https://api.dinari.com/v1/reconciliation \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "period_start": "2026-10-01T00:00:00Z",
    "period_end": "2026-10-02T23:59:59Z",
    "format": "json"
  }'`,
      py: `report = dinari.reconciliation.create(
    period_start="2026-10-01T00:00:00Z",
    period_end="2026-10-02T23:59:59Z",
    format="json"
)`,
      response: `{
  "reconciliation_id": "rec_01H984L",
  "status": "completed",
  "total_volume_dzd": 18450000,
  "transactions_count": 738,
  "discrepancies_count": 0,
  "generated_at": "2026-10-02T23:56:30Z"
}`
    }
  }
]

const snippetCode = {
  cli: `dinari transactions create \\
  --amount 45000 \\
  --currency DZD \\
  --buyer "usr_cib_82" \\
  --seller "usr_oran_14" \\
  --escrow bipartite`,
  ts: `import { Dinari } from '@dinari/engine-sdk'

const dinari = new Dinari({ apiKey: process.env.DINARI_SECRET })

const escrow = await dinari.transactions.create({
  amount: 45000,
  currency: "DZD",
  parties: { buyer: "usr_buyer_82", seller: "usr_merchant_14" },
  escrow: { releaseTrigger: "delivery_confirmed", timeoutHours: 72 }
})`,
  curl: `curl -X POST https://api.dinari.com/v1/transactions \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 45000,
    "currency": "DZD",
    "parties": { "buyer": "usr_buyer_82", "seller": "usr_merchant_14" },
    "escrow": { "mode": "bipartite", "release_trigger": "delivery_confirmed" }
  }'`
}

// 06 — State Machine Transitions
const stateMachineSteps = [
  { state: 'INITIATED', label: 'Initié', desc: 'Commande créée et conditions définies' },
  { state: 'FUNDED', label: 'Provisionné', desc: 'Paiement effectué par l’acheteur' },
  { state: 'HELD', label: 'Séquestré', desc: 'Montant immobilisé sous contrôle Dinari' },
  { state: 'SHIPPED', label: 'Expédié', desc: 'Colis confié au transporteur' },
  { state: 'DELIVERED', label: 'Livré', desc: 'Réception physique par l’acheteur' },
  { state: 'CONFIRMED', label: 'Validé', desc: 'Conformité acceptée par l’acheteur' },
  { state: 'RELEASED', label: 'Réglé', desc: 'Fonds débloqués vers le vendeur' },
]

// 07 — Security & Engineering Controls
const securityControls = [
  {
    title: 'Idempotence native',
    tag: 'FIABILITÉ',
    desc: 'Empêche le double traitement d’une même opération en cas de retry ou d’incident réseau via une clé unique (UUID).',
  },
  {
    title: 'Webhooks signés HMAC',
    tag: 'AUTHENTICITÉ',
    desc: 'Permet à vos serveurs de vérifier l’authenticité et l’intégrité stricte des notifications d’événements reçues.',
  },
  {
    title: 'Piste d’audit structurée',
    tag: 'TRAÇABILITÉ',
    desc: 'Conserve un historique exhaustif et horodaté de chaque changement d’état, décision et intervention.',
  },
  {
    title: 'Isolation & Contrôles d’accès',
    tag: 'GOUVERNANCE',
    desc: 'Cloisonnement strict des environnements, gestion fine des clés API par portée et isolation multi-locataires.',
  },
  {
    title: 'Chiffrement de bout en bout',
    tag: 'CONFIDENTIALITÉ',
    desc: 'Toutes les communications API sont protégées en TLS 1.3 avec chiffrement des données sensibles au repos.',
  },
  {
    title: 'Gestion des exceptions',
    tag: 'RÉSOLUTION',
    desc: 'Suspension automatique des délais, gestion des blocages et workflows d’arbitrage configurables en cas de litige.',
  },
]

// 08 — Use Cases
const useCases = [
  {
    title: 'Marketplaces C2C & B2C',
    tag: 'PLACES DE MARCHÉ',
    icon: ShoppingBag,
    desc: 'Règlement conditionnel entre acheteurs et vendeurs tiers : les fonds sont sécurisés jusqu’à confirmation de la livraison.',
  },
  {
    title: 'E-commerce & DNVB',
    tag: 'COMMERCE EN LIGNE',
    icon: Truck,
    desc: 'Workflows transactionnels liés aux expéditions pour éliminer les refus de paiement et les retours injustifiés.',
  },
  {
    title: 'Plateformes B2B & Prestations',
    tag: 'SERVICES & FACTURATION',
    icon: Layers,
    desc: 'Déblocage progressif par jalons (milestones) selon la validation des livrables et des accords contractuels.',
  },
  {
    title: 'Opérateurs Logistiques',
    tag: 'LIVRAISON & FULFILLMENT',
    icon: GitBranch,
    desc: 'Transitions d’état déclenchées directement par les scans d’acheminement et preuves physiques de remise.',
  },
]

export default function EnginePage() {
  const [activeTab, setActiveTab] = useState<'cli' | 'ts' | 'curl'>('cli')
  const [copiedInstall, setCopiedInstall] = useState(false)
  const [copiedSnippet, setCopiedSnippet] = useState(false)
  const [isReplaying, setIsReplaying] = useState(false)

  // API Playground State
  const [selectedEndpoint, setSelectedEndpoint] = useState(0)
  const [apiLang, setApiLang] = useState<'ts' | 'curl' | 'py' | 'response'>('ts')
  const [copiedApiCode, setCopiedApiCode] = useState(false)

  const handleCopyApiCode = () => {
    const code = apiEndpoints[selectedEndpoint].snippets[apiLang]
    navigator.clipboard.writeText(code)
    setCopiedApiCode(true)
    setTimeout(() => setCopiedApiCode(false), 2000)
  }

  const handleCopyInstall = () => {
    navigator.clipboard.writeText('npm install @dinari/engine-sdk')
    setCopiedInstall(true)
    setTimeout(() => setCopiedInstall(false), 2000)
  }

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(snippetCode[activeTab])
    setCopiedSnippet(true)
    setTimeout(() => setCopiedSnippet(false), 2000)
  }

  const handleReplay = () => {
    setIsReplaying(true)
    setTimeout(() => setIsReplaying(false), 600)
  }

  return (
    <main className="engine-page">
      {/* 18 — Navigation: Ecosystem relationship */}
      <header className="engine-nav-v2">
        <div className="engine-nav-inner">
          <a className="engine-nav-brand" href="/">
            <img src="/images/dinari-logo.png" alt="Dinari" className="brand-mark-image" />
            <span className="brand-title">Dinari</span>
            <span className="engine-nav-tag">Engine</span>
          </a>

          <nav className="engine-nav-links-v2" aria-label="Navigation Dinari Engine">
            <a href="#why-engine" className="engine-nav-link">Pourquoi Engine</a>
            <a href="#capabilities" className="engine-nav-link">Fonctionnalités</a>
            <a href="#architecture" className="engine-nav-link">Architecture</a>
            <a href="#api" className="engine-nav-link">API &amp; SDK</a>
            <a href="#workflows" className="engine-nav-link">Workflows</a>
            <a href="#security" className="engine-nav-link">Sécurité</a>
            <a href="#use-cases" className="engine-nav-link">Cas d’usage</a>
          </nav>

          <div className="engine-nav-actions-v2">
            <a className="engine-nav-back-link" href="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à Dinari</span>
            </a>
            <a className="engine-nav-cta-minimal" href="#api">
              <span>Explorer l’API</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          01 & 02 — Engine Hero Section: Clear Product Definition & Illustrative Demo
          ===================================================================== */}
      <section className="engine-hero-v2" id="hero">
        <div className="engine-hero-mesh-bg" />
        <div className="engine-hero-grid-pattern" />

        <div className="container engine-hero-grid-v2">
          {/* Left Column: Product Positioning */}
          <div className="engine-hero-content">
            <div className="engine-hero-kicker">
              <div className="engine-kicker-badge">
                <Terminal className="kicker-icon" />
                <span>DINARI ENGINE · B2B TRANSACTION INFRASTRUCTURE</span>
              </div>
              <span className="engine-kicker-dot" />
              <div className="engine-version-pill">
                <span className="pill-dot" />
                <span>SDK v1.2 • Environnement Sandbox DZD</span>
              </div>
            </div>

            <h1 className="engine-hero-h1">
              Orchestrez vos<br />
              <em>transactions sous séquestre.</em>
            </h1>

            <p className="engine-hero-lead">
              La couche d’orchestration programmable de Dinari pour les marketplaces, plateformes SaaS et applications e-commerce.
            </p>

            <p className="engine-hero-description">
              Dinari Engine coordonne les workflows transactionnels conditionnels, l’application de vos règles métier, la gestion du séquestre, les événements en temps réel et le rapprochement directement dans votre propre infrastructure logicielle.
            </p>

            {/* Quick-Start Install Command */}
            <div className="engine-install-bar">
              <div className="engine-install-content">
                <span className="install-prompt">$</span>
                <code className="install-command">npm install @dinari/engine-sdk</code>
              </div>
              <button
                className="install-copy-btn"
                onClick={handleCopyInstall}
                aria-label="Copier la commande d'installation"
                title="Copier la commande"
              >
                {copiedInstall ? <Check className="btn-icon-green" /> : <Copy />}
                <span>{copiedInstall ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>

            {/* Call to actions */}
            <div className="engine-hero-actions">
              <a className="button button-gold engine-btn-primary" href="#api">
                <span>Explorer l’API REST</span>
                <ArrowRight />
              </a>
              <a className="button button-navy engine-btn-secondary" href="#architecture">
                <span>Comprendre l’architecture</span>
                <ArrowDown />
              </a>
            </div>

            {/* Tech Spec Indicators */}
            <div className="engine-specs-strip">
              <div className="spec-item">
                <Zap className="spec-icon" />
                <span>Exécution Sandbox réactive</span>
              </div>
              <div className="spec-dot">•</div>
              <div className="spec-item">
                <ShieldCheck className="spec-icon" />
                <span>Séquestre conditionnel</span>
              </div>
              <div className="spec-dot">•</div>
              <div className="spec-item">
                <Code2 className="spec-icon" />
                <span>Sandbox DZD prêt à l’emploi</span>
              </div>
            </div>
          </div>

          {/* Right Column: Illustrative Sandbox Execution Console */}
          <div className="engine-hero-visual">
            <div className="engine-console-glow" />

            <div className="engine-terminal-v2">
              <div className="terminal-v2-head">
                <div className="terminal-window-controls">
                  <span className="win-dot dot-red" />
                  <span className="win-dot dot-yellow" />
                  <span className="win-dot dot-green" />
                </div>

                <div className="terminal-tabs">
                  <button
                    className={`terminal-tab ${activeTab === 'cli' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cli')}
                  >
                    <Terminal className="tab-icon" />
                    <span>CLI Exemple</span>
                  </button>
                  <button
                    className={`terminal-tab ${activeTab === 'ts' ? 'active' : ''}`}
                    onClick={() => setActiveTab('ts')}
                  >
                    <Code2 className="tab-icon" />
                    <span>TypeScript SDK</span>
                  </button>
                  <button
                    className={`terminal-tab ${activeTab === 'curl' ? 'active' : ''}`}
                    onClick={() => setActiveTab('curl')}
                  >
                    <Zap className="tab-icon" />
                    <span>cURL / REST</span>
                  </button>
                </div>

                <div className="terminal-head-actions">
                  {activeTab === 'cli' && (
                    <button
                      className="terminal-head-btn"
                      onClick={handleReplay}
                      title="Relancer l'exemple"
                      aria-label="Relancer l'exemple"
                    >
                      <RotateCcw className={`btn-icon ${isReplaying ? 'is-spinning' : ''}`} />
                    </button>
                  )}
                  <button
                    className="terminal-head-btn"
                    onClick={handleCopySnippet}
                    title="Copier le code"
                    aria-label="Copier le code"
                  >
                    {copiedSnippet ? <Check className="btn-icon-green" /> : <Copy className="btn-icon" />}
                  </button>
                  <span className="terminal-live-pill">
                    <span className="live-ping-dot" />
                    SANDBOX
                  </span>
                </div>
              </div>

              <div className="terminal-v2-body">
                {activeTab === 'cli' && (
                  <div className={`terminal-cli-view ${isReplaying ? 'is-animating' : ''}`}>
                    <div className="terminal-cli-input">
                      <span className="terminal-prompt">$</span>
                      <span className="terminal-cmd">dinari</span>
                      <span className="terminal-sub">transactions create</span>
                      <span className="terminal-arg">--amount 45000</span>
                      <span className="terminal-arg">--currency DZD</span>
                      <span className="terminal-arg">--escrow bipartite</span>
                    </div>

                    <div className="terminal-log-chain">
                      <div className="terminal-log-line step-1">
                        <span className="log-index">[01/03]</span>
                        <span className="log-text">Validation des conditions de la transaction...</span>
                        <span className="log-ms">Exemple</span>
                      </div>
                      <div className="terminal-log-line step-2">
                        <span className="log-index">[02/03]</span>
                        <span className="log-text">Réservation des fonds : 45 000 DZD retenus sous séquestre...</span>
                        <span className="log-ms">Exemple</span>
                      </div>
                      <div className="terminal-log-line step-3">
                        <span className="log-index">[03/03]</span>
                        <span className="log-text">Notification d’événement émise vers le webhook marchand...</span>
                        <span className="log-ms">Exemple</span>
                      </div>
                      <div className="terminal-log-success">
                        <CheckCircle2 className="success-icon" />
                        <span>Transaction <strong>#tx_01H982A</strong> initialisée en mode Sandbox.</span>
                        <span className="success-ms">200 OK</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ts' && (
                  <pre className="terminal-pre">
                    <code>
                      <span className="tok-keyword">import</span> &#123; Dinari &#125; <span className="tok-keyword">from</span> <span className="tok-string">&apos;@dinari/engine-sdk&apos;</span><br /><br />
                      <span className="tok-comment">// 1. Initialiser le client</span><br />
                      <span className="tok-keyword">const</span> dinari = <span className="tok-keyword">new</span> <span className="tok-function">Dinari</span>(&#123; apiKey: process.env.<span className="tok-prop">DINARI_SECRET</span> &#125;)<br /><br />
                      <span className="tok-comment">// 2. Définir participants, montant et séquestre</span><br />
                      <span className="tok-keyword">const</span> escrow = <span className="tok-keyword">await</span> dinari.transactions.<span className="tok-function">create</span>(&#123;<br />
                      {'  '}amount: <span className="tok-number">45000</span>, <span className="tok-comment">// DZD</span><br />
                      {'  '}currency: <span className="tok-string">&quot;DZD&quot;</span>,<br />
                      {'  '}parties: &#123; buyer: <span className="tok-string">&quot;usr_buyer_82&quot;</span>, seller: <span className="tok-string">&quot;usr_merchant_14&quot;</span> &#125;,<br />
                      {'  '}escrow: &#123; releaseTrigger: <span className="tok-string">&quot;delivery_confirmed&quot;</span>, timeoutHours: <span className="tok-number">72</span> &#125;<br />
                      &#125;)
                    </code>
                  </pre>
                )}

                {activeTab === 'curl' && (
                  <pre className="terminal-pre">
                    <code>
                      <span className="tok-keyword">curl</span> -X POST https://api.dinari.com/v1/transactions \<br />
                      {'  '}-H <span className="tok-string">&quot;Authorization: Bearer sec_live_dzd_...&quot;</span> \<br />
                      {'  '}-H <span className="tok-string">&quot;Content-Type: application/json&quot;</span> \<br />
                      {'  '}-d <span className="tok-string">&apos;&#123;&quot;amount&quot;: 45000, &quot;currency&quot;: &quot;DZD&quot;, &quot;escrow&quot;: &#123;&quot;release_trigger&quot;: &quot;delivery_confirmed&quot;&#125;&#125;&apos;</span>
                    </code>
                  </pre>
                )}
              </div>

              <div className="terminal-v2-footer">
                <div className="terminal-status-group">
                  <span className="terminal-status-label">STATUT DU SÉQUESTRE</span>
                  <div className="terminal-status-pill">
                    <span className="status-ping" />
                    <strong>HELD_IN_ESCROW</strong>
                  </div>
                </div>

                <div className="terminal-meta-group">
                  <div className="meta-pill">
                    <span>TX_ID:</span>
                    <code>tx_01H982A</code>
                  </div>
                  <div className="meta-pill">
                    <span>MODE:</span>
                    <code>SANDBOX DZD</code>
                  </div>
                  <div className="meta-pill">
                    <span>IDEMPOTENCE:</span>
                    <strong className="text-teal">ACTIVE</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="engine-floating-badge badge-top-right">
              <Zap className="floating-badge-icon icon-gold" />
              <div>
                <strong>Architecture Événementielle</strong>
                <small>Webhooks signés HMAC-SHA256</small>
              </div>
            </div>

            <div className="engine-floating-badge badge-bottom-left">
              <ShieldCheck className="floating-badge-icon icon-teal" />
              <div>
                <strong>Séquestre Programmable</strong>
                <small>Conditions de libération automatisées</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — Section: Why Dinari Engine? (Problem & Solution)
          ===================================================================== */}
      <section className="engine-overview-v2 section" id="why-engine">
        <div className="container">
          <div className="section-head split engine-overview-head">
            <div>
              <div className="kicker dark">
                <span /> POURQUOI DINARI ENGINE
              </div>
              <h2>
                La logique transactionnelle,<br />
                <span>sans reconstruire votre infrastructure.</span>
              </h2>
            </div>
            <div className="engine-overview-lead-box">
              <p>
                Construire une marketplace ou une plateforme numérique nécessite de coordonner de nombreux acteurs : acheteur, vendeur, état du paiement, transporteur, conditions de remise, gestion des anomalies et règlement final. Dinari Engine fournit la couche d’orchestration logicielle qui coordonne ce cycle de vie de bout en bout, sans nécessiter la réécriture de votre socle technique.
              </p>
              <div className="engine-lead-badge">
                <span className="lead-badge-dot" />
                <span>Engine coordonne le workflow autour de la transaction</span>
              </div>
            </div>
          </div>

          {/* =====================================================================
              03 — 4 Core Capabilities: Intégrer / Orchestrer / Contrôler / Tracer
              ===================================================================== */}
          <div className="engine-pillars-v2" id="capabilities">
            {/* Pillar 01 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-teal">
                  <Code2 className="pillar-icon" />
                </div>
                <span className="pillar-index">01 / INTÉGRER</span>
              </div>
              <h3 className="pillar-title">Connexion à votre produit</h3>
              <p className="pillar-desc">
                Connectez votre application existante via une API REST canonique, des webhooks asynchrones et des SDKs typés (Node.js/TypeScript, Python, PHP).
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>SDKs natifs et spécification OpenAPI 3.1</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Webhooks asynchrones avec stratégie de retry</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Environnement Sandbox DZD immédiat</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>REST API &amp; SDKs</code>
              </div>
            </article>

            {/* Pillar 02 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-gold">
                  <GitBranch className="pillar-icon" />
                </div>
                <span className="pillar-index">02 / ORCHESTRER</span>
              </div>
              <h3 className="pillar-title">États &amp; Transitions</h3>
              <p className="pillar-desc">
                Définissez les états de la transaction, les conditions de transition, les délais d’inspection et les règles de libération sous séquestre.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Automates d’états finis déterministes</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Gestion des délais et expirations programmées</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Clés d’idempotence sur chaque opération</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>INITIATED ➔ HELD ➔ RELEASED</code>
              </div>
            </article>

            {/* Pillar 03 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-emerald">
                  <ShieldCheck className="pillar-icon" />
                </div>
                <span className="pillar-index">03 / CONTRÔLER</span>
              </div>
              <h3 className="pillar-title">Règles métier &amp; Validation</h3>
              <p className="pillar-desc">
                Appliquez vos politiques de validation, les autorisations de déblocage, les calculs de commissions et les workflows d’exception.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Conditions de validation bilatérale</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Règles de split et commissions de plateforme</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Workflows de gestion des contestations</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>Validation &amp; Contrôles</code>
              </div>
            </article>

            {/* Pillar 04 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-blue">
                  <Activity className="pillar-icon" />
                </div>
                <span className="pillar-index">04 / TRACER</span>
              </div>
              <h3 className="pillar-title">Événements &amp; Rapprochement</h3>
              <p className="pillar-desc">
                Conservez l’historique exhaustif des opérations, les événements horodatés et générez des rapports de rapprochement structurés.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Journalisation d’audit complète</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Exports et rapports de réconciliation</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Observabilité complète des flux opérationnels</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>Piste d’audit &amp; Réconciliation</code>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =====================================================================
          04 & 11 — Architecture Section: Clear Tier Boundaries
          ===================================================================== */}
      <section className="engine-architecture-v2 section" id="architecture">
        <div className="engine-arch-glow-bg" />
        <div className="engine-arch-grid-pattern" />

        <div className="container engine-arch-container">
          <div className="section-head centered light-head arch-heading">
            <div className="engine-kicker-badge arch-kicker-badge">
              <Cpu className="kicker-icon" />
              <span>TOPOLOGIE DU SYSTÈME</span>
            </div>
            <h2 className="arch-title">
              Dinari Engine ajoute une couche d’orchestration <br />
              <em>à votre stack technologique existante.</em>
            </h2>
            <p className="arch-subtitle">
              Engine ne remplace pas votre infrastructure financière : il s’insère comme couche logicielle intelligente entre vos produits et vos partenaires opérationnels et de règlement.
            </p>
          </div>

          {/* 3 Architecture Layers with Directional Connectors */}
          <div className="arch-topology-grid">
            {/* Layer 01: Client Products */}
            <div className="arch-node-card node-client">
              <div className="arch-node-head">
                <div className="arch-node-icon-wrap">
                  <Smartphone className="arch-node-icon" />
                </div>
                <span className="arch-node-tag">01 / VOTRE APPLICATION</span>
              </div>
              <h3 className="arch-node-title">Votre Produit</h3>
              <p className="arch-node-desc">
                Marketplaces B2B/C2C, applications e-commerce, plateformes de services ou outils SaaS.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Interface utilisateur &amp; Expérience client</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Gestion des catalogues &amp; Utilisateurs</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Consommation de l’API Engine</span>
                </div>
              </div>
              <div className="arch-node-footer">
                <code>Requêtes signées HTTPS / TLS 1.3</code>
              </div>
            </div>

            {/* Directional Connector 01 -> 02 */}
            <div className="arch-flow-connector">
              <div className="connector-wire">
                <span className="wire-signal" />
              </div>
              <div className="connector-pill">
                <ArrowRight className="conn-arrow desktop-only" />
                <ArrowDown className="conn-arrow mobile-only" />
                <span>REST / Webhooks</span>
              </div>
            </div>

            {/* Layer 02: Dinari Engine Core (Highlighted Hub) */}
            <div className="arch-node-card node-core">
              <div className="arch-node-head">
                <div className="arch-node-icon-wrap icon-gold-wrap">
                  <Cpu className="arch-node-icon icon-gold-color" />
                </div>
                <span className="arch-node-tag tag-gold">02 / COUCHE D’ORCHESTRATION</span>
              </div>
              <h3 className="arch-node-title title-gold">Dinari Engine</h3>
              <p className="arch-node-desc desc-light">
                Le moteur d’orchestration de transaction. Applique vos règles métier, gère les états sous séquestre et coordonne les transitions.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Automate à états finis (Transitions déterministes)</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Logique d’escrow &amp; Séquestre conditionnel</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Événements en direct &amp; Piste d’audit</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Rapprochement des flux &amp; Écritures</span>
                </div>
              </div>
              <div className="arch-node-footer footer-gold">
                <code>Engine Kernel API</code>
              </div>
            </div>

            {/* Directional Connector 02 -> 03 */}
            <div className="arch-flow-connector">
              <div className="connector-wire">
                <span className="wire-signal reverse" />
              </div>
              <div className="connector-pill">
                <ArrowRight className="conn-arrow desktop-only" />
                <ArrowDown className="conn-arrow mobile-only" />
                <span>Flux Opérationnels</span>
              </div>
            </div>

            {/* Layer 03: Financial & Operational Infrastructure */}
            <div className="arch-node-card node-bank">
              <div className="arch-node-head">
                <div className="arch-node-icon-wrap icon-teal-wrap">
                  <Server className="arch-node-icon icon-teal-color" />
                </div>
                <span className="arch-node-tag">03 / INFRASTRUCTURE FINANCIÈRE &amp; OPÉRATIONNELLE</span>
              </div>
              <h3 className="arch-node-title">Partenaires &amp; Réseaux</h3>
              <p className="arch-node-desc">
                Réseaux de paiement existants, transporteurs logistiques et banques partenaires requises par le déploiement.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Passerelles &amp; Réseaux bancaires</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Transporteurs &amp; Statuts de livraison</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Canaux de règlement et compensation</span>
                </div>
              </div>
              <div className="arch-node-footer">
                <code>Réseaux de paiement &amp; Partenaires</code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05, 09 & 10 — API & Code Examples Section
          ===================================================================== */}
      <section className="engine-api-v2 section" id="api">
        <div className="engine-api-glow-bg" />
        <div className="engine-api-grid-pattern" />

        <div className="container engine-api-container">
          <div className="api-heading-v2">
            <div>
              <div className="engine-kicker-badge api-kicker-badge">
                <Terminal className="kicker-icon" />
                <span>API REST &amp; SDKS DÉVELOPPEUR</span>
              </div>
              <h2 className="api-title-v2">
                Des primitives claires <br />
                <em>pour modéliser vos transactions.</em>
              </h2>
            </div>
            <div className="api-lead-box">
              <p>
                Interagissez avec Dinari Engine via des requêtes REST simples, des webhooks vérifiables et des SDKs prêts à l’intégration.
              </p>
              <div className="api-version-pill">
                <span className="pill-dot" />
                <span>OpenAPI 3.1 • Environnement Sandbox DZD</span>
              </div>
            </div>
          </div>

          {/* Endpoints Selector */}
          <div className="endpoint-selector-grid">
            {apiEndpoints.map((ep, idx) => {
              const isSelected = selectedEndpoint === idx
              return (
                <button
                  key={ep.path + ep.method}
                  className={`endpoint-btn ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => setSelectedEndpoint(idx)}
                >
                  <div className="endpoint-btn-top">
                    <span className={`method-badge method-${ep.method.toLowerCase()}`}>
                      {ep.method}
                    </span>
                    <span className="endpoint-tag">{ep.tag}</span>
                  </div>
                  <div className="endpoint-btn-path">
                    <code>{ep.path}</code>
                  </div>
                  <div className="endpoint-btn-desc">
                    <span>{ep.desc}</span>
                    <ArrowRight className="endpoint-arrow" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Interactive Playground Console */}
          <div className="api-playground-box">
            <div className="playground-head">
              <div className="playground-head-left">
                <div className="terminal-window-controls">
                  <span className="win-dot dot-red" />
                  <span className="win-dot dot-yellow" />
                  <span className="win-dot dot-green" />
                </div>
                <div className="playground-active-route">
                  <span className={`method-tag method-${apiEndpoints[selectedEndpoint].method.toLowerCase()}`}>
                    {apiEndpoints[selectedEndpoint].method}
                  </span>
                  <span className="route-url">https://api.dinari.com{apiEndpoints[selectedEndpoint].path}</span>
                </div>
              </div>

              <div className="playground-lang-tabs">
                <button
                  className={`lang-tab ${apiLang === 'ts' ? 'active' : ''}`}
                  onClick={() => setApiLang('ts')}
                >
                  <Code2 className="tab-icon" />
                  <span>TypeScript SDK</span>
                </button>
                <button
                  className={`lang-tab ${apiLang === 'curl' ? 'active' : ''}`}
                  onClick={() => setApiLang('curl')}
                >
                  <Zap className="tab-icon" />
                  <span>cURL REST</span>
                </button>
                <button
                  className={`lang-tab ${apiLang === 'py' ? 'active' : ''}`}
                  onClick={() => setApiLang('py')}
                >
                  <Terminal className="tab-icon" />
                  <span>Python SDK</span>
                </button>
                <button
                  className={`lang-tab tab-response ${apiLang === 'response' ? 'active' : ''}`}
                  onClick={() => setApiLang('response')}
                >
                  <CheckCircle2 className="tab-icon icon-emerald" />
                  <span>Exemple de Réponse</span>
                </button>
              </div>

              <div className="playground-head-actions">
                <button
                  className="terminal-head-btn"
                  onClick={handleCopyApiCode}
                  title="Copier le code"
                  aria-label="Copier le code de la requête"
                >
                  {copiedApiCode ? <Check className="btn-icon-green" /> : <Copy className="btn-icon" />}
                </button>
                <span className="playground-latency-pill">
                  <span className="live-ping-dot" />
                  SANDBOX
                </span>
              </div>
            </div>

            <div className="playground-body">
              <pre className="playground-pre">
                <code>{apiEndpoints[selectedEndpoint].snippets[apiLang]}</code>
              </pre>
            </div>

            <div className="playground-footer">
              <div className="playground-footer-left">
                <span className="footer-status-tag">RÈGLES D’APPEL</span>
                <span className="footer-status-pill">
                  Idempotency-Key supportée • Webhooks signés HMAC • TLS 1.3
                </span>
              </div>
              <div className="playground-footer-right">
                <span>Environnement : <strong>Sandbox DZD (Démonstration)</strong></span>
              </div>
            </div>
          </div>

          {/* Integrator Resource Cards */}
          <div className="api-resources-grid">
            <div className="api-resource-card">
              <div className="resource-icon-wrap">
                <Code2 className="resource-icon" />
              </div>
              <div className="resource-text">
                <strong>Spécification OpenAPI 3.1</strong>
                <p>Schéma JSON Schema documenté pour la génération automatique de vos clients et types.</p>
              </div>
              <a href="#api" className="resource-link">
                <span>Consulter le schéma</span>
                <ArrowRight />
              </a>
            </div>

            <div className="api-resource-card">
              <div className="resource-icon-wrap">
                <ShieldCheck className="resource-icon" />
              </div>
              <div className="resource-text">
                <strong>Webhooks signés HMAC</strong>
                <p>Chaque événement de transition d’état est signé cryptographiquement pour vérification.</p>
              </div>
              <a href="#api" className="resource-link">
                <span>Guide des événements</span>
                <ArrowRight />
              </a>
            </div>

            <div className="api-resource-card">
              <div className="resource-icon-wrap">
                <Zap className="resource-icon" />
              </div>
              <div className="resource-text">
                <strong>Clés Sandbox DZD</strong>
                <p>Testez vos scénarios de séquestre et de confirmation dans un environnement sans risque financier.</p>
              </div>
              <a href="mailto:contact@dinari.com" className="resource-link">
                <span>Demander un accès Sandbox</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          08 — Transaction Workflows: State Machine (INITIATED -> RELEASED)
          ===================================================================== */}
      <section className="engine-overview-v2 section" id="workflows">
        <div className="container">
          <div className="section-head centered">
            <div className="kicker dark">
              <span /> AUTOMATE D’ÉTATS FINIS
            </div>
            <h2>
              Une machine à états déterministe.<br />
              <span>Chaque transition sous contrôle.</span>
            </h2>
            <p style={{ maxWidth: '640px', margin: '0 auto' }}>
              Chaque transaction suit un cycle de vie strict. Une transition ne peut survenir que si les conditions requises ou les événements déclencheurs sont formellement validés par votre workflow.
            </p>
          </div>

          {/* Visual State Machine Pipeline */}
          <div className="engine-pipeline-banner" style={{ marginTop: '30px' }}>
            <div className="pipeline-title-row">
              <span className="pipeline-kicker">CYCLE DE VIE D’UNE TRANSACTION</span>
              <h4>De l’initiation de la commande jusqu’à la libération des fonds</h4>
            </div>

            <div
              className="pipeline-steps-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '12px',
              }}
            >
              {stateMachineSteps.map((stepItem, idx) => (
                <div
                  key={stepItem.state}
                  className={`pipeline-node ${idx === 2 ? 'pipeline-node-active' : ''}`}
                  style={{ minHeight: '110px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="pipeline-node-icon" style={{ width: '28px', height: '28px', fontSize: '11px' }}>
                      0{idx + 1}
                    </div>
                    <code style={{ fontSize: '9px', color: 'var(--teal)', fontWeight: 'bold' }}>{stepItem.state}</code>
                  </div>
                  <div className="pipeline-node-info" style={{ marginTop: '10px' }}>
                    <strong style={{ fontSize: '13px' }}>{stepItem.label}</strong>
                    <span style={{ fontSize: '11px', lineHeight: 1.4, display: 'block', color: 'var(--muted)' }}>
                      {stepItem.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          07 & 14 — Security, Controls & Audit
          ===================================================================== */}
      <section className="engine-api-v2 section" id="security" style={{ background: '#03142d', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="container">
          <div className="section-head centered light-head">
            <div className="engine-kicker-badge arch-kicker-badge">
              <Lock className="kicker-icon" />
              <span>SÉCURITÉ &amp; CONTRÔLES SYSTÈME</span>
            </div>
            <h2 className="arch-title">
              Des contrôles d’ingénierie rigoureux <br />
              <em>pour des opérations prévisibles.</em>
            </h2>
            <p className="arch-subtitle" style={{ maxWidth: '620px', margin: '0 auto' }}>
              En matière d’infrastructure de transaction, la sécurité se mesure à la robustesse des contrôles logiciels, à la traçabilité des états et à la prévention des anomalies.
            </p>
          </div>

          {/* 6 Security Controls Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            {securityControls.map((ctrl) => (
              <div
                key={ctrl.title}
                style={{
                  background: 'rgba(255, 255, 255, 0.035)',
                  border: '1px solid rgba(255, 255, 255, 0.09)',
                  borderRadius: '16px',
                  padding: '24px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ font: '9px monospace', fontWeight: 800, color: 'var(--teal)', background: 'rgba(0,128,128,0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                      {ctrl.tag}
                    </span>
                    <ShieldCheck style={{ width: '16px', height: '16px', color: 'var(--gold)' }} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{ctrl.title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.55, color: '#8faec9', margin: 0 }}>{ctrl.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          16 — Use Cases: Marketplaces, E-commerce, B2B, Logistics
          ===================================================================== */}
      <section className="engine-overview-v2 section" id="use-cases">
        <div className="container">
          <div className="section-head centered">
            <div className="kicker dark">
              <span /> CAS D’USAGE
            </div>
            <h2>
              Construisez des workflows transactionnels <br />
              <span>adaptés à votre produit.</span>
            </h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Qu’il s’agisse d’une marketplace multi-vendeurs ou d’une plateforme de services, Dinari Engine s’adapte à la logique spécifique de vos transactions.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginTop: '40px',
            }}
          >
            {useCases.map((uc) => {
              const IconComp = uc.icon
              return (
                <div
                  key={uc.title}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(1, 36, 86, 0.08)',
                    borderRadius: '16px',
                    padding: '28px 24px',
                    boxShadow: '0 4px 20px rgba(1, 36, 86, 0.03)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(0,128,128,0.1)', color: 'var(--teal)', display: 'grid', placeItems: 'center' }}>
                        <IconComp style={{ width: '20px', height: '20px' }} />
                      </div>
                      <span style={{ font: '9px monospace', fontWeight: 800, color: 'var(--navy)', background: '#edf3f7', padding: '3px 8px', borderRadius: '4px' }}>
                        {uc.tag}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy)', margin: '0 0 10px' }}>{uc.title}</h3>
                    <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--muted)', margin: 0 }}>{uc.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          17 — Final Dual CTA: Developers vs Companies / Product Teams
          ===================================================================== */}
      <section className="engine-architecture-v2 section" id="cta" style={{ padding: '80px 0 100px' }}>
        <div className="container">
          <div className="arch-cta-box" style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <div className="arch-cta-content" style={{ marginBottom: '28px' }}>
              <div className="engine-kicker-badge" style={{ margin: '0 auto 16px', display: 'inline-flex' }}>
                <Terminal className="kicker-icon" />
                <span>INTÉGRATION &amp; DÉMARRAGE</span>
              </div>
              <h2 style={{ fontSize: 'clamp(28px, 5vw, 42px)', color: '#fff', margin: '0 0 12px' }}>
                Prêt à intégrer Dinari Engine dans votre stack ?
              </h2>
              <p style={{ maxWidth: '640px', margin: '0 auto', color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: 1.6 }}>
                Que vous souhaitiez explorer les primitives d’API en environnement test ou modéliser un workflow transactionnel complexe pour votre plateforme, nos équipes sont à votre disposition.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                textAlign: 'left',
              }}
            >
              {/* Card 1: For Developers */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ font: '10px monospace', color: 'var(--teal)', fontWeight: 800 }}>POUR LES DÉVELOPPEURS</span>
                  <h3 style={{ fontSize: '18px', color: '#fff', margin: '6px 0 8px' }}>Explorer l’API</h3>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                    Découvrez les primitives, la spécification OpenAPI, les SDKs et testez vos requêtes dans notre environnement Sandbox.
                  </p>
                </div>
                <div style={{ marginTop: '18px' }}>
                  <a className="button button-gold arch-btn-gold" href="#api" style={{ width: '100%', justifyContent: 'center' }}>
                    <span>Accéder aux outils API</span>
                    <ArrowUp />
                  </a>
                </div>
              </div>

              {/* Card 2: For Product Teams & Companies */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '14px',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <span style={{ font: '10px monospace', color: 'var(--gold)', fontWeight: 800 }}>POUR LES ENTREPRISES &amp; PLATES-FORMES</span>
                  <h3 style={{ fontSize: '18px', color: '#fff', margin: '6px 0 8px' }}>Parler à l’équipe Engine</h3>
                  <p style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, margin: 0 }}>
                    Discutez de votre modèle transactionnel, de vos règles d’arbitrage et de votre architecture d’intégration avec nos ingénieurs.
                  </p>
                </div>
                <div style={{ marginTop: '18px' }}>
                  <a className="button button-navy arch-btn-outline" href="mailto:contact@dinari.com" style={{ width: '100%', justifyContent: 'center', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                    <span>Échanger avec l’équipe</span>
                    <ArrowRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          19 — Institutional Footer: Ecosystem structure
          ===================================================================== */}
      <footer className="footer-v2" id="footer">
        <div className="container footer-v2-container">
          <div className="footer-v2-status-bar">
            <div className="footer-quick-email">
              <Mail className="footer-quick-email-icon" />
              <span>Assistance technique &amp; B2B :</span>
              <a href="mailto:contact@dinari.com" className="footer-email-link">contact@dinari.com</a>
            </div>
          </div>

          <div className="footer-v2-grid">
            <div className="footer-col footer-col-brand">
              <a href="/" className="brand" aria-label="Dinari, accueil">
                <img src="/images/dinari-logo.png" alt="" className="brand-mark-image" />
                <span>Dinari</span>
              </a>
              <p className="footer-brand-mission">
                Dinari Engine est l’infrastructure logicielle programmable de Dinari pour orchestrer le séquestre et sécuriser les transactions digitales en Algérie.
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
                  <span>Support &amp; Solutions d’intégration</span>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Écosystème Dinari</h4>
              <ul className="footer-link-list">
                <li><a href="/#download">Application Dinari</a></li>
                <li><a href="/#fonctionnement">Comment ça marche</a></li>
                <li><a href="/#avantages">Protection Acheteur &amp; Vendeur</a></li>
                <li><a href="/#securite">Sécurité du séquestre</a></li>
                <li><a href="/#faq">Foire Aux Questions (FAQ)</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Dinari Engine (B2B)</h4>
              <ul className="footer-link-list">
                <li><a href="#why-engine">Pourquoi Engine</a></li>
                <li><a href="#capabilities">Fonctionnalités &amp; Piliers</a></li>
                <li><a href="#architecture">Architecture &amp; Topologie</a></li>
                <li><a href="#workflows">Machine à états</a></li>
                <li><a href="#security">Sécurité &amp; Contrôles</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Développeurs &amp; Contact</h4>
              <ul className="footer-link-list">
                <li><a href="#api"><Terminal className="footer-mini-icon" /><span>Primitives d’API</span></a></li>
                <li><a href="#api"><Code2 className="footer-mini-icon" /><span>Environnement Sandbox</span></a></li>
                <li><a href="#use-cases">Cas d’usage plateformes</a></li>
                <li><a href="mailto:contact@dinari.com"><Mail className="footer-mini-icon" /><span>Support Développeurs</span></a></li>
                <li><a href="mailto:contact@dinari.com"><span>Échanger avec l’équipe</span><ExternalLink className="footer-sub-arrow" /></a></li>
              </ul>
            </div>
          </div>

          <div className="footer-v2-bottom">
            <div className="footer-bottom-copy">
              © 2026 Dinari. Tous droits réservés. Infrastructure transactionnelle et séquestre programmable.
            </div>
            <div className="footer-bottom-links">
              <a href="/#footer">Conditions Générales (CGU)</a>
              <span className="footer-sep">•</span>
              <a href="/#footer">Politique de Confidentialité</a>
              <span className="footer-sep">•</span>
              <a href="mailto:contact@dinari.com">contact@dinari.com</a>
            </div>
            <a href="#hero" className="footer-back-to-top" aria-label="Remonter en haut de la page">
              <span>Haut de page</span>
              <ArrowUp className="footer-top-icon" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}

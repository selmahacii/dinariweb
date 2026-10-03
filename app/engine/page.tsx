'use client'

import { useState } from 'react'
import {
  Activity,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
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
  RotateCcw,
  Scale,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Terminal,
  Zap,
} from 'lucide-react'

const apiEndpoints = [
  {
    method: 'POST',
    path: '/v1/transactions',
    tag: 'SÉQUESTRE',
    desc: 'Créer et orchestrer une transaction sous séquestre',
    snippets: {
      ts: `const transaction = await dinari.transactions.create({
  amount: 25000, // DZD
  currency: 'DZD',
  reference: 'ORD-10482',
  parties: {
    buyer: 'usr_cib_82',
    seller: 'usr_oran_14'
  },
  escrow: {
    mode: 'bipartite',
    autoReleaseOtp: true,
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
    "parties": { "buyer": "usr_cib_82", "seller": "usr_oran_14" },
    "escrow": { "mode": "bipartite", "auto_otp": true }
  }'`,
      py: `transaction = dinari.transactions.create(
    amount=25000,
    currency="DZD",
    reference="ORD-10482",
    parties={"buyer": "usr_cib_82", "seller": "usr_oran_14"},
    escrow={"mode": "bipartite", "auto_otp": True}
)`,
      response: `{
  "id": "tx_01H982A7K",
  "object": "transaction",
  "status": "reserved_escrow",
  "amount": 25000,
  "currency": "DZD",
  "reference": "ORD-10482",
  "escrow": {
    "state": "locked",
    "otp_pending": true,
    "vault": "satim_rail_58w"
  },
  "created_at": "2026-10-02T23:55:00Z",
  "checksum": "sha256:7f9a2b819e..."
}`
    }
  },
  {
    method: 'GET',
    path: '/v1/transactions/:id',
    tag: 'AUDIT',
    desc: 'Lire l’état en temps réel et l’historique du séquestre',
    snippets: {
      ts: `const transaction = await dinari.transactions.retrieve('tx_01H982A7K', {
  includeLedgerHistory: true
})`,
      curl: `curl -X GET https://api.dinari.com/v1/transactions/tx_01H982A7K \\
  -H "Authorization: Bearer sec_live_dzd_..."`,
      py: `transaction = dinari.transactions.retrieve(
    "tx_01H982A7K",
    include_ledger_history=True
)`,
      response: `{
  "id": "tx_01H982A7K",
  "status": "shipped_pending_delivery",
  "amount": 25000,
  "currency": "DZD",
  "timeline": [
    { "step": "reserved", "timestamp": "2026-10-02T21:10:00Z" },
    { "step": "in_transit", "timestamp": "2026-10-02T22:30:00Z" }
  ],
  "dispute_allowed_until": "2026-10-05T21:10:00Z"
}`
    }
  },
  {
    method: 'POST',
    path: '/v1/transactions/:id/confirm',
    tag: 'DÉBLOCAGE',
    desc: 'Confirmer le code OTP et libérer les fonds au vendeur',
    snippets: {
      ts: `const confirmation = await dinari.transactions.confirm('tx_01H982A7K', {
  otpCode: '849201',
  confirmedBy: 'buyer',
  deliveryCondition: 'conforme'
})`,
      curl: `curl -X POST https://api.dinari.com/v1/transactions/tx_01H982A7K/confirm \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "otp_code": "849201",
    "confirmed_by": "buyer",
    "delivery_condition": "conforme"
  }'`,
      py: `confirmation = dinari.transactions.confirm(
    "tx_01H982A7K",
    otp_code="849201",
    confirmed_by="buyer",
    delivery_condition="conforme"
)`,
      response: `{
  "id": "tx_01H982A7K",
  "status": "released_settled",
  "settlement": {
    "seller_payout_amount": 25000,
    "fee_deducted": 0,
    "payout_rail": "cib_instant_transfer",
    "settled_at": "2026-10-02T23:56:00Z"
  }
}`
    }
  },
  {
    method: 'POST',
    path: '/v1/reconciliation',
    tag: 'SETTLEMENT',
    desc: 'Lancer un rapprochement bancaire et comptable SATIM',
    snippets: {
      ts: `const report = await dinari.reconciliation.create({
  periodStart: '2026-10-01T00:00:00Z',
  periodEnd: '2026-10-02T23:59:59Z',
  format: 'json',
  rails: ['cib', 'edahabia']
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
  "status": "reconciled_100_percent",
  "total_volume_dzd": 18450000,
  "transactions_count": 738,
  "discrepancies_count": 0,
  "satim_batch_ack": "ACK_SATIM_99210",
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
  parties: { buyer: "usr_cib_82", seller: "usr_oran_14" },
  escrow: { releaseMode: "otp_verified", timeoutHours: 72 }
})`,
  curl: `curl -X POST https://api.dinari.com/v1/transactions \\
  -H "Authorization: Bearer sec_live_dzd_..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 45000,
    "currency": "DZD",
    "parties": { "buyer": "usr_cib_82", "seller": "usr_oran_14" },
    "escrow": { "mode": "bipartite", "auto_otp": true }
  }'`
}

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
      <header className="engine-nav-v2">
        <div className="engine-nav-inner">
          <a className="engine-nav-brand" href="/">
            <img src="/images/dinari-logo.png" alt="Dinari" className="brand-mark-image" />
            <span className="brand-title">Dinari</span>
            <span className="engine-nav-tag">Engine</span>
          </a>

          <nav className="engine-nav-links-v2" aria-label="Navigation Dinari Engine">
            <a href="#overview" className="engine-nav-link">Plateforme</a>
            <a href="#api" className="engine-nav-link">API</a>
            <a href="#architecture" className="engine-nav-link">Architecture</a>
          </nav>

          <div className="engine-nav-actions-v2">
            <a className="engine-nav-back-link" href="/">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au site</span>
            </a>
            <a className="engine-nav-cta-minimal" href="#api">
              <span>Explorer l’API</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* =====================================================================
          Engine Hero Section - DevEx & FinTech Architecture
          ===================================================================== */}
      <section className="engine-hero-v2" id="hero">
        <div className="engine-hero-mesh-bg" />
        <div className="engine-hero-grid-pattern" />

        <div className="container engine-hero-grid-v2">
          {/* Left Column: Value Proposition & Quick-Start */}
          <div className="engine-hero-content">
            <div className="engine-hero-kicker">
              <div className="engine-kicker-badge">
                <Terminal className="kicker-icon" />
                <span>SERVICE API DE DINARI</span>
              </div>
              <span className="engine-kicker-dot" />
              <div className="engine-version-pill">
                <span className="pill-dot" />
                <span>SDK v1.2.0 • Stable</span>
              </div>
            </div>

            <h1 className="engine-hero-h1">
              Dinari<br />
              <em>Engine.</em>
            </h1>

            <p className="engine-hero-lead">
              Les capacités de séquestre de Dinari, directement intégrées à votre code.
            </p>

            <p className="engine-hero-description">
              Dinari Engine est l’infrastructure API qui permet aux marketplaces algériennes, plateformes SaaS et applications e-commerce d’orchestrer des transactions sécurisées. Verrouillez les fonds, émettez les codes OTP d&apos;approbation et automatisez les règlements sur les 58 wilayas.
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
                <span>Latence P99 &lt; 45ms</span>
              </div>
              <div className="spec-dot">•</div>
              <div className="spec-item">
                <ShieldCheck className="spec-icon" />
                <span>Séquestre OTP Bipartite</span>
              </div>
              <div className="spec-dot">•</div>
              <div className="spec-item">
                <Code2 className="spec-icon" />
                <span>Sandbox Testnet DZD</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Developer Console */}
          <div className="engine-hero-visual">
            {/* Ambient Back Glow */}
            <div className="engine-console-glow" />

            <div className="engine-terminal-v2">
              {/* Window Header */}
              <div className="terminal-v2-head">
                <div className="terminal-window-controls">
                  <span className="win-dot dot-red" />
                  <span className="win-dot dot-yellow" />
                  <span className="win-dot dot-green" />
                </div>

                {/* Tab Switcher */}
                <div className="terminal-tabs">
                  <button
                    className={`terminal-tab ${activeTab === 'cli' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cli')}
                  >
                    <Terminal className="tab-icon" />
                    <span>CLI Workflow</span>
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

                {/* Header Actions */}
                <div className="terminal-head-actions">
                  {activeTab === 'cli' && (
                    <button
                      className="terminal-head-btn"
                      onClick={handleReplay}
                      title="Relancer la simulation"
                      aria-label="Relancer la simulation"
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
                    200 OK
                  </span>
                </div>
              </div>

              {/* Terminal Body */}
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
                        <span className="log-text">Validation des règles métier et du compte séquestre SATIM...</span>
                        <span className="log-ms">14ms</span>
                      </div>
                      <div className="terminal-log-line step-2">
                        <span className="log-index">[02/03]</span>
                        <span className="log-text">Réservation des fonds : 45,000 DZD verrouillés sous coffre...</span>
                        <span className="log-ms">22ms</span>
                      </div>
                      <div className="terminal-log-line step-3">
                        <span className="log-index">[03/03]</span>
                        <span className="log-text">Génération de la clé OTP chiffrée pour validation acheteur...</span>
                        <span className="log-ms">31ms</span>
                      </div>
                      <div className="terminal-log-success">
                        <CheckCircle2 className="success-icon" />
                        <span>Transaction <strong>#TX_01H982A</strong> orchestrée avec succès.</span>
                        <span className="success-ms">38ms</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ts' && (
                  <pre className="terminal-pre">
                    <code>
                      <span className="tok-keyword">import</span> &#123; Dinari &#125; <span className="tok-keyword">from</span> <span className="tok-string">&apos;@dinari/engine-sdk&apos;</span><br /><br />
                      <span className="tok-comment">// Initialisation avec clé secrète</span><br />
                      <span className="tok-keyword">const</span> dinari = <span className="tok-keyword">new</span> <span className="tok-function">Dinari</span>(&#123; apiKey: process.env.<span className="tok-prop">DINARI_SECRET</span> &#125;)<br /><br />
                      <span className="tok-comment">// Création et séquestre instantané</span><br />
                      <span className="tok-keyword">const</span> escrow = <span className="tok-keyword">await</span> dinari.transactions.<span className="tok-function">create</span>(&#123;<br />
                      {'  '}amount: <span className="tok-number">45000</span>, <span className="tok-comment">// Montant DZD</span><br />
                      {'  '}currency: <span className="tok-string">&quot;DZD&quot;</span>,<br />
                      {'  '}parties: &#123; buyer: <span className="tok-string">&quot;usr_cib_82&quot;</span>, seller: <span className="tok-string">&quot;usr_oran_14&quot;</span> &#125;,<br />
                      {'  '}escrow: &#123; mode: <span className="tok-string">&quot;bipartite&quot;</span>, releaseTrigger: <span className="tok-string">&quot;otp_verified&quot;</span> &#125;<br />
                      &#125;)
                    </code>
                  </pre>
                )}

                {activeTab === 'curl' && (
                  <pre className="terminal-pre">
                    <code>
                      <span className="tok-keyword">curl</span> -X POST https://api.dinari.com/v1/transactions \<br />
                      {'  '}-H <span className="tok-string">&quot;Authorization: Bearer sec_live_dzd_99a82...&quot;</span> \<br />
                      {'  '}-H <span className="tok-string">&quot;Content-Type: application/json&quot;</span> \<br />
                      {'  '}-d <span className="tok-string">&apos;&#123;&quot;amount&quot;: 45000, &quot;currency&quot;: &quot;DZD&quot;, &quot;escrow&quot;: &quot;bipartite&quot;, &quot;auto_otp&quot;: true&#125;&apos;</span>
                    </code>
                  </pre>
                )}
              </div>

              {/* Status Footer Inspector */}
              <div className="terminal-v2-footer">
                <div className="terminal-status-group">
                  <span className="terminal-status-label">STATUT SÉQUESTRE</span>
                  <div className="terminal-status-pill">
                    <span className="status-ping" />
                    <strong>RESERVED_ESCROW</strong>
                  </div>
                </div>

                <div className="terminal-meta-group">
                  <div className="meta-pill">
                    <span>TX_ID:</span>
                    <code>esc_01H982A</code>
                  </div>
                  <div className="meta-pill">
                    <span>RAIL:</span>
                    <code>SATIM / 58-W</code>
                  </div>
                  <div className="meta-pill">
                    <span>OTP:</span>
                    <strong className="text-teal">ACTIVE</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Ambient Badges */}
            <div className="engine-floating-badge badge-top-right">
              <Zap className="floating-badge-icon icon-gold" />
              <div>
                <strong>REST API & Webhooks</strong>
                <small>Signature HMAC-SHA256 • P99 &lt; 45ms</small>
              </div>
            </div>

            <div className="engine-floating-badge badge-bottom-left">
              <ShieldCheck className="floating-badge-icon icon-teal" />
              <div>
                <strong>Conformité SATIM & Loi 18-05</strong>
                <small>Séquestre Bipartite Chiffré</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {/* =====================================================================
          Overview Section - Product & Engineering Capabilities
          ===================================================================== */}
      <section className="engine-overview-v2 section" id="overview">
        <div className="container">
          <div className="section-head split engine-overview-head">
            <div>
              <div className="kicker dark">
                <span /> POUR LES ÉQUIPES PRODUIT & DÉVELOPPEURS
              </div>
              <h2>
                L’infrastructure<br />
                <span>derrière l’expérience.</span>
              </h2>
            </div>
            <div className="engine-overview-lead-box">
              <p>
                Dinari Engine connecte votre application à vos infrastructures financières existantes et coordonne chaque étape du cycle transactionnel. Vous gardez vos systèmes et votre interface, nous apportons une logique d’orchestration déterministe et conforme.
              </p>
              <div className="engine-lead-badge">
                <span className="lead-badge-dot" />
                <span>99.98% Précision de Rapprochement Bancaire</span>
              </div>
            </div>
          </div>

          {/* 4 Architectural Pillars Grid (Balanced 4-col) */}
          <div className="engine-pillars-v2">
            {/* Pillar 01 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-teal">
                  <Code2 className="pillar-icon" />
                </div>
                <span className="pillar-index">01 / INTÉGRER</span>
              </div>
              <h3 className="pillar-title">Connexion Universelle</h3>
              <p className="pillar-desc">
                SDKs typés (TypeScript, Python, PHP) ou API REST standard. Intégrez l&apos;orchestration de séquestre en moins de deux heures dans votre codebase existante.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>SDKs natifs & clients HTTP auto-générés</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Webhooks asynchrones avec retry exponentiel</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Sandbox DZD préconfigurée sans validation préalable</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>npm i @dinari/engine-sdk</code>
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
              <h3 className="pillar-title">Automates d’États Finis</h3>
              <p className="pillar-desc">
                Structurez et automatisez chaque étape du cycle transactionnel : verrouillage, validation d&apos;expédition, confirmation OTP et résolution des exceptions.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Transitions d&apos;états déterministes et sans course critique</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Gestion des délais d&apos;expiration (24h à 14 jours)</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Clés d&apos;idempotence sur chaque requête d&apos;orchestration</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>StateMachine: RESERVED ➔ RELEASED</code>
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
              <h3 className="pillar-title">Séquestre & Conformité</h3>
              <p className="pillar-desc">
                Appliquez vos règles métier avec une conformité légale totale (Loi 18-05). Les fonds restent isolés en compte séquestre dédié jusqu&apos;à l&apos;accord bipartite.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Séparation des fonds marchands et des séquestres</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Validation bipartite par code OTP chiffré par SMS</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Procédure de médiation et d&apos;arbitrage formalisée</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>SATIM & Loi 18-05 Compliant</code>
              </div>
            </article>

            {/* Pillar 04 */}
            <article className="pillar-card-v2">
              <div className="pillar-head">
                <div className="pillar-icon-wrap icon-blue">
                  <Zap className="pillar-icon" />
                </div>
                <span className="pillar-index">04 / TRACER</span>
              </div>
              <h3 className="pillar-title">Observabilité & Audit</h3>
              <p className="pillar-desc">
                Ledger cryptographique inaltérable. Chaque opération est horodatée et signée, garantissant un rapprochement comptable automatisé et zéro écart.
              </p>
              <ul className="pillar-feature-list">
                <li>
                  <Check className="pillar-check" />
                  <span>Journal d&apos;événements immuable avec hachage SHA-256</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Exports comptables automatisés (CSV, JSON, ERP)</span>
                </li>
                <li>
                  <Check className="pillar-check" />
                  <span>Traçabilité complète sur l&apos;ensemble des 58 wilayas</span>
                </li>
              </ul>
              <div className="pillar-footer-tag">
                <code>Audit Trail: SHA-256 Checksum</code>
              </div>
            </article>
          </div>

          {/* Interactive Pipeline Banner */}
          <div className="engine-pipeline-banner">
            <div className="pipeline-title-row">
              <span className="pipeline-kicker">FLUX D&apos;EXÉCUTION UNIFIÉ</span>
              <h4>Comment Dinari Engine s&apos;articule dans votre infrastructure</h4>
            </div>

            <div className="pipeline-steps-grid">
              <div className="pipeline-node">
                <div className="pipeline-node-icon">01</div>
                <div className="pipeline-node-info">
                  <strong>Votre Application</strong>
                  <span>Marketplace, SaaS, e-commerce</span>
                </div>
              </div>

              <div className="pipeline-connector">
                <span className="connector-line" />
                <span className="connector-badge">REST / SDK</span>
              </div>

              <div className="pipeline-node pipeline-node-active">
                <div className="pipeline-node-icon">02</div>
                <div className="pipeline-node-info">
                  <strong>Dinari Engine</strong>
                  <span>Règles métier & Séquestre OTP</span>
                </div>
              </div>

              <div className="pipeline-connector">
                <span className="connector-line" />
                <span className="connector-badge">Ledger & SATIM</span>
              </div>

              <div className="pipeline-node">
                <div className="pipeline-node-icon">03</div>
                <div className="pipeline-node-info">
                  <strong>Règlement & Banques</strong>
                  <span>CIB, Edahabia & 58 Wilayas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          API Section - Interactive Primitives & Live Playground
          ===================================================================== */}
      <section className="engine-api-v2 section" id="api">
        <div className="engine-api-glow-bg" />
        <div className="engine-api-grid-pattern" />

        <div className="container engine-api-container">
          {/* Section Heading */}
          <div className="api-heading-v2">
            <div>
              <div className="engine-kicker-badge api-kicker-badge">
                <Terminal className="kicker-icon" />
                <span>PRIMITIVES & INTÉGRATION REST</span>
              </div>
              <h2 className="api-title-v2">
                Des primitives universelles <br />
                <em>pour avancer vite.</em>
              </h2>
            </div>
            <div className="api-lead-box">
              <p>
                Une API REST canonique, des webhooks asynchrones et des SDKs typés pour intégrer l’orchestration de séquestre dans votre produit avec des contrats d’états explicites et une traçabilité intégrale.
              </p>
              <div className="api-version-pill">
                <span className="pill-dot" />
                <span>OpenAPI 3.1 • Testnet Sandbox DZD</span>
              </div>
            </div>
          </div>

          {/* 4 Interactive Endpoints Selector */}
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
            {/* Window Head Bar */}
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

              {/* Format / Language Tabs */}
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
                  <span>Réponse 200 OK</span>
                </button>
              </div>

              {/* Head Actions */}
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
                  34ms
                </span>
              </div>
            </div>

            {/* Code Body */}
            <div className="playground-body">
              <pre className="playground-pre">
                <code>{apiEndpoints[selectedEndpoint].snippets[apiLang]}</code>
              </pre>
            </div>

            {/* Playground Footer Status */}
            <div className="playground-footer">
              <div className="playground-footer-left">
                <span className="footer-status-tag">CONTRAINTES RÉSEAU</span>
                <span className="footer-status-pill">
                  Idempotency-Key Required • Rate Limit: 1,000 req/min • TLS 1.3
                </span>
              </div>
              <div className="playground-footer-right">
                <span>Environnement : <strong>Sandbox DZD (Actif)</strong></span>
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
                <p>Contrat strict JSON Schema pour génération automatique de types et clients.</p>
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
                <strong>Signatures Webhooks HMAC</strong>
                <p>Chaque événement de transition de fonds est signé par clé secrète SHA-256.</p>
              </div>
              <a href="#api" className="resource-link">
                <span>Guide de vérification</span>
                <ArrowRight />
              </a>
            </div>

            <div className="api-resource-card">
              <div className="resource-icon-wrap">
                <Zap className="resource-icon" />
              </div>
              <div className="resource-text">
                <strong>Comptes Sandbox de Test</strong>
                <p>Cartes virtuelles CIB & Edahabia pré-provisionnées pour valider vos parcours.</p>
              </div>
              <a href="mailto:contact@dinari.com" className="resource-link">
                <span>Obtenir une clé</span>
                <ArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          Architecture Section - Modular & Decoupled Enterprise Topology
          ===================================================================== */}
      <section className="engine-architecture-v2 section" id="architecture">
        <div className="engine-arch-glow-bg" />
        <div className="engine-arch-grid-pattern" />

        <div className="container engine-arch-container">
          <div className="section-head centered light-head arch-heading">
            <div className="engine-kicker-badge arch-kicker-badge">
              <Cpu className="kicker-icon" />
              <span>TOPOLOGIE SYSTÈME & INTÉGRATION SOUVERAINE</span>
            </div>
            <h2 className="arch-title">
              Un service de Dinari <br />
              <em>pour votre stack technologique.</em>
            </h2>
            <p className="arch-subtitle">
              Dinari est le produit et l’écosystème global de confiance. Dinari Engine est son service API haute performance, conçu pour s’insérer comme couche d’orchestration entre vos interfaces et les réseaux financiers d’Algérie.
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
                <span className="arch-node-tag">01 / CLIENT & MARCHAND</span>
              </div>
              <h3 className="arch-node-title">Vos Produits & Apps</h3>
              <p className="arch-node-desc">
                Marketplaces B2B/C2C, plateformes SaaS, applications mobiles iOS/Android ou boutiques e-commerce 58 wilayas.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>SDKs web, iOS & Android</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Zéro modification de votre BDD</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Événements asynchrones JSON</span>
                </div>
              </div>
              <div className="arch-node-footer">
                <code>Protocole: REST API & SDK</code>
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
                <span className="arch-node-tag tag-gold">02 / ORCHESTRATION LAYER</span>
              </div>
              <h3 className="arch-node-title title-gold">Dinari Engine Core</h3>
              <p className="arch-node-desc desc-light">
                Le cerveau transactionnel souverain. Applique vos règles métier, séquestre les montants et coordonne les déblocages par OTP.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Automates d’États Finis (FSM)</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Coffre-fort Séquestre Bipartite</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Validation OTP SHA-256</span>
                </div>
                <div className="arch-feature-pill pill-gold">
                  <Check className="pill-check icon-gold-color" />
                  <span>Ledger Immuable & Rapprochement</span>
                </div>
              </div>
              <div className="arch-node-footer footer-gold">
                <code>Engine Kernel v1.2 • Sovereign</code>
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
                <span>SATIM & ISO 8583</span>
              </div>
            </div>

            {/* Layer 03: Banking Rails & Infrastructure */}
            <div className="arch-node-card node-bank">
              <div className="arch-node-head">
                <div className="arch-node-icon-wrap icon-teal-wrap">
                  <Server className="arch-node-icon icon-teal-color" />
                </div>
                <span className="arch-node-tag">03 / RAILS BANCAIRES</span>
              </div>
              <h3 className="arch-node-title">Réseaux & Infrastructures</h3>
              <p className="arch-node-desc">
                Interconnexion directe avec les systèmes interbancaires algériens, comptes de compensation et banques partenaires.
              </p>
              <div className="arch-node-features">
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Switch National SATIM</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Cartes CIB & Edahabia (58 Wilayas)</span>
                </div>
                <div className="arch-feature-pill">
                  <Check className="pill-check" />
                  <span>Virements automatisés (BNA, BEA, CPA...)</span>
                </div>
              </div>
              <div className="arch-node-footer">
                <code>Conformité: Loi 18-05 & Banque d’Algérie</code>
              </div>
            </div>
          </div>

          {/* Guarantees & Metrics Strip */}
          <div className="arch-metrics-strip">
            <div className="arch-metric-item">
              <strong>100% Découplé</strong>
              <span>Architecture événementielle sans adhérence de données</span>
            </div>
            <div className="arch-metric-sep" />
            <div className="arch-metric-item">
              <strong>&lt; 45ms P99</strong>
              <span>Latence d’orchestration ultra-rapide</span>
            </div>
            <div className="arch-metric-sep" />
            <div className="arch-metric-item">
              <strong>Loi 18-05 & SATIM</strong>
              <span>Protection légale des fonds séquestrés</span>
            </div>
            <div className="arch-metric-sep" />
            <div className="arch-metric-item">
              <strong>58 Wilayas</strong>
              <span>Couverture nationale sans restriction régionale</span>
            </div>
          </div>

          {/* High Impact Call To Action Box */}
          <div className="arch-cta-box">
            <div className="arch-cta-content">
              <h3>Prêt à intégrer Dinari Engine dans votre stack ?</h3>
              <p>
                Nos ingénieurs solutions accompagnent votre équipe technique pour modéliser vos workflows de séquestre, paramétrer vos webhooks et provisionner votre Sandbox DZD.
              </p>
            </div>
            <div className="arch-cta-actions">
              <a className="button button-gold arch-btn-gold" href="mailto:contact@dinari.com">
                <span>Parler à l’équipe Engine</span>
                <ArrowRight />
              </a>
              <a className="button button-outline arch-btn-outline" href="#api">
                <span>Tester l’API Interactive</span>
                <ArrowUp />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="footer-v2" id="footer">
        <div className="container footer-v2-container">
          <div className="footer-v2-status-bar">
            <div className="footer-status-indicator">
              <span className="footer-status-dot" />
              <span className="footer-status-text">
                Réseaux SATIM, CIB & Edahabia : <strong>Systèmes 100% Opérationnels</strong>
              </span>
            </div>
            <div className="footer-quick-email">
              <Mail className="footer-quick-email-icon" />
              <span>Assistance directe :</span>
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

            <div className="footer-col">
              <h4 className="footer-col-title">Écosystème & Produit</h4>
              <ul className="footer-link-list">
                <li><a href="/#download">Application Mobile Android</a></li>
                <li><a href="/engine">Dinari Engine (B2B)</a></li>
                <li><a href="/#fonctionnement">Démonstration Séquestre</a></li>
                <li><a href="/#fonctionnement">Ledger Cryptographique Public</a></li>
                <li><a href="/#cycle">Cycle de Vie des Transactions</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Sécurité & Conformité</h4>
              <ul className="footer-link-list">
                <li><a href="/#securite"><ShieldCheck className="footer-mini-icon" /><span>Protocole Séquestre Bipartite</span></a></li>
                <li><a href="/#securite"><BadgeCheck className="footer-mini-icon" /><span>Conformité Loi 18-05 & SATIM</span></a></li>
                <li><a href="/#securite"><Lock className="footer-mini-icon" /><span>Coffre-fort Cryptographique OTP</span></a></li>
                <li><a href="/#faq"><Scale className="footer-mini-icon" /><span>Procédure d’Arbitrage</span></a></li>
                <li><a href="/#securite">Politique de Sécurité des Données</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-col-title">Développeurs & Support</h4>
              <ul className="footer-link-list">
                <li><a href="#api"><Terminal className="footer-mini-icon" /><span>Documentation API REST</span></a></li>
                <li><a href="#api"><Code2 className="footer-mini-icon" /><span>Sandbox Testnet DZD</span></a></li>
                <li><a href="/#faq">Questions Fréquentes (FAQ)</a></li>
                <li><a href="mailto:contact@dinari.com"><Mail className="footer-mini-icon" /><span>Support Développeurs & B2B</span></a></li>
                <li><a href="mailto:contact@dinari.com"><span>Partenariats Stratégiques</span><ExternalLink className="footer-sub-arrow" /></a></li>
              </ul>
            </div>
          </div>

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

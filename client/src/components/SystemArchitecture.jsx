import React, { useState } from 'react';
import { playClickSound } from '../utils/sound';
import './SystemArchitecture.css';

const architectureNodes = [
  {
    id: "edge",
    tier: "Edge & Security Layer",
    title: "Edge Rate Limiter & Reverse Proxy",
    tech: "Nginx / Cloudflare / express-rate-limit",
    desc: "Ingress security inspecting incoming payloads, throttling brute-force spikes, and terminating SSL.",
    stats: { latency: "< 5ms", throughput: "12,500 req/s", status: "Active (Shielded)" },
    specs: {
      "Rate Limit Policy": "100 req/min per IP",
      "Brute-Force Guard": "Automatic 15-min IP jail",
      "SSL Termination": "TLS 1.3 / Strict-Transport-Security",
      "Compression": "Brotli & Gzip"
    },
    codeSnippet: `app.use('/api/v1/auth', rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 100,\n  message: 'Too many requests, please try again later.'\n}));`
  },
  {
    id: "gateway",
    tier: "API Gateway & Router",
    title: "Express.js API Gateway",
    tech: "Node.js 20 / Express 5",
    desc: "Centralized routing, CORS management, request correlation IDs, and unified JSON response formatting.",
    stats: { latency: "12ms", activeConnections: "3,420", health: "99.98% uptime" },
    specs: {
      "Runtime": "Node.js v20 LTS Alpine",
      "Cluster Mode": "PM2 / Kubernetes Pod Replicas",
      "Validation": "Zod Schema Parser",
      "Observability": "Prometheus Metrics & Structured Logging"
    },
    codeSnippet: `const router = express.Router();\nrouter.use('/auth', authRoutes);\nrouter.use('/courses', courseRoutes);`
  },
  {
    id: "auth-svc",
    tier: "Microservice Layer",
    title: "Authentication & RBAC Service",
    tech: "JWT / bcrypt / Zod",
    desc: "Stateless authorization handling JWT signature verification, password hashing, and role-based permissions.",
    stats: { latency: "18ms", tokenValidation: "Sub-millisecond", status: "Zero Vulns" },
    specs: {
      "Hashing": "bcrypt (saltRounds = 12)",
      "Token Format": "HMAC-SHA256 Signed Bearer Token",
      "Role Hierarchy": "super_admin > instructor > student",
      "Session Lifetime": "15m Access + 7d Refresh"
    },
    codeSnippet: `const token = jwt.sign(\n  { id: user._id, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: '15m' }\n);`
  },
  {
    id: "course-svc",
    tier: "Microservice Layer",
    title: "Course Platform Service (MVC)",
    tech: "Express / Mongoose / MVC",
    desc: "Content catalog, enrollment state machine, role-gated CRUD operations, and pagination.",
    stats: { latency: "22ms", avgPayload: "4.8 KB", status: "Healthy" },
    specs: {
      "Pattern": "Controller - Service - Model (MVC)",
      "Access Guard": "roleGate(['instructor', 'admin'])",
      "Indexes": "{ title: 'text', category: 1 }",
      "Pagination": "Cursor-based limit/skip"
    },
    codeSnippet: `exports.getCourseDetails = async (req, res, next) => {\n  const course = await Course.findById(req.params.id)\n    .populate('instructor', 'name email');\n  return res.json({ success: true, data: course });\n};`
  },
  {
    id: "mongo",
    tier: "Persistence Layer",
    title: "MongoDB Cluster (Mongoose)",
    tech: "MongoDB 7.0 / Replica Set",
    desc: "Document store for courses, user identities, enrollment records, and audit logs.",
    stats: { p99Query: "14ms", storageUsed: "1.2 GB", connPool: "50 active" },
    specs: {
      "Driver": "Mongoose ODM with strict validation",
      "High Availability": "Primary + Secondary Replica Set",
      "Durability": "Write Concern w:majority",
      "Security": "SCRAM-SHA-256 + TLS encryption"
    },
    codeSnippet: `const UserSchema = new mongoose.Schema({\n  email: { type: String, required: true, unique: true },\n  passwordHash: { type: String, required: true },\n  role: { type: String, enum: ['user', 'admin'], default: 'user' }\n}, { timestamps: true });`
  },
  {
    id: "postgres",
    tier: "Persistence Layer",
    title: "PostgreSQL & Prisma ORM",
    tech: "PostgreSQL 16 / Prisma",
    desc: "Relational persistence for ACID transactional data, order records, and relational schemas.",
    stats: { transactionTime: "8ms", poolSize: "20 conns", status: "Synced" },
    specs: {
      "ORM": "Prisma with type-safe client generation",
      "Isolation Level": "Read Committed / Serializable",
      "Migrations": "Prisma Migrate CLI automated in CI",
      "Foreign Keys": "Cascade with referential integrity"
    },
    codeSnippet: `const order = await prisma.order.create({\n  data: {\n    userId: user.id,\n    status: 'COMPLETED',\n    items: { create: [{ courseId: 'c1', amount: 49.99 }] }\n  }\n});`
  }
];

const SystemArchitecture = () => {
  const [selectedNode, setSelectedNode] = useState(architectureNodes[0]);
  const [trafficMode, setTrafficMode] = useState("normal"); // "normal" or "spike"

  const handleSelect = (node) => {
    playClickSound();
    setSelectedNode(node);
  };

  return (
    <div className="sys-arch-container">
      <div className="arch-header">
        <div className="arch-title-area">
          <span className="arch-badge">INFRASTRUCTURE BLUEPRINT</span>
          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Production Microservices & Data Topology</span>
        </div>
        <div className="arch-controls">
          <button
            className={`arch-mode-btn ${trafficMode === 'normal' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setTrafficMode('normal'); }}
          >
            ● Baseline Traffic
          </button>
          <button
            className={`arch-mode-btn ${trafficMode === 'spike' ? 'active' : ''}`}
            onClick={() => { playClickSound(); setTrafficMode('spike'); }}
            style={{ color: trafficMode === 'spike' ? '#f87171' : undefined }}
          >
            ⚡ Traffic Spike (Rate Limiter Defense)
          </button>
        </div>
      </div>

      <div className="arch-main">
        {/* Diagram Area */}
        <div className="arch-diagram">
          {/* Edge Tier */}
          <div className="arch-tier">
            <div className="tier-label">// TIER 1: INGRESS & SECURITY</div>
            <div className="tier-nodes">
              {architectureNodes.filter(n => n.id === 'edge').map(node => (
                <div
                  key={node.id}
                  className={`arch-node ${selectedNode.id === node.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(node)}
                >
                  <div className="node-header">
                    <span className="node-title">{node.title}</span>
                    <span className="node-status" style={{ background: trafficMode === 'spike' ? '#f59e0b' : '#10b981' }}></span>
                  </div>
                  <div className="node-desc">{node.desc}</div>
                  <div className="node-stats">
                    <span>Latency: <span className="node-stat-num">{node.stats.latency}</span></span>
                    <span>Throughput: <span className="node-stat-num">{trafficMode === 'spike' ? '34,000 req/s' : node.stats.throughput}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-arrow">
            <div className="flow-pulse-line"></div>
            <span>HTTPS / TLS 1.3 Strict</span>
            <div className="flow-pulse-line"></div>
          </div>

          {/* Gateway Tier */}
          <div className="arch-tier">
            <div className="tier-label">// TIER 2: API GATEWAY</div>
            <div className="tier-nodes">
              {architectureNodes.filter(n => n.id === 'gateway').map(node => (
                <div
                  key={node.id}
                  className={`arch-node ${selectedNode.id === node.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(node)}
                >
                  <div className="node-header">
                    <span className="node-title">{node.title}</span>
                    <span className="node-status"></span>
                  </div>
                  <div className="node-desc">{node.desc}</div>
                  <div className="node-stats">
                    <span>Runtime: <span className="node-stat-num">{node.tech}</span></span>
                    <span>Connections: <span className="node-stat-num">{trafficMode === 'spike' ? '9,820' : node.stats.activeConnections}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-arrow">
            <div className="flow-pulse-line"></div>
            <span>Internal Cluster Routing</span>
            <div className="flow-pulse-line"></div>
          </div>

          {/* Microservices Tier */}
          <div className="arch-tier">
            <div className="tier-label">// TIER 3: SERVICES & BUSINESS LOGIC</div>
            <div className="tier-nodes">
              {architectureNodes.filter(n => n.id === 'auth-svc' || n.id === 'course-svc').map(node => (
                <div
                  key={node.id}
                  className={`arch-node ${selectedNode.id === node.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(node)}
                >
                  <div className="node-header">
                    <span className="node-title">{node.title}</span>
                    <span className="node-status"></span>
                  </div>
                  <div className="node-desc">{node.desc}</div>
                  <div className="node-stats">
                    <span>Tech: <span className="node-stat-num">{node.tech}</span></span>
                    <span>Latency: <span className="node-stat-num">{node.stats.latency}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-arrow">
            <div className="flow-pulse-line"></div>
            <span>Database Connection Pool</span>
            <div className="flow-pulse-line"></div>
          </div>

          {/* Database Tier */}
          <div className="arch-tier">
            <div className="tier-label">// TIER 4: PERSISTENCE & DATA STORAGE</div>
            <div className="tier-nodes">
              {architectureNodes.filter(n => n.id === 'mongo' || n.id === 'postgres').map(node => (
                <div
                  key={node.id}
                  className={`arch-node ${selectedNode.id === node.id ? 'selected' : ''}`}
                  onClick={() => handleSelect(node)}
                >
                  <div className="node-header">
                    <span className="node-title">{node.title}</span>
                    <span className="node-status"></span>
                  </div>
                  <div className="node-desc">{node.desc}</div>
                  <div className="node-stats">
                    <span>Engine: <span className="node-stat-num">{node.tech}</span></span>
                    <span>Pool: <span className="node-stat-num">{node.stats.p99Query || node.stats.transactionTime}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Node Detail Inspector */}
        <div className="arch-details-panel">
          <div>
            <div style={{ fontSize: '0.7rem', color: '#38bdf8', marginBottom: '4px' }}>{selectedNode.tier}</div>
            <div className="panel-title">{selectedNode.title}</div>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '6px' }}>{selectedNode.desc}</div>
          </div>

          <div className="panel-section">
            <div className="panel-sec-title">Architectural Specs</div>
            <div className="spec-list">
              {Object.entries(selectedNode.specs).map(([k, v]) => (
                <div key={k} className="spec-row">
                  <span className="spec-key">{k}</span>
                  <span className="spec-val">{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-section">
            <div className="panel-sec-title">Code Implementation Snippet</div>
            <pre style={{ margin: 0, fontSize: '0.72rem', color: '#7ee787', background: '#090d13', padding: '10px', borderRadius: '4px', overflowX: 'auto' }}>
              {selectedNode.codeSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemArchitecture;

import React, { useState } from 'react';
import { personalInfo, techData, skillsData } from './data';
import { playClickSound, playSuccessSound } from './utils/sound';

import ApiExplorer from './components/ApiExplorer';
import SystemArchitecture from './components/SystemArchitecture';
import PipelineVisualizer from './components/PipelineVisualizer';
import Terminal from './Terminal';

import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [activeSuiteTab, setActiveSuiteTab] = useState('api');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTabChange = (tab) => {
    playClickSound();
    setActiveSuiteTab(tab);
  };

  const copyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintResume = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="site-wrapper">
      {/* Ambient Lighting & Grid */}
      <div className="ambient-glow-wrapper">
        <div className="ambient-glow-1"></div>
        <div className="ambient-glow-2"></div>
        <div className="ambient-grid"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="site-nav">
        <a href="#overview" className="nav-brand" onClick={playClickSound}>
          <div className="brand-avatar">RS</div>
          <span className="brand-name">{personalInfo.name}</span>
          <span className="brand-role-pill">Backend &amp; DevOps</span>
        </a>

        <div className="nav-links">
          <a href="#overview" className="nav-link" onClick={playClickSound}>Overview</a>
          <a href="#jenkins" className="nav-link" onClick={playClickSound}>Jenkins OSS</a>
          <a href="#projects" className="nav-link" onClick={playClickSound}>Projects</a>
          <a href="#dev-suite" className="nav-link" onClick={playClickSound}>System Suite</a>
          <a href="#skills" className="nav-link" onClick={playClickSound}>Stack</a>
          <a href="#about" className="nav-link" onClick={playClickSound}>About</a>
        </div>

        <div className="nav-actions">
          <button className="btn-nav-secondary" onClick={handlePrintResume} title="Print or Save Resume PDF">
            <span>📄</span> Resume
          </button>
          <button className="btn-nav-primary" onClick={() => { playClickSound(); setIsContactOpen(true); }}>
            Get in Touch
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="overview" className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div className="hero-status-pill">
              <span className="status-dot"></span>
              <span>Available for Backend &amp; DevOps Internships • GSoC / LFX Ready</span>
            </div>

            <h1 className="hero-title">
              Architecting Resilient <br />
              <span className="hero-gradient-text">Backends, Containers &amp; CI/CD Pipelines.</span>
            </h1>

            <p className="hero-lead">
              Computer Science undergraduate with proven experience building production-ready REST APIs, hardened authentication architectures, and containerized cloud systems. Core contributor to <strong>Jenkins Core</strong>.
            </p>

            <div className="hero-cta-group">
              <a href="#dev-suite" className="hero-btn-primary" onClick={playClickSound}>
                <span>⚡</span> Test Live API Sandbox
              </a>
              <a href="#jenkins" className="hero-btn-secondary" onClick={playClickSound}>
                <span>✓</span> View Jenkins Core PR #26966
              </a>
              <button className="hero-btn-secondary" onClick={copyEmail}>
                {copied ? '✔ Email Copied!' : '📋 Copy Email'}
              </button>
            </div>

            {/* Key Metrics Grid */}
            <div className="hero-metrics-grid">
              <div className="metric-card">
                <div className="metric-val" style={{ color: '#f87171' }}>PR #26966</div>
                <div className="metric-label">Merged into Jenkins Core (CI/CD used by millions worldwide)</div>
              </div>
              <div className="metric-card">
                <div className="metric-val" style={{ color: '#38bdf8' }}>&lt; 25ms</div>
                <div className="metric-label">Average API latency with Zod validation &amp; rate-limiting</div>
              </div>
              <div className="metric-card">
                <div className="metric-val" style={{ color: '#34d399' }}>JWT + RBAC</div>
                <div className="metric-label">Stateless token architecture with bcrypt &amp; role-gated routes</div>
              </div>
              <div className="metric-card">
                <div className="metric-val" style={{ color: '#818cf8' }}>Docker + K8s</div>
                <div className="metric-label">Multi-stage container builds &amp; rolling cloud deployments</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Flagship Open Source: Jenkins Core */}
        <section id="jenkins" className="section-wrapper">
          <span className="section-tag">// GLOBAL OPEN SOURCE CONTRIBUTION</span>
          <h2 className="section-title">Jenkins Core Contributor</h2>
          <p className="section-desc">
            Direct code contribution merged into Jenkins Core master branch, resolving deprecated browser execution bugs in production CI/CD platforms.
          </p>

          <div className="jenkins-spotlight-card">
            <div className="jenkins-badge-row">
              <div className="jenkins-logo-pill">
                <span>⚡</span> JENKINS CORE
              </div>
              <div className="pr-status-badge">
                <span>✓</span> STATUS: MERGED TO MASTER
              </div>
            </div>

            <div className="jenkins-content-grid">
              <div className="jenkins-details">
                <h3>Resolve Deprecated window.event Reliance (PR #26966)</h3>
                <p>
                  Identified and resolved a critical cross-browser event handling defect caused by reliance on legacy <code>window.event</code>, eliminating a silent failure path in production codebases serving millions of automated pipelines.
                </p>

                <ul className="impact-bullet-list">
                  <li>
                    <span className="bullet-icon">▸</span>
                    <span><strong>Root Cause Resolution:</strong> Re-engineered legacy event delegation to pass standard event references explicitly without breaking backward compatibility.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">▸</span>
                    <span><strong>Collaborative Review:</strong> Navigated multi-round code reviews directly with Jenkins Core maintainers, incorporating technical feedback.</span>
                  </li>
                  <li>
                    <span className="bullet-icon">▸</span>
                    <span><strong>CI Validation:</strong> Passed Jenkins comprehensive automated CI validation test suites end-to-end before merging.</span>
                  </li>
                </ul>

                <a
                  href="https://github.com/jenkinsci/jenkins/pull/26966"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="jenkins-pr-btn"
                >
                  Inspect Pull Request #26966 on GitHub ↗
                </a>
              </div>

              <div className="jenkins-code-preview">
                <div className="code-preview-topbar">
                  <span>jenkinsci/jenkins • diff</span>
                  <span>PR #26966</span>
                </div>
                <pre className="code-pre">
<span className="diff-del">- // Deprecated global event reliance</span>
<span className="diff-del">- const evt = window.event;</span>
<span className="diff-del">- handlePipelineTrigger(evt.target);</span>
<br />
<span className="diff-add">+ // Modern event parameter passing</span>
<span className="diff-add">+ const handleTrigger = (event) =&gt; &#123;</span>
<span className="diff-add">+   const target = event?.target || event?.srcElement;</span>
<span className="diff-add">+   dispatchPipelineAction(target);</span>
<span className="diff-add">+ &#125;;</span>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Developer Suite (Mobbin Tabbed Component) */}
        <section id="dev-suite" className="section-wrapper">
          <span className="section-tag">// LIVE SYSTEM CONSOLE</span>
          <h2 className="section-title">Interactive Backend &amp; DevOps Suite</h2>
          <p className="section-desc">
            Directly test API endpoints, inspect microservice architecture flows, trigger CI/CD pipelines, and query system telemetry right in your browser.
          </p>

          <div className="dev-suite-wrapper">
            {/* Tab Navigation */}
            <div className="suite-tab-bar">
              <button
                className={`suite-tab-btn ${activeSuiteTab === 'api' ? 'active' : ''}`}
                onClick={() => handleTabChange('api')}
              >
                <span>⚡</span> REST API Sandbox
                <span className="tab-badge">Live</span>
              </button>
              <button
                className={`suite-tab-btn ${activeSuiteTab === 'arch' ? 'active' : ''}`}
                onClick={() => handleTabChange('arch')}
              >
                <span>🏗️</span> System Architecture
                <span className="tab-badge">Blueprint</span>
              </button>
              <button
                className={`suite-tab-btn ${activeSuiteTab === 'pipeline' ? 'active' : ''}`}
                onClick={() => handleTabChange('pipeline')}
              >
                <span>✓</span> CI/CD Pipeline
                <span className="tab-badge">Jenkins</span>
              </button>
              <button
                className={`suite-tab-btn ${activeSuiteTab === 'terminal' ? 'active' : ''}`}
                onClick={() => handleTabChange('terminal')}
              >
                <span>&gt;_</span> DevOps CLI
                <span className="tab-badge">Linux</span>
              </button>
            </div>

            {/* Tabbed Content Area */}
            <div className="suite-content-area">
              {activeSuiteTab === 'api' && <ApiExplorer />}
              {activeSuiteTab === 'arch' && <SystemArchitecture />}
              {activeSuiteTab === 'pipeline' && <PipelineVisualizer />}
              {activeSuiteTab === 'terminal' && <Terminal onClose={() => setActiveSuiteTab('api')} isMinimized={false} />}
            </div>
          </div>
        </section>

        {/* Production Projects Showcase */}
        <section id="projects" className="section-wrapper">
          <span className="section-tag">// PRODUCTION ARCHITECTURES</span>
          <h2 className="section-title">Featured Engineering Work</h2>
          <p className="section-desc">
            Production-ready backend services designed with clean architecture, defensive security, and scalable data models.
          </p>

          <div className="projects-showcase-grid">
            {techData.map((project) => (
              <div key={project.id} className="project-item-card">
                <div className="card-top-meta">
                  <span className="card-category-badge">{project.category}</span>
                  <span className="card-year">{project.badge}</span>
                </div>

                <h3 className="project-title">{project.name}</h3>
                <p className="project-desc">{project.summary}</p>

                {project.projects && project.projects[0]?.deepDive && (
                  <div className="project-deepdive-box">
                    <div className="dd-row">
                      <span className="dd-k challenge">CHALLENGE:</span>
                      <span style={{ color: '#94a3b8' }}>{project.projects[0].deepDive.challenge}</span>
                    </div>
                    <div className="dd-row">
                      <span className="dd-k solution">SOLUTION:</span>
                      <span style={{ color: '#94a3b8' }}>{project.projects[0].deepDive.solution}</span>
                    </div>
                    <div className="dd-row">
                      <span className="dd-k impact">IMPACT:</span>
                      <span style={{ color: '#94a3b8' }}>{project.projects[0].deepDive.impact}</span>
                    </div>
                  </div>
                )}

                <div className="project-tech-tags">
                  {project.stack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills Bento Grid */}
        <section id="skills" className="section-wrapper">
          <span className="section-tag">// TECHNICAL ARSENAL</span>
          <h2 className="section-title">Skills &amp; Technology Matrix</h2>
          <p className="section-desc">
            Technologies and tools deployed across production backends, container orchestration, and continuous integration pipelines.
          </p>

          <div className="bento-skills-grid">
            {/* Backend Core */}
            <div className="bento-card col-6">
              <h3 className="bento-card-title">Backend Architecture</h3>
              <div className="bento-card-subtitle">REST APIs, Authentication, Validation &amp; MVC Design</div>
              <div className="skill-pills-wrap">
                {skillsData.backend.map(s => (
                  <div key={s.name} className="skill-pill">
                    <span>{s.name}</span>
                    <span className="skill-level-tag">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DevOps & Cloud */}
            <div className="bento-card col-6">
              <h3 className="bento-card-title">DevOps &amp; Infrastructure</h3>
              <div className="bento-card-subtitle">Containerization, CI/CD Automation &amp; Linux Environments</div>
              <div className="skill-pills-wrap">
                {skillsData.devops.map(s => (
                  <div key={s.name} className="skill-pill">
                    <span>{s.name}</span>
                    <span className="skill-level-tag">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="bento-card col-6">
              <h3 className="bento-card-title">Database Engineering</h3>
              <div className="bento-card-subtitle">Document &amp; Relational Persistence, Modeling &amp; ORMs</div>
              <div className="skill-pills-wrap">
                {skillsData.databases.map(s => (
                  <div key={s.name} className="skill-pill">
                    <span>{s.name}</span>
                    <span className="skill-level-tag">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages & Workflow */}
            <div className="bento-card col-6">
              <h3 className="bento-card-title">Languages &amp; Tooling</h3>
              <div className="bento-card-subtitle">Programming, Scripting, Version Control &amp; Testing</div>
              <div className="skill-pills-wrap">
                {skillsData.languages.map(s => (
                  <div key={s.name} className="skill-pill">
                    <span>{s.name}</span>
                    <span className="skill-level-tag">{s.level}</span>
                  </div>
                ))}
                {skillsData.tools.map(s => (
                  <div key={s.name} className="skill-pill">
                    <span>{s.name}</span>
                    <span className="skill-level-tag">{s.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education & Open-Source Readiness */}
        <section id="about" className="section-wrapper">
          <span className="section-tag">// ACADEMICS &amp; ASPIRATIONS</span>
          <h2 className="section-title">Education &amp; Program Readiness</h2>

          <div className="edu-oss-card">
            <div className="edu-main">
              <h3>{personalInfo.education.degree}</h3>
              <p>{personalInfo.education.institution} • {personalInfo.education.affiliate}</p>
              <div className="edu-oss-badges">
                <span className="oss-program-tag">🎓 2nd Year ({personalInfo.education.period})</span>
                <span className="oss-program-tag">🌐 Open Source Programs: GSoC • LFX • Outreachy</span>
                <span className="oss-program-tag">🚀 Ready for Backend / Platform Internships</span>
              </div>
            </div>

            <button className="btn-nav-primary" onClick={() => { playClickSound(); setIsContactOpen(true); }}>
              Initiate Contact
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            © {new Date().getFullYear()} {personalInfo.name}. Engineered with precision.
          </div>

          <div className="footer-links">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`} className="footer-link">Email</a>
            <button className="footer-link" onClick={handlePrintResume} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
              Print Resume
            </button>
          </div>
        </div>
      </footer>

      {/* Contact Drawer / Modal */}
      {isContactOpen && (
        <div className="contact-modal-backdrop" onClick={() => setIsContactOpen(false)}>
          <div className="contact-modal-card" onClick={e => e.stopPropagation()}>
            <div className="contact-modal-header">
              <h3 className="contact-modal-title">Get in Touch with Rauneet</h3>
              <button className="modal-close-btn" onClick={() => setIsContactOpen(false)}>×</button>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '0.88rem', lineHeight: '1.5', marginBottom: '20px' }}>
              I am actively seeking <strong>Backend Developer</strong>, <strong>DevOps</strong>, and <strong>Platform Engineering</strong> internships and open-source opportunities.
            </p>

            <div className="contact-channels">
              <a href={`mailto:${personalInfo.email}`} className="contact-channel-item">
                <span className="channel-icon">✉</span>
                <div className="channel-info">
                  <span className="channel-label">Email</span>
                  <span className="channel-val">{personalInfo.email}</span>
                </div>
              </a>

              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                <span className="channel-icon">💼</span>
                <div className="channel-info">
                  <span className="channel-label">LinkedIn</span>
                  <span className="channel-val">linkedin.com/in/rauneet-singh-85369428b</span>
                </div>
              </a>

              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-channel-item">
                <span className="channel-icon">🐙</span>
                <div className="channel-info">
                  <span className="channel-label">GitHub</span>
                  <span className="channel-val">github.com/Rauneet-coder</span>
                </div>
              </a>

              <div className="contact-channel-item" style={{ cursor: 'default' }}>
                <span className="channel-icon">📍</span>
                <div className="channel-info">
                  <span className="channel-label">Location</span>
                  <span className="channel-val">{personalInfo.location}</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              <button className="btn-nav-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={copyEmail}>
                {copied ? '✔ Email Copied to Clipboard!' : '📋 Copy Direct Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

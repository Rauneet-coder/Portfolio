import React, { useState } from 'react';
import { personalInfo, skillsData } from '../data';
import { playClickSound, playSuccessSound } from '../utils/sound';
import './RecruiterQuickView.css';

const RecruiterQuickView = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    playClickSound();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    playSuccessSound();
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  return (
    <div className="recruiter-view-container">
      {/* Header Profile Card */}
      <div className="recruiter-header-card">
        <div className="recruiter-title-area">
          <span className="recruiter-role-badge">AVAILABLE FOR INTERNSHIPS &amp; OSS</span>
          <h2>{personalInfo.name}</h2>
          <div style={{ color: '#38bdf8', fontWeight: 600, fontSize: '1rem', marginBottom: '6px' }}>
            {personalInfo.title}
          </div>
          <div className="recruiter-location-text">
            <span>📍 {personalInfo.location}</span>
            <span>•</span>
            <span style={{ color: '#10b981' }}>Active Contributor to Jenkins Core</span>
          </div>
        </div>

        <div className="recruiter-actions">
          <button className="recruiter-btn primary" onClick={copyEmail}>
            {copied ? '✔ Email Copied!' : '📋 Copy Email'}
          </button>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn secondary"
          >
            LinkedIn
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="recruiter-btn secondary"
          >
            GitHub
          </a>
          <button className="recruiter-btn secondary" onClick={handlePrint} title="Print or save as PDF">
            🖨 Print / PDF
          </button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '10px', padding: '18px', marginBottom: '24px', lineHeight: '1.6' }}>
        <h3 style={{ fontSize: '0.95rem', color: '#f8fafc', margin: '0 0 8px 0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Executive Summary
        </h3>
        <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>
          {personalInfo.summary}
        </p>
      </div>

      {/* Flagship Achievements */}
      <h3 className="recruiter-section-title">⭐ Flagship Impact &amp; Contributions</h3>
      <div className="recruiter-cards-grid">
        <div className="recruiter-highlight-card">
          <span className="highlight-badge jenkins">Global Open Source</span>
          <div className="highlight-title">Jenkins Core Contributor (PR #26966)</div>
          <div className="highlight-desc">
            Fixed deprecated <code>window.event</code> handling causing silent UI failures across enterprise Jenkins CI/CD controllers. Passed complete multi-platform CI suite and merged to master.
          </div>
          <div className="highlight-tags">
            <span className="mini-tag">Jenkins</span>
            <span className="mini-tag">Java/JS</span>
            <span className="mini-tag">CI/CD</span>
            <span className="mini-tag">Merged</span>
          </div>
        </div>

        <div className="recruiter-highlight-card">
          <span className="highlight-badge auth">Production Architecture</span>
          <div className="highlight-title">Production Authentication Microservice</div>
          <div className="highlight-desc">
            Engineered hardened RESTful auth service featuring JWT bearer tokens, bcrypt hashing, Zod request schema validation, and brute-force rate-limiting defenses.
          </div>
          <div className="highlight-tags">
            <span className="mini-tag">Node.js</span>
            <span className="mini-tag">Express</span>
            <span className="mini-tag">MongoDB</span>
            <span className="mini-tag">Zod</span>
            <span className="mini-tag">JWT</span>
          </div>
        </div>

        <div className="recruiter-highlight-card">
          <span className="highlight-badge devops">DevOps &amp; Infrastructure</span>
          <div className="highlight-title">Containerized Pipelines &amp; Orchestration</div>
          <div className="highlight-desc">
            Automated multi-stage Docker builds reducing image sizes by 65%, with GitHub Actions CI workflows, automated testing, and Kubernetes rolling deployment specs.
          </div>
          <div className="highlight-tags">
            <span className="mini-tag">Docker</span>
            <span className="mini-tag">Kubernetes</span>
            <span className="mini-tag">Linux</span>
            <span className="mini-tag">GitHub Actions</span>
          </div>
        </div>
      </div>

      {/* Technical Skills Matrix */}
      <div className="skills-matrix-card">
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#f8fafc' }}>Technical Skills Matrix</h3>
        <div className="matrix-grid">
          <div className="matrix-col">
            <h4>Backend Core</h4>
            <ul className="matrix-list">
              {skillsData.backend.map(s => (
                <li key={s.name}><span>{s.name}</span><span className="matrix-level">{s.level}</span></li>
              ))}
            </ul>
          </div>

          <div className="matrix-col">
            <h4>DevOps &amp; Cloud</h4>
            <ul className="matrix-list">
              {skillsData.devops.map(s => (
                <li key={s.name}><span>{s.name}</span><span className="matrix-level">{s.level}</span></li>
              ))}
            </ul>
          </div>

          <div className="matrix-col">
            <h4>Databases</h4>
            <ul className="matrix-list">
              {skillsData.databases.map(s => (
                <li key={s.name}><span>{s.name}</span><span className="matrix-level">{s.level}</span></li>
              ))}
            </ul>
          </div>

          <div className="matrix-col">
            <h4>Languages &amp; Tools</h4>
            <ul className="matrix-list">
              {skillsData.languages.map(s => (
                <li key={s.name}><span>{s.name}</span><span className="matrix-level">{s.level}</span></li>
              ))}
              {skillsData.tools.map(s => (
                <li key={s.name}><span>{s.name}</span><span className="matrix-level">{s.level}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Education */}
      <div className="recruiter-edu-banner">
        <div>
          <strong style={{ color: '#f8fafc' }}>{personalInfo.education.degree}</strong>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            {personalInfo.education.institution} • {personalInfo.education.affiliate}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>{personalInfo.education.period}</span>
          <div style={{ color: '#10b981', fontSize: '0.8rem' }}>{personalInfo.education.status}</div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterQuickView;

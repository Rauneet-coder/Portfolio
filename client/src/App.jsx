import React, { useState, useEffect } from 'react';
import { techData, personalInfo } from './data';
import { playHoverSound, playClickSound, toggleSound, isSoundEnabled } from './utils/sound';

const DraggableWindow = React.lazy(() => import('./components/DraggableWindow'));
const BackgroundScene = React.lazy(() => import('./components/BackgroundScene'));
import BootSequence from './components/BootSequence';
import CustomCursor from './components/CustomCursor';
import SystemNotifications, { notify } from './components/SystemNotifications';

import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);
  const [hasBooted, setHasBooted] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleTheme = () => {
    playClickSound();
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleToggleSound = () => {
    const res = toggleSound();
    setSoundOn(res);
    if (res) playClickSound();
  };

  const handleTechClick = (tech) => {
    playClickSound();
    const isAlreadyOpen = openApps.find(app => app.id === tech.id);
    
    if (!isAlreadyOpen && openApps.length === 2) {
      notify('ACHIEVEMENT: Inspected multiple backend architectural tiers!', 'achievement');
    }

    if (isAlreadyOpen) {
      updateAppState(tech.id, { isMinimized: false });
      setActiveAppId(tech.id);
    } else {
      const newApp = { 
        ...tech, 
        instanceId: Date.now(), 
        isMinimized: false,
        isMaximized: false,
        activeTab: 'projects' 
      };
      setOpenApps([...openApps, newApp]);
      setActiveAppId(tech.id);
    }
  };

  const openAppById = (id, title, color) => {
    playClickSound();
    const isAlreadyOpen = openApps.find(app => app.id === id);
    if (isAlreadyOpen) {
        updateAppState(id, { isMinimized: false });
        setActiveAppId(id);
    } else {
        const customApp = {
            id,
            name: title,
            icon: id + '-icon', 
            color,
            isMinimized: false,
            isMaximized: false
        };
        setOpenApps([...openApps, customApp]);
        setActiveAppId(id);
        if (id === 'api-explorer') notify('TIP: Click "Send Request" to test live API responses.', 'info');
        if (id === 'pipeline') notify('TIP: Click "Trigger Pipeline Run" to simulate Jenkins CI/CD.', 'info');
    }
  };

  const openTerminal = () => openAppById('terminal', 'DevOps Terminal', '#33ff33');
  const openCommandCenter = () => openAppById('command-center', 'Cluster Telemetry', '#ffbd2e');
  const openSkillTree = () => openAppById('skill-tree', 'Skill Graph', '#00ff80');
  const openApiExplorer = () => openAppById('api-explorer', 'REST API Sandbox', '#2ea043');
  const openArchitecture = () => openAppById('architecture', 'System Blueprint', '#0284c7');
  const openPipeline = () => openAppById('pipeline', 'Jenkins CI/CD Pipeline', '#d33833');
  const openRecruiter = () => openAppById('recruiter', 'Recruiter Fast-Track', '#38bdf8');

  const handleClose = (appId) => {
    playClickSound();
    setOpenApps(openApps.filter(app => app.id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const handleMinimize = (e, appId) => {
    e.stopPropagation();
    playClickSound();
    updateAppState(appId, { isMinimized: true });
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const handleMaximize = (e, appId) => {
    if (e) e.stopPropagation();
    playClickSound();
    const app = openApps.find(a => a.id === appId);
    if (!app) return;
    updateAppState(appId, { isMaximized: !app.isMaximized, isMinimized: false });
    setActiveAppId(appId);
  };

  const handleDockClick = (appId) => {
    playClickSound();
    const app = openApps.find(a => a.id === appId);
    if (!app) return;

    if (app.isMinimized || activeAppId !== appId) {
      updateAppState(appId, { isMinimized: false });
      setActiveAppId(appId);
    } else {
      updateAppState(appId, { isMinimized: true });
      setActiveAppId(null);
    }
  };

  const updateAppState = (appId, updates) => {
    setOpenApps(prev => prev.map(app => 
      app.id === appId ? { ...app, ...updates } : app
    ));
  };
  
  // Scroll to Top Logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Close active window with Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        if (activeAppId) handleClose(activeAppId);
        if (isContactOpen) setIsContactOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeAppId, isContactOpen]);

  // Status Bar Logic
  const [time, setTime] = useState(new Date());
  const [cpuUsage, setCpuUsage] = useState(14);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(new Date()), 1000);
    const cpuInterval = setInterval(() => {
      setCpuUsage(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.5) * 8)));
    }, 2000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  return (
    <div className={`app-container ${theme === 'light' ? 'light-theme' : ''}`}>
      <CustomCursor theme={theme} />
      <SystemNotifications />
      {!hasBooted && <BootSequence onComplete={() => setHasBooted(true)} />}

      {/* 3D Interactive Background */}
      <React.Suspense fallback={<div className="scene-fallback" style={{ background: theme === 'light' ? '#f5f5f7' : '#050505', position: 'fixed', inset: 0, zIndex: -1 }} />}>
        <BackgroundScene theme={theme} cpuUsage={cpuUsage} />
      </React.Suspense>

      {/* Top Status Bar */}
      <header className="status-bar">
        <div className="status-left">
          <span className="status-name">{personalInfo.name}</span>
          <span className="status-item role-tag">Backend &amp; DevOps Engineer</span>
          <span className="status-item jenkins-tag">Jenkins Core PR #26966 (Merged)</span>
        </div>
        <div className="status-right">
          <div className="status-item cpu-monitor">
            <span style={{ fontSize: '0.8em', marginRight: '5px' }}>CPU</span>
            <div className="cpu-bar">
              <div className="cpu-fill" style={{ width: `${cpuUsage}%` }}></div>
            </div>
            <span style={{ fontSize: '0.8em', width: '30px', textAlign: 'right' }}>{Math.round(cpuUsage)}%</span>
          </div>

          <button className="sound-toggle-btn" onClick={handleToggleSound} title="Toggle Synthesizer Sound">
            {soundOn ? '🔊 Audio ON' : '🔇 Muted'}
          </button>

          <div className="status-item clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          <button className="theme-toggle-btn" onClick={openRecruiter} title="Open Recruiter Fast-Track Summary">
            👔 Recruiter Fast-Track
          </button>

          <button className="contact-btn" onClick={() => { playClickSound(); setIsContactOpen(true); }}>
            Contact
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`main-content ${activeAppId ? 'blur-background' : ''}`} style={{ paddingTop: '60px' }}>
        <header className="hero">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="hero-badge-row">
              <span className="hero-badge jenkins">★ Jenkins Core Contributor</span>
              <span className="hero-badge k8s">Kubernetes &amp; Docker</span>
              <span className="hero-badge auth">Hardened REST APIs</span>
            </div>

            <motion.h1 
              className="glitch" 
              data-text={personalInfo.name.toUpperCase()}
              initial={{ letterSpacing: "0.2em", filter: "blur(10px)" }}
              animate={{ letterSpacing: "0.05em", filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "anticipate" }}
            >
              {personalInfo.name.toUpperCase()}
            </motion.h1>

            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              BACKEND &amp; DEVOPS ENGINEER • PLATFORM ENGINEERING
            </motion.p>

            <p className="hero-description">
              Undergraduate engineer building production-ready REST APIs, microservice auth architectures, and containerized CI/CD systems. Merged core contribution into Jenkins Core.
            </p>

            {/* Quick Action Interactive Launchers */}
            <div className="hero-quick-launchers">
              <button className="launcher-btn api" onClick={openApiExplorer} onMouseEnter={playHoverSound}>
                <span className="btn-icon">⚡</span>
                <span>REST API Sandbox</span>
              </button>
              <button className="launcher-btn arch" onClick={openArchitecture} onMouseEnter={playHoverSound}>
                <span className="btn-icon">🏗️</span>
                <span>Architecture Blueprint</span>
              </button>
              <button className="launcher-btn pipeline" onClick={openPipeline} onMouseEnter={playHoverSound}>
                <span className="btn-icon">✓</span>
                <span>Jenkins CI/CD Pipeline</span>
              </button>
              <button className="launcher-btn term" onClick={openTerminal} onMouseEnter={playHoverSound}>
                <span className="btn-icon">&gt;_</span>
                <span>DevOps Terminal</span>
              </button>
            </div>

            <motion.div 
              className="status-line"
              initial={{ width: 0 }}
              animate={{ width: "fit-content" }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap', margin: '20px auto 0' }}
            >
              <span className="blink">_</span> CLUSTER: OPTIMAL • LATENCY: &lt;20MS • OPEN TO INTERNSHIPS
            </motion.div>
          </motion.div>
        </header>

        {/* Modules Section */}
        <section className="tech-grid-section">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            // PRODUCTION_SYSTEMS_&amp;_CONTRIBUTIONS
          </motion.h2>
          <motion.div 
            className="tech-grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 0.4
                }
              }
            }}
          >
            {techData.map((tech) => (
              <motion.button
                key={tech.id}
                className="tech-card"
                onClick={() => handleTechClick(tech)}
                onMouseEnter={playHoverSound}
                style={{ '--tech-color': tech.color }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8, y: 20 },
                  show: { 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.04, 
                  y: -5,
                  boxShadow: `0 0 24px -4px ${tech.color}` 
                }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="card-top-badge">{tech.badge}</div>
                <div className="tech-info" style={{ marginTop: '8px' }}>
                  <h3>{tech.name}</h3>
                  <span className="tech-role">{tech.role}</span>
                  <p className="card-desc">{tech.summary}</p>
                </div>
                <div className="card-explore-hint">Click to inspect architectural specs →</div>
                <div className="card-border"></div>
              </motion.button>
            ))}
          </motion.div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} {personalInfo.name} • Backend &amp; DevOps Engineering</p>
        </footer>
      </main>

      {/* Dock System */}
      <div className="dock-wrapper">
        <div className="dock">
          {/* Always available launchers */}
          <div className="dock-item" onClick={openRecruiter} title="Recruiter Fast-Track">
            <span style={{ fontSize: '1.2rem' }}>👔</span>
            <span className="dock-label">Recruiter</span>
          </div>
          <div className="dock-item" onClick={openApiExplorer} title="REST API Sandbox">
            <span style={{ fontSize: '1.2rem' }}>⚡</span>
            <span className="dock-label">API Sandbox</span>
          </div>
          <div className="dock-item" onClick={openArchitecture} title="System Architecture">
            <span style={{ fontSize: '1.2rem' }}>🏗️</span>
            <span className="dock-label">Architecture</span>
          </div>
          <div className="dock-item" onClick={openPipeline} title="Jenkins CI/CD Pipeline">
            <span style={{ fontSize: '1.2rem' }}>✓</span>
            <span className="dock-label">CI/CD</span>
          </div>
          <div className="dock-item" onClick={openTerminal} title="DevOps Terminal">
            <span style={{ fontSize: '1.2rem' }}>&gt;_</span>
            <span className="dock-label">Terminal</span>
          </div>
          <div className="dock-item" onClick={openCommandCenter} title="Cluster Telemetry">
            <span style={{ fontSize: '1.2rem' }}>📊</span>
            <span className="dock-label">Telemetry</span>
          </div>
          <div className="dock-item" onClick={openSkillTree} title="Skill Graph">
            <span style={{ fontSize: '1.2rem' }}>🕸️</span>
            <span className="dock-label">Skills</span>
          </div>
        </div>
      </div>

      {/* Windows Layer */}
      <React.Suspense fallback={null}>
        {openApps.map((app) => (
          <DraggableWindow 
              key={app.id}
              app={app}
              activeAppId={activeAppId}
              setActiveAppId={setActiveAppId}
              handleClose={handleClose}
              handleMinimize={handleMinimize}
              handleMaximize={handleMaximize}
              openTerminal={openTerminal}
              updateAppState={updateAppState}
              techData={techData}
          />
        ))}
      </React.Suspense>

      {/* Contact Modal */}
      {isContactOpen && (
        <div className="modal-overlay" onClick={() => setIsContactOpen(false)}>
          <div className="contact-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>// INITIALIZE_COMMUNICATIONS</h3>
              <button className="close-btn" onClick={() => { playClickSound(); setIsContactOpen(false); }}>×</button>
            </div>
            <div className="modal-body">
              <p className="terminal-text">
                &gt; Systems ready.<br/>
                &gt; Candidate open to Backend / DevOps / Platform Engineering roles.
              </p>
              
              <div className="contact-grid">
                <a href={`mailto:${personalInfo.email}`} className="contact-item">
                  <span className="icon">✉</span>
                  <div className="info">
                    <span className="label">Direct Email</span>
                    <span className="value">{personalInfo.email}</span>
                  </div>
                </a>
                
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">🐙</span>
                  <div className="info">
                    <span className="label">GitHub</span>
                    <span className="value">@Rauneet-coder</span>
                  </div>
                </a>
 
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">💼</span>
                  <div className="info">
                    <span className="label">LinkedIn</span>
                    <span className="value">linkedin.com/in/rauneet-singh-85369428b</span>
                  </div>
                </a>

                <div className="contact-item" style={{ cursor: 'default' }}>
                  <span className="icon">📍</span>
                  <div className="info">
                    <span className="label">Location &amp; Availability</span>
                    <span className="value">{personalInfo.location} • GSoC / LFX Ready</span>
                  </div>
                </div>
              </div>
 
              <div className="modal-footer">
                <div className="status-indicator online"></div>
                <span>Direct Dispatch Active</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top-btn"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Scroll to Top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

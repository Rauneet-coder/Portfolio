
import React, { useState, useEffect } from 'react';
import { techData } from './data';
const Terminal = React.lazy(() => import('./Terminal'));
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

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'
  const [showScrollTop, setShowScrollTop] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleTechClick = (tech) => {
    // Check if already open
    const isAlreadyOpen = openApps.find(app => app.id === tech.id);
    
    // Notification achievement!
    if (!openApps.find(app => app.id === tech.id) && openApps.length === 2) {
      notify('ACHIEVEMENT: User explored multiple project modules!', 'achievement');
    }

    if (isAlreadyOpen) {
      // Bring to front and unminimize
      updateAppState(tech.id, { isMinimized: false });
      setActiveAppId(tech.id);
    } else {
      // Add new app
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
        if (id === 'skill-tree') notify('TIP: Zoom and drag the nodes to explore.', 'info');
    }
  };

  const openTerminal = () => openAppById('terminal', 'Terminal', '#33ff33');
  const openCommandCenter = () => openAppById('command-center', 'Command Center', '#ffbd2e');
  const openSkillTree = () => openAppById('skill-tree', 'Skill Tree', '#00ff80');

  const handleClose = (appId) => {
    setOpenApps(openApps.filter(app => app.id !== appId));
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const handleMinimize = (e, appId) => {
    e.stopPropagation();
    updateAppState(appId, { isMinimized: true });
    if (activeAppId === appId) {
      setActiveAppId(null);
    }
  };

  const handleMaximize = (e, appId) => {
    if (e) e.stopPropagation();
    const app = openApps.find(a => a.id === appId);
    if (!app) return;
    updateAppState(appId, { isMaximized: !app.isMaximized, isMinimized: false });
    setActiveAppId(appId);
  };

  const handleDockClick = (appId) => {
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
  const [cpuUsage, setCpuUsage] = useState(12);

  useEffect(() => {
    const timeInterval = setInterval(() => setTime(new Date()), 1000);
    const cpuInterval = setInterval(() => {
      setCpuUsage(prev => Math.min(100, Math.max(5, prev + (Math.random() - 0.5) * 10)));
    }, 2000);
    return () => {
      clearInterval(timeInterval);
      clearInterval(cpuInterval);
    };
  }, []);

  const playHoverSound = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.volume = 0.2;
    audio.play().catch(e => {
        // Audio might fail if user hasn't interacted with document yet
        // silently ignore or log
    });
  };

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
          <span className="status-name">Rauneet Singh</span>
          <span className="status-item" style={{ fontSize: '0.8em', opacity: 0.8 }}>Backend & DevOps</span>
        </div>
        <div className="status-right">
          <div className="status-item cpu-monitor">
            <span style={{ fontSize: '0.8em', marginRight: '5px' }}>CPU</span>
            <div className="cpu-bar">
              <div className="cpu-fill" style={{ width: `${cpuUsage}%` }}></div>
            </div>
            <span style={{ fontSize: '0.8em', width: '30px', textAlign: 'right' }}>{Math.round(cpuUsage)}%</span>
          </div>
          <div className="status-item clock">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Recruiter Mode">
            {theme === 'dark' ? '👨‍💼 Recruiter Mode' : '💻 Developer Mode'}
          </button>

          {/* Toggle contact modal on click */}
          <button className="contact-btn" onClick={() => setIsContactOpen(true)}>
            Contact
          </button>
        </div>
      </header>

      {/* Main Content - Only blur if there is an active, non-minimized window */}
      <main className={`main-content ${activeAppId ? 'blur-background' : ''}`} style={{ paddingTop: '60px' }}>
        <header className="hero">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1 
              className="glitch" 
              data-text="RAUNEET SINGH"
              initial={{ letterSpacing: "0.2em", filter: "blur(10px)" }}
              animate={{ letterSpacing: "0.05em", filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: "anticipate" }}
            >
              RAUNEET SINGH
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              BACKEND & DEVOPS ENGINEER
            </motion.p>
            <motion.div 
              className="status-line"
              initial={{ width: 0 }}
              animate={{ width: "fit-content" }}
              transition={{ delay: 1, duration: 0.8 }}
              style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              <span className="blink">_</span> SYSTEM: ONLINE
            </motion.div>
          </motion.div>
        </header>

        <section className="tech-grid-section">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            // SELECT_MODULE
          </motion.h2>
          <motion.div 
            className="tech-grid"
            initial="hidden"
            animate="show" // Changed from whileInView to animate for sequential load
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { 
                  staggerChildren: 0.15,
                  delayChildren: 1.8 // Wait for Hero animation to complete
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
                  scale: 1.05, 
                  y: -5,
                  boxShadow: `0 0 20px -5px ${tech.color}` 
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="tech-icon-container">
                  <img src={tech.icon} alt={tech.name} className="tech-icon" onError={(e) => {e.target.style.display='none'}} />
                  <span className="tech-initial" style={{display: 'none'}}>{tech.name[0]}</span>
                </div>
                <div className="tech-info">
                  <h3>{tech.name}</h3>
                  <span className="tech-role">{tech.role || "Technology"}</span>
                </div>
                <div className="card-border"></div>
              </motion.button>
            ))}
          </motion.div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Rauneet Singh. Designed for Excellence.</p>
        </footer>
      </main>

      {/* Dock System */}
      <div className="dock-wrapper">
        <div className="dock">
          {openApps.map((app) => (
            <div 
              key={app.id}
              className={`dock-item ${activeAppId === app.id && !app.isMinimized ? 'active' : ''}`} 
              onClick={() => handleDockClick(app.id)}
              title={app.name}
            >
               {app.icon === 'terminal-icon' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <polyline points="4 17 10 11 4 5"></polyline>
                      <line x1="12" y1="19" x2="20" y2="19"></line>
                   </svg>
               ) : app.icon === 'command-center-icon' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
               ) : app.icon === 'skill-tree-icon' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <circle cx="18" cy="18" r="3"></circle>
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="18" cy="6" r="3"></circle>
                      <path d="M15.4 15.4l-6.8-6.8"></path>
                    </svg>
               ) : (
                   <img src={app.icon} alt={app.name} className="dock-icon" />
               )}
               {!app.isMinimized && <div className="dock-dot"></div>}
            </div>
          ))}
           {/* Always show custom launchers in dock if not open */}
           {!openApps.find(a => a.id === 'skill-tree') && (
               <div className="dock-item" onClick={openSkillTree} title="Skill Tree">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <circle cx="18" cy="18" r="3"></circle>
                      <circle cx="6" cy="6" r="3"></circle>
                      <circle cx="18" cy="6" r="3"></circle>
                      <path d="M15.4 15.4l-6.8-6.8"></path>
                    </svg>
               </div>
           )}
           {!openApps.find(a => a.id === 'command-center') && (
               <div className="dock-item" onClick={openCommandCenter} title="Command Center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
               </div>
           )}
           {!openApps.find(a => a.id === 'terminal') && (
               <div className="dock-item" onClick={openTerminal} title="Open Terminal">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dock-icon">
                      <polyline points="4 17 10 11 4 5"></polyline>
                      <line x1="12" y1="19" x2="20" y2="19"></line>
                   </svg>
               </div>
           )}
        </div>
      </div>

      {/* Windows Layer */}
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
              <h3>// INITIALIZE_Comms</h3>
              <button className="close-btn" onClick={() => setIsContactOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <p className="terminal-text">
                &gt; Systems ready.<br/>
                &gt; Select communication channel...
              </p>
              
              <div className="contact-grid">
                <a href="mailto:contact@rauneet.dev" className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#EA4335"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                  </span>
                  <div className="info">
                    <span className="label">Email</span>
                    <span className="value">rauneetsingh1903@gmail.com</span>
                  </div>
                </a>
                
                <a href="https://github.com/Rauneet-coder" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                  </span>
                  <div className="info">
                    <span className="label">GitHub</span>
                    <span className="value">@Rauneet-coder</span>
                  </div>
                </a>
 
                <a href="https://www.linkedin.com/in/rauneet-singh-85369428b/singh" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </span>
                  <div className="info">
                    <span className="label">LinkedIn</span>
                    <span className="value">Rauneet Singh</span>
                  </div>
                </a>
              </div>
 
              <div className="modal-footer">
                <div className="status-indicator online"></div>
                <span>Transmission Secure</span>
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

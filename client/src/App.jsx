
import React, { useState, useEffect } from 'react';
import { techData } from './data';
import './App.css';

function App() {
  const [openApps, setOpenApps] = useState([]);
  const [activeAppId, setActiveAppId] = useState(null);

  const handleTechClick = (tech) => {
    // Check if already open
    const isAlreadyOpen = openApps.find(app => app.id === tech.id);
    
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
        activeTab: 'projects' 
      };
      setOpenApps([...openApps, newApp]);
      setActiveAppId(tech.id);
    }
  };

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
  
  // Close active window with Escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && activeAppId) {
        handleClose(activeAppId);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [activeAppId]); // Depend on activeAppId

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
    <div className="app-container">
      {/* Background Elements */}
      <div className="bg-grid"></div>
      <div className="bg-glow"></div>

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
          <button className="contact-btn" onClick={() => window.location.href = 'mailto:contact@rauneet.dev'}>
            Contact
          </button>
        </div>
      </header>

      {/* Main Content - Only blur if there is an active, non-minimized window */}
      <main className={`main-content ${activeAppId ? 'blur-background' : ''}`} style={{ paddingTop: '60px' }}>
        <header className="hero">
          <div className="hero-content">
            <h1 className="glitch" data-text="RAUNEET SINGH">RAUNEET SINGH</h1>
            <p className="subtitle">BACKEND & DEVOPS ENGINEER</p>
            <div className="status-line">
              <span className="blink">_</span> SYSTEM: ONLINE
            </div>
          </div>
        </header>

        <section className="tech-grid-section">
          <h2>// SELECT_MODULE</h2>
          <div className="tech-grid">
            {techData.map((tech) => (
              <button
                key={tech.id}
                className="tech-card"
                onClick={() => handleTechClick(tech)}
                onMouseEnter={playHoverSound}
                style={{ '--tech-color': tech.color }}
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
              </button>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>© 2026 Rauneet Singh. Built with React.</p>
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
               <img src={app.icon} alt={app.name} className="dock-icon" />
               {!app.isMinimized && <div className="dock-dot"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Windows Layer */}
      {openApps.map((app) => (
        <div 
          key={app.id}
          className={`window-overlay ${!app.isMinimized ? 'open' : 'minimized'}`} 
          style={{ zIndex: activeAppId === app.id ? 100 : 10 }}
          onClick={(e) => {
             // If clicking overlay (background), close window
             if (e.target.className.includes('window-overlay')) handleClose(app.id);
          }}
        >
          {/* Only render content if reasonable to avoid heavy DOM when minimized? 
              Actually better to keep it for animation consistency usually, but hiding helps performance.
              We keep it rendered for the shrink animation to work from CSS transform.
          */}
          <div className="window-container" style={{ '--accent-color': app.color }}>
            <div className="window-header" onClick={() => setActiveAppId(app.id)}>
              <div className="window-controls">
                <span className="control close" onClick={(e) => { e.stopPropagation(); handleClose(app.id); }}></span>
                <span className="control minimize" onClick={(e) => handleMinimize(e, app.id)}></span>
                <span className="control maximize"></span>
              </div>
              <div className="window-title">
                {app.name} — Preview Mode
              </div>
              <div className="window-actions">
                 <span>▼</span>
              </div>
            </div>

            <div className="window-body">
              <div className="window-sidebar">
                <div className="sidebar-header">
                  <img src={app.icon} alt={app.name} className="sidebar-icon" />
                  <h4>{app.name}</h4>
                </div>
                <nav className="window-nav">
                  <button 
                    className={`nav-item ${app.activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => updateAppState(app.id, { activeTab: 'projects' })}
                  >
                    Video Previews
                  </button>
                  <button 
                    className={`nav-item ${app.activeTab === 'journey' ? 'active' : ''}`}
                    onClick={() => updateAppState(app.id, { activeTab: 'journey' })}
                  >
                    Documentary
                  </button>
                  <button 
                    className={`nav-item ${app.activeTab === 'stack' ? 'active' : ''}`}
                    onClick={() => updateAppState(app.id, { activeTab: 'stack' })}
                  >
                    Languages Learned
                  </button>
                  <button 
                    className={`nav-item ${app.activeTab === 'learning' ? 'active' : ''}`}
                    onClick={() => updateAppState(app.id, { activeTab: 'learning' })}
                  >
                    Currently Learning
                  </button>
                </nav>
                <div className="sidebar-footer">
                  <p>v1.0.0</p>
                </div>
              </div>

              <div className="window-content">
                {app.activeTab === 'projects' && (
                  <div className="tab-content projects-view fade-in">
                    <div className="content-header">
                      <h3>// VIDEO_PREVIEWS</h3>
                      <p>Running instances of {app.name} projects.</p>
                    </div>
                    <div className="projects-grid">
                      {app.projects.map((project, idx) => (
                        <div key={idx} className="project-card">
                          <div className="video-container">
                            <div className="video-overlay">► PLAY PREVIEW</div>
                            <img src={project.video} alt={project.title} className="project-video-placeholder" />
                          </div>
                          <div className="project-details">
                            <h4>{project.title}</h4>
                            <p>{project.desc}</p>
                            <div className="tags">
                              {project.tech && project.tech.map(t => <span key={t} className="tag">{t}</span>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {app.activeTab === 'journey' && (
                   <div className="tab-content journey-view fade-in">
                      <div className="content-header">
                      <h3>// DOCUMENTATION_LOG</h3>
                      <p>Timeline of {app.name} mastery.</p>
                    </div>
                    <div className="timeline">
                      {app.journey.map((item, idx) => (
                        <div key={idx} className="timeline-item">
                          <div className="timeline-date">{item.date}</div>
                          <div className="timeline-content">
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                   </div>
                )}

                {app.activeTab === 'stack' && (
                  <div className="tab-content stack-view fade-in">
                    <div className="content-header">
                      <h3>// LANGUAGES_LEARNED</h3>
                      <p>Core technologies and tools in my {app.name} arsenal.</p>
                    </div>
                    <div className="tech-stack-grid">
                      {app.stack ? app.stack.map((item, idx) => (
                        <div key={idx} className="stack-item">
                          {item}
                        </div>
                      )) : <p>No specific languages listed.</p>}
                    </div>
                  </div>
                )}

                {app.activeTab === 'learning' && (
                  <div className="tab-content learning-view fade-in">
                     <div className="content-header">
                      <h3>// CURRENTLY_LEARNING</h3>
                      <p>Future-proofing skills and technologies I am actively exploring.</p>
                    </div>
                    <div className="learning-list">
                      {app.learning ? app.learning.map((item, idx) => (
                        <div key={idx} className="learning-item">
                          <h4>{item}</h4>
                          <p>Expanding knowledge base to include {item} patterns and best practices.</p>
                          <span className="learning-status">IN PROGRESS</span>
                        </div>
                      )) : <p>Open to new technologies.</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;

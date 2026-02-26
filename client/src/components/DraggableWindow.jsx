import React, { lazy, Suspense } from 'react';
import { Rnd } from 'react-rnd';
import Terminal from '../Terminal';

const CommandCenter = lazy(() => import('./CommandCenter'));
const SkillTree = lazy(() => import('./SkillTree'));

const DraggableWindow = ({ app, activeAppId, setActiveAppId, handleClose, handleMinimize, handleMaximize, updateAppState }) => {
    
    // Center the window on the screen by default
    const initialX = typeof window !== 'undefined' ? (window.innerWidth - 900) / 2 + (Math.random() * 40 - 20) : 50;
    const initialY = typeof window !== 'undefined' ? (window.innerHeight - 600) / 2 + (Math.random() * 40 - 20) : 50;

    return (
        <Rnd
            size={app.isMaximized ? {
                width: '100vw',
                height: 'calc(100vh - 32px)'
            } : undefined}
            position={app.isMaximized ? { x: 0, y: 32 } : undefined}
            maxWidth={app.isMaximized ? '100vw' : undefined}
            maxHeight={app.isMaximized ? 'calc(100vh - 32px)' : undefined}
            default={{
                x: initialX,
                y: initialY,
                width: 900,
                height: 600,
            }}
            disableDragging={app.isMaximized}
            enableResizing={!app.isMaximized}
            minWidth={320}
            minHeight={200}
            bounds="window"
            dragHandleClassName="window-header"
            onDragStart={() => setActiveAppId(app.id)}
            onResizeStart={() => setActiveAppId(app.id)}
            onDrag={(e, d) => {
                // If updateAppState supports updating transient state, or we pass a callback for global dragging
                if (typeof window !== 'undefined') {
                    // Dispatch a custom event for the 3D scene to pick up without heavy re-renders
                    const dragEvent = new CustomEvent('window-drag', { detail: { x: d.x, y: d.y, id: app.id } });
                    window.dispatchEvent(dragEvent);
                }
            }}
            style={{
                zIndex: activeAppId === app.id ? 2000 : 1000,
                display: app.isMinimized ? 'none' : 'flex',
                position: 'fixed'
            }}
            className={`window-wrapper ${!app.isMinimized ? 'open' : 'minimized'} ${app.isMaximized ? 'maximized' : ''}`}
            onClick={() => setActiveAppId(app.id)}
        >
            <div
                className={`window-container ${app.isMinimized ? 'minimized-window' : ''} ${app.isMaximized ? 'maximized' : ''}`}
                style={{
                    '--accent-color': app.id === 'terminal' ? '#33ff33' : app.color,
                    background: 'var(--window-bg)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    alignItems: 'stretch'
                }}
            >
                <div className="window-header">
                    <div className="window-controls">
                        <span className="control close" onClick={(e) => { e.stopPropagation(); handleClose(app.id); }}></span>
                        <span className="control minimize" onClick={(e) => handleMinimize(e, app.id)}></span>
                        <span className="control maximize" onClick={(e) => handleMaximize(e, app.id)}></span>
                    </div>
                    <div className="window-title">
                        {app.id === 'terminal' ? 'visitor@rauneet-dev: ~' : 
                         app.id === 'command-center' ? 'root@TELEMETRY' :
                         app.id === 'skill-tree' ? 'root@NEURAL_NET' :
                         `${app.name} — Preview Mode`}
                    </div>
                    <div className="window-actions">
                        <span>▼</span>
                    </div>
                </div>

                {app.id === 'terminal' ? (
                    <Terminal onClose={() => handleClose(app.id)} isMinimized={app.isMinimized} />
                ) : app.id === 'command-center' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Loading Telemetry...</div>}>
                        <CommandCenter />
                    </Suspense>
                ) : app.id === 'skill-tree' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Loading Neural Pathways...</div>}>
                        <SkillTree />
                    </Suspense>
                ) : (
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
                                        {app.projects && app.projects.map((project, idx) => (
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

                                                    {project.deepDive && (
                                                        <div className="deep-dive-section">
                                                            <div className="deep-dive-item">
                                                                <span className="dd-label">Challenge:</span>
                                                                <span className="dd-value">{project.deepDive.challenge}</span>
                                                            </div>
                                                            <div className="deep-dive-item">
                                                                <span className="dd-label">Solution:</span>
                                                                <span className="dd-value">{project.deepDive.solution}</span>
                                                            </div>
                                                            <div className="deep-dive-item">
                                                                <span className="dd-label">Impact:</span>
                                                                <span className="dd-value">{project.deepDive.impact}</span>
                                                            </div>
                                                        </div>
                                                    )}
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
                                        {app.journey && app.journey.map((item, idx) => (
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
                )}
            </div>
        </Rnd>
    );
};

export default DraggableWindow;

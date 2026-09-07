import React, { lazy, Suspense } from 'react';
import { Rnd } from 'react-rnd';
import Terminal from '../Terminal';

const CommandCenter = lazy(() => import('./CommandCenter'));
const SkillTree = lazy(() => import('./SkillTree'));
const ApiExplorer = lazy(() => import('./ApiExplorer'));
const SystemArchitecture = lazy(() => import('./SystemArchitecture'));
const PipelineVisualizer = lazy(() => import('./PipelineVisualizer'));
const RecruiterQuickView = lazy(() => import('./RecruiterQuickView'));

const DraggableWindow = ({ app, activeAppId, setActiveAppId, handleClose, handleMinimize, handleMaximize, updateAppState }) => {
    
    // Center the window on the screen by default
    const initialX = typeof window !== 'undefined' ? (window.innerWidth - 920) / 2 + (Math.random() * 40 - 20) : 50;
    const initialY = typeof window !== 'undefined' ? (window.innerHeight - 620) / 2 + (Math.random() * 40 - 20) : 50;

    return (
        <Rnd
            size={app.isMaximized ? {
                width: '100%',
                height: 'calc(100vh - 32px)'
            } : undefined}
            position={app.isMaximized ? { x: 0, y: 32 } : undefined}
            maxWidth={app.isMaximized ? '100%' : undefined}
            maxHeight={app.isMaximized ? 'calc(100vh - 32px)' : undefined}
            default={{
                x: Math.max(20, initialX),
                y: Math.max(40, initialY),
                width: 920,
                height: 620,
            }}
            disableDragging={app.isMaximized}
            enableResizing={!app.isMaximized}
            minWidth={340}
            minHeight={240}
            bounds="window"
            dragHandleClassName="window-header"
            onDragStart={() => setActiveAppId(app.id)}
            onResizeStart={() => setActiveAppId(app.id)}
            onDrag={(e, d) => {
                if (typeof window !== 'undefined') {
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
                    '--accent-color': app.id === 'terminal' ? '#33ff33' : app.color || '#38bdf8',
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
                        {app.id === 'terminal' ? 'visitor@rauneet-dev: ~ (Linux CLI)' : 
                         app.id === 'command-center' ? 'root@TELEMETRY — DevOps Cluster Observability' :
                         app.id === 'skill-tree' ? 'root@SKILL_GRAPH — Interactive Technical Map' :
                         app.id === 'api-explorer' ? 'api-tester@POSTMAN — Live REST API Sandbox' :
                         app.id === 'architecture' ? 'arch@BLUEPRINT — Microservices & Traffic Topology' :
                         app.id === 'pipeline' ? 'jenkins@CI-CD — Automated Delivery Pipeline' :
                         app.id === 'recruiter' ? 'recruiter@FAST-TRACK — Candidate Profile & Resume' :
                         `${app.name} — Architecture & Specs`}
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
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Loading Skill Graph...</div>}>
                        <SkillTree />
                    </Suspense>
                ) : app.id === 'api-explorer' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Booting API Sandbox...</div>}>
                        <ApiExplorer />
                    </Suspense>
                ) : app.id === 'architecture' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Generating Architecture Blueprint...</div>}>
                        <SystemArchitecture />
                    </Suspense>
                ) : app.id === 'pipeline' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Mounting CI/CD Pipeline...</div>}>
                        <PipelineVisualizer />
                    </Suspense>
                ) : app.id === 'recruiter' ? (
                    <Suspense fallback={<div style={{padding:'2rem', color:'#fff'}}>Loading Recruiter Fast-Track Profile...</div>}>
                        <RecruiterQuickView />
                    </Suspense>
                ) : (
                    <div className="window-body">
                        <div className="window-sidebar">
                            <div className="sidebar-header">
                                <div style={{ width: '32px', height: '32px', background: app.color, borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff' }}>
                                    {app.name[0]}
                                </div>
                                <div style={{ overflow: 'hidden' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#f8fafc', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{app.name}</h4>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{app.role}</span>
                                </div>
                            </div>
                            <nav className="window-nav">
                                <button
                                    className={`nav-item ${app.activeTab === 'projects' ? 'active' : ''}`}
                                    onClick={() => updateAppState(app.id, { activeTab: 'projects' })}
                                >
                                    Production Specs
                                </button>
                                <button
                                    className={`nav-item ${app.activeTab === 'journey' ? 'active' : ''}`}
                                    onClick={() => updateAppState(app.id, { activeTab: 'journey' })}
                                >
                                    Engineering Log
                                </button>
                                <button
                                    className={`nav-item ${app.activeTab === 'stack' ? 'active' : ''}`}
                                    onClick={() => updateAppState(app.id, { activeTab: 'stack' })}
                                >
                                    Stack &amp; Tools
                                </button>
                                <button
                                    className={`nav-item ${app.activeTab === 'learning' ? 'active' : ''}`}
                                    onClick={() => updateAppState(app.id, { activeTab: 'learning' })}
                                >
                                    Roadmap
                                </button>
                            </nav>
                            <div className="sidebar-footer">
                                <p>{app.badge || 'PRODUCTION READY'}</p>
                            </div>
                        </div>

                        <div className="window-content">
                            {app.activeTab === 'projects' && (
                                <div className="tab-content projects-view fade-in">
                                    <div className="content-header">
                                        <h3>// PRODUCTION_SPECIFICATION</h3>
                                        <p>{app.summary || `Technical overview of ${app.name}`}</p>
                                    </div>
                                    <div className="projects-grid">
                                        {app.projects && app.projects.map((project, idx) => (
                                            <div key={idx} className="project-card">
                                                <div className="project-header-bar" style={{ background: '#161b22', padding: '12px 16px', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <div style={{ fontWeight: 700, color: '#f0f6fc', fontSize: '0.9rem' }}>
                                                        {project.title}
                                                    </div>
                                                    {project.repoUrl && (
                                                        <a
                                                            href={project.repoUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style={{ background: '#238636', color: '#fff', fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', textDecoration: 'none', fontWeight: 600 }}
                                                        >
                                                            View PR on GitHub ↗
                                                        </a>
                                                    )}
                                                </div>
                                                <div className="project-details" style={{ padding: '16px' }}>
                                                    <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: '1.5', marginTop: 0 }}>
                                                        {project.desc}
                                                    </p>
                                                    <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', margin: '12px 0' }}>
                                                        {project.tech && project.tech.map(t => (
                                                            <span key={t} className="tag" style={{ background: '#1f293d', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontFamily: 'monospace' }}>
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>

                                                    {project.deepDive && (
                                                        <div className="deep-dive-section" style={{ background: '#090d13', border: '1px solid #1f2937', borderRadius: '6px', padding: '12px', marginTop: '12px' }}>
                                                            <div className="deep-dive-item" style={{ marginBottom: '8px' }}>
                                                                <span className="dd-label" style={{ color: '#f87171', fontWeight: 600, fontSize: '0.75rem', marginRight: '6px' }}>CHALLENGE:</span>
                                                                <span className="dd-value" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{project.deepDive.challenge}</span>
                                                            </div>
                                                            <div className="deep-dive-item" style={{ marginBottom: '8px' }}>
                                                                <span className="dd-label" style={{ color: '#38bdf8', fontWeight: 600, fontSize: '0.75rem', marginRight: '6px' }}>SOLUTION:</span>
                                                                <span className="dd-value" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{project.deepDive.solution}</span>
                                                            </div>
                                                            <div className="deep-dive-item">
                                                                <span className="dd-label" style={{ color: '#34d399', fontWeight: 600, fontSize: '0.75rem', marginRight: '6px' }}>IMPACT:</span>
                                                                <span className="dd-value" style={{ color: '#94a3b8', fontSize: '0.78rem' }}>{project.deepDive.impact}</span>
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
                                        <h3>// ARCHITECTURAL_TIMELINE</h3>
                                        <p>Engineering milestones in {app.name}.</p>
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
                                        <h3>// PRODUCTION_STACK</h3>
                                        <p>Core technologies deployed in {app.name}.</p>
                                    </div>
                                    <div className="tech-stack-grid">
                                        {app.stack ? app.stack.map((item, idx) => (
                                            <div key={idx} className="stack-item">
                                                {item}
                                            </div>
                                        )) : <p>No specific items listed.</p>}
                                    </div>
                                </div>
                            )}

                            {app.activeTab === 'learning' && (
                                <div className="tab-content learning-view fade-in">
                                    <div className="content-header">
                                        <h3>// ROADMAP_&amp;_EXPLORATION</h3>
                                        <p>Expanding backend depth and infrastructure horizons.</p>
                                    </div>
                                    <div className="learning-list">
                                        {app.learning ? app.learning.map((item, idx) => (
                                            <div key={idx} className="learning-item">
                                                <h4>{item}</h4>
                                                <p>Implementing production patterns for {item}.</p>
                                                <span className="learning-status">IN PROGRESS</span>
                                            </div>
                                        )) : <p>Open to emerging technologies.</p>}
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

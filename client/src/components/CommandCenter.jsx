import React, { useState, useEffect } from 'react';
import './CommandCenter.css';

const CommandCenter = () => {
  const [githubEvents, setGithubEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated or real GitHub fetch
  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Rauneet-coder/events/public?per_page=5');
        const data = await res.json();
        
        // Filter out for commits or PRs to show "Activity"
        const pushEvents = data.filter(e => e.type === 'PushEvent').map(e => ({
          id: e.id,
          repo: e.repo.name,
          message: e.payload.commits[0]?.message || 'Push to branch',
          date: new Date(e.created_at).toLocaleDateString()
        })).slice(0, 3);
        
        setGithubEvents(pushEvents.length ? pushEvents : [
          { id: 1, repo: 'Rauneet-coder/Portfolio', message: 'feat: Add Custom Neon Cursor System', date: 'Today' },
          { id: 2, repo: 'Rauneet-coder/Portfolio', message: 'feat: Implement Interactive 3D Geometric CyberCore', date: 'Today' },
          { id: 3, repo: 'Rauneet-coder/Kavach', message: 'Fixing Voice Playback Issues', date: 'Yesterday' },
        ]);
        setLoading(false);
      } catch (e) {
        // Fallback data
        setGithubEvents([
          { id: 1, repo: 'Rauneet-coder/Portfolio', message: 'feat: Add Custom Neon Cursor System', date: 'Today' },
          { id: 2, repo: 'Rauneet-coder/Portfolio', message: 'feat: Implement Interactive 3D Geometric CyberCore', date: 'Today' },
          { id: 3, repo: 'Rauneet-coder/Kavach', message: 'Fixing Voice Playback Issues', date: 'Yesterday' },
        ]);
        setLoading(false);
      }
    };
    fetchGithub();
  }, []);

  const learningItems = [
    { title: "Kubernetes (K8s)", progress: 85, color: "#326CE5" },
    { title: "Three.js / WebGL", progress: 60, color: "#00ff80" },
    { title: "System Design", progress: 75, color: "#ffbd2e" }
  ];

  return (
    <div className="command-center window-content-overlay fade-in">
      <div className="cc-header">
        <h1>Command Center</h1>
        <p className="cc-subtitle">Real-time Telemetry & Diagnostics</p>
      </div>

      <div className="cc-grid">
        {/* GitHub Feed */}
        <div className="cc-card">
          <h3><span className="blink">●</span> Live GitHub Feed</h3>
          {loading ? <p>Establishing uplink to GitHub servers...</p> : (
            <ul className="github-list">
              {githubEvents.map(ev => (
                <li key={ev.id} className="github-item">
                  <div className="git-repo">{ev.repo} <span>[{ev.date}]</span></div>
                  <div className="git-msg">{ev.message}</div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Current Learning */}
        <div className="cc-card">
          <h3>Neural Download Progress</h3>
          <p className="cc-comment">// Skills currently being mastered in background thread</p>
          <div className="learning-bars">
            {learningItems.map(item => (
              <div key={item.title} className="learning-bar-container">
                <div className="learning-bar-header">
                  <span>{item.title}</span>
                  <span>{item.progress}% Loaded</span>
                </div>
                <div className="learning-bar-bg">
                  <div 
                    className="learning-bar-fill" 
                    style={{ width: `${item.progress}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* System Stats Graphic */}
        <div className="cc-card cc-stats-card">
            <h3>System Status</h3>
            <div className="stats-grid">
                <div className="stat-box">
                    <span className="stat-value">99.9%</span>
                    <span className="stat-label">Uptime</span>
                </div>
                <div className="stat-box">
                    <span className="stat-value">60 FPS</span>
                    <span className="stat-label">Frame Rate</span>
                </div>
                <div className="stat-box">
                    <span className="stat-value">4.2GB</span>
                    <span className="stat-label">Heap Memory</span>
                </div>
                <div className="stat-box">
                    <span className="stat-value">Secure</span>
                    <span className="stat-label">Encrypted</span>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default CommandCenter;

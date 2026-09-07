import React, { useState, useEffect, useRef } from 'react';
import { cicdPipelineStages } from '../data';
import { playClickSound, playSuccessSound } from '../utils/sound';
import './PipelineVisualizer.css';

const PipelineVisualizer = () => {
  const [stages, setStages] = useState(cicdPipelineStages.map(s => ({ ...s, currentStatus: 'passed' })));
  const [selectedStageId, setSelectedStageId] = useState(cicdPipelineStages[0].id);
  const [isRunning, setIsRunning] = useState(false);
  const logsEndRef = useRef(null);

  const selectedStage = stages.find(s => s.id === selectedStageId) || stages[0];

  const triggerPipeline = () => {
    playClickSound();
    setIsRunning(true);

    // Reset stages to pending
    setStages(prev => prev.map(s => ({ ...s, currentStatus: 'pending' })));

    let currentIndex = 0;

    const runNextStage = () => {
      if (currentIndex >= cicdPipelineStages.length) {
        setIsRunning(false);
        playSuccessSound();
        return;
      }

      const stage = cicdPipelineStages[currentIndex];
      setSelectedStageId(stage.id);

      // Set current stage to running
      setStages(prev => prev.map((s, idx) => {
        if (idx === currentIndex) return { ...s, currentStatus: 'running' };
        if (idx < currentIndex) return { ...s, currentStatus: 'passed' };
        return { ...s, currentStatus: 'pending' };
      }));

      setTimeout(() => {
        // Mark current as passed
        setStages(prev => prev.map((s, idx) => {
          if (idx === currentIndex) return { ...s, currentStatus: 'passed' };
          return s;
        }));
        currentIndex++;
        runNextStage();
      }, 900);
    };

    setTimeout(runNextStage, 400);
  };

  return (
    <div className="pipeline-container">
      {/* Top Header */}
      <div className="pipeline-header">
        <div className="pipeline-title-group">
          <span className="jenkins-icon-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            CI/CD AUTOMATION
          </span>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f0f6fc' }}>
              Jenkins & GitHub Actions Automated Delivery Pipeline
            </div>
            <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>
              Multi-stage linting, testing, Docker containerization, security scans, and K8s rollout
            </div>
          </div>
        </div>

        <div className="pipeline-actions">
          <a
            href="https://github.com/jenkinsci/jenkins/pull/26966"
            target="_blank"
            rel="noopener noreferrer"
            className="gh-pr-link-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="18" r="3"></circle>
              <circle cx="6" cy="6" r="3"></circle>
              <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
              <line x1="6" y1="9" x2="6" y2="21"></line>
            </svg>
            Inspect Merged PR #26966
          </a>
          <button
            className="trigger-run-btn"
            onClick={triggerPipeline}
            disabled={isRunning}
          >
            {isRunning ? (
              <><span>⚙</span> Pipeline Executing...</>
            ) : (
              <><span>▶</span> Trigger Pipeline Run</>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Stages Horizontal Rail */}
      <div className="pipeline-stages-rail">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.id}>
            <div
              className={`stage-card ${selectedStageId === stage.id ? 'active' : ''} ${stage.currentStatus}`}
              onClick={() => { playClickSound(); setSelectedStageId(stage.id); }}
            >
              <div className={`stage-icon-status ${stage.currentStatus}`}>
                {stage.currentStatus === 'passed' ? '✓' : stage.currentStatus === 'running' ? '◌' : '•'}
              </div>
              <div className="stage-info">
                <span className="stage-name">{stage.name}</span>
                <span className="stage-meta">{stage.duration} • {stage.currentStatus.toUpperCase()}</span>
              </div>
            </div>
            {idx < stages.length - 1 && <div className="stage-connector"></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Raw Console Logs View */}
      <div className="pipeline-logs-view">
        <div className="logs-header">
          <span>Stage Output: <strong style={{ color: '#58a6ff' }}>{selectedStage.name}</strong></span>
          <span>Status: <span style={{ color: selectedStage.currentStatus === 'passed' ? '#3fb950' : '#d29922' }}>{selectedStage.currentStatus.toUpperCase()}</span></span>
        </div>

        <div className="logs-body">
          <div className="log-line cmd">$ {selectedStage.command}</div>
          <div className="log-line info">Executing containerized runner on Linux x86_64 agent...</div>
          <div style={{ height: '8px' }}></div>
          {selectedStage.logs.map((log, i) => (
            <div key={i} className={`log-line ${log.includes('✔') || log.includes('PASS') || log.includes('Successfully') ? 'pass' : log.includes('Step') ? 'highlight' : 'info'}`}>
              {log}
            </div>
          ))}
          <div style={{ height: '8px' }}></div>
          {selectedStage.currentStatus === 'passed' && (
            <div className="log-line pass">✔ Completed with exit code 0 ({selectedStage.duration})</div>
          )}
          <div ref={logsEndRef}></div>
        </div>
      </div>

      {/* Spotlight Bar for Jenkins Core contribution */}
      <div className="jenkins-pr-spotlight">
        <div className="spotlight-text">
          ★ <strong>Jenkins Core Contributor:</strong> Merged fix in <code>jenkinsci/jenkins</code> eliminating silent window.event failures in global CI/CD pipelines.
        </div>
        <div className="spotlight-author">
          Validated by Jenkins Core Maintainers & CI Pipeline
        </div>
      </div>
    </div>
  );
};

export default PipelineVisualizer;

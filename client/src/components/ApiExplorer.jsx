import React, { useState, useRef } from 'react';
import { apiExplorerEndpoints } from '../data';
import { playClickSound, playSuccessSound } from '../utils/sound';
import './ApiExplorer.css';

const ApiExplorer = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(apiExplorerEndpoints[0]);
  const [payloadText, setPayloadText] = useState(selectedEndpoint.defaultPayload || '');
  const [activeReqTab, setActiveReqTab] = useState('body');
  const [activeResTab, setActiveResTab] = useState('response');
  const [isLoading, setIsLoading] = useState(false);
  const [responseOutput, setResponseOutput] = useState(selectedEndpoint.mockResponse);
  const [lastRequestTime, setLastRequestTime] = useState(0);

  const handleSelectEndpoint = (ep) => {
    playClickSound();
    setSelectedEndpoint(ep);
    setPayloadText(ep.defaultPayload || '');
    setResponseOutput(ep.mockResponse);
  };

  const handleSend = () => {
    playClickSound();
    setIsLoading(true);

    const now = Date.now();
    const isRateLimited = now - lastRequestTime < 600;
    setLastRequestTime(now);

    setTimeout(() => {
      setIsLoading(false);
      playSuccessSound();

      if (isRateLimited) {
        setResponseOutput({
          status: 429,
          statusText: "Too Many Requests",
          latencyMs: 12,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "retry-after": "5",
            "x-ratelimit-remaining": "0"
          },
          body: {
            success: false,
            error: "RATE_LIMIT_EXCEEDED",
            message: "Brute-force protection active. Maximum request velocity exceeded for your IP."
          }
        });
      } else {
        // Normal simulated response
        setResponseOutput(selectedEndpoint.mockResponse);
      }
    }, Math.floor(Math.random() * 80) + 70);
  };

  return (
    <div className="api-explorer">
      <div className="api-topbar">
        <div className="api-title-area">
          <div className="api-pulse"></div>
          <div>
            <div className="api-title">REST API Playground & Sandbox</div>
            <div className="api-subtitle">Direct interactive testing of Rauneet's backend endpoints</div>
          </div>
        </div>
        <div className="api-stats">
          <span>Target: <span className="api-stat-val">Node.js / Express</span></span>
          <span>Security: <span className="api-stat-val">JWT + Zod + RateLimit</span></span>
        </div>
      </div>

      <div className="api-main-layout">
        {/* Sidebar */}
        <div className="api-endpoint-list">
          {apiExplorerEndpoints.map((ep) => (
            <button
              key={ep.id}
              className={`api-endpoint-btn ${selectedEndpoint.id === ep.id ? 'active' : ''}`}
              onClick={() => handleSelectEndpoint(ep)}
            >
              <span className={`method-badge ${ep.method}`}>{ep.method}</span>
              <div className="endpoint-btn-text">
                <span className="endpoint-btn-path">{ep.path}</span>
                <span className="endpoint-btn-desc">{ep.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Playground Main */}
        <div className="api-playground">
          {/* URL bar */}
          <div className="api-url-bar">
            <span className={`method-badge ${selectedEndpoint.method}`}>{selectedEndpoint.method}</span>
            <input
              type="text"
              readOnly
              value={`https://api.rauneet.dev${selectedEndpoint.path}`}
              className="api-url-input"
            />
            <button
              className="api-send-btn"
              onClick={handleSend}
              disabled={isLoading}
            >
              {isLoading ? (
                <><span>⚡</span> Dispatching...</>
              ) : (
                <><span>▶</span> Send Request</>
              )}
            </button>
          </div>

          <div className="api-panes">
            {/* Request Pane */}
            <div className="api-pane">
              <div className="api-pane-header">
                <div className="api-pane-tabs">
                  <button
                    className={`api-tab-btn ${activeReqTab === 'body' ? 'active' : ''}`}
                    onClick={() => setActiveReqTab('body')}
                  >
                    JSON Body
                  </button>
                  <button
                    className={`api-tab-btn ${activeReqTab === 'docs' ? 'active' : ''}`}
                    onClick={() => setActiveReqTab('docs')}
                  >
                    Schema & Docs
                  </button>
                </div>
                <span>Payload Inspector</span>
              </div>

              <div className="api-pane-body">
                {activeReqTab === 'body' ? (
                  selectedEndpoint.method === 'POST' ? (
                    <textarea
                      className="api-textarea"
                      value={payloadText}
                      onChange={(e) => setPayloadText(e.target.value)}
                      placeholder="{ JSON payload }"
                    />
                  ) : (
                    <div style={{ color: '#8b949e', fontStyle: 'italic', padding: '20px 0' }}>
                      GET requests do not require a request body. Parameters are parsed via query string.
                    </div>
                  )
                ) : (
                  <div style={{ color: '#c9d1d9', fontSize: '0.8rem', lineHeight: '1.6' }}>
                    <p style={{ color: '#58a6ff', fontWeight: 'bold' }}>{selectedEndpoint.title}</p>
                    <p>{selectedEndpoint.desc}</p>
                    <div style={{ marginTop: '12px', background: '#0d1117', padding: '10px', borderRadius: '4px' }}>
                      <span style={{ color: '#3fb950' }}>// Architecture Note</span><br />
                      Validates payloads with strictly typed Zod schemas. Any invalid shape is automatically short-circuited with a 400 Bad Request before database access.
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Response Pane */}
            <div className="api-pane">
              <div className="api-pane-header">
                <div className="api-pane-tabs">
                  <button
                    className={`api-tab-btn ${activeResTab === 'response' ? 'active' : ''}`}
                    onClick={() => setActiveResTab('response')}
                  >
                    Response Body
                  </button>
                  <button
                    className={`api-tab-btn ${activeResTab === 'headers' ? 'active' : ''}`}
                    onClick={() => setActiveResTab('headers')}
                  >
                    Headers
                  </button>
                </div>

                {responseOutput && (
                  <div className={`status-indicator-badge s${responseOutput.status}`}>
                    <span>{responseOutput.status} {responseOutput.statusText}</span>
                    <span style={{ opacity: 0.7 }}>• {responseOutput.latencyMs}ms</span>
                  </div>
                )}
              </div>

              <div className="api-pane-body">
                {activeResTab === 'response' ? (
                  <pre className="json-pre">
                    {JSON.stringify(responseOutput?.body || {}, null, 2)}
                  </pre>
                ) : (
                  <table className="headers-table">
                    <tbody>
                      {responseOutput?.headers &&
                        Object.entries(responseOutput.headers).map(([k, v]) => (
                          <tr key={k}>
                            <td className="header-key">{k}</td>
                            <td className="header-val">{v}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiExplorer;

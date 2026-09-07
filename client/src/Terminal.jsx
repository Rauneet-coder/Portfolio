import React, { useState, useEffect, useRef } from 'react';
import { personalInfo, skillsData } from './data';
import { playKeySound, playSuccessSound } from './utils/sound';
import './App.css';

const COMMANDS = [
  'help', 'about', 'resume', 'skills', 'projects', 'jenkins', 
  'docker', 'kubectl', 'curl', 'git', 'contact', 'clear', 'whoami', 'uname', 'uptime', 'exit'
];

const Terminal = ({ onClose, isMinimized }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'RauneetOS Linux 6.8.0-cloud-amd64 (x86_64)' },
    { type: 'system', content: 'Welcome to Rauneet Singh\'s Backend & DevOps CLI.' },
    { type: 'system', content: 'Type "help" or press TAB for auto-completion.' },
  ]);
  const [cmdIndex, setCmdIndex] = useState(-1);
  const [pastCommands, setPastCommands] = useState([]);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMinimized]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setPastCommands(prev => [trimmed, ...prev]);
    setCmdIndex(-1);

    const cleanCmd = trimmed.toLowerCase();
    const args = cleanCmd.split(' ').slice(1);
    const command = cleanCmd.split(' ')[0];

    let output = null;

    switch (command) {
      case 'help':
        output = (
          <div className="terminal-response">
            <p style={{ color: '#38bdf8', marginBottom: '8px' }}>Available DevOps & Backend Commands:</p>
            <table className="help-table">
              <tbody>
                <tr><td>resume</td><td>Print full technical resume summary</td></tr>
                <tr><td>jenkins</td><td>Inspect Jenkins Core open-source PR #26966</td></tr>
                <tr><td>docker ps</td><td>List containerized services and ports</td></tr>
                <tr><td>kubectl</td><td>Check Kubernetes cluster pods and deployments</td></tr>
                <tr><td>curl &lt;url&gt;</td><td>Execute mock HTTP request to internal APIs</td></tr>
                <tr><td>skills</td><td>Show technical stack (Node, Docker, K8s, DBs)</td></tr>
                <tr><td>projects</td><td>View production backend systems & architectures</td></tr>
                <tr><td>about</td><td>View background and current open status</td></tr>
                <tr><td>contact</td><td>Display direct communication channels</td></tr>
                <tr><td>git log</td><td>Inspect recent repository commits</td></tr>
                <tr><td>uname -a</td><td>Kernel & system architecture info</td></tr>
                <tr><td>clear</td><td>Clear terminal screen</td></tr>
                <tr><td>exit</td><td>Close terminal session</td></tr>
              </tbody>
            </table>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      case 'about':
        output = (
          <div className="terminal-response">
            <p><strong style={{ color: '#38bdf8' }}>{personalInfo.name}</strong> — {personalInfo.title}</p>
            <p style={{ margin: '6px 0', color: '#cbd5e1' }}>{personalInfo.summary}</p>
            <p style={{ color: '#10b981' }}>Status: {personalInfo.status}</p>
          </div>
        );
        break;

      case 'resume':
        output = (
          <div className="terminal-response" style={{ lineHeight: '1.6' }}>
            <p style={{ color: '#f8fafc', fontWeight: 'bold' }}>=== RAUNEET SINGH — BACKEND & DEVOPS ENGINEER ===</p>
            <p>Email: {personalInfo.email} | Location: {personalInfo.location}</p>
            <p>GitHub: {personalInfo.github} | LinkedIn: {personalInfo.linkedin}</p>
            <div style={{ margin: '8px 0', borderTop: '1px dashed #334155', paddingTop: '6px' }}>
              <strong style={{ color: '#38bdf8' }}>EDUCATION:</strong> {personalInfo.education.degree} ({personalInfo.education.period})<br />
              {personalInfo.education.institution} • {personalInfo.education.status}
            </div>
            <div style={{ margin: '8px 0', borderTop: '1px dashed #334155', paddingTop: '6px' }}>
              <strong style={{ color: '#ef4444' }}>OPEN SOURCE:</strong> Jenkins Core (PR #26966 - MERGED into master)<br />
              Resolved cross-browser window.event bug affecting millions of CI/CD pipelines worldwide.
            </div>
            <div style={{ margin: '8px 0', borderTop: '1px dashed #334155', paddingTop: '6px' }}>
              <strong style={{ color: '#10b981' }}>CORE PROJECTS:</strong><br />
              1. Authentication System Backend (Node.js, Express, MongoDB, JWT, bcrypt, Zod, Rate Limiting)<br />
              2. Course Selling Platform Backend (MVC Architecture, Role-gated route protection, CRUD)
            </div>
          </div>
        );
        break;

      case 'jenkins':
        output = (
          <div className="terminal-response">
            <p style={{ color: '#ef4444', fontWeight: 'bold' }}>[JENKINS CORE MERGED CONTRIBUTION]</p>
            <p>Repository: <a href="https://github.com/jenkinsci/jenkins" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>jenkinsci/jenkins</a></p>
            <p>Pull Request: <a href="https://github.com/jenkinsci/jenkins/pull/26966" target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>PR #26966</a> (Merged to master)</p>
            <p style={{ marginTop: '6px' }}>Description: Identified and resolved cross-browser event handling bug caused by deprecated window.event reliance, eliminating silent failure in CI/CD pipeline UI.</p>
            <p style={{ color: '#10b981' }}>CI Status: ALL TEST MATRICES PASSED</p>
          </div>
        );
        break;

      case 'docker':
        if (args.includes('ps') || args.length === 0) {
          output = (
            <div className="terminal-response" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
              <p style={{ color: '#94a3b8' }}>CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS</p>
              <p style={{ color: '#38bdf8' }}>a1b2c3d4e5f6   rauneet/api-auth:v2.4   "node server.js"         Up 12 days     0.0.0.0:5000-&gt;5000/tcp</p>
              <p style={{ color: '#38bdf8' }}>f6e5d4c3b2a1   mongo:7.0-alpine         "docker-entrypoint.s…"   Up 12 days     0.0.0.0:27017-&gt;27017/tcp</p>
              <p style={{ color: '#38bdf8' }}>9876fedcba12   postgres:16-alpine       "docker-entrypoint.s…"   Up 12 days     0.0.0.0:5432-&gt;5432/tcp</p>
              <p style={{ color: '#38bdf8' }}>456789abcdef   redis:7-alpine           "redis-server --save…"   Up 12 days     0.0.0.0:6379-&gt;6379/tcp</p>
            </div>
          );
        } else {
          output = `Usage: docker ps`;
        }
        break;

      case 'kubectl':
        output = (
          <div className="terminal-response" style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>
            <p style={{ color: '#94a3b8' }}>NAME                              READY   STATUS    RESTARTS   AGE</p>
            <p style={{ color: '#10b981' }}>auth-deployment-7f98c8-b2x9       1/1     Running   0          4d12h</p>
            <p style={{ color: '#10b981' }}>auth-deployment-7f98c8-k5m1       1/1     Running   0          4d12h</p>
            <p style={{ color: '#10b981' }}>course-service-5899bb-99qz       1/1     Running   0          3d2h</p>
            <p style={{ color: '#10b981' }}>ingress-nginx-controller-w8x2     1/1     Running   0          18d</p>
          </div>
        );
        break;

      case 'curl':
        output = (
          <div className="terminal-response">
            <pre style={{ color: '#7ee787', margin: 0 }}>
{JSON.stringify({
  status: "200 OK",
  server: "Node.js Express / Docker",
  uptime: "948201s",
  health: "all microservices healthy",
  author: "Rauneet Singh",
  openToRoles: ["Backend Engineer Intern", "DevOps Intern", "Platform Engineer Intern"]
}, null, 2)}
            </pre>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="terminal-response">
            <p><strong style={{ color: '#38bdf8' }}>Backend:</strong> Node.js, Express.js, REST APIs, JWT, bcrypt, Zod, MVC</p>
            <p><strong style={{ color: '#10b981' }}>Databases:</strong> MongoDB (Mongoose), PostgreSQL, Prisma ORM</p>
            <p><strong style={{ color: '#0ea5e9' }}>DevOps & Cloud:</strong> Docker, Kubernetes, Jenkins Core, GitHub Actions, Linux, Bash, AWS (learning)</p>
            <p><strong style={{ color: '#f59e0b' }}>Languages:</strong> JavaScript, Bash, Python (basic)</p>
            <p><strong style={{ color: '#a855f7' }}>Tools:</strong> Git, GitHub, Postman, cURL</p>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="terminal-response">
            <p style={{ color: '#ef4444' }}>1. Jenkins Core PR #26966 (Merged)</p>
            <p style={{ color: '#10b981' }}>2. Production Auth System Backend (JWT, bcrypt, Zod, Rate Limiting)</p>
            <p style={{ color: '#38bdf8' }}>3. Course Selling Platform Backend (MVC, Role-gated CRUD)</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="terminal-response">
            <p>Email: <a href={`mailto:${personalInfo.email}`} style={{ color: '#58a6ff' }}>{personalInfo.email}</a></p>
            <p>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>{personalInfo.linkedin}</a></p>
            <p>GitHub: <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: '#58a6ff' }}>{personalInfo.github}</a></p>
            <p>Location: {personalInfo.location}</p>
          </div>
        );
        break;

      case 'git':
        output = (
          <div className="terminal-response" style={{ fontSize: '0.75rem' }}>
            <p style={{ color: '#eab308' }}>commit 2730f3a (HEAD -&gt; main, origin/main)</p>
            <p>Author: Rauneet-coder &lt;rauneetsingh1903@gmail.com&gt;</p>
            <p style={{ color: '#94a3b8' }}>    feat(devops): add interactive ci/cd pipeline visualizer celebrating jenkins core pr</p>
            <br />
            <p style={{ color: '#eab308' }}>commit c201d57</p>
            <p style={{ color: '#94a3b8' }}>    feat(architecture): add interactive system architecture &amp; traffic flow visualizer</p>
          </div>
        );
        break;

      case 'whoami':
        output = "visitor@rauneet-dev (interactive shell)";
        break;

      case 'uname':
        output = "Linux rauneet-prod-k8s-node 6.8.0-cloud-amd64 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux";
        break;

      case 'uptime':
        output = " 02:04:30 up 24 days, 14:32,  2 users,  load average: 0.14, 0.08, 0.05";
        break;

      case 'exit':
        onClose();
        return;

      default:
        output = `Command not found: "${command}". Type "help" to view valid commands.`;
    }

    if (output) {
      setHistory(prev => [
        ...prev,
        { type: 'command', content: cmd },
        { type: 'response', content: output }
      ]);
    } else {
      setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    }
  };

  const handleKeyDown = (e) => {
    playKeySound();

    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (pastCommands.length > 0 && cmdIndex < pastCommands.length - 1) {
        const nextIdx = cmdIndex + 1;
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdIndex > 0) {
        const nextIdx = cmdIndex - 1;
        setCmdIndex(nextIdx);
        setInput(pastCommands[nextIdx]);
      } else if (cmdIndex === 0) {
        setCmdIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = input.trim().toLowerCase();
      if (current) {
        const match = COMMANDS.find(c => c.startsWith(current));
        if (match) setInput(match);
      }
    }
  };

  return (
    <div className="terminal-window-content" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-history">
        {history.map((line, idx) => (
          <div key={idx} className={`line ${line.type}`}>
            {line.type === 'command' ? (
              <span className="prompt">visitor@rauneet-dev:~$ {line.content}</span>
            ) : (
              <div className="output">{line.content}</div>
            )}
          </div>
        ))}
        <div className="input-line">
          <span className="prompt">visitor@rauneet-dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            autoFocus
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default Terminal;

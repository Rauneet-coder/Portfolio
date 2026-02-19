import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const Terminal = ({ onClose, isMinimized }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'RauneetOS v1.0.0 [Secure Boot]' },
    { type: 'system', content: 'Type "help" for available commands.' },
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!isMinimized) {
      inputRef.current?.focus();
    }
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isMinimized]);

  const handleCommand = (cmd) => {
    const cleanCmd = cmd.trim().toLowerCase();
    const args = cleanCmd.split(' ').slice(1);
    const command = cleanCmd.split(' ')[0];

    let output = null;

    switch (command) {
      case 'help':
        output = (
          <div className="terminal-response">
            <p>Available commands:</p>
            <table className="help-table">
              <tbody>
                <tr><td>about</td><td>View profile summary</td></tr>
                <tr><td>projects</td><td>List key projects</td></tr>
                <tr><td>skills</td><td>Show technical stack</td></tr>
                <tr><td>contact</td><td>Get contact details</td></tr>
                <tr><td>clear</td><td>Clear terminal history</td></tr>
                <tr><td>sudo</td><td>Execute as superuser</td></tr>
                <tr><td>exit</td><td>Close terminal</td></tr>
              </tbody>
            </table>
          </div>
        );
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'about':
        output = "Rauneet Singh | Backend & DevOps Engineer. Passionate about scalable systems, cloud infrastructure, and efficient code.";
        break;
      case 'contact':
        output = (
          <div className="terminal-response">
            <p>Email: rauneetsingh1903@gmail.com</p>
            <p>GitHub: github.com/Rauneet-coder</p>
            <p>LinkedIn: linkedin.com/in/rauneet-singh-85369428b</p>
          </div>
        );
        break;
      case 'projects':
        output = (
            <ul className="terminal-list">
                <li>* Modern Interactive Portfolio (React, GSAP)</li>
                <li>* Scalable REST API (Node, Express, MongoDB)</li>
                <li>* High-Availability Clusters (K8s, Docker)</li>
                <li>* Algorithm Optimization (C++)</li>
            </ul>
        );
        break;
      case 'skills':
        output = "JavaScript, TypeScript, React, Node.js, Express, MongoDB, PostgreSQL, Docker, Kubernetes, AWS, C++, Linux.";
        break;
      case 'sudo':
        output = "Permission denied: User 'visitor' is not in the sudoers file. This incident will be reported.";
        break;
      case 'rm':
        if (args.includes('-rf') && args.includes('/')) {
            output = "Nice try, but I can't let you do that, Dave.";
        } else {
            output = "Usage: rm <filename>";
        }
        break;
      case 'ls':
        output = "about.txt  projects/  skills.md  contact.info  system.log";
        break;
      case 'whoami':
        output = "visitor@rauneet-portfolio";
        break;
      case 'exit':
        onClose();
        return;
      case '':
        break;
      default:
        output = `Command not found: ${command}. Type 'help' for assistance.`;
    }

    if (output) {
      setHistory(prev => [...prev, 
        { type: 'command', content: cmd },
        { type: 'response', content: output }
      ]);
    } else if (cleanCmd !== '') {
         setHistory(prev => [...prev, { type: 'command', content: cmd }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
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

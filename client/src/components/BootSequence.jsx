import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BootSequence.css';

const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [isBooting, setIsBooting] = useState(true);

  const bootSequence = [
    { text: "> INITIALIZING VIRTUAL ENVIRONMENT...", delay: 100 },
    { text: "> LOADING KERNEL MODULES...", delay: 250 },
    { text: "> MOUNTING PROJECTS: [SUCCESS]", delay: 400 },
    { text: "> ESTABLISHING SECURE CONNECTION...", delay: 550 },
    { text: "> BYPASSING MAINFRAME ENCRYPTION...", delay: 700 },
    { text: "> ACCESS GRANTED.", delay: 850 },
    { text: "> SYSTEMS: OPTIMAL", delay: 1000 }
  ];

  useEffect(() => {
    let timeouts = [];
    
    // Disable scrolling during boot
    document.body.style.overflow = 'hidden';

    bootSequence.forEach((item, index) => {
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, item.text]);
        // When the last sequence runs, start the outro
        if (index === bootSequence.length - 1) {
          setTimeout(() => {
            setIsBooting(false);
            setTimeout(() => {
              document.body.style.overflow = 'auto'; // allow scroll again
              onComplete();
            }, 500); // Wait for AnimatePresence exit
          }, 300);
        }
      }, item.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      document.body.style.overflow = 'auto';
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isBooting && (
        <motion.div 
          className="boot-container"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(10px)",
            transition: { duration: 0.5, ease: "easeInOut" }
          }}
        >
          <div className="boot-terminal">
            {lines.map((line, i) => (
              <motion.div 
                key={i} 
                className="boot-line"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {line}
              </motion.div>
            ))}
            <motion.div 
              className="boot-cursor"
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            >
              _
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequence;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SystemNotifications.css';

// Global event dispatcher for notifications
export const notify = (message, type = 'info') => {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('os-notify', { detail: { message, type } });
    window.dispatchEvent(event);
  }
};

const SystemNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNotify = (e) => {
      const { message, type } = e.detail;
      const id = Date.now() + Math.random();
      
      setNotifications(prev => [...prev, { id, message, type }]);

      // Auto dismiss after 4 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 4000);
    };

    window.addEventListener('os-notify', handleNotify);
    return () => window.removeEventListener('os-notify', handleNotify);
  }, []);

  return (
    <div className="system-notifications">
      <AnimatePresence>
        {notifications.map(note => (
          <motion.div
            key={note.id}
            className={`os-toast toast-${note.type}`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <span className="toast-icon">
              {note.type === 'achievement' ? '[!]' : '[i]'}
            </span>
            <span className="toast-message">{note.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SystemNotifications;

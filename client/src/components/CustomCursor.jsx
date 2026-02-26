import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = ({ theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Only run on non-touch devices basically
    const isMobile = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isMobile) {
      setHidden(true);
      return;
    }

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setHidden(true);
    const handleMouseEnter = () => setHidden(false);

    const handleElementHover = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('dock-item') ||
        target.classList.contains('tech-card') ||
        target.classList.contains('window-header') ||
        target.classList.contains('close') ||
        target.classList.contains('minimize') ||
        target.classList.contains('maximize') ||
        target.closest('.interactive')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleElementHover);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleElementHover);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (hidden) return null;

  // Adapt colors based on theme
  const dotColor = theme === 'light' ? '#0066cc' : '#00ff80';
  const ringColor = theme === 'light' ? 'rgba(0, 102, 204, 0.5)' : 'rgba(0, 255, 128, 0.5)';
  const activeRingBg = theme === 'light' ? 'rgba(0, 102, 204, 0.1)' : 'rgba(0, 255, 128, 0.1)';

  return (
    <div className={`custom-cursor-container ${theme === 'light' ? 'light-cursor' : ''}`}>
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePosition.x - 4, // Center is 8/2
          y: mousePosition.y - 4,
          backgroundColor: dotColor,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: mousePosition.x - 16, // Center is 32/2
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? activeRingBg : "transparent",
          borderColor: isHovering ? "rgba(0, 255, 128, 0)" : ringColor
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />
    </div>
  );
};

export default CustomCursor;

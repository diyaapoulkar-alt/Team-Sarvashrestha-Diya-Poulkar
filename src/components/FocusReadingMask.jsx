import React, { useState, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function FocusReadingMask() {
  const { readingMaskActive } = useAccessibility();
  const [mouseY, setMouseY] = useState(window.innerHeight / 2);

  useEffect(() => {
    if (!readingMaskActive) return;

    const handleMouseMove = (e) => {
      setMouseY(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [readingMaskActive]);

  if (!readingMaskActive) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Top Dimmed Layer */}
      <div 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: `${Math.max(0, mouseY - 35)}px`, 
          background: 'rgba(0, 0, 0, 0.65)', 
          backdropFilter: 'blur(2px)', 
          transition: 'height 0.05s ease-out' 
        }} 
      />

      {/* Clear Highlight Reading Band */}
      <div 
        style={{ 
          position: 'absolute', 
          top: `${Math.max(0, mouseY - 35)}px`, 
          left: 0, 
          right: 0, 
          height: '70px', 
          borderTop: '2px solid var(--accent-cyan)', 
          borderBottom: '2px solid var(--accent-cyan)', 
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)', 
          pointerEvents: 'none' 
        }} 
      />

      {/* Bottom Dimmed Layer */}
      <div 
        style={{ 
          position: 'absolute', 
          top: `${mouseY + 35}px`, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(0, 0, 0, 0.65)', 
          backdropFilter: 'blur(2px)', 
          transition: 'top 0.05s ease-out' 
        }} 
      />
    </div>
  );
}

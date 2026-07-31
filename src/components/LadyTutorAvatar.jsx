import React from 'react';

/**
 * Friendly AI Lady Tutor Avatar Icon Component for Saathi AI Studio
 */
export default function LadyTutorAvatar({ size = 36, className = "" }) {
  return (
    <div 
      className={className} 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #06b6d4 100%)',
        padding: '2px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 14px rgba(168, 85, 247, 0.35)',
        flexShrink: 0
      }}
    >
      <div 
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size * 0.55}px`,
          overflow: 'hidden'
        }}
      >
        👩‍🏫
      </div>
    </div>
  );
}

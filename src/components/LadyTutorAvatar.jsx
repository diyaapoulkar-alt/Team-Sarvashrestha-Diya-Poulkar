import React from 'react';

/**
 * Custom Lady AI Educator Avatar Component using user's uploaded anime tutor picture
 */
export default function LadyTutorAvatar({ size = 48, className = "" }) {
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
        boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <img 
        src="/lady_tutor.png" 
        alt="Lady AI Tutor" 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '50%',
          background: '#ffffff'
        }}
      />
    </div>
  );
}

import React from 'react';

/**
 * Custom Aesthetic Emblem Icon for Saathi Accessibility Copilot AI
 * Combines Visual AI Eye + Assistive Shield + Glowing Neural Sparkles
 */
export default function SaathiLogoIcon({ size = 28, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      <defs>
        <linearGradient id="saathiLogoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <linearGradient id="eyeIrisGrad" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>

        <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Aesthetic Shield Octagon */}
      <rect 
        x="4" 
        y="4" 
        width="40" 
        height="40" 
        rx="14" 
        fill="url(#saathiLogoGrad)" 
        fillOpacity="0.2"
        stroke="url(#saathiLogoGrad)" 
        strokeWidth="2.5" 
      />

      {/* Outer Vision Arc / Eye Silhouette */}
      <path 
        d="M10 24C10 24 16 14 24 14C32 14 38 24 38 24C38 24 32 34 24 34C16 34 10 24 10 24Z" 
        stroke="#ffffff" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Inner Glowing Iris */}
      <circle 
        cx="24" 
        cy="24" 
        r="6.5" 
        fill="url(#eyeIrisGrad)" 
        filter="url(#glowFilter)"
      />

      <circle 
        cx="24" 
        cy="24" 
        r="3" 
        fill="#ffffff" 
      />

      {/* Neural AI Sparkle Dots */}
      <circle cx="36" cy="12" r="2.5" fill="#67e8f9" />
      <circle cx="12" cy="36" r="2" fill="#a855f7" />
      <path d="M34 14L38 10M38 14L34 10" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

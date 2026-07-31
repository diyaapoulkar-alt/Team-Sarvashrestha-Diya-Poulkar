import React from 'react';

/**
 * Premium Aesthetic Lady AI Educator Vector Avatar Component for Saathi AI Studio
 * Features a glowing gradient halo, sleek glasses, and empathetic smile.
 */
export default function LadyTutorAvatar({ size = 56, className = "" }) {
  return (
    <div 
      className={className} 
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #06b6d4 100%)',
        padding: '3px',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(236, 72, 153, 0.45)',
        flexShrink: 0,
        position: 'relative'
      }}
    >
      <svg 
        width={size - 6} 
        height={size - 6} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ borderRadius: '50%', background: '#fdf2f8' }}
      >
        <defs>
          <linearGradient id="tutorHairGrad" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#831843" />
            <stop offset="100%" stopColor="#4c1d95" />
          </linearGradient>

          <linearGradient id="tutorSkinGrad" x1="20" y1="20" x2="44" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="100%" stopColor="#fdba74" />
          </linearGradient>

          <linearGradient id="tutorBlazerGrad" x1="12" y1="40" x2="52" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>

        {/* Outer Hair Back */}
        <path d="M14 28C14 16 22 10 32 10C42 10 50 16 50 28V42C50 48 46 52 42 54H22C18 52 14 48 14 42V28Z" fill="url(#tutorHairGrad)" />

        {/* Neck */}
        <rect x="28" y="38" width="8" height="10" rx="3" fill="#fdba74" />

        {/* Stylish Blazer Collar & Top */}
        <path d="M12 56C12 46 20 44 32 44C44 44 52 46 52 56V64H12V56Z" fill="url(#tutorBlazerGrad)" />
        <path d="M26 44L32 52L38 44" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Face Oval */}
        <ellipse cx="32" cy="29" rx="13" ry="15" fill="url(#tutorSkinGrad)" />

        {/* Hair Bangs */}
        <path d="M19 24C24 18 30 16 32 20C36 16 43 18 45 24C42 21 35 22 32 24C28 22 21 21 19 24Z" fill="url(#tutorHairGrad)" />

        {/* Smart Glasses */}
        <rect x="21" y="25" width="9" height="7" rx="2.5" stroke="#0f172a" strokeWidth="2" fill="rgba(255,255,255,0.4)" />
        <rect x="34" y="25" width="9" height="7" rx="2.5" stroke="#0f172a" strokeWidth="2" fill="rgba(255,255,255,0.4)" />
        <line x1="30" y1="28.5" x2="34" y2="28.5" stroke="#0f172a" strokeWidth="2" />
        <line x1="17" y1="27" x2="21" y2="27" stroke="#0f172a" strokeWidth="1.5" />
        <line x1="43" y1="27" x2="47" y2="27" stroke="#0f172a" strokeWidth="1.5" />

        {/* Cheerful Eyes */}
        <circle cx="25.5" cy="28.5" r="1.5" fill="#0f172a" />
        <circle cx="38.5" cy="28.5" r="1.5" fill="#0f172a" />

        {/* Warm Smile */}
        <path d="M28 35C29.5 37 34.5 37 36 35" stroke="#991b1b" strokeWidth="2" strokeLinecap="round" />

        {/* AI Headset Microphone */}
        <path d="M18 28C16 28 15 30 15 33V35" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="15" cy="36" r="2.5" fill="#ec4899" />

        {/* Sparkle Glow Dot */}
        <circle cx="48" cy="14" r="2.5" fill="#06b6d4" />
        <path d="M48 10V18M44 14H52" stroke="#ffffff" strokeWidth="1.2" />
      </svg>
    </div>
  );
}

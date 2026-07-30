import React from 'react';
import { 
  Eye, Ear, Brain, Accessibility, ChevronLeft, ChevronRight, 
  Type, Sun, Moon, Volume2, Globe, Sparkles, BookOpen, Focus
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function Sidebar({ isOpen, setIsOpen, onSelectMode }) {
  const { 
    activeProfile, 
    applyProfilePreset, 
    themeMode, 
    setThemeMode, 
    fontSize, 
    setFontSize, 
    useOpenDyslexic, 
    setUseOpenDyslexic, 
    targetLanguage, 
    setTargetLanguage,
    readingMaskActive,
    setReadingMaskActive
  } = useAccessibility();

  const handleModeClick = (profileKey) => {
    applyProfilePreset(profileKey);
    if (onSelectMode) {
      onSelectMode('dashboard');
    }
  };

  return (
    <aside style={{
      width: isOpen ? '280px' : '72px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 80,
      backdropFilter: 'blur(16px)',
      flexShrink: 0
    }}>

      {/* Collapse / Expand Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '-14px',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          border: '2px solid #0f172a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 10
        }}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Sidebar Header */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <Sparkles size={20} />
        </div>
        {isOpen && (
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Accessibility Modes</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Click to open tool</span>
          </div>
        )}
      </div>

      {/* Accessibility Presets List */}
      <div style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, overflowY: 'auto' }}>
        
        {isOpen && <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>Presets:</span>}

        {/* 1. Visual Assist */}
        <button
          onClick={() => handleModeClick('visual')}
          className={`btn-secondary ${activeProfile === 'visual' ? 'glowing-border' : ''}`}
          style={{
            justify: isOpen ? 'flex-start' : 'center',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'visual' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
            borderColor: activeProfile === 'visual' ? 'var(--accent-primary)' : 'transparent',
            width: '100%'
          }}
          title="Visual Assist Mode - Opens Describe This Camera"
        >
          <Eye size={20} color="var(--accent-primary)" />
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff' }}>Visual Assist</span>}
        </button>

        {/* 2. Hearing Assist */}
        <button
          onClick={() => handleModeClick('hearing')}
          className={`btn-secondary ${activeProfile === 'hearing' ? 'glowing-border' : ''}`}
          style={{
            justify: isOpen ? 'flex-start' : 'center',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'hearing' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            borderColor: activeProfile === 'hearing' ? 'var(--accent-emerald)' : 'transparent',
            width: '100%'
          }}
          title="Hearing Assist Mode - Opens Live Subtitles"
        >
          <Ear size={20} color="var(--accent-emerald)" />
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff' }}>Hearing Assist</span>}
        </button>

        {/* 3. Cognitive / Dyslexia */}
        <button
          onClick={() => handleModeClick('cognitive')}
          className={`btn-secondary ${activeProfile === 'cognitive' ? 'glowing-border' : ''}`}
          style={{
            justify: isOpen ? 'flex-start' : 'center',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'cognitive' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
            borderColor: activeProfile === 'cognitive' ? 'var(--accent-cyan)' : 'transparent',
            width: '100%'
          }}
          title="Cognitive Assist Mode - Opens Textbook Simplifier"
        >
          <Brain size={20} color="var(--accent-cyan)" />
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff' }}>Cognitive / Dyslexia</span>}
        </button>

        {/* 4. Motor Assist */}
        <button
          onClick={() => handleModeClick('motor')}
          className={`btn-secondary ${activeProfile === 'motor' ? 'glowing-border' : ''}`}
          style={{
            justify: isOpen ? 'flex-start' : 'center',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'motor' ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
            borderColor: activeProfile === 'motor' ? 'var(--accent-secondary)' : 'transparent',
            width: '100%'
          }}
          title="Motor Assist Mode - Opens Math Reader"
        >
          <Accessibility size={20} color="var(--accent-secondary)" />
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff' }}>Motor Assist</span>}
        </button>

        {/* Quick Customization Controls */}
        {isOpen && (
          <>
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.75rem 0' }} />

            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>Quick Settings:</span>

            {/* Focus Reader Line Guide Toggle */}
            <button 
              onClick={() => setReadingMaskActive(!readingMaskActive)}
              className={`btn-secondary ${readingMaskActive ? 'badge-cyan' : ''}`}
              style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            >
              <Focus size={16} color="var(--accent-cyan)" />
              <span>{readingMaskActive ? "Focus Line Guide (ON)" : "Focus Line Guide (OFF)"}</span>
            </button>

            {/* Font Scaler */}
            <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Type size={14} /> Text Size: {fontSize}px
              </label>
              <input 
                type="range" 
                min="14" 
                max="24" 
                value={fontSize} 
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ accentColor: 'var(--accent-primary)', width: '100%' }}
              />
            </div>

            {/* OpenDyslexic Typography Toggle */}
            <button 
              onClick={() => setUseOpenDyslexic(!useOpenDyslexic)}
              className={`btn-secondary ${useOpenDyslexic ? 'badge-cyan' : ''}`}
              style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem', fontSize: '0.85rem' }}
            >
              <BookOpen size={16} />
              <span>Dyslexia Font: {useOpenDyslexic ? 'ON' : 'OFF'}</span>
            </button>

            {/* Language Selector */}
            <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Globe size={14} /> Language:
              </label>
              <select 
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid var(--border-color)',
                  color: '#ffffff',
                  padding: '0.4rem 0.6rem',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="en" style={{ background: '#0f172a', color: '#fff' }}>English (US)</option>
                <option value="hi" style={{ background: '#0f172a', color: '#fff' }}>Hindi (हिंदी)</option>
                <option value="mr" style={{ background: '#0f172a', color: '#fff' }}>Marathi (मराठी)</option>
              </select>
            </div>
          </>
        )}

      </div>
    </aside>
  );
}

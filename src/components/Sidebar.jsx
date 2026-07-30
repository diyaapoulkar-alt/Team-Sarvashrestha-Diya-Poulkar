import React from 'react';
import { 
  Eye, Ear, Brain, Accessibility, ChevronLeft, ChevronRight, 
  Type, Globe, BookOpen, Focus
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';
import SaathiLogoIcon from './SaathiLogoIcon';

export default function Sidebar({ isOpen, setIsOpen, onSelectMode }) {
  const { 
    activeProfile, 
    applyProfilePreset, 
    fontSize, 
    setFontSize, 
    useOpenDyslexic, 
    setUseOpenDyslexic, 
    targetLanguage, 
    setTargetLanguage,
    readingMaskActive,
    setReadingMaskActive
  } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  const handleModeClick = (profileKey) => {
    applyProfilePreset(profileKey);
    if (onSelectMode) {
      onSelectMode('dashboard');
    }
  };

  return (
    <aside style={{
      width: isOpen ? '280px' : '76px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      background: 'rgba(15, 23, 42, 0.95)',
      borderRight: '1px solid var(--border-color)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      zIndex: 80,
      backdropFilter: 'blur(16px)',
      flexShrink: 0,
      overflow: 'visible' // Ensure toggle arrow button is never clipped
    }}>

      {/* Fully Visible Collapse / Expand Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: '22px',
          right: '-16px',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'var(--accent-primary)',
          border: '2px solid #0f172a',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          zIndex: 100
        }}
        title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* Sidebar Header */}
      <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.9)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <SaathiLogoIcon size={28} />
        </div>
        {isOpen && (
          <div style={{ overflow: 'hidden' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#ffffff', whiteSpace: 'nowrap' }}>
              {t('accessibilityModes')}
            </h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', whiteSpace: 'nowrap' }}>
              {t('clickToOpenTool')}
            </span>
          </div>
        )}
      </div>

      {/* Accessibility Presets List */}
      <div style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1, overflowY: 'auto' }}>
        
        {isOpen && (
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem', marginBottom: '0.2rem' }}>
            {t('presets')}
          </span>
        )}

        {/* 1. Visual Assist */}
        <button
          onClick={() => handleModeClick('visual')}
          className={`btn-secondary ${activeProfile === 'visual' ? 'glowing-border' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: isOpen ? 'flex-start' : 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'visual' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            borderColor: activeProfile === 'visual' ? 'var(--accent-primary)' : 'var(--border-color)',
            width: '100%',
            borderRadius: '12px',
            textAlign: 'left'
          }}
          title="Visual Assist Mode"
        >
          <div style={{ width: '24px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <Eye size={20} color="var(--accent-primary)" />
          </div>
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>{t('visualAssist')}</span>}
        </button>

        {/* 2. Hearing Assist */}
        <button
          onClick={() => handleModeClick('hearing')}
          className={`btn-secondary ${activeProfile === 'hearing' ? 'glowing-border' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: isOpen ? 'flex-start' : 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'hearing' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            borderColor: activeProfile === 'hearing' ? 'var(--accent-emerald)' : 'var(--border-color)',
            width: '100%',
            borderRadius: '12px',
            textAlign: 'left'
          }}
          title="Hearing Assist Mode"
        >
          <div style={{ width: '24px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <Ear size={20} color="var(--accent-emerald)" />
          </div>
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>{t('hearingAssist')}</span>}
        </button>

        {/* 3. Cognitive / Dyslexia */}
        <button
          onClick={() => handleModeClick('cognitive')}
          className={`btn-secondary ${activeProfile === 'cognitive' ? 'glowing-border' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: isOpen ? 'flex-start' : 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'cognitive' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            borderColor: activeProfile === 'cognitive' ? 'var(--accent-cyan)' : 'var(--border-color)',
            width: '100%',
            borderRadius: '12px',
            textAlign: 'left'
          }}
          title="Cognitive Assist Mode"
        >
          <div style={{ width: '24px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <Brain size={20} color="var(--accent-cyan)" />
          </div>
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>{t('cognitiveDyslexia')}</span>}
        </button>

        {/* 4. Motor Assist */}
        <button
          onClick={() => handleModeClick('motor')}
          className={`btn-secondary ${activeProfile === 'motor' ? 'glowing-border' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justify: isOpen ? 'flex-start' : 'center',
            gap: '0.75rem',
            padding: '0.75rem 0.85rem',
            background: activeProfile === 'motor' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.04)',
            borderColor: activeProfile === 'motor' ? 'var(--accent-secondary)' : 'var(--border-color)',
            width: '100%',
            borderRadius: '12px',
            textAlign: 'left'
          }}
          title="Motor Assist Mode"
        >
          <div style={{ width: '24px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
            <Accessibility size={20} color="var(--accent-secondary)" />
          </div>
          {isOpen && <span style={{ fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>{t('motorAssist')}</span>}
        </button>

        {/* Quick Customization Controls */}
        {isOpen && (
          <>
            <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.75rem 0' }} />

            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', paddingLeft: '0.5rem' }}>
              {t('quickSettings')}
            </span>

            {/* Focus Reader Line Guide Toggle */}
            <button 
              onClick={() => setReadingMaskActive(!readingMaskActive)}
              className={`btn-secondary ${readingMaskActive ? 'badge-cyan' : ''}`}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', textAlign: 'left', width: '100%' }}
            >
              <Focus size={16} color="var(--accent-cyan)" />
              <span>{readingMaskActive ? t('focusLineGuideOn') : t('focusLineGuideOff')}</span>
            </button>

            {/* Font Scaler */}
            <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Type size={14} /> {t('textSize')}: {fontSize}px
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
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.75rem', padding: '0.65rem 0.85rem', fontSize: '0.85rem', textAlign: 'left', width: '100%' }}
            >
              <BookOpen size={16} />
              <span>{useOpenDyslexic ? t('dyslexiaFontOn') : t('dyslexiaFontOff')}</span>
            </button>

            {/* Language Selector */}
            <div style={{ padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Globe size={14} /> {t('language')}:
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
                  outline: 'none',
                  width: '100%'
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

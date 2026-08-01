import React, { useState, useEffect } from 'react';
import { 
  Eye, Ear, Brain, Accessibility, ChevronLeft, ChevronRight, 
  Type, Globe, BookOpen, Focus, Sparkles
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';
import SaathiLogoIcon from './SaathiLogoIcon';
import LadyTutorAvatar from './LadyTutorAvatar';

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
    setReadingMaskActive,
    setActiveTool,
    activeTool
  } = useAccessibility();

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = (key) => getTranslation(targetLanguage, key);

  const closeMobileSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const handleModeClick = (profileKey) => {
    applyProfilePreset(profileKey);
    if (onSelectMode) {
      onSelectMode('dashboard');
    }
    closeMobileSidebar();
  };

  const handleStudioClick = () => {
    setActiveTool('chatgpt');
    if (onSelectMode) {
      onSelectMode('studio');
    }
    closeMobileSidebar();
  };

  // Determine sidebar width & position on mobile vs desktop
  const sidebarWidth = isMobile ? (isOpen ? '280px' : '0px') : (isOpen ? '280px' : '76px');

  return (
    <>
      {/* Mobile Translucent Backdrop Overlay */}
      {isOpen && isMobile && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            zIndex: 105
          }}
        />
      )}

      {/* Floating Arrow Pull Button on Mobile when Collapsed */}
      {isMobile && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="btn-primary glowing-border animate-pop"
          style={{
            position: 'fixed',
            top: '75px',
            left: '12px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(71, 85, 105, 0.4)',
            zIndex: 120,
            background: 'var(--gradient-brand)',
            color: '#ffffff',
            border: '2px solid #ffffff'
          }}
          title="Open Accessibility Dashboard Menu"
        >
          <ChevronRight size={22} />
        </button>
      )}

      <aside style={{
        width: sidebarWidth,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(241, 245, 249, 0.98)',
        borderRight: (isMobile && !isOpen) ? 'none' : '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        position: isMobile ? 'fixed' : 'relative',
        top: isMobile ? 0 : 'auto',
        bottom: isMobile ? 0 : 'auto',
        left: isMobile ? 0 : 'auto',
        height: isMobile ? '100vh' : 'auto',
        zIndex: 110,
        backdropFilter: 'blur(16px)',
        flexShrink: 0,
        overflow: (isMobile && !isOpen) ? 'hidden' : 'visible',
        color: '#0f172a'
      }}>

        {/* Desktop Toggle Arrow Button */}
        {!isMobile && (
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{
              position: 'absolute',
              top: '85px',
              right: '-16px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              border: '2px solid #ffffff',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
              zIndex: 999
            }}
            title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        )}

        {/* Mobile Close Button inside drawer */}
        {isMobile && isOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '12px',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(71,85,105,0.15)',
              border: '1px solid var(--border-color)',
              color: '#0f172a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 999
            }}
            title="Close Drawer"
          >
            <ChevronLeft size={18} />
          </button>
        )}

        {/* Sidebar Header */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: '#ffffff', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <SaathiLogoIcon size={28} />
          </div>
          {isOpen && (
            <div style={{ overflow: 'hidden' }}>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap' }}>
                {t('accessibilityModes')}
              </h3>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', whiteSpace: 'nowrap' }}>
                {t('clickToOpenTool')}
              </span>
            </div>
          )}
        </div>

        {/* Accessibility Presets & Tools List */}
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
              background: activeProfile === 'visual' ? 'rgba(99, 102, 241, 0.15)' : '#ffffff',
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
            {isOpen && <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{t('visualAssist')}</span>}
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
              background: activeProfile === 'hearing' ? 'rgba(16, 185, 129, 0.15)' : '#ffffff',
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
            {isOpen && <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{t('hearingAssist')}</span>}
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
              background: activeProfile === 'cognitive' ? 'rgba(6, 182, 212, 0.15)' : '#ffffff',
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
            {isOpen && <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{t('cognitiveDyslexia')}</span>}
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
              background: activeProfile === 'motor' ? 'rgba(168, 85, 247, 0.15)' : '#ffffff',
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
            {isOpen && <span style={{ fontWeight: 600, color: '#0f172a', whiteSpace: 'nowrap' }}>{t('motorAssist')}</span>}
          </button>

          {/* 5. Saathi AI Studio Button */}
          <button
            onClick={handleStudioClick}
            className={`btn-secondary ${activeTool === 'chatgpt' ? 'glowing-border' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justify: isOpen ? 'flex-start' : 'center',
              gap: '0.75rem',
              padding: '0.75rem 0.85rem',
              background: activeTool === 'chatgpt' ? 'rgba(236, 72, 153, 0.15)' : '#ffffff',
              borderColor: activeTool === 'chatgpt' ? '#ec4899' : 'var(--border-color)',
              width: '100%',
              borderRadius: '12px',
              textAlign: 'left'
            }}
            title="Saathi AI Studio 👩‍🏫"
          >
            <div style={{ width: '24px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
              <LadyTutorAvatar size={24} />
            </div>
            {isOpen && <span style={{ fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap' }}>{t('saathiAiStudio')}</span>}
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
                    background: '#ffffff',
                    border: '1px solid var(--border-color)',
                    color: '#0f172a',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    width: '100%'
                  }}
                >
                  <option value="en">English (US)</option>
                  <option value="hi">Hindi (हिंदी)</option>
                  <option value="mr">Marathi (मराठी)</option>
                </select>
              </div>
            </>
          )}

        </div>
      </aside>
    </>
  );
}

import React, { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Eye, Ear, Brain, Activity, Type, Sun, Moon, Contrast, 
  Volume2, VolumeX, Key, Globe, UserCheck, Sparkles 
} from 'lucide-react';

export default function PersonalizationBar({ onOpenApiKeyModal, onOpenAuthModal }) {
  const {
    activeProfile,
    applyProfilePreset,
    themeMode,
    setThemeMode,
    fontSize,
    setFontSize,
    useOpenDyslexic,
    setUseOpenDyslexic,
    screenReaderAudio,
    setScreenReaderAudio,
    targetLanguage,
    setTargetLanguage,
    groqKey,
    user
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9, 13, 22, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.6rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        
        {/* Profile Presets Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Sparkles size={14} color="var(--accent-primary)" /> Profile:
          </span>
          
          <button 
            onClick={() => applyProfilePreset('general')}
            className={`btn-secondary ${activeProfile === 'general' ? 'badge-cyan' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            Standard
          </button>
          
          <button 
            onClick={() => applyProfilePreset('visual')}
            className={`btn-secondary ${activeProfile === 'visual' ? 'badge' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Eye size={14} /> Visual Assist
          </button>
          
          <button 
            onClick={() => applyProfilePreset('hearing')}
            className={`btn-secondary ${activeProfile === 'hearing' ? 'badge-emerald' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Ear size={14} /> Hearing Assist
          </button>
          
          <button 
            onClick={() => applyProfilePreset('cognitive')}
            className={`btn-secondary ${activeProfile === 'cognitive' ? 'badge-cyan' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Brain size={14} /> Cognitive / Dyslexia
          </button>
          
          <button 
            onClick={() => applyProfilePreset('motor')}
            className={`btn-secondary ${activeProfile === 'motor' ? 'badge' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Activity size={14} /> Motor Assist
          </button>
        </div>

        {/* Quick Customization Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Globe size={14} color="var(--accent-cyan)" />
            <select 
              value={targetLanguage} 
              onChange={(e) => setTargetLanguage(e.target.value)}
              style={{ background: 'transparent', color: 'var(--text-primary)', border: 'none', fontSize: '0.85rem', fontWeight: 600, outline: 'none', cursor: 'pointer' }}
            >
              <option value="en" style={{ background: '#111827' }}>English</option>
              <option value="hi" style={{ background: '#111827' }}>हिंदी (Hindi)</option>
              <option value="mr" style={{ background: '#111827' }}>मराठी (Marathi)</option>
            </select>
          </div>

          {/* Theme Selector */}
          <button 
            onClick={() => {
              if (themeMode === 'dark-glass') setThemeMode('high-contrast-yellow');
              else if (themeMode === 'high-contrast-yellow') setThemeMode('high-contrast-white');
              else if (themeMode === 'high-contrast-white') setThemeMode('solar-light');
              else setThemeMode('dark-glass');
            }}
            title="Toggle Theme Mode (Dark Glass, High Contrast Yellow, High Contrast White, Solar Light)"
            className="btn-secondary"
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Contrast size={14} />
            <span style={{ textTransform: 'capitalize' }}>{themeMode.replace('-', ' ')}</span>
          </button>

          {/* Font Size Adjuster */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Type size={14} color="var(--accent-primary)" />
            <button 
              onClick={() => setFontSize(prev => Math.max(14, prev - 1))}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, padding: '0 0.2rem' }}
            >-</button>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, minWidth: '24px', textAlign: 'center' }}>{fontSize}px</span>
            <button 
              onClick={() => setFontSize(prev => Math.min(24, prev + 1))}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 700, padding: '0 0.2rem' }}
            >+</button>
          </div>

          {/* OpenDyslexic Toggle */}
          <button 
            onClick={() => setUseOpenDyslexic(!useOpenDyslexic)}
            className={`btn-secondary ${useOpenDyslexic ? 'badge-cyan' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            Dyslexic Font {useOpenDyslexic ? 'ON' : 'OFF'}
          </button>

          {/* Screen Reader Audio Toggle */}
          <button 
            onClick={() => setScreenReaderAudio(!screenReaderAudio)}
            className="btn-secondary"
            style={{ padding: '0.35rem 0.5rem' }}
            title="Toggle Voice Screen Reader Audio"
          >
            {screenReaderAudio ? <Volume2 size={16} color="var(--accent-emerald)" /> : <VolumeX size={16} color="var(--accent-danger)" />}
          </button>

          {/* Groq API Key Setup */}
          <button 
            onClick={onOpenApiKeyModal}
            className={`btn-secondary ${groqKey ? 'badge-emerald' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Key size={14} /> {groqKey ? 'Groq Connected' : 'Set Groq API Key'}
          </button>

          {/* User Profile */}
          <button 
            onClick={onOpenAuthModal}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}
          >
            <span>{user.avatar}</span>
            <span>{user.name}</span>
          </button>

        </div>

      </div>
    </div>
  );
}

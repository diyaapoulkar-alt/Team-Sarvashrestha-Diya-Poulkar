import React from 'react';
import { Eye, Ear, Brain, Accessibility, Sparkles, ArrowRight } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';

export default function Hero({ onOpenDashboard, onLaunchDashboard, onOpenStudio }) {
  const { activeProfile, applyProfilePreset, targetLanguage, setActiveTool } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  const handleDashboardClick = () => {
    if (onOpenDashboard) onOpenDashboard();
    else if (onLaunchDashboard) onLaunchDashboard();
  };

  const handleStudioClick = () => {
    setActiveTool('chatgpt');
    if (onOpenStudio) onOpenStudio();
    else handleDashboardClick();
  };

  return (
    <div className="animate-fade-up" style={{ width: '100%', maxWidth: '1200px', padding: '1.5rem 1rem', margin: '0 auto', color: '#0f172a' }}>
      
      {/* Hero Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
        <span className="badge-cyan glowing-border animate-pop" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }}>
          <Sparkles size={15} color="#0284c7" />
          {t('heroBadge')}
        </span>
      </div>

      {/* Main Hero Heading */}
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 1.25rem auto' }}>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.4rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', color: '#0f172a' }}>
          {t('heroTitle')}
        </h1>

        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '780px', margin: '0 auto' }}>
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Primary Call to Action Buttons */}
      <div className="hero-buttons" style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <button 
          onClick={handleDashboardClick}
          className="btn-primary glowing-border"
          style={{ padding: '0.8rem 1.75rem', fontSize: '0.98rem', borderRadius: '14px' }}
        >
          {t('openDashboard')} <ArrowRight size={18} />
        </button>

        <button 
          onClick={handleStudioClick}
          className="btn-secondary"
          style={{ padding: '0.8rem 1.75rem', fontSize: '0.98rem', borderRadius: '14px' }}
        >
          <Sparkles size={18} color="#0284c7" />
          {t('tryAiStudio')}
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', borderRadius: '20px', marginBottom: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-family-heading)' }}>100%</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statSpeechStream')}</div>
        </div>

        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-family-heading)' }}>0ms</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statSubtitles')}</div>
        </div>

        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-family-heading)' }}>3</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statLanguages')}</div>
        </div>

        <div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-family-heading)' }}>4</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statProfiles')}</div>
        </div>
      </div>

      {/* Assistive Profiles Interactive Simulator */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>
          {t('simulatorTitle')} <span style={{ color: 'var(--accent-cyan)' }}>ACTIVE: {activeProfile.toUpperCase()}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          
          {/* Visual Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('visual'); handleDashboardClick(); }}
            className={`glass-card ${activeProfile === 'visual' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(71,85,105,0.15)' }}>
                <Eye size={20} color="var(--accent-primary)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{t('visualAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simVisualDesc')}
            </p>
          </div>

          {/* Hearing Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('hearing'); handleDashboardClick(); }}
            className={`glass-card ${activeProfile === 'hearing' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(5,150,105,0.15)' }}>
                <Ear size={20} color="var(--accent-emerald)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{t('hearingAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simHearingDesc')}
            </p>
          </div>

          {/* Cognitive Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('cognitive'); handleDashboardClick(); }}
            className={`glass-card ${activeProfile === 'cognitive' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(2,132,199,0.15)' }}>
                <Brain size={20} color="var(--accent-cyan)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{t('cognitiveDyslexia')}</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simCognitiveDesc')}
            </p>
          </div>

          {/* Motor Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('motor'); handleDashboardClick(); }}
            className={`glass-card ${activeProfile === 'motor' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.65rem' }}>
              <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(100,116,139,0.15)' }}>
                <Accessibility size={20} color="var(--accent-secondary)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>{t('motorAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simMotorDesc')}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

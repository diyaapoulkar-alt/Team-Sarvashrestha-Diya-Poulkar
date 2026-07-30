import React from 'react';
import { Eye, Ear, Brain, Accessibility, Sparkles, ArrowRight, ShieldCheck, Zap, HeartHandshake } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';

export default function Hero({ onOpenDashboard, onOpenStudio }) {
  const { activeProfile, applyProfilePreset, targetLanguage } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  return (
    <div className="animate-fade-up" style={{ width: '100%', maxWidth: '1200px', padding: '2rem 1.5rem', margin: '0 auto' }}>
      
      {/* Hero Badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <span className="badge-cyan glowing-border animate-pop" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
          <Sparkles size={16} color="var(--accent-cyan)" />
          {t('heroBadge')}
        </span>
      </div>

      {/* Main Hero Heading */}
      <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 1.5rem auto' }}>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 800, lineHeight: 1.25, marginBottom: '1.25rem', color: '#ffffff' }}>
          {t('heroTitle')}
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '780px', margin: '0 auto' }}>
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Primary Call to Action Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        <button 
          onClick={onOpenDashboard}
          className="btn-primary glowing-border"
          style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: '16px' }}
        >
          {t('openDashboard')} <ArrowRight size={20} />
        </button>

        <button 
          onClick={onOpenStudio}
          className="btn-secondary"
          style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: '16px' }}
        >
          <Sparkles size={20} color="var(--accent-cyan)" />
          {t('tryAiStudio')}
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="glass-panel" style={{ padding: '1.75rem 2rem', borderRadius: '24px', marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-primary)', fontFamily: 'var(--font-family-heading)' }}>100%</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statSpeechStream')}</div>
        </div>

        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', fontFamily: 'var(--font-family-heading)' }}>0ms</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statSubtitles')}</div>
        </div>

        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-family-heading)' }}>3</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statLanguages')}</div>
        </div>

        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-secondary)', fontFamily: 'var(--font-family-heading)' }}>4</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t('statProfiles')}</div>
        </div>
      </div>

      {/* Assistive Profiles Interactive Simulator */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '1.25rem', textAlign: 'center' }}>
          {t('simulatorTitle')} <span style={{ color: 'var(--accent-cyan)' }}>ACTIVE: {activeProfile.toUpperCase()}</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          
          {/* Visual Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('visual'); onOpenDashboard(); }}
            className={`glass-card ${activeProfile === 'visual' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(99,102,241,0.2)' }}>
                <Eye size={24} color="var(--accent-primary)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{t('visualAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simVisualDesc')}
            </p>
          </div>

          {/* Hearing Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('hearing'); onOpenDashboard(); }}
            className={`glass-card ${activeProfile === 'hearing' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(16,185,129,0.2)' }}>
                <Ear size={24} color="var(--accent-emerald)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{t('hearingAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simHearingDesc')}
            </p>
          </div>

          {/* Cognitive Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('cognitive'); onOpenDashboard(); }}
            className={`glass-card ${activeProfile === 'cognitive' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(6,182,212,0.2)' }}>
                <Brain size={24} color="var(--accent-cyan)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{t('cognitiveDyslexia')}</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simCognitiveDesc')}
            </p>
          </div>

          {/* Motor Assist Card */}
          <div 
            onClick={() => { applyProfilePreset('motor'); onOpenDashboard(); }}
            className={`glass-card ${activeProfile === 'motor' ? 'glowing-border' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(168,85,247,0.2)' }}>
                <Accessibility size={24} color="var(--accent-secondary)" />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{t('motorAssist')}</h4>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              {t('simMotorDesc')}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

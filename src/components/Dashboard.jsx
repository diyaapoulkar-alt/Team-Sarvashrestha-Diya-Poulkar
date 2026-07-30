import React from 'react';
import { Camera, Mic, Brain, Calculator, Sparkles, ShieldCheck } from 'lucide-react';
import VisionAssist from './tools/VisionAssist';
import LectureCaptioner from './tools/LectureCaptioner';
import CognitiveSimplifier from './tools/CognitiveSimplifier';
import LatexMathReader from './tools/LatexMathReader';
import SaathiChatbot from './SaathiChatbot';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';

export default function Dashboard() {
  const { activeProfile, targetLanguage, groqKey, activeTool, setActiveTool } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  return (
    <div className="animate-fade-up" style={{ width: '100%', maxWidth: '1400px', padding: '2rem 1.5rem 4rem 1.5rem', color: '#0f172a' }}>
      
      {/* Dashboard Top Banner */}
      <div className="glass-panel animate-pop" style={{ padding: '1.5rem', borderRadius: '24px', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {t('opsHub')}
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#0f172a' }}>
            {t('dashTitle')}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="badge" style={{ padding: '0.4rem 0.85rem' }}>
            Profile: {activeProfile.toUpperCase()}
          </span>

          <span className="badge-cyan" style={{ padding: '0.4rem 0.85rem' }}>
            Lang: {targetLanguage.toUpperCase()}
          </span>

          <span className={groqKey ? "badge-emerald" : "badge"} style={{ padding: '0.4rem 0.85rem' }}>
            <ShieldCheck size={14} /> {groqKey ? "Groq Cloud Active" : "Sample Demo Mode"}
          </span>
        </div>
      </div>

      {/* Tool Tabs Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        
        <button 
          onClick={() => setActiveTool('vision')}
          className={`glass-card ${activeTool === 'vision' ? 'glowing-border' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'left', border: activeTool === 'vision' ? '2px solid var(--accent-primary)' : '1px solid var(--border-color)', padding: '1rem', background: activeTool === 'vision' ? '#ffffff' : 'rgba(241, 245, 249, 0.95)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(71,85,105,0.15)' }}>
              <Camera size={20} color="var(--accent-primary)" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{t('visionTitle')}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('visionSub')}</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('captioner')}
          className={`glass-card ${(activeTool === 'captioner' || activeTool === 'caption') ? 'glowing-border' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'left', border: (activeTool === 'captioner' || activeTool === 'caption') ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)', padding: '1rem', background: (activeTool === 'captioner' || activeTool === 'caption') ? '#ffffff' : 'rgba(241, 245, 249, 0.95)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(5,150,105,0.15)' }}>
              <Mic size={20} color="var(--accent-emerald)" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{t('captionTitle')}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('captionSub')}</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('simplifier')}
          className={`glass-card ${activeTool === 'simplifier' ? 'glowing-border' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'left', border: activeTool === 'simplifier' ? '2px solid var(--accent-cyan)' : '1px solid var(--border-color)', padding: '1rem', background: activeTool === 'simplifier' ? '#ffffff' : 'rgba(241, 245, 249, 0.95)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(2,132,199,0.15)' }}>
              <Brain size={20} color="var(--accent-cyan)" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{t('simplifierTitle')}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('simplifierSub')}</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('latex')}
          className={`glass-card ${(activeTool === 'latex' || activeTool === 'math') ? 'glowing-border' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'left', border: (activeTool === 'latex' || activeTool === 'math') ? '2px solid var(--accent-secondary)' : '1px solid var(--border-color)', padding: '1rem', background: (activeTool === 'latex' || activeTool === 'math') ? '#ffffff' : 'rgba(241, 245, 249, 0.95)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(100,116,139,0.15)' }}>
              <Calculator size={20} color="var(--accent-secondary)" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{t('latexTitle')}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('latexSub')}</span>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setActiveTool('chatgpt')}
          className={`glass-card ${activeTool === 'chatgpt' ? 'glowing-border' : ''}`}
          style={{ cursor: 'pointer', textAlign: 'left', border: activeTool === 'chatgpt' ? '2px solid #0284c7' : '1px solid var(--border-color)', padding: '1rem', background: activeTool === 'chatgpt' ? '#ffffff' : 'rgba(241, 245, 249, 0.95)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '10px', background: 'rgba(2,132,199,0.2)' }}>
              <Sparkles size={20} color="#0284c7" />
            </div>
            <div>
              <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{t('studioTitle')}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('studioSub')}</span>
            </div>
          </div>
        </button>

      </div>

      {/* Active Tool View Container */}
      <div className="glass-panel animate-pop" style={{ padding: '2rem', borderRadius: '24px' }}>
        {activeTool === 'vision' && <VisionAssist />}
        {(activeTool === 'captioner' || activeTool === 'caption') && <LectureCaptioner />}
        {activeTool === 'simplifier' && <CognitiveSimplifier />}
        {(activeTool === 'latex' || activeTool === 'math') && <LatexMathReader />}
        {activeTool === 'chatgpt' && <SaathiChatbot isFullPage={true} />}
      </div>

    </div>
  );
}

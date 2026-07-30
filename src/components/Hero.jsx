import React from 'react';
import { useAccessibility } from '../context/AccessibilityContext';
import { 
  Sparkles, Eye, Ear, Brain, Calculator, ArrowRight, Award, Zap, ShieldCheck, CheckCircle2, Users
} from 'lucide-react';

export default function Hero({ onLaunchDashboard }) {
  const { activeProfile, applyProfilePreset } = useAccessibility();

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '3.5rem 1.25rem 4rem 1.25rem' }}>
      
      {/* Dynamic Glowing Radial Backgrounds */}
      <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '5%', right: '15%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(6,182,212,0.25) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '3.5rem' }}>
        
        {/* Main Hero Header */}
        <div className="animate-fade-up" style={{ textAlign: 'center', maxWidth: '920px', margin: '0 auto' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.15)', border: '1px solid rgba(99, 102, 241, 0.4)', padding: '0.45rem 1.25rem', borderRadius: '9999px', marginBottom: '1.5rem' }} className="animate-pop">
            <Sparkles size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Empowering Inclusive Campus Education
            </span>
          </div>

          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem', lineHeight: 1.12 }}>
            Universal Learning with <br />
            <span className="gradient-text">Multimodal AI Accessibility</span>
          </h1>

          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.65, fontWeight: 400 }}>
            Saathi bridges the accessibility gap in university classrooms. Real-time visual scene descriptions, live lecture captioning with zero-latency streaming, cognitive textbook simplification, and math formula speech synthesis—all in one unified copilot.
          </p>

          {/* Call to Action */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button 
              onClick={onLaunchDashboard}
              className="btn-primary glowing-border"
              style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '16px' }}
            >
              Launch Copilot Dashboard <ArrowRight size={20} />
            </button>
          </div>

          {/* Glowing Stats Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-primary)' }}>100%</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Real-Time Speech Stream</p>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>0ms</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Zero-Latency Subtitles</p>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>3+</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Supported Languages</p>
            </div>
            <div className="glass-panel" style={{ padding: '1rem', borderRadius: '16px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>4</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Assistive Profiles</p>
            </div>
          </div>

          {/* Quick Preset Simulator Bar */}
          <div className="glass-panel animate-pop" style={{ padding: '1.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', border: '2px solid rgba(255, 255, 255, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Zap size={18} color="var(--accent-cyan)" /> Live Accessibility Profile Simulator:
              </span>
              <span className="badge-emerald">
                ACTIVE: {activeProfile.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              
              <div 
                onClick={() => applyProfilePreset('visual')}
                className={`glass-card ${activeProfile === 'visual' ? 'glowing-border' : ''}`}
                style={{ cursor: 'pointer', padding: '1rem', border: activeProfile === 'visual' ? '2px solid var(--accent-primary)' : '' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <Eye size={20} color="var(--accent-primary)" />
                  <strong style={{ fontSize: '1rem', color: '#ffffff' }}>Visual Assist</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>High contrast, audio reader, large tap targets for blind/low-vision students.</p>
              </div>

              <div 
                onClick={() => applyProfilePreset('hearing')}
                className={`glass-card ${activeProfile === 'hearing' ? 'glowing-border' : ''}`}
                style={{ cursor: 'pointer', padding: '1rem', border: activeProfile === 'hearing' ? '2px solid var(--accent-emerald)' : '' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <Ear size={20} color="var(--accent-emerald)" />
                  <strong style={{ fontSize: '1rem', color: '#ffffff' }}>Hearing Assist</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Live scrolling subtitles, visual flash indicators, Hindi/English translations.</p>
              </div>

              <div 
                onClick={() => applyProfilePreset('cognitive')}
                className={`glass-card ${activeProfile === 'cognitive' ? 'glowing-border' : ''}`}
                style={{ cursor: 'pointer', padding: '1rem', border: activeProfile === 'cognitive' ? '2px solid var(--accent-cyan)' : '' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <Brain size={20} color="var(--accent-cyan)" />
                  <strong style={{ fontSize: '1rem', color: '#ffffff' }}>Cognitive / Dyslexia</strong>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>OpenDyslexic typography, 5th-grade text simplification, audio player.</p>
              </div>

            </div>
          </div>

        </div>

        {/* Feature Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          
          <div className="glass-card animate-fade-up">
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(99, 102, 241, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Eye size={26} color="var(--accent-primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Describe This (Vision AI)</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Point camera at lab manuals, oscilloscope screens, or blackboards. Groq AI reads out step-by-step spatial instructions automatically.
            </p>
          </div>

          <div className="glass-card animate-fade-up">
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Ear size={26} color="var(--accent-emerald)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Live Lecture Captioning</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Stream live lecture audio into high-contrast subtitles with real-time translation (English, Hindi, Marathi) and instant transcript export.
            </p>
          </div>

          <div className="glass-card animate-fade-up">
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(6, 182, 212, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Brain size={26} color="var(--accent-cyan)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Cognitive Textbook Simplifier</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Upload dense PDFs or paste text. Select reading levels (5th Grade, High School) with strict anti-hallucination source grounding.
            </p>
          </div>

          <div className="glass-card animate-fade-up">
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <Calculator size={26} color="var(--accent-secondary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: '#ffffff' }}>Math & LaTeX Speech Reader</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Converts complex mathematical LaTeX expressions into natural spoken English voice output and structured symbol breakdowns.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

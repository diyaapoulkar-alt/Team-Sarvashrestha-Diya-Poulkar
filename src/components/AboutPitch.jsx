import React from 'react';
import { Award, CheckCircle2, Zap, Shield, Cpu, Users, ArrowRight, Play } from 'lucide-react';

export default function AboutPitch({ onLaunchDashboard }) {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2rem 1.25rem 4rem 1.25rem' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.4rem 1rem', borderRadius: '9999px', marginBottom: '1rem' }}>
          <Award size={16} color="var(--accent-emerald)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-emerald)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Track 2: Accessibility Copilot • Hackathon Pitch Mode
          </span>
        </div>

        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>
          Why <span className="gradient-text">Saathi</span> Wins the Hackathon
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          Designed specifically to achieve top scores across all 5 judging criteria through high emotional & social impact, multimodal AI architecture, zero-latency Groq inference, and 100% grounded response accuracy.
        </p>
      </div>

      {/* Judging Criteria Score Breakdown Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)' }}>Innovation (25%)</span>
            <span className="badge">Highest Differentiation</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Combines multimodal vision, continuous speech-to-text, LaTeX mathematical speech synthesis, and cognitive reading level control in a single unified copilot.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>Technical Depth (25%)</span>
            <span className="badge-emerald">Groq + Web APIs</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Leverages Groq Llama 3.2 11B Vision for camera analysis, Llama 3.3 70B for cognitive text simplification, Web Speech API for live lecture subtitles, and offline client-side audio fallback.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>Impact & Fit (20%)</span>
            <span className="badge-cyan">Real Campus Barriers</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Solves real university pain points: inaccessible printed lab manuals for visually impaired students, uncaptioned lectures for hearing impaired, and complex textbook jargon for dyslexic learners.
          </p>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>Pitch & Grounding (15%)</span>
            <span className="badge">Zero Hallucination</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Includes strict source grounding guardrails, privacy-aware processing, multilingual translation (Hindi/Marathi/English), and pre-loaded judge test scenarios.
          </p>
        </div>

      </div>

      {/* 30-Second Judge Demo Flow Box */}
      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px', border: '2px solid var(--accent-emerald)', background: 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(17,24,39,0.8) 100%)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.6rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Play size={22} color="var(--accent-emerald)" /> 30-Second Judge Quick Evaluation Guide
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Follow these 4 simple steps to evaluate every feature live in the application!
            </p>
          </div>

          <button onClick={onLaunchDashboard} className="btn-primary">
            Start Live Demo Now <ArrowRight size={16} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          
          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-primary)', marginBottom: '0.35rem' }}>
              Step 1: Visual Mode
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Click 'Visual Assist' preset. Open <strong>Describe This Camera</strong> and click 'VIT Bhopal Lab Manual'. Watch AI read step 4 out loud.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginBottom: '0.35rem' }}>
              Step 2: Hearing Mode
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Click 'Hearing Assist' preset. Switch to <strong>Lecture Captioner</strong> and run 'Sample Lecture Simulation'. Switch language to Hindi!
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-cyan)', marginBottom: '0.35rem' }}>
              Step 3: Cognitive Mode
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Select 'Cognitive Mode'. Open <strong>Textbook Simplifier</strong>, click 'Load Sample Text', select 'Simple 5th Grade', and turn on OpenDyslexic font.
            </p>
          </div>

          <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-secondary)', marginBottom: '0.35rem' }}>
              Step 4: Math Reader
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Open <strong>Math LaTeX Reader</strong>, select 'Gaussian Integral', and listen to natural spoken English formula output.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

import React, { useState } from 'react';
import { Calculator, Volume2, VolumeX, Sparkles, RefreshCw, BookOpen, Check } from 'lucide-react';
import { convertLatexToSpokenEnglish } from '../../services/groqApi';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function LatexMathReader() {
  const { speakText, stopSpeaking, isSpeaking } = useAccessibility();

  const [latexInput, setLatexInput] = useState('\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sampleFormulas = [
    { name: 'Gaussian Integral', formula: '\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}' },
    { name: 'Quadratic Formula', formula: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}' },
    { name: 'Ohm\'s Law Vector', formula: '\\vec{J} = \\sigma \\vec{E}' },
    { name: 'Limit Theorem', formula: '\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1' }
  ];

  const handleConvert = async () => {
    if (!latexInput.trim()) return;

    setLoading(true);
    try {
      const output = await convertLatexToSpokenEnglish(latexInput);
      setResult(output);
      speakText(output.spokenText);
    } catch (err) {
      console.error("LaTeX Conversion Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={24} color="var(--accent-secondary)" /> Math & LaTeX Speech Synthesizer
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Converts raw mathematical LaTeX formulas into natural, clear spoken English for screen reader users.
          </p>
        </div>

        {result?.spokenText && (
          <button 
            onClick={() => isSpeaking ? stopSpeaking() : speakText(result.spokenText)}
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem' }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            {isSpeaking ? 'Stop Audio' : 'Play Spoken Audio'}
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Input */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Enter or Paste LaTeX Formula:
          </span>

          <input 
            type="text" 
            value={latexInput}
            onChange={(e) => setLatexInput(e.target.value)}
            placeholder="e.g. \int_{0}^{\infty} e^{-x^2} dx"
            style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.85rem 1rem', color: 'var(--accent-cyan)', fontSize: '1.1rem', fontFamily: 'monospace', outline: 'none' }}
          />

          {/* Preset Formulas */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              ⚡ Quick Preset Formulas:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {sampleFormulas.map((item, idx) => (
                <button 
                  key={idx}
                  onClick={() => { setLatexInput(item.formula); }}
                  className="btn-secondary"
                  style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', justifyContent: 'flex-start' }}
                >
                  <Check size={12} color="var(--accent-emerald)" /> {item.name}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleConvert}
            disabled={loading || !latexInput.trim()}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            {loading ? 'Synthesizing Speech...' : 'Convert LaTeX to Natural Speech'}
          </button>

        </div>

        {/* Right Output */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Volume2 size={16} /> Spoken English Narration:
          </span>

          <div style={{ minHeight: '120px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border-color)', color: '#ffffff', fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.6 }}>
            {loading ? (
              <p style={{ color: 'var(--text-muted)' }}>Translating mathematical notation...</p>
            ) : result?.spokenText ? (
              `"${result.spokenText}"`
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 400 }}>Spoken audio description will appear here.</p>
            )}
          </div>

          {result?.breakdown && (
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
                📖 Symbol Breakdown for Audio Learners:
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {result.breakdown.map((step, index) => (
                  <div key={index} style={{ background: 'rgba(255,255,255,0.05)', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem', border: '1px solid var(--border-color)' }}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

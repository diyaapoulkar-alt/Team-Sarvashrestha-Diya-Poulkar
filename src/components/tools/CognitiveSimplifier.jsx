import React, { useState } from 'react';
import { Brain, FileText, Sparkles, Volume2, VolumeX, ShieldCheck, Globe, RefreshCw, CheckCircle2 } from 'lucide-react';
import { simplifyTextWithGroq } from '../../services/groqApi';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function CognitiveSimplifier() {
  const { 
    readingLevel, setReadingLevel, 
    targetLanguage, setTargetLanguage, 
    useOpenDyslexic, setUseOpenDyslexic,
    speakText, stopSpeaking, isSpeaking 
  } = useAccessibility();

  const [sourceText, setSourceText] = useState('');
  const [simplifiedOutput, setSimplifiedOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [strictPrivacy, setStrictPrivacy] = useState(true);

  // Pre-loaded complex engineering text sample for hackathon judging
  const denseSample = `Electromagnetic induction is the process by which a conductor placed in a changing magnetic field causes the production of a voltage across the conductor. This process of electromagnetic induction, in turn, causes an electrical current. Faraday's law of induction states that the electromotive force induced in any closed circuit is equal to the negative rate of change of the magnetic flux through the circuit. Quantitatively, \\varepsilon = - \\frac{d\\Phi_B}{dt}. In practical transformers, laminated soft iron cores are utilized to minimize energy loss attributable to eddy currents.`;

  const handleSimplify = async () => {
    if (!sourceText.trim()) return;

    setLoading(true);
    setSimplifiedOutput('');

    try {
      const output = await simplifyTextWithGroq(sourceText, readingLevel, targetLanguage, strictPrivacy);
      setSimplifiedOutput(output);
      speakText(output.replace(/[*#📌]/g, ''));
    } catch (err) {
      console.error("Simplifier Error:", err);
      setSimplifiedOutput("Failed to simplify text. Please check Groq API key or try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadSampleText = () => {
    setSourceText(denseSample);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: '#0f172a' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Brain size={24} color="var(--accent-cyan)" /> Cognitive PDF & Textbook Simplifier
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Powered by Groq Llama 3.3 70B. Rewrites dense academic textbooks into clear bullet points tailored to your reading level.
          </p>
        </div>

        {simplifiedOutput && (
          <button 
            onClick={() => isSpeaking ? stopSpeaking() : speakText(simplifiedOutput.replace(/[*#📌]/g, ''))}
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem' }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            {isSpeaking ? 'Stop Audio Player' : 'Play Audio Reader'}
          </button>
        )}
      </div>

      {/* Control Bar for Level & Privacy */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Reading Level Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>Target Level:</span>
          
          <button 
            onClick={() => setReadingLevel('elementary')} 
            className={`btn-secondary ${readingLevel === 'elementary' ? 'badge-cyan' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            Simple (5th Grade)
          </button>

          <button 
            onClick={() => setReadingLevel('highschool')} 
            className={`btn-secondary ${readingLevel === 'highschool' ? 'badge' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            High School
          </button>

          <button 
            onClick={() => setReadingLevel('audio')} 
            className={`btn-secondary ${readingLevel === 'audio' ? 'badge-emerald' : ''}`}
            style={{ padding: '0.35rem 0.75rem', fontSize: '0.85rem' }}
          >
            Audio-First Bullets
          </button>
        </div>

        {/* Anti-Hallucination Privacy Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-emerald)' }}>
            <input 
              type="checkbox" 
              checked={strictPrivacy} 
              onChange={(e) => setStrictPrivacy(e.target.checked)}
              style={{ accentColor: 'var(--accent-emerald)', width: '16px', height: '16px' }}
            />
            <ShieldCheck size={16} /> Strict Source Grounding (Zero Hallucination)
          </label>
        </div>

      </div>

      {/* Main Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Raw Source Text Input */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#ffffff' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FileText size={16} /> Paste Textbook Text or Notes:
            </span>

            <button 
              onClick={loadSampleText}
              className="btn-secondary"
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
            >
              Load Sample Text
            </button>
          </div>

          <textarea 
            rows={10}
            placeholder="Paste your complex textbook paragraph, PDF notes, or lab manual content here..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            style={{ width: '100%', background: '#f8fafc', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', color: '#0f172a', fontSize: '0.95rem', fontFamily: 'inherit', resize: 'vertical', outline: 'none', fontWeight: 500 }}
          />

          <button 
            onClick={handleSimplify}
            disabled={loading || !sourceText.trim()}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            {loading ? 'Groq Llama 3.3 70B Simplifying...' : 'Simplify & Generate Audio'}
          </button>

        </div>

        {/* Right Column: Simplified Output */}
        <div className="glass-panel" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#ffffff' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={16} /> Cognitive Simplified Output:
            </span>

            <button 
              onClick={() => setUseOpenDyslexic(!useOpenDyslexic)}
              className={`btn-secondary ${useOpenDyslexic ? 'badge-cyan' : ''}`}
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
            >
              OpenDyslexic Font {useOpenDyslexic ? 'ON' : 'OFF'}
            </button>
          </div>

          <div style={{ flex: 1, minHeight: '260px', background: '#f8fafc', borderRadius: '12px', padding: '1.25rem', border: '1px solid var(--border-color)', whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: 1.7, overflowY: 'auto', color: '#0f172a', fontWeight: 600 }}>
            {loading ? (
              <div style={{ textAlign: 'center', paddingTop: '4rem', color: 'var(--text-muted)' }}>
                <p>Generating grounded simplification at {readingLevel.toUpperCase()} level...</p>
              </div>
            ) : simplifiedOutput ? (
              simplifiedOutput
            ) : (
              <div style={{ textAlign: 'center', paddingTop: '4rem', color: 'var(--text-muted)' }}>
                <p>Simplified output will appear here with audio speech synthesis controls.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

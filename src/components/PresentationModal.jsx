import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Download, Monitor, Layers, Cpu, CheckCircle, ExternalLink, FileText, Sparkles } from 'lucide-react';

export default function PresentationModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('slides'); // 'slides' | 'architecture' | 'workflow'
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen) return null;

  const slidesData = [
    {
      title: "Saathi — Your Multimodal AI Accessibility Copilot",
      category: "TRACK 2: AI AGENT / ACCESSIBILITY COPILOT (SOFC 2.0)",
      subtitle: "PROPOSED BY TEAM SARVASHRESTHA",
      content: (
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#38bdf8', marginBottom: '1rem' }}>
            Saathi — Universal Learning with Multimodal AI Accessibility
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#cbd5e1', maxWidth: '800px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Bridges the accessibility gap in university classrooms with Real-Time Visual Scene OCR, Live Speech Subtitles, Cognitive Simplification & LaTeX Math Speech Synthesis.
          </p>
          <div style={{ display: 'inline-flex', gap: '1rem', background: '#1e293b', padding: '1rem 2rem', borderRadius: '16px', border: '1px solid #38bdf8' }}>
            <span style={{ color: '#ec4899', fontWeight: 700 }}>⚡ 0ms Latency Speech</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#10b981', fontWeight: 700 }}>🌐 3 Languages (EN, HI, MR)</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ color: '#f59e0b', fontWeight: 700 }}>👩‍🏫 Saathi AI Studio</span>
          </div>
        </div>
      )
    },
    {
      title: "The Problem & Our Solution",
      category: "PROBLEM & SOLUTION",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1rem' }}>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #ec4899' }}>
            <h3 style={{ color: '#ec4899', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>❌ The Problem</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>Students with disabilities juggle 5+ disconnected tools (screen reader, captioner, translator, PDF reader).</li>
              <li>No existing app understands the student's personal accessibility profile across sensory needs.</li>
              <li>Suffer high latency, complex UI setups, or costly app subscriptions.</li>
              <li>Campuses lack a single unified accessibility layer for inclusive classrooms.</li>
            </ul>
          </div>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #10b981' }}>
            <h3 style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>✨ The Saathi Solution</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>Single PWA powered by Personalization-Aware Modality Router (PAMR).</li>
              <li>Set profile once — Visual, Hearing, Cognitive, or Math Assist.</li>
              <li>Automatic routing to Vision AI OCR, 0ms Live Speech Subtitles & 5th-Grade Simplifier.</li>
              <li>Includes Saathi AI Studio with Chibi AI Lady Tutor for interactive campus study.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Core Assistive Features & Profiles",
      category: "KEY INNOVATIONS",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8', fontWeight: 800 }}>👁️ Visual Assist Profile</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem' }}>Llama-3.2 Vision & OCR for printed notes, environment photos & audio screen reader.</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #ec4899' }}>
            <h4 style={{ color: '#ec4899', fontWeight: 800 }}>🎤 Hearing Assist Profile</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem' }}>0ms latency live classroom speech subtitles with instant Hindi & Marathi translation.</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #10b981' }}>
            <h4 style={{ color: '#10b981', fontWeight: 800 }}>🧠 Cognitive Assist Profile</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem' }}>5th-grade textbook simplifier with OpenDyslexic font & rich markdown highlights.</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f59e0b' }}>
            <h4 style={{ color: '#f59e0b', fontWeight: 800 }}>📐 Math & LaTeX Assist</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.5rem' }}>Phonetic math formula speech synthesis & symbol breakdown engine.</p>
          </div>
        </div>
      )
    },
    {
      title: "System Architecture: PAMR Framework",
      category: "TECHNICAL DESIGN",
      content: (
        <div style={{ textAlign: 'center' }}>
          <img src="/architecture_diagram.png" alt="Saathi Architecture Diagram" style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '12px', border: '1px solid #38bdf8' }} />
        </div>
      )
    },
    {
      title: "End-to-End User Workflow & Data Pipeline",
      category: "PROCESS FLOWCHART",
      content: (
        <div style={{ textAlign: 'center' }}>
          <img src="/workflow_diagram.png" alt="Saathi Workflow Diagram" style={{ maxWidth: '100%', maxHeight: '420px', borderRadius: '12px', border: '1px solid #10b981' }} />
        </div>
      )
    },
    {
      title: "Full Site Multilingual Translation Engine",
      category: "ACCESSIBILITY & LOCALIZATION",
      content: (
        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #38bdf8', marginTop: '1rem' }}>
          <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>🌐 3 Supported Languages: English, Hindi (हिंदी), Marathi (मराठी)</h3>
          <ul style={{ color: '#cbd5e1', lineHeight: 2, fontSize: '1rem' }}>
            <li><strong>Instant Dynamic Language Switcher:</strong> Selecting a language changes the ENTIRE website in real time.</li>
            <li><strong>Complete UI Coverage:</strong> Navbar, Hero Section, Sidebar Navigation, Tool Headers & Controls update seamlessly.</li>
            <li><strong>AI Multilingual Inference:</strong> Groq AI Engine generates study summaries in the student's selected language.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Saathi AI Studio & Chibi Lady Tutor",
      category: "AI TUTOR COPILOT",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: '1.5rem', alignItems: 'center', marginTop: '1rem' }}>
          <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '16px', border: '1px solid #ec4899' }}>
            <h3 style={{ color: '#ec4899', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem' }}>👩‍🏫 Interactive Lady AI Tutor</h3>
            <ul style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '0.95rem' }}>
              <li>Dedicated Saathi AI Studio accessible directly from the left sidebar.</li>
              <li>Features your anime Lady Educator character with glasses & pointer stick.</li>
              <li>Interactive 1-Click Chips: Pop Quiz Master, 5th-Grade Story, Academic Joke & Motivation.</li>
            </ul>
          </div>
          <div style={{ textAlign: 'center', background: '#1e293b', padding: '1rem', borderRadius: '16px', border: '1px solid #ec4899' }}>
            <img src="/lady_tutor.png" alt="Lady AI Tutor" style={{ width: '160px', height: '180px', objectFit: 'contain' }} />
            <p style={{ color: '#ec4899', fontWeight: 700, fontSize: '0.85rem', marginTop: '0.5rem' }}>Prof. Saathi AI</p>
          </div>
        </div>
      )
    },
    {
      title: "Updated Technical Stack",
      category: "ARCHITECTURE & TECH",
      content: (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '1rem' }}>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #38bdf8' }}>
            <h4 style={{ color: '#38bdf8', fontWeight: 800 }}>Frontend PWA</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>React 18 + Vite Progressive Web App (Zero Install, cross-device)</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #ec4899' }}>
            <h4 style={{ color: '#ec4899', fontWeight: 800 }}>AI Inference Engine</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>Groq Llama-3.3-70b-versatile & Llama-3.2-11b-vision-preview</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #10b981' }}>
            <h4 style={{ color: '#10b981', fontWeight: 800 }}>Speech & OCR APIs</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>Web Speech API, SpeechSynthesis & Tesseract.js fallback</p>
          </div>
          <div style={{ background: '#1e293b', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f59e0b' }}>
            <h4 style={{ color: '#f59e0b', fontWeight: 800 }}>Design System</h4>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', marginTop: '0.4rem' }}>Platinum Silver & Dark Charcoal Theme with Lucide Icons</p>
          </div>
        </div>
      )
    },
    {
      title: "Team Sarvashrestha & Live Links",
      category: "PROJECT DEMO",
      content: (
        <div style={{ background: '#1e293b', padding: '1.75rem', borderRadius: '16px', border: '1px solid #10b981', marginTop: '1rem', textAlign: 'center' }}>
          <h3 style={{ color: '#10b981', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>🏆 Team Sarvashrestha</h3>
          <p style={{ color: '#cbd5e1', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Track 2: AI Agent / Accessibility Copilot (SOFC 2.0)</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://team-sarvashrestha-diya-poulkar.vercel.app/" target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.95rem' }}>
              <ExternalLink size={18} /> Open Live Vercel App
            </a>
            <a href="/saathi-sarvasretha.pptx" download className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.95rem', background: '#334155', color: '#ffffff' }}>
              <Download size={18} /> Download PowerPoint (.PPTX)
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }} className="animate-fade-up">
      <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '24px', width: '1100px', maxWidth: '95vw', height: '680px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.5)', color: '#f8fafc' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '1rem 1.5rem', background: '#1e293b', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText color="#38bdf8" size={24} />
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc' }}>Saathi Project PPT & Architecture Deck</h3>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600 }}>SOFC 2.0 | Team Sarvashrestha</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setActiveTab('slides')} className={`btn-secondary ${activeTab === 'slides' ? 'active' : ''}`} style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', background: activeTab === 'slides' ? '#38bdf8' : '#334155', color: '#ffffff' }}>
              <Monitor size={14} /> Slide Deck ({slidesData.length})
            </button>
            <button onClick={() => setActiveTab('architecture')} className={`btn-secondary ${activeTab === 'architecture' ? 'active' : ''}`} style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', background: activeTab === 'architecture' ? '#38bdf8' : '#334155', color: '#ffffff' }}>
              <Layers size={14} /> System Architecture
            </button>
            <button onClick={() => setActiveTab('workflow')} className={`btn-secondary ${activeTab === 'workflow' ? 'active' : ''}`} style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', background: activeTab === 'workflow' ? '#38bdf8' : '#334155', color: '#ffffff' }}>
              <Cpu size={14} /> Workflow Diagram
            </button>
            
            <a href="/saathi-sarvasretha.pptx" download className="btn-primary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
              <Download size={14} /> Download PPTX
            </a>

            <button onClick={onClose} className="btn-secondary" style={{ padding: '0.45rem', borderRadius: '50%', background: '#334155', color: '#ffffff' }}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          
          {activeTab === 'slides' && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.82rem', color: '#ec4899', fontWeight: 800, letterSpacing: '1px', marginBottom: '0.25rem' }}>
                  {slidesData[currentSlide].category}
                </div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', marginBottom: '1rem' }}>
                  {slidesData[currentSlide].title}
                </h2>
                {slidesData[currentSlide].content}
              </div>

              {/* Carousel Controls */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid #1e293b' }}>
                <button 
                  onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                  disabled={currentSlide === 0}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', opacity: currentSlide === 0 ? 0.4 : 1, background: '#1e293b', color: '#ffffff' }}
                >
                  <ChevronLeft size={18} /> Previous
                </button>

                <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600 }}>
                  Slide {currentSlide + 1} of {slidesData.length}
                </span>

                <button 
                  onClick={() => setCurrentSlide(prev => Math.min(slidesData.length - 1, prev + 1))}
                  disabled={currentSlide === slidesData.length - 1}
                  className="btn-secondary"
                  style={{ padding: '0.5rem 1rem', opacity: currentSlide === slidesData.length - 1 ? 0.4 : 1, background: '#1e293b', color: '#ffffff' }}
                >
                  Next <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.75rem' }}>
                PAMR System Architecture Diagram
              </h3>
              <img src="/architecture_diagram.png" alt="Saathi System Architecture Diagram" style={{ maxWidth: '100%', maxHeight: '480px', borderRadius: '14px', border: '2px solid #38bdf8' }} />
            </div>
          )}

          {activeTab === 'workflow' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981', marginBottom: '0.75rem' }}>
                End-to-End User Data Workflow Flowchart
              </h3>
              <img src="/workflow_diagram.png" alt="Saathi Workflow Diagram" style={{ maxWidth: '100%', maxHeight: '480px', borderRadius: '14px', border: '2px solid #10b981' }} />
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

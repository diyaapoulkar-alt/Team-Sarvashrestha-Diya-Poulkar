import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, HelpCircle, Gamepad2, Lightbulb, Smile, Award, Maximize2, Minimize2, RefreshCw, Radio, BookOpen, CheckCircle } from 'lucide-react';
import { askSaathiAssistant } from '../services/groqApi';
import { useAccessibility } from '../context/AccessibilityContext';
import SaathiLogoIcon from './SaathiLogoIcon';
import LadyTutorAvatar from './LadyTutorAvatar';

export default function SaathiChatbot({ isFullPage = false }) {
  const { speakText, isSpeaking, stopSpeaking } = useAccessibility();
  const [isOpen, setIsOpen] = useState(isFullPage);
  const [isExpanded, setIsExpanded] = useState(isFullPage);
  const [isMicActive, setIsMicActive] = useState(false);

  const greetingText = 'Namaste! Bonjour! Hello! Konnichiwa! ¡Hola! I am Sunshine, your tutor at Saathi AI Studio. Ask me any academic concept, homework question, or click one of the interactive study modes!';

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saathi',
      text: greetingText
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const lastSpokenRef = useRef('');
  const isMicActiveRef = useRef(false);

  useEffect(() => {
    isMicActiveRef.current = isMicActive;
  }, [isMicActive]);

  useEffect(() => {
    if (isOpen || isFullPage) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isFullPage]);

  // Rich Markdown & Bullet Point Renderer for Chatbot Messages
  const renderFormattedMessage = (text) => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements = [];

    lines.forEach((line, index) => {
      let trimmed = line.trim();

      if (!trimmed) {
        elements.push(<div key={`br-${index}`} style={{ height: '0.4rem' }} />);
        return;
      }

      const parts = trimmed.split(/(\*\*.*?\*\*)/g);
      const lineContent = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} style={{ color: '#0284c7', fontWeight: 800 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (trimmed.startsWith('**') && (trimmed.endsWith(':**') || trimmed.endsWith('**'))) {
        elements.push(
          <div key={index} style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '0.6rem', marginBottom: '0.3rem', fontFamily: 'var(--font-family-heading)' }}>
            {lineContent}
          </div>
        );
      }
      else if (trimmed.startsWith('* ') || trimmed.startsWith('+ ') || trimmed.startsWith('- ')) {
        const bulletText = trimmed.substring(2);
        const bulletParts = bulletText.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={pIdx} style={{ color: '#0369a1', fontWeight: 800 }}>
                {part.slice(2, -2)}
              </strong>
            );
          }
          return part;
        });

        elements.push(
          <div key={index} style={{ display: 'flex', gap: '0.5rem', marginLeft: trimmed.startsWith('+ ') ? '1.25rem' : '0.4rem', marginTop: '0.2rem' }}>
            <span style={{ color: '#0284c7', fontWeight: 800 }}>•</span>
            <span style={{ flex: 1 }}>{bulletParts}</span>
          </div>
        );
      }
      else {
        elements.push(
          <p key={index} style={{ marginBottom: '0.35rem', lineHeight: 1.6 }}>
            {lineContent}
          </p>
        );
      }
    });

    return elements;
  };

  // Academic Phonetic Auto-Corrector for Mic Input Accuracy
  const fastCorrect = (text) => {
    if (!text) return '';
    let c = text;
    c = c.replace(/\b(can u hear me|can you hear|can u hear)\b/gi, 'can you hear me');
    c = c.replace(/\b(all law|om law|oms law|arm law)\b/gi, "Ohm's Law");
    c = c.replace(/\b(kirchoff|kirkoff|kirchoff's)\b/gi, "Kirchhoff's Law");
    c = c.replace(/\b(diode|diodes)\b/gi, 'P-N Junction Diode');
    c = c.replace(/\b(transistor|bjt)\b/gi, 'Bipolar Junction Transistor');
    c = c.replace(/\b(resistor|resistors)\b/gi, 'Resistor');
    c = c.replace(/\b(capacitor|capacitors)\b/gi, 'Capacitor');
    c = c.replace(/\b(pop quiz|quiz me)\b/gi, 'Pop Quiz');
    return c;
  };

  // Continuous Hands-Free Voice Conversation Loop
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone speech recognition is not supported in this browser. Please type your question!");
      return;
    }

    if (isMicActive) {
      setIsMicActive(false);
      isMicActiveRef.current = false;
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    } else {
      startContinuousSpeech(SpeechRecognition);
    }
  };

  const startContinuousSpeech = (SpeechRecognition) => {
    try {
      stopSpeaking();
      lastSpokenRef.current = '';
      
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsMicActive(true);
        isMicActiveRef.current = true;
      };

      recognition.onresult = (event) => {
        stopSpeaking();

        let currentText = '';
        for (let i = 0; i < event.results.length; ++i) {
          currentText += event.results[i][0].transcript;
        }

        const cleaned = fastCorrect(currentText.trim());
        if (cleaned) {
          lastSpokenRef.current = cleaned;
          setInputText(cleaned);
        }
      };

      recognition.onerror = (err) => {
        console.warn("Speech mic notice:", err);
        setIsMicActive(false);
        isMicActiveRef.current = false;
      };

      recognition.onend = () => {
        setIsMicActive(false);
        isMicActiveRef.current = false;
        if (lastSpokenRef.current && lastSpokenRef.current.trim()) {
          const queryToSend = lastSpokenRef.current.trim();
          lastSpokenRef.current = '';
          sendMessage(queryToSend);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error("Mic error:", e);
      setIsMicActive(false);
    }
  };

  // Fun & Interactive Learning Prompt Chips
  const funLearningChips = [
    {
      label: '🎮 Pop Quiz Master',
      icon: Gamepad2,
      prompt: 'Give me a fun 3-question exam pop quiz with answers and bullet points to test my knowledge!'
    },
    {
      label: '💡 Explain Like I am 5',
      icon: Lightbulb,
      prompt: 'Explain how Ohm\'s Law and resistors work using a fun story and bullet points!'
    },
    {
      label: '😂 Fun Academic Joke',
      icon: Smile,
      prompt: 'Tell me a clever, fun science or engineering joke to make studying fun!'
    },
    {
      label: '🏆 Study Motivation',
      icon: Award,
      prompt: 'Give me a 30-second high-energy study motivation quote and exam focus tip!'
    }
  ];

  const sendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || loading) return;

    const trimmedQuery = query.trim();
    const lower = trimmedQuery.toLowerCase();

    if (lower === "stop" || lower === "pause" || lower === "quiet" || lower === "mute" || lower === "cancel" || lower === "stop speaking") {
      stopSpeaking();
      const stopMsg = { id: Date.now() + 1, sender: 'saathi', text: 'Voice readout stopped. I am ready for your next study question!' };
      setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: trimmedQuery }, stopMsg]);
      setInputText('');
      return;
    }

    stopSpeaking();

    const userMsg = { id: Date.now(), sender: 'user', text: trimmedQuery };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const replyText = await askSaathiAssistant(trimmedQuery, messages);
      const botMsg = { id: Date.now() + 1, sender: 'saathi', text: replyText };
      setMessages(prev => [...prev, botMsg]);
      speakText(replyText.replace(/[*#📌]/g, ''));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'saathi',
        text: 'Chat history cleared! What topic would you like to explore next?'
      }
    ]);
    stopSpeaking();
  };

  // Full-page Studio View inside dashboard tab
  if (isFullPage) {
    return (
      <div className="glass-panel animate-fade-up saathi-chatbot-fullpage" style={{ borderRadius: '20px', padding: '1rem', display: 'flex', gap: '1.25rem', background: '#ffffff', color: '#0f172a', minHeight: 'auto', flexWrap: 'wrap' }}>
        
        {/* Left Column: Chat Conversation Stream */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: '260px', width: '100%' }}>
          
          {/* Header Bar */}
          <div style={{ paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <LadyTutorAvatar size={42} />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  Saathi AI Studio 👩‍🏫
                </h3>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Interactive AI Tutor for explanations, pop quizzes & exam prep.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {isMicActive && (
                <span className="badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem' }}>
                  <Radio size={12} className="recording-pulse" /> Mic Active
                </span>
              )}

              {isSpeaking && (
                <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}>
                  <VolumeX size={14} /> Stop Voice
                </button>
              )}
              <button onClick={clearChat} className="btn-secondary" style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}>
                <RefreshCw size={13} /> Clear Chat
              </button>
            </div>
          </div>

          {/* Fun Interactive Chips Bar */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', padding: '0.6rem 0', borderBottom: '1px solid var(--border-color)' }}>
            {funLearningChips.map((chip, idx) => {
              const Icon = chip.icon;
              return (
                <button
                  key={idx}
                  onClick={() => sendMessage(chip.prompt)}
                  className="btn-secondary"
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem', borderRadius: '12px', whiteSpace: 'nowrap', background: '#f8fafc', borderColor: 'var(--border-color)', color: '#0f172a' }}
                >
                  <Icon size={13} color="#0284c7" /> {chip.label}
                </button>
              );
            })}
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, padding: '0.85rem 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '420px', minHeight: '260px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '0.6rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '92%' }}>
                {msg.sender === 'saathi' && <LadyTutorAvatar size={32} />}
                <div 
                  style={{
                    padding: '0.85rem 1.1rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f8fafc',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    fontSize: '0.92rem',
                    lineHeight: 1.55,
                    border: msg.sender === 'saathi' ? '1px solid var(--border-color)' : 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
                  }}
                  className="animate-pop"
                >
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', color: '#0284c7', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LadyTutorAvatar size={28} />
                <RefreshCw size={13} className="spin" /> Sunshine is typing...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Controls */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.65rem', borderTop: '1px solid var(--border-color)' }}
          >
            <button 
              type="button"
              onClick={toggleVoiceInput}
              className={`btn-secondary ${isMicActive ? 'recording-pulse' : ''}`}
              style={{ padding: '0.65rem', borderRadius: '12px', color: isMicActive ? 'var(--accent-danger)' : '#0f172a', background: '#f8fafc' }}
              title="Toggle Voice Input"
            >
              {isMicActive ? <MicOff size={18} color="var(--accent-danger)" /> : <Mic size={18} />}
            </button>

            <input 
              type="text"
              placeholder={isMicActive ? "Listening to your voice..." : "Ask Sunshine your tutor any study question..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: '#f8fafc',
                border: isMicActive ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.65rem 0.95rem',
                color: '#0f172a',
                fontSize: '0.88rem',
                outline: 'none',
                fontWeight: 500,
                minWidth: '100px'
              }}
            />

            <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.1rem', borderRadius: '12px' }}>
              <Send size={16} /> Send
            </button>
          </form>

        </div>

        {/* Right Column: Bigger Lady Tutor Image Showcase Panel */}
        <div 
          className="glass-card animate-pop saathi-tutor-showcase-panel" 
          style={{
            width: '260px',
            background: 'linear-gradient(180deg, #fdf2f8 0%, #f1f5f9 100%)',
            border: '2px solid rgba(236, 72, 153, 0.3)',
            borderRadius: '18px',
            padding: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '0.85rem',
            boxShadow: '0 8px 30px rgba(236, 72, 153, 0.15)',
            flexShrink: 0,
            margin: '0 auto'
          }}
        >
          {/* Speech Bubble over Tutor */}
          <div style={{ background: '#ffffff', border: '1px solid #f472b6', padding: '0.65rem 0.8rem', borderRadius: '14px', fontSize: '0.8rem', color: '#0f172a', fontWeight: 600, boxShadow: '0 4px 14px rgba(0,0,0,0.06)', position: 'relative' }}>
            "Namaste! I am Sunshine, your tutor. Let's master your syllabus together!"
            <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: 0, height: 0, borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #ffffff' }} />
          </div>

          {/* Bigger Lady Tutor Image */}
          <div style={{ position: 'relative', width: '180px', height: '200px', filter: 'drop-shadow(0 10px 20px rgba(236, 72, 153, 0.25))' }}>
            <img 
              src="/lady_tutor.jpg?v=3" 
              alt="Sunshine AI Tutor Character" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>

          {/* Tutor Bio & Status Badge */}
          <div style={{ width: '100%' }}>
            <div className="badge-emerald" style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', marginBottom: '0.35rem' }}>
              <CheckCircle size={13} /> Tutor Online & Active
            </div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>Prof. Sunshine</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Multimodal AI Campus Educator</p>
          </div>

          {/* Quick Trigger Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', width: '100%' }}>
            <button 
              onClick={() => sendMessage('Give me a 3-question exam pop quiz!')}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.45rem', fontSize: '0.78rem', justifyContent: 'center', background: '#ffffff' }}
            >
              🎯 Start Pop Quiz
            </button>

            <button 
              onClick={() => sendMessage('Explain Ohm\'s Law for a 5th grader')}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.45rem', fontSize: '0.78rem', justifyContent: 'center', background: '#ffffff' }}
            >
              💡 Simple 5th-Grade Explanation
            </button>
          </div>

        </div>

      </div>
    );
  }

  // Floating Drawer Mode
  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary glowing-border"
          style={{
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            width: '58px',
            height: '58px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.45)',
            zIndex: 99,
            background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
          }}
          title="Ask Sunshine Your Tutor"
        >
          <LadyTutorAvatar size={40} />
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div 
          className="glass-panel animate-pop"
          style={{
            position: 'fixed',
            bottom: '12px',
            right: '12px',
            width: isExpanded ? 'min(540px, 94vw)' : 'min(380px, 94vw)',
            height: isExpanded ? 'min(670px, 85vh)' : 'min(520px, 78vh)',
            maxHeight: '88vh',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden',
            border: '2px solid #ec4899',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            background: '#ffffff',
            color: '#0f172a'
          }}
        >
          {/* Header Bar */}
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(236, 72, 153, 0.1)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <LadyTutorAvatar size={36} />
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>Saathi AI Studio 👩‍🏫</h4>
                <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 600 }}>Sunshine — AI Tutor</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <button onClick={() => setIsExpanded(!isExpanded)} className="btn-secondary" style={{ padding: '0.25rem', borderRadius: '50%' }}>
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>

              <button onClick={() => setIsOpen(false)} className="btn-secondary" style={{ padding: '0.25rem', borderRadius: '50%' }}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Fun Learning Chips Bar */}
          <div style={{ display: 'flex', gap: '0.35rem', overflowX: 'auto', padding: '0.45rem 0.65rem', background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            {funLearningChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(chip.prompt)}
                className="btn-secondary"
                style={{ padding: '0.25rem 0.55rem', fontSize: '0.72rem', borderRadius: '10px', whiteSpace: 'nowrap', borderColor: 'var(--border-color)', color: '#0f172a' }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '0.85rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '0.45rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '92%' }}>
                {msg.sender === 'saathi' && <LadyTutorAvatar size={26} />}
                <div 
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: msg.sender === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f8fafc',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    fontSize: '0.88rem',
                    lineHeight: 1.5,
                    border: msg.sender === 'saathi' ? '1px solid var(--border-color)' : 'none'
                  }}
                >
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', color: '#0284c7', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <LadyTutorAvatar size={22} /> Sunshine is typing...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ padding: '0.65rem', background: '#ffffff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.45rem' }}
          >
            <button 
              type="button"
              onClick={toggleVoiceInput}
              className={`btn-secondary ${isMicActive ? 'recording-pulse' : ''}`}
              style={{ padding: '0.5rem', borderRadius: '10px', color: isMicActive ? 'var(--accent-danger)' : '#0f172a' }}
              title="Toggle Voice Mode"
            >
              {isMicActive ? <MicOff size={15} color="var(--accent-danger)" /> : <Mic size={15} />}
            </button>

            <input 
              type="text"
              placeholder={isMicActive ? "Listening to voice..." : "Ask Sunshine a question..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: '#f8fafc',
                border: isMicActive ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                borderRadius: '10px',
                padding: '0.5rem 0.75rem',
                color: '#0f172a',
                fontSize: '0.82rem',
                outline: 'none',
                fontWeight: 500,
                minWidth: '70px'
              }}
            />

            <button type="submit" className="btn-primary" style={{ padding: '0.5rem 0.75rem', borderRadius: '10px' }}>
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}

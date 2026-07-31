import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, HelpCircle, Gamepad2, Lightbulb, Smile, Award, Maximize2, Minimize2, RefreshCw, Radio } from 'lucide-react';
import { askSaathiAssistant } from '../services/groqApi';
import { useAccessibility } from '../context/AccessibilityContext';
import SaathiLogoIcon from './SaathiLogoIcon';
import LadyTutorAvatar from './LadyTutorAvatar';

export default function SaathiChatbot({ isFullPage = false }) {
  const { speakText, isSpeaking, stopSpeaking } = useAccessibility();
  const [isOpen, setIsOpen] = useState(isFullPage);
  const [isExpanded, setIsExpanded] = useState(isFullPage);
  const [isMicActive, setIsMicActive] = useState(false);

  const greetingText = 'Namaste! Bonjour! Hello! Konnichiwa! ¡Hola! I am your AI Lady Tutor at Saathi AI Studio. Ask me any academic concept, homework question, or click one of the interactive study modes below!';

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
      <div className="glass-panel animate-fade-up" style={{ borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '660px', background: '#ffffff', color: '#0f172a' }}>
        
        {/* Header Bar with Enlarged Pretty Lady Tutor Vector Avatar */}
        <div style={{ paddingBottom: '1.1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <LadyTutorAvatar size={64} />
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                Saathi AI Studio 👩‍🏫
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Empathetic AI Lady Tutor for academic explanations, pop quizzes, and exam prep.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            {isMicActive && (
              <span className="badge-emerald" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Radio size={12} className="recording-pulse" /> Voice Mic Active
              </span>
            )}

            {isSpeaking && (
              <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <VolumeX size={16} /> Stop Voice
              </button>
            )}
            <button onClick={clearChat} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              <RefreshCw size={14} /> Clear Chat
            </button>
          </div>
        </div>

        {/* Fun Interactive Chips Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.75rem 0', borderBottom: '1px solid var(--border-color)' }}>
          {funLearningChips.map((chip, idx) => {
            const Icon = chip.icon;
            return (
              <button
                key={idx}
                onClick={() => sendMessage(chip.prompt)}
                className="btn-secondary"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem', borderRadius: '12px', whiteSpace: 'nowrap', background: '#f8fafc', borderColor: 'var(--border-color)', color: '#0f172a' }}
              >
                <Icon size={14} color="#0284c7" /> {chip.label}
              </button>
            );
          })}
        </div>

        {/* Messages Stream */}
        <div style={{ flex: 1, padding: '1rem 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(msg => (
            <div key={msg.id} style={{ display: 'flex', gap: '0.75rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
              {msg.sender === 'saathi' && <LadyTutorAvatar size={40} />}
              <div 
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f8fafc',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  fontSize: '0.96rem',
                  lineHeight: 1.6,
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
            <div style={{ alignSelf: 'flex-start', color: '#0284c7', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LadyTutorAvatar size={34} />
              <RefreshCw size={14} className="spin" /> Lady AI Tutor is generating answer & voice...
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Controls */}
        <form 
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}
        >
          <button 
            type="button"
            onClick={toggleVoiceInput}
            className={`btn-secondary ${isMicActive ? 'recording-pulse' : ''}`}
            style={{ padding: '0.75rem', borderRadius: '14px', color: isMicActive ? 'var(--accent-danger)' : '#0f172a', background: '#f8fafc' }}
            title="Toggle Voice Input"
          >
            {isMicActive ? <MicOff size={20} color="var(--accent-danger)" /> : <Mic size={20} />}
          </button>

          <input 
            type="text"
            placeholder={isMicActive ? "Listening to your voice..." : "Ask Lady AI Tutor any study question..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              background: '#f8fafc',
              border: isMicActive ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '0.75rem 1.1rem',
              color: '#0f172a',
              fontSize: '0.95rem',
              outline: 'none',
              fontWeight: 500
            }}
          />

          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.5rem', borderRadius: '14px' }}>
            <Send size={18} /> Send
          </button>
        </form>

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
            bottom: '24px',
            right: '24px',
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(236, 72, 153, 0.45)',
            zIndex: 99,
            background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)'
          }}
          title="Ask Lady AI Tutor"
        >
          <LadyTutorAvatar size={48} />
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div 
          className="glass-panel animate-pop"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: isExpanded ? '540px' : '400px',
            height: isExpanded ? '670px' : '550px',
            maxHeight: '85vh',
            borderRadius: '24px',
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
          <div style={{ padding: '0.85rem 1.1rem', background: 'rgba(236, 72, 153, 0.1)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <LadyTutorAvatar size={44} />
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Saathi AI Studio 👩‍🏫</h4>
                <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>Lady AI Voice Tutor</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <button onClick={() => setIsExpanded(!isExpanded)} className="btn-secondary" style={{ padding: '0.3rem', borderRadius: '50%' }}>
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>

              <button onClick={() => setIsOpen(false)} className="btn-secondary" style={{ padding: '0.3rem', borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Fun Learning Chips Bar */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', padding: '0.5rem 0.75rem', background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
            {funLearningChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(chip.prompt)}
                className="btn-secondary"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', borderRadius: '12px', whiteSpace: 'nowrap', borderColor: 'var(--border-color)', color: '#0f172a' }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '0.5rem', alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '90%' }}>
                {msg.sender === 'saathi' && <LadyTutorAvatar size={32} />}
                <div 
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'user' ? 'var(--accent-primary)' : '#f8fafc',
                    color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    border: msg.sender === 'saathi' ? '1px solid var(--border-color)' : 'none'
                  }}
                >
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', color: '#0284c7', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <LadyTutorAvatar size={26} /> Lady AI Tutor is typing...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ padding: '0.75rem', background: '#ffffff', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}
          >
            <button 
              type="button"
              onClick={toggleVoiceInput}
              className={`btn-secondary ${isMicActive ? 'recording-pulse' : ''}`}
              style={{ padding: '0.55rem', borderRadius: '12px', color: isMicActive ? 'var(--accent-danger)' : '#0f172a' }}
              title="Toggle Voice Mode"
            >
              {isMicActive ? <MicOff size={16} color="var(--accent-danger)" /> : <Mic size={16} />}
            </button>

            <input 
              type="text"
              placeholder={isMicActive ? "Listening to your voice..." : "Ask Lady AI Tutor any study question..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: '#f8fafc',
                border: isMicActive ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.55rem 0.85rem',
                color: '#0f172a',
                fontSize: '0.85rem',
                outline: 'none',
                fontWeight: 500
              }}
            />

            <button type="submit" className="btn-primary" style={{ padding: '0.55rem 0.85rem', borderRadius: '12px' }}>
              <Send size={16} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}

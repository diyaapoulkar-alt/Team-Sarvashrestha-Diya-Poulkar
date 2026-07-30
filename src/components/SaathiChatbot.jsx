import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, MicOff, Volume2, VolumeX, Sparkles, HelpCircle, Gamepad2, Lightbulb, Smile, Award, Maximize2, Minimize2, RefreshCw } from 'lucide-react';
import { askSaathiAssistant } from '../services/groqApi';
import { useAccessibility } from '../context/AccessibilityContext';

export default function SaathiChatbot({ isFullPage = false }) {
  const { speakText, isSpeaking, stopSpeaking } = useAccessibility();
  const [isOpen, setIsOpen] = useState(isFullPage);
  const [isExpanded, setIsExpanded] = useState(isFullPage);
  const [isMicActive, setIsMicActive] = useState(false);

  const greetingText = 'Namaste! Bonjour! Hello! Konnichiwa! ¡Hola! I am Saathi, your interactive Multimodal AI Study Copilot. Ask me anything, or try one of the fun learning modes below!';

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

  useEffect(() => {
    if (isOpen || isFullPage) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isFullPage]);

  // Reliable Microphone Input Stream Handler
  const toggleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Microphone speech recognition is not supported in this browser. Please type your question!");
      return;
    }

    if (isMicActive) {
      setIsMicActive(false);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    } else {
      try {
        lastSpokenRef.current = '';
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => setIsMicActive(true);

        recognition.onresult = (event) => {
          let currentText = '';
          for (let i = 0; i < event.results.length; ++i) {
            currentText += event.results[i][0].transcript;
          }
          if (currentText.trim()) {
            lastSpokenRef.current = currentText.trim();
            setInputText(currentText.trim());
          }
        };

        recognition.onerror = (err) => {
          console.warn("Chatbot mic notice:", err);
          setIsMicActive(false);
        };

        recognition.onend = () => {
          setIsMicActive(false);
          if (lastSpokenRef.current && lastSpokenRef.current.trim()) {
            const queryToSend = lastSpokenRef.current.trim();
            lastSpokenRef.current = '';
            sendMessage(queryToSend);
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (e) {
        console.error("Mic start error:", e);
        setIsMicActive(false);
      }
    }
  };

  // Fun & Interactive Learning Prompt Chips
  const funLearningChips = [
    {
      label: '🎮 Pop Quiz Master',
      icon: Gamepad2,
      prompt: 'Give me a fun 3-question pop quiz on physics and electronics to test my knowledge!'
    },
    {
      label: '💡 Explain Like I am 5',
      icon: Lightbulb,
      prompt: 'Explain how the internet and data packets work using a fun story for a 5-year-old!'
    },
    {
      label: '😂 Fun Academic Joke',
      icon: Smile,
      prompt: 'Tell me a clever, fun science or engineering joke to make studying fun!'
    },
    {
      label: '🏆 Study Motivation',
      icon: Award,
      prompt: 'Give me a 30-second high-energy study motivation quote and focus tip!'
    }
  ];

  const sendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query || !query.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const replyText = await askSaathiAssistant(query.trim(), messages);
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
      <div className="glass-panel animate-fade-up" style={{ borderRadius: '24px', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '620px' }}>
        
        {/* Header Bar */}
        <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 4px 15px rgba(99,102,241,0.4)' }}>
              <Sparkles size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>Saathi AI Learning Studio</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Multilingual AI Companion with automatic voice readout & interactive learning modes.</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {isSpeaking && (
              <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                <VolumeX size={16} /> Stop Audio
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
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem', borderRadius: '12px', whiteSpace: 'nowrap', borderColor: 'rgba(99,102,241,0.3)' }}
              >
                <Icon size={14} color="var(--accent-cyan)" /> {chip.label}
              </button>
            );
          })}
        </div>

        {/* Messages Stream */}
        <div style={{ flex: 1, padding: '1rem 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {messages.map(msg => (
            <div 
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '1rem 1.25rem',
                borderRadius: msg.sender === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                background: msg.sender === 'user' ? 'var(--accent-primary)' : '#0b0f19',
                color: '#ffffff',
                fontSize: '1rem',
                lineHeight: 1.6,
                border: msg.sender === 'saathi' ? '2px solid var(--border-color)' : 'none',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}
              className="animate-pop"
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--accent-cyan)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RefreshCw size={14} className="spin" /> Saathi AI is thinking & preparing voice narration...
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
            style={{ padding: '0.75rem', borderRadius: '14px', color: isMicActive ? 'var(--accent-danger)' : '#ffffff' }}
            title="Speak your question"
          >
            {isMicActive ? <MicOff size={20} color="var(--accent-danger)" /> : <Mic size={20} />}
          </button>

          <input 
            type="text"
            placeholder={isMicActive ? "Listening to your voice..." : "Ask Saathi AI any study question..."}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.08)',
              border: isMicActive ? '2px solid var(--accent-danger)' : '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '0.75rem 1.1rem',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none'
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
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(99, 102, 241, 0.5)',
            zIndex: 99
          }}
          title="Ask Saathi AI Companion"
        >
          <Sparkles size={28} />
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
            width: isExpanded ? '500px' : '380px',
            height: isExpanded ? '650px' : '520px',
            maxHeight: '85vh',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            border: '2px solid var(--accent-primary)',
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header Bar */}
          <div style={{ padding: '0.85rem 1.1rem', background: 'rgba(99, 102, 241, 0.25)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Saathi AI Studio</h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>Voice & Multilingual Tutor</span>
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
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--border-color)' }}>
            {funLearningChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => sendMessage(chip.prompt)}
                className="btn-secondary"
                style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem', borderRadius: '12px', whiteSpace: 'nowrap', borderColor: 'rgba(99,102,241,0.3)' }}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map(msg => (
              <div 
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.sender === 'user' ? 'var(--accent-primary)' : '#0b0f19',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                  border: msg.sender === 'saathi' ? '1px solid var(--border-color)' : 'none'
                }}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div style={{ alignSelf: 'flex-start', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                Saathi AI is generating answer...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.95)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}
          >
            <button 
              type="button"
              onClick={toggleVoiceInput}
              className={`btn-secondary ${isMicActive ? 'recording-pulse' : ''}`}
              style={{ padding: '0.55rem', borderRadius: '12px' }}
              title="Speak your question"
            >
              {isMicActive ? <MicOff size={16} color="var(--accent-danger)" /> : <Mic size={16} />}
            </button>

            <input 
              type="text"
              placeholder={isMicActive ? "Listening to your voice..." : "Ask Saathi AI any study question..."}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.08)',
                border: isMicActive ? '2px solid var(--accent-danger)' : '1px solid var(--border-color)',
                borderRadius: '12px',
                padding: '0.55rem 0.85rem',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none'
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

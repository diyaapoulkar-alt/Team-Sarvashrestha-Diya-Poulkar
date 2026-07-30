import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Mic, Volume2, Sparkles, HelpCircle } from 'lucide-react';
import { askSaathiAssistant } from '../services/groqApi';
import { useAccessibility } from '../context/AccessibilityContext';

export default function SaathiChatbot() {
  const { speakText, isSpeaking, stopSpeaking } = useAccessibility();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'saathi',
      text: 'Namaste! I am Saathi, your AI Accessibility Companion. How can I help your learning today?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Interactive Quick Assistance FAQ Chips
  const faqQuestions = [
    {
      label: '👁️ How to use Vision Assist?',
      question: 'How do I use Vision Assist for blackboards or lab manuals?',
      answer: 'Go to **Copilot Dashboard** → **Vision Assist**. Click **Turn Camera ON** to take a live photo, or click **Upload Image** to upload any poster/notes. Saathi will read out a 4-step narration automatically!'
    },
    {
      label: '🧏 How to turn on Live Subtitles?',
      question: 'How do I turn on Live Lecture Captioning?',
      answer: 'Select **Hearing Assist** in the left panel or click **Lecture Captioner** in the dashboard. Click **Start Live Microphone Stream** to see real-time scrolling captions!'
    },
    {
      label: '🧠 How to simplify textbook PDFs?',
      question: 'How do I simplify dense textbook PDFs or articles?',
      answer: 'Click **Textbook Simplifier** in the dashboard. Select your reading level (5th Grade, High School) or language (Hindi, Marathi), paste text or upload a PDF, and click **Simplify Textbook Content**!'
    },
    {
      label: '📐 How to read LaTeX math formulas?',
      question: 'How do I read LaTeX math formulas out loud?',
      answer: 'Open **Math LaTeX Reader** in the dashboard. Paste any LaTeX formula (e.g. \\int_{0}^{\\infty} e^{-x^2} dx) and click **Synthesize Math Speech** to hear natural English spoken voice reading!'
    },
    {
      label: '🔍 Camera / Mic Troubleshooting',
      question: 'What if my camera or mic is not opening?',
      answer: 'Ensure browser permissions are allowed for camera/mic. If blocked, click the lock icon next to your browser URL bar and set Camera & Microphone to "Allow", then refresh the page!'
    },
    {
      label: '📖 Focus Line Guide for Dyslexia',
      question: 'How do I enable Dyslexia Font and Focus Line Guide?',
      answer: 'In the **Left Sidebar**, click **Dyslexia Font: ON** or toggle **Focus Line Guide (ON)** to display a floating highlight ruler that follows your mouse!'
    }
  ];

  const sendMessage = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setLoading(true);

    try {
      // Check if matches FAQ exactly
      const matchedFaq = faqQuestions.find(f => f.question.toLowerCase() === query.toLowerCase() || f.label.toLowerCase() === query.toLowerCase());
      
      let replyText = "";
      if (matchedFaq) {
        replyText = matchedFaq.answer;
      } else {
        replyText = await askSaathiAssistant(query, messages);
      }

      const botMsg = { id: Date.now() + 1, sender: 'saathi', text: replyText };
      setMessages(prev => [...prev, botMsg]);
      speakText(replyText.replace(/[*#📌]/g, ''));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFaqClick = (faq) => {
    sendMessage(faq.question);
  };

  return (
    <>
      {/* Floating Floating Trigger Button */}
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
          title="Ask Saathi Accessibility Copilot"
        >
          <Sparkles size={28} />
        </button>
      )}

      {/* Floating Chat Window Drawer */}
      {isOpen && (
        <div 
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            width: '380px',
            maxHeight: '600px',
            height: '80vh',
            borderRadius: '24px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 100,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            overflow: 'hidden',
            border: '2px solid var(--accent-primary)'
          }}
        >
          {/* Drawer Header */}
          <div style={{ padding: '1rem 1.25rem', background: 'rgba(99, 102, 241, 0.2)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Sparkles size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>Saathi AI Assistant</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>Voice & Help Copilot</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {isSpeaking && (
                <button onClick={stopSpeaking} className="btn-secondary" style={{ padding: '0.3rem', borderRadius: '50%' }}>
                  <Volume2 size={16} color="var(--accent-primary)" />
                </button>
              )}

              <button onClick={() => setIsOpen(false)} className="btn-secondary" style={{ padding: '0.3rem', borderRadius: '50%' }}>
                <X size={18} />
              </button>
            </div>
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
              <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                Saathi is thinking...
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Quick Assistance FAQ Chips Section */}
          <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.35rem' }}>
              <HelpCircle size={12} /> Quick Assistance FAQs:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.35rem' }}>
              {faqQuestions.map((faq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleFaqClick(faq)}
                  className="btn-secondary"
                  style={{
                    padding: '0.3rem 0.6rem',
                    fontSize: '0.75rem',
                    whiteSpace: 'nowrap',
                    borderRadius: '12px',
                    borderColor: 'rgba(99,102,241,0.3)'
                  }}
                >
                  {faq.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form 
            onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
            style={{ padding: '0.75rem', background: 'rgba(15, 23, 42, 0.95)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.5rem' }}
          >
            <input 
              type="text"
              placeholder="Ask Saathi any question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              style={{
                flex: 1,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid var(--border-color)',
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

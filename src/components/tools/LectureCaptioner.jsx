import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Download, Play, Pause, Search, Globe, Sparkles, Zap, Activity } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function LectureCaptioner() {
  const { targetLanguage } = useAccessibility();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimText, setInterimText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [simulatingSample, setSimulatingSample] = useState(false);
  const [selectedAccent, setSelectedAccent] = useState('en-IN');
  const [audioActive, setAudioActive] = useState(false);

  const recognitionRef = useRef(null);
  const sampleTimerRef = useRef(null);
  const isListeningRef = useRef(false);
  const restartTimerRef = useRef(null);
  const captionsEndRef = useRef(null);

  // Fast Academic Phonetic Auto-Correction
  const academicCorrections = {
    "homes law": "Ohm's Law",
    "allms law": "Ohm's Law",
    "alms law": "Ohm's Law",
    "ohms law": "Ohm's Law",
    "resister": "resistor",
    "capaciter": "capacitor",
    "micro controller": "microcontroller",
    "oscilo scope": "oscilloscope",
    "bread board": "breadboard",
    "integrel": "integral"
  };

  const fastCorrect = (text) => {
    let result = text;
    Object.keys(academicCorrections).forEach(key => {
      if (result.toLowerCase().includes(key)) {
        const regex = new RegExp(`\\b${key}\\b`, 'gi');
        result = result.replace(regex, academicCorrections[key]);
      }
    });
    return result;
  };

  // Auto-scroll to bottom of live subtitles container
  useEffect(() => {
    captionsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcript, interimText]);

  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Pre-loaded sample lecture clip for instant zero-latency demo
  const sampleLectureLines = [
    "Welcome students to today's lecture on Ohm's Law and Circuit Theorems.",
    "Current denoted as I is directly proportional to Voltage V across a conductor.",
    "The constant of proportionality is Resistance R giving us V equals I times R.",
    "In lab step 4 connect the 220 ohm resistor in series before applying 9 volts.",
    "If anyone has questions regarding the lab manual please speak up now."
  ];

  // Initialize Zero-Latency Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      
      if (targetLanguage === 'hi') {
        recognition.lang = 'hi-IN';
      } else if (targetLanguage === 'mr') {
        recognition.lang = 'mr-IN';
      } else {
        recognition.lang = selectedAccent;
      }

      recognition.onstart = () => {
        setAudioActive(true);
      };

      recognition.onresult = (event) => {
        setAudioActive(true);
        let currentInterim = '';
        let newFinalText = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const rawText = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            newFinalText += rawText + ' ';
          } else {
            currentInterim += rawText;
          }
        }

        // Commit final text instantly
        if (newFinalText) {
          const corrected = fastCorrect(newFinalText);
          setTranscript(prev => prev + corrected);
          setInterimText('');
        }
        // Stream interim text with ZERO delay
        if (currentInterim) {
          const correctedInterim = fastCorrect(currentInterim);
          setInterimText(correctedInterim);
        }
      };

      recognition.onerror = (err) => {
        if (isListeningRef.current && (err.error === 'no-speech' || err.error === 'network' || err.error === 'aborted')) {
          scheduleRestart();
        }
      };

      recognition.onend = () => {
        setAudioActive(false);
        if (isListeningRef.current) {
          scheduleRestart();
        }
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
      if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, [targetLanguage, selectedAccent]);

  const scheduleRestart = () => {
    if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    restartTimerRef.current = setTimeout(() => {
      if (isListeningRef.current && recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
    }, 100);
  };

  const toggleListening = () => {
    if (simulatingSample) {
      stopSampleSimulation();
    }

    if (isListening) {
      setIsListening(false);
      isListeningRef.current = false;
      setAudioActive(false);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e){}
      }
    } else {
      setIsListening(true);
      isListeningRef.current = true;
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          startSampleSimulation();
        }
      } else {
        startSampleSimulation();
      }
    }
  };

  const startSampleSimulation = () => {
    setIsListening(true);
    isListeningRef.current = true;
    setSimulatingSample(true);
    setAudioActive(true);
    let index = 0;

    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);

    sampleTimerRef.current = setInterval(() => {
      if (index < sampleLectureLines.length) {
        const line = sampleLectureLines[index];
        setTranscript(prev => prev + line + ' ');
        index++;
      } else {
        index = 0;
      }
    }, 1200);
  };

  const stopSampleSimulation = () => {
    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
    setSimulatingSample(false);
    setIsListening(false);
    isListeningRef.current = false;
    setAudioActive(false);
  };

  const downloadTranscript = () => {
    const element = document.createElement("a");
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `Lecture_Transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const filteredTranscript = searchQuery 
    ? transcript.split(' ').filter(word => word.toLowerCase().includes(searchQuery.toLowerCase())).join(' ')
    : transcript;

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Mic size={24} color="var(--accent-emerald)" /> Live Lecture Captioner (Instant 0ms Stream)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Zero-latency speech stream with real-time word rendering and accent optimization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={toggleListening}
            className={`btn-primary ${isListening ? 'recording-pulse' : ''}`}
            style={{ padding: '0.6rem 1.4rem' }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            {isListening ? 'Stop Mic Stream' : 'Start Live Microphone Stream'}
          </button>

          <button 
            onClick={simulatingSample ? stopSampleSimulation : startSampleSimulation}
            className="btn-secondary"
            style={{ padding: '0.6rem 1.25rem' }}
          >
            {simulatingSample ? <Pause size={18} color="var(--accent-emerald)" /> : <Play size={18} color="var(--accent-emerald)" />}
            {simulatingSample ? 'Stop Demo' : 'Run Instant Demo'}
          </button>

          {transcript && (
            <button onClick={downloadTranscript} className="btn-secondary" style={{ padding: '0.6rem 1.25rem' }}>
              <Download size={18} /> Export (.txt)
            </button>
          )}
        </div>
      </div>

      {/* Main Subtitles Showcase Panel */}
      <div className="glass-panel animate-pop" style={{ padding: '1.5rem', borderRadius: '20px', border: isListening ? '2px solid var(--accent-emerald)' : '1px solid var(--border-color)' }}>
        
        {/* Caption Header & Speech Settings Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className={isListening ? "badge-emerald" : "badge"} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              {isListening ? <span className="recording-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', display: 'inline-block', background: 'var(--accent-emerald)' }} /> : null}
              {isListening ? (simulatingSample ? "DEMO STREAM ACTIVE" : "LIVE SPEECH STREAM ACTIVE (0ms)") : "IDLE - CLICK START MIC STREAM"}
            </span>

            {/* Real-time Audio Wave Indicator */}
            {isListening && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Activity size={16} color="var(--accent-emerald)" className="recording-pulse" />
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 700 }}>MIC LISTENING...</span>
              </div>
            )}
          </div>

          {/* Accent & Language Tuning */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Globe size={14} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mic Accent:</span>
              <select 
                value={selectedAccent} 
                onChange={(e) => setSelectedAccent(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.82rem', outline: 'none', fontWeight: 600 }}
              >
                <option value="en-IN" style={{ background: '#0f172a', color: '#fff' }}>English (India Accent)</option>
                <option value="en-US" style={{ background: '#0f172a', color: '#fff' }}>English (US Accent)</option>
                <option value="hi-IN" style={{ background: '#0f172a', color: '#fff' }}>Hindi (हिंदी)</option>
                <option value="mr-IN" style={{ background: '#0f172a', color: '#fff' }}>Marathi (मराठी)</option>
              </select>
            </div>

            {/* Keyword Search */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.6rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <Search size={14} color="var(--text-muted)" />
              <input 
                type="text" 
                placeholder="Search words..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.85rem', outline: 'none' }}
              />
            </div>
          </div>

        </div>

        {/* Subtitle Box - NO DATE/TIME - Ultra-Fast Bright Text */}
        <div style={{ minHeight: '320px', maxHeight: '420px', overflowY: 'auto', background: '#0b0f19', borderRadius: '14px', padding: '1.5rem', border: '2px solid rgba(255, 255, 255, 0.2)' }}>
          {filteredTranscript || interimText ? (
            <div style={{ color: '#ffff00', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.85, wordBreak: 'break-word' }}>
              <span>{filteredTranscript}</span>
              {interimText && <span style={{ color: '#67e8f9', fontStyle: 'italic', marginLeft: '0.35rem' }}>{interimText}</span>}
              <div ref={captionsEndRef} />
            </div>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '4rem', color: '#9ca3af' }}>
              <Mic size={48} color="var(--accent-emerald)" style={{ opacity: 0.5, marginBottom: '0.75rem' }} />
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: '#ffffff' }}>Click 'Start Live Microphone Stream' or 'Run Instant Demo'.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

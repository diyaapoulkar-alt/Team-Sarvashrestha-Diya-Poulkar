import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGroqApiKey, setGroqApiKey as saveGroqKey } from '../services/groqApi';

const defaultState = {
  activeProfile: 'general',
  applyProfilePreset: () => {},
  activeTool: 'vision',
  setActiveTool: () => {},
  readingMaskActive: false,
  setReadingMaskActive: () => {},
  themeMode: 'dark-glass',
  setThemeMode: () => {},
  fontSize: 16,
  setFontSize: () => {},
  useOpenDyslexic: false,
  setUseOpenDyslexic: () => {},
  screenReaderAudio: true,
  setScreenReaderAudio: () => {},
  speechRate: 1.0,
  setSpeechRate: () => {},
  targetLanguage: 'en',
  setTargetLanguage: () => {},
  readingLevel: 'elementary',
  setReadingLevel: () => {},
  groqKey: '',
  updateApiKey: () => {},
  user: { name: 'Guest Student', email: 'student@vitbhopal.ac.in', isGuest: true, avatar: '🎓' },
  setUser: () => {},
  speakText: () => {},
  stopSpeaking: () => {},
  isSpeaking: false
};

const AccessibilityContext = createContext(defaultState);

export const AccessibilityProvider = ({ children }) => {
  const [activeProfile, setActiveProfile] = useState('general');
  const [activeTool, setActiveTool] = useState('vision');
  const [readingMaskActive, setReadingMaskActive] = useState(false);
  
  const [themeMode, setThemeMode] = useState('dark-glass');
  const [fontSize, setFontSize] = useState(16);
  const [useOpenDyslexic, setUseOpenDyslexic] = useState(false);
  const [screenReaderAudio, setScreenReaderAudio] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.1);
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [readingLevel, setReadingLevel] = useState('elementary');
  
  const [groqKey, setGroqKey] = useState(getGroqApiKey());
  
  const [user, setUser] = useState({
    name: 'Guest Student',
    email: 'student@vitbhopal.ac.in',
    isGuest: true,
    avatar: '🎓'
  });
  
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    document.documentElement.style.fontSize = `${fontSize}px`;
    
    if (useOpenDyslexic) {
      document.body.classList.add('font-opendyslexic');
    } else {
      document.body.classList.remove('font-opendyslexic');
    }
  }, [themeMode, fontSize, useOpenDyslexic]);

  // Instantaneous audio speech narration with 0ms lag
  const speakText = (text, lang = 'en-US') => {
    if (!screenReaderAudio || !window.speechSynthesis) return;
    
    try {
      window.speechSynthesis.cancel(); // Stop current queue immediately
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1; // Slightly faster for zero lag
      utterance.pitch = 1.0;
      
      if (targetLanguage === 'hi' || lang === 'hi-IN') {
        utterance.lang = 'hi-IN';
      } else if (targetLanguage === 'mr' || lang === 'mr-IN') {
        utterance.lang = 'mr-IN';
      } else {
        utterance.lang = 'en-US';
      }
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis notice:", e);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Mode preset switcher (keeps normal dark-glass color scheme for all modes!)
  const applyProfilePreset = (profileKey) => {
    setActiveProfile(profileKey);
    setThemeMode('dark-glass'); // Keep normal theme without turning yellow
    
    if (profileKey === 'visual') {
      setActiveTool('vision');
      setFontSize(16);
      setScreenReaderAudio(true);
      speakText("Visual Assist.");
    } else if (profileKey === 'hearing') {
      setActiveTool('captioner');
      setFontSize(16);
      setScreenReaderAudio(false);
      speakText("Hearing Assist.");
    } else if (profileKey === 'cognitive') {
      setActiveTool('simplifier');
      setFontSize(16);
      setReadingLevel('elementary');
      speakText("Cognitive Assist.");
    } else if (profileKey === 'motor') {
      setActiveTool('latex');
      setFontSize(16);
      speakText("Motor Assist.");
    } else {
      setActiveTool('vision');
      setFontSize(16);
      setUseOpenDyslexic(false);
    }
  };

  const updateApiKey = (key) => {
    saveGroqKey(key);
    setGroqKey(key);
  };

  return (
    <AccessibilityContext.Provider value={{
      activeProfile,
      applyProfilePreset,
      activeTool,
      setActiveTool,
      readingMaskActive,
      setReadingMaskActive,
      themeMode,
      setThemeMode,
      fontSize,
      setFontSize,
      useOpenDyslexic,
      setUseOpenDyslexic,
      screenReaderAudio,
      setScreenReaderAudio,
      speechRate,
      setSpeechRate,
      targetLanguage,
      setTargetLanguage,
      readingLevel,
      setReadingLevel,
      groqKey,
      updateApiKey,
      user,
      setUser,
      speakText,
      stopSpeaking,
      isSpeaking
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  return context || defaultState;
};

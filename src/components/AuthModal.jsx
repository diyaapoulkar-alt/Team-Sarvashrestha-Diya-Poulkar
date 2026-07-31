import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Mail, User, Sparkles, LogIn } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AuthModal({ isOpen, onClose }) {
  const { user, setUser, applyProfilePreset } = useAccessibility();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [disabilityType, setDisabilityType] = useState('general');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e?.preventDefault();
    setUser({
      name: name.trim() || 'Student Learner',
      email: email.trim() || 'student@vitbhopal.ac.in',
      isGuest: false,
      avatar: '🎓'
    });
    applyProfilePreset(disabilityType);
    onClose();
  };

  const handleGuestSignIn = () => {
    setUser({
      name: 'Guest Learner',
      email: 'guest@saathi.ai',
      isGuest: true,
      avatar: '👤'
    });
    applyProfilePreset(disabilityType);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', color: '#0f172a' }}>
      <div className="glass-panel animate-pop" style={{ width: '100%', maxWidth: '440px', padding: '1.75rem', borderRadius: '24px', position: 'relative', background: '#ffffff', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '16px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.6rem', margin: '0 auto 0.75rem auto', boxShadow: '0 4px 15px rgba(71,85,105,0.3)' }}>
            🎓
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Student Sign In & Profile</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Personalize your Saathi Accessibility Copilot</p>
        </div>

        {/* 1-Click Guest Sign In Quick Button */}
        <button 
          type="button"
          onClick={handleGuestSignIn}
          className="btn-secondary glowing-border"
          style={{ width: '100%', marginBottom: '1.25rem', padding: '0.75rem', borderRadius: '12px', justifyContent: 'center', background: 'rgba(2, 132, 199, 0.1)', borderColor: '#0284c7', color: '#0369a1' }}
        >
          <LogIn size={18} color="#0284c7" />
          <span>⚡ Sign In as Guest (1-Click Quick Demo)</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>OR ENTER STUDENT DETAILS</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Student Name:
            </label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Sharma"
              style={{ width: '100%', background: 'rgba(241, 245, 249, 0.9)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Campus Email:
            </label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@vitbhopal.ac.in"
              style={{ width: '100%', background: 'rgba(241, 245, 249, 0.9)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Primary Accessibility Assist Mode:
            </label>
            <select 
              value={disabilityType} 
              onChange={(e) => setDisabilityType(e.target.value)}
              style={{ width: '100%', background: 'rgba(241, 245, 249, 0.9)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: '#0f172a', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
            >
              <option value="general">Standard Mode</option>
              <option value="visual">👁️ Visual Assist (High Contrast & Speech)</option>
              <option value="hearing">🧏 Hearing Assist (Live Captions & Flash)</option>
              <option value="cognitive">🧠 Cognitive / Dyslexia (OpenDyslexic & 5th Grade)</option>
              <option value="motor">♿ Motor Assist (Keyboard & Voice Shortcuts)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}>
            <UserCheck size={18} /> Save & Apply Profile
          </button>
        </form>

      </div>
    </div>
  );
}

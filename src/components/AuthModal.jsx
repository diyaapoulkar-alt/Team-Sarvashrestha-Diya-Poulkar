import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AuthModal({ isOpen, onClose }) {
  const { user, setUser, applyProfilePreset } = useAccessibility();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [disabilityType, setDisabilityType] = useState('general');

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    setUser({
      name: name || 'Student Learner',
      email: email || 'student@vitbhopal.ac.in',
      isGuest: false,
      avatar: '🎓'
    });
    applyProfilePreset(disabilityType);
    onClose();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '440px', padding: '1.75rem', borderRadius: '24px', position: 'relative' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', margin: '0 auto 0.75rem auto' }}>
            🎓
          </div>
          <h3 style={{ fontSize: '1.4rem' }}>Student Sign In & Profile</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Personalize your Saathi Accessibility Copilot</p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Student Name:
            </label>
            <input 
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Sharma"
              style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Campus Email:
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@vitbhopal.ac.in"
              style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              Primary Accessibility Assist Mode:
            </label>
            <select 
              value={disabilityType} 
              onChange={(e) => setDisabilityType(e.target.value)}
              style={{ width: '100%', background: '#111827', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.65rem 0.85rem', color: 'var(--text-primary)', fontSize: '0.9rem', outline: 'none', cursor: 'pointer' }}
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

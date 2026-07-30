import React, { useState } from 'react';
import { X, Key, CheckCircle, ShieldAlert, ExternalLink } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function ApiKeyModal({ isOpen, onClose }) {
  const { groqKey, updateApiKey } = useAccessibility();
  const [inputKey, setInputKey] = useState(groqKey || '');
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    updateApiKey(inputKey);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '1.75rem', borderRadius: '24px', position: 'relative' }}>
        
        <button onClick={onClose} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(99,102,241,0.15)' }}>
            <Key size={22} color="var(--accent-primary)" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.3rem' }}>Groq Cloud API Key</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Required for live Llama 3.2 Vision & 70B inference</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
              Groq API Key (`gsk_...`):
            </label>
            <input 
              type="password"
              placeholder="Paste your gsk_... key here"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              style={{ width: '100%', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'var(--accent-emerald)', fontFamily: 'monospace', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            💡 Don't have a key? Get a free key instantly from <a href="https://console.groq.com/keys" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'underline' }}>Groq Console <ExternalLink size={12} style={{ display: 'inline' }} /></a>. Note: Built-in intelligent sample fallback mode works even without an API key!
          </div>

          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem' }}>
            {saved ? <CheckCircle size={18} /> : <Key size={18} />}
            {saved ? 'API Key Saved & Connected!' : 'Save & Activate Key'}
          </button>
        </form>

      </div>
    </div>
  );
}

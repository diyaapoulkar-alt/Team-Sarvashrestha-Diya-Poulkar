import React from 'react';
import { LayoutDashboard, Key, Sparkles, Shield, Eye } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function Navbar({ activeTab, setActiveTab, onOpenApiKeyModal, onOpenAuthModal }) {
  const { user, groqKey } = useAccessibility();

  return (
    <nav style={{ 
      background: 'rgba(15, 23, 42, 0.9)', 
      backdropFilter: 'blur(16px)', 
      borderBottom: '1px solid var(--border-color)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 90 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        
        {/* Left: Beautiful Designed Custom Logo Icon */}
        <div 
          onClick={() => setActiveTab('hero')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          {/* Custom Visual AI Emblem Logo */}
          <div style={{ 
            width: '42px', 
            height: '42px', 
            borderRadius: '14px', 
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: '#fff', 
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            position: 'relative'
          }}>
            <Eye size={22} color="#ffffff" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }} />
            <Sparkles size={12} color="#ffff00" style={{ position: 'absolute', top: '4px', right: '4px' }} />
          </div>

          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Saathi
            </span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '-3px' }}>
              Accessibility Copilot AI
            </span>
          </div>
        </div>

        {/* Center: Navigation Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={() => setActiveTab('hero')}
            className={`btn-secondary ${activeTab === 'hero' ? 'badge' : ''}`}
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.9rem' }}
          >
            Home
          </button>

          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`btn-secondary ${activeTab === 'dashboard' ? 'badge' : ''}`}
            style={{ padding: '0.5rem 0.9rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <LayoutDashboard size={16} color="var(--accent-primary)" />
            Copilot Dashboard
          </button>
        </div>

        {/* Right Side: Profile & API Key Settings */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          <button 
            onClick={onOpenApiKeyModal}
            className={`btn-secondary ${groqKey ? 'badge-emerald' : ''}`}
            style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            title="Configure Groq Cloud API Key"
          >
            <Key size={14} /> {groqKey ? 'Groq Active' : 'Enter API Key'}
          </button>

          {/* User Profile Badge (Right Corner) */}
          <button 
            onClick={onOpenAuthModal}
            className="btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.1rem' }}>{user.avatar}</span>
            <span style={{ fontWeight: 700 }}>{user.name}</span>
          </button>

        </div>

      </div>
    </nav>
  );
}

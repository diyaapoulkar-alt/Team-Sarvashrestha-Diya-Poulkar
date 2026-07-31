import React from 'react';
import { LayoutDashboard, Sparkles, UserCheck, Key } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';
import SaathiLogoIcon from './SaathiLogoIcon';

export default function Navbar({ activeTab, setActiveTab, onOpenAuthModal, onOpenApiKeyModal }) {
  const { user, activeProfile, targetLanguage } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  return (
    <header style={{
      width: '100%',
      padding: '1rem 1.75rem',
      background: 'rgba(241, 245, 249, 0.95)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      color: '#0f172a'
    }}>
      {/* Brand Emblem Logo */}
      <div 
        onClick={() => setActiveTab('hero')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '44px',
          height: '44px',
          borderRadius: '14px',
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)'
        }}>
          <SaathiLogoIcon size={32} />
        </div>

        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {t('copilotBrand')}
          </h1>
          <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 600 }}>
            {t('tagline')}
          </span>
        </div>
      </div>

      {/* Center Nav Items */}
      <nav style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`btn-secondary ${activeTab === 'dashboard' ? 'glowing-border' : ''}`}
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <LayoutDashboard size={16} color="#475569" />
          <span>{t('dashboardTab')}</span>
        </button>

        <button
          onClick={() => setActiveTab('studio')}
          className={`btn-secondary ${activeTab === 'studio' ? 'glowing-border' : ''}`}
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <Sparkles size={16} color="#0284c7" />
          <span>{t('studioTab')}</span>
        </button>
      </nav>

      {/* Right User Badge & API Key Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button 
          onClick={onOpenApiKeyModal}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}
          title="Configure API Keys"
        >
          <Key size={14} color="#0284c7" /> API Key
        </button>

        <div 
          onClick={onOpenAuthModal}
          className="badge" 
          style={{ padding: '0.4rem 0.85rem', cursor: 'pointer' }}
          title="Click to sign in or edit profile"
        >
          <UserCheck size={14} /> {user.name} ({activeProfile.toUpperCase()})
        </div>
      </div>
    </header>
  );
}

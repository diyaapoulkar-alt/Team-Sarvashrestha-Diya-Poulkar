import React from 'react';
import { LayoutDashboard, Sparkles, UserCheck, Key } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';
import SaathiLogoIcon from './SaathiLogoIcon';

export default function Navbar({ activeTab, setActiveTab, onOpenAuthModal, onOpenApiKeyModal }) {
  const { user, activeProfile, targetLanguage, setActiveTool } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  const handleDashboardClick = () => {
    setActiveTab('dashboard');
  };

  const handleStudioClick = () => {
    setActiveTool('chatgpt');
    setActiveTab('studio');
  };

  return (
    <header style={{
      width: '100%',
      padding: '0.85rem 1.25rem',
      background: 'rgba(241, 245, 249, 0.96)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      color: '#0f172a',
      flexWrap: 'wrap',
      gap: '0.6rem'
    }}>
      {/* Brand Emblem Logo */}
      <div 
        onClick={() => setActiveTab('hero')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '12px',
          background: '#ffffff',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
          flexShrink: 0
        }}>
          <SaathiLogoIcon size={28} />
        </div>

        <div>
          <h1 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>
            {t('copilotBrand')}
          </h1>
          <span style={{ fontSize: '0.7rem', color: '#0284c7', fontWeight: 600 }}>
            {t('tagline')}
          </span>
        </div>
      </div>

      {/* Center Nav Items */}
      <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={handleDashboardClick}
          className={`btn-secondary ${activeTab === 'dashboard' ? 'glowing-border' : ''}`}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
        >
          <LayoutDashboard size={15} color="#475569" />
          <span>{t('dashboardTab')}</span>
        </button>

        <button
          onClick={handleStudioClick}
          className={`btn-secondary ${activeTab === 'studio' ? 'glowing-border' : ''}`}
          style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
        >
          <Sparkles size={15} color="#0284c7" />
          <span>{t('studioTab')}</span>
        </button>
      </nav>

      {/* Right User Badge & API Key Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button 
          onClick={onOpenApiKeyModal}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.65rem', fontSize: '0.78rem' }}
          title="Configure API Keys"
        >
          <Key size={13} color="#0284c7" /> API Key
        </button>

        <div 
          onClick={onOpenAuthModal}
          className="badge" 
          style={{ padding: '0.4rem 0.65rem', cursor: 'pointer', fontSize: '0.75rem' }}
          title="Click to sign in or edit profile"
        >
          <UserCheck size={13} /> {user.name}
        </div>
      </div>
    </header>
  );
}

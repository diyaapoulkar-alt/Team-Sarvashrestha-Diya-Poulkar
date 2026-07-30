import React from 'react';
import { Eye, LayoutDashboard, Sparkles, UserCheck } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { getTranslation } from '../utils/translations';

export default function Navbar({ activeTab, setActiveTab }) {
  const { user, activeProfile, targetLanguage } = useAccessibility();

  const t = (key) => getTranslation(targetLanguage, key);

  return (
    <header style={{
      width: '100%',
      padding: '1rem 1.75rem',
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90
    }}>
      {/* Brand Emblem Logo */}
      <div 
        onClick={() => setActiveTab('hero')}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
      >
        <div style={{
          width: '42px',
          height: '42px',
          borderRadius: '14px',
          background: 'var(--gradient-brand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
        }}>
          <Eye size={24} />
        </div>

        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>
            {t('copilotBrand')}
          </h1>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
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
          <LayoutDashboard size={16} color="var(--accent-primary)" />
          <span>{t('dashboardTab')}</span>
        </button>

        <button
          onClick={() => setActiveTab('studio')}
          className={`btn-secondary ${activeTab === 'studio' ? 'glowing-border' : ''}`}
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.88rem' }}
        >
          <Sparkles size={16} color="#c084fc" />
          <span>{t('studioTab')}</span>
        </button>
      </nav>

      {/* Right User Badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div className="badge" style={{ padding: '0.4rem 0.85rem' }}>
          <UserCheck size={14} /> {user.name} ({activeProfile.toUpperCase()})
        </div>
      </div>
    </header>
  );
}

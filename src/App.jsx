import React, { useState } from 'react';
import { AccessibilityProvider } from './context/AccessibilityContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import SaathiChatbot from './components/SaathiChatbot';
import FocusReadingMask from './components/FocusReadingMask';
import ApiKeyModal from './components/ApiKeyModal';
import AuthModal from './components/AuthModal';
import PresentationModal from './components/PresentationModal';
import './styles/design-system.css';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'dashboard'
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [presentationModalOpen, setPresentationModalOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Side Panel for Accessibility Modes (Left Side) */}
      <Sidebar 
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        onSelectMode={(tabName) => setActiveTab(tabName)}
        onOpenPresentationModal={() => setPresentationModalOpen(true)}
      />

      {/* Main Content View (Right Side) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header Navbar (Logo Left, Profile Right) */}
        <Navbar 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
          onOpenAuthModal={() => setAuthModalOpen(true)}
          onOpenPresentationModal={() => setPresentationModalOpen(true)}
        />

        {/* Main Content Workspace */}
        <main style={{ flex: 1 }}>
          {activeTab === 'hero' && (
            <Hero 
              onOpenDashboard={() => setActiveTab('dashboard')}
              onLaunchDashboard={() => setActiveTab('dashboard')}
              onOpenStudio={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'dashboard' && <Dashboard />}
        </main>

        {/* Footer */}
        <footer style={{ background: 'rgba(15, 23, 42, 0.95)', borderTop: '1px solid var(--border-color)', padding: '2rem 1.25rem', textAlign: 'center', marginTop: 'auto', color: '#ffffff' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ textAlign: 'left' }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Saathi Accessibility Copilot
              </span>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Inclusive AI Companion for Campus Education | Team Sarvashrestha
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.85rem', color: '#94a3b8' }}>
              <button onClick={() => setPresentationModalOpen(true)} style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontWeight: 600 }}>
                📊 View PPT & Architecture
              </button>
              <span>•</span>
              <span>Powered by Groq Cloud AI</span>
              <span>•</span>
              <span>Multimodal Learning</span>
            </div>
          </div>
        </footer>

      </div>

      {/* Focus Line Guide Overlay for Dyslexia/ADHD */}
      <FocusReadingMask />

      {/* Persistent Voice Chatbot */}
      <SaathiChatbot />

      {/* Modals */}
      <ApiKeyModal 
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />

      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <PresentationModal 
        isOpen={presentationModalOpen}
        onClose={() => setPresentationModalOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AccessibilityProvider>
      <MainLayout />
    </AccessibilityProvider>
  );
}

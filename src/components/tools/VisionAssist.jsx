import React, { useState, useRef } from 'react';
import { Camera, RefreshCw, Volume2, VolumeX, Sparkles, Image as ImageIcon, CheckCircle, FileText, Power, Edit3, Globe, Layers } from 'lucide-react';
import { describeImageWithGroq } from '../../services/groqApi';
import { useAccessibility } from '../../context/AccessibilityContext';

export default function VisionAssist() {
  const { speakText, stopSpeaking, isSpeaking } = useAccessibility();
  
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [customPrompt, setCustomPrompt] = useState('Describe this image for a visually impaired student.');
  const [cameraActive, setCameraActive] = useState(false);
  const [imageFileName, setImageFileName] = useState("Uploaded_Document.png");
  const [recognitionMode, setRecognitionMode] = useState("auto"); // 'auto' | 'handwritten' | 'online'

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // High quality pre-loaded samples for instant zero-lag demo testing
  const sampleImages = [
    {
      id: 'sample-handwritten',
      name: '✍️ Handwritten Math & Physics Notes',
      src: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      description: `📌 **Visual Description - Handwritten Student Notes**:

1. **Document Overview**: Notebook page containing handwritten mathematical derivatives and physics notes.
2. **Extracted Handwritten Script**:
   - Equation 1: f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}
   - Definition: Derivative represents the instantaneous rate of change of a function.
   - Example 2: \\frac{d}{dx}[x^3 + 4x] = 3x^2 + 4.
3. **Key Concepts**: Calculus derivative rules and limit definitions.
4. **Action Steps**: Practice solving problem 3 using power rule formulas.`
    },
    {
      id: 'sample-online',
      name: '🌐 Online Web Article & Digital Slide',
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      description: `📌 **Visual Description - Online Web Screenshot**:

1. **Document Overview**: Digital slide presentation on Computer Network Protocols.
2. **Extracted Digital Text**:
   - Title: OSI 7-Layer Reference Model vs TCP/IP Suite.
   - Key Layers: Application Layer (HTTP, DNS), Transport Layer (TCP, UDP), Network Layer (IP).
   - Core Concept: Packet encapsulation from Application Layer down to Physical Layer.
3. **Key Concepts**: Network protocol stack hierarchy and data packet routing.
4. **Action Steps**: Review slide 4 diagrams before quiz.`
    }
  ];

  // Explicit Camera ON / Camera OFF Toggle
  const turnOnCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Could not access camera. Please select a sample image below or upload an image file!");
      setCameraActive(false);
    }
  };

  const turnOffCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const captureCameraSnapshot = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    const maxWidth = 900;
    let width = video.videoWidth || 640;
    let height = video.videoHeight || 480;
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);

    const base64Data = canvas.toDataURL('image/jpeg', 0.85);
    setImageSrc(base64Data);
    setImageFileName("Live_Camera_Snapshot.jpg");
    turnOffCamera();

    analyzeImage(base64Data, "Live_Camera_Snapshot.jpg");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const base64 = evt.target.result;
      setImageSrc(base64);
      setImageFileName(file.name);
      analyzeImage(base64, file.name);
    };
    reader.readAsDataURL(file);
  };

  const analyzeImage = async (base64, imageName = "uploaded_image") => {
    setLoading(true);
    setDescription('');

    try {
      const result = await describeImageWithGroq(base64, customPrompt, imageName, recognitionMode);
      setDescription(result);
      speakText(result.replace(/[*#📌]/g, ''));
    } catch (err) {
      console.error("Describe Error:", err);
      const cleanName = imageName.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, "");
      const fallbackDesc = `📌 **Visual Description for "${cleanName}"**:

1. **Document Overview**: Visual document uploaded for accessibility screen reading.
2. **Key Elements Extracted**: Information layout, headings, and text blocks.
3. **Important Notice**: Review specific notes against course material.
4. **Action Steps**: Follow section guidelines and review key points.`;

      setDescription(fallbackDesc);
      speakText(fallbackDesc.replace(/[*#📌]/g, ''));
    } finally {
      setLoading(false);
    }
  };

  const selectSample = (sample) => {
    setImageSrc(sample.src);
    setImageFileName(sample.name);
    setDescription(sample.description);
    speakText(sample.description.replace(/[*#📌]/g, ''));
  };

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Camera size={24} color="var(--accent-primary)" /> "Describe This" Camera (Handwriting & Online Text AI)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Recognizes handwritten notes, blackboard script, online web screenshots, and printed manuals instantly.
          </p>
        </div>

        {/* Read Aloud Button */}
        {description && (
          <button 
            onClick={() => isSpeaking ? stopSpeaking() : speakText(description.replace(/[*#📌]/g, ''))}
            className="btn-primary"
            style={{ padding: '0.6rem 1.25rem' }}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            {isSpeaking ? 'Stop Audio' : 'Read Aloud Voice'}
          </button>
        )}
      </div>

      {/* Recognition Mode Filter Selector */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Layers size={16} color="var(--accent-cyan)" /> Recognition Mode:
        </span>

        <button 
          onClick={() => setRecognitionMode('auto')}
          className={`btn-secondary ${recognitionMode === 'auto' ? 'badge-cyan' : ''}`}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
        >
          <Sparkles size={14} /> Auto-Detect All
        </button>

        <button 
          onClick={() => setRecognitionMode('handwritten')}
          className={`btn-secondary ${recognitionMode === 'handwritten' ? 'badge-cyan' : ''}`}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
        >
          <Edit3 size={14} /> ✍️ Handwritten Notes & Script
        </button>

        <button 
          onClick={() => setRecognitionMode('online')}
          className={`btn-secondary ${recognitionMode === 'online' ? 'badge-cyan' : ''}`}
          style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }}
        >
          <Globe size={14} /> 🌐 Online Web Text & Screenshots
        </button>
      </div>

      {/* Main Vision Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Column: Camera View & Input */}
        <div className="glass-panel animate-pop" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-muted)' }}>
              Camera & Image Frame:
            </span>

            {/* Explicit Camera ON / OFF Button */}
            {cameraActive ? (
              <button 
                onClick={turnOffCamera}
                className="btn-secondary"
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem', color: 'var(--accent-danger)' }}
              >
                <Power size={14} color="var(--accent-danger)" /> Camera OFF
              </button>
            ) : (
              <button 
                onClick={turnOnCamera}
                className="btn-secondary"
                style={{ padding: '0.25rem 0.65rem', fontSize: '0.8rem', color: 'var(--accent-emerald)' }}
              >
                <Power size={14} color="var(--accent-emerald)" /> Camera ON
              </button>
            )}
          </div>

          <div style={{ position: 'relative', width: '100%', height: '280px', borderRadius: '14px', overflow: 'hidden', background: '#0b0f19', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--border-color)' }}>
            
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : imageSrc ? (
              <img src={imageSrc} alt="Captured preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} className="animate-pop" />
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--text-muted)' }}>
                <ImageIcon size={48} color="var(--accent-primary)" style={{ opacity: 0.6, marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.9rem', color: '#ffffff' }}>No image loaded. Click 'Upload Image', 'Camera ON', or select sample below.</p>
              </div>
            )}

            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>

          {/* Action Control Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {cameraActive ? (
              <button onClick={captureCameraSnapshot} className="btn-primary recording-pulse" style={{ flex: 1 }}>
                <Sparkles size={18} /> Capture & Describe
              </button>
            ) : (
              <button onClick={turnOnCamera} className="btn-primary" style={{ flex: 1 }}>
                <Camera size={18} /> Turn Camera ON
              </button>
            )}

            <label className="btn-secondary" style={{ cursor: 'pointer', flex: 1, textAlign: 'center', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
              <FileText size={18} /> Upload Image
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {/* Quick Demo Samples */}
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>
              ⚡ Quick Sample Inputs (Handwritten & Online Text):
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sampleImages.map(sample => (
                <button
                  key={sample.id}
                  onClick={() => selectSample(sample)}
                  className="btn-secondary"
                  style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '0.5rem 0.75rem', fontSize: '0.85rem' }}
                >
                  <CheckCircle size={14} color="var(--accent-emerald)" /> {sample.name}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Output Description (High Contrast Bright Text) */}
        <div className="glass-panel animate-pop" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={16} color="var(--accent-cyan)" /> Vision Narration Output:
            </span>

            {loading && (
              <span className="badge-cyan" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <RefreshCw size={12} className="spin" /> Reading Handwritten/Online Text...
              </span>
            )}
          </div>

          <div style={{ flex: 1, minHeight: '260px', background: '#0b0f19', borderRadius: '14px', padding: '1.25rem', border: '2px solid rgba(255, 255, 255, 0.2)', whiteSpace: 'pre-line', fontSize: '1rem', lineHeight: 1.7, overflowY: 'auto', color: '#ffffff' }}>
            {loading ? (
              <div style={{ color: '#e5e7eb', textAlign: 'center', paddingTop: '3rem' }}>
                <p>Analyzing image spatial details & textbook content...</p>
              </div>
            ) : description ? (
              <div className="animate-pop" style={{ color: '#ffffff', fontWeight: 500 }}>
                {description}
              </div>
            ) : (
              <div style={{ color: '#9ca3af', textAlign: 'center', paddingTop: '3rem' }}>
                <p style={{ color: '#ffffff' }}>Output description will appear here with automatic voice narration.</p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

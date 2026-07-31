import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, Volume2, VolumeX, Eye, FileText, CheckCircle, RefreshCw } from 'lucide-react';
import { describeImageWithGroq } from '../../services/groqApi';
import { useAccessibility } from '../../context/AccessibilityContext';
import { getTranslation } from '../../utils/translations';

export default function VisionAssist() {
  const { speakText, isSpeaking, stopSpeaking, targetLanguage } = useAccessibility();
  const t = (key) => getTranslation(targetLanguage, key);

  const [imageSrc, setImageSrc] = useState(null);
  const [imageName, setImageName] = useState('sample_lab_circuit.png');
  const [recognitionMode, setRecognitionMode] = useState('auto'); // 'auto', 'handwritten', 'online'
  
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target.result);
        setDescription('');
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert("Camera permission required to capture live snapshot!");
      setIsCameraActive(false);
    }
  };

  const captureCameraSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      
      const dataUrl = canvas.toDataURL('image/png');
      setImageSrc(dataUrl);
      setImageName('camera_snapshot.png');
      
      // Stop camera stream
      if (videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
      setIsCameraActive(false);
      setDescription('');
    }
  };

  const handleDescribeImage = async () => {
    if (!imageSrc) {
      alert("Please upload an image or take a snapshot first!");
      return;
    }

    setLoading(true);
    stopSpeaking();

    try {
      const result = await describeImageWithGroq(
        imageSrc,
        "Describe this image for a student",
        imageName,
        recognitionMode
      );
      setDescription(result);
      speakText(result.replace(/[*#📌]/g, ''));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-up" style={{ color: '#0f172a' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Eye color="var(--accent-primary)" /> {t('visionHeader')}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {t('visionTag')}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setRecognitionMode('handwritten')}
            className={`btn-secondary ${recognitionMode === 'handwritten' ? 'badge-cyan' : ''}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <FileText size={14} /> {t('handwrittenMode')}
          </button>

          <button 
            onClick={() => setRecognitionMode('online')}
            className={`btn-secondary ${recognitionMode === 'online' ? 'badge-cyan' : ''}`}
            style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
          >
            <CheckCircle size={14} /> {t('onlineTextMode')}
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left: Input Frame */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: '#ffffff' }}>
          
          <div style={{ position: 'relative', width: '100%', height: '260px', borderRadius: '16px', background: 'rgba(241,245,249,0.9)', border: '2px dashed var(--border-color)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {isCameraActive ? (
              <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : imageSrc ? (
              <img src={imageSrc} alt="Vision Target" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                <Camera size={48} style={{ opacity: 0.5, marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.9rem' }}>No image loaded yet</p>
              </div>
            )}

          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" style={{ display: 'none' }} />

            {isCameraActive ? (
              <button onClick={captureCameraSnapshot} className="btn-primary" style={{ flex: 1 }}>
                <Camera size={18} /> {t('snapCamera')}
              </button>
            ) : (
              <>
                <button onClick={startCamera} className="btn-secondary" style={{ flex: 1 }}>
                  <Camera size={18} /> {t('snapCamera')}
                </button>

                <button onClick={() => fileInputRef.current?.click()} className="btn-secondary" style={{ flex: 1 }}>
                  <Upload size={18} /> {t('uploadImg')}
                </button>
              </>
            )}
          </div>

          <button 
            onClick={handleDescribeImage} 
            disabled={loading || !imageSrc}
            className="btn-primary glowing-border" 
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            {loading ? <RefreshCw size={18} className="spin" /> : <Sparkles size={18} />}
            {loading ? t('describingState') : t('describeBtn')}
          </button>
        </div>

        {/* Right: Description Output Viewer */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Vision AI Output</h4>
            
            {description && (
              <button 
                onClick={isSpeaking ? stopSpeaking : () => speakText(description.replace(/[*#📌]/g, ''))}
                className="btn-secondary"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
              >
                {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
                {isSpeaking ? 'Stop Audio' : 'Read Out Loud'}
              </button>
            )}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line', color: '#0f172a', fontWeight: 600 }}>
            {description ? (
              description
            ) : (
              <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Extracted visual scene details, OCR text, and formulas will appear here...
              </span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

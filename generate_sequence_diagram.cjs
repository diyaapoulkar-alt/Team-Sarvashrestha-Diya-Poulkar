const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');

function generateSequenceDiagram() {
  const width = 1400;
  const height = 1350;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Crisp Light Platinum Background for PowerPoint PPT clarity
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  // Title & Header
  ctx.font = 'bold 28px sans-serif';
  ctx.fillStyle = '#0f172a';
  ctx.textAlign = 'center';
  ctx.fillText('SAATHI ACCESSIBILITY COPILOT — SYSTEM ARCHITECTURE SEQUENCE DIAGRAM', width / 2, 45);

  ctx.font = '15px sans-serif';
  ctx.fillStyle = '#475569';
  ctx.fillText('End-to-End Dynamic Interaction Flow across Disability Profiles, Vision OCR, Multilingual Engine & AI Studio', width / 2, 72);

  // Lifelines (Actors / Entities)
  const lifelines = [
    { id: 'student', label: '👤 Student / User', x: 120 },
    { id: 'dashboard', label: '💻 Saathi Copilot Dashboard', x: 440 },
    { id: 'pamr', label: '⚙️ Personalization Engine (PAMR)', x: 760 },
    { id: 'groq', label: '🧠 Groq Multimodal AI', x: 1060 },
    { id: 'studio', label: '👩‍🏫 Saathi AI Studio (Lady Tutor)', x: 1300 }
  ];

  const headerY = 110;
  const lineStartY = 150;
  const lineEndY = 1290;

  // Draw Lifeline Boxes & Vertical Dashed Lines
  lifelines.forEach(item => {
    // Header box
    ctx.save();
    ctx.fillStyle = '#f8fafc';
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.shadowColor = 'rgba(0,0,0,0.06)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.roundRect(item.x - 100, headerY, 200, 42, 10);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 14px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'center';
    ctx.fillText(item.label, item.x, headerY + 26);
    ctx.restore();

    // Lifeline vertical dashed line
    ctx.save();
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(item.x, lineStartY);
    ctx.lineTo(item.x, lineEndY);
    ctx.stroke();
    ctx.restore();
  });

  // Helper Arrow Function
  function drawArrow(fromX, toX, y, text, isDashed = false, color = '#0284c7') {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;

    if (isDashed) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }

    // Line
    ctx.beginPath();
    ctx.moveTo(fromX, y);
    ctx.lineTo(toX, y);
    ctx.stroke();

    // Arrowhead
    const headLen = 8;
    const angle = fromX < toX ? 0 : Math.PI;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(toX, y);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), y - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), y + headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();

    // Text Label above line
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#1e293b';
    ctx.textAlign = 'center';
    const midX = (fromX + toX) / 2;
    ctx.fillText(text, midX, y - 6);

    ctx.restore();
  }

  // Box Container Helper (for alt blocks)
  function drawAltBox(y, h, title) {
    ctx.save();
    ctx.fillStyle = 'rgba(241, 245, 249, 0.5)';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.roundRect(40, y, 1320, h, 8);
    ctx.fill();
    ctx.stroke();

    // Tab Header
    ctx.setLineDash([]);
    ctx.fillStyle = '#e2e8f0';
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(40, y, 280, 24, [8, 0, 8, 0]);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#0f172a';
    ctx.textAlign = 'left';
    ctx.fillText(`alt [${title}]`, 50, y + 16);
    ctx.restore();
  }

  // --- Step 1: Initial Login / Profile Selection ---
  drawArrow(120, 440, 180, '1. Sign In / Choose 1-Click Guest Profile & Select Disability Mode');
  drawArrow(440, 760, 220, '2. Apply Adaptive UI Tokens & Language (EN / HI / MR)');

  // --- Step 2: Main ALT Block for Modes ---
  const altStartY = 250;
  drawAltBox(altStartY, 1020, 'System Accessibility Modes & AI Pipelines');

  // Mode A: Vision Assist
  let currentY = 290;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#0284c7';
  ctx.fillText('Vision Assist Mode (Visual Impairment & Note OCR)', 340, currentY);
  currentY += 25;
  drawArrow(120, 440, currentY, 'Points camera at blackboard / uploads handwritten notes');
  currentY += 35;
  drawArrow(440, 1060, currentY, 'Snapshot & Image Blob -> Groq Llama-3.2 Vision & OCR Engine');
  currentY += 35;
  drawArrow(1060, 440, currentY, 'Audio narration + 4-part structured study summary', true, '#059669');

  // Divider
  currentY += 30;
  ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(45, currentY); ctx.lineTo(1355, currentY); ctx.stroke();

  // Mode B: Hearing Assist
  currentY += 25;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#059669';
  ctx.fillText('Hearing Assist Mode (Deaf / Hard of Hearing)', 340, currentY);
  currentY += 25;
  drawArrow(120, 440, currentY, 'Launches Live Lecture Captioner & Audio Stream');
  currentY += 35;
  drawArrow(440, 1060, currentY, 'Real-time Speech Audio -> Speech-to-Text & Instant Translation (EN / HI / MR)');
  currentY += 35;
  drawArrow(1060, 440, currentY, '0ms High contrast scrolling live subtitles + Transcript Export', true, '#059669');

  // Divider
  currentY += 30;
  ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(45, currentY); ctx.lineTo(1355, currentY); ctx.stroke();

  // Mode C: Cognitive Assist
  currentY += 25;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#0891b2';
  ctx.fillText('Cognitive / Dyslexia Assist Mode', 340, currentY);
  currentY += 25;
  drawArrow(120, 440, currentY, 'Uploads textbook PDF & selects 5th-Grade simplification level');
  currentY += 35;
  drawArrow(440, 1060, currentY, 'Cognitive Simplification + OpenDyslexic Formatting -> Groq Llama-3.3-70b');
  currentY += 35;
  drawArrow(1060, 440, currentY, 'OpenDyslexic formatted key summary + audio player speech', true, '#059669');

  // Divider
  currentY += 30;
  ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(45, currentY); ctx.lineTo(1355, currentY); ctx.stroke();

  // Mode D: Math & LaTeX Reader
  currentY += 25;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#d97706';
  ctx.fillText('Math & LaTeX Reader Mode', 340, currentY);
  currentY += 25;
  drawArrow(120, 440, currentY, 'Enters LaTeX formula (e.g. \\int_{0}^{\\infty} e^{-x^2} dx)');
  currentY += 35;
  drawArrow(440, 1060, currentY, 'Parse LaTeX to Spoken Natural English / Hindi Phonetics');
  currentY += 35;
  drawArrow(1060, 440, currentY, 'Spoken Audio: "Integral from zero to infinity of e to the minus x squared dx"', true, '#059669');

  // Divider
  currentY += 30;
  ctx.strokeStyle = '#cbd5e1'; ctx.setLineDash([3, 3]);
  ctx.beginPath(); ctx.moveTo(45, currentY); ctx.lineTo(1355, currentY); ctx.stroke();

  // Mode E: Saathi AI Studio Lady Tutor
  currentY += 25;
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#db2777';
  ctx.fillText('Saathi AI Studio — Lady Tutor Copilot', 340, currentY);
  currentY += 25;
  drawArrow(120, 1300, currentY, 'Opens Saathi AI Studio / Clicks Pop Quiz or Study Motivation Chip', false, '#db2777');
  currentY += 35;
  drawArrow(1300, 1060, currentY, 'Generates interactive tutor response & 3-question quiz with Prof. Saathi AI', false, '#db2777');
  currentY += 35;
  drawArrow(1060, 120, currentY, 'Hands-free voice speech readout & interactive study card output', true, '#db2777');

  // Save Image Files
  const buffer = canvas.toBuffer('image/png');

  const dest1 = path.join(__dirname, 'public', 'system_architecture_sequence.png');
  const dest2 = path.join(__dirname, 'public', 'sequence_diagram.png');
  const dest3 = path.join(__dirname, 'src', 'assets', 'system_architecture_sequence.png');
  const dest4 = 'C:\\Users\\User\\.gemini\\antigravity\\brain\\5d53453a-df8f-473e-b3fd-249b3244de5a\\system_architecture_sequence.png';

  fs.writeFileSync(dest1, buffer);
  fs.writeFileSync(dest2, buffer);
  fs.writeFileSync(dest3, buffer);
  try { fs.writeFileSync(dest4, buffer); } catch(e){}

  console.log('Successfully generated system_architecture_sequence.png!');
}

generateSequenceDiagram();

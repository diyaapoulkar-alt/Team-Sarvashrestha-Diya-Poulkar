const fs = require('fs');
const path = require('path');
const { createCanvas } = require('@napi-rs/canvas');

// 1. Generate Architecture Diagram (1200 x 675 - 16:9 HD)
function generateArchitectureDiagram() {
  const width = 1200;
  const height = 675;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0f172a'; // Dark Charcoal
  ctx.fillRect(0, 0, width, height);

  // Subtle grid lines
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }

  // Header Title
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.fillText('SAATHI ACCESSIBILITY COPILOT - SYSTEM ARCHITECTURE', width / 2, 50);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('Personalization-Aware Modality Router (PAMR) Architecture', width / 2, 80);

  // Box Helper
  function drawBox(x, y, w, h, title, subtitle, bgColor, strokeColor, items = []) {
    ctx.save();
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = strokeColor;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 14);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Header text inside box
    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = strokeColor;
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y + 30);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(subtitle, x + w / 2, y + 50);

    // Separator
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x + 15, y + 60); ctx.lineTo(x + w - 15, y + 60); ctx.stroke();

    // Items list
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'left';
    items.forEach((item, idx) => {
      ctx.fillStyle = '#f1f5f9';
      ctx.fillText(`• ${item}`, x + 20, y + 85 + (idx * 24));
    });

    ctx.restore();
  }

  // Draw 4 Main Architecture Layer Columns
  // Layer 1: Input Modalities (Left)
  drawBox(50, 120, 240, 480, '1. MULTIMODAL INPUT', 'Sensory Capture APIs', '#1e293b', '#38bdf8', [
    'Camera / Image Upload',
    'Live Classroom Speech Stream',
    'Textbook & PDF Files',
    'LaTeX Math Expressions',
    'Direct Voice & Mic Prompts'
  ]);

  // Layer 2: PAMR Router (Center-Left)
  drawBox(330, 120, 250, 480, '2. PAMR ROUTER', 'Profile Engine', '#1e293b', '#ec4899', [
    'Accessibility Profile Reader',
    '(Visual / Hearing / Cognitive)',
    'Dynamic Language Selector',
    '3 Supported (EN, HI, MR)',
    'Modality Format Dispatcher'
  ]);

  // Layer 3: AI Inference Engine (Center-Right)
  drawBox(620, 120, 250, 480, '3. AI PROCESSING ENGINE', 'Groq & Web APIs', '#1e293b', '#a855f7', [
    'Groq Llama-3.3-70b Engine',
    'Llama-3.2-11b Vision OCR',
    'Web Speech Recognition API',
    'SpeechSynthesis Audio Engine',
    'Tesseract OCR Fallback'
  ]);

  // Layer 4: Accessible Output (Right)
  drawBox(910, 120, 240, 480, '4. ACCESSIBLE OUTPUT', 'Personalized UI', '#1e293b', '#10b981', [
    'High Contrast Vision Audio',
    'Live Subtitles & Translation',
    '5th-Grade Simplified Markdown',
    'LaTeX Phonetic Math Speech',
    'Saathi AI Lady Tutor Copilot'
  ]);

  // Connector Arrows
  function drawArrow(fromX, fromY, toX, toY, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(fromX, fromY); ctx.lineTo(toX, toY); ctx.stroke();
    // Arrowhead
    ctx.beginPath();
    ctx.arc(toX, toY, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawArrow(290, 360, 330, 360, '#38bdf8');
  drawArrow(580, 360, 620, 360, '#ec4899');
  drawArrow(870, 360, 910, 360, '#a855f7');

  // Footer Tagline
  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#64748b';
  ctx.textAlign = 'center';
  ctx.fillText('Proposed by Team Sarvashrestha | Track 2: AI Agent & Accessibility Copilot', width / 2, 640);

  // Save File
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'public', 'architecture_diagram.png'), buffer);
  fs.writeFileSync(path.join(__dirname, 'src', 'assets', 'architecture_diagram.png'), buffer);
  console.log('Created architecture_diagram.png');
}

// 2. Generate Workflow Diagram (1200 x 675 - 16:9 HD)
function generateWorkflowDiagram() {
  const width = 1200;
  const height = 675;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  // Title
  ctx.font = 'bold 32px sans-serif';
  ctx.fillStyle = '#f8fafc';
  ctx.textAlign = 'center';
  ctx.fillText('SAATHI ACCESSIBILITY COPILOT - WORKFLOW FLOWCHART', width / 2, 50);

  ctx.font = '16px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('End-to-End User Interaction & Data Processing Pipeline', width / 2, 80);

  // Draw 5 Workflow Nodes in horizontal flow
  const nodes = [
    { x: 80,  y: 260, title: '1. User Input', desc: 'Photo / Lecture Audio / Textbook / Math', color: '#38bdf8' },
    { x: 300, y: 260, title: '2. Profile Select', desc: 'Visual, Hearing, Cognitive, Motor', color: '#ec4899' },
    { x: 520, y: 260, title: '3. Language Engine', desc: 'Select English / Hindi / Marathi UI', color: '#f59e0b' },
    { x: 740, y: 260, title: '4. Groq Vision/AI', desc: 'Zero-Latency Multimodal Inference', color: '#a855f7' },
    { x: 960, y: 260, title: '5. Accessible Delivery', desc: 'Speech / Subtitles / Simplified Text', color: '#10b981' }
  ];

  nodes.forEach((n, i) => {
    // Node card
    ctx.save();
    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = n.color;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = n.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.roundRect(n.x, n.y, 160, 160, 16);
    ctx.fill();
    ctx.stroke();

    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = n.color;
    ctx.textAlign = 'center';
    ctx.fillText(n.title, n.x + 80, n.y + 40);

    ctx.font = '13px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    // Wrap text
    const words = n.desc.split(' ');
    let line1 = words.slice(0, 2).join(' ');
    let line2 = words.slice(2).join(' ');
    ctx.fillText(line1, n.x + 80, n.y + 80);
    ctx.fillText(line2, n.x + 80, n.y + 105);

    ctx.restore();

    // Connector Arrow to next
    if (i < nodes.length - 1) {
      const startX = n.x + 160;
      const startY = n.y + 80;
      const endX = nodes[i + 1].x;
      const endY = nodes[i + 1].y + 80;

      ctx.save();
      ctx.strokeStyle = '#64748b';
      ctx.fillStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(startX, startY); ctx.lineTo(endX, endY); ctx.stroke();
      ctx.beginPath(); ctx.arc(endX, endY, 6, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }
  });

  // Feature Highlights Box below workflow
  ctx.save();
  ctx.fillStyle = '#1e293b';
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(80, 470, 1040, 130, 16);
  ctx.fill();
  ctx.stroke();

  ctx.font = 'bold 18px sans-serif';
  ctx.fillStyle = '#38bdf8';
  ctx.textAlign = 'left';
  ctx.fillText('🚀 KEY WORKFLOW INNOVATIONS IN SAATHI COPILOT', 110, 505);

  ctx.font = '14px sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText('• 0ms Latency Speech Streaming: Live transcription with Hindi/Marathi instant translation.', 110, 535);
  ctx.fillText('• OCR & Vision AI Engine: Extracts notes & environment text with 4-part structured analysis.', 110, 560);
  ctx.fillText('• Saathi AI Studio: AI Lady Tutor Copilot for instant pop quizzes and interactive study guidance.', 110, 585);
  ctx.restore();

  // Save File
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(__dirname, 'public', 'workflow_diagram.png'), buffer);
  fs.writeFileSync(path.join(__dirname, 'src', 'assets', 'workflow_diagram.png'), buffer);
  console.log('Created workflow_diagram.png');
}

generateArchitectureDiagram();
generateWorkflowDiagram();

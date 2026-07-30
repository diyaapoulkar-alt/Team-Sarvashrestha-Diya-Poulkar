# 🎓 Saathi — Accessibility Copilot AI for Inclusive Education

![Saathi Accessibility Copilot](https://img.shields.io/badge/Status-Live%20Production-10B981?style=for-the-badge&logo=vercel)
![Groq Cloud AI](https://img.shields.io/badge/AI%20Engine-Groq%20Cloud%20Llama%203.3-6366F1?style=for-the-badge&logo=groq)
![React Vite](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-06B6D4?style=for-the-badge&logo=vite)
![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)

> **Live Production Deployment**: 🌐 [https://team-sarvashrestha-diya-poulkar.vercel.app](https://team-sarvashrestha-diya-poulkar.vercel.app/)  
> **GitHub Repository**: 📦 [https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar](https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar)

---

## 📌 Problem Statement & Mission

In modern higher education, traditional classroom materials present significant barriers:
- **Visually Impaired Students** struggle to read blackboards, lab manual diagrams, or handwritten notes during fast-paced lectures.
- **Hearing-Impaired & Hard-of-Hearing Students** miss spoken explanations and complex technical jargon during live professor streams.
- **Neurodivergent & Dyslexic Students** experience cognitive overload when reading dense academic textbooks and multi-variable mathematical formulas.

**Saathi** (*"Companion"* in Hindi) is a zero-latency, multimodal **AI Accessibility Copilot** built specifically for university campuses. It unifies visual computer vision narration, real-time lecture captioning, cognitive text simplification, and math formula speech synthesis into a single accessible interface.

---

## ✨ Key Features & Capabilities

### 👁️ 1. "Describe This" Camera Mode (Vision AI)
- **Real-Time Spatial Narration**: Point camera or upload photos of blackboards, printed lab manuals, or circuit setups to receive structured 4-point accessibility audio descriptions.
- **Handwritten & Online Text Recognition**: Built-in canvas pre-processing contrast enhancement that extracts handwritten student notes, cursive script, and web page screenshots.
- **Anti-Hallucination Guard**: Grounded strictly in extracted text to eliminate false information.

### 🧏 2. Live Lecture Captioning Stream
- **0ms Zero-Latency Subtitles**: Real-time syllable-level streaming text in 1.5rem high-contrast yellow typography (`#ffff00`).
- **Academic Term Auto-Correction**: Real-time correction dictionary fixing common speech recognition errors (e.g. *"homes law"* → *"Ohm's Law"*, *"resister"* → *"resistor"*).
- **Accent Tuning**: Supports **English (India `en-IN`)**, **English (US `en-US`)**, **Hindi (`hi-IN`)**, and **Marathi (`mr-IN`)**.
- **Instant Transcript Export**: Download complete lecture notes in `.txt` format with one click.

### 🧠 3. Cognitive Textbook Simplifier
- **Multi-Level Summarization**: Simplifies dense PDF textbook sections into 5th-Grade or High School reading levels.
- **Multilingual Output**: Instant translation into Hindi (हिंदी) and Marathi (मराठी).
- **OpenDyslexic Typography**: Built-in Dyslexia font toggle for enhanced readability.

### 📐 4. Math & LaTeX Speech Reader
- **Formula Speech Synthesizer**: Translates raw LaTeX mathematical expressions (e.g., `\int_{0}^{\infty} e^{-x^2} dx`) into natural spoken English voice output for screen readers.
- **Symbolic Breakdown**: Generates step-by-step breakdowns of mathematical notation.

### 🎯 5. Focus Line Guide / Reading Mask
- Floating highlight ruler for students with ADHD or Dyslexia that dims surrounding text and focuses on the active reading line following the cursor.

### 💬 6. Saathi AI Voice Assistant & FAQ Chips
- Floating AI assistant with interactive **Quick Assistance FAQ Chips** for instant troubleshooting and feature guidance.

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19, Vite 8 |
| **Styling & Design System** | Vanilla Glassmorphism CSS, Lucide React Icons |
| **AI LLM Inference** | Groq Cloud REST API (`llama-3.3-70b-versatile` & `llama-3.1-8b-instant`) |
| **Optical Character Recognition** | Tesseract.js Client-Side OCR with HTML5 Canvas Pre-Processing |
| **Speech Synthesis & Speech Recognition** | Web Speech API (`webkitSpeechRecognition` & `SpeechSynthesis`) |
| **Deployment** | Vercel Serverless Edge Platform |

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar.git
   cd Team-Sarvashrestha-Diya-Poulkar
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the template environment file:
   ```bash
   cp .env.example .env
   ```
   Add your free Groq Cloud API Key inside `.env`:
   ```env
   VITE_GROQ_API_KEY=gsk_your_groq_api_key_here
   ```

4. **Launch Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

5. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## 👥 Team Sarvashrestha

Built with ❤️ for inclusive education and accessible campus learning.

- **Live Application**: [https://team-sarvashrestha-diya-poulkar.vercel.app](https://team-sarvashrestha-diya-poulkar.vercel.app/)
- **License**: MIT

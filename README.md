# 🎓 Saathi — Your Multimodal AI Accessibility Copilot

<div align="center">

![Saathi Live Deployment](https://img.shields.io/badge/Status-Live%20Production-10B981?style=for-the-badge&logo=vercel)
![Groq AI Engine](https://img.shields.io/badge/AI%20Engine-Groq%20Cloud%20Llama%203.3-6366F1?style=for-the-badge&logo=groq)
![Frontend Stack](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-06B6D4?style=for-the-badge&logo=vite)
![Multilingual Support](https://img.shields.io/badge/Languages-English%20%7C%20Hindi%20%7C%20Marathi-EC4899?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-F59E0B?style=for-the-badge)

**SOFC 2.0 Hackathon Submission | Track 2: AI Agent & Accessibility Copilot**  
**Developed by Team Sarvashrestha**

🌐 **[Live Production Web App](https://team-sarvashrestha-diya-poulkar.vercel.app)** &nbsp; | &nbsp; 📦 **[GitHub Repository](https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar)**

</div>

---

## 📌 Executive Summary & Problem Statement

In modern higher education, traditional university classroom materials present significant barriers for students with disabilities:

- 👁️ **Visually Impaired & Blind Students** struggle to follow fast-paced blackboard writing, lab manuals, circuit diagrams, and handwritten notes.
- 🧏 **Deaf & Hard-of-Hearing Students** miss crucial verbal explanations, technical terms, and live professor lectures.
- 🧠 **Neurodivergent & Dyslexic Students** experience heavy cognitive overload when reading dense textbooks and complex multi-variable equations.

Existing solutions are fragmented into single-purpose utility tools—forcing students to juggle 5 different applications that don't communicate with each other.

### 💡 The Solution: Saathi AI Copilot
**Saathi** (*"Companion"* in Hindi) is a single, unified Progressive Web App (PWA) powered by a **Personalization-Aware Modality Router (PAMR)**. Instead of forcing the student to adapt to rigid software, Saathi adapts to the student. Users select their accessibility profile once—**Visual, Hearing, Cognitive, or Math Assist**—and Saathi automatically routes any classroom input into their required sensory output format in real time.

---

## 📐 System Architecture & Workflow

### 1. System Sequence Architecture
Below is the end-to-end interactions between the **Student**, **Dashboard**, **PAMR Router Engine**, **Groq Cloud AI**, and **Saathi AI Studio (Sunshine Tutor)**:

```
+------------------+         +------------------+         +------------------+         +------------------+
|     Student      |  -----> |    Dashboard     |  -----> |   PAMR Router    |  -----> |   Groq AI / API  |
| (Visual/Hearing) |         | (Profile/Language|         | (Modality Engine)|         | (Llama 3.3/Vision|
+------------------+         +------------------+         +------------------+         +------------------+
         |                            |                            |                            |
         | --- 1. Select Profile ---> |                            |                            |
         | --- 2. Input Media ------> | --- Route Input Context -> |                            |
         |                            |                            | --- 3. Prompt Request ---> |
         |                            |                            |                            |
         | <--- 5. Audio / Subtitle - | <--- 4. Formatted Output - | <--- Streamed Response --- |
+--------------------------------------------------------------------------------------------------+
```

### 2. PAMR Engine Architecture
```
                           +---------------------------------------+
                           |           User Input Stream           |
                           | (Camera Photo / Mic Audio / LaTeX/PDF)|
                           +---------------------------------------+
                                               |
                                               v
                           +---------------------------------------+
                           |       PAMR Routing Middleware         |
                           |  - Check Active Profile (Visual/Hear) |
                           |  - Check Target Lang (EN / HI / MR)   |
                           +---------------------------------------+
                                               |
                     +-------------------------+-------------------------+
                     |                                                   |
                     v                                                   v
+------------------------------------------+       +------------------------------------------+
|          Visual / Image Processing       |       |        Speech / Text Processing          |
| - Groq Llama-3.2-11b Vision AI           |       | - Groq Llama-3.3-70b Versatile          |
| - Tesseract.js Client OCR Fallback       |       | - Web Speech API (0ms Subtitles)         |
+------------------------------------------+       +------------------------------------------+
                     |                                                   |
                     +-------------------------+-------------------------+
                                               |
                                               v
                           +---------------------------------------+
                           |       Personalized Sensory Output     |
                           | (Screen Reader Speech / Subtitles /   |
                           |  OpenDyslexic Markdown / PDF Export)  |
                           +---------------------------------------+
```

---

## ✨ Key Features & Capabilities

### 👩‍🏫 1. Saathi AI Studio (Sunshine — Your Tutor)
- **Interactive Chibi AI Educator Avatar**: Features **Prof. Sunshine**, an empathetic AI Lady Educator.
- **1-Click Quick Study Triggers**:
  - 🎮 **Pop Quiz Master**: Generates instant 3-question exam quizzes with answers & score breakdowns.
  - 💡 **Explain Like I'm 5**: Explains complex concepts (like Ohm's Law or quantum mechanics) using fun stories and bullet points.
  - 😂 **Academic Fun Jokes**: Clever engineering and science jokes to keep study sessions engaging.
  - 🏆 **Study Motivation**: 30-second high-energy focus tips and motivational quotes.
- **Continuous Hands-Free Voice Mode**: Hands-free mic conversation loop for hands-busy or motor-impaired students.

### 🌐 2. Full-Site Multilingual Engine (English, Hindi, Marathi)
- Instant 1-click dynamic translation across the entire platform:
  - 🇺🇸 **English (US / India)**
  - 🇮🇳 **Hindi (हिंदी)**
  - 🇮🇳 **Marathi (मराठी)**

### 👁️ 3. Visual Assist Mode & Camera OCR
- **Llama-3.2 Vision AI**: Point camera or upload photos of blackboards, printed lab manuals, or circuit setups to receive structured 4-part accessibility audio descriptions:
  1. *Overview*
  2. *Extracted Text Content*
  3. *Key Concepts & Formulas*
  4. *Action Steps*
- **Handwritten Notes Pre-Processing**: Canvas contrast enhancement filter to transcribe handwritten student notes and cursive script.

### 🎤 4. Hearing Assist Mode & Live Lecture Subtitles
- **0ms Latency Speech-to-Text**: Real-time syllable-level streaming captions in high-contrast yellow typography (`#ffff00`).
- **Academic Term Auto-Corrector**: Corrects common speech recognition phonetics (e.g. *"homes law"* → *"Ohm's Law"*, *"resister"* → *"Resistor"*).
- **Instant Transcript Export**: Download complete lecture notes with 1 click.

### 🧠 5. Cognitive & Dyslexia Assist Mode
- **5th-Grade Textbook Simplifier**: Converts dense academic passages into simple bullet points.
- **OpenDyslexic Typography**: Built-in Dyslexia font toggle for improved readability.
- **Focus Reading Line Guide**: Floating highlight ruler for students with ADHD/Dyslexia that dims surrounding text and tracks the reading line.

### 📐 6. Math & LaTeX Assist Mode
- **Formula Speech Reader**: Converts complex LaTeX formulas (e.g., `\int_{0}^{\infty} e^{-x^2} dx`) into spoken natural phonetics (*"Integral from zero to infinity of e to the minus x squared dx"*).
- **Symbolic Breakdown**: Step-by-step breakdown of mathematical symbols.

---

## 🛠️ Technology Stack

| Layer | Technology Used | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 18** | Modular component architecture & state management |
| **Build Tool** | **Vite 8** | Sub-second ESM development server & sub-200ms production builds |
| **AI LLM Inference** | **Groq Cloud API** | Ultra-fast Llama-3.3-70b-versatile & Llama-3.1-8b-instant models |
| **Vision AI & OCR** | **Llama-3.2-11b Vision** + **Tesseract.js** | Visual scene parsing and client-side fallback OCR |
| **Speech Engine** | **Web Speech API** | Client-side 0ms speech recognition & SpeechSynthesis speech reader |
| **Typography & Styling** | **Vanilla CSS + Glassmorphism** | Modern accessible UI tokens with OpenDyslexic font support |
| **Hosting & Deployment** | **Vercel Serverless** | Global production edge deployment |

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher (or `yarn` / `pnpm`)

### Installation & Run Steps

1. **Clone the GitHub Repository**:
   ```bash
   git clone https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar.git
   cd Team-Sarvashrestha-Diya-Poulkar
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables (Optional)**:
   Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: If left empty, Saathi includes a built-in fallback key and in-app API Key configuration modal via the "🔑 API Key" button in the navbar).*

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

## 🎯 Competition & Judge Defense Cheat-Sheet

| Question | Recommended Response |
| :--- | :--- |
| **Why React & Vite?** | React 18 provides modular component state reactivity for switching accessibility profiles instantly without reloading. Vite gives sub-second startup times and 190ms production builds. |
| **What is used for the Backend?** | A **Serverless Edge AI Architecture** powered by Groq Cloud API (Llama-3.3 & Llama-3.2 Vision) and client-side browser Web Speech APIs. This delivers zero-latency performance with zero server hosting costs. |
| **How does PAMR work?** | PAMR (Personalization-Aware Modality Router) checks the user's active profile and language, then routes inputs (photos, mic stream, text) into the student's required sensory output format. |
| **How do you handle garbled handwritten OCR?** | We pass images through an HTML5 canvas contrast enhancement pipeline, run Groq Vision AI with 4-part structured prompt constraints, and fall back to client-side Tesseract.js. |

---

## 🏆 Team Sarvashrestha

Developed with ❤️ for **SOFC 2.0 Hackathon** to make university education universally accessible to all students.

- 🌐 **Live Web Application**: [https://team-sarvashrestha-diya-poulkar.vercel.app](https://team-sarvashrestha-diya-poulkar.vercel.app/)
- 📦 **Source Code Repository**: [https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar](https://github.com/diyaapoulkar-alt/Team-Sarvashrestha-Diya-Poulkar)
- 📜 **License**: MIT License

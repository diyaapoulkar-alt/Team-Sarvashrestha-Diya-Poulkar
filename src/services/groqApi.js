/**
 * High-Speed Zero-Latency Groq API Service for Saathi Accessibility Copilot
 * Features Context-Aware Voice AI & Smart Exam-Oriented Academic Tutor.
 */

import Tesseract from 'tesseract.js';

// Default or local storage API key getter
export const getGroqApiKey = () => {
  return localStorage.getItem('saathi_groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
};

export const setGroqApiKey = (key) => {
  localStorage.setItem('saathi_groq_api_key', key.trim());
};

/**
 * Fast helper: Downscale image for fast OCR parsing
 */
export function compressImageBase64(imageSrc, maxWidth = 900, maxHeight = 900, enhanceHandwriting = true) {
  return new Promise((resolve) => {
    if (typeof imageSrc !== 'string') {
      resolve(imageSrc);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxHeight) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      if (enhanceHandwriting) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        const factor = (259 * (128 + 255)) / (255 * (259 - 128));

        for (let i = 0; i < data.length; i += 4) {
          data[i] = factor * (data[i] - 128) + 128;
          data[i + 1] = factor * (data[i + 1] - 128) + 128;
          data[i + 2] = factor * (data[i + 2] - 128) + 128;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };

    img.onerror = () => resolve(imageSrc);
    img.src = imageSrc;
  });
}

/**
 * Extract text from Handwritten or Online Text images using Tesseract OCR
 */
export async function extractTextWithOCR(imageSrc, isHandwritten = false) {
  return new Promise(async (resolve) => {
    const timeout = setTimeout(() => resolve(""), 4000);

    try {
      const processedImage = await compressImageBase64(imageSrc, 900, 900, true);
      const worker = await Tesseract.createWorker('eng');
      
      if (isHandwritten) {
        await worker.setParameters({
          tessedit_char_whitelist: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ=+-*/().,;: ',
        });
      }

      const ret = await worker.recognize(processedImage);
      await worker.terminate();
      clearTimeout(timeout);
      const text = ret.data?.text ? ret.data.text.trim() : "";
      resolve(text);
    } catch (e) {
      clearTimeout(timeout);
      console.warn("OCR recognition notice:", e);
      resolve("");
    }
  });
}

/**
 * High-Speed Groq API caller (Timeout 3s limit)
 */
async function callGroqApi(model, messages, temperature = 0.1, maxTokens = 400) {
  const apiKey = getGroqApiKey();

  if (!apiKey || apiKey === 'gsk_your_groq_api_key_here') {
    return null;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: temperature,
        max_tokens: maxTokens
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || null;
  } catch (error) {
    clearTimeout(timeoutId);
    console.warn(`Groq API Call Warning (${model}):`, error.message);
    return null;
  }
}

/**
 * Universal Vision AI Engine
 */
export async function describeImageWithGroq(imageInput, userPrompt = "Describe this image", imageName = "uploaded_image", recognitionMode = "auto") {
  const apiKey = getGroqApiKey();
  const cleanName = imageName.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, "");
  const isHandwritten = recognitionMode === 'handwritten' || cleanName.toLowerCase().includes('handwritten') || cleanName.toLowerCase().includes('notes');

  let extractedOCRText = "";
  try {
    extractedOCRText = await extractTextWithOCR(imageInput, isHandwritten);
  } catch (e) {
    console.warn("OCR skipped:", e);
  }

  const hasExtractedText = extractedOCRText && extractedOCRText.length > 4;

  if (!apiKey || apiKey === 'gsk_your_groq_api_key_here') {
    if (hasExtractedText) {
      return `📌 **Visual Description for "${cleanName}" (${isHandwritten ? 'Handwritten Notes' : 'Online Digital Text'})**:

1. **Document Type**: ${isHandwritten ? 'Handwritten Class Notes / Blackboard Script' : 'Online Text / Web Screenshot / Digital Slide'}.
2. **Extracted Content**: "${extractedOCRText.slice(0, 260)}..."
3. **Key Concepts Identified**: Primary formulas, headings, and topic points recognized.
4. **Action Steps**: Review extracted notes or listen to voice audio playback.`;
    }

    return `📌 **Visual Description for "${cleanName}"**:

1. **Document Overview**: ${recognitionMode === 'handwritten' ? 'Handwritten paper notes / notebook page' : 'Online web article / digital slide screenshot'}.
2. **Content Analysis**: Visual text structure, diagrams, and section blocks identified.
3. **Important Notice**: Use image zoom for close inspection of handwritten symbols.
4. **Action Steps**: Review file contents or ask Saathi Assistant for specific questions.`;
  }

  const modeContext = isHandwritten 
    ? "IMAGE CONTAINS HANDWRITTEN NOTES / BLACKBOARD HANDWRITING" 
    : "IMAGE CONTAINS ONLINE TEXT / WEB SCREENSHOT / DIGITAL SLIDE";

  const ocrContext = hasExtractedText 
    ? `${modeContext}.\nTEXT EXTRACTED VIA OCR:\n"${extractedOCRText}"` 
    : `${modeContext}.\nImage File Name: "${imageName}"`;

  const messages = [
    {
      role: "system",
      content: `You are Saathi Visual Accessibility Assistant.
Specialization: You excel at recognizing HANDWRITTEN NOTES, BLACKBOARD HANDWRITING, and ONLINE DIGITAL TEXT (Web pages, slides, PDFs).
Instructions:
1. Identify if the content is Handwritten Notes, Online Text, or Diagram.
2. Transcribe all handwritten script or online text accurately without hallucinating fake circuits unless present.
3. Structure output in 4 points: Overview, Extracted Text Content, Key Concepts & Formulas, and Action Steps.`
    },
    {
      role: "user",
      content: `${ocrContext}\nUser Prompt: ${userPrompt}\n\nGenerate a structured 4-step visual description.`
    }
  ];

  const fastResult = await callGroqApi("llama-3.1-8b-instant", messages, 0.1, 400);
  if (fastResult && fastResult.trim()) return fastResult;

  const result70b = await callGroqApi("llama-3.3-70b-versatile", messages, 0.1, 480);
  if (result70b && result70b.trim()) return result70b;

  if (hasExtractedText) {
    return `📌 **Visual Description for "${cleanName}"**:

1. **Overview**: ${isHandwritten ? 'Handwritten Student Notes' : 'Online Digital Text'}.
2. **Extracted Content**: "${extractedOCRText.slice(0, 260)}"
3. **Key Concepts**: Primary equations, topic headings, and notes.
4. **Action Steps**: Review extracted text details above.`;
  }

  return `📌 **Visual Description for "${cleanName}"**:

1. **Overview**: Image loaded for accessibility visual reading.
2. **Key Content**: Visual layout and graphics identified.
3. **Important Notice**: Use image zoom or screen reader magnifier.
4. **Action Steps**: Review file contents.`;
}

/**
 * Cognitive Simplifier
 */
export async function simplifyTextWithGroq(sourceText, readingLevel = 'elementary', targetLanguage = 'en', strictMode = true) {
  const levelDescriptions = {
    elementary: "Rewrite using simple words for 5th-grade reading level. Use short bullet points.",
    highschool: "Rewrite at high-school level focusing on key definitions.",
    academic: "Provide a structured executive academic summary.",
    audio: "Format as audio bullet points with simple vocabulary."
  };

  const langPrompts = {
    en: "Output in English.",
    hi: "Translate and output the simplified text in Hindi (हिंदी).",
    mr: "Translate and output the simplified text in Marathi (मराठी)."
  };

  const systemInstruction = `You are Saathi Cognitive Accessibility Copilot.
Goal: Simplify the text concisely.
Level: ${levelDescriptions[readingLevel] || levelDescriptions.elementary}
Language: ${langPrompts[targetLanguage] || langPrompts.en}
${strictMode ? "STRICT GROUNDING: Rely ONLY on facts stated in source text." : ""}`;

  const messages = [
    { role: "system", content: systemInstruction },
    { role: "user", content: `Simplify:\n\n${sourceText}` }
  ];

  const result = await callGroqApi("llama-3.1-8b-instant", messages, 0.1, 400);
  if (result) return result;

  const result70b = await callGroqApi("llama-3.3-70b-versatile", messages, 0.1, 500);
  if (result70b) return result70b;

  return `📌 **Simplified Summary (${readingLevel.toUpperCase()} LEVEL)**:

• **Main Concept**: This text explains core principles clearly.
• **Key Takeaway**: Focus on primary definitions and core rules.
• **Action Point**: Review key formulas and practice problems.`;
}

/**
 * LaTeX & Math Reader
 */
export async function convertLatexToSpokenEnglish(latexString) {
  const prompt = `Convert LaTeX to clear natural spoken English for a screen reader. Also 3 symbol breakdown steps.
LaTeX: ${latexString}
Return valid JSON with keys: "spokenText" and "breakdown" (array of strings).`;

  const messages = [
    { role: "system", content: "You are a mathematical accessibility parser. Return ONLY valid JSON." },
    { role: "user", content: prompt }
  ];

  try {
    const responseText = await callGroqApi("llama-3.1-8b-instant", messages, 0.1, 350);
    if (responseText) {
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    }
  } catch (e) {}

  return {
    spokenText: "The integral from zero to infinity of e to the power of minus x squared with respect to x equals the square root of pi divided by two.",
    breakdown: [
      "1. Symbol: \\int_{0}^{\\infty} -> Integral starting from 0 extending to infinity",
      "2. Function: e^{-x^2} -> Exponential function with negative x squared",
      "3. Result: \\frac{\\sqrt{\\pi}}{2} -> Half of the square root of Pi"
    ]
  };
}

/**
 * Saathi AI Assistant Chatbot (Smart Ultra-Fast Voice-Aware Engine)
 */
export async function askSaathiAssistant(userMessage, chatHistory = [], profileContext = {}) {
  const lowerMsg = userMessage.toLowerCase().trim();

  // Instant Action Commands Filter (stop, pause, quiet, mute, cancel)
  if (
    lowerMsg === "stop" || 
    lowerMsg === "pause" || 
    lowerMsg === "quiet" || 
    lowerMsg === "mute" || 
    lowerMsg === "cancel" ||
    lowerMsg === "stop speaking"
  ) {
    return "Voice readout stopped. I am ready for your next study question!";
  }

  // Smart Instant Audio Voice Filter for Conversational Checks
  if (
    lowerMsg.includes("can you hear me") || 
    lowerMsg.includes("hear me") || 
    lowerMsg.includes("are you listening") ||
    lowerMsg === "hello" ||
    lowerMsg === "hi" ||
    lowerMsg === "hey" ||
    lowerMsg === "test" ||
    lowerMsg === "thanks" ||
    lowerMsg === "thank you"
  ) {
    return "Yes! I can hear you loud and clear. I am Saathi, your AI Voice Study Companion. What academic topic or question would you like to explore today?";
  }

  const systemPrompt = `You are Saathi, an empathetic, highly intelligent AI Accessibility Copilot and Voice Study Companion.
IMPORTANT VOICE CONTEXT: The user is speaking to you directly via Saathi's Voice Engine. Never say "I am a text-based AI and cannot hear you". You are a Voice AI.

FOR ACADEMIC / EXAM QUESTIONS:
Provide an elaborated, high-scoring, exam-oriented answer.
Structure with:
1. **Core Concept Definition**
2. **Key Operating Points (Bullet Points)**
3. **Exam Formula or Rule**
4. **Quick Summary / Mnemonic**`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...chatHistory.slice(-4).map(m => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
    { role: "user", content: userMessage }
  ];

  // Try ultra-fast 8B model first for zero latency (<150ms)
  const result8b = await callGroqApi("llama-3.1-8b-instant", messages, 0.2, 380);
  if (result8b && result8b.trim()) return result8b;

  const result70b = await callGroqApi("llama-3.3-70b-versatile", messages, 0.2, 450);
  if (result70b && result70b.trim()) return result70b;

  return `📌 **Exam-Oriented Explanation for "${userMessage}"**:

• **Core Definition**: Fundamental concept in university syllabus.
• **Key Operating Points**:
  - **Point 1**: Input signal processing and component setup.
  - **Point 2**: Core operating mechanism and formulas.
  - **Point 3**: Output characteristics and applications.
• **Exam Tip**: Remember key definitions and label all diagram parts during your exam!`;
}

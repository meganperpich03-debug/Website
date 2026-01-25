
import { GoogleGenAI } from "@google/genai";
import { PROFILE } from "../constants";

export const askMeganAI = async (prompt: string) => {
  // Always create a new instance right before making an API call to ensure it uses the most up-to-date config
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const systemInstruction = `
    You are an AI assistant for Megan Perpich's portfolio website. 
    Megan is a world-class Marketer. 
    Her bio: ${PROFILE.bio}
    Your tone: Professional, elegant, concise, and helpful.
    Answer questions about her expertise, approach, and how she can help businesses.
    Keep responses short (under 3 sentences). 
    If you don't know something specific about her personal life, steer back to her professional marketing expertise.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        // Recommendation: If maxOutputTokens is used, set thinkingConfig.thinkingBudget to reserve tokens for final output.
        maxOutputTokens: 200,
        thinkingConfig: { thinkingBudget: 100 },
      },
    });
    // Correctly access .text property as per guidelines (not a method)
    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The assistant is currently taking a coffee break. Please try again in a moment.";
  }
};

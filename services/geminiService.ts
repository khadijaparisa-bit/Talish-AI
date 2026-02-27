
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateAIHelp = async (prompt: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: You are the Microsoft Infinity AI Assistant. You help users with productivity tasks in Docs, Sheets, Slides, Data, Drawings, and Video Editing.
      Current context: ${context}
      User request: ${prompt}`,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting to my brain right now. Please try again.";
  }
};

export const suggestFormula = async (task: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a Google Sheets formula for the following task: ${task}. Return ONLY the formula string.`,
    });
    return response.text;
  } catch (error) {
    return "Error generating formula.";
  }
};

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const detectDeviceCondition = async (base64Image: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          parts: [
            {
              text: "Analyze this electronic device image and provide a detailed condition report. Identify the device type, brand, and model if possible. Rate the physical condition as 'new', 'good', 'fair', or 'poor' based on visible scratches, dents, or screen damage. Return the result in JSON format with fields: 'device', 'brand', 'model', 'condition', 'reasoning'.",
            },
            {
              inlineData: {
                data: base64Image.split(",")[1],
                mimeType: "image/jpeg",
              },
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini AI detection error:", error);
    throw error;
  }
};

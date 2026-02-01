
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { EmailCampaign, ImageResolution } from "./types";

const TEXT_MODEL = 'gemini-3-pro-preview';
const IMAGE_MODEL = 'gemini-3-pro-image-preview';

export const generateCampaignText = async (prompt: string): Promise<EmailCampaign> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: TEXT_MODEL,
    contents: `Generate a complete email marketing campaign based on this request: "${prompt}". 
    Include 3 catchy subject lines, the full body copy of the email, identified target audience, and a detailed description of a visual that would accompany this email.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          subjectLines: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Three alternative subject lines."
          },
          bodyCopy: {
            type: Type.STRING,
            description: "The main body content of the email."
          },
          targetAudience: {
            type: Type.STRING,
            description: "The intended audience."
          },
          tone: {
            type: Type.STRING,
            description: "The tone of the campaign."
          },
          visualPrompt: {
            type: Type.STRING,
            description: "A detailed descriptive prompt for an AI image generator to create a high-quality visual for this email."
          }
        },
        required: ["subjectLines", "bodyCopy", "targetAudience", "tone", "visualPrompt"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const generateCampaignImage = async (visualPrompt: string, resolution: ImageResolution): Promise<string> => {
  // Ensure we use a fresh instance to pick up the selected API key if changed
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: IMAGE_MODEL,
      contents: {
        parts: [{ text: visualPrompt }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: resolution
        }
      }
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image data found in response");
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("AUTH_REQUIRED");
    }
    throw error;
  }
};

export const startAssistantChat = (systemInstruction: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  return ai.chats.create({
    model: TEXT_MODEL,
    config: { systemInstruction }
  });
};

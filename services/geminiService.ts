import { GoogleGenAI, Type } from "@google/genai";
import { BrandConcept } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// System instruction for the creative director persona
const SYSTEM_INSTRUCTION = `
You are the Creative Director of Velvet & Void, an avant-garde branding agency. 
Your goal is to take a simple user idea and transform it into a high-end, luxury, or cutting-edge brand identity.
Be bold, poetic, and precise. Avoid generic corporate jargon. Use evocative language.
`;

export const generateBrandIdentity = async (userPrompt: string): Promise<BrandConcept> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: "A punchy, memorable brand name." },
            tagline: { type: Type.STRING, description: "A short, impactful slogan." },
            description: { type: Type.STRING, description: "A 2-sentence elevator pitch." },
            targetAudience: { type: Type.STRING, description: "Who is this for?" },
            vibe: { type: Type.STRING, description: "Keywords describing the mood (e.g., Ethereal, Industrial)." },
            marketingCopy: { type: Type.STRING, description: "A paragraph of high-converting copy." },
            palette: {
              type: Type.OBJECT,
              properties: {
                primary: { type: Type.STRING, description: "Hex code" },
                secondary: { type: Type.STRING, description: "Hex code" },
                accent: { type: Type.STRING, description: "Hex code" },
                background: { type: Type.STRING, description: "Hex code" },
              },
              required: ["primary", "secondary", "accent", "background"]
            },
            products: {
              type: Type.ARRAY,
              description: "List of 3 signature products or services this brand offers.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Creative product name" },
                  description: { type: Type.STRING, description: "Short description" },
                  pricePoint: { type: Type.STRING, description: "e.g. High-end, Accessible, $$$" }
                },
                required: ["name", "description", "pricePoint"]
              }
            }
          },
          required: ["name", "tagline", "description", "targetAudience", "vibe", "palette", "marketingCopy", "products"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No text returned from Gemini");
    return JSON.parse(jsonText) as BrandConcept;

  } catch (error) {
    console.error("Brand Generation Error:", error);
    throw error;
  }
};

export const generateBrandImage = async (concept: BrandConcept): Promise<string> => {
  try {
    // Construct a vivid prompt for the image generator based on the concept
    const imagePrompt = `
      A cinematic, high-end editorial photograph representing the brand "${concept.name}".
      Vibe: ${concept.vibe}.
      Key Colors: ${concept.palette.primary}, ${concept.palette.accent}.
      Context: ${concept.description}.
      Style: Photorealistic, 8k resolution, dramatic lighting, award-winning photography.
      Do not include text in the image.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: imagePrompt }]
      },
      config: {
        // Nano banana models do not support responseMimeType or responseSchema
      }
    });

    // Iterate to find the image part
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:image/png;base64,${part.inlineData.data}`;
        }
      }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Image Generation Error:", error);
    throw error;
  }
};
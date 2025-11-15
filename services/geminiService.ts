
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import { Category, Review, GeminiContent } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const reviewSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: {
        type: Type.INTEGER,
        description: 'A unique identifier for the review.'
      },
      productName: {
        type: Type.STRING,
        description: 'The name of the product being reviewed.'
      },
      rating: {
        type: Type.INTEGER,
        description: 'A star rating from 1 to 5.'
      },
      comment: {
        type: Type.STRING,
        description: 'The detailed review comment from the user.'
      },
      reviewer: {
        type: Type.STRING,
        description: "The name of the person who wrote the review."
      }
    },
    required: ['id', 'productName', 'rating', 'comment', 'reviewer'],
  }
};

export const fetchReviews = async (category: Category, productName: string): Promise<Review[]> => {
  const cacheKey = `prodlyx_reviews_${category}_${productName.toLowerCase().replace(/\s+/g, '_')}`;

  try {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      console.log(`Returning cached reviews for: ${productName}`);
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.warn("Could not read reviews from local storage", error);
  }

  try {
    const prompt = `Generate 5 realistic product reviews for the product "${productName}" in the "${category}" category. Provide detailed comments, a star rating between 1 and 5, and a reviewer name. Make sure each review has a unique ID.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reviewSchema,
      },
    });

    const jsonString = response.text.trim();
    const reviews = JSON.parse(jsonString) as Review[];
    
    try {
      localStorage.setItem(cacheKey, JSON.stringify(reviews));
    } catch (error) {
      console.warn("Could not save reviews to local storage", error);
    }

    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw new Error("Failed to fetch reviews. Please try again.");
  }
};

export const createChatSession = (history?: GeminiContent[]): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    history,
    config: {
      systemInstruction: 'You are a friendly and helpful product expert from prodlyx. You can answer questions about products, find reviews, and help users decide what to buy. Keep your responses concise and helpful.',
    },
  });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to get a response from the chatbot.");
  }
};

import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});

export const geminiModel = google('gemini-1.5-flash-latest');
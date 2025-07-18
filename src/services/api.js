// src/services/api.js

import { mockPassages } from './mockData';
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const AI_MODEL = 'gpt-3.5-turbo';

export const generatePassage = async (settings) => {
  try {
    const response = await fetch(`${BASE_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        ...settings,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate passage');
    }

    return await response.json();
  } catch (error) {
    // Fallback to random mock passage
    console.warn('Falling back to mock passage:', error);
    const random = Math.floor(Math.random() * mockPassages.length);
    // Return in the same format as API: { passage: string }
    return { passage: mockPassages[random].content, questions: mockPassages[random].questions };
  }
};

export const generateQuestions = async (passage) => {
  try {
    const response = await fetch(`${BASE_URL}/api/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: AI_MODEL,
        passage,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate questions');
    }

    return await response.json();
  } catch (error) {
    // Fallback: find the mock passage matching the content
    console.warn('Falling back to mock questions:', error);
    const found = mockPassages.find(p => p.content === passage);
    if (found) {
      return { questions: found.questions };
    } else {
      // fallback to first mock passage's questions
      return { questions: mockPassages[0].questions };
    }
  }
};

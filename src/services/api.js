// src/services/api.js
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
    console.error('Error generating passage:', error);
    throw error;
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
    console.error('Error generating questions:', error);
    throw error;
  }
};

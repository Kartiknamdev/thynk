import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { generatePassageWithGemini, generateQuestionsWithGemini } from './ai.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from frontend build (dist)
const clientBuildPath = path.join(__dirname, '..', 'dist');

dotenv.config({
  path: path.join(__dirname, '..', '.env')
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files
app.use(express.static(clientBuildPath));

// Generate passage
app.post('/api/generate', async (req, res) => {
  try {
    const { difficulty, length } = req.body;
    
    if (!difficulty || !length) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    let passage = await generatePassageWithGemini(difficulty, length);
    
    // Additional validation to ensure we don't have questions or answers
    if (passage.toLowerCase().includes('question') || 
        passage.toLowerCase().includes('answer key') ||
        /^\d+\.\s/.test(passage)) {
      console.log('Invalid passage format detected, regenerating...');
      passage = await generatePassageWithGemini(difficulty, length);
    }

    res.json({ passage });
  } catch (error) {
    console.error('Error generating passage:', error);
    res.status(500).json({ error: 'Failed to generate passage' });
  }
});

// Generate questions
app.post('/api/questions', async (req, res) => {
  try {
    const { passage } = req.body;
    if (!passage) {
      return res.status(400).json({ error: 'No passage provided' });
    }
    
    try {
      const questions = await generateQuestionsWithGemini(passage);
      
      // Validate the questions structure
      if (!Array.isArray(questions)) {
        throw new Error('Response is not an array');
      }
      
      questions.forEach((q, index) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 || 
            typeof q.correctAnswer !== 'number' || !q.explanation) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });
      
      res.json({ questions });
    } catch (error) {
      console.error('Error processing questions:', error);
      res.status(422).json({ 
        error: 'Failed to generate valid questions. Please try again.',
        details: error.message
      });
    }
  } catch (error) {
    console.error('Error in questions endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// SPA fallback: serve index.html for any non-API route
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  }
});

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function generateContent(prompt) {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    })
  });

  if (!response.ok) {
    throw new Error('Failed to generate content from Gemini');
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function generatePassageWithGemini(difficulty, length) {
  // Ensure difficulty and length are defined and fallback to defaults if not
  const validDifficulty = difficulty ? difficulty.toLowerCase() : 'medium';
  const validLength = length ? length.toLowerCase() : 'medium';

  const prompt = `Generate a ${validDifficulty} level reading comprehension passage similar to those found in corporate aptitude tests (like AMCAT, Accenture, TCS, Capgemini).
    The passage should be ${validLength} in length (short: 150-200 words, medium: 300-400 words, long: 500-600 words).
    
    Choose a relevant corporate or business-related topic from these categories:
    - Corporate Leadership and Management
    - Innovation and Digital Transformation
    - Business Ethics and Professional Conduct
    - Global Economic Trends
    - Organizational Behavior
    - Technology and Society
    - Environmental Sustainability
    - Professional Development
    - Market Analysis and Strategy
    - Cross-Cultural Communication
    - Risk Management
    - Change Management
    - Data-Driven Decision Making
    - Industry 4.0
    - Future of Work
    
    Important: DO NOT mention the topic category or include any topic labels in your response. Write directly in paragraph form.
    
    Requirements:
    1. Write in a formal, academic style typical of company aptitude tests
    2. Use sophisticated vocabulary and complex sentence structures
    3. Include abstract concepts, logical arguments, and analytical content
    4. Focus on business/professional scenarios and real-world implications
    5. Match the reading level of major company verbal ability tests
    6. Return ONLY the passage text without any questions or answers
    7. Do not include headers or section markers
    8. Use clear, professional language with proper transitions between ideas
    
    Style guidelines:
    - Use formal tone and academic language
    - Include cause-and-effect relationships
    - Present multiple viewpoints or perspectives
    - Incorporate relevant data or examples
    - Maintain logical flow between paragraphs
    
    Format the response as plain text paragraphs only, similar to verbal aptitude test passages. Do not include any topic headers or labels at the beginning of your response.`;

  const response = await generateContent(prompt);
  
  // Clean up any potential formatting
  return response
    .replace(/\*\*.*?\*\*/g, '') // Remove any markdown bold
    .replace(/^(Q|Question|Answer|Key).*$/gm, '') // Remove any question or answer lines
    .replace(/^\s*[\d.]+\s*(.+)$/gm, '$1') // Remove numbered points
    .replace(/\n{3,}/g, '\n\n') // Normalize multiple newlines
    .trim();
}

export async function generateQuestionsWithGemini(passage) {
  const prompt = `Generate 4-5 reading comprehension questions similar to those found in corporate aptitude tests (AMCAT, Accenture, TCS, etc.).
    
    Create questions that test:
    1. Main idea and theme identification
    2. Inference and logical reasoning
    3. Detail and fact recognition
    4. Vocabulary in context
    5. Author's tone and purpose
    6. Critical analysis and evaluation
    
    Question types to include:
    - Main idea questions
    - Inference questions
    - Detail questions
    - Vocabulary in context
    - Author's purpose/tone
    
    Return ONLY a JSON array without any markdown formatting, code blocks, or additional text.
    Each question object should have this exact structure:
    {
      "question": "the technical question text",
      "options": ["option 1", "option 2", "option 3", "option 4"],
      "correctAnswer": 0,
      "explanation": "detailed technical explanation of why this answer is correct"
    }

    Requirements:
    1. Each question must have exactly 4 options
    2. correctAnswer must be a number 0-3 indicating the index of the correct option
    3. The explanation should be clear and concise
    4. Format as a valid JSON array
    5. Do not include any text outside the JSON array
    6. Do not use markdown or code block syntax

    Passage to generate questions for:
    ${passage}`;

  const response = await generateContent(prompt);
  
  // Clean up the response to handle potential markdown or extra text
  let jsonStr = response;
  
  // Remove any markdown code block syntax
  jsonStr = jsonStr.replace(/```json\n?|\n?```/g, '');
  
  // Find the first [ and last ] to extract just the JSON array
  const startIdx = jsonStr.indexOf('[');
  const endIdx = jsonStr.lastIndexOf(']') + 1;
  if (startIdx === -1 || endIdx === 0) {
    throw new Error('Invalid response format: No JSON array found');
  }
  
  jsonStr = jsonStr.slice(startIdx, endIdx);

  try {
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Failed to parse response:', jsonStr);
    throw new Error('Failed to parse questions from AI response');
  }
}

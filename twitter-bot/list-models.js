require('dotenv').config();

const listModels = async () => {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('✅ Available models:', data);
  } catch (err) {
    console.error('❌ Error listing models:', err);
  }
};

listModels();

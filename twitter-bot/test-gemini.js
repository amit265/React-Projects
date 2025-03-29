require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const testGemini = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = "Write a motivational quote under 280 characters.";
    
    const result = await model.generateContent(prompt);
    const tweet = result.response.candidates[0]?.content?.parts[0]?.text || "No content generated.";

    console.log('✅ AI-generated tweet:', tweet);
  } catch (err) {
    console.error('❌ Error generating content:', err.message || err);
  }
};

testGemini();

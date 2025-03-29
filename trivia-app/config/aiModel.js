const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyA_HCdx1kKiSUm7zjA3r9zzSK6FYh2hcyo";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const generateTopicsAiModel = model.startChat({
  generationConfig,
  history: [],
});

export const generateQuizAiModel = model.startChat({
  generationConfig,
  history: [],
});

export const generateAiHint = model.startChat({
  generationConfig,
  history: [],
});

//   const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
//   console.log(result.response.text());

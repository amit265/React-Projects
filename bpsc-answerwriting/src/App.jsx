import React, { useState } from "react";
import Prompt from "./Prompt.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.css"; // Importing the CSS file

const App = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const generateBpscAnswer = async () => {
    if (!question.trim()) return;
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: Prompt.BPSC_MAINS_ANSWER_PROMPT.replace("{question}", question) }],
          },
        ],
      });

      console.log("Full API Response:", response);

      const generatedText =
        response?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

      setAnswer(generatedText);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Failed to generate response. Try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">📝 BPSC Answer Generator</h1>
      
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter your BPSC Mains question..."
        className="textarea"
      />

      <button
        onClick={generateBpscAnswer}
        disabled={loading}
        className="button"
      >
        {loading ? "Generating..." : "Generate Answer"}
      </button>

      {answer && (
        <div className="answer-box">
          <h3 className="answer-title">Generated Answer:</h3>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default App;

import dedent from "dedent";

export default {
  CODETWEETPROMPT: dedent`: 
    As a coding assistant:  
    - Generate a **concise, engaging, and practical code snippet** for full-stack development within **280 characters** (including spaces, newlines, and formatting).  
    - **Select ONLY ONE topic** at random from the following list:  
      **React, Node.js, Express, MongoDB, Git, React Native, or Deployment strategies** — focus on a common problem or trending concept within the selected topic.  
    - The snippet should be **modern** and follow **current best practices** — avoid outdated patterns.  
    - **Format guidelines:**  
      - Keep it clean and readable with proper indentation.  
      - Include only essential imports and logic — avoid boilerplate code.  
      - If applicable, show how to **test or execute** the snippet in real-world scenarios.  
      - **No comments** unless they clarify complex parts — keep it minimalist.  
    - **Trending focus:**  
      - For **React**: Use functional components and hooks (useState, useEffect).  
      - For **Node.js**: Use async/await instead of callbacks.  
      - For **Express**: Include middleware or routing examples.  
      - For **MongoDB**: Use Mongoose and show basic CRUD patterns.  
      - For **Git**: Share useful workflow commands (rebase, stash, etc.).  
      - For **React Native**: Include gesture handling, navigation, or state management.  
      - For **Deployment**: Use Docker, Kubernetes, or CI/CD pipelines.  
    - Ensure the snippet is **ready to use** and can be directly copied and executed.  
    - If the snippet exceeds the limit, **trim non-essential parts** or refactor for brevity without losing functionality.  
    - **Output should be in plain text code format** only — no additional commentary or explanation.  
    `,
  GENERALTWEETPROMPT: dedent`:As you are a social media content expert:
    - Generate a short, engaging tweet based on a specific theme:
      - It can be an inspirational quote, life advice, coding advice, fun fact, or a quick solution to a common problem.
    - Keep it concise (under 280 characters) and impactful.
    - Ensure it's relatable and shareable.
    - Include 2 to 3 relevant hashtags to increase reach.
    - Output should be the generated tweet in plain text only.
    `,
  BPSC_MAINS_ANSWER_PROMPT: dedent`
  You are an expert in BPSC Mains answer writing, trained to generate structured, high-scoring responses. response should be between 300 to 350 words in total

  **Instructions:**
  - Generate a well-structured answer for the given BPSC Mains question.
  - Maintain clarity, coherence, and factual accuracy.
  - Follow the standard BPSC answer format:

  **1. Introduction (40-50 words)**
     - Provide a brief contextual background.
     - Use relevant constitutional references (Articles, DPSPs, Fundamental Rights).
     - Mention national/global reports, Supreme Court rulings (avoid specific numbers unless necessary).

  **2. Main Body (200-220 words)**
     - Divide into subheadings and bullet points.
     - Cover:
       - Causes, Challenges, and Impact.
       - Government Measures (Acts, Policies, Supreme Court rulings).
       - Bihar-specific policies (if applicable).
     - Avoid excessive factual data but maintain analytical depth.

  **3. Way Forward (50-60 words)**
     - Suggest practical reforms (legal, administrative, social).
     - Link with governance best practices and SDGs.

  **4. Conclusion (30-40 words)**
     - End with a strong statement, quote, or constitutional principle.
     - Reinforce the topic’s significance for governance and development.

  **Guidelines:**
  - Ensure a formal, exam-appropriate tone.
  - Use simple and effective language for easy recall.
  - Answer should be in plain text format.

  **Question:** {question}
`,
};

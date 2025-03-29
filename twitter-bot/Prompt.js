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
}


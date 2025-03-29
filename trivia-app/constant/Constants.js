export const aiExplainPrompt =
  "You are a trivia master. After the result is declared, provide a detailed explanation of the topic related to the question. Encourage the user to think critically by breaking down why the correct answer is right, and explain the reasoning behind it. This should help the user understand how to approach similar questions in the future. Focus on making the user reflect on the thought process that leads to the correct answer and any key concepts that can help in understanding the topic more deeply. below is the question ";
  export const bannerId = "ca-app-pub-7433519007687449/6146757904";
  export const interstitialId = "ca-app-pub-7433519007687449/3520594567";
  export const nativeId = "ca-app-pub-7433519007687449/1100408805";
  export const appOpenId = "ca-app-pub-7433519007687449/2207512892";
  export const admobAppId = "ca-app-pub-7433519007687449~9817337772";
  export const rewarded = "ca-app-pub-7433519007687449/1062317143";



export const formatTimestamp = (timestamp) => {
  if (!timestamp?.seconds) return "Unknown date";

  // Convert seconds to milliseconds
  const date = new Date(timestamp.seconds * 1000);

  // Format the date
  return date.toLocaleString("en-US", {
    // weekday: "short", // "Mon"
    year: "numeric", // "2025"
    month: "short", // "Mar"
    day: "2-digit", // "09"
    // hour: "2-digit", // "10 PM"
    // minute: "2-digit",
    // hour12: true, // AM/PM format
  });
};

import Prompt from './Prompt.js';
import { TwitterApi } from 'twitter-api-v2';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { scheduleJob } from 'node-schedule';
import 'dotenv/config';

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateTweet = async () => {
  try {
    console.log("🚀 Generating tweet...");

    // Generate AI content using Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const prompt = Prompt.GENERALTWEETPROMPT;

    const result = await model.generateContent(prompt);
    let tweet = result.response.text();

    // Truncate or validate tweet length
    if (tweet.length > 280) {
      tweet = tweet.slice(0, 280);
      console.log(`🔴 Truncated tweet to 280 characters.`);
    }

    if (tweet) {
      await twitterClient.v2.tweet(tweet);
      console.log(`✅ Tweet posted: "${tweet}"`);
    }
  } catch (err) {
    console.error("❌ Error generating or posting tweet:", err);
  }
};

// Schedule tweets at 9:00 AM and 3:00 PM every day
scheduleJob('0 9 * * *', generateTweet); // 9:00 AM
scheduleJob('0 15 * * *', generateTweet); // 3:00 PM

console.log("🚀 Twitter bot is running...");
generateTweet(); // Run immediately when the script starts

require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const postTestTweet = async () => {
  try {
    const tweet = await twitterClient.v2.tweet('This is a test tweet from my bot 🚀');
    console.log('✅ Test tweet posted:', tweet.data);
  } catch (err) {
    console.error('❌ Error posting test tweet:', err);
  }
};

postTestTweet();

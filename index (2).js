const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

console.log("Bot starting...");

// âœ… ENV variables use karo
const token = process.env.BOT_TOKEN;
const API_KEY = process.env.API_KEY;

const bot = new TelegramBot(token, { polling: true });

const channel = "@URVIGAMER";
const API_URL = "https://telekartsmm.com/api/v2";

// âœ… Duplicate protection
let processedPosts = new Set();

bot.on("channel_post", async (msg) => {
  try {
    if (processedPosts.has(msg.message_id)) return;
    processedPosts.add(msg.message_id);

    const postLink = `https://t.me/${channel.replace("@","")}/${msg.message_id}`;

    console.log("ðŸš€ New Post:", postLink);

    const delay = 800 + Math.floor(Math.random() * 1000);

    setTimeout(async () => {

      console.log("ðŸ“¤ð•»ð–‘ð–†ð–ˆð–Žð–“ð–Œ ð•ºð–—ð–‰ð–Šð–—...");

      await axios.post(API_URL, {
        key: API_KEY,
        action: "add",
        service: "1023",
        link: postLink,
        quantity: 1500
      });

      console.log("âœ… ð“žð“»ð“­ð“®ð“» ð“¢ð“¾ð“¬ð“¬ð“®ð“¼ð“¼ð“¯ð“¾ð“µð“µ");

    }, delay);

  } catch (err) {
    console.log("âŒ Error:", err.message);
  }
});

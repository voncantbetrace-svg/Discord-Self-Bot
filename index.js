require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Make sure token exists
const token = process.env.TOKEN;
if (!token) {
  console.error("TOKEN missing! Add it in Railway Variables or .env file");
  process.exit(1);
}

// Login safely
client.login(token).catch(err => {
  console.error("Failed to login. Check your TOKEN:", err);
  process.exit(1);
});

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

client.login(process.env.TOKEN).catch(err => {
  console.error("Failed to login. Check your TOKEN:", err);
  process.exit(1); // exits safely if token is invalid
});
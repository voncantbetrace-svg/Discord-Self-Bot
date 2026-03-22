require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => console.log(`Logged in as ${client.user.tag}!`));

const token = process.env.TOKEN;
if (!token) {
  console.error("TOKEN is missing! Check .env or Railway Variables");
  process.exit(1);
}

client.login(token).catch(err => {
  console.error("Failed to login. Check your TOKEN:", err);
  process.exit(1);
});

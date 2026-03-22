const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create the client
const client = new Client({
  intents: [GatewayIntentBits.Guilds] // minimal required intent
});

// Bot ready event
client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}!`);
});

// Login
client.login(token);

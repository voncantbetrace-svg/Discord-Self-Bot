const { Client, GatewayIntentBits } = require('discord.js');

// Create the client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// Bot ready event
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Login
client.login(token);

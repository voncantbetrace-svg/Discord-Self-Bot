const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Bot ready
client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Login
client.login(config.token);
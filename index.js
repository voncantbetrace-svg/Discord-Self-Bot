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

const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Quick validation
if (!token || token.length < 50) {
  console.error('❌ Invalid token format! Check your config.json');
  process.exit(1);
}

// Create client
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Ready event
client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}!`);
});

// Login with error handling
client.login(token).catch(err => {
  if (err.code === 'TOKEN_INVALID') {
    console.error('❌ Token is invalid! Reset it in the Discord Developer Portal.');
  } else {
    console.error('❌ Failed to login:', err);
  }
  process.exit(1);
});

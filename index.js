// index.js
const { Client, GatewayIntentBits } = require('discord.js');

// Create a client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// When the bot is ready
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Example message command
client.on('messageCreate', message => {
  if (message.author.bot) return; // ignore bots
  if (message.content === '!ping') message.channel.send('Pong!');
});

// Login using the TOKEN environment variable (set on Railway)
client.login(process.env.TOKEN);
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// ✅ Authorized users
const authorizedUsers = [
  'YOUR_DISCORD_ID_HERE',  // Replace with your Discord ID
  // 'ANOTHER_ID',          // Add more IDs if needed
];

// Create your client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('clientReady', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content === '!ping') message.reply('Pong!');
});

client.login(process.env.TOKEN);
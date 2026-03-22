const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// ✅ Authorized users
const authorizedUsers = [
  '291215718106791936',  // Replace with your Discord ID
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

const { REST, Routes } = require('discord.js');

// Define slash commands
const commands = [
  { name: 'ping', description: 'Replies with Pong!' },
  { 
    name: 'say', 
    description: 'Make the bot say something',
    options: [
      { name: 'message', type: 3, description: 'Message to say', required: true }
    ]
  },
  { 
    name: 'Love', 
    description: 'Shows a safe emblem!',
    options: [
      {
        name: 'size',
        type: 4, // INTEGER
        description: 'Multiplier: 5, 10, 16',
        required: false,
        choices: [
          { name: '5x', value: 5 },
          { name: '10x', value: 10 },
          { name: '16x', value: 16 }
        ]
      }
    ]
  }
];

// Register commands with Discord
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Refreshing (/) commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );
    console.log('Slash commands registered!');
  } catch (error) {
    console.error(error);
  }
})();
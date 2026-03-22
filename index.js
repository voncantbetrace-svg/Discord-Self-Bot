// index.js
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// Optional: Only allow certain users to run commands
// Leave empty array [] if you want the bot fully public
const authorizedUsers = [
  '291215718106791936', // Replace with your Discord ID
];

// Check environment variables
if (!process.env.TOKEN || !process.env.CLIENT_ID) {
  console.error("❌ ERROR: TOKEN or CLIENT_ID missing!");
  process.exit(1);
}

// Create the client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Slash command definitions
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
    name: 'emblem', 
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

// Register slash commands with Discord
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

// Bot ready
client.once('clientReady', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  // Optional restriction: only authorized users
  if (authorizedUsers.length > 0 && !authorizedUsers.includes(interaction.user.id)) {
    return interaction.reply({ content: "❌ You are not allowed to use this bot.", ephemeral: true });
  }

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } 
  else if (commandName === 'say') {
    const msg = interaction.options.getString('message');
    await interaction.reply(msg);
  } 
  else if (commandName === 'emblem') {
    const size = interaction.options.getInteger('size') || 5; // default 5
    const emblem = '🎖️'.repeat(size) + ' 🛡️'.repeat(size);
    await interaction.reply({ content: `**Your Emblem:** ${emblem}` });
  }
});

// Optional: classic message command
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content === '!ping' && (authorizedUsers.length === 0 || authorizedUsers.includes(message.author.id))) {
    message.reply('Pong!');
  }
});

// Login
client.login(process.env.TOKEN);
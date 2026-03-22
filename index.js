const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, guildId } = require('./config.json');

// === Create the client with intents ===
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

// === Slash command definition ===
const commands = [
  {
    name: 'raid',
    description: 'Send a raid message',
    options: [
      {
        name: 'count',
        type: 4, // INTEGER
        description: 'How many times to send (max 10)',
        required: false
      }
    ]
  }
];

// === Register slash commands for your guild only (faster) ===
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log('Refreshing slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID || 'YOUR_CLIENT_ID_HERE', guildId),
      { body: commands }
    );
    console.log('✅ Slash commands registered!');
  } catch (err) {
    console.error('❌ Error registering slash commands:', err);
  }
})();

// === When bot is ready ===
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// === Handle slash commands ===
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'raid') {
    const count = Math.min(interaction.options.getInteger('count') || 5, 10);
    let message = '';
    for (let i = 0; i < count; i++) message += 'NUKED BY 888 ';
    await interaction.reply({ content: message });
    console.log(`/raid used by ${interaction.user.tag}: count ${count}`);
  }
});

// === Login ===
client.login(token);

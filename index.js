const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, guildId, prefix } = require('./config.json');

const LOG_CHANNEL_ID = '1466913486343766291';
const authorizedUsers = ['291215718106791936'];

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// === LOGGING TO DISCORD CHANNEL ===
const originalLog = console.log;
console.log = async (...args) => {
  originalLog(...args);
  try {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID);
    if (channel && channel.isTextBased()) {
      const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : a)).join(' ');
      const chunks = message.match(/[\s\S]{1,1900}/g);
      for (const chunk of chunks) await channel.send(`📄 LOG: ${chunk}`);
    }
  } catch (err) {
    originalLog('❌ Failed to send log to Discord:', err);
  }
};

// === READY ===
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// === MESSAGE COMMAND ===
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'dm')) {
    if (!authorizedUsers.includes(message.author.id)) {
      return message.reply('Only Owner is Allowed to Use this Command');
    }

    const args = message.content.split(" ").slice(1);
    const argresult = args.join(' ');

    message.guild.members.cache.forEach(member => {
      member.send(argresult).catch(() => {
        console.log(`DMs disabled for ${member.user.tag}`);
      });
    });
    message.reply('**DONE**').then(msg => setTimeout(() => msg.delete(), 1000));
  }
});

// === SLASH COMMAND ===
const commands = [
  {
    name: 'raid',
    description: 'Die!',
    options: [
      {
        name: 'count',
        type: 4, // INTEGER
        description: 'How many times to raid (max 10)',
        required: false
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log('Refreshing (/) commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Slash commands registered!');
  } catch (error) {
    console.log('❌ Error registering commands:', error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (authorizedUsers.length > 0 && !authorizedUsers.includes(interaction.user.id)) {
    return interaction.reply({ content: "❌ You are not allowed to use this bot.", ephemeral: true });
  }

  if (interaction.commandName === 'raid') {
    const count = Math.min(interaction.options.getInteger('count') || 5, 10);
    let message = '';
    for (let i = 0; i < count; i++) message += 'NUKED BY 888 ';
    await interaction.reply({ content: message });
    console.log(`/raid used by ${interaction.user.tag}: count ${count}`);
  }
});

// === LOGIN ===
client.login(token);
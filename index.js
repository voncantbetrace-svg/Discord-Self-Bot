// index.js
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const { token, guildId, prefix } = require('./config.json');

// === CONFIGURATION ===
const LOG_CHANNEL_ID = '1482523080327823543';
const authorizedUsers = ['291215718106791936']; // Leave [] for public use

// === CREATE CLIENT ===
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

// === READY EVENT ===
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// === MESSAGE-BASED DM COMMAND (SAFE) ===
client.on('messageCreate', async message => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix + 'dm')) {
    if (authorizedUsers.length > 0 && !authorizedUsers.includes(message.author.id)) {
      return message.reply('❌ Only the owner can use this command.');
    }

    const args = message.content.split(' ').slice(1);
    const text = args.join(' ');

    // DM members one by one with a short delay
    for (const member of message.guild.members.cache.values()) {
      if (!member.user.bot) {
        member.send(text).catch(() => {
          console.log(`DM blocked for ${member.user.tag}`);
        });
        await new Promise(r => setTimeout(r, 500)); // 0.5s delay
      }
    }

    const reply = await message.reply('✅ DMs sent (or skipped blocked members)');
    setTimeout(() => reply.delete().catch(() => {}), 2000);
    message.delete().catch(() => {});
  }
});

// === SLASH COMMANDS ===
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

const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log('Refreshing slash commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('✅ Slash commands registered!');
  } catch (err) {
    console.log('❌ Error registering slash commands:', err);
  }
})();

// === HANDLE SLASH COMMANDS ===
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

// === OPTIONAL MESSAGE-BASED RAID ===
client.on('messageCreate', message => {
  if (message.author.bot) return;

  if (message.content.startsWith('!funraid')) {
    if (authorizedUsers.length > 0 && !authorizedUsers.includes(message.author.id)) return;

    const parts = message.content.split(' ');
    const count = Math.min(parseInt(parts[1]) || 5, 10);
    let msg = '';
    for (let i = 0; i < count; i++) msg += 'NUKED BY 888 ';
    message.reply(msg);
    console.log(`Raid used by You Lol}: count ${count}`);
  }
});

// === LOGIN ===
client.login(token);

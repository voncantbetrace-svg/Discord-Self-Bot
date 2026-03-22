// Optional: Only allow certain users to run commands
// Leave empty array [] if you want the bot fully public
// index.js
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');

// === CONFIGURATION ===
const LOG_CHANNEL_ID = '1466913486343766291'; // Channel where logs will go
const authorizedUsers = ['291215718106791936']; // Leave [] for public use

// Check environment variables
if (!process.env.TOKEN || !process.env.CLIENT_ID) {
  console.error("❌ ERROR: TOKEN or CLIENT_ID missing!");
  process.exit(1);
}

// Create the bot client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const Discord = require('discord.js');
const { 291215718106791936, MTQ4NDk2ODY5MzQ2ODM2NDgyMA.Gbdsxa.IkkZsDlmJ8ehrLwCXp27sktd7OgBMJ8bhe6Row, ¡ } = require('./config.json');
const Bot = new Discord.Client();({ws: { intents: new Discord.Intents(Discord.Intents.ALL) } });

Bot.on("ready", () => {
  console.log(`READY !`);
});
Bot.on("message", message => {
  if (message.content.startsWith(prefix + 'dm')) {
    if (message.author.id != Id) {
      return message.reply('Only Owner is Allowed to Use this Command')
    }
    else {
      message.delete
      args = message.content.split(" ").slice(1);
      var argresult = args.join(' ');

      message.guild.members.cache.forEach(member => {
        member.send(argresult).then(console.log(`${member.user.username}#${member.user.discriminator}`))
        .catch(err => console.error(`-----[DM's Disabled]----- \n${member.user.username}#${member.user.discriminator}`));
        console.log(`.....DONE....`)
      })
      message.channel.send(`**DONE**`).then(message.delete({ timeout: 1000 }));
    }
  }
})
Bot.login(token);

// === OVERRIDE console.log TO SEND LOGS TO DISCORD ===
const originalLog = console.log;
console.log = async (...args) => {
  originalLog(...args);
  try {
    const channel = await client.channels.fetch(LOG_CHANNEL_ID);
    if (channel && channel.isTextBased()) {
      const message = args.map(a => (typeof a === 'object' ? JSON.stringify(a, null, 2) : a)).join(' ');
      const chunks = message.match(/[\s\S]{1,1900}/g);
      if (chunks) {
        for (const chunk of chunks) await channel.send(`📄 LOG: ${chunk}`);
      }
    }
  } catch (err) {
    originalLog('❌ Failed to send log to Discord:', err);
  }
};

// === SLASH COMMAND ===
const commands = [
  {
    name: 'funraid',
    description: 'Send fun emojis safely!',
    options: [
      {
        name: 'count',
        type: 4, // INTEGER
        description: 'How many times to repeat the pattern (max 10)',
        required: false
      }
    ]
  }
];

// Register slash commands
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
(async () => {
  try {
    console.log('Refreshing (/) commands...');
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log('Slash commands registered!');
  } catch (error) {
    console.log('❌ Error registering commands:', error);
  }
})();

// Bot ready event
client.once('clientReady', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Handle slash commands
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if (authorizedUsers.length > 0 && !authorizedUsers.includes(interaction.user.id)) {
    return interaction.reply({ content: "❌ You are not allowed to use this bot.", ephemeral: true });
  }

  try {
    if (commandName === 'funraid') {
      const count = Math.min(interaction.options.getInteger('count') || 5, 10); // limit max 10
      const pattern = '💥🔥✨';
      let message = '';
      for (let i = 0; i < count; i++) message += pattern + ' ';
      await interaction.reply({ content: message });
      console.log(`/funraid used by ${interaction.user.tag}: count ${count}`);
    }
  } catch (err) {
    console.log('❌ Command error:', err);
  }
});

// Optional: classic message-based funraid
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (message.content.startsWith('!funraid') && (authorizedUsers.length === 0 || authorizedUsers.includes(message.author.id))) {
    const parts = message.content.split(' ');
    const count = Math.min(parseInt(parts[1]) || 5, 10);
    const pattern = '💥🔥✨';
    let msg = '';
    for (let i = 0; i < count; i++) msg += pattern + ' ';
    message.reply(msg);
    console.log(`!funraid used by ${message.author.tag}: count ${count}`);
  }
});

// Login
client.login(process.env.TOKEN);

// index.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'flood') {
    const message = interaction.options.getString('message');
    let count = interaction.options.getInteger('count') || 1;

    if (count > 16) count = 16; // Limit to 16
    if (count < 1) count = 1;   // Minimum 1

    for (let i = 0; i < count; i++) {
      await interaction.channel.send(`${message} [Di5]`);
    }

    await interaction.reply({ content: `Sent message ${count} times!`, ephemeral: true });
  }
});

// Login
client.login(process.env.TOKEN);

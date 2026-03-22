// index.js
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Bot ready
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Slash command handler
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'flood') {
    const message = interaction.options.getString('message');
    let count = interaction.options.getInteger('count') || 1;
    if (count > 16) count = 16;
    if (count < 1) count = 1;

    for (let i = 0; i < count; i++) {
      await interaction.channel.send(`${message} [Di5]`);
    }

    await interaction.reply({ content: `Sent message ${count} times!`, ephemeral: true });
  }
});

// Login with placeholder token
client.login('MTQ4NTM3NzM1MjU2MDE1MjcyNg.GWkYxf.BMjnhZyUICbpC-6LvP4BUFwL8fib_nG3gnoO60');

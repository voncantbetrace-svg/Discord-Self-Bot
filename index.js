const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  // 🔹 /ping
  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
  }

  // 🔹 /emblem
  if (interaction.commandName === 'emblem') {
    const emblem = `
╔════════════════════╗
   ⚠️ SYSTEM NOTICE ⚠️
╚════════════════════╝
◆ Status: ACTIVE
◆ Mode: PROTECTED
◆ Server Secure ✔️
`;
    await interaction.reply(emblem);
  }

  // 🔹 /repeat (safe limited)
  if (interaction.commandName === 'repeat') {
    const message = interaction.options.getString('message');
    const amount = interaction.options.getInteger('amount');

    if (amount > 5) {
      return interaction.reply({
        content: 'Max is 5 times.',
        ephemeral: true
      });
    }

    await interaction.reply({
      content: `Sending ${amount} messages...`,
      ephemeral: true
    });

    for (let i = 0; i < amount; i++) {
      await interaction.channel.send(message);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
});

// Login
client.login(config.token);

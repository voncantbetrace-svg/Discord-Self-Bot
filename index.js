const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./config');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Helper to log to a channel
async function sendLog(message) {
  const logChannel = await client.channels.fetch(config.logChannelId).catch(() => null);
  if (logChannel) logChannel.send(`📝 ${message}`);
}

// Slash commands
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const userTag = interaction.user.tag;

  // 🔹 /ping
  if (interaction.commandName === 'ping') {
    await interaction.reply('🏓 Pong!');
    await sendLog(`/ping used by ${userTag}`);
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
    await sendLog(`/emblem used by ${userTag}`);
  }

  // 🔹 /repeat
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

    await sendLog(`/repeat used by ${userTag}: "${message}" x${amount}`);

    for (let i = 0; i < amount; i++) {
      await interaction.channel.send(message);
      await new Promise(res => setTimeout(res, 1000));
    }
  }
});

// Optional: log member joins/leaves
client.on('guildMemberAdd', member => {
  sendLog(`👤 ${member.user.tag} joined the server`);
});

client.on('guildMemberRemove', member => {
  sendLog(`❌ ${member.user.tag} left the server`);
});

// Login
client.login(config.token);
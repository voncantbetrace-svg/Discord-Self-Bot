require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;

client.once(Events.ClientReady, () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'flood') {
    const text = interaction.options.getString('message');
    let count = interaction.options.getInteger('count') || 1;

    if (count < 1) count = 1;
    if (count > 10) count = 10;

    await interaction.reply(`Sending ${count} message(s)...`);

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        interaction.channel.send(text);
      }, i * 500);
    }

    // LOGGING
    if (LOG_CHANNEL_ID) {
      const logChannel = await client.channels.fetch(LOG_CHANNEL_ID).catch(() => null);
      if (logChannel) {
        logChannel.send(
          `User ${interaction.user.tag} used /flood in ${interaction.guild?.name} | "${text}" x${count}`
        );
      }
    }
  }
});

client.login(process.env.TOKEN);

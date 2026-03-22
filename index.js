require('dotenv').config();
const { Client, GatewayIntentBits, Events, EmbedBuilder } = require('discord.js');

const token = process.env.TOKEN;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

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
    if (count > 16) count = 16;

    // Send Cyber emblem first
    const emblemEmbed = new EmbedBuilder()
      .setTitle('Cyber Emblem')
      .setDescription('Here is your emblem for the Cyber command!')
      .setColor('#FF0000')
      .setImage('https://i.imgur.com/yourImage.png') // Replace with your emblem URL
      .setFooter({ text: 'Cyber Bot' });

    await interaction.reply({ embeds: [emblemEmbed] });

    // Send the flood messages safely
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        interaction.channel.send(text);
      }, i * 500);
    }

    // Log usage
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


client.login('MTQ4NTM3NzM1MjU2MDE1MjcyNg.GWkYxf.BMjnhZyUICbpC-6LvP4BUFwL8fib_nG3gnoO60');

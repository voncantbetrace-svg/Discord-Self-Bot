require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.once(Events.ClientReady, () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'flood') {
    const text = interaction.options.getString('message');
    let count = interaction.options.getInteger('count') || 1;

    // Safety limits
    if (count < 1) count = 1;
    if (count > 10) count = 10;

    await interaction.reply(`Sending your message ${count} time(s)...`);

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        interaction.channel.send(text);
      }, i * 500); // 0.5s delay
    }
  }
});

client.login(process.env.TOKEN);

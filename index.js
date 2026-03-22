require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Ready event (v15)
client.once(Events.ClientReady, () => {
  console.log(`Bot is online as ${client.user.tag}!`);
});

// Ping test
client.on(Events.MessageCreate, message => {
  if (message.author.bot) return;
  if (message.content === "!ping") message.reply("Pong!");
});

// Slash commands
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
      }, i * 500);
    }
  }
});

// Login safely
const token = process.env.TOKEN;
if (!token) {
  console.error("TOKEN missing! Add it in Railway Variables or .env file");
  process.exit(1);
}

client.login(token).catch(err => {
  console.error("Failed to login. Check your TOKEN:", err);
  process.exit(1);
});

// index.js
require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

// Replace with your Discord user ID
const OWNER_ID = '291215718106791936';

// Check TOKEN
if (!process.env.TOKEN) {
  console.error("ERROR: Missing TOKEN environment variable.");
  process.exit(1);
}

// Step 3: Debug logging at startup
console.log("Starting bot...");

// Create the client with proper intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Bot ready event
client.once('ready', () => {
  console.log(`Bot is online as ${client.user.tag}!`);
  console.log('Guilds this bot is in:');
  client.guilds.cache.forEach(g => console.log(g.id, g.name));
});

// Interaction handler with owner-only protection
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  // Only allow the owner
  if (interaction.user.id !== OWNER_ID) {
    return interaction.reply({ content: "You are not allowed to use this bot.", ephemeral: true });
  }

  try {
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
  } catch (err) {
    console.error("Error handling interaction:", err);
    if (!interaction.replied) {
      await interaction.reply({ content: "Something went wrong!", ephemeral: true });
    }
  }
});

// Login safely
client.login(process.env.TOKEN).catch(err => {
  console.error("Login failed. Check your TOKEN:", err);
  process.exit(1);
});

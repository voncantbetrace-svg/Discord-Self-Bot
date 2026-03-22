// deploy-commands.js
require('dotenv').config(); // Load environment variables
const { REST } = require('@discordjs/rest'); // Import REST once
const { Routes, SlashCommandBuilder } = require('discord.js'); // Import Routes & SlashCommandBuilder

// Define your commands
const commands = [
  new SlashCommandBuilder()
    .setName('flood')
    .setDescription('Send messages with Di5 emblem') // Changed here
    .addStringOption(option =>
      option.setName('message')
            .setDescription('Message to send')
            .setRequired(true))
    .addIntegerOption(option =>
      option.setName('count')
            .setDescription('Number of times to send (1-16)'))
].map(cmd => cmd.toJSON());

// Create REST client (only once)
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );
    console.log('Commands registered successfully!');
  } catch (err) {
    console.error('Error registering commands:', err);
  }
})();



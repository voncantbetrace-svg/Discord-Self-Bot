// deploy-commands.js
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes, SlashCommandBuilder } = require('discord.js');

// Check required environment variables
if (!process.env.TOKEN || !process.env.CLIENT_ID || !process.env.GUILD_ID) {
  console.error("ERROR: Missing TOKEN, CLIENT_ID, or GUILD_ID in environment variables.");
  process.exit(1); // Stop execution safely
}

// Define commands
const commands = [
  new SlashCommandBuilder()
    .setName('flood')
    .setDescription('Send messages with Di5 emblem')
    .addStringOption(option =>
      option.setName('message')
            .setDescription('Message to send')
            .setRequired(true))
    .addIntegerOption(option =>
      option.setName('count')
            .setDescription('Number of times to send (1-16)'))
].map(cmd => cmd.toJSON());

// REST client (only once)
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
    // Don’t crash the process on 401 — just log
  }
})();

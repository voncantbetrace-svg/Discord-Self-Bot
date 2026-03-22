// deploy-commands.js
require('dotenv').config();
const { REST } = require('@discordjs/rest');
const { Routes, SlashCommandBuilder } = require('discord.js');

// Your commands
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

// REST client with placeholder token
const rest = new REST({ version: '10' }).setToken('MTQ4NTM3NzM1MjU2MDE1MjcyNg.GWkYxf.BMjnhZyUICbpC-6LvP4BUFwL8fib_nG3gnoO60');

(async () => {
  try {
    console.log('Registering commands...');
    await rest.put(
      Routes.applicationGuildCommands('YOUR_CLIENT_ID', 'YOUR_GUILD_ID'),
      { body: commands }
    );
    console.log('Commands registered successfully!');
  } catch (err) {
    console.error('Error registering commands:', err);
  }
})();

console.log('TOKEN:', process.env.TOKEN);

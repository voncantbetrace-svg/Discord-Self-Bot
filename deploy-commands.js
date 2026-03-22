const { REST, Routes, SlashCommandBuilder } = require('discord.js');
require('dotenv').config();

const commands = [
  new SlashCommandBuilder()
    .setName('flood')
    .setDescription('Send a burst of messages safely')
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The message you want to send')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('Number of times to send (1-10)')
        .setMinValue(1)
        .setMaxValue(10)
    )
    .toJSON()
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering global slash commands...');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), // GLOBAL
      { body: commands }
    );
    console.log('Successfully registered global commands.');
  } catch (err) {
    console.error(err);
  }
})();

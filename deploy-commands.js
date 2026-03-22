const { REST, Routes } = require('discord.js');
require('dotenv').config();

// Your exact command object
const commands = [
  {
    name: 'flood',
    description: 'Send a burst of messages',
    options: [
      {
        name: 'message',
        type: 3, // STRING
        description: 'The message you want to send',
        required: true
      },
      {
        name: 'count',
        type: 4, // INTEGER
        description: 'How many times to send (1-10)',
        required: false,
        min_value: 1,
        max_value: 10
      }
    ]
  }
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering guild slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), // Guild-specific
      { body: commands }
    );
    console.log('Successfully registered guild commands.');
  } catch (err) {
    console.error(err);
  }
})();

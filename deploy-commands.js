const { REST, Routes } = require('discord.js');
require('dotenv').config();

const commands = [
  {
    name: 'flood',
    description: 'Send a burst of messages',
    options: [
      {
        name: 'message',
        type: 3,
        description: 'The message to send',
        required: true
      },
      {
        name: 'count',
        type: 4,
        description: 'Amount (1-10)',
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
    console.log('Registering GLOBAL slash commands...');
    
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID), // GLOBAL
      { body: commands }
    );

    console.log('Global commands registered (may take up to 1 hour to show).');
  } catch (err) {
    console.error(err);
  }
})();

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

// Define commands internally
const commands = [
  {
    name: 'flood', // your command
    description: 'Send a burst of messages',
    options: [
      {
        name: 'message',
        type: 'STRING',
        description: 'The message you want to send',
        required: true
      },
      {
        name: 'count',
        type: 'INTEGER',
        description: 'How many times to send (1-10)',
        required: false,
        min_value: 1,
        max_value: 10
      }
    ]
  }
];

// Handle commands like “slash commands”
client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  // Check if the message starts with command prefix, e.g., “/”
  const prefix = '/';
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  // Handle /flood
  if (commandName === 'flood') {
    const text = args[0]; // first argument = message
    let count = parseInt(args[1]) || 1; // second argument = count

    // Safety limits
    if (!text) return message.reply('You need to provide a message!');
    if (count < 1) count = 1;
    if (count > 10) count = 10;

    await message.reply(`Sending your message ${count} time(s)...`);

    for (let i = 0; i < count; i++) {
      setTimeout(() => message.channel.send(text), i * 500); // 0.5s delay
    }
  }
});

// Login
const token = process.env.TOKEN;
if (!token) {
  console.error('TOKEN missing! Add it in Railway Variables or .env file');
  process.exit(1);
}

client.login(token).catch(err => {
  console.error('Failed to login. Check your TOKEN:', err);
  process.exit(1);
});

// Old
// const { token, prefix, logChannelId } = require('./config.json');

// New
require('dotenv').config(); // load .env variables
const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN; // token comes from env
const prefix = process.env.PREFIX || "!"; // optional
const logChannelId = process.env.LOG_CHANNEL_ID;

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix + 'ping')) {
        await message.reply('Pong! 🏓');
    }

    const logChannel = client.channels.cache.get(logChannelId);
    if (logChannel) {
        logChannel.send(`📩 ${message.author.tag}: ${message.content}`);
    }
});

client.login(token);

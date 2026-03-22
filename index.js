const { Client, GatewayIntentBits } = require('discord.js');
const { token, prefix, logChannelId } = require('./config.json');

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

    // Simple command example
    if (message.content.startsWith(prefix + 'ping')) {
        await message.reply('Pong! 🏓');
    }

    // Logging messages to a specific channel
    const logChannel = client.channels.cache.get(logChannelId);
    if (logChannel) {
        logChannel.send(`📩 ${message.author.tag}: ${message.content}`);
    }
});

client.login(token);

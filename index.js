require('dotenv').config(); // Loads local .env in development
const { Client, GatewayIntentBits } = require('discord.js');

const token = process.env.TOKEN; // Must match Railway secret key
const prefix = process.env.PREFIX || '!';
const logChannelId = process.env.LOG_CHANNEL_ID;

if (!token) {
    console.error("❌ Bot token not found! Add it to Railway secrets or .env file.");
    process.exit(1);
}

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => console.log(`✅ Logged in as ${client.user.tag}`));

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Command example
    if (message.content.startsWith(prefix + 'ping')) {
        await message.reply('Pong! 🏓');
    }

    // Logging messages to a channel
    if (logChannelId) {
        const logChannel = client.channels.cache.get(logChannelId);
        if (logChannel) logChannel.send(`📩 ${message.author.tag}: ${message.content}`);
    }
});

client.login(token);

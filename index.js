const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

// 👇 THIS goes at the very bottom
client.login("MTQ4NTE1OTE0NTQ0NjU3MjA5Mw.GfImLM.aZzRJ5PBIl6NB6VanbkLv6f8m9yBy6r6uwrZgI");

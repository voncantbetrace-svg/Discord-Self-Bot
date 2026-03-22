// testConfig.js
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

try {
  if (!fs.existsSync(configPath)) {
    throw new Error('❌ config.json not found in this folder!');
  }

  const rawData = fs.readFileSync(configPath, 'utf-8');
  const config = JSON.parse(rawData);

  if (!config.token || typeof config.token !== 'string') {
    throw new Error('❌ Token is missing or invalid in config.json!');
  }

  if (!config.guildId || typeof config.guildId !== 'string') {
    throw new Error('❌ guildId is missing or invalid in config.json!');
  }

  if (!config.prefix || typeof config.prefix !== 'string') {
    throw new Error('❌ prefix is missing or invalid in config.json!');
  }

  console.log('✅ config.json is valid!');
  console.log(`Token: ${config.token.slice(0, 4)}... (hidden for safety)`);
  console.log(`GuildId: ${config.guildId}`);
  console.log(`Prefix: ${config.prefix}`);
} catch (err) {
  console.error('❌ Error reading config.json:');
  console.error(err.message);
  process.exit(1);
}

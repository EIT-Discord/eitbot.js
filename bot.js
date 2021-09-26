const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const { clientId, guildId, token } = require('./src/config.json');
const {initParseEitConfig} = require('./src/eit/configParser')


// Create a new client instance
let client = new Client({
        shards: 'auto',
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
            ],

        partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER']
    });

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./src/buttons').filter(file => file.endsWith('.js'));
const menuFiles = fs.readdirSync('./src/menus').filter(file => file.endsWith('.js'));

client.commands = new Collection();
client.buttons = new Map();
client.menus = new Map();

client.eit = {channels: new Map(), roles: new Map(), activeSetups: new Map(), polls: new Map()};

let commands = [];

for (const file of commandFiles) {
    const command = require(`./src/commands/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
}

for (let file of eventFiles) {
    let event = require(`./src/events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

for (let file of buttonFiles) {
    let button = require(`./src/buttons/${file}`);
    client.buttons.set(button.ID, button);
}

for (let file of menuFiles) {
    let menu = require(`./src/menus/${file}`);
    client.menus.set(menu.ID, menu);
}

// deploy slash commands
const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId),
            { body: commands });
        console.log('Successfully registered application commands.');
    }
    catch (error){
        console.error(error);
    }
})();

client.fetchEitMember = async () => {
    return await rest.get(Routes.guildMembers(guildId),
        {query: new URLSearchParams({"limit": "1000"})})
}

// Login to Discord with your client's token
client.login(token)

initParseEitConfig(client);






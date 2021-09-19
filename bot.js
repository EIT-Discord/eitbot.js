const fs = require('fs');

const { Client, Collection, Intents } = require('discord.js');

const {eit} = require("./eit/classes");
const { token } = require('./config.json');
const {initParseEitConfig} = require('./eit/configParser')

// Deploys all commands which may changed
require('./deploy-commands.js');


// Create a new client instance
let client = new Client({
        intents: [
            Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES,
            Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS],

        partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER']
    });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));
const menuFiles = fs.readdirSync('./menus').filter(file => file.endsWith('.js'));

client.commands = new Collection();
client.buttons = new Map();
client.menus = new Map();

client.eit = eit;


for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    client.buttons.set(button.ID, button);
}

for (const file of menuFiles) {
    const menu = require(`./menus/${file}`);
    client.menus.set(menu.ID, menu);
}

// Login to Discord with your client's token
client.login(token)

initParseEitConfig(client);


// Deploys all commands which may changed
require('./deploy-commands.js');

const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    });

client.commands = new Collection();
client.buttons = new Map();
client.menus = new Map();


// Fetches all commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles)
{
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


// Fetches all events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles)
{
    const event = require(`./events/${file}`);
    if (event.once)
    {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else
    {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

// Fetches all buttons
const buttonFiles = fs.readdirSync('./buttons').filter(file => file.endsWith('.js'));

for (const file of buttonFiles) {
    const button = require(`./buttons/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.buttons.set(button.ID, button);
}

// Fetches all menus
const menuFiles = fs.readdirSync('./menus').filter(file => file.endsWith('.js'));

for (const file of menuFiles) {
    const menu = require(`./menus/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.menus.set(menu.ID, menu);
}

// Login to Discord with your client's token
client.login(token);

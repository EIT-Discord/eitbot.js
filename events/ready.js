const { guildId } = require('../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};
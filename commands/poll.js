const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Replies with Pong!'),
    async execute(interaction)
    {
        const collector = message.createMessageComponentCollector({ componentType: 'BUTTON', time: 15000 });
        await interaction.reply({content: utils.codeBlock('Ping!'), ephemeral: true});
    },
};
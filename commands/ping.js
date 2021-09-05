const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply({content: utils.codeBlock('Ping!'), ephemeral: true});
    },
};

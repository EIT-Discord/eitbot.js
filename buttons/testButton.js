const {MessageButton} = require("discord.js");
const utils = require("../utils.js");

module.exports = {
    data: new MessageButton()
        .setCustomId('primary')
        .setLabel('Primary')
        .setStyle('PRIMARY'),

    async execute(interaction)
    {
        await interaction.reply({content: utils.codeBlock('Ping!'), ephemeral: true});
    }
}
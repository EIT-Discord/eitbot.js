const {MessageButton} = require("discord.js");

module.exports = {
    ID: 'binaryButton',

    yesButton: new MessageButton()
        .setCustomId('yes')
        .setLabel('Yes')
        .setStyle('PRIMARY'),

    noButton: new MessageButton()
        .setCustomId('no')
        .setLabel('No')
        .setStyle('PRIMARY'),

    async execute(interaction)
    {
        await interaction.reply({content: 'Ping!', ephemeral: true});
    }
}
const {MessageButton} = require("discord.js");
const utils = require("../utils.js");

const name = 'testbutton'

module.exports = {
        ID: name,
        data: new MessageButton()
            .setCustomId(name)
            .setLabel('Primary')
            .setStyle('PRIMARY'),

        async execute(interaction)
        {
            await interaction.reply({content: utils.codeBlock('Ping!'), ephemeral: true});
        }
}
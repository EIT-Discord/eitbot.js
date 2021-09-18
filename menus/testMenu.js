const {MessageSelectMenu} = require("discord.js");
const utils = require("../utils.js");



module.exports = {
    ID: 'testmenu',
    testmenu: new MessageSelectMenu()
            .setCustomId('testmenu')
            .setPlaceholder('Nothing selected')
            .addOptions([
                {
                    label: 'Select me',
                    description: 'This is a description',
                    value: '1',
                },
                {
                    label: 'You can select me too',
                    description: 'This is also a description',
                    value: '2',
                },
            ]),
    async execute(interaction)
    {
        switch (interaction.values[0])
        {
            case '1':
                await interaction.reply({content: utils.codeBlock('Eins'), ephemeral: true});
                break;
            case '2':
                await interaction.reply({content: utils.codeBlock('Zwei'), ephemeral: true});
                break;
        }
    }
}
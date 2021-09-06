const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const testButton = require('../buttons/testButton');
const testEmbed = require('../embeds/testEmbed');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Replies with Pong!'),

    async execute(interaction)
    {
        const row = new MessageActionRow()
            .addComponents(testButton.data);


        const embed = new MessageEmbed()
            .setTitle('Some title')
            .setDescription('Description after the edit')
            .addField('Inline field title', 'Some value here', true);

        await interaction.reply(
            {
                embeds: [testEmbed.data],
                ephemeral: true,
                components: [row]
            });
    },
};

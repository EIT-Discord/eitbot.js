const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const testMenu = require('../menus/testMenu');
const testEmbed = require('../embeds/testEmbed');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('menutest')
        .setDescription('Replies with Pong!'),

    async execute(interaction)
    {
        const row = new MessageActionRow()
            .addComponents(testMenu.testmenu);

        await interaction.reply(
            {
                embeds: [testEmbed.data],
                ephemeral: true,
                components: [row]
            });
    },
};
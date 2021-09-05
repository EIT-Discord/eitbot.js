const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const utils = require('../utils.js');
const wait = require('util').promisify(setTimeout);

module.exports = {
    data: new SlashCommandBuilder()
        .setName('embedtest')
        .setDescription('Replies with Pong!'),

    async execute(interaction)
    {
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('primary')
                    .setLabel('Primary')
                    .setStyle('PRIMARY'),
            );

        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Some title')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/AfFp7pu.png')
            .addFields
            (
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )
            .addField('Inline field title', 'Some value here', true)
            .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

        await interaction.reply(
            {
                embeds: [exampleEmbed],
                ephemeral: true,
                components: [row]
            });
    },
};

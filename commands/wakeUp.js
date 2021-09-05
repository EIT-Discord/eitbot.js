const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wakeup')
        .setDescription('Moves given member between channels to get their attention!')
        .addUserOption(option =>
            option.setName('member')
                .setDescription('The member to wake up!')
                .setRequired(true)),

    async execute(interaction)
    {
        const invoker = interaction.member;
        const invokerChannel = invoker.voice.channel;

        const targetMember = interaction.options.get('member').member;
        const targetVoiceState = targetMember.voice;

        const afkChannel = interaction.guild.afkChannel;

        try
        {
            await targetVoiceState.setChannel((targetVoiceState.channel !== afkChannel) ? afkChannel: invokerChannel);
        }
        catch (DiscordApiError)
        {
            await interaction.reply
            ({
                    content: utils.codeBlock(`Your target must be connected to a voice channel!`),
                    ephemeral: true
                });
            return;
        }

        for (let i = 0; i < 3; i++)
        {
            try
            {
                await targetVoiceState.setChannel(afkChannel);
                await targetVoiceState.setChannel(invokerChannel);
            }
            catch (DiscordApiError){}
        }
        await interaction.reply
            ({
                content: utils.codeBlock(`Tried to wake up ${targetMember.user.username}!`),
                ephemeral: true
            });
    },
};
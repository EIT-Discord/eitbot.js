const { SlashCommandBuilder } = require('@discordjs/builders');
const {createAudioResource, createAudioPlayer, joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('voicetest')
        .setDescription('Some voice testing'),

    async execute(interaction)
    {
        const channel = interaction.member.voice.channel;
        const kot = channel.guild.voiceAdapterCreator;

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        const resource = createAudioResource('./sers.mp3');
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

    },
};


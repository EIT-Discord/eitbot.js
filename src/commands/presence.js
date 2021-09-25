const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('presence')
        .setDescription('Set the bot`s presence!')
        .addStringOption(option =>
            option.setName('presence')
                .setDescription('The new presence!')
                .setRequired(true)),
    async execute(interaction)
    {
        const client = interaction.client;
        const presence = interaction.options.getString('presence');
        await client.user.setPresence({ activities: [{ name: presence }], status: 'online' })
            .then(await interaction.reply({content: `Presence set to ${presence}`, ephemeral: true}))
            .catch(console.error);
    },
};
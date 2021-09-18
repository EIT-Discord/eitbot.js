const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('group of Systemtechnik Bot commands!')

        .addSubcommand(subcommand =>
            subcommand
                .setName('all')
                .setDescription('clears all messages on the channel'))

        .addSubcommand(subcommand =>
            subcommand
                .setName('amount')
                .setDescription('clears a given amount of messages!')
                .addStringOption(option =>
                    option.setName('number')
                        .setDescription('set amount')
                        .setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
                .setName('only')
                .setDescription('clears a members messages!')
                .addUserOption(option =>
                    option.setName('member')
                        .setDescription('set member')
                        .setRequired(true))),

    async execute(interaction) {
        const subCommand = (interaction.options.data[0]);

        switch (subCommand.name) {
            case 'all':
                await clearAll(interaction);
                break;

            case 'amount':
                await clearAmount(interaction);
                break;

            case 'only':
                await clearMemberMessages(interaction);
                break;
        }
    }
};

const clearAll = async (interaction) => {
    const start = Date.now();
    const maxTimeDuration = 1209500;

    const validateTimestamp = message => (message.createdTimestamp - start) < maxTimeDuration;

    const deleteMessages = messages => {Array.from(messages).every(validateTimestamp) ?
        interaction.channel.bulkDelete(messages) : messages.forEach(message => message.delete())}

    await interaction.channel.messages.fetch({limit: 100})
        .then(messages => deleteMessages(messages));

    await interaction.reply('Starting to delete the last 100 messages!')
}

const clearAmount = async (interaction) => {
    await interaction.reply({content: 'clearAmount in progress!', ephemeral: true});
}

const clearMemberMessages = async (interaction) => {
    await interaction.reply({content: 'clearMemberMessages in progress!', ephemeral: true});
}
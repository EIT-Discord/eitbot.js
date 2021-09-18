const { SlashCommandBuilder } = require('@discordjs/builders');

const { codeBlock } = require('../utils.js');
const { Setup } = require("../eit/setup");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('eit')
        .setDescription('Übergruppe der EIT-Server Befehle!')

        .addSubcommand(subcommand =>
            subcommand
                .setName('setup')
                .setDescription('Sendet das Setupembed für die Rollenauswahl!'))

        .addSubcommand(subcommand =>
            subcommand
                .setName('name')
                .setDescription('Lässt dich deinen Namen auf dem Server ändern!')
                .addStringOption(option =>
                    option.setName('name')
                        .setDescription('Vollständiger Name!')
                        .setRequired(true)))

        .addSubcommand(subcommand =>
            subcommand
                .setName('modmail')
                .setDescription('Informiert die Moderatoren über dein Anliegen!')
                .addStringOption(option =>
                    option.setName('reason')
                        .setDescription('Vollständiger Name!')
                        .setRequired(true))),

    async execute(interaction)
    {
        const subCommand = (interaction.options.data[0]);

        switch (subCommand.name)
        {
            case 'setup':
                await setup(interaction);
                break;

            case 'name':
                await changeNickName(interaction);
                break;

            case 'modmail':
                await modMail(interaction);
                break;

        }
    },
};


const setup = async (interaction) => {
    if (interaction.guild.client.eit.activeSetups.has(interaction.member.user.id)) {
        interaction.reply('Es gibt bereits ein aktives Setup-Event!');
        return;
    }

    interaction.guild.client.eit.activeSetups.set(interaction.member.user.id, new Setup(interaction.member.user))
    interaction.reply('Test');
}


const changeNickName = async (interaction) => {
    const name = interaction.options.getString('name');

    await interaction.member.setNickname(name)
        .then(interaction.reply(
            {
                content: codeBlock(`Dein Name wurde erfolgreich zu ${name} geändert!`),
                ephemeral: true
            }))
        .catch();
}


const modMail = async interaction => {
    const text = interaction.options.getString('reason');

    const filterMods = member => {
        if (member.roles.some(role => role.id === interaction.client.eit.roles.get('Moderator').id)) {
            member.send(text)
        }
    }
    const returnMember = interaction => {
        interaction.client.guilds.fetch(interaction.guildId)
            .then(guild => guild.members.fetch()
                .then(members => members.forEach(filterMods)))
        .catch();
    }
}


const { SlashCommandBuilder } = require('@discordjs/builders');

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
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('semesterstart')
                .setDescription('Sendet das Setupevent an jeden Studenten!')),

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

            case 'semesterstart':
                await semesterStart(interaction);
                break;

        }
    },
};


const setup = async (interaction) => {
    if (interaction.guild.client.eit.activeSetups.has(interaction.member.user.id)) {
        interaction.reply({content: 'Es gibt bereits ein aktives Setup-Event!', ephemeral: true});
        return;
    }
    interaction.guild.client.eit.activeSetups.set(interaction.member.user.id, new Setup(interaction.member));
    interaction.reply({content: `Unser Bot sollte dich persönlich angeschrieben haben!`, ephemeral: true});
}

const changeNickName = async (interaction) => {
    const name = interaction.options.getString('name');

    const filter = m => {
        return ((/[A-zÀ-ú$\s]/).test(m.content)) && m.content.length < 32 && m.content.length > 3
    };

    if (filter(name)){
        try {
            await interaction.member.setNickname(name)
            interaction.reply({
                    content: `Dein Name wurde erfolgreich zu ${name} geändert!`,
                    ephemeral: true
                })
        }
        catch (err){
            console.log(err)
        }
    }
    else {
        interaction.reply({
                content: `Es gab ein Problem beim Ändern deines Nicknamens! 
                Bitte kontaktiere die Serveradmins um das Problem zu lösen!`,
                ephemeral: true
        })
    }
}

const modMail = async interaction => {
    let text = interaction.options.getString('reason');
    const moderator = interaction.client.eit.roles.get('Moderator').id;

    await interaction.client.fetchEitMember()
        .then(members => members.forEach(async member => {
            if (member.roles.includes(moderator)) {
                await interaction.guild.members.fetch(member.user.id)
                    .then(async member => await member.user.send(text))
            }
        }))

    await interaction.reply({content: `Dein Anliegen wurde an die Moderatoren weitergeleitet`, ephemeral: true})
}

const semesterStart = async interaction => {
    const student = interaction.client.eit.roles.get('Student').id;
    let activeSetups = interaction.guild.client.eit.activeSetups;

    // Fetch all guild members directly from discord via get request
    await interaction.client.fetchEitMember()
        .then(members => members.forEach(async member => {

            // Fetch member objects if student role exist
            if (member.roles.includes(student)) {
                await interaction.guild.members.fetch(member.user.id)

                    // Create setup event if none exist
                    .then(async member =>
                        !activeSetups.has(member.user.id) && activeSetups.set(member.user.id, new Setup(member)))
            }
        }))
    await interaction.reply({content: `Es wurde ein Setupevent für jeden Studenten erstellt!`, ephemeral: true})
}


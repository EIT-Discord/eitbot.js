const wait = require('util').promisify(setTimeout);

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

const { Setup } = require("../eit/setup");
const {fetchMemberFromUser} = require("../utils");

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

            case 'semesterstart':
                await semesterStart(interaction);
                break;
        }
    },
};

const setup = async (interaction) => {
    let member = await memberCheck(interaction);

    if (member === undefined){
        await interaction.reply(`Can not find your member object!`);
        return;
    }
    interaction.client.eit.activeSetups.set(member.id, new Setup(member));
    interaction.reply({content: `Unser Bot sollte dich persönlich angeschrieben haben!`, ephemeral: true});
}

const changeNickName = async (interaction) => {
    let member = await memberCheck(interaction);

    if (member === undefined){
        await interaction.reply(`Can not find your member object!`);
        return;
    }
    const name = interaction.options.getString('name');

    const filter = m => {
        return ((/[A-zÀ-ú$\s]/).test(m.content)) && m.content.length < 32 && m.content.length > 3
    };

    if (filter(name)){
        try {
            await member.setNickname(name)
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

const semesterStart = async interaction => {
    let member = await memberCheck(interaction);

    if (member === undefined){
        await interaction.reply(`Can not find your member object!`);
        return;
    }
    if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        interaction.reply({content: 'You do not have the required permissions!', ephemeral: true});
        return;
    }

    const student = interaction.client.eit.student.id;
    let activeSetups = interaction.guild.client.eit.activeSetups;

    // Fetch all guild members directly from discord via get request
    await interaction.client.fetchEitMember()
        .then(members => members.forEach(async member => {

            // Fetch member objects if student role exist
            if (member.roles.includes(student)) {
                await interaction.guild.members.fetch(member.user.id)

                    // Create setup event if none exist
                    .then(async member => {
                        await wait(3000)
                        !activeSetups.has(member.user.id) && activeSetups.set(member.user.id, new Setup(member))
                    })
            }
        }))
    await interaction.reply({content: `Es wurde ein Setupevent für jeden Studenten erstellt!`, ephemeral: true})
}

const memberCheck = async interaction => {
    let member;
    if (interaction.member === undefined){
        member = await fetchMemberFromUser(interaction.client, interaction.user)
    }
    else {
        member = interaction.member
    }
    return member;
}
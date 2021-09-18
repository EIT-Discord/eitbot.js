const {MessageSelectMenu} = require("discord.js");


const utils = require("../utils.js");
module.exports = {
    ID: 'studentenAuswahl',
    studentenAuswahl: new MessageSelectMenu()
        .setCustomId('studentenAuswahl')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: 'Grundstudium',
                description: 'Für Student:innen im 1. bis 4. Semester!',
                value: 'Grundstudium',
            },
            {
                label: 'Praxissemester',
                description: 'Für Student:innen im Praxissemester!',
                value: 'Praxissemester',
            },
            {
                label: 'Vertieftes Studium',
                description: 'Für Student:innen im 6. bis 7. Semester!',
                value: 'Vertieftes Studium',
            },
            {
                label: 'Master',
                description: 'Für Student:innen in Masterstudiengängen!',
                value: 'Master',
            },
            {
                label: 'Alumni',
                description: 'Für Absolvent:innen der Hochschule München!',
                value: 'Master',
            },
        ]),
    async execute(interaction)
    {
        const role = interaction.values[0];
        const setup = interaction.client.eit.activeSetups.get(interaction.user.id)

        await interaction.update({
            content: `${role} wurde ausgewählt!`,
            components: []
        }).then()
        await interaction.reply('Test')// .then(setup.roleChoice(role))
    }
}
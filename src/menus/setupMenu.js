const {MessageSelectMenu} = require("discord.js");

module.exports = {
    ID: 'setupMenu',
    studentenAuswahl: new MessageSelectMenu()
        .setCustomId('setupMenu')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: 'Grundstudium',
                description: 'Für Student:innen im 1. bis 4. Semester!',
                value: 'Grundstudium',
            },
            {
                label: 'Vertieftes Studium',
                description: 'Für Student:innen im 5. bis 7. Semester!',
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
                value: 'Alumni',
            },
        ]),

    rollenAuswahl: new MessageSelectMenu()
        .setCustomId('setupMenu')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: 'Student',
                description: 'Für Student:innen der Hochschule München! (auch ehemalige) ',
                value: 'Student',
            },
            {
                label: 'Gast',
                description: 'Für Jeden, der hier nur abhängen will!',
                value: 'Gast',
            },
            {
                label: 'Professor',
                description: 'Für die ehrenwerten Professor:innen der Hochschule München!',
                value: 'Professor',
            },
            {
                label: 'Interessent',
                description: 'Für Jeden, der an einem Studium interessiert ist!',
                value: 'Interessent',
            },
        ]),

    grundStudium: new MessageSelectMenu()
        .setCustomId('setupMenu')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: '1. Semester',
                value: '1. Semester',
            },
            {
                label: '2. Semester',
                value: '2. Semester',
            },
            {
                label: '3. Semester',
                value: '3. Semester',
            },
            {
                label: '4. Semester',
                value: '4. Semester',
            },
        ]),

    vertieftesStudium: new MessageSelectMenu()
        .setCustomId('setupMenu')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: '5. Semester',
                value: '5. Semester',
            },
            {
                label: '6. Semester',
                value: '6. Semester',
            },
            {
                label: '7. Semester',
                value: '7. Semester',
            },
        ]),

    async execute(interaction) {
        const choice = interaction.values[0];
        const setup = interaction.client.eit.activeSetups.get(interaction.user.id)

        if (setup === undefined) {
            await interaction.update({
                content: `Diese Setupinstanz ist ungültig!\nBitte führe nochmal den Befehl /eit setup aus!`,
                components: []
            })
        }
        else {
            try {
                await interaction.update({
                    content: `Du hast ${choice} ausgewählt!`,
                    components: []
                })
                    .then(setup.choice(choice))
            }
            catch (err){
                console.log(err)
            }
        }
    }
}

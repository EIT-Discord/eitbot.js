const {MessageSelectMenu, MessageActionRow} = require("discord.js");
const utils = require("../utils.js");
const setupEmbed = require("../embeds/setupEmbed");

const testEmbed = require('../embeds/testEmbed');


module.exports = {
    ID: 'rollenAuswahl',
    rollenAuswahl: new MessageSelectMenu()
        .setCustomId('rollenAuswahl')
        .setPlaceholder('Keine Auswahl getroffen!')
        .addOptions([
            {
                label: 'Student',
                description: 'Für Student:innen der Hochschule München!',
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
    async execute(interaction){
        const role = interaction.values[0];

        const setup = interaction.client.eit.activeSetups.get(interaction.user.id)

        await interaction.update({
            content: `${role} wurde ausgewählt!`,
            components: []
        })
            .then(setup.roleChoice(role))

//
        // await removeRoles(interaction);
//
        // await interaction.member.roles.add(interaction.client.eit.roles.get(role))
        //     .then(await interaction.deferUpdate())
        //     .catch();
    }
}

async function removeRoles(interaction){

    Array.from(interaction.client.eit.roles.values())
        .forEach(role => interaction.member.roles.remove(role))
}
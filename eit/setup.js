const { MessageActionRow } = require("discord.js");
const setupMenu =  require("../menus/setupMenu");
const setupEmbed = require("../embeds/setupEmbed");


async function removeRoles(interaction) {
    Array.from(interaction.client.eit.roles.values())
        .forEach(role => interaction.member.roles.remove(role))
}


class Setup {
    constructor(user) {
        this.user = user;
        this.state = 'init';
        this.init();
    }

    async init () {
        await this.sendMenu(setupMenu.rollenAuswahl, [setupEmbed.start]);
    }

    async choice (choice) {
        switch (choice) {
            case 'Student':
                await this.sendMenu(setupMenu.studentenAuswahl);
                break;
            case 'Gast':
                break;
            case 'Professor':
                break;
            case 'Interessent':
                break;
            case 'Grundstudium':
                await this.sendMenu(setupMenu.grundStudium);
                break;
            case 'Praxissemester':
                break;
            case 'Vertieftes Studium':
                break;
            case 'Master':
                break;
            case 'Alumni':
                break;
        }
    }

    async sendMenu (menu, embed= []) {
        const row = new MessageActionRow()
            .addComponents(menu)

        await this.user.send({
            content: 'Sers',
            components: [row],
            embeds: embed
        })
    }
}

module.exports = {Setup}

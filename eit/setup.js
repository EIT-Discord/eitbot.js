const { MessageActionRow } = require("discord.js");
const roleSelectMenu =  require("../menus/roleSelectMenu");
const studentSelectMenu =  require("../menus/studentSelectMenu");
const setupEmbed = require("../embeds/setupEmbed");

class Setup {
    constructor(user) {
        this.user = user;
        this.state = 'init';
    }


    async init () {
        const row1 = new MessageActionRow()
            .addComponents(roleSelectMenu.rollenAuswahl)

        await this.user.send({
            content: 'Sers',
            embeds: [setupEmbed.start],
            components: [row1]
        })
    }

    async roleChoice (choice) {
        switch (choice){
            case 'Student':
                const row2 = new MessageActionRow()
                    .addComponents(studentSelectMenu.studentenAuswahl)

                await this.user.send({
                    content: 'Sers',
                    components: [row2]
                })
                break;

            case 'Professor':
                break;
        }
    }
    studentChoice () {

    }
}

module.exports = {Setup}
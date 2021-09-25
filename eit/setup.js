const { MessageActionRow } = require("discord.js");
const setupMenu =  require("../menus/setupMenu");
const setupEmbed = require("../embeds/setupEmbed");

class Setup {
    constructor(member) {
        this.member = member;
        this.guild = member.guild;
        this.user = member.user;
        this.client = this.guild.client;
        this.init();
    }

    async init () {
        await this.sendMenu(setupMenu.rollenAuswahl, [setupEmbed.start]);
    }

    async choice (choice) {
        switch (choice) {
            case 'Student':
                await this.sendMenu(setupMenu.studentenAuswahl, [setupEmbed.studentSelect]);
                await this.removeRoles();
                await this.addRole(choice);
                break;

            case 'Gast':
            case 'Professor':
            case 'Interessent':
            case 'Master':
            case 'Alumni':
                await this.changeName([setupEmbed.nameSelect]);
                await this.removeRoles();
                await this.addRole(choice);
                this.removeSetupEvent()
                break;

            case 'Grundstudium':
                await this.sendMenu(setupMenu.grundStudium, [setupEmbed.semesterSelect]);
                break;

            case 'Vertieftes Studium':
                await this.sendMenu(setupMenu.vertieftesStudium, [setupEmbed.semesterSelect]);
                break;

            case '1. Semester':
            case '2. Semester':
            case '3. Semester':
            case '4. Semester':
            case '5. Semester':
            case '6. Semester':
            case '7. Semester':
                await this.changeName([setupEmbed.nameSelect]);
                await this.addRole(choice);
                this.removeSetupEvent()
                break;
        }
    }

    async sendMenu (menu, embed= []) {
        const row = new MessageActionRow()
            .addComponents(menu)

        await this.user.send({
            components: [row],
            embeds: embed
        })
    }

    async changeName(embed) {

        const filter = m => (/[A-z À-ú]/).test(m.content) && m.content.length < 32 && m.content.length > 3;

        await this.user.send({embeds: embed});

        const name = await this.user.dmChannel.awaitMessages({filter, max: 1})
            .then(m => {return m.first().content});

        try {
            await this.member.setNickname(name)
            this.user.send(`Dein Nickname wurde erfolgreich zu ${name} geändert!`)
        }
        catch (err){
            this.user.send(`Es gab ein Problem beim Ändern deines Namens!\n` +
                `Bitte kontaktiere die Serveradmins um das Problem zu lösen!`)
            console.log(err);
        }
    }

    async addRole(role) {
        try{
            await this.member.roles.add(this.client.eit.roles.get(role))
        }
        catch (err){
            console.log(err);
        }
    }

    async removeRoles() {
        try{
            Array.from(this.client.eit.roles.values())
                .forEach(role => this.member.roles.remove(role));
        }
        catch (err){
            console.log(err);
        }
    }

    removeSetupEvent () {
        this.client.eit.activeSetups.delete(this.user.id)
    }
}

module.exports = {Setup}

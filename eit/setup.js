const { MessageActionRow } = require("discord.js");
const setupMenu =  require("../menus/setupMenu");
const setupEmbed = require("../embeds/setupEmbed");

class Setup {
    constructor(member) {
        this.member = member;
        this.guild = member.guild;
        this.user = member.user;
        this.client = this.guild.client;
        this.state = 'init'
        this.init();
    }

    async init () {
        await this.sendMenu(setupMenu.rollenAuswahl, [setupEmbed.start]);
    }

    async choice (choice) {
        if (this.state === 'init'){
            await this.removeRoles()
            await this.addRole(choice)
            this.state = 'roleSelected'
        }

        switch (choice) {
            case 'Student':
                await this.sendMenu(setupMenu.studentenAuswahl, [setupEmbed.studentSelect]);
                break;

            case 'Gast':
            case 'Professor':
            case 'Interessent':
                await this.changeName([setupEmbed.nameSelect]);
                this.removeSetupEvent()
                break;

            case 'Grundstudium':
                await this.sendMenu(setupMenu.grundStudium);
                break;

            case 'Praxissemester':
                await this.changeName([setupEmbed.nameSelect]);
                this.removeSetupEvent()
                break;

            case 'Vertieftes Studium':
                await this.sendMenu(setupMenu.vertieftesStudium);
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
            content: '.',
            components: [row],
            embeds: embed
        })
    }

    async changeName(embed) {

        const filter = m => ((/[A-zÀ-ú\s]/).test(m.content)) && m.content.length < 32 && m.content.length > 3;

        await this.user.send({content: '.', embeds: embed});

        const name = await this.user.dmChannel.awaitMessages({filter, max: 1})
            .then(m => {return m.first().content});

        try {
            await this.member.setNickname(name)
            this.user.send(`Dein Nickname wurde erfolgreich zu ${name} geändert!`)
        }
        catch (err){
            this.user.send(
                `Es gab ein Problem beim Ändern deines Nicknamens!\n
                 Bitte kontaktiere die Serveradmins um das Problem zu lösen!`)
            console.log(err);
        }
    }

    async addRole(role) {
        await this.member.roles.add(this.client.eit.roles.get(role))
    }

    async removeRoles() {
        Array.from(this.client.eit.roles.values())
            .forEach(role => this.member.roles.remove(role))
    }

    removeSetupEvent () {
        this.client.eit.activeSetups.delete(this.user.id)
    }
}

module.exports = {Setup}

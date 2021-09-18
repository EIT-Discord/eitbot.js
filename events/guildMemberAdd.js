const setupEmbed = require("../embeds/setupEmbed");
const { MessageActionRow } = require("discord.js");
const roleSelectMenu = require("../menus/roleSelectMenu");
const { Setup } = require("../eit/setup")

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        member.guild.client.eit.activeSetups.set(member.user.id, new Setup(member.user).init())
    },
};
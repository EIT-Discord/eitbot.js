const { Setup } = require("../eit/setup")


module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        if (!(member.guild.client.eit.activeSetups.has(member.user.id) || member.user.bot)) {
            member.guild.client.eit.activeSetups.set(member.user.id, new Setup(member))
        }
    }
}

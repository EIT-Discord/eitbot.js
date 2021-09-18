const { Setup } = require("../eit/setup")


module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        member.guild.client.eit.activeSetups.set(member.user.id, new Setup(member.user))
    },
};
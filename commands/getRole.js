const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('toggle')
        .setDescription('Toggle given role!')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('Name of the role!')
                .setRequired(true)),
    async execute(interaction) {
        const role = interaction.options.getRole('role');

        if (Array.from(interaction.member.roles.cache.values(), roles =>
            roles.id).includes(role.id))
        {
            await interaction.member.roles.remove(role)
                .then(await interaction.reply(`Role ${role} successfully removed!`))
                .catch(console.error);
        }
        else
        {
            await interaction.member.roles.add(role)
                .then(await interaction.reply(`Role ${role} successfully assigned!`))
                .catch(console.error);
        }

    },
};
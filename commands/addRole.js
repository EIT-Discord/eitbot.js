const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addrole')
        .setDescription('Adds a new role and creates a new command!')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Name of the new role!')
                .setRequired(true)),
    async execute(interaction)
    {
        const name = interaction.options.getString('name');
        const guild = interaction.guild;

        if (Array.from(guild.roles.cache.values(), role_name =>
            role_name.name.toLowerCase()).includes(name.toLowerCase()))
        {
            await interaction.reply(`Role ${name} already existing!`);
            return;
        }

        await guild.roles.create({name: name})
            .then(await interaction.reply(`Role ${name} successfully created!`))
            .catch(console.error);
    },
};

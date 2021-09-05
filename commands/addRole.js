const { SlashCommandBuilder } = require('@discordjs/builders');
const utils = require('../utils.js');

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
            await interaction.reply({content: utils.codeBlock(`Role ${name} already existing!`), ephemeral: true});
            return;
        }

        await guild.roles.create({name: name})
            .then(await interaction.reply({content: utils.codeBlock(`Role ${name} successfully created!`), ephemeral: true}))
            .catch(console.error);
    },
};

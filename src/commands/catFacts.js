const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;
fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription("Different commands based on cats!")

        .addSubcommand(subcommand =>
            subcommand
                .setName('fact')
                .setDescription('Responses with a random cat fact!')),

    async execute(interaction) {
        const subCommand = (interaction.options.data[0]);

        switch (subCommand.name)
        {
            case 'fact':
                await fact(interaction);
                break;
        }

    },
}

const fact = async interaction => {
    axios.get('https://catfact.ninja/fact')
        .then(async response =>  {
            // handle success
            await interaction.reply(response.data.fact);
        })
        .catch(error => {
            // handle error
            console.log(error);
        })
}



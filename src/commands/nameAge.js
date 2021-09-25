const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nameage')
        .setDescription("Returns your estimated age based on your name!")
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Your Name!')
                .setRequired(true)),

    async execute(interaction) {
        const name = interaction.options.getString('name');

        axios.get(`https://api.agify.io/?name=${name}`)
            .then(async response =>  {
                // handle success
                await interaction.reply(`${name}, you are ${response.data.age} years old!`);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    },
}



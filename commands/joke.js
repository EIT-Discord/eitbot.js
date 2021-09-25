const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios').default;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription("Responses with a random joke!"),

    async execute(interaction) {

        axios.get('https://v2.jokeapi.dev/joke/Any')
            .then(async response =>  {
                // handle success
                await sendJoke(response.data, interaction);
            })
            .catch(error => {
                // handle error
                console.log(error);
            })
    },
}

const sendJoke = async (joke, interaction) => {
    joke.type === 'single' && await interaction.reply(joke.joke);
    joke.type === 'twopart' && await interaction.reply(`${joke.setup}\n ${joke.delivery}`)
}
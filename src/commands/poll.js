const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageSelectMenu, MessageActionRow} = require("discord.js");

const binaryButton =  require("../buttons/binaryButton");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Replies with Pong!')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Number of questions: 2-5')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select your target channel!')
                .setRequired(true)),

    async execute(interaction) {
        // Check for existing polls
        if (interaction.guild.client.eit.polls.has(interaction.member.user.id)) {
            interaction.reply({content: 'Es gibt bereits ein aktives Setup-Event!', ephemeral: true});
            return;
        }
        // Check for valid amount of answers
        let questionNumber = interaction.options.getInteger('number');
        if (questionNumber < 1 && questionNumber < 5){
            interaction.reply({content: 'Invalid number of answers!', ephemeral: true});
            return;
        }
        // Check for valid text channel
        let targetChannel = interaction.options.getChannel('channel');
        if (!targetChannel.isText()) {
            interaction.reply({content: 'Not a valid text channel!', ephemeral: true});
            return;
        }
        // Create new poll and add to map
        let user = interaction.member.user;
        let poll = new Poll(interaction.client, user, questionNumber, targetChannel)
        interaction.guild.client.eit.activeSetups.set(user.id, poll);
        await interaction.reply({content: 'Poll creation has been started!', ephemeral: true});
    }
}

class Poll {
    data = {
        question: '',
        answers: new Map(),
        votes: {
            count: 0,
            answerCount: new Map()
        }
    }

    pollMenu;

    constructor(client, user, questionNumber, targetChannel, duration = 30000) {
        this.client = client;
        this.user = user;
        this.questionNumber = questionNumber;
        this.targetChannel = targetChannel;
        this.duration = duration;

        this.init();
    }

    async init () {
        await this.fetchQuestion()
        await this.fetchAnswers()
        await this.verifyPoll()
    }

    async fetchQuestion () {
        await this.user.send('What is the question you want to ask?');
        await this.user.dmChannel.awaitMessages({max: 1})
            .then(collected => {this.data.question = collected.first().content});
    }

    async fetchAnswers () {
        await this.user.send('Now type the corresponding answers!');

        for (let i = 1; i <= this.questionNumber; i++) {
            await this.user.dmChannel.awaitMessages({max: 1})
                .then(async collected => {
                    let answer = collected.first().content;
                    this.data.answers.set(i, answer);
                    this.data.votes.answerCount.set(answer, 0);
                    await this.user.send(`${answer} has been added!`)
                });
        }
    }

    async verifyPoll () {
        let buttonRow = new MessageActionRow()
            .addComponents(binaryButton.yesButton, binaryButton.noButton)

        let embedFields = [];
        let questionCount = 1;
        for(let answer of this.data.answers.values()){
            embedFields.push({name: `${questionCount}. Frage`, value: answer})
            questionCount += 1;
        }

        let pollEmbed = {title: this.data.question, fields: embedFields}

        await this.user.send({content: 'Do you want to finish the poll creation?',components: [buttonRow], embeds: [pollEmbed]})
        let collector = this.user.dmChannel.createMessageComponentCollector({ componentType: 'BUTTON'})

        collector.once('collect', async i => {
            if (i.customId === 'yes') {
                await i.update({ content: 'Your poll will be send to the target channel!', components: [] });
                await this.startPoll()
            }
            if (i.customId === 'no') {
                await i.update({ content: 'Poll creation has been aborted!', components: [] });
                this.removePoll()
            }
        });
    }

    async startPoll () {
        this.constructMenu()

        const collector = this.targetChannel.createMessageComponentCollector({componentType: 'SELECT_MENU', time: this.duration})

        let menuRow = new MessageActionRow()
            .addComponents(this.pollMenu)

        let poll = this.targetChannel.send({components: [menuRow], embeds: [{title: this.data.question}]})

        collector.on('collect', i => {
            i.reply({content: `Danke für deine Antwort!`, ephemeral: true })
        });

        collector.on('end', collected => {
            // collected.first().editReply({content: 'Die Umfrage wurde geschlossen!', components: []})
            poll.then(message => message.delete())
            this.verifyVotes(collected)
            this.sendPollEmbed()
        })
    }

    constructMenu () {
        let menuFields = [];
        for(let answer of this.data.answers.values()){
            menuFields.push({label: answer, value: answer})
        }

        this.pollMenu = new MessageSelectMenu()
            .setPlaceholder('Keine Auswahl getroffen!')
            .setCustomId('poll')
            .addOptions(menuFields)
    }

    async sendPollEmbed () {
        let answerFields = []
        let barNumber = 40;

        answerFields.push({name: 'Anzahl der Teilnehmer', value: `${this.data.votes.count}`})
        for(let answer of this.data.answers.values()){
            let answerCount = this.data.votes.answerCount.get(answer)
            let percent = answerCount/this.data.votes.count
            let voteBar = Math.floor(percent * barNumber)
            let answerBar = '▓'.repeat(voteBar) + '░'.repeat(barNumber - voteBar)
            let voteString = (answerCount === 1) ? 'Stimme' : 'Stimmen'
            answerFields.push({name: answer,
                value: `${(percent*100).toFixed(2)}% - ${answerCount} ${voteString}\n ${answerBar}`})
        }
        let pollEmbed = {title: this.data.question, fields: answerFields};
        await this.targetChannel.send({embeds: [pollEmbed]})
        this.removePoll()
    }

    verifyVotes (collected) {
        let collectedVotes = Array.from(collected.values());
        let countedVote = new Map()

        for(let i = collectedVotes.length - 1; i >= 0; i--){
            if(!countedVote.has(collectedVotes[i].user.id)){
                countedVote.set(collectedVotes[i].user.id, collectedVotes[i]);
            }
        }
        for(let vote of countedVote.values()){
            let answer = vote.values[0];
            let answerCount = this.data.votes.answerCount.get(answer);
            this.data.votes.answerCount.set(answer, answerCount+1)
            this.data.votes.count += 1;
        }
    }

    removePoll () {
        this.client.eit.polls.delete(this.user.id)
    }
}


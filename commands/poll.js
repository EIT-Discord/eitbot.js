const { SlashCommandBuilder } = require('@discordjs/builders');
const {MessageSelectMenu, MessageActionRow} = require("discord.js");

const binaryButton =  require("../buttons/binaryButton");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Replies with Pong!')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('Number of questions: 1-5 ')
                .setRequired(true))
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Select your target channel!')
                .setRequired(true)),

    async execute(interaction) {
        let questionNumber = interaction.options.getInteger('number');
        let targetChannel = interaction.options.getChannel('channel');
        let user = interaction.member.user;

        await interaction.reply({content: 'Poll creation has been started!', ephemeral: true})
        new Poll(user, questionNumber, targetChannel)
    }
}

class Poll {
    memberCache = [];
    questionCounter = new Map;
    pollMenu;
    pollEmbed = {};
    menuFields = [];

    constructor(user, questionNumber, targetChannel, duration = 24) {
        this.user = user;
        this.questionNumber = questionNumber;
        this.targetChannel = targetChannel;
        this.duration = duration;

        this.init();
    }

    async init () {
        await this.fetchQuestion()
        await this.fetchAnswers()
        await this.verifyPoll() && await this.startPoll()
    }

    async fetchQuestion () {
        await this.user.send('What is the question you want to ask?');
        await this.user.dmChannel.awaitMessages({max: 1})
            .then(collected => {this.pollEmbed.title = collected.first().content});
    }

    async fetchAnswers () {
        let embedFields = [];
        await this.user.send('Now type the corresponding answers!');

        for (let i = 1; i <= this.questionNumber; i++) {
            await this.user.dmChannel.awaitMessages({max: 1})
                .then(async collected => {
                    let answer = collected.first().content;
                    this.menuFields.push({label: answer, value: answer});
                    this.questionCounter.set(answer, 0)
                    embedFields.push({name: `${i}. answer`, value: answer});
                    await this.user.send(`${answer} has been added!`)
                });
        }
        this.pollEmbed.fields = embedFields
    }

    async verifyPoll () {
        let buttonRow = new MessageActionRow()
            .addComponents(binaryButton.yesButton, binaryButton.noButton)

        await this.user.send({content: 'Do you want to finish the poll creation?',components: [buttonRow], embeds: [this.pollEmbed]})
        let collector = this.user.dmChannel.createMessageComponentCollector({ componentType: 'BUTTON'})

        return collector.on('collect', async i => {
            if (i.customId === 'yes') {
                await i.update({ content: 'Your poll will be send to the target channel!', components: [] });
                return true
            }
            if (i.customId === 'no') {
                await i.update({ content: 'Poll creation has been aborted!', components: [] });
                return false
            }
        });
    }

    async startPoll () {
        this.constructMenu()

        const collector = this.targetChannel.createMessageComponentCollector({componentType: 'SELECT_MENU'})

        let menuRow = new MessageActionRow()
            .addComponents(this.pollMenu)

        this.targetChannel.send({components: [menuRow], embeds: [this.pollEmbed]})

        collector.on('collect', i => {

            if (this.questionCounter.has(i.values[0]) && (!this.memberCache.includes(i.member.id))) {
                this.memberCache.push(i.member.id)
                this.questionCounter[i.customId] += 1
                i.reply({content: `Danke für deine Antwort!`, ephemeral: true })
            }
            else {
                i.reply({ content: `Du hast deine Antwort schon abgegeben!`, ephemeral: true });
            }
        });

        collector.on('end', collected => {
            console.log(`Collected ${collected.size} items`);
        });
    }

    constructMenu () {
        delete this.pollEmbed.fields
        this.pollMenu = new MessageSelectMenu()
            .setPlaceholder('Keine Auswahl getroffen!')
            .setCustomId('poll')
            .addOptions(this.menuFields)
    }
}


const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new MessageEmbed()
        .setTitle('Some title')
        .setDescription('Description after the edit')
        .addField('Inline field title', 'Some value here', true)
}
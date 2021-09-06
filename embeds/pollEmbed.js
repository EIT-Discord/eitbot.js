const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Umfrageerstellung!')
        .setDescription('Some description here')
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png')
}
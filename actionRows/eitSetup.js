const {MessageActionRow} = require("discord.js");
const roleSelectMenu = require("../menus/roleSelectMenu");



const roleSelect = new MessageActionRow()
    .addComponents(roleSelectMenu.rollenAuswahl)

const studentSelect = new MessageActionRow()
    .addComponents()
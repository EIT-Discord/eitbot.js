const {MessageEmbed} = require("discord.js");


module.exports = {
    start: new MessageEmbed()
        .setTitle("Herzlich Willkommen!")
        .setDescription(`...auf unserem Discord Server! :wave:\n\n` +
                        `Dieses Setup ist dafür da, dass wir und deine Kommilitonen ` +
                        `dich auf dem Server (besser) erkennen und du zu deinem Semester passende ` +
                        `Informationen erhältst.\n\n` +
                        `*Deine Angaben werden von diesem Bot weder gespeichert noch auf irgendeine ` +
                        `Weise verarbeitet, du erhältst ledeglich deinen Namen und dein Semester ` +
                        `auf unserem Server zugewiesen.*\n\n` +
                        `Wenn du Schwierigkeiten bei diesem Setup hast, schreibe eine Nachricht an <@324277577235824643> oder <@270615979388698625>.`),

    studentSelect: new MessageEmbed()
        .setTitle("Studienabschnitt")
        .setDescription(`Es freut uns, dass ein weiterer Student auf diesen Server gefunden hat!\n\n` +
                        `Wähle jetzt den Studienabschnitt aus, in welchem du dich gerade befindest!`),

    semesterSelect: new MessageEmbed()
        .setTitle("Semesterauswahl")
        .setDescription(`Wähle jetzt dein Semester aus!`),

    nameSelect: new MessageEmbed()
        .setTitle("Dein Name")
        .setDescription(`**Antworte jetzt bitte noch mit deinem Vor- und Nachnamen auf diese Nachricht**\n\n` +
                        `_Wenn du deinen vollen Namen nicht angeben willst ` +
                        `darfst du auch nur deinen Vornamen benutzen._`),

    nameSelect: new MessageEmbed()
    .setTitle("Setup abgeschlossen")
    .setDescription(`**Du hast das Setup erfolgreich abgeschlossen, viel Spaß auf unserem Server!**`),
}

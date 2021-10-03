const {MessageEmbed} = require("discord.js");


module.exports = {
    start: new MessageEmbed()
        .setTitle("Herzlich Willkommen!")
        .setDescription(`...auf unserem Elektrotechnik Discord Server! :wave:  \n\n
                        Dieses Setup ist dafür da, damit wir und deine Kommilitonen
                        dich auf dem Server (besser) erkennen und du zu deiner Gruppe passende 
                        Informationen erhältst.\n\n
                        *Deine Angaben werden von diesem Bot weder gespeichert noch auf irgendeine
                        Weise verarbeitet, du erhältst ledeglich deinen Namen und deine Studiengruppe 
                        auf unserem Server zugewiesen.*`),

    studentSelect: new MessageEmbed()
        .setTitle("Studienabschnitt")
        .setDescription(`Es freut uns, dass ein weiter Student auf diesen Server gefunden hat!
                        Wähle jetzt den Studienabschnitt aus, in welchem du dich gerade befindest!`),

    semesterSelect: new MessageEmbed()
        .setTitle("Semester")
        .setDescription(`Wähle jetzt dein Semester aus!`),

    nameSelect: new MessageEmbed()
        .setTitle("Name")
        .setDescription(`**Antworte jetzt bitte noch mit deinem Vor- und Nachnamen auf diese Nachricht**\n
                        _Wenn du deinen vollen Namen nicht angeben willst,
                        darfst du auch nur deinen Vornamen oder einen Spitznamen benutzen._`),
}

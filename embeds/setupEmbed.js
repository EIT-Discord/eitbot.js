const {MessageEmbed} = require("discord.js");


module.exports = {
    start: new MessageEmbed()
        .setTitle("Setup")
        .setDescription(`Willkommen auf unserem Elektrotechnik Discord Server! :wave:  \n\n
                        Dieses Setup ist dafür da, damit wir und deine Kommilitonen
                        dich auf dem Server (besser) erkennen und du zu deiner Gruppe passende 
                        Informationen erhältst.\n\n
                        *Deine Angaben werden von diesem Bot weder gespeichert noch auf irgendeine
                        Weise verarbeitet, du erhältst ledeglich deinen Namen und deine Studiengruppe 
                        auf unserem Server zugewiesen.*\n\n
                        **Unter dieser Nachricht siehst du ein Auswahlfenster, 
                        dort wählst du Auswahlmöglichkeiten aus die auf dich zutrifft!**
                        Abhänging deiner Auswahl werden dir die Bereiche vorgeschlagen, 
                        die für dich am interessantesten sind!`),

    gastSelect: new MessageEmbed()
        .setTitle("Setup")
        .setDescription(``),

    studentSelect: new MessageEmbed()
        .setTitle("Setup")
        .setDescription(`Es freut uns, dass ein weiter Student auf diesen Server gefunden hat!
                        Wähle jetzt den Studienabschnitt aus, der auf dich zutrifft!`),

    nameSelect: new MessageEmbed()
        .setTitle("Setup")
        .setDescription(`Jetzt hast du es fast geschafft! \n
                        **Antworte bitte mit deinem Vor- und Nachnamen auf diese Nachricht** :keyboard:\n
                        _Wenn du deinen vollen Namen hier nicht angeben willst,
                        darfst du auch nur deinen Vornamen oder einen Spitznamen benutzen._`),
}

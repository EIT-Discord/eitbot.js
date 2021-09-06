const configFile = require('./guildConfig.json');
const {Semester, Group} = require("./classes");
const {guildId} = require("../config.json");


const config = JSON.parse(JSON.stringify(configFile));

function parseEitConfig(client, guild, channels)
{
    for (let year in config.semesters)
    {
        let groups = []

        for (let group in config.semesters[year])
        {
            let validRole;
            for (let role of guild.roles.cache.values())
            {
                if (config.semesters[year][group] === role.name)
                {
                    validRole = role;
                    break;
                }
            }
            let newGroup = new Group(config.semesters[year][group], validRole, `${year}. Semester`);
            groups.push(newGroup);
        }
        let validChannel;
        for (let channel of channels)
        {
            if (channel[1].name.includes('termine') && channel[1].name.includes(year))
            {
                validChannel = channel[1];
                break;
            }
        }

        let newSemester = new Semester(year, validChannel, groups);
        client.semesters.set(newSemester.name(), newSemester);
    }
}

function initParseEitConfig(client)
{
    client.guilds.fetch(guildId)
        .then(function(guild)
        {
            guild.channels.fetch()
                .then(function (channels)
                {
                    parseEitConfig(client, guild, channels)
                })
        })
}


module.exports.initParseEitConfig = initParseEitConfig;
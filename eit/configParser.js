const configFile = require('./guildConfig.json');
const {Semester, Group} = require("./classes");
const {guildId} = require("../config.json");


const config = JSON.parse(JSON.stringify(configFile));

function initParseEitConfig(client){
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

function parseEitConfig(client, guild, channels){
    parseSemester(client, guild, channels);
    parseRoles(client, guild);
    parseChannels(client, guild, channels);
}

function parseSemester(client, guild, channels){
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
        client.eit.semesters.set(newSemester.name(), newSemester);
    }
}

function parseRoles(client, guild){
    for (let roleIdx in config.roles)
    {
        for (let role of guild.roles.cache.values())
        {
            if (config.roles[roleIdx] === role.name)
            {
                client.eit.roles.set(config.roles[roleIdx], role)
                break;
            }
        }
    }
}

function parseChannels(client, guild, channels){
    for (let channelIdx in config.channels)
    {
        for (let channel of channels.values())
        {
            if (config.channels[channelIdx] === channel.name)
            {
                client.eit.channels.set(config.channels[channelIdx], channel)
                break;
            }
        }
    }
}


module.exports.initParseEitConfig = initParseEitConfig;
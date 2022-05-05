const configFile = require('./guildConfig.json');
const {guildId} = require("../../config.json");


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
    parseRoles(client, guild);
    parseChannels(client, guild, channels);
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
            else if (config.mod === role.name){
                client.eit.mod = role
            }
            else if (config.student === role.name){
                client.eit.student = role
            }
        }
    }
}

function parseChannels(client, guild, channels){
    for (let channel of channels.values())
    {
        if (config.logChannel === channel.name)
        {
            client.eit.logChannel = channel;
            break;
        }
    }
}


module.exports.initParseEitConfig = initParseEitConfig;
const configFile = require('./guildConfig.json');
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
const {success} = require("../settings.json")

module.exports.run = async (bot, msg, args, commands) => {
    return msg.channel.send({embed: {
        "title": "Source",
        "description": "Click [here](https://github.com/RealPortalPlayer/Bacon-Bot) for my source code! (will be kinda out of date sometimes)",
        "color": success
    }})
}

module.exports.help = {
    name: "source",
    description: "Gives the source code.",
    arguments: "",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: false,
    argumentsRequired: false
}
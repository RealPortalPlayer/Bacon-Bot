const {success} = require("../settings.json")

module.exports.run = async (bot, msg, args, commands) => {
    return msg.channel.send({embed: {
        "title": "Test",
        "description": "Test complete!",
        "color": success
    }})
}

module.exports.help = {
    name: "test",
    description: "Just a test command.",
    arguments: "",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: false,
    argumentsRequired: false
}
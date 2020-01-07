const {success} = require("../settings.json")

module.exports.run = async (bot, msg, args, commands) => {
    msg.delete()
    msg.channel.send(args.join(" "))
}

module.exports.help = {
    name: "say",
    description: "Says the message.",
    arguments: "<message>",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: false,
    argumentsRequired: true
}
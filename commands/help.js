const {success, failure} = require("../settings.json")
const fs = require("fs")

module.exports.run = async (bot, msg, args, commands) => {
    if (!commands.get(args.toString())) {
        return msg.channel.send({embed: {
            "title": "Help",
            "description": "Command doesn't exist.",
            "color": failure
        }})
    }
    let permission = "None"
    if (commands.get(args.toString()).help.supportOnly) permission = "Support Only"
    if (commands.get(args.toString()).help.staffOnly) permission = "Staff Only"
    if (commands.get(args.toString()).help.supportManagersOnly) permission = "Support Managers Only"
    if (commands.get(args.toString()).help.ownerOnly) permission = "Owner Only"
    return msg.channel.send({embed: {
        "title": "Help",
        "description": `Heres the info for ${args.toString()}.`,
        "fields": [
            {
                "name": "Description",
                "value": commands.get(args.toString()).help.description
            },
            {
                "name": "Permission Level",
                "value": permission
            }
        ],
        "color": success
    }})
}

module.exports.help = {
    name: "help",
    description: "Tells you all the info about commands.",
    arguments: "<command>",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: false,
    argumentsRequired: true
}
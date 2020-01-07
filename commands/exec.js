let {exec} = require('child_process');
let {success, failure} = require("../settings.json")

module.exports.run = async (bot, msg, args, commands) => {
    let command = args.join(" ")
    if (command.includes("sudo")) return msg.channel.send("sudo has been disabled for security reasons.")
    exec(command, (err,stdout,stderr) => {
        if (err) {
            if (err.length >= 2000) {
                for (let i = 0; i < err.length; i += 2000) {
                    let tosend = evaled.substring(i, Math.min(err.length, i + 2000))
                    msg.channel.send(tosend)
                }
                return
            }
            return msg.channel.send(err.message)
        }
        if (stdout) {
            if (stdout.length >= 2000) {
                for (let i = 0; i < stdout.length; i += 2000) {
                    let tosend = stdout.substring(i, Math.min(stdout.length, i + 2000))
                    msg.channel.send(tosend)
                }
                return
            }
            return msg.channel.send(stdout)
        }
        return msg.channel.send("Either no data was sent back or data was lost while being sent back (which shouldn't happen)")
    });
}

module.exports.help = {
    name: "exec",
    description: "Executes an command on the host computer.",
    arguments: "<command>",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: true,
    argumentsRequired: true
}
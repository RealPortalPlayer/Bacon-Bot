module.exports.run = async (bot, msg, args, commands) => {
    var clean = code => {
        return code.replace(bot.token, "[insert token here]")
    }
    let code = args.join(" ")
    try {
        let evaled = eval(code)

        if(typeof evaled !== 'string') evaled = require('util').inspect(evaled)

        if (evaled.length >= 2000) {
            for (let i = 0; i < evaled.length; i += 2000) {
                let tosend = evaled.substring(i, Math.min(evaled.length, i + 2000))
                msg.channel.send(clean(tosend))
            }
            return
        }
        return msg.channel.send(clean(evaled))
    } catch (err) {
        if (err.length >= 2000) {
            for (let i = 0; i < err.length; i += 2000) {
                let tosend = evaled.substring(i, Math.min(err.length, i + 2000))
                msg.channel.send(clean(tosend))
            }
            return
        }
        msg.channel.send(clean(err))
    }
}

module.exports.help = {
    name: "eval",
    description: "Executes JS Code.",
    arguments: "",
    supportOnly: false,
    staffOnly: false,
    supportManagersOnly: false,
    ownerOnly: true,
    argumentsRequired: true
}
const Discord = require("discord.js")
const bot = new Discord.Client()
const {token, prefix, ownerids, failure} = require("./settings.json")
const fs = require("fs")
bot.commands = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
    if (err) console.error(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Can't find any commands.")
        return
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`Loaded ${f}!`)
        bot.commands.set(props.help.name, props)
    })
})
bot.on("ready", () => {
    console.log(`I am in ${bot.guilds.size} guild(s).`)
})
bot.on("message", async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix) || msg.channel.type != "text" || msg.member.roles.find(r => r.name == "Muted")) return
    console.log(`User ${msg.author.username} (${msg.author.id}) said ${msg.content}`)
    if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length))) {
        if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).help.supportOnly) {
            if (!msg.member.roles.find(r => r.name == "Support")) return msg.channel.send({embed: {
                "title": msg.content.split(" ")[0].slice(prefix.length).charAt(0).toUpperCase() + msg.content.split(" ")[0].slice(prefix.length).substring(1),
                "description": "You don't have enough permissions to run this command.",
                "color": failure
            }})
        }
        if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).help.staffOnly) {
            if (!msg.member.roles.find(r => r.name == "Staff")) return msg.channel.send({embed: {
                "title": msg.content.split(" ")[0].slice(prefix.length).charAt(0).toUpperCase() + msg.content.split(" ")[0].slice(prefix.length).substring(1),
                "description": "You don't have enough permissions to run this command.",
                "color": failure
            }})
        }
        if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).help.supportManagersOnly) {
            if (!msg.member.roles.find(r => r.name == "Support Managers")) return msg.channel.send({embed: {
                "title": msg.content.split(" ")[0].slice(prefix.length).charAt(0).toUpperCase() + msg.content.split(" ")[0].slice(prefix.length).substring(1),
                "description": "You don't have enough permissions to run this command.",
                "color": failure
            }})
        }

        if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).help.ownerOnly) {
            let found = false
            for (let i = 0; i < ownerids.length; i++) {
                if (ownerids[i] == msg.author.id) {
                    found = true
                }
            }
            if (!found) return msg.channel.send({embed: {
                "title": msg.content.split(" ")[0].slice(prefix.length).charAt(0).toUpperCase() + msg.content.split(" ")[0].slice(prefix.length).substring(1),
                "description": "You don't have enough permissions to run this command.",
                "color": failure
            }})
        }
        if (bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).help.argumentsRequired) {
            if (!msg.content.split(" ").slice(1)[0]) return msg.channel.send({embed: {
                "title": msg.content.split(" ")[0].slice(prefix.length).charAt(0).toUpperCase() + msg.content.split(" ")[0].slice(prefix.length).substring(1),
                "description": "You're missing some arguments.",
                "color": failure
            }})
        }
        bot.commands.get(msg.content.split(" ")[0].slice(prefix.length)).run(bot, msg, msg.content.split(" ").slice(1), bot.commands)
    }
})
bot.on("rateLimit", () => {
    console.log(`We're being rate limited!`)
})
bot.login(token)
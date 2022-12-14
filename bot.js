const dotenv = require('dotenv')
const { DisTube } = require("distube")
const Discord = require("discord.js")

dotenv.config()
const token = process.env.TOKEN

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
})
const fs = require("fs")
const config = {...require("./config.json"), token}
const { SpotifyPlugin } = require("@distube/spotify")
const { SoundCloudPlugin } = require("@distube/soundcloud")

client.config = config
client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin()]
})
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!")
    const jsFiles = files.filter(f => f.split(".").pop() === "js")
    if (jsFiles.length <= 0) return console.log("Could not find any commands!")
    jsFiles.forEach(file => {
        const cmd = require(`./commands/${file}`)
        console.log(`Loaded ${file}`)
        client.commands.set(cmd.name, cmd)
        if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on("ready", () => {
    console.log(`${client.user.tag} is ready to play music.`)
})

client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild) return
    const prefix = config.prefix
    if (!message.content.startsWith(prefix)) return
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send(`${client.emotes.error} | Entra em um canal de voz aí né queridão...`)
    }
    try {
        cmd.run(client, message, args)
    } catch (e) {
        console.error(e)
        message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
    }
})

const status = queue =>
    `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${
        queue.repeatMode ? (queue.repeatMode === 2 ? "All Queue" : "This Song") : "Off"
    }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.play} | Tocando \`${song.name}\` - \`${song.formattedDuration}\`\nadicionado por: ${
                song.user
            }\n${status(queue)}`
        )
    )
    .on("addSong", (queue, song) =>
        queue.textChannel.send(
            `${client.emotes.success} | ${song.name} - \`${song.formattedDuration}\` Adicionado à lista por: ${song.user}`
        )
    )
    .on("addList", (queue, playlist) =>
        queue.textChannel.send(
            `${client.emotes.success} | Adicionado \`${playlist.name}\` na playlist (${
                playlist.songs.length
            } músicas) na lista\n${status(queue)}`
        )
    )
    .on("searchNoResult", (message, query) => message.channel.send("Nenhum resultado para: " + query))
    .on("error", (channel, e) => {
        channel.send(`${client.emotes.error} | Um erro inesperado ocorreu: ${e.toString().slice(0, 1974)}`)
        console.error(e)
    })
    .on("empty", channel => channel.send("O canal de voz está vazio. To vazando!"))
    .on("searchNoResult", message => message.channel.send(`${client.emotes.error} | Nenhum resultado encontrado`))
    .on("finish", queue => queue.textChannel.send("Finalizado!"))
// // DisTubeOptions.searchSongs = true
// .on("searchResult", (message, result) => {
//     let i = 0
//     message.channel.send(
//         `**Choose an option from below**\n${result
//             .map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
//             .join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`
//     )
// })
// .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
// .on("searchInvalidAnswer", message =>
//     message.channel.send(
//         `${client.emotes.error} | Invalid answer! You have to enter the number in the range of the results`
//     )
// )
// .on("searchDone", () => {})

client.login(config.token)

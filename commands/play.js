module.exports = {
    name: "play",
    aliases: ["p"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const string = args.join(" ")
        if (!string) return message.channel.send(`${client.emotes.error} | Se não colocar a música fica difícil, meu bom...`)
        message.channel.send(`Buscando sua música...`)
        client.distube.play(message, string)
    }
}

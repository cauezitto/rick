module.exports = {
    name: "volume",
    aliases: ["v"],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando ainda, zé!`)
        const volume = parseInt(args[0])
        if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Coloque um número de 0 a 100`)
        queue.setVolume(volume)
        message.channel.send(`${client.emotes.success} | Volume em \`${volume}\``)
    }
}

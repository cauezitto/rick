module.exports = {
    name: "skip",
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando ainda, zé!`)
        try {
            const song = await queue.skip()
            message.channel.send(`${client.emotes.success} | Música skippada! Tocando:\n${song.name}`)
        } catch (e) {
            message.channel.send(`${client.emotes.error} | ${e}`)
        }
    }
}

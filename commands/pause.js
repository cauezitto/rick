module.exports = {
    name: "pause",
    aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando ainda, zé!`)
        if (queue.playing === false) {
            // queue.resume()
            return message.channel.send("A música já ta pausada!")
        }
        queue.pause()
        // .catch(err => console.log(err))
        message.channel.send("Pausado :)")
    }
}

module.exports = {
    name: "resume",
    aliases: ["resume", "unpause"],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando ainda, zé!`)
        queue.resume()
        // .catch(err => console.log(err))
        message.channel.send("Música tocando :)")
    }
}

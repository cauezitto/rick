module.exports = {
    name: "status",
    // aliases: ["pause", "hold"],
    inVoiceChannel: true,
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | Não tem nada tocando ainda, zé!`)
        if (queue.playing === true) {
            // queue.resume()
            return message.channel.send("ta tocando")
        }
        // queue.pause()
        // // .catch(err => console.log(err))
        // message.channel.send("Pausado :)")

        console.log(queue)
    }
}

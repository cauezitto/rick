module.exports = {
    name: "playlist",
    aliases: ["q"],
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
        const q = queue.songs
            .map((song, i) => `${i === 0 ? " Tocando:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
            .join("\n")
        message.channel.send(`${client.emotes.queue} | **Playlist do server**\n${q}`)
    }
}

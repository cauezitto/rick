module.exports = {
    name: "manda_a_braba",
    inVoiceChannel: true,
    run: async (client, message, args) => {
        message.channel.send(`Eu ouvi playlist dos chegados?`)
        const playlist = "https://www.youtube.com/playlist?list=PLhkVFznLtzIPdjo7wgvUGDifzQ-oSgKlD"
        client.distube.play(message, playlist)
        .then(()=>{
            const queue = client.distube.getQueue(message)
            queue.shuffle()
            message.channel.send(`${client.emotes.queue} | Tá randomizado, meu querido`)
        })
    }
}

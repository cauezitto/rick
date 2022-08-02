function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
 
module.exports = {
    name: "shuffle",
    run: async (client, message) => {
        const queue = client.distube.getQueue(message)
        if (!queue) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)

        queue.shuffle()
        message.channel.send(`${client.emotes.queue} | Tá randomizado, meu querido`)
        // const q = queue.songs
        //     .map((song, i) => `${i === 0 ? " Tocando:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        //     .join("\n")
        // message.channel.send(`${client.emotes.queue} | **Playlist do server**\n${q}`)
    }
}

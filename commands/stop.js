exports.run = function(client, message, args) {
  const playlist = client.playlist;
  if (message.guild.voiceConnection) {
    playlist.queue.forEach(song => {
      playlist.queue.splice(i, 1);
    });
    playlist.dispatcher.end();
  }
}

exports.help = {
  name: 'stop',
  description: 'Disconnects the bot from the voice channel and clears the queue.',
  usage: 'stop'
};
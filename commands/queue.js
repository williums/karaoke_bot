exports.run = function(client, message, args) {
  const playlist = client.playlist;
  playlist.queue.forEach(song => {
    message.channel.send(`Song link: ${song.toString()}`);    
  });
}

exports.help = {
  name: 'queue',
  description: 'Displays the currently queued songs.',
  usage: 'queue'
};
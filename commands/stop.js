exports.run = function(client, message) {
  const playlist = client.playlist;
  if (playlist.dispatcher) {
    playlist.stopped = true;
    playlist.playing = false;
    playlist.dispatcher.end();
    message.reply('Playlist stopped.', {code:'asciidoc'});
  }
};

exports.help = {
  name: 'stop',
  description: 'Stops the playlist until the resume command is used.',
  usage: 'stop'
};

// playlist.queue.forEach(song => {
//   playlist.queue.splice(i, 1);
// });
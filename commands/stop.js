exports.run = function(client, message, args) {
  const playlist = client.playlist;
  if (message.guild.voiceConnection) {
    playlist.stopped = true;
    playlist.dispatcher.end();
    message.reply(`Playlist stopped.`, {code:'asciidoc'});
  }
}

exports.help = {
  name: 'stop',
  description: 'Stops the playlist until the resume command is used.',
  usage: 'stop'
};

    // playlist.queue.forEach(song => {
    //   playlist.queue.splice(i, 1);
    // });
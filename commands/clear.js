exports.run = function(client, message) {
  const playlist = client.playlist;
  playlist.queue = [];
  message.reply('Queue has been cleared.', {code:'asciidoc'});
};

exports.help = {
  name: 'clear',
  description: 'Clears the playlist queue.',
  usage: 'clear'
};

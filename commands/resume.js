const player = require('../utils/player');

exports.run = function(client, message) {
  const playlist = client.playlist;
  if (!playlist.queue.length) return message.reply('No songs in queue', {code:'asciidoc'});
  
  playlist.stopped = false;
  player(client, message);
  message.reply('Playlist resumed.', {code:'asciidoc'});
};

exports.help = {
  name: 'resume',
  description: 'Resumes the playlist.',
  usage: 'resume'
};
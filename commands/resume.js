const play = require('../utils/play');

exports.run = function(client, message, args) {
  const playlist = client.playlist;
  if (!playlist.queue.length) return message.reply('No songs in queue', {code:'asciidoc'});
  
  playlist.stopped = false;
  play(client, message);
  message.reply(`Playlist resumed.`, {code:'asciidoc'});
}

exports.help = {
  name: 'resume',
  description: 'Resumes the playlist.',
  usage: 'resume'
};
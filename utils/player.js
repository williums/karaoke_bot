const YTDL = require('ytdl-core');
const settings = require('../settings.json');

let playlist;

const shiftPlaylist = () => {
  playlist.current = playlist.queue[0].title;
  playlist.playing = true;
  playlist.queue.shift();
};

const play = (client, message) => {
  if (playlist.stopped) return message.reply(`Playlist is currently stopped. Resume with ${settings.PREFIX}resume.`, {code:'asciidoc'});
  
  const stream = YTDL(playlist.queue[0].link, {filter: 'audioonly'});
  playlist.dispatcher = client.voiceConnection.playStream(stream);
  shiftPlaylist();

  playlist.dispatcher.on('end', () => {
    if (playlist.stopped) return;
    if (playlist.queue.length) setTimeout( () => play(client, message), 500); // prevent dispatcher race condition
    else {
      if (!playlist.queue.length) return message.reply('No songs in queue', {code:'asciidoc'});
      playlist.current = '';
      playlist.playing = false;
    }
  });
};

module.exports = function(client, message) {
  playlist = client.playlist;
  play(client, message);
};
const YTDL = require('ytdl-core');
const settings = require('../settings.json')

function play(client, message) {
  const playlist = client.playlist;

  if (playlist.stopped) return message.reply(`Playlist is currently stopped. Resume with ${settings.prefix}resume.`, {code:'asciidoc'});
  
  const stream = YTDL(playlist.queue[0].link, {filter: 'audioonly'});
  playlist.dispatcher = client.voiceConnection.playStream(stream);
  playlist.current = playlist.queue[0].title;
  playlist.playing = true;
  // message.channel.send(`Now playing: ${playlist.queue[0]}`, {code:'asciidoc'});
  playlist.queue.shift();

  playlist.dispatcher.on('end', () => {
    if (playlist.stopped) return;
    if (playlist.queue.length) {
      // wait half a second to prevent dispatcher race condition
      setTimeout( () => { play(client, message) }, 500);
    } else {
      if (!playlist.queue.length) return message.reply('No songs in queue', {code:'asciidoc'});
      playlist.current = '';
      playlist.playing = false;
    }
  });
}

module.exports = play;
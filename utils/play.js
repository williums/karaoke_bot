const YTDL = require('ytdl-core');

function play(client, message) {
  const playlist = message.client.playlist;
  const stream = YTDL(playlist.queue[0].link, {filter: 'audioonly'});
  playlist.dispatcher = client.voiceConnection.playStream(stream);
  playlist.nowPlaying = playlist.queue[0].title;
  // message.channel.send(`Now playing: ${playlist.queue[0]}`, {code:'asciidoc'});
  playlist.queue.shift();

  playlist.dispatcher.on('end', () => {
    if (playlist.queue.length) {
      // wait half a second to prevent dispatcher race condition
      setTimeout( () => { play(client.voiceConnection, message) }, 500);
    }
  });
}

module.exports = play;
const YTDL = require('ytdl-core');

function play(connection, message) {
  const playlist = message.client.playlist;
  const stream = YTDL(playlist.queue[0], {filter: 'audioonly'});
  playlist.dispatcher = connection.playStream(stream);

  message.channel.send(`Now playing: ${playlist.queue[0].toString()}`, {code:'asciidoc'});

  playlist.queue.shift();

  playlist.dispatcher.on('end', () => {
    if (playlist.queue.length) {
      // wait half a second to prevent dispatcher race condition
      setTimeout( () => { play(connection, message) }, 500);
    }
    // } else {
    //   message.channel.send('No songs in queue, disconnecting.', {code:'asciidoc'});
    //   playlist.stopped = true;  
    //   connection.disconnect();
    // }
  });
}

module.exports = play;
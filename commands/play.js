const YTDL = require('ytdl-core');

function play(connection, message) {
  const playlist = message.client.playlist;

  playlist.dispatcher = connection.playStream(YTDL(playlist.queue[0], {filter: 'audioonly'}));
  playlist.queue.shift();

  playlist.dispatcher.on('end', () => {
    if (playlist.queue[0]) {
      play(connection, message);
    } else {
      connection.disconnect();
    }
  });
}

exports.run = function(client, message, args) {
  const playlist = client.playlist;
  
  if (!args[0]) return message.channel.send('Please supply a song link');
  if (!message.member.voiceChannel)  return message.channel.send('You must be in a voice channel to use this command');

  playlist.queue.push(args[0]);

  if (!message.guild.voiceConnection) {
    message.member.voiceChannel.join().then(connection => {
      play(connection, message);
    });
  }
}

exports.help = {
  name: 'play',
  description: 'Adds the song to the playlist.',
  usage: 'play [youtube link]'
};
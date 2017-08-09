const play = require('../utils/play');

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
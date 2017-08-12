const play = require('../utils/play');
const ytdl = require('ytdl-core');

exports.run = function(client, message, args) {
  const playlist = client.playlist;

  if (!args[0]) return message.channel.send('Please supply a song link');
  if (!message.member.voiceChannel)  return message.channel.send('You must be in a voice channel to use this command');

  ytdl.getInfo(args[0], (error, info) => {
    if(error) {
      message.channel.send('The requested video does not exist or cannot be played.', {code:'asciidoc'});
      console.log(`Error: ${error}`);
    } else {
      playlist.queue.push({link: args[0], title: info['title']});
      message.channel.send(`${info['title']} has been added to the queue.`, {code:'asciidoc'});
    }
    if(!playlist.stopped && playlist.queue.length) {
      play(client, message);
    }
  });
}


exports.help = {
  name: 'request',
  description: 'Adds the song to the playlist.',
  usage: 'request [youtube link]'
};
const play = require('../utils/play');
const ytdl = require('ytdl-core');

exports.run = function(client, message, args) {
  const playlist = client.playlist;

  if (!args[0]) return message.reply('Please supply a song link', {code:'asciidoc'});

  ytdl.getInfo(args[0], (error, info) => {
    if(error) {
      console.log(`Error: ${error}`);
      return message.reply('The requested video does not exist or cannot be played.', {code:'asciidoc'});
    } 
    playlist.queue.push({link: args[0], title: info['title']});
    message.reply(`"${info['title']}" has been added to the queue.`, {code:'asciidoc'});

    if(!playlist.stopped && playlist.queue.length && !playlist.playing) {
      play(client, message);
    }
  });
}


exports.help = {
  name: 'request',
  description: 'Adds the song to the playlist.',
  usage: 'request [youtube link]'
};
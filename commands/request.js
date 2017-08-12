const player = require('../utils/player');
const ytdl = require('ytdl-core');

exports.run = function(client, message, args) {
  const playlist = client.playlist;

  if (!args[0]) return message.reply('Please supply a song link', {code:'asciidoc'});

  ytdl.getInfo(args[0], (error, info) => {
    if(error) {
      console.warn(`Error: ${error}`);
      return message.reply('The requested video does not exist or cannot be played.', {code:'asciidoc'});
    } 
    playlist.queue.push({link: args[0], title: info['title']});
    message.reply(`"${info['title']}" has been added to the queue.`, {code:'asciidoc'});

    let playable = !playlist.stopped && playlist.queue.length && !playlist.playing;
    if (playable) {
      player(client, message);
    }
  });
};

exports.help = {
  name: 'request',
  description: 'Adds the song to the playlist.',
  usage: 'request [youtube link]'
};
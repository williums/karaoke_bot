const Discord = require('discord.js')

exports.run = function(client, message, args) {
  const playlist = client.playlist;
  if (!playlist.queue.length) {
    return message.reply('No songs in queue', {code:'asciidoc'});
  }
  let description = '';
  playlist.queue.forEach(song => {
    description += song.title + '\n'
  });
  const embed = new Discord.RichEmbed()
    .setColor(0x588F27)
    .setDescription(description)
    .setTitle('Queue')
  return message.channel.send({embed});
}

exports.help = {
  name: 'queue',
  description: 'Displays the currently queued songs.',
  usage: 'queue'
};
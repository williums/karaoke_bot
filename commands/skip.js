exports.run = function(client, message, args) {
  const playlist = client.playlist;
  if (playlist.dispatcher) {
    playlist.dispatcher.end();
    message.channel.send('Skipping to next song in queue', {code:'asciidoc'});    
  }
}

exports.help = {
  name: 'skip',
  description: 'Skips to the next song in the queue.',
  usage: 'skip'
};
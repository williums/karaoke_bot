exports.run = function(client, message) {
  const playlist = client.playlist;
  if (playlist.dispatcher) {
    playlist.dispatcher.end();
    message.reply('Skipping to next song in queue.', {code:'asciidoc'});    
  }
};

exports.help = {
  name: 'skip',
  description: 'Skips to the next song in the queue.',
  usage: 'skip'
};
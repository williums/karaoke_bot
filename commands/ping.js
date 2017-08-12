exports.run = function(client, message) {
  message.channel.send(`Pong! \`${Date.now() - message.createdTimestamp}ms\``);
};

exports.help = {
  name: 'ping',
  description: 'Ping/Pong commmand.',
  usage: 'ping'
};
const settings = require('../settings.json');
module.exports = message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(settings.PREFIX)) return;

  const command = message.content.split(' ')[0].slice(settings.PREFIX.length);
  const params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
    cmd.run(client, message, params);
  } else {
    message.channel.send(`Command ${settings.PREFIX}${command} not found.`, {code:'asciidoc'});
  }
};
const settings = require('../settings.json');

exports.run = (client, message, args) => {
  if (!args[0]) { // all commands
    // find longest command length for neater formatting
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    message.channel.send(`= Command List =\n\n[Use ${settings.PREFIX}help <commandname> for details]\n\n${client.commands.map(c => `${settings.PREFIX}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {code:'asciidoc'});
  } else {  // specific command 
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.channel.send(`= ${command.help.name} =\n${command.help.description}\nUsage: ${command.help.usage}`, {code:'asciidoc'});
    }
  }
};

exports.help = {
  name: 'help',
  description: 'Displays all the available commands.',
  usage: 'help [command]'
};
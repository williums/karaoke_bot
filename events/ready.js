const chalk = require('chalk');
const settings = require('../settings.json')

module.exports = client => {
  const server = client.guilds.find("name", settings.server);
  if(server === null) throw "Couldn't find server '" + settings.server + "'";
  console.log(chalk.bgGreen(`Connected to server '${settings.server}'`));

  const textChannel = server.channels.find(chn => chn.name === settings.textChannel && chn.type === "text"); //The text channel the bot will use to announce stuff
  if(textChannel === null) throw `Couldn't find text channel ${settings.textChannel} in server ${settings.server}`;
  console.log(chalk.bgGreen(`Found text channel '${settings.textChannel}'`));

  const voiceChannel = server.channels.find(chn => chn.name === settings.voiceChannel && chn.type === "voice"); //The voice channel the bot will connect to
  if(voiceChannel === null) throw `Couldn't find voice channel ${settings.voiceChannel} in server ${settings.server}`;
  voiceChannel.join().then(connection => {
    voiceConnection = connection;
    console.log(chalk.bgGreen(`Joined voice channel '${settings.voiceChannel}'`));
  }).catch(console.error);
}
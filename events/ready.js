const chalk = require('chalk');
const settings = require('../settings.json');

let server, textChannel, voiceChannel;

const findTextChannel = chn => {
  return chn.name === settings.TEXTCHANNEL && chn.type === 'text';
};

const findVoiceChannel = chn => {
  return chn.name === settings.VOICECHANNEL && chn.type === 'voice';
};

module.exports = client => {
  server = client.guilds.find('name', settings.SERVER);
  if(server === null) throw `Couldn't find server '${settings.SERVER}'`;
  console.log(chalk.bgGreen(`Connected to server '${settings.SERVER}'`));

  textChannel = server.channels.find(findTextChannel); 
  if(textChannel === null) throw `Couldn't find text channel ${settings.TEXTCHANNEL} in server ${settings.SERVER}`;
  console.log(chalk.bgGreen(`Found text channel '${settings.TEXTCHANNEL}'`));

  voiceChannel = server.channels.find(findVoiceChannel); 
  if(voiceChannel === null) throw `Couldn't find voice channel ${settings.VOICECHANNEL} in server ${settings.SERVER}`;
  voiceChannel.join()
    .then(connection => {
      client.voiceConnection = connection;
      console.log(chalk.bgGreen(`Joined voice channel '${settings.VOICECHANNEL}'`));
    })
    .catch(console.error);
};
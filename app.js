const Discord = require('discord.js');
const client = new Discord.Client();
const settings = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./utils/eventLoader')(client);

function log(message) {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
}

// Load commands 
client.commands = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}. 👌`); 
    client.commands.set(props.help.name, props);
  });
});

client.voiceConnection = null;
client.playlist = {
  queue: [],
  nowPlaying: '',
  stopped: false,
};

// Debug Events
const regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, '[redacted]')));
});

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, '[redacted]')));
});

// client.on('debug', e => {
//   console.log(chalk.bgBlue(e.replace(regToken, '[redacted]')));
// });

client.login(settings.DISCORD);

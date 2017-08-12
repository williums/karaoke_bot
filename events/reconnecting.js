const chalk = require('chalk');

module.exports = () => {
  console.log(chalk.bgGreen(`Reconnecting at ${new Date()}`));
};
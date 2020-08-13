const chalk = require('chalk');

exports.magenta = text => console.log(chalk.magenta(text));

exports.green = text => console.log(chalk.green(text));

exports.red = text => console.error(chalk.red(text));

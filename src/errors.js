const { red } = require('./chalks');

exports.handleError = err => {
  const { message } = err;

  if (message.includes('unknown revision')) {
    red('Error: Invalid Commit ID');
  } else {
    red(err);
  }
};

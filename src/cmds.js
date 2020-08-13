const cmd = require('node-cmd-promise');
const { execDirPath } = require('./paths');
const { ENV } = require('./config');

const goToExecDirPath = ENV === 'production' ? `cd ${execDirPath} && ` : '';

exports.getCommitFilePaths = async (start, end) => {
  const { stdout } = await cmd(
    `${goToExecDirPath}git diff-tree --no-commit-id --name-only -r ${start}~ ${end}`
  );

  return stdout;
};

exports.getFirstCommitMessage = async id => {
  const { stdout } = await cmd(
    `${goToExecDirPath}git log -n 1 --pretty=format:%s ${id}`
  );

  return stdout;
};

exports.getCommitMessages = async (start, end) => {
  const { stdout } = await cmd(
    `${goToExecDirPath}git log ${start}..${end} --oneline`
  );

  return stdout;
};

const path = require('path');

const execDirPath = path.dirname(process.execPath);

const rootUploadDirectory = path.join(execDirPath, '../modified-files');

const warWebInfDirectory = path.join(rootUploadDirectory, 'WEB-INF');

const manifestFileDirectory = `${path.join(rootUploadDirectory, 'META-INF')}`;

exports.execDirPath = execDirPath;

exports.rootUploadDirectory = rootUploadDirectory;

exports.warWebInfFileDirectory = file =>
  path.dirname(path.join(warWebInfDirectory, file));

exports.getWarWebInfFilePath = file =>
  `${path.join(rootUploadDirectory, 'WEB-INF', file)}`;

exports.changeCommitFileToTargetPath = commitFilePaths =>
  commitFilePaths
    .replace(/\.java/g, '.class')
    .replace(/src/g, 'target/classes')
    .split('\n')
    .filter(Boolean)
    .filter(file => !(file.includes('/upload/') || file.includes('/config/')));

exports.getWarClassFilePath = file =>
  file.replace(/target\/classes/g, 'classes');

exports.getWarWebContentFilePath = file =>
  file.replace(/WebContent\/WEB-INF/g, '');

exports.getCombinedTargetPathAndWarPath = (targetPaths, warPaths) =>
  [...Array(targetPaths.length)].reduce(
    (acc, _, index) => acc.concat([[targetPaths[index], warPaths[index]]]),
    []
  );

exports.copyFilePath = file => `${path.join(warWebInfDirectory, file)}`;

exports.manifestFileDirectory = manifestFileDirectory;

exports.manifestFilePath = `${path.join(manifestFileDirectory, 'MANIFEST.MF')}`;

exports.jiraIdsTextFilePath = `${path.join(rootUploadDirectory, 'jira.json')}`;

exports.wikiURLPath = `${(path.join(execDirPath), 'wiki.json')}`;

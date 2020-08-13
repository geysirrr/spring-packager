const os = require('os');
const dateFormat = require('dateformat');
const { manifestFileDirectory, manifestFilePath } = require('./paths');
const { canAcessFile, read, write, mkdir } = require('./utils');
const { PROJECT_NAME } = require('./config');

const USER_ID = 'cubuild';

const DEFAULT_CONTENTS = [
  'Manifest-Version: 1.0',
  'TimeStamp:',
  `Implementation-Title: ${PROJECT_NAME}`,
  'Implementation-Version: 0.0.67-SNAPSHOT',
  `${PROJECT_NAME}-Version: `,
  `Implementation-Vendor-Id: ${PROJECT_NAME}`,
  `Built-By: ${USER_ID}`,
  'Build-Jdk: 1.8',
  'Created-By: Apache Maven 3.3.9',
  `Implementation-Vendor-ArtifactId: ${PROJECT_NAME}`,
  'Archiver-Version: Plexus Archiver',
];

const getNewManifestMdContent = (content, patchVersion) => {
  const newLines = content.split(os.EOL).map(each => {
    if (each.includes('TimeStamp')) {
      return `TimeStamp: ${getTimeStamp()}`;
    } else if (each.includes(`${PROJECT_NAME}-Version`)) {
      return `${PROJECT_NAME}-Version: ${patchVersion}`;
    }
    return each;
  });

  return newLines.join(os.EOL);
};

const getTimeStamp = () => dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');

exports.makeManifest = async patchVersion => {
  const existManifest = await canAcessFile(manifestFilePath);

  let content;

  if (existManifest) {
    content = await read(manifestFilePath, 'utf-8');
  } else {
    await mkdir(manifestFileDirectory, { recursive: true });
    content = DEFAULT_CONTENTS.join(os.EOL);
  }

  const newContent = getNewManifestMdContent(content, patchVersion);

  await write(manifestFilePath, newContent, 'utf-8');
};

const fs = require('fs');
const os = require('os');
const archiver = require('archiver');
const { rootUploadDirectory } = require('./paths');
const { PROJECT_NAME } = require('./config');

exports.makeZip = patchVersion => {
  return new Promise((resolve, reject) => {
    const archive = archiver('zip', { zlib: { level: 9 } });

    const output = fs.createWriteStream(
      `${rootUploadDirectory}/${PROJECT_NAME}_${patchVersion}.zip`
    );

    output.on('close', () => {
      console.log(
        `${archive.pointer()} total bytes${
          os.EOL
        }archiver has been finalized and the output file descriptor has closed.`
      );
      resolve(true);
    });

    archive.on('error', e => {
      console.error(e);
      reject(e);
    });

    archive.on('warning', e => {
      console.error(e);
      reject(e);
    });

    archive.pipe(output);
    archive.directory(`${rootUploadDirectory}/WEB-INF`, 'WEB-INF');
    archive.directory(`${rootUploadDirectory}/META-INF`, 'META-INF');
    archive.finalize();
  });
};

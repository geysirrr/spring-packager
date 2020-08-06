const open = require('open');
const { rootUploadDirectory } = require('./paths');
const openExplorer = require('open-file-explorer');
const { getWikiURL } = require('./wiki');

const openChrome = async () => {
  const { url } = await getWikiURL();

  await open(url, {
    app: ['chrome'],
  });
};

const openRootDirectory = () => openExplorer(rootUploadDirectory);

module.exports = {
  openChrome,
  openRootDirectory,
};

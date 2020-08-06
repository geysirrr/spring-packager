const { write, canAcessFile, read } = require('./utils');
const { wikiURLPath } = require('./paths');
const { getWikiURL, doesRewriteWikiURL } = require('./questions');

const hasWikiInfo = async () => {
  return await canAcessFile(wikiURLPath);
};

const doesRewriteFile = async () => {
  if (!(await hasWikiInfo(wikiURLPath))) return true;

  return await doesRewriteWikiURL();
};

exports.writeWikiInfo = async () => {
  if (!(await doesRewriteFile())) return false;

  const wikiURL = await getWikiURL();

  await write(wikiURLPath, JSON.stringify({ url: wikiURL }, null, 2), 'utf-8');
};

exports.getWikiURL = async () => {
  return await read(wikiURLPath);
};

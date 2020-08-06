const { write, getJiraIds } = require('./utils');
const { jiraIdsTextFilePath } = require('./paths');

const getJiraQueryById = ids =>
  ids.length !== 0 ? `key in (${ids.join(',')})` : '';

exports.writeJiraInfo = async messages => {
  const ids = getJiraIds(messages);

  const info = {
    messages: messages.split('\n').filter(Boolean),
    ids,
    query: getJiraQueryById(ids),
  };

  await write(jiraIdsTextFilePath, JSON.stringify(info, null, 2), 'utf-8');
};

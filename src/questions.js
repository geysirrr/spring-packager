const inquirer = require('inquirer');

const prompts = {
  getOption: [
    {
      type: 'input',
      name: 'patchVersion',
      message: 'Enter the patch version',
    },
    {
      type: 'input',
      name: 'start',
      message: 'Enter start commit ID',
    },
    {
      type: 'input',
      name: 'end',
      message: 'Enter end commit ID',
    },
  ],
  end: [
    {
      type: 'input',
      name: 'endingQuestion',
      message: 'Press Any Key to Exit...',
    },
  ],
  wiki: {
    url: [
      {
        type: 'input',
        name: 'wikiURL',
        message: 'Enter the wiki URL',
      },
    ],
    rewrite: [
      {
        type: 'input',
        name: 'rewriteWiki',
        message: 'Do you want to rewrite wiki URL? (Y/N)',
      },
    ],
  },
};

exports.getOptionsByPrompt = async () => {
  const { patchVersion, start, end } = await inquirer.prompt(prompts.getOption);

  if (!patchVersion) throw new Error('Please enter the patch version');

  return { patchVersion, start, end };
};

exports.endByPrompt = async () => {
  await inquirer.prompt(prompts.end);
};

exports.getWikiURL = async () => {
  const { wikiURL } = await inquirer.prompt(prompts.wiki.url);

  if (!wikiURL) throw new Error('Please enter the wiki URL');

  return wikiURL;
};

exports.doesRewriteWikiURL = async () => {
  const { rewriteWiki } = await inquirer.prompt(prompts.wiki.rewrite);

  return rewriteWiki.toUpperCase() === 'Y';
};

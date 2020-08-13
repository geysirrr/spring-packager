const del = require('del');
const { getOptionsByPrompt, endByPrompt } = require('./questions');
const {
  getCommitFilePaths,
  getCommitMessages,
  getFirstCommitMessage,
} = require('./cmds');
const {
  isJavaFile,
  isWebContentFile,
  get$ClassFiles,
  mkdir,
  copy,
} = require('./utils');
const {
  rootUploadDirectory,
  changeCommitFileToTargetPath,
  warWebInfFileDirectory,
  getWarClassFilePath,
  getWarWebContentFilePath,
  getCombinedTargetPathAndWarPath,
  copyFilePath,
} = require('./paths');
const { green, magenta } = require('./chalks');
const { makeManifest } = require('./manifest');
const { makeZip } = require('./zips');
const { openChrome, openRootDirectory } = require('./opens');
const { writeJiraInfo } = require('./jira');
const { writeWikiInfo } = require('./wiki');
const { handleError } = require('./errors');

exports.init = async () => {
  try {
    await del(rootUploadDirectory, { force: true });
    await writeWikiInfo();

    await openChrome();

    const { patchVersion, start, end } = await getOptionsByPrompt();
    const commitFilePaths = await getCommitFilePaths(start, end);
    const commitFileTargetPaths = changeCommitFileToTargetPath(commitFilePaths);

    for (let commitFileTargetPath of commitFileTargetPaths) {
      if (isJavaFile(commitFileTargetPath)) {
        const $classFiles = await get$ClassFiles(commitFileTargetPath);
        const targetPaths = [commitFileTargetPath, ...$classFiles];
        const warFilePaths = targetPaths.map(getWarClassFilePath);

        const combinedTargetPathAndWarPath = getCombinedTargetPathAndWarPath(
          targetPaths,
          warFilePaths
        );

        await mkdir(warWebInfFileDirectory(warFilePaths[0]), {
          recursive: true,
        });

        for (let [targetPath, warFilePath] of combinedTargetPathAndWarPath) {
          magenta(warFilePath);

          await copy(targetPath, copyFilePath(warFilePath));
        }
      } else if (isWebContentFile(commitFileTargetPath)) {
        const warFilePath = getWarWebContentFilePath(commitFileTargetPath);

        green(warFilePath);

        await mkdir(warWebInfFileDirectory(warFilePath), { recursive: true });
        await copy(commitFileTargetPath, copyFilePath(warFilePath));
      }
    }

    await makeManifest(patchVersion);
    await makeZip(patchVersion);

    // git log command doesn't show up start commit information
    // so needed to log start commit message separately.
    const firstCommitMessage = await getFirstCommitMessage(start);
    const commitMessages = await getCommitMessages(start, end);
    await writeJiraInfo(`${firstCommitMessage}\n${commitMessages}`);

    openRootDirectory();
  } catch (err) {
    handleError(err);
  } finally {
    await endByPrompt();
  }
};

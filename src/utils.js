const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const access = promisify(fs.access);
const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const copy = promisify(fs.copyFile);
const { jiraRegExp } = require('./regexp');

exports.isJavaFile = file => file.includes('target/classes');

exports.isWebContentFile = file => file.includes('WebContent/WEB-INF');

exports.get$ClassFiles = async file => {
  const $classFiles = await glob(`${path.dirname(file)}/*$*.class`);

  return $classFiles;
};

exports.canAcessFile = file =>
  new Promise(resolve => {
    access(file)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });

exports.getJiraIds = messages => messages.match(jiraRegExp) || [];

exports.read = read;

exports.write = write;

exports.mkdir = mkdir;

exports.copy = copy;

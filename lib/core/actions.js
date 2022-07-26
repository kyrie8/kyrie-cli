const { promisify } = require('util');
const ora = require('ora');
const spinner = ora('loading...');

const download = promisify(require('download-git-repo'));

const { repo } = require('../config/repo-config');

const { commadSpawn } = require('../utils/terminal');

const createProjectAtion = async (project, name) => {
  spinner.start();
  spinner.text = 'clone...';
  //clone项目
  await download(repo[name], project, { clone: true }).catch(() => {
    spinner.text = 'clone failed';
    spinner.stop();
  });
  //npm i
  spinner.text = 'install...';
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commadSpawn(command, ['install'], { cwd: `./${project}` }).catch(() => {
    spinner.text = 'install failed';
    spinner.stop();
  });
  spinner.stop();
  //npm run serve
  if (name === 'React') {
    await commadSpawn(command, ['run', 'start'], { cwd: `./${project}` });
  } else {
    await commadSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  }
};

module.exports = {
  createProjectAtion,
};

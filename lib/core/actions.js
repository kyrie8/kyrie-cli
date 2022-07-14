const { promisify } = require('util');

const download = promisify(require('download-git-repo'));

const open = require('open');

const { vueRepo } = require('../config/repo-config');

const { commadSpawn } = require('../utils/terminal');

const createProjectAtion = async (project) => {
  //clone项目
  await download(vueRepo, project, { clone: true });
  //npm i
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  await commadSpawn(command, ['install'], { cwd: `./${project}` });
  //npm run serve
  await commadSpawn(command, ['run', 'serve'], { cwd: `./${project}` });
  console.log(project);
};

module.exports = {
  createProjectAtion,
};

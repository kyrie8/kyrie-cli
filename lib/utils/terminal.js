// 执行终端代码

const { spawn } = require('child_process');

const commadSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('close', () => {
      resolve();
    });
    childProcess.on('error', (e) => {
      reject(e);
    });
  });
};

module.exports = {
  commadSpawn,
};

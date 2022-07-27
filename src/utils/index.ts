import { spawn } from 'child_process';
import * as pacote from 'pacote';
import { spinnerStart } from '../lib/ora';

//平台
const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'

//版本信息
const getPkgInfo = () => {
  return require('../../package.json')
}

//判断是否是最新的版本
const getLastPkgInfo = async () => {
  spinnerStart('检测版本中...')
  const pak = getPkgInfo()
  const { version } = await pacote.manifest(`${pak.name}@latest`)
  if(!version) {
    process.exitCode = 1
    return
  }
  return version === pak.version ? true : false
}


const commandSpawn = (...rest: any) => {
  return new Promise<number>((resolve, reject) => {
    const childProcess = (spawn as (...args: any) => any)(...rest)
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('close', () => {
      resolve(1)
    });
    childProcess.on('error', (e: any) => {
      reject(e)
    })
  })
}

export {
  getLastPkgInfo,
  getPkgInfo,
  commandSpawn,
  command
}
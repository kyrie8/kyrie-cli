import * as commander from 'commander'
import * as inquirer from 'inquirer'
import { spinnerStart, spinnerStop } from '../lib/ora'
import { IPackage } from '../type'
import { command, commandSpawn, getLastPkgInfo, getPkgInfo } from '../utils'
import { createProjectAtion } from './action'

const { program } = commander
const cwd = process.cwd()
//检测版本
const checkVersion = async () => {
  const pkg:IPackage = getPkgInfo()
  //检测版本
  const isLatest = await getLastPkgInfo()
  spinnerStop('检测完成', 'SUCCEED')
  if(!isLatest) {
    spinnerStart('更新中...')
    const res = await commandSpawn(command, ['install', `${pkg.name}`, '-g'], {cwd}).catch(() => {
      spinnerStop('更新失败', 'FAILED')
    })
    if(res) {
      spinnerStop('更新完成', 'SUCCEED')
      return true
    }
  } else {
    return true
  }
}

//选择模板
const userChoose = async (project: string) => {
  const res = await checkVersion()
  if(!res) {
    process.exitCode = 1
    return
  }
  const { framework } = await inquirer
    .prompt([
      {
        type: 'list',
        message: '请选择一个开发框架模板：',
        name: 'framework',
        default: 'React',
        choices: ['Vue', 'React']
      },
    ])
  createProjectAtion(project, framework)
}

//创建项目
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository')
    .action(userChoose)
}

export {
  createCommands
}
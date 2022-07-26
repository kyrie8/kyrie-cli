import * as commander from 'commander'
import { IPackage } from './type'
import { getLastPkgInfo, getPkgInfo, commandSpawn, command } from './utils'
import { helpOptions } from './commands/help'
import { createCommands } from './commands/create'
import { spinnerStart, spinnerStop } from './lib/ora'

const { program } = commander
const cwd = process.cwd()

const start = async () => {
  const pkg:IPackage = getPkgInfo()
  //检测版本
  const isLatest = await getLastPkgInfo()
  spinnerStop('检测完成', 'SUCCEED')
  if(!isLatest) {
    spinnerStart('更新中...')
    await commandSpawn(command, ['install', `${pkg.name}`, '-g'], {cwd}).catch(() => {
      spinnerStop('更新失败', 'FAILED')
    })
    spinnerStop('更新完成', 'SUCCEED')
  }
  //查看版本号
  program.version(pkg.version)
  //帮助信息
  helpOptions()
  //创建命令
  createCommands()
  program.parseAsync(process.argv)
}

start()

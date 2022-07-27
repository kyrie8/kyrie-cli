import * as commander from 'commander'
import { IPackage } from './type'
import { getPkgInfo} from './utils'
import { helpOptions } from './commands/help'
import { createCommands } from './commands/create'

const { program } = commander

const start = async () => {
  const pkg:IPackage = getPkgInfo()
  //查看版本号
  program.version(pkg.version)
  //帮助信息
  helpOptions()
  //创建命令
  createCommands()
  program.parseAsync(process.argv)
}

start()

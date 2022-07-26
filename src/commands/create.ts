import * as commander from 'commander'
import * as inquirer from 'inquirer'
import { createProjectAtion } from './action'

const { program } = commander

//选择模板
const userChoose = async (project: string) => {
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
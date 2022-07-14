const program = require('commander');
const inquirer = require('inquirer');
const { createProjectAtion } = require('./actions');

const userChoose = (project) => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: '请选择一个开发框架模板：',
        name: 'framework',
        default: 'React',
        choices: ['Vue', 'React'],
      },
    ])
    .then((answer) => {
      const { framework } = answer;
      createProjectAtion(project, framework);
    });
};

const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository')
    .action(userChoose);
  //.action(createProjectAtion)
};

module.exports = createCommands;

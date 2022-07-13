const program = require('commander')
const {createProjectAtion} = require('./actions')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository')
    .action(createProjectAtion)
}

module.exports = createCommands
import * as commander from 'commander'

const { program } = commander
const helpOptions = () => {
  // add options
  program.option('-k --kyrie', 'a kyrie cli')
  program.option('-f --framework <framework>', 'your frameword')

  program.on('--help', function() {
    console.log("")
    console.log("Other:")
  })
}

export {
  helpOptions
}
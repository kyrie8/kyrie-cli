import ora from 'ora'

export type spinnerType = 'SUCCEED' | 'FAILED'

const spinner = ora()
const spinnerStart = (tip: string) => {
  spinner.start()
  spinner.text = tip
}

const spinnerStop = (tip: string, type: spinnerType) => {
  if (type === 'SUCCEED') {
    spinner.succeed(tip)
  } else {
    spinner.fail(tip)
  }
}

const spinnerTip = (tip: string) => {
  spinner.text = tip
}

export {
  spinnerStart,
  spinnerStop,
  spinnerTip
}

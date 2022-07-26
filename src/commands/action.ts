import { promisify } from 'util'
//import * as download from 'download-git-repo'
const download = require('download-git-repo')

import { commandSpawn, command } from '../utils'
import { spinnerStart, spinnerStop } from '../lib/ora'
import {projectType} from '../config'

const downloadClone = promisify(download) as (...rest: any[]) => any

const createProjectAtion = async (project: string, name: keyof typeof projectType) => {
  spinnerStart('clone...')
  const url = projectType[name]
  await downloadClone(url, project, { clone: true }).catch(() => {
    spinnerStop('clone failed', 'FAILED')
  })
  spinnerStart('install...')
  const res = await commandSpawn(command, ['install'], { cwd: `./${project}` }).catch(() => {
    spinnerStop('install failed', 'FAILED')
  })
  if (res) {
    spinnerStop('succeed', 'SUCCEED')
  }
  if (name === 'React') {
    await commandSpawn(command, ['run', 'start'], { cwd: `./${project}` })
  } else {
    await commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  }
}

export {
  createProjectAtion
}
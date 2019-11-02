import { Action } from '../models/Action'
import { Sequence } from '../models/Sequence'

export class ActionRunner {
  runSequence (sequence: Sequence) {
    console.log('runSequence')
  }

  runAction (action: Action) {
    const execSync = require('child_process').execSync
    try {
      const output = execSync(action, { encoding: 'utf-8' })
      if (output !== '') { // silence blank outputs
        console.log('Output was: ', output)
      }
    } catch (error) {
      // Action failed.
    }
  }
}

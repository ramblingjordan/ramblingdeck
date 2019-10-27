import { Key } from './Key'
import { Keys } from './Types'
import { Action } from './Action'

type Map = {
  keyIndex: number
  keyId: string
}

export class Helpers {

  loadKeysFile (layoutPath: string): Keys {
    let keys: Keys = {}
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(fs.readFileSync(layoutPath, 'utf8'))
    doc.forEach((key: Key) => {
      keys[key.id] = key
    })
    return keys
  }

  loadMapFile (mapFile: string): Array<Map> {
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(mapFile, 'utf8')
    )
    let map: Array<Map> = doc
    return map
  }

  executeAction (action: Action) {
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

  keyActionMessage (buttonMovement: string, keyIndex: number, keyId: string, keyAction: Action) {
    let logMessage: string = '' +
    '------------------------------\n' +
    'Key Index: ' + keyIndex + '\n' +
    'Key ID: ' + keyId + '\n' +
    'Action: ' + buttonMovement + '\n' +
    '  Type: ' + keyAction.type + '\n' +
    '  Command: ' + keyAction.command + '\n' +
    '------------------------------'
    console.log(logMessage)
  }
}

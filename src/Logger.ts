import { Action } from './models/Action'

export class Logger {
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

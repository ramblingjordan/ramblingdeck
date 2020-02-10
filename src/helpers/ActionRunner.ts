import { Action } from '../models/Action'
import { commandType } from '../models/Action'
import { Sequence } from '../models/Sequence'
import { DeckController } from './DeckController'

const keyCombos = {
  '!': ['shift', '1'],
  '@': ['shift', '2'],
  '#': ['shift', '3'],
  '$': ['shift', '4'],
  '%': ['shift', '5'],
  '^': ['shift', '6'],
  '&': ['shift', '7'],
  '*': ['shift', '8']
}

const specialKeys: String[] = [
  'enter',
  'tab',
]

export class ActionRunner {
  runSequence (sequence: Sequence) {
    console.log('runSequence')
  }

  sendKeys (command: string | undefined) {
    var ks = require('node-key-sender');
    var batch = ks.startBatch();
    if (command == undefined) {
      console.log('Undefined command');
    } else if (specialKeys.includes(command)) {
      batch.batchTypeKey(command);
    } else {
      for (var i = 0; i < command.length; i++) {
        var char: any = command.charAt(i);
        if (char in keyCombos) {
          var combo: keyof typeof keyCombos = char;
          batch.batchTypeCombination(keyCombos[combo]);
        } else {
          batch.batchTypeKey(char);
        }
      }
    }
    batch.sendBatch();
  }

  runAction (action: Action, sd: DeckController) {
    if (action.type == commandType.SEND_KEYS) {
      this.sendKeys(action.command);
      console.log("Typed: " + action.command);
    } else if (action.type == commandType.HIDDEN_KEYS) {
      var command = process.env[action.command];
      if (command == undefined) {
        command = action.command;
      }
      this.sendKeys(command);
    } else if (action.type == commandType.RUN_SEQUENCE) {
      console.log("Running sequence");
      var deckKeys = sd.keys;
      action.keys.forEach((key) => {
        setTimeout(() => {
          var k = deckKeys.get(key.id);
          if (k && k.down) {
            console.log(k.down.command);
            this.runAction(k.down, sd);
          }
        }, key.delay);
      });
    } else {
      const execSync = require('child_process').execSync
      try {
        const output = execSync(action.command, { encoding: 'utf-8', stdio: 'inherit' })
        if (output !== null) { // silence blank outputs
          console.log('Output was: ', output)
        }
      } catch (error) {
        // Action failed
        console.log(error)
      }
    }
  }
}

import { Key } from './Key'

export enum commandType {
  BASH_COMMAND,
  SET_MAP,
  TOGGLE_SWITCH,
  RUN_SEQUENCE='sequence',
  SEND_KEYS='keys',
  HIDDEN_KEYS='hide-keys',
  AUDIO='audio'
}

export class Action {
  type: commandType
  command: string
  keys: Key[]

  constructor (initType: commandType, initCommand: string, initKeys: Key[]) {
    this.type = initType
    this.command = initCommand
    this.keys = initKeys
  }
}

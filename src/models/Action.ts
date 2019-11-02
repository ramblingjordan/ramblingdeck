enum commandType {
  BASH_COMMAND,
  SET_MAP,
  TOGGLE_SWITCH,
  RUN_SEQUENCE
}

export class Action {
  type: commandType
  command: string

  constructor (initType: commandType, initCommand: string) {
    this.type = initType
    this.command = initCommand
  }
}

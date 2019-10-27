enum commandType {
  Bash,
  Layout
}

export class Action {
  _type: commandType
  _command: string

  constructor (initType: commandType, initCommand: string) {
    this._type = initType
    this._command = initCommand
  }

  get type (): commandType {
    return this._type
  }

  get command (): string {
    return this._command
  }
}

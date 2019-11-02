import { Action } from './Action'

export class Sequence {
  name: string
  actions: Action[]

  constructor (newName: string, newActions: Action[]) {
    this.name = newName
    this.actions = newActions
  }
}

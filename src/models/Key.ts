import { Action } from './Action'

export class Key {
  id: string
  title: string
  bgColor: string
  icon: string
  down: Action
  up: Action

  constructor (id: string, title: string, bgColor: string, icon: string, down: Action, up: Action) {
    this.id = id
    this.title = title
    this.bgColor = bgColor
    this.icon = icon
    this.down = down
    this.up = up
  }
}

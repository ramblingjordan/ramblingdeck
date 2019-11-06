import { Action } from './Action'

export type KeyMap = {
  keyIndex: number
  keyId: string
}

export class Key {
  id: string
  title: string
  bgColor: string
  image: string
  down: Action
  up: Action

  constructor (id: string, title: string, bgColor: string, image: string, down: Action, up: Action) {
    this.id = id
    this.title = title
    this.bgColor = bgColor
    this.image = image
    this.down = down
    this.up = up
  }
}

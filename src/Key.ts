import { Action } from './Action'

export class Key {
  private _id: string
  private _title: string
  private _bgColor: string
  private _icon: string
  private _down: Action
  private _up: Action

  constructor (id: string, title: string, bgColor: string, icon: string, down: Action, up: Action) {
    this._id = id
    this._title = title
    this._bgColor = bgColor
    this._icon = icon
    this._down = down
    this._up = up
  }

  get id (): string {
    return this._id
  }

  set id (newId: string) {
    this._id = newId
  }

  get title (): string {
    return this._title
  }

  set title (newTitle: string) {
    this._title = newTitle
  }

  get bgColor (): string {
    return this._bgColor
  }

  set bgColor (newColor: string) {
    this._bgColor = newColor
  }

  get icon (): string {
    return this._icon
  }

  set icon (newIcon: string) {
    this._icon = newIcon
  }

  get down (): Action {
    return this._down
  }

  set down (newDown: Action) {
    this._down = newDown
  }

  get up (): Action {
    return this._up
  }

  set up (newUp: Action) {
    this._up = newUp
  }
}

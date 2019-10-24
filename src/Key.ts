export class Key {
  private _id: string
  private _title: string
  private _bgColor: string
  private _icon: string
  private _down: string
  private _up: string

  constructor (id: string, title: string, bgColor: string, icon: string, down: any, up: any) {
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

  get down (): string {
    return this._down
  }

  set down (newDown: string) {
    this._down = newDown
  }

  get up (): string {
    return this._up
  }

  set up (newUp: string) {
    this._up = newUp
  }
}

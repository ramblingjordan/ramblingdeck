export class Key {
  private _title: string
  private _bgColor: string
  private _icon: any
  private _action: any

  constructor (title: string, bgColor: string, icon: any, action: any) {
    this._title = title
    this._bgColor = bgColor
    this._icon = icon
    this._action = action
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

}

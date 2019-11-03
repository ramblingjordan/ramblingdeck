export class Icon {
  name: string
  text: string

  constructor (newName: string, newText: string) {
    this.name = newName
    this.text = newText
  }

  getHash (): string {
    const hash = require('object-hash')
    return hash(this)
  }
}

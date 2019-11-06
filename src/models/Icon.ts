export class Icon {
  name: string
  text: string
  bgColor: string

  constructor (newName: string) {
    this.name = newName
    this.text = ''
    this.bgColor = ''
  }

  getHash (): string {
    const hash = require('object-hash')
    return hash(this)
  }
}

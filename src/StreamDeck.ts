import { openStreamDeck } from 'elgato-stream-deck'
import { Helpers } from './Helpers'
import { Mapping, Keys } from './Types'
import { Key } from './Key'

export class StreamDeck {
  private sd: any
  private helpers = new Helpers()

  private _keys: Keys
  private _mapping: Mapping = []

  constructor (keys: Keys) {
    this.sd = openStreamDeck()
    this._keys = keys
  }

  set mapping (newMapping: Mapping) {
    this._mapping = newMapping
    this.applyMap()
  }

  clearAll () {
    this.sd.clearAllKeys()
  }

  applyMap () {
    this.clearAll()
    for (let map of this._mapping) {
      this.setKey(map.keyIndex, this._keys[map.keyId])
    }
  }

  setKey (deckIndex: number, key: Key) {
    if (key.bgColor) {
      let convert = require('color-convert')
      let rgbColor = convert.hex.rgb(key.bgColor)
      this.sd.fillColor(deckIndex, rgbColor[0], rgbColor[1], rgbColor[2])
    }

    if (key.icon) {
      const path = require('path')
      const sharp = require('sharp')
      sharp(path.join('layouts', key.icon))
        .flatten()
        .resize(this.sd.ICON_SIZE, this.sd.ICON_SIZE)
        .raw()
        .toBuffer()
        .then((buff: any) => {
          this.sd.fillImage(deckIndex, buff)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  getKeyFromIndex (index: number) {
    let keyId: string = ''
    for (let map of this._mapping) {
      if (map.keyIndex === index) {
        keyId = map.keyId
        break
      }
    }
    return keyId
  }

  onDown () {
    this.sd.on('down', (keyIndex: number) => {
      let keyId = this.getKeyFromIndex(keyIndex)
      let key = this._keys[keyId]
      if (key) {
        this.helpers.keyActionMessage('down', keyIndex, keyId, key.down)
        this.helpers.executeAction(key.down)
      }
    })
  }

  onUp () {
    this.sd.on('up', (keyIndex: number) => {
      let keyId = this.getKeyFromIndex(keyIndex)
      let key = this._keys[keyId]
      if (key) {
        if (key.up) {
          this.helpers.keyActionMessage('up', keyIndex, keyId, key.up)
          this.helpers.executeAction(key.up)
        }
      }
    })
  }

  onError () {
    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

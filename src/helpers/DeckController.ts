import { openStreamDeck } from 'elgato-stream-deck'
import { Key, KeyMap } from '../models/Key'
import { ActionRunner } from './ActionRunner'
import { Logger } from './Logger'
import { ImageHelper } from './ImageHelper'

type KeyMapping = Array<KeyMap>

const actionRunner = new ActionRunner()
const logger = new Logger()

export class DeckController {
  private sd: any

  private _keys: Map<string, Key>
  private _mapping: KeyMapping = []

  constructor (keys: Map<string, Key>) {
    this.sd = openStreamDeck()
    this.sd.clearAllKeys()
    this._keys = keys
  }

  set mapping (newMapping: KeyMapping) {
    this._mapping = newMapping
    this.applyMap()
  }

  clearAll () {
    this.sd.clearAllKeys()
  }

  applyMap () {
    for (let map of this._mapping) {
      this.setKey(map.keyIndex, this._keys.get(map.keyId))
    }
  }

  setKey (deckIndex: number, key: Key | undefined) {
    const path = require('path')
    if (key !== undefined) {
      if (key.bgColor) {
        let convert = require('color-convert')
        let rgbColor = convert.hex.rgb(key.bgColor)
        this.sd.fillColor(deckIndex, rgbColor[0], rgbColor[1], rgbColor[2])
      }

      if (key.icon) {
        this.drawImageOnKey(deckIndex, path.join('layouts', key.icon))
      }
    }
  }

  drawImageOnKey (index: number, iconFilePath: string) {
    const sharp = require('sharp')
    sharp(iconFilePath)
      .flatten()
      .resize(this.sd.ICON_SIZE, this.sd.ICON_SIZE)
      .raw()
      .toBuffer()
      .then((buff: any) => {
        this.sd.fillImage(index, buff)
      })
      .catch((error: any) => {
        console.log(error)
      })
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
      let key = this._keys.get(keyId)
      if (key && key.down) {
        logger.keyActionMessage('down', keyIndex, keyId, key.down)
        actionRunner.runAction(key.down)
      }
    })
  }

  onUp () {
    this.sd.on('up', (keyIndex: number) => {
      let keyId = this.getKeyFromIndex(keyIndex)
      let key = this._keys.get(keyId)
      if (key && key.up) {
        logger.keyActionMessage('up', keyIndex, keyId, key.up)
        actionRunner.runAction(key.up)
      }
    })
  }

  onError () {
    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }
}

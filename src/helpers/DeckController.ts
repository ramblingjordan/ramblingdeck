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

  keys: Map<string, Key>
  private _mapping: KeyMapping = []

  constructor () {
    this.sd = openStreamDeck()
    this.sd.clearAllKeys()
    this.keys = new Map<string, Key>()
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
      this.setKey(map.keyIndex, this.keys.get(map.keyId))
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

      if (key.image) {
        this.drawImageOnKey(deckIndex, path.join('layouts', key.image))
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

  startListeners () {
    this.onDown()
    this.onUp()
    this.onError()
  }

  onDown () {
    this.sd.on('down', (keyIndex: number) => {
      let keyId = this.getKeyFromIndex(keyIndex)
      let key = this.keys.get(keyId)
      if (key && key.down) {
        logger.keyActionMessage('down', keyIndex, keyId, key.down)
        actionRunner.runAction(key.down, this)
      }
    })
  }

  onUp () {
    this.sd.on('up', (keyIndex: number) => {
      let keyId = this.getKeyFromIndex(keyIndex)
      let key = this.keys.get(keyId)
      if (key && key.up) {
        logger.keyActionMessage('up', keyIndex, keyId, key.up)
        actionRunner.runAction(key.up, this)
      }
    })
  }

  onError () {
    this.sd.on('error', (error: string) => {
      console.error(error)
    })
  }

  getFirmwareVersion () {
    return this.sd.getFirmwareVersion()
  }

  getSerialNumber () {
    return this.sd.getSerialNumber()
  }
}

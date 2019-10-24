import { Key } from './Key'

type Keys = {[key: string]: Key}

type Map = {
  keyIndex: number
  keyId: string
}

export class Helpers {

  setKey (sd: any, deckIndex: number, key: Key) {
    if (key.bgColor) {
      let convert = require('color-convert')
      let rgbColor = convert.hex.rgb(key.bgColor)
      sd.fillColor(deckIndex, rgbColor[0], rgbColor[1], rgbColor[2])
    }

    if (key.icon) {
      const path = require('path')
      const sharp = require('sharp')
      sharp(path.join('layouts', key.icon))
        .flatten()
        .resize(sd.ICON_SIZE, sd.ICON_SIZE)
        .raw()
        .toBuffer()
        .then((buff: any) => {
          sd.fillImage(deckIndex, buff)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }

  loadKeys (layoutPath: string): Keys {
    let keys: Keys = {}
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(layoutPath, 'utf8')
    )

    doc.forEach((key: Key) => {
      keys[key.id] = key
    })

    return keys
  }

  loadMap (mapFile: string): Array<Map> {
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(mapFile, 'utf8')
    )
    let map: Array<Map> = doc
    return map
  }
}

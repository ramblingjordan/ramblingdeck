import { Key } from './models/Key'
import { Keys } from './Types'

type Map = {
  keyIndex: number
  keyId: string
}

export class FileLoader {

  loadKeysFile (layoutPath: string): Keys {
    let keys: Keys = {}
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(fs.readFileSync(layoutPath, 'utf8'))
    doc.forEach((key: Key) => {
      keys[key.id] = key
    })
    return keys
  }

  loadFile (filePath: string): any {
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(filePath, 'utf8')
    )
    return doc
  }

  loadKeyArray<T> (keyArrayFile: string): T[] {
    let doc = this.loadFile(keyArrayFile)
    let ret: Array<T> = []
    return ret
  }

  loadMapFile (mapFile: string): Array<Map> {
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(mapFile, 'utf8')
    )
    let map: Array<Map> = doc
    return map
  }
}

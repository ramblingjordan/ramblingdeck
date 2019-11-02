import { Key } from '../models/Key'
import { Keys, Dict } from '../models/Types'

export class FileLoader {

  loadKeysFile (layoutPath: string): Keys {
    let keys: Keys = {}
    let doc = this.loadFile(layoutPath)
    doc.forEach((key: Key) => {
      keys[key.id] = key
    })
    return keys
  }

  loadKeysMap (layoutPath: string): Map<string, Key> {
    let ret = new Map<string, Key>()
    let doc = this.loadFile(layoutPath)
    for (let key of doc) {
      ret.set(key.id, key)
    }
    return ret
  }

  loadArrayFile<T> (filePath: string): T[] {
    const doc = this.loadFile(filePath)
    let ret: Array<T> = doc
    return ret
  }

  loadFile (filePath: string): any {
    const yaml = require('js-yaml')
    const fs = require('fs')
    const doc = yaml.safeLoad(
      fs.readFileSync(filePath, 'utf8')
    )
    return doc
  }
}

import { Key } from './models/Key'
import { Keys } from './Types'

type Map = {
  keyIndex: number
  keyId: string
}

export class FileLoader {

  loadKeysFile (layoutPath: string): Keys {
    let keys: Keys = {}
    let doc = this.loadFile(layoutPath)
    doc.forEach((key: Key) => {
      keys[key.id] = key
    })
    return keys
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

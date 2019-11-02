import { Key } from '../models/Key'

export class FileLoader {

  loadKeysFile (layoutPath: string): Map<string, Key> {
    let ret = new Map<string, Key>()
    let doc = this.loadFile(layoutPath)
    for (let key of doc) {
      ret.set(key.id, key)
    }
    return ret
  }

  loadArrayFile<T> (filePath: string): T[] {
    return this.loadFile(filePath)
  }

  loadFile (filePath: string): any {
    const yaml = require('js-yaml')
    const fs = require('fs')
    return yaml.safeLoad(
      fs.readFileSync(filePath, 'utf8')
    )
  }
}

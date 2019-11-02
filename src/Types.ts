import { Key } from './models/Key'
import { Action } from './models/Action'

export type Keys = {[key: string]: Key}

export type Map = {
  keyIndex: number
  keyId: string
}

export type Mapping = Array<Map>

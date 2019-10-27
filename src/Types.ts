import { Key } from './Key'
import { Action } from './Action'

export type Keys = {[key: string]: Key}

export type Map = {
  keyIndex: number
  keyId: string
}

export type Mapping = Array<Map>

export type Sequence = {
  name: string
  actions: Action[]
}

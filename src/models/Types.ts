import { Key } from './Key'

export type Keys = {[key: string]: Key}

export type Dict<T> = {[key: string]: T}

export type Map = {
  keyIndex: number
  keyId: string
}

export type Mapping = Array<Map>

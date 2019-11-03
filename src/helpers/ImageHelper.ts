import { Icon } from '../models/Icon'

const Jimp = require('jimp')

export class ImageHelper {
  checkIconImageExists (icon: Icon): boolean {
    return false
  }

  createIconImage (icon: Icon): string {
    return icon.getHash()
  }
}

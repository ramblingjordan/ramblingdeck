import { Icon } from '../models/Icon'

export class ImageHelper {
  getIconFilePath (icon: Icon): string {
    return 'icons/' + icon.getHash() + '.png'
  }

  async createIconImage (icon: Icon): Promise<string> {
    let fs = require('fs')
    let filePath = this.getIconFilePath(icon)

    if (!fs.existsSync(filePath)) {
      const IMAGE_SIZE = 72
      const Jimp = require('jimp')
      let image = new Jimp(IMAGE_SIZE, IMAGE_SIZE)

      if (icon.bgColor !== '') {
        const Color = require('color')
        let color = Color(icon.bgColor)
        let bgColorImage = new Jimp(IMAGE_SIZE, IMAGE_SIZE, color.hex())
        image.composite(bgColorImage, 0, 0)
      }

      if (icon.text !== '') {
        await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then((font: any) => {
          image.print(
            font,
            0,
            0,
            {
              text: icon.text,
              alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
              alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
            },
            IMAGE_SIZE,
            IMAGE_SIZE
          )
        })
      }
      image.write(filePath)
    }
    return filePath
  }
}

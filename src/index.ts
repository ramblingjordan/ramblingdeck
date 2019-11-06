import { DeckController } from './helpers/DeckController'
import { FileLoader } from './helpers/FileLoader'
import { KeyMap } from './models/Key'
import { ImageHelper } from './helpers/ImageHelper'
import { Icon } from './models/Icon'

const LAYOUT = 'development'

async function main () {
  const chalk = require('chalk')
  console.log(chalk.black.bgWhite('\n --- Welcome to RamblingDeck --- \n'))

  const fileLoader = new FileLoader()

  console.log('removing icon folder')
  let fs = require('fs-extra')
  fs.removeSync('icons')

  let ih = new ImageHelper()
  let icon = new Icon('test-icon')
  icon.text = 'TEST BUTTON'
  icon.bgColor = '#FFFFFF'


  console.log(await ih.createIconImage(icon))
  // Load keys and deck
  let keys = fileLoader.loadKeysFile('./layouts/' + LAYOUT + '/keys.yml')

  const sd = new DeckController(keys)

  // Set map from file
  let map: Array<KeyMap> = fileLoader.loadArrayFile<KeyMap>('./layouts/' + LAYOUT + '/maps/testing.yml')

  sd.mapping = map
  sd.applyMap()

  // Stream Deck Listeners
  sd.onDown()
  sd.onUp()
  sd.onError()
}

void main()

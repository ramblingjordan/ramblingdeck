import { DeckController } from './helpers/DeckController'
import { FileLoader } from './helpers/FileLoader'
import { KeyMap } from './models/Key'

async function main () {
  const chalk = require('chalk')
  const fileLoader = new FileLoader()

  let layout = 'development'

  console.log(chalk.black.bgWhite('\n --- Welcome to RamblingDeck --- \n'))

  // Load keys and deck
  let keys = fileLoader.loadKeysFile('./layouts/' + layout + '/keys.yml')

  const sd = new DeckController(keys)

  // Set map from file
  let map: Array<KeyMap> = fileLoader.loadArrayFile<KeyMap>('./layouts/' + layout + '/maps/testing.yml')

  sd.mapping = map
  sd.applyMap()

  // Stream Deck Listeners
  sd.onDown()
  sd.onUp()
  sd.onError()
}

void main()

import { DeckController } from './helpers/DeckController'
import { FileLoader } from './helpers/FileLoader'
import { Map, Dict } from './models/Types'
import { Key } from './models/Key'

async function main () {
  const chalk = require('chalk')
  const fileLoader = new FileLoader()

  let layout = 'development'

  console.log(chalk.black.bgWhite('\n --- Welcome to RamblingDeck --- \n'))

  // Load keys and deck
  let keys: Dict<Key> = fileLoader.loadKeysFile('./layouts/' + layout + '/keys.yml')
  let keysMap = fileLoader.loadKeysMap('./layouts/' + layout + '/keys.yml')

  const sd = new DeckController(keysMap)

  // Set map from file
  let map: Array<Map> = fileLoader.loadArrayFile<Map>('./layouts/' + layout + '/maps/testing.yml')

  sd.mapping = map
  sd.applyMap()

  // Stream Deck Listeners
  sd.onDown()
  sd.onUp()
  sd.onError()
}

void main()

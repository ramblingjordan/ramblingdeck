import { StreamDeck } from './StreamDeck'
import { Helpers } from './Helpers'
import { Map, Keys } from './Types'

async function main () {
  const chalk = require('chalk')
  const helpers = new Helpers()

  console.log(chalk.black.bgWhite('\n--- Welcome to RamblingDeck ---'))

  let keys: Keys = helpers.loadKeysFile('./layouts/keys.yml')
  const sd = new StreamDeck(keys)

  let map: Array<Map> = helpers.loadMapFile('./layouts/map.yml')
  sd.mapping = map
  sd.applyMap()

  // Stream Deck Listeners
  sd.onDown()
  sd.onUp()
  sd.onError()
}

void main()

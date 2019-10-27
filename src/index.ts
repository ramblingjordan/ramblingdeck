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

  // Deck Listeners
  sd.onDown()
  sd.onUp()
  sd.onError()
}

// tslint:disable-next-line: no-floating-promises
main()

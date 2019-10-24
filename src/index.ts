import { openStreamDeck } from 'elgato-stream-deck'
import { Helpers } from './Helpers'
import { Key } from './Key'

type Keys = {[key: string]: Key}
type Map = {
  keyIndex: number
  keyId: string
}

async function main () {
  const chalk = require('chalk')
  const helpers = new Helpers()

  console.log('')
  console.log(chalk.black.bgWhite('--- Welcome to RamblingDeck ---'))

  const myStreamDeck = openStreamDeck() // Will throw an error if no Stream Decks are connected.
  myStreamDeck.clearAllKeys()
  let keys: Keys = helpers.loadKeys('./layouts/keys.yml')
  let map: Array<Map> = helpers.loadMap('./layouts/map.yml')

  for (let mapping of map) {
    helpers.setKey(myStreamDeck, mapping.keyIndex, keys[mapping.keyId])
  }

  myStreamDeck.on('down', keyIndex => {
    let keyId = helpers.getKeyFromIndex(map, keyIndex)

    if (keys[keyId]) {
      console.log('KeyId: ' + keyId)
      console.log('Action: ' + keys[keyId].down)
      helpers.executeAction(keys[keyId].down)
    } else {
      console.log('Key #' + keyIndex + ' pressed without associated action.')
    }
  })

  myStreamDeck.on('up', keyIndex => {
    let keyId = helpers.getKeyFromIndex(map, keyIndex)

    if (keys[keyId]) {
      if (keys[keyId].up) {
        console.log('KeyId: ' + keyId)
        console.log('Action: ' + keys[keyId].up)
        helpers.executeAction(keys[keyId].up)
      }
    }
  })

  // Fired whenever an error is detected by the `node-hid` library.
  // Always add a listener for this event! If you don't, errors will be silently dropped.
  myStreamDeck.on('error', error => {
    console.error(error)
  })
}

// tslint:disable-next-line: no-floating-promises
main()

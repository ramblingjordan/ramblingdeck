import { openStreamDeck } from 'elgato-stream-deck'
import { Key } from './Key'

function setKey (key: Key) {
  if (key.bgColor) {
    let convert = require('color-convert')
    let rgbColor = convert.hex.rgb(key.bgColor)
    myStreamDeck.fillColor(0, rgbColor[0], rgbColor[1], rgbColor[2])
  }
}

const myStreamDeck = openStreamDeck() // Will throw an error if no Stream Decks are connected.
let key = new Key('test', '#FFFFFF', '', '')

myStreamDeck.clearAllKeys()
setKey(key)

myStreamDeck.on('down', keyIndex => {
  console.log('key %d down', keyIndex)
})

myStreamDeck.on('up', keyIndex => {
  console.log('key %d up', keyIndex)
})

// Fired whenever an error is detected by the `node-hid` library.
// Always add a listener for this event! If you don't, errors will be silently dropped.
myStreamDeck.on('error', error => {
  console.error(error)
})

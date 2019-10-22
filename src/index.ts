import { openStreamDeck } from 'elgato-stream-deck'

const myStreamDeck = openStreamDeck() // Will throw an error if no Stream Decks are connected.

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

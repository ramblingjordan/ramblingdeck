import { listStreamDecks } from 'elgato-stream-deck'
import { DeckController } from './helpers/DeckController'
import { FileLoader } from './helpers/FileLoader'
import { KeyMap } from './models/Key'

const LAYOUT = 'development'

async function main () {
  if (listStreamDecks().length < 1) {
    console.log('-----------------------');
    console.log('No StreamDecks detected');
    console.log('-----------------------');
  } else {
    const sd = new DeckController()
    const fileLoader = new FileLoader()

    const infoBlockLength = 31
    const infoTitle = 'StreamDeck Info'
    const titleSpaces = (infoBlockLength - 2 - infoTitle.length) / 2
    const version = sd.getFirmwareVersion()
    const sn = sd.getSerialNumber()

    console.clear()
    console.log('--- Welcome to RamblingDeck ---')
    console.log('-'.repeat(infoBlockLength))
    console.log('|' + ' '.repeat(titleSpaces) + infoTitle + ' '.repeat(titleSpaces) + (infoBlockLength % 2 > 0 ? '' : ' ') + '|')
    console.log('|  Version: ' + version + ' '.repeat(infoBlockLength - 12 - version.length - 1) + '|')
    console.log('|  Serial #: ' + sn + ' '.repeat(infoBlockLength - 13 - sn.length - 1) + '|')
    console.log('-'.repeat(infoBlockLength))

    console.log('Loading keys to deck...')
    sd.keys = fileLoader.loadKeysFile('./layouts/' + LAYOUT + '/keys.yml')

    console.log('Loading and applying mapping...')
    sd.mapping = fileLoader.loadArrayFile<KeyMap>('./layouts/' + LAYOUT + '/maps/testing.yml')

    console.log('Starting deck listeners...')
    sd.startListeners()
  }
}

void main()

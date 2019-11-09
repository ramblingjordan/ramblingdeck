import { DeckController } from './helpers/DeckController'
import { FileLoader } from './helpers/FileLoader'
import { KeyMap } from './models/Key'

const LAYOUT = 'development'

async function main () {
  const sd = new DeckController()
  const fileLoader = new FileLoader()

  console.clear()
  console.log('--- Welcome to RamblingDeck ---')

  console.log('Loading keys to deck...')
  sd.keys = fileLoader.loadKeysFile('./layouts/' + LAYOUT + '/keys.yml')

  console.log('Loading and applying mapping...')
  sd.mapping = fileLoader.loadArrayFile<KeyMap>('./layouts/' + LAYOUT + '/maps/testing.yml')

  console.log('Starting deck listeners...')
  sd.startListeners()
}

void main()

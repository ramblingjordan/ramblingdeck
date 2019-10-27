"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StreamDeck_1 = require("./StreamDeck");
const Helpers_1 = require("./Helpers");
async function main() {
    const chalk = require('chalk');
    const helpers = new Helpers_1.Helpers();
    console.log(chalk.black.bgWhite('\n--- Welcome to RamblingDeck ---'));
    let keys = helpers.loadKeysFile('./layouts/keys.yml');
    const sd = new StreamDeck_1.StreamDeck(keys);
    let map = helpers.loadMapFile('./layouts/map.yml');
    sd.mapping = map;
    sd.applyMap();
    // Deck Listeners
    sd.onDown();
    sd.onUp();
    sd.onError();
}
// tslint:disable-next-line: no-floating-promises
main();
//# sourceMappingURL=index.js.map
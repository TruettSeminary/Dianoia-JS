export default class DeckEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    getDecks() {
        const path = '/deck'; 
        return this.fetcher.get({
            path
        }); 
    }
}
export default class CardEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    getCards() { 
        const path='/card'; 
        return this.fetcher.get({
            path
        }); 
    }
}
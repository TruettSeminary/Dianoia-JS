export default class TranslationEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    getTranslations() {
        const path = '/translation'; 
        return this.fetcher.get({
            path
        }); 
    }
}
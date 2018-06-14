export default class ClassEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    getClasses() {
        const path = '/class'; 
        return this.fetcher.get({
            path
        }); 
    }
}


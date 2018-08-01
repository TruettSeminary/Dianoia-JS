export default class AdminEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    getAllDecks() {
        const path = '/adminapi/deck'; 
        return this.fetcher.get({
            path
        }); 
    }

    getAllCards() { 
        const path='/adminapi/card'; 
        return this.fetcher.get({
            path
        }); 
    }

    getAllTranslations() {
        const path = '/adminapi/translation'; 
        return this.fetcher.get({
            path
        }); 
    }

    createTranslation({
        sentence, 
        name, 
        instructions, 
        scripture,
        decks, 
        metadata
    }) {
        const path = '/adminapi/translation'; 
        const body = {
            sentence, 
            name: name || '', 
            instructions: instructions || '',
            scripture: scripture || '', 
            decks: decks || [], 
            metadata: metadata || {}
        }; 

        return this.fetcher.post({
            path, 
            body
        }); 
    }

    updateTranslation({
        _id,
        sentence, 
        name, 
        instructions, 
        scripture,
        decks, 
        metadata
    }) {

        const path = `/adminapi/translation/${_id}`; 
        
        const body = {}; 

        if(sentence !== undefined) body.sentence = sentence; 
        if(name !== undefined) body.name = name; 
        if(instructions !== undefined) body.instructions = instructions; 
        if(scripture !== undefined) body.scripture = scripture; 
        if(decks !== undefined) body.decks = decks; 
        if(metadata !== undefined) body.metadata = metadata; 

        return this.fetcher.put({
            path,
            body
        }); 
    }

    deleteTranslation({
        _id
    }) {
        const path = `/adminapi/translation/${_id}`; 

        return this.fetcher.delete({
            path
        }); 
    }
}
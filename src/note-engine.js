export default class NoteEngine {
    constructor(fetcher) {
        this.fetcher = fetcher;
    }

    getNotes() {
        const path='/note'; 

        return this.fetcher.get({
            path
        }); 
    }

    addNote({
        note,
        card_id, 
        card_score, 
        view_status
    }) {

        const path = '/note'

        const body = {
            card_id
        };
        if(note) body.note = note; 
        if(card_score) body.card_score = card_score; 
        if(view_status) body.view_status = view_status; 

        return this.fetcher.post({
            path, 
            body
        })
    }

    updateNote({
        note_id,
        note, 
        card_score, 
        view_status
    }) {
        const path = `/note/${note_id}`;

        const body = {};
        if(note !== null) body.note = note; 
        if(card_score) body.card_score = card_score; 
        if(view_status) body.view_status = view_status; 

        return this.fetcher.put({
            path, 
            body
        });
    }

    addOrUpdateNote({
        _id,
        card, 
        note, 
        card_score, 
        view_status
    }) {
        const path = `/note/`

        const body = {}; 
        if(_id !== undefined) body._id = _id; 
        if(card !== undefined) body.card  = card; 
        if(card_score !== undefined) body.card_score = card_score; 
        if(note !== undefined) body.note = note; 
        if(view_status !== undefined) body.view_status = view_status; 

        return this.fetcher.patch({
            path,
            body
        }); 
    }
}
// TODO: add support for loading from config/.env file
import FetchEngine from './fetch-engine'; 
import UserEngine from './user-engine'; 
import ClassEngine from './class-engine';
import DeckEngine from './deck-engine';
import CardEngine from './card-engine'; 
import NoteEngine from './note-engine'; 
import TranslationEngine from './translation-engine'; 
import AdminEngine from './admin-engine'; 

class Dianoia {

    constructor({baseURL, jwt}) {
        this.baseURL = baseURL; 
        this.jwt = jwt ? jwt : ''; 
        this.fetcher = new FetchEngine(this.baseURL, this.jwt); 

        // create other gengine's that require a fetch engine
        this.userEngine = new UserEngine(this.fetcher); 
        this.classEngine = new ClassEngine(this.fetcher); 
        this.deckEngine = new DeckEngine(this.fetcher); 
        this.cardEngine = new CardEngine(this.fetcher); 
        this.noteEngine = new NoteEngine(this.fetcher); 
        this.translationEngine = new TranslationEngine(this.fetcher);
        this.adminEngine = new AdminEngine(this.fetcher); 
    }

    setJWT(jwt) {
        this.jwt = jwt; 
        this.fetcher.setJWT(jwt); 
    }

    registerUser(email, password, first_name, last_name) {
        return this.userEngine.register(email, password, first_name, last_name); 
    }

    loginUser(identifier, password) {
        return this.userEngine.login(identifier, password);  
    }

    getUser() {
        return this.userEngine.me(); 
    }

    updateUser(user_id, body) {
        return this.userEngine.update(user_id, body); 
    }

    sendForgotPasswordLink(email, url) {

        return this.userEngine.sendForgotPasswordLink(email, url); 
    }

    resetPassword(code, password, passwordConfirmation) {
        return this.userEngine.resetPassword(code, password, passwordConfirmation); 
    }

    getAllClasses() {
        return this.classEngine.getClasses(); 
    }

    addClassToUser(user, class_id) {
        return this.userEngine.addClass(user, class_id);
    }

    removeClassFromUser(user, class_id) {
        return this.userEngine.removeClass(user, class_id);
    }

    getAllDecks() {
        return this.deckEngine.getDecks(); 
    }

    addDeckToUser(user, deck_id) {
        return this.userEngine.addDeck(user, deck_id); 
    }

    removeDeckFromUser(user, deck_id) {
        return this.userEngine.removeDeck(user, deck_id); 
    }

    getAllCards() {
        return this.cardEngine.getCards(); 
    }

    getAllNotes() {
        return this.noteEngine.getNotes(); 
    }

    addUserNote({ note, card_id,  card_score, view_status }) {
        return this.noteEngine.addNote({
            note,
            card_id, 
            card_score, 
            view_status
        }); 
    }
    
    updateUserNote({ note_id, note, card_score, view_status }) {
        return this.noteEngine.updateNote({
            note_id,
            note,
            card_score, 
            view_status
        });
    }

    addOrUpdateUserNote({ _id, card, note, card_score, view_status}) {
        return this.noteEngine.addOrUpdateNote({
            _id,
            card,
            card_score,
            note,
            view_status
        }); 
    }

    getAllTranslations() {
        return this.translationEngine.getTranslations(); 
    }
}

export {
    Dianoia
}; 
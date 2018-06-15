export default class UserEngine {
    constructor(fetcher) {
        this.fetcher = fetcher; 
    }

    login(identifier, password) {
        const path = '/auth/local'; 
        return this.fetcher.post({
            path,
            body: {
                identifier, 
                password
            }
        }); 
    }

    me() {
        const path = '/user/me'; 
        return this.fetcher.get({path}); 
    }

    register(email, password, first_name, last_name) {
        const path = '/auth/local/register';
        return this.fetcher.post({
            path, 
            body: {
                username: email, 
                email, 
                password, 
                first_name, 
                last_name
            }
        });
    }

    update(user, body) {
        const path = `/user/${user._id}`;
        return this.fetcher.put({
            path,
            body
        }); 
    }

    sendForgotPasswordLink(email, url) {
        const path = '/auth/forgot-password'; 
        return this.fetcher.post({
            path, 
            body: {
                email, 
                url
            }
        })
        
    }

    updatePassword(user_id, password, code) {
        const path = '/auth/reset-password';
        return this.fetcher.post({
            path, 
            body: {

            }
        })
    }

    // TODO: watch out for issues with immutablejs
    addClass(user, class_id) {
        user.classes.push(class_id); 
        const body = {
            classes: user.classes
        }

        return this.update(user, body); 
    }

    removeClass(user, class_id) {
        // filter and set
        const classes = user.classes.filter((userClass_id) => {
            return userClass_id !== class_id; 
        });

        // TODO: remove all decks from a specific class from a user when a user removes a class. 

        const body = {
            classes
        }
        return this.update(user, body); 
    }

    addDeck(user, deck_id) {
        user.decks.push(deck_id); 
        const body = {
            decks: user.decks
        }

        return this.update(user, body); 
    }   

    removeDeck(user, deck_id) {
        // filter and set
        const decks = user.decks.filter((userDeck_id) => {
            return userDeck_id !== deck_id
        });

        const body = {
            decks
        }

        return this.update(user, body); 
    }

}


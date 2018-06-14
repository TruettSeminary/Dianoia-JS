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
        const classes = user.classes ? user.classes : []; 
        classes.push({
            "_id": `${class_id}`
        }); 
        const body = {
            classes: classes
        }

        return this.update(user, body); 
    }

    removeClass(user, class_id) {
        // filter and set
        const classes = user.classes.filter((clazz) => {
            return clazz._id !== class_id; 
        });

        const body = {
            classes
        }
        return this.update(user, body); 
    }

    addDeck(user, deck_id) {
        // push
    }   

    removeDeck(user, deck_id) {
        // filter and set
    }

}


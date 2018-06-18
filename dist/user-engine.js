'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserEngine = function () {
    function UserEngine(fetcher) {
        _classCallCheck(this, UserEngine);

        this.fetcher = fetcher;
    }

    _createClass(UserEngine, [{
        key: 'login',
        value: function login(identifier, password) {
            var path = '/auth/local';
            return this.fetcher.post({
                path: path,
                body: {
                    identifier: identifier,
                    password: password
                }
            });
        }
    }, {
        key: 'me',
        value: function me() {
            var path = '/user/me';
            return this.fetcher.get({ path: path });
        }
    }, {
        key: 'register',
        value: function register(email, password, first_name, last_name) {
            var path = '/auth/local/register';
            return this.fetcher.post({
                path: path,
                body: {
                    username: email,
                    email: email,
                    password: password,
                    first_name: first_name,
                    last_name: last_name
                }
            });
        }
    }, {
        key: 'update',
        value: function update(user, body) {
            var path = '/user/' + user._id;
            return this.fetcher.put({
                path: path,
                body: body
            });
        }
    }, {
        key: 'sendForgotPasswordLink',
        value: function sendForgotPasswordLink(email, url) {
            var path = '/auth/forgot-password';
            return this.fetcher.post({
                path: path,
                body: {
                    email: email,
                    url: url
                }
            });
        }
    }, {
        key: 'updatePassword',
        value: function updatePassword(user_id, password, code) {
            var path = '/auth/reset-password';
            return this.fetcher.post({
                path: path,
                body: {}
            });
        }

        // TODO: watch out for issues with immutablejs

    }, {
        key: 'addClass',
        value: function addClass(user, class_id) {
            user.classes.push(class_id);
            var body = {
                classes: user.classes
            };

            return this.update(user, body);
        }
    }, {
        key: 'removeClass',
        value: function removeClass(user, class_id) {
            // filter and set
            var classes = user.classes.filter(function (userClass_id) {
                return userClass_id !== class_id;
            });

            // TODO: remove all decks from a specific class from a user when a user removes a class. 

            var body = {
                classes: classes
            };
            return this.update(user, body);
        }
    }, {
        key: 'addDeck',
        value: function addDeck(user, deck_id) {
            user.decks.push(deck_id);
            var body = {
                decks: user.decks
            };

            return this.update(user, body);
        }
    }, {
        key: 'removeDeck',
        value: function removeDeck(user, deck_id) {
            // filter and set
            var decks = user.decks.filter(function (userDeck_id) {
                return userDeck_id !== deck_id;
            });

            var body = {
                decks: decks
            };

            return this.update(user, body);
        }
    }]);

    return UserEngine;
}();

exports.default = UserEngine;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Dianoia = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO: add support for loading from config/.env file


var _fetchEngine = require('./fetch-engine');

var _fetchEngine2 = _interopRequireDefault(_fetchEngine);

var _userEngine = require('./user-engine');

var _userEngine2 = _interopRequireDefault(_userEngine);

var _classEngine = require('./class-engine');

var _classEngine2 = _interopRequireDefault(_classEngine);

var _deckEngine = require('./deck-engine');

var _deckEngine2 = _interopRequireDefault(_deckEngine);

var _cardEngine = require('./card-engine');

var _cardEngine2 = _interopRequireDefault(_cardEngine);

var _noteEngine = require('./note-engine');

var _noteEngine2 = _interopRequireDefault(_noteEngine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dianoia = function () {
    function Dianoia(_ref) {
        var baseURL = _ref.baseURL,
            jwt = _ref.jwt;

        _classCallCheck(this, Dianoia);

        this.baseURL = baseURL;
        this.jwt = jwt ? jwt : '';
        this.fetcher = new _fetchEngine2.default(this.baseURL, this.jwt);

        // create other gengine's that require a fetch engine
        this.userEngine = new _userEngine2.default(this.fetcher);
        this.classEngine = new _classEngine2.default(this.fetcher);
        this.deckEngine = new _deckEngine2.default(this.fetcher);
        this.cardEngine = new _cardEngine2.default(this.fetcher);
        this.noteEngine = new _noteEngine2.default(this.fetcher);
    }

    _createClass(Dianoia, [{
        key: 'setJWT',
        value: function setJWT(jwt) {
            this.jwt = jwt;
            this.fetcher.setJWT(jwt);
        }
    }, {
        key: 'registerUser',
        value: function registerUser(email, password, first_name, last_name) {
            return this.userEngine.register(email, password, first_name, last_name);
        }
    }, {
        key: 'loginUser',
        value: function loginUser(identifier, password) {
            return this.userEngine.login(identifier, password);
        }
    }, {
        key: 'getUser',
        value: function getUser() {
            return this.userEngine.me();
        }
    }, {
        key: 'updateUser',
        value: function updateUser(user_id, body) {
            return this.userEngine.update(user_id, body);
        }
    }, {
        key: 'sendForgotPasswordLink',
        value: function sendForgotPasswordLink(email, url) {

            return this.userEngine.sendForgotPasswordLink(email, url);
        }
    }, {
        key: 'resetPassword',
        value: function resetPassword(code, password, passwordConfirmation) {
            return this.userEngine.resetPassword(code, password, passwordConfirmation);
        }
    }, {
        key: 'getAllClasses',
        value: function getAllClasses() {
            return this.classEngine.getClasses();
        }
    }, {
        key: 'addClassToUser',
        value: function addClassToUser(user, class_id) {
            return this.userEngine.addClass(user, class_id);
        }
    }, {
        key: 'removeClassFromUser',
        value: function removeClassFromUser(user, class_id) {
            return this.userEngine.removeClass(user, class_id);
        }
    }, {
        key: 'getAllDecks',
        value: function getAllDecks() {
            return this.deckEngine.getDecks();
        }
    }, {
        key: 'addDeckToUser',
        value: function addDeckToUser(user, deck_id) {
            return this.userEngine.addDeck(user, deck_id);
        }
    }, {
        key: 'removeDeckFromUser',
        value: function removeDeckFromUser(user, deck_id) {
            return this.userEngine.removeDeck(user, deck_id);
        }
    }, {
        key: 'getAllCards',
        value: function getAllCards() {
            return this.cardEngine.getCards();
        }
    }, {
        key: 'getAllNotes',
        value: function getAllNotes() {
            return this.noteEngine.getNotes();
        }
    }, {
        key: 'addUserNote',
        value: function addUserNote(_ref2) {
            var note = _ref2.note,
                card_id = _ref2.card_id,
                card_score = _ref2.card_score,
                view_status = _ref2.view_status;

            return this.noteEngine.addNote({
                note: note,
                card_id: card_id,
                card_score: card_score,
                view_status: view_status
            });
        }
    }, {
        key: 'updateUserNote',
        value: function updateUserNote(_ref3) {
            var note_id = _ref3.note_id,
                note = _ref3.note,
                card_score = _ref3.card_score,
                view_status = _ref3.view_status;

            return this.noteEngine.updateNote({
                note_id: note_id,
                note: note,
                card_score: card_score,
                view_status: view_status
            });
        }
    }]);

    return Dianoia;
}();

exports.Dianoia = Dianoia;
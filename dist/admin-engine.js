'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminEngine = function () {
    function AdminEngine(fetcher) {
        _classCallCheck(this, AdminEngine);

        this.fetcher = fetcher;
    }

    _createClass(AdminEngine, [{
        key: 'getAllDecks',
        value: function getAllDecks() {
            var path = '/adminapi/deck';
            return this.fetcher.get({
                path: path
            });
        }
    }, {
        key: 'getAllCards',
        value: function getAllCards() {
            var path = '/adminapi/card';
            return this.fetcher.get({
                path: path
            });
        }
    }, {
        key: 'getAllTranslations',
        value: function getAllTranslations() {
            var path = '/adminapi/translation';
            return this.fetcher.get({
                path: path
            });
        }
    }, {
        key: 'createTranslation',
        value: function createTranslation(_ref) {
            var sentence = _ref.sentence,
                name = _ref.name,
                instructions = _ref.instructions,
                scripture = _ref.scripture,
                decks = _ref.decks,
                metadata = _ref.metadata;

            var path = '/adminapi/translation';
            var body = {
                sentence: sentence,
                name: name || '',
                instructions: instructions || '',
                scripture: scripture || '',
                decks: decks || [],
                metadata: metadata || {}
            };

            return this.fetcher.post({
                path: path,
                body: body
            });
        }
    }, {
        key: 'updateTranslation',
        value: function updateTranslation(_ref2) {
            var _id = _ref2._id,
                sentence = _ref2.sentence,
                name = _ref2.name,
                instructions = _ref2.instructions,
                scripture = _ref2.scripture,
                decks = _ref2.decks,
                metadata = _ref2.metadata;


            var path = '/adminapi/translation/' + _id;

            var body = {};

            if (sentence !== undefined) body.sentence = sentence;
            if (name !== undefined) body.name = name;
            if (instructions !== undefined) body.instructions = instructions;
            if (scripture !== undefined) body.scripture = scripture;
            if (decks !== undefined) body.decks = decks;
            if (metadata !== undefined) body.metadata = metadata;

            return this.fetcher.put({
                path: path,
                body: body
            });
        }
    }, {
        key: 'deleteTranslation',
        value: function deleteTranslation(_ref3) {
            var _id = _ref3._id;

            var path = '/adminapi/translation/' + _id;

            return this.fetcher.delete({
                path: path
            });
        }
    }]);

    return AdminEngine;
}();

exports.default = AdminEngine;
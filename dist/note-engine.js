'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NoteEngine = function () {
    function NoteEngine(fetcher) {
        _classCallCheck(this, NoteEngine);

        this.fetcher = fetcher;
    }

    _createClass(NoteEngine, [{
        key: 'getNotes',
        value: function getNotes() {
            var path = '/note';

            return this.fetcher.get({
                path: path
            });
        }
    }, {
        key: 'addNote',
        value: function addNote(_ref) {
            var note = _ref.note,
                card_id = _ref.card_id,
                card_score = _ref.card_score,
                view_status = _ref.view_status;


            var path = '/note';

            var body = {
                card_id: card_id
            };
            if (note) body.note = note;
            if (card_score) body.card_score = card_score;
            if (view_status) body.view_status = view_status;

            return this.fetcher.post({
                path: path,
                body: body
            });
        }
    }, {
        key: 'updateNote',
        value: function updateNote(_ref2) {
            var note_id = _ref2.note_id,
                note = _ref2.note,
                card_score = _ref2.card_score,
                view_status = _ref2.view_status;

            var path = '/note/' + note_id;

            var body = {};
            if (note !== null) body.note = note;
            if (card_score) body.card_score = card_score;
            if (view_status) body.view_status = view_status;

            return this.fetcher.put({
                path: path,
                body: body
            });
        }
    }]);

    return NoteEngine;
}();

exports.default = NoteEngine;
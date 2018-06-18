'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardEngine = function () {
    function CardEngine(fetcher) {
        _classCallCheck(this, CardEngine);

        this.fetcher = fetcher;
    }

    _createClass(CardEngine, [{
        key: 'getCards',
        value: function getCards() {
            var path = '/card';
            return this.fetcher.get({
                path: path
            });
        }
    }]);

    return CardEngine;
}();

exports.default = CardEngine;
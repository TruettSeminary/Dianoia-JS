'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    CONNECT: 'CONNECT',
    TRACE: 'TRACE'
};

var FetchEngine = function () {
    function FetchEngine(baseURL, jwt) {
        var _this = this;

        _classCallCheck(this, FetchEngine);

        this.baseURL = baseURL;

        this.setJWT = function (jwt) {
            _this.jwt = jwt;
            var headerOptions = {
                'Content-Type': 'application/json'
            };
            if (jwt !== null && jwt !== '') {
                headerOptions['Authorization'] = 'Bearer ' + _this.jwt;
            }
            _this.headers = new _nodeFetch.Headers(headerOptions);
        };

        this.setJWT(jwt);
    }

    _createClass(FetchEngine, [{
        key: 'generateRequest',
        value: function generateRequest(method, url, body) {
            // return a new request object
            // TODO: check on credentials
            // TODO: chekc on "mode" setting to ensure cors is allowed
            var init = {
                method: method,
                headers: this.headers,
                credentials: 'omit'
            };

            if (body && ![HTTP_METHODS.GET, HTTP_METHODS.HEAD].includes(method)) {
                init['body'] = JSON.stringify(body);
            }

            return new _nodeFetch.Request(url, init);
        }
    }, {
        key: 'generateURL',
        value: function generateURL(path) {
            var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            // TODO: validate path is formatted correctly
            var url = this.baseURL + path;
            Object.keys(params).forEach(function (key, index) {
                if (index === 0) url += '?';else url += '&';
                url += key + '=' + params[key];
            });

            return url;
        }
    }, {
        key: 'parseJSON',
        value: function parseJSON(response) {
            return response.json ? response.json() : response;
        }
    }, {
        key: 'checkStatus',
        value: function checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }

            return this.parseJSON(response).then(function (responseFormatted) {
                var error = new Error(response.statusText);
                error.response = response;
                error.response.payload = responseFormatted;
                throw error;
            });
        }
    }, {
        key: 'request',
        value: function request(_ref) {
            var _this2 = this;

            var method = _ref.method,
                path = _ref.path,
                params = _ref.params,
                body = _ref.body;

            var url = this.generateURL(path, params);
            return (0, _nodeFetch2.default)(this.generateRequest(method, url, body)).then(function (res) {
                return _this2.checkStatus(res);
            }).then(function (res) {
                return _this2.parseJSON(res);
            }).then(function (response) {
                return response;
            });
        }
    }, {
        key: 'get',
        value: function get(_ref2) {
            var path = _ref2.path,
                params = _ref2.params;

            return this.request({
                method: HTTP_METHODS.GET,
                path: path,
                params: params
            });
        }
    }, {
        key: 'post',
        value: function post(_ref3) {
            var path = _ref3.path,
                params = _ref3.params,
                body = _ref3.body;

            return this.request({
                method: HTTP_METHODS.POST,
                path: path,
                params: params,
                body: body
            });
        }
    }, {
        key: 'put',
        value: function put(_ref4) {
            var path = _ref4.path,
                params = _ref4.params,
                body = _ref4.body;

            return this.request({
                method: HTTP_METHODS.PUT,
                path: path,
                params: params,
                body: body
            });
        }
    }, {
        key: 'delete',
        value: function _delete(_ref5) {
            var path = _ref5.path,
                params = _ref5.params,
                body = _ref5.body;

            return this.request({
                method: HTTP_METHODS.DELETE,
                path: path,
                params: params,
                body: body
            });
        }
    }]);

    return FetchEngine;
}();

exports.default = FetchEngine;
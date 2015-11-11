'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

exports['default'] = {
  name: 'querystring',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (options.lookupQuerystring !== undefined && typeof req !== 'undefined') {
      if (req.query) {
        found = req.query[options.lookupQuerystring];
      } else {
        var querystring = _url2['default'].parse(req.url, true);
        found = querystring.query[options.lookupQuerystring];
      }
    }

    return found;
  }
};
module.exports = exports['default'];
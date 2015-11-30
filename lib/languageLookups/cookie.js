'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cookies = require('cookies');

var _cookies2 = _interopRequireDefault(_cookies);

exports['default'] = {
  name: 'cookie',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (options.lookupCookie && typeof req !== 'undefined') {
      if (req.cookies) {
        found = req.cookies[options.lookupCookie];
      } else {
        var cookies = new _cookies2['default'](req, res);
        found = cookies.get(options.lookupCookie);
      }
    }

    return found;
  },

  cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    if (options.lookupCookie && req !== 'undefined') {
      var cookies = new _cookies2['default'](req, res);

      var expirationDate = options.cookieExpirationDate;
      if (!expirationDate) {
        expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
      }

      cookies.set(options.lookupCookie, lng, { expires: expirationDate, domain: options.cookieDomain, httpOnly: false });
    }
  }
};
module.exports = exports['default'];
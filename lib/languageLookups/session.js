'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'session',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (options.lookupSession !== undefined && typeof req && req.session) {
      found = req.session[options.lookupSession];
    }

    return found;
  },

  cacheUserLanguage: function cacheUserLanguage(req, res, lng) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    if (options.lookupSession && req && req.session) {
      req.session[options.lookupSession] = lng;
    }
  }
};
module.exports = exports['default'];
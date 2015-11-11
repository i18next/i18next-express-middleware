'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'path',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (options.lookupFromPathIndex !== undefined && typeof req !== 'undefined') {
      var parts = req.originalUrl.split('/');

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};
module.exports = exports['default'];
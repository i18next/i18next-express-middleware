'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'path',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (req === undefined) {
      return found;
    }

    if (options.lookupPath !== undefined) {
      found = req.params[options.lookupPath];
    }

    if (!found && options.lookupFromPathIndex !== undefined) {
      var parts = req.originalUrl.split('/');
      if (parts[0] === '') {
        // Handle paths that start with a slash, i.e., '/foo' -> ['', 'foo']
        parts.shift();
      }

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};
module.exports = exports['default'];
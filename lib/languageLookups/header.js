'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  name: 'header',

  lookup: function lookup(req, res, options) {
    var found = undefined;

    if (typeof req !== 'undefined') {
      var headers = req.headers;
      if (!headers) return found;

      var locales = [];
      var acceptLanguage = headers['accept-language'];

      if (acceptLanguage) {
        (function () {
          var lngs = [],
              i = undefined;

          // associate language tags by their 'q' value (between 1 and 0)
          acceptLanguage.split(',').forEach(function (l) {
            var parts = l.split(';'); // 'en-GB;q=0.8' -> ['en-GB', 'q=0.8']

            // get the language tag qvalue: 'q=0.8' -> 0.8
            var qvalue = 1; // default qvalue

            for (i = 0; i < parts.length; i++) {
              var part = parts[i].split('=');
              if (part[0] === 'q' && !isNaN(part[1])) {
                qvalue = Number(part[1]);
                break;
              }
            }

            // add the tag and primary subtag to the qvalue associations
            lngs.push({ lng: parts[0], q: qvalue });
          });

          lngs.sort(function (a, b) {
            return b.q - a.q;
          });

          for (i = 0; i < lngs.length; i++) {
            locales.push(lngs[i].lng);
          }

          if (locales.length) found = locales;
        })();
      }
    }

    return found;
  }
};
module.exports = exports['default'];
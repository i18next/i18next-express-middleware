'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _languageLookupsCookie = require('./languageLookups/cookie');

var _languageLookupsCookie2 = _interopRequireDefault(_languageLookupsCookie);

var _languageLookupsQuerystring = require('./languageLookups/querystring');

var _languageLookupsQuerystring2 = _interopRequireDefault(_languageLookupsQuerystring);

var _languageLookupsPath = require('./languageLookups/path');

var _languageLookupsPath2 = _interopRequireDefault(_languageLookupsPath);

var _languageLookupsHeader = require('./languageLookups/header');

var _languageLookupsHeader2 = _interopRequireDefault(_languageLookupsHeader);

var _languageLookupsSession = require('./languageLookups/session');

var _languageLookupsSession2 = _interopRequireDefault(_languageLookupsSession);

function getDefaults() {
  return {
    order: [/*'path', 'session' */'querystring', 'cookie', 'header'],
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupSession: 'lng',
    lookupFromPathIndex: 0,

    // cache user language
    caches: false // ['cookie']
    //cookieExpirationDate: new Date(),
    //cookieDomain: 'myDomain'
  };
}

var LanguageDetector = (function () {
  function LanguageDetector(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var allOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, LanguageDetector);

    this.type = 'languageDetector';
    this.detectors = {};

    this.init(services, options, allOptions);
  }

  _createClass(LanguageDetector, [{
    key: 'init',
    value: function init(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var allOptions = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      this.services = services;
      this.options = utils.defaults(options, this.options || {}, getDefaults());
      this.allOptions = allOptions;

      this.addDetector(_languageLookupsCookie2['default']);
      this.addDetector(_languageLookupsQuerystring2['default']);
      this.addDetector(_languageLookupsPath2['default']);
      this.addDetector(_languageLookupsHeader2['default']);
      this.addDetector(_languageLookupsSession2['default']);
    }
  }, {
    key: 'addDetector',
    value: function addDetector(detector) {
      this.detectors[detector.name] = detector;
    }
  }, {
    key: 'detect',
    value: function detect(req, res, detectionOrder) {
      var _this = this;

      if (arguments.length < 2) return;
      if (!detectionOrder) detectionOrder = this.options.order;

      var found = undefined;
      detectionOrder.forEach(function (detectorName) {
        if (found || !_this.detectors[detectorName]) return;

        var detections = _this.detectors[detectorName].lookup(req, res, _this.options);
        if (!detections) return;
        if (typeof detections === 'string') detections = [detections];

        detections.forEach(function (lng) {
          if (found) return;

          var cleanedLng = _this.services.languageUtils.formatLanguageCode(lng);

          if (_this.services.languageUtils.isWhitelisted(cleanedLng)) {
            found = cleanedLng;
            req.i18nextLookupName = detectorName;
          };
        });
      });

      return found || this.allOptions.fallbackLng && this.allOptions.fallbackLng[0];
    }
  }, {
    key: 'cacheUserLanguage',
    value: function cacheUserLanguage(req, res, lng, caches) {
      var _this2 = this;

      if (arguments.length < 3) return;
      if (!caches) caches = this.options.caches;
      if (!caches) return;
      caches.forEach(function (cacheName) {
        if (_this2.detectors[cacheName] && _this2.detectors[cacheName].cacheUserLanguage) _this2.detectors[cacheName].cacheUserLanguage(req, res, lng, _this2.options);
      });
    }
  }]);

  return LanguageDetector;
})();

LanguageDetector.type = 'languageDetector';

exports['default'] = LanguageDetector;
module.exports = exports['default'];
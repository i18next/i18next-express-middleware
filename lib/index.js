'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.handle = handle;
exports.getResourcesHandler = getResourcesHandler;
exports.missingKeyHandler = missingKeyHandler;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

var _LanguageDetector = require('./LanguageDetector');

var _LanguageDetector2 = _interopRequireDefault(_LanguageDetector);

var LanguageDetector = _LanguageDetector2['default'];

exports.LanguageDetector = LanguageDetector;

function handle(i18next) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (req, res, next) {
    var ignores = options.ignoreRoutes || [];
    ignores.forEach(function (ignore) {
      if (req.path.indexOf(ignore) > -1) return next();
    });

    var lng = req.lng;
    if (!req.lng && i18next.services.languageDetector) lng = i18next.services.languageDetector.detect(req, res);

    // set locale
    req.language = req.locale = req.lng = lng || i18next.options.fallbackLng[0];
    req.languages = i18next.services.languageUtils.toResolveHierarchy(lng);

    // assert t function returns always translation
    // in given lng inside this request
    var t = function t(key, options) {
      options = options || {};
      options.lng = options.lng || req.lng;
      return i18next.t(key, options);
    };

    var exists = function exists(key, options) {
      options = options || {};
      options.lng = options.lng || req.lng;
      return i18next.exists(key, options);
    };

    var i18n = {
      t: t,
      exists: exists,
      changeLanguage: function changeLanguage(lng) {
        req.lng = lng;
      },
      language: lng
    };

    // assert for req
    req.i18n = i18n;
    req.t = req.t || t;

    // assert for res -> template
    if (res.locals) {
      res.locals.t = t;
      res.locals.exists = exists;
      res.locals.i18n = i18n;
      res.locals.language = lng;
      res.locals.languageDir = i18next.dir(lng);
    }

    if (i18next.services.languageDetector) i18next.services.languageDetector.cacheUserLanguage(req, res, lng);

    // load resources
    i18next.loadLanguages(req.lng, function () {
      next();
    });
  };
}

;

function getResourcesHandler(i18next, options) {
  options = options || {};
  var maxAge = options.maxAge || 60 * 60 * 24 * 30;

  return function (req, res) {
    if (!i18next.services.backendConnector) return res.status(404).send('i18next-express-middleware:: no backend configured');

    var resources = {};

    res.contentType('json');
    if (options.cache !== undefined ? options.cache : process.env.NODE_ENV === 'production') {
      res.header('Cache-Control', 'public, max-age=' + maxAge);
      res.header('Expires', new Date(new Date().getTime() + maxAge * 1000).toUTCString());
    } else {
      res.header('Pragma', 'no-cache');
      res.header('Cache-Control', 'no-cache');
    }

    var languages = req.query[options.lngParam || 'lng'].split(' ') || [];
    var namespaces = req.query[options.nsParam || 'ns'].split(' ') || [];

    // extend ns
    namespaces.forEach(function (ns) {
      if (i18next.options.ns && i18next.options.ns.indexOf(ns) < 0) i18next.options.ns.push(ns);
    });

    i18next.services.backendConnector.load(languages, namespaces, function () {
      languages.forEach(function (lng) {
        namespaces.forEach(function (ns) {
          utils.setPath(resources, [lng, ns], i18next.getResourceBundle(lng, ns));
        });
      });

      res.send(resources);
    });
  };
}

;

function missingKeyHandler(i18next, options) {
  options = options || {};

  return function (req, res) {
    var lng = req.params[options.lngParam || 'lng'];
    var ns = req.params[options.nsParam || 'ns'];

    if (!i18next.services.backendConnector) return res.status(404).send('i18next-express-middleware:: no backend configured');

    for (var m in req.body) {
      i18next.services.backendConnector.saveMissing([lng], ns, m, req.body[m]);
    }
    res.send('ok');
  };
}

;
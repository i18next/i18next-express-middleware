# Introduction

This is a middleware to use i18next in express.js.

# Getting started

Source can be loaded via [npm](https://www.npmjs.com/package/i18next-express-middleware).

```
# npm package
$ npm install i18next-express-middleware
```

## wire up i18next to request object

```js
var i18next = require("i18next");
var middleware = require("i18next-express-middleware");
var express = require("express");

i18next.use(middleware.LanguageDetector).init({
  preload: ["en", "de", "it"],
  ...otherOptions
});

var app = express();
app.use(
  middleware.handle(i18next, {
    ignoreRoutes: ["/foo"], // or function(req, res, options, i18next) { /* return true to ignore */ }
    removeLngFromUrl: false
  })
);

// in your request handler
app.get("myRoute", function(req, res) {
  var lng = req.language; // 'de-CH'
  var lngs = req.languages; // ['de-CH', 'de', 'en']
  req.i18n.changeLanguage("en"); // will not load that!!! assert it was preloaded

  var exists = req.i18n.exists("myKey");
  var translation = req.t("myKey");
});

// in your views, eg. in pug (ex. jade)
div = t("myKey");
```

## add routes

```js
// missing keys
app.post("/locales/add/:lng/:ns", middleware.missingKeyHandler(i18next));

// multiload backend route
app.get("/locales/resources.json", middleware.getResourcesHandler(i18next));
```

## add localized routes

You can add your routes directly to the express app

```js
var express = require("express"),
  app = express(),
  i18next = require("i18next"),
  FilesystemBackend = require("i18next-node-fs-backend"),
  i18nextMiddleware = require("i18next-express-middleware"),
  port = 3000;

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({ preload: ["en", "de", "it"], ...otherOptions }, function() {
    i18nextMiddleware.addRoute(
      i18next,
      "/:lng/key-to-translate",
      ["en", "de", "it"],
      app,
      "get",
      function(req, res) {
        //endpoint function
      }
    );
  });
app.use(i18nextMiddleware.handle(i18next));
app.listen(port, function() {
  console.log("Server listening on port", port);
});
```

or to an express router

```js
var express = require("express"),
  app = express(),
  i18next = require("i18next"),
  FilesystemBackend = require("i18next-node-fs-backend"),
  i18nextMiddleware = require("i18next-express-middleware"),
  router = require("express").Router(),
  port = 3000;

i18next
  .use(i18nextMiddleware.LanguageDetector)
  .use(FilesystemBackend)
  .init({ preload: ["en", "de", "it"], ...otherOptions }, function() {
    i18nextMiddleware.addRoute(
      i18next,
      "/:lng/key-to-translate",
      ["en", "de", "it"],
      router,
      "get",
      function(req, res) {
        //endpoint function
      }
    );
    app.use("/", router);
  });
app.use(i18nextMiddleware.handle(i18next));
app.listen(port, function() {
  console.log("Server listening on port", port);
});
```

## language detection

Detects user language from current request. Comes with support for:

- path
- cookie
- header
- querystring
- session

Wiring up:

```js
var i18next = require("i18next");
var middleware = require("i18next-express-middleware");

i18next.use(middleware.LanguageDetector).init(i18nextOptions);
```

As with all modules you can either pass the constructor function (class) to the i18next.use or a concrete instance.

## Detector Options

```js
{
  // order and from where user language should be detected
  order: [/*'path', 'session', */ 'querystring', 'cookie', 'header'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupSession: 'lng',
  lookupPath: 'lng',
  lookupFromPathIndex: 0,

  // cache user language
  caches: false, // ['cookie']

  // optional expire and domain for set cookie
  cookieExpirationDate: new Date(),
  cookieDomain: 'myDomain',
  cookieSecure: true // if need secure cookie
}
```

Options can be passed in:

**preferred** - by setting options.detection in i18next.init:

```js
var i18next = require("i18next");
var middleware = require("i18next-express-middleware");

i18next.use(middleware.LanguageDetector).init({
  detection: options
});
```

on construction:

```js
var middleware = require("i18next-express-middleware");
var lngDetector = new middleware.LanguageDetector(null, options);
```

via calling init:

```js
var middleware = require("i18next-express-middleware");

var lngDetector = new middleware.LanguageDetector();
lngDetector.init(options);
```

## Adding own detection functionality

### interface

```js
module.exports {
  name: 'myDetectorsName',

  lookup: function(req, res, options) {
    // options -> are passed in options
    return 'en';
  },

  cacheUserLanguage: function(req, res, lng, options) {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};
```

### adding it

```js
var i18next = require("i18next");
var middleware = require("i18next-express-middleware");

var lngDetector = new middleware.LanguageDetector();
lngDetector.addDetector(myDetector);

i18next.use(lngDetector).init({
  detection: options
});
```

---

<h3 align="center">Gold Sponsors</h3>

<p align="center">
  <a href="https://locize.com/" target="_blank">
    <img src="https://raw.githubusercontent.com/i18next/i18next/master/assets/locize_sponsor_240.gif" width="240px">
  </a>
</p>

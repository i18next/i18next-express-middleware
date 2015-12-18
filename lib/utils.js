'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setPath = setPath;
exports.defaults = defaults;
exports.extend = extend;
exports.removeLngFromUrl = removeLngFromUrl;

function setPath(object, path, newValue) {
  var stack = undefined;
  if (typeof path !== 'string') stack = [].concat(path);
  if (typeof path === 'string') stack = path.split('.');

  while (stack.length > 1) {
    var _key = stack.shift();
    if (_key.indexOf('###') > -1) _key = _key.replace(/###/g, '.');
    if (!object[_key]) object[_key] = {};
    object = object[_key];
  }

  var key = stack.shift();
  if (key.indexOf('###') > -1) key = key.replace(/###/g, '.');
  object[key] = newValue;
}

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

function extend(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

function removeLngFromUrl(url, lookupFromPathIndex) {
  var first = '';
  var pos = lookupFromPathIndex;

  if (url[0] === '/') {
    pos++;
    first = '/';
  }

  // Build new url
  var parts = url.split('/');
  parts.splice(pos, 1);
  url = parts.join('/');
  if (url[0] !== '/') url = first + url;

  return url;
}
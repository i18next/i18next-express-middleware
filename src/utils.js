export function setPath(object, path, newValue) {
  let stack;
  if (typeof path !== 'string') stack = [].concat(path);
  if (typeof path === 'string') stack = path.split('.');

  while(stack.length > 1) {
    let key = stack.shift();
    if (key.indexOf('###') > -1) key = key.replace(/###/g, '.');
    if (!object[key]) object[key] = {};
    object = object[key];
  }

  let key = stack.shift();
  if (key.indexOf('###') > -1) key = key.replace(/###/g, '.');
  object[key] = newValue;
}

let arr = [];
let each = arr.forEach;
let slice = arr.slice;

export function defaults(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

export function extend(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

export function removeLngFromUrl(url, lookupFromPathIndex) {
  let first = '';
  let pos = lookupFromPathIndex;

  if (url[0] === '/') {
    pos++;
    first = '/';
  }

  // Build new url
  let parts = url.split('/');
  parts.splice(pos,1);
  url = parts.join('/');
  if (url[0] !== '/') url = first + url;

  return url;
}

export default {
  name: 'path',

  lookup(req, res, options) {
    let found;

    if (options.lookupFromPathIndex !== undefined && typeof req !== 'undefined') {
      let parts = req.originalUrl.split('/');
      if(parts[0] === '') { // Handle paths that start with a slash, i.e., '/foo' -> ['', 'foo']
        parts.shift();
      }

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};

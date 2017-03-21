export default {
  name: 'path',

  lookup (req, res, options) {
    let found;

    if (req === undefined) {
      return found;
    }

    if (options.lookupPath !== undefined) {
      found = req.params[options.lookupPath];
    }

    if (!found && options.lookupFromPathIndex !== undefined) {
      let path = req.originalUrl.split('?')[0];
      let parts = path.split('/');
      if (parts[0] === '') { // Handle paths that start with a slash, i.e., '/foo' -> ['', 'foo']
        parts.shift();
      }

      if (parts.length > options.lookupFromPathIndex) {
        found = parts[options.lookupFromPathIndex];
      }
    }

    return found;
  }
};

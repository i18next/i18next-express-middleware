import url from 'url';

export default {
  name: 'querystring',

  lookup(req, res, options) {
    let found;

    if (options.lookupQuerystring !== undefined && typeof req !== 'undefined') {
      if (req.query) {
        found = req.query[options.lookupQuerystring];
      } else {
        let querystring = url.parse(req.url, true);
        found = querystring.query[options.lookupQuerystring];
      }
    }

    return found;
  }
};

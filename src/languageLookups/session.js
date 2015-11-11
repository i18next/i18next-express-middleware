export default {
  name: 'session',

  lookup(req, res, options) {
    let found;

    if (options.lookupSession !== undefined && typeof req && req.session) {
      found = req.session[options.lookupSession];
    }

    return found;
  },

  cacheUserLanguage(req, res, lng, options = {}) {
    if (options.lookupSession && req && req.session) {
      req.session[options.lookupSession] = lng;
    }
  }
};

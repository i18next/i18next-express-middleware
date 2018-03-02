import * as utils from './utils';
import cookieLookup from './languageLookups/cookie';
import querystringLookup from './languageLookups/querystring';
import pathLookup from './languageLookups/path';
import headerLookup from './languageLookups/header';
import sessionLookup from './languageLookups/session';

function getDefaults() {
  return {
    order: [/*'path', 'session' */ 'querystring', 'cookie', 'header'],
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

class LanguageDetector {
  constructor(services, options = {}, allOptions = {}) {
    this.type = 'languageDetector';
    this.detectors = {};

    this.init(services, options, allOptions);
  }

  init(services, options = {}, allOptions = {}) {
    this.services = services;
    this.options = utils.defaults(options, this.options || {}, getDefaults());
    this.allOptions = allOptions;

    this.addDetector(cookieLookup);
    this.addDetector(querystringLookup);
    this.addDetector(pathLookup);
    this.addDetector(headerLookup);
    this.addDetector(sessionLookup);
  }

  addDetector(detector) {
    this.detectors[detector.name] = detector;
  }

  detect(req, res, detectionOrder) {
    if (arguments.length < 2) return;
    if (!detectionOrder) detectionOrder = this.options.order;

    let found;
    detectionOrder.forEach(detectorName => {
      if (found || !this.detectors[detectorName]) return;

      let detections = this.detectors[detectorName].lookup(req, res, this.options);
      if(!detections) return;
      if (!Array.isArray(detections)) detections = [detections];

      detections.forEach(lng => {
        if (found || typeof lng !== 'string') return;

        let cleanedLng = this.services.languageUtils.formatLanguageCode(lng);

        if (this.services.languageUtils.isWhitelisted(cleanedLng)) {
          found = cleanedLng;
          req.i18nextLookupName = detectorName;
        };
      });
    });
    
    if (!found) {
      let fallbacks = this.allOptions.fallbackLng;
      if (!fallbacks) fallbacks = [];
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      
      found = fallbacks[0];
      found = found || fallbacks.default
    };

    return found;
  }

  cacheUserLanguage(req, res, lng, caches) {
    if (arguments.length < 3) return;
    if (!caches) caches = this.options.caches;
    if (!caches) return;
    caches.forEach(cacheName => {
      if (this.detectors[cacheName] && this.detectors[cacheName].cacheUserLanguage) this.detectors[cacheName].cacheUserLanguage(req, res, lng, this.options);
    });
  }
}

LanguageDetector.type = 'languageDetector';

export default LanguageDetector;

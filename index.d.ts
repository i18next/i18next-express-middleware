import * as express from 'express';
import * as i18next from 'i18next';


declare module 'i18next-express-middleware' {
  type I18next = i18next.i18n;
  type IgnoreRoutesFunction = (req: express.Request, res: express.Response, options: HandleOptions, i18next: I18next) => boolean;
  type App = express.Application | express.Router;

  type I18NextRequest = express.Request & {
    language: string;
    languages: string[];
    i18n:i18next.i18n;
    t:i18next.TFunction;
  }

  interface HandleOptions {
    ignoreRoutes?: string[] | IgnoreRoutesFunction;
    removeLngFromUrl?: boolean;
  }
  interface GetResourcesHandlerOptions {
    maxAge?: number;
    cache?: boolean;
    lngParam?: string;
    nsParam?: string;
  }
  interface MissingKeyHandlerOptions {
    lngParam?: string;
    nsParam?: string;
  }

  export function handle(i18next: I18next, options?: HandleOptions): express.Handler;
  export function getResourcesHandler(i18next: I18next, options?: GetResourcesHandlerOptions): express.Handler;
  export function missingKeyHandler(i18next: I18next, options?: MissingKeyHandlerOptions): express.Handler;
  export function addRoute(i18next: I18next, route: string, lngs: string[], app: App, verb: string, fc: express.RequestHandler): void;
  export function addRoute(i18next: I18next, route: string, lngs: string[], app: App, fc: express.RequestHandler): void;

  // LanguageDetector
  type LanguageDetectorServices = any;
  type LanguageDetectorOrder = string[];
  type LanguageDetectorCaches = boolean | string[];
  interface LanguageDetectorOptions {
    order?: LanguageDetectorOrder;
    lookupQuerystring?: string;
    lookupCookie?: string;
    lookupSession?: string;
    lookupFromPathIndex?: number;
    caches?: LanguageDetectorCaches;
    cookieExpirationDate?: Date;
    cookieDomain?: string;
  }
  interface LanguageDetectorAllOptions {
    fallbackLng: boolean | string | string[];
  }
  interface LanguageDetectorInterfaceOptions {
    [name: string]: any;
  }
  interface LanguageDetectorInterface {
    name: string;
    lookup: (req: express.Request, res: express.Response, options?: LanguageDetectorInterfaceOptions) => string | string[];

    cacheUserLanguage?: (req: express.Request, res: express.Response, lng: string, options?: object) => void;
  }

  export class LanguageDetector implements i18next.Module {
    type: "languageDetector";

    constructor(services: LanguageDetectorServices, options?: LanguageDetectorOptions, allOptions?: LanguageDetectorAllOptions);
    constructor(options?: LanguageDetectorOptions, allOptions?: LanguageDetectorAllOptions);

    init(services: LanguageDetectorServices, options?: LanguageDetectorOptions, allOptions?: LanguageDetectorAllOptions): void;
    init(options?: LanguageDetectorOptions, allOptions?: LanguageDetectorAllOptions): void;
    addDetector(detector: LanguageDetectorInterface): void;
    detect(req: express.Request, res: express.Response, detectionOrder: LanguageDetectorOrder): void;
    cacheUserLanguage(req: express.Request, res: express.Response, lng: string, caches: LanguageDetectorCaches): void;
  }
}
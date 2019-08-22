const http = require('http');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-middleware');
const Backend = require('i18next-node-fs-backend');

const port = process.env.PORT || 8080;

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/locales/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'de'],
    saveMissing: true
  });

const server = http.createServer((req, res) => {
  i18nextMiddleware.handle(i18next)(req, res, () => {
    res.end(req.t('home.title'));
  })
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

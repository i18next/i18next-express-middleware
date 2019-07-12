const express = require('express');
const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-locize-backend');

const app = express();
const port = process.env.PORT || 8080;

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    backend: {
      referenceLng: 'en',
      projectId: '79a28dc3-b858-44a4-9603-93455e9e8c65'
      // apiKey: 'do not show in production',
    },
    fallbackLng: 'en',
    preload: ['en', 'de'],
    debug: true,
    saveMissing: true
  });

app.use(i18nextMiddleware.handle(i18next));

app.get('/', (req, res) => {
  res.send(req.t('home.title'));
});

app.listen(port, err => {
  console.log(`Server is listening on port ${port}`);
});

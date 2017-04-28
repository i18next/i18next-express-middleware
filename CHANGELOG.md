### 1.0.5
- fixes persisting lng on calling changeLanguage [#918](https://github.com/i18next/i18next/issues/918)

### 1.0.4
- fixes rare issue in race condition of init call in cloned instance

### 1.0.3
- Fix path lookup logic where query was being included in path [PR125](https://github.com/i18next/i18next-express-middleware/pull/125)

### 1.0.2
- call next without loading languages if there is no lng

### 1.0.1
- fixes call to loadLanguages

### 1.0.0
- use an i18next instance clone instead of a pseudo/mock object, keep clone lng and req.lng in sync

### 0.4.0
- adds localized routes
- adds default export for es6 users not want to use named exports.default

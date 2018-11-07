### 1.5.0

- ignoreRoute can now be a function [#57](https://github.com/i18next/i18next-express-middleware/issues/57)

### 1.4.1

- Update locals on languageChanged [PR163](https://github.com/i18next/i18next-express-middleware/pull/163)

### 1.4.0

- Set Content-Language response header [PR159](https://github.com/i18next/i18next-express-middleware/pull/159)

### 1.3.2

- npm ignore example folder

### 1.3.1

- check if cookie secure already set [PR155](https://github.com/i18next/i18next-express-middleware/pull/155)

### 1.3.0

- allow setting of cookie secure [PR154](https://github.com/i18next/i18next-express-middleware/pull/154)

### 1.2.1

- add language detector to default export [PR153](https://github.com/i18next/i18next-express-middleware/pull/153)

### 1.2.0

- fixes cookie set crash on newer versions of express (v4) [PR151](https://github.com/i18next/i18next-express-middleware/pull/151)

### 1.1.1

- fixes 1.1.0 detection should return a string not an array

### 1.1.0

- support returning fallback language when is set as Object [PR146](https://github.com/i18next/i18next-express-middleware/pull/146)

### 1.0.11

- check if the headers are sent before cookies set [PR145](https://github.com/i18next/i18next-express-middleware/pull/145)

### 1.0.10

- Use a named function for the middleware over an anonymous [PR144](https://github.com/i18next/i18next-express-middleware/pull/144)

### 1.0.9

- Guard against non-string detections [PR141](https://github.com/i18next/i18next-express-middleware/pull/141)

### 1.0.7

- Fix path detection can crash app (if req.originalUrl is not set) [#137](https://github.com/i18next/i18next-express-middleware/pull/137)

### 1.0.6

- update cookie dependency adding overwrite flag [#127](https://github.com/i18next/i18next-express-middleware/issues/127)

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

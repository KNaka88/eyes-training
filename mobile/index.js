// DOMException is polyfilled via metro.config.js serializer.getPolyfills
// so it is available before any module (including React 19) is evaluated.
require('expo-router/entry');

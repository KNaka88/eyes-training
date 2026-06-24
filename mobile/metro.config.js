// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Block the parent monorepo's node_modules from being resolved to prevent
// duplicate native module conflicts (e.g. react@18 from root vs react@19 here).
const parentNodeModules = path.resolve(__dirname, '..', 'node_modules');
const escaped = parentNodeModules.replace(/[/\\]/g, '[/\\\\]');
config.resolver.blockList = new RegExp(`^${escaped}.*$`);

// Inject DOMException polyfill as a Metro-level polyfill so it runs
// before ANY module code — including React 19 internals — is evaluated.
// This is necessary because Hermes does not expose DOMException as a
// global and React 19 references it at module-evaluation time.
//
// Note: index.js or app/_layout.tsx are too late because they are
// modules; Metro polyfills run before the module registry is even built.
const originalGetPolyfills = config.serializer.getPolyfills
  ? config.serializer.getPolyfills.bind(config.serializer)
  : () => [];

config.serializer.getPolyfills = (ctx) => {
  return [
    path.join(__dirname, 'polyfills/dom-exception.js'),
    ...originalGetPolyfills(ctx),
  ];
};

module.exports = config;

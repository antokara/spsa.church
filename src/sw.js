workbox.LOG_LEVEL = 'debug';

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.skipWaiting
workbox.core.skipWaiting();

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.clientsClaim
workbox.core.clientsClaim();

// TODO: refactor/move cache names to constants

/**
 * handle the SPA root directory request and
 * any other non-file URL in the same domain
 */
// start by pre-caching our index html page
caches
  .open('index')
  .then(cache => cache.add('/').catch())
  .catch();
/**
 * custom matcher that only handles:
 *  - "navigate" requests
 *  - URLs that are not files (do not have a . in the pathname)
 *  - URLs that are not the webpack dev server socket (do not have 'sockjs-node/info' in the pathname)
 */
const matchCb = ({ url, request }) =>
  request.mode === 'navigate' &&
  !url.pathname.includes('.') &&
  !url.pathname.includes('sockjs-node/info');
/**
 * custom handler that attempts to load the pre-cached "/" request response and
 * if not already there, returns the fetch response from network.
 *
 * the same logic applies to ANY url requested since the custom matcher above, white-lists them.
 */
const handlerCb = ({ event }) => {
  return caches
    .open('index')
    .then(cache => {
      return cache
        .match(new Request('/'))
        .then(response => response || fetch(event.request));
    })
    .catch();
};
/**
 * register our custom match/route handler
 */
workbox.routing.registerRoute(matchCb, handlerCb);

// cache CMS assets
workbox.routing.registerRoute(
  new RegExp('https://images.takeshape.io/'),
  // @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.StaleWhileRevalidate.html
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'takeshape-cms-assets',
    // @see https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions
    matchOptions: {
      // that's required because the CDN uses the vary header and it's not worth trying to
      // match it here. To avoid using this flag, we would need to modify
      // src/helpers/preloader/preloadAsset.ts to use the same headers as the browser does.
      // ie. add the "accept: */*" header
      ignoreVary: true
    }
  })
);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365
      })
    ]
  })
);

// cache anything that webpack is aware of (through the workbox webpack plugin)
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// allow GA to work offline
workbox.googleAnalytics.initialize();

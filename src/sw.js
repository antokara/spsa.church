/* eslint-disable */
import { skipWaiting, clientsClaim } from 'workbox-core';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { initialize } from 'workbox-google-analytics';

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.skipWaiting
skipWaiting();

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.clientsClaim
clientsClaim();

// TODO: refactor/move cache names to constants

/**
 * handle the SPA root directory request and
 * any other non-file URL in the same domain
 */
// start by pre-caching our index html page
caches
  .open('index')
  .then((cache) => cache.add('/').catch())
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
    .then((cache) => {
      return cache
        .match(new Request('/'))
        .then((response) => response || fetch(event.request));
    })
    .catch();
};

/**
 * register our custom match/route handler
 */
registerRoute(matchCb, handlerCb);

// cache CMS assets
registerRoute(
  new RegExp('https://images.takeshape.io/'),
  // @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.strategies.StaleWhileRevalidate.html
  new StaleWhileRevalidate({
    cacheName: 'takeshape-cms-assets',
    // @see https://w3c.github.io/ServiceWorker/#dictdef-cachequeryoptions
    matchOptions: {
      // that's required because the CDN uses the vary header and it's not worth trying to
      // match it here. To avoid using this flag, we would need to modify
      // src/helpers/preloader/preloadAsset.ts to use the same headers as the browser does.
      // ie. add the "accept: */*" header
      ignoreVary: true,
    },
  })
);

// Cache the Google Fonts stylesheets with a stale while revalidate strategy.
registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);

// Cache the Google Fonts webfont files with a cache first strategy for 1 year.
registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
      }),
    ],
  })
);

// cache anything that webpack is aware of (through the workbox webpack plugin)
precacheAndRoute(self.__WB_MANIFEST);

// allow GA to work offline
initialize();

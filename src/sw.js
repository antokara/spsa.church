// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.skipWaiting
workbox.core.skipWaiting();

// @see https://developers.google.com/web/tools/workbox/reference-docs/latest/workbox.core#.clientsClaim
workbox.core.clientsClaim();

// cache CMS assets
workbox.routing.registerRoute(
  new RegExp('https://images.takeshape.io/'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'takeshape-cms-assets'
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

// TODO: enable google analytics
// workbox.googleAnalytics.initialize();

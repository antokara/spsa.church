// async function addToCache(url) {
//   const myCache = await window.caches.open('my-cache');
//   await myCache.addAll(url);
// }

/**
 * preloads the asset from the url provided.
 * if it fails, we do not retry or show any errors
 *
 * TODO: consider implementing a simple retry method or use a pkg for that
 */
const preloadAsset: (url: string) => void = (url: string): void => {
  window.caches
    .open('takeshape-cms-assets')
    .then((cache: Cache) => cache.add(url))
    .catch();
  // fetch(url, {
  //   method: 'GET',
  //   mode: 'cors',
  //   cache: 'default',
  //   credentials: 'same-origin',
  //   redirect: 'follow',
  //   referrer: 'client'
  // })
  //   .then()
  //   .catch();
};

export { preloadAsset };

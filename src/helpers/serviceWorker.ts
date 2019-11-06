/**
 * handles the service worker registration / initialization
 *
 * @returns Promise, if service worker is supported or undefined, if not
 */
const serviceWorker: () => Promise<ServiceWorkerRegistration> | undefined = ():
  | Promise<ServiceWorkerRegistration>
  | undefined => {
  // if service worker is supported
  if ('serviceWorker' in navigator) {
    const promise: Promise<ServiceWorkerRegistration> = new Promise(
      (
        resolve: (
          value?:
            | ServiceWorkerRegistration
            | PromiseLike<ServiceWorkerRegistration>
            | undefined
        ) => void,
        reject: (reason?: string) => void
      ): void =>
        // register it on page load
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('sw.js')
            .then(resolve)
            .catch(reject);
        })
    );
  }

  // not supported
  return;
};

export { serviceWorker };

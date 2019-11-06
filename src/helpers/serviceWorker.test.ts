import { serviceWorker } from './serviceWorker';

describe('serviceWorker function', () => {
  let result: Promise<ServiceWorkerRegistration> | undefined;

  describe('when serviceWorker is not supported', () => {
    beforeEach(() => {
      result = serviceWorker();
    });

    it('returns undefined', () => {
      expect(result).toBeUndefined();
    });
  });

  describe('when serviceWorker is supported', () => {
    // keep the "window.addEventListener" callback
    let loadCallback: Function;

    beforeEach(() => {
      // mock the "window.addEventListener" method
      Object.defineProperty(window, 'addEventListener', {
        value: jest.fn((e: string, cb: Function) => {
          if (e === 'load') {
            loadCallback = cb;
          }
        }),
        configurable: true
      });
    });

    describe('and registers successfuly', () => {
      beforeEach(() => {
        // mock the "navigator.serviceWorker" method
        Object.defineProperty(global.navigator, 'serviceWorker', {
          value: {
            register: jest.fn().mockImplementation(
              (swPath: string): Promise<string> =>
                new Promise(
                  (
                    resolve: (value?: string | undefined) => void,
                    reject: (reason?: string) => void
                  ): void => {
                    resolve(`successful-sw-registration:${swPath}`);
                  }
                )
            )
          },
          configurable: true
        });

        result = serviceWorker();
        // emulate window.load event
        loadCallback();
      });

      it('returns a promise', () => {
        expect(result).toBeInstanceOf(Promise);
      });

      it('resolves the Promise', () => {
        expect.assertions(1);

        return expect(result).resolves.toStrictEqual(
          'successful-sw-registration:sw.js'
        );
      });
    });

    describe('and fails to register', () => {
      beforeEach(() => {
        // mock the "navigator.serviceWorker" method
        Object.defineProperty(global.navigator, 'serviceWorker', {
          value: {
            register: jest.fn().mockImplementation(
              (swPath: string): Promise<string> =>
                new Promise(
                  (
                    resolve: (value?: string | undefined) => void,
                    reject: (reason?: string) => void
                  ): void => {
                    reject(`failed-sw-registration:${swPath}`);
                  }
                )
            )
          },
          configurable: true
        });

        result = serviceWorker();
        // emulate window.load event
        loadCallback();
      });

      it('returns a promise', () => {
        expect(result).toBeInstanceOf(Promise);
      });

      it('rejects the Promise', () => {
        expect.assertions(1);

        return expect(result).rejects.toStrictEqual(
          'failed-sw-registration:sw.js'
        );
      });
    });
  });
});

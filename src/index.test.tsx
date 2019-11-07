import * as React from 'react';

// type of our mock render function
type TRender = (C: JSX.Element) => JSX.Element;
// type of our mock react dom imported object
type TReactDom = {
  render: jest.Mock<TRender>;
};
// our uninitialized mock render function
let render: jest.Mock<TRender>;
// mock the react-dom Module
jest.mock(
  'react-dom',
  (): TReactDom => ({
    render
  })
);

// mock the App component
const App: () => JSX.Element = (): JSX.Element => <div>mocked component</div>;

// mock the App Module
jest.mock('src/containers/App', () => ({
  App
}));

// mock the service worker function
let serviceWorker: jest.Mock;
jest.mock('src/helpers/serviceWorker', () => ({
  serviceWorker
}));

describe('index function', () => {
  describe('without serviceWorker support', () => {
    beforeEach(() => {
      // initialize the mock render fn
      render = jest.fn();
      // initialize the mock service worker fn
      serviceWorker = jest.fn().mockReturnValue(undefined);
      // dynamically import the index, after our mocks
      import('./index');
    });
    afterEach(() => jest.resetModules());

    it('calls serviceWorker once', () => {
      expect(serviceWorker).toHaveBeenCalledTimes(1);
    });

    it('calls serviceWorker without arguments', () => {
      expect(serviceWorker).toHaveBeenCalledWith();
    });

    it('calls render once', () => {
      expect(render).toHaveBeenCalledTimes(1);
    });

    it('calls render with the App / root', () => {
      expect(render).toHaveBeenCalledWith(
        <App />,
        document.getElementById('root')
      );
    });
  });

  describe('with serviceWorker support that registers successfuly', () => {
    beforeEach(() => {
      // initialize the mock render fn
      render = jest.fn();
      // initialize the mock service worker fn
      serviceWorker = jest.fn().mockResolvedValue(true);
      // dynamically import the index, after our mocks
      import('./index');
    });
    afterEach(() => jest.resetModules());

    it('calls serviceWorker once', () => {
      expect(serviceWorker).toHaveBeenCalledTimes(1);
    });

    it('calls serviceWorker without arguments', () => {
      expect(serviceWorker).toHaveBeenCalledWith();
    });

    it('calls render once', () => {
      expect(render).toHaveBeenCalledTimes(1);
    });

    it('calls render with the App / root', () => {
      expect(render).toHaveBeenCalledWith(
        <App />,
        document.getElementById('root')
      );
    });
  });

  describe('with serviceWorker support that fails to register', () => {
    beforeEach(() => {
      // initialize the mock render fn
      render = jest.fn();
      // initialize the mock service worker fn
      serviceWorker = jest.fn().mockRejectedValue(false);
      // dynamically import the index, after our mocks
      import('./index');
    });
    afterEach(() => jest.resetModules());

    it('calls serviceWorker once', () => {
      expect(serviceWorker).toHaveBeenCalledTimes(1);
    });

    it('calls serviceWorker without arguments', () => {
      expect(serviceWorker).toHaveBeenCalledWith();
    });

    it('calls render once', () => {
      expect(render).toHaveBeenCalledTimes(1);
    });

    it('calls render with the App / root', () => {
      expect(render).toHaveBeenCalledWith(
        <App />,
        document.getElementById('root')
      );
    });
  });
});

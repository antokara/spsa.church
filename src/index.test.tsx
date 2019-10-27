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
jest.mock('src/components/App', () => ({
  App
}));

describe('index function', () => {
  beforeEach(() => {
    // initialize the mock render fn
    render = jest.fn();
    // dynamically import the index, after our mocks
    import('./index');
  });
  afterEach(() => jest.resetModules());

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

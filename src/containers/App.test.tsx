import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { Store } from 'redux';
import { DummyContainer } from 'src/containers/app.test/DummyContainer';
import {
  dummyStoreCreator,
  TActionSpy
} from 'src/containers/app.test/dummyStoreCreator';

describe('App container', () => {
  let App: React.FunctionComponent;
  let actionSpy: TActionSpy;
  let dummyStore: Store;

  beforeAll(async () => {
    // initialize the action spy fn
    actionSpy = jest.fn();

    // create the store
    dummyStore = dummyStoreCreator(actionSpy);

    // mock the store so that the Provider uses it
    jest.mock('src/helpers/store', () => ({
      store: dummyStore
    }));

    // mock the app component
    // we don't care about what the component does
    // but we do need a consistent test for the container
    // and we need a way to test the store/router providers
    jest.mock('src/components/App', () => ({
      App: DummyContainer
    }));

    ({ App } = await import('./App'));
  });

  let rr: RenderResult;
  let node: ChildNode | null;
  beforeEach(() => {
    actionSpy.mockClear();
    rr = render(<App />);
    node = rr.container.firstChild;
  });

  // this also covers the store provider,
  // since the "data-dummy-store-prop" props
  // are being populated by the react-redux connect
  // which needs the store in the context
  it('renders the div element', () => {
    expect(node).toMatchInlineSnapshot(`
      <div
        data-dummy-store-prop-aa="test-a"
        data-dummy-store-prop-bb="10"
        data-testid="dummy-test-id"
      >
        dummyComponent
      </div>
    `);
  });

  it('renders the link element for the web fonts', () => {
    const linkElements: HTMLCollection = document.head.getElementsByTagName(
      'link'
    );
    let linkElement: HTMLLinkElement | undefined;
    for (let i: number = 0; i < linkElements.length; i += 1) {
      const element: HTMLLinkElement | null = linkElements.item(
        i
      ) as HTMLLinkElement;
      if (
        element &&
        element.href ===
          'https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,500,700&subset=latin'
      ) {
        linkElement = element;
        break;
      }
    }

    expect(linkElement).toBeTruthy();
  });

  it('dispatches one action', () => {
    expect(actionSpy).toHaveBeenCalledTimes(1);
  });

  it('dispatches a Connected Router action', () => {
    expect(actionSpy).toHaveBeenCalledWith(expect.any(Object), {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        action: 'POP',
        isFirstRendering: true,
        location: {
          hash: '',
          pathname: '/',
          search: '',
          state: undefined
        }
      }
    });
  });

  // @todo check for hot
});

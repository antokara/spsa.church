import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { DummyContainer } from 'src/containers/app.test/DummyContainer';
import { IDummyStore } from 'src/containers/app.test/IDummyStore';

describe('App container', () => {
  let App: React.FunctionComponent;
  let dummyStore: MockStoreEnhanced<IDummyStore>;
  const defaultState: IDummyStore = {
    router: {
      action: 'POP',
      location: {
        hash: '',
        pathname: '/',
        search: '',
        state: undefined
      }
    },
    dummy: {
      dummyStorePropA: 'test-a',
      dummyStorePropB: 10
    }
  };

  beforeAll(async () => {
    // create the store
    dummyStore = configureStore<IDummyStore>([])(defaultState);

    // mock the store so that
    // the Providers in the container use it
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
  let actions: AnyAction[];
  beforeEach(() => {
    dummyStore.clearActions();
    rr = render(<App />);
    node = rr.container.firstChild;
    actions = dummyStore.getActions();
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
    expect(actions).toHaveLength(1);
  });

  it('dispatches a Connected Router action', () => {
    expect(actions).toEqual([
      {
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
      }
    ]);
  });

  // @todo check for hot
});

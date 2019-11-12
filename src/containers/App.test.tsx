import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { IMockStore } from 'src/containers/app.test/IMockStore';
import { MockComponent } from 'src/containers/app.test/MockComponent';
// import { MockApolloConsumer } from 'src/containers/app.test/MockApolloConsumer';
// import { MockReduxContainer } from 'src/containers/app.test/MockReduxContainer';

describe('App container', () => {
  let App: React.FunctionComponent;
  let mockStore: MockStoreEnhanced<IMockStore>;
  const defaultState: IMockStore = {
    router: {
      action: 'POP',
      location: {
        hash: '',
        pathname: '/',
        search: '',
        state: undefined
      }
    },
    mock: {
      mockStorePropA: 'test-a',
      mockStorePropB: 10
    }
  };
  let rr: RenderResult;
  let node: ChildNode | null;
  let actions: AnyAction[];

  beforeAll(() => {
    // create the store
    mockStore = configureStore<IMockStore>([])(defaultState);
  });

  beforeEach(async () => {
    // mock the store so that
    // the Providers in the container use it
    jest.doMock('src/helpers/store', () => ({
      store: mockStore
    }));

    // mock the Layout1 component
    // we don't care about what the component does
    // but we do need a consistent test for the container
    // and we need a way to test the store/router providers
    jest.doMock('src/components/layouts/Layout1', () => ({
      Layout1: MockComponent
    }));

    mockStore.clearActions();
    ({ App } = await import('./App'));
    rr = render(<App />);
    node = rr.container.firstChild;
    actions = mockStore.getActions();
  });

  // this test covers the following:
  //  - proper render of the component
  //  - access to the "Redux store" using the "Redux Provider"
  //  - access to the "Apollo client" using the "Apollo Provider"
  it('renders the container/consumer components', () => {
    expect(node).toMatchInlineSnapshot(`
      <div>
        <div
          data-client-cache-type="object"
          data-client-name="ApolloClient"
          data-client-query-type="function"
          data-client-store="DataStore"
          data-testid="mock-apollo-consumer"
        >
          MockApolloConsumer
        </div>
        <div
          data-mock-store-prop-aa="test-a"
          data-mock-store-prop-bb="10"
          data-testid="mock-redux-component"
        >
          mockReduxComponent
        </div>
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

  it('dispatches only one action', () => {
    expect(actions).toHaveLength(1);
  });

  it('dispatches the Connected Router action', () => {
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
});

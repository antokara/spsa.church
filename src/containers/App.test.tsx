import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { IMockStore } from 'src/containers/app.test/IMockStore';
import { MockContainer } from 'src/containers/app.test/MockContainer';

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
      Layout1: MockContainer
    }));

    mockStore.clearActions();
    ({ App } = await import('./App'));
    rr = render(<App />);
    node = rr.container.firstChild;
    actions = mockStore.getActions();
  });

  // this also covers the store provider,
  // since the "data-mock-store-prop" props
  // are being populated by the react-redux connect
  // which needs the store in the context
  it('renders the div element', () => {
    expect(node).toMatchInlineSnapshot(`
      <div
        data-mock-store-prop-aa="test-a"
        data-mock-store-prop-bb="10"
        data-testid="mock-test-id"
      >
        mockComponent
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

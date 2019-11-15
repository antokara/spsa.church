import { getByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { THEME } from 'src/constants/THEME';
import { IMockStore } from 'src/containers/app.test/IMockStore';
import { MockComponent } from 'src/containers/app.test/MockComponent';

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
    actions = mockStore.getActions();
  });

  describe('Apollo Provider', () => {
    beforeEach(() => {
      node = getByTestId(rr.container, 'mock-apollo-consumer');
    });

    it('renders the consumer component', () => {
      expect(node).toBeTruthy();
    });

    it('provides the client cache type', () => {
      expect(node).toHaveAttribute('data-client-cache-type', 'object');
    });

    it('provides the client name', () => {
      expect(node).toHaveAttribute('data-client-name', 'ApolloClient');
    });

    it('provides the client query type', () => {
      expect(node).toHaveAttribute('data-client-query-type', 'function');
    });
    it('provides the client store', () => {
      expect(node).toHaveAttribute('data-client-store', 'DataStore');
    });
  });

  describe('Redux Provider', () => {
    beforeEach(() => {
      node = getByTestId(rr.container, 'mock-redux-component');
    });

    it('renders the consumer component', () => {
      expect(node).toBeTruthy();
    });

    it('provides access to the "state.mock.mockStorePropA"', () => {
      expect(node).toHaveAttribute('data-mock-store-prop-aa', 'test-a');
    });

    it('provides access to the "state.mock.mockStorePropA"', () => {
      expect(node).toHaveAttribute('data-mock-store-prop-bb', '10');
    });
  });

  describe('Material UI Theme Provider', () => {
    beforeEach(() => {
      node = getByTestId(rr.container, 'mock-mui-theme-consumer');
    });

    it('renders the consumer component', () => {
      expect(node).toBeTruthy();
    });

    it('provides access to the "theme.palette.primary.main"', () => {
      expect(node).toHaveAttribute(
        'data-palette-primary-main',
        THEME.palette.primary.main
      );
    });

    it('provides access to the "theme.palette.secondary.main"', () => {
      expect(node).toHaveAttribute(
        'data-palette-secondary-main',
        THEME.palette.secondary.main
      );
    });

    it('provides access to the "theme.palette.text.primary"', () => {
      expect(node).toHaveAttribute(
        'data-palette-text-primary',
        THEME.palette.text.primary
      );
    });
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

  it('renders the style element for the Material UI CSS baseline', () => {
    const styleElements: HTMLCollection = document.head.getElementsByTagName(
      'style'
    );
    let styleElement: HTMLStyleElement | undefined;
    for (let i: number = 0; i < styleElements.length; i += 1) {
      const element: HTMLStyleElement | null = styleElements.item(
        i
      ) as HTMLStyleElement;
      if (
        element &&
        element.attributes.getNamedItem('data-meta')?.value === 'MuiCssBaseline'
      ) {
        styleElement = element;
        break;
      }
    }

    expect(styleElement).toBeTruthy();
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

import {
  getByTestId,
  queryByTestId,
  render,
  RenderResult
} from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { defaultState } from './app.test/defaultState';
import { shared } from './app.test/describe/shared';
import { describeOnSuccessfulLoad } from './app.test/describe/withoutMockingApollo/describeOnSuccessfulLoad/describeOnSuccessfulLoad';
import { describeWhileLoading } from './app.test/describe/withoutMockingApollo/describeWhileLoading';
import { IMockStore } from './app.test/IMockStore';
import { MockComponent } from './app.test/MockComponent';
import { MockPageErrorComponent } from './app.test/MockPageErrorComponent';
import { MockPageLoadingComponent } from './app.test/MockPageLoadingComponent';
import { waitForLoadingToEnd } from './app.test/waitForLoadingToEnd';

describe('App container', () => {
  let App: React.FunctionComponent;
  let mockStore: MockStoreEnhanced<IMockStore>;
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

    // mock page loading component
    jest.doMock('src/components/app/PageLoading', () => ({
      PageLoading: MockPageLoadingComponent
    }));

    // mock page error component
    jest.doMock('src/components/app/PageError', () => ({
      PageError: MockPageErrorComponent
    }));

    mockStore.clearActions();
  });

  afterEach(() => (shared.rr ? waitForLoadingToEnd(shared.rr) : null));

  describe('without mocking ApolloClientCreator', () => {
    beforeEach(async () => {
      ({ App } = await import('./App'));
      shared.rr = render(<App />);
      actions = mockStore.getActions();
    });

    describe('while loading', describeWhileLoading(shared));
    describe('on successful load', describeOnSuccessfulLoad(shared));

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
          element.attributes.getNamedItem('data-meta')?.value ===
            'MuiCssBaseline'
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
});

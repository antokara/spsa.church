import { queryByTestId, render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { AnyAction } from 'redux';
import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { defaultState } from 'src/containers/app.test/defaultState';
import { IMockStore } from 'src/containers/app.test/IMockStore';
import { MockComponent } from 'src/containers/app.test/MockComponent';
import { MockPageErrorComponent } from 'src/containers/app.test/MockPageErrorComponent';
import { MockPageLoadingComponent } from 'src/containers/app.test/MockPageLoadingComponent';
import { waitForLoadingToEnd } from 'src/containers/app.test/waitForLoadingToEnd';

describe('App container', () => {
  let App: React.FunctionComponent;
  let mockStore: MockStoreEnhanced<IMockStore>;
  let rr: RenderResult;
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

  describe('with mocking ApolloClientCreator to fail', () => {
    beforeEach(async () => {
      jest.doMock('src/helpers/ApolloClientCreator', () => ({
        ApolloClientCreator: (): Promise<Error> =>
          Promise.reject(new Error('failed'))
      }));

      ({ App } = await import('src/containers/App'));
      rr = render(<App />);
      actions = mockStore.getActions();
      await waitForLoadingToEnd(rr);
    });

    describe('PageError component', () => {
      let pageErrorNode: ChildNode | null;

      beforeEach(() => {
        pageErrorNode = queryByTestId(
          rr.container,
          'mock-page-error-component'
        );
      });

      it('gets rendered', () => {
        expect(pageErrorNode).toBeTruthy();
      });
    });
  });
});

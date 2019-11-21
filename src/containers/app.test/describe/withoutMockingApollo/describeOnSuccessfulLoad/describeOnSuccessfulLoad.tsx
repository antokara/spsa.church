import { getByTestId, queryByTestId } from '@testing-library/react';
import { TShared } from 'src/containers/app.test/describe/shared';
import { TDescribe } from 'src/containers/app.test/describe/TDescribe';
import { waitForLoadingToEnd } from 'src/containers/app.test/waitForLoadingToEnd';
import { describeApolloProvider } from './describeApolloProvider';
import { describeMUIProvider } from './describeMUIProvider';
import { describeReduxProvider } from './describeReduxProvider';

const describeOnSuccessfulLoad: TDescribe = (
  shared: TShared
): (() => void) => (): void => {
  let node: ChildNode | null;

  beforeEach(() => (shared.rr ? waitForLoadingToEnd(shared.rr) : null));

  describe('PageLoading component', () => {
    beforeEach(() => {
      node = getByTestId(shared.rr.container, 'mock-page-loading-component');
    });

    it('gets rendered', () => {
      expect(node).toBeTruthy();
    });
    it('has "visible" prop "false"', () => {
      expect(node).toHaveAttribute('data-visible', 'false');
    });
  });

  describe('PageError component', () => {
    beforeEach(() => {
      node = queryByTestId(shared.rr.container, 'mock-page-error-component');
    });

    it('does not get rendered', () => {
      expect(node).toBeFalsy();
    });
  });

  describe('Layout1 component', () => {
    beforeEach(() => {
      node = queryByTestId(shared.rr.container, 'mock-component');
    });
    it('gets rendered', () => {
      expect(node).toBeTruthy();
    });
  });

  describe('Apollo Provider', describeApolloProvider(shared));

  describe('Redux Provider', describeReduxProvider(shared));

  describe('Material UI Theme Provider', describeMUIProvider(shared));
};

export { describeOnSuccessfulLoad };

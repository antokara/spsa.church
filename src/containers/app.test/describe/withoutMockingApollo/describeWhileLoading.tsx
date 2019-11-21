import { getByTestId, queryByTestId } from '@testing-library/react';
import { TShared } from 'src/containers/app.test/describe/shared';
import { TDescribe } from 'src/containers/app.test/describe/TDescribe';

const describeWhileLoading: TDescribe = (
  shared: TShared
): (() => void) => (): void => {
  describe('PageLoading component', () => {
    let pageLoadingNode: ChildNode | null;

    beforeEach(() => {
      pageLoadingNode = getByTestId(
        shared.rr.container,
        'mock-page-loading-component'
      );
    });

    it('gets rendered', () => {
      expect(pageLoadingNode).toBeTruthy();
    });
    it('has "visible" prop "true"', () => {
      expect(pageLoadingNode).toHaveAttribute('data-visible', 'true');
    });
  });

  describe('PageError component', () => {
    let pageErrorNode: ChildNode | null;

    beforeEach(() => {
      pageErrorNode = queryByTestId(
        shared.rr.container,
        'mock-page-error-component'
      );
    });

    it('does not get rendered', () => {
      expect(pageErrorNode).toBeFalsy();
    });
  });

  describe('Layout1 component', () => {
    let layoutNode: ChildNode | null;

    beforeEach(() => {
      layoutNode = queryByTestId(shared.rr.container, 'mock-component');
    });
    it('does not get rendered', () => {
      expect(layoutNode).toBeNull();
    });
  });
};

export { describeWhileLoading };

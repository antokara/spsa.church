import { getByTestId } from '@testing-library/react';
import { TShared } from 'src/containers/app.test/describe/shared';
import { TDescribe } from 'src/containers/app.test/describe/TDescribe';

const describeReduxProvider: TDescribe = (
  shared: TShared
): (() => void) => (): void => {
  let node: ChildNode | null;

  beforeEach(() => {
    node = getByTestId(shared.rr.container, 'mock-redux-component');
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
};

export { describeReduxProvider };

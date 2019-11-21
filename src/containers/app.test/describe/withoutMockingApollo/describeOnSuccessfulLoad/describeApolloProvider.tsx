import { getByTestId } from '@testing-library/react';
import { TShared } from 'src/containers/app.test/describe/shared';
import { TDescribe } from 'src/containers/app.test/describe/TDescribe';

const describeApolloProvider: TDescribe = (
  shared: TShared
): (() => void) => (): void => {
  let node: ChildNode | null;

  beforeEach(() => {
    node = getByTestId(shared.rr.container, 'mock-apollo-consumer');
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
};

export { describeApolloProvider };

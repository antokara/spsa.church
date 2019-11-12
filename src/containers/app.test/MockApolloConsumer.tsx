import { ApolloClient } from 'apollo-client';
import * as React from 'react';
import { ApolloConsumer } from 'react-apollo';

// props for the mock component
type TProps = {
  mockStorePropAA: string;
  mockStorePropBB: number;
};

const fn: (client: ApolloClient<{}>) => JSX.Element = (
  client: ApolloClient<{}>
): JSX.Element => (
  <div
    data-testid="mock-apollo-consumer"
    data-client-name={client.constructor.name}
    data-client-store={client.store.constructor.name}
    data-client-query-type={typeof client.query}
    data-client-cache-type={typeof client.cache}
  >
    MockApolloConsumer
  </div>
);

/**
 * a mock functional component which consumes the apollo client
 */
const MockApolloConsumer: () => JSX.Element = (): JSX.Element => (
  <ApolloConsumer>{fn}</ApolloConsumer>
);

export { MockApolloConsumer };

import * as React from 'react';
import { MockApolloConsumer } from './MockApolloConsumer';
import { MockReduxContainer } from './MockReduxContainer';

/**
 * a mock functional component which wraps both
 * mock consumer/container for convenient testing in one go
 */
const MockComponent: () => JSX.Element = (): JSX.Element => (
  <div>
    <MockApolloConsumer />
    <MockReduxContainer />
  </div>
);

export { MockComponent };

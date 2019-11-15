import * as React from 'react';
import { MockApolloConsumer } from './MockApolloConsumer';
import { MockMUIThemeConsumer } from './MockMUIThemeConsumer';
import { MockReduxContainer } from './MockReduxContainer';

/**
 * a mock functional component which wraps all the
 * mock consumers/containers for convenient testing in one go
 */
const MockComponent: () => JSX.Element = (): JSX.Element => (
  <div>
    <MockApolloConsumer />
    <MockReduxContainer />
    <MockMUIThemeConsumer />
  </div>
);

export { MockComponent };

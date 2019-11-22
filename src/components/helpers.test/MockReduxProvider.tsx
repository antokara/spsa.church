import * as React from 'react';
import { Provider } from 'react-redux';
import {
  mockStoreCreator,
  TMockStore
} from 'src/components/helpers.test/mockStoreCreator';

type TProps = React.PropsWithChildren<{
  store?: TMockStore;
}>;

/**
 * a redux store provider with a mock store that has the default state,
 * unless a specific store in the prop.store is provided.
 *
 * It can be used to test components that need the redux store, easily
 */
const MockReduxProvider: React.FunctionComponent<TProps> = ({
  children,
  store = mockStoreCreator()
}: TProps): React.ReactElement<React.ReactNode> => (
  <Provider store={store}>{children}</Provider>
);

export { MockReduxProvider };

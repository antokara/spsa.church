import { default as configureStore, MockStoreEnhanced } from 'redux-mock-store';
import { defaultState, TState } from 'src/reducers/defaultState';

type TMockStore = MockStoreEnhanced<TState>;

/**
 * creates a mock store for use with any redux-store provider but
 * mostly for use with src/components/provider.test/MockReduxProvider.tsx
 *
 * @see src/components/provider.test/MockReduxProvider.tsx
 * @param initialState optional. If not provided, the default state will be used
 */
const mockStoreCreator: (initialState?: TState) => TMockStore = (
  initialState: TState = defaultState
): TMockStore => configureStore<TState>([])(initialState);

export { mockStoreCreator, TMockStore };

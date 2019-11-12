import * as React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { IMockStore } from './IMockStore';

// props for the mock component
interface IMapStateProps {
  mockStorePropAA: string;
  mockStorePropBB: number;
}

/**
 * a mock functional component which accepts
 * props mapped from the redux state
 */
const MockComponent: (props: IMapStateProps) => JSX.Element = (
  props: IMapStateProps
): JSX.Element => (
  <div
    data-testid="mock-test-id"
    data-mock-store-prop-aa={props.mockStorePropAA}
    data-mock-store-prop-bb={props.mockStorePropBB}
  >
    mockComponent
  </div>
);

const mapStateToProps: (state: IMockStore) => IMapStateProps = (
  state: IMockStore
): IMapStateProps => ({
  mockStorePropAA: state.mock.mockStorePropA,
  mockStorePropBB: state.mock.mockStorePropB
});

/**
 * a mock container for testing the existence of the redux store provider
 * in the context using the redux "connect" function
 */
const MockContainer: ConnectedComponent<
  (props: {}) => JSX.Element,
  Pick<{}, never>
> = connect<IMapStateProps>(mapStateToProps)(MockComponent);

export { MockContainer };

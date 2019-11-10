import * as React from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { IDummyStore } from './dummyStore';

// props for the dummy component
interface IMapStateProps {
  dummyStorePropAA: string;
  dummyStorePropBB: number;
}

// our dummy component
const DummyComponent: (props: IMapStateProps) => JSX.Element = (
  props: IMapStateProps
): JSX.Element => (
  <div
    data-testid="dummy-test-id"
    data-dummy-store-prop-aa={props.dummyStorePropAA}
    data-dummy-store-prop-bb={props.dummyStorePropBB}
  >
    dummyComponent
  </div>
);

const mapStateToProps: (state: IDummyStore) => IMapStateProps = (
  state: IDummyStore
): IMapStateProps => ({
  dummyStorePropAA: state.dummy.dummyStorePropA,
  dummyStorePropBB: state.dummy.dummyStorePropB
});

// our dummy container
const DummyContainer: ConnectedComponent<
  (props: {}) => JSX.Element,
  Pick<{}, never>
> = connect<IMapStateProps>(mapStateToProps)(DummyComponent);

export { DummyContainer };

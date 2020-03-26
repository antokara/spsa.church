import * as React from 'react';

type TProps = {
  visible: boolean;
};

/**
 * a mock functional component that is used in place of the PageLoading one
 */
const MockPageLoadingComponent: (props: TProps) => JSX.Element = ({
  visible,
}: TProps): JSX.Element => (
  <div data-testid="mock-page-loading-component" data-visible={visible}>
    MockPageLoadingComponent
  </div>
);

export { MockPageLoadingComponent };

import * as React from 'react';

type TProps = {
  error: Error;
};

/**
 * a mock functional component that is used in place of the PageError one
 */
const MockPageErrorComponent: (props: TProps) => JSX.Element = ({
  error,
}: TProps): JSX.Element => (
  <div
    data-testid="mock-page-error-component"
    data-error-message={error.message}
  >
    MockPageErrorComponent
  </div>
);

export { MockPageErrorComponent };

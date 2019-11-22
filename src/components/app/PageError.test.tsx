import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { MockThemeProvider } from 'src/components/helpers.test/MockThemeProvider';
import { PageError } from './PageError';

describe('PageError component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;
  let error: Error;

  beforeEach(() => {
    error = new Error('test error');
    rr = render(
      <MockThemeProvider>
        <PageError error={error} />
      </MockThemeProvider>
    );
    node = rr.container.firstChild;
  });

  it('renders the component', () => {
    expect(node).toMatchSnapshot();
  });

  it('renders the warning icon', () => {
    expect(rr.queryByTestId('warning-icon')).toBeTruthy();
  });

  it('renders the error message', () => {
    expect(rr.queryByText(error.message)).toBeTruthy();
  });
});

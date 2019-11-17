import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { Layout1 } from './Layout1';

// mock the Header Module
jest.mock('src/components/layouts/header/Header', () => ({
  Header: (): JSX.Element => <div data-testid="mocked header component" />
}));

describe('Layout1 component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;

  beforeEach(() => {
    rr = render(<Layout1 />);
    node = rr.container.firstChild;
  });

  it('renders the loaded component', () => {
    expect(node).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="mocked header component"
        />
        spsa.church
      </div>
    `);
  });
});

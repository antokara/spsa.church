import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { Header } from './Header';

// mock the Menu Module
jest.mock('src/components/layouts/header/Menu', () => ({
  Menu: (): JSX.Element => <div data-testid="mocked-menu-component" />
}));

describe('Header component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;

  beforeEach(() => {
    rr = render(<Header />);
    node = rr.container.firstChild;
  });

  it('renders the component', () => {
    expect(node).toMatchInlineSnapshot(`
        <div
          data-testid="mocked-menu-component"
        />
    `);
  });
});

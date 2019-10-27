import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { App } from './App';

describe('App component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;
  beforeEach(() => {
    rr = render(<App />);
    node = rr.container.firstChild;
  });

  it('renders the div element', () => {
    expect(node).toMatchInlineSnapshot(
      `
      <div>
        spsa.church
      </div>
    `
    );
  });
});

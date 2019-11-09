import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';
import { App } from './App';

describe('App container', () => {
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
        test app container
      </div>
    `
    );
  });

  // @otod check for web font load
  // @todo check for store provider
  // @todo check for connected router with history
  // @todo check for hot
});

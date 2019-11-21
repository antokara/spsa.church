import { render, RenderResult } from '@testing-library/react';
import * as React from 'react';

type TShared = {
  rr: RenderResult;
};

/**
 * a singleton shared object variable
 * so that we can pass it "by-ref"
 * to the "imported" tests
 */
const shared: TShared = { rr: render(<></>) };

export { shared, TShared };

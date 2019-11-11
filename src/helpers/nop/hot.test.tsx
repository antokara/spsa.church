import * as React from 'react';
import { hot, THocFn } from './hot';

// our mock component
const MockComponent: () => JSX.Element = (): JSX.Element => (
  <div>mockComponent</div>
);

describe('hot function', () => {
  let resultFn: THocFn;

  beforeEach(() => {
    resultFn = hot({});
  });

  it('returns a function', () => {
    expect(resultFn).toBeInstanceOf(Function);
  });

  describe('calling the returned function with a component', () => {
    let resultComponent: JSX.Element;
    let passedComponent: JSX.Element;

    beforeEach(() => {
      passedComponent = <MockComponent />;
      resultComponent = resultFn(passedComponent);
    });

    it('returns the passed component', () => {
      expect(resultComponent).toStrictEqual(passedComponent);
    });
  });
});

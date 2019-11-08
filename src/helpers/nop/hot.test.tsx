import * as React from 'react';
import { hot, THocFn } from './hot';

// our dummy component
const DummyComponent: () => JSX.Element = (): JSX.Element => (
  <div>dummyComponent</div>
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
      passedComponent = <DummyComponent />;
      resultComponent = resultFn(passedComponent);
    });

    it('returns the passed component', () => {
      expect(resultComponent).toStrictEqual(passedComponent);
    });
  });
});

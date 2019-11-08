import { Action, Location, LocationState } from 'history';
import { history } from './history';

describe('history object', () => {
  it('is an object', () => {
    expect(history).toBeInstanceOf(Object);
  });

  describe('"location" property', () => {
    it('is an object', () => {
      expect(history.location).toBeInstanceOf(Object);
    });

    it('has "pathname" property', () => {
      expect(typeof history.location.pathname).toEqual('string');
    });

    it('has "search" property', () => {
      expect(typeof history.location.search).toEqual('string');
    });

    it('has "hash" property', () => {
      expect(typeof history.location.hash).toEqual('string');
    });
  });

  it('has the "length" property', () => {
    expect(typeof history.length).toEqual('number');
    expect(history.length).toEqual(1);
  });

  it('has the "action" property', () => {
    expect(typeof history.action).toEqual('string');
    expect(history.action).toEqual('POP');
  });

  describe('"push" property', () => {
    it('is a function', () => {
      expect(history.push).toBeInstanceOf(Function);
    });

    it('invokes the listen callback when called', () => {
      expect.assertions(3);
      const unlisten: Function = history.listen(
        (location: Location, action: Action) => {
          expect(location).toBeInstanceOf(Object);
          expect(location.pathname).toEqual('/test-location');
          expect(action).toEqual('PUSH');
          unlisten();
        }
      );

      return history.push('/test-location', { some: 'state' });
    });
  });

  describe('"listen" property', () => {
    it('is a function', () => {
      expect(history.listen).toBeInstanceOf(Function);
    });

    it('gets invoked when push is called', () => {
      expect.assertions(3);
      const unlisten: Function = history.listen(
        (location: Location, action: Action) => {
          expect(location).toBeInstanceOf(Object);
          expect(location.pathname).toEqual('/test-location');
          expect(action).toEqual('PUSH');
          unlisten();
        }
      );

      return history.push('/test-location', { some: 'state' });
    });

    it('does not get invoked when push is called after unlisten has been called', () => {
      expect.assertions(0);
      const unlisten: Function = history.listen(
        (location: Location, action: Action) => {
          expect(unlisten()).toBeTruthy();
        }
      );
      unlisten();

      return history.push('/test-location', { some: 'state' });
    });
  });
});

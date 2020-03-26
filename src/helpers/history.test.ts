import { Action, Location } from 'history';
import { history } from './history';

describe('history object', () => {
  it('is an object', () => {
    expect(history).toBeInstanceOf(Object);
  });

  describe('"location" property', () => {
    it('is an object', () => {
      expect(history).toHaveProperty('location', expect.any(Object));
    });

    it('has "pathname" property', () => {
      expect(history).toHaveProperty('location.pathname', expect.any(String));
    });

    it('has "search" property', () => {
      expect(history).toHaveProperty('location.search', expect.any(String));
    });

    it('has "hash" property', () => {
      expect(history).toHaveProperty('location.hash', expect.any(String));
    });
  });

  it('has the "length" property', () => {
    expect(history).toHaveProperty('length', expect.any(Number));
    expect(history.length).toEqual(1);
  });

  it('has the "action" property', () => {
    expect(history).toHaveProperty('action', expect.any(String));
    expect(history.action).toEqual('POP');
  });

  describe('"push" property', () => {
    it('is a function', () => {
      expect(history).toHaveProperty('push', expect.any(Function));
    });

    it('invokes the listen callback when called', () => {
      expect.assertions(3);
      const unlisten: Function = history.listen(
        (location: Location, action: Action) => {
          expect(location).toBeInstanceOf(Object);
          expect(location).toHaveProperty('pathname', '/test-location');
          expect(action).toEqual('PUSH');
          unlisten();
        }
      );

      return history.push('/test-location', { some: 'state' });
    });
  });

  describe('"listen" property', () => {
    it('is a function', () => {
      expect(history).toHaveProperty('listen', expect.any(Function));
    });

    it('gets invoked when push is called', () => {
      expect.assertions(3);
      const unlisten: Function = history.listen(
        (location: Location, action: Action) => {
          expect(location).toBeInstanceOf(Object);
          expect(location).toHaveProperty('pathname', '/test-location');
          expect(action).toEqual('PUSH');
          unlisten();
        }
      );

      return history.push('/test-location', { some: 'state' });
    });

    it('does not get invoked when push is called after unlisten has been called', () => {
      expect.assertions(0);
      const unlisten: Function = history.listen(() => {
        expect(unlisten()).toBeTruthy();
      });
      unlisten();

      return history.push('/test-location', { some: 'state' });
    });
  });
});

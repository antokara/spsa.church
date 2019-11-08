import { assetUrl } from './assetUrl';

describe('assertUrl function', () => {
  let oldEnv: string | undefined;
  let result: string;
  beforeAll(() => {
    oldEnv = process.env.TAKESHAPE_ASSETS_HOST;
  });
  beforeEach(() => {
    jest.resetModules();
  });
  afterAll(() => {
    process.env.TAKESHAPE_ASSETS_HOST = oldEnv;
  });

  describe('without process.env.TAKESHAPE_ASSETS_HOST', () => {
    beforeEach(() => {
      delete process.env.TAKESHAPE_ASSETS_HOST;
    });

    describe('without queryParams', () => {
      beforeEach(() => {
        result = assetUrl('test-path');
      });

      it('returns the URL with just the path', () => {
        expect(result).toEqual('/test-path');
      });
    });

    describe('with queryParams', () => {
      beforeEach(() => {
        result = assetUrl('test-path', {
          testParam1: '1',
          testParam2: 'true',
          testParam3: 'test value',
          testParam4: 'test=value',
          testParam5: 'test&value'
        });
      });

      it('returns the URL with just the path', () => {
        expect(result).toEqual(
          '/test-path?' +
            'testParam1=1' +
            '&testParam2=true' +
            '&testParam3=test%20value' +
            '&testParam4=test%3Dvalue' +
            '&testParam5=test%26value'
        );
      });
    });
  });

  describe('with process.env.TAKESHAPE_ASSETS_HOST', () => {
    beforeEach(() => {
      process.env.TAKESHAPE_ASSETS_HOST = 'https://test-hostname';
    });

    describe('without queryParams', () => {
      beforeEach(() => {
        result = assetUrl('test-path');
      });

      it('returns the URL with just the path', () => {
        expect(result).toEqual('https://test-hostname/test-path');
      });
    });

    describe('with queryParams', () => {
      beforeEach(() => {
        result = assetUrl('test-path', {
          testParam1: '1',
          testParam2: 'true',
          testParam3: 'test value',
          testParam4: 'test=value',
          testParam5: 'test&value'
        });
      });

      it('returns the URL with just the path', () => {
        expect(result).toEqual(
          'https://test-hostname/test-path?' +
            'testParam1=1' +
            '&testParam2=true' +
            '&testParam3=test%20value' +
            '&testParam4=test%3Dvalue' +
            '&testParam5=test%26value'
        );
      });
    });
  });
});

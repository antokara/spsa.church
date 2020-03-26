import {
  getByTestId,
  RenderResult,
  waitForElement,
} from '@testing-library/react';

/**
 * returns a promise which gets resolved when the loading ends
 * which also signifies that the ApolloClientCreator->Promise
 * has been resolved...
 *
 * important: we must resolve that promise
 *  before we exit each test that initiates it.
 *  Meaning, it must run "onBeforeEach" or "onAfterEach"
 *  in the scope that it is pending...
 *
 * @param rr the RenderResult of the container
 */
const waitForLoadingToEnd: (rr: RenderResult) => Promise<boolean> = (
  rr: RenderResult
): Promise<boolean> =>
  waitForElement(
    () =>
      getByTestId(rr.container, 'mock-page-loading-component').getAttribute(
        'data-visible'
      ) === 'false',
    {
      container: rr.container,
    }
  );

export { waitForLoadingToEnd };

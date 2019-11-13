import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
  getByText,
  render,
  RenderResult,
  waitForElementToBeRemoved
} from '@testing-library/react';
import * as React from 'react';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { Layout1 } from './Layout1';

describe('Layout1 component', () => {
  let rr: RenderResult;
  let node: ChildNode | null;

  /**
   * returns a promise which gets resolved when the loading ends
   * which also signifies that the useQuery->MockedProvider->Promise
   * has been resolved...
   *
   * important: we must resolve that promise
   *  before we exit each test that initiates it.
   *  Meaning, it must run "onBeforeEach" or "onAfterEach"
   *  in the scope that it is pending...
   */
  const waitForLoadingToEnd: () => Promise<
    HTMLElement
  > = (): Promise<HTMLElement> =>
    waitForElementToBeRemoved(() => getByText(rr.container, 'loading'), {
      container: rr.container
    });

  beforeEach(() => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: getTheme
        },
        result: {
          data: {
            theme: {
              headerMenu: {
                label: 'header-menu-1/label',
                menuEntries: [
                  {
                    label: 'menu-entry-1/label',
                    url: 'menu-entry-1/url'
                  },
                  {
                    label: 'menu-entry-2/label',
                    url: 'menu-entry-2/url'
                  }
                ]
              }
            }
          }
        }
      }
    ];

    rr = render(
      <MockedProvider mocks={mocks} addTypename={false} cache={undefined}>
        <Layout1 />
      </MockedProvider>
    );
    node = rr.container.firstChild;
  });

  describe('while loading', () => {
    afterEach(waitForLoadingToEnd);

    it('renders the loading indicator', async () => {
      expect(node).toMatchInlineSnapshot(`
        <div>
          spsa.church
          <div>
            loading
          </div>
          <div />
        </div>
      `);
    });
  });

  describe('on successful load', () => {
    beforeEach(waitForLoadingToEnd);

    it('renders the loaded component', () => {
      expect(node).toMatchInlineSnapshot(`
        <div>
          spsa.church
          <div />
          <div>
            header-menu-1/label
          </div>
        </div>
      `);
    });
  });
});

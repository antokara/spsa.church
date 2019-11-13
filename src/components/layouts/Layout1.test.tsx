import { MockedProvider, MockedResponse } from '@apollo/react-testing';
import {
  act,
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

    act(() => {
      rr = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Layout1 />
        </MockedProvider>
      );
    });
    node = rr.container.firstChild;
  });

  describe('while loading', () => {
    it('renders the loading indicator', () => {
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
    beforeEach(async () => {
      await act(async () => {
        await waitForElementToBeRemoved(
          () => getByText(rr.container, 'loading'),
          {
            container: rr.container
          }
        );
      });
    });

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

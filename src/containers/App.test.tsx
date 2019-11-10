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

  it('renders the link element for the web fonts', () => {
    const linkElements: HTMLCollection = document.head.getElementsByTagName(
      'link'
    );
    let linkElement: HTMLLinkElement | undefined;
    for (let i: number = 0; i < linkElements.length; i += 1) {
      const element: HTMLLinkElement | null = linkElements.item(
        i
      ) as HTMLLinkElement;
      if (
        element &&
        element.href ===
          'https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,500,700&subset=latin'
      ) {
        linkElement = element;
        break;
      }
    }

    expect(linkElement).toBeTruthy();
  });

  // @todo check for store provider
  // @todo check for connected router with history
  // @todo check for hot
});

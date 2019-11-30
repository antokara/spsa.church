import * as React from 'react';
import * as sanitizeHtml from 'sanitize-html';
import { MarkdownWrapper } from 'src/components/shared/MarkdownWrapper';

// /**
//  * needed because the default implementation filters out the "fax:" protocol
//  */
// const transformLinkUri: (uri: string) => string = (uri: string): string => uri;

// /**
//  * just open every link in a new window when it does not start with /
//  */
// const linkTarget: ReactMarkdown.LinkTargetResolver = (
//   uri: string,
//   text: string,
//   title?: string
// ): string => (uri.startsWith('/') ? '_self' : '_blank');

type TProps = {
  html: string;
};

type TMarkup = {
  __html: string;
};

/**
 * creates the markup after sanitizing the unsafe html provided
 */
const createMarkup: (html: string) => TMarkup = (html: string): TMarkup => ({
  __html: sanitizeHtml(html, {
    allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'nl',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'caption',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'iframe',
      'figure',
      'img'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target'],
      img: ['src', 'alt', 'title']
    }
  })
});

/**
 * RichText component.
 *
 * Renders the RichText HTML provided after it has been sanitized and
 * makes sure its wrapped with the MarkdownWrapper.
 */
const RichText: (props: TProps) => JSX.Element | null = ({
  html
}: TProps): JSX.Element | null => (
  // tslint:disable-next-line:react-no-dangerous-html
  // <MarkdownWrapper dangerouslySetInnerHTML={createMarkup(html)} />
  // tslint:disable-next-line:react-no-dangerous-html
  <div dangerouslySetInnerHTML={createMarkup(html)} />
);

export { RichText };

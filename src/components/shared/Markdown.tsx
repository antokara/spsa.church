import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';
import { MarkdownWrapper } from 'src/components/shared/MarkdownWrapper';

/**
 * needed because the default implementation filters out the "fax:" protocol
 */
const transformLinkUri: (uri: string) => string = (uri: string): string => uri;

/**
 * just open every link in a new window when it does not start with /
 */
const linkTarget: ReactMarkdown.LinkTargetResolver = (
  uri: string,
  text: string,
  title?: string
): string => (uri.startsWith('/') ? '_self' : '_blank');

/**
 * Markdown component.
 *
 * Renders the ReactMarkdown with common parameters and
 * makes sure its wrapped with the MarkdownWrapper.
 */
const Markdown: ({
  source
}: ReactMarkdown.ReactMarkdownProps) => JSX.Element | null = ({
  source
}: ReactMarkdown.ReactMarkdownProps): JSX.Element | null => (
  <MarkdownWrapper>
    <ReactMarkdown
      source={source}
      transformLinkUri={transformLinkUri}
      linkTarget={linkTarget}
    />
  </MarkdownWrapper>
);

export { Markdown };

import * as React from 'react';
import * as sanitizeHtml from 'sanitize-html';
import { allowedAttributes } from 'src/constants/sanitizeHtml/allowedAttributes';
import { allowedSchemes } from 'src/constants/sanitizeHtml/allowedSchemes';
import { allowedTags } from 'src/constants/sanitizeHtml/allowedTags';
import { useCss } from 'src/helpers/useCss';
import { StyledRichText } from './StyledRichText';

/**
 * creates the markup after sanitizing the unsafe html provided
 */
type TMarkup = {
  __html: string;
};
const createMarkup: (html: string) => TMarkup = (html: string): TMarkup => ({
  __html: sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes
  })
});

/**
 * RichText component.
 *
 * Renders the RichText HTML provided after it has been sanitized and
 * makes sure its wrapped with the MarkdownWrapper.
 */
type TProps = {
  html: string;
};
const RichText: (props: TProps) => JSX.Element | null = ({
  html
}: TProps): JSX.Element | null => {
  // calculate the dynamic font size using hooks
  const h2FontSize: string = useCss('5vw', '1.5em', '425px');
  const margin: string = useCss('3vw', '2em');

  return (
    // tslint:disable-next-line:react-no-dangerous-html
    <StyledRichText
      dangerouslySetInnerHTML={createMarkup(html)}
      h2FontSize={h2FontSize}
      margin={margin}
    />
  );
};

export { RichText };

import { useQuery } from '@apollo/react-hooks';
import * as React from 'react';
import * as sanitizeHtml from 'sanitize-html';
import { allowedAttributes } from 'src/constants/sanitizeHtml/allowedAttributes';
import { allowedSchemes } from 'src/constants/sanitizeHtml/allowedSchemes';
import { allowedTags } from 'src/constants/sanitizeHtml/allowedTags';
import * as getHtmlTagList from 'src/gql/htmlTags/getHtmlTagList.gql';
import { TData } from 'src/gql/htmlTags/TData';
import { replaceTags } from 'src/helpers/replaceTags';
import { useCss } from 'src/helpers/useCss';
import { StyledRichText } from './StyledRichText';

/**
 * creates the markup after sanitizing the unsafe html provided
 */
type TMarkup = {
  __html: string;
};
const createMarkup: (html: string) => TMarkup = (html: string): TMarkup => ({
  __html: html
});

/**
 * RichText component.
 *
 * Renders the RichText HTML provided after it has been sanitized and
 * makes sure its wrapped with the MarkdownWrapper.
 */
type TProps = {
  html: string;
  replaceHtmlTags?: boolean;
};
const RichText: (props: TProps) => JSX.Element | null = ({
  html,
  replaceHtmlTags = true
}: TProps): JSX.Element | null => {
  // calculate the dynamic font size using hooks
  const h2FontSize: string = useCss('5vw', '1.5em', '425px');
  const margin: string = useCss('3vw', '2em');

  // get the html tag list
  const { loading, data } = useQuery<TData>(getHtmlTagList);

  // in case the gql is loading, do not show the content yet
  if (loading) {
    return null;
  }

  let safeHtml: string = sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes
  });

  if (replaceHtmlTags && data?.getHtmlTagList.items) {
    safeHtml = replaceTags(safeHtml, data?.getHtmlTagList.items);
  }

  return (
    // tslint:disable-next-line:react-no-dangerous-html
    <StyledRichText
      dangerouslySetInnerHTML={createMarkup(safeHtml)}
      h2FontSize={h2FontSize}
      margin={margin}
    />
  );
};

export { RichText };

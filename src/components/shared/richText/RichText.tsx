import { useQuery } from '@apollo/react-hooks';
import {
  INode,
  Parser,
  ProcessNodeDefinitions,
  TProcessingInstruction,
} from 'html-to-react';
import * as React from 'react';
import { Link } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { allowedAttributes } from 'src/constants/sanitizeHtml/allowedAttributes';
import { allowedSchemes } from 'src/constants/sanitizeHtml/allowedSchemes';
import { allowedTags } from 'src/constants/sanitizeHtml/allowedTags';
import * as getHtmlTagList from 'src/gql/htmlTags/getHtmlTagList.gql';
import { TData } from 'src/gql/htmlTags/TData';
import { replaceTags } from 'src/helpers/replaceTags';
import { useCss } from 'src/helpers/useCss';
import { QueryResult } from 'react-apollo';
import { StyledRichText } from './StyledRichText';

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
// tslint:disable-next-line:max-func-body-length
const RichText: (props: TProps) => JSX.Element | null = ({
  html,
  replaceHtmlTags = true,
}: TProps): JSX.Element | null => {
  // calculate the dynamic font size using hooks
  const h2FontSize: string = useCss('5vw', '1.5em', '425px');
  const margin: string = useCss('3vw', '2em');

  // get the html tag list
  const { data }: QueryResult = useQuery<TData>(getHtmlTagList);

  // in case we have no data, do not show the content yet
  if (!data) {
    return null;
  }

  // remove unsafe html/js/attributes from the html string
  let safeHtml: string = sanitizeHtml(html, {
    allowedTags,
    allowedAttributes,
    allowedSchemes,
  });

  // replace custom tags
  if (replaceHtmlTags && data?.getHtmlTagList.items) {
    safeHtml = replaceTags(safeHtml, data?.getHtmlTagList.items);
  }

  // convert html string to JSX while at the same time, replacing
  // internal links with react-router-dom Link components
  const isValidNode: () => boolean = (): boolean => true;
  const htmlToReactParser: Parser = new Parser();
  const processNodeDefinitions: ProcessNodeDefinitions = new ProcessNodeDefinitions();
  const processingInstructions: TProcessingInstruction[] = [
    // Order matters. Instructions are processed in the order they're defined
    {
      // replace A tags that start with / with a React Router Dom Link component
      shouldProcessNode: (node: INode): boolean =>
        node.name === 'a' && node.attribs.href.startsWith('/'),
      // eslint-disable-next-line react/display-name
      processNode: (
        node: INode,
        children: JSX.Element,
        index: string
      ): JSX.Element => (
        <Link key={index} to={node.attribs.href}>
          {children}
        </Link>
      ),
    },
    {
      // Anything else, just use the default processor
      shouldProcessNode: isValidNode,
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  // const reactElement: JSX.Element = htmlToReactParser.parse(safeHtml);
  const reactElement: JSX.Element = htmlToReactParser.parseWithInstructions(
    safeHtml,
    isValidNode,
    processingInstructions
  );

  return (
    <StyledRichText h2FontSize={h2FontSize} margin={margin}>
      {reactElement}
    </StyledRichText>
  );
};

export { RichText };

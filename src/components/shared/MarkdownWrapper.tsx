/**
 * Mark Down Component Wrapper.
 * Styles the HTML Elements generated by the "react-markdown" component
 */
import { default as styled } from 'styled-components';

const MarkdownWrapper: React.FunctionComponent = styled.div`
  p img {
    float: left;
    margin-right: 2em;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 1px;
  }
`;

export { MarkdownWrapper };

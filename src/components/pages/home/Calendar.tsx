/**
 * styles the calendar iframe to remove border, etc.
 */
import { default as styled } from 'styled-components';

type TProps = {
  src: string;
};

const Calendar: React.FunctionComponent = styled.iframe`
  border: none;
`;

export { Calendar };

import { CardContent as MuiCardContent } from '@material-ui/core';
import { default as styled } from 'styled-components';

const CardContent: typeof MuiCardContent = styled(MuiCardContent)`
  flex-basis: 65vw;
`;

export { CardContent };

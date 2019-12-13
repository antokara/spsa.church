import { Card as MuiCard } from '@material-ui/core';
import { default as styled } from 'styled-components';

const Card: typeof MuiCard = styled(MuiCard)`
  display: flex;
  align-items: stretch;
`;

export { Card };

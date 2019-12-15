import { default as MuiCardMedia } from '@material-ui/core/CardMedia';
import { default as styled } from 'styled-components';

const CardMedia: typeof MuiCardMedia = styled(MuiCardMedia)`
  width: 25vw;
  max-width: 10rem;
  min-height: 20vh;
  max-height: 10rem;
  background-repeat: no-repeat;
  flex-basis: 35vw;
`;

export { CardMedia };

import { default as SeparatorSvg } from 'assets/separator.svg';
import { default as styled } from 'styled-components';

/**
 * a styled separator that sits at the bottom of its container
 * but aligned to look as if it's in the middel of its container and the next one.
 */
const Separator: typeof SeparatorSvg = styled(SeparatorSvg)`
  position: absolute;
  width: 100%;
  height: 40px;
  bottom: -20px;
  left: 0;
  width: 100%;
`;

export { Separator };

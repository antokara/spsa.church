import { default as SeparatorSvg } from 'assets/separator.svg';
import * as React from 'react';
import { useCss } from 'src/helpers/useCss';
import { default as styled } from 'styled-components';

type TStyledProps = {
  height: string;
};

/**
 * a styled separator that sits at the bottom of its container
 * but aligned to look as if it's in the middel of its container and the next one.
 */
const StyledSeparator: typeof SeparatorSvg = styled(SeparatorSvg)`
  position: absolute;
  width: 100%;
  left: 0;
  height: ${(p: TStyledProps): string => p.height};
  bottom: calc(${(p: TStyledProps): string => p.height} / -2);
`;

const Separator: () => JSX.Element = (): JSX.Element => (
  <StyledSeparator height={useCss('4vw', '40px')} />
);

export { Separator };

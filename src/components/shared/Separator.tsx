import { default as SeparatorSvg } from 'assets/separator.svg';
import * as React from 'react';
import { useCss } from 'src/helpers/useCss';
import { default as styled } from 'styled-components';

type TStyledProps = {
  height: string;
  flipped: boolean;
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
  z-index: 1;
  transform: ${(p: TStyledProps): string =>
    p.flipped ? 'scaleX(-1)' : 'none'};
`;

type TProps = {
  flipped?: boolean;
};

const Separator: (props: TProps) => JSX.Element = ({
  flipped = false
}: TProps): JSX.Element => (
  <StyledSeparator
    data-testid="separator"
    height={useCss('4vw', '40px')}
    flipped={flipped}
  />
);

export { Separator };

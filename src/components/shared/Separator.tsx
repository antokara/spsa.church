import { default as Box } from '@material-ui/core/Box';
import { default as SeparatorSvg } from 'assets/separator.svg';
import * as React from 'react';
import { useCss } from 'src/helpers/useCss';
import { default as styled } from 'styled-components';

// TODO: change when v5 is out
// @see https://github.com/styled-components/styled-components/issues/135 is fixed
// @see https://github.com/styled-components/styled-components/issues/1198
type TStyledProps = {
  height: string;
  flipped: number;
  absolute: number;
};

const StyledSeparator: typeof SeparatorSvg = styled(SeparatorSvg)`
  position: ${(p: TStyledProps): string =>
    p.absolute ? `absolute` : 'relative'};
  width: 100%;
  height: ${(p: TStyledProps): string => p.height};
  /* margin-bottom: ${(p: TStyledProps): string =>
    p.absolute ? `calc(${p.height} / -2)` : 'auto'}; */
  bottom: ${(p: TStyledProps): string => (p.absolute ? `0` : 'auto')};
  transform: ${(p: TStyledProps): string =>
    p.flipped ? 'scaleX(-1)' : 'none'};
`;

type TProps = {
  flipped?: boolean;
  absolute?: boolean;
};

/**
 * A styled separator component.
 *
 * It always takes the full width of its container.
 * The height is dynamic depending the viewport's width.
 *
 * @param props.flipped optional. if true, the separator will be flipped horizontally facing RTL
 * @param props.absolute optional. if false, the separator will be positioned absolute to the bottom
 */
const Separator: (props: TProps) => JSX.Element = ({
  flipped = false,
  absolute = true
}: TProps): JSX.Element => {
  const iFlipped: number = flipped ? 1 : 0;
  const iAbsolute: number = absolute ? 1 : 0;
  const height: string = useCss('4vw', '40px');

  return (
    <div>
      <StyledSeparator
        data-testid="separator"
        height={height}
        flipped={iFlipped}
        absolute={iAbsolute}
      />
      {absolute && <Box height={`calc(${height} / 2)`} />}
    </div>
  );
};

export { Separator };

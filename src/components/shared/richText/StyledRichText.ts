/**
 * Styled Rich Text component which adds the css required to the rich text
 */
import { WithTheme } from '@material-ui/core';
import { default as styled, StyledComponent } from 'styled-components';

type TStyledProps = {
  h2FontSize: string;
  margin: string;
};

type TProps = TStyledProps & WithTheme;

const StyledRichText: StyledComponent<
  'div',
  HTMLDivElement,
  TStyledProps,
  never
> = styled.div`
  figure {
    margin: 0 ${(p: TProps): string => p.margin} 0 0;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 3px 1px;
    width: 24vw;
    max-width: 250px;

    &.left {
      float: left;
    }

    &.right {
      float: right;
    }

    img {
      display: block;
      max-width: 100%;
    }
  }

  a {
    color: ${(p: TProps): string => p.theme.palette.secondary.dark};
    text-decoration: none;
  }

  h1,
  h2 {
    font-size: ${(p: TProps): string => p.h2FontSize};
  }

  em {
    font-weight: bold;
  }
`;

export { StyledRichText };

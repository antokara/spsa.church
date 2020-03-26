/**
 * Styled Rich Text component which adds the css required to the rich text
 */
import { WithTheme } from '@material-ui/core/styles';
import styled, { StyledComponent } from 'styled-components';

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
    margin: 0 ${(p: TProps): string => p.margin}
      ${(p: TProps): string => p.margin} 0;
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
      background: ${(p: TProps): string => p.theme.palette.common.white};
    }
  }

  a {
    color: ${(p: TProps): string => p.theme.palette.primary.main};
    text-decoration: none;
  }

  h1,
  h2 {
    font-size: ${(p: TProps): string => p.h2FontSize};
  }

  em {
    font-weight: bold;
  }

  ul,
  ol {
    overflow: hidden;
    padding-left: 2em;

    li {
      margin-bottom: 1em;
    }
  }
`;

export { StyledRichText };

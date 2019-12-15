import { useQuery } from '@apollo/react-hooks';
import { default as Box } from '@material-ui/core/Box';
import {
  default as Grid,
  GridJustification,
  GridSpacing
} from '@material-ui/core/Grid';
import { default as IconButton } from '@material-ui/core/IconButton';
import { default as useMediaQuery } from '@material-ui/core/useMediaQuery';
import * as React from 'react';
import { RichText } from 'src/components/shared/richText/RichText';
import { SVG } from 'src/components/shared/SVG';
import { theme } from 'src/constants/theme';
import { TIconLink } from 'src/gql/shared/TIconLink';
import * as getTheme from 'src/gql/theme/getTheme.gql';
import { TData } from 'src/gql/theme/TData';

/**
 * Footer component.
 *
 * Renders the footer icon links
 */
const Footer: () => JSX.Element | null = (): JSX.Element | null => {
  // get the theme data
  const { loading, data } = useQuery<TData>(getTheme);

  // calculate media query dependent values
  const { spacing, justify, textAlign }: TDynamicValues = useMediaQuery(
    `(max-width: ${theme.breakpoints.values.sm}px)`
  )
    ? { spacing: 1, justify: 'center', textAlign: 'center' }
    : { spacing: 2, justify: 'flex-start', textAlign: 'right' };

  // in case the gql is loading or there is no data, do not show the menu
  if (loading || !data) {
    return null;
  }

  /**
   * builds the link icons list
   */
  const LinkIcons: JSX.Element[] = data.theme.footerIconLinks.map(
    (iconLink: TIconLink) => (
      <Grid item={true} key={iconLink.link}>
        <IconButton
          component="a"
          href={iconLink.link}
          target="_blank"
          rel="noopener noreferrer nofollow"
          color="secondary"
        >
          <SVG asset={iconLink.icon} />
        </IconButton>
      </Grid>
    )
  );

  type TDynamicValues = {
    spacing: GridSpacing;
    justify: GridJustification;
    textAlign: string;
  };

  return (
    <Box p={spacing}>
      <Grid container={true} spacing={2}>
        <Grid
          item={true}
          container={true}
          spacing={spacing}
          xs={12}
          sm={6}
          justify={justify}
        >
          {LinkIcons}
        </Grid>
        <Grid item={true} xs={12} sm={6}>
          <Box textAlign={textAlign}>
            <RichText html={data.theme.footerInfoHtml} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export { Footer };

import { useQuery } from '@apollo/react-hooks';
import { Box, Grid, IconButton, Paper, useMediaQuery } from '@material-ui/core';
import { GridSpacing } from '@material-ui/core/Grid';
import * as React from 'react';
import { Markdown } from 'src/components/shared/Markdown';
import { SVG } from 'src/components/shared/SVG';
import { THEME } from 'src/constants/THEME';
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

  const spacing: GridSpacing = useMediaQuery(
    `(max-width: ${THEME.breakpoints.values.sm}px)`
  )
    ? 1
    : 2;

  return (
    <Paper square={true}>
      <Box p={spacing}>
        <Grid container={true} spacing={2}>
          <Grid item={true} container={true} spacing={spacing} xs={12} sm={6}>
            {LinkIcons}
          </Grid>
          <Grid item={true} xs={12} sm={6}>
            <Box textAlign="right">
              <Markdown source={data.theme.footerInfo} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export { Footer };

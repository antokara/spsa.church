import { useQuery } from '@apollo/react-hooks';
import { Box, Grid, IconButton, Paper } from '@material-ui/core';
import * as React from 'react';
import { Markdown } from 'src/components/shared/Markdown';
import { SVG } from 'src/components/shared/SVG';
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

  return (
    <Paper square={true}>
      <Box p={2}>
        <Grid container={true} spacing={2}>
          <Grid item={true} container={true} spacing={2} xs={12} md={6}>
            {LinkIcons}
          </Grid>
          <Grid item={true} xs={12} md={6}>
            <Markdown source={data.theme.footerInfo} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export { Footer };

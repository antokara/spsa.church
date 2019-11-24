import { useQuery } from '@apollo/react-hooks';
import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { Img, TSource } from 'src/components/shared/Img';
import * as getHome from 'src/gql/home/getHome.gql';
import { TData } from 'src/gql/home/TData';

/**
 * Home page component.
 *
 * Renders the home page with its Main Photo, Overlay text, content, etc.
 */
const Home: () => JSX.Element | null = (): JSX.Element | null => {
  // get the home data
  const { loading, data } = useQuery<TData>(getHome);

  // in case the gql is loading or there is no data, do not show the page
  // TODO: add loader
  if (loading || !data) {
    return null;
  }

  const sources: TSource[] = [
    {
      srcSet: '{url}?fp-x=0.35&fp-y=0.35&fp-z=1&fit=crop&h=700&max-w=800',
      media: '(min-width: 401px)'
    },
    {
      srcSet: '{url}?fp-x=0.35&fp-y=0.35&fp-z=1&fit=crop&h=400&max-w=400',
      media: '(max-width: 400px)'
    }
  ];

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Box maxWidth="100%">
          <Img asset={data.home.photo} sources={sources} />
        </Box>
      </Grid>
      {data.home.overlay}
    </Grid>
  );
};

export { Home };

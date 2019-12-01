import { useQuery } from '@apollo/react-hooks';
import { Box, Grid } from '@material-ui/core';
import * as React from 'react';
import { RichText } from 'src/components/shared/richText/RichText';
import { Separator } from 'src/components/shared/Separator';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getHome from 'src/gql/home/getHome.gql';
import { TData } from 'src/gql/home/TData';
import { Calendar } from './Calendar';

type TProps = {
  id: string;
};

/**
 * Home page component.
 *
 * Renders the home page with its content, Calendar, etc.
 */
const Home: (props: TProps) => JSX.Element | null = ({
  id
}: TProps): JSX.Element | null => {
  // get the home data
  const { loading, data } = useQuery<TData>(getHome, {
    variables: { id, images: imageSizes }
  });

  // in case the gql is loading or there is no data, do not show the page
  // TODO: add loader
  if (loading || !data) {
    return null;
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Box position="relative">
          <Box p={2} overflow="hidden">
            <RichText html={data.getHomePage.contentHtml} />
          </Box>
          <Separator flipped={true} absolute={false} />
        </Box>
      </Grid>
      <Grid item={true} xs={12}>
        <Calendar>Calendar is coming soon!</Calendar>
      </Grid>
    </Grid>
  );
};

export { Home };

import { useQuery } from '@apollo/react-hooks';
import { default as Box } from '@material-ui/core/Box';
import { default as Grid } from '@material-ui/core/Grid';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
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
  const { loading, data, error } = useQuery<TData>(getHome, {
    variables: { id, images: imageSizes }
  });

  // loading is also true when while we are fetching to refresh the cache
  // so to know when the first load is taking place, we need to check the data as well
  const firstLoading: boolean = loading && !data;

  // in case there is no internet and we don't have the data cached, show the relative page
  if (error?.networkError && !data) {
    return <NoInternet />;
  }

  // always show the loading so that it can fade away...
  const contents: JSX.Element[] = [
    <PageLoading key="loading" visible={firstLoading} position="relative" />
  ];

  // show only when we have data but ignore the loading...
  if (data) {
    contents.push(<RichText key="main" html={data.getHomePage.contentHtml} />);
  }

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        <Box position="relative">
          <Box px={2} overflow="hidden">
            {contents}
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

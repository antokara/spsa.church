import { useQuery } from '@apollo/react-hooks';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';
import { News } from 'src/components/pages/news/News';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { Separator } from 'src/components/shared/Separator';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getHome from 'src/gql/home/getHome.gql';
import { TData } from 'src/gql/home/TData';
import { QueryResult } from 'react-apollo';

type TProps = {
  id: string;
};

/**
 * Home page component.
 *
 * Renders the home page with its content, Calendar, etc.
 */
const Home: (props: TProps) => JSX.Element | null = ({
  id,
}: TProps): JSX.Element | null => {
  // get the home data
  const { loading, data, error }: QueryResult = useQuery<TData>(getHome, {
    variables: { id, images: imageSizes },
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
    <PageLoading key="loading" visible={firstLoading} position="relative" />,
  ];

  // show only when we have data but ignore the loading...
  if (data) {
    contents.push(<RichText key="main" html={data.getHomePage.contentHtml} />);
  }

  // optional pinned content
  let pinnedContentHtml: JSX.Element | null = null;
  if (data?.getHomePage.pinnedContentHtml) {
    pinnedContentHtml = (
      <Grid item={true} xs={12}>
        <Box px={2} overflow="hidden">
          <RichText
            key="pinnedContentHtml"
            html={data.getHomePage.pinnedContentHtml}
          />
        </Box>
        <Separator flipped={false} absolute={false} />
      </Grid>
    );
  }

  // optional lower section
  let lowerSectionHtml: JSX.Element | null = null;
  if (data?.getHomePage.lowerSectionHtml) {
    lowerSectionHtml = (
      <Grid item={true} xs={12}>
        <Box px={2} overflow="hidden">
          <RichText
            key="lowerSectionHtml"
            html={data.getHomePage.lowerSectionHtml}
          />
        </Box>
      </Grid>
    );
  }

  return (
    <Grid container={true}>
      {pinnedContentHtml}
      <Grid item={true} xs={12}>
        <Box position="relative">
          <Box px={2} overflow="hidden">
            {contents}
          </Box>
          <Separator flipped={true} absolute={false} />
        </Box>
      </Grid>
      <Grid item={true} xs={12}>
        <News id="bdc5ac78-2c6b-4e02-a379-b0ba44bbe49d" />
        <Separator flipped={true} absolute={false} />
      </Grid>
      {lowerSectionHtml}
    </Grid>
  );
};

export { Home };

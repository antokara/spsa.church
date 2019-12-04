import { useQuery } from '@apollo/react-hooks';
import { Box } from '@material-ui/core';
import * as React from 'react';
import { NoInternet } from 'src/components/pages/noInternet/NoInternet';
import { Context } from 'src/helpers/installApp/Context';
import { IContext } from 'src/helpers/installApp/IContext';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { RichText } from 'src/components/shared/richText/RichText';
import { imageSizes } from 'src/constants/layout/imageSizes';
import * as getInstallApp from 'src/gql/installApp/getInstallApp.gql';
import { TData } from 'src/gql/installApp/TData';
type TProps = {
  id: string;
};

/**
 * Install Application page component.
 *
 * Renders the "install app" page with its content
 */
const InstallApp: (props: TProps) => JSX.Element | null = ({
  id
}: TProps): JSX.Element | null => {
  // get the Install App page data
  const { loading, data, error } = useQuery<TData>(getInstallApp, {
    variables: { id, images: imageSizes }
  });

  // get the context
  const context: IContext = React.useContext(Context);

  // in case there is no internet, show the relative page
  if (error?.networkError) {
    return <NoInternet />;
  }

  // always show the loading so that it can fade away...
  const contents: JSX.Element[] = [
    <PageLoading key="loading" visible={loading} position="relative" />
  ];

  // in case the gql is loading or there is no data, do not show the page contents
  if (!loading && data) {
    contents.push(
      <RichText key="main" html={data.getInstallAppPage.contentHtml} />
    );
  }

  type TInstallResult = () => void;
  let triggerInstallation: undefined | TInstallResult;
  triggerInstallation = (): void => {
    if (context.deferredPrompt) {
      context.deferredPrompt
        .prompt()
        .then()
        .catch();
    }
  };

  return (
    <Box px={2}>
      {contents}
      can install: {context.deferredPrompt ? 'yes' : 'no'}
      <button onClick={triggerInstallation}>install!</button>
      already installed:
      {context.alreadyInstalled ? 'yes' : 'no'}
      <br /> outcome: {context.outcome}
    </Box>
  );
};

export { InstallApp };

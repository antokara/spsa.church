/**
 * Application Container.
 * The main container of the whole application.
 *
 * It handles the initial loading state/indicator and is responsible for
 * passing to the rest of the app, all the context required such as:
 * redux-store, apollo client, material ui theme, hot loader support, base css, etc.
 */
import {
  CssBaseline,
  MuiThemeProvider,
  StylesProvider
} from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { hot } from 'ReactHotLoader';
import { Layout1 } from 'src/components/layouts/Layout1';
import { InstallAppProvider } from 'src/helpers/installApp/InstallAppProvider';
import { PageError } from 'src/components/shared/pageError/PageError';
import { PageLoading } from 'src/components/shared/pageLoading/PageLoading';
import { theme } from 'src/constants/theme';
import {
  ApolloClientCreator,
  TApolloClient
} from 'src/helpers/ApolloClientCreator';
import { history } from 'src/helpers/history';
import { store } from 'src/helpers/store';
import { ThemeProvider } from 'styled-components';
import * as WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Noto Serif JP:400,500,700:latin']
  }
});

const App: React.FunctionComponent | null = (): React.ReactElement<
  React.ReactNode
> | null => {
  // initialization error
  const [error, setError] = React.useState<Error>();

  // our apollo client
  const [apolloClient, setApolloClient] = React.useState<TApolloClient>();

  // the children to render
  let children: JSX.Element | null = null;

  // if the apollo client hasn't been initialized yet,
  // initialize it asynchronously and update the state...
  if (!apolloClient && !error) {
    ApolloClientCreator()
      .then((client: TApolloClient): void => setApolloClient(client))
      .catch(() =>
        setError(
          new Error(
            'Failed to initialize GraphQL client. Please refresh/reopen the Application'
          )
        )
      );
  }

  // do not attempt to render the layout (which depends on apollo client)
  // until the apollo client is ready. In the mean time, show the PageLoading and
  // in case of failure, show the PageError
  if (apolloClient) {
    children = (
      <ApolloProvider client={apolloClient}>
        <Layout1 />
      </ApolloProvider>
    );
  } else if (error) {
    children = <PageError error={error} />;
  }

  // if true, the loading indicator will be shown
  const loadingVisible: boolean = !apolloClient && !error;

  // TODO: test StylesProvider and ThemeProvider
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst={true}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Provider store={store}>
            <InstallAppProvider>
              <PageLoading visible={loadingVisible} />
              <ConnectedRouter history={history}>{children}</ConnectedRouter>
            </InstallAppProvider>
          </Provider>
        </ThemeProvider>
      </StylesProvider>
    </MuiThemeProvider>
  );
};

const containerApp: React.FunctionComponent = hot(module)(App);

export { containerApp as App };

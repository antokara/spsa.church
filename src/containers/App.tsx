/**
 * Application Container
 * the main container of the whole application
 */
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ApolloClient } from 'apollo-client';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { hot } from 'ReactHotLoader';
import { Layout1 } from 'src/components/layouts/Layout1';
import { THEME } from 'src/constants/THEME';
import { ApolloClientCreator } from 'src/helpers/ApolloClientCreator';
import { history } from 'src/helpers/history';
import { store } from 'src/helpers/store';
import * as WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Noto Serif JP:400,500,700:latin']
  }
});

const App: React.FunctionComponent | null = (): React.ReactElement<
  React.ReactNode
> | null => {
  // let apolloClient: ApolloClient<{}> | null = null;

  const [state, setState] = useState(() => {
    const initialState: { apolloClient: ApolloClient<{}> | null } = {};

    return initialState;
  });

  // React.useLayoutEffect(() => {
  //   ApolloClientCreator().then((client: ApolloClient<{}>) => {
  //     apolloClient = client;
  //   });
  // });

  if (props.apolloClient !== null) {
    return (
      <React.Fragment>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ApolloProvider client={apolloClient}>
              <MuiThemeProvider theme={THEME}>
                <CssBaseline />
                <Layout1 />
              </MuiThemeProvider>
            </ApolloProvider>
          </ConnectedRouter>
        </Provider>
      </React.Fragment>
    );
  }

  return null;
};

const containerApp: React.FunctionComponent = hot(module)(App);

export { containerApp as App };

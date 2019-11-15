/**
 * Application Container
 * the main container of the whole application
 */
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import { hot } from 'ReactHotLoader';
import { Layout1 } from 'src/components/layouts/Layout1';
import { THEME } from 'src/constants/THEME';
import { ApolloClient } from 'src/helpers/ApolloClient';
import { history } from 'src/helpers/history';
import { store } from 'src/helpers/store';
import * as WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Noto Serif JP:400,500,700:latin']
  }
});

const App: React.FunctionComponent = (): React.ReactElement<React.ReactNode> => (
  <React.Fragment>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ApolloProvider client={ApolloClient}>
          <MuiThemeProvider theme={THEME}>
            <CssBaseline />
            <Layout1 />
          </MuiThemeProvider>
        </ApolloProvider>
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);

const containerApp: React.FunctionComponent = hot(module)(App);

export { containerApp as App };

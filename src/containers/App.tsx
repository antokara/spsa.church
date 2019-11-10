/**
 * Application Container
 * the main container of the whole application
 */
import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { Provider } from 'react-redux';
import { hot } from 'ReactHotLoader';
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
        <div>test app container</div>
      </ConnectedRouter>
    </Provider>
  </React.Fragment>
);

const containerApp: React.FunctionComponent = hot(module)(App);

export { containerApp as App };
